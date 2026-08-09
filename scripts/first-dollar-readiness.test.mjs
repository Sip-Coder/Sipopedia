import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildMembershipSupportRoute,
  formatOnboardingRouteLabel,
  formatOnboardingSourceLabel
} from "../src/lib/onboardingIntent.ts";
import { workspaceLabelForRoute } from "../src/lib/workspaceNavigation.ts";

const [
  appSource,
  adminSource,
  authPanelSource,
  marketingHomeSource,
  supportSource,
  checkoutPageSource,
  accessContextSource,
  policyPageSource,
  checkoutFunctionSource,
  billingWebhookSource,
  schemaSource,
  productionProbeSource,
  preflightSource,
  packageSource,
  mobileQaSource,
  customerPlanDoc,
  readinessDoc
] = await Promise.all([
  readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/AdminConsole.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/AuthPanel.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/MarketingHome.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/SupportCenter.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/CheckoutPage.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/context/AccessContext.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/PolicyPage.tsx", import.meta.url), "utf8"),
  readFile(new URL("../supabase/functions/create-checkout-session/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../supabase/functions/billing-webhook/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8"),
  readFile(new URL("./first-dollar-production-probe.mjs", import.meta.url), "utf8"),
  readFile(new URL("./first-dollar-preflight.mjs", import.meta.url), "utf8"),
  readFile(new URL("../package.json", import.meta.url), "utf8"),
  readFile(new URL("./first-dollar-mobile-path-qa.mjs", import.meta.url), "utf8"),
  readFile(new URL("../docs/FIRST_DOLLAR_CUSTOMER_PLAN.md", import.meta.url), "utf8"),
  readFile(new URL("../docs/FIRST_DOLLAR_READINESS.md", import.meta.url), "utf8")
]);

test("billing recovery support links carry the saved room and subscription status", () => {
  const route = buildMembershipSupportRoute({
    source: "paywall-billing-recovery",
    urgency: "urgent",
    lane: "billing",
    next: "app/btg",
    billingStatus: "past_due"
  });
  const [, queryString] = route.split("?");
  const params = new URLSearchParams(queryString);

  assert.equal(route.startsWith("support?"), true);
  assert.equal(params.get("lane"), "billing");
  assert.equal(params.get("source"), "paywall-billing-recovery");
  assert.equal(params.get("urgency"), "urgent");
  assert.equal(params.get("next"), "app/btg");
  assert.equal(params.get("billing_status"), "past_due");
  assert.equal(workspaceLabelForRoute(params.get("next")), "Beyond The Glass");
});

test("ordinary membership help defaults to enrollment support", () => {
  const route = buildMembershipSupportRoute({
    source: "checkout-help",
    urgency: "soon",
    next: "app/sipopedia"
  });
  const params = new URLSearchParams(route.split("?")[1]);

  assert.equal(params.get("lane"), "enrollment");
  assert.equal(params.get("source"), "checkout-help");
  assert.equal(params.get("billing_status"), null);
});

test("onboarding labels hide route metadata from first buyers", () => {
  assert.equal(formatOnboardingRouteLabel("app/btg"), "Beyond The Glass");
  assert.equal(formatOnboardingRouteLabel("app/recipes"), "Bev Recipes");
  assert.equal(formatOnboardingRouteLabel(null), "Launch Pad");
  assert.equal(formatOnboardingSourceLabel("home-video-sip-academy-map"), "Homepage preview");
  assert.equal(formatOnboardingSourceLabel("home-decision-join"), "Homepage decision");
  assert.equal(formatOnboardingSourceLabel("home-fit-service"), "Homepage customer path");
  assert.equal(formatOnboardingSourceLabel("paywall"), "Locked room");
  assert.match(checkoutPageSource, /Started from/);
  assert.match(policyPageSource, /Saved room/);
  assert.match(policyPageSource, /Continue Enrollment keep this destination attached/);
  assert.match(appSource, /checkoutRecoveryTargetLabel/);
  assert.match(appSource, /\$\{successTargetLabel\} stays attached while access updates/);
  assert.match(appSource, /window\.scrollTo\(\{ top: 0, left: 0, behavior: "auto" \}\)/);
  assert.match(appSource, /First-dollar live proof cues/);
  assert.match(appSource, /Use the Student account that started checkout/);
  assert.match(appSource, /Match session, event, and subscription metadata in Supabase/);
  assert.match(appSource, /Paid access must work without Admin role changes/);
  assert.match(appSource, /copySuccessCheckoutReference/);
  assert.match(appSource, /checkout_success_reference_copy/);
  assert.match(appSource, /Copy into Admin proof or Membership Help if access is still syncing/);
  assert.match(appSource, /\{checkoutRecoveryTargetLabel\} remains attached/);
  assert.match(appSource, /route === "success"[\s\S]*?View Membership Details[\s\S]*?Membership Help/);
  assert.match(appSource, /route === "cancel"[\s\S]*?Retry Membership Checkout/);
});

test("homepage gives first visitors a short conversion decision rail", () => {
  assert.match(marketingHomeSource, /firstVisitDecisions/);
  assert.match(marketingHomeSource, /First visit decision guide/);
  assert.match(marketingHomeSource, /See the product first/);
  assert.match(marketingHomeSource, /home-decision-join/);
  assert.match(marketingHomeSource, /home-decision-help/);
});

test("homepage sells by first-customer fit before feature count", () => {
  assert.match(marketingHomeSource, /Curious beginners/);
  assert.match(marketingHomeSource, /Hospitality staff/);
  assert.match(marketingHomeSource, /Certification prep/);
  assert.match(marketingHomeSource, /Visual learners/);
  assert.match(marketingHomeSource, /New learner/);
  assert.match(marketingHomeSource, /I need better guest language/);
  assert.match(marketingHomeSource, /I need structure beside my study book/);
  assert.match(marketingHomeSource, /I want to preview before paying/);
  assert.match(marketingHomeSource, /home-path-new-learner/);
  assert.match(marketingHomeSource, /home-path-hospitality/);
  assert.match(marketingHomeSource, /home-path-certification/);
  assert.match(marketingHomeSource, /home-path-not-sure/);
  assert.match(marketingHomeSource, /See the system/);
  assert.match(marketingHomeSource, /Practice the craft/);
  assert.match(marketingHomeSource, /Find the answer/);
  assert.match(marketingHomeSource, /Preview first/);
  assert.match(marketingHomeSource, /Cancel anytime/);
  assert.match(marketingHomeSource, /Works on phones/);
  assert.match(marketingHomeSource, /Source-backed terms/);
});

test("login fallback keeps checkout buyers moving when Google is unavailable", () => {
  assert.doesNotMatch(authPanelSource, /showLoginOptions/);
  assert.match(authPanelSource, /Choose a sign-in option\. The saved checkout room stays attached\./);
  assert.match(authPanelSource, /googleUnavailable/);
  assert.match(authPanelSource, /Saved login destination/);
  assert.match(authPanelSource, /After login/);
  assert.match(authPanelSource, /Saved room/);
  assert.match(authPanelSource, /Google Login Unavailable/);
  assert.match(authPanelSource, /Use the email magic link below to keep your saved room attached/);
  assert.match(authPanelSource, /Email magic link keeps the saved checkout room attached/);
});

test("support intake renders human room labels and billing status in recovery messages", () => {
  assert.match(supportSource, /workspaceLabelForRoute\(destinationRoute\)/);
  assert.match(supportSource, /Visible subscription status: \$\{billingStatus\}\./);
  assert.match(supportSource, /"paywall-billing-recovery"[\s\S]*?subject: "Membership billing recovery"/);
  assert.match(supportSource, /"home-decision-help"[\s\S]*?subject: "Help before joining Sip Studies"/);
  assert.match(supportSource, /"home-fit-preview"[\s\S]*?subject: "Help choosing a Sip Studies preview path"/);
});

test("admin launch gate requires meaningful Stripe and access proof", () => {
  assert.match(adminSource, /launchProofEvidenceMinLength = 12/);
  assert.match(adminSource, /Code-ready foundation/);
  assert.match(adminSource, /Needs live proof/);
  assert.match(adminSource, /launchCommandCards/);
  assert.match(adminSource, /First-dollar launch card/);
  assert.match(adminSource, /Who buys first/);
  assert.match(adminSource, /Individuals before teams/);
  assert.match(adminSource, /Homepage hook/);
  assert.match(adminSource, /Show, choose, join/);
  assert.match(adminSource, /First-dollar gate/);
  assert.match(adminSource, /One live proof loop/);
  assert.match(adminSource, /launchProofHandoffSteps/);
  assert.match(adminSource, /Smoke test handoff/);
  assert.match(adminSource, /Safe preflight is not the same as first-dollar proof/);
  assert.match(adminSource, /Proves public wiring only/);
  assert.match(adminSource, /Proves a buyer can pay/);
  assert.match(adminSource, /Proves payment became access/);
  assert.match(adminSource, /Proves access can turn off/);
  assert.match(adminSource, /First-dollar evidence split/);
  assert.match(adminSource, /Live paid proof ladder/);
  assert.match(adminSource, /same Student account/);
  assert.match(adminSource, /Student test account starts Stripe Checkout from sipopedia\.com with the saved room attached/);
  assert.match(adminSource, /Admin access, localhost checkout, or a Replit preview URL/);
  assert.match(adminSource, /billing_webhook_events event and one customer_subscriptions row for the same account/);
  assert.match(adminSource, /IDs captured across different rows or different test accounts/);
  assert.match(adminSource, /Opening the room while the account is Admin/);
  assert.match(adminSource, /Only testing the happy path/);
  assert.match(adminSource, /## Launch Card/);
  assert.match(adminSource, /## Live Paid Proof Ladder/);
  assert.match(adminSource, /## Smoke Test Handoff/);
  assert.match(adminSource, /## Evidence Split/);
  assert.match(adminSource, /reviewable before payment/);
  assert.match(adminSource, /live proof required/);
  assert.equal(adminSource.includes("const launchProofCheckoutSessionRe = /^cs_(?:test|live)_[a-z0-9_]+$/i;"), true);
  assert.equal(adminSource.includes("const launchProofWebhookEventRe = /^evt_[a-z0-9_]+$/i;"), true);
  assert.match(adminSource, /launchProofSubscriptionRe =[\s\S]*?sub_/);
  assert.match(adminSource, /customer_subscriptions UUID or Stripe sub_ id/);
  assert.match(adminSource, /supabaseMetadataProof/);
  assert.match(adminSource, /same customer_subscriptions row contains matching Stripe event, session, and subscription metadata/);
  assert.match(adminSource, /matching stripe_event_id \$\{latestStripeEventId\}, stripe_session_id \$\{latestStripeSessionId\}, and stripe_subscription_id \$\{latestSubscriptionReference\}/);
  assert.match(adminSource, /mobileScreenshotProof/);
  assert.match(adminSource, /Mobile screenshot proof/);
  assert.match(adminSource, /phone portrait and landscape were checked/);
  assert.match(adminSource, /Supabase metadata proof: \$\{launchProofDetails\.supabaseMetadataProof/);
  assert.match(adminSource, /Mobile screenshot proof: \$\{launchProofDetails\.mobileScreenshotProof/);
  assert.match(adminSource, /Add a specific proof note before this counts as proven/);
});

test("checkout Edge Function sanitizes source and next before Stripe session creation", () => {
  assert.match(checkoutFunctionSource, /SAFE_CHECKOUT_SOURCE_RE/);
  assert.match(checkoutFunctionSource, /SAFE_CHECKOUT_NEXT_RE/);
  assert.match(checkoutFunctionSource, /function cleanCheckoutSource/);
  assert.match(checkoutFunctionSource, /function cleanCheckoutNext/);
  assert.match(checkoutFunctionSource, /const source = cleanCheckoutSource\(payload\.source\)/);
  assert.match(checkoutFunctionSource, /const next = cleanCheckoutNext\(payload\.next\)/);
  assert.match(checkoutFunctionSource, /success_url: buildReturnUrl\(baseUrl, "success", plan, source, next\)/);
  assert.match(checkoutFunctionSource, /session_id=\{CHECKOUT_SESSION_ID\}/);
  assert.match(supportSource, /"checkout-success"[\s\S]*?Stripe checkout session: \$\{checkoutSessionId\}\./);
});

test("billing webhook preserves the Stripe-to-Supabase paid access proof chain", () => {
  assert.match(billingWebhookSource, /"checkout\.session\.completed"/);
  assert.match(billingWebhookSource, /"checkout\.session\.async_payment_succeeded"/);
  assert.match(billingWebhookSource, /"customer\.subscription\.created"/);
  assert.match(billingWebhookSource, /"customer\.subscription\.updated"/);
  assert.match(billingWebhookSource, /"customer\.subscription\.deleted"/);
  assert.match(billingWebhookSource, /STRIPE_WEBHOOK_SECRET/);
  assert.match(billingWebhookSource, /verifyStripeSignature\(rawBody, secret, stripeSignature\)/);
  assert.match(billingWebhookSource, /\.from\("billing_webhook_events"\)[\s\S]*?\.select\("event_id"\)/);
  assert.match(billingWebhookSource, /\.from\("customer_subscriptions"\)\.upsert/);
  assert.match(billingWebhookSource, /onConflict: "provider,provider_subscription_id"/);
  assert.match(billingWebhookSource, /stripe_event_id: event\.id/);
  assert.match(billingWebhookSource, /stripe_session_id: sessionId/);
  assert.match(billingWebhookSource, /stripe_subscription_id: subscriptionId/);
  assert.match(billingWebhookSource, /stripe_livemode: event\.livemode === true/);
  assert.match(billingWebhookSource, /eventType === "customer\.subscription\.deleted"[\s\S]*?\? "canceled"/);
  assert.match(schemaSource, /create table if not exists public\.customer_subscriptions/);
  assert.match(schemaSource, /unique \(provider, provider_subscription_id\)/);
  assert.match(schemaSource, /alter table public\.customer_subscriptions enable row level security/);
  assert.match(schemaSource, /create policy "users read own subscriptions"/);
  assert.match(schemaSource, /create policy "service role manages subscriptions"/);
  assert.match(schemaSource, /create table if not exists public\.billing_webhook_events/);
  assert.match(schemaSource, /event_id text primary key/);
  assert.match(schemaSource, /alter table public\.billing_webhook_events enable row level security/);
});

test("assisted enrollment carries saved room context into the support handoff", () => {
  assert.match(checkoutPageSource, /Saved room: \$\{nextRouteLabel\}/);
  assert.match(checkoutPageSource, /Saved room for handoff/);
  assert.match(checkoutPageSource, /Next route: \$\{nextRoute \?\? "app\/launch"\}/);
});

test("paid subscriber proof stays separate from admin override access", () => {
  assert.match(accessContextSource, /function normalizeAccessRole\(role: ProfileRecord\["role"\]\)\s*:\s*AccessRole/);
  assert.match(accessContextSource, /return role === "admin" \? "admin" : "student";/);
  assert.match(accessContextSource, /ENTITLING_SUBSCRIPTION_STATUSES = new Set<SubscriptionStatus>\(\["trialing", "active"\]\)/);
  assert.match(accessContextSource, /isPaid: tier === "pro" \|\| tier === "founding"/);
  assert.doesNotMatch(accessContextSource, /isPaid:[^\n]*tier === "admin"/);
});

test("safe production probe reports remaining paid-access proof", () => {
  assert.match(productionProbeSource, /remainingLiveProof/);
  assert.match(productionProbeSource, /signed-in learner account starts Stripe Checkout from production/);
  assert.match(productionProbeSource, /Stripe webhook writes billing_webhook_events and customer_subscriptions/);
  assert.match(productionProbeSource, /customer_subscriptions\.metadata contains matching Stripe event, session, and subscription identifiers/);
  assert.match(productionProbeSource, /paid room opens from active or trialing subscription status without Admin override/);
  assert.match(productionProbeSource, /public wiring is ready for the real paid smoke test; paid access is still unproven/);
});

test("first-dollar preflight runs safe production and mobile checks together", () => {
  assert.match(packageSource, /"first-dollar:preflight": "node scripts\/first-dollar-preflight\.mjs"/);
  assert.match(preflightSource, /first-dollar-production-probe\.mjs/);
  assert.match(preflightSource, /first-dollar-mobile-path-qa\.mjs/);
  assert.match(preflightSource, /--base-url/);
  assert.match(preflightSource, /Local working tree has/);
  assert.match(preflightSource, /live checks may fail until the next RGRD publish/);
  assert.match(preflightSource, /Preflight passed\. Remaining live proof before inviting a real customer/);
  assert.match(preflightSource, /paid room opens from active or trialing subscription status without Admin override/);
});

test("short first-dollar customer plan matches the live proof gates", () => {
  assert.match(customerPlanDoc, /Visual Beverage Learners/);
  assert.match(customerPlanDoc, /First-Dollar Launch Card/);
  assert.match(customerPlanDoc, /Who buys first: individual beverage learners, hospitality staff, and certification-adjacent students before team plans/);
  assert.match(customerPlanDoc, /Homepage hook: show, choose, join/);
  assert.match(customerPlanDoc, /First-dollar gate: one live proof loop/);
  assert.match(customerPlanDoc, /Hospitality Workers/);
  assert.match(customerPlanDoc, /Certification-Adjacent Students/);
  assert.match(customerPlanDoc, /Curious Previewers/);
  assert.match(customerPlanDoc, /Preview the world/);
  assert.match(customerPlanDoc, /Choose the reason you came/);
  assert.match(customerPlanDoc, /Join once for \$10\/month/);
  assert.match(customerPlanDoc, /npm run first-dollar:probe/);
  assert.match(customerPlanDoc, /npm run first-dollar:preflight/);
  assert.match(customerPlanDoc, /npm run first-dollar:mobile-qa -- --base-url https:\/\/sipopedia\.com/);
  assert.match(customerPlanDoc, /same Supabase subscription row shows matching Stripe event, session, and subscription metadata/);
  assert.match(customerPlanDoc, /stripe_event_id/);
  assert.match(customerPlanDoc, /stripe_session_id/);
  assert.match(customerPlanDoc, /stripe_subscription_id/);
  assert.match(customerPlanDoc, /These commands do not create a Stripe session, write a subscription, or prove paid access/);
  assert.match(customerPlanDoc, /Confirm canceled or past-due status locks the room again/);
});

test("readiness checklist documents the same first-dollar proof requirements", () => {
  assert.match(readinessDoc, /Billing support lane with the saved room and visible subscription status/);
  assert.match(readinessDoc, /Checkout server code sanitizes saved source and destination routes/);
  assert.match(readinessDoc, /preserve Stripe's `\{CHECKOUT_SESSION_ID\}` placeholder/);
  assert.match(readinessDoc, /full `cs_test_\.\.\.` or `cs_live_\.\.\.`/);
  assert.match(readinessDoc, /`sub_\.\.\.` Stripe subscription id or `customer_subscriptions` UUID/);
  assert.match(readinessDoc, /Supabase metadata proof/);
  assert.match(readinessDoc, /Admin Console live paid proof ladder/);
  assert.match(readinessDoc, /Admin launch card/);
  assert.match(readinessDoc, /individuals before teams, show\/choose\/join homepage hook, and one live proof loop/);
  assert.match(readinessDoc, /Smoke test handoff/);
  assert.match(readinessDoc, /Safe preflight proves public wiring only/);
  assert.match(readinessDoc, /localhost, Replit preview, Admin access, manually edited rows, mismatched Stripe IDs, and happy-path-only checks do not count/);
  assert.match(readinessDoc, /phone screenshot proof location/);
  assert.match(readinessDoc, /proof log includes the evidence split/);
  assert.match(readinessDoc, /first-visit decision rail offers Watch, Choose, Join, and Help actions/);
  assert.match(readinessDoc, /Homepage Help actions prefill Support/);
  assert.match(readinessDoc, /Google is unavailable, login clearly points buyers to email magic link/);
  assert.match(readinessDoc, /Login shows the buyer where sign-in resumes/);
  assert.match(readinessDoc, /Success recovery avoids duplicate-checkout prompts/);
  assert.match(readinessDoc, /Assisted Enrollment shows and submits the saved room/);
  assert.match(readinessDoc, /Admin override access is not paid subscriber proof/);
  assert.match(readinessDoc, /npm run first-dollar:preflight/);
  assert.match(packageSource, /"first-dollar:mobile-qa": "node scripts\/first-dollar-mobile-path-qa\.mjs"/);
  assert.match(readinessDoc, /Mobile Buyer Path QA/);
  assert.match(readinessDoc, /Homepage -> Pricing -> Checkout -> Login -> Success -> Cancel/);
  assert.match(mobileQaSource, /phone-portrait/);
  assert.match(mobileQaSource, /phone-landscape/);
  assert.match(mobileQaSource, /05-success-proof/);
  assert.match(mobileQaSource, /06-success-actions/);
  assert.match(mobileQaSource, /07-cancel-proof/);
  assert.match(mobileQaSource, /08-cancel-actions/);
  assert.match(mobileQaSource, /Checkout reference copy action is not fully visible/);
  assert.match(mobileQaSource, /Retry Membership Checkout button is not fully visible/);
  assert.match(mobileQaSource, /Email magic-link field is not fully visible/);
});
