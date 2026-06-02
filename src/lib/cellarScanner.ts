import { supabase } from "./supabase";

export const CELLAR_SCANNER_STORAGE_KEY = "sipstudies:cellar-scanner:records:v1";
export const CELLAR_SCANNER_EVENT = "sipstudies:cellar-scanner-records-updated";

export type CellarBeverageType = "wine" | "beer" | "spirits" | "other";
export type CellarScanSource = "label" | "menu" | "manual";

export type CellarStudyLink = {
  label: string;
  route: string;
  detail: string;
};

export type CellarLookupLink = {
  label: string;
  href: string;
  detail: string;
};

export type CellarMetadataSignal = {
  label: string;
  status: "ready" | "missing";
  detail: string;
};

export type CellarMetadataProfile = {
  score: number;
  query: string;
  drinkWindow: string;
  priceStatus: string;
  signals: CellarMetadataSignal[];
  lookupLinks: CellarLookupLink[];
};

export type CellarTastingFeedbackDraft = {
  appearance: string;
  aroma: string;
  palate: string;
  structure: string;
  finish: string;
  conclusion: string;
  faultCheck: string;
  serviceIntent: string;
};

export type CellarTastingFeedbackSignal = {
  label: string;
  status: "ready" | "missing" | "watch";
  detail: string;
};

export type CellarTastingFeedbackProfile = {
  score: number;
  title: string;
  summary: string;
  calibration: string;
  signals: CellarTastingFeedbackSignal[];
  coachingPrompts: string[];
  nextActions: string[];
  journalPrompt: string;
};

export type CellarScanDraft = {
  sourceType: CellarScanSource;
  rawText: string;
  beverageType: CellarBeverageType;
  producer: string;
  name: string;
  vintage: string;
  region: string;
  country: string;
  grapeOrStyle: string;
  abv: string;
  cellarSlot: string;
  quantity: number;
  rating: number;
  pairingNeed: string;
  notes: string;
};

export type CellarScanRecord = CellarScanDraft & {
  id: string;
  capturedAt: string;
  updatedAt: string;
  studyLinks: CellarStudyLink[];
  recommendations: string[];
  cloudBacked?: boolean;
};

export type CellarScannerSnapshot = {
  records: CellarScanRecord[];
  totalBottles: number;
  averageRating: number;
  topRegions: string[];
  latestRecord: CellarScanRecord | null;
};

const wineTerms = ["wine", "cabernet", "pinot", "merlot", "syrah", "shiraz", "chardonnay", "sauvignon", "riesling", "grenache", "nebbiolo", "rioja", "bordeaux", "burgundy", "champagne", "prosecco", "cava"];
const beerTerms = ["beer", "lager", "pilsner", "ipa", "ale", "stout", "porter", "saison", "gose", "kolsch", "hazy", "draught", "draft"];
const spiritsTerms = ["whiskey", "whisky", "bourbon", "rye", "scotch", "gin", "vodka", "rum", "tequila", "mezcal", "brandy", "cognac", "armagnac", "liqueur"];
const countryTerms = ["France", "Italy", "Spain", "Portugal", "Germany", "Austria", "Greece", "United States", "USA", "California", "Oregon", "Washington", "Argentina", "Chile", "Australia", "New Zealand", "South Africa", "Mexico", "Japan", "Ireland", "Scotland"];
const regionTerms = ["Bordeaux", "Burgundy", "Champagne", "Loire", "Rhone", "Alsace", "Rioja", "Ribera", "Tuscany", "Piedmont", "Veneto", "Napa", "Sonoma", "Willamette", "Marlborough", "Barossa", "Mosel", "Douro", "Jerez"];
const CLOUD_CELLAR_RECORD_COLUMNS =
  "id,source_type,raw_text,beverage_type,producer,name,vintage,region,country,grape_or_style,abv,cellar_slot,quantity,rating,pairing_need,notes,captured_at,updated_at";
const CLOUD_CELLAR_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type CloudCellarScanRecordRow = {
  id: string;
  source_type: CellarScanSource;
  raw_text: string;
  beverage_type: CellarBeverageType;
  producer: string;
  name: string;
  vintage: string;
  region: string;
  country: string;
  grape_or_style: string;
  abv: string;
  cellar_slot: string;
  quantity: number;
  rating: number;
  pairing_need: string;
  notes: string;
  captured_at: string;
  updated_at: string;
};

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function asText(value: unknown): string {
  return typeof value === "string" ? value : typeof value === "number" ? String(value) : "";
}

