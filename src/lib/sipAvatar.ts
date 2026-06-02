type AvatarSpriteOption = {
  id: string;
  family: string;
  label: string;
  detail: string;
  src: string;
  baseSrc?: string;
  studioCharacterId?: string;
  defaultHairStyle?: AvatarHairStyle;
  defaultHair?: string;
  defaultSkin?: string;
  defaultAccessory?: AvatarAccessory;
};

const characterStudioBase = "/game/sprites/Character_Studio";

export const avatarSpriteOptions = [
  {
    id: "zuriStudio",
    family: "studio",
    label: "Zuri",
    detail: "Fermentation mentor with locs and gold accents.",
    src: `${characterStudioBase}/portraits/zuri.png`,
    baseSrc: `${characterStudioBase}/bases/frames/zuri/zuri-base-gesture-01.png`,
    studioCharacterId: "zuri",
    defaultHairStyle: "locs",
    defaultHair: "#17100d",
    defaultSkin: "#6f3f32",
    defaultAccessory: "earrings"
  },
  {
    id: "ashaStudio",
    family: "studio",
    label: "Asha",
    detail: "Tea and study guide with braid and book gestures.",
    src: `${characterStudioBase}/portraits/asha.png`,
    baseSrc: `${characterStudioBase}/bases/frames/asha/asha-base-gesture-01.png`,
    studioCharacterId: "asha",
    defaultHairStyle: "long-braid",
    defaultHair: "#21110f",
    defaultSkin: "#9b6546",
    defaultAccessory: "freckles"
  },
  {
    id: "mateoStudio",
    family: "studio",
    label: "Mateo",
    detail: "Brewery coffee coach with a curly fade.",
    src: `${characterStudioBase}/portraits/mateo.png`,
    baseSrc: `${characterStudioBase}/bases/frames/mateo/mateo-base-gesture-01.png`,
    studioCharacterId: "mateo",
    defaultHairStyle: "curly-fade",
    defaultHair: "#3a1f17",
    defaultSkin: "#b87955",
    defaultAccessory: "short-beard"
  },
  {
    id: "noorStudio",
    family: "studio",
    label: "Noor",
    detail: "Water and maps tutor with headscarf and hearing aid.",
    src: `${characterStudioBase}/portraits/noor.png`,
    baseSrc: `${characterStudioBase}/bases/frames/noor/noor-base-gesture-01.png`,
    studioCharacterId: "noor",
    defaultHairStyle: "headscarf",
    defaultHair: "#386b7a",
    defaultSkin: "#8f654f",
    defaultAccessory: "hearing-aid"
  },
  {
    id: "kenjiStudio",
    family: "studio",
    label: "Kenji",
    detail: "Spirits archive mentor with silver swept hair.",
    src: `${characterStudioBase}/portraits/kenji.png`,
    baseSrc: `${characterStudioBase}/bases/frames/kenji/kenji-base-gesture-01.png`,
    studioCharacterId: "kenji",
    defaultHairStyle: "silver-sweep",
    defaultHair: "#d8d2bf",
    defaultSkin: "#d6a47f",
    defaultAccessory: "square-glasses"
  },
  {
    id: "elaraStudio",
    family: "studio",
    label: "Elara",
    detail: "Wine map researcher with bob hair and freckles.",
    src: `${characterStudioBase}/portraits/elara.png`,
    baseSrc: `${characterStudioBase}/bases/frames/elara/elara-base-gesture-01.png`,
    studioCharacterId: "elara",
    defaultHairStyle: "bob",
    defaultHair: "#a64629",
    defaultSkin: "#f0bd92",
    defaultAccessory: "freckles"
  },
  {
    id: "kaiStudio",
    family: "studio",
    label: "Kai",
    detail: "Sensory field captain with top knot and prosthetic leg.",
    src: `${characterStudioBase}/portraits/kai.png`,
    baseSrc: `${characterStudioBase}/bases/frames/kai/kai-base-gesture-01.png`,
    studioCharacterId: "kai",
    defaultHairStyle: "top-knot",
    defaultHair: "#12100e",
    defaultSkin: "#7c5040",
    defaultAccessory: "glasses"
  },
  {
    id: "raeStudio",
    family: "studio",
    label: "Rae",
    detail: "Coffee library strategist with coils and mobility chair.",
    src: `${characterStudioBase}/portraits/rae.png`,
    baseSrc: `${characterStudioBase}/bases/frames/rae/rae-base-gesture-01.png`,
    studioCharacterId: "rae",
    defaultHairStyle: "coils",
    defaultHair: "#0f0d0c",
    defaultSkin: "#5f3a31",
    defaultAccessory: "glasses"
  },
  {
    id: "miraStudio",
    family: "studio",
    label: "Mira",
    detail: "Sensory-study mentor with afro puffs and gold accents.",
    src: `${characterStudioBase}/portraits/mira.png`,
    baseSrc: `${characterStudioBase}/bases/frames/mira/mira-base-gesture-01.png`,
    studioCharacterId: "mira",
    defaultHairStyle: "afro-puffs",
    defaultHair: "#2a1510",
    defaultSkin: "#8f553e",
    defaultAccessory: "earrings"
  },
  {
    id: "julesStudio",
    family: "studio",
    label: "Jules",
    detail: "Beer and coffee study coach with wavy hair and glasses.",
    src: `${characterStudioBase}/portraits/jules.png`,
    baseSrc: `${characterStudioBase}/bases/frames/jules/jules-base-gesture-01.png`,
    studioCharacterId: "jules",
    defaultHairStyle: "wavy-long",
    defaultHair: "#5a2e1f",
    defaultSkin: "#c78a63",
    defaultAccessory: "glasses"
  },
  {
    id: "santiStudio",
    family: "studio",
    label: "Santi",
    detail: "Spirits and maps archive guide with a soft beard.",
    src: `${characterStudioBase}/portraits/santi.png`,
    baseSrc: `${characterStudioBase}/bases/frames/santi/santi-base-gesture-01.png`,
    studioCharacterId: "santi",
    defaultHairStyle: "buzzcut",
    defaultHair: "#1f1713",
    defaultSkin: "#b77752",
    defaultAccessory: "short-beard"
  },
  {
    id: "priyaStudio",
    family: "studio",
    label: "Priya",
    detail: "Tea, water, and wine learning guide with a long braid.",
    src: `${characterStudioBase}/portraits/priya.png`,
    baseSrc: `${characterStudioBase}/bases/frames/priya/priya-base-gesture-01.png`,
    studioCharacterId: "priya",
    defaultHairStyle: "long-braid",
    defaultHair: "#22110f",
    defaultSkin: "#9f6748",
    defaultAccessory: "earrings"
  },
  { id: "sippyWine", family: "sippy", label: "Sippy Wine", detail: "Wine guide with raised glass.", src: "/game/sprites/characters/main-5.png" },
  { id: "sippyBeer", family: "sippy", label: "Sippy Beer", detail: "Beer track tasting pose.", src: "/game/sprites/characters/beer-4.png" },
  { id: "sippyBeerGesture", family: "sippy", label: "Sippy Beer Coach", detail: "Beer track lesson gesture.", src: "/game/sprites/characters/beer-5.png" },
  { id: "sippySpark", family: "sippy", label: "Sippy Sparkling", detail: "Sparkling track celebration.", src: "/game/sprites/characters/spark-4.png" },
  { id: "sippySparkGesture", family: "sippy", label: "Sippy Spark Coach", detail: "Sparkling track guide pose.", src: "/game/sprites/characters/spark-5.png" },
  { id: "sippySpirit", family: "sippy", label: "Sippy Spirits", detail: "Spirits track tasting pose.", src: "/game/sprites/characters/spirit-4.png" },
  { id: "sippySpiritGesture", family: "sippy", label: "Sippy Spirit Coach", detail: "Spirits track lesson gesture.", src: "/game/sprites/characters/spirit-5.png" },
  { id: "romaWine", family: "roma", label: "Roma Wine", detail: "Sensory coach with wine glass.", src: "/game/sprites/characters/roma-0.png" },
  { id: "romaWineLeaf", family: "roma", label: "Roma Vineyard", detail: "Wine region and vineyard pose.", src: "/game/sprites/characters/roma-2.png" },
  { id: "romaBeer", family: "roma", label: "Roma Beer", detail: "Beer track tasting pose.", src: "/game/sprites/characters/beer-0.png" },
  { id: "romaBeerClipboard", family: "roma", label: "Roma Beer Notes", detail: "Beer track clipboard pose.", src: "/game/sprites/characters/beer-1.png" },
  { id: "romaSpark", family: "roma", label: "Roma Sparkling", detail: "Sparkling track tasting pose.", src: "/game/sprites/characters/spark-0.png" },
  { id: "romaSparkClipboard", family: "roma", label: "Roma Spark Notes", detail: "Sparkling track clipboard pose.", src: "/game/sprites/characters/spark-1.png" },
  { id: "romaSpirit", family: "roma", label: "Roma Spirits", detail: "Spirits track tasting pose.", src: "/game/sprites/characters/spirit-0.png" },
  { id: "romaSpiritClipboard", family: "roma", label: "Roma Spirit Notes", detail: "Spirits track clipboard pose.", src: "/game/sprites/characters/spirit-1.png" },
  { id: "humminWineBook", family: "hummin", label: "Hummin Wine", detail: "Book-ready wine study guide.", src: "/game/sprites/characters/main-3.png" },
  { id: "humminBeer", family: "hummin", label: "Hummin Beer", detail: "Robot beer tasting pose.", src: "/game/sprites/characters/beer-2.png" },
  { id: "humminBeerBook", family: "hummin", label: "Hummin Beer Notes", detail: "Robot beer workbook pose.", src: "/game/sprites/characters/beer-3.png" },
  { id: "humminSpark", family: "hummin", label: "Hummin Sparkling", detail: "Robot sparkling tasting pose.", src: "/game/sprites/characters/spark-2.png" },
  { id: "humminSparkBook", family: "hummin", label: "Hummin Spark Notes", detail: "Robot sparkling workbook pose.", src: "/game/sprites/characters/spark-3.png" },
  { id: "humminSpirit", family: "hummin", label: "Hummin Spirits", detail: "Robot spirits tasting pose.", src: "/game/sprites/characters/spirit-2.png" },
  { id: "humminSpiritBook", family: "hummin", label: "Hummin Spirit Notes", detail: "Robot spirits workbook pose.", src: "/game/sprites/characters/spirit-3.png" },
  { id: "ariaWine", family: "support", label: "Aria Wine", detail: "Production expert with wine glass.", src: "/game/sprites/characters/support-0.png" },
  { id: "brunoBeer", family: "support", label: "Bruno Beer", detail: "Brewery expert support pose.", src: "/game/sprites/characters/support-2.png" },
  { id: "solSpirit", family: "support", label: "Sol Spirits", detail: "Distillery expert support pose.", src: "/game/sprites/characters/support-4.png" },
  { id: "main0", family: "extras", label: "Wine Sprite 0", detail: "Additional wine-track character sprite.", src: "/game/sprites/characters/main-0.png" },
  { id: "main1", family: "extras", label: "Wine Sprite 1", detail: "Additional wine-track character sprite.", src: "/game/sprites/characters/main-1.png" },
  { id: "main2", family: "extras", label: "Wine Sprite 2", detail: "Additional wine-track character sprite.", src: "/game/sprites/characters/main-2.png" },
  { id: "main4", family: "extras", label: "Wine Sprite 4", detail: "Additional wine-track character sprite.", src: "/game/sprites/characters/main-4.png" },
  { id: "roma1", family: "extras", label: "Roma Sprite 1", detail: "Additional Roma character sprite.", src: "/game/sprites/characters/roma-1.png" },
  { id: "roma3", family: "extras", label: "Roma Sprite 3", detail: "Additional Roma character sprite.", src: "/game/sprites/characters/roma-3.png" },
  { id: "roma4", family: "extras", label: "Roma Sprite 4", detail: "Additional Roma character sprite.", src: "/game/sprites/characters/roma-4.png" },
  { id: "roma5", family: "extras", label: "Roma Sprite 5", detail: "Additional Roma character sprite.", src: "/game/sprites/characters/roma-5.png" },
  { id: "support1", family: "extras", label: "Support Sprite 1", detail: "Additional support character sprite.", src: "/game/sprites/characters/support-1.png" },
  { id: "support3", family: "extras", label: "Support Sprite 3", detail: "Additional support character sprite.", src: "/game/sprites/characters/support-3.png" },
  { id: "support5", family: "extras", label: "Support Sprite 5", detail: "Additional support character sprite.", src: "/game/sprites/characters/support-5.png" }
] as const satisfies readonly AvatarSpriteOption[];

