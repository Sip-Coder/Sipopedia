export type BeverageType =
  | "wine"
  | "beer"
  | "spirits"
  | "coffee"
  | "tea"
  | "water"
  | "fermented_beverages";

export type GenerationConstraints = {
  promptTemplateAdjustments: string[];
  citationPriority: string[];
  taxonomyWeighting: {
    classificationWeight: number;
    crossCategoryWeight: number;
    hierarchyWeight: number;
  };
};

export interface TerminologyEntry {
  term: string;
  definition: string;
  category: string;
  related_terms: string[];
  exam_relevance: string;
  sensory_context: string;
  production_context: string;
  mla_citations: string[];
}

export interface WriterAgentInput {
  letter: string;
  beverageType: BeverageType;
  batchSize: number;
  constraints: GenerationConstraints;
  weakDefinitionPatterns: string[];
  externalEntries?: TerminologyEntry[];
}

export interface CitationEvaluation {
  term: string;
  sourceCredibilityScore: number;
  mlaFormattingScore: number;
  duplicateCitationReuseDetected: boolean;
  issues: string[];
}

export interface CitationBatchResult {
  evaluations: CitationEvaluation[];
  citationSuccessRate: number;
  duplicateCitationRate: number;
  failurePatterns: string[];
}

export interface TaxonomyEvaluation {
  term: string;
  classificationValid: boolean;
  crossCategoryLinkingScore: number;
  hierarchyPlacementValid: boolean;
  issues: string[];
}

export interface TaxonomyBatchResult {
  evaluations: TaxonomyEvaluation[];
  taxonomySuccessRate: number;
  misplacementPatterns: string[];
}

export interface DuplicateEvaluation {
  term: string;
  semanticDuplicate: boolean;
  partialOverlap: boolean;
  existingCollision: boolean;
  overlappingTerms: string[];
}

export interface DuplicateBatchResult {
  evaluations: DuplicateEvaluation[];
  duplicateRate: number;
  collisionRate: number;
  duplicateStructures: string[];
}

export interface ReadabilityEvaluation {
  term: string;
  readingGradeLevel: number;
  examSuitabilityScore: number;
  clarityScore: number;
  driftDetected: boolean;
}

export interface ReadabilityBatchResult {
  evaluations: ReadabilityEvaluation[];
  averageGradeLevel: number;
  readabilitySuccessRate: number;
  readingLevelDriftPatterns: string[];
}

export interface ScoringEvaluation {
  term: string;
  confidenceScore: number;
  publishReadinessScore: number;
  revisionPriorityScore: number;
  belowThreshold: boolean;
}

export interface ScoringBatchResult {
  evaluations: ScoringEvaluation[];
  averageConfidenceScore: number;
  averagePublishReadinessScore: number;
  revisionPriorityAverage: number;
}

export interface TerminologyBatchMetrics {
  generatedCount: number;
  publishedCount: number;
  averageConfidenceScore: number;
  averagePublishReadinessScore: number;
  citationSuccessRate: number;
  duplicateRate: number;
  duplicateReductionTrendPoint: number;
  citationSuccessTrendPoint: number;
  averageScoreTrendPoint: number;
  belowThresholdCount: number;
}

export interface ImprovementDelta {
  promptTemplateAdjustmentsDelta: number;
  citationPriorityDelta: number;
  taxonomyWeightingDelta: {
    classificationWeightDelta: number;
    crossCategoryWeightDelta: number;
    hierarchyWeightDelta: number;
  };
}

export interface TerminologyRunBatchInput {
  letter: string;
  beverageType: BeverageType;
  batchSize: number;
  scoreThreshold?: number;
  externalEntries?: TerminologyEntry[];
}

export interface TerminologyRunBatchOutput {
  batchId: string;
  generatedAt: string;
  generatedTerms: TerminologyEntry[];
  evaluationMetrics: TerminologyBatchMetrics;
  improvementDeltas: ImprovementDelta;
}

export interface LearningFailurePattern {
  weakDefinitionPatterns: string[];
  duplicateStructures: string[];
  citationFailures: string[];
  taxonomyMisplacements: string[];
  readingLevelDrift: string[];
}

export interface TerminologyMemoryRecord {
  id?: string;
  batch_id: string;
  beverage_type: BeverageType;
  letter: string;
  batch_size: number;
  record_type: "batch_summary" | "failure_pattern";
  weak_definition_patterns: string[];
  duplicate_structures: string[];
  citation_failures: string[];
  taxonomy_misplacements: string[];
  reading_level_drift: string[];
  generation_constraints: GenerationConstraints;
  evaluation_metrics: Record<string, unknown>;
  improvement_deltas: ImprovementDelta;
  created_at?: string;
}

export interface TerminologyStatusOutput {
  batchHistory: Array<{
    batchId: string;
    beverageType: BeverageType;
    letter: string;
    generatedAt: string;
    averagePublishReadinessScore: number;
    duplicateRate: number;
    citationSuccessRate: number;
  }>;
  averageScoreTrend: number[];
  duplicateReductionTrend: number[];
  citationSuccessTrend: number[];
}