function asNumber(value: unknown, fallback: number): number {
  const numberValue = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function truncateText(value: string, maxLength: number): string {
  const normalized = value.trim();
  if (normalized.length <= maxLength) return normalized;
  return normalized.slice(0, maxLength);
}

function newLocalId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `cellar-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function includesAny(haystack: string, needles: string[]): boolean {
  return needles.some((term) => haystack.includes(term.toLowerCase()));
}

function firstMatch(rawText: string, terms: string[]): string {
  const lower = rawText.toLowerCase();
  return terms.find((term) => lower.includes(term.toLowerCase())) ?? "";
}

function cleanLines(rawText: string): string[] {
  return rawText
    .split(/\r?\n|[|]/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length >= 3 && !/^[\d\s.,:%-]+$/.test(line));
}

export function inferCellarBeverageType(rawText: string): CellarBeverageType {
  const lower = rawText.toLowerCase();
  if (includesAny(lower, beerTerms)) return "beer";
  if (includesAny(lower, spiritsTerms)) return "spirits";
  if (includesAny(lower, wineTerms) || /\b(19|20)\d{2}\b/.test(lower)) return "wine";
  return "other";
}

export function cellarStudyLinksForRecord(record: Pick<CellarScanDraft, "beverageType" | "grapeOrStyle" | "region" | "country">): CellarStudyLink[] {
  if (record.beverageType === "beer") {
    return [
      { label: "Beer Quiz", route: "app/beverage-quiz", detail: "Retake beer style, draught, and off-flavor questions" },
      { label: "Sip Game", route: "app/sip-game", detail: "Review production and equipment checkpoints" },
      { label: "Resources", route: "app/resources", detail: "Use recall lists for beer and service terms" }
    ];
  }
  if (record.beverageType === "spirits") {
    return [
      { label: "Spirits Quiz", route: "app/beverage-quiz", detail: "Practice spirits category and production logic" },
      { label: "Bev Recipes", route: "app/cocktails", detail: "Connect base spirits to classic builds" },
      { label: "Flavor Wheel", route: "app/flavor-wheel", detail: "Calibrate aroma and texture language" }
    ];
  }
  if (record.beverageType === "wine") {
    const search = encodeURIComponent(record.grapeOrStyle || record.region || record.country || "wine");
    return [
      { label: "Sipopedia", route: `app/sipopedia?search=${search}`, detail: "Search the label clue as a study term" },
      { label: "Regions", route: "app/regions", detail: "Map the label to geography and appellation context" },
      { label: "Journal", route: "app/flavors", detail: "Turn the scan into a structured tasting note" }
    ];
  }
  return [
    { label: "Sipopedia", route: "app/sipopedia?search=label", detail: "Search the extracted label text" },
    { label: "Tasting Journal", route: "app/flavors", detail: "Capture a structured note" },
    { label: "Resources", route: "app/resources", detail: "Use reference lists for category recall" }
  ];
}

export function cellarRecommendationsForRecord(record: Pick<CellarScanDraft, "beverageType" | "region" | "country" | "grapeOrStyle" | "pairingNeed" | "rating">): string[] {
  const pairing = record.pairingNeed.trim();
  const origin = [record.region, record.country].filter(Boolean).join(", ");
  const recommendations = [
    origin ? `Study the origin context for ${origin} before opening or recommending it.` : "Add region and country so future notes can group by origin.",
    record.grapeOrStyle ? `Compare ${record.grapeOrStyle} against one contrasting style in the same category.` : "Add grape, style, or base spirit so the scanner can route better study work.",
    pairing ? `Use ${pairing} as the pairing scenario when you write the tasting note.` : "Add a pairing goal to turn this from inventory into service practice."
  ];
  if (record.beverageType === "wine") recommendations.push("Track drink window, storage temperature, and whether the bottle needs decanting or chilling.");
  if (record.beverageType === "beer") recommendations.push("Prioritize freshness, storage temperature, draught/service clues, and off-flavor checks.");
  if (record.beverageType === "spirits") recommendations.push("Track base material, production method, age, proof, and cocktail use case.");
  if (record.rating >= 90) recommendations.push("Flag this as a benchmark bottle and write a full study note after tasting.");
  return recommendations;
}

function buildLookupQuery(record: Pick<CellarScanDraft, "producer" | "name" | "vintage" | "region" | "country" | "grapeOrStyle">): string {
  return [record.producer, record.name, record.vintage, record.region, record.country, record.grapeOrStyle]
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");
}

function buildDrinkWindow(record: Pick<CellarScanDraft, "beverageType" | "vintage" | "grapeOrStyle" | "region">): string {
  if (record.beverageType === "beer") return "Freshness first: check package date, cold chain, and style expectations before holding.";
  if (record.beverageType === "spirits") return "Stable after bottling: track open date, proof, closure, and cocktail use case.";
  const vintage = Number(record.vintage);
  if (!Number.isFinite(vintage)) return "Add vintage or release year, then verify producer guidance before assigning a drink window.";
  const currentYear = new Date().getFullYear();
  const age = currentYear - vintage;
  if (age >= 15) return `Review now: ${record.vintage} is ${age} years old, so verify condition, region, and style before holding longer.`;
  if (age >= 7) return `Monitor: ${record.vintage} is entering a maturity-check window; compare producer notes and recent community reviews.`;
  if (age >= 3) return "Track annually: add style, region, and storage notes before deciding whether to hold or open.";
  return "Likely early drinking or short-term hold unless producer/style evidence says otherwise.";
}

function hasUsefulText(value: string, minWords = 3): boolean {
  return value.trim().split(/\s+/).filter(Boolean).length >= minWords;
}

function detailOrPrompt(value: string, prompt: string): string {
  return value.trim() || prompt;
}

function structurePrompt(beverageType: CellarBeverageType): string {
  if (beverageType === "beer") return "Record sweetness, bitterness, carbonation, body, malt/hop balance, temperature, and any off-flavor flags.";
  if (beverageType === "spirits") return "Record texture, proof heat, sweetness, barrel/spice/fruit balance, dilution response, and cocktail use case.";
  return "Record sweetness, acidity, tannin/phenolic grip, alcohol, body, texture, and whether the structure supports the finish.";
}

function conclusionPrompt(record: Pick<CellarScanDraft, "beverageType" | "pairingNeed">): string {
  const service = record.pairingNeed.trim();
  if (service) return `Conclude whether the drink succeeds for ${service}, then name one serving adjustment.`;
  if (record.beverageType === "beer") return "Conclude style fit, freshness, service temperature, glassware, and one pairing or draught-service adjustment.";
  if (record.beverageType === "spirits") return "Conclude neat vs mixed use, dilution choice, service temperature, and one cocktail or pairing application.";
  return "Conclude quality, readiness, typicity, pairing fit, and whether to drink, hold, chill, or decant.";
}

function beverageCalibration(record: Pick<CellarScanDraft, "beverageType" | "region" | "country" | "grapeOrStyle" | "vintage">): string {
  const identity = [record.vintage, record.grapeOrStyle, record.region, record.country].filter(Boolean).join(" ");
  if (record.beverageType === "beer") return `${identity || "This beer"} should be checked against freshness, style markers, carbonation, bitterness, malt balance, and package or draught condition.`;
  if (record.beverageType === "spirits") return `${identity || "This spirit"} should be checked against base material, production method, proof integration, texture, finish, and whether it is better neat, diluted, or mixed.`;
  return `${identity || "This wine"} should be checked against observed fruit condition, structure, development, balance, finish, and service readiness before external ratings influence the note.`;
}

export function emptyCellarTastingFeedbackDraft(): CellarTastingFeedbackDraft {
  return {
    appearance: "",
    aroma: "",
    palate: "",
    structure: "",
    finish: "",
    conclusion: "",
    faultCheck: "",
    serviceIntent: ""
  };
}

export function buildCellarTastingFeedbackProfile(
  record: CellarScanDraft,
  feedback: CellarTastingFeedbackDraft
): CellarTastingFeedbackProfile {
  const serviceIntent = feedback.serviceIntent.trim() || record.pairingNeed.trim();
  const signals: CellarTastingFeedbackSignal[] = [
    {
      label: "Appearance",
      status: hasUsefulText(feedback.appearance) ? "ready" : "missing",
      detail: detailOrPrompt(feedback.appearance, "Add color, clarity, concentration, rim/foam/head, legs, or visible condition.")
    },
    {
      label: "Aroma",
      status: hasUsefulText(feedback.aroma, 5) ? "ready" : "missing",
      detail: detailOrPrompt(feedback.aroma, "Add at least three aroma clusters and note intensity or development.")
    },
    {
      label: "Palate",
      status: hasUsefulText(feedback.palate, 5) ? "ready" : "missing",
      detail: detailOrPrompt(feedback.palate, "Add flavor evidence, intensity, texture, and whether the palate confirms the nose.")
    },
    {
      label: "Structure",
      status: hasUsefulText(feedback.structure, 5) ? "ready" : "missing",
      detail: detailOrPrompt(feedback.structure, structurePrompt(record.beverageType))
    },
    {
      label: "Finish",
      status: hasUsefulText(feedback.finish) ? "ready" : "missing",
      detail: detailOrPrompt(feedback.finish, "Add finish length, aftertaste, balance, and any harshness or drop-off.")
    },
    {
      label: "Fault check",
      status: feedback.faultCheck.trim() ? "ready" : "watch",
      detail: detailOrPrompt(feedback.faultCheck, "State clean, questionable, or flawed, then name the evidence.")
    },
    {
      label: "Conclusion",
      status: hasUsefulText(feedback.conclusion, 5) ? "ready" : "missing",
      detail: detailOrPrompt(feedback.conclusion, conclusionPrompt(record))
    },
    {
      label: "Service intent",
      status: serviceIntent ? "ready" : "watch",
      detail: serviceIntent || "Add guest, food, occasion, cellar, or exam-practice goal."
    }
  ];
  const readyCount = signals.filter((signal) => signal.status === "ready").length;
  const score = Math.round((readyCount / signals.length) * 100);
  const missing = signals.filter((signal) => signal.status !== "ready").map((signal) => signal.label.toLowerCase());
  const title = record.name || record.producer || record.grapeOrStyle || "Untitled cellar scan";
  const coachingPrompts = [
    missing.length ? `Tighten these areas before trusting the conclusion: ${missing.join(", ")}.` : "The note has enough evidence to support a mentor review packet.",
    "Write observations before reading external ratings or community reviews.",
    record.grapeOrStyle ? `Compare the note against a contrasting ${record.grapeOrStyle} example to calibrate typicity.` : "Add grape, style, or base spirit so the feedback can compare against a clearer benchmark.",
    serviceIntent ? `Test the conclusion against this service goal: ${serviceIntent}.` : "Add a service goal so the note produces a practical recommendation."
  ];
  const nextActions = [
    score >= 75 ? "Save or export this as a mentor-ready tasting packet." : "Fill the missing evidence fields, then export the packet for review.",
    "Open the tasting journal and turn the feedback into a structured note.",
    "Run one external lookup only after the observation-first note is complete.",
    record.beverageType === "wine"
      ? "Decide drink, hold, chill, or decant from structure and finish evidence."
      : record.beverageType === "beer"
        ? "Decide freshness, serving temperature, and style fit from aroma, carbonation, and finish."
        : "Decide neat, diluted, mixed, or paired use from texture, proof integration, and finish."
  ];

  return {
    score,
    title,
    summary: `${score}% tasting feedback readiness for ${title}.`,
    calibration: beverageCalibration(record),
    signals,
    coachingPrompts,
    nextActions,
    journalPrompt: [
      `Tasting note for ${title}`,
      `Appearance: ${feedback.appearance || "[add appearance]"}`,
      `Aroma: ${feedback.aroma || "[add aroma]"}`,
      `Palate: ${feedback.palate || "[add palate]"}`,
      `Structure: ${feedback.structure || "[add structure]"}`,
      `Finish: ${feedback.finish || "[add finish]"}`,
      `Fault check: ${feedback.faultCheck || "[clean/questionable/flawed]"}`,
      `Conclusion: ${feedback.conclusion || "[add conclusion]"}`,
      `Service intent: ${serviceIntent || "[add service intent]"}`
    ].join("\n")
  };
}

export function cellarMetadataProfileForRecord(record: CellarScanDraft): CellarMetadataProfile {
  const query = buildLookupQuery(record) || record.rawText.split(/\s+/).slice(0, 8).join(" ");
  const signals: CellarMetadataSignal[] = [
    {
      label: "Identity",
      status: record.producer.trim() || record.name.trim() ? "ready" : "missing",
      detail: record.producer || record.name || "Add producer and cuvee/item name."
    },
    {
      label: "Vintage",
      status: record.vintage.trim() || record.beverageType !== "wine" ? "ready" : "missing",
      detail: record.vintage || "Add vintage, NV, or package/release date."
    },
    {
      label: "Origin",
      status: record.region.trim() || record.country.trim() ? "ready" : "missing",
      detail: [record.region, record.country].filter(Boolean).join(", ") || "Add region and country."
    },
    {
      label: "Style",
      status: record.grapeOrStyle.trim() ? "ready" : "missing",
      detail: record.grapeOrStyle || "Add grape, style, or base spirit."
    },
    {
      label: "Service",
      status: record.abv.trim() || record.pairingNeed.trim() ? "ready" : "missing",
      detail: record.abv || record.pairingNeed || "Add ABV, pairing, or service goal."
    },
    {
      label: "Cellar",
      status: record.cellarSlot.trim() || record.quantity > 0 ? "ready" : "missing",
      detail: record.cellarSlot || `${record.quantity} bottle${record.quantity === 1 ? "" : "s"} tracked.`
    }
  ];
  const score = Math.round((signals.filter((signal) => signal.status === "ready").length / signals.length) * 100);
  const encoded = encodeURIComponent(query || "wine");
  const lookupLinks: CellarLookupLink[] = [
    {
      label: "Vivino Lookup",
      href: `https://www.vivino.com/search/wines?q=${encoded}`,
      detail: "Check community ratings, reviews, food pairing, and marketplace context."
    },
    {
      label: "Wine-Searcher",
      href: `https://www.wine-searcher.com/find/${encoded}`,
      detail: "Cross-check public price and merchant availability before trusting an estimated value."
    },
    {
      label: "Producer Search",
      href: `https://www.google.com/search?q=${encoded}+producer+tech+sheet`,
      detail: "Find producer notes, technical sheets, release notes, or official serving guidance."
    }
  ];
  return {
    score,
    query,
    drinkWindow: buildDrinkWindow(record),
    priceStatus: query ? "External price check required; no market value is stored until verified." : "Add identity fields before price lookup.",
    signals,
    lookupLinks
  };
}

