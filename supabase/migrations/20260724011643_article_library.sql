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
  read_state_updated_at timestamptz,
  favorite_state_updated_at timestamptz,
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
  check ((is_favorite and favorited_at is not null) or (not is_favorite and favorited_at is null)),
  check (not is_read or read_state_updated_at is not null),
  check (not is_favorite or favorite_state_updated_at is not null)
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
declare
  v_now timestamptz := pg_catalog.clock_timestamp();
begin
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, v_now);
    new.updated_at := coalesce(new.updated_at, v_now);

    if new.is_read then
      new.read_state_updated_at :=
        coalesce(new.read_state_updated_at, new.read_at, new.updated_at, v_now);
      new.read_at := coalesce(new.read_at, new.read_state_updated_at);
    else
      new.read_at := null;
    end if;

    if new.is_favorite then
      new.favorite_state_updated_at :=
        coalesce(new.favorite_state_updated_at, new.favorited_at, new.updated_at, v_now);
      new.favorited_at := coalesce(new.favorited_at, new.favorite_state_updated_at);
    else
      new.favorited_at := null;
    end if;

    new.updated_at := greatest(
      new.updated_at,
      coalesce(new.read_state_updated_at, new.updated_at),
      coalesce(new.favorite_state_updated_at, new.updated_at)
    );
    return new;
  end if;

  if new.user_id is distinct from old.user_id then
    raise exception 'Article state owner is immutable.' using errcode = '22023';
  end if;
  if new.article_key is distinct from old.article_key then
    raise exception 'Article state key is immutable.' using errcode = '22023';
  end if;
  new.created_at := old.created_at;

  if new.is_read is distinct from old.is_read or new.read_at is distinct from old.read_at then
    if
      new.read_state_updated_at is null
      or (
        old.read_state_updated_at is not null
        and new.read_state_updated_at <= old.read_state_updated_at
      )
    then
      new.read_state_updated_at := greatest(
        v_now,
        coalesce(old.read_state_updated_at, '-infinity'::timestamptz) + interval '1 microsecond'
      );
    end if;
  elsif
    new.read_state_updated_at is null
    or (
      old.read_state_updated_at is not null
      and new.read_state_updated_at < old.read_state_updated_at
    )
  then
    new.read_state_updated_at := old.read_state_updated_at;
  end if;

  if new.is_favorite is distinct from old.is_favorite or new.favorited_at is distinct from old.favorited_at then
    if
      new.favorite_state_updated_at is null
      or (
        old.favorite_state_updated_at is not null
        and new.favorite_state_updated_at <= old.favorite_state_updated_at
      )
    then
      new.favorite_state_updated_at := greatest(
        v_now,
        coalesce(old.favorite_state_updated_at, '-infinity'::timestamptz) + interval '1 microsecond'
      );
    end if;
  elsif
    new.favorite_state_updated_at is null
    or (
      old.favorite_state_updated_at is not null
      and new.favorite_state_updated_at < old.favorite_state_updated_at
    )
  then
    new.favorite_state_updated_at := old.favorite_state_updated_at;
  end if;

  if new.is_read then
    new.read_at := coalesce(new.read_at, old.read_at, new.read_state_updated_at, v_now);
  else
    new.read_at := null;
  end if;

  if new.is_favorite then
    new.favorited_at :=
      coalesce(new.favorited_at, old.favorited_at, new.favorite_state_updated_at, v_now);
  else
    new.favorited_at := null;
  end if;

  new.updated_at := greatest(
    coalesce(new.updated_at, v_now),
    old.updated_at,
    coalesce(new.read_state_updated_at, old.updated_at),
    coalesce(new.favorite_state_updated_at, old.updated_at)
  );
  return new;
end;
$$;

drop trigger if exists set_article_user_state_timestamps on public.article_user_states;
create trigger set_article_user_state_timestamps
  before insert or update on public.article_user_states
  for each row execute function public.set_article_user_state_timestamps();

alter table public.article_user_states enable row level security;
alter table public.article_user_states force row level security;

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

