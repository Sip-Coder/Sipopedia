export type AccuracyField = "grape" | "country" | "region" | "vintage";

export type TeachingStyle =
  | "structure-first"
  | "region-first"
  | "variety-first"
  | "sensorial-first";

export type FeedbackFormat =
  | "short feedback"
  | "long feedback"
  | "comparative feedback"
  | "anchor-based feedback";

export interface TastingAttempt {
  actual: {
    grape?: string;
    country?: string;
    region?: string;
    vintage?: string;
  };
  guess: {
    grape?: string;
    country?: string;
    region?: string;
    vintage?: string;
  };
  descriptors?: string[];
  confidence?: number;
}

export interface TastingSessionInput {
  userId: string;
  sessionId: string;
  completedAt?: string;
  feedbackFormatUsed?: FeedbackFormat;
  attempts: TastingAttempt[];
}

export interface FieldAccuracy {
  correct: number;
  total: number;
  accuracy: number;
  delta: number;
}

export type AccuracyByField = Record<AccuracyField, FieldAccuracy>;

export interface AccuracyTrackingResult {
  byField: AccuracyByField;
  overallAccuracy: number;
  overallDelta: number;
}

export interface DescriptorPatternResult {
  descriptorUsageCounts: Record<string, number>;
  missingDescriptorCategories: string[];
  overusedDescriptorBias: Array<{
    descriptor: string;
    count: number;
    share: number;
  }>;
  categoryCoverage: number;
}

export interface ProgressionResult {
  learningVelocity: number;
  confidenceInterval: {
    mean: number;
    lower: number;
    upper: number;
  };
  plateauDetected: boolean;
}

export interface TeachingStrategyResult {
  instructionStyle: TeachingStyle;
  rationale: string[];
}

export interface FeedbackOptimizationResult {
  selectedFormat: FeedbackFormat;
  formatPerformance: Record<FeedbackFormat, { avgDelta: number; samples: number }>;
}

export interface SessionRegionPerformance {
  attempts: number;
  correct: number;
  accuracy: number;
}

export interface CoachLearningMemoryRow {
  userId: string;
  sessionId: string;
  overallAccuracy: number;
  improvementDelta: number;
  accuracy: AccuracyTrackingResult;
  descriptorAnalysis: DescriptorPatternResult;
  progression: ProgressionResult;
  strategy: TeachingStyle;
  feedbackFormat: FeedbackFormat;
  feedbackPerformance: Record<FeedbackFormat, { avgDelta: number; samples: number }>;
  regionPerformance: Record<string, SessionRegionPerformance>;
  rawSession: TastingSessionInput;
  createdAt?: string;
}

export interface AnalyzeSessionOutput {
  accuracyDeltas: Record<AccuracyField, number>;
  coachingAdjustmentStrategy: {
    instructionStyle: TeachingStyle;
    rationale: string[];
  };
  nextSessionTeachingFormat: FeedbackFormat;
  progression: ProgressionResult;
}

export interface ProfileInsightsOutput {
  learningStyle: TeachingStyle;
  strongRegions: string[];
  weakRegions: string[];
  improvementVelocity: number;
}
