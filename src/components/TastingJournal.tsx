import { useEffect, useMemo, useState } from "react";
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

type BeverageType = "white_wine" | "red_wine" | "beer" | "spirits" | "coffee" | "tea" | "other";
type TabId = "make" | "review" | "analyze" | "map";
type FieldType = "text" | "textarea" | "select";
type ReviewFlag = boolean | null;

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
          { id: "noseFruitFamily", label: "Fruit Family", type: "select", options: ["Red Fruit", "Blue Fruit", "Black Fruit", "Dried Fruit", "Floral", "Herbal", "Spice", "Earth", "Oak", "Other"] },
          { id: "nosePrimaryAromas", label: "Primary Aromas", type: "textarea" }
        ]
      },
      {
        title: "Palate & Conclusion",
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
          { id: "noseFruitFamily", label: "Fruit Family", type: "select", options: ["Citrus", "Tree Fruit", "Stone Fruit", "Tropical Fruit", "Floral", "Herbal", "Mineral", "Oak", "Other"] },
          { id: "nosePrimaryAromas", label: "Primary Aromas", type: "textarea" }
        ]
      },
      {
        title: "Palate & Conclusion",
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
    label: "Other",
    primaryFields: [{ id: "categoryName", label: "Category", type: "text" }, { id: "origin", label: "Origin", type: "text" }],
    sections: [{ title: "Notes", fields: [{ id: "aroma", label: "Aroma", type: "textarea" }, { id: "flavor", label: "Flavor", type: "textarea" }, { id: "texture", label: "Texture/Mouthfeel", type: "text" }, { id: "conclusionNotes", label: "Notes", type: "textarea" }] }]
  }
};

const BEVERAGE_OPTIONS: BeverageType[] = ["white_wine", "red_wine", "beer", "spirits", "coffee", "tea", "other"];

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
  return value in SCHEMAS ? (value as BeverageType) : "red_wine";
};
const isWineType = (type: BeverageType) => type === "red_wine" || type === "white_wine";
const LOCAL_TASTING_NOTES_KEY = "sipstudies:tasting-journal:guest-notes:v1";

