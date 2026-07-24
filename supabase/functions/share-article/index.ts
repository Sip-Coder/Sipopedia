type ArticleSurface = "beverage-news" | "flavor-blog";

type AuthenticatedUser = {
  id: string;
};

type ArticleSourceConfig = {
  name: string;
  hosts: readonly string[];
};

type ShareArticleInput = {
  recipientName: string;
  recipientEmail: string;
  message: string;
  article: {
    surface: ArticleSurface;
    articleId: string;
    sourceId: string;
    sourceName: string;
    title: string;
    url: string;
    summary: string;
  };
};

type RateLimitResult = "allowed" | "blocked" | "unavailable";

const CANONICAL_APP_ORIGIN = "https://sipopedia.com";
const MAX_REQUEST_BYTES = 16_000;
const PROVIDER_TIMEOUT_MS = 15_000;
const SUPABASE_TIMEOUT_MS = 8_000;

const BUILT_IN_ALLOWED_ORIGINS = [
  CANONICAL_APP_ORIGIN,
  "https://www.sipopedia.com",
  "https://sipopedia-02.replit.app",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5100",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5000",
  "http://127.0.0.1:5100",
  "http://127.0.0.1:5173"
] as const;

const ARTICLE_SOURCES: Record<ArticleSurface, Record<string, ArticleSourceConfig>> = {
  "beverage-news": {
    swe: { name: "Society of Wine Educators", hosts: ["winewitandwisdomswe.com"] },
    wset: { name: "WSET Global", hosts: ["wsetglobal.com"] },
    cms: { name: "Court of Master Sommeliers", hosts: ["mastersommeliers.org"] },
    usbg: { name: "United States Bartenders Guild", hosts: ["usbg.org"] },
    iba: { name: "International Bartenders Association", hosts: ["iba-world.com"] },
    cicerone: { name: "Cicerone Certification Program", hosts: ["cicerone.org"] },
    "sca-events": { name: "SCA Global Events", hosts: ["sca.coffee"] },
    "sca-news": { name: "SCA News", hosts: ["sca.coffee"] },
    "barista-guild": { name: "Barista Guild", hosts: ["baristaguild.coffee"] },
    "world-of-coffee": { name: "World of Coffee", hosts: ["worldofcoffee.org"] },
    "brewers-association": { name: "Brewers Association", hosts: ["brewersassociation.org"] },
    "tea-masters": { name: "Tea Masters", hosts: ["teamasters.org"] },
    sipstudies: { name: "Sip Studies", hosts: ["sipstudies.substack.com"] },
    "reg-usa-ttb": { name: "USA - TTB Press Room", hosts: ["ttb.gov"] },
    "reg-fr-inao": { name: "France - INAO Actualites", hosts: ["inao.gouv.fr"] },
    "reg-eu-cap-news": { name: "EU - Agriculture News", hosts: ["agriculture.ec.europa.eu"] },
    "reg-it-masaf-docg": { name: "Italy - MASAF", hosts: ["masaf.gov.it"] },
    "reg-es-vinosdo": { name: "Spain - VinosDO Noticias", hosts: ["vinosdo.wine"] },
    "reg-de-vdp": { name: "Germany - VDP News", hosts: ["vdp.de"] },
    "wine-enthusiast": { name: "Wine Enthusiast", hosts: ["wineenthusiast.com"] },
    decanter: { name: "Decanter", hosts: ["decanter.com"] },
    "beer-connoisseur": { name: "The Beer Connoisseur", hosts: ["beerconnoisseur.com"] },
    "whisky-advocate": { name: "Whisky Advocate", hosts: ["whiskyadvocate.com"] },
    "wine-spectator": { name: "Wine Spectator", hosts: ["winespectator.com"] },
    "connoisseur-magazine": {
      name: "Connoisseur Magazine",
      hosts: ["connoisseurmagazine.co.uk"]
    },
    "robert-parker": { name: "Robert Parker", hosts: ["robertparker.com"] },
    vinepair: { name: "VinePair", hosts: ["vinepair.com"] }
  },
  "flavor-blog": {
    "sipstudies-site": { name: "SipStudies.com Blog", hosts: ["sipstudies.com"] },
    "sipstudies-substack": { name: "Sip Studies Substack", hosts: ["sipstudies.substack.com"] },
    "daily-sip": { name: "Daily Sip", hosts: ["sipopedia.com"] }
  }
};

