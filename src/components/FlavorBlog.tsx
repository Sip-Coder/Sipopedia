import { useEffect, useMemo, useState } from "react";
import { dailySipReports, type DailySipItem, type DailySipReport } from "../data/dailySip";
import { buildDailySipCutPack } from "../lib/mediaCutPack";
import { fetchGuildNews, type NewsRouterSource } from "../lib/newsRouter";
import { safeHttpUrl } from "../lib/urlSafety";
import { useArticleLibrary } from "../context/ArticleLibraryContext";
import { useArticlePreferences } from "../context/ArticlePreferencesContext";
import type { ArticleSnapshot } from "../lib/articleLibrary";
import { ArticleActions, ArticleFavoritesLink, ArticleReadLink } from "./ArticleActions";
import { MediaCutPackPanel } from "./MediaCutPack";

type SourceLoadMode = "loaded" | "fallback" | "failed";
type BlogSourceId = "sipstudies-site" | "sipstudies-substack" | "daily-sip";
type BlogFilter = "all" | BlogSourceId;

type BlogSource = {
  id: BlogSourceId;
  name: string;
  homepage: string;
  feedUrl?: string;
  edgeSource?: NewsRouterSource;
  staticArticles?: () => BlogArticle[];
};

type BlogArticle = {
  id: string;
  sourceId: BlogSourceId;
  sourceName: string;
  sourceCategory: "Flavor Blog" | "Daily Sip";
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
};

function toArticleSnapshot(article: BlogArticle): ArticleSnapshot {
  return {
    surface: "flavor-blog",
    articleId: article.id,
    sourceId: article.sourceId,
    sourceName: article.sourceName,
    sourceCategory: article.sourceCategory,
    title: article.title,
    url: article.url,
    publishedAt: article.publishedAt,
    summary: article.summary,
    imageUrl: article.imageUrl
  };
}

type SourceLoadResult = {
  sourceId: BlogSourceId;
  mode: SourceLoadMode;
  articles: BlogArticle[];
  error?: string;
};

type BlogCachePayload = {
  savedAt: string;
  articles: BlogArticle[];
  sourceModes: Record<string, SourceLoadMode>;
};

const BLOG_SOURCES: BlogSource[] = [
  {
    id: "sipstudies-site",
    name: "SipStudies.com Blog",
    homepage: "https://www.sipstudies.com/blog",
    feedUrl: "https://www.sipstudies.com/blog?format=rss",
    edgeSource: "sipstudies-blog"
  },
  {
    id: "sipstudies-substack",
    name: "Sip Studies Substack",
    homepage: "https://sipstudies.substack.com/",
    feedUrl: "https://sipstudies.substack.com/feed",
    edgeSource: "sipstudies"
  },
  {
    id: "daily-sip",
    name: "Daily Sip",
    homepage: "https://sipopedia.com/#app/flavor-blog?source=daily-sip",
    staticArticles: buildDailySipArticles
  }
];

const MAX_ITEMS_PER_SOURCE = 30;
const MAX_SUMMARY_LENGTH = 220;
const PAGE_SIZE_OPTIONS = [12, 24, 48, 120, 240] as const;
type BlogPageSize = (typeof PAGE_SIZE_OPTIONS)[number];
const MAX_PAGE_COUNT = 10;
const SOURCE_FETCH_TIMEOUT_MS = 8000;
const BLOG_CACHE_KEY = "sipstudies:flavor-blog:v5";
const BLOG_CACHE_MAX_AGE_MS = 1000 * 60 * 45;

type FallbackBlogArticle = Omit<BlogArticle, "sourceCategory">;