export function buildCellarMetadataBrief(record: CellarScanDraft): string {
  const profile = cellarMetadataProfileForRecord(record);
  return [
    "Sip Studies Cellar Metadata Brief",
    "",
    `Lookup query: ${profile.query || "Add producer/name/vintage"}`,
    `Metadata readiness: ${profile.score}%`,
    `Drink-window prompt: ${profile.drinkWindow}`,
    `Price status: ${profile.priceStatus}`,
    "",
    "Bottle card",
    `Producer: ${record.producer || "unknown"}`,
    `Name: ${record.name || "unknown"}`,
    `Vintage: ${record.vintage || "unknown"}`,
    `Origin: ${[record.region, record.country].filter(Boolean).join(", ") || "unknown"}`,
    `Style/base: ${record.grapeOrStyle || "unknown"}`,
    `ABV: ${record.abv || "unknown"}`,
    `Cellar slot: ${record.cellarSlot || "unknown"}`,
    `Quantity: ${record.quantity}`,
    `Rating: ${record.rating || "not rated"}`,
    `Pairing/service goal: ${record.pairingNeed || "none"}`,
    "",
    "Missing/ready signals",
    ...profile.signals.map((signal) => `- ${signal.label}: ${signal.status} - ${signal.detail}`),
    "",
    "External lookup handoffs",
    ...profile.lookupLinks.map((link) => `- ${link.label}: ${link.href}`),
    "",
    "Study recommendations",
    ...cellarRecommendationsForRecord(record).map((item) => `- ${item}`)
  ].join("\n");
}

