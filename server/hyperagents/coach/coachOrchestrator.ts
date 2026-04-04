import { AccuracyTrackingAgent } from "./accuracyTrackingAgent";
import { DescriptorPatternAgent } from "./descriptorPatternAgent";
import { FeedbackOptimizationAgent } from "./feedbackOptimizationAgent";
import { MemoryAgent } from "./memoryAgent";
import { ProgressionAgent } from "./progressionAgent";
import { TeachingStrategyAgent } from "./teachingStrategyAgent";
import type {
  AccuracyField,
  AnalyzeSessionOutput,
  CoachLearningMemoryRow,
  ProfileInsightsOutput,
  SessionRegionPerformance,
  TastingSessionInput
} from "./types";

function normalize(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function buildRegionPerformance(session: TastingSessionInput): Record<string, SessionRegionPerformance> {
  const regionStats = new Map<string, { attempts: number; correct: number }>();

  for (const attempt of session.attempts) {
    const actualRegion = normalize(attempt.actual.region);
    if (!actualRegion) {
      continue;
    }
    const current = regionStats.get(actualRegion) ?? { attempts: 0, correct: 0 };
    current.attempts += 1;
    if (normalize(attempt.guess.region) === actualRegion) {
      current.correct += 1;
    }
    regionStats.set(actualRegion, current);
  }

  const regionPerformance: Record<string, SessionRegionPerformance> = {};
  for (const [region, stats] of regionStats.entries()) {
    regionPerformance[region] = {
      attempts: stats.attempts,
      correct: stats.correct,
      accuracy: stats.attempts > 0 ? Number((stats.correct / stats.attempts).toFixed(4)) : 0
    };
  }
  return regionPerformance;
}

export class CoachOrchestrator {
  private readonly accuracyTrackingAgent = new AccuracyTrackingAgent();
  private readonly descriptorPatternAgent = new DescriptorPatternAgent();
  private readonly teachingStrategyAgent = new TeachingStrategyAgent();
  private readonly progressionAgent = new ProgressionAgent();
  private readonly feedbackOptimizationAgent = new FeedbackOptimizationAgent();
  private readonly memoryAgent: MemoryAgent;

  constructor(memoryAgent = new MemoryAgent()) {
    this.memoryAgent = memoryAgent;
  }

  async analyzeSession(session: TastingSessionInput): Promise<AnalyzeSessionOutput> {
    const history = await this.memoryAgent.listUserMemory(session.userId, 50);
    const latest = history[0];
    const baselineByField = latest?.accuracy?.byField
      ? (Object.fromEntries(
          Object.entries(latest.accuracy.byField).map(([field, value]) => [field, value.accuracy])
        ) as Partial<Record<AccuracyField, number>>)
      : undefined;

    const accuracy = this.accuracyTrackingAgent.analyze(
      session,
      baselineByField,
      latest?.overallAccuracy ?? 0
    );
    const descriptors = this.descriptorPatternAgent.analyze(session);

    const overallHistory = [...history]
      .reverse()
      .map((row) => row.overallAccuracy)
      .concat(accuracy.overallAccuracy);
    const progression = this.progressionAgent.analyze(session, overallHistory);
    const teachingStrategy = this.teachingStrategyAgent.select(accuracy, descriptors, progression);

    const feedbackOptimization = this.feedbackOptimizationAgent.select(
      history.map((row) => ({
        feedbackFormat: row.feedbackFormat,
        improvementDelta: row.improvementDelta
      })),
      session.feedbackFormatUsed,
      accuracy.overallDelta
    );

    const regionPerformance = buildRegionPerformance(session);

    const memoryRow: CoachLearningMemoryRow = {
      userId: session.userId,
      sessionId: session.sessionId,
      overallAccuracy: accuracy.overallAccuracy,
      improvementDelta: accuracy.overallDelta,
      accuracy,
      descriptorAnalysis: descriptors,
      progression,
      strategy: teachingStrategy.instructionStyle,
      feedbackFormat: feedbackOptimization.selectedFormat,
      feedbackPerformance: feedbackOptimization.formatPerformance,
      regionPerformance,
      rawSession: session
    };

    await this.memoryAgent.storeSessionMemory(memoryRow);

    return {
      accuracyDeltas: {
        grape: accuracy.byField.grape.delta,
        country: accuracy.byField.country.delta,
        region: accuracy.byField.region.delta,
        vintage: accuracy.byField.vintage.delta
      },
      coachingAdjustmentStrategy: {
        instructionStyle: teachingStrategy.instructionStyle,
        rationale: teachingStrategy.rationale
      },
      nextSessionTeachingFormat: feedbackOptimization.selectedFormat,
      progression
    };
  }

  async getProfileInsights(userId: string): Promise<ProfileInsightsOutput> {
    return this.memoryAgent.getProfileInsights(userId);
  }
}
