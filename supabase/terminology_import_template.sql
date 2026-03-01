-- Sip Studies terminology bulk import template.
-- Goal: load book-sourced entries into public.terminology_entries.
--
-- 1) Prepare a CSV with headers:
-- term,meaning,how_to_apply,examples,other_ideas,reference_links,mla_citations,source_title,source_authors,purchase_links,infographic_url,infographic_caption,source_note,is_published
--
-- 2) For array columns (examples, other_ideas, reference_links, mla_citations, source_authors, purchase_links), use JSON-style arrays in CSV:
-- ["Example 1","Example 2"]
-- reference_links, mla_citations, source_authors, and purchase_links must contain at least one item each.
-- source_title is required.
-- all entries must be original editorial writing (no verbatim excerpts).
--
-- 3) Import from Supabase SQL editor by creating staging table and upserting.

create temp table if not exists terminology_import_staging (
  term text,
  meaning text,
  how_to_apply text,
  examples jsonb,
  other_ideas jsonb,
  reference_links jsonb,
  mla_citations jsonb,
  source_title text,
  source_authors jsonb,
  purchase_links jsonb,
  infographic_url text,
  infographic_caption text,
  source_note text,
  is_published boolean
) on commit drop;

-- Example row (replace with COPY import or SQL insert batches):
insert into terminology_import_staging (
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
  infographic_url,
  infographic_caption,
  source_note,
  is_published
)
values (
  'Acidity',
  'Natural tartness in wine that contributes freshness, balance, and structure.',
  'Use it to evaluate balance against sweetness, tannin, and alcohol in tasting analysis.',
  '["High-acid Riesling tastes bright and lively","Low-acid wines can feel flat without structure"]'::jsonb,
  '["Compare acid profile across cool versus warm climates","Track acidity impact on food pairing"]'::jsonb,
  '["https://www.wsetglobal.com/media/11713/wset_l3_wines_specification_en_may2024.pdf"]'::jsonb,
  '["Wine & Spirit Education Trust. \\"Level 3 Award in Wines Specification.\\" WSET, 2024, https://www.wsetglobal.com/media/11713/wset_l3_wines_specification_en_may2024.pdf. Accessed 28 Feb. 2026."]'::jsonb,
  'WSET Level 3 Award in Wines',
  '["Wine & Spirit Education Trust"]'::jsonb,
  '["https://www.amazon.com/s?k=WSET+Level+3+Award+in+Wines"]'::jsonb,
  null,
  null,
  'Book/course-manual sourced entry with purchase link for contributor support.',
  true
);

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
  infographic_url,
  infographic_caption,
  source_note,
  is_published
)
select
  s.term,
  s.meaning,
  coalesce(s.how_to_apply, ''),
  coalesce(array(select jsonb_array_elements_text(coalesce(s.examples, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(s.other_ideas, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(s.reference_links, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(s.mla_citations, '[]'::jsonb))), '{}'),
  nullif(btrim(s.source_title), ''),
  coalesce(array(select jsonb_array_elements_text(coalesce(s.source_authors, '[]'::jsonb))), '{}'),
  coalesce(array(select jsonb_array_elements_text(coalesce(s.purchase_links, '[]'::jsonb))), '{}'),
  nullif(s.infographic_url, ''),
  nullif(s.infographic_caption, ''),
  nullif(s.source_note, ''),
  coalesce(s.is_published, true)
from terminology_import_staging s
where nullif(btrim(s.term), '') is not null
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
  infographic_url = excluded.infographic_url,
  infographic_caption = excluded.infographic_caption,
  source_note = excluded.source_note,
  is_published = excluded.is_published;

