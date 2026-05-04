export type CommodityId = "grains" | "hops" | "coffee" | "tea" | "fruit";

export type CommodityStudyProfile = {
  id: string;
  commodity: CommodityId;
  name: string;
  family: string;
  headline: string;
  origin: string;
  structureLine: string;
  tastingNotes: string[];
  benchmarkStyles: string[];
  imageUrl?: string;
  imageCaption?: string;
  turntableFrameUrls?: string[];
  turntableFrameCount?: number;
  beginner: string[];
  advanced: string[];
  pro: string[];
  examKeys: string[];
  references: string[];
  beverageFocus?: {
    title: string;
    points: string[];
  }[];
};

type CommodityExpansionSeed = {
  id: string;
  commodity: CommodityId;
  name: string;
  family: string;
  beverage: string;
  origin: string;
  role: string;
  notes: string[];
  styles: string[];
  technical: string[];
};

function buildExpansionStudy(seed: CommodityExpansionSeed): CommodityStudyProfile {
  const focusTitle =
    seed.commodity === "grains"
      ? "Beer and Spirits Focus"
      : seed.commodity === "fruit"
        ? "Juice, Wine, and Spirits Focus"
        : seed.commodity === "hops"
          ? "Beer Focus"
          : seed.commodity === "coffee"
            ? "Roast and Brew Focus"
            : "Infusion Focus";

  return {
    id: seed.id,
    commodity: seed.commodity,
    name: seed.name,
    family: seed.family,
    headline: `${seed.name} is a ${seed.family.toLowerCase()} with important use across ${seed.beverage}.`,
    origin: seed.origin,
    structureLine: seed.role,
    tastingNotes: seed.notes,
    benchmarkStyles: seed.styles,
    imageUrl: `/commodities/${seed.commodity}/${seed.id}.png`,
    imageCaption: `Photo reference for identifying ${seed.name} as a beverage ingredient: ${seed.notes.slice(0, 3).join(", ")}.`,
    beginner: [
      `${seed.name} gives students a clear anchor for recognizing ${seed.notes.slice(0, 3).join(", ")} in beverage study.`,
      `Start by learning where it appears most often: ${seed.styles.slice(0, 3).join(", ")}.`
    ],
    advanced: [
      `At production level, ${seed.name} matters because ${seed.role.toLowerCase()}`,
      `Quality depends on matching raw material, processing choices, and final beverage target rather than treating the ingredient as interchangeable.`
    ],
    pro: [
      `For exam and service command, connect ${seed.name} to both sensory outcome and production logic.`,
      `A strong answer names the ingredient, explains its beverage role, and separates raw-material character from fermentation, extraction, roasting, aging, or infusion effects.`
    ],
    examKeys: [
      `Recognize ${seed.name} by ${seed.notes.slice(0, 4).join(", ")}.`,
      `Know its common beverage homes: ${seed.styles.slice(0, 4).join(", ")}.`,
      `Tie the ingredient to production vocabulary, not only flavor description.`
    ],
    references: seed.technical,
    beverageFocus: [
      {
        title: focusTitle,
        points: [
          `Most relevant in: ${seed.beverage}.`,
          `Primary study role: ${seed.role}`
        ]
      }
    ]
  };
}

