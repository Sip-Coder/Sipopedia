import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";

const GLOBE_R = 1;
const GLOBE_ROTATION_Y_DEFAULT = 0.4;
const GLOBE_ROTATION_X_DEFAULT = 0;
const TEX_W = 2048;
const TEX_H = 1024;
const MAP_W = 800;
const MAP_H = 400;
const CAMERA_Z_DEFAULT = 2.85;
const CAMERA_Z_MIN = 2.05;
const CAMERA_Z_MAX = 4.6;

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

const FOCUS_HEX: Record<string, number> = {
  Wine: 0xd4435b,
  Spirits: 0xf4a623,
  Beer: 0xe8882a,
  Sake: 0xa57ecf,
  "Zero Proof": 0x4caf80,
  "Coffee & Tea": 0x9c6e56,
};

const FOCUS_CSS: Record<string, string> = {
  Wine: "#d4435b",
  Spirits: "#f4a623",
  Beer: "#e8882a",
  Sake: "#a57ecf",
  "Zero Proof": "#4caf80",
  "Coffee & Tea": "#9c6e56",
};

function buildEarthTexture(mapPaths: MapCountryPath[]): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const oceanGrad = ctx.createLinearGradient(0, 0, 0, TEX_H);
  oceanGrad.addColorStop(0, "#030912");
  oceanGrad.addColorStop(0.28, "#050f20");
  oceanGrad.addColorStop(0.5, "#071528");
  oceanGrad.addColorStop(0.72, "#050f20");
  oceanGrad.addColorStop(1, "#030912");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  ctx.strokeStyle = "rgba(70,120,200,0.055)";
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

  ctx.strokeStyle = "rgba(100,200,255,0.16)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, TEX_H / 2);
  ctx.lineTo(TEX_W, TEX_H / 2);
  ctx.stroke();

  const sx = TEX_W / MAP_W;
  const sy = TEX_H / MAP_H;

  const landGrad = ctx.createLinearGradient(0, 0, 0, TEX_H);
  landGrad.addColorStop(0, "#1a3018");
  landGrad.addColorStop(0.38, "#203820");
  landGrad.addColorStop(0.5, "#274a26");
  landGrad.addColorStop(0.62, "#203820");
  landGrad.addColorStop(1, "#1a3018");
  ctx.fillStyle = landGrad;
  ctx.strokeStyle = "#2e5530";
  ctx.lineWidth = 0.6;

  const re = /([ML])(-?[\d.]+),(-?[\d.]+)|(Z)/g;
  for (const country of mapPaths) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    ctx.beginPath();
    while ((m = re.exec(country.path)) !== null) {
      if (m[4] === "Z") {
        ctx.closePath();
      } else if (m[1] === "M") {
        ctx.moveTo(parseFloat(m[2]) * sx, parseFloat(m[3]) * sy);
      } else {
        ctx.lineTo(parseFloat(m[2]) * sx, parseFloat(m[3]) * sy);
      }
    }
    ctx.fill();
    ctx.stroke();
  }

  return canvas;
}

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export function GlobeMap({ cityPins, mapPaths, selectedCityKey, onPinSelect }: GlobeMapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hoveredPin, setHoveredPin] = useState<GlobePinInput | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);

  const onPinSelectRef = useRef(onPinSelect);
  onPinSelectRef.current = onPinSelect;
  const setHoveredRef = useRef(setHoveredPin);
  setHoveredRef.current = setHoveredPin;

  const pinDataRef = useRef<Map<string, { mesh: THREE.Mesh; color: number }>>(new Map());

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const getSize = () => {
      const w = Math.max(wrap.clientWidth, 320);
      const h = Math.max(340, Math.min(w * 0.6, 520));
      return { w, h };
    };
    const { w, h } = getSize();

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglFailed(true);
      return;
    }
    if (!renderer || !renderer.getContext()) {
      setWebglFailed(true);
      renderer?.dispose();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
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
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    const texCanvas = buildEarthTexture(mapPaths);
    const texture = new THREE.CanvasTexture(texCanvas);

    const earthGeo = new THREE.SphereGeometry(GLOBE_R, 72, 72);
    const earthMat = new THREE.MeshPhongMaterial({
      map: texture,
      specular: new THREE.Color(0x040b18),
      shininess: 7,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.rotation.y = GLOBE_ROTATION_Y_DEFAULT;
    earth.rotation.x = GLOBE_ROTATION_X_DEFAULT;
    earthRef.current = earth;
    scene.add(earth);

    const atmoGeo = new THREE.SphereGeometry(GLOBE_R * 1.065, 40, 40);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x3a7de8,
      transparent: true,
      opacity: 0.11,
      side: THREE.BackSide,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    const hazeGeo = new THREE.SphereGeometry(GLOBE_R * 1.018, 32, 32);
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0x1040a0,
      transparent: true,
      opacity: 0.035,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(hazeGeo, hazeMat));

    scene.add(new THREE.AmbientLight(0xffffff, 0.28));
    const sun = new THREE.DirectionalLight(0xfff4e0, 1.25);
    sun.position.set(4, 2, 3);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x3355aa, 0.28);
    fill.position.set(-3, -1, -2);
    scene.add(fill);

    const PIN_R = 0.026;
    const localPinMap = new Map<string, { mesh: THREE.Mesh; color: number }>();

    for (const pin of cityPins) {
      const focus = pin.groups[0]?.focus ?? "Wine";
      const color = FOCUS_HEX[focus] ?? 0xee4466;
      const isSelected = pin.cityKey === selectedCityKey;
      const pos = latLonToVec3(pin.lat, pin.lon, GLOBE_R + PIN_R * 0.6);

      const geo = new THREE.SphereGeometry(isSelected ? PIN_R * 1.55 : PIN_R, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: isSelected ? 0xffffff : color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      earth.add(mesh);

      if (isSelected) {
        const ringGeo = new THREE.RingGeometry(PIN_R * 2.2, PIN_R * 3, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        const outward = pos.clone().normalize();
        ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward);
        earth.add(ring);
      }

      localPinMap.set(pin.cityKey, { mesh, color });
    }

    pinDataRef.current = localPinMap;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    let touchTapCandidate = false;
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

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

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

    const findPinByMesh = (mesh: THREE.Object3D): GlobePinInput | null => {
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
        if (activeTouchPointers.size >= 2) {
          const mid = touchMidpoint();
          if (mid) {
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
        if (activeTouchPointers.size >= 2) {
          e.preventDefault();
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
        if (touchTapCandidate && !wasDrag && activeTouchPointers.size === 0) {
          toNDC(e.clientX, e.clientY);
          raycaster.setFromCamera(ndc, camera);
          const hits = raycaster.intersectObjects(allPinMeshes());
          if (hits.length > 0) {
            const pin = findPinByMesh(hits[0].object);
            if (pin) onPinSelectRef.current(pin);
          }
        }
        if (activeTouchPointers.size === 0) touchTapCandidate = false;
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
          earth.rotation.y += 0.0017;
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
      (data.mesh.material as THREE.MeshBasicMaterial).color.setHex(isSelected ? 0xffffff : data.color);
      data.mesh.scale.setScalar(isSelected ? 1.6 : 1.0);
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
    camera.position.z = Math.max(CAMERA_Z_MIN, camera.position.z - 0.22);
  };

  const zoomOut = () => {
    const camera = cameraRef.current;
    if (!camera) return;
    camera.position.z = Math.min(CAMERA_Z_MAX, camera.position.z + 0.22);
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
        {Object.entries(FOCUS_CSS).map(([focus, color]) => (
          <span key={focus} className="globe-legend-dot" style={{ "--dot": color } as CSSProperties}>
            {focus}
          </span>
        ))}
      </div>
    </div>
  );
}
