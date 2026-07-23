import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";

type LevelId =
  | "raw-ingredients"
  | "equipment-lab"
  | "fermentation-distillation"
  | "aging-requirements"
  | "packaging-distribution"
  | "retail-training"
  | "restaurant-training"
  | "classic-food-pairings";
type FacilityId = "winery" | "brewery" | "distillery";
type Point = { x: number; y: number };
type WalkDirection = "down" | "up" | "left" | "right" | "down-left" | "down-right" | "up-left" | "up-right";

type Checkpoint = {
  id: string;
  name: string;
  stage: string;
  purpose: string;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
  image: string;
};

type Guide = {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  frame: number;
  sheet: string;
  frames: number;
  aspect: number;
  flip?: -1 | 1;
  lines: string[];
};

type Facility = {
  id: FacilityId;
  name: string;
  accent: string;
  background: string;
  leadId: string;
  guides: Guide[];
  checkpoints: Checkpoint[];
  challenge: string;
};

type GameLevel = {
  id: LevelId;
  number: number;
  title: string;
  version: string;
  summary: string;
  completionTitle: string;
  completionCopy: string;
  facilities: Facility[];
};

type LevelRoadmapItem = {
  id: LevelId;
  number: number;
  title: string;
  playable: boolean;
};

type GuideLayout = {
  lead: Point;
  sippy: Point;
  roma: Point;
  hummin: Point;
  support: Point;
};

const PLAYER_SHEET = "/game/sprites/sippy-sheet-v1-alpha.png";
const PLAYER_ASPECT = 0.375;
const CHARACTER_ASPECT = 0.5;

const FINAL_LEVEL_CELEBRATIONS: Record<FacilityId, { image: string; title: string; copy: string; alt: string }> = {
  winery: {
    image: "/game/finale/level8-winery-celebration-v2.png",
    title: "Winery Pairing Mastery",
    copy: "You completed the winery pairing course. Sippy, Roma, Hummin, and the wine professionals are opening champagne for your achievement.",
    alt: "Winery professionals celebrating with Sippy, Roma, and Hummin as champagne corks pop"
  },
  brewery: {
    image: "/game/finale/level8-brewery-celebration-v2.png",
    title: "Brewery Pairing Mastery",
    copy: "You completed the brewery pairing course. Sippy, Roma, Hummin, and the brewing professionals are raising glasses for your achievement.",
    alt: "Brewery professionals celebrating with Sippy, Roma, and Hummin as champagne opens"
  },
  distillery: {
    image: "/game/finale/level8-distillery-celebration-v2.png",
    title: "Distillery Pairing Mastery",
    copy: "You completed the distillery pairing course. Sippy, Roma, Hummin, and the spirits professionals are toasting your achievement.",
    alt: "Distillery professionals celebrating with Sippy, Roma, and Hummin as champagne corks pop"
  }
};

const CHARACTER_SPRITES = {
  ariaWine: "/game/sprites/characters/support-0.png",
  brunoBeer: "/game/sprites/characters/support-2.png",
  humminBeer: "/game/sprites/characters/beer-2.png",
  humminBeerBook: "/game/sprites/characters/beer-3.png",
  humminSpirit: "/game/sprites/characters/spirit-2.png",
  humminSpiritBook: "/game/sprites/characters/spirit-3.png",
  humminWineBook: "/game/sprites/characters/main-3.png",
  romaBeer: "/game/sprites/characters/beer-0.png",
  romaBeerClipboard: "/game/sprites/characters/beer-1.png",
  romaSpirit: "/game/sprites/characters/spirit-0.png",
  romaSpiritClipboard: "/game/sprites/characters/spirit-1.png",
  romaSpark: "/game/sprites/characters/spark-0.png",
  romaSparkClipboard: "/game/sprites/characters/spark-1.png",
  romaWine: "/game/sprites/characters/roma-0.png",
  romaWineLeaf: "/game/sprites/characters/roma-2.png",
  sippyBeer: "/game/sprites/characters/beer-4.png",
  sippyBeerGesture: "/game/sprites/characters/beer-5.png",
  sippySpark: "/game/sprites/characters/spark-4.png",
  sippySparkGesture: "/game/sprites/characters/spark-5.png",
  sippySpirit: "/game/sprites/characters/spirit-4.png",
  sippySpiritGesture: "/game/sprites/characters/spirit-5.png",
  sippyWine: "/game/sprites/characters/main-5.png",
  humminSpark: "/game/sprites/characters/spark-2.png",
  humminSparkBook: "/game/sprites/characters/spark-3.png",
  solSpirit: "/game/sprites/characters/support-4.png"
} satisfies Record<string, string>;

const MAIN_GUIDES = {
  sippy: {
    id: "sippy",
    name: "Sippy",
    role: "Wine Guide",
    frame: 0,
    sheet: CHARACTER_SPRITES.sippyWine,
    frames: 1,
    aspect: CHARACTER_ASPECT,
    lines: [
      "Start with the fruit path: sort, crush, ferment, press, age, clarify, bottle.",
      "Tap each machine and say what changes before and after it.",
      "When equipment wiggles, it is ready for a hotspot question."
    ]
  },
  roma: {
    id: "roma",
    name: "Roma",
    role: "Sensory Coach",
    frame: 0,
    sheet: CHARACTER_SPRITES.romaWine,
    frames: 1,
    aspect: CHARACTER_ASPECT,
    lines: [
      "Look first, smell second, taste third. Your senses should check each other.",
      "Equipment learning gets easier when you name the input, action, and output.",
      "If a prompt feels tricky, slow down and describe what the machine changes."
    ]
  },
  hummin: {
    id: "hummin",
    name: "Hummin",
    role: "Equipment Analyst",
    frame: 0,
    sheet: CHARACTER_SPRITES.humminWineBook,
    frames: 1,
    aspect: CHARACTER_ASPECT,
    lines: [
      "I track process flow, safety checks, and common equipment faults.",
      "Watch for machines with pressure, heat, moving parts, or enclosed flow paths.",
      "A good operator knows what normal looks like before diagnosing a fault."
    ]
  }
} satisfies Record<string, Omit<Guide, "x" | "y">>;

function placeGuide(guide: Omit<Guide, "x" | "y">, x: number, y: number, overrides: Partial<Guide> = {}): Guide {
  return { ...guide, x, y, ...overrides };
}

const GUIDE_LAYOUTS: Record<LevelId, Record<FacilityId, GuideLayout>> = {
  "raw-ingredients": {
    winery: {
      lead: { x: 50, y: 78 },
      sippy: { x: 50, y: 78 },
      roma: { x: 60, y: 59 },
      hummin: { x: 83, y: 54 },
      support: { x: 32, y: 58 }
    },
    brewery: {
      lead: { x: 63, y: 56 },
      sippy: { x: 80, y: 68 },
      roma: { x: 63, y: 56 },
      hummin: { x: 50, y: 72 },
      support: { x: 31, y: 55 }
    },
    distillery: {
      lead: { x: 67, y: 49 },
      sippy: { x: 48, y: 70 },
      roma: { x: 83, y: 60 },
      hummin: { x: 67, y: 49 },
      support: { x: 31, y: 52 }
    }
  },
  "equipment-lab": {
    winery: {
      lead: { x: 58, y: 72 },
      sippy: { x: 58, y: 72 },
      roma: { x: 47, y: 54 },
      hummin: { x: 82, y: 58 },
      support: { x: 30, y: 64 }
    },
    brewery: {
      lead: { x: 72, y: 52 },
      sippy: { x: 62, y: 70 },
      roma: { x: 72, y: 52 },
      hummin: { x: 50, y: 62 },
      support: { x: 34, y: 58 }
    },
    distillery: {
      lead: { x: 70, y: 50 },
      sippy: { x: 52, y: 70 },
      roma: { x: 82, y: 62 },
      hummin: { x: 70, y: 50 },
      support: { x: 34, y: 58 }
    }
  },
  "fermentation-distillation": {
    winery: {
      lead: { x: 40, y: 72 },
      sippy: { x: 40, y: 72 },
      roma: { x: 66, y: 61 },
      hummin: { x: 84, y: 54 },
      support: { x: 30, y: 56 }
    },
    brewery: {
      lead: { x: 70, y: 56 },
      sippy: { x: 46, y: 70 },
      roma: { x: 70, y: 56 },
      hummin: { x: 84, y: 66 },
      support: { x: 31, y: 56 }
    },
    distillery: {
      lead: { x: 66, y: 50 },
      sippy: { x: 50, y: 70 },
      roma: { x: 81, y: 60 },
      hummin: { x: 66, y: 50 },
      support: { x: 31, y: 56 }
    }
  },
  "aging-requirements": {
    winery: {
      lead: { x: 48, y: 72 },
      sippy: { x: 48, y: 72 },
      roma: { x: 68, y: 62 },
      hummin: { x: 84, y: 55 },
      support: { x: 31, y: 58 }
    },
    brewery: {
      lead: { x: 76, y: 61 },
      sippy: { x: 48, y: 70 },
      roma: { x: 76, y: 61 },
      hummin: { x: 86, y: 52 },
      support: { x: 32, y: 57 }
    },
    distillery: {
      lead: { x: 66, y: 52 },
      sippy: { x: 50, y: 70 },
      roma: { x: 82, y: 62 },
      hummin: { x: 66, y: 52 },
      support: { x: 31, y: 58 }
    }
  },
  "packaging-distribution": {
    winery: {
      lead: { x: 47, y: 72 },
      sippy: { x: 47, y: 72 },
      roma: { x: 70, y: 57 },
      hummin: { x: 85, y: 64 },
      support: { x: 31, y: 58 }
    },
    brewery: {
      lead: { x: 76, y: 55 },
      sippy: { x: 48, y: 72 },
      roma: { x: 76, y: 55 },
      hummin: { x: 86, y: 66 },
      support: { x: 30, y: 58 }
    },
    distillery: {
      lead: { x: 66, y: 52 },
      sippy: { x: 50, y: 71 },
      roma: { x: 80, y: 60 },
      hummin: { x: 66, y: 52 },
      support: { x: 31, y: 58 }
    }
  },
  "retail-training": {
    winery: {
      lead: { x: 46, y: 74 },
      sippy: { x: 46, y: 74 },
      roma: { x: 68, y: 58 },
      hummin: { x: 84, y: 55 },
      support: { x: 31, y: 60 }
    },
    brewery: {
      lead: { x: 75, y: 58 },
      sippy: { x: 47, y: 73 },
      roma: { x: 75, y: 58 },
      hummin: { x: 86, y: 55 },
      support: { x: 31, y: 60 }
    },
    distillery: {
      lead: { x: 65, y: 52 },
      sippy: { x: 48, y: 72 },
      roma: { x: 80, y: 58 },
      hummin: { x: 65, y: 52 },
      support: { x: 30, y: 60 }
    }
  },
  "restaurant-training": {
    winery: {
      lead: { x: 47, y: 74 },
      sippy: { x: 47, y: 74 },
      roma: { x: 70, y: 56 },
      hummin: { x: 84, y: 62 },
      support: { x: 30, y: 60 }
    },
    brewery: {
      lead: { x: 76, y: 56 },
      sippy: { x: 48, y: 74 },
      roma: { x: 76, y: 56 },
      hummin: { x: 86, y: 64 },
      support: { x: 30, y: 60 }
    },
    distillery: {
      lead: { x: 64, y: 52 },
      sippy: { x: 48, y: 73 },
      roma: { x: 78, y: 56 },
      hummin: { x: 64, y: 52 },
      support: { x: 30, y: 60 }
    }
  },
  "classic-food-pairings": {
    winery: {
      lead: { x: 46, y: 74 },
      sippy: { x: 46, y: 74 },
      roma: { x: 68, y: 58 },
      hummin: { x: 84, y: 56 },
      support: { x: 30, y: 60 }
    },
    brewery: {
      lead: { x: 76, y: 58 },
      sippy: { x: 47, y: 74 },
      roma: { x: 76, y: 58 },
      hummin: { x: 86, y: 56 },
      support: { x: 31, y: 60 }
    },
    distillery: {
      lead: { x: 64, y: 52 },
      sippy: { x: 48, y: 73 },
      roma: { x: 80, y: 58 },
      hummin: { x: 64, y: 52 },
      support: { x: 30, y: 60 }
    }
  }
} satisfies Record<LevelId, Record<FacilityId, GuideLayout>>;

