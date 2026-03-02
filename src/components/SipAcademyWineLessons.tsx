import { useEffect, useMemo, useState } from "react";
import romaCalm from "../assets/brand/characters/variants/roma-calm-opt.webp";
import romaCelebrate from "../assets/brand/characters/variants/roma-celebrate-opt.webp";
import romaCoach from "../assets/brand/characters/variants/roma-coach-opt.webp";
import romaSpark from "../assets/brand/characters/variants/roma-spark-opt.webp";
import sippyCalm from "../assets/brand/characters/variants/sippy-calm-opt.webp";
import sippyCelebrate from "../assets/brand/characters/variants/sippy-celebrate-opt.webp";
import sippyCoach from "../assets/brand/characters/variants/sippy-coach-opt.webp";
import sippySpark from "../assets/brand/characters/variants/sippy-spark-opt.webp";

type LessonTag = "Foundations" | "Aromas" | "Structure" | "Service";
type MentorId = "sippy" | "roma";
type MentorMood = "calm" | "coach" | "spark" | "celebrate";
type MentorVoiceMode = "classic" | "tactical" | "story";

type ChoiceExercise = {
  id: string;
  kind: "choice";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type OrderExercise = {
  id: string;
  kind: "order";
  prompt: string;
  options: string[];
  answer: string[];
  explanation: string;
};

type Exercise = ChoiceExercise | OrderExercise;

type Lesson = {
  id: string;
  unit: number;
  realm: string;
  title: string;
  tag: LessonTag;
  mission: "Scout" | "Challenge" | "Boss";
  difficulty: number;
  mentor: MentorId;
  subtitle: string;
  xpBonus: number;
  exercises: Exercise[];
};

type Realm = {
  unit: number;
  title: string;
  lore: string;
  bossLessonId: string;
};

type LessonProgress = {
  unlocked: boolean;
  mastery: number;
  bestAccuracy: number;
  attempts: number;
  completions: number;
};

type AcademyProgress = {
  totalXp: number;
  streak: number;
  lastActiveDate: string | null;
  lessons: Record<string, LessonProgress>;
};

type FeedbackState = {
  correct: boolean;
  heartsAfter: number;
  note: string;
};

type SummaryState = {
  lessonId: string;
  lessonTitle: string;
  passed: boolean;
  correct: number;
  total: number;
  accuracy: number;
  xp: number;
  bestCombo: number;
  heartsLeft: number;
};

type UnlockCeremony = {
  lessonId: string;
  title: string;
  unit: number;
};

const STORAGE_KEY = "sip-studies:academy:wine:v2";
const VOICE_MODE_KEY = "sip-studies:academy:wine:voice-mode:v1";
const MAX_HEARTS = 5;
const PASS_TARGET = 0.7;
const MAX_MASTERY = 5;

const REALMS: Realm[] = [
  {
    unit: 1,
    title: "Crystal Atrium",
    lore: "Build your tasting HUD and unlock your first service protocol.",
    bossLessonId: "wine-4"
  },
  {
    unit: 2,
    title: "Varietal Wilds",
    lore: "Track grape clues and map styles across classic families.",
    bossLessonId: "wine-8"
  },
  {
    unit: 3,
    title: "Terroir Peaks",
    lore: "Read climate and soil signals like a deduction specialist.",
    bossLessonId: "wine-12"
  },
  {
    unit: 4,
    title: "Cellar Citadel",
    lore: "Master pairings, vessels, and faults under table-side pressure.",
    bossLessonId: "wine-16"
  },
  {
    unit: 5,
    title: "Grand Sommelier Arena",
    lore: "Final gauntlet with Sippy and Roma guiding every decision chain.",
    bossLessonId: "wine-20"
  }
];

function choice(
  id: string,
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string
): ChoiceExercise {
  return { id, kind: "choice", prompt, options, correctIndex, explanation };
}

function order(id: string, prompt: string, options: string[], answer: string[], explanation: string): OrderExercise {
  return { id, kind: "order", prompt, options, answer, explanation };
}

const LESSONS: Lesson[] = [
  {
    id: "wine-1",
    unit: 1,
    realm: "Crystal Atrium",
    title: "Glass Basics",
    tag: "Foundations",
    mission: "Scout",
    difficulty: 1,
    mentor: "sippy",
    subtitle: "Calibrate your tasting HUD with quick foundational wins.",
    xpBonus: 14,
    exercises: [
      choice(
        "wine-1-1",
        "Dry wine means:",
        ["No sugar is perceived", "The wine has no aroma", "The wine is high alcohol only", "The wine is old"],
        0,
        "Dry refers to perceived sugar, not age or alcohol."
      ),
      choice(
        "wine-1-2",
        "ABV on a label tells you:",
        ["Alcohol by volume", "Residual sugar", "Serving temperature", "Bottle age"],
        0,
        "ABV is alcohol by volume."
      ),
      order(
        "wine-1-3",
        "Arrange the tasting sequence.",
        ["Look", "Smell", "Taste", "Conclude"],
        ["Look", "Smell", "Taste", "Conclude"],
        "Systematic sequence improves consistency."
      ),
      choice(
        "wine-1-4",
        "A mouthwatering finish usually points to:",
        ["Acidity", "Oak", "Sugar", "High pH"],
        0,
        "Acidity drives freshness and salivation."
      )
    ]
  },
  {
    id: "wine-2",
    unit: 1,
    realm: "Crystal Atrium",
    title: "Aroma Families",
    tag: "Aromas",
    mission: "Scout",
    difficulty: 1,
    mentor: "roma",
    subtitle: "Sort scent clues into reliable families with Roma.",
    xpBonus: 16,
    exercises: [
      choice(
        "wine-2-1",
        "Cassis and blackberry are typically:",
        ["Floral notes", "Black fruit notes", "Mineral notes", "Oxidative notes"],
        1,
        "These belong to the black fruit family."
      ),
      choice(
        "wine-2-2",
        "Lavender and violet are:",
        ["Herbal notes", "Floral notes", "Oak notes", "Spice notes"],
        1,
        "Both are floral cues."
      ),
      order(
        "wine-2-3",
        "Order fruit development from fresh to aged.",
        ["Fresh apple", "Baked apple", "Dried apple"],
        ["Fresh apple", "Baked apple", "Dried apple"],
        "Fruit notes often evolve from fresh to baked to dried."
      ),
      choice(
        "wine-2-4",
        "Vanilla, toast, and cedar often indicate:",
        ["Fault", "Oak influence", "Lactic fermentation", "Carbonic maceration"],
        1,
        "These are common oak signatures."
      )
    ]
  },
  {
    id: "wine-3",
    unit: 1,
    realm: "Crystal Atrium",
    title: "Structure Drill",
    tag: "Structure",
    mission: "Challenge",
    difficulty: 2,
    mentor: "sippy",
    subtitle: "Read acid, tannin, and finish like a tactical chain.",
    xpBonus: 20,
    exercises: [
      choice(
        "wine-3-1",
        "Drying grip on gums usually comes from:",
        ["Sugar", "Tannin", "Acidity", "Carbon dioxide"],
        1,
        "Tannin creates that drying sensation."
      ),
      choice(
        "wine-3-2",
        "Cool-climate style commonly shows:",
        ["Lower acidity", "Higher freshness", "Higher residual sugar", "No aroma"],
        1,
        "Cool climates often preserve acidity and lift."
      ),
      order(
        "wine-3-3",
        "Build a deduction chain.",
        ["Assess acidity", "Assess ripeness", "Estimate climate", "State conclusion"],
        ["Assess acidity", "Assess ripeness", "Estimate climate", "State conclusion"],
        "Start with sensory evidence, then infer context."
      ),
      choice(
        "wine-3-4",
        "A long finish can suggest:",
        ["Lower quality only", "Concentration and quality", "A random fault", "Only high sugar"],
        1,
        "Length can correlate with concentration."
      )
    ]
  },
  {
    id: "wine-4",
    unit: 1,
    realm: "Crystal Atrium",
    title: "Atrium Gate Service",
    tag: "Service",
    mission: "Boss",
    difficulty: 2,
    mentor: "roma",
    subtitle: "Boss round: execute the opening service ritual with precision.",
    xpBonus: 24,
    exercises: [
      choice(
        "wine-4-1",
        "First step before presenting a bottle table-side:",
        ["Confirm producer and vintage with the guest", "Pour immediately", "Decant first", "Chill with ice"],
        0,
        "Verification comes first so the guest confirms the selection."
      ),
      order(
        "wine-4-2",
        "Order a clean still-wine service flow.",
        ["Present label", "Open bottle", "Offer host taste", "Serve guests"],
        ["Present label", "Open bottle", "Offer host taste", "Serve guests"],
        "This keeps hospitality and control aligned."
      ),
      choice(
        "wine-4-3",
        "Small under-pour in the host taste is best because it:",
        ["Reduces aroma loss and allows easy swirl", "Looks cheaper", "Warms wine faster", "Proves speed"],
        0,
        "A measured host taste is practical and professional."
      ),
      choice(
        "wine-4-4",
        "Who is usually served first after host approval?",
        ["Nearest guest clockwise", "Host", "Youngest guest", "Anyone asking first"],
        0,
        "Use house standard, often starting nearest the host and moving clockwise."
      )
    ]
  },
  {
    id: "wine-5",
    unit: 2,
    realm: "Varietal Wilds",
    title: "Noble Grapes I",
    tag: "Foundations",
    mission: "Scout",
    difficulty: 2,
    mentor: "sippy",
    subtitle: "Identify benchmark grapes and their common style signals.",
    xpBonus: 22,
    exercises: [
      choice(
        "wine-5-1",
        "Cabernet Sauvignon is commonly linked with:",
        ["High tannin and black fruit", "Low acid and rose notes", "No tannin and banana", "Petrol and slate only"],
        0,
        "Cabernet usually shows black fruit, tannin, and structure."
      ),
      choice(
        "wine-5-2",
        "Riesling often shows:",
        ["High acidity and citrus/stone fruit", "High tannin and smoke", "Very dark color always", "Mandatory oak"],
        0,
        "Riesling is known for acidity and aromatic lift."
      ),
      choice(
        "wine-5-3",
        "Pinot Noir is usually:",
        ["Lighter color with red fruit profile", "Deeply opaque and massively tannic", "Always sweet", "Only grown in hot climates"],
        0,
        "Pinot Noir often leans lighter in color with red-fruit notes."
      ),
      order(
        "wine-5-4",
        "Order common body progression (light to full).",
        ["Pinot Noir", "Merlot", "Cabernet Sauvignon"],
        ["Pinot Noir", "Merlot", "Cabernet Sauvignon"],
        "Body often scales this way in classic references."
      )
    ]
  },
  {
    id: "wine-6",
    unit: 2,
    realm: "Varietal Wilds",
    title: "Noble Grapes II",
    tag: "Aromas",
    mission: "Scout",
    difficulty: 2,
    mentor: "roma",
    subtitle: "Deepen aromatic recognition across major white and red varieties.",
    xpBonus: 24,
    exercises: [
      choice(
        "wine-6-1",
        "Sauvignon Blanc often shows:",
        ["Gooseberry and herb", "Chocolate and tar", "Banana and coconut only", "No aroma"],
        0,
        "Herbal and citrus-gooseberry cues are classic."
      ),
      choice(
        "wine-6-2",
        "Syrah/Shiraz commonly includes:",
        ["Black pepper and dark fruit", "Only floral candy", "Low color and no spice", "High sugar by law"],
        0,
        "Pepper and dark fruit are hallmark clues."
      ),
      choice(
        "wine-6-3",
        "Gewurztraminer commonly shows:",
        ["Lychee and rose", "Cassis and cedar", "Wet wool fault", "Zero aroma"],
        0,
        "Lychee and rose are signature aromatic notes."
      ),
      order(
        "wine-6-4",
        "Order oak aroma intensity from subtle to pronounced.",
        ["Old neutral oak", "Large old cask", "New small oak"],
        ["Old neutral oak", "Large old cask", "New small oak"],
        "New, smaller oak tends to show stronger aromatic impact."
      )
    ]
  },
  {
    id: "wine-7",
    unit: 2,
    realm: "Varietal Wilds",
    title: "Old World vs New World",
    tag: "Structure",
    mission: "Challenge",
    difficulty: 3,
    mentor: "sippy",
    subtitle: "Train style deduction through climate, ripeness, and oak signals.",
    xpBonus: 28,
    exercises: [
      choice(
        "wine-7-1",
        "A restrained fruit profile with higher acidity often suggests:",
        ["Cooler-climate or Old World style", "Dessert wine only", "Faulty winemaking", "Carbonic wine by default"],
        0,
        "Leaner fruit and lift often point to cooler style references."
      ),
      choice(
        "wine-7-2",
        "Riper fruit + higher alcohol more often suggests:",
        ["Warmer-climate style", "Only sparkling wine", "No relation to climate", "Low phenolic ripeness"],
        0,
        "Warmer climates can push ripeness and alcohol."
      ),
      order(
        "wine-7-3",
        "Order deduction logic from clue to conclusion.",
        ["Observe acidity", "Estimate ripeness", "Infer climate", "State likely style family"],
        ["Observe acidity", "Estimate ripeness", "Infer climate", "State likely style family"],
        "Evidence first, interpretation second."
      ),
      choice(
        "wine-7-4",
        "Which clue is strongest for oak handling?",
        ["Vanilla/toast/cedar signatures", "Bottle shape", "Capsule color", "Label font"],
        0,
        "Aroma and flavor markers are strongest clues for oak."
      )
    ]
  },
  {
    id: "wine-8",
    unit: 2,
    realm: "Varietal Wilds",
    title: "Varietal Wilds Boss",
    tag: "Service",
    mission: "Boss",
    difficulty: 3,
    mentor: "roma",
    subtitle: "Boss round: pair guest cues with grape and service choices quickly.",
    xpBonus: 32,
    exercises: [
      choice(
        "wine-8-1",
        "Guest asks for high-acid white with no obvious oak. Best first offer:",
        ["Sauvignon Blanc or dry Riesling", "Oaked warm-climate Chardonnay", "High-tannin red blend", "Sweet fortified wine"],
        0,
        "This request points to bright, non-oaky white styles."
      ),
      choice(
        "wine-8-2",
        "Guest requests elegant low-tannin red. Best first direction:",
        ["Pinot Noir", "Young Cabernet Sauvignon", "Tannat", "Petit Verdot"],
        0,
        "Pinot Noir is a common elegant low-tannin recommendation."
      ),
      order(
        "wine-8-3",
        "Service response order for guest preference matching.",
        ["Clarify preferences", "Offer two options", "Confirm final choice", "Serve at target temperature"],
        ["Clarify preferences", "Offer two options", "Confirm final choice", "Serve at target temperature"],
        "Clear preference capture leads to better guest outcomes."
      ),
      choice(
        "wine-8-4",
        "If a guest says wine tastes flat, first structural check is:",
        ["Acidity level", "Bottle weight", "Cork length", "Label design"],
        0,
        "Low perceived acidity can read as flat on the palate."
      )
    ]
  },
  {
    id: "wine-9",
    unit: 3,
    realm: "Terroir Peaks",
    title: "Climate Compass",
    tag: "Foundations",
    mission: "Scout",
    difficulty: 3,
    mentor: "sippy",
    subtitle: "Use climate clues to project fruit ripeness and acid profile.",
    xpBonus: 30,
    exercises: [
      choice(
        "wine-9-1",
        "Cooler climates generally preserve:",
        ["Acidity", "Sugar only", "Tannin only", "Alcohol only"],
        0,
        "Acidity is often better preserved in cooler conditions."
      ),
      choice(
        "wine-9-2",
        "Warmer climates often produce wines with:",
        ["Riper fruit character", "Always lower alcohol", "No aroma", "Only sparkling styles"],
        0,
        "Riper fruit expression often increases in warmer sites."
      ),
      choice(
        "wine-9-3",
        "Large day-night temperature swing can help:",
        ["Retain aromatics and acidity", "Erase fruit character", "Increase volatile acidity by default", "Prevent ripening entirely"],
        0,
        "Diurnal shift can preserve freshness while allowing ripening."
      ),
      order(
        "wine-9-4",
        "Order climatic deduction from evidence to call.",
        ["Taste freshness", "Assess fruit ripeness", "Estimate climate", "State likely style"],
        ["Taste freshness", "Assess fruit ripeness", "Estimate climate", "State likely style"],
        "Sensory evidence drives climate inference."
      )
    ]
  },
  {
    id: "wine-10",
    unit: 3,
    realm: "Terroir Peaks",
    title: "Soil Signals",
    tag: "Aromas",
    mission: "Scout",
    difficulty: 3,
    mentor: "roma",
    subtitle: "Connect texture and aroma accents to vineyard environment clues.",
    xpBonus: 32,
    exercises: [
      choice(
        "wine-10-1",
        "Limestone-linked descriptions often include:",
        ["Lifted acidity and chalky impression", "Low acid and jam only", "No minerality ever", "Heavy sweetness"],
        0,
        "Chalky/mineral impressions are common language around limestone sites."
      ),
      choice(
        "wine-10-2",
        "Volcanic soils are often discussed with:",
        ["Smoky/mineral tension descriptors", "Automatic sweetness", "No structural impact", "Always low acidity"],
        0,
        "Volcanic sites are often linked with smoky/mineral narratives."
      ),
      choice(
        "wine-10-3",
        "Water-retentive clay can support:",
        ["Steady vine hydration in dry periods", "Permanent high acidity only", "Zero canopy growth", "No flavor development"],
        0,
        "Clay can hold water and buffer drought stress."
      ),
      order(
        "wine-10-4",
        "Order evidence evaluation for site clues.",
        ["Assess structure", "Assess aromatic accent", "Cross-check climate profile", "Propose terroir hypothesis"],
        ["Assess structure", "Assess aromatic accent", "Cross-check climate profile", "Propose terroir hypothesis"],
        "Blend structure and aroma evidence before final hypothesis."
      )
    ]
  },
  {
    id: "wine-11",
    unit: 3,
    realm: "Terroir Peaks",
    title: "Region Snapshot Runs",
    tag: "Structure",
    mission: "Challenge",
    difficulty: 3,
    mentor: "sippy",
    subtitle: "Rapidly pair regions with signature style cues.",
    xpBonus: 34,
    exercises: [
      choice(
        "wine-11-1",
        "Classic Sancerre benchmark:",
        ["High-acid Sauvignon Blanc", "Sweet late-harvest Syrah", "Full-bodied oaked Merlot", "Fortified Muscat"],
        0,
        "Sancerre is classically tied to Sauvignon Blanc."
      ),
      choice(
        "wine-11-2",
        "Barolo is based on:",
        ["Nebbiolo", "Tempranillo", "Pinot Grigio", "Zinfandel"],
        0,
        "Barolo is a Nebbiolo appellation."
      ),
      choice(
        "wine-11-3",
        "Chablis is associated with:",
        ["Unoaked or lightly oaked Chardonnay style", "Heavy sweet red blend", "Fortified oxidative style", "Aromatic Gewurztraminer"],
        0,
        "Chablis is Chardonnay with a typically crisp profile."
      ),
      order(
        "wine-11-4",
        "Order this region-memory routine.",
        ["Recall grape", "Recall climate signature", "Recall structure profile", "State likely region family"],
        ["Recall grape", "Recall climate signature", "Recall structure profile", "State likely region family"],
        "Memory anchors are strongest when tied to structure."
      )
    ]
  },
  {
    id: "wine-12",
    unit: 3,
    realm: "Terroir Peaks",
    title: "Blind Grid Sprint",
    tag: "Service",
    mission: "Boss",
    difficulty: 4,
    mentor: "roma",
    subtitle: "Boss round: complete a full blind-style deduction pipeline.",
    xpBonus: 38,
    exercises: [
      choice(
        "wine-12-1",
        "Best first move in blind tasting:",
        ["Assess structural markers before naming region", "Guess producer", "Guess price", "Check capsule shape"],
        0,
        "Start with objective structure and sensory facts."
      ),
      order(
        "wine-12-2",
        "Order the deduction grid.",
        ["Sight", "Nose", "Palate", "Conclusion"],
        ["Sight", "Nose", "Palate", "Conclusion"],
        "This sequence keeps evaluations consistent and defensible."
      ),
      choice(
        "wine-12-3",
        "If acidity and tannin conflict with your initial guess, you should:",
        ["Revisit conclusion and update it", "Ignore and submit quickly", "Assume glassware error", "Skip structure"],
        0,
        "Revision is part of good blind tasting discipline."
      ),
      choice(
        "wine-12-4",
        "Strong blind conclusion language should be:",
        ["Probabilistic and evidence-based", "Absolute with no support", "Only poetic", "Single aroma only"],
        0,
        "Use confidence bands and evidence, not over-claims."
      )
    ]
  },
  {
    id: "wine-13",
    unit: 4,
    realm: "Cellar Citadel",
    title: "Oak and Vessel Lab",
    tag: "Foundations",
    mission: "Scout",
    difficulty: 3,
    mentor: "sippy",
    subtitle: "Compare oak formats and neutral vessels for style outcomes.",
    xpBonus: 34,
    exercises: [
      choice(
        "wine-13-1",
        "New small oak often increases:",
        ["Aromatic and tannin impact", "Residual sugar", "Bottle pressure", "Acidity directly"],
        0,
        "Smaller new oak boosts surface contact and flavor impact."
      ),
      choice(
        "wine-13-2",
        "Neutral vessel aging tends to emphasize:",
        ["Fruit purity and site expression", "Heavy vanilla tones", "Stronger oak lactones", "Intentional oxidation only"],
        0,
        "Neutral vessels reduce overt oak signature."
      ),
      choice(
        "wine-13-3",
        "Lees stirring can contribute:",
        ["Texture and creamy mouthfeel", "Tannin extraction", "Carbonation", "Alcohol reduction"],
        0,
        "Lees work is often tied to textural gain."
      ),
      order(
        "wine-13-4",
        "Order oak influence from lowest to highest.",
        ["Stainless steel", "Old large oak", "New small oak"],
        ["Stainless steel", "Old large oak", "New small oak"],
        "This is a useful quick-reference hierarchy."
      )
    ]
  },
  {
    id: "wine-14",
    unit: 4,
    realm: "Cellar Citadel",
    title: "Pairing Physics",
    tag: "Aromas",
    mission: "Scout",
    difficulty: 3,
    mentor: "roma",
    subtitle: "Match intensity, acidity, and texture to food structure.",
    xpBonus: 36,
    exercises: [
      choice(
        "wine-14-1",
        "High-acid wine often pairs well with rich food because it:",
        ["Cuts through fat and refreshes palate", "Adds bitterness", "Removes aroma", "Always tastes sweet"],
        0,
        "Acidity adds contrast and lift against richness."
      ),
      choice(
        "wine-14-2",
        "Spicy food is often safer with:",
        ["Lower alcohol and some fruit sweetness", "High tannin only", "Very oaky dry reds", "Oxidized old wine"],
        0,
        "Heat can be amplified by high alcohol and harsh tannin."
      ),
      choice(
        "wine-14-3",
        "Delicate fish usually needs:",
        ["Lighter-bodied wine with clean profile", "Big tannic red", "Fortified sweet wine", "High-toast oak bomb"],
        0,
        "Delicate dishes call for balanced, lighter pairings."
      ),
      order(
        "wine-14-4",
        "Order pairing checks before recommending.",
        ["Assess dish intensity", "Assess dominant taste", "Match or contrast structure", "Offer final pair"],
        ["Assess dish intensity", "Assess dominant taste", "Match or contrast structure", "Offer final pair"],
        "This flow keeps pairings both strategic and guest-friendly."
      )
    ]
  },
  {
    id: "wine-15",
    unit: 4,
    realm: "Cellar Citadel",
    title: "Fault Finder",
    tag: "Structure",
    mission: "Challenge",
    difficulty: 4,
    mentor: "sippy",
    subtitle: "Diagnose common wine faults versus stylistic variation.",
    xpBonus: 40,
    exercises: [
      choice(
        "wine-15-1",
        "Wet cardboard / musty aroma often indicates:",
        ["Cork taint (TCA)", "Healthy bottle age", "New oak", "Carbonic maceration"],
        0,
        "TCA is classically described as musty/cardboard."
      ),
      choice(
        "wine-15-2",
        "Nail polish remover character points to:",
        ["Volatile acidity at excessive level", "Normal primary fruit", "Lees aging", "Cold stabilization"],
        0,
        "Excess VA can smell like acetone/nail polish."
      ),
      choice(
        "wine-15-3",
        "Rotten egg or struck match can suggest:",
        ["Sulfur-related reduction", "High residual sugar", "Botrytis", "Malolactic completion"],
        0,
        "Reduction can present sulfur-like notes."
      ),
      order(
        "wine-15-4",
        "Order fault triage protocol.",
        ["Confirm aroma repeatedly", "Compare against style expectations", "Decide fault vs style", "Take service action"],
        ["Confirm aroma repeatedly", "Compare against style expectations", "Decide fault vs style", "Take service action"],
        "Diagnosis should be verified before service decisions."
      )
    ]
  },
  {
    id: "wine-16",
    unit: 4,
    realm: "Cellar Citadel",
    title: "Citadel Table Boss",
    tag: "Service",
    mission: "Boss",
    difficulty: 4,
    mentor: "roma",
    subtitle: "Boss round: navigate pairings, faults, and guest communication.",
    xpBonus: 44,
    exercises: [
      choice(
        "wine-16-1",
        "A guest says wine seems corked. First response:",
        ["Acknowledge and reassess the bottle professionally", "Argue and refuse", "Top up the glass", "Ignore and continue"],
        0,
        "Professional acknowledgment and verification protect guest trust."
      ),
      choice(
        "wine-16-2",
        "Best pairing move when dish has high acid (tomato/lemon):",
        ["Choose wine with equal or higher acidity", "Choose very low-acid wine", "Pick highest tannin possible", "Only serve sweet wine"],
        0,
        "Wine acidity should keep pace with acidic food."
      ),
      order(
        "wine-16-3",
        "Order a smooth recovery sequence after bottle issue.",
        ["Apologize and remove bottle", "Confirm replacement preference", "Present replacement", "Resume service"],
        ["Apologize and remove bottle", "Confirm replacement preference", "Present replacement", "Resume service"],
        "Clear communication and clean execution recover confidence."
      ),
      choice(
        "wine-16-4",
        "If a wine is too warm, first fix is usually:",
        ["Controlled cooling before service", "Aggressive decant only", "Add ice to glass", "Ignore temperature"],
        0,
        "Temperature correction is part of quality service."
      )
    ]
  },
  {
    id: "wine-17",
    unit: 5,
    realm: "Grand Sommelier Arena",
    title: "Sparkling Systems",
    tag: "Foundations",
    mission: "Scout",
    difficulty: 4,
    mentor: "sippy",
    subtitle: "Master sparkling production pathways and style outcomes.",
    xpBonus: 42,
    exercises: [
      choice(
        "wine-17-1",
        "Traditional method secondary fermentation happens:",
        ["In bottle", "In open vat", "In amphora only", "After bottling for still wine"],
        0,
        "Traditional method ferments again in bottle."
      ),
      choice(
        "wine-17-2",
        "Charmat method secondary fermentation is usually:",
        ["In tank", "In each bottle", "In cask", "Skipped entirely"],
        0,
        "Tank fermentation defines Charmat."
      ),
      choice(
        "wine-17-3",
        "Lees contact in sparkling often adds:",
        ["Brioche/toast texture and aroma", "Tannin", "Higher sweetness by default", "Lower pressure"],
        0,
        "Autolysis can add pastry-like notes and texture."
      ),
      order(
        "wine-17-4",
        "Order key traditional-method stages.",
        ["Base wine", "Second fermentation", "Aging on lees", "Disgorgement"],
        ["Base wine", "Second fermentation", "Aging on lees", "Disgorgement"],
        "This sequence captures the core production arc."
      )
    ]
  },
  {
    id: "wine-18",
    unit: 5,
    realm: "Grand Sommelier Arena",
    title: "Fortified and Sweet",
    tag: "Aromas",
    mission: "Scout",
    difficulty: 4,
    mentor: "roma",
    subtitle: "Decode sweetness balance, fortification timing, and aromatic cues.",
    xpBonus: 44,
    exercises: [
      choice(
        "wine-18-1",
        "Fortification means:",
        ["Adding spirit to wine", "Adding sugar after bottling only", "Carbonating", "Diluting with water"],
        0,
        "Fortification is the addition of spirit."
      ),
      choice(
        "wine-18-2",
        "Stopping fermentation early generally leaves:",
        ["More residual sugar", "More tannin", "Less alcohol always", "No aroma"],
        0,
        "Sugar remains when fermentation is arrested early."
      ),
      choice(
        "wine-18-3",
        "A balanced sweet wine usually requires:",
        ["Acidity to offset sweetness", "No acidity", "High tannin only", "Heavy oak only"],
        0,
        "Acidity keeps sweetness from feeling cloying."
      ),
      order(
        "wine-18-4",
        "Order dessert pairing logic.",
        ["Assess dessert sweetness", "Ensure wine is equally sweet or sweeter", "Check acid balance", "Serve in small pour"],
        ["Assess dessert sweetness", "Ensure wine is equally sweet or sweeter", "Check acid balance", "Serve in small pour"],
        "Sweet pairing works best when sweetness and freshness are balanced."
      )
    ]
  },
  {
    id: "wine-19",
    unit: 5,
    realm: "Grand Sommelier Arena",
    title: "Exam Strategy Run",
    tag: "Structure",
    mission: "Challenge",
    difficulty: 5,
    mentor: "sippy",
    subtitle: "Optimize pacing, confidence language, and scoring discipline.",
    xpBonus: 46,
    exercises: [
      choice(
        "wine-19-1",
        "Best way to avoid over-calling in blind tasting:",
        ["State likely range with evidence", "Always claim exact producer", "Ignore structure", "Answer as fast as possible"],
        0,
        "Evidence-based ranges are stronger than unsupported certainty."
      ),
      choice(
        "wine-19-2",
        "When uncertain between two regions, strongest move is:",
        ["Pick one and justify with structural clues", "Leave blank", "Guess grape first then ignore clues", "Switch randomly"],
        0,
        "Defensible logic can earn points even with partial uncertainty."
      ),
      choice(
        "wine-19-3",
        "Time management in service practical favors:",
        ["Consistent routine over rushed improvisation", "Maximum speed only", "Skipping confirmation", "Silent service with no communication"],
        0,
        "Consistent routines reduce errors under pressure."
      ),
      order(
        "wine-19-4",
        "Order exam response protocol.",
        ["Gather evidence", "Form hypothesis", "Stress-test hypothesis", "Deliver concise conclusion"],
        ["Gather evidence", "Form hypothesis", "Stress-test hypothesis", "Deliver concise conclusion"],
        "A structured response is clear, fast, and score-friendly."
      )
    ]
  },
  {
    id: "wine-20",
    unit: 5,
    realm: "Grand Sommelier Arena",
    title: "Sippy and Roma Final",
    tag: "Service",
    mission: "Boss",
    difficulty: 5,
    mentor: "roma",
    subtitle: "Final boss: full-spectrum tasting, pairing, and service execution.",
    xpBonus: 56,
    exercises: [
      choice(
        "wine-20-1",
        "Final table asks for one red and one white by-the-glass with food. First move:",
        ["Clarify flavor, body, and price preferences", "Pour house default immediately", "Pick most expensive options", "Offer only one style"],
        0,
        "Clarification enables accurate and confident recommendations."
      ),
      order(
        "wine-20-2",
        "Order the final decision chain.",
        ["Assess guest goal", "Choose style options", "Confirm serving details", "Execute polished service"],
        ["Assess guest goal", "Choose style options", "Confirm serving details", "Execute polished service"],
        "Great service blends diagnosis, recommendation, and execution."
      ),
      choice(
        "wine-20-3",
        "In blind analysis, if aroma says ripe but acid is high, best interpretation is:",
        ["Reconcile both clues before concluding", "Ignore acid", "Ignore aroma", "Assume faulty wine"],
        0,
        "Conflicting clues should be integrated, not ignored."
      ),
      choice(
        "wine-20-4",
        "Best closing behavior after successful service:",
        ["Check guest satisfaction and re-engage naturally", "Leave immediately", "Upsell aggressively without cues", "Clear glasses too early"],
        0,
        "Follow-up reinforces hospitality and professionalism."
      )
    ]
  }
];

const MENTORS: Record<MentorId, { name: string; title: string }> = {
  sippy: { name: "Sippy", title: "Lead Beverage Educator" },
  roma: { name: "Roma", title: "Senior Sensory Educator" }
};

const MENTOR_VARIANTS: Record<MentorId, Record<MentorMood, string>> = {
  sippy: {
    calm: sippyCalm,
    coach: sippyCoach,
    spark: sippySpark,
    celebrate: sippyCelebrate
  },
  roma: {
    calm: romaCalm,
    coach: romaCoach,
    spark: romaSpark,
    celebrate: romaCelebrate
  }
};

const REALM_MEDIA: Record<
  number,
  {
    poster: string;
    sippy: string;
    roma: string;
    trailer: string;
    cue: string;
  }
> = {
  1: {
    poster: sippyCalm,
    sippy: sippyCoach,
    roma: romaCalm,
    trailer: "4s intro loop",
    cue: "Crystal reflections and confident first pours as the academy gates open."
  },
  2: {
    poster: romaSpark,
    sippy: sippySpark,
    roma: romaCoach,
    trailer: "8s varietal chase",
    cue: "Fast aromatic clue-hunting through the Varietal Wilds."
  },
  3: {
    poster: sippySpark,
    sippy: sippyCoach,
    roma: romaSpark,
    trailer: "8s summit reveal",
    cue: "High-altitude terroir scans with structural deduction overlays."
  },
  4: {
    poster: romaCoach,
    sippy: sippyCalm,
    roma: romaCoach,
    trailer: "8s table-side boss prelude",
    cue: "Citadel service pressure with elegant recovery choreography."
  },
  5: {
    poster: romaCelebrate,
    sippy: sippyCelebrate,
    roma: romaCelebrate,
    trailer: "12s final arena cinematic",
    cue: "Grand arena finale where Sippy and Roma co-lead the capstone run."
  }
};

const VOICE_MODE_LABELS: Record<MentorVoiceMode, string> = {
  classic: "Classic",
  tactical: "Tactical",
  story: "Story"
};

function dateStamp(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function defaultProgress(): AcademyProgress {
  const lessons: Record<string, LessonProgress> = {};
  LESSONS.forEach((lesson, index) => {
    lessons[lesson.id] = { unlocked: index === 0, mastery: 0, bestAccuracy: 0, attempts: 0, completions: 0 };
  });
  return { totalXp: 0, streak: 0, lastActiveDate: null, lessons };
}

function parseProgress(raw: string | null): AcademyProgress {
  const fallback = defaultProgress();
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return fallback;
    const record = parsed as Record<string, unknown>;
    const lessonRecord = record.lessons;
    if (!lessonRecord || typeof lessonRecord !== "object") return fallback;

    const lessons: Record<string, LessonProgress> = {};
    LESSONS.forEach((lesson, index) => {
      const item = (lessonRecord as Record<string, unknown>)[lesson.id];
      if (!item || typeof item !== "object") {
        lessons[lesson.id] = { unlocked: index === 0, mastery: 0, bestAccuracy: 0, attempts: 0, completions: 0 };
        return;
      }
      const entry = item as Record<string, unknown>;
      lessons[lesson.id] = {
        unlocked: index === 0 ? true : Boolean(entry.unlocked),
        mastery: Math.max(0, Math.min(MAX_MASTERY, Number(entry.mastery) || 0)),
        bestAccuracy: Math.max(0, Math.min(1, Number(entry.bestAccuracy) || 0)),
        attempts: Math.max(0, Math.round(Number(entry.attempts) || 0)),
        completions: Math.max(0, Math.round(Number(entry.completions) || 0))
      };
    });

    return {
      totalXp: Math.max(0, Math.round(Number(record.totalXp) || 0)),
      streak: Math.max(0, Math.round(Number(record.streak) || 0)),
      lastActiveDate: typeof record.lastActiveDate === "string" ? record.lastActiveDate : null,
      lessons
    };
  } catch {
    return fallback;
  }
}

function shuffle(values: string[]) {
  const next = [...values];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const value = next[index];
    next[index] = next[swap];
    next[swap] = value;
  }
  return next;
}

