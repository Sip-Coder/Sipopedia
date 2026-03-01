-- Rebrand existing data from Open Studies to Sip Studies in already-seeded environments.

update public.terminology_entries
set source_note = replace(source_note, 'Open Studies', 'Sip Studies')
where source_note ilike '%Open Studies%';
update public.terminology_entries
set meaning = replace(meaning, 'Open Studies', 'Sip Studies')
where meaning ilike '%Open Studies%';
update public.terminology_entries
set how_to_apply = replace(how_to_apply, 'Open Studies', 'Sip Studies')
where how_to_apply ilike '%Open Studies%';
update public.terminology_entries
set examples = array(
  select replace(item, 'Open Studies', 'Sip Studies')
  from unnest(examples) as item
)
where exists (
  select 1
  from unnest(examples) as item
  where item ilike '%Open Studies%'
);
update public.terminology_entries
set other_ideas = array(
  select replace(item, 'Open Studies', 'Sip Studies')
  from unnest(other_ideas) as item
)
where exists (
  select 1
  from unnest(other_ideas) as item
  where item ilike '%Open Studies%'
);
