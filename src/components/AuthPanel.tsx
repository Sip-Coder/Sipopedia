import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export function AuthPanel() {
  const { user, loading, isConfigured, googleEnabled, authSettingsLoaded, errorMessage, signInWithGoogle, signOut } =
    useAuth();
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  useEffect(() => {
    if (!user) return;
    window.location.hash = "app/launch";
  }, [user]);

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
              Sign out
            </button>
          </>
        ) : (
          <div className="auth-login-flow">
            {!showLoginOptions ? (
              <button className="btn btn-primary" onClick={() => setShowLoginOptions(true)}>
                Click to Login
              </button>
            ) : (
              <>
                <p className="hint">Select login type.</p>
                <button onClick={() => void signInWithGoogle()} className="btn btn-primary">
                  Login with Google
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