function layoutGuides(levelId: LevelId, facilityId: FacilityId, leadId: string, guides: Guide[]): Guide[] {
  const layout = GUIDE_LAYOUTS[levelId][facilityId];
  return guides.map((guide) => {
    const point =
      guide.id === leadId
        ? layout.lead
        : guide.id === "sippy"
          ? layout.sippy
          : guide.id === "roma"
            ? layout.roma
            : guide.id === "hummin"
              ? layout.hummin
              : layout.support;
    return { ...guide, x: point.x, y: point.y };
  });
}

const EQUIPMENT_FACILITIES: Facility[] = [
  {
    id: "winery",
    name: "Winery",
    accent: "#8f3d8d",
    background: "/game/backgrounds/winery-hub-v1.png",
    leadId: "sippy",
    guides: layoutGuides("equipment-lab", "winery", "sippy", [
      placeGuide(MAIN_GUIDES.sippy, 66, 52, { sheet: CHARACTER_SPRITES.sippySpark }),
      placeGuide(MAIN_GUIDES.roma, 50, 64, { sheet: CHARACTER_SPRITES.romaSpark }),
      placeGuide(MAIN_GUIDES.hummin, 82, 58, { sheet: CHARACTER_SPRITES.humminSpark }),
      {
        id: "cellar-mentor",
        name: "Aria",
        role: "Cellar Mentor",
        x: 30,
        y: 66,
        frame: 0,
        sheet: CHARACTER_SPRITES.ariaWine,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: -1,
        lines: [
          "I keep the cellar path clean: fruit prep on the left, maturation on the right.",
          "Pressing and fermentation can swap order depending on style, so watch the prompt wording.",
          "Your cup guide can walk anywhere, but the best clues live near active equipment."
        ]
      }
    ]),
    checkpoints: [
      {
        id: "crusher",
        name: "Crusher-Destemmer",
        stage: "Fruit prep",
        purpose: "Separates berries from stems and lightly opens skins for fermentation.",
        detail: "Look for the intake hopper, rollers, and stem outlet. In production, the goal is gentle berry breakage without shredding green stems into the must.",
        x: 18,
        y: 67,
        w: 20,
        h: 24,
        image: "/game/equipment-scenes/winery-crusher-destemmer-sippy-v1.png"
      },
      {
        id: "press",
        name: "Wine Press",
        stage: "Juice extraction",
        purpose: "Applies controlled pressure to separate wine or juice from skins and solids.",
        detail: "The press is about pressure control. Too little pressure leaves yield behind; too much can pull rough phenolics from skins, seeds, or stems.",
        x: 39,
        y: 26,
        w: 16,
        h: 20,
        image: "/game/equipment-scenes/winery-wine-press-sippy-v1.png"
      },
      {
        id: "fermenter",
        name: "Fermentation Tank",
        stage: "Fermentation",
        purpose: "Holds must or juice while yeast converts sugar into alcohol and aroma.",
        detail: "A fermenter is managed by temperature, cap contact, oxygen exposure, and sanitation. Watch gauges, valves, sample ports, and cooling jackets.",
        x: 16,
        y: 26,
        w: 19,
        h: 27,
        image: "/game/equipment-scenes/winery-fermentation-tank-sippy-v1.png"
      }
    ],
    challenge: "Identify the machine that changes sorted fruit into a fermentable must."
  },
  {
    id: "brewery",
    name: "Brewery",
    accent: "#618531",
    background: "/game/backgrounds/brewery-hub-v1.png",
    leadId: "roma",
    guides: layoutGuides("equipment-lab", "brewery", "roma", [
      {
        ...placeGuide(MAIN_GUIDES.roma, 70, 46, { sheet: CHARACTER_SPRITES.romaBeer }),
        lines: [
          "Brewery flow starts with starch conversion, then wort separation, boil, chill, ferment, condition.",
          "Mash tun and kettle look similar from far away; anchor on what each vessel does.",
          "Use the hotspot glow to drill one piece of equipment at a time."
        ]
      },
      placeGuide(MAIN_GUIDES.sippy, 82, 64, { sheet: CHARACTER_SPRITES.sippyBeer }),
      placeGuide(MAIN_GUIDES.hummin, 56, 66, { sheet: CHARACTER_SPRITES.humminBeer, flip: -1 }),
      {
        id: "brewmaster",
        name: "Bruno",
        role: "Brewmaster",
        x: 34,
        y: 58,
        frame: 0,
        sheet: CHARACTER_SPRITES.brunoBeer,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: 1,
        lines: [
          "Mash creates wort; boil seasons and stabilizes it.",
          "Follow temperature and flow direction when two tanks look similar.",
          "If the equipment wiggles, it wants you to name its job."
        ]
      }
    ]),
    checkpoints: [
      {
        id: "mash-tun",
        name: "Mash Tun",
        stage: "Conversion",
        purpose: "Mixes crushed grain with hot water so enzymes convert starch into fermentable sugar.",
        detail: "The mash tun is where time, temperature, water chemistry, and grist ratio create wort structure. Roma watches for even hydration and target rest temperature.",
        x: 38,
        y: 34,
        w: 16,
        h: 20,
        image: "/game/equipment-scenes/brewery-mash-tun-roma-v1.png"
      },
      {
        id: "kettle",
        name: "Brew Kettle",
        stage: "Boil",
        purpose: "Boils wort, sterilizes it, drives off volatiles, and extracts hop bitterness.",
        detail: "The kettle sets bitterness, concentration, and stability. Key cues are rolling boil strength, steam management, additions timing, and whirlpool readiness.",
        x: 58,
        y: 35,
        w: 18,
        h: 21,
        image: "/game/equipment-scenes/brewery-brew-kettle-roma-v1.png"
      },
      {
        id: "conical",
        name: "Conical Fermenter",
        stage: "Fermentation",
        purpose: "Ferments wort into beer and lets yeast collect at the cone for cleaner handling.",
        detail: "The cone helps yeast and trub settle for removal. Track temperature, pressure, blowoff, dry-hop timing, and transfer clarity.",
        x: 89,
        y: 35,
        w: 15,
        h: 22,
        image: "/game/equipment-scenes/brewery-conical-fermenter-roma-v1.png"
      }
    ],
    challenge: "Find the vessel where hot water and grain create fermentable wort."
  },
  {
    id: "distillery",
    name: "Distillery",
    accent: "#c87824",
    background: "/game/backgrounds/distillery-hub-v1.png",
    leadId: "hummin",
    guides: layoutGuides("equipment-lab", "distillery", "hummin", [
      {
        ...placeGuide(MAIN_GUIDES.hummin, 70, 48, { sheet: CHARACTER_SPRITES.humminSpirit }),
        lines: [
          "Distilling separates by volatility. Heat, vapor, condensation, and cut decisions all matter.",
          "Copper stills shape character; the spirit safe keeps collection controlled and observable.",
          "Treat safety checks as part of the puzzle, not a pause from it."
        ]
      },
      placeGuide(MAIN_GUIDES.sippy, 56, 66, { sheet: CHARACTER_SPRITES.sippySpirit, flip: -1 }),
      placeGuide(MAIN_GUIDES.roma, 82, 64, { sheet: CHARACTER_SPRITES.romaSpirit }),
      {
        id: "distiller",
        name: "Sol",
        role: "Distiller",
        x: 34,
        y: 58,
        frame: 0,
        sheet: CHARACTER_SPRITES.solSpirit,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: -1,
        lines: [
          "Heat makes vapor; cooling returns it to liquid.",
          "The still, condenser, and spirit safe are a sequence, not isolated tools.",
          "For faults, ask whether the issue begins with heat, flow, cooling, or collection."
        ]
      }
    ]),
    checkpoints: [
      {
        id: "pot-still",
        name: "Pot Still",
        stage: "Distillation",
        purpose: "Heats fermented wash so alcohol-rich vapor can rise and concentrate flavor.",
        detail: "A pot still is a batch concentration tool. Hummin checks heat input, foaming risk, vapor path, condenser flow, and where heads, hearts, and tails begin.",
        x: 31,
        y: 34,
        w: 19,
        h: 25,
        image: "/game/equipment-scenes/distillery-pot-still-hummin-v1.png"
      },
      {
        id: "spirit-safe",
        name: "Spirit Safe",
        stage: "Cuts",
        purpose: "Lets the distiller observe and direct spirit flow without open handling.",
        detail: "The spirit safe protects the spirit stream while allowing measurement and cut decisions. Look for hydrometers, sample flow, and receiver routing.",
        x: 74,
        y: 43,
        w: 14,
        h: 21,
        image: "/game/equipment-scenes/distillery-spirit-safe-hummin-v1.png"
      },
      {
        id: "fermenter",
        name: "Washback",
        stage: "Fermentation",
        purpose: "Ferments mash or wort into a wash ready for distillation.",
        detail: "The washback is the flavor-building fermentation vessel before distillation. Hummin checks fill level, yeast health, temperature, and sanitation.",
        x: 16,
        y: 29,
        w: 18,
        h: 25,
        image: "/game/equipment-scenes/distillery-washback-hummin-v1.png"
      }
    ],
    challenge: "Tap the equipment that concentrates alcohol-rich vapor during distillation."
  }
];

