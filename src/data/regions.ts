import exactRegionProfiles from "./regionsExact.json";
import { categoryCountryProfiles } from "./categoryRegionProfiles";

export type ContinentId = "europe" | "north-america" | "south-america" | "oceania" | "africa" | "asia";

export type RegionImage = {
  region: string;
  iconicVineyard: string;
  imageUrl: string;
};

export type CountryProfile = {
  winesOverview: string;
  countryImageUrl: string;
  location: string;
  terroir: string;
  whiteGrapes: string[];
  redGrapes: string[];
  productionStyle: string;
  servingStyle: string;
  regulations: string;
  terminology: string[];
  resources: Array<{ label: string; url: string }>;
  nearbyTowns: string[];
  majorRegions: RegionImage[];
};

export type RegionCountry = {
  name: string;
  slug: string;
  continent: ContinentId;
  continentLabel: string;
  profile: CountryProfile;
};

export type RegionBeverageCategoryId =
  | "wine"
  | "beer"
  | "spirits"
  | "coffee"
  | "tea"
  | "kombucha"
  | "juice"
  | "milk"
  | "water";

export const continentOrder: ContinentId[] = ["europe", "north-america", "south-america", "oceania", "africa", "asia"];

export const continentLabels: Record<ContinentId, string> = {
  europe: "Europe",
  "north-america": "North America",
  "south-america": "South America",
  oceania: "Oceania",
  africa: "Africa",
  asia: "Asia"
};

export const regionBeverageCategoryOrder: RegionBeverageCategoryId[] = [
  "wine",
  "beer",
  "spirits",
  "coffee",
  "tea",
  "kombucha",
  "juice",
  "milk",
  "water"
];

export const regionBeverageCategoryLabels: Record<RegionBeverageCategoryId, string> = {
  wine: "Wine",
  beer: "Beer",
  spirits: "Spirits",
  coffee: "Coffee",
  tea: "Tea",
  kombucha: "Kombucha",
  juice: "Juice",
  milk: "Milk",
  water: "Water"
};

export type RegionCategoryStudyLabels = {
  overviewTitle: string;
  sourceConditionsTitle: string;
  productionTitle: string;
  servingTitle: string;
  regulationTitle: string;
  primaryListTitle: string;
  secondaryListTitle: string;
  terminologyTitle: string;
  townsTitle: string;
  resourcesTitle: string;
  carouselTitle: string;
  countryImageAlt: string;
  cardImageAlt: string;
  subregionIndexKicker: string;
  subregionIndexTitle: string;
  subregionPrimaryTitle: string;
  subregionSecondaryTitle: string;
  mapKicker: string;
  mapTitle: string;
  mapDescription: string;
  mapAlt: string;
};

