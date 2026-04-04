import type {
  AccuracyTrackingResult,
  DescriptorPatternResult,
  ProgressionResult,
  TeachingStrategyResult
} from "./types";

export class TeachingStrategyAgent {
  select(
    accuracy: AccuracyTrackingResult,
    descriptors: DescriptorPatternResult,
    progression: ProgressionResult
  ): TeachingStrategyResult {
    const rationale: string[] = [];

    if (descriptors.categoryCoverage < 0.4 || descriptors.overusedDescriptorBias.length > 0) {
      rationale.push("Descriptor diversity is narrow, so sensorial vocabulary needs expansion.");
      return { instructionStyle: "sensorial-first", rationale };
    }

    const regionAccuracy = accuracy.byField.region.accuracy;
    const countryAccuracy = accuracy.byField.country.accuracy;
    const grapeAccuracy = accuracy.byField.grape.accuracy;

    if (regionAccuracy < 0.6 || countryAccuracy < 0.6) {
      rationale.push("Geographic identification is lagging and should anchor the next session.");
      return { instructionStyle: "region-first", rationale };
    }

    if (grapeAccuracy < 0.6) {
      rationale.push("Varietal recognition is underperforming relative to other dimensions.");
      return { instructionStyle: "variety-first", rationale };
    }

    if (progression.plateauDetected) {
      rationale.push("Progress trend is flattening; use a structured reset to rebuild transfer.");
      return { instructionStyle: "structure-first", rationale };
    }

    rationale.push("Current trajectory is positive; keep a balanced structural framework.");
    return { instructionStyle: "structure-first", rationale };
  }
}
