import {
  buildMembershipSupportRoute,
  formatOnboardingRouteLabel,
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

const membershipPromises = [
  {
    label: "What paying unlocks",
    detail: "The full visual workspace: academy rooms, maps, terms, games, recipes, and tasting practice."
  },
  {
    label: "Before you pay",
    detail: "Public previews, policies, refund details, and support stay available so the decision is not blind."
  },
  {
    label: "If checkout stalls",
    detail: "Membership Help carries your saved room and checkout context to the support desk."
  }
];

const pricingRouteSteps = [
  {
    label: "01",
    title: "Preview",
    detail: "Room selected before payment"
  },
  {
    label: "02",
    title: "Pricing",
    detail: "$10 monthly membership"
  },
  {
    label: "03",
    title: "Account",
    detail: "Attach learner access"
  },
  {
    label: "04",
    title: "Checkout",
    detail: "Secure Stripe session"
  },
  {
    label: "05",
    title: "Return",
    detail: "Open the saved room"
  }
];

function pricingRouteStepNote(index: number): string {
  if (index === 0) return "This destination stays attached through checkout.";
  if (index === 1) return "Confirm the one-plan offer before payment.";
  if (index === 2) return "Access follows the signed-in learner account.";
  if (index === 3) return "Payment details stay on Stripe.";
  return "Return to the room that started the path.";
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const intent = readOnboardingIntent("pro");
  const membership = getPlanById("pro");
  const nextRoute = intent.next;
  const nextRouteLabel = formatOnboardingRouteLabel(nextRoute);
  const checkoutSource = intent.source === "direct" ? "pricing" : `${intent.source}-pricing`;
  const checkoutRoute = buildOnboardingRoute("checkout", {
    planId: "pro",
    source: checkoutSource,
    next: nextRoute
  });
  const membershipSupportRoute = buildMembershipSupportRoute({
    source: "pricing-help",
    urgency: "soon",
    next: nextRoute,
    sessionId: intent.sessionId
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
        <div className="pricing-hero-actions" aria-label="Membership decision actions">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate(checkoutRoute)}>
            Continue to Checkout
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate(membershipSupportRoute)}>
            Membership Help
          </button>
          <small>{nextRouteLabel} stays saved.</small>
        </div>
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

      <section className="pricing-membership-promises" aria-label="Membership decision support">
        {membershipPromises.map((promise) => (
          <article key={promise.label}>
            <span>{promise.label}</span>
            <p>{promise.detail}</p>
          </article>
        ))}
      </section>

      <section className="pricing-route-builder" aria-label="Saved preview checkout path">
        <div className="pricing-route-builder-head">
          <div>
            <p className="pricing-route-builder-label">Saved Preview Path</p>
            <h2>{nextRoute ? "Continue the room you just previewed." : "Start with the Launch Pad."}</h2>
          </div>
          <strong>{nextRouteLabel}</strong>
        </div>
        <div className="pricing-route-builder-track">
          {pricingRouteSteps.map((step, index) => (
            <section className={index <= 1 ? "active" : ""} key={step.label}>
              <span>{step.label}</span>
              <strong>{step.title}</strong>
              <b>{index === 0 ? nextRouteLabel : step.detail}</b>
              <small>{pricingRouteStepNote(index)}</small>
            </section>
          ))}
        </div>
        <div className="pricing-route-builder-actions">
          {nextRoute ? (
            <button type="button" className="btn btn-light" onClick={() => onNavigate(nextRoute)}>
              Revisit Saved Preview
            </button>
          ) : null}
          <button type="button" className="btn btn-primary" onClick={() => onNavigate(checkoutRoute)}>
            Continue to Checkout
          </button>
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
            <button type="button" onClick={() => onNavigate(buildOnboardingRoute("terms", { planId: "pro", source: "pricing-policy", next: nextRoute }))}>
              Terms
            </button>
            <button type="button" onClick={() => onNavigate(buildOnboardingRoute("privacy", { planId: "pro", source: "pricing-policy", next: nextRoute }))}>
              Privacy
            </button>
            <button type="button" onClick={() => onNavigate(buildOnboardingRoute("refund", { planId: "pro", source: "pricing-policy", next: nextRoute }))}>
              Refunds
            </button>
            <button type="button" onClick={() => onNavigate(membershipSupportRoute)}>
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
          <button type="button" className="btn btn-light" onClick={() => onNavigate(membershipSupportRoute)}>
            Support &amp; Teams
          </button>
        </div>
      </article>
    </section>
  );
}
