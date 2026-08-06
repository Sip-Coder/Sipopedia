export type SipAcademyGuildId = "cask" | "steep" | "source" | "energy" | "culture";

export type SipAcademyCampusId =
  | "wine"
  | "beer"
  | "spirits"
  | "coffee"
  | "tea"
  | "kombucha"
  | "water"
  | "juice"
  | "milk"
  | "health-drinks"
  | "protein"
  | "energy-drinks"
  | "sodas"
  | "fermented"
  | "regional-drinks";

export type GlobeCoordinate = { lat: number; lon: number };

export type SipAcademyCampus = {
  id: SipAcademyCampusId;
  name: string;
  shortName: string;
  guild: SipAcademyGuildId;
  affiliateGuilds?: SipAcademyGuildId[];
  route?: string;
  signal: string;
  description: string;
  focus: [string, string, string];
  accent: string;
  coordinate: GlobeCoordinate;
  /** Degrees clockwise from geographic north when the campus is placed tangent to the globe. */
  heading: number;
  /** Relative scale for the academy's near-camera campus model. */
  campusScale: number;
  /** Preferred camera distance for the academy inspection view. */
  cameraDistance: number;
  /** Winding border of the academy's country, ordered around its perimeter. */
  countryBorder: GlobeCoordinate[];
  terroir: string;
  architecture: string;
  program: string;
};

export type SipAcademyGuild = {
  id: SipAcademyGuildId;
  name: string;
  motto: string;
  description: string;
  focus: [string, string, string];
  campusIds: SipAcademyCampusId[];
  anchor: GlobeCoordinate;
  border: GlobeCoordinate[];
};

export type SipAcademyMapSelection =
  | { kind: "world" }
  | { kind: "guild"; id: SipAcademyGuildId }
  | { kind: "campus"; id: SipAcademyCampusId };

export const SIP_ACADEMY_WORLD_SELECTION: SipAcademyMapSelection = { kind: "world" };

/**
 * Five continuous north-to-south guild macroregions arranged west to east.
 * Each guild is divided into three adjoining academy countries: north, middle,
 * and south. The academy anchor always sits inside its own country polygon.
 */
