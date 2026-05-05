const AUTH_CALLBACK_STORAGE_KEY = "sip-studies:auth-callback-url:v1";

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

type StoredAuthCallback = {
  search: string;
  hash: string;
};

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
