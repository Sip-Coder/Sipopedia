const AUTH_CALLBACK_STORAGE_KEY = "sip-studies:auth-callback-url:v1";
const AUTH_POST_LOGIN_ROUTE_KEY = "sip-studies:auth-post-login-route:v1";

const AUTH_CALLBACK_KEYS = new Set([
  "access_token",
  "code",
  "error",
  "error_description",
  "expires_at",
  "expires_in",
  "provider_token",
  "refresh_token",
  "sb",
  "token_hash",
  "token_type",
  "type"
]);
const SAFE_AUTH_ROUTE_RE = /^(?:app\/[a-z0-9-]+(?:\/[a-z0-9-]+)*|home|pricing|checkout|powerful-point|login|logout|account(?:\/avatar)?|terms|privacy|refund|success|cancel|admin(?:\/terminology)?|starter)$/i;
const DEFAULT_AUTH_POST_LOGIN_ROUTE = "app/launch";
const SAFE_AUTH_PLAN_RE = /^(?:starter|pro|founding)$/i;
const SAFE_AUTH_SOURCE_RE = /^[a-z0-9][a-z0-9:_-]{0,64}$/i;

type StoredAuthCallback = {
  search: string;
  hash: string;
};

function sanitizeAuthRoutePart(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const cleaned = value.replace(/^#+/, "").split("?")[0].trim();

  if (!cleaned) {
    return null;
  }

  return SAFE_AUTH_ROUTE_RE.test(cleaned) ? cleaned : null;
}

function sanitizeAuthPostLoginRoute(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  let cleaned: string;
  try {
    cleaned = decodeURIComponent(value);
  } catch {
    return null;
  }

  cleaned = cleaned.replace(/^#+/, "").trim();

  const queryIndex = cleaned.indexOf("?");
  const route = sanitizeAuthRoutePart(queryIndex >= 0 ? cleaned.slice(0, queryIndex) : cleaned);
  if (!route) return null;

  if (queryIndex < 0) return route;

  const query = new URLSearchParams(cleaned.slice(queryIndex + 1));
  const safeQuery = new URLSearchParams();
  const plan = query.get("plan");
  const source = query.get("source");
  const next = sanitizeAuthRoutePart(query.get("next"));

  if (plan && SAFE_AUTH_PLAN_RE.test(plan)) safeQuery.set("plan", plan.toLowerCase());
  if (source && SAFE_AUTH_SOURCE_RE.test(source)) safeQuery.set("source", source);
  if (next) safeQuery.set("next", next);

  const queryString = safeQuery.toString();
  return queryString ? `${route}?${queryString}` : route;
}

export function getDefaultAuthPostLoginRoute(): string {
  return DEFAULT_AUTH_POST_LOGIN_ROUTE;
}

export function consumeAuthPostLoginRoute(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.sessionStorage.getItem(AUTH_POST_LOGIN_ROUTE_KEY);
    if (!stored) return null;
    const normalized = sanitizeAuthPostLoginRoute(stored);
    window.sessionStorage.removeItem(AUTH_POST_LOGIN_ROUTE_KEY);
    return normalized;
  } catch {
    return null;
  }
}

export function rememberAuthPostLoginRoute(route: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const normalized = sanitizeAuthPostLoginRoute(route);
  if (!normalized) return;

  try {
    window.sessionStorage.setItem(AUTH_POST_LOGIN_ROUTE_KEY, normalized);
  } catch {
    // Ignore storage issues on privacy/restricted browsers.
  }
}

export function resolveAuthPostLoginRoute(
  preferredRoute: string | null | undefined,
  fallbackRoute: string = DEFAULT_AUTH_POST_LOGIN_ROUTE
): string {
  return (
    sanitizeAuthPostLoginRoute(preferredRoute)
    || sanitizeAuthPostLoginRoute(fallbackRoute)
    || DEFAULT_AUTH_POST_LOGIN_ROUTE
  );
}

function parseHashParams(hash: string): URLSearchParams {
  const trimmed = hash.replace(/^#/, "");
  return new URLSearchParams(trimmed);
}

function hasAuthCallbackParams(search: string, hash: string): boolean {
  const query = new URLSearchParams(search);
  const hashParams = parseHashParams(hash);

  for (const key of AUTH_CALLBACK_KEYS) {
    if (query.has(key) || hashParams.has(key)) {
      return true;
    }
  }

  return false;
}

function cleanAuthCallbackUrl(pathname: string): string {
  return `${pathname.replace(/\/+$/, "") || "/"}#login`;
}

function mergeParams(target: URLSearchParams, source: URLSearchParams) {
  source.forEach((value, key) => {
    if (!target.has(key)) {
      target.set(key, value);
    }
  });
}

export function captureAndScrubAuthCallbackFromUrl(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  if (!hasAuthCallbackParams(url.search, url.hash)) return;

  try {
    window.sessionStorage.setItem(
      AUTH_CALLBACK_STORAGE_KEY,
      JSON.stringify({
        search: url.search,
        hash: url.hash
      } satisfies StoredAuthCallback)
    );
  } catch {
    // URL cleanup is still more important than preserving callback state.
  }

  window.history.replaceState({}, document.title, cleanAuthCallbackUrl(url.pathname));
}

export function consumeAuthCallbackParams(): URLSearchParams {
  const params = new URLSearchParams();

  if (typeof window === "undefined") {
    return params;
  }

  try {
    const stored = window.sessionStorage.getItem(AUTH_CALLBACK_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<StoredAuthCallback>;
      mergeParams(params, new URLSearchParams(parsed.search ?? ""));
      mergeParams(params, parseHashParams(parsed.hash ?? ""));
      window.sessionStorage.removeItem(AUTH_CALLBACK_STORAGE_KEY);
    }
  } catch {
    try {
      window.sessionStorage.removeItem(AUTH_CALLBACK_STORAGE_KEY);
    } catch {
      // Ignore storage cleanup failures.
    }
  }

  const url = new URL(window.location.href);
  mergeParams(params, url.searchParams);
  mergeParams(params, parseHashParams(url.hash));

  return params;
}

export function cleanAuthCallbackUrlFromCurrentPath(): string {
  if (typeof window === "undefined") return "/#login";
  return cleanAuthCallbackUrl(window.location.pathname);
}
