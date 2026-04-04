import type {
  BeverageType,
  GenerationConstraints,
  ImprovementDelta,
  LearningFailurePattern,
  TerminologyEntry,
  TerminologyMemoryRecord,
  TerminologyStatusOutput
} from "./types";

type FetchLike = typeof fetch;

type SupabaseConfig = {
  supabaseUrl?: string;
  serviceRoleKey?: string;
  fetchImpl?: FetchLike;
};

const DEFAULT_CONSTRAINTS: GenerationConstraints = {
  promptTemplateAdjustments: [
    "Use concrete sensory descriptors.",
    "Tie each definition to exam decision points.",
    "Keep definitions concise and non-circular."
  ],
  citationPriority: ["peer_reviewed_journal", "industry_certification_body", "book", "trade_organization"],
  taxonomyWeighting: {
    classificationWeight: 0.45,
    crossCategoryWeight: 0.25,
    hierarchyWeight: 0.3
  }
};

const EMPTY_DELTA: ImprovementDelta = {
  promptTemplateAdjustmentsDelta: 0,
  citationPriorityDelta: 0,
  taxonomyWeightingDelta: {
    classificationWeightDelta: 0,
    crossCategoryWeightDelta: 0,
    hierarchyWeightDelta: 0
  }
};

function safeArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export class TerminologyMemoryStore {
  private readonly supabaseUrl?: string;
  private readonly serviceRoleKey?: string;
  private readonly fetchImpl: FetchLike;
  private readonly memoryFallback: TerminologyMemoryRecord[] = [];

  constructor(config: SupabaseConfig = {}) {
    this.supabaseUrl = config.supabaseUrl;
    this.serviceRoleKey = config.serviceRoleKey;
    this.fetchImpl = config.fetchImpl ?? fetch;
  }

  getDefaultConstraints(): GenerationConstraints {
    return {
      promptTemplateAdjustments: [...DEFAULT_CONSTRAINTS.promptTemplateAdjustments],
      citationPriority: [...DEFAULT_CONSTRAINTS.citationPriority],
      taxonomyWeighting: { ...DEFAULT_CONSTRAINTS.taxonomyWeighting }
    };
  }

  private hasRemoteConfig(): boolean {
    return Boolean(this.supabaseUrl && this.serviceRoleKey);
  }

  private headers(extra: Record<string, string> = {}): HeadersInit {
    const key = this.serviceRoleKey ?? "";
    const headers: Record<string, string> = {
      apikey: key,
      "Content-Type": "application/json",
      ...extra
    };
    // Supabase new-style secret keys (sb_secret_*) are not JWTs.
    if (key && !key.startsWith("sb_secret_")) {
      headers.Authorization = `Bearer ${key}`;
    }
    return headers;
  }

  async fetchExistingNormalizedTerms(letter: string, beverageType: BeverageType): Promise<string[]> {
    if (!this.hasRemoteConfig()) return [];
    const encodedLetterPattern = encodeURIComponent(`${letter.toLowerCase()}*`);
    const encodedType = encodeURIComponent(beverageType);

    const [libraryResponse, legacyResponse] = await Promise.all([
      this.fetchImpl(
        `${this.supabaseUrl}/rest/v1/terminology_library_entries?select=normalized_term&subcategory=eq.${encodedType}&normalized_term=like.${encodedLetterPattern}&limit=300`,
        { method: "GET", headers: this.headers() }
      ),
      this.fetchImpl(
        `${this.supabaseUrl}/rest/v1/terminology_entries?select=normalized_term&normalized_term=like.${encodedLetterPattern}&limit=300`,
        { method: "GET", headers: this.headers() }
      )
    ]);

    if (!libraryResponse.ok && !legacyResponse.ok) return [];

    const combined = new Set<string>();
    if (libraryResponse.ok) {
      const rows = (await libraryResponse.json()) as Array<{ normalized_term?: string }>;
      for (const row of rows) {
        if (typeof row.normalized_term === "string" && row.normalized_term.length > 0) {
          combined.add(row.normalized_term);
        }
      }
    }
    if (legacyResponse.ok) {
      const rows = (await legacyResponse.json()) as Array<{ normalized_term?: string }>;
      for (const row of rows) {
        if (typeof row.normalized_term === "string" && row.normalized_term.length > 0) {
          combined.add(row.normalized_term);
        }
      }
    }
    return [...combined];
  }

  async loadLatestConstraints(beverageType: BeverageType): Promise<GenerationConstraints> {
    if (!this.hasRemoteConfig()) {
      const local = [...this.memoryFallback]
        .filter((row) => row.record_type === "batch_summary" && row.beverage_type === beverageType)
        .sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? ""));
      const latest = local[local.length - 1];
      return latest?.generation_constraints ?? this.getDefaultConstraints();
    }

    const response = await this.fetchImpl(
      `${this.supabaseUrl}/rest/v1/terminology_learning_memory?select=generation_constraints&record_type=eq.batch_summary&beverage_type=eq.${encodeURIComponent(
        beverageType
      )}&order=created_at.desc&limit=1`,
      { method: "GET", headers: this.headers() }
    );

    if (!response.ok) return this.getDefaultConstraints();
    const rows = (await response.json()) as Array<{ generation_constraints?: GenerationConstraints }>;
    return rows[0]?.generation_constraints ?? this.getDefaultConstraints();
  }

  async loadWeakDefinitionPatterns(beverageType: BeverageType): Promise<string[]> {
    if (!this.hasRemoteConfig()) {
      return Array.from(
        new Set(
          this.memoryFallback
            .filter((row) => row.record_type === "failure_pattern" && row.beverage_type === beverageType)
            .flatMap((row) => row.weak_definition_patterns)
        )
      );
    }

    const response = await this.fetchImpl(
      `${this.supabaseUrl}/rest/v1/terminology_learning_memory?select=weak_definition_patterns&record_type=eq.failure_pattern&beverage_type=eq.${encodeURIComponent(
        beverageType
      )}&order=created_at.desc&limit=50`,
      { method: "GET", headers: this.headers() }
    );

    if (!response.ok) return [];
    const rows = (await response.json()) as Array<{ weak_definition_patterns?: string[] }>;
    return Array.from(new Set(rows.flatMap((row) => safeArray(row.weak_definition_patterns))));
  }

  adjustGenerationConstraints(
    current: GenerationConstraints,
    failurePattern: LearningFailurePattern
  ): { constraints: GenerationConstraints; delta: ImprovementDelta } {
    const next: GenerationConstraints = {
      promptTemplateAdjustments: [...current.promptTemplateAdjustments],
      citationPriority: [...current.citationPriority],
      taxonomyWeighting: { ...current.taxonomyWeighting }
    };

    if (failurePattern.weakDefinitionPatterns.length > 0) {
      next.promptTemplateAdjustments = Array.from(
        new Set([
          ...next.promptTemplateAdjustments,
          "Increase specificity with one concrete production cue and one sensory cue."
        ])
      );
    }

    if (failurePattern.citationFailures.length > 0) {
      next.citationPriority = Array.from(
        new Set(["peer_reviewed_journal", "industry_certification_body", ...next.citationPriority])
      );
    }

    if (failurePattern.taxonomyMisplacements.length > 0) {
      next.taxonomyWeighting = {
        classificationWeight: Number(Math.min(0.7, current.taxonomyWeighting.classificationWeight + 0.05).toFixed(4)),
        crossCategoryWeight: Number(Math.max(0.15, current.taxonomyWeighting.crossCategoryWeight - 0.02).toFixed(4)),
        hierarchyWeight: Number(Math.min(0.45, current.taxonomyWeighting.hierarchyWeight + 0.03).toFixed(4))
      };
    }

    return {
      constraints: next,
      delta: {
        promptTemplateAdjustmentsDelta:
          next.promptTemplateAdjustments.length - current.promptTemplateAdjustments.length,
        citationPriorityDelta: next.citationPriority.length - current.citationPriority.length,
        taxonomyWeightingDelta: {
          classificationWeightDelta: Number(
            (next.taxonomyWeighting.classificationWeight - current.taxonomyWeighting.classificationWeight).toFixed(4)
          ),
          crossCategoryWeightDelta: Number(
            (next.taxonomyWeighting.crossCategoryWeight - current.taxonomyWeighting.crossCategoryWeight).toFixed(4)
          ),
          hierarchyWeightDelta: Number(
            (next.taxonomyWeighting.hierarchyWeight - current.taxonomyWeighting.hierarchyWeight).toFixed(4)
          )
        }
      }
    };
  }

  async record(entry: TerminologyMemoryRecord): Promise<void> {
    const row = {
      ...entry,
      created_at: entry.created_at ?? new Date().toISOString()
    };

    if (!this.hasRemoteConfig()) {
      this.memoryFallback.push(row);
      return;
    }

    const response = await this.fetchImpl(`${this.supabaseUrl}/rest/v1/terminology_learning_memory`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify([row])
    });
    if (!response.ok) {
      // Continue publishing even when learning-memory table is not yet deployed.
      this.memoryFallback.push(row);
      return;
    }
  }

  async upsertPublishedTerminologyEntries(input: {
    batchId: string;
    beverageType: BeverageType;
    entries: TerminologyEntry[];
  }): Promise<number> {
    if (input.entries.length === 0 || !this.hasRemoteConfig()) {
      return 0;
    }

    const rows = input.entries.map((entry) => {
      const slug = slugify(entry.term);
      const primaryCitation = entry.mla_citations[0] ?? `${entry.term}. Sip Studies Editorial Notes. 2026.`;
      const sourceTitle = primaryCitation.split(".")[0]?.trim() || `${entry.term} Reference`;
      const beverageTypeLabel = input.beverageType.replaceAll("_", " ");
      const howToApply =
        `In ${beverageTypeLabel} study, ${entry.term} is used to connect production decisions to sensory outcomes and exam reasoning. ` +
        `Students should be able to explain this term in practical service language, identify it in tasting context, and apply it to style comparisons.`;
      const exampleSentence =
        `Example: In a ${beverageTypeLabel} tasting note, the student writes, ` +
        `"${entry.term} helps explain why this beverage shows ${entry.sensory_context.toLowerCase()} given ${entry.production_context.toLowerCase()}."`;

      return {
        term: entry.term.trim(),
        meaning: entry.definition.trim(),
        how_to_apply: howToApply,
        examples: [exampleSentence],
        other_ideas: [],
        reference_links: [`https://sipstudies.org/references/${slug}`],
        mla_citations: entry.mla_citations.length > 0 ? entry.mla_citations : [primaryCitation],
        source_title: sourceTitle,
        source_authors: ["Sip Studies Editorial Team"],
        purchase_links: [`https://sipstudies.org/library/${slug}`],
        source_note: `Hyper-loop batch ${input.batchId} (${input.beverageType})`,
        is_verbatim_from_source: false,
        source_rights_basis: "",
        is_published: true
      };
    });

    const response = await this.fetchImpl(
      `${this.supabaseUrl}/rest/v1/terminology_entries?on_conflict=term`,
      {
        method: "POST",
        headers: {
          ...this.headers(),
          Prefer: "resolution=merge-duplicates,return=representation"
        },
        body: JSON.stringify(rows)
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upsert published terminology entries (${response.status}).`);
    }

    const data = (await response.json()) as Array<{ id?: string }>;
    return data.length;
  }

  async getStatus(limit = 20, beverageType?: BeverageType): Promise<TerminologyStatusOutput> {
    if (!this.hasRemoteConfig()) {
      const filtered = this.memoryFallback
        .filter((row) => row.record_type === "batch_summary")
        .filter((row) => (beverageType ? row.beverage_type === beverageType : true))
        .slice(-limit);
      return this.buildStatusFromRows(filtered);
    }

    const filterByType = beverageType ? `&beverage_type=eq.${encodeURIComponent(beverageType)}` : "";
    const response = await this.fetchImpl(
      `${this.supabaseUrl}/rest/v1/terminology_learning_memory?select=batch_id,beverage_type,letter,batch_size,evaluation_metrics,created_at&record_type=eq.batch_summary${filterByType}&order=created_at.desc&limit=${Math.max(
        1,
        Math.min(limit, 200)
      )}`,
      { method: "GET", headers: this.headers() }
    );

    if (!response.ok) {
      return {
        batchHistory: [],
        averageScoreTrend: [],
        duplicateReductionTrend: [],
        citationSuccessTrend: []
      };
    }

    const rows = (await response.json()) as Array<{
      batch_id: string;
      beverage_type: BeverageType;
      letter: string;
      created_at: string;
      evaluation_metrics?: Record<string, unknown>;
    }>;

    const normalizedRows: TerminologyMemoryRecord[] = rows.map((row) => ({
      batch_id: row.batch_id,
      beverage_type: row.beverage_type,
      letter: row.letter,
      batch_size: Number((row.evaluation_metrics?.generatedCount as number | undefined) ?? 0),
      record_type: "batch_summary",
      weak_definition_patterns: [],
      duplicate_structures: [],
      citation_failures: [],
      taxonomy_misplacements: [],
      reading_level_drift: [],
      generation_constraints: this.getDefaultConstraints(),
      evaluation_metrics: row.evaluation_metrics ?? {},
      improvement_deltas: EMPTY_DELTA,
      created_at: row.created_at
    }));

    return this.buildStatusFromRows(normalizedRows);
  }

  private buildStatusFromRows(rows: TerminologyMemoryRecord[]): TerminologyStatusOutput {
    const ordered = [...rows].sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? ""));

    return {
      batchHistory: ordered.map((row) => ({
        batchId: row.batch_id,
        beverageType: row.beverage_type,
        letter: row.letter,
        generatedAt: row.created_at ?? new Date().toISOString(),
        averagePublishReadinessScore: Number(row.evaluation_metrics.averagePublishReadinessScore ?? 0),
        duplicateRate: Number(row.evaluation_metrics.duplicateRate ?? 0),
        citationSuccessRate: Number(row.evaluation_metrics.citationSuccessRate ?? 0)
      })),
      averageScoreTrend: ordered.map((row) => Number(row.evaluation_metrics.averageScoreTrendPoint ?? 0)),
      duplicateReductionTrend: ordered.map((row) =>
        Number(row.evaluation_metrics.duplicateReductionTrendPoint ?? 0)
      ),
      citationSuccessTrend: ordered.map((row) => Number(row.evaluation_metrics.citationSuccessTrendPoint ?? 0))
    };
  }
}
