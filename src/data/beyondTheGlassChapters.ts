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
    range: [0, 0.07],
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
    range: [0.07, 0.14],
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
    id: "rain-and-roots",
    number: "03",
    title: "Rain Finds the Roots",
    range: [0.14, 0.22],
    eyebrow: "Water",
    summary: "Rain enters soil, meets the root system, and supports the vine above.",
    checkpoint: "Cloud to root",
    motion: "cutaway",
    artwork: {
      src: "/beyond-the-glass/wine-rain-roots-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-rain-roots-960.webp 960w, /beyond-the-glass/wine-rain-roots-1600.webp 1600w",
      alt:
        "A vineyard cutaway with rain moving through soil toward roots, while grape clusters remain correctly attached to vines above ground.",
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
    number: "04",
    title: "The Vine Builds a Berry",
    range: [0.22, 0.3],
    eyebrow: "Growth",
    summary: "Trellising, canopy, sunlight, and season turn water and sugar into fruit.",
    checkpoint: "Root to berry",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/wine-vineyard-growth-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-vineyard-growth-960.webp 960w, /beyond-the-glass/wine-vineyard-growth-1600.webp 1600w",
      alt:
        "A SIP adventure vineyard with trained vine rows, workers, grape clusters, and the academy visible beyond the vines.",
      position: "center"
    },
    landmark: { label: "Vineyard rows", x: 87, y: 24 },
    drop: { x: 67, y: 45, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Vine architecture",
        title: "Trellising changes exposure",
        detail:
          "Posts and wires position shoots and fruit. Canopy choices affect light, airflow, ripening, and disease pressure."
      },
      {
        eyebrow: "Vineyard watch",
        title: "Pests leave clues",
        detail:
          "Insects, birds, mildew, rot, and damaged berries can change yield and fruit condition before harvest."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 11,
        text:
          "Circle the cluster. Shade, airflow, heat, and time change what the berry can become—and what we may later taste."
      }
    ]
  },
  {
    id: "harvest",
    number: "05",
    title: "Harvest Run",
    range: [0.3, 0.38],
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
    number: "06",
    title: "Inside the Crush House",
    range: [0.38, 0.46],
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
    number: "07",
    title: "The Fermentation Hall",
    range: [0.46, 0.54],
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
    id: "laboratory",
    number: "08",
    title: "The Quality Lab",
    range: [0.54, 0.62],
    eyebrow: "Evidence",
    summary: "Sensory judgment and measurements help the team decide what the wine needs next.",
    checkpoint: "Wine to decision",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/wine-lab-cellar-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-lab-cellar-960.webp 960w, /beyond-the-glass/wine-lab-cellar-1600.webp 1600w",
      alt:
        "A SIP Academy wine laboratory and cellar with glassware, samples, tanks, barrels, and luminous guide channels.",
      position: "center"
    },
    landmark: { label: "Quality lab", x: 75, y: 22 },
    drop: { x: 43, y: 49, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Winemaker toolkit",
        title: "Measure, taste, compare",
        detail:
          "Sugar, pH, titratable acidity, temperature, sulfur dioxide, aroma, texture, and stability each reveal a different part of the wine."
      },
      {
        eyebrow: "Choice point",
        title: "SO₂ and acidification",
        detail:
          "Sulfur dioxide can help protect wine from oxidation and unwanted microbes. Acid additions may adjust balance and stability where allowed and needed."
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
    number: "09",
    title: "Time in the Cellar",
    range: [0.62, 0.7],
    eyebrow: "Aging",
    summary: "Vessel, oxygen, lees, temperature, and time reshape aroma and texture.",
    checkpoint: "Wine to maturity",
    motion: "orbit",
    artwork: {
      src: "/beyond-the-glass/wine-barrel-cellar-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-barrel-cellar-960.webp 960w, /beyond-the-glass/wine-barrel-cellar-1600.webp 1600w",
      alt:
        "A vaulted SIP Academy barrel cellar with stacked oak barrels, cellar workers, and warm pools of light.",
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
        eyebrow: "Sensory watch",
        title: "Fault or cellar clue?",
        detail:
          "Cork taint can mute fruit and suggest damp cardboard. Reduction, oxidation, volatile acidity, and sulfur notes each require a different diagnosis."
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
    id: "bottling",
    number: "10",
    title: "The Bottling Run",
    range: [0.7, 0.78],
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
    id: "market",
    number: "11",
    title: "Into the Market",
    range: [0.78, 0.86],
    eyebrow: "Context",
    summary: "A bottle gains a place, price, story, and audience beyond the winery.",
    checkpoint: "Bottle to choice",
    motion: "glide",
    artwork: {
      src: "/beyond-the-glass/wine-wine-market-1600.webp",
      srcSet:
        "/beyond-the-glass/wine-wine-market-960.webp 960w, /beyond-the-glass/wine-wine-market-1600.webp 1600w",
      alt:
        "A warm SIP Academy wine market where students and professionals organize bottles and help guests choose.",
      position: "center"
    },
    landmark: { label: "Academy market", x: 49, y: 19 },
    drop: { x: 45, y: 54, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Guest translation",
        title: "Labels are only the beginning",
        detail:
          "Origin, grape, producer, vintage, style, price, storage, and occasion help turn a shelf of bottles into a useful recommendation."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The bottle leaves production and enters a new system: distribution, storage, price, language, trust, and choice."
      }
    ]
  },
  {
    id: "restaurant",
    number: "12",
    title: "The Table Handoff",
    range: [0.86, 0.93],
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
    number: "13",
    title: "The First Sip",
    range: [0.93, 1],
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

export const journeyOfADrop: BeyondTheGlassChapter = {
  slug: "journey-of-a-drop",
  title: "Beyond The Glass",
  chapterTitle: "From Rain to First Sip",
  subject: "One drop moving through the complete life of wine",
  description:
    "Fly through SIP Academy with Sippy, Roma, and Hummin. Follow wine from vineyard water to the crush house, cellar, bottle, market, and final table.",
  coreMessage:
    "A bottle begins long before the glass. Every stage leaves a clue you can learn to recognize.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/sip-academy-960.webp"
  },
  scenes,
  sources: [
    {
      id: "jlohr-field-trip",
      organization: "J. Lohr Vineyards & Wines",
      title: "Winery visit and podcast reference",
      url: "https://youtu.be/zm2ECFtViXA",
      note:
        "Experiential reference for the vineyard-to-table field-trip structure supplied by the project owner."
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
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};

export const beyondTheGlassChapters = [journeyOfADrop] as const;
