import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";

type BevKind = "cocktail" | "beer" | "coffee" | "wine";
type WineColor = "red" | "white";

type BevItem = {
  id: string;
  name: string;
  family: string;
  base: string[];
  method: string;
  ingredients: string[];
  detailLines: string[];
  terroir?: string;
  glassware: string;
  invented: string;
  profile: string[];
  relatives: string[];
  wineColor?: "red" | "white";
};

type MapNode = {
  item: BevItem;
  score: number;
  x: number;
  y: number;
  size: number;
  closeness: "nearest" | "near" | "outer";
};

const RESOURCES_VIEW_KEY = "sipstudies:resources:view:v1";
const bevKindOrder: BevKind[] = ["cocktail", "wine", "beer", "coffee"];
const wineColorOrder: WineColor[] = ["red", "white"];

const cocktailItems: BevItem[] = [
  { id: "old-fashioned", name: "Old Fashioned", family: "Spirit-forward whiskey", base: ["whiskey"], method: "stirred", ingredients: ["bourbon or rye", "simple syrup or sugar cube", "Angostura bitters"], detailLines: ["2 oz bourbon or rye whiskey", "0.25 oz rich simple syrup or 1 sugar cube", "2 dashes Angostura bitters"], glassware: "Rocks glass", invented: "Louisville, Kentucky, United States, early 1800s", profile: ["spirit-forward", "bitters", "citrus oil"], relatives: ["manhattan", "sazerac", "boulevardier", "whiskey-sour"] },
  { id: "manhattan", name: "Manhattan", family: "Whiskey vermouth", base: ["whiskey"], method: "stirred", ingredients: ["rye or bourbon", "sweet vermouth", "Angostura bitters"], detailLines: ["2 oz rye or bourbon", "1 oz sweet vermouth", "2 dashes Angostura bitters"], glassware: "Coupe", invented: "New York City, United States, 1870s", profile: ["spirit-forward", "vermouth", "bitters"], relatives: ["old-fashioned", "boulevardier", "martini", "sazerac"] },
  { id: "martini", name: "Martini", family: "Gin vermouth", base: ["gin"], method: "stirred", ingredients: ["gin", "dry vermouth"], detailLines: ["2.5 oz gin", "0.5 oz dry vermouth", "1 dash orange bitters (optional)"], glassware: "Cocktail glass", invented: "San Francisco, United States, late 1800s", profile: ["spirit-forward", "dry", "botanical"], relatives: ["vesper", "negroni", "gimlet", "manhattan"] },
  { id: "negroni", name: "Negroni", family: "Bitter aperitivo", base: ["gin"], method: "stirred", ingredients: ["gin", "Campari", "sweet vermouth"], detailLines: ["1 oz gin", "1 oz Campari", "1 oz sweet vermouth"], glassware: "Rocks glass", invented: "Florence, Italy, 1919", profile: ["bitter", "vermouth", "citrus"], relatives: ["boulevardier", "martini", "americano", "paper-plane"] },
  { id: "boulevardier", name: "Boulevardier", family: "Bitter aperitivo", base: ["whiskey"], method: "stirred", ingredients: ["bourbon or rye", "Campari", "sweet vermouth"], detailLines: ["1.5 oz bourbon or rye", "1 oz Campari", "1 oz sweet vermouth"], glassware: "Rocks glass", invented: "Paris, France, 1920s", profile: ["bitter", "vermouth", "whiskey"], relatives: ["negroni", "old-fashioned", "manhattan", "paper-plane"] },
  { id: "daiquiri", name: "Daiquiri", family: "Rum sour", base: ["rum"], method: "shaken", ingredients: ["white rum", "lime juice", "simple syrup"], detailLines: ["2 oz white rum", "0.75 oz lime juice", "0.75 oz simple syrup"], glassware: "Coupe", invented: "Santiago de Cuba, Cuba, late 1890s", profile: ["sour", "citrus", "bright"], relatives: ["hemingway-daiquiri", "margarita", "gimlet", "mojito"] },
  { id: "hemingway-daiquiri", name: "Hemingway Daiquiri", family: "Rum sour", base: ["rum"], method: "shaken", ingredients: ["white rum", "lime", "grapefruit", "maraschino"], detailLines: ["2 oz white rum", "0.75 oz lime juice", "0.5 oz grapefruit juice", "0.5 oz maraschino liqueur"], glassware: "Coupe", invented: "Havana, Cuba, 1930s", profile: ["sour", "grapefruit", "dry"], relatives: ["daiquiri", "aviation", "last-word", "margarita"] },
  { id: "margarita", name: "Margarita", family: "Agave sour", base: ["tequila"], method: "shaken", ingredients: ["tequila", "orange liqueur", "lime juice"], detailLines: ["2 oz tequila", "1 oz orange liqueur", "0.75 oz lime juice"], glassware: "Coupe or rocks glass", invented: "Mexico/U.S. border region, 1930s-1940s", profile: ["sour", "citrus", "agave"], relatives: ["daiquiri", "paloma", "tommy-margarita", "sidecar"] },
  { id: "paloma", name: "Paloma", family: "Agave highball", base: ["tequila"], method: "built", ingredients: ["tequila", "lime juice", "grapefruit soda"], detailLines: ["2 oz tequila", "0.5 oz lime juice", "Top with grapefruit soda"], glassware: "Highball", invented: "Jalisco, Mexico, mid-20th century", profile: ["sparkling", "grapefruit", "refreshing"], relatives: ["margarita", "tommy-margarita", "mojito", "dark-and-stormy"] },
  { id: "whiskey-sour", name: "Whiskey Sour", family: "Whiskey sour", base: ["whiskey"], method: "shaken", ingredients: ["bourbon or rye", "lemon", "simple syrup"], detailLines: ["2 oz bourbon or rye", "0.75 oz lemon juice", "0.75 oz simple syrup"], glassware: "Rocks glass", invented: "United States, documented 1860s", profile: ["sour", "whiskey", "citrus"], relatives: ["gold-rush", "old-fashioned", "sidecar", "penicillin"] },
  { id: "gold-rush", name: "Gold Rush", family: "Whiskey sour", base: ["bourbon"], method: "shaken", ingredients: ["bourbon", "lemon", "honey syrup"], detailLines: ["2 oz bourbon", "0.75 oz lemon juice", "0.75 oz honey syrup"], glassware: "Rocks glass", invented: "New York City, United States, early 2000s", profile: ["sour", "honey", "whiskey"], relatives: ["whiskey-sour", "penicillin", "bee-knees", "old-fashioned"] },
  { id: "mojito", name: "Mojito", family: "Rum highball", base: ["rum"], method: "built", ingredients: ["white rum", "lime", "mint", "soda"], detailLines: ["2 oz white rum", "0.75 oz lime juice", "0.75 oz simple syrup", "6-8 mint leaves", "Top with soda water"], glassware: "Highball", invented: "Havana, Cuba, early 20th century", profile: ["sparkling", "mint", "citrus"], relatives: ["daiquiri", "southside", "paloma", "tom-collins"] }
];

