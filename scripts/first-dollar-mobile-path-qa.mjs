import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const defaultBaseUrl = "http://127.0.0.1:5100";
const defaultRouteTimeoutMs = 15000;
const viewports = [
  { name: "phone-portrait", width: 390, height: 844, mobile: true, orientation: "portraitPrimary" },
  { name: "phone-landscape", width: 844, height: 390, mobile: true, orientation: "landscapePrimary" }
];

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.FIRST_DOLLAR_QA_BASE_URL ?? defaultBaseUrl,
    outputDir:
      process.env.FIRST_DOLLAR_QA_OUTPUT_DIR ??
      path.join(process.cwd(), ".tmp", `first-dollar-mobile-path-qa-${new Date().toISOString().replace(/[:.]/g, "-")}`),
    routeTimeoutMs: Number(process.env.FIRST_DOLLAR_QA_ROUTE_TIMEOUT_MS ?? defaultRouteTimeoutMs),
    headed: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base-url") {
      options.baseUrl = argv[index + 1] ?? options.baseUrl;
      index += 1;
    } else if (arg === "--output-dir") {
      options.outputDir = argv[index + 1] ?? options.outputDir;
      index += 1;
    } else if (arg === "--route-timeout") {
      options.routeTimeoutMs = Number(argv[index + 1] ?? options.routeTimeoutMs);
      index += 1;
    } else if (arg === "--headed") {
      options.headed = true;
    }
  }

  options.baseUrl = options.baseUrl.replace(/\/+$/, "");
  return options;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHttp(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok || response.status === 404) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? "no response"}`);
}

function findChromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);

  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) throw new Error("Could not find Chrome or Edge. Set CHROME_PATH to a Chromium-compatible browser.");
  return found;
}

function killProcessTree(child) {
  if (!child?.pid || child.killed) return;
  if (process.platform === "win32") {
    spawnSync("taskkill.exe", ["/pid", String(child.pid), "/t", "/f"], { stdio: "ignore" });
    return;
  }
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
}

function killChromeProfileProcesses(userDataDir) {
  if (process.platform !== "win32" || !userDataDir) return;
  const escaped = userDataDir.replace(/'/g, "''");
  spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-Command",
      `$profile = '${escaped}'; Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like "*$profile*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`
    ],
    { stdio: "ignore" }
  );
}

async function waitForDevToolsPort(userDataDir, chrome, chromeState, timeoutMs = 45000) {
  const activePortPath = path.join(userDataDir, "DevToolsActivePort");
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (chromeState.launchError) throw chromeState.launchError;
    if (chrome.exitCode !== null || chrome.signalCode !== null) {
      throw new Error(`Chrome exited before DevTools was ready.\n${chromeState.stderr}`.trim());
    }
    try {
      const [portLine] = fs.readFileSync(activePortPath, "utf8").trim().split(/\r?\n/);
      const port = Number.parseInt(portLine, 10);
      if (Number.isInteger(port) && port > 0) return port;
    } catch (error) {
      if (error?.code !== "ENOENT" && error?.code !== "EBUSY") throw error;
    }
    await sleep(200);
  }
  throw new Error(`Timed out waiting for Chrome DevTools.\n${chromeState.stderr}`.trim());
}

class CdpClient {
  constructor(url) {
    this.url = url;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Set();
  }