export const regionCategoryStudyLabels: Record<RegionBeverageCategoryId, RegionCategoryStudyLabels> = {
  wine: {
    overviewTitle: "Country's Wines Overview",
    sourceConditionsTitle: "Terroir",
    productionTitle: "Style of Production",
    servingTitle: "Style of Serving (their wines)",
    regulationTitle: "Regulations",
    primaryListTitle: "Top 10 White Grape Varieties",
    secondaryListTitle: "Top 10 Red Grape Varieties",
    terminologyTitle: "Terminology",
    townsTitle: "Biggest Towns Nearby (for tourism)",
    resourcesTitle: "Resources for Further Exploration",
    carouselTitle: "Major Regions and Iconic Vineyards",
    countryImageAlt: "country wine landscape",
    cardImageAlt: "vineyards",
    subregionIndexKicker: "Detailed Sub-region Pages",
    subregionIndexTitle: "Exam Study Regions",
    subregionPrimaryTitle: "White Grapes",
    subregionSecondaryTitle: "Red Grapes",
    mapKicker: "A.I. Country Map",
    mapTitle: "Regional Study Map",
    mapDescription: "First-batch Sip Studios country map plate for the regions, grapes, and service context taught on this page.",
    mapAlt: "Sip Studies regional wine map"
  },
  beer: {
    overviewTitle: "Country Beer Overview",
    sourceConditionsTitle: "Raw Material Geography",
    productionTitle: "Brewing Production Pattern",
    servingTitle: "Beer Service Pattern",
    regulationTitle: "Rules and Source Claims",
    primaryListTitle: "Key Inputs",
    secondaryListTitle: "Testable Styles",
    terminologyTitle: "Beer Terminology",
    townsTitle: "Production and Service Gateways",
    resourcesTitle: "Source and Trade References",
    carouselTitle: "Major Beer Regions and Source Corridors",
    countryImageAlt: "beer source landscape",
    cardImageAlt: "beer source region",
    subregionIndexKicker: "Detailed Beer Region Pages",
    subregionIndexTitle: "Beer Exam Study Regions",
    subregionPrimaryTitle: "Inputs",
    subregionSecondaryTitle: "Styles",
    mapKicker: "A.I. Beer Map",
    mapTitle: "Beer Source Study Map",
    mapDescription: "Study plate for raw materials, brewing corridors, technical terms, and service context taught on this page.",
    mapAlt: "Sip Studies beer source map"
  },
  spirits: {
    overviewTitle: "Country Spirits Overview",
    sourceConditionsTitle: "Agricultural and Distillation Geography",
    productionTitle: "Distillation Production Pattern",
    servingTitle: "Spirits Service Pattern",
    regulationTitle: "Appellation and Label Rules",
    primaryListTitle: "Key Raw Materials",
    secondaryListTitle: "Testable Spirits",
    terminologyTitle: "Spirits Terminology",
    townsTitle: "Production and Tourism Gateways",
    resourcesTitle: "Source and Regulatory References",
    carouselTitle: "Major Spirits Regions and Source Corridors",
    countryImageAlt: "spirits source landscape",
    cardImageAlt: "spirits source region",
    subregionIndexKicker: "Detailed Spirits Region Pages",
    subregionIndexTitle: "Spirits Exam Study Regions",
    subregionPrimaryTitle: "Raw Materials",
    subregionSecondaryTitle: "Spirit Styles",
    mapKicker: "A.I. Spirits Map",
    mapTitle: "Spirits Source Study Map",
    mapDescription: "Study plate for legally defined regions, raw materials, distillation choices, maturation, and service context taught on this page.",
    mapAlt: "Sip Studies spirits source map"
  },
  coffee: {
    overviewTitle: "Country Coffee Overview",
    sourceConditionsTitle: "Coffee Terroir and Processing Conditions",
    productionTitle: "Coffee Production Pattern",
    servingTitle: "Coffee Service Pattern",
    regulationTitle: "Quality and Traceability Rules",
    primaryListTitle: "Key Coffee Inputs",
    secondaryListTitle: "Testable Cup Styles",
    terminologyTitle: "Coffee Terminology",
    townsTitle: "Coffee Gateways",
    resourcesTitle: "Source and Trade References",
    carouselTitle: "Major Coffee Regions and Processing Corridors",
    countryImageAlt: "coffee source landscape",
    cardImageAlt: "coffee source region",
    subregionIndexKicker: "Detailed Coffee Region Pages",
    subregionIndexTitle: "Coffee Exam Study Regions",
    subregionPrimaryTitle: "Varieties and Processes",
    subregionSecondaryTitle: "Cup Styles",
    mapKicker: "A.I. Coffee Map",
    mapTitle: "Coffee Origin Study Map",
    mapDescription: "Study plate for growing regions, processing systems, cup profile, sourcing language, and service context taught on this page.",
    mapAlt: "Sip Studies coffee origin map"
  },
  tea: {
    overviewTitle: "Country Tea Overview",
    sourceConditionsTitle: "Tea Garden and Processing Conditions",
    productionTitle: "Tea Production Pattern",
    servingTitle: "Tea Service Pattern",
    regulationTitle: "Origin and Quality Rules",
    primaryListTitle: "Key Tea Inputs",
    secondaryListTitle: "Testable Tea Styles",
    terminologyTitle: "Tea Terminology",
    townsTitle: "Tea Gateways",
    resourcesTitle: "Source and Cultural References",
    carouselTitle: "Major Tea Regions and Processing Corridors",
    countryImageAlt: "tea source landscape",
    cardImageAlt: "tea source region",
    subregionIndexKicker: "Detailed Tea Region Pages",
    subregionIndexTitle: "Tea Exam Study Regions",
    subregionPrimaryTitle: "Cultivars and Inputs",
    subregionSecondaryTitle: "Tea Styles",
    mapKicker: "A.I. Tea Map",
    mapTitle: "Tea Origin Study Map",
    mapDescription: "Study plate for tea gardens, processing families, origin language, and service context taught on this page.",
    mapAlt: "Sip Studies tea origin map"
  },
  kombucha: {
    overviewTitle: "Country Kombucha Overview",
    sourceConditionsTitle: "Tea, Culture, and Fermentation Conditions",
    productionTitle: "Kombucha Production Pattern",
    servingTitle: "Kombucha Service Pattern",
    regulationTitle: "Food Safety and Alcohol-Control Rules",
    primaryListTitle: "Key Fermentation Inputs",
    secondaryListTitle: "Testable Kombucha Styles",
    terminologyTitle: "Kombucha Terminology",
    townsTitle: "Tea and Production Gateways",
    resourcesTitle: "Fermentation References",
    carouselTitle: "Major Kombucha Source and Production Corridors",
    countryImageAlt: "kombucha source and fermentation landscape",
    cardImageAlt: "kombucha source region",
    subregionIndexKicker: "Detailed Kombucha Region Pages",
    subregionIndexTitle: "Kombucha Study Regions",
    subregionPrimaryTitle: "Fermentation Inputs",
    subregionSecondaryTitle: "Formats",
    mapKicker: "A.I. Kombucha Map",
    mapTitle: "Kombucha Source Study Map",
    mapDescription: "Study plate for tea base, microbial culture, fermentation control, flavoring inputs, and service context taught on this page.",
    mapAlt: "Sip Studies kombucha source map"
  },
  juice: {
    overviewTitle: "Country Juice Overview",
    sourceConditionsTitle: "Fruit Belt and Processing Conditions",
    productionTitle: "Juice Production Pattern",
    servingTitle: "Juice Service Pattern",
    regulationTitle: "Identity and Label Rules",
    primaryListTitle: "Key Fruit Inputs",
    secondaryListTitle: "Testable Juice Formats",
    terminologyTitle: "Juice Terminology",
    townsTitle: "Fruit and Processing Gateways",
    resourcesTitle: "Source and Trade References",
    carouselTitle: "Major Juice Regions and Fruit Belts",
    countryImageAlt: "juice source landscape",
    cardImageAlt: "juice source region",
    subregionIndexKicker: "Detailed Juice Region Pages",
    subregionIndexTitle: "Juice Study Regions",
    subregionPrimaryTitle: "Fruit Inputs",
    subregionSecondaryTitle: "Juice Formats",
    mapKicker: "A.I. Juice Map",
    mapTitle: "Juice Source Study Map",
    mapDescription: "Study plate for fruit belts, processing choices, quality measurements, and service context taught on this page.",
    mapAlt: "Sip Studies juice source map"
  },
  milk: {
    overviewTitle: "Country Milk Overview",
    sourceConditionsTitle: "Dairy Source Conditions",
    productionTitle: "Milk Production Pattern",
    servingTitle: "Milk Service Pattern",
    regulationTitle: "Dairy Safety and Label Rules",
    primaryListTitle: "Key Dairy Inputs",
    secondaryListTitle: "Testable Milk Formats",
    terminologyTitle: "Milk Terminology",
    townsTitle: "Dairy Gateways",
    resourcesTitle: "Source and Dairy References",
    carouselTitle: "Major Dairy Regions and Milk Corridors",
    countryImageAlt: "dairy source landscape",
    cardImageAlt: "dairy source region",
    subregionIndexKicker: "Detailed Milk Region Pages",
    subregionIndexTitle: "Milk Study Regions",
    subregionPrimaryTitle: "Dairy Inputs",
    subregionSecondaryTitle: "Milk Formats",
    mapKicker: "A.I. Milk Map",
    mapTitle: "Milk Source Study Map",
    mapDescription: "Study plate for dairy regions, milk composition, processing choices, and beverage service context taught on this page.",
    mapAlt: "Sip Studies milk source map"
  },
  water: {
    overviewTitle: "Country Water Overview",
    sourceConditionsTitle: "Watershed, Divide, and Mineral Conditions",
    productionTitle: "Source and Treatment Pattern",
    servingTitle: "Water Service Pattern",
    regulationTitle: "Drinking Water and Label Rules",
    primaryListTitle: "Key Water Sources",
    secondaryListTitle: "Testable Water Formats",
    terminologyTitle: "Water Terminology",
    townsTitle: "Watershed Gateways",
    resourcesTitle: "Hydrology and Source References",
    carouselTitle: "Major Watersheds and Flow Corridors",
    countryImageAlt: "water source landscape",
    cardImageAlt: "water source region",
    subregionIndexKicker: "Detailed Water Source Pages",
    subregionIndexTitle: "Water Source Study Regions",
    subregionPrimaryTitle: "Water Sources",
    subregionSecondaryTitle: "Water Formats",
    mapKicker: "A.I. Water Map",
    mapTitle: "Watershed Study Map",
    mapDescription: "Study plate for continental divides, watersheds, source flow, mineral profile, treatment, and service context taught on this page.",
    mapAlt: "Sip Studies watershed source map"
  }
};

