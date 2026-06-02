import type { RegionBeverageCategoryId } from "./regions";

export type SubregionImageStatus = "generated" | "queued";

export type SubregionPanoramaScene = {
  id: string;
  country: string;
  region: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  copy: string;
  details: string[];
};

export type SubregionSourceLink = {
  label: string;
  url: string;
};

export type SubregionStudyPage = {
  slug: string;
  name: string;
  parentRegion: string;
  classification: string;
  examWeight: "core" | "high" | "medium";
  imageUrl: string;
  imageAlt: string;
  imageStatus: SubregionImageStatus;
  imagePrompt: string;
  overview: string;
  location: string;
  climate: string;
  soils: string;
  grapes: {
    white: string[];
    red: string[];
  };
  styles: string[];
  serviceCue: string;
  examFocus: string[];
  sourceLinks: SubregionSourceLink[];
  panoramaScene?: SubregionPanoramaScene;
};

export type CountrySubregionGuide = {
  category: RegionBeverageCategoryId;
  countrySlug: string;
  countryName: string;
  overview: string;
  sourceNote: string;
  subregions: SubregionStudyPage[];
};

const hyperrealisticImagePrompt = (region: string, country: string, subject: string, commodity = "vineyard"): string =>
  `Hyper-realistic documentary ${commodity} panorama for ${region}, ${country}: ${subject}. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.`;

const usaSourceLinks: SubregionSourceLink[] = [
  {
    label: "TTB AVA Map Explorer",
    url: "https://www.ttb.gov/wine/american-viticultural-area-ava"
  },
  {
    label: "TTB established AVA list",
    url: "https://www.ttb.gov/system/files/images/pdfs/us_by_ava.pdf"
  }
];

type WineBenchmarkSeed = {
  slug: string;
  name: string;
  parentRegion: string;
  classification: string;
  examWeight: "core" | "high" | "medium";
  imageUrl: string;
  imageAlt: string;
  imageSubject: string;
  overview: string;
  location: string;
  climate: string;
  soils: string;
  white: string[];
  red: string[];
  styles: string[];
  serviceCue: string;
  examFocus: string[];
  sourceLinks: SubregionSourceLink[];
  panorama?: {
    id: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    copy: string;
    details: string[];
  };
};

const wineBenchmarkPage = (country: string, seed: WineBenchmarkSeed): SubregionStudyPage => ({
  slug: seed.slug,
  name: seed.name,
  parentRegion: seed.parentRegion,
  classification: seed.classification,
  examWeight: seed.examWeight,
  imageUrl: seed.imageUrl,
  imageAlt: seed.imageAlt,
  imageStatus: seed.panorama ? "generated" : "queued",
  imagePrompt: hyperrealisticImagePrompt(seed.name, country, seed.imageSubject),
  overview: seed.overview,
  location: seed.location,
  climate: seed.climate,
  soils: seed.soils,
  grapes: {
    white: seed.white,
    red: seed.red
  },
  styles: seed.styles,
  serviceCue: seed.serviceCue,
  examFocus: seed.examFocus,
  sourceLinks: seed.sourceLinks,
  panoramaScene: seed.panorama
    ? {
        id: seed.panorama.id,
        country,
        region: seed.name,
        title: seed.panorama.title,
        imageSrc: seed.panorama.imageSrc,
        imageAlt: seed.panorama.imageAlt,
        copy: seed.panorama.copy,
        details: seed.panorama.details
      }
    : undefined
});

const argentinaSourceLinks: SubregionSourceLink[] = [
  { label: "INV - regiones vitivinicolas", url: "https://www.argentina.gob.ar/inv/vinos/estadisticas/regiones-vitivinicolas" },
  { label: "Wines of Argentina - emerging regions", url: "https://api.winesofargentina.org/uploads/web/regiones/emergentes/pdf/EMERGING-REGIONS-ENG.pdf" }
];

const chileSourceLinks: SubregionSourceLink[] = [
  { label: "Wines of Chile", url: "https://www.winesofchile.org/" },
  { label: "Wines of Chile vintage regional report", url: "https://www.winesofchile.org/wp-content/uploads/2024/08/VINTAGE_2024_Executive_Report.ANIAE_Wines_of_Chile.pdf" }
];

const australiaSourceLinks: SubregionSourceLink[] = [
  { label: "Wine Australia - protected GIs", url: "https://www.wineaustralia.com/labelling/register-of-protected-gis-and-other-terms/australian-wine-geographical-indications" }
];

const newZealandSourceLinks: SubregionSourceLink[] = [
  { label: "New Zealand Wine - regions", url: "https://www.nzwine.com/en/regions?locale=en_NZ" },
  { label: "New Zealand Wine - maps", url: "https://www.nzwine.com/en/trade/learning/maps/" }
];

const southAfricaSourceLinks: SubregionSourceLink[] = [
  { label: "Wines of South Africa - Wine of Origin scheme", url: "https://www.wosa.co.za/The-Industry/Wines-Of-Origin/Wine-Of-Origin-Scheme/" },
  { label: "South African wine production areas", url: "https://legacy.trade.gov/td/ocg/sawineregions.pdf" }
];

const canadaSourceLinks: SubregionSourceLink[] = [
  { label: "Wines of Canada - regions and Icewine", url: "https://winesofcanada.ca/" },
  { label: "BC Wine Authority - Okanagan Valley GI", url: "https://bcvqa.ca/geo_indication/okanagan-valley/" },
  { label: "VQA Ontario - Niagara Peninsula", url: "https://vqaontario.ca/ontario-appellations/niagara-peninsula/" }
];

const mexicoSourceLinks: SubregionSourceLink[] = [
  { label: "Consejo Mexicano Vitivinicola", url: "https://www.uvayvino.mx/" },
  { label: "DOF - Queretaro wine IGP declaration", url: "https://sidof.segob.gob.mx/notas/docFuente/5751385" },
  { label: "Gobierno de Mexico - Parras de la Fuente", url: "https://www.gob.mx/sectur/articulos/parras-de-la-fuente-coahuila" }
];

const uruguaySourceLinks: SubregionSourceLink[] = [
  { label: "INAVI - regiones vitivinicolas", url: "https://www.inavi.com.uy/regiones/" }
];

const brasilSourceLinks: SubregionSourceLink[] = [
  {
    label: "MAPA - vinhos brasileiros com indicacao geografica",
    url:
      "https://www.gov.br/agricultura/pt-br/assuntos/sustentabilidade/indicacao-geografica/arquivos-publicacoes-ig/catalogo-vinhos-brasileiros-com-indicacao-geografica/@@download/file/VINHOS%20BRASILEIROS%20COM%20INDICA%C3%87%C3%83O%20GEOGR%C3%81FICA.pdf"
  },
  { label: "Embrapa - IP Campanha Gaucha", url: "https://www.embrapa.br/en/uva-e-vinho/indicacoes-geograficas-de-vinhos-do-brasil/ip-campanha-gaucha" },
  { label: "Aprovale - Vale dos Vinhedos", url: "https://www.valedosvinhedos.com.br/" }
];

const japanSourceLinks: SubregionSourceLink[] = [
  { label: "Japan National Tax Agency - liquor geographical indications", url: "https://www.nta.go.jp/english/taxes/liquor_administration/geographical/" },
  { label: "Japan National Tax Agency - protected GI list", url: "https://www.nta.go.jp/english/taxes/liquor_administration/geographical/02.htm" },
  { label: "Yamanashi Prefecture - wine", url: "https://www.pref.yamanashi.jp/bishubiken/en/wine.html" },
  { label: "GI Nagano", url: "https://www.gi-nagano.or.jp/" }
];

const chinaSourceLinks: SubregionSourceLink[] = [
  { label: "China Mission to the EU - Helan Mountain East Region GI", url: "https://eu.china-mission.gov.cn/eng/zgggfz/cega/202211/t20221111_10972980.htm" },
  { label: "Ningxia wine industry directory - East Foothill region", url: "https://www.wineningxia.com/ningxia-wine-introduction" },
  { label: "Decanter China - Chinese wine regions", url: "https://www.decanterchina.com/en/regions/china/" }
];

const georgiaSourceLinks: SubregionSourceLink[] = [
  { label: "National Wine Agency of Georgia - winemaking regions", url: "https://wine.gov.ge/En/WineMakingRegions" },
  { label: "Georgian Wine Association - regions", url: "https://gwa.ge/en/regions/" }
];

const armeniaSourceLinks: SubregionSourceLink[] = [
  { label: "Vini Armenia - wine regions", url: "https://www.vini.am/regions" },
  { label: "My Armenia - Vayots Dzor", url: "https://myarmenia.si.edu/en/guide/regions/vayots-dzor/index.html" },
  { label: "Armenia Ministry of Economy - gastro and wine tourism guidance", url: "https://www.mineconomy.am/media/24713/Guideline%20on%20GASTRO%20AND%20WINE%20TOURISM.pdf" }
];

const turkeySourceLinks: SubregionSourceLink[] = [
  { label: "Wines of Turkiye - regions and routes", url: "https://www.winesofturkiye.com.tr/regions-routes/" },
  { label: "Wines of Turkiye", url: "https://www.winesofturkiye.com.tr/" }
];

const cyprusSourceLinks: SubregionSourceLink[] = [
  { label: "Visit Cyprus - wines and wine routes", url: "https://www.visitcyprus.com/discover-cyprus/food-drink/local-drinks/wines/" },
  { label: "Cyprus Travel Planner - wine routes", url: "https://www.visitcyprus.com/wp-content/uploads/files/PracticalInfo/travel_planner/Travel_Planner_-_English_web.pdf" },
  { label: "TTB - Cyprus wine names under US-EU agreement", url: "https://www.ttb.gov/system/files/images/pdfs/itd_-_listing_from_agreement-cyprus.pdf" }
];

const israelSourceLinks: SubregionSourceLink[] = [
  { label: "Israeli Wine - regions", url: "https://www.israel-wine.org/education/regions" },
  { label: "Israel Wines - regions", url: "https://israelwines.com/regions/" },
  { label: "Golan Tourism - wine route", url: "https://tourgolan.org.il/en/wine-route/" }
];

const lebanonSourceLinks: SubregionSourceLink[] = [
  { label: "Union Vinicole du Liban - about", url: "https://www.lebanonwines.com/about-us/" },
  { label: "Union Vinicole du Liban - terroirs", url: "https://www.lebanonwines.com/home-page-3/terroir/" }
];

const moroccoSourceLinks: SubregionSourceLink[] = [
  { label: "WIPO Lex - Coteaux de l'Atlas AOC order", url: "https://www.wipo.int/wipolex/fr/legislation/details/2962" },
  { label: "Meknes Tourism Council - cellars around Meknes", url: "https://visit-meknes.com/en/cellars-around-meknes/" },
  { label: "Roslane Wine & Spirits - viticulture", url: "https://www.roslanews.ma/viticulture/?lang=en" }
];

