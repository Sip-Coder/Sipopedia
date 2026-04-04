import { useEffect, useMemo, useState } from "react";

type FacilityId = "winery" | "brewery" | "distillery";
type LessonTag = "Foundations" | "Aromas" | "Structure" | "Service";
type MissionType = "Scout" | "Challenge" | "Boss";

type Facility = {
  id: FacilityId;
  label: string;
  subtitle: string;
  enabled: boolean;
};

type EquipmentLesson = {
  id: string;
  name: string;
  stage: string;
  purpose: string;
  safety: string;
  operatorTip: string;
  reviewImage: string;
};

type LearningContent = {
  overview: string;
  keyPoints: string[];
  stageFit: string;
};

type Challenge = {
  mode: 0 | 1 | 2;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type LessonNode = EquipmentLesson & {
  unit: number;
  mission: MissionType;
  tag: LessonTag;
  difficulty: number;
  art: string;
};

const FACILITIES: Facility[] = [
  { id: "winery", label: "Winery", subtitle: "Live now", enabled: true },
  { id: "brewery", label: "Brewery", subtitle: "Live now", enabled: true },
  { id: "distillery", label: "Distillery", subtitle: "Live now", enabled: true }
];

const WINERY_ART = [
  "/academy/units/unit-01-crystal-atrium.png",
  "/academy/units/unit-02-varietal-wilds.png",
  "/academy/units/unit-03-region-quest.png",
  "/academy/units/unit-04-cellar-craft.png",
  "/academy/units/unit-05-grand-sommelier-arena.png",
  "/academy/units/unit-06-sparkling-lab.png",
  "/academy/units/unit-07-old-cellar-archive.png",
  "/academy/units/unit-08-pairing-theater.png",
  "/academy/units/unit-09-blind-grid-forge.png",
  "/academy/units/unit-10-mastery-summit.png"
];

const WINERY_EQUIPMENT: EquipmentLesson[] = [
  {
    id: "crusher-destemmer",
    name: "Crusher-Destemmer",
    stage: "Fruit Intake",
    purpose: "Separates grapes from stems and lightly breaks berries before fermentation.",
    safety: "Never reach into the hopper while power is on; lock out before cleaning.",
    operatorTip: "Adjust roller gap to avoid over-crushing skins and seeds.",
    reviewImage: "/academy/equipment/crusher-destemmer-reference-v2.png"
  },
  {
    id: "sorting-table",
    name: "Sorting Table",
    stage: "Fruit Intake",
    purpose: "Lets the cellar team remove leaves, damaged berries, and MOG before processing.",
    safety: "Use cut-resistant gloves and keep fingers clear of moving belts.",
    operatorTip: "Sort by ripeness and berry integrity to improve tank consistency.",
    reviewImage: "/academy/equipment/sorting-table-reference.png"
  },
  {
    id: "fermenter",
    name: "Fermentation Tank",
    stage: "Fermentation",
    purpose: "Controls temperature and holds must while yeast converts sugar to alcohol.",
    safety: "Watch CO2 accumulation in enclosed spaces and ventilate thoroughly.",
    operatorTip: "Track Brix and temperature twice daily to catch stalled fermentations.",
    reviewImage: "/academy/equipment/fermentation-tank-reference.png"
  },
  {
    id: "pump-over-system",
    name: "Pump-Over System",
    stage: "Fermentation",
    purpose: "Circulates fermenting juice over the cap to extract color, flavor, and tannin.",
    safety: "Verify hose clamps and valve positions before pressure starts.",
    operatorTip: "Use shorter, gentler cycles early to avoid over-extraction.",
    reviewImage: "/academy/equipment/pump-over-system-reference.png"
  },
  {
    id: "wine-press",
    name: "Wine Press",
    stage: "Pressing",
    purpose: "Separates free-run and pressed wine from skins and solids after maceration.",
    safety: "Confirm pressure release before opening doors or cages.",
    operatorTip: "Taste press fractions separately and blend with intent, not habit.",
    reviewImage: "/academy/equipment/wine-press-reference.png"
  },
  {
    id: "crossflow-filter",
    name: "Crossflow Filter",
    stage: "Clarification",
    purpose: "Removes suspended solids and microbes using membrane filtration.",
    safety: "Sanitize lines and monitor pressure to prevent membrane rupture.",
    operatorTip: "Pre-rack wine first so membranes stay efficient longer.",
    reviewImage: "/academy/equipment/crossflow-filter-reference-v2.png"
  },
  {
    id: "barrel-rack",
    name: "Barrel Rack",
    stage: "Aging",
    purpose: "Stores and stabilizes barrels during maturation and topping cycles.",
    safety: "Secure racks and use proper barrel handling tools for movement.",
    operatorTip: "Rotate topping schedule by lot so oxygen management stays uniform.",
    reviewImage: "/academy/equipment/barrel-rack-reference.png"
  },
  {
    id: "lab-bench",
    name: "Cellar Lab Bench",
    stage: "Quality Control",
    purpose: "Supports routine measurements like pH, TA, SO2, and dissolved oxygen.",
    safety: "Use PPE and label reagents clearly to avoid chemical mix-ups.",
    operatorTip: "Record every test with tank ID and timestamp for trend tracking.",
    reviewImage: "/academy/equipment/cellar-lab-bench-reference.png"
  },
  {
    id: "bottling-line",
    name: "Bottling Line",
    stage: "Packaging",
    purpose: "Fills, corks or caps, labels, and cases finished wine for release.",
    safety: "Keep guards in place and isolate power before clearing jams.",
    operatorTip: "Run line checks every pallet to catch fill-height drift early.",
    reviewImage: "/academy/equipment/bottling-line-reference.png"
  },
  {
    id: "steam-washer",
    name: "Barrel Steam Washer",
    stage: "Sanitation",
    purpose: "Uses heat and pressure to clean and sanitize barrels between fills.",
    safety: "Treat fittings as high-temperature hazards and vent before disconnecting.",
    operatorTip: "Follow steam cycles with odor checks so taints are not carried forward.",
    reviewImage: "/academy/equipment/barrel-steam-washer-reference.png"
  }
];

const WINERY_LEARNING_CONTENT: Record<string, LearningContent> = {
  "crusher-destemmer": {
    overview: "This is the first mechanical step after harvest. It removes stems and lightly breaks berries before fermentation.",
    keyPoints: [
      "Use it when fruit needs stem removal before tank work.",
      "Keep the crush gentle so skins are opened without crushing seeds.",
      "Watch feed rate closely to prevent jams and uneven fruit handling."
    ],
    stageFit: "It belongs at the front of fruit intake, right after grapes arrive from the vineyard."
  },
  "sorting-table": {
    overview: "This is the last manual quality check before fruit moves deeper into the cellar process.",
    keyPoints: [
      "Remove leaves, damaged berries, and other material other than grapes.",
      "Sort by lot and ripeness so the tank stays consistent.",
      "Keep the pace steady so the team can make clean decisions."
    ],
    stageFit: "It supports intake by keeping poor material out before crush or destemming."
  },
  "fermenter": {
    overview: "This is the main vessel for active fermentation, where temperature and timing shape the final wine.",
    keyPoints: [
      "Track Brix and temperature so you can spot a slowdown early.",
      "Choose vessel management based on grape style and extraction goals.",
      "Use the tank data to guide punch-downs, pump-overs, and timing."
    ],
    stageFit: "It is the core fermentation stage that turns prepared must into wine."
  },
  "pump-over-system": {
    overview: "This tool manages the cap during red fermentation and helps the winemaker control extraction.",
    keyPoints: [
      "Use gentler cycles early so extraction stays balanced.",
      "Match the pump-over plan to the fruit's ripeness and tannin profile.",
      "Check hoses and valves before starting pressure."
    ],
    stageFit: "It belongs during active fermentation when skins are floating and extraction is underway."
  },
  "wine-press": {
    overview: "The press separates the clearest wine from the stronger press fractions after skin contact ends.",
    keyPoints: [
      "Treat free-run and press wine as different quality fractions.",
      "Taste fractions separately before deciding how to blend them.",
      "Stop at the right pressure for quality, not the highest possible yield."
    ],
    stageFit: "It bridges fermentation and clarification after maceration is complete."
  },
  "crossflow-filter": {
    overview: "This is a polishing step that helps prepare wine for stability and bottling.",
    keyPoints: [
      "Pre-rack the wine so the membranes do less heavy lifting.",
      "Monitor pressure and flow to keep filtration efficient.",
      "Sanitize before and after the run to protect quality."
    ],
    stageFit: "It sits in the clarification stage before the wine moves to packaging."
  },
  "barrel-rack": {
    overview: "This is the aging support system that keeps barrels organized and ready for topping and movement.",
    keyPoints: [
      "Group barrels by lot so aging decisions stay traceable.",
      "Keep topping on schedule to manage oxygen exposure.",
      "Use proper handling tools because full barrels are heavy and awkward."
    ],
    stageFit: "It supports maturation between clarification and the final packaging stage."
  },
  "lab-bench": {
    overview: "This is the decision-making station for cellar chemistry and routine quality checks.",
    keyPoints: [
      "Handle samples consistently so results stay comparable.",
      "Track pH, TA, SO2, and dissolved oxygen as standard QC markers.",
      "Log tank ID and timestamp every time so trends are useful later."
    ],
    stageFit: "It supports every stage by confirming stability and guiding cellar decisions."
  },
  "bottling-line": {
    overview: "This is the final production line that turns finished wine into sale-ready product.",
    keyPoints: [
      "Verify fill height, closures, and label placement before each run.",
      "Keep guards in place because the line has moving parts and jam points.",
      "Run checks frequently so drift is caught before whole pallets are affected."
    ],
    stageFit: "It belongs at the end of the workflow when wine is ready to leave the cellar."
  },
  "steam-washer": {
    overview: "This sanitation tool resets barrels between fills so the next aging cycle starts clean.",
    keyPoints: [
      "Treat the fittings as hot and pressurized at all times.",
      "Follow cleaning with an odor check so taints are not carried forward.",
      "Vent pressure before disconnecting any line or fitting."
    ],
    stageFit: "It supports sanitation work between barrel uses and before the next aging cycle."
  }
};

const BREWERY_ART = [
  "/academy/units/unit-01-crystal-atrium.png",
  "/academy/units/unit-02-varietal-wilds.png",
  "/academy/units/unit-03-region-quest.png",
  "/academy/units/unit-04-cellar-craft.png",
  "/academy/units/unit-05-grand-sommelier-arena.png",
  "/academy/units/unit-06-sparkling-lab.png",
  "/academy/units/unit-07-old-cellar-archive.png",
  "/academy/units/unit-08-pairing-theater.png",
  "/academy/units/unit-09-blind-grid-forge.png",
  "/academy/units/unit-10-mastery-summit.png"
];

const DISTILLERY_ART = [
  "/academy/units/unit-01-crystal-atrium.png",
  "/academy/units/unit-02-varietal-wilds.png",
  "/academy/units/unit-03-region-quest.png",
  "/academy/units/unit-04-cellar-craft.png",
  "/academy/units/unit-05-grand-sommelier-arena.png",
  "/academy/units/unit-06-sparkling-lab.png",
  "/academy/units/unit-07-old-cellar-archive.png",
  "/academy/units/unit-08-pairing-theater.png",
  "/academy/units/unit-09-blind-grid-forge.png",
  "/academy/units/unit-10-mastery-summit.png"
];

const BREWERY_EQUIPMENT: EquipmentLesson[] = [
  {
    id: "brewery-grist-mill",
    name: "Grist Mill",
    stage: "Milling",
    purpose: "Crushes malt kernels to the target grist size before mashing.",
    safety: "Lock out before clearing jams and keep hands clear of feed rollers.",
    operatorTip: "Adjust gap to improve extract while protecting husk integrity.",
    reviewImage: "/academy/equipment/brewery-grist-mill-reference.png"
  },
  {
    id: "brewery-mash-tun",
    name: "Mash Tun",
    stage: "Mashing",
    purpose: "Mixes grist and hot liquor so enzymes convert starch into fermentable sugars.",
    safety: "Treat hot liquor and steam as burn hazards during mash-in.",
    operatorTip: "Stabilize strike temperature before grain-in for predictable conversion.",
    reviewImage: "/academy/equipment/brewery-mash-tun-reference.png"
  },
  {
    id: "brewery-lauter-tun",
    name: "Lauter Tun",
    stage: "Lautering",
    purpose: "Separates sweet wort from spent grain through a grain-bed filtration step.",
    safety: "Avoid over-raking and keep clear of moving rake assemblies.",
    operatorTip: "Recirculate until bright, then collect wort at steady flow rates.",
    reviewImage: "/academy/equipment/brewery-lauter-tun-reference.png"
  },
  {
    id: "brewery-brew-kettle",
    name: "Brew Kettle",
    stage: "Boiling",
    purpose: "Boils wort for sterilization, protein coagulation, and hop utilization.",
    safety: "Open ports cautiously to prevent scalding from steam and hot wort.",
    operatorTip: "Track evaporation rate and hop timing to keep bitterness on target.",
    reviewImage: "/academy/equipment/brewery-brew-kettle-reference.png"
  },
  {
    id: "brewery-whirlpool",
    name: "Whirlpool Vessel",
    stage: "Whirlpool",
    purpose: "Creates circular flow so trub and hop solids settle before cooling.",
    safety: "Confirm pump direction and valves before starting vortex circulation.",
    operatorTip: "Allow proper rest time so solids cone tightly at vessel center.",
    reviewImage: "/academy/equipment/brewery-whirlpool-vessel-reference.png"
  },
  {
    id: "brewery-heat-exchanger",
    name: "Plate Heat Exchanger",
    stage: "Wort Cooling",
    purpose: "Rapidly chills hot wort to yeast-pitch temperature.",
    safety: "Sanitize all cold-side paths before transfer to avoid contamination.",
    operatorTip: "Balance flow rates on both sides to hit target outlet temperature.",
    reviewImage: "/academy/equipment/brewery-plate-heat-exchanger-reference.png"
  },
  {
    id: "brewery-fermenter",
    name: "Conical Fermenter",
    stage: "Fermentation",
    purpose: "Ferments wort under controlled temperature and pressure conditions.",
    safety: "Vent CO2 safely and verify PRV function before sealed fermentation.",
    operatorTip: "Use daily gravity and temperature checks to track attenuation.",
    reviewImage: "/academy/equipment/brewery-conical-fermenter-reference.png"
  },
  {
    id: "brewery-bbt",
    name: "Bright Beer Tank",
    stage: "Conditioning",
    purpose: "Conditions and carbonates finished beer before packaging.",
    safety: "Depressurize fully before opening manways or fittings.",
    operatorTip: "Hold stable temperature and pressure for repeatable carbonation.",
    reviewImage: "/academy/equipment/brewery-bright-beer-tank-reference.png"
  },
  {
    id: "brewery-filter",
    name: "Beer Filter",
    stage: "Clarification",
    purpose: "Removes haze-forming solids to improve beer clarity and stability.",
    safety: "Monitor differential pressure to avoid filter media collapse.",
    operatorTip: "Pre-clarify where possible so filter runs remain efficient.",
    reviewImage: "/academy/equipment/brewery-beer-filter-reference.png"
  },
  {
    id: "brewery-canning-line",
    name: "Canning Line",
    stage: "Packaging",
    purpose: "Fills, seams, and packs beer cans for distribution.",
    safety: "Keep guards in place and isolate power before clearing seam faults.",
    operatorTip: "Audit seam checks and DO readings at regular line intervals.",
    reviewImage: "/academy/equipment/brewery-canning-line-reference.png"
  }
];

const DISTILLERY_EQUIPMENT: EquipmentLesson[] = [
  {
    id: "distillery-grain-mill",
    name: "Grain Mill",
    stage: "Milling",
    purpose: "Cracks grains to optimize starch access before mashing.",
    safety: "Use dust control and lock out before servicing rollers.",
    operatorTip: "Tune grind profile by grain bill to improve mash consistency.",
    reviewImage: "/academy/equipment/distillery-grain-mill-reference.png"
  },
  {
    id: "distillery-mash-cooker",
    name: "Mash Cooker",
    stage: "Mashing",
    purpose: "Heats and hydrates grain slurry to drive starch conversion.",
    safety: "Treat hot mash and steam jacket surfaces as burn hazards.",
    operatorTip: "Follow temperature rests carefully for complete conversion.",
    reviewImage: "/academy/equipment/distillery-mash-cooker-reference.png"
  },
  {
    id: "distillery-washback",
    name: "Washback Fermenter",
    stage: "Fermentation",
    purpose: "Ferments mash sugars into low-alcohol wash for distillation.",
    safety: "Monitor CO2 buildup and verify fermentation venting.",
    operatorTip: "Track gravity drop and pH to confirm healthy yeast activity.",
    reviewImage: "/academy/equipment/distillery-washback-reference.png"
  },
  {
    id: "distillery-pot-still",
    name: "Pot Still",
    stage: "Distillation",
    purpose: "Performs batch distillation to concentrate alcohol and flavor compounds.",
    safety: "Never open charged stills before cooldown and pressure release.",
    operatorTip: "Control heat input to stabilize vapor rate and cut quality.",
    reviewImage: "/academy/equipment/distillery-pot-still-reference.png"
  },
  {
    id: "distillery-column-still",
    name: "Column Still",
    stage: "Distillation",
    purpose: "Runs continuous distillation using plates to refine spirit strength.",
    safety: "Validate reflux and pressure controls before startup.",
    operatorTip: "Tune plate loading and reflux for target proof and profile.",
    reviewImage: "/academy/equipment/distillery-column-still-reference.png"
  },
  {
    id: "distillery-condenser",
    name: "Condenser",
    stage: "Condensing",
    purpose: "Cools alcohol vapor back into liquid distillate.",
    safety: "Maintain cooling water flow to prevent vapor breakthrough.",
    operatorTip: "Monitor inlet/outlet temperatures for steady condensation.",
    reviewImage: "/academy/equipment/distillery-condenser-reference.png"
  },
  {
    id: "distillery-spirit-safe",
    name: "Spirit Safe",
    stage: "Cut Control",
    purpose: "Directs and monitors spirit flow for heads, hearts, and tails cuts.",
    safety: "Use grounded equipment and avoid ignition sources near spirit vapor.",
    operatorTip: "Record cut transitions consistently for repeatable style.",
    reviewImage: "/academy/equipment/distillery-spirit-safe-reference.png"
  },
  {
    id: "distillery-blending-tank",
    name: "Blending Tank",
    stage: "Blending",
    purpose: "Combines distillate lots and reduction water before maturation or packaging.",
    safety: "Confirm transfer line identity before blending operations.",
    operatorTip: "Blend in measured increments and bench taste each adjustment.",
    reviewImage: "/academy/equipment/distillery-blending-tank-reference.png"
  },
  {
    id: "distillery-char-filter",
    name: "Charcoal Filter",
    stage: "Filtration",
    purpose: "Polishes spirit through carbon to adjust smoothness and aroma.",
    safety: "Handle carbon media with dust protection and sealed transfer points.",
    operatorTip: "Control contact time to avoid stripping desired character.",
    reviewImage: "/academy/equipment/distillery-charcoal-filter-reference.png"
  },
  {
    id: "distillery-bottling-line",
    name: "Bottling Line",
    stage: "Packaging",
    purpose: "Fills, caps, labels, and cases finished spirits.",
    safety: "Lock out before jam clearing and verify guard interlocks.",
    operatorTip: "Perform fill-volume and closure torque checks every run segment.",
    reviewImage: "/academy/equipment/distillery-bottling-line-reference.png"
  }
];

const BREWERY_LEARNING_CONTENT: Record<string, LearningContent> = {
  "brewery-grist-mill": {
    overview: "The grist mill sets brewhouse efficiency by preparing malt to the right crush profile.",
    keyPoints: [
      "Mill fine enough for extract but coarse enough to protect husk structure.",
      "Check crush consistency across the full production run.",
      "Keep feed rate steady to avoid heat and dust spikes."
    ],
    stageFit: "It starts the brewing workflow before mash conversion begins."
  },
  "brewery-mash-tun": {
    overview: "The mash tun activates enzymes that convert starches into fermentable sugars.",
    keyPoints: [
      "Hit strike temperature before mash-in.",
      "Stir thoroughly to avoid dough balls and dry pockets.",
      "Track pH and temperature during rests for conversion control."
    ],
    stageFit: "It belongs in the core mashing stage just after milling."
  },
  "brewery-lauter-tun": {
    overview: "The lauter tun separates clear wort from spent grain after conversion.",
    keyPoints: [
      "Recirculate until runoff clarity improves.",
      "Maintain even bed flow to prevent channeling.",
      "Coordinate sparge volume with target pre-boil gravity."
    ],
    stageFit: "It follows mashing and prepares wort for the kettle."
  },
  "brewery-brew-kettle": {
    overview: "The brew kettle drives sterilization and hop extraction in the boil.",
    keyPoints: [
      "Maintain a rolling boil for predictable evaporation.",
      "Time hop additions against bitterness and aroma goals.",
      "Confirm final volume and gravity before knockout."
    ],
    stageFit: "It anchors the boiling stage before whirlpool and cooling."
  },
  "brewery-whirlpool": {
    overview: "The whirlpool removes trub and hop solids before wort cooling.",
    keyPoints: [
      "Create a stable vortex without introducing excess oxygen.",
      "Allow cone settling time before draw-off.",
      "Keep transfer pickup away from sediment center."
    ],
    stageFit: "It bridges kettle boil and heat-exchanger cooling."
  },
  "brewery-heat-exchanger": {
    overview: "The heat exchanger quickly chills wort to safe yeast-pitch temperatures.",
    keyPoints: [
      "Sanitize cold-side paths before transfer.",
      "Balance coolant and wort flow to hold target temperature.",
      "Verify outlet temperature before entering fermenter."
    ],
    stageFit: "It sits between hot-side process and fermentation."
  },
  "brewery-fermenter": {
    overview: "Conical fermentation converts sugars to alcohol while developing flavor profile.",
    keyPoints: [
      "Pitch healthy yeast at the right rate and temperature.",
      "Track gravity and temperature each day.",
      "Use controlled pressure and venting to maintain safety."
    ],
    stageFit: "It is the primary fermentation stage of beer production."
  },
  "brewery-bbt": {
    overview: "The bright beer tank conditions, clarifies, and carbonates beer before packaging.",
    keyPoints: [
      "Stabilize temperature before carbonation.",
      "Set pressure based on target CO2 volumes.",
      "Avoid oxygen pickup during all transfers."
    ],
    stageFit: "It follows fermentation and precedes final packaging."
  },
  "brewery-filter": {
    overview: "Filtration polishes beer appearance and supports shelf stability.",
    keyPoints: [
      "Monitor pressure drop to protect filter integrity.",
      "Feed clarified beer to extend run length.",
      "Sanitize filter housings before and after operation."
    ],
    stageFit: "It supports clarification before bright tank or packaging."
  },
  "brewery-canning-line": {
    overview: "The canning line is the final packaging step where beer is sealed for distribution.",
    keyPoints: [
      "Verify seam quality and fill heights at intervals.",
      "Track dissolved oxygen to protect freshness.",
      "Respond quickly to jams to minimize product loss."
    ],
    stageFit: "It closes the brewery process at final packaging."
  }
};

const DISTILLERY_LEARNING_CONTENT: Record<string, LearningContent> = {
  "distillery-grain-mill": {
    overview: "The grain mill prepares raw grain for consistent hydration and conversion.",
    keyPoints: [
      "Use the right crush for your mash process and grain bill.",
      "Control dust and maintain even feed.",
      "Inspect particle distribution to prevent conversion loss."
    ],
    stageFit: "It starts the distilling workflow before mash cooking."
  },
  "distillery-mash-cooker": {
    overview: "The mash cooker gelatinizes starch and enables enzymatic conversion.",
    keyPoints: [
      "Follow staged heating for complete conversion.",
      "Maintain agitation for uniform temperature.",
      "Track pH and rest timing for repeatable sugar extraction."
    ],
    stageFit: "It drives the mashing stage ahead of wash fermentation."
  },
  "distillery-washback": {
    overview: "The washback ferments mash into low-wine suitable for distillation.",
    keyPoints: [
      "Pitch yeast at healthy temperature windows.",
      "Watch gravity and fermentation vigor daily.",
      "Vent CO2 safely in confined production spaces."
    ],
    stageFit: "It is the fermentation phase before still charging."
  },
  "distillery-pot-still": {
    overview: "The pot still concentrates wash into spirit through batch distillation.",
    keyPoints: [
      "Control heat ramp to stabilize vapor behavior.",
      "Monitor output proof through run progression.",
      "Use cut points to separate heads, hearts, and tails."
    ],
    stageFit: "It is a core distillation step for batch spirits."
  },
  "distillery-column-still": {
    overview: "The column still enables continuous separation and higher proof output.",
    keyPoints: [
      "Balance feed, steam, and reflux rates.",
      "Track plate performance for stable rectification.",
      "Tune operation to target proof and flavor profile."
    ],
    stageFit: "It supports continuous distillation and refinement."
  },
  "distillery-condenser": {
    overview: "The condenser converts spirit vapor into liquid distillate.",
    keyPoints: [
      "Maintain coolant flow and outlet temperature.",
      "Inspect for leaks and vapor escape risks.",
      "Confirm distillate flow remains stable throughout the run."
    ],
    stageFit: "It follows vapor generation in the still and enables collection."
  },
  "distillery-spirit-safe": {
    overview: "The spirit safe allows controlled observation and routing of distillate cuts.",
    keyPoints: [
      "Track sensory and proof data at cut transitions.",
      "Use repeatable cut logs for house consistency.",
      "Ensure grounding and ignition-safe operation."
    ],
    stageFit: "It manages cut control during active distillation."
  },
  "distillery-blending-tank": {
    overview: "The blending tank combines lots and proofs spirit to specification.",
    keyPoints: [
      "Blend incrementally and verify after each addition.",
      "Use calibrated proof measurements during reduction.",
      "Document lot composition for traceability."
    ],
    stageFit: "It supports post-distillation standardization."
  },
  "distillery-char-filter": {
    overview: "Charcoal filtration refines spirit texture and aroma presentation.",
    keyPoints: [
      "Prepare filter media and lines before loading spirit.",
      "Control flow for consistent contact time.",
      "Validate flavor impact so character remains balanced."
    ],
    stageFit: "It sits in post-blend polishing before packaging."
  },
  "distillery-bottling-line": {
    overview: "The bottling line packages finished spirit for market release.",
    keyPoints: [
      "Verify fill accuracy and closure torque frequently.",
      "Check label alignment and coding each run segment.",
      "Use lockout protocols before servicing jam points."
    ],
    stageFit: "It completes the distillery process at final packaging."
  }
};

const MISSION_ROTATION: MissionType[] = ["Scout", "Challenge", "Scout", "Challenge", "Boss"];
const TAG_ROTATION: LessonTag[] = ["Foundations", "Aromas", "Structure", "Service"];
const FACILITY_EQUIPMENT: Record<FacilityId, EquipmentLesson[]> = {
  winery: WINERY_EQUIPMENT,
  brewery: BREWERY_EQUIPMENT,
  distillery: DISTILLERY_EQUIPMENT
};
const FACILITY_LEARNING_CONTENT: Record<FacilityId, Record<string, LearningContent>> = {
  winery: WINERY_LEARNING_CONTENT,
  brewery: BREWERY_LEARNING_CONTENT,
  distillery: DISTILLERY_LEARNING_CONTENT
};
const FACILITY_ART: Record<FacilityId, string[]> = {
  winery: WINERY_ART,
  brewery: BREWERY_ART,
  distillery: DISTILLERY_ART
};
const STAGE_DISTRACTORS = Array.from(
  new Set(Object.values(FACILITY_EQUIPMENT).flatMap((lessons) => lessons.map((lesson) => lesson.stage)))
);
const QUESTION_SEQUENCE: Array<0 | 1 | 2> = [0, 1, 2];
export const EQUIPMENT_MASTERY_STORAGE_KEY = "sip-studies:academy:equipment-mastery:v1";
export const EQUIPMENT_MASTERY_EVENT = "sip-studies:equipment-mastery-updated";
export const EQUIPMENT_MASTERY_TOTAL_NODES = Object.values(FACILITY_EQUIPMENT).reduce(
  (total, lessons) => total + lessons.length,
  0
);

export type EquipmentMasterySnapshot = {
  mastery: Record<string, number>;
  completedCount: number;
  masteryPoints: number;
  totalNodes: number;
};

function shuffle<T>(values: readonly T[]): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function takeUnique(source: string[], exclude: string, count: number): string[] {
  return shuffle(source.filter((value) => value !== exclude)).slice(0, count);
}

function buildChallenge(target: EquipmentLesson, allLessons: EquipmentLesson[], mode: 0 | 1 | 2): Challenge {
  if (mode === 0) {
    const wrong = takeUnique(
      allLessons.map((lesson) => lesson.name),
      target.name,
      3
    );
    const correctAnswer = target.name;
    return {
      mode,
      prompt: `Which equipment matches this purpose: ${target.purpose}`,
      options: shuffle([correctAnswer, ...wrong]),
      correctAnswer,
      explanation: `${target.name} is the primary match for that cellar objective.`
    };
  }
  if (mode === 1) {
    const wrong = takeUnique(
      allLessons.map((lesson) => lesson.safety),
      target.safety,
      3
    );
    const correctAnswer = target.safety;
    return {
      mode,
      prompt: `What is the key safety callout when operating ${target.name}?`,
      options: shuffle([correctAnswer, ...wrong]),
      correctAnswer,
      explanation: `Safety on ${target.name} should center on: ${target.safety}`
    };
  }
  const wrong = takeUnique(STAGE_DISTRACTORS, target.stage, 3);
  const correctAnswer = target.stage;
  return {
    mode,
    prompt: `In which production stage is ${target.name} most commonly used?`,
    options: shuffle([correctAnswer, ...wrong]),
    correctAnswer,
    explanation: `${target.name} is grouped under ${target.stage}.`
  };
}

function buildFacilityNodes(facilityId: FacilityId): LessonNode[] {
  const lessons = FACILITY_EQUIPMENT[facilityId];
  const art = FACILITY_ART[facilityId];
  return lessons.map((lesson, index) => ({
    ...lesson,
    unit: index + 1,
    mission: MISSION_ROTATION[index % MISSION_ROTATION.length],
    tag: TAG_ROTATION[index % TAG_ROTATION.length],
    difficulty: Math.min(5, 1 + Math.floor(index / 2)),
    art: art[index % art.length]
  }));
}

function getLearningContent(lesson: EquipmentLesson, facilityId: FacilityId): LearningContent {
  const learningContent = FACILITY_LEARNING_CONTENT[facilityId];
  return (
    learningContent[lesson.id] ?? {
      overview: lesson.purpose,
      keyPoints: [lesson.purpose, lesson.safety, lesson.operatorTip],
      stageFit: `This lesson supports the ${lesson.stage} stage.`
    }
  );
}

export function readEquipmentMasterySnapshot(): EquipmentMasterySnapshot {
  let mastery: Record<string, number> = {};
  if (typeof window === "undefined") {
    return { mastery, completedCount: 0, masteryPoints: 0, totalNodes: EQUIPMENT_MASTERY_TOTAL_NODES };
  }
  try {
    const raw = window.localStorage.getItem(EQUIPMENT_MASTERY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object") {
        const incoming = (parsed as { mastery?: unknown }).mastery;
        if (incoming && typeof incoming === "object") {
          mastery = Object.entries(incoming as Record<string, unknown>).reduce<Record<string, number>>((acc, [key, value]) => {
            const numeric = Number(value);
            if (Number.isFinite(numeric) && numeric > 0) acc[key] = numeric;
            return acc;
          }, {});
        }
      }
    }
  } catch {
    mastery = {};
  }
  const completedCount = Object.values(mastery).filter((value) => value > 0).length;
  const masteryPoints = Object.values(mastery).reduce((sum, value) => sum + value, 0);
  return { mastery, completedCount, masteryPoints, totalNodes: EQUIPMENT_MASTERY_TOTAL_NODES };
}