const beerItems: BevItem[] = [
  { id: "pilsner", name: "Pilsner", family: "Lager", base: ["noble hops", "pilsner malt"], method: "bottom-fermented", ingredients: ["Saaz/Hallertau hops", "Pilsner barley malt", "lager yeast", "soft water"], detailLines: ["Hops: Saaz or Hallertau", "Barley: 100% Pilsner malt", "Yeast: clean lager strain", "Water: Plzen-style soft water"], glassware: "Pilsner glass", invented: "Plzen, Czech Republic, 1842", profile: ["crisp", "dry", "clean"], relatives: ["helles", "kolsch", "vienna-lager", "india-pale-lager"] },
  { id: "helles", name: "Helles", family: "Lager", base: ["noble hops", "pilsner malt"], method: "bottom-fermented", ingredients: ["Hallertau hops", "Pilsner and light Munich malt", "lager yeast", "soft water"], detailLines: ["Hops: Hallertau", "Barley: Pilsner + light Munich", "Yeast: Bavarian lager strain", "Water: moderately soft profile"], glassware: "Willi becher", invented: "Munich, Germany, 1890s", profile: ["malt-forward", "clean", "low bitterness"], relatives: ["pilsner", "marzen", "vienna-lager", "kolsch"] },
  { id: "marzen", name: "Marzen", family: "Lager", base: ["noble hops", "munich malt"], method: "bottom-fermented", ingredients: ["Tettnang/Hallertau hops", "Munich and Vienna malt", "lager yeast", "moderately hard water"], detailLines: ["Hops: Tettnang/Hallertau", "Barley: Munich + Vienna", "Yeast: lager strain", "Water: moderate hardness"], glassware: "Masskrug", invented: "Bavaria, Germany, 19th century", profile: ["toasty", "amber", "smooth"], relatives: ["vienna-lager", "helles", "bock", "dunkel"] },
  { id: "vienna-lager", name: "Vienna Lager", family: "Lager", base: ["spalt hops", "vienna malt"], method: "bottom-fermented", ingredients: ["Spalt hops", "Vienna and Munich malt", "lager yeast", "moderate water"], detailLines: ["Hops: Spalt", "Barley: Vienna + Munich", "Yeast: clean lager strain", "Water: moderate carbonate"], glassware: "Pint glass", invented: "Vienna, Austria, 1840s", profile: ["toasty", "balanced", "dry finish"], relatives: ["marzen", "helles", "amber-ale", "bock"] },
  { id: "hefeweizen", name: "Hefeweizen", family: "Wheat ale", base: ["noble hops", "wheat malt"], method: "top-fermented", ingredients: ["Hallertau hops", "wheat and pilsner malt", "weizen yeast", "soft water"], detailLines: ["Hops: Hallertau (low bitterness)", "Barley/Wheat: 50%+ wheat malt", "Yeast: weizen ester/phenol strain", "Water: soft profile"], glassware: "Weizen glass", invented: "Bavaria, Germany, revived 19th century", profile: ["banana", "clove", "hazy"], relatives: ["witbier", "saison", "kolsch", "belgian-blonde"] },
  { id: "witbier", name: "Witbier", family: "Wheat ale", base: ["continental hops", "wheat malt"], method: "top-fermented", ingredients: ["Styrian hops", "malted barley + unmalted wheat", "Belgian yeast", "soft water"], detailLines: ["Hops: continental low-alpha", "Barley/Wheat: barley + unmalted wheat", "Yeast: Belgian wit strain", "Water: low-carbonate soft water"], glassware: "Tulip", invented: "Hoegaarden, Belgium, traditional style", profile: ["orange peel", "coriander", "light"], relatives: ["hefeweizen", "saison", "belgian-blonde", "kolsch"] },
  { id: "saison", name: "Saison", family: "Farmhouse ale", base: ["european hops", "pilsner malt"], method: "top-fermented", ingredients: ["Saaz/Styrian hops", "pilsner malt", "saison yeast", "farmhouse water"], detailLines: ["Hops: Saaz or Styrian", "Barley: mostly pilsner malt", "Yeast: high-attenuation saison strain", "Water: moderate to hard profile"], glassware: "Tulip", invented: "Wallonia, Belgium, 18th-19th century", profile: ["peppery", "dry", "effervescent"], relatives: ["witbier", "hefeweizen", "belgian-tripel", "farmhouse-ipa"] },
  { id: "porter", name: "Porter", family: "Dark ale", base: ["english hops", "brown malt"], method: "top-fermented", ingredients: ["Fuggles/EKG hops", "pale + brown/chocolate malt", "English yeast", "carbonate-rich water"], detailLines: ["Hops: Fuggles or East Kent Goldings", "Barley: pale, brown, chocolate malts", "Yeast: English ale strain", "Water: London-style carbonate profile"], glassware: "Nonic pint", invented: "London, England, 1700s", profile: ["roasty", "cocoa", "toffee"], relatives: ["stout", "brown-ale", "schwarzbier", "dunkel"] },
  { id: "stout", name: "Stout", family: "Dark ale", base: ["english hops", "roasted barley"], method: "top-fermented", ingredients: ["Fuggles/EKG hops", "pale malt + roasted barley", "Irish yeast", "Dublin water"], detailLines: ["Hops: Fuggles/EKG", "Barley: pale malt + roasted barley", "Yeast: Irish/English ale strain", "Water: Dublin high-carbonate profile"], glassware: "Nonic pint", invented: "London, England, 18th century", profile: ["roasted", "coffee", "dry"], relatives: ["porter", "irish-dry-stout", "oatmeal-stout", "schwarzbier"] },
  { id: "pale-ale", name: "Pale Ale", family: "Hoppy ale", base: ["american hops", "pale malt"], method: "top-fermented", ingredients: ["Cascade/Centennial hops", "pale malt", "American ale yeast", "sulfate water"], detailLines: ["Hops: Cascade/Centennial", "Barley: pale malt", "Yeast: clean American ale strain", "Water: sulfate-forward profile"], glassware: "Shaker pint", invented: "U.K. roots; U.S. craft reinterpretation, 1970s", profile: ["citrus", "floral", "balanced hop"], relatives: ["india-pale-ale", "amber-ale", "english-bitter", "kolsch"] },
  { id: "india-pale-ale", name: "India Pale Ale", family: "Hoppy ale", base: ["american hops", "pale malt"], method: "top-fermented", ingredients: ["Citra/Simcoe/Mosaic hops", "pale malt", "American ale yeast", "sulfate-rich water"], detailLines: ["Hops: Citra/Simcoe/Mosaic", "Barley: pale malt backbone", "Yeast: clean American ale strain", "Water: sulfate-heavy for hop lift"], glassware: "IPA glass", invented: "England export roots, 1800s; modern U.S. wave, 1990s", profile: ["bitter", "citrus", "pine", "tropical"], relatives: ["pale-ale", "double-ipa", "hazy-ipa", "west-coast-ipa"] },
  { id: "hazy-ipa", name: "Hazy IPA", family: "Hoppy ale", base: ["new world hops", "pale + oats"], method: "top-fermented", ingredients: ["Citra/Galaxy/Mosaic hops", "pale malt + oats + wheat", "ale yeast", "chloride-forward water"], detailLines: ["Hops: Citra/Galaxy/Mosaic late additions", "Barley: pale with oats/wheat", "Yeast: biotransformation-friendly strain", "Water: chloride-forward, soft"], glassware: "IPA glass", invented: "Vermont, United States, 2000s", profile: ["juicy", "soft bitterness", "tropical"], relatives: ["india-pale-ale", "new-england-ipa", "pale-ale", "wheat-ipa"] }
];

