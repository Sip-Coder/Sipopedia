import type { PricingRecommendation, PricingVariantMetric } from "./types";

export type PricingExperimentResult = {
  recommendations: PricingRecommendation[];
  trends: Array<{
    variantId: string;
    priceUsd: number;
    conversionRate: number;
    retentionRate: number;
    revenuePerVisitor: number;
  }>;
};

function safeDivide(numerator: number, denominator: number): number {
  if (denominator <= 0) {
    return 0;
  }
  return numerator / denominator;
}

export function runPricingExperimentAgent(metrics: PricingVariantMetric[]): PricingExperimentResult {
  const trends = metrics.map((metric) => {
    const visitors = Math.max(metric.visitors, 0);
    const conversions = Math.max(metric.conversions, 0);
    const retainedMembers = Math.max(metric.retainedMembers, 0);
    const conversionRate = safeDivide(conversions, visitors);
    const retentionRate = safeDivide(retainedMembers, Math.max(conversions, 1));
    const revenuePerVisitor = conversionRate * retentionRate * Math.max(metric.priceUsd, 0);

    return {
      variantId: metric.variantId,
      priceUsd: metric.priceUsd,
      conversionRate: Number(conversionRate.toFixed(6)),
      retentionRate: Number(retentionRate.toFixed(6)),
      revenuePerVisitor: Number(revenuePerVisitor.toFixed(6))
    };
  });

  const sorted = [...trends].sort((a, b) => b.revenuePerVisitor - a.revenuePerVisitor);
  const winner = sorted[0];
  const runnerUp = sorted[1];

  const expectedLift = winner && runnerUp
    ? Number((((winner.revenuePerVisitor - runnerUp.revenuePerVisitor) / Math.max(runnerUp.revenuePerVisitor, 0.000001)) * 100).toFixed(2))
    : 0;

  const recommendations: PricingRecommendation[] = winner
    ? [
        {
          recommendedPriceUsd: winner.priceUsd,
          winningVariantId: winner.variantId,
          expectedLiftPercent: expectedLift,
          rationale: `Variant ${winner.variantId} maximizes conversion-retention adjusted revenue per visitor.`
        }
      ]
    : [];

  return { recommendations, trends };
}
