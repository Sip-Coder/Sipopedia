import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { buildWinecastCutPack } from "../lib/mediaCutPack";
import { MediaCutPackPanel } from "./MediaCutPack";

type AiWinecastEpisode = {
  slug: string;
  sourcePath: string;
  title: string;
  episodeLabel: string;
  publishedAt: string;
  theme: string;
  summary: string;
  imageUrl: string;
  articleImages?: string[];
  youtubeUrl?: string;
  youtubeId?: string;
  learningPoints: string[];
  articleSections: {
    title: string;
    body: string;
  }[];
  keywords: string[];
};

type AiWinecastProps = {
  episodeSlug: string | null;
  onNavigate: (target: "ai-winecast" | `ai-winecast/${string}`) => void;
};

const PODCAST_BASE_URL = "https://www.sipstudies.com";
const AI_WINECAST_BG =
  "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/3d95071f-70ff-44b6-9e3c-ecb6e685f68e/Sip+Studies+-+Ai+Winecast+-+BG.png";
const AI_WINECAST_HEADER =
  "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/33c65a99-d787-4f19-a2c9-6a441e9d81c4/Sip+Studies+-+Ai+Winecast+-+Header+02.png";
const WINECAST_QUEUE_STORAGE_KEY = "sipStudies.aiWinecastQueue.v1";

