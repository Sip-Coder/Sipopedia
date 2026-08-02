import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [siteMapSource, appSource, adminSource, stylesSource, migrationSource] = await Promise.all([
  readFile(new URL("../src/lib/siteMap.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/AdminConsole.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/styles.css", import.meta.url), "utf8"),
  readFile(new URL("../supabase/migrations/20260802105314_site_map_navigation_order.sql", import.meta.url), "utf8")
]);

test("Site Map order is persisted as a backward-compatible shared field", () => {
  assert.match(siteMapSource, /sortOrder:\s*number/);
  assert.match(siteMapSource, /select\("route,room,status,sort_order"\)/);
  assert.match(siteMapSource, /sort_order:\s*config\.sortOrder/);
  assert.match(siteMapSource, /PAGE_STATUS_STORAGE_KEY = "sipstudies:page-statuses:v3"/);
  assert.match(siteMapSource, /error\.code === "42703" \|\| error\.code === "PGRST204"/);
});

test("The migration backfills deterministic, nonnegative menu ranks", () => {
  const pairs = [...migrationSource.matchAll(/when '([^']+)' then (\d+)/g)].map((match) => ({
    route: match[1],
    rank: Number(match[2])
  }));
  const rankByRoute = new Map(pairs.map(({ route, rank }) => [route, rank]));

  assert.equal(rankByRoute.get("home"), 0);
  assert.equal(rankByRoute.get("app/starter"), 10);
  assert.equal(rankByRoute.get("app/sip-academy"), 1000);
  assert.equal(rankByRoute.get("app/sip-game"), 1010);
  assert.equal(rankByRoute.get("app/beyond-the-glass"), 1020);
  assert.equal(rankByRoute.get("app/flavor-wheel"), 2000);
  assert.equal(rankByRoute.get("app/beverage-news"), 3000);
  assert.equal(rankByRoute.get("checkout"), 4000);
  assert.equal(rankByRoute.get("admin"), 5000);
  assert.ok(pairs.every(({ rank }) => Number.isInteger(rank) && rank >= 0));
  assert.match(migrationSource, /check \(sort_order >= 0\)/);
  assert.match(migrationSource, /where sort_order is null/);
});

test("Every rendered menu path consumes the published Site Map order", () => {
  assert.ok(
    (appSource.match(/orderItemsByPageOrder\(/g) ?? []).length >= 5,
    "compact menu, workspace groups, account, boss, and section navigation all use the rank resolver"
  );
  assert.match(appSource, /const sectionItems = useMemo\([\s\S]*?orderItemsByPageOrder/);
  assert.match(appSource, /const menuSections = useMemo\([\s\S]*?orderItemsByPageOrder/);
  assert.match(appSource, /item\.id === "__signout" \? "logout" : item\.id/);
});

test("Admin ordering supports touch drag, keyboard-safe controls, staging, and discard", () => {
  assert.match(adminSource, /className="site-map-drag-handle"/);
  assert.match(adminSource, /onPointerDown=\{\(event\) => beginPageDrag\(event, page\.route\)\}/);
  assert.match(adminSource, /Move \$\{page\.label\} earlier/);
  assert.match(adminSource, /Move \$\{page\.label\} later/);
  assert.match(adminSource, /sourceGroup !== targetGroup \|\| sourceGroup === "other"/);
  assert.match(adminSource, /Publish Globally/);
  assert.match(adminSource, /Discard Changes/);
  assert.match(stylesSource, /\.site-map-drag-handle[\s\S]*?touch-action:\s*none/);
  assert.match(stylesSource, /@media \(max-width: 720px\)[\s\S]*?\.site-map-order-groups[\s\S]*?columns:\s*1/);
});
