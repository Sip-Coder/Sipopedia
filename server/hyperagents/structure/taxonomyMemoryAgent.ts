import type { SupabaseClient } from "@supabase/supabase-js";
import type { CorrectionIssue, CitationTrustScore, TermInput } from "./types";

export class TaxonomyMemoryAgent {
  constructor(private readonly supabase: SupabaseClient | null) {}

  async storeLearningEvent(params: {
    termInput: TermInput;
    correctionIssues: CorrectionIssue[];
    citationTrust: CitationTrustScore[];
  }): Promise<void> {
    if (!this.supabase) return;

    const hasClassificationMistake = params.correctionIssues.some(
      (issue) => issue.type === "misplaced_term" || issue.type === "taxonomy_conflict"
    );

    const details = {
      aliases: params.termInput.aliases ?? [],
      parentTerm: params.termInput.parentTerm ?? null,
      corrections: params.correctionIssues,
      citationTrustAverage:
        params.citationTrust.length > 0
          ? Number(
              (
                params.citationTrust.reduce((sum, item) => sum + item.score, 0) /
                params.citationTrust.length
              ).toFixed(2)
            )
          : 0
    };

    await this.supabase.from("taxonomy_learning_memory").insert({
      term: params.termInput.term,
      beverage_type: params.termInput.beverageType ?? null,
      event_type: "validation_run",
      classification_mistake: hasClassificationMistake,
      source_reliability_updates: params.citationTrust,
      details
    });
  }
}
