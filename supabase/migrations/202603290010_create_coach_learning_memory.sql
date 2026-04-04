create table if not exists public.coach_learning_memory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id text not null,
  overall_accuracy numeric(6, 4) not null default 0,
  improvement_delta numeric(7, 4) not null default 0,
  accuracy jsonb not null default '{}'::jsonb,
  descriptor_analysis jsonb not null default '{}'::jsonb,
  progression jsonb not null default '{}'::jsonb,
  strategy text not null check (strategy in ('structure-first', 'region-first', 'variety-first', 'sensorial-first')),
  feedback_format text not null check (feedback_format in ('short feedback', 'long feedback', 'comparative feedback', 'anchor-based feedback')),
  feedback_performance jsonb not null default '{}'::jsonb,
  region_performance jsonb not null default '{}'::jsonb,
  raw_session jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, session_id)
);

create index if not exists coach_learning_memory_user_created_idx
  on public.coach_learning_memory (user_id, created_at desc);

alter table public.coach_learning_memory enable row level security;

drop policy if exists "users read own coach learning memory" on public.coach_learning_memory;
create policy "users read own coach learning memory"
  on public.coach_learning_memory
  for select
  using (auth.uid() = user_id);

drop policy if exists "users insert own coach learning memory" on public.coach_learning_memory;
create policy "users insert own coach learning memory"
  on public.coach_learning_memory
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "users update own coach learning memory" on public.coach_learning_memory;
create policy "users update own coach learning memory"
  on public.coach_learning_memory
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
