import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type TouchEvent } from "react";

type BevKind = "cocktail" | "beer" | "sake" | "coffee" | "wine";
type RecipeView = "ecosystem" | BevKind;
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
  garnish?: string;
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
const COCKTAIL_TECHNIQUE_ATTEMPTS_KEY = "sipstudies:cocktail-technique-attempts:v1";
const bevKindOrder: BevKind[] = ["wine", "beer", "cocktail", "sake", "coffee"];
const wineColorOrder: WineColor[] = ["red", "white"];

const cocktailItems: BevItem[] = [
  { id: "old-fashioned", name: "Old Fashioned", family: "Spirit-forward whiskey", base: ["whiskey"], method: "stirred", ingredients: ["bourbon or rye", "simple syrup or sugar cube", "Angostura bitters"], detailLines: ["2 oz bourbon or rye whiskey", "0.25 oz rich simple syrup or 1 sugar cube", "2 dashes Angostura bitters"], glassware: "Rocks glass", invented: "Louisville, Kentucky, United States, early 1800s", profile: ["spirit-forward", "bitters", "citrus oil"], garnish: "Orange twist", relatives: ["manhattan", "sazerac", "boulevardier", "whiskey-sour"] },
  { id: "manhattan", name: "Manhattan", family: "Whiskey vermouth", base: ["whiskey"], method: "stirred", ingredients: ["rye or bourbon", "sweet vermouth", "Angostura bitters"], detailLines: ["2 oz rye or bourbon", "1 oz sweet vermouth", "2 dashes Angostura bitters"], glassware: "Coupe", invented: "New York City, United States, 1870s", profile: ["spirit-forward", "vermouth", "bitters"], garnish: "Brandied cherry", relatives: ["old-fashioned", "boulevardier", "martini", "sazerac"] },
  { id: "martini", name: "Martini", family: "Gin vermouth", base: ["gin"], method: "stirred", ingredients: ["gin", "dry vermouth"], detailLines: ["2.5 oz gin", "0.5 oz dry vermouth", "1 dash orange bitters (optional)"], glassware: "Cocktail glass", invented: "San Francisco, United States, late 1800s", profile: ["spirit-forward", "dry", "botanical"], garnish: "Lemon twist or olive", relatives: ["vesper", "negroni", "gimlet", "manhattan"] },
  { id: "negroni", name: "Negroni", family: "Bitter aperitivo", base: ["gin"], method: "stirred", ingredients: ["gin", "Campari", "sweet vermouth"], detailLines: ["1 oz gin", "1 oz Campari", "1 oz sweet vermouth"], glassware: "Rocks glass", invented: "Florence, Italy, 1919", profile: ["bitter", "vermouth", "citrus"], garnish: "Orange half-wheel", relatives: ["boulevardier", "martini", "americano", "paper-plane"] },
  { id: "boulevardier", name: "Boulevardier", family: "Bitter aperitivo", base: ["whiskey"], method: "stirred", ingredients: ["bourbon or rye", "Campari", "sweet vermouth"], detailLines: ["1.5 oz bourbon or rye", "1 oz Campari", "1 oz sweet vermouth"], glassware: "Rocks glass", invented: "Paris, France, 1920s", profile: ["bitter", "vermouth", "whiskey"], garnish: "Orange twist", relatives: ["negroni", "old-fashioned", "manhattan", "paper-plane"] },
  { id: "daiquiri", name: "Daiquiri", family: "Rum sour", base: ["rum"], method: "shaken", ingredients: ["white rum", "lime juice", "simple syrup"], detailLines: ["2 oz white rum", "0.75 oz lime juice", "0.75 oz simple syrup"], glassware: "Coupe", invented: "Santiago de Cuba, Cuba, late 1890s", profile: ["sour", "citrus", "bright"], garnish: "Lime wheel", relatives: ["hemingway-daiquiri", "margarita", "gimlet", "mojito"] },
  { id: "hemingway-daiquiri", name: "Hemingway Daiquiri", family: "Rum sour", base: ["rum"], method: "shaken", ingredients: ["white rum", "lime", "grapefruit", "maraschino"], detailLines: ["2 oz white rum", "0.75 oz lime juice", "0.5 oz grapefruit juice", "0.5 oz maraschino liqueur"], glassware: "Coupe", invented: "Havana, Cuba, 1930s", profile: ["sour", "grapefruit", "dry"], garnish: "Lime wheel or grapefruit twist", relatives: ["daiquiri", "aviation", "last-word", "margarita"] },
  { id: "margarita", name: "Margarita", family: "Agave sour", base: ["tequila"], method: "shaken", ingredients: ["tequila", "orange liqueur", "lime juice"], detailLines: ["2 oz tequila", "1 oz orange liqueur", "0.75 oz lime juice"], glassware: "Coupe or rocks glass", invented: "Mexico/U.S. border region, 1930s-1940s", profile: ["sour", "citrus", "agave"], garnish: "Lime wheel and salt rim", relatives: ["daiquiri", "paloma", "tommy-margarita", "sidecar"] },
  { id: "paloma", name: "Paloma", family: "Agave highball", base: ["tequila"], method: "built", ingredients: ["tequila", "lime juice", "grapefruit soda"], detailLines: ["2 oz tequila", "0.5 oz lime juice", "Top with grapefruit soda"], glassware: "Highball", invented: "Jalisco, Mexico, mid-20th century", profile: ["sparkling", "grapefruit", "refreshing"], garnish: "Grapefruit wedge and salt rim", relatives: ["margarita", "tommy-margarita", "mojito", "dark-and-stormy"] },
  { id: "whiskey-sour", name: "Whiskey Sour", family: "Whiskey sour", base: ["whiskey"], method: "shaken", ingredients: ["bourbon or rye", "lemon", "simple syrup"], detailLines: ["2 oz bourbon or rye", "0.75 oz lemon juice", "0.75 oz simple syrup"], glassware: "Rocks glass", invented: "United States, documented 1860s", profile: ["sour", "whiskey", "citrus"], garnish: "Lemon wheel and cocktail cherry", relatives: ["gold-rush", "old-fashioned", "sidecar", "penicillin"] },
  { id: "gold-rush", name: "Gold Rush", family: "Whiskey sour", base: ["bourbon"], method: "shaken", ingredients: ["bourbon", "lemon", "honey syrup"], detailLines: ["2 oz bourbon", "0.75 oz lemon juice", "0.75 oz honey syrup"], glassware: "Rocks glass", invented: "New York City, United States, early 2000s", profile: ["sour", "honey", "whiskey"], garnish: "Lemon twist", relatives: ["whiskey-sour", "penicillin", "bee-knees", "old-fashioned"] },
  { id: "mojito", name: "Mojito", family: "Rum highball", base: ["rum"], method: "built", ingredients: ["white rum", "lime", "mint", "soda"], detailLines: ["2 oz white rum", "0.75 oz lime juice", "0.75 oz simple syrup", "6-8 mint leaves", "Top with soda water"], glassware: "Highball", invented: "Havana, Cuba, early 20th century", profile: ["sparkling", "mint", "citrus"], garnish: "Mint sprig and lime wheel", relatives: ["daiquiri", "southside", "paloma", "tom-collins"] },
  { id: "sazerac", name: "Sazerac", family: "New Orleans whiskey", base: ["rye whiskey", "absinthe"], method: "stirred and rinsed", ingredients: ["rye whiskey", "sugar", "Peychaud's bitters", "absinthe rinse"], detailLines: ["2 oz rye whiskey", "0.25 oz rich simple syrup or sugar cube", "3 dashes Peychaud's bitters", "Absinthe rinse"], glassware: "Rocks glass", invented: "New Orleans, United States, mid-1800s", profile: ["spirit-forward", "anise", "bitters"], garnish: "Lemon peel expressed and discarded or rested on rim", relatives: ["old-fashioned", "manhattan", "vesper", "boulevardier"] },
  { id: "sidecar", name: "Sidecar", family: "Brandy sour", base: ["brandy"], method: "shaken", ingredients: ["cognac", "orange liqueur", "lemon juice"], detailLines: ["1.5 oz cognac", "0.75 oz orange liqueur", "0.75 oz lemon juice", "Sugar rim optional"], glassware: "Coupe", invented: "Paris or London, 1910s-1920s", profile: ["sour", "brandy", "citrus"], garnish: "Orange twist and optional sugar rim", relatives: ["margarita", "whiskey-sour", "daiquiri", "corpse-reviver-no-2"] },
  { id: "gimlet", name: "Gimlet", family: "Gin sour", base: ["gin"], method: "shaken", ingredients: ["gin", "lime cordial or lime juice", "simple syrup"], detailLines: ["2 oz gin", "0.75 oz lime cordial or lime juice", "0.5 oz simple syrup if using fresh lime"], glassware: "Coupe", invented: "British Royal Navy, late 1800s", profile: ["sour", "lime", "botanical"], garnish: "Lime wheel", relatives: ["martini", "daiquiri", "southside", "bee-knees"] },
  { id: "tom-collins", name: "Tom Collins", family: "Gin fizz highball", base: ["gin"], method: "built", ingredients: ["gin", "lemon", "simple syrup", "soda"], detailLines: ["2 oz gin", "0.75 oz lemon juice", "0.75 oz simple syrup", "Top with soda water"], glassware: "Collins glass", invented: "United States/England, documented 1870s", profile: ["sparkling", "lemon", "refreshing"], garnish: "Lemon wheel and cocktail cherry", relatives: ["mojito", "southside", "french-75", "paloma"] },
  { id: "french-75", name: "French 75", family: "Champagne gin sour", base: ["gin", "sparkling wine"], method: "shaken and topped", ingredients: ["gin", "lemon", "simple syrup", "Champagne"], detailLines: ["1 oz gin", "0.5 oz lemon juice", "0.5 oz simple syrup", "Top with Champagne"], glassware: "Flute", invented: "Paris, France, World War I era", profile: ["sparkling", "citrus", "elegant"], garnish: "Lemon twist", relatives: ["tom-collins", "bee-knees", "spritz", "sidecar"] },
  { id: "aviation", name: "Aviation", family: "Floral gin sour", base: ["gin"], method: "shaken", ingredients: ["gin", "lemon", "maraschino", "creme de violette"], detailLines: ["2 oz gin", "0.75 oz lemon juice", "0.5 oz maraschino liqueur", "0.25 oz creme de violette"], glassware: "Coupe", invented: "New York, United States, documented 1916", profile: ["floral", "sour", "maraschino"], garnish: "Brandied cherry", relatives: ["last-word", "hemingway-daiquiri", "gimlet", "bee-knees"] },
  { id: "last-word", name: "Last Word", family: "Equal-parts herbal sour", base: ["gin"], method: "shaken", ingredients: ["gin", "green Chartreuse", "maraschino", "lime"], detailLines: ["0.75 oz gin", "0.75 oz green Chartreuse", "0.75 oz maraschino liqueur", "0.75 oz lime juice"], glassware: "Coupe", invented: "Detroit, United States, 1910s", profile: ["herbal", "sour", "complex"], garnish: "Brandied cherry", relatives: ["aviation", "paper-plane", "daiquiri", "gimlet"] },
  { id: "paper-plane", name: "Paper Plane", family: "Bourbon aperitivo sour", base: ["bourbon"], method: "shaken", ingredients: ["bourbon", "amaro", "Aperol", "lemon"], detailLines: ["0.75 oz bourbon", "0.75 oz Amaro Nonino", "0.75 oz Aperol", "0.75 oz lemon juice"], glassware: "Coupe", invented: "Chicago/New York, United States, 2000s", profile: ["bittersweet", "sour", "bourbon"], garnish: "No garnish or small lemon twist", relatives: ["boulevardier", "last-word", "gold-rush", "whiskey-sour"] },
  { id: "penicillin", name: "Penicillin", family: "Scotch honey sour", base: ["scotch"], method: "shaken", ingredients: ["blended scotch", "lemon", "honey-ginger syrup", "peated scotch float"], detailLines: ["2 oz blended scotch", "0.75 oz lemon juice", "0.75 oz honey-ginger syrup", "0.25 oz peated scotch float"], glassware: "Rocks glass", invented: "New York City, United States, 2005", profile: ["smoky", "honey", "ginger"], garnish: "Candied ginger", relatives: ["gold-rush", "whiskey-sour", "old-fashioned", "paper-plane"] },
  { id: "bee-knees", name: "Bee's Knees", family: "Gin honey sour", base: ["gin"], method: "shaken", ingredients: ["gin", "lemon", "honey syrup"], detailLines: ["2 oz gin", "0.75 oz lemon juice", "0.75 oz honey syrup"], glassware: "Coupe", invented: "United States, Prohibition era", profile: ["sour", "honey", "botanical"], garnish: "Lemon twist", relatives: ["gimlet", "french-75", "gold-rush", "southside"] },
  { id: "mai-tai", name: "Mai Tai", family: "Tiki rum sour", base: ["rum"], method: "shaken", ingredients: ["aged rum", "lime", "orange curacao", "orgeat"], detailLines: ["2 oz aged rum blend", "0.75 oz lime juice", "0.5 oz orange curacao", "0.5 oz orgeat"], glassware: "Double rocks", invented: "Oakland, California, United States, 1944", profile: ["tiki", "almond", "lime"], garnish: "Mint sprig and spent lime shell", relatives: ["daiquiri", "jungle-bird", "zombie", "pina-colada"] },
  { id: "moscow-mule", name: "Moscow Mule", family: "Vodka ginger highball", base: ["vodka", "ginger beer"], method: "built", ingredients: ["vodka", "lime", "ginger beer"], detailLines: ["2 oz vodka", "0.5 oz lime juice", "Top with ginger beer"], glassware: "Copper mug", invented: "Los Angeles, United States, 1940s", profile: ["sparkling", "ginger", "lime"], garnish: "Lime wedge and mint sprig", relatives: ["dark-and-stormy", "paloma", "mojito", "tom-collins"] }
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
  { id: "hazy-ipa", name: "Hazy IPA", family: "Hoppy ale", base: ["new world hops", "pale + oats"], method: "top-fermented", ingredients: ["Citra/Galaxy/Mosaic hops", "pale malt + oats + wheat", "ale yeast", "chloride-forward water"], detailLines: ["Hops: Citra/Galaxy/Mosaic late additions", "Barley: pale with oats/wheat", "Yeast: biotransformation-friendly strain", "Water: chloride-forward, soft"], glassware: "IPA glass", invented: "Vermont, United States, 2000s", profile: ["juicy", "soft bitterness", "tropical"], relatives: ["india-pale-ale", "new-england-ipa", "pale-ale", "wheat-ipa"] },
  { id: "dunkel", name: "Dunkel", family: "Dark lager", base: ["noble hops", "munich malt"], method: "bottom-fermented", ingredients: ["Hallertau hops", "Munich and dark malt", "lager yeast", "carbonate-balanced water"], detailLines: ["Hops: Hallertau or Tettnang", "Barley: Munich-led dark malt bill", "Yeast: clean Bavarian lager strain", "Water: moderate carbonate profile"], glassware: "Dimpled mug", invented: "Bavaria, Germany, traditional lager style", profile: ["bread crust", "toffee", "smooth"], relatives: ["marzen", "bock", "vienna-lager", "schwarzbier"] },
  { id: "bock", name: "Bock", family: "Strong lager", base: ["noble hops", "munich malt"], method: "bottom-fermented", ingredients: ["Hallertau/Tettnang hops", "Munich and Vienna malt", "lager yeast", "moderately hard water"], detailLines: ["Hops: restrained noble hops", "Barley: Munich-rich malt bill", "Yeast: lager strain", "Water: moderate hardness"], glassware: "Stemmed goblet", invented: "Einbeck/Bavaria, Germany, medieval roots", profile: ["malty", "strong", "toasty"], relatives: ["dunkel", "marzen", "vienna-lager", "schwarzbier"] },
  { id: "kolsch", name: "Kolsch", family: "Hybrid ale", base: ["noble hops", "pilsner malt"], method: "top-fermented and cold conditioned", ingredients: ["Hallertau/Spalt hops", "Pilsner malt", "Kolsch ale yeast", "soft water"], detailLines: ["Hops: Hallertau or Spalt", "Barley: mostly Pilsner malt", "Yeast: clean Kolsch ale strain", "Water: soft profile"], glassware: "Stange", invented: "Cologne, Germany, 20th century", profile: ["delicate", "crisp", "subtle fruit"], relatives: ["pilsner", "helles", "pale-ale", "hefeweizen"] },
  { id: "belgian-blonde", name: "Belgian Blonde", family: "Belgian ale", base: ["continental hops", "pilsner malt"], method: "top-fermented", ingredients: ["Saaz/Styrian hops", "Pilsner malt", "Belgian yeast", "soft to moderate water"], detailLines: ["Hops: restrained continental hops", "Barley: Pilsner malt with light sugar optional", "Yeast: fruity Belgian strain", "Water: balanced profile"], glassware: "Tulip", invented: "Belgium, 20th century", profile: ["honeyed", "fruity", "soft spice"], relatives: ["belgian-tripel", "saison", "witbier", "hefeweizen"] },
  { id: "belgian-tripel", name: "Belgian Tripel", family: "Strong Belgian ale", base: ["continental hops", "pilsner malt"], method: "top-fermented", ingredients: ["Saaz/Styrian hops", "Pilsner malt", "Belgian yeast", "candi sugar", "soft water"], detailLines: ["Hops: floral continental hops", "Barley: Pilsner malt with sugar adjunct", "Yeast: expressive Belgian strain", "Water: soft to balanced profile"], glassware: "Goblet", invented: "Belgium, modern abbey style", profile: ["spicy", "strong", "dry"], relatives: ["belgian-blonde", "saison", "witbier", "bock"] },
  { id: "amber-ale", name: "Amber Ale", family: "Malt-forward ale", base: ["american hops", "crystal malt"], method: "top-fermented", ingredients: ["Cascade/Centennial hops", "pale and crystal malt", "American ale yeast", "balanced water"], detailLines: ["Hops: Cascade or Centennial", "Barley: pale malt + crystal malt", "Yeast: clean American ale strain", "Water: balanced sulfate/chloride"], glassware: "Shaker pint", invented: "United States craft brewing, 1980s", profile: ["caramel", "balanced", "toasty"], relatives: ["pale-ale", "vienna-lager", "brown-ale", "india-pale-ale"] },
  { id: "brown-ale", name: "Brown Ale", family: "Malt-forward ale", base: ["english hops", "brown malt"], method: "top-fermented", ingredients: ["Fuggles/EKG hops", "pale, crystal, and chocolate malt", "English yeast", "carbonate water"], detailLines: ["Hops: Fuggles or East Kent Goldings", "Barley: pale + crystal + chocolate malts", "Yeast: English ale strain", "Water: moderate carbonate profile"], glassware: "Nonic pint", invented: "England, modern form 20th century", profile: ["nutty", "caramel", "soft roast"], relatives: ["porter", "amber-ale", "stout", "dunkel"] },
  { id: "schwarzbier", name: "Schwarzbier", family: "Dark lager", base: ["noble hops", "roasted malt"], method: "bottom-fermented", ingredients: ["Hallertau/Spalt hops", "Pilsner malt + debittered roasted malt", "lager yeast", "moderate water"], detailLines: ["Hops: restrained noble hops", "Barley: Pilsner malt + debittered roast", "Yeast: clean lager strain", "Water: balanced profile"], glassware: "Pilsner glass or mug", invented: "Thuringia/Saxony, Germany, medieval roots", profile: ["dark", "smooth roast", "dry"], relatives: ["dunkel", "porter", "stout", "bock"] },
  { id: "double-ipa", name: "Double IPA", family: "Hoppy ale", base: ["american hops", "pale malt"], method: "top-fermented", ingredients: ["Citra/Simcoe/Columbus hops", "pale malt", "American ale yeast", "sulfate-rich water"], detailLines: ["Hops: heavy American late/dry hops", "Barley: pale malt backbone", "Yeast: clean attenuative ale strain", "Water: sulfate-forward profile"], glassware: "IPA glass", invented: "United States craft brewing, 1990s", profile: ["intense hop", "resin", "strong"], relatives: ["india-pale-ale", "west-coast-ipa", "hazy-ipa", "pale-ale"] },
  { id: "west-coast-ipa", name: "West Coast IPA", family: "Hoppy ale", base: ["american hops", "pale malt"], method: "top-fermented", ingredients: ["Cascade/Centennial/Simcoe hops", "pale malt", "American ale yeast", "sulfate-rich water"], detailLines: ["Hops: piney citrus American hops", "Barley: dry pale malt base", "Yeast: clean American ale strain", "Water: sulfate-heavy for snap"], glassware: "IPA glass", invented: "California, United States, 1990s", profile: ["pine", "dry", "bitter"], relatives: ["india-pale-ale", "double-ipa", "pale-ale", "hazy-ipa"] },
  { id: "sour-ale", name: "Sour Ale", family: "Mixed fermentation", base: ["aged hops", "pilsner malt"], method: "mixed-culture fermentation", ingredients: ["aged hops", "pilsner/wheat malt", "Saccharomyces and bacteria", "soft water"], detailLines: ["Hops: aged low-bitterness hops", "Barley/Wheat: pale malt with wheat optional", "Microbes: yeast plus lactic acid bacteria", "Water: soft to balanced profile"], glassware: "Tulip", invented: "European mixed-fermentation traditions", profile: ["tart", "funky", "bright"], relatives: ["gose", "saison", "witbier", "belgian-blonde"] },
  { id: "gose", name: "Gose", family: "Sour wheat ale", base: ["coriander", "wheat malt", "salt"], method: "kettle-soured or mixed fermented", ingredients: ["coriander", "wheat and barley malt", "lactic culture", "salted water"], detailLines: ["Hops: very low bitterness", "Barley/Wheat: wheat-heavy grist", "Yeast/Bacteria: ale yeast + lactic culture", "Water: lightly salted profile"], glassware: "Stange or tumbler", invented: "Goslar/Leipzig, Germany, medieval roots", profile: ["tart", "saline", "coriander"], relatives: ["sour-ale", "witbier", "saison", "hefeweizen"] }
];

