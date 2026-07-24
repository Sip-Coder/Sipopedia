import { useEffect, useMemo, useState } from "react";
import { fetchGuildNews } from "../lib/newsRouter";
import { MAGAZINE_NEWS_REFERENCES } from "../data/magazineNewsReferences";
import { safeHttpUrl } from "../lib/urlSafety";
import { useArticleLibrary } from "../context/ArticleLibraryContext";
import type { ArticleSnapshot } from "../lib/articleLibrary";
import { ArticleActions, ArticleFavoritesLink, ArticleReadLink } from "./ArticleActions";

type BeverageType = "Wine" | "Spirits" | "Beer" | "Sake" | "General";
type SourceLoadMode = "loaded" | "fallback" | "failed";
type SourceCategory = "Institution & Guild" | "Magazine" | "Own" | "Regulators";
type FilterPreset = "all-news" | "all-guilds" | "all-mags" | "all-regs" | "custom";

type NewsSource = {
  id: string;
  name: string;
  category: SourceCategory;
  homepage: string;
  supportedBeverageTypes: BeverageType[];
  isReferenceOnly?: boolean;
  edgeSource?:
    | "wset"
    | "beer-connoisseur"
    | "robert-parker"
    | "whisky-advocate"
    | "wine-spectator"
    | "connoisseur-magazine"
    | "wine-enthusiast"
    | "decanter"
    | "usbg"
    | "iba"
    | "cicerone"
    | "sca-events"
    | "sca-news"
    | "barista-guild"
    | "world-of-coffee"
    | "brewers-association"
    | "tea-masters"
    | "sipstudies"
    | "ttb-news"
    | "inao-news"
    | "eu-agri-news"
    | "masaf-docg"
    | "vinosdo-news"
    | "vdp-news";
  feedUrl?: string;
  wpPostsUrl?: string;
  pageUrl?: string;
  parser?: "wset-ublogsy";
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

type WpRenderedText = {
  rendered?: string;
};

type WpEmbeddedMedia = {
  source_url?: string;
  media_details?: {
    sizes?: Record<
      string,
      {
        source_url?: string;
      }
    >;
  };
};

type WpPostItem = {
  id?: number | string;
  date?: string;
  link?: string;
  title?: WpRenderedText | string;
  excerpt?: WpRenderedText | string;
  content?: WpRenderedText | string;
  jetpack_featured_media_url?: string;
  featured_media_src_url?: string;
  yoast_head_json?: {
    og_image?: Array<{ url?: string }>;
  };
  _embedded?: {
    "wp:featuredmedia"?: WpEmbeddedMedia[];
  };
};

type WsetFallbackArticle = {
  title: string;
  relativeUrl: string;
  date: string;
};

type BeverageArticle = {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
  translatedFrom?: string;
  sourceName: string;
  sourceCategory: SourceCategory;
  beverageTypes: BeverageType[];
};

function toArticleSnapshot(article: BeverageArticle): ArticleSnapshot {
  return {
    surface: "beverage-news",
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
  sourceId: string;
  mode: SourceLoadMode;
  articles: BeverageArticle[];
  error?: string;
};

type NewsCachePayload = {
  savedAt: string;
  articles: BeverageArticle[];
  sourceModes: Record<string, SourceLoadMode>;
};

type FilterState = {
  preset: FilterPreset;
  selectedGuildIds: string[];
  selectedMagazineIds: string[];
  selectedBlogIds: string[];
  selectedRegulatorIds: string[];
};

const SOURCES: NewsSource[] = [
  {
    id: "swe",
    name: "Society of Wine Educators",
    category: "Institution & Guild",
    homepage: "https://winewitandwisdomswe.com/",
    supportedBeverageTypes: ["Wine"],
    feedUrl: "https://winewitandwisdomswe.com/feed/",
    wpPostsUrl: "https://winewitandwisdomswe.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "wset",
    name: "WSET Global",
    category: "Institution & Guild",
    homepage: "https://www.wsetglobal.com/news-events/news/",
    supportedBeverageTypes: ["Wine", "Spirits", "Beer", "Sake"],
    edgeSource: "wset",
    pageUrl: "https://www.wsetglobal.com/news-events/news/",
    parser: "wset-ublogsy"
  },
  {
    id: "cms",
    name: "Court of Master Sommeliers",
    category: "Institution & Guild",
    homepage: "https://www.mastersommeliers.org/news/",
    supportedBeverageTypes: ["Wine", "Spirits"],
    feedUrl: "https://www.mastersommeliers.org/feed/",
    wpPostsUrl: "https://www.mastersommeliers.org/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "usbg",
    name: "United States Bartenders Guild",
    category: "Institution & Guild",
    homepage: "https://www.usbg.org/blog/all",
    supportedBeverageTypes: ["Spirits", "General"],
    edgeSource: "usbg"
  },
  {
    id: "iba",
    name: "International Bartenders Association",
    category: "Institution & Guild",
    homepage: "https://iba-world.com/events/",
    supportedBeverageTypes: ["Spirits", "General"],
    edgeSource: "iba",
    feedUrl: "https://iba-world.com/events/feed/",
    wpPostsUrl: "https://iba-world.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "cicerone",
    name: "Cicerone Certification Program",
    category: "Institution & Guild",
    homepage: "https://www.cicerone.org/us-en/blog",
    supportedBeverageTypes: ["Beer", "General"],
    edgeSource: "cicerone"
  },
  {
    id: "sca-events",
    name: "SCA Global Events",
    category: "Institution & Guild",
    homepage: "https://sca.coffee/events/global",
    supportedBeverageTypes: ["General"],
    edgeSource: "sca-events"
  },
  {
    id: "sca-news",
    name: "SCA News",
    category: "Institution & Guild",
    homepage: "https://sca.coffee/news",
    supportedBeverageTypes: ["General"],
    edgeSource: "sca-news",
    feedUrl: "https://sca.coffee/sca-news?format=rss"
  },
  {
    id: "barista-guild",
    name: "Barista Guild",
    category: "Institution & Guild",
    homepage: "https://baristaguild.coffee/",
    supportedBeverageTypes: ["General"],
    edgeSource: "barista-guild",
    feedUrl: "https://baristaguild.coffee/welcome?format=rss"
  },
  {
    id: "world-of-coffee",
    name: "World of Coffee",
    category: "Institution & Guild",
    homepage: "https://www.worldofcoffee.org/",
    supportedBeverageTypes: ["General"],
    edgeSource: "world-of-coffee"
  },
  {
    id: "brewers-association",
    name: "Brewers Association",
    category: "Institution & Guild",
    homepage: "https://www.brewersassociation.org/news-archive/",
    supportedBeverageTypes: ["Beer", "General"],
    edgeSource: "brewers-association",
    feedUrl: "https://www.brewersassociation.org/news-archive/feed/",
    wpPostsUrl: "https://www.brewersassociation.org/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "tea-masters",
    name: "Tea Masters",
    category: "Institution & Guild",
    homepage: "https://teamasters.org/",
    supportedBeverageTypes: ["General"],
    edgeSource: "tea-masters",
    feedUrl: "https://teamasters.org/feed/",
    wpPostsUrl: "https://teamasters.org/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "sipstudies",
    name: "Sip Studies",
    category: "Own",
    homepage: "https://substack.com/@sipstudies",
    supportedBeverageTypes: ["Wine", "Spirits", "Beer", "Sake", "General"],
    edgeSource: "sipstudies",
    feedUrl: "https://sipstudies.substack.com/feed"
  },
  {
    id: "reg-usa-ttb",
    name: "USA - TTB Press Room",
    category: "Regulators",
    homepage: "https://www.ttb.gov/public-information/press-room/news-and-events",
    supportedBeverageTypes: ["Wine", "Spirits", "Beer", "General"],
    edgeSource: "ttb-news"
  },
  {
    id: "reg-fr-inao",
    name: "France - INAO Actualites",
    category: "Regulators",
    homepage: "https://www.inao.gouv.fr/en/actualites",
    supportedBeverageTypes: ["Wine", "General"],
    edgeSource: "inao-news"
  },
  {
    id: "reg-eu-cap-news",
    name: "EU - Agriculture News (filtered)",
    category: "Regulators",
    homepage:
      "https://agriculture.ec.europa.eu/media/news_en?f%5B0%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/11&f%5B1%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/568&f%5B2%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/764&f%5B3%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/1115&f%5B4%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/1788&f%5B5%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/2443&f%5B6%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/2723&f%5B7%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/2842&f%5B8%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/4257&f%5B9%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/4630&f%5B10%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/4713&f%5B11%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/5463&f%5B12%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/5482&f%5B13%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/6308&f%5B14%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/434743",
    supportedBeverageTypes: ["Wine", "General"],
    edgeSource: "eu-agri-news"
  },
  {
    id: "reg-it-masaf-docg",
    name: "Italy - MASAF (DOCG search)",
    category: "Regulators",
    homepage:
      "https://www.masaf.gov.it/flex/cm/FixedPages/Common/Search.v3.php/L/IT/s/1/mime/-/SPE/YTo3OntzOjQ6InRleHQiO2E6MTp7aTowO3M6NDoiZG9jZyI7fXM6NzoiZXhjbHVkZSI7YTowOnt9czozOiJ0YWciO2E6MDp7fXM6MjoidHMiO2E6Mzp7aTowO2k6LTE7aToxO2k6LTE7aToyO047fXM6MTQ6ImNsYXNzaWZpY2F0aW9uIjthOjA6e31zOjQ6Im1pbWUiO2E6MTp7aTowO3M6OToidGV4dC9odG1sIjt9czoxOiJwIjtpOjA7fQ%253D%253D",
    supportedBeverageTypes: ["Wine"],
    edgeSource: "masaf-docg"
  },
  {
    id: "reg-es-vinosdo",
    name: "Spain - VinosDO Noticias",
    category: "Regulators",
    homepage: "https://vinosdo.wine/sala-de-prensa/noticias/",
    supportedBeverageTypes: ["Wine"],
    edgeSource: "vinosdo-news"
  },
  {
    id: "reg-de-vdp",
    name: "Germany - VDP News",
    category: "Regulators",
    homepage: "https://www.vdp.de/en/current-news-and-important-topics-of-the-vdp-at-a-glance",
    supportedBeverageTypes: ["Wine"],
    edgeSource: "vdp-news"
  },
  {
    id: "wine-enthusiast",
    name: "Wine Enthusiast",
    category: "Magazine",
    homepage: "https://www.wineenthusiast.com/culture/",
    supportedBeverageTypes: ["Wine", "Spirits", "Beer", "Sake"],
    edgeSource: "wine-enthusiast",
    feedUrl: "https://www.wineenthusiast.com/feed/",
    wpPostsUrl: "https://www.wineenthusiast.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "decanter",
    name: "Decanter",
    category: "Magazine",
    homepage: "https://www.decanter.com/wine-news/",
    supportedBeverageTypes: ["Wine"],
    edgeSource: "decanter",
    feedUrl: "https://www.decanter.com/wine-news/feed/"
  },
  {
    id: "beer-connoisseur",
    name: "The Beer Connoisseur",
    category: "Magazine",
    homepage: "https://beerconnoisseur.com/department/magazine/",
    supportedBeverageTypes: ["Beer", "Spirits", "General"],
    edgeSource: "beer-connoisseur",
    feedUrl: "https://beerconnoisseur.com/feed/",
    wpPostsUrl: "https://beerconnoisseur.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "whisky-advocate",
    name: "Whisky Advocate",
    category: "Magazine",
    homepage: "https://whiskyadvocate.com/Tag/trending",
    supportedBeverageTypes: ["Spirits", "General"],
    edgeSource: "whisky-advocate",
    feedUrl: "https://whiskyadvocate.com/call/blogs/rss/"
  },
  {
    id: "wine-spectator",
    name: "Wine Spectator",
    category: "Magazine",
    homepage: "https://www.winespectator.com/news",
    supportedBeverageTypes: ["Wine", "General"],
    edgeSource: "wine-spectator"
  },
  {
    id: "connoisseur-magazine",
    name: "Connoisseur Magazine",
    category: "Magazine",
    homepage: "https://www.connoisseurmagazine.co.uk/",
    supportedBeverageTypes: ["Wine", "Spirits", "General"],
    edgeSource: "connoisseur-magazine",
    feedUrl: "https://www.connoisseurmagazine.co.uk/feed/",
    wpPostsUrl: "https://www.connoisseurmagazine.co.uk/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  },
  {
    id: "robert-parker",
    name: "Robert Parker",
    category: "Magazine",
    homepage: "https://www.robertparker.com/more-free-stuff",
    supportedBeverageTypes: ["Wine", "General"],
    edgeSource: "robert-parker"
  },
  {
    id: "vinepair",
    name: "VinePair",
    category: "Magazine",
    homepage: "https://vinepair.com/",
    supportedBeverageTypes: ["Wine", "Spirits", "Beer", "Sake", "General"],
    feedUrl: "https://vinepair.com/feed/",
    wpPostsUrl: "https://vinepair.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt"
  }
];

const REFERENCE_ONLY_MAGAZINE_SOURCES: NewsSource[] = MAGAZINE_NEWS_REFERENCES.filter(
  (reference) => !SOURCES.some((source) => source.id === reference.id)
).map((reference) => ({
  id: reference.id,
  name: reference.name,
  category: "Magazine",
  homepage: reference.url,
  supportedBeverageTypes: ["General"],
  isReferenceOnly: true
}));

const ALL_SOURCES: NewsSource[] = [...SOURCES, ...REFERENCE_ONLY_MAGAZINE_SOURCES];
const FETCHABLE_SOURCES: NewsSource[] = ALL_SOURCES.filter((source) => !source.isReferenceOnly);

const WSET_FALLBACK_ARTICLES: WsetFallbackArticle[] = [
  {
    title: "WSET unveils Laurent-Perrier as new Gold Partner",
    relativeUrl: "/news-events/news/2026/wset-unveils-laurent-perrier-as-new-gold-partner",
    date: "21/01/2026"
  },
  {
    title: "WSET announces new Chair of the Board of Trustees",
    relativeUrl: "/news-events/news/2025/wset-announces-new-chair-of-the-board-of-trustees",
    date: "26/11/2025"
  },
  {
    title: "WSET reveals full wine line-up from 2024/25 Diploma",
    relativeUrl: "/news-events/news/2025/wset-reveals-full-wine-line-up-from-202425-diploma",
    date: "14/08/2025"
  },
  {
    title: "WSET launches refreshed Level 3 Award in Spirits qualification for drinks professionals",
    relativeUrl: "/news-events/news/2025/wset-launches-refreshed-level-3-award-in-spirits-qualification-for-drinks-professionals",
    date: "18/06/2025"
  },
  {
    title: "WSET celebrates its most international class of Diploma graduates",
    relativeUrl: "/news-events/news/2025/wset-celebrates-its-most-international-class-of-diploma-graduates",
    date: "29/04/2025"
  }
];

const MAX_ITEMS_PER_SOURCE = 6;
const MAX_SUMMARY_LENGTH = 220;
const PAGE_SIZE_OPTIONS = [12, 24, 48, 120] as const;
type NewsPageSize = (typeof PAGE_SIZE_OPTIONS)[number];
const MAX_NEWS_PAGE_COUNT = 10;
const SOURCE_FETCH_TIMEOUT_MS = 8000;
const NEWS_CACHE_KEY = "sipstudies:beverage-news:v2";
const NEWS_CACHE_MAX_AGE_MS = 1000 * 60 * 45;
const GUILD_CATEGORY: SourceCategory = "Institution & Guild";
const MAGAZINE_CATEGORY: SourceCategory = "Magazine";
const OWN_CATEGORY: SourceCategory = "Own";
const REGULATOR_CATEGORY: SourceCategory = "Regulators";
const ALL_NEWS_PRESET: FilterPreset = "all-news";
const ALL_GUILDS_PRESET: FilterPreset = "all-guilds";
const ALL_MAGS_PRESET: FilterPreset = "all-mags";
const ALL_REGULATORS_PRESET: FilterPreset = "all-regs";

function toScreenshotUrl(targetUrl: string | undefined): string | undefined {
  if (!targetUrl) {
    return undefined;
  }

  try {
    const parsed = new URL(targetUrl);
    const canonicalTarget = `${parsed.origin}${parsed.pathname}`;
    return `https://image.thum.io/get/width/1200/crop/675/noanimate/${encodeURIComponent(canonicalTarget)}`;
  } catch {
    return undefined;
  }
}

function buildArticleImageCandidates(article: BeverageArticle): string[] {
  const candidates: string[] = [];
  const pushUnique = (value: string | undefined) => {
    if (!value) {
      return;
    }
    const trimmed = value.trim();
    if (!trimmed || candidates.includes(trimmed)) {
      return;
    }
    candidates.push(trimmed);
  };

  pushUnique(article.imageUrl);
  pushUnique(toScreenshotUrl(article.url));
  return candidates;
}

function NewsCardImage({ article }: { article: BeverageArticle }) {
  const candidates = useMemo(() => buildArticleImageCandidates(article), [article]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = candidates[activeIndex];

  if (!activeSrc) {
    return null;
  }

  return (
    <img
      className="news-card-image"
      src={activeSrc}
      alt={article.title}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        setActiveIndex((current) => current + 1);
      }}
    />
  );
}

function toggleSelection(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function toCustomOrAllNews(state: Omit<FilterState, "preset">): FilterState {
  const hasSelectedFilters =
    state.selectedGuildIds.length > 0 ||
    state.selectedMagazineIds.length > 0 ||
    state.selectedBlogIds.length > 0 ||
    state.selectedRegulatorIds.length > 0;
  return {
    preset: hasSelectedFilters ? "custom" : ALL_NEWS_PRESET,
    ...state
  };
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
  }
}

function readNewsCache(): NewsCachePayload | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(NEWS_CACHE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as NewsCachePayload;
    if (!parsed || typeof parsed.savedAt !== "string" || !Array.isArray(parsed.articles) || !parsed.sourceModes) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeNewsCache(payload: NewsCachePayload): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore localStorage write failures.
  }
}

function mergeResults(results: SourceLoadResult[]): BeverageArticle[] {
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

function extractFirstImageUrl(input: string, baseUrl?: string): string | undefined {
  const patterns = [
    /<img[^>]+src=(["'])(?<url>[^"']+)\1/i,
    /<meta[^>]+property=(["'])og:image\1[^>]+content=(["'])(?<url>[^"']+)\2/i
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(input);
    const raw = match?.groups?.url?.trim() ?? "";
    if (!raw) {
      continue;
    }
    try {
      return baseUrl ? new URL(raw, baseUrl).toString() : new URL(raw).toString();
    } catch {
      continue;
    }
  }

  return undefined;
}

function trimSummary(input: string): string {
  if (input.length <= MAX_SUMMARY_LENGTH) {
    return input;
  }
  return `${input.slice(0, MAX_SUMMARY_LENGTH - 1).trim()}...`;
}

function formatDate(dateInput: string): string {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function parseWsetDateToIso(dateInput: string): string {
  const match = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(dateInput);
  if (!match) {
    return dateInput;
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  return new Date(Date.UTC(year, month - 1, day)).toISOString();
}

function inferBeverageTypes(text: string, defaults: BeverageType[]): BeverageType[] {
  const normalized = text.toLowerCase();
  const types: BeverageType[] = [];

  if (/(wine|vineyard|vin|champagne|sommelier|docg|appellation)/.test(normalized)) {
    types.push("Wine");
  }
  if (/(spirit|spirits|whisk|whiskey|whisky|gin|rum|tequila|vodka|brandy|cognac|mezcal)/.test(normalized)) {
    types.push("Spirits");
  }
  if (/(beer|ale|lager|stout|ipa)/.test(normalized)) {
    types.push("Beer");
  }
  if (/(sake)/.test(normalized)) {
    types.push("Sake");
  }

  const deduped = Array.from(new Set(types));
  if (deduped.length) {
    return deduped;
  }
  if (defaults.length) {
    return [defaults[0]];
  }
  return ["General"];
}

function mapArticle(source: NewsSource, article: Omit<BeverageArticle, "sourceName" | "sourceCategory" | "sourceId" | "beverageTypes">) {
  const beverageTypes = inferBeverageTypes(`${article.title} ${article.summary}`, source.supportedBeverageTypes);
  return {
    ...article,
    sourceId: source.id,
    sourceName: source.name,
    sourceCategory: source.category,
    beverageTypes
  } satisfies BeverageArticle;
}

function toRenderedText(value: WpRenderedText | string | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.rendered ?? "";
}

function pickWordPressImage(item: WpPostItem, articleUrl: string): string | undefined {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  const sizedCandidates = media?.media_details?.sizes
    ? Object.values(media.media_details.sizes)
        .map((size) => size?.source_url)
        .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    : [];
  const contentHtml = `${toRenderedText(item.content)} ${toRenderedText(item.excerpt)}`.trim();

  const candidates = [
    item.jetpack_featured_media_url,
    item.featured_media_src_url,
    item.yoast_head_json?.og_image?.[0]?.url,
    media?.source_url,
    ...sizedCandidates,
    extractFirstImageUrl(contentHtml, articleUrl)
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return new URL(candidate, articleUrl).toString();
    } catch {
      continue;
    }
  }

  return undefined;
}

function buildWordPressEndpoint(rawUrl: string): string {
  const endpoint = new URL(rawUrl);
  endpoint.searchParams.set("per_page", String(MAX_ITEMS_PER_SOURCE));
  endpoint.searchParams.set("_embed", "wp:featuredmedia");
  endpoint.searchParams.set(
    "_fields",
    "id,date,title,link,excerpt,content,jetpack_featured_media_url,featured_media_src_url,yoast_head_json,_embedded"
  );
  return endpoint.toString();
}

async function fetchSourceFromWordPress(source: NewsSource): Promise<BeverageArticle[]> {
  if (!source.wpPostsUrl) {
    return [];
  }

  const endpoint = buildWordPressEndpoint(source.wpPostsUrl);
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Could not load ${source.name} WordPress posts.`);
  }

  const payload = (await response.json()) as WpPostItem[];
  const items = Array.isArray(payload) ? payload : [];
  return items.slice(0, MAX_ITEMS_PER_SOURCE).flatMap((item, index) => {
    const link = item.link?.trim() ?? "";
    if (!link) return [];

    const title = stripHtml(toRenderedText(item.title)) || "Untitled";
    const summary = trimSummary(
      stripHtml(toRenderedText(item.excerpt) || toRenderedText(item.content)) || `Latest headline from ${source.name}.`
    );
    const imageUrl = pickWordPressImage(item, link);

    return [
      mapArticle(source, {
        id: `${source.id}-${item.id ?? link}-${index}`,
        title,
        url: link,
        publishedAt: item.date ?? new Date().toISOString(),
        summary,
        imageUrl
      })
    ];
  });
}

async function fetchSourceFromRss2Json(source: NewsSource): Promise<BeverageArticle[]> {
  if (!source.feedUrl) {
    throw new Error(`No feed URL is configured for ${source.name}.`);
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

  return (payload.items ?? []).map((item) =>
    mapArticle(source, {
      id: `${source.id}-${item.guid || item.link}`,
      title: stripHtml(item.title) || "Untitled",
      url: item.link,
      publishedAt: item.pubDate,
      summary: trimSummary(stripHtml(item.description) || "Open the article for full details."),
      imageUrl:
        item.thumbnail ||
        (item.enclosure?.type?.startsWith("image/") ? item.enclosure.link : undefined) ||
        extractFirstImageUrl(item.content || item.description, item.link)
    })
  );
}

async function fetchWsetFromHtml(source: NewsSource): Promise<BeverageArticle[]> {
  if (!source.pageUrl) {
    return [];
  }

  const response = await fetch(source.pageUrl);
  if (!response.ok) {
    throw new Error(`Could not load ${source.name} page.`);
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const cards = Array.from(doc.querySelectorAll("section.uBlogsy_posts_container > article.uBlogsy_post")).slice(
    0,
    MAX_ITEMS_PER_SOURCE
  );

  return cards
    .map((card) => {
      const linkElement = card.querySelector("aside.uBlogsy_post_details h2 a");
      const href = linkElement?.getAttribute("href") ?? "";
      const url = href ? new URL(href, source.homepage).toString() : source.homepage;
      const title = stripHtml(linkElement?.textContent ?? "");
      const imageHref =
        card.querySelector("img")?.getAttribute("src") ??
        card.querySelector("figure img")?.getAttribute("src") ??
        "";
      const imageUrl = imageHref ? new URL(imageHref, source.homepage).toString() : undefined;
      const dateText = stripHtml(card.querySelector(".uBlogsy_post_time")?.textContent ?? "");
      const tags = Array.from(card.querySelectorAll(".blog-tag a"))
        .map((node) => stripHtml(node.textContent ?? ""))
        .filter(Boolean);
      const summary = tags.length
        ? `Tags: ${tags.slice(0, 4).join(", ")}`
        : "Latest headline from WSET News.";

      if (!title) {
        return null;
      }

      return mapArticle(source, {
        id: `${source.id}-${url}`,
        title,
        url,
        publishedAt: parseWsetDateToIso(dateText),
        summary,
        imageUrl
      });
    })
    .filter((article): article is BeverageArticle => article !== null);
}

async function fetchFromEdge(source: NewsSource): Promise<BeverageArticle[]> {
  if (!source.edgeSource) {
    return [];
  }
  const items = await fetchGuildNews(source.edgeSource);
  return items.map((item) =>
    mapArticle(source, {
      id: `${source.id}-${item.id}`,
      title: stripHtml(item.title) || "Untitled",
      url: item.url,
      publishedAt: item.publishedAt,
      summary: trimSummary(stripHtml(item.summary) || `Latest headline from ${source.name}.`),
      imageUrl: item.imageUrl,
      translatedFrom: item.translatedFrom
    })
  );
}

function buildWsetFallback(source: NewsSource): BeverageArticle[] {
  return WSET_FALLBACK_ARTICLES.map((item) =>
    mapArticle(source, {
      id: `${source.id}-${item.relativeUrl}`,
      title: item.title,
      url: new URL(item.relativeUrl, source.homepage).toString(),
      publishedAt: parseWsetDateToIso(item.date),
      summary: "WSET headline (fallback cache)."
    })
  );
}

async function fetchSource(source: NewsSource): Promise<SourceLoadResult> {
  try {
    if (source.wpPostsUrl) {
      const viaWp = await fetchSourceFromWordPress(source);
      if (viaWp.length) {
        return { sourceId: source.id, mode: "loaded", articles: viaWp };
      }
    }
  } catch {
    // continue to next adapter
  }

  try {
    if (source.edgeSource) {
      const viaEdge = await fetchFromEdge(source);
      if (viaEdge.length) {
        return { sourceId: source.id, mode: "loaded", articles: viaEdge };
      }
    }
  } catch {
    // continue to next adapter
  }

  try {
    if (source.parser === "wset-ublogsy" && source.pageUrl) {
      const viaPage = await fetchWsetFromHtml(source);
      if (viaPage.length) {
        return { sourceId: source.id, mode: "loaded", articles: viaPage };
      }
    }
  } catch {
    if (source.id === "wset") {
      return { sourceId: source.id, mode: "fallback", articles: buildWsetFallback(source) };
    }
  }

  try {
    if (source.feedUrl) {
      const viaRss = await fetchSourceFromRss2Json(source);
      if (viaRss.length) {
        return { sourceId: source.id, mode: "loaded", articles: viaRss };
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : `Could not load ${source.name}.`;
    if (source.id === "wset") {
      return { sourceId: source.id, mode: "fallback", articles: buildWsetFallback(source) };
    }
    return { sourceId: source.id, mode: "failed", articles: [], error: message };
  }

  if (source.id === "wset") {
    return { sourceId: source.id, mode: "fallback", articles: buildWsetFallback(source) };
  }
  return { sourceId: source.id, mode: "failed", articles: [], error: `No articles available from ${source.name}.` };
}

export function BeverageNews() {
  const { isRead } = useArticleLibrary();
  const [articles, setArticles] = useState<BeverageArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [articlesPerPage, setArticlesPerPage] = useState<NewsPageSize>(12);
  const [page, setPage] = useState<number>(0);
  const [readingFilter, setReadingFilter] = useState<"all" | "unread">("all");
  const [filters, setFilters] = useState<FilterState>({
    preset: ALL_NEWS_PRESET,
    selectedGuildIds: [],
    selectedMagazineIds: [],
    selectedBlogIds: [],
    selectedRegulatorIds: []
  });
  const [sourceModes, setSourceModes] = useState<Record<string, SourceLoadMode>>({});
  const [studyArticleId, setStudyArticleId] = useState<string | null>(null);
  const [takeaway, setTakeaway] = useState("");
  const [shiftAction, setShiftAction] = useState("");

  useEffect(() => {
    let canceled = false;

    const load = async () => {
      setError(null);
      setWarning(null);
      const cached = readNewsCache();
      const cacheFresh =
        cached && Date.now() - new Date(cached.savedAt).getTime() <= NEWS_CACHE_MAX_AGE_MS && cached.articles.length > 0;

      if (cacheFresh) {
        setArticles(cached.articles);
        setSourceModes(cached.sourceModes);
        setLastUpdated(cached.savedAt);
      }

      setIsLoading(true);
      const liveResults: SourceLoadResult[] = [];
      const hadCachedData = Boolean(cacheFresh);
      const total = FETCHABLE_SOURCES.length;
      let completed = 0;

      const commitProgress = () => {
        const merged = mergeResults(liveResults);
        if (merged.length > 0 || !hadCachedData) {
          setArticles(merged);
          setLastUpdated(new Date().toISOString());
        }
        setSourceModes(buildModeMap(liveResults));
      };

      await Promise.all(
        FETCHABLE_SOURCES.map(async (source) => {
          let result: SourceLoadResult;
          try {
            result = await withTimeout(fetchSource(source), SOURCE_FETCH_TIMEOUT_MS, `${source.name} timed out while loading.`);
          } catch (sourceError) {
            const message =
              sourceError instanceof Error ? sourceError.message : `Could not load ${source.name} right now.`;
            result = { sourceId: source.id, mode: "failed", articles: [], error: message };
          }

          if (canceled) {
            return;
          }

          liveResults.push(result);
          completed += 1;
          if (completed === 1 || completed % 4 === 0 || completed === total) {
            commitProgress();
          }
        })
      );

      if (canceled) {
        return;
      }

      const merged = mergeResults(liveResults);
      const failed = liveResults.filter((result) => result.mode === "failed");
      const modeMap = buildModeMap(liveResults);

      if (merged.length > 0) {
        const savedAt = new Date().toISOString();
        setArticles(merged);
        setLastUpdated(savedAt);
        writeNewsCache({ savedAt, articles: merged, sourceModes: modeMap });
      }

      if (!merged.length && failed.length && !hadCachedData) {
        setError(failed.map((result) => result.error).filter(Boolean).join(" "));
      } else if (merged.length && failed.length) {
        const sourceNames = failed.map(
          (result) => FETCHABLE_SOURCES.find((source) => source.id === result.sourceId)?.name ?? result.sourceId
        );
        setWarning(`Some sources are unavailable right now: ${sourceNames.join(", ")}.`);
      } else if (!merged.length && hadCachedData) {
        setWarning("Showing cached headlines while live sources are temporarily unavailable.");
      }

      setSourceModes(modeMap);
      setIsLoading(false);
    };

    load().catch((loadError) => {
      if (canceled) {
        return;
      }
      const message = loadError instanceof Error ? loadError.message : "Could not load beverage news right now.";
      setError(message);
      setIsLoading(false);
    });

    return () => {
      canceled = true;
    };
  }, [refreshCount]);

  const availableGuilds = useMemo(() => ALL_SOURCES.filter((source) => source.category === GUILD_CATEGORY), []);
  const availableMagazines = useMemo(() => ALL_SOURCES.filter((source) => source.category === MAGAZINE_CATEGORY), []);
  const availableBlogs = useMemo(() => ALL_SOURCES.filter((source) => source.category === OWN_CATEGORY), []);
  const availableRegulators = useMemo(() => ALL_SOURCES.filter((source) => source.category === REGULATOR_CATEGORY), []);
  const selectedReferenceSources = useMemo(
    () => {
      if (filters.preset !== "custom") {
        return [] as NewsSource[];
      }
      const selectedIds = new Set([...filters.selectedMagazineIds, ...filters.selectedRegulatorIds]);
      return [...availableMagazines, ...availableRegulators].filter((source) => source.isReferenceOnly && selectedIds.has(source.id));
    },
    [availableMagazines, availableRegulators, filters.preset, filters.selectedMagazineIds, filters.selectedRegulatorIds]
  );

  const setPreset = (preset: FilterPreset) => {
    setFilters({
      preset,
      selectedGuildIds: [],
      selectedMagazineIds: [],
      selectedBlogIds: [],
      selectedRegulatorIds: []
    });
  };

  const updateCustomFilters = (updater: (current: FilterState) => Omit<FilterState, "preset">) => {
    setFilters((current) => toCustomOrAllNews(updater(current)));
  };

  const sourceFilteredArticles = useMemo(
    () => {
      if (filters.preset === ALL_GUILDS_PRESET) {
        return articles.filter((article) => article.sourceCategory === GUILD_CATEGORY);
      }
      if (filters.preset === ALL_MAGS_PRESET) {
        return articles.filter((article) => article.sourceCategory === MAGAZINE_CATEGORY);
      }
      if (filters.preset === ALL_REGULATORS_PRESET) {
        return articles.filter((article) => article.sourceCategory === REGULATOR_CATEGORY);
      }
      if (filters.preset !== "custom") {
        return articles;
      }

      const selectedSourceIds = new Set<string>([
        ...filters.selectedGuildIds,
        ...filters.selectedMagazineIds,
        ...filters.selectedBlogIds,
        ...filters.selectedRegulatorIds
      ]);
      if (selectedSourceIds.size === 0) {
        return articles;
      }

      return articles.filter((article) => selectedSourceIds.has(article.sourceId));
    },
    [articles, filters]
  );
  const filteredArticles = useMemo(
    () =>
      readingFilter === "unread"
        ? sourceFilteredArticles.filter((article) => !isRead(toArticleSnapshot(article)))
        : sourceFilteredArticles,
    [isRead, readingFilter, sourceFilteredArticles]
  );

  const pageCount = useMemo(
    () => Math.max(1, Math.min(MAX_NEWS_PAGE_COUNT, Math.ceil(filteredArticles.length / articlesPerPage))),
    [articlesPerPage, filteredArticles.length]
  );
  const maxVisibleArticles = useMemo(() => articlesPerPage * MAX_NEWS_PAGE_COUNT, [articlesPerPage]);

  useEffect(() => {
    setPage(0);
  }, [filters, articlesPerPage, readingFilter]);

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  const visibleArticles = useMemo(() => {
    const capped = filteredArticles.slice(0, maxVisibleArticles);
    const start = page * articlesPerPage;
    return capped.slice(start, start + articlesPerPage);
  }, [articlesPerPage, filteredArticles, maxVisibleArticles, page]);
  const studyArticle = useMemo(
    () => articles.find((article) => article.id === studyArticleId) ?? null,
    [articles, studyArticleId]
  );

  const renderPageControls = (position: "top" | "bottom") => (
    <div className="news-page-controls">
      <label className="news-page-size" htmlFor={`news-page-size-${position}`}>
        Articles per page
        <select
          id={`news-page-size-${position}`}
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
          <h2>Beverage News</h2>
          <p>A short read → reflect → apply briefing for beverage students and working professionals.</p>
        </div>
        <button className="btn btn-light" onClick={() => setRefreshCount((value) => value + 1)} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="article-library-toolbar">
        <div className="news-source-strip" role="group" aria-label="Filter Beverage News by reading status">
          <button
            className={`news-source-chip ${readingFilter === "all" ? "active" : ""}`}
            type="button"
            aria-pressed={readingFilter === "all"}
            onClick={() => setReadingFilter("all")}
          >
            All articles
          </button>
          <button
            className={`news-source-chip ${readingFilter === "unread" ? "active" : ""}`}
            type="button"
            aria-pressed={readingFilter === "unread"}
            onClick={() => setReadingFilter("unread")}
          >
            Unread
          </button>
        </div>
        <ArticleFavoritesLink />
      </div>

      <article className="journal-card" aria-labelledby="beverage-news-study-title">
        <p className="checkout-eyebrow">Today’s learning loop</p>
        <h3 id="beverage-news-study-title">{studyArticle ? studyArticle.title : "Choose one headline, not the whole feed"}</h3>
        {studyArticle ? (
          <>
            <p>{studyArticle.summary}</p>
            <div className="journal-form-grid">
              <label className="journal-row">What changed or surprised you?<textarea rows={2} value={takeaway} onChange={(event) => setTakeaway(event.target.value)} /></label>
              <label className="journal-row">What will you verify, explain, or do on shift?<textarea rows={2} value={shiftAction} onChange={(event) => setShiftAction(event.target.value)} /></label>
            </div>
            <p className="hint">Finish by checking the original source, then turn your note into a question for Quiz, Roleplay Lab, or your tasting group.</p>
          </>
        ) : (
          <p>Scan the first few cards, pick the story most relevant to service, study, or buying, and capture one usable takeaway.</p>
        )}
      </article>

      <details>
        <summary>Filter by publication or institution</summary>
      <div className="news-filter-group">
        <p className="news-filter-label">Blog</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_NEWS_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_NEWS_PRESET)}
          >
            All News
          </button>
          {availableBlogs.map((source) => {
            const mode = sourceModes[source.id];
            const statusSuffix = mode === "fallback" ? " (cached)" : "";
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedBlogIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedGuildIds: current.selectedGuildIds,
                    selectedMagazineIds: current.selectedMagazineIds,
                    selectedBlogIds: toggleSelection(current.selectedBlogIds, source.id),
                    selectedRegulatorIds: current.selectedRegulatorIds
                  }))
                }
              >
                {source.name}
                {statusSuffix}
              </button>
            );
          })}
        </div>
      </div>

      <div className="news-filter-group">
        <p className="news-filter-label">Guild</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_GUILDS_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_GUILDS_PRESET)}
          >
            All Guilds
          </button>
          {availableGuilds.map((source) => {
            const mode = sourceModes[source.id];
            const statusSuffix = mode === "fallback" ? " (cached)" : "";
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedGuildIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedGuildIds: toggleSelection(current.selectedGuildIds, source.id),
                    selectedMagazineIds: current.selectedMagazineIds,
                    selectedBlogIds: current.selectedBlogIds,
                    selectedRegulatorIds: current.selectedRegulatorIds
                  }))
                }
              >
                {source.name}
                {statusSuffix}
              </button>
            );
          })}
        </div>
      </div>
      <div className="news-filter-group">
        <p className="news-filter-label">Regulators</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_REGULATORS_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_REGULATORS_PRESET)}
          >
            All Regulators
          </button>
          {availableRegulators.map((source) => {
            const mode = sourceModes[source.id];
            const statusSuffix = source.isReferenceOnly ? " (reference)" : mode === "fallback" ? " (cached)" : "";
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedRegulatorIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedGuildIds: current.selectedGuildIds,
                    selectedMagazineIds: current.selectedMagazineIds,
                    selectedBlogIds: current.selectedBlogIds,
                    selectedRegulatorIds: toggleSelection(current.selectedRegulatorIds, source.id)
                  }))
                }
              >
                {source.name}
                {statusSuffix}
              </button>
            );
          })}
        </div>
      </div>
      <div className="news-filter-group">
        <p className="news-filter-label">Magazine</p>
        <div className="news-source-strip">
          <button
            type="button"
            className={`news-source-chip ${filters.preset === ALL_MAGS_PRESET ? "active" : ""}`}
            onClick={() => setPreset(ALL_MAGS_PRESET)}
          >
            All Mags
          </button>
          {availableMagazines.map((source) => {
            const mode = sourceModes[source.id];
            const statusSuffix = source.isReferenceOnly ? " (reference)" : mode === "fallback" ? " (cached)" : "";
            return (
              <button
                key={source.id}
                type="button"
                className={`news-source-chip ${filters.preset === "custom" && filters.selectedMagazineIds.includes(source.id) ? "active" : ""}`}
                onClick={() =>
                  updateCustomFilters((current) => ({
                    selectedGuildIds: current.selectedGuildIds,
                    selectedMagazineIds: toggleSelection(current.selectedMagazineIds, source.id),
                    selectedBlogIds: current.selectedBlogIds,
                    selectedRegulatorIds: current.selectedRegulatorIds
                  }))
                }
              >
                {source.name}
                {statusSuffix}
              </button>
            );
          })}
        </div>
      </div>
      {selectedReferenceSources.length > 0 ? (
        <p className="hint">
          Selected references are not wired for live ingestion yet:{" "}
          {selectedReferenceSources.map((source, index) => (
            (() => {
              const safeHomepage = safeHttpUrl(source.homepage);
              return (
                <span key={source.id}>
                  {index > 0 ? ", " : ""}
                  {safeHomepage ? (
                    <a href={safeHomepage} target="_blank" rel="noreferrer">
                      {source.name}
                    </a>
                  ) : (
                    <span>{source.name}</span>
                  )}
                </span>
              );
            })()
          ))}
          .
        </p>
      ) : null}
      </details>

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
          (() => {
            const safeArticleUrl = safeHttpUrl(article.url);
            const articleSnapshot = toArticleSnapshot(article);
            return (
              <article className={`news-card ${isRead(articleSnapshot) ? "is-read" : ""}`} key={article.id}>
                <NewsCardImage article={article} />
                <p className="news-card-tag">{article.sourceCategory}</p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <p className="news-card-meta">
                  {article.sourceName} | {formatDate(article.publishedAt)}
                  {article.translatedFrom ? ` | translated from ${article.translatedFrom.toUpperCase()}` : ""}
                </p>
                <ArticleActions article={articleSnapshot} />
                {safeArticleUrl ? (
                  <div className="journal-actions article-primary-actions">
                    <button className="btn btn-primary" type="button" onClick={() => { setStudyArticleId(article.id); setTakeaway(""); setShiftAction(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      Study this headline
                    </button>
                    <ArticleReadLink article={articleSnapshot} className="btn btn-light news-link" href={safeArticleUrl}>
                      Read source
                    </ArticleReadLink>
                  </div>
                ) : (
                  <button className="btn btn-primary" type="button" onClick={() => setStudyArticleId(article.id)}>Study summary</button>
                )}
              </article>
            );
          })()
        ))}
      </div>

      {renderPageControls("bottom")}
    </section>
  );
}
