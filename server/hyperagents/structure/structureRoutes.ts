import { StructureOrchestrator } from "./structureOrchestrator";
import type { TermInput } from "./types";

type RequestLike = { body?: unknown };
type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (payload: unknown) => void;
};

type Handler = (req: RequestLike, res: ResponseLike) => Promise<void> | void;

export interface RouteRegistrar {
  post: (path: string, handler: Handler) => void;
  get: (path: string, handler: Handler) => void;
}

function isTermInput(value: unknown): value is TermInput {
  if (!value || typeof value !== "object") return false;
  const maybe = value as Record<string, unknown>;
  return typeof maybe.term === "string" && maybe.term.trim().length > 0;
}

export function registerStructureRoutes(app: RouteRegistrar, orchestrator = new StructureOrchestrator()): void {
  app.post("/api/hyper/structure/validateTerm", async (req, res) => {
    if (!isTermInput(req.body)) {
      res.status(400).json({ error: "Invalid payload. Expected a term object with a non-empty term." });
      return;
    }

    try {
      const result = await orchestrator.validateTerm(req.body);
      res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Term validation failed.", details: message });
    }
  });

  app.get("/api/hyper/structure/exportGraph", async (_req, res) => {
    try {
      const graph = await orchestrator.exportGraph();
      res.status(200).json(graph);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Graph export failed.", details: message });
    }
  });
}