const sakeItems: BevItem[] = [
  { id: "futsushu", name: "Futsushu", family: "Table sake", base: ["rice", "koji", "water", "yeast"], method: "standard sake fermentation", ingredients: ["rice", "koji rice", "water", "yeast", "optional brewer's alcohol"], detailLines: ["Rice polish: not fixed by premium class", "Alcohol: may include brewer's alcohol", "Koji: converts rice starch to sugar", "Style role: everyday table sake"], glassware: "Ochoko or small wine glass", invented: "Japan / everyday sake category", profile: ["simple", "grain", "easy-drinking"], relatives: ["honjozo", "junmai", "tokubetsu-honjozo", "genshu"] },
  { id: "junmai", name: "Junmai", family: "Pure rice sake", base: ["rice", "koji", "water", "yeast"], method: "multiple parallel fermentation", ingredients: ["rice", "koji rice", "water", "yeast"], detailLines: ["Rice polish: no minimum polishing rule in the base class", "Alcohol: no added brewer's alcohol", "Koji: at least 15% of rice weight", "Style role: savory rice expression"], glassware: "Ochoko, guinomi, or wine glass", invented: "Japan / traditional premium sake class", profile: ["rice", "umami", "full-bodied"], relatives: ["tokubetsu-junmai", "junmai-ginjo", "kimoto", "yamahai"] },
  { id: "tokubetsu-junmai", name: "Tokubetsu Junmai", family: "Special pure rice sake", base: ["rice", "koji", "water", "yeast"], method: "special-designation junmai brewing", ingredients: ["special rice or special polish", "koji rice", "water", "yeast"], detailLines: ["Rice polish: usually 60% or special declared method", "Alcohol: no added brewer's alcohol", "Koji: drives cereal sweetness and umami", "Style role: cleaner or more distinctive junmai"], glassware: "Guinomi or white wine glass", invented: "Japan / special designation class", profile: ["umami", "structured", "clean"], relatives: ["junmai", "junmai-ginjo", "tokubetsu-honjozo", "kimoto"] },
  { id: "honjozo", name: "Honjozo", family: "Brewer's alcohol premium sake", base: ["rice", "koji", "water", "yeast", "brewer's alcohol"], method: "alcohol-adjusted premium brewing", ingredients: ["rice polished to 70% or less", "koji rice", "water", "yeast", "small brewer's alcohol addition"], detailLines: ["Rice polish: 70% or less", "Alcohol: small addition for aroma and texture", "Koji: supports clean fermentable extract", "Style role: light, crisp, food-friendly sake"], glassware: "Ochoko or small white wine glass", invented: "Japan / premium sake class", profile: ["light", "clean", "fragrant"], relatives: ["tokubetsu-honjozo", "ginjo", "futsushu", "namachozo"] },
  { id: "tokubetsu-honjozo", name: "Tokubetsu Honjozo", family: "Special honjozo sake", base: ["rice", "koji", "water", "yeast", "brewer's alcohol"], method: "special-designation honjozo brewing", ingredients: ["special rice or special polish", "koji rice", "water", "yeast", "small brewer's alcohol addition"], detailLines: ["Rice polish: usually 60% or special declared method", "Alcohol: small controlled addition", "Koji: balances aroma and body", "Style role: refined honjozo with extra distinction"], glassware: "Ochoko or white wine glass", invented: "Japan / special designation class", profile: ["clean", "smooth", "delicate"], relatives: ["honjozo", "ginjo", "tokubetsu-junmai", "futsushu"] },
  { id: "ginjo", name: "Ginjo", family: "Aromatic premium sake", base: ["rice", "koji", "water", "yeast", "brewer's alcohol"], method: "low-temperature ginjo fermentation", ingredients: ["rice polished to 60% or less", "koji rice", "water", "aromatic yeast", "optional brewer's alcohol"], detailLines: ["Rice polish: 60% or less", "Fermentation: cool and slow", "Alcohol: may include brewer's alcohol", "Style role: lifted fruit and floral aromatics"], glassware: "Tulip sake glass or white wine glass", invented: "Japan / modern ginjo brewing", profile: ["floral", "melon", "light"], relatives: ["daiginjo", "junmai-ginjo", "honjozo", "namazake"] },
  { id: "daiginjo", name: "Daiginjo", family: "Highly polished aromatic sake", base: ["rice", "koji", "water", "yeast", "brewer's alcohol"], method: "highly polished low-temperature fermentation", ingredients: ["rice polished to 50% or less", "koji rice", "water", "aromatic yeast", "optional brewer's alcohol"], detailLines: ["Rice polish: 50% or less", "Fermentation: very cool and slow", "Alcohol: may include small brewer's alcohol addition", "Style role: elegant, precise, aromatic sake"], glassware: "Tulip sake glass", invented: "Japan / modern premium sake class", profile: ["elegant", "pear", "floral"], relatives: ["junmai-daiginjo", "ginjo", "junmai-ginjo", "muroka"] },
  { id: "junmai-ginjo", name: "Junmai Ginjo", family: "Pure rice aromatic sake", base: ["rice", "koji", "water", "yeast"], method: "low-temperature junmai ginjo fermentation", ingredients: ["rice polished to 60% or less", "koji rice", "water", "aromatic yeast"], detailLines: ["Rice polish: 60% or less", "Alcohol: no added brewer's alcohol", "Fermentation: cool and slow", "Style role: fruit aroma with rice depth"], glassware: "Tulip sake glass or white wine glass", invented: "Japan / premium sake class", profile: ["fruity", "silky", "balanced"], relatives: ["junmai-daiginjo", "ginjo", "tokubetsu-junmai", "junmai"] },
  { id: "junmai-daiginjo", name: "Junmai Daiginjo", family: "Pure rice highly polished sake", base: ["rice", "koji", "water", "yeast"], method: "highly polished junmai fermentation", ingredients: ["rice polished to 50% or less", "koji rice", "water", "aromatic yeast"], detailLines: ["Rice polish: 50% or less", "Alcohol: no added brewer's alcohol", "Fermentation: cool, slow, and precise", "Style role: pure rice elegance and fragrance"], glassware: "Tulip sake glass", invented: "Japan / premium sake class", profile: ["luxury", "fragrant", "refined"], relatives: ["daiginjo", "junmai-ginjo", "ginjo", "muroka"] },
  { id: "kimoto", name: "Kimoto", family: "Traditional starter sake", base: ["rice", "koji", "water", "yeast", "lactic acid"], method: "labor-intensive natural lactic starter", ingredients: ["rice", "koji rice", "water", "yeast", "naturally developed lactic acid"], detailLines: ["Starter: traditional yama-oroshi pole-mashing method", "Lactic acid: develops naturally", "Alcohol: can be junmai or alcohol-added", "Style role: savory depth and firm acidity"], glassware: "Guinomi or Burgundy glass", invented: "Japan / Edo-period starter method", profile: ["savory", "earthy", "acidic"], relatives: ["yamahai", "junmai", "tokubetsu-junmai", "koshu"] },
  { id: "yamahai", name: "Yamahai", family: "Traditional starter sake", base: ["rice", "koji", "water", "yeast", "lactic acid"], method: "natural lactic starter without pole mashing", ingredients: ["rice", "koji rice", "water", "yeast", "naturally developed lactic acid"], detailLines: ["Starter: kimoto-derived method without yama-oroshi mashing", "Lactic acid: develops naturally", "Alcohol: can be junmai or alcohol-added", "Style role: wild acidity, umami, and complexity"], glassware: "Guinomi or Burgundy glass", invented: "Japan / early 1900s starter method", profile: ["umami", "gamey", "bright acid"], relatives: ["kimoto", "junmai", "koshu", "genshu"] },
  { id: "namazake", name: "Namazake", family: "Unpasteurized sake", base: ["rice", "koji", "water", "yeast"], method: "unpasteurized cold-chain sake", ingredients: ["fresh sake", "koji rice", "water", "yeast"], detailLines: ["Pasteurization: none", "Storage: keep refrigerated", "Aroma: vivid and fresh", "Style role: lively seasonal freshness"], glassware: "Chilled sake glass", invented: "Japan / fresh sake service style", profile: ["fresh", "lively", "green"], relatives: ["namachozo", "namazume", "ginjo", "nigori"] },
  { id: "namachozo", name: "Namachozo", family: "Once-pasteurized sake", base: ["rice", "koji", "water", "yeast"], method: "stored raw, pasteurized before release", ingredients: ["sake stored unpasteurized", "koji rice", "water", "yeast"], detailLines: ["Pasteurization: once before bottling or shipping", "Storage: often refrigerated before release", "Aroma: fresher than twice-pasteurized sake", "Style role: bright but more stable than namazake"], glassware: "Chilled sake glass", invented: "Japan / modern freshness style", profile: ["fresh", "smooth", "clean"], relatives: ["namazake", "namazume", "honjozo", "ginjo"] },
  { id: "namazume", name: "Namazume", family: "Once-pasteurized sake", base: ["rice", "koji", "water", "yeast"], method: "pasteurized before storage, not at bottling", ingredients: ["once-pasteurized sake", "koji rice", "water", "yeast"], detailLines: ["Pasteurization: once before storage", "Release: often autumn as hiyaoroshi", "Aroma: rounded freshness", "Style role: mellow seasonal sake"], glassware: "Guinomi or chilled sake glass", invented: "Japan / seasonal storage style", profile: ["mellow", "seasonal", "soft"], relatives: ["hiyaoroshi", "namachozo", "namazake", "junmai"] },
  { id: "hiyaoroshi", name: "Hiyaoroshi", family: "Autumn seasonal sake", base: ["rice", "koji", "water", "yeast"], method: "spring-brewed, summer-matured, autumn-released", ingredients: ["matured sake", "koji rice", "water", "yeast"], detailLines: ["Timing: released in autumn", "Pasteurization: commonly one time before storage", "Maturation: summer aging rounds edges", "Style role: seasonal mellow depth"], glassware: "Guinomi or wine glass", invented: "Japan / autumn release tradition", profile: ["mellow", "umami", "autumnal"], relatives: ["namazume", "junmai", "kimoto", "koshu"] },
  { id: "nigori", name: "Nigori", family: "Cloudy sake", base: ["rice", "koji", "water", "yeast", "lees"], method: "coarsely filtered sake", ingredients: ["sake", "fine rice lees", "koji rice", "water", "yeast"], detailLines: ["Filtration: coarse, leaving rice sediment", "Texture: creamy or lightly chalky", "Service: shake gently if label allows", "Style role: cloudy texture and rice sweetness"], glassware: "Small tumbler or sake cup", invented: "Japan / cloudy sake style", profile: ["cloudy", "creamy", "sweet rice"], relatives: ["namazake", "sparkling-sake", "junmai", "genshu"] },
  { id: "genshu", name: "Genshu", family: "Undiluted sake", base: ["rice", "koji", "water", "yeast"], method: "undiluted after fermentation", ingredients: ["full-strength sake", "koji rice", "water", "yeast"], detailLines: ["Dilution: no post-fermentation water adjustment", "Alcohol: often higher than standard sake", "Texture: fuller body", "Style role: intensity and concentration"], glassware: "Rocks glass, guinomi, or wine glass", invented: "Japan / strength-based sake style", profile: ["full-bodied", "intense", "warming"], relatives: ["junmai", "yamahai", "nigori", "muroka"] },
  { id: "muroka", name: "Muroka", family: "Charcoal-unfiltered sake", base: ["rice", "koji", "water", "yeast"], method: "no charcoal fining", ingredients: ["sake without charcoal filtration", "koji rice", "water", "yeast"], detailLines: ["Filtration: no charcoal fining", "Flavor: more color, aroma, or texture may remain", "Alcohol: can be diluted or genshu", "Style role: vivid, less polished expression"], glassware: "Wine glass or guinomi", invented: "Japan / filtration-choice style", profile: ["vivid", "textural", "expressive"], relatives: ["genshu", "junmai-daiginjo", "daiginjo", "namazake"] },
  { id: "koshu", name: "Koshu", family: "Aged sake", base: ["rice", "koji", "water", "yeast"], method: "extended maturation", ingredients: ["aged sake", "koji rice", "water", "yeast"], detailLines: ["Aging: matured beyond normal release cycles", "Color: may deepen toward gold or amber", "Aroma: nuts, dried fruit, caramel, spice", "Style role: oxidative and aged complexity"], glassware: "Small wine glass or cordial glass", invented: "Japan / aged sake tradition", profile: ["aged", "nutty", "dried fruit"], relatives: ["kijoshu", "kimoto", "yamahai", "hiyaoroshi"] },
  { id: "kijoshu", name: "Kijoshu", family: "Rich dessert-style sake", base: ["rice", "koji", "water", "yeast", "sake"], method: "part of brewing water replaced with sake", ingredients: ["rice", "koji rice", "water", "yeast", "finished sake"], detailLines: ["Brew design: some water replaced by sake during fermentation", "Sweetness: rich residual sweetness", "Texture: dense and dessert-like", "Style role: pairing for cheese, foie gras, or dessert"], glassware: "Cordial glass or small wine glass", invented: "Japan / modern specialty sake style", profile: ["sweet", "rich", "honeyed"], relatives: ["koshu", "genshu", "nigori", "sparkling-sake"] },
  { id: "taruzake", name: "Taruzake", family: "Cedar cask sake", base: ["rice", "koji", "water", "yeast", "cedar"], method: "cedar cask conditioning", ingredients: ["sake", "Yoshino cedar cask influence"], detailLines: ["Cask: rested in Japanese cedar", "Aroma: wood, resin, spice", "Service: often ceremonial or festive", "Style role: cedar fragrance over sake base"], glassware: "Masu box or ochoko", invented: "Japan / cedar cask tradition", profile: ["cedar", "spicy", "festive"], relatives: ["honjozo", "futsushu", "junmai", "koshu"] },
  { id: "sparkling-sake", name: "Sparkling Sake", family: "Carbonated sake", base: ["rice", "koji", "water", "yeast", "carbonation"], method: "bottle fermentation or carbonation", ingredients: ["sake", "carbon dioxide or secondary fermentation"], detailLines: ["Carbonation: bottle-fermented or injected", "Sweetness: ranges dry to sweet", "Texture: bubbles lift aroma and sweetness", "Style role: aperitif or celebration sake"], glassware: "Flute or white wine glass", invented: "Japan / modern sparkling style", profile: ["bubbly", "bright", "celebratory"], relatives: ["nigori", "namazake", "kijoshu", "junmai-ginjo"] },
  { id: "ki-ippon", name: "Ki-ippon", family: "Single-brewery pure rice sake", base: ["rice", "koji", "water", "yeast"], method: "single-brewery junmai production", ingredients: ["rice", "koji rice", "water", "yeast"], detailLines: ["Alcohol: no added brewer's alcohol", "Production: made at one brewery", "Identity: emphasizes brewery-specific expression", "Style role: focused pure-rice house style"], glassware: "Guinomi or white wine glass", invented: "Japan / premium labeling term", profile: ["pure rice", "house style", "focused"], relatives: ["junmai", "tokubetsu-junmai", "junmai-ginjo", "kimoto"] },
  { id: "tezukuri", name: "Tezukuri", family: "Handmade-style sake", base: ["rice", "koji", "water", "yeast"], method: "traditional handmade-oriented production", ingredients: ["rice", "koji rice", "water", "yeast"], detailLines: ["Production: traditional hands-on process emphasis", "Starter: commonly traditional or carefully managed", "Alcohol: class depends on base style", "Style role: craft-focused process label"], glassware: "Guinomi or sake glass", invented: "Japan / premium labeling term", profile: ["crafted", "traditional", "textural"], relatives: ["junmai", "kimoto", "yamahai", "ki-ippon"] }
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
  { id: "nebbiolo", name: "Nebbiolo", family: "High-tannin red", base: ["nebbiolo"], method: "fermented and aged", ingredients: ["Nebbiolo grape", "Saccharomyces yeast"], detailLines: ["Grape: Nebbiolo", "Yeast: native or cultured Saccharomyces strains"], terroir: "Calcareous marl and fog-influenced Piedmont hillsides build perfume, acid, and firm tannin.", glassware: "Burgundy glass", invented: "Europe / Piedmont, Italy", profile: ["rose", "tar", "high tannin", "red cherry"], relatives: ["pinot-noir", "sangiovese", "tempranillo", "syrah"], wineColor: "red" },
  { id: "gamay", name: "Gamay", family: "Light-bodied red", base: ["gamay"], method: "fermented, often semi-carbonic", ingredients: ["Gamay grape", "Saccharomyces yeast"], detailLines: ["Grape: Gamay", "Yeast: native or cultured Saccharomyces strains"], terroir: "Granite and schist soils in Beaujolais emphasize red fruit, floral lift, and juicy texture.", glassware: "Burgundy glass", invented: "Europe / Beaujolais, France", profile: ["raspberry", "violet", "low tannin", "juicy"], relatives: ["pinot-noir", "sangiovese", "grenache", "nebbiolo"], wineColor: "red" },

  { id: "white-bordeaux", name: "White Bordeaux Blend", family: "Bordeaux regional white blend", base: ["sauvignon blanc", "semillon", "muscadelle"], method: "fermented and blended", ingredients: ["Sauvignon Blanc + Semillon + Muscadelle", "Saccharomyces yeast"], detailLines: ["Grape: Sauvignon Blanc/Semillon blend", "Yeast: native or cultured Saccharomyces strains"], terroir: "Gravel and limestone in maritime Bordeaux preserve freshness while Semillon adds texture.", glassware: "Sauvignon Blanc glass", invented: "Europe / Bordeaux, France", profile: ["citrus", "waxy", "herbal", "mineral"], relatives: ["sauvignon-blanc", "chardonnay", "chenin-blanc", "cote-de-rhone-blanc"], wineColor: "white" },
  { id: "cote-de-rhone-blanc", name: "Cote de Rhone Blanc", family: "Rhone regional white blend", base: ["grenache blanc", "viognier", "roussanne"], method: "fermented and blended", ingredients: ["Grenache Blanc + Viognier + Roussanne", "Saccharomyces yeast"], detailLines: ["Grape: Southern Rhone white field blend", "Yeast: native or cultured Saccharomyces strains"], terroir: "Mediterranean warmth with limestone and clay gives stone fruit, body, and herbal lift.", glassware: "Universal white wine glass", invented: "Europe / Southern Rhone, France", profile: ["stone fruit", "herbal", "round texture", "medium acid"], relatives: ["white-bordeaux", "chardonnay", "viognier", "chenin-blanc"], wineColor: "white" },
  { id: "chardonnay", name: "Chardonnay", family: "Medium to full-bodied white", base: ["chardonnay"], method: "fermented, optional malolactic and oak aging", ingredients: ["Chardonnay grape", "Saccharomyces yeast"], detailLines: ["Grape: Chardonnay", "Yeast: cultured or native Saccharomyces strains"], terroir: "Limestone and marl support tension/minerality; warmer sites and oak drive richer texture.", glassware: "Chardonnay glass", invented: "Europe / Burgundy, France", profile: ["apple", "citrus", "butter", "oak"], relatives: ["chenin-blanc", "viognier", "sauvignon-blanc", "white-bordeaux"], wineColor: "white" },
  { id: "sauvignon-blanc", name: "Sauvignon Blanc", family: "Light to medium-bodied white", base: ["sauvignon blanc"], method: "cool fermentation", ingredients: ["Sauvignon Blanc grape", "Saccharomyces yeast"], detailLines: ["Grape: Sauvignon Blanc", "Yeast: aromatic-preserving cool-ferment strains"], terroir: "Cool climates and flint/limestone soils sharpen acidity and herbal-citrus lift.", glassware: "Sauvignon Blanc glass", invented: "Europe / Loire Valley, France", profile: ["citrus", "gooseberry", "herbal", "high acid"], relatives: ["riesling", "albarino", "chenin-blanc", "white-bordeaux"], wineColor: "white" },
  { id: "riesling", name: "Riesling", family: "Light-bodied aromatic white", base: ["riesling"], method: "cool fermentation", ingredients: ["Riesling grape", "Saccharomyces yeast"], detailLines: ["Grape: Riesling", "Yeast: aromatic cool-fermentation strains"], terroir: "Slate and steep cool-climate vineyards produce electric acidity and mineral precision.", glassware: "Riesling glass", invented: "Europe / Rhine and Mosel, Germany", profile: ["lime", "peach", "floral", "mineral"], relatives: ["sauvignon-blanc", "gewurztraminer", "chenin-blanc", "albarino"], wineColor: "white" },
  { id: "chenin-blanc", name: "Chenin Blanc", family: "High-acid versatile white", base: ["chenin blanc"], method: "cool fermentation", ingredients: ["Chenin Blanc grape", "Saccharomyces yeast"], detailLines: ["Grape: Chenin Blanc", "Yeast: selected or native ferment strains"], terroir: "Tuffeau limestone and cooler valley sites favor acidity and waxy orchard-fruit character.", glassware: "Universal white wine glass", invented: "Europe / Loire Valley, France", profile: ["apple", "quince", "honey", "high acid"], relatives: ["chardonnay", "riesling", "sauvignon-blanc", "viognier"], wineColor: "white" },
  { id: "gewurztraminer", name: "Gewurztraminer", family: "Aromatic white", base: ["gewurztraminer"], method: "cool fermentation", ingredients: ["Gewurztraminer grape", "Saccharomyces yeast"], detailLines: ["Grape: Gewurztraminer", "Yeast: aromatic lift fermentation strains"], terroir: "Cool aromatic-growing zones and well-drained soils highlight rose, lychee, and spice.", glassware: "Aromatic white wine glass", invented: "Europe / Alsace, France", profile: ["lychee", "rose", "spice", "low acid"], relatives: ["riesling", "viognier", "chenin-blanc", "pinot-gris"], wineColor: "white" },
  { id: "pinot-gris", name: "Pinot Gris/Grigio", family: "Light to medium-bodied white", base: ["pinot gris"], method: "cool fermentation", ingredients: ["Pinot Gris grape", "Saccharomyces yeast"], detailLines: ["Grape: Pinot Gris", "Yeast: neutral aromatic fermentation strains"], terroir: "Cool alpine and limestone sites can preserve fresh pear/citrus with a mineral edge.", glassware: "Universal white wine glass", invented: "Europe / Alsace & Northern Italy", profile: ["pear", "citrus", "almond", "medium acid"], relatives: ["sauvignon-blanc", "riesling", "chardonnay", "gewurztraminer"], wineColor: "white" },
  { id: "viognier", name: "Viognier", family: "Aromatic full-bodied white", base: ["viognier"], method: "fermented and aged", ingredients: ["Viognier grape", "Saccharomyces yeast"], detailLines: ["Grape: Viognier", "Yeast: aromatic retention strains"], terroir: "Sunlit slopes with granite and warm days produce apricot richness and floral perfume.", glassware: "Aromatic white wine glass", invented: "Europe / Rhone Valley, France", profile: ["apricot", "honeysuckle", "rich texture", "low-medium acid"], relatives: ["chardonnay", "chenin-blanc", "gewurztraminer", "cote-de-rhone-blanc"], wineColor: "white" },
  { id: "albarino", name: "Albarino", family: "Crisp aromatic white", base: ["albarino"], method: "cool fermentation", ingredients: ["Albarino grape", "Saccharomyces yeast"], detailLines: ["Grape: Albarino", "Yeast: cool aromatic fermentation strains"], terroir: "Atlantic coastal vineyards with granite sands create saline citrus precision.", glassware: "Sauvignon Blanc glass", invented: "Europe / Rias Baixas, Spain", profile: ["lime", "stone fruit", "saline", "high acid"], relatives: ["sauvignon-blanc", "riesling", "pinot-gris", "chenin-blanc"], wineColor: "white" },
  { id: "gruner-veltliner", name: "Gruner Veltliner", family: "Crisp peppery white", base: ["gruner veltliner"], method: "cool fermentation", ingredients: ["Gruner Veltliner grape", "Saccharomyces yeast"], detailLines: ["Grape: Gruner Veltliner", "Yeast: neutral cool-fermentation strains"], terroir: "Loess and primary rock soils in Austria preserve citrus snap, herb tones, and white pepper.", glassware: "Universal white wine glass", invented: "Europe / Austria", profile: ["lime", "white pepper", "green apple", "high acid"], relatives: ["riesling", "sauvignon-blanc", "albarino", "chenin-blanc"], wineColor: "white" },
  { id: "semillon", name: "Semillon", family: "Textural white", base: ["semillon"], method: "fermented and optionally aged", ingredients: ["Semillon grape", "Saccharomyces yeast"], detailLines: ["Grape: Semillon", "Yeast: neutral or texture-building strains"], terroir: "Gravel, clay, and warm maritime sites build waxy texture, citrus, and honeyed ageability.", glassware: "Universal white wine glass", invented: "Europe / Bordeaux, France", profile: ["lemon curd", "waxy", "honey", "medium acid"], relatives: ["white-bordeaux", "chardonnay", "chenin-blanc", "sauvignon-blanc"], wineColor: "white" }
];

