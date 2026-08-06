import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { journeyOfADrop } from "../src/data/beyondTheGlassChapters.ts";
import { breweryFieldTrip } from "../src/data/beyondTheGlassBrewery.ts";
import { coffeeFieldTrip } from "../src/data/beyondTheGlassCoffee.ts";
import { distilleryFieldTrip } from "../src/data/beyondTheGlassDistillery.ts";
import { energyFieldTrip } from "../src/data/beyondTheGlassEnergy.ts";
import { healthFieldTrip } from "../src/data/beyondTheGlassHealth.ts";
import { juiceFieldTrip } from "../src/data/beyondTheGlassJuice.ts";
import { kombuchaFieldTrip } from "../src/data/beyondTheGlassKombucha.ts";
import { milkFieldTrip } from "../src/data/beyondTheGlassMilk.ts";
import { sodasFieldTrip } from "../src/data/beyondTheGlassSodas.ts";
import { teaFieldTrip } from "../src/data/beyondTheGlassTea.ts";
import { waterFieldTrip } from "../src/data/beyondTheGlassWater.ts";

const baseUrl = (process.env.BTG_QA_BASE_URL ?? "http://127.0.0.1:5100").replace(/\/+$/, "");
const journeyKey = (process.env.BTG_QA_JOURNEY ?? "wine").trim().toLowerCase();
const chapterByJourney = {
  brewery: breweryFieldTrip,
  coffee: coffeeFieldTrip,
  distillery: distilleryFieldTrip,
  "energy-drinks": energyFieldTrip,
  "health-drinks": healthFieldTrip,
  juice: juiceFieldTrip,
  kombucha: kombuchaFieldTrip,
  milk: milkFieldTrip,
  sodas: sodasFieldTrip,
  tea: teaFieldTrip,
  water: waterFieldTrip,
  wine: journeyOfADrop
};
const selectedChapter = chapterByJourney[journeyKey];
const route = journeyKey === "wine" ? "/#app/btg" : `/#app/btg?journey=${journeyKey}`;
const localPreviewAccessKey = "sipstudies:local-preview-access";
const runStamp = new Date().toISOString().replaceAll(":", "-");
const outputDirectory = path.resolve(
  process.env.BTG_QA_OUTPUT_DIR ??
    path.join(os.tmpdir(), "sipopedia-btg-responsive-qa", runStamp)
);
const reportPath = path.join(outputDirectory, "report.json");
const evidenceMode = (process.env.BTG_QA_EVIDENCE ?? "failures").trim().toLowerCase();
const configurationErrors = [];

const numberFromEnvironment = (name, fallback, minimum, maximum) => {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return fallback;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value) || value < minimum || value > maximum) {
    configurationErrors.push(
      `${name} must be between ${minimum} and ${maximum}. Received ${JSON.stringify(raw)}.`
    );
    return fallback;
  }
  return value;
};

const thresholds = {
  maximumArtCropFraction: numberFromEnvironment("BTG_QA_MAX_ART_CROP", 0.02, 0, 0.9),
  maximumArtGutterFraction: numberFromEnvironment("BTG_QA_MAX_ART_GUTTER", 0.24, 0, 0.9),
  maximumNodeOverlapFraction: numberFromEnvironment("BTG_QA_MAX_NODE_OVERLAP", 0.1, 0, 1),
  minimumCanvasToVisualRatio: numberFromEnvironment("BTG_QA_MIN_CANVAS_WIDTH", 0.7, 0.25, 1),
  minimumDesktopVisualToStageRatio: numberFromEnvironment(
    "BTG_QA_MIN_DESKTOP_VISUAL_WIDTH",
    0.48,
    0.25,
    1
  ),
  minimumPhonePortraitVisualToStageRatio: numberFromEnvironment(
    "BTG_QA_MIN_PHONE_VISUAL_WIDTH",
    0.88,
    0.25,
    1
  ),
  minimumTargetSize: numberFromEnvironment("BTG_QA_MIN_TARGET", 44, 24, 80)
};

const canonicalViewports = [
  {
    height: 900,
    mobile: false,
    name: "desktop",
    orientation: "landscapePrimary",
    touch: false,
    width: 1440
  },
  {
    height: 768,
    mobile: false,
    name: "laptop",
    orientation: "landscapePrimary",
    touch: false,
    width: 1024
  },
  {
    height: 844,
    mobile: true,
    name: "phone-portrait",
    orientation: "portraitPrimary",
    touch: true,
    width: 390
  },
  {
    height: 390,
    mobile: true,
    name: "phone-landscape",
    orientation: "landscapePrimary",
    touch: true,
    width: 844
  }
];

const viewportFilter = process.env.BTG_QA_VIEWPORT?.trim();
const viewports = viewportFilter
  ? canonicalViewports.filter(
      ({ height, name, width }) => name === viewportFilter || `${width}x${height}` === viewportFilter
    )
  : canonicalViewports;

const authoredScenes = (selectedChapter?.scenes ?? []).map((scene, index) => ({
  expectedNodeCount:
    scene.id === "academy-plaza"
      ? 1
      : scene.id === "vine-and-berry"
        ? 14
        : scene.fieldNotes.length,
  fieldNoteTitles: scene.fieldNotes.map(({ title }) => title),
  id: scene.id,
  number: scene.number ?? String(index + 1).padStart(2, "0"),
  range: scene.range
}));
const sceneFilter = process.env.BTG_QA_SCENE?.trim();
const scenes = sceneFilter
  ? authoredScenes.filter(({ id, number }) => id === sceneFilter || number === sceneFilter)
  : authoredScenes;

const report = {
  baseUrl,
  evidenceMode,
  failures: [],
  finishedAt: null,
  generatedAt: new Date().toISOString(),
  interactions: [],
  journey: journeyKey,
  matrix: {
    checkpointsPerScene: 3,
    requestedScenes: sceneFilter ?? "all",
    requestedViewports: viewportFilter ?? "all",
    scenes: scenes.map(({ id, number }) => ({ id, number })),
    viewports
  },
  outputDirectory,
  route,
  runtimeIssues: [],
  states: [],
  status: "running",
  thresholds
};

const failureKeys = new Set();

