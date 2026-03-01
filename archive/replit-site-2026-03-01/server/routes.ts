import type { Express, RequestHandler } from "express";
import { createServer, type Server } from "http";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { storage } from "./storage";
import { authStorage } from "./replit_integrations/auth";
import type { UserRole, InsertTastingNote } from "@shared/schema";
import { insertTastingNoteSchema } from "@shared/schema";

// Middleware to check if user has required role
export function requireRole(...allowedRoles: UserRole[]): RequestHandler {
  return async (req: any, res, next) => {
    if (!req.isAuthenticated() || !req.user?.claims?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.claims.sub;
    const user = await authStorage.getUser(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Admin can do everything
    if (user.role === "admin") {
      return next();
    }

    // Site manager can access site_manager and user routes
    if (user.role === "site_manager" && (allowedRoles.includes("site_manager") || allowedRoles.includes("user"))) {
      return next();
    }

    // User can only access user routes
    if (user.role === "user" && allowedRoles.includes("user")) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication BEFORE other routes
  await setupAuth(app);
  registerAuthRoutes(app);

  // Admin routes - only admins can access
  app.get("/api/admin/users", isAuthenticated, requireRole("admin"), async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch("/api/admin/users/:id/role", isAuthenticated, requireRole("admin"), async (req: any, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!["user", "site_manager", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const updatedUser = await storage.updateUserRole(id, role);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  app.delete("/api/admin/users/:id", isAuthenticated, requireRole("admin"), async (req: any, res) => {
    try {
      const { id } = req.params;
      const currentUserId = req.user.claims.sub;

      // Prevent self-deletion
      if (id === currentUserId) {
        return res.status(400).json({ message: "Cannot delete your own account" });
      }

      const deleted = await storage.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Site manager routes - site managers and admins can access
  app.get("/api/manager/stats", isAuthenticated, requireRole("site_manager"), async (req, res) => {
    try {
      res.json({
        totalTerms: 19,
        pendingNotes: 5,
        activeUsers: 1234,
      });
    } catch (error) {
      console.error("Error fetching manager stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // User role check endpoint
  app.get("/api/user/role", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await authStorage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ role: user.role });
    } catch (error) {
      console.error("Error fetching user role:", error);
      res.status(500).json({ message: "Failed to fetch role" });
    }
  });

  // ========== TASTING NOTES ROUTES ==========
  
  // Create a new tasting note
  app.post("/api/tasting-notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tastingDate = req.body.tastingDate ? new Date(req.body.tastingDate) : new Date();
      
      const noteData = { 
        ...req.body, 
        userId,
        tastingDate,
      };
      
      const validatedData = insertTastingNoteSchema.parse(noteData);
      const note = await storage.createTastingNote(validatedData);
      
      res.status(201).json(note);
    } catch (error: any) {
      console.error("Error creating tasting note:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create tasting note" });
    }
  });

  // Get all tasting notes for the current user
  app.get("/api/tasting-notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notes = await storage.getTastingNotes(userId);
      res.json(notes);
    } catch (error) {
      console.error("Error fetching tasting notes:", error);
      res.status(500).json({ message: "Failed to fetch tasting notes" });
    }
  });

  // Get analytics for the current user
  app.get("/api/tasting-notes/analytics", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const analytics = await storage.getTastingAnalytics(userId);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Get a specific tasting note
  app.get("/api/tasting-notes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      
      const note = await storage.getTastingNote(id, userId);
      
      if (!note) {
        return res.status(404).json({ message: "Tasting note not found" });
      }
      
      res.json(note);
    } catch (error) {
      console.error("Error fetching tasting note:", error);
      res.status(500).json({ message: "Failed to fetch tasting note" });
    }
  });

  // Update a tasting note
  app.patch("/api/tasting-notes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      
      // Validate partial update data
      const updateSchema = insertTastingNoteSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      
      const note = await storage.updateTastingNote(id, userId, validatedData);
      
      if (!note) {
        return res.status(404).json({ message: "Tasting note not found" });
      }
      
      res.json(note);
    } catch (error: any) {
      console.error("Error updating tasting note:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update tasting note" });
    }
  });

  // Delete a tasting note
  app.delete("/api/tasting-notes/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      
      const deleted = await storage.deleteTastingNote(id, userId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Tasting note not found" });
      }
      
      res.json({ message: "Tasting note deleted successfully" });
    } catch (error) {
      console.error("Error deleting tasting note:", error);
      res.status(500).json({ message: "Failed to delete tasting note" });
    }
  });

  return httpServer;
}