export const SIP_ACADEMY_CAMPUSES: SipAcademyCampus[] = [
  {
    id: "wine",
    name: "Wine Academy",
    shortName: "Wine",
    guild: "cask",
    affiliateGuilds: ["culture"],
    route: "#app/btg",
    signal: "From rain to first sip",
    description: "Follow place, vine, cellar, market, and service as one connected winemaking system.",
    focus: ["Viticulture and terroir", "Fermentation and maturation", "Sensory service"],
    accent: "#a94d68",
    coordinate: { lat: 34, lon: -143 },
    heading: -8,
    campusScale: 1.08,
    cameraDistance: 4.2,
    countryBorder: [
      { lat: 64, lon: -171 }, { lat: 68, lon: -150 }, { lat: 65, lon: -124 },
      { lat: 58, lon: -111 }, { lat: 37, lon: -113 }, { lat: 22, lon: -111 },
      { lat: 27, lon: -124 }, { lat: 23, lon: -140 }, { lat: 28, lon: -155 },
      { lat: 25, lon: -170 }, { lat: 36, lon: -168 }
    ],
    terroir: "Sunlit vine valleys, limestone ridges, alluvial fans, cool uplands, and a river-fed cellar district.",
    architecture: "Terraced stone winery halls, glass-roofed vine conservatories, barrel-vaulted cellars, and a restrained brass cupola.",
    program: "Vineyard observatory, crush hall, fermentation court, maturation cellar, sensory library, and service terrace."
  },
  {
    id: "beer",
    name: "Beer Academy",
    shortName: "Beer",
    guild: "cask",
    affiliateGuilds: ["culture"],
    route: "#app/btg?journey=brewery",
    signal: "From grain to tap",
    description: "Trace water, malt, hops, yeast, brewhouse equipment, conditioning, packaging, and draft service.",
    focus: ["Ingredients and mash", "Fermentation and cellar", "Packaging and draft"],
    accent: "#d69a45",
    coordinate: { lat: 4, lon: -143 },
    heading: 12,
    campusScale: 1.04,
    cameraDistance: 4.15,
    countryBorder: [
      { lat: 25, lon: -170 }, { lat: 28, lon: -155 }, { lat: 23, lon: -140 },
      { lat: 27, lon: -124 }, { lat: 22, lon: -111 }, { lat: 18, lon: -108 },
      { lat: -4, lon: -114 }, { lat: -15, lon: -112 }, { lat: -13, lon: -124 },
      { lat: -18, lon: -140 }, { lat: -12, lon: -156 }, { lat: -17, lon: -171 },
      { lat: -15, lon: -169 }, { lat: 10, lon: -174 }
    ],
    terroir: "Rolling grain country meets cool hop terraces, mineral springs, and a navigable river serving the brewhouse quarter.",
    architecture: "A rhythmic brick-and-stone brewhouse with copper-lit clerestories, tall fermentation bays, and a glazed hop arcade.",
    program: "Malt house, mill court, mash and lauter halls, kettle gallery, fermentation tower, brite cellar, packaging line, and taproom."
  },
  {
    id: "spirits",
    name: "Spirits Academy",
    shortName: "Spirits",
    guild: "cask",
    affiliateGuilds: ["culture"],
    route: "#app/btg?journey=distillery",
    signal: "From source to service",
    description: "Explore raw materials, fermentation, still design, cuts, maturation, blending, proofing, and service.",
    focus: ["Mash and wash", "Distillation systems", "Maturation and blending"],
    accent: "#c77b3d",
    coordinate: { lat: -26, lon: -143 },
    heading: -15,
    campusScale: 1.06,
    cameraDistance: 4.2,
    countryBorder: [
      { lat: -17, lon: -171 }, { lat: -12, lon: -156 }, { lat: -18, lon: -140 },
      { lat: -13, lon: -124 }, { lat: -15, lon: -112 }, { lat: -27, lon: -110 },
      { lat: -52, lon: -122 }, { lat: -61, lon: -145 }, { lat: -57, lon: -166 },
      { lat: -40, lon: -174 }
    ],
    terroir: "Dry grain plateaus, orchard folds, cane-green lowlands, botanical gardens, and shaded maturation valleys.",
    architecture: "A dignified copper-and-stone process hall, narrow lantern towers, bonded warehouses, and a domed botanical court.",
    program: "Mash house, fermentation rooms, pot and column still galleries, spirit safe, blending lab, proofing hall, rickhouses, and tasting salon."
  },
  {
    id: "coffee",
    name: "Coffee Academy",
    shortName: "Coffee",
    guild: "steep",
    route: "#app/btg?journey=coffee",
    signal: "From seed to service",
    description: "Move from coffee ecology and processing through roasting, extraction, sensory calibration, and cafe service.",
    focus: ["Cultivation and processing", "Roast development", "Extraction and service"],
    accent: "#9d6a4c",
    coordinate: { lat: 34, lon: -71 },
    heading: 8,
    campusScale: 1.02,
    cameraDistance: 4.1,
    countryBorder: [
      { lat: 65, lon: -101 }, { lat: 69, lon: -80 }, { lat: 63, lon: -55 },
      { lat: 56, lon: -40 }, { lat: 35, lon: -42 }, { lat: 22, lon: -40 },
      { lat: 27, lon: -54 }, { lat: 23, lon: -70 }, { lat: 29, lon: -85 },
      { lat: 25, lon: -100 }, { lat: 38, lon: -97 }
    ],
    terroir: "Forested highlands, volcanic benches, cloud-cooled slopes, drying terraces, and shaded seed gardens.",
    architecture: "A stepped hillside academy with timber screens, stone processing courts, a brass-roofed roastery, and an open cafe loggia.",
    program: "Nursery, wet and dry mills, fermentation patios, drying decks, green-coffee library, roastery, extraction lab, and cafe."
  },
  {
    id: "tea",
    name: "Tea Academy",
    shortName: "Tea",
    guild: "steep",
    route: "#app/btg?journey=tea",
    signal: "From garden to cup",
    description: "Study cultivar, terroir, plucking, manufacture, oxidation, finishing, infusion, and tea service.",
    focus: ["Garden and cultivar", "Leaf manufacture", "Infusion and ritual"],
    accent: "#66a77b",
    coordinate: { lat: 4, lon: -71 },
    heading: -10,
    campusScale: 1,
    cameraDistance: 4.1,
    countryBorder: [
      { lat: 25, lon: -100 }, { lat: 29, lon: -85 }, { lat: 23, lon: -70 },
      { lat: 27, lon: -54 }, { lat: 22, lon: -40 }, { lat: 16, lon: -37 },
      { lat: -4, lon: -44 }, { lat: -15, lon: -42 }, { lat: -13, lon: -54 },
      { lat: -18, lon: -70 }, { lat: -12, lon: -86 }, { lat: -16, lon: -101 },
      { lat: -14, lon: -99 }, { lat: 12, lon: -104 }
    ],
    terroir: "Misty tea ridges, terraced gardens, humid valleys, windbreak forests, and clear spring-fed channels.",
    architecture: "Long glass-and-timber leaf halls with ventilated roofs, garden pavilions, rolling galleries, and a quiet infusion rotunda.",
    program: "Cultivar garden, plucking studio, withering loft, rolling and oxidation rooms, firing hall, sensory archive, and tea salon."
  },
  {
    id: "kombucha",
    name: "Kombucha Academy",
    shortName: "Kombucha",
    guild: "steep",
    affiliateGuilds: ["culture"],
    route: "#app/btg?journey=kombucha",
    signal: "From tea to living culture",
    description: "Connect tea, sugar, microbial culture, controlled fermentation, flavor, stability, packaging, and draft care.",
    focus: ["Sweet tea foundation", "Culture ecology", "Stability and service"],
    accent: "#a66cc2",
    coordinate: { lat: -26, lon: -71 },
    heading: 15,
    campusScale: 0.98,
    cameraDistance: 4.05,
    countryBorder: [
      { lat: -16, lon: -101 }, { lat: -12, lon: -86 }, { lat: -18, lon: -70 },
      { lat: -13, lon: -54 }, { lat: -15, lon: -42 }, { lat: -28, lon: -39 },
      { lat: -51, lon: -53 }, { lat: -60, lon: -75 }, { lat: -56, lon: -96 },
      { lat: -37, lon: -104 }
    ],
    terroir: "Temperate tea gardens meet herb meadows, cool culture caves, fruit orchards, and a clean-water basin.",
    architecture: "A luminous culture conservatory with ceramic fermentation rooms, botanical galleries, and a compact cold-cellar wing.",
    program: "Tea kitchen, culture bank, primary and secondary fermentation halls, flavor garden, quality lab, cold storage, packaging, and draft bar."
  },
  {
    id: "water",
    name: "Water Academy",
    shortName: "Water",
    guild: "source",
    route: "#app/btg?journey=water",
    signal: "From cloud to glass",
    description: "See the source, chemistry, treatment, infrastructure, access, packaging, and service behind the universal ingredient.",
    focus: ["Source and watershed", "Chemistry and treatment", "Access and service"],
    accent: "#72c7df",
    coordinate: { lat: 34, lon: 0 },
    heading: -5,
    campusScale: 1.05,
    cameraDistance: 4.2,
    countryBorder: [
      { lat: 67, lon: -30 }, { lat: 70, lon: -9 }, { lat: 65, lon: 16 },
      { lat: 56, lon: 31 }, { lat: 35, lon: 28 }, { lat: 22, lon: 30 },
      { lat: 28, lon: 16 }, { lat: 24, lon: 0 }, { lat: 30, lon: -16 },
      { lat: 26, lon: -31 }, { lat: 39, lon: -28 }
    ],
    terroir: "Mountain snowfields, aquifers, forested watersheds, wetlands, mineral springs, and a braided river plain.",
    architecture: "A civic hydrology forum of pale stone and glass, with a rain-catching roof, filter galleries, and an aquifer observatory.",
    program: "Watershed lab, source gallery, chemistry observatory, treatment works, infrastructure studio, access forum, and water service hall."
  },
  {
    id: "juice",
    name: "Juice Academy",
    shortName: "Juice",
    guild: "source",
    route: "#app/btg?journey=juice",
    signal: "From orchard to shared glass",
    description: "Follow fruit quality through extraction, clarification, preservation, formulation, packaging, and the cold chain.",
    focus: ["Fruit and harvest", "Extraction and clarity", "Preservation and package"],
    accent: "#ee7c54",
    coordinate: { lat: 4, lon: 0 },
    heading: 10,
    campusScale: 1.01,
    cameraDistance: 4.1,
    countryBorder: [
      { lat: 26, lon: -31 }, { lat: 30, lon: -16 }, { lat: 24, lon: 0 },
      { lat: 28, lon: 16 }, { lat: 22, lon: 30 }, { lat: 16, lon: 34 },
      { lat: -5, lon: 27 }, { lat: -15, lon: 29 }, { lat: -13, lon: 16 },
      { lat: -18, lon: 0 }, { lat: -12, lon: -16 }, { lat: -16, lon: -31 },
      { lat: -13, lon: -29 }, { lat: 13, lon: -34 }
    ],
    terroir: "Citrus terraces, temperate orchards, tropical fruit gardens, fertile floodplains, and cold spring storage caves.",
    architecture: "Orchard-facing pavilions flow into a bright extraction hall, transparent clarification galleries, and a chilled packing arcade.",
    program: "Variety orchard, harvest court, wash and sorting line, extraction hall, clarification lab, preservation gallery, blending studio, and cold chain."
  },
  {
    id: "milk",
    name: "Milk Academy",
    shortName: "Milk",
    guild: "source",
    affiliateGuilds: ["culture"],
    route: "#app/btg?journey=milk",
    signal: "From pasture to shared glass",
    description: "Connect farm ecology, composition, safety, processing, cultured products, packaging, and cold service.",
    focus: ["Farm and composition", "Safety and processing", "Cold chain and service"],
    accent: "#bcdde5",
    coordinate: { lat: -26, lon: 0 },
    heading: -12,
    campusScale: 1.04,
    cameraDistance: 4.15,
    countryBorder: [
      { lat: -16, lon: -31 }, { lat: -12, lon: -16 }, { lat: -18, lon: 0 },
      { lat: -13, lon: 16 }, { lat: -15, lon: 29 }, { lat: -26, lon: 32 },
      { lat: -50, lon: 18 }, { lat: -59, lon: -3 }, { lat: -55, lon: -25 },
      { lat: -36, lon: -34 }
    ],
    terroir: "Cool pasture basins, forage meadows, shaded barns, clean-water channels, and a protected refrigerated valley.",
    architecture: "A humane farm-and-science campus with timber barns, white ceramic process halls, glazed quality labs, and a cold-chain depot.",
    program: "Pasture and herd observatory, receiving bay, composition lab, pasteurization and separation halls, culture room, filling line, and cold store."
  },
  {
    id: "health-drinks",
    name: "Health & Supplements Academy",
    shortName: "Health",
    guild: "energy",
    route: "#app/btg?journey=health-drinks",
    signal: "From promise to proof",
    description: "Evaluate ingredients, evidence, formulation, stability, quality, claims, and responsible serving context.",
    focus: ["Evidence and claims", "Formulation and stability", "Quality and serving"],
    accent: "#93c78f",
    coordinate: { lat: 34, lon: 70 },
    heading: 7,
    campusScale: 1.02,
    cameraDistance: 4.1,
    countryBorder: [
      { lat: 64, lon: 40 }, { lat: 68, lon: 61 }, { lat: 65, lon: 86 },
      { lat: 58, lon: 101 }, { lat: 37, lon: 98 }, { lat: 22, lon: 100 },
      { lat: 27, lon: 86 }, { lat: 23, lon: 70 }, { lat: 29, lon: 55 },
      { lat: 25, lon: 39 }, { lat: 36, lon: 42 }
    ],
    terroir: "Medicinal and culinary botanical gardens, evidence fields, clean cultivation houses, and an instrumented spring basin.",
    architecture: "A calm research cloister of stone, brass, and laboratory glass, organized around a botanical evidence garden.",
    program: "Ingredient archive, evidence library, formulation studio, stability chambers, quality lab, claims forum, and responsible-service clinic."
  },
  {
    id: "protein",
    name: "Protein Academy",
    shortName: "Protein",
    guild: "energy",
    route: "#app/btg?journey=health-drinks&focus=protein",
    signal: "From structure to stable serving",
    description: "Study protein sources, dispersal, hydration, heat and acid behavior, physical stability, quality, and label literacy.",
    focus: ["Protein sources", "Dispersal and stability", "Quality and serving"],
    accent: "#b6d27c",
    coordinate: { lat: 4, lon: 70 },
    heading: -9,
    campusScale: 1,
    cameraDistance: 4.05,
    countryBorder: [
      { lat: 25, lon: 39 }, { lat: 29, lon: 55 }, { lat: 23, lon: 70 },
      { lat: 27, lon: 86 }, { lat: 22, lon: 100 }, { lat: 18, lon: 104 },
      { lat: -4, lon: 97 }, { lat: -15, lon: 100 }, { lat: -13, lon: 86 },
      { lat: -18, lon: 70 }, { lat: -12, lon: 54 }, { lat: -17, lon: 39 },
      { lat: -15, lon: 41 }, { lat: 10, lon: 35 }
    ],
    terroir: "Pulse fields, grain terraces, dairy research pasture, seed gardens, and clean-water process wetlands.",
    architecture: "Interlocking preparation and science halls express structure without literal symbolism, linked by a luminous hydration atrium.",
    program: "Source gallery, milling and extraction lab, hydration theater, blending and homogenization hall, stability lab, packaging studio, and service bar."
  },
  {
    id: "energy-drinks",
    name: "Energy Academy",
    shortName: "Energy",
    guild: "energy",
    route: "#app/btg?journey=energy-drinks",
    signal: "From signal to stewardship",
    description: "Inspect functional ingredients, caffeine context, mixing, process control, packaging, quality, and informed use.",
    focus: ["Formula architecture", "Processing and package", "Evidence and stewardship"],
    accent: "#c8a1ff",
    coordinate: { lat: -26, lon: 70 },
    heading: 14,
    campusScale: 0.99,
    cameraDistance: 4.05,
    countryBorder: [
      { lat: -17, lon: 39 }, { lat: -12, lon: 54 }, { lat: -18, lon: 70 },
      { lat: -13, lon: 86 }, { lat: -15, lon: 100 }, { lat: -27, lon: 102 },
      { lat: -52, lon: 88 }, { lat: -61, lon: 65 }, { lat: -57, lon: 44 },
      { lat: -40, lon: 36 }
    ],
    terroir: "High-sun botanical terraces, tea and coffee research plots, mineral waterworks, and a cool logistics plateau.",
    architecture: "A precise civic-industrial campus with a luminous mixing nave, narrow quality towers, and a high-speed but dignified canning hall.",
    program: "Ingredient vault, formula studio, caffeine context gallery, blending and treatment halls, quality lab, filling line, package archive, and stewardship forum."
  },
  {
    id: "sodas",
    name: "Carbonated Academy",
    shortName: "Carbonated",
    guild: "culture",
    route: "#app/btg?journey=sodas",
    signal: "From water to shared sparkle",
    description: "Unpack water, sweetening, flavor systems, carbonation, filling, packaging, distribution, and fountain service.",
    focus: ["Water and formulation", "Carbonation and filling", "Package and fountain"],
    accent: "#ef6f92",
    coordinate: { lat: 34, lon: 142 },
    heading: -7,
    campusScale: 1.02,
    cameraDistance: 4.1,
    countryBorder: [
      { lat: 65, lon: 111 }, { lat: 69, lon: 132 }, { lat: 63, lon: 157 },
      { lat: 56, lon: 171 }, { lat: 35, lon: 169 }, { lat: 22, lon: 170 },
      { lat: 27, lon: 157 }, { lat: 23, lon: 141 }, { lat: 29, lon: 125 },
      { lat: 25, lon: 110 }, { lat: 38, lon: 113 }
    ],
    terroir: "Mineral springs, citrus groves, spice gardens, sugar fields, and a cool river corridor feeding the carbonation works.",
    architecture: "A buoyant glass-and-stone bottling forum with a sparkling central lantern, flavor pavilions, and an arcaded fountain court.",
    program: "Water treatment, sweetener and flavor galleries, syrup room, carbonation hall, filling line, package lab, distribution court, and fountain studio."
  },
  {
    id: "fermented",
    name: "Fermented Academy",
    shortName: "Fermented",
    guild: "culture",
    signal: "From culture to craft",
    description: "Explore microbial communities, substrate, controlled fermentation, acidity, stability, safety, and service across cultured beverages.",
    focus: ["Microbial ecology", "Process and safety", "Stability and service"],
    accent: "#d98b6c",
    coordinate: { lat: 4, lon: 142 },
    heading: 11,
    campusScale: 0.98,
    cameraDistance: 4.05,
    countryBorder: [
      { lat: 25, lon: 110 }, { lat: 29, lon: 125 }, { lat: 23, lon: 141 },
      { lat: 27, lon: 157 }, { lat: 22, lon: 170 }, { lat: 16, lon: 174 },
      { lat: -4, lon: 167 }, { lat: -15, lon: 169 }, { lat: -13, lon: 157 },
      { lat: -18, lon: 141 }, { lat: -12, lon: 125 }, { lat: -16, lon: 110 },
      { lat: -14, lon: 112 }, { lat: 12, lon: 106 }
    ],
    terroir: "Grain, fruit, vegetable, and tea plots surround culture caves, salt gardens, temperate cellars, and a shared microbial commons.",
    architecture: "Clustered ceramic-and-glass fermentation houses circle a culture archive, with protected process courts and visible safety laboratories.",
    program: "Substrate garden, culture bank, fermentation houses, acid and sensory lab, stability rooms, cold cellar, packaging studio, and service commons."
  },
  {
    id: "regional-drinks",
    name: "Regional Drinks Academy",
    shortName: "Regional Drinks",
    guild: "culture",
    signal: "From place to shared tradition",
    description: "Follow local ingredients, preservation, ritual, technique, identity, and responsible service across regional beverage traditions.",
    focus: ["Place and ingredient", "Tradition and technique", "Context and service"],
    accent: "#e0ad65",
    coordinate: { lat: -26, lon: 142 },
    heading: -14,
    campusScale: 1.03,
    cameraDistance: 4.15,
    countryBorder: [
      { lat: -16, lon: 110 }, { lat: -12, lon: 125 }, { lat: -18, lon: 141 },
      { lat: -13, lon: 157 }, { lat: -15, lon: 169 }, { lat: -28, lon: 172 },
      { lat: -51, lon: 158 }, { lat: -60, lon: 136 }, { lat: -56, lon: 115 },
      { lat: -37, lon: 107 }
    ],
    terroir: "A mosaic of highland, desert, forest, tropical, and coastal source landscapes arranged around a protected cultural watershed.",
    architecture: "A flexible civic campus of regionally adaptable halls and courtyards, united by SIP Academy brass details rather than one imposed style.",
    program: "Living ingredient archive, oral-history library, technique workshops, preservation rooms, community kitchens, sensory forum, and responsible-service hall."
  }
];

