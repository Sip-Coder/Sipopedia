import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { isBossNavigationUser } from "../src/lib/adminAccess.ts";
import { WORKSPACE_NAV_ITEMS, workspaceLabelForRoute } from "../src/lib/workspaceNavigation.ts";
import { journeyOfADrop } from "../src/data/beyondTheGlassChapters.ts";
import { ATLAS_SCENE_DESIGNS } from "../src/features/beyond-the-glass/fieldAtlasDesigns.ts";
import {
  LIVING_PALATE_DISTRICTS,
  LIVING_PALATE_INTRO_ROUTE,
  LIVING_PALATE_MASTERY,
  LIVING_PALATE_PHASES,
  LIVING_PALATE_SAFETY,
  LIVING_PALATE_SOURCES,
  LIVING_PALATE_SPECIMENS
} from "../src/features/living-palate/livingPalateData.ts";

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
  assert.equal(workspaceLabelForRoute("app/btg"), "Beyond The Glass");
});

test("Sip Academy Map follows Sip Academy and opens as a public Lobby experience", () => {
  const sipAcademyIndex = WORKSPACE_NAV_ITEMS.findIndex((item) => item.id === "sip-academy");
  const academyMapIndex = WORKSPACE_NAV_ITEMS.findIndex((item) => item.id === "sip-academy-map");
  const academyMap = WORKSPACE_NAV_ITEMS[academyMapIndex];

  assert.notEqual(sipAcademyIndex, -1);
  assert.equal(academyMapIndex, sipAcademyIndex + 1);
  assert.deepEqual(
    { route: academyMap?.route, defaultRoom: academyMap?.defaultRoom },
    { route: "app/sip-academy-map", defaultRoom: "Lobby" }
  );
  assert.equal(workspaceLabelForRoute("app/academy-map"), "Sip Academy Map");
});

test("Living Palate follows Beyond The Glass and opens as a public Lobby experience", () => {
  const beyondTheGlassIndex = WORKSPACE_NAV_ITEMS.findIndex((item) => item.id === "beyond-the-glass");
  const livingPalateIndex = WORKSPACE_NAV_ITEMS.findIndex((item) => item.id === "living-palate");
  const livingPalate = WORKSPACE_NAV_ITEMS[livingPalateIndex];

  assert.notEqual(beyondTheGlassIndex, -1);
  assert.equal(livingPalateIndex, beyondTheGlassIndex + 1);
  assert.deepEqual(
    { route: livingPalate?.route, defaultRoom: livingPalate?.defaultRoom },
    { route: "app/living-palate", defaultRoom: "Lobby" }
  );
});

test("Living Palate campus districts and intro route remain complete and navigable", () => {
  assert.equal(LIVING_PALATE_DISTRICTS.length, 6);

  const districtIds = new Set(LIVING_PALATE_DISTRICTS.map((district) => district.id));
  assert.equal(districtIds.size, LIVING_PALATE_DISTRICTS.length, "campus district ids are unique");

  for (const district of LIVING_PALATE_DISTRICTS) {
    for (const [coordinate, value] of Object.entries({
      mapX: district.mapX,
      mapY: district.mapY,
      mapMobileX: district.mapMobileX,
      mapMobileY: district.mapMobileY
    })) {
      assert.ok(Number.isFinite(value), `${district.id} ${coordinate} is numeric`);
      assert.ok(value >= 0 && value <= 100, `${district.id} ${coordinate} stays inside the normalized campus map`);
    }
  }

  assert.equal(LIVING_PALATE_INTRO_ROUTE.length, 3);
  assert.equal(
    new Set(LIVING_PALATE_INTRO_ROUTE.map((stop) => stop.id)).size,
    LIVING_PALATE_INTRO_ROUTE.length,
    "intro route ids are unique"
  );
  assert.deepEqual(
    LIVING_PALATE_INTRO_ROUTE.map(({ id, label, districtId, stepIndex }) => ({ id, label, districtId, stepIndex })),
    [
      { id: "compare", label: "Compare", districtId: "contrast", stepIndex: 2 },
      { id: "serve", label: "Serve", districtId: "service", stepIndex: 4 },
      { id: "reflect", label: "Reflect", districtId: undefined, stepIndex: 5 }
    ]
  );

  for (const stop of LIVING_PALATE_INTRO_ROUTE) {
    if (stop.districtId) {
      assert.ok(districtIds.has(stop.districtId), `${stop.id} points to a real campus district`);
    }
  }
});

