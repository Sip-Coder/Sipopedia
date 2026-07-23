import type { TerminologyMetric } from "./types.ts";

export type TerminologyRoiScore = {
  term: string;
  usageFrequency: number;
  quizAppearanceFrequency: number;
  searchHits: number;
  roiScore: number;
};

function safeLog(value: number): number {
  return Math.log10(Math.max(value, 0) + 1);
}

export function runTerminologyROIagent(metrics: TerminologyMetric[]): TerminologyRoiScore[] {
  return metrics.map((metric) => {
    const usage = Math.max(metric.usageFrequency, 0);
    const quizAppearance = Math.max(metric.quizAppearanceFrequency, 0);
    const searchHits = Math.max(metric.searchHits, 0);

    const roiScore = Number(
      (
        safeLog(usage) * 0.45 +
        safeLog(quizAppearance) * 0.3 +
        safeLog(searchHits) * 0.25
      ).toFixed(4)
    );

    return {
      term: metric.term,
      usageFrequency: usage,
      quizAppearanceFrequency: quizAppearance,
      searchHits,
      roiScore
    };
  });
}