const coffeeItems: BevItem[] = [
  { id: "espresso", name: "Espresso", family: "Concentrated espresso", base: ["espresso"], method: "pressurized extraction", ingredients: ["espresso"], detailLines: ["Espresso: 1 part, single or double shot", "Milk: 0", "Water: 0", "Foam: 0"], glassware: "Demitasse cup", invented: "Piedmont, Italy, 1884", profile: ["concentrated", "crema", "short"], relatives: ["ristretto", "lungo", "macchiato", "americano"] },
  { id: "ristretto", name: "Ristretto", family: "Concentrated espresso", base: ["espresso"], method: "short pressurized extraction", ingredients: ["espresso"], detailLines: ["Espresso: 1 part, shorter extraction", "Milk: 0", "Water: 0", "Foam: 0"], glassware: "Demitasse cup", invented: "Italy, early 20th century", profile: ["dense", "sweet", "short"], relatives: ["espresso", "lungo", "macchiato", "cortado"] },
  { id: "lungo", name: "Lungo", family: "Diluted espresso", base: ["espresso", "water"], method: "long pressurized extraction", ingredients: ["espresso", "water"], detailLines: ["Espresso: 1 part, longer extraction", "Water: integrated through puck", "Milk: 0", "Foam: 0"], glassware: "Demitasse or small ceramic cup", invented: "Italy, early 20th century", profile: ["long", "bitter", "light crema"], relatives: ["espresso", "americano", "ristretto", "long-black"] },
  { id: "americano", name: "Americano", family: "Diluted espresso", base: ["espresso", "water"], method: "built", ingredients: ["espresso", "hot water"], detailLines: ["Espresso: 1 part", "Hot water: 2-4 parts", "Milk: 0", "Foam: 0"], glassware: "Mug or coffee cup", invented: "Italy, 1940s", profile: ["black coffee", "diluted", "clean"], relatives: ["long-black", "lungo", "espresso", "cold-brew"] },
  { id: "long-black", name: "Long Black", family: "Diluted espresso", base: ["espresso", "water"], method: "built over water", ingredients: ["espresso", "hot water"], detailLines: ["Hot water: 2-3 parts first", "Espresso: 1 part poured over water", "Milk: 0", "Foam: crema retained"], glassware: "Small mug or tulip cup", invented: "Australia/New Zealand, 1980s", profile: ["black coffee", "crema", "aromatic"], relatives: ["americano", "lungo", "flat-white", "espresso"] },
  { id: "macchiato", name: "Macchiato", family: "Marked espresso", base: ["espresso", "milk foam"], method: "marked", ingredients: ["espresso", "milk foam"], detailLines: ["Espresso: 1 part", "Milk foam: small mark, about 0.25 part", "Steamed milk: optional trace", "Water: 0"], glassware: "Demitasse cup", invented: "Italy, 20th century", profile: ["espresso-forward", "foam", "short"], relatives: ["espresso", "cortado", "cappuccino", "ristretto"] },
  { id: "cortado", name: "Cortado", family: "Small milk coffee", base: ["espresso", "milk"], method: "equal-parts build", ingredients: ["espresso", "steamed milk"], detailLines: ["Espresso: 1 part", "Steamed milk: 1 part", "Foam: minimal", "Water: 0"], glassware: "Cortado glass", invented: "Basque Country, Spain, mid-20th century", profile: ["balanced", "low foam", "short milk"], relatives: ["flat-white", "macchiato", "cappuccino", "latte"] },
  { id: "cappuccino", name: "Cappuccino", family: "Foamed milk coffee", base: ["espresso", "milk", "foam"], method: "layered milk build", ingredients: ["espresso", "steamed milk", "milk foam"], detailLines: ["Espresso: 1 part", "Steamed milk: 1 part", "Milk foam: 1 part", "Water: 0"], glassware: "Cappuccino cup", invented: "Italy, 1930s", profile: ["foam", "balanced", "classic"], relatives: ["latte", "flat-white", "macchiato", "cortado"] },
  { id: "latte", name: "Caffe Latte", family: "Long milk coffee", base: ["espresso", "milk"], method: "milk-forward build", ingredients: ["espresso", "steamed milk", "microfoam"], detailLines: ["Espresso: 1 part", "Steamed milk: 3-5 parts", "Microfoam: thin cap", "Water: 0"], glassware: "Latte glass or large cup", invented: "Italy, documented 1867", profile: ["milk-forward", "soft", "large"], relatives: ["flat-white", "cappuccino", "mocha", "cortado"] },
  { id: "flat-white", name: "Flat White", family: "Long milk coffee", base: ["espresso", "milk"], method: "microfoam build", ingredients: ["espresso", "steamed milk", "microfoam"], detailLines: ["Espresso: 1 part, often double ristretto", "Steamed milk: 2-3 parts", "Microfoam: thin, glossy layer", "Water: 0"], glassware: "Ceramic cup", invented: "Australia/New Zealand, 1980s", profile: ["microfoam", "espresso-forward", "silky"], relatives: ["latte", "cortado", "cappuccino", "long-black"] },
  { id: "mocha", name: "Caffe Mocha", family: "Chocolate milk coffee", base: ["espresso", "milk", "chocolate"], method: "flavored milk build", ingredients: ["espresso", "steamed milk", "chocolate"], detailLines: ["Espresso: 1 part", "Chocolate: 0.5-1 part syrup or cocoa", "Steamed milk: 3-4 parts", "Foam or cream: optional"], glassware: "Mug or latte glass", invented: "United States, 1980s", profile: ["chocolate", "milk-forward", "sweet"], relatives: ["latte", "affogato", "irish-coffee", "cappuccino"] },
  { id: "affogato", name: "Affogato", family: "Dessert coffee", base: ["espresso", "ice cream"], method: "poured over", ingredients: ["espresso", "gelato"], detailLines: ["Espresso: 1 part hot shot", "Vanilla gelato: 1 scoop", "Milk: in gelato", "Foam: 0"], glassware: "Dessert glass", invented: "Italy, 1950s", profile: ["dessert", "hot-cold", "sweet"], relatives: ["mocha", "espresso", "irish-coffee", "latte"] },
  { id: "irish-coffee", name: "Irish Coffee", family: "Spiked coffee", base: ["coffee", "whiskey", "cream"], method: "built", ingredients: ["hot coffee", "Irish whiskey", "sugar", "cream"], detailLines: ["Hot coffee: 4 parts", "Irish whiskey: 1 part", "Sugar: 0.25 part", "Lightly whipped cream: float"], glassware: "Handled Irish coffee glass", invented: "Foynes, Ireland, 1943", profile: ["warm", "cream", "whiskey"], relatives: ["mocha", "affogato", "cafe-au-lait", "cold-brew"] },
  { id: "cafe-au-lait", name: "Cafe au Lait", family: "Brewed milk coffee", base: ["brewed coffee", "milk"], method: "mixed", ingredients: ["brewed coffee", "steamed milk"], detailLines: ["Brewed coffee: 1 part", "Steamed milk: 1 part", "Foam: minimal", "Espresso: 0"], glassware: "Bowl or large cup", invented: "France, 17th century", profile: ["brewed coffee", "milk", "soft"], relatives: ["latte", "irish-coffee", "cold-brew", "flat-white"] },
  { id: "cold-brew", name: "Cold Brew", family: "Cold extraction", base: ["coffee", "water"], method: "cold steeped", ingredients: ["ground coffee", "cold water"], detailLines: ["Coffee grounds: 1 part", "Cold water: 4-8 parts", "Milk: optional after extraction", "Foam: 0"], glassware: "Rocks glass or tumbler", invented: "Kyoto, Japan, 1600s", profile: ["cold", "smooth", "low bitterness"], relatives: ["americano", "cafe-au-lait", "irish-coffee", "long-black"] }
];

