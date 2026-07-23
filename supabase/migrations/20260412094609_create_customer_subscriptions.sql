create table if not exists public.customer_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  provider text not null default 'stripe',
  provider_customer_id text,
  provider_subscription_id text,
  plan_code text not null default 'pro_monthly',
  status text not null default 'incomplete' check (
    status in ('trialing', 'active', 'past_due', 'unpaid', 'canceled', 'incomplete', 'incomplete_expired')
  ),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_subscription_id)
);

create index if not exists customer_subscriptions_user_idx
  on public.customer_subscriptions (user_id, updated_at desc);

create index if not exists customer_subscriptions_status_idx
  on public.customer_subscriptions (status, current_period_end desc);

create or replace function public.set_customer_subscriptions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists set_customer_subscriptions_updated_at on public.customer_subscriptions;
create trigger set_customer_subscriptions_updated_at
  before update on public.customer_subscriptions
  for each row execute procedure public.set_customer_subscriptions_updated_at();

alter table public.customer_subscriptions enable row level security;

drop policy if exists "users read own subscriptions" on public.customer_subscriptions;
create policy "users read own subscriptions"
  on public.customer_subscriptions
  for select
  using (auth.uid() = user_id);

drop policy if exists "service role manages subscriptions" on public.customer_subscriptions;
create policy "service role manages subscriptions"
  on public.customer_subscriptions
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "admins read all subscriptions" on public.customer_subscriptions;
create policy "admins read all subscriptions"
  on public.customer_subscriptions
  for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

