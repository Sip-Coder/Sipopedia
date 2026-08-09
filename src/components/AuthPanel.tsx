import { type FormEvent, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  consumeAuthPostLoginRoute,
  getDefaultAuthPostLoginRoute,
  rememberAuthPostLoginRoute,
  resolveAuthPostLoginRoute
} from "../lib/authCallback";
import { formatOnboardingRouteLabel } from "../lib/onboardingIntent";

type AuthPanelProps = {
  postLoginRoute?: string;
};

export function AuthPanel({ postLoginRoute }: AuthPanelProps) {
  const { user, loading, isConfigured, googleEnabled, authSettingsLoaded, errorMessage, signInWithGoogle, signInWithMagicLink, signOut } =
    useAuth();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const googleUnavailable = authSettingsLoaded && !googleEnabled;

  const loginQueryRoute =
    typeof window === "undefined"
      ? null
      : (() => {
          const hash = window.location.hash.replace(/^#/, "");
          const queryString = hash.includes("?") ? hash.split("?")[1] : "";
          return queryString ? new URLSearchParams(queryString).get("next") : null;
        })();
  const continuationRoute = resolveAuthPostLoginRoute(
    postLoginRoute ?? loginQueryRoute,
    postLoginRoute ?? getDefaultAuthPostLoginRoute()
  );
  const continuationRouteParams = continuationRoute.includes("?")
    ? new URLSearchParams(continuationRoute.slice(continuationRoute.indexOf("?") + 1))
    : new URLSearchParams();
  const continuationRoomLabel = formatOnboardingRouteLabel(continuationRouteParams.get("next") ?? continuationRoute);
  const continuationStepLabel = formatOnboardingRouteLabel(continuationRoute);

  useEffect(() => {
    if (!user) return;
    const nextRoute = resolveAuthPostLoginRoute(
      postLoginRoute ?? loginQueryRoute ?? consumeAuthPostLoginRoute(),
      postLoginRoute ?? getDefaultAuthPostLoginRoute()
    );
    window.location.hash = nextRoute;
  }, [user]);

  const handleGoogleSignIn = () => {
    if (googleUnavailable) return;

    rememberAuthPostLoginRoute(
      resolveAuthPostLoginRoute(postLoginRoute ?? loginQueryRoute, getDefaultAuthPostLoginRoute())
    );
    void signInWithGoogle();
  };

  const handleMagicLinkSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || emailSending) return;

    const nextRoute = resolveAuthPostLoginRoute(postLoginRoute ?? loginQueryRoute, getDefaultAuthPostLoginRoute());
    rememberAuthPostLoginRoute(nextRoute);
    setEmailSending(true);
    try {
      await signInWithMagicLink(email, nextRoute);
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <section className="auth-panel">
      <div>
        <h1>Account access</h1>
        <p>Sign in to activate your workspace and track your learning profile across modules.</p>
        {!user ? (
          <div className="auth-continuation-ribbon" aria-label="Saved login destination">
            <span>
              <strong>After login</strong>
              {continuationStepLabel}
            </span>
            <span>
              <strong>Saved room</strong>
              {continuationRoomLabel}
            </span>
          </div>
        ) : null}
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
                <button onClick={handleGoogleSignIn} className="btn btn-primary" disabled={!isConfigured || googleUnavailable}>
                  {googleUnavailable ? "Google Login Unavailable" : "Log In with Google"}
                </button>
                {googleUnavailable ? (
                  <p className="hint" role="status">
                    Google login is temporarily unavailable. Use the email magic link below to keep your saved room attached.
                  </p>
                ) : null}
                <form className="auth-magic-link-form" onSubmit={handleMagicLinkSignIn}>
                  <label>
                    <span>Email magic link</span>
                    <span className="hint">Email magic link keeps the saved checkout room attached.</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      disabled={!isConfigured || emailSending}
                    />
                  </label>
                  <button className="btn btn-light" type="submit" disabled={!isConfigured || !email.trim() || emailSending}>
                    {emailSending ? "Sending Link" : "Send Magic Link"}
                  </button>
                </form>
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
