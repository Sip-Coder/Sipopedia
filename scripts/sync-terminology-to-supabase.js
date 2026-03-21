import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const REPO_ROOT = process.cwd();
const INDEX_PATH = path.join(REPO_ROOT, "terminology", "index.json");
const SCHEMA_PATH = path.join(REPO_ROOT, "schemas", "terminology.schema.json");
const SUPABASE_SCHEMA_SQL_PATH = path.join(REPO_ROOT, "supabase", "schema.sql");
const SUPABASE_MIGRATIONS_DIR = path.join(REPO_ROOT, "supabase", "migrations");

function parseArgs(argv) {
  const args = new Set(argv);
  const getValue = (flag, fallback = null) => {
    const index = argv.indexOf(flag);
    if (index >= 0 && argv[index + 1]) return argv[index + 1];
    return fallback;
  };
  return {
    dryRun: args.has("--dry-run"),
    table: getValue("--table", process.env.SUPABASE_TERMINOLOGY_TABLE || "terminology_library_entries"),
    skipIndexRebuild: args.has("--skip-index-rebuild")
  };
}

function normalizeTerm(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  if (!raw) return "";
  return raw
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validatePrimitiveType(value, typeName) {
  if (typeName === "string") return typeof value === "string";
  if (typeName === "number") return typeof value === "number" && Number.isFinite(value);
  if (typeName === "integer") return Number.isInteger(value);
  if (typeName === "boolean") return typeof value === "boolean";
  if (typeName === "array") return Array.isArray(value);
  if (typeName === "object") return isObject(value);
  return true;
}

function validateBySchema(schema, value, fieldPath, errors) {
  if (!schema || typeof schema !== "object") return;

  if (Array.isArray(schema.type)) {
    const matchesAtLeastOne = schema.type.some((t) => validatePrimitiveType(value, t));
    if (!matchesAtLeastOne) {
      errors.push(`${fieldPath} has invalid type; expected one of [${schema.type.join(", ")}]`);
      return;
    }
  } else if (schema.type && !validatePrimitiveType(value, schema.type)) {
    errors.push(`${fieldPath} has invalid type; expected ${schema.type}`);
    return;
  }

  if (typeof value === "string") {
    if (typeof schema.minLength === "number" && value.length < schema.minLength) {
      errors.push(`${fieldPath} must have minLength ${schema.minLength}`);
    }
    if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
      errors.push(`${fieldPath} must be one of: ${schema.enum.join(", ")}`);
    }
    return;
  }

  if (typeof value === "number") {
    if (typeof schema.minimum === "number" && value < schema.minimum) {
      errors.push(`${fieldPath} must be >= ${schema.minimum}`);
    }
    if (typeof schema.maximum === "number" && value > schema.maximum) {
      errors.push(`${fieldPath} must be <= ${schema.maximum}`);
    }
    return;
  }

  if (Array.isArray(value)) {
    if (typeof schema.minItems === "number" && value.length < schema.minItems) {
      errors.push(`${fieldPath} must have at least ${schema.minItems} item(s)`);
    }
    if (schema.items) {
      for (let i = 0; i < value.length; i++) {
        validateBySchema(schema.items, value[i], `${fieldPath}[${i}]`, errors);
      }
    }
    return;
  }

  if (isObject(value)) {
    const required = Array.isArray(schema.required) ? schema.required : [];
    for (const req of required) {
      if (!(req in value)) {
        errors.push(`${fieldPath}.${req} is required`);
      }
    }
    const props = isObject(schema.properties) ? schema.properties : {};
    for (const [prop, propSchema] of Object.entries(props)) {
      if (!(prop in value)) continue;
      validateBySchema(propSchema, value[prop], `${fieldPath}.${prop}`, errors);
    }
  }
}

function validateLocalEntryWithSchema(entry, schema) {
  const errors = [];
  validateBySchema(schema, entry, "entry", errors);
  return errors;
}

