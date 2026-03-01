export type MagazineNewsReference = {
  id: string;
  name: string;
  url: string;
};

// Add new magazine sources here first. If a source is not wired in BeverageNews.tsx,
// it will still appear in the Magazine filter as "(reference)".
export const MAGAZINE_NEWS_REFERENCES: MagazineNewsReference[] = [
  { id: "beer-connoisseur", name: "The Beer Connoisseur", url: "https://beerconnoisseur.com/department/magazine/" },
  { id: "robert-parker", name: "Robert Parker", url: "https://www.robertparker.com/more-free-stuff" },
  { id: "whisky-advocate", name: "Whisky Advocate", url: "https://whiskyadvocate.com/Tag/trending" },
  { id: "wine-spectator", name: "Wine Spectator", url: "https://www.winespectator.com/news" },
  { id: "connoisseur-magazine", name: "Connoisseur Magazine", url: "https://www.connoisseurmagazine.co.uk/" },
  { id: "wine-enthusiast", name: "Wine Enthusiast", url: "https://www.wineenthusiast.com/culture/" },
  { id: "decanter", name: "Decanter", url: "https://www.decanter.com/wine-news/" }
];
