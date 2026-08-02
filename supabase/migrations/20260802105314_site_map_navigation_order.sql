alter table public.site_page_statuses
  add column if not exists sort_order integer;

update public.site_page_statuses
set sort_order = case route
  when 'home' then 0
  when 'app/starter' then 10
  when 'pricing' then 20
  when 'study-paths' then 30
  when 'support' then 40

  when 'app/sip-academy' then 1000
  when 'app/sip-game' then 1010
  when 'app/beyond-the-glass' then 1020
  when 'app/living-palate' then 1030
  when 'app/sipopedia' then 1040
  when 'app/beverage-quiz' then 1050
  when 'app/study-sheets' then 1060
  when 'app/service-roleplay' then 1070
  when 'app/maps' then 1080
  when 'app/regions' then 1090
  when 'app/grapes' then 1100
  when 'app/cocktails' then 1110
  when 'app/resources' then 1120

  when 'app/flavor-wheel' then 2000
  when 'app/cellar-scanner' then 2010
  when 'app/tasting-journal' then 2020
  when 'app/flavors' then 2030

  when 'app/beverage-news' then 3000
  when 'app/flavor-blog' then 3010
  when 'app/favorites' then 3020
  when 'app/ai-winecast' then 3030
  when 'app/tasting-groups' then 3040
  when 'app/ai-news' then 3050
  when 'app/somm-events' then 3060

  when 'checkout' then 4000
  when 'login' then 4010
  when 'account' then 4020
  when 'logout' then 4030

  when 'admin' then 5000
  when 'admin/terminology' then 5010

  when 'powerful-point' then 6000
  when 'account/avatar' then 6010
  when 'terms' then 6020
  when 'privacy' then 6030
  when 'refund' then 6040
  when 'success' then 6050
  when 'cancel' then 6060
  else 10000
end
where sort_order is null;

alter table public.site_page_statuses
  alter column sort_order set default 10000,
  alter column sort_order set not null;

alter table public.site_page_statuses
  drop constraint if exists site_page_statuses_sort_order_nonnegative;

alter table public.site_page_statuses
  add constraint site_page_statuses_sort_order_nonnegative check (sort_order >= 0);

create index if not exists site_page_statuses_sort_order_route_idx
  on public.site_page_statuses (sort_order, route);
