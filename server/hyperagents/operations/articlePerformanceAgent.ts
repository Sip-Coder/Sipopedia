import type { ArticleMetric } from "./types";

export type ArticlePerformanceScore = {
  articleId: string;
  category: string;
  engagementScore: number;
  readCompletionRate: number;
  avgScrollDepth: number;
  avgEngagementSeconds: number;
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

export function runArticlePerformanceAgent(metrics: ArticleMetric[]): ArticlePerformanceScore[] {
  return metrics.map((metric) => {
    const readCompletion = clamp01(metric.readCompletionRate);
    const scrollDepth = clamp01(metric.avgScrollDepth);
    const engagementDuration = Math.max(metric.avgEngagementSeconds, 0);
    const normalizedDuration = clamp01(engagementDuration / 600);

    const engagementScore = Number(
      (
        readCompletion * 0.4 +
        scrollDepth * 0.35 +
        normalizedDuration * 0.25
      ).toFixed(4)
    );

    return {
      articleId: metric.articleId,
      category: metric.category,
      engagementScore,
      readCompletionRate: readCompletion,
      avgScrollDepth: scrollDepth,
      avgEngagementSeconds: engagementDuration
    };
  });
}
