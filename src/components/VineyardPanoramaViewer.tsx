import { useEffect, useRef, useState } from "react";
import {
  LinearFilter,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from "three";

export type VineyardPanoramaScene = {
  id: string;
  country: string;
  region: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  copy: string;
  details: string[];
};

type VineyardPanoramaViewerProps = {
  scenes: VineyardPanoramaScene[];
  kicker?: string;
  subjectLabel?: string;
};

const FOV_DEFAULT = 62;
const FOV_MIN = 34;
const FOV_MAX = 82;
const AUTO_ROTATE_DEGREES_PER_FRAME = MathUtils.radToDeg(0.0017);
const INTERACTION_PAUSE_MS = 10000;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function VineyardPanoramaViewer({ scenes, kicker = "360 Terroir View", subjectLabel = "vineyard" }: VineyardPanoramaViewerProps) {
  const [activeSceneId, setActiveSceneId] = useState(scenes[0]?.id ?? "");
  const [webglFailed, setWebglFailed] = useState(false);
  const activeScene = scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0];
  const hasMultipleCountries = new Set(scenes.map((scene) => scene.country)).size > 1;
  const wrapRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const lonRef = useRef(0);
  const latRef = useRef(0);
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    if (!activeScene && activeSceneId) {
      setActiveSceneId("");
    }
  }, [activeScene, activeSceneId]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !activeScene) return;

    const getSize = () => {
      const width = Math.max(wrap.clientWidth, 320);
      const height = Math.max(320, Math.min(width * 0.54, 620));
      return { width, height };
    };

    const { width, height } = getSize();
    let renderer: WebGLRenderer | null = null;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglFailed(true);
      return;
    }

    if (!renderer || !renderer.getContext()) {
      renderer?.dispose();
      setWebglFailed(true);
      return;
    }

    setWebglFailed(false);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV_DEFAULT, width / height, 0.1, 1100);
    cameraRef.current = camera;

    const geometry = new SphereGeometry(500, 96, 56);
    geometry.scale(-1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const sphere = new Mesh(geometry, material);
    scene.add(sphere);

    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(activeScene.imageSrc);
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    material.map = texture;
    material.needsUpdate = true;

    const activePointers = new Map<number, { x: number; y: number }>();
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastPinchDistance = 0;
    let frameId = 0;

    const pauseAfterInteraction = () => {
      pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_MS;
    };

    const setFov = (nextFov: number) => {
      camera.fov = clamp(nextFov, FOV_MIN, FOV_MAX);
      camera.updateProjectionMatrix();
    };

    const pointerDistance = () => {
      if (activePointers.size < 2) return 0;
      const points = Array.from(activePointers.values());
      const a = points[0];
      const b = points[1];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };

    const pointerMidpoint = () => {
      const points = Array.from(activePointers.values());
      if (points.length < 2) return null;
      return { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
    };

    const updateLookAt = () => {
      const phi = MathUtils.degToRad(90 - latRef.current);
      const theta = MathUtils.degToRad(lonRef.current);
      const target = new Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );
      camera.lookAt(target);
    };

    const handleDrag = (clientX: number, clientY: number) => {
      pauseAfterInteraction();
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      lonRef.current = (lonRef.current - dx * 0.12) % 360;
      latRef.current = clamp(latRef.current + dy * 0.1, -78, 78);
      lastX = clientX;
      lastY = clientY;
    };

    const canvas = renderer.domElement;

    const onPointerDown = (event: PointerEvent) => {
      event.preventDefault();
      pauseAfterInteraction();
      canvas.setPointerCapture(event.pointerId);
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      isDragging = true;
      if (activePointers.size >= 2) {
        const midpoint = pointerMidpoint();
        if (midpoint) {
          lastX = midpoint.x;
          lastY = midpoint.y;
        }
        lastPinchDistance = pointerDistance();
      } else {
        lastX = event.clientX;
        lastY = event.clientY;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!activePointers.has(event.pointerId)) return;
      event.preventDefault();
      pauseAfterInteraction();
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (activePointers.size >= 2) {
        const midpoint = pointerMidpoint();
        if (!midpoint) return;
        handleDrag(midpoint.x, midpoint.y);
        const distance = pointerDistance();
        if (lastPinchDistance > 0 && distance > 0) {
          setFov(camera.fov - (distance - lastPinchDistance) * 0.045);
        }
        lastPinchDistance = distance;
        return;
      }

      if (isDragging) {
        handleDrag(event.clientX, event.clientY);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      pauseAfterInteraction();
      activePointers.delete(event.pointerId);
      isDragging = activePointers.size > 0;
      lastPinchDistance = activePointers.size >= 2 ? pointerDistance() : 0;
      if (activePointers.size === 1) {
        const next = Array.from(activePointers.values())[0];
        lastX = next.x;
        lastY = next.y;
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      pauseAfterInteraction();
      setFov(camera.fov + event.deltaY * 0.035);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const resize = () => {
      const next = getSize();
      camera.aspect = next.width / next.height;
      camera.updateProjectionMatrix();
      renderer.setSize(next.width, next.height);
    };

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    observer?.observe(wrap);
    window.addEventListener("resize", resize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isDragging && activePointers.size === 0 && Date.now() >= pauseUntilRef.current) {
        lonRef.current = (lonRef.current - AUTO_ROTATE_DEGREES_PER_FRAME) % 360;
      }
      updateLookAt();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      texture.dispose();
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      if (cameraRef.current === camera) cameraRef.current = null;
      if (wrap.contains(canvas)) wrap.removeChild(canvas);
    };
  }, [activeScene]);

  if (!activeScene) return null;

  const zoomIn = () => {
    const camera = cameraRef.current;
    if (!camera) return;
    pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_MS;
    camera.fov = clamp(camera.fov - 7, FOV_MIN, FOV_MAX);
    camera.updateProjectionMatrix();
  };

  const zoomOut = () => {
    const camera = cameraRef.current;
    if (!camera) return;
    pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_MS;
    camera.fov = clamp(camera.fov + 7, FOV_MIN, FOV_MAX);
    camera.updateProjectionMatrix();
  };

  const resetView = () => {
    pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_MS;
    lonRef.current = 0;
    latRef.current = 0;
    const camera = cameraRef.current;
    if (camera) {
      camera.fov = FOV_DEFAULT;
      camera.updateProjectionMatrix();
    }
  };

  return (
    <section className="vineyard-panorama-panel" aria-label={`${activeScene.title} 360 ${subjectLabel} viewer`}>
      <div className="vineyard-panorama-copy">
        <p className="sip-maps-kicker">{kicker}</p>
        <h3>{activeScene.title}</h3>
        <p>{activeScene.copy}</p>
        <div className="vineyard-panorama-tags">
          <span>{activeScene.country}</span>
          <span>{activeScene.region}</span>
          {activeScene.details.map((detail) => (
            <span key={detail}>{detail}</span>
          ))}
        </div>
      </div>

      {scenes.length > 1 ? (
        <div className="vineyard-panorama-scenes" aria-label={`${subjectLabel} scenes`}>
          {scenes.map((scene) => (
            <button
              key={scene.id}
              type="button"
              className={scene.id === activeScene.id ? "active" : ""}
              onClick={() => {
                pauseUntilRef.current = Date.now() + INTERACTION_PAUSE_MS;
                setActiveSceneId(scene.id);
              }}
            >
              {hasMultipleCountries ? scene.country : scene.region}
            </button>
          ))}
        </div>
      ) : null}

      <div className="vineyard-panorama-stage">
        <div className="vineyard-panorama-controls" aria-label="360 viewer controls">
          <button type="button" onClick={zoomIn} aria-label="Zoom in">
            +
          </button>
          <button type="button" onClick={zoomOut} aria-label="Zoom out">
            -
          </button>
          <button type="button" onClick={resetView} aria-label="Reset view">
            Reset
          </button>
        </div>
        {webglFailed ? (
          <div className="vineyard-panorama-fallback">
            <img src={activeScene.imageSrc} alt={activeScene.imageAlt} />
            <p>360 viewer requires WebGL. Showing the source panorama instead.</p>
          </div>
        ) : (
          <div ref={wrapRef} className="vineyard-panorama-canvas" />
        )}
        <div className="vineyard-panorama-hint">Drag to pan · Pinch or wheel to zoom · Reset recenters the {subjectLabel}</div>
      </div>
    </section>
  );
}
