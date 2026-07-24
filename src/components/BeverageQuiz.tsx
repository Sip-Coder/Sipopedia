import { useCallback, useEffect, useMemo, useState } from "react";
import { LearningSourcePanel } from "./LearningSourcePanel";
import { learningSourcePackForQuiz } from "../lib/learningSources";
import {
  readQuizProgressSnapshot,
  quizStudyLinksForTopic,
  saveQuizAttempt,
  type SavedQuizAttempt,
  type SavedQuizReviewQuestion,
  type SavedQuizWeakTopic
} from "../lib/quizProgress";

type ExamType = "CMS" | "WSET" | "SWE" | "Cicerone";
type QuizLength = 10 | 20 | 50 | 100;
type ExamDivision = "all" | "wine" | "spirits" | "sake" | "hospitality" | "beer";
type ExamLevel =
  | "all"
  | "cms-introductory"
  | "cms-certified"
  | "cms-advanced"
  | "cms-master"
  | "wset-level-1"
  | "wset-level-2"
  | "wset-level-3"
  | "wset-diploma"
  | "swe-hbsc"
  | "swe-csw"
  | "swe-css"
  | "swe-cwe"
  | "cicerone-cbs"
  | "cicerone-certified"
  | "cicerone-advanced"
  | "cicerone-master";

type Topic = {
  id: string;
  label: string;
  examTypes: ExamType[];
  aliases: string[];
};

type TopicFact = {
  promptSeed: string;
  answer: string;
  distractors: string[];
  teachingNote: string;
};

type QuizQuestion = {
  id: string;
  examType: ExamType;
  examLevel: ExamLevel;
  topicId: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  teachingNote: string;
};

type QuizReportRow = {
  question: QuizQuestion;
  selectedIndex: number | null;
  isCorrect: boolean;
};

type QuizDrillPreset = {
  id: string;
  label: string;
  audience: string;
  summary: string;
  examType: ExamType;
  examDivision: ExamDivision;
  examLevel: ExamLevel;
  topicId: string;
  length: QuizLength;
  sourceNote: string;
  actions: string[];
};

const EXAM_LABELS: Record<ExamType, string> = {
  CMS: "CMS (Court of Master Sommeliers)",
  WSET: "WSET",
  SWE: "SWE (Society of Wine Educators)",
  Cicerone: "Cicerone"
};

const EXAM_DIVISIONS: Record<ExamType, { value: ExamDivision; label: string }[]> = {
  CMS: [
    { value: "all", label: "CMS - All Divisions" },
    { value: "wine", label: "CMS - Wine" },
    { value: "spirits", label: "CMS - Spirits" },
    { value: "hospitality", label: "CMS - Service & Hospitality" }
  ],
  WSET: [
    { value: "all", label: "WSET - All Divisions" },
    { value: "wine", label: "WSET - Wine" },
    { value: "spirits", label: "WSET - Spirits" },
    { value: "sake", label: "WSET - Sake" }
  ],
  SWE: [
    { value: "all", label: "SWE - All Divisions" },
    { value: "wine", label: "SWE - Wine" },
    { value: "spirits", label: "SWE - Spirits" },
    { value: "hospitality", label: "SWE - Hospitality" }
  ],
  Cicerone: [
    { value: "all", label: "Cicerone - All Divisions" },
    { value: "beer", label: "Cicerone - Beer" },
    { value: "hospitality", label: "Cicerone - Service & Hospitality" }
  ]
};

const EXAM_LEVELS: Record<ExamType, { value: ExamLevel; label: string; lens: string }[]> = {
  CMS: [
    { value: "all", label: "CMS - All Levels", lens: "mixed CMS readiness" },
    { value: "cms-introductory", label: "CMS - Introductory Sommelier", lens: "foundational recall and professional vocabulary" },
    { value: "cms-certified", label: "CMS - Certified Sommelier", lens: "applied service, theory, and deductive tasting" },
    { value: "cms-advanced", label: "CMS - Advanced Sommelier", lens: "regional precision and cause-effect reasoning" },
    { value: "cms-master", label: "CMS - Master Sommelier", lens: "integrated mastery across theory, service, and blind tasting" }
  ],
  WSET: [
    { value: "all", label: "WSET - All Levels", lens: "mixed WSET readiness" },
    { value: "wset-level-1", label: "WSET - Level 1", lens: "basic product knowledge and tasting vocabulary" },
    { value: "wset-level-2", label: "WSET - Level 2", lens: "style recognition, production basics, and regional anchors" },
    { value: "wset-level-3", label: "WSET - Level 3", lens: "explain-style reasoning and production consequence" },
    { value: "wset-diploma", label: "WSET - Diploma", lens: "advanced synthesis, law, market context, and quality logic" }
  ],
  SWE: [
    { value: "all", label: "SWE - All Levels", lens: "mixed SWE readiness" },
    { value: "swe-hbsc", label: "SWE - HBSC", lens: "hospitality beverage foundations" },
    { value: "swe-csw", label: "SWE - CSW", lens: "wine theory, geography, and production" },
    { value: "swe-css", label: "SWE - CSS", lens: "spirits theory, production, and category law" },
    { value: "swe-cwe", label: "SWE - CWE", lens: "advanced wine education and applied analysis" }
  ],
  Cicerone: [
    { value: "all", label: "Cicerone - All Levels", lens: "mixed beer certification readiness" },
    { value: "cicerone-cbs", label: "Cicerone - Certified Beer Server", lens: "beer service, storage, and core style vocabulary" },
    { value: "cicerone-certified", label: "Cicerone - Certified Cicerone", lens: "beer styles, brewing, draught, and off-flavor diagnosis" },
    { value: "cicerone-advanced", label: "Cicerone - Advanced Cicerone", lens: "advanced technical brewing, sensory, and service judgment" },
    { value: "cicerone-master", label: "Cicerone - Master Cicerone", lens: "expert synthesis across beer theory, tasting, and service systems" }
  ]
};

