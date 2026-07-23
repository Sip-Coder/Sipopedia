import { CitationAgent } from "./citationAgent.ts";
import { DuplicateDetectionAgent } from "./duplicateDetectionAgent.ts";
import { ReadabilityAgent } from "./readabilityAgent.ts";
import { ScoringAgent } from "./scoringAgent.ts";
import { TaxonomyAgent } from "./taxonomyAgent.ts";
import { TerminologyMemoryStore } from "./terminologyMemoryStore.ts";
import { WriterAgent } from "./writerAgent.ts";
import type {
  ImprovementDelta,
  LearningFailurePattern,
  TerminologyBatchMetrics,
  TerminologyMemoryRecord,
  TerminologyRunBatchInput,
  TerminologyRunBatchOutput,
  TerminologyStatusOutput
} from "./types.ts";

function toBatchId(): string {
  return `tb-${new Date().toISOString().replace(/[-:.TZ]/g, "")}-${Math.random().toString(36).slice(2, 8)}`;
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0)));
}

function clampThreshold(value: number | undefined): number {
  const baseline = typeof value === "number" ? value : 0.72;
  return Math.min(Math.max(baseline, 0.2), 0.95);
}

export class TerminologyOrchestrator {
  private readonly writerAgent = new WriterAgent();
  private readonly citationAgent = new CitationAgent();
  private readonly taxonomyAgent = new TaxonomyAgent();
  private readonly duplicateDetectionAgent = new DuplicateDetectionAgent();
  private readonly readabilityAgent = new ReadabilityAgent();
  private readonly scoringAgent = new ScoringAgent();

  constructor(private readonly memoryStore: TerminologyMemoryStore) {}

  async runBatch(input: TerminologyRunBatchInput): Promise<TerminologyRunBatchOutput> {
    const generatedAt = new Date().toISOString();
    const batchId = toBatchId();
    const threshold = clampThreshold(input.scoreThreshold);

    const constraints = await this.memoryStore.loadLatestConstraints(input.beverageType);
    const weakDefinitionPatterns = await this.memoryStore.loadWeakDefinitionPatterns(input.beverageType);
    const existingNormalizedTerms = await this.memoryStore.fetchExistingNormalizedTerms(
      input.letter,
      input.beverageType
    );

    const generatedTerms = this.writerAgent.generateBatch({
      letter: input.letter,
      beverageType: input.beverageType,
      batchSize: input.batchSize,
      constraints,
      weakDefinitionPatterns,
      externalEntries: input.externalEntries
    });

    const citation = this.citationAgent.evaluate(generatedTerms);
    const taxonomy = this.taxonomyAgent.evaluate(generatedTerms, input.beverageType);
    const duplicate = this.duplicateDetectionAgent.evaluate(generatedTerms, existingNormalizedTerms);
    const readability = this.readabilityAgent.evaluate(generatedTerms);
    const scoring = this.scoringAgent.evaluate({
      entries: generatedTerms,
      citation,
      taxonomy,
      duplicate,
      readability,
      threshold
    });

    const belowThresholdCount = scoring.evaluations.filter((entry) => entry.belowThreshold).length;
    const blockedByDuplicate = new Set(
      duplicate.evaluations
        .filter((entry) => entry.semanticDuplicate || entry.partialOverlap || entry.existingCollision)
        .map((entry) => entry.term)
    );
    const publishReadyTerms = generatedTerms.filter((term) => {
      const score = scoring.evaluations.find((item) => item.term === term.term);
      if (!score) return false;
      return score.publishReadinessScore >= threshold && !blockedByDuplicate.has(term.term);
    });
    const publishedCount = await this.memoryStore.upsertPublishedTerminologyEntries({
      batchId,
      beverageType: input.beverageType,
      entries: publishReadyTerms
    });

    const metrics: TerminologyBatchMetrics = {
      generatedCount: generatedTerms.length,
      publishedCount,
      averageConfidenceScore: scoring.averageConfidenceScore,
      averagePublishReadinessScore: scoring.averagePublishReadinessScore,
      citationSuccessRate: citation.citationSuccessRate,
      duplicateRate: duplicate.duplicateRate,
      averageScoreTrendPoint: scoring.averagePublishReadinessScore,
      duplicateReductionTrendPoint: Number((1 - duplicate.duplicateRate).toFixed(4)),
      citationSuccessTrendPoint: citation.citationSuccessRate,
      belowThresholdCount
    };

    const failurePattern: LearningFailurePattern = {
      weakDefinitionPatterns: unique(
        scoring.evaluations
          .filter((entry) => entry.belowThreshold)
          .map((entry) => `${entry.term}:low_publish_readiness`)
      ),
      duplicateStructures: unique(duplicate.duplicateStructures),
      citationFailures: unique(citation.failurePatterns),
      taxonomyMisplacements: unique(taxonomy.misplacementPatterns),
      readingLevelDrift: unique(readability.readingLevelDriftPatterns)
    };

    let improvementDeltas: ImprovementDelta = {
      promptTemplateAdjustmentsDelta: 0,
      citationPriorityDelta: 0,
      taxonomyWeightingDelta: {
        classificationWeightDelta: 0,
        crossCategoryWeightDelta: 0,
        hierarchyWeightDelta: 0
      }
    };
    let nextConstraints = constraints;

    if (belowThresholdCount > 0) {
      const adjusted = this.memoryStore.adjustGenerationConstraints(constraints, failurePattern);
      nextConstraints = adjusted.constraints;
      improvementDeltas = adjusted.delta;

      const failureRecord: TerminologyMemoryRecord = {
        batch_id: batchId,
        beverage_type: input.beverageType,
        letter: input.letter.toUpperCase(),
        batch_size: input.batchSize,
        record_type: "failure_pattern",
        weak_definition_patterns: failurePattern.weakDefinitionPatterns,
        duplicate_structures: failurePattern.duplicateStructures,
        citation_failures: failurePattern.citationFailures,
        taxonomy_misplacements: failurePattern.taxonomyMisplacements,
        reading_level_drift: failurePattern.readingLevelDrift,
        generation_constraints: nextConstraints,
        evaluation_metrics: {
          threshold,
          belowThresholdCount
        },
        improvement_deltas: improvementDeltas,
        created_at: generatedAt
      };
      await this.memoryStore.record(failureRecord);
    }

    const batchRecord: TerminologyMemoryRecord = {
      batch_id: batchId,
      beverage_type: input.beverageType,
      letter: input.letter.toUpperCase(),
      batch_size: input.batchSize,
      record_type: "batch_summary",
      weak_definition_patterns: failurePattern.weakDefinitionPatterns,
      duplicate_structures: failurePattern.duplicateStructures,
      citation_failures: failurePattern.citationFailures,
      taxonomy_misplacements: failurePattern.taxonomyMisplacements,
      reading_level_drift: failurePattern.readingLevelDrift,
      generation_constraints: nextConstraints,
      evaluation_metrics: {
        ...metrics,
        taxonomySuccessRate: taxonomy.taxonomySuccessRate,
        readabilitySuccessRate: readability.readabilitySuccessRate,
        averageGradeLevel: readability.averageGradeLevel
      },
      improvement_deltas: improvementDeltas,
      created_at: generatedAt
    };
    await this.memoryStore.record(batchRecord);

    return {
      batchId,
      generatedAt,
      generatedTerms,
      evaluationMetrics: metrics,
      improvementDeltas
    };
  }

  async getStatus(limit = 20): Promise<TerminologyStatusOutput> {
    return this.memoryStore.getStatus(limit);
  }
}