const AI_WINECAST_EPISODES: AiWinecastEpisode[] = [
  {
    slug: "ai-winecast-ep-002",
    sourcePath: "/podcast/ai-winecast-ep-002",
    title: "Ai Winecast - 002 Cabernet Franc",
    episodeLabel: "Episode 002",
    publishedAt: "2025-07-23T21:56:00-07:00",
    theme: "Cabernet Franc",
    summary:
      "A focused study of Cabernet Franc as a historic Bordeaux parent grape, a blending partner, and a source of lifted red fruit, herbs, and structure.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/c3190f4e-539e-4c22-a84b-8424e088ca46/Ai+Winecast+-+002+Cabernet+Franc.jpg",
    youtubeUrl: "https://youtu.be/BobLilSXXgM",
    youtubeId: "BobLilSXXgM",
    learningPoints: [
      "Cabernet Franc's role in Bordeaux heritage and Loire identity.",
      "Herbal, floral, and red-fruited markers students should recognize.",
      "How site, ripeness, and blending context change the grape's expression.",
      "Why wine education and water access are linked in the Sip Studies mission."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This episode positions Cabernet Franc as a foundational grape for understanding Bordeaux family relationships. It emphasizes aromatic lift, herbaceous nuance, and the grape's ability to bring freshness and detail into blends."
      },
      {
        title: "Study Angle",
        body:
          "Students should connect Cabernet Franc to Merlot and Cabernet Sauvignon, then contrast Loire Valley varietal examples with Right Bank Bordeaux blending logic."
      },
      {
        title: "Sipopedia Lens",
        body:
          "Key terms to reinforce include parentage, pyrazine, ripeness, gravel, limestone, clay, blend architecture, and aromatic typicity."
      }
    ],
    keywords: ["Cabernet Franc", "Bordeaux", "Loire", "Blending", "Pyrazines"]
  },
  {
    slug: "ai-winecast-ep-001",
    sourcePath: "/podcast/ai-winecast-ep-001",
    title: "Ai Winecast - 001 Cabernet Sauvignon",
    episodeLabel: "Episode 001",
    publishedAt: "2025-07-21T21:18:00-07:00",
    theme: "Cabernet Sauvignon",
    summary:
      "A deep dive into Cabernet Sauvignon's origin, viticulture, thick skins, tannin structure, and iconic Bordeaux expression.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/12ed137e-e2bf-4948-b028-766aeac72ab4/Ai+Winecast+-+001.1+Cabernet.png",
    youtubeUrl: "https://youtu.be/yVHuAHuAAVE",
    youtubeId: "yVHuAHuAAVE",
    learningPoints: [
      "Cabernet Sauvignon as a natural cross of Cabernet Franc and Sauvignon Blanc.",
      "Why gravel, sun exposure, and drainage support classic Medoc expression.",
      "How thick skins contribute color, tannin, and age-worthiness.",
      "How the grape anchors Bordeaux blends and global benchmark styles."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This lesson frames Cabernet Sauvignon through its parentage, growing needs, and structural power. The episode uses Bordeaux as the anchor point for students learning why site and grape physiology matter."
      },
      {
        title: "Study Angle",
        body:
          "For certification theory, connect Cabernet Sauvignon to late ripening, small berries, high tannin, black fruit, oak compatibility, and long-lived wines."
      },
      {
        title: "Sipopedia Lens",
        body:
          "Terms worth reviewing include tannin, phenolics, gravel, drainage, left bank, varietal crossing, and ageability."
      }
    ],
    keywords: ["Cabernet Sauvignon", "Medoc", "Tannin", "Bordeaux", "Ageability"]
  },
  {
    slug: "ai-winecast-ep-000",
    sourcePath: "/podcast/ai-winecast-ep-000",
    title: "NEW AI Winecast 000: Our Mission & Philosophy",
    episodeLabel: "Episode 000",
    publishedAt: "2025-07-19T21:42:00-07:00",
    theme: "Mission and Philosophy",
    summary:
      "The launch episode introduces Sip Studies, Sippy, AI-assisted wine education, community impact, and the Learn, Engage, Teach model.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/a1cc2398-4f42-4db5-b82d-5a9e2c7497bf/Ai+Winecast+-+000+Philosophy.png",
    youtubeUrl: "https://youtu.be/Yaps0nSaeO0",
    youtubeId: "Yaps0nSaeO0",
    learningPoints: [
      "Why Sip Studies uses AI as a partner in beverage education.",
      "How Sippy fits into the podcast and classroom experience.",
      "How beverage learning connects to community, water access, and exploration.",
      "What future Winecast formats can cover across wine, beer, spirits, charity, tech, and travel."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "The pilot explains the broader philosophy behind Sip Studies: beverage education can be more accessible, visual, and mission-driven when human teaching is paired with careful AI production."
      },
      {
        title: "Study Angle",
        body:
          "This is less of a grape lesson and more of a course manifesto. It defines the tone for future episodes: approachable, visual, structured, and tied to practical learning outcomes."
      },
      {
        title: "Sipopedia Lens",
        body:
          "The episode maps naturally to terms such as AI-assisted learning, water accessibility, beverage education, community learning, and edutainment."
      }
    ],
    keywords: ["Sip Studies", "Sippy", "AI Education", "Water Access", "Edutainment"]
  },
  {
    slug: "ai-winecast-episode-005",
    sourcePath: "/podcast/ai-winecast-episode-005",
    title: "Tasting Winecast - Episode 005",
    episodeLabel: "Episode 005",
    publishedAt: "2025-07-16T12:00:00-07:00",
    theme: "Tasting Method",
    summary:
      "A tasting-focused entry in the Winecast archive, built as a bridge between visual wine education and structured sensory practice.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/456cfa94-5391-4f0a-a6ae-f2e3ce4ecafb/005+Tasting.png",
    articleImages: [
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/456cfa94-5391-4f0a-a6ae-f2e3ce4ecafb/005+Tasting.png"
    ],
    youtubeUrl: "https://youtu.be/ruR8eUMe1wI",
    youtubeId: "ruR8eUMe1wI",
    learningPoints: [
      "Use visual prompts to anchor tasting vocabulary.",
      "Connect observation, aroma, palate, and conclusion in a repeatable order.",
      "Treat tasting as a study discipline rather than a one-off impression."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This archived entry is carried into the new interface as a tasting-practice subpage. The content block is ready for future transcript, video, and study-card expansion."
      },
      {
        title: "Study Angle",
        body:
          "Students can use the page as a prompt to move from casual tasting notes toward disciplined grid-based analysis."
      }
    ],
    keywords: ["Tasting", "Sensory", "Grid", "Practice"]
  },
  {
    slug: "ai-winecast-episode-004",
    sourcePath: "/podcast/ai-winecast-episode-004",
    title: "Tasting Winecast - Episode 004",
    episodeLabel: "Episode 004",
    publishedAt: "2025-07-14T12:00:00-07:00",
    theme: "Tasting Drill",
    summary:
      "A tasting-practice archive page for reinforcing the rhythm of structured beverage observation and conclusion-building.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/ef942ae4-1e1d-4ac8-a90c-0de814e7c94e/004+Tasting.png",
    articleImages: [
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/ef942ae4-1e1d-4ac8-a90c-0de814e7c94e/004+Tasting.png"
    ],
    youtubeUrl: "https://youtu.be/8HAjXibHMEw",
    youtubeId: "8HAjXibHMEw",
    learningPoints: [
      "Build consistency by separating sight, smell, palate, and conclusion.",
      "Use repeated tasting drills to reduce guesswork.",
      "Connect sensory evidence to theory vocabulary."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This episode is represented as an archived tasting module in the new Winecast library, preserving the original listing while giving it a cleaner Sipopedia-style study frame."
      },
      {
        title: "Study Angle",
        body:
          "The subpage is prepared for future expansion into a complete tasting article with embedded prompts, terms, and media."
      }
    ],
    keywords: ["Tasting", "Observation", "Theory", "Practice"]
  },
  {
    slug: "ai-winecast-episode-003",
    sourcePath: "/podcast/ai-winecast-episode-003",
    title: "Ai Winecast - Episode 003",
    episodeLabel: "Episode 003",
    publishedAt: "2025-07-12T12:00:00-07:00",
    theme: "AI Wine Education",
    summary:
      "An archive entry for the early Ai Winecast series, focused on building AI-assisted beverage education into a repeatable learning format.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/7a2518fe-4db7-46cc-a859-f25c2ac2969f/003+Ai.png",
    articleImages: [
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/7a2518fe-4db7-46cc-a859-f25c2ac2969f/003+Ai.png"
    ],
    youtubeUrl: "https://youtu.be/ljqiSmosaEo",
    youtubeId: "ljqiSmosaEo",
    learningPoints: [
      "Use AI visuals as study aids, not source authorities.",
      "Turn podcast themes into reviewable vocabulary and theory prompts.",
      "Keep human teaching judgment in control of the learning pathway."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This episode sits in the development arc between the first AI podcast experiments and the Cabernet-focused curriculum entries."
      },
      {
        title: "Study Angle",
        body:
          "The page keeps the archive navigable while leaving room for a future transcript, source notes, and linked Sipopedia terms."
      }
    ],
    keywords: ["AI", "Wine Education", "Curriculum", "Archive"]
  },
  {
    slug: "ai-winecast-episode-002",
    sourcePath: "/podcast/ai-winecast-episode-002",
    title: "Ai Winecast - Episode 002",
    episodeLabel: "Archive 002",
    publishedAt: "2025-07-10T12:00:00-07:00",
    theme: "Podcast Archive",
    summary:
      "An early Winecast archive entry carried forward into the new Connect tab so the original podcast run remains discoverable.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/5304fe86-3ce1-49d5-9edf-f667f6405384/002+Ai.png",
    articleImages: [
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/5304fe86-3ce1-49d5-9edf-f667f6405384/002+Ai.png"
    ],
    youtubeUrl: "https://youtu.be/FGLCRI9vqOc",
    youtubeId: "FGLCRI9vqOc",
    learningPoints: [
      "Preserve the original publication sequence.",
      "Create a home for future transcript and article migration.",
      "Keep the archive connected to the broader Sip Studies learning map."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This page acts as a structured placeholder for the original episode, using the new AI Winecast UI to make older entries easier to browse."
      }
    ],
    keywords: ["Archive", "Podcast", "Winecast"]
  },
  {
    slug: "ai-winecast-episode-001",
    sourcePath: "/podcast/ai-winecast-episode-001",
    title: "Tasting Winecast - Episode 001",
    episodeLabel: "Archive 001",
    publishedAt: "2025-02-16T12:00:00-08:00",
    theme: "Original Tasting Launch",
    summary:
      "The earliest listed Tasting Winecast entry, retained as part of the podcast lineage before the newer AI-led Winecast format.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/e0ee5631-f7cd-4ecd-823e-2d8111680f1a/001+Tasting.png",
    articleImages: [
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/e0ee5631-f7cd-4ecd-823e-2d8111680f1a/001+Tasting.png"
    ],
    youtubeUrl: "https://youtu.be/84vIEWQSyhE",
    youtubeId: "84vIEWQSyhE",
    learningPoints: [
      "Track the evolution from tasting podcast to AI-assisted curriculum.",
      "Keep early media visible for students exploring the full archive.",
      "Provide a stable page for future article expansion."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This archived subpage preserves the original Winecast starting point and gives it the same study-card treatment as the newer entries."
      }
    ],
    keywords: ["Archive", "Tasting", "Launch"]
  },
  {
    slug: "ai-podcast",
    sourcePath: "/podcast/ai-podcast",
    title: "AI Winecast",
    episodeLabel: "Original Page",
    publishedAt: "2025-02-16T12:00:00-08:00",
    theme: "Concept Introduction",
    summary:
      "A concept article introducing AI Winecast as a place to experiment safely with AI, community tools, and deeper beverage learning.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1739699690598-Z02OJTE5Y2W6K304C8SC/Sip+Studies+Logo+02.png",
    articleImages: [
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1739699172377-X0JXDLVBZ6IB7MZRE26U/4UmVbhNefeZsUSqFJXtFn19CAaXbdu7b2G-d-M9Ta2Q%3D_plaintext_638327585535756797.jpg",
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1739699172466-542VE6SAHGN7I679VKQV/5b4wCQhMxREsfILCLvIoP7gbvv2JNBpMnHqKn9pSst0%3D_plaintext_638327585283218929.jpg",
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1739699173512-PF3W0UPDFGZ4E0R97JWM/8p5Ov9-GFE4TUFruSom3_gJRajcooy1NNMie2XV_YPc%3D_plaintext_638327585323801011.jpg",
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1739699173691-7H0KQEMF2PK5BZJGJ6M5/-AU4lfix34YCz3BDVjDjlkRSZNVyWzCoXt-Ob6y8eNE%3D_plaintext_638327585529310421.jpg",
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1739699174610-0OD6000KC6ML40MTQQQ3/Buzdwyx5SBcJ8vd9Rh4NnQAdYieirgP4jOhwGBVA5Kk%3D_plaintext_638327585421292769.jpg",
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1739699175094-INFAACW01QERE7C358RI/DXYzWDOUMx6VvtY9OXQ02WCffViBsQGTz19eQvIJ_zs%3D_plaintext_638327585457110625.jpg"
    ],
    learningPoints: [
      "AI is treated as an experimental learning partner.",
      "The project aims to build community tools for deeper beverage study.",
      "Future expansion can connect podcast, encyclopedia, and tasting systems."
    ],
    articleSections: [
      {
        title: "Episode Focus",
        body:
          "This origin page frames the Winecast project as an AI learning experiment and a long-term platform for beverage education."
      },
      {
        title: "Study Angle",
        body:
          "The article belongs in the library because it explains why the podcast exists before the numbered learning episodes begin."
      }
    ],
    keywords: ["AI Podcast", "Community Tools", "Beverage Study"]
  }
];

function formatEpisodeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function sourceUrl(episode: AiWinecastEpisode) {
  return `${PODCAST_BASE_URL}${episode.sourcePath}`;
}

function readWinecastQueue(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WINECAST_QUEUE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((slug): slug is string => typeof slug === "string");
  } catch {
    return [];
  }
}

function writeWinecastQueue(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WINECAST_QUEUE_STORAGE_KEY, JSON.stringify(slugs));
}

export function AiWinecast({ episodeSlug, onNavigate }: AiWinecastProps) {
  const activeEpisode = useMemo(
    () => AI_WINECAST_EPISODES.find((episode) => episode.slug === episodeSlug) ?? null,
    [episodeSlug]
  );
  const activeCutPack = useMemo(() => (activeEpisode ? buildWinecastCutPack(activeEpisode) : null), [activeEpisode]);
  const [savedEpisodeSlugs, setSavedEpisodeSlugs] = useState<string[]>([]);
  const swipeStartXRef = useRef<number | null>(null);
  const swipeStartYRef = useRef<number | null>(null);
  const validSavedEpisodeSlugs = useMemo(
    () => savedEpisodeSlugs.filter((slug) => AI_WINECAST_EPISODES.some((episode) => episode.slug === slug)),
    [savedEpisodeSlugs]
  );
  const savedEpisodes = useMemo(
    () => validSavedEpisodeSlugs.map((slug) => AI_WINECAST_EPISODES.find((episode) => episode.slug === slug)).filter((episode): episode is AiWinecastEpisode => Boolean(episode)),
    [validSavedEpisodeSlugs]
  );
  const queueEpisodes = savedEpisodes.length > 0 ? savedEpisodes : AI_WINECAST_EPISODES.slice(0, 4);

  useEffect(() => {
    setSavedEpisodeSlugs(readWinecastQueue());
  }, []);

  const toggleQueueEpisode = useCallback((slug: string) => {
    setSavedEpisodeSlugs((current) => {
      const cleanCurrent = current.filter((currentSlug) => AI_WINECAST_EPISODES.some((episode) => episode.slug === currentSlug));
      const next = cleanCurrent.includes(slug)
        ? cleanCurrent.filter((currentSlug) => currentSlug !== slug)
        : [slug, ...cleanCurrent].slice(0, 12);
      writeWinecastQueue(next);
      return next;
    });
  }, []);

  const clearQueue = useCallback(() => {
    writeWinecastQueue([]);
    setSavedEpisodeSlugs([]);
  }, []);

  const navigateEpisode = useCallback(
    (direction: 1 | -1) => {
      if (!activeEpisode) return;
      const currentIndex = AI_WINECAST_EPISODES.findIndex((episode) => episode.slug === activeEpisode.slug);
      if (currentIndex === -1) return;
      const nextIndex = (currentIndex + direction + AI_WINECAST_EPISODES.length) % AI_WINECAST_EPISODES.length;
      onNavigate(`ai-winecast/${AI_WINECAST_EPISODES[nextIndex].slug}`);
    },
    [activeEpisode, onNavigate]
  );

  useEffect(() => {
    if (!activeEpisode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onNavigate("ai-winecast");
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateEpisode(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateEpisode(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeEpisode, navigateEpisode, onNavigate]);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    swipeStartXRef.current = touch.clientX;
    swipeStartYRef.current = touch.clientY;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (!activeEpisode || swipeStartXRef.current === null || swipeStartYRef.current === null) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - swipeStartXRef.current;
    const deltaY = touch.clientY - swipeStartYRef.current;
    swipeStartXRef.current = null;
    swipeStartYRef.current = null;
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;
    navigateEpisode(deltaX < 0 ? 1 : -1);
  };

  if (activeEpisode) {
    const isActiveEpisodeSaved = validSavedEpisodeSlugs.includes(activeEpisode.slug);
    return (
      <section className="page ai-winecast ai-winecast-detail" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="ai-winecast-detail-nav">
          <button type="button" className="btn btn-light" onClick={() => onNavigate("ai-winecast")}>
            Back to Ai Winecast
          </button>
          <div className="ai-winecast-detail-arrows" aria-label="Episode keyboard navigation">
            <button type="button" className="btn btn-light" onClick={() => navigateEpisode(-1)}>
              Previous
            </button>
            <button type="button" className="btn btn-light" onClick={() => navigateEpisode(1)}>
              Next
            </button>
            <button type="button" className="btn btn-light" onClick={() => toggleQueueEpisode(activeEpisode.slug)}>
              {isActiveEpisodeSaved ? "Remove from Queue" : "Save to Queue"}
            </button>
          </div>
        </div>

        <article className="ai-winecast-article">
          <div className="ai-winecast-article-copy">
            <p className="ai-winecast-kicker">Sipopedia Dispatch</p>
            <h1>{activeEpisode.title}</h1>
            <p className="ai-winecast-summary">{activeEpisode.summary}</p>
            <div className="ai-winecast-meta-row">
              <span>{activeEpisode.episodeLabel}</span>
              <span>{formatEpisodeDate(activeEpisode.publishedAt)}</span>
              <span>{activeEpisode.theme}</span>
            </div>
          </div>
          <figure className="ai-winecast-article-media">
            <img src={activeEpisode.imageUrl} alt={`${activeEpisode.title} artwork`} loading="lazy" decoding="async" />
          </figure>
        </article>

        {activeEpisode.youtubeId ? (
          <div className="ai-winecast-video-shell">
            <iframe
              src={`https://www.youtube.com/embed/${activeEpisode.youtubeId}`}
              title={`${activeEpisode.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : null}

        {activeCutPack ? <MediaCutPackPanel pack={activeCutPack} className="ai-winecast-cut-pack" /> : null}

        {activeCutPack ? (
          <section className="ai-winecast-transcript-archive" aria-labelledby="winecast-transcript-title">
            <div>
              <p className="ai-winecast-card-label">Transcript Archive</p>
              <h2 id="winecast-transcript-title">Episode handoff for clips, captions, and study notes.</h2>
              <p>
                This archive block keeps the learning script visible next to the episode so a viewer can turn one watch session into a repeatable study or creator asset.
              </p>
            </div>
            <ol>
              {activeCutPack.transcriptSeed.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <div className="ai-winecast-meta-row">
              <span>{activeCutPack.runtime}</span>
              <span>Caption ready</span>
              <span>Source linked</span>
            </div>
          </section>
        ) : null}

        <section className="ai-winecast-study-grid" aria-label="Episode study notes">
          <article className="ai-winecast-term-card">
            <p className="ai-winecast-card-label">Study Targets</p>
            <ul>
              {activeEpisode.learningPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
          <article className="ai-winecast-term-card">
            <p className="ai-winecast-card-label">Keyword Stack</p>
            <div className="ai-winecast-keywords">
              {activeEpisode.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="ai-winecast-article-sections" aria-label="Episode article sections">
          {activeEpisode.articleSections.map((section) => (
            <article key={section.title} className="ai-winecast-article-section">
              <p className="ai-winecast-card-label">{section.title}</p>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        <div className="ai-winecast-source-strip">
          <span>Source page scraped from SipStudies.com podcast archive.</span>
          <a href={sourceUrl(activeEpisode)} target="_blank" rel="noreferrer">
            Open Original
          </a>
          {activeEpisode.youtubeUrl ? (
            <a href={activeEpisode.youtubeUrl} target="_blank" rel="noreferrer">
              Watch on YouTube
            </a>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="page ai-winecast">
      <header className="ai-winecast-hero">
        <div className="ai-winecast-hero-copy">
          <p className="ai-winecast-kicker">Sip Studios Connect</p>
          <h1>Ai Winecast</h1>
          <p>
            A rebuilt podcast library for Sip Studies wine education, using the original SipStudies.com podcast archive as source material and the
            Sipopedia study-card aesthetic for navigation.
          </p>
          <div className="ai-winecast-meta-row">
            <span>{AI_WINECAST_EPISODES.length} scraped entries</span>
            <span>Podcast + article pages</span>
            <span>AI wine education</span>
          </div>
        </div>
        <div className="ai-winecast-hero-media">
          <img src={AI_WINECAST_HEADER} alt="Ai Winecast header artwork" loading="lazy" decoding="async" />
        </div>
      </header>

      <section className="ai-winecast-feature">
        <img src={AI_WINECAST_BG} alt="Ai Winecast background artwork" loading="lazy" decoding="async" />
        <div>
          <p className="ai-winecast-card-label">Archive Method</p>
          <h2>Podcast layout rebuilt as a study library.</h2>
          <p>
            Each episode becomes a card, a detail page, and an article-style study note. Scraped titles, dates, source links, images, and available
            YouTube embeds are preserved; long body copy is rewritten as original Sip Studies learning summaries.
          </p>
        </div>
      </section>

      <section className="ai-winecast-watch-queue" aria-labelledby="winecast-watch-queue-title">
        <div className="ai-winecast-watch-copy">
          <p className="ai-winecast-card-label">Watch Queue</p>
          <h2 id="winecast-watch-queue-title">Turn episodes into a bingeable study sequence.</h2>
          <p>
            Save episodes locally, start from the next queued lesson, and keep a short transcript-ready sequence beside the archive instead of making students browse one card at a time.
          </p>
          <div className="ai-winecast-meta-row">
            <span>{savedEpisodes.length > 0 ? `${savedEpisodes.length} saved` : "Starter queue"}</span>
            <span>{AI_WINECAST_EPISODES.filter((episode) => episode.youtubeId).length} videos linked</span>
            <span>Local device queue</span>
          </div>
          <div className="ai-winecast-queue-actions">
            <button type="button" className="btn btn-primary" onClick={() => onNavigate(`ai-winecast/${queueEpisodes[0].slug}`)}>
              Start Queue
            </button>
            {savedEpisodes.length > 0 ? (
              <button type="button" className="btn btn-light" onClick={clearQueue}>
                Clear Saved
              </button>
            ) : null}
          </div>
        </div>
        <div className="ai-winecast-queue-list" role="list">
          {queueEpisodes.map((episode, index) => {
            const isSaved = validSavedEpisodeSlugs.includes(episode.slug);
            return (
              <article key={episode.slug} className="ai-winecast-queue-item" role="listitem">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{episode.theme}</strong>
                  <p>{episode.episodeLabel} - {formatEpisodeDate(episode.publishedAt)}</p>
                </div>
                <div>
                  <button type="button" onClick={() => onNavigate(`ai-winecast/${episode.slug}`)}>
                    Open
                  </button>
                  <button type="button" onClick={() => toggleQueueEpisode(episode.slug)}>
                    {isSaved ? "Remove" : "Save"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ai-winecast-grid" aria-label="Ai Winecast episodes">
        {AI_WINECAST_EPISODES.map((episode) => (
          <article key={episode.slug} className="ai-winecast-card">
            <button type="button" className="ai-winecast-card-media" onClick={() => onNavigate(`ai-winecast/${episode.slug}`)}>
              <img src={episode.imageUrl} alt={`${episode.title} artwork`} loading="lazy" decoding="async" />
              <span>{episode.episodeLabel}</span>
            </button>
            <div className="ai-winecast-card-body">
              <p className="ai-winecast-card-label">{formatEpisodeDate(episode.publishedAt)}</p>
              <h3>{episode.title}</h3>
              <p>{episode.summary}</p>
              <div className="ai-winecast-card-actions">
                <button type="button" className="btn btn-primary" onClick={() => onNavigate(`ai-winecast/${episode.slug}`)}>
                  Open Episode
                </button>
                <button type="button" className="btn btn-light" onClick={() => toggleQueueEpisode(episode.slug)}>
                  {validSavedEpisodeSlugs.includes(episode.slug) ? "Saved" : "Save"}
                </button>
                <a className="btn btn-light" href={sourceUrl(episode)} target="_blank" rel="noreferrer">
                  Source
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
