import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { breweryFieldTrip } from "../src/data/beyondTheGlassBrewery.ts";
import { journeyOfADrop } from "../src/data/beyondTheGlassChapters.ts";
import { coffeeFieldTrip } from "../src/data/beyondTheGlassCoffee.ts";
import { distilleryFieldTrip } from "../src/data/beyondTheGlassDistillery.ts";
import { energyFieldTrip } from "../src/data/beyondTheGlassEnergy.ts";
import { healthFieldTrip } from "../src/data/beyondTheGlassHealth.ts";
import { juiceFieldTrip } from "../src/data/beyondTheGlassJuice.ts";
import { kombuchaFieldTrip } from "../src/data/beyondTheGlassKombucha.ts";
import { milkFieldTrip } from "../src/data/beyondTheGlassMilk.ts";
import { sodasFieldTrip } from "../src/data/beyondTheGlassSodas.ts";
import { teaFieldTrip } from "../src/data/beyondTheGlassTea.ts";
import { waterFieldTrip } from "../src/data/beyondTheGlassWater.ts";

const trips = [
  journeyOfADrop,
  breweryFieldTrip,
  coffeeFieldTrip,
  distilleryFieldTrip,
  energyFieldTrip,
  healthFieldTrip,
  juiceFieldTrip,
  kombuchaFieldTrip,
  milkFieldTrip,
  sodasFieldTrip,
  teaFieldTrip,
  waterFieldTrip
];

const workspace = process.cwd();
const urlToPublicPath = (url) => path.join(workspace, "public", url.replace(/^\//, ""));
const srcsetUrls = (srcset) =>
  srcset
    ? srcset
        .split(",")
        .map((part) => part.trim().split(/\s+/)[0])
        .filter(Boolean)
    : [];

const sceneAssetUrls = (scene) =>
  [
    scene.artwork.src,
    scene.artwork.portraitSrc,
    ...srcsetUrls(scene.artwork.srcSet),
    ...srcsetUrls(scene.artwork.portraitSrcSet)
  ].filter(Boolean);

const gitAttrFilter = (url) => {
  try {
    const relative = url.replace(/^\//, "public/");
    const output = execFileSync("git", ["check-attr", "filter", "--", relative], {
      cwd: workspace,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    return output.split(":").pop()?.trim() ?? "unknown";
  } catch {
    return "unknown";
  }
};

const summarizeTrip = (trip) => {
  const artworkRefs = new Map();
  const missing = [];
  const lfsFiltered = [];
  const assetUrls = new Set();

  for (const scene of trip.scenes) {
    const artKey = scene.artwork.src;
    artworkRefs.set(artKey, [...(artworkRefs.get(artKey) ?? []), scene.id]);

    for (const url of sceneAssetUrls(scene)) {
      assetUrls.add(url);
      if (!fs.existsSync(urlToPublicPath(url))) {
        missing.push({ scene: scene.id, url });
        continue;
      }
      if (gitAttrFilter(url) === "lfs") lfsFiltered.push(url);
    }
  }

  const duplicateGroups = [...artworkRefs.entries()]
    .filter(([, scenes]) => scenes.length > 1)
    .map(([url, scenes]) => ({ scenes, url }));

  const uniqueAssetBytes = [...assetUrls].reduce((total, url) => {
    const filePath = urlToPublicPath(url);
    return fs.existsSync(filePath) ? total + fs.statSync(filePath).size : total;
  }, 0);

  return {
    duplicateGroups,
    lfsFiltered: [...new Set(lfsFiltered)],
    missing,
    sceneCount: trip.scenes.length,
    slug: trip.slug,
    uniqueAssetMb: Math.round((uniqueAssetBytes / 1024 / 1024) * 100) / 100
  };
};

const summaries = trips.map(summarizeTrip);
const duplicateSceneCount = summaries.reduce(
  (total, item) =>
    total + item.duplicateGroups.reduce((groupTotal, group) => groupTotal + group.scenes.length - 1, 0),
  0
);
const missingCount = summaries.reduce((total, item) => total + item.missing.length, 0);
const lfsCount = summaries.reduce((total, item) => total + item.lfsFiltered.length, 0);

for (const item of summaries) {
  console.log(`${item.slug}: ${item.sceneCount} scenes, ${item.uniqueAssetMb} MB referenced`);
  console.log(`  missing files: ${item.missing.length}`);
  console.log(`  LFS-filtered referenced files: ${item.lfsFiltered.length}`);
  console.log(`  duplicate art groups: ${item.duplicateGroups.length}`);
  for (const group of item.duplicateGroups) {
    console.log(`    ${group.scenes.length}x ${group.url}`);
    console.log(`      ${group.scenes.join(", ")}`);
  }
}

if (missingCount > 0 || duplicateSceneCount > 0) {
  console.error(
    `BTG imagery audit failed: ${missingCount} missing file(s), ${duplicateSceneCount} duplicate scene assignment(s).`
  );
  process.exitCode = 1;
} else {
  console.log(`BTG imagery audit passed. LFS-filtered referenced files: ${lfsCount}.`);
}
