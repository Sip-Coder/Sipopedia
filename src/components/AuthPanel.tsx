import { useAuth } from "../context/AuthContext";

export function AuthPanel() {
  const { user, loading, isConfigured, errorMessage, signInWithGoogle, signOut } = useAuth();

  return (
    <section className="auth-panel">
      <div>
        <h2>Account access</h2>
        <p>Everything in Starter tier is open today. Login is ready for profile sync and progress tracking.</p>
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
          <>
            <button onClick={signInWithGoogle} className="btn btn-primary">
              Continue with Google
            </button>
            {!isConfigured ? (
              <p className="hint">Set Supabase env vars to enable login.</p>
            ) : null}
          </>
        )}
      </div>
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
    </section>
  );
}

