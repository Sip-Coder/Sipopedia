import type { Icon } from "@phosphor-icons/react";
import type { BeyondTheGlassFieldNote } from "../../data/beyondTheGlassChapters";
import {
  ArrowCounterClockwise,
  ArrowsClockwise,
  ArrowsIn,
  Barcode,
  BatteryCharging,
  BookOpenText,
  Broom,
  CalendarCheck,
  Calculator,
  ChartLine,
  CheckCircle,
  CirclesThree,
  ClockCountdown,
  CloudFog,
  Cow,
  Coffee,
  CoffeeBean,
  Drop,
  DropHalf,
  EyedropperSample,
  Factory,
  FileText,
  Fire,
  FirstAidKit,
  Flask,
  FlowArrow,
  ForkKnife,
  Funnel,
  Gauge,
  GearSix,
  GlobeHemisphereWest,
  Hand,
  HandGrabbing,
  IdentificationCard,
  Leaf,
  Link,
  MagnifyingGlass,
  MapTrifold,
  Mountains,
  NotePencil,
  OrangeSlice,
  Package,
  Plant,
  Pulse,
  Recycle,
  Rows,
  Scales,
  SealCheck,
  SelectionAll,
  ShieldCheck,
  ShieldWarning,
  Snowflake,
  Sparkle,
  Stack,
  Storefront,
  SunHorizon,
  Tag,
  TeaBag,
  TestTube,
  Thermometer,
  ThermometerHot,
  TreeStructure,
  TrendDown,
  Truck,
  UsersThree,
  Warehouse,
  Warning,
  Waves,
  Wine,
  Wrench
} from "@phosphor-icons/react";

export type AtlasPoint = readonly [number, number];

export type AtlasNodeArt = "crop" | "graphic" | "icon";

export type AtlasNodeDesign = {
  art: AtlasNodeArt;
  focus: AtlasPoint;
  phoneFocus?: AtlasPoint;
  graphic?: string;
  icon?: Icon;
  label: string;
};

export type AtlasSceneDesign = {
  nodes: readonly AtlasNodeDesign[];
  phase:
    | "guides"
    | "vineyard"
    | "production"
    | "cellar"
    | "commerce"
    | "service";
};

