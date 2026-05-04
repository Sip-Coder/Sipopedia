import { type SyntheticEvent, useMemo, useState } from "react";
import { resolveFlavorFallbackPath, resolveFlavorImagePath } from "../lib/flavorImageResolver";

type BeverageId = "wine" | "beer" | "spirits" | "coffee" | "tea" | "fruit";
type ClimateBand = "Tropical" | "Subtropical" | "Mediterranean" | "Temperate" | "Continental" | "Cool Highland";

type FlavorSegment = {
  id: string;
  label: string;
  description: string;
  examples: string[];
  acidity: number;
  sweetness: number;
  climate?: ClimateBand;
};

type BeverageWheel = {
  id: BeverageId;
  title: string;
  subtitle: string;
  centerLabel: string;
  segments: FlavorSegment[];
};

type FruitReference = {
  name: string;
  climate: ClimateBand;
  acidity: number;
  sweetness: number;
};

const beverageTabs: Array<{ id: BeverageId; label: string }> = [
  { id: "wine", label: "Wine" },
  { id: "beer", label: "Beer" },
  { id: "spirits", label: "Spirits" },
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "fruit", label: "Fruit Reference" }
];

const beverageWheels: Record<Exclude<BeverageId, "fruit">, BeverageWheel> = {
  wine: {
    id: "wine",
    title: "Wine Flavor Wheel",
    subtitle: "Map aromatic families from primary fruit to secondary fermentation and tertiary aging traits.",
    centerLabel: "Wine",
    segments: [
      {
        id: "wine-red-fruit",
        label: "Red Fruit",
        description: "Fresh, bright fruit notes common in cool to moderate climate reds and rose styles.",
        examples: ["strawberry", "cherry", "raspberry", "cranberry", "red currant", "pomegranate"],
        acidity: 7,
        sweetness: 4
      },
      {
        id: "wine-blue-fruit",
        label: "Blue Fruit",
        description: "Blue-toned fruit notes often tied to cooler sites, high-acid reds, and fresh-fruited styles.",
        examples: ["blueberry", "bilberry", "haskap", "elderberry", "aronia berry", "plum"],
        acidity: 6,
        sweetness: 5
      },
      {
        id: "wine-black-fruit",
        label: "Black Fruit",
        description: "Riper fruit profile often linked to fuller body, warmer sites, and later harvest windows.",
        examples: ["blackberry", "black cherry", "cassis", "fig", "mulberry", "date"],
        acidity: 5,
        sweetness: 7
      },
      {
        id: "wine-citrus",
        label: "Citrus",
        description: "High-toned citrus signatures common in white wines with bright acidity and lifted aromatics.",
        examples: ["lemon", "lime", "grapefruit", "kumquat", "meyer lemon", "citron"],
        acidity: 9,
        sweetness: 3
      },
      {
        id: "wine-tree-fruit",
        label: "Tree Fruit",
        description: "Orchard-fruit profile associated with many dry and off-dry white wines.",
        examples: ["apple", "pear", "asian pear", "green apple", "red apple", "quince"],
        acidity: 6,
        sweetness: 5
      },
      {
        id: "wine-stone-fruit",
        label: "Stone Fruit",
        description: "Ripe pit-fruit notes that bridge fresh fruit and textural richness in white wine styles.",
        examples: ["peach", "apricot", "nectarine", "plum", "yellow peach", "white peach"],
        acidity: 5,
        sweetness: 6
      },
      {
        id: "wine-tropical-fruit",
        label: "Tropical Fruit",
        description: "Exotic fruit aromas often found in warm-climate whites and aromatic varieties.",
        examples: ["pineapple", "mango", "passionfruit", "papaya", "guava", "lychee"],
        acidity: 7,
        sweetness: 7
      },
      {
        id: "wine-floral",
        label: "Floral",
        description: "Lifted aromatic top notes that can indicate delicate handling and certain grape varieties.",
        examples: ["rose petal", "violet", "orange blossom", "honeysuckle", "lavender", "elderflower"],
        acidity: 5,
        sweetness: 5
      },
      {
        id: "wine-herbal",
        label: "Herbal",
        description: "Savory green and dried herb markers linked to varietal typicity and site expression.",
        examples: ["mint", "sage", "thyme", "fennel", "eucalyptus", "bay leaf"],
        acidity: 6,
        sweetness: 3
      },
      {
        id: "wine-spice",
        label: "Spice",
        description: "Warm spice tones from ripeness, stems, and oak impact.",
        examples: ["black pepper", "clove", "cinnamon", "anise", "cardamom", "star anise"],
        acidity: 4,
        sweetness: 4
      },
      {
        id: "wine-earth",
        label: "Earth",
        description: "Soil and forest-floor tones associated with maturity and non-fruit complexity.",
        examples: ["wet stone", "mushroom", "truffle", "forest floor", "loam", "graphite"],
        acidity: 5,
        sweetness: 2
      },
      {
        id: "wine-oak",
        label: "Oak",
        description: "Barrel-driven signatures that change texture and aromatic structure.",
        examples: ["vanilla", "cedar", "toast", "coconut", "sweet smoke", "dill"],
        acidity: 3,
        sweetness: 5
      },
      {
        id: "wine-nutty",
        label: "Nutty",
        description: "Oxidative and aged bottle notes that add richness and complexity.",
        examples: ["hazelnut", "almond", "walnut", "brioche", "marzipan", "sesame"],
        acidity: 3,
        sweetness: 4
      },
      {
        id: "wine-caramelized",
        label: "Caramel",
        description: "Concentrated sweetness or oxidative development from bottle age and winemaking choices.",
        examples: ["toffee", "burnt sugar", "molasses", "dried date", "fig jam", "praline"],
        acidity: 2,
        sweetness: 8
      },
      {
        id: "wine-mineral",
        label: "Mineral",
        description: "Perceived salinity and stony precision frequently associated with high-acid structures.",
        examples: ["chalk", "flint", "shell", "sea spray", "saline", "wet slate"],
        acidity: 8,
        sweetness: 2
      }
    ]
  },
  beer: {
    id: "beer",
    title: "Beer Flavor Wheel",
    subtitle: "Track flavor by source: malt, hops, yeast, fermentation chemistry, and maturation.",
    centerLabel: "Beer",
    segments: [
      {
        id: "beer-malt",
        label: "Malt",
        description: "Core grain profile from base and specialty malts.",
        examples: ["bread crust", "cracker", "toast", "biscuit", "honey", "cereal"],
        acidity: 3,
        sweetness: 6
      },
      {
        id: "beer-caramel",
        label: "Caramel",
        description: "Kiln and crystal malt expressions that increase sweetness and body.",
        examples: ["toffee", "caramel", "toasted sugar", "raisin", "burnt amber", "treacle"],
        acidity: 2,
        sweetness: 8
      },
      {
        id: "beer-roast",
        label: "Roast",
        description: "Dark malt and roast-derived bittersweet profile.",
        examples: ["espresso", "cocoa nib", "dark chocolate", "char", "burnt toast", "ash"],
        acidity: 4,
        sweetness: 4
      },
      {
        id: "beer-hop-citrus",
        label: "Hop Citrus",
        description: "Late-hop and dry-hop citrus lift typical in modern pale and IPA families.",
        examples: ["grapefruit zest", "orange peel", "lime", "lemon oil", "bergamot", "yuzu"],
        acidity: 7,
        sweetness: 3
      },
      {
        id: "beer-hop-resin",
        label: "Hop Resin",
        description: "Resinous, dank, and pine expressions tied to hop variety and contact time.",
        examples: ["pine", "resin", "cannabis", "herbal resin", "green peppercorn", "sap"],
        acidity: 5,
        sweetness: 2
      },
      {
        id: "beer-ester",
        label: "Esters",
        description: "Yeast-driven fruit compounds from fermentation temperature and strain choice.",
        examples: ["banana", "pear drop", "red apple", "stone fruit", "bubblegum", "apricot"],
        acidity: 5,
        sweetness: 6
      },
      {
        id: "beer-phenolic",
        label: "Phenolic",
        description: "Spice and clove notes produced by specific yeast and fermentation paths.",
        examples: ["clove", "white pepper", "smoke", "nutmeg", "allspice", "medicinal"],
        acidity: 4,
        sweetness: 2
      },
      {
        id: "beer-sour",
        label: "Sour Tart",
        description: "Acid profile from lactic fermentation, mixed cultures, or fruit additions.",
        examples: ["lemon", "green apple", "gooseberry", "yogurt", "lactic tang", "cider-like"],
        acidity: 9,
        sweetness: 3
      },
      {
        id: "beer-adjunct",
        label: "Adjunct",
        description: "Special ingredients layered onto base beer profile.",
        examples: ["orange peel", "coriander", "cacao", "coffee", "vanilla", "chile"],
        acidity: 4,
        sweetness: 5
      },
      {
        id: "beer-barrel",
        label: "Barrel",
        description: "Wood and spirit cask signatures from aging and oxygen ingress.",
        examples: ["oak", "bourbon", "rum", "vanilla", "tannin", "oxidized sherry"],
        acidity: 3,
        sweetness: 5
      }
    ]
  },
  spirits: {
    id: "spirits",
    title: "Spirits Flavor Wheel",
    subtitle: "Analyze source material, distillation cuts, barrel interaction, and post-aging blending choices.",
    centerLabel: "Spirits",
    segments: [
      {
        id: "spirits-grain",
        label: "Grain",
        description: "Cereal and mash-derived notes from source grain and distillation style.",
        examples: ["malted barley", "cornbread", "rye spice", "wheat cream", "oat biscuit", "porridge"],
        acidity: 2,
        sweetness: 5
      },
      {
        id: "spirits-fruit",
        label: "Fruit",
        description: "Primary fruit character retained from base ingredient or ester-rich cuts.",
        examples: ["green apple", "pear", "stone fruit", "dried apricot", "citrus peel", "grape must"],
        acidity: 5,
        sweetness: 5
      },
      {
        id: "spirits-botanical",
        label: "Botanical",
        description: "Infused aromatic compounds common in gin, aquavit, and amaro styles.",
        examples: ["juniper", "coriander", "angelica", "chamomile", "citrus blossom", "orris"],
        acidity: 4,
        sweetness: 3
      },
      {
        id: "spirits-herbal",
        label: "Herbal",
        description: "Leafy and bittersweet herbal profile tied to infusions and maceration.",
        examples: ["mint", "wormwood", "gentian", "thyme", "sage", "bay"],
        acidity: 4,
        sweetness: 3
      },
      {
        id: "spirits-spice",
        label: "Spice",
        description: "Warm spice notes from oak, botanicals, and oxidation.",
        examples: ["cinnamon", "clove", "nutmeg", "pepper", "allspice", "anise"],
        acidity: 3,
        sweetness: 4
      },
      {
        id: "spirits-oak",
        label: "Oak",
        description: "Barrel-aged markers that add vanilla, tannin, and toast complexity.",
        examples: ["vanilla", "char", "cedar", "coconut", "oak tannin", "toast"],
        acidity: 2,
        sweetness: 6
      },
      {
        id: "spirits-smoke",
        label: "Smoke",
        description: "Combustion and peat signatures from malt drying, barrel char, or terroir.",
        examples: ["peat", "campfire", "tar", "ash", "smoked tea", "iodine"],
        acidity: 2,
        sweetness: 1
      },
      {
        id: "spirits-sweet",
        label: "Sweet",
        description: "Rounded sugar-like impression from barrel and oxidative concentration.",
        examples: ["toffee", "honey", "maple", "brown sugar", "praline", "candied orange"],
        acidity: 2,
        sweetness: 9
      },
      {
        id: "spirits-nutty",
        label: "Nutty",
        description: "Oxidative and tertiary notes in aged spirits and fortified categories.",
        examples: ["almond", "hazelnut", "walnut", "sesame", "nougat", "marzipan"],
        acidity: 2,
        sweetness: 4
      },
      {
        id: "spirits-oxidative",
        label: "Oxidative",
        description: "Aged, rancio-like profile from oxygen, wood, and long maturation.",
        examples: ["dried fig", "leather", "old wood", "tobacco", "rancio", "soy caramel"],
        acidity: 3,
        sweetness: 4
      }
    ]
  },
  coffee: {
    id: "coffee",
    title: "Coffee Flavor Wheel",
    subtitle: "Evaluate cup profile by aromatic family, roast impact, and perceived sweetness-acidity balance.",
    centerLabel: "Coffee",
    segments: [
      {
        id: "coffee-floral",
        label: "Floral",
        description: "High-elevation washed coffees often show precise floral tones.",
        examples: ["jasmine", "orange blossom", "rose", "lavender", "bergamot", "lilac"],
        acidity: 6,
        sweetness: 4
      },
      {
        id: "coffee-citrus",
        label: "Citrus",
        description: "Bright citrus profile linked to high acidity and clean processing.",
        examples: ["lemon", "lime", "grapefruit", "meyer lemon", "mandarin", "yuzu"],
        acidity: 9,
        sweetness: 3
      },
      {
        id: "coffee-berry",
        label: "Berry",
        description: "Juicy fruit character common in natural and anaerobic processing styles.",
        examples: ["strawberry", "blueberry", "raspberry", "blackberry", "currant", "cranberry"],
        acidity: 7,
        sweetness: 6
      },
      {
        id: "coffee-stone-fruit",
        label: "Stone Fruit",
        description: "Ripe, rounded fruit with moderate acidity and good sweetness.",
        examples: ["peach", "apricot", "plum", "nectarine", "cherry", "date"],
        acidity: 6,
        sweetness: 6
      },
      {
        id: "coffee-tropical",
        label: "Tropical",
        description: "Exotic fruit intensity with sweet aromatic lift.",
        examples: ["mango", "pineapple", "passionfruit", "papaya", "lychee", "guava"],
        acidity: 8,
        sweetness: 7
      },
      {
        id: "coffee-cocoa",
        label: "Cocoa",
        description: "Chocolate and cacao expression often enhanced by deeper roast development.",
        examples: ["milk chocolate", "dark chocolate", "cacao nib", "brownie", "fudge", "malted cocoa"],
        acidity: 3,
        sweetness: 7
      },
      {
        id: "coffee-nutty",
        label: "Nutty",
        description: "Comforting praline and nut profiles in balanced medium roasts.",
        examples: ["hazelnut", "almond", "pecan", "walnut", "peanut brittle", "nougat"],
        acidity: 3,
        sweetness: 6
      },
      {
        id: "coffee-caramel",
        label: "Caramel",
        description: "Sugar browning tones from roast and Maillard development.",
        examples: ["caramel", "toffee", "molasses", "brown sugar", "maple", "butterscotch"],
        acidity: 2,
        sweetness: 8
      },
      {
        id: "coffee-spice",
        label: "Spice",
        description: "Spice accents from roast profile and origin character.",
        examples: ["cinnamon", "clove", "cardamom", "nutmeg", "ginger", "anise"],
        acidity: 4,
        sweetness: 4
      },
      {
        id: "coffee-earthy",
        label: "Earthy",
        description: "Savory depth from processing variation and darker roast styles.",
        examples: ["cedar", "wet earth", "mushroom", "tobacco", "herbal root", "black tea"],
        acidity: 4,
        sweetness: 2
      }
    ]
  },
  tea: {
    id: "tea",
    title: "Tea Flavor Wheel",
    subtitle: "Use this wheel to map infusion profile across cultivar, oxidation, firing, and terroir.",
    centerLabel: "Tea",
    segments: [
      {
        id: "tea-floral",
        label: "Floral",
        description: "Delicate perfumed notes commonly found in high mountain and lightly oxidized teas.",
        examples: ["orchid", "jasmine", "rose", "gardenia", "lily", "orange blossom"],
        acidity: 5,
        sweetness: 5
      },
      {
        id: "tea-vegetal",
        label: "Vegetal",
        description: "Green, steamed, and fresh plant expressions seen in green and young tea styles.",
        examples: ["spinach", "nori", "edamame", "asparagus", "cut grass", "snap pea"],
        acidity: 5,
        sweetness: 2
      },
      {
        id: "tea-fruity",
        label: "Fruity",
        description: "Stone-fruit and orchard-fruit tones in oolong, black tea, and some white teas.",
        examples: ["peach", "apricot", "lychee", "apple", "plum", "grape"],
        acidity: 6,
        sweetness: 6
      },
      {
        id: "tea-citrus",
        label: "Citrus",
        description: "Lifted zest character from cultivar and aromatic processing choices.",
        examples: ["lemon peel", "orange zest", "kumquat", "bergamot", "yuzu", "citron"],
        acidity: 8,
        sweetness: 4
      },
      {
        id: "tea-nutty",
        label: "Nutty",
        description: "Roast and oxidation tones that add warmth and breadth.",
        examples: ["almond", "chestnut", "toasted rice", "hazelnut", "sesame", "peanut skin"],
        acidity: 3,
        sweetness: 5
      },
      {
        id: "tea-sweet",
        label: "Sweet",
        description: "Rounded sweetness with honeyed and sugar-cane qualities.",
        examples: ["honey", "rock sugar", "caramel", "molasses", "vanilla", "maple"],
        acidity: 2,
        sweetness: 8
      },
      {
        id: "tea-mineral",
        label: "Mineral",
        description: "Saline and stone-like structure linked to soil and mountain terroir.",
        examples: ["wet stone", "chalk", "saline", "slate", "river pebble", "flint"],
        acidity: 6,
        sweetness: 2
      },
      {
        id: "tea-smoky",
        label: "Smoky",
        description: "Firing and pine smoke notes in specific black tea traditions.",
        examples: ["pine smoke", "char", "cedar", "resin", "burnt sugar", "campfire"],
        acidity: 2,
        sweetness: 3
      },
      {
        id: "tea-spice",
        label: "Spice",
        description: "Warm spice profile that can emerge from oxidation and roast influence.",
        examples: ["cinnamon", "clove", "pepper", "ginger", "cardamom", "allspice"],
        acidity: 4,
        sweetness: 4
      },
      {
        id: "tea-umami",
        label: "Umami",
        description: "Savory depth most common in shaded green tea production.",
        examples: ["broth", "seaweed", "soy", "mushroom", "toasted nori", "sweet corn"],
        acidity: 4,
        sweetness: 3
      }
    ]
  }
};