export type AvatarSpriteId = (typeof avatarSpriteOptions)[number]["id"];
export type AvatarSpriteFamily = (typeof avatarSpriteOptions)[number]["family"];

export const avatarSpriteFamilies: Array<{ id: AvatarSpriteFamily; label: string; detail: string; defaultSpriteId: AvatarSpriteId }> = [
  { id: "studio", label: "Character Studio", detail: "Fresh beverage-study cast with broader silhouettes and features.", defaultSpriteId: "zuriStudio" },
  { id: "sippy", label: "Sippy", detail: "Polished beverage guide and player-facing hero.", defaultSpriteId: "sippyWine" },
  { id: "roma", label: "Roma", detail: "Sensory coach with study and tasting variants.", defaultSpriteId: "romaWine" },
  { id: "hummin", label: "Hummin", detail: "Robot study partner for technical tracks.", defaultSpriteId: "humminWineBook" },
  { id: "support", label: "Experts", detail: "Wine, beer, and spirits support specialists.", defaultSpriteId: "ariaWine" },
  { id: "extras", label: "More Sprites", detail: "Additional character art from the sprite folder.", defaultSpriteId: "main0" }
];

export type AvatarArchetype =
  | "sommelier"
  | "explorer"
  | "chemist"
  | "guide"
  | "cartographer"
  | "cellar-knight"
  | "fermenter"
  | "timekeeper";

export type AvatarBuild = "classic" | "compact" | "tall" | "broad";
export type AvatarHairStyle =
  | "short-crop"
  | "curly-fade"
  | "coils"
  | "locs"
  | "bob"
  | "long-braid"
  | "wavy-long"
  | "silver-sweep"
  | "top-knot"
  | "headscarf"
  | "afro-puffs"
  | "buzzcut";
export type AvatarStance = "ready" | "toast" | "field-notes" | "challenge";
export type AvatarExpression = "focused" | "bright" | "calm" | "spark" | "wry" | "heroic";
export type AvatarAccessory =
  | "none"
  | "glasses"
  | "square-glasses"
  | "freckles"
  | "short-beard"
  | "hearing-aid"
  | "earrings"
  | "tasting-pin"
  | "headset"
  | "beret"
  | "scarf"
  | "monocle";
export type AvatarCompanion = "none" | "glass" | "bot" | "map" | "corkscrew" | "journal" | "flavor-orb" | "grape";
export type AvatarBeverageCategory = "wine" | "beer" | "spirits" | "cocktails" | "coffee" | "tea" | "sake" | "no-low" | "all-beverage";
export type AvatarProfession =
  | "sommelier"
  | "cicerone"
  | "mixologist"
  | "barista"
  | "tea-specialist"
  | "distiller"
  | "winemaker"
  | "cellar-tech"
  | "sensory-scientist"
  | "educator"
  | "buyer"
  | "beverage-director";
export type AvatarPronouns = "she/her" | "he/him" | "they/them" | "custom";
export type AvatarPresentation = "feminine" | "masculine" | "androgynous" | "fluid";
export type AvatarLoadout = "service-floor" | "blind-exam" | "cellar-lab" | "classroom" | "trade-fair" | "field-visit" | "casual-profile" | "celebration";
export type AvatarStageBackdrop = "neon-cellar" | "tasting-lab" | "brew-deck" | "distillery-floor" | "coffee-bar" | "tea-room" | "trade-show" | "vineyard-field";
export type AvatarFinish = "matte" | "satin" | "chrome";
export type AvatarWorkContext = "service" | "retail" | "production" | "sensory-qa" | "education" | "brand" | "management";
export type AvatarMasteryTier = "foundation" | "floor-ready" | "specialist" | "lead" | "mentor";
export type AvatarSpecialization =
  | "wine-still"
  | "wine-sparkling"
  | "wine-viticulture"
  | "beer-draft"
  | "beer-fermentation"
  | "spirits-maturation"
  | "spirits-blending"
  | "cocktail-classics"
  | "cocktail-zero-proof"
  | "coffee-barista"
  | "coffee-roasting"
  | "tea-infusion"
  | "tea-origin"
  | "sake-koji"
  | "sake-service"
  | "no-low-program"
  | "no-low-texture"
  | "all-program-design"
  | "all-sensory-systems";
