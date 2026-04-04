# Legacy Cron Job Operations Guide

## Status
- This document describes the retired legacy cron pipeline.
- Active terminology generation now uses the Start Terms workflow:
  - `npm run terms:audit`
  - `npm run terms:start`
  - `npm run terms:loop`

You do **not** need your computer on for the legacy cron path.

Because this is running in **Supabase** (`pg_cron` + Edge Function), it runs in the cloud:

- No laptop required
- No PowerShell required
- No local terminal session required

## What Must Stay In Place

- Your Supabase project stays active
- `terminology-harvester` function stays deployed
- Optional hardening secret remains set (`TERMINOLOGY_CRON_SECRET`)
- Outbound internet access from Supabase Edge Functions remains available

## Current Schedule

- `0 16 * * *` (16:00 UTC daily)
- That is 8:00 AM PST in winter
- During daylight time (from March 8, 2026 to November 1, 2026), it runs at 9:00 AM local Pacific

## How To Keep It Healthy

- Check `public.terminology_harvest_runs` daily/weekly (inserted count, status)
- Check Supabase Function logs for `terminology-harvester`
- Watch source endpoint health (Wikipedia search/summary availability)
- Watch for partial runs and adjust target count if needed

## If You Want A Different Frequency/Time

Common options:

1. 8:00 AM Pacific local year-round (DST-aware)
2. Every weekday only
3. Smaller daily batch (for example 100–250) to reduce cost/risk