const ADDITIONAL_LEVELS: GameLevel[] = [
  {
    id: "packaging-distribution",
    number: 5,
    title: "Packaging and Distribution",
    version: "Level 5",
    summary: "Protect beverage quality through packaging, closure, cold chain, compliance, and shipping.",
    completionTitle: "Level 5 complete",
    completionCopy: "You connected package choices and distribution controls to quality after production.",
    facilities: [
      makeFacility("winery", "/game/backgrounds/level5-winery-packaging-v1.png", ["Packaging is the final cellar decision before the customer sees the bottle.", "Watch oxygen pickup, closure choice, label compliance, case packing, and transit.", "Every package should protect the wine style it carries."], ["Closure changes oxygen risk.", "Labels must communicate clearly and legally.", "Distribution can damage good wine if temperature is ignored."], "Package wine while protecting oxygen, closure, label, and shipping quality.", [
        { id: "closure-choice", name: "Closure Choice", stage: "Bottle seal", purpose: "Selects cork, screwcap, crown, or alternative closure based on oxygen needs and market expectation.", detail: "Closures affect aging curve, fault risk, opening ritual, and customer perception.", x: 25, y: 42, w: 18, h: 20, image: "/grapes/cabernet-sauvignon-static.png" },
        { id: "label-compliance", name: "Label Compliance", stage: "Market readiness", purpose: "Checks required information, placement, and clarity before release.", detail: "The label must support selling and meet legal requirements without creating confusion.", x: 52, y: 44, w: 18, h: 20, image: "/grapes/chardonnay-static.png" },
        { id: "case-shipping", name: "Case Shipping", stage: "Distribution", purpose: "Protects bottles from heat, breakage, light, and rough handling.", detail: "Wine quality can fail after bottling if transit and storage conditions are poor.", x: 78, y: 58, w: 17, h: 18, image: "/grapes/merlot-static.png" }
      ]),
      makeFacility("brewery", "/game/backgrounds/level5-brewery-packaging-v1.png", ["Beer packaging is about oxygen control, carbonation, freshness, and cold chain.", "Cans, bottles, and kegs each have failure points.", "Good package checks protect aroma and foam."], ["Seams and fills matter.", "Kegs need cleaning and pressure control.", "Cold distribution protects hop aroma."], "Package beer while protecting oxygen, carbonation, and freshness.", [
        { id: "can-seam", name: "Can Seam", stage: "Package integrity", purpose: "Creates a tight can seal that protects carbonation and blocks oxygen.", detail: "A bad seam causes leaks, oxidation, or microbial risk.", x: 25, y: 42, w: 18, h: 20, image: "/commodities/hops/cascade.png" },
        { id: "keg-fill", name: "Keg Fill", stage: "Draft package", purpose: "Fills clean kegs with controlled pressure and minimal oxygen pickup.", detail: "Keg handling affects draft freshness, foam, and service reliability.", x: 52, y: 44, w: 18, h: 20, image: "/commodities/grains/barley.png" },
        { id: "cold-chain", name: "Cold Chain", stage: "Distribution", purpose: "Keeps beer cold enough to slow staling and protect aroma.", detail: "Hop-forward and low-pasteurized beers are especially sensitive to warm storage.", x: 78, y: 58, w: 17, h: 18, image: "/commodities/hops/citra.png" }
      ]),
      makeFacility("distillery", "/game/backgrounds/level5-distillery-packaging-v1.png", ["Spirit packaging controls proof, fill, closure, batch identity, and case protection.", "The bottle is part quality control and part market promise.", "Track proofing, closure, and shipping readiness."], ["Proofing must be consistent.", "Closures protect high-value liquid.", "Cases protect glass through distribution."], "Package spirits while controlling proof, fill, closure, and distribution.", [
        { id: "proofing", name: "Proofing Check", stage: "Final strength", purpose: "Confirms bottle strength after dilution, resting, and blending.", detail: "Proof affects label accuracy, texture, aroma release, and tax/category requirements.", x: 25, y: 42, w: 18, h: 20, image: "/commodities/grains/corn.png" },
        { id: "closure-finish", name: "Closure Finish", stage: "Bottle seal", purpose: "Protects the spirit and supports premium opening experience.", detail: "Cork, synthetic, screw, and tamper finishes each have quality and market implications.", x: 52, y: 44, w: 18, h: 20, image: "/commodities/grains/rye.png" },
        { id: "case-control", name: "Case Control", stage: "Distribution", purpose: "Prepares bottles for safe, traceable shipment.", detail: "Case integrity, batch tracking, and pallet stability prevent damage and recall confusion.", x: 78, y: 58, w: 17, h: 18, image: "/game/equipment-scenes/distillery-spirit-safe-hummin-v1.png" }
      ])
    ]
  },
  {
    id: "retail-training",
    number: 6,
    title: "Retail Training",
    version: "Level 6",
    summary: "Practice shelf logic, customer discovery, responsible selling, and recommendation flow.",
    completionTitle: "Level 6 complete",
    completionCopy: "You practiced retail selling decisions across wine, beer, and spirits.",
    facilities: [
      makeFacility("winery", "/game/backgrounds/level6-winery-retail-v1.png", ["Retail wine work starts with listening before recommending.", "Use budget, occasion, flavor preference, and food context.", "Shelf placement should make discovery easier."], ["Ask one clean question at a time.", "Translate style words into useful choices.", "A good recommendation feels specific, not pushy."], "Train wine retail discovery, shelf logic, and recommendation language.", [
        { id: "customer-discovery", name: "Customer Discovery", stage: "Sales conversation", purpose: "Finds budget, occasion, flavor preference, and confidence level.", detail: "The best retail question narrows choices without making the guest feel tested.", x: 24, y: 40, w: 18, h: 20, image: "/grapes/pinot-noir-static.png" },
        { id: "shelf-logic", name: "Shelf Logic", stage: "Merchandising", purpose: "Groups bottles so shoppers can compare region, style, price, or use case.", detail: "Good shelves teach quietly through order, facings, and clear category flow.", x: 52, y: 43, w: 18, h: 20, image: "/grapes/sauvignon-blanc-static.png" },
        { id: "recommendation", name: "Recommendation", stage: "Service close", purpose: "Connects a wine to the shopper's actual need in plain language.", detail: "Lead with why it fits, then provide one backup option if needed.", x: 78, y: 58, w: 17, h: 18, image: "/grapes/merlot-static.png" }
      ]),
      makeFacility("brewery", "/game/backgrounds/level6-brewery-retail-v1.png", ["Beer retail training balances freshness, style, package date, and shopper language.", "Help guests navigate hops, malt, sourness, strength, and format.", "Fresh beer should rotate with intent."], ["Date codes matter.", "Style language should be practical.", "Cold storage is part of service."], "Train beer retail freshness, style navigation, and merchandising.", [
        { id: "freshness-check", name: "Freshness Check", stage: "Quality screen", purpose: "Uses package date, style, and storage condition to protect beer quality.", detail: "Some beers age well, but many hoppy and delicate styles need fast turnover.", x: 24, y: 40, w: 18, h: 20, image: "/commodities/hops/mosaic.png" },
        { id: "style-navigation", name: "Style Navigation", stage: "Customer help", purpose: "Translates shopper words into bitterness, malt, sourness, body, and strength.", detail: "A guest saying crisp, juicy, dark, or smooth may mean different things; ask one follow-up.", x: 52, y: 43, w: 18, h: 20, image: "/commodities/grains/barley.png" },
        { id: "merchandising", name: "Merchandising", stage: "Shelf setup", purpose: "Places beer by freshness need, style family, package format, and shopper mission.", detail: "Cold boxes, singles, four-packs, and seasonal stacks should each have a clear job.", x: 78, y: 58, w: 17, h: 18, image: "/commodities/hops/cascade.png" }
      ]),
      makeFacility("distillery", "/game/backgrounds/level6-distillery-retail-v1.png", ["Spirits retail requires category guidance and responsible selling.", "Explain base material, proof, age, flavor, cocktail use, and value.", "Premium shelves need clear navigation."], ["Proof is a service clue.", "Cocktail use changes the best bottle choice.", "Responsible selling is part of expertise."], "Train spirits retail category navigation, proof explanation, and responsible selling.", [
        { id: "category-navigation", name: "Category Navigation", stage: "Shelf help", purpose: "Guides customers through whisky, gin, rum, agave, vodka, liqueur, and modifiers.", detail: "Start with intended use: sipping, mixing, gifting, collecting, or learning.", x: 24, y: 40, w: 18, h: 20, image: "/commodities/grains/rye.png" },
        { id: "proof-language", name: "Proof Language", stage: "Style explanation", purpose: "Explains strength, texture, dilution, and cocktail behavior without jargon.", detail: "Higher proof can carry flavor and structure, but it may need dilution or context.", x: 52, y: 43, w: 18, h: 20, image: "/commodities/grains/corn.png" },
        { id: "responsible-selling", name: "Responsible Selling", stage: "Retail safety", purpose: "Applies age checks, moderation cues, and appropriate service boundaries.", detail: "The best staff protect the customer, store, and community while still offering hospitality.", x: 78, y: 58, w: 17, h: 18, image: "/game/equipment-scenes/distillery-washback-hummin-v1.png" }
      ])
    ]
  },
  {
    id: "restaurant-training",
    number: 7,
    title: "Restaurant Training",
    version: "Level 7",
    summary: "Practice table service, glassware, pacing, guest language, and responsible hospitality.",
    completionTitle: "Level 7 complete",
    completionCopy: "You practiced restaurant service decisions across wine, beer, and spirits.",
    facilities: [
      makeFacility("winery", "/game/backgrounds/level7-winery-restaurant-v1.png", ["Restaurant wine service is sequence, confidence, and guest comfort.", "Practice presentation, opening, pouring, glassware, and pacing.", "The goal is useful hospitality, not performance."], ["Open cleanly.", "Pour evenly.", "Recommend with the table's food and mood in mind."], "Train wine table service, glassware, and guest recommendation flow.", [
        { id: "bottle-presentation", name: "Bottle Presentation", stage: "Service sequence", purpose: "Confirms the correct bottle before opening.", detail: "Presentation protects accuracy and gives the guest a confident service moment.", x: 24, y: 40, w: 18, h: 20, image: "/grapes/cabernet-franc-static.png" },
        { id: "glassware", name: "Glassware Choice", stage: "Table setup", purpose: "Matches glass shape and cleanliness to wine style and service standard.", detail: "Glassware changes aroma delivery, temperature perception, and table polish.", x: 52, y: 43, w: 18, h: 20, image: "/grapes/chardonnay-static.png" },
        { id: "table-recommendation", name: "Table Recommendation", stage: "Hospitality", purpose: "Connects wine choices to dish, guest preference, and budget.", detail: "Offer one confident lead and one contrast option when the table needs comparison.", x: 78, y: 58, w: 17, h: 18, image: "/grapes/pinot-noir-static.png" }
      ]),
      makeFacility("brewery", "/game/backgrounds/level7-brewery-restaurant-v1.png", ["Beer restaurant service includes draft quality, glass care, and food-friendly language.", "The pour is part of the product.", "Help guests choose by flavor, strength, and meal."], ["Draft lines need care.", "Foam protects aroma.", "Beer pairings can be precise and approachable."], "Train draft pour, glass care, and table beer recommendations.", [
        { id: "draft-pour", name: "Draft Pour", stage: "Bar service", purpose: "Creates the right foam, carbonation release, and presentation.", detail: "A good pour avoids flat beer, wild foam, dirty glass issues, and wasted product.", x: 24, y: 40, w: 18, h: 20, image: "/commodities/hops/centennial.png" },
        { id: "glass-care", name: "Glass Care", stage: "Service quality", purpose: "Uses clean glassware to protect foam, aroma, and appearance.", detail: "Residue, lipstick, and sanitizer film can ruin head retention and guest trust.", x: 52, y: 43, w: 18, h: 20, image: "/commodities/grains/wheat.png" },
        { id: "meal-match", name: "Meal Match", stage: "Recommendation", purpose: "Matches beer intensity, bitterness, carbonation, malt, and alcohol to food.", detail: "Beer can cut fat, calm heat, echo roast, or brighten salty fried foods.", x: 78, y: 58, w: 17, h: 18, image: "/commodities/hops/citra.png" }
      ]),
      makeFacility("distillery", "/game/backgrounds/level7-distillery-restaurant-v1.png", ["Spirits restaurant service balances cocktails, neat pours, education, and responsibility.", "Glass, ice, garnish, and proof all change the experience.", "A recommendation should fit the guest's pace."], ["Use the right glass and ice.", "Cocktail balance matters.", "Responsible hospitality is active service."], "Train spirits service, cocktail logic, and responsible hospitality.", [
        { id: "glass-ice", name: "Glass and Ice", stage: "Serve build", purpose: "Matches glass and ice to spirit, cocktail, temperature, dilution, and presentation.", detail: "Ice quality and size control dilution, texture, and the guest's first impression.", x: 24, y: 40, w: 18, h: 20, image: "/commodities/grains/corn.png" },
        { id: "cocktail-balance", name: "Cocktail Balance", stage: "Mixing logic", purpose: "Balances spirit, acid, sugar, bitterness, dilution, and aroma.", detail: "Classic specs are templates; tasting tells you whether balance is working.", x: 52, y: 43, w: 18, h: 20, image: "/commodities/fruit/grapefruit.png" },
        { id: "responsible-service", name: "Responsible Service", stage: "Hospitality safety", purpose: "Paces recommendations and protects guests through attentive service.", detail: "Strong drinks require clear communication, water, food awareness, and good judgment.", x: 78, y: 58, w: 17, h: 18, image: "/game/equipment-scenes/distillery-spirit-safe-hummin-v1.png" }
      ])
    ]
  },
  {
    id: "classic-food-pairings",
    number: 8,
    title: "Classic Food Pairings",
    version: "Level 8",
    summary: "Practice pairing by weight, acid, fat, protein, spice, sweetness, bitterness, and texture.",
    completionTitle: "Level 8 complete",
    completionCopy: "You completed the current Sip by Bit learning path through classic pairing logic.",
    facilities: [
      makeFacility("winery", "/game/backgrounds/level8-winery-pairing-v1.png", ["Classic wine pairings start with weight, acid, tannin, sweetness, and aroma.", "Match structure first, then echo or contrast flavor.", "Pairings should help the food and wine both taste clearer."], ["Acid cuts fat.", "Tannin likes protein.", "Sweetness handles spice and salt."], "Train classic wine pairing logic for acid, fat, tannin, and protein.", [
        { id: "acid-fat", name: "Acid and Fat", stage: "Pairing structure", purpose: "Uses acidity to refresh rich, creamy, or oily foods.", detail: "High-acid wine can make a rich dish feel lighter and more precise.", x: 24, y: 40, w: 18, h: 20, image: "/grapes/sauvignon-blanc-static.png" },
        { id: "tannin-protein", name: "Tannin and Protein", stage: "Red wine match", purpose: "Pairs tannic reds with protein and fat that soften astringency.", detail: "Steak and structured red wine work because protein and fat change tannin perception.", x: 52, y: 43, w: 18, h: 20, image: "/grapes/cabernet-sauvignon-static.png" },
        { id: "sweet-spice", name: "Sweet and Spice", stage: "Heat balance", purpose: "Uses sweetness and fruit to balance spicy heat and salty intensity.", detail: "Dry high-alcohol wines can intensify heat; gentle sweetness can calm it.", x: 78, y: 58, w: 17, h: 18, image: "/grapes/riesling-static.png" }
      ]),
      makeFacility("brewery", "/game/backgrounds/level8-brewery-pairing-v1.png", ["Beer pairing works through carbonation, bitterness, malt, roast, alcohol, and sweetness.", "Think cut, complement, and contrast.", "A great beer pairing can reset the palate between bites."], ["Carbonation cuts.", "Roast echoes grill and chocolate.", "Bitterness needs fat or sweetness to land well."], "Train beer pairing logic for carbonation, bitterness, roast, and spice.", [
        { id: "carbonation-cut", name: "Carbonation Cut", stage: "Texture pairing", purpose: "Uses bubbles to lift fat, salt, and fried texture.", detail: "Carbonation refreshes the palate and keeps rich foods from feeling heavy.", x: 24, y: 40, w: 18, h: 20, image: "/commodities/grains/wheat.png" },
        { id: "bitterness-fat", name: "Bitterness and Fat", stage: "IPA logic", purpose: "Balances hop bitterness with rich or fatty foods.", detail: "Bitterness can feel sharp alone but works well when fat gives it something to cut.", x: 52, y: 43, w: 18, h: 20, image: "/commodities/hops/citra.png" },
        { id: "roast-sweet", name: "Roast and Sweet", stage: "Dark beer match", purpose: "Pairs roasted malt with chocolate, caramel, smoke, or grilled flavors.", detail: "Roast can echo browned flavors while sweetness keeps bitterness from dominating.", x: 78, y: 58, w: 17, h: 18, image: "/commodities/grains/barley.png" }
      ]),
      makeFacility("distillery", "/game/backgrounds/level8-distillery-pairing-v1.png", ["Spirits pairings are intense, so portions, dilution, sweetness, and aroma matter.", "Use smoke, spice, citrus, chocolate, salt, and fat carefully.", "Pair the sip size to the food moment."], ["Smoke can echo char.", "Citrus brightens strong spirits.", "Dessert needs sweetness and texture control."], "Train spirits pairing logic for smoke, citrus, dessert, and intensity.", [
        { id: "smoke-char", name: "Smoke and Char", stage: "Flavor echo", purpose: "Pairs smoky or barrel-aged spirits with grilled, roasted, or smoked foods.", detail: "Echoing char can be powerful, so keep bitterness and alcohol intensity in balance.", x: 24, y: 40, w: 18, h: 20, image: "/commodities/grains/rye.png" },
        { id: "citrus-balance", name: "Citrus Balance", stage: "Cocktail pairing", purpose: "Uses acidity and garnish aroma to brighten spirit-rich pairings.", detail: "Citrus can lift fat and salt while controlling sweetness in cocktails.", x: 52, y: 43, w: 18, h: 20, image: "/commodities/fruit/grapefruit.png" },
        { id: "dessert-spirit", name: "Dessert Spirit", stage: "Sweet pairing", purpose: "Matches spirit intensity with chocolate, caramel, nuts, or fruit desserts.", detail: "The drink should be at least as intense as the dessert without overwhelming it.", x: 78, y: 58, w: 17, h: 18, image: "/commodities/grains/corn.png" }
      ])
    ]
  }
];

