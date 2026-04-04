# Backlog

## TODO: Enable Google Login in Supabase (Localhost)
- Priority: High
- Status: Pending
- Goal: Make `Continue with Google` work from `http://127.0.0.1:5173`.

### Steps
1. Open Supabase project auth providers:
   - `https://supabase.com/dashboard/project/ubcsjifoizloilefqgem/auth/providers`
2. In Supabase Google provider modal, confirm callback URL is:
   - `https://ubcsjifoizloilefqgem.supabase.co/auth/v1/callback`
3. Open Google Cloud Console:
   - `https://console.cloud.google.com/`
4. Select or create a project.
5. Configure OAuth consent screen (External), add your Google account as test user.
6. Create OAuth client:
   - Type: `Web application`
7. In Google OAuth client, set Authorized JavaScript origins:
   - `http://127.0.0.1:5173`
   - `http://localhost:5173`
8. In Google OAuth client, set Authorized redirect URIs:
   - `https://ubcsjifoizloilefqgem.supabase.co/auth/v1/callback`
9. Copy from Google:
   - `Client ID`
   - `Client Secret`
10. Paste into Supabase Google provider:
    - `Client IDs` = Google Client ID
    - `Client Secret (for OAuth)` = Google Client Secret
11. Keep toggles:
    - `Enable Sign in with Google`: ON
    - `Skip nonce checks`: OFF
    - `Allow users without an email`: OFF
12. Save Google provider in Supabase.
13. Open Supabase URL config:
    - `https://supabase.com/dashboard/project/ubcsjifoizloilefqgem/auth/url-configuration`
14. Set:
    - `Site URL`: `http://127.0.0.1:5173`
    - Redirect URLs:
      - `http://127.0.0.1:5173`
      - `http://localhost:5173`
15. Test in app:
    - Open `http://127.0.0.1:5173`
    - Click `Continue with Google`
    - Confirm login returns to localhost and user is signed in.

### Definition of Done
- Google login redirects to Google account chooser and returns to localhost.
- App shows logged-in user email in the auth panel.

## TODO: Terminology Expansion Plan (1,000 Terms per Letter)
- Priority: High
- Status: In Progress
- Standard (effective March 2, 2026): term sets must be certification-style glossary language aligned to guild/certification bodies per beverage track (WSET, CMS, Cicerone, BJCP, SCA, etc.), with non-empty references + MLA citations.
- Quality bar for every batch:
  - 1,000 unique terms for target letter.
  - Non-empty `reference_links` and `mla_citations` for every term.
  - References may come from any relevant, reputable internet source (not limited to specific sites).
  - Original wording only (no copied definitions).
  - Terms remain editable in Terminology Admin.

### Completed
1. Letter `A`: migration `supabase/migrations/202602210007_terminology_add_1000_a_terms.sql`
2. Letter `B`: migration `supabase/migrations/202602210008_terminology_add_1000_b_terms.sql`
3. Letter `C`: migration `supabase/migrations/202602210009_terminology_add_1000_c_terms.sql`
4. Letter `D`: migration `supabase/migrations/202602210011_terminology_add_1000_d_terms.sql`
5. Letter `E`: migration `supabase/migrations/202602210012_terminology_add_1000_e_terms.sql`
6. Letter `F`: migration `supabase/migrations/202602210013_terminology_add_1000_f_terms.sql`
7. Letter `G`: migration `supabase/migrations/202602210014_terminology_add_1000_g_terms.sql`
8. Letter `H`: migration `supabase/migrations/202602210015_terminology_add_1000_h_terms.sql`
9. Letter `I`: migration `supabase/migrations/202602210016_terminology_add_1000_i_terms.sql`
10. Letter `J`: migration `supabase/migrations/202602210017_terminology_add_1000_j_terms.sql`
11. Letter `K`: migration `supabase/migrations/202602210018_terminology_add_1000_k_terms.sql`
12. Letter `L`: migration `supabase/migrations/202602210019_terminology_add_1000_l_terms.sql`
13. Letter `M`: migration `supabase/migrations/202602210020_terminology_add_1000_m_terms.sql`
14. Letter `N`: migration `supabase/migrations/202602210021_terminology_add_1000_n_terms.sql`
15. Letter `O`: migration `supabase/migrations/202602210022_terminology_add_1000_o_terms.sql`
16. Letter `P`: migration `supabase/migrations/202602210023_terminology_add_1000_p_terms.sql`
17. Letter `Q`: migration `supabase/migrations/202602210024_terminology_add_1000_q_terms.sql`
18. Letter `R`: migration `supabase/migrations/202602210025_terminology_add_1000_r_terms.sql`
19. Letter `S`: migration `supabase/migrations/202602210026_terminology_add_1000_s_terms.sql`
20. Letter `T`: migration `supabase/migrations/202602210027_terminology_add_1000_t_terms.sql`
21. Letter `U`: migration `supabase/migrations/202602210028_terminology_add_1000_u_terms.sql`
22. Letter `V`: migration `supabase/migrations/202602210029_terminology_add_1000_v_terms.sql`
23. Letter `W`: migration `supabase/migrations/202602210030_terminology_add_1000_w_terms.sql`
24. Letter `X`: migration `supabase/migrations/202602210031_terminology_add_1000_x_terms.sql`
25. Letter `Y`: migration `supabase/migrations/202602210032_terminology_add_1000_y_terms.sql`
26. Letter `Z`: migration `supabase/migrations/202602210033_terminology_add_1000_z_terms.sql`

