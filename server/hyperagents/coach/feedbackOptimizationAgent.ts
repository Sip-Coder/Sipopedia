import type { FeedbackFormat, FeedbackOptimizationResult } from "./types";

const FEEDBACK_FORMATS: FeedbackFormat[] = [
  "short feedback",
  "long feedback",
  "comparative feedback",
  "anchor-based feedback"
];

function round(value: number, digits = 4): number {
  return Number(value.toFixed(digits));
}

interface HistoricalFormatDatum {
  feedbackFormat: FeedbackFormat;
  improvementDelta: number;
}

export class FeedbackOptimizationAgent {
  select(
    history: HistoricalFormatDatum[],
    currentSessionFormat: FeedbackFormat | undefined,
    currentImprovementDelta: number
  ): FeedbackOptimizationResult {
    const aggregate = new Map<FeedbackFormat, { sum: number; samples: number }>();
    for (const format of FEEDBACK_FORMATS) {
      aggregate.set(format, { sum: 0, samples: 0 });
    }

    for (const row of history) {
      const stats = aggregate.get(row.feedbackFormat);
      if (!stats) {
        continue;
      }
      stats.sum += row.improvementDelta;
      stats.samples += 1;
    }

    if (currentSessionFormat) {
      const currentStats = aggregate.get(currentSessionFormat);
      if (currentStats) {
        currentStats.sum += currentImprovementDelta;
        currentStats.samples += 1;
      }
    }

    const formatPerformance = {} as Record<FeedbackFormat, { avgDelta: number; samples: number }>;
    for (const format of FEEDBACK_FORMATS) {
      const stats = aggregate.get(format)!;
      formatPerformance[format] = {
        avgDelta: stats.samples > 0 ? round(stats.sum / stats.samples) : 0,
        samples: stats.samples
      };
    }

    // Keep exploring under-tested formats before exploiting.
    const underSampled = FEEDBACK_FORMATS.find((format) => formatPerformance[format].samples < 2);
    if (underSampled) {
      return { selectedFormat: underSampled, formatPerformance };
    }

    const selectedFormat = FEEDBACK_FORMATS.reduce((best, current) => {
      const bestPerf = formatPerformance[best];
      const currentPerf = formatPerformance[current];
      if (currentPerf.avgDelta > bestPerf.avgDelta) {
        return current;
      }
      return best;
    }, FEEDBACK_FORMATS[0]);

    return { selectedFormat, formatPerformance };
  }
}