const whiteGrapesByContinent: Record<ContinentId, string[]> = {
  europe: [
    "Chardonnay",
    "Sauvignon Blanc",
    "Riesling",
    "Pinot Grigio / Pinot Gris",
    "Chenin Blanc",
    "Albarino",
    "Assyrtiko",
    "Gruner Veltliner",
    "Garganega",
    "Viura"
  ],
  "north-america": [
    "Chardonnay",
    "Sauvignon Blanc",
    "Riesling",
    "Chenin Blanc",
    "Pinot Gris",
    "Viognier",
    "Semillon",
    "Albarino",
    "Gewurztraminer",
    "Muscadet-style Melon"
  ],
  "south-america": [
    "Chardonnay",
    "Sauvignon Blanc",
    "Torrontes",
    "Semillon",
    "Pedro Ximenez",
    "Moscatel",
    "Riesling",
    "Viognier",
    "Pinot Gris",
    "Chenin Blanc"
  ],
  oceania: [
    "Sauvignon Blanc",
    "Chardonnay",
    "Riesling",
    "Semillon",
    "Pinot Gris",
    "Gewurztraminer",
    "Verdelho",
    "Viognier",
    "Marsanne",
    "Roussanne"
  ],
  africa: [
    "Chenin Blanc",
    "Chardonnay",
    "Sauvignon Blanc",
    "Semillon",
    "Colombard",
    "Viognier",
    "Muscat",
    "Riesling",
    "Grenache Blanc",
    "Clairette"
  ],
  asia: [
    "Koshu",
    "Rkatsiteli",
    "Chardonnay",
    "Sauvignon Blanc",
    "Riesling",
    "Muscat",
    "Aligote",
    "Semillon",
    "Viognier",
    "Gewurztraminer"
  ]
};

const redGrapesByContinent: Record<ContinentId, string[]> = {
  europe: [
    "Cabernet Sauvignon",
    "Merlot",
    "Pinot Noir",
    "Syrah",
    "Tempranillo",
    "Sangiovese",
    "Grenache",
    "Nebbiolo",
    "Gamay",
    "Cabernet Franc"
  ],
  "north-america": [
    "Cabernet Sauvignon",
    "Merlot",
    "Pinot Noir",
    "Zinfandel",
    "Syrah",
    "Malbec",
    "Petit Verdot",
    "Tempranillo",
    "Cabernet Franc",
    "Grenache"
  ],
  "south-america": [
    "Malbec",
    "Cabernet Sauvignon",
    "Carmenere",
    "Merlot",
    "Pinot Noir",
    "Syrah",
    "Tannat",
    "Bonarda",
    "Cabernet Franc",
    "Petit Verdot"
  ],
  oceania: [
    "Shiraz / Syrah",
    "Cabernet Sauvignon",
    "Pinot Noir",
    "Merlot",
    "Grenache",
    "Tempranillo",
    "Malbec",
    "Mourvedre",
    "Cabernet Franc",
    "Sangiovese"
  ],
  africa: [
    "Pinotage",
    "Cabernet Sauvignon",
    "Syrah",
    "Merlot",
    "Cinsaut",
    "Grenache",
    "Mourvedre",
    "Tinta Barroca",
    "Touriga Nacional",
    "Cabernet Franc"
  ],
  asia: [
    "Saperavi",
    "Cabernet Sauvignon",
    "Merlot",
    "Pinot Noir",
    "Syrah",
    "Krasnostop",
    "Areni",
    "Xinomavro",
    "Tempranillo",
    "Cabernet Franc"
  ]
};

const continentLocationGuides: Record<ContinentId, string> = {
  europe:
    "Most wine corridors track rivers, coasts, and historic trade routes. Compare Atlantic, continental, and Mediterranean influences from one subregion to the next.",
  "north-america":
    "Wine zones span cool maritime belts, high-elevation valleys, and desert-influenced basins. Latitude and ocean fog are the biggest style separators.",
  "south-america":
    "Key zones are often framed by Andean elevation gradients and Pacific or Atlantic influence. Altitude and diurnal swing are major style drivers.",
  oceania:
    "Production clusters around coastal belts and elevated inland sites. Maritime cooling, vintage variation, and water management shape regional identity.",
  africa:
    "Most classic vineyards sit near coastal currents or mountain foothills where temperature moderation and wind reduce heat pressure.",
  asia:
    "Regional identity is strongly tied to elevation, continental extremes, and monsoon timing. Site orientation and canopy strategy are central in warm vintages."
};

const continentTerroirGuides: Record<ContinentId, string> = {
  europe:
    "Old alluvial terraces, limestone ridges, schist, granite, and volcanic pockets combine with long-established appellation traditions.",
  "north-america":
    "Young and diverse soils, from volcanic basalts to marine sediments, are paired with modern site selection and precision viticulture.",
  "south-america":
    "High UV intensity, dry air, and alluvial soils are common. Irrigation access and elevation are often decisive for quality and balance.",
  oceania:
    "Ancient weathered soils, strong maritime airflow, and varied rainfall patterns create sharp regional signatures even across short distances.",
  africa:
    "Granite, shale, sandstone, and decomposed mountain soils are common, with cooling ocean currents helping to preserve acidity.",
  asia:
    "From volcanic to loess and limestone soils, terroir variation is extreme. Producers often blend modern cellar control with local traditions."
};

const countryNamesByContinent: Record<ContinentId, string[]> = {
  europe: [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "England",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
    "United Kingdom",
    "Vatican City"
  ],
  "north-america": [
    "Antigua and Barbuda",
    "Bahamas",
    "Barbados",
    "Belize",
    "Canada",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "Grenada",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Trinidad and Tobago",
    "United States"
  ],
  "south-america": [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela"
  ],
  oceania: [
    "Australia",
    "Fiji",
    "Kiribati",
    "Marshall Islands",
    "Micronesia",
    "Nauru",
    "New Zealand",
    "Palau",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Tahiti",
    "Tonga",
    "Tuvalu",
    "Vanuatu"
  ],
  africa: [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cape Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Democratic Republic of the Congo",
    "Republic of the Congo",
    "Cote d'Ivoire",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe"
  ],
  asia: [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "Crimea",
    "Cyprus",
    "East Timor",
    "Georgia",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Turkey",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen"
  ]
};

type ProfileOverride = Partial<CountryProfile> & {
  keyRegions?: Array<{ region: string; iconicVineyard: string }>;
};

type ExactProfileOverride = Partial<CountryProfile>;

const exactProfiles = exactRegionProfiles as Record<string, ExactProfileOverride>;

export const enabledWineRegionSlugs = new Set<string>([
  "austria",
  "bulgaria",
  "canada",
  "chile",
  "china",
  "crimea",
  "croatia",
  "cyprus",
  "ethiopia",
  "england",
  "georgia",
  "france",
  "germany",
  "greece",
  "hungary",
  "india",
  "israel",
  "italy",
  "japan",
  "kenya",
  "lebanon",
  "moldova",
  "mexico",
  "portugal",
  "romania",
  "serbia",
  "slovenia",
  "spain",
  "switzerland",
  "armenia",
  "argentina",
  "brasil",
  "uruguay",
  "australia",
  "new-zealand",
  "tahiti",
  "algeria",
  "cape-verde",
  "morocco",
  "south-africa",
  "tanzania",
  "tunisia",
  "uganda",
  "turkey",
  "united-states"
]);

