import { runArticlePerformanceAgent } from "./articlePerformanceAgent.ts";
import { runDashboardAgent } from "./dashboardAgent.ts";
import { runFunnelOptimizationAgent } from "./funnelOptimizationAgent.ts";
import { runPricingExperimentAgent } from "./pricingExperimentAgent.ts";
import { runSponsorFitAgent } from "./sponsorFitAgent.ts";
import { runTerminologyROIagent } from "./terminologyROIagent.ts";
import type { ContentRoiRank, OperationsEvaluationInput, OperationsEvaluationOutput } from "./types.ts";

type PersistPayload = {
  input: OperationsEvaluationInput;
  output: OperationsEvaluationOutput;
};

export type PersistLearningMemory = (payload: PersistPayload) => Promise<void>;

function buildContentRoiRankings(
  articleScores: ReturnType<typeof runArticlePerformanceAgent>,
  termScores: ReturnType<typeof runTerminologyROIagent>
): ContentRoiRank[] {
  const avgTermRoi =
    termScores.reduce((acc, item) => acc + item.roiScore, 0) / Math.max(termScores.length, 1);

  return articleScores
    .map((article) => {
      const terminologyRoiScore = Number(avgTermRoi.toFixed(4));
      const combinedRoiScore = Number(
        (article.engagementScore * 0.65 + terminologyRoiScore * 0.35).toFixed(4)
      );
      return {
        articleId: article.articleId,
        category: article.category,
        engagementScore: article.engagementScore,
        terminologyRoiScore,
        combinedRoiScore
      };
    })
    .sort((a, b) => b.combinedRoiScore - a.combinedRoiScore);
}

export function buildDefaultOperationsInput(): OperationsEvaluationInput {
  return {
    articleMetrics: [
      {
        articleId: "article-01",
        category: "membership-guides",
        readCompletionRate: 0.62,
        avgScrollDepth: 0.78,
        avgEngagementSeconds: 223
      },
      {
        articleId: "article-02",
        category: "certification-quick-tips",
        readCompletionRate: 0.71,
        avgScrollDepth: 0.81,
        avgEngagementSeconds: 244
      },
      {
        articleId: "article-03",
        category: "deep-dive-theory",
        readCompletionRate: 0.49,
        avgScrollDepth: 0.63,
        avgEngagementSeconds: 198
      }
    ],
    terminologyMetrics: [
      { term: "tannin", usageFrequency: 214, quizAppearanceFrequency: 76, searchHits: 804 },
      { term: "malo-lactic", usageFrequency: 133, quizAppearanceFrequency: 59, searchHits: 432 },
      { term: "lees", usageFrequency: 98, quizAppearanceFrequency: 33, searchHits: 276 }
    ],
    pricingMetrics: [
      { variantId: "A", priceUsd: 19, visitors: 2000, conversions: 142, retainedMembers: 112 },
      { variantId: "B", priceUsd: 24, visitors: 2100, conversions: 138, retainedMembers: 117 },
      { variantId: "C", priceUsd: 29, visitors: 1950, conversions: 101, retainedMembers: 84 }
    ],
    funnelMetrics: [
      { stepId: "visit-to-signup", stepName: "Visit -> Signup", enteredUsers: 5000, completedUsers: 1140, avgCompletionSeconds: 42 },
      { stepId: "signup-to-trial", stepName: "Signup -> Trial Start", enteredUsers: 1140, completedUsers: 706, avgCompletionSeconds: 66 },
      { stepId: "trial-to-paid", stepName: "Trial -> Paid", enteredUsers: 706, completedUsers: 238, avgCompletionSeconds: 95 }
    ],
    sponsorMetrics: [
      { sponsorId: "s-01", sponsorName: "Vine Atlas", brandAlignment: 82, educationRelevance: 91, audienceOverlap: 86 },
      { sponsorId: "s-02", sponsorName: "Cellar Lens", brandAlignment: 76, educationRelevance: 74, audienceOverlap: 79 },
      { sponsorId: "s-03", sponsorName: "Club Pour", brandAlignment: 65, educationRelevance: 54, audienceOverlap: 72 }
    ]
  };
}

export async function runOperationsOrchestrator(
  input: OperationsEvaluationInput,
  persistLearningMemory?: PersistLearningMemory
): Promise<OperationsEvaluationOutput> {
  const generatedAt = new Date().toISOString();

  const articleScores = runArticlePerformanceAgent(input.articleMetrics);
  const termScores = runTerminologyROIagent(input.terminologyMetrics);
  const contentRoiRankings = buildContentRoiRankings(articleScores, termScores);

  const pricingResult = runPricingExperimentAgent(input.pricingMetrics);
  const funnelBottlenecks = runFunnelOptimizationAgent(input.funnelMetrics);
  const sponsorFitScores = runSponsorFitAgent(input.sponsorMetrics);

  const dashboard = runDashboardAgent({
    generatedAt,
    conversionTrends: pricingResult.trends.map((item) => ({
      variantId: item.variantId,
      priceUsd: item.priceUsd,
      conversionRate: item.conversionRate,
      retentionRate: item.retentionRate
    })),
    contentRoiRankings
  });

  const output: OperationsEvaluationOutput = {
    generatedAt,
    pricingRecommendations: pricingResult.recommendations,
    contentRoiRankings,
    funnelBottleneckDetection: funnelBottlenecks,
    sponsorFitScores,
    dashboard
  };

  if (persistLearningMemory) {
    await persistLearningMemory({ input, output });
  }

  return output;
}
