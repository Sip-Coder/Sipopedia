export type LivingPalateGuideId = "sippy" | "roma" | "hummin";

export type LivingPalatePhaseId =
  | "recall"
  | "sense"
  | "contrast"
  | "explain"
  | "serve"
  | "return";

export type LivingPalateSpecimenId = "wine" | "coffee" | "beer" | "tea" | "water";

export type LivingPalateChoice = {
  id: string;
  label: string;
  feedback: string;
  preferred?: boolean;
};

export type LivingPalateDistrict = {
  id: string;
  name: string;
  shortName: string;
  guide: LivingPalateGuideId;
  purpose: string;
  acidityFeature: string;
  signal: string;
  stepIndex: number;
  mapX: number;
  mapY: number;
  mapMobileX: number;
  mapMobileY: number;
};

export type LivingPalateIntroRoute = {
  id: "compare" | "serve" | "reflect";
  label: string;
  location: string;
  districtId?: LivingPalateDistrict["id"];
  stepIndex: number;
};

export type LivingPalateSpecimen = {
  id: LivingPalateSpecimenId;
  domain: string;
  title: string;
  subtitle: string;
  icon: "wine" | "coffee" | "beer" | "tea" | "water";
  accent: string;
  observationCue: string;
  learningClaim: string;
  setup: string;
  dryLab: string;
  sourceIds: string[];
  scales: Array<{ id: string; label: string }>;
  contrastPrompt: string;
  contrastChoices: LivingPalateChoice[];
  contrastReveal: string;
  explanationPrompt: string;
  explanation: string;
  serviceScenario: string;
  serviceChoices: LivingPalateChoice[];
};

export type LivingPalateMasteryNode = {
  id: string;
  phaseId: LivingPalatePhaseId;
  label: string;
  detail: string;
};

export type LivingPalateSource = {
  id: string;
  title: string;
  organization: string;
  year: string;
  url: string;
  note: string;
  policy: "cite" | "link";
};

export type LivingPalatePhase = {
  id: LivingPalatePhaseId;
  title: string;
  eyebrow: string;
  guide: LivingPalateGuideId;
  guideLine: string;
  prompt: string;
  successEvidence: string;
  image: string;
  imageSmall: string;
  imageAlt: string;
};

export const LIVING_PALATE_GUIDES = {
  sippy: {
    name: "Sippy",
    role: "Pathfinder",
    line: "I turn what you notice into a better decision for the person in front of you.",
    image: "/beyond-the-glass/guides/animated/sippy-still.png"
  },
  roma: {
    name: "Roma",
    role: "Flavor Detective",
    line: "I slow the first impression down until the useful clue becomes visible.",
    image: "/beyond-the-glass/guides/animated/roma-still.png"
  },
  hummin: {
    name: "Hummin",
    role: "Evidence Keeper",
    line: "I keep measurement, memory, source, and uncertainty from impersonating one another.",
    image: "/beyond-the-glass/guides/animated/hummin-still.png"
  }
} satisfies Record<LivingPalateGuideId, { name: string; role: string; line: string; image: string }>;

