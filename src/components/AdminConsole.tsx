import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowDown, ArrowUp, DotsSixVertical } from "@phosphor-icons/react";
import { useAccess } from "../context/AccessContext";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { trackEvent } from "../lib/analytics";
import {
  isBeverageNewsHealthFresh,
  readBeverageNewsHealth,
  subscribeToBeverageNewsHealth,
  type BeverageNewsHealth
} from "../lib/beverageNewsHealth";
import {
  SITE_MAP_PAGES,
  SITE_MAP_MENU_GROUPS,
  defaultSortOrderForRoute,
  isMainMenuRoute,
  orderedSiteMapPages,
  pageSortOrder,
  siteMapMenuGroupForRoute,
  type PageStatusMap,
  type PageRoomAccess,
  type PagePublicationStatus,
  fetchPageStatusMap,
  publishPageStatusMap,
  readPageStatusMap,
} from "../lib/siteMap";
import {
  readFirstDollarLockoutProof,
  readFirstDollarSuccessProof,
  type FirstDollarLockoutProof,
  type FirstDollarSuccessProof
} from "../lib/firstDollarProof";

type AdminConsoleProps = {
  onNavigate: (route: string) => void;
};

type UserRow = {
  id: string;
  display_name: string | null;
  role: EditableUserRole;
  created_at: string | null;
};

type EditableUserRole = "student" | "admin";

type RawUserRow = Omit<UserRow, "role"> & {
  role: string | null;
};

const adminRoleLabels: Record<EditableUserRole, string> = {
  student: "student",
  admin: "admin"
};

type DashboardStats = {
  profiles: number;
  terms: number;
  notes: number;
  subscriptions: number;
};

type SubscriptionRow = {
  id: string;
  user_id: string;
  plan_code: string;
  status: "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired";
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  updated_at: string;
};

type LaunchReadinessCheck = {
  label: string;
  status: "ready" | "needs-proof" | "operator";
  detail: string;
};

type LaunchSmokeStep = {
  id: string;
  label: string;
  route: string;
  expected: string;
  evidencePrompt: string;
};

type LaunchTestScriptStep = {
  label: string;
  route: string;
  detail: string;
};

type LaunchCustomerSegment = {
  label: string;
  signal: string;
  firstOffer: string;
};

type LaunchCommandCard = {
  label: string;
  title: string;
  detail: string;
  items: string[];
};

const rgrdPreflightCommand = "npm run rgrd:preflight";

type LaunchEvidenceLane = {
  label: string;
  status: "code-ready" | "live-proof";
  detail: string;
  items: string[];
};

type LaunchProofHandoffStep = {
  label: string;
  title: string;
  detail: string;
};

type LaunchLiveProofStep = {
  label: string;
  mustShow: string;
  capture: string;
  notEnough: string;
};

type LaunchProofCaptureStep = {
  label: string;
  capture: string;
  pasteInto: string;
};

type LaunchFirstCustomerInvite = {
  label: string;
  audience: string;
  message: string;
};

type LaunchSmokeState = Record<string, { done: boolean; evidence: string }>;

type StoredLaunchSmokeState = Partial<Record<string, Partial<{ done: boolean; evidence: string }>>>;

type LaunchProofDetails = {
  testAccountEmail: string;
  studentUserId: string;
  stripeSessionId: string;
  webhookEventId: string;
  subscriptionReference: string;
  supabaseMetadataProof: string;
  paidRoomRoute: string;
  mobileScreenshotProof: string;
  lockoutProof: string;
};

type LaunchProofField = {
  field: keyof LaunchProofDetails;
  label: string;
  placeholder: string;
  inputMode?: "email" | "text";
};

type LaunchProofFieldGap = {
  label: string;
  reason: string;
};

type LaunchConnectionStatus = "pass" | "warn" | "fail" | "waiting";

type LaunchConnectionCheck = {
  id: string;
  label: string;
  status: LaunchConnectionStatus;
  detail: string;
  checkedAt?: string;
};

type LaunchRgrdManifest = {
  repository?: unknown;
  commit?: unknown;
  sourceCommit?: unknown;
  branch?: unknown;
  builtAt?: unknown;
  provider?: unknown;
};

type LaunchSubscriptionProbeRow = {
  id?: string | null;
  user_id?: string | null;
  status?: string | null;
  plan_code?: string | null;
  provider_subscription_id?: string | null;
  updated_at?: string | null;
  metadata?: Record<string, unknown> | null;
};

type LaunchSupportProbeRow = {
  lane_id?: string | null;
  urgency?: string | null;
  status?: string | null;
  source_route?: string | null;
  created_at?: string | null;
};

const launchSmokeStorageKey = "sipstudies:first-dollar-smoke:v1";
const launchProofDetailsStorageKey = "sipstudies:first-dollar-proof-details:v1";
const launchProofEvidenceMinLength = 12;
const launchProofEmailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const launchProofCheckoutSessionRe = /^cs_(?:test|live)_[a-z0-9_]+$/i;
const launchProofWebhookEventRe = /^evt_[a-z0-9_]+$/i;
const launchProofSubscriptionRe =
  /^(?:sub_[a-z0-9_]+|[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
const launchProofUuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const launchProofPaidRouteRe = /^app\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/i;

function sqlTextOrNull(value: string): string {
  const trimmed = value.trim();
  return trimmed ? `'${trimmed.replace(/'/g, "''")}'` : "null";
}

function sqlUuidOrNull(value: string): string {
  const trimmed = value.trim();
  return launchProofUuidRe.test(trimmed) ? `${sqlTextOrNull(trimmed)}::uuid` : "null::uuid";
}

const defaultLaunchProofDetails: LaunchProofDetails = {
  testAccountEmail: "",
  studentUserId: "",
  stripeSessionId: "",
  webhookEventId: "",
  subscriptionReference: "",
  supabaseMetadataProof: "",
  paidRoomRoute: "app/btg",
  mobileScreenshotProof: "",
  lockoutProof: ""
};

function buildDefaultLaunchSmokeState(): LaunchSmokeState {
  return launchSmokeSteps.reduce((accumulator, step) => {
    accumulator[step.id] = { done: false, evidence: "" };
    return accumulator;
  }, {} as LaunchSmokeState);
}

function readLaunchSmokeState(): LaunchSmokeState {
  const fallback = buildDefaultLaunchSmokeState();
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(launchSmokeStorageKey);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored) as StoredLaunchSmokeState;
    return launchSmokeSteps.reduce((accumulator, step) => {
      const saved = parsed[step.id];
      accumulator[step.id] = {
        done: saved?.done === true,
        evidence: typeof saved?.evidence === "string" ? saved.evidence : ""
      };
      return accumulator;
    }, {} as LaunchSmokeState);
  } catch {
    return fallback;
  }
}

function writeLaunchSmokeState(state: LaunchSmokeState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(launchSmokeStorageKey, JSON.stringify(state));
  } catch {
    // Local storage is only a convenience for the operator checklist.
  }
};

function readLaunchProofDetails(): LaunchProofDetails {
  if (typeof window === "undefined") return defaultLaunchProofDetails;
  try {
    const stored = window.localStorage.getItem(launchProofDetailsStorageKey);
    if (!stored) return defaultLaunchProofDetails;
    const parsed = JSON.parse(stored) as Partial<LaunchProofDetails>;
    return {
      testAccountEmail: typeof parsed.testAccountEmail === "string" ? parsed.testAccountEmail : "",
      studentUserId: typeof parsed.studentUserId === "string" ? parsed.studentUserId : "",
      stripeSessionId: typeof parsed.stripeSessionId === "string" ? parsed.stripeSessionId : "",
      webhookEventId: typeof parsed.webhookEventId === "string" ? parsed.webhookEventId : "",
      subscriptionReference: typeof parsed.subscriptionReference === "string" ? parsed.subscriptionReference : "",
      supabaseMetadataProof: typeof parsed.supabaseMetadataProof === "string" ? parsed.supabaseMetadataProof : "",
      paidRoomRoute: typeof parsed.paidRoomRoute === "string" && parsed.paidRoomRoute.trim() ? parsed.paidRoomRoute : "app/btg",
      mobileScreenshotProof: typeof parsed.mobileScreenshotProof === "string" ? parsed.mobileScreenshotProof : "",
      lockoutProof: typeof parsed.lockoutProof === "string" ? parsed.lockoutProof : ""
    };
  } catch {
    return defaultLaunchProofDetails;
  }
}

function writeLaunchProofDetails(details: LaunchProofDetails) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(launchProofDetailsStorageKey, JSON.stringify(details));
  } catch {
    // Local storage is only a convenience for the operator proof kit.
  }
}

function functionErrorStatus(error: unknown): number | null {
  const context = (error as { context?: unknown })?.context;
  if (context instanceof Response) return context.status;
  if (context && typeof context === "object" && "status" in context) {
    const status = Number((context as { status?: unknown }).status);
    return Number.isFinite(status) ? status : null;
  }
  return null;
}

async function functionErrorMessage(error: unknown): Promise<string> {
  const context = (error as { context?: unknown })?.context;
  if (context instanceof Response) {
    try {
      const payload = await context.clone().json();
      if (typeof payload?.error === "string") return payload.error;
    } catch {
      // Fall through to generic message.
    }
  }
  return error instanceof Error ? error.message : "Unable to read the function response.";
}

function currentLaunchOrigin(): string {
  if (typeof window === "undefined") return "server render";
  return window.location.origin;
}

function formatLaunchProbeTime(value: string | null | undefined): string {
  if (!value) return "unknown time";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown time";
  return date.toLocaleString();
}

function shortLaunchCommit(value: unknown): string | null {
  if (typeof value !== "string" || !/^[0-9a-f]{7,40}$/i.test(value.trim())) return null;
  return value.trim().slice(0, 7);
}

