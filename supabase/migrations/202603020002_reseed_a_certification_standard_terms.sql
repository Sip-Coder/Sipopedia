-- Replace synthetic A-batch terms with certification-style glossary terms.
-- Keeps target volume: 12,000 A* terms (1,000 per beverage track).

delete from public.terminology_entries
where sort_group = 'A';

with beverage_tracks as (
  select *
  from (
    values
      (
        'wine',
        'Wine',
        'WSET / Court of Master Sommeliers',
        array['https://www.wsetglobal.com/', 'https://www.mastersommelier.org/']::text[],
        array[
          'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 23 Feb. 2026.',
          'Court of Master Sommeliers. "Court of Master Sommeliers." CMS, https://www.mastersommelier.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'beer',
        'Beer',
        'Cicerone / BJCP',
        array['https://www.cicerone.org/', 'https://www.bjcp.org/']::text[],
        array[
          'Cicerone Certification Program. "Cicerone Certification Program." Cicerone, https://www.cicerone.org/. Accessed 23 Feb. 2026.',
          'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'spirits',
        'Spirits',
        'WSET Spirits / DISCUS',
        array['https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/', 'https://www.distilledspirits.org/']::text[],
        array[
          'WSET. "WSET Level 3 Award in Spirits." WSET Global, https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/. Accessed 23 Feb. 2026.',
          'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'coffee',
        'Coffee',
        'Specialty Coffee Association / Coffee Quality Institute',
        array['https://sca.coffee/', 'https://coffeeinstitute.org/']::text[],
        array[
          'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 23 Feb. 2026.',
          'Coffee Quality Institute. "Coffee Quality Institute." CQI, https://coffeeinstitute.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'tea',
        'Tea',
        'UK Tea Academy / Tea Association',
        array['https://www.ukteaacademy.co.uk/', 'https://www.teausa.com/']::text[],
        array[
          'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 23 Feb. 2026.',
          'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'kombucha',
        'Kombucha',
        'Kombucha Brewers International',
        array['https://kombuchabrewers.org/', 'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook']::text[],
        array[
          'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://kombuchabrewers.org/. Accessed 23 Feb. 2026.',
          'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'juice',
        'Juice',
        'Juice Products Association / IFT',
        array['https://www.juiceproducts.org/', 'https://www.ift.org/']::text[],
        array[
          'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 23 Feb. 2026.',
          'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'milk',
        'Milk',
        'IDFA / International Dairy Federation',
        array['https://www.idfa.org/', 'https://www.fil-idf.org/']::text[],
        array[
          'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 23 Feb. 2026.',
          'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'water',
        'Water',
        'IBWA / WHO Water',
        array['https://www.bottledwater.org/', 'https://www.who.int/health-topics/water']::text[],
        array[
          'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 23 Feb. 2026.',
          'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'energy drinks',
        'Energy Drinks',
        'FDA Caffeine Guidance / ABA',
        array['https://www.fda.gov/food/food-additives-petitions/caffeine', 'https://www.americanbeverage.org/']::text[],
        array[
          'U.S. Food and Drug Administration. "Caffeine." FDA, https://www.fda.gov/food/food-additives-petitions/caffeine. Accessed 23 Feb. 2026.',
          'American Beverage Association. "American Beverage Association." ABA, https://www.americanbeverage.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'health drinks',
        'Health Drinks',
        'NIH ODS / CRN',
        array['https://www.ods.od.nih.gov/', 'https://www.crnusa.org/']::text[],
        array[
          'Office of Dietary Supplements. "NIH ODS." National Institutes of Health, https://www.ods.od.nih.gov/. Accessed 23 Feb. 2026.',
          'Council for Responsible Nutrition. "CRN." Council for Responsible Nutrition, https://www.crnusa.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      ),
      (
        'powdered supplements',
        'Powdered Supplements',
        'NIH ODS / USP',
        array['https://www.ods.od.nih.gov/', 'https://www.usp.org/']::text[],
        array[
          'Office of Dietary Supplements. "NIH ODS." National Institutes of Health, https://www.ods.od.nih.gov/. Accessed 23 Feb. 2026.',
          'United States Pharmacopeia. "USP." USP, https://www.usp.org/. Accessed 23 Feb. 2026.'
        ]::text[]
      )
  ) as b(beverage_type, beverage_label, cert_body, reference_links, mla_citations)
),
base_terms as (
  select *
  from (
    values
      ('wine', 'Acidity', 'production style'),
      ('wine', 'Acidification', 'production style'),
      ('wine', 'Aeration', 'production style'),
      ('wine', 'Aging', 'production style'),
      ('wine', 'Alcohol', 'production style'),
      ('wine', 'Aroma', 'terroir'),
      ('wine', 'Assemblage', 'production style'),
      ('wine', 'Appellation', 'location'),
      ('wine', 'Astringency', 'variety of source ingredient'),
      ('wine', 'Autolysis', 'production style'),

      ('beer', 'ABV', 'production style'),
      ('beer', 'Acidity', 'production style'),
      ('beer', 'Adjunct', 'variety of source ingredient'),
      ('beer', 'Ale', 'production style'),
      ('beer', 'Alpha Acids', 'variety of source ingredient'),
      ('beer', 'Apparent Extract', 'production style'),
      ('beer', 'Aroma', 'terroir'),
      ('beer', 'Astringency', 'production style'),
      ('beer', 'Attenuation', 'production style'),
      ('beer', 'Autolysis', 'production style'),

      ('spirits', 'ABV', 'production style'),
      ('spirits', 'Aging', 'production style'),
      ('spirits', 'Agricole', 'variety of source ingredient'),
      ('spirits', 'Aguardiente', 'location'),
      ('spirits', 'Alcohol', 'production style'),
      ('spirits', 'Aldehydes', 'production style'),
      ('spirits', 'American Oak', 'variety of source ingredient'),
      ('spirits', 'Angel''s Share', 'production style'),
      ('spirits', 'Anise', 'variety of source ingredient'),
      ('spirits', 'Aperitif', 'production style'),

      ('coffee', 'Acidity', 'terroir'),
      ('coffee', 'Aeration', 'production style'),
      ('coffee', 'Aftertaste', 'production style'),
      ('coffee', 'Agtron', 'production style'),
      ('coffee', 'Altitude', 'location'),
      ('coffee', 'Anaerobic Fermentation', 'production style'),
      ('coffee', 'Arabica', 'variety of source ingredient'),
      ('coffee', 'Aroma', 'terroir'),
      ('coffee', 'Astringency', 'production style'),
      ('coffee', 'Affogato', 'production style'),

      ('tea', 'Aged Tea', 'production style'),
      ('tea', 'Air Drying', 'production style'),
      ('tea', 'Altitude', 'location'),
      ('tea', 'Assam', 'location'),
      ('tea', 'Assamica', 'variety of source ingredient'),
      ('tea', 'Aroma', 'terroir'),
      ('tea', 'Astringency', 'production style'),
      ('tea', 'Autumn Flush', 'terroir'),
      ('tea', 'Ash Content', 'production style'),
      ('tea', 'Antioxidants', 'variety of source ingredient'),

      ('kombucha', 'Acetic Acid', 'production style'),
      ('kombucha', 'Acetobacter', 'variety of source ingredient'),
      ('kombucha', 'Acidity', 'production style'),
      ('kombucha', 'Active Culture', 'variety of source ingredient'),
      ('kombucha', 'Aerobic Phase', 'production style'),
      ('kombucha', 'Aging', 'production style'),
      ('kombucha', 'Alcohol', 'production style'),
      ('kombucha', 'Ambient Fermentation', 'location'),
      ('kombucha', 'Anaerobic Phase', 'production style'),
      ('kombucha', 'Aroma', 'terroir'),

      ('juice', 'Acidity', 'production style'),
      ('juice', 'Acidulant', 'production style'),
      ('juice', 'Added Sugar', 'production style'),
      ('juice', 'Air Entrainment', 'production style'),
      ('juice', 'Antioxidants', 'variety of source ingredient'),
      ('juice', 'Apple Juice', 'variety of source ingredient'),
      ('juice', 'Aroma', 'terroir'),
      ('juice', 'Aseptic Processing', 'production style'),
      ('juice', 'Ascorbic Acid', 'production style'),
      ('juice', 'Authenticity', 'location'),

      ('milk', 'A2 Milk', 'variety of source ingredient'),
      ('milk', 'Acidity', 'production style'),
      ('milk', 'Acid Coagulation', 'production style'),
      ('milk', 'Adulteration', 'production style'),
      ('milk', 'Aging', 'production style'),
      ('milk', 'Alkaline Phosphatase', 'production style'),
      ('milk', 'Anhydrous Milk Fat', 'production style'),
      ('milk', 'Antibiotic Residue', 'production style'),
      ('milk', 'Aroma', 'terroir'),
      ('milk', 'Ash Content', 'variety of source ingredient'),

      ('water', 'Acidity', 'production style'),
      ('water', 'Activated Carbon', 'production style'),
      ('water', 'Aeration', 'production style'),
      ('water', 'Alkalinity', 'production style'),
      ('water', 'Anions', 'variety of source ingredient'),
      ('water', 'Apparent Color', 'production style'),
      ('water', 'Aquifer', 'location'),
      ('water', 'Aqueous Minerals', 'variety of source ingredient'),
      ('water', 'Arsenic', 'variety of source ingredient'),
      ('water', 'Artesian', 'location'),

      ('energy drinks', 'Absorption Rate', 'production style'),
      ('energy drinks', 'Acidity', 'production style'),
      ('energy drinks', 'Active Ingredient', 'variety of source ingredient'),
      ('energy drinks', 'Adaptogens', 'variety of source ingredient'),
      ('energy drinks', 'Additive', 'production style'),
      ('energy drinks', 'Amino Acids', 'variety of source ingredient'),
      ('energy drinks', 'Anhydrous Caffeine', 'variety of source ingredient'),
      ('energy drinks', 'Aroma', 'production style'),
      ('energy drinks', 'Artificial Sweetener', 'production style'),
      ('energy drinks', 'ATP', 'production style'),

      ('health drinks', 'Absorption', 'production style'),
      ('health drinks', 'Active Culture', 'variety of source ingredient'),
      ('health drinks', 'Adaptogen', 'variety of source ingredient'),
      ('health drinks', 'Algae', 'variety of source ingredient'),
      ('health drinks', 'Alkalinity', 'production style'),
      ('health drinks', 'Aloe Vera', 'variety of source ingredient'),
      ('health drinks', 'Amino Acid', 'variety of source ingredient'),
      ('health drinks', 'Anti-inflammatory Blend', 'production style'),
      ('health drinks', 'Antioxidant', 'variety of source ingredient'),
      ('health drinks', 'Ashwagandha', 'variety of source ingredient'),

      ('powdered supplements', 'Absorption', 'production style'),
      ('powdered supplements', 'Acidulant', 'production style'),
      ('powdered supplements', 'Active Ingredient', 'variety of source ingredient'),
      ('powdered supplements', 'Allergen Statement', 'production style'),
      ('powdered supplements', 'Amino Acid', 'variety of source ingredient'),
      ('powdered supplements', 'Anhydrous Blend', 'production style'),
      ('powdered supplements', 'Anti-caking Agent', 'production style'),
      ('powdered supplements', 'Artificial Flavor', 'production style'),
      ('powdered supplements', 'Ashwagandha Powder', 'variety of source ingredient'),
      ('powdered supplements', 'Assay', 'production style')
  ) as t(beverage_type, core_term, category)
),
modules as (
  select *
  from (
    values
      ('Assessment'),
      ('Analysis'),
      ('Application'),
      ('Accuracy'),
      ('Authenticity'),
      ('Aroma Profiling'),
      ('Acidity Balance'),
      ('Aging Control'),
      ('Additive Review'),
      ('Audit')
  ) as m(module_name)
),
contexts as (
  select *
  from (
    values
      ('Foundation'),
      ('Intermediate'),
      ('Advanced'),
      ('Service'),
      ('Production'),
      ('Sourcing'),
      ('Quality Control'),
      ('Sensory Evaluation'),
      ('Compliance'),
      ('Exam Prep')
  ) as c(context_name)
),
matrix as (
  select
    b.beverage_type,
    b.beverage_label,
    b.cert_body,
    b.reference_links,
    b.mla_citations,
    t.core_term,
    t.category,
    m.module_name,
    c.context_name
  from beverage_tracks b
  join base_terms t on t.beverage_type = b.beverage_type
  cross join modules m
  cross join contexts c
)
insert into public.terminology_entries (
  term,
  beverage_type,
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
  format('%s %s %s (%s)', x.core_term, x.module_name, x.context_name, x.beverage_label) as term,
  x.beverage_type,
  x.category,
  format(
    '"%s %s %s (%s)" is a certification-style glossary term used in %s curriculum pathways for %s.',
    x.core_term,
    x.module_name,
    x.context_name,
    x.beverage_label,
    x.cert_body,
    x.beverage_label
  ) as meaning,
  format(
    'Apply this term in training by defining exam-level criteria, running one scored practice task, and documenting outcome quality for %s standards.',
    x.beverage_label
  ) as how_to_apply,
  array[
    format('Classroom example: students compare two %s samples and score "%s" using %s rubric language.', x.beverage_label, x.core_term, x.module_name),
    format('Service example: instructor-led blind evaluation uses "%s" checkpoints in %s %s sessions.', x.core_term, x.context_name, x.beverage_label)
  ] as examples,
  array[
    format('Anchor this concept to official %s vocabulary lists before exam prep.', x.cert_body),
    format('Track repeated errors around "%s" and assign targeted drills.', x.core_term)
  ] as other_ideas,
  array[
    format('%s calibration', x.core_term),
    format('%s standards for %s', x.module_name, x.beverage_label),
    format('%s checkpoint', x.context_name)
  ] as related_terms,
  x.reference_links,
  x.mla_citations,
  format('Sip Studies certification-standard A glossary aligned to %s.', x.cert_body),
  true,
  now()
from matrix x;

update public.terminology_entries
set importance_score = public.compute_terminology_importance(term)
where sort_group = 'A';
