import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { EmailOtpType, User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  googleEnabled: boolean;
  authSettingsLoaded: boolean;
  errorMessage: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapAuthError(message: string): string {
  if (message.includes("Unsupported provider") || message.includes("provider is not enabled")) {
    return "Google login is disabled in Supabase. Enable Google under Authentication > Providers, then retry.";
  }
  if (message.includes("redirect_uri_mismatch") || message.includes("redirect URI") || message.includes("redirect_uri")) {
    return "OAuth redirect URL not authorised. Add this site's URL to your Supabase project's Redirect URLs under Authentication → URL Configuration.";
  }
  return message;
}

function detectGoogleEnabled(settings: unknown): boolean | null {
  if (!settings || typeof settings !== "object") return null;
  const root = settings as Record<string, unknown>;
  const external = (root.external ?? root.providers) as Record<string, unknown> | undefined;
  if (!external || typeof external !== "object") return null;
  const google = external.google as unknown;
  if (typeof google === "boolean") return google;
  if (google && typeof google === "object") {
    const obj = google as Record<string, unknown>;
    if (typeof obj.enabled === "boolean") return obj.enabled;
    if (typeof obj.enable === "boolean") return obj.enable;
  }
  if (typeof external.googleEnabled === "boolean") return external.googleEnabled;
  if (typeof external.google_enabled === "boolean") return external.google_enabled;
  return null;
}

function parseHashParams(hash: string): URLSearchParams {
  const trimmed = hash.replace(/^#/, "");
  if (!trimmed) return new URLSearchParams();
  return new URLSearchParams(trimmed);
}

function getAuthRedirectUrl(): string {
  const configuredUrl = import.meta.env.VITE_APP_URL as string | undefined;
  if (configuredUrl) {
    try {
      const url = new URL(configuredUrl);
      return `${url.origin}${url.pathname.replace(/\/+$/, "") || "/"}`;
    } catch {
      // Fall back to the current host if the configured URL is malformed.
    }
  }

  return `${window.location.origin}${window.location.pathname.replace(/\/+$/, "") || "/"}`;
}

async function finalizeAuthFromUrl(): Promise<string | null> {
  if (!supabase || typeof window === "undefined") return null;

  const url = new URL(window.location.href);
  const query = url.searchParams;
  const hash = parseHashParams(window.location.hash);

  const code = query.get("code");
  const tokenHash = query.get("token_hash");
  const type = query.get("type");
  const accessToken = hash.get("access_token");
  const refreshToken = hash.get("refresh_token");
  const errorParam = hash.get("error") ?? query.get("error");
  const errorDescription = hash.get("error_description") ?? query.get("error_description");

  const hasOAuthParams = code || (tokenHash && type) || (accessToken && refreshToken) || errorParam || errorDescription;

  // No OAuth params in the URL — return immediately without touching the URL.
  // The old code used a try/finally that always ran replaceState, which fired a
  // hashchange on every page load and routed the app to #login unintentionally.
  if (!hasOAuthParams) return null;

  const cleanUrl = `${window.location.pathname}#login`;

  if (errorDescription) {
    window.history.replaceState({}, document.title, cleanUrl);
    return decodeURIComponent(errorDescription);
  }

  if (errorParam) {
    window.history.replaceState({}, document.title, cleanUrl);
    return decodeURIComponent(errorParam);
  }

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) return error.message;
    } else if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as EmailOtpType
      });
      if (error) return error.message;
    } else if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      if (error) return error.message;
    }
  } finally {
    window.history.replaceState({}, document.title, cleanUrl);
  }

  return null;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [authSettingsLoaded, setAuthSettingsLoaded] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    (async () => {
      const callbackError = await finalizeAuthFromUrl();
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (callbackError) {
        setErrorMessage(mapAuthError(callbackError));
      } else if (error) {
        setErrorMessage(mapAuthError(error.message));
      }

      setUser(data.session?.user ?? null);
      setLoading(false);
    })().catch((error: unknown) => {
      if (!mounted) return;
      setErrorMessage(error instanceof Error ? mapAuthError(error.message) : "Unable to initialize authentication");
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
    if (!supabaseUrl || !supabaseAnonKey) {
      setGoogleEnabled(false);
      setAuthSettingsLoaded(true);
      return;
    }

    let active = true;
    fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: {
        apikey: supabaseAnonKey
      }
    })
      .then(async (response) => {
        if (!active) return;
        if (!response.ok) {
          setGoogleEnabled(false);
          setAuthSettingsLoaded(true);
          return;
        }
        const payload = (await response.json()) as unknown;
        setGoogleEnabled(detectGoogleEnabled(payload) === true);
        setAuthSettingsLoaded(true);
      })
      .catch(() => {
        if (!active) return;
        setGoogleEnabled(false);
        setAuthSettingsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!supabase) {
      setErrorMessage("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthRedirectUrl()
      }
    });

    if (error) {
      setErrorMessage(mapAuthError(error.message));
      return;
    }

    setErrorMessage(null);
  };

  const signInWithMagicLink = async (email: string) => {
    if (!supabase) {
      setErrorMessage("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.");
      return;
    }

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setErrorMessage("Enter an email address first.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: getAuthRedirectUrl()
      }
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setErrorMessage(`Magic link sent to ${normalizedEmail}. Check your inbox.`);
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(null);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isConfigured: isSupabaseConfigured,
      googleEnabled,
      authSettingsLoaded,
      errorMessage,
      signInWithGoogle,
      signInWithMagicLink,
      signOut
    }),
    [authSettingsLoaded, errorMessage, googleEnabled, loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