const byKind: Record<BevKind, BevItem[]> = {
  cocktail: cocktailItems,
  beer: beerItems,
  sake: sakeItems,
  coffee: coffeeItems,
  wine: wineItems
};

type BeverageCategory = "wine" | "beer" | "spirits" | "coffee" | "tea" | "kombucha" | "milk" | "juice" | "water" | "energy" | "health" | "na";

type EcosystemNode = {
  id: string;
  label: string;
  category: BeverageCategory;
  tags: string[];
  x: number;
  y: number;
  laneX: number;
  laneY: number;
  lat: number;
  lon: number;
};

const beverageCategoryMeta: Record<BeverageCategory, { label: string; color: string; short: string }> = {
  wine: { label: "Wine", color: "#a855f7", short: "WI" },
  beer: { label: "Beer", color: "#facc15", short: "BE" },
  spirits: { label: "Spirits", color: "#22c55e", short: "SP" },
  coffee: { label: "Coffee", color: "#06b6d4", short: "CO" },
  tea: { label: "Tea", color: "#84cc16", short: "TE" },
  kombucha: { label: "Kombucha", color: "#fb7185", short: "KO" },
  milk: { label: "Milk", color: "#f9a8d4", short: "MI" },
  juice: { label: "Juice", color: "#fb923c", short: "JU" },
  water: { label: "Water", color: "#60a5fa", short: "WA" },
  energy: { label: "Energy", color: "#ef4444", short: "EN" },
  health: { label: "Health", color: "#2dd4bf", short: "HE" },
  na: { label: "N/A Bev", color: "#e5e7eb", short: "NA" }
};

