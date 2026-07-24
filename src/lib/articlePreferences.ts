import { supabase } from "./supabase";

export const ARTICLE_PREFERENCE_SURFACES = ["beverage-news", "flavor-blog", "favorites"] as const;

export type ArticlePreferenceSurface = (typeof ARTICLE_PREFERENCE_SURFACES)[number];
export type ArticleReadingFilter = "all" | "unread";
export type BeverageNewsPageSize = 12 | 24 | 48 | 120;
export type BeverageNewsFilterPreset = "all-news" | "all-guilds" | "all-mags" | "all-regs" | "custom";
export type FlavorBlogPageSize = 12 | 24 | 48 | 120 | 240;
export type FlavorBlogFilter = "all" | "sipstudies-site" | "sipstudies-substack" | "daily-sip";
export type FavoritesFilter = "all" | "flavor-blog" | "beverage-news";

export type BeverageNewsSourceFilters = {
  preset: BeverageNewsFilterPreset;
  selectedGuildIds: string[];
  selectedMagazineIds: string[];
  selectedBlogIds: string[];
  selectedRegulatorIds: string[];
};

export type BeverageNewsPreferences = {
  readingFilter: ArticleReadingFilter;
  articlesPerPage: BeverageNewsPageSize;
  filters: BeverageNewsSourceFilters;
};

export type FlavorBlogPreferences = {
  readingFilter: ArticleReadingFilter;
  articlesPerPage: FlavorBlogPageSize;
  filter: FlavorBlogFilter;
};

export type FavoritesPreferences = {
  filter: FavoritesFilter;
  unreadOnly: boolean;
};

export type BeverageNewsPreferencesUpdate =
  Partial<Omit<BeverageNewsPreferences, "filters">> & {
    filters?: Partial<BeverageNewsSourceFilters>;
  };
export type FlavorBlogPreferencesUpdate = Partial<FlavorBlogPreferences>;
export type FavoritesPreferencesUpdate = Partial<FavoritesPreferences>;

export type ArticlePreferenceRecord =
  | {
      surface: "beverage-news";
      preferences: BeverageNewsPreferences;
      updatedAt: string;
    }
  | {
      surface: "flavor-blog";
      preferences: FlavorBlogPreferences;
      updatedAt: string;
    }
  | {
      surface: "favorites";
      preferences: FavoritesPreferences;
      updatedAt: string;
    };

type ArticlePreferenceRow = {
  user_id: string;
  surface: string;
  preferences: unknown;
  updated_at: string;
};

export type ArticlePreferencesCloudErrorKind = "unavailable" | "permission" | "temporary";

export class ArticlePreferencesCloudError extends Error {
  readonly kind: ArticlePreferencesCloudErrorKind;

  constructor(kind: ArticlePreferencesCloudErrorKind, message: string) {
    super(message);
    this.name = "ArticlePreferencesCloudError";
    this.kind = kind;
  }
}

const ARTICLE_PREFERENCES_TABLE = "article_user_preferences";
const ARTICLE_PREFERENCES_STORAGE_PREFIX = "sipstudies:article-preferences:v1";
const MAX_SELECTED_IDS_PER_GROUP = 50;
const MAX_SELECTED_ID_LENGTH = 120;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/g;

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isOneOf<T extends string | number>(value: unknown, allowed: readonly T[]): value is T {
  return (typeof value === "string" || typeof value === "number") && allowed.includes(value as T);
}

function sanitizeSelectedIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const sanitized: string[] = [];
  const seen = new Set<string>();
  for (const candidate of value) {
    if (typeof candidate !== "string") continue;
    const id = candidate
      .replace(CONTROL_CHARACTERS, "")
      .trim()
      .slice(0, MAX_SELECTED_ID_LENGTH)
      .trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    sanitized.push(id);
    if (sanitized.length >= MAX_SELECTED_IDS_PER_GROUP) break;
  }
  return sanitized;
}

export function defaultBeverageNewsPreferences(): BeverageNewsPreferences {
  return {
    readingFilter: "all",
    articlesPerPage: 12,
    filters: {
      preset: "all-news",
      selectedGuildIds: [],
      selectedMagazineIds: [],
      selectedBlogIds: [],
      selectedRegulatorIds: []
    }
  };
}

export function defaultFlavorBlogPreferences(): FlavorBlogPreferences {
  return {
    readingFilter: "all",
    articlesPerPage: 12,
    filter: "all"
  };
}

export function defaultFavoritesPreferences(): FavoritesPreferences {
  return {
    filter: "all",
    unreadOnly: false
  };
}