function metadataStringValue(metadata: Record<string, unknown> | null | undefined, key: string): string | null {
  const value = metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function chooseLaunchSubscriptionProofRow(
  rows: LaunchSubscriptionProbeRow[],
  proofDetails: LaunchProofDetails
): LaunchSubscriptionProbeRow | null {
  if (rows.length === 0) return null;
  const targetedRow = rows.find((row) => launchSubscriptionRowMatchesProof(row, proofDetails));
  return targetedRow ?? rows[0] ?? null;
}

function launchSubscriptionRowMatchesProof(row: LaunchSubscriptionProbeRow, proofDetails: LaunchProofDetails): boolean {
  const targetUserId = proofDetails.studentUserId.trim().toLowerCase();
  const targetSessionId = proofDetails.stripeSessionId.trim().toLowerCase();
  const targetSubscriptionReference = proofDetails.subscriptionReference.trim().toLowerCase();
  const rowUserId = row.user_id?.toLowerCase() ?? "";
  const rowSessionId = metadataStringValue(row.metadata, "stripe_session_id")?.toLowerCase() ?? "";
  const rowSubscriptionId = (
    metadataStringValue(row.metadata, "stripe_subscription_id")
    ?? row.provider_subscription_id
    ?? row.id
    ?? ""
  ).toLowerCase();
  return Boolean(
    (targetUserId && rowUserId === targetUserId)
    || (targetSessionId && rowSessionId === targetSessionId)
    || (targetSubscriptionReference && rowSubscriptionId === targetSubscriptionReference)
  );
}

function countLabel(count: number | null | undefined, singular: string, plural: string): string {
  const safeCount = typeof count === "number" ? count : 0;
  return `${safeCount.toLocaleString()} ${safeCount === 1 ? singular : plural}`;
}

function normalizeAdminUserRole(role: string | null | undefined): EditableUserRole {
  return role === "admin" ? "admin" : "student";
}

function normalizeAdminUserRow(row: RawUserRow): UserRow {
  return {
    ...row,
    role: normalizeAdminUserRole(row.role)
  };
}

function isLaunchSmokeStepProven(state: LaunchSmokeState, stepId: string): boolean {
  const stepState = state[stepId];
  return Boolean(stepState?.done && stepState.evidence.trim().length >= launchProofEvidenceMinLength);
}

function isAdminOverrideSuccessProof(accessStatus: string): boolean {
  const normalized = accessStatus.toLowerCase();
  return normalized.includes("admin_override") || normalized.includes("admin override");
}

function launchSmokeStepGapLabel(state: LaunchSmokeState, step: LaunchSmokeStep): string {
  const stepState = state[step.id];
  if (!stepState?.done) return step.label;
  if (stepState.evidence.trim().length < launchProofEvidenceMinLength) return `${step.label} detailed proof note`;
  return step.label;
}

function launchProofFieldGap(field: LaunchProofField, value: string): LaunchProofFieldGap | null {
  const trimmed = value.trim();
  if (!trimmed) return { label: field.label, reason: "Missing" };
  if (field.field === "testAccountEmail" && !launchProofEmailRe.test(trimmed)) {
    return { label: field.label, reason: "Needs a valid email" };
  }
  if (field.field === "studentUserId" && !launchProofUuidRe.test(trimmed)) {
    return { label: field.label, reason: "Needs the Supabase auth/profile user UUID for the same Student account" };
  }
  if (field.field === "stripeSessionId" && !launchProofCheckoutSessionRe.test(trimmed)) {
    return { label: field.label, reason: "Needs a full cs_test_ or cs_live_ session id" };
  }
  if (field.field === "webhookEventId" && !launchProofWebhookEventRe.test(trimmed)) {
    return { label: field.label, reason: "Needs a full Stripe evt_ id" };
  }
  if (field.field === "subscriptionReference" && !launchProofSubscriptionRe.test(trimmed)) {
    return { label: field.label, reason: "Needs a customer_subscriptions UUID or Stripe sub_ id" };
  }
  if (field.field === "supabaseMetadataProof" && trimmed.length < launchProofEvidenceMinLength) {
    return {
      label: field.label,
      reason: "Needs a note that the same customer_subscriptions row contains matching Stripe event, session, and subscription metadata"
    };
  }
  if (field.field === "paidRoomRoute" && !launchProofPaidRouteRe.test(trimmed)) {
    return { label: field.label, reason: "Needs an app route like app/btg" };
  }
  if (field.field === "mobileScreenshotProof" && trimmed.length < launchProofEvidenceMinLength) {
    return { label: field.label, reason: "Needs a screenshot path, link, or note proving phone portrait and landscape were checked" };
  }
  if (field.field === "lockoutProof" && trimmed.length < launchProofEvidenceMinLength) {
    return { label: field.label, reason: "Needs proof that canceled, past-due, unpaid, incomplete, or expired status locks paid access" };
  }
  return null;
}

function initialLaunchConnectionChecks(): LaunchConnectionCheck[] {
  const origin = currentLaunchOrigin();
  return [
    {
      id: "origin",
      label: "Production origin",
      status: origin.includes("sipopedia.com") ? "pass" : "warn",
      detail: origin.includes("sipopedia.com")
        ? "Running on Sipopedia production."
        : `Currently checking from ${origin}. Re-run on sipopedia.com before taking payment.`
    },
    {
      id: "supabase-client",
      label: "Supabase client",
      status: isSupabaseConfigured ? "pass" : "fail",
      detail: isSupabaseConfigured
        ? "Browser client is configured with public Supabase project settings."
        : "Missing public Supabase URL or anon key in this environment."
    },
    {
      id: "rgrd-manifest",
      label: "Live RGRD build",
      status: "waiting",
      detail: "Run the probe to capture the deployed rgrd.json commit before the paid smoke test."
    },
    {
      id: "checkout-edge",
      label: "Checkout Edge Function",
      status: "waiting",
      detail: "Run the probe to confirm the checkout function answers before Stripe is tested."
    },
    {
      id: "billing-webhook",
      label: "Billing webhook",
      status: "waiting",
      detail: "Run the probe to confirm the billing webhook endpoint is live and rejects unsigned traffic."
    },
    {
      id: "subscription-table",
      label: "Subscription records",
      status: "waiting",
      detail: "Run the probe to confirm subscription rows are reachable through the admin session."
    },
    {
      id: "support-queue",
      label: "Support queue",
      status: "waiting",
      detail: "Run the probe to confirm at least one enrollment support handoff is reachable."
    }
  ];
}

type SocialPlatformKey = "instagram" | "facebook" | "linkedin" | "x" | "tiktok" | "youtube";

type SocialPlatform = {
  id: SocialPlatformKey;
  label: string;
  handle: string;
  postType: string;
  limit: number;
};

const defaultStats: DashboardStats = { profiles: 0, terms: 0, notes: 0, subscriptions: 0 };

const launchReadinessChecks: LaunchReadinessCheck[] = [
  {
    label: "Public promise",
    status: "ready",
    detail: "Homepage previews explain the visual academy before payment."
  },
  {
    label: "Simple offer",
    status: "ready",
    detail: "$10/month membership, account-first checkout, and assisted enrollment are visible."
  },
  {
    label: "Access model",
    status: "ready",
    detail: "Profiles use Student/Admin; only active or trialing subscription records unlock paid access."
  },
  {
    label: "Stripe smoke test",
    status: "needs-proof",
    detail: "Run production checkout with a signed-in test account and confirm Stripe return."
  },
  {
    label: "Webhook unlock",
    status: "needs-proof",
    detail: "Confirm Stripe webhook writes customer_subscriptions and unlocks the paid room."
  },
  {
    label: "Human rescue path",
    status: "operator",
    detail: "Review assisted enrollment/support inbox daily before inviting the first paid users."
  }
];

const launchCommandCards: LaunchCommandCard[] = [
  {
    label: "Who buys first",
    title: "Individuals before teams",
    detail: "Sell the first membership to people already trying to understand drinks, service, or certification study.",
    items: [
      "Curious learners need vocabulary, maps, and production steps to feel less intimidating.",
      "Hospitality staff need practical guest language they can use on shift.",
      "Certification-adjacent students need visual memory anchors beside official materials."
    ]
  },
  {
    label: "Homepage hook",
    title: "Show, choose, join",
    detail: "The homepage should let videos and visual rooms do the selling before it asks for payment.",
    items: [
      "Lead with the moving preview and the promise: learn drinks visually, from source to service.",
      "Route visitors by reason: new learner, service confidence, study structure, or preview first.",
      "Keep the offer simple: one $10/month path with support and cancellation clarity."
    ]
  },
  {
    label: "First-dollar gate",
    title: "One live proof loop",
    detail: "Do not invite paid traffic until the same Student account proves checkout, webhook, access, and lockout.",
    items: [
      "Stripe Checkout starts from sipopedia.com after login and returns with the session reference.",
      "Supabase records matching Stripe event, session, and subscription metadata on one row.",
      "Paid rooms unlock from active/trialing status, while canceled or past-due status locks them again."
    ]
  },
  {
    label: "RGRD safety",
    title: "Preflight before publish",
    detail: "Run the release preflight before Git/Replit deployment when first-dollar or media work changed.",
    items: [
      `Command: ${rgrdPreflightCommand}`,
      "Confirms secrets scan, production wiring, and phone buyer-path QA.",
      "Stops when queued LFS objects or changed LFS-tracked media paths could spend quota."
    ]
  }
];

const launchProofHandoffSteps: LaunchProofHandoffStep[] = [
  {
    label: "Safe preflight",
    title: "Proves public wiring only",
    detail: "After each RGRD, run the production preflight and keep the matching commit, mobile screenshots, checkout guard, and webhook guard together."
  },
  {
    label: "Live checkout",
    title: "Proves a buyer can pay",
    detail: "Use one signed-in Student account on sipopedia.com, start Stripe Checkout, return to success, and capture the full cs_ session reference."
  },
  {
    label: "Webhook row",
    title: "Proves payment became access",
    detail: "Capture the evt_ webhook and the same customer_subscriptions row containing stripe_event_id, stripe_session_id, and stripe_subscription_id."
  },
  {
    label: "Lockout",
    title: "Proves access can turn off",
    detail: "Confirm canceled, unpaid, incomplete, or past-due subscription status locks the paid room and routes the buyer to billing support."
  }
];

const launchSmokeSteps: LaunchSmokeStep[] = [
  {
    id: "homepage",
    label: "Homepage",
    route: "home",
    expected: "A new visitor understands the visual beverage academy, can select a preview room, and sees the $10 membership path.",
    evidencePrompt: "Example: hero preview switcher, previews, and CTA readable on phone."
  },
  {
    id: "pricing",
    label: "Pricing",
    route: "pricing",
    expected: "$10/month, saved preview destination, cancellation, and support feel clear before checkout.",
    evidencePrompt: "Example: pricing shows the selected preview room and help language without zooming."
  },
  {
    id: "trust-links",
    label: "Trust Links",
    route: "pricing",
    expected: "Terms, Privacy, Refunds, and Support are reachable from Pricing and Checkout before payment without losing the saved room.",
    evidencePrompt: "Example: pricing and checkout trust links open correctly with the saved destination still attached."
  },
  {
    id: "policy-exits",
    label: "Policy Exits",
    route: "terms",
    expected: "Terms, Privacy, and Refund pages each offer Membership Details, Ask Support, and Continue Enrollment while preserving the saved room.",
    evidencePrompt: "Example: policy pages return to membership details, open prefilled support, and continue checkout with the same destination."
  },
  {
    id: "login",
    label: "Login",
    route: "login",
    expected: "Google login or email magic link signs in the test learner and preserves the saved checkout room.",
    evidencePrompt: "Example: test account returns to checkout with the same saved destination after sign-in."
  },
  {
    id: "checkout",
    label: "Checkout",
    route: "checkout",
    expected: "A signed-in test account can start Stripe Checkout from production.",
    evidencePrompt: "Example: Stripe opens from sipopedia.com account flow."
  },
  {
    id: "success",
    label: "Success",
    route: "success",
    expected: "Stripe returns to Sipopedia with session context, access refresh, Launch Pad fallback, and support visible.",
    evidencePrompt: "Example: success page confirms active access or shows the safe processing/recovery state."
  },
  {
    id: "cancel-recovery",
    label: "Cancel Recovery",
    route: "cancel",
    expected: "Canceled checkout returns to Sipopedia with retry, pricing, and Membership Help recovery paths intact.",
    evidencePrompt: "Example: cancel page opens support with enrollment context and no lost saved room."
  },
  {
    id: "paid-room",
    label: "Paid Room",
    route: "app/btg",
    expected: "Active or trialing subscription status unlocks the intended paid workspace without manual database edits.",
    evidencePrompt: "Example: active paid account opens Beyond The Glass; canceled or past-due status does not."
  },
  {
    id: "support",
    label: "Support",
    route: "support",
    expected: "Membership Help or Assisted Enrollment creates an Enrollment support request that the admin probe can find.",
    evidencePrompt: "Example: enrollment support request submitted, visible in admin probe, and assigned for follow-up."
  }
];

const launchTestScriptSteps: LaunchTestScriptStep[] = [
  {
    label: "Open production",
    route: "home",
    detail: "Use sipopedia.com on the phone/account that will test payment."
  },
  {
    label: "Preview and price",
    route: "pricing",
    detail: "Select a homepage preview, then confirm Pricing keeps that room, the $10 price, and trust links before checkout."
  },
  {
    label: "Sign in first",
    route: "login",
    detail: "Use the production test learner account and confirm Google or email magic link preserves the saved room."
  },
  {
    label: "Create checkout",
    route: "checkout",
    detail: "Start Stripe from Sipopedia and confirm Stripe shows the correct monthly membership."
  },
  {
    label: "Return and refresh",
    route: "success",
    detail: "Confirm the success page shows session context, access refresh, Launch Pad, and support."
  },
  {
    label: "Prove cancel rescue",
    route: "cancel",
    detail: "Confirm canceled checkout keeps retry, pricing, and Membership Help routes attached to the saved room."
  },
  {
    label: "Unlock the room",
    route: "app/btg",
    detail: "Open the saved paid room and verify access comes from subscription status."
  },
  {
    label: "Submit enrollment help",
    route: "support",
    detail: "Submit Membership Help or Assisted Enrollment once and re-run the admin probe until the Enrollment request is found."
  }
];

const launchCustomerSegments: LaunchCustomerSegment[] = [
  {
    label: "Curious beverage learners",
    signal: "They want drinks explained visually before heavy textbook study.",
    firstOffer: "Lead with cinematic previews and one simple $10 path."
  },
  {
    label: "Hospitality staff",
    signal: "They need better guest language for wine, beer, spirits, coffee, and service.",
    firstOffer: "Show practical field notes, recipes, maps, and tasting practice."
  },
  {
    label: "Certification-adjacent learners",
    signal: "They already study WSET, CMS, Cicerone, or BarSmarts-style material.",
    firstOffer: "Position Sipopedia as a visual companion, not a replacement textbook."
  },
  {
    label: "Visual learners",
    signal: "They need systems, movement, and memory hooks before memorizing terms.",
    firstOffer: "Make previews, maps, and video blocks do most of the selling."
  }
];

const launchEvidenceLanes: LaunchEvidenceLane[] = [
  {
    label: "Code-ready foundation",
    status: "code-ready",
    detail: "These parts can be reviewed in the app before a buyer pays.",
    items: [
      "Homepage audience paths and preview-first membership story",
      "$10 pricing route with saved-room checkout context",
      "Support fallbacks for checkout, cancellation, and billing recovery"
    ]
  },
  {
    label: "Needs live proof",
    status: "live-proof",
    detail: "These parts only count after one signed-in production checkout proves them.",
    items: [
      "Stripe Checkout creates the paid session on sipopedia.com",
      "Stripe webhook writes customer_subscriptions in Supabase",
      "Paid room unlock follows active or trialing subscription status"
    ]
  }
];

const launchLiveProofSteps: LaunchLiveProofStep[] = [
  {
    label: "Signed-in buyer",
    mustShow: "Student test account starts Stripe Checkout from sipopedia.com with the saved room attached.",
    capture: "Student email, Supabase user id, saved room route, and production origin.",
    notEnough: "Admin access, localhost checkout, or a Replit preview URL."
  },
  {
    label: "Stripe return",
    mustShow: "Success page shows the full Stripe Checkout session reference after payment.",
    capture: "Full cs_test_... or cs_live_... session id copied from the Sipopedia success page.",
    notEnough: "A Stripe dashboard payment without the Sipopedia success return."
  },
  {
    label: "Webhook writeback",
    mustShow: "Supabase has a billing_webhook_events event and one customer_subscriptions row for the same account.",
    capture: "billing_webhook_events evt_ id plus the customer_subscriptions row id or Stripe sub_ id.",
    notEnough: "A manually edited subscription row or profile role change."
  },
  {
    label: "Metadata match",
    mustShow: "That same subscription row contains matching stripe_event_id, stripe_session_id, and stripe_subscription_id metadata.",
    capture: "One sentence naming the same row and all three matching Stripe identifiers.",
    notEnough: "IDs captured across different rows or different test accounts."
  },
  {
    label: "Access unlock",
    mustShow: "The saved paid room opens from active or trialing subscription status after Refresh Access.",
    capture: "Paid app/... route, subscription status, and confirmation the profile role stayed Student.",
    notEnough: "Opening the room while the account is Admin."
  },
  {
    label: "Lockout check",
    mustShow: "Canceled, past-due, unpaid, incomplete, and expired statuses do not keep paid access open.",
    capture: "The locked status tested, paywall or recovery screen observed, and Membership Help billing context.",
    notEnough: "Only testing the happy path."
  }
];

const launchProofCaptureSteps: LaunchProofCaptureStep[] = [
  {
    label: "Before checkout",
    capture: "Production rgrd.json commit, Student test email, Supabase user id, and saved room route.",
    pasteInto: "Connection probe, Test account email, Student user id, Paid room route"
  },
  {
    label: "After Stripe return",
    capture: "Full cs_ checkout session shown on the Sipopedia success page.",
    pasteInto: "Stripe session id"
  },
  {
    label: "After webhook",
    capture: "Stripe evt_ id plus the matching customer_subscriptions row or sub_ id.",
    pasteInto: "Webhook event id, Subscription reference"
  },
  {
    label: "After access check",
    capture: "Same row metadata match, paid-room unlock proof, phone screenshots, and lockout result.",
    pasteInto: "Supabase metadata proof, Mobile screenshot proof, Lockout proof, smoke-test notes"
  }
];

const launchFirstCustomerInvites: LaunchFirstCustomerInvite[] = [
  {
    label: "Visual learner",
    audience: "Curious beverage learners who want the world explained before dense study.",
    message:
      "I’m opening a small first Sip Studies test group. It is $10/month and built for visual beverage learning: preview the academy, pick a room, then use maps, field journeys, recipes, terms, and tasting practice to learn drinks from source to service. Start here: https://sipopedia.com"
  },
  {
    label: "Service confidence",
    audience: "Servers, bartenders, tasting-room staff, retail staff, and beverage teams in training.",
    message:
      "I’m inviting a few first Sip Studies members who want stronger beverage language for service. It is $10/month and gives you visual rooms for terms, maps, recipes, tasting practice, and source-to-service journeys. Preview first, then join here: https://sipopedia.com"
  },
  {
    label: "Study companion",
    audience: "Certification-adjacent learners who need visual memory anchors beside official materials.",
    message:
      "Sip Studies is opening its first small member group for people studying wine, beer, spirits, coffee, tea, recipes, maps, and beverage language. It is $10/month and works as a visual study companion, not another textbook. Preview the academy here: https://sipopedia.com"
  }
];

const socialPlatforms: SocialPlatform[] = [
  { id: "instagram", label: "Instagram", handle: "@sipstudies", postType: "Feed, Reel, Story", limit: 2200 },
  { id: "facebook", label: "Facebook", handle: "Sip Studies", postType: "Page post", limit: 63206 },
  { id: "linkedin", label: "LinkedIn", handle: "Sip Studies", postType: "Company update", limit: 3000 },
  { id: "x", label: "X", handle: "@sipstudies", postType: "Short post", limit: 280 },
  { id: "tiktok", label: "TikTok", handle: "@sipstudies", postType: "Video caption", limit: 2200 },
  { id: "youtube", label: "YouTube", handle: "Sip Studies", postType: "Short or community post", limit: 5000 }
];

const initialConnectedPlatforms = socialPlatforms.reduce(
  (accumulator, platform) => ({ ...accumulator, [platform.id]: false }),
  {} as Record<SocialPlatformKey, boolean>
);

export function AdminConsole({ onNavigate }: AdminConsoleProps) {
  const { isAdmin, loading } = useAccess();
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "site-map" | "access" | "subscriptions" | "content">("overview");
  const [publishedPageStatuses, setPublishedPageStatuses] = useState<PageStatusMap>(() => readPageStatusMap());
  const [draftPageStatuses, setDraftPageStatuses] = useState<PageStatusMap>(() => readPageStatusMap());
  const draftPageStatusesRef = useRef<PageStatusMap>(draftPageStatuses);
  const [siteMapNotice, setSiteMapNotice] = useState("No staged Site Map changes.");
  const [siteMapPublishing, setSiteMapPublishing] = useState(false);
  const [siteMapView, setSiteMapView] = useState<"settings" | "order">("settings");
  const [draggedPageRoute, setDraggedPageRoute] = useState<string | null>(null);
  const [dragTargetRoute, setDragTargetRoute] = useState<string | null>(null);
  const dragPointer = useRef<{
    route: string;
    pointerId: number;
    startX: number;
    startY: number;
    activated: boolean;
    lastTargetRoute: string | null;
    announcement: string | null;
  } | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<SocialPlatformKey, boolean>>(initialConnectedPlatforms);
  const [targetPlatforms, setTargetPlatforms] = useState<Record<SocialPlatformKey, boolean>>(initialConnectedPlatforms);
  const [socialPostTopic, setSocialPostTopic] = useState("");
  const [socialPostBody, setSocialPostBody] = useState("");
  const [socialMediaFiles, setSocialMediaFiles] = useState<string[]>([]);
  const [socialPostStatus, setSocialPostStatus] = useState("Draft not staged.");
  const [beverageNewsHealth, setBeverageNewsHealth] = useState<BeverageNewsHealth | null>(() =>
    readBeverageNewsHealth()
  );
  const [launchSmokeState, setLaunchSmokeState] = useState<LaunchSmokeState>(() => readLaunchSmokeState());
  const [launchProofDetails, setLaunchProofDetails] = useState<LaunchProofDetails>(() => readLaunchProofDetails());
  const [launchConnectionChecks, setLaunchConnectionChecks] = useState<LaunchConnectionCheck[]>(() =>
    initialLaunchConnectionChecks()
  );
  const [launchProbeRunning, setLaunchProbeRunning] = useState(false);
  const [launchProofCopyStatus, setLaunchProofCopyStatus] = useState("Proof log is ready to copy or download.");
  const [missingProofCopyStatus, setMissingProofCopyStatus] = useState("Missing proof checklist not copied yet.");
  const [supabaseProofQueryCopyStatus, setSupabaseProofQueryCopyStatus] = useState("Supabase proof query not copied yet.");
  const [launchTestScriptCopyStatus, setLaunchTestScriptCopyStatus] = useState("Live test script not copied yet.");
  const [firstPaidWorksheetCopyStatus, setFirstPaidWorksheetCopyStatus] = useState("First paid test worksheet not copied yet.");
  const [firstDollarBriefCopyStatus, setFirstDollarBriefCopyStatus] = useState("First-dollar answer brief not copied yet.");
  const [rgrdPreflightCopyStatus, setRgrdPreflightCopyStatus] = useState("RGRD preflight command not copied yet.");
  const [firstCustomerInviteCopyStatus, setFirstCustomerInviteCopyStatus] = useState("Invite not copied yet.");
  const [latestSuccessProof, setLatestSuccessProof] = useState<FirstDollarSuccessProof | null>(() => readFirstDollarSuccessProof());
  const [successProofImportStatus, setSuccessProofImportStatus] = useState("No checkout return proof imported yet.");
  const [latestLockoutProof, setLatestLockoutProof] = useState<FirstDollarLockoutProof | null>(() => readFirstDollarLockoutProof());
  const [lockoutProofImportStatus, setLockoutProofImportStatus] = useState("No lockout proof imported yet.");
  draftPageStatusesRef.current = draftPageStatuses;

  useEffect(() => {
    if (!isAdmin || !supabase) return;
    const client = supabase;
    let active = true;
    setLoadingData(true);
    setError("");

    const load = async () => {
      const [profilesResult, terminologyResult, notesResult] = await Promise.all([
        client.from("profiles").select("id,display_name,role,created_at"),
        client.from("terminology_entries").select("id", { count: "exact", head: true }),
        client.from("tasting_notes").select("id", { count: "exact", head: true })
      ]);
      const subscriptionsResult = await client
        .from("customer_subscriptions")
        .select("id,user_id,plan_code,status,current_period_end,cancel_at_period_end,updated_at")
        .order("updated_at", { ascending: false })
        .limit(100);

      if (!active) return;

      const profilesError = profilesResult.error;
      if (profilesError) {
        setError(profilesError.message);
        setLoadingData(false);
        return;
      }

      const nextUsers = ((profilesResult.data as RawUserRow[] | null) ?? []).map(normalizeAdminUserRow);
      const nextSubscriptions = (subscriptionsResult.data as SubscriptionRow[] | null) ?? [];
      setUsers(nextUsers.sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? "")));
      setSubscriptions(nextSubscriptions);
      setStats({
        profiles: nextUsers.length,
        terms: terminologyResult.count ?? 0,
        notes: notesResult.count ?? 0,
        subscriptions: subscriptionsResult.count ?? nextSubscriptions.length
      });
      setLoadingData(false);
    };

    void load();
    return () => {
      active = false;
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    setSiteMapNotice("Loading the published site map...");

    void fetchPageStatusMap()
      .then((published) => {
        if (!active) return;
        setPublishedPageStatuses(published);
        setDraftPageStatuses(published);
        setSiteMapNotice("Published Site Map loaded. No staged changes.");
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        const message = loadError instanceof Error ? loadError.message : "Unable to load the published site map.";
        setSiteMapNotice(`Using the local fallback. ${message}`);
      });

    return () => {
      active = false;
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    const refreshHealth = () => setBeverageNewsHealth(readBeverageNewsHealth());
    refreshHealth();
    return subscribeToBeverageNewsHealth(refreshHealth);
  }, [isAdmin]);

  useEffect(() => {
    writeLaunchSmokeState(launchSmokeState);
  }, [launchSmokeState]);

  useEffect(() => {
    writeLaunchProofDetails(launchProofDetails);
  }, [launchProofDetails]);

  const siteMapDirty = useMemo(
    () =>
      SITE_MAP_PAGES.some((page) => {
        const published = publishedPageStatuses[page.route];
        const draft = draftPageStatuses[page.route];
        return (
          published?.room !== draft?.room ||
          published?.status !== draft?.status ||
          pageSortOrder(page.route, publishedPageStatuses) !== pageSortOrder(page.route, draftPageStatuses)
        );
      }),
    [draftPageStatuses, publishedPageStatuses]
  );

  const siteMapCounts = useMemo(() => {
    return SITE_MAP_PAGES.reduce(
      (acc, page) => {
        const config = draftPageStatuses[page.route] ?? {
          room: page.defaultRoom,
          status: page.defaultStatus,
          sortOrder: defaultSortOrderForRoute(page.route)
        };
        acc.rooms[config.room] += 1;
        acc.statuses[config.status] += 1;
        return acc;
      },
      {
        rooms: { Lobby: 0, Game: 0, Boss: 0 } as Record<PageRoomAccess, number>,
        statuses: { public: 0, edit: 0, off: 0 } as Record<PagePublicationStatus, number>
      }
    );
  }, [draftPageStatuses]);

  const orderedDraftPages = useMemo(() => orderedSiteMapPages(draftPageStatuses), [draftPageStatuses]);
  const menuOrderGroups = useMemo(
    () =>
      SITE_MAP_MENU_GROUPS.filter((group) => group.id !== "other").map((group) => ({
        ...group,
        pages: orderedDraftPages.filter(
          (page) => isMainMenuRoute(page.route) && siteMapMenuGroupForRoute(page.route) === group.id
        )
      })),
    [orderedDraftPages]
  );

  const roleCounts = useMemo(() => {
    const counts = { student: 0, admin: 0 };
    for (const user of users) {
      if (user.role === "admin") counts.admin += 1;
      else counts.student += 1;
    }
    return counts;
  }, [users]);

  const updateRole = async (id: string, role: EditableUserRole) => {
    if (!supabase) return;
    if (!isAdmin) {
      setError("Admin access required.");
      return;
    }
    const { error: updateError } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, role } : user)));
    trackEvent("admin_role_update", { userId: id, role });
  };

  const updateSubscriptionStatus = async (
    id: string,
    status: "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired"
  ) => {
    if (!supabase) return;
    if (!isAdmin) {
      setError("Admin access required.");
      return;
    }
    const { error: updateError } = await supabase.from("customer_subscriptions").update({ status }).eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSubscriptions((current) => current.map((subscription) => (subscription.id === id ? { ...subscription, status } : subscription)));
    trackEvent("admin_subscription_update", { subscriptionId: id, status });
  };

  const connectedCount = socialPlatforms.filter((platform) => connectedPlatforms[platform.id]).length;
  const selectedTargetCount = socialPlatforms.filter((platform) => targetPlatforms[platform.id]).length;
  const selectedPlatformLabels = socialPlatforms
    .filter((platform) => targetPlatforms[platform.id])
    .map((platform) => platform.label);
  const activeSubscriptionCount = subscriptions.filter((subscription) =>
    subscription.status === "trialing" || subscription.status === "active"
  ).length;
  const launchProofFields: LaunchProofField[] = [
    {
      field: "testAccountEmail",
      label: "Test account email",
      placeholder: "learner@example.com",
      inputMode: "email"
    },
    {
      field: "studentUserId",
      label: "Student user id",
      placeholder: "Supabase user UUID for the same Student test account"
    },
    {
      field: "stripeSessionId",
      label: "Stripe session id",
      placeholder: "cs_live_or_test_..."
    },
    {
      field: "webhookEventId",
      label: "Webhook event id",
      placeholder: "evt_... from billing_webhook_events or Stripe"
    },
    {
      field: "subscriptionReference",
      label: "Subscription reference",
      placeholder: "customer_subscriptions id or Stripe subscription"
    },
    {
      field: "supabaseMetadataProof",
      label: "Supabase metadata proof",
      placeholder: "customer_subscriptions row ... has matching stripe_event_id, stripe_session_id, and stripe_subscription_id"
    },
    {
      field: "paidRoomRoute",
      label: "Paid room route",
      placeholder: "app/btg"
    },
    {
      field: "mobileScreenshotProof",
      label: "Mobile screenshot proof",
      placeholder: "phone portrait + landscape screenshots saved in ..."
    },
    {
      field: "lockoutProof",
      label: "Lockout proof",
      placeholder: "canceled or past_due test account saw the paywall and Membership Help opened billing recovery"
    }
  ];
  const completedLaunchSmokeCount = launchSmokeSteps.filter((step) => isLaunchSmokeStepProven(launchSmokeState, step.id)).length;
  const incompleteLaunchSmokeSteps = launchSmokeSteps.filter((step) => !isLaunchSmokeStepProven(launchSmokeState, step.id));
  const pendingLaunchSmokeCount = incompleteLaunchSmokeSteps.length;
  const incompleteLaunchConnectionChecks = launchConnectionChecks.filter((check) => check.status !== "pass");
  const launchConnectionIssueCount = incompleteLaunchConnectionChecks.length;
  const launchProofFieldGaps = launchProofFields
    .map((proofField) => launchProofFieldGap(proofField, launchProofDetails[proofField.field]))
    .filter((gap): gap is LaunchProofFieldGap => Boolean(gap));
  const launchProofMissingCount = launchProofFieldGaps.length;
  const launchOutstandingProofCount = pendingLaunchSmokeCount + launchConnectionIssueCount + launchProofMissingCount;
  const launchReadyForPaidInvite = pendingLaunchSmokeCount === 0 && launchConnectionIssueCount === 0 && launchProofMissingCount === 0;
  const launchDecisionDetail = launchReadyForPaidInvite
    ? "Smoke-test proof, production connection probes, and Stripe/access identifiers are complete. Review the proof log before inviting broader paid traffic."
    : `${pendingLaunchSmokeCount} smoke step${pendingLaunchSmokeCount === 1 ? "" : "s"}, ${launchConnectionIssueCount} connection check${launchConnectionIssueCount === 1 ? "" : "s"}, and ${launchProofMissingCount} Stripe/access field${launchProofMissingCount === 1 ? "" : "s"} still need proof before the first paid invite.`;
  const launchProofGapGroups = [
    {
      label: "Smoke proof",
      status: pendingLaunchSmokeCount === 0 ? "clear" : "missing",
      detail: pendingLaunchSmokeCount === 0 ? "Every production smoke step is checked and has a proof note." : `${pendingLaunchSmokeCount} step${pendingLaunchSmokeCount === 1 ? "" : "s"} still need a checkmark and proof note.`,
      items: incompleteLaunchSmokeSteps.map((step) => launchSmokeStepGapLabel(launchSmokeState, step))
    },
    {
      label: "Connection proof",
      status: launchConnectionIssueCount === 0 ? "clear" : "missing",
      detail: launchConnectionIssueCount === 0 ? "Every safe connection probe is passing." : `${launchConnectionIssueCount} probe${launchConnectionIssueCount === 1 ? "" : "s"} need a pass result on production.`,
      items: incompleteLaunchConnectionChecks.map((check) => check.label)
    },
    {
      label: "Stripe/access proof",
      status: launchProofMissingCount === 0 ? "clear" : "missing",
      detail: launchProofMissingCount === 0 ? "All checkout and access identifiers are captured with plausible formats." : `${launchProofMissingCount} identifier${launchProofMissingCount === 1 ? "" : "s"} still need valid proof.`,
      items: launchProofFieldGaps.map((gap) => `${gap.label}: ${gap.reason}`)
    }
  ];
  const beverageNewsNeedsAttention =
    beverageNewsHealth !== null &&
    isBeverageNewsHealthFresh(beverageNewsHealth) &&
    beverageNewsHealth.status !== "healthy";
  const beverageNewsSeverity =
    beverageNewsHealth?.status === "unavailable"
      ? "Critical"
      : beverageNewsHealth?.status === "degraded" &&
          beverageNewsHealth.failedSources.length >= Math.ceil(beverageNewsHealth.sourceCount / 2)
        ? "High"
        : "Warning";
  const beverageNewsAlertTitle =
    beverageNewsHealth?.status === "unavailable"
      ? "Beverage News unavailable"
      : beverageNewsHealth?.status === "cached"
        ? "Beverage News live refresh delayed"
        : "Beverage News coverage degraded";

  const toggleConnectedPlatform = (platformId: SocialPlatformKey) => {
    setConnectedPlatforms((current) => {
      const nextConnected = !current[platformId];
      if (!nextConnected) {
        setTargetPlatforms((targets) => ({ ...targets, [platformId]: false }));
      }
      return { ...current, [platformId]: nextConnected };
    });
  };

  const toggleTargetPlatform = (platformId: SocialPlatformKey) => {
    if (!connectedPlatforms[platformId]) return;
    setTargetPlatforms((current) => ({ ...current, [platformId]: !current[platformId] }));
  };

  const toggleLaunchSmokeStep = (stepId: string) => {
    setLaunchSmokeState((current) => ({
      ...current,
      [stepId]: {
        done: !current[stepId]?.done,
        evidence: current[stepId]?.evidence ?? ""
      }
    }));
  };

  const updateLaunchSmokeEvidence = (stepId: string, evidence: string) => {
    setLaunchSmokeState((current) => ({
      ...current,
      [stepId]: {
        done: current[stepId]?.done ?? false,
        evidence
      }
    }));
  };

  const resetLaunchSmokeState = () => {
    setLaunchSmokeState(buildDefaultLaunchSmokeState());
    setLaunchProofDetails(defaultLaunchProofDetails);
  };

  const updateLaunchProofDetail = (field: keyof LaunchProofDetails, value: string) => {
    setLaunchProofDetails((current) => ({ ...current, [field]: value }));
  };

  const refreshLatestSuccessProof = () => {
    const proof = readFirstDollarSuccessProof();
    setLatestSuccessProof(proof);
    setSuccessProofImportStatus(
      proof
        ? `Latest checkout return found from ${new Date(proof.capturedAt).toLocaleString()}.`
        : "No checkout return proof found in this browser yet."
    );
  };

  const importLatestSuccessProof = () => {
    const proof = readFirstDollarSuccessProof();
    setLatestSuccessProof(proof);
    if (!proof) {
      setSuccessProofImportStatus("No checkout return proof found. Complete the success-page return first.");
      return;
    }
    if (isAdminOverrideSuccessProof(proof.accessStatus)) {
      setSuccessProofImportStatus(
        "Checkout return was captured under Admin override. Repeat the paid proof with a Student account; Admin access cannot be imported."
      );
      trackEvent("admin_first_dollar_success_proof_rejected", {
        accessStatus: proof.accessStatus,
        route: proof.savedRoomRoute
      });
      return;
    }

    setLaunchProofDetails((current) => ({
      ...current,
      stripeSessionId: proof.stripeSessionId,
      paidRoomRoute: proof.savedRoomRoute || current.paidRoomRoute
    }));
    setLaunchSmokeState((current) => ({
      ...current,
      success: {
        done: current.success?.done ?? false,
        evidence: proof.proofNote || `Stripe checkout return captured for ${proof.stripeSessionId}.`
      }
    }));
    setSuccessProofImportStatus(`Imported checkout session ${proof.stripeSessionId.slice(0, 18)}... into Admin proof.`);
    trackEvent("admin_first_dollar_success_proof_import", {
      accessStatus: proof.accessStatus,
      route: proof.savedRoomRoute
    });
  };

  const refreshLatestLockoutProof = () => {
    const proof = readFirstDollarLockoutProof();
    setLatestLockoutProof(proof);
    setLockoutProofImportStatus(
      proof
        ? `Latest lockout proof found from ${new Date(proof.capturedAt).toLocaleString()}.`
        : "No lockout proof found in this browser yet."
    );
  };

  const importLatestLockoutProof = () => {
    const proof = readFirstDollarLockoutProof();
    setLatestLockoutProof(proof);
    if (!proof) {
      setLockoutProofImportStatus("No lockout proof found. Copy lockout proof from the locked-room paywall first.");
      return;
    }

    setLaunchProofDetails((current) => ({
      ...current,
      paidRoomRoute: proof.lockedRoute || current.paidRoomRoute,
      lockoutProof: proof.proofNote
    }));
    setLaunchSmokeState((current) => ({
      ...current,
      "paid-room": {
        done: current["paid-room"]?.done ?? false,
        evidence: `${current["paid-room"]?.evidence ? `${current["paid-room"].evidence.trim()}\n\n` : ""}${proof.proofNote}`.trim()
      }
    }));
    setLockoutProofImportStatus(`Imported ${proof.subscriptionStatus} lockout proof for ${proof.lockedRouteLabel}.`);
    trackEvent("admin_first_dollar_lockout_proof_import", {
      status: proof.subscriptionStatus,
      route: proof.lockedRoute
    });
  };

  const buildLaunchTestScriptBody = (generatedAt = new Date()) => {
    const stepLines = launchTestScriptSteps.flatMap((step, index) => [
      `${index + 1}. ${step.label}`,
      `   Route: ${step.route}`,
      `   Action: ${step.detail}`
    ]);
    const body = [
      "# Sipopedia first-dollar live test script",
      "",
      `Generated: ${generatedAt.toLocaleString()}`,
      `Origin: ${currentLaunchOrigin()}`,
      "",
      "Use one signed-in production Student account. Do not count Admin override, localhost, Replit preview, manual database edits, or mismatched Stripe IDs.",
      "",
      "## Run Order",
      ...stepLines,
      "",
      "## Proof Capture",
      "- Success page: use Copy proof note after Stripe returns to Sipopedia.",
      "- Admin: use Latest checkout return -> Import checkout proof before matching Supabase rows.",
      "- Supabase: confirm billing_webhook_events.event_id and customer_subscriptions metadata all match the same Stripe session/subscription.",
      "- Paid room: Refresh Access, then open the saved paid route as a Student account.",
      "- Lockout: set or locate a canceled, past-due, unpaid, incomplete, or expired status, then use Copy lockout proof on the paywall.",
      "- Admin: use Latest lockout proof -> Import lockout proof and keep the first-customer invite kit disabled until every proof gate passes.",
      "",
      "## Final Rule",
      "Only invite a real paid customer after checkout, webhook writeback, Student paid access, mobile proof, support fallback, and billing lockout are all proven."
    ].join("\n");
    return { body, generatedAt };
  };

  const buildLaunchProofLogBody = (generatedAt = new Date()) => {
    const launchCardLines = launchCommandCards.flatMap((card) => [
      `- ${card.label}: ${card.title}`,
      `  ${card.detail}`,
      ...card.items.map((item) => `  - ${item}`)
    ]);
    const evidenceLaneLines = launchEvidenceLanes.flatMap((lane) => [
      `- ${lane.label} (${lane.status === "code-ready" ? "reviewable before payment" : "live proof required"}): ${lane.detail}`,
      ...lane.items.map((item) => `  - ${item}`)
    ]);
    const proofHandoffLines = launchProofHandoffSteps.map((step) => (
      `- ${step.label}: ${step.title}. ${step.detail}`
    ));
    const liveProofLines = launchLiveProofSteps.flatMap((step, index) => [
      `${index + 1}. ${step.label}`,
      `   Must show: ${step.mustShow}`,
      `   Capture: ${step.capture}`,
      `   Not enough: ${step.notEnough}`
    ]);
    const proofCaptureLines = launchProofCaptureSteps.flatMap((step, index) => [
      `${index + 1}. ${step.label}`,
      `   Capture: ${step.capture}`,
      `   Paste into: ${step.pasteInto}`
    ]);
    const supabaseProofQueryLines = buildSupabaseProofQueryBody(generatedAt).body.split("\n");
    const liveTestScriptLines = buildLaunchTestScriptBody(generatedAt).body.split("\n").slice(6);
    const firstCustomerInviteLines = launchFirstCustomerInvites.flatMap((invite) => [
      `- ${invite.label}: ${invite.audience}`,
      `  ${invite.message}`
    ]);
    const smokeLines = launchSmokeSteps.flatMap((step, index) => {
      const stepState = launchSmokeState[step.id] ?? { done: false, evidence: "" };
      const stepIsProven = isLaunchSmokeStepProven(launchSmokeState, step.id);
      return [
        `${index + 1}. ${step.label}: ${stepIsProven ? "PROVEN" : "NEEDS PROOF"}`,
        `   Route: ${step.route}`,
        `   Expected: ${step.expected}`,
        `   Evidence: ${stepState.evidence.trim() || "Not captured yet."}`
      ];
    });
    const connectionLines = launchConnectionChecks.map((check) => (
      `- ${check.label}: ${check.status.toUpperCase()} - ${check.detail}${check.checkedAt ? ` (${new Date(check.checkedAt).toLocaleString()})` : ""}`
    ));
    const gapLines = launchProofGapGroups.flatMap((group) => (
      group.items.length
        ? [`- ${group.label}: ${group.detail}`, ...group.items.map((item) => `  - ${item}`)]
        : [`- ${group.label}: clear`]
    ));
    const body = [
      "# Sipopedia First-Dollar Proof Log",
      "",
      `Generated: ${generatedAt.toLocaleString()}`,
      `Origin: ${currentLaunchOrigin()}`,
      `Decision: ${launchReadyForPaidInvite ? "Ready for controlled test" : "Hold paid invite"}`,
      `Detail: ${launchDecisionDetail}`,
      "",
      "## Launch Card",
      ...launchCardLines,
      "",
      "## Evidence Split",
      ...evidenceLaneLines,
      "",
      "## Smoke Test Handoff",
      ...proofHandoffLines,
      "",
      "## Live Paid Proof Ladder",
      ...liveProofLines,
      "",
      "## Proof Capture Run Sheet",
      ...proofCaptureLines,
      "",
      "## First Paid Test Script",
      ...liveTestScriptLines,
      "",
      "## Stripe And Access Proof",
      `- Test account email: ${launchProofDetails.testAccountEmail.trim() || "Not captured yet."}`,
      `- Student user id: ${launchProofDetails.studentUserId.trim() || "Not captured yet."}`,
      `- Stripe session id: ${launchProofDetails.stripeSessionId.trim() || "Not captured yet."}`,
      `- Webhook event id: ${launchProofDetails.webhookEventId.trim() || "Not captured yet."}`,
      `- Subscription reference: ${launchProofDetails.subscriptionReference.trim() || "Not captured yet."}`,
      `- Supabase metadata proof: ${launchProofDetails.supabaseMetadataProof.trim() || "Not captured yet."}`,
      `- Paid room route: ${launchProofDetails.paidRoomRoute.trim() || "Not captured yet."}`,
      `- Mobile screenshot proof: ${launchProofDetails.mobileScreenshotProof.trim() || "Not captured yet."}`,
      `- Lockout proof: ${launchProofDetails.lockoutProof.trim() || "Not captured yet."}`,
      `- Proof field status: ${launchProofMissingCount === 0 ? "All proof fields have plausible formats." : `${launchProofMissingCount} proof field${launchProofMissingCount === 1 ? "" : "s"} need review.`}`,
      "",
      "## Supabase Proof Query",
      "Paste this into Supabase SQL Editor after the real checkout to match webhook and subscription evidence.",
      "```sql",
      ...supabaseProofQueryLines,
      "```",
      "",
      "## Likely First Customers",
      ...launchCustomerSegments.map((segment) => `- ${segment.label}: ${segment.firstOffer}`),
      "",
      "## First Customer Invite Kit",
      "Use only after the live paid proof ladder is complete.",
      ...firstCustomerInviteLines,
      "",
      "## Production Smoke Test",
      ...smokeLines,
      "",
      "## Connection Probe",
      ...connectionLines,
      "",
      "## Missing Proof Checklist",
      ...gapLines,
      "",
      "## Remaining First-Dollar Gate",
      "Run one real signed-in production Stripe checkout and confirm the billing webhook unlocks paid access without manual database edits."
    ].join("\n");
    return { body, generatedAt };
  };

  const buildMissingProofChecklistBody = (generatedAt = new Date()) => {
    const gapLines = launchProofGapGroups.flatMap((group) => (
      group.items.length
        ? [`- ${group.label}: ${group.detail}`, ...group.items.map((item) => `  - ${item}`)]
        : [`- ${group.label}: clear`]
    ));
    const body = [
      "# Sipopedia Missing First-Dollar Proof Checklist",
      "",
      `Generated: ${generatedAt.toLocaleString()}`,
      `Origin: ${currentLaunchOrigin()}`,
      `Decision: ${launchReadyForPaidInvite ? "Ready for controlled paid test" : "Hold paid invite"}`,
      `Detail: ${launchDecisionDetail}`,
      "",
      "## Current Blockers",
      ...gapLines,
      "",
      "## Rule",
      "Do not invite a paid customer until smoke proof, connection proof, and Stripe/access proof are all clear."
    ].join("\n");
    return { body, generatedAt };
  };

  const buildSupabaseProofQueryBody = (generatedAt = new Date()) => {
    const stripeSessionSql = sqlTextOrNull(launchProofDetails.stripeSessionId);
    const webhookEventSql = sqlTextOrNull(launchProofDetails.webhookEventId);
    const studentUserSql = sqlUuidOrNull(launchProofDetails.studentUserId);
    const subscriptionReference = launchProofDetails.subscriptionReference.trim();
    const subscriptionRowSql = launchProofUuidRe.test(subscriptionReference) ? `${sqlTextOrNull(subscriptionReference)}::uuid` : "null::uuid";
    const stripeSubscriptionSql = subscriptionReference.toLowerCase().startsWith("sub_")
      ? sqlTextOrNull(subscriptionReference)
      : "null";
    const body = [
      "-- Sipopedia first-dollar Supabase proof query",
      `-- Generated: ${generatedAt.toLocaleString()}`,
      "-- Paste into the Supabase SQL editor after the signed-in production Stripe checkout.",
      "-- Pass condition: one webhook event and one customer_subscriptions row match the same Student account and Stripe identifiers.",
      "",
      "select",
      "  event_id,",
      "  provider,",
      "  received_at",
      "from public.billing_webhook_events",
      `where event_id = ${webhookEventSql}`,
      "order by received_at desc;",
      "",
      "select",
      "  id,",
      "  user_id,",
      "  provider,",
      "  provider_customer_id,",
      "  provider_subscription_id,",
      "  plan_code,",
      "  status,",
      "  current_period_end,",
      "  cancel_at_period_end,",
      "  updated_at,",
      "  metadata ->> 'stripe_event_id' as stripe_event_id,",
      "  metadata ->> 'stripe_session_id' as stripe_session_id,",
      "  metadata ->> 'stripe_subscription_id' as stripe_subscription_id",
      "from public.customer_subscriptions",
      "where",
      `  user_id = ${studentUserSql}`,
      `  or id = ${subscriptionRowSql}`,
      `  or provider_subscription_id = ${stripeSubscriptionSql}`,
      `  or metadata ->> 'stripe_session_id' = ${stripeSessionSql}`,
      `  or metadata ->> 'stripe_event_id' = ${webhookEventSql}`,
      `  or metadata ->> 'stripe_subscription_id' = ${stripeSubscriptionSql}`,
      "order by updated_at desc",
      "limit 10;",
      "",
      "-- First-dollar pass condition:",
      "-- The same customer_subscriptions row has status active or trialing, the Student user_id entered above, and matching stripe_event_id, stripe_session_id, and stripe_subscription_id metadata."
    ].join("\n");
    return { body, generatedAt };
  };

  const buildFirstPaidTestWorksheetBody = (generatedAt = new Date()) => {
    const worksheetLines = launchProofCaptureSteps.flatMap((step, index) => [
      `${index + 1}. [ ] ${step.label}`,
      `   Capture: ${step.capture}`,
      `   Paste into: ${step.pasteInto}`
    ]);
    const body = [
      "# Sipopedia First Paid Test Worksheet",
      "",
      `Generated: ${generatedAt.toLocaleString()}`,
      `Origin: ${currentLaunchOrigin()}`,
      "Rule: use one signed-in production Student account from checkout through unlock and lockout.",
      "",
      "## Test Identity",
      `- Student email: ${launchProofDetails.testAccountEmail.trim() || "________________"}`,
      `- Student user id: ${launchProofDetails.studentUserId.trim() || "________________"}`,
      `- Saved paid room route: ${launchProofDetails.paidRoomRoute.trim() || "app/btg"}`,
      "",
      "## Run Order",
      ...worksheetLines,
      "",
      "## Stripe And Supabase Match",
      `- Stripe checkout session id: ${launchProofDetails.stripeSessionId.trim() || "cs_________________"}`,
      `- Stripe webhook event id: ${launchProofDetails.webhookEventId.trim() || "evt_________________"}`,
      `- Subscription reference: ${launchProofDetails.subscriptionReference.trim() || "sub_ or customer_subscriptions UUID ________________"}`,
      "- Supabase pass condition: one billing_webhook_events row and one customer_subscriptions row match the same Student user id, stripe_event_id, stripe_session_id, and stripe_subscription_id.",
      "- Supabase proof note:",
      `  ${launchProofDetails.supabaseMetadataProof.trim() || "________________"}`,
      "",
      "## Phone And Access Proof",
      `- Mobile screenshot proof: ${launchProofDetails.mobileScreenshotProof.trim() || "portrait + landscape screenshots saved at ________________"}`,
      "- Paid unlock proof: paid room opens for Student without Admin override.",
      `- Lockout proof: ${launchProofDetails.lockoutProof.trim() || "canceled/past_due/unpaid/incomplete/incomplete_expired status blocks the paid room ________________"}`,
      "",
      "## Finish Line",
      "- Rerun Admin connection probe.",
      "- Confirm all proof gaps are clear.",
      "- Copy or download the full proof log.",
      "- Only then copy a first customer invite."
    ].join("\n");
    return { body, generatedAt };
  };

  const buildFirstDollarAnswerBriefBody = (generatedAt = new Date()) => {
    const customerLines = launchCustomerSegments.map((segment) => (
      `- ${segment.label}: ${segment.signal} First offer: ${segment.firstOffer}`
    ));
    const homepageLines = launchCommandCards
      .find((card) => card.label === "Homepage hook")
      ?.items.map((item) => `- ${item}`) ?? [];
    const proofLines = launchProofGapGroups.flatMap((group) => (
      group.items.length
        ? [`- ${group.label}: ${group.detail}`, ...group.items.map((item) => `  - ${item}`)]
        : [`- ${group.label}: clear`]
    ));
    const body = [
      "# Sipopedia First-Dollar Answer Brief",
      "",
      `Generated: ${generatedAt.toLocaleString()}`,
      `Origin: ${currentLaunchOrigin()}`,
      "",
      "## Potential Customer Base",
      ...customerLines,
      "",
      "## Homepage Simplification",
      "Use the repeated conversion path: show, choose, join.",
      ...homepageLines,
      "- Keep the homepage preview-first: videos, images, and room choices should do more selling than long copy.",
      "",
      "## Before First Dollar",
      "Code-ready is not first-dollar ready. The website should ask for real paid traffic only after one production Student account proves the full loop.",
      "- Production login preserves the saved room.",
      "- Stripe Checkout starts on sipopedia.com and returns with the full session reference.",
      "- Supabase records one webhook event and one customer_subscriptions row with matching Stripe metadata.",
      "- Paid access unlocks from active or trialing subscription status without Admin override.",
      "- Canceled, past_due, unpaid, incomplete, and incomplete_expired statuses lock paid rooms again.",
      "",
      "## Current Launch Decision",
      `- Status: ${launchReadyForPaidInvite ? "Ready for controlled test" : "Hold paid invite"}`,
      `- Detail: ${launchDecisionDetail}`,
      "- Remaining proof:",
      ...proofLines,
      "",
      "## Next Work",
      "- Run the RGRD preflight before publishing first-dollar changes.",
      "- Complete the first paid test worksheet with one signed-in production Student account.",
      "- Copy the Supabase proof query and verify the same webhook event, subscription row, session id, and subscription id.",
      "- Copy or download the full proof log.",
      "- Only then copy and send the first customer invite."
    ].join("\n");
    return { body, generatedAt };
  };

  const copyLaunchTestScript = async () => {
    const { body, generatedAt } = buildLaunchTestScriptBody();
    if (!navigator.clipboard?.writeText) {
      setLaunchTestScriptCopyStatus("Clipboard copy is unavailable in this browser. Use the visible script instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setLaunchTestScriptCopyStatus(`Live test script copied at ${generatedAt.toLocaleTimeString()}.`);
      trackEvent("admin_launch_test_script_copy", {
        steps: launchTestScriptSteps.length,
        ready: launchReadyForPaidInvite
      });
    } catch {
      setLaunchTestScriptCopyStatus("Clipboard copy was blocked. Use the visible script instead.");
    }
  };

  const copyRgrdPreflightCommand = async () => {
    if (!navigator.clipboard?.writeText) {
      setRgrdPreflightCopyStatus("Clipboard copy is unavailable in this browser. Use the visible command instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(rgrdPreflightCommand);
      setRgrdPreflightCopyStatus(`RGRD preflight command copied at ${new Date().toLocaleTimeString()}.`);
      trackEvent("admin_rgrd_preflight_command_copy", {
        command: rgrdPreflightCommand
      });
    } catch {
      setRgrdPreflightCopyStatus("Clipboard copy was blocked. Use the visible command instead.");
    }
  };

  const downloadLaunchProofLog = () => {
    const { body, generatedAt } = buildLaunchProofLogBody();
    const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `sipopedia-first-dollar-proof-${generatedAt.toISOString().slice(0, 10)}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    trackEvent("admin_launch_proof_download", {
      completed: completedLaunchSmokeCount,
      total: launchSmokeSteps.length,
      ready: launchReadyForPaidInvite
    });
  };

  const copyLaunchProofLog = async () => {
    const { body, generatedAt } = buildLaunchProofLogBody();
    if (!navigator.clipboard?.writeText) {
      setLaunchProofCopyStatus("Clipboard copy is unavailable in this browser. Use Download proof log instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setLaunchProofCopyStatus(`Proof log copied at ${generatedAt.toLocaleTimeString()}.`);
      trackEvent("admin_launch_proof_copy", {
        completed: completedLaunchSmokeCount,
        total: launchSmokeSteps.length,
        ready: launchReadyForPaidInvite
      });
    } catch {
      setLaunchProofCopyStatus("Clipboard copy was blocked. Use Download proof log instead.");
    }
  };

  const copyMissingProofChecklist = async () => {
    const { body, generatedAt } = buildMissingProofChecklistBody();
    if (!navigator.clipboard?.writeText) {
      setMissingProofCopyStatus("Clipboard copy is unavailable in this browser. Use Copy proof log or download the proof log instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setMissingProofCopyStatus(`Missing proof checklist copied at ${generatedAt.toLocaleTimeString()}.`);
      trackEvent("admin_launch_missing_proof_copy", {
        outstanding: launchOutstandingProofCount,
        smoke: pendingLaunchSmokeCount,
        connection: launchConnectionIssueCount,
        proofFields: launchProofMissingCount,
        ready: launchReadyForPaidInvite
      });
    } catch {
      setMissingProofCopyStatus("Clipboard copy was blocked. Use Copy proof log or download the proof log instead.");
    }
  };

  const copySupabaseProofQuery = async () => {
    const { body, generatedAt } = buildSupabaseProofQueryBody();
    if (!navigator.clipboard?.writeText) {
      setSupabaseProofQueryCopyStatus("Clipboard copy is unavailable in this browser. Use the visible Supabase proof query steps instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setSupabaseProofQueryCopyStatus(`Supabase proof query copied at ${generatedAt.toLocaleTimeString()}.`);
      trackEvent("admin_launch_supabase_proof_query_copy", {
        hasSession: launchProofCheckoutSessionRe.test(launchProofDetails.stripeSessionId.trim()),
        hasEvent: launchProofWebhookEventRe.test(launchProofDetails.webhookEventId.trim()),
        hasUser: launchProofUuidRe.test(launchProofDetails.studentUserId.trim()),
        hasSubscription: launchProofSubscriptionRe.test(launchProofDetails.subscriptionReference.trim()),
        ready: launchReadyForPaidInvite
      });
    } catch {
      setSupabaseProofQueryCopyStatus("Clipboard copy was blocked. Use the visible Supabase proof query steps instead.");
    }
  };

  const copyFirstPaidTestWorksheet = async () => {
    const { body, generatedAt } = buildFirstPaidTestWorksheetBody();
    if (!navigator.clipboard?.writeText) {
      setFirstPaidWorksheetCopyStatus("Clipboard copy is unavailable in this browser. Use the live test script and proof fields instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setFirstPaidWorksheetCopyStatus(`First paid test worksheet copied at ${generatedAt.toLocaleTimeString()}.`);
      trackEvent("admin_first_paid_test_worksheet_copy", {
        steps: launchProofCaptureSteps.length,
        hasSession: launchProofCheckoutSessionRe.test(launchProofDetails.stripeSessionId.trim()),
        hasEvent: launchProofWebhookEventRe.test(launchProofDetails.webhookEventId.trim()),
        ready: launchReadyForPaidInvite
      });
    } catch {
      setFirstPaidWorksheetCopyStatus("Clipboard copy was blocked. Use the live test script and proof fields instead.");
    }
  };

  const copyFirstDollarAnswerBrief = async () => {
    const { body, generatedAt } = buildFirstDollarAnswerBriefBody();
    if (!navigator.clipboard?.writeText) {
      setFirstDollarBriefCopyStatus("Clipboard copy is unavailable in this browser. Use the visible launch card instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setFirstDollarBriefCopyStatus(`First-dollar answer brief copied at ${generatedAt.toLocaleTimeString()}.`);
      trackEvent("admin_first_dollar_answer_brief_copy", {
        customers: launchCustomerSegments.length,
        outstanding: launchOutstandingProofCount,
        ready: launchReadyForPaidInvite
      });
    } catch {
      setFirstDollarBriefCopyStatus("Clipboard copy was blocked. Use the visible launch card instead.");
    }
  };

  const copyFirstCustomerInvite = async (invite: LaunchFirstCustomerInvite) => {
    if (!navigator.clipboard?.writeText) {
      setFirstCustomerInviteCopyStatus("Clipboard copy is unavailable in this browser. Use the visible invite copy instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(invite.message);
      setFirstCustomerInviteCopyStatus(`${invite.label} invite copied. Use it only after live proof passes.`);
      trackEvent("admin_first_customer_invite_copy", {
        audience: invite.label,
        ready: launchReadyForPaidInvite
      });
    } catch {
      setFirstCustomerInviteCopyStatus("Clipboard copy was blocked. Use the visible invite copy instead.");
    }
  };

  const runLaunchConnectionProbe = async () => {
    const checkedAt = new Date().toISOString();
    const nextChecks = initialLaunchConnectionChecks().map((check) => ({ ...check, checkedAt }));
    setLaunchProbeRunning(true);
    const updateCheck = (id: string, status: LaunchConnectionStatus, detail: string) => {
      const target = nextChecks.find((check) => check.id === id);
      if (target) {
        target.status = status;
        target.detail = detail;
      }
    };

    try {
      const manifestResponse = await fetch(`${currentLaunchOrigin().replace(/\/+$/, "")}/rgrd.json?admin_probe=${Date.now()}`, {
        cache: "no-store"
      });
      if (!manifestResponse.ok) {
        updateCheck(
          "rgrd-manifest",
          "warn",
          `Live build manifest returned ${manifestResponse.status}. Verify rgrd.json after RGRD before payment.`
        );
      } else {
        const manifest = await manifestResponse.json() as LaunchRgrdManifest;
        const shortCommit = shortLaunchCommit(manifest.commit);
        const shortSourceCommit = shortLaunchCommit(manifest.sourceCommit);
        const sourceDetail = shortSourceCommit && shortSourceCommit !== shortCommit
          ? ` from GitHub source ${shortSourceCommit}`
          : "";
        if (manifest.repository === "Sip-Coder/Sipopedia" && shortCommit) {
          updateCheck(
            "rgrd-manifest",
            "pass",
            `Live RGRD manifest: ${manifest.repository}@${shortCommit}${sourceDetail} on ${typeof manifest.branch === "string" ? manifest.branch : "unknown branch"}, built ${formatLaunchProbeTime(typeof manifest.builtAt === "string" ? manifest.builtAt : null)} via ${typeof manifest.provider === "string" ? manifest.provider : "unknown provider"}.`
          );
        } else {
          updateCheck(
            "rgrd-manifest",
            "warn",
            "rgrd.json loaded, but the repository or commit format did not match Sip-Coder/Sipopedia."
          );
        }
      }
    } catch {
      updateCheck(
        "rgrd-manifest",
        "warn",
        "rgrd.json was not available on this origin. Re-run the probe on sipopedia.com after RGRD."
      );
    }

    if (!supabase) {
      setLaunchConnectionChecks(nextChecks.map((check) =>
        check.id === "checkout-edge" || check.id === "billing-webhook" || check.id === "subscription-table" || check.id === "support-queue"
          ? { ...check, status: "fail", detail: "Supabase is not configured in this environment.", checkedAt }
          : check
      ));
      setLaunchProbeRunning(false);
      return;
    }

    try {
      let latestStripeSessionId: string | null = null;
      let latestStripeEventId: string | null = null;
      let latestSubscriptionReference: string | null = null;
      let latestStudentUserId: string | null = null;
      let latestSupabaseMetadataProof: string | null = null;
      const [checkoutResult, billingWebhookResult, subscriptionResult, supportResult] = await Promise.allSettled([
        supabase.functions.invoke<Record<string, unknown>>("create-checkout-session", {
          body: { planId: "__readiness_probe__", source: "admin-connection-probe", next: "app/btg" }
        }),
        supabase.functions.invoke<Record<string, unknown>>("billing-webhook", {
          body: { readinessProbe: true }
        }),
        supabase
          .from("customer_subscriptions")
          .select("id,user_id,status,plan_code,provider_subscription_id,updated_at,metadata", { count: "exact" })
          .order("updated_at", { ascending: false })
          .limit(10),
        supabase
          .from("support_requests")
          .select("lane_id, urgency, status, source_route, created_at", { count: "exact" })
          .eq("lane_id", "enrollment")
          .order("created_at", { ascending: false })
          .limit(1)
      ]);

      if (checkoutResult.status === "rejected") {
        updateCheck("checkout-edge", "fail", "Checkout function could not be reached from this browser session.");
      } else if (checkoutResult.value.error) {
        const status = functionErrorStatus(checkoutResult.value.error);
        const message = await functionErrorMessage(checkoutResult.value.error);
        if (status === 400 && message.toLowerCase().includes("unsupported checkout plan")) {
          updateCheck("checkout-edge", "pass", "Checkout function is reachable and stopped the harmless probe before Stripe.");
        } else if (status === 401) {
          updateCheck("checkout-edge", "warn", "Checkout function is reachable; sign in before the real Stripe test.");
        } else {
          updateCheck("checkout-edge", "fail", `Checkout function responded with ${status ?? "an unexpected status"}: ${message}`);
        }
      } else {
        updateCheck("checkout-edge", "warn", "Checkout function returned data to the probe. Review before running a real payment test.");
      }

      if (billingWebhookResult.status === "rejected") {
        updateCheck("billing-webhook", "fail", "Billing webhook could not be reached from this browser session.");
      } else if (billingWebhookResult.value.error) {
        const status = functionErrorStatus(billingWebhookResult.value.error);
        const message = await functionErrorMessage(billingWebhookResult.value.error);
        if (status === 401 && message.toLowerCase().includes("unauthorized webhook call")) {
          updateCheck("billing-webhook", "pass", "Billing webhook is reachable and correctly rejects the unsigned readiness probe.");
        } else {
          updateCheck("billing-webhook", "fail", `Billing webhook responded with ${status ?? "an unexpected status"}: ${message}`);
        }
      } else {
        updateCheck("billing-webhook", "warn", "Billing webhook accepted the unsigned probe. Review webhook signing before taking payment.");
      }

      if (subscriptionResult.status === "rejected") {
        updateCheck("subscription-table", "fail", "Subscription table probe could not run.");
      } else if (subscriptionResult.value.error) {
        updateCheck("subscription-table", "fail", subscriptionResult.value.error.message);
      } else {
        const subscriptionRows = ((subscriptionResult.value.data as LaunchSubscriptionProbeRow[] | null) ?? []);
        const latestSubscription = chooseLaunchSubscriptionProofRow(subscriptionRows, launchProofDetails);
        const subscriptionCount = countLabel(subscriptionResult.value.count, "subscription record", "subscription records");
        const targetWasEntered = Boolean(
          launchProofDetails.studentUserId.trim()
          || launchProofDetails.stripeSessionId.trim()
          || launchProofDetails.subscriptionReference.trim()
        );
        const selectedRowMatchedTarget = Boolean(latestSubscription && launchSubscriptionRowMatchesProof(latestSubscription, launchProofDetails));
        latestStudentUserId = latestSubscription?.user_id ?? null;
        latestStripeSessionId = metadataStringValue(latestSubscription?.metadata, "stripe_session_id");
        latestStripeEventId = metadataStringValue(latestSubscription?.metadata, "stripe_event_id");
        latestSubscriptionReference = metadataStringValue(latestSubscription?.metadata, "stripe_subscription_id")
          ?? latestSubscription?.provider_subscription_id
          ?? null;
        if (latestSubscription && latestStripeEventId && latestStripeSessionId && latestSubscriptionReference) {
          const rowLabel = latestSubscription.id ? `customer_subscriptions row ${latestSubscription.id}` : "latest customer_subscriptions row";
          const userLabel = latestStudentUserId ? ` for user ${latestStudentUserId}` : "";
          latestSupabaseMetadataProof =
            `${rowLabel}${userLabel} has matching stripe_event_id ${latestStripeEventId}, stripe_session_id ${latestStripeSessionId}, and stripe_subscription_id ${latestSubscriptionReference}.`;
        }
        const metadataProof = [
          latestStripeEventId ? `event ${latestStripeEventId}` : null,
          latestStripeSessionId ? `session ${latestStripeSessionId}` : null,
          latestSubscriptionReference ? `subscription ${latestSubscriptionReference}` : null
        ].filter(Boolean).join(", ");
        updateCheck(
          "subscription-table",
          targetWasEntered && !selectedRowMatchedTarget ? "warn" : "pass",
          latestSubscription
            ? `${subscriptionCount} reachable. ${selectedRowMatchedTarget ? "Matched entered proof row" : targetWasEntered ? "Using newest row because no entered proof matched recent rows" : "Latest row"}: ${latestSubscription.status ?? "unknown status"} ${latestSubscription.plan_code ?? "membership"} for user ${latestSubscription.user_id ?? "unknown user"} updated ${formatLaunchProbeTime(latestSubscription.updated_at)}${metadataProof ? `. Webhook proof: ${metadataProof}.` : "."}`
            : `${subscriptionCount} reachable. Run the real checkout smoke test to create webhook proof.`
        );
      }

      if (supportResult.status === "rejected") {
        updateCheck("support-queue", "fail", "Support queue probe could not run.");
      } else if (supportResult.value.error) {
        updateCheck("support-queue", "warn", `Support queue needs review: ${supportResult.value.error.message}`);
      } else {
        const latestSupport = (supportResult.value.data?.[0] ?? null) as LaunchSupportProbeRow | null;
        const supportCount = countLabel(supportResult.value.count, "enrollment support request", "enrollment support requests");
        updateCheck(
          "support-queue",
          latestSupport ? "pass" : "warn",
          latestSupport
            ? `${supportCount} reachable. Latest: ${latestSupport.status ?? "unknown status"} enrollment request, ${latestSupport.urgency ?? "normal"} urgency, from ${latestSupport.source_route ?? "unknown route"}, created ${formatLaunchProbeTime(latestSupport.created_at)}.`
            : `${supportCount} found. Submit a test Membership Help or Assisted Enrollment request before inviting paid traffic.`
        );
      }

      if (latestStudentUserId || latestStripeSessionId || latestStripeEventId || latestSubscriptionReference || latestSupabaseMetadataProof) {
        setLaunchProofDetails((current) => ({
          ...current,
          studentUserId: current.studentUserId.trim() ? current.studentUserId : latestStudentUserId ?? current.studentUserId,
          stripeSessionId: current.stripeSessionId.trim() ? current.stripeSessionId : latestStripeSessionId ?? current.stripeSessionId,
          webhookEventId: current.webhookEventId.trim() ? current.webhookEventId : latestStripeEventId ?? current.webhookEventId,
          subscriptionReference: current.subscriptionReference.trim()
            ? current.subscriptionReference
            : latestSubscriptionReference ?? current.subscriptionReference,
          supabaseMetadataProof: current.supabaseMetadataProof.trim()
            ? current.supabaseMetadataProof
            : latestSupabaseMetadataProof ?? current.supabaseMetadataProof
        }));
      }

      setLaunchConnectionChecks(nextChecks);
      trackEvent("admin_launch_connection_probe", {
        origin: currentLaunchOrigin(),
        rgrd: nextChecks.find((check) => check.id === "rgrd-manifest")?.status,
        checkout: nextChecks.find((check) => check.id === "checkout-edge")?.status,
        billingWebhook: nextChecks.find((check) => check.id === "billing-webhook")?.status,
        subscriptions: nextChecks.find((check) => check.id === "subscription-table")?.status,
        support: nextChecks.find((check) => check.id === "support-queue")?.status
      });
    } finally {
      setLaunchProbeRunning(false);
    }
  };

  const generateSocialPostDraft = () => {
    const topic = socialPostTopic.trim() || "Sip Studies beverage education";
    const nextBody = [
      `${topic}`,
      "",
      "Build better beverage confidence with a focused Sip Studies lesson, map, or practice loop today.",
      "",
      "#SipStudies #BeverageEducation #WineStudy"
    ].join("\n");
    setSocialPostBody(nextBody);
    setSocialPostStatus("Generated draft ready for review.");
    trackEvent("admin_social_post_generate", { topic });
  };

  const stageSocialPost = () => {
    if (!socialPostBody.trim()) {
      setSocialPostStatus("Write or generate a post before staging.");
      return;
    }
    if (selectedTargetCount === 0) {
      setSocialPostStatus("Select at least one connected platform before staging.");
      return;
    }
    setSocialPostStatus(`Staged for ${selectedPlatformLabels.join(", ")}. Publishing API handoff is ready for backend wiring.`);
    trackEvent("admin_social_post_stage", { platforms: selectedPlatformLabels, mediaCount: socialMediaFiles.length });
  };

  const updateDraftPageRoom = (route: string, room: PageRoomAccess) => {
    setDraftPageStatuses((current) => {
      const currentConfig = current[route] ?? {
        room,
        status: "public" as const,
        sortOrder: defaultSortOrderForRoute(route)
      };
      return { ...current, [route]: { ...currentConfig, room } };
    });
    setSiteMapNotice("Page room change staged. Click Publish to apply all edits.");
  };

  const updateDraftPageStatus = (route: string, status: PagePublicationStatus) => {
    setDraftPageStatuses((current) => {
      const currentConfig = current[route] ?? {
        room: "Lobby" as const,
        status,
        sortOrder: defaultSortOrderForRoute(route)
      };
      return { ...current, [route]: { ...currentConfig, status } };
    });
    setSiteMapNotice("Page status change staged. Click Publish to apply all edits.");
  };

  const reorderDraftPage = (sourceRoute: string, targetRoute: string, announce = true): string | null => {
    if (sourceRoute === targetRoute) return null;
    const sourceGroup = siteMapMenuGroupForRoute(sourceRoute);
    const targetGroup = siteMapMenuGroupForRoute(targetRoute);
    if (sourceGroup !== targetGroup || sourceGroup === "other") return null;

    const currentStatuses = draftPageStatusesRef.current;
    const groupPages = orderedSiteMapPages(currentStatuses).filter(
      (page) => isMainMenuRoute(page.route) && siteMapMenuGroupForRoute(page.route) === sourceGroup
    );
    const sourceIndex = groupPages.findIndex((page) => page.route === sourceRoute);
    const targetIndex = groupPages.findIndex((page) => page.route === targetRoute);
    if (sourceIndex < 0 || targetIndex < 0) return null;

    const nextPages = [...groupPages];
    const [movedPage] = nextPages.splice(sourceIndex, 1);
    nextPages.splice(targetIndex, 0, movedPage);
    const groupBase = Math.floor(defaultSortOrderForRoute(nextPages[0].route) / 1000) * 1000;

    const next = { ...currentStatuses };
    nextPages.forEach((page, index) => {
      const currentConfig = currentStatuses[page.route] ?? {
        room: page.defaultRoom,
        status: page.defaultStatus,
        sortOrder: defaultSortOrderForRoute(page.route)
      };
      next[page.route] = { ...currentConfig, sortOrder: groupBase + index * 10 };
    });
    draftPageStatusesRef.current = next;
    setDraftPageStatuses(next);

    const groupLabel = SITE_MAP_MENU_GROUPS.find((group) => group.id === sourceGroup)?.label ?? sourceGroup;
    const message = `${movedPage.label} moved from ${sourceIndex + 1} to ${targetIndex + 1} in ${groupLabel}. Click Publish Globally to apply it.`;
    if (announce) setSiteMapNotice(message);
    return message;
  };

  const moveDraftPage = (route: string, direction: -1 | 1) => {
    const group = siteMapMenuGroupForRoute(route);
    const groupPages = orderedSiteMapPages(draftPageStatusesRef.current).filter(
      (page) => isMainMenuRoute(page.route) && siteMapMenuGroupForRoute(page.route) === group
    );
    const currentIndex = groupPages.findIndex((page) => page.route === route);
    const target = groupPages[currentIndex + direction];
    if (target) reorderDraftPage(route, target.route);
  };

  const beginPageDrag = (event: ReactPointerEvent<HTMLButtonElement>, route: string) => {
    if (siteMapPublishing || event.button !== 0) return;
    dragPointer.current = {
      route,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      activated: false,
      lastTargetRoute: null,
      announcement: null
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const continuePageDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const currentDrag = dragPointer.current;
    if (!currentDrag || currentDrag.pointerId !== event.pointerId) return;
    const distance = Math.hypot(event.clientX - currentDrag.startX, event.clientY - currentDrag.startY);
    if (!currentDrag.activated && distance < 8) return;
    if (!currentDrag.activated) {
      currentDrag.activated = true;
      setDraggedPageRoute(currentDrag.route);
    }

    event.preventDefault();
    if (event.clientY < 88) window.scrollBy({ top: -14, behavior: "auto" });
    if (event.clientY > window.innerHeight - 88) window.scrollBy({ top: 14, behavior: "auto" });
    const targetElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
    const targetRoute = targetElement?.closest<HTMLElement>("[data-site-map-order-route]")?.dataset.siteMapOrderRoute;
    if (!targetRoute || targetRoute === currentDrag.route || targetRoute === currentDrag.lastTargetRoute) return;
    currentDrag.lastTargetRoute = targetRoute;
    setDragTargetRoute(targetRoute);
    currentDrag.announcement = reorderDraftPage(currentDrag.route, targetRoute, false);
  };

  const finishPageDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const currentDrag = dragPointer.current;
    if (!currentDrag || currentDrag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (currentDrag.announcement) setSiteMapNotice(currentDrag.announcement);
    dragPointer.current = null;
    setDraggedPageRoute(null);
    setDragTargetRoute(null);
  };

  const publishSiteMapChanges = async () => {
    if (!isAdmin || siteMapPublishing) return;
    setSiteMapPublishing(true);
    setSiteMapNotice("Publishing page access for every visitor and device...");

    try {
      const published = await publishPageStatusMap(draftPageStatuses);
      setPublishedPageStatuses(published);
      setDraftPageStatuses(published);
      setSiteMapNotice("Published globally. Menu order, navigation, previews, and route access are synchronized on every device.");
      trackEvent("admin_site_map_publish", {
        pageCount: SITE_MAP_PAGES.length,
        lobby: siteMapCounts.rooms.Lobby,
        game: siteMapCounts.rooms.Game,
        boss: siteMapCounts.rooms.Boss,
        public: siteMapCounts.statuses.public,
        edit: siteMapCounts.statuses.edit,
        off: siteMapCounts.statuses.off
      });
    } catch (publishError) {
      const message = publishError instanceof Error ? publishError.message : "Unable to publish the site map.";
      setSiteMapNotice(`Publish failed. ${message}`);
      setError(message);
    } finally {
      setSiteMapPublishing(false);
    }
  };

  const resetSiteMapDraft = () => {
    setDraftPageStatuses(publishedPageStatuses);
    setDraggedPageRoute(null);
    setDragTargetRoute(null);
    setSiteMapNotice("Discarded all staged Site Map changes.");
  };

  if (loading) {
    return (
      <section className="admin-console">
        <p>Checking admin access...</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="admin-console">
        <h2>Admin Console</h2>
        <p className="error">Admin access required.</p>
        <button className="btn btn-light" onClick={() => onNavigate("home")}>
          Back Home
        </button>
      </section>
    );
  }

  return (
    <section className="admin-console">
      <div className="section-header">
        <h2>Admin Console</h2>
        <p>Manage access tiers, content operations, and launch readiness from one dashboard.</p>
      </div>

      <nav className="page-nav page-nav-sub">
        <button className={`btn ${activeTab === "overview" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button className={`btn ${activeTab === "site-map" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("site-map")}>
          Site Map
        </button>
        <button className={`btn ${activeTab === "access" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("access")}>
          Access
        </button>
        <button
          className={`btn ${activeTab === "subscriptions" ? "btn-primary" : "btn-light"}`}
          onClick={() => setActiveTab("subscriptions")}
        >
          Subscriptions
        </button>
        <button className={`btn ${activeTab === "content" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("content")}>
          Content Ops
        </button>
      </nav>

      {error ? <p className="error">{error}</p> : null}
      {loadingData ? <p>Loading admin data...</p> : null}

      {activeTab === "overview" ? (
        <div className="admin-overview-groups">
          <section className="admin-overview-group" aria-label="Users overview">
            <p className="admin-overview-group-label">Users:</p>
            <div className="admin-overview-grid">
              <article className="admin-card">
                <p className="admin-eyebrow">Audience</p>
                <p className="admin-metric">{stats.profiles}</p>
                <div className="admin-stat-subpills" aria-label="Audience by role">
                  <span><strong>{roleCounts.student}</strong> Students</span>
                  <span><strong>{subscriptions.filter((subscription) => subscription.status === "trialing").length}</strong> Trials</span>
                  <span><strong>{roleCounts.admin}</strong> Admins</span>
                </div>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Billing</p>
                <p className="admin-metric">{stats.subscriptions}</p>
                <small>Synced from customer subscription records</small>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Practice</p>
                <p className="admin-metric">{stats.notes}</p>
                <small>Saved tasting journal records</small>
              </article>
            </div>
          </section>

          <section className="admin-overview-group" aria-label="Site overview">
            <p className="admin-overview-group-label">Site:</p>
            <div className="admin-overview-grid">
              <article className="admin-card">
                <p className="admin-eyebrow">Sipopedia</p>
                <p className="admin-metric">{stats.terms}</p>
                <small>Published terminology entries</small>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Page Access</p>
                <p className="admin-metric">{SITE_MAP_PAGES.length}</p>
                <div className="admin-stat-subpills" aria-label="Page access by room">
                  <span><strong>{siteMapCounts.rooms.Lobby}</strong> Lobby</span>
                  <span><strong>{siteMapCounts.rooms.Game}</strong> Game</span>
                  <span><strong>{siteMapCounts.rooms.Boss}</strong> Boss</span>
                </div>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Visibility</p>
                <p className="admin-metric">{siteMapCounts.statuses.public}</p>
                <div className="admin-stat-subpills" aria-label="Page visibility by status">
                  <span><strong>{siteMapCounts.statuses.public}</strong> Public</span>
                  <span><strong>{siteMapCounts.statuses.edit}</strong> Edit</span>
                  <span><strong>{siteMapCounts.statuses.off}</strong> Off</span>
                </div>
              </article>
            </div>
          </section>

          <section className="admin-overview-group" aria-label="First dollar readiness">
            <p className="admin-overview-group-label">Launch:</p>
            <div className="admin-overview-grid">
              <article className="admin-card admin-launch-readiness-card">
                <div className="admin-launch-readiness-head">
                  <div>
                    <p className="admin-eyebrow">First-dollar readiness</p>
                    <h3>Ready to test, not ready to sell blind.</h3>
                  </div>
                  <span>
                    <strong>{launchOutstandingProofCount}</strong>
                    items left
                  </span>
                </div>
                <p>
                  The product story and checkout path are in place. Before a real customer pays, run one production
                  smoke test that proves login, Stripe, webhook sync, and paid access all connect.
                </p>
                <div className={`admin-launch-decision ${launchReadyForPaidInvite ? "status-ready" : "status-hold"}`} role="status">
                  <span>{launchReadyForPaidInvite ? "Ready for controlled test" : "Hold paid invite"}</span>
                  <strong>{launchReadyForPaidInvite ? "First-customer path is proof-ready." : "Do not invite a paid customer yet."}</strong>
                  <small>{launchDecisionDetail}</small>
                </div>
                <div className="admin-first-dollar-brief" aria-label="First-dollar answer brief">
                  <div className="admin-launch-test-script-head admin-launch-copy-head">
                    <div>
                      <p className="admin-eyebrow">First-dollar answer brief</p>
                      <strong>Customer base, homepage focus, launch gate, and next work in one note.</strong>
                    </div>
                    <button className="btn btn-light" type="button" onClick={() => void copyFirstDollarAnswerBrief()}>
                      Copy answer brief
                    </button>
                  </div>
                  <div className="admin-first-dollar-brief-grid">
                    <span>Who buys first</span>
                    <span>Show, choose, join</span>
                    <span>Proof before invite</span>
                    <span>{launchOutstandingProofCount} gaps left</span>
                  </div>
                  <p className="admin-launch-copy-status" role="status">{firstDollarBriefCopyStatus}</p>
                </div>
                <div className="admin-launch-handoff" aria-label="First-dollar smoke test handoff">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">Smoke test handoff</p>
                    <strong>Safe preflight is not the same as first-dollar proof.</strong>
                  </div>
                  <div className="admin-launch-handoff-grid">
                    {launchProofHandoffSteps.map((step) => (
                      <article key={step.label}>
                        <span>{step.label}</span>
                        <strong>{step.title}</strong>
                        <small>{step.detail}</small>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="admin-launch-command-grid" aria-label="First-dollar launch card">
                  {launchCommandCards.map((card) => (
                    <article key={card.label}>
                      <span>{card.label}</span>
                      <strong>{card.title}</strong>
                      <p>{card.detail}</p>
                      <ul>
                        {card.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
                <div className="admin-launch-test-script-head admin-launch-copy-head" aria-label="RGRD preflight command">
                  <div>
                    <p className="admin-eyebrow">Release safety command</p>
                    <strong>{rgrdPreflightCommand}</strong>
                  </div>
                  <button className="btn btn-light" type="button" onClick={() => void copyRgrdPreflightCommand()}>
                    Copy RGRD preflight
                  </button>
                </div>
                <p className="admin-launch-copy-status" role="status">{rgrdPreflightCopyStatus}</p>
                <div className="admin-launch-evidence-split" aria-label="First-dollar evidence split">
                  {launchEvidenceLanes.map((lane) => (
                    <article className={`status-${lane.status}`} key={lane.label}>
                      <span>{lane.status === "code-ready" ? "Reviewable" : "Live proof"}</span>
                      <strong>{lane.label}</strong>
                      <small>{lane.detail}</small>
                      <ul>
                        {lane.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
                <div className="admin-launch-test-script" aria-label="First paid customer production test script">
                  <div className="admin-launch-test-script-head admin-launch-copy-head">
                    <div>
                      <p className="admin-eyebrow">First paid test script</p>
                      <strong>Run this once, in order, before inviting anyone real.</strong>
                    </div>
                    <button className="btn btn-light" type="button" onClick={() => void copyLaunchTestScript()}>
                      Copy live test script
                    </button>
                  </div>
                  <div className="admin-launch-test-script-grid">
                    {launchTestScriptSteps.map((step, index) => (
                      <article className="admin-launch-test-step" key={step.label}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{step.label}</strong>
                          <small>{step.detail}</small>
                        </div>
                        <button className="btn btn-light" type="button" onClick={() => onNavigate(step.route)}>
                          Open
                        </button>
                      </article>
                    ))}
                  </div>
                  <p className="admin-launch-copy-status" role="status">{launchTestScriptCopyStatus}</p>
                </div>
                <div className="admin-launch-worksheet" aria-label="First paid test worksheet">
                  <div className="admin-launch-test-script-head admin-launch-copy-head">
                    <div>
                      <p className="admin-eyebrow">First paid test worksheet</p>
                      <strong>One paste-ready note for the real checkout run.</strong>
                    </div>
                    <button className="btn btn-light" type="button" onClick={() => void copyFirstPaidTestWorksheet()}>
                      Copy worksheet
                    </button>
                  </div>
                  <p>
                    Use this while testing from a phone so the Student email, saved room, Stripe session, webhook event,
                    Supabase row, screenshots, and lockout proof stay tied to one account.
                  </p>
                  <div className="admin-launch-worksheet-strip">
                    <span>Same Student</span>
                    <span>Same Stripe IDs</span>
                    <span>Same paid room</span>
                    <span>Lockout proven</span>
                  </div>
                  <p className="admin-launch-copy-status" role="status">{firstPaidWorksheetCopyStatus}</p>
                </div>
                <div className="admin-launch-live-proof" aria-label="Live paid proof ladder">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">Live paid proof ladder</p>
                    <strong>Count the test only when every step is proven from the same Student account.</strong>
                  </div>
                  <div className="admin-launch-live-proof-grid">
                    {launchLiveProofSteps.map((step, index) => (
                      <article key={step.label}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{step.label}</strong>
                          <p>{step.mustShow}</p>
                          <em>Capture: {step.capture}</em>
                          <small>Not enough: {step.notEnough}</small>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="admin-launch-customer-grid" aria-label="Likely first customer segments">
                  {launchCustomerSegments.map((segment) => (
                    <div className="admin-launch-customer" key={segment.label}>
                      <strong>{segment.label}</strong>
                      <span>{segment.signal}</span>
                      <small>{segment.firstOffer}</small>
                    </div>
                  ))}
                </div>
                <div className="admin-launch-invite-kit" aria-label="First customer invite kit">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">First customer invite kit</p>
                    <strong>Use after live proof passes.</strong>
                  </div>
                  <p>
                    These short invites keep the first ask simple: preview the academy, choose a room, and join once for
                    $10/month. Do not send them until checkout, webhook, unlock, and lockout proof all pass.
                  </p>
                  <div className="admin-launch-invite-grid">
                    {launchFirstCustomerInvites.map((invite) => (
                      <article key={invite.label}>
                        <span>{invite.label}</span>
                        <strong>{invite.audience}</strong>
                        <p>{invite.message}</p>
                        <button
                          className="btn btn-light"
                          type="button"
                          disabled={!launchReadyForPaidInvite}
                          onClick={() => void copyFirstCustomerInvite(invite)}
                        >
                          Copy invite
                        </button>
                      </article>
                    ))}
                  </div>
                  <p className="admin-launch-copy-status" role="status">{firstCustomerInviteCopyStatus}</p>
                </div>
                <div className="admin-launch-check-grid" aria-label="First dollar launch checks">
                  {launchReadinessChecks.map((check) => (
                    <div className={`admin-launch-check status-${check.status}`} key={check.label}>
                      <span>{check.status === "ready" ? "Ready" : check.status === "needs-proof" ? "Needs proof" : "Operator"}</span>
                      <strong>{check.label}</strong>
                      <small>{check.detail}</small>
                    </div>
                  ))}
                </div>
                <div className="admin-launch-proof-capture" aria-label="Proof capture run sheet">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">Proof capture run sheet</p>
                    <strong>Capture these in order so Stripe, Supabase, access, and screenshots all point to the same test.</strong>
                  </div>
                  <div className="admin-launch-proof-capture-grid">
                    {launchProofCaptureSteps.map((step, index) => (
                      <article key={step.label}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{step.label}</strong>
                          <p>{step.capture}</p>
                          <small>Paste into: {step.pasteInto}</small>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="admin-launch-success-import" aria-label="Latest checkout return proof">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">Latest checkout return</p>
                    <strong>Import the success-page proof before matching Supabase rows.</strong>
                  </div>
                  {latestSuccessProof ? (
                    <div className="admin-launch-success-proof-card">
                      <span>{new Date(latestSuccessProof.capturedAt).toLocaleString()}</span>
                      <strong>{latestSuccessProof.stripeSessionId}</strong>
                      <small>
                        Saved room: {latestSuccessProof.savedRoomLabel} ({latestSuccessProof.savedRoomRoute}) · Access status:
                        {" "}{latestSuccessProof.accessStatus}
                      </small>
                    </div>
                  ) : (
                    <p>No success-page checkout return has been saved in this browser yet.</p>
                  )}
                  <div className="admin-launch-smoke-actions">
                    <button className="btn btn-light" type="button" onClick={refreshLatestSuccessProof}>
                      Refresh latest return
                    </button>
                    <button className="btn btn-light" type="button" disabled={!latestSuccessProof} onClick={importLatestSuccessProof}>
                      Import checkout proof
                    </button>
                  </div>
                  <p className="admin-launch-copy-status" role="status">{successProofImportStatus}</p>
                </div>
                <div className="admin-launch-success-import" aria-label="Latest lockout proof">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">Latest lockout proof</p>
                    <strong>Import the locked-room proof after testing canceled or past-due access.</strong>
                  </div>
                  {latestLockoutProof ? (
                    <div className="admin-launch-success-proof-card">
                      <span>{new Date(latestLockoutProof.capturedAt).toLocaleString()}</span>
                      <strong>{latestLockoutProof.subscriptionStatus} blocked {latestLockoutProof.lockedRouteLabel}</strong>
                      <small>
                        Locked route: {latestLockoutProof.lockedRoute} · Support lane: {latestLockoutProof.supportLane}
                      </small>
                    </div>
                  ) : (
                    <p>No locked-room proof has been saved in this browser yet.</p>
                  )}
                  <div className="admin-launch-smoke-actions">
                    <button className="btn btn-light" type="button" onClick={refreshLatestLockoutProof}>
                      Refresh lockout proof
                    </button>
                    <button className="btn btn-light" type="button" disabled={!latestLockoutProof} onClick={importLatestLockoutProof}>
                      Import lockout proof
                    </button>
                  </div>
                  <p className="admin-launch-copy-status" role="status">{lockoutProofImportStatus}</p>
                </div>
                <div className="admin-launch-success-import" aria-label="Supabase proof query">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">Supabase proof query</p>
                    <strong>Match the webhook event and subscription row before marking paid access proven.</strong>
                  </div>
                  <p>
                    Copy a SQL Editor query that searches `billing_webhook_events` and `customer_subscriptions` using the
                    Student user id, `cs_` session, `evt_` event, and subscription reference captured below.
                  </p>
                  <div className="admin-launch-success-proof-card">
                    <span>Pass condition</span>
                    <strong>One Student subscription row matches the same Stripe session, event, and subscription identifiers.</strong>
                    <small>
                      Active or trialing status proves the unlock path; canceled, past_due, unpaid, incomplete, or expired status
                      must still prove the lockout path.
                    </small>
                  </div>
                  <div className="admin-launch-smoke-actions">
                    <button className="btn btn-light" type="button" onClick={() => void copySupabaseProofQuery()}>
                      Copy Supabase proof query
                    </button>
                  </div>
                  <p className="admin-launch-copy-status" role="status">{supabaseProofQueryCopyStatus}</p>
                </div>
                <div className="admin-launch-proof-fields" aria-label="Stripe and access proof details">
                  <div className="admin-launch-test-script-head">
                    <p className="admin-eyebrow">Stripe + access proof</p>
                    <strong>Capture the identifiers from the real signed-in production test.</strong>
                  </div>
                  {launchProofFields.map((proofField) => {
                    const proofGap = launchProofFieldGap(proofField, launchProofDetails[proofField.field]);
                    const isCaptured = proofGap === null;
                    const fieldHasValue = launchProofDetails[proofField.field].trim().length > 0;
                    return (
                      <label key={proofField.field}>
                        <span className="admin-launch-proof-label-row">
                          {proofField.label}
                          <em className={isCaptured ? "is-complete" : "is-missing"}>
                            {isCaptured ? "Captured" : fieldHasValue ? "Check" : "Missing"}
                          </em>
                        </span>
                        <input
                          value={launchProofDetails[proofField.field]}
                          onChange={(event) => updateLaunchProofDetail(proofField.field, event.target.value)}
                          placeholder={proofField.placeholder}
                          inputMode={proofField.inputMode}
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="admin-launch-proof-gaps" aria-label="First-dollar proof gaps">
                  <div className="admin-launch-proof-gap-head">
                    <div>
                      <p className="admin-eyebrow">Missing proof checklist</p>
                      <strong>{launchOutstandingProofCount === 0 ? "All first-dollar proof gates are clear." : "Copy the blockers before the paid test."}</strong>
                    </div>
                    <button className="btn btn-light" type="button" onClick={() => void copyMissingProofChecklist()}>
                      Copy missing proof
                    </button>
                  </div>
                  <p className="admin-launch-copy-status" role="status">{missingProofCopyStatus}</p>
                  {launchProofGapGroups.map((group) => (
                    <article className={`status-${group.status}`} key={group.label}>
                      <span>{group.status === "clear" ? "Clear" : "Missing"}</span>
                      <strong>{group.label}</strong>
                      <small>{group.detail}</small>
                      {group.items.length > 0 ? (
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
                <div className="admin-launch-smoke-tracker" aria-label="Production smoke test tracker">
                  <div className="admin-launch-smoke-head">
                    <div>
                      <p className="admin-eyebrow">Production smoke test</p>
                      <h4>{completedLaunchSmokeCount} of {launchSmokeSteps.length} proven</h4>
                    </div>
                    <div className="admin-launch-smoke-actions">
                      <button className="btn btn-light" type="button" onClick={() => void copyLaunchProofLog()}>
                        Copy proof log
                      </button>
                      <button className="btn btn-light" type="button" onClick={downloadLaunchProofLog}>
                        Download proof log
                      </button>
                      <button className="btn btn-light" type="button" onClick={resetLaunchSmokeState}>
                        Reset proof
                      </button>
                    </div>
                  </div>
                  <p className="admin-launch-copy-status" role="status">{launchProofCopyStatus}</p>
                  {launchSmokeSteps.map((step) => {
                    const stepState = launchSmokeState[step.id] ?? { done: false, evidence: "" };
                    const stepIsProven = isLaunchSmokeStepProven(launchSmokeState, step.id);
                    return (
                      <article className={`admin-launch-smoke-step ${stepIsProven ? "is-complete" : ""} ${stepState.done && !stepIsProven ? "needs-evidence" : ""}`} key={step.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={stepState.done}
                            onChange={() => toggleLaunchSmokeStep(step.id)}
                          />
                          <span>
                            <strong>{step.label}</strong>
                            <small>{step.expected}</small>
                          </span>
                        </label>
                        <button className="btn btn-light" type="button" onClick={() => onNavigate(step.route)}>
                          Open
                        </button>
                        <textarea
                          aria-label={`${step.label} proof note`}
                          value={stepState.evidence}
                          onChange={(event) => updateLaunchSmokeEvidence(step.id, event.target.value)}
                          placeholder={step.evidencePrompt}
                          rows={2}
                        />
                        {stepState.done && !stepIsProven ? <small className="hint">Add a specific proof note before this counts as proven.</small> : null}
                      </article>
                    );
                  })}
                </div>
                <div className="admin-launch-connection-probe" aria-label="Production connection probe">
                  <div className="admin-launch-smoke-head">
                    <div>
                      <p className="admin-eyebrow">Connection probe</p>
                      <h4>Check safe wiring before the real Stripe test.</h4>
                    </div>
                    <button className="btn btn-light" type="button" onClick={() => void runLaunchConnectionProbe()} disabled={launchProbeRunning}>
                      {launchProbeRunning ? "Checking..." : "Run probe"}
                    </button>
                  </div>
                  <div className="admin-launch-connection-grid">
                    {launchConnectionChecks.map((check) => (
                      <article className={`admin-launch-connection-check status-${check.status}`} key={check.id}>
                        <span>{check.status === "pass" ? "Pass" : check.status === "warn" ? "Review" : check.status === "fail" ? "Fix" : "Waiting"}</span>
                        <strong>{check.label}</strong>
                        <small>{check.detail}</small>
                        {check.checkedAt ? <em>{new Date(check.checkedAt).toLocaleTimeString()}</em> : null}
                      </article>
                    ))}
                  </div>
                </div>
              </article>
              <article className="admin-card admin-launch-metric-card">
                <p className="admin-eyebrow">Entitlements</p>
                <p className="admin-metric">{activeSubscriptionCount}</p>
                <small>Trialing or active records that currently unlock paid workspace access.</small>
              </article>
            </div>
          </section>

          {beverageNewsNeedsAttention && beverageNewsHealth ? (
            <section className="admin-overview-group" aria-label="Operations alerts">
              <p className="admin-overview-group-label">Alerts:</p>
              <div className="admin-overview-grid">
                <article className={`admin-card admin-operations-alert status-${beverageNewsHealth.status}`}>
                  <div className="admin-operations-alert-header">
                    <div>
                      <p className="admin-eyebrow">{beverageNewsSeverity} · Content health</p>
                      <h3>{beverageNewsAlertTitle}</h3>
                    </div>
                    <p className="admin-operations-alert-count">
                      <strong>{beverageNewsHealth.failedSources.length}</strong>
                      <span>sources</span>
                    </p>
                  </div>
                  <p>
                    {beverageNewsHealth.status === "degraded"
                      ? `${beverageNewsHealth.failedSources.length} of ${beverageNewsHealth.sourceCount} sources are unavailable. ${beverageNewsHealth.loadedCount} live source${beverageNewsHealth.loadedCount === 1 ? "" : "s"}${beverageNewsHealth.fallbackCount > 0 ? ` and ${beverageNewsHealth.fallbackCount} fallback source${beverageNewsHealth.fallbackCount === 1 ? "" : "s"}` : ""} are still serving ${beverageNewsHealth.articleCount.toLocaleString()} articles.`
                      : beverageNewsHealth.status === "cached"
                        ? `Live sources did not return articles. Students can still read ${beverageNewsHealth.articleCount.toLocaleString()} recently saved headlines.`
                        : "No current or saved headlines are available. Students see a simple retry message."}
                  </p>
                  <small>Last checked {new Date(beverageNewsHealth.checkedAt).toLocaleString()}</small>
                  {beverageNewsHealth.failedSources.length > 0 ? (
                    <details className="admin-operations-alert-details">
                      <summary>View affected sources</summary>
                      <ul>
                        {beverageNewsHealth.failedSources.map((source) => (
                          <li key={source.sourceId}>{source.sourceName}</li>
                        ))}
                      </ul>
                    </details>
                  ) : null}
                  <div className="admin-actions">
                    <button className="btn btn-light" type="button" onClick={() => onNavigate("app/beverage-news")}>
                      Open Beverage News
                    </button>
                  </div>
                </article>
              </div>
            </section>
          ) : null}

          <section className="admin-overview-group" aria-label="Edits overview">
            <p className="admin-overview-group-label">Edits:</p>
            <div className="admin-overview-grid">
              <article className="admin-card">
                <p className="admin-eyebrow">Publishing</p>
                <p className="admin-metric">{connectedCount}</p>
                <small>{socialPlatforms.length} available channels in Social Posts</small>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Drafts</p>
                <p className="admin-metric">{siteMapDirty ? 1 : 0}</p>
                <small>{siteMapDirty ? "Site Map has unpublished page access edits" : "No staged page access edits"}</small>
              </article>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === "site-map" ? (
        <article className={`admin-card site-map-admin ${siteMapView === "order" ? "site-map-admin--order" : ""}`}>
          <div className="site-map-admin-header">
            <div>
              <p className="admin-eyebrow">Page Access</p>
              <h3>Site Map</h3>
              <p>
                Manage page access and arrange the destinations inside each menu group. Changes remain staged until you
                publish them globally.
              </p>
            </div>
            <div className="site-map-admin-counts" aria-label="Site map access counts">
              <div className="site-map-count-row" aria-label="Room counts">
                <span className="site-map-count-label">Room:</span>
                <span><strong>{siteMapCounts.rooms.Lobby}</strong> Lobby</span>
                <span><strong>{siteMapCounts.rooms.Game}</strong> Game</span>
                <span><strong>{siteMapCounts.rooms.Boss}</strong> Boss</span>
              </div>
              <div className="site-map-count-row" aria-label="Status counts">
                <span className="site-map-count-label">Status:</span>
                <span><strong>{siteMapCounts.statuses.public}</strong> Public</span>
                <span><strong>{siteMapCounts.statuses.edit}</strong> Edit</span>
                <span><strong>{siteMapCounts.statuses.off}</strong> Off</span>
              </div>
            </div>
          </div>

          <div className="site-map-view-switch" role="group" aria-label="Site Map view">
            <button
              type="button"
              aria-pressed={siteMapView === "settings"}
              className={siteMapView === "settings" ? "active" : ""}
              onClick={() => setSiteMapView("settings")}
            >
              Page settings
            </button>
            <button
              type="button"
              aria-pressed={siteMapView === "order"}
              className={siteMapView === "order" ? "active" : ""}
              onClick={() => setSiteMapView("order")}
            >
              Menu order
            </button>
          </div>

          {siteMapView === "settings" ? (
            <div
              id="site-map-settings-panel"
              className="site-map-admin-table"
            >
              <table>
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Room</th>
                    <th>Section</th>
                    <th>Route</th>
                    <th>Status</th>
                    <th>Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedDraftPages.map((page) => {
                    const draftConfig = draftPageStatuses[page.route] ?? {
                      room: page.defaultRoom,
                      status: page.defaultStatus,
                      sortOrder: defaultSortOrderForRoute(page.route)
                    };
                    const publishedConfig = publishedPageStatuses[page.route] ?? {
                      room: page.defaultRoom,
                      status: page.defaultStatus,
                      sortOrder: defaultSortOrderForRoute(page.route)
                    };
                    const accessChanged =
                      draftConfig.room !== publishedConfig.room || draftConfig.status !== publishedConfig.status;
                    const orderChanged =
                      pageSortOrder(page.route, draftPageStatuses) !== pageSortOrder(page.route, publishedPageStatuses);
                    const changed = accessChanged || orderChanged;
                    return (
                      <tr key={page.route} className={changed ? "changed" : ""}>
                        <td>
                          <strong>{page.label}</strong>
                          <small>{page.description}</small>
                          {orderChanged ? <small className="site-map-change-note">Menu order staged</small> : null}
                        </td>
                        <td>
                          <div className="site-map-status-toggle" role="group" aria-label={`${page.label} room`}>
                            {(["Lobby", "Game", "Boss"] as const).map((room) => (
                              <button
                                key={room}
                                type="button"
                                className={`site-map-status-btn status-${room.toLowerCase()} ${draftConfig.room === room ? "active" : ""}`}
                                onClick={() => updateDraftPageRoom(page.route, room)}
                                aria-pressed={draftConfig.room === room}
                              >
                                {room}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td><small>{page.section}</small></td>
                        <td><code>{page.route}</code></td>
                        <td>
                          <div className="site-map-status-toggle" role="group" aria-label={`${page.label} visibility`}>
                            {(["public", "edit", "off"] as const).map((status) => (
                              <button
                                key={status}
                                type="button"
                                className={`site-map-status-btn status-${status} ${draftConfig.status === status ? "active" : ""}`}
                                onClick={() => updateDraftPageStatus(page.route, status)}
                                aria-pressed={draftConfig.status === status}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                          {accessChanged ? (
                            <small className="site-map-change-note">
                              staged from {publishedConfig.room} / {publishedConfig.status}
                            </small>
                          ) : null}
                        </td>
                        <td>
                          <button className="btn btn-light" type="button" onClick={() => onNavigate(page.route)}>
                            Open
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              id="site-map-order-panel"
              className="site-map-order-panel"
            >
              <div className="site-map-order-intro">
                <div>
                  <strong>Arrange the main menu</strong>
                  <p>Drag from the grip, or use the arrow buttons. Pages stay inside their current menu group.</p>
                </div>
                <span>{SITE_MAP_PAGES.filter((page) => !isMainMenuRoute(page.route)).length} utility pages are not shown in the menu.</span>
              </div>

              <div className="site-map-order-groups">
                {menuOrderGroups.map((group) => (
                  <section className="site-map-order-group" key={group.id} aria-labelledby={`site-map-order-${group.id}`}>
                    <header>
                      <div>
                        <p className="admin-eyebrow">Menu group</p>
                        <h4 id={`site-map-order-${group.id}`}>{group.label}</h4>
                      </div>
                      <span>{group.pages.length} page{group.pages.length === 1 ? "" : "s"}</span>
                    </header>
                    <ol>
                      {group.pages.map((page, pageIndex) => {
                        const draftConfig = draftPageStatuses[page.route] ?? {
                          room: page.defaultRoom,
                          status: page.defaultStatus,
                          sortOrder: defaultSortOrderForRoute(page.route)
                        };
                        const orderChanged =
                          pageSortOrder(page.route, draftPageStatuses) !== pageSortOrder(page.route, publishedPageStatuses);
                        return (
                          <li
                            key={page.route}
                            data-site-map-order-route={page.route}
                            className={`${draggedPageRoute === page.route ? "dragging" : ""} ${dragTargetRoute === page.route ? "drag-target" : ""} ${orderChanged ? "changed" : ""}`}
                          >
                            <button
                              type="button"
                              className="site-map-drag-handle"
                              aria-label={`Drag ${page.label}, position ${pageIndex + 1} of ${group.pages.length} in ${group.label}`}
                              tabIndex={-1}
                              disabled={siteMapPublishing}
                              onPointerDown={(event) => beginPageDrag(event, page.route)}
                              onPointerMove={continuePageDrag}
                              onPointerUp={finishPageDrag}
                              onPointerCancel={finishPageDrag}
                              onLostPointerCapture={finishPageDrag}
                            >
                              <DotsSixVertical weight="bold" aria-hidden="true" />
                            </button>
                            <span className="site-map-order-number" aria-hidden="true">{pageIndex + 1}</span>
                            <div className="site-map-order-copy">
                              <strong>{page.label}</strong>
                              <small>{page.description}</small>
                            </div>
                            <div className="site-map-order-meta" aria-label={`${draftConfig.room}, ${draftConfig.status}`}>
                              <span>{draftConfig.room}</span>
                              <span className={`status-${draftConfig.status}`}>{draftConfig.status}</span>
                            </div>
                            <div className="site-map-order-actions" aria-label={`Move ${page.label}`}>
                              <button
                                type="button"
                                onClick={() => moveDraftPage(page.route, -1)}
                                disabled={pageIndex === 0 || siteMapPublishing}
                                aria-label={`Move ${page.label} earlier in ${group.label}`}
                              >
                                <ArrowUp weight="bold" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveDraftPage(page.route, 1)}
                                disabled={pageIndex === group.pages.length - 1 || siteMapPublishing}
                                aria-label={`Move ${page.label} later in ${group.label}`}
                              >
                                <ArrowDown weight="bold" aria-hidden="true" />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                ))}
              </div>
            </div>
          )}

          <div className={`site-map-publish-bar ${siteMapDirty ? "dirty" : "clean"}`}>
            <p aria-live="polite">{siteMapNotice}</p>
            <div className="admin-actions">
              <button className="btn btn-light" type="button" onClick={resetSiteMapDraft} disabled={!siteMapDirty || siteMapPublishing}>
                Discard Changes
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => void publishSiteMapChanges()}
                disabled={!siteMapDirty || siteMapPublishing}
              >
                {siteMapPublishing ? "Publishing..." : "Publish Globally"}
              </button>
            </div>
          </div>
        </article>
      ) : null}

      {activeTab === "subscriptions" ? (
        <article className="admin-card">
          <h3>Subscription Entitlements</h3>
          <p>This table controls paid workspace access. Keep statuses synced through billing webhooks when possible.</p>
          <div className="admin-user-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Period End</th>
                  <th>Cancel End</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td>{subscription.user_id.slice(0, 8)}</td>
                    <td>{subscription.plan_code}</td>
                    <td>
                      <select
                        value={subscription.status}
                        onChange={(event) =>
                          void updateSubscriptionStatus(
                            subscription.id,
                            event.target.value as SubscriptionRow["status"]
                          )
                        }
                      >
                        <option value="trialing">trialing</option>
                        <option value="active">active</option>
                        <option value="past_due">past_due</option>
                        <option value="unpaid">unpaid</option>
                        <option value="canceled">canceled</option>
                        <option value="incomplete">incomplete</option>
                        <option value="incomplete_expired">incomplete_expired</option>
                      </select>
                    </td>
                    <td>{subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : "-"}</td>
                    <td>{subscription.cancel_at_period_end ? "yes" : "no"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ) : null}

      {activeTab === "access" ? (
        <article className="admin-card">
          <h3>User Access Control</h3>
          <p>Keep profile roles simple: student for learners and admin for back-office privileges. Trial access lives in subscription status, not a profile role.</p>
          <p className="hint">Visitor is public/no profile role needed. Only trialing or active subscription records unlock the paid workspace; past-due and canceled records stay locked until billing is repaired.</p>
          <div className="admin-user-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.display_name || user.id.slice(0, 8)}</td>
                    <td>{adminRoleLabels[user.role]}</td>
                    <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</td>
                    <td>
                      <select value={user.role} onChange={(event) => void updateRole(user.id, event.target.value as EditableUserRole)}>
                        <option value="student">student</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ) : null}

      {activeTab === "content" ? (
        <div className="admin-content-ops">
          <article className="admin-card">
            <h3>Content Operations</h3>
            <p>Use Terminology Admin for source-safe publishing workflow and glossary maintenance.</p>
            <div className="admin-actions">
              <button className="btn btn-primary" onClick={() => onNavigate("admin/terminology")}>
                Open Terminology Admin
              </button>
              <button className="btn btn-light" onClick={() => onNavigate("app/sip-academy")}>
                Preview Learner Workspace
              </button>
            </div>
          </article>

          <article className="admin-card social-posts-card">
            <div className="social-posts-header">
              <div>
                <p className="admin-eyebrow">Content Operations</p>
                <h3>Social Posts</h3>
                <p>Connect channels, compose once, attach media, and stage a platform-ready post from the console.</p>
              </div>
              <div className="social-posts-status">
                <strong>{connectedCount}</strong>
                <span>connected</span>
              </div>
            </div>

            <section className="social-posts-grid" aria-label="Social post account connections">
              {socialPlatforms.map((platform) => {
                const connected = connectedPlatforms[platform.id];
                const targeted = targetPlatforms[platform.id];
                return (
                  <article key={platform.id} className={`social-platform-card${connected ? " connected" : ""}`}>
                    <div>
                      <h4>{platform.label}</h4>
                      <p>{platform.handle}</p>
                      <small>{platform.postType}</small>
                    </div>
                    <div className="social-platform-actions">
                      <label>
                        <input
                          type="checkbox"
                          checked={connected}
                          onChange={() => toggleConnectedPlatform(platform.id)}
                        />
                        Connected
                      </label>
                      <label className={!connected ? "disabled" : ""}>
                        <input
                          type="checkbox"
                          checked={targeted}
                          disabled={!connected}
                          onChange={() => toggleTargetPlatform(platform.id)}
                        />
                        Target
                      </label>
                    </div>
                  </article>
                );
              })}
            </section>

            <div className="social-posts-composer">
              <label>
                Post prompt
                <input
                  value={socialPostTopic}
                  onChange={(event) => setSocialPostTopic(event.target.value)}
                  placeholder="Example: promote the new African wine regions map"
                />
              </label>
              <label>
                Post copy
                <textarea
                  value={socialPostBody}
                  onChange={(event) => {
                    setSocialPostBody(event.target.value);
                    setSocialPostStatus("Draft edited.");
                  }}
                  rows={7}
                  placeholder="Write one post here, then target connected channels below."
                />
              </label>
              <label>
                Photos and videos
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(event) => {
                    const fileNames = Array.from(event.target.files ?? []).map((file) => file.name);
                    setSocialMediaFiles(fileNames);
                    setSocialPostStatus(fileNames.length > 0 ? `${fileNames.length} media file(s) attached locally.` : "No media attached.");
                  }}
                />
              </label>
            </div>

            <div className="social-posts-preview">
              <div>
                <p className="admin-eyebrow">Targets</p>
                <div className="social-posts-target-list">
                  {socialPlatforms.map((platform) => (
                    <span key={platform.id} className={targetPlatforms[platform.id] ? "active" : ""}>
                      {platform.label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="admin-eyebrow">Media</p>
                <div className="social-posts-media-list">
                  {socialMediaFiles.length > 0 ? socialMediaFiles.map((fileName) => <span key={fileName}>{fileName}</span>) : <span>No media selected</span>}
                </div>
              </div>
              <div>
                <p className="admin-eyebrow">Readiness</p>
                <p>{socialPostStatus}</p>
              </div>
            </div>

            <div className="admin-actions">
              <button className="btn btn-primary" type="button" onClick={generateSocialPostDraft}>
                Generate Draft
              </button>
              <button className="btn btn-light" type="button" onClick={stageSocialPost}>
                Stage Distribution
              </button>
              <button className="btn btn-light" type="button" disabled title="Requires platform API credentials and backend publishing queue.">
                Publish to Platforms
              </button>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
