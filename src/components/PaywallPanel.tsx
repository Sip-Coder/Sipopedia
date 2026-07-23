import { AuthPanel } from "./AuthPanel";
import { useAccess } from "../context/AccessContext";
import { buildOnboardingRoute } from "../lib/onboardingIntent";
import { WORKSPACE_NAV_ITEMS, buildWorkspaceLanePreviews, workspaceLabelForRoute } from "../lib/workspaceNavigation";
import { configForRoute, type PageStatusMap } from "../lib/siteMap";

type PaywallPanelProps = {
  onNavigate: (route: string) => void;
  postLoginRoute?: string;
  pageStatuses: PageStatusMap;
  isAdmin?: boolean;
};

export function PaywallPanel({ onNavigate, postLoginRoute, pageStatuses }: PaywallPanelProps) {
  const { tier, errorMessage, subscription, profile } = useAccess();
  const publishedWorkspaceItems = WORKSPACE_NAV_ITEMS.filter((item) => {
    const config = configForRoute(item.route, pageStatuses);
    return config.status === "public" && config.room !== "Boss";
  });
  const paywallLanePreview = buildWorkspaceLanePreviews(publishedWorkspaceItems);
  const isSignedIn = Boolean(profile);
  const nextRoute = postLoginRoute ?? "app/launch";
  const pricingRoute = buildOnboardingRoute("pricing", { planId: "pro", source: "paywall", next: nextRoute });
  const checkoutRoute = buildOnboardingRoute("checkout", { planId: "pro", source: "paywall", next: nextRoute });
  const nextRouteLabel = workspaceLabelForRoute(nextRoute) ?? nextRoute.replace(/^app\//, "").replace(/-/g, " ");
  const localPreviewAvailable =
    typeof window !== "undefined" && ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

  const enableLocalPreview = () => {
    if (!localPreviewAvailable) return;
    window.localStorage.setItem("sipstudies:local-preview-access", "1");
    window.dispatchEvent(new Event("sipstudies:local-preview-access-changed"));
  };

  return (
    <section className="paywall-panel">
      <header className="section-header paywall-hero">
        <p className="checkout-eyebrow">Access Checkpoint</p>
        <h2>This room is locked, but your route is saved.</h2>
        <p>Upgrade or log in to unlock the Learn, Taste, and Connect modules connected to this destination.</p>
        <div className="paywall-route-chip" aria-label="Blocked route intent">
          <span>Trying to open</span>
          <strong>{nextRouteLabel}</strong>
          <em>Locked route saved</em>
        </div>
      </header>

      <div className="paywall-grid">
        <article className="paywall-card paywall-status-card">
          <p className="checkout-eyebrow">Current access</p>
          <h3>{tier.toUpperCase()}</h3>
          <div className="access-state-row" aria-label="Access state">
            <span className="access-state-chip access-state-current">Current</span>
            <span className="access-state-chip access-state-preview">{isSignedIn ? "Included" : "Preview"}</span>
            <span className="access-state-chip access-state-locked">Locked room</span>
          </div>
          <p className="paywall-tier">{isSignedIn ? "Launch Pad access" : "Public preview"}</p>
          <p>
            {isSignedIn
              ? "Your account can use the Launch Pad while you upgrade. Paid checkout starts from this same account."
              : "Public visitors can preview the workspace before enrolling. Log in first, then pay, so access attaches correctly."}
          </p>
          {subscription ? (
            <p className="hint">
              Subscription status: <strong>{subscription.status}</strong> ({subscription.planCode})
            </p>
          ) : null}
          <div className="paywall-actions">
            {localPreviewAvailable ? (
              <button className="btn btn-light" type="button" onClick={enableLocalPreview}>
                Enable Local Review
              </button>
            ) : null}
            {isSignedIn ? (
              <button className="btn btn-light" onClick={() => onNavigate("app/launch")}>
                Open Launch Pad
              </button>
            ) : null}
            <button className="btn btn-primary" onClick={() => onNavigate(pricingRoute)}>
              Compare Plans
            </button>
            <button className="btn btn-light" onClick={() => onNavigate(checkoutRoute)}>
              Start Enrollment
            </button>
          </div>
          {errorMessage ? <p className="error">{errorMessage}</p> : null}
        </article>

        <article className="paywall-card paywall-unlock-card">
          <p className="checkout-eyebrow">What unlocks</p>
          <h3>Workspace lanes</h3>
          <div className="paywall-lane-list">
            {paywallLanePreview.map((lane) => (
              <section key={lane.label}>
                <span>{lane.modules}</span>
                <strong>{lane.label}</strong>
                <p>{lane.detail}</p>
              </section>
            ))}
          </div>
        </article>

        <article className="paywall-card paywall-auth-card">
          <AuthPanel postLoginRoute={postLoginRoute} />
        </article>

        <article className="paywall-card paywall-preview-card">
          <p className="checkout-eyebrow">No lost path</p>
          <h3>Enrollment resumes here.</h3>
          <p>
            Compare Plans and Start Enrollment both carry <strong>{nextRouteLabel}</strong> as the next route, so the user can return to the room
            that triggered this checkpoint. Checkout creates a secure session only after the learner is signed in.
          </p>
        </article>
      </div>
    </section>
  );
}
