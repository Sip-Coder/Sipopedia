import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();
const TERMINOLOGY_DIR = path.join(REPO_ROOT, "terminology");
const REVIEW_DIR = path.join(REPO_ROOT, "review", "terminology");
const INDEX_PATH = path.join(TERMINOLOGY_DIR, "index.json");

const CATEGORY_LIST = [
  "wine",
  "beer",
  "spirits",
  "coffee",
  "tea",
  "water",
  "sake",
  "kombucha",
  "juice",
  "milk",
  "energy-drinks",
  "other"
];

const DANGEROUS_STATUSES = new Set(["published", "review", "review_required", "draft", "merged", "rejected"]);

function parseArgs(argv) {
  return {
    failOnDangerousCollisions: argv.includes("--fail-on-dangerous-collisions"),
    failOnAnyCollisions: argv.includes("--fail-on-any-collisions"),
    quiet: argv.includes("--quiet")
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

function toRelPath(absPath) {
  return path.relative(REPO_ROOT, absPath).replace(/\\/g, "/");
}

function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function listJsonFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const out = [];
  const stack = [dirPath];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".json")) {
        if (entry.name === "index.json") continue;
        out.push(full);
      }
    }
  }
  return out.sort();
}

function loadExistingSyncMap() {
  if (!fs.existsSync(INDEX_PATH)) {
    return new Map();
  }
  try {
    const existing = readJsonFile(INDEX_PATH);
    const map = new Map();
    const entries = Array.isArray(existing.entries) ? existing.entries : [];
    for (const e of entries) {
      if (!e || typeof e !== "object") continue;
      if (!e.source_file) continue;
      map.set(e.source_file, {
        supabase_synced: Boolean(e.supabase_synced),
        supabase_id: e.supabase_id ?? null,
        last_synced: e.last_synced ?? null
      });
    }
    return map;
  } catch {
    return new Map();
  }
}

function classifyDanger(collision) {
  const statuses = new Set([
    String(collision.left_status ?? "").toLowerCase(),
    String(collision.right_status ?? "").toLowerCase()
  ]);
  for (const s of statuses) {
    if (DANGEROUS_STATUSES.has(s)) {
      return true;
    }
  }
  return false;
}

