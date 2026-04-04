import type { DescriptorPatternResult, TastingSessionInput } from "./types";

const DESCRIPTOR_CATEGORIES: Record<string, string[]> = {
  fruit: ["fruit", "berry", "cherry", "citrus", "apple", "pear", "stone", "tropical", "jammy"],
  floral: ["floral", "flower", "violet", "rose", "blossom"],
  herbal: ["herbal", "herb", "mint", "eucalyptus", "grass", "green"],
  spice: ["spice", "pepper", "clove", "cinnamon", "anise"],
  earth: ["earth", "forest", "mushroom", "truffle", "soil", "leather"],
  oak: ["oak", "vanilla", "toast", "cedar", "smoke"],
  mineral: ["mineral", "saline", "chalk", "flint", "stone"],
  structure: ["acid", "acidity", "tannin", "body", "alcohol", "sweet", "finish"]
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function round(value: number, digits = 4): number {
  return Number(value.toFixed(digits));
}

export class DescriptorPatternAgent {
  analyze(session: TastingSessionInput): DescriptorPatternResult {
    const descriptorUsageCounts: Record<string, number> = {};
    const categoryHits = new Set<string>();
    let totalDescriptors = 0;

    for (const attempt of session.attempts) {
      for (const rawDescriptor of attempt.descriptors ?? []) {
        const descriptor = normalize(rawDescriptor);
        if (!descriptor) {
          continue;
        }
        totalDescriptors += 1;
        descriptorUsageCounts[descriptor] = (descriptorUsageCounts[descriptor] ?? 0) + 1;

        for (const [category, keywords] of Object.entries(DESCRIPTOR_CATEGORIES)) {
          if (keywords.some((keyword) => descriptor.includes(keyword) || keyword.includes(descriptor))) {
            categoryHits.add(category);
          }
        }
      }
    }

    const missingDescriptorCategories = Object.keys(DESCRIPTOR_CATEGORIES).filter(
      (category) => !categoryHits.has(category)
    );

    const overusedDescriptorBias = Object.entries(descriptorUsageCounts)
      .map(([descriptor, count]) => ({
        descriptor,
        count,
        share: totalDescriptors > 0 ? count / totalDescriptors : 0
      }))
      .filter((entry) => entry.count >= 3 && entry.share >= 0.28)
      .sort((a, b) => b.share - a.share)
      .map((entry) => ({ ...entry, share: round(entry.share) }));

    const categoryCoverage =
      Object.keys(DESCRIPTOR_CATEGORIES).length > 0
        ? categoryHits.size / Object.keys(DESCRIPTOR_CATEGORIES).length
        : 0;

    return {
      descriptorUsageCounts,
      missingDescriptorCategories,
      overusedDescriptorBias,
      categoryCoverage: round(categoryCoverage)
    };
  }
}
