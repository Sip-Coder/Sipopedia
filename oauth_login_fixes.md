# Google Login Fix Notes

Replit

## Why login was failing

1. The app was running inside an iframe in the Replit preview.
   - Google OAuth cannot load inside an iframe because the provider blocks framing.
   - The login flow needed to break out to the top-level window or open a new tab.

2. The OAuth callback was redirecting to `localhost:3000`.
   - Supabase was not sending the user back to the deployed app URL.
   - This happens when the Supabase Site URL / Redirect URLs are not configured for the current domain.

3. The callback handler was also wiping the OAuth query string too early.
   - That could remove the `?code=` value before Supabase exchanged it for a session.

## Fixes applied in code

- Detect iframe context before sending the browser to Google OAuth.
- Use the Supabase OAuth URL directly and navigate the top window when embedded.
- Preserve OAuth callback parameters until the session exchange completes.
- Improve error handling for OAuth failures and redirect mismatches.

## Required Supabase dashboard settings

Set the Supabase authentication URLs to include:

- `https://www.sipopedia.com`
- `https://sipopedia.com`
- `https://sipopedia-02.replit.app`
- `https://*.worf.replit.dev`
- `http://localhost:3000`

## Notes

- The custom domain and deployed Replit domain both need to be allowed.
- The site URL should point to the canonical public domain you want users to return to.