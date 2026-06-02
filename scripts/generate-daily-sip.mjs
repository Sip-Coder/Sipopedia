import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();
const OUTPUT_PATH = path.join(REPO_ROOT, "src", "data", "dailySip.ts");
const REVIEW_DIR = path.join(REPO_ROOT, "review", "daily-sip");
const PUBLIC_DAILY_SIP_DIR = path.join(REPO_ROOT, "public", "daily-sip");
const TOP_ARTICLE_COUNT = 20;
const MAX_ITEMS_PER_SOURCE = 12;
const MAX_ARTICLES_PER_SOURCE = 3;
const CATEGORY_SEED_MAX_AGE_DAYS = 365;
const FETCH_TIMEOUT_MS = 18000;
const MIN_REQUIRED_ARTICLES = 20;
const EDITORIAL_STANDARD_VERSION =
  process.env.DAILY_SIP_EDITORIAL_STANDARD || "daily-sip-avant-garde-v2-2026-05";

const SOURCES = [
  {
    id: "wine-enthusiast",
    name: "Wine Enthusiast",
    category: "Wine",
    wpUrl: "https://www.wineenthusiast.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt,content,jetpack_featured_media_url,featured_media_src_url,yoast_head_json"
  },
  {
    id: "decanter",
    name: "Decanter",
    category: "Wine",
    rssUrl: "https://www.decanter.com/wine-news/feed/"
  },
  {
    id: "the-drinks-business",
    name: "The Drinks Business",
    category: "Market",
    rssUrl: "https://www.thedrinksbusiness.com/feed/"
  },
  {
    id: "vinepair",
    name: "VinePair",
    category: "Market",
    wpUrl: "https://vinepair.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt,content"
  },
  {
    id: "brewers-association",
    name: "Brewers Association",
    category: "Beer",
    wpUrl: "https://www.brewersassociation.org/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt,content"
  },
  {
    id: "beer-connoisseur",
    name: "The Beer Connoisseur",
    category: "Beer",
    wpUrl: "https://beerconnoisseur.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt,content"
  },
  {
    id: "good-beer-hunting",
    name: "Good Beer Hunting",
    category: "Beer",
    rssUrl: "https://www.goodbeerhunting.com/sightlines?format=rss"
  },
  {
    id: "whisky-advocate",
    name: "Whisky Advocate",
    category: "Spirits",
    rssUrl: "https://whiskyadvocate.com/call/blogs/rss/"
  },
  {
    id: "the-spirits-business",
    name: "The Spirits Business",
    category: "Spirits",
    rssUrl: "https://www.thespiritsbusiness.com/feed/"
  },
  {
    id: "sca-news",
    name: "Specialty Coffee Association",
    category: "Coffee",
    rssUrl: "https://sca.coffee/sca-news?format=rss"
  },
  {
    id: "daily-coffee-news",
    name: "Daily Coffee News",
    category: "Coffee",
    rssUrl: "https://dailycoffeenews.com/feed/"
  },
  {
    id: "world-coffee-research",
    name: "World Coffee Research",
    category: "Coffee",
    rssUrl: "https://worldcoffeeresearch.org/news?format=rss"
  },
  {
    id: "tea-biz",
    name: "Tea Biz",
    category: "Tea",
    rssUrl: "https://tea-biz.com/feed/"
  },
  {
    id: "beverage-industry-tea-coffee",
    name: "Beverage Industry Tea and Coffee",
    category: "Tea",
    rssUrl: "https://www.bevindustry.com/rss/topic/2242-tea-and-coffee"
  },
  {
    id: "tea-masters",
    name: "Tea Masters",
    category: "Tea",
    rssUrl: "https://teamasters.org/feed/"
  },
  {
    id: "ttb",
    name: "Alcohol and Tobacco Tax and Trade Bureau",
    category: "Regulation",
    pageUrl: "https://www.ttb.gov/public-information/press-room/news-and-events",
    hrefPattern: /href="(?<href>[^"]+)"[^>]*>\s*(?<title>[^<]*(?:TTB|alcohol|wine|beer|spirits|tax|trade|rule|permit|label)[^<]*)</gi,
    excludeTitlePattern: /^(TTB Press Room|Report Fraud|News and Events|Subscribe|Contact|About TTB)$/i
  },
  {
    id: "eu-agriculture",
    name: "European Commission Agriculture News",
    category: "Regulation",
    pageUrl: "https://agriculture.ec.europa.eu/media/news_en",
    hrefPattern: /href="(?<href>[^"]+)"[^>]*>\s*(?<title>[^<]*(?:wine|spirits|beer|agriculture|geographical|market|trade)[^<]*)</gi
  }
];

