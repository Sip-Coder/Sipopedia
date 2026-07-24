import { useState } from "react";
import { CosmicSky } from "./CosmicSky";
import { StarterFeatureDemo } from "./StarterFeatureDemo";
import { buildOnboardingRoute } from "../lib/onboardingIntent";
import type { PageStatusMap } from "../lib/siteMap";

import welcomeToSipStudies from "../assets/brand/welcome-to-sip-studies.png";

type MarketingHomeProps = {
  onNavigate: (route: string) => void;
  pageStatuses: PageStatusMap;
  isAdmin: boolean;
};

type PathfinderProfile = {
  id: string;
  label: string;
  title: string;
  signal: string;
  outcome: string;
  commitment: string;
  unlock: string;
  nextSteps: string[];
  primaryAction: string;
  primaryRoute: string;
  secondaryAction: string;
  secondaryRoute: string;
};

type MarketGapMove = {
  gap: string;
  response: string;
  routeLabel: string;
  route: string;
};

const workspaceSignals = [
  { lane: "Learn", detail: "Academy, terms, maps, ingredients, recipes, and resources." },
  { lane: "Taste", detail: "Flavor calibration, tasting capture, and journal memory loops." },
  { lane: "Connect", detail: "Industry context, cohorts, events, podcasts, and editorial study." }
];

const proofPoints = [
  "Mission-based curriculum instead of passive content",
  "Exam-aligned practice with source-cited terminology",
  "Intent-aware enrollment that resumes the room users tried to enter",
  "Cross-category practice for wine, beer, spirits, cocktails, service, and teams"
];

const pathfinderProfiles: PathfinderProfile[] = [
  {
    id: "new-learner",
    label: "New to beverage",
    title: "Start with a guided map.",
    signal: "You need orientation before depth.",
    outcome: "Preview the full workspace, understand Learn/Taste/Connect, then choose the first room without pressure.",
    commitment: "5 minute orientation",
    unlock: "Public preview now. $10/month membership when ready.",
    nextSteps: ["Scan Learn/Taste/Connect", "Try one route preview", "Save a plan before upgrading"],
    primaryAction: "Open Launch Pad",
    primaryRoute: "app/launch",
    secondaryAction: "View Membership",
    secondaryRoute: buildOnboardingRoute("pricing", { planId: "pro", source: "pathfinder-new-learner" })
  },
  {
    id: "cert-prep",
    label: "Certification prep",
    title: "Turn recall into exam readiness.",
    signal: "You need terms, maps, quizzes, and review loops.",
    outcome: "Use Sipopedia and academy routes as the spine, then add membership access for drills and preserved progress.",
    commitment: "15 minute study block",
    unlock: "The $10/month membership unlocks deeper practice rooms.",
    nextSteps: ["Search weak terms", "Run a certification quiz", "Review map and service clues"],
    primaryAction: "Open Study Paths",
    primaryRoute: "study-paths",
    secondaryAction: "View Membership",
    secondaryRoute: buildOnboardingRoute("pricing", { planId: "pro", source: "pathfinder-cert-prep", next: "study-paths" })
  },
  {
    id: "beer-pro",
    label: "Beer pro",
    title: "Build a Cicerone-style practice lane.",
    signal: "You need beer style, draught, service, and off-flavor reps.",
    outcome: "Start with beer-ready quiz filters, reinforce production through equipment mastery, then turn style language into service decisions.",
    commitment: "12 minute beer drill",
    unlock: "Membership keeps beer service practice and saved review loops together.",
    nextSteps: ["Set quiz to Cicerone", "Open equipment mastery", "Review beer recipe maps"],
    primaryAction: "Start Beer Quiz",
    primaryRoute: "app/beverage-quiz",
    secondaryAction: "Open Sip Game",
    secondaryRoute: "app/sip-game"
  },
  {
    id: "spirits-pro",
    label: "Spirits pro",
    title: "Practice category logic and bar language.",
    signal: "You need production, base spirit, cocktail, and guest-language reps.",
    outcome: "Use the quiz engine and beverage recipe maps to connect spirits theory with classic builds, modifiers, and table-side explanations.",
    commitment: "10 minute spirits sprint",
    unlock: "Membership adds repeated practice across spirits, cocktails, and tasting notes.",
    nextSteps: ["Set quiz to spirits", "Review classic specs", "Log a tasting note"],
    primaryAction: "Open Bev Recipes",
    primaryRoute: "app/cocktails",
    secondaryAction: "Run Quiz",
    secondaryRoute: "app/beverage-quiz"
  },
  {
    id: "bartender",
    label: "Bartender",
    title: "Turn recipes into service muscle.",
    signal: "You need fast specs, hospitality context, and profitable menu thinking.",
    outcome: "Route into cocktail builds, flavor calibration, and industry radar so practice feels like a shift-prep tool instead of a static recipe list.",
    commitment: "8 minute pre-shift rep",
    unlock: "Membership unlocks applied rooms and saved tasting practice.",
    nextSteps: ["Drill classic builds", "Calibrate flavor language", "Read one Daily Sip signal"],
    primaryAction: "Open Bev Recipes",
    primaryRoute: "app/cocktails",
    secondaryAction: "Open Flavor Wheel",
    secondaryRoute: "app/flavor-wheel"
  },
  {
    id: "working-pro",
    label: "Working pro",
    title: "Train service decisions.",
    signal: "You need table-side language and fast application.",
    outcome: "Jump into recipes, maps, tasting language, and industry context without walking through beginner scaffolding.",
    commitment: "10 minute service drill",
    unlock: "Membership unlocks applied rooms and saved practice.",
    nextSteps: ["Scan one label or menu item", "Translate one style clue", "Check current market context"],
    primaryAction: "Open Scanner",
    primaryRoute: "app/cellar-scanner",
    secondaryAction: "View Membership",
    secondaryRoute: buildOnboardingRoute("pricing", { planId: "pro", source: "pathfinder-working-pro", next: "app/cocktails" })
  },
  {
    id: "team-lead",
    label: "Team lead",
    title: "Ship a training sprint.",
    signal: "You need a shared path, accountability, and business outcomes.",
    outcome: "Use the Team Desk to plan a structured rollout, then map modules to staff service standards.",
    commitment: "Flexible training sprint",
    unlock: "Team training support stays separate from individual membership.",
    nextSteps: ["Choose staff lane", "Assign weekly modules", "Track service outcomes"],
    primaryAction: "Open Team Desk",
    primaryRoute: "support",
    secondaryAction: "View Membership",
    secondaryRoute: buildOnboardingRoute("pricing", { planId: "pro", source: "pathfinder-team-lead" })
  }
];