function recordFailure(category, message, context = {}, details = undefined) {
  const failure = {
    category,
    context: { ...context },
    message,
    ...(details === undefined ? {} : { details })
  };
  const key = JSON.stringify([category, context.viewport, context.scene, context.checkpoint, context.node, message]);
  if (failureKeys.has(key)) return;
  failureKeys.add(key);
  report.failures.push(failure);
}

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
    `Preview is not responding at ${url}. Start it before running this check. ${lastError?.message ?? ""}`.trim()
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

async function safelyRemoveChromeProfile(userDataDir) {
  const resolved = path.resolve(userDataDir);
  if (
    path.dirname(resolved) !== path.resolve(os.tmpdir()) ||
    !path.basename(resolved).startsWith("sipopedia-btg-responsive-qa-")
  ) {
    return;
  }
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      fs.rmSync(resolved, { force: true, recursive: true });
      return;
    } catch (error) {
      if (!["EBUSY", "EPERM"].includes(error?.code)) throw error;
      await sleep(150 * (attempt + 1));
    }
  }
  console.warn(`Windows is still releasing the temporary Chrome profile: ${resolved}`);
}

class CdpClient {
  constructor(url) {
    this.listeners = new Map();
    this.nextId = 1;
    this.pending = new Map();
    this.url = url;
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
      if (message.id && this.pending.has(message.id)) {
        const { reject, resolve } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result ?? {});
        return;
      }
      if (!message.method) return;
      for (const listener of this.listeners.get(message.method) ?? []) {
        try {
          listener(message.params ?? {}, message.sessionId);
        } catch {
          // A reporter must never break the protocol client.
        }
      }
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) ?? [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
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
    await sleep(80);
  }
  throw new Error(`Timed out waiting for browser state: ${expression}\nLast value: ${JSON.stringify(lastValue)}`);
}

async function navigate(client, sessionId, url) {
  await client.send("Page.navigate", { url: "about:blank" }, sessionId);
  await sleep(50);
  await client.send("Page.navigate", { url }, sessionId);
  await waitForEvaluation(
    client,
    sessionId,
    `document.readyState === "complete" && !document.querySelector(".workspace-loading")`
  );
}

async function applyViewport(client, sessionId, viewport) {
  await client.send(
    "Emulation.setDeviceMetricsOverride",
    {
      deviceScaleFactor: 1,
      height: viewport.height,
      mobile: viewport.mobile,
      screenHeight: viewport.height,
      screenOrientation: {
        angle: viewport.orientation === "portraitPrimary" ? 0 : 90,
        type: viewport.orientation
      },
      screenWidth: viewport.width,
      width: viewport.width
    },
    sessionId
  );
  await client.send(
    "Emulation.setTouchEmulationEnabled",
    { enabled: viewport.touch, maxTouchPoints: viewport.touch ? 5 : 1 },
    sessionId
  );
}

async function prepareViewport(client, sessionId, viewport, context) {
  context.collect = false;
  await applyViewport(client, sessionId, viewport);
  await navigate(client, sessionId, `${baseUrl}/#home`);
  await evaluate(
    client,
    sessionId,
    `(() => {
      const keys = [];
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (key?.startsWith("sipopedia:btg:")) keys.push(key);
      }
      for (const key of keys) localStorage.removeItem(key);
      localStorage.setItem(${JSON.stringify(localPreviewAccessKey)}, "1");
      return keys.length;
    })()`
  );
  context.collect = true;
  await navigate(client, sessionId, `${baseUrl}${route}`);
  await waitForEvaluation(
    client,
    sessionId,
    `document.querySelector(".btg-stage") && !document.querySelector(".workspace-error-boundary")`
  );
  await evaluate(
    client,
    sessionId,
    `(() => {
      const id = "btg-responsive-qa-motion-freeze";
      if (!document.getElementById(id)) {
        const style = document.createElement("style");
        style.id = id;
        style.textContent = [
          "html { scroll-behavior: auto !important; }",
          ".btg-stage *, .btg-stage *::before, .btg-stage *::after {",
          "animation-delay: 0ms !important;",
          "animation-duration: 0.001ms !important;",
          "animation-iteration-count: 1 !important;",
          "transition-delay: 0ms !important;",
          "transition-duration: 0.001ms !important;",
          "}"
        ].join("\\n");
        document.head.append(style);
      }
      return true;
    })()`
  );
  await evaluate(
    client,
    sessionId,
    `document.fonts?.ready ? document.fonts.ready.then(() => true) : true`,
    true
  );
}

async function setStoryProgress(client, sessionId, progress, expectedScene) {
  let lastState = null;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    lastState = await evaluate(
      client,
      sessionId,
      `(async () => {
        const section = document.querySelector(".btg-scroll-story");
        if (!(section instanceof HTMLElement)) return { current: null, scene: null };
        const sectionTop = window.scrollY + section.getBoundingClientRect().top;
        const travel = Math.max(1, section.getBoundingClientRect().height - window.innerHeight);
        window.scrollTo({ behavior: "auto", left: 0, top: sectionTop + travel * ${progress} });
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const stage = document.querySelector(".btg-stage");
        return {
          current:
            stage instanceof HTMLElement
              ? Number.parseFloat(getComputedStyle(stage).getPropertyValue("--btg-progress"))
              : null,
          scene: stage instanceof HTMLElement ? stage.dataset.scene : null
        };
      })()`,
      true
    );
    if (
      lastState?.scene === expectedScene &&
      Number.isFinite(lastState.current) &&
      Math.abs(lastState.current - progress) <= 0.004
    ) {
      return;
    }
    await sleep(80);
  }
  throw new Error(
    `Could not position BTG at ${expectedScene} progress ${progress.toFixed(6)}. Last browser state: ${JSON.stringify(lastState)}`
  );
}