const DIVISION_TOPIC_SCOPE: Record<ExamType, Record<ExamDivision, string[]>> = {
  CMS: {
    all: [],
    wine: ["viticulture", "vinification", "tasting", "sparkling", "fortified", "service", "storage"],
    spirits: ["spirits-core", "service", "storage", "tasting"],
    sake: ["service", "storage", "tasting"],
    hospitality: ["service", "storage", "tasting"],
    beer: []
  },
  WSET: {
    all: [],
    wine: ["viticulture", "vinification", "tasting", "sparkling", "fortified", "service", "storage"],
    spirits: ["spirits-core", "service", "storage", "tasting"],
    sake: ["service", "storage", "tasting"],
    hospitality: ["service", "storage", "tasting"],
    beer: []
  },
  SWE: {
    all: [],
    wine: ["viticulture", "vinification", "tasting", "sparkling", "fortified", "service", "storage"],
    spirits: ["spirits-core", "service", "storage", "tasting"],
    sake: ["service", "storage", "tasting"],
    hospitality: ["service", "storage", "tasting"],
    beer: []
  },
  Cicerone: {
    all: [],
    wine: [],
    spirits: [],
    sake: [],
    hospitality: ["service", "storage", "tasting", "beer-draught", "beer-off-flavors"],
    beer: ["beer-brewing", "beer-styles", "beer-draught", "beer-off-flavors", "service", "storage", "tasting"]
  }
};

const QUIZ_LENGTH_OPTIONS: QuizLength[] = [10, 20, 50, 100];
const CORE_QUESTION_TARGET_PER_EXAM = 5000;
const CATEGORY_DRILL_PRESETS: QuizDrillPreset[] = [
  {
    id: "beer-server",
    label: "Beer Server Sprint",
    audience: "Cicerone-style beer fundamentals",
    summary: "Launches a beer-focused quiz for style recognition, storage, and service readiness.",
    examType: "Cicerone",
    examDivision: "beer",
    examLevel: "cicerone-cbs",
    topicId: "beer-styles",
    length: 20,
    sourceNote: "Modeled around beer certification pressure: style language, service quality, and repeatable recall.",
    actions: ["Beer style recall", "Service vocabulary", "Fast team onboarding"]
  },
  {
    id: "draught-quality",
    label: "Draught Quality Sprint",
    audience: "Beer service and system checks",
    summary: "Targets draught system hygiene, pressure, carbonation, and pour-quality decisions.",
    examType: "Cicerone",
    examDivision: "beer",
    examLevel: "cicerone-certified",
    topicId: "beer-draught",
    length: 20,
    sourceNote: "Built for the practical beer gap: competitors make draught quality a real operational skill.",
    actions: ["Line-cleaning logic", "Pressure checks", "Foam diagnosis"]
  },
  {
    id: "off-flavor",
    label: "Off-Flavor Sprint",
    audience: "Beer sensory fault recognition",
    summary: "Forces focused recall on diacetyl, lightstrike, and defect language before service or tasting.",
    examType: "Cicerone",
    examDivision: "beer",
    examLevel: "cicerone-certified",
    topicId: "beer-off-flavors",
    length: 10,
    sourceNote: "Addresses the biggest beer-specific sensory gap versus Cicerone-style training.",
    actions: ["Fault vocabulary", "Cause-effect recall", "Guest-safe explanation"]
  },
  {
    id: "spirits-category",
    label: "Spirits Category Sprint",
    audience: "WSET-style spirits foundations",
    summary: "Centers distillation cuts, maturation, base materials, and category identity.",
    examType: "WSET",
    examDivision: "spirits",
    examLevel: "wset-level-1",
    topicId: "spirits-core",
    length: 20,
    sourceNote: "Moves spirits learners from broad quiz filters into a visible spirits-first practice lane.",
    actions: ["Distillation logic", "Maturation levers", "Category vocabulary"]
  },
  {
    id: "bar-service",
    label: "Bartender Service Sprint",
    audience: "BarSmarts/Diageo-style service practice",
    summary: "Trains the service sequence, guest language, and shift-ready hospitality decisions.",
    examType: "SWE",
    examDivision: "hospitality",
    examLevel: "swe-hbsc",
    topicId: "service",
    length: 10,
    sourceNote: "Turns bartender language from a homepage promise into a practice path inside the learning surface.",
    actions: ["Guest sequence", "Menu confidence", "Team pre-shift drill"]
  }
];
const COUNTRY_NAMES = [
  "France",
  "Italy",
  "Spain",
  "Portugal",
  "Germany",
  "Austria",
  "Greece",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Croatia",
  "Slovenia",
  "Serbia",
  "North Macedonia",
  "Switzerland",
  "Georgia",
  "Armenia",
  "Lebanon",
  "Israel",
  "Turkey",
  "Morocco",
  "Algeria",
  "Tunisia",
  "Egypt",
  "United States",
  "Canada",
  "Mexico",
  "Argentina",
  "Chile",
  "Uruguay",
  "Brazil",
  "Peru",
  "Bolivia",
  "Paraguay",
  "England",
  "Wales",
  "Scotland",
  "Ireland",
  "Belgium",
  "Netherlands",
  "Czech Republic",
  "Slovakia",
  "Moldova",
  "Ukraine",
  "Russia",
  "South Africa",
  "Australia",
  "New Zealand",
  "China",
  "Japan",
  "South Korea",
  "India",
  "Thailand",
  "Vietnam"
];

