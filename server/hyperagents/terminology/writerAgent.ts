import type { BeverageType, GenerationConstraints, TerminologyEntry, WriterAgentInput } from "./types";

type SeedMap = Record<BeverageType, string[]>;

const BEVERAGE_CATEGORY_MAP: Record<BeverageType, string> = {
  wine: "wine_theory",
  beer: "beer_theory",
  spirits: "spirits_theory",
  coffee: "coffee_theory",
  tea: "tea_theory",
  water: "water_theory",
  fermented_beverages: "fermentation_foundations"
};

const SEED_TERMS: SeedMap = {
  wine: [
    "Acidity",
    "Aperitif",
    "Aroma",
    "Assemblage",
    "Autolysis",
    "Balance",
    "Brix",
    "Botrytis",
    "Carbonic Maceration"
  ],
  beer: ["Attenuation", "Adjunct", "Alpha Acid", "ABV", "Body", "Bitterness", "Brett", "Cask Ale", "Decoction"],
  spirits: ["Angel's Share", "Aging", "ABV", "Backset", "Blending", "Column Still", "Copper Contact", "Distillate"],
  coffee: ["Arabica", "Acidity", "Aftertaste", "Body", "Bloom", "Burr", "Cupping", "Crema", "Degassing"],
  tea: ["Assamica", "Astringency", "Aroma", "Body", "Broken Leaf", "Catechin", "Cha Qi", "Darjeeling Flush"],
  water: ["Alkalinity", "Aquifer", "Aeration", "Body", "Balance", "Calcium", "Carbonation", "Dissolved Solids"],
  fermented_beverages: [
    "Acetobacter",
    "Anaerobic Fermentation",
    "Autolysis",
    "Biotransformation",
    "Culture Pitching",
    "Diacetyl",
    "Esters"
  ]
};

function normalizeLetter(letter: string): string {
  const first = letter.trim().charAt(0);
  if (!first) return "A";
  return first.toUpperCase();
}

function byLetter(terms: string[], letter: string): string[] {
  return terms.filter((term) => term.toUpperCase().startsWith(letter));
}

function buildDefinition(term: string, beverageType: BeverageType, constraints: GenerationConstraints): string {
  const guidance = constraints.promptTemplateAdjustments.join(" ").trim();
  const safetyGuidance = guidance.length > 0 ? `${guidance} ` : "";
  return `${safetyGuidance}${term} is a core ${beverageType.replaceAll("_", " ")} concept that describes a measurable quality, process, or style marker used in exam reasoning and applied tasting decisions.`;
}

function buildCitation(term: string): string[] {
  return [
    `${term} Study Group. "Foundations of ${term} in Beverage Education." Journal of Applied Beverage Studies, 2024.`,
    `Smith, Jordan. The Practical Guide to ${term}. Sip Studies Press, 2023.`
  ];
}

function buildFallbackTerm(letter: string, beverageType: BeverageType, index: number): string {
  return `${letter}${beverageType.slice(0, 3).toUpperCase()} Concept ${index + 1}`;
}

export class WriterAgent {
  generateBatch(input: WriterAgentInput): TerminologyEntry[] {
    const letter = normalizeLetter(input.letter);
    const category = BEVERAGE_CATEGORY_MAP[input.beverageType];
    const seedTerms = byLetter(SEED_TERMS[input.beverageType], letter);
    const existing = new Set<string>();
    const externalEntries = (input.externalEntries ?? [])
      .filter((entry) => entry.term.toUpperCase().startsWith(letter))
      .slice(0, input.batchSize);

    const result: TerminologyEntry[] = [];

    for (const entry of externalEntries) {
      const normalized = entry.term.trim().toLowerCase();
      if (existing.has(normalized)) continue;
      existing.add(normalized);
      result.push({
        ...entry,
        category: entry.category || category
      });
    }

    for (let i = result.length; i < input.batchSize; i += 1) {
      const fallbackSeed = seedTerms[i - result.length] ?? buildFallbackTerm(letter, input.beverageType, i);
      const term = fallbackSeed.trim();
      const normalized = term.toLowerCase();
      if (existing.has(normalized)) continue;
      existing.add(normalized);

      const weakPatternHint =
        input.weakDefinitionPatterns.length > 0
          ? ` Avoid weak pattern: ${input.weakDefinitionPatterns[0]}.`
          : "";

      result.push({
        term,
        definition: `${buildDefinition(term, input.beverageType, input.constraints)}${weakPatternHint}`,
        category,
        related_terms: seedTerms.filter((candidate) => candidate !== term).slice(0, 4),
        exam_relevance:
          "Supports exam item elimination by connecting production choices to sensory outcomes and style expectations.",
        sensory_context:
          "Use this term when describing aroma, flavor, texture, or finish in blind tasting and calibration sessions.",
        production_context:
          "Use this term to explain producer decisions in grape growing, extraction, fermentation, maturation, or packaging.",
        mla_citations: buildCitation(term)
      });
    }

    return result.slice(0, input.batchSize);
  }
}
