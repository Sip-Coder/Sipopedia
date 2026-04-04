import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { BANNED_SOURCE_PATTERNS, SOURCE_CATALOG, isBannedSource, sourceDomain } from "./terms-policy.js";

const REPO_ROOT = process.cwd();
const RUN_DIR = path.join(REPO_ROOT, "review", "terminology");
const ROTATION_STATE_PATH = path.join(RUN_DIR, "start-terms-state.json");
const DEFAULT_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DEFAULT_BATCH_PER_LETTER = 3;
const DEFAULT_TARGET = Math.max(1, Number(process.env.TERMS_TARGET || 300));
const DEFAULT_DISCOVERY_MULTIPLIER = 8;
const DEFAULT_EDITORIAL_POLICY = "Original Sipopedia editorial definition. No verbatim source text.";
const DEFAULT_SCORE_THRESHOLD = Math.max(30, Number(process.env.TERMS_SCORE_THRESHOLD || 70));
const DEFAULT_NEAR_MISS_THRESHOLD = Math.max(20, Number(process.env.TERMS_NEAR_MISS_THRESHOLD || 50));
const DEFAULT_AUTO_PUBLISH_APPROVED = String(process.env.TERMS_AUTO_PUBLISH_APPROVED || "true").toLowerCase() === "true";
const DEFAULT_ROTATE_MODE = String(process.env.TERMS_ROTATE_MODE || "true").toLowerCase() === "true";
const DEFAULT_LETTER_WINDOW = Math.max(3, Number(process.env.TERMS_LETTER_WINDOW || 8));
const DEFAULT_SOURCES_PER_TYPE = Math.max(1, Number(process.env.TERMS_SOURCES_PER_TYPE || 2));
const DEFAULT_DISCOVERY_PASSES = Math.max(1, Number(process.env.TERMS_DISCOVERY_PASSES || 3));
const DEFAULT_MIN_PROGRESS_PER_RUN = Math.max(1, Number(process.env.TERMS_MIN_PROGRESS_PER_RUN || 1));
const DEFAULT_RECOVER_UNPUBLISHED_PER_RUN = Math.max(0, Number(process.env.TERMS_RECOVER_UNPUBLISHED_PER_RUN || 50));
const UI_NOISE_TOKENS = new Set([
  "home",
  "english",
  "franais",
  "italiano",
  "deutsch",
  "intranet",
  "legal",
  "notice",
  "content",
  "presentation",
  "history",
  "job",
  "opportunity",
  "skip",
  "navigation",
  "main",
  "database",
  "who",
  "observers"
]);
const FORBIDDEN_TERM_TOKENS = new Set([
  "news",
  "guide",
  "guides",
  "jobs",
  "events",
  "features",
  "podcast",
  "podcasts",
  "shop",
  "buy",
  "buying",
  "release",
  "releases",
  "menu",
  "newsletter",
  "announces",
  "knowledge",
  "centre",
  "center",
  "maps",
  "industry",
  "here",
  "how",
  "are",
  "we",
  "you",
  "our",
  "their"
]);
const FORBIDDEN_NAV_TOKENS = new Set([
  "calendar",
  "explainers",
  "gift",
  "maps",
  "features",
  "projects",
  "desk",
  "submit",
  "press",
  "release",
  "search",
  "menu",
  "contact",
  "newsletter",
  "podcasts",
  "events",
  "guides",
  "jobs",
  "advertise",
  "special",
  "fda",
  "devices",
  "patients",
  "consumers"
]);
const STOPWORD_TOKENS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "we",
  "with"
]);
const EXACT_GENERIC_TERMS = new Set([
  "apple",
  "awards",
  "beer",
  "brew",
  "build-outs",
  "bulletin",
  "city",
  "coffee",
  "design",
  "desk",
  "drinks",
  "event",
  "events",
  "features",
  "food",
  "gear",
  "guides",
  "heroes",
  "hong",
  "hong kong",
  "jobs",
  "knowledge",
  "menu",
  "minute",
  "more",
  "news",
  "powerful",
  "release",
  "releases",
  "research",
  "rose wine",
  "shop",
  "tool",
  "various",
  "water",
  "wine"
]);
const STUDY_SIGNAL_TERMS = [
  "acidity",
  "tannin",
  "fermentation",
  "distillation",
  "extraction",
  "oxidation",
  "aroma",
  "mouthfeel",
  "yeast",
  "mash",
  "brew",
  "variet",
  "terroir",
  "lees",
  "cupping",
  "barrel",
  "aging",
  "roast",
  "tea",
  "coffee",
  "wine",
  "beer",
  "spirit",
  "sake",
  "kombucha"
];
const DEFINITION_CUES = [" is ", " refers to ", " defined as ", " means ", " describes ", " term ", " process ", " method "];
const TECHNICAL_ROOTS = [
  "acid",
  "alkal",
  "aroma",
  "attenuat",
  "barrel",
  "blend",
  "body",
  "brew",
  "brix",
  "carbonate",
  "clarif",
  "cultivar",
  "cupp",
  "decoct",
  "degas",
  "distill",
  "dosage",
  "enzyme",
  "ester",
  "extract",
  "ferment",
  "filtrat",
  "fining",
  "floccul",
  "grape",
  "hop",
  "infus",
  "lactic",
  "lees",
  "macerat",
  "mash",
  "miner",
  "mouthfeel",
  "must",
  "oxid",
  "pasteur",
  "pectin",
  "phenol",
  "ph",
  "polyphen",
  "proof",
  "refract",
  "roast",
  "sacchar",
  "salin",
  "sensory",
  "stabil",
  "sulf",
  "tannin",
  "terroir",
  "variet",
  "vinif",
  "water",
  "yeast"
];
const DEFAULT_SCORE_WEIGHTS = {
  lexicalBase: Number(process.env.TERMS_WEIGHT_LEXICAL_BASE || 20),
  studySignal: Number(process.env.TERMS_WEIGHT_STUDY_SIGNAL || 20),
  definitionCue: Number(process.env.TERMS_WEIGHT_DEFINITION_CUE || 20),
  technicalRoot: Number(process.env.TERMS_WEIGHT_TECHNICAL_ROOT || 15),
  sourceAuthority: Number(process.env.TERMS_WEIGHT_SOURCE_AUTHORITY || 10),
  specificity: Number(process.env.TERMS_WEIGHT_SPECIFICITY || 10),
  contextQuality: Number(process.env.TERMS_WEIGHT_CONTEXT_QUALITY || 5)
};
const NAV_NOISE_PATTERNS = [
  "menu search",
  "submit search",
  "submit a press release",
  "contact fda",
  "report a product problem",
  "featured report",
  "newsletter",
  "special projects desk",
  "events exclusives",
  "buying guides",
  "press releases",
  "coffee jobs",
  "english العربية",
  "select language",
  "go explore"
];
const FRAGMENT_START_TOKENS = new Set([
  "and",
  "or",
  "the",
  "a",
  "an",
  "this",
  "that",
  "these",
  "those",
  "much",
  "new",
  "made",
  "numerous",
  "easy",
  "final",
  "help",
  "close"
]);

