import { useEffect, useMemo, useState } from "react";
import { fetchGuildNews, type NewsRouterSource } from "../lib/newsRouter";

type SourceLoadMode = "loaded" | "fallback" | "seeded" | "failed";
type SourceCategory = "AI Labs" | "Hardware News" | "Media & Podcasts" | "Research";
type FilterPreset = "all-news" | "all-labs" | "all-hardware" | "all-media" | "all-research" | "custom";
type NewsPageSize = 12 | 24 | 48 | 120;

type NewsSource = {
  id: string;
  name: string;
  category: SourceCategory;
  homepage: string;
  edgeSource?: NewsRouterSource;
  feedUrl?: string;
  scrapeLinkPattern?: RegExp;
};

type RssJsonItem = {
  guid: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  thumbnail?: string;
  enclosure?: {
    link?: string;
    type?: string;
  };
};

type RssJsonResponse = {
  status: string;
  items?: RssJsonItem[];
  message?: string;
};

type AiArticle = {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceCategory: SourceCategory;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
  translatedFrom?: string;
};

type SourceLoadResult = {
  sourceId: string;
  mode: SourceLoadMode;
  articles: AiArticle[];
  error?: string;
};

type FilterState = {
  preset: FilterPreset;
  selectedLabIds: string[];
  selectedHardwareIds: string[];
  selectedMediaIds: string[];
  selectedResearchIds: string[];
};

const MAX_ITEMS_PER_SOURCE = 8;
const MAX_SUMMARY_LENGTH = 220;
const PAGE_SIZE_OPTIONS: NewsPageSize[] = [12, 24, 48, 120];
const MAX_NEWS_PAGE_COUNT = 5;

const ALL_NEWS_PRESET: FilterPreset = "all-news";
const ALL_LABS_PRESET: FilterPreset = "all-labs";
const ALL_HARDWARE_PRESET: FilterPreset = "all-hardware";
const ALL_MEDIA_PRESET: FilterPreset = "all-media";
const ALL_RESEARCH_PRESET: FilterPreset = "all-research";

