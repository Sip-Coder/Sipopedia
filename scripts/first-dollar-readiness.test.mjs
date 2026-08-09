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

test("login fallback keeps checkout buyers moving when Google is unavailable", () => {
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
  assert.match(adminSource, /First-dollar evidence split/);
  assert.match(adminSource, /## Evidence Split/);
  assert.match(adminSource, /reviewable before payment/);
  assert.match(adminSource, /live proof required/);
  assert.equal(adminSource.includes("const launchProofCheckoutSessionRe = /^cs_(?:test|live)_[a-z0-9_]+$/i;"), true);
  assert.equal(adminSource.includes("const launchProofWebhookEventRe = /^evt_[a-z0-9_]+$/i;"), true);
  assert.match(adminSource, /launchProofSubscriptionRe =[\s\S]*?sub_/);
  assert.match(adminSource, /customer_subscriptions UUID or Stripe sub_ id/);
  assert.match(adminSource, /mobileScreenshotProof/);
  assert.match(adminSource, /Mobile screenshot proof/);
  assert.match(adminSource, /phone portrait and landscape were checked/);
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

test("readiness checklist documents the same first-dollar proof requirements", () => {
  assert.match(readinessDoc, /Billing support lane with the saved room and visible subscription status/);
  assert.match(readinessDoc, /Checkout server code sanitizes saved source and destination routes/);
  assert.match(readinessDoc, /full `cs_test_\.\.\.` or `cs_live_\.\.\.`/);
  assert.match(readinessDoc, /`sub_\.\.\.` Stripe subscription id or `customer_subscriptions` UUID/);
  assert.match(readinessDoc, /phone screenshot proof location/);
  assert.match(readinessDoc, /proof log includes the evidence split/);
  assert.match(readinessDoc, /first-visit decision rail offers Watch, Choose, Join, and Help actions/);
  assert.match(readinessDoc, /Homepage Help actions prefill Support/);
  assert.match(readinessDoc, /Google is unavailable, login clearly points buyers to email magic link/);
  assert.match(readinessDoc, /Login shows the buyer where sign-in resumes/);
  assert.match(readinessDoc, /Success recovery avoids duplicate-checkout prompts/);
  assert.match(readinessDoc, /Assisted Enrollment shows and submits the saved room/);
  assert.match(readinessDoc, /Admin override access is not paid subscriber proof/);
});