export type AvatarSensoryTrait = "acidity" | "sweetness" | "bitterness" | "body" | "aroma" | "texture";

export type SipAvatarDesign = {
  version: 1;
  name: string;
  title: string;
  beverageCategory: AvatarBeverageCategory;
  secondaryBeverageCategory: AvatarBeverageCategory;
  specialization: AvatarSpecialization;
  workContext: AvatarWorkContext;
  masteryTier: AvatarMasteryTier;
  profession: AvatarProfession;
  pronouns: AvatarPronouns;
  customPronouns: string;
  presentation: AvatarPresentation;
  loadout: AvatarLoadout;
  backdrop: AvatarStageBackdrop;
  finish: AvatarFinish;
  spriteId: AvatarSpriteId;
  archetype: AvatarArchetype;
  build: AvatarBuild;
  hairStyle: AvatarHairStyle;
  stance: AvatarStance;
  skin: string;
  hair: string;
  jacket: string;
  accent: string;
  expression: AvatarExpression;
  accessory: AvatarAccessory;
  companion: AvatarCompanion;
  sensoryAcidity: number;
  sensorySweetness: number;
  sensoryBitterness: number;
  sensoryBody: number;
  sensoryAroma: number;
  sensoryTexture: number;
  updatedAt: string;
};

export const SIP_AVATAR_EVENT = "sipstudies:avatar-updated";

export const defaultSipAvatar: SipAvatarDesign = {
  version: 1,
  name: "Cellar Scout",
  title: "Futurist Sommelier",
  beverageCategory: "wine",
  secondaryBeverageCategory: "all-beverage",
  specialization: "wine-still",
  workContext: "service",
  masteryTier: "floor-ready",
  profession: "sommelier",
  pronouns: "they/them",
  customPronouns: "",
  presentation: "androgynous",
  loadout: "service-floor",
  backdrop: "neon-cellar",
  finish: "satin",
  spriteId: "zuriStudio",
  archetype: "sommelier",
  build: "classic",
  hairStyle: "locs",
  stance: "toast",
  skin: "#6f3f32",
  hair: "#17100d",
  jacket: "#27483f",
  accent: "#f0bf5a",
  expression: "bright",
  accessory: "earrings",
  companion: "bot",
  sensoryAcidity: 72,
  sensorySweetness: 38,
  sensoryBitterness: 44,
  sensoryBody: 64,
  sensoryAroma: 78,
  sensoryTexture: 58,
  updatedAt: new Date(0).toISOString()
};

export const avatarBeverageCategories: Array<{ id: AvatarBeverageCategory; label: string; detail: string; accent: string; defaultProfession: AvatarProfession; backdrop: AvatarStageBackdrop }> = [
  { id: "wine", label: "Wine", detail: "Service, regions, cellar, and exam tasting.", accent: "#9fdaff", defaultProfession: "sommelier", backdrop: "neon-cellar" },
  { id: "beer", label: "Beer", detail: "Cicerone service, draft systems, freshness, and style.", accent: "#f4a261", defaultProfession: "cicerone", backdrop: "brew-deck" },
  { id: "spirits", label: "Spirits", detail: "Distilling, maturation, blending, and neat service.", accent: "#edd4a8", defaultProfession: "distiller", backdrop: "distillery-floor" },
  { id: "cocktails", label: "Cocktails", detail: "Bar craft, modifiers, garnish, speed, and balance.", accent: "#ef476f", defaultProfession: "mixologist", backdrop: "tasting-lab" },
  { id: "coffee", label: "Coffee", detail: "Roast, brew, cupping, cafe service, and sensory calibration.", accent: "#c77b3d", defaultProfession: "barista", backdrop: "coffee-bar" },
  { id: "tea", label: "Tea", detail: "Origin, water, infusion, service ritual, and tasting language.", accent: "#b9fbc0", defaultProfession: "tea-specialist", backdrop: "tea-room" },
  { id: "sake", label: "Sake", detail: "Rice polishing, koji, fermentation, service temperature, and pairing.", accent: "#c8a1ff", defaultProfession: "educator", backdrop: "tasting-lab" },
  { id: "no-low", label: "No/Low", detail: "Mindful beverage programs, texture, dilution, and hospitality cues.", accent: "#66c7b7", defaultProfession: "buyer", backdrop: "trade-show" },
  { id: "all-beverage", label: "All Beverage", detail: "Executive-level program building across every category.", accent: "#fff1d1", defaultProfession: "beverage-director", backdrop: "trade-show" }
];

