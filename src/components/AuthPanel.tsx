import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  consumeAuthPostLoginRoute,
  getDefaultAuthPostLoginRoute,
  rememberAuthPostLoginRoute,
  resolveAuthPostLoginRoute
} from "../lib/authCallback";

type AuthPanelProps = {
  postLoginRoute?: string;
};

export function AuthPanel({ postLoginRoute }: AuthPanelProps) {
  const { user, loading, isConfigured, googleEnabled, authSettingsLoaded, errorMessage, signInWithGoogle, signOut } =
    useAuth();
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const loginQueryRoute =
    typeof window === "undefined"
      ? null
      : (() => {
          const hash = window.location.hash.replace(/^#/, "");
          const queryString = hash.includes("?") ? hash.split("?")[1] : "";
          return queryString ? new URLSearchParams(queryString).get("next") : null;
        })();

  useEffect(() => {
    if (!user) return;
    const nextRoute = resolveAuthPostLoginRoute(
      postLoginRoute ?? loginQueryRoute ?? consumeAuthPostLoginRoute(),
      postLoginRoute ?? getDefaultAuthPostLoginRoute()
    );
    window.location.hash = nextRoute;
  }, [user]);

  const handleGoogleSignIn = () => {
    rememberAuthPostLoginRoute(
      resolveAuthPostLoginRoute(postLoginRoute ?? loginQueryRoute, getDefaultAuthPostLoginRoute())
    );
    void signInWithGoogle();
  };

  return (
    <section className="auth-panel">
      <div>
        <h2>Account access</h2>
        <p>Sign in to activate your workspace and track your learning profile across modules.</p>
      </div>
      <div className="auth-actions">
        {loading ? (
          <p>Checking session...</p>
        ) : user ? (
          <>
            <p>Logged in as {user.email ?? "your account"}.</p>
            <button onClick={signOut} className="btn btn-light">
              Log Out
            </button>
          </>
        ) : (
          <div className="auth-login-flow">
            {!showLoginOptions ? (
              <button className="btn btn-primary" onClick={() => setShowLoginOptions(true)}>
                Log In
              </button>
            ) : (
              <>
                <p className="hint">Select login type.</p>
                <button onClick={handleGoogleSignIn} className="btn btn-primary">
                  Log In with Google
                </button>
                {authSettingsLoaded && !googleEnabled ? (
                  <p className="hint">Google OAuth did not advertise as enabled from Supabase settings. Additional login types can be added after provider setup is reviewed.</p>
                ) : null}
              </>
            )}
            {!isConfigured ? <p className="hint">Set Supabase env vars to enable login.</p> : null}
          </div>
        )}
      </div>
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
    </section>
  );
}