const CATEGORY_ORDER = ["Wine", "Beer", "Spirits", "Coffee", "Tea", "Regulation", "Market", "Sake", "General"];
const DATE_ARG_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const KEYWORD_RULES = [
  {
    label: "regulatory pressure",
    regex: /\b(tax|tariff|duty|regulation|rule|law|legislation|mandatory|warning|ban|permit|label|labeling|appellation|geographical indication|gi|compliance|ttb|fda|eu|commission)\b/i,
    score: 18
  },
  {
    label: "demand and pricing",
    regex: /\b(sales|revenue|volume|pricing|price|consumer|demand|premium|value|growth|decline|market share|category)\b/i,
    score: 16
  },
  {
    label: "supply risk",
    regex: /\b(climate|drought|frost|wildfire|harvest|crop|yield|shortage|supply|logistics|shipping|inventory)\b/i,
    score: 15
  },
  {
    label: "consolidation",
    regex: /\b(acquisition|merger|investment|funding|loan|facility|bankrupt|closure|ipo|private equity|distribution deal)\b/i,
    score: 15
  },
  {
    label: "product innovation",
    regex: /\b(low alcohol|no alcohol|non-alcoholic|rtd|ready-to-drink|canned|seltzer|functional|innovation|launch|new product)\b/i,
    score: 13
  },
  {
    label: "education and labor",
    regex: /\b(certification|education|training|competition|sommelier|barista|brewer|bartender|hospitality|labor|workforce)\b/i,
    score: 10
  }
];

const ENTITY_DECODER = {
  amp: "&",
  nbsp: " ",
  quot: '"',
  apos: "'",
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
  ndash: "-",
  mdash: "-",
  hellip: "..."
};

function getArgValue(name) {
  const prefix = `--${name}=`;
  const inlineValue = process.argv.find((arg) => arg.startsWith(prefix));
  if (inlineValue) return inlineValue.slice(prefix.length);

  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function getReportDate() {
  const dateArg = getArgValue("date") ?? process.env.DAILY_SIP_DATE;
  if (!dateArg) {
    return {
      dateKey: new Date().toISOString().slice(0, 10),
      generatedAt: new Date().toISOString(),
      referenceTimeMs: Date.now()
    };
  }

  if (!DATE_ARG_PATTERN.test(dateArg)) {
    throw new Error(`--date must use YYYY-MM-DD format. Received: ${dateArg}`);
  }

  const generatedAt = `${dateArg}T12:00:00.000Z`;
  const referenceTimeMs = new Date(`${dateArg}T23:59:59.999Z`).getTime();
  if (Number.isNaN(referenceTimeMs)) {
    throw new Error(`Could not parse --date value: ${dateArg}`);
  }

  return {
    dateKey: dateArg,
    generatedAt,
    referenceTimeMs
  };
}

function decodeEntities(input = "") {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, value) => String.fromCharCode(Number(value)))
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCharCode(Number.parseInt(value, 16)))
    .replace(/&([a-z]+);/gi, (_, value) => ENTITY_DECODER[value.toLowerCase()] ?? `&${value};`);
}

function toAscii(input = "") {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00a3/g, "GBP")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x09\x0a\x0d\x20-\x7e]/g, "");
}