function parseArgs(argv) {
  const opts = {
    letters: DEFAULT_LETTERS,
    batchPerLetter: DEFAULT_BATCH_PER_LETTER,
    target: DEFAULT_TARGET,
    discoveryMultiplier: Math.max(2, Number(process.env.TERMS_DISCOVERY_MULTIPLIER || DEFAULT_DISCOVERY_MULTIPLIER)),
    scoreThreshold: DEFAULT_SCORE_THRESHOLD,
    nearMissThreshold: DEFAULT_NEAR_MISS_THRESHOLD,
    autoPublishApproved: DEFAULT_AUTO_PUBLISH_APPROVED,
    rotateMode: DEFAULT_ROTATE_MODE,
    letterWindow: DEFAULT_LETTER_WINDOW,
    sourcesPerType: DEFAULT_SOURCES_PER_TYPE,
    discoveryPasses: DEFAULT_DISCOVERY_PASSES,
    minProgressPerRun: DEFAULT_MIN_PROGRESS_PER_RUN,
    recoverUnpublishedPerRun: DEFAULT_RECOVER_UNPUBLISHED_PER_RUN,
    dryRun: argv.includes("--dry-run"),
    lettersExplicit: false,
    beverageTypesExplicit: false,
    beverageTypes: Object.keys(SOURCE_CATALOG),
    timeoutMs: Number(process.env.TERMS_FETCH_TIMEOUT_MS || 12000),
    scoreWeights: { ...DEFAULT_SCORE_WEIGHTS }
  };

  for (let i = 0; i < argv.length; i += 1) {
    const part = argv[i];
    if (part === "--letters" && argv[i + 1]) {
      opts.letters = String(argv[i + 1]).toUpperCase();
      opts.lettersExplicit = true;
      i += 1;
    } else if (part === "--batch-per-letter" && argv[i + 1]) {
      opts.batchPerLetter = Math.max(1, Number(argv[i + 1]) || DEFAULT_BATCH_PER_LETTER);
      i += 1;
    } else if (part === "--target" && argv[i + 1]) {
      opts.target = Math.max(1, Number(argv[i + 1]) || DEFAULT_TARGET);
      i += 1;
    } else if (part === "--discovery-multiplier" && argv[i + 1]) {
      opts.discoveryMultiplier = Math.max(2, Number(argv[i + 1]) || DEFAULT_DISCOVERY_MULTIPLIER);
      i += 1;
    } else if (part === "--score-threshold" && argv[i + 1]) {
      opts.scoreThreshold = Math.max(30, Number(argv[i + 1]) || DEFAULT_SCORE_THRESHOLD);
      i += 1;
    } else if (part === "--near-miss-threshold" && argv[i + 1]) {
      opts.nearMissThreshold = Math.max(20, Number(argv[i + 1]) || DEFAULT_NEAR_MISS_THRESHOLD);
      i += 1;
    } else if (part === "--auto-publish-approved" && argv[i + 1]) {
      const next = String(argv[i + 1]).toLowerCase();
      opts.autoPublishApproved = next === "true";
      i += 1;
    } else if (part === "--rotate-mode" && argv[i + 1]) {
      const next = String(argv[i + 1]).toLowerCase();
      opts.rotateMode = next === "true";
      i += 1;
    } else if (part === "--letter-window" && argv[i + 1]) {
      opts.letterWindow = Math.max(3, Number(argv[i + 1]) || DEFAULT_LETTER_WINDOW);
      i += 1;
    } else if (part === "--sources-per-type" && argv[i + 1]) {
      opts.sourcesPerType = Math.max(1, Number(argv[i + 1]) || DEFAULT_SOURCES_PER_TYPE);
      i += 1;
    } else if (part === "--discovery-passes" && argv[i + 1]) {
      opts.discoveryPasses = Math.max(1, Number(argv[i + 1]) || DEFAULT_DISCOVERY_PASSES);
      i += 1;
    } else if (part === "--min-progress-per-run" && argv[i + 1]) {
      opts.minProgressPerRun = Math.max(1, Number(argv[i + 1]) || DEFAULT_MIN_PROGRESS_PER_RUN);
      i += 1;
    } else if (part === "--recover-unpublished-per-run" && argv[i + 1]) {
      opts.recoverUnpublishedPerRun = Math.max(0, Number(argv[i + 1]) || DEFAULT_RECOVER_UNPUBLISHED_PER_RUN);
      i += 1;
    } else if (part === "--beverage-types" && argv[i + 1]) {
      const requested = String(argv[i + 1])
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      if (requested.length > 0) {
        opts.beverageTypes = requested.filter((t) => Object.prototype.hasOwnProperty.call(SOURCE_CATALOG, t));
        opts.beverageTypesExplicit = true;
      }
      i += 1;
    }
  }

  return opts;
}

