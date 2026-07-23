create table if not exists public.site_page_statuses (
  route text primary key,
  room text not null check (room in ('Lobby', 'Game', 'Boss')),
  status text not null check (status in ('public', 'edit', 'off')),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

alter table public.site_page_statuses enable row level security;

grant select on table public.site_page_statuses to anon, authenticated;
grant select, insert, update, delete on table public.site_page_statuses to service_role;
grant insert, update, delete on table public.site_page_statuses to authenticated;

drop policy if exists "Published site map is publicly readable" on public.site_page_statuses;
create policy "Published site map is publicly readable"
  on public.site_page_statuses
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert site map entries" on public.site_page_statuses;
create policy "Admins can insert site map entries"
  on public.site_page_statuses
  for insert
  to authenticated
  with check ((select private.current_user_is_admin()));

drop policy if exists "Admins can update site map entries" on public.site_page_statuses;
create policy "Admins can update site map entries"
  on public.site_page_statuses
  for update
  to authenticated
  using ((select private.current_user_is_admin()))
  with check ((select private.current_user_is_admin()));

drop policy if exists "Admins can delete site map entries" on public.site_page_statuses;
create policy "Admins can delete site map entries"
  on public.site_page_statuses
  for delete
  to authenticated
  using ((select private.current_user_is_admin()));

insert into public.site_page_statuses (route, room, status)
values
  ('home', 'Lobby', 'public'),
  ('pricing', 'Lobby', 'public'),
  ('support', 'Lobby', 'public'),
  ('study-paths', 'Lobby', 'public'),
  ('checkout', 'Lobby', 'public'),
  ('powerful-point', 'Lobby', 'public'),
  ('login', 'Lobby', 'public'),
  ('account', 'Lobby', 'public'),
  ('account/avatar', 'Lobby', 'public'),
  ('logout', 'Lobby', 'public'),
  ('terms', 'Lobby', 'public'),
  ('privacy', 'Lobby', 'public'),
  ('refund', 'Lobby', 'public'),
  ('success', 'Lobby', 'public'),
  ('cancel', 'Lobby', 'public'),
  ('app/starter', 'Lobby', 'public'),
  ('app/sip-academy', 'Game', 'public'),
  ('app/sip-game', 'Game', 'public'),
  ('app/sipopedia', 'Game', 'public'),
  ('app/beverage-quiz', 'Game', 'public'),
  ('app/study-sheets', 'Game', 'public'),
  ('app/service-roleplay', 'Game', 'public'),
  ('app/regions', 'Game', 'public'),
  ('app/maps', 'Game', 'public'),
  ('app/grapes', 'Game', 'public'),
  ('app/cocktails', 'Game', 'public'),
  ('app/resources', 'Game', 'public'),
  ('app/flavor-wheel', 'Game', 'public'),
  ('app/cellar-scanner', 'Game', 'public'),
  ('app/tasting-journal', 'Game', 'public'),
  ('app/flavors', 'Game', 'public'),
  ('app/beverage-news', 'Game', 'public'),
  ('app/flavor-blog', 'Game', 'public'),
  ('app/ai-winecast', 'Game', 'public'),
  ('app/tasting-groups', 'Game', 'public'),
  ('app/ai-news', 'Game', 'public'),
  ('app/somm-events', 'Game', 'public'),
  ('admin', 'Boss', 'edit'),
  ('admin/terminology', 'Boss', 'edit')
on conflict (route) do nothing;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'site_page_statuses'
  ) then
    alter publication supabase_realtime add table public.site_page_statuses;
  end if;
end
$$;
