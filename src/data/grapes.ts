export type GrapeColor = "red" | "white";

export type GrapeProfile = {
  slug: string;
  name: string;
  color: GrapeColor;
  headline: string;
  staticImageUrl?: string;
  staticImageCaption?: string;
  turntableImageUrl?: string;
  turntableFrameUrls?: string[];
  turntableFrameColumns?: number;
  turntableFrameRows?: number;
  turntableFrameCount?: number;
  origin: string;
  classicRegions: string[];
  benchmarkStyles: string[];
  sensoryMarkers: string[];
  structure: {
    acidity: string;
    tanninOrPhenolics: string;
    body: string;
    alcohol: string;
  };
  beginner: string[];
  advanced: string[];
  pro: string[];
  examKeys: string[];
};

const redGrapes: GrapeProfile[] = [
  {
    slug: "cabernet-franc",
    name: "Cabernet Franc",
    color: "red",
    headline: "A perfumed, savory parent grape that links the Loire, Bordeaux, and many modern cool-climate reds.",
    staticImageUrl: "/grapes/cabernet-franc-static.png",
    staticImageCaption: "Macro reference photo for identifying Cabernet Franc berry color, bloom, stem structure, and cluster density.",
    turntableImageUrl: "/grapes/cabernet-franc-turntable-clean-sheet.png",
    turntableFrameUrls: [
      "/grapes/cabernet-franc-turntable-margin-01.png",
      "/grapes/cabernet-franc-turntable-margin-02.png",
      "/grapes/cabernet-franc-turntable-margin-03.png",
      "/grapes/cabernet-franc-turntable-margin-04.png",
      "/grapes/cabernet-franc-turntable-margin-05.png",
      "/grapes/cabernet-franc-turntable-margin-06.png",
      "/grapes/cabernet-franc-turntable-margin-07.png",
      "/grapes/cabernet-franc-turntable-margin-08.png",
      "/grapes/cabernet-franc-turntable-margin-09.png",
      "/grapes/cabernet-franc-turntable-margin-10.png",
      "/grapes/cabernet-franc-turntable-margin-11.png",
      "/grapes/cabernet-franc-turntable-margin-12.png"
    ],
    turntableFrameColumns: 3,
    turntableFrameRows: 4,
    turntableFrameCount: 12,
    origin: "Western France, with deep historical importance in Bordeaux and the Loire Valley.",
    classicRegions: ["Chinon", "Bourgueil", "Saumur-Champigny", "Saint-Emilion", "Pomerol", "Niagara Peninsula"],
    benchmarkStyles: ["Loire varietal reds", "Right Bank Bordeaux blends", "cool-climate New World Cabernet Franc"],
    sensoryMarkers: ["red currant", "raspberry leaf", "violet", "graphite", "bell pepper", "fine herbs"],
    structure: {
      acidity: "medium-plus to high",
      tanninOrPhenolics: "medium, often fine-grained",
      body: "medium",
      alcohol: "moderate in cool climates, fuller in warm sites"
    },
    beginner: [
      "Cabernet Franc is one of the best grapes for learning the difference between fruit, herb, and earth in red wine. It often tastes red-fruited rather than black-fruited, with raspberry, red currant, violet, pencil lead, and a green herbal note that can read as bell pepper or fresh tobacco.",
      "Students should first place it between Pinot Noir and Cabernet Sauvignon: more aromatic and herbal than Merlot, usually lighter and less tannic than Cabernet Sauvignon, but more structured and savory than Gamay.",
      "A useful first benchmark is Chinon or Bourgueil from the Loire. These wines show high freshness, moderate body, and a leafy aromatic signature that becomes more complex with bottle age."
    ],
    advanced: [
      "Cabernet Franc buds and ripens earlier than Cabernet Sauvignon, which helps explain its success in cooler Loire sites and its value in Bordeaux blends where it can add perfume, lift, and aromatic detail.",
      "Its methoxypyrazine character is central to exam theory. In underripe fruit it can become aggressively green, while in balanced wines it supports a savory profile of herbs, tobacco leaf, and graphite.",
      "In the Loire, limestone tuffeau, gravel, and clay can create different expressions: more floral and lifted wines from limestone-influenced sites, broader fruit from warmer gravel, and firmer structure from clay-rich parcels."
    ],
    pro: [
      "For blind tasting, separate Cabernet Franc from Cabernet Sauvignon by weight and tannin. Cabernet Franc usually gives redder fruit, more floral top notes, less cassis, and a more delicate tannin frame.",
      "In Right Bank Bordeaux, Cabernet Franc can be a minority blending component or a major structural voice. In Saint-Emilion and Pomerol, it often sharpens Merlot with freshness, spice, and aromatic precision.",
      "At advanced exam levels, be ready to discuss how climate change may increase Cabernet Franc's role in regions that historically relied on later-ripening Cabernet Sauvignon."
    ],
    examKeys: [
      "Parent of Cabernet Sauvignon with Sauvignon Blanc.",
      "Key Loire appellations: Chinon, Bourgueil, Saumur-Champigny.",
      "Classic markers: red fruit, violet, graphite, herbs, bell pepper.",
      "Earlier ripening and generally lighter structure than Cabernet Sauvignon."
    ]
  },
  {
    slug: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    color: "red",
    headline: "The archetype of structured, age-worthy red wine, defined by small berries, thick skins, and black-fruited intensity.",
    origin: "Bordeaux, from a natural crossing of Cabernet Franc and Sauvignon Blanc.",
    classicRegions: ["Medoc", "Graves", "Napa Valley", "Coonawarra", "Maipo Valley", "Bolgheri"],
    benchmarkStyles: ["Left Bank Bordeaux", "Napa Cabernet", "Coonawarra Cabernet", "Super Tuscan blends"],
    sensoryMarkers: ["blackcurrant", "black cherry", "cedar", "mint", "graphite", "green peppercorn"],
    structure: {
      acidity: "medium-plus",
      tanninOrPhenolics: "high, often firm",
      body: "medium-plus to full",
      alcohol: "moderate in Bordeaux, high in warm New World sites"
    },
    beginner: [
      "Cabernet Sauvignon is a cornerstone grape for certification study because its structure is easy to recognize: deep color, firm tannins, black fruit, and a strong ability to age.",
      "In youth it often shows cassis, black cherry, cedar, mint, and sometimes a green edge. With age, it can move toward cigar box, dried herbs, leather, graphite, and forest floor.",
      "Beginners should compare Bordeaux and Napa. Bordeaux is typically more restrained and savory; Napa is often riper, fuller, and more polished in fruit expression."
    ],
    advanced: [
      "Small berries and thick skins give Cabernet Sauvignon high phenolic potential. This explains its color, tannin, and affinity for oak aging.",
      "Warmth determines ripeness style. Too cool and the wine can taste hard and green; too warm and it can become jammy, high-alcohol, and less defined.",
      "Classic Left Bank Bordeaux blends Cabernet Sauvignon with Merlot, Cabernet Franc, Petit Verdot, and sometimes Malbec to balance tannin, mid-palate, aroma, and color."
    ],
    pro: [
      "For blind tasting, look for the structural triangle of high tannin, medium-plus acid, and blackcurrant fruit. Oak often adds cedar, vanilla, clove, or tobacco.",
      "Coonawarra often shows cassis and eucalyptus or mint over terra rossa soils. Maipo can show black fruit, herbal lift, and polished tannic structure.",
      "At pro level, connect site to tannin quality: gravel drainage in the Medoc, mountain tension in Napa, and maritime moderation in premium Chilean and Australian examples."
    ],
    examKeys: [
      "Natural cross: Cabernet Franc x Sauvignon Blanc.",
      "Left Bank Bordeaux is the classic Old World benchmark.",
      "High tannin and thick skins support long aging.",
      "Common markers: cassis, cedar, graphite, mint, tobacco."
    ]
  },
  {
    slug: "carmenere",
    name: "Carmenere",
    color: "red",
    headline: "A late-ripening Bordeaux grape now most closely identified with Chile's plush, spicy red wines.",
    origin: "Bordeaux, now strongly associated with Chile after being long confused with Merlot.",
    classicRegions: ["Colchagua Valley", "Maipo Valley", "Cachapoal Valley", "Aconcagua Valley"],
    benchmarkStyles: ["Chilean Carmenere", "Carmenere-led Bordeaux-style blends"],
    sensoryMarkers: ["black plum", "blackberry", "paprika", "green pepper", "cocoa", "smoke"],
    structure: {
      acidity: "medium",
      tanninOrPhenolics: "medium, often soft and broad",
      body: "medium-plus to full",
      alcohol: "moderate to high"
    },
    beginner: [
      "Carmenere gives dark fruit with a distinctive savory spice. Students often remember it through black plum, blackberry, paprika, roasted pepper, and soft tannin.",
      "It is Chile's signature red grape in many study programs, though its historical origin is Bordeaux.",
      "Beginners should learn that Carmenere needs warmth and a long season. If picked too early, its green pepper note can dominate."
    ],
    advanced: [
      "Carmenere ripens later than Merlot, which explains why historical confusion between the two grapes produced uneven results until Chilean vineyards were reidentified.",
      "The grape's pyrazine character can be attractive when balanced by ripe fruit, but excessive greenness often signals insufficient ripeness.",
      "Chile's dry climate and long autumns are well suited to Carmenere because they allow late phenolic maturity while reducing disease pressure."
    ],
    pro: [
      "In blind tasting, distinguish Carmenere from Merlot by its paprika, herbal spice, darker fruit, and sometimes smoky cocoa-like finish.",
      "Premium examples can use oak to build texture, but the best wines keep the herbal signature integrated rather than masking it.",
      "For theory exams, connect Carmenere to Chilean identity, Bordeaux heritage, late ripening, and pyrazine management."
    ],
    examKeys: [
      "Bordeaux origin, modern home in Chile.",
      "Often confused historically with Merlot.",
      "Late ripening with prominent pyrazine potential.",
      "Markers: black plum, paprika, green pepper, cocoa."
    ]
  },
  {
    slug: "corvina",
    name: "Corvina",
    color: "red",
    headline: "The fragrant backbone of Valpolicella, Bardolino, Ripasso, and Amarone.",
    origin: "Northeastern Italy, especially Veneto.",
    classicRegions: ["Valpolicella", "Valpolicella Classico", "Amarone della Valpolicella", "Bardolino"],
    benchmarkStyles: ["Valpolicella", "Ripasso", "Amarone", "Recioto della Valpolicella"],
    sensoryMarkers: ["sour cherry", "red plum", "almond", "dried herbs", "bitter cocoa", "dried cherry"],
    structure: {
      acidity: "medium-plus to high",
      tanninOrPhenolics: "low to medium",
      body: "light to medium, full in dried-grape styles",
      alcohol: "moderate, high in Amarone"
    },
    beginner: [
      "Corvina is the key grape of Valpolicella. It usually shows bright cherry fruit, fresh acidity, moderate color, and a gently bitter almond-like finish.",
      "Students should understand that Corvina can produce both light, fresh reds and powerful Amarone, depending on whether grapes are dried before fermentation.",
      "The basic comparison is simple: Valpolicella is fresh and light; Ripasso is richer; Amarone is dry, full-bodied, and high in alcohol."
    ],
    advanced: [
      "Corvina's loose clusters and thickish skins make it suitable for appassimento, the drying process that concentrates sugar, flavor, and extract.",
      "It is often blended with Corvinone, Rondinella, and sometimes other local grapes to build aroma, color, and structural balance.",
      "In Amarone, drying changes the flavor register from fresh cherry toward dried cherry, fig, chocolate, spice, and a warming finish."
    ],
    pro: [
      "In blind tasting, fresh Valpolicella can resemble a high-acid, low-tannin red with sour cherry and herbs, while Amarone is identified by dried fruit concentration and elevated alcohol.",
      "For exams, know the difference between Amarone and Recioto: Amarone is dry or near dry, while Recioto is sweet.",
      "Ripasso gains body by refermenting or macerating with Amarone or Recioto pomace, linking technique directly to style."
    ],
    examKeys: [
      "Principal grape of Valpolicella and Amarone.",
      "Appassimento is central to Amarone and Recioto.",
      "High acidity, cherry fruit, moderate color.",
      "Often blended with Corvinone and Rondinella."
    ]
  },
  {
    slug: "gamay",
    name: "Gamay",
    color: "red",
    headline: "A fresh, floral red grape best known through Beaujolais and its granite-backed cru villages.",
    origin: "Eastern France, with its most important home in Beaujolais.",
    classicRegions: ["Beaujolais", "Morgon", "Fleurie", "Moulin-a-Vent", "Brouilly", "Chiroubles"],
    benchmarkStyles: ["Beaujolais Nouveau", "Beaujolais-Villages", "Beaujolais Cru"],
    sensoryMarkers: ["red cherry", "raspberry", "banana", "violet", "peony", "granite dust"],
    structure: {
      acidity: "medium-plus to high",
      tanninOrPhenolics: "low to medium",
      body: "light to medium",
      alcohol: "moderate"
    },
    beginner: [
      "Gamay is usually bright, juicy, and easy to read in the glass. Expect red cherry, raspberry, violet, and a light-to-medium body.",
      "Many introductory examples use carbonic or semi-carbonic maceration, which can add banana, bubblegum, or candied fruit notes.",
      "Beginners should learn the hierarchy from simple Beaujolais to Beaujolais-Villages to the ten crus, which can be more structured and age-worthy."
    ],
    advanced: [
      "Gamay performs well on the granitic soils of northern Beaujolais, where crus such as Morgon and Moulin-a-Vent can deliver more depth and tannic grip.",
      "Winemaking decisions strongly affect style. Carbonic maceration emphasizes fruit and aroma; traditional fermentation can build more texture and savory complexity.",
      "Cru identity matters: Fleurie is often floral and silky, Morgon more earthy and structured, and Moulin-a-Vent among the firmest and longest-lived."
    ],
    pro: [
      "For blind tasting, Gamay often sits between Pinot Noir and simple light reds: high acid, low tannin, vivid red fruit, and sometimes carbonic fermentation markers.",
      "Do not assume all Gamay is simple. Top cru Beaujolais can develop forest floor, spice, dried flowers, and mineral depth with age.",
      "Exam answers should connect grape, place, technique, and hierarchy rather than treating Beaujolais as a single style."
    ],
    examKeys: [
      "Principal grape of Beaujolais.",
      "Carbonic and semi-carbonic maceration are common.",
      "High acid, low tannin, red fruit, floral notes.",
      "Cru Beaujolais can be serious and age-worthy."
    ]
  },
  {
    slug: "grenache",
    name: "Grenache",
    color: "red",
    headline: "A heat-loving Mediterranean grape that gives generous red fruit, spice, and warmth.",
    origin: "Northeastern Spain, where it is known as Garnacha, with major importance across southern France.",
    classicRegions: ["Chateauneuf-du-Pape", "Gigondas", "Priorat", "Calatayud", "Campo de Borja", "Sardinia"],
    benchmarkStyles: ["Southern Rhone blends", "Spanish Garnacha", "Priorat blends", "Grenache-based rose"],
    sensoryMarkers: ["strawberry", "raspberry jam", "white pepper", "garrigue", "licorice", "dried orange peel"],
    structure: {
      acidity: "medium to low",
      tanninOrPhenolics: "medium",
      body: "medium-plus to full",
      alcohol: "high"
    },
    beginner: [
      "Grenache is generous and warm. It often tastes of ripe strawberry, raspberry, spice, and Mediterranean herbs.",
      "It is a major blending grape in the southern Rhone, where it contributes alcohol, red fruit, and softness to blends with Syrah, Mourvedre, and other grapes.",
      "Beginners should remember that Grenache likes heat and drought, and often produces wines with high alcohol and moderate color."
    ],
    advanced: [
      "Grenache buds early and ripens late, so it needs a long growing season. Its drought tolerance and strong wood make it well suited to dry, windy Mediterranean zones.",
      "Because it can oxidize easily and lose color, careful handling matters. Old vines are especially prized for concentration and balance.",
      "In Priorat, Garnacha often gains intensity from low-yielding old vines on llicorella slate, producing darker, more mineral, more powerful wines."
    ],
    pro: [
      "For blind tasting, look for high alcohol, red fruit, spice, and relatively soft acidity. Grenache often feels broad rather than linear.",
      "Distinguish southern Rhone Grenache blends from Syrah by color, tannin, and fruit register: Grenache is often paler, warmer, redder-fruited, and less peppery.",
      "For theory, connect Grenache to drought tolerance, old vines, bush training, and Mediterranean blending culture."
    ],
    examKeys: [
      "Known as Garnacha in Spain.",
      "Central to southern Rhone and Priorat.",
      "High alcohol, red fruit, spice, moderate color.",
      "Drought tolerant and often bush trained."
    ]
  },
  {
    slug: "malbec",
    name: "Malbec",
    color: "red",
    headline: "A deeply colored red grape that bridges Cahors structure and Mendoza altitude-driven plushness.",
    origin: "Southwest France, especially Cahors, with modern global fame in Argentina.",
    classicRegions: ["Cahors", "Mendoza", "Uco Valley", "Lujan de Cuyo", "Salta"],
    benchmarkStyles: ["Cahors Malbec", "Mendoza Malbec", "high-altitude Argentine Malbec"],
    sensoryMarkers: ["black plum", "blueberry", "violet", "cocoa", "black pepper", "smoke"],
    structure: {
      acidity: "medium",
      tanninOrPhenolics: "medium-plus, often plush",
      body: "medium-plus to full",
      alcohol: "moderate to high"
    },
    beginner: [
      "Malbec is known for deep color, dark fruit, and a plush mouthfeel. Common notes include black plum, blackberry, blueberry, violet, cocoa, and spice.",
      "Argentina is the most important modern benchmark, especially Mendoza, where high altitude helps preserve freshness in a sunny climate.",
      "Beginners should compare Mendoza Malbec with Cahors: Argentina is often riper and softer; Cahors can be more tannic, rustic, and savory."
    ],
    advanced: [
      "Malbec is sensitive to frost and coulure, which partly explains why it declined in Bordeaux but found success in dry, sunny Argentine sites.",
      "Altitude in Mendoza affects diurnal range, sunlight intensity, acid retention, and aromatic clarity. Uco Valley examples often show freshness and floral lift.",
      "Oak can add chocolate, vanilla, and smoke, but the best examples keep the violet and dark-fruit core clear."
    ],
    pro: [
      "In blind tasting, Malbec often shows opaque color and dark fruit without the Cabernet Sauvignon signature of cassis, cedar, and very firm tannin.",
      "Cahors theory requires knowing that Malbec may be called Cot or Auxerrois locally and must dominate the appellation blend.",
      "At pro level, discuss the relationship between altitude, irrigation from Andean snowmelt, alluvial soils, and ripeness management in Mendoza."
    ],
    examKeys: [
      "French origin, Argentine signature grape.",
      "Cahors is the classic French benchmark.",
      "Deep color, dark fruit, violet, plush tannin.",
      "Altitude is central to Mendoza quality."
    ]
  },
  {
    slug: "merlot",
    name: "Merlot",
    color: "red",
    headline: "A supple, early-ripening Bordeaux grape that brings plum fruit, texture, and mid-palate generosity.",
    origin: "Bordeaux, especially important on the Right Bank.",
    classicRegions: ["Pomerol", "Saint-Emilion", "Bordeaux Superieur", "Napa Valley", "Tuscany", "Washington State"],
    benchmarkStyles: ["Right Bank Bordeaux", "Merlot-led blends", "New World varietal Merlot"],
    sensoryMarkers: ["plum", "black cherry", "chocolate", "bay leaf", "cedar", "fig"],
    structure: {
      acidity: "medium",
      tanninOrPhenolics: "medium to medium-plus",
      body: "medium-plus",
      alcohol: "moderate to high"
    },
    beginner: [
      "Merlot is often softer and rounder than Cabernet Sauvignon, with plum, black cherry, chocolate, and gentle herbal notes.",
      "It is crucial in Bordeaux, especially on the Right Bank, where it thrives on clay-rich soils and ripens earlier than Cabernet Sauvignon.",
      "Beginners should remember that Merlot can be simple and fruity, but top Pomerol and Saint-Emilion can be among the world's most age-worthy wines."
    ],
    advanced: [
      "Merlot's earlier ripening makes it useful in cooler or wetter Bordeaux vintages, though it can become overripe and lose freshness in excessive heat.",
      "Clay soils help moderate water stress and support Merlot's texture, while limestone can add freshness and structural line in Saint-Emilion.",
      "Blending with Cabernet Franc adds perfume and lift; Cabernet Sauvignon can add firmer tannin and black-fruited structure."
    ],
    pro: [
      "In blind tasting, Merlot often shows a plush mid-palate, plum fruit, softer tannin, and chocolate tones compared with Cabernet Sauvignon.",
      "Pomerol can be Merlot-dominant and powerful without being aggressively tannic. Saint-Emilion varies widely depending on soil, blend, and producer choices.",
      "For exams, be able to explain why Merlot dominates the Right Bank: climate timing, soil affinity, and blend architecture."
    ],
    examKeys: [
      "Key grape of Right Bank Bordeaux.",
      "Earlier ripening than Cabernet Sauvignon.",
      "Plum, black cherry, chocolate, soft texture.",
      "Clay and limestone are important soil associations."
    ]
  },
  {
    slug: "nebbiolo",
    name: "Nebbiolo",
    color: "red",
    headline: "A pale-looking but fiercely structured grape responsible for Barolo and Barbaresco.",
    origin: "Piedmont in northwestern Italy.",
    classicRegions: ["Barolo", "Barbaresco", "Gattinara", "Ghemme", "Roero", "Valtellina"],
    benchmarkStyles: ["Barolo", "Barbaresco", "Alto Piemonte Nebbiolo", "Valtellina Superiore"],
    sensoryMarkers: ["rose", "sour cherry", "tar", "licorice", "truffle", "orange peel"],
    structure: {
      acidity: "high",
      tanninOrPhenolics: "high",
      body: "medium to medium-plus",
      alcohol: "moderate to high"
    },
    beginner: [
      "Nebbiolo teaches students not to judge structure by color alone. It can look pale garnet but deliver intense tannin and acidity.",
      "Classic aromas include rose, cherry, tar, licorice, dried herbs, and eventually truffle or leather with age.",
      "Beginners should anchor Nebbiolo in Barolo and Barbaresco, two Piedmont appellations that are essential for certification theory."
    ],
    advanced: [
      "Nebbiolo buds early and ripens late, making site selection critical. It needs enough warmth and exposure to ripen tannins while retaining acidity.",
      "In Barolo, communes and vineyard aspects matter. La Morra and Barolo are often more perfumed and approachable, while Serralunga d'Alba and Monforte d'Alba can be more powerful and tannic.",
      "Traditional long maceration and large old casks emphasize structure and savory complexity; modern approaches may use shorter extraction and smaller oak."
    ],
    pro: [
      "For blind tasting, high acid plus high tannin plus pale color is a classic Nebbiolo clue. Rose, tar, sour cherry, and orange peel reinforce the call.",
      "Do not confuse Nebbiolo's tannin with Cabernet Sauvignon. Nebbiolo tannin can feel angular and drying, but the fruit and aromatic register are red, floral, and savory rather than blackcurrant-led.",
      "For theory, be ready to discuss Barolo aging requirements, Barbaresco's relative elegance, and the importance of MGA or vineyard names in modern labeling."
    ],
    examKeys: [
      "Barolo and Barbaresco are the key benchmarks.",
      "Pale color but high tannin and high acidity.",
      "Rose, tar, sour cherry, truffle with age.",
      "Early budding, late ripening, site-sensitive."
    ]
  },
  {
    slug: "pinot-noir",
    name: "Pinot Noir",
    color: "red",
    headline: "A thin-skinned, site-sensitive red grape that rewards cool climates and precise viticulture.",
    origin: "Burgundy, with ancient roots in eastern France.",
    classicRegions: ["Bourgogne", "Cote de Nuits", "Cote de Beaune", "Willamette Valley", "Sonoma Coast", "Central Otago"],
    benchmarkStyles: ["red Burgundy", "New World cool-climate Pinot Noir", "traditional-method sparkling base wine"],
    sensoryMarkers: ["red cherry", "strawberry", "raspberry", "violet", "mushroom", "forest floor"],
    structure: {
      acidity: "medium-plus to high",
      tanninOrPhenolics: "low to medium",
      body: "light to medium",
      alcohol: "moderate"
    },
    beginner: [
      "Pinot Noir is usually pale to medium in color with red fruit, floral notes, fresh acidity, and gentle tannins.",
      "It is the great red grape of Burgundy and also an important grape for Champagne and other traditional-method sparkling wines.",
      "Beginners should learn that Pinot Noir is not about power first. Its quality is usually expressed through aroma, texture, site detail, and balance."
    ],
    advanced: [
      "Thin skins make Pinot Noir vulnerable to rot and sunburn, but they also explain its lighter color and lower tannin compared with Cabernet Sauvignon or Syrah.",
      "It mutates readily and has many clones, which can influence yield, cluster shape, color, aroma, and disease pressure.",
      "Whole-cluster fermentation can add spice, stem tannin, floral lift, and savory complexity when stems are ripe."
    ],
    pro: [
      "In blind tasting, combine pale color, high acid, red fruit, low-to-medium tannin, and earthy development. Burgundy often adds savory mineral and forest-floor complexity.",
      "Be prepared to explain Burgundy hierarchy: regional, village, premier cru, and grand cru. Pinot Noir is the main red grape throughout the Cote d'Or.",
      "At pro level, distinguish cool New World Pinot by fruit purity and ripeness level while keeping structural markers in view."
    ],
    examKeys: [
      "Principal red grape of Burgundy.",
      "Thin-skinned, mutation-prone, site-sensitive.",
      "Red fruit, floral notes, earth, high freshness.",
      "Also important in Champagne production."
    ]
  },
  {
    slug: "sangiovese",
    name: "Sangiovese",
    color: "red",
    headline: "Italy's defining red grape, built on sour cherry, acidity, tannin, and savory detail.",
    origin: "Central Italy, with Tuscany as its most important regional identity.",
    classicRegions: ["Chianti Classico", "Brunello di Montalcino", "Vino Nobile di Montepulciano", "Morellino di Scansano"],
    benchmarkStyles: ["Chianti Classico", "Brunello di Montalcino", "Sangiovese-based Super Tuscan blends"],
    sensoryMarkers: ["sour cherry", "red plum", "tomato leaf", "dried herbs", "leather", "balsamic"],
    structure: {
      acidity: "high",
      tanninOrPhenolics: "medium-plus to high",
      body: "medium to medium-plus",
      alcohol: "moderate to high"
    },
    beginner: [
      "Sangiovese is the core red grape of Tuscany. It often tastes of sour cherry, red plum, dried herbs, leather, and sometimes tomato leaf.",
      "Its high acidity makes it one of the great food grapes, especially with tomato-based sauces, roasted meats, and hard cheeses.",
      "Beginners should connect Chianti Classico and Brunello di Montalcino to Sangiovese, while remembering that local names and clones vary."
    ],
    advanced: [
      "Sangiovese ripens relatively late and needs enough warmth to soften tannins, but excessive heat can push alcohol and reduce aromatic detail.",
      "Clonal diversity is important. Brunello is made from Sangiovese Grosso in Montalcino, while Chianti Classico may use local biotypes and blending rules.",
      "Oak choices vary from large neutral casks to smaller barrels. The grape's savory acidity should remain central in quality examples."
    ],
    pro: [
      "In blind tasting, Sangiovese often reveals itself through high acid, firm but not massive tannin, sour cherry, savory herbs, and a slightly dusty finish.",
      "Chianti Classico tends to be medium-bodied and savory; Brunello is generally fuller, longer-aged, and more powerful.",
      "Theory exams often test appellation rules, aging categories, and the relationship between Sangiovese, Tuscany, and blended IGT wines."
    ],
    examKeys: [
      "Italy's most planted important red grape.",
      "Key in Chianti Classico and Brunello di Montalcino.",
      "High acid, firm tannin, sour cherry, savory herbs.",
      "Food-friendly due to acidity and structure."
    ]
  },
  {
    slug: "syrah",
    name: "Syrah",
    color: "red",
    headline: "A dark, spicy grape capable of savory Northern Rhone precision and bold New World richness.",
    origin: "Northern Rhone Valley, France.",
    classicRegions: ["Hermitage", "Cote-Rotie", "Cornas", "Saint-Joseph", "Barossa Valley", "McLaren Vale"],
    benchmarkStyles: ["Northern Rhone Syrah", "Australian Shiraz", "cool-climate Syrah"],
    sensoryMarkers: ["blackberry", "blueberry", "black pepper", "olive", "smoked meat", "violet"],
    structure: {
      acidity: "medium to medium-plus",
      tanninOrPhenolics: "medium-plus to high",
      body: "medium-plus to full",
      alcohol: "moderate to high"
    },
    beginner: [
      "Syrah, called Shiraz in many Australian contexts, usually gives dark fruit, pepper, color, and structure.",
      "Northern Rhone examples can be savory, peppery, floral, and meaty; warmer New World examples can be richer, fuller, and more fruit-driven.",
      "Beginners should remember the pepper note. It comes from rotundone, an aroma compound that is especially associated with Syrah."
    ],
    advanced: [
      "Syrah performs across climate bands, but style changes dramatically. Cooler sites emphasize pepper, violet, olive, and fresh blackberry; warmer sites bring black fruit, chocolate, and higher alcohol.",
      "In Cote-Rotie, small amounts of Viognier may be co-fermented with Syrah, potentially adding perfume and color stabilization effects.",
      "Whole cluster, oak, and extraction choices shape whether the wine feels lifted and savory or dense and polished."
    ],
    pro: [
      "For blind tasting, Syrah often shows deep color, black fruit, pepper, medium-plus tannin, and savory meat or olive notes.",
      "Distinguish Syrah from Cabernet Sauvignon by the absence of cassis-cedar dominance and the presence of pepper, violet, smoked meat, or olive.",
      "For exams, know the Northern Rhone appellations and be able to compare them with Barossa Shiraz in climate, body, and aroma."
    ],
    examKeys: [
      "Called Shiraz in Australia and some other markets.",
      "Northern Rhone is the classic French benchmark.",
      "Black fruit, pepper, violet, olive, smoked meat.",
      "Rotundone contributes pepper aroma."
    ]
  },
  {
    slug: "tempranillo",
    name: "Tempranillo",
    color: "red",
    headline: "Spain's leading red grape, valued for red fruit, savory leather, and oak-friendly structure.",
    origin: "Northern Spain, with Rioja and Ribera del Duero as classic benchmarks.",
    classicRegions: ["Rioja", "Ribera del Duero", "Toro", "La Mancha", "Navarra"],
    benchmarkStyles: ["Rioja Crianza", "Rioja Reserva", "Ribera del Duero", "Toro"],
    sensoryMarkers: ["red cherry", "strawberry", "dried fig", "leather", "dill", "vanilla"],
    structure: {
      acidity: "medium",
      tanninOrPhenolics: "medium to medium-plus",
      body: "medium to full",
      alcohol: "moderate to high"
    },
    beginner: [
      "Tempranillo is Spain's most important quality red grape. It often shows red cherry, strawberry, plum, leather, tobacco, and oak spice.",
      "Rioja is the easiest starting point because aging categories such as Crianza, Reserva, and Gran Reserva are central to study.",
      "Beginners should remember that Tempranillo is often oak-aged, and American oak can add vanilla, coconut, and dill-like notes."
    ],
    advanced: [
      "The name is linked to early ripening. Tempranillo can build color and tannin but often benefits from blending or site selection to maintain freshness.",
      "Rioja styles range from traditional long-aged, oak-marked wines to modern, darker, more concentrated expressions.",
      "Ribera del Duero usually sits at higher elevation and can produce more powerful, tannic, darker-fruited Tempranillo than classic Rioja."
    ],
    pro: [
      "In blind tasting, identify red fruit, medium acidity, medium-plus tannin, leather, tobacco, and oak signatures. Dill or coconut can point toward American oak Rioja.",
      "Toro can be riper and more muscular, while Rioja often shows more elegance and age-derived complexity.",
      "Theory exams frequently test aging categories and regional names, including Tinto Fino or Tinta del Pais in Ribera del Duero."
    ],
    examKeys: [
      "Spain's flagship red grape.",
      "Rioja and Ribera del Duero are core benchmarks.",
      "Oak aging categories are exam-critical in Rioja.",
      "Markers: red fruit, leather, tobacco, vanilla, dill."
    ]
  },
  {
    slug: "zinfandel",
    name: "Zinfandel",
    color: "red",
    headline: "A California signature with brambly fruit, spice, high ripeness, and Croatian roots.",
    origin: "Croatian ancestry, genetically linked to Tribidrag/Crljenak Kastelanski and related to southern Italy's Primitivo.",
    classicRegions: ["Sonoma County", "Dry Creek Valley", "Lodi", "Paso Robles", "Napa Valley", "Puglia"],
    benchmarkStyles: ["California Zinfandel", "old-vine Zinfandel", "Primitivo"],
    sensoryMarkers: ["blackberry", "bramble", "raspberry jam", "pepper", "licorice", "sweet spice"],
    structure: {
      acidity: "medium",
      tanninOrPhenolics: "medium",
      body: "medium-plus to full",
      alcohol: "high"
    },
    beginner: [
      "Zinfandel is bold, fruity, spicy, and strongly associated with California. It often shows blackberry, raspberry jam, bramble, pepper, and sweet spice.",
      "It can produce rose, simple fruity reds, and serious old-vine wines, but certification study usually focuses on dry red Zinfandel.",
      "Beginners should remember high ripeness and alcohol as common clues."
    ],
    advanced: [
      "Zinfandel ripens unevenly, meaning one cluster may contain underripe, ripe, and raisined berries. This helps explain its mix of jammy fruit, spice, and sometimes elevated alcohol.",
      "Old vines can produce lower yields and concentrated fruit, especially in regions such as Dry Creek Valley and Lodi.",
      "The grape's relationship with Primitivo and Croatian varieties is important for understanding its identity beyond California."
    ],
    pro: [
      "In blind tasting, Zinfandel often shows high alcohol, brambly fruit, medium tannin, and spice. It can feel less structured than Cabernet Sauvignon but warmer and more jammy.",
      "Do not assume all Zinfandel is sweet. White Zinfandel is a separate rose style; premium red Zinfandel is usually dry.",
      "For theory, connect old vines, uneven ripening, California heritage, and genetic links to Primitivo and Croatian material."
    ],
    examKeys: [
      "California signature red grape.",
      "Genetically linked to Primitivo and Croatian Tribidrag.",
      "High alcohol, bramble fruit, spice.",
      "Uneven ripening is a key viticultural issue."
    ]
  }
];