function nowIso() {
  return new Date().toISOString();
}

function readRotationState() {
  try {
    const raw = fs.readFileSync(ROTATION_STATE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    const runIndex = Math.max(0, Number(parsed.run_index) || 0);
    return { run_index: runIndex };
  } catch {
    return { run_index: 0 };
  }
}

function writeRotationState(state) {
  fs.mkdirSync(RUN_DIR, { recursive: true });
  fs.writeFileSync(ROTATION_STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

function rotateList(list, offset) {
  const arr = [...list];
  if (arr.length === 0) return arr;
  const normalizedOffset = ((offset % arr.length) + arr.length) % arr.length;
  return [...arr.slice(normalizedOffset), ...arr.slice(0, normalizedOffset)];
}

function chooseRotatedLetters(args, runIndex) {
  const fallbackLetters = [...new Set(args.letters.split("").filter((ch) => /^[A-Z]$/.test(ch)))];
  if (!args.rotateMode || args.lettersExplicit) {
    return fallbackLetters.length > 0 ? fallbackLetters : [...DEFAULT_LETTERS];
  }

  const alphabet = [...DEFAULT_LETTERS];
  const windowSize = Math.min(alphabet.length, Math.max(1, args.letterWindow));
  const start = (runIndex * windowSize) % alphabet.length;
  const picked = [];
  for (let i = 0; i < windowSize; i += 1) {
    picked.push(alphabet[(start + i) % alphabet.length]);
  }
  return picked;
}

function chooseRotatedBeverageTypes(args, runIndex) {
  const requestedTypes = args.beverageTypes.length > 0 ? args.beverageTypes : Object.keys(SOURCE_CATALOG);
  if (!args.rotateMode || args.beverageTypesExplicit) return requestedTypes;
  return rotateList(requestedTypes, runIndex);
}

function buildDiscoveryPlan(args) {
  const passCount = Math.max(1, args.discoveryPasses);
  const plan = [];
  for (let i = 0; i < passCount; i += 1) {
    const thresholdDrop = i * 8;
    const passThreshold = Math.max(args.nearMissThreshold, args.scoreThreshold - thresholdDrop);
    plan.push({
      passIndex: i + 1,
      scoreThreshold: passThreshold,
      sourcesPerType: args.sourcesPerType + i,
      discoveryMultiplier: args.discoveryMultiplier + i * 3,
      runOffset: i
    });
  }
  return plan;
}

function selectSourceMixForRun(beverageTypes, runIndex, sourcesPerType) {
  const out = new Map();
  const summary = {};

  for (const beverageType of beverageTypes) {
    const available = (SOURCE_CATALOG[beverageType] || []).filter((url) => !isBannedSource(url));
    if (available.length === 0) {
      out.set(beverageType, []);
      summary[beverageType] = 0;
      continue;
    }

    const rotated = rotateList(available, runIndex);
    const takeCount = Math.min(available.length, Math.max(1, sourcesPerType));
    const selected = rotated.slice(0, takeCount);
    out.set(beverageType, selected);
    summary[beverageType] = selected.length;
  }

  return { sourceMap: out, sourceCountsByType: summary };
}

function normalizeTerm(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function hasNavNoise(value) {
  const lower = normalizeText(value);
  if (!lower) return false;
  const phraseHit = NAV_NOISE_PATTERNS.some((pattern) => lower.includes(pattern));
  const tokenHits = lower
    .split(/\s+/)
    .filter((token) => FORBIDDEN_NAV_TOKENS.has(token)).length;
  return phraseHit || tokenHits >= 3;
}

function selectDefinitionSentence(sentencesList, term) {
  const needle = normalizeText(term);
  const candidates = (sentencesList || []).filter((line) => {
    const normalized = normalizeText(line);
    if (!normalized || !needle) return false;
    if (!normalized.includes(needle)) return false;
    if (normalized.length < 40 || normalized.length > 260) return false;
    if (hasNavNoise(normalized)) return false;
    return DEFINITION_CUES.some((cue) => ` ${normalized} `.includes(cue));
  });

  if (candidates.length === 0) return "";
  return candidates.sort((a, b) => a.length - b.length)[0];
}

function countPhraseOccurrences(normalizedText, normalizedTerm) {
  if (!normalizedText || !normalizedTerm) return 0;
  const escaped = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "g");
  const matches = normalizedText.match(regex);
  return matches ? matches.length : 0;
}

function isCandidateFragmentSafe(term, rawText) {
  const normalized = normalizeTerm(term);
  if (!normalized) return false;
  const words = normalized.split(" ").filter(Boolean);
  if (words.length === 0 || words.length > 3) return false;
  if (FRAGMENT_START_TOKENS.has(words[0])) return false;
  if (words.some((w) => FORBIDDEN_NAV_TOKENS.has(w))) return false;

  const hasTermRoot = TECHNICAL_ROOTS.some((root) => normalized.includes(root)) || STUDY_SIGNAL_TERMS.some((hint) => normalized.includes(hint));
  if (!hasTermRoot) return false;

  const normalizedText = normalizeText(rawText);
  const occurrences = countPhraseOccurrences(normalizedText, normalized);
  return occurrences >= 2;
}

function scoreSourceAuthority(url) {
  const host = sourceDomain(url);
  if (!host) return 0;
  if (host.endsWith(".gov") || host.endsWith(".edu")) return 10;
  if (host.endsWith(".org")) return 8;
  if (host.endsWith(".int")) return 8;
  return 4;
}

function slug(value) {
  return normalizeTerm(value).replace(/\s+/g, "-").slice(0, 80);
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentences(text) {
  return (text.match(/[^.!?]+[.!?]?/g) || []).map((s) => s.trim()).filter(Boolean);
}

function extractCandidateTermsFromText(rawText, letter) {
  const needle = String(letter || "A").toUpperCase();
  const words = rawText.split(/\s+/);
  const candidates = new Set();

  for (let i = 0; i < words.length; i += 1) {
    const one = words[i]?.replace(/[^A-Za-z0-9-]/g, "") || "";
    const two = `${one} ${(words[i + 1] || "").replace(/[^A-Za-z0-9-]/g, "")}`.trim();
    const three =
      `${one} ${(words[i + 1] || "").replace(/[^A-Za-z0-9-]/g, "")} ${(words[i + 2] || "").replace(/[^A-Za-z0-9-]/g, "")}`.trim();

    for (const candidate of [one, two, three]) {
      const cleaned = candidate.replace(/\s+/g, " ").trim();
      if (!cleaned) continue;
      if (!/^[A-Za-z]/.test(cleaned)) continue;
      if (cleaned.length < 4 || cleaned.length > 45) continue;
      if (!cleaned.toUpperCase().startsWith(needle)) continue;
      if (/\d{3,}/.test(cleaned)) continue;
      candidates.add(cleaned);
    }
  }

  return [...candidates];
}

function evaluateCandidateQuality(candidate, sourceSentence, sourceUrl, scoreWeights) {
  const cleaned = String(candidate || "").trim();
  if (!cleaned) {
    return { accepted: false, score: 0, reasons: ["blank_term"] };
  }
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0 || parts.length > 3) {
    return { accepted: false, score: 0, reasons: ["word_count_out_of_bounds"] };
  }
  if (parts.every((p) => p.length <= 2)) {
    return { accepted: false, score: 0, reasons: ["token_too_short"] };
  }

  const normalized = normalizeTerm(cleaned);
  if (EXACT_GENERIC_TERMS.has(normalized)) {
    return { accepted: false, score: 0, reasons: ["generic_term"] };
  }
  const noiseHits = parts.filter((p) => UI_NOISE_TOKENS.has(normalizeTerm(p))).length;
  if (noiseHits > 0) {
    return { accepted: false, score: 0, reasons: ["ui_noise_term"] };
  }
  if (normalized.length < 4 || normalized.length > 40) {
    return { accepted: false, score: 0, reasons: ["term_length_out_of_bounds"] };
  }
  if (/\b(the|and|for|with|from|into|about|legal|home|main)\b/.test(normalized)) {
    return { accepted: false, score: 0, reasons: ["contains_stop_phrase"] };
  }

  const context = normalizeText(sourceSentence);
  const words = normalized.split(" ").filter(Boolean);
  if (words.some((word) => FORBIDDEN_TERM_TOKENS.has(word) || STOPWORD_TOKENS.has(word))) {
    return { accepted: false, score: 0, reasons: ["forbidden_or_stopword"] };
  }
  if (words.some((word) => FORBIDDEN_NAV_TOKENS.has(word))) {
    return { accepted: false, score: 0, reasons: ["forbidden_nav_token"] };
  }
  if (words.length > 3) return { accepted: false, score: 0, reasons: ["word_count_out_of_bounds"] };
  if (words.some((word) => word.length < 3)) return { accepted: false, score: 0, reasons: ["word_too_short"] };
  if (hasNavNoise(sourceSentence)) return { accepted: false, score: 0, reasons: ["nav_noise_context"] };

  let score = scoreWeights.lexicalBase;
  const reasons = ["lexical_pass"];

  const hasSignal = STUDY_SIGNAL_TERMS.some((hint) => normalized.includes(hint) || context.includes(hint));
  const hasDefinitionCue = DEFINITION_CUES.some((cue) => ` ${context} `.includes(cue));
  const hasTechnicalRoot = TECHNICAL_ROOTS.some((root) => normalized.includes(root));
  const hasTermRoot = TECHNICAL_ROOTS.some((root) => normalized.includes(root)) || STUDY_SIGNAL_TERMS.some((hint) => normalized.includes(hint));

  if (!hasDefinitionCue) return { accepted: false, score: 0, reasons: ["missing_definition_cue"] };
  if (!hasTermRoot) return { accepted: false, score: 0, reasons: ["missing_term_root"] };

  if (hasSignal) {
    score += scoreWeights.studySignal;
    reasons.push("study_signal");
  }
  if (hasDefinitionCue) {
    score += scoreWeights.definitionCue;
    reasons.push("definition_cue");
  }
  if (hasTechnicalRoot) {
    score += scoreWeights.technicalRoot;
    reasons.push("technical_root");
  }

  const sourceAuthority = scoreSourceAuthority(sourceUrl);
  score += Math.min(scoreWeights.sourceAuthority, sourceAuthority);
  reasons.push(`source_authority:${sourceAuthority}`);

  if (words.length >= 2 || normalized.length >= 10) {
    score += scoreWeights.specificity;
    reasons.push("term_specificity");
  }
  if (context.length >= 80) {
    score += scoreWeights.contextQuality;
    reasons.push("context_quality");
  }

  if (words.length === 1 && words[0].length < 6) {
    score -= 15;
    reasons.push("penalty_short_single_term");
  }
  if (context.split(" ").length < 6) {
    score -= 10;
    reasons.push("penalty_thin_context");
  }

  return { accepted: true, score, reasons };
}

function extractDefinitionCandidates(sentencesList, letter) {
  const out = new Set();
  const needle = String(letter || "A").toUpperCase();

  for (const sentence of sentencesList) {
    const s = ` ${sentence.replace(/\s+/g, " ").trim()} `;
    const lower = s.toLowerCase();
    const hasSignal = STUDY_SIGNAL_TERMS.some((hint) => lower.includes(hint));
    const cue = DEFINITION_CUES.find((c) => lower.includes(c.trim()));
    if (!hasSignal || !cue) continue;

    const cueIndex = lower.indexOf(cue.trim());
    if (cueIndex <= 0) continue;

    const prefix = s.slice(0, cueIndex).trim();
    const prefixWords = prefix.split(/\s+/).filter(Boolean);
    const slice = prefixWords.slice(Math.max(0, prefixWords.length - 3));
    const candidate = slice
      .join(" ")
      .replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!candidate) continue;
    if (!candidate.toUpperCase().startsWith(needle)) continue;
    out.add(candidate);
  }

  return [...out];
}

async function fetchText(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: "follow" });
    if (!res.ok) return null;
    const html = await res.text();
    return stripTags(html);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function stage(label, payload = {}) {
  console.log(`[start-terms] ${label} ${JSON.stringify(payload)}`);
}

function createMlaCitation({ term, title, url }) {
  const accessDate = new Date().toISOString().slice(0, 10);
  return `${title}. "${term}." Web. Accessed ${accessDate}. ${url}`;
}

function draftMeaning(term, sourceSentence, beverageType) {
  const contextual = sourceSentence && !hasNavNoise(sourceSentence) && sourceSentence.length <= 260
    ? sourceSentence.replace(/\s+/g, " ").trim()
    : `${term} is discussed in professional ${beverageType} production and service contexts.`;
  return `${term} refers to a beverage concept used in ${beverageType} study and practice. ${contextual}`;
}

function draftHowToApply(term, beverageType) {
  return `Use ${term} in ${beverageType} guild study to connect production context with sensory outcomes, service decisions, and exam-ready style comparison logic.`;
}

function draftExample(term, beverageType) {
  return `During ${beverageType} guild exam prep, the learner cites ${term} to justify the observed profile, service recommendation, and elimination logic.`;
}

async function fetchExistingMap(supabase) {
  const out = new Map();
  const pageSize = 1000;
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from("terminology_entries")
      .select("id,term,normalized_term,meaning,how_to_apply,examples,other_ideas,reference_links,mla_citations,source_authors,source_title,purchase_links,source_note,is_published,updated_at")
      .order("term", { ascending: true })
      .range(offset, offset + pageSize - 1);
    if (error) throw new Error(`failed loading existing terms: ${error.message}`);
    const rows = data || [];
    for (const row of rows) {
      out.set(normalizeTerm(row.normalized_term || row.term), row);
    }
    if (rows.length < pageSize) break;
    offset += rows.length;
  }

  return out;
}

