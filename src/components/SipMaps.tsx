import { useEffect, useRef, useState } from "react";
import { getCountryMapSource } from "../data/mapSources";
import { countriesByContinent } from "../data/regions";
import { getRegionAssetEntry } from "../data/regionAssetManifest";
import { countryMapAssetPath, countryMapDownloadName } from "../lib/countryMaps";
import { VineyardPanoramaViewer, type VineyardPanoramaScene } from "./VineyardPanoramaViewer";

type WineMapId = "north-america" | "south-america" | "europe" | "asia" | "africa" | "oceania";

type WineMapRegion = {
  name: string;
  className?: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  side?: "left" | "right";
};

type WineMapData = {
  id: WineMapId;
  label: string;
  status: "ready" | "coming-soon";
  title: string;
  imageSrc?: string;
  imageAlt: string;
  brief: string;
  regions: WineMapRegion[];
  supportingRegions: string[];
  vineyardScenes?: VineyardPanoramaScene[];
};

type MapDownloadAssets = {
  colorHref: string;
  bwHref: string;
  colorFilename: string;
  bwFilename: string;
};

type RegionalMapAsset = {
  src: string;
  filename: string;
  title: string;
};

type CountryRegionIndexRow = {
  region: string;
  detail?: string;
};

type CountryStudyRegion = CountryRegionIndexRow & {
  iconicVineyard?: string;
  routeSlug?: string;
};

const continentOptions: { id: WineMapId; label: string }[] = [
  { id: "north-america", label: "North America" },
  { id: "south-america", label: "South America" },
  { id: "europe", label: "Europe" },
  { id: "asia", label: "Asia" },
  { id: "africa", label: "Africa" },
  { id: "oceania", label: "Oceania" }
];

const ACTIVE_MAP_STORAGE_KEY = "sip-studies-active-map";
const REGIONAL_CAROUSEL_INTERVAL_MS = 5000;
const REGIONAL_INTERACTION_PAUSE_MS = 10000;

const REGIONAL_FOLDER_BY_MAP: Record<WineMapId, string> = {
  "north-america": "North America",
  "south-america": "South America",
  europe: "Europe",
  asia: "Asia",
  africa: "Africa",
  oceania: "Oceania"
};

const REGIONAL_MAP_VERSIONS: Record<WineMapId, readonly number[]> = {
  "north-america": [1],
  "south-america": [1],
  europe: [2],
  asia: [2],
  africa: [1],
  oceania: [2]
};

const countryRegionIndexOverrides: Record<string, CountryRegionIndexRow[]> = {
  france: [
    { region: "Bordeaux / Sud-Ouest", detail: "Medoc, Graves, Right Bank, Sauternes, Bergerac" },
    { region: "Val de Loire", detail: "Nantais, Anjou-Saumur, Touraine, Centre-Loire" },
    { region: "Champagne", detail: "Reims, Marne, Cote des Blancs, Cote des Bar" },
    { region: "Bourgogne / Beaujolais / Jura / Savoie", detail: "Chablis, Cote d'Or, Maconnais, Beaujolais, Jura, Savoie" },
    { region: "Alsace et Est", detail: "Alsace corridor, Vosges foothills, eastern study belt" },
    { region: "Vallee du Rhone", detail: "Northern Rhone, Southern Rhone, Ventoux, Luberon edge" },
    { region: "Languedoc-Roussillon", detail: "Picpoul, Minervois, Corbieres, Limoux, Roussillon" },
    { region: "Provence-Corse", detail: "Bandol, Cassis, Palette, Cotes de Provence, Corsica" },
    { region: "Toulouse-Pyrenees", detail: "Gaillac, Fronton, Jurancon, Madiran, Irouleguy" },
    { region: "Cognac", detail: "Charente winegrowing base for distillation study" },
    { region: "Armagnac", detail: "Gascogne distillation base and southwest context" },
    { region: "Vins Doux Naturels", detail: "Banyuls, Maury, Rivesaltes, Muscat production sites" }
  ]
};