const countryImageBySlug: Record<string, string> = {
  austria:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637811215278-J11GWCC631HA78DG3V3B/Austria.jpg",
  bulgaria:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637811231527-ATHRKS6GVBSPATXFIGJZ/Bulgaria.jpg",
  canada:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637968793026-9818RB6JDIATS6GGIVA9/Canada+-+Okanagan+Valley.jpg",
  chile:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637970359567-QO791RE29LB3AJAW06W9/Chile+02.jpg",
  china:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638061594848-77GWJQ9QGP58U26RWKO8/China.jpg",
  crimea:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638062214470-DY45ZIB4JCF39KOTKV17/Crimea+-+05.jpg",
  croatia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637813860767-JYICQMWVB2PQ8WVX8UZ1/Croatia+-+Rovinj.jpg",
  cyprus:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638062342720-9DB8E7M2SOL36IFQEJVE/Cyprus+-+Kyrenia.jpg",
  ethiopia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638057681723-P8A948NPN49L5PYC2UNQ/Ethiopia+-+Rift+Valley+-+Simien+Mountains.jpg",
  england:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637965457473-FLDGT74QG3SI5KWR6TMZ/England+-+Villages+01.jpg",
  georgia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638062428255-XKARZ1JFF0GX3MC8K5RA/Georgia.jpg",
  france:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637965544854-Q26P2N9KO8M59MVAAAAU/France+-+Colmar.jpg",
  germany:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637965596124-YVKHULO5AG9R90T8793N/Germany.jpg",
  greece:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637965756884-RABEL6Y5VK0Y5YI2ZWPQ/Greece.jpg",
  hungary:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637965903888-IID67N45IBTOI3V6DXPT/Hungary.jpg",
  india:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638062657710-ABXWZ5PIPHOVQHF58UTL/India+-+Munnar.jpg",
  israel:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638064884383-EE81GXRK2NSSG0I0HKSA/Israel+-+Golan+Heights+02.jpg",
  italy:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637966087722-S16FN84JAZ49VICBPA51/Italy+-+Cinque+Terra+02.jpg",
  japan:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638064903128-C53N2JR14M2G7OEPOM5K/Japan+-+Koshu+Valley+01.jpg",
  kenya:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638067131456-IMETNPOFH0KJJXUWKXWG/Kenyan%2BVineyards.jpg",
  lebanon:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638064992009-GOFDN9D6DPHNMWLRR5DV/Lebanon+-+02.jpg",
  moldova:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1711695306347-KJ8Z3CVHS2MO0RZTQ833/image-asset.jpeg",
  mexico:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637968890645-TI8XVFTVUNLOLX7JK7PA/Mexico+-+vineyards.jpg",
  portugal:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637966283959-WMBNKMS7NQFM3LYPGPQP/Portugal+-+Oporto+02.jpg",
  romania:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637966486069-0NDJDA96S89QQYOLKR0L/Romania+-+Transylvania.jpg",
  serbia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1713765913325-YL18UG4I0O17HQP1RJXL/image-asset.jpeg",
  slovenia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637966585852-370Q8LIWBURQINHVNP4F/Slovenia.jpg",
  spain:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637967021360-ULEAJLQPTZVQAHEIP3Y1/Spain+-+Ribera+del+Duero.jpg",
  switzerland:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637967185426-SCEPQRUNOEINSW2S8JWI/Switzerland+-+Landscape+01.jpg",
  armenia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1711691213718-4XNU7V4RNPHVNTFAAA6U/image-asset.jpeg",
  argentina:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637969153891-ANYKOQB9YKY7BCQ7442K/Argentina+-+Cafayates.jpg",
  brasil:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637969777419-E5RUTJYBT9NIDQNJ3C7A/Brasil.jpg",
  uruguay:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637971426375-VZIJZYTGQ0G567Q8UBKE/Uruguay+03.jpg",
  australia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638052818128-A6JNQHIQJXE3Q632X8O1/Australia+-+Barossa+Valley+02.jpg",
  "new-zealand":
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638052949409-PWZXBRH0NXEJZNWOTI0G/New+Zealand.jpg",
  tahiti:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638053076215-GQGRD81KJIE9NBX85A56/Tahiti+02.jpg",
  algeria:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638053495265-HQVJZXN2K9C78T8VOG2L/Algeria+-+01.jpg",
  "cape-verde":
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638054929007-Z7IFW0PI4VUJ1OAPYFZD/Cape+Verde+-+Ch%C3%A3+das+Caldeiras.jpg",
  morocco:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638060317007-RLUKPDVIWPO6OJEDQQQA/Morocco+-+Chefchaouen.jpg",
  "south-africa":
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638055591337-XWXIXBS1ZMUCRZ7X5RM4/South+Africa+-+Table+Mountain.jpg",
  tanzania:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638059523359-6GBKWGJUGDIW5KMQACJS/Tanzania.jpg",
  tunisia:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638059415983-SNLIS2TF9Q2SV6VSDI6A/Tunisia+-+03.jpg",
  uganda:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638061450227-Y6OHDTV1HP5YQ0CAU7S1/Uganda+-+Lake+Bunyonyi.jpg",
  turkey:
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1638065197460-UTR1FC0NNX9WI88WS12A/Turkey+-+Cappadocia.jpg",
  "united-states":
    "https://images.squarespace-cdn.com/content/v1/60ebc279dcf3287a46adfe4e/1637969076073-O402IKZ7B0OSZPE1XK8C/United+States+-+California.jpg"
};

