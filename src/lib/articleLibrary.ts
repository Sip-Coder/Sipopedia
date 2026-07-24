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
  readStateUpdatedAt: string | null;
  favoriteStateUpdatedAt: string | null;
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
  read_state_updated_at: string | null;
  favorite_state_updated_at: string | null;
  created_at: string;
  updated_at: string;
};

const ARTICLE_LIBRARY_STORAGE_PREFIX = "sipstudies:article-library:v1";
const ARTICLE_LIBRARY_TABLE = "article_user_states";
const ARTICLE_LIBRARY_MERGE_FUNCTION = "merge_article_user_state";
const MAX_DATE_MS = 8_640_000_000_000_000;
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
    readStateUpdatedAt: null,
    favoriteStateUpdatedAt: null,
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

function asTimestamp(value: unknown): string | null {
  if (typeof value !== "string" || value.length === 0) return null;
  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

function timestampValue(value: string | null | undefined): number {
  if (!value) return Number.NEGATIVE_INFINITY;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : Number.NEGATIVE_INFINITY;
}

function newestTimestamp(...values: Array<string | null | undefined>): string | null {
  let newest: string | null = null;
  let newestValue = Number.NEGATIVE_INFINITY;
  for (const value of values) {
    const time = timestampValue(value);
    if (time > newestValue && value) {
      newest = value;
      newestValue = time;
    }
  }
  return newest;
}

export function nextArticleLibraryTimestamp(...after: Array<string | null | undefined>): string {
  const newest = after.reduce((current, value) => Math.max(current, timestampValue(value)), Number.NEGATIVE_INFINITY);
  const next = Math.max(Date.now(), Number.isFinite(newest) ? Math.min(newest + 1, MAX_DATE_MS) : Date.now());
  return new Date(Math.min(next, MAX_DATE_MS)).toISOString();
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
  const createdAt = asTimestamp(value.createdAt) ?? now;
  const updatedAt = asTimestamp(value.updatedAt) ?? createdAt;
  const isRead = value.isRead === true;
  const isFavorite = value.isFavorite === true;
  const storedReadAt = asTimestamp(value.readAt);
  const storedFavoritedAt = asTimestamp(value.favoritedAt);
  // Legacy cache rows used one updatedAt clock for the whole record. Positive
  // states can be safely promoted because their event time is recoverable;
  // an ambiguous legacy `false` must not erase a newer cloud state.
  const readStateUpdatedAt =
    asTimestamp(value.readStateUpdatedAt) ?? (isRead ? storedReadAt ?? updatedAt : null);
  const favoriteStateUpdatedAt =
    asTimestamp(value.favoriteStateUpdatedAt) ?? (isFavorite ? storedFavoritedAt ?? updatedAt : null);
  return {
    ...article,
    articleKey: asString(value.articleKey).slice(0, 700) || articleKeyFor(article),
    isRead,
    isFavorite,
    readAt: isRead ? storedReadAt ?? readStateUpdatedAt : null,
    favoritedAt: isFavorite ? storedFavoritedAt ?? favoriteStateUpdatedAt : null,
    readStateUpdatedAt,
    favoriteStateUpdatedAt,
    createdAt,
    updatedAt: newestTimestamp(updatedAt, readStateUpdatedAt, favoriteStateUpdatedAt) ?? updatedAt
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

export function writeLocalArticleLibrary(scope: string, items: ArticleLibraryItem[]): boolean {
  if (typeof window === "undefined") return false;
  try {
    const serialized = JSON.stringify(items);
    window.localStorage.setItem(storageKey(scope), serialized);
    return window.localStorage.getItem(storageKey(scope)) === serialized;
  } catch {
    // The in-memory list remains usable if browser storage is unavailable.
    return false;
  }
}

export function clearLocalArticleLibrary(scope: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(storageKey(scope));
    return window.localStorage.getItem(storageKey(scope)) === null;
  } catch {
    // Ignore storage failures; cloud sync can still continue.
    return false;
  }
}

function fromRow(row: ArticleStateRow): ArticleLibraryItem {
  const now = new Date().toISOString();
  const createdAt = asTimestamp(row.created_at) ?? now;
  const updatedAt = asTimestamp(row.updated_at) ?? createdAt;
  const readAt = asTimestamp(row.read_at);
  const favoritedAt = asTimestamp(row.favorited_at);
  const readStateUpdatedAt =
    asTimestamp(row.read_state_updated_at) ?? (row.is_read ? readAt ?? updatedAt : null);
  const favoriteStateUpdatedAt =
    asTimestamp(row.favorite_state_updated_at) ?? (row.is_favorite ? favoritedAt ?? updatedAt : null);
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
    readAt: row.is_read ? readAt ?? readStateUpdatedAt : null,
    favoritedAt: row.is_favorite ? favoritedAt ?? favoriteStateUpdatedAt : null,
    readStateUpdatedAt,
    favoriteStateUpdatedAt,
    createdAt,
    updatedAt: newestTimestamp(updatedAt, readStateUpdatedAt, favoriteStateUpdatedAt) ?? updatedAt
  };
}

function toStatePayload(item: ArticleLibraryItem) {
  return {
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
    read_state_updated_at: item.readStateUpdatedAt,
    favorite_state_updated_at: item.favoriteStateUpdatedAt,
    created_at: item.createdAt,
    updated_at: item.updatedAt
  };
}

function mapLibraryError(message: string): string {
  const normalized = message.toLowerCase();
  if (
    normalized.includes("article_user_states") ||
    normalized.includes("merge_article_user_state") ||
    normalized.includes("pgrst202") ||
    normalized.includes("pgrst205") ||
    normalized.includes("42p01")
  ) {
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

export async function saveCloudArticleLibraryItem(_userId: string, item: ArticleLibraryItem): Promise<ArticleLibraryItem> {
  if (!supabase) throw new Error("Cloud article sync is not configured.");

  // The database derives ownership from auth.uid(). Keeping user_id out of
  // the payload prevents a browser from selecting another account, while the
  // RPC atomically merges the independent read and favorite clocks.
  const { data, error } = await supabase
    .rpc(ARTICLE_LIBRARY_MERGE_FUNCTION, { p_state: toStatePayload(item) })
    .single();
  if (error) throw new Error(mapLibraryError(`${error.code ?? ""} ${error.message}`));
  return fromRow(data as ArticleStateRow);
}

export async function saveCloudArticleLibrary(userId: string, items: ArticleLibraryItem[]): Promise<void> {
  if (!supabase) throw new Error("Cloud article sync is not configured.");
  if (items.length === 0) return;
  await Promise.all(items.map((item) => saveCloudArticleLibraryItem(userId, item)));
}

type ArticleStateField = "read" | "favorite";

function fieldParts(item: ArticleLibraryItem, field: ArticleStateField) {
  return field === "read"
    ? {
        value: item.isRead,
        eventAt: item.readAt,
        stateUpdatedAt: item.readStateUpdatedAt
      }
    : {
        value: item.isFavorite,
        eventAt: item.favoritedAt,
        stateUpdatedAt: item.favoriteStateUpdatedAt
      };
}

function incomingFieldWins(
  current: ArticleLibraryItem,
  incoming: ArticleLibraryItem,
  field: ArticleStateField
): boolean {
  const currentField = fieldParts(current, field);
  const incomingField = fieldParts(incoming, field);
  const currentClock = timestampValue(currentField.stateUpdatedAt);
  const incomingClock = timestampValue(incomingField.stateUpdatedAt);
  if (incomingClock !== currentClock) return incomingClock > currentClock;
  // A deterministic tie-break keeps every device convergent. False wins a
  // true tie so an explicit unread/remove action cannot be resurrected.
  return currentField.value && !incomingField.value;
}

function mergeArticleLibraryItemPair(
  current: ArticleLibraryItem,
  incoming: ArticleLibraryItem
): ArticleLibraryItem {
  const currentUpdatedAt = timestampValue(current.updatedAt);
  const incomingUpdatedAt = timestampValue(incoming.updatedAt);
  const metadata =
    incomingUpdatedAt > currentUpdatedAt
      ? { ...current, ...incoming }
      : { ...incoming, ...current };
  const readSource = incomingFieldWins(current, incoming, "read") ? incoming : current;
  const favoriteSource = incomingFieldWins(current, incoming, "favorite") ? incoming : current;
  const createdAt =
    timestampValue(current.createdAt) <= timestampValue(incoming.createdAt)
      ? current.createdAt
      : incoming.createdAt;
  const updatedAt =
    newestTimestamp(
      current.updatedAt,
      incoming.updatedAt,
      readSource.readStateUpdatedAt,
      favoriteSource.favoriteStateUpdatedAt
    ) ?? metadata.updatedAt;

  return {
    ...metadata,
    articleKey: current.articleKey,
    isRead: readSource.isRead,
    readAt: readSource.isRead ? readSource.readAt ?? readSource.readStateUpdatedAt : null,
    readStateUpdatedAt: readSource.readStateUpdatedAt,
    isFavorite: favoriteSource.isFavorite,
    favoritedAt: favoriteSource.isFavorite
      ? favoriteSource.favoritedAt ?? favoriteSource.favoriteStateUpdatedAt
      : null,
    favoriteStateUpdatedAt: favoriteSource.favoriteStateUpdatedAt,
    createdAt,
    updatedAt
  };
}

export function mergeArticleLibraryItems(
  localItems: ArticleLibraryItem[],
  cloudItems: ArticleLibraryItem[]
): ArticleLibraryItem[] {
  const merged = new Map<string, ArticleLibraryItem>();
  for (const item of [...cloudItems, ...localItems]) {
    const current = merged.get(item.articleKey);
    merged.set(item.articleKey, current ? mergeArticleLibraryItemPair(current, item) : item);
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
    if (!cloudItem) {
      return item.readStateUpdatedAt !== null || item.favoriteStateUpdatedAt !== null;
    }
    return (
      incomingFieldWins(cloudItem, item, "read") ||
      incomingFieldWins(cloudItem, item, "favorite")
    );
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
    const positiveGuestItem: ArticleLibraryItem = {
      ...guestItem,
      // Guest tombstones are not account decisions. Import only positive
      // guest activity, and let its field clock compete with account state.
      isRead: guestItem.isRead,
      readAt: guestItem.isRead ? guestItem.readAt : null,
      readStateUpdatedAt: guestItem.isRead ? guestItem.readStateUpdatedAt : null,
      isFavorite: guestItem.isFavorite,
      favoritedAt: guestItem.isFavorite ? guestItem.favoritedAt : null,
      favoriteStateUpdatedAt: guestItem.isFavorite ? guestItem.favoriteStateUpdatedAt : null
    };
    if (!current) {
      merged.set(guestItem.articleKey, positiveGuestItem);
      continue;
    }
    merged.set(guestItem.articleKey, mergeArticleLibraryItemPair(current, positiveGuestItem));
  }
  return [...merged.values()];
}
