import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { getGrapeProfile, grapeProfiles, grapeProfilesByColor, type GrapeColor, type GrapeProfile } from "../data/grapes";
import {
  commodityStudyByCommodityAndId,
  commodityStudyProfiles,
  commodityStudyProfilesByCommodity,
  type CommodityId as StudyCommodityId,
  type CommodityStudyProfile
} from "../data/commodityStudies";

type GrapesProps = {
  grapeSlug: string | null;
  onNavigate: (page: "grapes" | `grapes/${string}`) => void;
};

const futureSections = [
  "Additional grapes of importance",
  "Clones",
  "Rootstock",
  "Vine training systems",
  "Canopy and pruning vocabulary"
];

type CommodityId = "grapes" | StudyCommodityId;

type IngredientNode = {
  id: string;
  name: string;
  family: string;
  structure: string;
  tastingNotes: string[];
  styles: string[];
  beverageExamples?: string[];
  relatives: string[];
};

type IngredientMapNode = {
  item: IngredientNode;
  score: number;
  x: number;
  y: number;
  size: number;
  closeness: "nearest" | "near" | "outer";
};

type ReferenceListGroup = {
  title: string;
  items: Array<{ id: string; label: string; route?: string }>;
};

type IngredientImageReference = {
  src: string | null;
  alt: string;
  caption: string;
};

const commodityOptions: Array<{ id: CommodityId; label: string; helper: string; available: boolean }> = [
  { id: "grapes", label: "Grapes", helper: "Wine styles", available: true },
  { id: "grains", label: "Grains", helper: "Beer and spirits base", available: true },
  { id: "hops", label: "Hops", helper: "Beer styles", available: true },
  { id: "coffee", label: "Coffee Beans", helper: "Roast and brew", available: true },
  { id: "tea", label: "Tea", helper: "Oxidation and infusion", available: true },
  { id: "fruit", label: "Other Fruit", helper: "Juice, wine, spirits", available: true }
];

const availableCommodityIds: CommodityId[] = commodityOptions.filter((option) => option.available).map((option) => option.id);

function getShiftedCommodity(current: CommodityId, direction: 1 | -1): CommodityId {
  const currentIndex = availableCommodityIds.indexOf(current);
  if (currentIndex < 0 || availableCommodityIds.length === 0) return "grapes";
  const nextIndex = (currentIndex + direction + availableCommodityIds.length) % availableCommodityIds.length;
  return availableCommodityIds[nextIndex];
}

const wineBaseNodes = grapeProfiles.map((profile) => {
  const familyLead = profile.color === "red" ? "Structured red grape" : "Aromatic white grape";
  return {
    id: profile.slug,
    name: profile.name,
    family: familyLead,
    structure: `${profile.structure.acidity} acidity, ${profile.structure.tanninOrPhenolics}, ${profile.structure.body} body.`,
    tastingNotes: profile.sensoryMarkers.slice(0, 6),
    styles: profile.benchmarkStyles.slice(0, 4)
  };
});

const wineIngredientNodes: IngredientNode[] = wineBaseNodes.map((node) => {
  const nodeProfile = getGrapeProfile(node.id);
  const nodeColor = nodeProfile?.color;
  const relatives = wineBaseNodes
    .filter((candidate) => candidate.id !== node.id && getGrapeProfile(candidate.id)?.color === nodeColor)
    .map((candidate) => {
      const styleOverlap = candidate.styles.filter((style) => node.styles.includes(style)).length;
      const markerOverlap = candidate.tastingNotes.filter((marker) => node.tastingNotes.includes(marker)).length;
      return { id: candidate.id, score: styleOverlap * 2 + markerOverlap };
    })
    .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
    .slice(0, 4)
    .map((item) => item.id);

  return {
    ...node,
    relatives
  };
});

const hopIngredientNodes: IngredientNode[] = [
  {
    id: "cascade",
    name: "Cascade",
    family: "American citrus hop",
    structure: "Moderate bitterness, bright grapefruit aroma, classic pale ale signature.",
    tastingNotes: ["grapefruit", "floral", "pine", "orange peel"],
    styles: ["American Pale Ale", "West Coast IPA", "Amber Ale"],
    relatives: ["centennial", "chinook", "amarillo", "citra"]
  },
  {
    id: "centennial",
    name: "Centennial",
    family: "American citrus hop",
    structure: "High impact citrus-floral hop with clean bittering potential.",
    tastingNotes: ["lemon", "grapefruit", "floral", "resin"],
    styles: ["IPA", "Double IPA", "American Pale Ale"],
    relatives: ["cascade", "chinook", "columbus", "citra"]
  },
  {
    id: "citra",
    name: "Citra",
    family: "Modern tropical hop",
    structure: "High aroma intensity, juicy tropical fruit, soft modern IPA profile.",
    tastingNotes: ["mango", "lime", "passion fruit", "gooseberry"],
    styles: ["Hazy IPA", "American IPA", "Pale Ale"],
    relatives: ["mosaic", "simcoe", "amarillo", "centennial"]
  },
  {
    id: "mosaic",
    name: "Mosaic",
    family: "Modern tropical hop",
    structure: "Layered aroma hop with berry, tropical fruit, citrus, and resin.",
    tastingNotes: ["blueberry", "mango", "tangerine", "pine"],
    styles: ["Hazy IPA", "Double IPA", "Session IPA"],
    relatives: ["citra", "simcoe", "amarillo", "galaxy"]
  },
  {
    id: "simcoe",
    name: "Simcoe",
    family: "Resinous American hop",
    structure: "Firm bitterness and punchy pine, passion fruit, and dank aromatics.",
    tastingNotes: ["pine", "passion fruit", "apricot", "dank resin"],
    styles: ["West Coast IPA", "Double IPA", "Pale Ale"],
    relatives: ["citra", "mosaic", "chinook", "centennial"]
  },
  {
    id: "saaz",
    name: "Saaz",
    family: "Noble hop",
    structure: "Low bitterness, delicate spice, herbal lift, and pilsner precision.",
    tastingNotes: ["herbal", "spice", "earth", "hay"],
    styles: ["Czech Pilsner", "Lager", "Belgian Blonde"],
    relatives: ["hallertau", "tettnang", "spalt", "east-kent-golding"]
  },
  {
    id: "hallertau",
    name: "Hallertau",
    family: "Noble hop",
    structure: "Soft bitterness and elegant floral-herbal aromatics for lager balance.",
    tastingNotes: ["floral", "herbal", "grass", "mild spice"],
    styles: ["Helles", "Pilsner", "Wheat Beer"],
    relatives: ["saaz", "tettnang", "spalt", "east-kent-golding"]
  },
  {
    id: "east-kent-golding",
    name: "East Kent Golding",
    family: "English earthy hop",
    structure: "Gentle bitterness, rounded earthy-floral profile, classic ale balance.",
    tastingNotes: ["earth", "honey", "lavender", "tea"],
    styles: ["English Bitter", "Porter", "English Pale Ale"],
    relatives: ["fuggle", "saaz", "hallertau", "tettnang"]
  },
  {
    id: "fuggle",
    name: "Fuggle",
    family: "English earthy hop",
    structure: "Low to moderate bitterness with woody, earthy, and herbal notes.",
    tastingNotes: ["wood", "earth", "mint", "tea"],
    styles: ["Brown Ale", "Porter", "English Bitter"],
    relatives: ["east-kent-golding", "saaz", "hallertau", "chinook"]
  },
  {
    id: "amarillo",
    name: "Amarillo",
    family: "American orange-citrus hop",
    structure: "Moderate bitterness and vivid orange, floral, and stone fruit aromatics.",
    tastingNotes: ["orange", "apricot", "floral", "grapefruit"],
    styles: ["American Pale Ale", "IPA", "Wheat Ale"],
    relatives: ["cascade", "citra", "mosaic", "centennial"]
  }
];

