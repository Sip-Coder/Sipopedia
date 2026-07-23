create extension if not exists pgcrypto;

create table if not exists public.beverage_taxonomy_graph (
  id uuid primary key default gen_random_uuid(),
  node_key text not null unique,
  term text not null,
  parent_node_key text null references public.beverage_taxonomy_graph(node_key) on delete set null,
  beverage_type text not null,
  level integer not null default 0,
  aliases text[] not null default '{}'::text[],
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_beverage_taxonomy_graph_parent_node_key
  on public.beverage_taxonomy_graph(parent_node_key);

create index if not exists idx_beverage_taxonomy_graph_beverage_type
  on public.beverage_taxonomy_graph(beverage_type);

create table if not exists public.taxonomy_learning_memory (
  id uuid primary key default gen_random_uuid(),
  term text not null,
  beverage_type text null,
  event_type text not null,
  classification_mistake boolean not null default false,
  source_reliability_updates jsonb not null default '[]'::jsonb,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_taxonomy_learning_memory_term
  on public.taxonomy_learning_memory(term);

create index if not exists idx_taxonomy_learning_memory_created_at
  on public.taxonomy_learning_memory(created_at desc);

create or replace function public.set_timestamp_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tr_beverage_taxonomy_graph_updated_at on public.beverage_taxonomy_graph;
create trigger tr_beverage_taxonomy_graph_updated_at
before update on public.beverage_taxonomy_graph
for each row execute procedure public.set_timestamp_updated_at();

alter table public.beverage_taxonomy_graph enable row level security;
alter table public.taxonomy_learning_memory enable row level security;

drop policy if exists "service role manages beverage taxonomy graph" on public.beverage_taxonomy_graph;
create policy "service role manages beverage taxonomy graph"
  on public.beverage_taxonomy_graph
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "service role manages taxonomy learning memory" on public.taxonomy_learning_memory;
create policy "service role manages taxonomy learning memory"
  on public.taxonomy_learning_memory
  for all
  to service_role
  using (true)
  with check (true);

revoke all on table public.beverage_taxonomy_graph from anon, authenticated;
revoke all on table public.taxonomy_learning_memory from anon, authenticated;
grant all on table public.beverage_taxonomy_graph to service_role;
grant all on table public.taxonomy_learning_memory to service_role;
