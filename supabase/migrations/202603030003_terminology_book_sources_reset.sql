-- Reset terminology catalog and enforce book-source attribution + purchase links.

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

delete from public.terminology_entries;

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
  add constraint terminology_entries_verbatim_rights_required
  check ((not is_verbatim_from_source) or btrim(source_rights_basis) <> '');