test("Living Palate ships a complete sourced cross-beverage learning loop", () => {
  assert.equal(LIVING_PALATE_PHASES.length, 6);
  assert.equal(LIVING_PALATE_SPECIMENS.length, 5);
  assert.equal(new Set(LIVING_PALATE_SPECIMENS.map((item) => item.domain)).size, 5);

  const phaseIds = new Set(LIVING_PALATE_PHASES.map((phase) => phase.id));
  assert.equal(phaseIds.size, LIVING_PALATE_PHASES.length);
  assert.deepEqual(
    LIVING_PALATE_MASTERY.map((node) => node.phaseId),
    LIVING_PALATE_PHASES.map((phase) => phase.id),
    "mastery nodes map one-to-one to the actual completed phases"
  );
  assert.ok(
    LIVING_PALATE_SAFETY.some((item) => item.includes("documented method and beverage matrix")),
    "cross-category TA comparison guardrail is explicit"
  );

  const sourceIds = new Set(LIVING_PALATE_SOURCES.map((source) => source.id));
  assert.equal(sourceIds.size, LIVING_PALATE_SOURCES.length);
  for (const source of LIVING_PALATE_SOURCES) {
    assert.match(source.url, /^https:\/\//, `${source.id} uses an HTTPS source`);
    assert.notEqual(source.year, "Current", `${source.id} records a concrete year or access date`);
  }
  for (const specimen of LIVING_PALATE_SPECIMENS) {
    assert.ok(specimen.dryLab.length > 0, `${specimen.id} has a documented dry-lab path`);
    assert.ok(specimen.scales.length >= 4, `${specimen.id} separates at least four sensory dimensions`);
    assert.ok(specimen.serviceChoices.some((choice) => choice.preferred), `${specimen.id} has a preferred hospitality response`);
    assert.ok(specimen.sourceIds.length > 0, `${specimen.id} exposes at least one teaching receipt`);
    for (const sourceId of specimen.sourceIds) {
      assert.ok(sourceIds.has(sourceId), `${specimen.id} references a registered source: ${sourceId}`);
    }
  }
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
      if (node.phoneFocus) {
        assert.ok(
          node.phoneFocus[0] >= 0 &&
            node.phoneFocus[0] <= 100 &&
            node.phoneFocus[1] >= 0 &&
            node.phoneFocus[1] <= 100,
          `${scene.id} node ${index + 1} stays inside the normalized phone canvas`
        );
      }
      if (node.art === "graphic") {
        assert.match(node.graphic ?? "", /^\/beyond-the-glass\//);
        const asset = await stat(resolve("public", (node.graphic ?? "").replace(/^\//, "")));
        assert.ok(asset.isFile() && asset.size > 5_000, `${node.graphic} is a hydrated visual asset`);
      }
    }
  }
});

test("Meet the Field Team guide nodes sit in the lower image band", () => {
  const guideNodes = ATLAS_SCENE_DESIGNS["guides-at-sunrise"].nodes;

  assert.deepEqual(
    guideNodes.map((node) => node.focus[1]),
    [70, 70, 70]
  );
  assert.deepEqual(
    guideNodes.map((node) => node.phoneFocus?.[1]),
    [70, 70, 70]
  );
});

test("The Vine Builds a Berry uses the shared field-atlas interaction contract", async () => {
  const [storyStageSource, vineAtlasSource] = await Promise.all([
    readFile(new URL("../src/features/beyond-the-glass/ScrollStoryStage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/features/beyond-the-glass/VineFieldAtlas.tsx", import.meta.url), "utf8")
  ]);

  assert.match(
    storyStageSource,
    /activeScene\.id === "vine-and-berry"[\s\S]*?<VineFieldAtlas\s+onSelect=\{selectVineNode\}\s*\/>/
  );
  assert.doesNotMatch(storyStageSource, /<VineAnatomyParallax\b/);
  assert.match(vineAtlasSource, /className="btg-field-atlas btg-field-atlas--vine"/);
  assert.match(vineAtlasSource, /className="btg-field-atlas__nodes btg-vine-atlas__nodes"/);
  assert.match(vineAtlasSource, /vineAnatomyParts\.map\(/);
  assert.match(vineAtlasSource, /aria-controls=\{DETAIL_ID\}/);
  assert.match(vineAtlasSource, /aria-pressed=\{isActive\}/);
  assert.match(vineAtlasSource, /onKeyDown=\{\(event\) => handleNodeKeyDown\(event, index\)\}/);
  assert.match(vineAtlasSource, /event\.key === "ArrowRight"/);
  assert.match(vineAtlasSource, /event\.key === "Escape"/);
});

test("Beyond the Glass keeps the journey dock navigation-only", async () => {
  const storyStageSource = await readFile(
    new URL("../src/features/beyond-the-glass/ScrollStoryStage.tsx", import.meta.url),
    "utf8"
  );

  assert.match(storyStageSource, /className="btg-dock-action btg-dock-action--back"/);
  assert.match(storyStageSource, /className="btg-dock-action btg-dock-action--continue"/);
  assert.doesNotMatch(storyStageSource, /<NarrationControls\b/);
  assert.doesNotMatch(storyStageSource, /btg-mobile-field-kit-toggle/);
  assert.doesNotMatch(storyStageSource, /className="btg-optional-audio"/);
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

test("Workspace command search keeps fallback terminology available on production lag", async () => {
  const terminologySource = await readFile(
    new URL("../src/lib/terminology.ts", import.meta.url),
    "utf8"
  );

  assert.match(terminologySource, /COMMAND_SEARCH_REMOTE_TIMEOUT_MS\s*=\s*2500/);
  assert.match(terminologySource, /const fallbackResults = searchFallbackTerminologyResults\(trimmedQuery, limit\)/);
  assert.match(terminologySource, /withFallbackTimeout<TerminologySearchResponse\[\]>/);
  assert.match(terminologySource, /Promise\.all\(\[exactRequest, prefixRequest, broadRequest\]\)/);
  assert.match(terminologySource, /const supplementalRows = fallbackResults\.filter/);
  assert.match(terminologySource, /\[\.\.\.rankedRows, \.\.\.supplementalRows\]\.slice\(0, limit\)/);
});
