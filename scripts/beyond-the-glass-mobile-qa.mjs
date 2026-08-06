import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const baseUrl = (process.env.BTG_QA_BASE_URL ?? "http://127.0.0.1:5100").replace(/\/+$/, "");
const route = "/#app/btg";
const localPreviewAccessKey = "sipstudies:local-preview-access";
const configuredViewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 }
];
const viewportFilter = process.env.BTG_QA_VIEWPORT?.trim();
const viewports = viewportFilter
  ? configuredViewports.filter(({ width, height }) => `${width}x${height}` === viewportFilter)
  : configuredViewports;
const sceneIds = [
  "academy-plaza",
  "guides-at-sunrise",
  "two-regions",
  "rain-and-roots",
  "vine-and-berry",
  "harvest",
  "crush-house",
  "fermentation",
  "wine-crossroads",
  "laboratory",
  "barrel-aging",
  "barrel-workbench",
  "finishing-bench",
  "sustainability-loop",
  "bottling",
  "bottle-passport",
  "tasting-flight",
  "warehouse-logistics",
  "market",
  "restaurant-buying",
  "restaurant",
  "first-sip"
];
const allScenes = sceneIds.map((id, index) => ({
  id,
  number: String(index + 1).padStart(2, "0"),
  range: [index / sceneIds.length, (index + 1) / sceneIds.length]
}));
const sceneFilter = process.env.BTG_QA_SCENE?.trim();
const scenes = sceneFilter ? allScenes.filter(({ id }) => id === sceneFilter) : allScenes;

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
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
  if (!found) throw new Error("Could not find Chrome or Edge. Set CHROME_PATH.");
  return found;
}

async function waitForHttp(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
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
  throw new Error(
    `Local preview is not responding at ${url}. Start it before running this check. ${lastError?.message ?? ""}`.trim()
  );
}

async function waitForDevToolsPort(userDataDir, chrome, chromeState, timeoutMs = 30000) {
  const portFile = path.join(userDataDir, "DevToolsActivePort");
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (chromeState.launchError) throw chromeState.launchError;
    if (chrome.exitCode !== null || chrome.signalCode !== null) {
      throw new Error(`Chrome exited before DevTools was ready.\n${chromeState.stderr}`.trim());
    }
    try {
      const port = Number.parseInt(fs.readFileSync(portFile, "utf8").split(/\r?\n/)[0], 10);
      if (Number.isInteger(port) && port > 0) return port;
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    await sleep(200);
  }
  throw new Error(`Timed out waiting for Chrome DevTools.\n${chromeState.stderr}`.trim());
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
  if (process.platform !== "win32") return;
  const escaped = userDataDir.replaceAll("'", "''");
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

async function safelyRemoveChromeProfile(userDataDir) {
  const resolved = path.resolve(userDataDir);
  if (
    path.dirname(resolved) !== path.resolve(os.tmpdir()) ||
    !path.basename(resolved).startsWith("sipopedia-btg-qa-chrome-")
  ) {
    return;
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      fs.rmSync(resolved, { force: true, recursive: true });
      return;
    } catch (error) {
      if (!["EBUSY", "EPERM"].includes(error?.code)) throw error;
      await sleep(200 * (attempt + 1));
    }
  }

  console.warn(`QA passed, but Windows is still releasing the temporary Chrome profile: ${resolved}`);
}

class CdpClient {
  constructor(url) {
    this.url = url;
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Timed out connecting to Chrome DevTools.")), 10000);
      this.ws.addEventListener("open", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.ws.addEventListener("error", () => {
        clearTimeout(timeout);
        reject(new Error("Chrome DevTools WebSocket failed."));
      });
    });
    this.ws.addEventListener("message", async (event) => {
      const message = JSON.parse(typeof event.data === "string" ? event.data : await event.data.text());
      if (!message.id || !this.pending.has(message.id)) return;
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result ?? {});
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    return new Promise((resolve, reject) => this.pending.set(id, { reject, resolve }));
  }

  close() {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.close();
  }
}

async function evaluate(client, sessionId, expression, awaitPromise = false) {
  const response = await client.send(
    "Runtime.evaluate",
    { awaitPromise, expression, returnByValue: true },
    sessionId
  );
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text);
  }
  return response.result?.value;
}

