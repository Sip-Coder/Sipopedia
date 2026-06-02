export type CountryMapSourceTone = "overview" | "source-backed" | "official-target";

export type CountryMapSourceRecord = {
  tierLabel: string;
  statusLabel: string;
  tone: CountryMapSourceTone;
  sourceName: string;
  sourceUrl?: string;
  sourceMethod: string;
  licenseNote: string;
  retrievedAt: string;
  availableLayers: string[];
  caveat: string;
  nextUpgrade: string;
};

const retrievedAt = "2026-05-15";

const defaultCountryMapSource: CountryMapSourceRecord = {
  tierLabel: "Tier 1 Overview",
  statusLabel: "Overview Plate",
  tone: "overview",
  sourceName: "Sip Studies editorial country profile and shared atlas outline",
  sourceMethod: "Country outline plus study-region index; no inferred internal wine-boundary polygons.",
  licenseNote: "Internal generated SVG plate; source review still required before drawing official internal borders.",
  retrievedAt,
  availableLayers: ["Country outline", "Study-region index", "Editable SVG text"],
  caveat: "This overview is for orientation and study navigation, not a legal appellation boundary map.",
  nextUpgrade: "Attach official regulatory GIS or legal-boundary reconstruction before drawing internal regions."
};

export const countryMapSourceRecords: Record<string, CountryMapSourceRecord> = {
  france: {
    tierLabel: "Tier 2 Overview",
    statusLabel: "Source-Backed AOP Basins",
    tone: "source-backed",
    sourceName: "data.gouv.fr BassinsViticolesFranceAOP",
    sourceUrl: "https://www.data.gouv.fr/datasets/cartes-des-grandes-regions-productrices-de-vins-aop-en-france/",
    sourceMethod: "Official broad AOP production-basin GeoJSON fitted to mainland France and Corsica.",
    licenseNote: "Creative Commons Attribution dataset metadata on data.gouv.fr.",
    retrievedAt,
    availableLayers: ["AOP production basins", "Mainland/Corsica outline", "Rivers", "Terrain cues", "City anchors"],
    caveat: "Broad basin geometry only; parcel-level INAO AOC/AOP plans remain authoritative for legal boundaries.",
    nextUpgrade: "Split France into regional plates for Bordeaux, Bourgogne, Champagne, Loire, Rhone, Alsace, Provence, and Languedoc-Roussillon."
  },
  "united-states": {
    tierLabel: "Tier 1 Overview",
    statusLabel: "Official AVA Source Identified",
    tone: "official-target",
    sourceName: "TTB AVA Map Explorer",
    sourceUrl: "https://catalog.data.gov/dataset/ava-map-explorer",
    sourceMethod: "Official AVA GIS source identified; current SVG is still an overview plate until AVA layers are imported.",
    licenseNote: "data.gov metadata lists public access and CC0 licensing.",
    retrievedAt,
    availableLayers: ["Country overview", "Official AVA target source"],
    caveat: "TTB AVA boundary data should be imported before drawing AVA polygons or nested AVA hierarchy.",
    nextUpgrade: "Create USA AVA layer, then California/Oregon/Washington detail plates."
  },
  australia: {
    tierLabel: "Tier 1 Overview",
    statusLabel: "Official GI Source Identified",
    tone: "official-target",
    sourceName: "Wine Australia Geographical Indications",
    sourceUrl: "https://www.wineaustralia.com/labelling/register-of-protected-gis-and-other-terms/australian-wine-geographical-indications",
    sourceMethod: "Official GI hierarchy and GIS boundary source identified; current SVG is still an overview plate.",
    licenseNote: "Reuse needs Wine Australia Open Data Hub license review before shipping derived boundary layers.",
    retrievedAt,
    availableLayers: ["Country overview", "Official GI target source", "Zones/regions/sub-regions target"],
    caveat: "Wine Australia notes GI boundaries are legally defined by textual descriptions in the protected register.",
    nextUpgrade: "Import zones, regions, and sub-regions from Wine Australia Open Data Hub."
  },
  "new-zealand": {
    tierLabel: "Tier 1 Overview",
    statusLabel: "Official Map Source Identified",
    tone: "official-target",
    sourceName: "New Zealand Winegrowers regional maps",
    sourceUrl: "https://www.nzwine.com/en/trade/learning/maps/",
    sourceMethod: "Official regional map source identified; current SVG is still an overview plate.",
    licenseNote: "Professional print files require contacting New Zealand Winegrowers; GIS reuse still needs investigation.",
    retrievedAt,
    availableLayers: ["Country overview", "Official regional-map target source"],
    caveat: "Do not trace or copy official map artwork; use it as a reference until licensed or GIS data is confirmed.",
    nextUpgrade: "Build GI/register-aligned regional layers and compare against NZ Winegrowers maps."
  },
  "south-africa": {
    tierLabel: "Tier 1 Overview",
    statusLabel: "WO Hierarchy Source Identified",
    tone: "official-target",
    sourceName: "Wines of South Africa Wine of Origin scheme",
    sourceUrl: "https://www.wosa.co.za/The-Industry/Wines-Of-Origin/Wine-Of-Origin-Scheme/",
    sourceMethod: "Wine of Origin hierarchy source identified; current SVG is still an overview plate.",
    licenseNote: "SAWIS/WOSA map reuse and GIS licensing need review before drawing boundaries.",
    retrievedAt,
    availableLayers: ["Country overview", "WO regions/districts/wards target"],
    caveat: "Production-area classification must distinguish geographical units, regions, districts, and wards.",
    nextUpgrade: "Import or reconstruct WO regions, districts, and wards from authoritative source data."
  }
};

export function getCountryMapSource(countrySlug: string): CountryMapSourceRecord {
  return countryMapSourceRecords[countrySlug] ?? defaultCountryMapSource;
}