export const LIVING_PALATE_DISTRICTS: LivingPalateDistrict[] = [
  {
    id: "origin",
    name: "Origin Observatory",
    shortName: "Origin",
    guide: "hummin",
    purpose: "Trace a sensory clue backward through ingredient, place, process, and evidence.",
    acidityFeature: "See why pH, total acidity, acid family, temperature, and perception are related—but not interchangeable.",
    signal: "Cause before conclusion",
    stepIndex: 3,
    mapX: 24,
    mapY: 22,
    mapMobileX: 22,
    mapMobileY: 19
  },
  {
    id: "sensory",
    name: "Sensory Studio",
    shortName: "Sense",
    guide: "roma",
    purpose: "Record observation before identity, explanation, or preference.",
    acidityFeature: "Separate sour intensity, mouthwatering, prickling, timing, weight, and personal liking.",
    signal: "Observe without guessing",
    stepIndex: 1,
    mapX: 56,
    mapY: 18,
    mapMobileX: 67,
    mapMobileY: 19
  },
  {
    id: "contrast",
    name: "Contrast Table",
    shortName: "Contrast",
    guide: "roma",
    purpose: "Learn diagnostic differences through deliberate near-neighbor comparisons.",
    acidityFeature: "Compare wine, coffee, beer, tea ferment, and carbonated water without forcing one vocabulary on every category.",
    signal: "Find the clue that matters",
    stepIndex: 2,
    mapX: 85,
    mapY: 31,
    mapMobileX: 86,
    mapMobileY: 38
  },
  {
    id: "service",
    name: "Service Theatre",
    shortName: "Serve",
    guide: "sippy",
    purpose: "Turn technical understanding into a warm, responsible guest decision.",
    acidityFeature: "Translate bright, sour, sharp, lively, and refreshing without correcting the guest.",
    signal: "Precision in service of people",
    stepIndex: 4,
    mapX: 82,
    mapY: 64,
    mapMobileX: 80,
    mapMobileY: 68
  },
  {
    id: "commons",
    name: "Calibration Commons",
    shortName: "Commons",
    guide: "roma",
    purpose: "Compare private observations with a cohort distribution—never a public palate score.",
    acidityFeature: "See where cohort observations align, where they differ, and how liking remains personal.",
    signal: "Calibrate without conformity",
    stepIndex: 1,
    mapX: 48,
    mapY: 82,
    mapMobileX: 53,
    mapMobileY: 84
  },
  {
    id: "archive",
    name: "Source Archive",
    shortName: "Sources",
    guide: "hummin",
    purpose: "Expose sources, versions, uncertainty, and licensing behind every substantive reveal.",
    acidityFeature: "Open the evidence behind pH, titratable acidity, fermentation, sensory training, and transfer.",
    signal: "Claims carry receipts",
    stepIndex: 5,
    mapX: 20,
    mapY: 52,
    mapMobileX: 17,
    mapMobileY: 47
  }
];

export const LIVING_PALATE_INTRO_ROUTE: LivingPalateIntroRoute[] = [
  {
    id: "compare",
    label: "Compare",
    location: "At the Contrast Table",
    districtId: "contrast",
    stepIndex: 2
  },
  {
    id: "serve",
    label: "Serve",
    location: "At the Service Theatre",
    districtId: "service",
    stepIndex: 4
  },
  {
    id: "reflect",
    label: "Reflect",
    location: "Back at the Worldglass",
    stepIndex: 5
  }
];

export const LIVING_PALATE_PHASES: LivingPalatePhase[] = [
  {
    id: "recall",
    title: "Recall",
    eyebrow: "Start from memory",
    guide: "hummin",
    guideLine: "Uncertainty is useful information. Lock the first thought before the archive opens.",
    prompt: "What can acidity change besides how sour a beverage tastes?",
    successEvidence: "An independent attempt exists before any cue or reveal.",
    image: "/living-palate/worldglass-1600.webp",
    imageSmall: "/living-palate/worldglass-960.webp",
    imageAlt: "A crystal Worldglass linking wine, coffee, beer, tea ferment, and carbonated water through luminous sensory constellations"
  },
  {
    id: "sense",
    title: "Sense",
    eyebrow: "Observation before identity",
    guide: "roma",
    guideLine: "Describe first. Decide whether you like it later.",
    prompt: "Where do the target sensations appear, how intense are they, and how long do they last?",
    successEvidence: "Sensory description and personal liking remain separate.",
    image: "/living-palate/contrast-table-1600.webp",
    imageSmall: "/living-palate/contrast-table-960.webp",
    imageAlt: "Roma guiding a cross-beverage flight of wine, coffee, beer, tea ferment, and carbonated water"
  },
  {
    id: "contrast",
    title: "Contrast",
    eyebrow: "Find the diagnostic difference",
    guide: "roma",
    guideLine: "Do not chase the label. Find the sensory difference that changes your explanation.",
    prompt: "Which cue best separates this specimen from its near neighbor?",
    successEvidence: "A choice, an observed cue, and confidence are recorded before reveal.",
    image: "/living-palate/contrast-table-1600.webp",
    imageSmall: "/living-palate/contrast-table-960.webp",
    imageAlt: "Five beverage specimens arranged with blank field notes for a side-by-side contrast exercise"
  },
  {
    id: "explain",
    title: "Explain",
    eyebrow: "Connect cause to perception",
    guide: "hummin",
    guideLine: "Build the chain: source or process, measurable change, possible perception, responsible claim.",
    prompt: "What caused the difference—and what remains uncertain?",
    successEvidence: "The explanation distinguishes measurement from perception and avoids overclaiming.",
    image: "/living-palate/worldglass-1600.webp",
    imageSmall: "/living-palate/worldglass-960.webp",
    imageAlt: "The Worldglass connecting beverage chemistry, process, perception, and responsible interpretation"
  },
  {
    id: "serve",
    title: "Serve",
    eyebrow: "Translate for a person",
    guide: "sippy",
    guideLine: "Professional precision should make the guest experience easier, not heavier.",
    prompt: "Which response best serves the guest's stated intent?",
    successEvidence: "The decision respects context, disclosure, uncertainty, and hospitality.",
    image: "/living-palate/contrast-table-1600.webp",
    imageSmall: "/living-palate/contrast-table-960.webp",
    imageAlt: "A warm academy table where five beverage observations become practical service decisions"
  },
  {
    id: "return",
    title: "Return",
    eyebrow: "Make the learning durable",
    guide: "hummin",
    guideLine: "Confidence is a metacognitive signal, not mastery. Mark the concept for a later retrieval.",
    prompt: "How confidently could you explain this to a guest tomorrow?",
    successEvidence: "Confidence is stored separately and the concept is marked for a later retrieval.",
    image: "/beyond-the-glass/sip-academy-1600.webp",
    imageSmall: "/beyond-the-glass/sip-academy-960.webp",
    imageAlt: "The connected SIP Academy campus illuminated by blue canals at dawn"
  }
];

