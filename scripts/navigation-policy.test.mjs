import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { isBossNavigationUser } from "../src/lib/adminAccess.ts";
import { WORKSPACE_NAV_ITEMS } from "../src/lib/workspaceNavigation.ts";
import { journeyOfADrop } from "../src/data/beyondTheGlassChapters.ts";
import { ATLAS_SCENE_DESIGNS } from "../src/features/beyond-the-glass/fieldAtlasDesigns.ts";

test("Boss navigation is limited to the Google-authenticated Sip Studies admin", () => {
  const cases = [
    {
      name: "exact admin email with Google as the primary provider",
      user: { email: "ADMIN@SIPSTUDIES.COM", app_metadata: { provider: "google" } },
      expected: true
    },
    {
      name: "exact admin email with Google in linked providers",
      user: { email: "admin@sipstudies.com", app_metadata: { provider: "email", providers: ["email", "google"] } },
      expected: true
    },
    {
      name: "exact admin email with a linked Google identity",
      user: { email: "admin@sipstudies.com", identities: [{ provider: "google" }] },
      expected: true
    },
    {
      name: "exact admin email through a non-Google login",
      user: { email: "admin@sipstudies.com", app_metadata: { provider: "email" } },
      expected: false
    },
    {
      name: "a different Google-authenticated account",
      user: { email: "student@example.com", app_metadata: { provider: "google" } },
      expected: false
    },
    {
      name: "an anonymous visitor",
      user: null,
      expected: false
    }
  ];

  for (const { name, user, expected } of cases) {
    assert.equal(isBossNavigationUser(user), expected, name);
  }
});

test("Beyond The Glass follows Sip Game and opens as a public Lobby experience", () => {
  const sipGameIndex = WORKSPACE_NAV_ITEMS.findIndex((item) => item.id === "sip-game");
  const beyondTheGlassIndex = WORKSPACE_NAV_ITEMS.findIndex((item) => item.id === "beyond-the-glass");
  const beyondTheGlass = WORKSPACE_NAV_ITEMS[beyondTheGlassIndex];

  assert.notEqual(sipGameIndex, -1);
  assert.equal(beyondTheGlassIndex, sipGameIndex + 1);
  assert.deepEqual(
    { route: beyondTheGlass?.route, defaultRoom: beyondTheGlass?.defaultRoom },
    { route: "app/beyond-the-glass", defaultRoom: "Lobby" }
  );
});

test("The From Rain to First Sip chapter data is complete and internally linked", () => {
  assert.equal(journeyOfADrop.scenes.length, 22);
  assert.equal(journeyOfADrop.scenes[0]?.range[0], 0);
  assert.equal(journeyOfADrop.scenes[journeyOfADrop.scenes.length - 1]?.range[1], 1);

  for (const [index, scene] of journeyOfADrop.scenes.entries()) {
    assert.equal(scene.number, String(index + 1).padStart(2, "0"));
    assert.ok(scene.range[1] > scene.range[0], `${scene.id} has a positive scroll range`);
    assert.ok(scene.fieldNotes.length > 0, `${scene.id} has at least one field note`);
    assert.ok(scene.narration.length > 0, `${scene.id} has at least one narration line`);
    assert.ok(scene.artwork.alt.length > 0, `${scene.id} has descriptive artwork text`);
    if (index > 0) {
      assert.equal(scene.range[0], journeyOfADrop.scenes[index - 1].range[1], `${scene.id} begins where the previous scene ends`);
    }
  }

  const sourceIds = journeyOfADrop.sources.map((source) => source.id);
  assert.equal(new Set(sourceIds).size, sourceIds.length);
  for (const source of journeyOfADrop.sources) {
    assert.match(source.url, /^https:\/\//, `${source.id} uses an HTTPS source`);
  }
});

test("Every substantive wine stop has a complete authored field atlas", async () => {
  const sharedAtlasScenes = journeyOfADrop.scenes.filter(
    (scene) => scene.id !== "academy-plaza" && scene.id !== "vine-and-berry"
  );

  assert.equal(sharedAtlasScenes.length, 20);
  assert.equal(
    sharedAtlasScenes.reduce((total, scene) => total + scene.fieldNotes.length, 0),
    81,
    "all 81 shared teaching nodes remain represented"
  );

  for (const scene of sharedAtlasScenes) {
    const design = ATLAS_SCENE_DESIGNS[scene.id];
    assert.ok(design, `${scene.id} has an authored field-atlas design`);
    assert.equal(
      design.nodes.length,
      scene.fieldNotes.length,
      `${scene.id} has one visual node per field note`
    );

    for (const [index, node] of design.nodes.entries()) {
      assert.ok(node.label.trim().length > 0, `${scene.id} node ${index + 1} has a visible label`);
      assert.ok(
        node.focus[0] >= 0 && node.focus[0] <= 100 && node.focus[1] >= 0 && node.focus[1] <= 100,
        `${scene.id} node ${index + 1} stays inside the normalized scene canvas`
      );
      if (node.art === "graphic") {
        assert.match(node.graphic ?? "", /^\/beyond-the-glass\//);
        const asset = await stat(resolve("public", (node.graphic ?? "").replace(/^\//, "")));
        assert.ok(asset.isFile() && asset.size > 5_000, `${node.graphic} is a hydrated visual asset`);
      }
    }
  }
});

test("The terminology fallback remains inside Replit's deployable source tree", async () => {
  const terminologySource = await readFile(
    new URL("../src/lib/terminology.ts", import.meta.url),
    "utf8"
  );
  const terminologyGeneratorSource = await readFile(
    new URL("../output/generate_misc_updates.cjs", import.meta.url),
    "utf8"
  );
  const fallbackSource = JSON.parse(
    await readFile(
      new URL("../src/data/terminologyCuratedV2Terms.json", import.meta.url),
      "utf8"
    )
  );

  assert.match(
    terminologySource,
    /from\s+["']\.\.\/data\/terminologyCuratedV2Terms\.json["']/
  );
  assert.doesNotMatch(
    terminologySource,
    /from\s+["'][^"']*(?:\.\.\/)+output\//
  );
  assert.match(
    terminologyGeneratorSource,
    /readFileSync\(["']src\/data\/terminologyCuratedV2Terms\.json["']/
  );
  assert.doesNotMatch(
    terminologyGeneratorSource,
    /readFileSync\(["']output\/terminology_curated_v2_terms\.json["']/
  );
  assert.ok(Array.isArray(fallbackSource));
  assert.ok(fallbackSource.length > 0);
});
