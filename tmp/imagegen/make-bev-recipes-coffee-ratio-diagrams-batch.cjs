const fs = require("fs");
const path = require("path");

const recipes = [
  { id: "espresso", name: "Espresso", cup: "tiny white demitasse cup", layers: "one short dark espresso layer with a thin amber crema cap, no milk, no water", palette: "dark coffee brown and amber crema" },
  { id: "ristretto", name: "Ristretto", cup: "tiny white demitasse cup", layers: "very short dense dark espresso layer with a thicker amber crema cap, no milk, no water", palette: "deep brown with rich golden crema" },
  { id: "lungo", name: "Lungo", cup: "small white ceramic cup", layers: "taller black espresso-coffee layer with a thin light crema ring, no milk", palette: "medium dark coffee brown and tan crema" },
  { id: "americano", name: "Americano", cup: "white coffee mug", layers: "large hot water layer tinted brown with a darker espresso band near the top and faint crema", palette: "transparent brown gradient" },
  { id: "long-black", name: "Long Black", cup: "small tulip coffee cup", layers: "hot water base with espresso layer and preserved crema floating on top", palette: "clear dark brown with amber top crema" },
  { id: "macchiato", name: "Macchiato", cup: "white demitasse cup", layers: "short espresso base with a small white foam mark on top", palette: "dark brown espresso and small white foam cap" },
  { id: "cortado", name: "Cortado", cup: "small clear cortado glass", layers: "equal parts espresso and steamed milk, tan coffee-milk body with a very thin foam cap", palette: "warm caramel brown and cream" },
  { id: "cappuccino", name: "Cappuccino", cup: "white cappuccino cup", layers: "one third espresso, one third steamed milk, one third thick white foam with simple rosetta top", palette: "brown espresso, tan milk, white foam" },
  { id: "latte", name: "Caffe Latte", cup: "large white latte cup", layers: "small espresso base, large steamed milk body, thin glossy microfoam cap with tulip latte art", palette: "light tan milk coffee and white art" },
  { id: "flat-white", name: "Flat White", cup: "small white ceramic cup", layers: "espresso-forward tan coffee-milk body with very thin silky microfoam and low rosetta art", palette: "medium tan coffee and thin white microfoam" },
  { id: "mocha", name: "Caffe Mocha", cup: "large white mug", layers: "chocolate syrup base, espresso, steamed milk body, light foam cap with chocolate dust swirl", palette: "dark chocolate, coffee brown, cream foam" },
  { id: "affogato", name: "Affogato", cup: "small clear dessert glass", layers: "vanilla gelato scoop with dark espresso poured over it, visible hot-cold dessert layers", palette: "cream gelato and dark espresso streaks" },
  { id: "irish-coffee", name: "Irish Coffee", cup: "handled clear Irish coffee glass", layers: "hot coffee and whiskey body with floating thick cream layer on top", palette: "dark coffee brown, amber whiskey glow, ivory cream cap" },
  { id: "cafe-au-lait", name: "Cafe au Lait", cup: "wide white bowl cup", layers: "half brewed coffee and half steamed milk blended into pale tan body with minimal foam", palette: "soft tan milk coffee" },
  { id: "cold-brew", name: "Cold Brew", cup: "clear rocks glass", layers: "dark cold brew over transparent ice cubes, no foam, no milk", palette: "deep translucent brown, clear ice highlights" }
];

const jobs = recipes.map((recipe) => ({
  model: "gpt-image-1.5",
  prompt: [
    "Use case: scientific-educational.",
    "Asset type: Bev Recipes coffee ratio secondary study image.",
    `Primary request: A clean sectional coffee ratio diagram for ${recipe.name}, inspired by classic coffee drink type charts but without any text labels inside the image.`,
    `Cup type: ${recipe.cup}.`,
    `Layer diagram: ${recipe.layers}.`,
    `Color/layer palette: ${recipe.palette}.`,
    "Composition: one centered simplified cup or glass icon shown in sectional side view, with visible horizontal ingredient layers and accurate relative ratios. Include a small top-view cue only if it helps show latte art, but keep the main subject one cup/glass.",
    "Background: muted warm sage or coffee-card background, clean educational poster style, subtle paper texture, generous margin.",
    "Style: polished vector-like infographic rendered as a clean bitmap, crisp edges, modern beverage education look, visually consistent across the whole coffee set.",
    "Constraints: no text, no words, no numbers, no labels, no arrows, no logos, no people, no hands, no brand marks, no watermark.",
    "Avoid: photorealistic cafe scene, multiple different drinks, clutter, illegible generated text, wrong cup type, impossible layers, overdecorated background."
  ].join(" "),
  use_case: "scientific-educational",
  style: "clean coffee ratio infographic, sectional cup diagram, no text",
  composition: "square crop, centered single cup/glass cross-section, visible layers",
  constraints: "no text, no labels, no logos, no people, no hands, no watermark",
  size: "1024x1024",
  quality: "medium",
  out: `coffee/${recipe.id}-ratio.png`
}));

const outPath = path.join("tmp", "imagegen", "bev-recipes-coffee-ratio-diagrams-gpt-image-1.5.jsonl");
fs.writeFileSync(outPath, jobs.map((job) => JSON.stringify(job)).join("\n") + "\n");
console.log(`Wrote ${jobs.length} coffee ratio diagram jobs to ${outPath}`);