function ecosystemTags(category: BeverageCategory, label: string): string[] {
  const lower = label.toLowerCase();
  const tags = new Set<string>();
  if (["wine", "beer", "kombucha", "milk", "na"].includes(category)) tags.add("fermented");
  if (category === "spirits") tags.add("distilled");
  if (["coffee", "tea", "energy"].includes(category) || lower.includes("cola") || lower.includes("mate")) tags.add("caffeine");
  if (["juice", "health"].includes(category)) tags.add("fruit");
  if (category === "water") tags.add("hydration");
  if (lower.includes("sparkling") || lower.includes("soda") || lower.includes("seltzer") || lower.includes("tonic") || lower.includes("fizz")) tags.add("sparkling");
  if (lower.includes("sour") || lower.includes("gose") || lower.includes("vinegar") || lower.includes("lemon") || lower.includes("lime") || lower.includes("kombucha")) tags.add("acidic");
  if (lower.includes("milk") || lower.includes("latte") || lower.includes("lassi") || lower.includes("kefir") || lower.includes("yogurt") || lower.includes("shake")) tags.add("creamy");
  if (lower.includes("na ") || lower.includes("dealcoholized") || lower.includes("mocktail") || lower.includes("zero-proof")) tags.add("nonalcoholic");
  if (lower.includes("ipa") || lower.includes("hoppy") || lower.includes("hop")) tags.add("hoppy");
  if (lower.includes("herbal") || lower.includes("botanical") || lower.includes("amaro") || lower.includes("gin")) tags.add("botanical");
  if (lower.includes("protein") || lower.includes("wellness") || lower.includes("functional") || lower.includes("electrolyte")) tags.add("functional");
  tags.add(category);
  return Array.from(tags).slice(0, 4);
}

