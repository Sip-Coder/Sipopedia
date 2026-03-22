import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { useAuth } from "../context/AuthContext";
import tartanPattern from "../assets/brand/tartan-pattern.png";
import {
  createTastingNote,
  deleteTastingNote,
  listTastingNotes,
  updateTastingNote,
  type TastingNoteRecord,
  type TastingNoteUpsertInput
} from "../lib/tastingJournal";

type BeverageType = "white_wine" | "red_wine" | "beer" | "spirits" | "coffee" | "tea" | "other" | "food";
type TabId = "make" | "review" | "analyze" | "map";
type FieldType = "text" | "textarea" | "select";
type ReviewFlag = boolean | null;
type SettingsBeverage = "white_wine" | "red_wine" | "beer" | "spirits" | "coffee" | "tea" | "other" | "food";
type WheelContext = "aroma" | "flavor";

type Field = { id: string; label: string; type: FieldType; placeholder?: string; options?: string[] };
type Section = { title: string; fields: Field[] };
type Schema = { label: string; primaryFields: Field[]; sections: Section[] };

type Note = {
  id: string;
  createdAt: string;
  updatedAt: string;
  tastingDate: string;
  location: string;
  beverageType: BeverageType;
  isBlind: boolean;
  labelImageUrl: string;
  backLabelImageUrl: string;
  actualWineName: string;
  actualGrape: string;
  actualCountry: string;
  actualRegion: string;
  actualVintage: string;
  actualProducer: string;
  actualPrice: string;
  actualAlcohol: string;
  actualSoilType: string;
  actualAppellation: string;
  blindGuessGrape: string;
  blindGuessCountry: string;
  blindGuessRegion: string;
  blindGuessVintage: string;
  blindGuessAlcohol: string;
  blindGuessSoilType: string;
  blindGuessAppellation: string;
  blindGuessProducer: string;
  blindGuessConfidence: number;
  grapeCorrect: ReviewFlag;
  countryCorrect: ReviewFlag;
  regionCorrect: ReviewFlag;
  vintageCorrect: ReviewFlag;
  additionalImageUrls: string[];
  flavorSelections: string[];
  flavorSubSelections: string[];
  flavorTasteSelections: string[];
  flavorTasteSubSelections: string[];
  details: Record<string, string>;
};

type MapCountryPath = { id: string; name: string; path: string };
type Accuracy = { correct: number; total: number };

const SCHEMAS: Record<BeverageType, Schema> = {
  red_wine: {
    label: "Red Wine",
    primaryFields: [
      { id: "actualGrape", label: "Grape", type: "text", placeholder: "e.g., Cabernet Sauvignon" },
      { id: "actualCountry", label: "Country", type: "text", placeholder: "e.g., France" },
      { id: "actualRegion", label: "Region", type: "text", placeholder: "e.g., Bordeaux" },
      { id: "actualVintage", label: "Vintage", type: "text", placeholder: "e.g., 2018" }
    ],
    sections: [
      {
        title: "Appearance & Nose",
        fields: [
          { id: "sightClarity", label: "Clarity", type: "select", options: ["Clear", "Hazy", "Cloudy"] },
          { id: "sightIntensity", label: "Intensity", type: "select", options: ["Pale", "Medium", "Deep"] },
          { id: "sightStaining", label: "Staining", type: "select", options: ["Low", "Med-", "Medium", "Med+", "High"] },
          { id: "sightColor", label: "Color", type: "select", options: ["Purple", "Ruby", "Garnet", "Tawny", "Brown"] },
          { id: "noseIntensity", label: "Nose Intensity", type: "select", options: ["Light", "Med-", "Medium", "Med+", "Pronounced"] },
          {
            id: "noseFault",
            label: "Faults",
            type: "select",
            options: ["2,4,6-TCA", "Oxidation", "Reduction (SO2)", "Volatile Acidity (VA)", "Brett", "Heat Damage"]
          },
          { id: "noseFruitFamily", label: "Fruit Family", type: "select", options: ["Red Fruit", "Black Fruit", "Blue Fruit", "Dried Fruit"] },
          { id: "nosePrimaryAromas", label: "Primary Aromas", type: "textarea" }
        ]
      },
      {
        title: "Structure & Conclusion",
        fields: [
          { id: "palateSweetness", label: "Sweetness", type: "select", options: ["Dry", "Off-Dry", "Medium", "Sweet"] },
          { id: "palateAcidity", label: "Acidity", type: "select", options: ["Low", "Med-", "Medium", "Med+", "High"] },
          { id: "palateTannin", label: "Tannin", type: "select", options: ["Low", "Med-", "Medium", "Med+", "High"] },
          { id: "palateAlcohol", label: "Alcohol", type: "select", options: ["Low", "Med-", "Medium", "Med+", "High"] },
          { id: "palateBody", label: "Body", type: "select", options: ["Light", "Med-", "Medium", "Med+", "Full"] },
          { id: "oakTreatment", label: "Oak Treatment", type: "select", options: ["New Oak", "Old Oak", "Neutral", "Stainless Steel"] },
          { id: "conclusionQuality", label: "Quality", type: "select", options: ["Poor", "Acceptable", "Good", "Very Good", "Outstanding"] }
        ]
      }
    ]
  },
  white_wine: {
    label: "White Wine",
    primaryFields: [
      { id: "actualGrape", label: "Grape", type: "text", placeholder: "e.g., Chardonnay, Riesling" },
      { id: "actualCountry", label: "Country", type: "text", placeholder: "e.g., France" },
      { id: "actualRegion", label: "Region", type: "text", placeholder: "e.g., Mosel" },
      { id: "actualVintage", label: "Vintage", type: "text", placeholder: "e.g., 2021" }
    ],
    sections: [
      {
        title: "Appearance & Nose",
        fields: [
          { id: "sightClarity", label: "Clarity", type: "select", options: ["Clear", "Hazy", "Cloudy"] },
          { id: "sightIntensity", label: "Intensity", type: "select", options: ["Pale", "Medium", "Deep"] },
          { id: "sightColor", label: "Color", type: "select", options: ["Green Lemon", "Lemon", "Gold", "Amber", "Brown"] },
          { id: "evidenceOfGas", label: "Evidence of Gas", type: "select", options: ["None", "Low", "Medium", "High"] },
          { id: "noseIntensity", label: "Nose Intensity", type: "select", options: ["Light", "Med-", "Medium", "Med+", "Pronounced"] },
          {
            id: "noseFault",
            label: "Faults",
            type: "select",
            options: ["2,4,6-TCA", "Oxidation", "Reduction (SO2)", "Volatile Acidity (VA)", "Brett", "Heat Damage"]
          },
          { id: "noseFruitFamily", label: "Fruit Family", type: "select", options: ["Apple / Pear", "Citrus", "Stone Fruit", "Tropical Fruit"] },
          { id: "nosePrimaryAromas", label: "Primary Aromas", type: "textarea" }
        ]
      },
      {
        title: "Structure & Conclusion",
        fields: [
          { id: "palateSweetness", label: "Sweetness", type: "select", options: ["Dry", "Off-Dry", "Medium", "Sweet"] },
          { id: "palateAcidity", label: "Acidity", type: "select", options: ["Low", "Med-", "Medium", "Med+", "High"] },
          { id: "palatePhenolic", label: "Phenolic Bitterness", type: "select", options: ["Low", "Med-", "Medium", "Med+", "High"] },
          { id: "palateAlcohol", label: "Alcohol", type: "select", options: ["Low", "Med-", "Medium", "Med+", "High"] },
          { id: "palateBody", label: "Body", type: "select", options: ["Light", "Med-", "Medium", "Med+", "Full"] },
          { id: "oakTreatment", label: "Oak Treatment", type: "select", options: ["New Oak", "Old Oak", "Neutral", "Stainless Steel"] },
          { id: "conclusionQuality", label: "Quality", type: "select", options: ["Poor", "Acceptable", "Good", "Very Good", "Outstanding"] }
        ]
      }
    ]
  },
  beer: {
    label: "Beer",
    primaryFields: [
      { id: "style", label: "Style", type: "text", placeholder: "e.g., IPA, Stout" },
      { id: "country", label: "Country", type: "text" },
      { id: "brewery", label: "Brewery", type: "text" },
      { id: "abv", label: "ABV %", type: "text" }
    ],
    sections: [
      { title: "Appearance", fields: [{ id: "color", label: "Color", type: "text" }, { id: "clarity", label: "Clarity", type: "text" }, { id: "head", label: "Head/Foam", type: "text" }] },
      { title: "Aroma & Flavor", fields: [{ id: "aroma", label: "Aroma", type: "textarea" }, { id: "flavor", label: "Flavor", type: "textarea" }, { id: "mouthfeel", label: "Mouthfeel", type: "text" }] },
      { title: "Overall", fields: [{ id: "conclusionNotes", label: "Notes", type: "textarea" }] }
    ]
  },
  spirits: {
    label: "Spirits",
    primaryFields: [
      { id: "category", label: "Category", type: "text", placeholder: "e.g., Whiskey, Gin" },
      { id: "age", label: "Age", type: "text" },
      { id: "abv", label: "ABV %", type: "text" },
      { id: "origin", label: "Origin", type: "text" }
    ],
    sections: [
      { title: "Assessment", fields: [{ id: "appearance", label: "Appearance", type: "text" }, { id: "nose", label: "Nose", type: "textarea" }, { id: "palate", label: "Palate", type: "textarea" }, { id: "finish", label: "Finish", type: "text" }] },
      { title: "Overall", fields: [{ id: "conclusionNotes", label: "Notes", type: "textarea" }] }
    ]
  },
  coffee: {
    label: "Coffee",
    primaryFields: [{ id: "origin", label: "Origin", type: "text" }, { id: "region", label: "Region", type: "text" }, { id: "process", label: "Process", type: "text", placeholder: "e.g., Washed, Natural" }, { id: "roastLevel", label: "Roast Level", type: "text" }],
    sections: [
      { title: "Sensory", fields: [{ id: "fragrance", label: "Fragrance/Aroma", type: "textarea" }, { id: "flavor", label: "Flavor", type: "textarea" }, { id: "aftertaste", label: "Aftertaste", type: "text" }] },
      { title: "Structure", fields: [{ id: "acidity", label: "Acidity", type: "text" }, { id: "body", label: "Body", type: "text" }, { id: "balance", label: "Balance", type: "text" }] }
    ]
  },
  tea: {
    label: "Tea",
    primaryFields: [{ id: "teaType", label: "Type", type: "text", placeholder: "e.g., Green, Oolong" }, { id: "origin", label: "Origin", type: "text" }, { id: "region", label: "Region", type: "text" }, { id: "harvest", label: "Harvest", type: "text" }],
    sections: [
      { title: "Leaf & Liquor", fields: [{ id: "dryLeaf", label: "Dry Leaf", type: "text" }, { id: "liquorColor", label: "Liquor Color", type: "text" }] },
      { title: "Palate", fields: [{ id: "aroma", label: "Aroma", type: "textarea" }, { id: "flavor", label: "Flavor", type: "textarea" }, { id: "mouthfeel", label: "Mouthfeel/Texture", type: "text" }, { id: "finish", label: "Finish", type: "text" }] }
    ]
  },
  other: {
    label: "Other Bev",
    primaryFields: [{ id: "categoryName", label: "Category", type: "text" }, { id: "origin", label: "Origin", type: "text" }],
    sections: [{ title: "Notes", fields: [{ id: "aroma", label: "Aroma", type: "textarea" }, { id: "flavor", label: "Flavor", type: "textarea" }, { id: "texture", label: "Texture/Mouthfeel", type: "text" }, { id: "conclusionNotes", label: "Notes", type: "textarea" }] }]
  },
  food: {
    label: "Food",
    primaryFields: [
      { id: "dishName", label: "Dish", type: "text", placeholder: "e.g., Grilled salmon" },
      { id: "cuisine", label: "Cuisine", type: "text", placeholder: "e.g., Mediterranean" },
      { id: "origin", label: "Origin", type: "text" },
      { id: "serviceTemp", label: "Service Temperature", type: "text", placeholder: "e.g., Warm" }
    ],
    sections: [
      {
        title: "Appearance & Aroma",
        fields: [
          { id: "appearance", label: "Appearance", type: "textarea" },
          { id: "aroma", label: "Aroma", type: "textarea" },
          { id: "intensity", label: "Intensity", type: "select", options: ["Low", "Medium", "High"] }
        ]
      },
      {
        title: "Palate & Pairing",
        fields: [
          { id: "texture", label: "Texture", type: "text" },
          { id: "sweetSaltAcid", label: "Sweet/Salt/Acid Balance", type: "textarea" },
          { id: "finish", label: "Finish", type: "text" },
          { id: "pairingNotes", label: "Pairing Notes", type: "textarea" }
        ]
      }
    ]
  }
};

