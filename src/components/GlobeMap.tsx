import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BackSide, FrontSide, SRGBColorSpace } from "three/src/constants.js";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
import { BufferAttribute } from "three/src/core/BufferAttribute.js";
import { BufferGeometry } from "three/src/core/BufferGeometry.js";
import { Raycaster } from "three/src/core/Raycaster.js";
import { SphereGeometry } from "three/src/geometries/SphereGeometry.js";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial.js";
import { Vector2 } from "three/src/math/Vector2.js";
import { Vector3 } from "three/src/math/Vector3.js";
import { Mesh } from "three/src/objects/Mesh.js";
import { Object3D } from "three/src/core/Object3D.js";
import { Points } from "three/src/objects/Points.js";
import { PointsMaterial } from "three/src/materials/PointsMaterial.js";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";
import { Scene } from "three/src/scenes/Scene.js";
import { CanvasTexture } from "three/src/textures/CanvasTexture.js";

const GLOBE_R = 1;
const GLOBE_ROTATION_Y_DEFAULT = 0.4;
const GLOBE_ROTATION_X_DEFAULT = 0;
const TEX_W = 4096;
const TEX_H = 2048;
const MAP_W = 800;
const MAP_H = 400;
const EARTH_BASE_TEXTURE_URL = "/earth-topo-bathy-5400.jpg";
const CAMERA_Z_DEFAULT = 2.85;
const CAMERA_Z_MIN = 1.45;
const CAMERA_Z_MAX = 4.6;
const CAMERA_Z_STEP = 0.2;
const PIN_R = 0.014;
const PIN_SELECTED_SCALE = 1.25;

export type GlobePinInput = {
  cityKey: string;
  cityLabel: string;
  lat: number;
  lon: number;
  groups: Array<{ focus: string }>;
};

type MapCountryPath = { id: string; name: string; path: string };

type GlobeMapProps = {
  cityPins: GlobePinInput[];
  mapPaths: MapCountryPath[];
  selectedCityKey: string | null;
  onPinSelect: (pin: GlobePinInput) => void;
};

type LonLat = [lon: number, lat: number];

type Admin1LineRecord = {
  country: string;
  segments: LonLat[][];
};

const FOCUS_HEX: Record<string, number> = {
  Wine: 0xd4435b,
  Beer: 0xe8882a,
  Spirits: 0x38a169,
  Coffee: 0x8b5e3c,
  Tea: 0xe6c85c,
  Sake: 0xa57ecf,
  "Zero Proof": 0x4caf80,
  "Coffee & Tea": 0x8b5e3c,
};

const LEGEND_ITEMS: Array<{ label: string; color: string }> = [
  { label: "Wine", color: "#d4435b" },
  { label: "Beer", color: "#e8882a" },
  { label: "Spirits", color: "#38a169" },
  { label: "Coffee", color: "#8b5e3c" },
  { label: "Tea", color: "#e6c85c" },
];

const COUNTRY_NAME_ALIAS: Record<string, string> = {
  "united states": "united states of america",
  usa: "united states of america",
  us: "united states of america",
  "u.s.a.": "united states of america",
  "u.s.": "united states of america",
  "united kingdom": "united kingdom",
  uk: "united kingdom",
  "great britain": "united kingdom",
  england: "united kingdom",
  "czech republic": "czechia",
  "ivory coast": "cote d'ivoire",
  "south korea": "korea republic of",
  "north korea": "korea democratic people's republic of",
  russia: "russian federation",
};

let admin1LineCachePromise: Promise<Admin1LineRecord[]> | null = null;

function normalizeCountryName(value: string): string {
  const base = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
  return COUNTRY_NAME_ALIAS[base] ?? base;
}