export function sanitizeBeverageNewsPreferences(value: unknown): BeverageNewsPreferences {
  const defaults = defaultBeverageNewsPreferences();
  if (!isObject(value)) return defaults;

  const filters = isObject(value.filters) ? value.filters : {};
  const pageSizes: readonly BeverageNewsPageSize[] = [12, 24, 48, 120];
  const presets: readonly BeverageNewsFilterPreset[] = [
    "all-news",
    "all-guilds",
    "all-mags",
    "all-regs",
    "custom"
  ];

  return {
    readingFilter: isOneOf(value.readingFilter, ["all", "unread"] as const)
      ? value.readingFilter
      : defaults.readingFilter,
    articlesPerPage: isOneOf(value.articlesPerPage, pageSizes)
      ? value.articlesPerPage
      : defaults.articlesPerPage,
    filters: {
      preset: isOneOf(filters.preset, presets) ? filters.preset : defaults.filters.preset,
      selectedGuildIds: sanitizeSelectedIds(filters.selectedGuildIds),
      selectedMagazineIds: sanitizeSelectedIds(filters.selectedMagazineIds),
      selectedBlogIds: sanitizeSelectedIds(filters.selectedBlogIds),
      selectedRegulatorIds: sanitizeSelectedIds(filters.selectedRegulatorIds)
    }
  };
}

export function sanitizeFlavorBlogPreferences(value: unknown): FlavorBlogPreferences {
  const defaults = defaultFlavorBlogPreferences();
  if (!isObject(value)) return defaults;

  const pageSizes: readonly FlavorBlogPageSize[] = [12, 24, 48, 120, 240];
  const filters: readonly FlavorBlogFilter[] = [
    "all",
    "sipstudies-site",
    "sipstudies-substack",
    "daily-sip"
  ];

  return {
    readingFilter: isOneOf(value.readingFilter, ["all", "unread"] as const)
      ? value.readingFilter
      : defaults.readingFilter,
    articlesPerPage: isOneOf(value.articlesPerPage, pageSizes)
      ? value.articlesPerPage
      : defaults.articlesPerPage,
    filter: isOneOf(value.filter, filters) ? value.filter : defaults.filter
  };
}

export function sanitizeFavoritesPreferences(value: unknown): FavoritesPreferences {
  const defaults = defaultFavoritesPreferences();
  if (!isObject(value)) return defaults;

  return {
    filter: isOneOf(value.filter, ["all", "flavor-blog", "beverage-news"] as const)
      ? value.filter
      : defaults.filter,
    unreadOnly: typeof value.unreadOnly === "boolean" ? value.unreadOnly : defaults.unreadOnly
  };
}

function validTimestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function normalizeArticlePreferenceRecord(value: unknown): ArticlePreferenceRecord | null {
  if (!isObject(value) || !validTimestamp(value.updatedAt)) return null;

  if (value.surface === "beverage-news") {
    return {
      surface: value.surface,
      preferences: sanitizeBeverageNewsPreferences(value.preferences),
      updatedAt: value.updatedAt
    };
  }
  if (value.surface === "flavor-blog") {
    return {
      surface: value.surface,
      preferences: sanitizeFlavorBlogPreferences(value.preferences),
      updatedAt: value.updatedAt
    };
  }
  if (value.surface === "favorites") {
    return {
      surface: value.surface,
      preferences: sanitizeFavoritesPreferences(value.preferences),
      updatedAt: value.updatedAt
    };
  }
  return null;
}

