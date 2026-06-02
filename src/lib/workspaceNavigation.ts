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
    description: "Guided wine lessons.",
    keywords: ["academy", "lessons", "wine", "learn"]
  },
  {
    id: "sip-game",
    route: "app/sip-game",
    label: "Sip Game",
    section: "learn",
    signal: "Practice room",
    description: "Game loop and equipment mastery.",
    keywords: ["game", "practice", "drills"]
  },
  {
    id: "sipopedia",
    route: "app/sipopedia",
    label: "Sipopedia",
    section: "learn",
    signal: "Terms and citations",
    description: "Terminology and citations.",
    keywords: ["sipopedia", "terms", "terminology", "citations"]
  },
  {
    id: "beverage-quiz",
    route: "app/beverage-quiz",
    label: "Beverage Quiz",
    section: "learn",
    signal: "Fast recall checks",
    description: "Fast recall checks.",
    keywords: ["quiz", "recall", "test"]
  },
  {
    id: "study-sheets",
    route: "app/study-sheets",
    label: "Study Sheets",
    section: "learn",
    signal: "Printable drills",
    description: "Printable map, style, service, and classic-spec drill sheets.",
    keywords: ["print", "study sheets", "maps", "styles", "service", "cocktails", "specs"]
  },
  {
    id: "service-roleplay",
    route: "app/service-roleplay",
    label: "Roleplay Lab",
    section: "learn",
    signal: "Scored service reps",
    description: "Scored sommelier, beer, bar, and recovery roleplay scenarios.",
    keywords: ["roleplay", "service", "sommelier", "beer", "bar", "hospitality", "recovery"]
  },
  {
    id: "maps",
    route: "app/maps",
    label: "Maps",
    section: "learn",
    signal: "AI wine cartography",
    description: "AI wine cartography.",
    keywords: ["maps", "cartography", "region"]
  },
  {
    id: "regions",
    route: "app/regions",
    label: "Regions",
    section: "learn",
    signal: "Global map atlas",
    description: "Global region atlas and subpages.",
    keywords: ["regions", "atlas", "geography"]
  },
  {
    id: "grapes",
    route: "app/grapes",
    label: "Grapes & Grains",
    section: "learn",
    signal: "Base ingredients",
    description: "Base ingredients and subpages.",
    keywords: ["grapes", "grains", "ingredients"]
  },
  {
    id: "cocktails",
    route: "app/cocktails",
    label: "Bev Recipes",
    section: "learn",
    signal: "Cocktail and beer maps",
    description: "Cocktail, wine, and beer maps.",
    keywords: ["recipes", "cocktails", "beer", "beverage"]
  },
  {
    id: "resources",
    route: "app/resources",
    label: "Resources",
    section: "learn",
    signal: "Reference lists",
    description: "Reference library and practice prompts.",
    keywords: ["resources", "reference", "library"]
  },
  {
    id: "flavor-wheel",
    route: "app/flavor-wheel",
    label: "Flavor Wheel",
    section: "taste",
    signal: "Aroma calibration",
    description: "Aroma calibration wheel.",
    keywords: ["flavor", "aroma", "wheel", "calibration"]
  },
  {
    id: "cellar-scanner",
    route: "app/cellar-scanner",
    label: "Cellar Scanner",
    section: "taste",
    signal: "Label OCR + cellar study",
    description: "Label, menu, and cellar scanner with study routes.",
    keywords: ["scanner", "cellar", "label", "menu", "inventory", "pairing"]
  },
  {
    id: "tasting-journal",
    route: "app/tasting-journal",
    label: "Journal Archive",
    section: "taste",
    signal: "Saved tasting data",
    description: "Saved tasting data archive.",
    keywords: ["journal", "archive", "tasting data"]
  },
  {
    id: "flavors",
    route: "app/flavors",
    label: "Tasting Journal",
    section: "taste",
    signal: "Structured notes",
    description: "Structured tasting notes.",
    keywords: ["tasting", "journal", "notes"]
  },
  {
    id: "beverage-news",
    route: "app/beverage-news",
    label: "Beverage News",
    section: "connect",
    signal: "Live industry radar",
    description: "Industry radar feeds.",
    keywords: ["news", "industry", "radar"]
  },
  {
    id: "flavor-blog",
    route: "app/flavor-blog",
    label: "Flavor Blog",
    section: "connect",
    signal: "Editorial stream",
    description: "Sip Studies blog and Substack streams.",
    keywords: ["blog", "substack", "editorial"]
  },
  {
    id: "ai-winecast",
    route: "app/ai-winecast",
    label: "AI Winecast",
    section: "connect",
    signal: "Podcast archive",
    description: "AI wine podcast index and episode pages.",
    keywords: ["winecast", "podcast", "episodes", "ai"]
  },
  {
    id: "tasting-groups",
    route: "app/tasting-groups",
    label: "Tasting Groups",
    section: "connect",
    signal: "Cohort discovery",
    description: "Cohort discovery.",
    keywords: ["groups", "cohort", "community"]
  },
  {
    id: "ai-news",
    route: "app/ai-news",
    label: "AI News",
    section: "connect",
    signal: "AI research feed",
    description: "AI research and operations feed.",
    keywords: ["ai", "news", "research"]
  },
  {
    id: "somm-events",
    route: "app/somm-events",
    label: "Somm Events",
    section: "connect",
    signal: "Event link studio",
    description: "Event link studio.",
    keywords: ["events", "somm", "social", "links"]
  }
];

export function workspaceItemsForSection(section: WorkspaceSectionId): WorkspaceNavItem[] {
  return WORKSPACE_NAV_ITEMS.filter((item) => item.section === section);
}

export function workspaceSectionForPage(page: WorkspaceStaticPage): WorkspaceSectionId {
  return WORKSPACE_NAV_ITEMS.find((item) => item.id === page)?.section ?? "learn";
}

export function buildWorkspaceLanePreviews(): Array<{ label: WorkspaceSectionDefinition["label"]; modules: string; detail: string }> {
  return WORKSPACE_SECTIONS.map((section) => {
    const moduleCount = workspaceItemsForSection(section.id).length;
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