function defaultGapTargets(currentByCategory) {
  const templateClusters = {
    wine: ["grape-varieties", "vinification-techniques", "faults-and-conditions", "service-and-storage"],
    beer: ["styles", "fermentation-process", "ingredients", "service-and-faults"],
    spirits: ["base-materials", "distillation-methods", "aging-and-finishing", "service-and-cocktail-context"],
    coffee: ["processing", "roasting", "brewing", "sensory-defects"],
    tea: ["processing", "cultivar-origin", "brewing-parameters", "quality-defects"],
    water: ["minerality", "treatment", "sensory-profile", "service"],
    sake: ["rice-polishing", "fermentation", "grade-classifications", "service"],
    kombucha: ["fermentation-biology", "sugar-acid-balance", "production-risks", "service"],
    juice: ["processing-methods", "sweetness-acidity-balance", "preservation", "quality-defects"],
    milk: ["composition", "processing", "sensory-defects", "service"],
    "energy-drinks": ["ingredients", "functional-claims", "regulation", "service"],
    other: ["category-taxonomy", "processing", "service", "quality-defects"]
  };

  const out = {};
  for (const category of CATEGORY_LIST) {
    const current = currentByCategory[category] ?? 0;
    out[category] = {
      target_entry_count: 100,
      current_entry_count: current,
      target_clusters: templateClusters[category] ?? [],
      notes: "Adjust targets based on curriculum priorities."
    };
  }
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(TERMINOLOGY_DIR)) {
    throw new Error("terminology/ folder not found.");
  }
  if (!fs.existsSync(REVIEW_DIR)) {
    fs.mkdirSync(REVIEW_DIR, { recursive: true });
  }

  const existingSyncMap = loadExistingSyncMap();
  const sourceFiles = [
    ...listJsonFiles(TERMINOLOGY_DIR),
    ...listJsonFiles(REVIEW_DIR)
  ];

  const entries = [];
  const parseErrors = [];
  const collisions = {
    duplicate_terms: [],
    normalized_collisions: [],
    alias_collisions: []
  };

  const byTerm = new Map();
  const byNormalized = new Map();
  const byAlias = new Map();
  const byCategory = {};
  const byStatus = {};

  for (const c of CATEGORY_LIST) byCategory[c] = 0;

  for (const filePath of sourceFiles) {
    const rel = toRelPath(filePath);
    let parsed;
    try {
      parsed = readJsonFile(filePath);
    } catch (error) {
      parseErrors.push({
        source_file: rel,
        issue: `Invalid JSON parse: ${error.message}`
      });
      continue;
    }

    const items = Array.isArray(parsed) ? parsed : [parsed];
    for (const item of items) {
      if (!item || typeof item !== "object") continue;
      const term = String(item.term ?? "").trim();
      const normalizedTerm = normalizeTerm(item.normalized_term || term);
      const category = String(item.category ?? "").trim() || "other";
      const subcategory = String(item.subcategory ?? "").trim();
      const status = String(item.status ?? "").trim() || "draft";
      const qualityScore = Number(item.quality_score ?? 0);
      const aliases = Array.isArray(item.alias_terms || item.aliases)
        ? (item.alias_terms || item.aliases).map((x) => String(x).trim()).filter(Boolean)
        : [];
      const commonConfusions = Array.isArray(item.common_confusions)
        ? item.common_confusions.map((x) => String(x).trim()).filter(Boolean)
        : [];
      const relatedTerms = Array.isArray(item.related_terms)
        ? item.related_terms.map((x) => String(x).trim()).filter(Boolean)
        : [];
      const reviewed = typeof item.reviewed === "boolean" ? item.reviewed : status === "published";

      const syncMeta = existingSyncMap.get(rel) ?? {};
      const stat = fs.statSync(filePath);

      const indexEntry = {
        term,
        normalized_term: normalizedTerm,
        category,
        subcategory,
        status,
        quality_score: Number.isFinite(qualityScore) ? qualityScore : 0,
        aliases,
        common_confusions: commonConfusions,
        related_terms: relatedTerms,
        source_file: rel,
        reviewed,
        supabase_synced: Boolean(syncMeta.supabase_synced ?? item.supabase_synced ?? false),
        supabase_id: syncMeta.supabase_id ?? item.supabase_id ?? null,
        last_modified: stat.mtime.toISOString(),
        last_synced: syncMeta.last_synced ?? item.last_synced ?? null
      };
      entries.push(indexEntry);

      byCategory[category] = (byCategory[category] ?? 0) + 1;
      byStatus[status] = (byStatus[status] ?? 0) + 1;

      const termKey = term.toLowerCase();
      if (!byTerm.has(termKey)) byTerm.set(termKey, []);
      byTerm.get(termKey).push(indexEntry);

      if (!byNormalized.has(normalizedTerm)) byNormalized.set(normalizedTerm, []);
      byNormalized.get(normalizedTerm).push(indexEntry);

      for (const aliasRaw of aliases) {
        const alias = normalizeTerm(aliasRaw);
        if (!alias) continue;
        if (!byAlias.has(alias)) byAlias.set(alias, []);
        byAlias.get(alias).push(indexEntry);
      }
    }
  }

  for (const [termKey, list] of byTerm.entries()) {
    if (list.length < 2) continue;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        collisions.duplicate_terms.push({
          type: "duplicate_term",
          term_key: termKey,
          left_source_file: list[i].source_file,
          right_source_file: list[j].source_file,
          left_status: list[i].status,
          right_status: list[j].status
        });
      }
    }
  }

  for (const [norm, list] of byNormalized.entries()) {
    if (list.length < 2) continue;
    const distinctTerms = [...new Set(list.map((x) => x.term.toLowerCase()))];
    if (distinctTerms.length < 2) continue;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        collisions.normalized_collisions.push({
          type: "normalized_collision",
          normalized_term: norm,
          left_term: list[i].term,
          right_term: list[j].term,
          left_source_file: list[i].source_file,
          right_source_file: list[j].source_file,
          left_status: list[i].status,
          right_status: list[j].status
        });
      }
    }
  }

  for (const [alias, owners] of byAlias.entries()) {
    const canonicalOwners = byNormalized.get(alias) ?? [];
    if (owners.length > 1) {
      for (let i = 0; i < owners.length; i++) {
        for (let j = i + 1; j < owners.length; j++) {
          collisions.alias_collisions.push({
            type: "alias_alias_collision",
            alias,
            left_term: owners[i].term,
            right_term: owners[j].term,
            left_source_file: owners[i].source_file,
            right_source_file: owners[j].source_file,
            left_status: owners[i].status,
            right_status: owners[j].status
          });
        }
      }
    }
    for (const owner of owners) {
      for (const canonical of canonicalOwners) {
        if (owner.source_file === canonical.source_file) continue;
        collisions.alias_collisions.push({
          type: "alias_canonical_collision",
          alias,
          alias_owner_term: owner.term,
          canonical_term: canonical.term,
          alias_owner_source_file: owner.source_file,
          canonical_source_file: canonical.source_file,
          left_status: owner.status,
          right_status: canonical.status
        });
      }
    }
  }

  const publishedTotal = entries.filter((e) => e.status === "published").length;
  const reviewRequiredTotal = entries.filter((e) => e.status === "review" || e.status === "review_required").length;
  const draftTotal = entries.filter((e) => e.status === "draft").length;
  const rejectedTotal = entries.filter((e) => e.status === "rejected").length;
  const mergedTotal = entries.filter((e) => e.status === "merged").length;
  const syncedTotal = entries.filter((e) => e.supabase_synced).length;
  const unsyncedTotal = entries.filter((e) => e.status === "published" && !e.supabase_synced).length;

  const index = {
    version: 1,
    generated_at: new Date().toISOString(),
    scan_roots: ["terminology/", "review/terminology/"],
    schema_ref: "schemas/terminology.schema.json",
    entries,
    lookups: {
      by_normalized_term: Object.fromEntries(
        [...byNormalized.entries()].map(([k, list]) => [k, list.map((e) => e.source_file)])
      ),
      by_alias_normalized: Object.fromEntries(
        [...byAlias.entries()].map(([k, list]) => [k, list.map((e) => e.source_file)])
      )
    },
    collisions,
    parse_errors: parseErrors,
    counts: {
      total_entries: entries.length,
      by_category: byCategory,
      by_status: byStatus
    },
    sync_summary: {
      published_total: publishedTotal,
      review_required_total: reviewRequiredTotal,
      draft_total: draftTotal,
      rejected_total: rejectedTotal,
      merged_total: mergedTotal,
      synced_total: syncedTotal,
      unsynced_total: unsyncedTotal
    },
    gap_targets: defaultGapTargets(byCategory)
  };

  fs.mkdirSync(TERMINOLOGY_DIR, { recursive: true });
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  const dangerousCollisions = [
    ...collisions.duplicate_terms,
    ...collisions.normalized_collisions,
    ...collisions.alias_collisions
  ].filter(classifyDanger);
  const anyCollisionsCount =
    collisions.duplicate_terms.length +
    collisions.normalized_collisions.length +
    collisions.alias_collisions.length;

  if (!args.quiet) {
    console.log("terminology index rebuilt");
    console.log(`entries=${entries.length}`);
    console.log(`parse_errors=${parseErrors.length}`);
    console.log(`collisions_total=${anyCollisionsCount}`);
    console.log(`dangerous_collisions=${dangerousCollisions.length}`);
    console.log(`index_file=${toRelPath(INDEX_PATH)}`);
  }

  if (args.failOnAnyCollisions && anyCollisionsCount > 0) {
    process.exitCode = 2;
    return;
  }
  if (args.failOnDangerousCollisions && dangerousCollisions.length > 0) {
    process.exitCode = 2;
    return;
  }
  if (parseErrors.length > 0) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error(`rebuild-terminology-index failed: ${error.message}`);
  process.exit(1);
}
