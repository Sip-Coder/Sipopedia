import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import {
  LEGACY_TERRAIN_TEXTURE_PATHS,
  TERRAIN_TEXTURE_PATHS,
  selectAdaptiveTerrainTextures,
  selectTerrainAnisotropy,
  selectTerrainTextureTier,
  terrainTextureCandidates
} from "../src/features/sip-academy-map/three/terrainTextures.ts";

const ONE_K = "1024x512";
const TWO_K = "2048x1024";
const FOUR_K = "4096x2048";

const STAGED_ALBEDO_ASSETS = [
  { tier: ONE_K, width: 1024, height: 512, minBytes: 100_000, maxBytes: 400_000 },
  { tier: TWO_K, width: 2048, height: 1024, minBytes: 500_000, maxBytes: 1_500_000 },
  { tier: FOUR_K, width: 4096, height: 2048, minBytes: 1_500_000, maxBytes: 4_000_000 }
];

function uint24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function parseWebpDimensions(buffer) {
  assert.equal(buffer.subarray(0, 4).toString("ascii"), "RIFF", "asset begins with RIFF");
  assert.equal(buffer.subarray(8, 12).toString("ascii"), "WEBP", "asset is a WebP container");

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunk = buffer.subarray(offset, offset + 4).toString("ascii");
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    assert.ok(dataOffset + chunkSize <= buffer.length, `${chunk} chunk fits inside the WebP container`);

    if (chunk === "VP8X") {
      assert.ok(chunkSize >= 10, "VP8X dimension chunk is complete");
      return {
        width: uint24LE(buffer, dataOffset + 4) + 1,
        height: uint24LE(buffer, dataOffset + 7) + 1
      };
    }

    if (chunk === "VP8 ") {
      assert.ok(chunkSize >= 10, "VP8 frame header is complete");
      assert.deepEqual(
        [...buffer.subarray(dataOffset + 3, dataOffset + 6)],
        [0x9d, 0x01, 0x2a],
        "VP8 frame sync code is valid"
      );
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff
      };
    }

    if (chunk === "VP8L") {
      assert.ok(chunkSize >= 5, "VP8L frame header is complete");
      assert.equal(buffer[dataOffset], 0x2f, "VP8L signature is valid");
      const byte1 = buffer[dataOffset + 1];
      const byte2 = buffer[dataOffset + 2];
      const byte3 = buffer[dataOffset + 3];
      const byte4 = buffer[dataOffset + 4];
      return {
        width: 1 + (((byte2 & 0x3f) << 8) | byte1),
        height: 1 + (((byte4 & 0x0f) << 10) | (byte3 << 2) | ((byte2 & 0xc0) >> 6))
      };
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  assert.fail("WebP does not contain a supported VP8/VP8L/VP8X dimension chunk");
}

test("terrain paths use the exact v2 albedo and existing height assets", () => {
  assert.deepEqual(TERRAIN_TEXTURE_PATHS, {
    albedo: {
      [ONE_K]: "/sip-academy-map/world/sip-academy-terrain-albedo-v2-1024x512.webp",
      [TWO_K]: "/sip-academy-map/world/sip-academy-terrain-albedo-v2-2048x1024.webp",
      [FOUR_K]: "/sip-academy-map/world/sip-academy-terrain-albedo-v2-4096x2048.webp"
    },
    height: {
      [ONE_K]: "/sip-academy-map/world/sip-academy-terrain-height-1024x512.webp",
      [TWO_K]: "/sip-academy-map/world/sip-academy-terrain-height-2048x1024.webp"
    }
  });
});

test("adaptive selector keeps compact, save-data, low-memory, and undersized surfaces on 1K", () => {
  const baseline = {
    isCompact: false,
    canvasCssWidth: 900,
    rendererPixelRatio: 1.65,
    maxTextureSize: 16_384,
    saveData: false,
    deviceMemoryGb: 8
  };

  assert.equal(selectTerrainTextureTier({ ...baseline, isCompact: true }), ONE_K);
  assert.equal(selectTerrainTextureTier({ ...baseline, saveData: true }), ONE_K);
  assert.equal(selectTerrainTextureTier({ ...baseline, deviceMemoryGb: 2 }), ONE_K);
  assert.equal(selectTerrainTextureTier({ ...baseline, canvasCssWidth: 500, rendererPixelRatio: 1.5 }), ONE_K);
  assert.equal(selectTerrainTextureTier({ ...baseline, maxTextureSize: 1024 }), ONE_K);
});

test("adaptive selector chooses 2K as the safe desktop default", () => {
  const baseline = {
    isCompact: false,
    canvasCssWidth: 700,
    rendererPixelRatio: 1.65,
    maxTextureSize: 4096,
    saveData: false
  };

  assert.equal(selectTerrainTextureTier(baseline), TWO_K, "projected width below 1800 stays 2K");
  assert.equal(
    selectTerrainTextureTier({ ...baseline, canvasCssWidth: 900, maxTextureSize: 2048 }),
    TWO_K,
    "renderer max texture size prevents a 4K request"
  );
  assert.equal(
    selectTerrainTextureTier({ ...baseline, canvasCssWidth: 900, deviceMemoryGb: 6 }),
    TWO_K,
    "mid-memory devices stay 2K"
  );
});