  async connect() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Timed out connecting to Chrome DevTools")), 10000);
      this.ws.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.ws.addEventListener("error", () => {
        clearTimeout(timeout);
        reject(new Error("Chrome DevTools WebSocket failed"));
      });
    });

    this.ws.addEventListener("message", async (event) => {
      const data = typeof event.data === "string" ? event.data : await event.data.text();
      const message = JSON.parse(data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`.trim()));
        else resolve(message.result ?? {});
        return;
      }
      for (const listener of this.listeners) listener(message);
    });
  }

  onEvent(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  send(method, params = {}, sessionId = undefined) {
    const id = this.nextId;
    this.nextId += 1;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  close() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.close();
  }
}

async function evaluate(client, sessionId, expression, awaitPromise = false) {
  const result = await client.send(
    "Runtime.evaluate",
    { expression, awaitPromise, returnByValue: true },
    sessionId
  );
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed");
  return result.result?.value;
}

async function applyViewport(client, sessionId, viewport) {
  await client.send(
    "Emulation.setDeviceMetricsOverride",
    {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 2.8,
      mobile: viewport.mobile,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
      screenOrientation: {
        angle: viewport.orientation === "portraitPrimary" ? 0 : 90,
        type: viewport.orientation
      }
    },
    sessionId
  );
  await client.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 }, sessionId);
}

async function navigate(client, sessionId, url, timeoutMs) {
  await client.send("Page.navigate", { url }, sessionId);
  await waitForReady(client, sessionId, timeoutMs);
}

async function waitForReady(client, sessionId, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const state = await evaluate(
      client,
      sessionId,
      `(() => {
        const text = document.body?.innerText ?? "";
        const root = document.querySelector("#root");
        return {
          readyState: document.readyState,
          hasRoot: Boolean(root),
          textLength: text.length,
          loading: /Loading|Preparing|Checking session/i.test(text),
          errorBoundary: /Something went wrong|Application error/i.test(text)
        };
      })()`
    );
    if (state?.hasRoot && state.textLength > 80 && !state.loading && !state.errorBoundary) return state;
    await sleep(300);
  }
  throw new Error("Timed out waiting for Sipopedia route to settle.");
}

async function screenshot(client, sessionId, outputDir, viewport, step) {
  const screenshotDir = path.join(outputDir, "screenshots");
  fs.mkdirSync(screenshotDir, { recursive: true });
  const result = await client.send(
    "Page.captureScreenshot",
    { captureBeyondViewport: false, format: "png", fromSurface: true },
    sessionId
  );
  const filePath = path.join(screenshotDir, `${viewport.name}-${step}.png`);
  fs.writeFileSync(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

async function pageState(client, sessionId) {
  return evaluate(
    client,
    sessionId,
    `(() => ({
      hash: window.location.hash,
      text: document.body?.innerText ?? "",
      critical: Array.from(document.querySelectorAll("button, input, label, span, strong, h1, h2, h3, p"))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const text = (element.textContent || element.getAttribute("placeholder") || "").trim().replace(/\\s+/g, " ");
          return {
            text,
            tag: element.tagName.toLowerCase(),
            type: element.getAttribute("type") || "",
            top: Math.round(rect.top),
            bottom: Math.round(rect.bottom),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            fullyVisible: rect.top >= 0 && rect.left >= 0 && rect.bottom <= innerHeight && rect.right <= innerWidth
          };
        })
    }))()`
  );
}

async function clickButton(client, sessionId, labelPattern, routeTimeoutMs) {
  const clicked = await evaluate(
    client,
    sessionId,
    `(() => {
      const pattern = new RegExp(${JSON.stringify(labelPattern)}, "i");
      const button = Array.from(document.querySelectorAll("button")).find((candidate) =>
        pattern.test((candidate.textContent ?? "").trim())
      );
      if (!button) return false;
      button.click();
      return true;
    })()`
  );
  if (!clicked) throw new Error(`Could not find button matching ${labelPattern}.`);
  await waitForReady(client, sessionId, routeTimeoutMs);
}

async function scrollElementIntoView(client, sessionId, selector, labelPattern) {
  const scrolled = await evaluate(
    client,
    sessionId,
    `(() => {
      const pattern = new RegExp(${JSON.stringify(labelPattern)}, "i");
      const element = Array.from(document.querySelectorAll(${JSON.stringify(selector)})).find((candidate) =>
        pattern.test((candidate.textContent ?? "").trim())
      );
      if (!element) return false;
      element.scrollIntoView({ block: "center", inline: "nearest" });
      return true;
    })()`
  );
  if (!scrolled) throw new Error(`Could not scroll to element matching ${labelPattern}.`);
  await sleep(250);
}

function assertText(state, pattern, message) {
  if (!new RegExp(pattern, "i").test(state.text)) {
    throw new Error(message);
  }
}

function assertHash(state, pattern, message) {
  if (!new RegExp(pattern, "i").test(state.hash)) {
    throw new Error(`${message} Actual hash: ${state.hash}`);
  }
}

function assertVisibleCritical(state, pattern, message) {
  const regex = new RegExp(pattern, "i");
  const match = state.critical.find((item) => regex.test(item.text) && item.fullyVisible);
  if (!match) throw new Error(message);
}

function assertVisibleEmailInput(state) {
  const match = state.critical.find((item) => item.tag === "input" && item.type === "email" && item.fullyVisible);
  if (!match) throw new Error("Email magic-link field is not fully visible in the login viewport.");
}

async function runViewportFlow(client, sessionId, baseUrl, outputDir, routeTimeoutMs, viewport) {
  const screenshots = [];
  const failures = [];
  const capture = async (step) => {
    screenshots.push(await screenshot(client, sessionId, outputDir, viewport, step));
  };
  const check = (fn) => {
    try {
      fn();
    } catch (error) {
      failures.push(error.message);
    }
  };

  await applyViewport(client, sessionId, viewport);
  await navigate(client, sessionId, `${baseUrl}/#home`, routeTimeoutMs);
  await capture("01-home");
  let state = await pageState(client, sessionId);
  check(() => assertText(state, "Learn drinks visually, from source to service", "Homepage promise is missing."));
  check(() => assertText(state, "\\$10|10/month", "Homepage $10 membership signal is missing."));
  check(() => assertText(state, "Watch previews", "Homepage preview action is missing."));

  await clickButton(client, sessionId, "Start for \\$10/month", routeTimeoutMs);
  await capture("02-pricing");
  state = await pageState(client, sessionId);
  check(() => assertHash(state, "pricing\\?", "Pricing route did not open."));
  check(() => assertHash(state, "next=app%2Fbtg|next=app/btg", "Saved Beyond The Glass destination was not preserved into pricing."));
  check(() => assertText(state, "\\$10|10/month|10 per month", "Pricing page does not show the membership price."));
  check(() => assertText(state, "Saved Preview Path|Continue the room|After checkout|Beyond The Glass", "Pricing page does not show the saved preview destination."));
  check(() => assertVisibleCritical(state, "Continue to Checkout", "Pricing checkout CTA is not fully visible in the pricing viewport."));
  check(() => assertVisibleCritical(state, "Membership Help", "Pricing help CTA is not fully visible in the pricing viewport."));

  await clickButton(client, sessionId, "Continue to Checkout", routeTimeoutMs);
  await capture("03-checkout");
  state = await pageState(client, sessionId);
  check(() => assertHash(state, "checkout\\?", "Checkout route did not open."));
  check(() => assertText(state, "Login required|Log In to Continue", "Checkout account guard is missing for unsigned buyers."));
  check(() => assertText(state, "Beyond The Glass", "Checkout lost the saved room label."));
  check(() => assertText(state, "Assisted Enrollment", "Checkout fallback enrollment path is missing."));

  await clickButton(client, sessionId, "Log In to Continue", routeTimeoutMs);
  await capture("04-login");
  state = await pageState(client, sessionId);
  check(() => assertHash(state, "login\\?", "Login route did not open."));
  check(() => assertText(state, "After login", "Login page does not show the continuation step."));
  check(() => assertText(state, "Saved room", "Login page does not show the saved-room label."));
  check(() => assertText(state, "Beyond The Glass", "Login page does not show Beyond The Glass as the saved room."));
  check(() => assertText(state, "Log In with Google|Google Login Unavailable", "Login page does not show Google login immediately."));
  check(() => assertText(state, "Email magic link", "Login page does not show the email magic-link fallback immediately."));
  check(() => assertText(state, "Send Magic Link", "Login page does not show the magic-link submit button."));
  check(() => assertVisibleCritical(state, "Saved room", "Saved-room proof is not fully visible in the login viewport."));
  check(() => assertVisibleCritical(state, "Log In with Google|Google Login Unavailable", "Google login button is not fully visible in the login viewport."));
  check(() => assertVisibleCritical(state, "Send Magic Link", "Send Magic Link button is not fully visible in the login viewport."));
  check(() => assertVisibleEmailInput(state));

  const fakeSessionId = "cs_test_mobileproof_1234567890abcdef";
  await navigate(
    client,
    sessionId,
    `${baseUrl}/#success?plan=pro&source=checkout-success&next=app%2Fbtg&session_id=${fakeSessionId}`,
    routeTimeoutMs
  );
  await scrollElementIntoView(client, sessionId, ".checkout-session-reference", "Checkout reference");
  await capture("05-success-proof");
  state = await pageState(client, sessionId);
  check(() => assertHash(state, "success\\?", "Success route did not open."));
  check(() => assertText(state, "Membership Checkout Complete", "Success page headline is missing."));
  check(() => assertText(state, "Checkout reference", "Success page checkout reference label is missing."));
  check(() => assertText(state, fakeSessionId, "Success page does not show the full checkout session reference."));
  check(() => assertText(state, "Copy into Admin proof or Membership Help", "Success page does not explain where to use the copied reference."));
  check(() => assertText(state, "Copy proof note", "Success page proof-note copy action is missing."));
  check(() => assertText(state, "Same account", "Success page live-proof same-account cue is missing."));
  check(() => assertText(state, "Same row", "Success page live-proof same-row cue is missing."));
  check(() => assertVisibleCritical(state, "Checkout reference", "Checkout reference is not fully visible in the success viewport."));
  check(() => assertVisibleCritical(state, "Copy", "Checkout reference copy action is not fully visible in the success viewport."));
  check(() => assertVisibleCritical(state, "Copy proof note", "Success proof-note copy action is not fully visible in the success viewport."));

  await scrollElementIntoView(client, sessionId, "button", "Membership Help");
  await capture("06-success-actions");
  state = await pageState(client, sessionId);
  check(() => assertVisibleCritical(state, "Refresh Access", "Refresh Access button is not fully visible after scrolling success actions into view."));
  check(() => assertVisibleCritical(state, "Membership Help", "Membership Help button is not fully visible after scrolling success actions into view."));
  check(() => assertVisibleCritical(state, "View Membership Details", "Membership Details button is not fully visible after scrolling success actions into view."));

  await navigate(
    client,
    sessionId,
    `${baseUrl}/#cancel?plan=pro&source=checkout-cancel&next=app%2Fbtg`,
    routeTimeoutMs
  );
  await capture("07-cancel-proof");
  state = await pageState(client, sessionId);
  check(() => assertHash(state, "cancel\\?", "Cancel route did not open."));
  check(() => assertText(state, "Membership Checkout Canceled", "Cancel recovery headline is missing."));
  check(() => assertText(state, "No charge", "Cancel recovery no-charge proof is missing."));
  check(() => assertText(state, "Beyond The Glass", "Cancel recovery lost the saved destination label."));
  check(() => assertText(state, "Retry Membership Checkout", "Cancel recovery retry action is missing."));
  check(() => assertText(state, "Membership Support", "Cancel recovery support action is missing."));

  await scrollElementIntoView(client, sessionId, "button", "Retry Membership Checkout");
  await capture("08-cancel-actions");
  state = await pageState(client, sessionId);
  check(() => assertVisibleCritical(state, "Retry Membership Checkout", "Retry Membership Checkout button is not fully visible in the cancel viewport."));
  check(() => assertVisibleCritical(state, "Membership Support", "Membership Support button is not fully visible in the cancel viewport."));

  return { viewport: viewport.name, ok: failures.length === 0, failures, screenshots };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  await waitForHttp(options.baseUrl, options.routeTimeoutMs);
  fs.mkdirSync(options.outputDir, { recursive: true });

  const chromePath = findChromePath();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "sipopedia-first-dollar-qa-chrome-"));
  const chromeArgs = [
    "--remote-debugging-port=0",
    `--user-data-dir=${userDataDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-extensions",
    "--window-size=900,900"
  ];
  if (!options.headed) chromeArgs.push("--headless=new");

  const chrome = spawn(chromePath, chromeArgs, {
    stdio: ["ignore", "ignore", "pipe"],
    detached: process.platform !== "win32",
    windowsHide: true
  });
  const chromeState = { launchError: null, stderr: "" };
  chrome.on("error", (error) => {
    chromeState.launchError = error;
  });
  chrome.stderr.on("data", (chunk) => {
    chromeState.stderr = `${chromeState.stderr}${chunk}`.slice(-8000);
  });

  let client = null;
  try {
    const remotePort = await waitForDevToolsPort(userDataDir, chrome, chromeState);
    const version = await (await fetch(`http://127.0.0.1:${remotePort}/json/version`)).json();
    client = new CdpClient(version.webSocketDebuggerUrl);
    await client.connect();
    const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await client.send("Target.attachToTarget", { targetId, flatten: true });
    await client.send("Page.enable", {}, sessionId);
    await client.send("Runtime.enable", {}, sessionId);

    const results = [];
    for (const viewport of viewports) {
      process.stdout.write(`Checking first-dollar mobile path: ${viewport.name} ... `);
      const result = await runViewportFlow(client, sessionId, options.baseUrl, options.outputDir, options.routeTimeoutMs, viewport);
      results.push(result);
      process.stdout.write(result.ok ? "ok\n" : `FAIL (${result.failures.join("; ")})\n`);
    }

    const report = {
      baseUrl: options.baseUrl,
      generatedAt: new Date().toISOString(),
      results
    };
    fs.writeFileSync(path.join(options.outputDir, "report.json"), JSON.stringify(report, null, 2));

    const failed = results.filter((result) => !result.ok);
    console.log(`First-dollar mobile path QA: ${results.length - failed.length}/${results.length} viewports passed.`);
    console.log(`Screenshots and report: ${options.outputDir}`);
    if (failed.length) process.exitCode = 1;
  } finally {
    if (client) client.close();
    killProcessTree(chrome);
    killChromeProfileProcesses(userDataDir);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
