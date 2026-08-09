import { useState } from "react";
import { CosmicSky } from "./CosmicSky";
import { buildOnboardingRoute } from "../lib/onboardingIntent";
import type { PageStatusMap } from "../lib/siteMap";

import welcomeToSipStudies from "../assets/brand/welcome-to-sip-studies.png";

type MarketingHomeProps = {
  onNavigate: (route: string) => void;
  pageStatuses: PageStatusMap;
  isAdmin: boolean;
};

type PreviewReel = {
  id: string;
  title: string;
  label: string;
  route: string;
  src: string;
  detail: string;
};

type PreviewAudience = {
  label: string;
  detail: string;
};

type PreviewReelGroup = {
  title: string;
  detail: string;
  reelIds: string[];
};

type PreviewRoom = {
  title: string;
  detail: string;
  route: string;
};

type ParallaxJourneyFrame = {
  id: string;
  label: string;
  title: string;
  detail: string;
  image: string;
};

const parallaxJourneyFrames: ParallaxJourneyFrame[] = [
  {
    id: "soil",
    label: "Soil",
    title: "Start below the surface.",
    detail: "Water, mineral texture, roots, and living ground set the first conditions.",
    image: "/beyond-the-glass/wine-rain-roots-1600.webp"
  },
  {
    id: "vine",
    label: "Vine",
    title: "The vine translates place.",
    detail: "Canopy, sunlight, slope, and timing shape the energy moving into fruit.",
    image: "/beyond-the-glass/wine-vineyard-growth-1600.webp"
  },
  {
    id: "grape",
    label: "Grape",
    title: "The grape carries the season.",
    detail: "Sugar, acid, tannin, aroma, and ripeness arrive together at harvest.",
    image: "/beyond-the-glass/wine-harvest-1600.webp"
  },
  {
    id: "wine",
    label: "Wine",
    title: "Fermentation turns fruit into memory.",
    detail: "Yeast, vessel, temperature, extraction, and patience begin the transformation.",
    image: "/beyond-the-glass/wine-fermentation-hall-1600.webp"
  },
  {
    id: "winery",
    label: "Winery",
    title: "The cellar gives the wine its frame.",
    detail: "Blending, aging, lab work, packaging, and service readiness bring the story into form.",
    image: "/beyond-the-glass/winery-tour/barrel-workbench-1600.webp"
  },
  {
    id: "tasting",
    label: "Tasting",
    title: "The experience lands in the glass.",
    detail: "Sight, aroma, texture, flavor, context, and conversation complete the journey.",
    image: "/beyond-the-glass/wine-first-sip-1600.webp"
  }
];

const learnPreviewReels: PreviewReel[] = [
  {
    id: "btg",
    title: "Beyond The Glass",
    label: "Cinematic journeys",
    route: "app/btg",
    src: "/home-preview/learn/01-beyond-the-glass.mp4",
    detail: "Interactive field-atlas scenes, guide notes, and story checkpoints."
  },
  {
    id: "sip-academy-map",
    title: "Sip Academy Map",
    label: "360 guild world",
    route: "app/sip-academy-map",
    src: "/home-preview/learn/02-sip-academy-map.mp4",
    detail: "Spin the globe, choose guilds, and jump into academy routes."
  },
  {
    id: "living-palate",
    title: "Living Palate",
    label: "Sensory academy",
    route: "app/living-palate",
    src: "/home-preview/learn/03-living-palate.mp4",
    detail: "Train flavor memory with guided sensory rooms."
  },
  {
    id: "sip-game",
    title: "Sip Game",
    label: "Practice room",
    route: "app/sip-game",
    src: "/home-preview/learn/04-sip-game.mp4",
    detail: "Move through production checkpoints and quick drills."
  },
  {
    id: "sipopedia",
    title: "Sipopedia",
    label: "Terms and citations",
    route: "app/sipopedia",
    src: "/home-preview/learn/05-sipopedia.mp4",
    detail: "Search terms, graphics, examples, and source notes."
  },
  {
    id: "maps",
    title: "Maps",
    label: "AI cartography",
    route: "app/maps",
    src: "/home-preview/learn/06-maps.mp4",
    detail: "Explore wine maps, overlays, and regional patterns."
  },
  {
    id: "regions",
    title: "Regions",
    label: "Global atlas",
    route: "app/regions",
    src: "/home-preview/learn/07-regions.mp4",
    detail: "Browse country and region study context."
  },
  {
    id: "grapes-grains",
    title: "Grapes & Grains",
    label: "Ingredients",
    route: "app/grapes",
    src: "/home-preview/learn/08-grapes-and-grains.mp4",
    detail: "Scan core grapes, grains, hops, and base ingredient families."
  },
  {
    id: "recipes",
    title: "Bev Recipes",
    label: "Cocktail maps",
    route: "app/recipes",
    src: "/home-preview/learn/09-bev-recipes.mp4",
    detail: "Swipe from formula families into classic builds."
  },
  {
    id: "resources",
    title: "Resources",
    label: "Reference lists",
    route: "app/resources",
    src: "/home-preview/learn/10-resources.mp4",
    detail: "Use quick lists for recall, service, and exam prep."
  }
];

