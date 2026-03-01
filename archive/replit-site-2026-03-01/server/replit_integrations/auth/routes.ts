import type { Express } from "express";
import { authStorage } from "./storage";
import { isAuthenticated } from "./replitAuth";

// Register auth-specific routes
export function registerAuthRoutes(app: Express): void {
  // Get current authenticated user
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await authStorage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Debug endpoint: Get authenticated user id and profile
  app.get("/api/me", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const claims = req.user.claims;
      const user = await authStorage.getUser(userId);
      
      res.json({
        id: userId,
        claims: {
          sub: claims.sub,
          email: claims.email,
          first_name: claims.first_name,
          last_name: claims.last_name,
          profile_image_url: claims.profile_image_url,
        },
        profile: user,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });
}