function nextLessonId(lessonId: string) {
  const index = LESSONS.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0 || index + 1 >= LESSONS.length) return null;
  return LESSONS[index + 1].id;
}

function tagClass(tag: LessonTag) {
  if (tag === "Foundations") return "foundations";
  if (tag === "Aromas") return "aromas";
  if (tag === "Structure") return "structure";
  return "service";
}

function missionClass(mission: Lesson["mission"]) {
  if (mission === "Scout") return "scout";
  if (mission === "Challenge") return "challenge";
  return "boss";
}

function missionLabel(mission: Lesson["mission"]) {
  if (mission === "Scout") return "Scout";
  if (mission === "Challenge") return "Challenge";
  return "Boss";
}

function summaryRank(accuracy: number, passed: boolean) {
  if (!passed) return "Retry";
  if (accuracy >= 1) return "S";
  if (accuracy >= 0.9) return "A";
  if (accuracy >= 0.8) return "B";
  return "C";
}

function lessonPortrait(lesson: Lesson) {
  if (lesson.mission === "Boss") return MENTOR_VARIANTS[lesson.mentor].spark;
  if (lesson.mission === "Challenge") return MENTOR_VARIANTS[lesson.mentor].coach;
  return MENTOR_VARIANTS[lesson.mentor].calm;
}

