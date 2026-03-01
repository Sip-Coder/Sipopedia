import { users, type User, type UpsertUser, type UserRole, tastingNotes, type TastingNote, type InsertTastingNote, type TastingAnalytics } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, count } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: UserRole): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  
  // Tasting notes methods
  createTastingNote(note: InsertTastingNote): Promise<TastingNote>;
  getTastingNote(id: string, userId: string): Promise<TastingNote | undefined>;
  getTastingNotes(userId: string): Promise<TastingNote[]>;
  updateTastingNote(id: string, userId: string, note: Partial<InsertTastingNote>): Promise<TastingNote | undefined>;
  deleteTastingNote(id: string, userId: string): Promise<boolean>;
  getTastingAnalytics(userId: string): Promise<TastingAnalytics>;
}

class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUserRole(id: string, role: UserRole): Promise<User | undefined> {
    const [updated] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  // Tasting notes methods
  async createTastingNote(note: InsertTastingNote): Promise<TastingNote> {
    const results = await db.insert(tastingNotes).values(note).returning();
    const created = results?.[0];
    
    // Get the most recently created note for this user (workaround for Neon HTTP adapter issue)
    const [freshNote] = await db
      .select()
      .from(tastingNotes)
      .where(eq(tastingNotes.userId, note.userId!))
      .orderBy(desc(tastingNotes.createdAt))
      .limit(1);
    
    return freshNote || created;
  }

  async getTastingNote(id: string, userId: string): Promise<TastingNote | undefined> {
    const [note] = await db
      .select()
      .from(tastingNotes)
      .where(and(eq(tastingNotes.id, id), eq(tastingNotes.userId, userId)));
    return note;
  }

  async getTastingNotes(userId: string): Promise<TastingNote[]> {
    return await db
      .select()
      .from(tastingNotes)
      .where(eq(tastingNotes.userId, userId))
      .orderBy(desc(tastingNotes.tastingDate));
  }

  async updateTastingNote(id: string, userId: string, note: Partial<InsertTastingNote>): Promise<TastingNote | undefined> {
    const [updated] = await db
      .update(tastingNotes)
      .set({ ...note, updatedAt: new Date() })
      .where(and(eq(tastingNotes.id, id), eq(tastingNotes.userId, userId)))
      .returning();
    return updated;
  }

  async deleteTastingNote(id: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(tastingNotes)
      .where(and(eq(tastingNotes.id, id), eq(tastingNotes.userId, userId)))
      .returning();
    return result.length > 0;
  }