function timestampValue(value: string): number {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function nextArticlePreferenceTimestamp(previous?: string): string {
  const previousValue = previous ? timestampValue(previous) : 0;
  const nextValue = Math.max(Date.now(), previousValue + 1);
  return new Date(Math.min(nextValue, 8_639_999_999_999_999)).toISOString();
}

export function findArticlePreferenceRecord(
  records: ArticlePreferenceRecord[],
  surface: ArticlePreferenceSurface
): ArticlePreferenceRecord | undefined {
  return records.find((record) => record.surface === surface);
}

export function mergeArticlePreferenceRecords(
  localRecords: ArticlePreferenceRecord[],
  cloudRecords: ArticlePreferenceRecord[]
): ArticlePreferenceRecord[] {
  const merged = new Map<ArticlePreferenceSurface, ArticlePreferenceRecord>();

  for (const record of cloudRecords) {
    const current = merged.get(record.surface);
    if (!current || timestampValue(record.updatedAt) > timestampValue(current.updatedAt)) {
      merged.set(record.surface, record);
    }
  }
  for (const record of localRecords) {
    const current = merged.get(record.surface);
    if (!current || timestampValue(record.updatedAt) > timestampValue(current.updatedAt)) {
      merged.set(record.surface, record);
    }
  }

  return ARTICLE_PREFERENCE_SURFACES.flatMap((surface) => {
    const record = merged.get(surface);
    return record ? [record] : [];
  });
}

export function articlePreferenceRecordsNeedingCloudSave(
  localRecords: ArticlePreferenceRecord[],
  cloudRecords: ArticlePreferenceRecord[]
): ArticlePreferenceRecord[] {
  const cloudBySurface = new Map(cloudRecords.map((record) => [record.surface, record] as const));
  return localRecords.filter((localRecord) => {
    const cloudRecord = cloudBySurface.get(localRecord.surface);
    return !cloudRecord || timestampValue(localRecord.updatedAt) > timestampValue(cloudRecord.updatedAt);
  });
}

function storageKey(scope: string): string {
  const normalizedScope = scope.trim() || "guest";
  return `${ARTICLE_PREFERENCES_STORAGE_PREFIX}:${encodeURIComponent(normalizedScope)}`;
}

export function readLocalArticlePreferences(scope: string): ArticlePreferenceRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey(scope));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    const candidates = Array.isArray(parsed)
      ? parsed
      : isObject(parsed) && Array.isArray(parsed.records)
        ? parsed.records
        : [];
    const normalized = candidates.flatMap((candidate) => {
      const record = normalizeArticlePreferenceRecord(candidate);
      return record ? [record] : [];
    });
    return mergeArticlePreferenceRecords(normalized, []);
  } catch {
    return [];
  }
}

export function writeLocalArticlePreferences(scope: string, records: ArticlePreferenceRecord[]): void {
  if (typeof window === "undefined") return;

  try {
    const normalized = mergeArticlePreferenceRecords(records, []);
    window.localStorage.setItem(
      storageKey(scope),
      JSON.stringify({
        version: 1,
        records: normalized
      })
    );
  } catch {
    // In-memory preferences remain usable when browser storage is unavailable.
  }
}

function mapCloudError(error: { code?: string; message?: string }): ArticlePreferencesCloudError {
  const details = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
  if (
    details.includes("pgrst205") ||
    details.includes("42p01") ||
    details.includes("article_user_preferences") &&
      (details.includes("not find") || details.includes("does not exist") || details.includes("schema cache"))
  ) {
    return new ArticlePreferencesCloudError(
      "unavailable",
      "Cloud article preferences are not available yet."
    );
  }
  if (details.includes("permission denied") || details.includes("row-level security")) {
    return new ArticlePreferencesCloudError(
      "permission",
      "Your account cannot update article preferences."
    );
  }
  return new ArticlePreferencesCloudError(
    "temporary",
    "Cloud article preferences are temporarily unavailable."
  );
}

function fromRow(row: ArticlePreferenceRow): ArticlePreferenceRecord | null {
  const value = {
    surface: row.surface,
    preferences: row.preferences,
    updatedAt: row.updated_at
  };
  return normalizeArticlePreferenceRecord(value);
}

function toRow(userId: string, record: ArticlePreferenceRecord) {
  return {
    user_id: userId,
    surface: record.surface,
    preferences: record.preferences,
    updated_at: record.updatedAt
  };
}

export function isArticlePreferencesTableUnavailable(error: unknown): boolean {
  return error instanceof ArticlePreferencesCloudError && error.kind === "unavailable";
}

export async function listCloudArticlePreferences(userId: string): Promise<ArticlePreferenceRecord[]> {
  if (!supabase) {
    throw new ArticlePreferencesCloudError("unavailable", "Cloud article preferences are not configured.");
  }

  const { data, error } = await supabase
    .from(ARTICLE_PREFERENCES_TABLE)
    .select("user_id,surface,preferences,updated_at")
    .eq("user_id", userId);

  if (error) throw mapCloudError(error);
  return ((data ?? []) as ArticlePreferenceRow[]).flatMap((row) => {
    const record = fromRow(row);
    return record ? [record] : [];
  });
}

export async function saveCloudArticlePreference(
  userId: string,
  record: ArticlePreferenceRecord
): Promise<ArticlePreferenceRecord> {
  if (!supabase) {
    throw new ArticlePreferencesCloudError("unavailable", "Cloud article preferences are not configured.");
  }

  const { data, error } = await supabase
    .from(ARTICLE_PREFERENCES_TABLE)
    .upsert(toRow(userId, record), { onConflict: "user_id,surface" })
    .select("user_id,surface,preferences,updated_at")
    .single();

  if (error) throw mapCloudError(error);
  const saved = fromRow(data as ArticlePreferenceRow);
  if (!saved) {
    throw new ArticlePreferencesCloudError(
      "temporary",
      "Cloud article preferences returned an invalid response."
    );
  }
  return saved;
}