const RAW_INGREDIENT_FACILITIES: Facility[] = [
  {
    id: "winery",
    name: "Winery",
    accent: "#8f3d8d",
    background: "/game/backgrounds/raw-winery-v1.png",
    leadId: "sippy",
    guides: layoutGuides("raw-ingredients", "winery", "sippy", [
      placeGuide(MAIN_GUIDES.sippy, 72, 48),
      placeGuide(MAIN_GUIDES.roma, 58, 62, { sheet: CHARACTER_SPRITES.romaWineLeaf }),
      placeGuide(MAIN_GUIDES.hummin, 84, 64),
      {
        id: "vineyard-mentor",
        name: "Aria",
        role: "Vineyard Manager",
        x: 35,
        y: 58,
        frame: 0,
        sheet: CHARACTER_SPRITES.ariaWine,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: -1,
        lines: [
          "Viticulture starts before the cellar. Training, canopy, soil, water, and harvest timing shape the fruit.",
          "A trained vine is easier to farm, easier to ripen evenly, and easier to pick cleanly.",
          "Tap each vineyard checkpoint and name what it controls before fruit reaches the winery."
        ]
      }
    ]),
    checkpoints: [
      {
        id: "vine-training",
        name: "Vine Training",
        stage: "Training system",
        purpose: "Positions shoots and fruiting wood so sunlight, airflow, and labor access stay balanced.",
        detail: "Cordon, cane, head-trained, and trellised systems change yield, shade, disease pressure, and how harvest crews move through the block.",
        x: 50,
        y: 27,
        w: 20,
        h: 20,
        image: "/game/checkpoint-scenes/raw-ingredients-winery-vine-training-v3.png"
      },
      {
        id: "canopy",
        name: "Canopy Management",
        stage: "Ripening control",
        purpose: "Uses shoot positioning, leaf removal, and crop load choices to guide ripeness and disease risk.",
        detail: "Canopy work protects flavor development. Too much shade can slow ripening; too much exposure can sunburn fruit or push harsher phenolics.",
        x: 21,
        y: 37,
        w: 18,
        h: 22,
        image: "/game/checkpoint-scenes/raw-ingredients-winery-canopy-v3.png"
      },
      {
        id: "harvest-pick",
        name: "Harvest Pick",
        stage: "Harvest timing",
        purpose: "Chooses when and how fruit leaves the vineyard based on sugar, acid, flavor, weather, and style.",
        detail: "Harvest decisions balance chemistry and taste. Hand picking protects delicate clusters; machine harvesting can move fast when weather pressure rises.",
        x: 73,
        y: 52,
        w: 20,
        h: 18,
        image: "/game/checkpoint-scenes/raw-ingredients-winery-harvest-pick-v3.png"
      }
    ],
    challenge: "Learn how vine training, canopy work, and harvest timing shape wine before fermentation starts."
  },
  {
    id: "brewery",
    name: "Brewery",
    accent: "#618531",
    background: "/game/backgrounds/raw-brewery-v1.png",
    leadId: "roma",
    guides: layoutGuides("raw-ingredients", "brewery", "roma", [
      {
        ...placeGuide(MAIN_GUIDES.roma, 68, 50, { sheet: CHARACTER_SPRITES.romaBeerClipboard }),
        lines: [
          "Beer starts in the field: grain variety, malting quality, hop character, and harvest handling.",
          "Raw ingredients decide body, bitterness, aroma, color, foam, and fermentation performance.",
          "Walk each checkpoint and connect the crop choice to the beer outcome."
        ]
      },
      placeGuide(MAIN_GUIDES.sippy, 84, 64, { sheet: CHARACTER_SPRITES.sippyBeerGesture }),
      placeGuide(MAIN_GUIDES.hummin, 54, 68, { sheet: CHARACTER_SPRITES.humminBeerBook, flip: -1 }),
      {
        id: "field-brewer",
        name: "Bruno",
        role: "Field Brewer",
        x: 32,
        y: 60,
        frame: 0,
        sheet: CHARACTER_SPRITES.brunoBeer,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: 1,
        lines: [
          "Barley gives enzymes and extract; hops give bitterness, aroma, and microbial stability.",
          "Agriculture choices show up later as mash performance and sensory character.",
          "When a checkpoint pulses, ask what the raw material contributes to the finished beer."
        ]
      }
    ]),
    checkpoints: [
      {
        id: "barley-row",
        name: "Barley Selection",
        stage: "Grain crop",
        purpose: "Chooses barley with the protein, enzyme, and starch profile needed for brewing.",
        detail: "Two-row and six-row barley behave differently in the malt house and mash tun. Brewers care about extract potential, modification, husk quality, and protein.",
        x: 20,
        y: 24,
        w: 18,
        h: 20,
        image: "/commodities/grains/barley.png"
      },
      {
        id: "hop-trellis",
        name: "Hop Trellis",
        stage: "Hop growing",
        purpose: "Trains hop bines upward so cones develop with airflow, sunlight, and harvest access.",
        detail: "Hop variety, trellis height, disease pressure, harvest date, and drying choices influence bitterness, oil intensity, and aroma freshness.",
        x: 78,
        y: 70,
        w: 18,
        h: 18,
        image: "/commodities/hops/cascade.png"
      },
      {
        id: "malt-check",
        name: "Malt Readiness",
        stage: "Post-harvest prep",
        purpose: "Turns harvested grain into malt with controlled germination and kilning.",
        detail: "Malting unlocks enzymes and flavor. Kilning can keep malt pale and bready or push toast, biscuit, caramel, roast, and color.",
        x: 46,
        y: 26,
        w: 17,
        h: 22,
        image: "/commodities/grains/wheat.png"
      }
    ],
    challenge: "Connect barley, hops, and malt preparation to the beer traits they create."
  },
  {
    id: "distillery",
    name: "Distillery",
    accent: "#c87824",
    background: "/game/backgrounds/raw-distillery-v1.png",
    leadId: "hummin",
    guides: layoutGuides("raw-ingredients", "distillery", "hummin", [
      {
        ...placeGuide(MAIN_GUIDES.hummin, 72, 45, { sheet: CHARACTER_SPRITES.humminSpiritBook }),
        lines: [
          "Spirits begin with agricultural choices: grain, fruit, cane, agave, climate, and harvest condition.",
          "The still concentrates what farming and fermentation already created.",
          "Tap each checkpoint and trace the raw ingredient into aroma, texture, and yield."
        ]
      },
      placeGuide(MAIN_GUIDES.sippy, 56, 52, { sheet: CHARACTER_SPRITES.sippySpiritGesture, flip: -1 }),
      placeGuide(MAIN_GUIDES.roma, 82, 62, { sheet: CHARACTER_SPRITES.romaSpiritClipboard }),
      {
        id: "crop-distiller",
        name: "Sol",
        role: "Crop Distiller",
        x: 31,
        y: 53,
        frame: 0,
        sheet: CHARACTER_SPRITES.solSpirit,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: -1,
        lines: [
          "Corn, rye, wheat, barley, fruit, and cane each ferment differently.",
          "A distiller cares about sugar, starch, cleanliness, moisture, and storage condition.",
          "For every raw material, ask what flavor it brings and what processing it needs."
        ]
      }
    ]),
    checkpoints: [
      {
        id: "corn-crop",
        name: "Corn Crop",
        stage: "Mash bill base",
        purpose: "Provides high starch and a sweet, rounded base for many grain spirits.",
        detail: "Corn quality affects starch availability, fermentability, and cereal character. Drying and storage matter because damaged grain can create off aromas.",
        x: 20,
        y: 30,
        w: 18,
        h: 22,
        image: "/commodities/grains/corn.png"
      },
      {
        id: "rye-field",
        name: "Rye Field",
        stage: "Flavor grain",
        purpose: "Adds spice, structure, and drying grain character to spirit recipes.",
        detail: "Rye can be flavorful and demanding. Distillers manage grind, hydration, viscosity, and enzyme support so the mash ferments cleanly.",
        x: 43,
        y: 34,
        w: 18,
        h: 20,
        image: "/commodities/grains/rye.png"
      },
      {
        id: "barley-malt",
        name: "Malted Barley",
        stage: "Enzyme support",
        purpose: "Contributes enzymes, fermentable extract, and malt character for many distilled bases.",
        detail: "Malted barley can drive conversion in a grain mash while adding biscuit, cereal, nutty, or toasted notes depending on malt style.",
        x: 76,
        y: 44,
        w: 16,
        h: 20,
        image: "/commodities/grains/barley.png"
      }
    ],
    challenge: "Track how grain selection shapes the fermentable base before distillation."
  }
];

