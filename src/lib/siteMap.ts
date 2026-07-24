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
};

export type PageStatusMap = Record<string, PageAccessConfig>;

export const PAGE_STATUS_STORAGE_KEY = "sipstudies:page-statuses:v2";
export const LEGACY_PAGE_STATUS_STORAGE_KEY = "sipstudies:page-statuses:v1";
export const PAGE_STATUS_EVENT = "sipstudies:page-statuses-changed";
const SITE_PAGE_STATUS_TABLE = "site_page_statuses";

type SitePageStatusRow = {
  route: string;
  room: PageRoomAccess;
  status: PagePublicationStatus;
};

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
    room: "Game" as const,
    section: WORKSPACE_SECTION_LABELS[item.section],
    description: item.description,
    defaultRoom: "Game" as const,
    defaultStatus: "public" as const
  })),
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

  const { data, error } = await supabase
    .from(SITE_PAGE_STATUS_TABLE)
    .select("route,room,status")
    .order("route");

  if (error) {
    if (error.code === "42P01" || error.code === "PGRST205") return fallback;
    throw error;
  }

  const statuses = pageStatusMapFromRows((data as SitePageStatusRow[] | null) ?? []);
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
    .select("route,room,status");
  if (currentRowsError) throw currentRowsError;

  const currentByRoute = new Map(
    ((currentRows as SitePageStatusRow[] | null) ?? []).map((row) => [row.route, row] as const)
  );
  const updatedAt = new Date().toISOString();
  const rows = SITE_MAP_PAGES.flatMap((page) => {
    const config = statuses[page.route] ?? { room: page.defaultRoom, status: page.defaultStatus };
    const current = currentByRoute.get(page.route);
    if (current?.room === config.room && current.status === config.status) return [];
    return [{
      route: page.route,
      room: config.room,
      status: config.status,
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
