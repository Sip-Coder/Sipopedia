import {
  buildOnboardingRoute,
  getPlanById,
  readOnboardingIntent
} from "../lib/onboardingIntent";
import { CosmicSky } from "./CosmicSky";

type PricingPageProps = {
  onNavigate: (route: string) => void;
};

export function PricingPage({ onNavigate }: PricingPageProps) {
  const intent = readOnboardingIntent("pro");
  const membership = getPlanById("pro");
  const nextRoute = intent.next;
  const nextRouteLabel = nextRoute
    ? nextRoute.replace(/^app\//, "").replace(/-/g, " ")
    : "Launch Pad";
  const checkoutRoute = buildOnboardingRoute("checkout", {
    planId: "pro",
    source: "pricing",
    next: nextRoute
  });

  return (
    <section className="pricing-page">
      <header className="section-header pricing-hero">
        <CosmicSky className="pricing-sky" stars={20} meteors={5} />
        <p className="checkout-eyebrow">One Membership</p>
        <h1>Everything in Sip Studies for $10 per month.</h1>
        <p>
          One monthly membership unlocks the full Learn, Taste, and Connect
          workspace. There are no pricing tiers to compare.
        </p>
        <div className="pricing-intent-ribbon pricing-intent-ribbon-single" aria-label="Membership checkout context">
          <span>
            <strong>Billing</strong>
            $10 monthly
          </span>
          <span>
            <strong>After checkout</strong>
            {nextRouteLabel}
          </span>
        </div>
      </header>

      <div className="pricing-grid pricing-grid-single">
        <article className="pricing-card pricing-card-membership selected">
          <div className="pricing-card-top">
            <h2>{membership.title}</h2>
            <span>Monthly</span>
          </div>
          <div className="access-state-row" aria-label="Membership access">
            <span className="access-state-chip access-state-included">Full workspace</span>
            <span className="access-state-chip access-state-current">One plan</span>
          </div>
          <p className="pricing-amount">
            {membership.price} <span>{membership.cadence}</span>
          </p>
          <p className="pricing-audience">{membership.audience}</p>
          <p className="pricing-billing-note">{membership.billingNote}</p>
          <ul>
            {membership.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="pricing-card-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate(checkoutRoute)}
            >
              Continue to Secure Checkout
            </button>
          </div>
        </article>
      </div>

      <article className="pricing-compare pricing-membership-note">
        <h3>Simple access, separate future launches.</h3>
        <p>
          Public previews remain available from the Launch Pad. Cohorts, team
          programs, and future community-funded projects will return as
          separate launches instead of competing membership tiers.
        </p>
        <ul>
          <li>Private workspace routes unlock after successful checkout</li>
          <li>Membership access follows live billing status</li>
          <li>Your intended room remains saved through checkout</li>
        </ul>
      </article>

      <article className="pricing-support-bridge">
        <div>
          <p className="checkout-eyebrow">Need another path?</p>
          <h3>Credential prep and team-training questions have their own desks.</h3>
          <p>
            Use those public routes for independent certification planning,
            billing guidance, or future team-program interest.
          </p>
        </div>
        <div className="pricing-support-actions">
          <button type="button" className="btn btn-light" onClick={() => onNavigate("study-paths")}>
            Credential Paths
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate("support")}>
            Support &amp; Teams
          </button>
        </div>
      </article>
    </section>
  );
}
