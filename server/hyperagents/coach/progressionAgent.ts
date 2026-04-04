import type { ProgressionResult, TastingSessionInput } from "./types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, digits = 4): number {
  return Number(value.toFixed(digits));
}

function stdDev(values: number[]): number {
  if (values.length <= 1) {
    return 0;
  }
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

export class ProgressionAgent {
  analyze(session: TastingSessionInput, overallAccuracyHistory: number[]): ProgressionResult {
    const confidenceScores = session.attempts
      .map((attempt) => attempt.confidence)
      .filter((value): value is number => typeof value === "number")
      .map((value) => clamp(value / 100, 0, 1));

    const meanConfidence =
      confidenceScores.length > 0
        ? confidenceScores.reduce((sum, value) => sum + value, 0) / confidenceScores.length
        : 0;
    const standardError =
      confidenceScores.length > 1 ? stdDev(confidenceScores) / Math.sqrt(confidenceScores.length) : 0;
    const margin = 1.96 * standardError;

    let learningVelocity = 0;
    if (overallAccuracyHistory.length > 1) {
      const first = overallAccuracyHistory[0];
      const last = overallAccuracyHistory[overallAccuracyHistory.length - 1];
      learningVelocity = (last - first) / (overallAccuracyHistory.length - 1);
    } else if (overallAccuracyHistory.length === 1) {
      learningVelocity = overallAccuracyHistory[0];
    }

    const recent = overallAccuracyHistory.slice(-4);
    let plateauDetected = false;
    if (recent.length >= 4) {
      const slope = (recent[recent.length - 1] - recent[0]) / (recent.length - 1);
      plateauDetected = Math.abs(slope) < 0.015;
    }

    return {
      learningVelocity: round(learningVelocity),
      confidenceInterval: {
        mean: round(meanConfidence),
        lower: round(clamp(meanConfidence - margin, 0, 1)),
        upper: round(clamp(meanConfidence + margin, 0, 1))
      },
      plateauDetected
    };
  }
}
