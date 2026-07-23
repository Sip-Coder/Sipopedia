import { useEffect, useRef, useState, type MutableRefObject, type TouchEvent } from "react";

type BordeauxEntry = {
  name: string;
  appellation: string;
};

type BordeauxGroup = {
  title: string;
  scope: string;
  entries: BordeauxEntry[];
};

type BurgundyGrandCru = {
  aoc: string;
  commune: string;
  color: string;
  climats?: string[];
};

type BurgundyVillage = {
  name: string;
  grapes: string;
};

type BurgundySubzone = {
  title: string;
  villages: BurgundyVillage[];
};

type BurgundyZone = {
  title: string;
  subzones?: BurgundySubzone[];
  villages?: BurgundyVillage[];
};

type NamedSite = {
  name: string;
  appellation: string;
  status: string;
};

type ResourceRegion = "bordeaux" | "burgundy" | "alsace";
type ResourceBeverage = "wine" | "spirits";

type SpiritsQuizCategory = {
  title: string;
  prompt: string;
  answers: string[];
};
type SpiritsGroupedCategory = {
  heading: string;
  items: Array<{ category: string; brand: string }>;
};

const bordeaux1855Red: BordeauxGroup[] = [
  {
    title: "Premier Cru Classe",
    scope: "First growths",
    entries: [
      { name: "Chateau Lafite Rothschild", appellation: "Pauillac" },
      { name: "Chateau Latour", appellation: "Pauillac" },
      { name: "Chateau Margaux", appellation: "Margaux" },
      { name: "Chateau Haut-Brion", appellation: "Pessac-Leognan" },
      { name: "Chateau Mouton Rothschild", appellation: "Pauillac" }
    ]
  },
  {
    title: "Deuxieme Cru Classe",
    scope: "Second growths",
    entries: [
      { name: "Chateau Rauzan-Segla", appellation: "Margaux" },
      { name: "Chateau Rauzan-Gassies", appellation: "Margaux" },
      { name: "Chateau Leoville-Las Cases", appellation: "Saint-Julien" },
      { name: "Chateau Leoville-Poyferre", appellation: "Saint-Julien" },
      { name: "Chateau Leoville Barton", appellation: "Saint-Julien" },
      { name: "Chateau Durfort-Vivens", appellation: "Margaux" },
      { name: "Chateau Gruaud Larose", appellation: "Saint-Julien" },
      { name: "Chateau Lascombes", appellation: "Margaux" },
      { name: "Chateau Brane-Cantenac", appellation: "Margaux" },
      { name: "Chateau Pichon Baron", appellation: "Pauillac" },
      { name: "Chateau Pichon Longueville Comtesse de Lalande", appellation: "Pauillac" },
      { name: "Chateau Ducru-Beaucaillou", appellation: "Saint-Julien" },
      { name: "Chateau Cos d'Estournel", appellation: "Saint-Estephe" },
      { name: "Chateau Montrose", appellation: "Saint-Estephe" }
    ]
  },
  {
    title: "Troisieme Cru Classe",
    scope: "Third growths",
    entries: [
      { name: "Chateau Kirwan", appellation: "Margaux" },
      { name: "Chateau d'Issan", appellation: "Margaux" },
      { name: "Chateau Lagrange", appellation: "Saint-Julien" },
      { name: "Chateau Langoa Barton", appellation: "Saint-Julien" },
      { name: "Chateau Giscours", appellation: "Margaux" },
      { name: "Chateau Malescot St. Exupery", appellation: "Margaux" },
      { name: "Chateau Boyd-Cantenac", appellation: "Margaux" },
      { name: "Chateau Cantenac Brown", appellation: "Margaux" },
      { name: "Chateau Palmer", appellation: "Margaux" },
      { name: "Chateau La Lagune", appellation: "Haut-Medoc" },
      { name: "Chateau Desmirail", appellation: "Margaux" },
      { name: "Chateau Calon-Segur", appellation: "Saint-Estephe" },
      { name: "Chateau Ferriere", appellation: "Margaux" },
      { name: "Chateau Marquis d'Alesme Becker", appellation: "Margaux" }
    ]
  },
  {
    title: "Quatrieme Cru Classe",
    scope: "Fourth growths",
    entries: [
      { name: "Chateau Saint-Pierre", appellation: "Saint-Julien" },
      { name: "Chateau Talbot", appellation: "Saint-Julien" },
      { name: "Chateau Branaire-Ducru", appellation: "Saint-Julien" },
      { name: "Chateau Duhart-Milon", appellation: "Pauillac" },
      { name: "Chateau Pouget", appellation: "Margaux" },
      { name: "Chateau La Tour Carnet", appellation: "Haut-Medoc" },
      { name: "Chateau Lafon-Rochet", appellation: "Saint-Estephe" },
      { name: "Chateau Beychevelle", appellation: "Saint-Julien" },
      { name: "Chateau Prieure-Lichine", appellation: "Margaux" },
      { name: "Chateau Marquis de Terme", appellation: "Margaux" }
    ]
  },
  {
    title: "Cinquieme Cru Classe",
    scope: "Fifth growths",
    entries: [
      { name: "Chateau Pontet-Canet", appellation: "Pauillac" },
      { name: "Chateau Batailley", appellation: "Pauillac" },
      { name: "Chateau Haut-Batailley", appellation: "Pauillac" },
      { name: "Chateau Grand-Puy-Lacoste", appellation: "Pauillac" },
      { name: "Chateau Grand-Puy-Ducasse", appellation: "Pauillac" },
      { name: "Chateau Lynch-Bages", appellation: "Pauillac" },
      { name: "Chateau Lynch-Moussas", appellation: "Pauillac" },
      { name: "Chateau Dauzac", appellation: "Margaux" },
      { name: "Chateau d'Armailhac", appellation: "Pauillac" },
      { name: "Chateau du Tertre", appellation: "Margaux" },
      { name: "Chateau Haut-Bages Liberal", appellation: "Pauillac" },
      { name: "Chateau Pedesclaux", appellation: "Pauillac" },
      { name: "Chateau Belgrave", appellation: "Haut-Medoc" },
      { name: "Chateau de Camensac", appellation: "Haut-Medoc" },
      { name: "Chateau Cos Labory", appellation: "Saint-Estephe" },
      { name: "Chateau Clerc Milon", appellation: "Pauillac" },
      { name: "Chateau Croizet-Bages", appellation: "Pauillac" },
      { name: "Chateau Cantemerle", appellation: "Haut-Medoc" }
    ]
  }
];

