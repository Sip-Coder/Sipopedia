import { WORKSPACE_NAV_ITEMS, type WorkspaceSectionId } from "./workspaceNavigation";
import { supabase } from "./supabase";

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
  sortOrder: number;
};

export type PageStatusMap = Record<string, PageAccessConfig>;

export const PAGE_STATUS_STORAGE_KEY = "sipstudies:page-statuses:v3";
export const LEGACY_PAGE_STATUS_STORAGE_KEYS = ["sipstudies:page-statuses:v2", "sipstudies:page-statuses:v1"] as const;
export const PAGE_STATUS_EVENT = "sipstudies:page-statuses-changed";
const SITE_PAGE_STATUS_TABLE = "site_page_statuses";

type SitePageStatusRow = {
  route: string;
  room: PageRoomAccess;
  status: PagePublicationStatus;
  sort_order?: number | null;
};

export type SiteMapMenuGroupId = "essentials" | WorkspaceSectionId | "account" | "boss" | "other";

export type SiteMapMenuGroup = {
  id: SiteMapMenuGroupId;
  label: string;
  description: string;
};

export const SITE_MAP_MENU_GROUPS: SiteMapMenuGroup[] = [
  { id: "essentials", label: "Home", description: "The primary public menu." },
  { id: "learn", label: "Learn", description: "Learning rooms shown together in the menu." },
  { id: "taste", label: "Taste", description: "Sensory and tasting rooms shown together in the menu." },
  { id: "connect", label: "Connect", description: "Community and editorial rooms shown together in the menu." },
  { id: "account", label: "Account", description: "Sign-in, membership, and account destinations." },
  { id: "boss", label: "Boss", description: "Administrator-only destinations." },
  { id: "other", label: "Other pages", description: "Utility and policy pages that are not listed in the main menu." }
];

const WORKSPACE_GROUP_BY_ROUTE = new Map<string, WorkspaceSectionId>(
  WORKSPACE_NAV_ITEMS.map((item) => [item.route, item.section])
);
const ESSENTIAL_MENU_ROUTES = ["home", "app/starter", "pricing", "study-paths", "support"] as const;
const ACCOUNT_MENU_ROUTES = ["checkout", "login", "account", "logout"] as const;
const BOSS_MENU_ROUTES = ["admin", "admin/terminology"] as const;

export function siteMapMenuGroupForRoute(route: string): SiteMapMenuGroupId {
  const workspaceGroup = WORKSPACE_GROUP_BY_ROUTE.get(route);
  if (workspaceGroup) return workspaceGroup;
  if ((ESSENTIAL_MENU_ROUTES as readonly string[]).includes(route)) return "essentials";
  if ((ACCOUNT_MENU_ROUTES as readonly string[]).includes(route)) return "account";
  if ((BOSS_MENU_ROUTES as readonly string[]).includes(route)) return "boss";
  return "other";
}

export function isMainMenuRoute(route: string): boolean {
  return siteMapMenuGroupForRoute(route) !== "other";
}

const WORKSPACE_SECTION_LABELS: Record<WorkspaceSectionId, string> = {
  learn: "Learn",
  taste: "Taste",
  connect: "Connect"
};

