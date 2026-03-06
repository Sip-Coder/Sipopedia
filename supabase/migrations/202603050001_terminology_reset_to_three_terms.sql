-- Ensure terminology structure is compatible with Sipopedia detail queries,
-- then reset data to three starter entries.

alter table public.terminology_entries
  add column if not exists source_title text not null default '';
alter table public.terminology_entries
  add column if not exists source_authors text[] not null default '{}';
alter table public.terminology_entries
  add column if not exists purchase_links text[] not null default '{}';
alter table public.terminology_entries
  add column if not exists is_verbatim_from_source boolean not null default false;
alter table public.terminology_entries
  add column if not exists source_rights_basis text not null default '';

alter table public.terminology_entries
  add column if not exists beverage_type text not null default 'wine';
alter table public.terminology_entries
  add column if not exists category text not null default 'production style';
alter table public.terminology_entries
  add column if not exists related_terms text[] not null default '{}';

delete from public.terminology_entries;

alter table public.terminology_entries
  drop constraint if exists terminology_entries_reference_links_required;
alter table public.terminology_entries
  add constraint terminology_entries_reference_links_required
  check (cardinality(reference_links) > 0);

alter table public.terminology_entries
  drop constraint if exists terminology_entries_mla_citations_required;
alter table public.terminology_entries
  add constraint terminology_entries_mla_citations_required
  check (cardinality(mla_citations) > 0);

alter table public.terminology_entries
  drop constraint if exists terminology_entries_source_title_required;
alter table public.terminology_entries
  add constraint terminology_entries_source_title_required
  check (btrim(source_title) <> '');

alter table public.terminology_entries
  drop constraint if exists terminology_entries_source_authors_required;
alter table public.terminology_entries
  add constraint terminology_entries_source_authors_required
  check (cardinality(source_authors) > 0);

alter table public.terminology_entries
  drop constraint if exists terminology_entries_purchase_links_required;
alter table public.terminology_entries
  add constraint terminology_entries_purchase_links_required
  check (cardinality(purchase_links) > 0);

alter table public.terminology_entries
  drop constraint if exists terminology_entries_verbatim_rights_required;
alter table public.terminology_entries
  drop constraint if exists terminology_entries_no_verbatim_only;
alter table public.terminology_entries
  add constraint terminology_entries_no_verbatim_only
  check (is_verbatim_from_source = false);

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
values
  (
    'Terroir',
    'wine',
    'terroir',
    'Terroir is the combined influence of site conditions and local practice on how a wine expresses flavor, texture, and structure.',
    'Use terroir to compare wines from the same grape across different sites, then isolate how climate, soil, and exposure shift the tasting profile.',
    array[
      'A cool hillside Chardonnay often shows tighter acidity and citrus-driven shape than the same grape from a warmer valley floor.',
      'Two Pinot Noirs vinified similarly can diverge in body and aroma when grown on different soil and elevation profiles.'
    ]::text[],
    array[
      'Map slope, sunlight, and drainage as part of tasting notes.',
      'Pair terroir analysis with vintage conditions to avoid oversimplifying site impact.'
    ]::text[],
    array['Aroma', 'Vinification']::text[],
    array['https://www.oiv.int/']::text[],
    array[
      'International Organisation of Vine and Wine. "OIV." OIV, https://www.oiv.int/. Accessed 5 Mar. 2026.'
    ]::text[],
    'Sip Studies Original Editorial Glossary v1',
    array['Sip Studies Editorial Team']::text[],
    array['https://www.wsetglobal.com/shop/']::text[],
    false,
    '',
    'Original Sipopedia editorial rewrite. No verbatim source text.',
    true
  ),
  (
    'Aroma',
    'wine',
    'terroir',
    'Aroma is the set of scents perceived through the nose and retronasal pathway that helps identify grape character, fermentation traits, and maturity.',
    'Evaluate aroma in layers: first intensity, then family (fruit, floral, spice, savory), then whether notes align with grape, site, and cellar handling.',
    array[
      'A young Sauvignon Blanc may show high-intensity citrus and herb notes before palate analysis confirms style.',
      'In aged red wine, tertiary aromas like dried leaves or cedar can indicate bottle development.'
    ]::text[],
    array[
      'Use consistent glassware and serving temperature to improve aroma comparison.',
      'Separate aroma observations from flavor conclusions to reduce tasting bias.'
    ]::text[],
    array['Terroir', 'Vinification']::text[],
    array['https://www.wsetglobal.com/']::text[],
    array[
      'WSET. "Wine & Spirit Education Trust." WSET Global, https://www.wsetglobal.com/. Accessed 5 Mar. 2026.'
    ]::text[],
    'Sip Studies Original Editorial Glossary v1',
    array['Sip Studies Editorial Team']::text[],
    array['https://www.amazon.com/Wine-Bible-Karen-MacNeil/dp/1523513969']::text[],
    false,
    '',
    'Original Sipopedia editorial rewrite. No verbatim source text.',
    true
  ),
  (
    'Vinification',
    'wine',
    'production style',
    'Vinification is the controlled sequence of winemaking decisions that transforms harvested grapes into a finished wine style.',
    'Track vinification as a decision chain: crush strategy, fermentation parameters, extraction management, maturation vessel, and finishing choices.',
    array[
      'Choosing whole-cluster fermentation can increase aromatic lift and structural grip in some red wines.',
      'A stainless-steel, low-oxygen approach often preserves primary fruit character in aromatic whites.'
    ]::text[],
    array[
      'Connect vinification choices to target market style and intended aging window.',
      'Document each cellar intervention to improve year-over-year consistency.'
    ]::text[],
    array['Terroir', 'Aroma']::text[],
    array['https://www.guildsomm.com/']::text[],
    array[
      'GuildSomm. "GuildSomm." GuildSomm, https://www.guildsomm.com/. Accessed 5 Mar. 2026.'
    ]::text[],
    'Sip Studies Original Editorial Glossary v1',
    array['Sip Studies Editorial Team']::text[],
    array['https://www.amazon.com/World-Atlas-Wine-8th/dp/1784726184']::text[],
    false,
    '',
    'Original Sipopedia editorial rewrite. No verbatim source text.',
    true
  );