function stripHtml(input = "") {
  return toAscii(decodeEntities(input)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function trimSummary(input, maxLength = 260) {
  const normalized = stripHtml(input);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3).trim()}...`;
}

function normalizeUrl(rawUrl, baseUrl) {
  try {
    return new URL(decodeEntities(rawUrl).trim(), baseUrl).toString();
  } catch {
    return "";
  }
}

function tagValue(block, tagName) {
  const match = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i").exec(block);
  return stripHtml(match?.[1] ?? "");
}

function tagAttribute(block, tagName, attributeName) {
  const tagMatch = new RegExp(`<${tagName}\\b([^>]*)>`, "i").exec(block);
  if (!tagMatch) return "";
  const attrMatch = new RegExp(`${attributeName}=(["'])(.*?)\\1`, "i").exec(tagMatch[1]);
  return decodeEntities(attrMatch?.[2] ?? "").trim();
}

function sourceFetchHeaders() {
  return {
    Accept: "application/rss+xml, application/xml, application/json, text/html;q=0.9, */*;q=0.8",
    "User-Agent": "SipStudiesDailySip/1.0 (+https://sipopedia.com/#app/flavor-blog)"
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: sourceFetchHeaders(),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.text();
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: sourceFetchHeaders(),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}

function parseDate(value) {
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date.toISOString();
  return new Date().toISOString();
}

function parseDateFromText(value) {
  const monthPattern =
    "(January|February|March|April|May|June|July|August|September|October|November|December|Jan\\.?|Feb\\.?|Mar\\.?|Apr\\.?|Jun\\.?|Jul\\.?|Aug\\.?|Sep\\.?|Sept\\.?|Oct\\.?|Nov\\.?|Dec\\.?)";
  const match = new RegExp(`${monthPattern}\\s+\\d{1,2},?\\s+\\d{4}`, "i").exec(value);
  return match ? parseDate(match[0]) : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString();
}

async function fetchWordPressSource(source) {
  const endpoint = new URL(source.wpUrl);
  endpoint.searchParams.set("per_page", String(MAX_ITEMS_PER_SOURCE));
  const payload = await fetchJson(endpoint.toString());
  const items = Array.isArray(payload) ? payload : [];

  return items.slice(0, MAX_ITEMS_PER_SOURCE).flatMap((item, index) => {
    const url = typeof item.link === "string" ? item.link.trim() : "";
    if (!url) return [];
    const title = stripHtml(typeof item.title === "string" ? item.title : item.title?.rendered ?? "");
    const summary = trimSummary(item.excerpt?.rendered ?? item.content?.rendered ?? `Latest article from ${source.name}.`);
    if (!title) return [];
    return [
      {
        id: `${source.id}-${item.id ?? index}`,
        sourceId: source.id,
        sourceName: source.name,
        category: source.category,
        title,
        url,
        publishedAt: parseDate(item.date),
        summary
      }
    ];
  });
}

function parseRssItems(source, xmlText) {
  const itemBlocks = xmlText.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const atomBlocks = itemBlocks.length ? [] : xmlText.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  const blocks = itemBlocks.length ? itemBlocks : atomBlocks;

  return blocks.slice(0, MAX_ITEMS_PER_SOURCE).flatMap((block, index) => {
    const isAtom = !itemBlocks.length;
    const rawLink = isAtom ? tagAttribute(block, "link", "href") || tagValue(block, "link") : tagValue(block, "link");
    const url = normalizeUrl(rawLink, source.rssUrl);
    const title = tagValue(block, "title");
    const summary = trimSummary(tagValue(block, "description") || tagValue(block, "summary") || tagValue(block, "content:encoded"));
    const publishedAt = parseDate(tagValue(block, "pubDate") || tagValue(block, "published") || tagValue(block, "updated"));
    if (!title || !url) return [];
    return [
      {
        id: `${source.id}-${url || index}`,
        sourceId: source.id,
        sourceName: source.name,
        category: source.category,
        title,
        url,
        publishedAt,
        summary: summary || `Latest article from ${source.name}.`
      }
    ];
  });
}

async function fetchRssSource(source) {
  const xmlText = await fetchText(source.rssUrl);
  return parseRssItems(source, xmlText);
}

async function fetchPageSource(source) {
  const html = await fetchText(source.pageUrl);
  const articles = [];
  let match;
  while ((match = source.hrefPattern.exec(html)) !== null && articles.length < MAX_ITEMS_PER_SOURCE) {
    const title = stripHtml(match.groups?.title ?? "");
    const url = normalizeUrl(match.groups?.href ?? "", source.pageUrl);
    if (source.excludeTitlePattern?.test(title)) continue;
    if (!title || !url) continue;
    articles.push({
      id: `${source.id}-${url}`,
      sourceId: source.id,
      sourceName: source.name,
      category: source.category,
      title,
      url,
      publishedAt: parseDateFromText(title),
      summary: `Latest regulatory or market update from ${source.name}.`
    });
  }
  return articles;
}

async function fetchSource(source) {
  if (source.wpUrl) return await fetchWordPressSource(source);
  if (source.rssUrl) return await fetchRssSource(source);
  if (source.pageUrl) return await fetchPageSource(source);
  return [];
}

function inferCategory(article) {
  const text = `${article.title} ${article.summary} ${article.sourceName}`.toLowerCase();
  if (/\b(ttb|regulation|rule|tax|tariff|label|permit|law|commission|geographical indication|gi)\b/.test(text)) return "Regulation";
  if (/\b(coffee|barista|espresso|arabica|robusta|roaster)\b/.test(text)) return "Coffee";
  if (/\b(tea|oolong|matcha|sencha|chai)\b/.test(text)) return "Tea";
  if (/\b(beer|brewery|brewer|lager|ale|ipa|stout)\b/.test(text)) return "Beer";
  if (/\b(whisky|whiskey|spirits|gin|rum|tequila|vodka|brandy|mezcal|cocktail)\b/.test(text)) return "Spirits";
  if (/\b(wine|vineyard|winery|grape|champagne|sommelier|appellation)\b/.test(text)) return "Wine";
  return article.category ?? "General";
}

function isFutureArticle(article, referenceTimeMs) {
  const date = new Date(article.publishedAt);
  return !Number.isNaN(date.getTime()) && date.getTime() > referenceTimeMs;
}

function articleScore(article, referenceTimeMs) {
  const text = `${article.title} ${article.summary}`;
  const date = new Date(article.publishedAt);
  const ageDays = Number.isNaN(date.getTime()) ? 30 : Math.max(0, (referenceTimeMs - date.getTime()) / 86400000);
  const recencyScore = Math.max(0, 35 - ageDays * 1.5);
  const keywordScore = KEYWORD_RULES.reduce((total, rule) => total + (rule.regex.test(text) ? rule.score : 0), 0);
  const categoryScore = article.category === "Regulation" || article.category === "Market" ? 8 : 5;
  return recencyScore + keywordScore + categoryScore;
}

function articleAgeDays(article, referenceTimeMs) {
  const date = new Date(article.publishedAt);
  return Number.isNaN(date.getTime()) ? Number.POSITIVE_INFINITY : Math.max(0, (referenceTimeMs - date.getTime()) / 86400000);
}

function normalizeKey(article) {
  return `${article.url.replace(/\/+$/, "").toLowerCase()}|${article.title.toLowerCase()}`;
}

function uniqueArticles(articles) {
  const seen = new Set();
  return articles.filter((article) => {
    const key = normalizeKey(article);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function chooseTopArticles(articles, referenceTimeMs) {
  const scored = uniqueArticles(articles)
    .filter((article) => !isFutureArticle(article, referenceTimeMs))
    .map((article) => ({
      ...article,
      category: inferCategory(article),
      score: articleScore(article, referenceTimeMs)
    }))
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const selectedKeys = new Set();
  const selectedSourceCounts = new Map();
  const add = (article) => {
    const key = normalizeKey(article);
    if (selectedKeys.has(key) || selected.length >= TOP_ARTICLE_COUNT) return;
    const sourceCount = selectedSourceCounts.get(article.sourceName) ?? 0;
    if (sourceCount >= MAX_ARTICLES_PER_SOURCE) return;
    selected.push(article);
    selectedKeys.add(key);
    selectedSourceCounts.set(article.sourceName, sourceCount + 1);
  };

  for (const category of CATEGORY_ORDER) {
    scored
      .filter((article) => article.category === category && articleAgeDays(article, referenceTimeMs) <= CATEGORY_SEED_MAX_AGE_DAYS)
      .slice(0, 2)
      .forEach(add);
  }

  scored.forEach(add);

  return selected
    .slice(0, TOP_ARTICLE_COUNT)
    .sort((a, b) => b.score - a.score)
    .map((article, index) => ({
      rank: index + 1,
      title: article.title,
      sourceName: article.sourceName,
      category: article.category,
      publishedAt: article.publishedAt,
      url: article.url,
      summary: buildPlainSummary(article),
      whyItMatters: buildWhyItMatters(article),
      marketImpact: buildMarketImpact(article)
    }));
}

function matchingRules(article) {
  const text = `${article.title} ${article.summary}`;
  return KEYWORD_RULES.filter((rule) => rule.regex.test(text)).map((rule) => rule.label);
}

function firstReadableSentence(input) {
  const cleaned = trimSummary(input, 180)
    .replace(/\s+/g, " ")
    .replace(/\s+\.\.\.$/, "...")
    .trim();
  if (!cleaned || /^latest article from/i.test(cleaned)) return "";

  const protectedText = cleaned
    .replace(/\bU\.S\./g, "U<dot>S<dot>")
    .replace(/\bU\.K\./g, "U<dot>K<dot>")
    .replace(/\bE\.U\./g, "E<dot>U<dot>")
    .replace(/\bNo\./g, "No<dot>")
    .replace(/\bDr\./g, "Dr<dot>")
    .replace(/\bMr\./g, "Mr<dot>")
    .replace(/\bMs\./g, "Ms<dot>");
  const sentence = (/(.+?[.!?])(?:\s|$)/.exec(protectedText)?.[1] ?? protectedText).replace(/<dot>/g, ".");
  return sentence.length > 180 ? `${sentence.slice(0, 177).trim()}...` : sentence;
}

function simpleMarketSignal(article) {
  const text = `${article.title} ${article.summary}`.toLowerCase();
  if (/\b(tax|tariff|duty|regulation|rule|law|legislation|mandatory|warning|ban|permit|label|compliance|ttb|commission)\b/.test(text)) {
    return "Regulatory pressure is the signal: labels, warnings, taxes, or trade rules may alter cost, access, or compliance work.";
  }
  if (/\b(acquisition|merger|investment|funding|loan|facility|bankrupt|closure|distribution deal)\b/.test(text)) {
    return "Capital is the signal: ownership, funding, or distribution shifts can change who gets reach and negotiating power.";
  }
  if (/\b(climate|drought|frost|wildfire|harvest|crop|yield|shortage|supply|inventory)\b/.test(text)) {
    return "Supply is the signal: weather, harvest, inventory, or logistics pressure may show up later as price or availability changes.";
  }
  if (/\b(price|pricing|sales|revenue|volume|consumer|demand|premium|value|growth|decline|market share)\b/.test(text)) {
    return "Demand is the signal: pricing, volume, and consumer behavior indicate where the market is spending, hesitating, or trading across tiers.";
  }
  if (/\b(low alcohol|no alcohol|non-alcoholic|rtd|ready-to-drink|canned|functional|innovation|launch|new product)\b/.test(text)) {
    return "Format is the signal: the launch or category move tests whether a new occasion can become repeat demand.";
  }
  if (/\b(certification|education|training|competition|sommelier|barista|brewer|bartender|hospitality|labor|workforce|survey|report)\b/.test(text)) {
    return "People are the signal: training, labor, and education stories often change how teams explain the category on the floor.";
  }
  return `Category signal: watch whether this ${article.category.toLowerCase()} story changes buying, training, menu language, or customer questions.`;
}

function buildPlainSummary(article) {
  const readableSentence = firstReadableSentence(article.summary);
  const attribution = `${article.sourceName} reports: ${article.title}.`;
  if (readableSentence && !readableSentence.endsWith("...") && readableSentence.toLowerCase() !== article.title.toLowerCase()) {
    return `${attribution} Context: ${readableSentence} ${simpleMarketSignal(article)}`;
  }

  return `${attribution} ${simpleMarketSignal(article)}`;
}

function buildWhyItMatters(article) {
  const text = `${article.title} ${article.summary}`.toLowerCase();
  if (/\b(tax|tariff|duty|regulation|rule|law|legislation|mandatory|warning|ban|permit|label|compliance|ttb|commission)\b/.test(text)) {
    return "Follow the operational burden first: producers, importers, retailers, or restaurants may need to adjust before customers see the change.";
  }
  if (/\b(acquisition|merger|investment|funding|loan|facility|bankrupt|closure|distribution deal)\b/.test(text)) {
    return "Capital movement can reshape distribution leverage, category visibility, and the room smaller producers have to compete.";
  }
  if (/\b(climate|drought|frost|wildfire|harvest|crop|yield|shortage|supply|inventory)\b/.test(text)) {
    return "Supply pressure matters before it becomes obvious: buyers may need alternatives, flexible pricing, or clearer substitution language.";
  }
  if (/\b(price|pricing|sales|revenue|volume|consumer|demand|premium|value|growth|decline|market share)\b/.test(text)) {
    return "Demand data is useful when it shows whether guests are trading up, trading down, or simply moving to a different occasion.";
  }
  if (/\b(low alcohol|no alcohol|non-alcoholic|rtd|ready-to-drink|canned|functional|innovation|launch|new product)\b/.test(text)) {
    return "New formats deserve attention when they reveal a repeatable use case, not just a launch cycle.";
  }
  if (/\b(certification|education|training|competition|sommelier|barista|brewer|bartender|hospitality|labor|workforce|survey|report)\b/.test(text)) {
    return "Education and labor stories change the human layer: training, service confidence, hiring, and how teams talk about drinks.";
  }
  return `It keeps the ${article.category.toLowerCase()} signal visible without turning a single article into a verdict.`;
}

function buildMarketImpact(article) {
  const text = `${article.title} ${article.summary}`.toLowerCase();
  if (/\b(tax|tariff|duty|regulation|rule|law|legislation|mandatory|warning|ban|permit|label|compliance|ttb|commission)\b/.test(text)) {
    return "Compliance timelines, label language, import friction, and whether operators need new staff talking points.";
  }
  if (/\b(acquisition|merger|investment|funding|loan|facility|bankrupt|closure|distribution deal)\b/.test(text)) {
    return "Distribution gains, portfolio changes, retail/menu placement, and whether smaller competitors lose visibility.";
  }
  if (/\b(climate|drought|frost|wildfire|harvest|crop|yield|shortage|supply|inventory)\b/.test(text)) {
    return "Allocation changes, substitute products, by-the-glass pricing, and how transparently buyers explain scarcity.";
  }
  if (/\b(price|pricing|sales|revenue|volume|consumer|demand|premium|value|growth|decline|market share)\b/.test(text)) {
    return "Whether the numbers shift actual buying, shelf space, menu design, training time, or promotion strategy.";
  }
  if (/\b(low alcohol|no alcohol|non-alcoholic|rtd|ready-to-drink|canned|functional|innovation|launch|new product)\b/.test(text)) {
    return "Repeat purchase, margin, occasion fit, and whether the format survives after launch attention fades.";
  }
  return "Customer questions, category training needs, and whether the signal repeats across independent sources.";
}

function summarizeTheme(title, articles, fallbackBody) {
  if (!articles.length) {
    return { title, body: fallbackBody };
  }
  const sources = Array.from(new Set(articles.slice(0, 4).map((article) => article.sourceName))).join(", ");
  const lead = articles.length === 1 ? "1 ranked story sits" : `${articles.length} ranked stories sit`;
  return {
    title,
    body: `${lead} here, led by ${sources}. Treat the pattern as a signal, not a conclusion; test it against price, availability, compliance, shelf space, menus, and staff language.`
  };
}

function buildThemes(topArticles) {
  return [
    summarizeTheme(
      "Rules rewrite the shelf",
      topArticles.filter((article) => /\bregulat|tax|tariff|duty|label|permit|law|commission|ttb\b/i.test(`${article.title} ${article.summary}`)),
      "Rules were not the dominant signal today, but one rule can still alter labels, imports, costs, and customer messaging."
    ),
    summarizeTheme(
      "Demand splits into smaller occasions",
      topArticles.filter((article) => /\bsales|consumer|demand|premium|value|growth|decline|rtd|non-alcoholic|launch\b/i.test(`${article.title} ${article.summary}`)),
      "Demand signals were broad rather than concentrated, so operators should stay flexible across formats, price points, and use cases."
    ),
    summarizeTheme(
      "Supply sets the tempo",
      topArticles.filter((article) => /\bclimate|drought|frost|wildfire|harvest|crop|yield|shortage|supply\b/i.test(`${article.title} ${article.summary}`)),
      "Supply risk was not the dominant signal today, but it remains one of the clearest reasons prices and substitutions change."
    ),
    summarizeTheme(
      "Capital moves the room",
      topArticles.filter((article) => /\bacquisition|merger|investment|funding|loan|facility|bankrupt|closure|distribution deal\b/i.test(`${article.title} ${article.summary}`)),
      "Capital movement was not the lead signal today, but it can quickly reshape distribution, visibility, and category control."
    )
  ];
}

function buildExecutiveSummary(topArticles, fetchedSourceCount) {
  const categories = Array.from(new Set(topArticles.map((article) => article.category)));
  const topSources = Array.from(new Set(topArticles.slice(0, 6).map((article) => article.sourceName))).join(", ");
  const leadCategories = categories.slice(0, 5).join(", ");
  return [
    `Daily Sip scanned ${fetchedSourceCount} beverage sources and selected ${topArticles.length} stories with clear source attribution, concrete trade relevance, and limited hype.`,
    `Today's strongest signals sit in ${leadCategories || "the broader beverage market"}. The leading source trail begins with ${topSources || "the configured source list"}.`,
    "Editorial stance: launches, awards, investments, and claims are treated as signals, not endorsements. The test is what may change for price, access, labor, compliance, training, or guest language."
  ];
}

function buildWatchlist(topArticles) {
  const categories = Array.from(new Set(topArticles.map((article) => article.category)));
  return [
    `Watch whether ${categories.slice(0, 3).join(", ") || "today's leading categories"} repeat across the next two scans before calling them trends.`,
    "Check primary sources before changing menu, shelf, pricing, or compliance language.",
    "Separate product launches and awards from independent evidence of demand.",
    "Flag single-source, disputed, or promotional claims for human review before amplifying them."
  ];
}

async function loadExistingReports() {
  try {
    const source = await readFile(OUTPUT_PATH, "utf8");
    const reportsMatch = /export const dailySipReports: DailySipReport\[\] = ([\s\S]*?);\s*(?:export const dailySipReport|$)/.exec(source);
    if (reportsMatch?.[1]) {
      const parsed = JSON.parse(reportsMatch[1]);
      return Array.isArray(parsed) ? parsed : [];
    }

    const reportMatch = /export const dailySipReport: DailySipReport = ([\s\S]*?);\s*$/.exec(source);
    if (reportMatch?.[1]) {
      const parsed = JSON.parse(reportMatch[1]);
      return parsed && typeof parsed === "object" ? [parsed] : [];
    }
  } catch {
    return [];
  }

  return [];
}

function mergeReports(existingReports, nextReport) {
  const reportsById = new Map();
  [...existingReports, nextReport].forEach((report) => {
    if (!report?.id) return;
    reportsById.set(report.id, report);
  });

  return Array.from(reportsById.values()).sort(
    (a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
  );
}

function imageDirectionForReport(report) {
  const dateKey = /\d{4}-\d{2}-(\d{2})$/.exec(report.id)?.[1] ?? "0";
  const index = Number.parseInt(dateKey, 10) % 4;
  const directions = [
    "Composition direction: overhead trade-desk scene with wine glass, beer tulip, spirits tasting glass, coffee cup, tea service, unlabeled bottles/cans, and market notes arranged as a daily briefing.",
    "Composition direction: bar-and-retail planning table with mixed beverage samples, distributor order sheets, shelf tags without readable text, and supply notes, shot from a low editorial angle.",
    "Composition direction: beverage lab and tasting bench with coffee beans, tea leaves, hops, corks, grain, glassware, unlabeled bottles, and simple charts suggesting category comparison.",
    "Composition direction: hospitality back-office scene with menus, inventory clipboard, pricing charts, and a balanced spread of wine, beer, spirits, coffee, and tea cues."
  ];

  return directions[index];
}

function buildHeaderPrompt(report) {
  const lead = report.articles[0];
  const categories = report.coverage?.length ? report.coverage.join(", ") : "wine, beer, spirits, coffee, tea, regulation, and market";
  const supportingStories = report.articles
    .slice(1, 6)
    .map((article) => `${article.category}: ${article.title}`)
    .join("; ");

  if (!lead) {
    return "Editorial multi-beverage industry briefing header photo with wine, beer, spirits, coffee, tea, and market research cues, premium newsroom style, no text, no logos, no watermark.";
  }

  return [
    "Use case: photorealistic-natural",
    "Asset type: wide website article header image",
    `Primary request: Create a realistic editorial photo for Daily Sip ${report.id}, covering the full beverage market rather than only the lead story.`,
    `Lead story cue: ${lead.category} - ${lead.title}.`,
    `Supporting beverage topics to represent subtly: ${supportingStories || "wine, beer, spirits, coffee, tea, regulation, and pricing"}.`,
    `Coverage mix: ${categories}.`,
    "Subject: a source-attributed, unbiased beverage industry briefing across wine, beer, spirits, coffee, tea, regulation, supply, pricing, and consumer-demand signals.",
    `${imageDirectionForReport(report)}`,
    "Scene/backdrop: avant-garde newsroom meets beverage trade desk, refined but restrained, varied category cues, subtle financial research materials, and no single drink category dominating the frame.",
    "Composition/framing: wide 16:9 landscape crop, visually distinct from other Daily Sip headers, balanced foreground objects, usable dark negative space near the top for page overlay if needed.",
    "Lighting/mood: natural window light mixed with polished editorial contrast, sophisticated and current.",
    "Constraints: no readable text, no logos, no brand labels, no people, no watermark, no exact replication of any source photo."
  ].join("\n");
}

function toSourceLiteral(report) {
  const typeHeader = `export type DailySipCategory = "Wine" | "Beer" | "Spirits" | "Coffee" | "Tea" | "Sake" | "Regulation" | "Market" | "General";

export type DailySipItem = {
  rank: number;
  title: string;
  sourceName: string;
  category: DailySipCategory;
  publishedAt: string;
  url: string;
  summary: string;
  whyItMatters: string;
  marketImpact: string;
};

export type DailySipTheme = {
  title: string;
  body: string;
};

export type DailySipReport = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  generatedAt: string;
  headerImageUrl?: string;
  headerImagePrompt?: string;
  sourceCount: number;
  articleCount: number;
  editorialStandard?: string;
  coverage: DailySipCategory[];
  executiveSummary: string[];
  marketThemes: DailySipTheme[];
  watchlist: string[];
  articles: DailySipItem[];
};
`;

  return `${typeHeader}
export const dailySipReports: DailySipReport[] = ${JSON.stringify(report, null, 2)};

export const dailySipReport: DailySipReport = dailySipReports[0];
`;
}

async function main() {
  const reportDate = getReportDate();
  const failures = [];
  const sourceResults = await Promise.all(
    SOURCES.map(async (source) => {
      try {
        const articles = await fetchSource(source);
        return { source, articles };
      } catch (error) {
        failures.push(`${source.name}: ${error instanceof Error ? error.message : String(error)}`);
        return { source, articles: [] };
      }
    })
  );

  const articles = sourceResults.flatMap((result) => result.articles);
  const topArticles = chooseTopArticles(articles, reportDate.referenceTimeMs);
  const fetchedSourceCount = sourceResults.filter((result) => result.articles.length > 0).length;

  if (topArticles.length < MIN_REQUIRED_ARTICLES) {
    const detail = failures.length ? ` Failures: ${failures.join("; ")}` : "";
    throw new Error(`Daily Sip needs ${MIN_REQUIRED_ARTICLES} articles, but only found ${topArticles.length}.${detail}`);
  }

  const generatedAt = reportDate.generatedAt;
  const reportId = `daily-sip-${reportDate.dateKey}`;
  const report = {
    id: reportId,
    slug: "daily-sip",
    title: `Daily Sip: Beverage Market Briefing for ${new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(new Date(generatedAt))}`,
    subtitle:
      "An in-depth Flavor Blog overview of the top 20 beverage industry articles across wine, beer, spirits, coffee, tea, regulation, and adjacent market signals.",
    generatedAt,
    headerImageUrl: `/daily-sip/${reportId}-header.png`,
    sourceCount: fetchedSourceCount,
    articleCount: topArticles.length,
    editorialStandard: EDITORIAL_STANDARD_VERSION,
    coverage: Array.from(new Set(topArticles.map((article) => article.category))).sort(
      (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
    ),
    executiveSummary: buildExecutiveSummary(topArticles, fetchedSourceCount),
    marketThemes: buildThemes(topArticles),
    watchlist: buildWatchlist(topArticles),
    articles: topArticles
  };
  report.headerImagePrompt = buildHeaderPrompt(report);
  const existingReports = await loadExistingReports();
  const reports = mergeReports(existingReports, report);

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await mkdir(REVIEW_DIR, { recursive: true });
  await mkdir(PUBLIC_DAILY_SIP_DIR, { recursive: true });
  await writeFile(OUTPUT_PATH, toSourceLiteral(reports), "utf8");
  await writeFile(path.join(REVIEW_DIR, `daily-sip-${reportDate.dateKey}.json`), `${JSON.stringify(report, null, 2)}\n`, "utf8");

  if (failures.length) {
    await writeFile(path.join(REVIEW_DIR, `daily-sip-${reportDate.dateKey}-source-failures.txt`), `${failures.join("\n")}\n`, "utf8");
  }

  console.log(`Daily Sip refreshed ${reportDate.dateKey} with ${topArticles.length} articles from ${fetchedSourceCount} sources.`);
  if (failures.length) {
    console.log(`Source failures: ${failures.length}. See review/daily-sip for details.`);
  }
}

main().catch((error) => {
  console.error(`generate-daily-sip failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