const marketGapMoves: MarketGapMove[] = [
  {
    gap: "Competitors win with named credentials and exam ladders.",
    response: "Sip Studies now routes students through an independent credential prep desk before they touch the full menu.",
    routeLabel: "Credential Paths",
    route: "study-paths"
  },
  {
    gap: "Beer and spirits products often feel deeper than broad beverage sites.",
    response: "Beer and spirits learners get direct practice routes instead of being buried under a wine-first path.",
    routeLabel: "Beer + Spirits Practice",
    route: "app/beverage-quiz"
  },
  {
    gap: "Bar academies sell operational skill, not just knowledge.",
    response: "Bartender and team tracks point to recipes, flavor calibration, industry radar, and practical training language.",
    routeLabel: "Service Tools",
    route: "app/cocktails"
  },
  {
    gap: "Streaming and creator platforms make learning feel episodic.",
    response: "The lobby connects route previews, Daily Sip, Winecast, events, and groups as the entertainment and community layer.",
    routeLabel: "Connect Lane",
    route: "app/flavor-blog"
  },
  {
    gap: "Wine apps win by scanning bottles, menus, and cellar inventory on the phone.",
    response: "The Taste lane now has a Cellar Scanner that turns OCR or pasted label text into local records, study routes, and tasting-note prompts.",
    routeLabel: "Cellar Scanner",
    route: "app/cellar-scanner"
  },
  {
    gap: "Credential providers and bar-training platforms make support, billing, and team training easy to find.",
    response: "A public support desk now routes enrollment, billing, study remediation, and manager training sprints before a buyer has to hunt.",
    routeLabel: "Support Desk",
    route: "support"
  }
];