async function fetchUnpublishedRows(supabase, limit = 2000) {
  const { data, error } = await supabase
    .from("terminology_entries")
    .select("id,term,meaning,reference_links,mla_citations,source_authors,is_published,updated_at")
    .eq("is_published", false)
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`failed loading unpublished terms: ${error.message}`);
  return data || [];
}

function isRecoverableUnpublishedRow(row) {
  const term = String(row.term || "");
  const meaning = String(row.meaning || "");
  const normalizedTerm = normalizeTerm(term);
  const normalizedMeaning = normalizeText(meaning);
  if (!normalizedTerm || !normalizedMeaning) return false;
  if (hasNavNoise(meaning)) return false;
  if (meaning.length < 40 || meaning.length > 420) return false;
  const words = normalizedTerm.split(" ").filter(Boolean);
  if (words.length === 0 || words.length > 4) return false;
  if (words.some((word) => FORBIDDEN_NAV_TOKENS.has(word))) return false;
  if (words.length > 0 && FRAGMENT_START_TOKENS.has(words[0])) return false;

  const hasRoot =
    TECHNICAL_ROOTS.some((root) => normalizedTerm.includes(root) || normalizedMeaning.includes(root)) ||
    STUDY_SIGNAL_TERMS.some((hint) => normalizedTerm.includes(hint) || normalizedMeaning.includes(hint));
  if (!hasRoot) return false;

  const hasCue = DEFINITION_CUES.some((cue) => ` ${normalizedMeaning} `.includes(cue));
  if (!hasCue) return false;

  const refs = Array.isArray(row.reference_links) ? row.reference_links : [];
  const mla = Array.isArray(row.mla_citations) ? row.mla_citations : [];
  const authors = Array.isArray(row.source_authors) ? row.source_authors : [];
  if (refs.length === 0 || mla.length === 0 || authors.length === 0) return false;
  if (refs.some((link) => isBannedSource(link))) return false;

  return true;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function mergeUnique(baseList, extraList) {
  const seen = new Set();
  const out = [];
  for (const item of [...(baseList || []), ...(extraList || [])]) {
    const raw = String(item || "").trim();
    if (!raw) continue;
    const key = normalizeText(raw);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(raw);
  }
  return out;
}

function mergeField(existingText, incomingText) {
  const existingNorm = normalizeText(existingText);
  const incomingNorm = normalizeText(incomingText);
  if (!incomingNorm) return { value: String(existingText || ""), changed: false };
  if (!existingNorm) return { value: String(incomingText || "").trim(), changed: true };
  if (existingNorm.includes(incomingNorm) || incomingNorm.includes(existingNorm)) {
    return { value: String(existingText || "").trim(), changed: false };
  }
  return {
    value: `${String(existingText || "").trim()} Additional context: ${String(incomingText || "").trim()}`,
    changed: true
  };
}

function buildExistingUpdate(existingRow, candidate) {
  const mergedReferences = mergeUnique(existingRow.reference_links || [], candidate.reference_links || []).filter(
    (link) => !isBannedSource(link)
  );
  const mergedCitations = mergeUnique(existingRow.mla_citations || [], candidate.mla_citations || []);
  const mergedAuthors = mergeUnique(existingRow.source_authors || [], candidate.source_authors || []);
  const mergedExamples = mergeUnique(existingRow.examples || [], candidate.examples || []);
  const mergedIdeas = mergeUnique(existingRow.other_ideas || [], candidate.other_ideas || []);
  const mergedPurchase = mergeUnique(existingRow.purchase_links || [], candidate.purchase_links || []).filter(
    (link) => !isBannedSource(link)
  );

  const meaning = mergeField(existingRow.meaning, candidate.meaning);
  const howToApply = mergeField(existingRow.how_to_apply, candidate.how_to_apply);

  const changed =
    meaning.changed ||
    howToApply.changed ||
    mergedExamples.length !== (existingRow.examples || []).length ||
    mergedIdeas.length !== (existingRow.other_ideas || []).length ||
    mergedReferences.length !== (existingRow.reference_links || []).length ||
    mergedCitations.length !== (existingRow.mla_citations || []).length ||
    mergedAuthors.length !== (existingRow.source_authors || []).length ||
    mergedPurchase.length !== (existingRow.purchase_links || []).length;

  if (!changed) return null;

  return {
    id: existingRow.id,
    term: existingRow.term,
    meaning: meaning.value,
    how_to_apply: howToApply.value,
    examples: mergedExamples,
    other_ideas: mergedIdeas,
    source_authors: mergedAuthors.length > 0 ? mergedAuthors : ["Sip Studies Editorial Team"],
    source_title: String(existingRow.source_title || candidate.source_title || "").trim(),
    reference_links: mergedReferences,
    purchase_links: mergedPurchase.length > 0 ? mergedPurchase : mergedReferences,
    mla_citations: mergedCitations,
    source_note: `${String(existingRow.source_note || "").trim()} | start-terms-enriched:${nowIso()}`.trim(),
    is_verbatim_from_source: false,
    source_rights_basis: "Original editorial rewrite",
    is_published: Boolean(existingRow.is_published)
  };
}

function reviewExistingEntries(existingMap) {
  const findings = [];
  for (const row of existingMap.values()) {
    const links = Array.isArray(row.reference_links) ? row.reference_links : [];
    const blocked = links.filter((link) => isBannedSource(link));
    if (blocked.length > 0) {
      findings.push({
        term: row.term,
        issue: "banned_source_domain",
        blocked_domains: blocked.map(sourceDomain)
      });
    }
    if (!Array.isArray(row.mla_citations) || row.mla_citations.length === 0) {
      findings.push({ term: row.term, issue: "missing_mla_citations" });
    }
    if (!Array.isArray(row.source_authors) || row.source_authors.length === 0) {
      findings.push({ term: row.term, issue: "missing_source_authors" });
    }
  }
  return findings;
}

function keepBestCandidates(candidates, target) {
  const out = [];
  const seen = new Set();
  const sorted = [...candidates].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));

  for (const candidate of sorted) {
    const normalized = normalizeTerm(candidate.term);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(candidate);
    if (out.length >= target) break;
  }

  return out;
}

