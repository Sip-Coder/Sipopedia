import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localPreviewAccessKey = "sipstudies:local-preview-access";
const defaultRouteTimeoutMs = 12000;

const explicitRoutes = [
  "/#home",
  "/#pricing",
  "/#pricing?plan=starter",
  "/#pricing?plan=founding",
  "/#support",
  "/#study-paths",
  "/#checkout",
  "/#checkout?plan=starter",
  "/#checkout?plan=founding",
  "/#powerful-point",
  "/#login",
  "/#logout",
  "/#account",
  "/#account/avatar",
  "/#terms",
  "/#privacy",
  "/#refund",
  "/#success",
  "/#cancel",
  "/#app/launch",
  "/#app/sip-academy",
  "/#app/sip-game",
  "/#app/sipopedia",
  "/#app/beverage-quiz",
  "/#app/study-sheets",
  "/#app/service-roleplay",
  "/#app/maps",
  "/#app/regions",
  "/#app/regions/wine/united-states/napa-valley",
  "/#app/regions/wine/australia/barossa-valley",
  "/#app/grapes",
  "/#app/grapes/cabernet-sauvignon",
  "/#app/grapes/hops/cascade",
  "/#app/cocktails",
  "/#app/resources",
  "/#app/flavor-wheel",
  "/#app/cellar-scanner",
  "/#app/tasting-journal",
  "/#app/flavors",
  "/#app/beverage-news",
  "/#app/flavor-blog",
  "/#app/favorites",
  "/#app/ai-winecast",
  "/#app/ai-winecast/ai-winecast-ep-002",
  "/#app/tasting-groups",
  "/#app/ai-news",
  "/#app/somm-events",
  "/admin",
  "/admin/terminology",
  "/#route-that-does-not-exist",
  "/route-that-does-not-exist"
];

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.SMOKE_BASE_URL ?? null,
    port: Number(process.env.SMOKE_PORT ?? 5191),
    keepServer: false,
    headed: false,
    routeTimeoutMs: Number(process.env.SMOKE_ROUTE_TIMEOUT_MS ?? defaultRouteTimeoutMs)
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base-url") {
      options.baseUrl = argv[index + 1];
      index += 1;
    } else if (arg === "--port") {
      options.port = Number(argv[index + 1]);
      index += 1;
    } else if (arg === "--keep-server") {
      options.keepServer = true;
    } else if (arg === "--headed") {
      options.headed = true;
    } else if (arg === "--route-timeout") {
      options.routeTimeoutMs = Number(argv[index + 1]);
      index += 1;
    }
  }

  return options;
}

function normalizeBaseUrl(rawUrl) {
  return rawUrl.replace(/\/+$/, "");
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
  if (!found) {
    throw new Error("Could not find Chrome or Edge. Set CHROME_PATH to a Chromium-compatible browser.");
  }
  return found;
}

function npmInvocation(args) {
  if (process.platform === "win32") {
    return {
      command: process.env.ComSpec ?? "cmd.exe",
      args: ["/d", "/s", "/c", "npm.cmd", ...args]
    };
  }

  return {
    command: "npm",
    args
  };
}