const bordeaux1855Sweet: BordeauxGroup[] = [
  {
    title: "Premier Cru Superieur",
    scope: "Sauternes",
    entries: [{ name: "Chateau d'Yquem", appellation: "Sauternes" }]
  },
  {
    title: "Premier Cru",
    scope: "Sauternes and Barsac",
    entries: [
      { name: "Chateau La Tour Blanche", appellation: "Sauternes" },
      { name: "Chateau Lafaurie-Peyraguey", appellation: "Sauternes" },
      { name: "Chateau Clos Haut-Peyraguey", appellation: "Sauternes" },
      { name: "Chateau de Rayne Vigneau", appellation: "Sauternes" },
      { name: "Chateau Suduiraut", appellation: "Sauternes" },
      { name: "Chateau Coutet", appellation: "Barsac" },
      { name: "Chateau Climens", appellation: "Barsac" },
      { name: "Chateau Guiraud", appellation: "Sauternes" },
      { name: "Chateau Rieussec", appellation: "Sauternes" },
      { name: "Chateau Rabaud-Promis", appellation: "Sauternes" },
      { name: "Chateau Sigalas-Rabaud", appellation: "Sauternes" }
    ]
  },
  {
    title: "Deuxieme Cru",
    scope: "Sauternes and Barsac",
    entries: [
      { name: "Chateau de Myrat", appellation: "Barsac" },
      { name: "Chateau Doisy Daene", appellation: "Barsac" },
      { name: "Chateau Doisy-Dubroca", appellation: "Barsac" },
      { name: "Chateau Doisy-Vedrines", appellation: "Barsac" },
      { name: "Chateau d'Arche", appellation: "Sauternes" },
      { name: "Chateau Filhot", appellation: "Sauternes" },
      { name: "Chateau Broustet", appellation: "Barsac" },
      { name: "Chateau Nairac", appellation: "Barsac" },
      { name: "Chateau Caillou", appellation: "Barsac" },
      { name: "Chateau Suau", appellation: "Barsac" },
      { name: "Chateau de Malle", appellation: "Sauternes" },
      { name: "Chateau Romer", appellation: "Sauternes" },
      { name: "Chateau Romer du Hayot", appellation: "Sauternes" },
      { name: "Chateau Lamothe", appellation: "Sauternes" },
      { name: "Chateau Lamothe-Guignard", appellation: "Sauternes" }
    ]
  }
];

