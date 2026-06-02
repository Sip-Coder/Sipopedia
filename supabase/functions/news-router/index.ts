type NewsRouterSource =
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
  | "sipstudies-blog"
  | "ttb-news"
  | "inao-news"
  | "eu-agri-news"
  | "masaf-docg"
  | "vinosdo-news"
  | "vdp-news"
  | "openai-news"
  | "deepmind-news"
  | "anthropic-news"
  | "microsoft-ai-news"
  | "xai-news"
  | "nvidia-news"
  | "amd-news"
  | "ai-daily-brief"
  | "venturebeat-ai-news"
  | "verge-ai-news"
  | "lex-fridman-ai-tech"
  | "mit-tech-review-ai-news"
  | "caltech-ai-news";

type NewsRouterRequest = {
  source?: NewsRouterSource;
};

type GuildNewsItem = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
  translatedFrom?: string;
};

type WpPost = {
  id: number;
  date: string;
  link: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  jetpack_featured_media_url?: string;
  featured_image_url?: string;
  yoast_head_json?: {
    og_image?: Array<{ url?: string }>;
  };
};

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN")?.trim() || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const MAX_ITEMS = 8;
const MAX_SIPSTUDIES_ITEMS = 30;
const MAX_SUMMARY_LENGTH = 220;
const FETCH_TIMEOUT_MS = 15_000;
const ARTICLE_IMAGE_FETCH_TIMEOUT_MS = 3_000;

const WSET_NEWS_URL = "https://www.wsetglobal.com/news-events/news/";
const ROBERT_PARKER_API_URL = "https://api.robertparker.com/v2/v2/articles/highlighted?offset=0&limit=8";
const ROBERT_PARKER_API_KEY = Deno.env.get("ROBERT_PARKER_API_KEY") ?? "";
const WINE_SPECTATOR_NEWS_URL = "https://www.winespectator.com/news";
const USBG_NEWS_URL = "https://www.usbg.org/blog/all";
const CICERONE_BLOG_URL = "https://www.cicerone.org/us-en/blog";
const SCA_GLOBAL_EVENTS_URL = "https://sca.coffee/events/global";
const WORLD_OF_COFFEE_URL = "https://www.worldofcoffee.org/";
const BARISTA_GUILD_WELCOME_URL = "https://baristaguild.coffee/welcome";
const BREWERS_ASSOCIATION_WP_URL =
  "https://www.brewersassociation.org/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt&per_page=8";
const SIPSTUDIES_SUBSTACK_FEED_URL = "https://sipstudies.substack.com/feed";
const SIPSTUDIES_BLOG_JSON_URL = "https://www.sipstudies.com/blog?format=json";
const TTB_PRESS_ROOM_URL = "https://www.ttb.gov/public-information/press-room/news-and-events";
const INAO_ACTUALITES_URL = "https://www.inao.gouv.fr/en/actualites";
const EU_AGRI_FILTERED_NEWS_URL =
  "https://agriculture.ec.europa.eu/media/news_en?f%5B0%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/11&f%5B1%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/568&f%5B2%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/764&f%5B3%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/1115&f%5B4%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/1788&f%5B5%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/2443&f%5B6%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/2723&f%5B7%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/2842&f%5B8%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/4257&f%5B9%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/4630&f%5B10%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/4713&f%5B11%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/5463&f%5B12%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/5482&f%5B13%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/6308&f%5B14%5D=oe_news_subject%3Ahttp%3A//data.europa.eu/uxp/434743";
const MASAF_DOCG_SEARCH_URL =
  "https://www.masaf.gov.it/flex/cm/FixedPages/Common/Search.v3.php/L/IT/s/1/mime/-/SPE/YTo3OntzOjQ6InRleHQiO2E6MTp7aTowO3M6NDoiZG9jZyI7fXM6NzoiZXhjbHVkZSI7YTowOnt9czozOiJ0YWciO2E6MDp7fXM6MjoidHMiO2E6Mzp7aTowO2k6LTE7aToxO2k6LTE7aToyO047fXM6MTQ6ImNsYXNzaWZpY2F0aW9uIjthOjA6e31zOjQ6Im1pbWUiO2E6MTp7aTowO3M6OToidGV4dC9odG1sIjt9czoxOiJwIjtpOjA7fQ%253D%253D";
const VINOSDO_NEWS_URL = "https://vinosdo.wine/sala-de-prensa/noticias/";
const VDP_NEWS_URL = "https://www.vdp.de/en/current-news-and-important-topics-of-the-vdp-at-a-glance";
const OPENAI_NEWS_URL = "https://openai.com/news/";
const DEEPMIND_BLOG_URL = "https://deepmind.google/blog/";
const ANTHROPIC_NEWS_URL = "https://www.anthropic.com/news";
const MICROSOFT_AI_BLOG_URL = "https://www.microsoft.com/en-us/ai/blog/";
const MICROSOFT_AI_BLOG_FEED_URL = "https://www.microsoft.com/en-us/ai/blog/feed/";
const XAI_NEWS_URL = "https://x.ai/news";
const NVIDIA_NEWS_URL = "https://nvidianews.nvidia.com/";
const AMD_NEWSROOM_URL = "https://www.amd.com/en/newsroom.html";
const AI_DAILY_BRIEF_EPISODES_URL = "https://aidailybrief.ai/episodes";
const VENTUREBEAT_AI_NEWS_FEED_URL = "https://venturebeat.com/category/ai/feed/";
const VERGE_AI_URL = "https://www.theverge.com/ai-artificial-intelligence";
const VERGE_AI_FEED_URL = "https://www.theverge.com/rss/ai/index.xml";
const LEX_FRIDMAN_PODCAST_FEED_URL = "https://lexfridman.com/feed/podcast/";
const MIT_TECH_REVIEW_AI_URL = "https://www.technologyreview.com/topic/artificial-intelligence/";
const CALTECH_AI_NEWS_URL =
  "https://www.caltech.edu/about/news?ordering=date&search=&category=research+news&tag=AI+%26+advanced+computing&year=&submit=Search";

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

async function fetchWithTimeout(input: string, init: RequestInit = {}, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  return await fetch(input, { ...init, signal: AbortSignal.timeout(timeoutMs) });
}

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  const token = auth.slice(7).trim();
  return token.length > 0 ? token : null;
}

async function verifyAuthenticatedUser(request: Request): Promise<string | null> {
  const token = getBearerToken(request);
  if (!token) {
    return null;
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim() ?? "";
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("news-router auth verification is not configured.");
    return null;
  }

  try {
    const response = await fetchWithTimeout(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseAnonKey
      }
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { id?: string };
    return typeof data.id === "string" && data.id.length > 0 ? data.id : null;
  } catch {
    return null;
  }
}

async function consumeRateLimit(userId: string): Promise<boolean> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim() ?? "";
  if (!supabaseUrl || !serviceRoleKey) {
    return false;
  }

  try {
    const response = await fetchWithTimeout(`${supabaseUrl}/rest/v1/rpc/consume_rate_limit`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        p_function_name: "news-router",
        p_user_id: userId,
        p_window_seconds: 60,
        p_max_requests: 40
      })
    });

    if (!response.ok) {
      return false;
    }

    const allowed = await response.json();
    return allowed === true;
  } catch {
    return false;
  }
}

