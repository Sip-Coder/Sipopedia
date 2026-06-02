create table if not exists public.tasting_group_posts (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.tasting_groups (id) on delete cascade,
  author_user_id uuid not null references auth.users (id) on delete cascade,
  parent_post_id uuid references public.tasting_group_posts (id) on delete cascade,
  body text not null,
  post_type text not null default 'discussion',
  moderation_status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (length(btrim(body)) between 4 and 1000),
  check (post_type in ('discussion', 'tasting_note', 'announcement', 'question')),
  check (moderation_status in ('published', 'flagged', 'hidden')),
  check (id <> parent_post_id)
);

create index if not exists tasting_group_posts_group_created_idx
  on public.tasting_group_posts (group_id, created_at desc);

create index if not exists tasting_group_posts_parent_idx
  on public.tasting_group_posts (parent_post_id, created_at);

create index if not exists tasting_group_posts_author_idx
  on public.tasting_group_posts (author_user_id, created_at desc);

create index if not exists tasting_group_posts_moderation_idx
  on public.tasting_group_posts (group_id, moderation_status, updated_at desc);

create or replace function public.validate_tasting_group_post_parent()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  parent_group_id uuid;
begin
  if new.parent_post_id is null then
    return new;
  end if;

  select posts.group_id
    into parent_group_id
  from public.tasting_group_posts posts
  where posts.id = new.parent_post_id;

  if parent_group_id is null then
    raise exception 'Parent post does not exist.';
  end if;

  if parent_group_id <> new.group_id then
    raise exception 'Replies must belong to the same tasting group as their parent post.';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_tasting_group_post_parent on public.tasting_group_posts;
create trigger validate_tasting_group_post_parent
  before insert or update of group_id, parent_post_id on public.tasting_group_posts
  for each row execute function public.validate_tasting_group_post_parent();

drop trigger if exists set_tasting_group_posts_updated_at on public.tasting_group_posts;
create trigger set_tasting_group_posts_updated_at
  before update on public.tasting_group_posts
  for each row execute function public.set_tasting_groups_updated_at();

grant usage on schema private to authenticated, service_role;

create or replace function private.current_user_hosts_tasting_group(tasting_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tasting_groups groups
    where groups.id = tasting_group_id
      and groups.host_user_id = (select auth.uid())
  );
$$;

create or replace function private.current_user_can_post_to_tasting_group(tasting_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select (select private.current_user_hosts_tasting_group(tasting_group_id))
  or exists (
    select 1
    from public.tasting_group_memberships memberships
    where memberships.group_id = tasting_group_id
      and memberships.user_id = (select auth.uid())
      and memberships.status = 'active'
  );
$$;

revoke all on function private.current_user_hosts_tasting_group(uuid) from public;
revoke all on function private.current_user_can_post_to_tasting_group(uuid) from public;
grant execute on function private.current_user_hosts_tasting_group(uuid) to authenticated, service_role;
grant execute on function private.current_user_can_post_to_tasting_group(uuid) to authenticated, service_role;

alter table public.tasting_group_posts enable row level security;

grant select, insert on table public.tasting_group_posts to authenticated;
grant update (moderation_status) on table public.tasting_group_posts to authenticated;

drop policy if exists "members read visible tasting group posts" on public.tasting_group_posts;
create policy "members read visible tasting group posts"
  on public.tasting_group_posts
  for select
  to authenticated
  using (
    moderation_status = 'published'
    or author_user_id = (select auth.uid())
    or (select private.current_user_hosts_tasting_group(group_id))
  );

drop policy if exists "active members create tasting group posts" on public.tasting_group_posts;
create policy "active members create tasting group posts"
  on public.tasting_group_posts
  for insert
  to authenticated
  with check (
    author_user_id = (select auth.uid())
    and moderation_status = 'published'
    and (select private.current_user_can_post_to_tasting_group(group_id))
  );

drop policy if exists "group hosts moderate tasting group posts" on public.tasting_group_posts;
create policy "group hosts moderate tasting group posts"
  on public.tasting_group_posts
  for update
  to authenticated
  using ((select private.current_user_hosts_tasting_group(group_id)))
  with check ((select private.current_user_hosts_tasting_group(group_id)));
