import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BackSide,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PCFShadowMap,
  Quaternion,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from "three";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { ArrowCounterClockwise, Minus, Plus } from "@phosphor-icons/react";
import {
  SIP_ACADEMY_CAMPUSES,
  SIP_ACADEMY_GUILDS,
  type GlobeCoordinate,
  type SipAcademyCampus,
  type SipAcademyGuildId,
  type SipAcademyMapSelection
} from "./sipAcademyGuilds";
import {
  SIP_ACADEMY_GUILD_ART,
  SIP_ACADEMY_NODE_ART,
  type SipAcademyNodeArt
} from "./sipAcademyNodeArt";
import {
  createCampusModel,
  disposeCampusModel,
  disposeCampusModelFactoryResources,
  orientCampusToSphere
} from "./three/createCampusModels";
import {
  createRegionOverlay,
  globeCoordinateToVector3,
  type RegionOverlayHandle
} from "./three/createRegionOverlays";
import { campusFocusDistance, selectionToViewQuaternion } from "./three/cameraPose";
import { isGlobeOverviewKey, shouldClearGlobeFocus } from "./three/globeInteraction";
import {
  selectAdaptiveTerrainTextures,
  selectTerrainAnisotropy,
  type TerrainTextureKind
} from "./three/terrainTextures";

type SipAcademyGlobeProps = {
  selection: SipAcademyMapSelection;
  onSelect: (selection: SipAcademyMapSelection) => void;
  onClear: () => void;
};

type LabelRecord = {
  element: HTMLButtonElement;
  object: CSS2DObject;
  selection: SipAcademyMapSelection;
  guildIds: string[];
  kind: "campus" | "guild";
};

type CampusRenderRecord = {
  campus: SipAcademyCampus;
  model: Group;
  overviewModel: Group;
  heroModel: Group;
  baseScale: number;
};

const GLOBE_RADIUS = 1.08;
const TERRAIN_PEAK = 0.052;
const REGION_RADIUS = GLOBE_RADIUS + TERRAIN_PEAK + 0.008;
const CAMPUS_SURFACE_RADIUS = GLOBE_RADIUS + TERRAIN_PEAK + 0.004;
const CAMPUS_MODEL_SCALE = 0.0215;
const CAMPUS_LABEL_HEIGHT = 6.5;
const WORLD_FRAME_RADIUS = 1.4;
const CAMERA_Z_DEFAULT = 4.08;
const CAMERA_Z_MIN = 1.98;
const CAMERA_Z_MAX = 6.4;
const CAMERA_GUILD_Z = 4.45;
const CAMERA_CAMPUS_Z = 4.42;
const WORLD_UP = new Vector3(0, 1, 0);
const WORLD_RIGHT = new Vector3(1, 0, 0);

function coordinateToVector(coordinate: GlobeCoordinate, radius = GLOBE_RADIUS): Vector3 {
  return globeCoordinateToVector3(coordinate, radius);
}

function sameSelection(left: SipAcademyMapSelection, right: SipAcademyMapSelection): boolean {
  if (left.kind !== right.kind) return false;
  if (left.kind === "world") return true;
  return right.kind !== "world" && left.id === right.id;
}

function selectionGuild(selection: SipAcademyMapSelection): SipAcademyGuildId | null {
  if (selection.kind === "world") return null;
  if (selection.kind === "guild") return selection.id;
  return SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === selection.id)?.guild ?? null;
}

