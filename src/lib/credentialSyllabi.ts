export type CredentialSyllabusAction = {
  label: string;
  route: string;
  detail: string;
};

export type CredentialSyllabusBlock = {
  id: string;
  pathId: string;
  title: string;
  provider: string;
  officialUrl: string;
  examSignal: string;
  studyTime: string;
  focus: string;
  studyTargets: string[];
  sipActions: CredentialSyllabusAction[];
  readinessChecks: string[];
  handoff: string;
};

export const credentialSyllabusBlocks: CredentialSyllabusBlock[] = [
  {
    id: "wset-level-2-wines",
    pathId: "wset",
    title: "WSET Level 2 Wines Bridge",
    provider: "WSET",
    officialUrl: "https://www.wsetglobal.com/qualifications/wset-level-2-award-in-wines/",
    examSignal: "Closed-book 50-question multiple-choice exam in one hour.",
    studyTime: "Minimum 28 hours: 16 guided, 11 private study, 1-hour exam.",
    focus: "Grape varieties, global GIs, sparkling, fortified, labels, storage, service, pairing, and WSET SAT language.",
    studyTargets: [
      "Eight principal grape varieties and their style drivers",
      "Regionally important grapes and global geographical indications",
      "Sparkling and fortified production logic",
      "Label, storage, service, and pairing principles"
    ],
    sipActions: [
      { label: "Run WSET Quiz", route: "app/beverage-quiz", detail: "Filter to WSET-style wine questions and retake weak topics after a saved attempt." },
      { label: "Map GIs", route: "app/regions", detail: "Pair each GI with climate, grape, and style output." },
      { label: "Use SAT Notes", route: "app/flavors", detail: "Write one structured tasting note per principal grape." }
    ],
    readinessChecks: [
      "Can explain why climate and winemaking change style",
      "Can identify the main grape and region cues without notes",
      "Can store, serve, and pair wines in plain guest language"
    ],
    handoff: "Use Sip Studies for independent prep, then enroll with an official WSET Approved Programme Provider for the qualification."
  },
  {
    id: "wset-level-1-spirits",
    pathId: "wset",
    title: "WSET Level 1 Spirits Bridge",
    provider: "WSET",
    officialUrl: "https://www.wsetglobal.com/qualifications/wset-level-1-award-in-spirits/",
    examSignal: "Closed-book 30-question multiple-choice assessment.",
    studyTime: "Minimum six guided learning hours with a WSET course provider.",
    focus: "Production basics, main spirits categories, service, flavor drivers, and WSET Level 1 Spirits SAT language.",
    studyTargets: [
      "Base material and production process",
      "Principal categories and defining traits",
      "Basic service choices and guest explanation",
      "Flavor factors and structured tasting language"
    ],
    sipActions: [
      { label: "Launch Spirits Quiz", route: "app/beverage-quiz?preset=spirits-category", detail: "Practice base material, distillation, maturation, and category identity." },
      { label: "Study Spirits Resources", route: "app/resources", detail: "Use spirits reference cards and answer keys." },
      { label: "Practice Cocktails", route: "app/cocktails", detail: "Connect spirit categories to classic builds and service decisions." }
    ],
    readinessChecks: [
      "Can name the raw material behind common spirit categories",
      "Can explain a simple service recommendation",
      "Can describe spirits without brand-led language"
    ],
    handoff: "Use the bridge for prep and vocabulary, then take the official WSET course and exam through an approved provider."
  },
  {
    id: "cms-introductory",
    pathId: "cms",
    title: "CMS Introductory Sommelier Bridge",
    provider: "Court of Master Sommeliers, Americas",
    officialUrl: "https://www.mastersommeliers.org/certification/online-courses/online-introductory-sommelier-course/",
    examSignal: "Online exam: 70 multiple-choice questions in 45 minutes, with 60% required for certificate and lapel pin.",
    studyTime: "Online students have up to 180 days to complete the program and exam.",
    focus: "Wine theory, CMS deductive tasting method, service standards, and professional hospitality language.",
    studyTargets: [
      "Theory foundations for classic grapes and regions",
      "Deductive tasting sequence and evidence discipline",
      "Service standards and floor confidence",
      "Hospitality, wholesale, and retail use cases"
    ],
    sipActions: [
      { label: "Open Academy", route: "app/sip-academy", detail: "Use daily lessons for theory and service sequence." },
      { label: "Calibrate Flavor", route: "app/flavor-wheel", detail: "Practice aroma and structure evidence before conclusions." },
      { label: "Run CMS Quiz", route: "app/beverage-quiz", detail: "Filter to CMS and save weak-topic attempts." },
      { label: "Service Roleplay", route: "app/service-roleplay", detail: "Score bottle recovery, pacing, and guest-language decisions." }
    ],
    readinessChecks: [
      "Can move through appearance, nose, palate, and conclusion in order",
      "Can connect service action to guest outcome",
      "Can explain a classic region without over-talking"
    ],
    handoff: "Sip Studies supports practice. Register with CMS Americas for official course access, exam rules, and credential proof."
  },
  {
    id: "cicerone-certified-beer-server",
    pathId: "cicerone",
    title: "Certified Beer Server Bridge",
    provider: "Cicerone Certification Program",
    officialUrl: "https://www.cicerone.org/us-en/certifications/certified-beer-server",
    examSignal: "Online closed-book exam with 60 multiple-choice questions, 30-minute limit, and 75% passing score.",
    studyTime: "Self-paced preparation against the Certified Beer Server syllabus.",
    focus: "Beer clean glassware, proper pour, handling, service fundamentals, styles, and flavor conversation.",
    studyTargets: [
      "Service and glassware hygiene",
      "Beer handling and freshness protection",
      "Style and flavor vocabulary",
      "Guest-safe beer recommendations"
    ],
    sipActions: [
      { label: "Beer Server Sprint", route: "app/beverage-quiz?preset=beer-server", detail: "Retake beer-style and service questions." },
      { label: "Draught Sprint", route: "app/beverage-quiz?preset=draught-quality", detail: "Practice pressure, line hygiene, and foam decisions." },
      { label: "Brewery Game", route: "app/sip-game", detail: "Use equipment scenes for production and quality recall." },
      { label: "Beer Roleplay", route: "app/service-roleplay", detail: "Practice freshness, style translation, and quality recovery." }
    ],
    readinessChecks: [
      "Can explain a clean pour and glassware standard",
      "Can protect beer from common handling problems",
      "Can describe beer styles and flavors clearly to a guest"
    ],
    handoff: "Use Sip Studies as the independent drill surface, then create a Cicerone account and follow the official syllabus and exam policies."
  },
  {
    id: "barsmarts-service",
    pathId: "bar",
    title: "BarSmarts Practical Bridge",
    provider: "BarSmarts",
    officialUrl: "https://www.barsmarts.com/",
    examSignal: "BarSmarts positions Practical as a certification opportunity after online Basics and Professional levels.",
    studyTime: "Self-paced online content plus practical preparation where available.",
    focus: "Cocktail ingredients, techniques, hospitality, essential builds, and guest-first drink service.",
    studyTargets: [
      "Essential cocktail families and build methods",
      "Ingredient roles and balance logic",
      "Technique vocabulary: shake, stir, build, garnish, dilute",
      "Hospitality language for serving drinks to people"
    ],
    sipActions: [
      { label: "Service Quiz", route: "app/beverage-quiz?preset=bar-service", detail: "Drill guest sequence and practical service language." },
      { label: "Classic Builds", route: "app/cocktails", detail: "Practice specs, modifiers, and technique choices." },
      { label: "Flavor Calibration", route: "app/flavor-wheel", detail: "Translate technical descriptors into guest language." },
      { label: "Bar Roleplay", route: "app/service-roleplay", detail: "Score Martini translation, low-ABV pacing, and recovery language." }
    ],
    readinessChecks: [
      "Can explain why a cocktail is shaken, stirred, or built",
      "Can recommend a drink from a guest preference cue",
      "Can speak about spirits without brand dependency"
    ],
    handoff: "Use Sip Studies for practice reps, then follow BarSmarts registration and practical-event requirements for official proof."
  },
  {
    id: "regional-scholar-map",
    pathId: "regional-scholar",
    title: "Regional Scholar Map Bridge",
    provider: "Wine Scholar Guild-style regional study",
    officialUrl: "https://www.winescholarguild.com/certifications/scholar-programs/spanish-wine-scholar",
    examSignal: "Regional programs emphasize structured maps, online modules, quizzes, flashcards, and certification exams.",
    studyTime: "Weekly country and region blocks, paced around the official program selected.",
    focus: "Country maps, appellation hierarchy, grape-region matching, labeling law, and regional style recall.",
    studyTargets: [
      "Country map and major regional divisions",
      "Grape, climate, and appellation logic",
      "Label terms and hierarchy",
      "Regional style comparison"
    ],
    sipActions: [
      { label: "Open Regions", route: "app/regions", detail: "Use geography as the memory spine." },
      { label: "Download Maps", route: "app/maps", detail: "Print or review map assets before quizzes." },
      { label: "Search Terms", route: "app/sipopedia", detail: "Define law and label terms before memorizing." }
    ],
    readinessChecks: [
      "Can locate major regions without the answer key",
      "Can explain a region through climate, grape, and style",
      "Can distinguish legal terms from marketing terms"
    ],
    handoff: "Use Sip Studies for map-first preparation, then follow the official regional program for exam enrollment and credential requirements."
  }
];

export function credentialSyllabiForPath(pathId: string): CredentialSyllabusBlock[] {
  return credentialSyllabusBlocks.filter((block) => block.pathId === pathId);
}