function loadSourceEntry(sourceFile, normalizedTerm) {
  const abs = path.join(REPO_ROOT, sourceFile);
  const parsed = readJson(abs);
  const list = Array.isArray(parsed) ? parsed : [parsed];
  for (const item of list) {
    const norm = normalizeTerm(item.normalized_term || item.term);
    if (norm === normalizedTerm) return item;
  }
  if (list.length > 0) return list[0];
  throw new Error(`No entry object found in ${sourceFile}`);
}

function parseExistingQualityFromSourceNote(sourceNote) {
  if (!sourceNote || typeof sourceNote !== "string") return null;
  const m = sourceNote.match(/quality_score\s*[:=]\s*(\d+(\.\d+)?)/i);
  if (!m) return null;
  return Number(m[1]);
}

function mapSubcategoryToDbCategory(subcategory) {
  const s = String(subcategory || "").toLowerCase();
  if (s.includes("region") || s.includes("origin") || s.includes("country")) return "location";
  if (s.includes("terroir") || s.includes("soil") || s.includes("climate")) return "terroir";
  if (s.includes("grape") || s.includes("variet") || s.includes("ingredient")) return "variety of source ingredient";
  return "production style";
}

function citationUrls(citations) {
  return citations
    .map((c) => String(c?.url || "").trim())
    .filter(Boolean);
}

function citationStrings(citations) {
  return citations
    .map((c) => {
      const title = String(c?.title || "").trim();
      const url = String(c?.url || "").trim();
      if (!title && !url) return "";
      return title && url ? `${title}. ${url}` : title || url;
    })
    .filter(Boolean);
}

function buildCanonicalPayload(entry, sourceFile) {
  const aliases = Array.isArray(entry.alias_terms || entry.aliases)
    ? (entry.alias_terms || entry.aliases).map((x) => String(x).trim()).filter(Boolean)
    : [];
  const commonConfusions = Array.isArray(entry.common_confusions)
    ? entry.common_confusions.map((x) => String(x).trim()).filter(Boolean)
    : [];
  const citations = Array.isArray(entry.citations) ? entry.citations : [];
  const quality = Number(entry.quality_score ?? 0);
  const normalized = normalizeTerm(entry.normalized_term || entry.term);
  const sourceUrls = citationUrls(citations);
  const citationText = citationStrings(citations);
  const sourceTitle = String(citations[0]?.title || "Sip Studies terminology source").trim();
  const examples = Array.isArray(entry.examples)
    ? entry.examples.map((x) => String(x).trim()).filter(Boolean)
    : [];
  const otherIdeas = Array.isArray(entry.other_ideas)
    ? entry.other_ideas.map((x) => String(x).trim()).filter(Boolean)
    : [];
  const infographicCaption = String(entry.infographic_caption || "").trim();
  const infographicUrl = String(entry.infographic_url || "").trim();
  const optionalContextFields = {};
  if (examples.length > 0) optionalContextFields.examples = examples;
  if (otherIdeas.length > 0) optionalContextFields.other_ideas = otherIdeas;
  if (infographicCaption) optionalContextFields.infographic_caption = infographicCaption;
  if (infographicUrl) optionalContextFields.infographic_url = infographicUrl;

  return {
    term: String(entry.term).trim(),
    normalized_term: normalized,
    category: String(entry.category || "").trim(),
    subcategory: String(entry.subcategory || "").trim(),
    concise_definition: String(entry.concise_definition || "").trim(),
    expanded_explanation: String(entry.expanded_explanation || "").trim(),
    why_it_matters: String(entry.why_it_matters || "").trim(),
    related_terms: Array.isArray(entry.related_terms) ? entry.related_terms : [],
    aliases,
    common_confusions: commonConfusions,
    citations,
    quality_score: quality,
    status: String(entry.status || "draft").trim(),
    source_file: sourceFile,
    reviewed: Boolean(entry.reviewed ?? entry.status === "published"),
    updated_at: new Date().toISOString(),

    // Compatibility mapping for current Supabase schema.
    beverage_type: String(entry.category || "other").trim(),
    meaning: String(entry.concise_definition || "").trim(),
    how_to_apply: String(entry.why_it_matters || "").trim(),
    reference_links: sourceUrls.length > 0 ? sourceUrls : ["https://sipstudies.local/reference"],
    mla_citations: citationText.length > 0 ? citationText : ["Sip Studies internal citation placeholder"],
    source_title: sourceTitle || "Sip Studies terminology source",
    source_authors: ["Sip Studies"],
    purchase_links: sourceUrls.length > 0 ? sourceUrls : ["https://sipstudies.local/reference"],
    is_verbatim_from_source: false,
    source_rights_basis: "Original paraphrase for educational use",
    is_published: String(entry.status || "").trim() === "published",
    source_note: `source_file=${sourceFile}; quality_score=${quality}; status=${entry.status}`,
    ...optionalContextFields
  };
}