const SEMANTIC_ICON_RULES: ReadonlyArray<readonly [RegExp, Icon]> = [
  [/orchard|citrus|pulp|peel|pomace|press cake/i, OrangeSlice],
  [/cow|goat|sheep|udder|milking|herd|animal care/i, Cow],
  [/pasteuri|thermal|heat treatment|hot fill/i, ThermometerHot],
  [/homogeni|emulsion|dispersion|suspension|stability/i, ArrowsIn],
  [/casein|whey|lactose|milk fat|protein|micronutrient|vitamin|mineral/i, Flask],
  [/fiber|prebiotic|botanical|plant extract/i, Plant],
  [/claim|evidence|promise|intended use|label literacy/i, FileText],
  [/electrolyte|hydration|fluid balance/i, FirstAidKit],
  [/caffeine|guarana|taurine|stimulant|alertness/i, BatteryCharging],
  [/cola|fountain|syrup room|bag-in-box/i, Pulse],
  [/kombucha|scoby|pellicle|starter culture|liquid culture/i, CirclesThree],
  [/acetic acid|organic acid|titratable acidity|\bph\b|acid balance/i, Flask],
  [/pressure|package conditioning|force carbonation/i, Gauge],
  [/coffee|coffee cherry|green bean|parchment|roast profile|roaster|cupping/i, CoffeeBean],
  [/espresso|pour-over|brewer|grind|burr|extraction|coffee service/i, Coffee],
  [/tea plant|cultivar|clone|bud|shoot|leaf|canopy|garden|estate/i, Leaf],
  [/root|propagation|nursery|mother bush|tea bush|planting/i, Plant],
  [/pluck|harvest|two leaves|flush/i, HandGrabbing],
  [/withering|rolling|oxidation|bruising|turning/i, ArrowsClockwise],
  [/fixation|kill-green|drying|firing|roast/i, Fire],
  [/sort|grade|sieve|screen/i, Rows],
  [/pack|chest|sachet|carton/i, Package],
  [/tea|oolong|matcha|sencha|infusion|steep|tea service/i, TeaBag],
  [/watershed|aquifer|groundwater|reservoir|surface water|water source/i, Waves],
  [/water|liquor|irrigation|mineral|alkalinity|hydration/i, Drop],
  [/malt|grain|grist|husk|starch|sugar|kernel|cereal/i, Stack],
  [/hop|botanical|agave|fruit|cane|juniper|peel|root/i, Leaf],
  [/yeast|ferment|culture|microb|organism|attenuation/i, CirclesThree],
  [/oxygen|carbon dioxide|carbonation|gas|foam/i, CloudFog],
  [/temperature|heat|cold|chill|cool|climate|storage/i, Thermometer],
  [/mill|roller|mechan|equipment|pump|agitator/i, GearSix],
  [/mash|lauter|filter|clarif|fining|sparge|vorlauf/i, Funnel],
  [/kettle|boil|kiln|toast|char|fire/i, Fire],
  [/whirlpool|reflux|recircul|rotation|return/i, ArrowsClockwise],
  [/tank|vessel|still|column|condenser|brewhouse|cellar/i, Factory],
  [/lab|sample|gravity|proof|ph|measure|sensory|panel|analysis/i, Flask],
  [/package|bottle|can|keg|closure|seam|fill/i, Package],
  [/label|code|trace|identity|record/i, Barcode],
  [/warehouse|distribution|delivery|cold chain|custody/i, Warehouse],
  [/tap|draught|service|glass|pour|guest|flight/i, Wine],
  [/clean|sanitation|hygiene|wash/i, Broom],
  [/law|legal|protected|standard|category|appellation/i, SealCheck],
  [/safety|responsible|risk|warning/i, ShieldCheck]
];

export function semanticAtlasIcon(note: BeyondTheGlassFieldNote): Icon {
  const text = `${note.eyebrow} ${note.title}`;
  return SEMANTIC_ICON_RULES.find(([pattern]) => pattern.test(text))?.[1] ?? Factory;
}

export function semanticAtlasPhase(sceneId: string): AtlasSceneDesign["phase"] {
  if (/guide|gate|plaza|map/i.test(sceneId)) return "guides";
  if (
    /water|watershed|aquifer|malt|hop|grain|material|root|vine|harvest|botanical|coffee|tea|farm|garden|estate|orchard|fruit|citrus|pasture|dairy|milk-source/i.test(
      sceneId
    )
  ) {
    return "vineyard";
  }
  if (/barrel|cooper|warehouse|conditioning|brite|maturation|assembly/i.test(sceneId)) {
    return "cellar";
  }
  if (/package|bottle|can|label|cold-chain|distribution|market|warehouse|retail|fountain/i.test(sceneId)) {
    return "commerce";
  }
  if (/taproom|service|final|tasting|sensory|shared-glass|guest|choice/i.test(sceneId)) return "service";
  return "production";
}

const crop = (label: string, focus: AtlasPoint, icon?: Icon): AtlasNodeDesign => ({
  art: "crop",
  focus,
  icon,
  label
});

const icon = (label: string, focus: AtlasPoint, nodeIcon: Icon): AtlasNodeDesign => ({
  art: "icon",
  focus,
  icon: nodeIcon,
  label
});

const graphic = (
  label: string,
  focus: AtlasPoint,
  graphicPath: string,
  nodeIcon?: Icon
): AtlasNodeDesign => ({
  art: "graphic",
  focus,
  graphic: graphicPath,
  icon: nodeIcon,
  label
});