export function SipAcademyGlobe({ selection, onSelect, onClear }: SipAcademyGlobeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const labelRendererRef = useRef<CSS2DRenderer | null>(null);
  const globeRef = useRef<Group | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const cameraFitZRef = useRef(CAMERA_Z_DEFAULT);
  const cameraTargetZRef = useRef(CAMERA_Z_DEFAULT);
  const cameraTargetXRef = useRef(0);
  const cameraTargetYRef = useRef(0);
  const cameraLookZRef = useRef(0);
  const cameraLookZCurrentRef = useRef(0);
  const labelsRef = useRef<LabelRecord[]>([]);
  const selectionRef = useRef(selection);
  const onSelectRef = useRef(onSelect);
  const onClearRef = useRef(onClear);
  const targetQuaternionRef = useRef<Quaternion | null>(selectionToViewQuaternion(selection));
  const [webglFailed, setWebglFailed] = useState(false);
  const activeGuildId = selectionGuild(selection);
  const activeGuild = activeGuildId ? SIP_ACADEMY_GUILDS.find((guild) => guild.id === activeGuildId) : undefined;
  const activeGuildArt = activeGuild ? SIP_ACADEMY_GUILD_ART[activeGuild.id] : undefined;

  selectionRef.current = selection;
  onSelectRef.current = onSelect;
  onClearRef.current = onClear;

  useEffect(() => {
    targetQuaternionRef.current = selection.kind === "world" ? null : selectionToViewQuaternion(selection);
    if (selection.kind === "campus") {
      const campus = SIP_ACADEMY_CAMPUSES.find((candidate) => candidate.id === selection.id);
      const isCompact = typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;
      cameraTargetZRef.current = Math.max(
        cameraFitZRef.current,
        campus ? campusFocusDistance(campus, isCompact) : CAMERA_CAMPUS_Z
      );
      cameraTargetXRef.current = 0;
      cameraTargetYRef.current = 0;
      cameraLookZRef.current = 0;
    } else if (selection.kind === "guild") {
      cameraTargetZRef.current = Math.max(cameraFitZRef.current, CAMERA_GUILD_Z);
      cameraTargetXRef.current = 0;
      cameraTargetYRef.current = 0;
      cameraLookZRef.current = 0;
    } else {
      cameraTargetZRef.current = Math.max(cameraFitZRef.current, CAMERA_Z_DEFAULT);
      cameraTargetXRef.current = 0;
      cameraTargetYRef.current = 0;
      cameraLookZRef.current = 0;
    }
  }, [selection]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompact = window.matchMedia("(max-width: 760px)").matches;
    let disposed = false;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setWebglFailed(true);
      return;
    }
    if (!renderer.getContext()) {
      renderer.dispose();
      setWebglFailed(true);
      return;
    }

    rendererRef.current = renderer;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = !isCompact;
    renderer.shadowMap.type = PCFShadowMap;
    const rendererPixelRatio = Math.min(window.devicePixelRatio, isCompact ? 1.35 : 1.65);
    renderer.setPixelRatio(rendererPixelRatio);
    renderer.setClearColor(0x03121d, 0);
    renderer.domElement.className = "sam-globe-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.touchAction = "pan-y";
    host.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRendererRef.current = labelRenderer;
    labelRenderer.domElement.className = "sam-globe-label-layer";
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.inset = "0";
    labelRenderer.domElement.style.pointerEvents = "none";
    host.appendChild(labelRenderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.01, 100);
    camera.position.set(0, 0, CAMERA_Z_DEFAULT);
    cameraRef.current = camera;

    const globe = new Group();
    globe.name = "sip-academy-living-world";
    globe.quaternion.copy(selectionToViewQuaternion(selectionRef.current));
    globeRef.current = globe;
    scene.add(globe);

    scene.add(new AmbientLight(0xffefd2, 1.12));
    const keyLight = new DirectionalLight(0xffd28a, 2.65);
    keyLight.position.set(-2.8, 3.1, 4.8);
    keyLight.castShadow = !isCompact;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.00025;
    keyLight.shadow.normalBias = 0.025;
    scene.add(keyLight);
    const fillLight = new DirectionalLight(0x8fc7c5, 1.15);
    fillLight.position.set(-3.4, -1.6, 2.2);
    scene.add(fillLight);
    const rimLight = new DirectionalLight(0x66d9f3, 1.7);
    rimLight.position.set(3.7, -0.8, -2.8);
    scene.add(rimLight);

    const networkNavigator = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const textureCompact = isCompact
      || window.matchMedia("(max-height: 520px) and (pointer: coarse)").matches;
    const maxTextureSize = renderer.capabilities.maxTextureSize;
    const measuredHostWidth = host.clientWidth || host.getBoundingClientRect().width || window.innerWidth;
    const adaptiveCanvasWidth = textureCompact
      ? measuredHostWidth
      : Math.max(measuredHostWidth, window.innerWidth * 0.8);
    const texturePlan = selectAdaptiveTerrainTextures({
      isCompact: textureCompact,
      canvasCssWidth: adaptiveCanvasWidth,
      rendererPixelRatio,
      maxTextureSize,
      saveData: networkNavigator.connection?.saveData,
      deviceMemoryGb: networkNavigator.deviceMemory
    });
    host.dataset.textureTier = texturePlan.albedoTier;
    host.dataset.textureDecisionWidth = String(Math.round(adaptiveCanvasWidth));
    host.dataset.maxTextureSize = String(maxTextureSize);

    const worldGeometry = new SphereGeometry(GLOBE_RADIUS, isCompact ? 104 : 160, isCompact ? 72 : 112);
    const worldMaterial = new MeshStandardMaterial({
      color: 0x244b49,
      roughness: 0.78,
      metalness: 0.025,
      displacementScale: TERRAIN_PEAK,
      displacementBias: -0.008
    });
    const planet = new Mesh(worldGeometry, worldMaterial);
    planet.name = "topographical-academy-world";
    planet.receiveShadow = true;
    globe.add(planet);

    const loader = new TextureLoader();
    const activeTextures = new Map<TerrainTextureKind, Texture>();
    const textureState: Record<TerrainTextureKind, "loading" | "ready" | "error"> = {
      albedo: "loading",
      height: "loading"
    };

    const syncTextureState = () => {
      host.dataset.albedoState = textureState.albedo;
      host.dataset.heightState = textureState.height;
      if (textureState.albedo === "ready" && textureState.height === "ready") {
        host.dataset.loaded = "terrain-3d";
      } else if (textureState.albedo === "ready") {
        host.dataset.loaded = "terrain";
      } else if (textureState.height === "ready") {
        host.dataset.loaded = "terrain-relief";
      } else if (textureState.albedo === "error" && textureState.height === "error") {
        host.dataset.loaded = "fallback";
      } else {
        host.dataset.loaded = "loading";
      }
    };

    const loadTerrainTexture = (
      kind: TerrainTextureKind,
      candidates: readonly string[],
      candidateIndex = 0
    ) => {
      const path = candidates[candidateIndex];
      if (!path || disposed) {
        if (!disposed) {
          textureState[kind] = "error";
          syncTextureState();
        }
        return;
      }

      host.dataset[`${kind}Requested`] = path;
      loader.load(
        path,
        (loadedTexture) => {
          if (disposed) {
            loadedTexture.dispose();
            return;
          }

          if (kind === "albedo") loadedTexture.colorSpace = SRGBColorSpace;
          loadedTexture.wrapS = RepeatWrapping;
          loadedTexture.anisotropy = selectTerrainAnisotropy(kind, renderer.capabilities.getMaxAnisotropy());

          const previousTexture = activeTextures.get(kind);
          activeTextures.set(kind, loadedTexture);
          if (kind === "albedo") {
            worldMaterial.map = loadedTexture;
            worldMaterial.color.set(0xffffff);
          } else {
            worldMaterial.displacementMap = loadedTexture;
          }
          previousTexture?.dispose();
          worldMaterial.needsUpdate = true;
          textureState[kind] = "ready";
          host.dataset[`${kind}Resolution`] = path.match(/(\d+x\d+)/)?.[1] ?? "unknown";
          syncTextureState();
        },
        undefined,
        () => loadTerrainTexture(kind, candidates, candidateIndex + 1)
      );
    };

    syncTextureState();
    loadTerrainTexture("albedo", texturePlan.albedoCandidates);
    loadTerrainTexture("height", texturePlan.heightCandidates);

    const atmosphereGeometry = new SphereGeometry(GLOBE_RADIUS * 1.075, 80, 56);
    const atmosphereMaterial = new MeshBasicMaterial({
      color: 0x63d8ee,
      transparent: true,
      opacity: 0.1,
      side: BackSide,
      depthWrite: false
    });
    const atmosphere = new Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.name = "academy-atmosphere";
    globe.add(atmosphere);

    const guildOverlays = new Map<string, RegionOverlayHandle>();
    SIP_ACADEMY_GUILDS.forEach((guild) => {
      const overlay = createRegionOverlay({
        id: guild.id,
        kind: "guild",
        polygon: guild.border,
        radius: REGION_RADIUS,
        fillColor: 0xe7c66f,
        outlineColor: 0xffe6a3,
        subdivisions: 3,
        fillOpacity: 0.01,
        outlineOpacity: 0.2,
        activeFillOpacity: 0.075,
        activeOutlineOpacity: 0.88,
        selectedFillOpacity: 0.13,
        selectedOutlineOpacity: 1
      });
      guildOverlays.set(guild.id, overlay);
      globe.add(overlay.group);
    });

    const academyOverlays = new Map<string, RegionOverlayHandle>();
    SIP_ACADEMY_CAMPUSES.forEach((campus) => {
      const overlay = createRegionOverlay({
        id: campus.id,
        kind: "academy",
        polygon: campus.countryBorder,
        radius: REGION_RADIUS * 1.0016,
        fillColor: campus.accent,
        outlineColor: campus.accent,
        subdivisions: 3,
        fillOpacity: 0.012,
        outlineOpacity: 0.14,
        activeFillOpacity: 0.025,
        activeOutlineOpacity: 0.54,
        selectedFillOpacity: 0.19,
        selectedOutlineOpacity: 1
      });
      overlay.setState("hidden");
      academyOverlays.set(campus.id, overlay);
      globe.add(overlay.group);
    });

    const campusRecords: CampusRenderRecord[] = SIP_ACADEMY_CAMPUSES.map((campus) => {
      // Keep the complete world light enough to orbit on a phone, then reveal the
      // architectural study model only for the selected academy. Both models share
      // this placement group so camera focus, labels, and borders stay perfectly aligned.
      const model = new Group();
      const overviewModel = createCampusModel(campus, "low");
      const heroModel = createCampusModel(campus, "high");
      heroModel.visible = false;
      model.add(overviewModel, heroModel);
      const baseScale = CAMPUS_MODEL_SCALE * campus.campusScale;
      model.scale.setScalar(baseScale);
      if (!isCompact) {
        heroModel.traverse((child) => {
          if (!(child instanceof Mesh)) return;
          child.castShadow = true;
          child.receiveShadow = true;
        });
      }
      const normal = coordinateToVector(campus.coordinate, 1).normalize();
      orientCampusToSphere(model, normal, CAMPUS_SURFACE_RADIUS, 0.005);
      model.rotateY((campus.heading * Math.PI) / 180);
      globe.add(model);
      return { campus, model, overviewModel, heroModel, baseScale };
    });

    const labelRecords: LabelRecord[] = [];
    let rovingElement: HTMLButtonElement | null = null;
    let rovingSelectionKey = "";
    const createLabelElement = (
      label: string,
      currentSelection: SipAcademyMapSelection,
      kind: "campus" | "guild",
      accent?: string,
      accessibleLabel = label,
      art?: SipAcademyNodeArt
    ) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `sam-globe-node sam-globe-node--${kind}`;
      const media = document.createElement("span");
      media.className = "sam-globe-node__media";
      if (art) {
        const image = document.createElement("img");
        image.alt = "";
        image.decoding = "async";
        image.loading = "lazy";
        image.src = art.src;
        if (art.position) image.style.objectPosition = art.position;
        media.append(image);
      }
      const copy = document.createElement("span");
      copy.className = "sam-globe-node__copy";
      const eyebrow = document.createElement("span");
      eyebrow.className = "sam-globe-node__eyebrow";
      eyebrow.textContent = kind === "guild" ? "Guild territory" : "Academy campus";
      const title = document.createElement("strong");
      title.className = "sam-globe-node__title";
      title.textContent = label;
      copy.append(eyebrow, title);
      button.replaceChildren(media, copy);
      button.setAttribute("aria-label", `${kind === "guild" ? "Explore" : "Inspect"} ${accessibleLabel}`);
      button.style.pointerEvents = "auto";
      if (accent) button.style.setProperty("--sam-node-accent", accent);
      button.addEventListener("click", () => onSelectRef.current(currentSelection));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        const visibleButtons = labelRecords
          .map((record) => record.element)
          .filter((element) => !element.hidden && !element.disabled);
        const currentIndex = visibleButtons.indexOf(button);
        if (currentIndex < 0 || visibleButtons.length < 2) return;
        const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
        const nextButton = visibleButtons[(currentIndex + direction + visibleButtons.length) % visibleButtons.length];
        visibleButtons.forEach((element) => { element.tabIndex = -1; });
        if (nextButton) {
          rovingElement = nextButton;
          nextButton.tabIndex = 0;
          nextButton.focus();
        }
      });
      return button;
    };

    SIP_ACADEMY_GUILDS.forEach((guild) => {
      const button = createLabelElement(
        guild.name,
        { kind: "guild", id: guild.id },
        "guild",
        undefined,
        guild.name,
        SIP_ACADEMY_GUILD_ART[guild.id]
      );
      const object = new CSS2DObject(button);
      object.position.copy(coordinateToVector(guild.anchor, REGION_RADIUS + 0.035));
      globe.add(object);
      labelRecords.push({ element: button, object, selection: { kind: "guild", id: guild.id }, guildIds: [guild.id], kind: "guild" });
    });

    campusRecords.forEach(({ campus, model }) => {
      const button = createLabelElement(
        isCompact ? campus.shortName : campus.name,
        { kind: "campus", id: campus.id },
        "campus",
        campus.accent,
        campus.name,
        SIP_ACADEMY_NODE_ART[campus.id]
      );
      const object = new CSS2DObject(button);
      object.position.set(0, CAMPUS_LABEL_HEIGHT, 0);
      model.add(object);
      labelRecords.push({
        element: button,
        object,
        selection: { kind: "campus", id: campus.id },
        guildIds: [campus.guild, ...(campus.affiliateGuilds ?? [])],
        kind: "campus"
      });
    });
    labelsRef.current = labelRecords;

    const activePointers = new Map<number, { x: number; y: number }>();
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastPinchDistance = 0;
    let autoRotateAt = performance.now() + 11000;
    let pointerGesture: {
      button: number;
      maxPointerCount: number;
      pointerId: number;
      startAt: number;
      startX: number;
      startY: number;
    } | null = null;

    const setCameraZ = (value: number) => {
      cameraTargetZRef.current = Math.max(CAMERA_Z_MIN, Math.min(CAMERA_Z_MAX, value));
    };
    const pointerDistance = () => {
      const values = [...activePointers.values()];
      if (values.length < 2) return 0;
      return Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y);
    };
    const pointerCenter = () => {
      const values = [...activePointers.values()];
      if (values.length < 2) return null;
      return { x: (values[0].x + values[1].x) / 2, y: (values[0].y + values[1].y) / 2 };
    };
    const postponeAutoRotate = () => {
      autoRotateAt = performance.now() + 14000;
    };
    const pointerDown = (event: PointerEvent) => {
      host.focus({ preventScroll: true });
      renderer.domElement.setPointerCapture(event.pointerId);
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (!pointerGesture) {
        pointerGesture = {
          button: event.button,
          maxPointerCount: 1,
          pointerId: event.pointerId,
          startAt: performance.now(),
          startX: event.clientX,
          startY: event.clientY
        };
      } else {
        pointerGesture.maxPointerCount = Math.max(pointerGesture.maxPointerCount, activePointers.size);
      }
      dragging = true;
      targetQuaternionRef.current = null;
      const center = pointerCenter();
      lastX = center?.x ?? event.clientX;
      lastY = center?.y ?? event.clientY;
      lastPinchDistance = pointerDistance();
      velocityX = 0;
      velocityY = 0;
      postponeAutoRotate();
    };
    const pointerMove = (event: PointerEvent) => {
      if (!activePointers.has(event.pointerId)) return;
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      const center = pointerCenter();
      const nextX = center?.x ?? event.clientX;
      const nextY = center?.y ?? event.clientY;
      const deltaX = nextX - lastX;
      const deltaY = nextY - lastY;
      if (activePointers.size === 1 && Math.abs(deltaY) > Math.abs(deltaX) * 1.35) {
        lastX = nextX;
        lastY = nextY;
        return;
      }
      event.preventDefault();
      globe.rotateOnWorldAxis(WORLD_UP, deltaX * 0.006);
      globe.rotateOnWorldAxis(WORLD_RIGHT, deltaY * 0.0048);
      velocityX = deltaX * 0.0055;
      velocityY = deltaY * 0.0042;
      lastX = nextX;
      lastY = nextY;
      if (activePointers.size > 1) {
        const distance = pointerDistance();
        if (lastPinchDistance > 0) setCameraZ(cameraTargetZRef.current - (distance - lastPinchDistance) * 0.006);
        lastPinchDistance = distance;
      }
      postponeAutoRotate();
    };
    const pointerUp = (event: PointerEvent) => {
      const completedGesture = pointerGesture?.pointerId === event.pointerId ? pointerGesture : null;
      activePointers.delete(event.pointerId);
      dragging = activePointers.size > 0;
      lastPinchDistance = pointerDistance();
      postponeAutoRotate();
      if (completedGesture) {
        if (
          selectionRef.current.kind !== "world"
          && shouldClearGlobeFocus({
            button: completedGesture.button,
            cancelled: false,
            elapsedMs: performance.now() - completedGesture.startAt,
            endX: event.clientX,
            endY: event.clientY,
            maxPointerCount: completedGesture.maxPointerCount,
            startX: completedGesture.startX,
            startY: completedGesture.startY
          })
        ) {
          onClearRef.current();
        }
        pointerGesture = null;
      }
    };
    const pointerCancel = (event: PointerEvent) => {
      if (pointerGesture?.pointerId === event.pointerId) pointerGesture = null;
      activePointers.delete(event.pointerId);
      dragging = activePointers.size > 0;
      lastPinchDistance = pointerDistance();
      postponeAutoRotate();
    };
    const wheel = (event: WheelEvent) => {
      if (document.activeElement !== host) return;
      event.preventDefault();
      setCameraZ(cameraTargetZRef.current + event.deltaY * 0.0022);
      postponeAutoRotate();
    };

    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointermove", pointerMove, { passive: false });
    renderer.domElement.addEventListener("pointerup", pointerUp);
    renderer.domElement.addEventListener("pointercancel", pointerCancel);
    renderer.domElement.addEventListener("wheel", wheel, { passive: false });

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      labelRenderer.setSize(width, height);
      camera.aspect = width / height;
      const verticalHalfFov = (camera.fov * Math.PI) / 360;
      const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * camera.aspect);
      const limitingHalfFov = Math.min(verticalHalfFov, horizontalHalfFov);
      const fitDistance = WORLD_FRAME_RADIUS / Math.sin(limitingHalfFov);
      cameraFitZRef.current = Math.max(CAMERA_Z_DEFAULT, Math.min(CAMERA_Z_MAX, fitDistance));
      const currentSelection = selectionRef.current;
      if (currentSelection.kind === "guild") {
        cameraTargetZRef.current = Math.max(cameraFitZRef.current, CAMERA_GUILD_Z);
      } else if (currentSelection.kind === "campus") {
        const campus = SIP_ACADEMY_CAMPUSES.find((candidate) => candidate.id === currentSelection.id);
        const compactHost = width <= 760;
        cameraTargetZRef.current = Math.max(
          cameraFitZRef.current,
          campus ? campusFocusDistance(campus, compactHost) : CAMERA_CAMPUS_Z
        );
      } else {
        cameraTargetZRef.current = Math.max(cameraFitZRef.current, CAMERA_Z_DEFAULT);
      }
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const worldPosition = new Vector3();
    const cameraVector = new Vector3();
    let frame = 0;
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      const currentSelection = selectionRef.current;
      const targetQuaternion = targetQuaternionRef.current;
      if (targetQuaternion) {
        globe.quaternion.slerp(targetQuaternion, reduceMotion ? 1 : 0.075);
        if (1 - Math.abs(globe.quaternion.dot(targetQuaternion)) < 0.00001) {
          globe.quaternion.copy(targetQuaternion);
          targetQuaternionRef.current = null;
        }
      } else if (!dragging) {
        if (!reduceMotion && currentSelection.kind !== "campus" && performance.now() > autoRotateAt) {
          globe.rotateOnWorldAxis(WORLD_UP, -0.00045);
        }
        if (Math.abs(velocityX) > 0.00002) globe.rotateOnWorldAxis(WORLD_UP, velocityX);
        if (Math.abs(velocityY) > 0.00002) globe.rotateOnWorldAxis(WORLD_RIGHT, velocityY);
        velocityX *= 0.91;
        velocityY *= 0.91;
      }

      const cameraEase = reduceMotion ? 1 : 0.1;
      camera.position.x += (cameraTargetXRef.current - camera.position.x) * cameraEase;
      camera.position.y += (cameraTargetYRef.current - camera.position.y) * cameraEase;
      camera.position.z += (cameraTargetZRef.current - camera.position.z) * cameraEase;
      cameraLookZCurrentRef.current += (cameraLookZRef.current - cameraLookZCurrentRef.current) * cameraEase;
      camera.lookAt(0, 0, cameraLookZCurrentRef.current);

      const activeGuild = selectionGuild(currentSelection);
      guildOverlays.forEach((overlay, guildId) => {
        const selectedGuild = currentSelection.kind === "guild" && currentSelection.id === guildId;
        overlay.setState(selectedGuild ? "selected" : guildId === activeGuild ? "active" : "idle");
        if (!reduceMotion && (selectedGuild || guildId === activeGuild)) {
          overlay.outline.material.opacity *= 0.9 + Math.sin(time * 0.0018) * 0.1;
        }
      });
      academyOverlays.forEach((overlay, campusId) => {
        const campus = SIP_ACADEMY_CAMPUSES.find((candidate) => candidate.id === campusId);
        if (!campus || campus.guild !== activeGuild) {
          overlay.setState("hidden");
          return;
        }
        const selectedCampus = currentSelection.kind === "campus" && currentSelection.id === campusId;
        overlay.setState(selectedCampus ? "selected" : "active");
      });

      cameraVector.copy(camera.position).normalize();
      campusRecords.forEach((record) => {
        record.model.getWorldPosition(worldPosition);
        const onFront = worldPosition.clone().normalize().dot(cameraVector) > -0.04;
        const inActiveGuild = activeGuild !== null && record.campus.guild === activeGuild;
        const isSelected = currentSelection.kind === "campus" && currentSelection.id === record.campus.id;
        record.model.visible = onFront;
        record.overviewModel.visible = onFront && !isSelected;
        record.heroModel.visible = onFront && isSelected;
        const viewingCampus = currentSelection.kind === "campus";
        const targetScale = record.baseScale * (
          isSelected
            ? isCompact ? 3.32 : 3.08
            : viewingCampus
              ? inActiveGuild ? 0.72 : 0.48
              : inActiveGuild ? 1.08 : 0.86
        );
        const currentScale = record.model.scale.x;
        const nextScale = reduceMotion ? targetScale : currentScale + (targetScale - currentScale) * 0.12;
        record.model.scale.setScalar(nextScale);
      });

      const visibility = new Map<LabelRecord, boolean>();
      labelRecords.forEach((record) => {
        const isSelected = sameSelection(record.selection, currentSelection);
        if (record.kind === "campus") {
          record.object.position.y = isSelected ? (isCompact ? 4.5 : 4.1) : CAMPUS_LABEL_HEIGHT;
        }
        record.object.getWorldPosition(worldPosition);
        const onFront = worldPosition.clone().normalize().dot(cameraVector) > 0.18;
        const inActiveGuild = activeGuild !== null && record.guildIds.includes(activeGuild);
        const showGuild = record.kind === "guild" && (
          currentSelection.kind === "world"
            || (
              currentSelection.kind === "guild"
              && record.selection.kind === "guild"
              && record.selection.id === activeGuild
            )
        );
        const showCampus = record.kind === "campus" && currentSelection.kind !== "world" && (
          currentSelection.kind === "campus" ? isSelected : inActiveGuild
        );
        const hideCompactGuild = isCompact && record.kind === "guild" && currentSelection.kind !== "world";
        const visible = onFront && (showGuild || showCampus) && !hideCompactGuild;
        visibility.set(record, visible);
        record.element.classList.toggle("is-selected", isSelected);
        record.element.classList.toggle("is-in-active-guild", inActiveGuild);
        record.element.classList.toggle("is-visible", visible);
        record.element.setAttribute("aria-pressed", isSelected ? "true" : "false");
        record.element.hidden = !visible;
        record.element.disabled = !visible;
        record.element.tabIndex = -1;
        if (!visible && document.activeElement === record.element) host.focus({ preventScroll: true });
      });

      const selectionKey = currentSelection.kind === "world"
        ? "world"
        : `${currentSelection.kind}:${currentSelection.id}`;
      const visibleRecords = labelRecords.filter((record) => visibility.get(record));
      if (selectionKey !== rovingSelectionKey || !rovingElement || rovingElement.hidden || rovingElement.disabled) {
        rovingElement = visibleRecords.find((record) => sameSelection(record.selection, currentSelection))?.element
          ?? visibleRecords[0]?.element
          ?? null;
        rovingSelectionKey = selectionKey;
      }
      visibleRecords.forEach((record) => {
        record.element.tabIndex = record.element === rovingElement ? 0 : -1;
      });

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", pointerDown);
      renderer.domElement.removeEventListener("pointermove", pointerMove);
      renderer.domElement.removeEventListener("pointerup", pointerUp);
      renderer.domElement.removeEventListener("pointercancel", pointerCancel);
      renderer.domElement.removeEventListener("wheel", wheel);
      labelRecords.forEach((record) => record.element.remove());
      guildOverlays.forEach((overlay) => overlay.dispose());
      academyOverlays.forEach((overlay) => overlay.dispose());
      campusRecords.forEach((record) => disposeCampusModel(record.model));
      disposeCampusModelFactoryResources();
      worldGeometry.dispose();
      worldMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      activeTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
      rendererRef.current = null;
      labelRendererRef.current = null;
      globeRef.current = null;
      cameraRef.current = null;
      labelsRef.current = [];
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
      if (host.contains(labelRenderer.domElement)) host.removeChild(labelRenderer.domElement);
    };
  }, []);

  const rotateGlobe = (horizontal: number, vertical = 0) => {
    const globe = globeRef.current;
    if (!globe) return;
    targetQuaternionRef.current = null;
    globe.rotateOnWorldAxis(WORLD_UP, horizontal);
    if (vertical) globe.rotateOnWorldAxis(WORLD_RIGHT, vertical);
  };

  const zoomGlobe = (delta: number) => {
    cameraTargetZRef.current = Math.max(
      CAMERA_Z_MIN,
      Math.min(CAMERA_Z_MAX, cameraTargetZRef.current + delta)
    );
  };

  const resetGlobe = () => {
    const currentSelection = selectionRef.current;
    targetQuaternionRef.current = selectionToViewQuaternion(currentSelection);
    if (currentSelection.kind === "campus") {
      const campus = SIP_ACADEMY_CAMPUSES.find((candidate) => candidate.id === currentSelection.id);
      const isCompact = typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;
      cameraTargetZRef.current = Math.max(
        cameraFitZRef.current,
        campus ? campusFocusDistance(campus, isCompact) : CAMERA_CAMPUS_Z
      );
      cameraTargetXRef.current = 0;
      cameraTargetYRef.current = 0;
      cameraLookZRef.current = 0;
    } else if (currentSelection.kind === "guild") {
      cameraTargetZRef.current = Math.max(cameraFitZRef.current, CAMERA_GUILD_Z);
      cameraTargetXRef.current = 0;
      cameraTargetYRef.current = 0;
      cameraLookZRef.current = 0;
    } else {
      cameraTargetZRef.current = Math.max(cameraFitZRef.current, CAMERA_Z_DEFAULT);
      cameraTargetXRef.current = 0;
      cameraTargetYRef.current = 0;
      cameraLookZRef.current = 0;
    }
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (isGlobeOverviewKey(event.key)) {
      if (selectionRef.current.kind !== "world") {
        event.preventDefault();
        onClearRef.current();
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      rotateGlobe(-0.15);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      rotateGlobe(0.15);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      rotateGlobe(0, -0.12);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      rotateGlobe(0, 0.12);
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomGlobe(-0.22);
    } else if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      zoomGlobe(0.22);
    } else if (event.key === "Home") {
      event.preventDefault();
      resetGlobe();
    }
  };

  if (webglFailed) {
    return (
      <figure className="sam-globe-fallback">
        <img
          alt="Topographical SIP Academy world showing five connected guild regions shaped by watersheds and beverage terroir"
          onError={(event) => {
            const image = event.currentTarget;
            if (image.dataset.legacyFallback === "true") return;
            image.dataset.legacyFallback = "true";
            image.removeAttribute("srcset");
            image.src = "/sip-academy-map/world/sip-academy-terrain-albedo-2048x1024.webp";
          }}
          sizes="(min-width: 1200px) 1200px, 100vw"
          src="/sip-academy-map/world/sip-academy-terrain-albedo-v2-1024x512.webp"
          srcSet="/sip-academy-map/world/sip-academy-terrain-albedo-v2-1024x512.webp 1024w, /sip-academy-map/world/sip-academy-terrain-albedo-v2-2048x1024.webp 2048w, /sip-academy-map/world/sip-academy-terrain-albedo-v2-4096x2048.webp 4096w"
        />
        <figcaption>The 3D campus globe is unavailable, so the complete academy terrain is shown as a study plate.</figcaption>
      </figure>
    );
  }

  return (
    <section
      className={`sam-globe-explorer${selection.kind === "world" ? " is-world-overview" : ""}`}
      aria-label="Interactive 360-degree SIP Academy globe"
    >
      {activeGuild && activeGuildArt ? (
        <div className="sam-globe-active-rail" aria-hidden="true">
          <img alt="" decoding="async" src={activeGuildArt.src} style={{ objectPosition: activeGuildArt.position }} />
          <span>
            <small>Active territory</small>
            <strong>{activeGuild.name}</strong>
          </span>
        </div>
      ) : null}
      <div className="sam-globe-controls" aria-label="Globe movement controls">
        <button onClick={() => zoomGlobe(-0.22)} type="button" aria-label="Zoom in">
          <Plus aria-hidden="true" weight="bold" />
        </button>
        <button onClick={() => zoomGlobe(0.22)} type="button" aria-label="Zoom out">
          <Minus aria-hidden="true" weight="bold" />
        </button>
        <button
          onClick={resetGlobe}
          type="button"
          aria-label={selection.kind === "world" ? "Refocus world overview" : "Refocus selected territory"}
        >
          <ArrowCounterClockwise aria-hidden="true" weight="bold" />
          <span>Refocus</span>
        </button>
      </div>
      <div
        aria-describedby="sam-globe-instructions"
        aria-label="Rotate the academy globe"
        className="sam-globe-host"
        onKeyDown={handleKeyboard}
        ref={hostRef}
        role="region"
        tabIndex={0}
      />
      <p className="sam-globe-instructions" id="sam-globe-instructions">
        Drag or swipe to orbit. Tap open globe space or press Escape for the world overview. Arrow keys rotate; Home refocuses.
      </p>
    </section>
  );
}

export default SipAcademyGlobe;
