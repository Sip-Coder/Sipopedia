import {
  BoxGeometry,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  InstancedMesh,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
  SphereGeometry,
  TorusGeometry,
  Vector3
} from "three";
import {
  SIP_ACADEMY_CAMPUSES,
  type SipAcademyCampus,
  type SipAcademyCampusId,
  type SipAcademyGuildId
} from "../sipAcademyGuilds";

/**
 * The campus kit is authored Y-up on an X/Z ground plane. A globe can place the
 * returned group at a surface point and rotate its local +Y axis to the surface
 * normal without changing any of the model's internal transforms.
 */
export type CampusModelDetail = "low" | "high";

type Vec3 = readonly [number, number, number];
type CueKind =
  | "vineyard"
  | "grain"
  | "copper"
  | "coffee-grove"
  | "tea-terraces"
  | "culture"
  | "waterworks"
  | "orchard"
  | "pasture"
  | "botanical"
  | "protein-plots"
  | "kinetic"
  | "carbonation"
  | "fermentation-yard"
  | "market";

type CampusModelConfig = {
  cue: CueKind;
  rotation: number;
  mainScale: Vec3;
  processScale: Vec3;
  towerHeight: number;
  glassBias?: number;
  brassBias?: number;
};

type CampusModuleKey = "main" | "process" | "conservatory" | "tower" | "pavilion" | "archive" | "gallery";
type CampusSitePlan = "radial" | "terraced" | "axial" | "linear" | "courtyard" | "cloister" | "industrial" | "village" | "forum";
type CampusSignature =
  | "wine-cellar"
  | "beer-brewhouse"
  | "spirits-stillhouse"
  | "coffee-roastery"
  | "tea-manufactory"
  | "kombucha-culture-house"
  | "water-hydrology-forum"
  | "juice-press-house"
  | "milk-dairy-campus"
  | "health-research-cloister"
  | "protein-hydration-atrium"
  | "energy-mixing-nave"
  | "soda-carbonation-forum"
  | "fermented-culture-village"
  | "regional-civic-forum";

type CampusModulePlacement = {
  position: readonly [number, number];
  rotation: number;
  scale?: Vec3;
};

type CampusArchitectureSpec = {
  sitePlan: CampusSitePlan;
  signature: CampusSignature;
  landmarkPosition: Vec3;
  landmarkRotation?: number;
  landmarkScale?: Vec3;
  facadeDensity: number;
};

type CampusMaterials = {
  limestone: MeshStandardMaterial;
  limestoneLight: MeshStandardMaterial;
  limestoneDark: MeshStandardMaterial;
  brass: MeshStandardMaterial;
  brassDark: MeshStandardMaterial;
  roof: MeshStandardMaterial;
  roofLight: MeshStandardMaterial;
  glass: MeshPhysicalMaterial;
  glow: MeshStandardMaterial;
  water: MeshPhysicalMaterial;
  accent: MeshStandardMaterial;
  soil: MeshStandardMaterial;
  foliage: MeshStandardMaterial;
  foliageLight: MeshStandardMaterial;
  path: MeshStandardMaterial;
};

const CAMPUS_CONFIG: Record<SipAcademyCampusId, CampusModelConfig> = {
  wine: {
    cue: "vineyard",
    rotation: -0.12,
    mainScale: [1.08, 0.92, 1.12],
    processScale: [1.25, 0.88, 1.06],
    towerHeight: 1.05,
    glassBias: 0.8
  },
  beer: {
    cue: "grain",
    rotation: 0.1,
    mainScale: [1.12, 1.04, 1],
    processScale: [1.22, 1.08, 1.1],
    towerHeight: 1.2,
    brassBias: 1.08
  },
  spirits: {
    cue: "copper",
    rotation: -0.24,
    mainScale: [1, 1.08, 0.96],
    processScale: [1.12, 1.12, 0.96],
    towerHeight: 1.55,
    brassBias: 1.22
  },
  coffee: {
    cue: "coffee-grove",
    rotation: 0.2,
    mainScale: [1.15, 0.92, 1.05],
    processScale: [1.12, 1.05, 1.08],
    towerHeight: 1.08
  },
  tea: {
    cue: "tea-terraces",
    rotation: -0.18,
    mainScale: [1.22, 0.8, 1.14],
    processScale: [1.16, 0.82, 1.18],
    towerHeight: 0.9,
    glassBias: 1.1
  },
  kombucha: {
    cue: "culture",
    rotation: 0.18,
    mainScale: [1.02, 0.92, 1.04],
    processScale: [1.08, 0.96, 1.08],
    towerHeight: 1.02,
    glassBias: 1.24
  },
  water: {
    cue: "waterworks",
    rotation: 0,
    mainScale: [1.12, 0.96, 1.12],
    processScale: [1.16, 0.9, 1.2],
    towerHeight: 1.2,
    glassBias: 1.35
  },
  juice: {
    cue: "orchard",
    rotation: -0.14,
    mainScale: [1.18, 0.9, 1.08],
    processScale: [1.25, 0.92, 1.1],
    towerHeight: 0.92
  },
  milk: {
    cue: "pasture",
    rotation: 0.14,
    mainScale: [1.24, 0.82, 1.08],
    processScale: [1.28, 0.86, 1.14],
    towerHeight: 0.96,
    glassBias: 1.15
  },
  "health-drinks": {
    cue: "botanical",
    rotation: -0.08,
    mainScale: [1.06, 1.02, 1.04],
    processScale: [1.12, 0.98, 1.08],
    towerHeight: 1.16,
    glassBias: 1.28
  },
  protein: {
    cue: "protein-plots",
    rotation: 0.08,
    mainScale: [1.14, 0.96, 1.1],
    processScale: [1.2, 1.02, 1.08],
    towerHeight: 1.04
  },
  "energy-drinks": {
    cue: "kinetic",
    rotation: -0.2,
    mainScale: [1.02, 1.08, 0.98],
    processScale: [1.1, 1.08, 1.02],
    towerHeight: 1.4,
    glassBias: 1.22
  },
  sodas: {
    cue: "carbonation",
    rotation: 0.12,
    mainScale: [1.08, 0.94, 1.08],
    processScale: [1.16, 1, 1.1],
    towerHeight: 1.12,
    glassBias: 1.22
  },
  fermented: {
    cue: "fermentation-yard",
    rotation: -0.1,
    mainScale: [1.1, 0.94, 1.08],
    processScale: [1.18, 1, 1.14],
    towerHeight: 1.05,
    brassBias: 1.08
  },
  "regional-drinks": {
    cue: "market",
    rotation: 0.22,
    mainScale: [1.18, 0.86, 1.12],
    processScale: [1.12, 0.9, 1.18],
    towerHeight: 1,
    brassBias: 1.08
  }
};

/**
 * Architectural identity is intentionally separate from beverage-process cues.
 * Every academy shares the SIP material language while its plan, skyline and
 * primary civic building communicate a different program without novelty
 * bottle-, cup- or still-shaped architecture.
 */
const CAMPUS_ARCHITECTURE: Record<SipAcademyCampusId, CampusArchitectureSpec> = {
  wine: {
    sitePlan: "terraced",
    signature: "wine-cellar",
    landmarkPosition: [-2.78, 0.32, -2.42],
    landmarkRotation: -0.16,
    landmarkScale: [1.04, 1, 1.08],
    facadeDensity: 7
  },
  beer: {
    sitePlan: "industrial",
    signature: "beer-brewhouse",
    landmarkPosition: [-2.92, 0.32, -2.2],
    landmarkRotation: 0.12,
    landmarkScale: [1.08, 1.08, 1],
    facadeDensity: 8
  },
  spirits: {
    sitePlan: "axial",
    signature: "spirits-stillhouse",
    landmarkPosition: [-2.64, 0.32, -2.28],
    landmarkRotation: -0.1,
    landmarkScale: [1.12, 1.18, 1.04],
    facadeDensity: 9
  },
  coffee: {
    sitePlan: "terraced",
    signature: "coffee-roastery",
    landmarkPosition: [-2.86, 0.32, -2.18],
    landmarkRotation: 0.18,
    landmarkScale: [1.08, 1, 1.02],
    facadeDensity: 7
  },
  tea: {
    sitePlan: "linear",
    signature: "tea-manufactory",
    landmarkPosition: [-2.36, 0.32, -2.42],
    landmarkRotation: -0.2,
    landmarkScale: [1.18, 0.94, 1.06],
    facadeDensity: 8
  },
  kombucha: {
    sitePlan: "village",
    signature: "kombucha-culture-house",
    landmarkPosition: [-2.44, 0.32, -2.36],
    landmarkRotation: 0.14,
    landmarkScale: [1.02, 1, 1.02],
    facadeDensity: 6
  },
  water: {
    sitePlan: "axial",
    signature: "water-hydrology-forum",
    landmarkPosition: [0, 0.32, -2.74],
    landmarkScale: [1.08, 1.02, 1.12],
    facadeDensity: 8
  },
  juice: {
    sitePlan: "linear",
    signature: "juice-press-house",
    landmarkPosition: [-2.78, 0.32, -2.26],
    landmarkRotation: 0.14,
    landmarkScale: [1.14, 0.96, 1.04],
    facadeDensity: 7
  },
  milk: {
    sitePlan: "courtyard",
    signature: "milk-dairy-campus",
    landmarkPosition: [-2.64, 0.32, -2.34],
    landmarkRotation: -0.08,
    landmarkScale: [1.14, 0.94, 1.08],
    facadeDensity: 7
  },
  "health-drinks": {
    sitePlan: "cloister",
    signature: "health-research-cloister",
    landmarkPosition: [0, 0.32, -2.58],
    landmarkScale: [1.06, 1.02, 1.08],
    facadeDensity: 8
  },
  protein: {
    sitePlan: "courtyard",
    signature: "protein-hydration-atrium",
    landmarkPosition: [-2.38, 0.32, -2.48],
    landmarkRotation: 0.1,
    landmarkScale: [1.08, 1.02, 1.06],
    facadeDensity: 7
  },
  "energy-drinks": {
    sitePlan: "industrial",
    signature: "energy-mixing-nave",
    landmarkPosition: [-2.62, 0.32, -2.32],
    landmarkRotation: -0.16,
    landmarkScale: [1.04, 1.14, 1.02],
    facadeDensity: 8
  },
  sodas: {
    sitePlan: "radial",
    signature: "soda-carbonation-forum",
    landmarkPosition: [0, 0.32, -2.62],
    landmarkScale: [1.08, 1.06, 1.08],
    facadeDensity: 8
  },
  fermented: {
    sitePlan: "village",
    signature: "fermented-culture-village",
    landmarkPosition: [0, 0.32, -2.46],
    landmarkRotation: -0.08,
    landmarkScale: [1.12, 1.08, 1.12],
    facadeDensity: 9
  },
  "regional-drinks": {
    sitePlan: "forum",
    signature: "regional-civic-forum",
    landmarkPosition: [0, 0.32, -2.68],
    landmarkRotation: 0.08,
    landmarkScale: [1.16, 0.98, 1.12],
    facadeDensity: 8
  }
};

