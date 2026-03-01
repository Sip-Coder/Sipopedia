import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  errorMessage: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapAuthError(message: string): string {
  if (message.includes("Unsupported provider") || message.includes("provider is not enabled")) {
    return "Google login is disabled in Supabase. Enable Google under Authentication > Providers, then retry.";
  }

  return message;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          setErrorMessage(error.message);
        }
        if (mounted) {
          setUser(data.session?.user ?? null);
          setLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (mounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to get session");
          setLoading(false);
        }
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

  const signInWithGoogle = async () => {
    if (!supabase) {
      setErrorMessage("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        skipBrowserRedirect: true
      }
    });

    if (error) {
      setErrorMessage(mapAuthError(error.message));
      return;
    }

    if (!data?.url) {
      setErrorMessage("Google login URL was not returned by Supabase.");
      return;
    }

    setErrorMessage(null);

    try {
      window.location.assign(data.url);
    } catch {
      setErrorMessage("Could not open Google login URL.");
      return;
    }
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
      errorMessage,
      signInWithGoogle,
      signOut
    }),
    [errorMessage, loading, user]
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
