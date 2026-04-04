import type { CrosslinkSuggestions, TaxonomyNode, TermInput } from "./types";

function normalizeValue(value: string): string {
  return value.trim().toLowerCase();
}

export class CrosslinkAgent {
  createCrosslinks(termInput: TermInput, graphNodes: TaxonomyNode[]): CrosslinkSuggestions {
    const relatedTerms = graphNodes
      .filter((node) => normalizeValue(node.term) !== normalizeValue(termInput.term))
      .filter((node) => {
        if (!termInput.beverageType) return true;
        return node.beverageType === termInput.beverageType;
      })
      .slice(0, 12)
      .map((node) => node.term);

    return {
      relatedTerms,
      regionLinks: termInput.regions ?? [],
      processLinks: termInput.processes ?? [],
      grapeLinks: termInput.grapes ?? [],
      ingredientLinks: termInput.ingredients ?? []
    };
  }
}
