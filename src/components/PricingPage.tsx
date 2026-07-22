import { useState } from "react";
import {
  buildOnboardingRoute,
  getPlanById,
  onboardingPlans,
  readOnboardingIntent,
  type PlanId
} from "../lib/onboardingIntent";
import { CosmicSky } from "./CosmicSky";

type PricingPageProps = {
  onNavigate: (route: string) => void;
};

export function PricingPage({ onNavigate }: PricingPageProps) {
  const initialIntent = readOnboardingIntent("pro");
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(() => initialIntent.planId);
  const selectedPlan = getPlanById(selectedPlanId);
  const nextRoute = initialIntent.next;
  const sourceLabel = initialIntent.source.replace(/-/g, " ");
  const nextRouteLabel = nextRoute ? nextRoute.replace(/^app\//, "").replace(/-/g, " ") : "Launch Pad";
  const selectedAccessLabel = selectedPlanId === "starter" ? "Preview" : selectedPlanId === "founding" ? "Cohort + Included" : "Included";
  const selectedCheckoutPath = selectedPlanId === "starter" ? "Launch Pad preview" : selectedPlanId === "founding" ? "Cohort enrollment" : "Checkout console";
  const routeBuilderSteps = [
    { label: "Plan", value: selectedPlan.title, detail: selectedPlan.cadence },
    { label: "Source", value: sourceLabel, detail: "Entry context" },
    { label: "Destination", value: nextRouteLabel, detail: nextRoute ? "Route preserved" : "Default room" },
    { label: "Access", value: selectedAccessLabel, detail: selectedPlanId === "starter" ? "Paid rooms locked" : "Workspace unlock" },
    { label: "Path", value: selectedCheckoutPath, detail: selectedPlanId === "starter" ? "No payment" : "Account-first checkout" }
  ];

  const continueWithPlan = (planId: PlanId) => {
    const route =
      planId === "starter"
        ? buildOnboardingRoute("app/launch", { planId, source: "pricing", next: nextRoute })
        : buildOnboardingRoute("checkout", { planId, source: "pricing", next: nextRoute });
    onNavigate(route);
  };

  return (
    <section className="pricing-page">
      <header className="section-header pricing-hero">
        <CosmicSky className="pricing-sky" stars={20} meteors={5} />
        <p className="checkout-eyebrow">Plan Routing</p>
        <h1>Choose the access level for the room you meant to open.</h1>
        <p>Pricing keeps your selected plan, entry source, and next destination attached through checkout.</p>
        <div className="pricing-intent-ribbon" aria-label="Pricing intent context">
          <span>
            <strong>Selected path</strong>
            {selectedPlan.title}
          </span>
          <span>
            <strong>Entry source</strong>
            {sourceLabel}
          </span>
          <span>
            <strong>Return route</strong>
            {nextRouteLabel}
          </span>
        </div>
        <div className="pricing-route-builder" aria-label="Pricing route builder">
          <p className="pricing-route-builder-label">Route Builder</p>
          <div className="pricing-route-builder-track">
            {routeBuilderSteps.map((step, index) => (
              <section key={step.label} className={index === 0 ? "active" : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.label}</strong>
                <b>{step.value}</b>
                <small>{step.detail}</small>
              </section>
            ))}
          </div>
        </div>
      </header>

      <div className="pricing-grid">
        {onboardingPlans.map((plan) => (
          <article
            key={plan.id}
            className={`pricing-card ${selectedPlanId === plan.id ? "selected" : "unselected"}`}
          >
            <div className="pricing-card-top">
              <h3>{plan.title}</h3>
              <span>{plan.id === "starter" ? "Preview" : plan.id === "pro" ? "Included" : "Cohort"}</span>
            </div>
            <div className="access-state-row" aria-label={`${plan.title} access state`}>
              <span className={`access-state-chip ${plan.id === "starter" ? "access-state-preview" : "access-state-included"}`}>
                {plan.id === "starter" ? "Preview" : "Included"}
              </span>
              {plan.id === "starter" ? <span className="access-state-chip access-state-locked">Paid rooms locked</span> : null}
              {plan.id === "founding" ? <span className="access-state-chip access-state-current">Guided path</span> : null}
            </div>
            <p className="pricing-amount">
              {plan.price} <span>{plan.cadence}</span>
            </p>
            <p className="pricing-audience">{plan.audience}</p>
            <p className="pricing-billing-note">{plan.billingNote}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="pricing-card-actions">
              {selectedPlanId === plan.id ? (
                <span className="pricing-selected-indicator">Selected plan</span>
              ) : (
                <button
                  type="button"
                  className="btn btn-light pricing-select-button"
                  aria-pressed="false"
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  Select {plan.title}
                </button>
              )}
              <button
                type="button"
                className={plan.id === "starter" ? "btn btn-light" : "btn btn-primary"}
                onClick={() => continueWithPlan(plan.id)}
              >
                {plan.id === "starter" ? "Start Free" : `Continue with ${plan.title}`}
              </button>
            </div>
          </article>
        ))}
      </div>

      <article className="pricing-compare">
        <h3>Selected path: {selectedPlan.title}</h3>
        <p>
          Your selection will carry into account-first checkout so the enrollment request, analytics, and follow-up route stay aligned. Return route:{" "}
          <strong>{nextRouteLabel}</strong>.
        </p>
        <ul>
          <li>Private workspace routes become available after checkout</li>
          <li>Subscription entitlement is enforced from live billing status records</li>
          <li>Admin console includes subscription oversight and role controls</li>
        </ul>
      </article>

      <article className="pricing-support-bridge">
        <div>
          <p className="checkout-eyebrow">Need a manager path?</p>
          <h3>Support, team training, and credential prep now have public desks.</h3>
          <p>Use them for billing guidance, checkout recovery, weak-topic study help, credential path planning, or a Founding Cohort staff-training intake.</p>
        </div>
        <div className="pricing-support-actions">
          <button type="button" className="btn btn-light" onClick={() => onNavigate("study-paths")}>
            Credential Paths
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate("support")}>
            Support & Teams
          </button>
        </div>
      </article>
    </section>
  );
}
