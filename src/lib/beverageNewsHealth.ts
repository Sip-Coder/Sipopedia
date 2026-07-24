export type BeverageNewsHealthStatus = "healthy" | "degraded" | "cached" | "unavailable";

export type BeverageNewsFailedSource = {
  sourceId: string;
  sourceName: string;
};

export type BeverageNewsHealth = {
  checkedAt: string;
  status: BeverageNewsHealthStatus;
  sourceCount: number;
  loadedCount: number;
  fallbackCount: number;
  articleCount: number;
  failedSources: BeverageNewsFailedSource[];
};

export const BEVERAGE_NEWS_HEALTH_EVENT = "sipstudies:beverage-news-health-changed";
export const BEVERAGE_NEWS_HEALTH_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const BEVERAGE_NEWS_HEALTH_STORAGE_KEY = "sipstudies:beverage-news-health:v1";
const MAX_FAILED_SOURCES = 40;
const MAX_SOURCE_ID_LENGTH = 120;
const MAX_SOURCE_NAME_LENGTH = 180;

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function safeCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

function safeString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeHealth(value: unknown): BeverageNewsHealth | null {
  if (!isObject(value)) return null;
  if (
    value.status !== "healthy" &&
    value.status !== "degraded" &&
    value.status !== "cached" &&
    value.status !== "unavailable"
  ) {
    return null;
  }

  const checkedAt = safeString(value.checkedAt, 80);
  if (!checkedAt || !Number.isFinite(Date.parse(checkedAt))) return null;

  const failedSources = Array.isArray(value.failedSources)
    ? value.failedSources
        .map((candidate): BeverageNewsFailedSource | null => {
          if (!isObject(candidate)) return null;
          const sourceId = safeString(candidate.sourceId, MAX_SOURCE_ID_LENGTH);
          const sourceName = safeString(candidate.sourceName, MAX_SOURCE_NAME_LENGTH);
          return sourceId && sourceName ? { sourceId, sourceName } : null;
        })
        .filter((candidate): candidate is BeverageNewsFailedSource => candidate !== null)
        .filter(
          (candidate, index, candidates) =>
            candidates.findIndex((current) => current.sourceId === candidate.sourceId) === index
        )
        .slice(0, MAX_FAILED_SOURCES)
    : [];

  return {
    checkedAt: new Date(checkedAt).toISOString(),
    status: value.status,
    sourceCount: safeCount(value.sourceCount),
    loadedCount: safeCount(value.loadedCount),
    fallbackCount: safeCount(value.fallbackCount),
    articleCount: safeCount(value.articleCount),
    failedSources
  };
}

export function readBeverageNewsHealth(): BeverageNewsHealth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BEVERAGE_NEWS_HEALTH_STORAGE_KEY);
    return raw ? normalizeHealth(JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

export function isBeverageNewsHealthFresh(
  value: BeverageNewsHealth,
  now = Date.now()
): boolean {
  const checkedAt = Date.parse(value.checkedAt);
  return Number.isFinite(checkedAt) && now - checkedAt <= BEVERAGE_NEWS_HEALTH_MAX_AGE_MS;
}

export function writeBeverageNewsHealth(value: BeverageNewsHealth): void {
  if (typeof window === "undefined") return;
  const normalized = normalizeHealth(value);
  if (!normalized) return;

  try {
    window.localStorage.setItem(BEVERAGE_NEWS_HEALTH_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent(BEVERAGE_NEWS_HEALTH_EVENT, { detail: normalized }));
  } catch {
    // Health diagnostics must never prevent students from reading available articles.
  }
}

export function subscribeToBeverageNewsHealth(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;

  const onLocalChange = () => listener();
  const onStorage = (event: StorageEvent) => {
    if (event.key === BEVERAGE_NEWS_HEALTH_STORAGE_KEY) listener();
  };

  window.addEventListener(BEVERAGE_NEWS_HEALTH_EVENT, onLocalChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", onLocalChange);

  return () => {
    window.removeEventListener(BEVERAGE_NEWS_HEALTH_EVENT, onLocalChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", onLocalChange);
  };
}