export function SipStudiosEquipmentMastery() {
  const [facilityId, setFacilityId] = useState<FacilityId>("winery");
  const [mastery, setMastery] = useState<Record<string, number>>(() => readEquipmentMasterySnapshot().mastery);
  const facilityNodes = useMemo(
    () => ({
      winery: buildFacilityNodes("winery"),
      brewery: buildFacilityNodes("brewery"),
      distillery: buildFacilityNodes("distillery")
    }),
    []
  );
  const nodes = facilityNodes[facilityId];
  const [activeNodeId, setActiveNodeId] = useState(nodes[0]?.id ?? "");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(() =>
    nodes[0] ? buildChallenge(nodes[0], nodes, QUESTION_SEQUENCE[0]) : null
  );
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [lessonAcknowledged, setLessonAcknowledged] = useState(false);
  const [questionStep, setQuestionStep] = useState(0);
  const [correctAnswersInSeries, setCorrectAnswersInSeries] = useState(0);

  const selectedFacility = FACILITIES.find((item) => item.id === facilityId) ?? FACILITIES[0];
  const completedCount = nodes.reduce((count, node) => count + (mastery[node.id] ? 1 : 0), 0);
  const progressPercent = nodes.length ? Math.round((completedCount / nodes.length) * 100) : 0;
  const activeIndex = nodes.findIndex((node) => node.id === activeNodeId);
  const activeNode = activeIndex >= 0 ? nodes[activeIndex] : null;
  const learningContent = activeNode ? getLearningContent(activeNode, facilityId) : null;
  const allComplete = completedCount === nodes.length;
  const totalQuestions = QUESTION_SEQUENCE.length;
  const seriesComplete = questionStep >= totalQuestions;
  const seriesPassed = seriesComplete && correctAnswersInSeries === totalQuestions;

  useEffect(() => {
    window.localStorage.setItem(EQUIPMENT_MASTERY_STORAGE_KEY, JSON.stringify({ mastery }));
    window.dispatchEvent(new CustomEvent(EQUIPMENT_MASTERY_EVENT));
  }, [mastery]);

  useEffect(() => {
    if (!nodes.length) return;
    const currentNode = nodes.find((node) => node.id === activeNodeId);
    if (currentNode) return;
    const firstUnlocked = nodes.find((_, index) => index === 0 || Boolean(mastery[nodes[index - 1].id])) ?? nodes[0];
    setActiveNodeId(firstUnlocked.id);
    setLessonAcknowledged(false);
    setSelectedAnswer(null);
    setFeedback(null);
    setQuestionStep(0);
    setCorrectAnswersInSeries(0);
    setChallenge(buildChallenge(firstUnlocked, nodes, QUESTION_SEQUENCE[0]));
  }, [activeNodeId, mastery, nodes]);

  const isUnlocked = (index: number) => {
    if (index <= 0) return true;
    return Boolean(mastery[nodes[index - 1].id]);
  };

  const openNode = (nodeId: string) => {
    const nextIndex = nodes.findIndex((node) => node.id === nodeId);
    if (nextIndex < 0 || !isUnlocked(nextIndex)) return;
    const nextNode = nodes[nextIndex];
    setActiveNodeId(nextNode.id);
    setLessonAcknowledged(false);
    setSelectedAnswer(null);
    setFeedback(null);
    setQuestionStep(0);
    setCorrectAnswersInSeries(0);
    setChallenge(buildChallenge(nextNode, nodes, QUESTION_SEQUENCE[0]));
  };

  const selectAnswer = (answer: string) => {
    if (!lessonAcknowledged || !challenge || feedback) return;
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    if (!lessonAcknowledged || !challenge || !activeNode || !selectedAnswer || feedback) return;
    const correct = selectedAnswer === challenge.correctAnswer;
    const nextQuestionStep = questionStep + 1;
    const nextCorrectCount = correctAnswersInSeries + (correct ? 1 : 0);
    setQuestionStep(nextQuestionStep);
    setCorrectAnswersInSeries(nextCorrectCount);
    if (nextQuestionStep === totalQuestions && nextCorrectCount === totalQuestions) {
      setMastery((current) => ({ ...current, [activeNode.id]: Math.max(1, current[activeNode.id] ?? 0) }));
    }
    setFeedback({
      correct,
      text: correct ? `Correct. ${challenge.explanation}` : `Not quite. ${challenge.explanation}`
    });
  };

  const refreshChallenge = () => {
    if (!activeNode || !lessonAcknowledged) return;
    if (!feedback) return;
    if (seriesComplete) {
      if (seriesPassed) return;
      setQuestionStep(0);
      setCorrectAnswersInSeries(0);
      setSelectedAnswer(null);
      setFeedback(null);
      setChallenge(buildChallenge(activeNode, nodes, QUESTION_SEQUENCE[0]));
      return;
    }
    const nextMode = QUESTION_SEQUENCE[questionStep];
    if (nextMode === undefined) return;
    setSelectedAnswer(null);
    setFeedback(null);
    setChallenge(buildChallenge(activeNode, nodes, nextMode));
  };

  const acknowledgeLesson = () => {
    setLessonAcknowledged(true);
    setQuestionStep(0);
    setCorrectAnswersInSeries(0);
    setSelectedAnswer(null);
    setFeedback(null);
    if (activeNode) {
      setChallenge(buildChallenge(activeNode, nodes, QUESTION_SEQUENCE[0]));
    }
  };

  const goToNextNode = () => {
    if (!activeNode) return;
    const next = nodes.find((node, index) => index > activeIndex && isUnlocked(index) && !mastery[node.id]);
    if (next) {
      openNode(next.id);
      return;
    }
    if (activeIndex + 1 < nodes.length && isUnlocked(activeIndex + 1)) {
      openNode(nodes[activeIndex + 1].id);
      return;
    }
    if (nodes.length > 0) {
      openNode(nodes[0].id);
    }
  };

  const challengeActionLabel = !feedback
    ? "Submit"
    : seriesComplete
      ? seriesPassed
        ? "Series Complete"
        : "Retry Series"
      : "Next Question";
  const challengeActionDisabled = !feedback ? !selectedAnswer : seriesPassed;

  return (
    <section className="academy-game sip-studios-game-v2" aria-label="Sip Studios educational game">
      <header className="academy-game-header">
        <p className="academy-kicker">Sip Academy Equipment Mastery</p>
        <h2>Equipment Mastery Path</h2>
        <p>
          Duolingo-style progression is now live for equipment training. Complete each node to unlock the next lesson and keep
          your team training structured.
        </p>
        <div className="sip-studios-facility-tabs" role="tablist" aria-label="Facility tracks">
          {FACILITIES.map((facility) => (
            <button
              key={facility.id}
              type="button"
              role="tab"
              aria-selected={facilityId === facility.id}
              aria-label={`${facility.label} track`}
              className={`sip-studios-facility-tab ${facilityId === facility.id ? "active" : ""}`}
              disabled={!facility.enabled}
              onClick={() => setFacilityId(facility.id)}
            >
              <strong>{facility.label}</strong>
              <small>{facility.subtitle}</small>
            </button>
          ))}
        </div>
      </header>

      <div className="academy-game-layout">
        <aside className="academy-path">
          <h3>{selectedFacility.label} Path</h3>
          <p>
            {selectedFacility.enabled
              ? "Follow the sequence to learn equipment role, safety, and operating choices."
              : `${selectedFacility.label} content is scaffolded and currently locked for the next release.`}
          </p>
          <div className="academy-realm-meter" aria-hidden="true">
            <div
              className="academy-realm-meter-value"
              style={{ width: `${selectedFacility.enabled ? progressPercent : 0}%` }}
            />
          </div>
          <div className="academy-quest-log">
            <p className="academy-quest-kicker">Current Sprint</p>
            <strong>{selectedFacility.label} equipment module in active rollout.</strong>
            <small>{`Lessons mastered: ${completedCount}/${nodes.length} (${progressPercent}%)`}</small>
          </div>

          {selectedFacility.enabled ? (
            <div className="academy-path-list" role="list">
              {nodes.map((node, index) => {
                const unlocked = isUnlocked(index);
                const solved = Boolean(mastery[node.id]);
                const active = node.id === activeNodeId;
                const difficultyText = "★".repeat(node.difficulty);
                return (
                  <button
                    key={node.id}
                    type="button"
                    role="listitem"
                    className={`academy-node ${unlocked ? "unlocked" : "locked"} ${active ? "active" : ""}`}
                    onClick={() => openNode(node.id)}
                    disabled={!unlocked}
                    aria-label={`${node.name} ${unlocked ? "unlocked" : "locked"}`}
                  >
                    <div className="academy-node-top">
                      <span className={`academy-mission academy-mission-${node.mission.toLowerCase()}`}>{node.mission}</span>
                      <span className={`academy-tag academy-tag-${node.tag.toLowerCase()}`}>{node.tag}</span>
                    </div>
                    <span className="academy-node-unit">Unit {node.unit}</span>
                    <strong>{node.name}</strong>
                    <small>{node.purpose}</small>
                    <div className="academy-node-art">
                      <img src={node.art} alt="" loading="lazy" />
                      <small>{node.stage}</small>
                    </div>
                    <div className="academy-node-foot">
                      <span className="academy-node-difficulty">Difficulty: {difficultyText}</span>
                      {unlocked ? <span className="academy-session-chip">{solved ? "Mastered" : "Ready"}</span> : <span className="academy-locked-label">Locked</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}
        </aside>

        {selectedFacility.enabled && activeNode && challenge ? (
          <article className={`academy-session ${feedback?.correct ? "academy-state-correct" : ""} ${feedback && !feedback.correct ? "academy-state-wrong" : ""}`}>
            <p className="academy-round-kicker">Interactive Lesson</p>
            <div className="academy-session-head">
              <h3>{activeNode.name}</h3>
              <p>{activeNode.purpose}</p>
            </div>
            <div className="academy-session-metrics">
              <span className="academy-session-chip">Stage: {activeNode.stage}</span>
              <span className="academy-session-chip">Safety: required</span>
              <span className="academy-session-chip">{mastery[activeNode.id] ? "Completed" : "In progress"}</span>
              <span className="academy-session-chip">{lessonAcknowledged ? "Quiz unlocked" : "Lesson review required"}</span>
            </div>

            <div className="sip-studios-equipment-details academy-pre-quiz sip-studios-pre-quiz-panel">
              <p className="academy-pre-quiz-kicker">Teach First</p>
              <h4 className="academy-pre-quiz-title">Unit {activeNode.unit}: {activeNode.name}</h4>
              <figure className="academy-equipment-reference">
                <img src={activeNode.reviewImage} alt={`${activeNode.name} being used during ${activeNode.stage}`} loading="lazy" />
              </figure>
              <p>
                <strong>Overview:</strong> {learningContent?.overview ?? activeNode.purpose}
              </p>
              <div>
                <strong>Key Points:</strong>
                <ul>
                  {(learningContent?.keyPoints ?? []).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <p>
                <strong>Safety:</strong> {activeNode.safety}
              </p>
              <p>
                <strong>Coach Tip:</strong> {activeNode.operatorTip}
              </p>
              <p>
                <strong>Stage Fit:</strong> {learningContent?.stageFit ?? `This lesson supports the ${activeNode.stage} stage.`}
              </p>
            </div>

            {!lessonAcknowledged ? (
              <div className="academy-lesson-gate">
                <p>Read the lesson above, then acknowledge it to unlock the quiz.</p>
                <ul>
                  <li>I reviewed the process and stage fit.</li>
                  <li>I reviewed the safety callouts.</li>
                </ul>
                <button type="button" className="btn btn-primary" onClick={acknowledgeLesson}>
                  I reviewed this lesson, continue to quiz
                </button>
              </div>
            ) : (
              <>
                <div className="academy-exercise-card">
                  <h4>{challenge.prompt}</h4>
                  <div className="academy-choice-grid">
                    {challenge.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`academy-choice ${selectedAnswer === option ? "selected" : ""}`}
                        disabled={Boolean(feedback)}
                        onClick={() => selectAnswer(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {feedback ? (
                  <div className={`academy-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                    <strong>{feedback.correct ? "Correct answer" : "Try another prompt"}</strong>
                    <p>{feedback.text}</p>
                  </div>
                ) : null}

                <div className="academy-actions">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={!feedback ? submitAnswer : refreshChallenge}
                    disabled={challengeActionDisabled}
                  >
                    {challengeActionLabel}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!seriesPassed}
                    onClick={goToNextNode}
                  >
                    {allComplete && activeIndex === nodes.length - 1 ? "Restart Path" : "Next Equipment"}
                  </button>
                </div>
              </>
            )}
          </article>
        ) : (
          <article className="academy-idle">
            <h3>{selectedFacility.label} Track Locked</h3>
            <p>This track is staged and ready for content ingestion, mission writing, and final art mapping.</p>
          </article>
        )}
      </div>
    </section>
  );
}
