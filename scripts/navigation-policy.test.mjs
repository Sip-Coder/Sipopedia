import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { isBossNavigationUser } from "../src/lib/adminAccess.ts";
import { WORKSPACE_NAV_ITEMS } from "../src/lib/workspaceNavigation.ts";
import { journeyOfADrop } from "../src/data/beyondTheGlassChapters.ts";

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

test("The Journey of a Drop chapter data is complete and internally linked", () => {
  assert.equal(journeyOfADrop.scenes.length, 8);
  assert.equal(journeyOfADrop.scenes[0]?.range[0], 0);
  assert.equal(journeyOfADrop.scenes[journeyOfADrop.scenes.length - 1]?.range[1], 1);

  for (const [index, scene] of journeyOfADrop.scenes.entries()) {
    assert.ok(scene.range[1] > scene.range[0], `${scene.id} has a positive scroll range`);
    if (index > 0) {
      assert.equal(scene.range[0], journeyOfADrop.scenes[index - 1].range[1], `${scene.id} begins where the previous scene ends`);
    }
  }

  const layerIds = journeyOfADrop.knowledgeLayers.map((layer) => layer.id);
  assert.equal(layerIds.length, 10);
  assert.equal(new Set(layerIds).size, 10);

  const sourceIds = new Set(journeyOfADrop.sources.map((source) => source.id));
  for (const layer of journeyOfADrop.knowledgeLayers) {
    assert.ok(layer.sourceIds.length > 0, `${layer.id} has at least one source`);
    for (const sourceId of layer.sourceIds) {
      assert.ok(sourceIds.has(sourceId), `${layer.id} source ${sourceId} resolves`);
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
