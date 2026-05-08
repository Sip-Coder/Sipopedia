const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const root = process.cwd();
const outDir = path.join(root, "public", "game", "checkpoint-scenes");
const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (!arg.startsWith("--")) continue;
  const next = process.argv[i + 1];
  args.set(arg.slice(2), next && !next.startsWith("--") ? next : "true");
  if (next && !next.startsWith("--")) i += 1;
}

const resumeAfter = args.get("resume-after") || "";
const onlyOlderThan = args.get("only-older-than") ? new Date(args.get("only-older-than")) : null;
const concurrency = Math.max(1, Number(args.get("concurrency") || 1));
const dryRun = args.get("dry-run") === "true";

const allFiles = fs.readdirSync(outDir).filter((f) => f.endsWith(".png")).sort();
const files = allFiles.filter((filename) => {
  if (resumeAfter && filename.localeCompare(resumeAfter) <= 0) return false;
  if (onlyOlderThan) {
    const stat = fs.statSync(path.join(outDir, filename));
    if (stat.mtime >= onlyOlderThan) return false;
  }
  return true;
});

const levelTitle = {
  "raw-ingredients": "Raw Ingredient Quest",
  "equipment-lab": "Equipment Quest Lab",
  "fermentation-distillation": "Fermentation and Distillation",
  "aging-requirements": "Aging Requirements",
  "packaging-distribution": "Packaging and Distribution",
  "retail-training": "Retail Training",
  "restaurant-training": "Restaurant Training",
  "classic-food-pairings": "Classic Food Pairings"
};

const mainLeadRotation = ["Sippy", "Roma", "Hummin"];

const topicMap = {
  "vine-training": "vine training system design with trellis geometry, sunlight distribution, airflow, and labor access",
  "canopy": "canopy management via leaf pulling, shoot positioning, and crop load control to balance ripeness and disease risk",
  "harvest-pick": "harvest timing decisions based on sugar, acidity, flavor ripeness, weather pressure, and picking method",
  "barley-row": "barley selection for brewing based on protein, starch, enzymes, and extract potential",
  "hop-trellis": "hop trellis farming with bine growth, cone development, airflow, and harvest quality",
  "malt-check": "malt readiness checks after controlled germination and kilning for flavor and enzyme targets",
  "corn-crop": "corn crop quality for fermentable starch and clean distillate base",
  "rye-field": "rye field selection for spice-forward structure and mash behavior",
  "barley-malt": "malted barley contribution to enzymes, fermentability, and flavor in distillate bases",
  "crusher": "crusher-destemmer operation separating stems and opening berries before fermentation",
  "fermenter": "fermentation vessel monitoring for temperature, hygiene, extraction, and process control",
  "press": "wine press operation managing pressure and free-run versus press fractions",
  "mash-tun": "mash tun conversion control across temperature rests, pH, and lautering performance",
  "kettle": "brew kettle boiling for sterilization, bitterness extraction, and wort concentration",
  "conical": "conical fermenter workflow for yeast management, temperature control, and clarification",
  "pot-still": "pot still distillation with heat control, vapor rise, and copper contact",
  "spirit-safe": "spirit safe monitoring and cut-point decisions between heads, hearts, and tails",
  "yeast-activity": "yeast activity tracking during fermentation with aroma and stability indicators",
  "temperature-control": "temperature control to protect fermentation kinetics and flavor quality",
  "cap-management": "cap management in red fermentation for extraction and oxygen strategy",
  "yeast-pitch": "yeast pitching strategy using healthy cell count, oxygenation, and vitality",
  "ferment-temp": "fermentation temperature strategy to balance clean profile and expressive aroma",
  "conditioning": "conditioning phase to stabilize texture, carbonation, and flavor integration",
  "heat-vapor": "distillation heat and vapor control for efficient, clean separation",
  "cuts": "distillation cut decisions using sensory and proof markers",
  "condensation": "vapor condensation management through condenser flow and cooling precision",
  "oak-vessel": "oak vessel choice impacts on oxygen ingress, tannin, and aromatic development",
  "lees-contact": "lees contact management for texture and savory complexity",
  "cellar-climate": "cellar climate control for stable long-term maturation",
  "lagering": "lagering and cold maturation for smoothness and clarity",
  "wood-aging": "wood aging strategy for barrel-derived complexity without over-extraction",
  "carbonation": "carbonation conditioning for mousse, lift, and package readiness",
  "barrel-char": "barrel char and toast effects on maturation chemistry and flavor",
  "warehouse-climate": "warehouse climate impact on proof evolution and extraction rate",
  "maturation-time": "maturation time decisions balancing extraction, oxidation, and integration",
  "label-compliance": "label compliance checks for legal accuracy and shelf clarity",
  "closure-choice": "closure choice strategy to manage oxygen transfer and product stability",
  "case-shipping": "case shipping quality controls for breakage, temperature, and vibration risk",
  "keg-fill": "keg fill and purge controls to protect carbonation and freshness",
  "cold-chain": "cold chain handling preserving aroma and microbiological stability",
  "can-seam": "can seam integrity checks to prevent oxygen ingress and leakage",
  "proofing": "proofing precision to hit target ABV while retaining style character",
  "closure-finish": "spirit bottle closure and finish quality assurance",
  "case-control": "distilled spirits case-pack quality and transit protection",
  "customer-discovery": "customer discovery conversation for preference, occasion, and budget",
  "recommendation": "tailored recommendation flow based on style cues and food context",
  "shelf-logic": "shelf logic and merchandising that improves findability and trade-up clarity",
  "freshness-check": "freshness checks using package date, storage, and style sensitivity",
  "style-navigation": "style navigation translating shopper language to flavor structure",
  "merchandising": "beer merchandising by mission, format, and seasonal rotation",
  "category-navigation": "spirits category navigation by use case and flavor profile",
  "proof-language": "clear proof language linking strength to dilution and service",
  "responsible-selling": "responsible selling cues and policy-aligned guest support",
  "bottle-presentation": "bottle presentation sequence for confident table service",
  "glassware": "glassware choice matched to aroma delivery and style",
  "table-recommendation": "table recommendation logic balancing dish, preference, and budget",
  "draft-pour": "draft pour technique for foam quality and carbonation expression",
  "glass-care": "glass care standards protecting head retention and aroma clarity",
  "meal-match": "meal matching with intensity, carbonation, bitterness, and malt balance",
  "glass-ice": "spirits service with glass and ice choices controlling dilution",
  "cocktail-balance": "cocktail balance of spirit, acid, sugar, bitterness, and dilution",
  "responsible-service": "responsible service pacing with hospitality and guest safety",
  "acid-fat": "acid and fat pairing principle for palate refresh",
  "tannin-protein": "tannin and protein pairing principle for structure harmony",
  "sweet-spice": "sweetness and spice pairing principle for heat balance",
  "carbonation-cut": "carbonation cut pairing principle for fried and rich foods",
  "bitterness-fat": "bitterness and fat pairing principle for IPA-style matches",
  "roast-sweet": "roast and sweet pairing principle for dark beer pairings",
  "smoke-char": "smoke and char pairing principle for grilled flavors",
  "citrus-balance": "citrus balance pairing principle for brightness and lift",
  "dessert-spirit": "dessert spirit pairing principle for intensity and sweetness alignment"
};