const studyIngredientNodes: IngredientNode[] = commodityStudyProfiles.map((profile) => ({
  id: `${profile.commodity}/${profile.id}`,
  name: profile.name,
  family: profile.family,
  structure: profile.structureLine,
  tastingNotes: profile.tastingNotes.slice(0, 6),
  styles: profile.benchmarkStyles.slice(0, 4),
  beverageExamples:
    profile.commodity === "fruit"
      ? profile.id === "apple"
        ? ["Martinelli's Apple Juice", "Eden Ciders Dry Cider", "Boulard Calvados VSOP"]
        : profile.id === "pear"
          ? ["R.W. Knudsen Pear Juice", "Eric Bordelet Poire Authentique", "Massenez Poire Williams"]
          : profile.id === "citrus"
            ? ["Natalie's Orange Juice", "Mastro Limoncello", "Cointreau"]
            : profile.id === "stone-fruit"
              ? ["Looza Apricot Nectar", "Takara Plum Wine", "Rothman & Winter Orchard Apricot"]
              : profile.id === "cherry"
                ? ["Lakewood Tart Cherry Juice", "Cherry Kijafa", "Luxardo Maraschino"]
                : profile.id === "berries"
                  ? ["R.W. Knudsen Just Cranberry", "Chateau Diana Blackberry Wine", "Clear Creek Framboise"]
                  : profile.id === "tropical-fruit"
                    ? ["Jumex Mango Nectar", "Lolea Sangria No.2 (fruited wine)", "Giffard Fruit de la Passion"]
                    : profile.id === "pineapple"
                      ? ["DOLE Pineapple Juice", "MauiWine Pineapple Wine", "Plantation Stiggins' Fancy Pineapple Rum"]
                      : profile.id === "pomegranate"
                        ? ["POM Wonderful 100% Pomegranate", "Arak Winery Pomegranate Wine", "PAMA Pomegranate Liqueur"]
                        : profile.id === "quince"
                          ? ["Les Vergers Boiron Quince Nectar", "Bostavan Quince Wine", "Massenez Coing (Quince Liqueur)"]
                          : undefined
      : undefined,
  relatives: commodityStudyProfiles
    .filter((candidate) => candidate.commodity === profile.commodity && candidate.id !== profile.id)
    .slice(0, 4)
    .map((candidate) => `${candidate.commodity}/${candidate.id}`)
}));

const ingredientNodesByCommodity: Record<CommodityId, IngredientNode[]> = {
  grapes: wineIngredientNodes,
  grains: studyIngredientNodes.filter((node) => node.id.startsWith("grains/")),
  hops: studyIngredientNodes.filter((node) => node.id.startsWith("hops/")),
  coffee: studyIngredientNodes.filter((node) => node.id.startsWith("coffee/")),
  tea: studyIngredientNodes.filter((node) => node.id.startsWith("tea/")),
  fruit: studyIngredientNodes.filter((node) => node.id.startsWith("fruit/"))
};
const hopNodesById = new Map(hopIngredientNodes.map((hop) => [hop.id, hop]));

function studyRoute(profile: CommodityStudyProfile) {
  return `grapes/${profile.commodity}/${profile.id}` as const;
}

function makeStudyGroup(title: string, profiles: CommodityStudyProfile[]): ReferenceListGroup {
  return {
    title,
    items: profiles.map((profile) => ({
      id: profile.id,
      label: profile.name,
      route: studyRoute(profile)
    }))
  };
}