const FALLBACK_BLOG_ARTICLES: FallbackBlogArticle[] = [
  {
    id: "sipstudies-substack-what-a-biosignature-on-mars-teaches",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "What a Biosignature on Mars Teaches Us About Water, Life, and Sipping",
    url: "https://sipstudies.substack.com/p/what-a-biosignature-on-mars-teaches",
    publishedAt: "Sun, 14 Sep 2025 20:04:19 GMT",
    summary: "by Sippy, your fellow Martian"
  },
  {
    id: "sipstudies-substack-flavor-is-not-a-tongue-thing",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "Flavor Is Not a Tongue Thing, It's a Brain Thing",
    url: "https://sipstudies.substack.com/p/flavor-is-not-a-tongue-thing-its",
    publishedAt: "Sat, 13 Sep 2025 05:59:52 GMT",
    summary: "by Sippy, your Brain-Thing Assistant"
  },
  {
    id: "sipstudies-substack-mentoring-through-tasting",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "Mentoring Through Tasting: Teaching Without Pretense",
    url: "https://sipstudies.substack.com/p/mentoring-through-tasting-teaching",
    publishedAt: "Sun, 07 Sep 2025 06:09:25 GMT",
    summary: "by Sippy, your Beverage Storyteller"
  },
  {
    id: "sipstudies-substack-austria",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "Austria",
    url: "https://sipstudies.substack.com/p/austria",
    publishedAt: "Sat, 06 Sep 2025 00:05:23 GMT",
    summary: "by Sippy, your Vineyard Travel Guide"
  },
  {
    id: "sipstudies-substack-where-wine-meets-ai",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "Where Wine Meets AI",
    url: "https://sipstudies.substack.com/p/where-wine-meets-ai",
    publishedAt: "Sat, 06 Sep 2025 00:05:23 GMT",
    summary: "by Sippy, the AI that's being a dude doing a thang"
  },
  {
    id: "sipstudies-substack-welcome-to-sip-studies",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "Welcome to Sip Studies: What We Believe & Why It Matters",
    url: "https://sipstudies.substack.com/p/welcome-to-sip-studies-what-we-believe",
    publishedAt: "Mon, 01 Sep 2025 22:51:20 GMT",
    summary: "by Sippy, your AI Podcaster"
  },
  {
    id: "sipstudies-substack-true-cost-of-bottled-water",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "The True Cost of Bottled Water (and What to Sip Instead)",
    url: "https://sipstudies.substack.com/p/the-true-cost-of-bottled-water-and",
    publishedAt: "Mon, 01 Sep 2025 04:08:12 GMT",
    summary: "by Sippy, the Refill Station Representative"
  },
  {
    id: "sipstudies-substack-personal-beverage-curriculum",
    sourceId: "sipstudies-substack",
    sourceName: "Sip Studies Substack",
    title: "How to Build a Personal Beverage Curriculum",
    url: "https://sipstudies.substack.com/p/how-to-build-a-personal-beverage",
    publishedAt: "Sun, 31 Aug 2025 04:38:52 GMT",
    summary: "by Sippy, your Beverage Organizer"
  },
  {
    id: "sipstudies-site-taylor",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "More Success with Students!",
    url: "https://www.sipstudies.com/blog/taylor",
    publishedAt: "Sat, 30 Aug 2025 02:39:11 +0000",
    summary: "Latest article from SipStudies.com Blog.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/2a6096b7-d1de-4aa7-adea-5447ed22da90/20241117_123125.jpg"
  },
  {
    id: "sipstudies-site-luis",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "A Day of Celebration, Certification & Community",
    url: "https://www.sipstudies.com/blog/luis",
    publishedAt: "Thu, 31 Jul 2025 04:58:08 +0000",
    summary: "Our fellow student and colleague, Luis, passed his Level 2 Certified Sommelier exam with the Court of Master Sommeliers.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/63aa7be8-c544-4292-87d3-12a611d5b7d8/20250413_140847.jpg"
  },
  {
    id: "sipstudies-site-annie",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "Losing A Dear Friend",
    url: "https://www.sipstudies.com/blog/annie",
    publishedAt: "Tue, 29 Jul 2025 14:16:00 +0000",
    summary: "In loving memory of Annie, a beloved team member and co-host of Wine Blog With A Dog and Bark & Barrels.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/9ca97655-3ed2-4dff-932a-df71d4bea480/cb9ec0_4224d83e37c44f5cb3a4fb96c6e3db67%7Emv2.webp"
  },
  {
    id: "sipstudies-site-new-ai-podcast",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "New AI podcast",
    url: "https://www.sipstudies.com/blog/new-ai-podcast",
    publishedAt: "Sun, 27 Jul 2025 07:59:33 +0000",
    summary: "A look at the work behind a new AI podcast concept for Sip Studies.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1753600864310-GJ13OEOZ0FIJLAOTDCCM/Bicentennial+Man+04.png"
  },
  {
    id: "sipstudies-site-isaac-asimov-robotics",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "Isaac Asimov & Robotics",
    url: "https://www.sipstudies.com/blog/issac-asimov-robotics",
    publishedAt: "Thu, 24 Jul 2025 02:55:43 +0000",
    summary: "A reflection on Isaac Asimov, robotics, and how early technology writing still feels relevant today.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/96b04f05-4871-4aa4-a0b8-71b5770d9c72/811o6fRz0uS._UF1000%2C1000_QL80_.jpg"
  },
  {
    id: "sipstudies-site-nasa-jpl",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "NASA JPL in Pasadena",
    url: "https://www.sipstudies.com/blog/nasa-jpl-in-pasadena",
    publishedAt: "Thu, 12 Jun 2025 08:08:00 +0000",
    summary: "A visit to NASA JPL in Pasadena during a Los Angeles charity donation trip.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/6e1722ec-e80c-4d37-83f9-633e55388512/processed_20250612_125749.jpg"
  },
  {
    id: "sipstudies-site-la-fire-donations",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "LA Fire Donations",
    url: "https://www.sipstudies.com/blog/la-fire-donations-1",
    publishedAt: "Wed, 11 Jun 2025 07:39:00 +0000",
    summary: "Community donation updates for Los Angeles communities affected by fires.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/8f66f342-8572-4323-adc6-a742befd68b8/processed_20250611_152250.jpg"
  },
  {
    id: "sipstudies-site-the-big-reveal",
    sourceId: "sipstudies-site",
    sourceName: "SipStudies.com Blog",
    title: "The Big Reveal",
    url: "https://www.sipstudies.com/blog/the-big-reveal",
    publishedAt: "Fri, 07 Feb 2025 08:01:44 +0000",
    summary: "An announcement about the merger and next chapter of Sip Studies.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/c0bcd29c-a063-4f59-9b4a-7bcd4c0c10db/EPIC+02+-+Copy.jpg"
  }
];