export const SITE_MAP_PAGES: SiteMapPage[] = [
  { route: "home", label: "Home", room: "Lobby", section: "Marketing", description: "Public landing page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "pricing", label: "Pricing", room: "Lobby", section: "Marketing", description: "$10/month membership details and subscription pitch.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "support", label: "Support & Teams", room: "Lobby", section: "Support", description: "FAQ, enrollment help, billing guidance, study remediation, and team-training intake.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "study-paths", label: "Credential Paths", room: "Lobby", section: "Study", description: "Independent WSET, CMS, Cicerone, and regional-scholar study-path guidance.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "checkout", label: "Checkout", room: "Lobby", section: "Commerce", description: "Enrollment and checkout intake.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "powerful-point", label: "Powerful Point", room: "Lobby", section: "About", description: "Sip Studies operating-system overview.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "login", label: "Log In", room: "Lobby", section: "Account", description: "Authentication panel.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "account", label: "Account Dashboard", room: "Lobby", section: "Account", description: "User profile, achievements, billing, and privacy controls.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "account/avatar", label: "Avatar Creator", room: "Lobby", section: "Account", description: "Saved Sip Studies character creator.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "logout", label: "Signed Out", room: "Lobby", section: "Account", description: "Session end landing page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "terms", label: "Terms", room: "Lobby", section: "Policy", description: "Terms of service.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "privacy", label: "Privacy", room: "Lobby", section: "Policy", description: "Privacy policy.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "refund", label: "Refund", room: "Lobby", section: "Policy", description: "Refund policy.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "success", label: "Checkout Success", room: "Lobby", section: "Commerce", description: "Successful payment handoff page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "cancel", label: "Checkout Cancel", room: "Lobby", section: "Commerce", description: "Canceled checkout handoff page.", defaultRoom: "Lobby", defaultStatus: "public" },
  { route: "app/starter", label: "Launch Pad", room: "Lobby", section: "Welcome", description: "Public launch pad preview.", defaultRoom: "Lobby", defaultStatus: "public" },
  ...WORKSPACE_NAV_ITEMS.map((item) => ({
    route: item.route,
    label: item.label,
    room: item.defaultRoom ?? "Game",
    section: WORKSPACE_SECTION_LABELS[item.section],
    description: item.description,
    defaultRoom: item.defaultRoom ?? "Game",
    defaultStatus: "public" as const
  })),
  { route: "admin", label: "Admin Console", room: "Boss", section: "Operations", description: "Back-office dashboard.", defaultRoom: "Boss", defaultStatus: "edit" },
  { route: "admin/terminology", label: "Terms Ops", room: "Boss", section: "Operations", description: "Terminology publishing workflow.", defaultRoom: "Boss", defaultStatus: "edit" }
];

const DEFAULT_MENU_ROUTE_ORDER: Record<SiteMapMenuGroupId, readonly string[]> = {
  essentials: ESSENTIAL_MENU_ROUTES,
  learn: WORKSPACE_NAV_ITEMS.filter((item) => item.section === "learn").map((item) => item.route),
  taste: WORKSPACE_NAV_ITEMS.filter((item) => item.section === "taste").map((item) => item.route),
  connect: WORKSPACE_NAV_ITEMS.filter((item) => item.section === "connect").map((item) => item.route),
  account: ACCOUNT_MENU_ROUTES,
  boss: BOSS_MENU_ROUTES,
  other: ["powerful-point", "account/avatar", "terms", "privacy", "refund", "success", "cancel"]
};

const MENU_GROUP_INDEX = new Map(SITE_MAP_MENU_GROUPS.map((group, index) => [group.id, index] as const));
const SITE_MAP_FALLBACK_INDEX = new Map(SITE_MAP_PAGES.map((page, index) => [page.route, index] as const));
const DEFAULT_SORT_ORDER_BY_ROUTE = new Map<string, number>();

for (const group of SITE_MAP_MENU_GROUPS) {
  const groupBase = (MENU_GROUP_INDEX.get(group.id) ?? SITE_MAP_MENU_GROUPS.length) * 1000;
  const configuredRoutes = DEFAULT_MENU_ROUTE_ORDER[group.id];
  const routes = [
    ...configuredRoutes,
    ...SITE_MAP_PAGES.filter((page) => siteMapMenuGroupForRoute(page.route) === group.id)
      .map((page) => page.route)
      .filter((route) => !configuredRoutes.includes(route))
  ];
  routes.forEach((route, index) => DEFAULT_SORT_ORDER_BY_ROUTE.set(route, groupBase + index * 10));
}

export function defaultSortOrderForRoute(route: string): number {
  return DEFAULT_SORT_ORDER_BY_ROUTE.get(route) ?? 10000 + (SITE_MAP_FALLBACK_INDEX.get(route) ?? SITE_MAP_PAGES.length) * 10;
}

export function pageSortOrder(route: string, statuses: PageStatusMap): number {
  const value = statuses[route]?.sortOrder;
  return Number.isInteger(value) && value >= 0 ? value : defaultSortOrderForRoute(route);
}

export function compareRoutesByPageOrder(routeA: string, routeB: string, statuses: PageStatusMap): number {
  return (
    pageSortOrder(routeA, statuses) - pageSortOrder(routeB, statuses) ||
    defaultSortOrderForRoute(routeA) - defaultSortOrderForRoute(routeB) ||
    routeA.localeCompare(routeB)
  );
}

