import { useMemo, useState } from "react";
import { buildOnboardingRoute } from "../lib/onboardingIntent";
import { workspaceItemsForSection } from "../lib/workspaceNavigation";

type StarterFeatureDemoProps = {
  onFeatureNavigate?: (route: string) => void;
  cardsAreLinks?: boolean;
};

type DemoFeature = {
  id: string;
  title: string;
  track: "Learn" | "Taste" | "Connect" | "Enrollment";
  image: string;
  summary: string;
  bullets: string[];
};

type CoreTrack = "Learn" | "Taste" | "Connect";
type FeatureAccessState = {
  label: "Preview" | "Enrollment";
  detail: string;
};

const moduleSignal = (section: "learn" | "taste" | "connect") => {
  const moduleCount = workspaceItemsForSection(section).length;
  return `${moduleCount} module${moduleCount === 1 ? "" : "s"}`;
};

const portalCopy: Record<CoreTrack, { code: string; title: string; headline: string; summary: string; signal: string }> = {
  Learn: {
    code: "01",
    title: "Learn",
    headline: "Study routes with a map, not a maze.",
    summary: "Academy missions, game practice, terminology, maps, regions, ingredients, recipes, and resources.",
    signal: moduleSignal("learn")
  },
  Taste: {
    code: "02",
    title: "Taste",
    headline: "Turn sensory memory into service language.",
    summary: "Flavor calibration, tasting capture, and journal memory loops for sensory confidence.",
    signal: moduleSignal("taste")
  },
  Connect: {
    code: "03",
    title: "Connect",
    headline: "Keep study tied to the beverage world.",
    summary: "Industry radar, editorial context, cohorts, podcasts, AI feeds, and event pages.",
    signal: moduleSignal("connect")
  }
};

const portalOrder: CoreTrack[] = ["Learn", "Taste", "Connect"];

function accessStateForFeature(feature: DemoFeature): FeatureAccessState {
  if (feature.track === "Enrollment") {
    return { label: "Enrollment", detail: "Application path" };
  }

  return { label: "Preview", detail: "Full room locked" };
}

