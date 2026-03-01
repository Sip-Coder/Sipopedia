-- Beverage terminology foundation for A-batch generation.
-- Adds category + related_terms metadata and seeds 12,000 A* entries:
-- 1,000 each for wine, beer, spirits, coffee, tea, kombucha, juice, milk,
-- water, energy drinks, health drinks, and powdered supplements.

alter table public.terminology_entries
  add column if not exists category text not null default 'production style';
alter table public.terminology_entries
  add column if not exists related_terms text[] not null default '{}';
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'terminology_entries_category_allowed'
  ) then
    alter table public.terminology_entries
      add constraint terminology_entries_category_allowed
      check (
        category in (
          'location',
          'terroir',
          'variety of source ingredient',
          'production style'
        )
      );
  end if;
end;
$$;
update public.terminology_entries
set category = 'production style'
where category is null or btrim(category) = '';
update public.terminology_entries
set related_terms = array[
  coalesce(other_ideas[1], 'Aroma alignment'),
  coalesce(other_ideas[2], 'Acidity adjustment'),
  coalesce(other_ideas[3], 'Artisan process audit')
]
where cardinality(related_terms) = 0;
create or replace function public.compute_terminology_importance(input_term text)
returns integer
language plpgsql
immutable
as $$
declare
  t text := lower(coalesce(input_term, ''));
  score integer := 10;
begin
  if t ~ '(acidity|aeration|aging|agave|ale|alkaline|almond|amino|anaerobic|arabica|aroma|ashwagandha|apple|assam|antioxidant|abv|aqua)' then
    score := score + 40;
  end if;

  if t ~ '(wine|beer|spirits|coffee|tea|kombucha|juice|milk|water|energy|health|supplement|powder)' then
    score := score + 30;
  end if;

  if t ~ '(location|terroir|variety|production|fermentation|distillation|roast|extraction|pasteurization|filtration|blending)' then
    score := score + 20;
  end if;

  if t ~ '^a' then
    score := score + 10;
  end if;

  return greatest(score, 0);
