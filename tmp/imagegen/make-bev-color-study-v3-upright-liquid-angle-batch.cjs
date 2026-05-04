const fs = require("fs");
const path = require("path");

const sourcePath = path.join("tmp", "imagegen", "bev-recipes-color-study-v2-gpt-image-1.5.jsonl");
const outPath = path.join("tmp", "imagegen", "bev-recipes-color-study-v3-upright-liquid-angle-gpt-image-1.5.jsonl");

const wineCues = {
  "left-bank-bordeaux": "deep ruby core with garnet rim, opaque center, high concentration",
  "right-bank-bordeaux": "medium-plus ruby core with soft garnet edge, plush but clear meniscus",
  "cote-de-rhone-rouge": "medium ruby with purple-red youthful edge and warm translucent rim",
  "cabernet-sauvignon": "deep ruby to purple-black core, narrow ruby rim, very strong concentration",
  "merlot": "medium-plus ruby with soft plum-garnet rim, moderate concentration",
  "pinot-noir": "pale to medium ruby, wide watery rim, transparent core and delicate color gradient",
  "syrah": "very deep purple-ruby core, blue-violet edge, nearly opaque concentration",
  "malbec": "inky purple core with violet rim, high pigment and dense concentration",
  "tempranillo": "medium ruby with brick-garnet rim, savory aged red wine tone",
  "sangiovese": "medium ruby with orange-garnet rim, transparent acidity-driven color",
  "white-bordeaux": "pale lemon to light straw, clear bright rim, light concentration",
  "cote-de-rhone-blanc": "medium lemon-gold, richer golden core, moderate concentration",
  "chardonnay": "medium gold with pale lemon rim, fuller viscosity and warm golden depth",
  "sauvignon-blanc": "very pale lemon-green, bright watery rim, light clear concentration",
  "riesling": "pale lemon with green-gold highlights, brilliant clarity and light concentration",
  "chenin-blanc": "pale to medium lemon-gold, honeyed core, bright transparent rim",
  "gewurztraminer": "medium gold with slight copper-pink glow, visibly richer concentration",
  "pinot-gris": "pale straw to light copper-gold, subtle blush rim, medium concentration",
  "viognier": "medium gold with apricot tint, plush viscous legs and moderate concentration",
  "albarino": "pale lemon-straw with green glints, saline brightness and clear rim"
};

const beerCues = {
  "pilsner": "very pale straw-gold, brilliant clarity, white foam trace",
  "helles": "pale gold, clear brilliant body, soft white foam trace",
  "marzen": "amber-orange copper, clear body, off-white foam trace",
  "vienna-lager": "reddish amber to copper, clear body, cream foam trace",
  "hefeweizen": "hazy pale gold, cloudy wheat opacity, white foam trace",
  "witbier": "hazy pale straw, cloudy white-gold body, delicate white foam trace",
  "saison": "bright golden to light amber, high clarity to slight haze, white foam trace",
  "porter": "deep brown with ruby highlights at the thin edge, tan foam trace",
  "stout": "near black core with brown ruby edge highlights, tan foam trace",
  "pale-ale": "medium gold to light amber, clear body, off-white foam trace",
  "india-pale-ale": "deep gold to amber, clear to lightly hazy body, white foam trace",
  "hazy-ipa": "opaque golden-orange haze, juicy turbidity, creamy white foam trace"
};