async function settleStage(client, sessionId) {
  return evaluate(
    client,
    sessionId,
    `(async () => {
      const stage = document.querySelector(".btg-stage");
      if (!(stage instanceof HTMLElement)) return false;
      if (document.fonts?.ready) await document.fonts.ready;
      const visible = (element) => {
        if (!(element instanceof Element)) return false;
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || 1) > 0.01 && box.width > 0 && box.height > 0;
      };
      await Promise.allSettled(
        Array.from(stage.querySelectorAll("img"))
          .filter(visible)
          .map((image) => image.decode?.() ?? Promise.resolve())
      );
      const backgroundUrls = new Set();
      for (const node of stage.querySelectorAll(".btg-field-atlas__nodes button")) {
        const value = getComputedStyle(node).getPropertyValue("--btg-atlas-node-image");
        const match = value.match(/url\\(["']?(.+?)["']?\\)/);
        if (match?.[1]) backgroundUrls.add(new URL(match[1], document.baseURI).href);
      }
      const backgroundFailures = [];
      await Promise.all(
        Array.from(backgroundUrls).map(
          (url) =>
            new Promise((resolve) => {
              const image = new Image();
              const done = (failed) => {
                if (failed) backgroundFailures.push(url);
                resolve();
              };
              image.onload = () => done(false);
              image.onerror = () => done(true);
              image.src = url;
              if (image.complete) done(image.naturalWidth <= 0);
              else setTimeout(() => done(image.naturalWidth <= 0), 5000);
            })
        )
      );
      window.__btgResponsiveQaBackgroundFailures = Array.from(new Set(backgroundFailures));
      let previous = "";
      let stableFrames = 0;
      for (let frame = 0; frame < 30 && stableFrames < 3; frame += 1) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const signature = Array.from(
          stage.querySelectorAll(
            ".btg-stage__header, .btg-stage__visual, .btg-field-atlas__canvas, .btg-journey-dock"
          )
        )
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return [rect.left, rect.top, rect.width, rect.height].map((value) => Math.round(value * 10) / 10).join(",");
          })
          .join("|");
        stableFrames = signature === previous ? stableFrames + 1 : 0;
        previous = signature;
      }
      return stableFrames >= 2;
    })()`,
    true
  );
}

