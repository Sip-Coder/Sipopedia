import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const repoRoot = process.cwd();
const outputDir = path.join(repoRoot, "review", "region-assets");
const outputJson = path.join(outputDir, "region-asset-queue.json");
const outputJsonl = path.join(outputDir, "region-asset-queue.jsonl");

const categories = ["wine", "beer", "spirits", "coffee", "tea", "kombucha", "juice", "milk", "water"];

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function loadTsDataModule(relativePath) {
  const filename = path.join(repoRoot, relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022
    },
    fileName: filename
  }).outputText;

  const module = { exports: {} };
  const context = {
    exports: module.exports,
    module,
    require(request) {
      throw new Error(`Unexpected runtime require in ${relativePath}: ${request}`);
    }
  };

  vm.runInNewContext(transpiled, context, { filename });
  return module.exports;
}

function publicAssetPath(category, countrySlug, assetSlug, suffix) {
  return `/region-assets/${category}/${countrySlug}/${assetSlug}-${suffix}.png`;
}

function panoramaPromptFrom(imagePrompt, name, countryName, category) {
  return [
    imagePrompt.replace("16:9 editorial study image", "2:1 equirectangular 360 panorama"),
    `Camera placed inside the source region for ${name}, ${countryName}.`,
    "Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer.",
    "Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  ].join(" ");
}

function countryPrompt(category, countryName, profile) {
  const commodity = category === "wine" ? "wine" : category;
  return [
    `Hyper-realistic documentary ${commodity} country study panorama for ${countryName}.`,
    profile?.winesOverview ?? `Show the leading ${commodity} source geography for ${countryName}.`,
    "Wide 16:9 editorial image, accurate source geography, visible regional landform, production/source cues, natural light, no text, no logos, no people posing."
  ].join(" ");
}

function countryPanoramaPrompt(category, countryName, profile) {
  const commodity = category === "wine" ? "wine" : category;
  return [
    `Hyper-realistic 2:1 equirectangular 360 ${commodity} country study panorama for ${countryName}.`,
    profile?.location ?? `Show the major ${commodity} source geography for ${countryName}.`,
    "Camera placed at a representative source landscape with seamless left-right horizon for an inside-sphere WebGL viewer.",
    "No text, no logos, no fantasy elements, no people posing."
  ].join(" ");
}

function addItem(queue, seen, item) {
  if (seen.has(item.key)) return;
  seen.add(item.key);
  queue.push(item);
}

const { countrySubregionGuides } = loadTsDataModule("src/data/regionSubpages.ts");
const { categoryCountryProfiles } = loadTsDataModule("src/data/categoryRegionProfiles.ts");

const queue = [];
const seen = new Set();

for (const category of categories) {
  const guideEntries = Object.entries(countrySubregionGuides[category] ?? {});
  for (const [countrySlug, guide] of guideEntries) {
    const firstSubregion = guide.subregions[0];
    addItem(queue, seen, {
      key: `${category}/${countrySlug}`,
      kind: "country",
      category,
      countrySlug,
      countryName: guide.countryName,
      regionSlug: null,
      regionName: null,
      priority: category === "wine" ? "high" : "medium",
      imagePath: publicAssetPath(category, countrySlug, "country", "image"),
      panoramaPath: publicAssetPath(category, countrySlug, "country", "360"),
      currentImageUrl: firstSubregion?.imageUrl ?? null,
      currentPanoramaUrl: firstSubregion?.panoramaScene?.imageSrc ?? null,
      imagePrompt: countryPrompt(category, guide.countryName, null),
      panoramaPrompt: countryPanoramaPrompt(category, guide.countryName, null),
      sourceLinks: Array.from(new Map(guide.subregions.flatMap((subregion) => subregion.sourceLinks).map((link) => [link.url, link])).values())
    });

    for (const subregion of guide.subregions) {
      addItem(queue, seen, {
        key: `${category}/${countrySlug}/${subregion.slug}`,
        kind: "subregion",
        category,
        countrySlug,
        countryName: guide.countryName,
        regionSlug: subregion.slug,
        regionName: subregion.name,
        priority: subregion.examWeight === "core" ? "high" : subregion.examWeight,
        imagePath: publicAssetPath(category, countrySlug, subregion.slug, "image"),
        panoramaPath: publicAssetPath(category, countrySlug, subregion.slug, "360"),
        currentImageUrl: subregion.imageUrl,
        currentPanoramaUrl: subregion.panoramaScene?.imageSrc ?? null,
        imagePrompt: subregion.imagePrompt,
        panoramaPrompt: panoramaPromptFrom(subregion.imagePrompt, subregion.name, guide.countryName, category),
        sourceLinks: subregion.sourceLinks
      });
    }
  }
}

for (const [category, countryProfiles] of Object.entries(categoryCountryProfiles)) {
  for (const [countrySlug, profile] of Object.entries(countryProfiles)) {
    const countryName = countrySlug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    addItem(queue, seen, {
      key: `${category}/${countrySlug}`,
      kind: "country",
      category,
      countrySlug,
      countryName,
      regionSlug: null,
      regionName: null,
      priority: category === "water" ? "high" : "medium",
      imagePath: publicAssetPath(category, countrySlug, "country", "image"),
      panoramaPath: publicAssetPath(category, countrySlug, "country", "360"),
      currentImageUrl: profile.countryImageUrl,
      currentPanoramaUrl: null,
      imagePrompt: countryPrompt(category, countryName, profile),
      panoramaPrompt: countryPanoramaPrompt(category, countryName, profile),
      sourceLinks: profile.resources
    });

    for (const region of profile.majorRegions) {
      const regionSlug = slugify(region.region);
      const imagePrompt = [
        `Hyper-realistic documentary ${category} source panorama for ${region.region}, ${countryName}: ${region.iconicVineyard}.`,
        "Accurate regional landform, production/source cues, natural light, no text, no logos, no fantasy elements, 16:9 editorial study image."
      ].join(" ");

      addItem(queue, seen, {
        key: `${category}/${countrySlug}/${regionSlug}`,
        kind: "subregion",
        category,
        countrySlug,
        countryName,
        regionSlug,
        regionName: region.region,
        priority: category === "water" ? "high" : "medium",
        imagePath: publicAssetPath(category, countrySlug, regionSlug, "image"),
        panoramaPath: publicAssetPath(category, countrySlug, regionSlug, "360"),
        currentImageUrl: region.imageUrl,
        currentPanoramaUrl: null,
        imagePrompt,
        panoramaPrompt: panoramaPromptFrom(imagePrompt, region.region, countryName, category),
        sourceLinks: profile.resources
      });
    }
  }
}

queue.sort((a, b) => {
  const priorityOrder = { high: 0, core: 0, medium: 1, low: 2 };
  return (
    (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1) ||
    a.category.localeCompare(b.category) ||
    a.countrySlug.localeCompare(b.countrySlug) ||
    String(a.regionSlug ?? "").localeCompare(String(b.regionSlug ?? ""))
  );
});

const summary = queue.reduce(
  (acc, item) => {
    acc.total += 1;
    acc.byCategory[item.category] = (acc.byCategory[item.category] ?? 0) + 1;
    acc.byKind[item.kind] = (acc.byKind[item.kind] ?? 0) + 1;
    return acc;
  },
  { total: 0, byCategory: {}, byKind: {} }
);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputJson, `${JSON.stringify({ generatedAt: new Date().toISOString(), summary, queue }, null, 2)}\n`);
fs.writeFileSync(outputJsonl, `${queue.map((item) => JSON.stringify(item)).join("\n")}\n`);

console.log(`Wrote ${queue.length} region asset requests.`);
console.log(outputJson);
console.log(outputJsonl);