function makeAdvancedGuides(facilityId: FacilityId, leadLines: string[], supportLines: string[]): Guide[] {
  if (facilityId === "winery") {
    return [
      { ...placeGuide(MAIN_GUIDES.sippy, 72, 48, { sheet: CHARACTER_SPRITES.sippySparkGesture }), lines: leadLines },
      placeGuide(MAIN_GUIDES.roma, 58, 62, { sheet: CHARACTER_SPRITES.romaSparkClipboard }),
      placeGuide(MAIN_GUIDES.hummin, 84, 64, { sheet: CHARACTER_SPRITES.humminSparkBook }),
      {
        id: "advanced-wine-mentor",
        name: "Aria",
        role: "Wine Mentor",
        x: 35,
        y: 58,
        frame: 0,
        sheet: CHARACTER_SPRITES.ariaWine,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: -1,
        lines: supportLines
      }
    ];
  }

  if (facilityId === "brewery") {
    return [
    { ...placeGuide(MAIN_GUIDES.roma, 70, 46, { sheet: CHARACTER_SPRITES.romaSpark }), lines: leadLines },
    placeGuide(MAIN_GUIDES.sippy, 82, 64, { sheet: CHARACTER_SPRITES.sippySpark }),
    placeGuide(MAIN_GUIDES.hummin, 56, 66, { sheet: CHARACTER_SPRITES.humminSpark, flip: -1 }),
      {
        id: "advanced-brew-mentor",
        name: "Bruno",
        role: "Brew Mentor",
        x: 34,
        y: 58,
        frame: 0,
        sheet: CHARACTER_SPRITES.brunoBeer,
        frames: 1,
        aspect: CHARACTER_ASPECT,
        flip: 1,
        lines: supportLines
      }
    ];
  }

  return [
    { ...placeGuide(MAIN_GUIDES.hummin, 70, 48, { sheet: CHARACTER_SPRITES.humminSparkBook }), lines: leadLines },
    placeGuide(MAIN_GUIDES.sippy, 56, 66, { sheet: CHARACTER_SPRITES.sippySparkGesture, flip: -1 }),
    placeGuide(MAIN_GUIDES.roma, 82, 64, { sheet: CHARACTER_SPRITES.romaSparkClipboard }),
    {
      id: "advanced-spirit-mentor",
      name: "Sol",
      role: "Spirit Mentor",
      x: 34,
      y: 58,
      frame: 0,
      sheet: CHARACTER_SPRITES.solSpirit,
      frames: 1,
      aspect: CHARACTER_ASPECT,
      flip: -1,
      lines: supportLines
    }
  ];
}

function getAdvancedLevelId(background: string): LevelId {
  if (background.includes("level3-")) return "fermentation-distillation";
  if (background.includes("level4-")) return "aging-requirements";
  if (background.includes("level5-")) return "packaging-distribution";
  if (background.includes("level6-")) return "retail-training";
  if (background.includes("level7-")) return "restaurant-training";
  return "classic-food-pairings";
}

function makeFacility(
  id: FacilityId,
  background: string,
  leadLines: string[],
  supportLines: string[],
  challenge: string,
  checkpoints: Checkpoint[]
): Facility {
  const names: Record<FacilityId, string> = { winery: "Winery", brewery: "Brewery", distillery: "Distillery" };
  const accents: Record<FacilityId, string> = { winery: "#8f3d8d", brewery: "#c99a22", distillery: "#4f9a62" };
  const leadIds: Record<FacilityId, string> = { winery: "sippy", brewery: "roma", distillery: "hummin" };
  return {
    id,
    name: names[id],
    accent: accents[id],
    background,
    leadId: leadIds[id],
    guides: layoutGuides(getAdvancedLevelId(background), id, leadIds[id], makeAdvancedGuides(id, leadLines, supportLines)),
    checkpoints,
    challenge
  };
}

