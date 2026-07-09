# Repository Guidelines

## Multi-Agent Workspace Defaults
- All active Sipopedia work on this Windows VM stays under `C:\codebase`.
- Codex edit lane: `C:\codebase\sipopedia-codex` on branch `work/codex`, coordinated in PR #2.
- OpenClaw edit lane: `C:\codebase\sipopedia-openclaw` on branch `work/openclaw`, coordinated in PR #1.
- Main/reference checkout: `C:\codebase\sipopedia` on branch `main`; do not use it as a shared edit lane unless the user explicitly asks.
- Do not use `Application Demo` for Sipopedia website work. That folder is reference-only for the user's `/me` resume/application context.
- Before Git commands on the Windows VM, run `. C:\codebase\tools\git-env.ps1` so portable Git, Git LFS, and GitHub CLI are on PATH.
- Start each work session with `powershell -File .\tools\start-agent-session.ps1 -Agent Codex` or `powershell -File .\tools\start-agent-session.ps1 -Agent OpenClaw`; use `C:\codebase\tools\sipopedia-team-status.ps1` when coordinating across lanes.
- For an operator view across both lanes, run `powershell -File .\tools\team-control.ps1 -Mode All`.
- From outside a Sipopedia worktree, run `C:\codebase\tools\sipopedia-control.ps1 -Mode Status|Next|Auth|Ping`; use `-Mode Ping -To OpenClaw -From Codex -Summary "..."` or the matching target/source agents for bot-style pings.
- If the host wrapper is missing or stale, run `powershell -File .\tools\install-host-control.ps1` from either agent worktree.
- For bot-style cross-agent pings, read `docs/AGENT_HANDOFF_PROTOCOL.md` and prefer `C:\codebase\tools\sipopedia-control.ps1 -Mode Ping -To OpenClaw -From Codex -Summary "..."`; use the target PR when Telegram is unavailable.
- Before editing paths another agent might touch, run `powershell -File .\tools\claim-agent-work.ps1 -Agent Codex -Action Claim -Summary "..." -Paths "path1","path2"` or the OpenClaw equivalent, then post the generated claim to the lane PR. See `docs/TEAM_WORKFLOW.md`.
- For GitHub/Replit/deployment loading issues, read `docs/DEPLOYMENT_READINESS.md` and run `powershell -File .\tools\check-deployment-readiness.ps1`; add `-RunValidation -RunSmoke` before reporting a release-ready state.
- If OpenClaw cannot see `C:\codebase`, clone `https://github.com/Sip-Coder/Sipopedia.git` into an OpenClaw-visible `sipopedia-openclaw` folder and switch to `work/openclaw`.
- Keep Codex and OpenClaw edits isolated by branch/worktree. Coordinate cross-agent changes in the PR comments before touching another agent's lane.

## Project Structure & Module Organization
- `src/`: React + TypeScript frontend (`App.tsx`, `components/`, `lib/`, `data/`, `context/`, `assets/`).
- `public/`: static assets (icons, maps, flavor thumbnails, academy media).
- `server/hyperagents/`: server-side agent orchestration modules (`coach/`, `operations/`, `structure/`, `terminology/`).
- `supabase/`: SQL schema, migrations, and Edge Functions (`functions/ai-router`, `functions/news-router`, `functions/terminology-harvester`, `functions/create-checkout-session`, `functions/billing-webhook`).
- `scripts/`: operational Node scripts (secret scanning and terminology sync/indexing).
- `validators/`: PowerShell validation entrypoints for website and terminology workflows.
- `docs/`: runbooks and workflow notes. `archive/` and `DUMP IN/` are reference/history, not primary implementation targets.

## Build, Test, and Development Commands
- `npm run dev`: start local Vite dev server.
- `npm run localhost`: run `start-localhost.cmd` for host/port-local startup.
- `npm run build`: type-check (`tsc -b`) and produce production build in `dist/`.
- `npm run preview`: preview the production bundle.
- `npm run security:secrets`: scan staged files for secret leakage.
- `npm run terms:audit -- --limit 535`: audit current terms for source/citation/policy compliance.
- `npm run terms:start -- --dry-run` / `npm run terms:start`: generate new candidate terms via the 7-agent start pipeline.
- `npm run terms:loop -- -Iterations 3 -Letters ABC`: run iterative Ralph-style terminology loops.
- `powershell -File .\validators\validate-website.ps1`: full website validation pipeline.
- `powershell -File .\validators\validate-terminology.ps1`: terminology schema/collision validation.

## Coding Style & Naming Conventions
- TypeScript + React with 2-space indentation, semicolons, and double quotes (match existing files).
- Components and React contexts: `PascalCase` (`SipAcademyWineLessons.tsx`).
- Utilities/hooks/data modules: `camelCase` exports and descriptive file names (`urlSafety.ts`, `tracks.ts`).
- Keep changes focused; avoid formatting-only churn in unrelated files.

## Testing Guidelines
- No dedicated unit test framework is configured in `package.json` currently.
- Required baseline before PR: `npm run build` and `validators/validate-website.ps1`.
- For terminology changes, always run `validators/validate-terminology.ps1` and inspect generated review queue files under `review/terminology/`.

## Commit & Pull Request Guidelines
- Follow concise, imperative commit subjects (examples in history: `Add 3D globe map...`, `Refine progress wave UI...`).
- For bounded loop work, use policy format from `CHANGE_POLICY.md`: `agent-loop: iter <N> - <short hypothesis>`.
- PRs should include: scope summary, affected paths, validation commands/results, linked issue/task, and screenshots for UI changes.

## Security & Configuration Tips
- Never commit secrets. Run `npm run hooks:install` once to enable `.githooks/pre-commit` secret checks.
- Use `.env.example` as template; keep provider keys in Supabase secrets, not frontend env files.

## Sipopedia Terminology Memory
- Conversation trigger phrase: `start terms`.
- Canonical new-term review file: `terminology/sipopedia-new-terms.jsonl`. Do not create or update `terminology/sipopedia-new-terms.md` or the extensionless `terminology/sipopedia-new-terms` duplicate.
- Each JSONL line is one candidate row shaped for future `public.terminology_entries` import: `term`, `updated_at`, `meaning`, `how_to_apply`, `examples`, `source_authors`, `infographic_url`, `reference_links`, `mla_citations`, `source_note`, plus review metadata such as `candidate_number`, `review_status`, and `batch_id`.
- Default sequence:
1. `npm run terms:audit -- --limit 535`
2. `npm run terms:start -- --dry-run`
3. review generated JSONL candidates under `review/terminology/`
4. `npm run terms:start`
- Source restrictions: do not use encyclopedia or dictionary domains.
- Duplicate rule: never insert repeated terms; enrich existing terms only with additive, non-redundant updates.
- Detailed policy/runbook: `docs/TERMS_AUTOMATION_PLAYBOOK.md`.