test("adaptive selector grants 4K only when the surface and renderer can use it", () => {
  const highDetail = {
    isCompact: false,
    canvasCssWidth: 1200,
    rendererPixelRatio: 1.65,
    maxTextureSize: 4096,
    saveData: false
  };

  assert.equal(selectTerrainTextureTier({ ...highDetail, deviceMemoryGb: 8 }), FOUR_K);
  assert.equal(selectTerrainTextureTier({ ...highDetail, deviceMemoryGb: null }), FOUR_K);
  assert.equal(selectTerrainTextureTier({ ...highDetail, deviceMemoryGb: undefined }), FOUR_K);
  assert.equal(selectTerrainTextureTier({ ...highDetail, maxTextureSize: 8192 }), FOUR_K);
});

test("fallback candidates descend without requesting a nonexistent 4K height map", () => {
  assert.deepEqual(terrainTextureCandidates("albedo", FOUR_K), [
    TERRAIN_TEXTURE_PATHS.albedo[FOUR_K],
    TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
    TERRAIN_TEXTURE_PATHS.albedo[ONE_K],
    LEGACY_TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
    LEGACY_TERRAIN_TEXTURE_PATHS.albedo[ONE_K]
  ]);
  assert.deepEqual(terrainTextureCandidates("albedo", TWO_K), [
    TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
    TERRAIN_TEXTURE_PATHS.albedo[ONE_K],
    LEGACY_TERRAIN_TEXTURE_PATHS.albedo[TWO_K],
    LEGACY_TERRAIN_TEXTURE_PATHS.albedo[ONE_K]
  ]);
  assert.deepEqual(terrainTextureCandidates("albedo", ONE_K), [
    TERRAIN_TEXTURE_PATHS.albedo[ONE_K],
    LEGACY_TERRAIN_TEXTURE_PATHS.albedo[ONE_K]
  ]);
  assert.deepEqual(terrainTextureCandidates("height", FOUR_K), [
    TERRAIN_TEXTURE_PATHS.height[TWO_K],
    TERRAIN_TEXTURE_PATHS.height[ONE_K]
  ]);
  assert.deepEqual(terrainTextureCandidates("height", TWO_K), [
    TERRAIN_TEXTURE_PATHS.height[TWO_K],
    TERRAIN_TEXTURE_PATHS.height[ONE_K]
  ]);
  assert.deepEqual(terrainTextureCandidates("height", ONE_K), [TERRAIN_TEXTURE_PATHS.height[ONE_K]]);
});

test("complete adaptive plan keeps height at its highest authored 2K tier", () => {
  const plan = selectAdaptiveTerrainTextures({
    isCompact: false,
    canvasCssWidth: 1200,
    rendererPixelRatio: 1.65,
    maxTextureSize: 8192,
    saveData: false,
    deviceMemoryGb: 16
  });

  assert.equal(plan.albedoTier, FOUR_K);
  assert.equal(plan.heightTier, TWO_K);
  assert.equal(plan.projectedCanvasWidth, 1980);
  assert.equal(plan.albedoCandidates.length, 5);
  assert.equal(plan.heightCandidates.length, 2);
});

test("anisotropy policy is clamped to renderer support and never drops below one", () => {
  assert.equal(selectTerrainAnisotropy("albedo", 0), 1);
  assert.equal(selectTerrainAnisotropy("albedo", 1), 1);
  assert.equal(selectTerrainAnisotropy("albedo", 4), 4);
  assert.equal(selectTerrainAnisotropy("albedo", 16), 8);
  assert.equal(selectTerrainAnisotropy("height", 0), 1);
  assert.equal(selectTerrainAnisotropy("height", 4), 4);
  assert.equal(selectTerrainAnisotropy("height", 16), 4);
});

for (const asset of STAGED_ALBEDO_ASSETS) {
  test(`staged ${asset.tier} v2 albedo is a valid, correctly sized WebP`, async () => {
    const publicPath = TERRAIN_TEXTURE_PATHS.albedo[asset.tier].replace(/^\//, "");
    const filePath = resolve("public", publicPath.replace(/^sip-academy-map\//, "sip-academy-map/"));
    const [details, bytes] = await Promise.all([stat(filePath), readFile(filePath)]);

    assert.ok(details.size >= asset.minBytes, `${asset.tier} contains real image data`);
    assert.ok(details.size <= asset.maxBytes, `${asset.tier} stays inside the transfer budget`);
    assert.doesNotMatch(bytes.subarray(0, 128).toString("utf8"), /git-lfs|oid sha256:/i, "asset is not an LFS pointer");
    assert.deepEqual(parseWebpDimensions(bytes), { width: asset.width, height: asset.height });
    assert.equal(asset.width / asset.height, 2, "texture is exactly equirectangular 2:1");
  });
}