export const avatarProfessions: Array<{
  id: AvatarProfession;
  category: AvatarBeverageCategory;
  label: string;
  title: string;
  detail: string;
  defaultSpriteId: AvatarSpriteId;
  archetype: AvatarArchetype;
  stance: AvatarStance;
  expression: AvatarExpression;
  accessory: AvatarAccessory;
  companion: AvatarCompanion;
  jacket: string;
  accent: string;
  loadout: AvatarLoadout;
  backdrop: AvatarStageBackdrop;
}> = [
  {
    id: "sommelier",
    category: "wine",
    label: "Sommelier",
    title: "Futurist Sommelier",
    detail: "Floor presence, glassware command, cellar strategy, and guest language.",
    defaultSpriteId: "elaraStudio",
    archetype: "sommelier",
    stance: "toast",
    expression: "bright",
    accessory: "tasting-pin",
    companion: "glass",
    jacket: "#092131",
    accent: "#9fdaf5",
    loadout: "service-floor",
    backdrop: "neon-cellar"
  },
  {
    id: "cicerone",
    category: "beer",
    label: "Cicerone",
    title: "Draft Systems Strategist",
    detail: "Beer style fluency, foam control, draft hygiene, freshness, and pairing.",
    defaultSpriteId: "mateoStudio",
    archetype: "fermenter",
    stance: "field-notes",
    expression: "spark",
    accessory: "short-beard",
    companion: "journal",
    jacket: "#355e3b",
    accent: "#f4a261",
    loadout: "cellar-lab",
    backdrop: "brew-deck"
  },
  {
    id: "mixologist",
    category: "cocktails",
    label: "Mixologist",
    title: "Cocktail Systems Architect",
    detail: "Build specs, garnish design, modifier balance, and high-speed service.",
    defaultSpriteId: "kaiStudio",
    archetype: "guide",
    stance: "challenge",
    expression: "wry",
    accessory: "headset",
    companion: "corkscrew",
    jacket: "#7d1f38",
    accent: "#ef476f",
    loadout: "service-floor",
    backdrop: "tasting-lab"
  },
  {
    id: "barista",
    category: "coffee",
    label: "Barista",
    title: "Coffee Sensory Lead",
    detail: "Cupping, extraction, roast language, workflow, and hospitality rhythm.",
    defaultSpriteId: "raeStudio",
    archetype: "chemist",
    stance: "ready",
    expression: "focused",
    accessory: "glasses",
    companion: "flavor-orb",
    jacket: "#8b4513",
    accent: "#c77b3d",
    loadout: "classroom",
    backdrop: "coffee-bar"
  },
  {
    id: "tea-specialist",
    category: "tea",
    label: "Tea Specialist",
    title: "Tea Service Futurist",
    detail: "Origin, infusion, water, texture, aromatic lift, and ritual pacing.",
    defaultSpriteId: "ashaStudio",
    archetype: "timekeeper",
    stance: "field-notes",
    expression: "calm",
    accessory: "earrings",
    companion: "journal",
    jacket: "#185552",
    accent: "#b9fbc0",
    loadout: "classroom",
    backdrop: "tea-room"
  },
  {
    id: "distiller",
    category: "spirits",
    label: "Distiller",
    title: "Distillery Archive Lead",
    detail: "Mash, cuts, proofing, maturation, barrel influence, and spirits service.",
    defaultSpriteId: "kenjiStudio",
    archetype: "cellar-knight",
    stance: "ready",
    expression: "focused",
    accessory: "square-glasses",
    companion: "bot",
    jacket: "#2f314a",
    accent: "#edd4a8",
    loadout: "cellar-lab",
    backdrop: "distillery-floor"
  },
  {
    id: "winemaker",
    category: "wine",
    label: "Winemaker",
    title: "Fermentation Commander",
    detail: "Vineyard intake, fermentation choices, cellar equipment, and blending logic.",
    defaultSpriteId: "zuriStudio",
    archetype: "fermenter",
    stance: "challenge",
    expression: "heroic",
    accessory: "earrings",
    companion: "grape",
    jacket: "#27483f",
    accent: "#f0bf5a",
    loadout: "field-visit",
    backdrop: "vineyard-field"
  },
  {
    id: "cellar-tech",
    category: "all-beverage",
    label: "Cellar Tech",
    title: "Cellar Operations Pilot",
    detail: "Inventory, equipment, sanitation, cold chain, and production-floor safety.",
    defaultSpriteId: "santiStudio",
    archetype: "explorer",
    stance: "ready",
    expression: "focused",
    accessory: "short-beard",
    companion: "map",
    jacket: "#185552",
    accent: "#66c7b7",
    loadout: "cellar-lab",
    backdrop: "distillery-floor"
  },
  {
    id: "sensory-scientist",
    category: "all-beverage",
    label: "Sensory Scientist",
    title: "Aroma Lab Analyst",
    detail: "Blind calibration, defect recognition, experimental panels, and evidence.",
    defaultSpriteId: "miraStudio",
    archetype: "chemist",
    stance: "field-notes",
    expression: "spark",
    accessory: "freckles",
    companion: "flavor-orb",
    jacket: "#d8e6da",
    accent: "#c8a1ff",
    loadout: "blind-exam",
    backdrop: "tasting-lab"
  },
  {
    id: "educator",
    category: "all-beverage",
    label: "Educator",
    title: "Beverage Learning Guide",
    detail: "Lesson flow, storytelling, diagrams, tasting language, and learner coaching.",
    defaultSpriteId: "priyaStudio",
    archetype: "guide",
    stance: "toast",
    expression: "bright",
    accessory: "earrings",
    companion: "journal",
    jacket: "#817985",
    accent: "#b9fbc0",
    loadout: "classroom",
    backdrop: "trade-show"
  },
  {
    id: "buyer",
    category: "all-beverage",
    label: "Buyer",
    title: "Portfolio Buyer",
    detail: "Category mix, value tiers, vendor signals, margins, and shelf storytelling.",
    defaultSpriteId: "julesStudio",
    archetype: "cartographer",
    stance: "field-notes",
    expression: "wry",
    accessory: "glasses",
    companion: "map",
    jacket: "#092131",
    accent: "#9fdaf5",
    loadout: "trade-fair",
    backdrop: "trade-show"
  },
  {
    id: "beverage-director",
    category: "all-beverage",
    label: "Beverage Director",
    title: "Beverage Program Director",
    detail: "Menu architecture, team training, purchasing, guest experience, and profit.",
    defaultSpriteId: "noorStudio",
    archetype: "timekeeper",
    stance: "challenge",
    expression: "heroic",
    accessory: "hearing-aid",
    companion: "bot",
    jacket: "#2f314a",
    accent: "#fff1d1",
    loadout: "trade-fair",
    backdrop: "neon-cellar"
  }
];

export const avatarPronounOptions: Array<{ id: AvatarPronouns; label: string }> = [
  { id: "she/her", label: "She / Her" },
  { id: "he/him", label: "He / Him" },
  { id: "they/them", label: "They / Them" },
  { id: "custom", label: "Custom" }
];

export const avatarPresentationOptions: Array<{ id: AvatarPresentation; label: string; detail: string }> = [
  { id: "feminine", label: "Feminine", detail: "Feminine-coded styling and profile language." },
  { id: "masculine", label: "Masculine", detail: "Masculine-coded styling and profile language." },
  { id: "androgynous", label: "Androgynous", detail: "Balanced styling without a fixed gender signal." },
  { id: "fluid", label: "Fluid", detail: "Flexible presentation for changing loadouts." }
];

export const avatarLoadouts: Array<{ id: AvatarLoadout; label: string; detail: string; stance: AvatarStance; companion: AvatarCompanion; backdrop: AvatarStageBackdrop }> = [
  { id: "service-floor", label: "Service Floor", detail: "Confident guest-facing pose with polished tools.", stance: "toast", companion: "glass", backdrop: "neon-cellar" },
  { id: "blind-exam", label: "Blind Tasting Exam", detail: "Focused calibration mode for timed analysis.", stance: "field-notes", companion: "flavor-orb", backdrop: "tasting-lab" },
  { id: "cellar-lab", label: "Cellar / Lab", detail: "Production-floor readiness with technical equipment cues.", stance: "ready", companion: "bot", backdrop: "distillery-floor" },
  { id: "classroom", label: "Classroom", detail: "Educator stance for explainers and study plans.", stance: "field-notes", companion: "journal", backdrop: "tasting-lab" },
  { id: "trade-fair", label: "Trade Fair", detail: "Portfolio presentation mode with map and category signals.", stance: "challenge", companion: "map", backdrop: "trade-show" },
  { id: "field-visit", label: "Field Visit", detail: "Vineyard, farm, roastery, or brewery scouting profile.", stance: "ready", companion: "grape", backdrop: "vineyard-field" },
  { id: "casual-profile", label: "Casual Profile", detail: "Clean social-card look for the dashboard profile tile.", stance: "ready", companion: "none", backdrop: "coffee-bar" },
  { id: "celebration", label: "Celebration", detail: "Milestone pose for achievements and completed modules.", stance: "toast", companion: "glass", backdrop: "trade-show" }
];

export const avatarStageBackdrops: Array<{ id: AvatarStageBackdrop; label: string; detail: string }> = [
  { id: "neon-cellar", label: "Neon Cellar", detail: "Future cellar with polished service cues." },
  { id: "tasting-lab", label: "Tasting Lab", detail: "Sensory grid, vials, and calibration light." },
  { id: "brew-deck", label: "Brew Deck", detail: "Draft, cellar, malt, and stainless production energy." },
  { id: "distillery-floor", label: "Distillery Floor", detail: "Copper, proofing, warehouse, and spirits analysis." },
  { id: "coffee-bar", label: "Coffee Bar", detail: "Cupping table, espresso station, and roastery warmth." },
  { id: "tea-room", label: "Tea Room", detail: "Infusion ritual, water control, and calm focus." },
  { id: "trade-show", label: "Trade Show", detail: "Portfolio wall, buyer notes, and team leadership." },
  { id: "vineyard-field", label: "Field Visit", detail: "Vineyard and ingredient-source scouting." }
];

export const avatarWorkContexts: Array<{ id: AvatarWorkContext; label: string; detail: string; defaultLoadout: AvatarLoadout }> = [
  { id: "service", label: "Service", detail: "Guest-facing floor craft, timing, language, and confidence.", defaultLoadout: "service-floor" },
  { id: "retail", label: "Retail / Buying", detail: "Shelf strategy, portfolio editing, margin, and guest translation.", defaultLoadout: "trade-fair" },
  { id: "production", label: "Production", detail: "Cellar, brewery, distillery, roastery, and process control.", defaultLoadout: "cellar-lab" },
  { id: "sensory-qa", label: "Sensory / QA", detail: "Calibration, panels, defects, quality checks, and evidence.", defaultLoadout: "blind-exam" },
  { id: "education", label: "Education", detail: "Teaching flow, study plans, storytelling, and learner coaching.", defaultLoadout: "classroom" },
  { id: "brand", label: "Brand / Trade", detail: "Portfolio storytelling, events, demos, and market presence.", defaultLoadout: "trade-fair" },
  { id: "management", label: "Management", detail: "Program design, training, purchasing, and team leadership.", defaultLoadout: "trade-fair" }
];

