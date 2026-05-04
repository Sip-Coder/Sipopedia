const fs = require("fs");
const path = require("path");

const source = fs.readFileSync("src/data/grapes.ts", "utf8");
const rx = /slug: "([^"]+)",\s*\n\s*name: "([^"]+)",\s*\n\s*color: "([^"]+)"/g;
const grapes = [];
let match;
while ((match = rx.exec(source))) grapes.push({ slug: match[1], name: match[2], color: match[3] });

const redCues = {
  "cabernet-franc": "small blue-black berries, medium compact conical cluster, visible pale bloom, wiry green-brown stems, slightly looser than Cabernet Sauvignon",
  "cabernet-sauvignon": "small thick-skinned blue-black berries, tight compact shoulder cluster, heavy bloom, sturdy lignified stems",
  "carmenere": "dark blue-black berries with rounded shoulders, medium-loose cluster, ripe bloom, green-brown stems",
  "corvina": "dark red-black oval berries, looser elongated cluster, visible stems, moderate bloom",
  "gamay": "medium blue-purple berries, compact but not dense cluster, fresh bloom, lively red-purple highlights",
  "grenache": "large dark violet berries, fuller broad cluster, moderate bloom, warm ripe red-black highlights",
  "malbec": "inky blue-black berries, dense medium cluster, strong bloom, thick-skinned appearance",
  "merlot": "plump blue-black berries, medium compact cluster, soft bloom, rounded berry shape",
  "nebbiolo": "dusky blue-purple berries with subtle grey bloom, medium loose cluster, lighter red-violet highlights",
  "pinot-noir": "small thin-skinned dark purple berries, tight pinecone-shaped cluster, delicate bloom, compact form",
  "sangiovese": "dark ruby-purple berries, medium elongated cluster, moderate bloom, red-violet highlights",
  "syrah": "small dark blue-black berries, compact cylindrical cluster, heavy bloom, deep violet tone",
  "tempranillo": "dark blue-purple berries, medium compact bunch, visible bloom, balanced oval berries",
  "zinfandel": "uneven dark purple berries with subtle size variation, medium cluster, ripe bloom, a few raisined darker berries"
};

const whiteCues = {
  "albarino": "small pale yellow-green berries, compact cluster, translucent skins, fresh waxy bloom",
  "chardonnay": "golden green berries, compact cluster, round berries, subtle bloom and warm yellow highlights",
  "chenin-blanc": "green-gold berries, medium compact cluster, bright translucent skin, fresh bloom",
  "gewurztraminer": "pink-gold to light copper berries, compact aromatic cluster, subtle rosy blush, waxy bloom",
  "gruner-veltliner": "pale green berries, medium cluster, bright fresh translucence, light bloom",
  "pinot-gris-grigio": "grey-pink copper berries, compact cluster, dusky bloom, muted rose-gold skin tone",
  "riesling": "small green-gold berries, tight compact cluster, bright translucent skins, delicate bloom",
  "sauvignon-blanc": "small green berries, compact cluster, crisp pale green color, light bloom",
  "torrentes": "golden yellow-green berries, loose medium cluster, aromatic translucent skins, warm highlights",
  "viognier": "golden amber-green berries, medium compact cluster, ripe translucent skin, plush waxy bloom"
};

const angleLabels = [
  "front view, cluster facing the viewer, stem centered at top",
  "front-left quarter view, rotated 30 degrees clockwise around vertical axis",
  "left side view, rotated 60 degrees clockwise around vertical axis",
  "left-back quarter view, rotated 90 degrees clockwise around vertical axis",
  "back-left view, rotated 120 degrees clockwise around vertical axis",
  "back view, rear of the same style cluster, stem visible behind berries",
  "back-right view, rotated 180 degrees from the front sequence",
  "right-back quarter view, rotated 210 degrees around vertical axis",
  "right side view, rotated 240 degrees around vertical axis",
  "front-right quarter view, rotated 270 degrees around vertical axis",
  "near-front right view, rotated 300 degrees around vertical axis",
  "near-front view, rotated 330 degrees, returning toward the starting pose"
];

function grapeCue(grape) {
  return grape.color === "red" ? redCues[grape.slug] : whiteCues[grape.slug];
}

function basePrompt(grape, mode, angle) {
  const colorMode = grape.color === "red" ? "red wine grape" : "white wine grape";
  const cue = grapeCue(grape);
  const angleText = angle ? `Turntable angle: ${angle}.` : "Main reference pose: front-facing three-quarter macro view with the cluster centered.";
  return [
    "Use case: photorealistic-natural.",
    `Asset type: ${mode === "static" ? "Grape study main reference photo" : "Grape 360 turntable frame"}.`,
    `Primary request: A premium consistent macro studio photograph of a single ${grape.name} ${colorMode} cluster for a sommelier education website.`,
    `Varietal morphology target: ${cue}.`,
    angleText,
    "Subject: one intact grape cluster hanging from a short natural stem, full cluster visible, no cut-off berries, no cropped stem, no hands, no tools, no label.",
    "Design system: deep teal photographic studio background with a soft radial glow, subtle vineyard-leaf bokeh at the far edges only, premium Sip Studies educational look, consistent with existing dark teal UI.",
    "Composition/framing: square 1024x1024 crop, cluster centered, generous 18-24% empty margin around the full cluster for zoom/pan, stem near top center, cluster bottom fully visible, no hard floor line, no pedestal, no white horizontal line.",
    "Lighting: soft largebox front-left highlight, gentle rim light, realistic berry bloom and skin texture, natural stems, realistic shadows contained behind cluster.",
    "Consistency constraints: same scale across grape varieties, same teal background, same camera distance, same soft vignette, isolated single cluster, photorealistic, no text, no logos, no watermarks.",
    "Avoid: repeated top artifact, cropped bottom, cut-off sides, circular border, square border, floating platform line, extra clusters, loose individual grapes, glassware, wine bottle, cartoon, illustration, over-sharpened AI texture."
  ].join(" ");
}

const jobs = [];
for (const grape of grapes) {
  jobs.push({
    model: "gpt-image-1.5",
    prompt: basePrompt(grape, "static"),
    use_case: "photorealistic-natural",
    style: "consistent macro grape cluster photography, deep teal studio background, premium education asset",
    composition: "square crop, centered full cluster, generous margin, no crop",
    constraints: "single grape cluster, no text, no logo, no hands, no cropping, no platform line",
    size: "1024x1024",
    quality: "medium",
    out: `grapes/${grape.slug}-static.png`
  });

  angleLabels.forEach((angle, index) => {
    const frame = String(index + 1).padStart(2, "0");
    jobs.push({
      model: "gpt-image-1.5",
      prompt: basePrompt(grape, "turntable", angle),
      use_case: "photorealistic-natural",
      style: "consistent macro grape cluster turntable frame, deep teal studio background, premium education asset",
      composition: "square crop, centered full cluster, generous margin, turntable rotation angle",
      constraints: "single grape cluster, no text, no logo, no hands, no cropping, no platform line",
      size: "1024x1024",
      quality: "medium",
      out: `grapes/${grape.slug}-turntable-margin-${frame}.png`
    });
  });
}

const outPath = path.join("tmp", "imagegen", "grape-main-and-turntable-consistency-v1-gpt-image-1.5.jsonl");
fs.writeFileSync(outPath, jobs.map((job) => JSON.stringify(job)).join("\n") + "\n");
console.log(`Wrote ${jobs.length} jobs for ${grapes.length} grapes to ${outPath}`);
