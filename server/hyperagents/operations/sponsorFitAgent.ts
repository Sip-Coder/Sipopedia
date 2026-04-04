import type { SponsorProfileMetric } from "./types";

function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 100) {
    return 100;
  }
  return value;
}

export function runSponsorFitAgent(metrics: SponsorProfileMetric[]): Array<{
  sponsorId: string;
  sponsorName: string;
  fitScore: number;
}> {
  return metrics
    .map((sponsor) => {
      const brandAlignment = clampScore(sponsor.brandAlignment);
      const educationRelevance = clampScore(sponsor.educationRelevance);
      const audienceOverlap = clampScore(sponsor.audienceOverlap);

      const fitScore = Number(
        (
          brandAlignment * 0.4 +
          educationRelevance * 0.35 +
          audienceOverlap * 0.25
        ).toFixed(2)
      );

      return {
        sponsorId: sponsor.sponsorId,
        sponsorName: sponsor.sponsorName,
        fitScore
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore);
}
