export type BeyondTheGlassSpeaker = "Sippy" | "Roma" | "Hummin";

export type BeyondTheGlassNarrationLine = {
  speaker: BeyondTheGlassSpeaker;
  text: string;
  durationSeconds: number;
};

export type BeyondTheGlassMotion =
  | "establish"
  | "push-in"
  | "orbit"
  | "cutaway"
  | "rotate"
  | "glide"
  | "reassemble";

export type BeyondTheGlassFieldNote = {
  eyebrow: string;
  title: string;
  detail: string;
};

export type BeyondTheGlassScene = {
  id: string;
  number: string;
  title: string;
  range: readonly [number, number];
  eyebrow: string;
  summary: string;
  checkpoint: string;
  motion: BeyondTheGlassMotion;
  artwork: {
    src: string;
    srcSet?: string;
    portraitSrc?: string;
    portraitSrcSet?: string;
    alt: string;
    fit?: "cover" | "contain";
    position?: string;
  };
  landmark: {
    label: string;
    x: number;
    y: number;
  };
  drop: {
    x: number;
    y: number;
    size: number;
  };
  fieldNotes: BeyondTheGlassFieldNote[];
  narration: BeyondTheGlassNarrationLine[];
};

export type BeyondTheGlassSource = {
  id: string;
  organization: string;
  title: string;
  url: string;
  note: string;
};

export type BeyondTheGlassChapter = {
  slug: string;
  title: string;
  chapterTitle: string;
  subject: string;
  description: string;
  coreMessage: string;
  assets: {
    academyMap: string;
    academyMapSet: string;
    centralDrop: string;
    reducedMotionPoster: string;
  };
  scenes: BeyondTheGlassScene[];
  sources: BeyondTheGlassSource[];
  primaryCta: { label: string; route: string };
};

