export type WorkspaceSectionId = "learn" | "taste" | "connect";

export type WorkspaceStaticPage =
  | "sip-academy"
  | "sip-game"
  | "sipopedia"
  | "beverage-quiz"
  | "study-sheets"
  | "service-roleplay"
  | "regions"
  | "maps"
  | "grapes"
  | "cocktails"
  | "resources"
  | "flavor-wheel"
  | "cellar-scanner"
  | "tasting-journal"
  | "flavors"
  | "beverage-news"
  | "flavor-blog"
  | "favorites"
  | "ai-winecast"
  | "tasting-groups"
  | "ai-news"
  | "somm-events";

export type WorkspaceSectionDefinition = {
  id: WorkspaceSectionId;
  label: "Learn" | "Taste" | "Connect";
  description: string;
  defaultPage: WorkspaceStaticPage;
  paywallDetail: string;
};

export type WorkspaceNavItem = {
  id: WorkspaceStaticPage;
  route: `app/${WorkspaceStaticPage}`;
  label: string;
  section: WorkspaceSectionId;
  signal: string;
  description: string;
  keywords: string[];
  previewBullets: [string, string, string];
  previewImage?: string;
  featuredPractice?: boolean;
};

export const WORKSPACE_SECTIONS: WorkspaceSectionDefinition[] = [
  {
    id: "learn",
    label: "Learn",
    description: "Academy routes, game drills, maps, and terminology.",
    defaultPage: "sip-academy",
    paywallDetail: "Academy, game drills, maps, ingredients, recipes, and resources."
  },
  {
    id: "taste",
    label: "Taste",
    description: "Sensory calibration, tasting notes, and review loops.",
    defaultPage: "flavor-wheel",
    paywallDetail: "Flavor calibration, journal archive, and tasting capture workflows."
  },
  {
    id: "connect",
    label: "Connect",
    description: "Industry feeds, cohorts, AI research, and event pages.",
    defaultPage: "beverage-news",
    paywallDetail: "Industry radar, editorial context, cohorts, podcasts, AI feeds, and event pages."
  }
];