const beverageEcosystemGroups: Array<{ category: BeverageCategory; nodes: Array<{ label: string; tags: string[] }> }> = [
  { category: "wine", nodes: ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Syrah", "Malbec", "Tempranillo", "Sangiovese", "Nebbiolo", "Gamay", "Grenache", "Zinfandel", "Cabernet Franc", "Carmenere", "Petit Verdot", "Mourvedre", "Barbera", "Dolcetto", "Chardonnay", "Sauvignon Blanc", "Riesling", "Chenin Blanc", "Semillon", "Viognier", "Gewurztraminer", "Pinot Gris", "Albarino", "Gruner Veltliner", "Muscadet", "Vermentino", "Assyrtiko", "Torrontes", "Sparkling Wine", "Champagne", "Prosecco", "Cava", "Rose", "Orange Wine", "Port", "Sherry", "Madeira"].map((label) => ({ label, tags: ecosystemTags("wine", label) })) },
  { category: "beer", nodes: ["Pilsner", "Helles", "Marzen", "Vienna Lager", "Dunkel", "Bock", "Doppelbock", "Schwarzbier", "Kolsch", "Altbier", "Cream Ale", "Hefeweizen", "Dunkelweizen", "Witbier", "Saison", "Belgian Blonde", "Belgian Tripel", "Belgian Dubbel", "Belgian Quad", "Pale Ale", "IPA", "West Coast IPA", "Hazy IPA", "Double IPA", "Session IPA", "Amber Ale", "Brown Ale", "Porter", "Stout", "Oatmeal Stout", "Imperial Stout", "Milk Stout", "Barleywine", "Sour Ale", "Gose", "Berliner Weisse", "Lambic", "Flanders Red", "Rauchbier", "Fruit Beer"].map((label) => ({ label, tags: ecosystemTags("beer", label) })) },
  { category: "spirits", nodes: ["Vodka", "Gin", "London Dry Gin", "Old Tom Gin", "Rum", "White Rum", "Aged Rum", "Rhum Agricole", "Cachaca", "Tequila", "Blanco Tequila", "Reposado Tequila", "Anejo Tequila", "Mezcal", "Bourbon", "Rye Whiskey", "Tennessee Whiskey", "Scotch", "Single Malt Scotch", "Blended Scotch", "Irish Whiskey", "Japanese Whisky", "Canadian Whisky", "Brandy", "Cognac", "Armagnac", "Pisco", "Calvados", "Applejack", "Absinthe", "Aquavit", "Amaro", "Aperitivo", "Vermouth", "Triple Sec", "Coffee Liqueur", "Cream Liqueur", "Herbal Liqueur", "Baijiu", "Shochu"].map((label) => ({ label, tags: ecosystemTags("spirits", label) })) },
  { category: "coffee", nodes: ["Espresso", "Ristretto", "Lungo", "Americano", "Long Black", "Drip Coffee", "Pour Over", "French Press", "AeroPress", "Moka Pot", "Cold Brew", "Nitro Cold Brew", "Iced Coffee", "Latte", "Cappuccino", "Flat White", "Cortado", "Macchiato", "Mocha", "Affogato", "Irish Coffee", "Cafe au Lait", "Turkish Coffee", "Greek Coffee", "Vietnamese Coffee", "Cafe de Olla", "Red Eye", "Doppio", "Decaf Coffee", "Chicory Coffee", "Coffee Soda", "Espresso Tonic"].map((label) => ({ label, tags: ecosystemTags("coffee", label) })) },
  { category: "tea", nodes: ["Black Tea", "Green Tea", "Oolong", "White Tea", "Yellow Tea", "Pu-erh", "Matcha", "Sencha", "Gyokuro", "Genmaicha", "Hojicha", "Jasmine Tea", "Earl Grey", "English Breakfast", "Darjeeling", "Assam", "Ceylon Tea", "Chai", "Masala Chai", "Yerba Mate", "Guayusa", "Rooibos", "Honeybush", "Chamomile", "Peppermint Tea", "Hibiscus Tea", "Ginger Tea", "Turmeric Tea", "Iced Tea", "Sweet Tea", "Bubble Tea", "Milk Tea"].map((label) => ({ label, tags: ecosystemTags("tea", label) })) },
  { category: "kombucha", nodes: ["Classic Kombucha", "Jun Kombucha", "Green Tea Kombucha", "Black Tea Kombucha", "Ginger Kombucha", "Berry Kombucha", "Citrus Kombucha", "Hop Kombucha", "Lavender Kombucha", "Turmeric Kombucha", "Hard Kombucha", "Low Sugar Kombucha", "Kombucha Vinegar", "Kombucha Spritz", "Water Kefir", "Coconut Water Kefir", "Tepache", "Kvass", "Beet Kvass", "Fermented Lemonade", "Ginger Bug Soda", "Probiotic Soda", "Drinking Vinegar", "Shrub"].map((label) => ({ label, tags: ecosystemTags("kombucha", label) })) },
  { category: "milk", nodes: ["Whole Milk", "Skim Milk", "Low-Fat Milk", "Chocolate Milk", "Strawberry Milk", "Buttermilk", "Kefir", "Lassi", "Salted Lassi", "Mango Lassi", "Yogurt Drink", "Ayran", "Oat Milk", "Almond Milk", "Soy Milk", "Coconut Milk", "Rice Milk", "Cashew Milk", "Pea Milk", "Hemp Milk", "Macadamia Milk", "Horchata", "Eggnog", "Milkshake", "Malted Milk", "Protein Milk", "Evaporated Milk Drink", "Condensed Milk Coffee"].map((label) => ({ label, tags: ecosystemTags("milk", label) })) },
  { category: "juice", nodes: ["Orange Juice", "Apple Juice", "Grape Juice", "Cranberry Juice", "Pineapple Juice", "Grapefruit Juice", "Pomegranate Juice", "Cherry Juice", "Pear Juice", "Peach Nectar", "Mango Juice", "Guava Juice", "Passion Fruit Juice", "Watermelon Juice", "Tomato Juice", "Carrot Juice", "Beet Juice", "Celery Juice", "Lemonade", "Limeade", "Agua Fresca", "Coconut Juice", "Aloe Juice", "Smoothie", "Green Smoothie", "Fruit Punch", "Cider", "Sparkling Cider"].map((label) => ({ label, tags: ecosystemTags("juice", label) })) },
  { category: "water", nodes: ["Still Water", "Spring Water", "Mineral Water", "Sparkling Water", "Club Soda", "Soda Water", "Seltzer", "Flavored Seltzer", "Tonic Water", "Bitter Lemon", "Coconut Water", "Maple Water", "Birch Water", "Cactus Water", "Aloe Water", "Electrolyte Water", "Alkaline Water", "Distilled Water", "Purified Water", "Glacier Water", "Rainwater", "Hydrogen Water", "Collagen Water", "Infused Water", "Cucumber Water", "Lemon Water"].map((label) => ({ label, tags: ecosystemTags("water", label) })) },
  { category: "energy", nodes: ["Energy Drink", "Sugar-Free Energy", "Energy Shot", "Guarana Soda", "Cola", "Diet Cola", "Pre-Workout Drink", "Caffeinated Water", "Caffeinated Seltzer", "Yerba Mate Energy", "Green Tea Energy", "Coffee Energy Drink", "Electrolyte Energy", "Taurine Drink", "B Vitamin Drink", "Nitro Energy", "Gaming Energy Drink", "Natural Energy Drink", "Kombucha Energy", "Protein Energy Shake"].map((label) => ({ label, tags: ecosystemTags("energy", label) })) },
  { category: "health", nodes: ["Green Juice", "Protein Shake", "Meal Replacement", "Turmeric Shot", "Ginger Shot", "Wheatgrass Shot", "Aloe Drink", "Drinking Vinegar", "Apple Cider Vinegar Tonic", "Wellness Soda", "Collagen Drink", "Electrolyte Drink", "Hydration Multiplier", "Adaptogen Drink", "Nootropic Drink", "Fiber Drink", "Prebiotic Soda", "Probiotic Drink", "Kefir Smoothie", "Bone Broth", "Vegetable Broth", "Mushroom Elixir", "Cacao Elixir", "Golden Milk", "Beet Tonic", "Cherry Recovery Drink", "Charcoal Lemonade", "Chlorophyll Water"].map((label) => ({ label, tags: ecosystemTags("health", label) })) },
  { category: "na", nodes: ["NA Beer", "NA IPA", "NA Stout", "NA Sparkling Wine", "Dealcoholized Wine", "Verjus", "Mocktail", "Zero-Proof Negroni", "Zero-Proof Spritz", "Shrub Soda", "Craft Soda", "Root Beer", "Ginger Beer", "Ginger Ale", "Cream Soda", "Orange Soda", "Grape Soda", "Lemon-Lime Soda", "Bitters and Soda", "Hop Water", "Malt Beverage", "Non-Alcoholic Cider", "Kava Drink", "Cacao Drink", "Botanical Soda", "Tonic Highball", "Soda Fountain Float", "Italian Soda"].map((label) => ({ label, tags: ecosystemTags("na", label) })) }
];

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
  if (kind === "sake") return "Sake Search";
  if (kind === "coffee") return "Coffee Search";
  if (kind === "wine") return "Wine Search";
  return "Cocktail Search";
}

