import { useMemo, useState } from "react";
import { trackEvent } from "../lib/analytics";
import { CosmicSky } from "./CosmicSky";

type CheckoutPageProps = {
  onNavigate: (route: string) => void;
};

const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL as string | undefined;
const assistedEnrollmentEmail = "Admin@SipStudies.com";

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");

  const mailtoHref = useMemo(() => {
    const recipient = assistedEnrollmentEmail;
    const subject = encodeURIComponent("Sip Studies enrollment request");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nGoal: ${goal}\n`);
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }, [email, goal, name]);

  return (
    <section className="checkout-page">
      <header className="section-header">
        <CosmicSky className="checkout-sky" stars={16} meteors={4} />
        <h2>Start Enrollment</h2>
        <p>Pick your path and we will activate your Pro access immediately after confirmation.</p>
      </header>

      <div className="checkout-layout">
        <article className="checkout-card">
          <h3>Direct Checkout</h3>
          <p>Use instant checkout when the hosted billing link is active.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (checkoutUrl) {
                trackEvent("checkout_start", { channel: "hosted_checkout" });
                window.location.assign(checkoutUrl);
                return;
              }
              trackEvent("checkout_fallback_to_assisted", { reason: "missing_checkout_url" });
              document.getElementById("assisted-enrollment-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {checkoutUrl ? "Open Secure Checkout" : "Use Assisted Enrollment"}
          </button>
          {!checkoutUrl ? <p className="hint">Hosted checkout is not active yet. Use Assisted Enrollment below.</p> : null}
        </article>

        <article className="checkout-card" id="assisted-enrollment-card">
          <h3>Assisted Enrollment</h3>
          <p>Share your goal and we will place you in the right cohort or plan.</p>
          <label>
            Full name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
          </label>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Learning goal
            <textarea value={goal} onChange={(event) => setGoal(event.target.value)} rows={4} placeholder="What outcome do you need in 30 days?" />
          </label>
          <a
            href={mailtoHref}
            className="btn btn-light"
            onClick={() => trackEvent("checkout_start", { channel: "email_sales" })}
          >
            Email Enrollment Request
          </a>
        </article>
      </div>

      <div className="checkout-links">
        <button className="btn btn-light" onClick={() => onNavigate("pricing")}>
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
