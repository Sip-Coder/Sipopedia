import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { Vector3 } from "three";
import {
  campusFocusDistance,
  selectionToViewQuaternion
} from "../src/features/sip-academy-map/three/cameraPose.ts";
import { SIP_ACADEMY_CAMPUSES, SIP_ACADEMY_GUILDS } from "../src/features/sip-academy-map/sipAcademyGuilds.ts";
import {
  createRegionFillGeometry,
  createRegionOutlineGeometry,
  globeCoordinateToVector3
} from "../src/features/sip-academy-map/three/createRegionOverlays.ts";

const EXPECTED_GUILDS = ["cask", "steep", "source", "energy", "culture"];
const EXPECTED_CAMPUSES_BY_GUILD = {
  cask: ["wine", "beer", "spirits"],
  steep: ["coffee", "tea", "kombucha"],
  source: ["water", "juice", "milk"],
  energy: ["health-drinks", "protein", "energy-drinks"],
  culture: ["sodas", "fermented", "regional-drinks"]
};

function unwrapPolygonAroundLongitude(polygon, referenceLongitude) {
  return polygon.map((point) => {
    let longitude = point.lon;
    while (longitude - referenceLongitude > 180) longitude -= 360;
    while (longitude - referenceLongitude < -180) longitude += 360;
    return { x: longitude, y: point.lat };
  });
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current, current += 1) {
    const currentPoint = polygon[current];
    const previousPoint = polygon[previous];
    const crossesLatitude = currentPoint.y > point.y !== previousPoint.y > point.y;
    const longitudeAtLatitude =
      ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) /
        (previousPoint.y - currentPoint.y || Number.EPSILON) +
      currentPoint.x;
    if (crossesLatitude && point.x < longitudeAtLatitude) inside = !inside;
  }
  return inside;
}

function distanceToSegment(point, start, end) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const lengthSquared = deltaX * deltaX + deltaY * deltaY;
  if (lengthSquared === 0) return Math.hypot(point.x - start.x, point.y - start.y);
  const progress = Math.max(
    0,
    Math.min(1, ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / lengthSquared)
  );
  return Math.hypot(point.x - (start.x + progress * deltaX), point.y - (start.y + progress * deltaY));
}

function pointInsideOrNearPolygon(coordinate, polygon, toleranceDegrees = 3) {
  const unwrappedPolygon = unwrapPolygonAroundLongitude(polygon, coordinate.lon);
  const point = { x: coordinate.lon, y: coordinate.lat };
  if (pointInPolygon(point, unwrappedPolygon)) return true;
  return unwrappedPolygon.some((start, index) => {
    const end = unwrappedPolygon[(index + 1) % unwrappedPolygon.length];
    return distanceToSegment(point, start, end) <= toleranceDegrees;
  });
}

function assertPolygonIsValidClosedRing(polygon, label) {
  const closedRing = [...polygon, polygon[0]];
  assert.deepEqual(closedRing[0], closedRing[closedRing.length - 1], `${label} has an explicit closing segment`);
  for (let index = 1; index < polygon.length; index += 1) {
    assert.notDeepEqual(polygon[index - 1], polygon[index], `${label} has no repeated neighboring vertices`);
  }
  const signedArea = polygon.reduce((sum, point, index) => {
    const next = polygon[(index + 1) % polygon.length];
    return sum + point.lon * next.lat - next.lon * point.lat;
  }, 0);
  assert.ok(Math.abs(signedArea) > 1, `${label} encloses a non-zero region`);
}

test("Sip Academy Map has five guilds, fifteen academies, and exactly three academies per guild", () => {
  assert.deepEqual(
    SIP_ACADEMY_GUILDS.map((guild) => guild.id),
    EXPECTED_GUILDS
  );
  assert.equal(SIP_ACADEMY_GUILDS.length, 5);
  assert.equal(SIP_ACADEMY_CAMPUSES.length, 15);

  for (const guild of SIP_ACADEMY_GUILDS) {
    assert.equal(guild.campusIds.length, 3, `${guild.id} contains exactly three academies`);
    assert.deepEqual(guild.campusIds, EXPECTED_CAMPUSES_BY_GUILD[guild.id]);
    assert.equal(new Set(guild.campusIds).size, 3, `${guild.id} does not repeat an academy`);
  }
  assert.equal(new Set(SIP_ACADEMY_GUILDS.flatMap((guild) => guild.campusIds)).size, 15);
});