export const SIP_ACADEMY_GUILDS: SipAcademyGuild[] = [
  {
    id: "cask",
    name: "Cask Guild",
    motto: "Fermentation, transformation, and time",
    description: "The craft houses where fruit, grain, and raw material become wine, beer, and spirits through controlled change.",
    focus: ["Wine", "Beer", "Spirits"],
    campusIds: ["wine", "beer", "spirits"],
    anchor: { lat: 18, lon: -163 },
    border: [
      { lat: 64, lon: -171 }, { lat: 68, lon: -150 }, { lat: 65, lon: -124 },
      { lat: 58, lon: -111 }, { lat: 37, lon: -113 }, { lat: 18, lon: -108 },
      { lat: -4, lon: -114 }, { lat: -27, lon: -110 }, { lat: -52, lon: -122 },
      { lat: -61, lon: -145 }, { lat: -57, lon: -166 }, { lat: -40, lon: -174 },
      { lat: -15, lon: -169 }, { lat: 10, lon: -174 }, { lat: 36, lon: -168 }
    ]
  },
  {
    id: "steep",
    name: "Steep Guild",
    motto: "Leaf, seed, culture, and extraction",
    description: "Garden and transformation academies for coffee, tea, and kombucha, united by origin and infusion.",
    focus: ["Coffee", "Tea", "Kombucha"],
    campusIds: ["coffee", "tea", "kombucha"],
    anchor: { lat: 18, lon: -91 },
    border: [
      { lat: 65, lon: -101 }, { lat: 69, lon: -80 }, { lat: 63, lon: -55 },
      { lat: 56, lon: -40 }, { lat: 35, lon: -42 }, { lat: 16, lon: -37 },
      { lat: -4, lon: -44 }, { lat: -28, lon: -39 }, { lat: -51, lon: -53 },
      { lat: -60, lon: -75 }, { lat: -56, lon: -96 }, { lat: -37, lon: -104 },
      { lat: -14, lon: -99 }, { lat: 12, lon: -104 }, { lat: 38, lon: -97 }
    ]
  },
  {
    id: "source",
    name: "Source Guild",
    motto: "Origin, nourishment, and custody",
    description: "The academies that begin with water, fruit, pasture, and the systems that protect them on the way to the guest.",
    focus: ["Water", "Juice", "Milk"],
    campusIds: ["water", "juice", "milk"],
    anchor: { lat: 18, lon: -20 },
    border: [
      { lat: 67, lon: -30 }, { lat: 70, lon: -9 }, { lat: 65, lon: 16 },
      { lat: 56, lon: 31 }, { lat: 35, lon: 28 }, { lat: 16, lon: 34 },
      { lat: -5, lon: 27 }, { lat: -26, lon: 32 }, { lat: -50, lon: 18 },
      { lat: -59, lon: -3 }, { lat: -55, lon: -25 }, { lat: -36, lon: -34 },
      { lat: -13, lon: -29 }, { lat: 13, lon: -34 }, { lat: 39, lon: -28 }
    ]
  },
  {
    id: "energy",
    name: "Energy Guild",
    motto: "Evidence, function, and stewardship",
    description: "Research-led academies for health and supplements, protein systems, and energy formulations.",
    focus: ["Health & supplements", "Protein", "Energy"],
    campusIds: ["health-drinks", "protein", "energy-drinks"],
    anchor: { lat: 18, lon: 50 },
    border: [
      { lat: 64, lon: 40 }, { lat: 68, lon: 61 }, { lat: 65, lon: 86 },
      { lat: 58, lon: 101 }, { lat: 37, lon: 98 }, { lat: 18, lon: 104 },
      { lat: -4, lon: 97 }, { lat: -27, lon: 102 }, { lat: -52, lon: 88 },
      { lat: -61, lon: 65 }, { lat: -57, lon: 44 }, { lat: -40, lon: 36 },
      { lat: -15, lon: 41 }, { lat: 10, lon: 35 }, { lat: 36, lon: 42 }
    ]
  },
  {
    id: "culture",
    name: "Culture Guild",
    motto: "Carbonation, living systems, and what comes next",
    description: "A cross-academy commons for carbonated beverages, microbial cultures, fermented systems, and future specialties.",
    focus: ["Carbonated", "Fermented and cultured", "Regional traditions"],
    campusIds: ["sodas", "fermented", "regional-drinks"],
    anchor: { lat: 18, lon: 122 },
    border: [
      { lat: 65, lon: 111 }, { lat: 69, lon: 132 }, { lat: 63, lon: 157 },
      { lat: 56, lon: 171 }, { lat: 35, lon: 169 }, { lat: 16, lon: 174 },
      { lat: -4, lon: 167 }, { lat: -28, lon: 172 }, { lat: -51, lon: 158 },
      { lat: -60, lon: 136 }, { lat: -56, lon: 115 }, { lat: -37, lon: 107 },
      { lat: -14, lon: 112 }, { lat: 12, lon: 106 }, { lat: 38, lon: 113 }
    ]
  }
];

