import {
  buildOnboardingRoute,
  getPlanById,
  readOnboardingIntent
} from "../lib/onboardingIntent";
import { CosmicSky } from "./CosmicSky";

type PricingPageProps = {
  onNavigate: (route: string) => void;
};

const buyerFits = [
  {
    title: "Curious beginners",
    detail: "Start with moving previews, field notes, and plain-language routes before dense study."
  },
  {
    title: "Hospitality staff",
    detail: "Build confident guest language for wine, beer, spirits, coffee, tea, and service moments."
  },
  {
    title: "Certification prep",
    detail: "Use Sipopedia beside WSET, CMS, Cicerone, BarSmarts-style, and regional-study work."
  }
];

const proofPoints = [
  { label: "Preview first", value: "Public demos stay open" },
  { label: "One price", value: "$10 monthly" },
  { label: "No dead end", value: "Assisted enrollment fallback" }
];

const launchProof = [
  "Secure checkout attaches to the signed-in account",
  "Membership access follows live billing status",
  "Terms, Privacy, Refund, and Support stay reachable before payment"
];

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
          One monthly membership opens the visual academy: preview first, join once, then keep your saved room attached
          through checkout.
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
        <div className="pricing-proof-strip" aria-label="Membership proof points">
          {proofPoints.map((point) => (
            <span key={point.label}>
              <strong>{point.label}</strong>
              {point.value}
            </span>
          ))}
        </div>
      </header>

      <section className="pricing-buyer-fit" aria-label="Who Sip Studies is for">
        <div>
          <p className="checkout-eyebrow">Built For First Customers</p>
          <h2>Start where the learner already is.</h2>
        </div>
        <div className="pricing-buyer-fit-grid">
          {buyerFits.map((fit) => (
            <article key={fit.title}>
              <h3>{fit.title}</h3>
              <p>{fit.detail}</p>
            </article>
          ))}
        </div>
      </section>

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
          <div className="pricing-trust-links" aria-label="Membership trust links">
            <button type="button" onClick={() => onNavigate("terms")}>
              Terms
            </button>
            <button type="button" onClick={() => onNavigate("privacy")}>
              Privacy
            </button>
            <button type="button" onClick={() => onNavigate("refund")}>
              Refunds
            </button>
            <button type="button" onClick={() => onNavigate("support")}>
              Support
            </button>
          </div>
        </article>
      </div>

      <article className="pricing-compare pricing-membership-note">
        <h3>What $10/month unlocks now.</h3>
        <p>
          The membership keeps the public preview promise simple: see the product first, then unlock the study rooms
          without comparing tiers or losing your next destination.
        </p>
        <ul>
          {launchProof.map((proof) => (
            <li key={proof}>{proof}</li>
          ))}
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
