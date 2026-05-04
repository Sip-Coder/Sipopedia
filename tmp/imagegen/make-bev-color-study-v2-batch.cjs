const fs = require("fs");
const path = require("path");

const sourcePath = path.join("tmp", "imagegen", "bev-recipes-wine-beer-photos-gpt-image-1.5.jsonl");
const outPath = path.join("tmp", "imagegen", "bev-recipes-color-study-v2-gpt-image-1.5.jsonl");

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

function itemNameFromOut(out) {
  const file = out.split(/[\\/]/).pop().replace("-color.png", "");
  return file.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")
    .replace("Ipa", "IPA")
    .replace("Hazy IPA", "Hazy IPA")
    .replace("India Pale Ale", "India Pale Ale")
    .replace("Cote De Rhone", "Cote de Rhone")
    .replace("Pinot Gris", "Pinot Gris/Grigio")
    .replace("Albarino", "Albarino");
}

const jobs = fs.readFileSync(sourcePath, "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line))
  .filter((job) => job.out.endsWith("-color.png"))
  .map((job) => {
    const id = job.out.split(/[\\/]/).pop().replace("-color.png", "");
    const kind = job.out.startsWith("beers/") ? "beer" : "wine";
    const name = itemNameFromOut(job.out);
    const cues = kind === "beer" ? beerCues[id] : wineCues[id];
    const glass = kind === "beer" ? "appropriate clear beer tasting glass for the style" : "clear ISO-style wine tasting glass";
    const colorFocus = kind === "beer" ? "beer color, foam tint, haze or clarity, and concentration" : "wine hue, rim variation, core depth, concentration, viscosity, and color gradient";
    const prompt = [
      "Use case: photorealistic-natural.",
      `Asset type: Bev Recipes ${kind} color study replacement image.`,
      `Primary request: A clean examination-style color study photo of ${name}, using one ${glass} tilted away from the viewer at roughly 35 to 45 degrees, like professional beverage color assessment.`,
      `Subject: one transparent glass only, partially filled, angled so the beverage pools on one side and exposes ${colorFocus}.`,
      `Color target: ${cues}. The color must be visibly distinct from other ${kind} styles and educationally useful for blind tasting study.`,
      "Background: seamless matte white examination background, pure white table or white card beneath the glass, no shadows except a very soft natural contact shadow, no decorative environment.",
      "Composition/framing: square crop, glass centered with generous white margin, full bowl and rim visible, liquid meniscus sharp, no cropped glass edges, no caption text inside the image.",
      "Lighting/mood: bright diffuse tasting-exam lighting from above and behind, realistic reflections, crisp transparent glass, accurate liquid physics.",
      "Constraints: no readable text, no labels, no bottle, no logo, no hands, no people, no watermark, no chart, no illustration, no dark background.",
      "Avoid: spilling beverage, impossible liquid angle, multiple glasses, opaque glass, colored backdrop, clutter, excessive glare, cropped rim, cropped base."
    ].join(" ");

    return {
      model: "gpt-image-1.5",
      prompt,
      use_case: "photorealistic-natural",
      style: "exam-style beverage color study photography on a white background, realistic glass and liquid physics",
      composition: "square crop, single tilted glass, full rim visible, generous white margin",
      constraints: "white background, no text, no labels, no bottle, no logos, no hands, no people, no watermark",
      size: "1024x1024",
      quality: "medium",
      out: job.out
    };
  });

fs.writeFileSync(outPath, jobs.map((job) => JSON.stringify(job)).join("\n") + "\n");
console.log(`Wrote ${jobs.length} color-study jobs to ${outPath}`);