async function loadAdmin1Lines(): Promise<Admin1LineRecord[]> {
  if (!admin1LineCachePromise) {
    admin1LineCachePromise = fetch("/admin1-lines.geojson")
      .then((response) => (response.ok ? response.json() : null))
      .then((json: unknown) => {
        if (!json || typeof json !== "object") return [];
        const root = json as { features?: Array<{ properties?: Record<string, unknown>; geometry?: { type?: string; coordinates?: unknown } }> };
        if (!Array.isArray(root.features)) return [];
        const out: Admin1LineRecord[] = [];
        for (const feature of root.features) {
          const countryRaw = typeof feature.properties?.ADM0_NAME === "string" ? feature.properties.ADM0_NAME : "";
          if (!countryRaw || !feature.geometry?.type) continue;
          const country = normalizeCountryName(countryRaw);
          if (feature.geometry.type === "LineString" && Array.isArray(feature.geometry.coordinates)) {
            const segment = (feature.geometry.coordinates as unknown[])
              .filter((pair): pair is [number, number] => Array.isArray(pair) && typeof pair[0] === "number" && typeof pair[1] === "number")
              .map((pair) => [pair[0], pair[1]] as LonLat);
            if (segment.length > 1) out.push({ country, segments: [segment] });
          } else if (feature.geometry.type === "MultiLineString" && Array.isArray(feature.geometry.coordinates)) {
            const segments = (feature.geometry.coordinates as unknown[])
              .map((line) =>
                Array.isArray(line)
                  ? (line as unknown[])
                      .filter((pair): pair is [number, number] => Array.isArray(pair) && typeof pair[0] === "number" && typeof pair[1] === "number")
                      .map((pair) => [pair[0], pair[1]] as LonLat)
                  : []
              )
              .filter((line) => line.length > 1);
            if (segments.length > 0) out.push({ country, segments });
          }
        }
        return out;
      })
      .catch(() => []);
  }
  return admin1LineCachePromise;
}

function drawCountryShapes(
  ctx: CanvasRenderingContext2D,
  mapPaths: MapCountryPath[],
  sx: number,
  sy: number,
  withFill: boolean,
  withStroke: boolean
): void {
  const re = /([ML])(-?[\d.]+),(-?[\d.]+)|(Z)/g;
  for (const country of mapPaths) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    ctx.beginPath();
    while ((m = re.exec(country.path)) !== null) {
      if (m[4] === "Z") {
        ctx.closePath();
      } else if (m[1] === "M") {
        ctx.moveTo(Number.parseFloat(m[2]) * sx, Number.parseFloat(m[3]) * sy);
      } else {
        ctx.lineTo(Number.parseFloat(m[2]) * sx, Number.parseFloat(m[3]) * sy);
      }
    }
    if (withFill) ctx.fill();
    if (withStroke) ctx.stroke();
  }
}

function paintEarthTexture(
  canvas: HTMLCanvasElement,
  mapPaths: MapCountryPath[],
  selectableCountries: Set<string>,
  admin1Lines: Admin1LineRecord[],
  baseImage?: HTMLImageElement
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (baseImage && baseImage.complete && baseImage.naturalWidth > 0) {
    ctx.drawImage(baseImage, 0, 0, TEX_W, TEX_H);
  } else {
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, TEX_H);
    oceanGrad.addColorStop(0, "#0a2442");
    oceanGrad.addColorStop(0.45, "#0b335e");
    oceanGrad.addColorStop(1, "#071f3a");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, TEX_W, TEX_H);
  }

  // Subtle global graticules preserve spatial readability without overpowering terrain.
  ctx.strokeStyle = "rgba(130,170,210,0.08)";
  ctx.lineWidth = 1;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * TEX_H;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(TEX_W, y);
    ctx.stroke();
  }
  for (let lon = -160; lon <= 160; lon += 20) {
    const x = ((lon + 180) / 360) * TEX_W;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, TEX_H);
    ctx.stroke();
  }

  const sx = TEX_W / MAP_W;
  const sy = TEX_H / MAP_H;
  ctx.strokeStyle = "rgba(232,242,231,0.52)";
  ctx.lineWidth = 1.2;
  drawCountryShapes(ctx, mapPaths, sx, sy, false, true);

  // Crisp pass for max zoom edge definition.
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 0.7;
  drawCountryShapes(ctx, mapPaths, sx, sy, false, true);

  if (selectableCountries.size > 0 && admin1Lines.length > 0) {
    ctx.save();
    ctx.strokeStyle = "rgba(237, 247, 255, 0.34)";
    ctx.lineWidth = 0.58;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const lineRecord of admin1Lines) {
      if (!selectableCountries.has(lineRecord.country)) continue;
      for (const segment of lineRecord.segments) {
        if (segment.length < 2) continue;
        const [firstLon, firstLat] = segment[0];
        let prevLon = firstLon;
        ctx.beginPath();
        ctx.moveTo(((firstLon + 180) / 360) * TEX_W, ((90 - firstLat) / 180) * TEX_H);
        for (let index = 1; index < segment.length; index++) {
          const [lon, lat] = segment[index];
          const dx = Math.abs(lon - prevLon);
          const x = ((lon + 180) / 360) * TEX_W;
          const y = ((90 - lat) / 180) * TEX_H;
          if (dx > 120) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          prevLon = lon;
        }
        ctx.stroke();
      }
    }
    ctx.restore();
  }
}