const BASE_TOPICS: Topic[] = [
  { id: "all", label: "All Topics", examTypes: ["CMS", "WSET", "SWE", "Cicerone"], aliases: [] },
  { id: "service", label: "Service", examTypes: ["CMS", "WSET", "SWE", "Cicerone"], aliases: ["tableside", "sequence"] },
  { id: "storage", label: "Storage & Cellar", examTypes: ["CMS", "WSET", "SWE", "Cicerone"], aliases: ["cellar", "temperature"] },
  { id: "viticulture", label: "Viticulture", examTypes: ["CMS", "WSET", "SWE"], aliases: ["vineyard", "canopy"] },
  { id: "vinification", label: "Vinification / Winemaking", examTypes: ["CMS", "WSET", "SWE"], aliases: ["fermentation", "elevage"] },
  { id: "tasting", label: "Tasting & Sensory", examTypes: ["CMS", "WSET", "SWE", "Cicerone"], aliases: ["deduction", "structure"] },
  { id: "sparkling", label: "Sparkling Wine", examTypes: ["CMS", "WSET", "SWE"], aliases: ["traditional method"] },
  { id: "fortified", label: "Fortified Wine", examTypes: ["CMS", "WSET", "SWE"], aliases: ["port", "sherry"] },
  { id: "spirits-core", label: "Spirits Core", examTypes: ["CMS", "WSET", "SWE"], aliases: ["distillation", "proof"] },
  { id: "beer-brewing", label: "Beer Brewing", examTypes: ["Cicerone"], aliases: ["malt", "mash", "fermentation"] },
  { id: "beer-styles", label: "Beer Styles", examTypes: ["Cicerone"], aliases: ["lager", "ale"] },
  { id: "beer-draught", label: "Draught Systems", examTypes: ["Cicerone"], aliases: ["draft", "line cleaning"] },
  { id: "beer-off-flavors", label: "Beer Off-Flavors", examTypes: ["Cicerone"], aliases: ["defects", "faults"] }
];

const COUNTRY_TOPICS: Topic[] = COUNTRY_NAMES.map((country) => ({
  id: `country-${slugify(country)}`,
  label: `Country Focus: ${country}`,
  examTypes: ["CMS", "WSET", "SWE", "Cicerone"],
  aliases: [country.toLowerCase(), "country"]
}));

const TOPICS = [...BASE_TOPICS, ...COUNTRY_TOPICS];
const TOPIC_MAP = new Map(TOPICS.map((topic) => [topic.id, topic]));

