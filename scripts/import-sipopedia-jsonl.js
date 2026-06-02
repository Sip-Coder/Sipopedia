import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_FILE = "terminology/sipopedia-new-terms.jsonl";
const LOCAL_INFOGRAPHIC_ROOT = "/infographics/regeneration/";

function parseArgs(argv) {
  const getValue = (flag, fallback = null) => {
    const index = argv.lastIndexOf(flag);
    if (index >= 0 && argv[index + 1]) return argv[index + 1];
    return fallback;
  };

  return {
    file: getValue("--file", DEFAULT_FILE),
    limit: Number(getValue("--limit", "0")),
    dryRun: argv.includes("--dry-run"),
    publish: argv.includes("--publish"),
    onlyApproved: argv.includes("--only-approved"),
    sqlOut: getValue("--sql-out", ""),
    sqlDir: getValue("--sql-dir", "")
  };
}

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) continue;
    const key = trimmed.slice(0, equalIndex).trim();
    if (process.env[key]) continue;
    const value = trimmed.slice(equalIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    process.env[key] = value;
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required. Add it to .env or export it before running the import.`);
  }
  return value;
}

function normalizeTerm(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function asTextArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") {
          const record = item;
          return record.url || record.href || record.link || record.title || "";
        }
        return "";
      })
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  const text = String(value || "").trim();
  return text ? [text] : [];
}

function asUrlArray(value) {
  return asTextArray(value).filter((item) => {
    try {
      const parsed = new URL(item);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  });
}

function extractMlaTitle(citation) {
  const text = String(citation || "").trim();
  const quoted = text.match(/"([^"]+)"/);
  if (quoted?.[1]) return quoted[1].trim();

  const firstPeriod = text.indexOf(".");
  if (firstPeriod === -1) return "";
  const afterAuthor = text.slice(firstPeriod + 1).trim();
  const secondPeriod = afterAuthor.indexOf(".");
  return (secondPeriod === -1 ? afterAuthor : afterAuthor.slice(0, secondPeriod)).trim();
}

function sourceTitleFrom(row, mlaCitations, referenceLinks) {
  const direct = String(row.source_title || "").trim();
  if (direct) return direct;

  const fromCitation = extractMlaTitle(mlaCitations[0]);
  if (fromCitation) return fromCitation;

  try {
    return new URL(referenceLinks[0]).hostname.replace(/^www\./, "");
  } catch {
    return "Sipopedia Editorial Source";
  }
}

function existingLocalInfographic(term) {
  const slug = slugify(term);
  if (!slug) return null;
  const filePath = path.join(process.cwd(), "public", "infographics", "regeneration", `${slug}.png`);
  return fs.existsSync(filePath) ? `${LOCAL_INFOGRAPHIC_ROOT}${slug}.png` : null;
}

function normalizeInfographicUrl(term, value) {
  const local = existingLocalInfographic(term);
  if (local) return local;

  const text = String(value || "").trim();
  if (!text) return null;
  if (text.startsWith("/infographics/")) return text;
  if (/^https?:\/\/.+\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(text)) return text;
  return null;
}

function buildSourceNote(row, sourceFile, rawInfographicUrl) {
  const parts = [
    String(row.source_note || "").trim(),
    `canonical_source=${sourceFile}`,
    `candidate_number=${row.candidate_number ?? ""}`,
    `review_status=${row.review_status ?? ""}`,
    `batch_id=${row.batch_id ?? ""}`,
    `source_format=${row.source_format ?? ""}`,
    `jsonl_updated_at=${row.updated_at ?? ""}`
  ].filter(Boolean);

  if (rawInfographicUrl && !normalizeInfographicUrl(row.term, rawInfographicUrl)) {
    parts.push(`original_infographic_reference=${rawInfographicUrl}`);
  }

  return parts.join("; ");
}

function normalizeRow(row, sourceFile) {
  const referenceLinks = asUrlArray(row.reference_links);
  const mlaCitations = asTextArray(row.mla_citations);
  const sourceAuthors = asTextArray(row.source_authors);
  const examples = asTextArray(row.examples);
  const purchaseLinks = asUrlArray(row.purchase_links).length > 0 ? asUrlArray(row.purchase_links) : referenceLinks;
  const infographicUrl = normalizeInfographicUrl(row.term, row.infographic_url);

  return {
    term: String(row.term || "").trim(),
    meaning: String(row.meaning || "").trim(),
    how_to_apply: String(row.how_to_apply || "").trim(),
    examples,
    other_ideas: asTextArray(row.other_ideas),
    source_authors: sourceAuthors,
    source_title: sourceTitleFrom(row, mlaCitations, referenceLinks),
    reference_links: referenceLinks,
    purchase_links: purchaseLinks,
    mla_citations: mlaCitations,
    source_note: buildSourceNote(row, sourceFile, String(row.infographic_url || "").trim()),
    is_verbatim_from_source: false,
    source_rights_basis: "Original editorial rewrite",
    infographic_url: infographicUrl,
    infographic_caption: infographicUrl ? `Educational infographic for ${String(row.term || "").trim()}.` : null,
    is_published: Boolean(row.is_published) || row.review_status === "approved"
  };
}

function validatePayload(row) {
  const errors = [];
  if (!row.term) errors.push("term");
  if (!row.meaning) errors.push("meaning");
  if (!row.how_to_apply) errors.push("how_to_apply");
  if (row.examples.length === 0) errors.push("examples");
  if (row.source_authors.length === 0) errors.push("source_authors");
  if (!row.source_title) errors.push("source_title");
  if (row.reference_links.length === 0) errors.push("reference_links");
  if (row.purchase_links.length === 0) errors.push("purchase_links");
  if (row.mla_citations.length === 0) errors.push("mla_citations");
  return errors;
}

function readCanonicalRows(file, { onlyApproved, limit }) {
  const sourceFile = file.replace(/\\/g, "/");
  const absolute = path.resolve(file);
  const rowsByTerm = new Map();
  const failures = [];
  let parsed = 0;
  let skippedByStatus = 0;
  let duplicateCount = 0;

  for (const line of fs.readFileSync(absolute, "utf8").split(/\r?\n/)) {
    if (!line.trim()) continue;
    parsed += 1;
    if (limit > 0 && parsed > limit) break;

    let raw;
    try {
      raw = JSON.parse(line);
    } catch (error) {
      failures.push({ line: parsed, errors: ["invalid_json"] });
      continue;
    }

    if (onlyApproved && raw.review_status !== "approved" && raw.is_published !== true) {
      skippedByStatus += 1;
      continue;
    }

    const normalized = normalizeRow(raw, sourceFile);
    const errors = validatePayload(normalized);
    if (errors.length > 0) {
      failures.push({ line: parsed, term: raw.term, errors });
      continue;
    }

    const key = normalizeTerm(normalized.term);
    if (rowsByTerm.has(key)) duplicateCount += 1;
    rowsByTerm.set(key, normalized);
  }

  return {
    parsed,
    skippedByStatus,
    duplicateCount,
    failures,
    rows: [...rowsByTerm.values()]
  };
}

async function upsertRows(rows) {
  loadDotEnv();
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const chunkSize = 250;
  let written = 0;

  for (let index = 0; index < rows.length; index += chunkSize) {
    const chunk = rows.slice(index, index + chunkSize);
    const { error } = await supabase.from("terminology_entries").upsert(chunk, { onConflict: "term" });
    if (error) {
      throw new Error(`Supabase upsert failed near row ${index + 1}: ${error.message}`);
    }
    written += chunk.length;
  }

  return written;
}

function sqlLiteral(value) {
  return String(value).replace(/\$/g, "$$$$");
}

function buildSqlChunk(rows, chunkIndex) {
  const tag = `sipopedia_jsonl_${chunkIndex}`;
  const json = JSON.stringify(rows);
  return `
insert into public.terminology_entries (
  term,
  meaning,
  how_to_apply,
  examples,
  other_ideas,
  source_authors,
  source_title,
  reference_links,
  purchase_links,
  mla_citations,
  source_note,
  is_verbatim_from_source,
  source_rights_basis,
  infographic_url,
  infographic_caption,
  is_published,
  updated_at
)
select
  payload.term,
  payload.meaning,
  payload.how_to_apply,
  coalesce(array(select jsonb_array_elements_text(coalesce(payload.examples, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(payload.other_ideas, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(payload.source_authors, '[]'::jsonb))), '{}'),
  payload.source_title,
  coalesce(array(select jsonb_array_elements_text(coalesce(payload.reference_links, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(payload.purchase_links, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(payload.mla_citations, '[]'::jsonb))), '{}'),
  payload.source_note,
  false,
  'Original editorial rewrite',
  nullif(payload.infographic_url, ''),
  nullif(payload.infographic_caption, ''),
  payload.is_published,
  now()
from jsonb_to_recordset($${tag}$${sqlLiteral(json)}$${tag}$::jsonb) as payload(
  term text,
  meaning text,
  how_to_apply text,
  examples jsonb,
  other_ideas jsonb,
  source_authors jsonb,
  source_title text,
  reference_links jsonb,
  purchase_links jsonb,
  mla_citations jsonb,
  source_note text,
  infographic_url text,
  infographic_caption text,
  is_published boolean
)
on conflict (term) do update set
  meaning = excluded.meaning,
  how_to_apply = excluded.how_to_apply,
  examples = excluded.examples,
  other_ideas = excluded.other_ideas,
  source_authors = excluded.source_authors,
  source_title = excluded.source_title,
  reference_links = excluded.reference_links,
  purchase_links = excluded.purchase_links,
  mla_citations = excluded.mla_citations,
  source_note = excluded.source_note,
  is_verbatim_from_source = false,
  source_rights_basis = 'Original editorial rewrite',
  infographic_url = coalesce(excluded.infographic_url, public.terminology_entries.infographic_url),
  infographic_caption = coalesce(excluded.infographic_caption, public.terminology_entries.infographic_caption),
  is_published = excluded.is_published,
  updated_at = now();
`.trim();
}

function writeSqlFile(rows, outputPath) {
  const chunkSize = 500;
  const chunks = [];
  for (let index = 0; index < rows.length; index += chunkSize) {
    chunks.push(buildSqlChunk(rows.slice(index, index + chunkSize), chunks.length + 1));
  }
  const sql = [
    "begin;",
    "set local statement_timeout = '10min';",
    ...chunks,
    "commit;"
  ].join("\n\n");
  fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
  fs.writeFileSync(outputPath, sql);
}

function writeSqlDir(rows, outputDir) {
  const chunkSize = 500;
  const absoluteDir = path.resolve(outputDir);
  fs.mkdirSync(absoluteDir, { recursive: true });
  const files = [];
  for (let index = 0; index < rows.length; index += chunkSize) {
    const chunkNumber = files.length + 1;
    const filename = `sipopedia-jsonl-import-${String(chunkNumber).padStart(3, "0")}.sql`;
    const filepath = path.join(absoluteDir, filename);
    const sql = ["begin;", buildSqlChunk(rows.slice(index, index + chunkSize), chunkNumber), "commit;"].join("\n\n");
    fs.writeFileSync(filepath, sql);
    files.push(filepath);
  }
  return files;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = readCanonicalRows(args.file, args);
  const summary = {
    file: args.file,
    mode: args.dryRun ? "dry-run" : "write",
    parsed_lines: result.parsed,
    valid_unique_terms: result.rows.length,
    duplicate_terms_collapsed: result.duplicateCount,
    skipped_by_status: result.skippedByStatus,
    invalid_rows: result.failures.length,
    local_infographics: result.rows.filter((row) => String(row.infographic_url || "").startsWith(LOCAL_INFOGRAPHIC_ROOT)).length,
    publish_mode: args.publish ? "all-valid-rows" : args.onlyApproved ? "approved-only" : "status-preserving"
  };

  if (result.failures.length > 0) {
    console.error(JSON.stringify({ ...summary, sample_failures: result.failures.slice(0, 20) }, null, 2));
    process.exit(1);
  }

  const rows = args.publish ? result.rows.map((row) => ({ ...row, is_published: true })) : result.rows;
  if (args.sqlDir) {
    const files = writeSqlDir(rows, args.sqlDir);
    summary.sql_dir = args.sqlDir;
    summary.sql_files = files.length;
  } else if (args.sqlOut) {
    writeSqlFile(rows, args.sqlOut);
    summary.sql_file = args.sqlOut;
    summary.sql_chunks = Math.ceil(rows.length / 500);
  } else if (!args.dryRun) {
    summary.written = await upsertRows(rows);
  }

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(`import-sipopedia-jsonl failed: ${error.message}`);
  process.exit(1);
});