create or replace function public.merge_article_user_state(p_state jsonb)
returns setof public.article_user_states
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then
    raise exception 'Authentication is required.' using errcode = '42501';
  end if;
  if p_state is null or pg_catalog.jsonb_typeof(p_state) is distinct from 'object' then
    raise exception 'Article state must be a JSON object.' using errcode = '22023';
  end if;

  return query
  insert into public.article_user_states as current_state (
    user_id,
    article_key,
    surface,
    article_id,
    source_id,
    source_name,
    source_category,
    title,
    url,
    published_at,
    summary,
    image_url,
    is_read,
    is_favorite,
    read_at,
    favorited_at,
    read_state_updated_at,
    favorite_state_updated_at,
    created_at,
    updated_at
  )
  values (
    v_user_id,
    p_state ->> 'article_key',
    p_state ->> 'surface',
    p_state ->> 'article_id',
    p_state ->> 'source_id',
    p_state ->> 'source_name',
    p_state ->> 'source_category',
    p_state ->> 'title',
    p_state ->> 'url',
    nullif(p_state ->> 'published_at', '')::timestamptz,
    coalesce(p_state ->> 'summary', ''),
    nullif(p_state ->> 'image_url', ''),
    coalesce((p_state ->> 'is_read')::boolean, false),
    coalesce((p_state ->> 'is_favorite')::boolean, false),
    nullif(p_state ->> 'read_at', '')::timestamptz,
    nullif(p_state ->> 'favorited_at', '')::timestamptz,
    nullif(p_state ->> 'read_state_updated_at', '')::timestamptz,
    nullif(p_state ->> 'favorite_state_updated_at', '')::timestamptz,
    coalesce(nullif(p_state ->> 'created_at', '')::timestamptz, pg_catalog.now()),
    coalesce(nullif(p_state ->> 'updated_at', '')::timestamptz, pg_catalog.now())
  )
  on conflict (user_id, article_key) do update
  set
    surface = case
      when excluded.updated_at > current_state.updated_at then excluded.surface
      else current_state.surface
    end,
    article_id = case
      when excluded.updated_at > current_state.updated_at then excluded.article_id
      else current_state.article_id
    end,
    source_id = case
      when excluded.updated_at > current_state.updated_at then excluded.source_id
      else current_state.source_id
    end,
    source_name = case
      when excluded.updated_at > current_state.updated_at then excluded.source_name
      else current_state.source_name
    end,
    source_category = case
      when excluded.updated_at > current_state.updated_at then excluded.source_category
      else current_state.source_category
    end,
    title = case
      when excluded.updated_at > current_state.updated_at then excluded.title
      else current_state.title
    end,
    url = case
      when excluded.updated_at > current_state.updated_at then excluded.url
      else current_state.url
    end,
    published_at = case
      when excluded.updated_at > current_state.updated_at then excluded.published_at
      else current_state.published_at
    end,
    summary = case
      when excluded.updated_at > current_state.updated_at then excluded.summary
      else current_state.summary
    end,
    image_url = case
      when excluded.updated_at > current_state.updated_at then excluded.image_url
      else current_state.image_url
    end,
    is_read = case
      when
        (
          excluded.read_state_updated_at is not null
          and current_state.read_state_updated_at is null
        )
        or excluded.read_state_updated_at > current_state.read_state_updated_at
        or (
          excluded.read_state_updated_at = current_state.read_state_updated_at
          and current_state.is_read
          and not excluded.is_read
        )
      then excluded.is_read
      else current_state.is_read
    end,
    read_at = case
      when
        (
          excluded.read_state_updated_at is not null
          and current_state.read_state_updated_at is null
        )
        or excluded.read_state_updated_at > current_state.read_state_updated_at
        or (
          excluded.read_state_updated_at = current_state.read_state_updated_at
          and current_state.is_read
          and not excluded.is_read
        )
      then excluded.read_at
      else current_state.read_at
    end,
    read_state_updated_at = case
      when
        (
          excluded.read_state_updated_at is not null
          and current_state.read_state_updated_at is null
        )
        or excluded.read_state_updated_at > current_state.read_state_updated_at
        or (
          excluded.read_state_updated_at = current_state.read_state_updated_at
          and current_state.is_read
          and not excluded.is_read
        )
      then excluded.read_state_updated_at
      else current_state.read_state_updated_at
    end,
    is_favorite = case
      when
        (
          excluded.favorite_state_updated_at is not null
          and current_state.favorite_state_updated_at is null
        )
        or excluded.favorite_state_updated_at > current_state.favorite_state_updated_at
        or (
          excluded.favorite_state_updated_at = current_state.favorite_state_updated_at
          and current_state.is_favorite
          and not excluded.is_favorite
        )
      then excluded.is_favorite
      else current_state.is_favorite
    end,
    favorited_at = case
      when
        (
          excluded.favorite_state_updated_at is not null
          and current_state.favorite_state_updated_at is null
        )
        or excluded.favorite_state_updated_at > current_state.favorite_state_updated_at
        or (
          excluded.favorite_state_updated_at = current_state.favorite_state_updated_at
          and current_state.is_favorite
          and not excluded.is_favorite
        )
      then excluded.favorited_at
      else current_state.favorited_at
    end,
    favorite_state_updated_at = case
      when
        (
          excluded.favorite_state_updated_at is not null
          and current_state.favorite_state_updated_at is null
        )
        or excluded.favorite_state_updated_at > current_state.favorite_state_updated_at
        or (
          excluded.favorite_state_updated_at = current_state.favorite_state_updated_at
          and current_state.is_favorite
          and not excluded.is_favorite
        )
      then excluded.favorite_state_updated_at
      else current_state.favorite_state_updated_at
    end,
    updated_at = greatest(current_state.updated_at, excluded.updated_at)
  returning current_state.*;
