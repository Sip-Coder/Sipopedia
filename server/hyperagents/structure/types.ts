export type BeverageType =
  | "wine"
  | "beer"
  | "spirits"
  | "coffee"
  | "tea"
  | "water"
  | "fermented_beverages";

export type SourceType =
  | "primary_academic"
  | "industry_certification_body"
  | "trade_organization"
  | "peer_reviewed_journal"
  | "book"
  | "other";

export interface CitationInput {
  title: string;
  author?: string;
  publisher?: string;
  year?: number;
  url?: string;
  sourceType?: SourceType;
}

export interface CitationTrustScore {
  citation: CitationInput;
  score: number;
  trustTier: "high" | "medium" | "low";
  reason: string;
}

export interface TermInput {
  term: string;
  beverageType?: BeverageType;
  parentTerm?: string;
  aliases?: string[];
  regions?: string[];
  processes?: string[];
  grapes?: string[];
  ingredients?: string[];
  citations?: CitationInput[];
}

export interface TaxonomyNode {
  nodeKey: string;
  term: string;
  parentNodeKey: string | null;
  beverageType: BeverageType;
  level: number;
  aliases: string[];
  metadata: Record<string, unknown>;
}

export interface CorrectionIssue {
  type: "taxonomy_conflict" | "duplicate_node" | "misplaced_term";
  severity: "high" | "medium" | "low";
  message: string;
}

export interface CrosslinkSuggestions {
  relatedTerms: string[];
  regionLinks: string[];
  processLinks: string[];
  grapeLinks: string[];
  ingredientLinks: string[];
}

export interface ValidateTermOutput {
  correctedTaxonomyPlacement: {
    nodeKey: string;
    parentNodeKey: string | null;
    beverageType: BeverageType;
  };
  citationTrustScore: {
    averageScore: number;
    scoredCitations: CitationTrustScore[];
  };
  crosslinkSuggestions: CrosslinkSuggestions;
  mlaCitations: string[];
  correctionIssues: CorrectionIssue[];
}