export function orderItemsByPageOrder<T>(
  items: readonly T[],
  statuses: PageStatusMap,
  routeForItem: (item: T) => string
): T[] {
  return [...items].sort((itemA, itemB) => compareRoutesByPageOrder(routeForItem(itemA), routeForItem(itemB), statuses));
}

export function orderedSiteMapPages(statuses: PageStatusMap): SiteMapPage[] {
  return [...SITE_MAP_PAGES].sort((pageA, pageB) => {
    const groupA = siteMapMenuGroupForRoute(pageA.route);
    const groupB = siteMapMenuGroupForRoute(pageB.route);
    return (
      (MENU_GROUP_INDEX.get(groupA) ?? SITE_MAP_MENU_GROUPS.length) -
        (MENU_GROUP_INDEX.get(groupB) ?? SITE_MAP_MENU_GROUPS.length) ||
      compareRoutesByPageOrder(pageA.route, pageB.route, statuses)
    );
  });
}

export function getDefaultPageStatusMap(): PageStatusMap {
  return SITE_MAP_PAGES.reduce<PageStatusMap>((acc, page) => {
    acc[page.route] = {
      room: page.defaultRoom,
      status: page.defaultStatus,
      sortOrder: defaultSortOrderForRoute(page.route)
    };
    return acc;
  }, {});
}

function normalizeLegacyValue(route: string, value: string): PageAccessConfig | null {
  const defaults = getDefaultPageStatusMap();
  const fallback = defaults[route] ?? { room: "Lobby", status: "public" as const, sortOrder: defaultSortOrderForRoute(route) };

  if (value === "Lobby" || value === "Game" || value === "Boss") return { ...fallback, room: value };
  if (value === "Off") return { ...fallback, status: "off" };
  if (value === "public" || value === "edit" || value === "off") return { ...fallback, status: value };
  return null;
}

function normalizeAccessConfig(route: string, rawValue: unknown): PageAccessConfig | null {
  if (typeof rawValue === "string") return normalizeLegacyValue(route, rawValue);
  if (!rawValue || typeof rawValue !== "object") return null;

  const value = rawValue as Partial<PageAccessConfig> & { sort_order?: unknown };
  const defaults = getDefaultPageStatusMap();
  const fallback = defaults[route] ?? { room: "Lobby", status: "public" as const, sortOrder: defaultSortOrderForRoute(route) };
  const room = value.room === "Lobby" || value.room === "Game" || value.room === "Boss" ? value.room : fallback.room;
  const status = value.status === "public" || value.status === "edit" || value.status === "off" ? value.status : fallback.status;
  const rawSortOrder = value.sortOrder ?? value.sort_order;
  const sortOrder = typeof rawSortOrder === "number" && Number.isInteger(rawSortOrder) && rawSortOrder >= 0
    ? rawSortOrder
    : fallback.sortOrder;
  return { room, status, sortOrder };
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
    const legacyStatuses = LEGACY_PAGE_STATUS_STORAGE_KEYS.map((key) => readRawStatusMap(key)).find(Boolean);
    return { ...defaults, ...(readRawStatusMap(PAGE_STATUS_STORAGE_KEY) ?? legacyStatuses ?? {}) };
  } catch {
    return defaults;
  }
}

export function writePageStatusMap(statuses: PageStatusMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PAGE_STATUS_STORAGE_KEY, JSON.stringify(statuses));
  } catch {
    // The shared database remains authoritative when browser storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(PAGE_STATUS_EVENT, { detail: statuses }));
}

function pageStatusMapFromRows(rows: SitePageStatusRow[]): PageStatusMap {
  const defaults = getDefaultPageStatusMap();
  return rows.reduce<PageStatusMap>((acc, row) => {
    const normalized = normalizeAccessConfig(row.route, row);
    if (normalized) acc[row.route] = normalized;
    return acc;
  }, defaults);
}

