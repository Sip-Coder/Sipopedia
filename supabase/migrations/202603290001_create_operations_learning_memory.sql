create table if not exists public.operations_learning_memory (
  id uuid primary key default gen_random_uuid(),
  evaluation_payload jsonb not null default '{}'::jsonb,
  pricing_recommendations jsonb not null default '[]'::jsonb,
  content_roi_rankings jsonb not null default '[]'::jsonb,
  funnel_bottleneck_detection jsonb not null default '[]'::jsonb,
  dashboard_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists operations_learning_memory_created_at_idx
  on public.operations_learning_memory (created_at desc);

alter table public.operations_learning_memory enable row level security;

drop policy if exists "service role manages operations learning memory" on public.operations_learning_memory;
create policy "service role manages operations learning memory"
  on public.operations_learning_memory
  for all
  to service_role
  using (true)
  with check (true);

revoke all on table public.operations_learning_memory from anon, authenticated;
grant all on table public.operations_learning_memory to service_role;