const scenes: BeyondTheGlassScene[] = [
  {
    id: "academy-plaza",
    number: "01",
    title: "Academy Plaza",
    range: [0, 0.05],
    eyebrow: "Choose the active journey",
    summary: "Wine is open. The next SIP Academy field trips are still under construction.",
    checkpoint: "Wine adventure ready",
    motion: "establish",
    artwork: {
      src: "/beyond-the-glass/sip-academy-1600.webp",
      srcSet:
        "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
      alt:
        "A complete aerial view of SIP Academy, with vineyards and warm brass-and-glass craft halls connected by luminous blue waterways.",
      fit: "contain"
    },
    landmark: { label: "Wine journey", x: 50, y: 49 },
    drop: { x: 50, y: 49, size: 9 },
    fieldNotes: [
      {
        eyebrow: "Active field trip",
        title: "Wine · From Rain to First Sip",
        detail:
          "Enter the glowing center to follow one drop across vineyard, winery, market, service, and the final table."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "The plaza is awake. Wine is today’s active field trip; the other academy wings are still being built."
      }
    ]
  },
  {
    id: "guides-at-sunrise",
    number: "02",
    title: "Meet the Field Team",
    range: [0.05, 0.1],
    eyebrow: "Sunrise",
    summary: "The academy doors open and three distinct guides step into the vineyard.",
    checkpoint: "Academy to field",
    motion: "glide",
    artwork: {
      src: "/beyond-the-glass/wine-guides-sunrise-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-guides-sunrise-960.webp 960w, /beyond-the-glass/wine-guides-sunrise-1600.webp 1600w",
      alt:
        "Sippy, Roma, and Hummin emerge from a luminous SIP Academy doorway at sunrise and walk toward vineyard rows.",
      position: "center"
    },
    landmark: { label: "Sunrise gate", x: 50, y: 43 },
    drop: { x: 78, y: 78, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Sippy",
        title: "Leads the way",
        detail: "Sipopedia’s guide keeps the adventure moving and connects every stop."
      },
      {
        eyebrow: "Roma",
        title: "Flavor detective",
        detail: "Roma spots sensory clues and turns tasting into playful discovery."
      },
      {
        eyebrow: "Hummin",
        title: "Memory keeper",
        detail: "Hummin protects, connects, and recalls the data behind each decision."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "We each watch the journey differently. I’ll lead; Roma will chase flavor clues; Hummin will guard the system’s memory."
      }
    ]
  },
  {
    id: "two-regions",
    number: "03",
    title: "Two Regions, Two Programs",
    range: [0.1, 0.15],
    eyebrow: "Place",
    summary:
      "Cool coastal vineyards and warmer inland hills lead fruit toward different winery decisions.",
    checkpoint: "Coast to inland",
    motion: "glide",
    artwork: {
      src: "/beyond-the-glass/winery-tour/two-regions-1600.webp",
      srcSet:
        "/beyond-the-glass/winery-tour/two-regions-960.webp 960w, /beyond-the-glass/winery-tour/two-regions-1600.webp 1600w",
      alt:
        "A continuous SIP Academy wine landscape connecting cool foggy coastal vineyards to warmer inland limestone hills with a luminous blue water path.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Coast and inland", x: 50, y: 26 },
    drop: { x: 49, y: 57, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Cool-climate route",
        title: "Coast, wind, and a longer season",
        detail:
          "Coastal influence can moderate heat and preserve acidity, helping varieties such as Chardonnay and Pinot Noir develop along a slower flavor clock."
      },
      {
        eyebrow: "Warm-climate route",
        title: "Sun, cool nights, and structure",
        detail:
          "Warmer inland days can build ripeness while cool nights and site conditions help retain balance in Cabernet Sauvignon and Rhône varieties."
      },
      {
        eyebrow: "Winery program",
        title: "One winery, more than one route",
        detail:
          "White-wine programs often protect juice and manage solids, temperature, vessel, lees, and oxygen differently from red programs built around skin contact and cap management."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "Before we follow one drop, look at the route around it. Coast, wind, soil, elevation, and temperature send each vineyard toward a different wine."
      }
    ]
  },
  {
    id: "rain-and-roots",
    number: "04",
    title: "Rain Finds the Roots",
    range: [0.15, 0.2],
    eyebrow: "Water",
    summary: "Rain enters soil, meets the root system, and supports the vine above.",
    checkpoint: "Cloud to root",
    motion: "cutaway",
    artwork: {
      src: "/beyond-the-glass/curriculum/vine-family-rootstock-1600.webp",
      srcSet:
        "/beyond-the-glass/curriculum/vine-family-rootstock-960.webp 960w, /beyond-the-glass/curriculum/vine-family-rootstock-1600.webp 1600w",
      alt:
        "A SIP Academy vine-family workshop showing a living grapevine above ground, graft and rootstock below ground, and water moving through a scientifically correct root system.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Vineyard water", x: 10, y: 23 },
    drop: { x: 48, y: 58, size: 10 },
    fieldNotes: [
      {
        eyebrow: "Vineyard technique",
        title: "Water is managed, not guessed",
        detail:
          "Growers read soil, weather, vine water status, and growth before deciding when and how much to irrigate."
      },
      {
        eyebrow: "Look closer",
        title: "Roots stay below. Fruit stays above.",
        detail:
          "Roots absorb water and minerals underground; grape clusters develop on the canopy in sunlight."
      },
      {
        eyebrow: "Soil texture",
        title: "Clay, silt, sand, and gravel hold water differently",
        detail:
          "Particle size and structure influence drainage, aeration, water retention, root penetration, and nutrient availability. Soil affects vine growth; it does not simply transfer a flavor into the grape."
      },
      {
        eyebrow: "Vine partnership",
        title: "Rootstock supports the fruiting scion",
        detail:
          "Many vines join a Vitis vinifera fruiting variety above the graft to a selected rootstock below it for phylloxera resistance, site adaptation, or vigor management."
      },
      {
        eyebrow: "Water status",
        title: "Stress can concentrate or stop growth",
        detail:
          "Moderate, well-timed water limitation may slow vegetative growth, but severe or poorly timed stress can reduce photosynthesis, berry development, yield, and vine health."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "Before there is a grape, a drop crosses leaf, soil, and root. The vineyard has already begun shaping the wine."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Water decisions connect climate, soil, vine health, fruit development, and responsible farming."
      }
    ]
  },
  {
    id: "vine-and-berry",
    number: "05",
    title: "The Vine Builds a Berry",
    range: [0.2, 0.25],
    eyebrow: "Growth",
    summary:
      "Pull the vine apart, orbit every living layer, then rejoin permanent wood, fruiting wood, canopy, and berry.",
    checkpoint: "Root to berry",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/vine-anatomy/vine-anatomy-front-1600.webp",
      srcSet:
        "/beyond-the-glass/vine-anatomy/vine-anatomy-front-960.webp 960w, /beyond-the-glass/vine-anatomy/vine-anatomy-front-1600.webp 1600w",
      alt:
        "A complete mature grapevine in the SIP Academy conservatory, with roots visible below the soil and trunk, cordons, canes, shoots, canopy, flowers, and grape clusters visible above.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Vineyard rows", x: 87, y: 24 },
    drop: { x: 67, y: 45, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Permanent architecture",
        title: "Roots → trunk → cordon",
        detail:
          "Roots and trunk support the vine. A cordon is a permanent horizontal extension of the trunk that can carry fruiting spurs."
      },
      {
        eyebrow: "Fruiting architecture",
        title: "Cane → spur → bud → shoot",
        detail:
          "A mature one-year shoot becomes a cane. Pruning retains canes or shorter spurs so selected buds can open into fruiting shoots."
      },
      {
        eyebrow: "Annual growth cycle",
        title: "Bud break → flowering → berry set → véraison",
        detail:
          "Shoots and leaves expand, flowers set berries, véraison begins ripening, and the cluster moves toward physiological maturity and harvest."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "Start below the soil. Climb from root to trunk, then follow the cordon until the fruiting wood begins."
      },
      {
        speaker: "Hummin",
        durationSeconds: 12,
        text:
          "A shoot grows green this season and hardens into a cane. A spur is shorter, but both retain buds that can build next season’s crop."
      },
      {
        speaker: "Roma",
        durationSeconds: 11,
        text:
          "Now follow the flavor clock: bud break, flowers, tiny green berries, véraison, and finally a ripe cluster ready to taste."
      }
    ]
  },
  {
    id: "harvest",
    number: "06",
    title: "Harvest Run",
    range: [0.25, 0.3],
    eyebrow: "People",
    summary: "Ripe fruit moves quickly from the row toward the crush house.",
    checkpoint: "Berry to bin",
    motion: "glide",
    artwork: {
      src: "/beyond-the-glass/wine-harvest-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-harvest-960.webp 960w, /beyond-the-glass/wine-harvest-1600.webp 1600w",
      alt:
        "A diverse vineyard team harvesting ripe grape clusters by hand into shallow bins at sunrise, with SIP Academy beyond the rows.",
      position: "center"
    },
    landmark: { label: "Harvest gate", x: 18, y: 35 },
    drop: { x: 29, y: 48, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Timing",
        title: "Picking is a production decision",
        detail:
          "Sugar, acidity, flavor, weather, fruit condition, crew timing, and winery capacity all meet at harvest."
      },
      {
        eyebrow: "Fruit care",
        title: "Damage changes the starting line",
        detail:
          "Broken berries release juice early, giving microbes access before the fruit reaches the winery."
      },
      {
        eyebrow: "Harvest method",
        title: "Hand picking protects selectivity",
        detail:
          "A trained crew can choose individual clusters and work on steep or irregular sites, but the result depends on careful handling, labor, time, and weather."
      },
      {
        eyebrow: "Harvest method",
        title: "Machines trade selectivity for speed",
        detail:
          "Mechanical harvesters remove berries rapidly and can work during cool night hours. Vineyard layout, fruit integrity, sorting capacity, and wine style determine whether that speed helps."
      },
      {
        eyebrow: "Cold chain",
        title: "Shallow bins and cooling buy time",
        detail:
          "Small clean containers reduce crushing under the fruit’s own weight. Shade, short transport, and cooling can slow oxidation and microbial growth before processing."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Harvest turns a season of slow growth into a fast-moving relay. Fruit condition now matters minute by minute."
      }
    ]
  },
  {
    id: "crush-house",
    number: "07",
    title: "Inside the Crush House",
    range: [0.3, 0.35],
    eyebrow: "Equipment",
    summary: "Sorting, destemming, crushing, and pressing open different winemaking paths.",
    checkpoint: "Bin to must",
    motion: "rotate",
    artwork: {
      src: "/beyond-the-glass/wine-crush-house-academy-2026-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-crush-house-academy-2026-960.webp 960w, /beyond-the-glass/wine-crush-house-academy-2026-1600.webp 1600w",
      alt:
        "Adult winery workers and Hummin follow grapes from a sorting table through a crusher-destemmer and press inside the SIP Academy crush house.",
      position: "center"
    },
    landmark: { label: "Crush house", x: 18, y: 51 },
    drop: { x: 56, y: 52, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Machine anatomy",
        title: "Destemmer before crusher",
        detail:
          "Removing stems and gently breaking berries creates must. A press separates liquid from skins and seeds when the style calls for it."
      },
      {
        eyebrow: "Choice point",
        title: "Skin contact changes the route",
        detail:
          "Keeping juice with skins extracts color, tannin, and flavor; separating them early sends the wine down a different path."
      },
      {
        eyebrow: "Sorting table",
        title: "Remove what should not ferment",
        detail:
          "Leaves, damaged fruit, insects, stones, and unripe material can be removed by hand or optical sorting before the lot enters the production line."
      },
      {
        eyebrow: "Press cycle",
        title: "Pressure separates liquid from solids",
        detail:
          "A pneumatic press inflates an internal membrane against a perforated drum. Gentle staged cycles help manage yield, solids, bitterness, and phenolic extraction."
      },
      {
        eyebrow: "Transfer path",
        title: "Pumps and gravity move must",
        detail:
          "Gravity, must pumps, hoses, and receiving vessels move juice, skins, and seeds. Every transfer introduces choices about shear, oxygen, sanitation, and separation."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 10,
        text:
          "Watch the machine turn. Every opening, roller, screen, and pump makes a physical choice about what enters fermentation."
      }
    ]
  },
  {
    id: "fermentation",
    number: "08",
    title: "The Fermentation Hall",
    range: [0.35, 0.4],
    eyebrow: "Transformation",
    summary: "Yeast converts grape sugar while the cellar team watches temperature and progress.",
    checkpoint: "Sugar to wine",
    motion: "push-in",
    artwork: {
      src: "/beyond-the-glass/wine-fermentation-hall-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-fermentation-hall-960.webp 960w, /beyond-the-glass/wine-fermentation-hall-1600.webp 1600w",
      alt:
        "A glowing SIP Academy fermentation hall with stainless steel tanks, active cellar work, and illuminated process paths.",
      position: "center"
    },
    landmark: { label: "Fermentation hall", x: 81, y: 49 },
    drop: { x: 54, y: 45, size: 9 },
    fieldNotes: [
      {
        eyebrow: "Core science",
        title: "Yeast changes the energy",
        detail:
          "During alcoholic fermentation, yeast consumes grape sugars and produces ethanol, carbon dioxide, heat, and flavor-active compounds."
      },
      {
        eyebrow: "Cellar watch",
        title: "Temperature and cap management",
        detail:
          "Cooling, pump-overs, punch-downs, nutrients, oxygen, and sanitation help the team guide a healthy fermentation."
      },
      {
        eyebrow: "Closed tank",
        title: "Stainless steel controls the environment",
        detail:
          "A closed stainless tank is easy to clean and can use a cooling jacket to manage heat. Valves and sampling ports let the team follow density, temperature, and aroma."
      },
      {
        eyebrow: "Open fermenter",
        title: "Open tops make the cap reachable",
        detail:
          "Open fermenters give direct access for punch-downs and observation. They also require disciplined sanitation and protection while carbon dioxide and heat escape."
      },
      {
        eyebrow: "Fermentation signal",
        title: "Sugar falls as carbon dioxide rises",
        detail:
          "Density or Brix readings track sugar depletion while temperature and sensory checks reveal pace. A stalled or stressed fermentation calls for diagnosis, not guesswork."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 11,
        text:
          "Push into the tank. Sugar falls, heat rises, carbon dioxide escapes, and yeast drives the fastest transformation in the journey."
      }
    ]
  },
  {
    id: "wine-crossroads",
    number: "09",
    title: "The Wine Crossroads",
    range: [0.4, 0.45],
    eyebrow: "Style paths",
    summary:
      "One fermented wine can continue as still wine or enter a specialized sparkling or fortified production path.",
    checkpoint: "One wine, three routes",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/curriculum/wine-crossroads-1600.webp",
      srcSet:
        "/beyond-the-glass/curriculum/wine-crossroads-960.webp 960w, /beyond-the-glass/curriculum/wine-crossroads-1600.webp 1600w",
      alt:
        "A connected SIP Academy wine hall where one central base wine branches toward still-wine vessels, pressure-rated sparkling-wine equipment and secondary-fermentation bottles, and a measured fortified-wine spirit addition.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Wine crossroads", x: 57, y: 47 },
    drop: { x: 51, y: 55, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Still wine path",
        title: "Finish without retained pressure",
        detail:
          "The core journey continues toward vessel choice, maturation, blending, stabilization, filtration when needed, and packaging."
      },
      {
        eyebrow: "Sparkling wine path",
        title: "Build and retain carbon dioxide",
        detail:
          "A prepared base wine may undergo secondary fermentation in bottle or closed tank. Pressure, yeast sediment, clarification, dosage choices, and pressure-safe packaging shape the result."
      },
      {
        eyebrow: "Fortified wine path",
        title: "Add wine spirit at a deliberate moment",
        detail:
          "Fortification adds wine spirit or another permitted vitivinicultural alcohol. Timing can stop fermentation or strengthen a finished wine, changing alcohol, sweetness, and style."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 12,
        text:
          "The cellar splits here. Our drop follows still wine, but sparkling wine traps a second fermentation’s carbon dioxide, while fortified wine meets a measured addition of wine spirit."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Different regions regulate these routes differently. Remember the production principle first, then read the local rule."
      }
    ]
  },
  {
    id: "laboratory",
    number: "10",
    title: "The Quality Lab",
    range: [0.45, 0.5],
    eyebrow: "Evidence",
    summary: "Sensory judgment and measurements help the team decide what the wine needs next.",
    checkpoint: "Wine to decision",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/winery-tour/quality-lab-1600.webp",
      srcSet:
        "/beyond-the-glass/winery-tour/quality-lab-960.webp 960w, /beyond-the-glass/winery-tour/quality-lab-1600.webp 1600w",
      alt:
        "An adult winery laboratory technician uses a pH meter, titration glassware, pipettes, color analysis, automated sample equipment, and sensory glasses beside the production floor.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Quality lab", x: 75, y: 22 },
    drop: { x: 43, y: 49, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Winemaker toolkit",
        title: "Sample, measure, taste, compare",
        detail:
          "Pipettes, pH probes, titration glassware, density tools, color analysis, sample racks, and sensory glasses each reveal a different part of the wine."
      },
      {
        eyebrow: "Choice point",
        title: "SO₂ and acidification",
        detail:
          "Sulfur dioxide can help protect wine from oxidation and unwanted microbes. Acid additions may adjust balance and stability where allowed and needed."
      },
      {
        eyebrow: "Acid balance",
        title: "pH and titratable acidity answer different questions",
        detail:
          "pH relates to acid strength and affects microbial and sulfur-dioxide behavior; titratable acidity estimates the quantity of acids that shape sourness and balance."
      },
      {
        eyebrow: "Fermentation record",
        title: "Density and alcohol verify the conversion",
        detail:
          "Must density or Brix helps follow sugar before and during fermentation. Finished-wine analysis checks alcohol and residual glucose plus fructose against the intended style."
      },
      {
        eyebrow: "Quality screen",
        title: "Oxygen, microbes, and aroma must agree",
        detail:
          "Dissolved oxygen, volatile acidity, sulfur compounds, microbial risk, and sensory comparison can expose a developing fault before a cellar decision becomes irreversible."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 10,
        text:
          "In the lab, numbers and senses work together. A result is not the answer—it is evidence for the next decision."
      }
    ]
  },
  {
    id: "barrel-aging",
    number: "11",
    title: "Enter the Barrel Room",
    range: [0.5, 0.55],
    eyebrow: "Aging",
    summary: "Vessel, oxygen, lees, temperature, and time reshape aroma and texture.",
    checkpoint: "Wine to maturity",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/wine-barrel-cellar-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-barrel-cellar-960.webp 960w, /beyond-the-glass/wine-barrel-cellar-1600.webp 1600w",
      alt:
        "A complete SIP Academy barrel cellar with oak barrels, stainless vessels, clay vessels, a sampling table, and warm stone architecture.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Barrel cellar", x: 81, y: 75 },
    drop: { x: 57, y: 44, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Slow transformation",
        title: "Oak is one possible vessel",
        detail:
          "Barrel size, age, toast, origin, time, topping, and cellar conditions can influence oxygen exposure, aroma, and texture."
      },
      {
        eyebrow: "Cellar conditions",
        title: "Humidity, temperature, and headspace",
        detail:
          "Cellar temperature, humidity, evaporation, topping, sulfur-dioxide checks, sanitation, and vessel condition shape how safely the wine ages."
      },
      {
        eyebrow: "Component tasting",
        title: "Compare barrel to barrel",
        detail:
          "Sampling parallel lots can reveal the effects of vessel material, oak origin, toast, barrel age, lees contact, and malolactic fermentation before a blending decision."
      },
      {
        eyebrow: "Barrel anatomy",
        title: "Staves, heads, hoops, and bung form the vessel",
        detail:
          "Curved oak staves and flat heads are held by metal hoops; the bung closes the sampling and topping opening. Construction quality affects leakage, cleaning, and oxygen ingress."
      },
      {
        eyebrow: "Vessel comparison",
        title: "Steel, concrete, clay, and oak speak differently",
        detail:
          "Stainless steel is inert and tightly controlled. Concrete and clay may shape temperature and oxygen exchange, while oak can add extractable compounds as well as gradual oxygen exposure."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 11,
        text:
          "Circle the barrel room slowly. Here the action is quiet: oxygen, wood, lees, temperature, and time redraw the wine."
      }
    ]
  },
  {
    id: "barrel-workbench",
    number: "12",
    title: "The Barrel Workbench",
    range: [0.55, 0.6],
    eyebrow: "Cellar craft",
    summary:
      "Sampling, topping, stirring, racking, cleaning, and recording keep every barrel connected to the team.",
    checkpoint: "Vessel to evidence",
    motion: "rotate",
    artwork: {
      src: "/beyond-the-glass/winery-tour/barrel-workbench-1600.webp",
      srcSet:
        "/beyond-the-glass/winery-tour/barrel-workbench-960.webp 960w, /beyond-the-glass/winery-tour/barrel-workbench-1600.webp 1600w",
      alt:
        "A coherent winery barrel workbench showing a wine thief, bung and mallet, topping vessel and wand, lees-stirring baton, hoses, pump, racking wand, flashlight, sample bottles, and barrel washer.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Barrel workbench", x: 77, y: 75 },
    drop: { x: 39, y: 47, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Sample and protect",
        title: "Wine thief → glass → cellar log",
        detail:
          "A wine thief pulls a small sample. The team tastes, measures, records, and returns with a topping plan, sulfur decision, or next analysis."
      },
      {
        eyebrow: "Move and maintain",
        title: "Bung, topping, bâtonnage, racking",
        detail:
          "Bungs seal the bunghole; topping replaces wine lost to evaporation; a baton can stir lees; pumps, hoses, and a racking wand move clearer wine away from sediment."
      },
      {
        eyebrow: "Clean between lots",
        title: "Washer, hot water, inspection",
        detail:
          "A rotating spray head, appropriate hot-water or steam sanitation, visual inspection, and disciplined hose care reduce cross-contamination risk."
      },
      {
        eyebrow: "Lees work",
        title: "Bâtonnage changes contact, not just texture",
        detail:
          "Stirring fine lees resuspends settled yeast material and may influence mouthfeel and aroma. It also changes oxygen exposure and must be judged lot by lot."
      },
      {
        eyebrow: "Racking",
        title: "Move clear wine away from sediment",
        detail:
          "A pump or gravity moves wine off settled solids into a clean vessel. The cellar team manages oxygen pickup, turbidity, losses, and sanitation during the transfer."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 12,
        text:
          "The barrel room is not passive storage. Every thief, bung, hose, baton, pump, washer, sample bottle, and log protects a chain of evidence."
      }
    ]
  },
  {
    id: "finishing-bench",
    number: "13",
    title: "The Finishing Bench",
    range: [0.6, 0.65],
    eyebrow: "Preparation",
    summary:
      "Blending and final stability work prepare the chosen wine for a clean, reliable handoff to bottle.",
    checkpoint: "Components to final blend",
    motion: "rotate",
    artwork: {
      src: "/beyond-the-glass/curriculum/finishing-bench-1600.webp",
      srcSet:
        "/beyond-the-glass/curriculum/finishing-bench-960.webp 960w, /beyond-the-glass/curriculum/finishing-bench-1600.webp 1600w",
      alt:
        "A coherent SIP Academy finishing hall with adult winemakers evaluating blending trials beside blending tanks, clarification equipment, a cold-stability vessel, filtration housings, and a final laboratory check.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Finishing bench", x: 60, y: 63 },
    drop: { x: 49, y: 54, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Blend with a purpose",
        title: "Lots become the final wine",
        detail:
          "Winemakers compare trial blends for aroma, structure, balance, consistency, and intended style before committing cellar volumes."
      },
      {
        eyebrow: "Clarify and stabilize",
        title: "Prevent avoidable haze and deposits",
        detail:
          "Settling, racking, fining, protein-stability work, and tartrate-stability work are selected by wine and need—not applied automatically to every lot."
      },
      {
        eyebrow: "Final protection",
        title: "Filter when the risk calls for it",
        detail:
          "Filtration can remove particles and, with an appropriate validated system, reduce microorganisms. The final blend is checked again before packaging."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 11,
        text:
          "The wine is nearly ready, but nearly is not bottled. We compare components, protect the intended texture, and remove only what threatens clarity or stability."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Sequence matters. Blending, malolactic status, fining, and acid decisions belong upstream of the final stability check."
      }
    ]
  },
  {
    id: "sustainability-loop",
    number: "14",
    title: "The Winery Gives Back",
    range: [0.65, 0.7],
    eyebrow: "Systems",
    summary:
      "Energy, water, pomace, packaging, habitat, and people continue moving after the wine leaves a tank.",
    checkpoint: "Resource to renewal",
    motion: "cutaway",
    artwork: {
      src: "/beyond-the-glass/winery-tour/sustainability-loop-1600.webp",
      srcSet:
        "/beyond-the-glass/winery-tour/sustainability-loop-960.webp 960w, /beyond-the-glass/winery-tour/sustainability-loop-1600.webp 1600w",
      alt:
        "A complete SIP Academy winery utility loop connecting solar energy, water recovery and reuse, cellar cleaning, grape pomace and compost, packaging recycling, pollinator habitat, and vineyard cover crops.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Resource loop", x: 27, y: 66 },
    drop: { x: 49, y: 59, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Water and energy",
        title: "Measure use before claiming progress",
        detail:
          "Solar power can reduce purchased electricity. Recovery systems, efficient cleaning, and wastewater management can reduce and redirect water use."
      },
      {
        eyebrow: "Soil and materials",
        title: "Pomace, compost, habitat, packaging",
        detail:
          "Grape solids, cover crops, compost, recycling, pallet reuse, and habitat work form separate systems. Each needs its own measurements and safeguards."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 11,
        text:
          "Follow what usually disappears from the story: water after cleaning, energy behind cooling, pomace after pressing, and materials after delivery."
      }
    ]
  },
  {
    id: "bottling",
    number: "15",
    title: "The Bottling Run",
    range: [0.7, 0.75],
    eyebrow: "Protection",
    summary: "The finished wine moves through a final controlled handoff into bottle.",
    checkpoint: "Cellar to bottle",
    motion: "rotate",
    artwork: {
      src: "/beyond-the-glass/wine-bottling-line-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-bottling-line-960.webp 960w, /beyond-the-glass/wine-bottling-line-1600.webp 1600w",
      alt:
        "A SIP Academy bottling hall with bottles moving through a clean, luminous production line.",
      position: "center"
    },
    landmark: { label: "Bottling hall", x: 19, y: 75 },
    drop: { x: 60, y: 52, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Line sequence",
        title: "Fill, close, inspect, pack",
        detail:
          "Oxygen control, clean equipment, fill height, closure performance, label accuracy, and case handling protect the final wine."
      },
      {
        eyebrow: "Bottle preparation",
        title: "Rinse or air-clean before filling",
        detail:
          "Clean bottles enter a controlled line and are inspected before use. The exact preparation depends on the bottle supply, line design, and winery quality plan."
      },
      {
        eyebrow: "Closure choice",
        title: "Cork, technical cork, and screwcap manage oxygen differently",
        detail:
          "Closure performance, bottle compatibility, intended aging, market expectation, and taint risk all shape the choice. No closure rescues poor filling or storage."
      },
      {
        eyebrow: "Oxygen control",
        title: "Headspace is part of the package",
        detail:
          "Inert gas, accurate fill height, sound closures, and dissolved-oxygen monitoring reduce avoidable oxygen pickup during the final cellar handoff."
      },
      {
        eyebrow: "Traceability",
        title: "Labels and lot codes connect the bottle",
        detail:
          "A correct label, legible lot identity, case record, and retained sample help connect a packaged wine to its production history and destination."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "The line accelerates, but the tolerances tighten. The bottle must carry the cellar’s work without adding a new problem."
      }
    ]
  },
  {
    id: "bottle-passport",
    number: "16",
    title: "The Bottle Passport",
    range: [0.75, 0.8],
    eyebrow: "Identity",
    summary:
      "A label connects the finished wine to product category, origin, producer, vintage, variety, volume, alcohol, and the rules of its market.",
    checkpoint: "Bottle to identity",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/curriculum/bottle-passport-1600.webp",
      srcSet:
        "/beyond-the-glass/curriculum/bottle-passport-960.webp 960w, /beyond-the-glass/curriculum/bottle-passport-1600.webp 1600w",
      alt:
        "An unlabeled bottle rotates on a brass pedestal in the SIP Academy world-wine archive, connected to blank label plates, vineyard and parcel views, grape identity, producer seal, measurement clues, supply route, geographic boundary map, and a world map of wine regions.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "World wine archive", x: 50, y: 47 },
    drop: { x: 49, y: 48, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Compulsory clues",
        title: "First identify the product and origin",
        detail:
          "Required information depends on the destination market. Product category, country or geographic origin, alcohol, net contents, and responsible business details are core clues to verify."
      },
      {
        eyebrow: "Optional clues",
        title: "Vintage and variety need legal permission",
        detail:
          "A vintage, grape name, vineyard, or geographic indication is meaningful only within the rules governing that claim. Never assume every front label uses the same system."
      },
      {
        eyebrow: "World wine route",
        title: "Use the label as a map key",
        detail:
          "France, Italy, Spain, Portugal, Germany, the Americas, Africa, Asia, Australia, New Zealand, and neighboring regions organize origin differently. The Regions atlas continues that journey."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 12,
        text:
          "A label is a compact legal passport. Separate what the market requires from what the producer chooses, then test every origin, vintage, and variety claim against its rules."
      },
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "You do not need twelve country lectures here. Learn to read the key, then carry it into the Regions atlas."
      }
    ]
  },
  {
    id: "tasting-flight",
    number: "17",
    title: "The Tasting Room Flight",
    range: [0.8, 0.85],
    eyebrow: "Sensory translation",
    summary:
      "Five small pours turn vineyard sites, varieties, vessels, and cellar choices into a side-by-side lesson.",
    checkpoint: "Wine to comparison",
    motion: "push-in",
    artwork: {
      src: "/beyond-the-glass/winery-tour/tasting-flight-1600.webp",
      srcSet:
        "/beyond-the-glass/winery-tour/tasting-flight-960.webp 960w, /beyond-the-glass/winery-tour/tasting-flight-1600.webp 1600w",
      alt:
        "An adult winery host guides a five-wine flight from pale white to deeper red, with water, a spittoon, plain crackers, pencils, and a sommelier note card overlooking vineyards.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Tasting salon", x: 51, y: 79 },
    drop: { x: 61, y: 53, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Flight order",
        title: "Move from delicate to structured",
        detail:
          "A learning flight can begin with lighter aromatic whites, then move through rosé or lighter reds toward fuller, more tannic wines so earlier samples are not overwhelmed."
      },
      {
        eyebrow: "Sommelier note card",
        title: "See → smell → taste → conclude",
        detail:
          "Record appearance, aroma, palate structure, flavor, finish, quality, and readiness. Water, neutral crackers, modest pours, and a spittoon support clear comparison."
      },
      {
        eyebrow: "Tour lesson",
        title: "Compare place and process",
        detail:
          "Ask what changes across the flight: region, variety, vintage, fermentation vessel, oak, blending, alcohol, acidity, tannin, or residual sugar."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 12,
        text:
          "This is where the tour becomes visible in your senses. Taste in sequence, write before discussing, and compare each clue to the vineyard and cellar choices you just saw."
      }
    ]
  },
  {
    id: "warehouse-logistics",
    number: "19",
    title: "The Protected Journey",
    range: [0.9, 0.93],
    eyebrow: "Warehousing and distribution",
    summary:
      "Cases leave the winery with a lot identity, storage history, and chain of responsibility.",
    checkpoint: "Winery to route",
    motion: "glide",
    artwork: {
      src: "/beyond-the-glass/commercial-chain/warehouse-logistics-1600.webp",
      srcSet:
        "/beyond-the-glass/commercial-chain/warehouse-logistics-960.webp 960w, /beyond-the-glass/commercial-chain/warehouse-logistics-1600.webp 1600w",
      alt:
        "Adult winery logistics specialists verify packaged wine against a traceability tablet before protected cases move from a brass-and-stone warehouse into a delivery vehicle.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Distribution gate", x: 30, y: 66 },
    drop: { x: 49, y: 54, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Traceability",
        title: "The case keeps its identity",
        detail:
          "Lot codes, case counts, destinations, and retained comparison samples help a producer investigate a problem without confusing one shipment with another."
      },
      {
        eyebrow: "Storage conditions",
        title: "Heat and light can rewrite the wine",
        detail:
          "Finished wine should be protected from prolonged heat, temperature extremes, and damaging light. The risk belongs to the route, warehouse, package, and time—not only the bottle."
      },
      {
        eyebrow: "Commercial handoff",
        title: "Responsibility travels with the cases",
        detail:
          "A distributor, importer, warehouse, retailer, or restaurant may receive the wine next. Each transfer should preserve condition, records, and a clear owner for the decision."
      },
      {
        eyebrow: "Warehouse practice",
        title: "Rotation keeps old cases from disappearing",
        detail:
          "Clear locations, inventory records, first-in/first-out logic where appropriate, and regular condition checks help avoid forgotten, damaged, or misidentified stock."
      },
      {
        eyebrow: "Delivery risk",
        title: "The hottest hour can undo a careful route",
        detail:
          "Loading docks, parked vehicles, exposed pallets, and delayed delivery can create damaging heat or light exposure even when the warehouse itself is well managed."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 11,
        text:
          "I follow the case, not only the bottle. Lot identity, route, temperature, light, time, and responsibility must remain connected until the wine reaches its next keeper."
      }
    ]
  },
  {
    id: "market",
    number: "20",
    title: "Into the Market",
    range: [0.93, 0.95],
    eyebrow: "Retail context",
    summary: "A bottle gains a place, price, story, and audience beyond the winery.",
    checkpoint: "Route to choice",
    motion: "glide",
    artwork: {
      src: "/beyond-the-glass/wine-wine-market-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-wine-market-960.webp 960w, /beyond-the-glass/wine-wine-market-1600.webp 1600w",
      alt:
        "A warm SIP Academy wine market where adult students and professionals organize bottles and help guests choose.",
      position: "center"
    },
    landmark: { label: "Academy market", x: 49, y: 19 },
    drop: { x: 45, y: 54, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Shelf context",
        title: "Placement changes what a guest can discover",
        detail:
          "Origin, grape, producer, vintage, style, price, storage, and occasion help turn a shelf of bottles into a useful recommendation."
      },
      {
        eyebrow: "Retail stewardship",
        title: "The store protects condition and trust",
        detail:
          "Sound storage, stock rotation, accurate shelf information, and a clear response to faults or damage keep the commercial story connected to the producer."
      },
      {
        eyebrow: "Buying cue",
        title: "A useful recommendation starts with occasion",
        detail:
          "Budget, food, flavor preference, experience level, bottle size, and timing narrow the choice more helpfully than prestige alone."
      },
      {
        eyebrow: "Shelf truth",
        title: "Price and description must match the bottle",
        detail:
          "Vintage, origin, producer, variety, and style language should be checked against the actual stock so the guest can make an informed choice."
      },
      {
        eyebrow: "Fault pathway",
        title: "Returns become quality evidence",
        detail:
          "A sound process records damaged, heat-affected, oxidized, or cork-tainted bottles and routes the information back to the responsible seller or supplier."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The bottle enters a choice system. Placement, price, language, storage, and trust decide whether the right guest can understand what the winery made."
      }
    ]
  },
  {
    id: "restaurant-buying",
    number: "21",
    title: "The Wine List Workshop",
    range: [0.95, 0.97],
    eyebrow: "Buying and listing",
    summary:
      "Before service begins, a restaurant team decides whether a wine fits its food, guests, cellar, format, and price.",
    checkpoint: "List to service plan",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/commercial-chain/restaurant-buying-1600.webp",
      srcSet:
        "/beyond-the-glass/commercial-chain/restaurant-buying-960.webp 960w, /beyond-the-glass/commercial-chain/restaurant-buying-1600.webp 1600w",
      alt:
        "Adult sommelier, chef, and server prepare a responsible restaurant wine program with measured tasting pours, food pairing ingredients, inventory tools, and a blank wine-list folio.",
      fit: "contain",
      position: "center"
    },
    landmark: { label: "Wine list studio", x: 57, y: 72 },
    drop: { x: 78, y: 72, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Buying decision",
        title: "Fit comes before fame",
        detail:
          "A buyer weighs style, quality, food compatibility, guest needs, availability, storage, staff knowledge, bottle cost, and intended selling price."
      },
      {
        eyebrow: "List architecture",
        title: "Bottle and by-the-glass are different promises",
        detail:
          "A by-the-glass wine needs a realistic sales pace and preservation plan. A bottle listing can support deeper cellaring, rarer styles, or a more specific guest occasion."
      },
      {
        eyebrow: "Pre-service",
        title: "The team rehearses the handoff",
        detail:
          "Before service, staff confirm location, vintage, temperature, glassware, opening method, pairing language, fault response, and an alcohol-free path for every guest."
      },
      {
        eyebrow: "Cellar fit",
        title: "A listing needs a storage plan",
        detail:
          "Bottle orientation where appropriate, temperature, light, inventory rotation, access, and preservation equipment must support the format and expected sales pace."
      },
      {
        eyebrow: "Margin and value",
        title: "Price carries operating reality and guest trust",
        detail:
          "A responsible program balances acquisition cost, labor, waste, glassware, preservation, taxes, and business needs without disguising what the guest is receiving."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 11,
        text:
          "The list is a sensory map with a budget and a promise. We taste, compare, pair, price, store, and teach before a guest ever sees the bottle."
      }
    ]
  },
  {
    id: "restaurant",
    number: "19",
    title: "The Table Handoff",
    range: [0.9, 0.95],
    eyebrow: "Service",
    summary: "Storage, presentation, glassware, temperature, and hospitality carry the story to a guest.",
    checkpoint: "Bottle to table",
    motion: "push-in",
    artwork: {
      src: "/beyond-the-glass/wine-restaurant-service-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-restaurant-service-960.webp 960w, /beyond-the-glass/wine-restaurant-service-1600.webp 1600w",
      alt:
        "A welcoming SIP Academy restaurant terrace with attentive wine service and guests at the table.",
      position: "center"
    },
    landmark: { label: "Restaurant terrace", x: 50, y: 77 },
    drop: { x: 61, y: 45, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Service sequence",
        title: "Protect the final meter",
        detail:
          "Correct bottle, sound storage, suitable temperature, clean glassware, careful opening, and guest-friendly language preserve the journey."
      },
      {
        eyebrow: "Fault response",
        title: "TCA is handled, not debated",
        detail:
          "If a guest reports a musty or damp-cardboard character, acknowledge the concern, assess the bottle, and replace it when appropriate."
      },
      {
        eyebrow: "Responsible hospitality",
        title: "Learning wine never requires drinking more",
        detail:
          "Use small pours, water, food, spit cups, pacing, and alcohol-free participation. Never encourage a guest to drink for health, and never serve someone who should not drink."
      },
      {
        eyebrow: "Presentation",
        title: "Confirm the bottle before opening",
        detail:
          "Present the label, producer, wine, vintage, and bottle condition to the host so an incorrect selection can be caught before the closure is removed."
      },
      {
        eyebrow: "Glass and temperature",
        title: "Clean, suitable service reveals the wine",
        detail:
          "Odor-free glassware, a practical serving temperature, appropriate pour size, and careful handling let aroma, structure, and condition be assessed clearly."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 10,
        text:
          "The last handoff is human. Service can reveal the wine’s work—or cover it with the wrong temperature, glass, language, or response."
      }
    ]
  },
  {
    id: "first-sip",
    number: "20",
    title: "The First Sip",
    range: [0.95, 1],
    eyebrow: "Reconnection",
    summary: "The drop returns as wine, poured at a table connected to the entire academy.",
    checkpoint: "Rain to memory",
    motion: "reassemble",
    artwork: {
      src: "/beyond-the-glass/wine-first-sip-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-first-sip-960.webp 960w, /beyond-the-glass/wine-first-sip-1600.webp 1600w",
      alt:
        "An intimate hosted winery dinner on the SIP Academy terrace as red wine is poured into a glass and the glowing waterways connect the table to the campus.",
      position: "center"
    },
    landmark: { label: "Winemaker's table", x: 50, y: 77 },
    drop: { x: 33, y: 76, size: 10 },
    fieldNotes: [
      {
        eyebrow: "Journey complete",
        title: "The glass is a living map",
        detail:
          "Water, vine, people, equipment, microbes, time, transport, service, and memory now meet in one sensory moment."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 11,
        text:
          "The drop has crossed the entire academy. What looks like one glass is now a map you know how to read."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Taste slowly. You are not memorizing a product—you are recognizing a connected process."
      }
    ]
  }
];