const wineItems: BevItem[] = [
  { id: "left-bank-bordeaux", name: "Left Bank Bordeaux Blend", family: "Bordeaux regional red blend", base: ["cabernet sauvignon", "merlot", "cabernet franc"], method: "co-fermented or blended and aged", ingredients: ["Cabernet Sauvignon + Merlot + Cabernet Franc", "Saccharomyces yeast"], detailLines: ["Grape: Cabernet Sauvignon-led blend", "Yeast: native or cultured Saccharomyces strains"], terroir: "Gravelly Medoc and Graves soils with maritime moderation build structure and cassis-driven depth.", glassware: "Bordeaux glass", invented: "Europe / Bordeaux Left Bank, France", profile: ["blackcurrant", "cedar", "tannin", "structured"], relatives: ["cabernet-sauvignon", "right-bank-bordeaux", "cote-de-rhone-rouge", "syrah"], wineColor: "red" },
  { id: "right-bank-bordeaux", name: "Right Bank Bordeaux Blend", family: "Bordeaux regional red blend", base: ["merlot", "cabernet franc", "cabernet sauvignon"], method: "co-fermented or blended and aged", ingredients: ["Merlot + Cabernet Franc + Cabernet Sauvignon", "Saccharomyces yeast"], detailLines: ["Grape: Merlot-led blend", "Yeast: native or cultured Saccharomyces strains"], terroir: "Clay and limestone of Saint-Emilion/Pomerol enhance plush fruit, round texture, and aromatic lift.", glassware: "Bordeaux glass", invented: "Europe / Bordeaux Right Bank, France", profile: ["plum", "cocoa", "supple tannin", "silky"], relatives: ["merlot", "left-bank-bordeaux", "sangiovese", "tempranillo"], wineColor: "red" },
  { id: "cote-de-rhone-rouge", name: "Cote de Rhone Rouge", family: "Rhone regional red blend", base: ["grenache", "syrah", "mourvedre"], method: "fermented and blended", ingredients: ["Grenache + Syrah + Mourvedre", "Saccharomyces yeast"], detailLines: ["Grape: GSM blend", "Yeast: native or cultured Saccharomyces strains"], terroir: "Sunny Mediterranean sites with galets and limestone deliver ripe fruit, garrigue spice, and warmth.", glassware: "Universal red wine glass", invented: "Europe / Southern Rhone, France", profile: ["red-black fruit", "pepper", "herbal", "warm"], relatives: ["syrah", "tempranillo", "left-bank-bordeaux", "malbec"], wineColor: "red" },
  { id: "cabernet-sauvignon", name: "Cabernet Sauvignon", family: "Full-bodied red", base: ["cabernet sauvignon"], method: "fermented and aged", ingredients: ["Cabernet Sauvignon grape", "Saccharomyces yeast"], detailLines: ["Grape: Cabernet Sauvignon", "Yeast: cultured or native Saccharomyces strains"], terroir: "Gravel and clay-limestone soils; warm days with cool nights build tannin and cassis depth.", glassware: "Bordeaux glass", invented: "Europe / Bordeaux, France (Left Bank)", profile: ["blackcurrant", "cedar", "tannin", "structured"], relatives: ["left-bank-bordeaux", "merlot", "malbec", "syrah"], wineColor: "red" },
  { id: "merlot", name: "Merlot", family: "Medium to full-bodied red", base: ["merlot"], method: "fermented and aged", ingredients: ["Merlot grape", "Saccharomyces yeast"], detailLines: ["Grape: Merlot", "Yeast: cultured or native Saccharomyces strains"], terroir: "Clay-rich and limestone-influenced sites favor plush texture and ripe plum fruit.", glassware: "Bordeaux glass", invented: "Europe / Bordeaux, France (Right Bank)", profile: ["plum", "chocolate", "round tannin", "soft"], relatives: ["right-bank-bordeaux", "cabernet-sauvignon", "malbec", "sangiovese"], wineColor: "red" },
  { id: "pinot-noir", name: "Pinot Noir", family: "Light-bodied red", base: ["pinot noir"], method: "fermented and aged", ingredients: ["Pinot Noir grape", "Saccharomyces yeast"], detailLines: ["Grape: Pinot Noir", "Yeast: native or neutral cultured strains"], terroir: "Cool-climate slopes and limestone/clay soils drive perfume, acidity, and fine tannin.", glassware: "Burgundy glass", invented: "Europe / Burgundy, France", profile: ["cherry", "earth", "high acid", "silky"], relatives: ["gamay", "nebbiolo", "sangiovese", "grenache"], wineColor: "red" },
  { id: "syrah", name: "Syrah", family: "Full-bodied red", base: ["syrah"], method: "fermented and aged", ingredients: ["Syrah grape", "Saccharomyces yeast"], detailLines: ["Grape: Syrah", "Yeast: robust fermentation strains"], terroir: "Granite and schist slopes can yield pepper and violet; warmer zones bring richer black fruit.", glassware: "Universal red wine glass", invented: "Europe / Rhone Valley, France", profile: ["blackberry", "pepper", "violet", "smoky"], relatives: ["cote-de-rhone-rouge", "malbec", "cabernet-sauvignon", "tempranillo"], wineColor: "red" },
  { id: "malbec", name: "Malbec", family: "Full-bodied red", base: ["malbec"], method: "fermented and aged", ingredients: ["Malbec grape", "Saccharomyces yeast"], detailLines: ["Grape: Malbec", "Yeast: cultured or native Saccharomyces strains"], terroir: "High-altitude alluvial soils and strong diurnal shifts preserve color and lift.", glassware: "Bordeaux glass", invented: "South America / Mendoza, Argentina (modern benchmark)", profile: ["black plum", "violet", "firm tannin", "cocoa"], relatives: ["cabernet-sauvignon", "merlot", "syrah", "tempranillo"], wineColor: "red" },
  { id: "tempranillo", name: "Tempranillo", family: "Medium to full-bodied red", base: ["tempranillo"], method: "fermented and aged", ingredients: ["Tempranillo grape", "Saccharomyces yeast"], detailLines: ["Grape: Tempranillo", "Yeast: cultured or native Saccharomyces strains"], terroir: "Continental climates with limestone/clay soils support savory fruit and age-worthy structure.", glassware: "Universal red wine glass", invented: "Europe / Rioja and Ribera del Duero, Spain", profile: ["red cherry", "tobacco", "leather", "savory"], relatives: ["sangiovese", "grenache", "syrah", "malbec"], wineColor: "red" },
  { id: "sangiovese", name: "Sangiovese", family: "Medium-bodied red", base: ["sangiovese"], method: "fermented and aged", ingredients: ["Sangiovese grape", "Saccharomyces yeast"], detailLines: ["Grape: Sangiovese", "Yeast: cultured or native Saccharomyces strains"], terroir: "Galestro and limestone hillsides with warm days/cool nights maintain acid and savory complexity.", glassware: "Universal red wine glass", invented: "Europe / Tuscany, Italy", profile: ["sour cherry", "tomato leaf", "earth", "high acid"], relatives: ["tempranillo", "pinot-noir", "merlot", "grenache"], wineColor: "red" },

  { id: "white-bordeaux", name: "White Bordeaux Blend", family: "Bordeaux regional white blend", base: ["sauvignon blanc", "semillon", "muscadelle"], method: "fermented and blended", ingredients: ["Sauvignon Blanc + Semillon + Muscadelle", "Saccharomyces yeast"], detailLines: ["Grape: Sauvignon Blanc/Semillon blend", "Yeast: native or cultured Saccharomyces strains"], terroir: "Gravel and limestone in maritime Bordeaux preserve freshness while Semillon adds texture.", glassware: "Sauvignon Blanc glass", invented: "Europe / Bordeaux, France", profile: ["citrus", "waxy", "herbal", "mineral"], relatives: ["sauvignon-blanc", "chardonnay", "chenin-blanc", "cote-de-rhone-blanc"], wineColor: "white" },
  { id: "cote-de-rhone-blanc", name: "Cote de Rhone Blanc", family: "Rhone regional white blend", base: ["grenache blanc", "viognier", "roussanne"], method: "fermented and blended", ingredients: ["Grenache Blanc + Viognier + Roussanne", "Saccharomyces yeast"], detailLines: ["Grape: Southern Rhone white field blend", "Yeast: native or cultured Saccharomyces strains"], terroir: "Mediterranean warmth with limestone and clay gives stone fruit, body, and herbal lift.", glassware: "Universal white wine glass", invented: "Europe / Southern Rhone, France", profile: ["stone fruit", "herbal", "round texture", "medium acid"], relatives: ["white-bordeaux", "chardonnay", "viognier", "chenin-blanc"], wineColor: "white" },
  { id: "chardonnay", name: "Chardonnay", family: "Medium to full-bodied white", base: ["chardonnay"], method: "fermented, optional malolactic and oak aging", ingredients: ["Chardonnay grape", "Saccharomyces yeast"], detailLines: ["Grape: Chardonnay", "Yeast: cultured or native Saccharomyces strains"], terroir: "Limestone and marl support tension/minerality; warmer sites and oak drive richer texture.", glassware: "Chardonnay glass", invented: "Europe / Burgundy, France", profile: ["apple", "citrus", "butter", "oak"], relatives: ["chenin-blanc", "viognier", "sauvignon-blanc", "white-bordeaux"], wineColor: "white" },
  { id: "sauvignon-blanc", name: "Sauvignon Blanc", family: "Light to medium-bodied white", base: ["sauvignon blanc"], method: "cool fermentation", ingredients: ["Sauvignon Blanc grape", "Saccharomyces yeast"], detailLines: ["Grape: Sauvignon Blanc", "Yeast: aromatic-preserving cool-ferment strains"], terroir: "Cool climates and flint/limestone soils sharpen acidity and herbal-citrus lift.", glassware: "Sauvignon Blanc glass", invented: "Europe / Loire Valley, France", profile: ["citrus", "gooseberry", "herbal", "high acid"], relatives: ["riesling", "albarino", "chenin-blanc", "white-bordeaux"], wineColor: "white" },
  { id: "riesling", name: "Riesling", family: "Light-bodied aromatic white", base: ["riesling"], method: "cool fermentation", ingredients: ["Riesling grape", "Saccharomyces yeast"], detailLines: ["Grape: Riesling", "Yeast: aromatic cool-fermentation strains"], terroir: "Slate and steep cool-climate vineyards produce electric acidity and mineral precision.", glassware: "Riesling glass", invented: "Europe / Rhine and Mosel, Germany", profile: ["lime", "peach", "floral", "mineral"], relatives: ["sauvignon-blanc", "gewurztraminer", "chenin-blanc", "albarino"], wineColor: "white" },
  { id: "chenin-blanc", name: "Chenin Blanc", family: "High-acid versatile white", base: ["chenin blanc"], method: "cool fermentation", ingredients: ["Chenin Blanc grape", "Saccharomyces yeast"], detailLines: ["Grape: Chenin Blanc", "Yeast: selected or native ferment strains"], terroir: "Tuffeau limestone and cooler valley sites favor acidity and waxy orchard-fruit character.", glassware: "Universal white wine glass", invented: "Europe / Loire Valley, France", profile: ["apple", "quince", "honey", "high acid"], relatives: ["chardonnay", "riesling", "sauvignon-blanc", "viognier"], wineColor: "white" },
  { id: "gewurztraminer", name: "Gewurztraminer", family: "Aromatic white", base: ["gewurztraminer"], method: "cool fermentation", ingredients: ["Gewurztraminer grape", "Saccharomyces yeast"], detailLines: ["Grape: Gewurztraminer", "Yeast: aromatic lift fermentation strains"], terroir: "Cool aromatic-growing zones and well-drained soils highlight rose, lychee, and spice.", glassware: "Aromatic white wine glass", invented: "Europe / Alsace, France", profile: ["lychee", "rose", "spice", "low acid"], relatives: ["riesling", "viognier", "chenin-blanc", "pinot-gris"], wineColor: "white" },
  { id: "pinot-gris", name: "Pinot Gris/Grigio", family: "Light to medium-bodied white", base: ["pinot gris"], method: "cool fermentation", ingredients: ["Pinot Gris grape", "Saccharomyces yeast"], detailLines: ["Grape: Pinot Gris", "Yeast: neutral aromatic fermentation strains"], terroir: "Cool alpine and limestone sites can preserve fresh pear/citrus with a mineral edge.", glassware: "Universal white wine glass", invented: "Europe / Alsace & Northern Italy", profile: ["pear", "citrus", "almond", "medium acid"], relatives: ["sauvignon-blanc", "riesling", "chardonnay", "gewurztraminer"], wineColor: "white" },
  { id: "viognier", name: "Viognier", family: "Aromatic full-bodied white", base: ["viognier"], method: "fermented and aged", ingredients: ["Viognier grape", "Saccharomyces yeast"], detailLines: ["Grape: Viognier", "Yeast: aromatic retention strains"], terroir: "Sunlit slopes with granite and warm days produce apricot richness and floral perfume.", glassware: "Aromatic white wine glass", invented: "Europe / Rhone Valley, France", profile: ["apricot", "honeysuckle", "rich texture", "low-medium acid"], relatives: ["chardonnay", "chenin-blanc", "gewurztraminer", "cote-de-rhone-blanc"], wineColor: "white" },
  { id: "albarino", name: "Albarino", family: "Crisp aromatic white", base: ["albarino"], method: "cool fermentation", ingredients: ["Albarino grape", "Saccharomyces yeast"], detailLines: ["Grape: Albarino", "Yeast: cool aromatic fermentation strains"], terroir: "Atlantic coastal vineyards with granite sands create saline citrus precision.", glassware: "Sauvignon Blanc glass", invented: "Europe / Rias Baixas, Spain", profile: ["lime", "stone fruit", "saline", "high acid"], relatives: ["sauvignon-blanc", "riesling", "pinot-gris", "chenin-blanc"], wineColor: "white" }
];