async function waitForEvaluation(client, sessionId, expression, timeoutMs = 12000) {
  const deadline = Date.now() + timeoutMs;
  let lastValue;
  while (Date.now() < deadline) {
    lastValue = await evaluate(client, sessionId, expression);
    if (lastValue) return lastValue;
    await sleep(100);
  }
  throw new Error(`Timed out waiting for browser state: ${expression}\nLast value: ${JSON.stringify(lastValue)}`);
}

async function navigate(client, sessionId, url) {
  await client.send("Page.navigate", { url: "about:blank" }, sessionId);
  await sleep(80);
  await client.send("Page.navigate", { url }, sessionId);
  await waitForEvaluation(
    client,
    sessionId,
    `document.readyState === "complete" && !document.querySelector(".workspace-loading")`
  );
}

async function setStoryProgress(client, sessionId, progress, expectedScene) {
  await evaluate(
    client,
    sessionId,
    `(async () => {
      const section = document.querySelector(".btg-scroll-story");
      if (!(section instanceof HTMLElement)) return false;
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const travel = Math.max(1, section.getBoundingClientRect().height - window.innerHeight);
      window.scrollTo(0, sectionTop + travel * ${progress});
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return true;
    })()`,
    true
  );
  await waitForEvaluation(
    client,
    sessionId,
    `(() => {
      const stage = document.querySelector(".btg-stage");
      if (!(stage instanceof HTMLElement) || stage.dataset.scene !== ${JSON.stringify(expectedScene)}) return false;
      const current = Number.parseFloat(getComputedStyle(stage).getPropertyValue("--btg-progress"));
      return Number.isFinite(current) && Math.abs(current - ${progress}) <= 0.003;
    })()`
  );
  await waitForEvaluation(
    client,
    sessionId,
    `Array.from(document.querySelectorAll(".btg-stage__visual img"))
      .filter((image) => {
        const rect = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden" && Number.parseFloat(style.opacity || "1") > 0.02;
      })
      .every((image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0)`,
    15000
  );
  await sleep(250);
}

