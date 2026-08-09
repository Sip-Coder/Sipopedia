# Sipopedia First-Dollar Readiness

This checklist tracks what must be true before Sipopedia should ask a real customer to pay for the $10/month membership.

## First Customer Base

- Curious beverage learners who want wine, beer, spirits, coffee, tea, and other drinks explained visually.
- Hospitality workers who need practical guest language for restaurants, bars, retail, tasting rooms, breweries, and taprooms.
- Certification-adjacent learners using Sipopedia beside WSET, CMS, Cicerone, BarSmarts-style, or regional-study paths.
- Visual learners who need maps, videos, field notes, and practice loops before dense textbook memorization.
- Small hospitality teams later, after the individual membership converts cleanly.

The first paid offer should stay individual and simple. Sell the visual academy first; team plans, custom training, and deeper admin workflows can wait until one-person checkout and access unlock are proven.

## Homepage Selling Promise

Primary promise:

> Learn drinks visually, from source to service.

Homepage should keep proving three buyer outcomes:

- See the system: source, production, place, academy map, and regional context.
- Practice the craft: tasting memory, service decisions, game checkpoints, and recipes.
- Find the answer: Sipopedia terms, ingredients, citations, and reference lists.

The first screen and follow-up cards should sell by customer fit, not feature count:

- New learner: plain-language path, visual memory anchors, room previews first.
- Hospitality: service wording, recipe logic, fast study loops.
- Certification prep: region context, terms with sources, production systems.
- Not sure yet: watch before joining, ask a human, keep the path simple.

The homepage should also state the first likely payers in plain buyer language:

- First-time beverage learner: overwhelmed by terms and production steps, pays for a visual route that makes the system easier to remember.
- Restaurant, bar, retail, or tasting-room staff: guests ask practical questions, pays for clearer service language and confidence.
- Certification-adjacent student: needs mental geography beside books and flashcards, pays for maps, citations, and repeatable review rooms.

The homepage conversion path should stay simple enough to repeat in ads, demos, and phone reviews:

1. Preview the world.
2. Choose the reason you came.
3. Join once for $10/month.

## Ready-To-Sell Gates

- [ ] Production homepage clearly explains who Sipopedia is for before asking for payment.
- [ ] Homepage shows the simple buyer path: preview first, choose a use case, join once.
- [ ] Pricing page clearly states $10/month, what unlocks, and how cancellation/help works.
- [ ] Pricing page answers three first-buyer objections: what paying unlocks, what can be reviewed before payment, and what happens if checkout stalls.
- [ ] Login before checkout works on production.
- [ ] Stripe Checkout session starts from production for a signed-in test user.
- [ ] Checkout fallback has a direct Membership Help route with `checkout-help` enrollment context attached.
- [ ] Stripe success URL returns to `https://sipopedia.com/#success` with the session context intact.
- [ ] Success page shows a clear pending-access state with Refresh Access, Launch Pad, and Support if webhook sync is delayed.
- [ ] Stripe cancel URL returns to `https://sipopedia.com/#cancel` with the retry path intact.
- [ ] Success and cancel recovery buttons route membership help to Support with enrollment context prefilled.
- [ ] Success-page Membership Help includes the Stripe checkout session id when Stripe returns it.
- [ ] Stripe webhook writes or updates `customer_subscriptions` in Supabase.
- [ ] Paid account receives Student/subscriber access without manual database edits.
- [ ] Canceled or past-due subscription removes or limits paid access.
- [ ] Profile roles are limited to Student and Admin; Trial access is issued through `customer_subscriptions.status = 'trialing'`.
- [ ] Terms, Privacy, Refund, and billing support routes are reachable from Pricing and Checkout before payment.
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
- Billing webhook endpoint is reachable and rejects unsigned readiness probes.
- Stripe webhook endpoint is deployed and has its signing secret configured.
- Stripe product/price matches the public $10/month membership.
- Supabase profile roles are limited to Student and Admin.
- Trial access is represented by a time-boxed subscription record, not a separate profile role.
- Admin proof fields capture the production test account email, Stripe session id, subscription reference, and paid room route used for the first-dollar smoke test.

## Next Build Priorities

1. Verify production environment variables and Stripe price/webhook configuration.
2. Run a Stripe test-mode checkout on the production domain.
3. Confirm Supabase subscription sync and paid access unlock.
4. Capture phone screenshots of homepage, pricing, login, checkout, success, and the first paid room.
5. Only then invite the first real customer or run paid traffic.

## Operator Console

The Admin Console overview includes a first-dollar readiness panel. Use it before inviting a real customer:

- Confirm the public homepage promise and $10/month offer are still clear.
- Review the likely first customer segments: curious learners, hospitality staff, certification-adjacent learners, and visual learners.
- Open the smoke-test path: Homepage -> Pricing -> Trust Links -> Checkout -> Success -> Paid Room -> Support.
- Mark each smoke-test item only after a real production check proves it.
- Add a short proof note for each step so the operator can see what was verified and what is still assumed.
- Fill in the Stripe + access proof fields with the test account email, Stripe session id, subscription reference, and paid room route.
- Run the connection probe and confirm subscription/support checks show safe counts and latest status metadata, not just generic reachability.
- Review the proof-gaps panel and the downloaded Missing Proof Checklist; do not invite paid traffic while any gap is still marked missing.
- Download the first-dollar proof log after the smoke test so the checkout, webhook, support, and access evidence is saved outside browser memory.
- Keep the launch decision on hold until every smoke-test item is checked, every connection probe passes, and every Stripe + access proof field is filled.
- Treat Stripe checkout and webhook unlock as unproven until a signed-in production test account completes the full loop.
- Watch Assisted Enrollment/support requests daily while the first customers are being invited.

## First Paid Test Script

Run this once, in order, from production before inviting a real buyer:

1. Open `https://sipopedia.com` on the phone/account that will test payment.
2. Confirm the homepage promise, preview path, $10 pricing, and trust links are clear before checkout.
3. Sign in with the production test learner account.
4. Start Stripe Checkout from Sipopedia and confirm Stripe shows the correct monthly membership. If checkout fails, confirm Membership Help opens Support with `checkout-help` enrollment context attached.
5. Return to `https://sipopedia.com/#success` and confirm session context, Refresh Access, Launch Pad, and Support are visible.
6. Open Membership Help from the success page and confirm the Support intake includes the saved room and Stripe checkout session id.
7. Open the saved paid room and verify access comes from subscription status, not a manual profile role edit.
8. Use Membership Help from cancel once and confirm Support opens the Enrollment lane with the checkout context prefilled.
9. Mark the Admin Console smoke-test items only after the live proof is captured.
10. Download the Admin proof log and keep it with the first-customer launch notes.
