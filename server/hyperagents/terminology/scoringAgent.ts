import type {
  CitationBatchResult,
  DuplicateBatchResult,
  ReadabilityBatchResult,
  ScoringBatchResult,
  ScoringEvaluation,
  TaxonomyBatchResult,
  TerminologyEntry
} from "./types";

type EvaluationByTerm = Record<string, number>;

function indexByTerm(values: Array<{ term: string } & Record<string, unknown>>, key: string): EvaluationByTerm {
  const map: EvaluationByTerm = {};
  for (const item of values) {
    const value = item[key];
    map[item.term] = typeof value === "number" ? value : 0;
  }
  return map;
}

export class ScoringAgent {
  evaluate(input: {
    entries: TerminologyEntry[];
    citation: CitationBatchResult;
    taxonomy: TaxonomyBatchResult;
    duplicate: DuplicateBatchResult;
    readability: ReadabilityBatchResult;
    threshold: number;
  }): ScoringBatchResult {
    const credibilityByTerm = indexByTerm(input.citation.evaluations as Array<{ term: string } & Record<string, unknown>>, "sourceCredibilityScore");
    const mlaByTerm = indexByTerm(input.citation.evaluations as Array<{ term: string } & Record<string, unknown>>, "mlaFormattingScore");
    const crossCategoryByTerm = indexByTerm(
      input.taxonomy.evaluations as Array<{ term: string } & Record<string, unknown>>,
      "crossCategoryLinkingScore"
    );
    const examSuitabilityByTerm = indexByTerm(
      input.readability.evaluations as Array<{ term: string } & Record<string, unknown>>,
      "examSuitabilityScore"
    );
    const clarityByTerm = indexByTerm(
      input.readability.evaluations as Array<{ term: string } & Record<string, unknown>>,
      "clarityScore"
    );

    const duplicatePenaltyByTerm: EvaluationByTerm = {};
    for (const item of input.duplicate.evaluations) {
      duplicatePenaltyByTerm[item.term] =
        (item.semanticDuplicate ? 0.45 : 0) + (item.partialOverlap ? 0.2 : 0) + (item.existingCollision ? 0.35 : 0);
    }

    const evaluations: ScoringEvaluation[] = input.entries.map((entry) => {
      const citationStrength = (credibilityByTerm[entry.term] + mlaByTerm[entry.term]) / 2;
      const taxonomyStrength = crossCategoryByTerm[entry.term];
      const readabilityStrength = (examSuitabilityByTerm[entry.term] + clarityByTerm[entry.term]) / 2;
      const penalty = duplicatePenaltyByTerm[entry.term] ?? 0;

      const confidenceScore = Math.max(
        0,
        Number((citationStrength * 0.35 + taxonomyStrength * 0.35 + readabilityStrength * 0.3 - penalty).toFixed(4))
      );
      const publishReadinessScore = Math.max(0, Number((confidenceScore - penalty * 0.25).toFixed(4)));
      const revisionPriorityScore = Number((1 - publishReadinessScore).toFixed(4));

      return {
        term: entry.term,
        confidenceScore,
        publishReadinessScore,
        revisionPriorityScore,
        belowThreshold: publishReadinessScore < input.threshold
      };
    });

    return {
      evaluations,
      averageConfidenceScore: Number(
        (
          evaluations.reduce((sum, entry) => sum + entry.confidenceScore, 0) /
          Math.max(evaluations.length, 1)
        ).toFixed(4)
      ),
      averagePublishReadinessScore: Number(
        (
          evaluations.reduce((sum, entry) => sum + entry.publishReadinessScore, 0) /
          Math.max(evaluations.length, 1)
        ).toFixed(4)
      ),
      revisionPriorityAverage: Number(
        (
          evaluations.reduce((sum, entry) => sum + entry.revisionPriorityScore, 0) /
          Math.max(evaluations.length, 1)
        ).toFixed(4)
      )
    };
  }
}

