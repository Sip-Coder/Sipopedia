import { CoachOrchestrator } from "./coachOrchestrator";
import type { TastingSessionInput } from "./types";

interface RequestLike {
  body?: unknown;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
  user?: { id?: string };
}

interface ResponseLike {
  status(code: number): ResponseLike;
  json(payload: unknown): void;
}

interface RouterLike {
  post(path: string, handler: (req: RequestLike, res: ResponseLike) => Promise<void> | void): void;
  get(path: string, handler: (req: RequestLike, res: ResponseLike) => Promise<void> | void): void;
}

const orchestrator = new CoachOrchestrator();

function pickUserId(req: RequestLike): string | null {
  const queryUserId = typeof req.query?.userId === "string" ? req.query.userId : null;
  const bodyUserId =
    req.body && typeof req.body === "object" && "userId" in req.body && typeof req.body.userId === "string"
      ? req.body.userId
      : null;
  return req.user?.id ?? queryUserId ?? bodyUserId;
}

export async function analyzeSessionHandler(req: RequestLike, res: ResponseLike): Promise<void> {
  const userId = pickUserId(req);
  if (!userId) {
    res.status(400).json({ error: "userId is required." });
    return;
  }

  const body = req.body as Partial<TastingSessionInput> | undefined;
  if (!body || !Array.isArray(body.attempts) || body.attempts.length === 0) {
    res.status(400).json({ error: "A tasting session with at least one attempt is required." });
    return;
  }

  const session: TastingSessionInput = {
    userId,
    sessionId: body.sessionId ?? `session-${Date.now()}`,
    completedAt: body.completedAt,
    feedbackFormatUsed: body.feedbackFormatUsed,
    attempts: body.attempts
  };

  const result = await orchestrator.analyzeSession(session);
  res.status(200).json(result);
}

export async function profileInsightsHandler(req: RequestLike, res: ResponseLike): Promise<void> {
  const userId = pickUserId(req);
  if (!userId) {
    res.status(400).json({ error: "userId is required." });
    return;
  }

  const insights = await orchestrator.getProfileInsights(userId);
  res.status(200).json(insights);
}

export function registerCoachRoutes(router: RouterLike): void {
  router.post("/api/hyper/coach/analyzeSession", analyzeSessionHandler);
  router.get("/api/hyper/coach/profileInsights", profileInsightsHandler);
}
