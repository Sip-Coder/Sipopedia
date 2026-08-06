export type GlobePointerGestureSummary = {
  button: number;
  cancelled: boolean;
  endX: number;
  endY: number;
  maxPointerCount: number;
  startX: number;
  startY: number;
  elapsedMs?: number;
};

const MAX_EMPTY_SPACE_TAP_TRAVEL = 8;
const MAX_EMPTY_SPACE_TAP_DURATION = 650;

export function shouldClearGlobeFocus(summary: GlobePointerGestureSummary): boolean {
  if (summary.button !== 0 || summary.cancelled || summary.maxPointerCount > 1) return false;
  if ((summary.elapsedMs ?? 0) > MAX_EMPTY_SPACE_TAP_DURATION) return false;
  return Math.hypot(summary.endX - summary.startX, summary.endY - summary.startY) <= MAX_EMPTY_SPACE_TAP_TRAVEL;
}

export function isGlobeOverviewKey(key: string): boolean {
  return key === "Escape";
}
