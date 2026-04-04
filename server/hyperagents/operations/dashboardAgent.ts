import type { ContentRoiRank, DashboardPayload, MembershipConversionTrend } from "./types";

type DashboardInput = {
  generatedAt: string;
  conversionTrends: MembershipConversionTrend[];
  contentRoiRankings: ContentRoiRank[];
};

export function runDashboardAgent(input: DashboardInput): DashboardPayload {
  const categoryMap = new Map<string, { total: number; count: number }>();
  for (const row of input.contentRoiRankings) {
    const current = categoryMap.get(row.category) ?? { total: 0, count: 0 };
    current.total += row.combinedRoiScore;
    current.count += 1;
    categoryMap.set(row.category, current);
  }

  const topPerformingContentCategories = Array.from(categoryMap.entries())
    .map(([category, values]) => ({
      category,
      avgRoiScore: Number((values.total / Math.max(values.count, 1)).toFixed(4))
    }))
    .sort((a, b) => b.avgRoiScore - a.avgRoiScore)
    .slice(0, 5);

  const engagementScoreIndex = Number(
    (
      input.contentRoiRankings.reduce((acc, row) => acc + row.engagementScore, 0) /
      Math.max(input.contentRoiRankings.length, 1)
    ).toFixed(4)
  );

  return {
    generatedAt: input.generatedAt,
    membershipConversionTrends: input.conversionTrends,
    topPerformingContentCategories,
    engagementScoreIndex
  };
}
