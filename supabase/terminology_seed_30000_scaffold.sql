-- Optional load-test seed.
-- Creates 30,000 scaffold terms so you can validate pagination, sorting (# + A-Z), and modal performance.
-- Replace scaffold text with curated source-backed definitions before production release.
-- Note: reference_links, mla_citations, source_title, source_authors, and purchase_links are required fields.

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
  case
    when gs <= 3000 then gs::text || 'D AI Concept ' || lpad(gs::text, 5, '0')
    else chr(65 + ((gs - 3001) % 26)) || 'I Term ' || lpad(gs::text, 5, '0')
  end as term,
  'Scaffold meaning for term #' || gs || '. Rewrite with original encyclopedia-quality definition.' as meaning,
  'Scaffold apply guidance for term #' || gs || '. Replace with practical use instructions.' as how_to_apply,
  array[
    'Scaffold example A for term #' || gs,
    'Scaffold example B for term #' || gs
  ] as examples,
  array[
    'Scaffold related idea 1 for term #' || gs,
    'Scaffold related idea 2 for term #' || gs
  ] as other_ideas,
  array[
    'https://www.wsetglobal.com/media/11713/wset_l3_wines_specification_en_may2024.pdf'
  ]::text[] as reference_links,
  array[
    'Wine & Spirit Education Trust. "Level 3 Award in Wines Specification." WSET, 2024, https://www.wsetglobal.com/media/11713/wset_l3_wines_specification_en_may2024.pdf. Accessed 28 Feb. 2026.'
  ]::text[] as mla_citations,
  'WSET Level 3 Award in Wines' as source_title,
  array['Wine & Spirit Education Trust']::text[] as source_authors,
  array['https://www.amazon.com/s?k=WSET+Level+3+Award+in+Wines']::text[] as purchase_links,
  'Scaffold row generated for scale testing. Replace content and citations before publication.' as source_note,
  false as is_published
from generate_series(1, 30000) as gs
on conflict (term) do nothing;