const tunisiaSourceLinks: SubregionSourceLink[] = [
  { label: "Tunisia APIA - geographical indications and AOC inventory", url: "https://www.apia.com.tn/medias/files/2017/siat/atelier-1.pdf" },
  { label: "European Commission regulation listing Tunisian wine AOC names", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A31983R1224" },
  { label: "Cap Bon World Region of Gastronomy dossier", url: "https://www.worldregionofgastronomy.org/wp-content/uploads/2026/01/2028-Cap-Bon_World-Region-of-Gastronomy_compressed.pdf" }
];

const crimeaSourceLinks: SubregionSourceLink[] = [
  { label: "Ukrainian GI project - Crimean wines", url: "https://gi-ua.com/en/pershi-ukra%D1%97nski-gz/vina-krimu/" },
  { label: "Crimea travel portal - wine road project", url: "https://en.travelcrimea.com/food-tourism/20200921/1472511.html" },
  { label: "Ukraine.com - Massandra winery history", url: "https://www.ukraine.com/blog/yaltas-exquisite-massandra-winery/" }
];

const ethiopiaSourceLinks: SubregionSourceLink[] = [
  { label: "Castel Winery - Ziway vineyard visit", url: "https://castelwinery.com/visit" },
  { label: "Awash Wines - longest established wine maker in Ethiopia", url: "https://awashwines.com/" },
  { label: "Embassy of Ethiopia - wine sector overview", url: "https://ethiopianembassy.be/?p=6802" }
];

const indiaSourceLinks: SubregionSourceLink[] = [
  { label: "Intellectual Property India - Nashik Valley Wine GI", url: "https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/123" },
  { label: "Karnataka Tourism - Grover Zampa Vineyards", url: "https://karnatakatourism.org/experiences/grover-zampa-vineyards" },
  { label: "Grover Zampa - Nashik Valley and Nandi Hills", url: "https://www.groverzampa.in/" }
];

const kenyaSourceLinks: SubregionSourceLink[] = [
  { label: "Leleshwa Wines - Kenya", url: "https://vind.wine/kenya/leleshwa-wine/" },
  { label: "Leleshwa Wines - products", url: "https://leleshwa.com/products/" },
  { label: "Leleshwa catalogue - Morendat Farm, Naivasha", url: "https://leleshwa.com/catalogue/Leleshwa-Catalogue.pdf" }
];

const tahitiSourceLinks: SubregionSourceLink[] = [
  { label: "Tahiti Tourisme - Le Vin de Corail", url: "https://tahititourisme.pf/en-pf/activities/a-taste-of-the-islands/le-vin-de-corail-rangiroa-en-en-pf-3344953/" },
  { label: "Vin de Tahiti", url: "https://vindetahiti.com/" },
  { label: "Tahiti Tourisme - taste the wine and rum of Rangiroa", url: "https://www.tahititourisme.com/taste-the-wine-and-rum-of-rangiroa/" }
];

const algeriaSourceLinks: SubregionSourceLink[] = [
  { label: "GCO - vineyards and vine-growers of western Algeria", url: "https://gco-dz.com/en/content/6-vignobles-vignerons" },
  { label: "GCO - Coteaux de Mascara product sheet", url: "https://gco-dz.com/img/cms/Fiche%20Produit-Coteaux%20de%20Mascara%20eng%20web.pdf" },
  { label: "CIHEAM - Algerian terroir products and VAOG zones", url: "https://om.ciheam.org/ressources/om/pdf/a89/00801099.pdf" }
];

const capeVerdeSourceLinks: SubregionSourceLink[] = [
  { label: "CERVIM guide - Cha das Caldeiras", url: "https://www.mondialvinsextremes.com/asset/cervim_guidamondial2023_qualit-amigliore-1.pdf" },
  { label: "Cape Verde Fogo viticulture study", url: "https://sigarra.up.pt/fep/pt/pub_geral.show_file?pi_doc_id=87983" }
];

const tanzaniaSourceLinks: SubregionSourceLink[] = [
  { label: "TARI Makutupora - wine-processing training in Dodoma", url: "https://www.tari.go.tz/centres/tari-makutupora" },
  { label: "DANE Wine - Dodoma", url: "https://danewine.co.tz/" },
  { label: "Domiya Estate - Dodoma winery", url: "https://domiyaestate.co.tz/about-us/" }
];

const ugandaSourceLinks: SubregionSourceLink[] = [
  { label: "Bella Wines and Juices - Uganda fruit wines", url: "https://bella.co.ug/" },
  { label: "Beb Wine Uganda - lemon and pineapple wine", url: "https://bebwine.com/" },
  { label: "Masikalan Wine Uganda", url: "https://www.masikalan.com/" }
];

export const countrySubregionGuides: Partial<Record<RegionBeverageCategoryId, Record<string, CountrySubregionGuide>>> = {
  wine: {
  "united-states": {
    category: "wine",
    countrySlug: "united-states",
    countryName: "United States",
    overview:
      "The United States needs a nested AVA study model: broad state and coast corridors first, then high-value AVA pages for California, Oregon, Washington, New York, Virginia, and emerging warm-climate regions.",
    sourceNote:
      "USA subregion hierarchy follows the TTB AVA framework. The current pages prioritize exam-relevant regions and leave full 270+ AVA coverage as a queued expansion.",
    subregions: [
      {
        slug: "napa-valley",
        name: "Napa Valley",
        parentRegion: "California / North Coast",
        classification: "AVA with nested AVAs including Atlas Peak, Calistoga, Coombsville, Howell Mountain, Los Carneros, Oakville, Rutherford, Stags Leap District, and others.",
        examWeight: "core",
        imageUrl: "/panoramas/north-america-napa-valley-360.png",
        imageAlt: "Napa Valley Cabernet vineyard panorama",
        imageStatus: "generated",
        imagePrompt: hyperrealisticImagePrompt(
          "Napa Valley",
          "United States",
          "Cabernet Sauvignon rows on volcanic benchland with valley fog lifting between the Mayacamas and Vaca ranges"
        ),
        overview:
          "Napa Valley is the highest-value California benchmark for Cabernet Sauvignon and a useful exam model for nested AVA hierarchy, mountain-versus-valley-floor terroir, and premium New World labeling.",
        location:
          "North Coast California, running roughly north-south between the Mayacamas range to the west and Vaca range to the east, with San Pablo Bay influence strongest in the south.",
        climate:
          "Mediterranean, but highly modulated by fog, elevation, aspect, and distance from San Pablo Bay. Southern zones such as Los Carneros and Coombsville are cooler; valley-floor and northern sites are warmer; mountain AVAs sit above or beside fog influence.",
        soils:
          "Complex alluvial fans, volcanic material, gravelly benchlands, clay loams, and mountain-derived deposits. Exams often test the contrast between fertile valley floor, gravelly bench, and stressed mountain sites.",
        grapes: {
          white: ["Chardonnay", "Sauvignon Blanc", "Semillon", "Riesling"],
          red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot", "Malbec", "Pinot Noir", "Zinfandel"]
        },
        styles: [
          "Full-bodied Cabernet Sauvignon and Bordeaux-style blends",
          "Structured mountain Cabernet with firmer tannin and darker fruit",
          "Cooler southern Chardonnay and Pinot Noir from Los Carneros",
          "Sauvignon Blanc ranging from stainless freshness to richer barrel-influenced styles"
        ],
        serviceCue:
          "For service exams, connect Napa to premium Cabernet structure: ripe black fruit, oak, high alcohol potential, firm tannin, and steak or grilled protein pairings.",
        examFocus: [
          "Napa Valley is nested in North Coast; many sub-AVAs are nested within Napa Valley.",
          "Know valley-floor benchmarks such as Oakville, Rutherford, St. Helena, and Stags Leap District.",
          "Know mountain benchmarks such as Howell Mountain, Spring Mountain District, Mt. Veeder, Diamond Mountain District, and Atlas Peak.",
          "Los Carneros is cooler and partly shared with Sonoma, making it important for Chardonnay and Pinot Noir."
        ],
        sourceLinks: [
          ...usaSourceLinks,
          {
            label: "Napa Valley Vintners staff training guide",
            url: "https://napavintners.com/trade/docs/Napa_Valley_Staff_Training_Guide.pdf"
          }
        ],
        panoramaScene: {
          id: "usa-napa-valley-subregion",
          country: "United States",
          region: "Napa Valley AVA, California",
          title: "Napa Valley Cabernet Benchlands",
          imageSrc: "/panoramas/north-america-napa-valley-360.png",
          imageAlt: "360 vineyard panorama from inside a Napa Valley Cabernet Sauvignon vineyard",
          copy:
            "Use the 360 view to study the Napa service story: ordered Cabernet rows, volcanic benchland cues, mountain corridors, and fog-driven freshness in a warm premium region.",
          details: ["Cabernet Sauvignon", "Nested AVA hierarchy", "Volcanic benchland", "Bay fog corridor"]
        }
      },
      {
        slug: "sonoma-county",
        name: "Sonoma County",
        parentRegion: "California / North Coast",
        classification: "County-level winegrowing area with AVA diversity including Russian River Valley, Sonoma Coast, Alexander Valley, Dry Creek Valley, and Sonoma Valley.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Sonoma,County,vineyard,California",
        imageAlt: "Sonoma County vineyard landscape",
        imageStatus: "queued",
        imagePrompt: hyperrealisticImagePrompt(
          "Sonoma County",
          "United States",
          "rolling coastal-influenced vineyards with redwood-edge fog and mixed Pinot Noir, Chardonnay, Zinfandel, and Cabernet Sauvignon study cues"
        ),
        overview:
          "Sonoma is the California counterweight to Napa: larger, more climatically varied, and more diverse in grape identity, from cool Russian River Pinot Noir to Dry Creek Zinfandel and Alexander Valley Cabernet.",
        location:
          "North Coast California, west and northwest of Napa, stretching from Pacific-influenced coastal zones through inland valleys and mountain corridors.",
        climate:
          "Strong maritime gradient. Coastal and Russian River sites are fog-cooled; Alexander Valley and Dry Creek are warmer; elevation and aspect create large stylistic variation.",
        soils:
          "Marine sediment, volcanic material, alluvial valley soils, gravel benches, and sandy loams. Soil and fog pattern are central to sorting Chardonnay/Pinot zones from Cabernet/Zinfandel zones.",
        grapes: {
          white: ["Chardonnay", "Sauvignon Blanc", "Gewurztraminer"],
          red: ["Pinot Noir", "Zinfandel", "Cabernet Sauvignon", "Merlot", "Syrah"]
        },
        styles: [
          "Russian River and Sonoma Coast Pinot Noir and Chardonnay",
          "Dry Creek Valley Zinfandel and Sauvignon Blanc",
          "Alexander Valley Cabernet Sauvignon and Merlot",
          "Sonoma Valley mixed heritage and Bordeaux/Rhone varieties"
        ],
        serviceCue:
          "Use Sonoma when a guest wants California quality with more stylistic range than Napa, especially Pinot Noir, Chardonnay, Zinfandel, and cooler coastal expressions.",
        examFocus: [
          "Separate cool Sonoma Coast/Russian River from warmer Alexander Valley and Dry Creek Valley.",
          "Remember Russian River Valley for fog-cooled Pinot Noir and Chardonnay.",
          "Dry Creek Valley is a classic Zinfandel reference.",
          "Alexander Valley is a warmer Cabernet/Merlot reference."
        ],
        sourceLinks: usaSourceLinks
      },
      {
        slug: "willamette-valley",
        name: "Willamette Valley",
        parentRegion: "Oregon",
        classification:
          "AVA with nested AVAs including Chehalem Mountains, Dundee Hills, Eola-Amity Hills, Laurelwood District, Lower Long Tom, McMinnville, Mount Pisgah, Ribbon Ridge, Tualatin Hills, Van Duzer Corridor, and Yamhill-Carlton.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Willamette,Valley,vineyard,Oregon",
        imageAlt: "Willamette Valley Pinot Noir vineyard landscape",
        imageStatus: "queued",
        imagePrompt: hyperrealisticImagePrompt(
          "Willamette Valley",
          "United States",
          "cool-climate Pinot Noir vineyards on gentle Oregon hills with volcanic red Jory soil cues and Coast Range cloud cover"
        ),
        overview:
          "Willamette Valley is the core United States exam benchmark for cool-climate Pinot Noir outside California and a clean model for nested AVA study.",
        location:
          "Western Oregon, between the Coast Range and Cascade Range, extending around Portland south toward Eugene across multiple counties.",
        climate:
          "Cool, wet winters and dry growing seasons. The Coast Range moderates Pacific influence, while Van Duzer Corridor wind and hillside exposure shape ripening and acid retention.",
        soils:
          "Volcanic Jory soils, marine sedimentary soils, loess, and basalt-derived sites. Exams commonly connect red volcanic soils and marine sediment to Pinot Noir site expression.",
        grapes: {
          white: ["Chardonnay", "Pinot Gris", "Riesling"],
          red: ["Pinot Noir", "Gamay"]
        },
        styles: [
          "Cool-climate Pinot Noir with red fruit, spice, savory earth, and moderate alcohol",
          "Increasingly important Chardonnay with tension and site focus",
          "Pinot Gris and Riesling as regional white references"
        ],
        serviceCue:
          "Position Willamette Pinot Noir between Burgundy and California: fresher than many warm New World examples, but usually fruit-forward and accessible.",
        examFocus: [
          "Pinot Noir is the dominant exam association.",
          "Know nested AVAs such as Dundee Hills, Eola-Amity Hills, Yamhill-Carlton, Ribbon Ridge, and McMinnville.",
          "Van Duzer Corridor is important for wind influence.",
          "Chardonnay is an increasingly important premium category."
        ],
        sourceLinks: [
          ...usaSourceLinks,
          {
            label: "Oregon Wine Board - Willamette Valley",
            url: "https://www.oregonwine.org/regions/willamette-valley/"
          }
        ]
      },
      {
        slug: "columbia-valley",
        name: "Columbia Valley",
        parentRegion: "Washington / Oregon",
        classification:
          "Large multi-state AVA containing important Washington AVAs such as Yakima Valley, Red Mountain, Horse Heaven Hills, Ancient Lakes, Snipes Mountain, and Walla Walla Valley.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Columbia,Valley,vineyard,Washington,wine",
        imageAlt: "Columbia Valley vineyard landscape",
        imageStatus: "queued",
        imagePrompt: hyperrealisticImagePrompt(
          "Columbia Valley",
          "United States",
          "dry high-desert Washington vineyard rows with basalt hills, irrigation lines, wide skies, and Cabernet, Merlot, Riesling, and Syrah study cues"
        ),
        overview:
          "Columbia Valley explains Washington wine: dry continental conditions, irrigation dependence, strong diurnal range, and powerful Bordeaux/Rhone red varieties with Riesling and Chardonnay.",
        location:
          "Primarily eastern Washington with a small Oregon extension, sitting in the rain shadow of the Cascade Range.",
        climate:
          "Continental and dry, with hot sunny days, cool nights, and low disease pressure. Irrigation is central because the Cascades block much Pacific rainfall.",
        soils:
          "Basalt bedrock, loess, wind-blown silt, glacial flood deposits, sand, and gravel. Free-draining soils and irrigation control are major quality levers.",
        grapes: {
          white: ["Riesling", "Chardonnay", "Sauvignon Blanc", "Chenin Blanc"],
          red: ["Cabernet Sauvignon", "Merlot", "Syrah", "Cabernet Franc", "Malbec"]
        },
        styles: [
          "Structured Cabernet Sauvignon and Merlot",
          "Syrah with dark fruit, pepper, and savory notes",
          "Dry to sweet Riesling",
          "Blended Bordeaux-style reds from warmer sites"
        ],
        serviceCue:
          "Use Columbia Valley for guests who like ripe New World reds but want more freshness, value, and savory structure than many California options.",
        examFocus: [
          "Rain shadow and irrigation are the key climate concepts.",
          "Yakima Valley and Walla Walla Valley are important nested/related AVAs.",
          "Red Mountain is a warm, structured red-wine benchmark.",
          "Riesling remains important even though red varieties dominate premium visibility."
        ],
        sourceLinks: usaSourceLinks
      },
      {
        slug: "finger-lakes",
        name: "Finger Lakes",
        parentRegion: "New York",
        classification: "AVA in New York State, with Seneca, Cayuga, Keuka, and Canandaigua lake influence central to viticulture.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Finger,Lakes,vineyard,Riesling",
        imageAlt: "Finger Lakes Riesling vineyard landscape",
        imageStatus: "queued",
        imagePrompt: hyperrealisticImagePrompt(
          "Finger Lakes",
          "United States",
          "steep Riesling vineyard above a deep glacial lake with cool-climate morning mist and shale-limestone soil texture"
        ),
        overview:
          "Finger Lakes is the key eastern United States cool-climate benchmark, especially for Riesling and other aromatic whites shaped by deep glacial lake moderation.",
        location:
          "Upstate New York around long, narrow glacial lakes including Seneca, Cayuga, Keuka, and Canandaigua.",
        climate:
          "Cool continental with severe winter risk moderated by deep lake heat retention. Best sites rely on slope, drainage, lake proximity, and air movement.",
        soils:
          "Glacial deposits, shale, limestone-influenced material, silt loam, and gravel. Drainage and slope are critical for ripening and frost management.",
        grapes: {
          white: ["Riesling", "Gewurztraminer", "Chardonnay", "Pinot Gris"],
          red: ["Cabernet Franc", "Pinot Noir", "Lemberger / Blaufrankisch"]
        },
        styles: [
          "Dry to sweet Riesling with high acidity",
          "Sparkling wine from cool-climate varieties",
          "Cabernet Franc and lighter red styles",
          "Ice wine and late-harvest styles in suitable vintages"
        ],
        serviceCue:
          "For service, Finger Lakes Riesling is the high-acid pairing tool for spice, pork, freshwater fish, and dishes needing sweetness-acid balance.",
        examFocus: [
          "Deep lakes moderate frost and winter cold.",
          "Riesling is the primary exam association.",
          "Seneca and Cayuga are common lake-name references.",
          "Cold-climate risk makes site selection central."
        ],
        sourceLinks: usaSourceLinks
      },
      {
        slug: "texas-hill-country",
        name: "Texas Hill Country",
        parentRegion: "Texas",
        classification: "Large Texas AVA containing Bell Mountain and Fredericksburg in the Texas Hill Country.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Texas,Hill,Country,vineyard",
        imageAlt: "Texas Hill Country vineyard landscape",
        imageStatus: "queued",
        imagePrompt: hyperrealisticImagePrompt(
          "Texas Hill Country",
          "United States",
          "limestone hill country vineyard at golden hour with drought-aware canopy, warm-climate Mediterranean red varieties, and rugged oak savanna landscape"
        ),
        overview:
          "Texas Hill Country is useful for modern exam context: warm-climate viticulture, drought/heat management, and emerging American regional identity outside the West Coast.",
        location:
          "Central Texas west of Austin and north of San Antonio, centered around the Hill Country and Fredericksburg wine tourism corridor.",
        climate:
          "Warm to hot, with drought pressure, spring frost/hail risk in some years, and a need for heat-tolerant varieties, canopy management, and irrigation decisions.",
        soils:
          "Limestone, calcareous soils, clay loams, and rocky hill-country sites. Drainage and water management are major practical concerns.",
        grapes: {
          white: ["Viognier", "Roussanne", "Marsanne", "Vermentino", "Picpoul"],
          red: ["Tempranillo", "Mourvedre", "Sangiovese", "Tannat", "Syrah", "Grenache"]
        },
        styles: [
          "Warm-climate Mediterranean red blends",
          "Tempranillo and Mourvedre with ripe fruit and spice",
          "Rhone-style whites and textured aromatic whites",
          "Tourism-driven tasting-room bottlings"
        ],
        serviceCue:
          "Texas Hill Country is a good teaching contrast to California: warmer, drier, more Mediterranean-variety focused, and strongly tied to local tourism.",
        examFocus: [
          "Know it as a large Texas AVA rather than a classic West Coast region.",
          "Heat and drought adaptation are the central viticultural themes.",
          "Mediterranean and Iberian varieties are more logical than cool-climate grapes.",
          "Fredericksburg is the key tourism/service anchor."
        ],
        sourceLinks: usaSourceLinks
      }
    ]
  },
  canada: {
    category: "wine",
    countrySlug: "canada",
    countryName: "Canada",
    overview:
      "Canada's benchmark pages teach cool-climate viticulture, lake moderation, VQA origin rules, Icewine, and the split between British Columbia's dry interior and Ontario's Great Lakes appellations.",
    sourceNote:
      "Canada pages use Wines of Canada, BC Wine Authority, and VQA Ontario sources. Dedicated country and subregion 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Canada", {
        slug: "okanagan-valley",
        name: "Okanagan Valley",
        parentRegion: "British Columbia",
        classification: "British Columbia Geographical Indication with multiple Okanagan sub-GIs.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Okanagan,Valley,vineyard,lake",
        imageAlt: "Okanagan Valley lake-influenced vineyard landscape",
        imageSubject:
          "Okanagan Valley vineyards above a long glacial lake with arid southern slopes, Naramata Bench-style terraces, irrigation lines, and Riesling, Pinot Gris, Merlot, Syrah, and Cabernet study cues",
        overview:
          "Okanagan Valley is the clearest Canadian counterpoint to Niagara: drier, more continental, strongly shaped by Okanagan Lake, and broad enough to cover crisp whites, structured reds, sparkling wine, and Icewine.",
        location:
          "Interior British Columbia, stretching from the U.S. border north toward Armstrong, with vineyards organized around Okanagan Lake and its sub-geographical indications.",
        climate:
          "Continental and dry by Canadian standards, with lake moderation, major north-south heat variation, warm southern sites, cooler northern sites, and irrigation as a practical quality lever.",
        soils:
          "Glacial till, sand, gravel, volcanic material, lake-influenced slopes, and nutrient-poor, free-draining sites that encourage concentration and site contrast.",
        white: ["Pinot Gris", "Chardonnay", "Riesling", "Gewurztraminer", "Sauvignon Blanc"],
        red: ["Merlot", "Pinot Noir", "Cabernet Sauvignon", "Syrah", "Cabernet Franc"],
        styles: [
          "Pinot Gris and Riesling with bright acidity",
          "Cool-to-moderate climate Chardonnay and sparkling wine",
          "Merlot, Syrah, and Cabernet-family reds from warmer southern sites",
          "Icewine and late-harvest wines when winter conditions permit"
        ],
        serviceCue:
          "Use Okanagan when a guest wants Canadian table wine beyond Icewine: lake-moderated freshness with enough warmth in the south for credible red structure.",
        examFocus: [
          "Okanagan Valley is British Columbia's flagship GI.",
          "Okanagan Lake moderation and north-south heat variation explain the region's range.",
          "Know Naramata Bench, Golden Mile Bench, Okanagan Falls, Lake Country, and related sub-GI names as study anchors.",
          "Do not describe all Canadian wine as only Icewine."
        ],
        sourceLinks: canadaSourceLinks
      }),
      wineBenchmarkPage("Canada", {
        slug: "niagara-peninsula",
        name: "Niagara Peninsula",
        parentRegion: "Ontario",
        classification: "Ontario VQA viticultural area with multiple regional and sub-appellations.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Niagara,Peninsula,vineyard,Ontario",
        imageAlt: "Niagara Peninsula cool-climate vineyard landscape",
        imageSubject:
          "Niagara Peninsula vineyards below the Niagara Escarpment with Lake Ontario breezes, limestone and clay soils, Riesling, Chardonnay, Cabernet Franc, Pinot Noir, and Vidal Icewine study cues",
        overview:
          "Niagara Peninsula is Canada's classic VQA and Icewine exam region: Great Lakes moderation, escarpment exposure, Riesling, Chardonnay, Pinot Noir, Cabernet Franc, and Vidal-based Icewine.",
        location:
          "Southern Ontario between Lake Ontario, the Niagara River, the Welland River, and the Hamilton edge, with Niagara-on-the-Lake and Niagara Escarpment subregions.",
        climate:
          "Cool continental moderated by Lake Ontario and escarpment airflow. Winter risk, lake effect, slope, and harvest timing are central to both table wine and Icewine.",
        soils:
          "Limestone-influenced material, clay loams, glacial deposits, and escarpment-related drainage variation that supports cool-climate varieties.",
        white: ["Riesling", "Chardonnay", "Vidal", "Pinot Gris", "Sauvignon Blanc"],
        red: ["Cabernet Franc", "Pinot Noir", "Merlot", "Gamay", "Cabernet Sauvignon"],
        styles: [
          "Vidal, Riesling, and Cabernet Franc Icewine",
          "Dry Riesling with high acidity",
          "Chardonnay and traditional-method sparkling wine",
          "Cabernet Franc, Pinot Noir, and Gamay in lighter cool-climate red styles"
        ],
        serviceCue:
          "Use Niagara Icewine for dessert, blue cheese, foie gras, and fruit desserts, but present dry Riesling, Chardonnay, and Cabernet Franc as the everyday table-wine story.",
        examFocus: [
          "Niagara Peninsula is Ontario's largest and most testable VQA area.",
          "Lake Ontario and the Niagara Escarpment are the key climate and site concepts.",
          "Icewine must be made from grapes naturally frozen on the vine; Vidal, Riesling, and Cabernet Franc are key grapes.",
          "Niagara-on-the-Lake and Niagara Escarpment are important regional names."
        ],
        sourceLinks: canadaSourceLinks
      }),
      wineBenchmarkPage("Canada", {
        slug: "nova-scotia-annapolis-valley",
        name: "Nova Scotia / Annapolis Valley",
        parentRegion: "Atlantic Canada",
        classification: "Atlantic Canadian wine region centered on cool maritime sites and Tidal Bay-style white blends.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Nova,Scotia,Annapolis,Valley,vineyard",
        imageAlt: "Nova Scotia Annapolis Valley vineyard landscape",
        imageSubject:
          "Annapolis Valley vineyards near the Bay of Fundy with cool maritime cloud, hybrid and vinifera plantings, sparkling wine base, and Tidal Bay white-wine study cues",
        overview:
          "Nova Scotia is a useful Canadian exam expansion page for maritime acidity, sparkling wine, hybrid grapes, and Tidal Bay-style aromatic white blends.",
        location:
          "Atlantic Canada, especially the Annapolis Valley and nearby coastal-influenced sites between the Bay of Fundy and Northumberland Strait contexts.",
        climate:
          "Cool maritime, humid, windy, and short-season, with frost risk and strong need for site selection, disease management, and winter-hardy varieties.",
        soils:
          "Glacial, sedimentary, and valley soils with drainage variation; practical success depends more on slope, exposure, winter survival, and disease pressure than classic warm-climate ripening.",
        white: ["L'Acadie Blanc", "Seyval Blanc", "Muscat", "Chardonnay", "Riesling"],
        red: ["Marechal Foch", "Leon Millot", "Pinot Noir"],
        styles: [
          "Traditional-method sparkling wine",
          "Tidal Bay-style aromatic white blends",
          "High-acid hybrid and vinifera whites",
          "Dessert wines from cold-climate varieties"
        ],
        serviceCue:
          "Use Nova Scotia for seafood service: high-acid sparkling and aromatic whites that match oysters, shellfish, salt, and cold-water coastal cuisine.",
        examFocus: [
          "Nova Scotia broadens Canada beyond Ontario and British Columbia.",
          "Tidal Bay is the key white-blend service cue.",
          "Sparkling wine and high-acid whites are more testable than full-bodied reds.",
          "Hybrid grapes and maritime disease pressure matter in the viticulture story."
        ],
        sourceLinks: canadaSourceLinks
      })
    ]
  },
  mexico: {
    category: "wine",
    countrySlug: "mexico",
    countryName: "Mexico",
    overview:
      "Mexico's benchmark pages focus on Baja California's Pacific-cooled premium corridor, inland desert-oasis heritage in Coahuila, and the newly protected Queretaro wine identity for sparkling and high-elevation production.",
    sourceNote:
      "Mexico pages use Consejo Mexicano Vitivinicola, Mexican government tourism material, and the official Queretaro IGP declaration. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Mexico", {
        slug: "valle-de-guadalupe",
        name: "Valle de Guadalupe",
        parentRegion: "Baja California",
        classification: "Premier Mexican wine valley within Baja California's Ensenada wine corridor.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Valle,de,Guadalupe,vineyard,Baja,California",
        imageAlt: "Valle de Guadalupe vineyard landscape",
        imageSubject:
          "Valle de Guadalupe vineyards in Baja California with Pacific marine influence, granitic hills, dry farming and irrigation cues, Mediterranean red varieties, and Ensenada food-and-wine service context",
        overview:
          "Valle de Guadalupe is Mexico's most visible premium wine shorthand: Baja California, dry Mediterranean conditions, Pacific influence, experimental varieties, and a strong restaurant-tourism identity.",
        location:
          "Baja California near Ensenada, inland from the Pacific coast and close to the Tijuana-Ensenada tourism corridor.",
        climate:
          "Dry Mediterranean-to-semi-arid conditions with Pacific moderation, strong sunlight, water pressure, and large differences by elevation and distance from marine influence.",
        soils:
          "Granitic, sandy, alluvial, and rocky soils; water availability, salinity, drainage, and heat management are central practical concerns.",
        white: ["Chenin Blanc", "Sauvignon Blanc", "Chardonnay", "Viognier", "Vermentino"],
        red: ["Nebbiolo", "Tempranillo", "Cabernet Sauvignon", "Syrah", "Grenache", "Merlot"],
        styles: [
          "Mediterranean red blends",
          "Nebbiolo-inspired Mexican reds",
          "Textural whites and orange/low-intervention experiments",
          "Food-focused tourism bottlings"
        ],
        serviceCue:
          "Use Valle de Guadalupe for guests who like warm-climate reds and destination wine-country dining; pair with grilled seafood, lamb, mole, and smoky Baja cuisine.",
        examFocus: [
          "Baja California, especially Valle de Guadalupe, dominates Mexico's premium wine visibility.",
          "Pacific moderation and water pressure are the key climate concepts.",
          "Mexico's grape story is diverse and experimental rather than one classic variety.",
          "Do not confuse the wine region with tequila or mezcal appellation geography."
        ],
        sourceLinks: mexicoSourceLinks
      }),
      wineBenchmarkPage("Mexico", {
        slug: "parras-coahuila",
        name: "Parras / Coahuila",
        parentRegion: "Coahuila",
        classification: "Historic desert-oasis wine corridor around Parras de la Fuente.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Parras,Coahuila,vineyard,desert",
        imageAlt: "Parras Coahuila desert-oasis vineyard landscape",
        imageSubject:
          "Parras de la Fuente vineyards in a desert oasis with mountains, irrigation, old mission-era wine heritage, Cabernet, Syrah, and warm-climate red-wine study cues",
        overview:
          "Parras is the Mexican history page: desert-oasis viticulture, old wine heritage, irrigation, and warm-climate reds away from Baja California.",
        location:
          "Southern Coahuila around Parras de la Fuente, an inland oasis surrounded by arid northern Mexican landscapes.",
        climate:
          "Arid to semi-arid with hot days, cool nights at elevation, low rainfall, and irrigation dependence.",
        soils:
          "Alluvial desert soils, limestone-influenced materials, gravel, and oasis agriculture where water control is the defining practical variable.",
        white: ["Chardonnay", "Sauvignon Blanc", "Chenin Blanc"],
        red: ["Cabernet Sauvignon", "Syrah", "Merlot", "Tempranillo", "Malbec"],
        styles: [
          "Warm-climate Cabernet and Bordeaux-style blends",
          "Syrah and Tempranillo with ripe fruit",
          "Desert-oasis whites with moderate freshness",
          "Historic estate and tourism bottlings"
        ],
        serviceCue:
          "Use Parras as the heritage contrast to Baja: inland, drier, more oasis-driven, and better suited to warm red pairings than coastal freshness.",
        examFocus: [
          "Parras de la Fuente is Mexico's key historic wine reference.",
          "Coahuila is inland and desert-influenced, unlike Pacific-cooled Baja.",
          "Irrigation and oasis agriculture explain viability.",
          "Cabernet, Syrah, Merlot, and Tempranillo are more logical than cool-climate grapes."
        ],
        sourceLinks: mexicoSourceLinks
      }),
      wineBenchmarkPage("Mexico", {
        slug: "queretaro-wine-region",
        name: "Queretaro Wine Region",
        parentRegion: "Central Mexico",
        classification: "Protected geographical indication for Vinos de la Region Vitivinicola de Queretaro.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Queretaro,vineyard,sparkling,wine,Mexico",
        imageAlt: "Queretaro high-elevation sparkling wine vineyard landscape",
        imageSubject:
          "Queretaro high-elevation vineyards for sparkling wine with semi-arid plateau light, limestone and clay texture, trellised vines, and traditional-method/tank-method production cues",
        overview:
          "Queretaro is newly important because its protected geographical indication formalizes a central Mexican wine identity, especially around sparkling wine, high-elevation vineyards, and tourism.",
        location:
          "Central Mexico, including municipalities such as Tequisquiapan, Ezequiel Montes, El Marques, San Juan del Rio, Colon, Huimilpan, Cadereyta de Montes, and Pedro Escobedo.",
        climate:
          "Semi-arid highland conditions with strong sunlight, altitude-driven temperature shifts, and enough cool-night retention for sparkling-base and aromatic wines.",
        soils:
          "Mixed plateau soils including clay, limestone-influenced material, and rocky parcels; water management and acidity retention are key.",
        white: ["Macabeo", "Chardonnay", "Sauvignon Blanc", "Xarel-lo", "Viognier"],
        red: ["Cabernet Sauvignon", "Merlot", "Syrah", "Tempranillo", "Malbec"],
        styles: [
          "Traditional-method sparkling wine",
          "Tank-method sparkling wine",
          "Fresh aromatic whites",
          "Medium-bodied reds for tourism and local service"
        ],
        serviceCue:
          "Use Queretaro sparkling as the Mexico-by-the-glass surprise: highland freshness, bubbles, and food flexibility with fried, salty, and chile-driven dishes.",
        examFocus: [
          "Queretaro received protected geographical-indication status for wine.",
          "It is especially relevant for Mexican sparkling wine.",
          "Altitude and semi-arid plateau conditions are the main style explanation.",
          "Keep it separate from Baja California and Coahuila in route and climate."
        ],
        sourceLinks: mexicoSourceLinks
      })
    ]
  },
  brasil: {
    category: "wine",
    countrySlug: "brasil",
    countryName: "Brasil",
    overview:
      "Brasil's benchmark pages teach the country's southern wine identity through Serra Gaucha heritage, Vale dos Vinhedos DO rules, traditional-method sparkling, Merlot, Moscato, and warmer Campanha Gaucha red-wine expansion.",
    sourceNote:
      "Brasil pages use Brazilian geographical-indication material from MAPA, Embrapa, and regional associations. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Brasil", {
        slug: "vale-dos-vinhedos",
        name: "Vale dos Vinhedos",
        parentRegion: "Serra Gaucha / Rio Grande do Sul",
        classification: "Brazilian Denominacao de Origem and first Brazilian wine geographical indication.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Vale,dos,Vinhedos,vineyard,Brazil",
        imageAlt: "Vale dos Vinhedos vineyard landscape",
        imageSubject:
          "Vale dos Vinhedos Serra Gaucha vineyards near Bento Goncalves with Italian immigrant cellar architecture, rolling Araucaria plateau hills, Chardonnay, Pinot Noir sparkling base, and Merlot DO study cues",
        overview:
          "Vale dos Vinhedos is Brasil's core wine-law and exam page: first GI, later DO, Serra Gaucha heritage, Merlot for reds, Chardonnay-focused whites, and traditional-method sparkling.",
        location:
          "Rio Grande do Sul, around Bento Goncalves, Garibaldi, and Monte Belo do Sul in the Serra Gaucha highlands.",
        climate:
          "Humid subtropical highland conditions with rainfall pressure, mild temperatures, and enough elevation to protect acidity for sparkling wine.",
        soils:
          "Basalt-derived highland soils, clay, and rolling slopes; disease management and harvest timing are major practical issues in the humid climate.",
        white: ["Chardonnay", "Riesling Italico", "Pinot Noir for sparkling base"],
        red: ["Merlot", "Cabernet Sauvignon", "Cabernet Franc", "Tannat"],
        styles: [
          "Traditional-method sparkling wine",
          "Merlot-led red wines",
          "Chardonnay and Riesling Italico whites",
          "Oak-aged DO wines with regulated grape and aging expectations"
        ],
        serviceCue:
          "Use Vale dos Vinhedos for Brasilian sparkling and Merlot-led reds; it is the easiest legal-origin story for staff and exam recall.",
        examFocus: [
          "Vale dos Vinhedos was Brasil's first wine GI and later became a DO.",
          "Merlot is obligatory for DO red-wine identity.",
          "Chardonnay and/or Pinot Noir are central for traditional-method sparkling.",
          "Serra Gaucha is humid, so disease pressure and acidity retention matter."
        ],
        sourceLinks: brasilSourceLinks
      }),
      wineBenchmarkPage("Brasil", {
        slug: "pinto-bandeira",
        name: "Pinto Bandeira",
        parentRegion: "Serra Gaucha / Rio Grande do Sul",
        classification: "Brazilian geographical indication strongly associated with sparkling wine.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Pinto,Bandeira,vineyard,sparkling,wine,Brazil",
        imageAlt: "Pinto Bandeira sparkling wine vineyard landscape",
        imageSubject:
          "Pinto Bandeira steep rolling vineyards in Serra Gaucha with cool highland morning mist, Chardonnay and Pinot Noir sparkling-base rows, native forest edges, and traditional-method study cues",
        overview:
          "Pinto Bandeira is the precision sparkling page inside Brasil: cooler highland slopes, traditional-method identity, Chardonnay/Pinot Noir, and Moscatel sparkling context.",
        location:
          "Rio Grande do Sul, near Bento Goncalves and Farroupilha, within the broader Serra Gaucha wine tourism system.",
        climate:
          "Cooler highland, humid subtropical conditions that preserve acidity but require careful canopy, disease, and harvest management.",
        soils:
          "Basaltic and clay-rich highland soils on steep and rolling slopes, with drainage and exposure driving sparkling-base quality.",
        white: ["Chardonnay", "Riesling Italico", "Viognier", "Moscato Branco", "Malvasia Bianca"],
        red: ["Pinot Noir", "Cabernet Franc", "Merlot", "Tannat", "Cabernet Sauvignon"],
        styles: [
          "Traditional-method brut sparkling wine",
          "Moscatel sparkling wine",
          "High-acid Chardonnay",
          "Light-to-medium reds from cooler highland sites"
        ],
        serviceCue:
          "Use Pinto Bandeira as the Brasilian sparkling upsell: high-acid, traditional-method, and more premium-service oriented than generic Brasilian wine.",
        examFocus: [
          "Pinto Bandeira is especially important for sparkling wine.",
          "Traditional-method sparkling from Chardonnay and Pinot Noir is the key association.",
          "Serra Gaucha humidity remains a viticultural pressure.",
          "Moscatel sparkling is also part of the regional service story."
        ],
        sourceLinks: brasilSourceLinks
      }),
      wineBenchmarkPage("Brasil", {
        slug: "campanha-gaucha",
        name: "Campanha Gaucha",
        parentRegion: "Rio Grande do Sul / Pampa",
        classification: "Brazilian Indicacao de Procedencia near the Argentina-Uruguay border.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Campanha,Gaucha,vineyard,Pampa,Brazil",
        imageAlt: "Campanha Gaucha Pampa vineyard landscape",
        imageSubject:
          "Campanha Gaucha vineyards on open Pampa near the Uruguay and Argentina border with warm dry light, trellised rows, Tannat, Cabernet, Merlot, and sparkling/rose study cues",
        overview:
          "Campanha Gaucha is the warm, drier Brasil contrast to Serra Gaucha: Pampa landscape, border influence, lower rainfall, red-wine potential, and modern vineyard expansion.",
        location:
          "Southern Rio Grande do Sul along the Pampa, near the borders with Uruguay and Argentina, including municipalities such as Bage, Dom Pedrito, Santana do Livramento, and Uruguaiana.",
        climate:
          "Temperate with colder winters, hot dry summers, lower precipitation than Serra Gaucha, and strong diurnal shifts in some sectors.",
        soils:
          "Pampa soils with sedimentary, sandy, and well-drained profiles; lower rainfall and open exposure support red varieties and canopy management.",
        white: ["Chardonnay", "Sauvignon Blanc", "Gewurztraminer", "Riesling Italico"],
        red: ["Tannat", "Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Marselan", "Tempranillo"],
        styles: [
          "Tannat and Cabernet-family reds",
          "Merlot and red blends",
          "Rose and sparkling wine",
          "Dry whites from warmer, lower-rainfall vineyards"
        ],
        serviceCue:
          "Use Campanha Gaucha when a guest wants a richer Brasilian red; compare it with Uruguay's Tannat corridor rather than with humid Serra Gaucha sparkling.",
        examFocus: [
          "Campanha Gaucha is warmer and drier than Serra Gaucha.",
          "It sits in the Pampa near Uruguay and Argentina.",
          "Tannat, Cabernet, Merlot, and other red varieties are the main study cues.",
          "The IP frame is important for origin-language recall."
        ],
        sourceLinks: brasilSourceLinks
      })
    ]
  },
  uruguay: {
    category: "wine",
    countrySlug: "uruguay",
    countryName: "Uruguay",
    overview:
      "Uruguay's benchmark pages prioritize Tannat, humid maritime freshness, Canelones production weight, Maldonado's Atlantic/granite quality movement, and river-influenced western regions.",
    sourceNote:
      "Uruguay pages use INAVI regional descriptions. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Uruguay", {
        slug: "canelones",
        name: "Canelones",
        parentRegion: "Southern Uruguay / Metropolitan wine belt",
        classification: "Uruguay's largest and most productive wine department, centered near Montevideo.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Canelones,Uruguay,vineyard,Tannat",
        imageAlt: "Canelones Tannat vineyard landscape",
        imageSubject:
          "Canelones Tannat vineyards on gently rolling southern Uruguay farmland with Rio de la Plata humidity, clay-rich soils, granite-pink stone cues, and family winery study context",
        overview:
          "Canelones is Uruguay's production and Tannat anchor: close to Montevideo, humid, gently rolling, and responsible for the country's easiest exam association.",
        location:
          "Southern Uruguay around Canelones and Montevideo, near the Rio de la Plata and the main domestic market.",
        climate:
          "Humid temperate maritime-influenced climate with rainfall, moderate summers, cool nights, and disease pressure requiring canopy and vineyard management.",
        soils:
          "Sedimentary, clay-rich, fertile, and dense soils, with notable old granite and varied local parcels that support Tannat, whites, and blended reds.",
        white: ["Chardonnay", "Sauvignon Blanc", "Viognier", "Albarino"],
        red: ["Tannat", "Merlot", "Cabernet Sauvignon", "Cabernet Franc", "Marselan"],
        styles: [
          "Tannat from structured to modern polished styles",
          "Tannat blends with Merlot or Cabernet",
          "Fresh Chardonnay and Sauvignon Blanc",
          "Rose and lighter reds for local service"
        ],
        serviceCue:
          "Use Canelones for the default Uruguay Tannat answer: firm tannin, dark fruit, grilled beef, and enough maritime freshness to avoid overripe heaviness.",
        examFocus: [
          "Canelones is Uruguay's main production heartland.",
          "Tannat is the central grape association.",
          "Humidity and rainfall are key viticultural concerns.",
          "Montevideo proximity explains both history and service-market relevance."
        ],
        sourceLinks: uruguaySourceLinks
      }),
      wineBenchmarkPage("Uruguay", {
        slug: "maldonado",
        name: "Maldonado",
        parentRegion: "Atlantic Uruguay",
        classification: "Atlantic-influenced emerging quality region including Laguna Garzon context.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Maldonado,Uruguay,vineyard,Atlantic",
        imageAlt: "Maldonado Atlantic vineyard landscape",
        imageSubject:
          "Maldonado vineyards near Atlantic coastal hills with crystalline rock, quartz and ballast texture, ocean cloud, Albarino, Pinot Noir, Tannat, and premium modern winery cues",
        overview:
          "Maldonado is Uruguay's modern quality and freshness page: Atlantic influence, greater geological diversity, higher-profile investment, and whites/Pinot/Tannat beyond the Canelones baseline.",
        location:
          "Southeastern Uruguay near Punta del Este and Laguna Garzon, extending through Atlantic-influenced hills and valleys.",
        climate:
          "Cooler oceanic influence with slower ripening, wind, humidity, and pronounced maritime freshness compared with warmer inland zones.",
        soils:
          "Ancient crystalline basement, quartz, gravel, alluvial material, and well-drained ballast-like profiles that support concentration and mineral texture.",
        white: ["Albarino", "Sauvignon Blanc", "Chardonnay", "Viognier"],
        red: ["Tannat", "Pinot Noir", "Merlot", "Cabernet Franc"],
        styles: [
          "Fresh Albarino and Sauvignon Blanc",
          "Modern Tannat with polish and acidity",
          "Pinot Noir and lighter Atlantic reds",
          "Premium blends from rocky, well-drained sites"
        ],
        serviceCue:
          "Use Maldonado when a guest wants Uruguay with lift: ocean freshness, seafood pairing logic, Albarino, and more elegant Tannat.",
        examFocus: [
          "Maldonado is the emerging Atlantic-influenced quality region.",
          "Laguna Garzon is a useful modern reference point.",
          "Ancient crystalline rock and well-drained ballast/gravel cues matter.",
          "Whites and Pinot Noir are more plausible here than in warmer interior zones."
        ],
        sourceLinks: uruguaySourceLinks
      }),
      wineBenchmarkPage("Uruguay", {
        slug: "colonia-rio-de-la-plata",
        name: "Colonia / Rio de la Plata",
        parentRegion: "Western Uruguay",
        classification: "Western river-influenced wine department with heritage vineyards and late-ripening red potential.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Colonia,Uruguay,vineyard,Rio,de,la,Plata",
        imageAlt: "Colonia Rio de la Plata vineyard landscape",
        imageSubject:
          "Colonia Uruguay vineyards near the Rio de la Plata with river humidity, stony soils near San Juan, historic winery architecture, Cabernet Sauvignon and Tannat study cues",
        overview:
          "Colonia gives Uruguay a western river-influenced page: heritage tourism, stony sites near the Rio de la Plata, and conditions suited to later-ripening varieties.",
        location:
          "Western Uruguay around Colonia del Sacramento and Carmelo, influenced by the Uruguay River, Parana system, and Rio de la Plata.",
        climate:
          "Mild river-influenced climate with humidity, warm water moderation, and slower but reliable ripening in suitable sites.",
        soils:
          "Pedregal/stony sites, silty-clay, limestone-influenced and sandy sediments, especially valued around Carmelo and the San Juan river area.",
        white: ["Chardonnay", "Sauvignon Blanc", "Viognier"],
        red: ["Tannat", "Cabernet Sauvignon", "Merlot", "Cabernet Franc"],
        styles: [
          "Cabernet Sauvignon from later-ripening stony sites",
          "Tannat and Bordeaux-style blends",
          "Fresh whites for river tourism service",
          "Heritage winery bottlings"
        ],
        serviceCue:
          "Use Colonia for guests visiting Uruguay's heritage towns: river-influenced reds, Cabernet/Tannat pairings, cheese, grilled meat, and slower-paced wine tourism.",
        examFocus: [
          "Colonia is a western river-influenced Uruguay region.",
          "Carmelo and San Juan are useful site names.",
          "Late-ripening Cabernet Sauvignon can be logical here.",
          "Do not reduce all Uruguay study to Canelones alone."
        ],
        sourceLinks: uruguaySourceLinks
      })
    ]
  },
  japan: {
    category: "wine",
    countrySlug: "japan",
    countryName: "Japan",
    overview:
      "Japan's benchmark pages teach GI Yamanashi, Koshu, pergola/table-grape heritage, high-rainfall viticulture, Nagano's altitude and valleys, and Hokkaido's cool-climate frontier.",
    sourceNote:
      "Japan pages use Japan National Tax Agency GI material plus Yamanashi and Nagano regional sources. Dedicated country and subregion 360 assets remain queued except the shared Asia panorama already used in maps.",
    subregions: [
      wineBenchmarkPage("Japan", {
        slug: "yamanashi-koshu-valley",
        name: "Yamanashi / Koshu Valley",
        parentRegion: "Central Honshu",
        classification: "Japanese wine geographical indication and the country's historic modern-wine center.",
        examWeight: "core",
        imageUrl: "/panoramas/asia-yamanashi-360.png",
        imageAlt: "Yamanashi Koshu vineyard panorama",
        imageSubject:
          "Yamanashi Koshu vineyards in the Kofu basin with pergola-trained vines, paper grape caps, alluvial fan slopes, Mount Fuji distance cue, and humid-season canopy management",
        overview:
          "Yamanashi is Japan's first and most testable wine GI: Koshu, Muscat Bailey A, Kofu basin geography, pergola systems, rain/typhoon pressure, and delicate food-pairing wines.",
        location:
          "Central Honshu west of Tokyo, centered on the Kofu basin and towns such as Koshu, Yamanashi, Fuefuki, and Katsunuma.",
        climate:
          "Humid continental-to-monsoonal conditions with warm summers, rainfall, typhoon risk, disease pressure, and mountain-basin diurnal shifts.",
        soils:
          "Alluvial fans, river gravels, volcanic and mountain-derived materials; drainage and canopy architecture are central because rainfall pressure is high.",
        white: ["Koshu", "Chardonnay", "Delaware", "Sauvignon Blanc", "Riesling"],
        red: ["Muscat Bailey A", "Merlot", "Cabernet Sauvignon", "Pinot Noir"],
        styles: [
          "Delicate dry Koshu with citrus, white peach, and subtle phenolics",
          "Koshu aged on lees or lightly oak-influenced",
          "Light red Muscat Bailey A",
          "Traditional-method sparkling and experimental premium cuvees"
        ],
        serviceCue:
          "Use Yamanashi Koshu for washoku, sushi, tempura, citrus, subtle umami, and light seafood; its value is precision and delicacy, not power.",
        examFocus: [
          "Yamanashi was Japan's first wine GI.",
          "Koshu is the key white grape; Muscat Bailey A is the key local red association.",
          "Pergola training, rain protection, and typhoon-season disease pressure are essential viticulture cues.",
          "Katsunuma and the Kofu basin are important geographic anchors."
        ],
        sourceLinks: japanSourceLinks,
        panorama: {
          id: "japan-yamanashi-subregion",
          title: "Yamanashi Koshu Basin",
          imageSrc: "/panoramas/asia-yamanashi-360.png",
          imageAlt: "360 view of Yamanashi vineyards in the Kofu basin",
          copy:
            "Use the 360 view to read Japanese wine geography: basin heat, mountain drainage, pergola canopies, rainfall protection, and delicate Koshu service language.",
          details: ["Koshu", "GI Yamanashi", "Kofu basin", "Pergola training"]
        }
      }),
      wineBenchmarkPage("Japan", {
        slug: "nagano-wine-valleys",
        name: "Nagano Wine Valleys",
        parentRegion: "Central Honshu / Japanese Alps",
        classification: "Japanese wine geographical indication covering Nagano Prefecture.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Nagano,wine,vineyard,Japan,Alps",
        imageAlt: "Nagano high-elevation vineyard landscape",
        imageSubject:
          "Nagano high-elevation vineyards below the Japanese Alps with valley wind, Merlot, Chardonnay, Cabernet Franc, and cool-night ripening cues",
        overview:
          "Nagano is Japan's precision and altitude page: a GI with multiple wine valleys, cooler nights, European varieties, and a stronger modern table-wine identity than many humid lowland areas.",
        location:
          "Central Honshu in Nagano Prefecture, organized around valley systems such as Kikyogahara, Chikumagawa, Nihon Alps, and Tenryugawa.",
        climate:
          "Inland highland climate with strong day-night shifts, winter cold, snow in parts, and lower humidity than many Japanese coastal regions.",
        soils:
          "Alluvial terraces, volcanic material, gravel, and mountain-derived soils; slope, drainage, and elevation determine ripening success.",
        white: ["Chardonnay", "Sauvignon Blanc", "Riesling", "Kerner", "Gewurztraminer"],
        red: ["Merlot", "Cabernet Franc", "Pinot Noir", "Cabernet Sauvignon", "Muscat Bailey A"],
        styles: [
          "Merlot and Bordeaux-inspired reds",
          "High-acid Chardonnay and Sauvignon Blanc",
          "Pinot Noir and cool-climate red experiments",
          "Aromatic whites from alpine-influenced valleys"
        ],
        serviceCue:
          "Use Nagano for guests looking for Japanese wine with more classic table-wine structure: Merlot, Chardonnay, Cabernet Franc, and alpine freshness.",
        examFocus: [
          "Nagano is a protected Japanese wine GI.",
          "Kikyogahara and Chikumagawa are useful valley names.",
          "Altitude and lower humidity separate it from Yamanashi's basin/pergola model.",
          "European varieties are more central here than in basic Koshu-focused recall."
        ],
        sourceLinks: japanSourceLinks
      }),
      wineBenchmarkPage("Japan", {
        slug: "hokkaido-wine-region",
        name: "Hokkaido",
        parentRegion: "Northern Japan",
        classification: "Japanese wine geographical indication covering Hokkaido.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Hokkaido,vineyard,Japan,Pinot,Noir",
        imageAlt: "Hokkaido cool-climate vineyard landscape",
        imageSubject:
          "Hokkaido cool northern vineyards with snow-country spacing, Pinot Noir and Kerner vines, volcanic soils, crisp light, and winter-hardiness study cues",
        overview:
          "Hokkaido is Japan's northern cool-climate frontier for Pinot Noir, aromatic whites, hybrids, winter adaptation, and climate-change-era expansion.",
        location:
          "Northern Japan, with wine districts around Sorachi, Yoichi, Tokachi, and other cool-climate production areas.",
        climate:
          "Cool continental to cool maritime, with cold winters, snow cover, short growing season, disease pressure in wet periods, and strong acid retention.",
        soils:
          "Volcanic, alluvial, and well-drained mountain or basin soils; winter survival, snow cover, drainage, and site exposure are crucial.",
        white: ["Kerner", "Bacchus", "Chardonnay", "Sauvignon Blanc", "Riesling"],
        red: ["Pinot Noir", "Zweigelt", "Regent", "Merlot"],
        styles: [
          "Cool-climate Pinot Noir",
          "Aromatic whites with high acidity",
          "Sparkling wine base",
          "Hybrid and cold-hardy variety experiments"
        ],
        serviceCue:
          "Use Hokkaido for Japanese freshness and cool-climate red service: lighter Pinot Noir, aromatic whites, seafood, mushrooms, and northern cuisine.",
        examFocus: [
          "Hokkaido is a Japanese wine GI and the northern cool-climate benchmark.",
          "Pinot Noir and aromatic whites are more logical than warm-climate grapes.",
          "Snow, winter cold, and short growing season are key viticulture cues.",
          "It expands Japan beyond the Yamanashi-Koshu stereotype."
        ],
        sourceLinks: japanSourceLinks
      })
    ]
  },
  china: {
    category: "wine",
    countrySlug: "china",
    countryName: "China",
    overview:
      "China's benchmark pages teach Ningxia's Helan Mountain East GI, Shandong/Yantai's production scale and coastal humidity, and Xinjiang's arid continental viticulture.",
    sourceNote:
      "China pages use Helan Mountain East GI material, Ningxia wine-region sources, and Decanter China's regional overview. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("China", {
        slug: "ningxia-helan-mountain-east",
        name: "Ningxia / Helan Mountain East",
        parentRegion: "Ningxia Hui Autonomous Region",
        classification: "Officially recognized wine geographical indication under the China-EU GI agreement.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Ningxia,Helan,Mountain,vineyard,wine",
        imageAlt: "Ningxia Helan Mountain East vineyard landscape",
        imageSubject:
          "Ningxia Helan Mountain East vineyards between desert and mountain foothills with Yellow River irrigation, buried-vine winter protection cues, Cabernet and Marselan rows, and dry continental light",
        overview:
          "Ningxia's Helan Mountain East is the clearest modern Chinese wine benchmark: arid continental climate, mountain foothill protection, Yellow River irrigation, Cabernet-family reds, Marselan, and formal regional identity.",
        location:
          "North-central China in Ningxia, along the eastern foothills of the Helan Mountains near Yinchuan and the Yellow River irrigation system.",
        climate:
          "Arid continental with intense sunlight, low rainfall, large day-night range, cold winters, and a need for irrigation and vine-burying or winter-protection practices.",
        soils:
          "Gravelly, sandy, alluvial, and desert-edge soils with low fertility and good drainage; irrigation control and wind/desert exposure shape viticulture.",
        white: ["Chardonnay", "Riesling", "Vidal", "Italian Riesling"],
        red: ["Cabernet Sauvignon", "Marselan", "Merlot", "Cabernet Gernischt", "Syrah"],
        styles: [
          "Cabernet Sauvignon and Bordeaux-style blends",
          "Marselan and Cabernet Gernischt bottlings",
          "Structured reds with oak maturation",
          "Dry whites and experimental sparkling/dessert styles"
        ],
        serviceCue:
          "Use Ningxia for premium Chinese red-wine service: structured Cabernet-family blends with ripe fruit, oak, and grilled-meat pairing logic.",
        examFocus: [
          "Helan Mountain East is China's most testable modern wine region.",
          "Arid climate, irrigation, cold winters, and vine-burying are central viticulture cues.",
          "Cabernet Sauvignon, Marselan, and Bordeaux-style blends are key associations.",
          "The region has formal GI recognition under the China-EU GI framework."
        ],
        sourceLinks: chinaSourceLinks
      }),
      wineBenchmarkPage("China", {
        slug: "shandong-yantai-penglai",
        name: "Shandong / Yantai-Penglai",
        parentRegion: "Shandong Peninsula",
        classification: "Major coastal Chinese wine production region with Yantai and Penglai as key names.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Yantai,Penglai,Shandong,vineyard,wine",
        imageAlt: "Shandong Yantai-Penglai coastal vineyard landscape",
        imageSubject:
          "Shandong Yantai-Penglai coastal vineyards with Bohai/Yellow Sea humidity, gentle hills, Cabernet and Chardonnay rows, and large-scale Chinese winery heritage cues",
        overview:
          "Shandong is China's production-scale and heritage page: coastal Yantai/Penglai, humid maritime conditions, large producers, and more disease pressure than dry Ningxia.",
        location:
          "Eastern China on the Shandong Peninsula, especially around Yantai and Penglai near the Bohai Sea and Yellow Sea influence.",
        climate:
          "Warm-temperate coastal climate with maritime humidity, rain pressure, typhoon risk, and softer temperature extremes than inland desert regions.",
        soils:
          "Granite-derived hills, brown soils, alluvial deposits, and coastal-influenced slopes; disease control and drainage are important.",
        white: ["Chardonnay", "Riesling", "Italian Riesling", "Sauvignon Blanc"],
        red: ["Cabernet Sauvignon", "Cabernet Gernischt", "Merlot", "Marselan"],
        styles: [
          "Cabernet Sauvignon and Cabernet Gernischt reds",
          "Large-scale dry reds and whites",
          "Chardonnay and Riesling-style whites",
          "Coastal-influenced premium estate projects"
        ],
        serviceCue:
          "Use Shandong to explain volume and coastal style rather than desert intensity: softer climate, humidity management, and classic producer history.",
        examFocus: [
          "Yantai and Penglai are key Shandong wine names.",
          "Shandong is coastal and humid, contrasting with arid Ningxia.",
          "Large production scale and established wineries matter in the story.",
          "Cabernet-family reds remain central, but climate pressure differs sharply from Ningxia."
        ],
        sourceLinks: chinaSourceLinks
      }),
      wineBenchmarkPage("China", {
        slug: "xinjiang-tianshan",
        name: "Xinjiang / Tianshan Corridors",
        parentRegion: "Northwest China",
        classification: "Large arid northwestern viticultural region rather than a single small appellation.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Xinjiang,vineyard,Tianshan,wine",
        imageAlt: "Xinjiang Tianshan vineyard landscape",
        imageSubject:
          "Xinjiang Tianshan corridor vineyards with desert oasis irrigation, dry continental skies, table-grape and wine-grape rows, cold-winter protection, and Silk Road viticulture cues",
        overview:
          "Xinjiang is China's arid northwest scale page: oasis agriculture, extreme continental climate, table-grape heritage, and emerging wine production over a huge geography.",
        location:
          "Northwest China around Tianshan-linked basins and oasis corridors, with viticulture spread across a very large autonomous region.",
        climate:
          "Extreme continental desert and oasis conditions with hot summers, cold winters, low rainfall, intense sunlight, and irrigation dependence.",
        soils:
          "Sandy, gravelly, desert alluvial, and oasis soils; salinity, water control, wind, and winter protection are practical constraints.",
        white: ["Chardonnay", "Riesling", "Italian Riesling", "Vidal"],
        red: ["Cabernet Sauvignon", "Merlot", "Marselan", "Syrah"],
        styles: [
          "Ripe red blends from desert-oasis sites",
          "Dry whites with sun-ripened fruit",
          "Dessert and late-harvest experiments",
          "Large-scale commodity and regional estate bottlings"
        ],
        serviceCue:
          "Use Xinjiang as the arid-scale contrast to Shandong: desert ripeness, irrigation, and continental extremes rather than coastal humidity.",
        examFocus: [
          "Xinjiang is important as a large arid viticultural zone.",
          "Oasis irrigation and extreme continental climate are the primary study concepts.",
          "Table-grape heritage and wine-grape expansion coexist.",
          "It should not be treated as the same style model as Ningxia or Shandong."
        ],
        sourceLinks: chinaSourceLinks
      })
    ]
  },
  georgia: {
    category: "wine",
    countrySlug: "georgia",
    countryName: "Georgia",
    overview:
      "Georgia's benchmark pages teach qvevri culture, indigenous grapes, Kakheti's production dominance, Kartli's cooler sparkling/white potential, and western Georgia's lighter, high-acid styles.",
    sourceNote:
      "Georgia pages use the National Wine Agency and Georgian Wine Association regional sources. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Georgia", {
        slug: "kakheti",
        name: "Kakheti",
        parentRegion: "Eastern Georgia",
        classification: "Georgia's dominant wine-producing region with multiple registered appellations and microzones.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Kakheti,Georgia,vineyard,qvevri",
        imageAlt: "Kakheti vineyard landscape",
        imageSubject:
          "Kakheti vineyards below the Caucasus with Saperavi and Rkatsiteli rows, qvevri cellar entrances, dry eastern Georgian light, and appellation microzone cues",
        overview:
          "Kakheti is Georgia's core exam page: most production, Saperavi, Rkatsiteli, amber qvevri wines, and famous names such as Tsinandali, Mukuzani, Kindzmarauli, and Telavi.",
        location:
          "Eastern Georgia, east of Tbilisi, including the Alazani and Iori river basins near Telavi, Kvareli, Gurjaani, and Sighnaghi.",
        climate:
          "Moderately continental with warm dry summers, mountain influence from the Greater Caucasus, and enough ripeness for structured reds.",
        soils:
          "Alluvial, calcareous, clay, stony, and river-valley soils; microzone identity is closely tied to slope, exposure, and river-basin position.",
        white: ["Rkatsiteli", "Kisi", "Mtsvane Kakhuri", "Khikhvi"],
        red: ["Saperavi", "Cabernet Sauvignon"],
        styles: [
          "Amber qvevri white wines with skin contact",
          "Dry Rkatsiteli and Mtsvane whites",
          "Structured Saperavi reds",
          "Semi-sweet red styles from Kindzmarauli and related zones"
        ],
        serviceCue:
          "Use Kakheti for guests asking about Georgian wine: amber qvevri texture, Saperavi tannin, grilled meat, walnut sauces, and savory spice.",
        examFocus: [
          "Kakheti is Georgia's dominant wine region.",
          "Rkatsiteli and Saperavi are the key grape associations.",
          "Qvevri fermentation and amber wine are central service terms.",
          "Tsinandali, Mukuzani, and Kindzmarauli are useful appellation names."
        ],
        sourceLinks: georgiaSourceLinks
      }),
      wineBenchmarkPage("Georgia", {
        slug: "kartli",
        name: "Kartli",
        parentRegion: "Central/Eastern Georgia",
        classification: "Cooler Georgian wine region around the Mtkvari basin and Ateni context.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Kartli,Georgia,vineyard,wine",
        imageAlt: "Kartli vineyard landscape",
        imageSubject:
          "Kartli vineyards near river valleys and limestone hills with Chinuri, Goruli Mtsvane, Tavkveri, sparkling-base cues, and cooler central Georgia mountain light",
        overview:
          "Kartli gives Georgian study a cooler, fresher frame: Chinuri, Goruli Mtsvane, Tavkveri, sparkling wine potential, and Atenuri-style regional identity.",
        location:
          "Central Georgia around the Mtkvari River system, west and northwest of Tbilisi, including Ateni, Mukhrani, Gori, and surrounding valleys.",
        climate:
          "More moderate and cooler than Kakheti in many sites, with continental influence, mountain airflow, and conditions suitable for high-acid whites and sparkling base.",
        soils:
          "Limestone-influenced, alluvial, clay, and stony valley soils with local variation by river terrace and foothill exposure.",
        white: ["Chinuri", "Goruli Mtsvane", "Rkatsiteli"],
        red: ["Tavkveri", "Shavkapito", "Saperavi"],
        styles: [
          "Fresh dry whites",
          "Traditional-method or bottle-fermented sparkling wine",
          "Light-to-medium reds from Tavkveri and Shavkapito",
          "Qvevri and conventional cellar expressions"
        ],
        serviceCue:
          "Use Kartli when a guest wants Georgian wine without Kakheti's weight: brighter whites, sparkling, and lighter reds for cheese, herbs, and vegetable dishes.",
        examFocus: [
          "Kartli is cooler and often fresher than Kakheti.",
          "Chinuri and Goruli Mtsvane are key white grapes.",
          "Ateni/Atenuri context is useful for sparkling and high-acid styles.",
          "Tavkveri and Shavkapito broaden Georgia's red-grape story."
        ],
        sourceLinks: georgiaSourceLinks
      }),
      wineBenchmarkPage("Georgia", {
        slug: "imereti-racha",
        name: "Imereti and Racha-Lechkhumi",
        parentRegion: "Western Georgia",
        classification: "Western Georgian regions known for lighter high-acid whites, qvevri variants, and mountain red microzones.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Imereti,Racha,Georgia,vineyard,wine",
        imageAlt: "Western Georgia Imereti and Racha vineyard landscape",
        imageSubject:
          "western Georgian vineyards in humid green hills with Tsolikouri and Tsitska rows, smaller qvevri/churi cellar cues, Racha mountain slopes, and high-acid wine study context",
        overview:
          "Western Georgia is the exam corrective to Kakheti: Imereti for high-acid whites and local qvevri practice; Racha-Lechkhumi for mountain reds and Khvanchkara context.",
        location:
          "Western Georgia around Kutaisi for Imereti and the mountainous Racha-Lechkhumi area farther north.",
        climate:
          "More humid and influenced by western/Black Sea air than Kakheti, with green hills, higher rainfall, and strong need for disease management.",
        soils:
          "Clay-limestone, alluvial, humus-carbonate, and mountain soils; drainage, slope, and humidity management drive style.",
        white: ["Tsolikouri", "Tsitska", "Krakhuna"],
        red: ["Otskhanuri Sapere", "Aleksandrouli", "Mujuretuli"],
        styles: [
          "High-acid dry whites from Tsolikouri and Tsitska",
          "Amber/churi wines with less heavy skin-contact than many Kakhetian examples",
          "Mountain reds from Racha-Lechkhumi",
          "Semi-sweet Khvanchkara-style red context"
        ],
        serviceCue:
          "Use Imereti for Georgian freshness and Racha for mountain red specificity; this is the best way to show Georgia is not only amber Kakheti.",
        examFocus: [
          "Imereti is one of Georgia's most diverse western wine regions.",
          "Tsolikouri, Tsitska, and Krakhuna are key western white grapes.",
          "Racha-Lechkhumi is associated with Khvanchkara.",
          "Western Georgia is generally wetter and greener than eastern Kakheti."
        ],
        sourceLinks: georgiaSourceLinks
      })
    ]
  },
  armenia: {
    category: "wine",
    countrySlug: "armenia",
    countryName: "Armenia",
    overview:
      "Armenia's benchmark pages teach ancient wine heritage, high-altitude Vayots Dzor, Areni Noir, Voskehat, volcanic soils, karas amphora practice, and modern quality growth across five main regions.",
    sourceNote:
      "Armenia pages use Vini Armenia, My Armenia, and Ministry of Economy tourism guidance. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Armenia", {
        slug: "vayots-dzor-areni",
        name: "Vayots Dzor / Areni",
        parentRegion: "Southern Armenia",
        classification: "High-altitude Armenian wine region tied to Areni village and ancient wine heritage.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Vayots,Dzor,Areni,vineyard,Armenia",
        imageAlt: "Vayots Dzor Areni vineyard landscape",
        imageSubject:
          "Vayots Dzor Areni vineyards in a high mountain gorge with volcanic rock, dry continental light, Areni Noir old vines, karas cellar vessels, and Areni-1 cave heritage cues",
        overview:
          "Vayots Dzor is Armenia's core quality and exam page: Areni Noir, high altitude, ancient wine evidence, dry mountain conditions, and small-production modern reds.",
        location:
          "Southern Armenia around Areni, Yeghegnadzor, and mountain valleys east/southeast of Ararat province.",
        climate:
          "High-altitude dry continental climate with intense sun, cool nights, cold winters, low rainfall, and large elevation differences.",
        soils:
          "Volcanic, rocky, limestone-influenced, and alluvial mountain soils; old vines and phylloxera/own-root discussion may appear in advanced study.",
        white: ["Voskehat", "Khatouni", "Garan Dmak"],
        red: ["Areni Noir", "Tozot", "Kakhet"],
        styles: [
          "Areni Noir reds with red fruit, herbs, and firm mountain acidity",
          "Voskehat whites with texture and stone-fruit character",
          "Karas/amphora-influenced wines",
          "Traditional-method and experimental small-batch bottlings"
        ],
        serviceCue:
          "Use Areni Noir as Armenia's Pinot-adjacent service bridge: mountain freshness, savory herbs, lamb, grilled vegetables, lavash, and pomegranate sauces.",
        examFocus: [
          "Vayots Dzor is Armenia's most testable quality region.",
          "Areni Noir is the key red grape; Voskehat is the key white grape.",
          "High altitude and volcanic mountain soils explain freshness and structure.",
          "Areni-1 cave heritage anchors Armenia's ancient wine narrative."
        ],
        sourceLinks: armeniaSourceLinks
      }),
      wineBenchmarkPage("Armenia", {
        slug: "armavir-ararat-valley",
        name: "Armavir / Ararat Valley",
        parentRegion: "Ararat Plain",
        classification: "Warm valley-floor Armenian wine and brandy-grape corridor.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Armavir,Ararat,Valley,vineyard,Armenia",
        imageAlt: "Armavir Ararat Valley vineyard landscape",
        imageSubject:
          "Armavir and Ararat Valley vineyards on volcanic plain below Mount Ararat with warm dry sunlight, irrigation channels, Kangun and Voskehat rows, brandy-grape and table-wine study cues",
        overview:
          "Armavir and the Ararat Valley explain Armenia's warmer, broader production base: brandy grapes, irrigation, volcanic plain soils, and white varieties such as Kangun and Voskehat.",
        location:
          "Western-central Armenia on the Ararat plain near Yerevan, Armavir, Etchmiadzin, and the Turkish border.",
        climate:
          "Dry continental valley climate with hot summers, cold winters, high sunlight, and irrigation dependence.",
        soils:
          "Volcanic, alluvial, clay, and semi-arid plain soils; water management and heat control are central.",
        white: ["Kangun", "Voskehat", "Garan Dmak", "Rkatsiteli"],
        red: ["Areni Noir", "Karmrahyut", "Haghtanak", "Kakhet"],
        styles: [
          "Brandy-base grapes and distillation wine",
          "Warm-climate dry whites",
          "Modern red blends from local and international varieties",
          "Sparkling and accessible commercial table wines"
        ],
        serviceCue:
          "Use Armavir/Ararat for Armenia's production-scale story: warmer, broader, more brandy-linked, and less mountain-tense than Vayots Dzor.",
        examFocus: [
          "Armavir and Ararat are part of Armenia's main wine-producing plain.",
          "Kangun and brandy-base production are important context.",
          "Irrigation and heat separate it from high-altitude Vayots Dzor.",
          "Mount Ararat is a visual and cultural anchor, not a terroir shortcut by itself."
        ],
        sourceLinks: armeniaSourceLinks
      }),
      wineBenchmarkPage("Armenia", {
        slug: "aragatsotn-tavush",
        name: "Aragatsotn and Tavush",
        parentRegion: "Northern/Central Armenia",
        classification: "Armenian foothill and highland regions that broaden the country's modern origin map.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Aragatsotn,Tavush,vineyard,Armenia",
        imageAlt: "Aragatsotn and Tavush Armenian vineyard landscape",
        imageSubject:
          "Aragatsotn volcanic foothill vineyards and Tavush green highland edge with Voskehat, Kangun, Areni, forested slopes, and mountain-weather study cues",
        overview:
          "Aragatsotn and Tavush are the expansion pages: Aragatsotn for volcanic foothills near Mount Aragats, Tavush for greener northeastern conditions and highland freshness.",
        location:
          "Aragatsotn lies northwest of Yerevan near Mount Aragats; Tavush lies in northeastern Armenia along greener highland and forest-edge terrain.",
        climate:
          "Aragatsotn is dry, high-elevation, and volcanic; Tavush is cooler and more humid, with forest and mountain influence.",
        soils:
          "Volcanic tuff, basaltic material, rocky foothill soils, and mountain-derived sediments; Tavush adds more humid, forest-edge conditions.",
        white: ["Voskehat", "Kangun", "Garan Dmak", "Banants"],
        red: ["Areni Noir", "Karmrahyut", "Haghtanak"],
        styles: [
          "Fresh highland whites",
          "Areni-led mountain reds",
          "Karas and low-intervention small-lot wines",
          "Experimental bottlings from revived local grapes"
        ],
        serviceCue:
          "Use these regions when guests want Armenia beyond Areni: volcanic foothill texture, highland whites, and a broader native-grape revival story.",
        examFocus: [
          "Aragatsotn and Tavush are two of Armenia's five main wine regions.",
          "Aragatsotn is tied to Mount Aragats and volcanic foothills.",
          "Tavush is greener and more humid than the Ararat plain or Vayots Dzor.",
          "The main exam value is breadth of Armenia's regional map, not one dominant appellation."
        ],
        sourceLinks: armeniaSourceLinks
      })
    ]
  },
  turkey: {
    category: "wine",
    countrySlug: "turkey",
    countryName: "Turkey",
    overview:
      "Turkey's benchmark pages teach indigenous grapes, Aegean and Thrace production strength, Central Anatolia/Cappadocia volcanic plateau conditions, and the service split between Mediterranean whites and powerful Anatolian reds.",
    sourceNote:
      "Turkey pages use Wines of Turkiye regional material. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Turkey", {
        slug: "aegean-wine-region",
        name: "Aegean",
        parentRegion: "Western Turkey",
        classification: "Major Turkish wine region with coastal and inland subzones.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Aegean,Turkey,vineyard,wine",
        imageAlt: "Aegean Turkey vineyard landscape",
        imageSubject:
          "Aegean Turkey vineyards near Izmir and Denizli with Mediterranean sun, sea-breeze hills, limestone and alluvial soils, Bornova Misketi, Sultaniye, Syrah, and Cabernet study cues",
        overview:
          "The Aegean is Turkey's most accessible modern wine page: coastal moderation, warm Mediterranean sites, aromatic whites, international varieties, and inland Denizli altitude.",
        location:
          "Western Turkey around Izmir, Manisa, Denizli, and the broader Aegean coast and inland valleys.",
        climate:
          "Mediterranean along the coast with dry summers and sea influence; inland zones become more continental and altitude-driven.",
        soils:
          "Limestone, alluvial valley soils, clay, and rocky hillsides; water stress, heat, and altitude determine grape choice.",
        white: ["Bornova Misketi", "Sultaniye", "Narince", "Chardonnay", "Sauvignon Blanc"],
        red: ["Syrah", "Cabernet Sauvignon", "Merlot", "Kalecik Karasi", "Bogazkere"],
        styles: [
          "Aromatic Muscat-family whites from Bornova Misketi",
          "Fresh Sultaniye-based whites",
          "Syrah and Cabernet-led warm-climate reds",
          "Mediterranean rose and tourism-focused bottlings"
        ],
        serviceCue:
          "Use Aegean Turkey for bright whites, rose, grilled seafood, meze, and warm-climate reds that work with lamb and eggplant.",
        examFocus: [
          "The Aegean is one of Turkey's key modern production regions.",
          "Bornova Misketi and Sultaniye are important white-grape cues.",
          "Coastal versus inland altitude split explains style range.",
          "International grapes are common, but the exam value is indigenous context."
        ],
        sourceLinks: turkeySourceLinks
      }),
      wineBenchmarkPage("Turkey", {
        slug: "thrace-marmara",
        name: "Thrace / Marmara",
        parentRegion: "European Turkey",
        classification: "Northwestern Turkish wine corridor with maritime and Balkan influence.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Thrace,Turkey,vineyard,Marmara,wine",
        imageAlt: "Thrace Marmara vineyard landscape",
        imageSubject:
          "Thrace and Marmara vineyards in rolling northwestern Turkey with sea influence, cool wind, Cabernet, Merlot, Papaskarasi, and Balkan-edge wine route cues",
        overview:
          "Thrace and Marmara are Turkey's cooler northwestern frame: European Turkey, maritime influence, red blends, Papaskarasi revival, and wine-route tourism near Istanbul.",
        location:
          "Northwestern Turkey around Tekirdag, Kirklareli, Gallipoli, and the Marmara/Thrace wine route.",
        climate:
          "Moderate maritime to continental transition, influenced by the Marmara, Aegean, and Black Sea systems, with cooler conditions than many southern or inland Turkish zones.",
        soils:
          "Limestone, clay, loam, alluvial, and gravelly hillside soils; exposure to wind and maritime humidity shapes site choice.",
        white: ["Sauvignon Blanc", "Chardonnay", "Narince", "Semillon"],
        red: ["Papaskarasi", "Cabernet Sauvignon", "Merlot", "Syrah", "Kalecik Karasi"],
        styles: [
          "Bordeaux-style blends",
          "Papaskarasi and revived local red varieties",
          "Fresh whites from cooler sites",
          "Traditional-method sparkling and experimental coastal wines"
        ],
        serviceCue:
          "Use Thrace for Turkey's cooler red-blend and wine-route story, especially for guests starting from Istanbul or familiar international grapes.",
        examFocus: [
          "Thrace/Marmara is Turkey's European-side wine corridor.",
          "Maritime moderation separates it from hot Aegean interiors and inland Anatolia.",
          "Papaskarasi is a useful local-grape cue.",
          "It is one of Turkey's most developed modern wine-tourism regions."
        ],
        sourceLinks: turkeySourceLinks
      }),
      wineBenchmarkPage("Turkey", {
        slug: "cappadocia-central-anatolia",
        name: "Cappadocia / Central Anatolia",
        parentRegion: "Central Turkey",
        classification: "High-altitude volcanic plateau wine region with ancient cave-cellar heritage.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Cappadocia,Turkey,vineyard,wine",
        imageAlt: "Cappadocia Central Anatolia vineyard landscape",
        imageSubject:
          "Cappadocia vineyards on volcanic tuff plateau with fairy chimney landforms, cave cellars, Emir white grape vines, Kalecik Karasi and Bogazkere cues, and high-altitude continental light",
        overview:
          "Cappadocia and Central Anatolia are Turkey's volcanic plateau page: Emir, Kalecik Karasi, cave cellars, high altitude, cold winters, and ancient landscape context.",
        location:
          "Central Turkey around Nevsehir, Urgup, Cappadocia, Ankara-linked Kalecik context, and broader high Anatolian plateaus.",
        climate:
          "Continental highland climate with hot dry summers, cold winters, large day-night shifts, and low rainfall.",
        soils:
          "Volcanic tuff, limestone, sandy and rocky plateau soils; cave-cellar conditions and drought stress are central visual/service cues.",
        white: ["Emir", "Narince", "Hasandede", "Chardonnay"],
        red: ["Kalecik Karasi", "Bogazkere", "Okuzgozu", "Syrah"],
        styles: [
          "Fresh mineral Emir whites",
          "Light-to-medium Kalecik Karasi reds",
          "Structured Bogazkere/Okuzgozu Anatolian reds",
          "Sparkling and cave-aged experiments"
        ],
        serviceCue:
          "Use Cappadocia for Emir with meze, salty cheese, fried dishes, and volcanic-mineral storytelling; use Anatolian reds for lamb and spiced stews.",
        examFocus: [
          "Cappadocia is tied to volcanic soils and cave-cellar heritage.",
          "Emir is the key white grape association.",
          "Kalecik Karasi, Bogazkere, and Okuzgozu broaden the red-grape map.",
          "High altitude and continental climate separate it from coastal Aegean Turkey."
        ],
        sourceLinks: turkeySourceLinks
      })
    ]
  },
  cyprus: {
    category: "wine",
    countrySlug: "cyprus",
    countryName: "Cyprus",
    overview:
      "Cyprus benchmark pages teach Commandaria, mountain PDO/PGI geography, ungrafted-old-vine heritage, Xynisteri, Maratheftiko, Mavro, Troodos altitude, and the island's seven wine-route tourism frame.",
    sourceNote:
      "Cyprus pages use Visit Cyprus wine-route material and the TTB listing of protected Cyprus wine names. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Cyprus", {
        slug: "commandaria",
        name: "Commandaria",
        parentRegion: "Troodos foothills / Limassol",
        classification: "Protected Cyprus wine name for historic sweet wine from designated Commandaria villages.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Commandaria,Cyprus,vineyard,Troodos",
        imageAlt: "Commandaria Cyprus mountain vineyard landscape",
        imageSubject:
          "Commandaria vineyards on Troodos foothills with old bush vines, sun-drying grape trays, Mavro and Xynisteri, stone villages, and amber sweet-wine study cues",
        overview:
          "Commandaria is Cyprus's most testable wine identity: ancient named sweet wine, sun-dried grapes, Mavro and Xynisteri, mountain villages, and oxidative amber service language.",
        location:
          "Foothills of the Troodos Mountains north of Limassol, tied to a group of designated Commandaria villages.",
        climate:
          "Mediterranean with hot dry summers, altitude moderation in the hills, low harvest rainfall, and strong sun for grape drying.",
        soils:
          "Calcareous, volcanic, stony, and mountain-derived soils; old bush vines and dry conditions support concentration.",
        white: ["Xynisteri"],
        red: ["Mavro"],
        styles: [
          "Amber sweet Commandaria from sun-dried grapes",
          "Oxidative dessert wines with caramel, dried fruit, and spice",
          "Fortified and unfortified traditional expressions",
          "Dry table wines from nearby mountain villages"
        ],
        serviceCue:
          "Use Commandaria with baklava, dried fruit, blue cheese, nuts, caramel desserts, or as a historic meditation pour after dinner.",
        examFocus: [
          "Commandaria is Cyprus's core exam wine.",
          "Mavro and Xynisteri are the key grapes.",
          "Sun drying and sweet amber style are the production anchors.",
          "The Troodos foothill village context matters more than a generic island label."
        ],
        sourceLinks: cyprusSourceLinks
      }),
      wineBenchmarkPage("Cyprus", {
        slug: "pitsilia",
        name: "Pitsilia",
        parentRegion: "Troodos Mountains",
        classification: "Cyprus mountain PDO/wine-route region near the highest Troodos slopes.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Pitsilia,Cyprus,vineyard,mountains",
        imageAlt: "Pitsilia mountain vineyard landscape",
        imageSubject:
          "Pitsilia high mountain vineyards in Cyprus with terraced Troodos slopes, old Xynisteri and Maratheftiko vines, pine forest edges, and cool-altitude study cues",
        overview:
          "Pitsilia is the Cyprus freshness page: high altitude, mountain terraces, Xynisteri, Maratheftiko, old vines, and wines with more acidity than coastal expectations suggest.",
        location:
          "High-elevation Troodos mountain villages north of Limassol and east of the Commandaria area.",
        climate:
          "Mediterranean mountain climate with cool nights, altitude-driven acid retention, and dry sunny growing seasons.",
        soils:
          "Volcanic, stony, poor mountain soils on steep terraces; old vines and low yields are important quality cues.",
        white: ["Xynisteri", "Promara", "Morokanella", "Spourtiko"],
        red: ["Maratheftiko", "Yiannoudi", "Mavro", "Lefkada"],
        styles: [
          "Fresh dry Xynisteri",
          "Structured Maratheftiko reds",
          "Mountain rose and lighter reds",
          "Native-grape revival bottlings"
        ],
        serviceCue:
          "Use Pitsilia when Cyprus needs freshness: dry Xynisteri for seafood and mountain reds for grilled lamb, herbs, and halloumi.",
        examFocus: [
          "Pitsilia is a high-altitude Troodos mountain wine region.",
          "Xynisteri and Maratheftiko are key native grapes.",
          "Altitude explains freshness and acid retention.",
          "Old vines and terracing are important visual/study cues."
        ],
        sourceLinks: cyprusSourceLinks
      }),
      wineBenchmarkPage("Cyprus", {
        slug: "krasochoria-laona-akamas",
        name: "Krasochoria and Laona-Akamas",
        parentRegion: "Limassol and Paphos mountain wine routes",
        classification: "Cyprus wine-route regions covering Limassol wine villages and western Laona-Akamas mountain sites.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Cyprus,wine,villages,vineyard,Paphos,Limassol",
        imageAlt: "Cyprus wine village vineyard landscape",
        imageSubject:
          "Cyprus mountain wine villages between Limassol Krasochoria and Paphos Laona-Akamas with stone terraces, Xynisteri, Maratheftiko, old Mavro vines, and Mediterranean sea-distance cues",
        overview:
          "Krasochoria and Laona-Akamas show Cyprus as a village-based mountain wine system, not only Commandaria: dry whites, native reds, tourism routes, and old-vine heritage.",
        location:
          "Krasochoria around the Limassol wine villages and Laona-Akamas around western Paphos mountain and peninsula-influenced routes.",
        climate:
          "Mediterranean with hot dry summers, mountain nighttime cooling, and varying maritime exposure by slope and distance from the coast.",
        soils:
          "Limestone, volcanic, stony terrace soils, and mixed mountain deposits; drainage and vine age are central.",
        white: ["Xynisteri", "Spourtiko", "Promara", "Morokanella"],
        red: ["Maratheftiko", "Mavro", "Yiannoudi", "Lefkada"],
        styles: [
          "Dry native white wines",
          "Medium-bodied Maratheftiko and Yiannoudi reds",
          "Village rose",
          "Tourism-focused blends from mountain routes"
        ],
        serviceCue:
          "Use these routes for Cyprus table-wine service: fresh dry whites, native reds, mezze, grilled fish, pork souvlaki, and halloumi.",
        examFocus: [
          "Cyprus has multiple wine routes beyond Commandaria.",
          "Krasochoria means Limassol wine villages.",
          "Laona-Akamas anchors the Paphos/western mountain route.",
          "Native grapes are the main study value."
        ],
        sourceLinks: cyprusSourceLinks
      })
    ]
  },
  israel: {
    category: "wine",
    countrySlug: "israel",
    countryName: "Israel",
    overview:
      "Israel benchmark pages teach high-elevation northern sites, Judean Hills limestone, desert viticulture in the Negev, Mediterranean varieties, Bordeaux-family reds, and modern quality growth in a small but climatically varied country.",
    sourceNote:
      "Israel pages use Israeli Wine and Israel Wines regional references plus Golan wine-route material. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Israel", {
        slug: "galilee-golan-heights",
        name: "Galilee and Golan Heights",
        parentRegion: "Northern Israel wine context",
        classification: "High-elevation northern wine region cluster including Upper Galilee and Golan Heights contexts.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Golan,Heights,Galilee,vineyard,wine",
        imageAlt: "Galilee and Golan Heights vineyard landscape",
        imageSubject:
          "high-elevation Galilee and Golan Heights vineyards with basaltic volcanic soils, Mount Hermon snow-distance cue, Cabernet and Syrah rows, and cool-night Israeli wine study cues",
        overview:
          "Galilee and Golan Heights are the core Israeli quality shorthand: higher elevations, cooler nights, basalt/volcanic and stony soils, and structured Cabernet, Syrah, Merlot, Chardonnay, and Sauvignon Blanc.",
        location:
          "Northern Israel wine context, including Upper Galilee sites and Golan Heights vineyards close to the Sea of Galilee and Mount Hermon influence.",
        climate:
          "Mediterranean with high-elevation cooling, marked day-night shifts, dry summers, and winter rainfall; Golan sites are among the coolest in the country.",
        soils:
          "Basaltic volcanic soils in Golan contexts, stony limestone, terra rossa, clay, and well-drained mountain soils in Galilee.",
        white: ["Chardonnay", "Sauvignon Blanc", "Gewurztraminer", "Riesling", "Viognier"],
        red: ["Cabernet Sauvignon", "Merlot", "Syrah", "Cabernet Franc", "Petit Verdot"],
        styles: [
          "Structured Cabernet Sauvignon and Bordeaux-style blends",
          "Syrah and Mediterranean red blends",
          "Fresh mountain Chardonnay and Sauvignon Blanc",
          "Late-harvest and experimental cool-site wines"
        ],
        serviceCue:
          "Use northern Israel for guests who want polished New World structure with Mediterranean food logic: grilled lamb, beef, eggplant, herbs, and tahini.",
        examFocus: [
          "Galilee/Golan is the key high-elevation quality region cluster.",
          "Basalt and volcanic soils are major Golan study cues.",
          "Cabernet Sauvignon, Merlot, Syrah, and Chardonnay are common associations.",
          "Altitude and cool nights separate this from warmer coastal or desert zones."
        ],
        sourceLinks: israelSourceLinks
      }),
      wineBenchmarkPage("Israel", {
        slug: "judean-hills",
        name: "Judean Hills",
        parentRegion: "Central Israel / Jerusalem corridor",
        classification: "Mountain and foothill wine region around Jerusalem with growing international recognition.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Judean,Hills,vineyard,Israel,wine",
        imageAlt: "Judean Hills vineyard landscape",
        imageSubject:
          "Judean Hills vineyards near Jerusalem with limestone terraces, Mediterranean scrub, Cabernet Franc, Syrah, Chardonnay, and altitude-cooled dry-farmed study cues",
        overview:
          "The Judean Hills are Israel's limestone and mountain-freshness page: Jerusalem-adjacent vineyards, red blends, Chardonnay, Mediterranean varieties, and strong restaurant-list visibility.",
        location:
          "Central Israel in the hills west and southwest of Jerusalem, including the Judean Foothills and higher mountain vineyard areas.",
        climate:
          "Mediterranean mountain climate with dry summers, winter rainfall, altitude cooling, and sharp day-night shifts in higher sites.",
        soils:
          "Limestone, terra rossa, chalk, clay, and stony terraces; drainage, slope, and altitude are central quality cues.",
        white: ["Chardonnay", "Sauvignon Blanc", "Semillon", "Roussanne", "Viognier"],
        red: ["Cabernet Sauvignon", "Cabernet Franc", "Syrah", "Merlot", "Grenache", "Petit Verdot"],
        styles: [
          "Bordeaux-style and Mediterranean red blends",
          "Cabernet Franc and Syrah-led wines",
          "Textural Chardonnay and Rhone-style whites",
          "Fresher mountain reds with savory herb notes"
        ],
        serviceCue:
          "Use Judean Hills wines for Mediterranean fine dining: savory reds with herbs, lamb, mushrooms, roasted vegetables, and olive-oil-rich dishes.",
        examFocus: [
          "Judean Hills are tied to Jerusalem-adjacent mountain vineyards.",
          "Limestone and altitude are the main terroir cues.",
          "Cabernet Franc, Syrah, and blends are service-relevant.",
          "This is a quality-focused region distinct from the northern Galilee/Golan frame."
        ],
        sourceLinks: israelSourceLinks
      }),
      wineBenchmarkPage("Israel", {
        slug: "negev-highlands",
        name: "Negev Highlands",
        parentRegion: "Southern Israel",
        classification: "Desert highland viticulture region using irrigation and high-altitude desert sites.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Negev,desert,vineyard,Israel,wine",
        imageAlt: "Negev desert vineyard landscape",
        imageSubject:
          "Negev Highlands desert vineyards with drip irrigation, pale limestone and loess soils, Cabernet, Syrah, desert sun, and night-cooling study cues",
        overview:
          "The Negev is Israel's desert viticulture page: drip irrigation, high-desert altitude, strong sunlight, cold nights, and experimental quality from water-managed sites.",
        location:
          "Southern Israel's Negev desert, especially higher-elevation vineyard areas around Ramat Negev and desert settlement corridors.",
        climate:
          "Arid desert with intense sun, very low rainfall, high evaporation, large day-night shifts, and dependence on precision irrigation.",
        soils:
          "Loess, limestone, chalk, sandy and rocky desert soils; salinity, water management, and root-zone control are key.",
        white: ["Chenin Blanc", "Sauvignon Blanc", "Viognier", "Chardonnay"],
        red: ["Syrah", "Cabernet Sauvignon", "Merlot", "Malbec", "Petit Verdot"],
        styles: [
          "Ripe desert reds with freshness from altitude and night cooling",
          "Rose and white wines from irrigated highland sites",
          "Experimental desert viticulture bottlings",
          "Food-friendly Mediterranean blends"
        ],
        serviceCue:
          "Use Negev wines when explaining modern desert viticulture: precision irrigation, solar ripeness, and grilled desert-herb food pairings.",
        examFocus: [
          "The Negev is the key Israeli desert wine region.",
          "Drip irrigation and water management are essential.",
          "Highland sites provide night cooling and acidity retention.",
          "It contrasts directly with Galilee/Golan mountain and Judean limestone contexts."
        ],
        sourceLinks: israelSourceLinks
      })
    ]
  },
  lebanon: {
    category: "wine",
    countrySlug: "lebanon",
    countryName: "Lebanon",
    overview:
      "Lebanon benchmark pages teach high-altitude Bekaa Valley production, Mediterranean mountain influence, resilient winery culture, Batroun's northern coastal mountains, and Jezzine's southern highland potential.",
    sourceNote:
      "Lebanon pages use Union Vinicole du Liban material on producers and terroirs. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Lebanon", {
        slug: "bekaa-valley",
        name: "Bekaa Valley",
        parentRegion: "Eastern Lebanon",
        classification: "Lebanon's dominant high-altitude wine valley between Mount Lebanon and Anti-Lebanon ranges.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Bekaa,Valley,Lebanon,vineyard,wine",
        imageAlt: "Bekaa Valley vineyard landscape",
        imageSubject:
          "Bekaa Valley vineyards on high plateau between mountain ranges with limestone soils, old stone winery cues, Cabernet, Cinsault, Syrah, and Mediterranean sunlight",
        overview:
          "Bekaa Valley is Lebanon's core wine identity: high plateau, dry summers, French-influenced blends, Cinsault, Cabernet, Syrah, Merlot, and international recognition through long-established estates.",
        location:
          "Eastern Lebanon between the Mount Lebanon and Anti-Lebanon mountain ranges, around Zahle, Kefraya, Baalbek, and surrounding highland villages.",
        climate:
          "Mediterranean-continental high plateau climate with hot dry summers, cold winters, strong sunlight, altitude cooling, and limited harvest rain.",
        soils:
          "Limestone, clay-limestone, gravel, red soils, and mountain-derived alluvium; altitude and drainage shape freshness.",
        white: ["Obaideh", "Merwah", "Chardonnay", "Sauvignon Blanc", "Viognier"],
        red: ["Cinsault", "Cabernet Sauvignon", "Syrah", "Merlot", "Grenache", "Carignan"],
        styles: [
          "Bordeaux- and Rhone-influenced red blends",
          "Cinsault-based reds and rose",
          "Native Obaideh and Merwah whites",
          "Ageworthy estate wines from high-altitude sites"
        ],
        serviceCue:
          "Use Bekaa Valley reds with lamb, grilled meats, sumac, eggplant, and Lebanese mezze; the best service story is altitude plus Mediterranean spice.",
        examFocus: [
          "Bekaa Valley is Lebanon's dominant wine region.",
          "High altitude explains freshness in a warm latitude.",
          "Cinsault, Cabernet Sauvignon, Syrah, Obaideh, and Merwah are key associations.",
          "Zahle and Kefraya are useful regional anchors."
        ],
        sourceLinks: lebanonSourceLinks
      }),
      wineBenchmarkPage("Lebanon", {
        slug: "batroun",
        name: "Batroun",
        parentRegion: "Northern Lebanon",
        classification: "Northern Lebanese coastal-mountain region and second major winery cluster after Bekaa.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Batroun,Lebanon,vineyard,wine",
        imageAlt: "Batroun mountain vineyard landscape",
        imageSubject:
          "Batroun vineyards on northern Lebanese coastal mountains with Mediterranean sea distance, limestone terraces, Syrah, Cabernet, native whites, and boutique winery cues",
        overview:
          "Batroun is Lebanon's northern mountain/coastal alternative to Bekaa: smaller producers, sea-influenced slopes, altitude, limestone, and strong boutique growth.",
        location:
          "Northern Lebanon above the coastal city of Batroun, with vineyards climbing into mountain villages and coastal-influenced valleys.",
        climate:
          "Mediterranean mountain climate with maritime influence, dry summers, altitude cooling, and local variation by slope and distance from the sea.",
        soils:
          "Limestone, clay-limestone, rocky terraces, and mountain-derived soils; slope exposure and drainage are central.",
        white: ["Obaideh", "Merwah", "Sauvignon Blanc", "Chardonnay", "Viognier"],
        red: ["Syrah", "Cabernet Sauvignon", "Merlot", "Cinsault", "Grenache"],
        styles: [
          "Boutique red blends",
          "Fresher Mediterranean whites",
          "Rose and lighter mountain reds",
          "Native-grape revival bottlings"
        ],
        serviceCue:
          "Use Batroun for coastal Lebanese service: fresher whites and savory reds with seafood, herbs, labneh, and grilled vegetables.",
        examFocus: [
          "Batroun is Lebanon's second major production cluster after Bekaa.",
          "Maritime and mountain influence separate it from inland Bekaa.",
          "Small-production wineries and native-grape revival are key context.",
          "Limestone terraces and altitude explain freshness."
        ],
        sourceLinks: lebanonSourceLinks
      }),
      wineBenchmarkPage("Lebanon", {
        slug: "jezzine-south-lebanon",
        name: "Jezzine / South Lebanon",
        parentRegion: "Southern Lebanon",
        classification: "Emerging southern Lebanese highland wine region.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Jezzine,Lebanon,vineyard,mountains",
        imageAlt: "Jezzine South Lebanon vineyard landscape",
        imageSubject:
          "Jezzine southern Lebanese mountain vineyards with pine forest, limestone plateau, Mediterranean valleys, red blends, native whites, and emerging-region study cues",
        overview:
          "Jezzine gives Lebanon a southern expansion page: mountain microclimates, valleys, high-altitude freshness, and new quality projects beyond the Bekaa and Batroun stories.",
        location:
          "Southern Lebanon around Jezzine and nearby highland valleys, south of Beirut and inland from the Sidon coastal corridor.",
        climate:
          "Mediterranean highland conditions with altitude cooling, dry summers, winter rainfall, and strong slope-by-slope variation.",
        soils:
          "Limestone, rocky mountain soils, clay-limestone, and valley deposits; elevation and exposure are central to site selection.",
        white: ["Obaideh", "Merwah", "Chardonnay", "Sauvignon Blanc"],
        red: ["Cabernet Sauvignon", "Syrah", "Cinsault", "Merlot"],
        styles: [
          "Mountain red blends",
          "Fresh white blends",
          "Rose for local cuisine",
          "Emerging boutique winery bottlings"
        ],
        serviceCue:
          "Use Jezzine as Lebanon's emerging-region answer: highland freshness, southern identity, and flexible food pairing with mezze and grilled poultry.",
        examFocus: [
          "Jezzine is a southern Lebanese wine-region cue.",
          "It is emerging rather than the main production heartland.",
          "Altitude and microclimates explain its quality potential.",
          "Use it to show Lebanon is not only Bekaa Valley."
        ],
        sourceLinks: lebanonSourceLinks
      })
    ]
  },
  morocco: {
    category: "wine",
    countrySlug: "morocco",
    countryName: "Morocco",
    overview:
      "Morocco benchmark pages teach Meknes/Fes dominance, Atlas foothill AOG/AOC language, vin gris and Mediterranean reds, Benslimane coastal influence, and Oriental/Berkane warm-climate production.",
    sourceNote:
      "Morocco pages use WIPO Lex for Coteaux de l'Atlas AOC, Meknes tourism material, and Roslane viticulture references. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Morocco", {
        slug: "meknes-coteaux-de-latlas",
        name: "Meknes / Coteaux de l'Atlas",
        parentRegion: "Fes-Meknes / Middle Atlas foothills",
        classification: "Moroccan AOC/AOG heartland including Coteaux de l'Atlas, Guerrouane, and Beni M'Tir contexts.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Meknes,Morocco,vineyard,Atlas,wine",
        imageAlt: "Meknes Atlas foothill vineyard landscape",
        imageSubject:
          "Meknes vineyards at Middle Atlas foothills with dry Mediterranean light, clay-limestone slopes, Syrah, Cabernet, Cinsault, Grenache, and Coteaux de l'Atlas appellation cues",
        overview:
          "Meknes is Morocco's core wine page: the main quality/production heartland, Atlas foothill moderation, Coteaux de l'Atlas AOC, Guerrouane, Beni M'Tir, reds, roses, and vin gris context.",
        location:
          "North-central Morocco near Meknes, Fes, El Hajeb, and the Middle Atlas foothills.",
        climate:
          "Mediterranean with continental and mountain influence: hot dry summers, cooler nights near foothills, and enough winter rainfall for vine growth.",
        soils:
          "Clay-limestone, calcareous slopes, gravel, and foothill deposits; altitude and Atlas exposure moderate heat.",
        white: ["Chardonnay", "Sauvignon Blanc", "Viognier", "Vermentino", "Muscat"],
        red: ["Syrah", "Cabernet Sauvignon", "Cinsault", "Grenache", "Carignan", "Merlot"],
        styles: [
          "Syrah and Cabernet-led reds",
          "Vin gris and rose",
          "Cinsault/Grenache Mediterranean blends",
          "AOC Coteaux de l'Atlas premium bottlings"
        ],
        serviceCue:
          "Use Meknes reds and vin gris with tagine, lamb, couscous, grilled vegetables, and spice; the service hook is Atlas foothill freshness in a warm country.",
        examFocus: [
          "Meknes/Fes is Morocco's key wine heartland.",
          "Coteaux de l'Atlas is Morocco's most important AOC reference.",
          "Guerrouane and Beni M'Tir are useful AOG names.",
          "Syrah, Cabernet, Cinsault, Grenache, and vin gris are core style cues."
        ],
        sourceLinks: moroccoSourceLinks
      }),
      wineBenchmarkPage("Morocco", {
        slug: "benslimane-zenata",
        name: "Benslimane / Zenata",
        parentRegion: "Casablanca-Atlantic corridor",
        classification: "Atlantic-influenced Moroccan wine corridor near Casablanca and Rabat.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Benslimane,Morocco,vineyard,Atlantic,wine",
        imageAlt: "Benslimane Zenata Atlantic vineyard landscape",
        imageSubject:
          "Benslimane and Zenata vineyards in Morocco's Atlantic corridor with ocean haze, rolling farmland, Cinsault, Syrah, Cabernet, rose and vin gris service cues",
        overview:
          "Benslimane and Zenata show Morocco's Atlantic side: coastal moderation, historic estates near Casablanca, rose/vin gris service, and red varieties with less inland heat than Meknes.",
        location:
          "Atlantic corridor between Casablanca, Rabat, and Benslimane, with vineyards inland from the coast.",
        climate:
          "Mediterranean-Atlantic with ocean moderation, humidity, dry summers, and less extreme heat than deeper inland zones.",
        soils:
          "Sandy loam, clay-limestone, alluvial and coastal-influenced soils; drainage and disease control matter more than in drier inland sites.",
        white: ["Chardonnay", "Sauvignon Blanc", "Clairette", "Muscat"],
        red: ["Cinsault", "Syrah", "Cabernet Sauvignon", "Grenache", "Carignan", "Merlot"],
        styles: [
          "Vin gris and rose",
          "Medium-bodied Cinsault and Grenache reds",
          "Syrah and Cabernet blends",
          "Accessible table wines for urban service"
        ],
        serviceCue:
          "Use Atlantic Morocco for lighter service: vin gris, rose, fish tagine, grilled sardines, salads, and spice without heavy tannin.",
        examFocus: [
          "Benslimane/Zenata anchors Morocco's Atlantic wine corridor.",
          "Ocean moderation separates it from Meknes and Oriental zones.",
          "Vin gris and rose are key service styles.",
          "Casablanca/Rabat proximity explains urban market relevance."
        ],
        sourceLinks: moroccoSourceLinks
      }),
      wineBenchmarkPage("Morocco", {
        slug: "berkane-oriental",
        name: "Berkane / Oriental",
        parentRegion: "Eastern Morocco",
        classification: "Eastern Moroccan AOG context near Mediterranean and Algerian border influence.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Berkane,Morocco,vineyard,Oriental,wine",
        imageAlt: "Berkane Oriental Moroccan vineyard landscape",
        imageSubject:
          "Berkane Oriental Morocco vineyards with Mediterranean-border sunlight, dry hills, Cinsault, Carignan, Grenache and Syrah rows, and warm-climate AOG study cues",
        overview:
          "Berkane and the Oriental region broaden Morocco beyond Meknes: warmer eastern conditions, Mediterranean-border agriculture, and robust red/rose potential.",
        location:
          "Eastern Morocco near Berkane and Oujda, close to the Mediterranean and Algerian border context.",
        climate:
          "Warm Mediterranean to semi-arid with dry summers, strong sun, and localized mountain or coastal moderation.",
        soils:
          "Alluvial, calcareous, clay, gravel, and dry foothill soils; water stress and heat tolerance are key.",
        white: ["Clairette", "Muscat", "Chardonnay", "Sauvignon Blanc"],
        red: ["Cinsault", "Carignan", "Grenache", "Syrah", "Cabernet Sauvignon"],
        styles: [
          "Warm-climate reds",
          "Rose and vin gris",
          "Cinsault/Carignan/Grenache blends",
          "Local table wines tied to eastern Moroccan cuisine"
        ],
        serviceCue:
          "Use Berkane/Oriental wines with grilled meats, lamb, harissa-like spice, and rustic tagines where warmth and fruit are assets.",
        examFocus: [
          "Berkane is an eastern Moroccan wine cue.",
          "Warm, dry conditions separate it from Atlantic Benslimane.",
          "Mediterranean red varieties are the key logic.",
          "It is lower exam weight than Meknes but useful for regional breadth."
        ],
        sourceLinks: moroccoSourceLinks
      })
    ]
  },
  tunisia: {
    category: "wine",
    countrySlug: "tunisia",
    countryName: "Tunisia",
    overview:
      "Tunisia benchmark pages teach Cap Bon concentration, AOC Mornag, Mediterranean rose/red production, Carignan/Cinsault/Grenache/Syrah, and the country's Roman-to-modern North African wine context.",
    sourceNote:
      "Tunisia pages use APIA geographical-indication material, EU AOC listing material, and Cap Bon regional references. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Tunisia", {
        slug: "mornag-grand-cru-mornag",
        name: "Mornag and Grand Cru Mornag",
        parentRegion: "Tunis / Cap Bon edge",
        classification: "Tunisian AOC and Grand Cru AOC context near Tunis and Cap Bon.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Mornag,Tunisia,vineyard,wine",
        imageAlt: "Mornag Tunisian vineyard landscape",
        imageSubject:
          "Mornag vineyards near Tunis and Jebel Ressas with Mediterranean scrub, limestone hills, Carignan, Cinsault, Grenache, Syrah, and AOC study cues",
        overview:
          "Mornag is Tunisia's core appellation page: the most recognizable AOC name, near Tunis and Cap Bon, with Mediterranean reds, roses, and southern French varieties.",
        location:
          "Northeastern Tunisia near Tunis, Mornag, Jebel Ressas, and the Cap Bon approach.",
        climate:
          "Mediterranean with hot dry summers, sea moderation, winter rainfall, and enough warmth for ripe reds and roses.",
        soils:
          "Limestone, clay-limestone, alluvial, and stony hill soils; drainage and heat management shape quality.",
        white: ["Muscat", "Chardonnay", "Clairette", "Ugni Blanc"],
        red: ["Carignan", "Cinsault", "Grenache", "Syrah", "Mourvedre", "Cabernet Sauvignon"],
        styles: [
          "Mediterranean red blends",
          "Rose and gris-style wines",
          "Syrah and Cabernet-enhanced reds",
          "Fresh whites for coastal service"
        ],
        serviceCue:
          "Use Mornag reds and roses with grilled lamb, merguez, couscous, harissa, tomato, olives, and smoky vegetables.",
        examFocus: [
          "Mornag is Tunisia's most testable AOC name.",
          "Grand Cru Mornag is a useful hierarchy cue.",
          "Carignan, Cinsault, Grenache, Syrah, and Cabernet are logical grape associations.",
          "Its location near Tunis and Cap Bon explains both climate and service visibility."
        ],
        sourceLinks: tunisiaSourceLinks
      }),
      wineBenchmarkPage("Tunisia", {
        slug: "cap-bon-kelibia",
        name: "Cap Bon / Kelibia",
        parentRegion: "Northeastern Tunisia",
        classification: "Cape peninsula wine and agricultural region including Kelibia AOC context.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Cap,Bon,Tunisia,vineyard,Kelibia",
        imageAlt: "Cap Bon Kelibia vineyard landscape",
        imageSubject:
          "Cap Bon peninsula vineyards near Kelibia with Mediterranean sea light, citrus orchards, limestone soils, Muscat, rose and coastal white-wine study cues",
        overview:
          "Cap Bon is Tunisia's peninsula freshness page: coastal agriculture, Kelibia context, rose/white service, seafood pairing, and the country's strongest wine concentration around the northeast.",
        location:
          "Northeastern Tunisia on the Cap Bon peninsula, extending toward Kelibia, Nabeul, and coastal agricultural areas.",
        climate:
          "Mediterranean maritime, with sea breezes, dry summers, winter rainfall, and less inland heat than interior zones.",
        soils:
          "Limestone, sandy loam, clay, and coastal alluvial soils; wind exposure and drainage are important.",
        white: ["Muscat", "Clairette", "Chardonnay", "Ugni Blanc"],
        red: ["Cinsault", "Carignan", "Grenache", "Syrah"],
        styles: [
          "Coastal whites",
          "Rose and light reds",
          "Muscat-influenced aromatic wines",
          "Seafood-friendly Mediterranean table wines"
        ],
        serviceCue:
          "Use Cap Bon wines with seafood couscous, grilled fish, citrus, fennel, olives, and lighter Tunisian dishes.",
        examFocus: [
          "Cap Bon concentrates much of Tunisia's wine and agricultural identity.",
          "Kelibia is a useful AOC/place-name cue.",
          "Coastal moderation explains fresher whites and roses.",
          "This region contrasts with Mornag's fuller red/rose profile."
        ],
        sourceLinks: tunisiaSourceLinks
      }),
      wineBenchmarkPage("Tunisia", {
        slug: "tebourba-carthage",
        name: "Coteaux de Tebourba and Coteaux de Carthage",
        parentRegion: "Northern Tunisia",
        classification: "Northern Tunisian AOC contexts around historic Carthage/Tunis and inland hillside sites.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Tebourba,Carthage,Tunisia,vineyard,wine",
        imageAlt: "Coteaux de Tebourba and Carthage vineyard landscape",
        imageSubject:
          "northern Tunisia hillside vineyards near Tebourba and Carthage with Mediterranean ruins-distance cue, clay-limestone slopes, Carignan, Grenache, Syrah and rose study context",
        overview:
          "Coteaux de Tebourba and Coteaux de Carthage give Tunisia broader AOC recall beyond Mornag: northern hills, historic coastal identity, and Mediterranean table-wine styles.",
        location:
          "Northern Tunisia around Tebourba, Tunis, and the Carthage-influenced coastal/hillside corridor.",
        climate:
          "Mediterranean with winter rainfall, hot dry summers, and sea or hillside moderation depending on site.",
        soils:
          "Clay-limestone, marl, alluvial and hillside soils; slope, drainage, and exposure determine ripeness.",
        white: ["Muscat", "Chardonnay", "Clairette", "Ugni Blanc"],
        red: ["Carignan", "Cinsault", "Grenache", "Syrah", "Cabernet Sauvignon"],
        styles: [
          "Mediterranean reds",
          "Rose and gris wines",
          "Fresh whites for coastal restaurants",
          "Traditional North African table wines"
        ],
        serviceCue:
          "Use these AOC names to support Tunisian regional breadth on a list: approachable reds and roses for spice, grill, and coastal cuisine.",
        examFocus: [
          "Coteaux de Tebourba and Coteaux de Carthage are useful Tunisian AOC names.",
          "They broaden study beyond Mornag and Cap Bon.",
          "Mediterranean red and rose production is the main style frame.",
          "The exam value is appellation recognition and North African regional context."
        ],
        sourceLinks: tunisiaSourceLinks
      })
    ]
  },
  crimea: {
    category: "wine",
    countrySlug: "crimea",
    countryName: "Crimea",
    overview:
      "Crimea's study pages are included for wine-geography literacy and historical context. Crimea's political status is disputed and the peninsula is internationally recognized as part of Ukraine while occupied by Russia; these pages describe wine regions without making a sovereignty claim.",
    sourceNote:
      "Crimea pages use Ukrainian GI context plus historical/travel material on Massandra, Magarach, Sevastopol, and the southern coast. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Crimea", {
        slug: "yalta-massandra-south-coast",
        name: "Yalta / Massandra South Coast",
        parentRegion: "Southern Coast of Crimea",
        classification: "Historic Black Sea coastal wine district associated with Massandra and dessert/fortified styles.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Massandra,Yalta,Crimea,vineyard,wine",
        imageAlt: "Yalta Massandra south coast vineyard landscape",
        imageSubject:
          "Black Sea south-coast vineyards near Yalta and Massandra with mountain shelter, terraced slopes, Muscat and fortified dessert-wine cues, and historic cellar architecture",
        overview:
          "Yalta and Massandra are the core Crimea wine reference: protected south-coast warmth, Black Sea moderation, historic cellars, Muscat and dessert/fortified styles.",
        location:
          "Southern coast of the Crimean Peninsula around Yalta, Massandra, Livadia, Gurzuf, and nearby coastal mountain slopes.",
        climate:
          "Mild maritime-influenced Mediterranean conditions, protected by mountains from colder northern air, with warm sun and sea moderation.",
        soils:
          "Limestone, marl, shale, clay, stony slopes, and mountain-derived coastal soils; exposure and shelter matter strongly.",
        white: ["Muscat", "Aligote", "Riesling", "Kokur", "Chardonnay"],
        red: ["Cabernet Sauvignon", "Saperavi", "Bastardo Magarachsky", "Merlot", "Pinot Noir"],
        styles: [
          "Fortified and dessert Muscat-style wines",
          "Madera/port-style historic cellar wines",
          "Dry and semi-dry coastal whites",
          "Cabernet and Saperavi-based reds"
        ],
        serviceCue:
          "Use Massandra-style wines as a dessert and historic-cellar reference: dried fruit, nuts, caramel, blue cheese, and post-dinner service.",
        examFocus: [
          "Crimea study requires political-status caution.",
          "Massandra and Yalta are the core south-coast names.",
          "Dessert and fortified styles are more testable than generic dry table wine.",
          "Black Sea moderation and mountain shelter explain the south-coast climate."
        ],
        sourceLinks: crimeaSourceLinks
      }),
      wineBenchmarkPage("Crimea", {
        slug: "sevastopol-balaklava",
        name: "Sevastopol / Balaklava",
        parentRegion: "Western Crimea",
        classification: "Western coastal Crimea wine district associated with sparkling and dry table wines.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Sevastopol,Balaklava,Crimea,vineyard,wine",
        imageAlt: "Sevastopol Balaklava vineyard landscape",
        imageSubject:
          "western Crimea vineyards near Sevastopol and Balaklava with limestone hills, Black Sea breeze, sparkling-base Chardonnay and Pinot Noir, and Cabernet/Syrah study cues",
        overview:
          "Sevastopol and Balaklava give Crimea a dry-wine and sparkling counterpoint to Massandra: coastal limestone, maritime air, and western vineyard corridors.",
        location:
          "Western and southwestern Crimea around Sevastopol, Balaklava, Bakhchisaray, and surrounding Black Sea-influenced slopes.",
        climate:
          "Maritime Mediterranean with dry summers, coastal breezes, and less south-coast mountain enclosure than Yalta/Massandra.",
        soils:
          "Limestone, marl, clay-limestone, and stony hillside soils; drainage and wind exposure are central.",
        white: ["Chardonnay", "Sauvignon Blanc", "Riesling", "Aligote", "Pinot Gris"],
        red: ["Cabernet Sauvignon", "Pinot Noir", "Syrah", "Merlot", "Saperavi"],
        styles: [
          "Sparkling-base wines and traditional-method context",
          "Dry whites from Chardonnay and Sauvignon Blanc",
          "Cabernet and Syrah-led reds",
          "Rose and coastal table wines"
        ],
        serviceCue:
          "Use Sevastopol/Balaklava for Crimea's dry-table-wine context rather than the sweet Massandra story.",
        examFocus: [
          "Sevastopol and Balaklava are western Crimea wine anchors.",
          "Sparkling and dry wine are more relevant here than south-coast dessert style.",
          "Limestone and sea breeze are the main visual terroir cues.",
          "The political-status note still applies to all Crimea pages."
        ],
        sourceLinks: crimeaSourceLinks
      }),
      wineBenchmarkPage("Crimea", {
        slug: "magarach-sudak-solar-valley",
        name: "Magarach / Sudak / Solar Valley",
        parentRegion: "Eastern and research-linked Crimea",
        classification: "Historic research and eastern/southeastern Crimea wine context including registered Ukrainian GI names.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Sudak,Crimea,vineyard,wine",
        imageAlt: "Magarach Sudak Solar Valley vineyard landscape",
        imageSubject:
          "eastern Crimea vineyard slopes near Sudak and Magarach research context with Black Sea light, Kokur, Saperavi, Bastardo Magarachsky, and historic wine-school cues",
        overview:
          "Magarach, Sudak, and Solar Valley are useful for advanced Crimea study: research heritage, local grape names, coastal dry wines, and Ukrainian GI context before occupation.",
        location:
          "Southern and southeastern Crimea, including Magarach-linked research heritage near Yalta and eastern coastal zones toward Sudak and Solar Valley/Sonyachna Dolyna.",
        climate:
          "Warm Black Sea-influenced Mediterranean to semi-arid coastal conditions with strong sunlight and varied mountain exposure.",
        soils:
          "Limestone, shale, marl, gravel, and dry stony slopes; site exposure controls ripeness and aromatic concentration.",
        white: ["Kokur", "Muscat", "Riesling", "Aligote", "Chardonnay"],
        red: ["Saperavi", "Bastardo Magarachsky", "Cabernet Sauvignon", "Ekim Kara"],
        styles: [
          "Dry and semi-sweet local white wines",
          "Muscat and aromatic dessert wines",
          "Saperavi and Bastardo-based reds",
          "Research-linked local grape bottlings"
        ],
        serviceCue:
          "Use this page for advanced grape and research context, not for broad service shorthand; pair aromatic whites and reds with Black Sea fish, lamb, and grilled vegetables.",
        examFocus: [
          "Magarach is an important research and GI-linked name.",
          "Solar Valley/Sonyachna Dolyna and Sudak broaden the peninsula beyond Yalta.",
          "Kokur, Saperavi, and Bastardo Magarachsky are useful grape cues.",
          "Crimea pages must remain neutral and status-aware."
        ],
        sourceLinks: crimeaSourceLinks
      })
    ]
  },
  ethiopia: {
    category: "wine",
    countrySlug: "ethiopia",
    countryName: "Ethiopia",
    overview:
      "Ethiopia's wine pages focus on emerging Rift Valley grape wine, Awash heritage production, Ziway/Batu vineyards, imported international varieties, and a high-altitude tropical viticulture model rather than a formal appellation system.",
    sourceNote:
      "Ethiopia pages use Castel Winery, Awash Wines, and Ethiopian embassy sector material. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Ethiopia", {
        slug: "ziway-batu-rift-valley",
        name: "Ziway / Batu Rift Valley",
        parentRegion: "Ethiopian Rift Valley",
        classification: "Emerging estate vineyard region for modern Ethiopian grape wine.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Ziway,Ethiopia,vineyard,Rift,Valley",
        imageAlt: "Ziway Batu Rift Valley vineyard landscape",
        imageSubject:
          "Ziway/Batu Rift Valley vineyard in Ethiopia with high-altitude tropical sunlight, sandy loam, drip irrigation, Syrah, Cabernet, Merlot, Chardonnay, and acacia savanna cues",
        overview:
          "Ziway/Batu is Ethiopia's modern wine anchor because Castel's Rift Valley vineyard makes the country legible as grape wine rather than only tej or imports.",
        location:
          "Central Ethiopian Rift Valley near Ziway/Batu, south of Addis Ababa and close to lake-and-savanna agricultural corridors.",
        climate:
          "High-altitude tropical to semi-arid conditions with intense sun, warm temperatures, seasonal rains, and irrigation management.",
        soils:
          "Sandy loam, volcanic and Rift Valley alluvial materials; drainage, heat, water access, and disease management are central.",
        white: ["Chardonnay", "Chenin Blanc", "Viognier"],
        red: ["Syrah", "Cabernet Sauvignon", "Merlot"],
        styles: [
          "Dry red blends from Syrah, Cabernet, and Merlot",
          "Chardonnay and modern dry whites",
          "Accessible estate table wines",
          "Rift Valley-branded premium cuvees"
        ],
        serviceCue:
          "Use Ziway/Rift Valley wines with Ethiopian grilled meats, tibs, berbere spice, lentils, and tomato-rich stews where fruit and soft tannin help.",
        examFocus: [
          "Ziway/Batu is the modern Ethiopian grape-wine anchor.",
          "The country has emerging production, not a classic appellation ladder.",
          "High-altitude tropical viticulture and irrigation are key concepts.",
          "Syrah, Cabernet, Merlot, and Chardonnay are the main study grapes."
        ],
        sourceLinks: ethiopiaSourceLinks
      }),
      wineBenchmarkPage("Ethiopia", {
        slug: "awash-merti-jeju",
        name: "Awash / Merti-Jeju",
        parentRegion: "Oromia / Awash corridor",
        classification: "Historic Ethiopian wine-production corridor tied to Awash Winery's vineyard base.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Awash,Ethiopia,vineyard,wine",
        imageAlt: "Awash Merti Jeju vineyard landscape",
        imageSubject:
          "Awash/Merti-Jeju vineyard corridor in Ethiopia with Rift Valley dryland agriculture, irrigation, old winery heritage, Gouder red wine and Awash dry white study cues",
        overview:
          "Awash is Ethiopia's heritage page: the longest-established winery identity, domestic brands, and vineyard production linked to Merti-Jeju/Oromia.",
        location:
          "Oromia and Awash-linked production corridor east/southeast of Addis Ababa, including Merti-Jeju vineyard context.",
        climate:
          "Warm highland to semi-arid conditions with seasonal rains, high sun exposure, and irrigation dependence.",
        soils:
          "Rift Valley and volcanic-influenced alluvial soils, sandy loams, and managed agricultural land.",
        white: ["Chenin Blanc", "Chardonnay", "Colombard"],
        red: ["Grenache", "Syrah", "Cabernet Sauvignon", "Merlot"],
        styles: [
          "Domestic dry white wines",
          "Gouder-style dry reds",
          "Semi-sweet and accessible local-market wines",
          "Heritage brands tied to Ethiopian wine culture"
        ],
        serviceCue:
          "Use Awash for Ethiopian domestic wine history and accessible service rather than premium-appellation comparison.",
        examFocus: [
          "Awash is Ethiopia's longest-established wine maker.",
          "Merti-Jeju/Oromia vineyard context supports the production story.",
          "Domestic brand recognition matters more than appellation law.",
          "Connect this page to Ethiopia's broader beverage culture, including tej, without confusing the categories."
        ],
        sourceLinks: ethiopiaSourceLinks
      })
    ]
  },
  india: {
    category: "wine",
    countrySlug: "india",
    countryName: "India",
    overview:
      "India's benchmark pages teach Nashik Valley Wine GI, Maharashtra production strength, Nandi Hills altitude, tropical double-pruning logic, monsoon timing, and warm-climate international varieties.",
    sourceNote:
      "India pages use the official Indian GI registry, Karnataka Tourism, and Grover Zampa material. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("India", {
        slug: "nashik-valley",
        name: "Nashik Valley",
        parentRegion: "Maharashtra",
        classification: "Registered Indian geographical indication for wine.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Nashik,Valley,India,vineyard,wine",
        imageAlt: "Nashik Valley vineyard landscape",
        imageSubject:
          "Nashik Valley vineyards in Maharashtra with Deccan plateau hills, monsoon-managed canopy, Sauvignon Blanc, Chenin Blanc, Shiraz, Cabernet, and winery-tourism cues",
        overview:
          "Nashik is India's core wine exam page: registered GI, wine-capital identity, Maharashtra production strength, tropical viticulture, and the country's most visible winery tourism.",
        location:
          "Western India in Maharashtra, northeast of Mumbai, with vineyards around Nashik, Dindori, Sinnar, and nearby Deccan Plateau sites.",
        climate:
          "Tropical monsoon-influenced plateau climate with dry-season ripening, summer heat, monsoon disease pressure, and pruning schedules adapted to rain timing.",
        soils:
          "Basaltic black cotton soils, red loams, alluvial and plateau soils; drainage and canopy control are essential around monsoon timing.",
        white: ["Sauvignon Blanc", "Chenin Blanc", "Chardonnay", "Viognier", "Riesling"],
        red: ["Shiraz", "Cabernet Sauvignon", "Zinfandel", "Merlot", "Sangiovese"],
        styles: [
          "Fresh Sauvignon Blanc and Chenin Blanc",
          "Shiraz and Cabernet-based reds",
          "Rose and sparkling wine",
          "Accessible winery-tourism bottlings"
        ],
        serviceCue:
          "Use Nashik wines with Indian coastal and spice-driven food: Sauvignon Blanc for herbs and seafood, Chenin for heat, and Shiraz/Cabernet for grilled meats.",
        examFocus: [
          "Nashik Valley Wine is an official Indian GI.",
          "Maharashtra is India's most visible wine-production state.",
          "Monsoon timing and tropical pruning are key viticulture concepts.",
          "Sauvignon Blanc, Chenin Blanc, Shiraz, and Cabernet are the main service grapes."
        ],
        sourceLinks: indiaSourceLinks
      }),
      wineBenchmarkPage("India", {
        slug: "nandi-hills",
        name: "Nandi Hills",
        parentRegion: "Karnataka",
        classification: "High-altitude Karnataka wine district near Bengaluru.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Nandi,Hills,India,vineyard,wine",
        imageAlt: "Nandi Hills vineyard landscape",
        imageSubject:
          "Nandi Hills vineyards near Bengaluru with granite hills, high-elevation tropical light, Cabernet, Shiraz, Viognier, and canopy-management study cues",
        overview:
          "Nandi Hills is the Indian altitude and southern wine page: Karnataka, Bengaluru access, highland moderation, and producers making more structured premium wines.",
        location:
          "Karnataka, north of Bengaluru around Nandi Hills, Doddaballapura, and adjacent highland vineyard zones.",
        climate:
          "Tropical highland with warm days, moderated nights at elevation, monsoon influence, and dry-season harvest windows.",
        soils:
          "Granite-derived, red loam, sandy loam, and rocky highland soils with drainage and slope exposure as quality controls.",
        white: ["Viognier", "Sauvignon Blanc", "Chenin Blanc", "Chardonnay"],
        red: ["Shiraz", "Cabernet Sauvignon", "Tempranillo", "Sangiovese", "Merlot"],
        styles: [
          "Shiraz and Cabernet-led reds",
          "Viognier and aromatic whites",
          "Sparkling and rose",
          "Premium producer-led bottlings"
        ],
        serviceCue:
          "Use Nandi Hills for Indian reds with more structure and altitude logic; pair with tandoor, lamb, pepper spice, and roasted vegetables.",
        examFocus: [
          "Nandi Hills is Karnataka's main wine cue.",
          "Altitude and proximity to Bengaluru shape the service story.",
          "Grover/Zampa-style producer context is often how the region appears on lists.",
          "It contrasts with Nashik's GI and Maharashtra production dominance."
        ],
        sourceLinks: indiaSourceLinks
      }),
      wineBenchmarkPage("India", {
        slug: "deccan-plateau-sangli-bijapur",
        name: "Deccan Plateau / Sangli-Bijapur",
        parentRegion: "Maharashtra and Karnataka interior",
        classification: "Warm interior Deccan wine corridor rather than a single protected appellation.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Deccan,Plateau,India,vineyard,wine",
        imageAlt: "Deccan Plateau Indian vineyard landscape",
        imageSubject:
          "Deccan Plateau vineyards across Sangli, Solapur and Bijapur with dry inland heat, basalt soils, drip irrigation, Shiraz, Cabernet, Chenin and table-grape context",
        overview:
          "The Deccan Plateau corridor broadens India beyond Nashik and Nandi Hills: interior warmth, table-grape crossover, winery expansion, and irrigation/pruning systems built around the monsoon.",
        location:
          "Interior western/southern India across parts of Maharashtra and Karnataka, including Sangli, Solapur, Baramati, Bijapur/Vijayapura, and nearby plateaus.",
        climate:
          "Warm tropical-to-semi-arid plateau with monsoon rainfall, hot dry periods, and managed pruning to align ripening with drier months.",
        soils:
          "Basalt-derived black soils, red loams, alluvial pockets, and irrigated agricultural land.",
        white: ["Chenin Blanc", "Sauvignon Blanc", "Chardonnay"],
        red: ["Shiraz", "Cabernet Sauvignon", "Sangiovese", "Zinfandel", "Merlot"],
        styles: [
          "Warm-climate red blends",
          "Chenin and Sauvignon Blanc",
          "Rose and sparkling",
          "Value-oriented domestic table wines"
        ],
        serviceCue:
          "Use the Deccan corridor as India's production-expansion page: warm-climate, food-friendly, and less place-branded than Nashik.",
        examFocus: [
          "India's wine map extends beyond Nashik.",
          "Monsoon-aware pruning and irrigation are essential.",
          "Sangli, Solapur, Baramati, and Bijapur are useful expansion names.",
          "The region is lower exam weight than Nashik and Nandi Hills."
        ],
        sourceLinks: indiaSourceLinks
      })
    ]
  },
  kenya: {
    category: "wine",
    countrySlug: "kenya",
    countryName: "Kenya",
    overview:
      "Kenya's wine pages focus on equatorial highland viticulture around Naivasha and the Rift Valley, with very small grape-wine production compared with established wine countries.",
    sourceNote:
      "Kenya pages use Leleshwa/Morendat Farm materials. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Kenya", {
        slug: "naivasha-morendat",
        name: "Naivasha / Morendat Farm",
        parentRegion: "Great Rift Valley",
        classification: "Kenya's clearest estate-vineyard and winery reference rather than a formal appellation.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Naivasha,Kenya,vineyard,Rift,Valley",
        imageAlt: "Naivasha Morendat vineyard landscape",
        imageSubject:
          "Naivasha/Morendat Farm vineyard in Kenya's Great Rift Valley with acacia trees, volcanic soils, equatorial highland sun, Sauvignon Blanc, Cabernet, Shiraz and wildlife-distance cues",
        overview:
          "Naivasha is the only practical Kenya grape-wine anchor for study: Rift Valley altitude, Morendat Farm/Leleshwa, equatorial ripening, and tiny-production context.",
        location:
          "Kenya's Great Rift Valley around Naivasha and Morendat Farm, northwest of Nairobi.",
        climate:
          "Equatorial highland climate with altitude moderation, strong sunlight, dry and wet seasons, and ripening shaped by irrigation and canopy management.",
        soils:
          "Volcanic Rift Valley soils, loams, and agricultural farm soils with drainage and water control as central concerns.",
        white: ["Sauvignon Blanc", "Chardonnay"],
        red: ["Cabernet Sauvignon", "Shiraz", "Merlot"],
        styles: [
          "Sauvignon Blanc and reserve Sauvignon Blanc",
          "Rose",
          "Sweet white and sweet red wines",
          "Cabernet Sauvignon and Shiraz estate bottlings"
        ],
        serviceCue:
          "Use Kenyan wine as a discovery pour with nyama choma, grilled goat, spicy greens, and safari-lodge service rather than classic appellation comparison.",
        examFocus: [
          "Naivasha/Morendat is Kenya's clearest grape-wine reference.",
          "Kenya is very small-volume and not an appellation-driven exam country.",
          "Rift Valley altitude and equatorial sunlight are the main viticulture concepts.",
          "Leleshwa is the practical brand/study anchor."
        ],
        sourceLinks: kenyaSourceLinks
      }),
      wineBenchmarkPage("Kenya", {
        slug: "rift-valley-expansion",
        name: "Rift Valley Expansion Corridors",
        parentRegion: "Kenyan highlands",
        classification: "Early-stage grape-wine expansion context across Rift Valley escarpment and highland agriculture.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Kenya,Rift,Valley,vineyard,wine",
        imageAlt: "Kenyan Rift Valley vineyard landscape",
        imageSubject:
          "Kenyan Rift Valley highland vineyard trial rows with volcanic escarpments, acacia savanna, drip irrigation, and experimental Sauvignon Blanc and Cabernet cues",
        overview:
          "This page captures Kenya's potential expansion model: highland agriculture, Rift Valley volcanic soils, irrigation, and small estates rather than mature region law.",
        location:
          "Rift Valley and highland agricultural corridors around Naivasha and possible escarpment-adjacent sites.",
        climate:
          "Highland tropical with intense equatorial sunlight, moderated nights, and alternating wet/dry periods.",
        soils:
          "Volcanic, alluvial, loam, and farm-managed soils; successful vineyards depend on disease control, water, and site selection.",
        white: ["Sauvignon Blanc", "Chardonnay", "Chenin Blanc"],
        red: ["Cabernet Sauvignon", "Shiraz", "Merlot"],
        styles: [
          "Experimental dry whites",
          "Rose",
          "Warm-climate red blends",
          "Local tourism and lodge-service wines"
        ],
        serviceCue:
          "Use this page to explain why Kenya is promising but not yet a formal study heavyweight: altitude, tourism, and small estates.",
        examFocus: [
          "Kenya's wine map is early-stage.",
          "Rift Valley altitude is the central opportunity.",
          "Formal appellation law is not the exam point.",
          "Generated region pages should be treated as study scaffolding until more verified production data exists."
        ],
        sourceLinks: kenyaSourceLinks
      })
    ]
  },
  tahiti: {
    category: "wine",
    countrySlug: "tahiti",
    countryName: "Tahiti",
    overview:
      "Tahiti's wine study is essentially Rangiroa-focused: coral atoll viticulture, tropical lagoon conditions, white and rose wines, and one of the world's most unusual production settings.",
    sourceNote:
      "Tahiti pages use Tahiti Tourisme and Vin de Tahiti material. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Tahiti", {
        slug: "rangiroa-coral-vineyard",
        name: "Rangiroa Coral Vineyard",
        parentRegion: "Tuamotu Archipelago",
        classification: "Coral-atoll vineyard and winery context for Vin de Tahiti.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Rangiroa,Tahiti,vineyard,coral,atoll",
        imageAlt: "Rangiroa coral atoll vineyard landscape",
        imageSubject:
          "Rangiroa coral-atoll vineyard in French Polynesia with lagoon light, white coral soil, tropical vines, Blanc de Corail, rose wine, and palm-fringed maritime study cues",
        overview:
          "Rangiroa is the Tahiti wine page: a coral-atoll vineyard producing white and rose wines under extreme maritime tropical conditions.",
        location:
          "Rangiroa Atoll in the Tuamotu Archipelago of French Polynesia, far from continental wine regions.",
        climate:
          "Tropical maritime atoll climate with intense sun, salt wind, humidity, limited soil depth, and unusual growing cycles.",
        soils:
          "Coral limestone, sand, and organic matter over an atoll substrate; water, salinity, and vine stress define the site.",
        white: ["Carignan Blanc", "Italia", "Muscat Hamburg", "local adapted white varieties"],
        red: ["Carignan", "Muscat Hamburg"],
        styles: [
          "Dry white Blanc de Corail-style wines",
          "Clos du Recif-style white wines",
          "Rose Nacarat-style rose",
          "Moelleux/off-dry white wines"
        ],
        serviceCue:
          "Use Rangiroa wines with poisson cru, lagoon fish, coconut, lime, tropical fruit, and resort tasting context.",
        examFocus: [
          "Tahiti wine is effectively Rangiroa-focused.",
          "Coral atoll soil is the key uniqueness.",
          "White and rose wines are the main styles.",
          "This is a rarity/geography page, not a broad appellation system."
        ],
        sourceLinks: tahitiSourceLinks
      }),
      wineBenchmarkPage("Tahiti", {
        slug: "avatoru-lagoon-cellar",
        name: "Avatoru Lagoon Cellar Context",
        parentRegion: "Rangiroa",
        classification: "Service and production gateway for Rangiroa wine tourism.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Avatoru,Rangiroa,wine,lagoon",
        imageAlt: "Avatoru Rangiroa lagoon wine service landscape",
        imageSubject:
          "Avatoru Rangiroa cellar and lagoon service scene with coral vineyard rows, white wine tasting, sugar cane rum context, and turquoise lagoon background",
        overview:
          "Avatoru and the cellar/tourism context explain how Rangiroa wine reaches visitors: vineyard tours, lagoon cuisine, wine plus rum, and island service.",
        location:
          "Avatoru and nearby tourism/service corridors on Rangiroa Atoll.",
        climate:
          "Same tropical maritime atoll frame as the vineyard, with salt wind, humidity, heat, and lagoon moderation.",
        soils:
          "Coral and sandy atoll soils; the cellar/service story is more important than subsoil variation.",
        white: ["Carignan Blanc", "Italia", "Muscat-derived whites"],
        red: ["Carignan", "Muscat Hamburg"],
        styles: [
          "Dry white resort pours",
          "Rose",
          "Moelleux white",
          "Wine-and-rum tourism tastings"
        ],
        serviceCue:
          "Use this page for hospitality: chilled whites and rose with raw fish, grilled reef fish, coconut, lime, and resort dining.",
        examFocus: [
          "Avatoru is a service/tourism context rather than a separate appellation.",
          "Rangiroa's uniqueness is coral-atoll production.",
          "Wine and rum are often presented together in visitor experiences.",
          "Do not overstate subregional complexity for Tahiti."
        ],
        sourceLinks: tahitiSourceLinks
      })
    ]
  },
  algeria: {
    category: "wine",
    countrySlug: "algeria",
    countryName: "Algeria",
    overview:
      "Algeria benchmark pages teach western VAOG/AOG hillside regions, Mediterranean red and rose production, Cinsault/Carignan/Grenache/Alicante Bouschet, and the country's historically large but now smaller wine sector.",
    sourceNote:
      "Algeria pages use GCO and CIHEAM material on western Algerian vineyards and VAOG zones. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Algeria", {
        slug: "coteaux-de-mascara",
        name: "Coteaux de Mascara",
        parentRegion: "Western Algeria / Oran hinterland",
        classification: "Algerian denomination of origin guarantee hillside region.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Mascara,Algeria,vineyard,wine",
        imageAlt: "Coteaux de Mascara vineyard landscape",
        imageSubject:
          "Coteaux de Mascara western Algeria hillside vineyards with Mount Beni Chougrane slopes, limestone alluvial sand soils, Carignan, Cinsault, Grenache and Alicante Bouschet study cues",
        overview:
          "Coteaux de Mascara is Algeria's core current study region: western hills, altitude, limestone/alluvial soils, red wine, and Mediterranean varieties.",
        location:
          "Western Algeria southeast of Oran, around Mascara and the Beni Chougrane mountain slopes.",
        climate:
          "Mediterranean to semi-arid with hot dry summers, mild winters, hillside altitude, and strong sunlight.",
        soils:
          "Alluvial limestone sand, clay-limestone, stony slopes, and mountain-derived soils.",
        white: ["Clairette", "Ugni Blanc", "Muscat"],
        red: ["Carignan", "Cinsault", "Grenache", "Alicante Bouschet", "Mourvedre"],
        styles: [
          "Fuller Mediterranean red blends",
          "Rose and gris-style wines",
          "Carignan/Cinsault/Grenache table reds",
          "Traditional western Algerian appellation wines"
        ],
        serviceCue:
          "Use Mascara reds with lamb, grilled meats, couscous, tomato, cumin, and North African spice.",
        examFocus: [
          "Coteaux de Mascara is a key Algerian quality-zone name.",
          "Western Algeria near Oran is the practical study geography.",
          "Carignan, Cinsault, Grenache, and Alicante Bouschet are logical grape cues.",
          "Algeria is historically important but lower volume today."
        ],
        sourceLinks: algeriaSourceLinks
      }),
      wineBenchmarkPage("Algeria", {
        slug: "coteaux-de-tlemcen-tessalah",
        name: "Coteaux de Tlemcen and Monts du Tessalah",
        parentRegion: "Western Algeria / Moroccan border corridor",
        classification: "Mountain-slope Algerian VAOG/AOG wine contexts near Tlemcen and Tessalah.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Tlemcen,Algeria,vineyard,wine",
        imageAlt: "Tlemcen Tessalah vineyard landscape",
        imageSubject:
          "Tlemcen and Monts du Tessalah vineyards in western Algeria with mountain slopes, Mediterranean scrub, Grenache, Carignan, Cinsault and high-altitude red-wine cues",
        overview:
          "Tlemcen and Tessalah broaden Algeria's western mountain map: higher slopes, Mediterranean varieties, and cross-border climatic logic near Morocco.",
        location:
          "Western Algeria southwest of Oran toward Tlemcen and the Moroccan border, plus Monts du Tessalah near Sidi Bel Abbes.",
        climate:
          "Mediterranean mountain/semi-arid transition with hot dry summers, altitude influence, and winter rainfall.",
        soils:
          "Calcareous slopes, alluvial deposits, clay-limestone, and rocky mountain soils.",
        white: ["Clairette", "Ugni Blanc", "Muscat"],
        red: ["Carignan", "Cinsault", "Grenache", "Mourvedre", "Alicante Bouschet"],
        styles: [
          "Structured mountain reds",
          "Rose and table wines",
          "Mediterranean blends",
          "Local appellation bottlings"
        ],
        serviceCue:
          "Use Tlemcen/Tessalah for Algerian wines with mountain freshness and grilled meat rather than coastal lightness.",
        examFocus: [
          "Coteaux de Tlemcen and Monts du Tessalah are recognized Algerian wine-zone names.",
          "Altitude and western mountain context are central.",
          "Mediterranean red varieties dominate.",
          "This is advanced regional breadth after Mascara."
        ],
        sourceLinks: algeriaSourceLinks
      }),
      wineBenchmarkPage("Algeria", {
        slug: "medea-zaccar-dahra",
        name: "Medea / Zaccar / Dahra",
        parentRegion: "Central and northwestern Algeria",
        classification: "Algerian VAOG/AOG hillside and mountain wine zones.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Medea,Algeria,vineyard,wine",
        imageAlt: "Medea Zaccar Dahra vineyard landscape",
        imageSubject:
          "Medea, Zaccar and Dahra hillside vineyards in northern Algeria with Atlas foothills, coastal-to-mountain air, Carignan, Grenache, Cinsault and rose study cues",
        overview:
          "Medea, Zaccar, and Dahra help connect Algeria's wine map east of the main Oran/Mascara frame: foothills, mountains, and Mediterranean red/rose styles.",
        location:
          "Northern Algeria, including Medea south of Algiers, Coteaux du Zaccar near Miliana, and Dahra hills toward Mostaganem.",
        climate:
          "Mediterranean mountain/coastal transition with hot summers, winter rain, and local altitude or sea-breeze moderation.",
        soils:
          "Limestone, marl, clay, alluvial, and stony hillside soils.",
        white: ["Clairette", "Ugni Blanc", "Muscat"],
        red: ["Carignan", "Cinsault", "Grenache", "Alicante Bouschet", "Mourvedre"],
        styles: [
          "Red blends",
          "Rose and vin gris-like styles",
          "Mediterranean table wines",
          "Historic appellation-zone bottlings"
        ],
        serviceCue:
          "Use these regions for broad Algerian appellation recognition and flexible North African table-wine service.",
        examFocus: [
          "Medea, Zaccar, and Dahra are important Algerian zone names.",
          "They broaden the map beyond Mascara and Tlemcen.",
          "Mediterranean red and rose styles dominate.",
          "The main exam value is appellation geography and historical production context."
        ],
        sourceLinks: algeriaSourceLinks
      })
    ]
  },
  "cape-verde": {
    category: "wine",
    countrySlug: "cape-verde",
    countryName: "Cape Verde",
    overview:
      "Cape Verde's wine study centers on Fogo: Chã das Caldeiras, volcanic crater viticulture, extreme elevation, volcanic ash soils, tiny production, and recovery after eruptions.",
    sourceNote:
      "Cape Verde pages use Fogo viticulture and CERVIM material. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Cape Verde", {
        slug: "cha-das-caldeiras-fogo",
        name: "Cha das Caldeiras / Fogo",
        parentRegion: "Fogo Island",
        classification: "Extreme volcanic caldera winegrowing community on Fogo Island.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Fogo,Cape,Verde,vineyard,volcano",
        imageAlt: "Cha das Caldeiras Fogo volcanic vineyard landscape",
        imageSubject:
          "Cha das Caldeiras vineyards inside Pico do Fogo volcanic caldera with black lava ash soils, crater walls, low bush vines, red white and passito wine cues, and village-recovery context",
        overview:
          "Chã das Caldeiras is Cape Verde's wine identity: vines inside an active volcanic caldera, black ash soils, tiny production, and red/white/rose/passito wines.",
        location:
          "Inside the caldera of Pico do Fogo on Fogo Island, one of Cape Verde's volcanic islands.",
        climate:
          "High-elevation tropical volcanic climate with intense sun, dry conditions, wind, and strong day-night variation relative to the coast.",
        soils:
          "Fresh volcanic ash, basaltic lava, pumice-like material, and mineral-rich crater soils.",
        white: ["Muscat", "local white field blends"],
        red: ["Touriga Nacional", "local red field blends"],
        styles: [
          "Dry red wine",
          "Dry white wine",
          "Rose",
          "Passito/dried-grape sweet wine"
        ],
        serviceCue:
          "Use Fogo wines as an extreme-volcanic service story with grilled fish, goat, volcanic-salt dishes, and island tasting experiences.",
        examFocus: [
          "Cape Verde wine is essentially Fogo-focused.",
          "Chã das Caldeiras sits inside a volcanic caldera.",
          "Volcanic ash soils are the central terroir cue.",
          "Production is tiny and geography is more testable than grape law."
        ],
        sourceLinks: capeVerdeSourceLinks
      }),
      wineBenchmarkPage("Cape Verde", {
        slug: "maria-chaves-mosteiros",
        name: "Maria Chaves / Mosteiros and Fogo Slopes",
        parentRegion: "Fogo Island",
        classification: "Fogo island vineyard expansion and slope context around crater-linked production.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Fogo,Cape,Verde,volcanic,vineyard",
        imageAlt: "Fogo slope vineyard landscape",
        imageSubject:
          "Fogo island slope vineyards near Maria Chaves and Mosteiros with volcanic black soils, Atlantic trade winds, crater silhouette, and small island-wine study cues",
        overview:
          "Maria Chaves, Mosteiros, and surrounding Fogo slopes give Cape Verde a broader island frame around the Chã das Caldeiras core.",
        location:
          "Fogo Island slope and settlement contexts around the volcanic interior and coastal service towns such as São Filipe and Mosteiros.",
        climate:
          "Tropical Atlantic island climate with altitude differences, wind, dry volcanic slopes, and localized moisture variation.",
        soils:
          "Basaltic volcanic soils, ash, scoria, and stony slope materials.",
        white: ["Muscat", "local white field blends"],
        red: ["Touriga Nacional", "local red field blends"],
        styles: [
          "Dry red and white Fogo wines",
          "Rose",
          "Passito-style sweet wines",
          "Small-production island bottlings"
        ],
        serviceCue:
          "Use this page for Fogo wine tourism and geography: small island production, volcano storytelling, and seafood/goat pairings.",
        examFocus: [
          "Fogo is the only serious Cape Verde wine anchor.",
          "Maria Chaves and Mosteiros are supporting island-place cues.",
          "Volcanic soils and altitude dominate the study story.",
          "Do not overstate Cape Verde as a broad multi-region wine country."
        ],
        sourceLinks: capeVerdeSourceLinks
      })
    ]
  },
  tanzania: {
    category: "wine",
    countrySlug: "tanzania",
    countryName: "Tanzania",
    overview:
      "Tanzania wine study centers on Dodoma: central plateau grape growing, local wineries, government/research involvement, warm semi-arid conditions, and small but meaningful East African production.",
    sourceNote:
      "Tanzania pages use TARI Makutupora and Dodoma winery materials. Dedicated 360 assets remain queued.",
    subregions: [
      wineBenchmarkPage("Tanzania", {
        slug: "dodoma-central-region",
        name: "Dodoma Central Region",
        parentRegion: "Central Tanzania",
        classification: "Tanzania's main grape-growing and wine-production region.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Dodoma,Tanzania,vineyard,wine",
        imageAlt: "Dodoma Central Region vineyard landscape",
        imageSubject:
          "Dodoma Tanzania central plateau vineyards with semi-arid savanna, red earth, drip irrigation, local red and white wine grapes, and East African winery cues",
        overview:
          "Dodoma is Tanzania's wine anchor: central plateau vineyards, local wineries, warm semi-arid conditions, and one of the few Sub-Saharan grape-wine production centers outside South Africa.",
        location:
          "Central Tanzania around Dodoma, the legislative capital and main grape-growing region.",
        climate:
          "Warm semi-arid central plateau climate with strong sunlight, dry periods, seasonal rainfall, and altitude moderation.",
        soils:
          "Red earth, sandy loams, alluvial pockets, and plateau soils; water access and heat management matter.",
        white: ["Chenin Blanc", "Chardonnay", "local white wine grapes"],
        red: ["Cabernet Sauvignon", "Syrah", "local red wine grapes"],
        styles: [
          "Dry and semi-sweet local reds",
          "White table wines",
          "Fruit-forward domestic-market wines",
          "Small estate and cooperative bottlings"
        ],
        serviceCue:
          "Use Dodoma wines as an East African discovery pour with grilled meats, stews, tomato, chili, and local hospitality contexts.",
        examFocus: [
          "Dodoma is Tanzania's main wine region.",
          "Tanzania is small but significant in Sub-Saharan wine context.",
          "Semi-arid plateau climate and irrigation are central.",
          "Formal appellation law is not the point; region identity is production-based."
        ],
        sourceLinks: tanzaniaSourceLinks
      }),
      wineBenchmarkPage("Tanzania", {
        slug: "makutupora-nkulabi",
        name: "Makutupora / Nkulabi",
        parentRegion: "Dodoma",
        classification: "Dodoma research, training, and village-production context.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Makutupora,Dodoma,Tanzania,vineyard",
        imageAlt: "Makutupora Nkulabi vineyard landscape",
        imageSubject:
          "Makutupora and Nkulabi Dodoma vineyard rows with research-station training context, semi-arid plateau light, red soil, and local winery production cues",
        overview:
          "Makutupora and Nkulabi help make Dodoma more specific: research/training infrastructure, village production, and local winery identities.",
        location:
          "Dodoma-region sites including Makutupora and Nkulabi village contexts.",
        climate:
          "Warm semi-arid plateau climate with pronounced dry season and reliance on water management.",
        soils:
          "Sandy loams, red plateau soils, and managed agricultural parcels.",
        white: ["Chenin Blanc", "Chardonnay", "local white wine grapes"],
        red: ["Cabernet Sauvignon", "Syrah", "local red wine grapes"],
        styles: [
          "Local red and white table wines",
          "Training/research-linked production",
          "Domestic-market blends",
          "Small winery bottlings"
        ],
        serviceCue:
          "Use this page to explain Tanzania's practical production base rather than a famous global appellation.",
        examFocus: [
          "Makutupora is a research/training cue for Tanzania wine.",
          "Nkulabi/Dodoma village context anchors producer geography.",
          "Small-scale production and climate adaptation are key.",
          "This page is lower exam weight than Dodoma overall."
        ],
        sourceLinks: tanzaniaSourceLinks
      })
    ]
  },
  uganda: {
    category: "wine",
    countrySlug: "uganda",
    countryName: "Uganda",
    overview:
      "Uganda's wine pages are intentionally framed around fruit wine and local fermentation rather than classic grape appellations. The study value is tropical fruit sourcing, small producers, and beverage-category clarity.",
    sourceNote:
      "Uganda pages use local producer material for fruit wines. Dedicated 360 assets remain queued; generated pages should not imply a mature grape-wine appellation system.",
    subregions: [
      wineBenchmarkPage("Uganda", {
        slug: "central-uganda-fruit-wine-corridor",
        name: "Central Uganda Fruit-Wine Corridor",
        parentRegion: "Kampala / Central Region",
        classification: "Fruit-wine production and service corridor rather than a grape-wine appellation.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Uganda,pineapple,wine,fruit,fermentation",
        imageAlt: "Central Uganda fruit wine production landscape",
        imageSubject:
          "central Uganda tropical fruit-wine production with pineapple, mango, passionfruit, small fermentation tanks, Kampala service cues, and clear non-grape wine education context",
        overview:
          "Central Uganda is the practical study page for Ugandan wine because the market is fruit-wine led: pineapple, mango, passionfruit, small producers, and local RTD/juice overlap.",
        location:
          "Central Uganda around Kampala and surrounding fruit-sourcing and small-beverage production networks.",
        climate:
          "Equatorial tropical climate with year-round fruit availability, rainfall variation, and fermentation-control challenges in warm conditions.",
        soils:
          "Fruit-sourcing depends on tropical agricultural soils rather than vineyard terroir; processing hygiene and fruit maturity matter more than vineyard subsoil.",
        white: ["Pineapple", "Mango", "Passionfruit", "Lemon"],
        red: ["Mixed tropical fruit", "Apple-and-grape blends", "Berry-style fruit inputs"],
        styles: [
          "Pineapple wine",
          "Mango and passionfruit wines",
          "Mixed fruit wines",
          "Sweet and semi-sweet local table beverages"
        ],
        serviceCue:
          "Use Ugandan wine as fruit-wine category education: chilled, sweet-to-semi-sweet, tropical, and best with spicy snacks, fruit desserts, and casual service.",
        examFocus: [
          "Uganda is not a classic grape-appellation country.",
          "Fruit wine is the accurate study frame.",
          "Pineapple, mango, passionfruit, and mixed fruit are the key inputs.",
          "Do not use European wine-region assumptions on this page."
        ],
        sourceLinks: ugandaSourceLinks
      }),
      wineBenchmarkPage("Uganda", {
        slug: "western-uganda-fruit-wine-highlands",
        name: "Western Uganda Fruit-Wine Highlands",
        parentRegion: "Western Uganda",
        classification: "Fruit sourcing and small-producer context for tropical fruit wines.",
        examWeight: "medium",
        imageUrl: "https://source.unsplash.com/1600x900/?Western,Uganda,fruit,wine,pineapple",
        imageAlt: "Western Uganda fruit wine highland landscape",
        imageSubject:
          "western Uganda highland fruit farms with pineapple and banana rows, small fermentation workspace, Rwenzori-distance hills, and community fruit-wine study cues",
        overview:
          "Western Uganda extends the fruit-wine page into highland fruit sourcing and small community beverage enterprises rather than estate vineyards.",
        location:
          "Western Uganda fruit-growing and small-production areas, including highland corridors and communities linked to pineapple, banana, and mixed-fruit beverages.",
        climate:
          "Tropical highland to equatorial climates with rainfall, warm fermentation conditions, and strong fruit-growing capacity.",
        soils:
          "Volcanic and tropical agricultural soils for fruit production; quality depends on fruit maturity, handling, hygiene, and fermentation control.",
        white: ["Pineapple", "Banana", "Apple", "Lemon"],
        red: ["Mixed tropical fruit", "Berry-style fruit inputs"],
        styles: [
          "Pineapple and banana fruit wines",
          "Mixed fruit wines",
          "Sweet local beverage styles",
          "Small-batch community production"
        ],
        serviceCue:
          "Use this page when explaining how fruit wines fit into beverage education: they are fermented fruit beverages, not grape terroir wines.",
        examFocus: [
          "Western Uganda is a fruit-sourcing frame, not an appellation.",
          "Banana and pineapple wines are more relevant than grape varieties.",
          "Fermentation control matters in warm climates.",
          "This is useful for category clarity across the wider Sip Studies commodity map."
        ],
        sourceLinks: ugandaSourceLinks
      })
    ]
  },
  argentina: {
    category: "wine",
    countrySlug: "argentina",
    countryName: "Argentina",
    overview:
      "Argentina's benchmark pages prioritize altitude, desert irrigation, Andes-adjacent alluvial soils, Malbec, Torrontes, and the exam split between Mendoza, the far north, Patagonia, and San Juan.",
    sourceNote:
      "Argentina pages use INV regional reporting and Wines of Argentina material, with existing Mendoza 360 media attached while more region-specific assets are queued.",
    subregions: [
      wineBenchmarkPage("Argentina", {
        slug: "uco-valley",
        name: "Uco Valley",
        parentRegion: "Mendoza",
        classification: "High-altitude Mendoza subregion spanning Tupungato, Tunuyan, and San Carlos.",
        examWeight: "core",
        imageUrl: "/panoramas/south-america-mendoza-360.png",
        imageAlt: "Mendoza high-altitude vineyard panorama",
        imageSubject:
          "high-altitude Malbec vineyards on alluvial fans below the Andes with irrigation channels, stony soils, and strong diurnal-range cues",
        overview:
          "Uco Valley is the modern Mendoza exam anchor for altitude, freshness, limestone/alluvial discussion, and more structured Malbec and Chardonnay than warmer lower sites.",
        location: "Southwest of Mendoza city, running along Andean foothill zones around Tupungato, Tunuyan, and San Carlos.",
        climate:
          "Dry continental desert with intense sunlight, cold nights, low disease pressure, and irrigation dependence from Andean snowmelt.",
        soils:
          "Alluvial fans with stones, sand, gravel, calcareous pockets, and strong drainage. Site differences are a central modern quality story.",
        white: ["Chardonnay", "Torrontes", "Sauvignon Blanc", "Semillon"],
        red: ["Malbec", "Cabernet Sauvignon", "Cabernet Franc", "Pinot Noir", "Syrah"],
        styles: [
          "High-altitude Malbec with violet, dark fruit, firm tannin, and freshness",
          "Structured Cabernet Franc and Bordeaux-style blends",
          "Tense Chardonnay from cooler elevated sites",
          "Cooler-climate Pinot Noir and sparkling experiments"
        ],
        serviceCue:
          "Use Uco Valley when a guest wants Argentine Malbec with more lift, structure, mineral tension, and freshness than a plush entry-level Mendoza bottling.",
        examFocus: [
          "Uco Valley sits within Mendoza and is tied to high-altitude viticulture.",
          "Irrigation from Andes snowmelt is a core viticultural concept.",
          "Malbec is the anchor, but Cabernet Franc and Chardonnay are increasingly testable.",
          "Contrast Uco freshness and structure with warmer lower Mendoza zones."
        ],
        sourceLinks: argentinaSourceLinks,
        panorama: {
          id: "argentina-uco-valley-subregion",
          title: "Mendoza High-Altitude Vineyard Corridor",
          imageSrc: "/panoramas/south-america-mendoza-360.png",
          imageAlt: "360 view of high-altitude Mendoza vineyard rows near the Andes",
          copy:
            "Use the 360 view to read Argentina's testable pattern: Andes backdrop, dry air, irrigated rows, stony alluvial soils, and altitude-driven freshness.",
          details: ["Malbec", "High altitude", "Alluvial fans", "Andes snowmelt irrigation"]
        }
      }),
      wineBenchmarkPage("Argentina", {
        slug: "lujan-de-cuyo",
        name: "Lujan de Cuyo",
        parentRegion: "Mendoza",
        classification: "Historic Mendoza quality region and DOC reference for Malbec-centered study.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Lujan,de,Cuyo,Mendoza,vineyard,Malbec",
        imageAlt: "Lujan de Cuyo Mendoza vineyard landscape",
        imageSubject:
          "old-vine Malbec rows on Mendoza alluvial terraces with irrigation furrows, dry mountain light, and historic DOC study cues",
        overview:
          "Lujan de Cuyo is the classic Mendoza reference for old-vine Malbec, DOC language, and polished Argentine reds from departments close to Mendoza city.",
        location: "Mendoza Province near Mendoza city, especially upper Mendoza River valley sites.",
        climate: "Dry continental, sunny, and irrigated, with altitude moderating heat and helping preserve acidity.",
        soils: "Alluvial terrace soils with gravel, sand, and stones; old vines and irrigation management are major style drivers.",
        white: ["Chardonnay", "Semillon", "Sauvignon Blanc"],
        red: ["Malbec", "Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"],
        styles: [
          "Ripe Malbec with plush fruit, violet, and oak-polished texture",
          "Bordeaux-style blends",
          "Reserve reds with aging potential",
          "Historic old-vine bottlings"
        ],
        serviceCue:
          "Use Lujan de Cuyo as the classic premium Mendoza answer: softer and more traditional than many high-elevation Uco examples.",
        examFocus: [
          "Lujan de Cuyo is a classic Mendoza Malbec benchmark.",
          "DOC language is more relevant here than in many other Argentine regions.",
          "Old-vine and alluvial-terrace cues support premium style discussion.",
          "Compare it directly with Uco Valley for altitude and freshness."
        ],
        sourceLinks: argentinaSourceLinks
      }),
      wineBenchmarkPage("Argentina", {
        slug: "salta-cafayate",
        name: "Salta / Cafayate",
        parentRegion: "Northwest Argentina",
        classification: "Extreme-elevation northern Argentine wine region.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Cafayate,Salta,vineyard,Torrontes",
        imageAlt: "Cafayate high-altitude vineyard landscape",
        imageSubject:
          "extreme-elevation Torrontes and Malbec vineyards in arid Cafayate with red rock valleys, intense sunlight, and mountain desert conditions",
        overview:
          "Salta, especially Cafayate, is the core exam association for extreme altitude and Torrontes, plus powerful reds from dry high-desert sites.",
        location: "Northwest Argentina, with Cafayate as the key service and tourism anchor.",
        climate: "Very sunny, dry, high-elevation conditions with dramatic day-night temperature shifts.",
        soils: "Sandy, rocky, well-drained desert soils; irrigation and altitude are more important than fertility.",
        white: ["Torrontes", "Chardonnay", "Sauvignon Blanc"],
        red: ["Malbec", "Cabernet Sauvignon", "Tannat", "Syrah"],
        styles: [
          "Aromatic Torrontes with floral perfume and dry finish",
          "High-altitude Malbec and Cabernet",
          "Tannat and robust reds",
          "Fresh whites shaped by altitude despite intense sun"
        ],
        serviceCue:
          "Use Salta for guests who want aromatic dry whites: Torrontes smells floral and grapey but should finish dry and bright.",
        examFocus: [
          "Salta/Cafayate is the extreme-altitude Argentine benchmark.",
          "Torrontes is the key white grape association.",
          "High UV and dry air intensify fruit while altitude protects freshness.",
          "Do not treat all Argentine wine as Mendoza Malbec."
        ],
        sourceLinks: argentinaSourceLinks
      })
    ]
  },
  chile: {
    category: "wine",
    countrySlug: "chile",
    countryName: "Chile",
    overview:
      "Chile's benchmark pages teach the north-south valley ladder, coastal-versus-Andean influence, Cabernet/Carmenere, cool-climate whites, and old-vine southern heritage.",
    sourceNote:
      "Chile pages use Wines of Chile trade material and region reporting. Dedicated 360 assets remain queued for each valley.",
    subregions: [
      wineBenchmarkPage("Chile", {
        slug: "maipo-valley",
        name: "Maipo Valley",
        parentRegion: "Central Valley",
        classification: "Historic Central Valley region and Chilean Cabernet benchmark.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Maipo,Valley,Chile,vineyard,Cabernet",
        imageAlt: "Maipo Valley Cabernet vineyard landscape",
        imageSubject:
          "Andean foothill Cabernet Sauvignon vineyards near Santiago with gravel terraces, irrigation channels, and mountain-cooling cues",
        overview:
          "Maipo Valley is the classic Chilean Cabernet reference and the easiest way to teach Andes influence, gravelly foothill sites, and polished Central Valley red structure.",
        location: "Near Santiago in Chile's Central Valley corridor, with important Alto Maipo foothill sites.",
        climate: "Mediterranean with dry summers, Andean cooling influence, and irrigation from mountain water systems.",
        soils: "Alluvial gravel, stones, and well-drained terraces, especially important for Cabernet structure.",
        white: ["Sauvignon Blanc", "Chardonnay"],
        red: ["Cabernet Sauvignon", "Carmenere", "Merlot", "Syrah", "Cabernet Franc"],
        styles: [
          "Structured Cabernet Sauvignon and Bordeaux-style blends",
          "Carmenere with spice and dark fruit",
          "Premium reds from Alto Maipo foothill sites",
          "Ageworthy reserve reds"
        ],
        serviceCue:
          "Use Maipo when a guest wants Chilean Cabernet: ripe but structured, often with herbal lift, black fruit, and polished oak.",
        examFocus: [
          "Maipo is Chile's core Cabernet Sauvignon benchmark.",
          "Alto Maipo and Andean foothill influence are useful quality cues.",
          "Central Valley is a broad frame; Maipo is a more specific region.",
          "Cabernet and Carmenere should not be confused as the same service story."
        ],
        sourceLinks: chileSourceLinks
      }),
      wineBenchmarkPage("Chile", {
        slug: "colchagua-valley",
        name: "Colchagua Valley",
        parentRegion: "Rapel / Central Valley",
        classification: "Warm premium red-wine valley within the broader Rapel-Central Valley frame.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Colchagua,Valley,Chile,vineyard,Carmenere",
        imageAlt: "Colchagua Valley vineyard landscape",
        imageSubject:
          "warm Colchagua Valley red-wine vineyards with Carmenere and Cabernet blocks, coastal mountain shadows, and dry Mediterranean light",
        overview:
          "Colchagua is a premium Chilean red-wine shorthand for Carmenere, Cabernet, Syrah, and ripe structured blends.",
        location: "Southwest of Santiago within the Rapel/Central Valley system, including well-known premium subareas such as Apalta.",
        climate: "Warm Mediterranean, moderated by valley orientation, coastal influence in some sectors, and dry harvest conditions.",
        soils: "Mixed granitic, clay, alluvial, and colluvial soils; hillsides and well-drained sites are important for premium reds.",
        white: ["Sauvignon Blanc", "Chardonnay"],
        red: ["Carmenere", "Cabernet Sauvignon", "Syrah", "Malbec", "Merlot"],
        styles: [
          "Carmenere with ripe black fruit, herbs, and spice",
          "Cabernet-led blends",
          "Syrah and Mediterranean-influenced reds",
          "Premium hillside bottlings"
        ],
        serviceCue:
          "Use Colchagua for guests who want richer Chilean reds, especially Carmenere and blends with generous fruit and spice.",
        examFocus: [
          "Colchagua is a premium red-wine valley.",
          "Carmenere is a key association, though Cabernet and Syrah matter too.",
          "Apalta is a useful high-quality name to recognize.",
          "Contrast Colchagua warmth with Casablanca's cool coastal whites."
        ],
        sourceLinks: chileSourceLinks
      }),
      wineBenchmarkPage("Chile", {
        slug: "casablanca-valley",
        name: "Casablanca Valley",
        parentRegion: "Aconcagua / Coastal Chile",
        classification: "Cool coastal valley important for white varieties and Pinot Noir.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Casablanca,Valley,Chile,vineyard,Sauvignon,Blanc",
        imageAlt: "Casablanca Valley cool-climate vineyard landscape",
        imageSubject:
          "fog-cooled coastal Sauvignon Blanc and Chardonnay vineyards in Casablanca Valley with morning marine layer and Pacific influence",
        overview:
          "Casablanca is Chile's cleanest exam model for coastal cooling, Sauvignon Blanc, Chardonnay, and Pinot Noir.",
        location: "Between Santiago and Valparaiso, close enough to the Pacific to receive strong maritime cooling.",
        climate: "Cool Mediterranean with fog, morning cloud, and ocean influence extending the growing season.",
        soils: "Clay, sand, decomposed granite, and alluvial materials; drainage and cool exposure matter for white-wine freshness.",
        white: ["Sauvignon Blanc", "Chardonnay", "Riesling"],
        red: ["Pinot Noir", "Syrah"],
        styles: [
          "Crisp Sauvignon Blanc",
          "Cool-climate Chardonnay",
          "Pinot Noir with bright red fruit",
          "Fresh coastal sparkling-base experiments"
        ],
        serviceCue:
          "Use Casablanca when a guest wants Chilean freshness: citrus, herbs, bright acidity, and lighter-bodied coastal expression.",
        examFocus: [
          "Casablanca is a coastal cool-climate reference.",
          "Sauvignon Blanc and Chardonnay are the key white grapes.",
          "Pinot Noir is more logical here than in warmer Central Valley red zones.",
          "Pacific fog and morning cloud explain the style."
        ],
        sourceLinks: chileSourceLinks
      })
    ]
  },
  australia: {
    category: "wine",
    countrySlug: "australia",
    countryName: "Australia",
    overview:
      "Australia's benchmark pages follow the official GI frame and contrast warm South Australian power with coastal, cool-climate, and island precision.",
    sourceNote:
      "Australia pages reference Wine Australia's protected GI register; detailed GI boundary-map generation remains queued.",
    subregions: [
      wineBenchmarkPage("Australia", {
        slug: "barossa-valley",
        name: "Barossa Valley",
        parentRegion: "South Australia / Barossa Zone",
        classification: "Protected Australian GI within the Barossa zone.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Barossa,Valley,Shiraz,vineyard",
        imageAlt: "Barossa Valley old-vine Shiraz vineyard landscape",
        imageSubject:
          "old-vine Shiraz blocks in warm Barossa Valley with gnarled vines, red-brown soils, dry hills, and historic South Australian cellar cues",
        overview:
          "Barossa Valley is Australia's core Shiraz benchmark: warm, powerful, old-vine, and central to exam contrast with cooler Australian regions.",
        location: "South Australia, north of Adelaide, within the Barossa zone alongside Eden Valley.",
        climate: "Warm to hot Mediterranean-influenced climate with dry harvest conditions and high ripeness potential.",
        soils: "Varied red-brown earths, clay loams, sands, and ancient weathered materials; old vines are central to the story.",
        white: ["Riesling", "Semillon", "Chardonnay"],
        red: ["Shiraz", "Grenache", "Cabernet Sauvignon", "Mataro / Mourvedre"],
        styles: [
          "Full-bodied Shiraz with dark fruit, spice, and high alcohol potential",
          "GSM blends from old vines",
          "Cabernet and Shiraz-Cabernet blends",
          "Riesling from cooler nearby Eden Valley context"
        ],
        serviceCue:
          "Use Barossa for guests who want rich, powerful Australian Shiraz with generosity, oak, spice, and grilled-meat pairing logic.",
        examFocus: [
          "Barossa Valley is a protected GI and a Shiraz benchmark.",
          "Do not confuse Barossa Valley with cooler Eden Valley in the broader Barossa zone.",
          "Old-vine Shiraz and Grenache are major quality cues.",
          "Warm climate explains body, alcohol, and ripe fruit."
        ],
        sourceLinks: australiaSourceLinks
      }),
      wineBenchmarkPage("Australia", {
        slug: "margaret-river",
        name: "Margaret River",
        parentRegion: "Western Australia",
        classification: "Protected Australian GI in Western Australia.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Margaret,River,Australia,vineyard,Cabernet",
        imageAlt: "Margaret River Cabernet vineyard landscape",
        imageSubject:
          "coastal Margaret River Cabernet and Chardonnay vineyards with maritime cloud, gravelly loam, eucalyptus edge, and Indian Ocean cooling cues",
        overview:
          "Margaret River is Australia's Cabernet-Chardonnay counterweight to Barossa: maritime, moderate, and strongly associated with premium structure and freshness.",
        location: "Southwest Western Australia, near the Indian Ocean and Cape Naturaliste/Cape Leeuwin coastal influence.",
        climate: "Maritime Mediterranean with reliable winter rainfall, ocean moderation, and lower heat extremes than inland regions.",
        soils: "Gravelly loams, lateritic gravels, and well-drained soils that support Cabernet structure and Chardonnay precision.",
        white: ["Chardonnay", "Semillon", "Sauvignon Blanc"],
        red: ["Cabernet Sauvignon", "Merlot", "Malbec", "Shiraz"],
        styles: [
          "Cabernet Sauvignon and Bordeaux-style blends",
          "Premium Chardonnay with texture and acidity",
          "Semillon-Sauvignon Blanc blends",
          "Structured reds with maritime freshness"
        ],
        serviceCue:
          "Use Margaret River when a guest wants Australian Cabernet with freshness and elegance rather than Barossa-style warmth.",
        examFocus: [
          "Margaret River is in Western Australia.",
          "Cabernet Sauvignon and Chardonnay are the dominant exam associations.",
          "Maritime influence is the key climate concept.",
          "Semillon-Sauvignon Blanc blends are a useful white-wine cue."
        ],
        sourceLinks: australiaSourceLinks
      }),
      wineBenchmarkPage("Australia", {
        slug: "tasmania",
        name: "Tasmania",
        parentRegion: "Tasmania",
        classification: "Protected Australian GI and island cool-climate benchmark.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Tasmania,vineyard,sparkling,wine",
        imageAlt: "Tasmania cool-climate vineyard landscape",
        imageSubject:
          "cool Tasmanian vineyard for sparkling base wine with island maritime light, Pinot Noir and Chardonnay rows, and crisp southern-climate cues",
        overview:
          "Tasmania is the core Australian exam page for cool-climate sparkling wine, Pinot Noir, Chardonnay, and island acidity.",
        location: "Island state south of mainland Australia, with vineyards concentrated in cooler valleys and coastal-influenced zones.",
        climate: "Cool maritime climate with long growing season, acid retention, and vintage sensitivity.",
        soils: "Diverse basalt, dolerite, sedimentary, and alluvial materials; site selection is crucial for ripeness and acidity.",
        white: ["Chardonnay", "Riesling", "Pinot Gris", "Sauvignon Blanc"],
        red: ["Pinot Noir"],
        styles: [
          "Traditional-method sparkling wine",
          "Cool-climate Pinot Noir",
          "High-acid Chardonnay",
          "Riesling and aromatic whites"
        ],
        serviceCue:
          "Use Tasmania for Australian freshness: sparkling wine, high-acid Chardonnay, and elegant Pinot Noir.",
        examFocus: [
          "Tasmania is the Australian cool-climate island benchmark.",
          "Sparkling base wines from Chardonnay and Pinot Noir are highly testable.",
          "Cool maritime climate contrasts directly with Barossa Valley.",
          "Acidity and long growing season are central quality cues."
        ],
        sourceLinks: australiaSourceLinks
      })
    ]
  },
  "new-zealand": {
    category: "wine",
    countrySlug: "new-zealand",
    countryName: "New Zealand",
    overview:
      "New Zealand's benchmark pages prioritize Sauvignon Blanc, Pinot Noir, Gimblett Gravels-style reds, coastal brightness, and legally recognized GI regions.",
    sourceNote:
      "New Zealand pages reference New Zealand Wine regions and maps, with existing Marlborough 360 media attached while more GI-specific assets are queued.",
    subregions: [
      wineBenchmarkPage("New Zealand", {
        slug: "marlborough",
        name: "Marlborough",
        parentRegion: "South Island",
        classification: "New Zealand GI and flagship Sauvignon Blanc region.",
        examWeight: "core",
        imageUrl: "/panoramas/oceania-marlborough-360.png",
        imageAlt: "Marlborough Sauvignon Blanc vineyard panorama",
        imageSubject:
          "Marlborough Sauvignon Blanc vineyards in Wairau Valley with bright alluvial stones, river plain, mountain rim, and cool sunny maritime cues",
        overview:
          "Marlborough is New Zealand's global calling card and a core exam benchmark for pungent, high-acid Sauvignon Blanc.",
        location: "Northeastern South Island, especially Wairau, Awatere, and Southern Valleys contexts.",
        climate: "Sunny, dry, and cool to moderate, with strong diurnal swing and maritime influence protecting acidity.",
        soils: "Alluvial river stones, free-draining gravels, and valley soils; subregional differences shape aroma and texture.",
        white: ["Sauvignon Blanc", "Chardonnay", "Pinot Gris", "Riesling"],
        red: ["Pinot Noir"],
        styles: [
          "Pungent Sauvignon Blanc with passionfruit, citrus, herb, and high acidity",
          "Method traditional sparkling base wines",
          "Chardonnay with freshness",
          "Pinot Noir from cooler sites"
        ],
        serviceCue:
          "Use Marlborough when a guest wants unmistakable aromatic Sauvignon Blanc: bright acid, passionfruit, citrus, and green-herb intensity.",
        examFocus: [
          "Marlborough is New Zealand's flagship region.",
          "Sauvignon Blanc is the dominant exam association.",
          "Wairau and Awatere are useful subregional names.",
          "High sunlight plus cool nights explains intense aroma and acidity."
        ],
        sourceLinks: newZealandSourceLinks,
        panorama: {
          id: "new-zealand-marlborough-subregion",
          title: "Marlborough Sauvignon Blanc Plain",
          imageSrc: "/panoramas/oceania-marlborough-360.png",
          imageAlt: "360 view of Marlborough Sauvignon Blanc vineyards",
          copy:
            "Use the 360 view to study New Zealand's service signal: bright rows, open valley light, river-stone drainage, and Sauvignon Blanc freshness.",
          details: ["Sauvignon Blanc", "Wairau Valley", "Alluvial stones", "High acidity"]
        }
      }),
      wineBenchmarkPage("New Zealand", {
        slug: "central-otago",
        name: "Central Otago",
        parentRegion: "South Island",
        classification: "New Zealand GI and southern cool-climate Pinot Noir benchmark.",
        examWeight: "core",
        imageUrl: "https://source.unsplash.com/1600x900/?Central,Otago,vineyard,Pinot,Noir",
        imageAlt: "Central Otago Pinot Noir vineyard landscape",
        imageSubject:
          "Central Otago Pinot Noir vineyards with schist slopes, dry mountain basin, braided river light, and southern cool-climate cues",
        overview:
          "Central Otago is New Zealand's strongest Pinot Noir region in global service language and a clean contrast to Marlborough Sauvignon Blanc.",
        location: "Inland southern South Island, around subregions such as Bannockburn, Gibbston, Cromwell Basin, and Wanaka.",
        climate: "Cool to semi-continental, dry, with large diurnal range, frost risk, and intense southern sunlight.",
        soils: "Schist-derived soils, loess, gravels, and glacial materials; drainage and slope matter strongly.",
        white: ["Chardonnay", "Riesling", "Pinot Gris", "Gewurztraminer"],
        red: ["Pinot Noir"],
        styles: [
          "Pinot Noir with dark cherry, spice, and firm structure",
          "Riesling with high acidity",
          "Pinot Gris and aromatic whites",
          "Focused Chardonnay"
        ],
        serviceCue:
          "Use Central Otago for guests who want New World Pinot Noir with more mountain intensity and darker fruit than many lighter cool-climate examples.",
        examFocus: [
          "Central Otago is a Pinot Noir benchmark.",
          "It is one of New Zealand's most southerly and inland wine regions.",
          "Schist and dry mountain climate are common study cues.",
          "Bannockburn and Gibbston are useful names to recognize."
        ],
        sourceLinks: newZealandSourceLinks
      }),
      wineBenchmarkPage("New Zealand", {
        slug: "hawkes-bay",
        name: "Hawke's Bay",
        parentRegion: "North Island",
        classification: "New Zealand GI and warm North Island benchmark for Chardonnay and Bordeaux-style reds.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Hawkes,Bay,vineyard,Gimblett,Gravels",
        imageAlt: "Hawke's Bay vineyard landscape",
        imageSubject:
          "Hawke's Bay vineyards with gravel terraces, Chardonnay and Bordeaux-variety rows, warm North Island sunlight, and river-system cues",
        overview:
          "Hawke's Bay is the New Zealand answer for Chardonnay, Merlot/Cabernet blends, Syrah, and gravel-driven red-wine structure.",
        location: "East coast of the North Island around Napier, Hastings, and inland gravel terrace zones.",
        climate: "Warm maritime to warm dry, with enough heat for Bordeaux varieties and Syrah while retaining coastal freshness.",
        soils: "River gravels, alluvial terraces, clay loams, and the highly visible Gimblett Gravels style cue.",
        white: ["Chardonnay", "Sauvignon Blanc", "Pinot Gris"],
        red: ["Merlot", "Cabernet Sauvignon", "Syrah", "Cabernet Franc", "Malbec"],
        styles: [
          "Textural Chardonnay",
          "Merlot-Cabernet blends",
          "Syrah with pepper and dark fruit",
          "Gravel-grown structured reds"
        ],
        serviceCue:
          "Use Hawke's Bay when a guest wants New Zealand beyond Sauvignon Blanc: Chardonnay, Syrah, and Bordeaux-style reds with freshness.",
        examFocus: [
          "Hawke's Bay is a North Island benchmark.",
          "It is especially important for Chardonnay and Bordeaux-style reds.",
          "Gimblett Gravels is a key service and exam term.",
          "Warmer climate separates it from Marlborough and Central Otago."
        ],
        sourceLinks: newZealandSourceLinks
      })
    ]
  },
  "south-africa": {
    category: "wine",
    countrySlug: "south-africa",
    countryName: "South Africa",
    overview:
      "South Africa's benchmark pages follow the Wine of Origin hierarchy and focus on Stellenbosch, Swartland, Walker Bay, Constantia, Chenin Blanc, Pinotage, and Bordeaux/Rhone varieties.",
    sourceNote:
      "South Africa pages use WOSA Wine of Origin guidance and production-area references, with existing Stellenbosch 360 media attached while ward-level assets remain queued.",
    subregions: [
      wineBenchmarkPage("South Africa", {
        slug: "stellenbosch",
        name: "Stellenbosch",
        parentRegion: "Coastal Region",
        classification: "Wine of Origin district within the Coastal Region.",
        examWeight: "core",
        imageUrl: "/panoramas/africa-stellenbosch-360.png",
        imageAlt: "Stellenbosch vineyard panorama",
        imageSubject:
          "Stellenbosch Cabernet and Chenin vineyards on mountain foothills with decomposed granite, ocean-influenced light, and Cape fold mountain cues",
        overview:
          "Stellenbosch is South Africa's central fine-wine exam district for Cabernet Sauvignon, Bordeaux-style blends, Chenin Blanc, and Pinotage.",
        location: "Western Cape, east of Cape Town, within the Coastal Region and surrounded by mountain foothills.",
        climate: "Mediterranean with warm dry summers, cooling ocean influence, and strong site variation by slope and exposure.",
        soils: "Decomposed granite, sandstone-derived soils, shale, and clay loams; mountain foothills and drainage are important.",
        white: ["Chenin Blanc", "Chardonnay", "Sauvignon Blanc"],
        red: ["Cabernet Sauvignon", "Merlot", "Pinotage", "Syrah", "Cabernet Franc"],
        styles: [
          "Cabernet Sauvignon and Bordeaux-style blends",
          "Chenin Blanc from fresh to barrel-textured",
          "Pinotage and Cape blends",
          "Structured Syrah"
        ],
        serviceCue:
          "Use Stellenbosch when a guest wants South African structure: Cabernet blends, savory red fruit, polished tannin, and Chenin Blanc versatility.",
        examFocus: [
          "Stellenbosch is a WO district within the Coastal Region.",
          "Cabernet Sauvignon and Bordeaux-style blends are core associations.",
          "Chenin Blanc and Pinotage remain key South African identity grapes.",
          "Mountain foothills and ocean influence explain quality variation."
        ],
        sourceLinks: southAfricaSourceLinks,
        panorama: {
          id: "south-africa-stellenbosch-subregion",
          title: "Stellenbosch Mountain Foothills",
          imageSrc: "/panoramas/africa-stellenbosch-360.png",
          imageAlt: "360 view of Stellenbosch vineyards near mountain foothills",
          copy:
            "Use the 360 view to study Stellenbosch as a source-region pattern: mountain slopes, decomposed soils, Cape light, and structured red-wine service language.",
          details: ["Cabernet Sauvignon", "Chenin Blanc", "Coastal Region", "Mountain foothills"]
        }
      }),
      wineBenchmarkPage("South Africa", {
        slug: "swartland",
        name: "Swartland",
        parentRegion: "Coastal Region",
        classification: "Wine of Origin district known for dry-farmed old vines and modern minimal-intervention producers.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Swartland,South,Africa,bush,vines",
        imageAlt: "Swartland dry-farmed bush-vine landscape",
        imageSubject:
          "dry-farmed Swartland bush vines with old Chenin and Rhone varieties, wheatland hills, granite and shale texture, and warm Cape light",
        overview:
          "Swartland is the South African page for old-vine Chenin Blanc, dry farming, Rhone varieties, and a modern quality movement away from polished classicism.",
        location: "North of Cape Town in the broader Coastal Region frame, around towns such as Malmesbury and Riebeek-Kasteel.",
        climate: "Warm dry Mediterranean climate with limited rainfall and strong need for drought-tolerant viticulture.",
        soils: "Granite, shale, iron-rich soils, and weathered materials; old bush vines and low yields are central.",
        white: ["Chenin Blanc", "Grenache Blanc", "Viognier", "Clairette", "Semillon"],
        red: ["Syrah", "Grenache", "Mourvedre", "Cinsaut", "Tinta Barocca"],
        styles: [
          "Old-vine Chenin Blanc",
          "Rhone-inspired red and white blends",
          "Dry-farmed bush-vine bottlings",
          "Textural, lower-intervention styles"
        ],
        serviceCue:
          "Use Swartland for guests interested in old vines, savory texture, Chenin Blanc, and South Africa's modern grower-producer movement.",
        examFocus: [
          "Swartland is tied to dry farming and old bush vines.",
          "Chenin Blanc is the most important white association.",
          "Syrah and Rhone varieties are major red/blend associations.",
          "It contrasts with Stellenbosch's Cabernet-led classicism."
        ],
        sourceLinks: southAfricaSourceLinks
      }),
      wineBenchmarkPage("South Africa", {
        slug: "walker-bay",
        name: "Walker Bay",
        parentRegion: "Cape South Coast",
        classification: "Wine of Origin district on the Cape South Coast, including Hemel-en-Aarde Valley context.",
        examWeight: "high",
        imageUrl: "https://source.unsplash.com/1600x900/?Walker,Bay,Hemel,en,Aarde,vineyard",
        imageAlt: "Walker Bay cool-climate vineyard landscape",
        imageSubject:
          "cool Walker Bay Pinot Noir and Chardonnay vineyards near Hemel-en-Aarde with ocean cloud, clay-shale slopes, and Cape South Coast cues",
        overview:
          "Walker Bay is South Africa's key cool-climate page for Pinot Noir and Chardonnay, especially through Hemel-en-Aarde service language.",
        location: "Cape South Coast near Hermanus, southeast of Cape Town, with strong Atlantic and Southern Ocean influence.",
        climate: "Cool maritime, windy, and cloud-influenced, with slower ripening than warmer Coastal Region districts.",
        soils: "Clay-rich shale, decomposed granite, sandstone-derived materials, and slope-specific variation.",
        white: ["Chardonnay", "Sauvignon Blanc"],
        red: ["Pinot Noir", "Syrah"],
        styles: [
          "Cool-climate Pinot Noir",
          "Chardonnay with acidity and texture",
          "Fresh Sauvignon Blanc",
          "Elegant Syrah from cooler sites"
        ],
        serviceCue:
          "Use Walker Bay when a guest wants South African freshness rather than warmth: Pinot Noir, Chardonnay, ocean influence, and finer tannin.",
        examFocus: [
          "Walker Bay is a Cape South Coast cool-climate benchmark.",
          "Hemel-en-Aarde is the key name to recognize.",
          "Pinot Noir and Chardonnay are the dominant exam associations.",
          "Ocean influence separates it from Stellenbosch and Swartland."
        ],
        sourceLinks: southAfricaSourceLinks
      })
    ]
  }
  },
  beer: {
    "united-states": {
      category: "beer",
      countrySlug: "united-states",
      countryName: "United States",
      overview:
        "United States beer sub-pages start from source geography: hop belts, malt corridors, water systems, and brewery style clusters.",
      sourceNote:
        "Beer source pages use USDA hop reporting, regional agricultural patterns, and service-exam style families. Full state-by-state brewery coverage remains queued.",
      subregions: [
        {
          slug: "yakima-valley-hop-belt",
          name: "Yakima Valley Hop Belt",
          parentRegion: "Washington / Pacific Northwest",
          classification: "Core United States hop-growing corridor rather than a protected beer appellation.",
          examWeight: "core",
          imageUrl: "https://source.unsplash.com/1600x900/?Yakima,Valley,hops,trellis",
          imageAlt: "Yakima Valley hop trellis landscape",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Yakima Valley Hop Belt",
            "United States",
            "high-trellis hop rows with irrigation lines, dry eastern Washington hills, cone texture, and harvest-ready aroma-hop study cues",
            "hop-field"
          ),
          overview:
            "Yakima Valley is the first United States beer-source subregion because it explains why American IPA and modern hop-forward beer are inseparable from Pacific Northwest agriculture.",
          location:
            "Eastern Washington, in the rain shadow of the Cascade Range, with irrigation-fed agriculture around Yakima and surrounding valley communities.",
          climate:
            "Dry growing season, warm days, cool nights, strong sunlight, and irrigation control. These conditions support consistent cone development and harvest logistics.",
          soils:
            "Alluvial valley soils and managed irrigated agricultural land. For beer study, the testable point is less soil romance and more climate, water control, trellis agriculture, and post-harvest processing.",
          grapes: {
            white: ["Aroma hops", "Bittering hops", "Pelletized hops", "Cryo/concentrated hop products", "Irrigation water"],
            red: ["American IPA", "West Coast IPA", "Hazy IPA", "Pale ale", "Fresh-hop beer"]
          },
          styles: [
            "Hop-forward American pale ale and IPA",
            "Fresh-hop seasonal beer tied to harvest timing",
            "Dry-hopped lager and modern pilsner",
            "Barrel and mixed-culture beers that use hops for balance rather than headline aroma"
          ],
          serviceCue:
            "Use Yakima as the source answer when guests ask why American IPA smells like citrus, pine, tropical fruit, resin, or modern hop intensity.",
          examFocus: [
            "Washington, Oregon, and Idaho are the core United States hop states in federal reporting.",
            "Yakima Valley is the highest-signal practical region for American hop study.",
            "Connect dry climate and irrigation to consistency and disease management.",
            "Separate hop geography from brewery geography: the beer may be brewed elsewhere using Yakima-grown hops."
          ],
          sourceLinks: [
            { label: "USDA NASS - Washington hops reports", url: "https://data.nass.usda.gov/Statistics_by_State/Washington/Publications/Hops/index.php" },
            { label: "USDA NASS - hops production charts", url: "https://www.nass.usda.gov/Charts_and_Maps/Specialty_Crops/hopsprod.php" }
          ]
        }
      ]
    }
  },
  spirits: {
    mexico: {
      category: "spirits",
      countrySlug: "mexico",
      countryName: "Mexico",
      overview:
        "Mexico spirits sub-pages begin with agave because tequila has a defined appellation and agave spirits make geography, raw material, and production choices directly testable.",
      sourceNote:
        "Tequila pages follow the Consejo Regulador del Tequila's appellation frame. Mezcal and other agave-spirit regions remain queued for deeper expansion.",
      subregions: [
        {
          slug: "jalisco-tequila",
          name: "Jalisco Tequila",
          parentRegion: "Tequila Appellation of Origin",
          classification: "DOT tequila production state and practical identity center within the legally defined tequila zone.",
          examWeight: "core",
          imageUrl: "https://source.unsplash.com/1600x900/?Jalisco,tequila,blue,agave",
          imageAlt: "Jalisco blue agave field landscape",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Jalisco Tequila",
            "Mexico",
            "blue Weber agave fields with red volcanic highland soil, jimador paths, distant agave-processing town, and clear tequila-origin study cues",
            "agave-field"
          ),
          overview:
            "Jalisco is the service anchor for tequila: the region name immediately connects blue Weber agave, legal origin, cooked-agave flavor, and the highland-versus-valley teaching contrast.",
          location:
            "Western Mexico, with tequila identity centered in Jalisco and legal production also extending into selected municipalities in neighboring states.",
          climate:
            "Warm agave-growing climate with altitude and rainfall differences between highland and valley zones. Maturity and sugar accumulation are central to quality.",
          soils:
            "Red volcanic soils are a classic highland cue; lower valley areas add different soil and ripening conditions. Exams should keep this as a service contrast, not a separate legal category.",
          grapes: {
            white: ["Blue Weber agave", "Cooked agave pina", "Fermented mosto", "Yeast", "Water"],
            red: ["Blanco tequila", "Reposado tequila", "Anejo tequila", "Extra anejo tequila", "Tequila cocktails"]
          },
          styles: [
            "Unaged blanco tequila with bright agave and pepper",
            "Reposado tequila with light oak, vanilla, and cooked agave",
            "Anejo and extra anejo with deeper barrel influence",
            "Cocktail tequila for Margarita, Paloma, and highball service"
          ],
          serviceCue:
            "When serving tequila, lead with origin and category: 100% blue agave, blanco for freshness, reposado for rounder oak, anejo for sipping and richer cocktails.",
          examFocus: [
            "Tequila is tied to a protected appellation and NOM-006-SCFI-2012.",
            "Blue Weber agave is the raw-material anchor.",
            "Jalisco is the central identity state, but the DOT also includes municipalities in other states.",
            "Aging category is a key service and exam distinction."
          ],
          sourceLinks: [
            { label: "CRT - Appellation of Origin", url: "https://www.crt.org.mx/en/appellation-of-origin/" },
            { label: "CRT - Our Tequila", url: "https://www.crt.org.mx/en/our-tequila/" }
          ]
        }
      ]
    }
  },
  coffee: {
    ethiopia: {
      category: "coffee",
      countrySlug: "ethiopia",
      countryName: "Ethiopia",
      overview:
        "Ethiopia coffee sub-pages are organized by origin names that buyers and baristas actually use: Yirgacheffe, Sidama, Guji, Harrar, Limu, Kaffa, and related highland systems.",
      sourceNote:
        "Coffee pages prioritize service-useful origin language and processing. Farm-level and washing-station traceability expansion is queued.",
      subregions: [
        {
          slug: "yirgacheffe-gedeo",
          name: "Yirgacheffe / Gedeo",
          parentRegion: "Southern Ethiopia",
          classification: "Specialty coffee origin area used in trade and service language; not a wine-style appellation.",
          examWeight: "core",
          imageUrl: "https://source.unsplash.com/1600x900/?Yirgacheffe,Ethiopia,coffee,farm",
          imageAlt: "Yirgacheffe Ethiopia coffee highland landscape",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Yirgacheffe / Gedeo",
            "Ethiopia",
            "highland coffee trees under shade with raised drying beds, red coffee cherries, misty slopes, and washed-coffee station cues",
            "coffee-origin"
          ),
          overview:
            "Yirgacheffe is the high-aroma Ethiopia benchmark for barista and buyer training: floral, citrus, tea-like washed lots and expressive naturals depending on processing.",
          location:
            "Southern Ethiopian highlands around the Gedeo zone and Yirgacheffe area, connected commercially to washing stations and smallholder cherry delivery.",
          climate:
            "High elevation, seasonal rainfall, cool nights, and shade systems support slow development and pronounced acidity.",
          soils:
            "Highland soils vary locally; for exams, altitude, shade, cultivar diversity, processing, and drying are more testable than a single soil claim.",
          grapes: {
            white: ["Arabica", "Heirloom landraces", "Washed process", "Natural process", "Raised-bed drying"],
            red: ["Floral filter coffee", "Tea-like washed coffee", "Citrus-forward espresso", "Fruit-forward natural coffee"]
          },
          styles: [
            "Washed coffee with jasmine, bergamot, lemon, and tea-like body",
            "Natural coffee with berry, tropical fruit, and winey aromatics",
            "Light to medium roast profiles that protect acidity and aroma",
            "Single-origin filter and espresso service"
          ],
          serviceCue:
            "Use Yirgacheffe when a guest wants coffee that drinks closer to aromatic tea: floral, citrusy, lifted, and clean when washed.",
          examFocus: [
            "Separate origin name from processing method.",
            "Washed Yirgacheffe is a classic floral/citrus benchmark.",
            "Natural processing can shift Ethiopia toward berry and winey fruit.",
            "Washing stations and smallholder aggregation matter for traceability language."
          ],
          sourceLinks: [
            { label: "International Coffee Organization", url: "https://ico.org/" },
            {
              label: "Kew / USDA Climate Hubs - Ethiopia coffee farming and climate",
              url: "https://www.climatehubs.usda.gov/sites/default/files/Publication-Kew%20Coffee%20Farming%20and%20Climate%20Change%20in%20Ethiopia.pdf"
            }
          ]
        }
      ]
    }
  },
  tea: {
    china: {
      category: "tea",
      countrySlug: "china",
      countryName: "China",
      overview:
        "China tea sub-pages start with Wuyi because rock oolong is an unusually clear place-processing-service study region.",
      sourceNote:
        "Tea pages use government and geographical-indication references where available, then layer service vocabulary on top.",
      subregions: [
        {
          slug: "wuyi-rock-tea",
          name: "Wuyi Rock Tea",
          parentRegion: "Fujian / Wuyishan",
          classification: "Geographical indication and cultural craft reference for rock oolong from Wuyi Mountain.",
          examWeight: "core",
          imageUrl: "https://source.unsplash.com/1600x900/?Wuyi,Mountain,tea,terraces",
          imageAlt: "Wuyi Mountain rock tea landscape",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Wuyi Rock Tea",
            "China",
            "rocky Wuyi Mountain tea gardens on Danxia cliffs with mist, narrow valleys, charcoal-roast oolong cues, and mineral terroir texture",
            "tea-garden"
          ),
          overview:
            "Wuyi Rock Tea is the tea equivalent of a terroir lesson: rocky landform, cultivar, partial oxidation, roast, and mineral service language all matter.",
          location:
            "Wuyishan in northwest Fujian Province, associated with protected mountain landscapes and historic tea craft.",
          climate:
            "Humid mountain microclimate with mist, slope exposure, and valley effects. Processing decisions are as important as garden climate for final style.",
          soils:
            "Rocky Danxia landforms and mineral-rich growing environments are central to the yancha story, especially the service cue of rock bone and floral aroma.",
          grapes: {
            white: ["Tea cultivars", "Partial oxidation", "Charcoal roast", "Gongfu brewing water", "Aged roast management"],
            red: ["Da Hong Pao", "Rou Gui", "Shui Xian", "Tie Luo Han", "Rock oolong service"]
          },
          styles: [
            "Roasted rock oolong with mineral, floral, spice, and dried-fruit notes",
            "Gongfu-style multi-infusion service",
            "High-roast versus lower-roast service contrast",
            "Origin storytelling around Wuyi Mountain craft"
          ],
          serviceCue:
            "Serve Wuyi rock tea when a guest wants depth without sweetness: mineral, roasted, floral, and structured across repeated infusions.",
          examFocus: [
            "Wuyi is in Fujian and anchors rock oolong study.",
            "Partial oxidation and roasting shape the style.",
            "Da Hong Pao, Rou Gui, and Shui Xian are useful names to recognize.",
            "Do not confuse kombucha-style fermented tea with oxidized or roasted tea production."
          ],
          sourceLinks: [
            { label: "Fujian Provincial Government - Wuyi rock tea craft", url: "https://www.fujian.gov.cn/english/cultureandtravel/cultureandarts/202508/t20250811_6989993.htm" },
            { label: "CNIPA - Wuyi rock essence tea geographical indication", url: "https://english.cnipa.gov.cn/transfer/news/localipinformation/1139497.htm" }
          ]
        }
      ]
    }
  },
  kombucha: {
    china: {
      category: "kombucha",
      countrySlug: "china",
      countryName: "China",
      overview:
        "Kombucha sub-pages use tea source, microbial culture, sugar, fermentation control, and package stability as the region-like layers because kombucha itself is not an appellation commodity.",
      sourceNote:
        "Kombucha pages distinguish historical tea-fermentation context from modern commercial production. Ingredient and facility geography should be verified separately.",
      subregions: [
        {
          slug: "sweetened-tea-fermentation-system",
          name: "Sweetened Tea Fermentation System",
          parentRegion: "China / Tea-Origin Frame",
          classification: "Fermented tea beverage source-and-process study page, not a protected origin.",
          examWeight: "medium",
          imageUrl: "https://source.unsplash.com/1600x900/?kombucha,fermentation,tea,jars",
          imageAlt: "Kombucha fermentation jars and tea ingredients",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Sweetened Tea Fermentation System",
            "China",
            "clean kombucha fermentation room with glass vessels, tea leaves, sugar, SCOBY pellicle detail, pH testing tools, and cold-chain packaging cues",
            "kombucha-fermentation"
          ),
          overview:
            "Kombucha needs a process-first page: tea base plus sugar and SCOBY create the beverage, while region mainly matters through tea sourcing, facility standards, flavoring inputs, and distribution.",
          location:
            "The origin frame points to fermented tea culture in East/Northeast Asia, while commercial kombucha production is now global and facility-driven.",
          climate:
            "Fermentation temperature, oxygen exposure, time, pH, and microbial balance are more important than outdoor climate once production moves indoors.",
          soils:
            "Soil matters indirectly through tea source and botanical flavoring inputs. Kombucha itself should be taught through substrate, culture, acidity, and packaging stability.",
          grapes: {
            white: ["Black tea", "Green tea", "Sucrose", "SCOBY", "Starter liquid", "Fruit or botanical additions"],
            red: ["Traditional kombucha", "Fruit kombucha", "Jun-style fermented tea", "Dry-hopped kombucha", "Low-alcohol kombucha"]
          },
          styles: [
            "Bright acidic black-tea kombucha",
            "Green-tea or honey-based lighter ferments",
            "Fruit-flavored secondary ferment styles",
            "Hop, herb, and botanical blends for adult non-alcoholic service"
          ],
          serviceCue:
            "Use kombucha as a tart, carbonated, lightly tannic non-alcoholic bridge; explain tea base, acidity, sweetness, and fermentation intensity before naming health claims.",
          examFocus: [
            "SCOBY means symbiotic culture of bacteria and yeast.",
            "Kombucha fermentation can produce alcohol, so commercial producers must monitor ABV.",
            "pH, time, oxygen, sugar, and temperature are the control points.",
            "Region language should identify tea source or production facility, not imply a protected kombucha appellation."
          ],
          sourceLinks: [
            { label: "PMC - Kombucha ancient fermented beverage review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9011011/" },
            { label: "PubMed - Understanding Kombucha Tea Fermentation", url: "https://pubmed.ncbi.nlm.nih.gov/29508944/" }
          ]
        }
      ]
    }
  },
  juice: {
    brasil: {
      category: "juice",
      countrySlug: "brasil",
      countryName: "Brasil",
      overview:
        "Brasil juice sub-pages start with the citrus belt because orange juice is the country's most important global juice-source study system.",
      sourceNote:
        "Juice pages use fruit-belt, processing, and export-source evidence. More fruit categories and cold-pressed service pages remain queued.",
      subregions: [
        {
          slug: "sao-paulo-citrus-belt",
          name: "Sao Paulo Citrus Belt",
          parentRegion: "Sao Paulo / West-Southwest Minas Gerais",
          classification: "Industrial orange-growing and juice-processing belt.",
          examWeight: "core",
          imageUrl: "https://source.unsplash.com/1600x900/?Sao,Paulo,orange,grove,citrus",
          imageAlt: "Sao Paulo citrus belt orange grove",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Sao Paulo Citrus Belt",
            "Brasil",
            "orderly orange groves with ripe fruit, processing plant in the distance, irrigation and harvest crates, and orange-juice source geography cues",
            "citrus-belt"
          ),
          overview:
            "The Sao Paulo citrus belt teaches juice as agriculture plus processing: fruit maturity, brix/acid balance, extraction, concentration, storage, and export logistics.",
          location:
            "Sao Paulo State and the West-Southwest Minas Gerais citrus belt, connected to large-scale orange cultivation and processing infrastructure.",
          climate:
            "Subtropical to tropical production conditions with disease pressure, rainfall variability, irrigation decisions, and harvest timing as major quality controls.",
          soils:
            "Managed citrus-grove soils vary by block. For juice study, cultivar, fruit maturity, disease management, brix, acidity, and processing are more testable than a single soil identity.",
          grapes: {
            white: ["Orange", "Citrus oil", "Pulp", "Juice solids", "Aseptic storage"],
            red: ["Not-from-concentrate juice", "Frozen concentrated orange juice", "Citrus blends", "Nectar", "Cocktail citrus prep"]
          },
          styles: [
            "NFC orange juice with fresh fruit identity",
            "Frozen concentrated orange juice for global supply chains",
            "Citrus blends for breakfast and cocktail use",
            "High-acid juice used as a non-alcoholic balancing ingredient"
          ],
          serviceCue:
            "Teach orange juice through brix, acidity, pulp, oxidation, concentration, and freshness rather than only fruit name.",
          examFocus: [
            "Sao Paulo and West-Southwest Minas Gerais form the key Brazilian citrus belt reference.",
            "Brix and acidity are core juice quality measures.",
            "NFC and FCOJ are different processing/export formats.",
            "Disease pressure and harvest timing affect supply and flavor."
          ],
          sourceLinks: [
            { label: "Fundecitrus - sustainable citriculture", url: "https://ww2.fundecitrus.com.br/sustainablecitriculture" },
            {
              label: "USDA FAS - Brazil citrus annual report",
              url: "https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Citrus+Annual_Brasilia_Brazil_BR2023-0036"
            }
          ]
        }
      ]
    }
  },
  milk: {
    "new-zealand": {
      category: "milk",
      countrySlug: "new-zealand",
      countryName: "New Zealand",
      overview:
        "New Zealand milk sub-pages begin with Waikato because it cleanly connects pasture-based dairying, seasonal milk supply, export processing, and beverage-service milk behavior.",
      sourceNote:
        "Milk pages use dairy-sector references and beverage-service application. Farm-by-farm certification and processor-specific claims remain queued.",
      subregions: [
        {
          slug: "waikato-dairy-basin",
          name: "Waikato Dairy Basin",
          parentRegion: "North Island",
          classification: "Pasture-based dairy production region and milk-source study basin.",
          examWeight: "core",
          imageUrl: "https://source.unsplash.com/1600x900/?Waikato,New,Zealand,dairy,pasture,cows",
          imageAlt: "Waikato dairy pasture landscape",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Waikato Dairy Basin",
            "New Zealand",
            "green pasture dairy farm with cows, milking shed, tanker route, rolling Waikato landscape, and milk-solids production cues",
            "dairy-source"
          ),
          overview:
            "Waikato is the first milk region page because it explains pasture, seasonality, milk solids, tanker logistics, and why milk behaves differently in coffee, tea, cultured drinks, and dairy processing.",
          location:
            "North Island New Zealand, centered around Waikato dairy country with Hamilton and surrounding pasture districts as practical gateways.",
          climate:
            "Temperate pasture-growing climate with rainfall, seasonal grass growth, and management of feed supply shaping milk production.",
          soils:
            "Pasture and drainage conditions matter through grass growth and farm system performance. Service exams should connect milk profile to fat, protein, freshness, and processing.",
          grapes: {
            white: ["Pasture milk", "Milk solids", "Cream", "Skim milk", "Whey", "Casein"],
            red: ["Whole milk", "Barista milk", "Milk powder", "Butter", "Cheese milk", "Cultured dairy"]
          },
          styles: [
            "Pasture-based fresh milk",
            "Milk powder and export ingredients",
            "Barista milk selected for steaming and foam",
            "Butter, cheese, yogurt, and cultured beverage inputs"
          ],
          serviceCue:
            "For beverage service, explain milk by fat, protein, sweetness, heat treatment, freshness, and foam stability rather than simply cow breed or country.",
          examFocus: [
            "Waikato is a key New Zealand dairy reference.",
            "Milk solids are central to dairy economics and processing.",
            "Pasture-based and seasonal systems differ from indoor year-round systems.",
            "Barista performance depends heavily on protein, fat, freshness, and heat treatment."
          ],
          sourceLinks: [
            { label: "DairyNZ - sector quickfacts", url: "https://www.dairynz.co.nz/media/012j12ye/dairynz-media-quickfacts-economics-and-markets-september-2024.pdf" },
            { label: "Te Ara - dairy farming regions", url: "https://teara.govt.nz/interactive/15713/dairy-farming-regions" }
          ]
        }
      ]
    }
  },
  water: {
    "united-states": {
      category: "water",
      countrySlug: "united-states",
      countryName: "United States",
      overview:
        "United States water sub-pages are built around source-to-flow systems: divides, basins, aquifers, and mineral pickup rather than commodity agriculture.",
      sourceNote:
        "Water pages use hydrology sources such as USGS and federal land agencies. Continental divides explain where water flows; quality and service require separate mineral and treatment data.",
      subregions: [
        {
          slug: "rocky-mountain-continental-divide",
          name: "Rocky Mountain Continental Divide",
          parentRegion: "North America / United States",
          classification: "Continental divide and watershed-flow study system.",
          examWeight: "core",
          imageUrl: "https://source.unsplash.com/1600x900/?Rocky,Mountain,Continental,Divide,headwaters",
          imageAlt: "Rocky Mountain Continental Divide headwaters",
          imageStatus: "queued",
          imagePrompt: hyperrealisticImagePrompt(
            "Rocky Mountain Continental Divide",
            "United States",
            "alpine snowpack headwaters splitting into opposite watersheds with visible ridge divide, cold stream source, granite, forest, and flow-direction study cues",
            "watershed"
          ),
          overview:
            "The Continental Divide is the cleanest way to teach water flow: precipitation falling on opposite sides of a ridge eventually moves toward different ocean basins.",
          location:
            "The North American Continental Divide runs through the Rocky Mountain system. In the United States, it crosses mountain states and separates major western and eastern drainage patterns.",
          climate:
            "Snowpack, melt timing, drought, rain-on-snow events, and seasonal runoff determine flow volume and source character.",
          soils:
            "Geology, mineral contact, aquifer recharge, and treatment determine the mineral profile. Divide position explains direction, not flavor by itself.",
          grapes: {
            white: ["Snowmelt", "Headwater streams", "Mountain aquifers", "River basins", "Municipal treatment"],
            red: ["Still water", "Sparkling water", "Brewing water", "Coffee brew water", "Mineral water service"]
          },
          styles: [
            "Pacific-bound western river systems",
            "Atlantic/Gulf-bound eastern river systems",
            "Mountain spring and aquifer source stories",
            "Technical beverage water adjusted for beer, coffee, and tea extraction"
          ],
          serviceCue:
            "For service, do not sell a divide as flavor. Use it to explain flow, then discuss TDS, hardness, alkalinity, carbonation, and treatment.",
          examFocus: [
            "A continental divide separates drainage basins.",
            "USGS describes the divide as separating major watersheds flowing to different oceans.",
            "Forest Service material connects Divide flows to rivers including Columbia, Colorado, Missouri, Mississippi, and Rio Grande.",
            "Minerality must be verified with source or analysis data."
          ],
          sourceLinks: [
            { label: "USGS - Continental Divide map", url: "https://www.usgs.gov/media/images/map-continental-divide-north-america" },
            { label: "USDA Forest Service - Continental Divide Trail water flows", url: "https://www.fs.usda.gov/managing-land/trails/cdt/about-the-trail" }
          ]
        }
      ]
    }
  }
};

export function getCountrySubregionGuide(category: RegionBeverageCategoryId, countrySlug: string): CountrySubregionGuide | null {
  return countrySubregionGuides[category]?.[countrySlug] ?? null;
}

export function getSubregionStudyPage(
  category: RegionBeverageCategoryId,
  countrySlug: string,
  subregionSlug: string | null | undefined
): SubregionStudyPage | null {
  if (!subregionSlug) return null;
  const guide = getCountrySubregionGuide(category, countrySlug);
  return guide?.subregions.find((subregion) => subregion.slug === subregionSlug) ?? null;
}
