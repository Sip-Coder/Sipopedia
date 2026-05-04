import { useState } from "react";
import { CosmicSky } from "./CosmicSky";

type PricingPageProps = {
  onNavigate: (route: string) => void;
};

const plans = [
  {
    id: "starter",
    title: "Starter",
    price: "$0",
    cadence: "forever",
    audience: "Evaluate the product",
    features: ["Marketing preview", "Account creation", "Upgrade path to Pro"]
  },
  {
    id: "pro",
    title: "Pro",
    price: "$10",
    cadence: "per month",
    audience: "Hospitality professionals",
    features: ["Full Sip Academy mission access", "Quiz + terminology workflows", "Journal and tasting practice tools", "Priority support"]
  },
  {
    id: "founding",
    title: "Founding Cohort",
    price: "$1200",
    cadence: "one-time",
    audience: "Teams and serious learners",
    features: ["Everything in Pro", "4-6 week structured cohort track", "Founder office-hours and strategy reviews", "Early roadmap influence"]
  }
];

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [selectedPlanId, setSelectedPlanId] = useState("pro");

  return (
    <section className="pricing-page">
      <header className="section-header">
        <CosmicSky className="pricing-sky" stars={20} meteors={5} />
        <h2>Pricing</h2>
        <p>Choose a plan and move into guided, high-accountability training.</p>
      </header>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`pricing-card ${selectedPlanId === plan.id ? "selected" : "unselected"}`}
            onClick={() => setSelectedPlanId(plan.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedPlanId(plan.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={selectedPlanId === plan.id}
          >
            <h3>{plan.title}</h3>
            <p className="pricing-amount">
              {plan.price} <span>{plan.cadence}</span>
            </p>
            <p className="pricing-audience">{plan.audience}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {plan.id === "starter" ? (
              <button className="btn btn-light" onClick={() => onNavigate("app/launch")}>
                Start Free
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => onNavigate("checkout")}>
                Continue
              </button>
            )}
          </article>
        ))}
      </div>

      <article className="pricing-compare">
        <h3>What unlocks with Pro and Founding Cohort</h3>
        <ul>
          <li>Private workspace routes become available (`#app/...`)</li>
          <li>Subscription entitlement is enforced from live billing status records</li>
          <li>Admin console includes subscription oversight and role controls</li>
        </ul>
      </article>
    </section>
  );
}
