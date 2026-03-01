# Security Best Practices Report

## Executive Summary
Security review completed for the React + Supabase stack. I found and fixed multiple high-impact issues: unauthenticated AI edge access, a hardcoded third-party API key, insecure role-default migrations, JSONP script execution risk, and missing `noopener` on print popups.

## Critical Findings

### SEC-001
- Severity: Critical
- Status: Fixed
- Location: `supabase/functions/ai-router/config.toml:1`, `supabase/functions/ai-router/index.ts:104`, `supabase/functions/ai-router/index.ts:221`
- Evidence: `verify_jwt = true`, explicit authenticated-user claim check (`role === "authenticated"`), and `401` for unauthenticated callers.
- Impact: Without auth gating, attackers could call paid AI providers via your function and burn API quota/cost.
- Fix: Enabled JWT verification and enforced authenticated-user access in the function handler.
- Mitigation: Keep function secrets only in Supabase secrets; add rate limits at edge/proxy level.
- False positive notes: If you intentionally wanted anonymous access, this behavior change is expected and now requires sign-in.

### SEC-002
- Severity: Critical
- Status: Fixed
- Location: `supabase/functions/news-router/index.ts:52`, `supabase/functions/news-router/index.ts:334`
- Evidence: Robert Parker API key now comes from `Deno.env` and hard-fails if missing.
- Impact: Hardcoded API keys in source control can be harvested and abused.
- Fix: Replaced hardcoded key with `ROBERT_PARKER_API_KEY` secret lookup.
- Mitigation: Rotate previously committed key and store only in Supabase secrets.
- False positive notes: None.

## High Findings

### SEC-003
- Severity: High
- Status: Fixed
- Location: `supabase/migrations/202602210003_promote_existing_profiles_to_admin.sql:5`, `supabase/migrations/202602210004_default_new_profiles_admin_dev.sql:5`, `supabase/migrations/202603030002_harden_profile_role_defaults.sql:5`
- Evidence: Older migrations mass-promoted admins and set default role to `admin`; new migration reverts default to `student` and demotes current admins.
- Impact: Privilege escalation risk (broad admin access to protected data/actions).
- Fix: Added hardening migration to restore secure defaults and remove blanket admin elevation.
- Mitigation: Re-grant admin only to explicit, intended accounts after migration.
- False positive notes: This changes current admin assignments by design.

### SEC-004
- Severity: High
- Status: Fixed
- Location: `src/components/BeverageNews.tsx:520`, `src/components/BeverageNews.tsx:545`
- Evidence: Source loading path now uses edge/html/rss adapters only; JSONP execution path was removed.
- Impact: JSONP executes remote script in your origin and can lead to XSS if upstream is compromised.
- Fix: Removed JSONP-based WordPress ingestion path from runtime adapter flow.
- Mitigation: Keep external ingestion server-side (edge function) when CORS is unavailable.
- False positive notes: None.

## Low Findings

### SEC-005
- Severity: Low
- Status: Fixed
- Location: `src/components/BeverageQuiz.tsx:470`, `src/components/TastingJournal.tsx:963`
- Evidence: `window.open` now uses `noopener,noreferrer`.
- Impact: Reduces opener/tabnabbing risk for popup windows.
- Fix: Added `noopener,noreferrer` flags for print/export windows.
- Mitigation: Continue using these flags for all future `_blank` windows.
- False positive notes: None.

## Remaining Risks / Follow-ups
- Edge functions still use permissive CORS wildcard headers (`Access-Control-Allow-Origin: *`). Consider environment-based allowlists for production origins.
- AI provider usage lacks explicit rate limiting/throttling in function code; enforce at edge gateway or via provider quotas.
