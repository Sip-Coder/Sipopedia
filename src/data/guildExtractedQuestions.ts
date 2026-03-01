export type ExtractedGuildQuestion = {
  id: string;
  sourceFile: string;
  sourceCategory: string;
  sourceNumber: number;
  question: string;
  options: string[];
  correctOptionIndex: number | null;
  beverages: Array<"wine" | "beer" | "spirits" | "coffee" | "tea" | "fruit">;
  standard: "Foundations" | "Production" | "Sensory" | "Service" | "Pairing" | "Quality";
};

export type GuildReferenceCatalogEntry = {
  sourceFile: string;
  sourceCategory: string;
};

export const guildReferenceCatalog: GuildReferenceCatalogEntry[] = [
  {
    "sourceFile": "src/assets/guild_exam_info/Wine/Certified-Sommelier-Level-Wines.pdf",
    "sourceCategory": "Wine"
  },
  {
    "sourceFile": "src/assets/guild_exam_info/Wine/Grape-Variety-Profiles-Introductory-Level.pdf",
    "sourceCategory": "Wine"
  },
  {
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-and-Certified-Somm-Theory-Exam-Curriculum-Guide.pdf",
    "sourceCategory": "Wine"
  },
  {
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine"
  },
  {
    "sourceFile": "src/assets/guild_exam_info/Wine/Online-Introductory-Course-Alternative-Wine-Selection-and-Wine-Kit-List-20250317.pdf",
    "sourceCategory": "Wine"
  },
  {
    "sourceFile": "src/assets/guild_exam_info/Wine/Online-Introductory-Sommelier-Examination-Guide.pdf",
    "sourceCategory": "Wine"
  }
];