const ADVANCED_LEVELS: GameLevel[] = [
  {
    id: "fermentation-distillation",
    number: 3,
    title: "Fermentation & Distillation Focus",
    version: "Level 3",
    summary: "Control yeast, conversion, vapor, condensation, and cuts.",
    completionTitle: "Level 3 complete",
    completionCopy: "You connected fermentation control and distillation choices to flavor, safety, and style.",
    facilities: [
      makeFacility("winery", "/game/backgrounds/level3-winery-fermentation-v1.png", [
        "Fermentation is where fruit chemistry becomes wine structure and aroma.",
        "Track yeast health, cap management, temperature, and oxygen exposure.",
        "Each checkpoint asks what the operator controls and what can go wrong."
      ], [
        "The cap is a flavor source and a risk area.",
        "Temperature changes aroma, extraction, and fermentation speed.",
        "Healthy yeast protects the whole cellar schedule."
      ], "Control yeast activity, cap contact, and temperature during wine fermentation.", [
        { id: "yeast-activity", name: "Yeast Activity", stage: "Fermentation start", purpose: "Tracks whether yeast is converting sugar cleanly into alcohol, heat, aroma, and carbon dioxide.", detail: "A steady fermentation smells clean, warms predictably, and shows active movement. Stalls, excess heat, or off aromas need fast attention.", x: 24, y: 34, w: 17, h: 20, image: "/grapes/cabernet-sauvignon-static.png" },
        { id: "cap-management", name: "Cap Management", stage: "Extraction", purpose: "Keeps skins wet and manages color, tannin, aroma, and microbial risk.", detail: "Punchdowns, pumpovers, and rack-and-return all change extraction. The right method depends on fruit, style, vessel, and fermentation phase.", x: 48, y: 38, w: 18, h: 20, image: "/grapes/pinot-noir-static.png" },
        { id: "temperature-control", name: "Temperature Control", stage: "Heat management", purpose: "Guides fermentation speed, aroma retention, and extraction intensity.", detail: "Cooler ferments preserve delicate aromas; warmer ferments can extract more color and structure but raise stress risk.", x: 76, y: 44, w: 17, h: 20, image: "/game/equipment-scenes/winery-fermentation-tank-sippy-v1.png" }
      ]),
      makeFacility("brewery", "/game/backgrounds/level3-brewery-fermentation-v1.png", [
        "Beer fermentation turns wort into beer through yeast choice and cellar control.",
        "Watch pitch rate, temperature, oxygen, pressure, and conditioning time.",
        "Good brewers taste the process before they taste the final pint."
      ], [
        "Yeast strain sets ester, phenol, attenuation, and cleanup behavior.",
        "Dry hopping and pressure choices can reshape aroma and mouthfeel.",
        "Conditioning is where rough edges settle."
      ], "Manage yeast pitching, temperature, and conditioning to shape beer style.", [
        { id: "yeast-pitch", name: "Yeast Pitch", stage: "Fermentation start", purpose: "Adds enough healthy yeast to ferment wort cleanly and predictably.", detail: "Underpitching can stress yeast; overpitching can mute character. Oxygen, temperature, and vitality all matter at pitch.", x: 24, y: 36, w: 17, h: 20, image: "/commodities/grains/barley.png" },
        { id: "ferment-temp", name: "Fermentation Temperature", stage: "Cellar control", purpose: "Controls yeast flavor, speed, attenuation, and cleanup.", detail: "Ale and lager strains need different temperature windows. Temperature ramps can help yeast finish and reabsorb byproducts.", x: 51, y: 36, w: 18, h: 20, image: "/game/equipment-scenes/brewery-conical-fermenter-roma-v1.png" },
        { id: "conditioning", name: "Conditioning", stage: "Maturation", purpose: "Lets beer stabilize, clarify, carbonate, and integrate flavor.", detail: "Conditioning time, pressure, temperature, and transfers affect clarity, freshness, and package stability.", x: 78, y: 58, w: 17, h: 18, image: "/commodities/hops/cascade.png" }
      ]),
      makeFacility("distillery", "/game/backgrounds/level3-distillery-distillation-v1.png", [
        "Distillation focuses fermented flavor by managing heat, vapor, cooling, and cuts.",
        "Follow the path from wash to vapor to condenser to receiver.",
        "The safest operator always knows where alcohol vapor is going."
      ], [
        "Heads, hearts, and tails are decisions, not just containers.",
        "Cooling water affects condensation and collection stability.",
        "Heat control changes entrainment, reflux, and texture."
      ], "Control heat, condensation, and cuts during distillation.", [
        { id: "heat-vapor", name: "Heat and Vapor", stage: "Boil control", purpose: "Raises alcohol-rich vapor without pushing foam, solids, or harsh notes into the vapor path.", detail: "Slow heat gives control; aggressive heat can smear cuts or create foaming risk.", x: 24, y: 38, w: 17, h: 20, image: "/game/equipment-scenes/distillery-pot-still-hummin-v1.png" },
        { id: "condensation", name: "Condensation", stage: "Cooling", purpose: "Turns vapor back into liquid through controlled condenser flow.", detail: "Cooling must be steady enough to condense safely without shocking the run or wasting water.", x: 52, y: 36, w: 18, h: 20, image: "/game/equipment-scenes/distillery-spirit-safe-hummin-v1.png" },
        { id: "cuts", name: "Cut Decisions", stage: "Collection", purpose: "Separates heads, hearts, and tails based on aroma, proof, temperature, and style.", detail: "Cut points define cleanliness, texture, and character. They are sensory decisions supported by measurement.", x: 78, y: 50, w: 17, h: 20, image: "/game/equipment-scenes/distillery-spirit-safe-hummin-v1.png" }
      ])
    ]
  },
  {
    id: "aging-requirements",
    number: 4,
    title: "Aging Requirements",
    version: "Level 4",
    summary: "Learn vessel choice, time, oxygen, temperature, humidity, and maturation risk.",
    completionTitle: "Level 4 complete",
    completionCopy: "You matched aging vessels and cellar conditions to beverage style and stability.",
    facilities: [
      makeFacility("winery", "/game/backgrounds/level4-winery-aging-v1.png", ["Aging is not waiting; it is controlled exposure to time, oxygen, lees, and vessel material.", "Compare oak, neutral vessels, stainless, and cellar conditions.", "Tap each checkpoint and name what changes during maturation."], ["Oak adds texture and aroma.", "Lees can build body and protect wine.", "Cellar conditions keep slow change predictable."], "Study wine aging vessels, oxygen exposure, and cellar conditions.", [
        { id: "oak-vessel", name: "Oak Vessel", stage: "Vessel choice", purpose: "Adds oxygen exchange, texture, and oak-derived aroma depending on age, size, and toast.", detail: "New oak speaks loudly; neutral oak behaves more like a breathable container.", x: 22, y: 42, w: 18, h: 20, image: "/grapes/merlot-static.png" },
        { id: "lees-contact", name: "Lees Contact", stage: "Texture building", purpose: "Uses spent yeast contact to build mouthfeel, stability, and savory complexity.", detail: "Lees can protect and enrich wine, but poor handling can produce reductive or dirty aromas.", x: 50, y: 50, w: 18, h: 18, image: "/grapes/chardonnay-static.png" },
        { id: "cellar-climate", name: "Cellar Climate", stage: "Storage condition", purpose: "Keeps aging steady through temperature, humidity, light, and vibration control.", detail: "Stable cool conditions slow reactions and reduce loss, spoilage, and cork problems.", x: 78, y: 38, w: 17, h: 20, image: "/game/equipment-scenes/winery-fermentation-tank-sippy-v1.png" }
      ]),
      makeFacility("brewery", "/game/backgrounds/level4-brewery-aging-v1.png", ["Beer aging covers conditioning, lagering, wood, mixed culture, and freshness decisions.", "Not every beer should age; some should move fast.", "Separate maturation from staling."], ["Cold conditioning smooths beer.", "Wood adds oxygen, tannin, and resident microbes.", "Freshness is a requirement for many hop-forward styles."], "Study lagering, wood aging, and carbonation conditioning.", [
        { id: "lagering", name: "Lagering", stage: "Cold maturation", purpose: "Uses cold time to clarify, smooth, and stabilize lager-style beer.", detail: "Cold conditioning helps yeast settle and rough fermentation notes integrate.", x: 22, y: 40, w: 18, h: 20, image: "/game/equipment-scenes/brewery-conical-fermenter-roma-v1.png" },
        { id: "wood-aging", name: "Wood Aging", stage: "Barrel character", purpose: "Adds oak, oxygen, spirit residue, acidity, or microbial complexity depending on barrel history.", detail: "Barrel beer needs careful tasting because extraction and oxidation keep moving.", x: 50, y: 47, w: 18, h: 20, image: "/commodities/grains/barley.png" },
        { id: "carbonation", name: "Carbonation", stage: "Conditioning", purpose: "Sets foam, lift, texture, and package readiness.", detail: "Carbonation can come from forced CO2, spunding, bottle conditioning, or keg conditioning.", x: 78, y: 55, w: 17, h: 18, image: "/commodities/hops/citra.png" }
      ]),
      makeFacility("distillery", "/game/backgrounds/level4-distillery-aging-v1.png", ["Spirit maturation happens inside wood and warehouse climate.", "Track barrel entry, char, time, humidity, and evaporation.", "Every rickhouse position changes the aging story."], ["Char creates filtration and flavor layers.", "Warehouse heat expands spirit into wood.", "Angel share changes proof, volume, and concentration."], "Study barrel char, warehouse climate, and maturation time.", [
        { id: "barrel-char", name: "Barrel Char", stage: "Wood preparation", purpose: "Creates a charcoal layer and toasted wood compounds that shape color, aroma, and texture.", detail: "Char and toast levels influence vanilla, spice, smoke, caramel, and filtration effects.", x: 22, y: 40, w: 18, h: 20, image: "/commodities/grains/corn.png" },
        { id: "warehouse-climate", name: "Warehouse Climate", stage: "Rickhouse condition", purpose: "Uses temperature and humidity shifts to move spirit in and out of wood.", detail: "Hotter zones mature differently from cooler zones. Humidity affects proof changes and evaporation.", x: 50, y: 42, w: 18, h: 20, image: "/commodities/grains/rye.png" },
        { id: "maturation-time", name: "Maturation Time", stage: "Aging decision", purpose: "Balances extraction, oxidation, evaporation, and integration.", detail: "More time is not automatically better; the right endpoint depends on barrel, climate, proof, and style.", x: 78, y: 50, w: 17, h: 20, image: "/game/equipment-scenes/distillery-pot-still-hummin-v1.png" }
      ])
    ]
  }
];

const LEVELS: GameLevel[] = [
  {
    id: "raw-ingredients",
    number: 1,
    title: "Raw Ingredient Quest",
    version: "Level 1",
    summary: "Grow, train, harvest, and prepare the ingredients before they enter production.",
    completionTitle: "Level 1 complete",
    completionCopy: "You traced raw ingredients from vineyard, field, and crop decisions into flavor-ready production inputs.",
    facilities: RAW_INGREDIENT_FACILITIES
  },
  {
    id: "equipment-lab",
    number: 2,
    title: "Equipment Quest Lab",
    version: "Level 2",
    summary: "Move through each production room and identify what every major piece of equipment changes.",
    completionTitle: "Level 2 complete",
    completionCopy: "You cleared the winery, brewery, and distillery equipment labs. The lesson is ready to submit.",
    facilities: EQUIPMENT_FACILITIES
  },
  ...ADVANCED_LEVELS,
  ...ADDITIONAL_LEVELS
];

function validateLevelCharacterRotation(levels: GameLevel[]): void {
  const requiredLeads = ["sippy", "roma", "hummin"];

  levels.forEach((level) => {
    if (level.facilities.length !== 3) {
      throw new Error(`Level ${level.id} must define exactly 3 facilities.`);
    }

    const leadIds = level.facilities.map((facility) => facility.leadId);
    requiredLeads.forEach((leadId) => {
      const count = leadIds.filter((id) => id === leadId).length;
      if (count !== 1) {
        throw new Error(`Level ${level.id} must include exactly one ${leadId} lead.`);
      }
    });

    level.facilities.forEach((facility) => {
      if (facility.checkpoints.length !== 3) {
        throw new Error(`Level ${level.id}/${facility.id} must define exactly 3 checkpoints.`);
      }
    });
  });
}

validateLevelCharacterRotation(LEVELS);

const LEVEL_ROADMAP: LevelRoadmapItem[] = LEVELS.map((item) => ({
  id: item.id,
  number: item.number,
  title: item.title,
  playable: true
}));

function getVisitedKey(levelId: LevelId, facilityId: FacilityId, checkpointId: string): string {
  return `${levelId}:${facilityId}:${checkpointId}`;
}

