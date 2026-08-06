import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import {
  SIP_ACADEMY_WORLD_SELECTION,
  selectionFromHashValue,
  selectionToHash
} from "../src/features/sip-academy-map/sipAcademyGuilds.ts";
import {
  isGlobeOverviewKey,
  shouldClearGlobeFocus
} from "../src/features/sip-academy-map/three/globeInteraction.ts";

const TAP = {
  button: 0,
  cancelled: false,
  endX: 120,
  endY: 240,
  maxPointerCount: 1,
  startX: 120,
  startY: 240
};

test("a primary-pointer click on unoccupied globe space clears focused territory", () => {
  assert.equal(shouldClearGlobeFocus(TAP), true);
  assert.equal(shouldClearGlobeFocus({ ...TAP, endX: 124, endY: 243 }), true, "minor pointer jitter remains a click");
});

test("orbit, pinch, cancellation, and non-primary buttons never clear focus", () => {
  assert.equal(shouldClearGlobeFocus({ ...TAP, endX: 134 }), false, "a deliberate orbit drag is not a click");
  assert.equal(shouldClearGlobeFocus({ ...TAP, maxPointerCount: 2 }), false, "a pinch gesture is not a click");
  assert.equal(shouldClearGlobeFocus({ ...TAP, cancelled: true }), false, "pointer cancellation is inert");
  assert.equal(shouldClearGlobeFocus({ ...TAP, button: 2 }), false, "secondary-pointer release is inert");
});

test("Escape clears focus while navigation and activation keys remain available", () => {
  assert.equal(isGlobeOverviewKey("Escape"), true);
  for (const key of ["Enter", " ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"]) {
    assert.equal(isGlobeOverviewKey(key), false, `${key} retains its existing globe behavior`);
  }
});

test("world overview is the canonical query-free Sip Academy Map URL state", () => {
  assert.deepEqual(SIP_ACADEMY_WORLD_SELECTION, { kind: "world" });
  assert.deepEqual(selectionFromHashValue("#app/sip-academy-map"), SIP_ACADEMY_WORLD_SELECTION);
  assert.deepEqual(selectionFromHashValue("#app/sip-academy-map?unknown=value"), SIP_ACADEMY_WORLD_SELECTION);
  assert.equal(selectionToHash(SIP_ACADEMY_WORLD_SELECTION), "#app/sip-academy-map");
  assert.doesNotMatch(selectionToHash(SIP_ACADEMY_WORLD_SELECTION), /[?&](?:guild|campus)=/);
});

test("guild and campus deep links remain reversible around world overview", () => {
  const guild = { kind: "guild", id: "cask" };
  const campus = { kind: "campus", id: "wine" };
  assert.deepEqual(selectionFromHashValue(selectionToHash(guild)), guild);
  assert.deepEqual(selectionFromHashValue(selectionToHash(campus)), campus);
  assert.equal(selectionToHash(guild), "#app/sip-academy-map?guild=cask");
  assert.equal(selectionToHash(campus), "#app/sip-academy-map?campus=wine");
});

test("the pure overview rules are wired into the globe and map page", async () => {
  const [globeSource, pageSource] = await Promise.all([
    readFile(resolve("src", "features", "sip-academy-map", "SipAcademyGlobe.tsx"), "utf8"),
    readFile(resolve("src", "features", "sip-academy-map", "SipAcademyMapPage.tsx"), "utf8")
  ]);

  assert.match(globeSource, /onClear/);
  assert.match(globeSource, /shouldClearGlobeFocus\(/);
  assert.match(globeSource, /isGlobeOverviewKey\(/);
  assert.match(pageSource, /<SipAcademyGlobe[\s\S]*?onClear=/);
  assert.match(pageSource, /SIP_ACADEMY_WORLD_SELECTION/);
  assert.match(pageSource, /selectionToHash\(/);
});
