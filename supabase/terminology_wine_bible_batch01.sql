-- Sipopedia batch 01: The Wine Bible (Karen MacNeil).
-- Policy: all entries below are original editorial drafts (no verbatim excerpts).

with source_meta as (
  select
    'The Wine Bible (3rd Edition)'::text as source_title,
    array['Karen MacNeil']::text[] as source_authors,
    array[
      'https://www.karenmacneil.com/product/the-wine-bible',
      'https://www.amazon.com/s?k=9781523510092',
      'https://www.barnesandnoble.com/w/the-wine-bible-3rd-edition-karen-macneil/1140785847'
    ]::text[] as purchase_links,
    array[
      'https://www.karenmacneil.com/product/the-wine-bible',
      'https://www.hachettebookgroup.com/titles/karen-macneil/the-wine-bible-3rd-edition/9781523510092/'
    ]::text[] as reference_links,
    array[
      'MacNeil, Karen. The Wine Bible. 3rd ed., Workman Publishing, 2022.',
      'MacNeil, Karen. The Wine Bible. 3rd ed., Workman Publishing, 2022. Author page: https://www.karenmacneil.com/product/the-wine-bible. Accessed 28 Feb. 2026.'
    ]::text[] as mla_citations
),
seed_rows as (
  select *
  from (
    values
      (
        'Acidity',
        'The fresh, mouthwatering quality that gives wine energy and shape on the palate.',
        'Use acidity to judge structure and pairing range, especially with rich or fatty foods.',
        array['A high-acid white can feel crisp and lifted.', 'Acidity can make fruit flavors feel brighter.']::text[],
        array['Compare cool-climate and warm-climate examples side by side.', 'Note how acidity changes your finish perception.']::text[]
      ),
      (
        'Alcohol',
        'The warmth and weight in wine created during fermentation when yeast converts sugar into alcohol.',
        'Evaluate whether alcohol supports flavor concentration or feels hot and out of balance.',
        array['Higher alcohol can increase body and warmth.', 'Balanced alcohol should not dominate aroma or finish.']::text[],
        array['Assess alcohol alongside acidity and tannin.', 'Track alcohol perception at different serving temperatures.']::text[]
      ),
      (
        'Aroma',
        'The scents perceived in a wine, including fruit, floral, herbal, spice, and earth notes.',
        'Build aroma vocabulary first, then connect aromas to grape, climate, and winemaking choices.',
        array['Citrus and green apple often point to cool-climate whites.', 'Spice and vanilla aromas may indicate oak influence.']::text[],
        array['Smell before and after swirling for comparison.', 'Use grouped descriptors instead of isolated words.']::text[]
      ),
      (
        'Appellation',
        'A legally defined geographic name used on labels to signal origin and production rules.',
        'Use appellation to infer likely style, quality controls, and allowed grape varieties.',
        array['AOC and DOC systems tie wine identity to place.', 'Smaller appellations often signal more specific origin.']::text[],
        array['Learn hierarchy from country to subregion.', 'Cross-check appellation rules when tasting blind.']::text[]
      ),
      (
        'Balance',
        'The harmony among acidity, sweetness, alcohol, tannin, fruit, and body in a wine.',
        'Judge balance by whether one element overwhelms the others at any point in the tasting.',
        array['A balanced wine can still be powerful.', 'An unbalanced wine may feel sharp, flat, or hot.']::text[],
        array['Reassess balance from first sip to finish.', 'Use a fixed tasting rubric for consistency.']::text[]
      ),
      (
        'Blend',
        'A wine made from more than one grape variety or from multiple vineyard components.',
        'Analyze what each component contributes to structure, aroma, and complexity.',
        array['Bordeaux-style blends combine structure and aromatic lift.', 'A blend can improve consistency across vintages.']::text[],
        array['Compare varietal and blended versions of similar wines.', 'Track blending goals in producer notes.']::text[]
      ),
      (
        'Body',
        'The perceived weight and texture of wine in the mouth, from light to full.',
        'Use body as a guide for food pairing and style comparison across regions.',
        array['Light-bodied wines often feel agile and refreshing.', 'Full-bodied wines usually feel denser and broader.']::text[],
        array['Body is not the same as sweetness.', 'Evaluate body before and after swallowing.']::text[]
      ),
      (
        'Bouquet',
        'The developed aromatic profile that emerges as wine ages in bottle or oak.',
        'Differentiate primary fruit aroma from secondary and tertiary bouquet traits.',
        array['Bottle age can add dried fruit and savory notes.', 'Oak maturation can layer spice and toast into bouquet.']::text[],
        array['Use younger and older vintages for training.', 'Note bouquet persistence after swirling.']::text[]
      ),
      (
        'Decanting',
        'Pouring wine into another vessel to separate sediment and expose wine to oxygen.',
        'Use decanting to soften youthfully firm structure or clarify older wines with sediment.',
        array['Young reds may open aromatically after air exposure.', 'Older bottles may need careful sediment separation.']::text[],
        array['Track time-to-peak after decanting.', 'Use gentle pours for mature vintages.']::text[]
      ),
      (
        'Dry',
        'A tasting term indicating little to no perceptible sweetness.',
        'Distinguish dry structure from fruity aroma, since fruit character can mimic sweetness.',
        array['A wine can smell ripe yet still taste dry.', 'High acidity can sharpen a dry impression.']::text[],
        array['Use residual sugar data when available.', 'Train palate with wines across sweetness levels.']::text[]
      ),
      (
        'Finish',
        'The length and quality of flavor sensations after swallowing or spitting.',
        'Score finish by duration, clarity, and whether flavors evolve positively.',
        array['Long finishes often indicate concentration and balance.', 'A short finish may suggest simple structure.']::text[],
        array['Count seconds for consistency.', 'Record the final dominant flavor family.']::text[]
      ),
      (
        'Food Pairing',
        'The practice of matching wine and food so each improves the other on the palate.',
        'Pair by structure first: acidity, sweetness, tannin, body, and intensity.',
        array['High-acid wines can refresh rich dishes.', 'Slight sweetness can calm spicy heat.']::text[],
        array['Avoid pairing a delicate wine with very intense food.', 'Test one contrast and one complement pairing.']::text[]
      ),
      (
        'Full-Bodied',
        'A descriptor for wines with substantial palate weight, texture, and concentration.',
        'Use this term when structure and extract create a broad, dense mouthfeel.',
        array['Some full-bodied whites come from oak and lees contact.', 'Full-bodied reds often carry higher tannin and alcohol.']::text[],
        array['Separate body from flavor intensity.', 'Compare with medium-bodied examples for calibration.']::text[]
      ),
      (
        'Lees',
        'Spent yeast and fine solids remaining after fermentation.',
        'Assess lees influence when wines show added texture, creaminess, or bread-like notes.',
        array['Lees stirring can increase mouthfeel.', 'Extended lees contact may add savory complexity.']::text[],
        array['Track lees decisions in cellar notes.', 'Compare aged-on-lees and non-lees versions.']::text[]
      ),
      (
        'Malolactic Fermentation',
        'A conversion process where sharper malic acid changes into softer lactic acid.',
        'Use this concept to explain rounder texture and softer acidity in certain wines.',
        array['Some Chardonnays show creamy texture from this conversion.', 'The process can reduce tart edge in cool-climate wines.']::text[],
        array['Identify when producer style uses full or partial conversion.', 'Evaluate impact on freshness and balance.']::text[]
      ),
      (
        'Minerality',
        'A sensory descriptor for stony, saline, or chalk-like impressions in wine.',
        'Use carefully as a tasting descriptor rather than a direct chemical claim.',
        array['Mineral impressions can appear in both whites and reds.', 'Acidity often amplifies mineral-like perception.']::text[],
        array['Describe the exact sensation, not just the word mineral.', 'Pair minerality notes with texture and finish comments.']::text[]
      ),
      (
        'New World',
        'A broad category for wine regions outside traditional European centers.',
        'Use the term for orientation, then refine by country, region, and producer style.',
        array['Climate and modern techniques often shape New World profiles.', 'Styles vary widely and are not uniform.']::text[],
        array['Avoid stereotypes by tasting region-specific examples.', 'Compare New World and Old World versions of one variety.']::text[]
      ),
      (
        'Oak Aging',
        'The maturation of wine in oak vessels, influencing texture, aroma, and structure.',
        'Assess whether oak integrates with fruit and structure rather than masking them.',
        array['Oak can add spice, toast, and vanilla notes.', 'Barrel age can broaden mid-palate texture.']::text[],
        array['Differentiate new and neutral oak effects.', 'Track oak impact over time in glass.']::text[]
      ),
      (
        'Old World',
        'A broad category for classic European wine regions with long-established traditions.',
        'Use as historical context, then evaluate each appellation on its own terms.',
        array['Old World labels often prioritize place names over grape names.', 'Traditional practices can shape style expectations.']::text[],
        array['Study labeling systems by country.', 'Avoid assuming quality only from category labels.']::text[]
      ),
      (
        'Residual Sugar',
        'Natural grape sugar left in wine after fermentation.',
        'Use residual sugar to explain perceived sweetness and balance with acidity.',
        array['A small amount of sugar can make acidity feel softer.', 'Dessert wines retain significantly more sugar.']::text[],
        array['Differentiate fruitiness from measurable sugar.', 'Track grams per liter when technical sheets are available.']::text[]
      ),
      (
        'Structured Wine',
        'A wine whose acid, tannin, alcohol, and fruit framework is clearly defined and persistent.',
        'Use this descriptor when architecture and aging potential are central to style.',
        array['Structured reds can evolve positively with bottle age.', 'Structure can be firm yet still balanced.']::text[],
        array['Assess structure at entry, mid-palate, and finish.', 'Compare young versus aged bottles for development.']::text[]
      ),
      (
        'Tannin',
        'Compounds that create drying or gripping sensations, especially in red wines.',
        'Evaluate tannin quality as fine, grippy, firm, or coarse rather than only strong or weak.',
        array['Riper tannins often feel smoother.', 'Tannin can provide backbone for age-worthy wines.']::text[],
        array['Check tannin with and without food.', 'Distinguish tannin from acidity-driven sharpness.']::text[]
      ),
      (
        'Terroir',
        'The interaction of place factors such as climate, soil, topography, and local practice in shaping wine style.',
        'Use terroir to compare how similar grapes express differently across regions.',
        array['Same variety can taste markedly different by site.', 'Climate and farming choices both influence expression.']::text[],
        array['Pair terroir observations with vintage context.', 'Avoid attributing every trait to a single factor.']::text[]
      ),
      (
        'Varietal',
        'A wine identified primarily by one grape variety.',
        'Use varietal identity as a starting point, then assess regional and producer influence.',
        array['Varietal labeling can help beginners navigate styles.', 'Single-variety wines still show diverse expressions.']::text[],
        array['Compare one varietal across several regions.', 'Use blind tasting to separate grape markers from winemaking effects.']::text[]
      ),
      (
        'Vintage',
        'The year grapes were harvested for a given wine.',
        'Use vintage context to interpret weather impact, ripeness, and style variation.',
        array['Cool years may yield higher-acid profiles.', 'Warm years can produce riper fruit character.']::text[],
        array['Study producer notes by vintage.', 'Compare adjacent vintages from the same estate.']::text[]
      )
  ) as t(term, meaning, how_to_apply, examples, other_ideas)
)
insert into public.terminology_entries (
  term,
  meaning,
  how_to_apply,
  examples,
  other_ideas,
  reference_links,
  mla_citations,
  source_title,
  source_authors,
  purchase_links,
  source_note,
  is_published
)
select
  s.term,
  s.meaning,
  s.how_to_apply,
  s.examples,
  s.other_ideas,
  m.reference_links,
  m.mla_citations,
  m.source_title,
  m.source_authors,
  m.purchase_links,
  'Batch 01 draft from The Wine Bible source set. Original Sipopedia editorial rewrite; no verbatim excerpts.',
  false
from seed_rows s
cross join source_meta m
on conflict (term) do update
set
  meaning = excluded.meaning,
  how_to_apply = excluded.how_to_apply,
  examples = excluded.examples,
  other_ideas = excluded.other_ideas,
  reference_links = excluded.reference_links,
  mla_citations = excluded.mla_citations,
  source_title = excluded.source_title,
  source_authors = excluded.source_authors,
  purchase_links = excluded.purchase_links,
  source_note = excluded.source_note,
  is_published = excluded.is_published;