const SITE_PLAN_LAYOUTS: Record<CampusSitePlan, Record<CampusModuleKey, CampusModulePlacement>> = {
  radial: {
    main: { position: [0, 1.45], rotation: 0 },
    process: { position: [-2.55, -0.6], rotation: 0.25 },
    conservatory: { position: [2.5, -0.28], rotation: -0.18 },
    tower: { position: [-1.72, 2.82], rotation: -0.1 },
    pavilion: { position: [1.82, 2.82], rotation: 0.1 },
    archive: { position: [-2.15, -2.48], rotation: -0.14 },
    gallery: { position: [2.18, -2.48], rotation: 0.14 }
  },
  terraced: {
    main: { position: [0.2, 1.92], rotation: -0.06, scale: [1.02, 1, 0.98] },
    process: { position: [-2.72, 0.12], rotation: 0.34, scale: [1.08, 1, 0.96] },
    conservatory: { position: [2.45, 0.58], rotation: -0.28, scale: [0.96, 1, 1.04] },
    tower: { position: [-1.56, 3.18], rotation: -0.18 },
    pavilion: { position: [2.02, 2.82], rotation: 0.16 },
    archive: { position: [-1.68, -2.3], rotation: 0.1 },
    gallery: { position: [2.42, -1.82], rotation: -0.18 }
  },
  axial: {
    main: { position: [0, 2.15], rotation: 0, scale: [1.04, 1, 0.94] },
    process: { position: [0, -0.92], rotation: 0, scale: [1.14, 1, 0.92] },
    conservatory: { position: [2.58, 0.48], rotation: -0.24 },
    tower: { position: [-2.46, 2.32], rotation: -0.08 },
    pavilion: { position: [2.45, 2.64], rotation: 0.08 },
    archive: { position: [-2.38, -1.74], rotation: 0.18 },
    gallery: { position: [2.36, -1.78], rotation: -0.18 }
  },
  linear: {
    main: { position: [-1.28, 1.68], rotation: 0.08, scale: [1.08, 1, 0.92] },
    process: { position: [-1.42, -0.62], rotation: 0.08, scale: [1.12, 1, 0.9] },
    conservatory: { position: [2.18, 0.86], rotation: -0.18, scale: [1.04, 1, 0.94] },
    tower: { position: [-3.05, 2.48], rotation: 0 },
    pavilion: { position: [2.78, 2.62], rotation: 0 },
    archive: { position: [-0.42, -2.52], rotation: -0.06 },
    gallery: { position: [2.4, -1.76], rotation: -0.12 }
  },
  courtyard: {
    main: { position: [0, 2.42], rotation: 0, scale: [1.04, 1, 0.96] },
    process: { position: [-2.56, 0.28], rotation: Math.PI / 2, scale: [0.98, 1, 1.04] },
    conservatory: { position: [2.56, 0.28], rotation: -Math.PI / 2, scale: [0.96, 1, 1.04] },
    tower: { position: [-2.35, 2.64], rotation: -0.12 },
    pavilion: { position: [2.35, 2.64], rotation: 0.12 },
    archive: { position: [-2.18, -2.08], rotation: 0.16 },
    gallery: { position: [2.18, -2.08], rotation: -0.16 }
  },
  cloister: {
    main: { position: [0, 2.32], rotation: 0, scale: [1.14, 0.94, 0.9] },
    process: { position: [-2.72, 0], rotation: Math.PI / 2, scale: [0.94, 0.9, 1.08] },
    conservatory: { position: [2.7, 0], rotation: -Math.PI / 2 },
    tower: { position: [-2.5, 2.62], rotation: 0 },
    pavilion: { position: [2.48, 2.64], rotation: 0 },
    archive: { position: [-2.42, -2.2], rotation: 0 },
    gallery: { position: [2.42, -2.2], rotation: 0 }
  },
  industrial: {
    main: { position: [0.74, 1.82], rotation: -0.08, scale: [0.94, 1.08, 1.02] },
    process: { position: [-1.85, 0.2], rotation: 0.18, scale: [1.18, 1.06, 1.04] },
    conservatory: { position: [2.62, -0.4], rotation: -0.1, scale: [0.9, 1, 0.96] },
    tower: { position: [-2.72, 2.58], rotation: 0 },
    pavilion: { position: [2.58, 2.68], rotation: 0.08 },
    archive: { position: [-2.78, -2.1], rotation: 0.08 },
    gallery: { position: [1.62, -2.48], rotation: -0.08, scale: [1.12, 1, 0.96] }
  },
  village: {
    main: { position: [-0.4, 1.78], rotation: -0.12, scale: [0.9, 1, 0.9] },
    process: { position: [-2.4, -0.02], rotation: 0.38, scale: [0.88, 0.94, 0.9] },
    conservatory: { position: [2.3, 0.3], rotation: -0.32, scale: [0.92, 1.04, 0.92] },
    tower: { position: [-2.24, 2.65], rotation: -0.12, scale: [0.86, 0.9, 0.86] },
    pavilion: { position: [2.2, 2.48], rotation: 0.16 },
    archive: { position: [-1.6, -2.34], rotation: 0.28, scale: [0.9, 0.96, 0.9] },
    gallery: { position: [2.18, -2.1], rotation: -0.25, scale: [0.9, 0.96, 0.9] }
  },
  forum: {
    main: { position: [0, 2.5], rotation: 0, scale: [1.1, 0.96, 0.94] },
    process: { position: [-2.65, 0.1], rotation: 0.52, scale: [0.96, 0.92, 0.96] },
    conservatory: { position: [2.65, 0.1], rotation: -0.52, scale: [0.96, 1, 0.96] },
    tower: { position: [-2.62, 2.62], rotation: -0.2 },
    pavilion: { position: [2.62, 2.62], rotation: 0.2 },
    archive: { position: [-2.35, -2.02], rotation: 0.32 },
    gallery: { position: [2.35, -2.02], rotation: -0.32 }
  }
};

const GUILD_FOLIAGE: Record<SipAcademyGuildId, [number, number]> = {
  cask: [0x2f5a39, 0x6f8b4e],
  steep: [0x356747, 0x78a65d],
  source: [0x4f7659, 0x8bbd73],
  energy: [0x4a694f, 0x9abd69],
  culture: [0x4d6040, 0x97855b]
};

const geometryCache = new Map<string, BufferGeometry>();
const materialCache = new Map<string, Material>();

function geometry<T extends BufferGeometry>(key: string, create: () => T): T {
  const cached = geometryCache.get(key) as T | undefined;
  if (cached) return cached;
  const next = create();
  next.userData.sipAcademyShared = true;
  geometryCache.set(key, next);
  return next;
}

function material<T extends Material>(key: string, create: () => T): T {
  const cached = materialCache.get(key) as T | undefined;
  if (cached) return cached;
  const next = create();
  next.userData.sipAcademyShared = true;
  materialCache.set(key, next);
  return next;
}

function campusMaterials(campus: SipAcademyCampus, config: CampusModelConfig): CampusMaterials {
  const accent = new Color(campus.accent);
  const accentKey = accent.getHexString();
  const [foliage, foliageLight] = GUILD_FOLIAGE[campus.guild];
  const brassColor = new Color(0xb38742).multiplyScalar(config.brassBias ?? 1);
  const glassColor = new Color(0x8bdbe0).lerp(accent, 0.12 * (config.glassBias ?? 1));

  return {
    limestone: material("limestone", () =>
      new MeshStandardMaterial({ color: 0xc7b997, roughness: 0.82, metalness: 0.04 })
    ),
    limestoneLight: material("limestone-light", () =>
      new MeshStandardMaterial({ color: 0xe0d4b9, roughness: 0.76, metalness: 0.03 })
    ),
    limestoneDark: material("limestone-dark", () =>
      new MeshStandardMaterial({ color: 0x80735d, roughness: 0.88, metalness: 0.04 })
    ),
    brass: material(`brass:${brassColor.getHexString()}`, () =>
      new MeshStandardMaterial({ color: brassColor, roughness: 0.3, metalness: 0.72 })
    ),
    brassDark: material("brass:aged-dark", () =>
      new MeshStandardMaterial({ color: 0x6e522d, roughness: 0.42, metalness: 0.68 })
    ),
    roof: material("roof:dark-teal", () =>
      new MeshStandardMaterial({ color: 0x0f3338, roughness: 0.38, metalness: 0.32 })
    ),
    roofLight: material("roof:patina-teal", () =>
      new MeshStandardMaterial({ color: 0x28585a, roughness: 0.46, metalness: 0.24 })
    ),
    glass: material(`glass:${accentKey}:${config.glassBias ?? 1}`, () =>
      new MeshPhysicalMaterial({
        color: glassColor,
        roughness: 0.12,
        metalness: 0.04,
        transmission: 0.16,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        thickness: 0.08,
        side: DoubleSide
      })
    ),
    glow: material(`glow:${accentKey}`, () =>
      new MeshStandardMaterial({
        color: new Color(0xd9f3e8).lerp(accent, 0.16),
        emissive: new Color(0x52cfe7).lerp(accent, 0.22),
        emissiveIntensity: 1.35,
        roughness: 0.26,
        metalness: 0.02
      })
    ),
    water: material("water:cyan", () =>
      new MeshPhysicalMaterial({
        color: 0x3fb8d3,
        emissive: 0x0a6078,
        emissiveIntensity: 0.62,
        roughness: 0.16,
        metalness: 0.08,
        transparent: true,
        opacity: 0.86,
        side: DoubleSide
      })
    ),
    accent: material(`accent:${accentKey}`, () =>
      new MeshStandardMaterial({ color: accent, roughness: 0.48, metalness: 0.2 })
    ),
    soil: material("terrain:soil", () =>
      new MeshStandardMaterial({ color: 0x4f3b2a, roughness: 0.96, metalness: 0 })
    ),
    foliage: material(`foliage:${foliage.toString(16)}`, () =>
      new MeshStandardMaterial({ color: foliage, roughness: 0.9, metalness: 0 })
    ),
    foliageLight: material(`foliage:${foliageLight.toString(16)}`, () =>
      new MeshStandardMaterial({ color: foliageLight, roughness: 0.88, metalness: 0 })
    ),
    path: material("path:warm-stone", () =>
      new MeshStandardMaterial({ color: 0x9f9174, roughness: 0.9, metalness: 0.02 })
    )
  };
}

function addMesh(
  parent: Group,
  name: string,
  meshGeometry: BufferGeometry,
  meshMaterial: Material,
  position: Vec3,
  scale: Vec3 = [1, 1, 1],
  rotation: Vec3 = [0, 0, 0]
): Mesh {
  const result = new Mesh(meshGeometry, meshMaterial);
  result.name = name;
  result.position.set(...position);
  result.scale.set(...scale);
  result.rotation.set(...rotation);
  result.castShadow = true;
  result.receiveShadow = true;
  parent.add(result);
  return result;
}

function addInstances(
  parent: Group,
  name: string,
  sourceGeometry: BufferGeometry,
  sourceMaterial: Material,
  transforms: Array<{ position: Vec3; scale?: Vec3; rotation?: Vec3 }>
): InstancedMesh {
  const instances = new InstancedMesh(sourceGeometry, sourceMaterial, transforms.length);
  const helper = new Object3D();
  transforms.forEach((transform, index) => {
    helper.position.set(...transform.position);
    helper.scale.set(...(transform.scale ?? [1, 1, 1]));
    helper.rotation.set(...(transform.rotation ?? [0, 0, 0]));
    helper.updateMatrix();
    instances.setMatrixAt(index, helper.matrix);
  });
  instances.instanceMatrix.needsUpdate = true;
  instances.name = name;
  instances.castShadow = true;
  instances.receiveShadow = true;
  parent.add(instances);
  return instances;
}

