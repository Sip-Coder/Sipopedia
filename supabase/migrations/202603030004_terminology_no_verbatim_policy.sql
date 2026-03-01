-- Enforce original editorial writing only: no verbatim source excerpts.

update public.terminology_entries
set
  is_verbatim_from_source = false,
  source_rights_basis = '';

alter table public.terminology_entries
  drop constraint if exists terminology_entries_verbatim_rights_required;

alter table public.terminology_entries
  drop constraint if exists terminology_entries_no_verbatim_only;
alter table public.terminology_entries
  add constraint terminology_entries_no_verbatim_only
  check (is_verbatim_from_source = false);