export function buildCellarTastingFeedbackPacket(record: CellarScanDraft, feedback: CellarTastingFeedbackDraft): string {
  const profile = buildCellarTastingFeedbackProfile(record, feedback);
  return [
    `# ${profile.title} Tasting Feedback Packet`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
    `Beverage type: ${record.beverageType}`,
    `Origin/style: ${[record.vintage, record.region, record.country, record.grapeOrStyle].filter(Boolean).join(" / ") || "unknown"}`,
    `Feedback readiness: ${profile.score}%`,
    "",
    "## Calibration Guardrail",
    profile.calibration,
    "",
    "## Evidence Signals",
    ...profile.signals.map((signal) => `- ${signal.label}: ${signal.status} - ${signal.detail}`),
    "",
    "## Coaching Prompts",
    ...profile.coachingPrompts.map((item) => `- ${item}`),
    "",
    "## Next Actions",
    ...profile.nextActions.map((item) => `- ${item}`),
    "",
    "## Journal Draft",
    profile.journalPrompt
  ].join("\n");
}

export function analyzeCellarText(rawText: string, sourceType: CellarScanSource): CellarScanDraft {
  const lines = cleanLines(rawText);
  const joined = lines.join(" ");
  const beverageType = inferCellarBeverageType(joined || rawText);
  const vintage = joined.match(/\b(19|20)\d{2}\b/)?.[0] ?? "";
  const abv = joined.match(/\b\d{1,2}(?:\.\d)?\s?%\s?(?:abv|alc|alcohol)?\b/i)?.[0]?.replace(/\s+/g, " ") ?? "";
  const region = firstMatch(joined, regionTerms);
  const country = firstMatch(joined, countryTerms);
  const grapeOrStyle = firstMatch(joined, [...wineTerms, ...beerTerms, ...spiritsTerms]);
  const producer = lines.find((line) => !line.includes(vintage) && line.toLowerCase() !== grapeOrStyle.toLowerCase()) ?? "";
  const name = lines.find((line) => line !== producer && !line.includes(abv)) ?? producer;
  return {
    sourceType,
    rawText,
    beverageType,
    producer,
    name,
    vintage,
    region,
    country,
    grapeOrStyle,
    abv,
    cellarSlot: "",
    quantity: 1,
    rating: 0,
    pairingNeed: "",
    notes: ""
  };
}