const burgundyGrandCrus: BurgundyGrandCru[] = [
  { aoc: "Chablis Grand Cru", commune: "Chablis", color: "White", climats: ["Blanchot", "Bougros", "Les Clos", "Grenouilles", "Preuses", "Valmur", "Vaudesir"] },
  { aoc: "Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Chambertin-Clos de Beze", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Chapelle-Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Charmes-Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Griotte-Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Latricieres-Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Mazis-Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Mazoyeres-Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Ruchottes-Chambertin", commune: "Gevrey-Chambertin", color: "Red" },
  { aoc: "Clos de la Roche", commune: "Morey-Saint-Denis", color: "Red" },
  { aoc: "Clos Saint-Denis", commune: "Morey-Saint-Denis", color: "Red" },
  { aoc: "Clos des Lambrays", commune: "Morey-Saint-Denis", color: "Red" },
  { aoc: "Clos de Tart", commune: "Morey-Saint-Denis", color: "Red" },
  { aoc: "Bonnes-Mares", commune: "Chambolle-Musigny / Morey-Saint-Denis", color: "Red" },
  { aoc: "Musigny", commune: "Chambolle-Musigny", color: "Red / White" },
  { aoc: "Clos de Vougeot", commune: "Vougeot", color: "Red" },
  { aoc: "Echezeaux", commune: "Flagey-Echezeaux", color: "Red" },
  { aoc: "Grands Echezeaux", commune: "Flagey-Echezeaux", color: "Red" },
  { aoc: "La Grande Rue", commune: "Vosne-Romanee", color: "Red" },
  { aoc: "La Romanee", commune: "Vosne-Romanee", color: "Red" },
  { aoc: "La Tache", commune: "Vosne-Romanee", color: "Red" },
  { aoc: "Richebourg", commune: "Vosne-Romanee", color: "Red" },
  { aoc: "Romanee-Conti", commune: "Vosne-Romanee", color: "Red" },
  { aoc: "Romanee-Saint-Vivant", commune: "Vosne-Romanee", color: "Red" },
  { aoc: "Corton", commune: "Aloxe-Corton / Ladoix-Serrigny / Pernand-Vergelesses", color: "Red / White" },
  { aoc: "Corton-Charlemagne", commune: "Aloxe-Corton / Ladoix-Serrigny / Pernand-Vergelesses", color: "White" },
  { aoc: "Charlemagne", commune: "Aloxe-Corton / Pernand-Vergelesses", color: "White" },
  { aoc: "Montrachet", commune: "Puligny-Montrachet / Chassagne-Montrachet", color: "White" },
  { aoc: "Batard-Montrachet", commune: "Puligny-Montrachet / Chassagne-Montrachet", color: "White" },
  { aoc: "Bienvenues-Batard-Montrachet", commune: "Puligny-Montrachet", color: "White" },
  { aoc: "Chevalier-Montrachet", commune: "Puligny-Montrachet", color: "White" },
  { aoc: "Criots-Batard-Montrachet", commune: "Chassagne-Montrachet", color: "White" }
];

const burgundyNamedSites: NamedSite[] = [
  { name: "Clos Saint-Jacques", appellation: "Gevrey-Chambertin", status: "Premier Cru, not Grand Cru" },
  { name: "Les Amoureuses", appellation: "Chambolle-Musigny", status: "Premier Cru, not Grand Cru" },
  { name: "Cros Parantoux", appellation: "Vosne-Romanee", status: "Premier Cru, not Grand Cru" },
  { name: "Les Saint-Georges", appellation: "Nuits-Saint-Georges", status: "Premier Cru, not Grand Cru" },
  { name: "Les Vaucrains", appellation: "Nuits-Saint-Georges", status: "Premier Cru, not Grand Cru" },
  { name: "Les Rugiens", appellation: "Pommard", status: "Premier Cru, not Grand Cru" },
  { name: "Clos des Mouches", appellation: "Beaune", status: "Premier Cru, not Grand Cru" },
  { name: "Les Perrieres", appellation: "Meursault", status: "Premier Cru, not Grand Cru" },
  { name: "Les Charmes", appellation: "Meursault", status: "Premier Cru, not Grand Cru" },
  { name: "Les Genevrieres", appellation: "Meursault", status: "Premier Cru, not Grand Cru" }
];

const burgundyVillageMap: BurgundyZone[] = [
  {
    title: "Chablis",
    villages: [{ name: "Chablis", grapes: "Chardonnay" }]
  },
  {
    title: "Cote d'Or",
    subzones: [
      {
        title: "Cote de Nuits (north to south)",
        villages: [
          { name: "Marsannay", grapes: "Pinot Noir, Chardonnay, Rose" },
          { name: "Fixin", grapes: "Pinot Noir, Chardonnay" },
          { name: "Gevrey-Chambertin", grapes: "Pinot Noir, Chardonnay (small)" },
          { name: "Morey-Saint-Denis", grapes: "Pinot Noir, Chardonnay (small)" },
          { name: "Chambolle-Musigny", grapes: "Pinot Noir, Chardonnay (small)" },
          { name: "Vougeot", grapes: "Pinot Noir, Chardonnay" },
          { name: "Vosne-Romanee", grapes: "Pinot Noir, Chardonnay (small)" },
          { name: "Nuits-Saint-Georges", grapes: "Pinot Noir, Chardonnay (small)" },
          { name: "Cote de Nuits-Villages", grapes: "Pinot Noir, Chardonnay (limited)" },
          { name: "Cote de Nuits", grapes: "Pinot Noir, Chardonnay (limited)" }
        ]
      },
      {
        title: "Cote de Beaune (north to south)",
        villages: [
          { name: "Ladoix", grapes: "Pinot Noir, Chardonnay" },
          { name: "Aloxe-Corton", grapes: "Pinot Noir, Chardonnay" },
          { name: "Pernand-Vergelesses", grapes: "Pinot Noir, Chardonnay" },
          { name: "Chorey-les-Beaune", grapes: "Pinot Noir, Chardonnay (small)" },
          { name: "Savigny-les-Beaune", grapes: "Pinot Noir, Chardonnay" },
          { name: "Beaune", grapes: "Pinot Noir, Chardonnay" },
          { name: "Cote de Beaune", grapes: "Pinot Noir, Chardonnay" },
          { name: "Cote de Beaune-Villages", grapes: "Pinot Noir" },
          { name: "Pommard", grapes: "Pinot Noir" },
          { name: "Volnay", grapes: "Pinot Noir" },
          { name: "Monthelie", grapes: "Pinot Noir, Chardonnay" },
          { name: "Auxey-Duresses", grapes: "Pinot Noir, Chardonnay" },
          { name: "Saint-Romain", grapes: "Chardonnay, Pinot Noir" },
          { name: "Meursault", grapes: "Chardonnay, Pinot Noir (small)" },
          { name: "Blagny", grapes: "Pinot Noir, Chardonnay" },
          { name: "Puligny-Montrachet", grapes: "Chardonnay, Pinot Noir (small)" },
          { name: "Chassagne-Montrachet", grapes: "Chardonnay, Pinot Noir" },
          { name: "Saint-Aubin", grapes: "Chardonnay, Pinot Noir" },
          { name: "Santenay", grapes: "Pinot Noir, Chardonnay" },
          { name: "Maranges", grapes: "Pinot Noir, Chardonnay" }
        ]
      }
    ]
  },
  {
    title: "Cote Chalonnaise",
    villages: [
      { name: "Bouzeron", grapes: "Aligote" },
      { name: "Rully", grapes: "Chardonnay, Pinot Noir" },
      { name: "Mercurey", grapes: "Pinot Noir, Chardonnay" },
      { name: "Givry", grapes: "Pinot Noir, Chardonnay" },
      { name: "Montagny", grapes: "Chardonnay" }
    ]
  },
  {
    title: "Maconnais",
    villages: [
      { name: "Vire-Clesse", grapes: "Chardonnay" },
      { name: "Macon-Lugny", grapes: "Chardonnay" },
      { name: "Macon-Ige", grapes: "Chardonnay, Pinot Noir, Gamay" },
      { name: "Macon-Pierreclos", grapes: "Chardonnay, Pinot Noir, Gamay" },
      { name: "Saint-Veran", grapes: "Chardonnay" },
      { name: "Pouilly-Vinzelles", grapes: "Chardonnay" },
      { name: "Pouilly-Loche", grapes: "Chardonnay" },
      { name: "Pouilly-Fuisse", grapes: "Chardonnay" }
    ]
  }
];

const alsaceGrandCrus = [
  "Altenberg de Bergbieten",
  "Altenberg de Bergheim",
  "Altenberg de Wolxheim",
  "Brand",
  "Bruderthal",
  "Eichberg",
  "Engelberg",
  "Florimont",
  "Frankstein",
  "Froehn",
  "Furstentum",
  "Geisberg",
  "Gloeckelberg",
  "Goldert",
  "Hatschbourg",
  "Hengst",
  "Kaefferkopf",
  "Kanzlerberg",
  "Kastelberg",
  "Kessler",
  "Kirchberg de Barr",
  "Kirchberg de Ribeauville",
  "Kitterle",
  "Mambourg",
  "Mandelberg",
  "Marckrain",
  "Moenchberg",
  "Muenchberg",
  "Ollwiller",
  "Osterberg",
  "Pfersigberg",
  "Pfingstberg",
  "Praelatenberg",
  "Rangen",
  "Rosacker",
  "Saering",
  "Schlossberg",
  "Schoenenbourg",
  "Sommerberg",
  "Sonnenglanz",
  "Spiegel",
  "Sporen",
  "Steinert",
  "Steingrubler",
  "Steinklotz",
  "Vorbourg",
  "Wiebelsberg",
  "Wineck-Schlossberg",
  "Winzenberg",
  "Zinnkoepfle",
  "Zotzenberg"
];

const alsaceNamedSitesQueue: NamedSite[] = [
  { name: "AOC Alsace communales", appellation: "AOC Alsace", status: "Geographic-name list to expand" },
  { name: "AOC Alsace lieux-dits", appellation: "AOC Alsace", status: "Non-Grand-Cru locality list to expand" },
  { name: "Single-vineyard producer labels", appellation: "AOC Alsace", status: "Verify locality status before publishing" }
];

const sourceLinks = [
  { label: "Bordeaux 1855 classification", href: "https://www.bordeaux.com/en/classifications/classifications-1855/" },
  { label: "Bourgogne AOC framework", href: "https://www.bourgogne-wines.com/wine-and-terroir/decoding-the-aocs/bourgogne-wines-decoding-the-aocs%2C2467%2C9263.html" },
  { label: "Bourgogne Chablis Grand Cru climats", href: "https://www.bourgogne-wines.com/our-wines-our-terroir/the-bourgogne-winegrowing-region-and-its-appellations/chablis-grand-cru%2C2458%2C9253.html?args=Y29tcF9pZD0yMjc4JmFjdGlvbj12aWV3RmljaGUmaWQ9MjYxJnw%3D" },
  { label: "Alsace AOC overview", href: "https://www.vinsalsace.com/en/gouts-et-couleurs/aoc/" },
  { label: "Alsace Grand Cru AOC", href: "https://www.vinsalsace.com/en/gouts-et-couleurs/aoc/aoc-alsace-grands-crus/" }
];

const resourceRegionOptions: Array<{ id: ResourceRegion; label: string; description: string }> = [
  { id: "bordeaux", label: "Bordeaux", description: "1855 classified growths" },
  { id: "burgundy", label: "Burgundy", description: "AOCs, Grand Crus, lieux-dits" },
  { id: "alsace", label: "Alsace", description: "AOCs, Grand Crus, locality queue" }
];

const resourceBeverageOptions: Array<{ id: ResourceBeverage; label: string; description: string; available: boolean }> = [
  { id: "wine", label: "Wine", description: "Regional references and classifications", available: true },
  { id: "spirits", label: "Spirits", description: "Category drills and worksheet downloads", available: true }
];

const spiritsQuizCategories: SpiritsQuizCategory[] = [
  {
    title: "Tequila",
    prompt: "List five tequila categories or examples.",
    answers: ["Blanco (Mijenta)", "Reposado (Espolon Reposado)", "Anejo (Don Julio Anejo)", "Extra Anejo (Gran Patron Burdeos)", "Cristalino (1800 Cristalino)"]
  },
  {
    title: "Mezcal",
    prompt: "List five mezcal categories or examples.",
    answers: ["Espadin (Del Maguey Vida)", "Tobala (El Jolgorio Tobala)", "Tepeztate (Rey Campero Tepeztate)", "Madrecuixe (Vago Madrecuixe)", "Ensamble (Bozal Ensamble)"]
  },
  {
    title: "Brandy",
    prompt: "List five brandy categories or examples.",
    answers: ["Cognac (Hennessy VS)", "Armagnac (Delord Bas-Armagnac)", "Pisco (Barsol Quebranta)", "Calvados (Boulard VSOP)", "Grappa (Nonino Grappa)"]
  },
  {
    title: "Whiskey",
    prompt: "List five whiskey categories or examples.",
    answers: ["Scotch Whisky (Glenfiddich 12)", "Bourbon (Woodford Reserve)", "Rye Whiskey (Basil Hayden)", "Irish Whiskey (Jameson)", "Japanese Whisky (Nikka From The Barrel)"]
  },
  {
    title: "Rum",
    prompt: "List five rum categories or examples.",
    answers: ["White Rum (Bacardi Superior)", "Gold Rum (Mount Gay Eclipse)", "Dark Rum (Myers's Original Dark)", "Overproof Rum (Wray & Nephew Overproof)", "Rhum Agricole (Rhum JM Blanc)", "Cachaca (Avua)"]
  },
  {
    title: "Gin",
    prompt: "List five gin categories or examples.",
    answers: ["Genever (Bols)", "London Dry (Beefeater)", "Plymouth (Plymouth Gin)", "Old Tom (Hayman's Old Tom)", "Navy Strength (Plymouth Navy Strength)", "Contemporary Gin (Hendrick's)"]
  },
  {
    title: "Vodka",
    prompt: "List five vodka categories or examples.",
    answers: ["Wheat Vodka (Ketel One)", "Rye Vodka (Belvedere)", "Potato Vodka (Chopin Potato)", "Corn Vodka (Tito's Handmade)", "Grape Vodka (Ciroc)"]
  },
  {
    title: "Classic Flavored Vodkas",
    prompt: "Name classic flavored vodka traditions by origin and style.",
    answers: [
      "Bison Grass (Zubrowka)",
      "Oak Aged (Starka)",
      "Honey Spiced (Krupnik)",
      "Hunter's Vodka (Okhotnichya)",
      "Lemon (Limonnaya)",
      "Dried Citrus Peel (Kubanskaya)",
      "Pepper & Honey (Pertsovka)"
    ]
  },
  {
    title: "Liqueurs - Fruit",
    prompt: "List fruit liqueur examples.",
    answers: ["Triple Sec (Cointreau)", "Orange Curacao (Pierre Ferrand Dry Curacao)", "Maraschino (Luxardo Maraschino)", "Creme de Cassis (Mathilde Cassis)", "Apricot Liqueur (Rothman & Winter Apricot)"]
  },
  {
    title: "Liqueurs - Nuts and Beans",
    prompt: "List nut and bean liqueur examples.",
    answers: ["Coffee Liqueur (Kahlua)", "Walnut Liqueur (Nocello)", "Hazelnut Liqueur (Frangelico)", "Almond Liqueur (Disaronno)", "Cacao Liqueur (Tempus Fugit Creme de Cacao)"]
  },
  {
    title: "Liqueurs - Herbs",
    prompt: "List herbal liqueur examples.",
    answers: ["Green Chartreuse (Chartreuse)", "Sambuca (Romana Sambuca)", "Benedictine (Benedictine DOM)", "Drambuie (Drambuie)", "St-Germain Elderflower (St-Germain)"]
  },
  {
    title: "Liqueurs - Creams",
    prompt: "List cream liqueur examples.",
    answers: ["Rompope (Santa Clara)", "Irish Cream (Five Farms)", "Rum Cream (RumChata)", "Tequila Cream (Tequila Rose)", "Amarula Cream (Amarula)"]
  },
  {
    title: "Bitters",
    prompt: "List bitter liqueur examples.",
    answers: ["Campari (Campari)", "Aperol (Aperol)", "Amaro Nonino (Nonino)", "Fernet-Branca (Fernet-Branca)", "Cynar (Cynar)"]
  },
  {
    title: "Bittered Aromatized Wines",
    prompt: "List bittered aromatized wine examples.",
    answers: ["Sweet Vermouth (Carpano Antica)", "Dry Vermouth (Noilly Prat)", "Blanc Vermouth (Dolin Blanc)", "Quinquina (Lillet Blanc)", "Americano Wine Aperitif (Cocchi Americano)"]
  },
  {
    title: "Bittered Aromatized Spirits",
    prompt: "List bittered aromatized spirit examples.",
    answers: ["Suze (Suze)", "Bonal Gentiane-Quina (Bonal)", "Amaro Montenegro (Montenegro)", "Averna Amaro (Averna)", "Vecchio Amaro del Capo (del Capo)"]
  }
];

function splitCategoryAndBrand(answer: string): { category: string; brand: string } {
  const match = answer.match(/^(.*)\((.*)\)$/);
  if (!match) return { category: answer, brand: "" };
  return {
    category: match[1].trim(),
    brand: match[2].trim()
  };
}

const classicFlavoredVodkaGroups: SpiritsGroupedCategory[] = [
  {
    heading: "Polish / Lithuanian",
    items: [
      { category: "Bison Grass", brand: "Zubrowka" },
      { category: "Oak Aged", brand: "Starka" },
      { category: "Honey Spiced", brand: "Krupnik" }
    ]
  },
  {
    heading: "Russian",
    items: [
      { category: "Hunter's Vodka", brand: "Okhotnichya" },
      { category: "Lemon", brand: "Limonnaya" },
      { category: "Dried Citrus Peel", brand: "Kubanskaya" }
    ]
  },
  {
    heading: "Russian / Ukranian",
    items: [{ category: "Pepper & Honey", brand: "Pertsovka" }]
  }
];

const RESOURCES_VIEW_KEY = "sipstudies:resources:view:v1";

function CountTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="wine-resource-count">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function BordeauxGroupCard({
  group,
  isOpen,
  onToggle
}: {
  group: BordeauxGroup;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`wine-resource-group ${isOpen ? "is-open" : "is-closed"}`}>
      <button
        type="button"
        className="wine-resource-group-head"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <h4>{group.title}</h4>
        <span>{group.scope}</span>
      </button>
      {isOpen ? (
        <ol>
          {group.entries.map((entry) => (
            <li key={`${group.title}-${entry.name}`}>
              <strong>{entry.name}</strong>
              <small>{entry.appellation}</small>
            </li>
          ))}
        </ol>
      ) : null}
    </article>
  );
}

