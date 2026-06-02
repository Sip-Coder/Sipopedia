import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const queuePath = path.join(repoRoot, "review", "region-assets", "region-asset-queue.json");
const manifestPath = path.join(repoRoot, "src", "data", "regionAssetManifest.ts");

function publicFileExists(publicUrl) {
  if (!publicUrl || !publicUrl.startsWith("/")) return false;
  const filePath = path.join(repoRoot, "public", publicUrl.replace(/^\//, ""));
  return fs.existsSync(filePath);
}

function toPublicManifestEntry(item) {
  const imageUrl = publicFileExists(item.imagePath)
    ? item.imagePath
    : publicFileExists(item.currentImageUrl)
      ? item.currentImageUrl
      : null;
  const panoramaUrl = publicFileExists(item.panoramaPath)
    ? item.panoramaPath
    : publicFileExists(item.currentPanoramaUrl)
      ? item.currentPanoramaUrl
      : null;

  if (!imageUrl && !panoramaUrl) return null;

  return {
    key: item.key,
    kind: item.kind,
    imageUrl,
    panoramaUrl,
    status: imageUrl && panoramaUrl ? "generated" : "partial",
    prompt: item.imagePrompt,
    panoramaPrompt: item.panoramaPrompt
  };
}

function quote(value) {
  return JSON.stringify(value);
}

function renderManifest(entries) {
  const sorted = entries.sort((a, b) => a.key.localeCompare(b.key));
  const body = sorted
    .map((entry) => {
      const fields = [
        `kind: ${quote(entry.kind)}`,
        entry.imageUrl ? `imageUrl: ${quote(entry.imageUrl)}` : null,
        entry.panoramaUrl ? `panoramaUrl: ${quote(entry.panoramaUrl)}` : null,
        `status: ${quote(entry.status)}`,
        `prompt: ${quote(entry.prompt)}`,
        `panoramaPrompt: ${quote(entry.panoramaPrompt)}`
      ].filter(Boolean);

      return `  ${quote(entry.key)}: {\n    ${fields.join(",\n    ")}\n  }`;
    })
    .join(",\n");

  return `export type RegionAssetKind = "country" | "subregion";

export type RegionAssetStatus = "generated" | "partial";

export type RegionAssetManifestEntry = {
  kind: RegionAssetKind;
  imageUrl?: string;
  panoramaUrl?: string;
  status: RegionAssetStatus;
  prompt: string;
  panoramaPrompt: string;
};

export const regionAssetManifest: Record<string, RegionAssetManifestEntry> = {
${body}
};

export function regionAssetKey(category: string, countrySlug: string, subregionSlug?: string | null): string {
  return subregionSlug ? \`\${category}/\${countrySlug}/\${subregionSlug}\` : \`\${category}/\${countrySlug}\`;
}

export function getRegionAssetEntry(
  category: string,
  countrySlug: string,
  subregionSlug?: string | null
): RegionAssetManifestEntry | null {
  return regionAssetManifest[regionAssetKey(category, countrySlug, subregionSlug)] ?? null;
}
`;
}

if (!fs.existsSync(queuePath)) {
  throw new Error(`Asset queue not found. Run node scripts/export-region-asset-queue.mjs first: ${queuePath}`);
}

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8")).queue;
const entries = queue.map(toPublicManifestEntry).filter(Boolean);
fs.writeFileSync(manifestPath, renderManifest(entries));

console.log(`Synced ${entries.length} generated or partial asset manifest entries.`);
console.log(manifestPath);
