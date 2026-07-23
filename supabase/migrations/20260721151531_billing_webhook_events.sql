create table if not exists public.billing_webhook_events (
  event_id text primary key,
  provider text not null default 'stripe',
  received_at timestamptz not null default now()
);

create index if not exists billing_webhook_events_received_at_idx
  on public.billing_webhook_events (received_at desc);

alter table public.billing_webhook_events enable row level security;

drop policy if exists "service role manages billing webhook events" on public.billing_webhook_events;
create policy "service role manages billing webhook events"
  on public.billing_webhook_events
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