export const LIVING_PALATE_SPECIMENS: LivingPalateSpecimen[] = [
  {
    id: "wine",
    domain: "Wine",
    title: "The shape of wine acidity",
    subtitle: "Malic expression and a source-grounded malolactic counterpart",
    icon: "wine",
    accent: "#9b3958",
    observationCue: "Attack, mouthwatering, shape, finish",
    learningClaim: "Wine pH, titratable acidity, acid composition, and perceived sharpness are related but not interchangeable.",
    setup: "Compare two source-grounded simulated teaching profiles at matched temperature.",
    dryLab: "Reveal malic/lactic status, pH, TA, and production notes one layer at a time. No wine is required.",
    sourceIds: ["wset-sat", "oiv-total-acidity", "ucd-wine-ta", "awri-malic", "ucd-mlf", "awri-mlf"],
    scales: [
      { id: "acid", label: "Acidity intensity" },
      { id: "salivation", label: "Mouthwatering" },
      { id: "shape", label: "Sharp ↔ rounded" },
      { id: "liking", label: "Personal liking" }
    ],
    contrastPrompt: "Which profile feels more sharply acidic? Choose one—or preserve uncertainty—then name the cue.",
    contrastChoices: [
      { id: "a", label: "Profile A", feedback: "Lock the sensory evidence before opening the production key." },
      { id: "b", label: "Profile B", feedback: "Lock the sensory evidence before opening the production key." },
      { id: "unclear", label: "No reliable difference", feedback: "Uncertainty is valid when the method and confidence are recorded." }
    ],
    contrastReveal: "During malolactic conversion, bacteria convert malate to lactate and carbon dioxide. This generally lowers TA and raises pH, but tasting alone cannot confirm that MLF occurred.",
    explanationPrompt: "Complete the chain: production pathway or management → acid change → possible sensory consequence.",
    explanation: "During malolactic conversion, bacteria convert malate to lactate and carbon dioxide. This generally lowers TA and raises pH, but sensory effect depends on the wine matrix and other metabolites. Tasting alone cannot confirm that MLF occurred.",
    serviceScenario: "A guest asks for a refreshing white that is ‘not soft or buttery.’",
    serviceChoices: [
      { id: "intent", label: "Confirm what refreshing means, then offer a verified bright-acid style", preferred: true, feedback: "You translate the guest's words and support the recommendation with known evidence." },
      { id: "correct", label: "Correct the guest's vocabulary before recommending", feedback: "Technical precision should support hospitality, not become a barrier." },
      { id: "promise", label: "Name a grape and promise it always tastes that way", feedback: "Variety alone cannot guarantee acid profile or production treatment." }
    ]
  },
  {
    id: "coffee",
    domain: "Coffee",
    title: "Bright is not a number",
    subtitle: "Measured cup, perceived cup",
    icon: "coffee",
    accent: "#a56c3f",
    observationCue: "Sourness, sweetness, bitterness, finish",
    learningClaim: "In cited UC Davis work, perceived coffee sourness related more strongly to titratable acidity than pH; liking still varied.",
    setup: "Compare two source-grounded simulated brew records with temperature, TDS, pH, TA, and roast context.",
    dryLab: "Predict sourness from pH, then reveal TA and a sensory distribution to expose the limit of a single measure.",
    sourceIds: ["sca-cva", "ucd-coffee"],
    scales: [
      { id: "sour", label: "Sour intensity" },
      { id: "sweet", label: "Sweetness" },
      { id: "bitter", label: "Bitterness" },
      { id: "liking", label: "Personal liking" }
    ],
    contrastPrompt: "Which brew seems more sour, and does your liking move in the same direction?",
    contrastChoices: [
      { id: "a", label: "Brew A", feedback: "Compare your perception with the preparation record after locking the note." },
      { id: "b", label: "Brew B", feedback: "Compare your perception with the preparation record after locking the note." },
      { id: "same", label: "No clear difference", feedback: "A non-difference is useful when confidence and method are recorded." }
    ],
    contrastReveal: "pH, TA, TDS, roast, extraction, temperature, aroma, and the taster all contribute. No single measure is a sensory score.",
    explanationPrompt: "Why can two coffees with similar pH differ in perceived sourness?",
    explanation: "pH and titratable acidity measure different things. Strength, extraction, roast, temperature, aroma, and individual perception help determine how a brew feels.",
    serviceScenario: "A guest says, ‘This coffee tastes sour.’",
    serviceChoices: [
      { id: "listen", label: "Acknowledge it, ask what they prefer, check the brew, and offer an alternative", preferred: true, feedback: "You respect the perception while investigating a possible preparation issue." },
      { id: "lecture", label: "Explain that specialty coffee is supposed to taste acidic", feedback: "A lecture does not resolve the guest's experience." },
      { id: "score", label: "Say its quality score proves it cannot be sour", feedback: "Quality, description, and personal preference are different judgments." }
    ]
  },
  {
    id: "beer",
    domain: "Beer",
    title: "Sour by design—or not",
    subtitle: "Style intent changes the diagnosis",
    icon: "beer",
    accent: "#d29536",
    observationCue: "Tartness, bitterness, carbonation, vinegar cue",
    learningClaim: "Acidity may be intentional style expression or an unintended problem; process and context determine the judgment.",
    setup: "Compare a source-grounded simulated sour-style profile with a matched base-beer or style-appropriate reference.",
    dryLab: "Sort anonymized notes into intended style, needs context, or likely handling problem.",
    sourceIds: ["beer-sour-review", "aab-sour-beer", "iso-sensory"],
    scales: [
      { id: "sour", label: "Tart / sour" },
      { id: "bitter", label: "Bitterness" },
      { id: "carbonation", label: "Carbonation" },
      { id: "acetic", label: "Vinegar-like aroma" }
    ],
    contrastPrompt: "Which statement best fits after style intent is revealed?",
    contrastChoices: [
      { id: "context", label: "Sourness may be intended in one profile and a fault in another", preferred: true, feedback: "Style, process, handling, and intensity establish fit." },
      { id: "fault", label: "Any sourness means the beer is spoiled", feedback: "Many established and modern styles are intentionally acidic." },
      { id: "complex", label: "More sourness always means more complexity", feedback: "Intensity alone does not establish quality or complexity." }
    ],
    contrastReveal: "Lactic and acetic impressions can arise through different microbial and oxygen pathways. Species, strain, process, concentration, style, and production records matter.",
    explanationPrompt: "Build the chain: process pathway → acid family → possible expression.",
    explanation: "Some LAB pathways increase lactic acidity. Oxygen-dependent acetic-acid-bacteria activity can increase acetic acid and vinegar-like character. Species, strain, process, and concentration matter, so one descriptor cannot identify the organism or acid with certainty.",
    serviceScenario: "A guest returns a beer because it tastes sour, but the menu lists a sour style.",
    serviceChoices: [
      { id: "replace", label: "Acknowledge the mismatch, explain briefly, and offer a replacement", preferred: true, feedback: "Intentional style does not obligate a guest to like it." },
      { id: "refuse", label: "Refuse because the beer is technically correct", feedback: "Being correct is not the same as resolving the experience." },
      { id: "fault", label: "Call it defective without checking style or a control", feedback: "First distinguish intended expression from a genuine quality problem." }
    ]
  },
  {
    id: "tea",
    domain: "Tea ferment",
    title: "When tea becomes a ferment",
    subtitle: "A system changes together",
    icon: "tea",
    accent: "#5d8f68",
    observationCue: "Sourness, sweetness, astringency, carbonation",
    learningClaim: "Fermentation can add organic acids while residual sugar, aroma, and carbonation alter the total balance.",
    setup: "Compare source-grounded simulated plain-tea and kombucha records as a systems contrast, not a one-variable experiment.",
    dryLab: "Move through a batch timeline and predict pH, TA, residual sugar, and carbonation before reveal.",
    sourceIds: ["kombucha-review", "kombucha-sensory", "ttb-kombucha"],
    scales: [
      { id: "sour", label: "Sourness" },
      { id: "sweet", label: "Sweetness" },
      { id: "astringent", label: "Astringency" },
      { id: "carbonation", label: "Carbonation" }
    ],
    contrastPrompt: "What changed between tea and the fermented tea profile?",
    contrastChoices: [
      { id: "system", label: "Acids, sugar, aroma, and often carbonation changed together", preferred: true, feedback: "This is a fermentation system, not a one-variable proof." },
      { id: "ph", label: "Only pH changed", feedback: "Fermentation changes multiple chemical and sensory dimensions." },
      { id: "health", label: "The more sour profile is necessarily healthier", feedback: "Sensory intensity is not evidence for a health claim." }
    ],
    contrastReveal: "Time, temperature, culture, tea, sugar, and packaging alter the result. One product cannot define a whole category.",
    explanationPrompt: "Why can sweetness fall while sourness rises during fermentation?",
    explanation: "Yeasts and bacteria transform sugars and ethanol into multiple metabolites, including organic acids. Residual sugar changes over time, while retained carbonation depends strongly on vessel, packaging, and continued fermentation.",
    serviceScenario: "A guest wants alcohol-free, low-sweetness, and not sharply sour.",
    serviceChoices: [
      { id: "clarify", label: "Clarify the need, then check the label and verified producer information", preferred: true, feedback: "If alcohol or caffeine status is not disclosed, do not promise." },
      { id: "promise", label: "Promise every kombucha is alcohol-free and low-sugar", feedback: "Trace alcohol, caffeine, sugar, and carbonation vary." },
      { id: "health", label: "Recommend the sourest one as healthiest", feedback: "Do not turn intensity into a health claim." }
    ]
  },
  {
    id: "water",
    domain: "Carbonated water",
    title: "The sharpness of bubbles",
    subtitle: "Taste plus touch",
    icon: "water",
    accent: "#67d4e0",
    observationCue: "Sour impression, prickling, onset, decay",
    learningClaim: "Carbonation recruits sour-related taste signaling and oral somatosensation; prickling is not identical with simple sourness.",
    setup: "Compare matched still and carbonated water records at the same temperature.",
    dryLab: "Explore synchronized sensory timelines for still and carbonated water—no ingestion required.",
    sourceIds: ["carbonation-taste", "carbonation-psychophysics"],
    scales: [
      { id: "sour", label: "Sour impression" },
      { id: "prickle", label: "Prickling / tingling" },
      { id: "oral-sting", label: "Oral sting / irritation" },
      { id: "finish", label: "Sharp finish" }
    ],
    contrastPrompt: "Which evidence most directly identifies the carbonated profile?",
    contrastChoices: [
      { id: "prickle", label: "A stronger prickling or tingling sensation", preferred: true, feedback: "CO₂ contributes both taste-cell and somatosensory signals." },
      { id: "sweet", label: "Greater sweetness", feedback: "Sweetness is not the diagnostic contrast in matched plain waters." },
      { id: "color", label: "A darker color", feedback: "Plain carbonation does not require a color change." }
    ],
    contrastReveal: "Dissolved CO₂ participates in carbonic-acid chemistry at the taste surface and stimulates oral somatosensory pathways.",
    explanationPrompt: "Why can carbonated water seem sharp without citrus acid?",
    explanation: "Dissolved CO₂ contributes sour-related taste signaling and a distinct fizzy prickle. Taste and touch arrive together.",
    serviceScenario: "A guest asks for water that is ‘less acidic’ because they dislike the sharp feeling.",
    serviceChoices: [
      { id: "still", label: "Offer still water and confirm whether carbonation is the concern", preferred: true, feedback: "You solve the sensory request without arguing over terminology." },
      { id: "lecture", label: "Give a chemistry lesson before bringing water", feedback: "Technical knowledge should shorten friction, not create it." },
      { id: "same", label: "Say all water tastes the same", feedback: "Carbonation creates clear sensory differences." }
    ]
  }
];