const byKind: Record<BevKind, BevItem[]> = {
  cocktail: cocktailItems,
  beer: beerItems,
  coffee: coffeeItems,
  wine: wineItems
};

const goldenAngle = 137.508;

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) % 9973;
  return hash;
}

function overlapScore(left: string[], right: string[], weight: number) {
  const rightSet = new Set(right.map(normalize));
  return left.reduce((score, value) => score + (rightSet.has(normalize(value)) ? weight : 0), 0);
}

function relationScore(active: BevItem, candidate: BevItem) {
  let score = 0;
  if (active.family === candidate.family) score += 5;
  if (active.method === candidate.method) score += 1.3;
  if (active.relatives.includes(candidate.id) || candidate.relatives.includes(active.id)) score += 4.5;
  score += overlapScore(active.base, candidate.base, 3);
  score += overlapScore(active.profile, candidate.profile, 1.2);
  score += overlapScore(active.ingredients, candidate.ingredients, 0.6);
  return score;
}

function findItem(items: BevItem[], query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return null;
  const exact = items.find((item) => normalize(item.name) === normalizedQuery || item.id === normalizedQuery.replace(/\s+/g, "-"));
  if (exact) return exact;
  return items.find((item) => normalize(item.name).includes(normalizedQuery)) ?? null;
}