const climateOrder: ClimateBand[] = [
  "Tropical",
  "Subtropical",
  "Mediterranean",
  "Temperate",
  "Continental",
  "Cool Highland"
];

const climateColors: Record<ClimateBand, string> = {
  Tropical: "#f08a3c",
  Subtropical: "#e6ad3c",
  Mediterranean: "#c4a256",
  Temperate: "#63b06a",
  Continental: "#4f8fd0",
  "Cool Highland": "#8b7ec8"
};

const fruitReference: FruitReference[] = [
  { name: "Mango", climate: "Tropical", acidity: 4, sweetness: 8 },
  { name: "Papaya", climate: "Tropical", acidity: 3, sweetness: 7 },
  { name: "Pineapple", climate: "Tropical", acidity: 8, sweetness: 7 },
  { name: "Banana", climate: "Tropical", acidity: 2, sweetness: 7 },
  { name: "Coconut", climate: "Tropical", acidity: 1, sweetness: 4 },
  { name: "Jackfruit", climate: "Tropical", acidity: 3, sweetness: 8 },
  { name: "Guava", climate: "Tropical", acidity: 6, sweetness: 7 },
  { name: "Passionfruit", climate: "Tropical", acidity: 9, sweetness: 6 },
  { name: "Lychee", climate: "Tropical", acidity: 4, sweetness: 8 },
  { name: "Rambutan", climate: "Tropical", acidity: 3, sweetness: 7 },
  { name: "Durian", climate: "Tropical", acidity: 2, sweetness: 6 },
  { name: "Soursop", climate: "Tropical", acidity: 7, sweetness: 6 },
  { name: "Starfruit", climate: "Tropical", acidity: 7, sweetness: 4 },
  { name: "Mangosteen", climate: "Tropical", acidity: 5, sweetness: 7 },
  { name: "Dragon Fruit", climate: "Tropical", acidity: 3, sweetness: 5 },
  { name: "Breadfruit", climate: "Tropical", acidity: 2, sweetness: 4 },
  { name: "Orange", climate: "Subtropical", acidity: 7, sweetness: 6 },
  { name: "Mandarin", climate: "Subtropical", acidity: 6, sweetness: 7 },
  { name: "Grapefruit", climate: "Subtropical", acidity: 8, sweetness: 4 },
  { name: "Pomelo", climate: "Subtropical", acidity: 6, sweetness: 5 },
  { name: "Lemon", climate: "Subtropical", acidity: 10, sweetness: 2 },
  { name: "Lime", climate: "Subtropical", acidity: 10, sweetness: 2 },
  { name: "Kumquat", climate: "Subtropical", acidity: 8, sweetness: 5 },
  { name: "Feijoa", climate: "Subtropical", acidity: 5, sweetness: 6 },
  { name: "Loquat", climate: "Subtropical", acidity: 5, sweetness: 6 },
  { name: "Persimmon", climate: "Subtropical", acidity: 2, sweetness: 8 },
  { name: "Pomegranate", climate: "Subtropical", acidity: 7, sweetness: 6 },
  { name: "Avocado", climate: "Subtropical", acidity: 1, sweetness: 1 },
  { name: "Fig", climate: "Mediterranean", acidity: 3, sweetness: 8 },
  { name: "Grape", climate: "Mediterranean", acidity: 6, sweetness: 7 },
  { name: "Olive", climate: "Mediterranean", acidity: 2, sweetness: 1 },
  { name: "Date", climate: "Mediterranean", acidity: 2, sweetness: 10 },
  { name: "Prickly Pear", climate: "Mediterranean", acidity: 4, sweetness: 7 },
  { name: "Bergamot", climate: "Mediterranean", acidity: 9, sweetness: 3 },
  { name: "Quince", climate: "Mediterranean", acidity: 7, sweetness: 4 },
  { name: "Mulberry", climate: "Mediterranean", acidity: 4, sweetness: 7 },
  { name: "Jujube", climate: "Mediterranean", acidity: 3, sweetness: 6 },
  { name: "Apple", climate: "Temperate", acidity: 6, sweetness: 6 },
  { name: "Pear", climate: "Temperate", acidity: 4, sweetness: 7 },
  { name: "Peach", climate: "Temperate", acidity: 5, sweetness: 7 },
  { name: "Nectarine", climate: "Temperate", acidity: 5, sweetness: 7 },
  { name: "Plum", climate: "Temperate", acidity: 6, sweetness: 6 },
  { name: "Apricot", climate: "Temperate", acidity: 5, sweetness: 6 },
  { name: "Cherry", climate: "Temperate", acidity: 6, sweetness: 7 },
  { name: "Sour Cherry", climate: "Temperate", acidity: 8, sweetness: 4 },
  { name: "Strawberry", climate: "Temperate", acidity: 6, sweetness: 7 },
  { name: "Raspberry", climate: "Temperate", acidity: 8, sweetness: 5 },
  { name: "Blackberry", climate: "Temperate", acidity: 6, sweetness: 6 },
  { name: "Blueberry", climate: "Temperate", acidity: 5, sweetness: 6 },
  { name: "Currant", climate: "Continental", acidity: 8, sweetness: 4 },
  { name: "Gooseberry", climate: "Continental", acidity: 9, sweetness: 3 },
  { name: "Elderberry", climate: "Continental", acidity: 7, sweetness: 4 },
  { name: "Chokeberry", climate: "Continental", acidity: 8, sweetness: 2 },
  { name: "Lingonberry", climate: "Continental", acidity: 9, sweetness: 3 },
  { name: "Sea Buckthorn", climate: "Continental", acidity: 10, sweetness: 2 },
  { name: "Cranberry", climate: "Continental", acidity: 10, sweetness: 2 },
  { name: "Cornelian Cherry", climate: "Continental", acidity: 8, sweetness: 4 },
  { name: "Hawthorn Berry", climate: "Continental", acidity: 7, sweetness: 3 },
  { name: "Kiwi", climate: "Cool Highland", acidity: 8, sweetness: 6 },
  { name: "Haskap", climate: "Cool Highland", acidity: 9, sweetness: 4 },
  { name: "Cloudberry", climate: "Cool Highland", acidity: 7, sweetness: 4 },
  { name: "Rowan Berry", climate: "Cool Highland", acidity: 9, sweetness: 2 },
  { name: "Aronia Berry", climate: "Cool Highland", acidity: 8, sweetness: 2 },
  { name: "Sloe", climate: "Cool Highland", acidity: 9, sweetness: 2 },
  { name: "Mountain Papaya", climate: "Cool Highland", acidity: 6, sweetness: 6 },
  { name: "Andean Gooseberry", climate: "Cool Highland", acidity: 7, sweetness: 6 },
  { name: "Bilberry", climate: "Cool Highland", acidity: 7, sweetness: 5 }
];

