import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./auth";

// Tasting notes table - combines CMS, SWE, and WSET systematic approach
export const tastingNotes = pgTable("tasting_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  // Session metadata
  tastingDate: timestamp("tasting_date").defaultNow().notNull(),
  isBlindTasting: boolean("is_blind_tasting").default(true).notNull(),
  
  // SIGHT evaluation
  sightClarity: varchar("sight_clarity"), // clear, hazy, turbid
  sightIntensity: varchar("sight_intensity"), // pale, medium, deep
  sightColor: varchar("sight_color"), // lemon-green, gold, amber, etc.
  sightRim: varchar("sight_rim"), // watery, same as core, different
  sightTears: varchar("sight_tears"), // slow, medium, fast (viscosity)
  sightGas: varchar("sight_gas"), // still, slight, moderate, persistent (for sparkling)
  sightNotes: text("sight_notes"),
  
  // NOSE evaluation
  noseCondition: varchar("nose_condition"), // clean, unclean, TCA, oxidized, etc.
  noseIntensity: varchar("nose_intensity"), // light, medium-, medium, medium+, pronounced
  noseAromaAge: varchar("nose_aroma_age"), // youthful, developing, fully developed, tired
  noseFruitPrimary: text("nose_fruit_primary"), // specific fruits
  noseFloralPrimary: text("nose_floral_primary"), // specific flowers
  noseHerbal: text("nose_herbal"), // herbs, vegetal notes
  noseEarth: text("nose_earth"), // mineral, soil, forest floor
  noseOak: text("nose_oak"), // vanilla, toast, smoke, cedar
  noseSecondary: text("nose_secondary"), // MLF, lees, autolytic
  noseTertiary: text("nose_tertiary"), // oxidative, reductive, bottle age
  noseNotes: text("nose_notes"),
  
  // PALATE evaluation
  palateSweetness: varchar("palate_sweetness"), // bone dry, dry, off-dry, medium-sweet, sweet, luscious
  palateAcidity: varchar("palate_acidity"), // low, medium-, medium, medium+, high
  palateTannin: varchar("palate_tannin"), // low, medium-, medium, medium+, high
  palateTanninNature: varchar("palate_tannin_nature"), // ripe, unripe, fine, coarse, chalky, velvety
  palateAlcohol: varchar("palate_alcohol"), // low, medium, high
  palateBody: varchar("palate_body"), // light, medium-, medium, medium+, full
  palateMousse: varchar("palate_mousse"), // delicate, creamy, aggressive (sparkling)
  palateIntensity: varchar("palate_intensity"), // light, medium-, medium, medium+, pronounced
  palateFlavors: text("palate_flavors"), // flavor descriptors
  palateFinish: varchar("palate_finish"), // short, medium-, medium, medium+, long
  palateComplexity: varchar("palate_complexity"), // simple, moderate, complex
  palateBalance: varchar("palate_balance"), // unbalanced, balanced, exceptional
  palateNotes: text("palate_notes"),
  
  // CONCLUSION / Initial assessment (blind)
  conclusionQuality: varchar("conclusion_quality"), // poor, acceptable, good, very good, outstanding
  conclusionReadiness: varchar("conclusion_readiness"), // drink now, can age, must age, past peak
  conclusionGuessGrape: varchar("conclusion_guess_grape"),
  conclusionGuessCountry: varchar("conclusion_guess_country"),
  conclusionGuessRegion: varchar("conclusion_guess_region"),
  conclusionGuessVintage: varchar("conclusion_guess_vintage"),
  conclusionGuessProducer: varchar("conclusion_guess_producer"),
  conclusionConfidence: integer("conclusion_confidence"), // 1-5 scale
  
  // REVEAL / Actual wine details
  actualWineName: varchar("actual_wine_name"),
  actualGrape: varchar("actual_grape"),
  actualCountry: varchar("actual_country"),
  actualRegion: varchar("actual_region"),
  actualAppellation: varchar("actual_appellation"),
  actualProducer: varchar("actual_producer"),
  actualVintage: varchar("actual_vintage"),
  actualPrice: varchar("actual_price"),
  
  // Scoring
  grapeCorrect: boolean("grape_correct"),
  countryCorrect: boolean("country_correct"),
  regionCorrect: boolean("region_correct"),
  vintageCorrect: boolean("vintage_correct"),
  
  // Additional notes
  additionalNotes: text("additional_notes"),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertTastingNoteSchema = createInsertSchema(tastingNotes, {
  tastingDate: z.coerce.date().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTastingNote = z.infer<typeof insertTastingNoteSchema>;
export type TastingNote = typeof tastingNotes.$inferSelect;

// Analytics types
export interface TastingAnalytics {
  totalTastings: number;
  blindTastings: number;
  grapeAccuracy: number;
  countryAccuracy: number;
  regionAccuracy: number;
  vintageAccuracy: number;
  byGrape: { grape: string; total: number; correct: number; accuracy: number }[];
  byCountry: { country: string; total: number; correct: number; accuracy: number }[];
  byRegion: { region: string; total: number; correct: number; accuracy: number }[];
  weakestAreas: { category: string; item: string; accuracy: number }[];
  studyRecommendations: string[];
}

// Dropdown options for the form
export const tastingOptions = {
  clarity: ["Clear", "Hazy", "Turbid"],
  colorIntensity: ["Pale", "Medium", "Deep"],
  whiteColors: ["Lemon-green", "Lemon", "Gold", "Amber", "Brown"],
  roseColors: ["Pink", "Salmon", "Orange", "Onion skin"],
  redColors: ["Purple", "Ruby", "Garnet", "Tawny", "Brown"],
  rimVariation: ["Same as core", "Lighter", "Watery edge", "Different color"],
  tears: ["Slow (high viscosity)", "Medium", "Fast (low viscosity)"],
  gasLevel: ["Still", "Slight", "Moderate", "Aggressive"],
  
  noseCondition: ["Clean", "Unclean", "TCA (corked)", "Oxidized", "Reduced", "Volatile Acidity", "Brett"],
  aromaIntensity: ["Light", "Medium-", "Medium", "Medium+", "Pronounced"],
  aromaAge: ["Youthful", "Developing", "Fully developed", "Tired/Past peak"],
  
  sweetness: ["Bone dry", "Dry", "Off-dry", "Medium-sweet", "Sweet", "Luscious"],
  acidity: ["Low", "Medium-", "Medium", "Medium+", "High"],
  tannin: ["Low", "Medium-", "Medium", "Medium+", "High"],
  tanninNature: ["Ripe", "Unripe", "Fine-grained", "Coarse", "Chalky", "Velvety", "Grippy"],
  alcohol: ["Low (<11%)", "Medium (11-13.5%)", "High (>13.5%)"],
  body: ["Light", "Medium-", "Medium", "Medium+", "Full"],
  mousse: ["Delicate", "Creamy", "Aggressive"],
  flavorIntensity: ["Light", "Medium-", "Medium", "Medium+", "Pronounced"],
  finish: ["Short (<5s)", "Medium- (5-8s)", "Medium (8-12s)", "Medium+ (12-20s)", "Long (>20s)"],
  complexity: ["Simple", "Moderate", "Complex"],
  balance: ["Unbalanced", "Balanced", "Exceptional"],
  
  quality: ["Poor", "Acceptable", "Good", "Very Good", "Outstanding"],
  readiness: ["Drink now - not suitable for aging", "Can drink now, but has potential for aging", "Needs more time", "Past its peak"],
  
  commonGrapes: [
    "Cabernet Sauvignon", "Merlot", "Pinot Noir", "Syrah/Shiraz", "Grenache", "Sangiovese", 
    "Nebbiolo", "Tempranillo", "Malbec", "Zinfandel", "Gamay", "Cabernet Franc",
    "Chardonnay", "Sauvignon Blanc", "Riesling", "Pinot Grigio/Gris", "Gewürztraminer",
    "Viognier", "Chenin Blanc", "Sémillon", "Albariño", "Grüner Veltliner", "Muscadet",
    "Blend", "Other"
  ],
  commonCountries: [
    "France", "Italy", "Spain", "Portugal", "Germany", "Austria", "Greece",
    "USA", "Argentina", "Chile", "Australia", "New Zealand", "South Africa",
    "Other"
  ],
  commonRegions: [
    "Bordeaux", "Burgundy", "Champagne", "Rhône Valley", "Loire Valley", "Alsace", "Languedoc",
    "Piedmont", "Tuscany", "Veneto", "Sicily",
    "Rioja", "Ribera del Duero", "Priorat",
    "Mosel", "Rheingau", "Pfalz",
    "Napa Valley", "Sonoma", "Willamette Valley", "Santa Barbara",
    "Mendoza", "Central Valley (Chile)", "Barossa Valley", "Margaret River",
    "Marlborough", "Central Otago", "Stellenbosch",
    "Other"
  ],
};