function upperDomeGeometry(segments: number): BufferGeometry {
  return geometry(`upper-dome:${segments}`, () =>
    new SphereGeometry(1, segments, Math.max(5, Math.floor(segments / 3)), 0, Math.PI * 2, 0, Math.PI / 2)
  );
}

function addBuildingPad(
  parent: Group,
  materials: CampusMaterials,
  name: string,
  position: Vec3,
  scale: Vec3,
  rotationY = 0
): void {
  addMesh(parent, `${name}-garden-pad`, geometry("box", () => new BoxGeometry(1, 1, 1)), materials.foliage, position, scale, [0, rotationY, 0]);
  addMesh(
    parent,
    `${name}-stone-court`,
    geometry("box", () => new BoxGeometry(1, 1, 1)),
    materials.path,
    [position[0], position[1] + 0.045, position[2]],
    [scale[0] * 0.84, 0.045, scale[2] * 0.84],
    [0, rotationY, 0]
  );
}

function addFacadeArches(
  parent: Group,
  materials: CampusMaterials,
  name: string,
  xs: number[],
  y: number,
  z: number,
  scale = 1
): void {
  addInstances(
    parent,
    `${name}-glowing-doorways`,
    geometry("window-box", () => new BoxGeometry(1, 1, 1)),
    materials.glow,
    xs.map((x) => ({ position: [x, y - 0.12 * scale, z] as Vec3, scale: [0.28 * scale, 0.44 * scale, 0.035] as Vec3 }))
  );
  addInstances(
    parent,
    `${name}-brass-arches`,
    geometry("facade-half-arch", () => new TorusGeometry(0.2, 0.026, 5, 12, Math.PI)),
    materials.brass,
    xs.map((x) => ({ position: [x, y + 0.1 * scale, z - 0.015] as Vec3, scale: [scale, scale, 1] as Vec3 }))
  );
  addInstances(
    parent,
    `${name}-stone-piers`,
    geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
    materials.limestoneLight,
    xs.flatMap((x) => [
      { position: [x - 0.23 * scale, y - 0.1 * scale, z - 0.02] as Vec3, scale: [0.035, 0.52 * scale, 0.035] as Vec3 },
      { position: [x + 0.23 * scale, y - 0.1 * scale, z - 0.02] as Vec3, scale: [0.035, 0.52 * scale, 0.035] as Vec3 }
    ])
  );
}

function addDomeRibs(
  parent: Group,
  materials: CampusMaterials,
  name: string,
  position: Vec3,
  scale: Vec3,
  count: number
): void {
  addInstances(
    parent,
    name,
    geometry("dome-half-rib", () => new TorusGeometry(1, 0.018, 4, 18, Math.PI)),
    materials.brass,
    Array.from({ length: count }, (_, index) => ({
      position,
      scale,
      rotation: [0, (index / count) * Math.PI, 0] as Vec3
    }))
  );
}

function addSteps(parent: Group, materials: CampusMaterials, name: string, z: number, width: number): void {
  addInstances(
    parent,
    name,
    geometry("box", () => new BoxGeometry(1, 1, 1)),
    materials.limestoneLight,
    [0, 1, 2].map((index) => ({
      position: [0, 0.08 + index * 0.05, z - index * 0.11] as Vec3,
      scale: [width - index * 0.12, 0.08, 0.28] as Vec3
    }))
  );
}

function applyModulePlacement(module: Group, key: CampusModuleKey, architecture: CampusArchitectureSpec): Group {
  const placement = SITE_PLAN_LAYOUTS[architecture.sitePlan][key];
  module.position.x = placement.position[0];
  module.position.z = placement.position[1];
  module.rotation.y = placement.rotation;
  if (placement.scale) {
    module.scale.multiply(new Vector3(...placement.scale));
  }
  return module;
}

type SignatureBuildingKind = "civic" | "process" | "warehouse" | "glasshouse" | "rotunda" | "tower" | "pavilion";
type SignatureRoofKind = "dome" | "vault" | "sawtooth" | "lantern" | "flat";

type SignatureBuildingSpec = {
  name: string;
  kind: SignatureBuildingKind;
  roof: SignatureRoofKind;
  position: Vec3;
  scale: Vec3;
  rotation?: number;
  bays?: number;
};

const SIGNATURE_BUILDINGS: Record<CampusSignature, SignatureBuildingSpec[]> = {
  "wine-cellar": [
    { name: "terraced-crush-house", kind: "process", roof: "sawtooth", position: [-0.84, 0, 0.52], scale: [1.04, 0.9, 0.92], rotation: 0.12, bays: 6 },
    { name: "sunken-barrel-cellar", kind: "warehouse", roof: "vault", position: [0.82, -0.08, -0.36], scale: [1.18, 0.72, 0.94], rotation: -0.12, bays: 5 },
    { name: "sensory-library", kind: "rotunda", roof: "dome", position: [0.88, 0, 0.88], scale: [0.66, 0.76, 0.66], bays: 6 }
  ],
  "beer-brewhouse": [
    { name: "clerestory-brewhouse", kind: "process", roof: "sawtooth", position: [-0.62, 0, 0.38], scale: [1.2, 1.05, 0.9], rotation: 0.06, bays: 7 },
    { name: "fermentation-bay", kind: "glasshouse", roof: "lantern", position: [0.94, 0, -0.28], scale: [0.82, 1.18, 0.88], rotation: -0.08, bays: 5 },
    { name: "taproom-loggia", kind: "pavilion", roof: "dome", position: [0.82, 0, 0.94], scale: [0.7, 0.78, 0.7], bays: 8 }
  ],
  "spirits-stillhouse": [
    { name: "copper-lit-stillhouse", kind: "civic", roof: "lantern", position: [-0.56, 0, 0.42], scale: [1.16, 1.18, 0.98], rotation: 0.08, bays: 8 },
    { name: "rectification-tower", kind: "tower", roof: "dome", position: [0.98, 0, 0.5], scale: [0.74, 1.5, 0.74], bays: 6 },
    { name: "bonded-rickhouse", kind: "warehouse", roof: "vault", position: [0.28, -0.04, -0.86], scale: [1.38, 0.82, 0.86], rotation: -0.06, bays: 8 },
    { name: "botanical-spirit-court", kind: "rotunda", roof: "dome", position: [-1.02, 0, -0.64], scale: [0.7, 0.84, 0.7], bays: 8 }
  ],
  "coffee-roastery": [
    { name: "stepped-wet-mill", kind: "process", roof: "sawtooth", position: [-0.78, 0, 0.42], scale: [1.08, 0.88, 0.88], rotation: 0.14, bays: 6 },
    { name: "brass-roofed-roastery", kind: "civic", roof: "lantern", position: [0.72, 0.08, -0.12], scale: [0.94, 1.12, 0.9], rotation: -0.12, bays: 6 },
    { name: "cafe-loggia", kind: "pavilion", roof: "flat", position: [0.8, 0, 0.92], scale: [0.78, 0.7, 0.72], bays: 9 }
  ],
  "tea-manufactory": [
    { name: "withering-loft", kind: "warehouse", roof: "sawtooth", position: [-0.58, 0.06, 0.42], scale: [1.42, 0.74, 0.8], rotation: 0.04, bays: 9 },
    { name: "rolling-and-firing-hall", kind: "process", roof: "vault", position: [0.5, 0, -0.64], scale: [1.18, 0.86, 0.82], rotation: -0.06, bays: 7 },
    { name: "infusion-rotunda", kind: "rotunda", roof: "dome", position: [0.92, 0, 0.82], scale: [0.68, 0.72, 0.68], bays: 8 }
  ],
  "kombucha-culture-house": [
    { name: "culture-conservatory", kind: "glasshouse", roof: "dome", position: [0, 0.05, 0.36], scale: [0.98, 1.05, 0.98], bays: 8 },
    { name: "ceramic-ferment-house-west", kind: "rotunda", roof: "lantern", position: [-0.92, 0, -0.4], scale: [0.62, 0.78, 0.62], bays: 6 },
    { name: "ceramic-ferment-house-east", kind: "rotunda", roof: "lantern", position: [0.92, 0, -0.4], scale: [0.62, 0.78, 0.62], bays: 6 },
    { name: "cold-cellar-wing", kind: "warehouse", roof: "vault", position: [0, -0.06, -1.02], scale: [1.2, 0.65, 0.72], bays: 6 }
  ],
  "water-hydrology-forum": [
    { name: "rain-catching-forum", kind: "civic", roof: "dome", position: [0, 0.08, 0.38], scale: [1.04, 1.08, 1.02], bays: 9 },
    { name: "filter-gallery-west", kind: "glasshouse", roof: "vault", position: [-1.02, 0, -0.52], scale: [0.74, 0.82, 0.84], rotation: 0.2, bays: 5 },
    { name: "filter-gallery-east", kind: "glasshouse", roof: "vault", position: [1.02, 0, -0.52], scale: [0.74, 0.82, 0.84], rotation: -0.2, bays: 5 },
    { name: "aquifer-observatory", kind: "tower", roof: "lantern", position: [0, 0, -1.12], scale: [0.62, 1.18, 0.62], bays: 6 }
  ],
  "juice-press-house": [
    { name: "daylit-press-hall", kind: "process", roof: "sawtooth", position: [-0.7, 0, 0.34], scale: [1.22, 0.84, 0.86], rotation: 0.1, bays: 8 },
    { name: "clarification-gallery", kind: "glasshouse", roof: "lantern", position: [0.82, 0, -0.22], scale: [0.88, 0.96, 0.84], rotation: -0.08, bays: 6 },
    { name: "chilled-packing-arcade", kind: "warehouse", roof: "flat", position: [0.06, -0.04, -0.94], scale: [1.34, 0.68, 0.7], bays: 8 }
  ],
  "milk-dairy-campus": [
    { name: "timber-receiving-hall", kind: "warehouse", roof: "vault", position: [-0.8, 0, 0.38], scale: [1.14, 0.76, 0.9], rotation: 0.1, bays: 7 },
    { name: "ceramic-process-hall", kind: "process", roof: "lantern", position: [0.7, 0, -0.2], scale: [1.02, 0.96, 0.88], rotation: -0.08, bays: 6 },
    { name: "quality-laboratory", kind: "glasshouse", roof: "flat", position: [0.76, 0, 0.82], scale: [0.76, 0.78, 0.72], bays: 5 },
    { name: "cold-chain-depot", kind: "warehouse", roof: "flat", position: [-0.1, -0.04, -1], scale: [1.24, 0.62, 0.68], bays: 7 }
  ],
  "health-research-cloister": [
    { name: "evidence-library", kind: "civic", roof: "dome", position: [0, 0.04, 0.46], scale: [0.94, 1, 0.92], bays: 8 },
    { name: "botanical-laboratory", kind: "glasshouse", roof: "lantern", position: [0.92, 0, -0.38], scale: [0.8, 0.9, 0.8], bays: 6 },
    { name: "stability-chambers", kind: "warehouse", roof: "flat", position: [-0.92, -0.04, -0.38], scale: [0.8, 0.68, 0.78], bays: 5 },
    { name: "claims-forum", kind: "pavilion", roof: "dome", position: [0, 0, -1.02], scale: [0.72, 0.7, 0.72], bays: 9 }
  ],
  "protein-hydration-atrium": [
    { name: "extraction-hall", kind: "process", roof: "sawtooth", position: [-0.82, 0, 0.38], scale: [1.06, 0.9, 0.86], rotation: 0.08, bays: 6 },
    { name: "hydration-atrium", kind: "glasshouse", roof: "dome", position: [0.7, 0.08, 0.18], scale: [0.9, 1.1, 0.9], bays: 8 },
    { name: "homogenization-hall", kind: "warehouse", roof: "lantern", position: [0.08, -0.02, -0.92], scale: [1.2, 0.74, 0.76], bays: 7 }
  ],
  "energy-mixing-nave": [
    { name: "luminous-mixing-nave", kind: "civic", roof: "lantern", position: [-0.42, 0.08, 0.34], scale: [1.12, 1.22, 0.94], rotation: 0.05, bays: 8 },
    { name: "quality-lantern-tower", kind: "tower", roof: "dome", position: [0.96, 0, 0.38], scale: [0.62, 1.42, 0.62], bays: 6 },
    { name: "canning-hall", kind: "process", roof: "sawtooth", position: [0.24, -0.02, -0.88], scale: [1.3, 0.78, 0.76], rotation: -0.04, bays: 8 }
  ],
  "soda-carbonation-forum": [
    { name: "carbonation-lantern", kind: "rotunda", roof: "lantern", position: [0, 0.12, 0.46], scale: [0.92, 1.18, 0.92], bays: 9 },
    { name: "flavor-gallery", kind: "glasshouse", roof: "vault", position: [-0.98, 0, -0.3], scale: [0.78, 0.82, 0.8], rotation: 0.16, bays: 5 },
    { name: "bottling-arcade", kind: "process", roof: "sawtooth", position: [0.98, 0, -0.3], scale: [0.82, 0.84, 0.82], rotation: -0.16, bays: 6 },
    { name: "fountain-court", kind: "pavilion", roof: "dome", position: [0, 0, -1.02], scale: [0.68, 0.66, 0.68], bays: 8 }
  ],
  "fermented-culture-village": [
    { name: "culture-archive", kind: "civic", roof: "dome", position: [0, 0.12, 0.52], scale: [0.9, 1.08, 0.9], bays: 8 },
    { name: "ferment-house-clay", kind: "rotunda", roof: "lantern", position: [-1.02, 0, -0.2], scale: [0.7, 0.86, 0.7], rotation: 0.24, bays: 6 },
    { name: "ferment-house-glass", kind: "glasshouse", roof: "dome", position: [1.02, 0.04, -0.12], scale: [0.74, 0.94, 0.74], rotation: -0.18, bays: 7 },
    { name: "ferment-house-stone", kind: "warehouse", roof: "vault", position: [-0.62, -0.04, -0.94], scale: [0.9, 0.7, 0.72], rotation: -0.16, bays: 5 },
    { name: "protected-safety-lab", kind: "glasshouse", roof: "lantern", position: [0.72, 0, -0.94], scale: [0.78, 0.8, 0.72], rotation: 0.16, bays: 5 }
  ],
  "regional-civic-forum": [
    { name: "oral-history-library", kind: "civic", roof: "dome", position: [0, 0.08, 0.54], scale: [0.96, 1.02, 0.92], bays: 9 },
    { name: "technique-workshops", kind: "warehouse", roof: "sawtooth", position: [-1.02, 0, -0.3], scale: [0.82, 0.76, 0.8], rotation: 0.22, bays: 6 },
    { name: "community-kitchens", kind: "glasshouse", roof: "lantern", position: [1.02, 0, -0.3], scale: [0.82, 0.84, 0.8], rotation: -0.22, bays: 6 },
    { name: "sensory-forum", kind: "pavilion", roof: "dome", position: [0, 0, -1.02], scale: [0.78, 0.72, 0.78], bays: 10 }
  ]
};