const previewAudiences: PreviewAudience[] = [
  { label: "Curious beginners", detail: "Start without textbook intimidation." },
  { label: "Hospitality staff", detail: "Build confident guest language fast." },
  { label: "Certification prep", detail: "Support WSET, CMS, Cicerone, and BarSmarts-style study." },
  { label: "Visual learners", detail: "See systems before memorizing terms." }
];

const previewReelGroups: PreviewReelGroup[] = [
  {
    title: "See the system",
    detail: "Follow drinks from source to service with cinematic maps and field journeys.",
    reelIds: ["btg", "sip-academy-map", "maps", "regions"]
  },
  {
    title: "Practice the craft",
    detail: "Train sensory memory, service moves, game checkpoints, and recipe logic.",
    reelIds: ["living-palate", "sip-game", "recipes"]
  },
  {
    title: "Find the answer",
    detail: "Use terms, ingredients, and reference lists when you need a quick study anchor.",
    reelIds: ["sipopedia", "grapes-grains", "resources"]
  }
];

const previewRooms: PreviewRoom[] = [
  {
    title: "Learn",
    detail: "Academy, terms, maps, recipes, and guided study.",
    route: "app/launch"
  },
  {
    title: "Taste",
    detail: "Flavor memory, tasting capture, and calibration.",
    route: "app/flavor-wheel"
  },
  {
    title: "Connect",
    detail: "Industry radar, events, groups, and support.",
    route: "app/flavor-blog"
  }
];