const featuredProfiles: Record<string, ProfileOverride> = {
  france: {
    winesOverview:
      "France sets many of the global reference points for regional wine identity, from classic still wines to Champagne and sweet fortified styles.",
    location:
      "Major French wine corridors include Bordeaux, Burgundy, Champagne, Rhone, Loire, Alsace, and Provence, each defined by specific climate and soil patterns.",
    terroir:
      "Limestone, clay, gravel, schist, and alluvial soils combine with oceanic, continental, and Mediterranean climates to produce distinct regional signatures.",
    productionStyle:
      "Styles range from terroir-focused single-site bottlings to regional blends, with strong links to appellation rules and vintage expression.",
    servingStyle:
      "Serve crisp whites and sparkling wines chilled, aromatic whites lightly cool, and structured reds slightly below room temperature.",
    regulations:
      "France uses AOP and IGP frameworks to govern origin, varieties, yields, and cellar practices, with additional producer-level standards in many regions.",
    terminology: ["AOP", "IGP", "Cru", "Lieu-dit", "Methode Traditionnelle", "Negociant", "Chateau", "Terroir"],
    nearbyTowns: ["Bordeaux", "Reims", "Dijon", "Beaune", "Avignon", "Tours"],
    keyRegions: [
      { region: "Bordeaux", iconicVineyard: "Medoc classed-growth estates" },
      { region: "Burgundy", iconicVineyard: "Cote d'Or grand cru slopes" },
      { region: "Champagne", iconicVineyard: "Montagne de Reims chalk vineyards" },
      { region: "Rhone Valley", iconicVineyard: "Hermitage hill vineyards" },
      { region: "Loire Valley", iconicVineyard: "Sancerre hillside parcels" }
    ]
  },
  italy: {
    winesOverview:
      "Italy combines deep regional tradition with modern quality focus, producing a wide spread of styles from alpine whites to age-worthy reds.",
    location:
      "Core zones include Piedmont, Tuscany, Veneto, Friuli, Sicily, and Campania, with strong north-to-south climatic variation.",
    terroir:
      "Limestone ridges, volcanic soils, marine sediments, and mountain influence create broad stylistic range across denominations.",
    regulations:
      "DOC and DOCG rules define origin and production standards, while IGT allows more flexible varietal and blending decisions.",
    nearbyTowns: ["Turin", "Alba", "Florence", "Verona", "Palermo", "Naples"],
    keyRegions: [
      { region: "Piedmont", iconicVineyard: "Langhe amphitheater crus" },
      { region: "Tuscany", iconicVineyard: "Chianti Classico hillside sites" },
      { region: "Veneto", iconicVineyard: "Valpolicella Classica terraces" },
      { region: "Sicily", iconicVineyard: "Mount Etna volcanic vineyards" },
      { region: "Friuli", iconicVineyard: "Collio marl-and-sandstone slopes" }
    ]
  },
  spain: {
    winesOverview:
      "Spain offers strong regional contrast, from Atlantic freshness in the north to warm, continental interiors and Mediterranean coasts.",
    location: "Rioja, Ribera del Duero, Priorat, Rias Baixas, Jerez, and Penedes are key reference points for style and law.",
    terroir:
      "Altitude, mesoclimate, and soil diversity are central: limestone plateaus, slate hillsides, sandy river benches, and coastal granite.",
    regulations:
      "DO and DOCa structures govern origin and style, while aging terms such as Crianza, Reserva, and Gran Reserva communicate cellar time.",
    nearbyTowns: ["Logrono", "Valladolid", "Santiago de Compostela", "Barcelona", "Jerez de la Frontera"],
    keyRegions: [
      { region: "Rioja", iconicVineyard: "Rioja Alta hillside parcels" },
      { region: "Ribera del Duero", iconicVineyard: "Duero plateau old vines" },
      { region: "Priorat", iconicVineyard: "Llicorella slate terraces" },
      { region: "Rias Baixas", iconicVineyard: "Salnes Valley pergola vineyards" },
      { region: "Jerez", iconicVineyard: "Albariza chalk pagos" }
    ]
  },
  germany: {
    winesOverview:
      "Germany is globally known for high-acid, precision white wines, with growing recognition for cool-climate red styles.",
    location:
      "Mosel, Rheingau, Pfalz, Nahe, Rheinhessen, and Baden are core study regions, many centered along river corridors.",
    regulations:
      "The quality ladder (including Pradikat categories) and GG systems frame sweetness, ripeness, and top dry site expression.",
    nearbyTowns: ["Trier", "Mainz", "Wiesbaden", "Freiburg", "Wurzburg"],
    keyRegions: [
      { region: "Mosel", iconicVineyard: "Steep slate river vineyards" },
      { region: "Rheingau", iconicVineyard: "Rudesheim hillside blocks" },
      { region: "Pfalz", iconicVineyard: "Mittelhaardt village sites" },
      { region: "Nahe", iconicVineyard: "Mixed-soil valley vineyards" },
      { region: "Baden", iconicVineyard: "Kaiserstuhl volcanic parcels" }
    ]
  },
  portugal: {
    winesOverview:
      "Portugal combines historic indigenous grapes with modern precision across dry, sparkling, and fortified wine styles.",
    location: "Douro, Dao, Vinho Verde, Bairrada, Alentejo, and Setubal are foundational reference regions.",
    regulations:
      "DOC and regional categories govern style and labeling, with strict controls in classic Port production zones.",
    nearbyTowns: ["Porto", "Vila Real", "Viseu", "Braga", "Evora"],
    keyRegions: [
      { region: "Douro", iconicVineyard: "Terraced schist quintas" },
      { region: "Vinho Verde", iconicVineyard: "Atlantic-influenced valley vines" },
      { region: "Dao", iconicVineyard: "Granite upland vineyards" },
      { region: "Bairrada", iconicVineyard: "Clay-limestone Baga plots" },
      { region: "Alentejo", iconicVineyard: "Warm inland estate vineyards" }
    ]
  },
  greece: {
    winesOverview:
      "Greece combines ancient viticultural heritage with modern quality focus and strong indigenous grape identity.",
    location: "Santorini, Naoussa, Nemea, Crete, and Peloponnese are core study regions.",
    nearbyTowns: ["Athens", "Thessaloniki", "Heraklion", "Patras", "Corinth"],
    keyRegions: [
      { region: "Santorini", iconicVineyard: "Kouloura-trained volcanic vines" },
      { region: "Naoussa", iconicVineyard: "Xinomavro hillside parcels" },
      { region: "Nemea", iconicVineyard: "Agiorgitiko valley slopes" },
      { region: "Crete", iconicVineyard: "Heraklion upland sites" },
      { region: "Peloponnese", iconicVineyard: "Mantinia plateau vineyards" }
    ]
  },
  croatia: {
    winesOverview:
      "Croatia links coastal Mediterranean vineyards with inland continental zones and a rich set of indigenous grapes.",
    location: "Istria, Slavonia, and Dalmatian subregions are the main quality references.",
    nearbyTowns: ["Zagreb", "Split", "Dubrovnik", "Pula", "Osijek"],
    keyRegions: [
      { region: "Istria", iconicVineyard: "Malvazija hillside plots" },
      { region: "Slavonia", iconicVineyard: "Grasevina river-adjacent sites" },
      { region: "Northern Dalmatia", iconicVineyard: "Babic coastal terraces" },
      { region: "Central Dalmatia", iconicVineyard: "Island Plavac Mali sites" },
      { region: "Southern Dalmatia", iconicVineyard: "Dingac steep slopes" }
    ]
  },
  moldova: {
    winesOverview:
      "Moldova has one of the highest vineyard densities in Europe and continues to expand international recognition for both native and global varieties.",
    location: "Codru, Valul lui Traian, and Stefan Voda frame many premium bottlings.",
    nearbyTowns: ["Chisinau", "Cahul", "Balti", "Tiraspol"],
    keyRegions: [
      { region: "Codru", iconicVineyard: "Central forest-belt vineyard blocks" },
      { region: "Valul lui Traian", iconicVineyard: "Southwestern warm-slope vineyards" },
      { region: "Stefan Voda", iconicVineyard: "Purcari district estates" },
      { region: "Nistreana", iconicVineyard: "Dniester-adjacent parcels" },
      { region: "Cahul", iconicVineyard: "Lower southern vineyard belts" }
    ]
  },
  "united-states": {
    winesOverview:
      "The United States spans multiple climatic zones, with broad stylistic diversity from cool coastal Pinot Noir to warm inland Cabernet and Zinfandel.",
    location:
      "California, Oregon, Washington, New York, and key mountain AVAs anchor most quality reference discussions.",
    regulations: "The AVA framework defines geographic origin; state and federal labeling rules govern varietal and vintage claims.",
    nearbyTowns: ["Napa", "Santa Rosa", "Portland", "Walla Walla", "Finger Lakes gateway towns"],
    keyRegions: [
      { region: "Napa Valley", iconicVineyard: "To Kalon district vineyards" },
      { region: "Sonoma", iconicVineyard: "Russian River Valley parcels" },
      { region: "Willamette Valley", iconicVineyard: "Dundee Hills estate blocks" },
      { region: "Washington", iconicVineyard: "Red Mountain benchlands" },
      { region: "Finger Lakes", iconicVineyard: "Seneca Lake hillside vineyards" }
    ]
  },
  canada: {
    winesOverview: "Canada is known for both cool-climate table wines and globally recognized icewine production.",
    location: "Key zones include British Columbia's Okanagan and Ontario's Niagara Peninsula.",
    nearbyTowns: ["Kelowna", "Penticton", "Niagara-on-the-Lake", "Toronto"],
    keyRegions: [
      { region: "Okanagan Valley", iconicVineyard: "Naramata Bench vineyards" },
      { region: "Niagara Peninsula", iconicVineyard: "Twenty Mile Bench plots" },
      { region: "Similkameen", iconicVineyard: "Dry valley mountain foothills" },
      { region: "Prince Edward County", iconicVineyard: "Limestone-rich cool sites" },
      { region: "Nova Scotia", iconicVineyard: "Annapolis Valley vineyards" }
    ]
  },
  mexico: {
    winesOverview:
      "Mexico's modern wine identity is centered on warm-climate viticulture balanced by Pacific influence and elevation.",
    location: "Baja California dominates premium output, led by Valle de Guadalupe.",
    nearbyTowns: ["Ensenada", "Tijuana", "Santo Tomas", "Parras de la Fuente"],
    keyRegions: [
      { region: "Valle de Guadalupe", iconicVineyard: "Pacific-cooled hillside vineyards" },
      { region: "Valle de Santo Tomas", iconicVineyard: "Historic mission-era vineyard sites" },
      { region: "Valle de Ojos Negros", iconicVineyard: "High desert vineyard blocks" },
      { region: "Coahuila", iconicVineyard: "Parras oasis vineyards" },
      { region: "Queretaro", iconicVineyard: "High-elevation sparkling sites" }
    ]
  },
  argentina: {
    winesOverview:
      "Argentina's flagship style is altitude-driven Malbec, with growing depth in whites, blends, and cool-climate Pinot Noir.",
    location: "Mendoza, Salta, Patagonia, and San Juan are the core study zones.",
    nearbyTowns: ["Mendoza", "Salta", "San Juan", "Neuquen"],
    keyRegions: [
      { region: "Lujan de Cuyo", iconicVineyard: "Old-vine Malbec alluvial parcels" },
      { region: "Uco Valley", iconicVineyard: "Gualtallary high-altitude sites" },
      { region: "Salta", iconicVineyard: "Cafayate extreme-elevation vineyards" },
      { region: "Patagonia", iconicVineyard: "Rio Negro valley vineyards" },
      { region: "San Juan", iconicVineyard: "Pedernal Valley mountain foothills" }
    ]
  },
  chile: {
    winesOverview:
      "Chile's long north-south corridor supports cool coastal whites, structured mountain reds, and balanced valley blends.",
    location: "Maipo, Colchagua, Casablanca, Aconcagua, and Itata are major reference regions.",
    nearbyTowns: ["Santiago", "Santa Cruz", "Valparaiso", "Talca"],
    keyRegions: [
      { region: "Maipo Valley", iconicVineyard: "Andean foothill Cabernet sites" },
      { region: "Colchagua Valley", iconicVineyard: "Apalta horseshoe vineyards" },
      { region: "Casablanca", iconicVineyard: "Fog-cooled Sauvignon parcels" },
      { region: "Aconcagua", iconicVineyard: "Inland gravel benches" },
      { region: "Itata", iconicVineyard: "Dry-farmed old-vine Pais sites" }
    ]
  },
  uruguay: {
    winesOverview:
      "Uruguay is best known for Tannat, supported by maritime freshness and a fast-improving quality focus across white and red styles.",
    nearbyTowns: ["Montevideo", "Canelones", "Maldonado", "Colonia del Sacramento"],
    keyRegions: [
      { region: "Canelones", iconicVineyard: "Atlantic-influenced clay sites" },
      { region: "Maldonado", iconicVineyard: "Granite hill vineyards" },
      { region: "Montevideo", iconicVineyard: "Historic coastal vineyard blocks" },
      { region: "Colonia", iconicVineyard: "River-influenced mixed soils" },
      { region: "Paysandu", iconicVineyard: "Northern warm-climate parcels" }
    ]
  },
  australia: {
    winesOverview:
      "Australia balances warm-climate power and cool-climate precision, with leading benchmarks in Shiraz, Cabernet, Chardonnay, and sparkling styles.",
    location: "South Australia, Victoria, New South Wales, Western Australia, and Tasmania anchor production.",
    nearbyTowns: ["Adelaide", "Melbourne", "Perth", "Hobart", "Canberra"],
    keyRegions: [
      { region: "Barossa Valley", iconicVineyard: "Old-vine Shiraz blocks" },
      { region: "McLaren Vale", iconicVineyard: "Blewitt Springs vineyards" },
      { region: "Yarra Valley", iconicVineyard: "Cool-climate Pinot and Chardonnay sites" },
      { region: "Margaret River", iconicVineyard: "Wilyabrup gravelly-loam vineyards" },
      { region: "Tasmania", iconicVineyard: "Coal River Valley sparkling bases" }
    ]
  },
  "new-zealand": {
    winesOverview: "New Zealand is globally identified with aromatic, high-acid styles and clear regional expression.",
    location: "Marlborough, Central Otago, Hawke's Bay, Martinborough, and Gisborne are key references.",
    nearbyTowns: ["Blenheim", "Queenstown", "Napier", "Wellington", "Gisborne"],
    keyRegions: [
      { region: "Marlborough", iconicVineyard: "Wairau Valley Sauvignon parcels" },
      { region: "Central Otago", iconicVineyard: "Bannockburn schist sites" },
      { region: "Hawke's Bay", iconicVineyard: "Gimblett Gravels blocks" },
      { region: "Martinborough", iconicVineyard: "Terrace gravel vineyards" },
      { region: "Gisborne", iconicVineyard: "East Coast Chardonnay vines" }
    ]
  },
  "south-africa": {
    winesOverview:
      "South Africa blends old-vine heritage with modern precision across Chenin Blanc, Pinotage, and Bordeaux/Rhone varieties.",
    location: "Stellenbosch, Swartland, Paarl, Walker Bay, and Constantia are core reference regions.",
    regulations:
      "WO (Wine of Origin) rules govern geography and labeling; old-vine certification programs are increasingly visible.",
    nearbyTowns: ["Cape Town", "Stellenbosch", "Paarl", "Franschhoek", "Hermanus"],
    keyRegions: [
      { region: "Stellenbosch", iconicVineyard: "Simonsberg mountain foothills" },
      { region: "Swartland", iconicVineyard: "Dry-farmed bush-vine parcels" },
      { region: "Paarl", iconicVineyard: "Granite slope vineyards" },
      { region: "Walker Bay", iconicVineyard: "Hemel-en-Aarde Valley blocks" },
      { region: "Constantia", iconicVineyard: "Historic cool-climate vineyards" }
    ]
  },
  morocco: {
    winesOverview:
      "Morocco has Mediterranean and mountain-influenced vineyards with a long history and expanding quality ambitions.",
    nearbyTowns: ["Meknes", "Casablanca", "Rabat", "Fes"],
    keyRegions: [
      { region: "Meknes", iconicVineyard: "Atlas foothill vineyards" },
      { region: "Benslimane", iconicVineyard: "Coastal plateau parcels" },
      { region: "Guerrouane", iconicVineyard: "Mountain-influenced valley sites" },
      { region: "Zaer", iconicVineyard: "Atlantic corridor vineyard belts" },
      { region: "Doukkala", iconicVineyard: "Ocean-moderated inland plots" }
    ]
  },
  tunisia: {
    winesOverview: "Tunisia's vineyard legacy links Mediterranean climate with historic Roman-era viticulture zones.",
    nearbyTowns: ["Tunis", "Nabeul", "Bizerte", "Kairouan"],
    keyRegions: [
      { region: "Cap Bon", iconicVineyard: "Coastal limestone parcels" },
      { region: "Mornag", iconicVineyard: "Historic valley vineyards" },
      { region: "Bizerte", iconicVineyard: "Northern maritime sites" },
      { region: "Sidi Salem", iconicVineyard: "Warm inland blocks" },
      { region: "Thibar", iconicVineyard: "Rolling clay-limestone sites" }
    ]
  },
  israel: {
    winesOverview:
      "Israel combines high-elevation and desert-edge viticulture with modern technology and historical continuity.",
    nearbyTowns: ["Jerusalem", "Haifa", "Tel Aviv", "Safed"],
    keyRegions: [
      { region: "Galilee", iconicVineyard: "Upper Galilee mountain sites" },
      { region: "Judean Hills", iconicVineyard: "Terraced limestone vineyards" },
      { region: "Samson", iconicVineyard: "Central plain parcels" },
      { region: "Negev", iconicVineyard: "Desert highland blocks" },
      { region: "Golan Heights", iconicVineyard: "Volcanic plateau vineyards" }
    ]
  },
  japan: {
    winesOverview:
      "Japan is known for precision viticulture, native Koshu, and carefully managed cool-to-humid growing conditions.",
    nearbyTowns: ["Kofu", "Yamanashi", "Nagano", "Sapporo", "Tokyo"],
    keyRegions: [
      { region: "Yamanashi", iconicVineyard: "Koshu basin vineyards" },
      { region: "Nagano", iconicVineyard: "Highland valley cool sites" },
      { region: "Hokkaido", iconicVineyard: "Northern long-day vineyards" },
      { region: "Yamagata", iconicVineyard: "Inland mountain foothills" },
      { region: "Niigata", iconicVineyard: "Sea-influenced hillside parcels" }
    ]
  },
  china: {
    winesOverview:
      "China's premium wine growth is led by mountain, desert-edge, and maritime zones with increasing site-specific focus.",
    nearbyTowns: ["Yinchuan", "Qingdao", "Yantai", "Urumqi", "Beijing"],
    keyRegions: [
      { region: "Ningxia", iconicVineyard: "Helan Mountain east foothills" },
      { region: "Shandong", iconicVineyard: "Penglai coastal vineyards" },
      { region: "Xinjiang", iconicVineyard: "Dry high-desert vineyards" },
      { region: "Hebei", iconicVineyard: "Huailai basin blocks" },
      { region: "Yunnan", iconicVineyard: "High-altitude terraced vineyards" }
    ]
  },
  georgia: {
    winesOverview:
      "Georgia is one of the oldest known wine cultures, with qvevri tradition central to identity and global interest.",
    nearbyTowns: ["Tbilisi", "Telavi", "Kutaisi", "Sighnaghi"],
    keyRegions: [
      { region: "Kakheti", iconicVineyard: "Alazani Valley vineyards" },
      { region: "Imereti", iconicVineyard: "Western limestone sites" },
      { region: "Racha", iconicVineyard: "Khvanchkara mountain parcels" },
      { region: "Kartli", iconicVineyard: "Central valley vineyards" },
      { region: "Adjara", iconicVineyard: "Black Sea humid slopes" }
    ]
  },
  armenia: {
    winesOverview: "Armenia's high-altitude vineyards and ancient varieties are driving renewed international attention.",
    nearbyTowns: ["Yerevan", "Areni", "Vayk", "Aragatsotn settlements"],
    keyRegions: [
      { region: "Vayots Dzor", iconicVineyard: "Areni canyon vineyards" },
      { region: "Ararat Valley", iconicVineyard: "Volcanic plain vineyards" },
      { region: "Tavush", iconicVineyard: "Forest-edge highland parcels" },
      { region: "Armavir", iconicVineyard: "Sun-exposed valley blocks" },
      { region: "Aragatsotn", iconicVineyard: "Mountain foothill sites" }
    ]
  },
  turkey: {
    winesOverview:
      "Turkey has deep grape diversity and long history, with modern wineries focusing on both native and international varieties.",
    nearbyTowns: ["Izmir", "Canakkale", "Ankara", "Nevsehir", "Tekirdag"],
    keyRegions: [
      { region: "Aegean", iconicVineyard: "Izmir coastal vineyards" },
      { region: "Thrace", iconicVineyard: "Marmara rolling vineyards" },
      { region: "Central Anatolia", iconicVineyard: "High plateau parcels" },
      { region: "Cappadocia", iconicVineyard: "Volcanic tuff vineyards" },
      { region: "Denizli", iconicVineyard: "Inner Aegean valley sites" }
    ]
  },
  lebanon: {
    winesOverview:
      "Lebanon's modern wine identity is anchored by mountain-influenced Bekaa Valley vineyards and Mediterranean freshness.",
    nearbyTowns: ["Beirut", "Zahle", "Byblos", "Baalbek"],
    keyRegions: [
      { region: "Bekaa Valley", iconicVineyard: "High-altitude plateau vineyards" },
      { region: "Batroun", iconicVineyard: "Coastal mountain terraces" },
      { region: "Jezzine", iconicVineyard: "Southern hillside parcels" },
      { region: "Bhamdoun", iconicVineyard: "Mount Lebanon slopes" },
      { region: "Akkar", iconicVineyard: "Northern inland vineyards" }
    ]
  }
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function titleForOverview(country: string, continentLabel: string): string {
  return `${country} has a developing wine narrative in ${continentLabel}, with growing focus on quality, regional identity, and tourism-friendly education.`;
}

function buildFallbackRegions(country: string): Array<{ region: string; iconicVineyard: string }> {
  return [
    { region: `${country} Northern Corridor`, iconicVineyard: `${country} northern hillside estates` },
    { region: `${country} Central Highlands`, iconicVineyard: `${country} highland vineyard terraces` },
    { region: `${country} River Valley Belt`, iconicVineyard: `${country} river-adjacent old vines` },
    { region: `${country} Coastal Influence Zone`, iconicVineyard: `${country} maritime vineyard blocks` },
    { region: `${country} Heritage District`, iconicVineyard: `${country} historic landmark vineyards` }
  ];
}

function buildImageUrl(country: string, region: string): string {
  const query = encodeURIComponent(`${country} ${region} vineyard landscape`);
  return `https://source.unsplash.com/1200x760/?${query}`;
}

function normalizeResourceUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://www.sipstudies.com${url}`;
  return url;
}