function makeFruitCategoryGroup(
  title: string,
  entries: Array<{ label: string; profileId: string }>
): ReferenceListGroup {
  return {
    title,
    items: entries.map((entry, index) => ({
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${entry.profileId}-${index}`,
      label: entry.label,
      route: studyRoute({ commodity: "fruit", id: entry.profileId } as CommodityStudyProfile)
    }))
  };
}

function getReferenceGroups(commodity: CommodityId): ReferenceListGroup[] {
  if (commodity === "grapes") {
    return (["red", "white"] as const).map((color) => ({
      title: color === "red" ? "Red Grapes" : "White Grapes",
      items: grapeProfilesByColor[color].map((grape) => ({
        id: grape.slug,
        label: grape.name,
        route: `grapes/${grape.slug}`
      }))
    }));
  }

  if (commodity === "hops") {
    const hops = commodityStudyProfilesByCommodity.hops;

    return [
      makeStudyGroup(
        "Modern Aroma Hops",
        hops.filter((hop) => /modern|tropical|australian|zealand|coconut|layered/i.test(hop.family))
      ),
      makeStudyGroup(
        "American Citrus, Pine, and Resin Hops",
        hops.filter((hop) => /american|dank|pine/i.test(hop.family))
      ),
      makeStudyGroup(
        "Noble, Continental, and English Hops",
        hops.filter((hop) => /noble|german|english|classic/i.test(hop.family))
      )
    ];
  }

  const profiles = commodityStudyProfilesByCommodity[commodity];

  if (commodity === "grains") {
    return [
      makeStudyGroup(
        "Classic Beer and Spirits Grains",
        profiles.filter((profile) => ["barley", "wheat", "rye", "corn", "rice"].includes(profile.id))
      ),
      makeStudyGroup(
        "Alternative and Heritage Grains",
        profiles.filter((profile) => !["barley", "wheat", "rye", "corn", "rice"].includes(profile.id))
      )
    ];
  }

  if (commodity === "coffee") {
    return [
      makeStudyGroup(
        "Coffee Species",
        profiles.filter((profile) => /species|type/i.test(profile.family))
      ),
      makeStudyGroup(
        "Arabica Cultivars",
        profiles.filter((profile) => /cultivar|hybrid/i.test(profile.family))
      )
    ];
  }

  if (commodity === "tea") {
    return [
      makeStudyGroup(
        "Processing Families",
        profiles.filter((profile) => /oxidized|processed|microbially|mellowed|powdered/i.test(profile.family))
      ),
      makeStudyGroup(
        "Regional and Service Styles",
        profiles.filter((profile) => !/oxidized|processed|microbially|mellowed|powdered/i.test(profile.family))
      )
    ];
  }

  return [
    makeFruitCategoryGroup("Red Fruit", [
      { label: "Cherry", profileId: "cherry" },
      { label: "Pomegranate", profileId: "pomegranate" },
      { label: "Raspberry", profileId: "raspberry" },
      { label: "Strawberry", profileId: "strawberry" },
      { label: "Cranberry", profileId: "cranberry" }
    ]),
    makeFruitCategoryGroup("Blue Fruit", [
      { label: "Blueberry", profileId: "blueberry" },
      { label: "Huckleberry", profileId: "huckleberry" },
      { label: "Bilberry", profileId: "bilberry" },
      { label: "Blueberry Jam", profileId: "blueberry-jam" },
      { label: "Blue-Purple Berry Notes", profileId: "blue-purple-berry-notes" }
    ]),
    makeFruitCategoryGroup("Black Fruit", [
      { label: "Blackberry", profileId: "blackberry" },
      { label: "Black Cherry", profileId: "black-cherry" },
      { label: "Blackcurrant", profileId: "blackcurrant" },
      { label: "Black Plum", profileId: "black-plum" },
      { label: "Blackcurrant-Style Berry", profileId: "blackcurrant-style-berry" }
    ]),
    makeFruitCategoryGroup("Citrus", [
      { label: "Lemon", profileId: "lemon" },
      { label: "Lime", profileId: "lime" },
      { label: "Grapefruit", profileId: "grapefruit" },
      { label: "Orange", profileId: "orange" },
      { label: "Mandarin", profileId: "mandarin" },
      { label: "Yuzu", profileId: "yuzu" }
    ]),
    makeFruitCategoryGroup("Tree Fruit", [
      { label: "Apple", profileId: "apple" },
      { label: "Pear", profileId: "pear" },
      { label: "Quince", profileId: "quince" },
      { label: "Asian Pear", profileId: "asian-pear" },
      { label: "Baked Apple", profileId: "baked-apple" }
    ]),
    makeFruitCategoryGroup("Stone Fruit", [
      { label: "Peach", profileId: "peach" },
      { label: "Apricot", profileId: "apricot" },
      { label: "Plum", profileId: "plum" },
      { label: "Nectarine", profileId: "nectarine" },
      { label: "White Peach", profileId: "white-peach" }
    ]),
    makeFruitCategoryGroup("Tropical Fruit", [
      { label: "Mango", profileId: "mango" },
      { label: "Pineapple", profileId: "pineapple" },
      { label: "Passion Fruit", profileId: "passion-fruit" },
      { label: "Guava", profileId: "guava" },
      { label: "Papaya", profileId: "papaya" },
      { label: "Ripe Banana", profileId: "ripe-banana" }
    ])
  ];
}

function normalizeIngredient(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function ingredientOverlap(left: string[], right: string[], weight: number) {
  const rightSet = new Set(right.map(normalizeIngredient));
  return left.reduce((score, value) => score + (rightSet.has(normalizeIngredient(value)) ? weight : 0), 0);
}

function getCommodityNavigationList(commodity: StudyCommodityId): CommodityStudyProfile[] {
  if (commodity !== "fruit") {
    return commodityStudyProfilesByCommodity[commodity];
  }

  const orderedFruitIds = getReferenceGroups("fruit")
    .flatMap((group) => group.items)
    .filter((item): item is { id: string; label: string; route: string } => Boolean(item.route))
    .map((item) => item.route.split("/").pop())
    .filter((id): id is string => Boolean(id));
  const seen = new Set<string>();
  const orderedFruitProfiles = orderedFruitIds
    .filter((id) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .map((id) => commodityStudyByCommodityAndId.get(`fruit/${id}`))
    .filter((item): item is CommodityStudyProfile => Boolean(item));

  return orderedFruitProfiles.length > 0 ? orderedFruitProfiles : commodityStudyProfilesByCommodity.fruit;
}

function ingredientScore(active: IngredientNode, candidate: IngredientNode) {
  let score = 0;
  if (active.family === candidate.family) score += 5;
  if (active.relatives.includes(candidate.id) || candidate.relatives.includes(active.id)) score += 4.5;
  score += ingredientOverlap(active.tastingNotes, candidate.tastingNotes, 1.6);
  score += ingredientOverlap(active.styles, candidate.styles, 1.2);
  return score;
}

function mapNodeWidthForLabel(label: string, baseSize: number) {
  const longestWord = label.split(/\s+/).reduce((longest, word) => Math.max(longest, word.length), 0);
  const labelBoost = label.length > 14 ? (label.length - 14) * 3.5 : 0;
  const wordBoost = longestWord > 9 ? (longestWord - 9) * 9 : 0;
  return Math.round(Math.max(baseSize, Math.min(220, 92 + label.length * 5.4 + labelBoost + wordBoost)));
}

function ingredientNodeBounds(node: Pick<IngredientMapNode, "x" | "y" | "size">) {
  return {
    halfWidth: Math.min(19, Math.max(7, node.size / 8.8)),
    halfHeight: 5
  };
}

function separateIngredientMapNodes(nodes: IngredientMapNode[]) {
  const centerBounds = { x: 50, y: 50, halfWidth: 16, halfHeight: 9 };
  const placed: IngredientMapNode[] = [];

  nodes.forEach((node) => {
    const next = { ...node };
    const bounds = ingredientNodeBounds(next);

    for (let attempt = 0; attempt < 90; attempt += 1) {
      let moved = false;
      const obstacles = [centerBounds, ...placed.map((item) => ({ ...item, ...ingredientNodeBounds(item) }))];

      obstacles.forEach((obstacle) => {
        const minX = bounds.halfWidth + obstacle.halfWidth + 1.5;
        const minY = bounds.halfHeight + obstacle.halfHeight + 1.2;
        const dx = next.x - obstacle.x;
        const dy = next.y - obstacle.y;
        if (Math.abs(dx) >= minX || Math.abs(dy) >= minY) return;

        const pushX = (minX - Math.abs(dx)) * (dx >= 0 ? 1 : -1);
        const pushY = (minY - Math.abs(dy)) * (dy >= 0 ? 1 : -1);
        if (Math.abs(pushX) < Math.abs(pushY)) {
          next.x += pushX;
        } else {
          next.y += pushY;
        }
        moved = true;
      });

      next.x = Math.max(bounds.halfWidth + 1, Math.min(99 - bounds.halfWidth, next.x));
      next.y = Math.max(bounds.halfHeight + 1, Math.min(99 - bounds.halfHeight, next.y));
      if (!moved) break;
    }

    placed.push(next);
  });

  return placed;
}

function buildIngredientMapNodes(active: IngredientNode, nodes: IngredientNode[]): IngredientMapNode[] {
  const scored = nodes
    .filter((node) => node.id !== active.id)
    .map((node) => ({ item: node, score: ingredientScore(active, node) }))
    .sort((left, right) => right.score - left.score || left.item.name.localeCompare(right.item.name));
  const maxScore = scored[0]?.score || 1;

  const mapped = scored.map((item, index) => {
    const strength = Math.max(0.08, item.score / maxScore);
    const angle = ((index * 137.508 + item.item.name.length * 23) % 360) * (Math.PI / 180);
    const radius = 16 + (1 - strength) * 28 + index * 3.2;
    const closeness: IngredientMapNode["closeness"] = index < 4 ? "nearest" : index < 7 ? "near" : "outer";

    return {
      ...item,
      x: Math.max(10, Math.min(90, 50 + Math.cos(angle) * radius)),
      y: Math.max(12, Math.min(88, 50 + Math.sin(angle) * radius * 0.72)),
      size: mapNodeWidthForLabel(item.item.name, Math.round(100 + strength * 42 - index * 3)),
      closeness
    };
  });

  return separateIngredientMapNodes(mapped);
}

function getIngredientImage(item: IngredientNode, commodity: CommodityId) {
  if (commodity !== "grapes") {
    const studyId = item.id.includes("/") ? item.id : `${commodity}/${item.id}`;
    const profile = commodityStudyByCommodityAndId.get(studyId);
    if (!profile?.imageUrl) return null;
    return {
      src: profile.imageUrl,
      alt: `${profile.name} beverage ingredient reference photo`,
      caption: profile.imageCaption ?? `${profile.name} beverage ingredient reference.`
    };
  }

  const grape = getGrapeProfile(item.id);
  if (!grape) return null;
  return {
    src: grape.staticImageUrl ?? grape.turntableFrameUrls?.[0] ?? grape.turntableImageUrl ?? null,
    alt: `${grape.name} grape cluster reference photo`,
    caption: grape.staticImageCaption ?? `${grape.name} grape cluster reference.`
  };
}

function IngredientPhotoPanel({
  image,
  name,
  label
}: {
  image: IngredientImageReference;
  name: string;
  label: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [image.src]);

  if (!image.src || failed) return null;

  return (
    <figure className="ingredient-photo-panel">
      <img src={image.src} alt={image.alt} loading="lazy" onError={() => setFailed(true)} />
      <figcaption>
        <span>{label}</span>
        <strong>{name}</strong>
        <small>{image.caption}</small>
      </figcaption>
    </figure>
  );
}

function StudyStaticPhotoCard({
  image,
  title,
  kicker
}: {
  image: IngredientImageReference;
  title: string;
  kicker: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [image.src]);

  if (!image.src || failed) return null;

  return (
    <section className="grape-static-photo-card">
      <div>
        <p className="sip-maps-kicker">{kicker}</p>
        <h3>{title}</h3>
        <p>{image.caption}</p>
      </div>
      <img src={image.src} alt={image.alt} onError={() => setFailed(true)} />
    </section>
  );
}

type IngredientTurntableViewerProps = {
  name: string;
  mediaKey: string;
  frameUrls?: string[];
  frameCount?: number;
  frameColumns?: number;
  frameRows?: number;
  sheetUrl?: string;
  placeholderLabel?: string;
};

function IngredientTurntableViewer({
  name,
  mediaKey,
  frameUrls = [],
  frameCount: configuredFrameCount,
  frameColumns,
  frameRows,
  sheetUrl,
  placeholderLabel = "Turntable image queued"
}: IngredientTurntableViewerProps) {
  const frameCount = Math.max(1, frameUrls.length || configuredFrameCount || 1);
  const columns = Math.max(1, frameColumns ?? 1);
  const rows = Math.max(1, frameRows ?? 1);
  const [frameIndex, setFrameIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [imageAvailable, setImageAvailable] = useState(true);
  const dragRef = useRef<{ x: number; remainder: number } | null>(null);
  const pointerMapRef = useRef(new Map<number, { x: number; y: number }>());
  const twoFingerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setFrameIndex(0);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setImageAvailable(true);
    pointerMapRef.current.clear();
    dragRef.current = null;
    twoFingerRef.current = null;
  }, [mediaKey]);

  const clampZoom = (value: number) => Math.min(2.4, Math.max(0.8, value));
  const clampPan = (nextPan: { x: number; y: number }, nextZoom = zoom) => {
    const maxPan = Math.max(0, (nextZoom - 1) * 130);
    return {
      x: Math.max(-maxPan, Math.min(maxPan, nextPan.x)),
      y: Math.max(-maxPan, Math.min(maxPan, nextPan.y))
    };
  };
  const adjustZoom = (delta: number) => {
    setZoom((current) => {
      const nextZoom = clampZoom(current + delta);
      setPan((currentPan) => clampPan(currentPan, nextZoom));
      return nextZoom;
    });
  };
  const rotateFrames = (delta: number) => {
    setFrameIndex((current) => (current + delta + frameCount * 8) % frameCount);
  };
  const getPointerCentroid = () => {
    const points = Array.from(pointerMapRef.current.values());
    if (points.length < 2) return null;
    return {
      x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
      y: points.reduce((sum, point) => sum + point.y, 0) / points.length
    };
  };

  const col = frameIndex % columns;
  const row = Math.floor(frameIndex / columns);
  const backgroundX = columns > 1 ? (col / (columns - 1)) * 100 : 0;
  const backgroundY = rows > 1 ? (row / (rows - 1)) * 100 : 0;
  const turntableStyle: CSSProperties = {
    backgroundImage: sheetUrl ? `url(${sheetUrl})` : undefined,
    backgroundPosition: `${backgroundX}% ${backgroundY}%`,
    backgroundSize: `${columns * 100}% ${rows * 100}%`,
    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
  };
  const activeFrameUrl = frameUrls[frameIndex] ?? null;
  const frameImageStyle: CSSProperties = {
    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
  };

  return (
    <div className="grape-cluster-viewer">
      <div
        className="grape-cluster-orbit"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          pointerMapRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          const centroid = getPointerCentroid();
          if (centroid) {
            twoFingerRef.current = centroid;
            dragRef.current = null;
            return;
          }
          dragRef.current = { x: event.clientX, remainder: 0 };
        }}
        onPointerMove={(event) => {
          if (pointerMapRef.current.has(event.pointerId)) {
            pointerMapRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
          }
          const centroid = getPointerCentroid();
          if (centroid) {
            const previousCentroid = twoFingerRef.current ?? centroid;
            twoFingerRef.current = centroid;
            const dx = centroid.x - previousCentroid.x;
            const dy = centroid.y - previousCentroid.y;
            setPan((current) => clampPan({ x: current.x + dx, y: current.y + dy }));
            return;
          }
          const drag = dragRef.current;
          if (!drag) return;
          const deltaX = event.clientX - drag.x;
          drag.x = event.clientX;
          drag.remainder += deltaX;
          const frameStep = 34;
          if (Math.abs(drag.remainder) < frameStep) return;
          const steps = Math.trunc(drag.remainder / frameStep);
          drag.remainder -= steps * frameStep;
          rotateFrames(-steps);
        }}
        onPointerUp={(event) => {
          pointerMapRef.current.delete(event.pointerId);
          twoFingerRef.current = getPointerCentroid();
          dragRef.current = null;
        }}
        onPointerCancel={(event) => {
          pointerMapRef.current.delete(event.pointerId);
          twoFingerRef.current = getPointerCentroid();
          dragRef.current = null;
        }}
      >
        {activeFrameUrl && imageAvailable ? (
          <>
            <img
              src={activeFrameUrl}
              alt={`${name} rotation frame ${frameIndex + 1} of ${frameCount}`}
              className="grape-cluster-image grape-cluster-frame-image"
              style={frameImageStyle}
              onError={() => setImageAvailable(false)}
              draggable={false}
            />
            <div className="grape-cluster-preload" aria-hidden="true">
              {frameUrls.map((url) => (
                <img key={url} src={url} alt="" />
              ))}
            </div>
          </>
        ) : sheetUrl && imageAvailable ? (
          <>
            <div className="grape-cluster-image grape-cluster-turntable-frame" style={turntableStyle} aria-hidden="true" />
            <img className="grape-cluster-preload" src={sheetUrl} alt="" onError={() => setImageAvailable(false)} />
          </>
        ) : (
          <div className="grape-cluster-placeholder">
            <strong>{name}</strong>
            <span>{placeholderLabel}</span>
          </div>
        )}
      </div>

      <div className="grape-cluster-controls" aria-label={`${name} viewer controls`}>
        <button type="button" onClick={() => rotateFrames(-1)} aria-label="Rotate left">
          &lt;
        </button>
        <button type="button" onClick={() => rotateFrames(1)} aria-label="Rotate right">
          &gt;
        </button>
        <button type="button" onClick={() => adjustZoom(-0.12)} aria-label="Zoom out">
          -
        </button>
        <button type="button" onClick={() => adjustZoom(0.12)} aria-label="Zoom in">
          +
        </button>
        <button
          type="button"
          onClick={() => {
            setFrameIndex(0);
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
        >
          Reset
        </button>
      </div>
      <div className="grape-cluster-hint">Drag left or right to rotate. Use two fingers to pan on mobile. Use + / - controls to zoom.</div>
    </div>
  );
}

function GrapeClusterViewer({ grape }: { grape: GrapeProfile }) {
  return (
    <IngredientTurntableViewer
      name={grape.name}
      mediaKey={grape.slug}
      frameUrls={grape.turntableFrameUrls}
      frameCount={grape.turntableFrameCount}
      frameColumns={grape.turntableFrameColumns}
      frameRows={grape.turntableFrameRows}
      sheetUrl={grape.turntableImageUrl}
    />
  );
}

function CommodityTurntableViewer({ profile }: { profile: CommodityStudyProfile }) {
  return (
    <IngredientTurntableViewer
      name={profile.name}
      mediaKey={`${profile.commodity}/${profile.id}`}
      frameUrls={profile.turntableFrameUrls}
      frameCount={profile.turntableFrameCount}
      placeholderLabel="Three-view image queued"
    />
  );
}

function IngredientRelationshipChart({
  commodity,
  nodes,
  onNavigate
}: {
  commodity: CommodityId;
  nodes: IngredientNode[];
  onNavigate: GrapesProps["onNavigate"];
}) {
  const commoditySingularLabel =
    commodity === "grapes"
      ? "grape"
      : commodity === "grains"
        ? "grain"
        : commodity === "hops"
          ? "hop"
          : commodity === "coffee"
            ? "coffee bean"
              : commodity === "tea"
                ? "tea type"
                : "fruit family";
  const commodityDisplayLabel =
    commodity === "grapes"
      ? "Grape"
      : commodity === "grains"
        ? "Grain"
        : commodity === "hops"
          ? "Hop"
          : commodity === "coffee"
            ? "Coffee Bean"
            : commodity === "tea"
              ? "Tea"
              : "Fruit";
  const mapKickerLabel = commodity === "grapes" ? "Wine Style Map" : `${commodityDisplayLabel} Style Map`;
  const relationshipHeading = `${commodityDisplayLabel} Style Relationships`;
  const selectionPrompt = commodity === "grapes" ? "wine grape" : commoditySingularLabel;
  const selectedLabel =
    commodity === "grapes"
      ? "Selected Wine Grape"
      : commodity === "hops"
        ? "Selected Beer Hop"
        : commodity === "fruit"
          ? "Selected Fruit"
          : `Selected ${commoditySingularLabel}`;
  const [wineColor, setWineColor] = useState<GrapeColor>("red");
  const filteredNodes = useMemo(
    () =>
      commodity === "grapes"
        ? nodes.filter((node) => node.family.toLowerCase().includes(`${wineColor} grape`))
        : nodes,
    [commodity, nodes, wineColor]
  );
  const [activeId, setActiveId] = useState(filteredNodes[0]?.id ?? "");
  const activeItem = filteredNodes.find((node) => node.id === activeId) ?? filteredNodes[0];
  const mapNodes = useMemo(() => (activeItem ? buildIngredientMapNodes(activeItem, filteredNodes) : []), [activeItem, filteredNodes]);
  const nearest = mapNodes.slice(0, 5);

  useEffect(() => {
    setActiveId(filteredNodes[0]?.id ?? "");
  }, [commodity, filteredNodes]);

  if (!activeItem) return null;
  const selectedImage = getIngredientImage(activeItem, commodity);

  return (
    <section className="ingredient-map-panel">
      <div className="ingredient-map-head">
        <div>
          <p className="sip-maps-kicker">{mapKickerLabel}</p>
          <h3>{relationshipHeading}</h3>
          <p>
            Select a {selectionPrompt} to see nearby relatives by style, structure, and tasting markers.
          </p>
        </div>
        <div className="ingredient-map-controls">
          {commodity === "grapes" ? (
            <div className="wine-color-toggle" aria-label="Wine grape color selector">
              {(["red", "white"] as const).map((color) => (
                <button
                  key={color}
                  type="button"
                  className={wineColor === color ? "active" : ""}
                  onClick={() => setWineColor(color)}
                >
                  {color === "red" ? "Red Grapes" : "White Grapes"}
                </button>
              ))}
            </div>
          ) : null}
          <label>
            <span>{`${commodityDisplayLabel} Selector`}</span>
            <select value={activeItem.id} onChange={(event) => setActiveId(event.target.value)}>
              {filteredNodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={`ingredient-map-layout ${selectedImage?.src ? "has-photo" : ""}`}>
        <div className="ingredient-map-stage" aria-label={`${activeItem.name} relationship chart`}>
          <div className="ingredient-map-ring ring-one" />
          <div className="ingredient-map-ring ring-two" />
          <div className="ingredient-map-ring ring-three" />
          {mapNodes.map((node) => (
            <button
              key={node.item.id}
              type="button"
              className={`ingredient-map-node ingredient-map-node-${node.closeness}`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, width: `${node.size}px` }}
              onClick={() => setActiveId(node.item.id)}
            >
              {node.item.name}
              <span>{Math.round(node.score * 10)} affinity</span>
            </button>
          ))}
          <button type="button" className="ingredient-map-node ingredient-map-node-center">
            {activeItem.name}
            <span>{`selected ${commoditySingularLabel}`}</span>
          </button>
        </div>

        {selectedImage?.src ? (
          <IngredientPhotoPanel
            image={selectedImage}
            name={activeItem.name}
            label={`Selected ${commodity === "grapes" ? "Grape" : "Ingredient"} Photo`}
          />
        ) : null}

        <aside className="ingredient-map-detail">
          <p className="sip-maps-kicker">{selectedLabel}</p>
          <h3>{activeItem.name}</h3>
          <dl>
            <div>
              <dt>Family</dt>
              <dd>{activeItem.family}</dd>
            </div>
            <div>
              <dt>Structure</dt>
              <dd>{activeItem.structure}</dd>
            </div>
            <div>
              <dt>Tasting Notes</dt>
              <dd>{activeItem.tastingNotes.join(", ")}</dd>
            </div>
            <div>
              <dt>Styles</dt>
              <dd>{activeItem.styles.join(", ")}</dd>
            </div>
            {commodity === "fruit" && activeItem.beverageExamples && activeItem.beverageExamples.length > 0 ? (
              <div>
                <dt>Examples for Juice/Wine/Spirits</dt>
                <dd>{activeItem.beverageExamples.join(", ")}</dd>
              </div>
            ) : null}
          </dl>
          {commodity !== "grapes" ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (commodity === "fruit") {
                  window.location.hash = "#app/flavor-wheel";
                  return;
                }
                onNavigate(`grapes/${commodity}/${activeItem.id.split("/")[activeItem.id.split("/").length - 1] ?? activeItem.id}`);
              }}
            >
              {commodity === "fruit" ? "Open flavor wheel" : `Open full ${commoditySingularLabel} page`}
            </button>
          ) : null}
          <div className="ingredient-map-nearest">
            <h4>Nearest relatives</h4>
            {nearest.map((node) => (
              <button key={node.item.id} type="button" onClick={() => setActiveId(node.item.id)}>
                <span>{node.item.name}</span>
                <small>{node.item.family}</small>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function HopDetail({ hop, onNavigate }: { hop: IngredientNode; onNavigate: GrapesProps["onNavigate"] }) {
  const hopIndex = hopIngredientNodes.findIndex((item) => item.id === hop.id);
  const previousHop = hopIngredientNodes[(hopIndex - 1 + hopIngredientNodes.length) % hopIngredientNodes.length];
  const nextHop = hopIngredientNodes[(hopIndex + 1) % hopIngredientNodes.length];
  const relatives = hop.relatives.map((id) => hopNodesById.get(id)).filter((item): item is IngredientNode => Boolean(item));
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const goToPreviousHop = useCallback(() => onNavigate(`grapes/hops/${previousHop.id}`), [onNavigate, previousHop.id]);
  const goToNextHop = useCallback(() => onNavigate(`grapes/hops/${nextHop.id}`), [onNavigate, nextHop.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        if (target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select") {
          return;
        }
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onNavigate("grapes/hops");
      } else if (event.ctrlKey && event.key === "ArrowLeft") {
        event.preventDefault();
        const previousCommodity = getShiftedCommodity("hops", -1);
        onNavigate(previousCommodity === "grapes" ? "grapes" : (`grapes/${previousCommodity}` as `grapes/${string}`));
      } else if (event.ctrlKey && event.key === "ArrowRight") {
        event.preventDefault();
        const nextCommodity = getShiftedCommodity("hops", 1);
        onNavigate(nextCommodity === "grapes" ? "grapes" : (`grapes/${nextCommodity}` as `grapes/${string}`));
      } else if (event.key === "ArrowLeft") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToPreviousHop();
      } else if (event.key === "ArrowRight") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToNextHop();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToNextHop, goToPreviousHop, onNavigate]);

  const handleHopTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      swipeStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleHopTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || event.changedTouches.length === 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const horizontalThreshold = 52;
    const horizontalDominance = Math.abs(dy) * 1.2;

    if (Math.abs(dx) < horizontalThreshold) return;
    if (Math.abs(dx) < horizontalDominance) return;

    if (dx < 0) {
      goToNextHop();
    } else {
      goToPreviousHop();
    }
  };

  return (
    <div className="hop-detail-page" onTouchStart={handleHopTouchStart} onTouchEnd={handleHopTouchEnd}>
      <div className="grape-detail-topbar">
        <button type="button" className="btn btn-light" onClick={() => onNavigate("grapes/hops")}>
          Back to Grapes & Grains
        </button>
        <div>
          <button type="button" className="btn btn-light" onClick={goToPreviousHop}>
            Previous Hop
          </button>
          <button type="button" className="btn btn-light" onClick={goToNextHop}>
            Next Hop
          </button>
        </div>
      </div>

      <header className="hop-detail-hero">
        <p className="sip-maps-kicker">Beer Hop Variety</p>
        <h2>{hop.name}</h2>
        <p>{hop.structure}</p>
      </header>

      <section className="grape-snapshot-grid">
        <article>
          <span>Family</span>
          <strong>{hop.family}</strong>
        </article>
        <article>
          <span>Primary Marker</span>
          <strong>{hop.tastingNotes[0]}</strong>
        </article>
        <article>
          <span>Best Style</span>
          <strong>{hop.styles[0]}</strong>
        </article>
        <article>
          <span>Study Role</span>
          <strong>{hop.family.includes("Noble") || hop.family.includes("English") ? "Classic balance" : "Aroma impact"}</strong>
        </article>
      </section>

      <section className="grape-study-grid">
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Structure</p>
          <h3>Brewing Role</h3>
          <p>{hop.structure}</p>
        </article>
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Tasting</p>
          <h3>Sensory Markers</h3>
          <p>{hop.tastingNotes.join(", ")}</p>
        </article>
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Styles</p>
          <h3>Common Beer Styles</h3>
          <p>{hop.styles.join(", ")}</p>
        </article>
      </section>

      <div className="grape-reference-layout">
        <article className="grape-reference-card">
          <h3>Related Hops</h3>
          <div>
            {relatives.map((relative) => (
              <button key={relative.id} type="button" className="hop-reference-link" onClick={() => onNavigate(`grapes/hops/${relative.id}`)}>
                {relative.name}
              </button>
            ))}
          </div>
        </article>
        <article className="grape-reference-card">
          <h3>Exam Keys</h3>
          <ul>
            <li>Family: {hop.family}.</li>
            <li>Markers: {hop.tastingNotes.join(", ")}.</li>
            <li>Useful in: {hop.styles.join(", ")}.</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

function GrapeIndex({ onNavigate, initialCommodity }: { onNavigate: GrapesProps["onNavigate"]; initialCommodity: CommodityId }) {
  const [commodity, setCommodity] = useState<CommodityId>(initialCommodity);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastVarietyRouteByCommodityRef = useRef<Partial<Record<CommodityId, string>>>({});
  const availableCommodities = useMemo(() => commodityOptions.filter((option) => option.available).map((option) => option.id), []);
  const chartCommodity = commodity;
  const chartNodes = ingredientNodesByCommodity[chartCommodity];
  const referenceGroups = getReferenceGroups(commodity);
  const varietyRoutes = useMemo(
    () =>
      referenceGroups
        .flatMap((group) => group.items)
        .map((item) => item.route)
        .filter((route): route is string => Boolean(route)),
    [referenceGroups]
  );
  const activeCommodityLabel = commodityOptions.find((option) => option.id === commodity)?.label ?? "Grapes";
  const commodityIndex = availableCommodities.indexOf(commodity);
  const setCommodityWithRoute = useCallback(
    (nextCommodity: CommodityId) => {
      setCommodity(nextCommodity);
      onNavigate(nextCommodity === "grapes" ? "grapes" : (`grapes/${nextCommodity}` as `grapes/${string}`));
    },
    [onNavigate]
  );

  useEffect(() => {
    setCommodity(initialCommodity);
  }, [initialCommodity]);

  const goToPreviousCommodity = useCallback(() => {
    if (commodityIndex < 0 || availableCommodities.length < 2) return;
    const previousIndex = (commodityIndex - 1 + availableCommodities.length) % availableCommodities.length;
    setCommodityWithRoute(availableCommodities[previousIndex]);
  }, [availableCommodities, commodityIndex, setCommodityWithRoute]);

  const goToNextCommodity = useCallback(() => {
    if (commodityIndex < 0 || availableCommodities.length < 2) return;
    const nextIndex = (commodityIndex + 1) % availableCommodities.length;
    setCommodityWithRoute(availableCommodities[nextIndex]);
  }, [availableCommodities, commodityIndex, setCommodityWithRoute]);

  const goToPreviousVariety = useCallback(() => {
    if (varietyRoutes.length === 0) return;
    const lastRoute = lastVarietyRouteByCommodityRef.current[commodity];
    const currentIndex = lastRoute ? varietyRoutes.indexOf(lastRoute) : -1;
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const previousIndex = (safeIndex - 1 + varietyRoutes.length) % varietyRoutes.length;
    const nextRoute = varietyRoutes[previousIndex];
    lastVarietyRouteByCommodityRef.current[commodity] = nextRoute;
    onNavigate(nextRoute as `grapes/${string}`);
  }, [commodity, onNavigate, varietyRoutes]);

  const goToNextVariety = useCallback(() => {
    if (varietyRoutes.length === 0) return;
    const lastRoute = lastVarietyRouteByCommodityRef.current[commodity];
    const currentIndex = lastRoute ? varietyRoutes.indexOf(lastRoute) : -1;
    const safeIndex = currentIndex >= 0 ? currentIndex : -1;
    const nextIndex = (safeIndex + 1 + varietyRoutes.length) % varietyRoutes.length;
    const nextRoute = varietyRoutes[nextIndex];
    lastVarietyRouteByCommodityRef.current[commodity] = nextRoute;
    onNavigate(nextRoute as `grapes/${string}`);
  }, [commodity, onNavigate, varietyRoutes]);

  useEffect(() => {
    if (varietyRoutes.length === 0) return;
    if (!lastVarietyRouteByCommodityRef.current[commodity]) {
      lastVarietyRouteByCommodityRef.current[commodity] = varietyRoutes[0];
    }
  }, [commodity, varietyRoutes]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        if (target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select") {
          return;
        }
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setCommodityWithRoute("grapes");
      } else if (event.ctrlKey && event.key === "ArrowLeft") {
        event.preventDefault();
        goToPreviousVariety();
      } else if (event.ctrlKey && event.key === "ArrowRight") {
        event.preventDefault();
        goToNextVariety();
      } else if (event.key === "ArrowLeft") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToPreviousCommodity();
      } else if (event.key === "ArrowRight") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToNextCommodity();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToNextCommodity, goToPreviousCommodity, goToNextVariety, goToPreviousVariety, setCommodityWithRoute]);

  const handleCommodityIndexTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      swipeStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleCommodityIndexTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || event.changedTouches.length === 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const horizontalThreshold = 52;
    const horizontalDominance = Math.abs(dy) * 1.2;

    if (Math.abs(dx) < horizontalThreshold) return;
    if (Math.abs(dx) < horizontalDominance) return;

    if (dx < 0) {
      goToNextCommodity();
    } else {
      goToPreviousCommodity();
    }
  };

  return (
    <div onTouchStart={handleCommodityIndexTouchStart} onTouchEnd={handleCommodityIndexTouchEnd}>
      <header className="grapes-hero">
        <p className="sip-maps-kicker">Grapes & Grains</p>
        <h2>{commodity === "grapes" ? "Core Grape Reference" : `${activeCommodityLabel} Reference`}</h2>
        <p>
          {commodity === "grapes"
            ? "The foundational wine grapes for certification study, organized by red and white varieties, then alphabetically."
            : commodity === "hops"
              ? "Core beer hops organized by modern American aroma hops and classic noble or English families."
              : commodity === "grains"
                ? "Core grain references with beer and spirits reasoning layers."
                : commodity === "coffee"
                  ? "Coffee bean references with sensory, processing, and extraction depth."
                  : commodity === "tea"
                    ? "Tea references organized by oxidation and infusion logic."
                    : "Fruit references mapped across juice, wine, and spirits use cases."}
        </p>
      </header>

      <section className="commodity-selector" aria-label="Base beverage ingredient selector">
        <div>
          <p className="sip-maps-kicker">Base Beverage Ingredients</p>
          <h3>Select a Commodity</h3>
        </div>
        <div className="commodity-selector-grid">
          {commodityOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={option.id === commodity ? "active" : ""}
              disabled={!option.available}
              onClick={() => setCommodityWithRoute(option.id)}
            >
              <span>{option.label}</span>
              <small>{option.available ? option.helper : "Queued"}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="grapes-layout">
        {referenceGroups.map((group) => (
          <article
            className={`grapes-card ${commodity === "fruit" ? `fruit-category-card fruit-category-card-${group.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}` : ""}`}
            key={group.title}
          >
            <div className="grapes-card-head">
              <h3>{group.title}</h3>
              <span>{group.items.length}</span>
            </div>
            <ol className="grapes-list">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    disabled={!item.route}
                    onClick={() => {
                      if (item.route) {
                        lastVarietyRouteByCommodityRef.current[commodity] = item.route;
                        onNavigate(item.route as `grapes/${string}`);
                      }
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <IngredientRelationshipChart commodity={chartCommodity} nodes={chartNodes} onNavigate={onNavigate} />

      <section className="grapes-future">
        <p className="sip-maps-kicker">Coming Next</p>
        <h3>Viticulture Expansion</h3>
        <div className="grapes-future-grid">
          {futureSections.map((section) => (
            <span key={section}>{section}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function GrapeDetail({ grape, onNavigate }: { grape: GrapeProfile; onNavigate: GrapesProps["onNavigate"] }) {
  const grapeIndex = useMemo(() => grapeProfiles.findIndex((item) => item.slug === grape.slug), [grape.slug]);
  const previousGrape = grapeProfiles[(grapeIndex - 1 + grapeProfiles.length) % grapeProfiles.length];
  const nextGrape = grapeProfiles[(grapeIndex + 1) % grapeProfiles.length];
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const goToPreviousGrape = useCallback(() => onNavigate(`grapes/${previousGrape.slug}`), [onNavigate, previousGrape.slug]);
  const goToNextGrape = useCallback(() => onNavigate(`grapes/${nextGrape.slug}`), [onNavigate, nextGrape.slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        if (target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select") {
          return;
        }
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onNavigate("grapes");
      } else if (event.ctrlKey && event.key === "ArrowLeft") {
        event.preventDefault();
        const previousCommodity = getShiftedCommodity("grapes", -1);
        onNavigate(previousCommodity === "grapes" ? "grapes" : (`grapes/${previousCommodity}` as `grapes/${string}`));
      } else if (event.ctrlKey && event.key === "ArrowRight") {
        event.preventDefault();
        const nextCommodity = getShiftedCommodity("grapes", 1);
        onNavigate(nextCommodity === "grapes" ? "grapes" : (`grapes/${nextCommodity}` as `grapes/${string}`));
      } else if (event.key === "ArrowLeft") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToPreviousGrape();
      } else if (event.key === "ArrowRight") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToNextGrape();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToNextGrape, goToPreviousGrape, onNavigate]);

  const handleGrapeTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest(".grape-cluster-viewer")) {
      swipeStartRef.current = null;
      return;
    }

    if (event.touches.length !== 1) {
      swipeStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleGrapeTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || event.changedTouches.length === 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const horizontalThreshold = 52;
    const horizontalDominance = Math.abs(dy) * 1.2;

    if (Math.abs(dx) < horizontalThreshold) return;
    if (Math.abs(dx) < horizontalDominance) return;

    if (dx < 0) {
      goToNextGrape();
    } else {
      goToPreviousGrape();
    }
  };

  return (
    <div className="grape-detail-page" onTouchStart={handleGrapeTouchStart} onTouchEnd={handleGrapeTouchEnd}>
      <div className="grape-detail-topbar">
        <button type="button" className="btn btn-light" onClick={() => onNavigate("grapes")}>
          Back to Grapes
        </button>
        <div>
          <button type="button" className="btn btn-light" onClick={goToPreviousGrape}>
            Previous
          </button>
          <button type="button" className="btn btn-light" onClick={goToNextGrape}>
            Next
          </button>
        </div>
      </div>

      <header className={`grape-detail-hero grape-detail-hero--${grape.color}`}>
        <div>
          <p className="sip-maps-kicker">{grape.color === "red" ? "Red Grape" : "White Grape"}</p>
          <h2>{grape.name}</h2>
          <p>{grape.headline}</p>
          <div className="grape-origin-line">
            <strong>Origin:</strong> {grape.origin}
          </div>
        </div>
        <GrapeClusterViewer grape={grape} />
      </header>

      <section className="grape-snapshot-grid">
        <article>
          <span>Acidity</span>
          <strong>{grape.structure.acidity}</strong>
        </article>
        <article>
          <span>{grape.color === "red" ? "Tannin" : "Phenolics"}</span>
          <strong>{grape.structure.tanninOrPhenolics}</strong>
        </article>
        <article>
          <span>Body</span>
          <strong>{grape.structure.body}</strong>
        </article>
        <article>
          <span>Alcohol</span>
          <strong>{grape.structure.alcohol}</strong>
        </article>
      </section>

      {grape.staticImageUrl ? (
        <section className="grape-static-photo-card">
          <div>
            <p className="sip-maps-kicker">Static Cluster Reference</p>
            <h3>{grape.name} Photo Study</h3>
            <p>{grape.staticImageCaption ?? `Reference photo for studying ${grape.name} cluster appearance.`}</p>
          </div>
          <img src={grape.staticImageUrl} alt={`${grape.name} static grape cluster reference`} />
        </section>
      ) : null}

      <section className="grape-study-grid">
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Beginner</p>
          <h3>Recognition Foundation</h3>
          {grape.beginner.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Advanced</p>
          <h3>Viticulture and Style Logic</h3>
          {grape.advanced.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Pro</p>
          <h3>Exam and Blind Tasting Command</h3>
          {grape.pro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      <div className="grape-reference-layout">
        <article className="grape-reference-card">
          <h3>Classic Regions</h3>
          <div>
            {grape.classicRegions.map((region) => (
              <span key={region}>{region}</span>
            ))}
          </div>
        </article>
        <article className="grape-reference-card">
          <h3>Benchmark Styles</h3>
          <div>
            {grape.benchmarkStyles.map((style) => (
              <span key={style}>{style}</span>
            ))}
          </div>
        </article>
        <article className="grape-reference-card">
          <h3>Sensory Markers</h3>
          <div>
            {grape.sensoryMarkers.map((marker) => (
              <span key={marker}>{marker}</span>
            ))}
          </div>
        </article>
        <article className="grape-reference-card">
          <h3>Exam Keys</h3>
          <ul>
            {grape.examKeys.map((keyPoint) => (
              <li key={keyPoint}>{keyPoint}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

function CommodityDetail({ profile, onNavigate }: { profile: CommodityStudyProfile; onNavigate: GrapesProps["onNavigate"] }) {
  const list = getCommodityNavigationList(profile.commodity);
  const index = list.findIndex((item) => item.id === profile.id);
  const safeIndex = index >= 0 ? index : 0;
  const previous = list[(safeIndex - 1 + list.length) % list.length];
  const next = list[(safeIndex + 1) % list.length];
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const goToPrevious = useCallback(() => onNavigate(`grapes/${profile.commodity}/${previous.id}`), [onNavigate, profile.commodity, previous.id]);
  const goToNext = useCallback(() => onNavigate(`grapes/${profile.commodity}/${next.id}`), [onNavigate, profile.commodity, next.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        if (target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select") {
          return;
        }
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onNavigate(`grapes/${profile.commodity}`);
      } else if (event.ctrlKey && event.key === "ArrowLeft") {
        event.preventDefault();
        const previousCommodity = getShiftedCommodity(profile.commodity as CommodityId, -1);
        onNavigate(previousCommodity === "grapes" ? "grapes" : (`grapes/${previousCommodity}` as `grapes/${string}`));
      } else if (event.ctrlKey && event.key === "ArrowRight") {
        event.preventDefault();
        const nextCommodity = getShiftedCommodity(profile.commodity as CommodityId, 1);
        onNavigate(nextCommodity === "grapes" ? "grapes" : (`grapes/${nextCommodity}` as `grapes/${string}`));
      } else if (event.key === "ArrowLeft") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        if (target?.tagName.toLowerCase() === "button") return;
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToNext, goToPrevious, onNavigate]);

  const handleCommodityTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest(".grape-cluster-viewer")) {
      swipeStartRef.current = null;
      return;
    }

    if (event.touches.length !== 1) {
      swipeStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleCommodityTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || event.changedTouches.length === 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const horizontalThreshold = 52;
    const horizontalDominance = Math.abs(dy) * 1.2;

    if (Math.abs(dx) < horizontalThreshold) return;
    if (Math.abs(dx) < horizontalDominance) return;

    if (dx < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  return (
    <div className="grape-detail-page" onTouchStart={handleCommodityTouchStart} onTouchEnd={handleCommodityTouchEnd}>
      <div className="grape-detail-topbar">
        <button type="button" className="btn btn-light" onClick={() => onNavigate(`grapes/${profile.commodity}`)}>
          Back to Grapes & Grains
        </button>
        <div>
          <button type="button" className="btn btn-light" onClick={goToPrevious}>
            Previous
          </button>
          <button type="button" className="btn btn-light" onClick={goToNext}>
            Next
          </button>
        </div>
      </div>

      <header className="grape-detail-hero">
        <div>
          <p className="sip-maps-kicker">{profile.commodity.toUpperCase()} STUDY TRACK</p>
          <h2>{profile.name}</h2>
          <p>{profile.headline}</p>
          <div className="grape-origin-line">
            <strong>Origin:</strong> {profile.origin}
          </div>
        </div>
        <CommodityTurntableViewer profile={profile} />
      </header>

      <section className="grape-snapshot-grid">
        <article>
          <span>Commodity</span>
          <strong>{profile.commodity}</strong>
        </article>
        <article>
          <span>Family</span>
          <strong>{profile.family}</strong>
        </article>
        <article>
          <span>Structure</span>
          <strong>{profile.structureLine}</strong>
        </article>
        <article>
          <span>Core Marker</span>
          <strong>{profile.tastingNotes[0]}</strong>
        </article>
      </section>

      {profile.imageUrl ? (
        <StudyStaticPhotoCard
          image={{
            src: profile.imageUrl,
            alt: `${profile.name} beverage ingredient reference`,
            caption: profile.imageCaption ?? `Reference photo for studying ${profile.name}.`
          }}
          title={`${profile.name} Photo Study`}
          kicker="Static Ingredient Reference"
        />
      ) : null}

      <section className="grape-study-grid">
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Beginner</p>
          <h3>Recognition Foundation</h3>
          {profile.beginner.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Advanced</p>
          <h3>Production and Style Logic</h3>
          {profile.advanced.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <article className="grape-study-card">
          <p className="sip-maps-kicker">Pro</p>
          <h3>Exam and Service Command</h3>
          {profile.pro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      {profile.beverageFocus && profile.beverageFocus.length > 0 ? (
        <section className="grape-reference-layout">
          {profile.beverageFocus.map((focus) => (
            <article className="grape-reference-card" key={focus.title}>
              <h3>{focus.title}</h3>
              <ul>
                {focus.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      ) : null}

      <div className="grape-reference-layout">
        <article className="grape-reference-card">
          <h3>Benchmark Styles</h3>
          <div>
            {profile.benchmarkStyles.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
        <article className="grape-reference-card">
          <h3>Sensory Markers</h3>
          <div>
            {profile.tastingNotes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
        <article className="grape-reference-card">
          <h3>Exam Keys</h3>
          <ul>
            {profile.examKeys.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="grape-reference-card">
          <h3>Technical References</h3>
          <div>
            {profile.references.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

export function Grapes({ grapeSlug, onNavigate }: GrapesProps) {
  const split = grapeSlug?.split("/") ?? [];
  const commodityRouteSet = new Set<CommodityId>(["grapes", "grains", "hops", "coffee", "tea", "fruit"]);
  const commodityPrefix = split.length > 1 ? (split[0] as StudyCommodityId) : null;
  const commodityId = split.length > 1 ? split.slice(1).join("/") : null;
  const indexCommodity = split.length === 1 && commodityRouteSet.has(split[0] as CommodityId) ? (split[0] as CommodityId) : "grapes";
  const hopId = grapeSlug?.startsWith("hops/") ? grapeSlug.slice("hops/".length) : null;
  const commodityStudy = commodityPrefix && commodityId ? commodityStudyByCommodityAndId.get(`${commodityPrefix}/${commodityId}`) ?? null : null;
  const hop = hopId ? hopNodesById.get(hopId) ?? null : null;
  const grape = hopId || commodityStudy ? null : getGrapeProfile(grapeSlug);

  return (
    <section className="grapes-page">
      {commodityStudy ? (
        <CommodityDetail profile={commodityStudy} onNavigate={onNavigate} />
      ) : hop ? (
        <HopDetail hop={hop} onNavigate={onNavigate} />
      ) : grapeSlug && !grape && !(split.length === 1 && commodityRouteSet.has(split[0] as CommodityId)) ? (
        <article className="grapes-card">
          <h2>{hopId ? "Hop not found" : "Study page not found"}</h2>
          <p>The selected page is not available yet.</p>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate("grapes")}>
            Back to Grapes & Grains
          </button>
        </article>
      ) : grape ? (
        <GrapeDetail grape={grape} onNavigate={onNavigate} />
      ) : (
        <GrapeIndex onNavigate={onNavigate} initialCommodity={indexCommodity} />
      )}
    </section>
  );
}