function newLocalId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function allFieldIds(type: BeverageType) {
  const schema = SCHEMAS[type];
  return [...schema.primaryFields, ...schema.sections.flatMap((section) => section.fields)].map((field) => field.id);
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
  const type = asType(record.beverage_type);
  const base = createEmptyNote(type);
  const fields = isObject(record.fields_json) ? record.fields_json : {};
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
    beverage_type: note.beverageType,
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
      labelImageUrl: note.labelImageUrl.trim(),
      backLabelImageUrl: note.backLabelImageUrl.trim(),
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

export function TastingJournal() {
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

  const useCloudStorage = isConfigured && Boolean(user);
  const schema = SCHEMAS[draft.beverageType];

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

  const setType = (type: BeverageType) => setDraft((prev) => ({ ...createEmptyNote(type), id: prev.id, createdAt: prev.createdAt, updatedAt: prev.updatedAt, tastingDate: prev.tastingDate, location: prev.location }));
  const updateDraft = (patch: Partial<Note>) => setDraft((prev) => ({ ...prev, ...patch }));
  const updateDetail = (id: string, value: string) => setDraft((prev) => ({ ...prev, details: { ...prev.details, [id]: value } }));

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
        <title>Sip Studies Tasting Journal</title>
        <style>
          :root {
            --cream-main: #f4e8ce;
            --cream-card: #f8f1df;
            --line: #bda87f;
            --ink: #231d1a;
            --header-ink: #fdf2e1;
            --teal: #1f5f63;
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
            background: linear-gradient(180deg, #f4e8ce 0%, #f1e3c8 100%);
          }
          .report-header {
            margin-bottom: 14px;
            padding: 16px 18px;
            border-radius: 12px;
            border: 1px solid rgba(253, 242, 225, 0.55);
            color: var(--header-ink);
            background: #1f5f63;
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
              <h1>Sip Studies Tasting Journal</h1>
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
    if (field.type === "select") {
      return (
        <div className="journal-choice-row" role="radiogroup" aria-label={field.label}>
          {(field.options ?? []).map((option) => {
            const selected = value === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`journal-choice-btn ${selected ? "selected" : ""}`}
                onClick={() => updateDetail(field.id, option)}
                disabled={disabled}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }
    return <input id={`field-${field.id}`} value={value} placeholder={field.placeholder} onChange={(e) => updateDetail(field.id, e.target.value)} disabled={disabled} />;
  };

  return (
    <section className="tasting-journal">
      <div className="section-header"><h2>Tasting Journal</h2><p>Structured notes, blind scoring analytics, PDF export, and an interactive country map of your tastings.</p></div>
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

      {tab === "make" ? (
        <div className="journal-shell">
          <article className="journal-card">
            <fieldset disabled={saving}>
              <div className="journal-form-grid">
                <div className="journal-row"><label>Tasting Date</label><input type="date" value={draft.tastingDate.slice(0, 10)} onChange={(e) => updateDraft({ tastingDate: e.target.value })} /></div>
                <div className="journal-row"><label>Location</label><input value={draft.location} placeholder="e.g., Classroom Tasting" onChange={(e) => updateDraft({ location: e.target.value })} /></div>
                <div className="journal-row"><label>Beverage Type</label><select value={draft.beverageType} onChange={(e) => setType(asType(e.target.value))}>{BEVERAGE_OPTIONS.map((type) => <option key={type} value={type}>{SCHEMAS[type].label}</option>)}</select></div>
                <div className="journal-row journal-toggle-row"><label>Blind Tasting</label><input type="checkbox" checked={draft.isBlind} onChange={(e) => { updateDraft({ isBlind: e.target.checked }); setRevealActual(!e.target.checked); }} /></div>
                <div className="journal-row"><label>Front Label Image URL</label><input value={draft.labelImageUrl} placeholder="https://..." onChange={(e) => updateDraft({ labelImageUrl: e.target.value })} /></div>
                <div className="journal-row"><label>Back Label Image URL</label><input value={draft.backLabelImageUrl} placeholder="https://..." onChange={(e) => updateDraft({ backLabelImageUrl: e.target.value })} /></div>
              </div>

              {draft.isBlind ? (
                <section className="journal-block">
                  <h3>Your Blind Guess</h3>
                  <div className="journal-form-grid">
                    <div className="journal-row"><label>Grape Variety</label><input value={draft.blindGuessGrape} onChange={(e) => updateDraft({ blindGuessGrape: e.target.value })} /></div>
                    <div className="journal-row"><label>Country</label><input value={draft.blindGuessCountry} onChange={(e) => updateDraft({ blindGuessCountry: e.target.value })} /></div>
                    <div className="journal-row"><label>Region</label><input value={draft.blindGuessRegion} onChange={(e) => updateDraft({ blindGuessRegion: e.target.value })} /></div>
                    <div className="journal-row"><label>Vintage</label><input value={draft.blindGuessVintage} onChange={(e) => updateDraft({ blindGuessVintage: e.target.value })} /></div>
                    <div className="journal-row"><label>Alcohol</label><input value={draft.blindGuessAlcohol} onChange={(e) => updateDraft({ blindGuessAlcohol: e.target.value })} /></div>
                    <div className="journal-row"><label>Soil Type</label><input value={draft.blindGuessSoilType} onChange={(e) => updateDraft({ blindGuessSoilType: e.target.value })} /></div>
                    <div className="journal-row"><label>Appellation (Optional)</label><input value={draft.blindGuessAppellation} onChange={(e) => updateDraft({ blindGuessAppellation: e.target.value })} /></div>
                    <div className="journal-row"><label>Producer (Optional)</label><input value={draft.blindGuessProducer} onChange={(e) => updateDraft({ blindGuessProducer: e.target.value })} /></div>
                    <div className="journal-row"><label>Confidence Level: {Math.round(draft.blindGuessConfidence)}%</label><input type="range" min={0} max={100} step={10} value={Math.round(draft.blindGuessConfidence)} onChange={(e) => updateDraft({ blindGuessConfidence: asNum(e.target.value, 50) })} /></div>
                  </div>
                </section>
              ) : null}

              {!draft.isBlind || revealActual ? (
                <section className="journal-block">
                  <h3>{draft.isBlind ? "Actual Wine Details" : "Tasting Details"}</h3>
                  {isWineType(draft.beverageType) ? (
                    <div className="journal-form-grid">
                      <div className="journal-row"><label>Wine Name</label><input value={draft.actualWineName} onChange={(e) => updateDraft({ actualWineName: e.target.value })} /></div>
                      <div className="journal-row"><label>Grape Variety</label><input value={draft.actualGrape} onChange={(e) => updateDraft({ actualGrape: e.target.value })} /></div>
                      <div className="journal-row"><label>Country</label><input value={draft.actualCountry} onChange={(e) => updateDraft({ actualCountry: e.target.value })} /></div>
                      <div className="journal-row"><label>Region</label><input value={draft.actualRegion} onChange={(e) => updateDraft({ actualRegion: e.target.value })} /></div>
                      <div className="journal-row"><label>Vintage</label><input value={draft.actualVintage} onChange={(e) => updateDraft({ actualVintage: e.target.value })} /></div>
                      <div className="journal-row"><label>Alcohol</label><input value={draft.actualAlcohol} onChange={(e) => updateDraft({ actualAlcohol: e.target.value })} /></div>
                      <div className="journal-row"><label>Soil Type</label><input value={draft.actualSoilType} onChange={(e) => updateDraft({ actualSoilType: e.target.value })} /></div>
                      <div className="journal-row"><label>Appellation</label><input value={draft.actualAppellation} onChange={(e) => updateDraft({ actualAppellation: e.target.value })} /></div>
                      <div className="journal-row"><label>Producer</label><input value={draft.actualProducer} onChange={(e) => updateDraft({ actualProducer: e.target.value })} /></div>
                      <div className="journal-row"><label>Price</label><input value={draft.actualPrice} onChange={(e) => updateDraft({ actualPrice: e.target.value })} /></div>
                    </div>
                  ) : (
                    <div className="journal-form-grid">{schema.primaryFields.map((field) => <div className="journal-row" key={field.id}><label>{field.label}</label>{renderFieldInput(field, draft.details[field.id] ?? "", saving)}</div>)}</div>
                  )}
                  {schema.sections.map((section) => <section className="journal-subsection" key={section.title}><h4>{section.title}</h4><div className="journal-form-grid">{section.fields.map((field) => <div className="journal-row" key={field.id}><label>{field.label}</label>{renderFieldInput(field, draft.details[field.id] ?? "", saving)}</div>)}</div></section>)}
                </section>
              ) : null}

              {draft.isBlind && revealActual ? (
                <section className="journal-block journal-score-block">
                  <h3>Score Your Guesses</h3>
                  {[{ label: "Grape Variety", guess: draft.blindGuessGrape, actual: draft.actualGrape, key: "grapeCorrect" }, { label: "Country", guess: draft.blindGuessCountry, actual: draft.actualCountry, key: "countryCorrect" }, { label: "Region", guess: draft.blindGuessRegion, actual: draft.actualRegion, key: "regionCorrect" }, { label: "Vintage", guess: draft.blindGuessVintage, actual: draft.actualVintage, key: "vintageCorrect" }].map((row) => <div className="journal-score-row" key={row.label}><div><strong>{row.label}</strong><p className="hint">Your guess: {row.guess || "—"} | Actual: {row.actual || "—"}</p></div><div className="journal-score-actions"><button type="button" className={`btn ${(draft as unknown as Record<string, ReviewFlag>)[row.key] === true ? "btn-primary" : "btn-light"}`} onClick={() => updateDraft({ [row.key]: true } as Partial<Note>)}>Correct</button><button type="button" className={`btn ${(draft as unknown as Record<string, ReviewFlag>)[row.key] === false ? "btn-primary" : "btn-light"}`} onClick={() => updateDraft({ [row.key]: false } as Partial<Note>)}>Incorrect</button></div></div>)}
                </section>
              ) : null}

              {draft.isBlind && !revealActual ? <div className="journal-actions"><button className="btn btn-light" type="button" onClick={() => setRevealActual(true)}>Reveal Actual Wine Details</button></div> : null}
              <div className="journal-actions"><button className="btn btn-primary" type="button" onClick={save}>{saving ? "Saving..." : editingId ? "Update Tasting" : "Save Tasting"}</button><button className="btn btn-light" type="button" onClick={clearDraft}>Clear</button></div>
            </fieldset>
          </article>
          <aside className="journal-card"><h3>Live Summary</h3><p className="hint">{SCHEMAS[draft.beverageType].label}</p><p><strong>Title:</strong> {draft.actualWineName || draft.details.categoryName || "Untitled"}</p><p><strong>Country / Region:</strong> {draft.actualCountry || "—"} / {draft.actualRegion || "—"}</p><p><strong>Blind:</strong> {draft.isBlind ? "Yes" : "No"}</p><p><strong>Guess Confidence:</strong> {Math.round(draft.blindGuessConfidence)}%</p><p><strong>Draft Accuracy:</strong> {noteScore(draft) ?? "—"}{noteScore(draft) !== null ? "%" : ""}</p></aside>
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