async function waitForHttp(url, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok || response.status === 404) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? "no response"}`);
}

async function waitForDevToolsPort(userDataDir, chrome, chromeState, timeoutMs = 60000) {
  const activePortPath = path.join(userDataDir, "DevToolsActivePort");
  const deadline = Date.now() + timeoutMs;
  let lastError = null;

  while (Date.now() < deadline) {
    if (chromeState.launchError) {
      throw new Error(`Chrome failed to launch: ${chromeState.launchError.message}`);
    }
    if (chrome.exitCode !== null || chrome.signalCode !== null) {
      const reason = chrome.exitCode !== null ? `code ${chrome.exitCode}` : `signal ${chrome.signalCode}`;
      const stderr = chromeState.stderr.trim();
      throw new Error(`Chrome exited with ${reason} before DevTools was ready${stderr ? `:\n${stderr}` : "."}`);
    }

    try {
      const [portLine] = fs.readFileSync(activePortPath, "utf8").trim().split(/\r?\n/);
      const port = Number.parseInt(portLine, 10);
      if (Number.isInteger(port) && port > 0 && port <= 65535) return port;
      lastError = new Error(`invalid DevTools port ${JSON.stringify(portLine)}`);
    } catch (error) {
      if (error?.code !== "ENOENT") lastError = error;
    }

    await sleep(250);
  }

  const stderr = chromeState.stderr.trim();
  throw new Error(
    `Timed out waiting for Chrome DevTools port${lastError ? `: ${lastError.message}` : ""}${stderr ? `\nChrome stderr:\n${stderr}` : ""}`
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      `$profile = '${escaped}'; Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'chrome.exe' -and $_.CommandLine -like "*$profile*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`
    ],
    { stdio: "ignore" }
  );
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
        if (message.error) {
          reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`.trim()));
        } else {
          resolve(message.result ?? {});
        }
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

  async close() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }
}

function textFromConsoleArgs(args = []) {
  return args
    .map((arg) => {
      if (typeof arg.value === "string") return arg.value;
      if (arg.description) return arg.description;
      return JSON.stringify(arg.value ?? "");
    })
    .join(" ");
}

function isSameOriginResource(baseUrl, resourceUrl) {
  try {
    return new URL(resourceUrl).origin === new URL(baseUrl).origin;
  } catch {
    return false;
  }
}

function isBrowserCanceledRequest(params) {
  return params.canceled === true || params.errorText === "net::ERR_ABORTED";
}

function routeLabel(route) {
  return route.replace(/^\/#?/, "") || "root";
}

async function evaluate(client, sessionId, expression, awaitPromise = false) {
  const result = await client.send(
    "Runtime.evaluate",
    {
      expression,
      awaitPromise,
      returnByValue: true
    },
    sessionId
  );
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text ?? "Runtime evaluation failed");
  }
  return result.result?.value;
}

async function waitForRouteSettled(client, sessionId, route, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  let latest = null;
  while (Date.now() < deadline) {
    latest = await evaluate(
      client,
      sessionId,
      `(() => {
        const root = document.querySelector("#root");
        const text = document.body?.innerText ?? "";
        const rootText = root?.textContent?.trim() ?? "";
        const pricingPage = document.querySelector(".pricing-page");
        const pricingCards = Array.from(document.querySelectorAll(".pricing-grid .pricing-card"));
        const pricingText = pricingPage?.textContent ?? "";
        const checkoutPage = document.querySelector(".checkout-page");
        const checkoutText = checkoutPage?.textContent ?? "";
        const hasRetiredPricingCopy = (value) =>
          /(?:\\bStarter\\b|Founding Cohort|\\$\\s*0(?:\\s+forever)?|\\$\\s*1,?200)/i.test(value);
        return {
          readyState: document.readyState,
          textLength: text.trim().length,
          rootTextLength: rootText.length,
          hasErrorBoundary: text.includes("Something went wrong"),
          hasWorkspaceLoading: text.includes("Loading workspace...") && text.includes("Preparing your next module."),
          hasPaywall: Boolean(document.querySelector(".paywall-panel")),
          hasNotFoundRecovery: text.includes("We couldn't find that page"),
          pricingCardCount: pricingCards.length,
          pricingHasTenMonthly: pricingCards.some((card) => {
            const cardText = card.textContent ?? "";
            return /\\$\\s*10\\b/.test(cardText) && /per\\s+month/i.test(cardText);
          }),
          pricingHasRetiredPlanCopy: hasRetiredPricingCopy(pricingText),
          checkoutHasTenMonthly:
            /\\$\\s*10\\b/.test(checkoutText) &&
            /(?:per\\s+month|monthly)/i.test(checkoutText),
          checkoutHasRetiredPlanCopy: hasRetiredPricingCopy(checkoutText),
          checkoutPlanSwitcherCount: checkoutPage
            ? checkoutPage.querySelectorAll(".checkout-plan-switcher").length
            : 0,
          location: window.location.href
        };
      })()`
    );

    if (latest.hasErrorBoundary) return latest;
    if (latest.readyState === "complete" && latest.rootTextLength > 80 && !latest.hasWorkspaceLoading) return latest;
    await sleep(300);
  }

  return {
    ...(latest ?? {}),
    timedOut: true,
    route
  };
}

async function navigateAndCheck(client, sessionId, baseUrl, route, routeTimeoutMs) {
  const routeEvents = {
    consoleErrors: [],
    exceptions: [],
    failedRequests: [],
    requestUrls: new Map()
  };

  const removeListener = client.onEvent((message) => {
    if (message.sessionId !== sessionId) return;
    const params = message.params ?? {};
    if (message.method === "Runtime.consoleAPICalled" && params.type === "error") {
      routeEvents.consoleErrors.push(textFromConsoleArgs(params.args));
    } else if (message.method === "Runtime.exceptionThrown") {
      routeEvents.exceptions.push(params.exceptionDetails?.exception?.description ?? params.exceptionDetails?.text ?? "Runtime exception");
    } else if (message.method === "Network.requestWillBeSent") {
      routeEvents.requestUrls.set(params.requestId, {
        url: params.request?.url ?? "",
        type: params.type ?? ""
      });
    } else if (message.method === "Network.responseReceived") {
      const responseUrl = params.response?.url ?? "";
      const status = params.response?.status ?? 0;
      if (status >= 400 && isSameOriginResource(baseUrl, responseUrl) && !responseUrl.endsWith(".map")) {
        routeEvents.failedRequests.push(`${status} ${responseUrl}`);
      }
    } else if (message.method === "Network.loadingFailed") {
      if (isBrowserCanceledRequest(params)) return;
      const request = routeEvents.requestUrls.get(params.requestId);
      const requestUrl = request?.url ?? "";
      const requestWasCancelled = params.canceled === true || params.errorText === "net::ERR_ABORTED";
      if (requestWasCancelled) return;
      if (requestUrl && isSameOriginResource(baseUrl, requestUrl) && !requestUrl.endsWith(".map")) {
        routeEvents.failedRequests.push(`${params.errorText ?? "failed"} ${requestUrl}`);
      }
    }
  });

  try {
    await client.send("Page.navigate", { url: "about:blank" }, sessionId);
    await sleep(100);
    const url = `${baseUrl}${route}`;
    await client.send("Page.navigate", { url }, sessionId);
    await sleep(700);
    const state = await waitForRouteSettled(client, sessionId, route, routeTimeoutMs);
    const failures = [];
    if (state.hasErrorBoundary) failures.push("error boundary");
    if (state.hasWorkspaceLoading || state.timedOut) failures.push("stuck loading");
    if ((state.rootTextLength ?? 0) <= 80) failures.push("blank or near-blank root");
    if (route.startsWith("/#app/") && route !== "/#app/launch" && state.hasPaywall) failures.push("paywall blocked workspace render");
    if (route.includes("route-that-does-not-exist") && !state.hasNotFoundRecovery) failures.push("missing not-found recovery");
    if (route.startsWith("/#pricing")) {
      if (state.pricingCardCount !== 1) failures.push(`expected one pricing plan, found ${state.pricingCardCount ?? 0}`);
      if (!state.pricingHasTenMonthly) failures.push("pricing is missing the $10 per month membership");
      if (state.pricingHasRetiredPlanCopy) failures.push("pricing includes retired Starter or Founding plan copy");
    }
    if (route.startsWith("/#checkout")) {
      if (!state.checkoutHasTenMonthly) failures.push("checkout is missing the $10 monthly membership");
      if (state.checkoutHasRetiredPlanCopy) failures.push("checkout includes retired Starter or Founding plan copy");
      if ((state.checkoutPlanSwitcherCount ?? 0) !== 0) failures.push("checkout still renders a plan switcher");
    }
    if (routeEvents.exceptions.length) failures.push(`runtime exception: ${routeEvents.exceptions[0]}`);
    if (routeEvents.consoleErrors.length) failures.push(`console error: ${routeEvents.consoleErrors[0]}`);
    if (routeEvents.failedRequests.length) failures.push(`failed same-origin request: ${routeEvents.failedRequests[0]}`);

    return {
      route,
      label: routeLabel(route),
      ok: failures.length === 0,
      failures,
      state,
      consoleErrors: routeEvents.consoleErrors,
      exceptions: routeEvents.exceptions,
      failedRequests: routeEvents.failedRequests
    };
  } finally {
    removeListener();
  }
}

async function main() {
  if (typeof WebSocket !== "function") {
    throw new Error("This smoke script requires a Node runtime with global WebSocket support.");
  }

  const options = parseArgs(process.argv.slice(2));
  const startedProcesses = [];
  let baseUrl = options.baseUrl ? normalizeBaseUrl(options.baseUrl) : null;

  if (!baseUrl) {
    baseUrl = `http://127.0.0.1:${options.port}`;
    const previewCommand = npmInvocation(["run", "start", "--", "--host", "127.0.0.1", "--port", String(options.port)]);
    console.log(`Starting production server at ${baseUrl}`);
    const preview = spawn(
      previewCommand.command,
      previewCommand.args,
      {
        cwd: repoRoot,
        stdio: ["ignore", "pipe", "pipe"],
        detached: process.platform !== "win32",
        windowsHide: true
      }
    );
    startedProcesses.push(preview);
    preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
    preview.stderr.on("data", (chunk) => process.stderr.write(chunk));
    await waitForHttp(baseUrl);
    console.log("Production server is responding.");
  }

  const chromePath = findChromePath();
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "sipstudies-smoke-chrome-"));
  console.log("Starting Chrome DevTools with an OS-assigned port");
  const chromeArgs = [
    "--remote-debugging-port=0",
    `--user-data-dir=${userDataDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-extensions",
    "--window-size=1440,1200"
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
  startedProcesses.push(chrome);

  try {
    const remotePort = await waitForDevToolsPort(userDataDir, chrome, chromeState);
    console.log(`Chrome DevTools selected port ${remotePort}`);
    const version = await waitForHttp(`http://127.0.0.1:${remotePort}/json/version`);
    const versionPayload = await version.json();
    const client = new CdpClient(versionPayload.webSocketDebuggerUrl);
    await client.connect();
    console.log("Chrome DevTools connected.");
    const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await client.send("Target.attachToTarget", { targetId, flatten: true });
    await client.send("Page.enable", {}, sessionId);
    await client.send("Runtime.enable", {}, sessionId);
    await client.send("Network.enable", {}, sessionId);
    await client.send("Log.enable", {}, sessionId);

    await client.send("Page.navigate", { url: `${baseUrl}/#home` }, sessionId);
    await sleep(700);
    await evaluate(
      client,
      sessionId,
      `(() => {
        localStorage.setItem(${JSON.stringify(localPreviewAccessKey)}, "1");
        window.dispatchEvent(new Event("sipstudies:local-preview-access-changed"));
        return true;
      })()`
    );

    const results = [];
    for (const route of explicitRoutes) {
      process.stdout.write(`Checking ${route} ... `);
      const result = await navigateAndCheck(client, sessionId, baseUrl, route, options.routeTimeoutMs);
      results.push(result);
      process.stdout.write(result.ok ? "ok\n" : `FAIL (${result.failures.join("; ")})\n`);
    }

    await client.close();

    const failed = results.filter((result) => !result.ok);
    console.log("");
    console.log(`Route smoke summary: ${results.length - failed.length}/${results.length} passed`);
    if (failed.length) {
      for (const result of failed) {
        console.log(`- ${result.route}: ${result.failures.join("; ")}`);
      }
      process.exitCode = 1;
    }
  } finally {
    if (!options.keepServer) {
      for (const child of startedProcesses.reverse()) {
        killProcessTree(child);
      }
      killChromeProfileProcesses(userDataDir);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