function createSignatureBuilding(
  materials: CampusMaterials,
  detail: CampusModelDetail,
  spec: SignatureBuildingSpec,
  facadeDensity: number
): Group {
  const group = new Group();
  group.name = `signature-${spec.name}`;
  group.position.set(...spec.position);
  group.rotation.y = spec.rotation ?? 0;
  group.scale.set(...spec.scale);
  const segments = detail === "high" ? 24 : 12;
  const bays = Math.max(3, Math.min(detail === "high" ? spec.bays ?? facadeDensity : 3, 10));

  if (spec.kind === "rotunda" || spec.kind === "tower" || spec.kind === "pavilion") {
    const radius = spec.kind === "tower" ? 0.48 : 0.72;
    const bodyHeight = spec.kind === "tower" ? 1.48 : spec.kind === "pavilion" ? 0.72 : 0.94;
    addMesh(group, `${spec.name}-podium`, geometry(`signature-round-podium:${segments}`, () => new CylinderGeometry(0.88, 0.98, 0.16, segments)), materials.limestoneDark, [0, 0.08, 0]);
    if (spec.kind === "pavilion") {
      const columnCount = detail === "high" ? Math.max(8, bays) : 6;
      addInstances(
        group,
        `${spec.name}-colonnade`,
        geometry("signature-column", () => new CylinderGeometry(1, 1, 1, 8)),
        materials.limestoneLight,
        Array.from({ length: columnCount }, (_, index) => {
          const angle = (index / columnCount) * Math.PI * 2;
          return { position: [Math.sin(angle) * 0.62, 0.5, Math.cos(angle) * 0.62] as Vec3, scale: [0.05, 0.68, 0.05] as Vec3 };
        })
      );
    } else {
      addMesh(group, `${spec.name}-round-body`, geometry(`signature-round-body:${segments}`, () => new CylinderGeometry(radius * 0.92, radius, bodyHeight, segments)), spec.kind === "tower" ? materials.limestone : materials.limestoneLight, [0, 0.18 + bodyHeight / 2, 0]);
      addInstances(
        group,
        `${spec.name}-round-windows`,
        geometry("signature-window", () => new BoxGeometry(1, 1, 1)),
        materials.glow,
        Array.from({ length: bays }, (_, index) => {
          const angle = (index / bays) * Math.PI * 2;
          return {
            position: [Math.sin(angle) * (radius + 0.008), 0.45 + bodyHeight * 0.34, Math.cos(angle) * (radius + 0.008)] as Vec3,
            scale: [0.14, spec.kind === "tower" ? 0.34 : 0.26, 0.028] as Vec3,
            rotation: [0, angle, 0] as Vec3
          };
        })
      );
    }
    addMesh(group, `${spec.name}-entablature`, geometry(`signature-round-cornice:${segments}`, () => new TorusGeometry(radius + 0.1, 0.055, 5, segments)), materials.brass, [0, bodyHeight + 0.22, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);
  } else {
    const low = spec.kind === "warehouse";
    const glass = spec.kind === "glasshouse";
    const bodyHeight = low ? 0.66 : 0.94;
    addMesh(group, `${spec.name}-podium`, geometry("signature-box", () => new BoxGeometry(1, 1, 1)), materials.limestoneDark, [0, 0.1, 0], [2.2, 0.16, 1.34]);
    addMesh(group, `${spec.name}-body`, geometry("signature-box", () => new BoxGeometry(1, 1, 1)), glass ? materials.glass : materials.limestone, [0, 0.2 + bodyHeight / 2, 0], [2, bodyHeight, 1.12]);
    addMesh(group, `${spec.name}-cornice`, geometry("signature-box", () => new BoxGeometry(1, 1, 1)), materials.brassDark, [0, bodyHeight + 0.24, 0], [2.14, 0.08, 1.24]);
    const xs = Array.from({ length: bays }, (_, index) => -0.82 + (index / Math.max(1, bays - 1)) * 1.64);
    addInstances(
      group,
      `${spec.name}-illuminated-bays`,
      geometry("signature-window", () => new BoxGeometry(1, 1, 1)),
      materials.glow,
      xs.map((x) => ({ position: [x, 0.55, -0.57] as Vec3, scale: [0.16, low ? 0.26 : 0.4, 0.025] as Vec3 }))
    );
    addInstances(
      group,
      `${spec.name}-facade-piers`,
      geometry("signature-column", () => new CylinderGeometry(1, 1, 1, 8)),
      glass ? materials.brass : materials.limestoneLight,
      xs.map((x) => ({ position: [x - 0.1, 0.54, -0.595] as Vec3, scale: [0.026, low ? 0.48 : 0.7, 0.026] as Vec3 }))
    );
  }

  const roofY = spec.kind === "tower" ? 1.72 : spec.kind === "warehouse" ? 0.91 : spec.kind === "pavilion" ? 0.96 : 1.18;
  switch (spec.roof) {
    case "dome":
      addMesh(group, `${spec.name}-dome`, upperDomeGeometry(segments), spec.kind === "glasshouse" ? materials.glass : materials.roof, [0, roofY, 0], spec.kind === "tower" ? [0.58, 0.38, 0.58] : [0.84, 0.46, 0.84]);
      addDomeRibs(group, materials, `${spec.name}-dome-ribs`, [0, roofY, 0], spec.kind === "tower" ? [0.59, 0.39, 0.59] : [0.85, 0.47, 0.85], detail === "high" ? 8 : 4);
      break;
    case "vault":
      addMesh(group, `${spec.name}-vault`, geometry(`signature-vault:${segments}`, () => new CylinderGeometry(0.56, 0.56, 2.04, segments, 1, false, 0, Math.PI)), materials.roofLight, [0, roofY, 0], [1, 1, 1], [0, 0, Math.PI / 2]);
      if (detail === "high") {
        addInstances(group, `${spec.name}-vault-ribs`, geometry("signature-vault-rib", () => new TorusGeometry(0.57, 0.022, 4, 14, Math.PI)), materials.brass, [-0.72, -0.24, 0.24, 0.72].map((x) => ({ position: [x, roofY, 0] as Vec3, rotation: [0, Math.PI / 2, Math.PI / 2] as Vec3 })));
      }
      break;
    case "sawtooth":
      addSawtoothClerestory(group, materials, `${spec.name}-clerestory`, [0, roofY + 0.06, 0], detail === "high" ? 6 : 3);
      break;
    case "lantern":
      addMesh(group, `${spec.name}-patina-roof`, geometry("signature-box", () => new BoxGeometry(1, 1, 1)), materials.roofLight, [0, roofY - 0.06, 0], [2.14, 0.12, 1.24]);
      addMesh(group, `${spec.name}-glass-lantern`, geometry(`signature-lantern:${segments}`, () => new CylinderGeometry(0.27, 0.34, 0.38, segments)), materials.glass, [0, roofY + 0.2, 0]);
      addMesh(group, `${spec.name}-lantern-cap`, upperDomeGeometry(segments), materials.roof, [0, roofY + 0.4, 0], [0.37, 0.22, 0.37]);
      break;
    case "flat":
      addMesh(group, `${spec.name}-terrace-roof`, geometry("signature-box", () => new BoxGeometry(1, 1, 1)), materials.roofLight, [0, roofY - 0.05, 0], [2.16, 0.12, 1.26]);
      addInstances(group, `${spec.name}-roof-balustrade`, geometry("signature-column", () => new CylinderGeometry(1, 1, 1, 8)), materials.brass, [-0.82, -0.42, 0, 0.42, 0.82].map((x) => ({ position: [x, roofY + 0.08, -0.54] as Vec3, scale: [0.025, 0.22, 0.025] as Vec3 })));
      break;
  }

  if (detail === "high") {
    addSteps(group, materials, `${spec.name}-entry-steps`, -0.82, spec.kind === "tower" || spec.kind === "rotunda" ? 0.8 : 1.2);
  }
  return group;
}

function createSignatureComplex(
  materials: CampusMaterials,
  detail: CampusModelDetail,
  architecture: CampusArchitectureSpec
): Group {
  const complex = new Group();
  complex.name = `campus-landmark-${architecture.signature}`;
  complex.position.set(...architecture.landmarkPosition);
  complex.rotation.y = architecture.landmarkRotation ?? 0;
  complex.scale.set(...(architecture.landmarkScale ?? [1, 1, 1]));
  const buildings = SIGNATURE_BUILDINGS[architecture.signature];
  const visibleBuildings = detail === "high" ? buildings : buildings.slice(0, Math.min(2, buildings.length));
  visibleBuildings.forEach((spec) => {
    complex.add(createSignatureBuilding(materials, detail, spec, architecture.facadeDensity));
  });

  if (detail === "high") {
    addMesh(
      complex,
      `${architecture.signature}-water-bridge`,
      geometry("signature-bridge-deck", () => new BoxGeometry(1, 1, 1)),
      materials.limestoneLight,
      [0, 0.36, 1.55],
      [0.72, 0.08, 0.24]
    );
    addInstances(
      complex,
      `${architecture.signature}-bridge-posts`,
      geometry("signature-bridge-post", () => new CylinderGeometry(1, 1, 1, 8)),
      materials.brassDark,
      [-0.58, -0.2, 0.2, 0.58].flatMap((x) => ([-1, 1] as const).map((side) => ({
        position: [x, 0.49, 1.55 + side * 0.19] as Vec3,
        scale: [0.018, 0.22, 0.018] as Vec3
      })))
    );
    addInstances(
      complex,
      `${architecture.signature}-courtyard-lamps`,
      geometry("signature-column", () => new CylinderGeometry(1, 1, 1, 8)),
      materials.brassDark,
      [-1.22, -0.62, 0, 0.62, 1.22].map((x, index) => ({
        position: [x, 0.52, 1.18 - Math.abs(index - 2) * 0.08] as Vec3,
        scale: [0.022, 0.46, 0.022] as Vec3
      }))
    );
    addInstances(
      complex,
      `${architecture.signature}-lamp-glow`,
      geometry("signature-lamp", () => new SphereGeometry(1, 8, 6)),
      materials.glow,
      [-1.22, -0.62, 0, 0.62, 1.22].map((x, index) => ({
        position: [x, 0.78, 1.18 - Math.abs(index - 2) * 0.08] as Vec3,
        scale: [0.05, 0.05, 0.05] as Vec3
      }))
    );
  }
  return complex;
}

function createFoundation(
  materials: CampusMaterials,
  detail: CampusModelDetail,
  architecture: CampusArchitectureSpec
): Group {
  const group = new Group();
  group.name = "campus-foundation";
  const radialSegments = detail === "high" ? 48 : 24;
  const layout = SITE_PLAN_LAYOUTS[architecture.sitePlan];

  const contours: Array<{ position: Vec3; scale: Vec3; rotation?: Vec3 }> = architecture.sitePlan === "axial"
    ? [
        { position: [0, 0.21, 0.3], scale: [2.5, 1, 3.4] },
        { position: [-2.35, 0.2, 0.15], scale: [1.55, 1, 2.45], rotation: [0, 0.12, 0] },
        { position: [2.35, 0.2, 0.15], scale: [1.55, 1, 2.45], rotation: [0, -0.12, 0] }
      ]
    : architecture.sitePlan === "linear" || architecture.sitePlan === "industrial"
      ? [
          { position: [0, 0.21, 0.4], scale: [3.55, 1, 2.35] },
          { position: [-1.85, 0.2, -2.4], scale: [2.15, 1, 1.45], rotation: [0, 0.1, 0] },
          { position: [2.15, 0.2, -2.25], scale: [1.8, 1, 1.55], rotation: [0, -0.14, 0] }
        ]
      : architecture.sitePlan === "village"
        ? [
            { position: [-0.45, 0.21, 0.75], scale: [2.35, 1, 2.2], rotation: [0, -0.12, 0] },
            { position: [-2.5, 0.2, -0.85], scale: [1.75, 1, 1.62], rotation: [0, 0.3, 0] },
            { position: [2.25, 0.2, -0.5], scale: [1.68, 1, 1.75], rotation: [0, -0.24, 0] },
            { position: [0.3, 0.19, -2.55], scale: [2.72, 1, 1.3], rotation: [0, 0.08, 0] }
          ]
        : architecture.sitePlan === "cloister" || architecture.sitePlan === "courtyard"
          ? [
              { position: [0, 0.21, 0.3], scale: [3.05, 1, 3.05] },
              { position: [0, 0.2, -2.55], scale: [2.7, 1, 1.38] },
              { position: [-2.62, 0.2, 0], scale: [1.42, 1, 2.25] },
              { position: [2.62, 0.2, 0], scale: [1.42, 1, 2.25] }
            ]
          : [
              { position: [0, 0.21, 0.7], scale: [2.85, 1, 2.55] },
              { position: [-2.45, 0.2, -0.68], scale: [2.15, 1, 1.65], rotation: [0, 0.24, 0] },
              { position: [2.35, 0.2, -0.45], scale: [1.88, 1, 1.82], rotation: [0, -0.16, 0] },
              { position: [0, 0.19, -2.55], scale: [3.25, 1, 1.35] }
            ];

  // The globe supplies the terrain. Small overlapping campus terraces keep the
  // architecture grounded without turning each academy into a circular island.
  addInstances(
    group,
    "contoured-campus-gardens",
    geometry(`garden-contour:${radialSegments}`, () => new CylinderGeometry(1, 1.04, 0.08, radialSegments)),
    materials.foliage,
    contours
  );

  const padScale: Record<CampusModuleKey, readonly [number, number]> = {
    main: [2.65, 2.15],
    process: [2.35, 1.75],
    conservatory: [1.86, 1.86],
    tower: [1.35, 1.35],
    pavilion: [1.48, 1.48],
    archive: [1.85, 1.35],
    gallery: [1.92, 1.35]
  };
  (["main", "process", "conservatory", "tower", "pavilion"] as CampusModuleKey[]).forEach((key) => {
    const placement = layout[key];
    const placementScale = placement.scale ?? [1, 1, 1];
    addBuildingPad(
      group,
      materials,
      key,
      [placement.position[0], 0.27, placement.position[1]],
      [padScale[key][0] * placementScale[0], 0.08, padScale[key][1] * placementScale[2]],
      placement.rotation
    );
  });
  const landmarkScale = architecture.landmarkScale ?? [1, 1, 1];
  addBuildingPad(
    group,
    materials,
    "signature-landmark",
    [architecture.landmarkPosition[0], 0.265, architecture.landmarkPosition[2]],
    [2.55 * landmarkScale[0], 0.075, 2.05 * landmarkScale[2]],
    architecture.landmarkRotation ?? 0
  );

  addMesh(
    group,
    "central-compass-plaza",
    geometry(`plaza:${radialSegments}`, () => new CylinderGeometry(1.18, 1.27, 0.13, radialSegments)),
    materials.limestoneLight,
    [0, 0.34, -0.55]
  );
  addMesh(
    group,
    "plaza-brass-meridian",
    geometry(`plaza-ring:${radialSegments}`, () => new TorusGeometry(0.86, 0.035, 5, radialSegments)),
    materials.brass,
    [0, 0.42, -0.55],
    [1, 1, 1],
    [Math.PI / 2, 0, 0]
  );
  addMesh(
    group,
    "campus-canal-arc-east",
    geometry(`canal-arc-east:${radialSegments}`, () => new TorusGeometry(3.5, 0.105, 6, radialSegments, Math.PI * 0.72)),
    materials.water,
    [0, 0.31, -0.05],
    [1, 1, 1],
    [Math.PI / 2, 0, -0.34]
  );
  addMesh(
    group,
    "campus-canal-arc-west",
    geometry(`canal-arc-west:${radialSegments}`, () => new TorusGeometry(3.1, 0.085, 6, radialSegments, Math.PI * 0.58)),
    materials.water,
    [0, 0.315, 0.12],
    [1, 1, 1],
    [Math.PI / 2, 0, Math.PI * 0.92]
  );

  const pathAngles = [-1.08, -0.38, 0.42, 1.06, 2.35].slice(0, detail === "high" ? 5 : 4);
  addInstances(
    group,
    "radial-stone-walks",
    geometry("path-unit", () => new BoxGeometry(1, 1, 1)),
    materials.limestone,
    pathAngles.map((angle) => ({
      position: [Math.sin(angle) * 1.9, 0.39, -0.55 + Math.cos(angle) * 1.9] as Vec3,
      scale: [0.18, 0.045, 1.06] as Vec3,
      rotation: [0, angle, 0] as Vec3
    }))
  );

  addInstances(
    group,
    "radial-water-rills",
    geometry("water-rill", () => new BoxGeometry(1, 1, 1)),
    materials.water,
    [-0.76, 0.76, 2.44].map((angle) => ({
      position: [Math.sin(angle) * 2.1, 0.405, -0.55 + Math.cos(angle) * 2.1] as Vec3,
      scale: [0.075, 0.018, 1.02] as Vec3,
      rotation: [0, angle, 0] as Vec3
    }))
  );

  return group;
}

function createMainHall(materials: CampusMaterials, config: CampusModelConfig, detail: CampusModelDetail): Group {
  const group = new Group();
  group.name = "module-main-hall";
  group.position.set(0, 0.3, 1.2);
  group.scale.set(...config.mainScale);
  const segments = detail === "high" ? 32 : 16;

  addMesh(group, "main-hall-limestone-body", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestone, [0, 0.55, 0], [2.15, 0.86, 1.36]);
  addMesh(group, "main-hall-raised-drum", geometry(`main-drum:${segments}`, () => new CylinderGeometry(0.77, 0.86, 0.48, segments)), materials.limestoneLight, [0, 1.08, 0]);
  addMesh(group, "main-hall-shallow-teal-dome", upperDomeGeometry(segments), materials.roof, [0, 1.31, 0], [0.8, 0.48, 0.8]);
  addMesh(group, "main-hall-glass-lantern", geometry(`main-lantern:${segments}`, () => new CylinderGeometry(0.18, 0.23, 0.32, segments)), materials.glass, [0, 1.72, 0]);
  addMesh(group, "main-hall-lantern-cap", upperDomeGeometry(segments), materials.roofLight, [0, 1.88, 0], [0.23, 0.15, 0.23]);
  addMesh(group, "main-hall-finial", geometry(`finial:${segments}`, () => new ConeGeometry(0.055, 0.28, segments)), materials.brass, [0, 2.14, 0]);
  addFacadeArches(group, materials, "main-hall", [-0.68, 0, 0.68], 0.64, -0.695, 1.03);
  addDomeRibs(group, materials, "main-hall-dome-ribs", [0, 1.31, 0], [0.81, 0.49, 0.81], detail === "high" ? 8 : 4);
  addSteps(group, materials, "main-hall-entry-steps", -0.97, 1.32);
  return group;
}

function createProcessHall(materials: CampusMaterials, config: CampusModelConfig, detail: CampusModelDetail): Group {
  const group = new Group();
  group.name = "module-process-hall";
  group.position.set(-2.48, 0.3, -0.7);
  group.rotation.y = 0.24;
  group.scale.set(...config.processScale);
  const segments = detail === "high" ? 24 : 12;

  addMesh(group, "process-hall-limestone-body", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestone, [0, 0.49, 0], [1.98, 0.74, 1.12]);
  addMesh(group, "process-hall-barrel-vault", geometry(`barrel-vault:${segments}`, () => new CylinderGeometry(0.56, 0.56, 2.02, segments, 1, false, 0, Math.PI)), materials.roofLight, [0, 0.87, 0], [1, 1, 1], [0, 0, Math.PI / 2]);
  addMesh(group, "process-hall-glass-front", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.glass, [0, 0.58, -0.575], [1.54, 0.6, 0.055]);
  addFacadeArches(group, materials, "process-hall", [-0.58, 0, 0.58], 0.6, -0.61, 0.8);
  addSteps(group, materials, "process-hall-entry-steps", -0.86, 1.2);
  if (detail === "high") {
    addInstances(
      group,
      "process-hall-vault-ribs",
      geometry("process-half-rib", () => new TorusGeometry(0.565, 0.024, 4, 16, Math.PI)),
      materials.brass,
      [-0.72, -0.24, 0.24, 0.72].map((x) => ({ position: [x, 0.88, 0] as Vec3, rotation: [0, Math.PI / 2, Math.PI / 2] as Vec3 }))
    );
  }
  return group;
}

function createConservatory(materials: CampusMaterials, detail: CampusModelDetail): Group {
  const group = new Group();
  group.name = "module-conservatory";
  group.position.set(2.4, 0.3, -0.28);
  const segments = detail === "high" ? 32 : 16;

  addMesh(group, "conservatory-stone-terrace", geometry(`conservatory-base:${segments}`, () => new CylinderGeometry(0.9, 1, 0.24, segments)), materials.limestone, [0, 0.14, 0]);
  addMesh(group, "conservatory-glass-drum", geometry(`conservatory-drum:${segments}`, () => new CylinderGeometry(0.72, 0.8, 0.66, segments)), materials.glass, [0, 0.58, 0]);
  addMesh(group, "conservatory-glass-dome", upperDomeGeometry(segments), materials.glass, [0, 0.92, 0], [0.74, 0.46, 0.74]);
  addMesh(group, "conservatory-left-wing", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.glass, [-0.98, 0.48, 0.12], [0.92, 0.62, 0.7], [0, -0.2, 0]);
  addMesh(group, "conservatory-right-wing", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.glass, [0.98, 0.48, 0.12], [0.92, 0.62, 0.7], [0, 0.2, 0]);
  addMesh(group, "conservatory-crown", geometry(`conservatory-ring:${segments}`, () => new TorusGeometry(0.74, 0.032, 5, segments)), materials.brass, [0, 0.89, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);
  addDomeRibs(group, materials, "conservatory-dome-ribs", [0, 0.92, 0], [0.75, 0.47, 0.75], detail === "high" ? 10 : 5);
  addInstances(
    group,
    "conservatory-wing-mullions",
    geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
    materials.brass,
    [-1.32, -1.02, -0.72, 0.72, 1.02, 1.32].map((x) => ({ position: [x, 0.5, -0.25] as Vec3, scale: [0.025, 0.64, 0.025] as Vec3 }))
  );
  addMesh(group, "conservatory-finial", geometry(`conservatory-finial:${segments}`, () => new ConeGeometry(0.05, 0.26, segments)), materials.brass, [0, 1.54, 0]);
  return group;
}

function createTower(materials: CampusMaterials, config: CampusModelConfig, detail: CampusModelDetail): Group {
  const group = new Group();
  group.name = "module-systems-tower";
  group.position.set(-1.56, 0.3, 2.78);
  const segments = detail === "high" ? 24 : 12;
  const height = config.towerHeight;

  addMesh(group, "tower-stepped-base", geometry(`tower-base:${segments}`, () => new CylinderGeometry(0.5, 0.6, 0.24, segments)), materials.limestoneDark, [0, 0.14, 0]);
  addMesh(group, "tower-stone-shaft", geometry(`tower-shaft:${segments}`, () => new CylinderGeometry(0.34, 0.44, 1, segments)), materials.limestone, [0, height * 0.52, 0], [1, height, 1]);
  addMesh(group, "tower-balcony", geometry(`tower-balcony:${segments}`, () => new TorusGeometry(0.43, 0.055, 6, segments)), materials.brassDark, [0, height + 0.08, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);
  addMesh(group, "tower-glass-lantern", geometry(`tower-lantern:${segments}`, () => new CylinderGeometry(0.29, 0.34, 0.4, segments)), materials.glass, [0, height + 0.32, 0]);
  addMesh(group, "tower-shallow-cap", upperDomeGeometry(segments), materials.roof, [0, height + 0.52, 0], [0.37, 0.23, 0.37]);
  addMesh(group, "tower-finial", geometry(`tower-finial:${segments}`, () => new ConeGeometry(0.045, 0.3, segments)), materials.brass, [0, height + 0.88, 0]);
  if (detail === "high") {
    addInstances(
      group,
      "tower-arched-windows",
      geometry("window-box", () => new BoxGeometry(1, 1, 1)),
      materials.glow,
      [0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => ({
        position: [Math.sin(angle) * 0.36, height * 0.56, Math.cos(angle) * 0.36] as Vec3,
        scale: [0.17, 0.32, 0.035] as Vec3,
        rotation: [0, angle, 0] as Vec3
      }))
    );
  }
  return group;
}

function createPavilion(materials: CampusMaterials, detail: CampusModelDetail): Group {
  const group = new Group();
  group.name = "module-learning-pavilion";
  group.position.set(1.72, 0.3, 2.78);
  const segments = detail === "high" ? 24 : 12;
  addMesh(group, "pavilion-stepped-floor", geometry(`pavilion-base:${segments}`, () => new CylinderGeometry(0.7, 0.82, 0.18, segments)), materials.limestoneLight, [0, 0.12, 0]);
  const columnCount = detail === "high" ? 10 : 6;
  addInstances(
    group,
    "pavilion-colonnade",
    geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
    materials.limestoneLight,
    Array.from({ length: columnCount }, (_, index) => {
      const angle = (index / columnCount) * Math.PI * 2;
      return { position: [Math.sin(angle) * 0.54, 0.56, Math.cos(angle) * 0.54] as Vec3, scale: [0.045, 0.72, 0.045] as Vec3 };
    })
  );
  addMesh(group, "pavilion-brass-entablature", geometry(`pavilion-ring:${segments}`, () => new TorusGeometry(0.62, 0.04, 5, segments)), materials.brass, [0, 0.94, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);
  addMesh(group, "pavilion-shallow-dome", upperDomeGeometry(segments), materials.roofLight, [0, 0.97, 0], [0.68, 0.36, 0.68]);
  addMesh(group, "pavilion-roof-lantern", geometry(`pavilion-lantern:${segments}`, () => new CylinderGeometry(0.13, 0.16, 0.24, segments)), materials.glass, [0, 1.32, 0]);
  addMesh(group, "pavilion-finial", geometry(`pavilion-finial:${segments}`, () => new ConeGeometry(0.045, 0.24, segments)), materials.brass, [0, 1.58, 0]);
  return group;
}

function createArchiveWing(materials: CampusMaterials, detail: CampusModelDetail): Group {
  const group = new Group();
  group.name = "module-archive-wing";
  group.position.set(-2.12, 0.3, -2.55);
  group.rotation.y = -0.12;
  const segments = detail === "high" ? 24 : 12;
  addMesh(group, "archive-limestone-library", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestone, [0, 0.48, 0], [1.64, 0.72, 1.02]);
  addMesh(group, "archive-raised-drum", geometry(`archive-drum:${segments}`, () => new CylinderGeometry(0.42, 0.49, 0.34, segments)), materials.limestoneLight, [0, 0.94, 0]);
  addMesh(group, "archive-teal-dome", upperDomeGeometry(segments), materials.roof, [0, 1.11, 0], [0.46, 0.29, 0.46]);
  addFacadeArches(group, materials, "archive", [-0.52, 0, 0.52], 0.52, -0.525, 0.76);
  addSteps(group, materials, "archive-entry-steps", -0.74, 1.04);
  return group;
}

function createServiceGallery(materials: CampusMaterials, detail: CampusModelDetail): Group {
  const group = new Group();
  group.name = "module-service-gallery";
  group.position.set(2.16, 0.3, -2.52);
  group.rotation.y = 0.12;
  addMesh(group, "gallery-stone-spine", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestone, [0, 0.4, 0.34], [1.74, 0.56, 0.34]);
  addMesh(group, "gallery-glass-hall", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.glass, [0, 0.58, -0.16], [1.62, 0.78, 0.68]);
  addMesh(group, "gallery-patina-roof", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.roofLight, [0, 1, -0.16], [1.82, 0.11, 0.82]);
  addFacadeArches(group, materials, "gallery", [-0.58, 0, 0.58], 0.58, -0.525, 0.76);
  addSteps(group, materials, "gallery-entry-steps", -0.73, 1.02);
  if (detail === "high") {
    addInstances(
      group,
      "gallery-roof-lanterns",
      geometry("gallery-lantern", () => new CylinderGeometry(0.1, 0.12, 0.22, 12)),
      materials.glass,
      [-0.56, 0, 0.56].map((x) => ({ position: [x, 1.16, -0.16] as Vec3 }))
    );
  }
  return group;
}

function addChimneyCluster(
  parent: Group,
  materials: CampusMaterials,
  name: string,
  positions: Array<{ x: number; z: number; height: number }>,
  copper = false
): void {
  const sourceMaterial = copper ? materials.brass : materials.limestoneDark;
  addInstances(
    parent,
    `${name}-shafts`,
    geometry("program-chimney-shaft", () => new CylinderGeometry(1, 1.12, 1, 12)),
    sourceMaterial,
    positions.map(({ x, z, height }) => ({ position: [x, 0.42 + height / 2, z] as Vec3, scale: [0.13, height, 0.13] as Vec3 }))
  );
  addInstances(
    parent,
    `${name}-caps`,
    geometry("program-chimney-cap", () => new TorusGeometry(1, 0.16, 5, 12)),
    materials.brass,
    positions.map(({ x, z, height }) => ({
      position: [x, 0.43 + height, z] as Vec3,
      scale: [0.14, 0.14, 0.14] as Vec3,
      rotation: [Math.PI / 2, 0, 0] as Vec3
    }))
  );
}

function addSawtoothClerestory(
  parent: Group,
  materials: CampusMaterials,
  name: string,
  origin: Vec3,
  count: number,
  rotationY = 0
): void {
  const roofs = Array.from({ length: count }, (_, index) => ({
    position: [origin[0] + (index - (count - 1) / 2) * 0.36, origin[1], origin[2]] as Vec3,
    scale: [0.27, 0.08, 0.68] as Vec3,
    rotation: [0, rotationY, -0.36] as Vec3
  }));
  addInstances(parent, `${name}-patina-folds`, geometry("box", () => new BoxGeometry(1, 1, 1)), materials.roofLight, roofs);
  addInstances(
    parent,
    `${name}-glass-clerestories`,
    geometry("box", () => new BoxGeometry(1, 1, 1)),
    materials.glass,
    roofs.map((roof) => ({
      position: [roof.position[0] + 0.11, roof.position[1] - 0.02, roof.position[2] - 0.04] as Vec3,
      scale: [0.045, 0.28, 0.58] as Vec3,
      rotation: [0, rotationY, 0] as Vec3
    }))
  );
}

function addAqueduct(
  parent: Group,
  materials: CampusMaterials,
  name: string,
  origin: Vec3,
  count: number
): void {
  const spacing = 0.42;
  const xs = Array.from({ length: count }, (_, index) => origin[0] + (index - (count - 1) / 2) * spacing);
  addInstances(
    parent,
    `${name}-piers`,
    geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
    materials.limestoneLight,
    xs.flatMap((x) => [
      { position: [x - 0.18, origin[1], origin[2]] as Vec3, scale: [0.045, 0.54, 0.045] as Vec3 },
      { position: [x + 0.18, origin[1], origin[2]] as Vec3, scale: [0.045, 0.54, 0.045] as Vec3 }
    ])
  );
  addInstances(
    parent,
    `${name}-arches`,
    geometry("aqueduct-half-arch", () => new TorusGeometry(0.18, 0.035, 5, 12, Math.PI)),
    materials.brassDark,
    xs.map((x) => ({ position: [x, origin[1] + 0.22, origin[2]] as Vec3 }))
  );
  addMesh(
    parent,
    `${name}-water-course`,
    geometry("box", () => new BoxGeometry(1, 1, 1)),
    materials.water,
    [origin[0], origin[1] + 0.47, origin[2]],
    [count * spacing, 0.05, 0.09]
  );
}

function addProgramArchitecture(
  campusId: SipAcademyCampusId,
  parent: Group,
  materials: CampusMaterials,
  detail: CampusModelDetail
): void {
  const program = new Group();
  program.name = `program-architecture-${campusId}`;
  parent.add(program);
  const segments = detail === "high" ? 20 : 10;

  switch (campusId) {
    case "wine": {
      addInstances(
        program,
        "wine-cellar-pergola",
        geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
        materials.brassDark,
        Array.from({ length: detail === "high" ? 10 : 6 }, (_, index) => ({
          position: [-3.75 + (index % 2) * 0.62, 0.72, -1.9 + Math.floor(index / 2) * 0.48] as Vec3,
          scale: [0.035, 0.66, 0.035] as Vec3
        }))
      );
      addMesh(program, "wine-sunken-cellar-vault", geometry(`wine-vault:${segments}`, () => new CylinderGeometry(0.42, 0.42, 1.36, segments, 1, false, 0, Math.PI)), materials.roof, [-3.42, 0.77, -1], [1, 1, 1], [0, 0, Math.PI / 2]);
      break;
    }
    case "beer": {
      addChimneyCluster(program, materials, "beer-malt-kilns", [
        { x: -3.5, z: 0.9, height: 1.35 },
        { x: -3.12, z: 1.02, height: 1.1 }
      ]);
      addMesh(program, "beer-copper-brewhouse-window", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.glass, [-3.32, 0.8, 0.16], [0.84, 0.72, 0.08]);
      break;
    }
    case "spirits": {
      addChimneyCluster(program, materials, "spirits-rectification-stack", [
        { x: -3.42, z: 0.72, height: 1.68 },
        { x: -3.12, z: 0.88, height: 1.22 },
        { x: -3.65, z: 1.08, height: 0.98 }
      ], true);
      addMesh(program, "spirits-bonded-warehouse", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestoneDark, [-3.4, 0.7, -1.1], [1.22, 0.72, 0.74]);
      break;
    }
    case "coffee": {
      addSawtoothClerestory(program, materials, "coffee-roastery", [-2.45, 1.64, -0.72], detail === "high" ? 5 : 3, 0.24);
      addChimneyCluster(program, materials, "coffee-roaster-flue", [{ x: -3.48, z: -0.28, height: 1.18 }]);
      break;
    }
    case "tea": {
      addInstances(
        program,
        "tea-garden-colonnade",
        geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
        materials.limestoneLight,
        Array.from({ length: detail === "high" ? 9 : 5 }, (_, index) => ({
          position: [-3.75 + index * 0.32, 0.66, 1.65] as Vec3,
          scale: [0.04, 0.58, 0.04] as Vec3
        }))
      );
      addMesh(program, "tea-shaded-study-roof", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.roofLight, [-2.47, 1.02, 1.65], [2.95, 0.1, 0.66]);
      break;
    }
    case "kombucha": {
      addInstances(
        program,
        "kombucha-culture-vessels",
        geometry("program-vessel", () => new CylinderGeometry(1, 1, 1, 14)),
        materials.glow,
        Array.from({ length: detail === "high" ? 7 : 4 }, (_, index) => ({
          position: [1.88 + (index % 3) * 0.38, 0.68, -1.43 + Math.floor(index / 3) * 0.42] as Vec3,
          scale: [0.11, 0.46 + (index % 2) * 0.08, 0.11] as Vec3
        }))
      );
      break;
    }
    case "water": {
      addAqueduct(program, materials, "water-filtration-arcade", [0, 0.72, -2.38], detail === "high" ? 9 : 5);
      const basinPositions = [
        [-0.62, 0.43, -1.72],
        [0, 0.5, -1.72],
        [0.62, 0.57, -1.72]
      ] as const;
      addInstances(
        program,
        "water-cascade-basin-rims",
        geometry(`water-basin-rim:${segments}`, () => new CylinderGeometry(1, 1.08, 0.12, segments)),
        materials.limestoneLight,
        basinPositions.map((position) => ({ position, scale: [0.34, 1, 0.34] as Vec3 }))
      );
      addInstances(
        program,
        "water-cascade-surfaces",
        geometry(`water-basin-surface:${segments}`, () => new CylinderGeometry(1, 1, 0.035, segments)),
        materials.water,
        basinPositions.map(([x, y, z]) => ({ position: [x, y + 0.08, z] as Vec3, scale: [0.26, 1, 0.26] as Vec3 }))
      );
      addMesh(program, "water-cascade-link", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.water, [0, 0.47, -1.44], [1.42, 0.025, 0.09]);
      break;
    }
    case "juice": {
      addSawtoothClerestory(program, materials, "juice-daylit-press-hall", [2.18, 1.33, -2.54], detail === "high" ? 5 : 3, 0.12);
      addInstances(
        program,
        "juice-receiving-canopy",
        geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
        materials.brassDark,
        [-3.96, -3.58, -3.2].map((x) => ({ position: [x, 0.66, 1.55] as Vec3, scale: [0.04, 0.62, 0.04] as Vec3 }))
      );
      break;
    }
    case "milk": {
      addInstances(
        program,
        "milk-utility-silos",
        geometry(`milk-silo:${segments}`, () => new CylinderGeometry(0.22, 0.25, 0.9, segments)),
        materials.limestoneLight,
        [-3.55, -3.05].map((x, index) => ({ position: [x, 0.86, 0.82 + index * 0.16] as Vec3 }))
      );
      addInstances(
        program,
        "milk-skylight-lanterns",
        upperDomeGeometry(segments),
        materials.glass,
        [-0.72, 0, 0.72].map((x) => ({ position: [x, 1.54, 1.18] as Vec3, scale: [0.18, 0.12, 0.18] as Vec3 }))
      );
      break;
    }
    case "health-drinks": {
      addInstances(
        program,
        "health-botanical-glass-wings",
        geometry("box", () => new BoxGeometry(1, 1, 1)),
        materials.glass,
        [0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => ({
          position: [2.4 + Math.sin(angle) * 1.08, 0.66, -0.28 + Math.cos(angle) * 1.08] as Vec3,
          scale: [0.44, 0.5, 0.9] as Vec3,
          rotation: [0, angle, 0] as Vec3
        }))
      );
      break;
    }
    case "protein": {
      addInstances(
        program,
        "protein-structural-fins",
        geometry("box", () => new BoxGeometry(1, 1, 1)),
        materials.brassDark,
        Array.from({ length: detail === "high" ? 8 : 4 }, (_, index) => ({
          position: [-1.0 + index * 0.28, 1.2, 1.86] as Vec3,
          scale: [0.035, 0.74, 0.18] as Vec3,
          rotation: [0, 0, -0.42 + (index % 2) * 0.84] as Vec3
        }))
      );
      break;
    }
    case "energy-drinks": {
      addInstances(
        program,
        "energy-kinetic-lantern-fins",
        geometry("box", () => new BoxGeometry(1, 1, 1)),
        materials.glass,
        Array.from({ length: detail === "high" ? 9 : 5 }, (_, index) => ({
          position: [-1.56, 1.52 + index * 0.08, 2.78] as Vec3,
          scale: [0.05, 0.5 + index * 0.04, 0.18] as Vec3,
          rotation: [0, (index / (detail === "high" ? 9 : 5)) * Math.PI * 2, -0.32] as Vec3
        }))
      );
      break;
    }
    case "sodas": {
      addInstances(
        program,
        "soda-carbonation-oculi",
        geometry("carbonation-oculus", () => new TorusGeometry(0.16, 0.028, 5, 12)),
        materials.brass,
        [-0.7, -0.35, 0, 0.35, 0.7].map((x) => ({ position: [x, 0.88, 0.49] as Vec3, rotation: [0, 0, 0] as Vec3 }))
      );
      addMesh(program, "soda-fountain-court", geometry(`soda-basin:${segments}`, () => new CylinderGeometry(0.48, 0.54, 0.12, segments)), materials.water, [3.45, 0.42, -2.62]);
      break;
    }
    case "fermented": {
      addMesh(program, "fermented-cellar-wing-left", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestoneDark, [-3.5, 0.68, 1.2], [0.62, 0.64, 1.5]);
      addMesh(program, "fermented-cellar-wing-right", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestoneDark, [3.5, 0.68, 1.2], [0.62, 0.64, 1.5]);
      addFacadeArches(program, materials, "fermented-cellars", [-3.7, -3.3, 3.3, 3.7], 0.68, 0.44, 0.66);
      break;
    }
    case "regional-drinks": {
      addInstances(
        program,
        "regional-forum-arcade",
        geometry("column", () => new CylinderGeometry(1, 1, 1, 8)),
        materials.limestoneLight,
        Array.from({ length: detail === "high" ? 12 : 7 }, (_, index) => {
          const angle = -1.1 + (index / (detail === "high" ? 11 : 6)) * 2.2;
          return { position: [Math.sin(angle) * 3.75, 0.68, -3.85 + Math.cos(angle) * 0.78] as Vec3, scale: [0.045, 0.58, 0.045] as Vec3 };
        })
      );
      addInstances(
        program,
        "regional-amphitheater-steps",
        geometry(`forum-step:${segments}`, () => new TorusGeometry(1, 0.08, 4, segments, Math.PI)),
        materials.path,
        [0, 1, 2].map((index) => ({ position: [0, 0.4 + index * 0.06, -3.72] as Vec3, scale: [0.78 + index * 0.24, 0.58, 0.6] as Vec3, rotation: [Math.PI / 2, 0, 0] as Vec3 }))
      );
      break;
    }
  }
}

function addPlantRows(parent: Group, materials: CampusMaterials, detail: CampusModelDetail, grove = false): void {
  const count = detail === "high" ? (grove ? 14 : 20) : grove ? 7 : 10;
  const trunks: Array<{ position: Vec3; scale: Vec3 }> = [];
  const canopies: Array<{ position: Vec3; scale: Vec3 }> = [];
  for (let index = 0; index < count; index += 1) {
    const row = index % (grove ? 3 : 4);
    const column = Math.floor(index / (grove ? 3 : 4));
    const x = -4.1 + row * 0.34;
    const z = -3.9 + column * (grove ? 0.72 : 0.52);
    const height = grove ? 0.42 : 0.22;
    trunks.push({ position: [x, 0.46 + height / 2, z], scale: [0.035, height, 0.035] });
    canopies.push({
      position: [x, 0.48 + height, z],
      scale: grove ? [0.22, 0.25, 0.22] : [0.19, 0.09, 0.3]
    });
  }
  addInstances(parent, "cultivation-trunks", geometry("column", () => new CylinderGeometry(1, 1, 1, 8)), materials.soil, trunks);
  addInstances(parent, "cultivation-canopies", geometry("foliage-sphere", () => new SphereGeometry(1, 8, 6)), materials.foliageLight, canopies);
}

function addTerraces(parent: Group, materials: CampusMaterials, detail: CampusModelDetail): void {
  const steps = detail === "high" ? 7 : 4;
  const transforms = Array.from({ length: steps }, (_, index) => ({
    position: [3.72, 0.4 + index * 0.045, -3.55 + index * 0.32] as Vec3,
    scale: [0.82 - index * 0.05, 0.05, 0.18] as Vec3,
    rotation: [0, -0.18, 0] as Vec3
  }));
  addInstances(parent, "cultivation-terraces", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.foliageLight, transforms);
}

function addTankYard(parent: Group, materials: CampusMaterials, detail: CampusModelDetail, copper = false): void {
  const count = detail === "high" ? 6 : 3;
  const transforms = Array.from({ length: count }, (_, index) => ({
    position: [3.55 + (index % 2) * 0.42, 0.7, -3.55 + Math.floor(index / 2) * 0.48] as Vec3,
    scale: [0.16, 0.54 + (index % 2) * 0.12, 0.16] as Vec3
  }));
  addInstances(parent, copper ? "copper-process-vessels" : "process-vessel-yard", geometry("column", () => new CylinderGeometry(1, 1, 1, 12)), copper ? materials.brass : materials.limestoneLight, transforms);
}

function addWaterChannels(parent: Group, materials: CampusMaterials, detail: CampusModelDetail): void {
  const channels = [
    { position: [-3.7, 0.45, -3.1] as Vec3, scale: [0.18, 0.025, 1.15] as Vec3, rotation: [0, 0.4, 0] as Vec3 },
    { position: [3.65, 0.45, 3.05] as Vec3, scale: [0.18, 0.025, 1.05] as Vec3, rotation: [0, 0.5, 0] as Vec3 }
  ];
  if (detail === "high") {
    channels.push({ position: [3.9, 0.45, -2.95], scale: [0.16, 0.025, 0.9], rotation: [0, -0.45, 0] });
  }
  addInstances(parent, "surface-water-channels", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.water, channels);
}

function addResearchGarden(parent: Group, materials: CampusMaterials, detail: CampusModelDetail, structured = false): void {
  const count = detail === "high" ? 15 : 8;
  const transforms = Array.from({ length: count }, (_, index) => {
    const row = index % 3;
    const column = Math.floor(index / 3);
    return {
      position: [3.25 + row * 0.28, 0.49, -3.72 + column * 0.35] as Vec3,
      scale: structured ? [0.17, 0.11, 0.17] as Vec3 : [0.15 + (index % 2) * 0.04, 0.18, 0.15] as Vec3
    };
  });
  addInstances(parent, structured ? "research-crop-plots" : "botanical-study-garden", geometry("foliage-sphere", () => new SphereGeometry(1, 8, 6)), structured ? materials.accent : materials.foliageLight, transforms);
}

function addKineticFins(parent: Group, materials: CampusMaterials, detail: CampusModelDetail): void {
  const count = detail === "high" ? 7 : 4;
  const transforms = Array.from({ length: count }, (_, index) => ({
    position: [3.2 + (index % 3) * 0.38, 0.75, -3.55 + Math.floor(index / 3) * 0.55] as Vec3,
    scale: [0.08, 0.72 + (index % 2) * 0.22, 0.22] as Vec3,
    rotation: [0, -0.35 + index * 0.12, -0.12] as Vec3
  }));
  addInstances(parent, "kinetic-research-fins", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.glass, transforms);
}

function addMarketCourt(parent: Group, materials: CampusMaterials, detail: CampusModelDetail): void {
  const count = detail === "high" ? 7 : 4;
  const stalls = Array.from({ length: count }, (_, index) => ({
    position: [2.85 + (index % 3) * 0.46, 0.58, -3.35 + Math.floor(index / 3) * 0.48] as Vec3,
    scale: [0.28, 0.28, 0.25] as Vec3,
    rotation: [0, (index % 3) * 0.14, 0] as Vec3
  }));
  addInstances(parent, "regional-market-stalls", geometry("box", () => new BoxGeometry(1, 1, 1)), materials.limestone, stalls);
  addInstances(
    parent,
    "regional-market-pavilion-roofs",
    upperDomeGeometry(detail === "high" ? 16 : 8),
    materials.roofLight,
    stalls.map(({ position, rotation }) => ({
      position: [position[0], position[1] + 0.16, position[2]] as Vec3,
      scale: [0.3, 0.14, 0.27] as Vec3,
      rotation
    }))
  );
}

function addCampusCue(
  parent: Group,
  config: CampusModelConfig,
  materials: CampusMaterials,
  detail: CampusModelDetail
): void {
  const cue = new Group();
  cue.name = `academy-cue-${config.cue}`;
  parent.add(cue);

  switch (config.cue) {
    case "vineyard":
      addPlantRows(cue, materials, detail, false);
      break;
    case "grain":
      addPlantRows(cue, materials, detail, false);
      addTankYard(cue, materials, detail, false);
      break;
    case "copper":
      addTankYard(cue, materials, detail, true);
      break;
    case "coffee-grove":
      addPlantRows(cue, materials, detail, true);
      break;
    case "tea-terraces":
      addTerraces(cue, materials, detail);
      break;
    case "culture":
    case "fermentation-yard":
      addResearchGarden(cue, materials, detail, false);
      addTankYard(cue, materials, detail, false);
      break;
    case "waterworks":
      addWaterChannels(cue, materials, detail);
      break;
    case "orchard":
      addPlantRows(cue, materials, detail, true);
      break;
    case "pasture":
      addResearchGarden(cue, materials, detail, true);
      break;
    case "botanical":
      addResearchGarden(cue, materials, detail, false);
      break;
    case "protein-plots":
      addResearchGarden(cue, materials, detail, true);
      break;
    case "kinetic":
      addKineticFins(cue, materials, detail);
      break;
    case "carbonation":
      addWaterChannels(cue, materials, detail);
      addTankYard(cue, materials, detail, false);
      break;
    case "market":
      addMarketCourt(cue, materials, detail);
      break;
  }
}

function resolveCampus(campus: SipAcademyCampus | SipAcademyCampusId): SipAcademyCampus {
  if (typeof campus !== "string") return campus;
  const resolved = SIP_ACADEMY_CAMPUSES.find((candidate) => candidate.id === campus);
  if (!resolved) throw new Error(`Unknown Sip Academy campus: ${campus}`);
  return resolved;
}

/**
 * Builds a physical SIP Academy campus. The returned group is centered on the
 * academy plaza, uses metres-as-arbitrary-units, and occupies about a 10-unit
 * diameter. Use `low` for the world view and `high` for close campus focus.
 */
export function createCampusModel(
  campusInput: SipAcademyCampus | SipAcademyCampusId,
  detail: CampusModelDetail = "high"
): Group {
  const campus = resolveCampus(campusInput);
  const config = CAMPUS_CONFIG[campus.id];
  const architectureSpec = CAMPUS_ARCHITECTURE[campus.id];
  const materials = campusMaterials(campus, config);
  const campusGroup = new Group();
  campusGroup.name = `sip-academy-campus-${campus.id}`;
  campusGroup.userData = {
    campusId: campus.id,
    guildId: campus.guild,
    detail,
    tangentReady: true,
    localUpAxis: [0, 1, 0],
    footprintRadius: 5.05,
    recommendedSurfaceOffset: 0.08,
    architecturalModules: detail === "high" ? 6 + SIGNATURE_BUILDINGS[architectureSpec.signature].length : 5,
    sitePlan: architectureSpec.sitePlan,
    signature: architectureSpec.signature
  };

  const sitePlan = new Group();
  sitePlan.name = "campus-site-plan";
  sitePlan.rotation.y = config.rotation;
  sitePlan.add(createFoundation(materials, detail, architectureSpec));
  const architecture = new Group();
  architecture.name = "campus-architecture";
  architecture.add(applyModulePlacement(createMainHall(materials, config, detail), "main", architectureSpec));
  architecture.add(applyModulePlacement(createProcessHall(materials, config, detail), "process", architectureSpec));
  architecture.add(applyModulePlacement(createConservatory(materials, detail), "conservatory", architectureSpec));
  architecture.add(applyModulePlacement(createTower(materials, config, detail), "tower", architectureSpec));
  architecture.add(applyModulePlacement(createPavilion(materials, detail), "pavilion", architectureSpec));
  if (detail === "high" && architectureSpec.sitePlan === "forum") {
    architecture.add(applyModulePlacement(createArchiveWing(materials, detail), "archive", architectureSpec));
    architecture.add(applyModulePlacement(createServiceGallery(materials, detail), "gallery", architectureSpec));
  }
  architecture.add(createSignatureComplex(materials, detail, architectureSpec));
  addProgramArchitecture(campus.id, architecture, materials, detail);
  sitePlan.add(architecture);
  addCampusCue(sitePlan, config, materials, detail);
  campusGroup.add(sitePlan);

  campusGroup.traverse((child) => {
    if (child instanceof Mesh || child instanceof InstancedMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return campusGroup;
}

/**
 * Places a Y-up campus tangent to a sphere. Keeping this helper here prevents
 * every globe implementation from subtly disagreeing about campus orientation.
 */
export function orientCampusToSphere(
  campusModel: Object3D,
  surfaceNormal: Vector3,
  surfaceRadius: number,
  surfaceOffset = Number(campusModel.userData.recommendedSurfaceOffset ?? 0.08)
): Object3D {
  const normal = surfaceNormal.clone().normalize();
  campusModel.position.copy(normal).multiplyScalar(surfaceRadius + surfaceOffset);
  campusModel.quaternion.copy(new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), normal));
  return campusModel;
}

/**
 * Detaches one campus instance. Shared factory geometry/materials remain cached
 * so the world can replace low-detail campuses with high-detail campuses without
 * reallocating the entire architectural kit.
 */
export function disposeCampusModel(campusModel: Object3D): void {
  campusModel.removeFromParent();
  campusModel.clear();
}

/**
 * Releases the shared GPU resources. Call only after every campus made by this
 * factory has been removed from its scene (for example, when disposing the map).
 */
export function disposeCampusModelFactoryResources(): void {
  geometryCache.forEach((entry) => entry.dispose());
  geometryCache.clear();
  materialCache.forEach((entry) => entry.dispose());
  materialCache.clear();
}

/** Exposed for deterministic tests and performance instrumentation. */
export function getCampusModelFactoryStats(): { geometries: number; materials: number } {
  return { geometries: geometryCache.size, materials: materialCache.size };
}