async function inspectState(client, sessionId, scene, viewport) {
  const configuration = {
    expectedNodeCount: scene.expectedNodeCount,
    maximumArtCropFraction: thresholds.maximumArtCropFraction,
    maximumArtGutterFraction: thresholds.maximumArtGutterFraction,
    maximumNodeOverlapFraction: thresholds.maximumNodeOverlapFraction,
    minimumCanvasToVisualRatio: thresholds.minimumCanvasToVisualRatio,
    minimumDesktopVisualToStageRatio: thresholds.minimumDesktopVisualToStageRatio,
    minimumPhonePortraitVisualToStageRatio: thresholds.minimumPhonePortraitVisualToStageRatio,
    minimumTargetSize: thresholds.minimumTargetSize,
    phoneLandscape: viewport.name === "phone-landscape",
    phonePortrait: viewport.name === "phone-portrait",
    sceneId: scene.id
  };
  return evaluate(
    client,
    sessionId,
    `(() => {
      const config = ${JSON.stringify(configuration)};
      const stage = document.querySelector(".btg-stage");
      if (!(stage instanceof HTMLElement)) return { fatal: "Beyond The Glass stage is missing." };
      const tolerance = 2;
      const round = (value) => Math.round(value * 100) / 100;
      const rect = (element) => {
        const value = element.getBoundingClientRect();
        return {
          bottom: round(value.bottom),
          height: round(value.height),
          left: round(value.left),
          right: round(value.right),
          top: round(value.top),
          width: round(value.width)
        };
      };
      const effectiveOpacity = (element) => {
        let value = 1;
        for (let node = element; node instanceof Element; node = node.parentElement) {
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden") return 0;
          value *= Number.parseFloat(style.opacity || "1");
          if (node === stage) break;
        }
        return value;
      };
      const visible = (element) =>
        element instanceof Element &&
        effectiveOpacity(element) > 0.02 &&
        element.getBoundingClientRect().width > 0 &&
        element.getBoundingClientRect().height > 0;
      const intersection = (a, b) =>
        Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
        Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      const contained = (inner, outer) =>
        inner.left >= outer.left - tolerance &&
        inner.right <= outer.right + tolerance &&
        inner.top >= outer.top - tolerance &&
        inner.bottom <= outer.bottom + tolerance;
      const viewportRect = { bottom: innerHeight, height: innerHeight, left: 0, right: innerWidth, top: 0, width: innerWidth };
      const stageRect = rect(stage);
      const header = stage.querySelector(".btg-stage__header");
      const visual = stage.querySelector(".btg-stage__visual");
      const dock = stage.querySelector(".btg-journey-dock");
      const title = header?.querySelector("strong");
      const nodeKind = config.sceneId === "academy-plaza" ? "plaza" : "atlas";
      const canvas =
        nodeKind === "atlas"
          ? stage.querySelector(".btg-field-atlas__canvas")
          : stage.querySelector(".btg-plaza-map-layer") ?? visual;
      const detail =
        nodeKind === "atlas"
          ? stage.querySelector(".btg-field-atlas__detail")
          : null;
      const nodeSelector =
        nodeKind === "atlas"
          ? ".btg-field-atlas__nodes button"
          : ".btg-plaza-node--active";
      const nodes = Array.from(stage.querySelectorAll(nodeSelector));
      const nodeBounds = canvas;
      const failures = [];
      const pushFailure = (message) => {
        if (!failures.includes(message)) failures.push(message);
      };

      const regions = {};
      for (const [name, element] of [
        ["header", header],
        ["visual", visual],
        ["canvas", canvas],
        ["detail", detail],
        ["dock", dock],
        ["title", title]
      ]) {
        if (visible(element)) regions[name] = rect(element);
      }
      for (const [name, value] of Object.entries(regions)) {
        if (!contained(value, stageRect)) pushFailure(name + " escapes the stage");
        if (!contained(value, viewportRect)) pushFailure(name + " escapes the viewport");
      }
      const regionPairs = nodeKind === "plaza"
        ? [["canvas", "dock"], ["detail", "canvas"]]
        : [["header", "canvas"], ["canvas", "dock"], ["detail", "canvas"]];
      for (const [first, second] of regionPairs) {
        if (regions[first] && regions[second]) {
          const area = intersection(regions[first], regions[second]);
          if (area > 4) pushFailure(first + " overlaps " + second + " (" + Math.round(area) + "px²)");
        }
      }
      if (regions.canvas && regions.visual) {
        const canvasToVisualRatio = regions.canvas.width / Math.max(1, regions.visual.width);
        // Phone art keeps a narrow deliberate inset so the complete 4:5 plate,
        // field note, and compact journey dock can all remain reachable without
        // overlap. Ninety percent still rules out the large dead gutters this
        // check was created to catch.
        const minimumCanvasRatio = config.phonePortrait
          ? 0.9
          : config.phoneLandscape
            ? 0.38
            : config.minimumCanvasToVisualRatio;
        if (canvasToVisualRatio < minimumCanvasRatio) {
          pushFailure("art canvas uses only " + Math.round(canvasToVisualRatio * 100) + "% of the visual width");
        }
      }
      if (regions.visual) {
        const visualToStageRatio = regions.visual.width / Math.max(1, stageRect.width);
        const minimum = config.phonePortrait
          ? config.minimumPhonePortraitVisualToStageRatio
          : config.minimumDesktopVisualToStageRatio;
        if (visualToStageRatio < minimum) {
          pushFailure("visual uses only " + Math.round(visualToStageRatio * 100) + "% of the stage width");
        }
      }

      const artCandidates = Array.from(
        stage.querySelectorAll(
          nodeKind === "atlas"
            ? ".btg-field-atlas__picture img, .btg-vine-atlas__frame"
            : ".btg-scene-art--active"
        )
      );
      const artImage = artCandidates
        .filter(visible)
        .sort((first, second) => effectiveOpacity(second) - effectiveOpacity(first))[0] ?? null;
      let art = null;
      if (!(artImage instanceof HTMLImageElement) || !canvas) {
        pushFailure("active scene artwork is missing");
      } else if (!artImage.complete || artImage.naturalWidth <= 0 || artImage.naturalHeight <= 0) {
        pushFailure("active scene artwork failed to load: " + (artImage.currentSrc || artImage.src));
      } else {
        const style = getComputedStyle(artImage);
        const fit = style.objectFit || "fill";
        const boxWidth = Math.max(1, artImage.clientWidth);
        const boxHeight = Math.max(1, artImage.clientHeight);
        const naturalWidth = artImage.naturalWidth;
        const naturalHeight = artImage.naturalHeight;
        const containScale = Math.min(boxWidth / naturalWidth, boxHeight / naturalHeight);
        const coverScale = Math.max(boxWidth / naturalWidth, boxHeight / naturalHeight);
        const scale = fit === "contain" || fit === "scale-down" ? containScale : fit === "cover" ? coverScale : null;
        const drawnWidth = scale === null ? boxWidth : naturalWidth * scale;
        const drawnHeight = scale === null ? boxHeight : naturalHeight * scale;
        const visibleSourceFraction =
          scale === null
            ? 1
            : Math.min(1, boxWidth / Math.max(1, drawnWidth)) *
              Math.min(1, boxHeight / Math.max(1, drawnHeight));
        const cropFraction = fit === "cover" ? 1 - visibleSourceFraction : 0;
        const horizontalGutter = Math.max(0, boxWidth - drawnWidth) / boxWidth;
        const verticalGutter = Math.max(0, boxHeight - drawnHeight) / boxHeight;
        const gutterFraction = Math.max(horizontalGutter, verticalGutter);
        const imageRect = rect(artImage);
        const canvasRect = rect(canvas);
        const transformedVisibleFraction = intersection(imageRect, canvasRect) / Math.max(1, imageRect.width * imageRect.height);
        const aspectDistortion =
          fit === "fill"
            ? Math.abs((boxWidth / boxHeight) / (naturalWidth / naturalHeight) - 1)
            : 0;
        art = {
          aspectDistortion: round(aspectDistortion),
          box: { height: boxHeight, width: boxWidth },
          cropFraction: round(cropFraction),
          currentSrc: artImage.currentSrc || artImage.src,
          fit,
          gutterFraction: round(gutterFraction),
          natural: { height: naturalHeight, width: naturalWidth },
          position: style.objectPosition,
          transformedVisibleFraction: round(transformedVisibleFraction)
        };
        if (cropFraction > config.maximumArtCropFraction + 0.001) {
          pushFailure("art crops " + Math.round(cropFraction * 100) + "% of its source");
        }
        if (gutterFraction > config.maximumArtGutterFraction + 0.001) {
          pushFailure("art leaves " + Math.round(gutterFraction * 100) + "% dead gutter on one axis");
        }
        if (transformedVisibleFraction < 0.75) {
          pushFailure("transformed artwork retains only " + Math.round(transformedVisibleFraction * 100) + "% visibility");
        }
        if (nodeKind === "atlas") {
          const world = stage.querySelector(".btg-field-atlas__world");
          if (world instanceof HTMLElement) {
            const worldRect = rect(world);
            const worldCoverage = intersection(worldRect, canvasRect) /
              Math.max(1, canvasRect.width * canvasRect.height);
            art.worldCoverage = round(worldCoverage);
            if (worldCoverage < 0.995) {
              pushFailure("atlas world covers only " + Math.round(worldCoverage * 100) + "% of its canvas");
            }
          }
        }
        if (aspectDistortion > 0.08) {
          pushFailure("artwork is aspect-distorted by " + Math.round(aspectDistortion * 100) + "%");
        }
        if (config.sceneId !== "vine-and-berry" && !artImage.alt.trim()) {
          pushFailure("active instructional artwork has empty alt text");
        }
      }

      const backgroundFailures = Array.isArray(window.__btgResponsiveQaBackgroundFailures)
        ? window.__btgResponsiveQaBackgroundFailures
        : [];
      if (backgroundFailures.length > 0) {
        pushFailure("node graphics failed to load: " + backgroundFailures.join(", "));
      }

      if (nodes.length !== config.expectedNodeCount) {
        pushFailure("expected " + config.expectedNodeCount + " interactive nodes, found " + nodes.length);
      }
      const boundsRect = nodeBounds ? rect(nodeBounds) : null;
      const nodeMetrics = nodes.map((node, index) => {
        const value = rect(node);
        const center = { x: value.left + value.width / 2, y: value.top + value.height / 2 };
        const hit = document.elementFromPoint(center.x, center.y);
        const name = (node.getAttribute("aria-label") || node.textContent || "").replace(/\\s+/g, " ").trim();
        const controlsId = node.getAttribute("aria-controls");
        const metric = {
          accessibleName: name,
          ariaPressed: node.getAttribute("aria-pressed"),
          controlsValid: controlsId ? Boolean(document.getElementById(controlsId)) : nodeKind !== "atlas",
          disabled: node.matches(":disabled"),
          hitReachable: Boolean(hit && (hit === node || node.contains(hit))),
          index,
          rect: value,
          tabIndex: node.tabIndex,
          visible: visible(node),
          withinBounds: boundsRect ? contained(value, boundsRect) : false,
          withinViewport: contained(value, viewportRect)
        };
        if (!metric.visible) pushFailure("node " + (index + 1) + " is not visible");
        if (!name) pushFailure("node " + (index + 1) + " has no accessible name");
        if (!node.matches("button") || metric.disabled) pushFailure("node " + (index + 1) + " is not an enabled native button");
        if (nodeKind !== "plaza" && !["true", "false"].includes(metric.ariaPressed)) {
          pushFailure("node " + (index + 1) + " lacks a valid aria-pressed state");
        }
        if (!metric.controlsValid) pushFailure("node " + (index + 1) + " has an invalid aria-controls target");
        if (value.width < config.minimumTargetSize - tolerance || value.height < config.minimumTargetSize - tolerance) {
          pushFailure(
            "node " + (index + 1) + " target is " + Math.round(value.width) + "×" + Math.round(value.height)
          );
        }
        if (!metric.withinBounds) pushFailure("node " + (index + 1) + " escapes its art bounds");
        if (!metric.withinViewport) pushFailure("node " + (index + 1) + " escapes the viewport");
        if (!metric.hitReachable) pushFailure("node " + (index + 1) + " center is obscured");
        if (regions.header && intersection(value, regions.header) > 4) pushFailure("node " + (index + 1) + " overlaps the header");
        if (regions.detail && intersection(value, regions.detail) > 4) pushFailure("node " + (index + 1) + " overlaps the detail panel");
        if (regions.dock && intersection(value, regions.dock) > 4) pushFailure("node " + (index + 1) + " overlaps the journey dock");
        return metric;
      });

      const nodeOverlaps = [];
      for (let index = 0; index < nodeMetrics.length; index += 1) {
        for (let other = index + 1; other < nodeMetrics.length; other += 1) {
          const area = intersection(nodeMetrics[index].rect, nodeMetrics[other].rect);
          const smallerArea = Math.max(
            1,
            Math.min(
              nodeMetrics[index].rect.width * nodeMetrics[index].rect.height,
              nodeMetrics[other].rect.width * nodeMetrics[other].rect.height
            )
          );
          const fraction = area / smallerArea;
          if (area > 4 && fraction > config.maximumNodeOverlapFraction) {
            nodeOverlaps.push({ area: Math.round(area), first: index, fraction: round(fraction), second: other });
            pushFailure(
              "nodes " + (index + 1) + " and " + (other + 1) + " overlap by " + Math.round(fraction * 100) + "%"
            );
          }
        }
      }
      if (nodeKind === "atlas" && nodes.length > 0 && !nodes.some((node) => node.tabIndex === 0)) {
        pushFailure("field atlas has no node in the keyboard tab sequence");
      }

      const nodeSet = new Set(nodes);
      const genericControls = Array.from(stage.querySelectorAll("button, a[href], [role=button]"))
        .filter(visible)
        .filter((element) => !nodeSet.has(element))
        // The horizontal layer rail is a redundant, scrollable index for the
        // already-audited atlas nodes. Off-screen rail items are intentionally
        // reachable by swiping and should not be mistaken for clipped primary
        // controls; their corresponding art nodes are measured above.
        .filter((element) => !element.closest(".btg-field-atlas__rail"));
      const controlFailures = [];
      for (const control of genericControls) {
        const value = rect(control);
        const center = { x: value.left + value.width / 2, y: value.top + value.height / 2 };
        const hit = document.elementFromPoint(center.x, center.y);
        const label = (control.getAttribute("aria-label") || control.textContent || "").replace(/\\s+/g, " ").trim();
        const reasons = [];
        if (!label) reasons.push("missing accessible name");
        if (value.width < config.minimumTargetSize - tolerance || value.height < config.minimumTargetSize - tolerance) {
          reasons.push(Math.round(value.width) + "×" + Math.round(value.height));
        }
        if (!contained(value, viewportRect)) reasons.push("outside viewport");
        if (!(hit && (hit === control || control.contains(hit)))) reasons.push("center obscured");
        if (reasons.length > 0) {
          controlFailures.push({ label, reasons, rect: value });
          pushFailure("control " + JSON.stringify(label) + ": " + reasons.join(", "));
        }
      }

      const clippedText = [];
      for (const element of [title, detail?.querySelector(".btg-field-atlas__field-note")]) {
        if (!visible(element)) continue;
        const style = getComputedStyle(element);
        const clippedX = element.scrollWidth > element.clientWidth + tolerance && ["hidden", "clip"].includes(style.overflowX);
        const clippedY = element.scrollHeight > element.clientHeight + tolerance && ["hidden", "clip"].includes(style.overflowY);
        if (clippedX || clippedY) {
          clippedText.push((element.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 120));
        }
      }
      if (clippedText.length > 0) pushFailure("essential text is clipped: " + clippedText.join(" | "));

      const documentOverflow = Math.max(
        0,
        document.documentElement.scrollWidth - innerWidth,
        (document.body?.scrollWidth ?? 0) - innerWidth
      );
      if (documentOverflow > tolerance) pushFailure("document horizontal overflow: " + Math.round(documentOverflow) + "px");

      return {
        art,
        backgroundFailures,
        controlFailures,
        documentOverflow: round(documentOverflow),
        failures,
        nodeKind,
        nodeMetrics,
        nodeOverlaps,
        regions,
        scene: stage.dataset.scene,
        stage: stageRect,
        viewport: { height: innerHeight, width: innerWidth }
      };
    })()`
  );
}