const whiteGrapes: GrapeProfile[] = [
  {
    slug: "albarino",
    name: "Albarino",
    color: "white",
    headline: "A high-acid Atlantic white grape known for citrus, stone fruit, saline freshness, and aromatic lift.",
    origin: "Northwestern Iberia, especially Galicia in Spain and northern Portugal.",
    classicRegions: ["Rias Baixas", "Vinho Verde", "Moncao e Melgaco"],
    benchmarkStyles: ["Rias Baixas Albarino", "Alvarinho from northern Portugal"],
    sensoryMarkers: ["lime", "grapefruit", "peach", "apricot", "saline", "white flowers"],
    structure: {
      acidity: "high",
      tanninOrPhenolics: "low to moderate phenolic grip",
      body: "light to medium",
      alcohol: "moderate"
    },
    beginner: [
      "Albarino is a crisp, aromatic white grape with citrus, peach, floral, and saline notes.",
      "It is most closely associated with Rias Baixas in Galicia, near the Atlantic coast of Spain.",
      "Beginners should remember seafood: Albarino's acidity and coastal freshness make it a classic shellfish wine."
    ],
    advanced: [
      "Thick skins help Albarino tolerate humid Atlantic conditions, though canopy management and disease control remain important.",
      "Lees contact can add texture without sacrificing freshness, giving better examples a subtle creamy or mineral edge.",
      "In Portugal, the grape is called Alvarinho and can produce concentrated, age-worthy whites in Moncao e Melgaco."
    ],
    pro: [
      "In blind tasting, Albarino often combines high acid, citrus, peach, saline notes, and moderate body without the grassy intensity of Sauvignon Blanc.",
      "It can be mistaken for dry Riesling or Sauvignon Blanc, so look for its stone-fruit center and coastal brine.",
      "Theory answers should connect Rias Baixas subzones, Atlantic humidity, pergola training traditions, and seafood pairing logic."
    ],
    examKeys: [
      "Spain: Albarino; Portugal: Alvarinho.",
      "Classic home: Rias Baixas.",
      "High acid, citrus, peach, saline character.",
      "Thick skins help in humid Atlantic climates."
    ]
  },
  {
    slug: "chardonnay",
    name: "Chardonnay",
    color: "white",
    headline: "The great shape-shifter of white wine, reflecting climate, site, oak, lees, and malolactic fermentation.",
    origin: "Burgundy, France.",
    classicRegions: ["Chablis", "Cote de Beaune", "Champagne", "California", "Margaret River", "Yarra Valley"],
    benchmarkStyles: ["Chablis", "white Burgundy", "traditional-method sparkling", "California Chardonnay"],
    sensoryMarkers: ["green apple", "lemon", "pear", "peach", "butter", "toast"],
    structure: {
      acidity: "medium to high depending on climate",
      tanninOrPhenolics: "low phenolics unless skin contact or oak adds texture",
      body: "light to full depending on style",
      alcohol: "moderate to high"
    },
    beginner: [
      "Chardonnay is relatively neutral as a grape, which makes it a perfect lens for climate and winemaking.",
      "Cool climates bring lemon, green apple, chalk, and high acidity. Warmer climates bring peach, pineapple, melon, and fuller body.",
      "Oak, lees stirring, and malolactic fermentation can add toast, vanilla, cream, butter, and roundness."
    ],
    advanced: [
      "Chardonnay's flexibility explains its global spread. It can make still, sparkling, lean, rich, unoaked, heavily oaked, dry, and occasionally sweet wines.",
      "Chablis is a core benchmark for unoaked or lightly oaked, mineral-driven Chardonnay from a cool climate.",
      "In Burgundy, appellation hierarchy and village identity are essential: Meursault often suggests richness, Puligny-Montrachet precision, and Chassagne-Montrachet breadth."
    ],
    pro: [
      "In blind tasting, identify Chardonnay by structural neutrality plus winemaking clues. It lacks the overt aromatics of Riesling, Sauvignon Blanc, or Gewurztraminer.",
      "Sparkling theory requires Chardonnay as a major Champagne grape, especially for Blanc de Blancs.",
      "At pro level, discuss malolactic fermentation, lees autolysis, oak regime, climate, and reduction as separate variables rather than one generic 'buttery Chardonnay' idea."
    ],
    examKeys: [
      "Classic white grape of Burgundy and Champagne.",
      "Highly responsive to oak, lees, and malolactic fermentation.",
      "Cool climate: citrus/apple; warm climate: tropical/stone fruit.",
      "Chablis is a key cool-climate benchmark."
    ]
  },
  {
    slug: "chenin-blanc",
    name: "Chenin Blanc",
    color: "white",
    headline: "A high-acid grape capable of dry, sweet, sparkling, and long-lived wines.",
    origin: "Loire Valley, France.",
    classicRegions: ["Vouvray", "Savennieres", "Anjou", "Coteaux du Layon", "Swartland", "Stellenbosch"],
    benchmarkStyles: ["dry Loire Chenin", "Vouvray demi-sec", "botrytized Loire Chenin", "South African Chenin Blanc"],
    sensoryMarkers: ["apple", "quince", "pear", "honey", "lanolin", "wet wool"],
    structure: {
      acidity: "high",
      tanninOrPhenolics: "low to moderate phenolic texture",
      body: "light to full depending on ripeness and style",
      alcohol: "low to high depending on sweetness and ripeness"
    },
    beginner: [
      "Chenin Blanc is one of the most versatile white grapes. It can be dry, off-dry, sweet, sparkling, simple, or profound.",
      "Its key structural marker is high acidity, which allows even sweet wines to feel balanced.",
      "Common flavors include apple, quince, pear, honey, chamomile, lanolin, and sometimes a woolly mineral note."
    ],
    advanced: [
      "In the Loire, Chenin expresses site and sweetness level with great precision. Vouvray can range from sparkling to dry to sweet; Savennieres is typically dry, intense, and structured.",
      "Botrytis can concentrate Chenin for long-lived sweet wines, while acidity keeps them vibrant.",
      "South Africa has extensive old-vine Chenin, producing styles from fresh and unoaked to textured, barrel-fermented, and serious."
    ],
    pro: [
      "In blind tasting, Chenin's high acid, apple-quince fruit, honeyed edge, and lanolin or wet wool note are major clues.",
      "Do not confuse off-dry Chenin with Riesling. Chenin often feels broader and more waxy, while Riesling is usually more piercing and aromatic.",
      "For exams, prepare examples across style categories: sparkling, dry, off-dry, sweet, and botrytized."
    ],
    examKeys: [
      "Loire origin; South Africa is a major modern home.",
      "High acidity supports many sweetness levels.",
      "Markers: apple, quince, honey, lanolin, wool.",
      "Vouvray and Savennieres are key appellations."
    ]
  },
  {
    slug: "gewurztraminer",
    name: "Gewurztraminer",
    color: "white",
    headline: "A powerful aromatic grape with rose, lychee, spice, and a plush texture.",
    origin: "Central Europe, with Alsace as the classic benchmark.",
    classicRegions: ["Alsace", "Alto Adige", "Trentino", "Pfalz", "New Zealand"],
    benchmarkStyles: ["dry Alsace Gewurztraminer", "Vendange Tardive", "Selection de Grains Nobles"],
    sensoryMarkers: ["lychee", "rose", "ginger", "grapefruit peel", "turkish delight", "sweet spice"],
    structure: {
      acidity: "low to medium",
      tanninOrPhenolics: "moderate phenolic spice and texture",
      body: "medium-plus to full",
      alcohol: "moderate to high"
    },
    beginner: [
      "Gewurztraminer is one of the most aromatic grapes in wine. It often smells of lychee, rose petals, ginger, spice, and tropical fruit.",
      "It can taste rich even when dry because it has full body, low-to-medium acidity, and strong perfume.",
      "Beginners should anchor the grape in Alsace, where it can be dry, off-dry, late-harvest, or botrytized."
    ],
    advanced: [
      "Gewurztraminer has pinkish skins and can develop phenolic texture, giving a slight grip or bitterness that balances its aromatic richness.",
      "Because acidity is modest, harvest timing is critical. Too much ripeness can produce heavy wines unless balanced by bitterness, spice, or residual sugar.",
      "The grape is naturally expressive, so neutral vessels are common when producers want varietal purity."
    ],
    pro: [
      "In blind tasting, rose and lychee are among the strongest varietal markers in all white wine.",
      "Distinguish Gewurztraminer from Muscat by its fuller body, lower acidity, spice, and more oily texture.",
      "For theory, focus on Alsace labeling, grand cru examples, Vendange Tardive, and Selection de Grains Nobles."
    ],
    examKeys: [
      "Highly aromatic: lychee, rose, ginger.",
      "Classic benchmark: Alsace.",
      "Low-to-medium acidity, full body, phenolic texture.",
      "Can be dry, off-dry, late-harvest, or botrytized."
    ]
  },
  {
    slug: "gruner-veltliner",
    name: "Gruner Veltliner",
    color: "white",
    headline: "Austria's signature white grape, known for citrus, green herbs, white pepper, and food-friendly structure.",
    origin: "Austria.",
    classicRegions: ["Wachau", "Kamptal", "Kremstal", "Weinviertel", "Wagram"],
    benchmarkStyles: ["Wachau Federspiel", "Wachau Smaragd", "Weinviertel DAC", "Kamptal DAC"],
    sensoryMarkers: ["lime", "green apple", "white pepper", "lentil", "arugula", "radish"],
    structure: {
      acidity: "medium-plus to high",
      tanninOrPhenolics: "moderate phenolic texture",
      body: "light to full depending on ripeness",
      alcohol: "moderate to high"
    },
    beginner: [
      "Gruner Veltliner is Austria's most important white grape. It often shows citrus, green apple, herbs, and a white pepper note.",
      "It can be light and crisp or rich and powerful, especially from top Wachau, Kamptal, and Kremstal sites.",
      "Beginners should remember its food versatility: acidity, savory flavor, and phenolic texture make it excellent with vegetables and difficult pairings."
    ],
    advanced: [
      "Loess soils can support rounder, more generous styles, while primary rock terraces in the Wachau can produce more linear and mineral wines.",
      "Wachau categories such as Steinfeder, Federspiel, and Smaragd relate to ripeness and style rather than vineyard quality.",
      "Gruner can age well, developing honey, toast, and savory depth while retaining peppery freshness."
    ],
    pro: [
      "In blind tasting, white pepper, lentil, radish, citrus, and medium-plus acidity are key markers.",
      "Distinguish Gruner from Riesling by its more savory, peppery, sometimes vegetal tone and broader phenolic texture.",
      "Theory exams often test Austrian DACs, Wachau categories, and the grape's dominance in Austrian white wine."
    ],
    examKeys: [
      "Austria's signature white grape.",
      "White pepper is a classic marker.",
      "Key regions: Wachau, Kamptal, Kremstal, Weinviertel.",
      "Can range from light and crisp to rich and age-worthy."
    ]
  },
  {
    slug: "pinot-gris-grigio",
    name: "Pinot Gris/Grigio",
    color: "white",
    headline: "A pink-skinned Pinot mutation that ranges from crisp Italian Grigio to rich Alsace Gris.",
    origin: "Burgundian Pinot family, now important across Europe and the New World.",
    classicRegions: ["Alsace", "Alto Adige", "Friuli", "Veneto", "Oregon", "New Zealand"],
    benchmarkStyles: ["Italian Pinot Grigio", "Alsace Pinot Gris", "Oregon Pinot Gris"],
    sensoryMarkers: ["pear", "apple", "melon", "almond", "honey", "spice"],
    structure: {
      acidity: "medium to medium-plus",
      tanninOrPhenolics: "low to moderate phenolic texture",
      body: "light to full depending on style",
      alcohol: "moderate to high"
    },
    beginner: [
      "Pinot Gris and Pinot Grigio are the same grape, but the names often signal style.",
      "Pinot Grigio usually suggests a lighter, crisp, dry Italian style with apple, lemon, pear, and almond.",
      "Pinot Gris often suggests a richer, fuller style, especially in Alsace, with pear, honey, spice, and sometimes residual sugar."
    ],
    advanced: [
      "The grape has gray-pink skins, which can produce deeper color with skin contact and occasionally copper-toned wines.",
      "Alsace Pinot Gris can be powerful and textured, while northeastern Italian styles often emphasize freshness and simplicity.",
      "Oregon has built a serious Pinot Gris identity, often between the Italian and Alsace poles."
    ],
    pro: [
      "In blind tasting, Pinot Gris/Grigio can be difficult because it is less aromatic than Riesling, Sauvignon Blanc, or Gewurztraminer.",
      "Use structure and style: neutral pear/apple fruit, moderate acidity, and possible almond or spice notes.",
      "For exams, discuss naming, style expectations, and the grape's relationship to the Pinot family."
    ],
    examKeys: [
      "Same grape: Pinot Gris and Pinot Grigio.",
      "Pink-gray mutation of Pinot.",
      "Italian styles are often light and crisp; Alsace styles richer.",
      "Markers: pear, apple, almond, honey, spice."
    ]
  },
  {
    slug: "riesling",
    name: "Riesling",
    color: "white",
    headline: "A high-acid aromatic grape capable of transparent dry wines and some of the world's greatest sweet wines.",
    origin: "Germany's Rhine region.",
    classicRegions: ["Mosel", "Rheingau", "Pfalz", "Alsace", "Wachau", "Clare Valley", "Eden Valley"],
    benchmarkStyles: ["German Pradikatswein", "dry Grosses Gewachs", "Alsace Riesling", "Australian dry Riesling"],
    sensoryMarkers: ["lime", "green apple", "peach", "white flowers", "petrol", "slate"],
    structure: {
      acidity: "high",
      tanninOrPhenolics: "low phenolics",
      body: "light to medium",
      alcohol: "low to moderate, higher in dry ripe styles"
    },
    beginner: [
      "Riesling is aromatic, high-acid, and expressive. It can be bone dry, off-dry, sweet, still, or sparkling.",
      "Classic flavors include lime, green apple, peach, apricot, white flowers, and mineral notes. With age, some examples develop petrol-like aromas.",
      "Beginners should not assume Riesling is always sweet. Many of the world's best dry whites are Riesling."
    ],
    advanced: [
      "Riesling's high acidity allows a wide range of sweetness levels to feel balanced. This is central to German Pradikat theory.",
      "It is highly site-expressive, especially in Germany, where slope, river reflection, aspect, and slate soils shape ripeness and style.",
      "TDN is associated with petrol aromas, especially in aged wines and sunny climates such as parts of Australia."
    ],
    pro: [
      "In blind tasting, high acid plus citrus, stone fruit, floral aromatics, and low phenolic weight are key markers.",
      "Distinguish Riesling from Chenin Blanc by Riesling's more piercing acidity, clearer citrus/floral profile, and lack of woolly lanolin texture.",
      "For exams, master German sweetness/ripeness terms, VDP dry-wine language, Alsace dry styles, and Australian lime-driven benchmarks."
    ],
    examKeys: [
      "High acidity is the structural signature.",
      "Germany is the classic benchmark country.",
      "Can be dry to lusciously sweet.",
      "Petrol aromas may develop with age."
    ]
  },
  {
    slug: "sauvignon-blanc",
    name: "Sauvignon Blanc",
    color: "white",
    headline: "A high-acid aromatic grape driven by citrus, herbs, thiols, and pyrazines.",
    origin: "France, especially the Loire Valley and Bordeaux.",
    classicRegions: ["Sancerre", "Pouilly-Fume", "Bordeaux", "Marlborough", "Casablanca Valley", "Stellenbosch"],
    benchmarkStyles: ["Loire Sauvignon Blanc", "Marlborough Sauvignon Blanc", "white Bordeaux", "Sauternes blend component"],
    sensoryMarkers: ["gooseberry", "grapefruit", "lime", "passion fruit", "cut grass", "green bell pepper"],
    structure: {
      acidity: "high",
      tanninOrPhenolics: "low to moderate phenolic edge",
      body: "light to medium",
      alcohol: "moderate"
    },
    beginner: [
      "Sauvignon Blanc is crisp, aromatic, and usually easy to recognize. It often smells of lime, grapefruit, gooseberry, grass, passion fruit, and green herbs.",
      "The Loire gives classic mineral and citrus-driven styles, while Marlborough is famous for intense passion fruit, gooseberry, and grassy aromatics.",
      "Beginners should remember high acidity and strong aromatics."
    ],
    advanced: [
      "Two aroma families are important: methoxypyrazines contribute green bell pepper and grassy notes, while thiols can contribute passion fruit, grapefruit, and tropical intensity.",
      "In Bordeaux, Sauvignon Blanc is often blended with Semillon, which adds body, waxiness, and age potential.",
      "Oak and lees can broaden Sauvignon Blanc, especially in white Bordeaux and some premium New World examples."
    ],
    pro: [
      "In blind tasting, Sauvignon Blanc often combines high acidity, green aromatics, citrus, and piercing freshness.",
      "Distinguish Sancerre from Marlborough by intensity and fruit register: Sancerre is often more restrained and mineral, Marlborough more pungent and tropical.",
      "For exams, connect Sauvignon Blanc to dry Loire whites, Bordeaux blends, and sweet botrytized wines such as Sauternes where Semillon usually dominates."
    ],
    examKeys: [
      "High acid and aromatic intensity.",
      "Classic regions: Loire, Bordeaux, Marlborough.",
      "Markers: citrus, gooseberry, grass, passion fruit.",
      "Often blended with Semillon in Bordeaux."
    ]
  },
  {
    slug: "torrentes",
    name: "Torrentes",
    color: "white",
    headline: "Argentina's aromatic white grape, floral on the nose and usually dry on the palate.",
    origin: "Argentina, with parentage connected to Muscat of Alexandria and Criolla material.",
    classicRegions: ["Salta", "Cafayate", "La Rioja", "Mendoza"],
    benchmarkStyles: ["high-altitude Torrentes", "fresh unoaked Torrentes"],
    sensoryMarkers: ["jasmine", "orange blossom", "grape", "peach", "lemon", "white flowers"],
    structure: {
      acidity: "medium",
      tanninOrPhenolics: "low to moderate phenolic bitterness",
      body: "light to medium",
      alcohol: "moderate"
    },
    beginner: [
      "Torrentes is intensely floral and fruity, often smelling sweet even when the wine is dry.",
      "Common notes include jasmine, orange blossom, grape, peach, citrus, and white flowers.",
      "Beginners should anchor it in Argentina, especially high-altitude Salta and Cafayate."
    ],
    advanced: [
      "The most important quality form is commonly Torrontes Riojano, though labels and study materials may simplify the name.",
      "High altitude helps preserve freshness and aromatic lift in Argentina's sunny growing regions.",
      "Winemaking usually protects aromatics through cool fermentation and minimal oak."
    ],
    pro: [
      "In blind tasting, Torrentes can smell like Muscat but often finishes dry, sometimes with a slight bitter edge.",
      "Distinguish it from Gewurztraminer by lighter body, less spice, and more grapey orange-blossom aromatics.",
      "For exams, connect the grape to Argentina's white-wine identity and to high-altitude viticulture."
    ],
    examKeys: [
      "Argentina's signature aromatic white grape.",
      "Often floral and dry, despite sweet-smelling aromas.",
      "Key region: Salta, especially Cafayate.",
      "Markers: jasmine, orange blossom, grape, peach."
    ]
  },
  {
    slug: "viognier",
    name: "Viognier",
    color: "white",
    headline: "A plush aromatic white grape famous for apricot, blossom, texture, and low acidity.",
    origin: "Northern Rhone Valley, France.",
    classicRegions: ["Condrieu", "Chateau-Grillet", "California", "Barossa Valley", "Virginia"],
    benchmarkStyles: ["Condrieu", "New World Viognier", "Syrah-Viognier co-ferments"],
    sensoryMarkers: ["apricot", "peach", "honeysuckle", "violet", "ginger", "orange peel"],
    structure: {
      acidity: "low to medium",
      tanninOrPhenolics: "moderate phenolic texture",
      body: "medium-plus to full",
      alcohol: "moderate to high"
    },
    beginner: [
      "Viognier is aromatic, full-bodied, and soft in acidity. It often smells of apricot, peach, honeysuckle, ginger, and orange peel.",
      "The classic benchmark is Condrieu in the Northern Rhone.",
      "Beginners should remember that Viognier can feel rich and broad even when dry."
    ],
    advanced: [
      "Viognier is challenging in the vineyard because it can be low yielding and needs careful ripeness management. Pick too early and aromas are muted; pick too late and alcohol rises while acidity drops.",
      "It is usually made in a style that preserves perfume, though lees and oak can add weight.",
      "In Cote-Rotie, Viognier may be co-fermented with Syrah, adding floral lift and potentially affecting color stability."
    ],
    pro: [
      "In blind tasting, Viognier's apricot, blossom, full body, oily texture, and low acidity are the major clues.",
      "Distinguish it from Gewurztraminer by less lychee/rose spice and from Chardonnay by much stronger floral varietal aroma.",
      "For theory, know Condrieu and Chateau-Grillet, and understand the Syrah co-fermentation link in Cote-Rotie."
    ],
    examKeys: [
      "Classic region: Condrieu.",
      "Aromatic markers: apricot, peach, honeysuckle.",
      "Low-to-medium acidity and full body.",
      "Can be co-fermented with Syrah in Cote-Rotie."
    ]
  }
];