function buildCountryProfile(country: string, continent: ContinentId): CountryProfile {
  const slug = slugify(country);
  const continentLabel = continentLabels[continent];
  const exact = exactProfiles[slug];
  const override = featuredProfiles[slug];
  const merged = { ...override, ...exact } as Partial<CountryProfile>;
  const keyRegions = override?.keyRegions ?? buildFallbackRegions(country);
  const resources = (merged.resources ?? []).map((item) => ({ label: item.label, url: normalizeResourceUrl(item.url) }));
  const exactMajorRegions = merged.majorRegions ?? [];

  return {
    winesOverview: merged.winesOverview && merged.winesOverview.trim() ? merged.winesOverview : titleForOverview(country, continentLabel),
    countryImageUrl:
      countryImageBySlug[slug] ??
      (exactMajorRegions[0]?.imageUrl ? exactMajorRegions[0].imageUrl : buildImageUrl(country, "vineyard landscape")),
    location:
      merged.location && merged.location.trim()
        ? merged.location
        : `${country} study routes follow the strongest quality corridors and production hubs. ${continentLocationGuides[continent]}`,
    terroir: merged.terroir && merged.terroir.trim() ? merged.terroir : `${country} terroir profile: ${continentTerroirGuides[continent]}`,
    whiteGrapes: merged.whiteGrapes && merged.whiteGrapes.length > 0 ? merged.whiteGrapes : whiteGrapesByContinent[continent],
    redGrapes: merged.redGrapes && merged.redGrapes.length > 0 ? merged.redGrapes : redGrapesByContinent[continent],
    productionStyle:
      merged.productionStyle && merged.productionStyle.trim()
        ? merged.productionStyle
        : `${country} producers use a mix of traditional cellar methods and modern precision tools to protect freshness, site expression, and consistency across vintages.`,
    servingStyle:
      merged.servingStyle && merged.servingStyle.trim()
        ? merged.servingStyle
        : "Serve by style: crisp whites and sparkling wines well chilled, aromatic whites lightly cool, medium reds around cellar temperature, and fuller reds slightly below room temperature.",
    regulations:
      merged.regulations && merged.regulations.trim()
        ? merged.regulations
        : `${country} labeling and origin standards usually combine national wine law with protected geographic indications where applicable.`,
    terminology: merged.terminology && merged.terminology.length > 0 ? merged.terminology : [
      "Terroir",
      "Appellation",
      "GI / PDO",
      "Single Vineyard",
      "Estate Bottled",
      "Vintage",
      "Reserve",
      "Lees Aging"
    ],
    resources:
      resources.length > 0
        ? resources
        : [
            { label: `${country} wine overview (Wikipedia)`, url: `https://en.wikipedia.org/wiki/Wine_in_${encodeURIComponent(country)}` },
            { label: "OIV - International Organisation of Vine and Wine", url: "https://www.oiv.int/" },
            { label: "GuildSomm regional map library", url: "https://www.guildsomm.com/" },
            { label: "JancisRobinson.com region guides", url: "https://www.jancisrobinson.com/" }
          ],
    nearbyTowns:
      merged.nearbyTowns && merged.nearbyTowns.length > 0
        ? merged.nearbyTowns
        : [
            `${country} capital and airport gateway`,
            `${country} primary regional wine market town`,
            `${country} historic old-town base near vineyards`
          ],
    majorRegions:
      exactMajorRegions.length > 0
        ? exactMajorRegions.map((entry) => ({
            region: entry.region,
            iconicVineyard: entry.iconicVineyard,
            imageUrl: entry.imageUrl
          }))
        : keyRegions.map((entry) => ({
            region: entry.region,
            iconicVineyard: entry.iconicVineyard,
            imageUrl: buildImageUrl(country, entry.region)
          }))
  };
}