export function MarketingHome({ onNavigate, pageStatuses, isAdmin }: MarketingHomeProps) {
  const [activeProfileId, setActiveProfileId] = useState(pathfinderProfiles[0].id);
  const activeProfile = pathfinderProfiles.find((profile) => profile.id === activeProfileId) ?? pathfinderProfiles[0];

  return (
    <section className="marketing-home">
      <div className="marketing-hero">
        <CosmicSky className="hero-sky" />
        <div className="marketing-hero-grid">
          <div className="marketing-hero-copy">
            <p className="marketing-kicker">Sip Studies Mission Brief</p>
            <h1>Beverage training that behaves like an operating system.</h1>
            <p className="marketing-lead">
              Learn the material, calibrate taste, and return to the exact room you meant to open. Sip Studies turns beverage education into a guided,
              intent-aware workspace for service, study, and team execution.
            </p>
            <div className="marketing-hero-actions">
              <button className="btn btn-primary" onClick={() => onNavigate(buildOnboardingRoute("pricing", { planId: "pro", source: "home-hero" }))}>
                Join for $10/month
              </button>
              <button className="btn btn-light" onClick={() => onNavigate("app/launch")}>
                Open Launch Pad
              </button>
            </div>
          </div>
          <aside className="marketing-hero-orbit" aria-label="Sip Studies welcome panel">
            <img className="marketing-welcome-panel" src={welcomeToSipStudies} alt="Welcome to Sip Studies" decoding="async" fetchPriority="high" />
          </aside>
        </div>
      </div>

      <section className="marketing-pathfinder" aria-labelledby="pathfinder-title">
        <div className="marketing-pathfinder-copy">
          <p className="marketing-kicker">Next Best Sip</p>
          <h2 id="pathfinder-title">Tell us what you need. We'll show the next move.</h2>
          <p>
            Pick the role that matches the work in front of you. The lobby routes beginners, exam prep, working pros, and teams without making everyone
            read the same menu.
          </p>
        </div>
        <div className="marketing-pathfinder-grid">
          <div className="marketing-pathfinder-options" role="list" aria-label="Learner profiles">
            {pathfinderProfiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                className={`marketing-pathfinder-option ${profile.id === activeProfile.id ? "active" : ""}`}
                onClick={() => setActiveProfileId(profile.id)}
                aria-pressed={profile.id === activeProfile.id}
              >
                <span>{profile.label}</span>
                <strong>{profile.title}</strong>
                <small>{profile.signal}</small>
              </button>
            ))}
          </div>
          <article className="marketing-pathfinder-result" aria-live="polite">
            <div>
              <span className="marketing-pathfinder-label">Recommended path</span>
              <h3>{activeProfile.title}</h3>
              <p>{activeProfile.outcome}</p>
            </div>
            <dl className="marketing-pathfinder-metrics">
              <div>
                <dt>First session</dt>
                <dd>{activeProfile.commitment}</dd>
              </div>
              <div>
                <dt>Access cue</dt>
                <dd>{activeProfile.unlock}</dd>
              </div>
            </dl>
            <div className="marketing-training-stack" aria-label={`${activeProfile.label} training stack`}>
              <span>Training stack</span>
              <ul>
                {activeProfile.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="marketing-pathfinder-actions">
              <button className="btn btn-primary" onClick={() => onNavigate(activeProfile.primaryRoute)}>
                {activeProfile.primaryAction}
              </button>
              <button className="btn btn-light" onClick={() => onNavigate(activeProfile.secondaryRoute)}>
                {activeProfile.secondaryAction}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="marketing-gap-board" aria-labelledby="gap-board-title">
        <div className="marketing-gap-copy">
          <p className="marketing-kicker">Competitive Gaps Closed First</p>
          <h2 id="gap-board-title">The lobby now routes the weaknesses we found.</h2>
          <p>
            WSET, CMS, Cicerone, bar academies, streaming services, and wine apps all win by making the next learner action obvious. These cards turn
            that research into immediate student support.
          </p>
        </div>
        <div className="marketing-gap-grid">
          {marketGapMoves.map((move) => (
            <article key={move.gap} className="marketing-gap-card">
              <span>Gap</span>
              <h3>{move.gap}</h3>
              <p>{move.response}</p>
              <button className="btn btn-light" onClick={() => onNavigate(move.route)}>
                {move.routeLabel}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-foundation" aria-labelledby="foundation-title">
        <div className="marketing-foundation-copy">
          <p className="marketing-kicker">Sip Studies Rooms</p>
          <h2 id="foundation-title">The route changes by learner. The rooms stay simple.</h2>
          <p>Every recommendation lands in Learn, Taste, or Connect, so new learners get orientation and experienced users keep their shortcuts.</p>
        </div>
        <div className="marketing-room-stack" aria-label="Sip Studies room structure">
          {workspaceSignals.map((signal) => (
            <article key={signal.lane}>
              <span>{signal.lane}</span>
              <p>{signal.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="marketing-proof">
        <h2>Why buyers choose Sip Studies</h2>
        <ul>
          {proofPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <StarterFeatureDemo
        onFeatureNavigate={onNavigate}
        pageStatuses={pageStatuses}
        isAdmin={isAdmin}
      />
    </section>
  );
}