function selectionKey(kind: BevKind, wineColor: WineColor) {
  return kind === "wine" ? `wine:${wineColor}` : kind;
}

function getKindSearchLabel(kind: BevKind) {
  if (kind === "beer") return "Beer Search";
  if (kind === "coffee") return "Coffee Search";
  if (kind === "wine") return "Wine Search";
  return "Cocktail Search";
}

function getSelectedKindLabel(kind: BevKind) {
  if (kind === "beer") return "Selected Beer";
  if (kind === "coffee") return "Selected Coffee";
  if (kind === "wine") return "Selected Wine";
  return "Selected Cocktail";
}

function getSelectedNodeLabel(kind: BevKind) {
  if (kind === "beer") return "selected beer";
  if (kind === "coffee") return "selected coffee";
  if (kind === "wine") return "selected wine";
  return "searched cocktail";
}

function getPhotoKindLabel(kind: BevKind) {
  if (kind === "beer") return "Selected Beer Photo";
  if (kind === "coffee") return "Selected Coffee Block";
  if (kind === "wine") return "Selected Wine Photo";
  return "Selected Cocktail Photo";
}

function getSearchPlaceholder(kind: BevKind, wineColor: WineColor) {
  if (kind === "beer") return "Try Pilsner, Helles, IPA, Saison...";
  if (kind === "coffee") return "Try Espresso, Cortado, Flat White, Cold Brew...";
  if (kind === "wine") {
    return wineColor === "red"
      ? "Try Left Bank Bordeaux, Cote de Rhone Rouge, Syrah..."
      : "Try White Bordeaux, Cote de Rhone Blanc, Riesling...";
  }
  return "Try Negroni, Margarita, Daiquiri, Martini...";
}

function getPhotoFolder(kind: BevKind) {
  if (kind === "beer") return "beers";
  if (kind === "coffee") return "coffee";
  if (kind === "wine") return "wines";
  return "cocktails";
}

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  if (!element) return false;
  const tagName = element.tagName.toLowerCase();
  return element.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select";
}

function nodeWidthForLabel(label: string, baseSize: number) {
  const longestWord = label.split(/\s+/).reduce((longest, word) => Math.max(longest, word.length), 0);
  const labelBoost = label.length > 14 ? (label.length - 14) * 3.5 : 0;
  const wordBoost = longestWord > 9 ? (longestWord - 9) * 9 : 0;
  return Math.round(Math.max(baseSize, Math.min(210, 82 + label.length * 5.2 + labelBoost + wordBoost)));
}

function nodeBounds(node: Pick<MapNode, "x" | "y" | "size">) {
  return {
    halfWidth: Math.min(18, Math.max(6.5, node.size / 8.8)),
    halfHeight: 4.8
  };
}

function separateMapNodes(nodes: MapNode[]) {
  const centerBounds = { x: 50, y: 50, halfWidth: 15, halfHeight: 8.5 };
  const placed: MapNode[] = [];

  nodes.forEach((node) => {
    const next = { ...node };
    const bounds = nodeBounds(next);

    for (let attempt = 0; attempt < 90; attempt += 1) {
      let moved = false;
      const obstacles = [centerBounds, ...placed.map((item) => ({ ...item, ...nodeBounds(item) }))];

      obstacles.forEach((obstacle) => {
        const minX = bounds.halfWidth + obstacle.halfWidth + 1.4;
        const minY = bounds.halfHeight + obstacle.halfHeight + 1.2;
        const dx = next.x - obstacle.x;
        const dy = next.y - obstacle.y;
        if (Math.abs(dx) >= minX || Math.abs(dy) >= minY) return;

        const pushX = (minX - Math.abs(dx)) * (dx >= 0 ? 1 : -1);
        const pushY = (minY - Math.abs(dy)) * (dy >= 0 ? 1 : -1);
        if (Math.abs(pushX) < Math.abs(pushY)) {
          next.x += pushX;
        } else {
          next.y += pushY;
        }
        moved = true;
      });

      next.x = Math.max(bounds.halfWidth + 1, Math.min(99 - bounds.halfWidth, next.x));
      next.y = Math.max(bounds.halfHeight + 1, Math.min(99 - bounds.halfHeight, next.y));
      if (!moved) break;
    }

    placed.push(next);
  });

  return placed;
}

function buildNodes(items: BevItem[], active: BevItem): MapNode[] {
  const scored = items
    .filter((item) => item.id !== active.id)
    .map((item) => ({ item, score: relationScore(active, item) }))
    .sort((left, right) => right.score - left.score || left.item.name.localeCompare(right.item.name))
    .slice(0, 30);

  const maxScore = scored[0]?.score || 1;
  const mapped = scored.map((entry, index) => {
    const strength = Math.max(0.08, entry.score / maxScore);
    const rankPush = index / Math.max(1, scored.length - 1);
    const radius = 15 + (1 - strength) * 24 + rankPush * 22;
    const angle = (hashString(entry.item.id) + index * goldenAngle) % 360;
    const radians = (angle * Math.PI) / 180;
    const x = Math.max(8, Math.min(92, 50 + Math.cos(radians) * radius));
    const y = Math.max(10, Math.min(90, 50 + Math.sin(radians) * radius * 0.72));
    const closeness: MapNode["closeness"] = index < 8 ? "nearest" : index < 18 ? "near" : "outer";
    const baseSize = Math.round(82 + strength * 42 - rankPush * 18);
    return { ...entry, x, y, closeness, size: nodeWidthForLabel(entry.item.name, baseSize) };
  });

  return separateMapNodes(mapped);
}

