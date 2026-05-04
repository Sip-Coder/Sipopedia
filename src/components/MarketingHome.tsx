import { CosmicSky } from "./CosmicSky";
import { StarterFeatureDemo } from "./StarterFeatureDemo";

import welcomeToSipStudies from "../assets/brand/welcome-to-sip-studies.png";

type MarketingHomeProps = {
  onNavigate: (route: string) => void;
};

export function MarketingHome({ onNavigate }: MarketingHomeProps) {
  return (
    <section className="marketing-home">
      <div className="marketing-hero">
        <CosmicSky className="hero-sky" />
        <img className="marketing-welcome-panel" src={welcomeToSipStudies} alt="Welcome to Sip Studies" decoding="async" fetchPriority="high" />
        <p className="marketing-kicker">Sip Studies Pro</p>
        <h1>Turn beverage knowledge into confident service in weeks, not months.</h1>
        <p className="marketing-lead">
          Mission-based sommelier training for hospitality professionals. Structured practice, exam-grade drills, and applied service decisions in one
          paid workspace.
        </p>
        <div className="marketing-hero-metrics">
          <span>Mission-Based Curriculum</span>
          <span>Exam-Aligned Practice</span>
          <span>Source-Cited Glossary</span>
        </div>
        <div className="marketing-hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate("pricing")}>
            View Pricing
          </button>
          <button className="btn btn-light" onClick={() => onNavigate("checkout")}>
            Join Founding Cohort
          </button>
        </div>
      </div>

      <div className="marketing-grid">
        <article className="marketing-card">
          <h3>The Problem</h3>
          <p>Most learners study random facts and freeze in live service. You need repeatable decision practice, not passive content.</p>
        </article>
        <article className="marketing-card">
          <h3>The Plan</h3>
          <p>
            1. Enroll and unlock Pro.
            <br />
            2. Follow mission loops in Sip Academy.
            <br />
            3. Validate skill progression with targeted quiz & journal workflows.
          </p>
        </article>
        <article className="marketing-card">
          <h3>The Outcome</h3>
          <p>Faster menu recommendations, stronger pairing confidence, and exam-prep discipline that translates to real table-side performance.</p>
        </article>
      </div>

      <div className="marketing-proof">
        <h2>Why buyers choose Sip Studies</h2>
        <ul>
          <li>Exam-grounded quiz system and terminology library</li>
          <li>Mission-based curriculum with practical service scenarios</li>
          <li>Source-cited knowledge layer built for professional standards</li>
        </ul>
      </div>

      <div className="marketing-process">
        <article className="marketing-process-card">
          <p className="marketing-step">Step 1</p>
          <h3>Enroll and Baseline</h3>
          <p>Set your role, service context, and objective so training maps to your real floor constraints.</p>
        </article>
        <article className="marketing-process-card">
          <p className="marketing-step">Step 2</p>
          <h3>Train in Sprints</h3>
          <p>Run through focused missions and quiz loops that sharpen recommendation quality and speed.</p>
        </article>
        <article className="marketing-process-card">
          <p className="marketing-step">Step 3</p>
          <h3>Ship Better Service</h3>
          <p>Apply framework-backed language, pairing confidence, and production literacy during live guest interactions.</p>
        </article>
      </div>

      <StarterFeatureDemo cardsAreLinks={false} />
    </section>
  );
}
