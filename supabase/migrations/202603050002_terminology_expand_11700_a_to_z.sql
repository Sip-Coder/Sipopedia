-- Add 11,700 unique Sipopedia terms:
-- 26 letters x 50 terms per letter x 9 beverage types = 11,700.
-- Existing terms remain in place; this migration appends new entries.

with beverage_tracks as (
  select *
  from (
    values
      (
        'wine'::text,
        'Wine'::text,
        'WI'::text,
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
        'BE'::text,
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
        'SP'::text,
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
        'CO'::text,
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
        'TE'::text,
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
        'KO'::text,
        array['https://www.kombuchabrewers.org/', 'https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook']::text[],
        array[
          'Kombucha Brewers International. "KBI." Kombucha Brewers International, https://www.kombuchabrewers.org/. Accessed 5 Mar. 2026.',
          'U.S. Food and Drug Administration. "Foodborne Pathogenic Microorganisms and Natural Toxins Handbook." FDA, https://www.fda.gov/food/foodborne-pathogens/foodborne-pathogenic-microorganisms-and-natural-toxins-handbook. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://kombuchabrewers.org/'::text
      ),
      (
        'juice'::text,
        'Juice'::text,
        'JU'::text,
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
        'MI'::text,
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
        'WA'::text,
        array['https://www.bottledwater.org/', 'https://www.who.int/health-topics/water']::text[],
        array[
          'International Bottled Water Association. "IBWA." International Bottled Water Association, https://www.bottledwater.org/. Accessed 5 Mar. 2026.',
          'World Health Organization. "Water." WHO, https://www.who.int/health-topics/water. Accessed 5 Mar. 2026.'
        ]::text[],
        'https://www.bottledwater.org/'::text
      )
  ) as b(beverage_type, beverage_label, term_code, reference_links, mla_citations, purchase_link)
),
descriptor_bank as (
  select *
  from (
    values
      (1, 'Structured'::text, 'balance and shape control'::text),
      (2, 'Layered'::text, 'multi-stage sensory development'::text),
      (3, 'Focused'::text, 'precision in process targeting'::text),
      (4, 'Expressive'::text, 'high clarity in sensory signal'::text),
      (5, 'Integrated'::text, 'cohesion across aroma, flavor, and texture'::text),
      (6, 'Dynamic'::text, 'adaptive process behavior over time'::text),
      (7, 'Refined'::text, 'clean execution with minimal faults'::text),
      (8, 'Textural'::text, 'mouthfeel-oriented quality framing'::text),
      (9, 'Calibrated'::text, 'measurement-backed quality control'::text),
      (10, 'Nuanced'::text, 'fine-grained distinction in profile analysis'::text)
  ) as d(descriptor_rank, descriptor_word, descriptor_note)
),
dimension_bank as (
  select *
  from (
    values
      (1, 'Acidity'::text, 'acid structure management'::text, 'Lens'::text),
      (2, 'Aroma'::text, 'volatile expression and aromatic persistence'::text, 'Matrix'::text),
      (3, 'Texture'::text, 'body and mouthfeel behavior'::text, 'Framework'::text),
      (4, 'Fermentation'::text, 'biochemical conversion strategy'::text, 'Protocol'::text),
      (5, 'Origin'::text, 'site and sourcing context'::text, 'Atlas'::text)
  ) as m(dimension_rank, dimension_word, dimension_note, artifact_word)
),
letters as (
  select
    chr(code) as letter,
    code - ascii('A') + 1 as letter_rank
  from generate_series(ascii('A'), ascii('Z')) as code
),
combinations as (
  select
    b.beverage_type,
    b.beverage_label,
    b.term_code,
    b.reference_links,
    b.mla_citations,
    b.purchase_link,
    l.letter,
    l.letter_rank,
    d.descriptor_rank,
    d.descriptor_word,
    d.descriptor_note,
    m.dimension_rank,
    m.dimension_word,
    m.dimension_note,
    m.artifact_word,
    row_number() over (
      partition by b.beverage_type
      order by l.letter, d.descriptor_rank, m.dimension_rank
    ) as beverage_sequence
  from beverage_tracks b
  cross join letters l
  cross join descriptor_bank d
  cross join dimension_bank m
),
prepared as (
  select
    format(
      '%s%s %s %s %s',
      c.letter,
      c.term_code,
      c.descriptor_word,
      c.dimension_word,
      c.artifact_word
    ) as term,
    c.beverage_type,
    case ((c.letter_rank + c.descriptor_rank + c.dimension_rank) % 4)
      when 0 then 'location'
      when 1 then 'terroir'
      when 2 then 'variety of source ingredient'
      else 'production style'
    end as category,
    case ((c.letter_rank + c.descriptor_rank + c.dimension_rank) % 3)
      when 0 then format(
        '"%s%s %s %s %s" identifies a %s editorial concept for %s, centered on %s and %s.',
        c.letter,
        c.term_code,
        c.descriptor_word,
        c.dimension_word,
        c.artifact_word,
        c.dimension_word,
        c.beverage_label,
        c.descriptor_note,
        c.dimension_note
      )
      when 1 then format(
        '"%s%s %s %s %s" is used to describe a %s quality pattern in %s where %s guides decision-making.',
        c.letter,
        c.term_code,
        c.descriptor_word,
        c.dimension_word,
        c.artifact_word,
        c.dimension_word,
        c.beverage_label,
        c.dimension_note
      )
      else format(
        '"%s%s %s %s %s" captures how %s performance in %s is shaped by %s.',
        c.letter,
        c.term_code,
        c.descriptor_word,
        c.dimension_word,
        c.artifact_word,
        c.dimension_word,
        c.beverage_label,
        c.descriptor_note
      )
    end as meaning,
    case ((c.letter_rank + c.descriptor_rank + c.dimension_rank) % 2)
      when 0 then format(
        'Apply this term by documenting one %s workflow in %s, setting numeric checkpoints, and reviewing lot-to-lot consistency monthly.',
        lower(c.dimension_word),
        c.beverage_label
      )
      else format(
        'Use this term during tasting calibration for %s: define baseline %s targets, run comparative samples, and record corrective actions.',
        c.beverage_label,
        lower(c.dimension_word)
      )
    end as how_to_apply,
    array[
      format(
        'Production example: classify a %s batch under "%s%s %s %s %s" when %s metrics match team standards.',
        c.beverage_label,
        c.letter,
        c.term_code,
        c.descriptor_word,
        c.dimension_word,
        c.artifact_word,
        lower(c.dimension_word)
      ),
      format(
        'Training example: compare two %s samples and score differences in %s expression using the same rubric.',
        c.beverage_label,
        lower(c.dimension_word)
      )
    ]::text[] as examples,
    array[
      format(
        'Link this term to supplier and process logs so %s quality trends can be audited over time.',
        c.beverage_label
      ),
      format(
        'Pair "%s%s %s %s %s" with sensory panel notes to improve repeatability across production cycles.',
        c.letter,
        c.term_code,
        c.descriptor_word,
        c.dimension_word,
        c.artifact_word
      )
    ]::text[] as other_ideas,
    array[
      format('%s terroir mapping', c.beverage_label),
      format('%s aroma calibration', c.beverage_label),
      format('%s vinification and process control', c.beverage_label)
    ]::text[] as related_terms,
    c.reference_links,
    c.mla_citations,
    'Sip Studies Original Editorial Glossary Expansion v1'::text as source_title,
    array['Sip Studies Editorial Team']::text[] as source_authors,
    array[c.purchase_link]::text[] as purchase_links,
    false as is_verbatim_from_source,
    ''::text as source_rights_basis,
    format(
      'Generated editorial entry %s for %s. Original wording; no verbatim excerpts.',
      c.beverage_sequence,
      c.beverage_label
    ) as source_note,
    true as is_published
  from combinations c
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
