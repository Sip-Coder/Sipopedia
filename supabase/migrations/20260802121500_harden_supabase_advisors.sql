-- Make the function-only access model explicit without granting client access.
-- The owner-run SECURITY DEFINER function continues to bypass RLS as designed.
revoke all on table private.support_request_rate_limits
  from public, anon, authenticated;

drop policy if exists "function only; deny direct access"
  on private.support_request_rate_limits;

create policy "function only; deny direct access"
  on private.support_request_rate_limits
  as restrictive
  for all
  to anon, authenticated
  using (false)
  with check (false);

-- Cover the auth.users foreign key used by Site Map audit metadata.
create index if not exists site_page_statuses_updated_by_idx
  on public.site_page_statuses (updated_by);
