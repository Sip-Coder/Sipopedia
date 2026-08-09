export type FirstDollarSuccessProof = {
  capturedAt: string;
  stripeSessionId: string;
  savedRoomRoute: string;
  savedRoomLabel: string;
  accessStatus: string;
  proofNote: string;
};

export type FirstDollarLockoutProof = {
  capturedAt: string;
  lockedRoute: string;
  lockedRouteLabel: string;
  subscriptionStatus: string;
  supportLane: string;
  proofNote: string;
};

export const firstDollarSuccessProofStorageKey = "sipstudies:first-dollar-success-proof:v1";
export const firstDollarLockoutProofStorageKey = "sipstudies:first-dollar-lockout-proof:v1";

export function writeFirstDollarSuccessProof(proof: FirstDollarSuccessProof) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(firstDollarSuccessProofStorageKey, JSON.stringify(proof));
  } catch {
    // Local proof handoff is a convenience for the launch operator.
  }
}

export function readFirstDollarSuccessProof(): FirstDollarSuccessProof | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(firstDollarSuccessProofStorageKey);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<FirstDollarSuccessProof>;
    if (!parsed.stripeSessionId || !parsed.stripeSessionId.startsWith("cs_")) return null;
    return {
      capturedAt: typeof parsed.capturedAt === "string" ? parsed.capturedAt : new Date().toISOString(),
      stripeSessionId: parsed.stripeSessionId,
      savedRoomRoute: typeof parsed.savedRoomRoute === "string" ? parsed.savedRoomRoute : "app/starter",
      savedRoomLabel: typeof parsed.savedRoomLabel === "string" ? parsed.savedRoomLabel : "Launch Pad",
      accessStatus: typeof parsed.accessStatus === "string" ? parsed.accessStatus : "unknown",
      proofNote: typeof parsed.proofNote === "string" ? parsed.proofNote : ""
    };
  } catch {
    return null;
  }
}

export function writeFirstDollarLockoutProof(proof: FirstDollarLockoutProof) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(firstDollarLockoutProofStorageKey, JSON.stringify(proof));
  } catch {
    // Local proof handoff is a convenience for the launch operator.
  }
}

export function readFirstDollarLockoutProof(): FirstDollarLockoutProof | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(firstDollarLockoutProofStorageKey);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<FirstDollarLockoutProof>;
    if (!parsed.lockedRoute || !parsed.subscriptionStatus || !parsed.proofNote) return null;
    return {
      capturedAt: typeof parsed.capturedAt === "string" ? parsed.capturedAt : new Date().toISOString(),
      lockedRoute: parsed.lockedRoute,
      lockedRouteLabel: typeof parsed.lockedRouteLabel === "string" ? parsed.lockedRouteLabel : parsed.lockedRoute,
      subscriptionStatus: parsed.subscriptionStatus,
      supportLane: typeof parsed.supportLane === "string" ? parsed.supportLane : "billing",
      proofNote: parsed.proofNote
    };
  } catch {
    return null;
  }
}