export const starterPreviewFeatures: DemoFeature[] = [
  {
    id: "sip-academy",
    title: "Sip Academy Missions",
    track: "Learn",
    image: "/starter-thumbs/sip-academy-640.webp",
    summary: "Progressive mission ladder with guided learning loops and milestone progression.",
    bullets: ["Realm progression", "Mentor-guided loops", "Gamified mastery flow"]
  },
  {
    id: "sip-game",
    title: "Sip Game Adventure",
    track: "Learn",
    image: "/starter-thumbs/sip-game-640.webp",
    summary: "Interactive walkaround with mentor conversations and quest-driven practice.",
    bullets: ["NPC mentor interactions", "Map exploration", "Quest checkpoints"]
  },
  {
    id: "sipopedia",
    title: "Sipopedia Terminology",
    track: "Learn",
    image: "/starter-thumbs/sipopedia-640.webp",
    summary: "Professional glossary built for service clarity, exam prep, and practical recall.",
    bullets: ["Structured definitions", "Applied usage", "Service-ready language"]
  },
  {
    id: "beverage-quiz",
    title: "Beverage Quiz Workflows",
    track: "Learn",
    image: "/starter-thumbs/beverage-quiz-640.webp",
    summary: "Assessment flows to test theory, tasting logic, and service decision speed.",
    bullets: ["Exam-style prompts", "Feedback loops", "Retention-oriented drills"]
  },
  {
    id: "regions",
    title: "Regions Atlas",
    track: "Learn",
    image: "/starter-thumbs/regions-640.webp",
    summary: "Geographic exploration for wine regions, production context, and study routing.",
    bullets: ["Region deep dives", "Context-linked learning", "Route-based study map"]
  },
  {
    id: "maps",
    title: "Maps",
    track: "Learn",
    image: "/starter-thumbs/maps-640.webp",
    summary: "Cartographic study layer for seeing place, region, and production context together.",
    bullets: ["Map-first study", "Global orientation", "Region context"]
  },
  {
    id: "grapes",
    title: "Grapes & Grains",
    track: "Learn",
    image: "/starter-thumbs/grapes-640.webp",
    summary: "Base ingredient study for grapes, grains, hops, coffee, tea, and production families.",
    bullets: ["Ingredient families", "Variety recall", "Production links"]
  },
  {
    id: "cocktails",
    title: "Bev Recipes",
    track: "Learn",
    image: "/starter-thumbs/cocktails-640.webp",
    summary: "Cocktail, wine, and beer recipe maps for service-ready beverage construction.",
    bullets: ["Classic specs", "Style navigation", "Service language"]
  },
  {
    id: "resources",
    title: "Resources",
    track: "Learn",
    image: "/starter-thumbs/resources-640.webp",
    summary: "Reference library for quick lookup, source material, and study support.",
    bullets: ["Reference lists", "Service support", "Study scaffolds"]
  },
  {
    id: "flavor-wheel",
    title: "Flavor Wheel Calibration",
    track: "Taste",
    image: "/starter-thumbs/flavor-wheel-640.webp",
    summary: "Descriptor-mapping drills that improve tasting vocabulary precision under service pressure.",
    bullets: ["Aroma family mapping", "Descriptor confidence reps", "Language consistency checks"]
  },
  {
    id: "tasting-journal",
    title: "Journal Archive",
    track: "Taste",
    image: "/starter-thumbs/tasting-journal-640.webp",
    summary: "Archive view for saved tasting history, pattern recall, and readiness progression.",
    bullets: ["Structured tasting entries", "Trend visibility", "Long-term memory reinforcement"]
  },
  {
    id: "flavors",
    title: "Tasting Journal",
    track: "Taste",
    image: "/starter-thumbs/flavors-640.webp",
    summary: "Guided tasting capture for turning sensory impressions into consistent notes.",
    bullets: ["Tasting forms", "Descriptor prompts", "Comparison practice"]
  },
  {
    id: "beverage-news",
    title: "Beverage News",
    track: "Connect",
    image: "/starter-thumbs/beverage-news-640.webp",
    summary: "Industry signal feed that connects study topics to current beverage conversations.",
    bullets: ["Industry radar", "Current context", "Learning prompts"]
  },
  {
    id: "flavor-blog",
    title: "Flavor Blog",
    track: "Connect",
    image: "/starter-thumbs/flavor-blog-640.webp",
    summary: "Editorial brand text for deeper beverage stories, study framing, and service language.",
    bullets: ["Brand essays", "Study framing", "Service vocabulary"]
  },
  {
    id: "ai-winecast",
    title: "AI Winecast",
    track: "Connect",
    image: "/starter-thumbs/ai-winecast-640.webp",
    summary: "Podcast-style dispatches that turn beverage research into study-ready listening paths.",
    bullets: ["Episode archive", "Study prompts", "Audio-first review"]
  },
  {
    id: "tasting-groups",
    title: "Tasting Groups",
    track: "Connect",
    image: "/starter-thumbs/tasting-groups-640.webp",
    summary: "Cohort discovery for learners who want structured tasting practice with other people.",
    bullets: ["Group discovery", "Regional filters", "Practice community"]
  },
  {
    id: "ai-news",
    title: "AI News",
    track: "Connect",
    image: "/starter-thumbs/ai-news-640.webp",
    summary: "AI research and operations feed for keeping the learning system tied to current tools.",
    bullets: ["Research feed", "Tool context", "Operations signal"]
  },
  {
    id: "somm-events",
    title: "Somm Events",
    track: "Connect",
    image: "/starter-thumbs/somm-events-640.webp",
    summary: "Event link studio for building polished social and event surfaces around beverage work.",
    bullets: ["Event links", "Social modules", "Public profile"]
  },
  {
    id: "founding-cohort",
    title: "Founding Cohort Track",
    track: "Enrollment",
    image: "/starter-thumbs/founding-cohort-640.webp",
    summary: "Structured 4-6 week execution sprint for serious learners and teams.",
    bullets: ["Weekly objectives", "Cohort accountability", "Direct founder feedback loop"]
  }
];