### Standard Steps (repeat for each letter batch)
1. Create a migration for the target letter with 1,000 unique term names.
2. Insert terms with full fields: meaning, how_to_apply, examples, other_ideas.
3. Attach verified source URLs and matching MLA citations.
4. Run `supabase db push`.
5. Verify counts by letter bucket and spot-check modals in UI.

### Queue (same plan for each remaining letter)
1. None pending. A-Z terminology expansion batches are complete.

## TODO: Replace AI Lab with Codex-Style Interface
- Priority: Medium
- Status: Backlog
- Goal: Replace the current provider-toggle AI panel with a single Codex-style chat workspace.

### Notes
- Codex models are still OpenAI-hosted models, so OpenAI API access remains required on the backend.
- Keep API keys server-side in Supabase Edge Function secrets only.

### Phase Plan
1. Remove multi-provider selector from frontend AI panel.
2. Rework `supabase/functions/ai-router/index.ts` to one Codex-targeted route.
3. Use Responses API-style payload handling for chat turns.
4. Update UI to a persistent conversation layout with session history.
5. Store sessions/messages in Supabase tables for resume capability.
6. Add guardrails: output checks, error handling, and rate-limit-safe retry messaging.

## TODO: Sip Studios Game V2 (Duolingo-Style Equipment Learning)
- Priority: High
- Status: Planned
- Reference PRD: `docs/sip-studios-game-v2-prd.md`
- Goal: Deliver a smooth, node-based educational game that teaches winery, brewery, and distillery equipment with mastery progression.

### Epic A: Foundations and Architecture
1. `GAME-001` - Scaffold game domain modules
   - Priority: High
   - Estimate: 1 day
   - Files:
     - `src/game/stateMachine.ts`
     - `src/game/challengeEngine.ts`
     - `src/game/spacedRepetition.ts`
     - `src/game/content/equipmentCatalog.ts`
     - `src/game/content/facilityNodes.ts`
   - Definition of done:
     - Modules compile and export stable interfaces.
     - `SipStudiosGame` reads from domain modules, not inline constants.

2. `GAME-002` - Normalize UI state model for nodes, sessions, rewards
   - Priority: High
   - Estimate: 0.5 day
   - Files:
     - `src/components/SipStudiosGame.tsx`
     - `src/game/types.ts`
   - Definition of done:
     - Game state transitions are explicit (`idle`, `lesson`, `challenge`, `result`, `unlock`).

### Epic B: Vertical Slice (Winery)
1. `GAME-101` - Node path UI and lock/unlock flow
   - Priority: High
   - Estimate: 1 day
   - Existing assets to reuse now:
     - `public/academy/units/unit-04-the-aging-vault.png`
     - `public/academy/realms/realm-4-cellar-citadel.jpg`
   - Definition of done:
     - Path nodes render with statuses (`locked`, `available`, `completed`).
     - First 3 winery nodes playable in sequence.