function nodeSelectorForScene(sceneId) {
  if (sceneId === "academy-plaza") return ".btg-plaza-node--active";
  return ".btg-field-atlas__nodes button";
}

async function dispatchPointer(client, sessionId, viewport, x, y) {
  if (viewport.touch) {
    await client.send(
      "Input.dispatchTouchEvent",
      {
        touchPoints: [{ force: 1, id: 1, radiusX: 2, radiusY: 2, x, y }],
        type: "touchStart"
      },
      sessionId
    );
    await client.send("Input.dispatchTouchEvent", { touchPoints: [], type: "touchEnd" }, sessionId);
    return;
  }
  await client.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y }, sessionId);
  await client.send(
    "Input.dispatchMouseEvent",
    { button: "left", buttons: 1, clickCount: 1, type: "mousePressed", x, y },
    sessionId
  );
  await client.send(
    "Input.dispatchMouseEvent",
    { button: "left", buttons: 0, clickCount: 1, type: "mouseReleased", x, y },
    sessionId
  );
}

async function resetAtlas(client, sessionId, sceneId) {
  if (sceneId === "academy-plaza") return;
  await evaluate(
    client,
    sessionId,
    `(() => {
      const detail = document.querySelector(".btg-field-atlas__detail");
      const button = Array.from(detail?.querySelectorAll("button") ?? []).find(
        (candidate) => candidate.textContent?.trim() === "Overview"
      );
      button?.click();
      return Boolean(button);
    })()`
  );
  await evaluate(
    client,
    sessionId,
    `new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))))`,
    true
  );
}