function adaptPayloadToColumns(payload, columnSet) {
  const adapted = {};
  const fields = Object.keys(payload);
  for (const f of fields) {
    if (columnSet.has(f)) adapted[f] = payload[f];
  }
  if (columnSet.has("category")) {
    adapted.category = mapSubcategoryToDbCategory(payload.subcategory);
  }
  if (columnSet.has("beverage_type")) {
    adapted.beverage_type = payload.category;
  }
  return adapted;
}

function isDeepEqual(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (!isDeepEqual(aKeys, bKeys)) return false;
    for (const key of aKeys) {
      if (!isDeepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  return false;
}

function collectDangerousSources(index) {
  const out = new Set();
  const all = [
    ...(index?.collisions?.duplicate_terms || []),
    ...(index?.collisions?.normalized_collisions || []),
    ...(index?.collisions?.alias_collisions || [])
  ];
  for (const c of all) {
    const statuses = [String(c.left_status || ""), String(c.right_status || "")].map((s) => s.toLowerCase());
    const dangerous = statuses.some((s) => ["published", "review", "review_required", "draft", "merged"].includes(s));
    if (!dangerous) continue;
    for (const key of [
      "left_source_file",
      "right_source_file",
      "alias_owner_source_file",
      "canonical_source_file"
    ]) {
      if (c[key]) out.add(String(c[key]));
    }
  }
  return out;
}

async function fetchTableColumns(supabase, tableName) {
  const { data, error } = await supabase
    .from("information_schema.columns")
    .select("column_name")
    .eq("table_schema", "public")
    .eq("table_name", tableName);
  if (error) {
    return extractColumnsFromLocalSql(tableName);
  }
  const columns = new Set((data || []).map((row) => row.column_name));
  if (columns.size > 0) return columns;
  return extractColumnsFromLocalSql(tableName);
}

function tryExtractColumnsFromSqlText(sqlText, tableName) {
  const patterns = [
    new RegExp(`create\\s+table\\s+if\\s+not\\s+exists\\s+public\\.${tableName}\\s*\\(([^;]+?)\\);`, "is"),
    new RegExp(`create\\s+table\\s+public\\.${tableName}\\s*\\(([^;]+?)\\);`, "is")
  ];
  for (const regex of patterns) {
    const match = sqlText.match(regex);
    if (!match) continue;
    const body = match[1];
    const lines = body.split("\n").map((line) => line.trim()).filter(Boolean);
    const columns = new Set();
    for (const lineRaw of lines) {
      const line = lineRaw.replace(/,$/, "");
      if (
        !line ||
        /^constraint\b/i.test(line) ||
        /^check\b/i.test(line) ||
        /^primary\s+key\b/i.test(line) ||
        /^unique\b/i.test(line) ||
        /^foreign\s+key\b/i.test(line)
      ) {
        continue;
      }
      const firstToken = line.split(/\s+/)[0];
      if (firstToken) {
        const cleaned = firstToken.replace(/["`]/g, "");
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(cleaned)) {
          columns.add(cleaned);
        }
      }
    }
    if (columns.size > 0) return columns;
  }
  return new Set();
}

function extractColumnsFromLocalSql(tableName) {
  const candidates = [];
  if (fs.existsSync(SUPABASE_SCHEMA_SQL_PATH)) {
    candidates.push(SUPABASE_SCHEMA_SQL_PATH);
  }
  if (fs.existsSync(SUPABASE_MIGRATIONS_DIR)) {
    const migrationFiles = fs.readdirSync(SUPABASE_MIGRATIONS_DIR)
      .filter((name) => name.toLowerCase().endsWith(".sql"))
      .map((name) => path.join(SUPABASE_MIGRATIONS_DIR, name))
      .sort();
    candidates.push(...migrationFiles.reverse());
  }

  for (const filePath of candidates) {
    const sql = fs.readFileSync(filePath, "utf8");
    const columns = tryExtractColumnsFromSqlText(sql, tableName);
    if (columns.size > 0) return columns;
  }

  throw new Error(
    `Failed to inspect table columns from Supabase and local SQL for table '${tableName}'.`
  );
}

async function fetchExistingByTerms(supabase, tableName, terms, selectColumns = []) {
  if (terms.length === 0) return { byTerm: new Map(), byId: new Map() };
  const map = new Map();
  const byId = new Map();
  const chunkSize = 200;
  const selectClause = ["id", "term", "source_note", "is_published", "updated_at", ...selectColumns]
    .filter((x, idx, arr) => arr.indexOf(x) === idx)
    .join(",");
  for (let i = 0; i < terms.length; i += chunkSize) {
    const chunk = terms.slice(i, i + chunkSize);
    const { data, error } = await supabase
      .from(tableName)
      .select(selectClause)
      .in("term", chunk);
    if (error) throw new Error(`Failed to fetch existing terms: ${error.message}`);
    for (const row of data || []) {
      map.set(row.term, row);
      if (row.id) byId.set(row.id, row);
    }
  }
  return { byTerm: map, byId };
}

async function fetchExistingByNormalizedTerms(supabase, tableName, normalizedTerms, selectColumns = []) {
  if (normalizedTerms.length === 0) return { byNormalized: new Map(), byId: new Map() };
  const map = new Map();
  const byId = new Map();
  const chunkSize = 200;
  const selectClause = ["id", "term", "normalized_term", "source_note", "is_published", "updated_at", "quality_score", ...selectColumns]
    .filter((x, idx, arr) => arr.indexOf(x) === idx)
    .join(",");
  for (let i = 0; i < normalizedTerms.length; i += chunkSize) {
    const chunk = normalizedTerms.slice(i, i + chunkSize);
    const { data, error } = await supabase
      .from(tableName)
      .select(selectClause)
      .in("normalized_term", chunk);
    if (error) throw new Error(`Failed to fetch existing normalized terms: ${error.message}`);
    for (const row of data || []) {
      map.set(row.normalized_term, row);
      if (row.id) byId.set(row.id, row);
    }
  }
  return { byNormalized: map, byId };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.skipIndexRebuild) {
    execFileSync("node", ["scripts/rebuild-terminology-index.js", "--quiet"], {
      cwd: REPO_ROOT,
      stdio: "inherit"
    });
  }
  if (!fs.existsSync(INDEX_PATH)) throw new Error("terminology/index.json not found.");
  if (!fs.existsSync(SCHEMA_PATH)) throw new Error("schemas/terminology.schema.json not found.");

  const index = readJson(INDEX_PATH);
  const schema = readJson(SCHEMA_PATH);
  const entries = Array.isArray(index.entries) ? index.entries : [];
  const published = entries.filter((e) => String(e.status || "").toLowerCase() === "published");
  const dangerousSources = collectDangerousSources(index);

  const summary = {
    published_local_entries_found: published.length,
    prepared_for_upsert: 0,
    inserted: 0,
    updated: 0,
    skipped: 0,
    failed: 0
  };

  const failures = [];
  const prepared = [];

  for (const row of published) {
    if (dangerousSources.has(row.source_file)) {
      summary.skipped++;
      continue;
    }
    try {
      const source = loadSourceEntry(row.source_file, row.normalized_term);
      const validationErrors = validateLocalEntryWithSchema(source, schema);
      if (validationErrors.length > 0) {
        summary.failed++;
        failures.push({
          source_file: row.source_file,
          issue: `schema_validation_failed: ${validationErrors.join("; ")}`
        });
        continue;
      }
      prepared.push({
        source_file: row.source_file,
        canonical: buildCanonicalPayload(source, row.source_file)
      });
    } catch (error) {
      summary.failed++;
      failures.push({ source_file: row.source_file, issue: error.message });
    }
  }

  summary.prepared_for_upsert = prepared.length;

  if (args.dryRun) {
    console.log("terminology sync summary (dry-run):");
    console.log(JSON.stringify(summary, null, 2));
    if (failures.length > 0) {
      console.log("failures:");
      for (const f of failures) {
        console.log(`- ${f.source_file}: ${f.issue}`);
      }
    }
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for live sync.");
  }
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const tableColumns = await fetchTableColumns(supabase, args.table);
  if (tableColumns.size === 0) {
    throw new Error(`No columns found for table '${args.table}'.`);
  }

  const useNormalizedConflict = tableColumns.has("normalized_term") && args.table === "terminology_library_entries";
  const mutableColumns = [...tableColumns].filter((c) => c !== "id" && c !== "created_at");
  const existingBundle = useNormalizedConflict
    ? await fetchExistingByNormalizedTerms(
      supabase,
      args.table,
      prepared.map((p) => p.canonical.normalized_term),
      mutableColumns
    )
    : await fetchExistingByTerms(
      supabase,
      args.table,
      prepared.map((p) => p.canonical.term),
      mutableColumns
    );

  for (const item of prepared) {
    const canonical = item.canonical;
    const existing = useNormalizedConflict
      ? (existingBundle.byNormalized.get(canonical.normalized_term) || null)
      : (existingBundle.byTerm.get(canonical.term) || null);
    const existingQualityFromNote = parseExistingQualityFromSourceNote(existing?.source_note || "");
    const existingQualityDirect = Number(existing?.quality_score);
    const existingQuality = Number.isFinite(existingQualityDirect)
      ? existingQualityDirect
      : existingQualityFromNote;
    if (existingQuality !== null && existingQuality > canonical.quality_score) {
      summary.skipped++;
      continue;
    }

    const payload = adaptPayloadToColumns(canonical, tableColumns);
    if (existing && (existing.is_published === false || existing.status === "rejected")) {
      summary.skipped++;
      continue;
    }
    if (existing) {
      const comparableExisting = {};
      for (const key of Object.keys(payload)) {
        comparableExisting[key] = existing[key];
      }
      if (isDeepEqual(comparableExisting, payload)) {
        summary.skipped++;
        const idxEntryNoop = entries.find((e) => e.source_file === item.source_file);
        if (idxEntryNoop) {
          idxEntryNoop.supabase_synced = true;
          idxEntryNoop.supabase_id = existing.id ?? idxEntryNoop.supabase_id ?? null;
          idxEntryNoop.last_synced = new Date().toISOString();
        }
        continue;
      }
    }

    const onConflictKey = useNormalizedConflict ? "normalized_term" : "term";
    const { data, error } = await supabase
      .from(args.table)
      .upsert(payload, { onConflict: onConflictKey })
      .select("id,term")
      .single();
    if (error) {
      summary.failed++;
      failures.push({ source_file: item.source_file, issue: error.message });
      continue;
    }

    if (existing) summary.updated++;
    else summary.inserted++;

    const idxEntry = entries.find((e) => e.source_file === item.source_file);
    if (idxEntry) {
      idxEntry.supabase_synced = true;
      idxEntry.supabase_id = data?.id ?? idxEntry.supabase_id ?? null;
      idxEntry.last_synced = new Date().toISOString();
    }
  }

  index.generated_at = new Date().toISOString();
  index.sync_summary = {
    ...(index.sync_summary || {}),
    synced_total: entries.filter((e) => e.supabase_synced).length,
    unsynced_total: entries.filter((e) => e.status === "published" && !e.supabase_synced).length,
    last_sync_mode: "live",
    last_sync_at: new Date().toISOString()
  };
  writeJson(INDEX_PATH, index);

  console.log("terminology sync summary:");
  console.log(JSON.stringify(summary, null, 2));
  if (failures.length > 0) {
    console.log("failures:");
    for (const f of failures) {
      console.log(`- ${f.source_file}: ${f.issue}`);
    }
  }
}

main().catch((error) => {
  console.error(`sync-terminology-to-supabase failed: ${error.message}`);
  process.exit(1);
});