function normalizeRecord(value: unknown): CellarScanRecord | null {
  const record = asRecord(value);
  if (!record) return null;
  const sourceType = asText(record.sourceType);
  const beverageType = asText(record.beverageType);
  const draft: CellarScanDraft = {
    sourceType: sourceType === "menu" || sourceType === "manual" ? sourceType : "label",
    rawText: asText(record.rawText),
    beverageType: beverageType === "beer" || beverageType === "spirits" || beverageType === "other" ? beverageType : "wine",
    producer: asText(record.producer),
    name: asText(record.name),
    vintage: asText(record.vintage),
    region: asText(record.region),
    country: asText(record.country),
    grapeOrStyle: asText(record.grapeOrStyle),
    abv: asText(record.abv),
    cellarSlot: asText(record.cellarSlot),
    quantity: clamp(Math.round(asNumber(record.quantity, 1)), 0, 999),
    rating: clamp(Math.round(asNumber(record.rating, 0)), 0, 100),
    pairingNeed: asText(record.pairingNeed),
    notes: asText(record.notes)
  };
  return {
    ...draft,
    id: asText(record.id) || newLocalId(),
    capturedAt: asText(record.capturedAt) || new Date().toISOString(),
    updatedAt: asText(record.updatedAt) || new Date().toISOString(),
    studyLinks: cellarStudyLinksForRecord(draft),
    recommendations: cellarRecommendationsForRecord(draft)
  };
}

