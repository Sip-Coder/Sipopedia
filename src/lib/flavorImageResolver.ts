export type FlavorImageCategory =
  | "fruit"
  | "floral"
  | "herbal"
  | "spice"
  | "earth"
  | "wood"
  | "sweet"
  | "mineral"
  | "neutral";

const categoryImagePath: Record<FlavorImageCategory, string> = {
  fruit: "/flavor-thumbs/fruit.svg",
  floral: "/flavor-thumbs/floral.svg",
  herbal: "/flavor-thumbs/herbal.svg",
  spice: "/flavor-thumbs/spice.svg",
  earth: "/flavor-thumbs/earth.svg",
  wood: "/flavor-thumbs/wood.svg",
  sweet: "/flavor-thumbs/sweet.svg",
  mineral: "/flavor-thumbs/mineral.svg",
  neutral: "/flavor-thumbs/neutral.svg"
};

const descriptorImageBaseDir = "/flavor-thumbs/by-descriptor";
const descriptorImageOverrides: Record<string, string> = {
  // Keep this explicit so legacy caches don't fallback to the old proxy image.
  elderflower: "elderflower.png"
};

const fruitKeywords = [
  "fruit",
  "berry",
  "apple",
  "pear",
  "peach",
  "nectarine",
  "apricot",
  "plum",
  "cherry",
  "currant",
  "grape",
  "fig",
  "date",
  "orange",
  "lemon",
  "lime",
  "grapefruit",
  "mandarin",
  "kumquat",
  "pomelo",
  "yuzu",
  "banana",
  "mango",
  "pineapple",
  "papaya",
  "lychee",
  "guava",
  "citrus",
  "tropical"
];

const categoryKeywords: Array<{ category: FlavorImageCategory; keywords: string[] }> = [
  {
    category: "floral",
    keywords: [
      "floral",
      "violet",
      "rose",
      "blossom",
      "jasmine",
      "lavender",
      "elderflower",
      "orchid",
      "honeysuckle",
      "lily",
      "gardenia",
      "petal"
    ]
  },
  {
    category: "herbal",
    keywords: ["herbal", "mint", "sage", "thyme", "fennel", "eucalyptus", "leaf", "grass", "nori", "asparagus", "edamame"]
  },
  {
    category: "spice",
    keywords: ["spice", "pepper", "clove", "cinnamon", "anise", "cardamom", "nutmeg", "allspice", "ginger", "coriander"]
  },
  {
    category: "earth",
    keywords: ["earth", "mushroom", "truffle", "forest", "loam", "graphite", "soil", "peat", "ash", "leather", "tobacco"]
  },
  {
    category: "wood",
    keywords: ["oak", "cedar", "toast", "smoke", "char", "resin", "campfire", "wood", "barrel", "brioche"]
  },
  {
    category: "sweet",
    keywords: ["sweet", "honey", "caramel", "toffee", "molasses", "maple", "praline", "vanilla", "sugar", "nougat", "marzipan"]
  },
  {
    category: "mineral",
    keywords: ["mineral", "chalk", "flint", "slate", "stone", "saline", "shell", "sea spray", "wet stone", "river pebble"]
  }
];

function normalizeDescriptor(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ");
}

export function descriptorToSlug(descriptor: string) {
  return normalizeDescriptor(descriptor)
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function detectCategory(normalized: string): FlavorImageCategory {
  if (!normalized) return "neutral";

  for (const keyword of fruitKeywords) {
    if (normalized === keyword || normalized.includes(keyword)) return "fruit";
  }

  for (const entry of categoryKeywords) {
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) return entry.category;
    }
  }

  return "neutral";
}

export function resolveFlavorImagePath(descriptor: string) {
  const slug = descriptorToSlug(descriptor);
  const overrideFilename = descriptorImageOverrides[slug];
  if (overrideFilename) return `${descriptorImageBaseDir}/${overrideFilename}`;
  return `${descriptorImageBaseDir}/${slug}.png`;
}

export function resolveFlavorFallbackPath(descriptor: string) {
  const normalized = normalizeDescriptor(descriptor);
  const category = detectCategory(normalized);
  return categoryImagePath[category] ?? categoryImagePath.neutral;
}