export const avatarMasteryTiers: Array<{ id: AvatarMasteryTier; label: string; detail: string; badge: string }> = [
  { id: "foundation", label: "Foundation", detail: "Building core vocabulary and category confidence.", badge: "FND" },
  { id: "floor-ready", label: "Floor Ready", detail: "Ready for practical service, study, or production workflows.", badge: "FLR" },
  { id: "specialist", label: "Specialist", detail: "Focused category depth with reliable tasting language.", badge: "SPC" },
  { id: "lead", label: "Lead", detail: "Owns programs, buying decisions, training, or technical systems.", badge: "LEAD" },
  { id: "mentor", label: "Mentor", detail: "Teaches, calibrates, and guides other beverage professionals.", badge: "MTR" }
];

export const avatarSensoryTraits: Array<{ id: AvatarSensoryTrait; label: string; detail: string }> = [
  { id: "acidity", label: "Acidity", detail: "Freshness, lift, tang, and structural brightness." },
  { id: "sweetness", label: "Sweetness", detail: "Perceived sugar, ripeness, malt, fruit, or roundness." },
  { id: "bitterness", label: "Bitter", detail: "Hop, roast, botanicals, tea polyphenols, or peel bite." },
  { id: "body", label: "Body", detail: "Weight, concentration, alcohol, protein, or extract." },
  { id: "aroma", label: "Aroma", detail: "Aromatic intensity, complexity, and immediate impact." },
  { id: "texture", label: "Texture", detail: "Tannin, mousse, creaminess, dilution, grip, or finish shape." }
];

export const avatarSpecializations: Array<{
  id: AvatarSpecialization;
  category: AvatarBeverageCategory;
  label: string;
  detail: string;
  sensory: Record<AvatarSensoryTrait, number>;
}> = [
  {
    id: "wine-still",
    category: "wine",
    label: "Still Wine Service",
    detail: "Classic service, region recall, structure calls, and pairing language.",
    sensory: { acidity: 74, sweetness: 32, bitterness: 28, body: 58, aroma: 76, texture: 62 }
  },
  {
    id: "wine-sparkling",
    category: "wine",
    label: "Sparkling Wine",
    detail: "Mousse, autolysis, pressure, dosage, freshness, and occasion service.",
    sensory: { acidity: 86, sweetness: 38, bitterness: 24, body: 48, aroma: 70, texture: 82 }
  },
  {
    id: "wine-viticulture",
    category: "wine",
    label: "Vineyard / Cellar",
    detail: "Farming, site reading, harvest choices, fermentation, and blending.",
    sensory: { acidity: 72, sweetness: 34, bitterness: 32, body: 68, aroma: 72, texture: 70 }
  },
  {
    id: "beer-draft",
    category: "beer",
    label: "Draft Systems",
    detail: "Foam, freshness, line hygiene, temperature, pressure, and style clarity.",
    sensory: { acidity: 34, sweetness: 54, bitterness: 74, body: 58, aroma: 66, texture: 70 }
  },
  {
    id: "beer-fermentation",
    category: "beer",
    label: "Fermentation",
    detail: "Yeast, malt, hops, mixed culture, defects, and process control.",
    sensory: { acidity: 48, sweetness: 58, bitterness: 68, body: 62, aroma: 72, texture: 64 }
  },
  {
    id: "spirits-maturation",
    category: "spirits",
    label: "Maturation",
    detail: "Oak, oxidation, proofing, warehouse character, and age statements.",
    sensory: { acidity: 18, sweetness: 48, bitterness: 42, body: 82, aroma: 86, texture: 76 }
  },
  {
    id: "spirits-blending",
    category: "spirits",
    label: "Blending",
    detail: "Component balance, proof, aroma architecture, and house style.",
    sensory: { acidity: 22, sweetness: 54, bitterness: 36, body: 78, aroma: 88, texture: 82 }
  },
  {
    id: "cocktail-classics",
    category: "cocktails",
    label: "Classics",
    detail: "Sours, highballs, stirred builds, garnish, dilution, and speed.",
    sensory: { acidity: 72, sweetness: 58, bitterness: 44, body: 56, aroma: 74, texture: 66 }
  },
  {
    id: "cocktail-zero-proof",
    category: "cocktails",
    label: "Zero-Proof Builds",
    detail: "Texture, bitterness, acid, tea, spice, carbonation, and garnish lift.",
    sensory: { acidity: 76, sweetness: 52, bitterness: 58, body: 46, aroma: 78, texture: 74 }
  },
  {
    id: "coffee-barista",
    category: "coffee",
    label: "Barista Workflow",
    detail: "Espresso, milk texture, brew variables, calibration, and service rhythm.",
    sensory: { acidity: 64, sweetness: 56, bitterness: 58, body: 70, aroma: 82, texture: 72 }
  },
  {
    id: "coffee-roasting",
    category: "coffee",
    label: "Roasting",
    detail: "Green quality, roast curve, development, defects, and cupping evidence.",
    sensory: { acidity: 58, sweetness: 62, bitterness: 66, body: 68, aroma: 86, texture: 62 }
  },
  {
    id: "tea-infusion",
    category: "tea",
    label: "Infusion Service",
    detail: "Water, temperature, vessel choice, oxidation, aroma, and pacing.",
    sensory: { acidity: 38, sweetness: 42, bitterness: 58, body: 42, aroma: 78, texture: 76 }
  },
  {
    id: "tea-origin",
    category: "tea",
    label: "Origin / Processing",
    detail: "Cultivar, oxidation, firing, terroir, season, and producer style.",
    sensory: { acidity: 42, sweetness: 46, bitterness: 54, body: 48, aroma: 84, texture: 70 }
  },
  {
    id: "sake-koji",
    category: "sake",
    label: "Koji / Fermentation",
    detail: "Rice, polish, koji, yeast, fermentation profile, and umami balance.",
    sensory: { acidity: 46, sweetness: 56, bitterness: 28, body: 64, aroma: 70, texture: 74 }
  },
  {
    id: "sake-service",
    category: "sake",
    label: "Sake Service",
    detail: "Temperature, glassware, style, pairing, and guest translation.",
    sensory: { acidity: 42, sweetness: 52, bitterness: 24, body: 58, aroma: 72, texture: 70 }
  },
  {
    id: "no-low-program",
    category: "no-low",
    label: "No / Low Program",
    detail: "Mindful menus, balance without ethanol, complexity, and hospitality cues.",
    sensory: { acidity: 70, sweetness: 48, bitterness: 58, body: 42, aroma: 76, texture: 72 }
  },
  {
    id: "no-low-texture",
    category: "no-low",
    label: "Texture Systems",
    detail: "Mouthfeel, carbonation, tannin, tea, gum, dilution, and finish length.",
    sensory: { acidity: 66, sweetness: 42, bitterness: 62, body: 50, aroma: 72, texture: 88 }
  },
  {
    id: "all-program-design",
    category: "all-beverage",
    label: "Program Design",
    detail: "Cross-category buying, training, margins, menu architecture, and service.",
    sensory: { acidity: 58, sweetness: 48, bitterness: 48, body: 62, aroma: 72, texture: 64 }
  },
  {
    id: "all-sensory-systems",
    category: "all-beverage",
    label: "Sensory Systems",
    detail: "Calibrated panels, lexicon design, defects, QA, and teaching tools.",
    sensory: { acidity: 66, sweetness: 50, bitterness: 54, body: 60, aroma: 84, texture: 72 }
  }
];

export const avatarFinishes: Array<{ id: AvatarFinish; label: string }> = [
  { id: "matte", label: "Matte" },
  { id: "satin", label: "Satin" },
  { id: "chrome", label: "Chrome" }
];