const TOPIC_FACTS: Record<string, TopicFact[]> = {
  service: [
    {
      promptSeed: "Correct still wine service sequence for formal dining",
      answer: "Present, open, host taste, then serve guests in order",
      distractors: [
        "Open before presenting and pour host full glass immediately",
        "Serve all guests first, then confirm bottle at the end",
        "Decant every bottle by default before host confirmation"
      ],
      teachingNote: "Exam scoring emphasizes clean sequence and guest verification before full pour."
    },
    {
      promptSeed: "Primary goal of host taste in wine service",
      answer: "Confirm bottle is sound and aligned to the order",
      distractors: [
        "Determine if the wine should be chilled with ice",
        "Let the host approve stemware shape before opening",
        "Allow host to compare multiple vintages from the table"
      ],
      teachingNote: "Host taste checks wine condition and order accuracy, not preference voting."
    }
  ],
  storage: [
    {
      promptSeed: "Why cellar temperature stability matters",
      answer: "It slows harmful swings in chemical and closure-related aging",
      distractors: [
        "It increases dissolved CO2 in all still wines",
        "It guarantees every bottle ages at identical speed",
        "It eliminates all oxidation risk even after opening"
      ],
      teachingNote: "Stability is more important than chasing an exact single number."
    },
    {
      promptSeed: "Best orientation for cork-finished long-term wine storage",
      answer: "Horizontal, to keep the cork humid and sealed",
      distractors: ["Vertical, to reduce sediment contact", "Upside down, to avoid ullage", "Any orientation because cork is inert"],
      teachingNote: "Dry corks can shrink and increase oxygen ingress risk."
    }
  ],
  viticulture: [
    {
      promptSeed: "Main practical goal of canopy management",
      answer: "Balance light, airflow, and ripening while reducing disease pressure",
      distractors: [
        "Increase berry size regardless of climate",
        "Prevent all water stress through leaf removal",
        "Eliminate the need for harvest-time sorting"
      ],
      teachingNote: "Canopy work is a quality and risk-control lever, not just yield manipulation."
    },
    {
      promptSeed: "Effect of excessive crop load near veraison",
      answer: "Delayed ripening and lower concentration per cluster",
      distractors: [
        "Higher anthocyanin extraction in all varieties",
        "Guaranteed higher acid retention in warm climates",
        "Immediate improvement in phenolic maturity"
      ],
      teachingNote: "Yield balance is a core exam concept in quality outcomes."
    }
  ],
  vinification: [
    {
      promptSeed: "Core purpose of controlled fermentation temperature in red wine",
      answer: "Manage extraction and preserve desired aroma profile",
      distractors: ["Increase residual sugar stability", "Replace need for pump-over decisions", "Eliminate sulfur dioxide requirements"],
      teachingNote: "Temperature directly affects rate, extraction kinetics, and aromatic retention."
    },
    {
      promptSeed: "What malolactic conversion generally changes in wine",
      answer: "Perceived acidity softens and texture can broaden",
      distractors: [
        "Alcohol concentration sharply increases",
        "Color becomes permanently darker",
        "Tannin is fully removed from the wine"
      ],
      teachingNote: "MLF is a style and stability decision, not a universal quality upgrade."
    }
  ],
  tasting: [
    {
      promptSeed: "Most defensible tasting exam approach",
      answer: "Use evidence-first deduction with structured checkpoints",
      distractors: [
        "Guess region first and backfill descriptors later",
        "Prioritize producer reputation over sensory data",
        "Score only intensity and ignore balance"
      ],
      teachingNote: "Exam rubrics reward transparent reasoning chains."
    },
    {
      promptSeed: "Key reason to separate fruit ripeness from oak influence",
      answer: "They can overlap in flavor but imply different production causes",
      distractors: [
        "Oak influence never appears in white wines",
        "Ripeness determines legal appellation status",
        "Both always increase total acidity"
      ],
      teachingNote: "Causal accuracy is crucial in higher-level tasting theory."
    }
  ],
  sparkling: [
    {
      promptSeed: "Traditional method sparkling secondary fermentation location",
      answer: "In bottle",
      distractors: ["In pressure tank", "In open fermenter", "In oak cask"],
      teachingNote: "Method identification appears across CMS/WSET/SWE."
    },
    {
      promptSeed: "Practical role of dosage in sparkling wine",
      answer: "Fine-tunes final sweetness and balance post-disgorgement",
      distractors: [
        "Creates primary mousse before tirage",
        "Replaces acid correction in base wine",
        "Determines legal vintage declaration"
      ],
      teachingNote: "Dosage can be small yet stylistically significant."
    }
  ],
  fortified: [
    {
      promptSeed: "Core production difference between Fino and Oloroso pathways",
      answer: "Biological aging under flor versus oxidative aging",
      distractors: [
        "Both require late-harvest botrytized fruit",
        "Both are always sweetened before bottling",
        "Oloroso must use carbonic maceration"
      ],
      teachingNote: "Aging pathway distinction is foundational for fortified exams."
    },
    {
      promptSeed: "Primary purpose of fortification in many classic styles",
      answer: "Stabilize the wine and shape sweetness/alcohol profile",
      distractors: [
        "Reduce total alcohol through dilution",
        "Suppress all volatile acidity formation",
        "Guarantee lower oxidation potential after opening"
      ],
      teachingNote: "Timing of spirit addition determines style outcome."
    }
  ],
  "spirits-core": [
    {
      promptSeed: "Key role of distillation cuts",
      answer: "Separate desired heart fraction from heads and tails",
      distractors: [
        "Increase mash enzyme activity",
        "Set final label age statement",
        "Eliminate need for maturation"
      ],
      teachingNote: "Cuts are quality-critical in spirit identity and cleanliness."
    },
    {
      promptSeed: "Why barrel char matters in whiskey maturation",
      answer: "It influences filtration effects and extraction of flavor compounds",
      distractors: [
        "It prevents all evaporation losses",
        "It fixes final proof before bottling",
        "It fully determines mash bill legality"
      ],
      teachingNote: "Wood treatment is a major style lever."
    }
  ],
  "beer-brewing": [
    {
      promptSeed: "Primary conversion objective in mashing",
      answer: "Convert starches into fermentable sugars",
      distractors: ["Maximize dissolved oxygen", "Sterilize finished beer", "Carbonate wort before boil"],
      teachingNote: "Mash conversion logic is central to Cicerone brewing questions."
    },
    {
      promptSeed: "What wort boiling most directly contributes",
      answer: "Isomerized bitterness, sterilization, and volatilization of undesired compounds",
      distractors: [
        "Final carbonation level control",
        "Yeast flocculation completion",
        "Cold-side oxygen scavenging"
      ],
      teachingNote: "Boil purpose is multi-factor and testable."
    }
  ],
  "beer-styles": [
    {
      promptSeed: "General fermentation profile distinction: ales vs lagers",
      answer: "Ales are typically warmer-fermented; lagers are cooler-fermented and conditioned",
      distractors: [
        "Lagers are top-fermented and ales are bottom-fermented",
        "Ales require adjuncts while lagers cannot use adjuncts",
        "Lagers are always darker than ales"
      ],
      teachingNote: "Style families are process plus sensory signatures."
    },
    {
      promptSeed: "Most useful first step in style diagnosis",
      answer: "Assess aroma, flavor, and structure against style-defining ranges",
      distractors: ["Prioritize package art", "Use ABV only", "Rank by bitterness alone"],
      teachingNote: "Cicerone style exams reward calibrated comparative evaluation."
    }
  ],
  "beer-draught": [
    {
      promptSeed: "Line cleaning significance in draught quality",
      answer: "Prevents flavor carryover, microbiological risk, and foam instability",
      distractors: [
        "Primarily increases ABV in keg beer",
        "Removes all dissolved oxygen from beer",
        "Allows any glassware to pour identically"
      ],
      teachingNote: "System hygiene is a major practical exam domain."
    },
    {
      promptSeed: "Most likely result of incorrect draft serving pressure",
      answer: "Foam and carbonation balance problems at pour",
      distractors: [
        "Color extraction shifts darker",
        "Hop alpha acids convert in-glass",
        "Immediate oxidation reversal"
      ],
      teachingNote: "Pressure-temperature-carbonation balance drives service consistency."
    }
  ],
  "beer-off-flavors": [
    {
      promptSeed: "What diacetyl is typically perceived as",
      answer: "Butter or butterscotch-like aroma/flavor",
      distractors: ["Green apple", "Smoky phenolic", "Wet cardboard only"],
      teachingNote: "Off-flavor recognition is a core Cicerone competency."
    },
    {
      promptSeed: "Classic marker of lightstruck beer",
      answer: "Skunky sulfur-like aroma",
      distractors: ["Lactic yogurt acidity", "Clove and banana esters", "Vanillin oak signature"],
      teachingNote: "Packaging and light exposure controls are practical quality topics."
    }
  ]
};

