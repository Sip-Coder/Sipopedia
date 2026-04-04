import { TerminologyMemoryStore } from "./terminologyMemoryStore";
import { TerminologyOrchestrator } from "./terminologyOrchestrator";
import type { BeverageType, TerminologyRunBatchInput } from "./types";

type RequestLike = { body?: unknown; query?: Record<string, string | undefined> };
type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (payload: unknown) => void;
};

type Handler = (req: RequestLike, res: ResponseLike) => Promise<void> | void;

export interface RouteRegistrar {
  post: (path: string, handler: Handler) => void;
  get: (path: string, handler: Handler) => void;
}

function isBeverageType(value: unknown): value is BeverageType {
  return (
    value === "wine" ||
    value === "beer" ||
    value === "spirits" ||
    value === "coffee" ||
    value === "tea" ||
    value === "water" ||
    value === "fermented_beverages"
  );
}

function isRunBatchInput(value: unknown): value is TerminologyRunBatchInput {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  return (
    typeof body.letter === "string" &&
    body.letter.trim().length > 0 &&
    isBeverageType(body.beverageType) &&
    typeof body.batchSize === "number" &&
    body.batchSize >= 1
  );
}

export function registerTerminologyRoutes(
  app: RouteRegistrar,
  orchestrator = new TerminologyOrchestrator(new TerminologyMemoryStore())
): void {
  app.post("/api/hyper/terminology/runBatch", async (req, res) => {
    if (!isRunBatchInput(req.body)) {
      res.status(400).json({
        error: "Invalid payload. Expected letter, beverageType, and batchSize."
      });
      return;
    }

    try {
      const result = await orchestrator.runBatch(req.body);
      res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "runBatch failed.", details: message });
    }
  });

  app.get("/api/hyper/terminology/status", async (req, res) => {
    const queryLimit = Number(req.query?.limit ?? "20");
    const limit = Number.isFinite(queryLimit) ? Math.max(1, Math.min(Math.floor(queryLimit), 200)) : 20;

    try {
      const status = await orchestrator.getStatus(limit);
      res.status(200).json(status);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Status fetch failed.", details: message });
    }
  });
}