const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

class RequestValidationError extends Error {}
class SourceNotAllowedError extends Error {}

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function configuredAllowedOrigins(): ReadonlySet<string> {
  const allowed = new Set<string>(BUILT_IN_ALLOWED_ORIGINS);
  const configured = [Deno.env.get("ALLOWED_ORIGINS"), Deno.env.get("ALLOWED_ORIGIN")]
    .filter((value): value is string => Boolean(value?.trim()))
    .flatMap((value) => value.split(","));

  for (const candidate of configured) {
    const normalized = normalizeOrigin(candidate);
    if (normalized) {
      allowed.add(normalized);
    } else {
      console.warn("share-article ignored an invalid configured origin");
    }
  }

  return allowed;
}

const ALLOWED_ORIGINS = configuredAllowedOrigins();

function allowedRequestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const normalized = normalizeOrigin(origin);
  return normalized && ALLOWED_ORIGINS.has(normalized) ? normalized : null;
}

function hasDisallowedRequestOrigin(request: Request): boolean {
  return request.headers.has("origin") && allowedRequestOrigin(request) === null;
}

function responseHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization,content-type,x-client-info,apikey",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "Content-Type": "application/json",
    Vary: "Origin"
  };
  const origin = allowedRequestOrigin(request);
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(request)
  });
}

function cleanSingleLine(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMultiline(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function requiredText(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new RequestValidationError(`${label} is required.`);
  }
  const cleaned = cleanSingleLine(value);
  if (!cleaned) {
    throw new RequestValidationError(`${label} is required.`);
  }
  if (cleaned.length > maxLength) {
    throw new RequestValidationError(`${label} is too long.`);
  }
  return cleaned;
}

function optionalMultiline(value: unknown, label: string, maxLength: number): string {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") {
    throw new RequestValidationError(`${label} must be text.`);
  }
  const cleaned = cleanMultiline(value);
  if (cleaned.length > maxLength) {
    throw new RequestValidationError(`${label} is too long.`);
  }
  return cleaned;
}

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new RequestValidationError(`${label} is required.`);
  }
  return value as Record<string, unknown>;
}

function normalizeRecipientEmail(value: unknown): string {
  const email = requiredText(value, "Recipient email", 254).toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new RequestValidationError("Enter a valid recipient email.");
  }
  return email;
}

function normalizeArticleUrl(rawUrl: unknown, source: ArticleSourceConfig): string {
  const value = requiredText(rawUrl, "Article URL", 2048);
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new RequestValidationError("Article URL is invalid.");
  }

  if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
    throw new RequestValidationError("Article URL is not permitted.");
  }

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
  const allowed = source.hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  if (!allowed) {
    throw new SourceNotAllowedError("Article source does not match its URL.");
  }

  return parsed.toString();
}

function normalizeShareInput(value: unknown): ShareArticleInput {
  const body = asRecord(value, "Request body");
  const article = asRecord(body.article, "Article");
  const surface = requiredText(article.surface, "Article surface", 40);
  if (surface !== "beverage-news" && surface !== "flavor-blog") {
    throw new RequestValidationError("Article surface is not supported.");
  }

  const sourceId = requiredText(article.sourceId, "Article source", 160);
  const source = ARTICLE_SOURCES[surface][sourceId];
  if (!source) {
    throw new SourceNotAllowedError("Article source is not supported.");
  }

  const articleId = requiredText(article.articleId ?? article.id, "Article ID", 1024);
  const requestedSourceName =
    typeof article.sourceName === "string" ? cleanSingleLine(article.sourceName) : "";
  if (requestedSourceName && requestedSourceName.length > 160) {
    throw new RequestValidationError("Article source name is too long.");
  }

  return {
    recipientName: requiredText(body.recipientName, "Recipient name", 80),
    recipientEmail: normalizeRecipientEmail(body.recipientEmail),
    message: optionalMultiline(body.message, "Personal message", 500),
    article: {
      surface,
      articleId,
      sourceId,
      sourceName: source.name,
      title: requiredText(article.title, "Article title", 500),
      url: normalizeArticleUrl(article.url, source),
      summary: optionalMultiline(article.summary, "Article summary", 1000)
    }
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPE[character]);
}

function getBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() ?? "";
}

async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  return await fetch(input, {
    ...init,
    signal: AbortSignal.timeout(timeoutMs)
  });
}

async function fetchAuthenticatedUser(token: string): Promise<AuthenticatedUser | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim() ?? "";
  if (!supabaseUrl || !supabaseAnonKey || !token) return null;

  try {
    const response = await fetchWithTimeout(
      `${supabaseUrl}/auth/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: supabaseAnonKey
        }
      },
      SUPABASE_TIMEOUT_MS
    );
    if (!response.ok) return null;
    const payload = (await response.json()) as { id?: unknown };
    return typeof payload.id === "string" && payload.id ? { id: payload.id } : null;
  } catch {
    return null;
  }
}

async function fetchSenderDisplayName(userId: string, token: string): Promise<string> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim() ?? "";
  if (!supabaseUrl || !supabaseAnonKey) return "A Sip Studies member";

  try {
    const url = new URL(`${supabaseUrl}/rest/v1/profiles`);
    url.searchParams.set("id", `eq.${userId}`);
    url.searchParams.set("select", "display_name");
    url.searchParams.set("limit", "1");
    const response = await fetchWithTimeout(
      url.toString(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: supabaseAnonKey
        }
      },
      SUPABASE_TIMEOUT_MS
    );
    if (!response.ok) return "A Sip Studies member";
    const rows = (await response.json()) as Array<{ display_name?: unknown }>;
    const displayName =
      typeof rows[0]?.display_name === "string"
        ? cleanSingleLine(rows[0].display_name).slice(0, 120)
        : "";
    return displayName || "A Sip Studies member";
  } catch {
    return "A Sip Studies member";
  }
}

async function consumeRateLimit(
  userId: string,
  functionName: string,
  windowSeconds: number,
  maxRequests: number
): Promise<RateLimitResult> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim() ?? "";
  if (!supabaseUrl || !serviceRoleKey) return "unavailable";

  try {
    const response = await fetchWithTimeout(
      `${supabaseUrl}/rest/v1/rpc/consume_rate_limit`,
      {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_function_name: functionName,
          p_user_id: userId,
          p_window_seconds: windowSeconds,
          p_max_requests: maxRequests
        })
      },
      SUPABASE_TIMEOUT_MS
    );
    if (!response.ok) return "unavailable";
    return (await response.json()) === true ? "allowed" : "blocked";
  } catch {
    return "unavailable";
  }
}

function buildEmail(
  input: ShareArticleInput,
  senderName: string
): { subject: string; html: string; text: string } {
  const articleUrl = escapeHtml(input.article.url);
  const messageHtml = input.message
    ? `<div style="margin:24px 0;padding:16px;border-left:4px solid #0f766e;background:#f0fdfa;">`
      + `<p style="margin:0 0 8px;font-weight:700;">Personal message</p>`
      + `<p style="margin:0;white-space:pre-wrap;">${escapeHtml(input.message)}</p></div>`
    : "";
  const summaryHtml = input.article.summary
    ? `<p style="margin:12px 0 0;color:#475569;">${escapeHtml(input.article.summary)}</p>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f8fafc;color:#0f172a;font-family:Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:16px;padding:28px;">
        <p style="margin:0 0 20px;color:#0f766e;font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">Sip Studies</p>
        <p style="margin:0 0 18px;">Hello ${escapeHtml(input.recipientName)},</p>
        <p style="margin:0 0 24px;"><strong>${escapeHtml(senderName)}</strong> shared an article with you through Sip Studies.</p>
        ${messageHtml}
        <div style="margin:24px 0;padding:20px;background:#f8fafc;border-radius:12px;">
          <p style="margin:0 0 8px;color:#64748b;font-size:14px;">${escapeHtml(input.article.sourceName)}</p>
          <h1 style="margin:0;font-size:24px;line-height:1.3;">${escapeHtml(input.article.title)}</h1>
          ${summaryHtml}
        </div>
        <p style="margin:24px 0;">
          <a href="${articleUrl}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700;">Read the article</a>
        </p>
        <p style="margin:28px 0 0;color:#64748b;font-size:13px;line-height:1.5;">
          This one-time message was sent because ${escapeHtml(senderName)} shared an article with you.
          You have not been added to a marketing list.
        </p>
      </div>
      <p style="margin:16px 0 0;text-align:center;color:#64748b;font-size:12px;">
        <a href="${CANONICAL_APP_ORIGIN}" style="color:#0f766e;">Sip Studies</a>
      </p>
    </div>
  </body>
</html>`;

  const messageText = input.message ? `Personal message:\n${input.message}\n\n` : "";
  const summaryText = input.article.summary ? `${input.article.summary}\n\n` : "";
  const text = `Hello ${input.recipientName},

${senderName} shared an article with you through Sip Studies.

${messageText}${input.article.title}
Source: ${input.article.sourceName}

${summaryText}Read the article:
${input.article.url}

This one-time message was sent because ${senderName} shared an article with you. You have not been added to a marketing list.

Sip Studies
${CANONICAL_APP_ORIGIN}`;

  return {
    subject: `${senderName} shared an article with you through Sip Studies`,
    html,
    text
  };
}

function validSender(value: string): boolean {
  return value.length > 3
    && value.length <= 320
    && !/[\r\n]/.test(value)
    && /@/.test(value);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    if (hasDisallowedRequestOrigin(request)) {
      return json(request, 403, { error: "Origin is not allowed." });
    }
    return new Response("ok", { headers: responseHeaders(request) });
  }

  if (request.method !== "POST") {
    return json(request, 405, { error: "Use POST only." });
  }

  if (hasDisallowedRequestOrigin(request)) {
    return json(request, 403, { error: "Origin is not allowed." });
  }

  const requestId = crypto.randomUUID();

  try {
    const token = getBearerToken(request);
    const user = await fetchAuthenticatedUser(token);
    if (!user) {
      return json(request, 401, { error: "Authentication required." });
    }

    const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.includes("application/json")) {
      return json(request, 415, { error: "Use application/json." });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return json(request, 413, { error: "Share request is too large." });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return json(request, 400, { error: "Share request is not valid JSON." });
    }
    const input = normalizeShareInput(body);

    const resendApiKey = Deno.env.get("RESEND_API_KEY")?.trim() ?? "";
    const from = Deno.env.get("ARTICLE_SHARE_FROM_EMAIL")?.trim() ?? "";
    if (!resendApiKey || !validSender(from)) {
      console.error("share-article provider is not configured", { requestId });
      return json(request, 503, { error: "Article sharing is temporarily unavailable.", requestId });
    }

    const hourlyLimit = await consumeRateLimit(user.id, "share-article-hour", 3_600, 5);
    if (hourlyLimit === "unavailable") {
      return json(request, 503, { error: "Article sharing is temporarily unavailable.", requestId });
    }
    if (hourlyLimit === "blocked") {
      return json(request, 429, { error: "Hourly article-sharing limit reached. Try again later." });
    }

    const dailyLimit = await consumeRateLimit(user.id, "share-article-day", 86_400, 20);
    if (dailyLimit === "unavailable") {
      return json(request, 503, { error: "Article sharing is temporarily unavailable.", requestId });
    }
    if (dailyLimit === "blocked") {
      return json(request, 429, { error: "Daily article-sharing limit reached. Try again tomorrow." });
    }

    const senderName = await fetchSenderDisplayName(user.id, token);
    const email = buildEmail(input, senderName);
    const providerResponse = await fetchWithTimeout(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from,
          to: [input.recipientEmail],
          subject: email.subject,
          html: email.html,
          text: email.text
        })
      },
      PROVIDER_TIMEOUT_MS
    );

    if (!providerResponse.ok) {
      console.error("share-article provider request failed", {
        requestId,
        status: providerResponse.status
      });
      return json(request, 502, { error: "The article could not be sent. Try again later.", requestId });
    }

    const providerPayload = (await providerResponse.json()) as { id?: unknown };
    const deliveryId = typeof providerPayload.id === "string" ? providerPayload.id : null;
    return json(request, 202, {
      delivered: true,
      deliveryId,
      requestId
    });
  } catch (error: unknown) {
    if (error instanceof SourceNotAllowedError) {
      return json(request, 403, { error: error.message });
    }
    if (error instanceof RequestValidationError) {
      return json(request, 400, { error: error.message });
    }
    console.error("share-article error", { requestId, error });
    return json(request, 500, { error: "Internal server error.", requestId });
  }
});