export const extractedGuildQuestions: ExtractedGuildQuestion[] = [
  {
    "id": "introductory-sommelier-course-practice-exam-1-6a6c06895c",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 1,
    "question": "The Pays Nantais, Touraine, and Anjou - Saumur regions are all located in _____________.",
    "options": [
      "The Loire Valley",
      "Champagne",
      "Burgundy",
      "The Rhône Valley"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-2-ffca8d8a15",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 2,
    "question": "____________ is a grape species.",
    "options": [
      "Cabernet Sauvignon",
      "Vitis vinifera",
      "Brettanomyces",
      "Quercus suber"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-3-df7ae15fc1",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 3,
    "question": "What is the predominant grape variety of the wine pictured below?",
    "options": [
      "Pinot Noir",
      "Grenache Noir",
      "Cabernet Sauvignon",
      "Malbec"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-4-b0b679d2fe",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 4,
    "question": "The ____________ Mountains create a rain shadow effect for the vineyards of the Mendoza IG.",
    "options": [
      "Sierra Cantabria",
      "Santa Cruz",
      "Andes",
      "Coastal"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-5-16f1d4f4c7",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 5,
    "question": "The __________ label term indicates a traditional, theoretically superior vineyard area within a DOC or DOCG.",
    "options": [
      "Frizzante",
      "Dolce",
      "Secco",
      "Classico"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-6-85a26d68c7",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 6,
    "question": "Cooler climates generally produce wines with __________.",
    "options": [
      "Elevated acidity",
      "Higher residual sugar",
      "Elevated alcohol",
      "Lower tannins"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Sensory"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-8-c960ddd7a4",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 8,
    "question": "The primary grape variety of the Rheingau is _____________.",
    "options": [
      "Grüner Veltliner",
      "Riesling",
      "Spätburgunder",
      "Müller - Thurgau"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-9-09722e0b6d",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 9,
    "question": "Which of the following grape varieties produces wine with intense aromas of bell pepper and blackcurrant?",
    "options": [
      "Syrah",
      "Nebbiolo",
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-10-288f2a1295",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 10,
    "question": "Amongst the following California AVAs, ____________ is most renowned for producing sparkling wine.",
    "options": [
      "Calistoga",
      "Dry Creek",
      "Paso Robles",
      "Anderson Valley"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-11-cdfd884405",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 11,
    "question": "A wine labeled SGN (or Sélection de Grains Nobles) is a ___________ wine.",
    "options": [
      "Sweet",
      "Sparking",
      "Fortified",
      "Dry Red"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-12-c164836ff0",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 12,
    "question": "Carmenère is most commonly associated with wine produced in _____________.",
    "options": [
      "Chile",
      "United States",
      "New Zealand",
      "South Africa"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-13-46f764a756",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 13,
    "question": "A ____________ - style beer is produced via top - fermenting yeasts in warmer temperatures.",
    "options": [
      "Pilsner",
      "Pale Ale",
      "Bock",
      "Oktoberfest"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "beer"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-14-586da6939f",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 14,
    "question": "Which of the following regions has the coolest climate?",
    "options": [
      "Chteauneuf - du - Pape",
      "Barossa Valley",
      "Mosel",
      "Napa Valley"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-15-56c3234572",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 15,
    "question": "Bottles, decanters, and corks should always be placed ___________.",
    "options": [
      "On an underliner on the guests' table",
      "At a side station away from the guest",
      "On an underliner at a side station away from the guest",
      "Directly on the guests' table without an underliner"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Service"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-16-0bd727e020",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 16,
    "question": "The aromas of TCA (or \"corked wine\") are generally described as smelling like ___________.",
    "options": [
      "Spoiled egg and/or struck matchstick",
      "Moldy cardboard and/or must",
      "Band - Aid and/or barnyard",
      "Vinegar and/or nail polish remover"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Quality"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-17-fd62171086",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 17,
    "question": "The ____________ DOP in Portugal is most associated with the ____________ grape variety.",
    "options": [
      "Vinho Verde / Alvarinho",
      "Maule / Tempranillo",
      "Rueda / Verdejo",
      "Mendoza / Garnacha"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-18-4287bb362d",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 18,
    "question": "Chteau Cheval Blanc is classified as a ____________ per the Saint - Émilion Classification of 2012.",
    "options": [
      "Vin Ordinaire",
      "Gran Reserva",
      "Premier Grand Cru Classé 'A'",
      "Kabinett"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-19-6d99852c36",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 19,
    "question": "In which century did Australia establish itself as a major wine exporter?",
    "options": [
      "17th",
      "18th",
      "19th",
      "20th"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-20-6a4e950dc2",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 20,
    "question": "Alcoholic fermentation requires the interaction of ___________ and ___________.",
    "options": [
      "Oak barrels / Dead yeast cells",
      "Water / Alcoholic spirit",
      "Sugar / Yeast",
      "Carbon dioxide / Oxygen"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "spirits"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-21-b9812802f6",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 21,
    "question": "Which of the following spirits can be distilled from corn, potatoes, wheat , and/or rice?",
    "options": [
      "Vodka",
      "Rum",
      "Brandy",
      "Tequila"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "spirits"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-22-75ad7b626a",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 22,
    "question": "Which of the following countries features the Southern Alps mountain range?",
    "options": [
      "Chile",
      "South Africa",
      "New Zealand",
      "Argentina"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-23-25efa92e4a",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 23,
    "question": "___________ refers to a white Champagne made from Pinot Noir and/or Meunier.",
    "options": [
      "Demi - sec",
      "Monopole",
      "Tête du Cuvée",
      "Blanc de Noirs"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-24-875b9ad989",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 24,
    "question": "Which of the following aspects of wine will make meats and cheeses feel less rich and fatty?",
    "options": [
      "Moderately high tannin",
      "Bone dry",
      "Low acid",
      "Ripe fruit"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Pairing"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-25-dfcb789949",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 25,
    "question": "The primary color (or colors) of Wachau DAC wine is/are ___________.",
    "options": [
      "White",
      "White and Rosé",
      "Rosé and Red",
      "Red"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Sensory"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-26-ee2b7abba6",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 26,
    "question": "The closure pictured below is used for a ____________ wine produced via the ____________ method.",
    "options": [
      "Fortified / Arrested Fermentation",
      "Sparkling / Traditional",
      "Dessert / Carbonation",
      "Sparkling / Tank"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-27-a1d15c3485",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 27,
    "question": "_____________ on a bottle of Rioja DOCa indicates the longest amount of aging before release.",
    "options": [
      "Denominación de Origen Calificada",
      "Vino",
      "Gran Reserva",
      "Tinto"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Service"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-28-8661259393",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 28,
    "question": "Schist, marl, and silt are types of ___________.",
    "options": [
      "Vine clones",
      "Trellising",
      "Fertilizer",
      "Soil"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-29-b2354f5db8",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 29,
    "question": "Relative to the general harvest timing in Bordeaux, grapes used in the production of Sauternes AOP are picked ___________.",
    "options": [
      "Early",
      "At the same time",
      "Late",
      "When frozen"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-30-4b0cae8a4a",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 30,
    "question": "____________ is located in South Africa.",
    "options": [
      "Marlborough",
      "Stellenbosch",
      "Margaret River",
      "Russian River Valley"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-31-2b3361b96c",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 31,
    "question": "Which of the following descriptions most indicates the extended barrel and bottle aging of a white wine?",
    "options": [
      "Golden color",
      "Primary, fresh fruit flavors",
      "Short finish",
      "High acid"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Service"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-32-1ac26ef45e",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 32,
    "question": "The Morgon, Moulin - à - Vent, and Brouilly AOPs are all located in ____________ .",
    "options": [
      "Chablis",
      "Côte d'Or",
      "Beaujolais",
      "Côte Chalonnaise"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-33-b38ec879a3",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 33,
    "question": "The climate of the Columbia Valley AVA can best be categorized as _____________.",
    "options": [
      "Subtropical",
      "Mediterranean",
      "Maritime",
      "Continental"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-34-0457cbdc0f",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 34,
    "question": "Which of the following is NEVER a consideration in defining an AOP?",
    "options": [
      "Geographic boundaries",
      "Production methods",
      "Price per bottle",
      "Grape variety"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Service"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-35-0d09361625",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 35,
    "question": "The label term ____________ indicates that a sake is unpasteurized.",
    "options": [
      "Daiginjo",
      "Nigori",
      "Ginjo",
      "Namazake"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "beer"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-36-a1cac55210",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 36,
    "question": "Alto Adige is most known for producing ___________ wines.",
    "options": [
      "Sweet, still red",
      "Dry, still white",
      "Sweet, sparkling white",
      "Fortified, aromatized red"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-37-82a9c342af",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 37,
    "question": "Which of the following AOPs features the greatest percentage of steep hillside vineyards?",
    "options": [
      "Côte - Rôtie",
      "Pauillac",
      "Puligny - Montrachet",
      "Champagne"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-38-dd4a9a4429",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 38,
    "question": "Which of the following wines is a classic pairing with fresh goat cheese?",
    "options": [
      "Barolo",
      "- Year Tawny Port",
      "Sancerre",
      "Napa Valley Cabernet Sauvignon"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Pairing"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-39-74b9dd5bc1",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 39,
    "question": "To which fortified wine does the diagram illustrating Running the Scales apply?",
    "options": [
      "Port",
      "Muscat de Beaumes - de - Venise",
      "Madeira",
      "Sherry"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-40-d93ab01275",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 40,
    "question": "____________ is most commonly associated with white wine production in Argentina.",
    "options": [
      "Albariño",
      "Torrontés",
      "Verdejo",
      "Carricante"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-41-40ead1d1e5",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 41,
    "question": "____________ is the removal of unwanted items and damaged fruit from desired grape bunches arriving at the winery after picking.",
    "options": [
      "Maceration",
      "Fermentation",
      "Crushing",
      "Sorting"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "fruit"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-42-065f04f684",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 42,
    "question": "What are the primary grape varieties grown in the Priorat DOCa?",
    "options": [
      "Garnacha / Cariñena",
      "Torrontés / Verdejo",
      "Tempranillo / Albariño",
      "Cabernet Sauvignon / Tempranillo"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-44-86ec8380d6",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 44,
    "question": "What region is depicted in the map below?",
    "options": [
      "Veneto",
      "Tuscany",
      "Sicily",
      "Piedmont"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-45-f1bafc3590",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 45,
    "question": "Tokaji Aszú is a sweet, white wine from which country?",
    "options": [
      "Italy",
      "United States",
      "Canada",
      "Hungary"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-46-88cc8a5710",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 46,
    "question": "The base material in the production of rum is __________.",
    "options": [
      "Grain",
      "Grapes",
      "Blue Agave",
      "Sugarcane"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "spirits"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-47-4a6b9458a2",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 47,
    "question": "Riesling generally produces wines with elevated __________.",
    "options": [
      "Alcohol",
      "Color",
      "Acidity",
      "Tannins"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Sensory"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-48-cbd6b09b85",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 48,
    "question": "_____________ is the local name for the most renowned soil of the Coonawarra GI of Australia.",
    "options": [
      "Terra Rossa",
      "Galets",
      "Silex",
      "Galestro"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-49-5512c86866",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 49,
    "question": "What is the primary grape variety used to produce Chinon AOP?",
    "options": [
      "Cabernet Franc",
      "Pinot Noir",
      "Syrah",
      "Gamay Noir"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-50-7ad7110093",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 50,
    "question": "Quinta is best defined as _____________.",
    "options": [
      "Vintage",
      "Variety",
      "Vineyard",
      "Country"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "fruit"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-51-81bb1c7c50",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 51,
    "question": "At 10 years of age, which of the following red wines would most likely require decanting due to sediment?",
    "options": [
      "Beaujolais - Villages (based on Gamay Noir)",
      "Rioja (based on Tempranillo)",
      "Chianti (based on Sangiovese)",
      "Hermitage (based on Syrah)"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-52-c6f0b1a96c",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 52,
    "question": "What color is Vintage Port when bottled?",
    "options": [
      "White",
      "Pink",
      "Purple",
      "Brown"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "wine"
    ],
    "standard": "Sensory"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-53-e2456db625",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 53,
    "question": "The Maipo Valley DO is located in _____________.",
    "options": [
      "Chile",
      "Spain",
      "Argentina",
      "Portugal"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-54-9abea98b8d",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 54,
    "question": "The climate of the Champagne AOP can best be categorized as _____________.",
    "options": [
      "Subtropical",
      "Mediterranean",
      "Maritime",
      "Continental"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-55-b729578502",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 55,
    "question": "Which of the following physical features most affects the vineyards of Pauillac AOP in Bordeaux?",
    "options": [
      "Vosges Mountains",
      "Gironde Estuary",
      "Rhône River",
      "Limousin Forest"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-56-b0a37afc4d",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 56,
    "question": "Which of the following Italian terms refers to the fog that rolls off the Alps into Piedmont vineyards?",
    "options": [
      "Riserva",
      "Nebbia",
      "Spumante",
      "Appassimento"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-57-d293eef54e",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 57,
    "question": "The Kamptal and Kremstal regions are located in ___________.",
    "options": [
      "Germany",
      "France",
      "Italy",
      "Austria"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-58-aa02172b24",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 58,
    "question": "Alcohol in wine is perceived as ____________ in the mouth, throat, and chest.",
    "options": [
      "Astringency",
      "Tartness",
      "Fruitiness",
      "Heat"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-59-e8c8f6453a",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 59,
    "question": "Which of the following spirits is most likely to age in oak barrels?",
    "options": [
      "Gin",
      "Cognac",
      "Tequila",
      "Vodka"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "spirits"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-60-1b7f9bba2e",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 60,
    "question": "____________ is a prominent sub - region of the Hawke's Bay GI in New Zealand.",
    "options": [
      "Gimblett Gravels",
      "McLaren Vale",
      "Marlborough",
      "Paarl"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-61-9201db02cc",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 61,
    "question": "The predominant soil type found in the Mosel is ____________.",
    "options": [
      "Volcanic basalt",
      "Slate",
      "Gravel",
      "Limestone / Chalk"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-62-0230461264",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 62,
    "question": "What is the most likely grape variety used to produce the wine with the below label?",
    "options": [
      "Pinot Noir",
      "Zinfandel",
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-63-4bb594c705",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 63,
    "question": "Le Musigny is classified as a ___________ .",
    "options": [
      "Village",
      "First Growth",
      "Vin de Table",
      "Grand Cru"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Service"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-64-3042f54bc1",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 64,
    "question": "___________ generally produces wine with aromas of ripe yellow apple and pineapple, butter, and baking spice.",
    "options": [
      "Marlborough Sauvignon Blanc",
      "Alsace Gewurztraminer",
      "Friuli Pinot Grigio",
      "Sonoma Valley Chardonnay"
    ],
    "correctOptionIndex": 3,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-65-9f4c842afc",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 65,
    "question": "The majority of Alsace Grand Cru AOP wines are made from ____________.",
    "options": [
      "A blend of white grape varieties",
      "A single white grape variety",
      "A blend of red wine grape varieties",
      "A single red grape variety"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-66-7bd50c8017",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 66,
    "question": "The Rías Baixas DO produces mostly ___________ wines.",
    "options": [
      "Sweet, still red",
      "Dry, still white",
      "Sweet, sparkling white",
      "Fortified, aromatized red"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-67-00b0f75f9e",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 67,
    "question": "Sugar in food will make wine taste more ___________.",
    "options": [
      "Tart and/or Bitter",
      "Fruity",
      "Aged",
      "Oaky"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Pairing"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-68-2289a57666",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 68,
    "question": "Which of the following people is largely considered the \"Father of Modern Napa Valley\"?",
    "options": [
      "Robert Mondavi",
      "Baron Le Roy",
      "Piero Antinori",
      "David Lett"
    ],
    "correctOptionIndex": 0,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-69-d9b894ea28",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 69,
    "question": "Which of the following grape varieties produces wine in both Stellenbosch WO and Vouvray AOP?",
    "options": [
      "Riesling",
      "Pinot Gris",
      "Chenin Blanc",
      "Chardonnay"
    ],
    "correctOptionIndex": 2,
    "beverages": [
      "fruit",
      "wine"
    ],
    "standard": "Production"
  },
  {
    "id": "introductory-sommelier-course-practice-exam-70-9f9fad12af",
    "sourceFile": "src/assets/guild_exam_info/Wine/Introductory-Sommelier-Course-Practice-Exam.pdf",
    "sourceCategory": "Wine",
    "sourceNumber": 70,
    "question": "Which of the following regions is most likely to feature the gravel topsoil pictured below?",
    "options": [
      "Douro",
      "Pauillac",
      "Mosel",
      "Priorat"
    ],
    "correctOptionIndex": 1,
    "beverages": [
      "wine"
    ],
    "standard": "Foundations"
  }
];
