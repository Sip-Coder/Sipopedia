const fs = require("fs");
const path = require("path");

const coffeeItems = [
  { id: "espresso", name: "Espresso", glassware: "demitasse cup", art: "no latte art; thick amber crema on a short espresso", background: "Italian espresso bar with chrome machine, marble counter, and warm morning light" },
  { id: "ristretto", name: "Ristretto", glassware: "demitasse cup", art: "no latte art; dense short espresso with glossy crema", background: "compact specialty espresso counter with polished grinder and dark wood details" },
  { id: "lungo", name: "Lungo", glassware: "small ceramic cup", art: "no latte art; longer black espresso with lighter crema ring", background: "quiet European cafe table beside a window and espresso machine" },
  { id: "americano", name: "Americano", glassware: "ceramic mug", art: "no latte art; clear black coffee surface with faint crema trace", background: "modern neighborhood coffee shop with wood tables and soft daylight" },
  { id: "long-black", name: "Long Black", glassware: "small tulip coffee cup", art: "no latte art; preserved crema layer floating on black coffee", background: "Australian specialty cafe with clean white tiles and espresso bar" },
  { id: "macchiato", name: "Macchiato", glassware: "demitasse cup", art: "small classic white foam mark on espresso, not full latte art", background: "Italian cafe table with warm brass espresso machine blurred behind" },
  { id: "cortado", name: "Cortado", glassware: "small clear cortado glass", art: "simple centered microfoam dot or small heart on top", background: "Spanish-style coffee bar with tile accents and a wooden table" },
  { id: "cappuccino", name: "Cappuccino", glassware: "classic cappuccino cup and saucer", art: "classic symmetrical rosetta latte art in thick foam", background: "traditional Italian coffee shop table with espresso machine bokeh" },
  { id: "latte", name: "Caffe Latte", glassware: "large ceramic latte cup", art: "clean classic tulip latte art with glossy microfoam", background: "bright specialty coffee shop with plants, oak table, and barista counter softly blurred" },
  { id: "flat-white", name: "Flat White", glassware: "small ceramic cup", art: "low-profile white rosetta latte art with thin silky microfoam", background: "minimal Australian/New Zealand style cafe with concrete counter and warm wood" },
  { id: "mocha", name: "Caffe Mocha", glassware: "large mug or latte glass", art: "mocha-colored latte art with chocolate dust accent, clean and classic", background: "cozy coffee shop table with cocoa jar and espresso machine softly blurred" },
  { id: "affogato", name: "Affogato", glassware: "small dessert glass", art: "no latte art; espresso poured over vanilla gelato with glossy coffee streaks", background: "Italian dessert cafe table with marble surface and warm ambient light" },
  { id: "irish-coffee", name: "Irish Coffee", glassware: "handled Irish coffee glass", art: "no latte art; floating cream cap over dark coffee", background: "classic warm cafe-pub setting with wood table and soft amber bar lights" },
  { id: "cafe-au-lait", name: "Cafe au Lait", glassware: "wide bowl or large cup", art: "simple pale milk-coffee surface, optional soft central foam swirl", background: "French cafe table with bistro chair silhouettes and morning window light" },
  { id: "cold-brew", name: "Cold Brew", glassware: "rocks glass or tumbler", art: "no latte art; clear dark iced coffee with large transparent ice cubes", background: "modern coffee shop table with cold brew tower and grinders softly blurred" }
];

const jobs = coffeeItems.map((item) => ({
  model: "gpt-image-1.5",
  prompt: [
    "Use case: photorealistic-natural.",
    "Asset type: Bev Recipes selected coffee photo.",
    `Primary request: A premium editorial coffee photo of ${item.name}.`,
    `Subject: one finished ${item.name} served in the correct glassware: ${item.glassware}.`,
    `Coffee detail: ${item.art}. The beverage should look accurate to the recipe and immediately recognizable to beverage students.`,
    `Setting: ${item.background}. Cup or glass sits on a coffee table, with a unique but classic coffee shop atmosphere behind it.`,
    "Composition/framing: square 1024x1024 crop, beverage centered as hero subject, table surface visible, background softly blurred, no hands, no people in focus.",
    "Lighting/mood: warm natural cafe light, realistic ceramic/glass reflections, realistic crema/milk foam/ice/cream texture, premium hospitality education aesthetic.",
    "Constraints: no readable text, no logos, no brand marks, no menu boards with legible text, no watermark, no cartoon, no illustration.",
    "Avoid: misshapen cups, impossible latte art, extra drinks, messy spills, visible brand labels, over-stylized AI texture, cropped glassware."
  ].join(" "),
  use_case: "photorealistic-natural",
  style: "premium editorial coffee photography, realistic cafe environment, accurate coffee presentation",
  composition: "square crop, hero coffee drink on coffee table, unique coffee shop background",
  constraints: "no readable text, no logos, no people in focus, no hands, no watermark",
  size: "1024x1024",
  quality: "medium",
  out: `coffee/${item.id}.png`
}));

const outPath = path.join("tmp", "imagegen", "bev-recipes-coffee-photos-gpt-image-1.5.jsonl");
fs.writeFileSync(outPath, jobs.map((job) => JSON.stringify(job)).join("\n") + "\n");
console.log(`Wrote ${jobs.length} coffee photo jobs to ${outPath}`);