function getGeneratedCheckpointImage(levelId: LevelId, facilityId: FacilityId, checkpointId: string): string {
  return `/game/checkpoint-scenes/${levelId}-${facilityId}-${checkpointId}-v3.png`;
}

function getRoomCompletionKey(levelId: LevelId, facilityId: FacilityId): string {
  return `${levelId}:${facilityId}`;
}

const getFramePosition = (frame: number, totalFrames: number) => `${(frame / Math.max(1, totalFrames - 1)) * 100}%`;

function clampPercent(value: number): number {
  return Math.min(95, Math.max(5, value));
}

function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getWalkDirection(dx: number, dy: number): WalkDirection {
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  const diagonalRatio = Math.min(absDx, absDy) / Math.max(absDx, absDy, 0.001);

  if (diagonalRatio > 0.38) {
    if (dy < 0) return dx < 0 ? "up-left" : "up-right";
    return dx < 0 ? "down-left" : "down-right";
  }

  return absDx > absDy ? (dx < 0 ? "left" : "right") : dy < 0 ? "up" : "down";
}

function isLeftFacingDirection(direction: WalkDirection): boolean {
  return direction === "left" || direction.endsWith("-left");
}

function getFacilityOutput(facilityId: FacilityId): string {
  if (facilityId === "brewery") return "beer quality";
  if (facilityId === "distillery") return "spirit character";
  return "wine style";
}

function getCheckpointTeachingNotes(level: GameLevel, facility: Facility, checkpoint: Checkpoint): string[] {
  const output = getFacilityOutput(facility.id);
  return [
    `Operator lens: this ${checkpoint.stage.toLowerCase()} step matters because it changes ${output}, process timing, and the choices available later in ${level.title}.`,
    `Study cue: identify the input, the action, and the output for ${checkpoint.name}; then name one sign that the step is on target and one warning sign that needs attention.`,
    `Service link: practice explaining ${checkpoint.name.toLowerCase()} in guest-friendly language so the technical work connects back to flavor, texture, stability, or use case.`
  ];
}