const SETTINGS_BEVERAGE_OPTIONS: Array<{ id: SettingsBeverage; label: string; type: BeverageType }> = [
  { id: "white_wine", label: "White Wine", type: "white_wine" },
  { id: "red_wine", label: "Red Wine", type: "red_wine" },
  { id: "beer", label: "Beer", type: "beer" },
  { id: "spirits", label: "Spirits", type: "spirits" },
  { id: "coffee", label: "Coffee", type: "coffee" },
  { id: "tea", label: "Tea", type: "tea" },
  { id: "other", label: "Other Bev", type: "other" },
  { id: "food", label: "Food", type: "food" }
];
const PHOTO_ACCEPT = ".jpg,.jpeg,.png,.webp,.heic,.heif,.tif,.tiff,image/*";

const COUNTRY_ALIAS: Record<string, string> = {
  USA: "United States of America",
  "United States": "United States of America",
  UK: "United Kingdom",
  England: "United Kingdom",
  Scotland: "United Kingdom",
  Russia: "Russian Federation",
  "South Korea": "Republic of Korea",
  "North Korea": "Democratic People's Republic of Korea",
  Korea: "Republic of Korea",
  "Czech Republic": "Czechia",
  Holland: "Netherlands",
  "The Netherlands": "Netherlands"
};

const COUNTRY_DISPLAY: Record<string, string> = {
  "United States of America": "United States",
  "Russian Federation": "Russia",
  "United Kingdom": "UK"
};

const nowIso = () => new Date().toISOString();
const todayDate = () => nowIso().slice(0, 10);
const asText = (value: unknown) => (typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? String(value) : "");
const asNum = (value: unknown, fallback = 0) => (typeof value === "number" && Number.isFinite(value) ? value : typeof value === "string" && Number.isFinite(Number(value)) ? Number(value) : fallback);
const asBool = (value: unknown, fallback = false) => (typeof value === "boolean" ? value : typeof value === "string" ? value.toLowerCase() === "true" : fallback);
const asFlag = (value: unknown): ReviewFlag => (typeof value === "boolean" ? value : value === null ? null : null);
const confLabel = (value: number) => (value >= 75 ? "High" : value >= 45 ? "Medium" : value > 0 ? "Low" : "");
const confNum = (label: string) => (label === "High" ? 90 : label === "Medium" ? 60 : label === "Low" ? 30 : 50);
const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
const fmtDate = (value: string) => (Number.isNaN(new Date(value).getTime()) ? value : new Date(value).toLocaleDateString());
const normalizeCountry = (name: string) => COUNTRY_ALIAS[name.trim()] ?? name.trim();
const displayCountry = (name: string) => COUNTRY_DISPLAY[name] ?? name;
const asType = (value: string): BeverageType => {
  if (value === "wine") return "red_wine";
  if (value === "food") return "food";
  return value in SCHEMAS ? (value as BeverageType) : "red_wine";
};
const settingsType = (value: BeverageType): SettingsBeverage => {
  if (value === "red_wine") return "red_wine";
  if (value === "white_wine") return "white_wine";
  if (value === "food") return "food";
  if (value === "other") return "other";
  return value;
};
const persistedType = (value: BeverageType): string => {
  if (value === "red_wine" || value === "white_wine") return "wine";
  if (value === "food") return "other";
  return value;
};
const isWineType = (type: BeverageType) => type === "red_wine" || type === "white_wine";
const LOCAL_TASTING_NOTES_KEY = "sipstudies:flavors:guest-notes:v1";
const asImageList = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asText(item)).filter((item) => item.length > 0);
};

function toDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error(`Could not read image: ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

type FlavorWheelCategory = {
  id: string;
  label: string;
  stage: "primary" | "secondary" | "tertiary";
  descriptors: string[];
  subcategories: Record<string, string[]>;
};

const FLAVOR_SUB_DIVIDER = "::";

function flavorSubKey(flavor: string, subcategory: string) {
  return `${flavor}${FLAVOR_SUB_DIVIDER}${subcategory}`;
}

function parseFlavorSubKey(value: string) {
  const [flavor, ...rest] = value.split(FLAVOR_SUB_DIVIDER);
  return { flavor: flavor || "", subcategory: rest.join(FLAVOR_SUB_DIVIDER) };
}

function buildWheelCategory(
  id: string,
  label: string,
  descriptors: string[],
  defaults: string[],
  stage: "primary" | "secondary" | "tertiary" = "primary",
  overrides?: Record<string, string[]>
): FlavorWheelCategory {
  const subcategories: Record<string, string[]> = {};
  for (const descriptor of descriptors) {
    subcategories[descriptor] = overrides?.[descriptor] ?? defaults;
  }
  return { id, label, stage, descriptors, subcategories };
}

const WHITE_WINE_WHEEL: FlavorWheelCategory[] = [
  buildWheelCategory("apple_pear", "Apple / Pear", ["Apple", "Pear", "Asian Pear", "Green Apple", "Red Apple", "Quince"], ["Fresh", "Ripe", "Baked", "Bruised"]),
  buildWheelCategory("citrus", "Citrus", ["Lemon", "Lime", "Grapefruit", "Kumquat", "Meyer Lemon", "Citron"], ["Zest", "Juice", "Candied", "Marmalade"]),
  buildWheelCategory("stone", "Stone Fruit", ["Peach", "Apricot", "Nectarine", "Plum", "Yellow Peach", "White Peach"], ["Fresh", "Ripe", "Poached", "Dried"]),
  buildWheelCategory("tropical", "Tropical Fruit", ["Pineapple", "Mango", "Passionfruit", "Papaya", "Guava", "Lychee"], ["Fresh", "Ripe", "Candied", "Dried"]),
  buildWheelCategory("floral", "Floral", ["Jasmine", "Orange Blossom", "Honeysuckle", "Lily"], ["Fresh Blossom", "Perfumed", "Dried Petal"]),
  buildWheelCategory("herbaceous", "Herbaceous", ["Grass", "Tomato Leaf", "Asparagus", "Green Bell Pepper"], ["Fresh", "Ripe", "Dried"]),
  buildWheelCategory("herbal", "Herbal", ["Eucalyptus", "Mint", "Fennel", "Dill", "Thyme", "Oregano"], ["Fresh", "Dried", "Cooked"]),
  buildWheelCategory("spice", "Spice", ["White Pepper", "Liquorice", "Cinnamon", "Anise"], ["Subtle", "Medium", "Pronounced"]),
  buildWheelCategory("ripeness", "Fruit Ripeness", ["Unripe Fruit", "Ripe Fruit", "Dried Fruit", "Cooked Fruit"], ["Low", "Medium", "High"]),
  buildWheelCategory("other", "Other", ["Wet Stones", "Candy", "Simple"], ["Low", "Medium", "High"]),
  buildWheelCategory("yeast", "Yeast", ["Biscuit", "Bread", "Pastry", "Brioche", "Bread Dough", "Acetaldehyde"], ["Light", "Medium", "Pronounced"], "secondary"),
  buildWheelCategory("mlf", "Malolactic", ["Butter", "Cheese", "Cream"], ["Subtle", "Medium", "Pronounced"], "secondary"),
  buildWheelCategory("oak", "Oak", ["Vanilla", "Cloves", "Coconut", "Cedar", "Charred Wood", "Smoke", "Chocolate", "Coffee"], ["Light", "Medium", "Pronounced"], "secondary"),
  buildWheelCategory("white_tertiary", "White Tertiary", ["Dried Apricot", "Raisin", "Orange Marmalade", "Petrol", "Cinnamon", "Ginger", "Nutmeg", "Almond", "Hazelnut", "Honey", "Caramel"], ["Subtle", "Medium", "Pronounced"], "tertiary"),
  buildWheelCategory("oxidative", "Deliberately Oxidised", ["Almond", "Hazelnut", "Walnut", "Chocolate", "Coffee", "Caramel"], ["Subtle", "Medium", "Pronounced"], "tertiary")
];

const RED_WINE_WHEEL: FlavorWheelCategory[] = [
  buildWheelCategory("red", "Red Fruit", ["Strawberry", "Cherry", "Raspberry", "Cranberry", "Red Currant", "Pomegranate"], ["Fresh", "Ripe", "Jammy", "Stewed"]),
  buildWheelCategory("black", "Black Fruit", ["Blackberry", "Black Cherry", "Cassis", "Fig", "Mulberry", "Date"], ["Fresh", "Ripe", "Compote", "Dried"]),
  buildWheelCategory("blue", "Blue Fruit", ["Blueberry", "Bilberry", "Haskap", "Elderberry", "Aronia Berry", "Plum"], ["Fresh", "Ripe", "Cooked", "Dried"]),
  buildWheelCategory("dried", "Dried Fruit", ["Raisin", "Dried Fig", "Dried Date", "Prune", "Fig Jam", "Sun-Dried Cherry"], ["Sun-dried", "Stewed", "Compote"]),
  buildWheelCategory("floral", "Floral", ["Rose", "Violet", "Lavender", "Lilac"], ["Fresh Blossom", "Perfumed", "Dried Petal"]),
  buildWheelCategory("herbaceous", "Herbaceous", ["Grass", "Tomato Leaf", "Asparagus", "Green Bell Pepper"], ["Fresh", "Ripe", "Dried"]),
  buildWheelCategory("herbal", "Herbal", ["Eucalyptus", "Mint", "Fennel", "Dill", "Thyme", "Oregano"], ["Fresh", "Dried", "Cooked"]),
  buildWheelCategory("spice", "Spice", ["Black Pepper", "White Pepper", "Liquorice", "Cinnamon"], ["Subtle", "Medium", "Pronounced"]),
  buildWheelCategory("ripeness", "Fruit Ripeness", ["Unripe Fruit", "Ripe Fruit", "Dried Fruit", "Cooked Fruit"], ["Low", "Medium", "High"]),
  buildWheelCategory("other", "Other", ["Wet Stones", "Candy", "Simple"], ["Low", "Medium", "High"]),
  buildWheelCategory("yeast", "Yeast", ["Biscuit", "Bread", "Pastry", "Brioche", "Bread Dough", "Acetaldehyde"], ["Light", "Medium", "Pronounced"], "secondary"),
  buildWheelCategory("mlf", "Malolactic", ["Butter", "Cheese", "Cream"], ["Subtle", "Medium", "Pronounced"], "secondary"),
  buildWheelCategory("oak", "Oak", ["Vanilla", "Cloves", "Coconut", "Cedar", "Charred Wood", "Smoke", "Chocolate", "Coffee"], ["Light", "Medium", "Pronounced"], "secondary"),
  buildWheelCategory("red_tertiary", "Red Tertiary", ["Prune", "Raisin", "Fig", "Cooked Plum", "Cooked Cherry", "Leather", "Earth", "Mushroom", "Meat", "Tobacco", "Wet Leaves", "Forest Floor", "Caramel"], ["Subtle", "Medium", "Pronounced"], "tertiary"),
  buildWheelCategory("oxidative", "Deliberately Oxidised", ["Almond", "Hazelnut", "Walnut", "Chocolate", "Coffee", "Caramel"], ["Subtle", "Medium", "Pronounced"], "tertiary")
];

const FLAVOR_WHEEL_BY_TYPE: Record<BeverageType, FlavorWheelCategory[]> = {
  red_wine: RED_WINE_WHEEL,
  white_wine: WHITE_WINE_WHEEL,
  beer: [
    buildWheelCategory("malt", "Malt", ["Biscuit", "Caramel", "Toffee", "Bread Crust"], ["Light", "Toasted", "Roasted"]),
    buildWheelCategory("hop", "Hop", ["Citrus Peel", "Pine", "Floral", "Herbal"], ["Low", "Medium", "High"]),
    buildWheelCategory("yeast", "Yeast", ["Banana", "Clove", "Bubblegum", "Bread Dough"], ["Subtle", "Moderate", "Pronounced"]),
    buildWheelCategory("other", "Other", ["Smoke", "Coffee", "Chocolate", "Earth"], ["Low", "Medium", "High"])
  ],
  spirits: [
    buildWheelCategory("grain", "Grain", ["Cereal", "Toasted Rice", "Rye Spice", "Malted Barley"], ["Young", "Mature", "Aged"]),
    buildWheelCategory("wood", "Wood", ["Oak", "Vanilla", "Cedar", "Smoke"], ["Light", "Medium", "Heavy"]),
    buildWheelCategory("sweet", "Sweet", ["Caramel", "Toffee", "Maple", "Honey"], ["Dry", "Balanced", "Rich"]),
    buildWheelCategory("botanical", "Botanical", ["Juniper", "Coriander", "Citrus Peel", "Angelica"], ["Fresh", "Dried", "Intense"])
  ],
  coffee: [
    buildWheelCategory("roast", "Roast", ["Espresso", "Cocoa", "Dark Chocolate", "Toasted Sugar"], ["Light Roast", "Medium Roast", "Dark Roast"]),
    buildWheelCategory("fruit", "Fruit", ["Berry", "Citrus", "Stone Fruit", "Tropical"], ["Fresh", "Ripe", "Dried"]),
    buildWheelCategory("floral", "Floral", ["Jasmine", "Rose", "Lavender", "Elderflower"], ["Delicate", "Perfumed", "Pronounced"]),
    buildWheelCategory("nut", "Nut", ["Hazelnut", "Almond", "Walnut", "Peanut Skin"], ["Raw", "Toasted", "Roasted"])
  ],
  tea: [
    buildWheelCategory("leaf", "Leaf", ["Grass", "Hay", "Nori", "Herbal"], ["Fresh", "Steamed", "Dried"]),
    buildWheelCategory("floral", "Floral", ["Jasmine", "Lily", "Rose", "Orchid"], ["Delicate", "Fragrant", "Perfumed"]),
    buildWheelCategory("fruit", "Fruit", ["Citrus", "Peach", "Apricot", "Lychee"], ["Fresh", "Ripe", "Candied"]),
    buildWheelCategory("spice", "Spice", ["Ginger", "Clove", "Cinnamon", "Cardamom"], ["Subtle", "Warm", "Bold"])
  ],
  other: [
    buildWheelCategory("fruit", "Fruit", ["Apple", "Pear", "Citrus", "Berry"], ["Fresh", "Ripe", "Cooked"]),
    buildWheelCategory("herbal", "Herbal", ["Mint", "Sage", "Thyme", "Dill"], ["Fresh", "Dried", "Cooked"]),
    buildWheelCategory("sweet", "Sweet", ["Honey", "Caramel", "Vanilla", "Maple"], ["Light", "Medium", "Rich"]),
    buildWheelCategory("savory", "Savory", ["Broth", "Mushroom", "Olive", "Seaweed"], ["Subtle", "Moderate", "Intense"])
  ],
  food: [
    buildWheelCategory("fruit", "Fruit", ["Citrus", "Stone Fruit", "Berry", "Dried Fruit"], ["Fresh", "Cooked", "Candied", "Dried"]),
    buildWheelCategory("herb", "Herb", ["Basil", "Thyme", "Rosemary", "Mint"], ["Fresh", "Dried", "Cooked"]),
    buildWheelCategory("spice", "Spice", ["Pepper", "Cinnamon", "Nutmeg", "Clove"], ["Subtle", "Warm", "Bold"]),
    buildWheelCategory("savory", "Savory", ["Umami", "Roasted", "Smoked", "Earthy"], ["Light", "Medium", "Intense"])
  ]
};

function newLocalId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const EXTRA_DETAIL_FIELDS = ["blindConclusion", "blindFinalCall", "flavorWheelFlavors"] as const;

function allFieldIds(type: BeverageType) {
  const schema = SCHEMAS[type];
  return [
    ...schema.primaryFields,
    ...schema.sections.flatMap((section) => section.fields),
    ...EXTRA_DETAIL_FIELDS.map((id) => ({ id }))
  ].map((field) => field.id);
}

function emptyDetails(type: BeverageType): Record<string, string> {
  const out: Record<string, string> = {};
  for (const id of allFieldIds(type)) out[id] = "";
  return out;
}

function createEmptyNote(type: BeverageType): Note {
  const now = nowIso();
  return {
    id: "",
    createdAt: now,
    updatedAt: now,
    tastingDate: todayDate(),
    location: "",
    beverageType: type,
    isBlind: false,
    labelImageUrl: "",
    backLabelImageUrl: "",
    actualWineName: "",
    actualGrape: "",
    actualCountry: "",
    actualRegion: "",
    actualVintage: "",
    actualProducer: "",
    actualPrice: "",
    actualAlcohol: "",
    actualSoilType: "",
    actualAppellation: "",
    blindGuessGrape: "",
    blindGuessCountry: "",
    blindGuessRegion: "",
    blindGuessVintage: "",
    blindGuessAlcohol: "",
    blindGuessSoilType: "",
    blindGuessAppellation: "",
    blindGuessProducer: "",
    blindGuessConfidence: 50,
    grapeCorrect: null,
    countryCorrect: null,
    regionCorrect: null,
    vintageCorrect: null,
    additionalImageUrls: [],
    flavorSelections: [],
    flavorSubSelections: [],
    flavorTasteSelections: [],
    flavorTasteSubSelections: [],
    details: emptyDetails(type)
  };
}

function noteFromGuest(value: unknown): Note | null {
  if (!isObject(value)) return null;
  const type = asType(asText(value.beverageType));
  const base = createEmptyNote(type);
  const details = emptyDetails(type);
  const detailsIn = isObject(value.details) ? value.details : {};
  for (const id of Object.keys(details)) details[id] = asText(detailsIn[id]);
  return {
    ...base,
    id: asText(value.id) || newLocalId(),
    createdAt: asText(value.createdAt) || nowIso(),
    updatedAt: asText(value.updatedAt) || nowIso(),
    tastingDate: asText(value.tastingDate) || todayDate(),
    location: asText(value.location),
    beverageType: type,
    isBlind: asBool(value.isBlind),
    labelImageUrl: asText(value.labelImageUrl),
    backLabelImageUrl: asText(value.backLabelImageUrl),
    actualWineName: asText(value.actualWineName),
    actualGrape: asText(value.actualGrape),
    actualCountry: asText(value.actualCountry),
    actualRegion: asText(value.actualRegion),
    actualVintage: asText(value.actualVintage),
    actualProducer: asText(value.actualProducer),
    actualPrice: asText(value.actualPrice),
    actualAlcohol: asText(value.actualAlcohol),
    actualSoilType: asText(value.actualSoilType),
    actualAppellation: asText(value.actualAppellation),
    blindGuessGrape: asText(value.blindGuessGrape),
    blindGuessCountry: asText(value.blindGuessCountry),
    blindGuessRegion: asText(value.blindGuessRegion),
    blindGuessVintage: asText(value.blindGuessVintage),
    blindGuessAlcohol: asText(value.blindGuessAlcohol),
    blindGuessSoilType: asText(value.blindGuessSoilType),
    blindGuessAppellation: asText(value.blindGuessAppellation),
    blindGuessProducer: asText(value.blindGuessProducer),
    blindGuessConfidence: asNum(value.blindGuessConfidence, 50),
    grapeCorrect: asFlag(value.grapeCorrect),
    countryCorrect: asFlag(value.countryCorrect),
    regionCorrect: asFlag(value.regionCorrect),
    vintageCorrect: asFlag(value.vintageCorrect),
    additionalImageUrls: asImageList(value.additionalImageUrls),
    flavorSelections: asImageList(value.flavorSelections),
    flavorSubSelections: asImageList(value.flavorSubSelections),
    flavorTasteSelections: asImageList(value.flavorTasteSelections),
    flavorTasteSubSelections: asImageList(value.flavorTasteSubSelections),
    details
  };
}

function loadGuestNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_TASTING_NOTES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => noteFromGuest(item)).filter((item): item is Note => item !== null);
  } catch {
    return [];
  }
}

function saveGuestNotes(notes: Note[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_TASTING_NOTES_KEY, JSON.stringify(notes));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function noteFromRecord(record: TastingNoteRecord): Note {
  const fields = isObject(record.fields_json) ? record.fields_json : {};
  const type = asType(asText(fields.beverageType) || record.beverage_type);
  const base = createEmptyNote(type);
  const detailsIn = isObject(fields.details) ? fields.details : {};
  const details = emptyDetails(type);
  for (const key of Object.keys(details)) details[key] = asText(detailsIn[key] ?? fields[key]);
  return {
    ...base,
    id: record.id,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    tastingDate: asText(fields.tastingDate) || record.created_at,
    location: asText(fields.location),
    beverageType: type,
    isBlind: asBool(fields.isBlind, record.blind_mode),
    labelImageUrl: asText(fields.labelImageUrl),
    backLabelImageUrl: asText(fields.backLabelImageUrl),
    actualWineName: asText(fields.actualWineName) || record.title,
    actualGrape: asText(fields.actualGrape),
    actualCountry: asText(fields.actualCountry) || record.country,
    actualRegion: asText(fields.actualRegion) || record.region,
    actualVintage: asText(fields.actualVintage) || record.vintage,
    actualProducer: asText(fields.actualProducer) || record.producer,
    actualPrice: asText(fields.actualPrice),
    actualAlcohol: asText(fields.actualAlcohol),
    actualSoilType: asText(fields.actualSoilType),
    actualAppellation: asText(fields.actualAppellation),
    blindGuessGrape: asText(fields.blindGuessGrape) || record.guessed_variety,
    blindGuessCountry: asText(fields.blindGuessCountry) || record.guessed_country,
    blindGuessRegion: asText(fields.blindGuessRegion) || record.guessed_region,
    blindGuessVintage: asText(fields.blindGuessVintage),
    blindGuessAlcohol: asText(fields.blindGuessAlcohol),
    blindGuessSoilType: asText(fields.blindGuessSoilType),
    blindGuessAppellation: asText(fields.blindGuessAppellation),
    blindGuessProducer: asText(fields.blindGuessProducer),
    blindGuessConfidence: asNum(fields.blindGuessConfidence, confNum(record.confidence)),
    grapeCorrect: asFlag(fields.grapeCorrect),
    countryCorrect: asFlag(fields.countryCorrect),
    regionCorrect: asFlag(fields.regionCorrect),
    vintageCorrect: asFlag(fields.vintageCorrect),
    additionalImageUrls: asImageList(fields.additionalImageUrls),
    flavorSelections: asImageList(fields.flavorSelections),
    flavorSubSelections: asImageList(fields.flavorSubSelections),
    flavorTasteSelections: asImageList(fields.flavorTasteSelections),
    flavorTasteSubSelections: asImageList(fields.flavorTasteSubSelections),
    details
  };
}

function countFlags(note: Note) {
  const flags = [note.grapeCorrect, note.countryCorrect, note.regionCorrect, note.vintageCorrect];
  return { total: flags.filter((flag) => flag !== null).length, correct: flags.filter((flag) => flag === true).length };
}

function noteScore(note: Note): number | null {
  const flags = countFlags(note);
  return flags.total > 0 ? Math.round((flags.correct / flags.total) * 100) : null;
}

function toUpsert(note: Note): TastingNoteUpsertInput {
  const details: Record<string, string> = {};
  for (const [key, value] of Object.entries(note.details)) details[key] = value.trim();
  return {
    beverage_type: persistedType(note.beverageType),
    title: (note.actualWineName.trim() || details.categoryName || `${SCHEMAS[note.beverageType].label} tasting`).slice(0, 180),
    producer: note.actualProducer.trim(),
    country: note.actualCountry.trim(),
    region: note.actualRegion.trim(),
    vintage: note.actualVintage.trim(),
    blind_mode: note.isBlind,
    guessed_country: note.blindGuessCountry.trim(),
    guessed_region: note.blindGuessRegion.trim(),
    guessed_variety: note.blindGuessGrape.trim(),
    confidence: note.isBlind ? confLabel(note.blindGuessConfidence) : "",
    score: noteScore(note),
    latitude: null,
    longitude: null,
    summary: [note.actualWineName || details.categoryName, note.actualCountry, note.actualRegion, details.conclusionNotes].filter(Boolean).join(" | ").slice(0, 600),
    fields_json: {
      version: 2,
      tastingDate: note.tastingDate,
      location: note.location.trim(),
      isBlind: note.isBlind,
      beverageType: note.beverageType,
      labelImageUrl: note.labelImageUrl.trim(),
      backLabelImageUrl: note.backLabelImageUrl.trim(),
      additionalImageUrls: note.additionalImageUrls,
      flavorSelections: note.flavorSelections,
      flavorSubSelections: note.flavorSubSelections,
      flavorTasteSelections: note.flavorTasteSelections,
      flavorTasteSubSelections: note.flavorTasteSubSelections,
      actualWineName: note.actualWineName.trim(),
      actualGrape: note.actualGrape.trim(),
      actualCountry: note.actualCountry.trim(),
      actualRegion: note.actualRegion.trim(),
      actualVintage: note.actualVintage.trim(),
      actualProducer: note.actualProducer.trim(),
      actualPrice: note.actualPrice.trim(),
      actualAlcohol: note.actualAlcohol.trim(),
      actualSoilType: note.actualSoilType.trim(),
      actualAppellation: note.actualAppellation.trim(),
      blindGuessGrape: note.blindGuessGrape.trim(),
      blindGuessCountry: note.blindGuessCountry.trim(),
      blindGuessRegion: note.blindGuessRegion.trim(),
      blindGuessVintage: note.blindGuessVintage.trim(),
      blindGuessAlcohol: note.blindGuessAlcohol.trim(),
      blindGuessSoilType: note.blindGuessSoilType.trim(),
      blindGuessAppellation: note.blindGuessAppellation.trim(),
      blindGuessProducer: note.blindGuessProducer.trim(),
      blindGuessConfidence: Math.round(note.blindGuessConfidence),
      grapeCorrect: note.grapeCorrect,
      countryCorrect: note.countryCorrect,
      regionCorrect: note.regionCorrect,
      vintageCorrect: note.vintageCorrect,
      details
    }
  };
}

function decodeArc(arc: number[][], transform?: { scale: [number, number]; translate: [number, number] }) {
  let x = 0;
  let y = 0;
  const out: number[][] = [];
  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    out.push(transform ? [x * transform.scale[0] + transform.translate[0], y * transform.scale[1] + transform.translate[1]] : [x, y]);
  }
  return out;
}

function stitchArcRefs(refs: number[], arcs: number[][][]) {
  const out: number[][] = [];
  for (const ref of refs) {
    const source = arcs[ref < 0 ? ~ref : ref] ?? [];
    const piece = ref < 0 ? [...source].reverse() : source;
    for (let index = 0; index < piece.length; index++) if (out.length === 0 || index > 0) out.push(piece[index]);
  }
  return out;
}

function toPath(points: number[][], width: number, height: number) {
  if (points.length === 0) return "";
  const projected = points.map(([lon, lat]) => [((lon + 180) / 360) * width, ((90 - lat) / 180) * height]);
  let path = `M${projected[0][0].toFixed(2)},${projected[0][1].toFixed(2)}`;
  for (let i = 1; i < projected.length; i++) path += Math.abs(points[i][0] - points[i - 1][0]) > 100 ? `M${projected[i][0].toFixed(2)},${projected[i][1].toFixed(2)}` : `L${projected[i][0].toFixed(2)},${projected[i][1].toFixed(2)}`;
  return `${path}Z`;
}

function topoToPaths(data: Record<string, unknown>, width = 800, height = 400): MapCountryPath[] {
  if (!Array.isArray(data.arcs) || !isObject(data.objects)) return [];
  const objects = data.objects as Record<string, unknown>;
  const objectNames = Object.keys(objects);
  if (objectNames.length === 0) return [];
  const score = (name: string) => (name.toLowerCase().includes("countries") ? 3 : 0) + (name.toLowerCase().includes("admin_0") || name.toLowerCase().includes("admin0") ? 2 : 0) + (name.toLowerCase().includes("admin") ? 2 : 0) + (name.toLowerCase().includes("ne_") ? 1 : 0);
  const bestName = objectNames.reduce((best, next) => (score(next) > score(best) ? next : best));
  const selected = objects[bestName];
  if (!isObject(selected) || !Array.isArray(selected.geometries)) return [];
  const decoded = (data.arcs as number[][][]).map((arc) => decodeArc(arc, isObject(data.transform) ? (data.transform as { scale: [number, number]; translate: [number, number] }) : undefined));
  const out: MapCountryPath[] = [];
  for (const geometry of selected.geometries as Array<Record<string, unknown>>) {
    const name = isObject(geometry.properties) ? asText(geometry.properties.name) || "Unknown" : "Unknown";
    const id = asText(geometry.id) || name;
    let path = "";
    if (geometry.type === "Polygon" && Array.isArray(geometry.arcs)) for (const refs of geometry.arcs as number[][]) path += toPath(stitchArcRefs(refs, decoded), width, height);
    if (geometry.type === "MultiPolygon" && Array.isArray(geometry.arcs)) for (const polygon of geometry.arcs as number[][][]) for (const refs of polygon) path += toPath(stitchArcRefs(refs, decoded), width, height);
    if (path) out.push({ id, name, path });
  }
  return out;
}

function sumAccuracy(map: Record<string, Accuracy>): Accuracy {
  return Object.values(map).reduce((acc, item) => ({ correct: acc.correct + item.correct, total: acc.total + item.total }), { correct: 0, total: 0 });
}

function pct(item: Accuracy) {
  return item.total ? `${Math.round((item.correct / item.total) * 100)}%` : "0%";
}

function recommendations(total: number, grape: Accuracy, country: Accuracy, region: Accuracy, vintage: Accuracy) {
  if (total < 4) return ["Record more tastings to get personalized recommendations.", "Compare wines side-by-side to reinforce your identification skills.", "Explore new varieties and regions to broaden your palate."];
  const dims = [{ label: "grape", v: grape.total ? grape.correct / grape.total : 1 }, { label: "country", v: country.total ? country.correct / country.total : 1 }, { label: "region", v: region.total ? region.correct / region.total : 1 }, { label: "vintage", v: vintage.total ? vintage.correct / vintage.total : 1 }].sort((a, b) => a.v - b.v);
  return [`Focus blind study on ${dims[0].label} identification in your next tasting block.`, `Run side-by-side comparisons for ${dims[1].label} calibration and memory retention.`, "Explore new styles and regions to broaden your tasting pattern library."];
}

export function Flavors() {
  const { user, isConfigured } = useAuth();
  const [tab, setTab] = useState<TabId>("make");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [draft, setDraft] = useState<Note>(() => createEmptyNote("red_wine"));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [revealActual, setRevealActual] = useState(true);
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mapPaths, setMapPaths] = useState<MapCountryPath[]>([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapCountry, setMapCountry] = useState<string | null>(null);
  const [mapHover, setMapHover] = useState<string | null>(null);
  const [mapSearch, setMapSearch] = useState("");
  const [countdownEnabled, setCountdownEnabled] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [countdownRemaining, setCountdownRemaining] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const [metronomeRunning, setMetronomeRunning] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [metronomeAudio, setMetronomeAudio] = useState(true);
  const [metronomeHaptic, setMetronomeHaptic] = useState(false);
  const [metronomeProgression, setMetronomeProgression] = useState(false);
  const [aromaStage, setAromaStage] = useState<"primary" | "secondary" | "tertiary">("primary");
  const [flavorStage, setFlavorStage] = useState<"primary" | "secondary" | "tertiary">("primary");
  const [aromaWheelCategory, setAromaWheelCategory] = useState<string>("fruit");
  const [flavorWheelCategory, setFlavorWheelCategory] = useState<string>("fruit");
  const [dragTarget, setDragTarget] = useState<"front" | "back" | "additional" | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);
  const additionalInputRef = useRef<HTMLInputElement | null>(null);

  const useCloudStorage = isConfigured && Boolean(user);
  const schema = SCHEMAS[draft.beverageType];
  const allWheelCategories = FLAVOR_WHEEL_BY_TYPE[draft.beverageType];
  const aromaWheelCategories = isWineType(draft.beverageType)
    ? allWheelCategories.filter((category) => category.stage === aromaStage)
    : allWheelCategories;
  const flavorWheelCategories = isWineType(draft.beverageType)
    ? allWheelCategories.filter((category) => category.stage === flavorStage)
    : allWheelCategories;
  const activeAromaWheel =
    aromaWheelCategories.find((category) => category.id === aromaWheelCategory) ??
    aromaWheelCategories[0] ??
    { id: "none", label: "Descriptors", stage: "primary", descriptors: [], subcategories: {} };
  const activeFlavorWheel =
    flavorWheelCategories.find((category) => category.id === flavorWheelCategory) ??
    flavorWheelCategories[0] ??
    { id: "none", label: "Descriptors", stage: "primary", descriptors: [], subcategories: {} };

  useEffect(() => {
    let cancelled = false;
    setMapLoading(true);
    fetch("/world-topo.json")
      .then((res) => res.json())
      .then((json: unknown) => {
        if (cancelled || !isObject(json)) return;
        setMapPaths(topoToPaths(json));
        setMapLoading(false);
      })
      .catch(() => setMapLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setDataError(null);
    if (useCloudStorage && user) {
      setLoadingNotes(true);
      listTastingNotes(user.id)
        .then((rows) => {
          if (!cancelled) setNotes(rows.map(noteFromRecord));
        })
        .catch((error: unknown) => {
          if (!cancelled) setDataError(error instanceof Error ? error.message : "Unable to load tasting notes.");
        })
        .finally(() => {
          if (!cancelled) setLoadingNotes(false);
        });
      return () => {
        cancelled = true;
      };
    }
    setLoadingNotes(false);
    setNotes(loadGuestNotes());
    return () => {
      cancelled = true;
    };
  }, [useCloudStorage, user]);

  useEffect(() => {
    if (!aromaWheelCategories.some((category) => category.id === aromaWheelCategory)) {
      setAromaWheelCategory(aromaWheelCategories[0]?.id ?? "fruit");
    }
  }, [aromaWheelCategories, aromaWheelCategory]);

  useEffect(() => {
    if (!flavorWheelCategories.some((category) => category.id === flavorWheelCategory)) {
      setFlavorWheelCategory(flavorWheelCategories[0]?.id ?? "fruit");
    }
  }, [flavorWheelCategories, flavorWheelCategory]);

  const ordered = useMemo(() => [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [notes]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ordered;
    return ordered.filter((n) => [n.actualWineName, n.actualCountry, n.actualRegion, n.actualProducer, n.location, ...Object.values(n.details)].join(" ").toLowerCase().includes(q));
  }, [ordered, search]);
  const selected = useMemo(() => ordered.filter((n) => selectedIds.has(n.id)), [ordered, selectedIds]);
  const active = useMemo(() => filtered.find((n) => n.id === activeId) ?? null, [filtered, activeId]);

  const countryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const note of ordered) {
      if (!note.actualCountry.trim()) continue;
      const key = normalizeCountry(note.actualCountry);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, [ordered]);

  const analytics = useMemo(() => {
    const byGrape: Record<string, Accuracy> = {};
    const byCountry: Record<string, Accuracy> = {};
    const byRegion: Record<string, Accuracy> = {};
    const byVintage: Record<string, Accuracy> = {};
    let blind = 0;
    let correct = 0;
    let total = 0;
    const add = (map: Record<string, Accuracy>, key: string, flag: ReviewFlag) => {
      if (!key.trim() || flag === null) return;
      if (!map[key]) map[key] = { correct: 0, total: 0 };
      map[key].total += 1;
      if (flag) map[key].correct += 1;
    };
    for (const note of ordered) {
      if (note.isBlind) blind += 1;
      const flags = countFlags(note);
      correct += flags.correct;
      total += flags.total;
      add(byGrape, note.actualGrape, note.grapeCorrect);
      add(byCountry, note.actualCountry, note.countryCorrect);
      add(byRegion, note.actualRegion, note.regionCorrect);
      add(byVintage, note.actualVintage, note.vintageCorrect);
    }
    const grape = sumAccuracy(byGrape);
    const country = sumAccuracy(byCountry);
    const region = sumAccuracy(byRegion);
    const vintage = sumAccuracy(byVintage);
    return { total: ordered.length, blind, overall: total ? Math.round((correct / total) * 100) : null, grape, country, region, vintage, recs: recommendations(ordered.length, grape, country, region, vintage) };
  }, [ordered]);

  const mapDirectory = useMemo(() => {
    const q = mapSearch.trim().toLowerCase();
    const out: Record<string, Record<string, Note[]>> = {};
    for (const note of ordered) {
      const normalized = note.actualCountry ? normalizeCountry(note.actualCountry) : "";
      if (mapCountry && normalized !== mapCountry) continue;
      if (q && !note.actualCountry.toLowerCase().includes(q) && !note.actualRegion.toLowerCase().includes(q) && !note.actualWineName.toLowerCase().includes(q)) continue;
      const c = note.actualCountry || "Unknown Country";
      const r = note.actualRegion || "Unknown Region";
      if (!out[c]) out[c] = {};
      if (!out[c][r]) out[c][r] = [];
      out[c][r].push(note);
    }
    return out;
  }, [ordered, mapCountry, mapSearch]);

  const setType = (type: BeverageType) =>
    setDraft((prev) => ({
      ...createEmptyNote(type),
      id: prev.id,
      createdAt: prev.createdAt,
      updatedAt: prev.updatedAt,
      tastingDate: prev.tastingDate,
      location: prev.location,
      labelImageUrl: prev.labelImageUrl,
      backLabelImageUrl: prev.backLabelImageUrl,
      additionalImageUrls: prev.additionalImageUrls
    }));
  const updateDraft = (patch: Partial<Note>) => setDraft((prev) => ({ ...prev, ...patch }));
  const updateDetail = (id: string, value: string) => setDraft((prev) => ({ ...prev, details: { ...prev.details, [id]: value } }));
  const selectSettingsType = (type: SettingsBeverage) => {
    const target = SETTINGS_BEVERAGE_OPTIONS.find((item) => item.id === type)?.type ?? "red_wine";
    setType(target);
  };
  const stopCountdown = () => setCountdownRunning(false);
  const stopMetronome = () => setMetronomeRunning(false);
  const stopAllTools = () => {
    stopCountdown();
    stopMetronome();
  };

  const playTick = () => {
    const AudioCtor =
      typeof window !== "undefined"
        ? window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        : undefined;
    if (!AudioCtor) return;
    const audioContext = audioContextRef.current ?? new AudioCtor();
    audioContextRef.current = audioContext;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "square";
    osc.frequency.value = 1160;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(audioContext.destination);
    const startAt = audioContext.currentTime;
    osc.start(startAt);
    osc.stop(startAt + 0.05);
  };

  const startCountdown = () => {
    const total = Math.max(0, Math.floor(countdownMinutes) * 60 + Math.floor(countdownSeconds));
    if (total <= 0) {
      setStatusMessage("Set countdown minutes or seconds above zero.");
      return;
    }
    setCountdownRemaining(total);
    setCountdownRunning(true);
  };

  const toggleMetronome = () => {
    if (!metronomeEnabled) {
      setStatusMessage("Enable metronome first.");
      return;
    }
    setMetronomeRunning((current) => !current);
  };

  const onUploadPhoto = async (kind: "front" | "back" | "additional", fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    try {
      setDragTarget(null);
      const files = Array.from(fileList);
      const encoded = await Promise.all(files.map((file) => toDataUrl(file)));
      if (kind === "front" && encoded[0]) {
        updateDraft({ labelImageUrl: encoded[0] });
      } else if (kind === "back" && encoded[0]) {
        updateDraft({ backLabelImageUrl: encoded[0] });
      } else if (kind === "additional") {
        setDraft((prev) => ({ ...prev, additionalImageUrls: [...prev.additionalImageUrls, ...encoded].slice(0, 10) }));
      }
      setStatusMessage("Photo added to this tasting note.");
    } catch {
      setDataError("Could not process selected photo.");
    }
  };

  const removeAdditionalPhoto = (index: number) => {
    setDraft((prev) => ({ ...prev, additionalImageUrls: prev.additionalImageUrls.filter((_, i) => i !== index) }));
  };

  const openPhotoPicker = (kind: "front" | "back" | "additional") => {
    if (kind === "front") frontInputRef.current?.click();
    if (kind === "back") backInputRef.current?.click();
    if (kind === "additional") additionalInputRef.current?.click();
  };

  const onDropInto = (kind: "front" | "back" | "additional", event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragTarget(null);
    void onUploadPhoto(kind, event.dataTransfer.files);
  };

  const selectWineFruitFamily = (type: BeverageType, selectedFlavors: string[]) => {
    if (!isWineType(type)) return "";
    const fruitFamilyField = SCHEMAS[type].sections
      .flatMap((section) => section.fields)
      .find((field) => field.id === "noseFruitFamily");
    const allowed = new Set(fruitFamilyField?.options ?? []);
    for (const descriptor of selectedFlavors) {
      const match = FLAVOR_WHEEL_BY_TYPE[type].find((category) => category.descriptors.includes(descriptor));
      if (match && allowed.has(match.label)) return match.label;
    }
    return "";
  };

  const joinWheelSelectionLabels = (selectedFlavors: string[], selectedSubFlavors: string[]) => {
    const parsedSubs = selectedSubFlavors.map(parseFlavorSubKey).filter((item) => item.flavor && item.subcategory);
    return [...selectedFlavors, ...parsedSubs.map((item) => `${item.flavor}: ${item.subcategory}`)];
  };

  const applyAromaWheelDetails = (note: Note, selectedFlavors: string[], selectedSubFlavors: string[]) => {
    const aromaParts = joinWheelSelectionLabels(selectedFlavors, selectedSubFlavors);
    const parsedSubs = selectedSubFlavors.map(parseFlavorSubKey).filter((item) => item.flavor && item.subcategory);
    const flavorPool = Array.from(new Set([...selectedFlavors, ...parsedSubs.map((item) => item.flavor)]));
    const nextDetails = { ...note.details };
    if (isWineType(note.beverageType)) {
      nextDetails.nosePrimaryAromas = aromaParts.join(", ");
      nextDetails.noseFruitFamily = selectWineFruitFamily(note.beverageType, flavorPool);
    } else if ("aroma" in nextDetails) {
      nextDetails.aroma = aromaParts.join(", ");
    }
    return nextDetails;
  };

  const applyFlavorWheelDetails = (note: Note, selectedFlavors: string[], selectedSubFlavors: string[]) => {
    const flavorParts = joinWheelSelectionLabels(selectedFlavors, selectedSubFlavors);
    const nextDetails = { ...note.details };
    if (isWineType(note.beverageType)) {
      nextDetails.flavorWheelFlavors = flavorParts.join(", ");
    } else if ("flavor" in nextDetails) {
      nextDetails.flavor = flavorParts.join(", ");
    }
    return nextDetails;
  };

  const wheelStateFor = (note: Note, context: WheelContext) =>
    context === "aroma"
      ? { selected: note.flavorSelections, subSelected: note.flavorSubSelections }
      : { selected: note.flavorTasteSelections, subSelected: note.flavorTasteSubSelections };

  const applyWheelDetails = (note: Note, context: WheelContext, selectedFlavors: string[], selectedSubFlavors: string[]) =>
    context === "aroma"
      ? applyAromaWheelDetails(note, selectedFlavors, selectedSubFlavors)
      : applyFlavorWheelDetails(note, selectedFlavors, selectedSubFlavors);

  const toggleFlavor = (context: WheelContext, descriptor: string) => {
    setDraft((prev) => {
      const wheelState = wheelStateFor(prev, context);
      const exists = wheelState.selected.includes(descriptor);
      const nextSelections = exists
        ? wheelState.selected.filter((item) => item !== descriptor)
        : [...wheelState.selected, descriptor];
      const nextSubSelections = exists
        ? wheelState.subSelected.filter((item) => parseFlavorSubKey(item).flavor !== descriptor)
        : wheelState.subSelected;
      const nextDetails = applyWheelDetails(prev, context, nextSelections, nextSubSelections);
      if (context === "aroma") {
        return { ...prev, flavorSelections: nextSelections, flavorSubSelections: nextSubSelections, details: nextDetails };
      }
      return { ...prev, flavorTasteSelections: nextSelections, flavorTasteSubSelections: nextSubSelections, details: nextDetails };
    });
  };

  const toggleFlavorSubcategory = (context: WheelContext, descriptor: string, subcategory: string) => {
    setDraft((prev) => {
      const wheelState = wheelStateFor(prev, context);
      const key = flavorSubKey(descriptor, subcategory);
      const exists = wheelState.subSelected.includes(key);
      const nextSubSelections = exists
        ? wheelState.subSelected.filter((item) => item !== key)
        : [...wheelState.subSelected, key];
      const nextSelections = wheelState.selected.includes(descriptor)
        ? wheelState.selected
        : [...wheelState.selected, descriptor];
      const nextDetails = applyWheelDetails(prev, context, nextSelections, nextSubSelections);
      if (context === "aroma") {
        return { ...prev, flavorSelections: nextSelections, flavorSubSelections: nextSubSelections, details: nextDetails };
      }
      return { ...prev, flavorTasteSelections: nextSelections, flavorTasteSubSelections: nextSubSelections, details: nextDetails };
    });
  };

  useEffect(() => {
    if (!countdownRunning) return;
    if (countdownRemaining <= 0) {
      setCountdownRunning(false);
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate([120, 60, 120]);
      if (metronomeAudio) playTick();
      setStatusMessage("Countdown complete.");
      return;
    }
    const timer = window.setTimeout(() => {
      setCountdownRemaining((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [countdownRunning, countdownRemaining, metronomeAudio]);

  useEffect(() => {
    if (!metronomeEnabled || !metronomeRunning) return;
    const msPerBeat = Math.max(120, Math.round((60 / Math.max(20, bpm)) * 1000));
    const tick = () => {
      if (metronomeAudio) playTick();
      if (metronomeHaptic && typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(18);
    };
    tick();
    const timer = window.setInterval(tick, msPerBeat);
    return () => window.clearInterval(timer);
  }, [metronomeAudio, metronomeEnabled, metronomeHaptic, metronomeRunning, bpm]);

  useEffect(() => {
    if (!metronomeEnabled || !metronomeRunning || !metronomeProgression) return;
    const timer = window.setInterval(() => setBpm((current) => Math.min(220, current + 1)), 30000);
    return () => window.clearInterval(timer);
  }, [metronomeEnabled, metronomeProgression, metronomeRunning]);

  useEffect(
    () => () => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    },
    []
  );

  const save = async () => {
    const timestamp = nowIso();
    const nextDraft = { ...draft, updatedAt: timestamp };
    const isEditing = Boolean(editingId);
    setSaving(true);
    setDataError(null);
    try {
      if (useCloudStorage && user) {
        const payload = toUpsert(nextDraft);
        if (editingId) {
          const updated = await updateTastingNote(user.id, editingId, payload);
          const next = noteFromRecord(updated);
          setNotes((cur) => cur.map((note) => (note.id === editingId ? next : note)));
          setStatusMessage("Tasting note updated.");
        } else {
          const created = await createTastingNote(user.id, payload);
          setNotes((cur) => [noteFromRecord(created), ...cur]);
          setStatusMessage("Tasting note saved.");
        }
      } else {
        if (editingId) {
          setNotes((cur) => {
            const next = cur.map((note) => (note.id === editingId ? { ...nextDraft, id: editingId } : note));
            saveGuestNotes(next);
            return next;
          });
        } else {
          const created: Note = { ...nextDraft, id: newLocalId(), createdAt: timestamp };
          setNotes((cur) => {
            const next = [created, ...cur];
            saveGuestNotes(next);
            return next;
          });
        }
        setStatusMessage(isEditing ? "Tasting note updated locally." : "Tasting note saved locally.");
      }
      setEditingId(null);
      const fresh = createEmptyNote(draft.beverageType);
      setDraft(fresh);
      setRevealActual(!fresh.isBlind);
    } catch (error: unknown) {
      setDataError(error instanceof Error ? error.message : "Unable to save tasting note.");
    } finally {
      setSaving(false);
    }
  };

  const edit = (id: string) => {
    const found = notes.find((note) => note.id === id);
    if (!found) return;
    setDraft({ ...found, details: { ...found.details } });
    setEditingId(id);
    setRevealActual(!found.isBlind || Boolean(found.actualWineName.trim()));
    setTab("make");
  };

  const clearDraft = () => {
    setEditingId(null);
    const fresh = createEmptyNote(draft.beverageType);
    setDraft(fresh);
    setRevealActual(!fresh.isBlind);
    setStatusMessage("Draft cleared.");
  };

  const remove = async (id: string) => {
    setDeletingId(id);
    try {
      if (useCloudStorage && user) {
        await deleteTastingNote(user.id, id);
        setNotes((cur) => cur.filter((note) => note.id !== id));
      } else {
        setNotes((cur) => {
          const next = cur.filter((note) => note.id !== id);
          saveGuestNotes(next);
          return next;
        });
      }
      setSelectedIds((cur) => {
        const next = new Set(cur);
        next.delete(id);
        return next;
      });
      if (activeId === id) setActiveId(null);
    } catch (error: unknown) {
      setDataError(error instanceof Error ? error.message : "Unable to delete tasting note.");
    } finally {
      setDeletingId(null);
    }
  };

  const exportPdf = () => {
    const target = selected.length > 0 ? selected : filtered;
    if (target.length === 0) return;
    const generatedAt = new Date().toLocaleString();
    const origin = window.location.origin;
    const tartanHeader =
      tartanPattern.startsWith("http://") || tartanPattern.startsWith("https://")
        ? tartanPattern
        : `${origin}${tartanPattern}`;

    const cards = target
      .map((note) => {
        const sch = SCHEMAS[note.beverageType];
        const isWine = isWineType(note.beverageType);
        const primary = isWine
          ? `
            <div><strong>Grape:</strong> ${esc(note.actualGrape || "—")}</div>
            <div><strong>Country:</strong> ${esc(note.actualCountry || "—")}</div>
            <div><strong>Region:</strong> ${esc(note.actualRegion || "—")}</div>
            <div><strong>Vintage:</strong> ${esc(note.actualVintage || "—")}</div>
            <div><strong>Producer:</strong> ${esc(note.actualProducer || "—")}</div>
          `
          : sch.primaryFields
              .map((field) => `<div><strong>${esc(field.label)}:</strong> ${esc(note.details[field.id] || "—")}</div>`)
              .join("");

        const sections = sch.sections
          .map((section) => {
            const rows =
              section.fields
                .map((field) =>
                  note.details[field.id]
                    ? `<div><strong>${esc(field.label)}:</strong> ${esc(note.details[field.id])}</div>`
                    : ""
                )
                .join("") || "<div>—</div>";
            return `<section class="export-section"><h4>${esc(section.title)}</h4>${rows}</section>`;
          })
          .join("");

        const blindBlock = note.isBlind
          ? `<div class="blind-line"><strong>Blind Accuracy:</strong> ${noteScore(note) ?? "—"}${noteScore(note) !== null ? "%" : ""}</div>`
          : "";

        return `
          <article class="export-card">
            <header class="export-head">
              <h2>${esc(note.actualWineName || note.details.categoryName || "Untitled Tasting")}</h2>
              <p>${esc(sch.label)} | ${esc(fmtDate(note.tastingDate))}${note.isBlind ? " | Blind Tasting" : ""}</p>
            </header>
            <div class="export-grid">${primary}</div>
            ${blindBlock}
            <div class="export-sections">${sections}</div>
          </article>
        `;
      })
      .join("");

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Sip Studies Flavor Journal</title>
        <style>
          :root {
            --cream-main: #edd4a8;
            --cream-card: #edd4a8;
            --line: #817985;
            --ink: #8b4513;
            --header-ink: #edd4a8;
            --teal: #185552;
          }
          html, body {
            margin: 0;
            padding: 0;
            font-family: "Outfit", Arial, sans-serif;
            color: var(--ink);
            background: var(--cream-main);
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .sheet {
            margin: 0;
            min-height: 100vh;
            padding: 18mm 14mm;
            background: linear-gradient(180deg, #edd4a8 0%, #d8e6da 100%);
          }
          .report-header {
            margin-bottom: 14px;
            padding: 16px 18px;
            border-radius: 12px;
            border: 1px solid rgba(237, 212, 168, 0.55);
            color: var(--header-ink);
            background: #185552;
            position: relative;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(40, 28, 16, 0.18);
          }
          .report-header-pattern {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.5;
            filter: saturate(0.9) contrast(1.05) brightness(0.7);
          }
          .report-header-content {
            position: relative;
            z-index: 1;
          }
          h1 {
            margin: 0 0 6px;
            font-size: 30px;
            font-weight: 600;
            letter-spacing: 0.01em;
          }
          .meta {
            margin: 0;
          }
          .meta p {
            margin: 2px 0;
            color: rgba(253, 242, 225, 0.95);
          }
          .export-card {
            border: 1px solid var(--line);
            border-radius: 12px;
            padding: 14px;
            margin-bottom: 12px;
            background: var(--cream-card);
            break-inside: avoid;
          }
          .export-head h2 {
            margin: 0 0 4px;
            font-size: 18px;
          }
          .export-head p {
            margin: 0;
            color: #3f4a56;
          }
          .export-grid {
            margin-top: 10px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            font-size: 13px;
          }
          .blind-line {
            margin-top: 10px;
            font-size: 13px;
            font-weight: 600;
          }
          .export-sections {
            margin-top: 12px;
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .export-section {
            border: 1px solid #d8c6a3;
            border-radius: 10px;
            padding: 10px;
          }
          .export-section h4 {
            margin: 0 0 6px;
            color: var(--teal);
            text-transform: uppercase;
            font-size: 12px;
          }
          .export-section div {
            font-size: 12px;
            margin-bottom: 4px;
          }
          @media print {
            .sheet { padding: 12mm; }
          }
        </style>
      </head>
      <body>
        <main class="sheet">
          <header class="report-header">
            <img class="report-header-pattern" src="${tartanHeader}" alt="" />
            <div class="report-header-content">
              <h1>Sip Studies Flavor Journal</h1>
              <section class="meta">
                <p><strong>Generated:</strong> ${esc(generatedAt)}</p>
                <p><strong>Total Notes:</strong> ${target.length}</p>
              </section>
            </div>
          </header>
          ${cards}
        </main>
        <script>window.onload = function () { window.print(); };</script>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) {
      setStatusMessage("Popup blocked by browser. Enable popups to export the journal as PDF.");
      return;
    }
    try {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setStatusMessage(`Opened export for ${target.length} tasting note${target.length === 1 ? "" : "s"}.`);
    } catch {
      setDataError("Could not render printable PDF window. Please try again.");
      try {
        printWindow.close();
      } catch {
        // no-op
      }
    }
  };

  const renderFieldInput = (field: Field, value: string, disabled: boolean) => {
    if (field.type === "textarea") return <textarea id={`field-${field.id}`} rows={3} value={value} placeholder={field.placeholder} onChange={(e) => updateDetail(field.id, e.target.value)} disabled={disabled} />;
    if (field.type === "select") return <select id={`field-${field.id}`} value={value} onChange={(e) => updateDetail(field.id, e.target.value)} disabled={disabled}><option value="">Select...</option>{(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}</select>;
    return <input id={`field-${field.id}`} value={value} placeholder={field.placeholder} onChange={(e) => updateDetail(field.id, e.target.value)} disabled={disabled} />;
  };

  const renderFlavorWheelPanel = (context: WheelContext) => {
    const activeWheel = context === "aroma" ? activeAromaWheel : activeFlavorWheel;
    const activeCategory = context === "aroma" ? aromaWheelCategory : flavorWheelCategory;
    const setActiveCategory = context === "aroma" ? setAromaWheelCategory : setFlavorWheelCategory;
    const stage = context === "aroma" ? aromaStage : flavorStage;
    const setStage = context === "aroma" ? setAromaStage : setFlavorStage;
    const categories = context === "aroma" ? aromaWheelCategories : flavorWheelCategories;
    const selectedFlavors = context === "aroma" ? draft.flavorSelections : draft.flavorTasteSelections;
    const selectedSubcategories = context === "aroma" ? draft.flavorSubSelections : draft.flavorTasteSubSelections;
    return (
      <>
        <p className="hint">Choose multiple fruits and quality tags from the beverage-specific wheel.</p>
        {isWineType(draft.beverageType) ? (
          <div className="flavors-wheel-stage">
            <button type="button" className={`btn ${stage === "primary" ? "btn-primary" : "btn-light"}`} onClick={() => setStage("primary")}>Primary</button>
            <button type="button" className={`btn ${stage === "secondary" ? "btn-primary" : "btn-light"}`} onClick={() => setStage("secondary")}>Secondary</button>
            <button type="button" className={`btn ${stage === "tertiary" ? "btn-primary" : "btn-light"}`} onClick={() => setStage("tertiary")}>Tertiary</button>
          </div>
        ) : null}
        <div className="flavors-wheel-cats">{categories.map((category) => <button key={`${context}-${category.id}`} type="button" className={`btn ${activeCategory === category.id ? "btn-primary" : "btn-light"}`} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}</div>
        <div className="flavors-wheel-grid">
          {activeWheel.descriptors.map((descriptor) => {
            const subOptions = activeWheel.subcategories[descriptor] ?? [];
            return (
              <article className="flavors-wheel-flavor" key={`${context}-${descriptor}`}>
                <div className="flavors-wheel-chiprow">
                  <button type="button" className={`btn ${selectedFlavors.includes(descriptor) ? "btn-primary" : "btn-light"} flavors-wheel-parent`} onClick={() => toggleFlavor(context, descriptor)}>{descriptor}</button>
                  {subOptions.length > 0 ? <span className="flavors-wheel-divider" aria-hidden="true" /> : null}
                  {subOptions.map((sub) => {
                    const key = flavorSubKey(descriptor, sub);
                    return <button key={`${context}-${key}`} type="button" className={`btn ${selectedSubcategories.includes(key) ? "btn-primary" : "btn-light"}`} onClick={() => toggleFlavorSubcategory(context, descriptor, sub)}>{sub}</button>;
                  })}
                </div>
              </article>
            );
          })}
        </div>
        <div className="flavors-wheel-picked"><strong>Selected Flavors:</strong> {selectedFlavors.length > 0 ? selectedFlavors.join(", ") : "None"}</div>
        <div className="flavors-wheel-picked"><strong>Selected Subcategories:</strong> {selectedSubcategories.length > 0 ? selectedSubcategories.map((value) => { const parsed = parseFlavorSubKey(value); return `${parsed.flavor}: ${parsed.subcategory}`; }).join(", ") : "None"}</div>
        {selectedFlavors.length > 0 || selectedSubcategories.length > 0 ? <div className="journal-actions"><button type="button" className="btn btn-light" onClick={() => setDraft((prev) => {
          if (context === "aroma") {
            return {
              ...prev,
              flavorSelections: [],
              flavorSubSelections: [],
              details: isWineType(prev.beverageType)
                ? { ...prev.details, nosePrimaryAromas: "", noseFruitFamily: "" }
                : { ...prev.details, aroma: "" }
            };
          }
          return {
            ...prev,
            flavorTasteSelections: [],
            flavorTasteSubSelections: [],
            details: isWineType(prev.beverageType)
              ? { ...prev.details, flavorWheelFlavors: "" }
              : { ...prev.details, flavor: "" }
          };
        })}>Clear selections</button></div> : null}
      </>
    );
  };

  return (
    <section className="tasting-journal">
      <div className="section-header"><h2>Flavor Journal</h2><p>Structured notes, blind scoring analytics, PDF export, and an interactive country map of your tastings.</p></div>
      <div className="journal-tabs">
        <button className={`btn ${tab === "make" ? "btn-primary" : "btn-light"}`} onClick={() => setTab("make")}>New Notes</button>
        <button className={`btn ${tab === "review" ? "btn-primary" : "btn-light"}`} onClick={() => setTab("review")}>Review</button>
        <button className={`btn ${tab === "analyze" ? "btn-primary" : "btn-light"}`} onClick={() => setTab("analyze")}>Improve</button>
        <button className={`btn ${tab === "map" ? "btn-primary" : "btn-light"}`} onClick={() => setTab("map")}>Tasting Map</button>
      </div>
      {!useCloudStorage ? <p className="hint">Guest mode active. Notes save in this browser until auth is enabled.</p> : null}
      {loadingNotes ? <p className="hint">Loading tasting notes...</p> : null}
      {dataError ? <p className="error">{dataError}</p> : null}
      {statusMessage ? <p className="hint journal-message">{statusMessage}</p> : null}

      {tab === "make" && (countdownRunning || metronomeRunning) ? (
        <div className="flavors-floating-tools" role="status" aria-live="polite">
          {countdownRunning ? (
            <div className="flavors-floating-item">
              <span>Timer {formatClock(countdownRemaining)}</span>
              <button type="button" className="flavors-floating-stop" onClick={stopCountdown}>
                Stop
              </button>
            </div>
          ) : null}
          {metronomeRunning ? (
            <div className="flavors-floating-item">
              <span>BPM: {bpm}</span>
              <button type="button" className="flavors-floating-stop" onClick={stopMetronome}>
                Stop
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "make" ? (
        <div className="journal-shell">
          <article className="journal-card">
            <fieldset disabled={saving}>
              <div className="journal-form-grid">
                <div className="journal-row"><label>Tasting Date</label><input type="date" value={draft.tastingDate.slice(0, 10)} onChange={(e) => updateDraft({ tastingDate: e.target.value })} /></div>
                <div className="journal-row"><label>Location</label><input value={draft.location} placeholder="e.g., Classroom Tasting" onChange={(e) => updateDraft({ location: e.target.value })} /></div>
              </div>

              <section className="journal-block flavors-settings">
                <h3>Tasting Settings</h3>
                <div className="flavors-setting-row">
                  <div><strong>Beverage Type</strong><p className="hint">Select the type of beverage you are tasting</p></div>
                  <select value={settingsType(draft.beverageType)} onChange={(e) => selectSettingsType(e.target.value as SettingsBeverage)}>{SETTINGS_BEVERAGE_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select>
                </div>
                <div className="flavors-setting-row">
                  <div><strong>Blind Tasting Mode</strong><p className="hint">Test yourself without seeing wine details</p></div>
                  <button type="button" className={`flavors-switch ${draft.isBlind ? "on" : ""}`} onClick={() => { updateDraft({ isBlind: !draft.isBlind }); setRevealActual(draft.isBlind); }} aria-pressed={draft.isBlind}><span /></button>
                </div>
                <div className="flavors-setting-row">
                  <div><strong>Countdown Timer</strong><p className="hint">Set a timer while taking notes</p></div>
                  <button type="button" className={`flavors-switch ${countdownEnabled ? "on" : ""}`} onClick={() => { setCountdownEnabled((current) => !current); if (countdownEnabled) stopCountdown(); }} aria-pressed={countdownEnabled}><span /></button>
                </div>
                {countdownEnabled ? <div className="flavors-tool-box"><div className="journal-form-grid"><div className="journal-row"><label>Minutes</label><input type="number" min={0} value={countdownMinutes} onChange={(e) => setCountdownMinutes(Math.max(0, asNum(e.target.value, 0)))} /></div><div className="journal-row"><label>Seconds</label><input type="number" min={0} max={59} value={countdownSeconds} onChange={(e) => setCountdownSeconds(Math.min(59, Math.max(0, asNum(e.target.value, 0))))} /></div></div><div className="journal-actions"><button type="button" className="btn btn-primary" onClick={startCountdown}>{countdownRunning ? "Restart" : "Start"}</button><button type="button" className="btn btn-light" onClick={stopCountdown}>Stop</button><span className="hint">{formatClock(countdownRemaining)}</span></div></div> : null}
                <div className="flavors-setting-row">
                  <div><strong>Metronome</strong><p className="hint">Keep rhythm during tasting</p></div>
                  <button type="button" className={`flavors-switch ${metronomeEnabled ? "on" : ""}`} onClick={() => { setMetronomeEnabled((current) => !current); if (metronomeEnabled) stopMetronome(); }} aria-pressed={metronomeEnabled}><span /></button>
                </div>
                {metronomeEnabled ? <div className="flavors-tool-box"><div className="journal-row"><label>BPM: {bpm}</label><input type="range" min={40} max={220} step={1} value={bpm} onChange={(e) => setBpm(asNum(e.target.value, 60))} /></div><div className="journal-actions"><button type="button" className="btn btn-primary" onClick={toggleMetronome}>{metronomeRunning ? "Stop" : "Start"}</button><button type="button" className={`btn ${metronomeAudio ? "btn-primary" : "btn-light"}`} onClick={() => setMetronomeAudio((current) => !current)}>Audio Ticking</button><button type="button" className={`btn ${metronomeHaptic ? "btn-primary" : "btn-light"}`} onClick={() => setMetronomeHaptic((current) => !current)}>Haptic Vibration</button><button type="button" className={`btn ${metronomeProgression ? "btn-primary" : "btn-light"}`} onClick={() => setMetronomeProgression((current) => !current)}>Progression Mode</button></div></div> : null}
              </section>

              <section className="journal-block flavors-photo-section">
                <h3>Label Photos</h3>
                <div className="flavors-photo-zone">
                  <h4>Front Label photo</h4>
                  <div
                    className={`flavors-photo-drop ${dragTarget === "front" ? "drag" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => openPhotoPicker("front")}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openPhotoPicker("front");
                      }
                    }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragTarget("front");
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      setDragTarget((current) => (current === "front" ? null : current));
                    }}
                    onDrop={(event) => onDropInto("front", event)}
                  >
                    {draft.labelImageUrl ? <img src={draft.labelImageUrl} alt="Front label preview" /> : <p>Click to upload front label. Supports JPG, PNG, HEIC, TIFF.</p>}
                  </div>
                  <div className="journal-actions">
                    <button type="button" className="btn btn-light" onClick={() => openPhotoPicker("front")}>Upload</button>
                    <label className="btn btn-light">Take Photo<input hidden type="file" accept={PHOTO_ACCEPT} capture="environment" onChange={(e) => void onUploadPhoto("front", e.target.files)} /></label>
                    {draft.labelImageUrl ? <button type="button" className="btn btn-light" onClick={() => updateDraft({ labelImageUrl: "" })}>Remove</button> : null}
                  </div>
                  <input ref={frontInputRef} hidden type="file" accept={PHOTO_ACCEPT} onChange={(e) => void onUploadPhoto("front", e.target.files)} />
                </div>
                <div className="flavors-photo-zone">
                  <h4>Back Label photo</h4>
                  <div
                    className={`flavors-photo-drop ${dragTarget === "back" ? "drag" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => openPhotoPicker("back")}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openPhotoPicker("back");
                      }
                    }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragTarget("back");
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      setDragTarget((current) => (current === "back" ? null : current));
                    }}
                    onDrop={(event) => onDropInto("back", event)}
                  >
                    {draft.backLabelImageUrl ? <img src={draft.backLabelImageUrl} alt="Back label preview" /> : <p>Click to upload back label. Supports JPG, PNG, HEIC, TIFF.</p>}
                  </div>
                  <div className="journal-actions">
                    <button type="button" className="btn btn-light" onClick={() => openPhotoPicker("back")}>Upload</button>
                    <label className="btn btn-light">Take Photo<input hidden type="file" accept={PHOTO_ACCEPT} capture="environment" onChange={(e) => void onUploadPhoto("back", e.target.files)} /></label>
                    {draft.backLabelImageUrl ? <button type="button" className="btn btn-light" onClick={() => updateDraft({ backLabelImageUrl: "" })}>Remove</button> : null}
                  </div>
                  <input ref={backInputRef} hidden type="file" accept={PHOTO_ACCEPT} onChange={(e) => void onUploadPhoto("back", e.target.files)} />
                </div>
                <div className="flavors-photo-zone">
                  <h4>Additional photos</h4>
                  <div
                    className={`flavors-photo-drop ${dragTarget === "additional" ? "drag" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => openPhotoPicker("additional")}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openPhotoPicker("additional");
                      }
                    }}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragTarget("additional");
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      setDragTarget((current) => (current === "additional" ? null : current));
                    }}
                    onDrop={(event) => onDropInto("additional", event)}
                  >
                    <p>Click or drag and drop additional photos.</p>
                  </div>
                  <div className="flavors-photo-grid">{draft.additionalImageUrls.map((image, index) => <figure key={`${image.slice(0, 20)}-${index}`} className="flavors-photo-thumb"><img src={image} alt={`Additional photo ${index + 1}`} /><button type="button" className="btn btn-light" onClick={() => removeAdditionalPhoto(index)}>Remove</button></figure>)}{draft.additionalImageUrls.length === 0 ? <p className="hint">No additional photos yet.</p> : null}</div>
                  <div className="journal-actions"><button type="button" className="btn btn-light" onClick={() => openPhotoPicker("additional")}>Add photos</button><label className="btn btn-light">Take Photo<input hidden type="file" accept={PHOTO_ACCEPT} capture="environment" onChange={(e) => void onUploadPhoto("additional", e.target.files)} /></label></div>
                  <input ref={additionalInputRef} hidden type="file" accept={PHOTO_ACCEPT} multiple onChange={(e) => void onUploadPhoto("additional", e.target.files)} />
                </div>
              </section>

              {!isWineType(draft.beverageType) ? (
                <section className="journal-block flavors-wheel-block">
                  <h3>Flavor Wheel</h3>
                  {renderFlavorWheelPanel("aroma")}
                </section>
              ) : null}

              <section className="journal-block">
                <h3>Tasting Details</h3>
                {isWineType(draft.beverageType) ? (
                  <>
                    <section className="journal-subsection flavors-wheel-block">
                      <h4>Aromas & Flavor Wheel</h4>
                      {renderFlavorWheelPanel("aroma")}
                    </section>
                    {schema.sections[0] ? <section className="journal-subsection"><h4>{schema.sections[0].title}</h4><div className="journal-form-grid">{schema.sections[0].fields.map((field) => <div className="journal-row" key={field.id}><label>{field.label}</label>{renderFieldInput(field, draft.details[field.id] ?? "", saving)}</div>)}</div></section> : null}
                    <section className="journal-subsection flavors-wheel-block">
                      <h4>Flavor & Flavor Wheel</h4>
                      {renderFlavorWheelPanel("flavor")}
                    </section>
                    {schema.sections[1] ? <section className="journal-subsection"><h4>{schema.sections[1].title}</h4><div className="journal-form-grid">{schema.sections[1].fields.map((field) => <div className="journal-row" key={field.id}><label>{field.label}</label>{renderFieldInput(field, draft.details[field.id] ?? "", saving)}</div>)}</div></section> : null}
                  </>
                ) : (
                  <>
                    <div className="journal-form-grid">{schema.primaryFields.map((field) => <div className="journal-row" key={field.id}><label>{field.label}</label>{renderFieldInput(field, draft.details[field.id] ?? "", saving)}</div>)}</div>
                    {schema.sections.map((section) => <section className="journal-subsection" key={section.title}><h4>{section.title}</h4><div className="journal-form-grid">{section.fields.map((field) => <div className="journal-row" key={field.id}><label>{field.label}</label>{renderFieldInput(field, draft.details[field.id] ?? "", saving)}</div>)}</div></section>)}
                  </>
                )}
              </section>

              {draft.isBlind ? (
                <section className="journal-block">
                  <h3>Conclusion</h3>
                  <p className="hint">Capture your final conclusion before revealing results.</p>
                  <div className="journal-form-grid">
                    <div className="journal-row"><label>Conclusion Notes</label><textarea rows={3} value={draft.details.blindConclusion ?? ""} placeholder="Summarize your final tasting conclusion." onChange={(e) => updateDetail("blindConclusion", e.target.value)} /></div>
                    <div className="journal-row"><label>Final Call</label><input value={draft.details.blindFinalCall ?? ""} placeholder="e.g., Old World red blend, medium+ acidity, high tannin" onChange={(e) => updateDetail("blindFinalCall", e.target.value)} /></div>
                  </div>
                </section>
              ) : null}

              {draft.isBlind ? (
                <section className="journal-block">
                  <h3>Your Guess</h3>
                  <div className="journal-form-grid">
                    <div className="journal-row"><label>Grape Variety</label><input value={draft.blindGuessGrape} onChange={(e) => updateDraft({ blindGuessGrape: e.target.value })} /></div>
                    <div className="journal-row"><label>Country</label><input value={draft.blindGuessCountry} onChange={(e) => updateDraft({ blindGuessCountry: e.target.value })} /></div>
                    <div className="journal-row"><label>Region</label><input value={draft.blindGuessRegion} onChange={(e) => updateDraft({ blindGuessRegion: e.target.value })} /></div>
                    <div className="journal-row"><label>Vintage</label><input value={draft.blindGuessVintage} onChange={(e) => updateDraft({ blindGuessVintage: e.target.value })} /></div>
                    <div className="journal-row"><label>Alcohol</label><input value={draft.blindGuessAlcohol} onChange={(e) => updateDraft({ blindGuessAlcohol: e.target.value })} /></div>
                    <div className="journal-row"><label>Appellation (Optional)</label><input value={draft.blindGuessAppellation} onChange={(e) => updateDraft({ blindGuessAppellation: e.target.value })} /></div>
                    <div className="journal-row"><label>Producer (Optional)</label><input value={draft.blindGuessProducer} onChange={(e) => updateDraft({ blindGuessProducer: e.target.value })} /></div>
                    <div className="journal-row"><label>Confidence Level: {Math.round(draft.blindGuessConfidence)}%</label><input type="range" min={0} max={100} step={10} value={Math.round(draft.blindGuessConfidence)} onChange={(e) => updateDraft({ blindGuessConfidence: asNum(e.target.value, 50) })} /></div>
                  </div>
                </section>
              ) : null}

              {draft.isBlind ? (
                <div className="journal-actions">
                  <button className={`btn ${revealActual ? "btn-primary" : "btn-light"}`} type="button" onClick={() => setRevealActual((current) => !current)}>
                    {revealActual ? "Hide Results" : "Reveal Results"}
                  </button>
                </div>
              ) : null}

              {isWineType(draft.beverageType) && (!draft.isBlind || revealActual) ? (
                <section className="journal-block">
                  <h3>Actual Wine Detail</h3>
                  <div className="journal-form-grid">
                    <div className="journal-row"><label>Wine Name</label><input value={draft.actualWineName} onChange={(e) => updateDraft({ actualWineName: e.target.value })} /></div>
                    <div className="journal-row"><label>Grape Variety</label><input value={draft.actualGrape} onChange={(e) => updateDraft({ actualGrape: e.target.value })} /></div>
                    <div className="journal-row"><label>Country</label><input value={draft.actualCountry} onChange={(e) => updateDraft({ actualCountry: e.target.value })} /></div>
                    <div className="journal-row"><label>Region</label><input value={draft.actualRegion} onChange={(e) => updateDraft({ actualRegion: e.target.value })} /></div>
                    <div className="journal-row"><label>Appellation (Optional)</label><input value={draft.actualAppellation} onChange={(e) => updateDraft({ actualAppellation: e.target.value })} /></div>
                    <div className="journal-row"><label>Vintage</label><input value={draft.actualVintage} onChange={(e) => updateDraft({ actualVintage: e.target.value })} /></div>
                    <div className="journal-row"><label>Alcohol</label><input value={draft.actualAlcohol} onChange={(e) => updateDraft({ actualAlcohol: e.target.value })} /></div>
                    <div className="journal-row"><label>Producer (Optional)</label><input value={draft.actualProducer} onChange={(e) => updateDraft({ actualProducer: e.target.value })} /></div>
                  </div>
                </section>
              ) : null}

              {draft.isBlind && revealActual ? (
                <section className="journal-block journal-score-block">
                  <h3>Score Your Guesses</h3>
                  {[{ label: "Grape Variety", guess: draft.blindGuessGrape, actual: draft.actualGrape, key: "grapeCorrect" }, { label: "Country", guess: draft.blindGuessCountry, actual: draft.actualCountry, key: "countryCorrect" }, { label: "Region", guess: draft.blindGuessRegion, actual: draft.actualRegion, key: "regionCorrect" }, { label: "Vintage", guess: draft.blindGuessVintage, actual: draft.actualVintage, key: "vintageCorrect" }].map((row) => <div className="journal-score-row" key={row.label}><div><strong>{row.label}</strong><p className="hint">Your guess: {row.guess || "—"} | Actual: {row.actual || "—"}</p></div><div className="journal-score-actions"><button type="button" className={`btn ${(draft as unknown as Record<string, ReviewFlag>)[row.key] === true ? "btn-primary" : "btn-light"}`} onClick={() => updateDraft({ [row.key]: true } as Partial<Note>)}>Correct</button><button type="button" className={`btn ${(draft as unknown as Record<string, ReviewFlag>)[row.key] === false ? "btn-primary" : "btn-light"}`} onClick={() => updateDraft({ [row.key]: false } as Partial<Note>)}>Incorrect</button></div></div>)}
                </section>
              ) : null}

              <div className="journal-actions"><button className="btn btn-primary" type="button" onClick={save}>{saving ? "Saving..." : editingId ? "Update Tasting" : "Save Tasting"}</button><button className="btn btn-light" type="button" onClick={clearDraft}>Clear</button>{countdownRunning || metronomeRunning ? <button className="btn btn-light" type="button" onClick={stopAllTools}>Stop Tools</button> : null}</div>
            </fieldset>
          </article>
          <aside className="journal-card"><h3>Live Summary</h3><p className="hint">{SCHEMAS[draft.beverageType].label}</p><p><strong>Title:</strong> {draft.actualWineName || draft.details.categoryName || "Untitled"}</p><p><strong>Country / Region:</strong> {draft.actualCountry || "-"} / {draft.actualRegion || "-"}</p><p><strong>Blind:</strong> {draft.isBlind ? "Yes" : "No"}</p><p><strong>Guess Confidence:</strong> {Math.round(draft.blindGuessConfidence)}%</p><p><strong>Flavor Picks:</strong> {draft.flavorSelections.length + draft.flavorSubSelections.length + draft.flavorTasteSelections.length + draft.flavorTasteSubSelections.length}</p><p><strong>Photos:</strong> {(draft.labelImageUrl ? 1 : 0) + (draft.backLabelImageUrl ? 1 : 0) + draft.additionalImageUrls.length}</p><p><strong>Timer:</strong> {countdownEnabled ? formatClock(countdownRemaining) : "Off"}</p><p><strong>Metronome:</strong> {metronomeEnabled ? `${bpm} BPM` : "Off"}</p><p><strong>Draft Accuracy:</strong> {noteScore(draft) ?? "-"}{noteScore(draft) !== null ? "%" : ""}</p></aside>
        </div>
      ) : null}

      {tab === "review" ? (
        <div className="journal-shell">
          <article className="journal-card">
            <div className="journal-toolbar"><input placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} /><button className="btn btn-light" type="button" onClick={() => setSelectedIds((current) => current.size === filtered.length ? new Set() : new Set(filtered.map((n) => n.id)))} disabled={filtered.length === 0}>{selectedIds.size === filtered.length && filtered.length > 0 ? "Unselect All" : "Select All"}</button><button className="btn btn-light" type="button" onClick={exportPdf} disabled={filtered.length === 0}>Export PDF</button></div>
            <div className="journal-note-list">
              {filtered.map((note) => <article key={note.id} className={`journal-note-row ${note.id === activeId ? "active" : ""}`} onClick={() => setActiveId(note.id)}><label className="journal-check"><input type="checkbox" checked={selectedIds.has(note.id)} onClick={(e) => e.stopPropagation()} onChange={() => setSelectedIds((current) => { const next = new Set(current); if (next.has(note.id)) next.delete(note.id); else next.add(note.id); return next; })} /><span>Select</span></label><div className="journal-note-copy"><h3>{note.actualWineName || note.details.categoryName || "Untitled Tasting"}</h3><p>{SCHEMAS[note.beverageType].label} | {note.actualCountry || "Unknown"} | {fmtDate(note.tastingDate)}</p>{note.isBlind ? <p>Blind Accuracy: {noteScore(note) ?? "—"}{noteScore(note) !== null ? "%" : ""}</p> : null}</div><div className="journal-note-actions"><button className="btn btn-light" type="button" onClick={(e) => { e.stopPropagation(); edit(note.id); }}>Edit</button><button className="btn btn-light" type="button" disabled={deletingId === note.id} onClick={(e) => { e.stopPropagation(); void remove(note.id); }}>{deletingId === note.id ? "Deleting..." : "Delete"}</button></div></article>)}
            </div>
          </article>
          <aside className="journal-card journal-review-detail">{active ? <><h3>{active.actualWineName || active.details.categoryName || "Untitled Tasting"}</h3><p className="hint">{fmtDate(active.tastingDate)}</p><p><strong>Type:</strong> {SCHEMAS[active.beverageType].label}</p><p><strong>Location:</strong> {active.location || "—"}</p><p><strong>Country / Region:</strong> {active.actualCountry || "—"} / {active.actualRegion || "—"}</p><p><strong>Blind:</strong> {active.isBlind ? "Yes" : "No"}</p>{active.isBlind ? <p><strong>Accuracy:</strong> {noteScore(active) ?? "—"}{noteScore(active) !== null ? "%" : ""}</p> : null}</> : <p className="hint">Select a note to review details.</p>}</aside>
        </div>
      ) : null}

      {tab === "analyze" ? (
        <div className="journal-shell">
          <article className="journal-card"><div className="journal-metrics"><div><h3>{analytics.total}</h3><p>Total tasting notes</p></div><div><h3>{analytics.blind}</h3><p>Blind tasting notes</p></div><div><h3>{analytics.overall !== null ? `${analytics.overall}%` : "—"}</h3><p>Overall accuracy</p></div><div><h3>{countryCounts.size}</h3><p>Countries tasted</p></div></div></article>
          <aside className="journal-card"><h3>Performance Analytics</h3><ul><li><strong>Grape:</strong> {analytics.grape.correct} / {analytics.grape.total} ({pct(analytics.grape)})</li><li><strong>Country:</strong> {analytics.country.correct} / {analytics.country.total} ({pct(analytics.country)})</li><li><strong>Region:</strong> {analytics.region.correct} / {analytics.region.total} ({pct(analytics.region)})</li><li><strong>Vintage:</strong> {analytics.vintage.correct} / {analytics.vintage.total} ({pct(analytics.vintage)})</li></ul><h3>Suggested Study Focus</h3><ul>{analytics.recs.map((rec) => <li key={rec}>{rec}</li>)}</ul></aside>
        </div>
      ) : null}

      {tab === "map" ? (
        <div className="journal-shell">
          <article className="journal-card journal-map-card">
            <h3>World Map</h3>
            {mapCountry ? <p className="hint">Selected: {displayCountry(mapCountry)} <button className="btn btn-light" type="button" onClick={() => setMapCountry(null)}>Clear</button></p> : null}
            {mapLoading ? <p className="hint">Loading map...</p> : <div className="journal-region-map-wrap"><svg viewBox="0 0 800 400" className="journal-region-map-svg" preserveAspectRatio="xMidYMid meet"><rect x="0" y="0" width="800" height="400" fill="#D8E6DA" />{Array.from({ length: 17 }, (_, i) => (i - 8) * 10).filter((lat) => lat > -90 && lat < 90).map((lat) => { const y = ((90 - lat) / 180) * 400; return <line key={`lat-${lat}`} x1="0" y1={y} x2="800" y2={y} stroke="#817985" strokeWidth="0.5" strokeOpacity="0.1" pointerEvents="none" />; })}{mapPaths.map((country) => { const has = countryCounts.has(country.name); const selectedMapCountry = mapCountry === country.name; const hovered = mapHover === country.name; const fill = selectedMapCountry || (has && hovered) ? "#185552" : has ? "#185552" : "#EDD4A8"; const opacity = selectedMapCountry || (has && hovered) ? 0.9 : has ? 0.25 : 0.45; return <path key={country.id} d={country.path} fill={fill} fillOpacity={opacity} stroke="#817985" strokeWidth={selectedMapCountry || hovered ? "1" : "0.5"} className={has ? "journal-country-clickable" : ""} onClick={(e) => { e.stopPropagation(); if (!has) return; setMapCountry((cur) => cur === country.name ? null : country.name); document.getElementById("journal-region-directory")?.scrollIntoView({ behavior: "smooth" }); }} onMouseEnter={() => { if (has) setMapHover(country.name); }} onMouseLeave={() => setMapHover(null)} />; })}</svg>{mapHover && countryCounts.has(mapHover) ? <div className="journal-map-tooltip"><strong>{displayCountry(mapHover)}</strong><span>{countryCounts.get(mapHover)} {countryCounts.get(mapHover) === 1 ? "tasting" : "tastings"}</span></div> : null}<div className="journal-map-count-pill">{countryCounts.size} {countryCounts.size === 1 ? "country" : "countries"} tasted</div></div>}
          </article>
          <aside id="journal-region-directory" className="journal-card"><h3>Region Directory</h3><div className="journal-toolbar"><input placeholder="Search regions or wines..." value={mapSearch} onChange={(e) => setMapSearch(e.target.value)} /></div><div className="journal-note-list">{Object.entries(mapDirectory).length > 0 ? Object.entries(mapDirectory).map(([country, regions]) => <div key={country} className="journal-region-country"><h4>{country}</h4>{Object.entries(regions).map(([region, regionNotes]) => <div key={`${country}-${region}`} className="journal-region-group"><p><strong>{region}</strong> ({regionNotes.length})</p><div className="journal-note-list">{regionNotes.map((note) => <article key={note.id} className={`journal-note-row compact ${activeId === note.id ? "active" : ""}`} onClick={() => { setActiveId(note.id); setTab("review"); }}><div className="journal-note-copy"><h3>{note.actualWineName || "Untitled Tasting"}</h3><p>{fmtDate(note.tastingDate)}</p></div></article>)}</div></div>)}</div>) : <p className="hint">No regions found. Try clearing filters or add more tasting notes.</p>}</div></aside>
        </div>
      ) : null}
    </section>
  );
}