export function WineResources() {
  const [activeBeverage, setActiveBeverage] = useState<ResourceBeverage>(() => {
    if (typeof window === "undefined") return "wine";
    try {
      const raw = window.localStorage.getItem(RESOURCES_VIEW_KEY);
      if (!raw) return "wine";
      const parsed = JSON.parse(raw) as { beverage?: ResourceBeverage };
      return parsed.beverage === "spirits" ? "spirits" : "wine";
    } catch {
      return "wine";
    }
  });
  const [activeRegion, setActiveRegion] = useState<ResourceRegion>(() => {
    if (typeof window === "undefined") return "bordeaux";
    try {
      const raw = window.localStorage.getItem(RESOURCES_VIEW_KEY);
      if (!raw) return "bordeaux";
      const parsed = JSON.parse(raw) as { region?: ResourceRegion };
      return parsed.region === "burgundy" || parsed.region === "alsace" ? parsed.region : "bordeaux";
    } catch {
      return "bordeaux";
    }
  });
  const [spiritsAnswersVisible, setSpiritsAnswersVisible] = useState(false);
  const beverageSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const regionSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const [openBordeauxGroups, setOpenBordeauxGroups] = useState<Record<string, boolean>>({
    "red-Premier Cru Classe": true
  });
  const bordeauxRedCount = bordeaux1855Red.reduce((total, group) => total + group.entries.length, 0);
  const bordeauxSweetCount = bordeaux1855Sweet.reduce((total, group) => total + group.entries.length, 0);
  const burgundyVillageCount = burgundyVillageMap.reduce((total, zone) => {
    const zoneVillageCount = zone.villages ? zone.villages.length : 0;
    const subzoneVillageCount = zone.subzones
      ? zone.subzones.reduce((subTotal, subzone) => subTotal + subzone.villages.length, 0)
      : 0;
    return total + zoneVillageCount + subzoneVillageCount;
  }, 0);
  const activeRegionLabel = resourceRegionOptions.find((item) => item.id === activeRegion)?.label ?? "Bordeaux";
  const availableBeverages = resourceBeverageOptions.filter((item) => item.available).map((item) => item.id);
  const toggleBordeauxGroup = (id: string) => {
    setOpenBordeauxGroups((current) => ({
      ...current,
      [id]: !current[id]
    }));
  };
  const goToCocktails = () => {
    if (typeof window === "undefined") return;
    window.location.hash = "#app/cocktails";
  };
  const navigateBeverageByDirection = (direction: 1 | -1) => {
    if (availableBeverages.length <= 1) return;
    const currentIndex = availableBeverages.indexOf(activeBeverage);
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + direction + availableBeverages.length) % availableBeverages.length;
    setActiveBeverage(availableBeverages[nextIndex]);
  };
  const navigateRegionByDirection = (direction: 1 | -1) => {
    if (activeBeverage !== "wine" || resourceRegionOptions.length <= 1) return;
    const currentIndex = resourceRegionOptions.findIndex((item) => item.id === activeRegion);
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + direction + resourceRegionOptions.length) % resourceRegionOptions.length;
    setActiveRegion(resourceRegionOptions[nextIndex].id);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      RESOURCES_VIEW_KEY,
      JSON.stringify({
        beverage: activeBeverage,
        region: activeRegion
      })
    );
  }, [activeBeverage, activeRegion]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        if (target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select") {
          return;
        }
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (activeBeverage === "wine") {
          navigateRegionByDirection(-1);
        } else {
          navigateBeverageByDirection(-1);
        }
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (activeBeverage === "wine") {
          navigateRegionByDirection(1);
        } else {
          navigateBeverageByDirection(1);
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        navigateBeverageByDirection(-1);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        navigateBeverageByDirection(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeBeverage, activeRegion, availableBeverages]);

  const beginSwipeTracking = (
    event: TouchEvent<HTMLElement>,
    ref: MutableRefObject<{ x: number; y: number } | null>
  ) => {
    if (event.touches.length !== 1) {
      ref.current = null;
      return;
    }
    const touch = event.touches[0];
    ref.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleSwipeNavigation = (
    event: TouchEvent<HTMLElement>,
    ref: MutableRefObject<{ x: number; y: number } | null>,
    onSwipeLeft: () => void,
    onSwipeRight: () => void
  ) => {
    const start = ref.current;
    ref.current = null;
    if (!start || event.changedTouches.length === 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const horizontalThreshold = 52;
    const horizontalDominance = Math.abs(dy) * 1.2;

    if (Math.abs(dx) < horizontalThreshold) return;
    if (Math.abs(dx) < horizontalDominance) return;

    if (dx < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  return (
    <section className="wine-resources">
      <div className="section-header">
        <div>
          <span className="sip-maps-kicker">Study Resources</span>
          <h2>Quick Reference & Recall</h2>
          <p>
            Use focused lists for exam recall, then move into a live quiz, map, or recipe page to apply what you remember.
          </p>
          <p className="hint">Goal: choose one category, recall before revealing, verify, then practice in the linked workspace.</p>
        </div>
      </div>

      <div
        className="wine-resource-beverage-switcher"
        role="tablist"
        aria-label="Resource beverage types"
        onTouchStart={(event) => beginSwipeTracking(event, beverageSwipeStartRef)}
        onTouchEnd={(event) =>
          handleSwipeNavigation(
            event,
            beverageSwipeStartRef,
            () => navigateBeverageByDirection(1),
            () => navigateBeverageByDirection(-1)
          )
        }
        onTouchCancel={() => {
          beverageSwipeStartRef.current = null;
        }}
      >
        {resourceBeverageOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeBeverage === item.id}
            className={`wine-resource-region-tab ${activeBeverage === item.id ? "active" : ""}`}
            disabled={!item.available}
            onClick={() => setActiveBeverage(item.id)}
          >
            <strong>{item.label}</strong>
            <small>{item.description}</small>
          </button>
        ))}
      </div>

      {activeBeverage === "wine" ? (
        <>
      <div
        className="wine-resource-region-switcher"
        role="tablist"
        aria-label="Wine resource regions"
        onTouchStart={(event) => beginSwipeTracking(event, regionSwipeStartRef)}
        onTouchEnd={(event) =>
          handleSwipeNavigation(
            event,
            regionSwipeStartRef,
            () => navigateRegionByDirection(1),
            () => navigateRegionByDirection(-1)
          )
        }
        onTouchCancel={() => {
          regionSwipeStartRef.current = null;
        }}
      >
        {resourceRegionOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeRegion === item.id}
            className={`wine-resource-region-tab ${activeRegion === item.id ? "active" : ""}`}
            onClick={() => setActiveRegion(item.id)}
          >
            <strong>{item.label}</strong>
            <small>{item.description}</small>
          </button>
        ))}
      </div>

      <div className="wine-resource-summary" aria-label={`${activeRegionLabel} resource totals`}>
        {activeRegion === "bordeaux" ? (
          <>
            <CountTile label="1855 red growths" value={String(bordeauxRedCount)} />
            <CountTile label="1855 sweet growths" value={String(bordeauxSweetCount)} />
            <CountTile label="Red cru levels" value={String(bordeaux1855Red.length)} />
            <CountTile label="Sweet cru levels" value={String(bordeaux1855Sweet.length)} />
          </>
        ) : activeRegion === "burgundy" ? (
          <>
            <CountTile label="Official Bourgogne AOCs" value="84" />
            <CountTile label="Village appellations mapped" value={String(burgundyVillageCount)} />
            <CountTile label="Grand Cru AOCs seeded here" value={String(burgundyGrandCrus.length)} />
            <CountTile label="Named sites queued" value={String(burgundyNamedSites.length)} />
          </>
        ) : (
          <>
            <CountTile label="Alsace Grand Cru names" value={String(alsaceGrandCrus.length)} />
            <CountTile label="Core AOCs listed" value="3" />
            <CountTile label="Label terms listed" value="2" />
            <CountTile label="Locality queues" value={String(alsaceNamedSitesQueue.length)} />
          </>
        )}
      </div>

      {activeRegion === "bordeaux" ? (
        <article className="wine-resource-panel">
          <div className="wine-resource-panel-head">
            <span>01</span>
            <div>
              <h3>Bordeaux Wine Official Classification of 1855</h3>
              <p>All classified Medoc/Graves red growths and Sauternes/Barsac sweet growths, grouped in classification order.</p>
            </div>
          </div>
          <div className="wine-resource-subhead">Red wines</div>
          <div className="wine-resource-groups">
            {bordeaux1855Red.map((group) => {
              const groupId = `red-${group.title}`;
              return (
                <BordeauxGroupCard
                  key={groupId}
                  group={group}
                  isOpen={Boolean(openBordeauxGroups[groupId])}
                  onToggle={() => toggleBordeauxGroup(groupId)}
                />
              );
            })}
          </div>
          <div className="wine-resource-subhead">Sweet white wines</div>
          <div className="wine-resource-groups compact">
            {bordeaux1855Sweet.map((group) => {
              const groupId = `sweet-${group.title}`;
              return (
                <BordeauxGroupCard
                  key={groupId}
                  group={group}
                  isOpen={Boolean(openBordeauxGroups[groupId])}
                  onToggle={() => toggleBordeauxGroup(groupId)}
                />
              );
            })}
          </div>
        </article>
      ) : null}

      {activeRegion === "burgundy" ? (
        <article className="wine-resource-panel">
          <div className="wine-resource-panel-head">
            <span>02</span>
            <div>
              <h3>Burgundy AOCs and Named Sites</h3>
              <p>
                Village appellations are organized north to south by major Burgundy zone, with the main grapes used in each.
                Grand Cru AOCs and high-value named sites follow below for study continuity.
              </p>
            </div>
          </div>
          <div className="wine-resource-subhead">Village grapes by zone (north to south)</div>
          <div className="wine-resource-burgundy-zones">
            {burgundyVillageMap.map((zone) => (
              <article key={zone.title} className="wine-resource-zone-card">
                <h4>{zone.title}</h4>
                {zone.villages ? (
                  <ul className="wine-resource-village-list">
                    {zone.villages.map((village) => (
                      <li key={`${zone.title}-${village.name}`}>
                        <strong>{village.name}</strong>
                        <small>{village.grapes}</small>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {zone.subzones?.map((subzone) => (
                  <div key={`${zone.title}-${subzone.title}`} className="wine-resource-subzone-block">
                    <h5>{subzone.title}</h5>
                    <ul className="wine-resource-village-list">
                      {subzone.villages.map((village) => (
                        <li key={`${subzone.title}-${village.name}`}>
                          <strong>{village.name}</strong>
                          <small>{village.grapes}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
          <div className="wine-resource-subhead">Grand Cru AOCs</div>
          <div className="wine-resource-card-grid">
            {burgundyGrandCrus.map((item) => (
              <article key={item.aoc} className="wine-resource-mini-card">
                <strong>{item.aoc}</strong>
                <span>{item.commune}</span>
                <small>{item.color}</small>
                {item.climats ? <p>Climats: {item.climats.join(", ")}</p> : null}
              </article>
            ))}
          </div>
          <div className="wine-resource-subhead">Named sites to track</div>
          <div className="wine-resource-site-list">
            {burgundyNamedSites.map((site) => (
              <span key={site.name}>
                <strong>{site.name}</strong>
                <small>{site.appellation} - {site.status}</small>
              </span>
            ))}
          </div>
        </article>
      ) : null}

      {activeRegion === "alsace" ? (
        <article className="wine-resource-panel">
          <div className="wine-resource-panel-head">
            <span>03</span>
            <div>
              <h3>Alsace AOCs, Grands Crus, and Locality Queue</h3>
              <p>
                First pass: AOC Alsace, Cremant d'Alsace, and the 51 Alsace Grand Cru names. Non-Grand-Cru locality detail
                is queued for the next source pass.
              </p>
            </div>
          </div>
          <div className="wine-resource-aoc-strip">
            <span>AOC Alsace</span>
            <span>AOC Cremant d'Alsace</span>
            <span>51 Alsace Grand Cru AOCs</span>
            <span>Vendanges Tardives / SGN label terms</span>
          </div>
          <div className="wine-resource-pill-grid">
            {alsaceGrandCrus.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <div className="wine-resource-subhead">Lieux-dits and geography queue</div>
          <div className="wine-resource-site-list">
            {alsaceNamedSitesQueue.map((site) => (
              <span key={site.name}>
                <strong>{site.name}</strong>
                <small>{site.appellation} - {site.status}</small>
              </span>
            ))}
          </div>
        </article>
      ) : null}

      <aside className="wine-resource-sources">
        <details>
          <summary>{activeRegionLabel} evidence and source links</summary>
        <div>
          {sourceLinks
            .filter((source) => source.label.toLowerCase().includes(activeRegion === "burgundy" ? "bourgogne" : activeRegion))
            .map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            ))}
        </div>
        </details>
      </aside>
        </>
      ) : null}

      {activeBeverage === "spirits" ? (
        <>
          <article className="wine-resource-panel">
            <div className="wine-resource-panel-head">
              <span>01</span>
              <div>
                <h3>Spirits Category Recall Quiz</h3>
                <p>
                  For each spirit category, name five examples from memory. Use the worksheet first, then check with the answer key.
                </p>
              </div>
            </div>
            <div className="wine-resource-downloads">
              <a className="wine-resource-download-link" href="/resources/spirits-category-worksheet.pdf" download>
                Download student worksheet (blank)
              </a>
              <a className="wine-resource-download-link" href="/resources/spirits-category-answer-key.pdf" download>
                Download answer sheet
              </a>
            </div>
          </article>

          <article className="wine-resource-panel">
            <div className="wine-resource-panel-head">
              <span>02</span>
              <div>
                <h3>Spirits Practice Prompts</h3>
                <p>Write five examples for each category before revealing answers.</p>
              </div>
            </div>
            <div className="wine-resource-spirits-quiz">
              {spiritsQuizCategories.map((category) => (
                <article key={category.title} className="wine-resource-spirits-card">
                  <h4>{category.title}</h4>
                  <p>{category.prompt}</p>
                  {category.title === "Classic Flavored Vodkas" && spiritsAnswersVisible ? (
                    <div className="wine-resource-vodka-groups">
                      {classicFlavoredVodkaGroups.map((group) => (
                        <div key={group.heading} className="wine-resource-vodka-group">
                          <strong>{group.heading}</strong>
                          <ol>
                            {group.items.map((item) => (
                              <li key={`${group.heading}-${item.category}`}>
                                <span className="wine-resource-answer-row">
                                  <span className="wine-resource-answer-category">{item.category}</span>
                                  <span className="wine-resource-answer-brand">{item.brand}</span>
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ol>
                      {category.answers.map((answer, index) => (
                        <li key={`${category.title}-${index}`}>
                          {spiritsAnswersVisible ? (
                            (() => {
                              const parsed = splitCategoryAndBrand(answer);
                              return (
                                <span className="wine-resource-answer-row">
                                  <span className="wine-resource-answer-category">{parsed.category}</span>
                                  <span className="wine-resource-answer-brand">{parsed.brand}</span>
                                </span>
                              );
                            })()
                          ) : (
                            "____________________________"
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                </article>
              ))}
            </div>
            <div className="wine-resource-spirits-actions">
              <button type="button" className="btn btn-light" onClick={() => setSpiritsAnswersVisible((current) => !current)}>
                {spiritsAnswersVisible ? "Hide Answers" : "Show Answers"}
              </button>
            </div>
          </article>

          <article className="wine-resource-panel wine-resource-cocktail-cta-panel">
            <div className="wine-resource-panel-head">
              <span>03</span>
              <div>
                <h3>Apply It To Cocktails</h3>
              </div>
            </div>
            <div className="wine-resource-cocktail-cta">
              <div className="wine-resource-cocktail-cta-actions">
                <p>
                  Turn category recall into service-speed mastery. Use this product knowledge map to train cocktail relationships and builds.
                </p>
                <p>
                  Build speed with practical repetition:
                </p>
                <ul>
                  <li>Link spirit families to classic cocktail templates.</li>
                  <li>Train ingredient logic, ratios, and garnish memory.</li>
                  <li>Move from category recall to fast service decisions.</li>
                </ul>
                <button type="button" className="btn btn-primary" onClick={goToCocktails}>
                  Go To Cocktails Map
                </button>
              </div>
            </div>
            <figure className="wine-resource-cocktail-cta-photo">
              <img src="/cocktails/hemingway-daiquiri.png" alt="Hemingway Daiquiri served at a bar" loading="lazy" />
              <figcaption>Hemingway Daiquiri</figcaption>
            </figure>
          </article>
        </>
      ) : null}
    </section>
  );
}