2. `GAME-102` - Equipment hotspot scene (winery)
   - Priority: High
   - Estimate: 1 to 1.5 days
   - Existing assets to reuse now:
     - `public/academy/realms/realm-1-crystal-atrium.jpg`
     - `public/academy/realms/realm-4-cellar-citadel.jpg`
   - Definition of done:
     - 8 to 12 clickable hotspots with feedback and explanation cards.

3. `GAME-103` - Challenge templates (identify + sequence + function match)
   - Priority: High
   - Estimate: 1.5 to 2 days
   - Definition of done:
     - At least 3 challenge types run from shared challenge engine.
     - Correctness, explanation, and scoring are wired.

4. `GAME-104` - Results panel, XP, and "practice mistakes" queue
   - Priority: High
   - Estimate: 1 day
   - Definition of done:
     - Per-node XP and mistake review list displayed and persisted in memory.

### Epic C: Brewery and Distillery Expansion
1. `GAME-201` - Brewery content pack and hotspots
   - Priority: High
   - Estimate: 2 to 3 days
   - Definition of done:
     - Brewery module has 10+ equipment items and 12+ challenges.

2. `GAME-202` - Distillery content pack and hotspots
   - Priority: High
   - Estimate: 2 to 3 days
   - Definition of done:
     - Distillery module has 10+ equipment items and 12+ challenges.

### Epic D: Persistence and Admin
1. `GAME-301` - Supabase schema for progress and attempts
   - Priority: High
   - Estimate: 1 day
   - Files:
     - `supabase/migrations/<timestamp>_game_progress_schema.sql`
   - Tables:
     - `game_facility_progress`
     - `game_node_attempts`
     - `game_equipment_mastery`
     - `game_event_log`
   - Definition of done:
     - RLS and auth-safe writes/reads in place for signed-in users.

2. `GAME-302` - Save/resume integration
   - Priority: High
   - Estimate: 1 day
   - Files:
     - `src/lib/gameProgress.ts`
     - `src/components/SipStudiosGame.tsx`
   - Definition of done:
     - Resume returns player to correct node and mastery state.

3. `GAME-303` - Admin content toggles (node/challenge enablement)
   - Priority: Medium
   - Estimate: 1 to 2 days
   - Files:
     - `src/components/TerminologyAdmin.tsx` (or new `GameAdmin.tsx`)
   - Definition of done:
     - Admin can enable/disable nodes and challenge groups without code change.

### Epic E: Polish, Accessibility, Performance
1. `GAME-401` - Motion/audio feedback polish
   - Priority: Medium
   - Estimate: 1 to 2 days
2. `GAME-402` - Keyboard navigation + reduced-motion
   - Priority: Medium
   - Estimate: 1 day
3. `GAME-403` - Performance pass (lazy load assets by facility)
   - Priority: Medium
   - Estimate: 1 day

## Immediate Execution Plan (Can Start Now With Existing Resources)
- Priority: High
- Status: Ready now
- Constraint: use existing assets/code only, no new character art required.

### Sprint 0 (3-5 days) - Ship a V2 Alpha Using Current Assets
1. `NOW-001` - Replace current walkaround with node-path shell
   - Reuse existing `public/academy/units/*.png` for node art.
   - Outcome: Duolingo-like progression skeleton in `SipStudiosGame`.

2. `NOW-002` - Add winery equipment lesson cards (text-first)
   - Build data-driven cards in `src/game/content/equipmentCatalog.ts`.
   - Outcome: educational depth without waiting on new art.

3. `NOW-003` - Add 3 challenge types with existing UI components
   - Identify, sequence, and function-match.
   - Outcome: repeatable challenge loop with scoring.

4. `NOW-004` - Add in-session mastery + XP + results recap
   - Local state first, Supabase later.
   - Outcome: rewarding loop and reduced redundancy.

5. `NOW-005` - Instrument basic analytics events
   - Track `node_started`, `challenge_answered`, `node_completed`.
   - Outcome: data to tune difficulty before full art production.

### Why this is executable immediately
- Current game tab already has movement, interaction, dialogue, and progress affordances in `src/components/SipStudiosGame.tsx`.
- Existing realm/unit/guide assets already exist under `public/academy/*`.
- Quiz and challenge patterns already exist in repo (`BeverageQuiz`, `SipAcademy` content flow) and can be reused.