const studies: CommodityStudyProfile[] = [
  {
    id: "barley",
    commodity: "grains",
    name: "Barley",
    family: "Brewing and distilling grain",
    headline: "The anchor grain for malt-driven beer and many of the world's major whiskies.",
    origin: "Ancient Fertile Crescent; now global in cool to temperate grain belts.",
    structureLine: "High enzymatic potential when malted, nutty-to-bready flavor, strong conversion utility.",
    tastingNotes: ["toast", "biscuit", "nutty", "grain husk", "malt sweetness"],
    benchmarkStyles: ["Pale Ale", "Pilsner", "Stout", "Scotch Whisky", "Bourbon (mash blend)"],
    beginner: [
      "Barley matters because it can be malted to create enzymes that convert starch to fermentable sugar. That makes it the central technical grain in beer production.",
      "For sensory recognition, barley-driven bases read bready, biscuity, or lightly nutty depending on kilning and roast level."
    ],
    advanced: [
      "In brewing, barley husk and protein balance support lautering and foam stability. Malt specification choices shape fermentability, color, and body.",
      "In distilling, malted barley can be a flavor grain or an enzyme engine inside mixed mashes. Fermentation parameters and still regime then determine how much cereal character carries through."
    ],
    pro: [
      "For exams, separate barley's conversion role from flavor role. In beer, it is usually both. In spirits, it may be primary (single malt) or supportive (high-corn bourbon mash).",
      "In blind theory prompts, connect barley to process language: malt modification, diastatic power, mash efficiency, attenuation, and cereal-derived congeners."
    ],
    examKeys: [
      "Know why barley is preferred for malting and conversion.",
      "Tie malt kilning/roast to beer color and flavor outcomes.",
      "Differentiate malt-forward whisky profiles from neutral grain spirit profiles."
    ],
    references: ["Diastatic power", "Mash conversion", "Lautering", "Malt modification"],
    beverageFocus: [
      {
        title: "Beer Focus",
        points: [
          "Primary base malt source in most classic beer families.",
          "Controls body, fermentability, and foam behavior."
        ]
      },
      {
        title: "Spirits Focus",
        points: [
          "Foundational in malt whisky and common in blended grain bills.",
          "Influences new-make texture before cask maturation."
        ]
      }
    ]
  },
  {
    id: "wheat",
    commodity: "grains",
    name: "Wheat",
    family: "Protein-forward brewing/distilling grain",
    headline: "A softness and texture grain that drives haze, head retention, and silky cereal lift.",
    origin: "Near East domestication with deep European brewing integration.",
    structureLine: "Higher protein than barley, gentle grain sweetness, creamy mouthfeel.",
    tastingNotes: ["dough", "cream", "cereal", "soft bread", "light honey"],
    benchmarkStyles: ["Hefeweizen", "Witbier", "American Wheat Ale", "Wheated Bourbon"],
    beginner: [
      "Wheat is commonly used to add texture and foam stability rather than heavy malt intensity.",
      "In tasting, wheat-driven beverages often feel softer and more rounded on the palate."
    ],
    advanced: [
      "Wheat's protein load can improve head retention but complicate filtration and lautering if process control is weak.",
      "In spirits, wheated mash bills often reduce perceived spice and produce a softer mid-palate."
    ],
    pro: [
      "Position wheat as a texture and fermentation-behavior variable, not just a flavor variable.",
      "In exam logic, connect wheat to style identity: clove-banana fermentation expression in weissbier vs softer sweetness in wheated whiskey."
    ],
    examKeys: [
      "Recognize wheat's role in mouthfeel and foam.",
      "Separate grain character from yeast-derived aroma in wheat beers.",
      "Explain why wheated bourbon tends to read softer than rye-forward bourbon."
    ],
    references: ["Protein matrix", "Beta-glucans", "Haze stability", "Mash viscosity"],
    beverageFocus: [
      {
        title: "Beer Focus",
        points: [
          "Critical in wheat beer families and haze-positive modern styles.",
          "Boosts head retention and palate softness."
        ]
      },
      {
        title: "Spirits Focus",
        points: [
          "Secondary mash grain in several bourbon styles.",
          "Typically softens spice and sharpness."
        ]
      }
    ]
  },
  {
    id: "rye",
    commodity: "grains",
    name: "Rye",
    family: "Spice-driven cereal grain",
    headline: "A high-impact grain known for peppery structure and dry, assertive personality.",
    origin: "Eastern Europe and northern climates; widely used in North American spirits.",
    structureLine: "Spicy aromatic lift, dry cereal grip, high personality in blends.",
    tastingNotes: ["pepper", "caraway", "dry toast", "earthy spice", "herbal edge"],
    benchmarkStyles: ["Rye IPA", "Roggenbier", "Rye Whiskey", "High-rye Bourbon"],
    beginner: [
      "Rye is remembered for spice. Even moderate inclusion can push peppery, dry, and herbal notes.",
      "Compared with wheat or corn, rye usually tastes firmer and less sweet."
    ],
    advanced: [
      "Rye mash can be physically challenging because gummy mash behavior requires good process control.",
      "In distillation, rye-heavy mashes support high-toned aromatic spice and a drier finish profile."
    ],
    pro: [
      "Use rye as a structural signal in blind logic: elevated spice, drier line, sharper finish.",
      "Explain tradeoffs between flavor intensity and process complexity when rye percentage rises."
    ],
    examKeys: [
      "Identify rye's spice signature across beer and whiskey.",
      "Know process challenges from mash viscosity and handling.",
      "Contrast rye-driven dryness against corn-driven sweetness."
    ],
    references: ["Mash handling", "High-rye grain bills", "Peppery congeners", "Fermentation stress"]
  },
  {
    id: "corn",
    commodity: "grains",
    name: "Corn",
    family: "High-starch sweet grain",
    headline: "A high-yield grain that contributes sweetness, body, and approachable alcohol architecture.",
    origin: "Mesoamerican domestication; dominant in many American distilling systems.",
    structureLine: "High starch, low husk influence, sweet grain impression when converted and fermented.",
    tastingNotes: ["sweet corn", "vanilla-like sweetness", "cereal cream", "light oiliness"],
    benchmarkStyles: ["American Light Lager", "Bourbon", "Corn Whiskey"],
    beginner: [
      "Corn usually presents sweeter and rounder than rye or barley in both beer adjunct use and spirit mash bills.",
      "In bourbon theory, corn percentage is a legal and stylistic anchor."
    ],
    advanced: [
      "Corn brings yield and body but needs enzyme support from malted grains when unmalted.",
      "In distillation, corn-heavy mash often gives a broad, sweet new-make base that integrates well with oak."
    ],
    pro: [
      "For exam answers, connect corn to legal identity (bourbon mash minimum) and sensory consequence (sweet core, broader palate).",
      "Distinguish corn sweetness from oak-derived sweetness during mature spirit analysis."
    ],
    examKeys: [
      "Know core legal frameworks where corn is required.",
      "Explain enzyme dependency in unmalted corn mashes.",
      "Separate cereal sweetness from barrel char and lactone notes."
    ],
    references: ["Adjunct conversion", "Bourbon law", "Mash cook regimes", "Yield economics"]
  },
  {
    id: "rice",
    commodity: "grains",
    name: "Rice",
    family: "Neutral fermentable grain",
    headline: "A precision grain used for clean fermentation profiles and light body outcomes.",
    origin: "East and Southeast Asia, central in sake and global light-lager production.",
    structureLine: "Clean starch source, low flavor weight, promotes crisp and dry results.",
    tastingNotes: ["clean cereal", "subtle sweetness", "light texture", "neutral finish"],
    benchmarkStyles: ["Japanese Lager", "American Lager", "Sake"],
    beginner: [
      "Rice is often used when the goal is cleanliness and drinkability rather than deep malt flavor.",
      "In sake, polished rice quality directly affects aroma purity and texture."
    ],
    advanced: [
      "In beer, rice adjunct use can lower color, body, and flavor density while supporting high throughput consistency.",
      "In sake, polishing ratio, koji conversion, and fermentation temperature define aromatic precision and umami balance."
    ],
    pro: [
      "Use rice in theory as a process-sensitive substrate where conversion pathway defines style outcome.",
      "Differentiate rice as adjunct in beer versus primary substrate in sake-driven fermentation ecosystems."
    ],
    examKeys: [
      "Know why rice supports crisp style architecture.",
      "Connect sake polishing levels to quality positioning.",
      "Explain neutral substrate advantages in beverage design."
    ],
    references: ["Koji", "Polishing ratio", "Adjunct brewing", "Low-flavor fermentables"]
  },
  {
    id: "cascade",
    commodity: "hops",
    name: "Cascade",
    family: "American citrus hop",
    headline: "A foundational modern craft hop balancing grapefruit brightness and accessible bitterness.",
    origin: "United States Pacific Northwest breeding programs.",
    structureLine: "Moderate alpha with vivid citrus-floral lift; versatile across kettle and dry-hop programs.",
    tastingNotes: ["grapefruit", "orange peel", "floral", "light pine"],
    benchmarkStyles: ["American Pale Ale", "West Coast IPA", "Amber Ale"],
    beginner: [
      "Cascade is often a first-reference hop for recognizing citrus-forward American craft profiles.",
      "It can deliver both clean bitterness and aromatic lift depending on addition timing."
    ],
    advanced: [
      "Late additions emphasize aroma while earlier additions shape firmer bitter structure.",
      "Water profile and yeast attenuation strongly affect whether Cascade reads crisp-citrus or broader citrus-floral."
    ],
    pro: [
      "In exam answers, treat Cascade as a bridge between legacy bittering logic and modern aroma expression.",
      "Explain style positioning relative to Citra: less tropical saturation, more classic grapefruit-floral identity."
    ],
    examKeys: ["Classic citrus marker hop", "Works across boil and dry-hop contexts", "Benchmark for American pale ale identity"],
    references: ["Addition timing", "IBU structure", "Citrus terpene expression", "Hop layering"]
  },
  {
    id: "centennial",
    commodity: "hops",
    name: "Centennial",
    family: "American citrus-floral hop",
    headline: "A high-impact citrus hop often called a super-cascade due to intensity and range.",
    origin: "United States commercial craft-era breeding.",
    structureLine: "Elevated aromatic impact with usable bittering backbone.",
    tastingNotes: ["lemon zest", "grapefruit", "floral", "resin"],
    benchmarkStyles: ["American IPA", "Pale Ale", "Double IPA"],
    beginner: [
      "Centennial is brighter and often more intense than Cascade.",
      "It is frequently used when brewers want clear citrus identity with clean bitterness."
    ],
    advanced: [
      "Large dry-hop charges can shift profile from clean citrus to resin-heavy depending on contact regime and oxygen exposure.",
      "Centennial pairs well with pine-resin hops for classic West Coast layering."
    ],
    pro: [
      "In blind theory contexts, use Centennial as a signal for classic American IPA structure rather than juice-first haze logic.",
      "Describe how hop blend architecture can prevent one-note citrus expression."
    ],
    examKeys: ["High-impact citrus-floral profile", "Strong in classic IPA templates", "Blend management affects resin vs citrus balance"],
    references: ["Dry-hop regimen", "West Coast layering", "Citrus-resin balance", "Oxidation sensitivity"]
  },
  {
    id: "mosaic",
    commodity: "hops",
    name: "Mosaic",
    family: "Modern complex aroma hop",
    headline: "A multidimensional modern hop combining tropical fruit, berry, citrus, and resin.",
    origin: "United States high-oil aroma breeding line.",
    structureLine: "High aromatic density with broad flavor spectrum and significant style-shaping potential.",
    tastingNotes: ["berry", "mango", "tangerine", "pine", "dank edge"],
    benchmarkStyles: ["Hazy IPA", "Double IPA", "Session IPA"],
    beginner: [
      "Mosaic is known for complexity rather than one-note citrus.",
      "It often contributes both juicy fruit and resin layers in the same beer."
    ],
    advanced: [
      "Expression varies by lot and dosage, so quality control and lot evaluation are critical.",
      "Mosaic can become heavy or muddled if dry-hop oxygen control is weak."
    ],
    pro: [
      "Frame Mosaic as a hop that rewards sensory calibration and blend discipline.",
      "In exam strategy, contrast Mosaic's layered profile with the narrower signatures of noble hops."
    ],
    examKeys: ["Complex multi-family aroma", "Lot variability requires tasting discipline", "Strong style-defining hop in modern IPA"],
    references: ["Lot selection", "Blend architecture", "Cold-side oxygen control", "Aroma persistence"]
  },
  {
    id: "simcoe",
    commodity: "hops",
    name: "Simcoe",
    family: "Resinous-fruit American hop",
    headline: "A dual-expression hop combining pine-resin backbone with passion-fruit lift.",
    origin: "United States Pacific Northwest commercial deployment.",
    structureLine: "Firm bittering capability with pronounced aromatic depth.",
    tastingNotes: ["pine", "passion fruit", "apricot", "resin", "earthy dankness"],
    benchmarkStyles: ["West Coast IPA", "Double IPA", "Pale Ale"],
    beginner: [
      "Simcoe is remembered for pine and resin with fruit underneath.",
      "It is often used where brewers want structure plus aroma."
    ],
    advanced: [
      "Simcoe's bittering contribution can feel sharper than softer fruit-first hops, so dosage and timing matter.",
      "In blends, it can anchor volatile tropical hops with a longer structural finish."
    ],
    pro: [
      "Use Simcoe to explain old-school and modern IPA crossover design.",
      "Exam responses should connect resin structure with finish length and bitterness perception."
    ],
    examKeys: ["Pine-resin signature with fruit lift", "Strong in structure-driven IPA", "Timing determines aromatic finesse vs harshness"],
    references: ["Bitterness texture", "Blend anchoring", "Kettle vs dry-hop role", "Finish persistence"]
  },
  {
    id: "hallertau",
    commodity: "hops",
    name: "Hallertau",
    family: "Noble hop",
    headline: "A low-intensity noble standard that supports elegant lager and wheat-beer profiles.",
    origin: "Germany's Hallertau growing zone.",
    structureLine: "Delicate herbal-floral profile, restrained bitterness, high balance value.",
    tastingNotes: ["herbal", "floral", "fresh grass", "mild spice"],
    benchmarkStyles: ["Helles", "Pilsner", "Wheat Beer"],
    beginner: [
      "Hallertau is subtle and balance-focused, not aroma-saturated.",
      "It is central to understanding traditional continental hop logic."
    ],
    advanced: [
      "Small dosing changes can materially alter balance in delicate lagers.",
      "Water chemistry and fermentation cleanliness are critical to preserve Hallertau nuance."
    ],
    pro: [
      "In exam framing, position Hallertau as precision-first rather than intensity-first.",
      "Use it to contrast noble-hop architecture with modern IPA aromatics."
    ],
    examKeys: ["Noble subtlety", "Best in clean ferment contexts", "Tiny process shifts have large sensory consequences"],
    references: ["Lager balance", "Subtle aromatic integration", "Water profile sensitivity", "Fermentation cleanliness"]
  },
  {
    id: "east-kent-golding",
    commodity: "hops",
    name: "East Kent Golding",
    family: "English classic hop",
    headline: "A heritage English hop delivering earthy, floral, and tea-like elegance in balanced ales.",
    origin: "Kent, England.",
    structureLine: "Moderate bitterness with soft earthy-floral aromatic profile.",
    tastingNotes: ["earth", "honey", "floral", "tea leaf", "soft spice"],
    benchmarkStyles: ["English Bitter", "Porter", "English Pale Ale"],
    beginner: [
      "East Kent Golding is usually gentle and refined, not aggressively citrus-forward.",
      "It often appears in traditional English ale style frameworks."
    ],
    advanced: [
      "Its profile is easy to overpower with aggressive yeast esters or high roast loads.",
      "Balanced hop schedule design is key for preserving layered earthy-floral identity."
    ],
    pro: [
      "In exam responses, use EKG to discuss heritage style authenticity and restraint.",
      "Differentiate EKG's tea-earth profile from noble herbal-spice and modern citrus patterns."
    ],
    examKeys: ["English heritage hop marker", "Earthy-tea floral profile", "Best in balanced rather than hop-saturated formats"],
    references: ["English ale tradition", "Hop restraint", "Flavor layering", "Style authenticity"]
  },
  {
    id: "fuggle",
    commodity: "hops",
    name: "Fuggle",
    family: "English earthy hop",
    headline: "A soft woody-earth hop that supports traditional British ale depth.",
    origin: "England, nineteenth-century commercial hop history.",
    structureLine: "Low to moderate intensity with woody-earth aromatic signature.",
    tastingNotes: ["wood", "earth", "mint", "soft herb", "tea"],
    benchmarkStyles: ["Brown Ale", "Porter", "English Bitter"],
    beginner: [
      "Fuggle is classic earthy and gentle, often used where subtlety is preferred over sharp citrus.",
      "It contributes traditional character more than punchy aroma."
    ],
    advanced: [
      "In darker styles, Fuggle can integrate with roast to produce layered savory depth.",
      "Excess dosing may flatten brightness and emphasize woody dullness."
    ],
    pro: [
      "Use Fuggle in exam logic to illustrate historical hop signatures and style continuity.",
      "Distinguish Fuggle's earthy softness from EKG's slightly brighter floral profile."
    ],
    examKeys: ["Classic earthy English marker", "Works well in malt-forward ales", "Restraint supports complexity"],
    references: ["Traditional brown/porter use", "Earthy aromatic profile", "Dose control", "Historical style design"]
  },
  {
    id: "amarillo",
    commodity: "hops",
    name: "Amarillo",
    family: "Orange-citrus American hop",
    headline: "A bright orange-forward aroma hop useful for expressive but approachable hop profiles.",
    origin: "United States commercial aroma breeding.",
    structureLine: "Moderate bitterness with clear sweet-citrus aromatic personality.",
    tastingNotes: ["orange", "apricot", "floral", "grapefruit"],
    benchmarkStyles: ["American Pale Ale", "IPA", "Wheat Ale"],
    beginner: [
      "Amarillo often reads orange-citrus and soft floral, making it approachable for many drinkers.",
      "It is common in pale ales and mid-intensity IPA recipes."
    ],
    advanced: [
      "Amarillo can round out sharper citrus hops by adding softer orange-fruit tone.",
      "Dry-hop and whirlpool balance determines whether profile stays clean or becomes overly sweet-fruit leaning."
    ],
    pro: [
      "In exam design logic, use Amarillo as a blend-shaping hop for citrus warmth rather than bitter authority.",
      "Explain how it bridges classic and modern American hop templates."
    ],
    examKeys: ["Orange-citrus identity", "Strong in balanced aromatic blends", "Usually complements rather than dominates bitterness"],
    references: ["Blend strategy", "Whirlpool impact", "Aroma contouring", "Pale ale style shaping"]
  },
  {
    id: "citra",
    commodity: "hops",
    name: "Citra",
    family: "Modern tropical aroma hop",
    headline: "A high-impact aroma hop defining modern juicy IPA expression.",
    origin: "United States hop breeding program; now globally deployed.",
    structureLine: "Explosive aromatic intensity, high oil content, tropical-citrus concentration.",
    tastingNotes: ["mango", "lime", "passion fruit", "grapefruit", "gooseberry"],
    benchmarkStyles: ["Hazy IPA", "American IPA", "Pale Ale"],
    beginner: [
      "Citra is one of the easiest hops to recognize because it pushes bright tropical and citrus aromatics.",
      "Most introductory use is late-kettle, whirlpool, and dry hop for aroma saturation."
    ],
    advanced: [
      "Timing and oxygen management strongly impact Citra expression. Poor cold-side handling can flatten fruit character and introduce harshness.",
      "Biotransformation with active fermentation can shift aroma profile toward softer, juicier expressions."
    ],
    pro: [
      "In exams, frame Citra as a high-oil aroma tool rather than a classic bittering-first hop.",
      "Explain how water profile, yeast strain, and dry-hop regimen alter perceived fruit brightness and bitterness texture."
    ],
    examKeys: [
      "High-aroma tropical profile in modern IPA contexts.",
      "Late additions and dry hopping are key use cases.",
      "Cold-side oxygen control is quality-critical."
    ],
    references: ["Whirlpool additions", "Dry hop contact", "Biotransformation", "Hop oils"]
  },
  {
    id: "saaz",
    commodity: "hops",
    name: "Saaz",
    family: "Noble hop",
    headline: "A precision noble hop with herbal spice and low-intensity elegance.",
    origin: "Czech Republic, historically central to pilsner identity.",
    structureLine: "Low alpha profile, delicate aroma, fine bitterness integration.",
    tastingNotes: ["herbal", "hay", "white pepper", "earth", "mild spice"],
    benchmarkStyles: ["Czech Pilsner", "Lager", "Belgian Blonde"],
    beginner: [
      "Saaz is not about loud fruit; it is about refined herbal-spice balance.",
      "It is commonly taught as a cornerstone hop for traditional lager families."
    ],
    advanced: [
      "Bitterness quality and layering depend on dose timing and boil management, not just total IBU.",
      "In delicate styles, Saaz can be overwhelmed by aggressive fermentation esters or sulfur management issues."
    ],
    pro: [
      "In theory responses, link Saaz to elegance and structural bitterness precision rather than aroma intensity.",
      "Differentiate noble-hop balance from modern high-oil hop architecture."
    ],
    examKeys: [
      "Noble hop profile: herbal-spice, restrained intensity.",
      "Used for classic lager balance and aromatic subtlety.",
      "Process precision matters more than saturation volume."
    ],
    references: ["Noble hop family", "IBU texture", "Boil scheduling", "Lager aroma balance"]
  },
  {
    id: "arabica",
    commodity: "coffee",
    name: "Arabica",
    family: "Fine-flavor coffee species",
    headline: "The quality benchmark species for high-complexity specialty coffee.",
    origin: "Ethiopian highlands; globally cultivated at altitude.",
    structureLine: "Higher aromatic complexity, generally lower bitterness, broad terroir transparency.",
    tastingNotes: ["floral", "citrus", "stone fruit", "chocolate", "tea-like lift"],
    benchmarkStyles: ["Washed high-altitude filter coffee", "Single-origin espresso"],
    beginner: [
      "Arabica is usually the main species in specialty coffee due to aromatic range and cleaner cup profile.",
      "It often tastes more layered and less harsh than commodity robusta-heavy blends."
    ],
    advanced: [
      "Altitude, variety, and post-harvest processing define cup architecture as much as roast.",
      "Roast development changes whether arabica reads bright and transparent or sweet and chocolate-led."
    ],
    pro: [
      "For certification logic, separate species effect from process effect: not all arabica tastes alike.",
      "Use extraction language precisely: under-extraction exaggerates sourness; over-extraction emphasizes bitterness and dryness."
    ],
    examKeys: [
      "Arabica is a broad category; origin and process are decisive.",
      "Differentiate species traits from roast and extraction outcomes.",
      "Use sensory and process vocabulary together."
    ],
    references: ["Altitude", "Washed vs natural", "Roast development", "Extraction yield"]
  },
  {
    id: "robusta",
    commodity: "coffee",
    name: "Robusta",
    family: "High-caffeine coffee species",
    headline: "A resilient species contributing body, crema support, and intense roast-driven structure.",
    origin: "Central and West Africa; now widespread in tropical production zones.",
    structureLine: "Higher caffeine, stronger bitterness, heavier body, less aromatic finesse.",
    tastingNotes: ["cocoa bitterness", "earth", "wood", "dark roast", "grainy depth"],
    benchmarkStyles: ["Espresso blend support", "Dark-roast commercial profiles"],
    beginner: [
      "Robusta is usually described as stronger and more bitter than arabica.",
      "It is often used in blends for crema and cost structure."
    ],
    advanced: [
      "Processing and roast quality can reduce harshness, but robusta still trends toward firmer bitterness and lower floral complexity.",
      "In espresso systems, controlled robusta use can enhance texture and persistence."
    ],
    pro: [
      "Avoid simplistic quality assumptions. Well-processed robusta can perform in targeted style goals.",
      "In exam framing, explain why species selection is a strategic choice tied to beverage style and economics."
    ],
    examKeys: [
      "Higher caffeine and bitterness are core differentiators.",
      "Often used for texture and crema function in blends.",
      "Quality outcomes depend on processing and roast discipline."
    ],
    references: ["Species chemistry", "Blend architecture", "Roast intensity", "Espresso texture"]
  },
  {
    id: "green",
    commodity: "tea",
    name: "Green Tea",
    family: "Unoxidized tea",
    headline: "A freshness-driven tea category where oxidation control preserves vegetal and floral precision.",
    origin: "China and Japan with global adaptation.",
    structureLine: "Low oxidation, high aromatic delicacy, variable umami and bitterness by style.",
    tastingNotes: ["cut grass", "seaweed", "sweet pea", "citrus zest", "white flowers"],
    benchmarkStyles: ["Sencha", "Longjing", "Gyokuro", "Matcha"],
    beginner: [
      "Green tea is made by halting oxidation early, which keeps fresh and vegetal aromatics.",
      "Brew temperature and steep time are critical; too hot often creates bitterness."
    ],
    advanced: [
      "Regional technique diverges: Japanese steaming and Chinese pan-firing create different aromatic signatures.",
      "Shade-growing in premium styles increases amino acid expression and umami intensity."
    ],
    pro: [
      "In exam analysis, link oxidation control, cultivar, and processing choice to cup profile and texture.",
      "Discuss infusion protocol as part of quality evaluation, not an afterthought."
    ],
    examKeys: [
      "Oxidation management defines category identity.",
      "Technique differences create style families inside green tea.",
      "Brewing variables materially alter perceived quality."
    ],
    references: ["Steaming vs pan-firing", "Amino acids", "Umami", "Infusion control"]
  },
  {
    id: "oolong",
    commodity: "tea",
    name: "Oolong",
    family: "Partially oxidized tea",
    headline: "A wide-spectrum tea category bridging green freshness and black-tea depth.",
    origin: "Fujian and Taiwan traditions with expanding modern interpretations.",
    structureLine: "Partial oxidation with broad roast and aromatic range from floral to toasted.",
    tastingNotes: ["orchid", "stone fruit", "honey", "toasted nuts", "mineral length"],
    benchmarkStyles: ["Tieguanyin", "Dong Ding", "Wuyi Rock Tea"],
    beginner: [
      "Oolong spans many styles, so it is best understood as a process band, not one flavor profile.",
      "Some oolongs are floral and lifted; others are roasted and savory."
    ],
    advanced: [
      "Oxidation percentage, leaf bruising, and roast regime are key design levers for aroma and texture.",
      "Multiple short infusions can show staged flavor development and are often used for quality assessment."
    ],
    pro: [
      "Use oolong to demonstrate process literacy: oxidation trajectory plus roast management equals style architecture.",
      "In exam settings, describe structure across infusions, not just first-cup aromatics."
    ],
    examKeys: [
      "Oolong is process-defined with large style variance.",
      "Roast and oxidation interplay drives sensory identity.",
      "Infusion sequence is part of advanced evaluation."
    ],
    references: ["Bruising and oxidation", "Roast finishing", "Infusion sequencing", "Terroir expression"]
  },
  {
    id: "apple",
    commodity: "fruit",
    name: "Apple",
    family: "Pome fruit",
    headline: "A foundational fruit for juice, cider, apple wine, and distilled apple spirits.",
    origin: "Central Asia ancestry; now globally cultivated with broad cultivar diversity.",
    structureLine: "Acid-sugar balance with tannin variance by cultivar and ripeness window.",
    tastingNotes: ["fresh apple", "baked apple", "honey", "skin tannin", "floral lift"],
    benchmarkStyles: ["Fresh pressed juice", "Dry cider", "Calvados-style spirit"],
    beginner: [
      "Apple quality starts with acid and sugar balance. Dessert cultivars are not always ideal for structured cider.",
      "In juice, freshness and oxidation management are central to flavor retention."
    ],
    advanced: [
      "For cider and apple wine, cultivar blending can build tannin, acid tension, and aromatic complexity.",
      "Fermentation temperature and nutrient management determine whether fruit purity stays bright or becomes diffuse."
    ],
    pro: [
      "For spirits, explain the full chain: juice chemistry, fermentation health, distillation cut policy, and maturation intent.",
      "In exam logic, separate fresh fruit aromatics from ferment-derived esters and maturation-derived notes."
    ],
    examKeys: [
      "Apple can produce distinct outcomes across juice, wine, and spirits.",
      "Cultivar and acid-tannin structure drive stylistic range.",
      "Process control governs oxidation and aromatic precision."
    ],
    references: ["Cider apple classes", "Juice oxidation control", "Ferment nutrition", "Fruit spirit cuts"],
    beverageFocus: [
      {
        title: "Juice Focus",
        points: [
          "Prioritize freshness, enzymatic browning control, and clean press handling.",
          "Balance sweetness with acid for stable drinkability."
        ]
      },
      {
        title: "Wine Focus",
        points: [
          "Use fermentation strategy and possible residual sugar design for style intent.",
          "Blend cultivars to shape structure and aromatic range."
        ]
      },
      {
        title: "Spirits Focus",
        points: [
          "Track aroma retention from cider base through distillation cuts.",
          "Maturation choices define apple-forward vs oak-led outcomes."
        ]
      }
    ]
  },
  {
    id: "berries",
    commodity: "fruit",
    name: "Berries",
    family: "Mixed berry fruits",
    headline: "Aromatic, acid-driven fruits used across bright juices, fruit wines, and expressive eau-de-vie styles.",
    origin: "Multiple temperate and cool-climate fruit families.",
    structureLine: "High aromatic intensity, variable sugar, often pronounced acid and color compounds.",
    tastingNotes: ["red berry", "black berry", "jam", "floral high notes", "fresh acidity"],
    benchmarkStyles: ["Cold-pressed berry juice", "Berry country wine", "Raspberry eau-de-vie"],
    beginner: [
      "Berry beverages are usually aroma-first, but quality depends on managing acidity and seed/skin bitterness.",
      "Freshness declines quickly with poor cold-chain handling."
    ],
    advanced: [
      "Pectin management, maceration strategy, and oxygen exposure strongly affect clarity, color, and texture.",
      "For fermented products, sugar correction and acid balance often require tighter control than grape must."
    ],
    pro: [
      "In distilled berry spirits, low yield and high aromatic delicacy make cut precision essential.",
      "Exam answers should show process awareness from fruit condition through packaging stability."
    ],
    examKeys: [
      "High aroma potential, but fragile quality window.",
      "Control pectin, oxygen, and bitterness extraction.",
      "Differentiate fresh-fruit vs ferment-derived aromatic signatures."
    ],
    references: ["Pectin management", "Maceration", "Color stability", "Aromatic distillate cuts"],
    beverageFocus: [
      {
        title: "Juice Focus",
        points: [
          "Cold handling and oxygen management preserve bright aroma.",
          "Acid-sweetness calibration is critical for balance."
        ]
      },
      {
        title: "Wine Focus",
        points: [
          "Fermentation and extraction choices govern color and structure.",
          "Residual sugar design impacts perceived fruit intensity."
        ]
      },
      {
        title: "Spirits Focus",
        points: [
          "Aromatic retention is difficult due to delicate volatiles.",
          "Precise distillation cuts prevent cooked or muddy character."
        ]
      }
    ]
  }
];

