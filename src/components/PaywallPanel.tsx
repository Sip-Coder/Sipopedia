import { AuthPanel } from "./AuthPanel";
import { useAccess } from "../context/AccessContext";

type PaywallPanelProps = {
  onNavigate: (route: string) => void;
};

export function PaywallPanel({ onNavigate }: PaywallPanelProps) {
  const { tier, errorMessage, subscription, profile } = useAccess();
  const isSignedIn = Boolean(profile);
  return (
    <section className="paywall-panel">
      <header className="section-header">
        <h2>Pro Workspace + Founding Cohort Locked</h2>
        <p>Upgrade to unlock Sip Studios, Ai RnD, Somm Support, and all pro learning modules.</p>
      </header>

      <div className="paywall-grid">
        <article className="paywall-card">
          <h3>Current tier</h3>
          <p className="paywall-tier">{tier.toUpperCase()}</p>
          <p>Starter accounts can access the Starter page only. Pro and Founding Cohort modules require upgrade access.</p>
          {subscription ? (
            <p className="hint">
              Subscription status: <strong>{subscription.status}</strong> ({subscription.planCode})
            </p>
          ) : null}
          <div className="paywall-actions">
            {isSignedIn ? (
              <button className="btn btn-light" onClick={() => onNavigate("app/launch")}>
                Open Starter Page
              </button>
            ) : null}
            <button className="btn btn-primary" onClick={() => onNavigate("pricing")}>
              Compare Plans
            </button>
            <button className="btn btn-light" onClick={() => onNavigate("checkout")}>
              Start Enrollment
            </button>
          </div>
          {errorMessage ? <p className="error">{errorMessage}</p> : null}
        </article>

        <article className="paywall-card">
          <AuthPanel />
        </article>
      </div>
    </section>
  );
}