end;
$$;
-- Replace any existing A-bucket terms with the beverage-first A catalog.
delete from public.terminology_entries
where sort_group = 'A';
with beverage_tracks as (
  select *
  from (
    values
      (
        'wine',
        'Wine',
        'grape',
        array['https://www.oiv.int/', 'https://www.wsetglobal.com/']::text[],
        array[
          'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 23 Feb. 2026.',
          'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'beer',
        'Beer',
        'hop, malt, or grain',
        array['https://www.brewersassociation.org/', 'https://www.bjcp.org/']::text[],
        array[
          'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 23 Feb. 2026.',
          'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'spirits',
        'Spirits',
        'grain, fruit, or agave source',
        array['https://www.distilledspirits.org/', 'https://www.ttb.gov/spirits']::text[],
        array[
          'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 23 Feb. 2026.',
          'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'coffee',
        'Coffee',
        'bean variety',
        array['https://sca.coffee/', 'https://worldcoffeeresearch.org/']::text[],
        array[
          'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 23 Feb. 2026.',
          'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'tea',
        'Tea',
        'tea leaf or flower variety',
        array['https://www.teausa.com/', 'https://www.ukteaacademy.co.uk/']::text[],
        array[
          'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 23 Feb. 2026.',
          'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'kombucha',
        'Kombucha',
        'tea, sugar, and culture variety',
        array['https://www.kombuchabrewers.org/', 'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook']::text[],
        array[
          'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 23 Feb. 2026.',
          'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'juice',
        'Juice',
        'fruit or vegetable variety',
        array['https://www.juiceproducts.org/', 'https://www.ift.org/']::text[],
        array[
          'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 23 Feb. 2026.',
          'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'milk',
        'Milk',
        'milk source variety',
        array['https://www.idfa.org/', 'https://www.fil-idf.org/']::text[],
        array[
          'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 23 Feb. 2026.',
          'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'water',
        'Water',
        'water source variety',
        array['https://www.bottledwater.org/', 'https://www.who.int/health-topics/water']::text[],
        array[
          'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 23 Feb. 2026.',
          'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'energy-drinks',
        'Energy Drinks',
        'ingredient source variety',
        array['https://www.americanbeverage.org/', 'https://www.fda.gov/food/food-additives-petitions/caffeine']::text[],
        array[
          'American Beverage Association. "American Beverage Association." ABA, https://www.americanbeverage.org/. Accessed 23 Feb. 2026.',
          'U.S. Food and Drug Administration. "Caffeine." FDA, https://www.fda.gov/food/food-additives-petitions/caffeine. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'health-drinks',
        'Health Drinks',
        'ingredient source variety',
        array['https://www.crnusa.org/', 'https://www.ods.od.nih.gov/']::text[],
        array[
          'Council for Responsible Nutrition. "CRN." Council for Responsible Nutrition, https://www.crnusa.org/. Accessed 23 Feb. 2026.',
          'Office of Dietary Supplements. "NIH ODS." National Institutes of Health, https://www.ods.od.nih.gov/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'powdered-supplements',
        'Powdered Supplements',
        'ingredient source variety',
        array['https://www.ods.od.nih.gov/', 'https://www.usp.org/']::text[],
        array[
          'Office of Dietary Supplements. "NIH ODS." National Institutes of Health, https://www.ods.od.nih.gov/. Accessed 23 Feb. 2026.',
          'United States Pharmacopeia. "USP." USP, https://www.usp.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      )
  ) as b(beverage_key, beverage_label, ingredient_focus, reference_links, mla_citations)
),
a_descriptors as (
  select *
  from (
    values
      ('Adaptive', 'adjusting methods based on sensory and process feedback'),
      ('Aged', 'maturation-linked quality progression across storage windows'),
      ('Agile', 'fast adjustment of process variables and tasting checkpoints'),
      ('Airy', 'volatile aromatic lift and perceived lightness in profile'),
      ('Alkaline', 'mineral-leaning pH framing used in production decisions'),
      ('Alpine', 'high-altitude sourcing and climate-driven flavor framing'),
      ('Amber', 'color-spectrum positioning used for style communication'),
      ('Ambient', 'room-condition effects on handling and service behavior'),
      ('American', 'regional practice alignment tied to U.S. production habits'),
      ('Ancient', 'historical method carryovers adapted to modern standards'),
      ('Andean', 'mountain-influenced sourcing pattern with altitude impact'),
      ('Angular', 'sharp-edged structure that highlights contrast in tasting'),
      ('Aromatic', 'nose-forward identity used for sensory calibration'),
      ('Artisan', 'small-batch craftsmanship with high manual control'),
      ('Ash-Roasted', 'char and heat-contact influence on aromatic structure'),
      ('Atlantic', 'coastal-influenced sourcing with humidity and breeze effects'),
      ('Attentive', 'process monitored with frequent quality checkpoints'),
      ('Authentic', 'method tracing linked to tradition and verifiable origin'),
      ('Autumnal', 'season-linked profile and harvest-driven flavor direction'),
      ('Awarded', 'competition-recognized quality characteristics and consistency'),
      ('Axiomatic', 'rule-based process logic for repeatable outcomes'),
      ('Aerated', 'oxygen-contact strategy used to shape sensory expression'),
      ('Acclimated', 'ingredient adaptation to local storage and production conditions'),
      ('Acid-Balanced', 'controlled acidity profile to improve structure and finish'),
      ('Aroma-Rich', 'intentionally amplified aromatic intensity and persistence')
  ) as d(descriptor, descriptor_note)
),
a_dimensions as (
  select *
  from (
    values
      ('Acidity', 'acid structure and brightness management'),
      ('Aroma', 'volatile compound expression and perception'),
      ('Appearance', 'color, clarity, and visual stability tracking'),
      ('Aftertaste', 'finish quality and persistence mapping'),
      ('Ageability', 'storage resilience and evolution over time'),
      ('Availability', 'sourcing reliability across seasons and lots'),
      ('Agriculture', 'farm-level inputs affecting raw material quality'),
      ('Assembly', 'blending, batching, and final composition decisions'),
      ('Assessment', 'structured sensory and quality scoring workflows'),
      ('Authenticity', 'origin, identity, and labeling integrity controls')
  ) as m(dimension, dimension_note)
),
a_artifacts as (
  select *
  from (
    values
      ('Atlas'),
      ('Approach'),
      ('Architecture'),
      ('Analysis'),
      ('Algorithm')
  ) as a(artifact)
),
combinations as (
  select
    b.beverage_key,
    b.beverage_label,
    b.ingredient_focus,
    b.reference_links,
    b.mla_citations,
    d.descriptor,
    d.descriptor_note,
    m.dimension,
    m.dimension_note,
    a.artifact,
    row_number() over (
      partition by b.beverage_key
      order by d.descriptor, m.dimension, a.artifact
    ) as idx
  from beverage_tracks b
  cross join a_descriptors d
  cross join a_dimensions m
  cross join a_artifacts a
),
limited as (
  select *
  from combinations
  where idx <= 1000
)
insert into public.terminology_entries (
  term,
  category,
  meaning,
  how_to_apply,
  examples,
  other_ideas,
  related_terms,
  reference_links,
  mla_citations,
  source_note,
  is_published,
  updated_at
)
select
  format('%s %s %s %s', l.descriptor, l.beverage_label, l.dimension, l.artifact) as term,
  case
    when l.idx % 4 = 0 then 'location'
    when l.idx % 4 = 1 then 'terroir'
    when l.idx % 4 = 2 then 'variety of source ingredient'
    else 'production style'
  end as category,
  format(
    '"%s %s %s %s" defines a beverage terminology concept focused on %s for %s, emphasizing %s and %s.',
    l.descriptor,
    l.beverage_label,
    l.dimension,
    l.artifact,
    case
      when l.idx % 4 = 0 then 'location-specific conditions'
      when l.idx % 4 = 1 then 'terroir influence on flavor and structure'
      when l.idx % 4 = 2 then l.ingredient_focus
      else 'production style decisions from prep through finishing'
    end,
    l.beverage_label,
    l.descriptor_note,
    l.dimension_note
  ) as meaning,
  format(
    'Apply this term by documenting one %s workflow, setting a measurable quality checkpoint, and reviewing outcomes weekly against your current %s standards.',
    case
      when l.idx % 4 = 0 then 'location'
      when l.idx % 4 = 1 then 'terroir'
      when l.idx % 4 = 2 then 'ingredient-variation'
      else 'production-style'
    end,
    l.beverage_label
  ) as how_to_apply,
  array[
    format('Team example: use "%s %s %s %s" when calibrating %s batches before release.', l.descriptor, l.beverage_label, l.dimension, l.artifact, l.beverage_label),
    format('Training example: compare two %s samples and score how %s changes perceived quality.', l.beverage_label, l.dimension)
  ] as examples,
  array[
    format('Archive tasting notes and process settings so "%s %s %s %s" decisions are reproducible.', l.descriptor, l.beverage_label, l.dimension, l.artifact),
    format('Pair this concept with supplier audits to improve %s consistency over time.', l.beverage_label)
  ] as other_ideas,
  array[
    format('Aroma mapping for %s', l.beverage_label),
    format('Acidity calibration in %s', l.beverage_label),
    format('Artisan process audit for %s', l.beverage_label)
  ] as related_terms,
  l.reference_links,
  l.mla_citations,
  'Sip Studies beverage terminology batch A: generated editorial rewrites with references and MLA citations.',
  true,
  now()
from limited l
on conflict (term) do nothing;
update public.terminology_entries
set importance_score = public.compute_terminology_importance(term)
where sort_group = 'A';
