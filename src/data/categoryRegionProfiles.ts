import type { CountryProfile, RegionBeverageCategoryId } from "./regions";

type CommodityCategoryId = Exclude<RegionBeverageCategoryId, "wine">;

type CommodityProfileInput = {
  overview: string;
  imageQuery: string;
  location: string;
  sourceConditions: string;
  primary: string[];
  secondary: string[];
  productionStyle: string;
  servingStyle: string;
  regulations: string;
  terminology: string[];
  resources: Array<{ label: string; url: string }>;
  nearbyTowns: string[];
  regions: Array<{ region: string; iconicVineyard: string; imageQuery: string }>;
};

const imageUrl = (query: string): string => `https://source.unsplash.com/1600x900/?${encodeURIComponent(query)}`;

const commodityProfile = (input: CommodityProfileInput): CountryProfile => ({
  winesOverview: input.overview,
  countryImageUrl: imageUrl(input.imageQuery),
  location: input.location,
  terroir: input.sourceConditions,
  whiteGrapes: input.primary,
  redGrapes: input.secondary,
  productionStyle: input.productionStyle,
  servingStyle: input.servingStyle,
  regulations: input.regulations,
  terminology: input.terminology,
  resources: input.resources,
  nearbyTowns: input.nearbyTowns,
  majorRegions: input.regions.map((region) => ({
    region: region.region,
    iconicVineyard: region.iconicVineyard,
    imageUrl: imageUrl(region.imageQuery)
  }))
});