async function dispatchKey(client, sessionId, key) {
  const metadata = {
    ArrowRight: { code: "ArrowRight", virtualKeyCode: 39 },
    Enter: { code: "Enter", virtualKeyCode: 13 },
    Escape: { code: "Escape", virtualKeyCode: 27 }
  }[key] ?? { code: key, virtualKeyCode: 0 };
  const params = {
    code: metadata.code,
    key,
    nativeVirtualKeyCode: metadata.virtualKeyCode,
    windowsVirtualKeyCode: metadata.virtualKeyCode
  };
  await client.send(
    "Input.dispatchKeyEvent",
    { ...params, ...(key === "Enter" ? { text: "\r", unmodifiedText: "\r" } : {}), type: "keyDown" },
    sessionId
  );
  await client.send("Input.dispatchKeyEvent", { ...params, type: "keyUp" }, sessionId);
}

async function exerciseKeyboard(client, sessionId, scene) {
  if (scene.id === "academy-plaza") return { skipped: "navigation nodes are covered by native-button semantics" };
  const selector = nodeSelectorForScene(scene.id);
  await resetAtlas(client, sessionId, scene.id);
  const nodeCount = await evaluate(
    client,
    sessionId,
    `document.querySelectorAll(${JSON.stringify(selector)}).length`
  );
  if (nodeCount < 1) return { failures: ["no nodes available for keyboard QA"] };
  await evaluate(
    client,
    sessionId,
    `(() => {
      const first = document.querySelectorAll(${JSON.stringify(selector)})[0];
      first?.focus();
      return document.activeElement === first;
    })()`
  );
  const key = nodeCount === 1 ? "Enter" : "ArrowRight";
  await dispatchKey(client, sessionId, key);
  await waitForEvaluation(
    client,
    sessionId,
    `Array.from(document.querySelectorAll(${JSON.stringify(selector)})).some((node) => node.getAttribute("aria-pressed") === "true")`,
    3000
  ).catch(() => false);
  await evaluate(
    client,
    sessionId,
    `new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))))`,
    true
  );
  const result = await evaluate(
    client,
    sessionId,
    `(() => {
      const nodes = Array.from(document.querySelectorAll(${JSON.stringify(selector)}));
      const activeIndex = nodes.findIndex((node) => node.getAttribute("aria-pressed") === "true");
      return {
        activeIndex,
        expectedIndex: ${scene.expectedNodeCount === 1 ? 0 : 1},
        focusedIndex: nodes.indexOf(document.activeElement)
      };
    })()`
  );
  const failures = [];
  if (result.activeIndex !== result.expectedIndex) {
    failures.push(`keyboard selected node ${result.activeIndex + 1}, expected ${result.expectedIndex + 1}`);
  }
  if (result.focusedIndex !== result.expectedIndex) {
    failures.push(`keyboard focus remained on node ${result.focusedIndex + 1}`);
  }
  await dispatchKey(client, sessionId, "Escape");
  await resetAtlas(client, sessionId, scene.id);
  return { ...result, failures, key };
}

async function exerciseNodes(client, sessionId, scene, viewport) {
  if (scene.id === "academy-plaza") {
    return {
      interactions: [],
      keyboard: await exerciseKeyboard(client, sessionId, scene),
      failures: []
    };
  }
  const selector = nodeSelectorForScene(scene.id);
  const interactions = [];
  const failures = [];
  await resetAtlas(client, sessionId, scene.id);
  const nodeCount = await evaluate(
    client,
    sessionId,
    `document.querySelectorAll(${JSON.stringify(selector)}).length`
  );
  for (let index = 0; index < nodeCount; index += 1) {
    const before = await evaluate(
      client,
      sessionId,
      `(() => {
        const node = document.querySelectorAll(${JSON.stringify(selector)})[${index}];
        if (!(node instanceof HTMLElement)) return null;
        const rect = node.getBoundingClientRect();
        const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        return {
          accessibleName: node.getAttribute("aria-label") || node.textContent?.trim() || "",
          hitReachable: Boolean(hit && (hit === node || node.contains(hit))),
          title: (node.getAttribute("aria-label") || "").replace(/^Focus\\s+/, ""),
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      })()`
    );
    if (!before?.hitReachable) {
      const message = `node ${index + 1} is not pointer-reachable before activation`;
      failures.push({ index, message });
      interactions.push({ before, failures: [message], index });
      continue;
    }
    await dispatchPointer(client, sessionId, viewport, before.x, before.y);
    await waitForEvaluation(
      client,
      sessionId,
      `document.querySelectorAll(${JSON.stringify(selector)})[${index}]?.getAttribute("aria-pressed") === "true"`,
      3000
    ).catch(() => false);
    await evaluate(
      client,
      sessionId,
      `new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))))`,
      true
    );
    const after = await evaluate(
      client,
      sessionId,
      `(() => {
        const node = document.querySelectorAll(${JSON.stringify(selector)})[${index}];
        const canvas = document.querySelector(".btg-field-atlas__canvas");
        const detail = document.querySelector(".btg-field-atlas__detail");
        if (!(node instanceof HTMLElement) || !(canvas instanceof HTMLElement) || !(detail instanceof HTMLElement)) return null;
        const nodeRect = node.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const detailRect = detail.getBoundingClientRect();
        const hit = document.elementFromPoint(nodeRect.left + nodeRect.width / 2, nodeRect.top + nodeRect.height / 2);
        const overlap =
          Math.max(0, Math.min(canvasRect.right, detailRect.right) - Math.max(canvasRect.left, detailRect.left)) *
          Math.max(0, Math.min(canvasRect.bottom, detailRect.bottom) - Math.max(canvasRect.top, detailRect.top));
        return {
          detailCanvasOverlap: Math.round(overlap),
          detailTitle: detail.querySelector(".btg-field-atlas__field-note strong")?.textContent?.trim() || "",
          height: nodeRect.height,
          hitReachable: Boolean(hit && (hit === node || node.contains(hit))),
          pressed: node.getAttribute("aria-pressed") === "true",
          width: nodeRect.width,
          withinCanvas:
            nodeRect.left >= canvasRect.left - 2 &&
            nodeRect.right <= canvasRect.right + 2 &&
            nodeRect.top >= canvasRect.top - 2 &&
            nodeRect.bottom <= canvasRect.bottom + 2
        };
      })()`
    );
    const expectedTitle = scene.id === "vine-and-berry" ? before.title : scene.fieldNoteTitles[index];
    const nodeFailures = [];
    if (!after?.pressed) nodeFailures.push("activation did not set aria-pressed");
    if (!after?.hitReachable) nodeFailures.push("selected node center is obscured");
    if (!after?.withinCanvas) nodeFailures.push("selected node escapes the art canvas");
    if ((after?.width ?? 0) < thresholds.minimumTargetSize - 2 || (after?.height ?? 0) < thresholds.minimumTargetSize - 2) {
      nodeFailures.push(`selected target is ${Math.round(after?.width ?? 0)}×${Math.round(after?.height ?? 0)}`);
    }
    if ((after?.detailCanvasOverlap ?? 0) > 4) nodeFailures.push("selected detail overlaps the artwork");
    if (
      expectedTitle &&
      (after?.detailTitle ?? "").localeCompare(expectedTitle, undefined, { sensitivity: "base" }) !== 0
    ) {
      nodeFailures.push(`detail title ${JSON.stringify(after?.detailTitle)} does not match ${JSON.stringify(expectedTitle)}`);
    }
    for (const message of nodeFailures) failures.push({ index, message });
    interactions.push({ after, before, expectedTitle, failures: nodeFailures, index });
  }
  const keyboard = await exerciseKeyboard(client, sessionId, scene).catch((error) => ({
    failures: [error instanceof Error ? error.message : String(error)]
  }));
  for (const message of keyboard.failures ?? []) failures.push({ index: null, message });
  await resetAtlas(client, sessionId, scene.id);
  return { failures, interactions, keyboard };
}