export function StarterFeatureDemo({ onFeatureNavigate, cardsAreLinks = true }: StarterFeatureDemoProps) {
  const [activeTrack, setActiveTrack] = useState<CoreTrack>("Learn");
  const groupedFeatures = useMemo(() => {
    return portalOrder.reduce<Record<CoreTrack, DemoFeature[]>>(
      (groups, track) => {
        groups[track] = starterPreviewFeatures.filter((feature) => feature.track === track);
        return groups;
      },
      { Learn: [], Taste: [], Connect: [] }
    );
  }, []);
  const activeFeatures = groupedFeatures[activeTrack];
  const spotlightFeature = activeFeatures[0];
  const secondaryFeatures = activeFeatures.slice(1);
  const enrollmentFeature = starterPreviewFeatures.find((feature) => feature.track === "Enrollment");

  const routeForFeature = (id: string): string => {
    if (id === "founding-cohort") return buildOnboardingRoute("checkout", { planId: "founding", source: "starter-preview" });
    return `app/${id}`;
  };
  const headerCopy = cardsAreLinks
    ? "Choose a route below. Starter access previews each module, and paid access unlocks the full workspace."
    : "Scan the live route map below. Starter access is a preview only; full modules unlock with paid access.";

  const renderFeatureCard = (feature: DemoFeature, variant: "spotlight" | "compact" | "cohort" = "compact") => {
    const accessState = accessStateForFeature(feature);
    const content = (
      <>
        <img
          src={feature.image}
          alt={`${feature.title} preview`}
          className="starter-demo-thumb"
          width="640"
          height="360"
          sizes={variant === "spotlight" ? "(max-width: 960px) calc(100vw - 3rem), 640px" : "(max-width: 640px) calc(100vw - 3rem), (max-width: 960px) calc((100vw - 4rem) / 2), 350px"}
          decoding="async"
        />
        <div className="starter-demo-body">
          <div className="starter-demo-meta">
            <p className="starter-demo-track">{feature.track}</p>
            <span className={`starter-access-pill starter-access-pill-${accessState.label.toLowerCase()}`}>{accessState.label}</span>
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.summary}</p>
          <small className="starter-access-detail">{accessState.detail}</small>
          <ul>
            {feature.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </>
    );
    const className = `starter-demo-card starter-demo-card-${variant}`;

    if (!cardsAreLinks) {
      return (
        <article key={feature.id} className={className}>
          {content}
        </article>
      );
    }

    return (
      <button
        key={feature.id}
        type="button"
        className={`${className} starter-demo-card-btn`}
        onClick={() => onFeatureNavigate?.(routeForFeature(feature.id))}
        aria-label={`Open ${feature.title}`}
      >
        {content}
      </button>
    );
  };

  return (
    <section className="starter-demo starter-demo-portals" aria-label="Starter page feature preview">
      <header className="starter-demo-header">
        <p className="starter-demo-kicker">Starter Preview</p>
        <h2>Choose A Room Before You Choose A Module</h2>
        <p>{headerCopy}</p>
      </header>

      <div className="starter-portal-deck" role="tablist" aria-label="Workspace preview rooms">
        {portalOrder.map((track) => {
          const portal = portalCopy[track];
          const isActive = activeTrack === track;
          return (
            <button
              key={track}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`starter-portal-button ${isActive ? "active" : ""}`}
              onClick={() => setActiveTrack(track)}
            >
              <span>{portal.code}</span>
              <strong>{portal.title}</strong>
              <small>{portal.signal}</small>
              <b>Preview</b>
              <em>{portal.summary}</em>
            </button>
          );
        })}
      </div>

      <div className="starter-portal-stage">
        <div className="starter-portal-intro">
          <p className="starter-demo-kicker">{portalCopy[activeTrack].title} Portal</p>
          <h3>{portalCopy[activeTrack].headline}</h3>
          <p>
            {portalCopy[activeTrack].summary} Experts can jump straight to a module; new learners can understand the room first.
          </p>
        </div>
        {spotlightFeature ? <div className="starter-feature-spotlight">{renderFeatureCard(spotlightFeature, "spotlight")}</div> : null}
        <div className="starter-demo-grid starter-demo-grid-compact">
          {secondaryFeatures.map((feature) => renderFeatureCard(feature))}
        </div>
      </div>

      {enrollmentFeature ? (
        <div className="starter-demo-cohort">
          <div>
            <p className="starter-demo-kicker">Enrollment Track</p>
            <h3>Need the structured path?</h3>
            <p>Founding Cohort remains available without competing with the three core study rooms.</p>
          </div>
          {renderFeatureCard(enrollmentFeature, "cohort")}
        </div>
      ) : null}
    </section>
  );
}