function mapCloudCellarRecord(row: CloudCellarScanRecordRow): CellarScanRecord {
  const draft: CellarScanDraft = {
    sourceType: row.source_type,
    rawText: row.raw_text,
    beverageType: row.beverage_type,
    producer: row.producer,
    name: row.name,
    vintage: row.vintage,
    region: row.region,
    country: row.country,
    grapeOrStyle: row.grape_or_style,
    abv: row.abv,
    cellarSlot: row.cellar_slot,
    quantity: row.quantity,
    rating: row.rating,
    pairingNeed: row.pairing_need,
    notes: row.notes
  };
  return {
    ...draft,
    id: row.id,
    capturedAt: row.captured_at,
    updatedAt: row.updated_at,
    studyLinks: cellarStudyLinksForRecord(draft),
    recommendations: cellarRecommendationsForRecord(draft),
    cloudBacked: true
  };
}

function cloudCellarPayload(userId: string, draft: CellarScanDraft, existingId?: string | null) {
  return {
    ...(existingId && CLOUD_CELLAR_ID_PATTERN.test(existingId) ? { id: existingId } : {}),
    user_id: userId,
    source_type: draft.sourceType,
    raw_text: truncateText(draft.rawText, 8000),
    beverage_type: draft.beverageType,
    producer: truncateText(draft.producer, 180),
    name: truncateText(draft.name, 220),
    vintage: truncateText(draft.vintage, 24),
    region: truncateText(draft.region, 120),
    country: truncateText(draft.country, 120),
    grape_or_style: truncateText(draft.grapeOrStyle, 160),
    abv: truncateText(draft.abv, 32),
    cellar_slot: truncateText(draft.cellarSlot, 120),
    quantity: clamp(Math.round(draft.quantity), 0, 999),
    rating: clamp(Math.round(draft.rating), 0, 100),
    pairing_need: truncateText(draft.pairingNeed, 240),
    notes: truncateText(draft.notes, 1200)
  };
}

