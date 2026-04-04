export const BANNED_SOURCE_PATTERNS = [
  "wikipedia.org",
  "wiktionary.org",
  "britannica.com",
  "dictionary.com",
  "merriam-webster.com",
  "collinsdictionary.com",
  "vocabulary.com",
  "wordnik.com",
  "oxfordlearnersdictionaries.com",
  "cambridge.org/dictionary",
  "investopedia.com"
];

export const SOURCE_CATALOG = {
  wine: [
    "https://www.ttb.gov/wine",
    "https://www.oiv.int/what-we-do/standardisation-and-technical-documents",
    "https://www.wsetglobal.com/knowledge-centre/",
    "https://www.wsetglobal.com/knowledge-centre/blog/",
    "https://wineinstitute.org/our-industry/winemaking/",
    "https://www.awri.com.au/industry_support/winemaking_resources/"
  ],
  beer: [
    "https://www.ttb.gov/beer",
    "https://www.brewersassociation.org/educational-publications/",
    "https://www.asbcnet.org/Methods/Pages/default.aspx",
    "https://www.craftbeer.com/beer/beer-styles",
    "https://www.brewersassociation.org/statistics-and-data/"
  ],
  spirits: [
    "https://www.ttb.gov/distilled-spirits",
    "https://www.distilledspirits.org/",
    "https://www.scotch-whisky.org.uk/",
    "https://www.scotch-whisky.org.uk/discover-scotch/",
    "https://www.ttb.gov/distilled-spirits/beverage-distilled-spirits"
  ],
  coffee: [
    "https://sca.coffee/research",
    "https://worldcoffeeresearch.org/",
    "https://www.wcr.org/research",
    "https://sca.coffee/research/protocols-best-practices",
    "https://www.coffeeinstitute.org/"
  ],
  tea: [
    "https://www.teausa.com/tea-council-of-the-usa/",
    "https://www.worldteanews.com/",
    "https://www.iso.org/committee/6204776.html",
    "https://www.teausa.com/tea-fact-sheets/",
    "https://www.worldteanews.com/tea-101"
  ],
  water: [
    "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/drinking-water",
    "https://www.epa.gov/ground-water-and-drinking-water",
    "https://www.ibwa.org/",
    "https://www.epa.gov/sdwa",
    "https://www.wqa.org/learn-about-water"
  ],
  sake: [
    "https://www.japansake.or.jp/sake/en/",
    "https://www.sake-world.com/en/learn/",
    "https://www.maff.go.jp/e/",
    "https://www.jetro.go.jp/en/mjcompany/food/sake/",
    "https://sakeassociation.org/"
  ],
  kombucha: [
    "https://www.kombuchabrewers.org/education-resources/",
    "https://www.kombuchabrewers.org/",
    "https://www.kombuchabrewers.org/education-resources/faq/",
    "https://www.kombuchabrewers.org/education-resources/category/toolkit/"
  ],
  juice: [
    "https://www.ifruitjuice.com/",
    "https://www.ifruitjuice.com/technical-resources/",
    "https://www.usda.gov/topics/food-and-nutrition",
    "https://www.ifruitjuice.com/ifu-methods/",
    "https://www.ifruitjuice.com/science-and-technology/"
  ],
  milk: [
    "https://www.idfa.org/",
    "https://www.idfa.org/resources",
    "https://www.fao.org/dairy-production-products/en/",
    "https://www.fao.org/dairy-production-products/products/en/",
    "https://www.idfa.org/industry-resources"
  ],
  "energy-drinks": [
    "https://ods.od.nih.gov/factsheets/list-all/",
    "https://www.efsa.europa.eu/en/topics/topic/food-supplements",
    "https://ods.od.nih.gov/",
    "https://ods.od.nih.gov/factsheets/Caffeine-HealthProfessional/",
    "https://www.fda.gov/food/dietary-supplements"
  ],
  other: [
    "https://www.fao.org/food-processing/en/",
    "https://www.epa.gov/ground-water-and-drinking-water",
    "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/drinking-water",
    "https://www.fao.org/fao-who-codexalimentarius/codex-texts/list-standards/en/",
    "https://www.iso.org/ics/67.160/x/"
  ]
};

export const REQUIRED_FIELDS = [
  "term",
  "updated_at",
  "meaning",
  "how_to_apply",
  "examples",
  "source_authors",
  "infographic_url",
  "reference_links",
  "mla_citations",
  "editorial_policy"
];

export function isBannedSource(url) {
  const normalized = String(url || "").toLowerCase();
  return BANNED_SOURCE_PATTERNS.some((fragment) => normalized.includes(fragment));
}

export function sourceDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