const COUNTRY_FACTS: TopicFact[] = [
  {
    promptSeed: "Core exam approach for country-specific study blocks",
    answer: "Anchor laws, climate, grape/style identity, and service relevance together",
    distractors: [
      "Memorize only producer names without context",
      "Focus only on export volume rankings",
      "Skip appellation structure to reduce complexity"
    ],
    teachingNote: "Country questions score best when legal, climate, and style logic are connected."
  },
  {
    promptSeed: "Most common weakness in country questions",
    answer: "Knowing names without linking them to style, climate, and regulation",
    distractors: [
      "Knowing too many grape synonyms",
      "Using too many examples in tasting notes",
      "Comparing too many service temperatures"
    ],
    teachingNote: "Exams reward applied context, not isolated memorization."
  }
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function shuffleWithSeed<T>(items: T[], seed: number) {
  const next = [...items];
  let state = seed >>> 0;
  for (let i = next.length - 1; i > 0; i -= 1) {
    state = (1664525 * state + 1013904223) >>> 0;
    const j = state % (i + 1);
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function optionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

function buildTopicFacts(topicId: string): TopicFact[] {
  if (topicId.startsWith("country-")) {
    const countryName = topicId.replace(/^country-/, "").split("-").map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`).join(" ");
    return COUNTRY_FACTS.map((fact) => ({
      ...fact,
      promptSeed: `${countryName}: ${fact.promptSeed}`
    }));
  }
  return TOPIC_FACTS[topicId] ?? [];
}

function levelLabel(examType: ExamType, examLevel: ExamLevel) {
  return EXAM_LEVELS[examType].find((entry) => entry.value === examLevel)?.label ?? "All Levels";
}

function levelLens(examType: ExamType, examLevel: ExamLevel) {
  return EXAM_LEVELS[examType].find((entry) => entry.value === examLevel)?.lens ?? "mixed readiness";
}

function buildPrompt(examType: ExamType, examLevel: ExamLevel, topic: Topic, fact: TopicFact, variant: number) {
  const examAlias = EXAM_LABELS[examType];
  const tierLabel = levelLabel(examType, examLevel);
  const tierLens = levelLens(examType, examLevel);
  const styles = [
    `(${tierLabel}) ${fact.promptSeed}. Which answer is most accurate?`,
    `${topic.label} exam drill for ${tierLabel}: select the best answer.`,
    `${examAlias} candidate check (${tierLens}) - ${fact.promptSeed}.`,
    `In ${tierLabel} prep, what is the strongest answer for this ${topic.label.toLowerCase()} question?`
  ];
  return styles[variant % styles.length];
}

function buildQuestionFromFact(examType: ExamType, examLevel: ExamLevel, topic: Topic, fact: TopicFact, variant: number, index: number): QuizQuestion {
  const seededOptions = shuffleWithSeed([fact.answer, ...fact.distractors], variant * 61 + index * 17 + topic.id.length + examLevel.length);
  const correctIndex = seededOptions.findIndex((option) => option === fact.answer);
  return {
    id: `${examType}-${examLevel}-${topic.id}-${slugify(fact.promptSeed)}-${variant}-${index}`,
    examType,
    examLevel,
    topicId: topic.id,
    prompt: buildPrompt(examType, examLevel, topic, fact, variant),
    options: seededOptions,
    correctIndex: correctIndex < 0 ? 0 : correctIndex,
    teachingNote: fact.teachingNote
  };
}

function matchesDivisionScope(examType: ExamType, division: ExamDivision, topicId: string) {
  if (division === "all") return true;
  if (topicId.startsWith("country-")) return true;
  const scope = DIVISION_TOPIC_SCOPE[examType][division] ?? [];
  return scope.includes(topicId);
}

function topicsForExam(examType: ExamType, division: ExamDivision) {
  return TOPICS.filter(
    (topic) =>
      topic.id !== "all" &&
      topic.examTypes.includes(examType) &&
      matchesDivisionScope(examType, division, topic.id)
  );
}

function buildCoreBankForExam(examType: ExamType, division: ExamDivision, examLevel: ExamLevel, target = CORE_QUESTION_TARGET_PER_EXAM) {
  const examTopics = topicsForExam(examType, division);
  if (examTopics.length === 0) return [];

  const bank: QuizQuestion[] = [];
  let variant = 0;

  while (bank.length < target) {
    for (const topic of examTopics) {
      if (bank.length >= target) break;
      const facts = buildTopicFacts(topic.id);
      if (facts.length === 0) continue;
      const fact = facts[(variant + bank.length) % facts.length];
      bank.push(buildQuestionFromFact(examType, examLevel, topic, fact, variant, bank.length));
      if (bank.length >= target) break;
    }
    variant += 1;
    if (variant > target * 2) break;
  }

  return bank.slice(0, target);
}

function chooseQuestions(
  bank: QuizQuestion[],
  length: QuizLength,
  examType: ExamType,
  examLevel: ExamLevel,
  topicId: string
) {
  const scoped = topicId === "all" ? bank : bank.filter((row) => row.topicId === topicId);
  const working = scoped.length > 0 ? scoped : bank;
  const seed = `${examType}-${examLevel}-${topicId}-${length}-${Date.now()}`;
  const shuffled = shuffleWithSeed(working, hashString(seed));
  return shuffled.slice(0, Math.min(length, shuffled.length));
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function questionLabel(index: number) {
  return `Q${String(index + 1).padStart(2, "0")}`;
}

function readPresetIdFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const query = window.location.hash.split("?")[1] ?? "";
  const value = new URLSearchParams(query).get("preset");
  return value?.trim() || null;
}

export function BeverageQuiz() {
  const [examType, setExamType] = useState<ExamType>("CMS");
  const [examDivision, setExamDivision] = useState<ExamDivision>("all");
  const [examLevel, setExamLevel] = useState<ExamLevel>("all");
  const [topicId, setTopicId] = useState("all");
  const [examLength, setExamLength] = useState<QuizLength>(20);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizProgress, setQuizProgress] = useState(() => readQuizProgressSnapshot());
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const examTopics = useMemo(
    () =>
      TOPICS.filter(
        (topic) =>
          topic.id === "all" ||
          (topic.examTypes.includes(examType) && matchesDivisionScope(examType, examDivision, topic.id))
      ),
    [examType, examDivision]
  );

  const coreBank = useMemo(() => buildCoreBankForExam(examType, examDivision, examLevel), [examType, examDivision, examLevel]);
  const topicLabel = TOPIC_MAP.get(topicId)?.label ?? "All Topics";
  const quizSourcePack = useMemo(() => learningSourcePackForQuiz(examType, topicId), [examType, topicId]);

  const launchPreset = useCallback((preset: QuizDrillPreset) => {
    const presetBank = buildCoreBankForExam(preset.examType, preset.examDivision, preset.examLevel);
    const next = chooseQuestions(presetBank, preset.length, preset.examType, preset.examLevel, preset.topicId);
    setExamType(preset.examType);
    setExamDivision(preset.examDivision);
    setExamLevel(preset.examLevel);
    setTopicId(preset.topicId);
    setExamLength(preset.length);
    setQuestions(next);
    setAnswers({});
    setShowAnswers(false);
    setActivePresetId(preset.id);
  }, []);

  const startQuickDiagnostic = () => {
    const diagnosticBank = buildCoreBankForExam("CMS", "all", "all");
    const next = chooseQuestions(diagnosticBank, 10, "CMS", "all", "all");
    setExamType("CMS");
    setExamDivision("all");
    setExamLevel("all");
    setTopicId("all");
    setExamLength(10);
    setQuestions(next);
    setAnswers({});
    setShowAnswers(false);
    setActivePresetId(null);
  };

  useEffect(() => {
    const applyHashPreset = () => {
      const presetId = readPresetIdFromHash();
      if (!presetId) return;
      const preset = CATEGORY_DRILL_PRESETS.find((item) => item.id === presetId);
      if (preset) launchPreset(preset);
    };

    applyHashPreset();
    window.addEventListener("hashchange", applyHashPreset);
    return () => window.removeEventListener("hashchange", applyHashPreset);
  }, [launchPreset]);

  const generateExam = () => {
    const next = chooseQuestions(coreBank, examLength, examType, examLevel, topicId);
    setActivePresetId(null);
    setQuestions(next);
    setAnswers({});
    setShowAnswers(false);
  };

  const generateFocusedExam = (nextTopicId: string) => {
    const next = chooseQuestions(coreBank, examLength, examType, examLevel, nextTopicId);
    setActivePresetId(null);
    setTopicId(nextTopicId);
    setQuestions(next);
    setAnswers({});
    setShowAnswers(false);
  };

  const reportRows = useMemo<QuizReportRow[]>(
    () =>
      questions.map((question) => {
        const selectedIndex = Object.prototype.hasOwnProperty.call(answers, question.id) ? answers[question.id] : null;
        return {
          question,
          selectedIndex,
          isCorrect: selectedIndex !== null && selectedIndex === question.correctIndex
        };
      }),
    [answers, questions]
  );

  const score = useMemo(() => {
    const answered = reportRows.filter((row) => row.selectedIndex !== null).length;
    const correct = reportRows.filter((row) => row.isCorrect).length;
    return { answered, correct };
  }, [reportRows]);

  const currentWeakTopics = useMemo<SavedQuizWeakTopic[]>(() => {
    const counts = new Map<string, SavedQuizWeakTopic>();
    reportRows.forEach((row) => {
      const topicLabel = TOPIC_MAP.get(row.question.topicId)?.label ?? row.question.topicId;
      const current = counts.get(row.question.topicId) ?? { id: row.question.topicId, label: topicLabel, missed: 0, total: 0, studyLinks: quizStudyLinksForTopic(row.question.topicId, topicLabel) };
      counts.set(row.question.topicId, {
        ...current,
        total: current.total + 1,
        missed: current.missed + (row.isCorrect ? 0 : 1),
        studyLinks: quizStudyLinksForTopic(row.question.topicId, topicLabel)
      });
    });
    return [...counts.values()]
      .filter((entry) => entry.missed > 0)
      .sort((a, b) => {
        const bRate = b.total ? b.missed / b.total : 0;
        const aRate = a.total ? a.missed / a.total : 0;
        return bRate - aRate || b.missed - a.missed;
      });
  }, [reportRows]);

  const currentReviewQuestions = useMemo<SavedQuizReviewQuestion[]>(
    () =>
      reportRows
        .filter((row) => !row.isCorrect)
        .map((row) => ({
          id: row.question.id,
          prompt: row.question.prompt,
          topicId: row.question.topicId,
          topicLabel: TOPIC_MAP.get(row.question.topicId)?.label ?? row.question.topicId,
          selectedAnswer: row.selectedIndex === null ? null : row.question.options[row.selectedIndex],
          correctAnswer: row.question.options[row.question.correctIndex],
          teachingNote: row.question.teachingNote,
          studyLinks: quizStudyLinksForTopic(row.question.topicId, TOPIC_MAP.get(row.question.topicId)?.label ?? row.question.topicId)
        })),
    [reportRows]
  );

  const saveCurrentAttempt = () => {
    if (!questions.length || !score.answered) return;
    const attempt: SavedQuizAttempt = {
      id: `quiz-${Date.now()}`,
      completedAt: new Date().toISOString(),
      examType,
      examTypeLabel: EXAM_LABELS[examType],
      examDivision,
      examDivisionLabel: EXAM_DIVISIONS[examType].find((entry) => entry.value === examDivision)?.label ?? "All Divisions",
      examLevel,
      examLevelLabel: levelLabel(examType, examLevel),
      focusTopicId: topicId,
      focusTopicLabel: topicLabel,
      questionCount: questions.length,
      answered: score.answered,
      correct: score.correct,
      accuracy: Math.round((score.correct / Math.max(1, questions.length)) * 100),
      weakTopics: currentWeakTopics,
      reviewQuestions: currentReviewQuestions
    };
    saveQuizAttempt(attempt);
    setQuizProgress(readQuizProgressSnapshot());
    setShowAnswers(true);
  };

  const topicBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    questions.forEach((row) => {
      counts.set(row.topicId, (counts.get(row.topicId) ?? 0) + 1);
    });
    return [...counts.entries()]
      .map(([id, count]) => ({ id, count, label: TOPIC_MAP.get(id)?.label ?? id }))
      .sort((a, b) => b.count - a.count);
  }, [questions]);

  return (
    <section className="beverage-quiz">
      <div className="section-header">
        <h2>Beverage Quiz</h2>
        <p>
          Exam-mode training bank with targeted weakness practice by certification track and topic domain.
        </p>
        <p className="hint">Goal: answer first, reveal feedback, save the attempt, then drill the weakest topic.</p>
        <button type="button" className="btn btn-primary" onClick={startQuickDiagnostic}>
          Start 10-Question Diagnostic
        </button>
      </div>

      <section className="quiz-preset-panel" aria-labelledby="quiz-preset-title">
        <div className="quiz-preset-head">
          <p className="nav-overline">Beer + Spirits Practice</p>
          <h3 id="quiz-preset-title">Start with the lane competitors make obvious.</h3>
          <p>
            These presets turn Cicerone-style beer, WSET-style spirits, and bar-service goals into one-click drills.
          </p>
        </div>
        <div className="quiz-preset-grid">
          {CATEGORY_DRILL_PRESETS.map((preset) => (
            <article key={preset.id} className={`quiz-preset-card${preset.id === activePresetId ? " active" : ""}`}>
              <div>
                <span>{preset.audience}</span>
                <h4>{preset.label}</h4>
                <p>{preset.summary}</p>
              </div>
              <ul>
                {preset.actions.map((action) => (
                  <li key={`${preset.id}-${action}`}>{action}</li>
                ))}
              </ul>
              <LearningSourcePanel
                pack={learningSourcePackForQuiz(preset.examType, preset.topicId)}
                title="Benchmark Sources"
                tone="dark"
                compact
              />
              <p className="quiz-preset-source">{preset.sourceNote}</p>
              <button type="button" className="btn btn-primary" onClick={() => launchPreset(preset)}>
                Launch Drill
              </button>
            </article>
          ))}
        </div>
      </section>

      <details className="quiz-customize-controls">
        <summary>Customize certification, topic, and practice length</summary>
      <div className="quiz-controls">
        <div className="quiz-control-row">
          <label htmlFor="quiz-exam-type">Exam Type</label>
          <select
            id="quiz-exam-type"
            value={examType}
            onChange={(event) => {
              const nextExamType = event.target.value as ExamType;
              setExamType(nextExamType);
              setExamDivision("all");
              setExamLevel("all");
              setTopicId("all");
              setActivePresetId(null);
            }}
          >
            {Object.entries(EXAM_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-control-row">
          <label htmlFor="quiz-exam-division">Exam Division</label>
          <select
            id="quiz-exam-division"
            value={examDivision}
            onChange={(event) => {
              setExamDivision(event.target.value as ExamDivision);
              setTopicId("all");
              setActivePresetId(null);
            }}
          >
            {EXAM_DIVISIONS[examType].map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-control-row">
          <label htmlFor="quiz-exam-level">Exam Level</label>
          <select
            id="quiz-exam-level"
            value={examLevel}
            onChange={(event) => {
              setExamLevel(event.target.value as ExamLevel);
              setTopicId("all");
              setActivePresetId(null);
            }}
          >
            {EXAM_LEVELS[examType].map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-control-row">
          <label htmlFor="quiz-length">Practice Exam Length</label>
          <select
            id="quiz-length"
            value={String(examLength)}
            onChange={(event) => {
              setExamLength(Number(event.target.value) as QuizLength);
              setActivePresetId(null);
            }}
          >
            {QUIZ_LENGTH_OPTIONS.map((length) => (
              <option key={length} value={String(length)}>
                {length} questions
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-control-row quiz-topic-row">
          <label htmlFor="quiz-topic">Weakness Focus Topic</label>
          <select
            id="quiz-topic"
            value={topicId}
            onChange={(event) => {
              setTopicId(event.target.value);
              setActivePresetId(null);
            }}
          >
            {examTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label}
              </option>
            ))}
          </select>
        </div>

        <div className="quiz-source-row">
          <LearningSourcePanel pack={quizSourcePack} title="Current Source Lens" tone="dark" compact />
        </div>

        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={generateExam}>
            Generate Exam
          </button>
          {questions.length > 0 ? (
            <button className="btn btn-light" onClick={() => setShowAnswers((current) => !current)}>
              {showAnswers ? "Hide Answers" : "Reveal Answers"}
            </button>
          ) : null}
          {questions.length > 0 ? (
            <button className="btn btn-light" onClick={saveCurrentAttempt} disabled={score.answered === 0}>
              Save Attempt + Build Review
            </button>
          ) : null}
        </div>
      </div>
      </details>

      <div className="quiz-meta">
        <p>
          Core bank: {CORE_QUESTION_TARGET_PER_EXAM.toLocaleString()} questions for {EXAM_LABELS[examType]} ({EXAM_DIVISIONS[examType].find((x) => x.value === examDivision)?.label ?? "All Divisions"})
        </p>
        <p>Level: {levelLabel(examType, examLevel)}</p>
        <p>Focus: {topicLabel}</p>
        <p>
          Progress: {score.correct}/{questions.length || examLength} correct | {score.answered}/{questions.length || examLength} answered
        </p>
      </div>

      <section className="quiz-remediation-panel" aria-labelledby="quiz-remediation-title">
        <div className="quiz-remediation-copy">
          <p className="nav-overline">Adaptive Review</p>
          <h3 id="quiz-remediation-title">Weak topics become the next drill.</h3>
          <p>
            Save an attempt after answering questions. Sip Studies keeps the latest review queue in this browser and turns missed topics into focused retakes.
          </p>
        </div>
        <div className="quiz-remediation-stats">
          <article>
            <span>Attempts</span>
            <strong>{quizProgress.attempts.length}</strong>
          </article>
          <article>
            <span>Average</span>
            <strong>{quizProgress.averageAccuracy}%</strong>
          </article>
          <article>
            <span>Weak focus</span>
            <strong>{quizProgress.weakestTopic?.label ?? "None yet"}</strong>
          </article>
        </div>
        {quizProgress.latestAttempt ? (
          <div className="quiz-review-queue">
            <div>
              <h4>Latest attempt</h4>
              <p>
                {quizProgress.latestAttempt.examTypeLabel} | {quizProgress.latestAttempt.examLevelLabel} | {quizProgress.latestAttempt.correct}/
                {quizProgress.latestAttempt.questionCount} correct
              </p>
            </div>
            <div className="quiz-weak-topic-list">
              {quizProgress.weakTopics.slice(0, 4).map((topic) => (
                <article key={topic.id} className="quiz-weak-topic-card">
                  <button type="button" onClick={() => generateFocusedExam(topic.id)}>
                    <span>{topic.label}</span>
                    <strong>{topic.missed}/{topic.total} missed</strong>
                  </button>
                  <div className="quiz-study-links">
                    {topic.studyLinks.slice(0, 2).map((link) => (
                      <a key={`${topic.id}-${link.route}`} href={`#${link.route}`} title={link.detail}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {questions.length > 0 ? (
        <>
          <div className="quiz-meta">
            <p>
              Topic distribution:{" "}
              {topicBreakdown.map((entry) => `${entry.label} (${entry.count})`).join(" | ")}
            </p>
          </div>

          {showAnswers && currentWeakTopics.length > 0 ? (
            <div className="quiz-current-review">
              <h3>Review before the next set</h3>
              <div className="quiz-weak-topic-list">
                {currentWeakTopics.slice(0, 4).map((topic) => (
                  <article key={topic.id} className="quiz-weak-topic-card">
                    <button type="button" onClick={() => generateFocusedExam(topic.id)}>
                      <span>{topic.label}</span>
                      <strong>{topic.missed}/{topic.total} missed</strong>
                    </button>
                    <div className="quiz-study-links">
                      {topic.studyLinks.slice(0, 2).map((link) => (
                        <a key={`${topic.id}-${link.route}`} href={`#${link.route}`} title={link.detail}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <ul>
                {currentReviewQuestions.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <strong>{item.topicLabel}:</strong> {item.teachingNote}
                    <div className="quiz-inline-study-links">
                      {item.studyLinks.slice(0, 2).map((link) => (
                        <a key={`${item.id}-${link.route}`} href={`#${link.route}`} title={link.detail}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ol className="quiz-question-list">
            {questions.map((question, questionIndex) => {
              const selected = answers[question.id];
              const questionSourcePack = learningSourcePackForQuiz(question.examType, question.topicId);
              return (
                <li key={question.id} className="quiz-question-card">
                  <p className="quiz-question-title">
                    <span>{questionLabel(questionIndex)}</span>
                    {question.prompt}
                  </p>
                  <p className="quiz-standard">
                    Exam: {EXAM_LABELS[question.examType]} | Level: {levelLabel(question.examType, question.examLevel)} | Topic: {TOPIC_MAP.get(question.topicId)?.label ?? question.topicId}
                  </p>
                  <div className="quiz-options">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex;
                      const isCorrect = showAnswers && optionIndex === question.correctIndex;
                      const isWrong = showAnswers && isSelected && optionIndex !== question.correctIndex;
                      const className = ["quiz-option", isSelected ? "selected" : "", isCorrect ? "correct" : "", isWrong ? "wrong" : ""]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <label key={`${question.id}-${optionIndex}`} className={className}>
                          <input
                            type="radio"
                            name={question.id}
                            checked={isSelected}
                            onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                          />
                          <span className="quiz-option-key">{optionLabel(optionIndex)}</span>
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                  {showAnswers ? (
                    <p className="quiz-answer-line">
                      Correct answer: {optionLabel(question.correctIndex)}. {question.options[question.correctIndex]}
                    </p>
                  ) : null}
                  {showAnswers ? <p className="quiz-explanation">{question.teachingNote}</p> : null}
                  {showAnswers ? (
                    <LearningSourcePanel pack={questionSourcePack} title="Explanation Sources" tone="dark" compact />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </>
      ) : null}
    </section>
  );
}
