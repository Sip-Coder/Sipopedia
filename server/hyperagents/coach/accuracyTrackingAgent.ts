import type { AccuracyByField, AccuracyField, AccuracyTrackingResult, TastingSessionInput } from "./types";

const TRACKED_FIELDS: AccuracyField[] = ["grape", "country", "region", "vintage"];

function normalize(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function round(value: number, digits = 4): number {
  return Number(value.toFixed(digits));
}

export class AccuracyTrackingAgent {
  analyze(
    session: TastingSessionInput,
    baseline?: Partial<Record<AccuracyField, number>>,
    baselineOverall = 0
  ): AccuracyTrackingResult {
    const byField = {} as AccuracyByField;

    for (const field of TRACKED_FIELDS) {
      let correct = 0;
      let total = 0;
      for (const attempt of session.attempts) {
        const actual = normalize(attempt.actual[field]);
        if (!actual) {
          continue;
        }
        total += 1;
        const guess = normalize(attempt.guess[field]);
        if (guess && guess === actual) {
          correct += 1;
        }
      }

      const accuracy = total > 0 ? correct / total : 0;
      const previous = baseline?.[field] ?? 0;
      byField[field] = {
        correct,
        total,
        accuracy: round(accuracy),
        delta: round(accuracy - previous)
      };
    }

    const overallAccuracy =
      TRACKED_FIELDS.reduce((sum, field) => sum + byField[field].accuracy, 0) / TRACKED_FIELDS.length;

    return {
      byField,
      overallAccuracy: round(overallAccuracy),
      overallDelta: round(overallAccuracy - baselineOverall)
    };
  }
}
