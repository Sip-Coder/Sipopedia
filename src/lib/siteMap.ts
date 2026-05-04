export type PageRoomAccess = "Lobby" | "Game" | "Boss";
export type PagePublicationStatus = "public" | "edit" | "off";

export type SiteMapPage = {
  route: string;
  label: string;
  room: PageRoomAccess;
  section: string;
  description: string;
  defaultRoom: PageRoomAccess;
  defaultStatus: PagePublicationStatus;
};

export type PageAccessConfig = {
  room: PageRoomAccess;
  status: PagePublicationStatus;
};

export type PageStatusMap = Record<string, PageAccessConfig>;

export const PAGE_STATUS_STORAGE_KEY = "sipstudies:page-statuses:v2";
export const LEGACY_PAGE_STATUS_STORAGE_KEY = "sipstudies:page-statuses:v1";
export const PAGE_STATUS_EVENT = "sipstudies:page-statuses-changed";

export const SITE_MAP_PAGES: SiteMapPage[] = [
  { route: "home", label: "Home", room: "Lobby", section: "Marketing", description: "Public landing page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "pricing", label: "Pricing", room: "Lobby", section: "Marketing", description: "Plan comparison and subscription pitch.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "checkout", label: "Checkout", room: "Lobby", section: "Commerce", description: "Enrollment and checkout intake.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "login", label: "Sign In", room: "Lobby", section: "Account", description: "Authentication panel.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "account", label: "Account Dashboard", room: "Lobby", section: "Account", description: "User profile, achievements, billing, and privacy controls.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "logout", label: "Signed Out", room: "Lobby", section: "Account", description: "Session end landing page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "terms", label: "Terms", room: "Lobby", section: "Policy", description: "Terms of service.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "privacy", label: "Privacy", room: "Lobby", section: "Policy", description: "Privacy policy.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "refund", label: "Refund", room: "Lobby", section: "Policy", description: "Refund policy.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "success", label: "Checkout Success", room: "Lobby", section: "Commerce", description: "Successful payment handoff page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "cancel", label: "Checkout Cancel", room: "Lobby", section: "Commerce", description: "Canceled checkout handoff page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "app/starter", label: "Launch Deck", room: "Lobby", section: "Welcome", description: "Public launch deck preview.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "app/sip-academy", label: "Sip Academy", room: "Game", section: "Learn", description: "Guided wine lessons.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/sip-game", label: "Sip Game", room: "Game", section: "Learn", description: "Game loop and equipment mastery.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/sipopedia", label: "Sipopedia", room: "Game", section: "Learn", description: "Terminology and citations.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/beverage-quiz", label: "Beverage Quiz", room: "Game", section: "Learn", description: "Fast recall checks.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/regions", label: "Regions", room: "Game", section: "Learn", description: "Global region atlas and subpages.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/maps", label: "Maps", room: "Game", section: "Learn", description: "AI wine cartography.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/grapes", label: "Grapes & Grains", room: "Game", section: "Learn", description: "Base ingredients and subpages.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/cocktails", label: "Bev Recipes", room: "Game", section: "Learn", description: "Cocktail, wine, and beer maps.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/resources", label: "Resources", room: "Game", section: "Learn", description: "Reference library and practice prompts.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/flavor-wheel", label: "Flavor Wheel", room: "Game", section: "Taste", description: "Aroma calibration wheel.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/tasting-journal", label: "Journal Archive", room: "Game", section: "Taste", description: "Saved tasting data archive.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/flavors", label: "Tasting Journal", room: "Game", section: "Taste", description: "Structured tasting notes.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/beverage-news", label: "Beverage News", room: "Game", section: "Connect", description: "Industry radar feeds.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/flavor-blog", label: "Flavor Blog", room: "Game", section: "Connect", description: "Sip Studies blog and Substack streams.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/ai-winecast", label: "Ai Winecast", room: "Game", section: "Connect", description: "AI wine podcast index and episode pages.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/tasting-groups", label: "Tasting Groups", room: "Game", section: "Connect", description: "Cohort discovery.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/ai-news", label: "AI News", room: "Game", section: "Connect", description: "AI research and operations feed.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "app/somm-events", label: "Somm Events", room: "Game", section: "Connect", description: "Event link studio.", defaultRoom: "Game", defaultStatus: "public" },
  { route: "admin", label: "Admin Console", room: "Boss", section: "Operations", description: "Back-office dashboard.", defaultRoom: "Boss", defaultStatus: "edit" },
  { route: "admin/terminology", label: "Terms Ops", room: "Boss", section: "Operations", description: "Terminology publishing workflow.", defaultRoom: "Boss", defaultStatus: "edit" }
];

export function getDefaultPageStatusMap(): PageStatusMap {
  return SITE_MAP_PAGES.reduce<PageStatusMap>((acc, page) => {
    acc[page.route] = { room: page.defaultRoom, status: page.defaultStatus };
    return acc;
  }, {});
}

function normalizeLegacyValue(route: string, value: string): PageAccessConfig | null {
  const defaults = getDefaultPageStatusMap();
  const fallback = defaults[route] ?? { room: "Lobby", status: "public" as const };

  if (value === "Lobby" || value === "Game" || value === "Boss") return { ...fallback, room: value };
  if (value === "Off") return { ...fallback, status: "off" };
  if (value === "public" || value === "edit" || value === "off") return { ...fallback, status: value };
  return null;
}

function normalizeAccessConfig(route: string, rawValue: unknown): PageAccessConfig | null {
  if (typeof rawValue === "string") return normalizeLegacyValue(route, rawValue);
  if (!rawValue || typeof rawValue !== "object") return null;

  const value = rawValue as Partial<PageAccessConfig>;
  const defaults = getDefaultPageStatusMap();
  const fallback = defaults[route] ?? { room: "Lobby", status: "public" as const };
  const room = value.room === "Lobby" || value.room === "Game" || value.room === "Boss" ? value.room : fallback.room;
  const status = value.status === "public" || value.status === "edit" || value.status === "off" ? value.status : fallback.status;
  return { room, status };
}

function readRawStatusMap(storageKey: string): PageStatusMap | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;

  const parsed = JSON.parse(raw) as Record<string, unknown>;
  return Object.entries(parsed).reduce<PageStatusMap>((acc, [route, rawValue]) => {
    const normalized = normalizeAccessConfig(route, rawValue);
    if (normalized) acc[route] = normalized;
    return acc;
  }, {});
}

