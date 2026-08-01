import type { Icon } from "@phosphor-icons/react";
import {
  ArrowCounterClockwise,
  ArrowsClockwise,
  ArrowsIn,
  Barcode,
  BookOpenText,
  Broom,
  CalendarCheck,
  Calculator,
  ChartLine,
  CheckCircle,
  CirclesThree,
  ClockCountdown,
  CloudFog,
  Drop,
  DropHalf,
  EyedropperSample,
  Factory,
  FileText,
  Fire,
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
  Package,
  Plant,
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
  TestTube,
  Thermometer,
  ThermometerHot,
  TreeStructure,
  TrendDown,
  Truck,
  UsersThree,
  Warehouse,
  Warning,
  Wine,
  Wrench
} from "@phosphor-icons/react";

export type AtlasPoint = readonly [number, number];

export type AtlasNodeArt = "crop" | "graphic" | "icon";

export type AtlasNodeDesign = {
  art: AtlasNodeArt;
  focus: AtlasPoint;
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
  "guides-at-sunrise": {
    phase: "guides",
    nodes: [
      graphic("Sippy", [30, 52], "/beyond-the-glass/guides/animated/sippy-still.png"),
      graphic("Roma", [49, 52], "/beyond-the-glass/guides/animated/roma-still.png"),
      graphic("Hummin", [68, 54], "/beyond-the-glass/guides/animated/hummin-still.png")
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