const SOURCES: NewsSource[] = [
  {
    id: "openai",
    name: "OpenAI",
    category: "AI Labs",
    homepage: "https://openai.com/news/",
    edgeSource: "openai-news",
    feedUrl: "https://openai.com/news/rss.xml",
    scrapeLinkPattern: /openai\.com\/news\/(?!$|\?)/i
  },
  {
    id: "deepmind",
    name: "Google DeepMind",
    category: "AI Labs",
    homepage: "https://deepmind.google/blog/",
    edgeSource: "deepmind-news",
    feedUrl: "https://deepmind.google/blog/rss.xml",
    scrapeLinkPattern: /deepmind\.google\/blog\/(?!$|\?)/i
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "AI Labs",
    homepage: "https://www.anthropic.com/news",
    edgeSource: "anthropic-news",
    scrapeLinkPattern: /anthropic\.com\/news\/(?!$|\?)/i
  },
  {
    id: "xai",
    name: "xAI",
    category: "AI Labs",
    homepage: "https://x.ai/news",
    edgeSource: "xai-news",
    scrapeLinkPattern: /x\.ai\/news\/(?!$|\?)/i
  },
  {
    id: "microsoft-ai",
    name: "Microsoft AI Blog",
    category: "AI Labs",
    homepage: "https://www.microsoft.com/en-us/ai/blog/",
    edgeSource: "microsoft-ai-news",
    feedUrl: "https://www.microsoft.com/en-us/ai/blog/feed/",
    scrapeLinkPattern: /microsoft\.com\/en-us\/ai\/blog\/(?!$|\?)/i
  },
  {
    id: "nvidia",
    name: "NVIDIA Newsroom",
    category: "Hardware News",
    homepage: "https://nvidianews.nvidia.com/",
    edgeSource: "nvidia-news",
    scrapeLinkPattern: /nvidianews\.nvidia\.com\/news\/[^?#]+/i
  },
  {
    id: "amd",
    name: "AMD Newsroom",
    category: "Hardware News",
    homepage: "https://www.amd.com/en/newsroom.html",
    edgeSource: "amd-news",
    scrapeLinkPattern: /amd\.com\/en\/newsroom\/[^?#]+/i
  },
  {
    id: "ai-daily-brief",
    name: "AI Daily Brief",
    category: "Media & Podcasts",
    homepage: "https://aidailybrief.ai/episodes",
    edgeSource: "ai-daily-brief",
    scrapeLinkPattern: /aidailybrief\.ai\/episodes\/[^?#]+/i
  },
  {
    id: "venturebeat-ai",
    name: "VentureBeat AI",
    category: "Media & Podcasts",
    homepage: "https://venturebeat.com/ai",
    edgeSource: "venturebeat-ai-news",
    feedUrl: "https://venturebeat.com/category/ai/feed/",
    scrapeLinkPattern: /venturebeat\.com\/(?:ai|category\/ai)\/[^?#]+/i
  },
  {
    id: "the-verge-ai",
    name: "The Verge AI",
    category: "Media & Podcasts",
    homepage: "https://www.theverge.com/ai-artificial-intelligence",
    edgeSource: "verge-ai-news",
    feedUrl: "https://www.theverge.com/rss/ai/index.xml",
    scrapeLinkPattern: /theverge\.com\/\d{4}\/\d{1,2}\/\d{1,2}\/[^?#]+/i
  },
  {
    id: "lex-fridman",
    name: "Lex Fridman Podcast",
    category: "Media & Podcasts",
    homepage: "https://lexfridman.com/podcast/",
    edgeSource: "lex-fridman-ai-tech",
    feedUrl: "https://lexfridman.com/feed/podcast/",
    scrapeLinkPattern: /lexfridman\.com\/(?:podcast|category\/ai|tag\/ai)\/[^?#]+/i
  },
  {
    id: "mit-tech-review-ai",
    name: "MIT Technology Review AI",
    category: "Research",
    homepage: "https://www.technologyreview.com/topic/artificial-intelligence/",
    edgeSource: "mit-tech-review-ai-news",
    scrapeLinkPattern: /technologyreview\.com\/\d{4}\/\d{2}\/\d{2}\/[^?#]+/i
  },
  {
    id: "caltech-ai-news",
    name: "Caltech AI + Advanced Computing",
    category: "Research",
    homepage:
      "https://www.caltech.edu/about/news?ordering=date&search=&category=research+news&tag=AI+%26+advanced+computing&year=&submit=Search",
    edgeSource: "caltech-ai-news",
    scrapeLinkPattern: /caltech\.edu\/about\/news\/[^?#]+/i
  }
];

const SEEDED_SOURCE_ARTICLES: Record<
  string,
  Array<{ title: string; url: string; summary: string }>
> = {
  openai: [
    {
      title: "OpenAI News - Latest Announcements",
      url: "https://openai.com/news/",
      summary: "Latest product, research, and policy updates from OpenAI."
    },
    {
      title: "OpenAI News - Research Updates",
      url: "https://openai.com/news/#research",
      summary: "Research-focused updates and technical progress from OpenAI."
    },
    {
      title: "OpenAI News - Product Launches",
      url: "https://openai.com/news/#products",
      summary: "Recent product and platform releases from OpenAI."
    }
  ],
  deepmind: [
    {
      title: "Google DeepMind Blog - Latest",
      url: "https://deepmind.google/blog/",
      summary: "Frontier model, research, and applied AI updates from DeepMind."
    },
    {
      title: "Google DeepMind Blog - Research",
      url: "https://deepmind.google/blog/#research",
      summary: "Research stories and scientific progress from DeepMind teams."
    },
    {
      title: "Google DeepMind Blog - Product",
      url: "https://deepmind.google/blog/#product",
      summary: "Applied product updates and AI deployment stories."
    }
  ],
  anthropic: [
    {
      title: "Anthropic News - Latest",
      url: "https://www.anthropic.com/news",
      summary: "Latest announcements, releases, and safety updates from Anthropic."
    },
    {
      title: "Anthropic News - Product Updates",
      url: "https://www.anthropic.com/news#product",
      summary: "Product and platform announcements from Anthropic."
    },
    {
      title: "Anthropic News - Research & Safety",
      url: "https://www.anthropic.com/news#research",
      summary: "Research and safety milestones from Anthropic teams."
    }
  ],
  xai: [
    {
      title: "xAI News - Latest",
      url: "https://x.ai/news",
      summary: "Latest company, model, and ecosystem updates from xAI."
    },
    {
      title: "xAI News - Releases",
      url: "https://x.ai/news#releases",
      summary: "Model and product release highlights from xAI."
    },
    {
      title: "xAI News - Research",
      url: "https://x.ai/news#research",
      summary: "Technical and research notes from xAI."
    }
  ],
  "microsoft-ai": [
    {
      title: "Microsoft AI Blog - Latest",
      url: "https://www.microsoft.com/en-us/ai/blog/",
      summary: "AI product, platform, and enterprise updates from Microsoft."
    },
    {
      title: "Microsoft AI Blog - Product Stories",
      url: "https://www.microsoft.com/en-us/ai/blog/#product",
      summary: "Applied AI product stories and customer use cases."
    },
    {
      title: "Microsoft AI Blog - Research",
      url: "https://www.microsoft.com/en-us/ai/blog/#research",
      summary: "AI research and engineering updates from Microsoft teams."
    }
  ],
  nvidia: [
    {
      title: "NVIDIA Newsroom - Latest",
      url: "https://nvidianews.nvidia.com/",
      summary: "Latest AI and accelerated computing announcements from NVIDIA."
    },
    {
      title: "NVIDIA Newsroom - AI",
      url: "https://nvidianews.nvidia.com/news#ai",
      summary: "AI-specific announcements and ecosystem updates."
    },
    {
      title: "NVIDIA Newsroom - Platform",
      url: "https://nvidianews.nvidia.com/news#platform",
      summary: "Platform and infrastructure release highlights."
    }
  ],
  amd: [
    {
      title: "AMD Newsroom - Latest",
      url: "https://www.amd.com/en/newsroom.html",
      summary: "Latest AMD announcements across AI, compute, and platform."
    },
    {
      title: "AMD Newsroom - AI",
      url: "https://www.amd.com/en/newsroom.html#ai",
      summary: "AI and accelerator-focused updates from AMD."
    },
    {
      title: "AMD Newsroom - Product",
      url: "https://www.amd.com/en/newsroom.html#products",
      summary: "Product release highlights and roadmap updates from AMD."
    }
  ],
  "ai-daily-brief": [
    {
      title: "AI Daily Brief - Latest Episodes",
      url: "https://aidailybrief.ai/episodes",
      summary: "Latest AI Daily Brief episodes and summaries."
    },
    {
      title: "AI Daily Brief - Top Episodes",
      url: "https://aidailybrief.ai/episodes#top",
      summary: "Top episode picks on AI trends, tools, and policy."
    },
    {
      title: "AI Daily Brief - Archives",
      url: "https://aidailybrief.ai/episodes#archive",
      summary: "Episode archive for AI Daily Brief."
    }
  ],
  "venturebeat-ai": [
    {
      title: "VentureBeat AI - Latest",
      url: "https://venturebeat.com/ai",
      summary: "Latest AI headlines from VentureBeat."
    },
    {
      title: "VentureBeat AI - Enterprise",
      url: "https://venturebeat.com/ai#enterprise",
      summary: "Enterprise AI coverage and analysis from VentureBeat."
    },
    {
      title: "VentureBeat AI - Startups",
      url: "https://venturebeat.com/ai#startups",
      summary: "Startup and funding updates in AI."
    }
  ],
  "the-verge-ai": [
    {
      title: "The Verge AI - Latest",
      url: "https://www.theverge.com/ai-artificial-intelligence",
      summary: "Latest AI and platform stories from The Verge."
    },
    {
      title: "The Verge AI - Policy",
      url: "https://www.theverge.com/ai-artificial-intelligence#policy",
      summary: "Policy and regulation stories related to AI."
    },
    {
      title: "The Verge AI - Product",
      url: "https://www.theverge.com/ai-artificial-intelligence#product",
      summary: "Consumer and platform product updates in AI."
    }
  ],
  "lex-fridman": [
    {
      title: "Lex Fridman Podcast - AI Episodes",
      url: "https://lexfridman.com/podcast/",
      summary: "Podcast episodes focused on AI and technology topics."
    },
    {
      title: "Lex Fridman Podcast - Technology Guests",
      url: "https://lexfridman.com/podcast/#technology",
      summary: "Technology-focused episodes and guest conversations."
    },
    {
      title: "Lex Fridman Podcast - Research Conversations",
      url: "https://lexfridman.com/podcast/#research",
      summary: "Research and engineering interview highlights."
    }
  ],
  "mit-tech-review-ai": [
    {
      title: "MIT Technology Review - AI Topic",
      url: "https://www.technologyreview.com/topic/artificial-intelligence/",
      summary: "Latest AI reporting and analysis from MIT Technology Review."
    },
    {
      title: "MIT Technology Review - AI Research",
      url: "https://www.technologyreview.com/topic/artificial-intelligence/#research",
      summary: "AI research stories and technical explainers."
    },
    {
      title: "MIT Technology Review - AI Industry",
      url: "https://www.technologyreview.com/topic/artificial-intelligence/#industry",
      summary: "Industry and product stories in artificial intelligence."
    }
  ],
  "caltech-ai-news": [
    {
      title: "Caltech News - AI & Advanced Computing",
      url: "https://www.caltech.edu/about/news?ordering=date&search=&category=research+news&tag=AI+%26+advanced+computing&year=&submit=Search",
      summary: "Latest Caltech research news in AI and advanced computing."
    },
    {
      title: "Caltech News - Research Highlights",
      url: "https://www.caltech.edu/about/news",
      summary: "Research highlights from Caltech news."
    },
    {
      title: "Caltech News - AI Tag",
      url: "https://www.caltech.edu/about/news?tag=AI+%26+advanced+computing",
      summary: "Caltech AI-tagged research and discovery updates."
    }
  ]
};

const LEX_AI_TECH_PATTERN =
  /\b(ai|artificial intelligence|technology|tech|machine learning|deep learning|neural|robotics|computer vision|llm|model)\b/i;

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function trimSummary(input: string): string {
  if (input.length <= MAX_SUMMARY_LENGTH) return input;
  return `${input.slice(0, MAX_SUMMARY_LENGTH - 1).trim()}...`;
}

function parseDateOrNow(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

function formatDate(isoText: string) {
  const parsed = new Date(isoText);
  if (Number.isNaN(parsed.getTime())) return isoText;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function normalizeText(input: string): string {
  return stripHtml(input).trim();
}

function toNewsScreenshotUrl(targetUrl: string | undefined): string | undefined {
  if (!targetUrl) return undefined;
  try {
    const parsed = new URL(targetUrl);
    const canonicalTarget = `${parsed.origin}${parsed.pathname}`;
    return `https://image.thum.io/get/width/1200/crop/675/noanimate/${encodeURIComponent(canonicalTarget)}`;
  } catch {
    return undefined;
  }
}

function toCustomOrAllNews(state: Omit<FilterState, "preset">): FilterState {
  const hasSelections =
    state.selectedLabIds.length > 0 ||
    state.selectedHardwareIds.length > 0 ||
    state.selectedMediaIds.length > 0 ||
    state.selectedResearchIds.length > 0;
  return { preset: hasSelections ? "custom" : ALL_NEWS_PRESET, ...state };
}

function toggleSelection(values: string[], id: string): string[] {
  return values.includes(id) ? values.filter((value) => value !== id) : [...values, id];
}

function mapArticle(
  source: NewsSource,
  article: Omit<AiArticle, "sourceName" | "sourceCategory" | "sourceId">
): AiArticle {
  return {
    ...article,
    sourceId: source.id,
    sourceName: source.name,
    sourceCategory: source.category
  };
}

function titleFromUrl(url: string): string {
  const cleaned = url
    .replace(/^https?:\/\//i, "")
    .replace(/[?#].*$/, "")
    .replace(/\/$/, "")
    .split("/")
    .pop();
  if (!cleaned) return "Article";
  return decodeURIComponent(cleaned)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function buildImageCandidates(article: AiArticle): string[] {
  const candidates: string[] = [];
  const pushUnique = (value: string | undefined) => {
    if (!value) return;
    const trimmed = value.trim();
    if (!trimmed || candidates.includes(trimmed)) return;
    candidates.push(trimmed);
  };
  pushUnique(article.imageUrl);
  pushUnique(toNewsScreenshotUrl(article.url));
  return candidates;
}

function NewsCardImage({ article }: { article: AiArticle }) {
  const candidates = useMemo(() => buildImageCandidates(article), [article]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = candidates[activeIndex];

  if (!activeSrc) return null;

  return (
    <img
      className="news-card-image"
      src={activeSrc}
      alt={article.title}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setActiveIndex((current) => current + 1)}
    />
  );
}

async function fetchSourceFromRss2Json(source: NewsSource): Promise<AiArticle[]> {
  if (!source.feedUrl) {
    throw new Error(`No feed URL configured for ${source.name}.`);
  }
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.feedUrl)}&count=${MAX_ITEMS_PER_SOURCE}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Could not load ${source.name} feed.`);
  }
  const payload = (await response.json()) as RssJsonResponse;
  if (payload.status !== "ok") {
    throw new Error(payload.message ?? `Could not parse ${source.name} feed.`);
  }

  const items = (payload.items ?? []).slice(0, MAX_ITEMS_PER_SOURCE).map((item) =>
    mapArticle(source, {
      id: `${source.id}-${item.guid || item.link}`,
      title: normalizeText(item.title) || source.name,
      url: item.link || source.homepage,
      publishedAt: parseDateOrNow(item.pubDate),
      summary: trimSummary(normalizeText(item.description || item.content || "") || `Latest article from ${source.name}.`),
      imageUrl:
        item.thumbnail ||
        item.enclosure?.link ||
        toNewsScreenshotUrl(item.link)
    })
  );

  return items.filter((item) => Boolean(item.url));
}

async function fetchFromEdge(source: NewsSource): Promise<AiArticle[]> {
  if (!source.edgeSource) return [];
  const items = await fetchGuildNews(source.edgeSource);
  return items.slice(0, MAX_ITEMS_PER_SOURCE).map((item) =>
    mapArticle(source, {
      id: `${source.id}-${item.id}`,
      title: item.title,
      url: item.url,
      publishedAt: parseDateOrNow(item.publishedAt),
      summary: trimSummary(stripHtml(item.summary) || `Latest article from ${source.name}.`),
      imageUrl: item.imageUrl,
      translatedFrom: item.translatedFrom
    })
  );
}

async function fetchSourceFromMirrorPage(source: NewsSource): Promise<AiArticle[]> {
  const mirrorUrl = `https://r.jina.ai/http://${source.homepage.replace(/^https?:\/\//i, "")}`;
  const response = await fetch(mirrorUrl, {
    headers: { Accept: "text/plain" }
  });
  if (!response.ok) {
    throw new Error(`Could not load ${source.name} mirror fallback.`);
  }
  const text = await response.text();

  const seen = new Set<string>();
  const links: Array<{ title: string; url: string }> = [];

  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let match: RegExpExecArray | null = markdownLinkRegex.exec(text);
  while (match && links.length < MAX_ITEMS_PER_SOURCE * 3) {
    const rawTitle = normalizeText(match[1] ?? "");
    const rawUrl = (match[2] ?? "").trim();
    if (rawUrl && !seen.has(rawUrl)) {
      seen.add(rawUrl);
      links.push({ title: rawTitle, url: rawUrl });
    }
    match = markdownLinkRegex.exec(text);
  }

  if (!links.length) {
    throw new Error(`${source.name} mirror parser found no links.`);
  }

  const homeHost = new URL(source.homepage).hostname.replace(/^www\./, "");
  const filtered = links
    .filter((item) => {
      let absolute = item.url;
      try {
        absolute = new URL(item.url, source.homepage).toString();
      } catch {
        return false;
      }
      if (source.scrapeLinkPattern && !source.scrapeLinkPattern.test(absolute)) return false;
      try {
        const host = new URL(absolute).hostname.replace(/^www\./, "");
        return host === homeHost || absolute.includes(homeHost);
      } catch {
        return false;
      }
    })
    .filter((item) => {
      if (source.id !== "lex-fridman") return true;
      return LEX_AI_TECH_PATTERN.test(`${item.title} ${item.url}`);
    })
    .slice(0, MAX_ITEMS_PER_SOURCE);

  if (!filtered.length) {
    throw new Error(`${source.name} mirror parser found no matching article links.`);
  }

  return filtered.map((item, index) =>
    mapArticle(source, {
      id: `${source.id}-mirror-${item.url}`,
      title: item.title.length >= 8 ? item.title : titleFromUrl(item.url),
      url: item.url,
      publishedAt: new Date(Date.now() - index * 60_000).toISOString(),
      summary: `Latest article from ${source.name}.`,
      imageUrl: toNewsScreenshotUrl(item.url)
    })
  );
}

async function fetchSource(source: NewsSource): Promise<SourceLoadResult> {
  const errors: string[] = [];
  try {
    if (source.edgeSource) {
      const viaEdge = await fetchFromEdge(source);
      if (viaEdge.length) {
        return { sourceId: source.id, mode: "loaded", articles: viaEdge };
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : `Could not load ${source.name}.`;
    errors.push(message);
  }

  try {
    if (source.feedUrl) {
      const viaRss = await fetchSourceFromRss2Json(source);
      if (viaRss.length) {
        return { sourceId: source.id, mode: "fallback", articles: viaRss };
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : `Could not load ${source.name}.`;
    errors.push(message);
  }

  try {
    const viaMirror = await fetchSourceFromMirrorPage(source);
    if (viaMirror.length) {
      return { sourceId: source.id, mode: "fallback", articles: viaMirror };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : `Could not load ${source.name}.`;
    errors.push(message);
  }

  const seededItems = SEEDED_SOURCE_ARTICLES[source.id];
  if (seededItems?.length) {
    const now = Date.now();
    const articles = seededItems.slice(0, MAX_ITEMS_PER_SOURCE).map((item, index) =>
      mapArticle(source, {
        id: `${source.id}-seeded-${item.url}-${index}`,
        title: item.title,
        url: item.url,
        publishedAt: new Date(now - index * 86_400_000).toISOString(),
        summary: trimSummary(item.summary),
        imageUrl: toNewsScreenshotUrl(item.url)
      })
    );
    return { sourceId: source.id, mode: "seeded", articles };
  }

  const uniqueErrors = Array.from(new Set(errors.filter(Boolean)));
  const joined = uniqueErrors.length ? uniqueErrors.join(" ") : `No articles available from ${source.name}.`;
  return { sourceId: source.id, mode: "failed", articles: [], error: joined };
}

export function AiNews() {
  const [articles, setArticles] = useState<AiArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [articlesPerPage, setArticlesPerPage] = useState<NewsPageSize>(12);
  const [page, setPage] = useState<number>(0);
  const [filters, setFilters] = useState<FilterState>({
    preset: ALL_NEWS_PRESET,
    selectedLabIds: [],
    selectedHardwareIds: [],
    selectedMediaIds: [],
    selectedResearchIds: []
  });

  useEffect(() => {
    let canceled = false;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      setWarning(null);
      const results = await Promise.all(SOURCES.map((source) => fetchSource(source)));
      if (canceled) return;

      const merged = results
        .flatMap((result) => result.articles)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      const failed = results.filter((result) => result.mode === "failed");
      setArticles(merged);
      setLastUpdated(new Date().toISOString());

      if (!merged.length && failed.length) {
        setError(failed.map((result) => result.error).filter(Boolean).join(" "));
      } else if (merged.length && failed.length) {
        const sourceNames = failed.map((result) => SOURCES.find((source) => source.id === result.sourceId)?.name ?? result.sourceId);
        setWarning(`Some sources are unavailable right now: ${sourceNames.join(", ")}.`);
      }
      setIsLoading(false);
    };

    load().catch((loadError: unknown) => {
      if (canceled) return;
      const message = loadError instanceof Error ? loadError.message : "Could not load AI news right now.";
      setError(message);
      setIsLoading(false);
    });

    return () => {
      canceled = true;
    };
  }, [refreshCount]);

  const availableLabs = useMemo(() => SOURCES.filter((source) => source.category === "AI Labs"), []);
  const availableHardware = useMemo(() => SOURCES.filter((source) => source.category === "Hardware News"), []);
  const availableMedia = useMemo(() => SOURCES.filter((source) => source.category === "Media & Podcasts"), []);
  const availableResearch = useMemo(() => SOURCES.filter((source) => source.category === "Research"), []);

  const setPreset = (preset: FilterPreset) => {
    setFilters({
      preset,
      selectedLabIds: [],
      selectedHardwareIds: [],
      selectedMediaIds: [],
      selectedResearchIds: []
    });
  };

  const updateCustomFilters = (updater: (current: FilterState) => Omit<FilterState, "preset">) => {
    setFilters((current) => toCustomOrAllNews(updater(current)));
  };

  const filteredArticles = useMemo(() => {
    if (filters.preset === ALL_LABS_PRESET) {
      return articles.filter((article) => article.sourceCategory === "AI Labs");
    }
    if (filters.preset === ALL_HARDWARE_PRESET) {
      return articles.filter((article) => article.sourceCategory === "Hardware News");
    }
    if (filters.preset === ALL_MEDIA_PRESET) {
      return articles.filter((article) => article.sourceCategory === "Media & Podcasts");
    }
    if (filters.preset === ALL_RESEARCH_PRESET) {
      return articles.filter((article) => article.sourceCategory === "Research");
    }
    if (filters.preset !== "custom") {
      return articles;
    }

    const selectedSourceIds = new Set<string>([
      ...filters.selectedLabIds,
      ...filters.selectedHardwareIds,
      ...filters.selectedMediaIds,
      ...filters.selectedResearchIds
    ]);
    if (selectedSourceIds.size === 0) {
      return articles;
    }
    return articles.filter((article) => selectedSourceIds.has(article.sourceId));
  }, [articles, filters]);

  const pageCount = useMemo(
    () => Math.max(1, Math.min(MAX_NEWS_PAGE_COUNT, Math.ceil(filteredArticles.length / articlesPerPage))),
    [articlesPerPage, filteredArticles.length]
  );
  const maxVisibleArticles = useMemo(() => articlesPerPage * MAX_NEWS_PAGE_COUNT, [articlesPerPage]);

  useEffect(() => {
    setPage(0);
  }, [filters, articlesPerPage]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const visibleArticles = useMemo(() => {
    const capped = filteredArticles.slice(0, maxVisibleArticles);
    const start = page * articlesPerPage;
    return capped.slice(start, start + articlesPerPage);
  }, [articlesPerPage, filteredArticles, maxVisibleArticles, page]);

  const renderPageControls = (position: "top" | "bottom") => (
    <div className="news-page-controls">
      <label className="news-page-size" htmlFor={`ai-news-page-size-${position}`}>
        Articles per page
        <select
          id={`ai-news-page-size-${position}`}
          value={String(articlesPerPage)}
          onChange={(event) => {
            setArticlesPerPage(Number(event.target.value) as NewsPageSize);
            setPage(0);
          }}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <div className="news-page-nav">
        <button className="btn btn-light" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0}>
          Previous
        </button>
        <p className="news-page-meta">| Page {page + 1} of {pageCount} |</p>
        <button
          className="btn btn-light"
          onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
          disabled={page >= pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <section className="news-board">
      <div className="section-header">
        <div>
          <h2>Ai RnD News</h2>
          <p>AI article blocks with source filtering across labs, hardware news, podcasts/media, and research.</p>
        </div>
        <button className="btn btn-light" onClick={() => setRefreshCount((value) => value + 1)} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="news-filter-group">
        <p className="news-filter-label">Global</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_NEWS_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_NEWS_PRESET)}
          >
            All News
          </button>
        </div>
      </div>

      <div className="news-filter-group">
        <p className="news-filter-label">AI Labs</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_LABS_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_LABS_PRESET)}
          >
            All AI Labs
          </button>
          {availableLabs.map((source) => {
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedLabIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedLabIds: toggleSelection(current.selectedLabIds, source.id),
                    selectedHardwareIds: current.selectedHardwareIds,
                    selectedMediaIds: current.selectedMediaIds,
                    selectedResearchIds: current.selectedResearchIds
                  }))
                }
              >
                {source.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="news-filter-group">
        <p className="news-filter-label">Hardware News</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_HARDWARE_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_HARDWARE_PRESET)}
          >
            All Hardware
          </button>
          {availableHardware.map((source) => {
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedHardwareIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedLabIds: current.selectedLabIds,
                    selectedHardwareIds: toggleSelection(current.selectedHardwareIds, source.id),
                    selectedMediaIds: current.selectedMediaIds,
                    selectedResearchIds: current.selectedResearchIds
                  }))
                }
              >
                {source.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="news-filter-group">
        <p className="news-filter-label">Media & Podcasts</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_MEDIA_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_MEDIA_PRESET)}
          >
            All Media
          </button>
          {availableMedia.map((source) => {
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedMediaIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedLabIds: current.selectedLabIds,
                    selectedHardwareIds: current.selectedHardwareIds,
                    selectedMediaIds: toggleSelection(current.selectedMediaIds, source.id),
                    selectedResearchIds: current.selectedResearchIds
                  }))
                }
              >
                {source.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="news-filter-group">
        <p className="news-filter-label">Research</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_RESEARCH_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_RESEARCH_PRESET)}
          >
            All Research
          </button>
          {availableResearch.map((source) => {
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedResearchIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedLabIds: current.selectedLabIds,
                    selectedHardwareIds: current.selectedHardwareIds,
                    selectedMediaIds: current.selectedMediaIds,
                    selectedResearchIds: toggleSelection(current.selectedResearchIds, source.id)
                  }))
                }
              >
                {source.name}
              </button>
            );
          })}
        </div>
      </div>

      {renderPageControls("top")}
      {filteredArticles.length > maxVisibleArticles ? (
        <p className="hint">
          Showing the first {maxVisibleArticles.toLocaleString()} matched articles (page cap: {MAX_NEWS_PAGE_COUNT}/
          {MAX_NEWS_PAGE_COUNT}).
        </p>
      ) : null}
      {lastUpdated ? <p className="hint">Last updated: {formatDate(lastUpdated)}</p> : null}
      {warning ? <p className="hint">{warning}</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {!isLoading && !error && !visibleArticles.length ? <p className="hint">No articles found for these source filters yet.</p> : null}

      <div className="news-grid">
        {visibleArticles.map((article) => (
          <article className="news-card" key={article.id}>
            <NewsCardImage article={article} />
            <p className="news-card-tag">{article.sourceCategory}</p>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <p className="news-card-meta">
              {article.sourceName} | {formatDate(article.publishedAt)}
              {article.translatedFrom ? ` | translated from ${article.translatedFrom.toUpperCase()}` : ""}
            </p>
            <a className="btn btn-light news-link" href={article.url} target="_blank" rel="noreferrer">
              Read Article
            </a>
          </article>
        ))}
      </div>

      {renderPageControls("bottom")}
    </section>
  );
}
