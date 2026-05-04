type StarterFeatureDemoProps = {
  onFeatureNavigate?: (route: string) => void;
  cardsAreLinks?: boolean;
};

type DemoFeature = {
  id: string;
  title: string;
  track: "Sip Studios" | "Ai RnD" | "Somm Support";
  image: string;
  summary: string;
  bullets: string[];
};

export const starterPreviewFeatures: DemoFeature[] = [
  {
    id: "sip-academy",
    title: "Sip Academy Missions",
    track: "Sip Studios",
    image: "/academy/realms/realm-1-crystal-atrium.jpg",
    summary: "Progressive mission ladder with guided learning loops and milestone progression.",
    bullets: ["Realm progression", "Mentor-guided loops", "Gamified mastery flow"]
  },
  {
    id: "sip-game",
    title: "Sip Studios Adventure Game",
    track: "Sip Studios",
    image: "/academy/units/unit-08-pairing-theater.png",
    summary: "Interactive walkaround with mentor conversations and quest-driven practice.",
    bullets: ["NPC mentor interactions", "Map exploration", "Quest checkpoints"]
  },
  {
    id: "sipopedia",
    title: "Sipopedia Terminology",
    track: "Sip Studios",
    image: "/academy/equipment/cellar-lab-bench-reference.png",
    summary: "Professional glossary built for service clarity, exam prep, and practical recall.",
    bullets: ["Structured definitions", "Applied usage", "Service-ready language"]
  },
  {
    id: "beverage-quiz",
    title: "Beverage Quiz Workflows",
    track: "Sip Studios",
    image: "/academy/units/unit-09-blind-grid-forge.png",
    summary: "Assessment flows to test theory, tasting logic, and service decision speed.",
    bullets: ["Exam-style prompts", "Feedback loops", "Retention-oriented drills"]
  },
  {
    id: "regions",
    title: "Regions Atlas",
    track: "Sip Studios",
    image: "/earth-topo-bathy-5400.jpg",
    summary: "Geographic exploration for wine regions, production context, and study routing.",
    bullets: ["Region deep dives", "Context-linked learning", "Route-based study map"]
  },
  {
    id: "flavor-tools",
    title: "Flavor + Tasting Tools",
    track: "Sip Studios",
    image: "/flavor-thumbs/by-descriptor/Flavor%20Pic%2001.png",
    summary: "Flavor Wheel and Tasting Journal workflows to sharpen sensory language and memory.",
    bullets: ["Flavor classification", "Session logging", "Pattern tracking over time"]
  },
  {
    id: "flavor-wheel",
    title: "Flavor Wheel Calibration",
    track: "Sip Studios",
    image: "/flavor-thumbs/by-descriptor/Flavor%20Pic%2001.png",
    summary: "Descriptor-mapping drills that improve tasting vocabulary precision under service pressure.",
    bullets: ["Aroma family mapping", "Descriptor confidence reps", "Language consistency checks"]
  },
  {
    id: "tasting-journal",
    title: "Tasting Journal Tracker",
    track: "Sip Studios",
    image: "/academy/equipment/cellar-lab-bench-reference.png",
    summary: "Session-by-session capture workflow for notes, pattern recall, and readiness progression.",
    bullets: ["Structured tasting entries", "Trend visibility", "Long-term memory reinforcement"]
  },
  {
    id: "social-learning",
    title: "Tasting Groups + Beverage News",
    track: "Sip Studios",
    image: "/academy/units/unit-05-grand-sommelier-arena.png",
    summary: "Collaborative practice and current beverage updates to keep learning connected and current.",
    bullets: ["Group workflows", "Knowledge exchange", "Industry signal tracking"]
  },
  {
    id: "ai-news",
    title: "Ai RnD News",
    track: "Ai RnD",
    image: "/academy/realms/realm-3-terroir-peaks.jpg",
    summary: "AI-focused stream for operators tracking model trends and applied tooling updates.",
    bullets: ["AI trend feed", "Operator context", "Applied innovation lens"]
  },
  {
    id: "somm-events",
    title: "Somm Support Events",
    track: "Somm Support",
    image: "/academy/realms/realm-5-grand-sommelier-arena.jpg",
    summary: "Event and support layer designed for hospitality teams and service communities.",
    bullets: ["Event visibility", "Support ecosystem", "Community-first programming"]
  },
  {
    id: "founding-cohort",
    title: "Founding Cohort Track",
    track: "Sip Studios",
    image: "/academy/welcome/welcome-group-photo.png",
    summary: "Structured 4-6 week execution sprint for serious learners and teams.",
    bullets: ["Weekly objectives", "Cohort accountability", "Direct founder feedback loop"]
  }
];

export function StarterFeatureDemo({ onFeatureNavigate, cardsAreLinks = true }: StarterFeatureDemoProps) {
  const routeForFeature = (id: string): string => {
    if (id === "founding-cohort") return "checkout";
    if (id === "flavor-tools") return "app/flavor-wheel";
    if (id === "social-learning") return "app/tasting-groups";
    return `app/${id}`;
  };

  return (
    <section className="starter-demo" aria-label="Starter page feature preview">
      <header className="starter-demo-header">
        <p className="starter-demo-kicker">Starter Preview</p>
        <h2>What Unlocks In Pro Workspace + Founding Cohort</h2>
        <p>Browse the live feature set below. Starter access is a preview only. Full modules unlock with paid access.</p>
      </header>

      <div className="starter-demo-grid">
        {starterPreviewFeatures.map((feature) => {
          const content = (
            <>
              <img src={feature.image} alt={`${feature.title} preview`} className="starter-demo-thumb" loading="lazy" />
              <div className="starter-demo-body">
                <p className="starter-demo-track">{feature.track}</p>
                <h3>{feature.title}</h3>
                <p>{feature.summary}</p>
                <ul>
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </>
          );

          if (!cardsAreLinks) {
            return (
              <article key={feature.id} className="starter-demo-card">
                {content}
              </article>
            );
          }

          return (
            <button
              key={feature.id}
              type="button"
              className="starter-demo-card starter-demo-card-btn"
              onClick={() => onFeatureNavigate?.(routeForFeature(feature.id))}
              aria-label={`Open ${feature.title}`}
            >
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}