export function readPageStatusMap(): PageStatusMap {
  const defaults = getDefaultPageStatusMap();
  if (typeof window === "undefined") return defaults;

  try {
    return { ...defaults, ...(readRawStatusMap(PAGE_STATUS_STORAGE_KEY) ?? readRawStatusMap(LEGACY_PAGE_STATUS_STORAGE_KEY) ?? {}) };
  } catch {
    return defaults;
  }
}

export function writePageStatusMap(statuses: PageStatusMap): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PAGE_STATUS_STORAGE_KEY, JSON.stringify(statuses));
  window.dispatchEvent(new CustomEvent(PAGE_STATUS_EVENT, { detail: statuses }));
}

export function configForRoute(route: string, statuses: PageStatusMap): PageAccessConfig {
  const defaults = getDefaultPageStatusMap();
  if (route.startsWith("app/regions/")) return statuses["app/regions"] ?? defaults["app/regions"] ?? { room: "Game", status: "public" };
  if (route.startsWith("app/grapes/")) return statuses["app/grapes"] ?? defaults["app/grapes"] ?? { room: "Game", status: "public" };
  if (route.startsWith("app/ai-winecast/")) return statuses["app/ai-winecast"] ?? defaults["app/ai-winecast"] ?? { room: "Game", status: "public" };
  return statuses[route] ?? defaults[route] ?? { room: "Lobby", status: "public" };
}

export function canViewRoute(route: string, statuses: PageStatusMap, isAdmin: boolean, isSubscribed = false): boolean {
  const config = configForRoute(route, statuses);
  if (config.status === "off") return isAdmin;
  if (config.status === "edit") return isAdmin;
  if (config.room === "Lobby") return true;
  if (config.room === "Game") return isSubscribed || isAdmin;
  return isAdmin;
}

export function shouldShowInPublicNav(route: string, statuses: PageStatusMap, isAdmin: boolean, isSubscribed = false): boolean {
  const config = configForRoute(route, statuses);
  if (config.status === "off") return false;
  if (config.status === "edit") return isAdmin;
  if (config.room === "Lobby") return true;
  if (config.room === "Game") return isSubscribed || isAdmin;
  return isAdmin;
}
