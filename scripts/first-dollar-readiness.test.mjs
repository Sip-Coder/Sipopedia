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
  pricingPageSource,
  paywallSource,
  accessContextSource,
  policyPageSource,
  checkoutFunctionSource,
  billingWebhookSource,
  schemaSource,
  productionProbeSource,
  preflightSource,
  writeRgrdManifestSource,
  verifyRgrdManifestSource,
  packageSource,
  mobileQaSource,
  firstDollarProofSource,
  customerPlanDoc,
  readinessDoc
] = await Promise.all([
  readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/AdminConsole.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/AuthPanel.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/MarketingHome.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/SupportCenter.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/CheckoutPage.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/PricingPage.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/PaywallPanel.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/context/AccessContext.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/PolicyPage.tsx", import.meta.url), "utf8"),
  readFile(new URL("../supabase/functions/create-checkout-session/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../supabase/functions/billing-webhook/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8"),
  readFile(new URL("./first-dollar-production-probe.mjs", import.meta.url), "utf8"),
  readFile(new URL("./first-dollar-preflight.mjs", import.meta.url), "utf8"),
  readFile(new URL("./write-rgrd-manifest.mjs", import.meta.url), "utf8"),
  readFile(new URL("./verify-rgrd-manifest.mjs", import.meta.url), "utf8"),
  readFile(new URL("../package.json", import.meta.url), "utf8"),
  readFile(new URL("./first-dollar-mobile-path-qa.mjs", import.meta.url), "utf8"),
  readFile(new URL("../src/lib/firstDollarProof.ts", import.meta.url), "utf8"),
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
  assert.match(appSource, /copySuccessProofBundle/);
  assert.match(appSource, /checkout_success_proof_bundle_copy/);
  assert.match(appSource, /writeFirstDollarSuccessProof/);
  assert.match(appSource, /Copy proof note/);
  assert.match(appSource, /Sipopedia first-dollar checkout return proof/);
  assert.match(appSource, /Next proof needed: match this session to billing_webhook_events/);
  assert.match(appSource, /Admin override does not count as paid proof/);
  assert.match(firstDollarProofSource, /firstDollarSuccessProofStorageKey/);
  assert.match(firstDollarProofSource, /sipstudies:first-dollar-success-proof:v1/);
  assert.match(firstDollarProofSource, /firstDollarLockoutProofStorageKey/);
  assert.match(firstDollarProofSource, /sipstudies:first-dollar-lockout-proof:v1/);
  assert.match(firstDollarProofSource, /writeFirstDollarSuccessProof/);
  assert.match(firstDollarProofSource, /readFirstDollarSuccessProof/);
  assert.match(firstDollarProofSource, /writeFirstDollarLockoutProof/);
  assert.match(firstDollarProofSource, /readFirstDollarLockoutProof/);
  assert.match(firstDollarProofSource, /stripeSessionId\.startsWith\("cs_"\)/);
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
  assert.match(marketingHomeSource, /reelId/);
  assert.match(marketingHomeSource, /marketing-fit-media/);
  assert.match(marketingHomeSource, /tileReel\.src/);
  assert.match(marketingHomeSource, /home-path-new-learner/);
  assert.match(marketingHomeSource, /home-path-hospitality/);
  assert.match(marketingHomeSource, /home-path-certification/);
  assert.match(marketingHomeSource, /home-path-not-sure/);
  assert.match(marketingHomeSource, /See the system/);
  assert.match(marketingHomeSource, /Practice the craft/);
  assert.match(marketingHomeSource, /Find the answer/);
  assert.match(marketingHomeSource, /All Learn preview rooms/);
  assert.match(marketingHomeSource, /learnPreviewReels\.map/);
  assert.match(marketingHomeSource, /Sip Academy Map/);
  assert.match(marketingHomeSource, /Living Palate/);
  assert.match(marketingHomeSource, /Sip Game/);
  assert.match(marketingHomeSource, /Bev Recipes/);
  assert.match(marketingHomeSource, /Resources/);
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
  assert.match(paywallSource, /copyLockoutProof/);
  assert.match(paywallSource, /Copy lockout proof/);
  assert.match(paywallSource, /Sipopedia first-dollar lockout proof/);
  assert.match(paywallSource, /writeFirstDollarLockoutProof/);
  assert.match(paywallSource, /Lockout proof copied and saved for Admin import/);
  assert.match(paywallSource, /Membership Help opens the billing lane with saved room and visible subscription status/);
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
  assert.match(adminSource, /RGRD safety/);
  assert.match(adminSource, /Preflight before publish/);
  assert.match(adminSource, /Command: \$\{rgrdPreflightCommand\}/);
  assert.match(adminSource, /queued LFS objects or changed LFS-tracked media paths could spend quota/);
  assert.match(adminSource, /rgrdPreflightCommand = "npm run rgrd:preflight"/);
  assert.match(adminSource, /copyRgrdPreflightCommand/);
  assert.match(adminSource, /Copy RGRD preflight/);
  assert.match(adminSource, /admin_rgrd_preflight_command_copy/);
  assert.match(adminSource, /launchProofHandoffSteps/);
  assert.match(adminSource, /Smoke test handoff/);
  assert.match(adminSource, /Safe preflight is not the same as first-dollar proof/);
  assert.match(adminSource, /Proves public wiring only/);
  assert.match(adminSource, /Proves a buyer can pay/);
  assert.match(adminSource, /Proves payment became access/);
  assert.match(adminSource, /Proves access can turn off/);
  assert.match(adminSource, /Live RGRD build/);
  assert.match(adminSource, /rgrd\.json\?admin_probe=/);
  assert.match(adminSource, /Live RGRD manifest: \$\{manifest\.repository\}@\$\{shortCommit\}/);
  assert.match(adminSource, /sourceCommit/);
  assert.match(adminSource, /from GitHub source \$\{shortSourceCommit\}/);
  assert.match(adminSource, /rgrd: nextChecks\.find\(\(check\) => check\.id === "rgrd-manifest"\)\?\.status/);
  assert.match(adminSource, /First-dollar evidence split/);
  assert.match(adminSource, /Live paid proof ladder/);
  assert.match(adminSource, /same Student account/);
  assert.match(adminSource, /launchProofCaptureSteps/);
  assert.match(adminSource, /Proof capture run sheet/);
  assert.match(adminSource, /Capture these in order so Stripe, Supabase, access, and screenshots all point to the same test/);
  assert.match(adminSource, /studentUserId/);
  assert.match(adminSource, /Student user id/);
  assert.match(adminSource, /Supabase user UUID for the same Student test account/);
  assert.match(adminSource, /Needs the Supabase auth\/profile user UUID for the same Student account/);
  assert.match(adminSource, /latestStudentUserId = latestSubscription\?\.user_id/);
  assert.match(adminSource, /Student user id: \$\{launchProofDetails\.studentUserId/);
  assert.match(adminSource, /chooseLaunchSubscriptionProofRow/);
  assert.match(adminSource, /launchSubscriptionRowMatchesProof/);
  assert.match(adminSource, /\.limit\(10\)/);
  assert.match(adminSource, /Matched entered proof row/);
  assert.match(adminSource, /no entered proof matched recent rows/);
  assert.match(adminSource, /targetWasEntered && !selectedRowMatchedTarget \? "warn" : "pass"/);
  assert.match(adminSource, /Production rgrd\.json commit, Student test email, Supabase user id, and saved room route/);
  assert.match(adminSource, /Full cs_ checkout session shown on the Sipopedia success page/);
  assert.match(adminSource, /Stripe evt_ id plus the matching customer_subscriptions row or sub_ id/);
  assert.match(adminSource, /Same row metadata match, paid-room unlock proof, phone screenshots, and lockout result/);
  assert.match(adminSource, /## Proof Capture Run Sheet/);
  assert.match(adminSource, /Student test account starts Stripe Checkout from sipopedia\.com with the saved room attached/);
  assert.match(adminSource, /Admin access, localhost checkout, or a Replit preview URL/);
  assert.match(adminSource, /billing_webhook_events event and one customer_subscriptions row for the same account/);
  assert.match(adminSource, /IDs captured across different rows or different test accounts/);
  assert.match(adminSource, /Opening the room while the account is Admin/);
  assert.match(adminSource, /Only testing the happy path/);
  assert.match(adminSource, /Full cs_test_\.\.\. or cs_live_\.\.\. session id copied from the Sipopedia success page/);
  assert.match(adminSource, /One sentence naming the same row and all three matching Stripe identifiers/);
  assert.match(adminSource, /Capture: \$\{step\.capture\}/);
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
  assert.match(adminSource, /lockoutProof/);
  assert.match(adminSource, /Lockout proof/);
  assert.match(adminSource, /Needs proof that canceled, past-due, unpaid, incomplete, or expired status locks paid access/);
  assert.match(adminSource, /Supabase metadata proof: \$\{launchProofDetails\.supabaseMetadataProof/);
  assert.match(adminSource, /Mobile screenshot proof: \$\{launchProofDetails\.mobileScreenshotProof/);
  assert.match(adminSource, /Lockout proof: \$\{launchProofDetails\.lockoutProof/);
  assert.match(adminSource, /const userLabel = latestStudentUserId \? ` for user \$\{latestStudentUserId\}` : ""/);
  assert.match(adminSource, /Add a specific proof note before this counts as proven/);
  assert.match(adminSource, /buildLaunchProofLogBody/);
  assert.match(adminSource, /copyLaunchProofLog/);
  assert.match(adminSource, /Copy proof log/);
  assert.match(adminSource, /admin_launch_proof_copy/);
  assert.match(adminSource, /buildLaunchTestScriptBody/);
  assert.match(adminSource, /copyLaunchTestScript/);
  assert.match(adminSource, /Sipopedia first-dollar live test script/);
  assert.match(adminSource, /Copy live test script/);
  assert.match(adminSource, /admin_launch_test_script_copy/);
  assert.match(adminSource, /Latest checkout return -> Import checkout proof/);
  assert.match(adminSource, /Latest lockout proof -> Import lockout proof/);
  assert.match(adminSource, /Do not count Admin override, localhost, Replit preview, manual database edits, or mismatched Stripe IDs/);
  assert.match(adminSource, /Clipboard copy is unavailable in this browser/);
  assert.match(adminSource, /readFirstDollarSuccessProof/);
  assert.match(adminSource, /Latest checkout return/);
  assert.match(adminSource, /Import checkout proof/);
  assert.match(adminSource, /admin_first_dollar_success_proof_import/);
  assert.match(adminSource, /Imported checkout session/);
  assert.match(adminSource, /Latest lockout proof/);
  assert.match(adminSource, /Import lockout proof/);
  assert.match(adminSource, /readFirstDollarLockoutProof/);
  assert.match(adminSource, /admin_first_dollar_lockout_proof_import/);
  assert.match(adminSource, /Imported \$\{proof\.subscriptionStatus\} lockout proof/);
  assert.match(adminSource, /setLaunchSmokeState/);
  assert.match(adminSource, /launchFirstCustomerInvites/);
  assert.match(adminSource, /First Customer Invite Kit/);
  assert.match(adminSource, /Use only after the live paid proof ladder is complete/);
  assert.match(adminSource, /copyFirstCustomerInvite/);
  assert.match(adminSource, /Copy invite/);
  assert.match(adminSource, /disabled=\{!launchReadyForPaidInvite\}/);
  assert.match(adminSource, /admin_first_customer_invite_copy/);
  assert.match(adminSource, /Visual learner/);
  assert.match(adminSource, /Service confidence/);
  assert.match(adminSource, /Study companion/);
  assert.match(adminSource, /preview the academy, pick a room/);
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

test("pricing page keeps checkout and support choices visible early", () => {
  assert.match(pricingPageSource, /pricing-hero-actions/);
  assert.match(pricingPageSource, /Membership decision actions/);
  assert.match(pricingPageSource, /\{nextRouteLabel\} stays saved/);
  assert.match(pricingPageSource, /onNavigate\(checkoutRoute\)/);
  assert.match(pricingPageSource, /onNavigate\(membershipSupportRoute\)/);
  assert.match(mobileQaSource, /Pricing checkout CTA is not fully visible in the pricing viewport/);
  assert.match(mobileQaSource, /Pricing help CTA is not fully visible in the pricing viewport/);
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
  assert.match(productionProbeSource, /sourceCommit/);
  assert.match(productionProbeSource, /Replit build stamp/);
  assert.match(productionProbeSource, /expected GitHub source commit/);
  assert.match(productionProbeSource, /public wiring is ready for the real paid smoke test; paid access is still unproven/);
});

test("RGRD manifest keeps Replit publish stamps separate from GitHub source commits", () => {
  assert.match(writeRgrdManifestSource, /sourceCommitMetadata/);
  assert.match(writeRgrdManifestSource, /isReplitPublishCommit/);
  assert.match(writeRgrdManifestSource, /\^published your app\$/i);
  assert.match(writeRgrdManifestSource, /sourceCommit: sourceCommit\.sha/);
  assert.match(writeRgrdManifestSource, /sourceCommitTime: sourceCommit\.commitTime/);
  assert.match(writeRgrdManifestSource, /sourceCommitSubject: sourceCommit\.subject/);
  assert.match(verifyRgrdManifestSource, /manifest\.sourceCommit \?\? manifest\.commit/);
  assert.match(verifyRgrdManifestSource, /RGRD manifest source commit/);
});

test("first-dollar preflight runs safe production and mobile checks together", () => {
  assert.match(packageSource, /"first-dollar:preflight": "node scripts\/first-dollar-preflight\.mjs"/);
  assert.match(packageSource, /"rgrd:preflight": "npm run security:secrets && npm run first-dollar:preflight -- --base-url https:\/\/sipopedia\.com"/);
  assert.match(packageSource, /"rgrd:check": "npm run rgrd:preflight &&/);
  assert.match(preflightSource, /first-dollar-production-probe\.mjs/);
  assert.match(preflightSource, /first-dollar-mobile-path-qa\.mjs/);
  assert.match(preflightSource, /--base-url/);
  assert.match(preflightSource, /Local working tree has/);
  assert.match(preflightSource, /git", \["lfs", "status"\]/);
  assert.match(preflightSource, /Objects to be pushed to /);
  assert.match(preflightSource, /git", \["status", "--porcelain=v1", "-z", "--untracked-files=all"\]/);
  assert.match(preflightSource, /git", \["check-attr", "filter", "--", path\]/);
  assert.match(preflightSource, /Local Git LFS queue is empty; no media objects are staged for push/);
  assert.match(preflightSource, /Local changed files do not match Git LFS tracking rules/);
  assert.match(preflightSource, /queued Git LFS objects could spend LFS quota/);
  assert.match(preflightSource, /changed LFS-tracked files need explicit media approval and quota review/);
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
  assert.match(customerPlanDoc, /expected RGRD GitHub source commit/);
  assert.match(customerPlanDoc, /Replit adds its own publish-stamp commit/);
  assert.match(customerPlanDoc, /First Customer Invite Kit/);
  assert.match(customerPlanDoc, /Use short invites only after the live paid proof ladder passes/);
  assert.match(customerPlanDoc, /I’m opening a small first Sip Studies test group/);
  assert.match(customerPlanDoc, /Preview the academy, pick a room, then join/);
  assert.match(customerPlanDoc, /visual learners, hospitality\/service confidence, and certification-adjacent study companions/);
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
  assert.match(readinessDoc, /Live RGRD build/);
  assert.match(readinessDoc, /exact deployed `rgrd\.json` commit/);
  assert.match(readinessDoc, /GitHub source commit when Replit adds a publish stamp/);
  assert.match(readinessDoc, /deployed Replit build stamp when present/);
  assert.match(readinessDoc, /Proof capture run sheet/);
  assert.match(readinessDoc, /Stripe, Supabase, paid access, and phone screenshots all point to the same signed-in Student test/);
  assert.match(readinessDoc, /Supabase Student user id/);
  assert.match(readinessDoc, /same Student user id/);
  assert.match(readinessDoc, /Matched entered proof row/);
  assert.match(readinessDoc, /no entered proof matched recent rows/);
  assert.match(readinessDoc, /Lockout proof/);
  assert.match(readinessDoc, /canceled, past-due, unpaid, incomplete, or expired status locks paid access/);
  assert.match(readinessDoc, /localhost, Replit preview, Admin access, manually edited rows, mismatched Stripe IDs, and happy-path-only checks do not count/);
  assert.match(readinessDoc, /phone screenshot proof location/);
  assert.match(readinessDoc, /proof log includes the evidence split/);
  assert.match(readinessDoc, /Copy proof log/);
  assert.match(readinessDoc, /phone clipboard/);
  assert.match(readinessDoc, /Latest checkout return -> Import checkout proof/);
  assert.match(readinessDoc, /prefill the Stripe session id, paid room route, and success evidence/);
  assert.match(readinessDoc, /Copy proof note action/);
  assert.match(readinessDoc, /Copy lockout proof/);
  assert.match(readinessDoc, /Latest lockout proof -> Import lockout proof/);
  assert.match(readinessDoc, /fill the Lockout proof field from the observed paywall state/);
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