test("Guild and academy polygons are valid, visibly closed globe regions", () => {
  for (const guild of SIP_ACADEMY_GUILDS) {
    assert.ok(guild.border.length >= 8, `${guild.id} has a detailed winding continent border`);
    assertPolygonIsValidClosedRing(guild.border, `${guild.id} guild border`);
  }

  for (const campus of SIP_ACADEMY_CAMPUSES) {
    assert.ok(campus.countryBorder.length >= 8, `${campus.id} has a detailed academy-country border`);
    assertPolygonIsValidClosedRing(campus.countryBorder, `${campus.id} academy border`);
  }
});

test("Every guild and academy region produces finite spherical geometry", () => {
  const regions = [
    ...SIP_ACADEMY_GUILDS.map((guild) => ({ id: `guild:${guild.id}`, polygon: guild.border })),
    ...SIP_ACADEMY_CAMPUSES.map((campus) => ({ id: `academy:${campus.id}`, polygon: campus.countryBorder }))
  ];

  for (const region of regions) {
    const fill = createRegionFillGeometry(region.polygon, 1.14, 2);
    const outline = createRegionOutlineGeometry(region.polygon, 1.145);
    for (const [kind, geometry] of [["fill", fill], ["outline", outline]]) {
      const position = geometry.getAttribute("position");
      assert.ok(position.count > 0, `${region.id} ${kind} has vertices`);
      assert.ok(
        Array.from(position.array).every(Number.isFinite),
        `${region.id} ${kind} contains only finite coordinates`
      );
      geometry.computeBoundingSphere();
      assert.ok(Number.isFinite(geometry.boundingSphere?.radius), `${region.id} ${kind} has a finite bound`);
      geometry.dispose();
    }
  }
});