function parseMeta(filename) {
  const base = filename.replace(/\.png$/i, "");
  if (base.endsWith("-aria-v1")) {
    const id = base.replace("-aria-v1", "").replace(/^winery-/, "");
    return { level: "raw-ingredients", facility: "winery", checkpoint: id };
  }
  const parts = base.split("-");
  const version = parts.pop();
  if (version !== "v2") throw new Error(`Unexpected filename pattern: ${filename}`);

  const facilityIdx = parts.findIndex((p) => p === "winery" || p === "brewery" || p === "distillery");
  const level = parts.slice(0, facilityIdx).join("-");
  const facility = parts[facilityIdx];
  const checkpoint = parts.slice(facilityIdx + 1).join("-");
  return { level, facility, checkpoint };
}

function assignCharacters(fileMetas) {
  const grouped = new Map();
  for (const meta of fileMetas) {
    const key = `${meta.level}|${meta.facility}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(meta);
  }
  for (const metas of grouped.values()) {
    metas.sort((a, b) => a.checkpoint.localeCompare(b.checkpoint));
    metas.forEach((m, i) => {
      m.character = mainLeadRotation[i % mainLeadRotation.length];
    });
  }
}

function buildPrompt(meta) {
  const topic = topicMap[meta.checkpoint] || meta.checkpoint.replace(/-/g, " ");
  const levelName = levelTitle[meta.level] || meta.level;
  return [
    `Cinematic educational game checkpoint illustration for ${levelName}.`,
    `Facility: ${meta.facility}.`,
    `Lead character: ${meta.character}.`,
    `Depict exactly this training concept: ${topic}.`,
    "Character is clearly visible and active in the scene as coach/operator, but environment and process details are equally prominent.",
    "Style: polished semi-realistic 3D game art, bright studio lighting, clean composition, no text overlays, no UI elements, no logos, no watermark.",
    "Frame for modal portrait usage, landscape orientation, high detail, grounded professional beverage-production context."
  ].join(" ");
}

async function main() {
  const metas = files.map((f) => ({ filename: f, ...parseMeta(f) }));
  assignCharacters(metas);
  console.log(`Selected ${metas.length} of ${allFiles.length} checkpoint scene files.`);
  if (resumeAfter) console.log(`Resume after: ${resumeAfter}`);
  if (onlyOlderThan) console.log(`Only older than: ${onlyOlderThan.toISOString()}`);
  console.log(`Concurrency: ${concurrency}`);

  if (dryRun) {
    metas.forEach((m, i) => console.log(`[${i + 1}/${metas.length}] ${m.filename} :: ${m.character}`));
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  let nextIndex = 0;
  async function worker() {
    while (nextIndex < metas.length) {
      const i = nextIndex;
      nextIndex += 1;
    const m = metas[i];
    const prompt = buildPrompt(m);
    process.stdout.write(`[${i + 1}/${metas.length}] ${m.filename} :: ${m.character} ... `);

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
      quality: "high"
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) {
      console.log("failed(no image)");
      continue;
    }

    const outPath = path.join(outDir, m.filename);
    fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
    console.log("ok");
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, metas.length) }, () => worker()));

  const manifestPath = path.join(root, "Checkpoint_Img", "checkpoint-regeneration-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(metas, null, 2));
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