function isAllowedHost(hostname: string, allowedHosts: string[]): boolean {
  const normalized = hostname.toLowerCase();
  return allowedHosts.some((allowed) => {
    const host = allowed.toLowerCase();
    return normalized === host || normalized.endsWith(`.${host}`);
  });
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function trimSummary(input: string): string {
  if (input.length <= MAX_SUMMARY_LENGTH) {
    return input;
  }
  return `${input.slice(0, MAX_SUMMARY_LENGTH - 1).trim()}...`;
}

function parseDateOrNow(input: string, fallbackOffsetMs = 0): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return new Date(Date.now() - fallbackOffsetMs).toISOString();
  }
  return date.toISOString();
}

function stripCdata(input: string): string {
  return input.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

function decodeEntities(input: string): string {
  const named = input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

  return named
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)));
}

function repairMojibake(input: string): string {
  if (!/[ÃÂâ]/.test(input)) {
    return input;
  }
  try {
    const bytes = Uint8Array.from(Array.from(input).map((ch) => ch.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder("utf-8").decode(bytes);
    return decoded.includes("\ufffd") ? input : decoded;
  } catch {
    return input;
  }
}

function extractTagContent(input: string, tag: string): string {
  const regex = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = regex.exec(input);
  return match?.[1]?.trim() ?? "";
}

function normalizeText(input: string): string {
  return stripHtml(repairMojibake(decodeEntities(stripCdata(input)))).trim();
}

function tryToAbsoluteUrl(input: string, baseUrl?: string): string | undefined {
  const candidate = decodeEntities(input).trim();
  if (!candidate) {
    return undefined;
  }

  try {
    if (baseUrl) {
      return new URL(candidate, baseUrl).toString();
    }
    return new URL(candidate).toString();
  } catch {
    return undefined;
  }
}

function isPrivateIpv4Host(hostname: string): boolean {
  if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)) {
    return false;
  }

  const parts = hostname.split(".").map((part) => Number.parseInt(part, 10));
  if (parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return true;
  }

  const [first, second] = parts;
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

function isPublicHttpsUrl(input: string): boolean {
  try {
    const parsed = new URL(input);
    const hostname = parsed.hostname.toLowerCase();
    if (parsed.protocol !== "https:") {
      return false;
    }
    if (
      hostname === "localhost" ||
      hostname === "::1" ||
      hostname.endsWith(".localhost") ||
      hostname.endsWith(".local") ||
      isPrivateIpv4Host(hostname)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function readHtmlAttribute(tag: string, name: string): string {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
  const match = pattern.exec(tag);
  return decodeEntities((match?.[1] ?? match?.[2] ?? match?.[3] ?? "").trim());
}

function firstSrcSetUrl(srcset: string): string {
  return srcset
    .split(",")
    .map((entry) => entry.trim().split(/\s+/)[0] ?? "")
    .find((entry) => entry.length > 0) ?? "";
}

type ArticleImageCandidate = {
  url: string;
  score: number;
};

const IMAGE_SKIP_PATTERN =
  /\b(?:logo|favicon|icon|avatar|profile|headshot|author|sprite|tracking|pixel|spacer|transparent|placeholder|blank|share|social|powered|govd-logo|facebook|twitter|linkedin|email)\b/i;
const GENERIC_NEWSLETTER_IMAGE_PATTERN = /(?:newsletter\s+banner|bulletin\s+banner|ttb-news-banner)/i;

function pushImageCandidate(
  candidates: ArticleImageCandidate[],
  rawUrl: string,
  baseUrl: string | undefined,
  score: number,
  context: string
): void {
  const absolute = tryToAbsoluteUrl(rawUrl, baseUrl);
  if (!absolute || !isPublicHttpsUrl(absolute)) {
    return;
  }

  const normalizedContext = normalizeText(context).toLowerCase();
  const normalizedUrl = absolute.toLowerCase();
  if (
    IMAGE_SKIP_PATTERN.test(normalizedContext) ||
    IMAGE_SKIP_PATTERN.test(normalizedUrl) ||
    GENERIC_NEWSLETTER_IMAGE_PATTERN.test(normalizedContext) ||
    GENERIC_NEWSLETTER_IMAGE_PATTERN.test(normalizedUrl)
  ) {
    return;
  }

  if (candidates.some((candidate) => candidate.url === absolute)) {
    return;
  }

  candidates.push({ url: absolute, score });
}

function extractBestImageUrl(html: string, baseUrl?: string): string | undefined {
  const candidates: ArticleImageCandidate[] = [];
  const metaRegex = /<meta\b[^>]*>/gi;
  let metaMatch: RegExpExecArray | null = metaRegex.exec(html);
  while (metaMatch) {
    const tag = metaMatch[0];
    const key = (readHtmlAttribute(tag, "property") || readHtmlAttribute(tag, "name")).toLowerCase();
    if (/^(og:image(?::(?:url|secure_url))?|twitter:image(?::src)?|thumbnail)$/i.test(key)) {
      pushImageCandidate(candidates, readHtmlAttribute(tag, "content"), baseUrl, 100, tag);
    }
    metaMatch = metaRegex.exec(html);
  }

  const imageRegex = /<img\b[^>]*>/gi;
  let imageMatch: RegExpExecArray | null = imageRegex.exec(html);
  while (imageMatch) {
    const tag = imageMatch[0];
    const rawUrl =
      readHtmlAttribute(tag, "src") ||
      readHtmlAttribute(tag, "data-src") ||
      readHtmlAttribute(tag, "data-original") ||
      readHtmlAttribute(tag, "data-lazy-src") ||
      firstSrcSetUrl(readHtmlAttribute(tag, "srcset") || readHtmlAttribute(tag, "data-srcset"));
    const context = [
      readHtmlAttribute(tag, "alt"),
      readHtmlAttribute(tag, "title"),
      readHtmlAttribute(tag, "class"),
      readHtmlAttribute(tag, "id"),
      rawUrl
    ].join(" ");
    const width = Number.parseInt(readHtmlAttribute(tag, "width"), 10);
    const height = Number.parseInt(readHtmlAttribute(tag, "height"), 10);
    const tooSmall =
      (!Number.isNaN(width) && width > 0 && width <= 48) ||
      (!Number.isNaN(height) && height > 0 && height <= 48);
    const score =
      50 +
      (/\b(article|content|post|hero|main|feature|field-content|photo|image)\b/i.test(context) ? 12 : 0) +
      (/(\/files\/|\/uploads\/|\/attachments\/|\/fancy_images\/|\/wp-content\/)/i.test(rawUrl) ? 8 : 0) -
      (tooSmall ? 50 : 0);

    pushImageCandidate(candidates, rawUrl, baseUrl, score, context);
    imageMatch = imageRegex.exec(html);
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.url;
}

function extractFirstImageUrl(html: string, baseUrl?: string): string | undefined {
  return extractBestImageUrl(html, baseUrl);
}

async function fetchArticleImageUrl(articleUrl: string): Promise<string | undefined> {
  if (!isPublicHttpsUrl(articleUrl)) {
    return undefined;
  }

  try {
    const html = await fetchText(articleUrl, "text/html,application/xhtml+xml", ARTICLE_IMAGE_FETCH_TIMEOUT_MS);
    return extractBestImageUrl(html, articleUrl);
  } catch {
    return undefined;
  }
}

async function enrichMissingArticleImages(items: GuildNewsItem[]): Promise<GuildNewsItem[]> {
  return await Promise.all(
    items.map(async (item) => {
      if (item.imageUrl) {
        return item;
      }

      const imageUrl = await fetchArticleImageUrl(item.url);
      return imageUrl ? { ...item, imageUrl } : item;
    })
  );
}

function extractImageFromRssItem(rawItem: string, articleUrl: string): string | undefined {
  const patterns = [
    /<media:content[^>]*\burl=(["'])(?<url>[^"']+)\1/i,
    /<media:thumbnail[^>]*\burl=(["'])(?<url>[^"']+)\1/i,
    /<enclosure[^>]*\btype=(["'])image\/[^"']+\1[^>]*\burl=(["'])(?<url>[^"']+)\2/i,
    /<enclosure[^>]*\burl=(["'])(?<url>[^"']+)\1[^>]*\btype=(["'])image\/[^"']+\2/i
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(rawItem);
    const raw = match?.groups?.url?.trim() ?? "";
    const absolute = tryToAbsoluteUrl(raw, articleUrl);
    if (absolute) {
      return absolute;
    }
  }

  return extractFirstImageUrl(rawItem, articleUrl);
}

function extractOpenAiText(data: unknown): string {
  const payload = data as Record<string, unknown>;
  if (typeof payload.output_text === "string" && payload.output_text.trim().length > 0) {
    return payload.output_text.trim();
  }

  const output = Array.isArray(payload.output) ? payload.output : [];
  const joined = output
    .flatMap((item) => {
      const row = item as Record<string, unknown>;
      return Array.isArray(row.content) ? row.content : [];
    })
    .filter((part) => {
      const row = part as Record<string, unknown>;
      return row.type === "output_text" && typeof row.text === "string";
    })
    .map((part) => String((part as Record<string, unknown>).text))
    .join("\n")
    .trim();

  return joined;
}

function extractJsonBlock(input: string): string {
  const fenced = /```(?:json)?\s*([\s\S]*?)\s*```/i.exec(input);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }
  return input.trim();
}

function looksNonEnglish(text: string): boolean {
  const normalized = ` ${text.toLowerCase()} `;
  if (/[^\x00-\x7F]/.test(text)) {
    return true;
  }

  const nonEnglishHints = [
    " vino ",
    " vini ",
    " denominacion ",
    " denominazione ",
    " legge ",
    " notizie ",
    " noticias ",
    " und ",
    " der ",
    " die ",
    " das ",
    " avec ",
    " pour ",
    " et ",
    " de la ",
    " del "
  ];
  return nonEnglishHints.some((hint) => normalized.includes(hint));
}

async function translateItemsToEnglish(items: GuildNewsItem[]): Promise<GuildNewsItem[]> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  const candidates = items.filter((item) => looksNonEnglish(`${item.title} ${item.summary}`));
  if (!candidates.length) {
    return items;
  }

  const translatedById = new Map<string, { title: string; summary: string; language: string }>();

  if (apiKey) {
    const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4.1-mini";
    const payload = {
      items: candidates.map((item) => ({
        id: item.id,
        title: item.title,
        summary: item.summary
      }))
    };

    try {
      const response = await fetchWithTimeout("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          max_output_tokens: 1800,
          input: [
            {
              role: "system",
              content: [
                {
                  type: "input_text",
                  text:
                    "Translate non-English beverage-news text to idiomatic English. Return JSON only with shape {\"items\":[{\"id\":\"...\",\"title\":\"...\",\"summary\":\"...\",\"language\":\"xx\"}]}. Keep names, acronyms, and legal designations unchanged."
                }
              ]
            },
            {
              role: "user",
              content: [{ type: "input_text", text: JSON.stringify(payload) }]
            }
          ]
        })
      });

      if (response.ok) {
        const raw = await response.json();
        const text = extractOpenAiText(raw);
        if (text) {
          const parsed = JSON.parse(extractJsonBlock(text)) as {
            items?: Array<{ id?: string; title?: string; summary?: string; language?: string }>;
          };
          const rows = Array.isArray(parsed.items) ? parsed.items : [];
          for (const row of rows) {
            const id = typeof row.id === "string" ? row.id : "";
            const title = typeof row.title === "string" ? row.title.trim() : "";
            const summary = typeof row.summary === "string" ? row.summary.trim() : "";
            const language = typeof row.language === "string" ? row.language.trim().toLowerCase() : "";
            if (!id || !title || !summary) {
              continue;
            }
            translatedById.set(id, { title, summary, language: language || "unknown" });
          }
        }
      }
    } catch {
      // Fall through to Google fallback below.
    }
  }

  // Fallback path when OpenAI translation is unavailable or partially missing.
  for (const item of candidates) {
    if (translatedById.has(item.id)) {
      continue;
    }

    try {
      const separator = " |||SIPSEP||| ";
      const combined = `${item.title}${separator}${item.summary}`;
      const endpoint =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" +
        encodeURIComponent(combined);
      const response = await fetchWithTimeout(endpoint, {
        headers: {
          "User-Agent": "SipStudies-NewsRouter/1.0",
          Accept: "application/json,text/plain,*/*"
        }
      });
      if (!response.ok) {
        continue;
      }

      const data = (await response.json()) as unknown[];
      const chunks = Array.isArray(data?.[0]) ? (data[0] as unknown[]) : [];
      const translatedText = chunks
        .map((part) => (Array.isArray(part) && typeof part[0] === "string" ? part[0] : ""))
        .join("")
        .trim();
      const detectedLanguage = typeof data?.[2] === "string" ? String(data[2]).toLowerCase() : "unknown";
      if (!translatedText || detectedLanguage === "en") {
        continue;
      }

      const splitIndex = translatedText.indexOf(separator);
      if (splitIndex <= 0) {
        continue;
      }

      translatedById.set(item.id, {
        title: translatedText.slice(0, splitIndex).trim(),
        summary: translatedText.slice(splitIndex + separator.length).trim(),
        language: detectedLanguage
      });
    } catch {
      continue;
    }
  }

  return items.map((item) => {
    const translated = translatedById.get(item.id);
    if (!translated) {
      return item;
    }
    return {
      ...item,
      title: translated.title || item.title,
      summary: trimSummary(translated.summary || item.summary),
      translatedFrom: translated.language !== "en" ? translated.language : undefined
    } satisfies GuildNewsItem;
  });
}

function titleFromUrl(input: string): string {
  try {
    const parsed = new URL(input);
    const path = parsed.pathname.replace(/\/+$/, "");
    const lastSegment = path.split("/").filter(Boolean).pop() ?? parsed.hostname;
    const cleaned = decodeURIComponent(lastSegment).replace(/[-_]+/g, " ").trim();
    if (!cleaned) {
      return parsed.hostname;
    }
    return cleaned.replace(/\b\w/g, (ch) => ch.toUpperCase());
  } catch {
    return input;
  }
}

function parseWsetDateToIso(dateInput: string): string {
  const match = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(dateInput);
  if (!match) {
    return parseDateOrNow(dateInput);
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  return new Date(Date.UTC(year, month - 1, day)).toISOString();
}

function extractWsetArticles(html: string): GuildNewsItem[] {
  const articles: GuildNewsItem[] = [];
  const articleRegex =
    /<article class="uBlogsy_post[\s\S]*?<aside class="uBlogsy_post_details">[\s\S]*?<h2>\s*<a href="(?<href>[^"]+)">\s*(?<title>[\s\S]*?)\s*<\/a>[\s\S]*?<span class="uBlogsy_post_time">\s*(?<date>[^<]+)\s*<\/span>(?<tail>[\s\S]*?)<\/aside>[\s\S]*?<\/article>/g;

  let match: RegExpExecArray | null = articleRegex.exec(html);
  while (match && articles.length < MAX_ITEMS) {
    const href = match.groups?.href ?? "";
    const title = normalizeText(match.groups?.title ?? "");
    const rawDate = match.groups?.date ?? "";
    const tail = match.groups?.tail ?? "";

    if (title.length > 0) {
      const absoluteUrl = new URL(href, WSET_NEWS_URL).toString();
      const tagRegex = /<span class="blog-tag"><a [^>]*>(?<tag>[^<]+)<\/a><\/span>/g;
      const tags: string[] = [];
      let tagMatch: RegExpExecArray | null = tagRegex.exec(tail);
      while (tagMatch && tags.length < 4) {
        const tag = normalizeText(tagMatch.groups?.tag ?? "");
        if (tag.length > 0) {
          tags.push(tag);
        }
        tagMatch = tagRegex.exec(tail);
      }

      articles.push({
        id: absoluteUrl,
        title,
        url: absoluteUrl,
        publishedAt: parseWsetDateToIso(rawDate.trim()),
        summary: tags.length > 0 ? `Tags: ${tags.join(", ")}` : "Latest headline from WSET News.",
        imageUrl: extractFirstImageUrl(match[0], absoluteUrl)
      });
    }

    match = articleRegex.exec(html);
  }

  return articles;
}

function extractRssItems(xml: string, sourceName: string, maxItems = MAX_ITEMS): GuildNewsItem[] {
  const items: GuildNewsItem[] = [];
  const itemRegex = /<item\b[\s\S]*?<\/item>/gi;
  let match: RegExpExecArray | null = itemRegex.exec(xml);
  let index = 0;

  while (match && items.length < maxItems) {
    const rawItem = match[0];
    const title = normalizeText(extractTagContent(rawItem, "title"));
    const link = normalizeText(extractTagContent(rawItem, "link"));
    const guid = normalizeText(extractTagContent(rawItem, "guid"));
    const description =
      normalizeText(extractTagContent(rawItem, "description")) ||
      normalizeText(extractTagContent(rawItem, "content:encoded"));
    const pubDate = extractTagContent(rawItem, "pubDate") || extractTagContent(rawItem, "dc:date");

    if (title.length > 0 && link.length > 0) {
      const imageUrl = extractImageFromRssItem(rawItem, link);
      items.push({
        id: guid || link,
        title,
        url: link,
        publishedAt: parseDateOrNow(pubDate, index * 60_000),
        summary: description.length > 0 ? trimSummary(description) : `Latest headline from ${sourceName}.`,
        imageUrl
      });
      index += 1;
    }

    match = itemRegex.exec(xml);
  }

  return items;
}

async function fetchText(url: string, accept: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<string> {
  const response = await fetchWithTimeout(
    url,
    {
      headers: {
        "User-Agent": "SipStudies-NewsRouter/1.0",
        Accept: accept
      }
    },
    timeoutMs
  );

  if (!response.ok) {
    throw new Error(`Fetch failed for ${url} (${response.status}).`);
  }

  return await response.text();
}

async function fetchWsetNews(): Promise<GuildNewsItem[]> {
  const html = await fetchText(WSET_NEWS_URL, "text/html,application/xhtml+xml");
  const items = extractWsetArticles(html);
  if (!items.length) {
    throw new Error("WSET parser found no articles.");
  }
  return items;
}

async function fetchRssNews(feedUrl: string, sourceName: string, maxItems = MAX_ITEMS): Promise<GuildNewsItem[]> {
  const xml = await fetchText(feedUrl, "application/rss+xml,application/xml,text/xml");
  const items = extractRssItems(xml, sourceName, maxItems);
  if (!items.length) {
    throw new Error(`${sourceName} RSS parser found no articles.`);
  }
  return items;
}

async function fetchRssLinkedFromPage(
  pageUrl: string,
  sourceName: string,
  allowedHosts: string[]
): Promise<GuildNewsItem[]> {
  const html = await fetchText(pageUrl, "text/html,application/xhtml+xml");
  const patterns = [
    /<a[^>]+href=(["'])(?<href>[^"']+)\1[^>]*>\s*RSS\s*<\/a>/i,
    /<link[^>]+type=(["'])application\/rss\+xml\1[^>]+href=(["'])(?<href>[^"']+)\2/i,
    /<link[^>]+href=(["'])(?<href>[^"']+)\1[^>]+type=(["'])application\/rss\+xml\2/i
  ];

  let href = "";
  for (const pattern of patterns) {
    const match = pattern.exec(html);
    const candidate = match?.groups?.href?.trim() ?? "";
    if (candidate.length > 0) {
      href = candidate;
      break;
    }
  }

  if (href.length === 0) {
    throw new Error(`${sourceName} page did not expose an RSS link.`);
  }

  const rssUrl = new URL(href, pageUrl);
  if (rssUrl.protocol !== "https:" || !isAllowedHost(rssUrl.hostname, allowedHosts)) {
    throw new Error(`${sourceName} page exposed an untrusted RSS endpoint.`);
  }
  return await fetchRssNews(rssUrl.toString(), sourceName);
}

async function fetchWpNews(endpoint: string, sourceName: string): Promise<GuildNewsItem[]> {
  const response = await fetchWithTimeout(endpoint, {
    headers: {
      "User-Agent": "SipStudies-NewsRouter/1.0",
      Accept: "application/json,text/plain,*/*"
    }
  });

  if (!response.ok) {
    throw new Error(`${sourceName} WP endpoint failed (${response.status}).`);
  }

  const payload = (await response.json()) as WpPost[];
  const items = (Array.isArray(payload) ? payload : [])
    .slice(0, MAX_ITEMS)
    .map((post, index) => {
      const title = normalizeText(post.title?.rendered ?? "Untitled");
      const summary = trimSummary(normalizeText(post.excerpt?.rendered ?? "") || `Latest headline from ${sourceName}.`);
      const url = post.link || "";
      const imageUrl =
        tryToAbsoluteUrl(post.jetpack_featured_media_url ?? "", url) ||
        tryToAbsoluteUrl(post.featured_image_url ?? "", url) ||
        tryToAbsoluteUrl(post.yoast_head_json?.og_image?.[0]?.url ?? "", url) ||
        extractFirstImageUrl(post.excerpt?.rendered ?? "", url);
      return {
        id: `${post.id || url || index}`,
        title,
        url,
        publishedAt: parseDateOrNow(post.date, index * 60_000),
        summary,
        imageUrl
      } satisfies GuildNewsItem;
    })
    .filter((item) => item.url.length > 0 && item.title.length > 0);

  if (!items.length) {
    throw new Error(`${sourceName} WP parser found no articles.`);
  }

  return items;
}

async function fetchSquarespaceJsonNews(
  jsonUrl: string,
  baseUrl: string,
  sourceName: string,
  maxItems = MAX_ITEMS
): Promise<GuildNewsItem[]> {
  const response = await fetchWithTimeout(jsonUrl, {
    headers: {
      "User-Agent": "SipStudies-NewsRouter/1.0",
      Accept: "application/json,text/plain,*/*"
    }
  });

  if (!response.ok) {
    throw new Error(`${sourceName} JSON endpoint failed (${response.status}).`);
  }

  const payload = (await response.json()) as { items?: Array<Record<string, unknown>> };
  const rows = Array.isArray(payload?.items) ? payload.items : [];

  const items = rows
    .slice(0, maxItems)
    .map((row, index) => {
      const title = normalizeText(String(row.title ?? row.name ?? "Untitled"));
      const href = String(row.fullUrl ?? row.url ?? "");
      const summaryRaw = String(row.excerpt ?? row.body ?? row.description ?? "");
      const dateInput = String(row.publishOn ?? row.publishedOn ?? row.date ?? row.addedOn ?? row.createdOn ?? "");
      const imageRaw = String(
        row.assetUrl ??
          row.image ??
          row.imageUrl ??
          row.thumbnail ??
          row.posterImageUrl ??
          row.mainImageUrl ??
          ""
      );

      let url = "";
      try {
        url = href ? new URL(href, baseUrl).toString() : "";
      } catch {
        url = "";
      }
      const imageUrl = tryToAbsoluteUrl(imageRaw, baseUrl) || extractFirstImageUrl(summaryRaw, url || baseUrl);

      return {
        id: String(row.id ?? (url || `${sourceName}-${index}`)),
        title,
        url,
        publishedAt: parseDateOrNow(dateInput, index * 60_000),
        summary: trimSummary(normalizeText(summaryRaw) || `Latest headline from ${sourceName}.`),
        imageUrl
      } satisfies GuildNewsItem;
    })
    .filter((item) => item.url.length > 0 && item.title.length > 0);

  if (!items.length) {
    throw new Error(`${sourceName} JSON parser found no articles.`);
  }

  return items;
}

async function fetchRobertParkerNews(): Promise<GuildNewsItem[]> {
  if (!ROBERT_PARKER_API_KEY) {
    throw new Error("Missing ROBERT_PARKER_API_KEY secret.");
  }

  const response = await fetchWithTimeout(ROBERT_PARKER_API_URL, {
    headers: {
      "User-Agent": "SipStudies-NewsRouter/1.0",
      Accept: "application/json",
      "x-api-key": ROBERT_PARKER_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });

  if (!response.ok) {
    throw new Error(`Robert Parker API failed (${response.status}).`);
  }

  const payload = (await response.json()) as {
    data?: { data?: Array<Record<string, unknown>> };
  };

  const rows = Array.isArray(payload?.data?.data) ? payload.data.data : [];
  const items = rows
    .slice(0, MAX_ITEMS)
    .map((row, index) => {
      const id = String((row.id as string) || (row._id as string) || `rp-${index}`);
      const slug = String((row.slug as string) || "");
      const title = String((row.title as string) || "Untitled").trim();
      const excerpt = String((row.excerpt as string) || "");
      const publishedDate = String((row.published_date as string) || "");
      const url = `https://www.robertparker.com/articles/${id}${slug ? `/${slug}` : ""}`;
      return {
        id,
        title,
        url,
        publishedAt: parseDateOrNow(publishedDate, index * 60_000),
        summary: excerpt ? trimSummary(excerpt) : "Latest headline from Robert Parker.",
        imageUrl: tryToAbsoluteUrl(String((row.image as string) || (row.featured_image as string) || ""), url)
      } satisfies GuildNewsItem;
    })
    .filter((item) => item.title.length > 0 && item.url.length > 0);

  if (!items.length) {
    throw new Error("Robert Parker parser found no articles.");
  }

  return items;
}

async function fetchWineSpectatorNews(): Promise<GuildNewsItem[]> {
  const html = await fetchText(WINE_SPECTATOR_NEWS_URL, "text/html,application/xhtml+xml");
  const linkRegex = /<a[^>]+href="(?<href>\/articles\/[^"#?]+)"[^>]*>(?<inner>[\s\S]*?)<\/a>/gi;
  const skipPatterns = /about-our-tastings|how-to-submit-wines|rest-wine-list-info/i;
  const seen = new Set<string>();
  const items: GuildNewsItem[] = [];
  let index = 0;

  let match: RegExpExecArray | null = linkRegex.exec(html);
  while (match && items.length < MAX_ITEMS) {
    const href = match.groups?.href ?? "";
    const title = normalizeText(match.groups?.inner ?? "");

    if (href && title.length >= 15 && !skipPatterns.test(href) && !seen.has(href)) {
      seen.add(href);
      const url = new URL(href, WINE_SPECTATOR_NEWS_URL).toString();
      items.push({
        id: url,
        title,
        url,
        publishedAt: parseDateOrNow("", index * 60_000),
        summary: "Latest headline from Wine Spectator News.",
        imageUrl: extractBestImageUrl(match[0], url)
      });
      index += 1;
    }

    match = linkRegex.exec(html);
  }

  if (!items.length) {
    throw new Error("Wine Spectator parser found no articles.");
  }

  return await enrichMissingArticleImages(items);
}

type HtmlLinkSourceOptions = {
  pageUrl: string;
  baseUrl: string;
  hrefPattern: RegExp;
  summary: string;
  titleMinLength?: number;
  allowUrlSlugTitleFallback?: boolean;
  titleIncludePattern?: RegExp;
  titleSkipPattern?: RegExp;
  hrefSkipPattern?: RegExp;
};

async function fetchHtmlLinkNews(options: HtmlLinkSourceOptions, sourceName: string): Promise<GuildNewsItem[]> {
  const html = await fetchText(options.pageUrl, "text/html,application/xhtml+xml");
  const linkRegex = /<a[^>]+href=(["'])(?<href>[^"'#]+)\1[^>]*>(?<inner>[\s\S]*?)<\/a>/gi;
  const seen = new Set<string>();
  const items: GuildNewsItem[] = [];
  const minLength = options.titleMinLength ?? 12;
  let index = 0;

  let match: RegExpExecArray | null = linkRegex.exec(html);
  while (match && items.length < MAX_ITEMS) {
    const href = (match.groups?.href ?? "").trim();
    const innerTitle = normalizeText(match.groups?.inner ?? "");

    if (!href || href.startsWith("#") || href.toLowerCase().startsWith("javascript:")) {
      match = linkRegex.exec(html);
      continue;
    }

    if (!options.hrefPattern.test(href)) {
      match = linkRegex.exec(html);
      continue;
    }

    const provisionalTitle = innerTitle.length > 0 ? innerTitle : options.allowUrlSlugTitleFallback ? titleFromUrl(href) : "";
    if (provisionalTitle.length < minLength) {
      match = linkRegex.exec(html);
      continue;
    }

    if (options.titleIncludePattern && !options.titleIncludePattern.test(provisionalTitle)) {
      match = linkRegex.exec(html);
      continue;
    }

    if (options.titleSkipPattern && options.titleSkipPattern.test(provisionalTitle)) {
      match = linkRegex.exec(html);
      continue;
    }

    let url = "";
    try {
      url = new URL(href, options.baseUrl).toString();
    } catch {
      match = linkRegex.exec(html);
      continue;
    }

    if (options.hrefSkipPattern && options.hrefSkipPattern.test(url)) {
      match = linkRegex.exec(html);
      continue;
    }

    if (!seen.has(url)) {
      seen.add(url);
      items.push({
        id: url,
        title: provisionalTitle,
        url,
        publishedAt: parseDateOrNow("", index * 60_000),
        summary: options.summary,
        imageUrl: extractBestImageUrl(match[0], url)
      });
      index += 1;
    }

    match = linkRegex.exec(html);
  }

  if (!items.length) {
    throw new Error(`${sourceName} parser found no articles.`);
  }

  return await enrichMissingArticleImages(items);
}

async function fetchSitemapNews(sitemapUrl: string, sourceName: string, summary: string): Promise<GuildNewsItem[]> {
  const xml = await fetchText(sitemapUrl, "application/xml,text/xml");
  const urlRegex = /<url\b[\s\S]*?<loc>(?<loc>[^<]+)<\/loc>[\s\S]*?(?:<lastmod>(?<lastmod>[^<]+)<\/lastmod>)?[\s\S]*?<\/url>/gi;
  const items: GuildNewsItem[] = [];
  const seen = new Set<string>();
  let index = 0;

  let match: RegExpExecArray | null = urlRegex.exec(xml);
  while (match && items.length < MAX_ITEMS) {
    const rawUrl = normalizeText(match.groups?.loc ?? "");
    const lastmod = normalizeText(match.groups?.lastmod ?? "");
    if (rawUrl.length > 0 && !seen.has(rawUrl)) {
      seen.add(rawUrl);
      items.push({
        id: rawUrl,
        title: titleFromUrl(rawUrl),
        url: rawUrl,
        publishedAt: parseDateOrNow(lastmod, index * 60_000),
        summary,
        imageUrl: extractBestImageUrl(match[0], rawUrl)
      });
      index += 1;
    }
    match = urlRegex.exec(xml);
  }

  if (!items.length) {
    throw new Error(`${sourceName} sitemap parser found no links.`);
  }

  return await enrichMissingArticleImages(items);
}

type RawHrefSourceOptions = {
  pageUrl: string;
  baseUrl: string;
  hrefPattern: RegExp;
  summary: string;
  hrefSkipPattern?: RegExp;
};

async function fetchRawHrefNews(options: RawHrefSourceOptions, sourceName: string): Promise<GuildNewsItem[]> {
  const html = await fetchText(options.pageUrl, "text/html,application/xhtml+xml");
  const hrefRegex = /href=(["'])(?<href>[^"']+)\1/gi;
  const seen = new Set<string>();
  const items: GuildNewsItem[] = [];
  let index = 0;

  let match: RegExpExecArray | null = hrefRegex.exec(html);
  while (match && items.length < MAX_ITEMS) {
    const href = (match.groups?.href ?? "").trim();
    if (!href || href.startsWith("#") || href.toLowerCase().startsWith("javascript:")) {
      match = hrefRegex.exec(html);
      continue;
    }
    if (!options.hrefPattern.test(href)) {
      match = hrefRegex.exec(html);
      continue;
    }

    let url = "";
    try {
      url = new URL(href, options.baseUrl).toString();
    } catch {
      match = hrefRegex.exec(html);
      continue;
    }

    if (options.hrefSkipPattern && options.hrefSkipPattern.test(url)) {
      match = hrefRegex.exec(html);
      continue;
    }

    if (!seen.has(url)) {
      seen.add(url);
      items.push({
        id: url,
        title: titleFromUrl(url),
        url,
        publishedAt: parseDateOrNow("", index * 60_000),
        summary: options.summary,
        imageUrl: extractBestImageUrl(match[0], url)
      });
      index += 1;
    }

    match = hrefRegex.exec(html);
  }

  if (!items.length) {
    throw new Error(`${sourceName} parser found no articles.`);
  }

  return await enrichMissingArticleImages(items);
}

function filterLexAiTechnologyEpisodes(items: GuildNewsItem[]): GuildNewsItem[] {
  const pattern =
    /\b(ai|artificial intelligence|technology|tech|machine learning|deep learning|neural|robotics|computer vision|llm|model)\b/i;
  return items.filter((item) => pattern.test(`${item.title} ${item.summary}`)).slice(0, MAX_ITEMS);
}

async function fetchBySource(source: NewsRouterSource): Promise<GuildNewsItem[]> {
  switch (source) {
    case "wset":
      return await fetchWsetNews();
    case "usbg":
      return await fetchHtmlLinkNews(
        {
          pageUrl: USBG_NEWS_URL,
          baseUrl: "https://www.usbg.org",
          hrefPattern: /^\/news\//i,
          summary: "Latest announcement from the United States Bartenders Guild.",
          titleMinLength: 12
        },
        "USBG"
      );
    case "iba":
      return await fetchRssNews("https://iba-world.com/events/feed/", "International Bartenders Association");
    case "cicerone":
      return await fetchHtmlLinkNews(
        {
          pageUrl: CICERONE_BLOG_URL,
          baseUrl: "https://www.cicerone.org",
          hrefPattern: /^\/us-en\/blog\/(?!\?page=|$)/i,
          summary: "Latest article from the Cicerone Certification Program blog.",
          titleMinLength: 12
        },
        "Cicerone"
      );
    case "sca-events":
      return await fetchHtmlLinkNews(
        {
          pageUrl: SCA_GLOBAL_EVENTS_URL,
          baseUrl: "https://sca.coffee",
          hrefPattern: /(worldofcoffee\.org|wcc\.coffee|\/events-index|\/event-partners)/i,
          titleSkipPattern: /^Folder:/i,
          summary: "Global coffee event listings from the Specialty Coffee Association.",
          titleMinLength: 4
        },
        "SCA Global Events"
      );
    case "sca-news":
      return await fetchRssNews("https://sca.coffee/sca-news?format=rss", "Specialty Coffee Association News");
    case "barista-guild":
      try {
        return await fetchSquarespaceJsonNews(
          `${BARISTA_GUILD_WELCOME_URL}?format=json`,
          BARISTA_GUILD_WELCOME_URL,
          "Barista Guild"
        );
      } catch {
        try {
          return await fetchRssNews(`${BARISTA_GUILD_WELCOME_URL}?format=rss`, "Barista Guild");
        } catch {
          try {
            return await fetchHtmlLinkNews(
              {
                pageUrl: BARISTA_GUILD_WELCOME_URL,
                baseUrl: BARISTA_GUILD_WELCOME_URL,
                hrefPattern: /(\/welcome\/(?!$|\?)|https:\/\/baristaguild\.coffee\/welcome\/(?!$|\?))/i,
                summary: "Latest post from the Barista Guild.",
                titleMinLength: 8,
                titleSkipPattern: /^(Home|Back)$/i
              },
              "Barista Guild"
            );
          } catch {
            return await fetchSitemapNews(
              "https://baristaguild.coffee/sitemap.xml",
              "Barista Guild",
              "Latest available pages from the Barista Guild website."
            );
          }
        }
      }
    case "world-of-coffee":
      return await fetchHtmlLinkNews(
        {
          pageUrl: WORLD_OF_COFFEE_URL,
          baseUrl: WORLD_OF_COFFEE_URL,
          hrefPattern: /^https:\/\/(dubai|usa|asia|europe|panama)\.worldofcoffee\.org\/?$/i,
          summary: "Latest World of Coffee event destination.",
          titleMinLength: 6
        },
        "World of Coffee"
      );
    case "brewers-association":
      return await fetchWpNews(BREWERS_ASSOCIATION_WP_URL, "Brewers Association");
    case "tea-masters":
      return await fetchRssNews("https://teamasters.org/feed/", "Tea Masters");
    case "sipstudies":
      return await fetchRssNews(SIPSTUDIES_SUBSTACK_FEED_URL, "SipStudies", MAX_SIPSTUDIES_ITEMS);
    case "sipstudies-blog":
      return await fetchSquarespaceJsonNews(
        SIPSTUDIES_BLOG_JSON_URL,
        "https://www.sipstudies.com",
        "SipStudies Blog",
        MAX_SIPSTUDIES_ITEMS
      );
    case "ttb-news":
      return await fetchHtmlLinkNews(
        {
          pageUrl: TTB_PRESS_ROOM_URL,
          baseUrl: "https://www.ttb.gov",
          hrefPattern: /(content\.govdelivery\.com\/accounts\/USTTB|\/public-information\/(?:featured-stories|news)\/)/i,
          summary: "Latest update from the U.S. Alcohol and Tobacco Tax and Trade Bureau (TTB).",
          titleMinLength: 10,
          titleSkipPattern: /^(Subscribe|Home|About|Contact|Press Room|Public Information)$/i
        },
        "TTB Press Room"
      );
    case "inao-news":
      return await fetchHtmlLinkNews(
        {
          pageUrl: INAO_ACTUALITES_URL,
          baseUrl: "https://www.inao.gouv.fr",
          hrefPattern: /\/en\/(?!actualites\/?$)[^?#]+/i,
          summary: "Latest news from INAO (France).",
          titleMinLength: 14,
          titleSkipPattern: /^(Home|News|Actualites|Search|Menu)$/i
        },
        "INAO"
      );
    case "eu-agri-news":
      try {
        return await fetchRssLinkedFromPage(EU_AGRI_FILTERED_NEWS_URL, "EU Agriculture News", ["europa.eu"]);
      } catch {
        return await fetchHtmlLinkNews(
          {
            pageUrl: EU_AGRI_FILTERED_NEWS_URL,
            baseUrl: "https://agriculture.ec.europa.eu",
            hrefPattern: /\/media\/news\/[^?#]+$/i,
            summary: "Latest filtered agricultural policy headlines from the European Commission.",
            titleMinLength: 14,
            titleSkipPattern: /^(Home|News|Search|RSS)$/i
          },
          "EU Agriculture News"
        );
      }
    case "masaf-docg":
      return await fetchHtmlLinkNews(
        {
          pageUrl: MASAF_DOCG_SEARCH_URL,
          baseUrl: "https://www.masaf.gov.it",
          hrefPattern: /\/flex\/cm\/pages\/|\/flex\/cm\/FixedPages\/|\/SPE\//i,
          summary: "Latest DOCG-related items from MASAF search results.",
          titleMinLength: 12,
          titleIncludePattern: /(docg|dop|igp|vino|vini|wine|denominazione)/i,
          titleSkipPattern: /^(All|PDF documents only|site pages only|advanced search|search)$/i
        },
        "MASAF DOCG"
      );
    case "vinosdo-news":
      return await fetchHtmlLinkNews(
        {
          pageUrl: VINOSDO_NEWS_URL,
          baseUrl: "https://vinosdo.wine",
          hrefPattern: /\/noticias\/(?!$|\?)/i,
          summary: "Latest headlines from Spain's Vinos de Denominaciones de Origen.",
          titleMinLength: 10,
          titleSkipPattern: /^(Home|Noticias|Sala de prensa|Leer m[aá]s)$/i
        },
        "VinosDO"
      );
    case "vdp-news":
      return await fetchRawHrefNews(
        {
          pageUrl: VDP_NEWS_URL,
          baseUrl: "https://www.vdp.de",
          hrefPattern: /\/en\/(sneakpreview[^"'?#]*|vdpauction[^"'?#]*)/i,
          summary: "Latest updates from VDP (Germany).",
          hrefSkipPattern: /\/en\/current-news-and-important-topics-of-the-vdp-at-a-glance\/?$/i
        },
        "VDP"
      );
    case "openai-news":
      try {
        return await fetchRssLinkedFromPage(OPENAI_NEWS_URL, "OpenAI", ["openai.com"]);
      } catch {
        return await fetchHtmlLinkNews(
          {
            pageUrl: OPENAI_NEWS_URL,
            baseUrl: "https://openai.com",
            hrefPattern: /(^\/news\/(?!$|\?)|^https?:\/\/openai\.com\/news\/(?!$|\?))/i,
            summary: "Latest announcements from OpenAI.",
            titleMinLength: 10,
            titleSkipPattern: /^(News|Research|Safety|Company|Product)$/i
          },
          "OpenAI"
        );
      }
    case "deepmind-news":
      try {
        return await fetchRssLinkedFromPage(DEEPMIND_BLOG_URL, "Google DeepMind", ["deepmind.google"]);
      } catch {
        return await fetchHtmlLinkNews(
          {
            pageUrl: DEEPMIND_BLOG_URL,
            baseUrl: "https://deepmind.google",
            hrefPattern: /(^\/blog\/(?!$|\?)|^https?:\/\/deepmind\.google\/blog\/(?!$|\?))/i,
            summary: "Latest research and product updates from Google DeepMind.",
            titleMinLength: 10,
            titleSkipPattern: /^(Blog|Research|Safety|Home)$/i
          },
          "Google DeepMind"
        );
      }
    case "anthropic-news":
      try {
        return await fetchRssLinkedFromPage(ANTHROPIC_NEWS_URL, "Anthropic", ["anthropic.com"]);
      } catch {
        return await fetchHtmlLinkNews(
          {
            pageUrl: ANTHROPIC_NEWS_URL,
            baseUrl: "https://www.anthropic.com",
            hrefPattern: /(^\/news\/(?!$|\?)|^https?:\/\/www\.anthropic\.com\/news\/(?!$|\?))/i,
            summary: "Latest updates from Anthropic.",
            titleMinLength: 10,
            titleSkipPattern: /^(News|Home|Company)$/i
          },
          "Anthropic"
        );
      }
    case "microsoft-ai-news":
      try {
        return await fetchRssNews(MICROSOFT_AI_BLOG_FEED_URL, "Microsoft AI Blog");
      } catch {
        return await fetchHtmlLinkNews(
          {
            pageUrl: MICROSOFT_AI_BLOG_URL,
            baseUrl: "https://www.microsoft.com",
            hrefPattern: /(^\/en-us\/ai\/blog\/(?!$|\?)|^https?:\/\/www\.microsoft\.com\/en-us\/ai\/blog\/(?!$|\?))/i,
            summary: "Latest articles from Microsoft's AI blog.",
            titleMinLength: 10,
            titleSkipPattern: /^(Blog|AI Blog|Home)$/i
          },
          "Microsoft AI Blog"
        );
      }
    case "xai-news":
      return await fetchHtmlLinkNews(
        {
          pageUrl: XAI_NEWS_URL,
          baseUrl: "https://x.ai",
          hrefPattern: /(^\/news\/(?!$|\?)|^https?:\/\/x\.ai\/news\/(?!$|\?))/i,
          summary: "Latest updates from xAI.",
          titleMinLength: 8,
          titleSkipPattern: /^(News|Home)$/i
        },
        "xAI"
      );
    case "nvidia-news":
      try {
        return await fetchRssLinkedFromPage(NVIDIA_NEWS_URL, "NVIDIA Newsroom", ["nvidianews.nvidia.com"]);
      } catch {
        return await fetchHtmlLinkNews(
          {
            pageUrl: NVIDIA_NEWS_URL,
            baseUrl: "https://nvidianews.nvidia.com",
            hrefPattern: /(^\/news\/[^?#]+$|^https?:\/\/nvidianews\.nvidia\.com\/news\/[^?#]+$)/i,
            summary: "Latest announcements from NVIDIA.",
            titleMinLength: 10,
            titleSkipPattern: /^(Newsroom|NVIDIA Newsroom|Home)$/i
          },
          "NVIDIA Newsroom"
        );
      }
    case "amd-news":
      return await fetchHtmlLinkNews(
        {
          pageUrl: AMD_NEWSROOM_URL,
          baseUrl: "https://www.amd.com",
          hrefPattern: /(^\/en\/newsroom\/[^?#]+$|^https?:\/\/www\.amd\.com\/en\/newsroom\/[^?#]+$)/i,
          summary: "Latest press and newsroom updates from AMD.",
          titleMinLength: 10,
          titleSkipPattern: /^(Newsroom|AMD Newsroom|Home)$/i
        },
        "AMD Newsroom"
      );
    case "ai-daily-brief":
      return await fetchRawHrefNews(
        {
          pageUrl: AI_DAILY_BRIEF_EPISODES_URL,
          baseUrl: "https://aidailybrief.ai",
          hrefPattern: /(^\/episodes\/[^"'?#]+$|^https?:\/\/aidailybrief\.ai\/episodes\/[^"'?#]+$)/i,
          summary: "Latest episodes from AI Daily Brief."
        },
        "AI Daily Brief"
      );
    case "venturebeat-ai-news":
      return await fetchRssNews(VENTUREBEAT_AI_NEWS_FEED_URL, "VentureBeat AI");
    case "verge-ai-news":
      try {
        return await fetchRssNews(VERGE_AI_FEED_URL, "The Verge AI");
      } catch {
        return await fetchHtmlLinkNews(
          {
            pageUrl: VERGE_AI_URL,
            baseUrl: "https://www.theverge.com",
            hrefPattern: /(^\/\d{4}\/\d{1,2}\/\d{1,2}\/[^?#]+$|^https?:\/\/www\.theverge\.com\/\d{4}\/\d{1,2}\/\d{1,2}\/[^?#]+$)/i,
            summary: "Latest AI stories from The Verge.",
            titleMinLength: 10
          },
          "The Verge AI"
        );
      }
    case "lex-fridman-ai-tech": {
      const episodes = await fetchRssNews(LEX_FRIDMAN_PODCAST_FEED_URL, "Lex Fridman Podcast");
      const filtered = filterLexAiTechnologyEpisodes(episodes);
      if (!filtered.length) {
        throw new Error("Lex Fridman parser found no AI or technology episodes.");
      }
      return filtered;
    }
    case "mit-tech-review-ai-news":
      return await fetchHtmlLinkNews(
        {
          pageUrl: MIT_TECH_REVIEW_AI_URL,
          baseUrl: "https://www.technologyreview.com",
          hrefPattern:
            /(^\/\d{4}\/\d{2}\/\d{2}\/[^?#]+$|^https?:\/\/www\.technologyreview\.com\/\d{4}\/\d{2}\/\d{2}\/[^?#]+$)/i,
          summary: "Latest AI topic coverage from MIT Technology Review.",
          titleMinLength: 10
        },
        "MIT Technology Review"
      );
    case "caltech-ai-news":
      return await fetchHtmlLinkNews(
        {
          pageUrl: CALTECH_AI_NEWS_URL,
          baseUrl: "https://www.caltech.edu",
          hrefPattern: /(^\/about\/news\/[^?#]+$|^https?:\/\/www\.caltech\.edu\/about\/news\/[^?#]+$)/i,
          summary: "Latest AI and advanced computing research news from Caltech.",
          titleMinLength: 10
        },
        "Caltech News"
      );
    case "beer-connoisseur":
      return await fetchWpNews(
        "https://beerconnoisseur.com/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt&per_page=8",
        "The Beer Connoisseur"
      );
    case "connoisseur-magazine":
      return await fetchWpNews(
        "https://www.connoisseurmagazine.co.uk/wp-json/wp/v2/posts?_fields=id,date,title,link,excerpt&per_page=8",
        "Connoisseur Magazine"
      );
    case "whisky-advocate":
      return await fetchRssNews("https://whiskyadvocate.com/call/blogs/rss/", "Whisky Advocate");
    case "wine-enthusiast":
      return await fetchRssNews("https://www.wineenthusiast.com/feed/", "Wine Enthusiast");
    case "decanter":
      return await fetchRssNews("https://www.decanter.com/wine-news/feed/", "Decanter");
    case "wine-spectator":
      return await fetchWineSpectatorNews();
    case "robert-parker":
      return await fetchRobertParkerNews();
    default:
      throw new Error("Unsupported source.");
  }
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Use POST only." });
  }

  try {
    const userId = await verifyAuthenticatedUser(request);
    if (!userId) {
      return json(401, { error: "Authentication required." });
    }
    if (!(await consumeRateLimit(userId))) {
      return json(429, { error: "Rate limit exceeded. Please try again shortly." });
    }

    const body = (await request.json()) as NewsRouterRequest;
    const source = body.source ?? "wset";
    const items = await fetchBySource(source);
    const translatedItems = await translateItemsToEnglish(items);

    return json(200, {
      source,
      fetchedAt: new Date().toISOString(),
      items: translatedItems
    });
  } catch (error: unknown) {
    const requestId = crypto.randomUUID();
    console.error("news-router error", { requestId, error });
    return json(500, { error: "Internal server error.", requestId });
  }
});