  async getTastingAnalytics(userId: string): Promise<TastingAnalytics> {
    // Get all tasting notes for the user
    const notes = await this.getTastingNotes(userId);
    
    const totalTastings = notes.length;
    const blindTastings = notes.filter(n => n.isBlindTasting).length;
    
    // Calculate overall accuracy
    const notesWithGrape = notes.filter(n => n.actualGrape && n.grapeCorrect !== null);
    const notesWithCountry = notes.filter(n => n.actualCountry && n.countryCorrect !== null);
    const notesWithRegion = notes.filter(n => n.actualRegion && n.regionCorrect !== null);
    const notesWithVintage = notes.filter(n => n.actualVintage && n.vintageCorrect !== null);
    
    const grapeAccuracy = notesWithGrape.length > 0 
      ? (notesWithGrape.filter(n => n.grapeCorrect).length / notesWithGrape.length) * 100 
      : 0;
    const countryAccuracy = notesWithCountry.length > 0 
      ? (notesWithCountry.filter(n => n.countryCorrect).length / notesWithCountry.length) * 100 
      : 0;
    const regionAccuracy = notesWithRegion.length > 0 
      ? (notesWithRegion.filter(n => n.regionCorrect).length / notesWithRegion.length) * 100 
      : 0;
    const vintageAccuracy = notesWithVintage.length > 0 
      ? (notesWithVintage.filter(n => n.vintageCorrect).length / notesWithVintage.length) * 100 
      : 0;
    
    // Calculate accuracy by grape
    const grapeStats = new Map<string, { total: number; correct: number }>();
    for (const note of notes) {
      if (note.actualGrape && note.grapeCorrect !== null) {
        const stats = grapeStats.get(note.actualGrape) || { total: 0, correct: 0 };
        stats.total++;
        if (note.grapeCorrect) stats.correct++;
        grapeStats.set(note.actualGrape, stats);
      }
    }
    const byGrape = Array.from(grapeStats.entries()).map(([grape, stats]) => ({
      grape,
      total: stats.total,
      correct: stats.correct,
      accuracy: (stats.correct / stats.total) * 100,
    })).sort((a, b) => b.total - a.total);
    
    // Calculate accuracy by country
    const countryStats = new Map<string, { total: number; correct: number }>();
    for (const note of notes) {
      if (note.actualCountry && note.countryCorrect !== null) {
        const stats = countryStats.get(note.actualCountry) || { total: 0, correct: 0 };
        stats.total++;
        if (note.countryCorrect) stats.correct++;
        countryStats.set(note.actualCountry, stats);
      }
    }
    const byCountry = Array.from(countryStats.entries()).map(([country, stats]) => ({
      country,
      total: stats.total,
      correct: stats.correct,
      accuracy: (stats.correct / stats.total) * 100,
    })).sort((a, b) => b.total - a.total);
    
    // Calculate accuracy by region
    const regionStats = new Map<string, { total: number; correct: number }>();
    for (const note of notes) {
      if (note.actualRegion && note.regionCorrect !== null) {
        const stats = regionStats.get(note.actualRegion) || { total: 0, correct: 0 };
        stats.total++;
        if (note.regionCorrect) stats.correct++;
        regionStats.set(note.actualRegion, stats);
      }
    }
    const byRegion = Array.from(regionStats.entries()).map(([region, stats]) => ({
      region,
      total: stats.total,
      correct: stats.correct,
      accuracy: (stats.correct / stats.total) * 100,
    })).sort((a, b) => b.total - a.total);
    
    // Find weakest areas (lowest accuracy with at least 2 tastings)
    const weakestAreas: { category: string; item: string; accuracy: number }[] = [];
    
    byGrape.filter(g => g.total >= 2 && g.accuracy < 50)
      .forEach(g => weakestAreas.push({ category: 'Grape', item: g.grape, accuracy: g.accuracy }));
    byCountry.filter(c => c.total >= 2 && c.accuracy < 50)
      .forEach(c => weakestAreas.push({ category: 'Country', item: c.country, accuracy: c.accuracy }));
    byRegion.filter(r => r.total >= 2 && r.accuracy < 50)
      .forEach(r => weakestAreas.push({ category: 'Region', item: r.region, accuracy: r.accuracy }));
    
    weakestAreas.sort((a, b) => a.accuracy - b.accuracy);
    
    // Generate study recommendations
    const studyRecommendations: string[] = [];
    
    if (weakestAreas.length > 0) {
      const top3Weak = weakestAreas.slice(0, 3);
      for (const area of top3Weak) {
        studyRecommendations.push(
          `Focus on ${area.item} (${area.category}) - currently at ${area.accuracy.toFixed(0)}% accuracy`
        );
      }
    }
    
    if (grapeAccuracy < 50 && notesWithGrape.length >= 3) {
      studyRecommendations.push("Practice identifying grape varieties - consider focused varietal tastings");
    }
    if (regionAccuracy < 40 && notesWithRegion.length >= 3) {
      studyRecommendations.push("Study regional characteristics and terroir influence");
    }
    if (vintageAccuracy < 30 && notesWithVintage.length >= 3) {
      studyRecommendations.push("Learn vintage characteristics - practice with known vintages first");
    }
    
    if (totalTastings < 10) {
      studyRecommendations.push("Keep practicing! More tastings will help build pattern recognition");
    }
    
    if (studyRecommendations.length === 0 && totalTastings > 0) {
      studyRecommendations.push("Great progress! Continue challenging yourself with diverse wines");
    }
    
    return {
      totalTastings,
      blindTastings,
      grapeAccuracy,
      countryAccuracy,
      regionAccuracy,
      vintageAccuracy,
      byGrape,
      byCountry,
      byRegion,
      weakestAreas: weakestAreas.slice(0, 5),
      studyRecommendations,
    };
  }
}

export const storage = new DatabaseStorage();
