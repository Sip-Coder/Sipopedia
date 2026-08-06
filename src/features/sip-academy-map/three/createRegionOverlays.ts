import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  ShapeUtils,
  Vector2,
  Vector3,
  type ColorRepresentation
} from "three";
import type { GlobeCoordinate } from "../sipAcademyGuilds";

export type RegionOverlayKind = "guild" | "academy";

export type RegionOverlayVisualState = "hidden" | "idle" | "active" | "selected";

export type CreateRegionOverlayOptions = {
  id: string;
  kind: RegionOverlayKind;
  polygon: GlobeCoordinate[];
  radius: number;
  fillColor: ColorRepresentation;
  outlineColor?: ColorRepresentation;
  /** Number of recursive spherical subdivisions applied to every filled triangle. */
  subdivisions?: number;
  /** Approximate maximum angular distance between outline samples. */
  outlineStepDegrees?: number;
  renderOrder?: number;
  fillOpacity?: number;
  activeFillOpacity?: number;
  selectedFillOpacity?: number;
  outlineOpacity?: number;
  activeOutlineOpacity?: number;
  selectedOutlineOpacity?: number;
};

export type RegionOverlayHandle = {
  id: string;
  kind: RegionOverlayKind;
  group: Group;
  fill: Mesh<BufferGeometry, MeshBasicMaterial>;
  outline: LineLoop<BufferGeometry, LineBasicMaterial>;
  setState: (state: RegionOverlayVisualState) => void;
  dispose: () => void;
};

type RegionOpacitySet = {
  fill: number;
  outline: number;
};

const DEGREES_TO_RADIANS = Math.PI / 180;
const DEFAULT_OUTLINE_STEP_DEGREES = 2.5;

function coordinatesMatch(left: GlobeCoordinate, right: GlobeCoordinate): boolean {
  return Math.abs(left.lat - right.lat) < 1e-7 && Math.abs(left.lon - right.lon) < 1e-7;
}

function normalizePolygon(polygon: GlobeCoordinate[]): GlobeCoordinate[] {
  if (polygon.length < 3) {
    throw new Error("A globe region requires at least three polygon coordinates.");
  }

  const normalized = polygon.map((coordinate) => ({ ...coordinate }));
  if (coordinatesMatch(normalized[0], normalized[normalized.length - 1])) normalized.pop();
  if (normalized.length < 3) {
    throw new Error("A globe region requires at least three distinct polygon coordinates.");
  }
  return normalized;
}

function unwrapLongitudes(polygon: GlobeCoordinate[]): GlobeCoordinate[] {
  const output: GlobeCoordinate[] = [{ ...polygon[0] }];
  for (let index = 1; index < polygon.length; index += 1) {
    const previousLongitude = output[index - 1].lon;
    let longitude = polygon[index].lon;
    while (longitude - previousLongitude > 180) longitude -= 360;
    while (longitude - previousLongitude < -180) longitude += 360;
    output.push({ lat: polygon[index].lat, lon: longitude });
  }
  return output;
}

/** Convert a latitude/longitude coordinate to the orientation used by the SIP Academy globe. */
export function globeCoordinateToVector3(coordinate: GlobeCoordinate, radius: number): Vector3 {
  const latitude = coordinate.lat * DEGREES_TO_RADIANS;
  const longitude = coordinate.lon * DEGREES_TO_RADIANS;
  return new Vector3(
    radius * Math.cos(latitude) * Math.sin(longitude),
    radius * Math.sin(latitude),
    radius * Math.cos(latitude) * Math.cos(longitude)
  );
}

function midpointOnSphere(left: Vector3, right: Vector3, radius: number): Vector3 {
  const midpoint = left.clone().add(right);
  if (midpoint.lengthSq() < 1e-10) return left.clone();
  return midpoint.normalize().multiplyScalar(radius);
}

function appendSphericalTriangle(
  positions: number[],
  left: Vector3,
  middle: Vector3,
  right: Vector3,
  radius: number,
  subdivisions: number
): void {
  if (subdivisions <= 0) {
    for (const point of [left, middle, right]) positions.push(point.x, point.y, point.z);
    return;
  }

  const leftMiddle = midpointOnSphere(left, middle, radius);
  const middleRight = midpointOnSphere(middle, right, radius);
  const rightLeft = midpointOnSphere(right, left, radius);
  const nextSubdivision = subdivisions - 1;

  appendSphericalTriangle(positions, left, leftMiddle, rightLeft, radius, nextSubdivision);
  appendSphericalTriangle(positions, leftMiddle, middle, middleRight, radius, nextSubdivision);
  appendSphericalTriangle(positions, rightLeft, middleRight, right, radius, nextSubdivision);
  appendSphericalTriangle(positions, leftMiddle, middleRight, rightLeft, radius, nextSubdivision);
}

/**
 * Triangulate a latitude/longitude polygon, subdivide its faces, and project all
 * vertices back onto the sphere. This keeps broad highlighted regions from
 * cutting through the globe as flat planar triangles.
 */