export function selectionFromHashValue(hash: string): SipAcademyMapSelection {
  const rawHash = hash.replace(/^#/, "");
  const queryIndex = rawHash.indexOf("?");
  if (queryIndex < 0) return SIP_ACADEMY_WORLD_SELECTION;
  const params = new URLSearchParams(rawHash.slice(queryIndex + 1));
  const campus = params.get("campus");
  if (SIP_ACADEMY_CAMPUSES.some((item) => item.id === campus)) {
    return { kind: "campus", id: campus as SipAcademyCampusId };
  }
  const guild = params.get("guild");
  if (SIP_ACADEMY_GUILDS.some((item) => item.id === guild)) {
    return { kind: "guild", id: guild as SipAcademyGuildId };
  }
  return SIP_ACADEMY_WORLD_SELECTION;
}

export function selectionToHash(selection: SipAcademyMapSelection): string {
  if (selection.kind === "world") return "#app/sip-academy-map";
  const params = new URLSearchParams();
  params.set(selection.kind, selection.id);
  return `#app/sip-academy-map?${params.toString()}`;
}

export function selectionFromHash(): SipAcademyMapSelection {
  if (typeof window === "undefined") return SIP_ACADEMY_WORLD_SELECTION;
  return selectionFromHashValue(window.location.hash);
}
