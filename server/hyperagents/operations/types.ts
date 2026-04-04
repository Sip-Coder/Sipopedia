export type ArticleMetric = {
  articleId: string;
  category: string;
  readCompletionRate: number;
  avgScrollDepth: number;
  avgEngagementSeconds: number;
};

export type TerminologyMetric = {
  term: string;
  usageFrequency: number;
  quizAppearanceFrequency: number;
  searchHits: number;
};

export type PricingVariantMetric = {
  variantId: string;
  priceUsd: number;
  visitors: number;
  conversions: number;
  retainedMembers: number;
};

export type FunnelStepMetric = {
  stepId: string;
  stepName: string;
  enteredUsers: number;
  completedUsers: number;
  avgCompletionSeconds: number;
};

export type SponsorProfileMetric = {
  sponsorId: string;
  sponsorName: string;
  brandAlignment: number;
  educationRelevance: number;
  audienceOverlap: number;
};

export type PricingRecommendation = {
  recommendedPriceUsd: number;
  rationale: string;
  winningVariantId: string;
  expectedLiftPercent: number;
};

export type ContentRoiRank = {
  articleId: string;
  category: string;
  engagementScore: number;
  terminologyRoiScore: number;
  combinedRoiScore: number;
};

export type FunnelBottleneck = {
  stepId: string;
  stepName: string;
  dropoffRate: number;
  avgCompletionSeconds: number;
  severity: "low" | "medium" | "high";
  recommendation: string;
};

export type MembershipConversionTrend = {
  variantId: string;
  priceUsd: number;
  conversionRate: number;
  retentionRate: number;
};

export type DashboardPayload = {
  generatedAt: string;
  membershipConversionTrends: MembershipConversionTrend[];
  topPerformingContentCategories: Array<{
    category: string;
    avgRoiScore: number;
  }>;
  engagementScoreIndex: number;
};

export type OperationsEvaluationInput = {
  articleMetrics: ArticleMetric[];
  terminologyMetrics: TerminologyMetric[];
  pricingMetrics: PricingVariantMetric[];
  funnelMetrics: FunnelStepMetric[];
  sponsorMetrics: SponsorProfileMetric[];
};

export type OperationsEvaluationOutput = {
  generatedAt: string;
  pricingRecommendations: PricingRecommendation[];
  contentRoiRankings: ContentRoiRank[];
  funnelBottleneckDetection: FunnelBottleneck[];
  sponsorFitScores: Array<{
    sponsorId: string;
    sponsorName: string;
    fitScore: number;
  }>;
  dashboard: DashboardPayload;
};