function buildRunReport({
  args,
  runIndex,
  activeLetters,
  activeBeverageTypes,
  sourceCountsByType,
  discoveryPlan,
  existingCount,
  findings,
  generated,
  inserts,
  updates,
  recoveredRows,
  redundantSkips,
  nearMisses
}) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = path.join(RUN_DIR, `start-terms-run-${stamp}.md`);
  const lines = [];
  lines.push(`# Start Terms Run ${stamp}`);
  lines.push("");
  lines.push("## Config");
  lines.push(`- letters: ${args.letters}`);
  lines.push(`- active_letters: ${activeLetters.join("")}`);
  lines.push(`- beverage_types: ${args.beverageTypes.join(", ")}`);
  lines.push(`- active_beverage_types: ${activeBeverageTypes.join(", ")}`);
  lines.push(`- run_index: ${runIndex}`);
  lines.push(`- rotate_mode: ${args.rotateMode}`);
  lines.push(`- letter_window: ${args.letterWindow}`);
  lines.push(`- sources_per_type: ${args.sourcesPerType}`);
  lines.push(`- active_source_mix: ${JSON.stringify(sourceCountsByType)}`);
  lines.push(`- discovery_passes: ${args.discoveryPasses}`);
  lines.push(`- min_progress_per_run: ${args.minProgressPerRun}`);
  lines.push(`- recover_unpublished_per_run: ${args.recoverUnpublishedPerRun}`);
  lines.push(`- discovery_plan: ${JSON.stringify(discoveryPlan)}`);
  lines.push(`- batch_per_letter: ${args.batchPerLetter}`);
  lines.push(`- target: ${args.target}`);
  lines.push(`- discovery_multiplier: ${args.discoveryMultiplier}`);
  lines.push(`- score_threshold: ${args.scoreThreshold}`);
  lines.push(`- near_miss_threshold: ${args.nearMissThreshold}`);
  lines.push(`- auto_publish_approved: ${args.autoPublishApproved}`);
  lines.push(`- banned_sources: ${BANNED_SOURCE_PATTERNS.join(", ")}`);
  lines.push("");
  lines.push("## Existing Library Review");
  lines.push(`- existing_terms_seen: ${existingCount}`);
  lines.push(`- policy_findings: ${findings.length}`);
  if (findings.length > 0) {
    for (const finding of findings.slice(0, 100)) {
      lines.push(`- ${finding.term}: ${finding.issue}`);
    }
  }
  lines.push("");
  lines.push("## Generation");
  lines.push(`- candidates_discovered: ${generated.length}`);
  lines.push(`- near_miss_candidates_queued: ${nearMisses.length}`);
  lines.push(`- candidate_terms_retained_after_dedupe: ${inserts.length + updates.length + redundantSkips}`);
  lines.push(`- inserts: ${inserts.length}`);
  lines.push(`- existing_terms_enriched: ${updates.length}`);
  lines.push(`- recovered_unpublished_published: ${recoveredRows.length}`);
  lines.push(`- existing_terms_no_new_info: ${redundantSkips}`);
  lines.push("");
  lines.push("## Insert Terms");
  for (const item of inserts) {
    lines.push(`- ${item.term} (${item.beverage_type}; score=${item.score}) -> ${item.reference_links[0]}`);
  }
  lines.push("");
  lines.push("## Updated Terms");
  for (const item of updates) {
    lines.push(`- ${item.term}`);
  }
  lines.push("");
  lines.push("## Recovered Unpublished");
  for (const row of recoveredRows) {
    lines.push(`- ${row.term}`);
  }
  lines.push("");
  lines.push("## Near Miss Queue");
  for (const miss of nearMisses.slice(0, 200)) {
    lines.push(
      `- ${miss.term || "(blank)"} (score=${miss.score}; beverage=${miss.beverage_type}; source=${miss.source}) reasons=${(
        miss.reasons || []
      ).join(",")}`
    );
  }
  lines.push("");
  fs.mkdirSync(RUN_DIR, { recursive: true });
  fs.writeFileSync(outPath, `${lines.join("\n")}\n`, "utf8");
  return outPath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rotationState = readRotationState();
  const runIndex = rotationState.run_index;
  const activeLetters = chooseRotatedLetters(args, runIndex);
  const activeBeverageTypes = chooseRotatedBeverageTypes(args, runIndex);
  const discoveryPlan = buildDiscoveryPlan(args);
  const { sourceMap: sourceMixByType, sourceCountsByType } = selectSourceMixForRun(
    activeBeverageTypes,
    runIndex,
    args.sourcesPerType
  );

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const isDryRun = args.dryRun;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || (isDryRun ? process.env.VITE_SUPABASE_ANON_KEY : "");
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      isDryRun
        ? "SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY) are required."
        : "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required."
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  stage("agent-1-planner", {
    letters: args.letters,
    active_letters: activeLetters.join(""),
    beverage_types: args.beverageTypes,
    active_beverage_types: activeBeverageTypes,
    source_mix: sourceCountsByType,
    discovery_plan: discoveryPlan,
    score_threshold: args.scoreThreshold,
    discovery_multiplier: args.discoveryMultiplier,
    auto_publish_approved: args.autoPublishApproved
  });

  const existingMap = await fetchExistingMap(supabase);
  const existingCount = existingMap.size;
  const findings = reviewExistingEntries(existingMap);

  stage("agent-2-source-scanner", {
    existing_terms: existingCount,
    policy_findings: findings.length
  });

  const discovered = [];
  const nearMisses = [];
  const discoverySeen = new Set();
  const letters = activeLetters;

  for (const pass of discoveryPlan) {
    const passSourceSelection = selectSourceMixForRun(activeBeverageTypes, runIndex + pass.runOffset, pass.sourcesPerType);
    for (const beverageType of activeBeverageTypes) {
      const sourceUrls = passSourceSelection.sourceMap.get(beverageType) || [];
      for (const sourceUrl of sourceUrls) {
        if (isBannedSource(sourceUrl)) continue;
        const text = await fetchText(sourceUrl, args.timeoutMs);
        if (!text) continue;
        const textSentences = sentences(text);
        for (const letter of letters) {
          const extracted = extractCandidateTermsFromText(text, letter).filter((term) => isCandidateFragmentSafe(term, text));
          const definitionBased = extractDefinitionCandidates(textSentences, letter);
          const mergedTerms = [...new Set([...definitionBased, ...extracted])];
          const terms = mergedTerms.slice(0, Math.max(args.batchPerLetter * pass.discoveryMultiplier, 24));
          for (const term of terms) {
            const sourceSentence = selectDefinitionSentence(textSentences, term);
            if (!sourceSentence) continue;
            const quality = evaluateCandidateQuality(term, sourceSentence, sourceUrl, args.scoreWeights);
            if (!quality.accepted) continue;

            const normalized = normalizeTerm(term);
            const discoverKey = `${normalized}|${beverageType}|${sourceUrl}`;
            if (!normalized || discoverySeen.has(discoverKey)) continue;
            discoverySeen.add(discoverKey);

            if (quality.score < pass.scoreThreshold) {
              if (quality.score >= args.nearMissThreshold) {
                nearMisses.push({
                  term,
                  score: quality.score,
                  reasons: [...quality.reasons, `pass:${pass.passIndex}`],
                  beverage_type: beverageType,
                  source: sourceUrl
                });
              }
              continue;
            }

            const sourceTitle = sourceDomain(sourceUrl) || "Professional Beverage Source";
            discovered.push({
              term,
              score: quality.score,
              score_reasons: [...quality.reasons, `pass:${pass.passIndex}`],
              beverage_type: beverageType,
              meaning: draftMeaning(term, sourceSentence, beverageType),
              how_to_apply: draftHowToApply(term, beverageType),
              examples: [draftExample(term, beverageType)],
              other_ideas: [],
              source_authors: ["Sip Studies Editorial Team"],
              source_title: sourceTitle,
              reference_links: [sourceUrl],
              purchase_links: [sourceUrl],
              mla_citations: [createMlaCitation({ term, title: sourceTitle, url: sourceUrl })],
              source_note: `start-terms agent pipeline (${nowIso()})`,
              editorial_policy: DEFAULT_EDITORIAL_POLICY,
              infographic_url: null
            });
          }
        }
      }
    }
  }

  stage("agent-3-term-extractor", { discovered: discovered.length });

  const retainedCandidates = keepBestCandidates(discovered, args.target).filter(
    (entry) => !entry.reference_links.some((link) => isBannedSource(link))
  );
  stage("agent-4-dedupe-filter", { retained_after_policy: retainedCandidates.length });

  const inserts = [];
  const updates = [];
  const recoveredRows = [];
  let redundantSkips = 0;

  for (const entry of retainedCandidates) {
    const normalized = normalizeTerm(entry.term);
    const existing = existingMap.get(normalized);
    if (!existing) {
      inserts.push(entry);
      continue;
    }

    const enriched = buildExistingUpdate(existing, entry);
    if (enriched) {
      updates.push(enriched);
    } else {
      redundantSkips += 1;
    }
  }

  if (inserts.length + updates.length < args.minProgressPerRun && nearMisses.length > 0) {
    const sortedNearMisses = [...nearMisses].sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
    for (const miss of sortedNearMisses) {
      if (inserts.length + updates.length >= args.minProgressPerRun) break;
      const normalized = normalizeTerm(miss.term);
      if (!normalized) continue;
      if (existingMap.has(normalized)) continue;
      const sourceTitle = sourceDomain(miss.source) || "Professional Beverage Source";
      inserts.push({
        term: miss.term,
        score: miss.score,
        beverage_type: miss.beverage_type,
        meaning: draftMeaning(miss.term, "", miss.beverage_type),
        how_to_apply: draftHowToApply(miss.term, miss.beverage_type),
        examples: [draftExample(miss.term, miss.beverage_type)],
        other_ideas: [],
        source_authors: ["Sip Studies Editorial Team"],
        source_title: sourceTitle,
        reference_links: [miss.source],
        purchase_links: [miss.source],
        mla_citations: [createMlaCitation({ term: miss.term, title: sourceTitle, url: miss.source })],
        source_note: `start-terms promoted-near-miss (${nowIso()})`,
        editorial_policy: DEFAULT_EDITORIAL_POLICY,
        infographic_url: null
      });
      existingMap.set(normalized, { term: miss.term });
    }
  }

  const insertPayload = inserts.map((entry) => ({
    term: entry.term,
    meaning: entry.meaning,
    how_to_apply: entry.how_to_apply,
    examples: entry.examples,
    other_ideas: entry.other_ideas,
    source_authors: entry.source_authors,
    source_title: entry.source_title,
    reference_links: entry.reference_links,
    purchase_links: entry.purchase_links,
    mla_citations: entry.mla_citations,
    source_note: `${entry.source_note}; editorial_policy=${entry.editorial_policy}`,
    is_verbatim_from_source: false,
    source_rights_basis: "Original editorial rewrite",
    infographic_url: entry.infographic_url,
    infographic_caption: null,
    is_published: args.autoPublishApproved
  }));

  stage("agent-5-writer", { drafted_inserts: insertPayload.length, drafted_updates: updates.length });
  stage("agent-6-citation-compliance", {
    blocked_source_count:
      insertPayload.filter((row) => row.reference_links.some((link) => isBannedSource(link))).length +
      updates.filter((row) => row.reference_links.some((link) => isBannedSource(link))).length
  });

  if (args.recoverUnpublishedPerRun > 0) {
    const unpublishedRows = await fetchUnpublishedRows(supabase, Math.max(500, args.recoverUnpublishedPerRun * 20));
    const recoverable = unpublishedRows.filter(isRecoverableUnpublishedRow).slice(0, args.recoverUnpublishedPerRun);
    for (const row of recoverable) {
      recoveredRows.push({ id: row.id, term: row.term });
    }
  }

  if (!args.dryRun) {
    if (insertPayload.length > 0) {
      const { error } = await supabase.from("terminology_entries").upsert(insertPayload, { onConflict: "term" });
      if (error) throw new Error(`failed insert upsert: ${error.message}`);
    }
    for (const updateRow of updates) {
      const { id, ...patch } = updateRow;
      const { error } = await supabase.from("terminology_entries").update(patch).eq("id", id);
      if (error) throw new Error(`failed existing-term update (${updateRow.term}): ${error.message}`);
    }
    for (let i = 0; i < recoveredRows.length; i += 100) {
      const chunk = recoveredRows.slice(i, i + 100).map((row) => row.id);
      const { error } = await supabase.from("terminology_entries").update({ is_published: true }).in("id", chunk);
      if (error) throw new Error(`failed unpublished recovery publish: ${error.message}`);
    }
  }

  stage("agent-7-quality-gate", {
    dry_run: args.dryRun,
    insert_count: insertPayload.length,
    update_count: updates.length,
    recovered_unpublished_count: recoveredRows.length,
    redundant_skip_count: redundantSkips,
    near_miss_queue_count: nearMisses.length
  });

  const reportPath = buildRunReport({
    args,
    runIndex,
    activeLetters,
    activeBeverageTypes,
    sourceCountsByType,
    discoveryPlan,
    existingCount,
    findings,
    generated: discovered,
    inserts,
    updates,
    recoveredRows,
    redundantSkips,
    nearMisses
  });

  writeRotationState({
    run_index: runIndex + 1,
    updated_at: nowIso(),
    last_letters: activeLetters.join(""),
    last_beverage_types: activeBeverageTypes,
    last_source_mix: sourceCountsByType
  });

  console.log(
    JSON.stringify(
      {
        mode: args.dryRun ? "dry-run" : "live",
        run_index: runIndex,
        active_letters: activeLetters.join(""),
        active_beverage_types: activeBeverageTypes,
        existing_terms: existingCount,
        policy_findings: findings.length,
        discovered: discovered.length,
        near_miss_candidates: nearMisses.length,
        inserts: inserts.length,
        updated_existing_terms: updates.length,
        recovered_unpublished_published: recoveredRows.length,
        redundant_existing_terms_skipped: redundantSkips,
        report: path.relative(REPO_ROOT, reportPath).replace(/\\/g, "/")
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(`start-terms failed: ${error.message}`);
  process.exit(1);
});
