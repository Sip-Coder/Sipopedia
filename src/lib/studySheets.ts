export type StudySheetCategory = "maps" | "styles" | "service" | "classic-specs";

export type StudySheetRoute = {
  label: string;
  route: string;
};

export type StudySheetBlock = {
  heading: string;
  bullets: string[];
};

export type StudySheet = {
  id: string;
  category: StudySheetCategory;
  title: string;
  subtitle: string;
  examUse: string;
  routeHandoffs: StudySheetRoute[];
  blocks: StudySheetBlock[];
  drills: string[];
  sourceSignals: string[];
};

export const studySheetCategoryLabels: Record<StudySheetCategory, string> = {
  maps: "Maps",
  styles: "Styles",
  service: "Service",
  "classic-specs": "Classic Specs"
};

export const studySheets: StudySheet[] = [
  {
    id: "france-map-recall",
    category: "maps",
    title: "France Map Recall",
    subtitle: "Turn regions, grapes, climate, and appellation logic into a one-page drill.",
    examUse: "Use before WSET, CMS, regional-scholar, or blind-tasting theory rounds.",
    routeHandoffs: [
      { label: "Open Maps", route: "app/maps" },
      { label: "Open Regions", route: "app/regions" },
      { label: "Run Quiz", route: "app/beverage-quiz" }
    ],
    sourceSignals: ["Region hierarchy", "Climate cue", "Grape anchor", "Label-law recall"],
    blocks: [
      {
        heading: "North-to-south anchors",
        bullets: ["Champagne: cool climate, chalk, traditional-method sparkling.", "Loire: river spine, varied grapes, high-acid styles.", "Burgundy: Pinot Noir and Chardonnay, village-to-grand-cru ladder.", "Rhone: Syrah in the north; Grenache-led blends in the south."]
      },
      {
        heading: "Exam contrast prompts",
        bullets: ["Compare Chablis, Cote de Beaune, and Maconnais for Chardonnay style.", "Separate Left Bank Cabernet structure from Right Bank Merlot texture.", "Name why Alsace aromatic whites differ from Loire Sauvignon Blanc.", "Explain how Mediterranean warmth changes Southern Rhone blends."]
      },
      {
        heading: "Blank-map reps",
        bullets: ["Draw France outline, then place five benchmark regions.", "Add one river or climate cue to each region.", "Write two grapes and one style next to each region.", "Circle one weak region and route it into Sip Maps or Regions."]
      }
    ],
    drills: ["3-minute blank map", "5-region grape match", "One climate cue per region", "One label term per region"]
  },
  {
    id: "global-region-ladder",
    category: "maps",
    title: "Global Region Ladder",
    subtitle: "A quick scaffold for connecting country, climate, grape, and commercial style.",
    examUse: "Use when a missed quiz topic is geographic rather than varietal.",
    routeHandoffs: [
      { label: "Open Regions", route: "app/regions" },
      { label: "Open Grapes", route: "app/grapes" },
      { label: "Open Sipopedia", route: "app/sipopedia" }
    ],
    sourceSignals: ["Country", "Region", "Climate", "Signature beverage", "Likely exam contrast"],
    blocks: [
      {
        heading: "Ladder format",
        bullets: ["Country first: France, Italy, Spain, Germany, United States, Argentina, Chile, Australia, New Zealand, South Africa.", "Region second: name the benchmark zone before naming grapes.", "Style third: connect climate to body, acidity, tannin, sweetness, or aroma.", "Trade cue fourth: name why the region appears on lists or exams."]
      },
      {
        heading: "Contrast pairs",
        bullets: ["Bordeaux vs Napa Cabernet: structure, ripeness, oak, climate.", "Rioja vs Ribera del Duero: Tempranillo frame, elevation, aging language.", "Mosel vs Clare Valley Riesling: sweetness, acidity, lime, petrol, body.", "Mendoza vs Cahors Malbec: altitude fruit vs rustic structure."]
      },
      {
        heading: "Recall grid",
        bullets: ["Write one cool-climate white region.", "Write one warm-climate red region.", "Write one fortified or sweet benchmark.", "Write one beer, spirits, or sake region if your exam lane includes it."]
      }
    ],
    drills: ["Country-region-grape chain", "Climate-to-structure note", "Warm vs cool contrast", "Trade cue one-liner"]
  },
  {
    id: "wine-style-grid",
    category: "styles",
    title: "Wine Style Grid",
    subtitle: "A compact grid for body, acid, tannin, aroma, oak, sweetness, and service decisions.",
    examUse: "Use before tasting notes, service scenarios, or food-pairing questions.",
    routeHandoffs: [
      { label: "Flavor Wheel", route: "app/flavor-wheel" },
      { label: "Tasting Journal", route: "app/flavors" },
      { label: "Beverage Quiz", route: "app/beverage-quiz" }
    ],
    sourceSignals: ["Structure", "Aroma family", "Winemaking cue", "Service cue"],
    blocks: [
      {
        heading: "Structural families",
        bullets: ["High acid: Riesling, Sauvignon Blanc, Chenin Blanc, Champagne.", "High tannin: Cabernet Sauvignon, Nebbiolo, Syrah, young Tempranillo.", "Aromatic: Gewurztraminer, Muscat, Riesling, Viognier.", "Textural/oak: Chardonnay, Semillon, white Rioja, richer blends."]
      },
      {
        heading: "Style decision tree",
        bullets: ["If acid is high and body is light, check cool climate or early harvest.", "If tannin is high and fruit is black, check Cabernet, Syrah, Nebbiolo, Malbec.", "If aroma is floral or terpene-driven, check aromatic white grapes.", "If vanilla, toast, or cream appears, separate oak from grape character."]
      },
      {
        heading: "Food and service cues",
        bullets: ["Acid cuts fat and refreshes salt.", "Tannin needs protein, fat, or intensity.", "Sweetness can handle heat, salt, and blue cheese.", "Oak and high alcohol need richer dishes or careful glass pours."]
      }
    ],
    drills: ["One grape, five structural markers", "Aroma family flash", "Food-pairing one-liner", "Oak vs fruit separation"]
  },
  {
    id: "beer-style-service",
    category: "styles",
    title: "Beer Style And Service Grid",
    subtitle: "Beer style recall for malt, hop, yeast, color, serving, and fault logic.",
    examUse: "Use for Cicerone-style service, quality, style, and guest-language drills.",
    routeHandoffs: [
      { label: "Beer Quiz", route: "app/beverage-quiz?preset=beer" },
      { label: "Roleplay Lab", route: "app/service-roleplay" },
      { label: "Sip Game", route: "app/sip-game" },
      { label: "Resources", route: "app/resources" }
    ],
    sourceSignals: ["Malt", "Hop", "Yeast", "Draught/service", "Fault cue"],
    blocks: [
      {
        heading: "Fast style anchors",
        bullets: ["Pilsner: pale lager, crisp bitterness, clean fermentation.", "Hefeweizen: wheat, banana/clove yeast character, high carbonation.", "Saison: dry, peppery, effervescent farmhouse profile.", "Stout: roasted malt, coffee/cocoa cues, service temperature matters.", "IPA: hop aroma and bitterness; freshness is a service issue."]
      },
      {
        heading: "Fault separation",
        bullets: ["Diacetyl: butter or slick texture.", "Oxidation: cardboard, stale honey, dull hops.", "Lightstruck: skunky aroma from light exposure.", "Acetaldehyde: green apple or raw fermentation cue."]
      },
      {
        heading: "Service checks",
        bullets: ["Glass clean: no bubbles clinging to sidewall.", "Draught: correct temperature, pressure, line cleanliness.", "Pour: head formation fits style.", "Guest language: name style, strength, bitterness, and one food cue."]
      }
    ],
    drills: ["Style-to-glass match", "Fault callout rep", "Freshness check", "Guest recommendation script"]
  },
  {
    id: "floor-service-readiness",
    category: "service",
    title: "Floor Service Readiness",
    subtitle: "A practical service checklist for bottle, glass, guest, and issue recovery.",
    examUse: "Use for CMS-style service drills, pre-shift training, and hospitality roleplay.",
    routeHandoffs: [
      { label: "Support Teams", route: "support" },
      { label: "Cocktails", route: "app/cocktails" },
      { label: "Roleplay Lab", route: "app/service-roleplay" },
      { label: "Service Quiz", route: "app/beverage-quiz?preset=bar-service" }
    ],
    sourceSignals: ["Mise en place", "Guest cue", "Pour standard", "Recovery script"],
    blocks: [
      {
        heading: "Mise en place",
        bullets: ["Correct glassware, polished and checked.", "Tools ready: opener, napkin, tray, pen, dump bucket when needed.", "Bottle temp checked before table touch.", "Backup recommendation ready if first choice is unavailable."]
      },
      {
        heading: "Guest cue script",
        bullets: ["Ask one style preference: crisp, rich, bold, aromatic, bitter, low/no alcohol.", "Ask one context cue: food, mood, budget, adventure level.", "Offer two choices with one clear difference.", "Confirm pour size and pacing."]
      },
      {
        heading: "Recovery protocol",
        bullets: ["Listen fully before correcting.", "Replace flawed product quickly when reasonable.", "Name the fix, not the blame.", "Document repeat issues for manager training."]
      }
    ],
    drills: ["Two-choice recommendation", "Bottle temp check", "Flaw recovery sentence", "Upsell without pressure"]
  },
  {
    id: "classic-cocktail-specs",
    category: "classic-specs",
    title: "Classic Cocktail Spec Sheet",
    subtitle: "A print-ready build sheet for core classic specs, method, glass, and garnish.",
    examUse: "Use for BarSmarts-style reps, team pre-shift drills, and cocktail-map recall.",
    routeHandoffs: [
      { label: "Open Cocktails", route: "app/cocktails" },
      { label: "Roleplay Lab", route: "app/service-roleplay" },
      { label: "Service Quiz", route: "app/beverage-quiz?preset=bar-service" },
      { label: "Team Help", route: "support" }
    ],
    sourceSignals: ["Build", "Method", "Glass", "Garnish", "Family"],
    blocks: [
      {
        heading: "Spirit-forward",
        bullets: ["Old Fashioned: whiskey, sugar, bitters; stirred/built; rocks; orange twist.", "Manhattan: whiskey, sweet vermouth, bitters; stirred; coupe; cherry.", "Martini: gin, dry vermouth; stirred; cocktail glass; lemon twist or olive.", "Negroni: gin, Campari, sweet vermouth; stirred; rocks; orange."]
      },
      {
        heading: "Sours and highballs",
        bullets: ["Daiquiri: rum, lime, sugar; shaken; coupe.", "Margarita: tequila, orange liqueur, lime; shaken; coupe or rocks; salt optional.", "Whiskey Sour: whiskey, lemon, sugar; shaken; rocks.", "Paloma: tequila, lime, grapefruit soda; built; highball."]
      },
      {
        heading: "Build discipline",
        bullets: ["Citrus drinks are shaken unless a house spec says otherwise.", "Clear spirit-forward drinks are usually stirred.", "Highballs need cold glass, fresh carbonation, and measured base.", "Garnish should reinforce aroma, not hide poor balance."]
      }
    ],
    drills: ["Spec from memory", "Method sort", "Glass/garnish match", "Family substitution"]
  }
];