function slugifyRegionRoute(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function findMatchingProfileRegion(
  regionName: string,
  profileRegions: Array<{ region: string; iconicVineyard: string }>
) {
  const routeSlug = slugifyRegionRoute(regionName);
  return (
    profileRegions.find((region) => slugifyRegionRoute(region.region) === routeSlug) ??
    profileRegions.find((region) => {
      const profileSlug = slugifyRegionRoute(region.region);
      return routeSlug.startsWith(profileSlug) || profileSlug.startsWith(routeSlug);
    }) ??
    null
  );
}

function regionalMapUrl(folderName: string, fileName: string): string {
  return `/maps/Regional/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
}

function getRegionalMaps(mapId: WineMapId): RegionalMapAsset[] {
  const folderName = REGIONAL_FOLDER_BY_MAP[mapId];
  const continentLabel = continentOptions.find((option) => option.id === mapId)?.label ?? "Regional";
  return REGIONAL_MAP_VERSIONS[mapId].map((version) => {
    const fileName = `Wine Map - ${continentLabel} ${version}.0.png`;
    return {
      src: regionalMapUrl(folderName, fileName),
      filename: fileName,
      title: `${continentLabel} Regional Map ${version}`
    };
  });
}

const wineMaps: Record<WineMapId, WineMapData> = {
  "north-america": {
    id: "north-america",
    label: "North America",
    status: "ready",
    title: "North American Wine Regions",
    imageSrc: "/maps/north-america-wine-regions-color.png",
    imageAlt: "Futuristic North American wine regions map artwork",
    brief:
      "A first branded test map for Sip Studies: generated atlas artwork with real Sip Studies seal and wordmark overlays, plus deterministic region labels for study accuracy.",
    regions: [
      { name: "British Columbia", x: 27.2, y: 33.5, labelX: 38.5, labelY: 29.5, side: "right" },
      { name: "Okanagan Valley", x: 28.8, y: 39.8, labelX: 39.5, labelY: 39.0, side: "right" },
      { name: "Willamette Valley", x: 26.2, y: 52.5, labelX: 16.8, labelY: 51.0, side: "left" },
      { name: "Columbia Valley", x: 31.2, y: 50.0, labelX: 42.0, labelY: 50.8, side: "right" },
      { name: "Napa Valley", x: 27.2, y: 64.0, labelX: 17.2, labelY: 62.2, side: "left" },
      { name: "Central Coast", x: 28.0, y: 70.5, labelX: 38.0, labelY: 71.5, side: "right" },
      { name: "Texas Hill Country", x: 43.2, y: 75.0, labelX: 54.0, labelY: 75.5, side: "right" },
      { name: "Finger Lakes", x: 60.2, y: 49.5, labelX: 71.0, labelY: 51.0, side: "right" },
      { name: "Niagara Peninsula", x: 58.2, y: 47.2, labelX: 70.0, labelY: 43.5, side: "right" },
      { name: "Virginia", x: 58.8, y: 61.2, labelX: 70.0, labelY: 61.5, side: "right" },
      { name: "Valle de Guadalupe", x: 31.2, y: 80.5, labelX: 42.5, labelY: 84.5, side: "right" }
    ],
    supportingRegions: ["Sonoma County", "Paso Robles", "Santa Barbara", "Walla Walla", "Ontario", "Quebec"],
    vineyardScenes: [
      {
        id: "usa-napa-valley",
        country: "United States",
        region: "Napa Valley AVA, California",
        title: "Napa Valley Cabernet Benchlands",
        imageSrc: "/panoramas/north-america-napa-valley-360.png",
        imageAlt: "360 vineyard panorama from inside a Napa Valley Cabernet Sauvignon vineyard",
        copy:
          "Step into a Cabernet Sauvignon vineyard framed by volcanic benchland soils, valley fog, and the Mayacamas and Vaca ranges. The restrained stone-estate detail in the distance supports the terroir without taking focus from the vineyard rows.",
        details: ["Cabernet Sauvignon", "Volcanic benchland", "Valley fog", "Mountain corridors"]
      }
    ]
  },
  "south-america": {
    id: "south-america",
    label: "South America",
    status: "ready",
    title: "South American Wine Regions",
    imageSrc: "/maps/south-america-wine-regions-color.png",
    imageAlt: "Futuristic South American wine regions map artwork",
    brief:
      "A Sip Studies atlas map for the major South American wine corridors, designed around Andes elevation, coastal influence, and classic study regions.",
    regions: [
      { name: "Ica", x: 31.8, y: 41.8, labelX: 22.5, labelY: 38.0, side: "left" },
      { name: "Salta", x: 39.6, y: 55.8, labelX: 50.0, labelY: 51.5, side: "right" },
      { name: "Casablanca", x: 35.8, y: 58.6, labelX: 22.0, labelY: 52.8, side: "left" },
      { name: "Maipo Valley", x: 36.6, y: 62.0, labelX: 20.8, labelY: 59.0, side: "left" },
      { name: "Mendoza", x: 41.0, y: 63.2, labelX: 51.0, labelY: 60.0, side: "right" },
      { name: "Uco Valley", x: 41.3, y: 66.4, labelX: 51.5, labelY: 67.5, side: "right" },
      { name: "Colchagua", x: 37.0, y: 67.2, labelX: 21.8, labelY: 65.2, side: "left" },
      { name: "Central Valley", x: 37.4, y: 72.0, labelX: 22.8, labelY: 73.0, side: "left" },
      { name: "Serra Gaucha", x: 57.0, y: 70.0, labelX: 67.5, labelY: 67.2, side: "right" },
      { name: "Canelones", x: 53.8, y: 76.0, labelX: 64.5, labelY: 76.8, side: "right" },
      { name: "Patagonia", x: 41.2, y: 82.0, labelX: 25.0, labelY: 84.2, side: "left" }
    ],
    supportingRegions: ["Aconcagua", "Limari", "Curico", "Bio Bio", "San Juan", "Cafayate", "Campanha", "Vale dos Vinhedos"],
    vineyardScenes: [
      {
        id: "argentina-uco-valley",
        country: "Argentina",
        region: "Uco Valley, Mendoza",
        title: "Uco Valley Malbec Andes Terrace",
        imageSrc: "/panoramas/south-america-mendoza-360.png",
        imageAlt: "360 vineyard panorama from inside a high-elevation Mendoza Malbec vineyard",
        copy:
          "Stand inside Uco Valley's high-elevation Malbec rows with alluvial stones underfoot and the Andes spanning the horizon. A subtle contemporary bodega detail in the distance adds place context without overpowering the terroir.",
        details: ["Malbec", "High elevation", "Alluvial soils", "Andes foothills"]
      }
    ]
  },
  europe: {
    id: "europe",
    label: "Europe",
    status: "ready",
    title: "European Wine Regions",
    imageSrc: "/maps/europe-wine-regions-color.png",
    imageAlt: "Futuristic European wine regions map artwork",
    brief:
      "A Sip Studies atlas map for Europe's old-world wine spine, built around coastal trade routes, mountain corridors, river valleys, and classic appellation study zones.",
    regions: [
      { name: "Kent", x: 27.0, y: 41.5, labelX: 15.5, labelY: 38.5, side: "left" },
      { name: "Champagne", x: 37.0, y: 53.0, labelX: 25.2, labelY: 49.2, side: "left" },
      { name: "Loire Valley", x: 30.5, y: 58.0, labelX: 17.2, labelY: 56.8, side: "left" },
      { name: "Burgundy", x: 36.5, y: 60.2, labelX: 25.0, labelY: 62.0, side: "left" },
      { name: "Bordeaux", x: 27.5, y: 67.6, labelX: 15.0, labelY: 66.0, side: "left" },
      { name: "Rhone Valley", x: 36.8, y: 68.5, labelX: 46.5, labelY: 67.0, side: "right" },
      { name: "Douro", x: 16.0, y: 73.0, labelX: 8.2, labelY: 72.0, side: "left" },
      { name: "Rioja", x: 24.2, y: 73.2, labelX: 15.0, labelY: 78.2, side: "left" },
      { name: "Priorat", x: 30.3, y: 80.0, labelX: 39.0, labelY: 83.0, side: "right" },
      { name: "Mosel", x: 40.2, y: 50.0, labelX: 49.0, labelY: 45.5, side: "right" },
      { name: "Piedmont", x: 42.3, y: 67.0, labelX: 52.0, labelY: 63.8, side: "right" },
      { name: "Tuscany", x: 45.3, y: 73.0, labelX: 55.0, labelY: 72.2, side: "right" },
      { name: "Wachau", x: 51.0, y: 59.0, labelX: 61.0, labelY: 55.8, side: "right" },
      { name: "Tokaj", x: 57.5, y: 59.0, labelX: 68.0, labelY: 60.0, side: "right" },
      { name: "Santorini", x: 65.5, y: 84.0, labelX: 75.5, labelY: 83.0, side: "right" }
    ],
    supportingRegions: [
      "Alsace",
      "Provence",
      "Jerez",
      "Vinho Verde",
      "Galicia",
      "Ribera del Duero",
      "Valpolicella",
      "Etna",
      "Istria",
      "Douro Superior"
    ],
    vineyardScenes: [
      {
        id: "france-cote-de-nuits",
        country: "France",
        region: "Cote de Nuits, Burgundy",
        title: "Cote de Nuits Limestone Pinot Slope",
        imageSrc: "/panoramas/europe-burgundy-360.png",
        imageAlt: "360 vineyard panorama from inside a Burgundy Pinot Noir vineyard",
        copy:
          "Walk the limestone-clay Pinot Noir rows of Cote de Nuits with low stone walls, morning mist, and a subtle Burgundian estate silhouette. The scene prioritizes vineyard topography and soil-driven identity over architectural emphasis.",
        details: ["Pinot Noir", "Limestone-clay soils", "Cote slope", "Continental mornings"]
      }
    ]
  },
  asia: {
    id: "asia",
    label: "Asia",
    status: "coming-soon",
    title: "Asian Wine Regions",
    imageAlt: "Futuristic Asian wine regions map artwork",
    brief:
      "A Sip Studies atlas map for Asia's historic and emerging wine corridors, connecting Caucasus origins, eastern Mediterranean mountain valleys, and high-elevation new-world study zones.",
    regions: [
      { name: "Anatolia", x: 16.8, y: 35.5, labelX: 7.2, labelY: 34.0, side: "left" },
      { name: "Kakheti", x: 22.8, y: 31.0, labelX: 33.0, labelY: 28.5, side: "right" },
      { name: "Vayots Dzor", x: 22.4, y: 36.5, labelX: 33.8, labelY: 36.0, side: "right" },
      { name: "Bekaa Valley", x: 18.4, y: 44.5, labelX: 7.5, labelY: 44.8, side: "left" },
      { name: "Judean Hills", x: 18.2, y: 50.2, labelX: 7.8, labelY: 52.0, side: "left" },
      { name: "Almaty", x: 49.5, y: 38.0, labelX: 59.0, labelY: 35.0, side: "right" },
      { name: "Xinjiang", x: 56.8, y: 44.0, labelX: 66.0, labelY: 42.0, side: "right" },
      { name: "Nashik", x: 43.8, y: 66.0, labelX: 33.5, labelY: 66.8, side: "left" },
      { name: "Ningxia", x: 74.0, y: 50.0, labelX: 63.5, labelY: 50.0, side: "left" },
      { name: "Yantai", x: 82.0, y: 54.0, labelX: 91.0, labelY: 52.0, side: "right" },
      { name: "Yamanashi", x: 91.0, y: 50.0, labelX: 82.8, labelY: 45.5, side: "left" },
      { name: "Khao Yai", x: 68.5, y: 74.0, labelX: 79.0, labelY: 73.0, side: "right" }
    ],
    supportingRegions: [
      "Thrace",
      "Cappadocia",
      "Golan Heights",
      "Shanxi",
      "Hebei",
      "Shandong",
      "Yunnan",
      "Nagano",
      "Hokkaido",
      "Asoke Valley"
    ],
    vineyardScenes: [
      {
        id: "japan-yamanashi",
        country: "Japan",
        region: "Yamanashi, Koshu Basin",
        title: "Yamanashi Koshu Foothill Vineyard",
        imageSrc: "/panoramas/asia-yamanashi-360.png",
        imageAlt: "360 vineyard panorama from inside a Yamanashi Koshu vineyard",
        copy:
          "Stand in Yamanashi's Koshu rows with volcanic and alluvial soils, mountain airflow, and a distant Mount Fuji profile. The scene keeps architecture subtle so the vineyard geometry and basin context drive the terroir study experience.",
        details: ["Koshu", "Volcanic-alluvial soils", "Mountain airflow", "Basin viticulture"]
      }
    ]
  },
  africa: {
    id: "africa",
    label: "Africa",
    status: "ready",
    title: "African Wine Regions",
    imageSrc: "/maps/africa-wine-regions-color.png",
    imageAlt: "Futuristic African wine regions map artwork",
    brief:
      "A Sip Studies atlas map for Africa's wine-growing belt, moving from Mediterranean North Africa through highland equatorial sites to the maritime and mountain-cooled regions of Southern Africa.",
    regions: [
      { name: "Meknes", x: 24.5, y: 24.0, labelX: 13.5, labelY: 22.0, side: "left" },
      { name: "Mascara", x: 36.2, y: 20.8, labelX: 26.0, labelY: 17.2, side: "left" },
      { name: "Cap Bon", x: 43.5, y: 17.8, labelX: 54.0, labelY: 15.8, side: "right" },
      { name: "Nile Delta", x: 61.8, y: 24.5, labelX: 72.0, labelY: 23.0, side: "right" },
      { name: "Rift Valley Ethiopia", x: 68.5, y: 47.0, labelX: 80.0, labelY: 45.0, side: "right" },
      { name: "Kenya Highlands", x: 69.8, y: 56.0, labelX: 81.0, labelY: 56.5, side: "right" },
      { name: "Dodoma", x: 67.8, y: 65.5, labelX: 79.0, labelY: 66.2, side: "right" },
      { name: "Namibia", x: 51.5, y: 76.5, labelX: 41.0, labelY: 76.0, side: "left" },
      { name: "Eastern Highlands", x: 62.8, y: 80.0, labelX: 74.5, labelY: 80.8, side: "right" },
      { name: "Swartland", x: 48.5, y: 88.5, labelX: 35.0, labelY: 86.0, side: "left" },
      { name: "Stellenbosch", x: 51.5, y: 90.8, labelX: 35.0, labelY: 92.0, side: "left" },
      { name: "Walker Bay", x: 55.0, y: 91.8, labelX: 67.0, labelY: 90.2, side: "right" }
    ],
    supportingRegions: [
      "Paarl",
      "Constantia",
      "Franschhoek",
      "Elgin",
      "Robertson",
      "Mornag",
      "Medea",
      "Cape Winelands",
      "Limpopo",
      "Zimbabwe"
    ],
    vineyardScenes: [
      {
        id: "south-africa-stellenbosch",
        country: "South Africa",
        region: "Stellenbosch, Cape Winelands",
        title: "Stellenbosch Mountain Bench Vineyard",
        imageSrc: "/panoramas/africa-stellenbosch-360.png",
        imageAlt: "360 vineyard panorama from inside a Stellenbosch vineyard in South Africa",
        copy:
          "Step into Stellenbosch vineyard rows shaped by decomposed granite soils, warm dry afternoons, and ocean-moderated mountain airflow. A subtle Cape Dutch estate silhouette in the distance supports terroir context while keeping focus on vine structure and landscape.",
        details: ["Cabernet Sauvignon", "Chenin Blanc", "Decomposed granite", "Maritime mountain influence"]
      }
    ]
  },
  oceania: {
    id: "oceania",
    label: "Oceania",
    status: "ready",
    title: "Oceania Wine Regions",
    imageSrc: "/maps/oceania-wine-regions-color.png",
    imageAlt: "Futuristic Oceania wine regions map artwork",
    brief:
      "A Sip Studies atlas map for Oceania's maritime wine regions, tracking Australia's coastal and highland corridors alongside Tasmania and New Zealand's cool-climate study zones.",
    regions: [
      { name: "Margaret River", x: 11.0, y: 51.5, labelX: 4.8, labelY: 45.0, side: "left" },
      { name: "Swan District", x: 15.0, y: 48.5, labelX: 4.5, labelY: 53.5, side: "left" },
      { name: "Barossa Valley", x: 41.0, y: 65.5, labelX: 29.0, labelY: 63.0, side: "left" },
      { name: "Clare Valley", x: 40.0, y: 60.8, labelX: 29.0, labelY: 57.5, side: "left" },
      { name: "Coonawarra", x: 45.8, y: 72.8, labelX: 55.8, labelY: 75.0, side: "right" },
      { name: "McLaren Vale", x: 42.0, y: 70.5, labelX: 30.0, labelY: 71.0, side: "left" },
      { name: "Adelaide Hills", x: 44.0, y: 67.0, labelX: 54.0, labelY: 63.8, side: "right" },
      { name: "Yarra Valley", x: 50.5, y: 73.5, labelX: 60.8, labelY: 70.5, side: "right" },
      { name: "Mornington Peninsula", x: 51.5, y: 77.0, labelX: 61.8, labelY: 77.0, side: "right" },
      { name: "Tasmania", x: 50.8, y: 85.0, labelX: 61.5, labelY: 86.5, side: "right" },
      { name: "Marlborough", x: 81.0, y: 74.5, labelX: 90.5, labelY: 71.0, side: "right" },
      { name: "Martinborough", x: 84.0, y: 79.5, labelX: 94.0, labelY: 80.0, side: "right" },
      { name: "Hawke's Bay", x: 86.5, y: 72.0, labelX: 94.0, labelY: 65.5, side: "right" },
      { name: "Central Otago", x: 79.5, y: 88.0, labelX: 91.5, labelY: 88.5, side: "right" }
    ],
    supportingRegions: [
      "Hunter Valley",
      "Eden Valley",
      "Great Southern",
      "Geelong",
      "Canberra District",
      "Gisborne",
      "Nelson",
      "Waipara",
      "Wairarapa"
    ],
    vineyardScenes: [
      {
        id: "new-zealand-marlborough",
        country: "New Zealand",
        region: "Marlborough, South Island",
        title: "Marlborough Sauvignon Blanc Valley",
        imageSrc: "/panoramas/oceania-marlborough-360.png",
        imageAlt: "360 vineyard panorama from inside a Marlborough Sauvignon Blanc vineyard",
        copy:
          "Step into Marlborough's Wairau Valley rows with cool maritime airflow, alluvial river plain textures, and mountain-framed horizons. The distant cellar architecture remains understated so the terroir profile and vineyard geometry stay central to study.",
        details: ["Sauvignon Blanc", "Alluvial plain", "Cool maritime climate", "Mountain rain-shadow influence"]
      }
    ]
  }
};

export function SipMaps() {
  const [activeMapId, setActiveMapId] = useState<WineMapId>(() => {
    if (typeof window === "undefined") return "north-america";
    const saved = window.localStorage.getItem(ACTIVE_MAP_STORAGE_KEY);
    return continentOptions.some((option) => option.id === saved) ? (saved as WineMapId) : "north-america";
  });
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [regionalMaps, setRegionalMaps] = useState<RegionalMapAsset[]>([]);
  const [regionalMapIndex, setRegionalMapIndex] = useState(0);
  const [countryMapIndex, setCountryMapIndex] = useState(0);
  const [countryRegionIndex, setCountryRegionIndex] = useState(0);
  const [activeAtlasRegionName, setActiveAtlasRegionName] = useState<string | null>(null);
  const [regionalLoading, setRegionalLoading] = useState(false);
  const regionalPauseUntilRef = useRef(0);
  const activeMap = wineMaps[activeMapId];
  const showComingSoonNotice = activeMap.status === "coming-soon";
  const activeRegionalMap = regionalMaps[regionalMapIndex] ?? null;
  const activeCountryMaps = countriesByContinent[activeMapId] ?? [];
  const activeCountryMap = activeCountryMaps[countryMapIndex] ?? null;
  const activeCountryMapSource = activeCountryMap ? getCountryMapSource(activeCountryMap.slug) : null;
  const activeCountryRegionIndex = activeCountryMap
    ? countryRegionIndexOverrides[activeCountryMap.slug] ??
      activeCountryMap.profile.majorRegions.map((region) => ({ region: region.region }))
    : [];
  const activeCountryStudyRegions: CountryStudyRegion[] = activeCountryMap
    ? activeCountryRegionIndex.map((region) => {
        const matchingProfileRegion = findMatchingProfileRegion(region.region, activeCountryMap.profile.majorRegions);
        return {
          ...region,
          iconicVineyard: matchingProfileRegion?.iconicVineyard,
          routeSlug: matchingProfileRegion ? slugifyRegionRoute(matchingProfileRegion.region) : undefined
        };
      })
    : [];
  const activeCountryRegion = activeCountryStudyRegions[countryRegionIndex] ?? null;
  const activeCountryRegionAsset =
    activeCountryMap && activeCountryRegion?.routeSlug
      ? getRegionAssetEntry("wine", activeCountryMap.slug, activeCountryRegion.routeSlug)
      : null;
  const activeCountryAsset = activeCountryMap ? getRegionAssetEntry("wine", activeCountryMap.slug) : null;
  const activeCountryRegionImage =
    activeCountryRegionAsset?.imageUrl ??
    activeCountryAsset?.imageUrl ??
    activeCountryMap?.profile.countryImageUrl ??
    null;
  const activeAtlasRegion =
    activeMap.regions.find((region) => region.name === activeAtlasRegionName) ?? activeMap.regions[0] ?? null;
  const mapDownloadAssets: MapDownloadAssets | null =
    activeMap.status === "ready"
      ? {
          colorHref: `/maps/${activeMap.id}-wine-regions-color.png`,
          bwHref: `/maps/Print-Outs/${activeMap.id}-wine-regions-b&w.png`,
          colorFilename: `${activeMap.id}-wine-regions-color.png`,
          bwFilename: `${activeMap.id}-wine-regions-b&w.png`
        }
      : null;

  useEffect(() => {
    window.localStorage.setItem(ACTIVE_MAP_STORAGE_KEY, activeMapId);
  }, [activeMapId]);

  useEffect(() => {
    setShowDownloadOptions(false);
    setCountryMapIndex(0);
    setCountryRegionIndex(0);
    setActiveAtlasRegionName(null);
  }, [activeMapId]);

  useEffect(() => {
    setCountryRegionIndex(0);
  }, [activeCountryMap?.slug]);

  useEffect(() => {
    regionalPauseUntilRef.current = 0;
    setRegionalMapIndex(0);
    setRegionalLoading(true);
    setRegionalMaps(getRegionalMaps(activeMapId));
    setRegionalLoading(false);
  }, [activeMapId]);

  useEffect(() => {
    if (regionalMaps.length <= 1) return;

    const intervalId = window.setInterval(() => {
      if (Date.now() < regionalPauseUntilRef.current) return;
      setRegionalMapIndex((current) => (current + 1) % regionalMaps.length);
    }, REGIONAL_CAROUSEL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [regionalMaps.length]);

  useEffect(() => {
    setRegionalMapIndex((current) => {
      if (regionalMaps.length === 0) return 0;
      return current >= regionalMaps.length ? 0 : current;
    });
  }, [regionalMaps.length]);

  const pauseRegionalCarousel = () => {
    regionalPauseUntilRef.current = Date.now() + REGIONAL_INTERACTION_PAUSE_MS;
  };

  const goToPreviousRegionalMap = () => {
    if (regionalMaps.length <= 1) return;
    pauseRegionalCarousel();
    setRegionalMapIndex((current) => (current - 1 + regionalMaps.length) % regionalMaps.length);
  };

  const goToNextRegionalMap = () => {
    if (regionalMaps.length <= 1) return;
    pauseRegionalCarousel();
    setRegionalMapIndex((current) => (current + 1) % regionalMaps.length);
  };

  const goToPreviousCountryMap = () => {
    if (activeCountryMaps.length <= 1) return;
    setCountryMapIndex((current) => (current - 1 + activeCountryMaps.length) % activeCountryMaps.length);
  };

  const goToNextCountryMap = () => {
    if (activeCountryMaps.length <= 1) return;
    setCountryMapIndex((current) => (current + 1) % activeCountryMaps.length);
  };

  return (
    <section className="sip-maps">
      <header className="sip-maps-hero">
        <div>
          <p className="sip-maps-kicker">Sip Studios Maps</p>
          <h2>{activeMap.title}</h2>
          <p>{activeMap.brief}</p>
          <p className="hint">Goal: locate the primary regions, name one climate influence, then verify your answer on the map.</p>
        </div>
        <div className="sip-maps-actions">
          <p className="sip-map-select-label">Select Continent</p>
          <div className="sip-map-button-group" role="group" aria-label="Select Continent">
            {continentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`sip-map-button${option.id === activeMapId ? " is-active" : ""}`}
                onClick={() => setActiveMapId(option.id)}
                aria-pressed={option.id === activeMapId}
              >
                {option.label}
              </button>
            ))}
          </div>
          <span>{showComingSoonNotice ? "Coming Soon" : "Select a map marker to focus a wine region."}</span>
        </div>
      </header>

      <div className="sip-maps-layout">
        <div className="sip-map-stage">
          <article
            className={`sip-map-frame sip-map-frame--${activeMap.id}`}
            aria-label={`${activeMap.label} wine regions map`}
          >
            {activeMap.imageSrc ? (
              <img className="sip-map-generated-image" src={activeMap.imageSrc} alt={activeMap.imageAlt} />
            ) : (
              <div className="sip-map-coming-soon">
                <p>{activeMap.label}</p>
                <strong>Map Coming Soon</strong>
                <span>This continent is queued for Sip Studies wine cartography.</span>
              </div>
            )}
            {activeMap.imageSrc && activeMap.regions.length > 0 ? (
              <div className="sip-map-hotspot-layer" aria-label={`${activeMap.label} interactive wine regions`}>
                {activeMap.regions.map((region, index) => {
                  const isSelected = activeAtlasRegion?.name === region.name;
                  return (
                    <button
                      key={region.name}
                      type="button"
                      className={`sip-map-hotspot${isSelected ? " is-active" : ""}`}
                      style={{ left: `${region.x}%`, top: `${region.y}%` }}
                      aria-label={`Focus ${region.name}`}
                      aria-pressed={isSelected}
                      onClick={() => setActiveAtlasRegionName(region.name)}
                    >
                      <span className="sip-map-hotspot-number">{index + 1}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}
            {showComingSoonNotice ? <span className="sip-map-coming-soon-badge">Coming Soon</span> : null}
          </article>

          {mapDownloadAssets ? (
            <div className="sip-map-download-controls">
              <button type="button" className="sip-map-download-toggle" onClick={() => setShowDownloadOptions((current) => !current)}>
                {showDownloadOptions ? "Hide Download Options" : "Download Atlas PNG"}
              </button>
              {showDownloadOptions ? (
                <div className="sip-map-download-actions">
                  <a className="sip-map-download-link" href={mapDownloadAssets.colorHref} download={mapDownloadAssets.colorFilename}>
                    Color Map
                  </a>
                  <a className="sip-map-download-link" href={mapDownloadAssets.bwHref} download={mapDownloadAssets.bwFilename}>
                    B&W Map
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside className="sip-map-control-panel">
          <div className="sip-map-panel-card">
            <p className="sip-maps-kicker">Map Brief</p>
            <h3>{activeMap.title}</h3>
            <p>{activeMap.brief}</p>
            {activeAtlasRegion ? (
              <div className="sip-map-active-region" aria-live="polite">
                <span>Focused wine region</span>
                <strong>{activeAtlasRegion.name}</strong>
                <small>Find marker {activeMap.regions.findIndex((region) => region.name === activeAtlasRegion.name) + 1} on the atlas.</small>
              </div>
            ) : null}
          </div>

          <div className="sip-map-panel-card">
            <p className="sip-maps-kicker">Primary Callouts</p>
            <div className="sip-map-region-list">
              {activeMap.regions.map((region) => (
                <button
                  key={region.name}
                  type="button"
                  className={activeAtlasRegion?.name === region.name ? "is-active" : ""}
                  aria-pressed={activeAtlasRegion?.name === region.name}
                  onClick={() => setActiveAtlasRegionName(region.name)}
                >
                  {region.name}
                </button>
              ))}
              {activeMap.regions.length === 0 ? <span>Queued</span> : null}
            </div>
          </div>

          <div className="sip-map-panel-card">
            <p className="sip-maps-kicker">Supporting Regions</p>
            <div className="sip-map-region-list">
              {activeMap.supportingRegions.map((region) => (
                <span key={region}>{region}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="sip-map-panel-card" aria-label={`${activeMap.label} recall prompt`}>
        <p className="sip-maps-kicker">Try Before You Browse</p>
        <h3>Point to three primary regions from memory.</h3>
        <p>
          Then explain one geographic or climate feature that shapes the beverage style. Use the callouts above to check
          your answer before opening the deeper atlas.
        </p>
      </section>

      <section className="sip-maps-deep-study always-visible-section">
        <h3 className="always-visible-section-title">Deep dive: 360 views, regional downloads, and country plates</h3>
      {activeMap.vineyardScenes && activeMap.vineyardScenes.length > 0 ? (
        <VineyardPanoramaViewer scenes={activeMap.vineyardScenes} />
      ) : null}

      <section className="sip-regional-maps" aria-label={`${activeMap.label} regional map downloads`}>
        <header className="sip-regional-maps-header">
          <p className="sip-maps-kicker">Regional Atlas</p>
          <h3>{activeMap.label} Study Map</h3>
          <p>Use this wider regional view to compare geography before moving into a country atlas.</p>
        </header>

        <div className="sip-regional-carousel">
          <div className="sip-regional-frame">
            {activeRegionalMap ? (
              <img
                className="sip-regional-image"
                src={activeRegionalMap.src}
                alt={`${activeMap.label} regional map ${regionalMapIndex + 1}`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="sip-regional-empty">
                <strong>{regionalLoading ? "Loading regional maps..." : "Regional maps coming soon"}</strong>
                <span>
                  {regionalLoading
                    ? "Preparing the selected regional map."
                    : "A regional study map is not available yet."}
                </span>
              </div>
            )}

            {regionalMaps.length > 1 ? (
              <>
                <button
                  type="button"
                  className="sip-regional-nav sip-regional-nav--left"
                  aria-label="Previous regional map"
                  onClick={goToPreviousRegionalMap}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="sip-regional-nav sip-regional-nav--right"
                  aria-label="Next regional map"
                  onClick={goToNextRegionalMap}
                >
                  ›
                </button>
              </>
            ) : null}
          </div>

          <div className="sip-regional-controls">
            {regionalMaps.length > 1 ? (
              <>
                <button type="button" className="sip-regional-step-btn" onClick={goToPreviousRegionalMap}>
                  Previous Map
                </button>
                <button type="button" className="sip-regional-step-btn" onClick={goToNextRegionalMap}>
                  Next Map
                </button>
              </>
            ) : null}
            {activeRegionalMap ? (
              <a className="sip-regional-download" href={activeRegionalMap.src} download={activeRegionalMap.filename}>
                Download Regional Map
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="sip-country-maps" aria-label={`${activeMap.label} country map downloads`}>
        <header className="sip-regional-maps-header">
          <p className="sip-maps-kicker">Interactive Country Atlas</p>
          <h3>Explore {activeMap.label} by wine region</h3>
          <p>Choose a country, then select any listed region to turn the map into a focused study path.</p>
        </header>

        <div className="sip-country-atlas-toolbar">
          <div className="sip-country-selector" role="group" aria-label={`Choose a ${activeMap.label} country map`}>
            {activeCountryMaps.map((country, index) => {
              const isActive = activeCountryMap?.slug === country.slug;
              return (
                <button
                  key={country.slug}
                  type="button"
                  aria-pressed={isActive}
                  className={`sip-country-map-chip${isActive ? " is-active" : ""}`}
                  onClick={() => setCountryMapIndex(index)}
                >
                  {country.name}
                </button>
              );
            })}
          </div>
          {activeCountryMap ? (
            <p className="sip-country-atlas-status" aria-live="polite">
              {activeCountryMap.name} · country {countryMapIndex + 1} of {activeCountryMaps.length}
            </p>
          ) : null}
        </div>

        {activeCountryMap ? (
          <div className="sip-country-map-layout">
            <figure className="sip-country-map-frame">
              <div className="sip-country-map-frame-head">
                <span>Country atlas</span>
                <strong>{activeCountryMap.name}</strong>
              </div>
              <img
                className="sip-country-map-image"
                src={countryMapAssetPath(activeCountryMap)}
                alt={`${activeCountryMap.name} Sip Studies regional wine map`}
                loading="lazy"
                decoding="async"
              />
              <figcaption>Select a wine region below, then use the focused study card to continue.</figcaption>
            </figure>

            <aside className="sip-country-map-panel" aria-label={`${activeCountryMap.name} selected region`}>
              <div>
                <p className="sip-maps-kicker">Selected Wine Region</p>
                <h3>{activeCountryRegion?.region ?? activeCountryMap.name}</h3>
              </div>
              {activeCountryRegionImage ? (
                <div className="sip-country-region-photo">
                  <img
                    src={activeCountryRegionImage}
                    alt={`${activeCountryRegion?.region ?? activeCountryMap.name} vineyard study landscape`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = countryMapAssetPath(activeCountryMap);
                      event.currentTarget.classList.add("is-map-fallback");
                    }}
                  />
                </div>
              ) : null}
              <p>
                {activeCountryRegion?.detail ??
                  activeCountryRegion?.iconicVineyard ??
                  `Use the ${activeCountryMap.name} map to locate this region before opening its full study guide.`}
              </p>
              <div className="sip-country-study-sequence" aria-label="Study sequence">
                <span>1 · Locate</span>
                <span>2 · Name</span>
                <span>3 · Explain</span>
              </div>
              <div className="sip-country-map-actions" aria-label={`${activeCountryMap.name} study actions`}>
                <a className="sip-regional-download is-primary" href={`#app/regions/wine/${activeCountryMap.slug}`}>
                  Open Country Guide
                </a>
              </div>
            </aside>

            {activeCountryStudyRegions.length > 0 ? (
              <div className="sip-country-region-index" aria-label={`${activeCountryMap.name} interactive wine region index`}>
                <div className="sip-country-region-index-head">
                  <div>
                    <p className="sip-maps-kicker">Wine Regions</p>
                    <strong>Choose a region to focus the lesson</strong>
                  </div>
                  <span>
                    {countryRegionIndex + 1} of {activeCountryStudyRegions.length}
                  </span>
                </div>
                <div className="sip-country-region-grid" role="group" aria-label={`${activeCountryMap.name} wine regions`}>
                  {activeCountryStudyRegions.map((region, index) => {
                    const isActive = countryRegionIndex === index;
                    return (
                      <button
                        key={`${activeCountryMap.slug}-${region.region}`}
                        type="button"
                        aria-pressed={isActive}
                        className={`sip-country-region-button${isActive ? " is-active" : ""}`}
                        onClick={() => setCountryRegionIndex(index)}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>
                          {region.region}
                          {region.detail ? <small>{region.detail}</small> : null}
                        </strong>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <footer className="sip-country-atlas-footer">
              {activeCountryMapSource ? (
                <div className={`sip-country-source-credit sip-map-source-panel--${activeCountryMapSource.tone}`}>
                  <span>Map source</span>
                  <strong>{activeCountryMapSource.statusLabel}</strong>
                  <p>
                    {activeCountryMapSource.sourceUrl ? (
                      <a href={activeCountryMapSource.sourceUrl} target="_blank" rel="noreferrer">
                        {activeCountryMapSource.sourceName}
                      </a>
                    ) : (
                      activeCountryMapSource.sourceName
                    )}
                  </p>
                </div>
              ) : null}
              <div className="sip-country-atlas-footer-actions">
                <a
                  className="sip-regional-download"
                  href={countryMapAssetPath(activeCountryMap)}
                  download={countryMapDownloadName(activeCountryMap)}
                >
                  Download Map
                </a>
                {activeCountryMaps.length > 1 ? (
                  <>
                    <button type="button" className="sip-regional-step-btn" onClick={goToPreviousCountryMap}>
                      Previous Country
                    </button>
                    <button type="button" className="sip-regional-step-btn" onClick={goToNextCountryMap}>
                      Next Country
                    </button>
                  </>
                ) : null}
              </div>
            </footer>
          </div>
        ) : (
          <div className="sip-regional-empty">
            <strong>Country maps coming soon</strong>
            <span>No country pages are currently assigned to this continent.</span>
          </div>
        )}
      </section>
      </section>
    </section>
  );
}
