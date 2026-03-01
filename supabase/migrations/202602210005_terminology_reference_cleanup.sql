-- Cleanup migration:
-- 1) Remove redundant "In Open Studies" prefix from seeded meanings.
-- 2) Remove placeholder reference links and MLA citations.
-- 3) Keep entries citation-ready for future verified sources.

update public.terminology_entries
set meaning = regexp_replace(meaning, '^In Open Studies,\s*"', '"')
where meaning like 'In Open Studies,%';
update public.terminology_entries
set
  reference_links = '{}'::text[],
  mla_citations = '{}'::text[],
  source_note = coalesce(source_note, 'Original Open Studies editorial rewrite. Verified citations pending per term.')
where
  exists (
    select 1
    from unnest(reference_links) as link
    where link ilike '%investopedia%' or link ilike '%sipopedia%'
  )
  or exists (
    select 1
    from unnest(mla_citations) as citation
    where citation ilike '%investopedia%' or citation ilike '%sipopedia%'
  );
