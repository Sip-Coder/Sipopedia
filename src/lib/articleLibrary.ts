import { supabase } from "./supabase";

export type ArticleSurface = "beverage-news" | "flavor-blog";

export type ArticleSnapshot = {
  surface: ArticleSurface;
  articleId: string;
  sourceId: string;
  sourceName: string;
  sourceCategory: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
};

export type ArticleLibraryItem = ArticleSnapshot & {
  articleKey: string;
  isRead: boolean;
  isFavorite: boolean;
  readAt: string | null;
  favoritedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type ArticleStateRow = {
  user_id: string;
  article_key: string;
  surface: ArticleSurface;
  article_id: string;
  source_id: string;
  source_name: string;
  source_category: string;
  title: string;
  url: string;
  published_at: string;
  summary: string;
  image_url: string | null;
  is_read: boolean;
  is_favorite: boolean;
  read_at: string | null;
  favorited_at: string | null;
  created_at: string;
  updated_at: string;
};

const ARTICLE_LIBRARY_STORAGE_PREFIX = "sipstudies:article-library:v1";
const ARTICLE_LIBRARY_TABLE = "article_user_states";
const TRACKING_QUERY_KEYS = new Set(["fbclid", "gclid", "mc_cid", "mc_eid"]);

function normalizedUrlIdentity(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.username || url.password) return null;

    for (const key of [...url.searchParams.keys()]) {
      if (key.toLowerCase().startsWith("utm_") || TRACKING_QUERY_KEYS.has(key.toLowerCase())) {
        url.searchParams.delete(key);
      }
    }

    const isSipStudiesRoute =
      url.hostname === "sipopedia.com" ||
      url.hostname === "www.sipopedia.com" ||
      url.hostname === "sipstudies.com" ||
      url.hostname === "www.sipstudies.com";
    if (!isSipStudiesRoute) url.hash = "";
    if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return null;
  }
}

export function articleKeyFor(article: ArticleSnapshot): string {
  const normalizedUrl = normalizedUrlIdentity(article.url);
  if (normalizedUrl && normalizedUrl.length <= 700) return `url:${normalizedUrl}`;
  return `${article.surface}:${article.sourceId}:${article.articleId}`.slice(0, 700);
}

export function createArticleLibraryItem(article: ArticleSnapshot, now = new Date().toISOString()): ArticleLibraryItem {
  return {
    ...article,
    articleKey: articleKeyFor(article),
    isRead: false,
    isFavorite: false,
    readAt: null,
    favoritedAt: null,
    createdAt: now,
    updatedAt: now
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNullableString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizeStoredItem(value: unknown): ArticleLibraryItem | null {
  if (!isObject(value)) return null;
  const surface = value.surface;
  if (surface !== "beverage-news" && surface !== "flavor-blog") return null;

  const article: ArticleSnapshot = {
    surface,
    articleId: asString(value.articleId).slice(0, 300),
    sourceId: asString(value.sourceId).slice(0, 200),
    sourceName: asString(value.sourceName).slice(0, 200),
    sourceCategory: asString(value.sourceCategory).slice(0, 120),
    title: asString(value.title).slice(0, 500),
    url: asString(value.url).slice(0, 2000),
    publishedAt: asString(value.publishedAt),
    summary: asString(value.summary).slice(0, 1200),
    imageUrl: asString(value.imageUrl).slice(0, 2000) || undefined
  };
  if (!article.title || !article.url) return null;

  const now = new Date().toISOString();
  return {
    ...article,
    articleKey: asString(value.articleKey).slice(0, 700) || articleKeyFor(article),
    isRead: value.isRead === true,
    isFavorite: value.isFavorite === true,
    readAt: asNullableString(value.readAt),
    favoritedAt: asNullableString(value.favoritedAt),
    createdAt: asString(value.createdAt) || now,
    updatedAt: asString(value.updatedAt) || now
  };
}

function storageKey(scope: string): string {
  return `${ARTICLE_LIBRARY_STORAGE_PREFIX}:${scope}`;
}

export function readLocalArticleLibrary(scope: string): ArticleLibraryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(scope));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const byKey = new Map<string, ArticleLibraryItem>();
    for (const candidate of parsed) {
      const item = normalizeStoredItem(candidate);
      if (!item) continue;
      const current = byKey.get(item.articleKey);
      if (!current || Date.parse(item.updatedAt) >= Date.parse(current.updatedAt)) {
        byKey.set(item.articleKey, item);
      }
    }
    return [...byKey.values()];
  } catch {
    return [];
  }
}

export function writeLocalArticleLibrary(scope: string, items: ArticleLibraryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(scope), JSON.stringify(items));
  } catch {
    // The in-memory list remains usable if browser storage is unavailable.
  }
}

export function clearLocalArticleLibrary(scope: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey(scope));
  } catch {
    // Ignore storage failures; cloud sync can still continue.
  }
}

