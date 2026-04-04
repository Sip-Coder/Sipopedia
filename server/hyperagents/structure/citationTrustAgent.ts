import type { CitationInput, CitationTrustScore, SourceType } from "./types";

const BASE_TRUST_BY_SOURCE: Record<SourceType, number> = {
  primary_academic: 96,
  peer_reviewed_journal: 93,
  industry_certification_body: 88,
  trade_organization: 82,
  book: 76,
  other: 52
};

function getTier(score: number): "high" | "medium" | "low" {
  if (score >= 85) return "high";
  if (score >= 65) return "medium";
  return "low";
}

export class CitationTrustAgent {
  scoreCitation(citation: CitationInput): CitationTrustScore {
    const sourceType = citation.sourceType ?? "other";
    let score = BASE_TRUST_BY_SOURCE[sourceType];
    const penalties: string[] = [];

    if (!citation.author) {
      score -= 6;
      penalties.push("missing author");
    }
    if (!citation.year) {
      score -= 4;
      penalties.push("missing publication year");
    }
    if (!citation.publisher) {
      score -= 3;
      penalties.push("missing publisher");
    }
    if (!citation.url) {
      score -= 2;
      penalties.push("missing URL");
    }

    score = Math.max(0, Math.min(100, score));
    const reason = penalties.length > 0 ? penalties.join(", ") : "complete citation metadata";

    return {
      citation,
      score,
      trustTier: getTier(score),
      reason
    };
  }

  scoreCitations(citations: CitationInput[] = []): {
    averageScore: number;
    scoredCitations: CitationTrustScore[];
  } {
    const scoredCitations = citations.map((citation) => this.scoreCitation(citation));
    if (scoredCitations.length === 0) {
      return { averageScore: 0, scoredCitations: [] };
    }
    const averageScore =
      scoredCitations.reduce((sum, item) => sum + item.score, 0) / scoredCitations.length;
    return { averageScore: Number(averageScore.toFixed(2)), scoredCitations };
  }
}