const DEFAULT_TURNTABLE_FRAME_COUNT = 12;
const DEFAULT_TURNTABLE_FRAME_COLUMNS = 3;
const DEFAULT_TURNTABLE_FRAME_ROWS = 4;

function defaultTurntableFrameUrls(slug: string): string[] {
  return Array.from({ length: DEFAULT_TURNTABLE_FRAME_COUNT }, (_, index) => {
    const frameNumber = String(index + 1).padStart(2, "0");
    return `/grapes/${slug}-turntable-margin-${frameNumber}.png`;
  });
}

function withDefaultGrapeMedia(profile: GrapeProfile): GrapeProfile {
  const frameUrls = profile.turntableFrameUrls ?? defaultTurntableFrameUrls(profile.slug);

  return {
    ...profile,
    staticImageUrl: profile.staticImageUrl ?? `/grapes/${profile.slug}-static.png`,
    staticImageCaption:
      profile.staticImageCaption ??
      `Margin-safe reference photo for identifying ${profile.name} berry color, cluster shape, bloom, stem structure, and density.`,
    turntableImageUrl: profile.turntableImageUrl ?? `/grapes/${profile.slug}-turntable-sheet.png`,
    turntableFrameUrls: frameUrls,
    turntableFrameColumns: profile.turntableFrameColumns ?? DEFAULT_TURNTABLE_FRAME_COLUMNS,
    turntableFrameRows: profile.turntableFrameRows ?? DEFAULT_TURNTABLE_FRAME_ROWS,
    turntableFrameCount: profile.turntableFrameCount ?? DEFAULT_TURNTABLE_FRAME_COUNT
  };
}

export const grapeProfiles: GrapeProfile[] = [...redGrapes, ...whiteGrapes].map(withDefaultGrapeMedia);

export const grapeProfilesByColor: Record<GrapeColor, GrapeProfile[]> = {
  red: grapeProfiles.filter((profile) => profile.color === "red"),
  white: grapeProfiles.filter((profile) => profile.color === "white")
};

export function getGrapeProfile(slug: string | null): GrapeProfile | null {
  if (!slug) return null;
  return grapeProfiles.find((profile) => profile.slug === slug) ?? null;
}