function getSelectedKindLabel(kind: BevKind) {
  if (kind === "beer") return "Selected Beer";
  if (kind === "sake") return "Selected Sake";
  if (kind === "coffee") return "Selected Coffee";
  if (kind === "wine") return "Selected Wine";
  return "Selected Cocktail";
}

function getSelectedNodeLabel(kind: BevKind) {
  if (kind === "beer") return "selected beer";
  if (kind === "sake") return "selected sake";
  if (kind === "coffee") return "selected coffee";
  if (kind === "wine") return "selected wine";
  return "searched cocktail";
}

function getPhotoKindLabel(kind: BevKind) {
  if (kind === "beer") return "Selected Beer Photo";
  if (kind === "sake") return "Selected Sake Photo";
  if (kind === "coffee") return "Selected Coffee Block";
  if (kind === "wine") return "Selected Wine Photo";
  return "Selected Cocktail Photo";
}

function getSearchPlaceholder(kind: BevKind, wineColor: WineColor) {
  if (kind === "beer") return "Try Pilsner, Helles, IPA, Saison...";
  if (kind === "sake") return "Try Junmai, Ginjo, Namazake, Nigori, Koshu...";
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
  if (kind === "sake") return "sake";
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

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildEcosystemNodes(): EcosystemNode[] {
  const centerX = 1550;
  const centerY = 1120;
  const ringRadiusX = 1040;
  const ringRadiusY = 735;
  const laneWidth = 230;
  const laneHeight = 86;
  const totalNodes = beverageEcosystemGroups.reduce((sum, group) => sum + group.nodes.length, 0);
  let globalIndex = 0;

  return beverageEcosystemGroups.flatMap((group, groupIndex) => {
    const groupAngle = ((groupIndex / beverageEcosystemGroups.length) * Math.PI * 2) - Math.PI / 2;
    const clusterX = centerX + Math.cos(groupAngle) * ringRadiusX;
    const clusterY = centerY + Math.sin(groupAngle) * ringRadiusY;
    const laneColumn = groupIndex % 4;
    const laneRow = Math.floor(groupIndex / 4);

    return group.nodes.map((node, nodeIndex) => {
      const nodeAngle = (nodeIndex * goldenAngle * Math.PI) / 180;
      const nodeRadius = 34 + Math.sqrt(nodeIndex) * 34;
      const sphereIndex = globalIndex;
      globalIndex += 1;
      const z = 1 - (2 * (sphereIndex + 0.5)) / totalNodes;
      const globeRadius = Math.sqrt(Math.max(0, 1 - z * z));
      const globeAngle = (sphereIndex * goldenAngle * Math.PI) / 180;
      return {
        id: `${group.category}-${slugify(node.label)}`,
        label: node.label,
        category: group.category,
        tags: node.tags,
        x: clusterX + Math.cos(nodeAngle) * nodeRadius,
        y: clusterY + Math.sin(nodeAngle) * nodeRadius,
        laneX: 155 + laneColumn * 650 + (nodeIndex % 5) * laneWidth,
        laneY: 115 + laneRow * 360 + Math.floor(nodeIndex / 5) * laneHeight,
        lon: (Math.atan2(Math.sin(globeAngle) * globeRadius, Math.cos(globeAngle) * globeRadius) * 180) / Math.PI,
        lat: (Math.asin(z) * 180) / Math.PI
      };
    });
  });
}

function buildEcosystemEdges(nodes: EcosystemNode[]) {
  const edges: Array<[string, string, string]> = [];
  const byCategory = new Map<BeverageCategory, EcosystemNode[]>();
  nodes.forEach((node) => {
    byCategory.set(node.category, [...(byCategory.get(node.category) ?? []), node]);
  });

  byCategory.forEach((items) => {
    items.forEach((node, index) => {
      if (index + 1 < items.length) edges.push([node.id, items[index + 1].id, "local"]);
      if (index > 1 && index % 3 === 0) edges.push([node.id, items[index - 2].id, "branch"]);
    });
  });

  const findByLabel = (label: string) => nodes.find((node) => node.label === label)?.id;
  const connectLabels = (left: string, right: string, type = "bridge") => {
    const leftId = findByLabel(left);
    const rightId = findByLabel(right);
    if (leftId && rightId) edges.push([leftId, rightId, type]);
  };

  [
    ["Sparkling Wine", "Soda Water"], ["Sparkling Wine", "Sparkling Water"], ["Sour Ale", "Classic Kombucha"],
    ["Gose", "Water Kefir"], ["Hard Kombucha", "Sour Ale"], ["Grape Juice", "Dealcoholized Wine"],
    ["NA Beer", "Pilsner"], ["Mocktail", "Gin"], ["Ginger Beer", "Moscow Mule"], ["Tonic Water", "Gin"],
    ["Cola", "Rum"], ["Irish Coffee", "Whiskey"], ["Mocha", "Chocolate Milk"], ["Latte", "Whole Milk"],
    ["Chai", "Whole Milk"], ["Matcha", "Oat Milk"], ["Cold Brew", "Energy Drink"], ["Yerba Mate", "Energy Drink"],
    ["Coconut Water", "Electrolyte Water"], ["Green Juice", "Smoothie"], ["Drinking Vinegar", "Shrub Soda"],
    ["Ginger Shot", "Ginger Kombucha"], ["Aloe Drink", "Herbal Infusion"], ["Root Beer", "Craft Soda"],
    ["Mineral Water", "Soda Water"], ["Tequila", "Grapefruit Juice"], ["Brandy", "Cognac"], ["Amaro", "Bitters and Soda"]
  ].forEach(([left, right]) => connectLabels(left, right));

  return edges;
}

const ecosystemNodes = buildEcosystemNodes();
const ecosystemEdges = buildEcosystemEdges(ecosystemNodes);

function BeverageEcosystemGlobe() {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ lon: 18, lat: -8 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number; lon: number; lat: number } | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const nodeById = useMemo(() => new Map(ecosystemNodes.map((node) => [node.id, node])), []);
  const activeNode = activeNodeId ? nodeById.get(activeNodeId) ?? null : null;
  const center = 360;
  const radius = 250 * zoom;
  const clampZoom = (value: number) => Math.max(0.72, Math.min(1.55, value));
  const clampLat = (value: number) => Math.max(-72, Math.min(72, value));
  const project = (node: EcosystemNode) => {
    const lat = (node.lat * Math.PI) / 180;
    const lon = ((node.lon + rotation.lon) * Math.PI) / 180;
    const rotLat = (rotation.lat * Math.PI) / 180;
    const x = Math.cos(lat) * Math.sin(lon);
    const y = Math.sin(lat);
    const z = Math.cos(lat) * Math.cos(lon);
    const y2 = y * Math.cos(rotLat) - z * Math.sin(rotLat);
    const z2 = y * Math.sin(rotLat) + z * Math.cos(rotLat);
    return {
      x: center + x * radius,
      y: center - y2 * radius,
      z: z2,
      visible: z2 > -0.08,
      scale: 0.62 + Math.max(0, z2) * 0.58
    };
  };

  return (
    <article className="bev-ecosystem-panel bev-ecosystem-globe-panel">
      <div className="bev-ecosystem-panel-head">
        <div>
          <span>Rotatable Beverage Globe</span>
          <h3>Spin the full beverage ecosystem in 360 degrees</h3>
        </div>
        <div className="bev-ecosystem-controls">
          <button type="button" onClick={() => setZoom((value) => clampZoom(value + 0.08))}>+</button>
          <button type="button" onClick={() => setZoom((value) => clampZoom(value - 0.08))}>-</button>
          <button type="button" onClick={() => { setRotation({ lon: 18, lat: -8 }); setZoom(1); }}>Reset</button>
        </div>
      </div>
      <div
        className="bev-globe-viewport"
        onWheel={(event) => {
          event.preventDefault();
          setZoom((value) => clampZoom(value + (event.deltaY < 0 ? 0.06 : -0.06)));
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragStart({ x: event.clientX, y: event.clientY, lon: rotation.lon, lat: rotation.lat });
        }}
        onPointerMove={(event) => {
          if (!dragStart) return;
          setRotation({
            lon: dragStart.lon + (event.clientX - dragStart.x) * 0.42,
            lat: clampLat(dragStart.lat - (event.clientY - dragStart.y) * 0.28)
          });
        }}
        onPointerUp={() => setDragStart(null)}
        onPointerCancel={() => setDragStart(null)}
      >
        <svg className="bev-globe-svg" viewBox="0 0 720 720" role="img" aria-label="Rotatable beverage ecosystem globe">
          <defs>
            <radialGradient id="bev-globe-fill" cx="34%" cy="28%" r="74%">
              <stop offset="0%" stopColor="#123a54" />
              <stop offset="58%" stopColor="#061526" />
              <stop offset="100%" stopColor="#010409" />
            </radialGradient>
            <filter id="bev-globe-glow" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="3.8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <circle className="bev-globe-shell" cx={center} cy={center} r={radius} />
          {[-60, -30, 0, 30, 60].map((lat) => {
            const projectedY = center - Math.sin(((lat + rotation.lat) * Math.PI) / 180) * radius;
            const projectedR = Math.cos((lat * Math.PI) / 180) * radius;
            return <ellipse key={`lat-${lat}`} className="bev-globe-gridline" cx={center} cy={projectedY} rx={Math.abs(projectedR)} ry={Math.abs(projectedR) * 0.22} />;
          })}
          {Array.from({ length: 12 }, (_, index) => index * 30).map((lon) => (
            <ellipse key={`lon-${lon}`} className="bev-globe-gridline meridian" cx={center} cy={center} rx={radius * Math.abs(Math.cos(((lon + rotation.lon) * Math.PI) / 180))} ry={radius} />
          ))}
          {ecosystemEdges.map(([leftId, rightId, type]) => {
            const left = nodeById.get(leftId);
            const right = nodeById.get(rightId);
            if (!left || !right) return null;
            const leftPoint = project(left);
            const rightPoint = project(right);
            if (!leftPoint.visible || !rightPoint.visible) return null;
            return <line key={`globe-${leftId}-${rightId}`} className={`bev-globe-edge ${type}`} x1={leftPoint.x} y1={leftPoint.y} x2={rightPoint.x} y2={rightPoint.y} opacity={0.3 + Math.min(leftPoint.z, rightPoint.z) * 0.45} />;
          })}
          {ecosystemNodes.map((node) => {
            const point = project(node);
            if (!point.visible) return null;
            const meta = beverageCategoryMeta[node.category];
            const size = 8.5 * point.scale;
            return (
              <g key={`globe-${node.id}`} className={`bev-globe-node ${activeNodeId === node.id ? "active" : ""}`} transform={`translate(${point.x} ${point.y})`} onMouseEnter={() => setActiveNodeId(node.id)} onFocus={() => setActiveNodeId(node.id)} tabIndex={0} opacity={0.42 + point.z * 0.58}>
                <circle r={size} fill={meta.color} filter="url(#bev-globe-glow)" />
                <text y={size * 0.34}>{meta.short}</text>
                <title>{`${node.label} - ${meta.label}`}</title>
              </g>
            );
          })}
          <circle className="bev-globe-rim" cx={center} cy={center} r={radius} />
        </svg>
        {activeNode ? (
          <aside className="bev-ecosystem-tooltip">
            <strong>{activeNode.label}</strong>
            <span>{beverageCategoryMeta[activeNode.category].label}</span>
            <small>{activeNode.tags.join(" / ")}</small>
          </aside>
        ) : null}
      </div>
    </article>
  );
}

