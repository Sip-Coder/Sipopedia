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
        <h1>Account access</h1>
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
              <button className="btn btn-primary" disabled={!isConfigured} onClick={() => setShowLoginOptions(true)}>
                {isConfigured ? "Log In" : "Log In Unavailable"}
              </button>
            ) : (
              <>
                <p className="hint">Select login type.</p>
                <button onClick={handleGoogleSignIn} className="btn btn-primary">
                  Log In with Google
                </button>
                {authSettingsLoaded && !googleEnabled ? (
                  <p className="hint">Google login is temporarily unavailable. Please try again later.</p>
                ) : null}
              </>
            )}
            {!isConfigured ? <p className="hint" role="status">Account access is temporarily unavailable. Please try again later.</p> : null}
          </div>
        )}
      </div>
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
    </section>
  );
}
