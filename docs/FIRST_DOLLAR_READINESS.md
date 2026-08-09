# Sipopedia First-Dollar Readiness

This checklist tracks what must be true before Sipopedia should ask a real customer to pay for the $10/month membership.

## First Customer Base

- Curious beverage learners who want wine, beer, spirits, coffee, tea, and other drinks explained visually.
- Hospitality workers who need practical guest language for restaurants, bars, retail, tasting rooms, breweries, and taprooms.
- Certification-adjacent learners using Sipopedia beside WSET, CMS, Cicerone, BarSmarts-style, or regional-study paths.
- Visual learners who need maps, videos, field notes, and practice loops before dense textbook memorization.
- Small hospitality teams later, after the individual membership converts cleanly.

## Homepage Selling Promise

Primary promise:

> Learn drinks visually, from source to service.

Homepage should keep proving three buyer outcomes:

- See the system: source, production, place, academy map, and regional context.
- Practice the craft: tasting memory, service decisions, game checkpoints, and recipes.
- Find the answer: Sipopedia terms, ingredients, citations, and reference lists.

## Ready-To-Sell Gates

- [ ] Production homepage clearly explains who Sipopedia is for before asking for payment.
- [ ] Pricing page clearly states $10/month, what unlocks, and how cancellation/help works.
- [ ] Login before checkout works on production.
- [ ] Stripe Checkout session starts from production for a signed-in test user.
- [ ] Stripe success URL returns to `https://sipopedia.com/#success` with the session context intact.
- [ ] Stripe cancel URL returns to `https://sipopedia.com/#cancel` with the retry path intact.
- [ ] Stripe webhook writes or updates `customer_subscriptions` in Supabase.
- [ ] Paid account receives Student/subscriber access without manual database edits.
- [ ] Canceled or past-due subscription removes or limits paid access.
- [ ] Profile roles are limited to Student and Admin; Trial access is issued through `customer_subscriptions.status = 'trialing'`.
- [ ] Terms, Privacy, Refund, and billing support routes are reachable before checkout.
- [ ] Assisted Enrollment submits to a support/admin workflow that someone will monitor.
- [ ] Mobile portrait checkout path is readable from homepage to success.
- [ ] Mobile landscape checkout path has no clipped CTA, pricing, login, or support controls.
- [ ] A real production smoke test proves: homepage -> pricing -> login -> checkout -> success -> paid room unlock.

## Production Connection Checklist

Confirm these without exposing secret values in chat, Git, logs, or frontend code:

- Replit/Sipopedia production has `VITE_SUPABASE_URL`.
- Replit/Sipopedia production has `VITE_SUPABASE_ANON_KEY`.
- Supabase Edge Function has `STRIPE_SECRET_KEY`.
- Supabase Edge Function has `STRIPE_PRICE_ID_PRO`.
- Supabase Edge Function has a safe production return origin for `https://sipopedia.com`.
- Stripe webhook endpoint is deployed and has its signing secret configured.
- Stripe product/price matches the public $10/month membership.
- Supabase profile roles are limited to Student and Admin.
- Trial access is represented by a time-boxed subscription record, not a separate profile role.

## Next Build Priorities

1. Verify production environment variables and Stripe price/webhook configuration.
2. Run a Stripe test-mode checkout on the production domain.
3. Confirm Supabase subscription sync and paid access unlock.
4. Capture phone screenshots of homepage, pricing, login, checkout, success, and the first paid room.
5. Only then invite the first real customer or run paid traffic.

## Operator Console

The Admin Console overview includes a first-dollar readiness panel. Use it before inviting a real customer:

- Confirm the public homepage promise and $10/month offer are still clear.
- Open the smoke-test path: Homepage -> Pricing -> Checkout -> Support -> Paid Room.
- Treat Stripe checkout and webhook unlock as unproven until a signed-in production test account completes the full loop.
- Watch Assisted Enrollment/support requests daily while the first customers are being invited.
