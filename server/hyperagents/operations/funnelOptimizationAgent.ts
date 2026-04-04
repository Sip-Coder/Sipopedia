import type { FunnelBottleneck, FunnelStepMetric } from "./types";

function safeDivide(numerator: number, denominator: number): number {
  if (denominator <= 0) {
    return 0;
  }
  return numerator / denominator;
}

function severityForDropoff(dropoffRate: number): "low" | "medium" | "high" {
  if (dropoffRate >= 0.45) {
    return "high";
  }
  if (dropoffRate >= 0.25) {
    return "medium";
  }
  return "low";
}

export function runFunnelOptimizationAgent(metrics: FunnelStepMetric[]): FunnelBottleneck[] {
  return metrics
    .map((step) => {
      const entered = Math.max(step.enteredUsers, 0);
      const completed = Math.max(step.completedUsers, 0);
      const completionRate = safeDivide(completed, Math.max(entered, 1));
      const dropoffRate = Number((1 - completionRate).toFixed(4));
      const avgCompletionSeconds = Math.max(step.avgCompletionSeconds, 0);
      const severity = severityForDropoff(dropoffRate);

      const recommendation =
        severity === "high"
          ? "High-friction step. Remove fields, defer payment details, and add progressive profiling."
          : severity === "medium"
            ? "Moderate friction. A/B test shorter copy and fewer interactions for this step."
            : "Healthy step. Keep monitoring for regressions.";

      return {
        stepId: step.stepId,
        stepName: step.stepName,
        dropoffRate,
        avgCompletionSeconds,
        severity,
        recommendation
      };
    })
    .sort((a, b) => b.dropoffRate - a.dropoffRate);
}
