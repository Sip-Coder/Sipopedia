import type { DuplicateBatchResult, DuplicateEvaluation, TerminologyEntry } from "./types";

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(" ")
    .map((part) => part.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const aSet = new Set(a);
  const bSet = new Set(b);
  const intersection = [...aSet].filter((value) => bSet.has(value)).length;
  const union = new Set([...aSet, ...bSet]).size;
  return union === 0 ? 0 : intersection / union;
}

export class DuplicateDetectionAgent {
  evaluate(entries: TerminologyEntry[], existingNormalizedTerms: string[]): DuplicateBatchResult {
    const existingSet = new Set(existingNormalizedTerms.map(normalize));
    const seenInBatch = new Set<string>();

    const evaluations: DuplicateEvaluation[] = entries.map((entry) => {
      const normalizedTerm = normalize(entry.term);
      const semanticDuplicate = seenInBatch.has(normalizedTerm);
      const existingCollision = existingSet.has(normalizedTerm);
      seenInBatch.add(normalizedTerm);

      const currentTokens = tokenize(entry.definition);
      const overlappingTerms: string[] = [];

      for (const candidate of entries) {
        if (candidate.term === entry.term) continue;
        const score = jaccardSimilarity(currentTokens, tokenize(candidate.definition));
        if (score >= 0.5) {
          overlappingTerms.push(candidate.term);
        }
      }

      const partialOverlap = overlappingTerms.length > 0;

      return {
        term: entry.term,
        semanticDuplicate,
        partialOverlap,
        existingCollision,
        overlappingTerms
      };
    });

    const duplicateRate =
      evaluations.filter((entry) => entry.semanticDuplicate || entry.partialOverlap).length /
      Math.max(evaluations.length, 1);
    const collisionRate =
      evaluations.filter((entry) => entry.existingCollision).length / Math.max(evaluations.length, 1);

    const duplicateStructures = evaluations
      .filter((entry) => entry.semanticDuplicate || entry.partialOverlap || entry.existingCollision)
      .map((entry) => {
        if (entry.existingCollision) return `${entry.term}:existing_database_collision`;
        if (entry.semanticDuplicate) return `${entry.term}:semantic_duplicate`;
        return `${entry.term}:partial_overlap`;
      });

    return {
      evaluations,
      duplicateRate: Number(duplicateRate.toFixed(4)),
      collisionRate: Number(collisionRate.toFixed(4)),
      duplicateStructures: Array.from(new Set(duplicateStructures))
    };
  }
}