function fromRow(row: ArticleStateRow): ArticleLibraryItem {
  return {
    surface: row.surface,
    articleId: row.article_id,
    sourceId: row.source_id,
    sourceName: row.source_name,
    sourceCategory: row.source_category,
    title: row.title,
    url: row.url,
    publishedAt: row.published_at,
    summary: row.summary,
    imageUrl: row.image_url ?? undefined,
    articleKey: row.article_key,
    isRead: row.is_read,
    isFavorite: row.is_favorite,
    readAt: row.read_at,
    favoritedAt: row.favorited_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function toRow(userId: string, item: ArticleLibraryItem) {
  return {
    user_id: userId,
    article_key: item.articleKey,
    surface: item.surface,
    article_id: item.articleId,
    source_id: item.sourceId,
    source_name: item.sourceName,
    source_category: item.sourceCategory,
    title: item.title,
    url: item.url,
    published_at: item.publishedAt,
    summary: item.summary,
    image_url: item.imageUrl ?? null,
    is_read: item.isRead,
    is_favorite: item.isFavorite,
    read_at: item.readAt,
    favorited_at: item.favoritedAt,
    created_at: item.createdAt,
    updated_at: item.updatedAt
  };
}

function mapLibraryError(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("article_user_states") || normalized.includes("pgrst205") || normalized.includes("42p01")) {
    return "Cloud article sync is not available yet.";
  }
  if (normalized.includes("permission denied") || normalized.includes("row-level security")) {
    return "Your account cannot update this reading list.";
  }
  return "Cloud article sync is temporarily unavailable.";
}

export async function listCloudArticleLibrary(userId: string): Promise<ArticleLibraryItem[]> {
  if (!supabase) throw new Error("Cloud article sync is not configured.");
  const { data, error } = await supabase
    .from(ARTICLE_LIBRARY_TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(mapLibraryError(`${error.code ?? ""} ${error.message}`));
  return ((data ?? []) as ArticleStateRow[]).map(fromRow);
}

export async function saveCloudArticleLibraryItem(userId: string, item: ArticleLibraryItem): Promise<void> {
  if (!supabase) throw new Error("Cloud article sync is not configured.");

  const { error } = await supabase
    .from(ARTICLE_LIBRARY_TABLE)
    .upsert(toRow(userId, item), { onConflict: "user_id,article_key" });
  if (error) throw new Error(mapLibraryError(`${error.code ?? ""} ${error.message}`));
}

export async function saveCloudArticleLibrary(userId: string, items: ArticleLibraryItem[]): Promise<void> {
  if (!supabase) throw new Error("Cloud article sync is not configured.");
  if (items.length === 0) return;
  const { error } = await supabase
    .from(ARTICLE_LIBRARY_TABLE)
    .upsert(items.map((item) => toRow(userId, item)), { onConflict: "user_id,article_key" });
  if (error) throw new Error(mapLibraryError(`${error.code ?? ""} ${error.message}`));
}

export function mergeArticleLibraryItems(
  localItems: ArticleLibraryItem[],
  cloudItems: ArticleLibraryItem[]
): ArticleLibraryItem[] {
  const merged = new Map<string, ArticleLibraryItem>();
  for (const item of [...cloudItems, ...localItems]) {
    const current = merged.get(item.articleKey);
    if (!current || Date.parse(item.updatedAt) >= Date.parse(current.updatedAt)) {
      merged.set(item.articleKey, item);
    }
  }
  return [...merged.values()];
}

export function articleLibraryItemsNeedingCloudSave(
  localItems: ArticleLibraryItem[],
  cloudItems: ArticleLibraryItem[]
): ArticleLibraryItem[] {
  const cloudByKey = new Map(cloudItems.map((item) => [item.articleKey, item] as const));
  return localItems.filter((item) => {
    const cloudItem = cloudByKey.get(item.articleKey);
    return !cloudItem || Date.parse(item.updatedAt) > Date.parse(cloudItem.updatedAt);
  });
}

export function mergeGuestArticleLibrary(
  accountItems: ArticleLibraryItem[],
  guestItems: ArticleLibraryItem[]
): ArticleLibraryItem[] {
  const merged = new Map(accountItems.map((item) => [item.articleKey, item] as const));
  for (const guestItem of guestItems) {
    if (!guestItem.isRead && !guestItem.isFavorite) continue;
    const current = merged.get(guestItem.articleKey);
    if (!current) {
      merged.set(guestItem.articleKey, guestItem);
      continue;
    }
    const updatedAt =
      Date.parse(guestItem.updatedAt) > Date.parse(current.updatedAt) ? guestItem.updatedAt : current.updatedAt;
    merged.set(guestItem.articleKey, {
      ...current,
      ...guestItem,
      isRead: current.isRead || guestItem.isRead,
      isFavorite: current.isFavorite || guestItem.isFavorite,
      readAt: current.readAt ?? guestItem.readAt,
      favoritedAt: current.favoritedAt ?? guestItem.favoritedAt,
      createdAt: current.createdAt,
      updatedAt
    });
  }
  return [...merged.values()];
}