async function inspectStage(client, sessionId, expectedScene) {
  return evaluate(
    client,
    sessionId,
    `(() => {
      const stage = document.querySelector(".btg-stage");
      if (!(stage instanceof HTMLElement)) return { fatal: "Beyond The Glass stage is missing." };
      const tolerance = 1;
      const rect = (element) => {
        const value = element.getBoundingClientRect();
        return {
          bottom: value.bottom,
          height: value.height,
          left: value.left,
          right: value.right,
          top: value.top,
          width: value.width
        };
      };
      const effectiveOpacity = (element) => {
        let value = 1;
        for (let node = element; node instanceof HTMLElement && node !== stage.parentElement; node = node.parentElement) {
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden") return 0;
          value *= Number.parseFloat(style.opacity || "1");
        }
        return value;
      };
      const visible = (element) =>
        element instanceof HTMLElement &&
        effectiveOpacity(element) > 0.02 &&
        element.getBoundingClientRect().width > 0 &&
        element.getBoundingClientRect().height > 0;
      const stageRect = rect(stage);
      const activeNote = Array.from(
        stage.querySelectorAll('.btg-guide-note[aria-hidden="false"], .btg-field-note[aria-hidden="false"]')
      ).find(visible);
      const regionEntries = [
        ["header", stage.querySelector(".btg-stage__header")],
        [
          "visual",
          ${JSON.stringify(expectedScene)} === "academy-plaza"
            ? null
            : stage.querySelector(".btg-stage__visual")
        ],
        ["panel", stage.querySelector(".btg-story-panel")],
        ["dock", stage.querySelector(".btg-journey-dock")],
        ["plaza-entry", stage.querySelector(".btg-plaza-node--active")]
      ].filter(([, element]) => visible(element));
      const regions = Object.fromEntries(regionEntries.map(([name, element]) => [name, rect(element)]));
      const contained = (value) =>
        value.left >= stageRect.left - tolerance &&
        value.right <= stageRect.right + tolerance &&
        value.top >= stageRect.top - tolerance &&
        value.bottom <= stageRect.bottom + tolerance;
      const intersection = (a, b) =>
        Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
        Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      const overlaps = [];
      for (let index = 0; index < regionEntries.length; index += 1) {
        for (let other = index + 1; other < regionEntries.length; other += 1) {
          const first = regionEntries[index][0];
          const second = regionEntries[other][0];
          const area = intersection(regions[first], regions[second]);
          if (area > tolerance) overlaps.push({ area: Math.round(area), regions: [first, second] });
        }
      }
      const undersizedControls = Array.from(stage.querySelectorAll("button, a"))
        .filter(visible)
        .map((element) => ({ label: element.textContent?.trim() ?? "", rect: rect(element) }))
        .filter(({ rect: value }) => value.width < 44 - tolerance || value.height < 44 - tolerance);
      const activeImageFailures = Array.from(stage.querySelectorAll("img"))
        .filter((image) => effectiveOpacity(image) > 0.02)
        .filter((image) => !image.complete || image.naturalWidth <= 0 || image.naturalHeight <= 0)
        .map((image) => image.getAttribute("src") ?? "(missing src)");
      const fallbackCount = Array.from(stage.querySelectorAll(".btg-story-image--fallback")).filter(visible).length;
      const guideNote = stage.querySelector('.btg-guide-note[aria-hidden="false"]');
      const atlas = stage.querySelector(".btg-field-atlas");
      const atlasExpected = ${JSON.stringify(expectedScene)} !== "academy-plaza";
      const atlasNodeCount = stage.querySelectorAll(".btg-field-atlas__nodes button").length;
      const documentOverflow = Math.max(
        0,
        document.documentElement.scrollWidth - window.innerWidth,
        document.body?.scrollWidth - window.innerWidth || 0
      );
      const failures = [];
      if (documentOverflow > tolerance) failures.push("document horizontal overflow: " + documentOverflow + "px");
      for (const [name, value] of Object.entries(regions)) {
        if (!contained(value)) failures.push(name + " escapes the stage");
      }
      for (const overlap of overlaps) {
        failures.push(overlap.regions.join(" overlaps ") + " (" + overlap.area + "px²)");
      }
      for (const control of undersizedControls) {
        failures.push(
          "control below 44×44: " + JSON.stringify(control.label) +
          " (" + Math.round(control.rect.width) + "×" + Math.round(control.rect.height) + ")"
        );
      }
      if (visible(guideNote)) {
        failures.push("guide field note is visible before the learner opens guide notes");
      }
      if (visible(atlas) !== atlasExpected) {
        failures.push(atlasExpected ? "interactive field atlas is missing" : "field atlas is visible on Academy Plaza");
      }
      if (atlasExpected && atlasNodeCount < 1) {
        failures.push("interactive field atlas has no visible lesson nodes");
      }
      if (${JSON.stringify(expectedScene)} === "vine-and-berry" && atlasNodeCount !== 14) {
        failures.push("vine field atlas expected 14 lesson nodes, found " + atlasNodeCount);
      }
      if (activeNote) {
        const activeNoteRect = rect(activeNote);
        if (
          activeNoteRect.left < stageRect.left - tolerance ||
          activeNoteRect.right > stageRect.right + tolerance ||
          activeNoteRect.top < stageRect.top - tolerance ||
          activeNoteRect.bottom > stageRect.bottom + tolerance
        ) {
          failures.push("active note escapes the stage");
        }
        if (regions.dock && intersection(activeNoteRect, regions.dock) > 4) {
          failures.push("active note overlaps the journey dock");
        }
      }
      if (activeImageFailures.length > 0) failures.push("active images failed: " + activeImageFailures.join(", "));
      if (fallbackCount > 0) failures.push("visible archive-image fallback");
      return {
        activeImageFailures,
        activeNote: activeNote ? rect(activeNote) : null,
        activeNoteDockOverlap:
          activeNote && regions.dock ? intersection(rect(activeNote), regions.dock) : 0,
        documentOverflow,
        failures,
        atlasNodeCount,
        atlasVisible: visible(atlas),
        guideNoteVisible: visible(guideNote),
        overlaps,
        regions,
        scene: stage.dataset.scene,
        stage: stageRect,
        undersizedControls
      };
    })()`
  );
}

async function captureFailure(client, sessionId, directory, filename) {
  fs.mkdirSync(directory, { recursive: true });
  const result = await client.send(
    "Page.captureScreenshot",
    { captureBeyondViewport: false, format: "png", fromSurface: true },
    sessionId
  );
  fs.writeFileSync(path.join(directory, filename), Buffer.from(result.data, "base64"));
}