function BevDetails({ kind, item }: { kind: BevKind; item: BevItem }) {
  const styleLabel = kind === "beer" ? "Beer Family" : kind === "coffee" ? "Coffee Family" : kind === "wine" ? "Wine Style" : "Cocktail Family";
  const ingredientsLabel =
    kind === "beer"
      ? "Ingredients (Hops, Barley, Yeast, Water)"
      : kind === "coffee"
        ? "Ingredients w/ Ratios"
        : kind === "wine"
          ? "Ingredients (Grape Variety, Yeast)"
          : "Ingredients";
  const originLabel = kind === "wine" ? "Continent/Region and Origin" : "Invented";

  return (
    <>
      <strong>{item.name}</strong>
      <dl>
        <div>
          <dt>{styleLabel}</dt>
          <dd>{item.family}</dd>
        </div>
        <div>
          <dt>{ingredientsLabel}</dt>
          <dd>
            {item.detailLines.map((line) => (
              <span key={`${item.id}-${line}`} className="cocktail-ingredient-line">
                {line}
              </span>
            ))}
          </dd>
        </div>
        {kind === "wine" && item.terroir ? (
          <div>
            <dt>Terroir</dt>
            <dd>{item.terroir}</dd>
          </div>
        ) : null}
        <div>
          <dt>Glassware</dt>
          <dd>{item.glassware}</dd>
        </div>
        <div>
          <dt>{originLabel}</dt>
          <dd>{item.invented}</dd>
        </div>
      </dl>
    </>
  );
}

function BevPhoto({ kind, item }: { kind: BevKind; item: BevItem }) {
  const [failed, setFailed] = useState(false);
  const imagePath = `/${getPhotoFolder(kind)}/${item.id}.png`;
  return (
    <figure className="cocktail-photo-panel">
      <div className="cocktail-photo-frame">
        {!failed ? (
          <img src={imagePath} alt={`${item.name} served in ${item.glassware}`} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <div className="cocktail-photo-fallback">
            <span>{item.name}</span>
          </div>
        )}
      </div>
      <figcaption>
        <span>{getPhotoKindLabel(kind)}</span>
        <strong>{item.name}</strong>
        <small>{item.glassware}</small>
      </figcaption>
    </figure>
  );
}

function BevColorStudyPhoto({ kind, item }: { kind: BevKind; item: BevItem }) {
  const [failed, setFailed] = useState(false);
  if (kind === "cocktail") return null;

  if (kind === "coffee") {
    const imagePath = `/coffee/${item.id}-ratio.png`;

    return (
      <figure className="bev-color-study-panel">
        <div className="bev-color-study-frame bev-coffee-ratio-frame">
          {!failed ? (
            <img src={imagePath} alt={`${item.name} coffee ratio and cup type diagram`} loading="lazy" onError={() => setFailed(true)} />
          ) : (
            <div className="cocktail-photo-fallback">
              <span>{item.name}</span>
            </div>
          )}
        </div>
        <figcaption>
          <span>Coffee Ratio Study</span>
          <strong>{item.name}</strong>
          <small>Sectional cup diagram for coffee, milk, foam, water, cream, ice, or dessert layers.</small>
        </figcaption>
      </figure>
    );
  }

  const imagePath = `/${kind === "beer" ? "beers" : "wines"}/${item.id}-color.png`;
  const subjectLabel = kind === "beer" ? "Beer Color Study" : "Wine Color Study";

  return (
    <figure className="bev-color-study-panel">
      <div className="bev-color-study-frame">
        {!failed ? (
          <img src={imagePath} alt={`${item.name} color and concentration study`} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <div className="cocktail-photo-fallback">
            <span>{item.name}</span>
          </div>
        )}
      </div>
      <figcaption>
        <span>{subjectLabel}</span>
        <strong>{item.name}</strong>
        <small>{kind === "beer" ? "Tilted glass reference for color, foam, and clarity." : "Tilted glass reference for hue, rim, core, and concentration."}</small>
      </figcaption>
    </figure>
  );
}