export const LIVING_PALATE_SOURCES: LivingPalateSource[] = [
  { id: "retrieval", title: "Test-Enhanced Learning", organization: "Roediger & Karpicke", year: "2006", url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x", note: "Supports attempting retrieval before reveal.", policy: "cite" },
  { id: "spacing", title: "Distributed Practice in Verbal Recall Tasks", organization: "Cepeda et al.", year: "2006", url: "https://pubmed.ncbi.nlm.nih.gov/16719566/", note: "Supports separated return rather than massed review.", policy: "cite" },
  { id: "interleaving", title: "Why Interleaving Enhances Inductive Learning", organization: "Birnbaum et al.", year: "2013", url: "https://pubmed.ncbi.nlm.nih.gov/23138567/", note: "Supports diagnostic contrast among related examples.", policy: "cite" },
  { id: "iso-sensory", title: "ISO 8586:2023 — Sensory Assessors", organization: "ISO", year: "2023", url: "https://www.iso.org/standard/76667.html", note: "Official sensory assessor standard. Linked, not reproduced.", policy: "link" },
  { id: "wset-sat", title: "Systematic Approach to Tasting", organization: "WSET", year: "Accessed 2026", url: "https://www.wsetglobal.com/knowledge-centre/wset-systematic-approach-to-tasting-sat/", note: "Professional framework. Linked, not reproduced.", policy: "link" },
  { id: "sca-cva", title: "Coffee Value Assessment", organization: "Specialty Coffee Association", year: "Accessed 2026", url: "https://sca.coffee/value-assessment", note: "Supports separating descriptive and affective assessment.", policy: "link" },
  { id: "oiv-total-acidity", title: "Total Acidity — Official Method", organization: "International Organisation of Vine and Wine", year: "Accessed 2026", url: "https://www.oiv.int/standards/annex-a-methods-of-analysis-of-wines-and-musts/section-3-chemical-analysis/section-3-1-organic-compounds/section-3-1-3-acids/total-acidity-%28type-i%29", note: "Official analytical definition for wine total acidity; cross-category values require method and matrix context.", policy: "cite" },
  { id: "ucd-wine-ta", title: "Titratable Acidity", organization: "UC Davis Viticulture and Enology", year: "Accessed 2026", url: "https://wine.ucdavis.edu/industry-info/enology/methods-and-techniques/winery-lab-techniques/titratable-acidity", note: "Clarifies that TA and pH are distinct measurements.", policy: "cite" },
  { id: "awri-malic", title: "Measurement of Malic Acid in Wine", organization: "Australian Wine Research Institute", year: "Accessed 2026", url: "https://www.awri.com.au/industry_support/winemaking_resources/laboratory_methods/chemical/malic_acid/", note: "Supports measurement of malic acid in wine.", policy: "cite" },
  { id: "ucd-mlf", title: "Introduction to Malolactic Fermentation", organization: "UC Davis Viticulture and Enology", year: "Accessed 2026", url: "https://wine.ucdavis.edu/industry-info/enology/fermentation-management-guides/malolactic-fermenation/introduction", note: "Supports scoped malolactic-conversion chemistry and management claims.", policy: "cite" },
  { id: "awri-mlf", title: "Malolactic Fermentation", organization: "Australian Wine Research Institute", year: "Accessed 2026", url: "https://www.awri.com.au/wp-content/uploads/2011/06/Malolactic-fermentation.pdf", note: "Fact sheet on malolactic conversion, process, and wine effects.", policy: "cite" },
  { id: "ucd-coffee", title: "Titratable Acidity, Perceived Sourness, and Liking", organization: "Batali et al.", year: "2021", url: "https://doi.org/10.1021/acsfoodscitech.0c00078", note: "Supports scoped coffee pH, TA, sourness, and liking claims under the tested brew conditions.", policy: "cite" },
  { id: "beer-sour-review", title: "The Power of Sour — A Review", organization: "BrewingScience", year: "2019", url: "https://brewingscience.de/index.php/brewingscience/article/view/239", note: "Reviews intentional souring pathways.", policy: "cite" },
  { id: "aab-sour-beer", title: "Acetic Acid Bacteria in Sour Beer Production", organization: "De Roos et al.", year: "2022", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9386357/", note: "Reviews oxygen-dependent acetic-acid-bacteria activity in sour beer systems.", policy: "cite" },
  { id: "kombucha-review", title: "Kombucha Tea Fermentation: A Review", organization: "Tran et al.", year: "2020", url: "https://doi.org/10.1111/1541-4337.12574", note: "Reviews process variables in tea fermentation.", policy: "cite" },
  { id: "kombucha-sensory", title: "Sucrose Concentration and Fermentation Temperature Impact the Sensory Characteristics and Liking of Kombucha", organization: "Cohen, Sela & Nolden", year: "2023", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10453479/", note: "Supports process-to-sensory variation in the studied kombucha samples.", policy: "cite" },
  { id: "ttb-kombucha", title: "Kombucha General Requirements", organization: "Alcohol and Tobacco Tax and Trade Bureau", year: "Accessed 2026", url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/kombucha/general-requirements", note: "Explains how continued fermentation can affect alcohol content after packaging.", policy: "link" },
  { id: "carbonation-taste", title: "The Taste of Carbonation", organization: "Chandrashekar et al.", year: "2009", url: "https://pubmed.ncbi.nlm.nih.gov/19833970/", note: "Supports sour-related taste signaling from carbonation.", policy: "cite" },
  { id: "carbonation-psychophysics", title: "Oral Irritation by Carbonated Water", organization: "Simons et al.", year: "2019", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6782458/", note: "Supports human psychophysical context for carbonation prickle and oral irritation.", policy: "cite" }
];

export const LIVING_PALATE_MASTERY: LivingPalateMasteryNode[] = [
  { id: "retrieve", phaseId: "recall", label: "Retrieve independently", detail: "Attempt an answer before opening a cue." },
  { id: "see", phaseId: "sense", label: "See clearly", detail: "Separate observation from identity and liking." },
  { id: "compare", phaseId: "contrast", label: "Compare with confidence", detail: "Use diagnostic contrast and preserve uncertainty." },
  { id: "cause", phaseId: "explain", label: "Understand cause", detail: "Connect process and measurement to perception." },
  { id: "serve", phaseId: "serve", label: "Serve with purpose", detail: "Translate expertise into a useful response." },
  { id: "return", phaseId: "return", label: "Return & integrate", detail: "Mark the concept for a later retrieval." }
];

export const LIVING_PALATE_SAFETY = [
  "No alcohol, caffeine, or physical sample is required.",
  "Dry-lab mode provides an equivalent concept-and-decision path; firsthand sensory calibration requires a physical sample.",
  "Description and personal liking are stored separately.",
  "Confidence is a metacognitive signal—not a public score or mastery claim.",
  "Compare titratable acidity only within a documented method and beverage matrix.",
  "Professional frameworks are linked rather than reproduced.",
  "No health claim is inferred from sensory intensity."
] as const;
