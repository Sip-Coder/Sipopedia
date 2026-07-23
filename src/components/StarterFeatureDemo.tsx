import { useEffect, useMemo, useState } from "react";
import { buildOnboardingRoute } from "../lib/onboardingIntent";
import {
  LAST_WORKSPACE_MODULE_EVENT,
  WORKSPACE_NAV_ITEMS,
  WORKSPACE_SECTIONS,
  readLastWorkspaceModule,
  type WorkspaceSectionId
} from "../lib/workspaceNavigation";
import {
  PAGE_STATUS_EVENT,
  configForRoute,
  readPageStatusMap,
  type PageStatusMap
} from "../lib/siteMap";

type StarterFeatureDemoProps = {
  onFeatureNavigate?: (route: string) => void;
  cardsAreLinks?: boolean;
  headingLevel?: 1 | 2;
  pageStatuses?: PageStatusMap;
  isAdmin?: boolean;
};

type CoreTrack = "Learn" | "Taste" | "Connect";

type DemoFeature = {
  id: string;
  route?: string;
  title: string;
  track: CoreTrack | "Enrollment";
  image: string;
  summary: string;
  bullets: string[];
  featuredPractice?: boolean;
};

type FeatureAccessState = {
  label: "Preview" | "Enrollment";
  detail: string;
};

const sectionTrack: Record<WorkspaceSectionId, CoreTrack> = {
  learn: "Learn",
  taste: "Taste",
  connect: "Connect"
};

const trackSection: Record<CoreTrack, WorkspaceSectionId> = {
  Learn: "learn",
  Taste: "taste",
  Connect: "connect"
};

const portalCopy: Record<CoreTrack, { code: string; title: string; headline: string; summary: string }> = {
  Learn: {
    code: "01",
    title: "Learn",
    headline: "Study routes with a map, not a maze.",
    summary: "Academy missions, game practice, terminology, maps, regions, ingredients, recipes, and resources."
  },
  Taste: {
    code: "02",
    title: "Taste",
    headline: "Turn sensory memory into service language.",
    summary: "Flavor calibration, tasting capture, and journal memory loops for sensory confidence."
  },
  Connect: {
    code: "03",
    title: "Connect",
    headline: "Keep study tied to the beverage world.",
    summary: "Industry radar, editorial context, cohorts, podcasts, AI feeds, and event pages."
  }
};

const portalOrder: CoreTrack[] = ["Learn", "Taste", "Connect"];

const foundingCohortFeature: DemoFeature = {
  id: "founding-cohort",
  title: "Founding Cohort Track",
  track: "Enrollment",
  image: "/starter-thumbs/founding-cohort-640.webp",
  summary: "Structured 4-6 week execution sprint for serious learners and teams.",
  bullets: ["Weekly objectives", "Cohort accountability", "Direct founder feedback loop"]
};

export const starterPreviewFeatures: DemoFeature[] = WORKSPACE_NAV_ITEMS.map((item) => ({
  id: item.id,
  route: item.route,
  title: item.label,
  track: sectionTrack[item.section],
  image: item.previewImage ?? `/starter-thumbs/${item.id}-640.webp`,
  summary: item.description,
  bullets: item.previewBullets,
  featuredPractice: item.featuredPractice
}));

function accessStateForFeature(feature: DemoFeature): FeatureAccessState {
  if (feature.track === "Enrollment") {
    return { label: "Enrollment", detail: "Application path" };
  }

  return { label: "Preview", detail: "Full room locked" };
}

function moduleSignal(moduleCount: number): string {
  return `${moduleCount} module${moduleCount === 1 ? "" : "s"}`;
}

function isFeaturePublishedForPreview(feature: DemoFeature, pageStatuses: PageStatusMap): boolean {
  if (!feature.route) return true;
  const config = configForRoute(feature.route, pageStatuses);
  return config.status === "public" && config.room !== "Boss";
}

