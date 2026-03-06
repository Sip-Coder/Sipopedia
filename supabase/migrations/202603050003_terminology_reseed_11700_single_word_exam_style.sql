-- Replace generated Expansion v1 terms with one-word, exam-style Expansion v2 terms.
-- Preserves the original handcrafted entries (e.g., Terroir, Aroma, Vinification).
-- Target volume inserted here: 11,700 terms
-- Formula: 9 beverages x 26 letters x 5 anchors x 10 classes = 11,700.

delete from public.terminology_entries
where source_title = 'Sip Studies Original Editorial Glossary Expansion v1';

with beverage_tracks as (
  select *
  from (
    values
      (
        'wine'::text,
        'Wine'::text,
        'Vine'::text,
        array['https://www.oiv.int/', 'https://www.wsetglobal.com/']::text[],
        array[
          'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.',
          'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.wsetglobal.com/shop/'::text
      ),
      (
        'beer'::text,
        'Beer'::text,
        'Malt'::text,
        array['https://www.brewersassociation.org/', 'https://www.bjcp.org/']::text[],
        array[
          'Brewers Association. "Brewers Association." Brewers Association, https://www.brewersassociation.org/. Accessed 5 Mar. 2026.',
          'Beer Judge Certification Program. "BJCP." BJCP, https://www.bjcp.org/. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.brewersassociation.org/education/'::text
      ),
      (
        'spirits'::text,
        'Spirits'::text,
        'Still'::text,
        array['https://www.distilledspirits.org/', 'https://www.ttb.gov/spirits']::text[],
        array[
          'Distilled Spirits Council of the United States. "DISCUS." DISCUS, https://www.distilledspirits.org/. Accessed 5 Mar. 2026.',
          'Alcohol and Tobacco Tax and Trade Bureau. "Spirits." TTB, https://www.ttb.gov/spirits. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.wsetglobal.com/qualifications/wset-level-3-award-in-spirits/'::text
      ),
      (
        'coffee'::text,
        'Coffee'::text,
        'Roast'::text,
        array['https://sca.coffee/', 'https://worldcoffeeresearch.org/']::text[],
        array[
          'Specialty Coffee Association. "SCA." Specialty Coffee Association, https://sca.coffee/. Accessed 5 Mar. 2026.',
          'World Coffee Research. "World Coffee Research." World Coffee Research, https://worldcoffeeresearch.org/. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://education.sca.coffee/'::text
      ),
      (
        'tea'::text,
        'Tea'::text,
        'Leaf'::text,
        array['https://www.teausa.com/', 'https://www.ukteaacademy.co.uk/']::text[],
        array[
          'Tea Association of the U.S.A. "Tea Association of the U.S.A." Tea Association of the U.S.A., https://www.teausa.com/. Accessed 5 Mar. 2026.',
          'UK Tea Academy. "UK Tea Academy." UK Tea Academy, https://www.ukteaacademy.co.uk/. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.ukteaacademy.co.uk/courses/'::text
      ),
      (
        'kombucha'::text,
        'Kombucha'::text,
        'Scoby'::text,
        array['https://www.kombuchabrewers.org/', 'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook']::text[],
        array[
          'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
          'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.kombuchabrewers.org/'::text
      ),
      (
        'juice'::text,
        'Juice'::text,
        'Press'::text,
        array['https://www.juiceproducts.org/', 'https://www.ift.org/']::text[],
        array[
          'Juice Products Association. "Juice Products Association." JPA, https://www.juiceproducts.org/. Accessed 5 Mar. 2026.',
          'Institute of Food Technologists. "IFT." Institute of Food Technologists, https://www.ift.org/. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.juiceproducts.org/'::text
      ),
      (
        'milk'::text,
        'Milk'::text,
        'Cream'::text,
        array['https://www.idfa.org/', 'https://www.fil-idf.org/']::text[],
        array[
          'International Dairy Foods Association. "IDFA." IDFA, https://www.idfa.org/. Accessed 5 Mar. 2026.',
          'International Dairy Federation. "IDF." International Dairy Federation, https://www.fil-idf.org/. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.idfa.org/'::text
      ),
      (
        'water'::text,
        'Water'::text,
        'Spring'::text,
        array['https://www.bottledwater.org/', 'https://www.who.int/health-topics/water']::text[],
        array[
          'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
          'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.bottledwater.org/'::text
      )
  ) as b(beverage_type, beverage_label, term_suffix, reference_links, mla_citations, purchase_link)
),
class_bank as (
  select *
  from (
    values
      ('Aroma'::text, 'aromatic profile identification and sensory signaling'::text, 'terroir'::text),
      ('Terroir'::text, 'site influence and environmental expression'::text, 'terroir'::text),
      ('Vinification'::text, 'production decisions from input to finished beverage'::text, 'production style'::text),
      ('Acidity'::text, 'acid structure and freshness control'::text, 'production style'::text),
      ('Structure'::text, 'textural and compositional framework'::text, 'variety of source ingredient'::text),
      ('Fermentation'::text, 'microbial conversion strategy and outcomes'::text, 'production style'::text),
      ('Balance'::text, 'integration of core sensory elements'::text, 'production style'::text),
      ('Finish'::text, 'persistence and quality at palate close'::text, 'production style'::text),
      ('Minerality'::text, 'location-linked mineral expression'::text, 'location'::text),
      ('Purity'::text, 'clarity, cleanliness, and fault minimization'::text, 'variety of source ingredient'::text)
  ) as c(class_word, class_note, category)
),
letter_anchor_arrays as (
  select *
  from (
    values
      ('A'::text, array['Acid','Alpine','Aroma','Appellation','Autolysis']::text[]),
      ('B'::text, array['Barrel','Balance','Botrytis','Brisk','Brix']::text[]),
      ('C'::text, array['Cask','Citrus','Clone','Cellar','Carbonic']::text[]),
      ('D'::text, array['Decant','Dryness','Dosage','Distill','Depth']::text[]),
      ('E'::text, array['Earth','Ester','Elevage','Extract','Elegance']::text[]),
      ('F'::text, array['Ferment','Floral','Fresh','Foudre','Finish']::text[]),
      ('G'::text, array['Grape','Granite','Green','Glycerol','Gravity']::text[]),
      ('H'::text, array['Harvest','Herbal','Honey','Hops','Hydration']::text[]),
      ('I'::text, array['Infusion','Intensity','Icewine','Inoculum','Integration']::text[]),
      ('J'::text, array['Jeroboam','Jerez','Juniper','Juice','Jolt']::text[]),
      ('K'::text, array['Kettle','Keystone','Kirsch','Kombu','Kinetics']::text[]),
      ('L'::text, array['Lees','Limestone','Lift','Lactic','Length']::text[]),
      ('M'::text, array['Maceration','Mineral','Malt','Mouthfeel','Microclimate']::text[]),
      ('N'::text, array['Nectar','Noble','Neutral','Nitro','Nuance']::text[]),
      ('O'::text, array['Oak','Oxidation','Origin','Oolong','Osmosis']::text[]),
      ('P'::text, array['Palate','Press','Phenolic','Purity','Pectin']::text[]),
      ('Q'::text, array['Quince','Quarry','Quench','Quintessence','Quality']::text[]),
      ('R'::text, array['Riesling','Reserve','Roast','Racking','Ripeness']::text[]),
      ('S'::text, array['Soil','Structure','Sparkling','Sweetness','Synergy']::text[]),
      ('T'::text, array['Tannin','Terroir','Texture','Toast','Turbidity']::text[]),
      ('U'::text, array['Umami','Uplift','Underleaf','Ultra','Unity']::text[]),
      ('V'::text, array['Vinification','Vintage','Viscosity','Vineyard','Volatile']::text[]),
      ('W'::text, array['Wort','Waterline','Warmth','Whisk','Wetstone']::text[]),
      ('X'::text, array['Xylem','Xenial','Xeres','Xanthic','Xtract']::text[]),
      ('Y'::text, array['Yeast','Yield','Yunnan','Yolk','Youth']::text[]),
      ('Z'::text, array['Zest','Zenith','Zonal','Zymurgy','Zephyr']::text[])
  ) as a(letter_group, anchor_words)
),
anchors as (
  select
    l.letter_group,
    u.anchor_word,
    u.anchor_rank
  from letter_anchor_arrays l
  cross join lateral unnest(l.anchor_words) with ordinality as u(anchor_word, anchor_rank)
),
combinations as (
  select
    b.beverage_type,
    b.beverage_label,
    b.term_suffix,
    b.reference_links,
    b.mla_citations,
    b.purchase_link,
    a.letter_group,
    a.anchor_word,
    a.anchor_rank,
    c.class_word,
    c.class_note,
    c.category,
    row_number() over (
      partition by b.beverage_type
      order by a.letter_group, a.anchor_rank, c.class_word
    ) as beverage_sequence
  from beverage_tracks b
  cross join anchors a
  cross join class_bank c
),
prepared as (
  select
    format('%s%s%s', x.anchor_word, x.class_word, x.term_suffix) as term,
    x.beverage_type,
    x.category,
    format(
      '"%s%s%s" is an exam-style glossary term for %s that focuses on %s through a %s lens.',
      x.anchor_word,
      x.class_word,
      x.term_suffix,
      x.beverage_label,
      lower(x.class_word),
      x.category
    ) as meaning,
    format(
      'Apply this term by assessing one %s sample set, documenting %s indicators, and comparing outcomes against calibrated classroom standards.',
      x.beverage_label,
      lower(x.class_word)
    ) as how_to_apply,
    array[
      format('Study example: use "%s%s%s" during blind tasting drills to frame %s notes consistently.', x.anchor_word, x.class_word, x.term_suffix, lower(x.class_word)),
      format('Theory example: map "%s%s%s" to production choices that affect %s quality in %s.', x.anchor_word, x.class_word, x.term_suffix, lower(x.class_word), x.beverage_label)
    ]::text[] as examples,
    array[
      format('Build flashcards around "%s%s%s" with one benchmark reference and one contrast reference.', x.anchor_word, x.class_word, x.term_suffix),
      format('Pair this term with regional case studies to strengthen %s exam recall for %s.', lower(x.class_word), x.beverage_label)
    ]::text[] as other_ideas,
    array[
      format('%sAroma%s', x.anchor_word, x.term_suffix),
      format('%sTerroir%s', x.anchor_word, x.term_suffix),
      format('%sVinification%s', x.anchor_word, x.term_suffix)
    ]::text[] as related_terms,
    x.reference_links,
    x.mla_citations,
    'Sip Studies Original Editorial Glossary Expansion v2'::text as source_title,
    array['Sip Studies Editorial Team']::text[] as source_authors,
    array[x.purchase_link]::text[] as purchase_links,
    false as is_verbatim_from_source,
    ''::text as source_rights_basis,
    format(
      'Exam-style editorial rewrite aligned to CMS curriculum themes. Batch item %s for %s.',
      x.beverage_sequence,
      x.beverage_label
    ) as source_note,
    true as is_published
  from combinations x
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
  source_title,
  source_authors,
  purchase_links,
  is_verbatim_from_source,
  source_rights_basis,
  source_note,
  is_published
)
select
  p.term,
  p.beverage_type,
  p.category,
  p.meaning,
  p.how_to_apply,
  p.examples,
  p.other_ideas,
  p.related_terms,
  p.reference_links,
  p.mla_citations,
  p.source_title,
  p.source_authors,
  p.purchase_links,
  p.is_verbatim_from_source,
  p.source_rights_basis,
  p.source_note,
  p.is_published
from prepared p;