/**
 * One authored visual treatment for every shared-atlas lesson node.
 *
 * Scene crops are reserved for concepts that are already clearly pictured in
 * the commissioned scene art. Symbolic ideas use the maintained Phosphor icon
 * library, while spatial equipment/process relationships use original SIP
 * Academy raster medallions.
 */
export const ATLAS_SCENE_DESIGNS: Record<string, AtlasSceneDesign> = {
  "health-evidence-conservatory-gate": {
    phase: "guides",
    nodes: [
      icon("Category", [18, 31], IdentificationCard),
      icon("Purpose", [36, 18], SelectionAll),
      icon("Evidence", [64, 18], FileText),
      icon("Safety", [82, 31], ShieldCheck),
      {
        ...icon("Route", [84, 72], FlowArrow),
        phoneFocus: [82, 76]
      }
    ]
  },
  "brewery-academy-plaza": {
    phase: "production",
    nodes: [
      icon("Water", [62, 74], Drop),
      icon("Malt", [13, 75], Stack),
      crop("Hops", [13, 43], Leaf),
      crop("Yeast", [84, 43], CirclesThree),
      icon("Service", [50, 55], Storefront)
    ]
  },
  "brewery-system-map": {
    phase: "production",
    nodes: [
      icon("Ingredients", [16, 28], Stack),
      icon("Hot side", [34, 68], Fire),
      icon("Cold side", [66, 68], Thermometer),
      icon("Package", [84, 28], Package),
      icon("Guest", [50, 20], Storefront)
    ]
  },
  "guides-at-sunrise": {
    phase: "guides",
    nodes: [
      {
        ...graphic("Sippy", [30, 70], "/beyond-the-glass/guides/animated/sippy-still.png"),
        phoneFocus: [20, 70]
      },
      {
        ...graphic("Roma", [49, 70], "/beyond-the-glass/guides/animated/roma-still.png"),
        phoneFocus: [50, 70]
      },
      {
        ...graphic("Hummin", [68, 70], "/beyond-the-glass/guides/animated/hummin-still.png"),
        phoneFocus: [80, 70]
      }
    ]
  },
  "two-regions": {
    phase: "vineyard",
    nodes: [
      crop("Coastal site", [24, 44], CloudFog),
      crop("Inland site", [77, 42], SunHorizon),
      graphic(
        "Program split",
        [51, 62],
        "/beyond-the-glass/nodes/two-regions-program-split-medallion.webp",
        FlowArrow
      )
    ]
  },
  "rain-and-roots": {
    phase: "vineyard",
    nodes: [
      crop("Irrigation", [50, 20], Drop),
      crop("Root zone", [49, 76], TreeStructure),
      graphic(
        "Soil texture",
        [25, 76],
        "/beyond-the-glass/nodes/rain-soil-texture-medallion.webp",
        Stack
      ),
      crop("Rootstock", [74, 75], Plant),
      graphic(
        "Water stress",
        [88, 45],
        "/beyond-the-glass/nodes/rain-water-stress-medallion.webp",
        ThermometerHot
      )
    ]
  },
  harvest: {
    phase: "vineyard",
    nodes: [
      icon("Pick timing", [47, 45], ClockCountdown),
      graphic(
        "Fruit care",
        [64, 58],
        "/beyond-the-glass/nodes/harvest-fruit-care-medallion.webp",
        ShieldWarning
      ),
      crop("Hand pick", [76, 62], HandGrabbing),
      graphic(
        "Machine pick",
        [28, 55],
        "/beyond-the-glass/nodes/harvest-mechanical.webp",
        GearSix
      ),
      graphic(
        "Field cooling",
        [87, 42],
        "/beyond-the-glass/nodes/harvest-field-cooling-medallion.webp",
        Snowflake
      )
    ]
  },
  "crush-house": {
    phase: "production",
    nodes: [
      graphic(
        "Destem",
        [52, 42],
        "/beyond-the-glass/nodes/crush-destemmer-medallion.webp",
        GearSix
      ),
      graphic(
        "Skin contact",
        [66, 57],
        "/beyond-the-glass/nodes/crush-skin-contact-medallion.webp",
        DropHalf
      ),
      crop("Sort", [22, 53], SelectionAll),
      graphic(
        "Press",
        [76, 48],
        "/beyond-the-glass/nodes/crush-pneumatic-press-medallion.webp",
        Gauge
      ),
      graphic(
        "Must transfer",
        [48, 73],
        "/beyond-the-glass/nodes/crush-must-transfer-medallion.webp",
        FlowArrow
      )
    ]
  },
  fermentation: {
    phase: "production",
    nodes: [
      crop("Yeast", [50, 66], CirclesThree),
      graphic(
        "Cap work",
        [24, 48],
        "/beyond-the-glass/nodes/fermentation-cap-work-medallion.webp",
        FlowArrow
      ),
      crop("Closed tank", [77, 39], Factory),
      graphic(
        "Open top",
        [36, 40],
        "/beyond-the-glass/nodes/fermentation-open-top-medallion.webp",
        DropHalf
      ),
      graphic(
        "Conversion",
        [67, 63],
        "/beyond-the-glass/nodes/fermentation-conversion.webp",
        TrendDown
      )
    ]
  },
  "wine-crossroads": {
    phase: "production",
    nodes: [
      crop("Still wine", [24, 47], Wine),
      crop("Sparkling", [51, 42], Sparkle),
      crop("Fortified", [78, 48], Flask)
    ]
  },
  laboratory: {
    phase: "production",
    nodes: [
      crop("Sample tools", [35, 53], TestTube),
      graphic(
        "SO₂ + acid",
        [63, 58],
        "/beyond-the-glass/nodes/lab-so2-acid-medallion.webp",
        Flask
      ),
      graphic(
        "pH + TA",
        [77, 48],
        "/beyond-the-glass/nodes/lab-ph-ta-medallion.webp",
        Scales
      ),
      icon("Density", [50, 35], Gauge),
      graphic(
        "Fault screen",
        [20, 45],
        "/beyond-the-glass/curriculum/wine-fault-detective-960.webp",
        MagnifyingGlass
      )
    ]
  },
  "barrel-aging": {
    phase: "cellar",
    nodes: [
      crop("Oak vessel", [24, 52], Wine),
      graphic(
        "Cellar climate",
        [50, 40],
        "/beyond-the-glass/nodes/cellar-environment.webp",
        Thermometer
      ),
      graphic(
        "Barrel compare",
        [50, 68],
        "/beyond-the-glass/nodes/barrel-comparison-medallion.webp",
        Rows
      ),
      graphic(
        "Barrel anatomy",
        [77, 45],
        "/beyond-the-glass/nodes/barrel-anatomy-medallion.webp",
        Wrench
      ),
      graphic(
        "Other vessels",
        [85, 65],
        "/beyond-the-glass/nodes/cellar-vessel-comparison-medallion.webp",
        CirclesThree
      )
    ]
  },
  "barrel-workbench": {
    phase: "cellar",
    nodes: [
      crop("Barrel sample", [40, 54], EyedropperSample),
      graphic(
        "Top + rack",
        [66, 54],
        "/beyond-the-glass/nodes/barrel-top-rack-medallion.webp",
        FlowArrow
      ),
      graphic(
        "Barrel clean",
        [20, 58],
        "/beyond-the-glass/nodes/barrel-cleaning-medallion.webp",
        Broom
      ),
      graphic(
        "Lees work",
        [78, 36],
        "/beyond-the-glass/nodes/barrel-lees-medallion.webp",
        DropHalf
      ),
      graphic(
        "Racking",
        [53, 76],
        "/beyond-the-glass/nodes/barrel-racking-medallion.webp",
        TrendDown
      )
    ]
  },
  "finishing-bench": {
    phase: "production",
    nodes: [
      crop("Trial blend", [24, 52], ArrowsIn),
      graphic(
        "Stabilize",
        [51, 48],
        "/beyond-the-glass/nodes/finishing-stability-medallion.webp",
        Snowflake
      ),
      graphic(
        "Filter",
        [78, 52],
        "/beyond-the-glass/nodes/finishing-filtration-medallion.webp",
        Funnel
      )
    ]
  },
  "sustainability-loop": {
    phase: "production",
    nodes: [
      crop("Utilities", [35, 48], Gauge),
      crop("Circular use", [67, 50], Recycle)
    ]
  },
  bottling: {
    phase: "production",
    nodes: [
      crop("Bottling line", [30, 50], Factory),
      icon("Bottle prep", [16, 58], Sparkle),
      graphic(
        "Closure",
        [57, 47],
        "/beyond-the-glass/nodes/closure-headspace.webp",
        ShieldCheck
      ),
      graphic(
        "Headspace",
        [70, 48],
        "/beyond-the-glass/nodes/closure-headspace.webp",
        DropHalf
      ),
      icon("Lot code", [84, 58], Barcode)
    ]
  },
  "bottle-passport": {
    phase: "commerce",
    nodes: [
      crop("Bottle identity", [50, 46], IdentificationCard),
      icon("Label law", [25, 62], SealCheck),
      graphic(
        "World map",
        [76, 62],
        "/beyond-the-glass/nodes/label-world-map-medallion.webp",
        GlobeHemisphereWest
      )
    ]
  },
  "tasting-flight": {
    phase: "service",
    nodes: [
      crop("Flight order", [28, 60], Rows),
      icon("Sensory method", [51, 57], NotePencil),
      icon("Compare", [75, 60], Scales)
    ]
  },
  "warehouse-logistics": {
    phase: "commerce",
    nodes: [
      crop("Case identity", [25, 52], Barcode),
      graphic(
        "Heat + light",
        [75, 35],
        "/beyond-the-glass/nodes/transport-heat-light.webp",
        ThermometerHot
      ),
      icon("Chain of care", [53, 57], Link),
      icon("Stock rotation", [35, 70], ArrowsClockwise),
      graphic(
        "Peak heat",
        [82, 68],
        "/beyond-the-glass/nodes/logistics-peak-heat-medallion.webp",
        Fire
      )
    ]
  },
  market: {
    phase: "commerce",
    nodes: [
      crop("Shelf place", [25, 45], Storefront),
      icon("Bottle care", [74, 42], ShieldCheck),
      icon("Occasion", [52, 62], CalendarCheck),
      icon("Shelf truth", [36, 68], Tag),
      icon("Returns", [78, 68], ArrowCounterClockwise)
    ]
  },
  "restaurant-buying": {
    phase: "commerce",
    nodes: [
      crop("Program fit", [30, 45], ForkKnife),
      icon("By the glass", [71, 46], Wine),
      icon("Team training", [48, 62], UsersThree),
      icon("Cellar fit", [82, 35], Warehouse),
      icon("Value math", [21, 68], Calculator)
    ]
  },
  restaurant: {
    phase: "service",
    nodes: [
      crop("Service path", [50, 63], CheckCircle),
      graphic(
        "TCA",
        [24, 47],
        "/beyond-the-glass/curriculum/wine-fault-detective-960.webp",
        Warning
      ),
      icon("Safe service", [76, 48], ShieldCheck),
      icon("Present bottle", [37, 70], Hand),
      icon("Glass + temp", [67, 70], Thermometer)
    ]
  },
  "first-sip": {
    phase: "service",
    nodes: [crop("Living map", [51, 62], MapTrifold)]
  }
};

export const GENERIC_ATLAS_ICONS = {
  guide: BookOpenText,
  landscape: Mountains,
  production: Factory,
  transport: Truck,
  vineyard: Leaf,
  warning: Warning,
  wine: Wine,
  document: FileText,
  chart: ChartLine,
  package: Package
} as const;
