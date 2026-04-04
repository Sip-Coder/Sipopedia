import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { BANNED_SOURCE_PATTERNS, REQUIRED_FIELDS, isBannedSource, sourceDomain } from "./terms-policy.js";

const REPO_ROOT = process.cwd();
const REVIEW_DIR = path.join(REPO_ROOT, "review", "terminology");
const DEFAULT_LIMIT = 535;
const EDITORIAL_POLICY_MARKER = "editorial_policy=Original Sipopedia editorial definition. No verbatim source text.";

function parseArgs(argv) {
  const out = {
    limit: DEFAULT_LIMIT,
    apply: argv.includes("--apply"),
    applyEditorialMarker: argv.includes("--apply-editorial-marker")
  };
  const index = argv.indexOf("--limit");
  if (index >= 0 && argv[index + 1]) {
    out.limit = Math.max(1, Number(argv[index + 1]) || DEFAULT_LIMIT);
  }
  return out;
}

function normalizeTerm(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasList(value) {
  return Array.isArray(value) && value.length > 0 && value.every((v) => typeof v === "string" && v.trim().length > 0);
}

function validateRow(row) {
  const findings = [];

  if (!hasText(row.term)) findings.push("missing_term");
  if (!hasText(row.meaning)) findings.push("missing_meaning");
  if (!hasText(row.how_to_apply)) findings.push("missing_how_to_apply");
  if (!hasList(row.examples)) findings.push("missing_examples");
  if (!hasList(row.source_authors)) findings.push("missing_authors");
  if (!hasList(row.reference_links)) findings.push("missing_references");
  if (!hasList(row.mla_citations)) findings.push("missing_mla_citations");

  const blocked = (row.reference_links || []).filter((link) => isBannedSource(link));
  if (blocked.length > 0) {
    findings.push(`banned_sources:${blocked.map(sourceDomain).join(",")}`);
  }

  const editorialPolicy = String(row.source_note || "");
  if (!editorialPolicy.toLowerCase().includes("editorial_policy=")) {
    findings.push("missing_editorial_policy_marker");
  }

  return findings;
}

function buildReport({ rows, findingsById, requiredShape, limit }) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = path.join(REVIEW_DIR, `terms-audit-${stamp}.md`);
  const lines = [];

  lines.push(`# Terms Audit ${stamp}`);
  lines.push("");
  lines.push("## Scope");
  lines.push(`- requested_limit: ${limit}`);
  lines.push(`- reviewed_rows: ${rows.length}`);
  lines.push(`- required_shape: ${requiredShape.join(", ")}`);
  lines.push(`- banned_source_patterns: ${BANNED_SOURCE_PATTERNS.join(", ")}`);
  lines.push("");
  lines.push("## Findings");

  let issueCount = 0;
  for (const row of rows) {
    const issues = findingsById.get(row.id) || [];
    if (issues.length === 0) continue;
    issueCount += issues.length;
    lines.push(`- ${row.term}: ${issues.join("; ")}`);
  }
  if (issueCount === 0) {
    lines.push("- none");
  }

  lines.push("");
  lines.push("## Summary");
  lines.push(`- terms_with_issues: ${[...findingsById.values()].filter((list) => list.length > 0).length}`);
  lines.push(`- total_issues: ${issueCount}`);

  fs.mkdirSync(REVIEW_DIR, { recursive: true });
  fs.writeFileSync(outPath, `${lines.join("\n")}\n`, "utf8");
  return outPath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY) are required.");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const { data, error } = await supabase
    .from("terminology_entries")
    .select(
      "id,term,updated_at,meaning,how_to_apply,examples,source_authors,infographic_url,reference_links,mla_citations,source_note,is_published"
    )
    .order("term", { ascending: true })
    .limit(args.limit);
  if (error) throw new Error(`failed to load terms: ${error.message}`);

  const rows = data || [];
  const dedupe = new Set();
  const findingsById = new Map();
  const markUnpublishIds = [];

  for (const row of rows) {
    const findings = validateRow(row);
    const key = normalizeTerm(row.term);
    if (dedupe.has(key)) findings.push("duplicate_normalized_term_in_scope");
    dedupe.add(key);
    findingsById.set(row.id, findings);
    if (findings.length > 0) markUnpublishIds.push(row.id);
  }

  if (args.apply && markUnpublishIds.length > 0) {
    const { error: updateError } = await supabase
      .from("terminology_entries")
      .update({ is_published: false })
      .in("id", markUnpublishIds);
    if (updateError) throw new Error(`failed to apply unpublish updates: ${updateError.message}`);
  }

  let editorialMarkerUpdates = 0;
  if (args.applyEditorialMarker) {
    const serviceOnlyKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceOnlyKey) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for --apply-editorial-marker.");
    }

    const serviceSupabase = createClient(supabaseUrl, serviceOnlyKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const patchRows = rows
      .filter((row) => {
        const note = String(row.source_note || "");
        return !note.toLowerCase().includes("editorial_policy=");
      })
      .map((row) => ({
        id: row.id,
        source_note: String(row.source_note || "").trim()
          ? `${String(row.source_note || "").trim()} | ${EDITORIAL_POLICY_MARKER}`
          : EDITORIAL_POLICY_MARKER
      }));

    const chunkSize = 50;
    for (let i = 0; i < patchRows.length; i += chunkSize) {
      const chunk = patchRows.slice(i, i + chunkSize);
      await Promise.all(
        chunk.map(async (item) => {
          const { error: patchError } = await serviceSupabase
            .from("terminology_entries")
            .update({ source_note: item.source_note })
            .eq("id", item.id);
          if (patchError) {
            throw new Error(`failed editorial marker update on ${item.id}: ${patchError.message}`);
          }
        })
      );
      editorialMarkerUpdates += chunk.length;
    }
  }

  const reportPath = buildReport({
    rows,
    findingsById,
    requiredShape: REQUIRED_FIELDS,
    limit: args.limit
  });

  console.log(
    JSON.stringify(
      {
        reviewed_rows: rows.length,
        terms_with_issues: [...findingsById.values()].filter((list) => list.length > 0).length,
        apply_mode: args.apply,
        apply_editorial_marker_mode: args.applyEditorialMarker,
        editorial_marker_updates: editorialMarkerUpdates,
        unpublished_count: args.apply ? markUnpublishIds.length : 0,
        report: path.relative(REPO_ROOT, reportPath).replace(/\\/g, "/")
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(`audit-terms failed: ${error.message}`);
  process.exit(1);
});