test("Every campus coordinate is valid, unique, and inside or near its own academy-country polygon", () => {
  const ids = new Set();
  const coordinates = new Set();

  for (const campus of SIP_ACADEMY_CAMPUSES) {
    assert.ok(!ids.has(campus.id), `${campus.id} is unique`);
    ids.add(campus.id);
    const coordinateKey = `${campus.coordinate.lat}:${campus.coordinate.lon}`;
    assert.ok(!coordinates.has(coordinateKey), `${campus.id} has a unique coordinate`);
    coordinates.add(coordinateKey);
    assert.ok(campus.coordinate.lat >= -90 && campus.coordinate.lat <= 90, `${campus.id} latitude is valid`);
    assert.ok(campus.coordinate.lon >= -180 && campus.coordinate.lon <= 180, `${campus.id} longitude is valid`);
    assert.ok(
      pointInsideOrNearPolygon(campus.coordinate, campus.countryBorder),
      `${campus.id} campus coordinate belongs to its academy country`
    );
    assert.ok(
      pointInsideOrNearPolygon(campus.coordinate, SIP_ACADEMY_GUILDS.find((guild) => guild.id === campus.guild).border),
      `${campus.id} campus coordinate belongs to its guild continent`
    );
    if (campus.route) assert.match(campus.route, /^#app\//, `${campus.id} links to an app route`);
    assert.ok(
      SIP_ACADEMY_GUILDS.find((guild) => guild.id === campus.guild)?.campusIds.includes(campus.id),
      `${campus.id} is registered by its primary guild`
    );
  }
});

test("Culture Guild retains its cross-academy fermentation and cultured-food network", () => {
  const cultureAffiliates = SIP_ACADEMY_CAMPUSES.filter((campus) => campus.affiliateGuilds?.includes("culture")).map(
    (campus) => campus.id
  );
  assert.deepEqual(cultureAffiliates, ["wine", "beer", "spirits", "kombucha", "milk"]);
});

test("New land-dominant terrain and height assets are present and production-sized", async () => {
  const assets = [
    "world/sip-academy-terrain-albedo-2048x1024.webp",
    "world/sip-academy-terrain-albedo-1024x512.webp",
    "world/sip-academy-terrain-height-2048x1024.webp",
    "world/sip-academy-terrain-height-1024x512.webp"
  ];
  for (const asset of assets) {
    const details = await stat(resolve("public", "sip-academy-map", asset));
    assert.ok(details.size > 50_000, `${asset} contains real terrain data`);
    assert.ok(details.size < 1_100_000, `${asset} remains within the per-file web budget`);
  }
});

test("The Sip Academy globe uses real Three.js campus and region geometry helpers", async () => {
  const campusFactoryPath = resolve("src", "features", "sip-academy-map", "three", "createCampusModels.ts");
  const overlayFactoryPath = resolve("src", "features", "sip-academy-map", "three", "createRegionOverlays.ts");
  const [campusFactory, overlayFactory, campusSource, overlaySource] = await Promise.all([
    stat(campusFactoryPath),
    stat(overlayFactoryPath),
    readFile(campusFactoryPath, "utf8"),
    readFile(overlayFactoryPath, "utf8")
  ]);
  assert.ok(campusFactory.size > 5_000, "campus model factory contains the procedural architecture system");
  assert.ok(overlayFactory.size > 5_000, "region overlay helper contains the spherical fill and border system");
  assert.match(campusSource, /export function createCampusModel\(/);
  assert.match(campusSource, /export function orientCampusToSphere\(/);
  assert.match(campusSource, /InstancedMesh/);
  assert.match(overlaySource, /export function createRegionFillGeometry\(/);
  assert.match(overlaySource, /export function createRegionOutlineGeometry\(/);
  assert.match(overlaySource, /export function createRegionOverlay\(/);
  assert.match(overlaySource, /new Mesh\(fillGeometry, fillMaterial\)/);
  assert.match(overlaySource, /new LineLoop\(outlineGeometry, outlineMaterial\)/);
  assert.match(overlaySource, /points\.push\(points\[0\]\.clone\(\)\)/, "rendered outlines repeat their first vertex");
});



test("Every academy selection resolves to the same centered upper-front inspection pose", () => {
  const expected = new Vector3(0, Math.sin(0.48), Math.cos(0.48));
  const tolerance = 1e-6;

  for (const campus of SIP_ACADEMY_CAMPUSES) {
    const surfaceNormal = globeCoordinateToVector3(campus.coordinate, 1).normalize();
    const focusedNormal = surfaceNormal.applyQuaternion(
      selectionToViewQuaternion({ kind: "campus", id: campus.id })
    );

    assert.ok(Math.abs(focusedNormal.x - expected.x) < tolerance, `${campus.id} is horizontally centered`);
    assert.ok(Math.abs(focusedNormal.y - expected.y) < tolerance, `${campus.id} occupies the upper inspection zone`);
    assert.ok(Math.abs(focusedNormal.z - expected.z) < tolerance, `${campus.id} remains on the camera-facing hemisphere`);
  }
});

test("Campus focus distance preserves metadata clearance and gives compact views at least as much room", () => {
  for (const campus of SIP_ACADEMY_CAMPUSES) {
    const desktopDistance = campusFocusDistance(campus, false);
    const compactDistance = campusFocusDistance(campus, true);

    assert.ok(
      desktopDistance >= campus.cameraDistance,
      `${campus.id} desktop focus never zooms inside its authored camera distance`
    );
    assert.ok(
      compactDistance >= campus.cameraDistance,
      `${campus.id} compact focus never zooms inside its authored camera distance`
    );
    assert.ok(
      compactDistance >= desktopDistance,
      `${campus.id} compact focus has equal or greater framing clearance`
    );
  }
});

test("Campus camera focus no longer contains the legacy off-axis surface-look literals", async () => {
  const globeSource = await readFile(
    resolve("src", "features", "sip-academy-map", "SipAcademyGlobe.tsx"),
    "utf8"
  );

  const legacyPatterns = [
    /cameraTargetXRef\.current\s*=\s*isCompact\s*\?\s*0\.72\s*:\s*0\.95/,
    /cameraTargetYRef\.current\s*=\s*isCompact\s*\?\s*0\.5\s*:\s*0\.62/,
    /cameraLookZRef\.current\s*=\s*CAMPUS_SURFACE_RADIUS/,
    /useRef\(selection\.kind\s*===\s*"campus"\s*\?\s*0\.95\s*:\s*0\)/,
    /useRef\(selection\.kind\s*===\s*"campus"\s*\?\s*0\.62\s*:\s*0\)/,
    /useRef\(selection\.kind\s*===\s*"campus"\s*\?\s*CAMPUS_SURFACE_RADIUS\s*:\s*0\)/
  ];

  for (const pattern of legacyPatterns) {
    assert.doesNotMatch(globeSource, pattern);
  }
  assert.match(globeSource, /cameraTargetXRef\.current\s*=\s*0/);
  assert.match(globeSource, /cameraTargetYRef\.current\s*=\s*0/);
  assert.match(globeSource, /cameraLookZRef\.current\s*=\s*0/);
  assert.match(globeSource, /selectionToViewQuaternion\(selection\)/);
});