const displayNames = {
  "left-bank-bordeaux": "Left Bank Bordeaux Blend",
  "right-bank-bordeaux": "Right Bank Bordeaux Blend",
  "cote-de-rhone-rouge": "Cote de Rhone Rouge",
  "cabernet-sauvignon": "Cabernet Sauvignon",
  "merlot": "Merlot",
  "pinot-noir": "Pinot Noir",
  "syrah": "Syrah",
  "malbec": "Malbec",
  "tempranillo": "Tempranillo",
  "sangiovese": "Sangiovese",
  "white-bordeaux": "White Bordeaux Blend",
  "cote-de-rhone-blanc": "Cote de Rhone Blanc",
  "chardonnay": "Chardonnay",
  "sauvignon-blanc": "Sauvignon Blanc",
  "riesling": "Riesling",
  "chenin-blanc": "Chenin Blanc",
  "gewurztraminer": "Gewurztraminer",
  "pinot-gris": "Pinot Gris/Grigio",
  "viognier": "Viognier",
  "albarino": "Albarino",
  "pilsner": "Pilsner",
  "helles": "Helles",
  "marzen": "Marzen",
  "vienna-lager": "Vienna Lager",
  "hefeweizen": "Hefeweizen",
  "witbier": "Witbier",
  "saison": "Saison",
  "porter": "Porter",
  "stout": "Stout",
  "pale-ale": "Pale Ale",
  "india-pale-ale": "India Pale Ale",
  "hazy-ipa": "Hazy IPA"
};

const jobs = fs.readFileSync(sourcePath, "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line))
  .filter((job) => job.out.endsWith("-color.png"))
  .map((job) => {
    const id = job.out.split(/[\\/]/).pop().replace("-color.png", "");
    const kind = job.out.startsWith("beers/") ? "beer" : "wine";
    const name = displayNames[id] ?? id;
    const cues = kind === "beer" ? beerCues[id] : wineCues[id];
    const glass = kind === "beer" ? "appropriate clear beer tasting glass for the style" : "clear ISO-style wine tasting glass";
    const surface = kind === "beer" ? "foam ring and liquid surface" : "wine surface, rim, core, and meniscus";
    const prompt = [
      "Use case: photorealistic-natural.",
      `Asset type: Bev Recipes ${kind} color study replacement image.`,
      `Primary request: A clean examination-style color study photo of ${name}. The glass itself must stand upright and vertical, not leaning, not rotated, not diagonally tilted.`,
      `Subject: one transparent ${glass}, upright on a seamless white tasting-exam background. The beverage inside should appear recently swirled or gently angled so the ${surface} forms a diagonal sloped line across the bowl, like a professional color-of-wine study where the liquid is tilted but the glass remains upright.`,
      `Color target: ${cues}. The color must be visibly distinct from other ${kind} styles and educationally useful for blind tasting study.`,
      "Background: pure white examination card and white studio background, minimal soft contact shadow only, no decorative setting.",
      "Composition/framing: square crop, glass centered, full rim and bowl visible, enough white margin, camera at slight above-front angle looking into the glass so color depth and rim variation are visible.",
      "Lighting/mood: bright diffuse exam lighting, realistic reflections, crisp transparent glass, accurate liquid physics, visible color gradient from shallow edge to deeper core.",
      "Critical constraint: the glass stem and bowl are upright and vertical; only the liquid surface inside the glass is diagonally sloped from swirling. Do not make the whole glass lean at 45 degrees.",
      "Constraints: no readable text, no labels, no bottle, no logo, no hands, no people, no watermark, no chart, no illustration, no dark background.",
      "Avoid: diagonal glass, sideways glass, spilling beverage, impossible liquid physics, multiple glasses, opaque glass, colored backdrop, clutter, excessive glare, cropped rim, cropped base."
    ].join(" ");

    return {
      model: "gpt-image-1.5",
      prompt,
      use_case: "photorealistic-natural",
      style: "exam-style beverage color study photography on a white background, upright glass with sloped liquid surface",
      composition: "square crop, upright single glass, diagonal liquid surface, full rim visible, generous white margin",
      constraints: "upright glass, white background, no text, no labels, no bottle, no logos, no hands, no people, no watermark",
      size: "1024x1024",
      quality: "medium",
      out: job.out
    };
  });

fs.writeFileSync(outPath, jobs.map((job) => JSON.stringify(job)).join("\n") + "\n");
console.log(`Wrote ${jobs.length} color-study jobs to ${outPath}`);