export function Cocktails() {
  const [kind, setKind] = useState<BevKind>("cocktail");
  const [wineColor, setWineColor] = useState<WineColor>("red");
  const [activeId, setActiveId] = useState(byKind.cocktail[0].id);
  const [query, setQuery] = useState(byKind.cocktail[0].name);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const itemSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const kindSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const wineColorSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastSelectionRef = useRef<Record<string, string>>({
    cocktail: byKind.cocktail[0].id,
    beer: byKind.beer[0].id,
    coffee: byKind.coffee[0].id,
    "wine:red": byKind.wine.find((item) => item.wineColor === "red")?.id ?? byKind.wine[0].id,
    "wine:white": byKind.wine.find((item) => item.wineColor === "white")?.id ?? byKind.wine[0].id
  });

  const currentItems = useMemo(() => {
    if (kind !== "wine") return byKind[kind];
    const filtered = byKind.wine.filter((item) => item.wineColor === wineColor);
    return filtered.length > 0 ? filtered : byKind.wine;
  }, [kind, wineColor]);
  const activeSelectionKey = selectionKey(kind, wineColor);
  const mapById = useMemo(() => new Map(currentItems.map((item) => [item.id, item])), [currentItems]);
  const activeItem = mapById.get(activeId) ?? currentItems[0];
  const nodes = useMemo(() => buildNodes(currentItems, activeItem), [currentItems, activeItem]);
  const hoveredItem = hoveredId ? mapById.get(hoveredId) ?? null : null;
  const nearest = nodes.slice(0, 8);

  useEffect(() => {
    const rememberedId = lastSelectionRef.current[activeSelectionKey];
    const rememberedItem = rememberedId ? currentItems.find((item) => item.id === rememberedId) : null;
    const nextItem = rememberedItem ?? currentItems[0];
    setActiveId(nextItem.id);
    setQuery(nextItem.name);
    setHoveredId(null);
  }, [activeSelectionKey, currentItems]);

  const selectItem = useCallback(
    (item: BevItem) => {
      lastSelectionRef.current[activeSelectionKey] = item.id;
      setActiveId(item.id);
      setQuery(item.name);
      setHoveredId(null);
    },
    [activeSelectionKey]
  );

  const runSearch = () => {
    const found = findItem(currentItems, query);
    if (!found) return;
    selectItem(found);
  };

  const navigateByDirection = useCallback(
    (direction: 1 | -1) => {
      const index = currentItems.findIndex((item) => item.id === activeItem.id);
      if (index < 0) return;
      const nextIndex = (index + direction + currentItems.length) % currentItems.length;
      selectItem(currentItems[nextIndex]);
    },
    [currentItems, activeItem.id, selectItem]
  );

  const navigateKindByDirection = useCallback(
    (direction: 1 | -1) => {
      const index = bevKindOrder.indexOf(kind);
      if (index < 0) return;
      const nextIndex = (index + direction + bevKindOrder.length) % bevKindOrder.length;
      setKind(bevKindOrder[nextIndex]);
      setHoveredId(null);
    },
    [kind]
  );

  const navigateWineColorByDirection = useCallback(
    (direction: 1 | -1) => {
      if (kind !== "wine") return;
      const index = wineColorOrder.indexOf(wineColor);
      const nextIndex = (index + direction + wineColorOrder.length) % wineColorOrder.length;
      setWineColor(wineColorOrder[nextIndex]);
      setHoveredId(null);
    },
    [kind, wineColor]
  );

  const navigateBack = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.hash = "#app/launch";
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();

      if (event.key === "Escape") {
        event.preventDefault();
        navigateBack();
      } else if (event.ctrlKey && event.key === "ArrowLeft") {
        event.preventDefault();
        navigateKindByDirection(-1);
      } else if (event.ctrlKey && event.key === "ArrowRight") {
        event.preventDefault();
        navigateKindByDirection(1);
      } else if (event.shiftKey && event.key === "ArrowLeft") {
        event.preventDefault();
        navigateWineColorByDirection(-1);
      } else if (event.shiftKey && event.key === "ArrowRight") {
        event.preventDefault();
        navigateWineColorByDirection(1);
      } else if (event.key === "ArrowLeft") {
        if (tagName === "button") return;
        event.preventDefault();
        navigateByDirection(-1);
      } else if (event.key === "ArrowRight") {
        if (tagName === "button") return;
        event.preventDefault();
        navigateByDirection(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigateBack, navigateByDirection, navigateKindByDirection, navigateWineColorByDirection]);

  const handleTouchStart = (event: TouchEvent<HTMLElement>, ref = itemSwipeStartRef) => {
    if (event.touches.length !== 1) {
      ref.current = null;
      return;
    }
    const touch = event.touches[0];
    ref.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>, onSwipe: (direction: 1 | -1) => void, ref = itemSwipeStartRef) => {
    const start = ref.current;
    ref.current = null;
    if (!start || event.changedTouches.length === 0) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 52 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    onSwipe(dx < 0 ? 1 : -1);
  };

  const goToSpiritsPractice = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(RESOURCES_VIEW_KEY, JSON.stringify({ beverage: "spirits" }));
      window.location.hash = "#app/resources";
    }
  };

  return (
    <section className="cocktails-shell" onTouchStart={(event) => handleTouchStart(event)} onTouchEnd={(event) => handleTouchEnd(event, navigateByDirection)}>
      <div className="section-header">
        <div className="section-header-copy">
          <h2>Bev Recipes</h2>
          <p>Search a recipe, then explore nearby relatives by base, build, profile, and family.</p>
        </div>
      </div>

      <section
        className="commodity-selector"
        aria-label="Recipe sub tab selector"
        onTouchStart={(event) => {
          event.stopPropagation();
          handleTouchStart(event, kindSwipeStartRef);
        }}
        onTouchEnd={(event) => {
          event.stopPropagation();
          handleTouchEnd(event, navigateKindByDirection, kindSwipeStartRef);
        }}
      >
        <div className="commodity-selector-grid bev-recipes-tabs">
          <button type="button" className={kind === "cocktail" ? "active" : ""} onClick={() => setKind("cocktail")}>
            <span>Cocktails</span>
            <small>Classic relation map</small>
          </button>
          <button type="button" className={kind === "wine" ? "active" : ""} onClick={() => setKind("wine")}>
            <span>Wine</span>
            <small>Style and terroir map</small>
          </button>
          <button type="button" className={kind === "beer" ? "active" : ""} onClick={() => setKind("beer")}>
            <span>Beer</span>
            <small>Family and style map</small>
          </button>
          <button type="button" className={kind === "coffee" ? "active" : ""} onClick={() => setKind("coffee")}>
            <span>Coffee</span>
            <small>Drink build chart</small>
          </button>
        </div>
        {kind === "wine" ? (
          <div
            className="wine-color-toggle"
            aria-label="Wine color map selector"
            onTouchStart={(event) => {
              event.stopPropagation();
              handleTouchStart(event, wineColorSwipeStartRef);
            }}
            onTouchEnd={(event) => {
              event.stopPropagation();
              handleTouchEnd(event, navigateWineColorByDirection, wineColorSwipeStartRef);
            }}
          >
            <button type="button" className={wineColor === "red" ? "active" : ""} onClick={() => setWineColor("red")}>
              Red Wine Map
            </button>
            <button type="button" className={wineColor === "white" ? "active" : ""} onClick={() => setWineColor("white")}>
              White Wine Map
            </button>
          </div>
        ) : null}
      </section>

      <div className="cocktail-search-panel">
        <label htmlFor="bev-recipe-search">{getKindSearchLabel(kind)}</label>
        <div className="cocktail-search-row">
          <input
            id="bev-recipe-search"
            list="bev-recipe-options"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") runSearch();
            }}
            placeholder={getSearchPlaceholder(kind, wineColor)}
          />
          <button type="button" className="btn btn-primary" onClick={runSearch}>
            Map
          </button>
        </div>
        <datalist id="bev-recipe-options">
          {currentItems.map((item) => (
            <option key={item.id} value={item.name} />
          ))}
        </datalist>
      </div>

      <div className="cocktail-map-layout">
        <article className="cocktail-map-card">
          <div className="cocktail-map-stage" aria-label={`${activeItem.name} relationship map`}>
            <div className="cocktail-map-ring ring-one" />
            <div className="cocktail-map-ring ring-two" />
            <div className="cocktail-map-ring ring-three" />
            {nodes.map((node) => (
              <button
                key={node.item.id}
                type="button"
                className={`cocktail-node cocktail-node-${node.closeness}`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, width: `${node.size}px` }}
                onClick={() => selectItem(node.item)}
                onMouseEnter={() => setHoveredId(node.item.id)}
                onFocus={() => setHoveredId(node.item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onBlur={() => setHoveredId(null)}
              >
                {node.item.name}
                <span>{Math.round(node.score * 10)} affinity</span>
              </button>
            ))}
            <button
              type="button"
              className="cocktail-node cocktail-node-center"
              onMouseEnter={() => setHoveredId(activeItem.id)}
              onFocus={() => setHoveredId(activeItem.id)}
              onMouseLeave={() => setHoveredId(null)}
              onBlur={() => setHoveredId(null)}
            >
              {activeItem.name}
              <span>{getSelectedNodeLabel(kind)}</span>
            </button>
            {hoveredItem ? (
              <aside className="cocktail-hover-card" role="dialog" aria-label={`${hoveredItem.name} details`}>
                <BevDetails kind={kind} item={hoveredItem} />
              </aside>
            ) : null}
          </div>
        </article>

        <BevPhoto kind={kind} item={activeItem} />

        <aside className="cocktail-detail-panel">
          <p className="cocktail-kicker">{getSelectedKindLabel(kind)}</p>
          <BevDetails kind={kind} item={activeItem} />
        </aside>
      </div>

      <div className={kind === "beer" || kind === "coffee" || kind === "wine" ? "cocktail-nearest-layout has-color-study" : "cocktail-nearest-layout"}>
        <article className="cocktail-nearest-panel">
          <h3>Nearest relatives</h3>
          <div className="cocktail-nearest-list">
            {nearest.map((node) => (
              <button key={node.item.id} type="button" onClick={() => selectItem(node.item)}>
                <span>{node.item.name}</span>
                <small>{node.item.family}</small>
              </button>
            ))}
          </div>
        </article>
        <BevColorStudyPhoto kind={kind} item={activeItem} />
      </div>

      {kind === "cocktail" ? (
        <article className="wine-resource-panel">
          <div className="wine-resource-panel-head">
            <span>03</span>
            <div>
              <h3>Test Your Product Knowledge</h3>
              <p>Ready for drill mode? Jump to Spirits Practice Prompts in Resources and run a fast category recall set.</p>
            </div>
          </div>
          <div className="wine-resource-spirits-actions">
            <button type="button" className="btn btn-primary" onClick={goToSpiritsPractice}>
              Open Spirits Practice Prompts
            </button>
          </div>
        </article>
      ) : null}
    </section>
  );
}