export const WORKSPACE_NAV_ITEMS: WorkspaceNavItem[] = [
  {
    id: "sip-academy",
    route: "app/sip-academy",
    label: "Sip Academy",
    section: "learn",
    signal: "Guided wine lessons",
    description: "Progressive mission ladder with guided learning loops and milestone progression.",
    keywords: ["academy", "lessons", "wine", "learn"],
    previewBullets: ["Realm progression", "Mentor-guided loops", "Gamified mastery flow"]
  },
  {
    id: "sip-game",
    route: "app/sip-game",
    label: "Sip Game",
    section: "learn",
    signal: "Practice room",
    description: "Interactive walkaround with mentor conversations and quest-driven practice.",
    keywords: ["game", "practice", "drills"],
    previewBullets: ["NPC mentor interactions", "Map exploration", "Quest checkpoints"]
  },
  {
    id: "sipopedia",
    route: "app/sipopedia",
    label: "Sipopedia",
    section: "learn",
    signal: "Terms and citations",
    description: "Professional glossary built for service clarity, exam prep, and practical recall.",
    keywords: ["sipopedia", "terms", "terminology", "citations"],
    previewBullets: ["Structured definitions", "Applied usage", "Service-ready language"]
  },
  {
    id: "beverage-quiz",
    route: "app/beverage-quiz",
    label: "Beverage Quiz",
    section: "learn",
    signal: "Fast recall checks",
    description: "Assessment flows that test theory, tasting logic, and service decision speed.",
    keywords: ["quiz", "recall", "test"],
    previewBullets: ["Exam-style prompts", "Feedback loops", "Retention-oriented drills"],
    featuredPractice: true
  },
  {
    id: "study-sheets",
    route: "app/study-sheets",
    label: "Study Sheets",
    section: "learn",
    signal: "Printable drills",
    description: "Printable map, style, service, and classic-spec drill sheets.",
    keywords: ["print", "study sheets", "maps", "styles", "service", "cocktails", "specs"],
    previewBullets: ["Printable practice", "Focused recall drills", "Offline review"],
    previewImage: "/starter-thumbs/resources-640.webp"
  },
  {
    id: "service-roleplay",
    route: "app/service-roleplay",
    label: "Roleplay Lab",
    section: "learn",
    signal: "Scored service reps",
    description: "Scored sommelier, beer, bar, and recovery roleplay scenarios.",
    keywords: ["roleplay", "service", "sommelier", "beer", "bar", "hospitality", "recovery"],
    previewBullets: ["Service decisions", "Immediate coaching", "Targeted next study"],
    previewImage: "/starter-thumbs/beverage-quiz-640.webp",
    featuredPractice: true
  },
  {
    id: "maps",
    route: "app/maps",
    label: "Maps",
    section: "learn",
    signal: "AI wine cartography",
    description: "Cartographic study layer for seeing place, region, and production context together.",
    keywords: ["maps", "cartography", "region"],
    previewBullets: ["Map-first study", "Global orientation", "Region context"]
  },
  {
    id: "regions",
    route: "app/regions",
    label: "Regions",
    section: "learn",
    signal: "Global map atlas",
    description: "Geographic exploration for wine regions, production context, and study routing.",
    keywords: ["regions", "atlas", "geography"],
    previewBullets: ["Region deep dives", "Context-linked learning", "Route-based study map"]
  },
  {
    id: "grapes",
    route: "app/grapes",
    label: "Grapes & Grains",
    section: "learn",
    signal: "Base ingredients",
    description: "Base ingredient study for grapes, grains, hops, coffee, tea, and production families.",
    keywords: ["grapes", "grains", "ingredients"],
    previewBullets: ["Ingredient families", "Variety recall", "Production links"]
  },
  {
    id: "cocktails",
    route: "app/cocktails",
    label: "Bev Recipes",
    section: "learn",
    signal: "Cocktail and beer maps",
    description: "Cocktail, wine, and beer recipe maps for service-ready beverage construction.",
    keywords: ["recipes", "cocktails", "beer", "beverage"],
    previewBullets: ["Classic specs", "Style navigation", "Service language"]
  },
  {
    id: "resources",
    route: "app/resources",
    label: "Resources",
    section: "learn",
    signal: "Reference lists",
    description: "Reference library for quick lookup, source material, and study support.",
    keywords: ["resources", "reference", "library"],
    previewBullets: ["Reference lists", "Service support", "Study scaffolds"]
  },
  {
    id: "flavor-wheel",
    route: "app/flavor-wheel",
    label: "Flavor Wheel",
    section: "taste",
    signal: "Aroma calibration",
    description: "Descriptor-mapping drills that improve tasting vocabulary precision under service pressure.",
    keywords: ["flavor", "aroma", "wheel", "calibration"],
    previewBullets: ["Aroma family mapping", "Descriptor confidence reps", "Language consistency checks"],
    featuredPractice: true
  },
  {
    id: "cellar-scanner",
    route: "app/cellar-scanner",
    label: "Cellar Scanner",
    section: "taste",
    signal: "Label OCR + cellar study",
    description: "Label, menu, and cellar scanner with study routes.",
    keywords: ["scanner", "cellar", "label", "menu", "inventory", "pairing"],
    previewBullets: ["Label verification", "Study route suggestions", "Cellar memory practice"],
    previewImage: "/starter-thumbs/tasting-journal-640.webp"
  },
  {
    id: "tasting-journal",
    route: "app/tasting-journal",
    label: "Journal Archive",
    section: "taste",
    signal: "Saved tasting data",
    description: "Archive view for saved tasting history, pattern recall, and readiness progression.",
    keywords: ["journal", "archive", "tasting data"],
    previewBullets: ["Structured tasting entries", "Trend visibility", "Long-term memory reinforcement"]
  },
  {
    id: "flavors",
    route: "app/flavors",
    label: "Tasting Journal",
    section: "taste",
    signal: "Structured notes",
    description: "Guided tasting capture for turning sensory impressions into consistent notes.",
    keywords: ["tasting", "journal", "notes"],
    previewBullets: ["Tasting forms", "Descriptor prompts", "Comparison practice"],
    featuredPractice: true
  },
  {
    id: "beverage-news",
    route: "app/beverage-news",
    label: "Beverage News",
    section: "connect",
    signal: "Live industry radar",
    description: "Industry signal feed that connects study topics to current beverage conversations.",
    keywords: ["news", "industry", "radar"],
    previewBullets: ["Industry radar", "Current context", "Learning prompts"],
    featuredPractice: true
  },
  {
    id: "flavor-blog",
    route: "app/flavor-blog",
    label: "Flavor Blog",
    section: "connect",
    signal: "Editorial stream",
    description: "Editorial beverage stories for deeper study framing and service language.",
    keywords: ["blog", "substack", "editorial"],
    previewBullets: ["Brand essays", "Study framing", "Service vocabulary"]
  },
  {
    id: "favorites",
    route: "app/favorites",
    label: "Favorites",
    section: "connect",
    signal: "Saved reading list",
    description: "Cross-device reading list for bookmarked Flavor Blog and Beverage News articles.",
    keywords: ["favorites", "bookmarks", "saved", "reading list", "articles"],
    previewBullets: ["Saved articles", "Read and unread status", "Cross-device organization"]
  },
  {
    id: "ai-winecast",
    route: "app/ai-winecast",
    label: "AI Winecast",
    section: "connect",
    signal: "Podcast archive",
    description: "Podcast-style dispatches that turn beverage research into study-ready listening paths.",
    keywords: ["winecast", "podcast", "episodes", "ai"],
    previewBullets: ["Episode archive", "Study prompts", "Audio-first review"],
    featuredPractice: true
  },
  {
    id: "tasting-groups",
    route: "app/tasting-groups",
    label: "Tasting Groups",
    section: "connect",
    signal: "Cohort discovery",
    description: "Cohort discovery for learners who want structured tasting practice with other people.",
    keywords: ["groups", "cohort", "community"],
    previewBullets: ["Group discovery", "Regional filters", "Practice community"]
  },
  {
    id: "ai-news",
    route: "app/ai-news",
    label: "AI News",
    section: "connect",
    signal: "AI research feed",
    description: "AI research and operations feed for keeping the learning system tied to current tools.",
    keywords: ["ai", "news", "research"],
    previewBullets: ["Research feed", "Tool context", "Operations signal"]
  },
  {
    id: "somm-events",
    route: "app/somm-events",
    label: "Somm Events",
    section: "connect",
    signal: "Event link studio",
    description: "Event link studio for building polished social and event surfaces around beverage work.",
    keywords: ["events", "somm", "social", "links"],
    previewBullets: ["Event links", "Social modules", "Public profile"]
  }
];