export const avatarArchetypes: Array<{ id: AvatarArchetype; label: string; detail: string }> = [
  { id: "sommelier", label: "Sommelier", detail: "Polished service, lapels, and tasting chain." },
  { id: "explorer", label: "Explorer", detail: "Field vest, routes, and regional confidence." },
  { id: "chemist", label: "Chemist", detail: "Aroma lab coat with precise experiment energy." },
  { id: "guide", label: "Guide", detail: "Mentor energy and study momentum." },
  { id: "cartographer", label: "Cartographer", detail: "Mapmaker sash for terroir and border study." },
  { id: "cellar-knight", label: "Cellar Knight", detail: "Structured coat, shoulder marks, vault authority." },
  { id: "fermenter", label: "Fermenter", detail: "Apron, utility belt, and production-floor grit." },
  { id: "timekeeper", label: "Timekeeper", detail: "Archive coat and timepiece for vintage recall." }
];

export const avatarBuilds: Array<{ id: AvatarBuild; label: string }> = [
  { id: "classic", label: "Classic" },
  { id: "compact", label: "Compact" },
  { id: "tall", label: "Tall" },
  { id: "broad", label: "Broad" }
];

export const avatarHairStyles: Array<{ id: AvatarHairStyle; label: string }> = [
  { id: "short-crop", label: "Short Crop" },
  { id: "curly-fade", label: "Curly Fade" },
  { id: "coils", label: "Coils" },
  { id: "locs", label: "Locs" },
  { id: "bob", label: "Bob" },
  { id: "long-braid", label: "Long Braid" },
  { id: "wavy-long", label: "Wavy Long" },
  { id: "silver-sweep", label: "Silver Sweep" },
  { id: "top-knot", label: "Top Knot" },
  { id: "headscarf", label: "Headscarf" },
  { id: "afro-puffs", label: "Afro Puffs" },
  { id: "buzzcut", label: "Buzzcut" }
];

export const avatarStances: Array<{ id: AvatarStance; label: string }> = [
  { id: "ready", label: "Ready" },
  { id: "toast", label: "Toast" },
  { id: "field-notes", label: "Field Notes" },
  { id: "challenge", label: "Challenge" }
];

export const avatarExpressions: Array<{ id: AvatarExpression; label: string }> = [
  { id: "bright", label: "Bright" },
  { id: "focused", label: "Focused" },
  { id: "calm", label: "Calm" },
  { id: "spark", label: "Spark" },
  { id: "wry", label: "Wry" },
  { id: "heroic", label: "Heroic" }
];

export const avatarAccessories: Array<{ id: AvatarAccessory; label: string }> = [
  { id: "none", label: "None" },
  { id: "glasses", label: "Round Glasses" },
  { id: "square-glasses", label: "Square Glasses" },
  { id: "freckles", label: "Freckles" },
  { id: "short-beard", label: "Short Beard" },
  { id: "hearing-aid", label: "Hearing Aid" },
  { id: "earrings", label: "Earrings" },
  { id: "tasting-pin", label: "Tasting Pin" },
  { id: "headset", label: "Headset" },
  { id: "beret", label: "Beret" },
  { id: "scarf", label: "Scarf" },
  { id: "monocle", label: "Monocle" }
];

export const avatarCompanions: Array<{ id: AvatarCompanion; label: string }> = [
  { id: "none", label: "None" },
  { id: "glass", label: "Glass" },
  { id: "bot", label: "Sippy Bot" },
  { id: "map", label: "Map" },
  { id: "corkscrew", label: "Corkscrew" },
  { id: "journal", label: "Journal" },
  { id: "flavor-orb", label: "Flavor Orb" },
  { id: "grape", label: "Grape Cluster" }
];

export const avatarSkinSwatches = ["#5e382d", "#8f553e", "#b87955", "#d69a73", "#f0c09a", "#f7d7b7", "#6a4a3f", "#3f2a24"];
export const avatarHairSwatches = ["#17100d", "#2c1712", "#6e3f1f", "#c77b3d", "#e2d0b3", "#8d6b52", "#0b4d5e", "#4a274d"];
export const avatarJacketSwatches = ["#185552", "#092131", "#8b4513", "#817985", "#d8e6da", "#2f314a", "#7d1f38", "#355e3b"];
export const avatarAccentSwatches = ["#edd4a8", "#9fdaf5", "#66c7b7", "#f4a261", "#f8f1df", "#c8a1ff", "#ef476f", "#b9fbc0"];

const spriteIds = avatarSpriteOptions.map((item) => item.id);
const beverageCategoryIds = avatarBeverageCategories.map((item) => item.id);
const professionIds = avatarProfessions.map((item) => item.id);
const pronounIds = avatarPronounOptions.map((item) => item.id);
const presentationIds = avatarPresentationOptions.map((item) => item.id);
const loadoutIds = avatarLoadouts.map((item) => item.id);
const backdropIds = avatarStageBackdrops.map((item) => item.id);
const workContextIds = avatarWorkContexts.map((item) => item.id);
const masteryTierIds = avatarMasteryTiers.map((item) => item.id);
const specializationIds = avatarSpecializations.map((item) => item.id);
const finishIds = avatarFinishes.map((item) => item.id);
const archetypeIds = avatarArchetypes.map((item) => item.id);
const buildIds = avatarBuilds.map((item) => item.id);
const hairStyleIds = avatarHairStyles.map((item) => item.id);
const stanceIds = avatarStances.map((item) => item.id);
const expressionIds = avatarExpressions.map((item) => item.id);
const accessoryIds = avatarAccessories.map((item) => item.id);
const companionIds = avatarCompanions.map((item) => item.id);

function avatarStorageKey(ownerId: string | null | undefined): string {
  return `sip-studies:avatar:${ownerId?.trim() || "guest"}:v1`;
}

function normalizeChoice<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

function normalizeHex(value: unknown, fallback: string): string {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function normalizeName(value: unknown): string {
  if (typeof value !== "string") return defaultSipAvatar.name;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 32) : defaultSipAvatar.name;
}

function normalizeTitle(value: unknown): string {
  if (typeof value !== "string") return defaultSipAvatar.title;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 42) : defaultSipAvatar.title;
}

function normalizeCustomPronouns(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 24);
}

function normalizeSensoryValue(value: unknown, fallback: number): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function fallbackSecondaryCategory(primary: AvatarBeverageCategory): AvatarBeverageCategory {
  return primary === "all-beverage" ? "wine" : "all-beverage";
}

function defaultWorkContextForProfession(profession: AvatarProfession): AvatarWorkContext {
  if (profession === "winemaker" || profession === "cellar-tech" || profession === "distiller") return "production";
  if (profession === "sensory-scientist") return "sensory-qa";
  if (profession === "educator") return "education";
  if (profession === "buyer") return "retail";
  if (profession === "beverage-director") return "management";
  return "service";
}

function defaultSpecializationForCategory(category: AvatarBeverageCategory) {
  return avatarSpecializations.find((item) => item.category === category) ?? avatarSpecializations.find((item) => item.category === "all-beverage") ?? avatarSpecializations[0];
}

function normalizeSpecialization(value: unknown, category: AvatarBeverageCategory): AvatarSpecialization {
  const fallback = defaultSpecializationForCategory(category);
  const normalized = normalizeChoice(value, specializationIds, fallback.id);
  const specialization = avatarSpecializations.find((item) => item.id === normalized) ?? fallback;
  return specialization.category === category || category === "all-beverage" || specialization.category === "all-beverage" ? specialization.id : fallback.id;
}

function legacySpriteFor(archetype: unknown): AvatarSpriteId {
  if (archetype === "chemist") return "humminBeer";
  if (archetype === "explorer" || archetype === "cartographer") return "romaWineLeaf";
  if (archetype === "guide") return "ariaWine";
  if (archetype === "fermenter") return "brunoBeer";
  if (archetype === "cellar-knight" || archetype === "timekeeper") return "sippySpirit";
  return defaultSipAvatar.spriteId;
}