export const categoryCountryProfiles = {
  beer: {
    "united-states": commodityProfile({
      overview:
        "The United States beer study map starts with raw-material geography: Pacific Northwest hops, barley and malt corridors, brewing water, and regional style ecosystems from lager to IPA.",
      imageQuery: "Yakima Valley hop field brewery landscape",
      location:
        "Production knowledge is layered by agricultural source first, then brewery concentration. The highest-value exam corridor is Washington, Oregon, and Idaho for hops, with Great Lakes, Northeast, Colorado, California, and Mid-Atlantic brewing clusters layered on top.",
      sourceConditions:
        "Hops need long summer daylight, irrigation control, trellis systems, and dry harvest weather. Malt barley quality follows protein, kernel size, modification potential, and regional drying/storage logistics.",
      primary: ["Yakima Valley hops", "Pacific Northwest aroma hops", "Two-row barley malt", "Adjunct grains", "Brewing water chemistry"],
      secondary: ["American IPA", "Pale ale", "Lager", "Stout and porter", "Mixed-culture sour beer", "Barrel-aged strong beer"],
      productionStyle:
        "The technical pattern is ingredient-driven: high-impact hop selection, clean ale and lager fermentation, water-profile adjustment, dry hopping, barrel programs, and packaging oxygen control.",
      servingStyle:
        "Teach beer service by freshness, carbonation, glassware, draft hygiene, foam, temperature, and style-specific aroma protection.",
      regulations:
        "Beer labeling and production move through federal alcohol rules plus state alcohol control systems. Ingredient geography itself is not an appellation system, so source claims need clear supplier or farm support.",
      terminology: ["IBU", "SRM", "ABV", "Original Gravity", "Dry Hop", "Terroir Hops", "Draft Line Balance", "Diacetyl"],
      resources: [
        { label: "USDA NASS - Washington hops reports", url: "https://data.nass.usda.gov/Statistics_by_State/Washington/Publications/Hops/index.php" },
        { label: "USDA NASS - hops production charts", url: "https://www.nass.usda.gov/Charts_and_Maps/Specialty_Crops/hopsprod.php" }
      ],
      nearbyTowns: ["Yakima", "Portland", "Bend", "Denver", "Grand Rapids", "San Diego"],
      regions: [
        { region: "Yakima Valley Hop Belt", iconicVineyard: "High-trellis aroma-hop farms", imageQuery: "Yakima Valley hops trellis harvest" },
        { region: "Willamette Valley Beer Corridor", iconicVineyard: "Hop yards and farmhouse brewery routes", imageQuery: "Oregon hops field brewery" },
        { region: "Great Lakes Brewing Belt", iconicVineyard: "Malt-forward lager and ale cities", imageQuery: "Great Lakes craft brewery tanks" },
        { region: "Colorado Front Range", iconicVineyard: "High-altitude brewery and water-profile study zone", imageQuery: "Colorado brewery mountains" }
      ]
    }),
    germany: commodityProfile({
      overview:
        "Germany gives beer study a legal, historical, and service benchmark: lager precision, wheat beer, regional draft culture, and hop or malt geography tied to Bavaria, Franconia, Cologne, Duesseldorf, and Berlin.",
      imageQuery: "Bavaria Germany hop field brewery lager",
      location:
        "Study Germany by classic regional service ecosystems: Bavaria for lager and wheat beer, Franconia for small breweries, Cologne and Duesseldorf for top-fermented city styles, and Berlin/Leipzig for sour and mixed traditions.",
      sourceConditions:
        "Quality depends on barley malt, noble hops, yeast management, water chemistry, cool fermentation, lagering time, and strict freshness in draft service.",
      primary: ["Barley malt", "Wheat malt", "Hallertau hops", "Spalt hops", "Tettnang hops", "Brewing water"],
      secondary: ["Pils", "Helles", "Weissbier", "Dunkel", "Koelsch", "Altbier", "Berliner Weisse", "Bock"],
      productionStyle:
        "The technical pattern is clean fermentation, precise lagering, restrained hopping, yeast-driven wheat-beer aromatics, and regional service rules that define glassware and pour.",
      servingStyle:
        "Serve German beer by style and locality: pils crisp and cold, wheat beer in tall glassware with yeast aroma, Koelsch in small repeated pours, and stronger bocks slightly warmer.",
      regulations:
        "German beer identity is shaped by beer-tax law, ingredient tradition, protected regional names such as Koelsch, and EU geographical indication tools where applicable.",
      terminology: ["Reinheitsgebot", "Stammwuerze", "Lagering", "Kraeusen", "Hefe", "Kellerbier", "Koelsch", "Altbier"],
      resources: [
        { label: "German Brewers Association", url: "https://www.brauer-bund.de/" },
        { label: "European Commission - Koelsch PGI listing", url: "https://ec.europa.eu/geographical-indications-register/" }
      ],
      nearbyTowns: ["Munich", "Bamberg", "Cologne", "Duesseldorf", "Berlin", "Leipzig"],
      regions: [
        { region: "Bavarian Lager and Wheat Belt", iconicVineyard: "Helles, dunkel, bock, and weissbier service culture", imageQuery: "Bavaria lager brewery wheat beer hall" },
        { region: "Hallertau Hop Country", iconicVineyard: "Noble-hop trellis agriculture", imageQuery: "Hallertau Germany hop fields" },
        { region: "Franconian Kellerbier Route", iconicVineyard: "Small breweries and cellar beer service", imageQuery: "Franconia kellerbier brewery cellar" },
        { region: "Rhine Top-Fermentation Cities", iconicVineyard: "Cologne Koelsch and Duesseldorf Altbier service", imageQuery: "Cologne Duesseldorf beer brewery" }
      ]
    }),
    "czech-republic": commodityProfile({
      overview:
        "The Czech Republic is the pale lager benchmark: Pilsen, soft water, Saaz hops, decoction mashing, foam, and pub-service freshness make it a high-value beer study country.",
      imageQuery: "Czech Republic Saaz hops Pilsner brewery",
      location:
        "The first layer is Bohemia: Pilsen for pale lager identity, Zatec/Saaz for hops, Prague for service culture, and South Moravia as an added brewing and agricultural context.",
      sourceConditions:
        "Soft brewing water, pale malt, Saaz hops, cool fermentation, lagering, and foam-positive service shape the sensory model.",
      primary: ["Pale malt", "Saaz hops", "Soft water", "Lager yeast", "Decoction mash"],
      secondary: ["Czech pale lager", "Svetly lezak", "Tmave pivo", "Amber lager", "Pub tank beer"],
      productionStyle:
        "Czech brewing emphasizes malt depth, moderate bitterness, extended lagering, and service systems that protect freshness from brewery to pub tank.",
      servingStyle:
        "Teach Czech service through foam, side-pull taps, freshness, bitterness balance, and pour styles that change texture and aroma.",
      regulations:
        "Czech beer uses national style terms and protected regional/product names; source claims around hops should be tied to named suppliers or regions.",
      terminology: ["Svetly", "Lezak", "Vycepni", "Tmave", "Saaz", "Decoction", "Hladinka", "Mliko"],
      resources: [
        { label: "Czech Beer and Malt Association", url: "https://ceske-pivo.cz/" },
        { label: "Hop Growers Union of the Czech Republic", url: "https://www.czhops.cz/" }
      ],
      nearbyTowns: ["Pilsen", "Prague", "Zatec", "Ceske Budejovice", "Brno"],
      regions: [
        { region: "Pilsen Pale Lager Core", iconicVineyard: "Historic pale lager brewery city", imageQuery: "Pilsen Czech Republic brewery lager" },
        { region: "Zatec Saaz Hop Belt", iconicVineyard: "Fine-aroma hop fields", imageQuery: "Zatec Saaz hops Czech Republic" },
        { region: "Prague Pub Service Corridor", iconicVineyard: "Side-pull draft and tank beer culture", imageQuery: "Prague Czech beer pub tap" },
        { region: "South Bohemia Brewing Zone", iconicVineyard: "Malt-forward lager production towns", imageQuery: "South Bohemia brewery lager" }
      ]
    }),
    belgium: commodityProfile({
      overview:
        "Belgium teaches beer through fermentation families: abbey and Trappist ales, lambic and gueuze, saison, strong golden ale, witbier, and city or countryside service traditions.",
      imageQuery: "Belgium lambic brewery barrels abbey beer",
      location:
        "Layer Belgium by beer family and place: Pajottenland/Brussels for lambic, Flanders for mixed-fermentation reds and browns, Wallonia for saison, and monastic/abbey routes across regions.",
      sourceConditions:
        "Beer identity follows mixed cultures, house yeast, oak, cereal bills, hops, spice, aging environment, bottle conditioning, and brewery-specific blending practice.",
      primary: ["Barley malt", "Wheat", "Aged hops", "House yeast", "Mixed cultures", "Candi sugar"],
      secondary: ["Lambic", "Gueuze", "Saison", "Dubbel", "Tripel", "Belgian strong ale", "Witbier"],
      productionStyle:
        "The technical pattern is fermentation-led: expressive yeast, bottle conditioning, spontaneous or mixed fermentation, oak aging, blending, and high carbonation.",
      servingStyle:
        "Serve Belgian beer by glass, carbonation, yeast sediment, age, and food pairing; avoid treating all Belgian ale as sweet or high alcohol.",
      regulations:
        "Belgian beer includes protected traditions and EU-recognized specialty terms, while Trappist labeling follows separate monastic association standards.",
      terminology: ["Lambic", "Gueuze", "Kriek", "Saison", "Trappist", "Abbey", "Bottle Conditioned", "Mixed Fermentation"],
      resources: [
        { label: "Belgian Brewers", url: "https://belgianbrewers.be/" },
        { label: "International Trappist Association", url: "https://www.trappist.be/" }
      ],
      nearbyTowns: ["Brussels", "Leuven", "Bruges", "Antwerp", "Namur"],
      regions: [
        { region: "Pajottenland Lambic Belt", iconicVineyard: "Spontaneous-fermentation breweries and blending cellars", imageQuery: "Pajottenland lambic brewery barrels" },
        { region: "Flanders Mixed-Fermentation Zone", iconicVineyard: "Oak-aged red and brown ale cellars", imageQuery: "Flanders red ale brewery foeders" },
        { region: "Wallonia Saison Country", iconicVineyard: "Farmhouse ale brewing landscape", imageQuery: "Wallonia saison farmhouse brewery" },
        { region: "Abbey and Trappist Routes", iconicVineyard: "Monastic strong-ale service traditions", imageQuery: "Belgium abbey beer monastery brewery" }
      ]
    })
  },
  spirits: {
    mexico: commodityProfile({
      overview:
        "Mexico's spirits map is led by agave geography. Tequila is the exam anchor because its appellation is legally defined, regionally bounded, and tied to blue agave, while mezcal expands the agave study model.",
      imageQuery: "Jalisco blue agave field tequila highlands",
      location:
        "Tequila production is legally tied to municipalities in Jalisco, Michoacan, Guanajuato, Nayarit, and Tamaulipas, with Jalisco as the practical service and identity anchor.",
      sourceConditions:
        "Agave quality follows altitude, rainfall, maturity, sugar accumulation, soil drainage, and cooking method. Highland and valley discussions are useful service shortcuts but must not replace the legal DOT frame.",
      primary: ["Blue Weber agave", "Espadin agave", "Cooked agave", "Fermented mosto", "Volcanic and red soils"],
      secondary: ["Blanco tequila", "Reposado tequila", "Anejo tequila", "Extra anejo tequila", "Mezcal joven", "Agave spirits cocktails"],
      productionStyle:
        "Core tequila production moves from mature agave harvest to cooking, extraction, fermentation, distillation, and optional maturation. Exam contrast often centers on autoclave/oven/diffuser choices and barrel aging.",
      servingStyle:
        "Serve neat premium tequila in small tulip glassware, use blanco for bright citrus cocktails, and connect aged tequila to oak, vanilla, spice, and cooked-agave sweetness.",
      regulations:
        "Tequila is governed by the Tequila Appellation of Origin and NOM-006-SCFI-2012, with conformity assessment by the Consejo Regulador del Tequila.",
      terminology: ["DOT", "NOM", "CRT", "Blue Weber", "Jima", "Pina", "Mosto", "Tahona"],
      resources: [
        { label: "Consejo Regulador del Tequila - Appellation of Origin", url: "https://www.crt.org.mx/en/appellation-of-origin/" },
        { label: "Consejo Regulador del Tequila - Our Tequila", url: "https://www.crt.org.mx/en/our-tequila/" }
      ],
      nearbyTowns: ["Tequila", "Guadalajara", "Arandas", "Atotonilco el Alto", "Tepatitlan"],
      regions: [
        { region: "Tequila Valley", iconicVineyard: "Lowland blue-agave fields near Tequila", imageQuery: "Tequila Valley Jalisco blue agave" },
        { region: "Los Altos de Jalisco", iconicVineyard: "Highland red-soil agave fields", imageQuery: "Los Altos Jalisco agave red soil" },
        { region: "Nayarit DOT Municipalities", iconicVineyard: "Pacific-influenced agave extension zone", imageQuery: "Nayarit agave field" },
        { region: "Michoacan DOT Municipalities", iconicVineyard: "Western Mexican agave production corridor", imageQuery: "Michoacan agave landscape" }
      ]
    }),
    france: commodityProfile({
      overview:
        "France is the spirits study anchor for protected wine- and fruit-based distillates: Cognac, Armagnac, Calvados, Martinique rhum agricole, and regional liqueur traditions.",
      imageQuery: "Cognac France vineyard copper pot still cellar",
      location:
        "Start with western France for Cognac and Armagnac, Normandy for Calvados, the Caribbean overseas department frame for Martinique rhum agricole, and alpine or monastic liqueur regions as service extensions.",
      sourceConditions:
        "Raw material and origin rules drive style: grapes for brandy, apples and pears for Calvados, sugarcane juice for agricole rum, and botanicals for liqueurs.",
      primary: ["Ugni Blanc wine", "Baco and Folle Blanche", "Apples", "Pears", "Sugarcane juice", "Botanicals"],
      secondary: ["Cognac", "Armagnac", "Calvados", "Rhum agricole", "Eau-de-vie", "Liqueurs"],
      productionStyle:
        "Study method by category: double pot distillation for Cognac, Armagnac alembic traditions, cider distillation for Calvados, cane-juice fermentation for agricole, and maceration/distillation for liqueurs.",
      servingStyle:
        "Serve French spirits by age, glassware, dilution, cocktail use, and digestive context; explain grape or fruit source before barrel age shorthand.",
      regulations:
        "Major French spirits are protected by AOC, GI, or category rules that define geography, raw material, distillation, maturation, and labeling.",
      terminology: ["AOC", "Cru", "Alambic", "Eau-de-vie", "VS", "VSOP", "XO", "Rancio"],
      resources: [
        { label: "Bureau National Interprofessionnel du Cognac", url: "https://www.cognac.fr/" },
        { label: "Armagnac official site", url: "https://www.armagnac.fr/" },
        { label: "IDAC - Calvados and Normandy cider spirits", url: "https://www.idac-aoc.fr/" }
      ],
      nearbyTowns: ["Cognac", "Jarnac", "Eauze", "Bayeux", "Fort-de-France", "Voiron"],
      regions: [
        { region: "Cognac Charentes Crus", iconicVineyard: "Grape brandy vineyards and pot still houses", imageQuery: "Cognac Charentes vineyards pot still" },
        { region: "Armagnac Gascony Basins", iconicVineyard: "Armagnac vineyards and continuous still cellars", imageQuery: "Armagnac Gascony vineyards alembic" },
        { region: "Normandy Calvados Orchards", iconicVineyard: "Apple and pear orchards for cider brandy", imageQuery: "Normandy Calvados apple orchards distillery" },
        { region: "Martinique Agricole Cane Zone", iconicVineyard: "Fresh cane juice rum distilleries", imageQuery: "Martinique rhum agricole sugarcane distillery" }
      ]
    }),
    "united-kingdom": commodityProfile({
      overview:
        "The United Kingdom spirits map is led by Scotch whisky, then gin, English whisky, and historic rum or fortified blending contexts. Scotland provides the exam region grid.",
      imageQuery: "Scotland whisky distillery copper still Highlands",
      location:
        "Use Scotland's whisky regions first: Highlands, Speyside, Islay, Lowlands, and Campbeltown. Add London and England for gin and new whisky production.",
      sourceConditions:
        "Spirit character follows barley, peat, water, yeast, still shape, cut points, cask type, warehouse climate, and blending decisions.",
      primary: ["Malted barley", "Peat smoke", "Water", "Yeast", "Oak casks", "Botanicals"],
      secondary: ["Single malt Scotch", "Blended Scotch", "Peated whisky", "London dry gin", "English whisky", "Sloe gin"],
      productionStyle:
        "Scotch study moves from malting and mashing to fermentation, pot distillation, oak maturation, blending, and bottling strength; gin centers on neutral spirit and botanical distillation.",
      servingStyle:
        "Teach neat whisky with optional water, highballs for lighter service, and gin through botanical profile, tonic choice, garnish, and dilution.",
      regulations:
        "Scotch whisky is protected by UK regulations and GI systems; gin has category rules around predominant juniper flavor and production method.",
      terminology: ["Single Malt", "Blended Scotch", "Peat", "Maltings", "Spirit Still", "Angel's Share", "Cask Strength", "London Dry"],
      resources: [
        { label: "Scotch Whisky Association", url: "https://www.scotch-whisky.org.uk/" },
        { label: "UK government - Scotch Whisky Regulations", url: "https://www.legislation.gov.uk/uksi/2009/2890/contents" }
      ],
      nearbyTowns: ["Edinburgh", "Glasgow", "Dufftown", "Port Ellen", "Campbeltown", "London"],
      regions: [
        { region: "Speyside Malt Corridor", iconicVineyard: "Dense concentration of fruity single malt distilleries", imageQuery: "Speyside Scotland whisky distillery barley" },
        { region: "Islay Peat Coast", iconicVineyard: "Peated island whisky distilleries", imageQuery: "Islay Scotland whisky distillery peat coast" },
        { region: "Highland Whisky Region", iconicVineyard: "Broad mountain and coastal malt geography", imageQuery: "Highland Scotland whisky distillery mountains" },
        { region: "London Gin Production Frame", iconicVineyard: "Juniper-led botanical distillation service context", imageQuery: "London gin distillery botanicals" }
      ]
    }),
    "united-states": commodityProfile({
      overview:
        "United States spirits study is led by whiskey: bourbon, rye, Tennessee whiskey, American single malt, and craft distilling, with agave, brandy, and rum as growing extensions.",
      imageQuery: "Kentucky bourbon distillery rickhouse corn fields",
      location:
        "Kentucky is the bourbon anchor, Tennessee adds charcoal mellowing identity, the Pacific Northwest and Southwest add American single malt and agave spirits, and California anchors brandy and fruit distilling.",
      sourceConditions:
        "Corn, rye, barley malt, water, yeast, barrel char, warehouse climate, and state-by-state production culture shape the study model.",
      primary: ["Corn", "Rye", "Malted barley", "Charred oak barrels", "Limestone water", "Yeast"],
      secondary: ["Bourbon", "Rye whiskey", "Tennessee whiskey", "American single malt", "Apple brandy", "Craft gin"],
      productionStyle:
        "The technical pattern is mash bill, fermentation, distillation proof, new charred oak maturation for bourbon and rye, warehouse placement, blending, and proofing.",
      servingStyle:
        "Serve American whiskey neat, with water, over ice, or in cocktails; use mash bill, proof, barrel, and age to guide guest expectations.",
      regulations:
        "TTB standards define bourbon, rye whiskey, straight whiskey, bonded whiskey, and related label terms. State identity does not replace federal class/type rules.",
      terminology: ["Mash Bill", "Sour Mash", "Straight Whiskey", "Bottled in Bond", "Char Level", "Rickhouse", "Proof", "Small Batch"],
      resources: [
        { label: "TTB - Distilled spirits beverage alcohol manual", url: "https://www.ttb.gov/distilled-spirits/beverage-alcohol-manual-bam" },
        { label: "Kentucky Distillers' Association", url: "https://kybourbon.com/" }
      ],
      nearbyTowns: ["Louisville", "Bardstown", "Lexington", "Nashville", "Seattle", "Santa Fe"],
      regions: [
        { region: "Kentucky Bourbon Belt", iconicVineyard: "Corn whiskey rickhouses and limestone-water production", imageQuery: "Kentucky bourbon distillery rickhouse" },
        { region: "Tennessee Whiskey Corridor", iconicVineyard: "Charcoal mellowing and sour-mash identity", imageQuery: "Tennessee whiskey distillery barrels" },
        { region: "Pacific Northwest Single Malt", iconicVineyard: "Barley, malt, and cool-climate maturation", imageQuery: "Pacific Northwest whiskey distillery barley" },
        { region: "Southwest Agave Spirits Zone", iconicVineyard: "American agave and desert distilling experiments", imageQuery: "Southwest agave spirits distillery" }
      ]
    }),
    japan: commodityProfile({
      overview:
        "Japan spirits study centers on whisky, shochu, awamori, sake-adjacent distillation, and highball service, with production precision and water source as recurring themes.",
      imageQuery: "Japan whisky distillery copper pot still mountains",
      location:
        "Key zones include Yamazaki near Kyoto/Osaka, Hakushu in mountain forest, Yoichi in Hokkaido, Kyushu for shochu, and Okinawa for awamori.",
      sourceConditions:
        "Water, malt, grain, koji, fermentation control, pot-still design, cask policy, and humid or cool maturation sites shape category identity.",
      primary: ["Malted barley", "Grain spirit", "Koji", "Sweet potato", "Barley shochu", "Rice"],
      secondary: ["Japanese whisky", "Mizuwari", "Highball", "Shochu", "Awamori", "Umeshu"],
      productionStyle:
        "Whisky follows malt and grain distillation with careful blending; shochu and awamori add koji saccharification, single or multiple distillation, and raw-material identity.",
      servingStyle:
        "Teach Japanese spirits through highball dilution, mizuwari, oyuwari for shochu, food pairing, and subtle aroma preservation.",
      regulations:
        "Japanese whisky labeling standards are industry-led, while shochu and awamori follow Japanese category and tax-law definitions.",
      terminology: ["Mizuwari", "Highball", "Koji", "Honkaku Shochu", "Awamori", "Malt Whisky", "Grain Whisky", "Blending"],
      resources: [
        { label: "Japan Spirits and Liqueurs Makers Association", url: "https://www.yoshu.or.jp/en/" },
        { label: "Japan Sake and Shochu Makers Association", url: "https://japansake.or.jp/sake/en/" }
      ],
      nearbyTowns: ["Kyoto", "Osaka", "Kofu", "Sapporo", "Kagoshima", "Naha"],
      regions: [
        { region: "Yamazaki Whisky Basin", iconicVineyard: "Water-source and blending benchmark near Kyoto", imageQuery: "Yamazaki Japan whisky distillery" },
        { region: "Hakushu Mountain Distilling Zone", iconicVineyard: "Forest water and highland maturation", imageQuery: "Hakushu Japan whisky forest distillery" },
        { region: "Kyushu Shochu Belt", iconicVineyard: "Koji-led sweet potato, barley, and rice spirits", imageQuery: "Kyushu shochu distillery koji" },
        { region: "Okinawa Awamori Islands", iconicVineyard: "Rice spirit and island maturation traditions", imageQuery: "Okinawa awamori distillery jars" }
      ]
    })
  },
  coffee: {
    ethiopia: commodityProfile({
      overview:
        "Ethiopia is the origin-country benchmark for Arabica study, with region names such as Yirgacheffe, Sidama, Guji, Harrar, Limu, and Kaffa used as service shorthand for cup profile and processing.",
      imageQuery: "Ethiopia coffee highlands coffee trees",
      location:
        "Coffee study begins in the Ethiopian highlands, especially southern and southwestern producing zones where altitude, smallholder systems, forest coffee history, and washing-station structure define buying language.",
      sourceConditions:
        "Altitude, shade, rainfall timing, heirloom genetics, processing method, and drying control drive the sensory split between floral washed coffees and fruit-forward naturals.",
      primary: ["Arabica", "Heirloom landraces", "Washed process", "Natural process", "Honey-style experiments"],
      secondary: ["Yirgacheffe floral filter", "Sidama natural", "Guji washed and natural", "Harrar dry-process coffee", "Limu balanced washed coffee"],
      productionStyle:
        "Smallholder cherry aggregation, washing-station sorting, fermentation control, raised-bed drying, and export grading are the main operational concepts.",
      servingStyle:
        "Use Ethiopia for high-aroma filter service: jasmine, citrus, bergamot, blueberry, stone fruit, tea-like body, and vivid acidity depending on region and process.",
      regulations:
        "Quality language is shaped by export grading, regional designation, and traceability through cooperative, washing-station, or estate channels rather than an appellation model like wine.",
      terminology: ["Heirloom", "Washing Station", "Natural Process", "Raised Beds", "ECX", "Grade 1", "Kaffa", "Yirgacheffe"],
      resources: [
        { label: "International Coffee Organization", url: "https://ico.org/" },
        {
          label: "Kew / USDA Climate Hubs - Coffee farming and climate change in Ethiopia",
          url: "https://www.climatehubs.usda.gov/sites/default/files/Publication-Kew%20Coffee%20Farming%20and%20Climate%20Change%20in%20Ethiopia.pdf"
        }
      ],
      nearbyTowns: ["Addis Ababa", "Hawassa", "Dilla", "Yirgacheffe", "Jimma", "Harar"],
      regions: [
        { region: "Yirgacheffe / Gedeo", iconicVineyard: "Floral highland washed-coffee corridor", imageQuery: "Yirgacheffe Ethiopia coffee farm highlands" },
        { region: "Sidama", iconicVineyard: "Washed and natural specialty coffee zone", imageQuery: "Sidama Ethiopia coffee drying beds" },
        { region: "Guji", iconicVineyard: "High-altitude fruit-forward coffee area", imageQuery: "Guji Ethiopia coffee mountains" },
        { region: "Kaffa", iconicVineyard: "Forest coffee origin landscape", imageQuery: "Kaffa Ethiopia forest coffee" }
      ]
    }),
    brasil: commodityProfile({
      overview:
        "Brasil is the global coffee volume anchor and a service benchmark for nutty, chocolatey, lower-acid Arabica, plus conilon/robusta and large-scale processing systems.",
      imageQuery: "Minas Gerais Brazil coffee farm drying patio",
      location:
        "Study Minas Gerais first, then Sao Paulo, Espirito Santo, Bahia, and Parana. The exam frame is regional scale, altitude, mechanical harvest, and processing style.",
      sourceConditions:
        "Coffee quality follows altitude, dry harvest weather, cultivar, patio or mechanical drying, pulped-natural processing, farm scale, and sorting precision.",
      primary: ["Arabica", "Conilon", "Natural process", "Pulped natural", "Drying patios", "Mechanical harvest"],
      secondary: ["Chocolate espresso base", "Nutty filter coffee", "Natural Brazil", "Pulped natural Brazil", "Robusta/conilon blends"],
      productionStyle:
        "Brasil production often uses large farms, selective and mechanical harvest, natural or pulped-natural processing, patio or raised-bed drying, and export lot grading.",
      servingStyle:
        "Use Brazil for espresso body, chocolate, peanut, caramel, and low-to-medium acidity; call out process before treating the country as one flavor.",
      regulations:
        "Coffee is traded through quality grading, regional identity, farm traceability, and cooperative/export channels rather than one national appellation system.",
      terminology: ["Cerrado Mineiro", "Pulped Natural", "Natural Process", "Conilon", "Screen Size", "NY 2/3", "Moka", "Patio Drying"],
      resources: [
        { label: "Brazil Coffee Nation", url: "https://brazilcoffeenation.com.br/" },
        { label: "BSCA - Brazil Specialty Coffee Association", url: "https://bsca.com.br/" }
      ],
      nearbyTowns: ["Belo Horizonte", "Patrocinio", "Varginha", "Sao Paulo", "Vitoria", "Barreiras"],
      regions: [
        { region: "Sul de Minas", iconicVineyard: "Classic Minas Gerais coffee hills", imageQuery: "Sul de Minas Brazil coffee farm" },
        { region: "Cerrado Mineiro", iconicVineyard: "Dry-season specialty coffee plateau", imageQuery: "Cerrado Mineiro coffee farm Brazil" },
        { region: "Mogiana", iconicVineyard: "Sao Paulo and Minas border coffee corridor", imageQuery: "Mogiana Brazil coffee farm" },
        { region: "Espirito Santo Conilon Belt", iconicVineyard: "Robusta/conilon source region", imageQuery: "Espirito Santo conilon coffee farm" }
      ]
    }),
    colombia: commodityProfile({
      overview:
        "Colombia is the washed-Arabica benchmark: mountain departments, smallholder farms, wet processing, and regional harvest calendars make it a core coffee study country.",
      imageQuery: "Colombia coffee farm Andes washed coffee",
      location:
        "Layer Colombia by Andean departments: Huila, Antioquia, Tolima, Cauca, Nariño, and the Coffee Cultural Landscape around Caldas, Quindio, and Risaralda.",
      sourceConditions:
        "Altitude, volcanic soils, rainfall, shade, cultivar, wet milling, fermentation, and drying shape Colombian cup profile and lot quality.",
      primary: ["Arabica", "Washed process", "Caturra", "Castillo", "Typica", "Fermentation tanks"],
      secondary: ["Balanced washed coffee", "Bright Huila filter", "Structured Nariño", "Sweet Antioquia espresso", "Microlot coffee"],
      productionStyle:
        "Typical production uses selective hand picking, depulping, fermentation, washing, drying, parchment storage, and cooperative or exporter grading.",
      servingStyle:
        "Use Colombia for clean sweetness, medium body, citrus or red fruit acidity, caramel, and approachable single-origin espresso or filter service.",
      regulations:
        "Colombian coffee identity is supported by national federation systems, geographical indications, and producer traceability programs.",
      terminology: ["Washed Arabica", "Pergamino", "Excelso", "Supremo", "Finca", "Federacion", "Microlot", "Fermentation"],
      resources: [
        { label: "Colombian Coffee Growers Federation", url: "https://federaciondecafeteros.org/" },
        { label: "Café de Colombia", url: "https://www.cafedecolombia.com/" }
      ],
      nearbyTowns: ["Bogota", "Medellin", "Pitalito", "Popayan", "Pasto", "Manizales"],
      regions: [
        { region: "Huila Specialty Corridor", iconicVineyard: "High-altitude washed coffee farms", imageQuery: "Huila Colombia coffee farm mountains" },
        { region: "Nariño High Andes", iconicVineyard: "Very high-elevation coffee slopes", imageQuery: "Narino Colombia coffee Andes" },
        { region: "Antioquia Coffee Hills", iconicVineyard: "Classic smallholder washed coffee region", imageQuery: "Antioquia Colombia coffee farm" },
        { region: "Coffee Cultural Landscape", iconicVineyard: "Caldas Quindio Risaralda coffee towns", imageQuery: "Colombia coffee cultural landscape farm" }
      ]
    }),
    kenya: commodityProfile({
      overview:
        "Kenya is the acidity and auction-quality benchmark, famous for SL varieties, washed processing, grading language, and blackcurrant-like cup profiles.",
      imageQuery: "Kenya coffee farm Mount Kenya washing station",
      location:
        "Study central highland coffee first: Nyeri, Kirinyaga, Kiambu, Murang'a, Embu, and Meru, with western regions adding broader production context.",
      sourceConditions:
        "High elevation, volcanic soils, rainfall pattern, SL genetics, cooperative wet mills, fermentation, washing, soaking, and raised-bed drying shape cup intensity.",
      primary: ["Arabica", "SL28", "SL34", "Ruiru 11", "Batian", "Washed process"],
      secondary: ["Kenya AA", "Blackcurrant filter", "Bright espresso", "Peaberry lots", "Auction lots"],
      productionStyle:
        "Kenyan production often moves through cooperative factories, meticulous wet processing, soaking, raised-bed drying, screen grading, and auction or direct-trade sale.",
      servingStyle:
        "Use Kenya when guests want vivid acidity, blackcurrant, grapefruit, tomato leaf, winey structure, and a clean filter profile.",
      regulations:
        "Quality language uses screen grade, factory/cooperative identity, auction or direct-sale traceability, and national coffee regulatory frameworks.",
      terminology: ["AA", "AB", "PB", "Factory", "Cooperative", "SL28", "SL34", "Soaking"],
      resources: [
        { label: "Agriculture and Food Authority Kenya - Coffee Directorate", url: "https://coffee.agricultureauthority.go.ke/" },
        { label: "International Coffee Organization", url: "https://ico.org/" }
      ],
      nearbyTowns: ["Nairobi", "Nyeri", "Kerugoya", "Thika", "Embu", "Meru"],
      regions: [
        { region: "Nyeri Coffee Highlands", iconicVineyard: "Bright washed coffees near Mount Kenya", imageQuery: "Nyeri Kenya coffee farm" },
        { region: "Kirinyaga Factory Belt", iconicVineyard: "Cooperative wet mills and raised beds", imageQuery: "Kirinyaga Kenya coffee drying beds" },
        { region: "Kiambu Coffee Estates", iconicVineyard: "Historic central Kenya coffee estates", imageQuery: "Kiambu Kenya coffee estate" },
        { region: "Embu and Meru Slopes", iconicVineyard: "Eastern Mount Kenya coffee zones", imageQuery: "Embu Meru Kenya coffee farm" }
      ]
    }),
    indonesia: commodityProfile({
      overview:
        "Indonesia teaches coffee through island identity and processing: Sumatra wet-hulled depth, Java estate history, Sulawesi structure, Bali sweetness, and Flores volcanic coffees.",
      imageQuery: "Indonesia Sumatra coffee drying volcanic highlands",
      location:
        "Layer by island and region: Aceh/Gayo and Mandheling in Sumatra, Java estates, Toraja/Sulawesi, Kintamani/Bali, Flores, and Papua.",
      sourceConditions:
        "Tropical rainfall, volcanic soils, altitude, smallholder systems, wet hulling, drying constraints, and island logistics shape Indonesian coffee style.",
      primary: ["Arabica", "Robusta", "Wet hulling", "Washed process", "Natural process", "Volcanic soils"],
      secondary: ["Sumatra Mandheling", "Java coffee", "Sulawesi Toraja", "Bali Kintamani", "Espresso blend base"],
      productionStyle:
        "Indonesia is defined by diverse processing: wet hulling for earthy body, washed estate coffees, natural experiments, and smallholder aggregation.",
      servingStyle:
        "Use Indonesian coffee for body, spice, cedar, chocolate, low acidity, and espresso depth; name island and process to avoid generic earthy shorthand.",
      regulations:
        "Origin identity is built through regional trade names, geographical indications in some areas, and exporter/cooperative traceability.",
      terminology: ["Wet Hulling", "Giling Basah", "Mandheling", "Gayo", "Toraja", "Kintamani", "Java Estate", "Robusta"],
      resources: [
        { label: "International Coffee Organization", url: "https://ico.org/" },
        { label: "Specialty Coffee Association of Indonesia", url: "https://scaindonesia.org/" }
      ],
      nearbyTowns: ["Medan", "Takengon", "Bandung", "Makassar", "Denpasar", "Bajawa"],
      regions: [
        { region: "Sumatra Gayo and Mandheling", iconicVineyard: "Wet-hulled highland coffee source", imageQuery: "Sumatra Gayo coffee farm Indonesia" },
        { region: "Java Estate Belt", iconicVineyard: "Historic estate coffee and washed lots", imageQuery: "Java Indonesia coffee estate" },
        { region: "Sulawesi Toraja Highlands", iconicVineyard: "Structured island coffee slopes", imageQuery: "Toraja Sulawesi coffee farm" },
        { region: "Bali Kintamani", iconicVineyard: "Volcanic highland coffee and citrus intercropping", imageQuery: "Bali Kintamani coffee farm" }
      ]
    })
  },
  tea: {
    china: commodityProfile({
      overview:
        "China is the broadest tea-origin study map, but the first layered page starts with Wuyi because rock oolong connects place, processing, cliff geology, roasting, and service language cleanly.",
      imageQuery: "Wuyi Mountain Fujian tea terraces rock oolong",
      location:
        "China tea study should be regional, not generic: Fujian for Wuyi oolong and white tea, Yunnan for pu'er and large-leaf tea, Zhejiang for green tea, Anhui for green and black tea, and Guangdong/Taiwan-linked oolong traditions.",
      sourceConditions:
        "Tea quality follows cultivar, altitude, slope, humidity, plucking standard, oxidation, fixation, rolling, roasting, aging, and storage. Wuyi adds rocky Danxia landforms and mineral service vocabulary.",
      primary: ["Camellia sinensis", "Wuyi cultivars", "Large-leaf Yunnan types", "Green tea cultivars", "White tea cultivars"],
      secondary: ["Wuyi rock oolong", "Longjing-style green tea", "Pu'er", "White tea", "Black tea", "Jasmine-scented tea"],
      productionStyle:
        "Processing category is the exam spine: green tea fixation, oolong bruising and partial oxidation, black tea full oxidation, white tea withering/drying, dark tea microbial aging, and scenting.",
      servingStyle:
        "Teach tea by leaf ratio, vessel, water temperature, infusion count, roast level, oxidation, and aroma progression rather than one universal steeping rule.",
      regulations:
        "Protected geographical indication and intangible-cultural-heritage systems matter for famous origin teas, but service training should avoid making unsupported estate-level claims.",
      terminology: ["Yancha", "Da Hong Pao", "Gongfu", "Oxidation", "Fixation", "Charcoal Roast", "Terroir", "Pu'er"],
      resources: [
        { label: "Fujian Provincial Government - Wuyi rock tea craftsmanship", url: "https://www.fujian.gov.cn/english/cultureandtravel/cultureandarts/202508/t20250811_6989993.htm" },
        { label: "CNIPA - Wuyi rock essence tea geographical indication", url: "https://english.cnipa.gov.cn/transfer/news/localipinformation/1139497.htm" }
      ],
      nearbyTowns: ["Wuyishan", "Fuzhou", "Hangzhou", "Kunming", "Anxi", "Huangshan"],
      regions: [
        { region: "Wuyi Mountain", iconicVineyard: "Rock oolong cliff-and-valley tea gardens", imageQuery: "Wuyi Mountain rock tea Fujian" },
        { region: "Yunnan Tea Mountains", iconicVineyard: "Large-leaf tea and pu'er source zones", imageQuery: "Yunnan tea mountain pu erh" },
        { region: "Zhejiang Green Tea Belt", iconicVineyard: "Lake and hill green-tea gardens", imageQuery: "Zhejiang Longjing tea fields" },
        { region: "Anxi Oolong Zone", iconicVineyard: "Tieguanyin oolong hills", imageQuery: "Anxi Fujian Tieguanyin tea fields" }
      ]
    }),
    india: commodityProfile({
      overview:
        "India is a core tea country because Darjeeling, Assam, Nilgiri, Kangra, and Dooars-Terai connect origin, altitude, leaf style, and service language.",
      imageQuery: "Darjeeling India tea garden Himalaya",
      location:
        "Study northern Himalayan gardens for Darjeeling and Kangra, the Brahmaputra Valley for Assam, southern hills for Nilgiri, and lower foothill plains for Dooars and Terai.",
      sourceConditions:
        "Tea character follows altitude, rainfall, plucking season, cultivar, leaf grade, oxidation, withering, rolling, drying, and CTC versus orthodox processing.",
      primary: ["Camellia sinensis", "Assamica", "Orthodox leaf", "CTC leaf", "First flush", "Second flush"],
      secondary: ["Darjeeling black tea", "Assam breakfast tea", "Nilgiri black tea", "Kangra green and black tea", "Masala chai base"],
      productionStyle:
        "Indian tea production ranges from delicate orthodox Darjeeling lots to strong CTC Assam for milk tea, plus Nilgiri and Kangra orthodox and green-tea work.",
      servingStyle:
        "Teach India through flush, grade, milk tolerance, briskness, muscatel aroma, and whether the tea is designed for straight service or chai.",
      regulations:
        "Tea Board India administers origin systems and Darjeeling GI protection; origin names should not be used loosely for generic blends.",
      terminology: ["First Flush", "Second Flush", "Muscatel", "CTC", "Orthodox", "TGFOP", "Chai", "GI"],
      resources: [
        { label: "Tea Board India", url: "https://www.teaboard.gov.in/" },
        { label: "Darjeeling Tea official GI site", url: "https://www.darjeelingtea.com/" }
      ],
      nearbyTowns: ["Darjeeling", "Siliguri", "Guwahati", "Dibrugarh", "Ooty", "Dharamshala"],
      regions: [
        { region: "Darjeeling Himalayan Gardens", iconicVineyard: "High-elevation muscatel orthodox teas", imageQuery: "Darjeeling tea gardens Himalaya" },
        { region: "Assam Brahmaputra Valley", iconicVineyard: "Strong malty tea for breakfast and milk service", imageQuery: "Assam tea garden Brahmaputra" },
        { region: "Nilgiri Blue Mountains", iconicVineyard: "Fragrant South Indian hill teas", imageQuery: "Nilgiri tea plantation India" },
        { region: "Kangra Valley Tea", iconicVineyard: "North Indian green and black tea revival zone", imageQuery: "Kangra Valley tea garden India" }
      ]
    }),
    "sri-lanka": commodityProfile({
      overview:
        "Sri Lanka teaches tea through elevation and monsoon exposure: high, mid, and low grown Ceylon tea, with Dimbula, Uva, Nuwara Eliya, Kandy, Ruhuna, and Sabaragamuwa as practical regions.",
      imageQuery: "Sri Lanka Ceylon tea plantation highlands",
      location:
        "Layer central highlands, western slopes, eastern Uva exposure, and southern lowland regions. Elevation language is central to service.",
      sourceConditions:
        "Altitude, wind, monsoon timing, plucking standard, oxidation, drying, and leaf grade shape aroma, briskness, color, and body.",
      primary: ["Camellia sinensis", "High-grown leaf", "Mid-grown leaf", "Low-grown leaf", "Orthodox processing"],
      secondary: ["Ceylon black tea", "Uva seasonal tea", "Nuwara Eliya high-grown tea", "Ruhuna low-grown tea", "Ceylon green tea"],
      productionStyle:
        "Sri Lankan tea is strongly orthodox and auction-oriented, with elevation and regional marks used to explain liquor color, brightness, body, and aroma.",
      servingStyle:
        "Use high-grown teas for brightness and fragrance, low-grown teas for color and body, and Uva for seasonal aromatic lift.",
      regulations:
        "Ceylon Tea identity is protected and promoted through national tea-board systems, regional marks, and lion-logo standards.",
      terminology: ["Ceylon", "High Grown", "Mid Grown", "Low Grown", "Uva Season", "BOP", "Orange Pekoe", "Lion Logo"],
      resources: [
        { label: "Sri Lanka Tea Board", url: "https://www.pureceylontea.com/" },
        { label: "Ceylon Tea regional guide", url: "https://www.pureceylontea.com/ceylon-tea/tea-growing-regions/" }
      ],
      nearbyTowns: ["Colombo", "Kandy", "Nuwara Eliya", "Hatton", "Badulla", "Galle"],
      regions: [
        { region: "Nuwara Eliya High Grown", iconicVineyard: "Cool highland tea gardens", imageQuery: "Nuwara Eliya tea plantation Sri Lanka" },
        { region: "Uva Eastern Slopes", iconicVineyard: "Seasonal aromatic black tea zone", imageQuery: "Uva Sri Lanka tea plantation" },
        { region: "Dimbula Western Highlands", iconicVineyard: "Bright high-grown Ceylon teas", imageQuery: "Dimbula Sri Lanka tea estate" },
        { region: "Ruhuna Low Grown", iconicVineyard: "Dark liquoring low-country teas", imageQuery: "Ruhuna Sri Lanka tea plantation" }
      ]
    }),
    japan: commodityProfile({
      overview:
        "Japan tea study is green-tea focused: sencha, matcha, gyokuro, hojicha, and regional identities such as Shizuoka, Uji/Kyoto, Kagoshima, Yame, and Sayama.",
      imageQuery: "Japan Shizuoka green tea fields Mount Fuji",
      location:
        "Study Shizuoka as the volume and Mount Fuji benchmark, Kyoto/Uji for matcha and gyokuro culture, Kagoshima for southern production, and Yame/Sayama for premium regional styles.",
      sourceConditions:
        "Japanese tea character follows cultivar, shading, steaming level, rolling, drying, roasting, harvest date, and storage freshness.",
      primary: ["Yabukita", "Saemidori", "Shaded leaf", "Steamed green tea", "Tencha", "Matcha"],
      secondary: ["Sencha", "Matcha", "Gyokuro", "Hojicha", "Genmaicha", "Kabusecha"],
      productionStyle:
        "The exam spine is green-tea fixation by steaming, with shading for matcha/gyokuro, rolling for sencha, roasting for hojicha, and milling for matcha.",
      servingStyle:
        "Teach Japan through water temperature, umami, bitterness control, multiple infusions, powder whisking, and freshness management.",
      regulations:
        "Origin and quality are shaped by national and regional standards, producer traceability, and protected regional reputation rather than one universal appellation.",
      terminology: ["Sencha", "Tencha", "Matcha", "Gyokuro", "Kabusecha", "Fukamushi", "Umami", "Chasen"],
      resources: [
        { label: "Japanese Tea Export Council", url: "https://japanesetea.org/" },
        { label: "Japan Tea Central Public Interest Incorporated Association", url: "https://www.nihon-cha.or.jp/" }
      ],
      nearbyTowns: ["Shizuoka", "Uji", "Kyoto", "Kagoshima", "Yame", "Sayama"],
      regions: [
        { region: "Shizuoka Tea Belt", iconicVineyard: "Mount Fuji-facing sencha fields", imageQuery: "Shizuoka Japan tea fields Mount Fuji" },
        { region: "Uji Kyoto Matcha Zone", iconicVineyard: "Tencha, matcha, and gyokuro heritage gardens", imageQuery: "Uji Kyoto matcha tea fields" },
        { region: "Kagoshima Southern Tea Plains", iconicVineyard: "Large-scale southern green-tea production", imageQuery: "Kagoshima tea fields Japan" },
        { region: "Yame Gyokuro Gardens", iconicVineyard: "Shaded premium green-tea gardens", imageQuery: "Yame Japan gyokuro tea garden" }
      ]
    }),
    kenya: commodityProfile({
      overview:
        "Kenya is a global black-tea production benchmark, useful for CTC manufacturing, highland rainfall, auction systems, and brisk tea for milk service.",
      imageQuery: "Kericho Kenya tea plantation highlands",
      location:
        "Study the Rift Valley highlands, especially Kericho, Nandi, Limuru, and Mount Kenya/Embu-Meru zones, as the first production layer.",
      sourceConditions:
        "Equatorial highlands, rainfall, altitude, clonal material, rapid leaf transport, and CTC manufacturing create bright, brisk teas.",
      primary: ["Camellia sinensis", "CTC leaf", "Orthodox leaf", "Clonal tea", "Highland rainfall"],
      secondary: ["Kenya black tea", "Milk tea base", "Breakfast blends", "Orthodox specialty tea", "Purple tea"],
      productionStyle:
        "Kenyan tea is largely CTC black tea for blending, with specialty orthodox and purple-tea projects adding a premium study layer.",
      servingStyle:
        "Use Kenya for briskness, color, strength, and milk compatibility; explain CTC versus orthodox before discussing terroir romance.",
      regulations:
        "Tea is organized through national tea agencies, factory systems, auction channels, and producer traceability.",
      terminology: ["CTC", "Briskness", "Factory", "Auction", "Purple Tea", "Orthodox", "Blend Base", "Milk Tea"],
      resources: [
        { label: "Kenya Tea Development Agency", url: "https://ktdateas.com/" },
        { label: "Tea Board of Kenya", url: "https://tea.agricultureauthority.go.ke/" }
      ],
      nearbyTowns: ["Nairobi", "Kericho", "Nandi Hills", "Limuru", "Eldoret", "Meru"],
      regions: [
        { region: "Kericho Tea Highlands", iconicVineyard: "High-rainfall CTC black tea estates", imageQuery: "Kericho Kenya tea fields" },
        { region: "Nandi Hills Tea Zone", iconicVineyard: "Rift highland tea factories", imageQuery: "Nandi Hills Kenya tea plantation" },
        { region: "Limuru Tea Belt", iconicVineyard: "Cool highland tea near Nairobi", imageQuery: "Limuru Kenya tea fields" },
        { region: "Mount Kenya Tea Slopes", iconicVineyard: "Eastern highland tea production", imageQuery: "Mount Kenya tea plantation" }
      ]
    })
  },
  kombucha: {
    china: commodityProfile({
      overview:
        "Kombucha geography is not an appellation map. It should be taught as a tea-origin, sugar, microbial culture, and fermentation-control system, with China/Northeast Asia as the historical starting point and modern production mapped by facility standards.",
      imageQuery: "kombucha fermentation tea jars production",
      location:
        "The practical region layer starts with tea-source regions and production facilities. For exams and service, map base tea origin, fermentation environment, culture management, flavoring source, and cold-chain route.",
      sourceConditions:
        "Kombucha quality follows tea polyphenols, sugar source, SCOBY health, acetic-acid bacteria and yeast balance, oxygen exposure, temperature, time, pH, alcohol control, and packaging stability.",
      primary: ["Black tea", "Green tea", "Sucrose", "SCOBY", "Starter liquid"],
      secondary: ["Traditional kombucha", "Jun-style honey green tea", "Fruit-flavored kombucha", "Dry hopped kombucha", "Low-alcohol kombucha"],
      productionStyle:
        "The production model is sweetened tea fermentation by a symbiotic culture, followed by separation, optional flavoring, carbonation management, chilling, and package stability controls.",
      servingStyle:
        "Serve cold, protect carbonation, watch residual sugar and acidity, and describe flavor by tea base, acid profile, fruiting, spice, and fermentation intensity.",
      regulations:
        "Commercial kombucha needs food-safety controls and, where alcohol can exceed thresholds, alcohol compliance. Region claims should be framed around ingredients and facility location, not protected origin.",
      terminology: ["SCOBY", "Pellicle", "Backslop", "Acetic Acid", "pH", "Secondary Fermentation", "Cold Chain", "ABV Control"],
      resources: [
        { label: "PMC - Kombucha ancient fermented beverage review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9011011/" },
        { label: "PubMed - Understanding Kombucha Tea Fermentation", url: "https://pubmed.ncbi.nlm.nih.gov/29508944/" }
      ],
      nearbyTowns: ["Wuyishan", "Hangzhou", "Beijing", "Shanghai", "Portland", "Los Angeles"],
      regions: [
        { region: "Northeast Asia Origin Frame", iconicVineyard: "Historical fermented-tea culture context", imageQuery: "traditional tea fermentation jars China" },
        { region: "Fujian Tea Base", iconicVineyard: "Oolong and black tea base options", imageQuery: "Fujian tea leaves fermentation" },
        { region: "Modern West Coast Production", iconicVineyard: "Scaled stainless kombucha fermentation rooms", imageQuery: "kombucha brewery fermentation tanks" },
        { region: "Fruit Flavoring Belt", iconicVineyard: "Fruit puree and botanical blending inputs", imageQuery: "kombucha fruit blending production" }
      ]
    }),
    "united-states": commodityProfile({
      overview:
        "The United States is the practical kombucha market benchmark: scaled breweries, taproom service, grocery cold chain, low-alcohol compliance, and fruit or hop flavoring systems.",
      imageQuery: "United States kombucha brewery stainless fermentation tanks",
      location:
        "Study production corridors rather than appellations: West Coast natural-food markets, Pacific Northwest brewing crossovers, Northeast urban brands, and national cold-chain distribution.",
      sourceConditions:
        "Kombucha quality follows tea base, sugar, culture health, fermentation time, oxygen, temperature, pH, ABV control, flavoring inputs, carbonation, and refrigerated distribution.",
      primary: ["Black tea", "Green tea", "Cane sugar", "SCOBY", "Starter liquid", "Fruit puree"],
      secondary: ["Raw kombucha", "Pasteurized kombucha", "Hard kombucha", "Hop-flavored kombucha", "Botanical kombucha"],
      productionStyle:
        "US production commonly scales batch fermentation into stainless tanks, then blends, flavors, carbonates, chills, packages, and monitors alcohol and food-safety risk.",
      servingStyle:
        "Serve cold with active carbonation, describe tea base and acidity, and avoid unsupported health claims; use hard kombucha as an alcohol category, not a soft-drink substitute.",
      regulations:
        "Commercial producers must manage food safety, labeling, and alcohol thresholds. Products that exceed alcohol limits move into alcohol regulatory territory.",
      terminology: ["SCOBY", "Raw", "Hard Kombucha", "pH", "ABV Drift", "Cold Chain", "Secondary Fermentation", "Flash Pasteurization"],
      resources: [
        { label: "Kombucha Brewers International", url: "https://kombuchabrewers.org/" },
        { label: "TTB - Kombucha guidance", url: "https://www.ttb.gov/kombucha" }
      ],
      nearbyTowns: ["Portland", "Los Angeles", "San Diego", "Austin", "Brooklyn", "Asheville"],
      regions: [
        { region: "West Coast Kombucha Belt", iconicVineyard: "Scaled natural-food kombucha production", imageQuery: "West Coast kombucha brewery tanks" },
        { region: "Pacific Northwest Fermentation Corridor", iconicVineyard: "Beer crossover and hop-flavored kombucha", imageQuery: "Pacific Northwest kombucha brewery" },
        { region: "Northeast Urban Production", iconicVineyard: "Cold-chain grocery and taproom kombucha", imageQuery: "Northeast kombucha production facility" },
        { region: "Hard Kombucha Production Cluster", iconicVineyard: "Alcohol-controlled fermented tea facilities", imageQuery: "hard kombucha fermentation tanks" }
      ]
    }),
    germany: commodityProfile({
      overview:
        "Germany gives kombucha a European functional-beverage frame: organic retail, controlled fermentation, tea sourcing, low-alcohol management, and bottled cold-chain quality.",
      imageQuery: "Germany kombucha fermentation organic beverage production",
      location:
        "Use Berlin, Hamburg, Munich, and Rhine/Ruhr distribution corridors as production and service contexts rather than protected kombucha regions.",
      sourceConditions:
        "Tea quality, sugar source, microbial control, acidity, carbonation, packaging oxygen, cold-chain storage, and EU food-labeling discipline shape the study model.",
      primary: ["Black tea", "Green tea", "Organic sugar", "SCOBY", "Botanicals", "Fruit juice"],
      secondary: ["Classic kombucha", "Organic kombucha", "Botanical kombucha", "Low-sugar kombucha", "Sparkling tea ferments"],
      productionStyle:
        "Production emphasizes clean fermentation rooms, consistent pH, low alcohol, botanical flavoring, pasteurization or cold-chain control, and bottle stability.",
      servingStyle:
        "Serve as a dry, acidic non-alcoholic option with tea tannin, fermentation bite, and botanical complexity.",
      regulations:
        "EU and national food rules shape labeling, alcohol thresholds, organic claims, and functional claim limits.",
      terminology: ["Bio", "SCOBY", "pH", "Residual Sugar", "Cold Chain", "Botanical", "Low Alcohol", "Fermented Tea"],
      resources: [
        { label: "European Food Safety Authority", url: "https://www.efsa.europa.eu/" },
        { label: "Kombucha Brewers International", url: "https://kombuchabrewers.org/" }
      ],
      nearbyTowns: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
      regions: [
        { region: "Berlin Fermentation Market", iconicVineyard: "Urban kombucha and functional beverage producers", imageQuery: "Berlin kombucha fermentation bottles" },
        { region: "Hamburg Cold-Chain Corridor", iconicVineyard: "Port and grocery distribution context", imageQuery: "Hamburg beverage bottling facility" },
        { region: "Bavarian Organic Beverage Zone", iconicVineyard: "Organic tea ferment and juice blending inputs", imageQuery: "Bavaria organic beverage production kombucha" },
        { region: "Rhine Retail Distribution Belt", iconicVineyard: "Dense grocery and cafe service network", imageQuery: "Germany kombucha bottles cafe" }
      ]
    }),
    australia: commodityProfile({
      overview:
        "Australia is useful for kombucha because warm-climate fermentation control, cafe service, fruit flavoring, and non-alcoholic adult beverage positioning are easy to teach.",
      imageQuery: "Australia kombucha brewery fermentation fruit botanicals",
      location:
        "Study east-coast production and service corridors first: Sydney, Byron/Northern Rivers, Brisbane, Melbourne, and specialty fruit-sourcing regions.",
      sourceConditions:
        "Fermentation temperature control, tea base, cane sugar, fruit puree, ginger, native botanicals, carbonation, and chilled distribution shape product quality.",
      primary: ["Black tea", "Green tea", "Cane sugar", "SCOBY", "Ginger", "Tropical fruit"],
      secondary: ["Cafe kombucha", "Ginger kombucha", "Fruit kombucha", "Canned kombucha", "Non-alcoholic sparkling ferments"],
      productionStyle:
        "Australian kombucha often connects scaled fermentation to cafe and grocery service, with fruit-forward flavoring and strict stability control in a warm climate.",
      servingStyle:
        "Use as a chilled, bright, acid-driven alternative to soda, beer, or sparkling wine in daytime and wellness-positioned service.",
      regulations:
        "Food-safety, alcohol, and labeling rules determine how kombucha can be sold and described.",
      terminology: ["SCOBY", "Warm Ferment", "Ginger", "Native Botanicals", "pH", "Cold Chain", "Canned Kombucha", "ABV Control"],
      resources: [
        { label: "Food Standards Australia New Zealand", url: "https://www.foodstandards.gov.au/" },
        { label: "Kombucha Brewers International", url: "https://kombuchabrewers.org/" }
      ],
      nearbyTowns: ["Sydney", "Byron Bay", "Brisbane", "Melbourne", "Adelaide"],
      regions: [
        { region: "Northern Rivers Fermentation Belt", iconicVineyard: "Fruit-forward kombucha and cafe culture", imageQuery: "Byron Bay kombucha brewery fruit" },
        { region: "Sydney Beverage Production", iconicVineyard: "Urban kombucha packaging and distribution", imageQuery: "Sydney kombucha production facility" },
        { region: "Melbourne Cafe Service Corridor", iconicVineyard: "Tap, can, and bottle kombucha service", imageQuery: "Melbourne kombucha cafe tap" },
        { region: "Queensland Tropical Flavor Zone", iconicVineyard: "Ginger, citrus, and tropical fruit inputs", imageQuery: "Queensland tropical fruit kombucha" }
      ]
    })
  },
  juice: {
    brasil: commodityProfile({
      overview:
        "Brasil's juice map is led by orange juice, especially the Sao Paulo and West-Southwest Minas Gerais citrus belt, which is the core industrial study region for global orange-juice sourcing.",
      imageQuery: "Sao Paulo Brazil orange grove citrus belt",
      location:
        "The first layer is the Sao Paulo and West-Southwest Minas Gerais citrus belt, then other fruit corridors such as grape, apple, tropical fruit, and export-oriented processing zones.",
      sourceConditions:
        "Juice quality follows cultivar, brix/acid balance, disease pressure, irrigation, harvest timing, extraction, concentration, pasteurization, and cold-chain or aseptic logistics.",
      primary: ["Orange", "Lime", "Grape", "Apple", "Passion fruit", "Acerola"],
      secondary: ["NFC orange juice", "Frozen concentrated orange juice", "Citrus blends", "Tropical nectars", "Cold-pressed juice"],
      productionStyle:
        "Industrial orange juice moves from grove harvest to extraction, oil recovery, pasteurization, concentration or not-from-concentrate storage, blending, and export logistics.",
      servingStyle:
        "Teach juice through freshness, brix, acidity, pulp, pasteurization, concentration, oxidation, and pairing with breakfast, cocktails, and non-alcoholic menu builds.",
      regulations:
        "Juice standards involve fruit identity, soluble solids, labeling, pasteurization, residue compliance, and export-market requirements rather than appellation rules.",
      terminology: ["Brix", "Titratable Acidity", "NFC", "FCOJ", "Pulp", "Aseptic", "Pasteurization", "Cold-Pressed"],
      resources: [
        { label: "Fundecitrus - sustainable citriculture", url: "https://ww2.fundecitrus.com.br/sustainablecitriculture" },
        {
          label: "USDA FAS - Brazil citrus annual report",
          url: "https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Citrus+Annual_Brasilia_Brazil_BR2023-0036"
        }
      ],
      nearbyTowns: ["Sao Paulo", "Araraquara", "Ribeirao Preto", "Bebedouro", "Uberaba"],
      regions: [
        { region: "Sao Paulo Citrus Belt", iconicVineyard: "High-density orange groves and juice plants", imageQuery: "Sao Paulo citrus grove orange juice" },
        { region: "West-Southwest Minas Gerais", iconicVineyard: "Citrus extension zone", imageQuery: "Minas Gerais orange grove" },
        { region: "Serra Gaucha Grape Juice", iconicVineyard: "Southern grape juice and wine corridor", imageQuery: "Serra Gaucha grape juice vineyards" },
        { region: "Northeast Tropical Fruit Belt", iconicVineyard: "Passion fruit and acerola processing region", imageQuery: "Brazil tropical fruit farm juice" }
      ]
    }),
    "united-states": commodityProfile({
      overview:
        "The United States juice map is a regional fruit-source system: Florida citrus, Washington apples, California citrus and grapes, Northeast cider apples, and cranberry or berry corridors.",
      imageQuery: "Florida orange grove juice processing United States",
      location:
        "Layer by fruit belt: Florida citrus, Washington apple country, California Central Valley citrus and grape juice, Great Lakes grape belts, and Northeast apple cider regions.",
      sourceConditions:
        "Juice quality follows fruit variety, brix, acidity, disease pressure, harvest timing, extraction, pasteurization, concentration, blending, and chilled or aseptic storage.",
      primary: ["Orange", "Apple", "Grape", "Cranberry", "Grapefruit", "Lemon"],
      secondary: ["NFC orange juice", "Apple cider", "Concentrated juice", "Cranberry cocktail", "Cold-pressed juice", "Juice for cocktails"],
      productionStyle:
        "Production ranges from industrial extraction and concentration to fresh-pressed cider, cold-pressed retail juice, pasteurization, blending, and packaging.",
      servingStyle:
        "Teach juice by freshness, concentration, pulp, brix, acidity, oxidation, pasteurization, and cocktail or breakfast use.",
      regulations:
        "US juice labeling and safety involve identity standards, HACCP expectations, pasteurization or warning labels, and truthful fruit-content claims.",
      terminology: ["Brix", "NFC", "From Concentrate", "HACCP", "Pulp", "Cold-Pressed", "Pasteurized", "Cider"],
      resources: [
        { label: "FDA - Juice HACCP", url: "https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/juice-haccp" },
        { label: "USDA NASS - Citrus", url: "https://www.nass.usda.gov/Statistics_by_Subject/result.php?sector=CROPS&group=FRUIT%20%26%20TREE%20NUTS&comm=CITRUS" }
      ],
      nearbyTowns: ["Orlando", "Lakeland", "Yakima", "Fresno", "Rochester", "Traverse City"],
      regions: [
        { region: "Florida Citrus Belt", iconicVineyard: "Orange and grapefruit groves for juice", imageQuery: "Florida orange grove juice plant" },
        { region: "Washington Apple Juice Corridor", iconicVineyard: "Apple orchards and cider pressing", imageQuery: "Washington apple orchard juice press" },
        { region: "California Central Valley Juice Fruit", iconicVineyard: "Citrus, grape, and pomegranate processing", imageQuery: "California Central Valley citrus grape juice" },
        { region: "Northeast Cider Apple Belt", iconicVineyard: "Fresh cider and cold-chain apple juice", imageQuery: "Northeast apple cider orchard press" }
      ]
    }),
    china: commodityProfile({
      overview:
        "China is a major juice-source study country through apple juice concentrate, citrus, pear, and broad fruit processing systems tied to export and domestic beverage markets.",
      imageQuery: "China apple orchard juice concentrate processing",
      location:
        "Study apple provinces such as Shaanxi and Shandong first, then citrus regions in Hubei, Hunan, Jiangxi, and Guangxi, with processing hubs connected to export logistics.",
      sourceConditions:
        "Cultivar, brix, acidity, harvest timing, storage, concentrate production, residue compliance, and blending determine juice use.",
      primary: ["Apple", "Pear", "Mandarin", "Orange", "Peach", "Hawthorn"],
      secondary: ["Apple juice concentrate", "Pear juice", "Citrus juice", "Nectar", "Tea-juice blends", "Functional fruit drinks"],
      productionStyle:
        "The key model is fruit collection, washing, crushing or extraction, clarification, concentration, aseptic storage, and export or beverage blending.",
      servingStyle:
        "Use China primarily as a source and concentrate lesson: explain apple concentrate, sweetness, acidity adjustment, and blending rather than fresh orchard service only.",
      regulations:
        "Export juice depends on food-safety, residue, traceability, and destination-market standards as much as domestic product identity.",
      terminology: ["AJC", "Concentrate", "Aseptic", "Brix Adjustment", "Clarification", "Residue Testing", "Nectar", "Fruit Drink"],
      resources: [
        { label: "China Chamber of Commerce of Foodstuffs", url: "https://www.cccfna.org.cn/" },
        { label: "FAOSTAT crops and livestock products", url: "https://www.fao.org/faostat/" }
      ],
      nearbyTowns: ["Xi'an", "Yantai", "Qingdao", "Wuhan", "Nanchang", "Guilin"],
      regions: [
        { region: "Shaanxi Apple Belt", iconicVineyard: "Apple orchards for juice concentrate", imageQuery: "Shaanxi China apple orchard" },
        { region: "Shandong Apple Processing", iconicVineyard: "Coastal fruit and export processing", imageQuery: "Shandong apple juice processing" },
        { region: "Hubei Citrus Corridor", iconicVineyard: "Mandarin and orange juice fruit source", imageQuery: "Hubei China citrus orchard" },
        { region: "Guangxi Tropical Fruit Zone", iconicVineyard: "Citrus and tropical fruit beverage inputs", imageQuery: "Guangxi tropical fruit farm China" }
      ]
    }),
    spain: commodityProfile({
      overview:
        "Spain's juice study centers on Mediterranean citrus, especially Valencia and Murcia, with stone fruit, grape must, and pomegranate beverage inputs as extensions.",
      imageQuery: "Valencia Spain orange grove citrus juice",
      location:
        "Layer Valencia, Murcia, Andalusia, Catalonia, and Ebro fruit areas by citrus and fruit-processing role.",
      sourceConditions:
        "Mediterranean sunshine, irrigation, variety choice, brix-acid balance, harvest window, and processing logistics define juice quality.",
      primary: ["Orange", "Mandarin", "Lemon", "Grapefruit", "Pomegranate", "Grape must"],
      secondary: ["Fresh orange juice", "Citrus concentrate", "Lemon juice", "Mandarin juice", "Nectar", "Sangria and cocktail citrus"],
      productionStyle:
        "Production connects fresh-market citrus with extraction, pasteurization, concentration, blending, and chilled or aseptic packaging.",
      servingStyle:
        "Use Spain for fresh citrus service, breakfast juice, cocktail acidity, and Mediterranean fruit identity.",
      regulations:
        "EU fruit-juice directives and Spanish food rules shape identity, sugar addition limits, labeling, and origin claims.",
      terminology: ["Zumo", "NFC", "Concentrate", "Brix", "Acidez", "Citrus Belt", "Pulp", "Pasteurization"],
      resources: [
        { label: "AIJN - European Fruit Juice Association", url: "https://aijn.eu/" },
        { label: "Spanish Ministry of Agriculture", url: "https://www.mapa.gob.es/en/" }
      ],
      nearbyTowns: ["Valencia", "Murcia", "Seville", "Alicante", "Tarragona"],
      regions: [
        { region: "Valencia Citrus Coast", iconicVineyard: "Orange and mandarin groves", imageQuery: "Valencia Spain orange groves" },
        { region: "Murcia Lemon and Citrus Zone", iconicVineyard: "Lemon, orange, and grapefruit production", imageQuery: "Murcia Spain lemon citrus grove" },
        { region: "Andalusia Citrus Belt", iconicVineyard: "Southern citrus and juice processing", imageQuery: "Andalusia Spain citrus orchard" },
        { region: "Ebro Fruit Processing Corridor", iconicVineyard: "Stone fruit and beverage inputs", imageQuery: "Ebro Spain fruit orchard juice" }
      ]
    }),
    india: commodityProfile({
      overview:
        "India's juice map is fruit-diverse: mango, citrus, pomegranate, guava, sugarcane juice, and tropical nectars make it a strong service and sourcing study country.",
      imageQuery: "India mango orchard juice processing",
      location:
        "Study mango belts in Maharashtra, Uttar Pradesh, Andhra Pradesh, and Gujarat, citrus around Nagpur, pomegranate in Maharashtra, and sugarcane juice across northern and western states.",
      sourceConditions:
        "Cultivar, ripeness, brix, acidity, pulp content, heat treatment, aseptic puree, and cold-chain service shape Indian juice and nectar quality.",
      primary: ["Mango", "Orange", "Pomegranate", "Guava", "Sugarcane", "Lime"],
      secondary: ["Mango nectar", "Aam panna", "Mosambi juice", "Pomegranate juice", "Sugarcane juice", "Lassi-fruit blends"],
      productionStyle:
        "Production ranges from fresh street-side extraction to aseptic mango pulp, nectar blending, pasteurization, and packaged fruit beverages.",
      servingStyle:
        "Teach by fruit cultivar, pulp, sugar, acidity, spice, dilution, freshness, and food-safety context.",
      regulations:
        "Food Safety and Standards Authority of India rules shape packaged juice, nectar, fruit beverage, labeling, and safety requirements.",
      terminology: ["Nectar", "Pulp", "Aseptic Mango", "Brix", "Mosambi", "Aam Panna", "Sugarcane Juice", "FSSAI"],
      resources: [
        { label: "FSSAI", url: "https://www.fssai.gov.in/" },
        { label: "APEDA - processed fruits and vegetables", url: "https://apeda.gov.in/" }
      ],
      nearbyTowns: ["Mumbai", "Nagpur", "Pune", "Lucknow", "Hyderabad", "Ahmedabad"],
      regions: [
        { region: "Maharashtra Mango and Pomegranate Belt", iconicVineyard: "Aseptic pulp and juice fruit source", imageQuery: "Maharashtra mango pomegranate orchard juice" },
        { region: "Nagpur Citrus Zone", iconicVineyard: "Orange and mosambi juice fruit source", imageQuery: "Nagpur orange orchard India" },
        { region: "Uttar Pradesh Mango Corridor", iconicVineyard: "North Indian mango nectar source", imageQuery: "Uttar Pradesh mango orchard" },
        { region: "Andhra Tropical Fruit Zone", iconicVineyard: "Mango and guava processing inputs", imageQuery: "Andhra Pradesh mango guava orchard" }
      ]
    })
  },
  milk: {
    "new-zealand": commodityProfile({
      overview:
        "New Zealand is a high-value milk study map because pasture-based dairying, seasonal production, export processing, and regional climate pressure are easy to connect to product style and supply chains.",
      imageQuery: "Waikato New Zealand dairy pasture cows",
      location:
        "The Waikato is the first benchmark region, with Taranaki, Canterbury, Otago/Southland, Bay of Plenty, and West Coast adding climate and system contrasts.",
      sourceConditions:
        "Milk profile follows pasture growth, rainfall, stocking rate, calving season, feed supplementation, cooling speed, transport distance, and processing into powder, butter, cheese, and specialty ingredients.",
      primary: ["Pasture milk", "Whole milk", "Skim milk", "Cream", "Milk solids", "Whey"],
      secondary: ["Milk powder", "Butter", "Cheddar", "Specialty cheese", "Yogurt", "Infant formula ingredients"],
      productionStyle:
        "New Zealand dairying is commonly taught through seasonal pasture systems, cooperative processing, tanker logistics, milk-solids economics, and export-oriented ingredient manufacture.",
      servingStyle:
        "For beverage service, connect milk to fat level, protein, foam stability, sweetness, heat treatment, freshness, and compatibility with espresso, tea, chocolate, and cultured drinks.",
      regulations:
        "Milk study should include food safety, animal health, cooling, pasteurization, compositional standards, and export market compliance.",
      terminology: ["Milk Solids", "Pasture-Based", "Seasonal Calving", "Somatic Cell Count", "Pasteurization", "Homogenization", "UHT", "Whey"],
      resources: [
        { label: "DairyNZ - sector quickfacts", url: "https://www.dairynz.co.nz/media/012j12ye/dairynz-media-quickfacts-economics-and-markets-september-2024.pdf" },
        { label: "Te Ara - dairy farming regions", url: "https://teara.govt.nz/interactive/15713/dairy-farming-regions" }
      ],
      nearbyTowns: ["Hamilton", "Matamata", "New Plymouth", "Christchurch", "Invercargill"],
      regions: [
        { region: "Waikato Dairy Basin", iconicVineyard: "Pasture-based North Island dairy farms", imageQuery: "Waikato dairy pasture cows" },
        { region: "Taranaki Dairy Ring", iconicVineyard: "Volcanic-mountain rainfall dairy country", imageQuery: "Taranaki dairy farm Mount Taranaki" },
        { region: "Canterbury Irrigated Dairy", iconicVineyard: "South Island irrigated dairy plains", imageQuery: "Canterbury New Zealand dairy farm" },
        { region: "Southland / Otago Dairy", iconicVineyard: "Cool-climate southern dairy systems", imageQuery: "Southland New Zealand dairy cows" }
      ]
    }),
    "united-states": commodityProfile({
      overview:
        "The United States milk map is a regional dairy-systems study: California scale, Wisconsin cheese milk, Idaho high-output farms, New York fluid milk, and Pacific Northwest specialty dairy.",
      imageQuery: "Wisconsin dairy farm milk cows United States",
      location:
        "Layer by production system and market: California Central Valley, Wisconsin and the Upper Midwest, Idaho's Snake River Plain, New York/Northeast fluid milk, and Oregon/Washington specialty dairies.",
      sourceConditions:
        "Milk quality follows breed mix, feed, pasture or confinement system, somatic cell count, cooling speed, hauling, pasteurization, fat, protein, and seasonal management.",
      primary: ["Whole milk", "Skim milk", "Cream", "Milk solids", "Whey", "Lactose-free milk"],
      secondary: ["Fluid milk", "Barista milk", "Cheese milk", "Yogurt milk", "UHT milk", "Chocolate milk"],
      productionStyle:
        "US dairy combines large-scale fluid milk, cheese milk pools, cooperative processing, tanker logistics, Grade A safety systems, and specialty/organic niches.",
      servingStyle:
        "Teach service by fat, protein, sweetness, heat treatment, homogenization, freshness, foam performance, and compatibility with coffee, tea, and chocolate.",
      regulations:
        "Milk is governed by federal and state dairy safety, Grade A standards, pasteurization rules, and labeling requirements.",
      terminology: ["Grade A", "Somatic Cell Count", "Pasteurized", "Homogenized", "UHT", "Milk Pool", "Milk Solids", "Barista Milk"],
      resources: [
        { label: "USDA NASS - Milk production", url: "https://www.nass.usda.gov/Surveys/Guide_to_NASS_Surveys/Milk_Production/" },
        { label: "FDA - Grade A Pasteurized Milk Ordinance", url: "https://www.fda.gov/food/federalstate-food-programs/national-conference-interstate-milk-shipments-ncims-model-documents" }
      ],
      nearbyTowns: ["Madison", "Fresno", "Twin Falls", "Rochester", "Portland", "Lancaster"],
      regions: [
        { region: "California Central Valley Dairy", iconicVineyard: "Large-scale milk and processing corridor", imageQuery: "California Central Valley dairy cows" },
        { region: "Wisconsin Cheese Milk Belt", iconicVineyard: "Upper Midwest dairy farms and cheese plants", imageQuery: "Wisconsin dairy cows cheese farm" },
        { region: "Idaho Snake River Dairy", iconicVineyard: "High-output western dairy basin", imageQuery: "Idaho Snake River dairy farm" },
        { region: "Northeast Fluid Milk Corridor", iconicVineyard: "New York and Pennsylvania milk sheds", imageQuery: "New York dairy farm milk" }
      ]
    }),
    india: commodityProfile({
      overview:
        "India is the largest milk study system by cultural breadth: buffalo and cow milk, cooperative collection, fresh dairy sweets, chai service, lassi, and paneer or ghee processing.",
      imageQuery: "India dairy cooperative buffalo milk collection",
      location:
        "Study Gujarat and the Amul cooperative frame first, then Uttar Pradesh, Rajasthan, Punjab/Haryana, Maharashtra, and southern dairy corridors.",
      sourceConditions:
        "Milk identity follows cow versus buffalo source, fat content, collection speed, chilling, cooperative logistics, heat treatment, and conversion into ghee, paneer, curd, and beverages.",
      primary: ["Buffalo milk", "Cow milk", "Cream", "Curd", "Whey", "Milk solids"],
      secondary: ["Chai milk", "Lassi", "Buttermilk", "Paneer milk", "Ghee", "Flavored milk"],
      productionStyle:
        "India's model connects village collection, cooperative chilling, pasteurization, high-fat buffalo milk, and diverse fresh dairy beverages and foods.",
      servingStyle:
        "Use India for milk in chai, lassi, buttermilk, sweets, and high-fat dairy service; specify buffalo or cow when texture and fat matter.",
      regulations:
        "FSSAI standards and cooperative quality controls shape packaged milk, dairy beverages, fat levels, and safety claims.",
      terminology: ["Buffalo Milk", "Toned Milk", "Double Toned", "Curd", "Lassi", "Chaas", "Paneer", "Ghee"],
      resources: [
        { label: "National Dairy Development Board", url: "https://www.nddb.coop/" },
        { label: "FSSAI", url: "https://www.fssai.gov.in/" }
      ],
      nearbyTowns: ["Anand", "Ahmedabad", "Lucknow", "Jaipur", "Ludhiana", "Pune"],
      regions: [
        { region: "Gujarat Cooperative Dairy Belt", iconicVineyard: "Village collection and chilling networks", imageQuery: "Gujarat dairy cooperative milk collection" },
        { region: "Punjab Haryana Milk Corridor", iconicVineyard: "High-fat dairy and lassi service culture", imageQuery: "Punjab dairy buffalo milk" },
        { region: "Uttar Pradesh Dairy Plain", iconicVineyard: "Large cow and buffalo milk production base", imageQuery: "Uttar Pradesh dairy farm milk" },
        { region: "Maharashtra Urban Dairy Supply", iconicVineyard: "Milk processing for cities and beverages", imageQuery: "Maharashtra dairy processing milk" }
      ]
    }),
    netherlands: commodityProfile({
      overview:
        "The Netherlands is a compact, high-signal dairy country: pasture, cooperative processing, Gouda-style cheese milk, infant formula, and export-quality control.",
      imageQuery: "Netherlands dairy pasture cows canal milk",
      location:
        "Study Friesland, North Holland, South Holland, Gelderland, and Brabant as milk sheds tied to cheese, processing, and export logistics.",
      sourceConditions:
        "Grassland, water management, feed, herd health, milk solids, cooling, cooperative logistics, and strict quality systems define Dutch milk.",
      primary: ["Cow milk", "Cream", "Skim milk", "Milk powder", "Whey", "Cheese milk"],
      secondary: ["Fluid milk", "Gouda cheese milk", "Yogurt", "Buttermilk", "Infant formula", "Barista milk"],
      productionStyle:
        "Dutch dairy links efficient farm systems to cooperative processing, cheese making, powder, ingredients, and export assurance.",
      servingStyle:
        "Use Dutch milk for clean dairy flavor, cheese and butter context, coffee service, and ingredient quality language.",
      regulations:
        "EU dairy hygiene, Dutch quality assurance, protected cheese traditions, and export standards shape the study frame.",
      terminology: ["Weidemelk", "Gouda", "Milk Solids", "Cooperative", "Buttermilk", "Pasteurization", "Whey", "Quality Scheme"],
      resources: [
        { label: "ZuivelNL", url: "https://www.zuivelnl.org/" },
        { label: "Dutch Dairy Association", url: "https://www.nzo.nl/" }
      ],
      nearbyTowns: ["Leeuwarden", "Gouda", "Alkmaar", "Rotterdam", "Eindhoven"],
      regions: [
        { region: "Friesland Dairy Pasture", iconicVineyard: "Northern grassland milk source", imageQuery: "Friesland Netherlands dairy cows pasture" },
        { region: "North Holland Cheese Milk", iconicVineyard: "Cheese towns and coastal dairy", imageQuery: "North Holland dairy cows cheese" },
        { region: "Gelderland Brabant Dairy Belt", iconicVineyard: "Dense processing and farm systems", imageQuery: "Gelderland Brabant dairy farm Netherlands" },
        { region: "Gouda Cheese Corridor", iconicVineyard: "Milk transformed into protected cheese identity", imageQuery: "Gouda Netherlands cheese dairy" }
      ]
    }),
    ireland: commodityProfile({
      overview:
        "Ireland teaches pasture-based milk in a cool maritime climate, with grass growth, seasonal supply, butter, cream liqueur inputs, and dairy export identity as study anchors.",
      imageQuery: "Ireland dairy pasture cows green fields",
      location:
        "Study Munster first, especially Cork, Kerry, Tipperary, and Waterford, then add southeast and western pasture systems.",
      sourceConditions:
        "Rainfall, grass growth, seasonal calving, milk solids, cooling, tanker logistics, and processing into butter, cheese, powder, and cream determine identity.",
      primary: ["Pasture milk", "Cream", "Butterfat", "Milk solids", "Skim milk", "Whey"],
      secondary: ["Fluid milk", "Irish butter", "Cheese milk", "Cream liqueur base", "Milk powder", "Yogurt"],
      productionStyle:
        "Irish dairy is built around grass-fed seasonal systems, cooperative processing, butter and cheese production, ingredients, and export branding.",
      servingStyle:
        "Use Ireland for rich cream and butter context, coffee milk, stout-adjacent culinary pairings, and cream-liqueur base language.",
      regulations:
        "EU dairy hygiene, national quality assurance, grass-fed claims, and export standards shape labeling and quality.",
      terminology: ["Grass-Fed", "Seasonal Calving", "Milk Solids", "Butterfat", "Co-op", "Cream Liqueur", "Pasture", "Quality Assurance"],
      resources: [
        { label: "Teagasc - dairy", url: "https://www.teagasc.ie/animals/dairy/" },
        { label: "Bord Bia - Irish dairy", url: "https://www.bordbia.ie/industry/irish-sector-profiles/dairy/" }
      ],
      nearbyTowns: ["Cork", "Killarney", "Tipperary", "Waterford", "Limerick"],
      regions: [
        { region: "Munster Dairy Golden Vale", iconicVineyard: "Grass-based milk and butter country", imageQuery: "Golden Vale Ireland dairy cows" },
        { region: "Cork Kerry Pasture Belt", iconicVineyard: "Southwest maritime dairy farms", imageQuery: "Cork Kerry Ireland dairy farm" },
        { region: "Tipperary Waterford Milk Corridor", iconicVineyard: "Cooperative processing and pasture systems", imageQuery: "Tipperary Waterford dairy Ireland" },
        { region: "Western Pasture Dairy Zone", iconicVineyard: "Cool wet grassland milk source", imageQuery: "western Ireland dairy pasture cows" }
      ]
    })
  },
  water: {
    "united-states": commodityProfile({
      overview:
        "The United States water map starts with divides and source-to-flow logic: Rocky Mountain snowpack, the Continental Divide, Great Lakes, aquifers, and major river basins that determine where water travels.",
      imageQuery: "Rocky Mountains continental divide headwaters stream",
      location:
        "Layer water by basin rather than beverage market: Pacific-bound rivers west of the Continental Divide, Atlantic/Gulf systems to the east, Great Lakes-St. Lawrence flows, and interior aquifer systems.",
      sourceConditions:
        "Water identity follows watershed geology, snowpack, rainfall, aquifer recharge, mineral pickup, treatment, pipe/storage conditions, and seasonal flow.",
      primary: ["Snowmelt", "Spring water", "Aquifer water", "River water", "Lake water", "Municipal treated water"],
      secondary: ["Still mineral water", "Sparkling mineral water", "Spring water", "Purified water", "Brewery water", "Coffee brew water"],
      productionStyle:
        "The study model moves from source to treatment: watershed capture, mineral profile, filtration, disinfection, carbonation or demineralization where relevant, and packaging or tap delivery.",
      servingStyle:
        "Teach water by mineral profile, carbonation, temperature, glassware, food pairing, coffee/tea extraction impact, and whether the service need is hydration, palate reset, or technical brewing.",
      regulations:
        "Water is governed by source identity, drinking-water safety, treatment rules, and bottled-water labeling. Continental divides explain flow direction, not quality by themselves.",
      terminology: ["Continental Divide", "Watershed", "Aquifer", "Headwaters", "TDS", "Hardness", "Alkalinity", "Recharge"],
      resources: [
        { label: "USGS - Map of the Continental Divide in North America", url: "https://www.usgs.gov/media/images/map-continental-divide-north-america" },
        { label: "USDA Forest Service - Continental Divide Trail water flows", url: "https://www.fs.usda.gov/managing-land/trails/cdt/about-the-trail" }
      ],
      nearbyTowns: ["Glacier National Park", "Denver", "Salt Lake City", "Duluth", "New Orleans", "Seattle"],
      regions: [
        { region: "Rocky Mountain Continental Divide", iconicVineyard: "Snowpack headwaters feeding Pacific and Atlantic/Gulf systems", imageQuery: "Rocky Mountain Continental Divide headwaters" },
        { region: "Great Lakes-St. Lawrence Basin", iconicVineyard: "Freshwater lake system flowing toward the Atlantic", imageQuery: "Great Lakes freshwater shoreline" },
        { region: "Mississippi-Missouri Basin", iconicVineyard: "Interior river network flowing toward the Gulf", imageQuery: "Mississippi Missouri river basin landscape" },
        { region: "Columbia / Colorado Headwaters", iconicVineyard: "Western rivers flowing from mountain snowpack", imageQuery: "Colorado River headwaters Rocky Mountains" }
      ]
    }),
    canada: commodityProfile({
      overview:
        "Canada water study is a continental-scale source-to-flow model: Rockies snowpack, Great Lakes-St. Lawrence flow, Arctic drainage, Hudson Bay drainage, and Pacific coastal watersheds.",
      imageQuery: "Canada Rocky Mountain headwaters glacier lake",
      location:
        "Layer Canada by drainage basin: Pacific slopes west of the continental divide, Arctic and Hudson Bay systems across the interior, Atlantic/St. Lawrence flow in the east, and Great Lakes connections.",
      sourceConditions:
        "Snowpack, glaciers, boreal wetlands, lake storage, groundwater, shield geology, treatment, and seasonal melt determine water movement and mineral pickup.",
      primary: ["Glacial melt", "Lake water", "River water", "Aquifer water", "Spring water", "Municipal treated water"],
      secondary: ["Still water", "Sparkling water", "Brewing water", "Coffee brew water", "Ice water service", "Mineral water"],
      productionStyle:
        "The study model follows water from snow, glacier, lake, river, or aquifer source into treatment, bottling, brewing, or municipal service.",
      servingStyle:
        "Use Canada to teach basin scale: explain where the water flows, then discuss hardness, alkalinity, TDS, treatment, and beverage application.",
      regulations:
        "Drinking-water and bottled-water claims are governed by federal/provincial safety and labeling systems; watershed language is not a mineral analysis.",
      terminology: ["Watershed", "Drainage Basin", "Great Lakes", "Canadian Shield", "Glacial Melt", "Aquifer", "TDS", "Hardness"],
      resources: [
        { label: "Natural Resources Canada - watersheds", url: "https://natural-resources.canada.ca/" },
        { label: "Government of Canada - water", url: "https://www.canada.ca/en/environment-climate-change/services/water-overview.html" }
      ],
      nearbyTowns: ["Vancouver", "Calgary", "Winnipeg", "Toronto", "Montreal", "Yellowknife"],
      regions: [
        { region: "Canadian Rockies Divide", iconicVineyard: "Snowmelt flowing toward Pacific, Arctic, and interior basins", imageQuery: "Canadian Rockies continental divide headwaters" },
        { region: "Great Lakes St Lawrence Flow", iconicVineyard: "Freshwater lake chain draining to the Atlantic", imageQuery: "Great Lakes St Lawrence River water" },
        { region: "Hudson Bay Drainage Interior", iconicVineyard: "Prairie and boreal rivers flowing toward Hudson Bay", imageQuery: "Canada boreal river Hudson Bay watershed" },
        { region: "Pacific Coastal Watersheds", iconicVineyard: "Rainforest and mountain streams flowing to the Pacific", imageQuery: "British Columbia coastal watershed stream" }
      ]
    }),
    brasil: commodityProfile({
      overview:
        "Brasil anchors South American water study through the Amazon Basin, Pantanal/Paraguay system, Sao Francisco basin, Parana basin, and Guarani Aquifer.",
      imageQuery: "Amazon River basin Brazil rainforest water",
      location:
        "Layer Brazil by basin: Amazon flow toward the Atlantic, Pantanal and Paraguay-Parana wetlands, Sao Francisco interior river, and southern aquifer systems.",
      sourceConditions:
        "Rainfall, rainforest evapotranspiration, wetlands, sediment load, aquifer recharge, river seasonality, treatment, and urban distribution define practical water identity.",
      primary: ["River water", "Rain-fed basin water", "Wetland water", "Aquifer water", "Spring water", "Municipal treated water"],
      secondary: ["Still water", "Mineral water", "Brewing water", "Coffee brew water", "Sparkling water", "Service water"],
      productionStyle:
        "Water study follows basin source and treatment: capture, sediment management, filtration, disinfection, mineral analysis, and use in beverages.",
      servingStyle:
        "Use Brazil for basin literacy: Amazon is flow scale, Guarani is aquifer scale, and mineral or service claims require analysis.",
      regulations:
        "Water safety, bottled-water identity, and mineral claims depend on Brazilian health and food regulation plus source-specific documentation.",
      terminology: ["Amazon Basin", "Guarani Aquifer", "Pantanal", "Watershed", "Recharge", "Sediment Load", "TDS", "Treatment"],
      resources: [
        { label: "ANA - National Water and Sanitation Agency", url: "https://www.gov.br/ana/" },
        { label: "FAO AQUASTAT", url: "https://www.fao.org/aquastat/" }
      ],
      nearbyTowns: ["Manaus", "Belem", "Brasilia", "Cuiaba", "Sao Paulo", "Foz do Iguacu"],
      regions: [
        { region: "Amazon Basin Atlantic Flow", iconicVineyard: "World-scale rainforest river system flowing east", imageQuery: "Amazon River Brazil rainforest aerial" },
        { region: "Guarani Aquifer Source Zone", iconicVineyard: "Southern groundwater recharge and mineral-water context", imageQuery: "Guarani Aquifer Brazil springs" },
        { region: "Pantanal Paraguay Wetland Flow", iconicVineyard: "Seasonal wetland river basin", imageQuery: "Pantanal Brazil wetland river" },
        { region: "Sao Francisco Interior Basin", iconicVineyard: "Northeast river corridor and water-transfer context", imageQuery: "Sao Francisco River Brazil water" }
      ]
    }),
    iceland: commodityProfile({
      overview:
        "Iceland gives European water study a clean volcanic and glacial source model: spring water, basalt filtration, geothermal context, glacial rivers, and North Atlantic flow.",
      imageQuery: "Iceland glacial spring basalt water landscape",
      location:
        "Study glaciers and highlands, volcanic spring systems, geothermal areas, and short river systems flowing outward to the North Atlantic and Arctic-adjacent seas.",
      sourceConditions:
        "Basalt geology, glacial melt, volcanic aquifers, low population pressure, geothermal activity, and treatment choices shape water identity.",
      primary: ["Spring water", "Glacial melt", "Volcanic aquifer water", "Geothermal water", "River water", "Municipal treated water"],
      secondary: ["Still water", "Sparkling water", "Mineral water", "Coffee brew water", "Brewery water", "Thermal bathing water"],
      productionStyle:
        "The water model follows volcanic filtration, spring capture, glacial flow, municipal treatment, bottling, and technical beverage adjustment.",
      servingStyle:
        "Use Iceland for low-mineral and volcanic-source language, but verify TDS and treatment data before making taste claims.",
      regulations:
        "European and Icelandic drinking-water and bottled-water standards control safety, source, and mineral claims.",
      terminology: ["Basalt Filtration", "Glacial Melt", "Geothermal", "Spring Water", "Aquifer", "TDS", "Silica", "Watershed"],
      resources: [
        { label: "Environment Agency of Iceland", url: "https://ust.is/" },
        { label: "European Environment Agency - water", url: "https://www.eea.europa.eu/en/topics/in-depth/water" }
      ],
      nearbyTowns: ["Reykjavik", "Akureyri", "Selfoss", "Vik", "Egilsstadir"],
      regions: [
        { region: "Langjokull Glacial Flow", iconicVineyard: "Glacial melt and volcanic terrain source", imageQuery: "Langjokull Iceland glacial river" },
        { region: "Thingvellir Rift Waters", iconicVineyard: "Rift valley and spring-fed lake systems", imageQuery: "Thingvellir Iceland water spring rift" },
        { region: "South Coast Glacial Rivers", iconicVineyard: "Short rivers flowing to the North Atlantic", imageQuery: "Iceland south coast glacial river" },
        { region: "Geothermal Spring Systems", iconicVineyard: "Hot-water geology separated from drinking-water service", imageQuery: "Iceland geothermal spring water" }
      ]
    }),
    ethiopia: commodityProfile({
      overview:
        "Ethiopia anchors African water study through highland source geography: Blue Nile headwaters, Rift Valley lakes, Awash basin, and seasonal rainfall systems.",
      imageQuery: "Ethiopia Blue Nile highlands Lake Tana water",
      location:
        "Layer Lake Tana and the Blue Nile/Abay, the Ethiopian Rift lakes, Awash interior basin, and highland catchments that feed major regional systems.",
      sourceConditions:
        "Elevation, seasonal rain, volcanic rift geology, lake storage, sediment, irrigation withdrawals, groundwater recharge, and treatment shape use and service.",
      primary: ["Highland rainwater", "Lake water", "River water", "Rift groundwater", "Spring water", "Municipal treated water"],
      secondary: ["Still water", "Mineral water", "Coffee brew water", "Tea water", "Sparkling water", "Service water"],
      productionStyle:
        "Source-to-flow study moves from highland rainfall and lakes into river basins, treatment, bottling, irrigation, and beverage preparation.",
      servingStyle:
        "Use Ethiopia to explain headwaters and basin flow before mineral claims; for coffee service, discuss brew-water hardness and treatment separately.",
      regulations:
        "Water safety, bottled-water claims, and mineral identity require national standards and source-specific testing.",
      terminology: ["Blue Nile", "Lake Tana", "Rift Valley", "Awash Basin", "Headwaters", "Catchment", "Recharge", "TDS"],
      resources: [
        { label: "Nile Basin Initiative", url: "https://nilebasin.org/" },
        { label: "FAO AQUASTAT - Ethiopia", url: "https://www.fao.org/aquastat/" }
      ],
      nearbyTowns: ["Addis Ababa", "Bahir Dar", "Adama", "Hawassa", "Dire Dawa"],
      regions: [
        { region: "Lake Tana Blue Nile Headwaters", iconicVineyard: "Highland source flowing toward the Nile system", imageQuery: "Lake Tana Blue Nile Ethiopia waterfall" },
        { region: "Ethiopian Rift Lake Chain", iconicVineyard: "Rift lakes and mineral-water context", imageQuery: "Ethiopian Rift Valley lake water" },
        { region: "Awash Interior Basin", iconicVineyard: "Closed and semi-arid basin water use", imageQuery: "Awash River Ethiopia water" },
        { region: "Simien Highland Catchments", iconicVineyard: "Mountain rainfall and headwater streams", imageQuery: "Simien Mountains Ethiopia stream" }
      ]
    }),
    china: commodityProfile({
      overview:
        "China water study is led by Asian headwaters and basin scale: Tibetan Plateau sources, Yangtze, Yellow River, Pearl River, and major groundwater or transfer systems.",
      imageQuery: "Tibetan Plateau China river headwaters glacier",
      location:
        "Layer western highland sources, north China river basins, southern monsoon rivers, and engineered transfer corridors. The Tibetan Plateau is the continent-scale headwater frame.",
      sourceConditions:
        "Glacial melt, monsoon rain, loess sediment, plateau geology, reservoirs, groundwater withdrawals, treatment, and urban distribution shape water use.",
      primary: ["Glacial melt", "River water", "Reservoir water", "Groundwater", "Spring water", "Municipal treated water"],
      secondary: ["Still water", "Mineral water", "Tea brewing water", "Brewery water", "Sparkling water", "Service water"],
      productionStyle:
        "The water model follows headwater source, basin movement, reservoir/treatment systems, bottling, and beverage-specific mineral adjustment.",
      servingStyle:
        "Use China to connect tea service to water quality, but separate poetic mountain-source claims from measured hardness, alkalinity, and TDS.",
      regulations:
        "Drinking-water safety, bottled-water standards, and source claims require regulatory and laboratory support.",
      terminology: ["Tibetan Plateau", "Yangtze", "Yellow River", "Pearl River", "South-North Transfer", "Watershed", "TDS", "Hardness"],
      resources: [
        { label: "Ministry of Water Resources of China", url: "http://www.mwr.gov.cn/english/" },
        { label: "FAO AQUASTAT - China", url: "https://www.fao.org/aquastat/" }
      ],
      nearbyTowns: ["Chengdu", "Lhasa", "Wuhan", "Shanghai", "Xi'an", "Guangzhou"],
      regions: [
        { region: "Tibetan Plateau Headwaters", iconicVineyard: "High Asia source for major river systems", imageQuery: "Tibetan Plateau river headwaters glacier" },
        { region: "Yangtze Basin Flow", iconicVineyard: "Major west-to-east river basin", imageQuery: "Yangtze River China water basin" },
        { region: "Yellow River Loess Basin", iconicVineyard: "Sediment-rich northern river system", imageQuery: "Yellow River China loess water" },
        { region: "Pearl River Monsoon Basin", iconicVineyard: "Southern humid river and delta flow", imageQuery: "Pearl River China water delta" }
      ]
    }),
    australia: commodityProfile({
      overview:
        "Australia anchors Oceania water study with the Great Dividing Range, Murray-Darling Basin, artesian groundwater, monsoon north, and short coastal rivers.",
      imageQuery: "Australia Great Dividing Range headwaters river",
      location:
        "Layer eastern divide flows, inland Murray-Darling drainage, Great Artesian Basin groundwater, tropical northern catchments, and Western Australian aquifers.",
      sourceConditions:
        "Rainfall variability, drought, evaporation, salinity, aquifer recharge, river regulation, treatment, and mineral composition drive practical water identity.",
      primary: ["River water", "Rain-fed catchment water", "Artesian groundwater", "Aquifer water", "Desalinated water", "Municipal treated water"],
      secondary: ["Still water", "Sparkling water", "Brewing water", "Coffee brew water", "Mineral water", "Service water"],
      productionStyle:
        "The water model follows catchment, storage, treatment, desalination or groundwater where needed, and beverage-specific mineral adjustment.",
      servingStyle:
        "Use Australia for divide and drought literacy: basin flow direction, salinity, hardness, and treatment matter more than broad national taste claims.",
      regulations:
        "Drinking-water guidelines, state water agencies, and bottled-water rules shape source, treatment, and safety claims.",
      terminology: ["Great Dividing Range", "Murray-Darling", "Great Artesian Basin", "Catchment", "Salinity", "Desalination", "Hardness", "TDS"],
      resources: [
        { label: "Bureau of Meteorology - water", url: "https://www.bom.gov.au/water/" },
        { label: "Murray-Darling Basin Authority", url: "https://www.mdba.gov.au/" }
      ],
      nearbyTowns: ["Sydney", "Melbourne", "Canberra", "Adelaide", "Brisbane", "Perth"],
      regions: [
        { region: "Great Dividing Range Headwaters", iconicVineyard: "Eastern divide feeding coastal and inland basins", imageQuery: "Great Dividing Range headwaters Australia" },
        { region: "Murray Darling Basin", iconicVineyard: "Interior river system flowing toward South Australia", imageQuery: "Murray Darling River basin Australia" },
        { region: "Great Artesian Basin", iconicVineyard: "Deep groundwater source across inland Australia", imageQuery: "Great Artesian Basin Australia spring" },
        { region: "Northern Monsoon Catchments", iconicVineyard: "Wet-season tropical river flow", imageQuery: "northern Australia monsoon river" }
      ]
    }),
    "new-zealand": commodityProfile({
      overview:
        "New Zealand water study is compact and visual: Southern Alps divide, glacier-fed rivers, short coastal catchments, volcanic aquifers, and high-rainfall western flows.",
      imageQuery: "New Zealand Southern Alps glacier river water",
      location:
        "Layer South Island alpine headwaters, Canterbury plains aquifers, West Coast rainfall rivers, North Island volcanic systems, and short rivers flowing to the Pacific or Tasman Sea.",
      sourceConditions:
        "Snow, glaciers, rainfall, volcanic geology, gravel aquifers, pasture catchments, treatment, and mineral pickup shape water identity.",
      primary: ["Glacial melt", "Rain-fed river water", "Aquifer water", "Spring water", "Volcanic groundwater", "Municipal treated water"],
      secondary: ["Still water", "Sparkling water", "Coffee brew water", "Brewery water", "Mineral water", "Service water"],
      productionStyle:
        "Water moves quickly from mountain or volcanic source to rivers, aquifers, treatment, bottling, and beverage use.",
      servingStyle:
        "Use New Zealand for source clarity and short catchment stories; verify mineral content before promising softness or purity.",
      regulations:
        "Drinking-water standards, source protection, and bottled-water labeling control safety and claims.",
      terminology: ["Southern Alps", "Catchment", "Aquifer", "Glacial Melt", "Volcanic Spring", "Gravel Plain", "TDS", "Hardness"],
      resources: [
        { label: "New Zealand Ministry for the Environment - freshwater", url: "https://environment.govt.nz/what-government-is-doing/areas-of-work/freshwater/" },
        { label: "Taumata Arowai - drinking water regulator", url: "https://www.taumataarowai.govt.nz/" }
      ],
      nearbyTowns: ["Queenstown", "Christchurch", "Nelson", "Rotorua", "Auckland", "Invercargill"],
      regions: [
        { region: "Southern Alps Divide", iconicVineyard: "Alpine headwaters flowing toward Tasman and Pacific sides", imageQuery: "Southern Alps New Zealand river headwaters" },
        { region: "Canterbury Gravel Aquifers", iconicVineyard: "Braided rivers and plains groundwater", imageQuery: "Canterbury New Zealand braided river aquifer" },
        { region: "West Coast Rainfall Rivers", iconicVineyard: "Short high-rainfall rivers to the Tasman Sea", imageQuery: "New Zealand West Coast rainforest river" },
        { region: "Rotorua Volcanic Springs", iconicVineyard: "Volcanic groundwater and geothermal context", imageQuery: "Rotorua New Zealand volcanic spring water" }
      ]
    })
  }
} satisfies Partial<Record<CommodityCategoryId, Record<string, CountryProfile>>>;
