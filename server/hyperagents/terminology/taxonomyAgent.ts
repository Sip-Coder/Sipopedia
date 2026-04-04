import type { BeverageType, TaxonomyBatchResult, TaxonomyEvaluation, TerminologyEntry } from "./types";

const CATEGORY_TREE: Record<BeverageType, string[]> = {
  wine: ["wine_theory", "viticulture", "vinification", "sensory_analysis"],
  beer: ["beer_theory", "brewing", "sensory_analysis", "service"],
  spirits: ["spirits_theory", "distillation", "maturation", "sensory_analysis"],
  coffee: ["coffee_theory", "processing", "brewing", "sensory_analysis"],
  tea: ["tea_theory", "processing", "service", "sensory_analysis"],
  water: ["water_theory", "source", "composition", "service"],
  fermented_beverages: ["fermentation_foundations", "microbiology", "processing", "sensory_analysis"]
};

function detectCrossCategoryLinking(entry: TerminologyEntry): number {
  const hasMultiDomainContext =
    entry.production_context.toLowerCase().includes("fermentation") &&
    entry.sensory_context.toLowerCase().includes("tasting");
  const hasEnoughRelated = entry.related_terms.length >= 2;
  return hasMultiDomainContext && hasEnoughRelated ? 0.9 : hasEnoughRelated ? 0.76 : 0.58;
}

export class TaxonomyAgent {
  evaluate(entries: TerminologyEntry[], beverageType: BeverageType): TaxonomyBatchResult {
    const allowedCategories = CATEGORY_TREE[beverageType];

    const evaluations: TaxonomyEvaluation[] = entries.map((entry) => {
      const classificationValid = allowedCategories.includes(entry.category);
      const hierarchyPlacementValid =
        classificationValid &&
        entry.exam_relevance.toLowerCase().includes("exam") &&
        entry.production_context.trim().length > 20;
      const crossCategoryLinkingScore = detectCrossCategoryLinking(entry);
      const issues: string[] = [];

      if (!classificationValid) {
        issues.push("taxonomy_category_mismatch");
      }
      if (!hierarchyPlacementValid) {
        issues.push("taxonomy_hierarchy_misplacement");
      }
      if (crossCategoryLinkingScore < 0.7) {
        issues.push("taxonomy_crosslinking_weak");
      }

      return {
        term: entry.term,
        classificationValid,
        crossCategoryLinkingScore,
        hierarchyPlacementValid,
        issues
      };
    });

    const taxonomySuccessRate =
      evaluations.filter((entry) => entry.issues.length === 0).length / Math.max(evaluations.length, 1);
    const misplacementPatterns = evaluations.flatMap((entry) => entry.issues);

    return {
      evaluations,
      taxonomySuccessRate: Number(taxonomySuccessRate.toFixed(4)),
      misplacementPatterns: Array.from(new Set(misplacementPatterns))
    };
  }
}