function normalizeAvatar(value: Partial<SipAvatarDesign> | null): SipAvatarDesign {
  const fallbackSprite = legacySpriteFor(value?.archetype);
  const profession = normalizeChoice(value?.profession, professionIds, defaultSipAvatar.profession);
  const professionMeta = avatarProfessions.find((item) => item.id === profession) ?? avatarProfessions[0];
  const beverageCategory = normalizeChoice(value?.beverageCategory, beverageCategoryIds, professionMeta.category);
  const secondaryCandidate = normalizeChoice(value?.secondaryBeverageCategory, beverageCategoryIds, fallbackSecondaryCategory(beverageCategory));
  const secondaryBeverageCategory = secondaryCandidate === beverageCategory ? fallbackSecondaryCategory(beverageCategory) : secondaryCandidate;
  const specialization = normalizeSpecialization(value?.specialization, beverageCategory);
  const specializationMeta = avatarSpecializations.find((item) => item.id === specialization) ?? defaultSpecializationForCategory(beverageCategory);
  const loadout = normalizeChoice(value?.loadout, loadoutIds, professionMeta.loadout);
  const loadoutMeta = avatarLoadouts.find((item) => item.id === loadout) ?? avatarLoadouts[0];
  return {
    ...defaultSipAvatar,
    name: normalizeName(value?.name),
    title: normalizeTitle(value?.title ?? professionMeta.title),
    beverageCategory,
    secondaryBeverageCategory,
    specialization,
    workContext: normalizeChoice(value?.workContext, workContextIds, defaultWorkContextForProfession(profession)),
    masteryTier: normalizeChoice(value?.masteryTier, masteryTierIds, defaultSipAvatar.masteryTier),
    profession,
    pronouns: normalizeChoice(value?.pronouns, pronounIds, defaultSipAvatar.pronouns),
    customPronouns: normalizeCustomPronouns(value?.customPronouns),
    presentation: normalizeChoice(value?.presentation, presentationIds, defaultSipAvatar.presentation),
    loadout,
    backdrop: normalizeChoice(value?.backdrop, backdropIds, value?.loadout ? loadoutMeta.backdrop : professionMeta.backdrop),
    finish: normalizeChoice(value?.finish, finishIds, defaultSipAvatar.finish),
    spriteId: normalizeChoice(value?.spriteId, spriteIds, professionMeta.defaultSpriteId ?? fallbackSprite),
    archetype: normalizeChoice(value?.archetype, archetypeIds, professionMeta.archetype),
    build: normalizeChoice(value?.build, buildIds, defaultSipAvatar.build),
    hairStyle: normalizeChoice(value?.hairStyle, hairStyleIds, defaultSipAvatar.hairStyle),
    stance: normalizeChoice(value?.stance, stanceIds, value?.loadout ? loadoutMeta.stance : professionMeta.stance),
    skin: normalizeHex(value?.skin, defaultSipAvatar.skin),
    hair: normalizeHex(value?.hair, defaultSipAvatar.hair),
    jacket: normalizeHex(value?.jacket, professionMeta.jacket),
    accent: normalizeHex(value?.accent, professionMeta.accent),
    expression: normalizeChoice(value?.expression, expressionIds, professionMeta.expression),
    accessory: normalizeChoice(value?.accessory, accessoryIds, professionMeta.accessory),
    companion: normalizeChoice(value?.companion, companionIds, value?.loadout ? loadoutMeta.companion : professionMeta.companion),
    sensoryAcidity: normalizeSensoryValue(value?.sensoryAcidity, specializationMeta.sensory.acidity),
    sensorySweetness: normalizeSensoryValue(value?.sensorySweetness, specializationMeta.sensory.sweetness),
    sensoryBitterness: normalizeSensoryValue(value?.sensoryBitterness, specializationMeta.sensory.bitterness),
    sensoryBody: normalizeSensoryValue(value?.sensoryBody, specializationMeta.sensory.body),
    sensoryAroma: normalizeSensoryValue(value?.sensoryAroma, specializationMeta.sensory.aroma),
    sensoryTexture: normalizeSensoryValue(value?.sensoryTexture, specializationMeta.sensory.texture),
    version: 1,
    updatedAt: typeof value?.updatedAt === "string" ? value.updatedAt : defaultSipAvatar.updatedAt
  };
}

function studioFrameNumber(frame: number): string {
  return String(Math.max(1, Math.min(30, Math.round(frame)))).padStart(2, "0");
}

function avatarCategoryPropFrame(category: AvatarBeverageCategory): number {
  if (category === "wine") return 7;
  if (category === "beer") return 10;
  if (category === "spirits") return 11;
  if (category === "cocktails") return 12;
  if (category === "coffee") return 13;
  if (category === "tea") return 14;
  if (category === "sake" || category === "no-low") return 15;
  return 29;
}

function avatarGestureFrame(design: Pick<SipAvatarDesign, "beverageCategory" | "companion" | "loadout" | "stance" | "expression">): number {
  if (design.loadout === "celebration") return 25;
  if (design.companion === "map" || design.loadout === "field-visit") return 20;
  if (design.companion === "journal" || design.loadout === "classroom") return 18;
  if (design.companion === "flavor-orb" || design.loadout === "blind-exam") return 21;
  if (design.companion === "corkscrew") return 22;
  if (design.companion === "bot" || design.loadout === "trade-fair") return 28;
  if (design.companion === "glass" || design.stance === "toast") return avatarCategoryPropFrame(design.beverageCategory);
  if (design.expression === "heroic" || design.stance === "challenge") return 30;
  if (design.stance === "field-notes") return 19;
  return 1;
}

const studioBaseFrame = (characterId: string, frame: number) => {
  const frameNumber = studioFrameNumber(frame);
  return `${characterStudioBase}/bases/frames/${characterId}/${characterId}-base-gesture-${frameNumber}.png`;
};

const studioHairFrame = (style: AvatarHairStyle, frame: number) => {
  const frameNumber = studioFrameNumber(frame);
  return `${characterStudioBase}/hair/masks/frames/${style}/${style}-hair-fill-${frameNumber}.png`;
};

const studioHairOutlineFrame = (style: AvatarHairStyle, frame: number) => {
  const frameNumber = studioFrameNumber(frame);
  return `${characterStudioBase}/hair/outlines/frames/${style}/${style}-hair-outline-${frameNumber}.png`;
};

const studioAccessoryFrames: Partial<Record<AvatarAccessory, string>> = {
  glasses: `${characterStudioBase}/features/frames/round-glasses/round-glasses-feature-01.png`,
  "square-glasses": `${characterStudioBase}/features/frames/square-glasses/square-glasses-feature-01.png`,
  freckles: `${characterStudioBase}/features/frames/freckles/freckles-feature-01.png`,
  "short-beard": `${characterStudioBase}/features/frames/short-beard/short-beard-feature-01.png`,
  "hearing-aid": `${characterStudioBase}/features/frames/hearing-aid/hearing-aid-feature-01.png`,
  earrings: `${characterStudioBase}/features/frames/gold-earrings/gold-earrings-feature-01.png`
};

export function getSipAvatarSprite(design: Pick<SipAvatarDesign, "spriteId">) {
  return avatarSpriteOptions.find((sprite) => sprite.id === design.spriteId) ?? avatarSpriteOptions[0];
}

export function getAvatarBeverageCategory(design: Pick<SipAvatarDesign, "beverageCategory">) {
  return avatarBeverageCategories.find((item) => item.id === design.beverageCategory) ?? avatarBeverageCategories[0];
}

export function getAvatarProfession(design: Pick<SipAvatarDesign, "profession">) {
  return avatarProfessions.find((item) => item.id === design.profession) ?? avatarProfessions[0];
}

export function getAvatarLoadout(design: Pick<SipAvatarDesign, "loadout">) {
  return avatarLoadouts.find((item) => item.id === design.loadout) ?? avatarLoadouts[0];
}

export function getAvatarStageBackdrop(design: Pick<SipAvatarDesign, "backdrop">) {
  return avatarStageBackdrops.find((item) => item.id === design.backdrop) ?? avatarStageBackdrops[0];
}

export function getAvatarSecondaryBeverageCategory(design: Pick<SipAvatarDesign, "secondaryBeverageCategory">) {
  return avatarBeverageCategories.find((item) => item.id === design.secondaryBeverageCategory) ?? avatarBeverageCategories[0];
}

export function getAvatarWorkContext(design: Pick<SipAvatarDesign, "workContext">) {
  return avatarWorkContexts.find((item) => item.id === design.workContext) ?? avatarWorkContexts[0];
}