function polarPoint(cx: number, cy: number, radius: number, angleDeg: number) {
  const radians = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function ringSegmentPath(cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) {
  const outerStart = polarPoint(cx, cy, outerRadius, startAngle);
  const outerEnd = polarPoint(cx, cy, outerRadius, endAngle);
  const innerEnd = polarPoint(cx, cy, innerRadius, endAngle);
  const innerStart = polarPoint(cx, cy, innerRadius, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    "Z"
  ].join(" ");
}

function climateSegmentId(climate: ClimateBand) {
  return `fruit-${climate.toLowerCase().replace(/\s+/g, "-")}`;
}

function baseHueForBeverage(beverage: BeverageId) {
  if (beverage === "wine") return 344;
  if (beverage === "beer") return 36;
  if (beverage === "spirits") return 20;
  if (beverage === "coffee") return 25;
  if (beverage === "tea") return 140;
  return 205;
}

function segmentColor(baseHue: number, index: number, count: number, selected: boolean) {
  const hue = (baseHue + (index * 360) / count) % 360;
  const saturation = selected ? 70 : 54;
  const lightness = selected ? 54 : 66;
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function metricWidth(value: number) {
  const clamped = Math.max(1, Math.min(10, value));
  return `${(clamped / 10) * 100}%`;
}

function normalizeFlavorName(value: string) {
  return value.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}

function displayFlavorName(value: string) {
  return normalizeFlavorName(value)
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const descriptorMetricProfiles: Array<{ keywords: string[]; acidity: number; sweetness: number }> = [
  { keywords: ["citrus", "lemon", "lime", "grapefruit", "yuzu", "bergamot", "kumquat", "citron"], acidity: 9, sweetness: 3 },
  { keywords: ["green apple", "gooseberry", "cranberry", "sea buckthorn", "sour", "tart", "lactic", "yogurt"], acidity: 9, sweetness: 3 },
  { keywords: ["pineapple", "passionfruit", "guava", "mango", "lychee", "papaya", "banana", "tropical"], acidity: 6, sweetness: 7 },
  { keywords: ["honey", "caramel", "toffee", "molasses", "praline", "butterscotch", "vanilla", "sugar", "treacle"], acidity: 2, sweetness: 8 },
  { keywords: ["chocolate", "cocoa", "espresso", "coffee", "roast", "toast", "biscuit", "bread", "cracker"], acidity: 3, sweetness: 5 },
  { keywords: ["chalk", "flint", "slate", "stone", "shell", "saline", "sea spray", "mineral"], acidity: 8, sweetness: 2 },
  { keywords: ["mint", "sage", "thyme", "fennel", "eucalyptus", "bay", "herbal", "grass", "pine", "resin"], acidity: 6, sweetness: 2 },
  { keywords: ["pepper", "clove", "cinnamon", "anise", "cardamom", "nutmeg", "spice"], acidity: 4, sweetness: 3 },
  { keywords: ["oak", "cedar", "wood", "smoke", "char", "ash", "tobacco", "leather"], acidity: 3, sweetness: 3 },
  { keywords: ["mushroom", "truffle", "earth", "loam", "forest floor", "graphite"], acidity: 5, sweetness: 2 },
  { keywords: ["flower", "floral", "rose", "violet", "jasmine", "honeysuckle", "lavender", "elderflower"], acidity: 5, sweetness: 5 },
  { keywords: ["nut", "hazelnut", "almond", "walnut", "sesame", "marzipan"], acidity: 3, sweetness: 5 }
];

function findMatchingFruitReference(value: string) {
  const normalized = normalizeFlavorName(value);
  return fruitReference.find((fruit) => {
    const fruitName = normalizeFlavorName(fruit.name);
    return normalized === fruitName || normalized.includes(fruitName) || fruitName.includes(normalized);
  });
}

function resolveFlavorDetail(flavorName: string, segment: FlavorSegment) {
  const normalized = normalizeFlavorName(flavorName);
  const fruit = findMatchingFruitReference(flavorName);

  if (fruit) {
    return {
      label: displayFlavorName(flavorName),
      description: `${displayFlavorName(flavorName)} in the ${fruit.climate} climate reference band.`,
      acidity: fruit.acidity,
      sweetness: fruit.sweetness,
      fruit
    };
  }

  const profile = descriptorMetricProfiles.find((item) =>
    item.keywords.some((keyword) => normalized.includes(normalizeFlavorName(keyword)))
  );

  return {
    label: displayFlavorName(flavorName),
    description: `${displayFlavorName(flavorName)} inside the ${segment.label} family.`,
    acidity: profile?.acidity ?? segment.acidity,
    sweetness: profile?.sweetness ?? segment.sweetness
  };
}

export function FlavorWheel() {
  const [activeBeverage, setActiveBeverage] = useState<BeverageId>("wine");
  const [activeSegmentId, setActiveSegmentId] = useState("");
  const [activeFlavorName, setActiveFlavorName] = useState("");

  const fruitStatsByClimate = useMemo(() => {
    const map = new Map<ClimateBand, { acidity: number; sweetness: number; count: number }>();
    for (const climate of climateOrder) {
      map.set(climate, { acidity: 0, sweetness: 0, count: 0 });
    }

    for (const fruit of fruitReference) {
      const current = map.get(fruit.climate);
      if (!current) continue;
      current.acidity += fruit.acidity;
      current.sweetness += fruit.sweetness;
      current.count += 1;
    }

    return map;
  }, []);

  const fruitWheel = useMemo<BeverageWheel>(
    () => ({
      id: "fruit",
      title: "Fruit Reference Wheel",
      subtitle:
        "Reference wheel organized by climate family, with each climate mapped to average acidity and sweetness. Use the matrix for individual fruits.",
      centerLabel: "Fruit",
      segments: climateOrder.map((climate) => {
        const summary = fruitStatsByClimate.get(climate);
        const averageAcidity = summary && summary.count > 0 ? Number((summary.acidity / summary.count).toFixed(1)) : 1;
        const averageSweetness =
          summary && summary.count > 0 ? Number((summary.sweetness / summary.count).toFixed(1)) : 1;

        const items = fruitReference
          .filter((fruit) => fruit.climate === climate)
          .slice(0, 8)
          .map((fruit) => fruit.name.toLowerCase());

        return {
          id: climateSegmentId(climate),
          label: climate,
          description: `${climate} fruits grouped by shared growing conditions and ripening behavior.`,
          examples: items,
          acidity: averageAcidity,
          sweetness: averageSweetness,
          climate
        };
      })
    }),
    [fruitStatsByClimate]
  );

  const activeWheel = activeBeverage === "fruit" ? fruitWheel : beverageWheels[activeBeverage];
  const selectedSegment = activeWheel.segments.find((segment) => segment.id === activeSegmentId) ?? activeWheel.segments[0];
  const selectedClimate = activeBeverage === "fruit" ? selectedSegment.climate ?? climateOrder[0] : null;

  const selectedClimateFruit = useMemo(() => {
    if (!selectedClimate) return [];
    return fruitReference
      .filter((fruit) => fruit.climate === selectedClimate)
      .sort((left, right) => left.name.localeCompare(right.name));
  }, [selectedClimate]);

  const activeFlavorDetail = activeFlavorName ? resolveFlavorDetail(activeFlavorName, selectedSegment) : null;
  const selectedFruit =
    activeBeverage === "fruit"
      ? selectedClimateFruit.find((fruit) => normalizeFlavorName(fruit.name) === normalizeFlavorName(activeFlavorName)) ?? null
      : null;

  const detailLabel = activeFlavorDetail?.label ?? selectedSegment.label;
  const detailDescription = activeFlavorDetail?.description ?? selectedSegment.description;
  const detailAcidity = activeFlavorDetail?.acidity ?? selectedSegment.acidity;
  const detailSweetness = activeFlavorDetail?.sweetness ?? selectedSegment.sweetness;

  const selectedCueImages = useMemo(
    () =>
      selectedSegment.examples.map((item) => ({
        item,
        imageSrc: resolveFlavorImagePath(item),
        fallbackSrc: resolveFlavorFallbackPath(item)
      })),
    [selectedSegment.examples]
  );

  const visibleCueImages = useMemo(() => {
    if (!activeFlavorName) return selectedCueImages;
    const activeNormalized = normalizeFlavorName(activeFlavorName);
    const activeCueInSegment = selectedCueImages.some((cue) => normalizeFlavorName(cue.item) === activeNormalized);
    if (activeCueInSegment) return selectedCueImages;

    return [
      {
        item: activeFlavorName,
        imageSrc: resolveFlavorImagePath(activeFlavorName),
        fallbackSrc: resolveFlavorFallbackPath(activeFlavorName)
      },
      ...selectedCueImages
    ];
  }, [activeFlavorName, selectedCueImages]);

  const selectFlavor = (flavorName: string) => {
    const fruit = findMatchingFruitReference(flavorName);
    if (activeBeverage === "fruit" && fruit) {
      setActiveSegmentId(climateSegmentId(fruit.climate));
    }
    setActiveFlavorName(flavorName);
  };

  const handleFlavorImageError = (event: SyntheticEvent<HTMLImageElement>, fallbackSrc: string) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied === "1") return;
    image.dataset.fallbackApplied = "1";
    image.src = fallbackSrc;
  };

  const baseHue = baseHueForBeverage(activeBeverage);
  const svgSize = 460;
  const center = svgSize / 2;
  const innerRadius = 76;
  const outerRadius = 194;
  const segmentAngle = 360 / activeWheel.segments.length;

  const matrixWidth = 560;
  const matrixHeight = 320;
  const matrixPadding = { left: 56, right: 16, top: 18, bottom: 42 };
  const plotWidth = matrixWidth - matrixPadding.left - matrixPadding.right;
  const plotHeight = matrixHeight - matrixPadding.top - matrixPadding.bottom;

  const xForAcidity = (acidity: number) => matrixPadding.left + ((acidity - 1) / 9) * plotWidth;
  const yForSweetness = (sweetness: number) => matrixPadding.top + (1 - (sweetness - 1) / 9) * plotHeight;

  return (
    <section className="flavor-wheel">
      <div className="section-header">
        <h2>Flavor Wheel</h2>
        <p>
          Switch beverage families to study sensory language. The fruit wheel is a reference matrix organized by climate,
          acidity, and sweetness.
        </p>
      </div>

      <div className="flavor-wheel-tabs" role="tablist" aria-label="Beverage flavor wheel tabs">
        {beverageTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeBeverage === tab.id}
            className={`bucket-pill flavor-wheel-tab ${activeBeverage === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveBeverage(tab.id);
              setActiveSegmentId("");
              setActiveFlavorName("");
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flavor-wheel-layout">
        <article className="flavor-wheel-canvas">
          <h3>{activeWheel.title}</h3>
          <p>{activeWheel.subtitle}</p>
          {selectedCueImages.length > 0 ? (
            <div className="flavor-wheel-fruit-strip" aria-label="Selected flavor thumbnails">
              {selectedCueImages.map(({ item, imageSrc, fallbackSrc }) => (
                <button
                  key={`wheel-fruit-${selectedSegment.id}-${item}`}
                  type="button"
                  className={`flavor-wheel-fruit-strip-button ${
                    normalizeFlavorName(activeFlavorName) === normalizeFlavorName(item) ? "active" : ""
                  }`}
                  aria-pressed={normalizeFlavorName(activeFlavorName) === normalizeFlavorName(item)}
                  aria-label={`Select ${item} flavor`}
                  onClick={() => selectFlavor(item)}
                >
                  <img
                    className="flavor-wheel-fruit-strip-image"
                    src={imageSrc}
                    onError={(event) => handleFlavorImageError(event, fallbackSrc)}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          ) : null}

          <div className="flavor-wheel-mobile-detail" aria-live="polite">
            <div className="flavor-wheel-mobile-detail-head">
              <h4>{detailLabel}</h4>
              <span>
                A{detailAcidity} / S{detailSweetness}
              </span>
            </div>
            <div className="flavor-wheel-mobile-meter-row">
              <div className="flavor-wheel-mobile-meter">
                <span>Acidity</span>
                <div className="flavor-wheel-meter-track">
                  <span style={{ width: metricWidth(detailAcidity) }} />
                </div>
              </div>
              <div className="flavor-wheel-mobile-meter">
                <span>Sweetness</span>
                <div className="flavor-wheel-meter-track">
                  <span style={{ width: metricWidth(detailSweetness) }} />
                </div>
              </div>
            </div>
          </div>

          <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="flavor-wheel-svg" role="img" aria-label={activeWheel.title}>
            <circle cx={center} cy={center} r={outerRadius + 10} fill="#f8f4ea" stroke="#cbbca2" strokeWidth="1.2" />
            {activeWheel.segments.map((segment, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = startAngle + segmentAngle;
              const isSelected = segment.id === selectedSegment.id;
              const path = ringSegmentPath(center, center, innerRadius, outerRadius, startAngle, endAngle);
              const fill =
                activeBeverage === "fruit" && segment.climate
                  ? climateColors[segment.climate]
                  : segmentColor(baseHue, index, activeWheel.segments.length, isSelected);

              const labelPoint = polarPoint(center, center, (innerRadius + outerRadius) / 2, startAngle + segmentAngle / 2);
              return (
                <g key={segment.id}>
                  <path
                    d={path}
                    fill={fill}
                    stroke={isSelected ? "#17323d" : "rgba(28, 43, 54, 0.32)"}
                    strokeWidth={isSelected ? 2.6 : 1.2}
                    opacity={isSelected ? 1 : 0.9}
                    onClick={() => {
                      setActiveSegmentId(segment.id);
                      setActiveFlavorName("");
                    }}
                  >
                    <title>{segment.label}</title>
                  </path>
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="flavor-wheel-label"
                  >
                    {segment.label.split(" ").length === 2 ? (
                      <>
                        <tspan x={labelPoint.x} dy="-0.36em">
                          {segment.label.split(" ")[0]}
                        </tspan>
                        <tspan x={labelPoint.x} dy="1.14em">
                          {segment.label.split(" ")[1]}
                        </tspan>
                      </>
                    ) : (
                      segment.label
                    )}
                  </text>
                </g>
              );
            })}

            <circle cx={center} cy={center} r={innerRadius - 6} fill="#fffdf8" stroke="#d4c6ad" />
            <text x={center} y={center - 10} textAnchor="middle" className="flavor-wheel-core">
              {activeWheel.centerLabel}
            </text>
            <text x={center} y={center + 16} textAnchor="middle" className="flavor-wheel-core-sub">
              {detailLabel}
            </text>
          </svg>
        </article>

        <aside className="flavor-wheel-detail">
          <h3>{detailLabel}</h3>
          <p>{detailDescription}</p>

          <div className="flavor-wheel-meter-grid">
            <div className="flavor-wheel-meter">
              <p>Acidity</p>
              <div className="flavor-wheel-meter-track">
                <span style={{ width: metricWidth(detailAcidity) }} />
              </div>
              <strong>{detailAcidity}/10</strong>
            </div>
            <div className="flavor-wheel-meter">
              <p>Sweetness</p>
              <div className="flavor-wheel-meter-track">
                <span style={{ width: metricWidth(detailSweetness) }} />
              </div>
              <strong>{detailSweetness}/10</strong>
            </div>
          </div>

          <h4>Descriptor cues</h4>
          <div className="flavor-wheel-tags">
            {visibleCueImages.map(({ item, imageSrc, fallbackSrc }) => (
              <button
                key={`${selectedSegment.id}-${item}`}
                type="button"
                className={`flavor-wheel-tag ${
                  normalizeFlavorName(activeFlavorName) === normalizeFlavorName(item) ? "active" : ""
                }`}
                aria-pressed={normalizeFlavorName(activeFlavorName) === normalizeFlavorName(item)}
                onClick={() => selectFlavor(item)}
              >
                <img
                  className="flavor-wheel-tag-image"
                  src={imageSrc}
                  onError={(event) => handleFlavorImageError(event, fallbackSrc)}
                  alt=""
                  aria-hidden="true"
                />
                {item}
              </button>
            ))}
          </div>

          {activeBeverage === "fruit" ? (
            <>
              <h4>Climate-acidity-sweetness matrix</h4>
              <div className="fruit-matrix-wrap">
                <svg viewBox={`0 0 ${matrixWidth} ${matrixHeight}`} className="fruit-matrix-svg" aria-label="Fruit reference matrix">
                  <rect
                    x={matrixPadding.left}
                    y={matrixPadding.top}
                    width={plotWidth}
                    height={plotHeight}
                    fill="#fbfaf6"
                    stroke="#d3c8b4"
                  />

                  {[1, 3, 5, 7, 9].map((tick) => {
                    const x = xForAcidity(tick);
                    return (
                      <g key={`x-tick-${tick}`}>
                        <line
                          x1={x}
                          y1={matrixPadding.top}
                          x2={x}
                          y2={matrixPadding.top + plotHeight}
                          stroke="rgba(66, 88, 106, 0.18)"
                        />
                        <text x={x} y={matrixHeight - 12} textAnchor="middle" className="fruit-axis-text">
                          {tick}
                        </text>
                      </g>
                    );
                  })}
                  {[1, 3, 5, 7, 9].map((tick) => {
                    const y = yForSweetness(tick);
                    return (
                      <g key={`y-tick-${tick}`}>
                        <line
                          x1={matrixPadding.left}
                          y1={y}
                          x2={matrixPadding.left + plotWidth}
                          y2={y}
                          stroke="rgba(66, 88, 106, 0.18)"
                        />
                        <text x={matrixPadding.left - 14} y={y + 4} textAnchor="end" className="fruit-axis-text">
                          {tick}
                        </text>
                      </g>
                    );
                  })}

                  <text x={matrixPadding.left + plotWidth / 2} y={matrixHeight - 2} textAnchor="middle" className="fruit-axis-label">
                    Acidity
                  </text>
                  <text
                    x={16}
                    y={matrixPadding.top + plotHeight / 2}
                    textAnchor="middle"
                    transform={`rotate(-90, 16, ${matrixPadding.top + plotHeight / 2})`}
                    className="fruit-axis-label"
                  >
                    Sweetness
                  </text>

                  {fruitReference.map((fruit) => {
                    const selected = selectedFruit?.name === fruit.name;
                    const inActiveClimate = selectedClimate === fruit.climate;
                    return (
                      <circle
                        key={fruit.name}
                        cx={xForAcidity(fruit.acidity)}
                        cy={yForSweetness(fruit.sweetness)}
                        r={selected ? 7 : inActiveClimate ? 5.2 : 4.2}
                        fill={climateColors[fruit.climate]}
                        stroke={selected ? "#102631" : "rgba(22, 34, 44, 0.35)"}
                        strokeWidth={selected ? 2.2 : 1}
                        opacity={selected ? 1 : inActiveClimate ? 0.88 : 0.62}
                        onClick={() => selectFlavor(fruit.name)}
                      >
                        <title>
                          {fruit.name}: A{fruit.acidity} / S{fruit.sweetness} ({fruit.climate})
                        </title>
                      </circle>
                    );
                  })}
                </svg>
              </div>

              <div className="fruit-climate-legend" aria-label="Fruit climate legend">
                {climateOrder.map((climate) => (
                  <span key={climate}>
                    <i style={{ backgroundColor: climateColors[climate] }} />
                    {climate}
                  </span>
                ))}
              </div>

              <h4>{selectedClimate} fruit references</h4>
              <ul className="fruit-reference-list">
                {selectedClimateFruit.map((fruit) => (
                  <li key={`${fruit.climate}-${fruit.name}`}>
                    <button
                      type="button"
                      className={`fruit-reference-button ${selectedFruit?.name === fruit.name ? "active" : ""}`}
                      aria-pressed={selectedFruit?.name === fruit.name}
                      onClick={() => selectFlavor(fruit.name)}
                    >
                      <span>{fruit.name}</span>
                      <small>
                        A{fruit.acidity} / S{fruit.sweetness}
                      </small>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