export function SipAcademyWineLessons() {
  const [progress, setProgress] = useState<AcademyProgress>(() => parseProgress(window.localStorage.getItem(STORAGE_KEY)));
  const [voiceMode, setVoiceMode] = useState<MentorVoiceMode>(() => {
    const stored = window.localStorage.getItem(VOICE_MODE_KEY);
    return stored === "classic" || stored === "tactical" || stored === "story" ? stored : "classic";
  });
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [correct, setCorrect] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [choiceSelection, setChoiceSelection] = useState<number | null>(null);
  const [orderSelection, setOrderSelection] = useState<string[]>([]);
  const [orderPool, setOrderPool] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [summary, setSummary] = useState<SummaryState | null>(null);
  const [unlockCeremony, setUnlockCeremony] = useState<UnlockCeremony | null>(null);
  const [flashUnlockedLessonId, setFlashUnlockedLessonId] = useState<string | null>(null);

  const activeLesson = useMemo(
    () => (activeLessonId ? LESSONS.find((lesson) => lesson.id === activeLessonId) ?? null : null),
    [activeLessonId]
  );
  const activeExercise = activeLesson ? activeLesson.exercises[exerciseIndex] ?? null : null;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    window.localStorage.setItem(VOICE_MODE_KEY, voiceMode);
  }, [voiceMode]);

  useEffect(() => {
    if (!flashUnlockedLessonId) return;
    const timer = window.setTimeout(() => setFlashUnlockedLessonId(null), 2200);
    return () => window.clearTimeout(timer);
  }, [flashUnlockedLessonId]);

  useEffect(() => {
    if (!unlockCeremony) return;
    const timer = window.setTimeout(() => setUnlockCeremony(null), 3800);
    return () => window.clearTimeout(timer);
  }, [unlockCeremony]);

  const completedCount = LESSONS.filter((lesson) => (progress.lessons[lesson.id]?.completions ?? 0) > 0).length;
  const masteryTotal = LESSONS.reduce((sum, lesson) => sum + (progress.lessons[lesson.id]?.mastery ?? 0), 0);
  const completionRatio = LESSONS.length > 0 ? completedCount / LESSONS.length : 0;
  const nextLesson =
    LESSONS.find((lesson) => {
      const lessonProgress = progress.lessons[lesson.id];
      return (lessonProgress?.unlocked ?? false) && (lessonProgress?.completions ?? 0) === 0;
    }) ??
    LESSONS.find((lesson) => progress.lessons[lesson.id]?.unlocked) ??
    LESSONS[0];
  const realmProgress = REALMS.map((realm) => {
    const lessons = LESSONS.filter((lesson) => lesson.unit === realm.unit);
    const completed = lessons.filter((lesson) => (progress.lessons[lesson.id]?.completions ?? 0) > 0).length;
    const unlocked = lessons.filter((lesson) => progress.lessons[lesson.id]?.unlocked).length;
    const boss = lessons.find((lesson) => lesson.id === realm.bossLessonId) ?? lessons[lessons.length - 1];
    const bossCleared = boss ? (progress.lessons[boss.id]?.completions ?? 0) > 0 : false;
    const ratio = lessons.length > 0 ? completed / lessons.length : 0;
    return { ...realm, lessons, completed, unlocked, boss, bossCleared, ratio };
  });
  const summaryLesson = summary ? LESSONS.find((lesson) => lesson.id === summary.lessonId) ?? null : null;
  const highlightedRealmUnit = activeLesson?.unit ?? summaryLesson?.unit ?? nextLesson.unit;
  const highlightedRealm = realmProgress.find((realm) => realm.unit === highlightedRealmUnit) ?? realmProgress[0];
  const activeRealmMedia = REALM_MEDIA[highlightedRealm?.unit ?? 1] ?? REALM_MEDIA[1];
  const lowHearts = activeLesson ? hearts <= 2 : false;

  const prepareExercise = (lesson: Lesson, index: number) => {
    const exercise = lesson.exercises[index];
    setExerciseIndex(index);
    setFeedback(null);
    setChoiceSelection(null);
    setOrderSelection([]);
    setOrderPool(exercise.kind === "order" ? shuffle(exercise.options) : []);
  };

  const startLesson = (lessonId: string) => {
    const lessonProgress = progress.lessons[lessonId];
    if (!lessonProgress || !lessonProgress.unlocked) return;
    const lesson = LESSONS.find((item) => item.id === lessonId);
    if (!lesson) return;
    setSummary(null);
    setActiveLessonId(lessonId);
    setHearts(MAX_HEARTS);
    setCorrect(0);
    setCombo(0);
    setBestCombo(0);
    prepareExercise(lesson, 0);
    setProgress((current) => {
      const today = dateStamp(new Date());
      if (current.lastActiveDate === today) return current;
      let streak = 1;
      if (current.lastActiveDate) {
        const dayGap = Math.round(
          (new Date(`${today}T00:00:00`).getTime() - new Date(`${current.lastActiveDate}T00:00:00`).getTime()) / 86400000
        );
        if (dayGap === 1) streak = Math.max(1, current.streak + 1);
      }
      return { ...current, streak, lastActiveDate: today };
    });
  };

  const canCheck =
    activeExercise && !feedback
      ? activeExercise.kind === "choice"
        ? choiceSelection !== null
        : orderSelection.length === activeExercise.answer.length
      : false;

  const checkAnswer = () => {
    if (!activeExercise || feedback) return;
    let isCorrect = false;
    let correction = "";
    if (activeExercise.kind === "choice") {
      if (choiceSelection === null) return;
      isCorrect = choiceSelection === activeExercise.correctIndex;
      correction = `Correct answer: ${activeExercise.options[activeExercise.correctIndex]}.`;
    } else {
      if (orderSelection.length !== activeExercise.answer.length) return;
      isCorrect = orderSelection.every((value, index) => value === activeExercise.answer[index]);
      correction = `Expected order: ${activeExercise.answer.join(" -> ")}.`;
    }
    const heartsAfter = isCorrect ? hearts : Math.max(0, hearts - 1);
    const correctAfter = isCorrect ? correct + 1 : correct;
    const comboAfter = isCorrect ? combo + 1 : 0;
    setHearts(heartsAfter);
    setCorrect(correctAfter);
    setCombo(comboAfter);
    setBestCombo(Math.max(bestCombo, comboAfter));
    setFeedback({
      correct: isCorrect,
      heartsAfter,
      note: isCorrect ? activeExercise.explanation : `Not quite. ${correction}`
    });
  };

  const finishLesson = (lesson: Lesson, heartsAfter: number) => {
    const total = lesson.exercises.length;
    const accuracy = total > 0 ? correct / total : 0;
    const passed = heartsAfter > 0 && accuracy >= PASS_TARGET;
    const nextId = nextLessonId(lesson.id);
    const nextWasLocked = nextId ? !(progress.lessons[nextId]?.unlocked ?? false) : false;
    const comboBonus = bestCombo >= 4 ? 10 : bestCombo >= 2 ? 4 : 0;
    const xp = correct * 8 + (passed ? lesson.xpBonus : Math.floor(lesson.xpBonus / 4)) + comboBonus;
    setProgress((current) => {
      const currentLesson = current.lessons[lesson.id];
      if (!currentLesson) return current;
      const lessons = { ...current.lessons };
      lessons[lesson.id] = {
        ...currentLesson,
        attempts: currentLesson.attempts + 1,
        completions: passed ? currentLesson.completions + 1 : currentLesson.completions,
        bestAccuracy: Math.max(currentLesson.bestAccuracy, accuracy),
        mastery: passed ? Math.min(MAX_MASTERY, currentLesson.mastery + 1) : currentLesson.mastery
      };
      if (passed) {
        const unlockId = nextLessonId(lesson.id);
        if (unlockId && lessons[unlockId]) lessons[unlockId] = { ...lessons[unlockId], unlocked: true };
      }
      return { ...current, totalXp: current.totalXp + xp, lessons };
    });
    setSummary({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      passed,
      correct,
      total,
      accuracy,
      xp,
      bestCombo,
      heartsLeft: heartsAfter
    });
    if (passed && nextId && nextWasLocked) {
      const nextLesson = LESSONS.find((item) => item.id === nextId);
      if (nextLesson) {
        setUnlockCeremony({ lessonId: nextLesson.id, title: nextLesson.title, unit: nextLesson.unit });
        setFlashUnlockedLessonId(nextLesson.id);
      }
    }
    setActiveLessonId(null);
    setFeedback(null);
    setChoiceSelection(null);
    setOrderSelection([]);
  };

  const continueExercise = () => {
    if (!activeLesson || !feedback) return;
    const finalStep = exerciseIndex + 1 >= activeLesson.exercises.length || feedback.heartsAfter <= 0;
    if (finalStep) {
      finishLesson(activeLesson, feedback.heartsAfter);
      return;
    }
    prepareExercise(activeLesson, exerciseIndex + 1);
  };

  const sessionProgress = activeLesson ? (exerciseIndex + (feedback ? 1 : 0)) / activeLesson.exercises.length : 0;
  const guideState = useMemo(() => {
    const lineByMode = (mood: MentorMood, lessonMentor: MentorId) => {
      if (voiceMode === "tactical") {
        if (mood === "celebrate") return "Excellent execution. Unlock achieved. Advance to the next node.";
        if (mood === "spark") return "Correct. Keep momentum and preserve combo.";
        if (mood === "coach") return lowHearts ? "Hearts critical. Slow down and verify evidence." : "Re-check cue and select strongest evidence match.";
        return lessonMentor === "roma" ? "Use aroma precision. Select only after signal confirmation." : "Use structure-first logic before choosing.";
      }
      if (voiceMode === "story") {
        if (mood === "celebrate") return "A golden pour of progress. Your next chapter is now uncorked.";
        if (mood === "spark") return "You are moving in rhythm now. Keep this flow going.";
        if (mood === "coach")
          return lowHearts
            ? "The glass runs low. Breathe, reset, and answer with intention."
            : "Close call. Let the clues tell their full story.";
        return lessonMentor === "roma"
          ? "Listen for the perfume of the wine, then commit."
          : "Read the backbone of the wine before your final choice.";
      }
      if (mood === "celebrate") return "Elegant work. You cleared the lesson and unlocked your next pour on the path.";
      if (mood === "spark") return combo >= 2 ? "Beautiful streak. Keep that rhythm and collect your combo bonus." : "Yes. Precision first.";
      if (mood === "coach")
        return lowHearts
          ? "Hearts are low. Slow down and trust structure before answering."
          : "Close. Read the cue, then answer from evidence.";
      return lessonMentor === "roma"
        ? "Select the strongest aroma or service cue and commit."
        : "Select the strongest option and commit. Fast, clean, confident.";
    };

    const summaryLesson = summary ? LESSONS.find((lesson) => lesson.id === summary.lessonId) ?? null : null;
    const lessonMentor: MentorId =
      activeLesson?.mentor ?? summaryLesson?.mentor ?? (activeLesson && (activeLesson.tag === "Aromas" || activeLesson.tag === "Service") ? "roma" : "sippy");
    const supportMentor: MentorId = lessonMentor === "roma" ? "sippy" : "roma";

    if (summary) {
      if (summary.passed) {
        return {
          speaker: lessonMentor,
          mood: "celebrate" as MentorMood,
          expression: "celebrate" as MentorMood,
          line: lineByMode("celebrate", lessonMentor)
        };
      }
      return {
        speaker: supportMentor,
        mood: "coach" as MentorMood,
        expression: "coach" as MentorMood,
        line: lineByMode("coach", lessonMentor)
      };
    }

    if (feedback) {
      if (feedback.correct) {
        return {
          speaker: lessonMentor,
          mood: "spark" as MentorMood,
          expression: "spark" as MentorMood,
          line: lineByMode("spark", lessonMentor)
        };
      }
      return {
        speaker: supportMentor,
        mood: "coach" as MentorMood,
        expression: "coach" as MentorMood,
        line: lineByMode("coach", lessonMentor)
      };
    }

    if (activeLesson && activeExercise) {
      if (activeExercise.kind === "order") {
        return {
          speaker: lessonMentor,
          mood: "calm" as MentorMood,
          expression: "calm" as MentorMood,
          line:
            voiceMode === "story"
              ? "Sequence is your route map. Step through it like a graceful service ritual."
              : voiceMode === "tactical"
                ? "Execute sequence in exact order. Build from first principle to conclusion."
                : "Sequence matters. Build the chain one clear step at a time."
        };
      }
      return {
        speaker: lessonMentor,
        mood: "calm" as MentorMood,
        expression: "calm" as MentorMood,
        line: lineByMode("calm", lessonMentor)
      };
    }

    return {
      speaker: "roma" as MentorId,
      mood: "calm" as MentorMood,
      expression: "calm" as MentorMood,
      line:
        voiceMode === "story"
          ? "Welcome back. Begin a lesson and we will guide your tasting journey together."
          : voiceMode === "tactical"
            ? "Welcome back. Select a node to begin focused training."
            : "Welcome back. Start a node and we will guide every round with you."
    };
  }, [activeExercise, activeLesson, combo, feedback, lowHearts, summary, voiceMode]);
  const activeMentor = MENTORS[guideState.speaker];
  const secondaryMentor = MENTORS[guideState.speaker === "roma" ? "sippy" : "roma"];
  const sippyImage =
    guideState.speaker === "sippy" ? MENTOR_VARIANTS.sippy[guideState.expression] : MENTOR_VARIANTS.sippy.calm;
  const romaImage =
    guideState.speaker === "roma" ? MENTOR_VARIANTS.roma[guideState.expression] : MENTOR_VARIANTS.roma.calm;

  return (
    <section
      className={`academy-game${feedback ? (feedback.correct ? " academy-state-correct" : " academy-state-wrong") : ""}${
        summary?.passed ? " academy-state-win" : ""
      }`}
    >
      <header className="academy-game-header">
        <div>
          <p className="academy-kicker">Sip Academy Adventure Mode</p>
          <h2>Sippy and Roma: Wine Quest Campaign</h2>
          <p>Twenty guided missions across five realms. Build tasting skill trees, clear boss rounds, and level your service game.</p>
        </div>
        <div className="academy-campaign-spotlight">
          <p className="academy-campaign-kicker">Next Quest</p>
          <h3>
            Unit {nextLesson.unit}: {nextLesson.title}
          </h3>
          <p>
            {nextLesson.realm} - {missionLabel(nextLesson.mission)} mission with {MENTORS[nextLesson.mentor].name}. Difficulty {nextLesson.difficulty}/5.
          </p>
        </div>
        <div className="academy-level-band">
          <div>
            <strong>{Math.round(completionRatio * 100)}%</strong>
            <span>Path Completion</span>
          </div>
          <div>
            <strong>{completedCount}</strong>
            <span>Lessons Cleared</span>
          </div>
          <div>
            <strong>{masteryTotal}</strong>
            <span>Mastery Points</span>
          </div>
        </div>
        <div className="academy-metrics">
          <span className="academy-chip academy-chip-xp">XP {progress.totalXp}</span>
          <span className="academy-chip academy-chip-streak">Streak {progress.streak}</span>
          <span className="academy-chip academy-chip-mastery">Mastery {masteryTotal}</span>
          <span className={`academy-chip academy-chip-hearts${lowHearts ? " is-danger" : ""}`}>
            Hearts {activeLesson ? hearts : MAX_HEARTS}
          </span>
        </div>
        <div className="academy-voice-modes" aria-label="Mentor voice mode">
          {(["classic", "tactical", "story"] as MentorVoiceMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`academy-voice-btn ${voiceMode === mode ? "active" : ""}`}
              onClick={() => setVoiceMode(mode)}
            >
              {VOICE_MODE_LABELS[mode]}
            </button>
          ))}
        </div>
      </header>

      <section className="academy-realms" aria-label="Sip Academy realm map">
        {realmProgress.map((realm) => (
          <article
            key={realm.unit}
            className={`academy-realm-card ${highlightedRealm?.unit === realm.unit ? "active" : ""}`}
            aria-label={`Unit ${realm.unit} ${realm.title}`}
          >
            <div className="academy-realm-head">
              <p>Unit {realm.unit}</p>
              <span>{realm.completed}/{realm.lessons.length} cleared</span>
            </div>
            <h3>{realm.title}</h3>
            <p>{realm.lore}</p>
            <div className="academy-realm-meter" aria-hidden="true">
              <div className="academy-realm-meter-value" style={{ width: `${Math.round(realm.ratio * 100)}%` }} />
            </div>
            <div className="academy-realm-foot">
              <small>Unlocked {realm.unlocked}/{realm.lessons.length}</small>
              <small className={`academy-realm-boss ${realm.bossCleared ? "cleared" : ""}`}>
                Boss {realm.bossCleared ? "Cleared" : "Pending"}
              </small>
            </div>
          </article>
        ))}
      </section>

      <section className="academy-cinematic" aria-label="Active realm cinematic preview">
        <div className="academy-cinematic-stage">
          <img
            className="academy-cinematic-poster"
            src={activeRealmMedia.poster}
            alt={`${highlightedRealm?.title ?? "Sip Academy"} cinematic poster`}
            loading="lazy"
            decoding="async"
          />
          <img className="academy-cinematic-guide academy-cinematic-sippy" src={activeRealmMedia.sippy} alt="" loading="lazy" decoding="async" />
          <img className="academy-cinematic-guide academy-cinematic-roma" src={activeRealmMedia.roma} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="academy-cinematic-meta">
          <p className="academy-campaign-kicker">Realm Cinematic</p>
          <h3>{highlightedRealm?.title ?? "Sip Academy Realm"}</h3>
          <p>{activeRealmMedia.cue}</p>
          <div className="academy-cinematic-tags">
            <span>{activeRealmMedia.trailer}</span>
            <span>Image prompt deck ready</span>
            <span>Sora prompt deck ready</span>
          </div>
        </div>
      </section>

      <section className="academy-mentors" aria-label="Sippy and Roma lesson guidance">
        <article className={`academy-mentor-card ${guideState.speaker === "sippy" ? "active" : ""}`}>
          <div className="academy-mentor-portrait-wrap">
            <img className="academy-mentor-portrait" src={sippyImage} alt="Sippy, beverage educator" loading="lazy" decoding="async" />
          </div>
          <div className="academy-mentor-meta">
            <strong>{MENTORS.sippy.name}</strong>
            <span>{MENTORS.sippy.title}</span>
          </div>
        </article>
        <article className={`academy-mentor-card ${guideState.speaker === "roma" ? "active" : ""}`}>
          <div className="academy-mentor-portrait-wrap">
            <img className="academy-mentor-portrait" src={romaImage} alt="Roma, beverage educator" loading="lazy" decoding="async" />
          </div>
          <div className="academy-mentor-meta">
            <strong>{MENTORS.roma.name}</strong>
            <span>{MENTORS.roma.title}</span>
          </div>
        </article>
        <div className={`academy-mentor-dialog mood-${guideState.mood}`}>
          <p className="academy-mentor-speaker">
            {activeMentor.name} guiding now - backup by {secondaryMentor.name}
          </p>
          <p>{guideState.line}</p>
        </div>
      </section>

      <div className="academy-game-layout">
        <aside className="academy-path">
          <h3>Campaign Path</h3>
          <p>
            {completedCount}/{LESSONS.length} missions cleared - Active realm: {highlightedRealm?.title ?? "Crystal Atrium"}
          </p>
          <div className="academy-path-track" aria-hidden="true">
            <div className="academy-path-track-value" style={{ width: `${Math.round(completionRatio * 100)}%` }} />
          </div>
          <div className="academy-quest-log">
            <p className="academy-quest-kicker">Quest Log</p>
            <strong>{nextLesson.title}</strong>
            <small>
              {nextLesson.realm} - {missionLabel(nextLesson.mission)} - Mentor {MENTORS[nextLesson.mentor].name}
            </small>
          </div>
          <div className="academy-path-list">
            {LESSONS.map((lesson) => {
              const lessonProgress = progress.lessons[lesson.id];
              const unlocked = lessonProgress?.unlocked ?? false;
              const mastery = lessonProgress?.mastery ?? 0;
              const bestAccuracy = lessonProgress?.bestAccuracy ?? 0;
              const isActive = activeLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={`academy-node ${unlocked ? "unlocked" : "locked"} ${isActive ? "active" : ""}`}
                  data-unlocked-flash={flashUnlockedLessonId === lesson.id ? "1" : "0"}
                  onClick={() => startLesson(lesson.id)}
                  disabled={!unlocked}
                >
                  <div className="academy-node-top">
                    <span className="academy-node-unit">Unit {lesson.unit}</span>
                    <span className={`academy-mission academy-mission-${missionClass(lesson.mission)}`}>{missionLabel(lesson.mission)}</span>
                  </div>
                  <div className="academy-node-top">
                    <span className={`academy-tag academy-tag-${tagClass(lesson.tag)}`}>{lesson.tag}</span>
                    <span className="academy-node-difficulty">Difficulty {lesson.difficulty}/5</span>
                  </div>
                  <div className="academy-node-art">
                    <img src={lessonPortrait(lesson)} alt="" loading="lazy" decoding="async" />
                    <small>Mentor {MENTORS[lesson.mentor].name}</small>
                  </div>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.subtitle}</small>
                  <div className="academy-node-foot">
                    <small>Mastery {"#".repeat(mastery).padEnd(MAX_MASTERY, "-")}</small>
                    <small>Best {Math.round(bestAccuracy * 100)}%</small>
                  </div>
                  {!unlocked ? <small className="academy-locked-label">Locked</small> : null}
                </button>
              );
            })}
          </div>
        </aside>

        <article className="academy-session">
          {activeLesson && activeExercise ? (
            <>
              <div className="academy-session-head">
                <p className="academy-round-kicker">
                  {activeLesson.realm} - {missionLabel(activeLesson.mission)} Mission
                </p>
                <h3>{activeLesson.title}</h3>
                <div className="academy-session-metrics">
                  <span className="academy-session-chip">Question {exerciseIndex + 1}/{activeLesson.exercises.length}</span>
                  <span className="academy-session-chip">Combo {combo}</span>
                  <span className="academy-session-chip">Mentor {MENTORS[activeLesson.mentor].name}</span>
                  <span className="academy-session-chip">Difficulty {activeLesson.difficulty}/5</span>
                  <span className={`academy-session-chip academy-session-chip-hearts${lowHearts ? " is-danger" : ""}`}>
                    Hearts {hearts}
                  </span>
                </div>
              </div>
              <div className="academy-progress-track" aria-hidden="true">
                <div className="academy-progress-value" style={{ width: `${Math.round(sessionProgress * 100)}%` }} />
              </div>
              <div className={`academy-exercise-card academy-exercise-${activeExercise.kind}`}>
                <h4>{activeExercise.prompt}</h4>
                {activeExercise.kind === "choice" ? (
                  <div className="academy-choice-grid">
                    {activeExercise.options.map((option, index) => (
                      <button
                        key={`${activeExercise.id}-${option}`}
                        type="button"
                        className={`academy-choice ${choiceSelection === index ? "selected" : ""}`}
                        onClick={() => setChoiceSelection(index)}
                        disabled={Boolean(feedback)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="academy-order-builder">
                    <div className="academy-order-selected">
                      {orderSelection.length === 0 ? <span>Select steps in order.</span> : null}
                      {orderSelection.map((value, index) => (
                        <button
                          key={`${value}-${index}`}
                          type="button"
                          disabled={Boolean(feedback)}
                          onClick={() => setOrderSelection((current) => current.filter((_, i) => i !== index))}
                        >
                          {index + 1}. {value}
                        </button>
                      ))}
                    </div>
                    <div className="academy-order-pool">
                      {orderPool.map((value) => {
                        const used = orderSelection.filter((item) => item === value).length;
                        const allowed = activeExercise.options.filter((item) => item === value).length;
                        const disabled = Boolean(feedback) || used >= allowed;
                        return (
                          <button
                            key={`${activeExercise.id}-pool-${value}`}
                            type="button"
                            disabled={disabled}
                            onClick={() => setOrderSelection((current) => (disabled ? current : [...current, value]))}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {feedback ? (
                <div className={`academy-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                  <strong>{feedback.correct ? "Correct" : "Keep going"}</strong>
                  <p>{feedback.note}</p>
                  <button type="button" className="btn btn-primary" onClick={continueExercise}>
                    {feedback.heartsAfter <= 0 || exerciseIndex + 1 >= activeLesson.exercises.length ? "Finish Lesson" : "Continue"}
                  </button>
                </div>
              ) : (
                <div className="academy-actions">
                  <button type="button" className="btn btn-primary" onClick={checkAnswer} disabled={!canCheck}>Check</button>
                  <button type="button" className="btn btn-light" onClick={() => setActiveLessonId(null)}>Exit</button>
                </div>
              )}
            </>
          ) : summary ? (
            <div className="academy-summary">
              <h3>{summary.lessonTitle}</h3>
              <p>{summary.passed ? "Lesson cleared and next node unlocked." : "Lesson not cleared yet. Practice again."}</p>
              <div className="academy-summary-grid">
                <span>Rank {summaryRank(summary.accuracy, summary.passed)}</span>
                <span>Score {summary.correct}/{summary.total}</span>
                <span>Accuracy {Math.round(summary.accuracy * 100)}%</span>
                <span>XP +{summary.xp}</span>
                <span>Best Combo {summary.bestCombo}</span>
                <span>Hearts Left {summary.heartsLeft}</span>
              </div>
              <div className="academy-actions">
                <button type="button" className="btn btn-primary" onClick={() => startLesson(summary.lessonId)}>Practice Again</button>
                <button type="button" className="btn btn-light" onClick={() => setSummary(null)}>Back to Path</button>
              </div>
            </div>
          ) : (
            <div className="academy-idle">
              <h3>Launch Your Next Mission</h3>
              <p>Pick an unlocked node from the campaign path. Pass at 70% accuracy before hearts run out.</p>
              <ul>
                <li>20 lessons across 5 realms with Scout, Challenge, and Boss missions.</li>
                <li>Sippy and Roma adapt guidance style in classic, tactical, or story voice.</li>
                <li>Stack combo bonuses, preserve hearts, and clear bosses to complete each realm.</li>
              </ul>
              <div className="academy-idle-next">
                <p className="academy-quest-kicker">Recommended Next Mission</p>
                <strong>
                  Unit {nextLesson.unit}: {nextLesson.title}
                </strong>
                <small>
                  {nextLesson.realm} - {missionLabel(nextLesson.mission)} - Mentor {MENTORS[nextLesson.mentor].name}
                </small>
              </div>
            </div>
          )}
        </article>
      </div>
      {unlockCeremony ? (
        <div className="academy-unlock-overlay" role="status" aria-live="polite" onClick={() => setUnlockCeremony(null)}>
          <div className="academy-unlock-card" onClick={(event) => event.stopPropagation()}>
            <p className="academy-unlock-kicker">Lesson Unlocked</p>
            <h3>
              Unit {unlockCeremony.unit}: {unlockCeremony.title}
            </h3>
            <p>Your next luxury lesson is ready. Sippy and Roma are waiting at the next node.</p>
            <div className="academy-unlock-mentors" aria-hidden="true">
              <img src={sippyCelebrate} alt="" loading="lazy" decoding="async" />
              <img src={romaCelebrate} alt="" loading="lazy" decoding="async" />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => setUnlockCeremony(null)}>
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