export function StarterFeatureDemo({
  onFeatureNavigate,
  cardsAreLinks = true,
  headingLevel = 2,
  pageStatuses: providedPageStatuses,
  isAdmin = false
}: StarterFeatureDemoProps) {
  const [activeTrack, setActiveTrack] = useState<CoreTrack>("Learn");
  const [fallbackPageStatuses, setFallbackPageStatuses] = useState<PageStatusMap>(() => readPageStatusMap());
  const [lastWorkspaceModule, setLastWorkspaceModule] = useState(() => readLastWorkspaceModule());
  const pageStatuses = providedPageStatuses ?? fallbackPageStatuses;

  useEffect(() => {
    if (providedPageStatuses) return;
    const refreshStatuses = () => setFallbackPageStatuses(readPageStatusMap());
    window.addEventListener("storage", refreshStatuses);
    window.addEventListener(PAGE_STATUS_EVENT, refreshStatuses);
    return () => {
      window.removeEventListener("storage", refreshStatuses);
      window.removeEventListener(PAGE_STATUS_EVENT, refreshStatuses);
    };
  }, [providedPageStatuses]);

  useEffect(() => {
    const refreshLastModule = () => setLastWorkspaceModule(readLastWorkspaceModule());
    window.addEventListener("storage", refreshLastModule);
    window.addEventListener(LAST_WORKSPACE_MODULE_EVENT, refreshLastModule);
    return () => {
      window.removeEventListener("storage", refreshLastModule);
      window.removeEventListener(LAST_WORKSPACE_MODULE_EVENT, refreshLastModule);
    };
  }, []);

  const visibleFeatures = useMemo(
    () => starterPreviewFeatures.filter((feature) => isFeaturePublishedForPreview(feature, pageStatuses)),
    [pageStatuses]
  );
  const hiddenModuleCount = isAdmin ? starterPreviewFeatures.length - visibleFeatures.length : 0;
  const groupedFeatures = useMemo(
    () =>
      portalOrder.reduce<Record<CoreTrack, DemoFeature[]>>(
        (groups, track) => {
          groups[track] = visibleFeatures.filter((feature) => feature.track === track);
          return groups;
        },
        { Learn: [], Taste: [], Connect: [] }
      ),
    [visibleFeatures]
  );

  useEffect(() => {
    if (!lastWorkspaceModule) return;
    const lastFeature = visibleFeatures.find((feature) => feature.id === lastWorkspaceModule);
    if (lastFeature?.track && lastFeature.track !== "Enrollment") setActiveTrack(lastFeature.track);
  }, [lastWorkspaceModule, visibleFeatures]);

  const activeFeatures = groupedFeatures[activeTrack];
  const defaultFeatureId = WORKSPACE_SECTIONS.find((section) => section.id === trackSection[activeTrack])?.defaultPage;
  const continueFeature =
    activeFeatures.find((feature) => feature.id === lastWorkspaceModule) ??
    activeFeatures.find((feature) => feature.id === defaultFeatureId) ??
    activeFeatures[0];
  const practiceFeature = activeFeatures.find(
    (feature) => feature.featuredPractice && feature.id !== continueFeature?.id
  );
  const exploreFeatures = activeFeatures.filter(
    (feature) => feature.id !== continueFeature?.id && feature.id !== practiceFeature?.id
  );

  const routeForFeature = (feature: DemoFeature): string => {
    if (feature.id === "founding-cohort") {
      return buildOnboardingRoute("checkout", { planId: "founding", source: "starter-preview" });
    }
    return feature.route ?? `app/${feature.id}`;
  };
  const HeadingTag = headingLevel === 1 ? "h1" : "h2";
  const headerCopy = cardsAreLinks
    ? `Continue where you left off, complete one focused practice, or explore every published module.${
        hiddenModuleCount > 0 ? ` Student view shown; ${hiddenModuleCount} hidden module${hiddenModuleCount === 1 ? "" : "s"} remain available in the Boss Room.` : ""
      }`
    : "Scan the live route map below. Module counts and cards follow the current Boss Room publication settings.";

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
          sizes={
            variant === "spotlight"
              ? "(max-width: 960px) calc(100vw - 3rem), 640px"
              : "(max-width: 640px) calc(100vw - 3rem), (max-width: 960px) calc((100vw - 4rem) / 2), 350px"
          }
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
        onClick={() => onFeatureNavigate?.(routeForFeature(feature))}
        aria-label={`Open ${feature.title}`}
      >
        {content}
      </button>
    );
  };

  return (
    <section className="starter-demo starter-demo-portals" aria-label="Starter page feature preview">
      <header className="starter-demo-header">
        <p className="starter-demo-kicker">Launch Pad</p>
        <HeadingTag>Continue, Practice, Then Explore</HeadingTag>
        <p>{headerCopy}</p>
      </header>

      <div className="starter-portal-deck" role="tablist" aria-label="Workspace preview rooms">
        {portalOrder.map((track) => {
          const portal = portalCopy[track];
          const isActive = activeTrack === track;
          return (
            <button
              key={track}
              id={`starter-track-${track.toLowerCase()}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`starter-panel-${track.toLowerCase()}`}
              tabIndex={isActive ? 0 : -1}
              className={`starter-portal-button ${isActive ? "active" : ""}`}
              onClick={() => setActiveTrack(track)}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const currentIndex = portalOrder.indexOf(track);
                const nextIndex =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? portalOrder.length - 1
                      : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + portalOrder.length) % portalOrder.length;
                const nextTrack = portalOrder[nextIndex];
                setActiveTrack(nextTrack);
                window.setTimeout(() => document.getElementById(`starter-track-${nextTrack.toLowerCase()}`)?.focus(), 0);
              }}
            >
              <span>{portal.code}</span>
              <strong>{portal.title}</strong>
              <small>{moduleSignal(groupedFeatures[track].length)}</small>
              <b>Preview</b>
              <em>{portal.summary}</em>
            </button>
          );
        })}
      </div>

      <div
        id={`starter-panel-${activeTrack.toLowerCase()}`}
        className="starter-portal-stage"
        role="tabpanel"
        aria-labelledby={`starter-track-${activeTrack.toLowerCase()}`}
      >
        <div className="starter-portal-intro">
          <p className="starter-demo-kicker">Continue</p>
          <h3>{continueFeature ? `Pick up with ${continueFeature.title}` : `${portalCopy[activeTrack].title} is currently unavailable`}</h3>
          <p>
            {continueFeature
              ? `${portalCopy[activeTrack].headline} Return to the recommended starting point, then move into one focused practice.`
              : "No published modules are available in this room. Boss Room changes will update this view automatically."}
          </p>
        </div>
        {continueFeature ? <div className="starter-feature-spotlight">{renderFeatureCard(continueFeature, "spotlight")}</div> : null}

        {practiceFeature ? (
          <div className="starter-demo-cohort">
            <div>
              <p className="starter-demo-kicker">Today's Practice</p>
              <h3>Make one active learning move.</h3>
              <p>A focused recall, calibration, or applied-learning module keeps the visit useful without adding another decision layer.</p>
            </div>
            {renderFeatureCard(practiceFeature, "cohort")}
          </div>
        ) : null}

        {exploreFeatures.length ? (
          <>
            <div className="starter-portal-intro">
              <p className="starter-demo-kicker">Explore</p>
              <h3>Browse the rest of {portalCopy[activeTrack].title}</h3>
              <p>Every card below comes from the canonical workspace registry and respects the current publication settings.</p>
            </div>
            <div className="starter-demo-grid starter-demo-grid-compact">
              {exploreFeatures.map((feature) => renderFeatureCard(feature))}
            </div>
          </>
        ) : null}
      </div>

      <div className="starter-demo-cohort">
        <div>
          <p className="starter-demo-kicker">Enrollment Track</p>
          <h3>Need the structured path?</h3>
          <p>Founding Cohort remains available without competing with the three core study rooms.</p>
        </div>
        {renderFeatureCard(foundingCohortFeature, "cohort")}
      </div>
    </section>
  );
}
