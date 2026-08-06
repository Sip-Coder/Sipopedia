import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const rosterUrl = new URL("../src/data/avatarRoster.ts", import.meta.url);
const source = await readFile(fileURLToPath(rosterUrl), "utf8");

const expectedCategories = [
  "wine",
  "beer",
  "spirits",
  "coffee",
  "tea",
  "kombucha",
  "juice",
  "milk",
  "water",
  "energy-drinks",
  "protein-drinks",
  "soda"
];

const entryPattern = /\n  \{\n    id: "([^"]+)",\n    displayName: "([^"]+)",\n    categoryKey: "([^"]+)",\n    categoryLabel: "([^"]+)",\n    adultPresentation: "(woman|man)",\n    imagePath: "([^"]+)",\n    altText: "([^"]+)",\n    roleDescription: "([^"]+)",\n    designPatch: \{/g;
const entries = [...source.matchAll(entryPattern)].map((match) => ({
  id: match[1],
  displayName: match[2],
  categoryKey: match[3],
  categoryLabel: match[4],
  adultPresentation: match[5],
  imagePath: match[6],
  altText: match[7],
  roleDescription: match[8]
}));

assert.equal(entries.length, 24, "avatarRoster must contain exactly 24 literal presets");
assert.equal(new Set(entries.map((entry) => entry.id)).size, 24, "roster IDs must be unique");
assert.equal(new Set(entries.map((entry) => entry.displayName)).size, 24, "display names must be unique");

for (const categoryKey of expectedCategories) {
  const pair = entries.filter((entry) => entry.categoryKey === categoryKey);
  assert.equal(pair.length, 2, `${categoryKey} must have exactly two presets`);
  assert.deepEqual(
    pair.map((entry) => entry.adultPresentation).sort(),
    ["man", "woman"],
    `${categoryKey} must include one adult woman and one adult man`
  );

  for (const entry of pair) {
    assert.equal(
      entry.imagePath,
      `/avatar-roster/v2/${categoryKey}-${entry.adultPresentation}.webp`,
      `${entry.id} must use the stable v2 roster image path`
    );
    const imageUrl = new URL(`../public${entry.imagePath}`, import.meta.url);
    const imageStats = await stat(imageUrl).catch(() => null);
    assert.ok(imageStats?.isFile(), `${entry.id} image file is missing at ${entry.imagePath}`);
    assert.ok(imageStats.size > 10_000, `${entry.id} image file is unexpectedly small at ${entry.imagePath}`);
    assert.match(entry.altText, /^Adult (woman|man) /, `${entry.id} alt text must identify an adult character`);
    assert.ok(entry.roleDescription.length >= 40, `${entry.id} needs a useful short role description`);
  }
}

assert.deepEqual(
  [...new Set(entries.map((entry) => entry.categoryKey))].sort(),
  [...expectedCategories].sort(),
  "roster categories must match the required 12-category launch set"
);

console.log("avatar-roster.test: 24 adult presets, 12 category pairs, and all v2 image files validated");
