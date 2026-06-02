import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "../lib/analytics";
import { useAuth } from "../context/AuthContext";
import { createCheckoutSession } from "../lib/checkoutSession";
import { createCloudSupportRequest, isSupportRequestRateLimitError, saveLocalSupportRequest } from "../lib/supportRequests";
import {
  buildOnboardingRoute,
  getPlanById,
  onboardingPlans,
  readOnboardingIntent,
  type PlanId
} from "../lib/onboardingIntent";
import { CosmicSky } from "./CosmicSky";

type CheckoutPageProps = {
  onNavigate: (route: string) => void;
};

const checkoutSteps = [
  { label: "Plan", detail: "Confirm fit" },
  { label: "Account", detail: "Attach access" },
  { label: "Payment", detail: "Checkout or assisted" },
  { label: "Launch", detail: "Enter workspace" }
];

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { user, isConfigured: isAuthConfigured } = useAuth();
  const initialIntent = useMemo(() => readOnboardingIntent("pro"), []);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(() =>
    initialIntent.planId === "starter" ? "pro" : initialIntent.planId
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailManuallyChanged, setEmailManuallyChanged] = useState(false);
  const [goal, setGoal] = useState("");
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "creating" | "failed">("idle");
  const [assistedNotice, setAssistedNotice] = useState("");
  const [assistedSaving, setAssistedSaving] = useState(false);
  const [assistedWebsite, setAssistedWebsite] = useState("");
  const selectedPlan = getPlanById(selectedPlanId);
  const source = initialIntent.source;
  const nextRoute = initialIntent.next;
  const nextRouteLabel = nextRoute ? nextRoute.replace(/^app\//, "").replace(/-/g, " ") : "Launch Pad";
  const checkoutReturnRoute = buildOnboardingRoute("checkout", { planId: selectedPlanId, source: "account-return", next: nextRoute });
  const loginBeforeCheckoutRoute = buildOnboardingRoute("login", { source: "checkout-account", next: checkoutReturnRoute });
  const activeCheckoutStep = user ? 2 : 1;
  const isEmailValid = !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isAssistedReady = Boolean(name.trim() && goal.trim() && email.trim() && isEmailValid);
  const assistedStatus = assistedNotice || (isAssistedReady
    ? "Ready to submit the enrollment request."
    : "Add your name, valid email, and learning goal to submit the enrollment request.");

  useEffect(() => {
    if (!user?.email || emailManuallyChanged) return;
    setEmail(user.email);
  }, [emailManuallyChanged, user?.email]);

  const handleAssistedEnrollment = async () => {
    if (assistedWebsite.trim()) {
      setAssistedNotice("Enrollment request validation failed.");
      return;
    }
    if (!isAssistedReady) {
      setAssistedNotice("Add your name, valid email, and learning goal first.");
      trackEvent("checkout_assisted_blocked", { plan: selectedPlanId, source, reason: "missing_required_fields" });
      return;
    }

    const draft = {
      laneId: "enrollment" as const,
      contactName: name.trim(),
      contactEmail: email.trim(),
      teamName: "",
      teamSize: null,
      planInterest: selectedPlan.title,
      urgency: selectedPlanId === "founding" ? "soon" as const : "normal" as const,
      subject: `Assisted enrollment request: ${selectedPlan.title}`,
      message: `Plan: ${selectedPlan.title} (${selectedPlanId})\nSource: ${source}\nNext route: ${nextRoute ?? "app/launch"}\nGoal: ${goal.trim()}`,
      sourceRoute: typeof window === "undefined" ? "checkout" : window.location.hash || "checkout"
    };

    setAssistedSaving(true);
    setAssistedNotice("Saving enrollment request...");
    try {
      const record = isAuthConfigured
        ? await createCloudSupportRequest(draft, user?.id ?? null)
        : saveLocalSupportRequest(draft);
      setAssistedNotice(
        isAuthConfigured
          ? `Enrollment request ${record.id.slice(0, 8)} saved.`
          : `Enrollment request ${record.id.slice(0, 8)} saved locally.`
      );
      trackEvent("checkout_start", { channel: isAuthConfigured ? "support_request" : "local_support_request", plan: selectedPlanId, source });
    } catch (error: unknown) {
      if (isSupportRequestRateLimitError(error)) {
        setAssistedNotice(error instanceof Error ? error.message : "Too many enrollment requests. Try again later.");
        return;
      }
      const record = saveLocalSupportRequest(draft, `Cloud save failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      setAssistedNotice(`Cloud save failed, so request ${record.id.slice(0, 8)} is saved locally.`);
      trackEvent("checkout_fallback_to_assisted", { reason: "support_request_failed", plan: selectedPlanId, source });
    } finally {
      setAssistedSaving(false);
    }
  };

  const handleDirectCheckout = async () => {
    if (!user) {
      trackEvent("checkout_login_required", { plan: selectedPlanId, source });
      onNavigate(loginBeforeCheckoutRoute);
      return;
    }

    if (selectedPlanId === "starter") {
      setCheckoutNotice("Starter does not require checkout. Use the Launch Pad preview or choose a paid plan.");
      return;
    }

    setCheckoutStatus("creating");
    setCheckoutNotice("Creating secure checkout for the signed-in account...");
    trackEvent("checkout_session_create_start", { plan: selectedPlanId, source });
    try {
      const session = await createCheckoutSession({ planId: selectedPlanId, source, next: nextRoute });
      trackEvent("checkout_start", { channel: "stripe_checkout_session", plan: selectedPlanId, source, sessionId: session.sessionId });
      window.location.assign(session.checkoutUrl);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Could not start checkout. Assisted Enrollment is available.";
      setCheckoutStatus("failed");
      setCheckoutNotice(message);
      trackEvent("checkout_fallback_to_assisted", { reason: "session_create_failed", plan: selectedPlanId, source });
      document.getElementById("assisted-enrollment-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="checkout-page">
      <header className="section-header checkout-hero">
        <CosmicSky className="checkout-sky" stars={16} meteors={4} />
        <p className="checkout-eyebrow">Enrollment Console</p>
        <h2>Start with the right plan and land in the right room.</h2>
        <p>Confirm your plan, choose checkout or assisted enrollment, and keep your next step attached.</p>
        <div className="checkout-intent-ribbon" aria-label="Enrollment intent">
          <span>
            <strong>Plan</strong>
            {selectedPlan.title}
          </span>
          <span>
            <strong>Source</strong>
            {source}
          </span>
          <span>
            <strong>Next</strong>
            {nextRouteLabel}
          </span>
        </div>
      </header>

      <ol className="checkout-stage-list" aria-label="Enrollment steps">
        {checkoutSteps.map((step, index) => (
          <li
            key={step.label}
            className={index === activeCheckoutStep ? "active" : index < activeCheckoutStep ? "complete" : ""}
            aria-current={index === activeCheckoutStep ? "step" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
            <small>{index < activeCheckoutStep ? `${step.detail} - Complete` : index === activeCheckoutStep ? `${step.detail} - Current` : step.detail}</small>
          </li>
        ))}
      </ol>

      <div className="checkout-layout">
        <article className="checkout-card checkout-intent-card">
          <p className="checkout-eyebrow">Selected plan</p>
          <h3>{selectedPlan.title}</h3>
          <p className="pricing-amount">
            {selectedPlan.price} <span>{selectedPlan.cadence}</span>
          </p>
          <p>{selectedPlan.audience}</p>
          <p className="checkout-billing-note">{selectedPlan.billingNote}</p>
          <ul className="checkout-plan-features">
            {selectedPlan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="checkout-plan-switcher" aria-label="Choose enrollment plan">
            {onboardingPlans
              .filter((plan) => plan.id !== "starter")
              .map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  className={selectedPlanId === plan.id ? "active" : ""}
                  aria-pressed={selectedPlanId === plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  {plan.title}
                </button>
              ))}
          </div>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => onNavigate(buildOnboardingRoute("pricing", { planId: selectedPlanId, source: "checkout-review", next: nextRoute }))}
          >
            Compare Plan Details
          </button>
        </article>

        <article className="checkout-card checkout-account-card">
          <p className="checkout-eyebrow">Account step</p>
          <h3>{user ? "Account attached." : "Attach Account Before Payment."}</h3>
          <p>
            {user
              ? "You are signed in before payment. Secure checkout will be created for this account and return to the saved destination."
              : "Create or log into the account that should receive paid access before payment."}
          </p>
          <div className="access-state-row" aria-label="Checkout account state">
            <span className={`access-state-chip ${user ? "access-state-included" : "access-state-locked"}`}>
              {user ? "Signed in" : "Login required"}
            </span>
            <span className="access-state-chip access-state-current">Route saved</span>
          </div>
          {user ? (
            <p className="hint">Using account: {user.email ?? "signed-in learner"}</p>
          ) : (
            <button type="button" className="btn btn-light" onClick={() => onNavigate(loginBeforeCheckoutRoute)}>
              Log In to Continue
            </button>
          )}
        </article>

        <article className="checkout-card checkout-card-accent">
          <p className="checkout-eyebrow">Fast path</p>
          <h3>Secure Checkout Session</h3>
          <p>When your account is attached, Sip Studies creates a server-side Stripe Checkout Session for the selected plan.</p>
          {!user ? (
            <>
              <p className="checkout-direct-status" role="status">Complete the Account step above before opening secure checkout.</p>
              <button type="button" className="btn btn-light" onClick={() => onNavigate(loginBeforeCheckoutRoute)}>
                Log In to Continue
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleDirectCheckout} disabled={checkoutStatus === "creating"}>
              {checkoutStatus === "creating" ? "Creating Secure Checkout..." : `Open ${selectedPlan.title} Checkout`}
            </button>
          )}
          {checkoutNotice ? <p className="checkout-direct-status" role="status" aria-live="polite">{checkoutNotice}</p> : null}
          {checkoutStatus === "failed" ? <p className="hint">Use Assisted Enrollment below if checkout cannot start automatically.</p> : null}
          <p className="checkout-disclosure">
            {selectedPlan.billingNote} Taxes, fees, and final payment terms are shown by Stripe before payment.
          </p>
          <div className="checkout-route-chip">
            <span>After enrollment</span>
            <strong>{nextRouteLabel}</strong>
          </div>
        </article>

        <article className="checkout-card" id="assisted-enrollment-card">
          <div className="checkout-assist-head">
            <div>
              <p className="checkout-eyebrow">Concierge path</p>
              <h3>Assisted Enrollment</h3>
            </div>
            <span>{selectedPlan.title}</span>
          </div>
          <p>Share your goal and we will place you in the selected plan with the right onboarding path.</p>
          <p className="checkout-disclosure">
            Use the same email as the account that should receive paid access. Signed-in users are prefilled when an account email is available.
          </p>
          {checkoutNotice ? <p className="checkout-direct-status" role="status">{checkoutNotice}</p> : null}
          <label className="checkout-field">
            <span>Full name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name" required />
            <small>Used only for the enrollment handoff.</small>
          </label>
          <label className="checkout-field">
            <span>Email</span>
            <input
              value={email}
              onChange={(event) => {
                setEmailManuallyChanged(true);
                setEmail(event.target.value);
              }}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              aria-invalid={!isEmailValid}
              required
            />
            <small>{isEmailValid ? "Response window: 1 business day." : "Enter a valid email address."}</small>
          </label>
          <label className="checkout-field">
            <span>Learning goal</span>
            <textarea value={goal} onChange={(event) => setGoal(event.target.value)} rows={4} placeholder="What outcome do you need in 30 days?" required />
            <small>We use this to route you into the right onboarding path.</small>
          </label>
          <label className="checkout-field checkout-honeypot" aria-hidden="true">
            <span>Website</span>
            <input value={assistedWebsite} onChange={(event) => setAssistedWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
          <p className={`checkout-assist-status ${isAssistedReady ? "ready" : "pending"}`} aria-live="polite">{assistedStatus}</p>
          <button
            type="button"
            className={`btn btn-light checkout-assist-submit ${isAssistedReady ? "" : "disabled"}`}
            disabled={!isAssistedReady || assistedSaving}
            onClick={handleAssistedEnrollment}
          >
            {assistedSaving ? "Saving Request" : `Submit ${selectedPlan.title} Request`}
          </button>
        </article>

        <article className="checkout-card checkout-mini-proof">
          <p className="checkout-eyebrow">Why this matters</p>
          <h3>No dead-end enrollment.</h3>
          <p>
            Sip Studies keeps the chosen plan, original CTA, and intended destination together so novice users do not lose context and returning
            users can resume the room they tried to enter.
          </p>
        </article>
      </div>

      <div className="checkout-links">
        <button className="btn btn-light" onClick={() => onNavigate(buildOnboardingRoute("pricing", { planId: selectedPlanId, source: "checkout-back", next: nextRoute }))}>
          Back to Pricing
        </button>
        <button className="btn btn-light" onClick={() => onNavigate("terms")}>
          Terms
        </button>
        <button className="btn btn-light" onClick={() => onNavigate("privacy")}>
          Privacy
        </button>
        <button className="btn btn-light" onClick={() => onNavigate("refund")}>
          Refund Policy
        </button>
      </div>
    </section>
  );
}