function withDefaultCommodityMedia(profile: CommodityStudyProfile): CommodityStudyProfile {
  const basePath = `/commodities/${profile.commodity}/${profile.id}`;
  const imageUrl = profile.imageUrl ?? `${basePath}.png`;

  return {
    ...profile,
    imageUrl,
    imageCaption:
      profile.imageCaption ??
      `Photo reference for studying ${profile.name} in beverage production, service, and sensory analysis.`,
    turntableFrameUrls: profile.turntableFrameUrls ?? [imageUrl, `${basePath}-side.png`, `${basePath}-back.png`],
    turntableFrameCount: profile.turntableFrameCount ?? 3
  };
}

const expansionStudies: CommodityStudyProfile[] = [
  ...[
    {
      id: "oats",
      commodity: "grains",
      name: "Oats",
      family: "Texture-building cereal grain",
      beverage: "stout, hazy IPA, farmhouse ale, and experimental grain spirits",
      origin: "Cool-climate Eurasian agriculture with strong northern European brewing use.",
      role: "Oats contribute creamy body, haze stability, and soft cereal sweetness.",
      notes: ["cream", "porridge", "soft grain", "silky texture", "light nuttiness"],
      styles: ["Oatmeal Stout", "Hazy IPA", "Cream Ale", "Experimental Whiskey"],
      technical: ["Beta-glucans", "Mouthfeel", "Haze stability", "Mash viscosity"]
    },
    {
      id: "sorghum",
      commodity: "grains",
      name: "Sorghum",
      family: "Gluten-free fermentable grain",
      beverage: "gluten-free beer, African traditional beers, and neutral spirits",
      origin: "African domestication with broad hot-climate resilience.",
      role: "Sorghum supplies fermentable starch and a lightly earthy grain profile where barley is unsuitable.",
      notes: ["earthy grain", "mild molasses", "dry cereal", "subtle tannin", "rustic malt"],
      styles: ["Gluten-Free Beer", "African Sorghum Beer", "Neutral Grain Spirit"],
      technical: ["Gelatinization", "Enzyme supplementation", "Gluten-free brewing", "Traditional fermentation"]
    },
    {
      id: "millet",
      commodity: "grains",
      name: "Millet",
      family: "Small-seeded gluten-free grain",
      beverage: "gluten-free beer, opaque traditional beer, and light cereal spirits",
      origin: "Africa and Asia, valued in dryland farming systems.",
      role: "Millet adds light cereal flavor, fermentable starch, and gluten-free formulation flexibility.",
      notes: ["light cereal", "hay", "dry grain", "mild nuttiness", "clean finish"],
      styles: ["Gluten-Free Lager", "Traditional Millet Beer", "Light Grain Spirit"],
      technical: ["Small-grain malting", "Adjunct conversion", "Dryland grain", "Mash filtration"]
    },
    {
      id: "buckwheat",
      commodity: "grains",
      name: "Buckwheat",
      family: "Pseudo-cereal fermentable",
      beverage: "gluten-free beer, soba-influenced spirits, and botanical grain blends",
      origin: "Central and East Asian cultivation with European adoption.",
      role: "Buckwheat gives earthy, nutty, and slightly bitter structure while supporting gluten-free production.",
      notes: ["toasted nut", "earth", "dark grain", "bittersweet edge", "roasted cereal"],
      styles: ["Buckwheat Beer", "Gluten-Free Ale", "Shochu-Inspired Spirit"],
      technical: ["Pseudo-cereal", "Roast profile", "Gluten-free mash", "Phenolic bitterness"]
    },
    {
      id: "spelt",
      commodity: "grains",
      name: "Spelt",
      family: "Ancient wheat relative",
      beverage: "rustic ale, saison, wheat beer, and heritage grain spirits",
      origin: "Ancient European wheat lineage.",
      role: "Spelt brings nutty wheat-like softness with rustic cereal depth.",
      notes: ["hazelnut", "soft wheat", "rustic bread", "honey grain", "dry finish"],
      styles: ["Spelt Saison", "Farmhouse Ale", "Heritage Whiskey"],
      technical: ["Ancient grain", "Protein structure", "Farmhouse grist", "Heritage cereal"]
    },
    {
      id: "triticale",
      commodity: "grains",
      name: "Triticale",
      family: "Wheat-rye hybrid grain",
      beverage: "experimental whiskey, specialty ale, and mixed-grain spirits",
      origin: "Modern hybridization of wheat and rye.",
      role: "Triticale bridges wheat softness and rye spice in grain bills.",
      notes: ["soft bread", "pepper", "cereal sweetness", "dry spice", "grain husk"],
      styles: ["Experimental Whiskey", "Mixed-Grain Bourbon", "Specialty Ale"],
      technical: ["Hybrid grain", "Mash bill design", "Texture-spice balance", "Distillate structure"]
    },
    {
      id: "quinoa",
      commodity: "grains",
      name: "Quinoa",
      family: "Pseudo-cereal fermentable",
      beverage: "gluten-free beer, fermented grain beverages, and experimental spirits",
      origin: "Andean agriculture.",
      role: "Quinoa contributes earthy protein character and alternative fermentable identity.",
      notes: ["earth", "seed", "herbal grain", "nutty bitterness", "mineral dryness"],
      styles: ["Gluten-Free Ale", "Andean-Inspired Ferment", "Experimental Spirit"],
      technical: ["Saponin management", "Pseudo-cereal", "Protein load", "Alternative starch"]
    }
  ],
  ...[
    {
      id: "chinook",
      commodity: "hops",
      name: "Chinook",
      family: "Pine and grapefruit American hop",
      beverage: "West Coast IPA, American stout, and bitter pale ale",
      origin: "United States Pacific Northwest.",
      role: "Chinook supplies assertive bitterness, pine resin, and grapefruit peel.",
      notes: ["pine", "grapefruit", "resin", "spice", "firm bitterness"],
      styles: ["West Coast IPA", "American Pale Ale", "Imperial Stout"],
      technical: ["Alpha acid", "Resin character", "Bittering additions", "Classic IPA"]
    },
    {
      id: "columbus",
      commodity: "hops",
      name: "Columbus",
      family: "Dank high-alpha hop",
      beverage: "IPA, double IPA, and bittering programs",
      origin: "United States high-alpha hop breeding.",
      role: "Columbus delivers strong bittering power with dank, resinous, and spicy depth.",
      notes: ["dank", "resin", "black pepper", "earth", "citrus peel"],
      styles: ["Double IPA", "West Coast IPA", "American Barleywine"],
      technical: ["CTZ family", "High alpha", "Bittering efficiency", "Dank aroma"]
    },
    {
      id: "galaxy",
      commodity: "hops",
      name: "Galaxy",
      family: "Australian tropical aroma hop",
      beverage: "hazy IPA, Australian pale ale, and tropical hop showcases",
      origin: "Australia.",
      role: "Galaxy brings passion fruit, peach, and high-intensity tropical aroma.",
      notes: ["passion fruit", "peach", "citrus", "tropical juice", "light resin"],
      styles: ["Hazy IPA", "Australian Pale Ale", "Double IPA"],
      technical: ["Southern Hemisphere hops", "Dry hopping", "Oil intensity", "Tropical thiols"]
    },
    {
      id: "nelson-sauvin",
      commodity: "hops",
      name: "Nelson Sauvin",
      family: "New Zealand white-wine-like hop",
      beverage: "IPA, saison, and aromatic lager",
      origin: "New Zealand.",
      role: "Nelson Sauvin contributes gooseberry, white grape, and mineral aromatic lift.",
      notes: ["gooseberry", "white grape", "lime", "diesel edge", "mineral"],
      styles: ["New Zealand IPA", "Saison", "Dry-Hopped Pilsner"],
      technical: ["Thiols", "Southern Hemisphere hops", "Dry-hop intensity", "Wine-like aromatics"]
    },
    {
      id: "motueka",
      commodity: "hops",
      name: "Motueka",
      family: "New Zealand lime hop",
      beverage: "pilsner, saison, pale ale, and IPA",
      origin: "New Zealand.",
      role: "Motueka adds lime zest, tropical citrus, and clean aromatic lift.",
      notes: ["lime", "lemon", "tropical citrus", "fresh herb", "soft floral"],
      styles: ["New Zealand Pilsner", "Pale Ale", "Saison"],
      technical: ["Late hopping", "Lime aromatics", "Noble-hop lineage", "Cold-side freshness"]
    },
    {
      id: "strata",
      commodity: "hops",
      name: "Strata",
      family: "Modern layered aroma hop",
      beverage: "hazy IPA, pale ale, and hop-forward lager",
      origin: "United States, Oregon breeding programs.",
      role: "Strata combines passion fruit, strawberry, citrus, and dank aromatic layers.",
      notes: ["strawberry", "passion fruit", "cannabis-like dankness", "grapefruit", "melon"],
      styles: ["Hazy IPA", "Pale Ale", "Cold IPA"],
      technical: ["Modern aroma hop", "Lot selection", "Dry-hop saturation", "Aroma layering"]
    },
    {
      id: "sabro",
      commodity: "hops",
      name: "Sabro",
      family: "Coconut and tropical hop",
      beverage: "hazy IPA, fruit beer, and experimental pale ale",
      origin: "United States hop breeding with neomexicanus heritage.",
      role: "Sabro gives coconut, tangerine, and tropical cream notes.",
      notes: ["coconut", "tangerine", "cream", "tropical fruit", "cedar"],
      styles: ["Hazy IPA", "Milkshake IPA", "Experimental Pale Ale"],
      technical: ["Neomexicanus genetics", "Coconut aromatics", "Dry-hop dosage", "Creamy aroma perception"]
    },
    {
      id: "tettnang",
      commodity: "hops",
      name: "Tettnang",
      family: "German noble hop",
      beverage: "lager, wheat beer, kolsch, and Belgian ale",
      origin: "Tettnang, Germany.",
      role: "Tettnang provides delicate floral, herbal, and mild spice balance.",
      notes: ["floral", "herbal", "mild spice", "tea", "fresh grass"],
      styles: ["German Pilsner", "Kolsch", "Wheat Beer"],
      technical: ["Noble hop", "Low alpha", "Lager balance", "Subtle aroma"]
    },
    {
      id: "sorachi-ace",
      commodity: "hops",
      name: "Sorachi Ace",
      family: "Distinctive lemon-dill hop",
      beverage: "saison, wheat beer, IPA, and experimental lager",
      origin: "Japanese breeding with global craft use.",
      role: "Sorachi Ace is recognizable for lemon, dill, coconut, and herbal intensity.",
      notes: ["lemon", "dill", "coconut", "herb", "bright citrus"],
      styles: ["Saison", "Wheat Ale", "Experimental IPA"],
      technical: ["Distinctive oil profile", "Dose sensitivity", "Herbal citrus", "Single-hop study"]
    }
  ],
  ...[
    {
      id: "liberica",
      commodity: "coffee",
      name: "Liberica",
      family: "Large-seeded coffee species",
      beverage: "specialty coffee, regional blends, and aromatic single-origin service",
      origin: "West Africa with important Southeast Asian cultivation.",
      role: "Liberica brings woody, floral, and sometimes jackfruit-like aromatic character.",
      notes: ["floral wood", "tropical fruit", "smoke", "dark sugar", "earth"],
      styles: ["Single-Origin Brew", "Regional Blend", "Specialty Cupping"],
      technical: ["Coffee species", "Large bean morphology", "Post-harvest handling", "Regional identity"]
    },
    {
      id: "excelsa",
      commodity: "coffee",
      name: "Excelsa",
      family: "Tart-fruited coffee type",
      beverage: "blends, specialty lots, and high-acid coffee service",
      origin: "Central Africa and Southeast Asia.",
      role: "Excelsa adds tart fruit, dark complexity, and lift in blends.",
      notes: ["tamarind", "dark fruit", "tart cherry", "cocoa", "roast spice"],
      styles: ["Blend Component", "Specialty Filter", "Regional Coffee"],
      technical: ["Species classification", "Acid structure", "Blend architecture", "Roast calibration"]
    },
    {
      id: "typica",
      commodity: "coffee",
      name: "Typica",
      family: "Arabica cultivar lineage",
      beverage: "single-origin coffee, filter brewing, and quality-focused espresso",
      origin: "Historic arabica lineage spread from Yemen and colonial botanical routes.",
      role: "Typica often shows clarity, sweetness, and elegant structure when grown well.",
      notes: ["brown sugar", "citrus", "floral", "clean cup", "soft chocolate"],
      styles: ["Washed Filter", "Single-Origin Espresso", "Cupping Reference"],
      technical: ["Arabica cultivar", "Yield-quality tradeoff", "Washed processing", "Cup clarity"]
    },
    {
      id: "bourbon-coffee",
      commodity: "coffee",
      name: "Bourbon Coffee",
      family: "Sweet arabica cultivar",
      beverage: "single-origin coffee, espresso, and washed specialty lots",
      origin: "Bourbon island lineage with global Latin American and African planting.",
      role: "Bourbon coffee is prized for sweetness, roundness, and red-fruited cup potential.",
      notes: ["red fruit", "caramel", "milk chocolate", "soft citrus", "floral"],
      styles: ["Washed Bourbon", "Natural Bourbon", "Single-Origin Espresso"],
      technical: ["Cultivar lineage", "Sweetness perception", "Processing style", "Altitude effect"]
    },
    {
      id: "gesha",
      commodity: "coffee",
      name: "Gesha",
      family: "Floral high-value arabica cultivar",
      beverage: "competition coffee, high-end filter service, and specialty cupping",
      origin: "Ethiopian lineage made famous through Panama specialty production.",
      role: "Gesha offers intense floral, citrus, and tea-like aromatic definition.",
      notes: ["jasmine", "bergamot", "peach", "black tea", "honey"],
      styles: ["Competition Filter", "Washed Gesha", "Natural Gesha"],
      technical: ["Cultivar identity", "Auction lots", "Floral aromatics", "Extraction precision"]
    },
    {
      id: "sl28",
      commodity: "coffee",
      name: "SL28",
      family: "Kenyan arabica cultivar",
      beverage: "Kenyan filter coffee, espresso, and acid-forward specialty service",
      origin: "Kenyan Scott Laboratories selection.",
      role: "SL28 is associated with blackcurrant, citrus acidity, and high cup intensity.",
      notes: ["blackcurrant", "grapefruit", "tomato leaf", "sugarcane", "winey acidity"],
      styles: ["Kenyan Washed Coffee", "Filter Coffee", "Bright Espresso"],
      technical: ["Cultivar selection", "High acidity", "Washed processing", "Auction grading"]
    },
    {
      id: "pacamara",
      commodity: "coffee",
      name: "Pacamara",
      family: "Large-bean arabica hybrid",
      beverage: "specialty filter coffee, espresso, and competition service",
      origin: "El Salvador hybrid of Pacas and Maragogipe.",
      role: "Pacamara can combine large-bean texture with tropical fruit, florals, and chocolate depth.",
      notes: ["tropical fruit", "cocoa", "floral", "citrus", "creamy texture"],
      styles: ["Single-Origin Filter", "Natural Pacamara", "Competition Coffee"],
      technical: ["Hybrid cultivar", "Screen size", "Roast development", "Cup complexity"]
    },
    {
      id: "caturra",
      commodity: "coffee",
      name: "Caturra",
      family: "Compact arabica cultivar",
      beverage: "Latin American filter coffee, espresso, and washed specialty lots",
      origin: "Brazilian Bourbon mutation with broad Latin American planting.",
      role: "Caturra can deliver clean sweetness, citrus, and balanced structure.",
      notes: ["citrus", "caramel", "red apple", "soft chocolate", "clean finish"],
      styles: ["Washed Filter", "Espresso Blend", "Single-Origin Coffee"],
      technical: ["Cultivar mutation", "Plant density", "Washed clarity", "Roast balance"]
    }
  ],
  ...[
    {
      id: "white-tea",
      commodity: "tea",
      name: "White Tea",
      family: "Minimally processed tea",
      beverage: "delicate loose-leaf tea, cold infusion, and fine hospitality tea service",
      origin: "Fujian, China with global production.",
      role: "White tea preserves soft floral, hay, melon, and honeyed delicacy.",
      notes: ["hay", "melon", "honey", "white flowers", "soft citrus"],
      styles: ["Silver Needle", "White Peony", "Cold-Brew White Tea"],
      technical: ["Withering", "Minimal oxidation", "Bud selection", "Low-temperature infusion"]
    },
    {
      id: "black-tea",
      commodity: "tea",
      name: "Black Tea",
      family: "Fully oxidized tea",
      beverage: "breakfast tea, milk tea, iced tea, and classic hospitality service",
      origin: "China, India, Sri Lanka, Kenya, and global tea regions.",
      role: "Black tea offers brisk tannin, malt, dried fruit, and full infusion structure.",
      notes: ["malt", "dried fruit", "tannin", "honey", "citrus peel"],
      styles: ["Assam", "Darjeeling", "Ceylon", "English Breakfast"],
      technical: ["Full oxidation", "Briskness", "Leaf grade", "Withering and rolling"]
    },
    {
      id: "pu-erh",
      commodity: "tea",
      name: "Pu-erh",
      family: "Microbially transformed tea",
      beverage: "aged tea service, gongfu preparation, and fermented tea study",
      origin: "Yunnan, China.",
      role: "Pu-erh develops earthy, woody, camphor, and aged complexity through microbial transformation.",
      notes: ["earth", "forest floor", "camphor", "dried fruit", "old wood"],
      styles: ["Raw Pu-erh", "Ripe Pu-erh", "Aged Cake Tea"],
      technical: ["Microbial transformation", "Compressed tea", "Aging", "Gongfu brewing"]
    },
    {
      id: "yellow-tea",
      commodity: "tea",
      name: "Yellow Tea",
      family: "Lightly oxidized mellowed tea",
      beverage: "rare specialty tea and fine tea education",
      origin: "China.",
      role: "Yellow tea softens green-tea sharpness through a controlled mellowing step.",
      notes: ["sweet grass", "chestnut", "yellow flowers", "soft grain", "mellow citrus"],
      styles: ["Junshan Yinzhen", "Huoshan Huangya", "Meng Ding Huangya"],
      technical: ["Sealed yellowing", "Low oxidation", "Mellowing", "Rare tea category"]
    },
    {
      id: "matcha",
      commodity: "tea",
      name: "Matcha",
      family: "Powdered shade-grown green tea",
      beverage: "ceremonial tea, latte, culinary drinks, and modern cafe service",
      origin: "Japan, rooted in Chinese powdered-tea precedent and Japanese tea ceremony.",
      role: "Matcha delivers concentrated umami, vegetal sweetness, and full-leaf texture.",
      notes: ["umami", "seaweed", "sweet grass", "cream", "bittersweet finish"],
      styles: ["Ceremonial Matcha", "Usucha", "Matcha Latte"],
      technical: ["Shade growing", "Tencha", "Stone milling", "Suspension texture"]
    },
    {
      id: "sencha",
      commodity: "tea",
      name: "Sencha",
      family: "Steamed Japanese green tea",
      beverage: "everyday Japanese tea, cold brew, and fine green tea service",
      origin: "Japan.",
      role: "Sencha balances grassy freshness, umami, and clean bitterness.",
      notes: ["grass", "umami", "citrus", "sea breeze", "snap pea"],
      styles: ["Asamushi Sencha", "Fukamushi Sencha", "Cold-Brew Sencha"],
      technical: ["Steaming level", "Needle rolling", "Infusion temperature", "Umami balance"]
    },
    {
      id: "gyokuro",
      commodity: "tea",
      name: "Gyokuro",
      family: "Shade-grown premium green tea",
      beverage: "fine Japanese tea service and high-umami infusion study",
      origin: "Japan.",
      role: "Gyokuro emphasizes deep umami, sweetness, and soft marine intensity.",
      notes: ["umami", "nori", "sweet pea", "broth", "soft flowers"],
      styles: ["Premium Gyokuro", "Low-Temperature Infusion", "Multiple Steep Service"],
      technical: ["Shade growing", "Amino acids", "Low-temperature brewing", "Multiple infusion"]
    },
    {
      id: "darjeeling",
      commodity: "tea",
      name: "Darjeeling",
      family: "High-elevation Indian tea",
      beverage: "black tea, first flush service, and fine afternoon tea",
      origin: "Darjeeling, India.",
      role: "Darjeeling is known for muscatel fragrance, briskness, and high-elevation lift.",
      notes: ["muscatel", "floral", "citrus", "light tannin", "dried apricot"],
      styles: ["First Flush Darjeeling", "Second Flush Darjeeling", "Fine Black Tea"],
      technical: ["Flush timing", "High elevation", "Muscatel aroma", "Estate tea"]
    },
    {
      id: "assam",
      commodity: "tea",
      name: "Assam",
      family: "Bold lowland black tea",
      beverage: "breakfast tea, milk tea, chai, and strong iced tea",
      origin: "Assam, India.",
      role: "Assam brings malt, body, color, and brisk tannic strength.",
      notes: ["malt", "molasses", "black tea tannin", "baked fruit", "cocoa"],
      styles: ["Assam Breakfast Tea", "Masala Chai", "Milk Tea"],
      technical: ["CTC processing", "Briskness", "Milk compatibility", "Lowland tea"]
    }
  ],
  ...[
    {
      id: "pear",
      commodity: "fruit",
      name: "Pear",
      family: "Pome fruit",
      beverage: "juice, perry, fruit wine, brandy, and eau-de-vie",
      origin: "Eurasian pome fruit domestication with strong European beverage traditions.",
      role: "Pear contributes soft aromatics, delicate acidity, and perfumed distillate potential.",
      notes: ["pear skin", "white flowers", "honey", "soft acid", "delicate spice"],
      styles: ["Perry", "Pear Juice", "Poire Eau-de-Vie"],
      technical: ["Perry pears", "Sorbitol", "Delicate fermentation", "Aromatic distillation"]
    },
    {
      id: "raspberry",
      commodity: "fruit",
      name: "Raspberry",
      family: "Red aggregate berry",
      beverage: "juice, fruit wine, lambic beer, liqueur, and eau-de-vie",
      origin: "Temperate Eurasian and North American berry traditions.",
      role: "Raspberry gives high-toned red fruit, floral lift, brisk acid, and delicate seed nuance.",
      notes: ["raspberry", "rose", "fresh acid", "red jam", "seed spice"],
      styles: ["Raspberry Syrup", "Framboise Lambic", "Raspberry Wine", "Framboise Eau-de-Vie"],
      technical: ["Anthocyanins", "Seed tannin", "Aroma volatility", "Refermentation"]
    },
    {
      id: "strawberry",
      commodity: "fruit",
      name: "Strawberry",
      family: "Soft red aggregate fruit",
      beverage: "juice, nectar, fruit wine, liqueur, and cocktail syrups",
      origin: "Hybrid garden strawberry traditions from European and American species.",
      role: "Strawberry brings soft red fruit, perfume, low tannin, and fragile fresh aromatics.",
      notes: ["strawberry", "red candy", "cream", "soft acid", "floral sweetness"],
      styles: ["Strawberry Juice", "Strawberry Wine", "Strawberry Liqueur", "Shrub"],
      technical: ["Heat sensitivity", "Color fade", "Pectin", "Aroma retention"]
    },
    {
      id: "cranberry",
      commodity: "fruit",
      name: "Cranberry",
      family: "Tart red bog berry",
      beverage: "juice, cocktail modifiers, fruit wine, liqueur, and flavored spirits",
      origin: "North American bog fruit with strong juice and cocktail use.",
      role: "Cranberry contributes sharp acid, bitter-red fruit, color, and balancing tartness.",
      notes: ["cranberry", "tart red fruit", "bitter skin", "ruby color", "dry snap"],
      styles: ["Cranberry Juice", "Cosmopolitan", "Cranberry Wine", "Cranberry Liqueur"],
      technical: ["Benzoic acid", "Acid balance", "Bitter phenolics", "Sweetness design"]
    },
    {
      id: "blueberry",
      commodity: "fruit",
      name: "Blueberry",
      family: "Blue berry fruit",
      beverage: "juice, fruit wine, beer additions, liqueur, and flavored spirits",
      origin: "North American Vaccinium cultivation with modern global production.",
      role: "Blueberry adds blue fruit, soft acidity, purple color, and gentle jammy sweetness.",
      notes: ["blueberry", "violet", "soft jam", "purple fruit", "mild tannin"],
      styles: ["Blueberry Juice", "Blueberry Wine", "Fruit Beer", "Blueberry Liqueur"],
      technical: ["Anthocyanins", "Skin extraction", "Pectin", "Color stability"]
    },
    {
      id: "huckleberry",
      commodity: "fruit",
      name: "Huckleberry",
      family: "Wild blue-black berry",
      beverage: "regional juice, country wine, liqueur, and wild-fruit spirits",
      origin: "North American wild berry traditions, especially mountain and forest regions.",
      role: "Huckleberry brings concentrated wild berry aroma, tartness, and darker herbal edges.",
      notes: ["wild blueberry", "huckleberry", "forest fruit", "tart skin", "purple jam"],
      styles: ["Huckleberry Syrup", "Country Wine", "Wild Berry Liqueur"],
      technical: ["Wild fruit handling", "Acid correction", "Skin phenolics", "Aroma capture"]
    },
    {
      id: "bilberry",
      commodity: "fruit",
      name: "Bilberry",
      family: "European wild blue berry",
      beverage: "juice, fruit wine, liqueur, and herbal-fruit infusions",
      origin: "Northern European Vaccinium forests.",
      role: "Bilberry gives intense blue-black pigment, tart berry flavor, and forest-floor complexity.",
      notes: ["bilberry", "blue-black fruit", "tart berry", "forest", "inky color"],
      styles: ["Bilberry Juice", "Bilberry Wine", "Berry Liqueur"],
      technical: ["High anthocyanin", "Astringency", "Wild fruit sorting", "Color extraction"]
    },
    {
      id: "blueberry-jam",
      commodity: "fruit",
      name: "Blueberry Jam",
      family: "Cooked blue fruit marker",
      beverage: "sensory training, fruit syrups, liqueurs, and dessert-style beverage references",
      origin: "Cooked blueberry preparations used as a beverage aroma reference.",
      role: "Blueberry jam teaches the difference between fresh berry lift and cooked, sweet, concentrated fruit.",
      notes: ["blueberry jam", "cooked berry", "sugar concentration", "purple fruit", "soft spice"],
      styles: ["Fruit Syrup", "Dessert Liqueur", "Sweet Fruit Wine", "Sensory Standard"],
      technical: ["Thermal concentration", "Pectin set", "Sugar-acid balance", "Cooked-fruit aroma"]
    },
    {
      id: "blue-purple-berry-notes",
      commodity: "fruit",
      name: "Blue-Purple Berry Notes",
      family: "Sensory berry reference",
      beverage: "wine, cocktails, fruit syrups, liqueurs, and blind-tasting education",
      origin: "Composite sensory reference for blue and purple berry aroma families.",
      role: "Blue-purple berry notes help students separate blueberry, bilberry, huckleberry, and violet-toned fruit impressions.",
      notes: ["blueberry", "black raspberry", "violet", "purple jam", "berry skin"],
      styles: ["Blind Tasting Standard", "Berry Cordial", "Fruit Liqueur"],
      technical: ["Aroma grouping", "Anthocyanin cues", "Cooked vs fresh fruit", "Sensory calibration"]
    },
    {
      id: "blackberry",
      commodity: "fruit",
      name: "Blackberry",
      family: "Black aggregate berry",
      beverage: "juice, country wine, beer additions, liqueur, and eau-de-vie",
      origin: "Temperate bramble fruit traditions across Europe and North America.",
      role: "Blackberry contributes dark bramble fruit, seed tannin, color, and earthy depth.",
      notes: ["blackberry", "bramble", "dark jam", "seed tannin", "earth"],
      styles: ["Blackberry Wine", "Fruit Beer", "Blackberry Liqueur", "Bramble Syrup"],
      technical: ["Bramble phenolics", "Seed extraction", "Color stability", "Acid balance"]
    },
    {
      id: "black-cherry",
      commodity: "fruit",
      name: "Black Cherry",
      family: "Dark cherry sensory fruit",
      beverage: "juice, fruit wine, liqueur, kirsch-style spirits, and sensory education",
      origin: "Dark sweet and sour cherry beverage traditions.",
      role: "Black cherry gives deeper cherry aroma, darker color, softer sweetness, and pit-kernel nuance.",
      notes: ["black cherry", "dark red fruit", "almond pit", "sweet spice", "soft acid"],
      styles: ["Black Cherry Juice", "Cherry Liqueur", "Kirsch", "Fruit Wine"],
      technical: ["Pit management", "Anthocyanins", "Sweet-sour balance", "Kernel aroma"]
    },
    {
      id: "blackcurrant",
      commodity: "fruit",
      name: "Blackcurrant",
      family: "Aromatic black berry",
      beverage: "juice, cordial, cassis liqueur, fruit wine, and sensory training",
      origin: "European Ribes fruit tradition with strong cordial and cassis use.",
      role: "Blackcurrant brings cassis, green leaf, high acid, deep color, and powerful aroma.",
      notes: ["cassis", "blackcurrant", "green leaf", "tart skin", "dark berry"],
      styles: ["Creme de Cassis", "Blackcurrant Cordial", "Fruit Wine"],
      technical: ["Thiols", "Acid management", "Skin extraction", "Cordial concentration"]
    },
    {
      id: "black-plum",
      commodity: "fruit",
      name: "Black Plum",
      family: "Dark stone fruit",
      beverage: "juice, plum wine, slivovitz-style spirits, liqueur, and sensory training",
      origin: "Dark plum cultivars from Eurasian stone-fruit traditions.",
      role: "Black plum adds dark flesh, soft tannin, ripe sweetness, and deep stone-fruit aroma.",
      notes: ["black plum", "dark flesh", "ripe skin", "jam", "soft spice"],
      styles: ["Plum Wine", "Slivovitz", "Plum Liqueur", "Fruit Nectar"],
      technical: ["Pit handling", "Pectin", "Fermentable sugar", "Skin phenolics"]
    },
    {
      id: "blackcurrant-style-berry",
      commodity: "fruit",
      name: "Blackcurrant-Style Berry",
      family: "Cassis sensory reference",
      beverage: "wine education, cordials, liqueurs, and sensory calibration",
      origin: "Composite cassis-like berry reference for beverage tasting vocabulary.",
      role: "Blackcurrant-style berry notes anchor cassis, dark berry, herbal leaf, and tart skin impressions.",
      notes: ["cassis", "black berry", "green leaf", "tart skin", "dark cordial"],
      styles: ["Sensory Standard", "Berry Cordial", "Cassis Liqueur"],
      technical: ["Sensory calibration", "Green aroma", "Berry phenolics", "Aroma grouping"]
    },
    {
      id: "citrus",
      commodity: "fruit",
      name: "Citrus",
      family: "Acid fruit family",
      beverage: "juice, cordials, liqueurs, cocktails, and botanical spirits",
      origin: "South and East Asian citrus domestication with global subtropical spread.",
      role: "Citrus provides acid, peel oil, bitterness, and high-impact aroma.",
      notes: ["lime", "lemon", "orange peel", "grapefruit", "pith bitterness"],
      styles: ["Orange Juice", "Limoncello", "Triple Sec", "Citrus Cordial"],
      technical: ["Citric acid", "Zest oils", "Pith bitterness", "Juice stability"]
    },
    {
      id: "lemon",
      commodity: "fruit",
      name: "Lemon",
      family: "High-acid citrus",
      beverage: "juice, lemonade, sour cocktails, limoncello, cordials, and botanical spirits",
      origin: "South and West Asian citrus ancestry with Mediterranean beverage importance.",
      role: "Lemon provides sharp citric acid, bright peel oil, and clean sour balance.",
      notes: ["lemon", "zest", "citric acid", "pith", "fresh peel"],
      styles: ["Lemonade", "Whiskey Sour", "Limoncello", "Lemon Cordial"],
      technical: ["Citric acid", "Zest oil", "Pith bitterness", "Juice oxidation"]
    },
    {
      id: "lime",
      commodity: "fruit",
      name: "Lime",
      family: "Green high-acid citrus",
      beverage: "juice, cocktails, cordials, beer adjuncts, and tropical spirits",
      origin: "Tropical Asian citrus lineage with global cocktail importance.",
      role: "Lime contributes piercing acid, green peel oil, and tropical drink freshness.",
      notes: ["lime", "green zest", "citric snap", "pith", "tropical freshness"],
      styles: ["Daiquiri", "Margarita", "Lime Cordial", "Gose Adjunct"],
      technical: ["Acid balance", "Essential oils", "Juice stability", "Oxidation"]
    },
    {
      id: "grapefruit",
      commodity: "fruit",
      name: "Grapefruit",
      family: "Bitter aromatic citrus",
      beverage: "juice, soda, cocktails, radler, liqueur, and botanical spirits",
      origin: "Caribbean citrus hybrid tradition.",
      role: "Grapefruit adds bittersweet citrus, peel oil, pith bitterness, and pink-fruit lift.",
      notes: ["grapefruit", "pink citrus", "pith bitterness", "zest", "tang"],
      styles: ["Paloma", "Grapefruit Soda", "Radler", "Citrus Liqueur"],
      technical: ["Naringin", "Zest oil", "Bitterness", "Acid-sugar balance"]
    },
    {
      id: "orange",
      commodity: "fruit",
      name: "Orange",
      family: "Sweet citrus",
      beverage: "juice, cocktails, triple sec, bitters, liqueur, and spirits flavoring",
      origin: "East and South Asian citrus domestication with global juice and liqueur use.",
      role: "Orange brings sweet citrus, peel oil, moderate acid, and familiar fruit warmth.",
      notes: ["orange", "sweet peel", "juice", "marmalade", "blossom"],
      styles: ["Orange Juice", "Triple Sec", "Curacao", "Orange Bitters"],
      technical: ["Peel oil", "Brix-acid ratio", "Marmalade note", "Juice stability"]
    },
    {
      id: "mandarin",
      commodity: "fruit",
      name: "Mandarin",
      family: "Perfumed easy-peel citrus",
      beverage: "juice, liqueur, cocktail modifiers, and aromatic citrus infusions",
      origin: "East Asian mandarin citrus tradition.",
      role: "Mandarin gives sweet peel perfume, soft acid, and vivid orange-citrus aroma.",
      notes: ["mandarin", "tangerine peel", "sweet citrus", "floral", "soft acid"],
      styles: ["Mandarin Juice", "Mandarin Liqueur", "Citrus Syrup"],
      technical: ["Peel perfume", "Low bitterness", "Brix-acid ratio", "Aroma retention"]
    },
    {
      id: "yuzu",
      commodity: "fruit",
      name: "Yuzu",
      family: "Aromatic East Asian citrus",
      beverage: "juice, ponzu-inspired cocktails, liqueur, gin, sake drinks, and cordials",
      origin: "East Asian citrus tradition, especially Japan and Korea.",
      role: "Yuzu contributes intense floral citrus, sour snap, mandarin-grapefruit complexity, and peel perfume.",
      notes: ["yuzu", "floral citrus", "mandarin", "grapefruit", "zest"],
      styles: ["Yuzu Liqueur", "Yuzu Sour", "Citrus Cordial", "Gin Botanical"],
      technical: ["Aromatic peel oil", "High acid", "Volatile retention", "Cold extraction"]
    },
    {
      id: "stone-fruit",
      commodity: "fruit",
      name: "Stone Fruit",
      family: "Drupe fruit family",
      beverage: "nectar, fruit wine, liqueur, brandy, and eau-de-vie",
      origin: "Broad Eurasian and Mediterranean domestication.",
      role: "Stone fruits supply ripe flesh aroma, kernel nuance, and expressive spirit bases.",
      notes: ["peach", "apricot", "plum", "almond kernel", "ripe flesh"],
      styles: ["Apricot Nectar", "Plum Wine", "Slivovitz", "Peach Brandy"],
      technical: ["Pit management", "Pectin", "Kernel character", "Fermentation nutrition"]
    },
    {
      id: "asian-pear",
      commodity: "fruit",
      name: "Asian Pear",
      family: "Crisp pome fruit",
      beverage: "juice, perry-like ferments, fruit wine, liqueur, and distillates",
      origin: "East Asian pear cultivation.",
      role: "Asian pear brings crisp water-like freshness, gentle perfume, and clean pome-fruit sweetness.",
      notes: ["asian pear", "crisp pear", "white flesh", "floral", "soft acid"],
      styles: ["Asian Pear Juice", "Pear Wine", "Pear Liqueur"],
      technical: ["Sorbitol", "Low phenolics", "Delicate aroma", "Juice clarity"]
    },
    {
      id: "baked-apple",
      commodity: "fruit",
      name: "Baked Apple",
      family: "Cooked pome fruit marker",
      beverage: "cider, apple brandy, aged spirits, dessert wines, and sensory education",
      origin: "Cooked apple reference used in beverage tasting and maturation vocabulary.",
      role: "Baked apple teaches cooked-fruit, oxidation, spice, and maturation-linked apple character.",
      notes: ["baked apple", "cinnamon", "honey", "caramel", "soft acid"],
      styles: ["Aged Cider", "Calvados", "Apple Liqueur", "Dessert Wine"],
      technical: ["Thermal aroma", "Oxidation", "Maillard-like notes", "Maturation markers"]
    },
    {
      id: "peach",
      commodity: "fruit",
      name: "Peach",
      family: "Soft stone fruit",
      beverage: "nectar, fruit wine, bellini-style drinks, liqueur, and brandy",
      origin: "Chinese stone-fruit domestication with global beverage use.",
      role: "Peach contributes plush flesh, floral perfume, soft acid, and nectar sweetness.",
      notes: ["peach", "fuzzy skin", "nectar", "blossom", "soft flesh"],
      styles: ["Peach Nectar", "Bellini", "Peach Wine", "Peach Brandy"],
      technical: ["Pectin", "Pit handling", "Aroma fragility", "Acid adjustment"]
    },
    {
      id: "apricot",
      commodity: "fruit",
      name: "Apricot",
      family: "Orange stone fruit",
      beverage: "nectar, fruit wine, liqueur, brandy, and sensory calibration",
      origin: "Central and East Asian stone-fruit tradition.",
      role: "Apricot brings dried-orange fruit, kernel nuance, floral lift, and rich nectar texture.",
      notes: ["apricot", "dried apricot", "kernel", "honey", "orange flesh"],
      styles: ["Apricot Nectar", "Apricot Liqueur", "Apricot Brandy", "Fruit Wine"],
      technical: ["Kernel aroma", "Pectin", "Drying concentration", "Aroma extraction"]
    },
    {
      id: "plum",
      commodity: "fruit",
      name: "Plum",
      family: "Purple stone fruit",
      beverage: "juice, plum wine, slivovitz, liqueur, and fruit beer",
      origin: "Eurasian plum cultivation and distilling traditions.",
      role: "Plum gives ripe flesh, skin tannin, deep color, and brandy-friendly fermentable sugar.",
      notes: ["plum", "purple skin", "ripe flesh", "sweet spice", "pit"],
      styles: ["Plum Wine", "Slivovitz", "Plum Liqueur", "Fruit Beer"],
      technical: ["Pit management", "Pectin", "Skin phenolics", "Fermentation nutrition"]
    },
    {
      id: "nectarine",
      commodity: "fruit",
      name: "Nectarine",
      family: "Smooth-skinned stone fruit",
      beverage: "nectar, fruit wine, cocktails, liqueur, and aromatic infusions",
      origin: "Peach-family mutation with global orchard cultivation.",
      role: "Nectarine gives bright stone-fruit aroma, smooth skin character, and cleaner acid than peach.",
      notes: ["nectarine", "yellow flesh", "bright stone fruit", "floral", "clean acid"],
      styles: ["Nectarine Nectar", "Fruit Wine", "Nectarine Liqueur"],
      technical: ["Aroma retention", "Pectin", "Acid balance", "Skin handling"]
    },
    {
      id: "white-peach",
      commodity: "fruit",
      name: "White Peach",
      family: "Perfumed pale stone fruit",
      beverage: "nectar, fruit wine, cocktails, liqueur, and sensory education",
      origin: "Asian and Mediterranean peach cultivation traditions.",
      role: "White peach brings delicate perfume, pale flesh sweetness, low acid, and floral stone-fruit lift.",
      notes: ["white peach", "blossom", "pale flesh", "nectar", "soft acid"],
      styles: ["White Peach Nectar", "Bellini", "Peach Liqueur", "Fruit Wine"],
      technical: ["Low acid", "Aroma fragility", "Pectin", "Oxidation control"]
    },
    {
      id: "cherry",
      commodity: "fruit",
      name: "Cherry",
      family: "Red drupe fruit",
      beverage: "juice, lambic fruit beer, liqueur, kirsch, and fruit wine",
      origin: "Eurasian cherry cultivation.",
      role: "Cherry brings red fruit, acid, almond-kernel nuance, and vivid color.",
      notes: ["red cherry", "sour cherry", "almond", "floral", "bright acid"],
      styles: ["Kirsch", "Kriek", "Cherry Juice", "Cherry Liqueur"],
      technical: ["Sour cherry", "Pit aroma", "Anthocyanins", "Fruit beer refermentation"]
    },
    {
      id: "tropical-fruit",
      commodity: "fruit",
      name: "Tropical Fruit",
      family: "High-aroma warm-climate fruit",
      beverage: "juice, nectar, fruit wine, rum infusions, and tropical liqueurs",
      origin: "Multiple tropical regions across Asia, Africa, Oceania, and the Americas.",
      role: "Tropical fruit gives strong aroma, soft acidity, and vivid sweetness perception.",
      notes: ["mango", "pineapple", "passion fruit", "guava", "ripe banana"],
      styles: ["Tropical Juice", "Fruit Nectar", "Passion Fruit Liqueur", "Mango Wine"],
      technical: ["Volatile aromatics", "Pectin", "Acid adjustment", "Heat sensitivity"]
    },
    {
      id: "mango",
      commodity: "fruit",
      name: "Mango",
      family: "Rich tropical fruit",
      beverage: "nectar, juice blends, fruit wine, liqueur, rum drinks, and smoothies",
      origin: "South Asian tropical fruit domestication.",
      role: "Mango brings lush tropical flesh, resinous peel nuance, low-to-moderate acid, and thick texture.",
      notes: ["mango", "tropical flesh", "resin", "nectar", "orange fruit"],
      styles: ["Mango Nectar", "Mango Lassi", "Mango Wine", "Mango Liqueur"],
      technical: ["Pulp viscosity", "Pectin", "Acid adjustment", "Heat sensitivity"]
    },
    {
      id: "pineapple",
      commodity: "fruit",
      name: "Pineapple",
      family: "Tropical acid fruit",
      beverage: "juice, tepache, fruit wine, rum drinks, and liqueurs",
      origin: "South American tropical domestication.",
      role: "Pineapple combines high acid, tropical aroma, and fermentation-friendly sugar.",
      notes: ["pineapple", "tropical acid", "caramelized fruit", "green core", "honey"],
      styles: ["Pineapple Juice", "Tepache", "Pineapple Wine", "Pineapple Rum"],
      technical: ["Bromelain", "Acid balance", "Skin fermentation", "Aroma retention"]
    },
    {
      id: "passion-fruit",
      commodity: "fruit",
      name: "Passion Fruit",
      family: "High-acid tropical fruit",
      beverage: "juice, nectar, cocktails, liqueur, fruit wine, and tropical spirits",
      origin: "South American Passiflora fruit tradition.",
      role: "Passion fruit supplies piercing tropical acid, perfume, seed crunch, and high-impact aroma.",
      notes: ["passion fruit", "tropical acid", "guava", "floral", "seed"],
      styles: ["Passion Fruit Juice", "Porn Star Martini", "Fruit Liqueur", "Tropical Wine"],
      technical: ["High acidity", "Seed handling", "Aroma volatility", "Pulp separation"]
    },
    {
      id: "guava",
      commodity: "fruit",
      name: "Guava",
      family: "Perfumed tropical fruit",
      beverage: "nectar, juice blends, fruit wine, liqueur, and tropical cocktails",
      origin: "Tropical American fruit with broad global cultivation.",
      role: "Guava adds musky tropical perfume, pink flesh sweetness, and moderate acidity.",
      notes: ["guava", "pink tropical fruit", "musk", "floral", "nectar"],
      styles: ["Guava Nectar", "Guava Juice", "Fruit Wine", "Guava Liqueur"],
      technical: ["Pectin", "Aroma extraction", "Seed removal", "Acid balance"]
    },
    {
      id: "papaya",
      commodity: "fruit",
      name: "Papaya",
      family: "Soft tropical fruit",
      beverage: "nectar, smoothies, juice blends, liqueur, and tropical infusions",
      origin: "Tropical American fruit with broad equatorial cultivation.",
      role: "Papaya contributes soft melon-like flesh, low acid, musky tropical sweetness, and texture.",
      notes: ["papaya", "melon", "soft tropical fruit", "musk", "orange flesh"],
      styles: ["Papaya Nectar", "Smoothie", "Papaya Liqueur", "Tropical Juice"],
      technical: ["Papain", "Low acidity", "Pulp viscosity", "Oxidation"]
    },
    {
      id: "ripe-banana",
      commodity: "fruit",
      name: "Ripe Banana",
      family: "Starchy tropical fruit",
      beverage: "smoothies, liqueur, banana wine, rum infusions, and sensory education",
      origin: "Southeast Asian banana domestication with global tropical production.",
      role: "Ripe banana gives isoamyl-like aroma, creamy texture, sweetness, and tropical ester references.",
      notes: ["ripe banana", "banana ester", "cream", "tropical sweetness", "soft spice"],
      styles: ["Banana Liqueur", "Banana Wine", "Smoothie", "Rum Infusion"],
      technical: ["Isoamyl acetate", "Starch conversion", "Pulp handling", "Oxidation"]
    },
    {
      id: "pomegranate",
      commodity: "fruit",
      name: "Pomegranate",
      family: "Tannin-rich seeded fruit",
      beverage: "juice, grenadine, fruit wine, and liqueur",
      origin: "Iranian plateau and broader West/Central Asian domestication.",
      role: "Pomegranate contributes tart red fruit, tannin, color, and sweet-sour structure.",
      notes: ["tart red fruit", "cranberry", "tannin", "ruby color", "dry finish"],
      styles: ["Pomegranate Juice", "Grenadine", "Fruit Wine", "Liqueur"],
      technical: ["Tannin management", "Color stability", "Acid-sugar balance", "Seed extraction"]
    },
    {
      id: "quince",
      commodity: "fruit",
      name: "Quince",
      family: "Aromatic pome fruit",
      beverage: "juice blends, fruit wine, liqueur, and brandy",
      origin: "Caucasus and West Asian pome fruit tradition.",
      role: "Quince adds perfume, tannic grip, and honeyed floral complexity.",
      notes: ["quince paste", "rose", "honey", "pear skin", "tannin"],
      styles: ["Quince Liqueur", "Fruit Wine", "Quince Brandy", "Juice Blend"],
      technical: ["Astringency", "Pectin", "Aroma extraction", "Blending acidity"]
    }
  ]
].map((seed) => buildExpansionStudy(seed as CommodityExpansionSeed));

export const commodityStudyProfiles = [...studies, ...expansionStudies].map(withDefaultCommodityMedia);

export const commodityStudyProfilesByCommodity: Record<CommodityId, CommodityStudyProfile[]> = {
  grains: commodityStudyProfiles.filter((item) => item.commodity === "grains"),
  hops: commodityStudyProfiles.filter((item) => item.commodity === "hops"),
  coffee: commodityStudyProfiles.filter((item) => item.commodity === "coffee"),
  tea: commodityStudyProfiles.filter((item) => item.commodity === "tea"),
  fruit: commodityStudyProfiles.filter((item) => item.commodity === "fruit")
};

export const commodityStudyByCommodityAndId = new Map(commodityStudyProfiles.map((item) => [`${item.commodity}/${item.id}`, item]));
