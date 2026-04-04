create table if not exists public.terminology_learning_memory (
  id uuid primary key default gen_random_uuid(),
  batch_id text not null,
  beverage_type text not null,
  letter text not null,
  batch_size integer not null default 1,
  record_type text not null check (record_type in ('batch_summary', 'failure_pattern')),
  weak_definition_patterns jsonb not null default '[]'::jsonb,
  duplicate_structures jsonb not null default '[]'::jsonb,
  citation_failures jsonb not null default '[]'::jsonb,
  taxonomy_misplacements jsonb not null default '[]'::jsonb,
  reading_level_drift jsonb not null default '[]'::jsonb,
  generation_constraints jsonb not null default '{}'::jsonb,
  evaluation_metrics jsonb not null default '{}'::jsonb,
  improvement_deltas jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists terminology_learning_memory_created_at_idx
  on public.terminology_learning_memory (created_at desc);

create index if not exists terminology_learning_memory_batch_idx
  on public.terminology_learning_memory (batch_id, created_at desc);

create index if not exists terminology_learning_memory_type_idx
  on public.terminology_learning_memory (record_type, beverage_type, created_at desc);

