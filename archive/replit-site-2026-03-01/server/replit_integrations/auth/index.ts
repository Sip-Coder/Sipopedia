export { setupAuth, isAuthenticated, getSession } from "./replitAuth";
export { authStorage, type IAuthStorage } from "./storage";
export { registerAuthRoutes } from "./routes";

import type { Request } from "express";

export function getCurrentUser(req: Request): string | null {
  const user = req.user as any;
  if (!req.isAuthenticated() || !user?.claims?.sub) {
    return null;
  }
  return user.claims.sub;
}
