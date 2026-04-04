import type { CitationBatchResult, CitationEvaluation, TerminologyEntry } from "./types";

function scoreCredibility(citation: string): number {
  const normalized = citation.toLowerCase();
  if (normalized.includes("journal") || normalized.includes("press")) return 0.92;
  if (normalized.includes("association") || normalized.includes("institute")) return 0.86;
  if (normalized.includes("guide")) return 0.76;
  return 0.62;
}

function isMlaLike(citation: string): boolean {
  return /^.+\..+\..+\d{4}\.?$/.test(citation.trim());
}

export class CitationAgent {
  evaluate(entries: TerminologyEntry[]): CitationBatchResult {
    const citationUsage = new Map<string, number>();

    for (const entry of entries) {
      for (const citation of entry.mla_citations) {
        const key = citation.trim().toLowerCase();
        citationUsage.set(key, (citationUsage.get(key) ?? 0) + 1);
      }
    }

    const evaluations: CitationEvaluation[] = entries.map((entry) => {
      const credibilityScores = entry.mla_citations.map(scoreCredibility);
      const mlaChecks = entry.mla_citations.map(isMlaLike);
      const duplicateDetected = entry.mla_citations.some(
        (citation) => (citationUsage.get(citation.trim().toLowerCase()) ?? 0) > 1
      );
      const issues: string[] = [];

      if (credibilityScores.some((score) => score < 0.7)) {
        issues.push("low_source_credibility");
      }
      if (mlaChecks.some((pass) => !pass)) {
        issues.push("mla_format_inconsistency");
      }
      if (duplicateDetected) {
        issues.push("duplicate_citation_reuse");
      }

      return {
        term: entry.term,
        sourceCredibilityScore:
          credibilityScores.reduce((sum, score) => sum + score, 0) / Math.max(credibilityScores.length, 1),
        mlaFormattingScore: mlaChecks.filter(Boolean).length / Math.max(mlaChecks.length, 1),
        duplicateCitationReuseDetected: duplicateDetected,
        issues
      };
    });

    const citationSuccessRate =
      evaluations.filter((entry) => entry.issues.length === 0).length / Math.max(evaluations.length, 1);
    const duplicateCitationRate =
      evaluations.filter((entry) => entry.duplicateCitationReuseDetected).length / Math.max(evaluations.length, 1);
    const failurePatterns = evaluations.flatMap((entry) => entry.issues);

    return {
      evaluations,
      citationSuccessRate: Number(citationSuccessRate.toFixed(4)),
      duplicateCitationRate: Number(duplicateCitationRate.toFixed(4)),
      failurePatterns: Array.from(new Set(failurePatterns))
    };
  }
}