async function main() {
  if (typeof WebSocket !== "function") {
    throw new Error("This check requires Node 22.12+ with global WebSocket support.");
  }
  await waitForHttp(baseUrl);

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "sipopedia-btg-qa-chrome-"));
  const chrome = spawn(
    findChromePath(),
    [
      "--remote-debugging-port=0",
      `--user-data-dir=${userDataDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-networking",
      "--disable-extensions",
      "--headless=new",
      "--window-size=1200,1000"
    ],
    {
      detached: process.platform !== "win32",
      stdio: ["ignore", "ignore", "pipe"],
      windowsHide: true
    }
  );
  const chromeState = { launchError: null, stderr: "" };
  chrome.on("error", (error) => {
    chromeState.launchError = error;
  });
  chrome.stderr.on("data", (chunk) => {
    chromeState.stderr = `${chromeState.stderr}${chunk}`.slice(-6000);
  });

  let client;
  let failureDirectory;
  const failures = [];
  try {
    const port = await waitForDevToolsPort(userDataDir, chrome, chromeState);
    const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
    client = new CdpClient(version.webSocketDebuggerUrl);
    await client.connect();
    const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await client.send("Target.attachToTarget", { flatten: true, targetId });
    await client.send("Page.enable", {}, sessionId);
    await client.send("Runtime.enable", {}, sessionId);

    await navigate(client, sessionId, `${baseUrl}/#home`);
    await evaluate(
      client,
      sessionId,
      `localStorage.setItem(${JSON.stringify(localPreviewAccessKey)}, "1")`
    );

    for (const viewport of viewports) {
      await client.send(
        "Emulation.setDeviceMetricsOverride",
        {
          deviceScaleFactor: 1,
          height: viewport.height,
          mobile: true,
          screenHeight: viewport.height,
          screenWidth: viewport.width,
          width: viewport.width
        },
        sessionId
      );
      await client.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 }, sessionId);
      await navigate(client, sessionId, `${baseUrl}${route}`);
      await waitForEvaluation(
        client,
        sessionId,
        `document.querySelector(".btg-stage") && !document.querySelector(".workspace-error-boundary")`
      );
      await evaluate(
        client,
        sessionId,
        `document.fonts?.ready ? document.fonts.ready.then(() => true) : true`,
        true
      );

      for (const scene of scenes) {
        const entryProgress = scene.range[0] + Math.min(0.004, (scene.range[1] - scene.range[0]) / 10);
        const checkpoints = [
          { label: "entry", progress: entryProgress },
          { label: "mid", progress: (scene.range[0] + scene.range[1]) / 2 }
        ];
        for (const checkpoint of checkpoints) {
          await setStoryProgress(client, sessionId, checkpoint.progress, scene.id);
          const result = await inspectStage(client, sessionId, scene.id);
          const stateLabel = `${viewport.width}x${viewport.height}-scene-${scene.number}-${checkpoint.label}-${scene.id}`;
          if (result?.fatal || result?.failures?.length) {
            failureDirectory ??= path.join(
              os.tmpdir(),
              "sipopedia-btg-mobile-qa",
              new Date().toISOString().replaceAll(":", "-")
            );
            await captureFailure(client, sessionId, failureDirectory, `${stateLabel}.png`);
            failures.push({
              checkpoint,
              details: result,
              scene: scene.id,
              screenshot: path.join(failureDirectory, `${stateLabel}.png`),
              viewport
            });
            process.stdout.write("F");
          } else {
            process.stdout.write(".");
          }
        }
      }
    }
    process.stdout.write("\n");

    if (failures.length > 0) {
      fs.mkdirSync(failureDirectory, { recursive: true });
      fs.writeFileSync(
        path.join(failureDirectory, "report.json"),
        `${JSON.stringify({ baseUrl, failures }, null, 2)}\n`
      );
      console.error(`Beyond The Glass mobile QA failed in ${failures.length} state(s).`);
      for (const failure of failures) {
        console.error(
          `- ${failure.viewport.width}×${failure.viewport.height} ${failure.scene} ${failure.checkpoint.label}: ` +
            (failure.details?.fatal ?? failure.details?.failures?.join("; "))
        );
      }
      console.error(`Failure screenshots and report: ${failureDirectory}`);
      process.exitCode = 1;
    } else {
      console.log(`Beyond The Glass mobile QA passed: ${viewports.length * scenes.length * 2} states.`);
    }
  } finally {
    client?.close();
    killProcessTree(chrome);
    killChromeProfileProcesses(userDataDir);
    await sleep(100);
    await safelyRemoveChromeProfile(userDataDir);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