end;
$$;

revoke all on function public.merge_article_user_state(jsonb) from public, anon, authenticated;
grant execute on function public.merge_article_user_state(jsonb) to authenticated;
grant execute on function public.merge_article_user_state(jsonb) to service_role;

insert into public.site_page_statuses (route, room, status)
values ('app/favorites', 'Game', 'public')
on conflict (route) do nothing;

create table if not exists public.article_user_preferences (
  user_id uuid not null references auth.users (id) on delete cascade,
  surface text not null,
  preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, surface),
  constraint article_user_preferences_surface_check
    check (surface in ('beverage-news', 'flavor-blog', 'favorites')),
  constraint article_user_preferences_object_check
    check (jsonb_typeof(preferences) = 'object'),
  constraint article_user_preferences_size_check
    check (octet_length(preferences::text) <= 32768)
);

create or replace function public.enforce_article_user_preference_lww()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' then
    if new.user_id is distinct from old.user_id then
      raise exception 'Article preference owner is immutable.' using errcode = '22023';
    end if;
    if new.surface is distinct from old.surface then
      raise exception 'Article preference surface is immutable.' using errcode = '22023';
    end if;

    -- Each surface is an independent last-write-wins register. A delayed
    -- offline save must not overwrite a newer save from another device.
    if new.updated_at <= old.updated_at then
      return old;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_article_user_preference_lww on public.article_user_preferences;
create trigger enforce_article_user_preference_lww
  before update on public.article_user_preferences
  for each row execute function public.enforce_article_user_preference_lww();

alter table public.article_user_preferences enable row level security;
alter table public.article_user_preferences force row level security;

revoke all on table public.article_user_preferences from public, anon, authenticated;
grant select, insert, update, delete on table public.article_user_preferences to authenticated;
grant all on table public.article_user_preferences to service_role;

drop policy if exists "Users read their own article preferences" on public.article_user_preferences;
create policy "Users read their own article preferences"
  on public.article_user_preferences
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users create their own article preferences" on public.article_user_preferences;
create policy "Users create their own article preferences"
  on public.article_user_preferences
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users update their own article preferences" on public.article_user_preferences;
create policy "Users update their own article preferences"
  on public.article_user_preferences
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete their own article preferences" on public.article_user_preferences;
create policy "Users delete their own article preferences"
  on public.article_user_preferences
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on function public.enforce_article_user_preference_lww() from public, anon, authenticated;
grant execute on function public.enforce_article_user_preference_lww() to service_role;
