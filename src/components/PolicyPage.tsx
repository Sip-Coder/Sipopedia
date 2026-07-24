import { buildOnboardingRoute } from "../lib/onboardingIntent";

type PolicyKind = "terms" | "privacy" | "refund";

type PolicyPageProps = {
  kind: PolicyKind;
  onNavigate: (route: string) => void;
};

const content: Record<PolicyKind, { title: string; paragraphs: string[] }> = {
  terms: {
    title: "Terms of Service",
    paragraphs: [
      "Sip Studies access is licensed to the purchasing account and may not be shared across teams without authorization.",
      "Educational content is provided for professional development and exam preparation; credential outcomes are not guaranteed.",
      "Paid plans can be modified or canceled according to the active billing cycle terms at time of purchase."
    ]
  },
  privacy: {
    title: "Privacy Policy",
    paragraphs: [
      "We collect account, progress, and usage data required to operate your learning workspace.",
      "Sensitive credentials are handled by managed providers and are never embedded in frontend source control.",
      "When a member shares an article, the recipient name, email address, and optional message are used only to deliver that requested email; recipients are not added to a Sip Studies mailing list.",
      "You may request account data export or deletion through support."
    ]
  },
  refund: {
    title: "Refund & Cancellation",
    paragraphs: [
      "Monthly plans can be canceled before renewal to avoid the next cycle charge.",
      "Legacy Founding Cohort purchases made while that offer was available may request a refund within 7 days of purchase if less than 20% of content is consumed.",
      "Contact support with purchase details to process changes."
    ]
  }
};

export function PolicyPage({ kind, onNavigate }: PolicyPageProps) {
  const policy = content[kind];
  return (
    <section className="policy-page">
      <header className="section-header">
        <h1>{policy.title}</h1>
      </header>
      <article className="policy-card">
        {policy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <div className="policy-actions">
        <button className="btn btn-light" onClick={() => onNavigate("home")}>
          Back Home
        </button>
        <button className="btn btn-primary" onClick={() => onNavigate(buildOnboardingRoute("checkout", { planId: "pro", source: `${kind}-policy` }))}>
          Continue to Enrollment
        </button>
      </div>
    </section>
  );
}