const sequencedScenes: BeyondTheGlassScene[] = scenes.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / scenes.length, (index + 1) / scenes.length]
}));

export const journeyOfADrop: BeyondTheGlassChapter = {
  slug: "journey-of-a-drop",
  title: "Beyond The Glass",
  chapterTitle: "From Rain to First Sip",
  subject: "One drop moving through the complete life of wine",
  description:
    "Fly through SIP Academy with Sippy, Roma, and Hummin. Follow wine across vineyard sites, production tools, cellar choices, finishing and packaging, traceable distribution, retail, restaurant buying, responsible service, and the final table.",
  coreMessage:
    "A bottle begins long before the glass. Every stage leaves a clue you can learn to recognize.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/sip-academy-960.webp"
  },
  scenes: sequencedScenes,
  sources: [
    {
      id: "swe-csw-standards",
      organization: "Society of Wine Educators",
      title: "Certified Specialist of Wine",
      url:
        "https://societyofwineeducators.org/education-certifications/certified-specialist-of-wine/",
      note:
        "Official program reference confirming that CSW candidates are tested on viticulture and enology using the current CSW Study Guide."
    },
    {
      id: "swe-vine-cycle",
      organization: "Society of Wine Educators",
      title: "CSW Workbook Answer Key: Growth Cycle of the Vine",
      url:
        "https://winewitandwisdomswe.com/wp-content/uploads/2014/01/2015-CSW-WorkBook-Answer-Key1.pdf",
      note:
        "Public SWE study resource used for the foundational sequence from dormancy and bud break through shoot growth, flowering, berry set, véraison, physiological maturity, and harvest."
    },
    {
      id: "swe-cwe-viticulture-vocabulary",
      organization: "Society of Wine Educators",
      title: "CWE Recommended Reading List: Viticulture Vocabulary",
      url:
        "https://societyofwineeducators.org/wp-content/uploads/CWE-Recommended-Reading-List-2025-1.pdf",
      note:
        "Official advanced-study vocabulary reference for cane, node, spur, photosynthesis, respiration, translocation, transpiration, and véraison."
    },
    {
      id: "psu-cane-spur",
      organization: "Penn State Extension",
      title: "Grapevine Cane and Spur Pruning Fundamentals",
      url: "https://extension.psu.edu/grapevine-cane-and-spur-pruning-fundamentals",
      note:
        "Viticulture extension reference for one-year canes, shorter spurs, buds, fruiting shoots, cordons, and the distinction between cane and spur pruning."
    },
    {
      id: "jlohr-field-trip",
      organization: "J. Lohr Vineyards & Wines",
      title: "Winery visit and podcast reference",
      url: "https://youtu.be/zm2ECFtViXA",
      note:
        "Experiential reference for the multi-day field-trip structure: contrasting Central Coast sites, white- and red-wine programs, analytical labs, sustainability systems, tasting education, vineyard regeneration, and hosted meals."
    },
    {
      id: "jlohr-winery-tour",
      organization: "J. Lohr Vineyards & Wines",
      title: "A Winery Tour with Kristen Barnhisel",
      url: "https://www.jlohr.com/latest-news/a-winery-tour-with-kristen-barnhisel",
      note:
        "Primary winery reference for barrel-room scale, stainless and acacia barrel comparison, barrel sampling, Chardonnay component tasting, oak-origin trials, lees stirring, and malolactic context."
    },
    {
      id: "jlohr-sustainability",
      organization: "J. Lohr Vineyards & Wines",
      title: "Sustainability from Vineyard to Bottle and Beyond",
      url: "https://www.jlohr.com/growingsustainability",
      note:
        "Primary winery reference for solar energy, water conservation, wastewater performance, packaging and operational recycling, biodiversity, and habitat work."
    },
    {
      id: "jlohr-tasting-room",
      organization: "J. Lohr Vineyards & Wines",
      title: "Paso Robles Wine Center Tastings",
      url: "https://www.jlohr.com/visit/paso-robles",
      note:
        "Primary winery reference for a seated five-wine flight that includes both white and red wines, seasonal selections, winery-exclusive releases, and vineyard-facing hospitality."
    },
    {
      id: "jlohr-water",
      organization: "J. Lohr Vineyards & Wines",
      title: "Sustainable Water Management Practices for Vineyards",
      url: "https://www.jlohr.com/athome/talk-water-podcast-51",
      note: "Reference for vineyard water monitoring and responsible irrigation."
    },
    {
      id: "ucd-fermentation",
      organization: "UC Davis Viticulture and Enology",
      title: "Overview of Grape Juice Fermentation",
      url:
        "https://wineserver.ucdavis.edu/industry-info/enology/fermentation-management-guides/wine-fermentation/overview",
      note: "Reference for yeast, grape sugar, ethanol, carbon dioxide, and fermentation management."
    },
    {
      id: "ucd-harvest",
      organization: "UC Davis Viticulture and Enology",
      title: "Harvesting Conditions",
      url:
        "https://wineserver.ucdavis.edu/industry-info/enology/fermentation-management-guides/wine-fermentation/harvesting-conditions",
      note: "Reference for fruit condition, juice exposure, microbial populations, pH, and temperature."
    },
    {
      id: "awri-winemaking",
      organization: "Australian Wine Research Institute",
      title: "WIC Winemaking Services",
      url: "https://www.awri.com.au/wic-winemaking-services/",
      note:
        "Reference for crushers, destemmers, presses, fermenters, laboratory trials, barrel storage, and bottling."
    },
    {
      id: "awri-barrel-care",
      organization: "Australian Wine Research Institute",
      title: "Cleaning, storage and maintenance of barrels",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/storage-and-packaging/packaging-operations/barrel-cleaning-storage-and-maintenance/",
      note:
        "Technical reference for barrel inspection, cleaning with a rotating spray head, hot-water or steam sanitation, topping, sulfur-dioxide checks, storage, and cellar humidity."
    },
    {
      id: "awri-lees-contact",
      organization: "Australian Wine Research Institute",
      title: "Winemaking treatment: Lees contact",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/winemaking-treatment-lees-contact/",
      note:
        "Technical reference for post-fermentation lees contact, bâtonnage, oxygen exposure, texture, aroma, sulfur compounds, and the risks of excessive stirring or topping."
    },
    {
      id: "awri-sensory",
      organization: "Australian Wine Research Institute",
      title: "Practical sensory evaluation considerations",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/sensory_assessment/considerations/",
      note:
        "Technical reference for controlled tasting volumes and temperatures, independent written judgments, tasting sheets, palate fatigue, and rigorous comparison practices."
    },
    {
      id: "oiv-analytical-parameters",
      organization: "International Organisation of Vine and Wine",
      title: "Commonly used analytical parameters for wines and sparkling wines",
      url: "https://www.oiv.int/index.php/node/3813",
      note:
        "Primary reference for alcohol, glucose and fructose, sulfur dioxide, total acidity, volatile acidity, pH, and carbon dioxide as distinct analytical parameters."
    },
    {
      id: "oiv-wine-sugars",
      organization: "International Organisation of Vine and Wine",
      title: "Glucose, fructose and saccharose analysis",
      url:
        "https://www.oiv.int/de/standards/annex-a-methods-of-analysis-of-wines-and-musts/section-3-chemical-analysis/section-3-1-organic-compounds/section-3-1-1-sugars/glucose%2C-fructose-and-saccharose-%28phmetry%29-%28type-iv%29",
      note:
        "Primary reference for distinguishing glucose, fructose, and possible traces of saccharose in wine analysis."
    },
    {
      id: "awri-wine-faults",
      organization: "Australian Wine Research Institute",
      title: "Wine flavours, faults and taints",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/sensory_assessment/recognition-of-wine-faults-and-taints/wine_faults/",
      note:
        "Primary technical reference for oxidation, volatile acidity, ethyl acetate, reductive sulfur compounds, Brettanomyces, and TCA sensory context."
    },
    {
      id: "awri-sensory-fault-panel",
      organization: "Australian Wine Research Institute",
      title: "Technical Sensory Assessment",
      url: "https://www.awri.com.au/files/attachment/sensory_assessment_fact_sheet/",
      note:
        "Reference for the practical sensory descriptors used to screen common wine faults."
    },
    {
      id: "uc-ipm-phylloxera",
      organization: "University of California Statewide IPM Program",
      title: "Grape Phylloxera",
      url: "https://ipm.ucanr.edu/agriculture/grape/grape-phylloxera/",
      note:
        "Primary extension reference for root-feeding damage, Vitis vinifera susceptibility, and resistant-rootstock management."
    },
    {
      id: "umn-grape-anatomy",
      organization: "University of Minnesota Extension",
      title: "Cold-climate grapes: grapevine anatomy and terminology",
      url: "https://extension.umn.edu/commercial-fruit-production/cold-climate-grapes",
      note:
        "Extension reference for grape species context and the distinction among shoots, canes, cordons, spurs, buds, clusters, trunks, and roots."
    },
    {
      id: "osu-grape-training",
      organization: "Oregon State University Extension Service",
      title: "Growing table grapes: training systems",
      url: "https://extension.oregonstate.edu/catalog/ec-1639-growing-table-grapes",
      note:
        "Extension reference for cane and spur pruning, vertical hedgerow or Guyot/VSP, and canopy light management."
    },
    {
      id: "uc-ipm-pruning",
      organization: "University of California Statewide IPM Program",
      title: "Training and Pruning Grapes",
      url: "https://ipm.ucanr.edu/home-and-landscape/training-and-pruning-grapes/",
      note:
        "Extension reference for cane-pruned and spur-pruned vine structure and trellis goals."
    },
    {
      id: "dwi-must-weight",
      organization: "German Wine Institute",
      title: "Must Weights",
      url:
        "https://symphonia-typo3-prod.deutscheweine.de/en/our-wine/quality-standards/quality-standard/182/must-weights",
      note:
        "Official reference for degrees Oechsle, must density, and its relationship to grape sugar and potential alcohol."
    },
    {
      id: "austrian-wine-kmw",
      organization: "Austrian Wine",
      title: "Seven Elements of Austrian Wine",
      url:
        "https://www.austrianwine.com/fileadmin/user_upload/PDF/Broschueren/7_Elemente_DE_202405_web.pdf",
      note:
        "Official reference for Klosterneuburger Mostwaage (KMW) and Austrian must-weight context."
    },
    {
      id: "oiv-sparkling-wines",
      organization: "International Organisation of Vine and Wine",
      title: "Sparkling wines",
      url:
        "https://www.oiv.int/standards/international-code-of-oenological-practices/part-i-definitions/special-wines/sparkling-wines",
      note:
        "Primary definition for sparkling wine, endogenous carbon dioxide, and secondary fermentation in bottle or closed tank."
    },
    {
      id: "oiv-fortification",
      organization: "International Organisation of Vine and Wine",
      title: "Fortification",
      url:
        "https://www.oiv.int/index.php/fr/standards/code-international-des-pratiques-oenologiques/part-ii-oenological-treatments-and-practices/wines/fortification",
      note:
        "Primary reference defining fortification as the addition of wine spirit or permitted alcohol for special-wine production."
    },
    {
      id: "awri-cold-stability",
      organization: "Australian Wine Research Institute",
      title: "Measurement of cold stability of wine",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/laboratory_methods/chemical/cold_stab/",
      note:
        "Technical reference for testing the final blend and evaluating tartrate stability before packaging."
    },
    {
      id: "awri-filtration",
      organization: "Australian Wine Research Institute",
      title: "Filtration: physical removal of microorganisms",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/storage-and-packaging/pre-packaging-preparation/filtration-physical-removal-of-microorganisms/",
      note:
        "Technical reference for wine clarification and the validated filtration systems used to reduce particles or microorganisms before packaging."
    },
    {
      id: "oiv-wine-labelling",
      organization: "International Organisation of Vine and Wine",
      title: "International Standard for the Labelling of Wines",
      url:
        "https://www.oiv.int/standards/international-standard-for-the-labelling-of-wines",
      note:
        "Primary international reference separating compulsory and optional wine-label information, including origin and varietal indications."
    },
    {
      id: "awri-packaging",
      organization: "Australian Wine Research Institute",
      title: "Packaging",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/storage-and-packaging/",
      note:
        "Technical reference connecting pre-packaging preparation, bottling operations, closures, package choices, and the storage and transport of finished wine."
    },
    {
      id: "awri-transport-storage",
      organization: "Australian Wine Research Institute",
      title: "Transport and storage",
      url:
        "https://www.awri.com.au/industry_support/winemaking_resources/storage-and-packaging/post-packaging/transport-and-storage/",
      note:
        "Technical reference for packaged-wine temperature, light exposure, transport responsibility, storage orientation, and retained comparison samples."
    },
    {
      id: "psu-restaurant-route",
      organization: "Penn State Extension",
      title: "Getting Wines Into Local Restaurants",
      url: "https://extension.psu.edu/getting-wines-into-local-restaurants",
      note:
        "Applied extension reference for the producer-to-restaurant handoff, buyer appointments, technical tasting information, menu fit, pricing context, and restaurant wine-list placement."
    },
    {
      id: "niaaa-drinking-less",
      organization: "National Institute on Alcohol Abuse and Alcoholism",
      title: "The Basics: Defining How Much Alcohol is Too Much",
      url:
        "https://www.niaaa.nih.gov/health-professionals-communities/core-resource-on-alcohol/basics-defining-how-much-alcohol-too-much",
      note:
        "Public-health reference for lower-risk education: less alcohol is better for health, non-drinkers should not start for health, and some people should not drink at all."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};

export const beyondTheGlassChapters = [journeyOfADrop] as const;