async function captureScreenshot(client, sessionId, filename, failed) {
  const screenshotDirectory = path.join(outputDirectory, "screenshots");
  fs.mkdirSync(screenshotDirectory, { recursive: true });
  const format = failed ? "png" : "webp";
  const result = await client.send(
    "Page.captureScreenshot",
    {
      captureBeyondViewport: false,
      format,
      fromSurface: true,
      ...(failed ? {} : { quality: 76 })
    },
    sessionId
  );
  const filePath = path.join(screenshotDirectory, `${filename}.${format}`);
  fs.writeFileSync(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

function installRuntimeMonitoring(client, context) {
  const requestUrls = new Map();
  const seen = new Set();
  const sameOrigin = (url) => {
    try {
      return new URL(url).origin === new URL(baseUrl).origin;
    } catch {
      return false;
    }
  };
  const record = (kind, message, severity = "error", url = undefined) => {
    if (!context.collect) return;
    const issue = {
      context: {
        checkpoint: context.checkpoint,
        node: context.node,
        scene: context.scene,
        viewport: context.viewport
      },
      kind,
      message,
      severity,
      ...(url ? { url } : {})
    };
    const key = JSON.stringify([kind, message, url, issue.context]);
    if (seen.has(key)) return;
    seen.add(key);
    report.runtimeIssues.push(issue);
  };
  client.on("Network.requestWillBeSent", ({ request, requestId }) => {
    if (requestId && request?.url) requestUrls.set(requestId, request.url);
  });
  client.on("Network.responseReceived", ({ response }) => {
    if (response?.url && response.status >= 400 && sameOrigin(response.url)) {
      record("same-origin-http", `HTTP ${response.status} ${response.statusText ?? ""}`.trim(), "error", response.url);
    }
  });
  client.on("Network.loadingFailed", ({ canceled, errorText, requestId }) => {
    if (canceled || errorText === "net::ERR_ABORTED") return;
    const url = requestUrls.get(requestId);
    record(
      "network-loading-failed",
      errorText || "Network request failed",
      url && sameOrigin(url) ? "error" : "warning",
      url
    );
  });
  client.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
    record(
      "runtime-exception",
      exceptionDetails?.exception?.description ?? exceptionDetails?.text ?? "Uncaught runtime exception"
    );
  });
  client.on("Runtime.consoleAPICalled", ({ args, type }) => {
    if (!["error", "assert"].includes(type)) return;
    const message = (args ?? [])
      .map((argument) => argument.value ?? argument.unserializableValue ?? argument.description ?? argument.type)
      .join(" ");
    record(`console-${type}`, message || `console.${type}`);
  });
}

function validateConfiguration() {
  if (configurationErrors.length > 0) {
    throw new Error(configurationErrors.join(" "));
  }
  if (!["failures", "milestones", "all"].includes(evidenceMode)) {
    throw new Error("BTG_QA_EVIDENCE must be failures, milestones, or all.");
  }
  if (journeyOfADrop.scenes.length !== 22) {
    throw new Error(`Expected 22 authored Beyond The Glass scenes, found ${journeyOfADrop.scenes.length}.`);
  }
  if (viewports.length === 0) {
    throw new Error(
      `BTG_QA_VIEWPORT ${JSON.stringify(viewportFilter)} matched no canonical viewport. Use desktop, laptop, phone-portrait, phone-landscape, or an exact canonical WIDTHxHEIGHT.`
    );
  }
  if (scenes.length === 0) {
    throw new Error(`BTG_QA_SCENE ${JSON.stringify(sceneFilter)} matched no authored scene ID or number.`);
  }
  for (const scene of authoredScenes) {
    if (
      !Array.isArray(scene.range) ||
      scene.range.length !== 2 ||
      !Number.isFinite(scene.range[0]) ||
      !Number.isFinite(scene.range[1]) ||
      scene.range[1] <= scene.range[0]
    ) {
      throw new Error(`Scene ${scene.id} has an invalid authored range.`);
    }
  }
}