const countries = continentOrder.flatMap((continent) => {
  return countryNamesByContinent[continent].map((name) => {
    const slug = slugify(name);
    return {
      name,
      slug,
      continent,
      continentLabel: continentLabels[continent],
      profile: buildCountryProfile(name, continent)
    } satisfies RegionCountry;
  });
});

const countriesBySlug = countries.reduce((acc, country) => {
  acc[country.slug] = country;
  return acc;
}, {} as Record<string, RegionCountry>);

export const allRegionCountries: RegionCountry[] = countries.filter((country) => enabledWineRegionSlugs.has(country.slug));

export const regionCountriesByBeverage = regionBeverageCategoryOrder.reduce((acc, beverage) => {
  if (beverage === "wine") {
    acc[beverage] = allRegionCountries;
    return acc;
  }

  const commodityProfiles = categoryCountryProfiles[beverage] ?? {};
  acc[beverage] = Object.entries(commodityProfiles)
    .map(([countrySlug, profile]) => {
      const baseCountry = countriesBySlug[countrySlug];
      if (!baseCountry) return null;
      return {
        ...baseCountry,
        profile
      } satisfies RegionCountry;
    })
    .filter((country): country is RegionCountry => Boolean(country));
  return acc;
}, {} as Record<RegionBeverageCategoryId, RegionCountry[]>);

export const countriesByContinent = continentOrder.reduce((acc, continent) => {
  acc[continent] = allRegionCountries.filter((country) => country.continent === continent);
  return acc;
}, {} as Record<ContinentId, RegionCountry[]>);

export const countryBySlug = allRegionCountries.reduce((acc, country) => {
  acc[country.slug] = country;
  return acc;
}, {} as Record<string, RegionCountry>);

export function resolveRegionCountry(slug: string | null | undefined): RegionCountry | null {
  if (!slug) return null;
  return countryBySlug[slug] ?? null;
}

export function resolveRegionBeverageCategory(
  value: string | null | undefined
): RegionBeverageCategoryId | null {
  if (!value) return null;
  return regionBeverageCategoryOrder.includes(value as RegionBeverageCategoryId)
    ? (value as RegionBeverageCategoryId)
    : null;
}