export const LAST_WORKSPACE_MODULE_STORAGE_KEY = "sipstudies:last-workspace-module:v1";
export const LAST_WORKSPACE_MODULE_EVENT = "sipstudies:last-workspace-module-changed";

export function workspaceItemsForSection(
  section: WorkspaceSectionId,
  items: readonly WorkspaceNavItem[] = WORKSPACE_NAV_ITEMS
): WorkspaceNavItem[] {
  return items.filter((item) => item.section === section);
}

export function workspaceSectionForPage(page: WorkspaceStaticPage): WorkspaceSectionId {
  return WORKSPACE_NAV_ITEMS.find((item) => item.id === page)?.section ?? "learn";
}

export function readLastWorkspaceModule(): WorkspaceStaticPage | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LAST_WORKSPACE_MODULE_STORAGE_KEY);
    return WORKSPACE_NAV_ITEMS.some((item) => item.id === value) ? (value as WorkspaceStaticPage) : null;
  } catch {
    return null;
  }
}

export function writeLastWorkspaceModule(page: WorkspaceStaticPage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_WORKSPACE_MODULE_STORAGE_KEY, page);
    window.dispatchEvent(new CustomEvent(LAST_WORKSPACE_MODULE_EVENT, { detail: page }));
  } catch {
    // Navigation remains usable when storage is unavailable.
  }
}

export function buildWorkspaceLanePreviews(
  items: readonly WorkspaceNavItem[] = WORKSPACE_NAV_ITEMS
): Array<{ label: WorkspaceSectionDefinition["label"]; modules: string; detail: string }> {
  return WORKSPACE_SECTIONS.map((section) => {
    const moduleCount = workspaceItemsForSection(section.id, items).length;
    return {
      label: section.label,
      modules: `${moduleCount} module${moduleCount === 1 ? "" : "s"}`,
      detail: section.paywallDetail
    };
  });
}

export function workspaceLabelForRoute(route: string | null | undefined): string | null {
  if (!route) return null;
  const routePart = route.replace(/^#/, "").split("?")[0].replace(/^app\//, "");
  if (!routePart || routePart === "starter" || routePart === "launch") return "Launch Pad";
  return WORKSPACE_NAV_ITEMS.find((item) => item.id === routePart || routePart.startsWith(`${item.id}/`))?.label ?? null;
}
