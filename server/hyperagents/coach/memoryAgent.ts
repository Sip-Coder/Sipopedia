import type { SupabaseClient } from "@supabase/supabase-js";
import { createServiceSupabaseClient } from "../structure/supabaseClient";
import type {
  CoachLearningMemoryRow,
  FeedbackFormat,
  ProfileInsightsOutput,
  SessionRegionPerformance,
  TeachingStyle
} from "./types";

interface CoachLearningMemoryDbRow {
  user_id: string;
  session_id: string;
  overall_accuracy: number;
  improvement_delta: number;
  accuracy: unknown;
  descriptor_analysis: unknown;
  progression: unknown;
  strategy: TeachingStyle;
  feedback_format: FeedbackFormat;
  feedback_performance: unknown;
  region_performance: Record<string, SessionRegionPerformance>;
  raw_session: unknown;
  created_at: string;
}

function round(value: number, digits = 4): number {
  return Number(value.toFixed(digits));
}

export class MemoryAgent {
  private readonly supabase: SupabaseClient | null;

  constructor(supabaseClient: SupabaseClient | null = createServiceSupabaseClient()) {
    this.supabase = supabaseClient;
  }

  async listUserMemory(userId: string, limit = 40): Promise<CoachLearningMemoryRow[]> {
    if (!this.supabase) {
      return [];
    }

    const { data, error } = await this.supabase
      .from("coach_learning_memory")
      .select(
        "user_id, session_id, overall_accuracy, improvement_delta, accuracy, descriptor_analysis, progression, strategy, feedback_format, feedback_performance, region_performance, raw_session, created_at"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      return [];
    }

    return (data as CoachLearningMemoryDbRow[]).map((row) => ({
      userId: row.user_id,
      sessionId: row.session_id,
      overallAccuracy: row.overall_accuracy,
      improvementDelta: row.improvement_delta,
      accuracy: row.accuracy as CoachLearningMemoryRow["accuracy"],
      descriptorAnalysis: row.descriptor_analysis as CoachLearningMemoryRow["descriptorAnalysis"],
      progression: row.progression as CoachLearningMemoryRow["progression"],
      strategy: row.strategy,
      feedbackFormat: row.feedback_format,
      feedbackPerformance: row.feedback_performance as CoachLearningMemoryRow["feedbackPerformance"],
      regionPerformance: row.region_performance ?? {},
      rawSession: row.raw_session as CoachLearningMemoryRow["rawSession"],
      createdAt: row.created_at
    }));
  }

  async storeSessionMemory(row: CoachLearningMemoryRow): Promise<void> {
    if (!this.supabase) {
      return;
    }

    await this.supabase.from("coach_learning_memory").upsert(
      {
        user_id: row.userId,
        session_id: row.sessionId,
        overall_accuracy: row.overallAccuracy,
        improvement_delta: row.improvementDelta,
        accuracy: row.accuracy,
        descriptor_analysis: row.descriptorAnalysis,
        progression: row.progression,
        strategy: row.strategy,
        feedback_format: row.feedbackFormat,
        feedback_performance: row.feedbackPerformance,
        region_performance: row.regionPerformance,
        raw_session: row.rawSession
      },
      { onConflict: "user_id,session_id" }
    );
  }

  async getProfileInsights(userId: string): Promise<ProfileInsightsOutput> {
    const history = await this.listUserMemory(userId, 80);
    if (history.length === 0) {
      return {
        learningStyle: "structure-first",
        strongRegions: [],
        weakRegions: [],
        improvementVelocity: 0
      };
    }

    const styleCounts = new Map<TeachingStyle, number>();
    const regionStats = new Map<string, { attempts: number; correct: number }>();
    const oldestToNewest = [...history].reverse();

    for (const row of oldestToNewest) {
      styleCounts.set(row.strategy, (styleCounts.get(row.strategy) ?? 0) + 1);
      for (const [region, perf] of Object.entries(row.regionPerformance ?? {})) {
        const stats = regionStats.get(region) ?? { attempts: 0, correct: 0 };
        stats.attempts += perf.attempts;
        stats.correct += perf.correct;
        regionStats.set(region, stats);
      }
    }

    const learningStyle = (
      Array.from(styleCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "structure-first"
    ) as TeachingStyle;

    const regionRanking = Array.from(regionStats.entries())
      .map(([region, stats]) => ({
        region,
        accuracy: stats.attempts > 0 ? stats.correct / stats.attempts : 0,
        attempts: stats.attempts
      }))
      .filter((row) => row.attempts >= 2)
      .sort((a, b) => b.accuracy - a.accuracy);

    const strongRegions = regionRanking.slice(0, 3).map((row) => row.region);
    const weakRegions = [...regionRanking].reverse().slice(0, 3).map((row) => row.region);

    let improvementVelocity = 0;
    if (oldestToNewest.length > 1) {
      const first = oldestToNewest[0].overallAccuracy;
      const last = oldestToNewest[oldestToNewest.length - 1].overallAccuracy;
      improvementVelocity = (last - first) / (oldestToNewest.length - 1);
    } else {
      improvementVelocity = oldestToNewest[0].overallAccuracy;
    }

    return {
      learningStyle,
      strongRegions,
      weakRegions,
      improvementVelocity: round(improvementVelocity)
    };
  }
}