export function getAvatarMasteryTier(design: Pick<SipAvatarDesign, "masteryTier">) {
  return avatarMasteryTiers.find((item) => item.id === design.masteryTier) ?? avatarMasteryTiers[0];
}

export function getAvatarSpecialization(design: Pick<SipAvatarDesign, "specialization" | "beverageCategory">) {
  const fallback = defaultSpecializationForCategory(design.beverageCategory);
  return avatarSpecializations.find((item) => item.id === design.specialization) ?? fallback;
}

export function getAvatarSpecializationsForCategory(category: AvatarBeverageCategory) {
  const items = avatarSpecializations.filter((item) => item.category === category || (category === "all-beverage" && item.category === "all-beverage"));
  return items.length ? items : [defaultSpecializationForCategory(category)];
}

export function getAvatarPronounLabel(design: Pick<SipAvatarDesign, "pronouns" | "customPronouns">) {
  if (design.pronouns === "custom") return design.customPronouns || "Custom";
  return avatarPronounOptions.find((item) => item.id === design.pronouns)?.label ?? "They / Them";
}

export function getSpecializationDefaults(specializationId: AvatarSpecialization): Partial<SipAvatarDesign> {
  const specialization = avatarSpecializations.find((item) => item.id === specializationId) ?? avatarSpecializations[0];
  return {
    specialization: specialization.id,
    sensoryAcidity: specialization.sensory.acidity,
    sensorySweetness: specialization.sensory.sweetness,
    sensoryBitterness: specialization.sensory.bitterness,
    sensoryBody: specialization.sensory.body,
    sensoryAroma: specialization.sensory.aroma,
    sensoryTexture: specialization.sensory.texture
  };
}

export function getProfessionDefaults(professionId: AvatarProfession): Partial<SipAvatarDesign> {
  const profession = avatarProfessions.find((item) => item.id === professionId) ?? avatarProfessions[0];
  const specialization = defaultSpecializationForCategory(profession.category);
  return {
    ...getStudioDefaultsForSprite(profession.defaultSpriteId),
    ...getSpecializationDefaults(specialization.id),
    title: profession.title,
    beverageCategory: profession.category,
    secondaryBeverageCategory: fallbackSecondaryCategory(profession.category),
    workContext: defaultWorkContextForProfession(profession.id),
    profession: profession.id,
    spriteId: profession.defaultSpriteId,
    archetype: profession.archetype,
    stance: profession.stance,
    expression: profession.expression,
    accessory: profession.accessory,
    companion: profession.companion,
    jacket: profession.jacket,
    accent: profession.accent,
    loadout: profession.loadout,
    backdrop: profession.backdrop
  };
}

export function getLoadoutDefaults(loadoutId: AvatarLoadout): Partial<SipAvatarDesign> {
  const loadout = avatarLoadouts.find((item) => item.id === loadoutId) ?? avatarLoadouts[0];
  return {
    loadout: loadout.id,
    stance: loadout.stance,
    companion: loadout.companion,
    backdrop: loadout.backdrop
  };
}

export function getCategoryDefaults(categoryId: AvatarBeverageCategory): Partial<SipAvatarDesign> {
  const category = avatarBeverageCategories.find((item) => item.id === categoryId) ?? avatarBeverageCategories[0];
  const specialization = defaultSpecializationForCategory(category.id);
  return {
    ...getSpecializationDefaults(specialization.id),
    beverageCategory: category.id,
    secondaryBeverageCategory: fallbackSecondaryCategory(category.id),
    accent: category.accent,
    backdrop: category.backdrop
  };
}

function pickOne<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomSipAvatarDesign(base: SipAvatarDesign): SipAvatarDesign {
  const category = pickOne(avatarBeverageCategories);
  const professions = avatarProfessions.filter((item) => item.category === category.id || category.id === "all-beverage" || item.category === "all-beverage");
  const profession = pickOne(professions.length ? professions : avatarProfessions);
  const spriteFamily = pickOne(avatarSpriteFamilies);
  const sprites = getAvatarSpritesForFamily(spriteFamily.id);
  const sprite = pickOne(sprites.length ? sprites : avatarSpriteOptions);
  const specialization = pickOne(getAvatarSpecializationsForCategory(category.id));
  const workContext = pickOne(avatarWorkContexts);
  const loadout = avatarLoadouts.find((item) => item.id === workContext.defaultLoadout) ?? pickOne(avatarLoadouts);
  const hairColor = pickOne(avatarHairSwatches);
  const jacket = profession.jacket || pickOne(avatarJacketSwatches);
  const accent = category.accent || profession.accent || pickOne(avatarAccentSwatches);
  return normalizeAvatar({
    ...base,
    ...getStudioDefaultsForSprite(sprite.id),
    ...getSpecializationDefaults(specialization.id),
    title: profession.title,
    beverageCategory: category.id,
    secondaryBeverageCategory: fallbackSecondaryCategory(category.id),
    specialization: specialization.id,
    workContext: workContext.id,
    masteryTier: pickOne(avatarMasteryTiers).id,
    profession: profession.id,
    loadout: loadout.id,
    stance: loadout.stance,
    companion: loadout.companion,
    backdrop: loadout.backdrop,
    presentation: pickOne(avatarPresentationOptions).id,
    spriteId: sprite.id,
    archetype: profession.archetype,
    build: pickOne(avatarBuilds).id,
    hairStyle: pickOne(avatarHairStyles).id,
    hair: hairColor,
    skin: pickOne(avatarSkinSwatches),
    jacket,
    accent,
    expression: pickOne(avatarExpressions).id,
    accessory: pickOne(avatarAccessories).id,
    finish: pickOne(avatarFinishes).id
  });
}

export function getStudioDefaultsForSprite(spriteId: AvatarSpriteId): Partial<SipAvatarDesign> {
  const sprite = avatarSpriteOptions.find((option) => option.id === spriteId) as AvatarSpriteOption | undefined;
  if (!sprite?.baseSrc) return {};
  return {
    hairStyle: sprite.defaultHairStyle ?? defaultSipAvatar.hairStyle,
    hair: sprite.defaultHair ?? defaultSipAvatar.hair,
    skin: sprite.defaultSkin ?? defaultSipAvatar.skin,
    accessory: sprite.defaultAccessory ?? "none"
  };
}

export function getSipAvatarStudioLayers(
  design: Pick<SipAvatarDesign, "spriteId" | "hairStyle" | "accessory" | "beverageCategory" | "companion" | "loadout" | "stance" | "expression">
) {
  const sprite = getSipAvatarSprite(design) as AvatarSpriteOption;
  if (!sprite.baseSrc || !sprite.studioCharacterId) return null;
  const frame = avatarGestureFrame(design);
  const frameNumber = studioFrameNumber(frame);
  return {
    baseSrc: studioBaseFrame(sprite.studioCharacterId, frame),
    hairMaskSrc: studioHairFrame(design.hairStyle, frame),
    hairOutlineSrc: studioHairOutlineFrame(design.hairStyle, frame),
    featureSrc: studioAccessoryFrames[design.accessory]?.replace("-01.png", `-${frameNumber}.png`) ?? null,
    gestureFrame: frame,
    fallbackSrc: sprite.src
  };
}

export function getAvatarSpritesForFamily(family: AvatarSpriteFamily) {
  return avatarSpriteOptions.filter((sprite) => sprite.family === family);
}

export function readSipAvatar(ownerId: string | null | undefined): SipAvatarDesign {
  if (typeof window === "undefined") return defaultSipAvatar;
  try {
    const raw = window.localStorage.getItem(avatarStorageKey(ownerId));
    if (!raw) return defaultSipAvatar;
    return normalizeAvatar(JSON.parse(raw) as Partial<SipAvatarDesign>);
  } catch {
    return defaultSipAvatar;
  }
}

export function saveSipAvatar(ownerId: string | null | undefined, design: SipAvatarDesign): SipAvatarDesign {
  const saved = normalizeAvatar({ ...design, updatedAt: new Date().toISOString() });
  if (typeof window !== "undefined") {
    window.localStorage.setItem(avatarStorageKey(ownerId), JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent(SIP_AVATAR_EVENT, { detail: { ownerId, avatar: saved } }));
  }
  return saved;
}
