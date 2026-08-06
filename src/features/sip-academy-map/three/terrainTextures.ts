export const TERRAIN_TEXTURE_TIERS = ["1024x512", "2048x1024", "4096x2048"] as const;

export type TerrainTextureTier = (typeof TERRAIN_TEXTURE_TIERS)[number];
export type TerrainTextureKind = "albedo" | "height";

export type AdaptiveTerrainTextureInput = {
  /** True for the intentionally compact/mobile globe presentation. */
  isCompact: boolean;
  /** Width of the rendered globe host before renderer pixel ratio is applied. */
  canvasCssWidth: number;
  /** Pixel ratio actually used by WebGLRenderer, after the application cap. */
  rendererPixelRatio: number;
  /** WebGL MAX_TEXTURE_SIZE reported by the active renderer. */
  maxTextureSize: number;
  /** Browser save-data preference, when exposed. */
  saveData?: boolean;
  /** Navigator device-memory value in GiB, when exposed. */
  deviceMemoryGb?: number | null;
};

export type AdaptiveTerrainTextureSelection = {
  albedoTier: TerrainTextureTier;
  heightTier: Exclude<TerrainTextureTier, "4096x2048">;
  albedoCandidates: readonly string[];
  heightCandidates: readonly string[];
  projectedCanvasWidth: number;
};

export const TERRAIN_TEXTURE_PATHS = {
  albedo: {
    "1024x512": "/sip-academy-map/world/sip-academy-terrain-albedo-v2-1024x512.webp",
    "2048x1024": "/sip-academy-map/world/sip-academy-terrain-albedo-v2-2048x1024.webp",
    "4096x2048": "/sip-academy-map/world/sip-academy-terrain-albedo-v2-4096x2048.webp"
  },
  height: {
    "1024x512": "/sip-academy-map/world/sip-academy-terrain-height-1024x512.webp",
    "2048x1024": "/sip-academy-map/world/sip-academy-terrain-height-2048x1024.webp"
  }
} as const;

export const LEGACY_TERRAIN_TEXTURE_PATHS = {
  albedo: {
    "1024x512": "/sip-academy-map/world/sip-academy-terrain-albedo-1024x512.webp",
    "2048x1024": "/sip-academy-map/world/sip-academy-terrain-albedo-2048x1024.webp"
  }
} as const;

const ONE_K = "1024x512" as const;
const TWO_K = "2048x1024" as const;
const FOUR_K = "4096x2048" as const;

function finiteNonNegative(value: number, fallback: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : fallback;
}

/**
 * Select the highest terrain-albedo tier that is useful and safe for the
 * current render surface. The selector is intentionally pure so capability
 * and responsive behavior can be exhaustively tested without WebGL.
 */
export function selectTerrainTextureTier(input: AdaptiveTerrainTextureInput): TerrainTextureTier {
  const cssWidth = finiteNonNegative(input.canvasCssWidth, 0);
  const pixelRatio = Math.max(1, finiteNonNegative(input.rendererPixelRatio, 1));
  const projectedCanvasWidth = cssWidth * pixelRatio;
  const maxTextureSize = Math.max(0, Math.floor(finiteNonNegative(input.maxTextureSize, 0)));
  const hasMemoryReading = typeof input.deviceMemoryGb === "number" && Number.isFinite(input.deviceMemoryGb);
  const lowMemory = hasMemoryReading && (input.deviceMemoryGb as number) <= 2;

  if (
    input.isCompact
    || input.saveData === true
    || lowMemory
    || projectedCanvasWidth < 900
    || maxTextureSize < 2048
  ) {
    return ONE_K;
  }

  const enoughMemoryFor4K = !hasMemoryReading || (input.deviceMemoryGb as number) >= 8;
  if (maxTextureSize >= 4096 && projectedCanvasWidth >= 1800 && enoughMemoryFor4K) {
    return FOUR_K;
  }

  return TWO_K;
}

/** Return ordered request candidates, from the chosen tier to safe fallback. */
export function terrainTextureCandidates(
  kind: TerrainTextureKind,
  selectedTier: TerrainTextureTier
): readonly string[] {
  if (kind === "height") {
    return selectedTier === ONE_K
      ? [TERRAIN_TEXTURE_PATHS.height[ONE_K]]
      : [TERRAIN_TEXTURE_PATHS.height[TWO_K], TERRAIN_TEXTURE_PATHS.height[ONE_K]];
  }

  if (selectedTier === FOUR_K) {
    return [
      TERRAIN_TEXTURE_PATHS.albedo[FOUR_K],
      TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
      TERRAIN_TEXTURE_PATHS.albedo[ONE_K],
      LEGACY_TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
      LEGACY_TERRAIN_TEXTURE_PATHS.albedo[ONE_K]
    ];
  }
  if (selectedTier === TWO_K) {
    return [
      TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
      TERRAIN_TEXTURE_PATHS.albedo[ONE_K],
      LEGACY_TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
      LEGACY_TERRAIN_TEXTURE_PATHS.albedo[ONE_K]
    ];
  }
  return [TERRAIN_TEXTURE_PATHS.albedo[ONE_K], LEGACY_TERRAIN_TEXTURE_PATHS.albedo[ONE_K]];
}

/** Build the complete albedo/height request plan for one globe mount. */
export function selectAdaptiveTerrainTextures(
  input: AdaptiveTerrainTextureInput
): AdaptiveTerrainTextureSelection {
  const albedoTier = selectTerrainTextureTier(input);
  const heightTier = albedoTier === ONE_K ? ONE_K : TWO_K;
  const cssWidth = finiteNonNegative(input.canvasCssWidth, 0);
  const pixelRatio = Math.max(1, finiteNonNegative(input.rendererPixelRatio, 1));

  return {
    albedoTier,
    heightTier,
    albedoCandidates: terrainTextureCandidates("albedo", albedoTier),
    heightCandidates: terrainTextureCandidates("height", heightTier),
    projectedCanvasWidth: cssWidth * pixelRatio
  };
}

/** Clamp authored anisotropy policy to a renderer's real capability. */
export function selectTerrainAnisotropy(kind: TerrainTextureKind, maxAnisotropy: number): number {
  const supported = Math.max(1, Math.floor(finiteNonNegative(maxAnisotropy, 1)));
  return Math.min(kind === "albedo" ? 8 : 4, supported);
}