function buildEarthTexture(mapPaths: MapCountryPath[], selectableCountries: Set<string>, admin1Lines: Admin1LineRecord[]): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  paintEarthTexture(canvas, mapPaths, selectableCountries, admin1Lines);
  return canvas;
}

function latLonToVec3(lat: number, lon: number, r: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export function GlobeMap({ cityPins, mapPaths, selectedCityKey, onPinSelect }: GlobeMapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hoveredPin, setHoveredPin] = useState<GlobePinInput | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const earthRef = useRef<Mesh | null>(null);

  const onPinSelectRef = useRef(onPinSelect);
  onPinSelectRef.current = onPinSelect;
  const setHoveredRef = useRef(setHoveredPin);
  setHoveredRef.current = setHoveredPin;

  const pinDataRef = useRef<Map<string, { mesh: Mesh; color: number }>>(new Map());

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const getSize = () => {
      const w = Math.max(wrap.clientWidth, 320);
      const h = Math.max(340, Math.min(w * 0.6, 520));
      return { w, h };
    };
    const { w, h } = getSize();

    let renderer: WebGLRenderer | null = null;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglFailed(true);
      return;
    }
    if (!renderer || !renderer.getContext()) {
      setWebglFailed(true);
      renderer?.dispose();
      return;
    }
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, w / h, 0.01, 100);
    camera.position.z = CAMERA_Z_DEFAULT;
    cameraRef.current = camera;

    const starCount = 700;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 45 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new BufferGeometry();
    starGeo.setAttribute("position", new BufferAttribute(starPos, 3));
    const starMat = new PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
    });
    scene.add(new Points(starGeo, starMat));

    const selectableCountries = new Set(cityPins.map((pin) => normalizeCountryName(pin.cityLabel)));
    let admin1Lines: Admin1LineRecord[] = [];
    const texCanvas = buildEarthTexture(mapPaths, selectableCountries, admin1Lines);
    const texture = new CanvasTexture(texCanvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;

    const earthGeo = new SphereGeometry(GLOBE_R, 96, 96);
    const earthMat = new MeshBasicMaterial({ map: texture });
    const earth = new Mesh(earthGeo, earthMat);
    earth.rotation.y = GLOBE_ROTATION_Y_DEFAULT;
    earth.rotation.x = GLOBE_ROTATION_X_DEFAULT;
    earthRef.current = earth;
    scene.add(earth);

    let disposed = false;
    const earthImage = new Image();
    const repaintTexture = () => {
      if (disposed) return;
      const hasImage = earthImage.complete && earthImage.naturalWidth > 0;
      paintEarthTexture(texCanvas, mapPaths, selectableCountries, admin1Lines, hasImage ? earthImage : undefined);
      texture.needsUpdate = true;
    };

    earthImage.decoding = "async";
    earthImage.onload = () => {
      repaintTexture();
    };
    earthImage.src = EARTH_BASE_TEXTURE_URL;

    void loadAdmin1Lines().then((loaded) => {
      if (disposed) return;
      admin1Lines = loaded;
      repaintTexture();
    });

    const atmoGeo = new SphereGeometry(GLOBE_R * 1.065, 40, 40);
    const atmoMat = new MeshBasicMaterial({
      color: 0x3a7de8,
      transparent: true,
      opacity: 0.11,
      side: BackSide,
      depthWrite: false,
    });
    scene.add(new Mesh(atmoGeo, atmoMat));

    const hazeGeo = new SphereGeometry(GLOBE_R * 1.018, 32, 32);
    const hazeMat = new MeshBasicMaterial({
      color: 0x1040a0,
      transparent: true,
      opacity: 0.035,
      side: FrontSide,
      depthWrite: false,
    });
    scene.add(new Mesh(hazeGeo, hazeMat));

    const localPinMap = new Map<string, { mesh: Mesh; color: number }>();

    for (const pin of cityPins) {
      const focus = pin.groups[0]?.focus ?? "Wine";
      const color = FOCUS_HEX[focus] ?? 0xee4466;
      const isSelected = pin.cityKey === selectedCityKey;
      const pos = latLonToVec3(pin.lat, pin.lon, GLOBE_R + PIN_R * 0.6);

      const geo = new SphereGeometry(PIN_R, 12, 12);
      const mat = new MeshBasicMaterial({ color: isSelected ? 0xffffff : color });
      const mesh = new Mesh(geo, mat);
      mesh.position.copy(pos);
      earth.add(mesh);

      localPinMap.set(pin.cityKey, { mesh, color });
    }

    pinDataRef.current = localPinMap;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    let touchTapCandidate = false;
    let touchMoved = false;
    let velX = 0;
    let velY = 0;
    let autoRotate = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const activeTouchPointers = new Map<number, { x: number; y: number }>();
    let lastTouchDistance = 0;

    const resetIdle = () => {
      autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, 15000);
    };

    const raycaster = new Raycaster();
    const ndc = new Vector2();

    const touchMidpoint = (): { x: number; y: number } | null => {
      if (activeTouchPointers.size < 2) return null;
      const points = Array.from(activeTouchPointers.values());
      const a = points[0];
      const b = points[1];
      return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    };

    const touchDistance = (): number => {
      if (activeTouchPointers.size < 2) return 0;
      const points = Array.from(activeTouchPointers.values());
      const a = points[0];
      const b = points[1];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };

    const setZoom = (nextZ: number) => {
      camera.position.z = Math.max(CAMERA_Z_MIN, Math.min(CAMERA_Z_MAX, nextZ));
    };

    const toNDC = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const allPinMeshes = () => Array.from(localPinMap.values()).map((d) => d.mesh);

    const findPinByMesh = (mesh: Object3D): GlobePinInput | null => {
      for (const [cityKey, data] of localPinMap.entries()) {
        if (data.mesh === mesh) return cityPins.find((p) => p.cityKey === cityKey) ?? null;
      }
      return null;
    };

    const el = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      if (e.pointerType === "touch") {
        e.preventDefault();
        activeTouchPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        touchTapCandidate = activeTouchPointers.size === 1;
        if (activeTouchPointers.size === 1) {
          touchMoved = false;
          isDragging = true;
          lastX = downX = e.clientX;
          lastY = downY = e.clientY;
          velX = velY = 0;
          resetIdle();
        }
        if (activeTouchPointers.size >= 2) {
          const mid = touchMidpoint();
          if (mid) {
            touchTapCandidate = false;
            touchMoved = true;
            isDragging = true;
            lastX = downX = mid.x;
            lastY = downY = mid.y;
            velX = velY = 0;
            lastTouchDistance = touchDistance();
            resetIdle();
          }
        }
        return;
      }
      isDragging = true;
      lastX = downX = e.clientX;
      lastY = downY = e.clientY;
      velX = velY = 0;
      resetIdle();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        if (activeTouchPointers.has(e.pointerId)) {
          activeTouchPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }
        if (activeTouchPointers.size === 1 && isDragging) {
          e.preventDefault();
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          earth.rotation.y += dx * 0.006;
          earth.rotation.x = Math.max(-1.1, Math.min(1.1, earth.rotation.x + dy * 0.006));
          velX = dx * 0.006;
          velY = dy * 0.006;
          lastX = e.clientX;
          lastY = e.clientY;
          if (Math.abs(e.clientX - downX) > 5 || Math.abs(e.clientY - downY) > 5) {
            touchMoved = true;
            touchTapCandidate = false;
          }
          resetIdle();
          return;
        }
        if (activeTouchPointers.size >= 2) {
          e.preventDefault();
          touchMoved = true;
          touchTapCandidate = false;
          const mid = touchMidpoint();
          if (!mid) return;
          if (!isDragging) {
            isDragging = true;
            lastX = downX = mid.x;
            lastY = downY = mid.y;
            velX = velY = 0;
          }
          const dx = mid.x - lastX;
          const dy = mid.y - lastY;
          earth.rotation.y += dx * 0.006;
          earth.rotation.x = Math.max(-1.1, Math.min(1.1, earth.rotation.x + dy * 0.006));
          velX = dx * 0.006;
          velY = dy * 0.006;
          lastX = mid.x;
          lastY = mid.y;
          const nextDistance = touchDistance();
          if (lastTouchDistance > 0 && nextDistance > 0) {
            const delta = nextDistance - lastTouchDistance;
            setZoom(camera.position.z - delta * 0.006);
          }
          lastTouchDistance = nextDistance;
          resetIdle();
        }
        return;
      }
      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        earth.rotation.y += dx * 0.006;
        earth.rotation.x = Math.max(-1.1, Math.min(1.1, earth.rotation.x + dy * 0.006));
        velX = dx * 0.006;
        velY = dy * 0.006;
        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        toNDC(e.clientX, e.clientY);
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(allPinMeshes());
        if (hits.length > 0) {
          const pin = findPinByMesh(hits[0].object);
          setHoveredRef.current(pin);
          el.style.cursor = "pointer";
        } else {
          setHoveredRef.current(null);
          el.style.cursor = "grab";
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const wasDrag = Math.abs(e.clientX - downX) > 5 || Math.abs(e.clientY - downY) > 5;
      if (e.pointerType === "touch") {
        activeTouchPointers.delete(e.pointerId);
        if (activeTouchPointers.size < 2) isDragging = false;
        if (touchTapCandidate && !touchMoved && !wasDrag && activeTouchPointers.size === 0) {
          toNDC(e.clientX, e.clientY);
          raycaster.setFromCamera(ndc, camera);
          const hits = raycaster.intersectObjects(allPinMeshes());
          if (hits.length > 0) {
            const pin = findPinByMesh(hits[0].object);
            if (pin) onPinSelectRef.current(pin);
          }
        }
        if (activeTouchPointers.size === 0) {
          touchTapCandidate = false;
          touchMoved = false;
        }
        if (activeTouchPointers.size < 2) lastTouchDistance = 0;
        el.style.cursor = "grab";
        return;
      }
      isDragging = false;
      el.style.cursor = "grab";
      if (!wasDrag) {
        toNDC(e.clientX, e.clientY);
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(allPinMeshes());
        if (hits.length > 0) {
          const pin = findPinByMesh(hits[0].object);
          if (pin) onPinSelectRef.current(pin);
        }
      }
    };

    const onPointerLeave = () => {
      isDragging = false;
      activeTouchPointers.clear();
      touchTapCandidate = false;
      touchMoved = false;
      lastTouchDistance = 0;
      setHoveredRef.current(null);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(camera.position.z + e.deltaY * 0.0024);
      resetIdle();
    };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("pointercancel", onPointerLeave);
    el.addEventListener("wheel", onWheel, { passive: false });

    const onResize = () => {
      const { w: nw, h: nh } = getSize();
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        if (autoRotate) {
          earth.rotation.y -= 0.0017;
        } else {
          if (Math.abs(velX) > 0.0001) {
            earth.rotation.y += velX;
            velX *= 0.93;
          }
          if (Math.abs(velY) > 0.0001) {
            earth.rotation.x = Math.max(-1.1, Math.min(1.1, earth.rotation.x + velY));
            velY *= 0.93;
          }
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("pointercancel", onPointerLeave);
      el.removeEventListener("wheel", onWheel);
      renderer?.dispose();
      texture.dispose();
      earthMat.dispose();
      earthGeo.dispose();
      if (earthRef.current === earth) earthRef.current = null;
      if (cameraRef.current === camera) cameraRef.current = null;
      if (wrap.contains(el)) wrap.removeChild(el);
    };
  }, [mapPaths, cityPins]);

  useEffect(() => {
    pinDataRef.current.forEach((data, cityKey) => {
      const isSelected = cityKey === selectedCityKey;
      (data.mesh.material as MeshBasicMaterial).color.setHex(isSelected ? 0xffffff : data.color);
      data.mesh.scale.setScalar(isSelected ? PIN_SELECTED_SCALE : 1.0);
    });
  }, [selectedCityKey]);

  if (webglFailed) {
    return (
      <div className="globe-container">
        <div className="globe-loading">
          <div className="globe-loading-orb" />
          <span>3D globe requires WebGL — not available in this environment.</span>
        </div>
      </div>
    );
  }

  const zoomIn = () => {
    const camera = cameraRef.current;
    if (!camera) return;
    camera.position.z = Math.max(CAMERA_Z_MIN, camera.position.z - CAMERA_Z_STEP);
  };

  const zoomOut = () => {
    const camera = cameraRef.current;
    if (!camera) return;
    camera.position.z = Math.min(CAMERA_Z_MAX, camera.position.z + CAMERA_Z_STEP);
  };

  const centerGlobe = () => {
    const earth = earthRef.current;
    const camera = cameraRef.current;
    if (earth) {
      earth.rotation.x = GLOBE_ROTATION_X_DEFAULT;
      earth.rotation.y = GLOBE_ROTATION_Y_DEFAULT;
    }
    if (camera) {
      camera.position.z = CAMERA_Z_DEFAULT;
    }
  };

  return (
    <div className="globe-container">
      <div className="globe-controls" aria-label="Globe controls">
        <button type="button" className="globe-control-btn" onClick={zoomIn} aria-label="Zoom in">
          +
        </button>
        <button type="button" className="globe-control-btn" onClick={zoomOut} aria-label="Zoom out">
          -
        </button>
        <button type="button" className="globe-control-btn globe-control-center" onClick={centerGlobe} aria-label="Center globe">
          Center
        </button>
      </div>
      <div ref={wrapRef} className="globe-wrap" />

      {hoveredPin ? (
        <div className="globe-tooltip">
          <strong>{hoveredPin.cityLabel}</strong>
          <span>
            {hoveredPin.groups.length} {hoveredPin.groups.length === 1 ? "group" : "groups"}
            {hoveredPin.groups[0]?.focus ? ` · ${hoveredPin.groups[0].focus}` : ""}
          </span>
        </div>
      ) : null}

      <div className="globe-hint">Drag to spin &middot; Pinch or wheel to zoom &middot; Use + / - / Center controls</div>

      <div className="globe-legend">
        {LEGEND_ITEMS.map((item) => (
          <span key={item.label} className="globe-legend-dot" style={{ "--dot": item.color } as CSSProperties}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