export function isCloudCellarRecordId(id: string): boolean {
  return CLOUD_CELLAR_ID_PATTERN.test(id);
}

export function readCellarScanRecords(): CellarScanRecord[] {
  if (typeof window === "undefined") return [];
  const parsed = safeJson(window.localStorage.getItem(CELLAR_SCANNER_STORAGE_KEY));
  return Array.isArray(parsed) ? parsed.map(normalizeRecord).filter((record): record is CellarScanRecord => Boolean(record)) : [];
}

export function readCellarScannerSnapshot(): CellarScannerSnapshot {
  const records = readCellarScanRecords();
  const totalBottles = records.reduce((sum, record) => sum + record.quantity, 0);
  const rated = records.filter((record) => record.rating > 0);
  const averageRating = rated.length ? Math.round(rated.reduce((sum, record) => sum + record.rating, 0) / rated.length) : 0;
  const regionCounts = new Map<string, number>();
  records.forEach((record) => {
    const key = record.region || record.country || record.beverageType;
    regionCounts.set(key, (regionCounts.get(key) ?? 0) + record.quantity);
  });
  const topRegions = [...regionCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([label]) => label);
  return { records, totalBottles, averageRating, topRegions, latestRecord: records[0] ?? null };
}

export function writeCellarScanRecords(records: CellarScanRecord[]): CellarScanRecord[] {
  if (typeof window === "undefined") return [];
  window.localStorage.setItem(CELLAR_SCANNER_STORAGE_KEY, JSON.stringify(records));
  window.dispatchEvent(new CustomEvent(CELLAR_SCANNER_EVENT, { detail: records }));
  return records;
}

export function saveCellarScanRecord(draft: CellarScanDraft, existingId?: string | null): CellarScanRecord[] {
  if (typeof window === "undefined") return [];
  const now = new Date().toISOString();
  const records = readCellarScanRecords();
  const record: CellarScanRecord = {
    ...draft,
    id: existingId || newLocalId(),
    capturedAt: existingId ? records.find((item) => item.id === existingId)?.capturedAt ?? now : now,
    updatedAt: now,
    studyLinks: cellarStudyLinksForRecord(draft),
    recommendations: cellarRecommendationsForRecord(draft)
  };
  const next = [record, ...records.filter((item) => item.id !== record.id)].slice(0, 80);
  return writeCellarScanRecords(next);
}

export async function listCloudCellarScanRecords(): Promise<CellarScanRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("cellar_scan_records")
    .select(CLOUD_CELLAR_RECORD_COLUMNS)
    .order("updated_at", { ascending: false })
    .limit(120);

  if (error) throw new Error(error.message);
  return ((data ?? []) as CloudCellarScanRecordRow[]).map(mapCloudCellarRecord);
}

export async function saveCloudCellarScanRecord(userId: string, draft: CellarScanDraft, existingId?: string | null): Promise<CellarScanRecord> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const payload = cloudCellarPayload(userId, draft, existingId);
  const query = existingId && CLOUD_CELLAR_ID_PATTERN.test(existingId)
    ? supabase.from("cellar_scan_records").upsert(payload, { onConflict: "id" })
    : supabase.from("cellar_scan_records").insert(payload);

  const { data, error } = await query.select(CLOUD_CELLAR_RECORD_COLUMNS).single();

  if (error) throw new Error(error.message);
  return mapCloudCellarRecord(data as CloudCellarScanRecordRow);
}

export async function updateCloudCellarScanRecordQuantity(recordId: string, quantity: number): Promise<CellarScanRecord> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("cellar_scan_records")
    .update({ quantity: clamp(Math.round(quantity), 0, 999) })
    .eq("id", recordId)
    .select(CLOUD_CELLAR_RECORD_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudCellarRecord(data as CloudCellarScanRecordRow);
}