function stripHtml(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function trimSummary(input: string): string {
  if (input.length <= MAX_SUMMARY_LENGTH) return input;
  return `${input.slice(0, MAX_SUMMARY_LENGTH - 1).trim()}...`;
}

function formatDate(dateInput: string): string {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function extractFirstImageUrl(input: string, baseUrl?: string): string | undefined {
  const patterns = [
    /<img[^>]+src=(["'])(?<url>[^"']+)\1/i,
    /<meta[^>]+property=(["'])og:image\1[^>]+content=(["'])(?<url>[^"']+)\2/i
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(input);
    const raw = match?.groups?.url?.trim() ?? "";
    if (!raw) continue;
    try {
      return baseUrl ? new URL(raw, baseUrl).toString() : new URL(raw).toString();
    } catch {
      continue;
    }
  }

  return undefined;
}

function toScreenshotUrl(targetUrl: string | undefined): string | undefined {
  if (!targetUrl) return undefined;
  try {
    const parsed = new URL(targetUrl);
    const canonicalTarget = `${parsed.origin}${parsed.pathname}`;
    return `https://image.thum.io/get/width/1200/crop/675/noanimate/${encodeURIComponent(canonicalTarget)}`;
  } catch {
    return undefined;
  }
}

function buildArticleImageCandidates(article: BlogArticle): string[] {
  const candidates: string[] = [];
  const pushUnique = (value: string | undefined) => {
    const trimmed = value?.trim() ?? "";
    if (!trimmed || candidates.includes(trimmed)) return;
    candidates.push(trimmed);
  };

  pushUnique(article.imageUrl);
  pushUnique(toScreenshotUrl(article.url));
  return candidates;
}

function BlogCardImage({ article }: { article: BlogArticle }) {
  const candidates = useMemo(() => buildArticleImageCandidates(article), [article]);
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

function buildDailySipArticles(): BlogArticle[] {
  return dailySipReports.map((report) => ({
      id: report.id,
      sourceId: "daily-sip",
      sourceName: "Daily Sip",
      sourceCategory: "Daily Sip",
      title: report.title,
      url: `https://sipopedia.com/#app/flavor-blog?source=daily-sip&entry=${encodeURIComponent(report.id)}`,
      publishedAt: report.generatedAt,
      summary: report.executiveSummary[0] ?? report.subtitle,
      imageUrl: report.headerImageUrl
    }));
}

function getInitialBlogFilterOverride(): BlogSourceId | null {
  if (typeof window === "undefined") return null;
  const hashQuery = window.location.hash.split("?")[1] ?? "";
  const hashSource = new URLSearchParams(hashQuery).get("source");
  const searchSource = new URLSearchParams(window.location.search).get("source");
  const source = hashSource || searchSource;
  return source === "daily-sip" || source === "sipstudies-site" || source === "sipstudies-substack" ? source : null;
}

function getInitialDailySipEntry(): string | null {
  if (typeof window === "undefined") return null;
  const hashQuery = window.location.hash.split("?")[1] ?? "";
  return new URLSearchParams(hashQuery).get("entry");
}

function DailySipMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="daily-sip-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function DailySipArticleRow({ item }: { item: DailySipItem }) {
  const safeUrl = safeHttpUrl(item.url);
  return (
    <li className="daily-sip-story">
      <div className="daily-sip-story-copy">
        <p className="news-card-tag">{item.category}</p>
        <h4>
          {item.rank}. {item.title}
        </h4>
        <p>{item.summary}</p>
        <p>
          <strong>Why it matters:</strong> {item.whyItMatters}
        </p>
        <p>
          <strong>Watch next:</strong> {item.marketImpact}
        </p>
        <p className="news-card-meta">
          {item.sourceName} | {formatDate(item.publishedAt)}
        </p>
      </div>
      {safeUrl ? (
        <a className="btn btn-light news-link" href={safeUrl} target="_blank" rel="noreferrer">
          Original Article
        </a>
      ) : null}
    </li>
  );
}

function DailySipReportView({ report, onBack }: { report: DailySipReport; onBack: () => void }) {
  const coverage = report.coverage.length ? report.coverage.join(", ") : "Beverage market";
  const cutPack = useMemo(() => buildDailySipCutPack(report), [report]);

  return (
    <article className="daily-sip-report">
      <header className="daily-sip-hero">
        <button className="btn btn-light daily-sip-back" type="button" onClick={onBack}>
          All Daily Sip
        </button>
        {report.headerImageUrl ? (
          <img className="daily-sip-hero-image" src={report.headerImageUrl} alt="" loading="lazy" />
        ) : null}
        <p className="news-card-tag">Daily Sip</p>
        <h3>{report.title}</h3>
        <p>{report.subtitle}</p>
        <div className="daily-sip-metrics">
          <DailySipMetric label="ranked articles" value={report.articleCount.toLocaleString()} />
          <DailySipMetric label="sources scanned" value={report.sourceCount.toLocaleString()} />
          <DailySipMetric label="latest refresh" value={formatDate(report.generatedAt)} />
        </div>
      </header>

      <section className="daily-sip-copy">
        <h4>Market Read</h4>
        {report.executiveSummary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="daily-sip-copy">
        <h4>Coverage</h4>
        <p>{coverage}</p>
      </section>

      <MediaCutPackPanel pack={cutPack} className="daily-sip-cut-pack" />

      <section className="daily-sip-theme-grid">
        {report.marketThemes.map((theme) => (
          <div className="daily-sip-theme" key={theme.title}>
            <h4>{theme.title}</h4>
            <p>{theme.body}</p>
          </div>
        ))}
      </section>

      <section className="daily-sip-copy">
        <h4>Watchlist</h4>
        <ul className="daily-sip-watchlist">
          {report.watchlist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="daily-sip-copy">
        <h4>Top 20 Articles</h4>
        {report.articles.length ? (
          <ol className="daily-sip-list">
            {report.articles.map((item) => (
              <DailySipArticleRow item={item} key={`${item.rank}-${item.url}`} />
            ))}
          </ol>
        ) : (
          <p className="hint">Daily Sip is installed. Run npm run daily-sip to generate the first live top-20 article.</p>
        )}
      </section>
    </article>
  );
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timerId !== undefined) clearTimeout(timerId);
  }
}

function readBlogCache(): BlogCachePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BLOG_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BlogCachePayload;
    if (!parsed || typeof parsed.savedAt !== "string" || !Array.isArray(parsed.articles) || !parsed.sourceModes) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeBlogCache(payload: BlogCachePayload): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore localStorage write failures.
  }
}

function mapArticle(source: BlogSource, article: Omit<BlogArticle, "sourceId" | "sourceName" | "sourceCategory">): BlogArticle {
  return {
    ...article,
    sourceId: source.id,
    sourceName: source.name,
    sourceCategory: "Flavor Blog"
  };
}

function buildFallbackArticles(): BlogArticle[] {
  return [
    ...FALLBACK_BLOG_ARTICLES.map((article) => ({
      ...article,
      sourceCategory: "Flavor Blog" as const
    })),
    ...buildDailySipArticles()
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function mergeWithFallbackForFailedSources(results: SourceLoadResult[]): BlogArticle[] {
  const liveArticles = mergeResults(results);
  const liveSourceIds = new Set(liveArticles.map((article) => article.sourceId));
  const fallbackArticles = buildFallbackArticles().filter((article) => !liveSourceIds.has(article.sourceId));
  const articlesById = new Map<string, BlogArticle>();

  [...liveArticles, ...fallbackArticles].forEach((article) => {
    articlesById.set(article.id, article);
  });

  return Array.from(articlesById.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function buildFallbackSourceModes(): Record<string, SourceLoadMode> {
  return BLOG_SOURCES.reduce<Record<string, SourceLoadMode>>((acc, source) => {
    acc[source.id] = "fallback";
    return acc;
  }, {});
}

function firstChildByNodeName(parent: Element, nodeName: string): Element | undefined {
  const target = nodeName.toLowerCase();
  return Array.from(parent.children).find((child) => child.nodeName.toLowerCase() === target);
}

function firstChildText(parent: Element, nodeName: string): string {
  return firstChildByNodeName(parent, nodeName)?.textContent?.trim() ?? "";
}

function firstChildAttribute(parent: Element, nodeName: string, attribute: string): string {
  return firstChildByNodeName(parent, nodeName)?.getAttribute(attribute)?.trim() ?? "";
}

function parseRssFeed(source: BlogSource, xmlText: string): BlogArticle[] {
  const doc = new DOMParser().parseFromString(xmlText, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new Error(`Could not parse ${source.name} RSS.`);
  }

  return Array.from(doc.querySelectorAll("item"))
    .slice(0, MAX_ITEMS_PER_SOURCE)
    .flatMap((item, index) => {
      const link = firstChildText(item, "link") || source.homepage;
      const title = stripHtml(firstChildText(item, "title")) || "Untitled";
      const descriptionHtml = firstChildText(item, "description") || firstChildText(item, "content:encoded");
      const summary = trimSummary(stripHtml(descriptionHtml) || `Latest article from ${source.name}.`);
      const imageUrl =
        firstChildAttribute(item, "media:content", "url") ||
        firstChildAttribute(item, "media:thumbnail", "url") ||
        extractFirstImageUrl(descriptionHtml, link);
      const guid = firstChildText(item, "guid") || link || `${source.id}-${index}`;
      const publishedAt = firstChildText(item, "pubDate") || firstChildText(item, "dc:date") || new Date().toISOString();

      if (!title || !link) return [];

      return [
        mapArticle(source, {
          id: `${source.id}-${guid}`,
          title,
          url: link,
          publishedAt,
          summary,
          imageUrl
        })
      ];
    });
}

async function fetchSourceFromRss(source: BlogSource): Promise<BlogArticle[]> {
  if (!source.feedUrl) return [];

  const response = await fetch(source.feedUrl, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml, */*"
    }
  });
  if (!response.ok) {
    throw new Error(`Could not load ${source.name} RSS.`);
  }

  return parseRssFeed(source, await response.text());
}

async function fetchSourceFromEdge(source: BlogSource): Promise<BlogArticle[]> {
  if (!source.edgeSource) return [];

  const items = await fetchGuildNews(source.edgeSource);
  return items.map((item) =>
    mapArticle(source, {
      id: `${source.id}-${item.id}`,
      title: stripHtml(item.title) || "Untitled",
      url: item.url,
      publishedAt: item.publishedAt,
      summary: trimSummary(stripHtml(item.summary) || `Latest article from ${source.name}.`),
      imageUrl: item.imageUrl
    })
  );
}

async function fetchSource(source: BlogSource): Promise<SourceLoadResult> {
  if (source.staticArticles) {
    return { sourceId: source.id, mode: "loaded", articles: source.staticArticles() };
  }

  try {
    const viaRss = await fetchSourceFromRss(source);
    if (viaRss.length) {
      return { sourceId: source.id, mode: "loaded", articles: viaRss };
    }
  } catch {
    // Browser CORS can block direct feed reads, so fall back to the Edge Function.
  }

  try {
    const viaEdge = await fetchSourceFromEdge(source);
    if (viaEdge.length) {
      return { sourceId: source.id, mode: "loaded", articles: viaEdge };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : `Could not load ${source.name}.`;
    return { sourceId: source.id, mode: "failed", articles: [], error: message };
  }

  return { sourceId: source.id, mode: "failed", articles: [], error: `No articles available from ${source.name}.` };
}

function mergeResults(results: SourceLoadResult[]): BlogArticle[] {
  return results
    .flatMap((result) => result.articles)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function buildModeMap(results: SourceLoadResult[]): Record<string, SourceLoadMode> {
  return results.reduce<Record<string, SourceLoadMode>>((acc, result) => {
    acc[result.sourceId] = result.mode;
    return acc;
  }, {});
}

export function FlavorBlog() {
  const { isRead, markRead } = useArticleLibrary();
  const { flavorBlog, updateFlavorBlog } = useArticlePreferences();
  const { articlesPerPage, readingFilter } = flavorBlog;
  const [sourceOverride, setSourceOverride] = useState<BlogSourceId | null>(getInitialBlogFilterOverride);
  const filter: BlogFilter = sourceOverride ?? flavorBlog.filter;
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [selectedDailySipId, setSelectedDailySipId] = useState<string | null>(getInitialDailySipEntry);
  const [sourceModes, setSourceModes] = useState<Record<string, SourceLoadMode>>({});
  const [studyArticleId, setStudyArticleId] = useState<string | null>(null);
  const [studyRecall, setStudyRecall] = useState("");
  const [studyPractice, setStudyPractice] = useState("");

  useEffect(() => {
    let canceled = false;

    const load = async () => {
      setError(null);
      setWarning(null);
      const cached = readBlogCache();
      const cacheFresh =
        cached && Date.now() - new Date(cached.savedAt).getTime() <= BLOG_CACHE_MAX_AGE_MS && cached.articles.length > 0;

      if (cacheFresh) {
        setArticles(cached.articles);
        setSourceModes(cached.sourceModes);
        setLastUpdated(cached.savedAt);
      } else {
        setArticles(buildFallbackArticles());
        setSourceModes(buildFallbackSourceModes());
        setLastUpdated(new Date().toISOString());
      }

      setIsLoading(true);
      const liveResults: SourceLoadResult[] = [];
      const hadCachedData = Boolean(cacheFresh);

      await Promise.all(
        BLOG_SOURCES.map(async (source) => {
          let result: SourceLoadResult;
          try {
            result = await withTimeout(fetchSource(source), SOURCE_FETCH_TIMEOUT_MS, `${source.name} timed out while loading.`);
          } catch (sourceError) {
            const message = sourceError instanceof Error ? sourceError.message : `Could not load ${source.name} right now.`;
            result = { sourceId: source.id, mode: "failed", articles: [], error: message };
          }

          if (!canceled) {
            liveResults.push(result);
          }
        })
      );

      if (canceled) return;

      const merged = mergeWithFallbackForFailedSources(liveResults);
      const failed = liveResults.filter((result) => result.mode === "failed");
      const modeMap = buildModeMap(liveResults);

      if (merged.length > 0) {
        const savedAt = new Date().toISOString();
        setArticles(merged);
        setLastUpdated(savedAt);
        writeBlogCache({ savedAt, articles: merged, sourceModes: modeMap });
      }

      if (!merged.length && failed.length && !hadCachedData) {
        setWarning("Showing built-in Flavor Blog posts while live sources are temporarily unavailable.");
      } else if (merged.length && failed.length) {
        const sourceNames = failed.map((result) => BLOG_SOURCES.find((source) => source.id === result.sourceId)?.name ?? result.sourceId);
        setWarning(`Some Flavor Blog sources are unavailable right now: ${sourceNames.join(", ")}.`);
      } else if (!merged.length && hadCachedData) {
        setWarning("Showing cached Flavor Blog posts while live sources are temporarily unavailable.");
      }

      setSourceModes(modeMap);
      setIsLoading(false);
    };

    load().catch((loadError) => {
      if (canceled) return;
      const message = loadError instanceof Error ? loadError.message : "Could not load Flavor Blog right now.";
      setError(message);
      setIsLoading(false);
    });

    return () => {
      canceled = true;
    };
  }, [refreshCount]);

  const sourceFilteredArticles = useMemo(
    () => (filter === "all" ? articles : articles.filter((article) => article.sourceId === filter)),
    [articles, filter]
  );
  const filteredArticles = useMemo(
    () =>
      readingFilter === "unread"
        ? sourceFilteredArticles.filter((article) => !isRead(toArticleSnapshot(article)))
        : sourceFilteredArticles,
    [isRead, readingFilter, sourceFilteredArticles]
  );
  const pageCount = useMemo(
    () => Math.max(1, Math.min(MAX_PAGE_COUNT, Math.ceil(filteredArticles.length / articlesPerPage))),
    [articlesPerPage, filteredArticles.length]
  );
  const maxVisibleArticles = useMemo(() => articlesPerPage * MAX_PAGE_COUNT, [articlesPerPage]);

  useEffect(() => {
    setPage(0);
  }, [filter, articlesPerPage, readingFilter]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const visibleArticles = useMemo(() => {
    const capped = filteredArticles.slice(0, maxVisibleArticles);
    const start = page * articlesPerPage;
    return capped.slice(start, start + articlesPerPage);
  }, [articlesPerPage, filteredArticles, maxVisibleArticles, page]);
  const selectedDailySipReport = useMemo(
    () => dailySipReports.find((report) => report.id === selectedDailySipId) ?? null,
    [selectedDailySipId]
  );
  const studyArticle = useMemo(
    () => articles.find((article) => article.id === studyArticleId) ?? null,
    [articles, studyArticleId]
  );
  const showDailySipReport = filter === "daily-sip" && selectedDailySipReport !== null;

  const renderPageControls = (position: "top" | "bottom") => (
    <div className="news-page-controls">
      <label className="news-page-size" htmlFor={`flavor-blog-page-size-${position}`}>
        Articles per page
        <select
          id={`flavor-blog-page-size-${position}`}
          value={String(articlesPerPage)}
          onChange={(event) => {
            updateFlavorBlog({ articlesPerPage: Number(event.target.value) as BlogPageSize });
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
    <section className="news-board flavor-blog-board">
      <div className="section-header">
        <div>
          <h2>Flavor Blog</h2>
          <p>Editorial lessons and market briefings designed to end in recall, tasting, or service practice.</p>
        </div>
        <button className="btn btn-light" onClick={() => setRefreshCount((value) => value + 1)} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="article-library-toolbar">
        <div className="news-source-strip" role="group" aria-label="Filter Flavor Blog by reading status">
          <button
            className={`news-source-chip ${readingFilter === "all" ? "active" : ""}`}
            type="button"
            aria-pressed={readingFilter === "all"}
            onClick={() => updateFlavorBlog({ readingFilter: "all" })}
          >
            All articles
          </button>
          <button
            className={`news-source-chip ${readingFilter === "unread" ? "active" : ""}`}
            type="button"
            aria-pressed={readingFilter === "unread"}
            onClick={() => updateFlavorBlog({ readingFilter: "unread" })}
          >
            Unread
          </button>
        </div>
        <ArticleFavoritesLink />
      </div>

      <article className="journal-card" aria-labelledby="flavor-blog-loop-title">
        <p className="checkout-eyebrow">Read → recall → practice</p>
        <h3 id="flavor-blog-loop-title">{studyArticle ? studyArticle.title : "Select one article for a focused study pass"}</h3>
        {studyArticle ? (
          <div className="journal-form-grid">
            <label className="journal-row">Without rereading, state the main idea in one sentence.<textarea rows={2} value={studyRecall} onChange={(event) => setStudyRecall(event.target.value)} /></label>
            <label className="journal-row">Choose a practical follow-up.<textarea rows={2} value={studyPractice} onChange={(event) => setStudyPractice(event.target.value)} placeholder="Taste a comparison, explain it to a guest, or turn it into a quiz question." /></label>
          </div>
        ) : (
          <p>Read with a purpose: one idea to remember and one observable behavior to practice.</p>
        )}
      </article>

      <details>
        <summary>Choose a publication</summary>
      <div className="news-filter-group">
        <p className="news-filter-label">Blog</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filter === "all" ? "active" : ""}`}
            onClick={() => {
              setSelectedDailySipId(null);
              setSourceOverride(null);
              updateFlavorBlog({ filter: "all" });
            }}
          >
            All Flavor Blog
          </button>
          {BLOG_SOURCES.map((source) => {
            const mode = sourceModes[source.id];
            const statusSuffix = mode === "fallback" ? " (cached)" : "";
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filter === source.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedDailySipId(null);
                  setSourceOverride(null);
                  updateFlavorBlog({ filter: source.id });
                }}
              >
                {source.name}
                {statusSuffix}
              </button>
            );
          })}
        </div>
      </div>
      </details>

      {showDailySipReport ? null : renderPageControls("top")}
      {!showDailySipReport && filteredArticles.length > maxVisibleArticles ? (
        <p className="hint">
          Showing the first {maxVisibleArticles.toLocaleString()} matched articles (page cap: {MAX_PAGE_COUNT}/{MAX_PAGE_COUNT}).
        </p>
      ) : null}

      {lastUpdated ? <p className="hint">Last updated: {formatDate(lastUpdated)}</p> : null}
      {warning ? <p className="hint">{warning}</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {!isLoading && !error && !visibleArticles.length ? <p className="hint">No Flavor Blog posts found for this filter yet.</p> : null}

      {showDailySipReport && selectedDailySipReport ? (
        <DailySipReportView report={selectedDailySipReport} onBack={() => setSelectedDailySipId(null)} />
      ) : (
        <>
          <div className="news-grid">
            {visibleArticles.map((article) => {
              const safeArticleUrl = safeHttpUrl(article.url);
              const articleSnapshot = toArticleSnapshot(article);
              return (
                <article className={`news-card ${isRead(articleSnapshot) ? "is-read" : ""}`} key={article.id}>
                  <BlogCardImage article={article} />
                  <p className="news-card-tag">{article.sourceCategory}</p>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <p className="news-card-meta">
                    {article.sourceName} | {formatDate(article.publishedAt)}
                  </p>
                  <ArticleActions article={articleSnapshot} />
                  <div className="journal-actions article-primary-actions">
                    <button
                      className="btn btn-primary news-link"
                      type="button"
                      onClick={() => {
                        setStudyArticleId(article.id);
                        setStudyRecall("");
                        setStudyPractice("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Study this lesson
                    </button>
                    {article.sourceId === "daily-sip" ? (
                      <button
                        className="btn btn-light news-link"
                        type="button"
                        onClick={() => {
                          markRead(articleSnapshot);
                          setSourceOverride(null);
                          updateFlavorBlog({ filter: "daily-sip" });
                          setSelectedDailySipId(article.id);
                        }}
                      >
                        Read Article
                      </button>
                    ) : safeArticleUrl ? (
                      <ArticleReadLink article={articleSnapshot} className="btn btn-light news-link" href={safeArticleUrl}>
                        Read Article
                      </ArticleReadLink>
                    ) : (
                      <span className="btn btn-light news-link">Invalid article URL</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {renderPageControls("bottom")}
        </>
      )}
    </section>
  );
}
