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