function writeReport() {
  report.finishedAt = new Date().toISOString();
  report.status = report.failures.length > 0 ? "failed" : "passed";
  report.summary = {
    failedStates: report.states.filter(({ failures }) => failures.length > 0).length,
    failures: report.failures.length,
    interactions: report.interactions.length,
    runtimeErrors: report.runtimeIssues.filter(({ severity }) => severity === "error").length,
    runtimeWarnings: report.runtimeIssues.filter(({ severity }) => severity === "warning").length,
    states: report.states.length
  };
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
}

async function main() {
  if (!selectedChapter) {
    throw new Error(
      `BTG_QA_JOURNEY ${JSON.stringify(journeyKey)} is unknown. Use wine, brewery, distillery, coffee, tea, water, kombucha, juice, milk, health-drinks, energy-drinks, or sodas.`
    );
  }
  validateConfiguration();
  if (typeof WebSocket !== "function") {
    throw new Error("This check requires Node 22.12+ with global WebSocket support.");
  }
  await waitForHttp(baseUrl);

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "sipopedia-btg-responsive-qa-"));
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
      "--window-size=1600,1000"
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
  const qaContext = {
    checkpoint: null,
    collect: false,
    node: null,
    scene: null,
    viewport: null
  };
  try {
    const port = await waitForDevToolsPort(userDataDir, chrome, chromeState);
    const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
    client = new CdpClient(version.webSocketDebuggerUrl);
    installRuntimeMonitoring(client, qaContext);
    await client.connect();
    const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await client.send("Target.attachToTarget", { flatten: true, targetId });
    await client.send("Page.enable", {}, sessionId);
    await client.send("Runtime.enable", {}, sessionId);
    await client.send("Network.enable", {}, sessionId);

    for (const viewport of viewports) {
      qaContext.viewport = viewport.name;
      qaContext.scene = "route-load";
      qaContext.checkpoint = null;
      qaContext.node = null;
      await prepareViewport(client, sessionId, viewport, qaContext);

      for (const scene of scenes) {
        const [start, end] = scene.range;
        const checkpoints = [
          { label: "entry", localProgress: 0.1 },
          { label: "mid", localProgress: 0.5 },
          { label: "late", localProgress: 0.88 }
        ].map((checkpoint) => ({
          ...checkpoint,
          progress: start + checkpoint.localProgress * (end - start)
        }));

        for (const checkpoint of checkpoints) {
          qaContext.scene = scene.id;
          qaContext.checkpoint = checkpoint.label;
          qaContext.node = null;
          const failureCountBefore = report.failures.length;
          const runtimeIssueIndex = report.runtimeIssues.length;
          await resetAtlas(client, sessionId, scene.id);
          await setStoryProgress(client, sessionId, checkpoint.progress, scene.id);
          const stable = await settleStage(client, sessionId);
          const inspection = await inspectState(client, sessionId, scene, viewport);
          if (!stable) inspection.failures.push("stage layout did not settle deterministically");
          for (const message of inspection.fatal ? [inspection.fatal] : inspection.failures ?? []) {
            recordFailure(
              inspection.fatal ? "fatal" : "layout",
              message,
              { checkpoint: checkpoint.label, scene: scene.id, viewport: viewport.name },
              inspection.fatal ? undefined : { art: inspection.art }
            );
          }

          let nodeExercise = null;
          if (checkpoint.label === "mid") {
            nodeExercise = await exerciseNodes(client, sessionId, scene, viewport);
            for (const interaction of nodeExercise.interactions ?? []) {
              const interactionReport = {
                ...interaction,
                scene: scene.id,
                viewport: viewport.name
              };
              report.interactions.push(interactionReport);
              for (const message of interaction.failures ?? []) {
                recordFailure(
                  "node-interaction",
                  message,
                  { checkpoint: checkpoint.label, node: interaction.index + 1, scene: scene.id, viewport: viewport.name }
                );
              }
            }
            for (const failure of nodeExercise.failures ?? []) {
              recordFailure(
                failure.index === null ? "keyboard" : "node-interaction",
                failure.message,
                {
                  checkpoint: checkpoint.label,
                  node: failure.index === null ? null : failure.index + 1,
                  scene: scene.id,
                  viewport: viewport.name
                }
              );
            }
          }

          const runtimeIssues = report.runtimeIssues.slice(runtimeIssueIndex);
          const stateFailures = report.failures.slice(failureCountBefore);
          const state = {
            checkpoint,
            failures: stateFailures,
            inspection,
            nodeExercise: nodeExercise
              ? {
                  interactionCount: nodeExercise.interactions?.length ?? 0,
                  keyboard: nodeExercise.keyboard
                }
              : null,
            runtimeIssues,
            scene: scene.id,
            viewport
          };
          const shouldCapture =
            stateFailures.length > 0 ||
            evidenceMode === "all" ||
            (evidenceMode === "milestones" && checkpoint.label === "mid");
          if (shouldCapture) {
            const filename = `${viewport.name}-${viewport.width}x${viewport.height}-scene-${scene.number}-${checkpoint.label}-${scene.id}`;
            state.screenshot = await captureScreenshot(
              client,
              sessionId,
              filename,
              stateFailures.length > 0
            );
          }
          report.states.push(state);
          process.stdout.write(stateFailures.length > 0 ? "F" : ".");
        }
      }
    }
    process.stdout.write("\n");

    for (const issue of report.runtimeIssues.filter(({ severity }) => severity === "error")) {
      recordFailure("runtime", `${issue.kind}: ${issue.message}`, issue.context, issue.url ? { url: issue.url } : undefined);
    }
  } finally {
    qaContext.collect = false;
    client?.close();
    killProcessTree(chrome);
    await sleep(100);
    await safelyRemoveChromeProfile(userDataDir);
  }
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  recordFailure("fatal", message, {
    checkpoint: null,
    scene: null,
    viewport: null
  });
} finally {
  writeReport();
  if (report.failures.length > 0) {
    console.error(
      `Beyond The Glass responsive QA failed: ${report.failures.length} issue(s) across ${report.states.length} state(s).`
    );
    console.error(`JSON report and evidence: ${outputDirectory}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Beyond The Glass responsive QA passed: ${report.states.length} states and ${report.interactions.length} node interactions.`
    );
    console.log(`JSON report: ${reportPath}`);
  }
}
