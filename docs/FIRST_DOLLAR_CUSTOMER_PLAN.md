# Sipopedia First-Dollar Customer Plan

This is the simple first-dollar operating brief: who Sipopedia should sell to first, what the homepage should make obvious, and what must be proven before asking a real customer to pay.

## First-Dollar Launch Card

- Who buys first: individual beverage learners, hospitality staff, and certification-adjacent students before team plans.
- Homepage hook: show, choose, join. Let moving previews and visual rooms sell the promise before payment.
- First-dollar gate: one live proof loop from production login to Stripe Checkout, webhook sync, paid-room unlock, and canceled/past-due lockout.

## Best First Customers

### 1. Visual Beverage Learners

People who like drinks but feel lost in the vocabulary, maps, regions, production steps, and tasting language. They are the cleanest first customer because Sipopedia can sell one emotional promise: learn drinks visually, from source to service.

Why they fit:
- They need a low-friction way to understand wine, beer, spirits, coffee, tea, and recipes without starting with dense textbooks.
- They respond to preview videos, maps, games, field notes, and visual anchors.
- A $10/month membership is easier to justify than formal certification or team training.

Homepage angle:
- Show the world first.
- Use short previews.
- Give them one clear next step: pick a room, then join.

### 2. Hospitality Workers

Servers, bartenders, retail staff, tasting-room staff, brewery staff, and beverage program assistants who need more confident guest language.

Why they fit:
- The restaurant and foodservice workforce is large and constantly training new people. The National Restaurant Association reports the industry provides 15.7 million U.S. jobs, and BLS projects about 1.16 million annual openings for food and beverage serving workers.
- Staff often need practical wording, not academic depth first.
- Sipopedia can become a quick confidence tool: terms, maps, recipe logic, tasting practice, and service phrasing.

Homepage angle:
- "Speak with more confidence."
- Route them to Recipes, Living Palate, Sipopedia terms, and service-ready practice.

### 3. Certification-Adjacent Students

Learners preparing for or orbiting WSET, CMS, Cicerone, BarSmarts-style, regional wine study, or internal beverage training.

Why they fit:
- WSET and Cicerone show that beverage certification has a clear learner market.
- These learners already pay for education, but often need visual reinforcement beside official materials.
- Sipopedia does not need to replace certification; it can be the visual study companion.

Homepage angle:
- "Give facts a mental map."
- Route them to Sipopedia, Regions, Maps, Grapes & Grains, and Resources.

### 4. Curious Previewers

Visitors who are interested but not ready to pay yet.

Why they fit:
- They are not cold traffic once they watch the previews or ask for help.
- They can become support-led first customers if the site keeps their saved room and question attached.

Homepage angle:
- "Look around before paying."
- Route them to Launch Pad, previews, and Membership Help.

## Homepage Simplification

Keep the homepage centered on one repeatable conversion path:

1. Preview the world.
2. Choose the reason you came.
3. Join once for $10/month.

Avoid adding more explanation above the fold. The homepage should sell by showing:
- A moving preview.
- Four customer paths with their own visual preview clips.
- One membership price.
- Trust signals: preview first, cancel anytime, works on phones, source-backed terms.

The homepage should not try to explain the whole product at once. The product is big; the homepage must make the first choice feel small.

## First-Dollar Offer

Sell the individual membership first:

> $10/month for the visual beverage academy: maps, journeys, games, tasting practice, recipes, terms, and reference rooms.

Do not lead with team plans, custom training, or enterprise features until the one-person checkout loop works end to end.

## What Must Be Proven Before First Dollar

Code-ready is not the same as first-dollar ready. Before asking a real customer to pay, prove:

- Production homepage is on the expected RGRD GitHub source commit, even when Replit adds its own publish-stamp commit.
- Pricing, Login, Checkout, Success, Cancel, Support, Terms, Privacy, and Refund are reachable on phone.
- Login preserves the saved room.
- Stripe Checkout starts from a signed-in production account.
- Stripe returns to Sipopedia success with the checkout session reference.
- Stripe webhook writes or updates `customer_subscriptions`.
- The same Supabase subscription row shows matching Stripe event, session, and subscription metadata.
- Paid room access unlocks from active or trialing subscription status.
- Admin override is not counted as paid proof.
- Canceled or past-due subscription does not keep paid access open.
- Membership Help creates an Enrollment or Billing support request with the saved room attached.

## Safe Probe Before Real Checkout

Run this after each RGRD publish:

```powershell
npm run first-dollar:preflight
```

That one command runs both checks below:

```powershell
npm run first-dollar:probe
npm run first-dollar:mobile-qa -- --base-url https://sipopedia.com
```

The safe probe confirms public wiring only. The mobile QA confirms the phone portrait and landscape buyer path through Homepage, Pricing, Checkout, and Login. These commands do not create a Stripe session, write a subscription, or prove paid access.

## First Paid Test

Use one production test learner account. Walk this path:

1. Open `https://sipopedia.com`.
2. Choose a homepage preview room.
3. Open membership pricing.
4. Log in.
5. Start Stripe Checkout.
6. Complete test-mode checkout.
7. Confirm success page shows the session reference.
8. Confirm Supabase has a matching `customer_subscriptions` row.
9. Confirm that row contains matching `stripe_event_id`, `stripe_session_id`, and `stripe_subscription_id` metadata.
10. Open the saved paid room.
11. Confirm access comes from subscription status, not admin role.
12. Confirm canceled or past-due status locks the room again.
13. Download or record the first-dollar proof log.

Only after that loop passes should Sipopedia invite the first real paying customer.

## First Customer Invite Kit

Use short invites only after the live paid proof ladder passes. The first message should not try to explain every room; it should make one promise, name the $10/month membership, and send people to `https://sipopedia.com`.

Best first invite structure:

1. "I’m opening a small first Sip Studies test group."
2. "$10/month for visual beverage learning."
3. "Preview the academy, pick a room, then join."
4. "Start here: https://sipopedia.com"

The Admin Console includes copyable invite variants for visual learners, hospitality/service confidence, and certification-adjacent study companions. Keep them gated until checkout, webhook, paid-room unlock, and lockout proof all pass.

## Source Notes

- U.S. Bureau of Labor Statistics, Food and Beverage Serving and Related Workers: projected 5 percent employment growth from 2024 to 2034 and about 1,159,600 openings per year.
- National Restaurant Association, Restaurant Employee Demographics: restaurant and foodservice industry provides 15.7 million U.S. jobs.
- National Restaurant Association, workforce technology report: recruitment and retention remain a major operator challenge, supporting lightweight training demand.
- WSET public materials and annual-report filings show established demand for formal drinks qualifications.
- Cicerone Certification Program public certification pages show a structured beer-education pathway for beverage professionals.