export function SipStudiosGame() {
  const pageRef = useRef<HTMLElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const [levelId, setLevelId] = useState<LevelId>("raw-ingredients");
  const [facilityId, setFacilityId] = useState<FacilityId>("winery");
  const [player, setPlayer] = useState<Point>({ x: 50, y: 78 });
  const [target, setTarget] = useState<Point | null>(null);
  const [walkDirection, setWalkDirection] = useState<WalkDirection>("down");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("sippy");
  const [hasGuideInteraction, setHasGuideInteraction] = useState(false);
  const [checkpointModalId, setCheckpointModalId] = useState<string | null>(null);
  const [roomCompletionModalKey, setRoomCompletionModalKey] = useState<string | null>(null);
  const [roomCompletionSeen, setRoomCompletionSeen] = useState<Record<string, true>>({});
  const [finalCelebrationDismissed, setFinalCelebrationDismissed] = useState<Record<string, true>>({});
  const [showQuickNextLevelCta, setShowQuickNextLevelCta] = useState(false);
  const [visited, setVisited] = useState<Record<string, number>>({});
  const [lineIndex, setLineIndex] = useState(0);

  const level = useMemo(() => LEVELS.find((item) => item.id === levelId) ?? LEVELS[0], [levelId]);
  const facility = useMemo(() => level.facilities.find((item) => item.id === facilityId) ?? level.facilities[0], [facilityId, level]);
  const activeCheckpoint = facility.checkpoints.find((item) => item.id === activeId) ?? null;
  const modalCheckpoint = facility.checkpoints.find((item) => item.id === checkpointModalId) ?? null;
  const modalTeachingNotes = modalCheckpoint ? getCheckpointTeachingNotes(level, facility, modalCheckpoint) : [];
  const activeGuide = facility.guides.find((item) => item.id === activeId) ?? null;
  const leadGuide = facility.guides.find((item) => item.id === facility.leadId) ?? facility.guides[0];
  const activeTitle = activeGuide?.name ?? activeCheckpoint?.name ?? facility.name;
  const activeRole = activeGuide?.role ?? activeCheckpoint?.stage ?? "Facility";
  const activeLine = activeGuide
    ? activeGuide.lines[Math.min(lineIndex, activeGuide.lines.length - 1)]
    : activeCheckpoint?.purpose ?? facility.challenge;
  const visitedCount = facility.checkpoints.filter((item) => visited[getVisitedKey(level.id, facility.id, item.id)]).length;
  const roomComplete = visitedCount === facility.checkpoints.length;
  const progress = Math.min(100, (visitedCount / facility.checkpoints.length) * 100);
  const levelVisitedCount = level.facilities.reduce(
    (total, item) => total + item.checkpoints.filter((checkpoint) => visited[getVisitedKey(level.id, item.id, checkpoint.id)]).length,
    0
  );
  const levelCheckpointCount = level.facilities.reduce((total, item) => total + item.checkpoints.length, 0);
  const levelProgress = Math.min(100, (levelVisitedCount / levelCheckpointCount) * 100);
  const levelComplete = levelVisitedCount === levelCheckpointCount;
  const isFinalLevelRoomComplete = level.number === 8 && roomComplete;
  const finalCelebrationKey = getRoomCompletionKey(level.id, facility.id);
  const isFinalLevelCelebration = isFinalLevelRoomComplete && !modalCheckpoint && !roomCompletionModalKey && !finalCelebrationDismissed[finalCelebrationKey];
  const finalLevelCelebration = FINAL_LEVEL_CELEBRATIONS[facility.id];
  const otherFacilities = level.facilities.filter((item) => item.id !== facility.id);
  const nextLevel = LEVELS.find((item) => item.number === level.number + 1) ?? null;
  const nextCheckpoint = facility.checkpoints.find((item) => !visited[getVisitedKey(level.id, facility.id, item.id)]) ?? null;

  const changeLevel = (nextLevelId: LevelId, nextFacilityId: FacilityId = facilityId) => {
    setLevelId(nextLevelId);
    setFacilityId(nextFacilityId);
    setCheckpointModalId(null);
    setRoomCompletionModalKey(null);
    setShowQuickNextLevelCta(false);
  };

  useEffect(() => {
    setPlayer({ x: 50, y: 78 });
    setTarget(null);
    setPendingId(null);
    setActiveId(leadGuide.id);
    setHasGuideInteraction(false);
    setShowQuickNextLevelCta(false);
    setLineIndex(0);
  }, [facility.id, leadGuide.id, level.id]);

  useEffect(() => {
    if (!checkpointModalId) return;
    if (roomCompletionModalKey) setRoomCompletionModalKey(null);
  }, [checkpointModalId, roomCompletionModalKey]);

  useEffect(() => {
    const step = (ts: number) => {
      const prev = lastTickRef.current ?? ts;
      const dt = Math.min(0.05, (ts - prev) / 1000);
      lastTickRef.current = ts;
      setPlayer((current) => {
        if (!target) return current;
        const speed = 36;
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.55) return target;
        const travel = speed * dt;
        const ratio = Math.min(1, travel / dist);
        return { x: current.x + dx * ratio, y: current.y + dy * ratio };
      });
      animationRef.current = window.requestAnimationFrame(step);
    };
    animationRef.current = window.requestAnimationFrame(step);
    return () => {
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [target]);

  useEffect(() => {
    if (!target) return;
    if (distance(player, target) < 0.75) setTarget(null);
  }, [player, target]);

  useEffect(() => {
    if (!pendingId) return;
    const destination =
      facility.guides.find((item) => item.id === pendingId) ?? facility.checkpoints.find((item) => item.id === pendingId) ?? null;
    if (!destination) return;
    if (distance(player, destination) <= 9.5) {
      setActiveId(destination.id);
      setLineIndex(0);
      setPendingId(null);
      if ("purpose" in destination) {
        setHasGuideInteraction(false);
        setCheckpointModalId(destination.id);
        setVisited((current) => ({
          ...current,
          [getVisitedKey(level.id, facility.id, destination.id)]: (current[getVisitedKey(level.id, facility.id, destination.id)] ?? 0) + 1
        }));
      } else {
        setHasGuideInteraction(true);
      }
    }
  }, [facility, level.id, pendingId, player]);

  const walkTo = (point: Point, nextPendingId?: string) => {
    const dx = point.x - player.x;
    const dy = point.y - player.y;
    setWalkDirection(getWalkDirection(dx, dy));
    setActiveId("");
    setLineIndex(0);
    setPendingId(nextPendingId ?? null);
    setTarget({ x: clampPercent(point.x), y: clampPercent(point.y) });
  };

  const handleWalk = (event: PointerEvent<HTMLDivElement>) => {
    if (!worldRef.current) return;
    const rect = worldRef.current.getBoundingClientRect();
    walkTo({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleInteraction = (point: Point, id: string, event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const isGuide = facility.guides.some((item) => item.id === id);
    if (distance(player, point) > 9.5) {
      walkTo(isGuide ? { x: point.x - 3, y: point.y + 2 } : { x: point.x, y: point.y + 5 }, id);
      return;
    }
    setActiveId(id);
    setLineIndex(0);
    setPendingId(null);
    setHasGuideInteraction(isGuide);
    if (facility.checkpoints.some((item) => item.id === id)) {
      setCheckpointModalId(id);
      setVisited((current) => ({ ...current, [getVisitedKey(level.id, facility.id, id)]: (current[getVisitedKey(level.id, facility.id, id)] ?? 0) + 1 }));
    }
  };

  const closeCheckpointModal = () => {
    const closingCheckpointId = checkpointModalId;
    const roomWillBeComplete = facility.checkpoints.every(
      (item) => item.id === closingCheckpointId || visited[getVisitedKey(level.id, facility.id, item.id)]
    );

    setCheckpointModalId(null);
    const roomKey = getRoomCompletionKey(level.id, facility.id);
    if (!roomWillBeComplete || roomCompletionSeen[roomKey]) return;
    setRoomCompletionSeen((current) => ({ ...current, [roomKey]: true }));
    setShowQuickNextLevelCta(false);
    if (level.number === 8) return;
    setRoomCompletionModalKey(roomKey);
  };

  const completeLesson = () => {
    const nextLevel = LEVELS.find((item) => item.number === level.number + 1);
    if (nextLevel) {
      changeLevel(nextLevel.id, facility.id);
      return;
    }
    setActiveId(leadGuide.id);
    setLineIndex(0);
  };

  const closeFinalCelebration = () => {
    setFinalCelebrationDismissed((current) => ({ ...current, [finalCelebrationKey]: true }));
  };

  const navigateToWorkspace = (page: "sipopedia" | "maps" | "cocktails") => {
    if (typeof window === "undefined") return;
    setRoomCompletionModalKey(null);
    window.location.hash = `#app/${page}`;
  };

  const toggleFullscreen = async () => {
    if (!pageRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await pageRef.current.requestFullscreen();
    try {
      const orientation = screen.orientation as ScreenOrientation & {
        lock?: (orientation: "landscape") => Promise<void>;
      };
      await orientation.lock?.("landscape");
    } catch {
      // Some mobile browsers only allow manual rotation after fullscreen starts.
    }
  };

  return (
    <section
      ref={pageRef}
      className="sip-game-page"
      aria-label="Sip Studios adventure game"
      style={{ "--facility-accent": facility.accent } as CSSProperties}
    >
      <header className="section-header sip-game-head">
        <div className="section-header-copy">
          <p className="sip-game-kicker">A Development by Sip Studios:</p>
          <h2>Sip by Bit Adventures</h2>
          <p className="sip-game-version">
            Current version: {level.version} - {level.title}
          </p>
          <p>
            Move the cup guide through each room, tap mentors and checkpoints, then use the hotspot clues to rehearse
            process flow.
          </p>
        </div>
      </header>

      <div className="sip-game-level-tabs" aria-label="Level selection">
        {LEVEL_ROADMAP.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${item.id === level.id ? "active" : ""} ${item.playable ? "" : "locked"}`}
            onClick={() => {
              if (item.playable) changeLevel(item.id as LevelId);
            }}
            disabled={!item.playable}
          >
            <strong>Level {item.number}</strong>
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      <div className="sip-game-facility-tabs" aria-label="Facility selection">
        {level.facilities.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === facility.id ? "active" : ""}
            onClick={() => setFacilityId(item.id)}
            style={{ "--tab-accent": item.accent } as CSSProperties}
          >
            {item.name}
          </button>
        ))}
        <button
          type="button"
          className="sip-game-fullscreen-btn"
          onClick={toggleFullscreen}
          aria-label="Open Sip by Bit fullscreen for landscape play"
        >
          Full Screen / Rotate
        </button>
      </div>

      <div className="sip-game-layout">
        <div className="sip-game-world-wrap">
          <div
            className="sip-game-world"
            ref={worldRef}
            onPointerDown={handleWalk}
            role="application"
            aria-label={`${facility.name} ${level.title} map`}
            style={{ backgroundImage: `url(${facility.background})` }}
          >
            <div className="sip-game-vignette" aria-hidden="true" />

            {facility.checkpoints.map((item) => {
              const seen = Boolean(visited[getVisitedKey(level.id, facility.id, item.id)]);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sip-game-equipment ${activeId === item.id ? "active" : ""} ${seen ? "visited" : ""}`}
                  style={
                    {
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      "--hotspot-w": `${item.w}%`,
                      "--hotspot-h": `${item.h}%`
                    } as CSSProperties
                  }
                  onPointerDown={(event) => handleInteraction(item, item.id, event)}
                  aria-label={`${item.name}, ${item.stage}`}
                >
                  <span aria-hidden="true">{item.name}</span>
                </button>
              );
            })}

            {facility.guides.map((guide) => (
              <button
                key={guide.id}
                type="button"
                className={`sip-game-mentor ${activeId === guide.id ? "active" : ""} ${guide.id === facility.leadId ? "lead" : ""}`}
                style={
                  {
                    left: `${guide.x}%`,
                    top: `${guide.y}%`,
                    "--sprite-sheet": `url(${guide.sheet})`,
                    "--sprite-pos": getFramePosition(guide.frame, guide.frames),
                    "--sprite-frames": `${guide.frames * 100}% 100%`,
                    "--sprite-aspect": `${guide.aspect}`,
                    "--sprite-flip": `${guide.flip ?? 1}`
                  } as CSSProperties
                }
                onPointerDown={(event) => handleInteraction(guide, guide.id, event)}
                aria-label={`${guide.name}, ${guide.role}`}
              >
                <span aria-hidden="true" />
              </button>
            ))}

            <div
              className={`sip-game-player ${target ? "moving" : ""}`}
              data-direction={walkDirection}
              style={
                {
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  "--sprite-sheet": `url(${PLAYER_SHEET})`,
                  "--sprite-aspect": `${PLAYER_ASPECT}`,
                  "--sprite-flip": `${isLeftFacingDirection(walkDirection) ? -1 : 1}`
                } as CSSProperties
              }
              aria-label="Cup guide player avatar"
            >
              <span aria-hidden="true" />
            </div>

            <div className="sip-game-objective-chip">
              <strong>
                Level {level.number}: {facility.name} drill
              </strong>
              <span>{facility.challenge}</span>
            </div>

            <div
              className={`sip-game-master-chip ${showQuickNextLevelCta && roomComplete && !roomCompletionModalKey ? "has-next-cta" : ""}`}
              aria-label={`${facility.name} mastery ${visitedCount} of ${facility.checkpoints.length}`}
            >
              <strong>{facility.name} Mastery</strong>
              <span>{pendingId ? "Walking to hotspot..." : `${visitedCount}/${facility.checkpoints.length} checkpoints`}</span>
              <div className="sip-game-progress">
                <div style={{ width: `${progress}%` }} />
              </div>
              <small>{roomComplete ? "Room complete" : `${levelVisitedCount}/${levelCheckpointCount} level checkpoints`}</small>
              {showQuickNextLevelCta && roomComplete && !roomCompletionModalKey ? (
                <button
                  type="button"
                  className="btn btn-primary sip-game-master-next-btn"
                  onClick={() => {
                    setShowQuickNextLevelCta(false);
                    if (nextLevel) {
                      changeLevel(nextLevel.id, facility.id);
                      return;
                    }
                    setActiveId(leadGuide.id);
                    setLineIndex(0);
                  }}
                >
                  {nextLevel ? "Next Level" : "Finish Lesson"}
                </button>
              ) : null}
            </div>

            {levelComplete && !isFinalLevelCelebration ? (
              <div className="sip-game-completion-card" role="status" aria-live="polite">
                <p className="sip-game-dialogue-kicker">{level.completionTitle}</p>
                <strong>{level.title} mastered</strong>
                <span>{level.completionCopy}</span>
                <div className="sip-game-progress" aria-hidden="true">
                  <div style={{ width: `${levelProgress}%` }} />
                </div>
                <button type="button" className="btn btn-primary" onClick={completeLesson}>
                  {level.number === 1 ? "Start Level 2" : "Complete Lesson"}
                </button>
              </div>
            ) : null}

            {activeGuide && hasGuideInteraction ? (
              <div className="sip-game-dialogue-card" role="dialog" aria-live="polite" aria-label={`${activeTitle} dialogue`}>
              <p className="sip-game-dialogue-kicker">
                {activeTitle} - {activeRole}
              </p>
              <p>{activeLine}</p>
              {nextCheckpoint ? (
                <p className="sip-game-dialogue-support">
                  Checkpoint support: next focus is {nextCheckpoint.name} ({nextCheckpoint.stage.toLowerCase()}) for this {facility.name.toLowerCase()} run.
                </p>
              ) : (
                <p className="sip-game-dialogue-support">
                  Checkpoint support: all three checkpoints are covered for this {facility.name.toLowerCase()} run.
                </p>
              )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {modalCheckpoint ? (
        <div
          className="sip-game-modal-backdrop"
          role="presentation"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeCheckpointModal();
          }}
        >
          <article
            className="sip-game-equipment-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${modalCheckpoint.name} checkpoint briefing`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("button, a")) return;
              closeCheckpointModal();
            }}
          >
            <button type="button" className="sip-game-modal-close" onClick={closeCheckpointModal} aria-label="Close checkpoint briefing">
              x
            </button>
            <div className="sip-game-equipment-portrait">
              <img
                src={getGeneratedCheckpointImage(level.id, facility.id, modalCheckpoint.id)}
                alt={modalCheckpoint.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = modalCheckpoint.image;
                }}
              />
            </div>
            <div className="sip-game-ff-dialogue">
              <p className="sip-game-dialogue-kicker">
                {leadGuide.name} - {modalCheckpoint.stage}
              </p>
              <h3>{modalCheckpoint.name}</h3>
              <p>{modalCheckpoint.purpose}</p>
              <p>{modalCheckpoint.detail}</p>
              <div className="sip-game-teaching-notes" aria-label={`${modalCheckpoint.name} teaching notes`}>
                {modalTeachingNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      ) : null}

      {roomCompletionModalKey === getRoomCompletionKey(level.id, facility.id) && !modalCheckpoint ? (
        <div
          className="sip-game-modal-backdrop"
          role="presentation"
          onPointerDown={() => {
            setRoomCompletionModalKey(null);
            setShowQuickNextLevelCta(true);
          }}
        >
          <article
            className="sip-game-room-complete-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${facility.name} room complete`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("button, a")) return;
              setRoomCompletionModalKey(null);
              setShowQuickNextLevelCta(true);
            }}
          >
            <button type="button" className="sip-game-modal-close" onClick={() => setRoomCompletionModalKey(null)} aria-label="Close room complete message">
              x
            </button>
            <p className="sip-game-dialogue-kicker">{level.completionTitle}</p>
            <h3>{facility.name} mastery complete</h3>
            <p>You clicked through and reviewed all 3 checkpoints for this room.</p>
            <div className="sip-game-progress" aria-hidden="true">
              <div style={{ width: `${progress}%` }} />
            </div>
            <div className="sip-game-dialogue-actions">
              {otherFacilities.map((targetFacility) => (
                <button
                  key={targetFacility.id}
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    setRoomCompletionModalKey(null);
                    setFacilityId(targetFacility.id);
                  }}
                >
                  Go to {targetFacility.name}
                </button>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setRoomCompletionModalKey(null);
                  if (nextLevel) {
                    changeLevel(nextLevel.id, facility.id);
                    return;
                  }
                  setActiveId(leadGuide.id);
                  setLineIndex(0);
                }}
              >
                {nextLevel ? "Next Level" : "Finish Lesson"}
              </button>
            </div>
          </article>
        </div>
      ) : null}

      {isFinalLevelCelebration ? (
        <div className="sip-game-modal-backdrop" role="presentation" onPointerDown={closeFinalCelebration}>
          <article
            className="sip-game-finale-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Level 8 complete celebration"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("button, a")) return;
              closeFinalCelebration();
            }}
          >
            <p className="sip-game-dialogue-kicker">LEVEL 8 COMPLETE</p>
            <h3>Epic Congratulations: {finalLevelCelebration.title}</h3>
            <p>{finalLevelCelebration.copy}</p>
            <div className="sip-game-finale-art" aria-label={finalLevelCelebration.alt}>
              <img src={finalLevelCelebration.image} alt={finalLevelCelebration.alt} />
            </div>
            <div className="sip-game-dialogue-actions">
              <button type="button" className="btn btn-light" onClick={() => navigateToWorkspace("sipopedia")}>
                Sipopedia
              </button>
              <button type="button" className="btn btn-light" onClick={() => navigateToWorkspace("maps")}>
                Maps
              </button>
              <button type="button" className="btn btn-primary" onClick={() => navigateToWorkspace("cocktails")}>
                Bev Recipes
              </button>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