export async function fetchPageStatusMap(): Promise<PageStatusMap> {
  const fallback = readPageStatusMap();
  if (!supabase) return fallback;

  const orderedResult = await supabase
    .from(SITE_PAGE_STATUS_TABLE)
    .select("route,room,status,sort_order")
    .order("sort_order")
    .order("route");
  let rows = orderedResult.data as SitePageStatusRow[] | null;
  let error = orderedResult.error;

  if (error && (error.code === "42703" || error.code === "PGRST204")) {
    const legacyResult = await supabase
      .from(SITE_PAGE_STATUS_TABLE)
      .select("route,room,status")
      .order("route");
    rows = legacyResult.data as SitePageStatusRow[] | null;
    error = legacyResult.error;
  }

  if (error) {
    if (error.code === "42P01" || error.code === "PGRST205") return fallback;
    throw error;
  }

  const statuses = pageStatusMapFromRows(rows ?? []);
  writePageStatusMap(statuses);
  return statuses;
}

export async function publishPageStatusMap(statuses: PageStatusMap): Promise<PageStatusMap> {
  if (!supabase) {
    throw new Error("Shared publishing is unavailable because Supabase is not configured.");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in as an administrator before publishing the site map.");

  const { data: currentRows, error: currentRowsError } = await supabase
    .from(SITE_PAGE_STATUS_TABLE)
    .select("route,room,status,sort_order");
  if (currentRowsError && (currentRowsError.code === "42703" || currentRowsError.code === "PGRST204")) {
    throw new Error("Menu ordering is not installed in the shared Site Map database yet. Apply the latest database migration, then publish again.");
  }
  if (currentRowsError) throw currentRowsError;

  const currentByRoute = new Map(
    ((currentRows as SitePageStatusRow[] | null) ?? []).map((row) => [row.route, row] as const)
  );
  const updatedAt = new Date().toISOString();
  const rows = SITE_MAP_PAGES.flatMap((page) => {
    const config = statuses[page.route] ?? {
      room: page.defaultRoom,
      status: page.defaultStatus,
      sortOrder: defaultSortOrderForRoute(page.route)
    };
    const current = currentByRoute.get(page.route);
    if (current?.room === config.room && current.status === config.status && current.sort_order === config.sortOrder) return [];
    return [{
      route: page.route,
      room: config.room,
      status: config.status,
      sort_order: config.sortOrder,
      updated_at: updatedAt,
      updated_by: user.id
    }];
  });

  if (rows.length > 0) {
    const { error } = await supabase.from(SITE_PAGE_STATUS_TABLE).upsert(rows, { onConflict: "route" });
    if (error) throw error;
  }

  const published = { ...getDefaultPageStatusMap(), ...statuses };
  writePageStatusMap(published);
  return published;
}

export function subscribeToPageStatusMap(onChange: (statuses: PageStatusMap) => void): () => void {
  if (!supabase) return () => undefined;
  const client = supabase;
  let refreshTimer: number | null = null;

  const channel = client
    .channel("site-page-statuses")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: SITE_PAGE_STATUS_TABLE
      },
      () => {
        if (refreshTimer !== null) window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          refreshTimer = null;
          void fetchPageStatusMap().then(onChange).catch(() => undefined);
        }, 120);
      }
    )
    .subscribe();

  return () => {
    if (refreshTimer !== null) window.clearTimeout(refreshTimer);
    void client.removeChannel(channel);
  };
}

export function configForRoute(route: string, statuses: PageStatusMap): PageAccessConfig {
  const defaults = getDefaultPageStatusMap();
  if (route.startsWith("app/regions/")) return statuses["app/regions"] ?? defaults["app/regions"] ?? { room: "Game", status: "public", sortOrder: defaultSortOrderForRoute("app/regions") };
  if (route.startsWith("app/grapes/")) return statuses["app/grapes"] ?? defaults["app/grapes"] ?? { room: "Game", status: "public", sortOrder: defaultSortOrderForRoute("app/grapes") };
  if (route.startsWith("app/ai-winecast/")) return statuses["app/ai-winecast"] ?? defaults["app/ai-winecast"] ?? { room: "Game", status: "public", sortOrder: defaultSortOrderForRoute("app/ai-winecast") };
  return statuses[route] ?? defaults[route] ?? { room: "Lobby", status: "public", sortOrder: defaultSortOrderForRoute(route) };
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
