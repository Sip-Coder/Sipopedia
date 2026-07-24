create table if not exists public.article_user_states (
  user_id uuid not null references auth.users (id) on delete cascade,
  article_key text not null,
  surface text not null,
  article_id text not null,
  source_id text not null,
  source_name text not null,
  source_category text not null,
  title text not null,
  url text not null,
  published_at timestamptz,
  summary text not null default '',
  image_url text,
  is_read boolean not null default false,
  is_favorite boolean not null default false,
  read_at timestamptz,
  favorited_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, article_key),
  check (surface in ('beverage-news', 'flavor-blog')),
  check (octet_length(btrim(article_key)) between 1 and 700),
  check (length(btrim(article_id)) between 1 and 1024),
  check (length(btrim(source_id)) between 1 and 200),
  check (length(btrim(source_name)) between 1 and 200),
  check (length(btrim(source_category)) between 1 and 160),
  check (length(btrim(title)) between 1 and 500),
  check (length(url) between 1 and 2048 and url ~* '^https?://'),
  check (length(summary) <= 4000),
  check (
    image_url is null
    or (
      length(image_url) <= 2048
      and (image_url ~* '^https?://' or image_url ~ '^/[^/]')
    )
  ),
  check ((is_read and read_at is not null) or (not is_read and read_at is null)),
  check ((is_favorite and favorited_at is not null) or (not is_favorite and favorited_at is null))
);

create index if not exists article_user_states_surface_published_idx
  on public.article_user_states (user_id, surface, published_at desc);

create index if not exists article_user_states_unread_idx
  on public.article_user_states (user_id, published_at desc)
  where not is_read and is_favorite;

create index if not exists article_user_states_favorites_idx
  on public.article_user_states (user_id, favorited_at desc)
  where is_favorite;

create or replace function public.set_article_user_state_timestamps()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' then
    if new.user_id is distinct from old.user_id then
      raise exception 'Article state owner is immutable.' using errcode = '22023';
    end if;
    if new.article_key is distinct from old.article_key then
      raise exception 'Article state key is immutable.' using errcode = '22023';
    end if;
    new.created_at := old.created_at;
  end if;

  if new.is_read then
    if tg_op = 'INSERT' then
      new.read_at := coalesce(new.read_at, pg_catalog.now());
    elsif old.is_read is distinct from true then
      new.read_at := coalesce(new.read_at, pg_catalog.now());
    end if;
  else
    new.read_at := null;
  end if;

  if new.is_favorite then
    if tg_op = 'INSERT' then
      new.favorited_at := coalesce(new.favorited_at, pg_catalog.now());
    elsif old.is_favorite is distinct from true then
      new.favorited_at := coalesce(new.favorited_at, pg_catalog.now());
    end if;
  else
    new.favorited_at := null;
  end if;

  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

drop trigger if exists set_article_user_state_timestamps on public.article_user_states;
create trigger set_article_user_state_timestamps
  before insert or update on public.article_user_states
  for each row execute function public.set_article_user_state_timestamps();

alter table public.article_user_states enable row level security;

revoke all on table public.article_user_states from public, anon, authenticated;
grant select, insert, update, delete on table public.article_user_states to authenticated;
grant all on table public.article_user_states to service_role;

drop policy if exists "Users read their own article states" on public.article_user_states;
create policy "Users read their own article states"
  on public.article_user_states
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users create their own article states" on public.article_user_states;
create policy "Users create their own article states"
  on public.article_user_states
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users update their own article states" on public.article_user_states;
create policy "Users update their own article states"
  on public.article_user_states
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete their own article states" on public.article_user_states;
create policy "Users delete their own article states"
  on public.article_user_states
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on function public.set_article_user_state_timestamps() from public, anon, authenticated;
grant execute on function public.set_article_user_state_timestamps() to service_role;

insert into public.site_page_statuses (route, room, status)
values ('app/favorites', 'Game', 'public')
on conflict (route) do nothing;