function BeverageEcosystemMap({ variant }: { variant: "sphere" | "flat" }) {
  const [zoom, setZoom] = useState(0.62);
  const [pan, setPan] = useState({ x: -660, y: -360 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const nodeById = useMemo(() => new Map(ecosystemNodes.map((node) => [node.id, node])), []);
  const activeNode = activeNodeId ? nodeById.get(activeNodeId) ?? null : null;
  const getX = (node: EcosystemNode) => node.x;
  const getY = (node: EcosystemNode) => node.y;
  const viewWidth = 3100;
  const viewHeight = 2240;

  const clampZoom = (value: number) => Math.max(0.42, Math.min(2.4, value));
  const reset = () => {
    setZoom(0.62);
    setPan({ x: -660, y: -360 });
  };

  return (
    <article className="bev-ecosystem-panel">
      <div className="bev-ecosystem-panel-head">
        <div>
          <span>Flat Sphere Grid Ecosystem</span>
          <h3>Branching beverage relationships as a full map</h3>
        </div>
        <div className="bev-ecosystem-controls">
          <button type="button" onClick={() => setZoom((value) => clampZoom(value + 0.14))}>+</button>
          <button type="button" onClick={() => setZoom((value) => clampZoom(value - 0.14))}>-</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
      </div>
      <div
        className="bev-ecosystem-viewport"
        onWheel={(event) => {
          event.preventDefault();
          setZoom((value) => clampZoom(value + (event.deltaY < 0 ? 0.08 : -0.08)));
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragStart({ x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y });
        }}
        onPointerMove={(event) => {
          if (!dragStart) return;
          setPan({ x: dragStart.panX + event.clientX - dragStart.x, y: dragStart.panY + event.clientY - dragStart.y });
        }}
        onPointerUp={() => setDragStart(null)}
        onPointerCancel={() => setDragStart(null)}
      >
        <svg className="bev-ecosystem-svg" viewBox={`0 0 ${viewWidth} ${viewHeight}`} style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <defs>
            <filter id={`bev-node-glow-${variant}`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {ecosystemEdges.map(([leftId, rightId, type]) => {
            const left = nodeById.get(leftId);
            const right = nodeById.get(rightId);
            if (!left || !right) return null;
            return <line key={`${variant}-${leftId}-${rightId}`} className={`bev-eco-edge ${type}`} x1={getX(left)} y1={getY(left)} x2={getX(right)} y2={getY(right)} />;
          })}
          {beverageEcosystemGroups.map((group) => {
            const items = ecosystemNodes.filter((node) => node.category === group.category);
            const avgX = items.reduce((sum, node) => sum + node.x, 0) / items.length;
            const avgY = items.reduce((sum, node) => sum + node.y, 0) / items.length;
            return <circle key={`${variant}-${group.category}-orbit`} className="bev-eco-orbit" cx={avgX} cy={avgY} r="138" />;
          })}
          {ecosystemNodes.map((node) => {
            const meta = beverageCategoryMeta[node.category];
            const isActive = activeNodeId === node.id;
            return (
              <g key={`${variant}-${node.id}`} className={`bev-eco-node ${isActive ? "active" : ""}`} transform={`translate(${getX(node)} ${getY(node)})`} onMouseEnter={() => setActiveNodeId(node.id)} onFocus={() => setActiveNodeId(node.id)} tabIndex={0}>
                <circle r={isActive ? 18 : 14} fill={meta.color} filter={`url(#bev-node-glow-${variant})`} />
                <text y="4">{meta.short}</text>
                <title>{`${node.label} - ${meta.label}`}</title>
              </g>
            );
          })}
          {ecosystemNodes.filter((_, index) => index % 5 === 0).map((node) => (
            <text key={`${variant}-${node.id}-label`} className="bev-eco-label" x={getX(node) + 20} y={getY(node) - 14}>{node.label}</text>
          ))}
        </svg>
        {activeNode ? (
          <aside className="bev-ecosystem-tooltip">
            <strong>{activeNode.label}</strong>
            <span>{beverageCategoryMeta[activeNode.category].label}</span>
            <small>{activeNode.tags.join(" / ")}</small>
          </aside>
        ) : null}
      </div>
    </article>
  );
}

function BeverageEcosystem() {
  return (
    <section className="bev-ecosystem-shell">
      <div className="bev-ecosystem-intro">
        <p className="cocktail-kicker">Beverage Sphere Grid</p>
        <h3>Explore the full beverage ecosystem by ingredient, process, function, and service style.</h3>
        <p>Zoom, drag, and trace the bridges between fermented, distilled, caffeinated, sparkling, dairy, fruit, hydration, functional, and non-alcoholic drinks.</p>
      </div>
      <div className="bev-ecosystem-legend">
        {Object.entries(beverageCategoryMeta).map(([key, meta]) => (
          <span key={key} style={{ "--bev-color": meta.color } as CSSProperties}><i />{meta.label}</span>
        ))}
      </div>
      <BeverageEcosystemGlobe />
      <BeverageEcosystemMap variant="flat" />
    </section>
  );
}

function BevDetails({ kind, item }: { kind: BevKind; item: BevItem }) {
  const styleLabel =
    kind === "beer"
      ? "Beer Family"
      : kind === "sake"
        ? "Sake Type"
        : kind === "coffee"
          ? "Coffee Family"
          : kind === "wine"
            ? "Wine Style"
            : "Cocktail Family";
  const ingredientsLabel =
    kind === "beer"
      ? "Ingredients (Hops, Barley, Yeast, Water)"
      : kind === "sake"
        ? "Ingredients (Rice, Koji, Water, Yeast)"
        : kind === "coffee"
          ? "Ingredients w/ Ratios"
          : kind === "wine"
            ? "Ingredients (Grape Variety, Yeast)"
            : "Ingredients";
  const originLabel = kind === "wine" ? "Continent/Region and Origin" : kind === "sake" ? "Origin / Classification" : "Invented";

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
        {kind === "cocktail" && item.garnish ? (
          <div>
            <dt>Classic Garnish</dt>
            <dd>{item.garnish}</dd>
          </div>
        ) : null}
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

  const imagePath = `/${kind === "beer" ? "beers" : kind === "sake" ? "sake" : "wines"}/${item.id}-color.png`;
  const subjectLabel = kind === "beer" ? "Beer Color Study" : kind === "sake" ? "Sake Profile Study" : "Wine Color Study";

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
        <small>{kind === "beer" ? "Tilted glass reference for color, foam, and clarity." : kind === "sake" ? "Serving reference for clarity, aroma, polish, and texture." : "Tilted glass reference for hue, rim, core, and concentration."}</small>
      </figcaption>
    </figure>
  );
}

type TechniqueChoiceGroup = "method" | "ice" | "dilution" | "finish";

type TechniqueChoice = {
  id: string;
  label: string;
  detail: string;
};

type TechniqueAttempt = {
  id: string;
  cocktailId: string;
  cocktailName: string;
  score: number;
  maxScore: number;
  selected: Record<TechniqueChoiceGroup, string>;
  createdAt: string;
};

const techniqueChoices: Record<TechniqueChoiceGroup, TechniqueChoice[]> = {
  method: [
    { id: "shake", label: "Shake", detail: "Aerate citrus, dairy, egg, juice, or opaque builds." },
    { id: "stir", label: "Stir", detail: "Chill clear spirit-forward builds without clouding texture." },
    { id: "build", label: "Build", detail: "Assemble directly in the service glass." },
    { id: "shake-top", label: "Shake + Top", detail: "Shake the sour base, then finish with bubbles." },
    { id: "stir-rinse", label: "Stir + Rinse", detail: "Season the glass, then stir the spirit-forward core." }
  ],
  ice: [
    { id: "up-chilled", label: "Up / Chilled", detail: "Serve strained into a chilled stemmed glass." },
    { id: "large-ice", label: "Large Ice", detail: "Use a large cube or rocks for slow dilution." },
    { id: "cubed-ice", label: "Cubed Ice", detail: "Fill the highball or rocks glass with cold cubes." },
    { id: "crushed-ice", label: "Crushed Ice", detail: "Use pebble or crushed ice for tiki and julep-style texture." }
  ],
  dilution: [
    { id: "low", label: "Low Dilution", detail: "Cold and polished, but still spirit-forward." },
    { id: "medium", label: "Medium Dilution", detail: "Enough water and chill to integrate citrus and sweetener." },
    { id: "low-top", label: "Low + Top", detail: "Short shake/build, then preserve carbonation." },
    { id: "high", label: "High Dilution", detail: "More melt and texture for crushed-ice or tropical builds." }
  ],
  finish: [
    { id: "expressed-citrus", label: "Express Citrus", detail: "Use citrus oil as the final aromatic cue." },
    { id: "aromatic-garnish", label: "Aromatic Garnish", detail: "Wake mint, herbs, spice, or fruit at the rim." },
    { id: "rim-control", label: "Rim Control", detail: "Salt, sugar, or spice only where the drink needs it." },
    { id: "clean", label: "Clean Finish", detail: "No garnish, or a restrained finish that protects balance." }
  ]
};

function readTechniqueAttempts(): TechniqueAttempt[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(COCKTAIL_TECHNIQUE_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) as TechniqueAttempt[] : [];
  } catch {
    return [];
  }
}

function writeTechniqueAttempts(attempts: TechniqueAttempt[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(COCKTAIL_TECHNIQUE_ATTEMPTS_KEY, JSON.stringify(attempts.slice(0, 12)));
  } catch {
    // Storage pressure should not block the live drill.
  }
}

function expectedTechniqueFor(item: BevItem): Record<TechniqueChoiceGroup, string> {
  const method = item.method.toLowerCase();
  const glass = item.glassware.toLowerCase();
  const profile = item.profile.map(normalize);
  const garnish = item.garnish?.toLowerCase() ?? "";

  const expectedMethod = method.includes("rinsed")
    ? "stir-rinse"
    : method.includes("topped")
      ? "shake-top"
      : method.includes("shaken")
        ? "shake"
        : method.includes("stirred")
          ? "stir"
          : "build";
  const expectedIce = profile.includes("tiki")
    ? "crushed-ice"
    : glass.includes("highball") || glass.includes("collins") || glass.includes("mug")
      ? "cubed-ice"
      : glass.includes("rocks")
        ? "large-ice"
        : "up-chilled";
  const expectedDilution = profile.includes("sparkling")
    ? "low-top"
    : profile.includes("tiki")
      ? "high"
      : method.includes("shaken") || profile.includes("sour")
        ? "medium"
        : "low";
  const expectedFinish = garnish.includes("mint") || garnish.includes("cherry") || garnish.includes("ginger")
    ? "aromatic-garnish"
    : garnish.includes("salt") || garnish.includes("sugar")
      ? "rim-control"
      : garnish.includes("twist") || garnish.includes("orange") || garnish.includes("lemon") || garnish.includes("lime") || garnish.includes("grapefruit")
        ? "expressed-citrus"
        : "clean";

  return {
    method: expectedMethod,
    ice: expectedIce,
    dilution: expectedDilution,
    finish: expectedFinish
  };
}

function choiceLabel(group: TechniqueChoiceGroup, id: string) {
  return techniqueChoices[group].find((choice) => choice.id === id)?.label ?? "Not selected";
}

function buildTechniqueReviewText(item: BevItem, selected: Record<TechniqueChoiceGroup, string>, expected: Record<TechniqueChoiceGroup, string>, score: number) {
  return [
    `Sip Studies Cocktail Technique Review: ${item.name}`,
    "",
    `Score: ${score}/4`,
    `Family: ${item.family}`,
    `Spec: ${item.detailLines.join("; ")}`,
    `Glassware: ${item.glassware}`,
    `Garnish: ${item.garnish ?? "No classic garnish"}`,
    "",
    "Technique Decisions",
    ...(["method", "ice", "dilution", "finish"] as TechniqueChoiceGroup[]).map(
      (group) => `- ${group}: selected ${choiceLabel(group, selected[group])}; benchmark ${choiceLabel(group, expected[group])}`
    ),
    "",
    "Mentor review prompts",
    "- Does the learner explain why this method fits the ingredients?",
    "- Does the learner protect texture, temperature, and carbonation?",
    "- Can the learner translate the technical choice into guest language?"
  ].join("\n");
}

function downloadMarkdown(filename: string, body: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function CocktailTechniqueLab({ item }: { item: BevItem }) {
  const expected = useMemo(() => expectedTechniqueFor(item), [item]);
  const [selected, setSelected] = useState<Record<TechniqueChoiceGroup, string>>({
    method: "",
    ice: "",
    dilution: "",
    finish: ""
  });
  const [attempts, setAttempts] = useState<TechniqueAttempt[]>(() => readTechniqueAttempts());
  const [notice, setNotice] = useState("");
  const groups: TechniqueChoiceGroup[] = ["method", "ice", "dilution", "finish"];
  const answeredCount = groups.filter((group) => selected[group]).length;
  const score = groups.reduce((total, group) => total + (selected[group] === expected[group] ? 1 : 0), 0);
  const latestForCocktail = attempts.find((attempt) => attempt.cocktailId === item.id);

  useEffect(() => {
    setSelected({ method: "", ice: "", dilution: "", finish: "" });
    setNotice("");
  }, [item.id]);

  const setChoice = (group: TechniqueChoiceGroup, choiceId: string) => {
    setSelected((current) => ({ ...current, [group]: choiceId }));
    setNotice("");
  };

  const saveAttempt = () => {
    if (answeredCount < groups.length) {
      setNotice("Choose one option in each technique group before saving.");
      return;
    }

    const attempt: TechniqueAttempt = {
      id: `${item.id}-${Date.now()}`,
      cocktailId: item.id,
      cocktailName: item.name,
      score,
      maxScore: groups.length,
      selected,
      createdAt: new Date().toISOString()
    };
    const next = [attempt, ...attempts.filter((entry) => entry.cocktailId !== item.id)].slice(0, 12);
    setAttempts(next);
    writeTechniqueAttempts(next);
    setNotice(`Technique attempt saved: ${score}/${groups.length}.`);
  };

  const exportReview = () => {
    downloadMarkdown(`sip-studies-${item.id}-technique-review.md`, buildTechniqueReviewText(item, selected, expected, score));
    setNotice("Mentor review packet downloaded.");
  };

  return (
    <article className="cocktail-technique-lab">
      <div className="cocktail-technique-head">
        <div>
          <p className="cocktail-kicker">Technique Lab</p>
          <h3>Score the build before you make it</h3>
          <p>Choose method, ice, dilution, and finish for {item.name}. Save the attempt or export it for mentor review.</p>
        </div>
        <div className="cocktail-technique-score">
          <strong>{score}/{groups.length}</strong>
          <span>{answeredCount}/{groups.length} chosen</span>
        </div>
      </div>

      <div className="cocktail-technique-grid">
        {groups.map((group) => (
          <section key={`${item.id}-${group}`}>
            <h4>{group === "ice" ? "Ice and service" : group}</h4>
            <div>
              {techniqueChoices[group].map((choice) => (
                <button
                  key={`${group}-${choice.id}`}
                  type="button"
                  className={`${selected[group] === choice.id ? "active" : ""} ${selected[group] && expected[group] === choice.id ? "benchmark" : ""}`.trim()}
                  onClick={() => setChoice(group, choice.id)}
                >
                  <span>{choice.label}</span>
                  <small>{choice.detail}</small>
                </button>
              ))}
            </div>
            <p>Benchmark: {choiceLabel(group, expected[group])}</p>
          </section>
        ))}
      </div>

      <div className="cocktail-technique-feedback">
        <section>
          <strong>Build cue</strong>
          <p>{item.method} / {item.glassware} / {item.garnish ?? "No classic garnish"}</p>
        </section>
        <section>
          <strong>Service language</strong>
          <p>{score === groups.length ? "Ready to explain the technique choice to a guest or evaluator." : "Use the benchmark notes to connect texture, temperature, aroma, and balance before serving."}</p>
        </section>
        <section>
          <strong>Saved attempt</strong>
          <p>{latestForCocktail ? `${latestForCocktail.score}/${latestForCocktail.maxScore} on ${new Date(latestForCocktail.createdAt).toLocaleDateString()}` : "No saved attempt for this cocktail yet."}</p>
        </section>
      </div>

      <div className="cocktail-technique-actions">
        <button type="button" className="btn btn-primary" onClick={saveAttempt}>
          Save Technique Attempt
        </button>
        <button type="button" className="btn btn-light" onClick={exportReview}>
          Download Mentor Review
        </button>
        {notice ? <span role="status">{notice}</span> : null}
      </div>
    </article>
  );
}

export function Cocktails() {
  const [recipeView, setRecipeView] = useState<RecipeView>("ecosystem");
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
    sake: byKind.sake[0].id,
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
      setRecipeView(kind);
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
      setRecipeView(bevKindOrder[nextIndex]);
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

  const selectRecipeKind = (nextKind: BevKind) => {
    setRecipeView(nextKind);
    setKind(nextKind);
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
          <button type="button" className={recipeView === "ecosystem" ? "active" : ""} onClick={() => setRecipeView("ecosystem")}>
            <span>Ecosystem</span>
            <small>Sphere grid atlas</small>
          </button>
          <button type="button" className={recipeView === "wine" ? "active" : ""} onClick={() => selectRecipeKind("wine")}>
            <span>Wine</span>
            <small>Style and terroir map</small>
          </button>
          <button type="button" className={recipeView === "beer" ? "active" : ""} onClick={() => selectRecipeKind("beer")}>
            <span>Beer</span>
            <small>Family and style map</small>
          </button>
          <button type="button" className={recipeView === "cocktail" ? "active" : ""} onClick={() => selectRecipeKind("cocktail")}>
            <span>Cocktails</span>
            <small>Classic relation map</small>
          </button>
          <button type="button" className={recipeView === "sake" ? "active" : ""} onClick={() => selectRecipeKind("sake")}>
            <span>Sake</span>
            <small>Rice polish and style map</small>
          </button>
          <button type="button" className={recipeView === "coffee" ? "active" : ""} onClick={() => selectRecipeKind("coffee")}>
            <span>Coffee</span>
            <small>Drink build chart</small>
          </button>
        </div>
        {recipeView === "wine" ? (
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

      {recipeView === "ecosystem" ? <BeverageEcosystem /> : (
      <>
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

      {kind === "cocktail" ? <CocktailTechniqueLab item={activeItem} /> : null}

      <div className={kind === "beer" || kind === "sake" || kind === "coffee" || kind === "wine" ? "cocktail-nearest-layout has-color-study" : "cocktail-nearest-layout"}>
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
      </>
      )}
    </section>
  );
}