export function MarketingHome({ onNavigate }: MarketingHomeProps) {
  const [activeReelId, setActiveReelId] = useState(learnPreviewReels[0].id);
  const activeReel = learnPreviewReels.find((reel) => reel.id === activeReelId) ?? learnPreviewReels[0];
  const startPreviewPastLoader = (video: HTMLVideoElement) => {
    if (video.duration > 2 && video.currentTime < 0.3) {
      video.currentTime = Math.min(Math.max(5.5, video.duration * 0.38), video.duration - 0.35);
    }

    void video.play().catch(() => undefined);
  };
  const scrollToPreviews = () => {
    document.getElementById("marketing-preview-reels")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="marketing-home marketing-home-preview">
      <div className="marketing-preview-hero">
        <CosmicSky className="hero-sky" />
        <div className="marketing-preview-hero-grid">
          <div className="marketing-preview-copy">
            <p className="marketing-kicker">Sip Studies</p>
            <h1>Learn drinks visually, from source to service.</h1>
            <p className="marketing-lead">
              Sipopedia turns wine, beer, spirits, coffee, tea, and more into moving maps, field notes, games, and guided
              tasting practice.
            </p>
            <div className="marketing-audience-chips" aria-label="Best fit customers">
              {previewAudiences.map((audience) => (
                <span key={audience.label} title={audience.detail}>{audience.label}</span>
              ))}
            </div>
            <div className="marketing-hero-actions">
              <button className="btn btn-primary" onClick={() => onNavigate(buildOnboardingRoute("pricing", { planId: "pro", source: "home-video-hero" }))}>
                Start for $10/month
              </button>
              <button className="btn btn-light" onClick={scrollToPreviews}>
                Watch previews
              </button>
            </div>
            <div className="marketing-trust-strip" aria-label="Membership trust signals">
              <span>Preview first</span>
              <span>Cancel anytime</span>
              <span>Works on phones</span>
              <span>Source-backed terms</span>
            </div>
          </div>

          <aside className="marketing-feature-player" aria-label={`${activeReel.title} preview video`}>
            <video
              key={activeReel.src}
              src={activeReel.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={welcomeToSipStudies}
              onLoadedMetadata={(event) => startPreviewPastLoader(event.currentTarget)}
            />
            <div className="marketing-feature-caption">
              <span>{activeReel.label}</span>
              <h2>{activeReel.title}</h2>
              <p>{activeReel.detail}</p>
            </div>
          </aside>
        </div>
      </div>

      <section className="marketing-parallax-story" aria-labelledby="soil-to-sip-title">
        <div className="marketing-parallax-intro">
          <p className="marketing-kicker">Soil To Sip</p>
          <h2 id="soil-to-sip-title">One scroll through the life of wine.</h2>
        </div>
        <div className="marketing-parallax-track">
          {parallaxJourneyFrames.map((frame, index) => (
            <article className={`marketing-parallax-step theme-${frame.id}`} key={frame.id}>
              <div className="marketing-parallax-canvas">
                <img src={frame.image} alt="" loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                <span className="marketing-parallax-depth depth-one" aria-hidden="true" />
                <span className="marketing-parallax-depth depth-two" aria-hidden="true" />
                <div className="marketing-parallax-card">
                  <span>{String(index + 1).padStart(2, "0")} · {frame.label}</span>
                  <h3>{frame.title}</h3>
                  <p>{frame.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-reel-wall" id="marketing-preview-reels" aria-label="Learn page preview reel">
        <div className="marketing-section-intro">
          <p className="marketing-kicker">Preview The Academy</p>
          <h2>Choose the outcome, then open the room.</h2>
        </div>
        <div className="marketing-reel-groups">
          {previewReelGroups.map((group) => (
            <section className="marketing-reel-group" key={group.title} aria-label={group.title}>
              <div className="marketing-reel-group-head">
                <h3>{group.title}</h3>
                <p>{group.detail}</p>
              </div>
              <div className="marketing-reel-grid">
                {group.reelIds.map((reelId) => {
                  const reel = learnPreviewReels.find((item) => item.id === reelId);
                  if (!reel) return null;

                  return (
                    <article
                      key={reel.id}
                      className={`marketing-reel-card ${activeReel.id === reel.id ? "active" : ""}`}
                    >
                      <video
                        src={reel.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        poster={welcomeToSipStudies}
                        onLoadedMetadata={(event) => startPreviewPastLoader(event.currentTarget)}
                      />
                      <div className="marketing-reel-card-copy">
                        <span>{reel.label}</span>
                        <strong>{reel.title}</strong>
                        <p>{reel.detail}</p>
                        <div className="marketing-reel-card-actions">
                          <button type="button" onClick={() => setActiveReelId(reel.id)} aria-pressed={activeReel.id === reel.id}>
                            Preview
                          </button>
                          <button type="button" onClick={() => onNavigate(reel.route)}>
                            Open
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="marketing-room-preview" aria-label="Sip Studies workspace rooms">
        <img src={welcomeToSipStudies} alt="Welcome to Sip Studies" decoding="async" />
        <div className="marketing-room-preview-copy">
          <p className="marketing-kicker">One Workspace</p>
          <h2>Three doors. One guided academy.</h2>
          <div className="marketing-room-preview-grid">
            {previewRooms.map((room) => (
              <button key={room.title} type="button" onClick={() => onNavigate(room.route)}>
                <span>{room.title}</span>
                <p>{room.detail}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