export function createRegionFillGeometry(
  polygon: GlobeCoordinate[],
  radius: number,
  subdivisions = 2
): BufferGeometry {
  const normalized = unwrapLongitudes(normalizePolygon(polygon));
  const contour = normalized.map((coordinate) => new Vector2(coordinate.lon, coordinate.lat));
  const triangles = ShapeUtils.triangulateShape(contour, []);
  const positions: number[] = [];

  for (const triangle of triangles) {
    const leftCoordinate = contour[triangle[0]];
    const middleCoordinate = contour[triangle[1]];
    const rightCoordinate = contour[triangle[2]];
    if (!leftCoordinate || !middleCoordinate || !rightCoordinate) continue;
    const left = globeCoordinateToVector3({ lon: leftCoordinate.x, lat: leftCoordinate.y }, radius);
    const middle = globeCoordinateToVector3({ lon: middleCoordinate.x, lat: middleCoordinate.y }, radius);
    const right = globeCoordinateToVector3({ lon: rightCoordinate.x, lat: rightCoordinate.y }, radius);
    appendSphericalTriangle(positions, left, middle, right, radius, Math.max(0, Math.floor(subdivisions)));
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function sphericalEdgeSamples(
  start: Vector3,
  end: Vector3,
  radius: number,
  maxStepDegrees: number,
  includeEnd: boolean
): Vector3[] {
  const startUnit = start.clone().normalize();
  const endUnit = end.clone().normalize();
  const angle = startUnit.angleTo(endUnit);
  const steps = Math.max(1, Math.ceil(angle / (Math.max(0.25, maxStepDegrees) * DEGREES_TO_RADIANS)));
  const samples: Vector3[] = [];

  for (let index = 0; index <= steps; index += 1) {
    if (!includeEnd && index === steps) continue;
    const progress = index / steps;
    const point = startUnit.clone().multiplyScalar(1 - progress).addScaledVector(endUnit, progress);
    if (point.lengthSq() < 1e-10) continue;
    samples.push(point.normalize().multiplyScalar(radius));
  }
  return samples;
}

/** Build a visibly closed, sphere-following border for a region polygon. */
export function createRegionOutlineGeometry(
  polygon: GlobeCoordinate[],
  radius: number,
  maxStepDegrees = DEFAULT_OUTLINE_STEP_DEGREES
): BufferGeometry {
  const normalized = normalizePolygon(polygon);
  const points: Vector3[] = [];

  for (let index = 0; index < normalized.length; index += 1) {
    const nextIndex = (index + 1) % normalized.length;
    const start = globeCoordinateToVector3(normalized[index], radius);
    const end = globeCoordinateToVector3(normalized[nextIndex], radius);
    points.push(...sphericalEdgeSamples(start, end, radius, maxStepDegrees, false));
  }

  if (points.length > 0) points.push(points[0].clone());
  return new BufferGeometry().setFromPoints(points);
}

/**
 * Create a true WebGL region overlay with independent fill and outline meshes.
 * The returned state setter is intentionally small so selection logic can stay
 * in SipAcademyGlobe while all sphere geometry remains reusable here.
 */
export function createRegionOverlay(options: CreateRegionOverlayOptions): RegionOverlayHandle {
  const fillGeometry = createRegionFillGeometry(options.polygon, options.radius, options.subdivisions);
  const outlineGeometry = createRegionOutlineGeometry(
    options.polygon,
    options.radius * 1.0008,
    options.outlineStepDegrees
  );
  const fillMaterial = new MeshBasicMaterial({
    color: options.fillColor,
    transparent: true,
    opacity: 0,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    side: DoubleSide
  });
  const outlineMaterial = new LineBasicMaterial({
    color: options.outlineColor ?? options.fillColor,
    transparent: true,
    opacity: 0,
    depthTest: true,
    depthWrite: false,
    toneMapped: false
  });
  const fill = new Mesh(fillGeometry, fillMaterial);
  const outline = new LineLoop(outlineGeometry, outlineMaterial);
  const group = new Group();
  const renderOrder = options.renderOrder ?? (options.kind === "guild" ? 8 : 10);
  fill.renderOrder = renderOrder;
  outline.renderOrder = renderOrder + 1;
  group.name = `${options.kind}-region-${options.id}`;
  group.userData.regionId = options.id;
  group.userData.regionKind = options.kind;
  group.add(fill, outline);

  const opacities: Record<Exclude<RegionOverlayVisualState, "hidden">, RegionOpacitySet> = {
    idle: {
      fill: options.fillOpacity ?? (options.kind === "guild" ? 0.018 : 0.012),
      outline: options.outlineOpacity ?? (options.kind === "guild" ? 0.22 : 0.16)
    },
    active: {
      fill: options.activeFillOpacity ?? (options.kind === "guild" ? 0.075 : 0.06),
      outline: options.activeOutlineOpacity ?? 0.68
    },
    selected: {
      fill: options.selectedFillOpacity ?? (options.kind === "guild" ? 0.13 : 0.16),
      outline: options.selectedOutlineOpacity ?? 1
    }
  };

  const setState = (state: RegionOverlayVisualState): void => {
    group.visible = state !== "hidden";
    if (state === "hidden") return;
    const opacity = opacities[state];
    fillMaterial.opacity = opacity.fill;
    outlineMaterial.opacity = opacity.outline;
  };

  setState("idle");

  return {
    id: options.id,
    kind: options.kind,
    group,
    fill,
    outline,
    setState,
    dispose: () => {
      fillGeometry.dispose();
      outlineGeometry.dispose();
      fillMaterial.dispose();
      outlineMaterial.dispose();
      group.remove(fill, outline);
    }
  };
}
