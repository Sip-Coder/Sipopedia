const fs = require("fs");

const sourceTitle = "Sip Studies Original Editorial Glossary Curated v2";
const rows = JSON.parse(
  fs.readFileSync("output/terminology_curated_v2_terms.json", "utf8")
).filter((row) =>
  ["coffee", "kombucha", "juice", "milk", "water"].includes(row.beverage_type)
);

function pick(term, arr) {
  let sum = 0;
  for (const ch of term) sum += ch.charCodeAt(0);
  return arr[sum % arr.length];
}

function coffeeVariety(term, style, trade) {
  return pick(term, [
    `${term} belongs on a buying sheet, menu note, or staff brief when you want to name the plant material behind ${style}. In trade use, it helps explain ${trade}.`,
    `Use ${term} to anchor origin training, green coffee selection, and guest-facing copy around ${style}. It is practical shorthand for ${trade}.`,
    `Call out ${term} when cup profile, farm selection, or blend design depends on ${style}. In the marketplace, the term signals ${trade}.`,
  ]);
}

function coffeeProcess(term, point, why) {
  return pick(term, [
    `Use ${term} when discussing processing or roasting decisions that shape ${point}. In production and quality control, it matters because ${why}.`,
    `${term} is applied in coffee trade language when you need to connect process to ${point}. It is especially useful on roast briefs and cupping tables because ${why}.`,
    `Bring in ${term} when explaining why a coffee shows ${point} or why a roaster chose a certain workflow. The term has value because ${why}.`,
  ]);
}

function coffeeBrew(term, point, why) {
  return pick(term, [
    `Use ${term} in bar training and service standards when the goal is ${point}. It guides recipe choices because ${why}.`,
    `${term} belongs in espresso or brew conversations whenever ${point} is the target. In practical use, it matters because ${why}.`,
    `Apply ${term} when dialing in beverages, teaching staff, or writing service specs around ${point}. The term stays useful because ${why}.`,
  ]);
}

function kombuchaCulture(term, point, why) {
  return pick(term, [
    `Use ${term} when explaining culture health, fermentation behavior, or cellar decisions in kombucha production. It matters because ${why} and it directly shapes ${point}.`,
    `${term} belongs in kombucha production notes whenever you need to link microbial activity to ${point}. In practical terms, ${why}.`,
    `Apply ${term} in brew logs, QA checks, and training when ${point} depends on microbial balance. The reason is simple: ${why}.`,
  ]);
}

function kombuchaProcess(term, point, why) {
  return pick(term, [
    `Use ${term} when discussing fermentation management, packaging, or sensory control in kombucha. It matters because ${why} and shows up as ${point}.`,
    `${term} is useful trade language when a producer needs to connect process choices to ${point}. On the floor, ${why}.`,
    `Bring in ${term} on batch sheets or tasting notes whenever ${point} is at stake. It earns its keep because ${why}.`,
  ]);
}

function juiceProcess(term, point, why) {
  return pick(term, [
    `Use ${term} in juice production and buying conversations when ${point} is the concern. It matters because ${why}.`,
    `${term} belongs on technical sheets, tasting reviews, and plant discussions whenever ${point} needs to be controlled. In practical terms, ${why}.`,
    `Apply ${term} when connecting processing choices to ${point} in packaged or fresh juice. The trade value is that ${why}.`,
  ]);
}

function juiceSensory(term, point, why) {
  return pick(term, [
    `Use ${term} in tasting, menu copy, or QC language when you need to describe ${point}. It is useful because ${why}.`,
    `${term} helps retailers, makers, and educators discuss ${point} without vague wording. In practice, ${why}.`,
    `Bring in ${term} when a juice's appeal rests on ${point}. The term matters because ${why}.`,
  ]);
}

function milkProcess(term, point, why) {
  return pick(term, [
    `Use ${term} when dairy production, texture, or shelf-life decisions hinge on ${point}. It matters because ${why}.`,
    `${term} belongs in dairy training and plant specs whenever ${point} drives the outcome. In practice, ${why}.`,
    `Apply ${term} in cheesemaking, cultured dairy, or fluid milk discussions when ${point} is under review. The trade value is that ${why}.`,
  ]);
}

function milkSource(term, point, why) {
  return pick(term, [
    `Use ${term} when the identity of the animal, herd, or farm system explains ${point}. It is practical trade shorthand because ${why}.`,
    `${term} belongs in dairy buying and education when you need to connect source conditions to ${point}. In real use, ${why}.`,
    `Bring in ${term} when discussing milk style, fat quality, or production economics around ${point}. The term matters because ${why}.`,
  ]);
}

function waterChem(term, point, why) {
  return pick(term, [
    `Use ${term} when reading a water report, setting product specs, or pairing water with food and coffee. It matters because ${why} and directly affects ${point}.`,
    `${term} belongs in sensory, compliance, and sourcing discussions whenever ${point} is tied to composition. In practical terms, ${why}.`,
    `Apply ${term} when the chemistry of a water changes service value or production fit. The term is useful because ${why} and shows up in ${point}.`,
  ]);
}

function waterSource(term, point, why) {
  return pick(term, [
    `Use ${term} when source identity or watershed context explains ${point}. It matters in water trade because ${why}.`,
    `${term} belongs in source storytelling, technical review, and packaging language whenever ${point} depends on origin. In practice, ${why}.`,
    `Bring in ${term} when a water's market position or sensory profile is tied to ${point}. The reason is that ${why}.`,
  ]);
}

function waterTreatment(term, point, why) {
  return pick(term, [
    `Use ${term} when treatment decisions shape safety, texture, or finish in packaged or service water. It matters because ${why} and influences ${point}.`,
    `${term} is practical language for plant operators and beverage buyers when ${point} depends on treatment. In real use, ${why}.`,
    `Apply ${term} in QA, compliance, and service training whenever ${point} is managed through treatment. The term earns its keep because ${why}.`,
  ]);
}

const texts = {
  Arabica: coffeeVariety("Arabica", "higher acidity, aromatic lift, and a finer cup line", "why a lot commands a premium and suits single-origin programs"),
  Robusta: coffeeVariety("Robusta", "more body, firmer bitterness, and heavier crema", "blend cost, caffeine lift, and espresso structure"),
  Typica: coffeeVariety("Typica", "classic sweetness and elegant citrus-led structure", "benchmark quality in traditional arabica lineages"),
  Caturra: coffeeVariety("Caturra", "a bright, compact, high-yield profile", "why many producers balance productivity with lively cup character"),
  Catuai: coffeeVariety("Catuai", "steady sweetness and dependable balance", "farm resilience and consistent blending performance"),
  Pacamara: coffeeVariety("Pacamara", "large-bean lots with broad texture and dramatic aromatics", "why rare lots attract attention on premium lists"),
  Geisha: coffeeVariety("Geisha", "floral perfume, tea-like lift, and precision", "auction pricing and luxury menu positioning"),
  Liberica: coffeeVariety("Liberica", "an unusual resinous, fruity, often smoky profile", "how a list can highlight rarity rather than conformity"),
  Excelsa: coffeeVariety("Excelsa", "sharp aromatic lift and tart fruit accents", "how blenders add top-note complexity"),
  Catimor: coffeeVariety("Catimor", "disease-resistant production with cup tradeoffs to manage", "how agronomy and quality are balanced in sourcing"),
  Maragogipe: coffeeVariety("Maragogipe", "oversized beans and a delicate, open aromatic set", "why presentation and rarity can matter as much as yield"),
  MundoNovo: coffeeVariety("MundoNovo", "structured sweetness and volume-friendly consistency", "Brazilian sourcing logic for blends and espresso"),
  Bourbon: coffeeVariety("Bourbon", "sweet fruit definition and polished texture", "why certain estates market heritage cultivars as quality markers"),
  Heirloom: coffeeVariety("Heirloom", "genetic diversity and origin-driven nuance", "why Ethiopian lots often need broader cultivar language"),
  Natural: coffeeProcess("Natural", "fruit weight, jammy sweetness, and broader body", "the seed dries inside the cherry and picks up more fruit influence"),
  Washed: coffeeProcess("Washed", "clarity, acidity, and transparent origin character", "removing fruit early reduces ferment impact and sharpens definition"),
  Honey: coffeeProcess("Honey", "texture, sweetness, and mid-palate richness", "retained mucilage changes drying behavior and flavor development"),
  Anaerobic: coffeeProcess("Anaerobic", "intense ester character and a more experimental cup profile", "sealed fermentation changes microbial activity and sensory outcomes"),
  Pulping: coffeeProcess("Pulping", "how fruit is removed before fermentation or drying", "that first mechanical step sets up the rest of the process flow"),
  Mucilage: coffeeProcess("Mucilage", "sweetness, texture, and fermentation dynamics", "that sticky fruit layer feeds microbial action during processing"),
  Demucilage: coffeeProcess("Demucilage", "cleaner, more controlled washed profiles", "mechanical removal reduces fermentation variability"),
  Drymill: coffeeProcess("Drymill", "final preparation, sorting, and export readiness", "hulling and grading after drying decide the lot's commercial finish"),
  Wetmill: coffeeProcess("Wetmill", "pulping, washing, and fermentation control at origin", "mill setup strongly affects cleanliness and consistency"),
  Defect: coffeeProcess("Defect", "price deductions, grading calls, and cup faults", "a defect changes both valuation and sensory trust"),
  Screening: coffeeProcess("Screening", "bean-size uniformity before roasting", "even size improves heat transfer and cleaner roast development"),
  Roastery: coffeeProcess("Roastery", "how production philosophy becomes a finished style", "roastery standards govern sourcing, profiling, and quality release"),
  Roast: coffeeProcess("Roast", "solubility, aroma balance, and brew suitability", "the roast decision determines how far origin character or development is pushed"),
  Maillard: coffeeProcess("Maillard", "nutty, bready, and chocolate-like development", "those browning reactions build complexity between drying and darker roast stages"),
  Caramelization: coffeeProcess("Caramelization", "deeper sweetness and darker sugar tones", "continued heat transforms sugars and shifts the cup away from raw acidity"),
  Development: coffeeProcess("Development", "how fully the roast finishes after first crack", "too little leaves the cup sharp while too much mutes detail"),
  Degassing: coffeeProcess("Degassing", "espresso stability and packaging timing", "freshly roasted coffee releases carbon dioxide that can distort extraction"),
  Refractometer: coffeeBrew("Refractometer", "measuring strength and extraction with precision", "TDS data keeps brew decisions grounded in numbers rather than guesswork"),
  Dose: coffeeBrew("Dose", "controlling concentration and extraction balance", "changing the dry coffee mass shifts how the recipe behaves"),
  Yield: coffeeBrew("Yield", "tracking beverage output and recipe ratio", "cup weight tells the barista whether the extraction ran short or long"),
  Espresso: coffeeBrew("Espresso", "a concentrated brew with pressure, texture, and crema", "it is the base format for many bar drinks and a key calibration point"),
  Ristretto: coffeeBrew("Ristretto", "a shorter, denser, sweeter espresso expression", "cutting the yield changes concentration and perceived body"),
  Lungo: coffeeBrew("Lungo", "a longer espresso with more dilution through extraction", "extended yield shifts bitterness, body, and aromatic shape"),
  Americano: coffeeBrew("Americano", "serving espresso in a longer, cleaner format", "dilution opens aroma while keeping espresso character"),
  Cappuccino: coffeeBrew("Cappuccino", "balancing espresso intensity with textured milk", "foam ratio changes both sweetness perception and service style"),
  Macchiato: coffeeBrew("Macchiato", "marking espresso with a small amount of milk", "the drink keeps espresso first while softening the edge"),
  Cortado: coffeeBrew("Cortado", "equalizing espresso and milk for a compact, balanced drink", "a tighter milk ratio preserves coffee definition"),
  Dripper: coffeeBrew("Dripper", "manual percolation and filter shape control", "brew bed geometry affects flow rate and extraction clarity"),
  Chemex: coffeeBrew("Chemex", "a clean, polished filter profile with lighter texture", "the thick paper reduces sediment and oils"),
  Kalita: coffeeBrew("Kalita", "stable flat-bed extraction and even drawdown", "its geometry helps reduce channeling in pour-over service"),
  Aeropress: coffeeBrew("Aeropress", "flexible immersion-plus-pressure brewing", "it lets staff change body, clarity, and brew time with ease"),
  Frenchpress: coffeeBrew("Frenchpress", "full-bodied immersion brewing with more sediment", "metal filtration preserves oils and weight"),
  Siphon: coffeeBrew("Siphon", "a theatrical brew with high clarity and aroma lift", "vacuum brewing turns service into both extraction and presentation"),
  Turkish: coffeeBrew("Turkish", "finely ground, unfiltered brewing with dense texture", "the method keeps solids in the cup and carries strong cultural identity"),
  Portafilter: coffeeBrew("Portafilter", "holding and presenting the espresso puck correctly", "basket choice and prep affect flow and extraction"),
  Tamper: coffeeBrew("Tamper", "setting an even coffee bed before brewing", "good puck prep reduces uneven water flow"),
  Grouphead: coffeeBrew("Grouphead", "stable water delivery at the espresso machine", "temperature and cleanliness at the head influence shot quality"),
  Backflush: coffeeBrew("Backflush", "keeping espresso equipment clean and flavor-stable", "oil buildup quickly taints shots and machine performance"),
  Channeling: coffeeBrew("Channeling", "diagnosing uneven extraction in the puck", "water always finds weak points first and leaves the shot unbalanced"),
  Crema: coffeeBrew("Crema", "reading freshness, gas retention, and espresso texture", "it affects visual appeal but must be judged alongside taste"),
  Aftertaste: coffeeBrew("Aftertaste", "evaluating how flavor lingers after swallowing", "finish quality often separates average cups from great ones"),
  Sweetness: coffeeBrew("Sweetness", "describing balance and ripeness in the cup", "real sweetness is a quality marker across origin, roast, and brew"),
  Fragrance: coffeeBrew("Fragrance", "judging dry aroma before water is added", "that first aromatic read helps set cupping expectations"),
  Cupping: coffeeBrew("Cupping", "comparing coffees under a standardized tasting method", "shared protocol makes buying and QC decisions more defensible"),
  Cupper: coffeeBrew("Cupper", "the trained palate behind green-buying and QC calls", "commercial decisions depend on disciplined sensory judgment"),
  Scoby: kombuchaCulture("Scoby", "acid structure and ferment reliability", "the symbiotic culture drives the whole fermentation"),
  Pellicle: kombuchaCulture("Pellicle", "surface growth and oxygen-exposed fermentation behavior", "the cellulose mat is a sign of active culture rather than the whole culture itself"),
  Acetobacter: kombuchaCulture("Acetobacter", "vinegar-like lift and acid development", "these bacteria convert alcohol into acetic acid when oxygen is available"),
  Gluconacetobacter: kombuchaCulture("Gluconacetobacter", "cellulose formation and stable acid production", "it helps build the pellicle while shaping the ferment"),
  Saccharomyces: kombuchaCulture("Saccharomyces", "sugar conversion and early alcohol production", "yeast activity sets up the bacteria that follow"),
  Brettanomyces: kombuchaCulture("Brettanomyces", "funky, wild aromatic notes when present", "it can add complexity or push the batch off style"),
  Inoculum: kombuchaCulture("Inoculum", "fermentation speed and consistency from batch to batch", "the starting culture volume sets the initial microbial balance"),
  Backslop: kombuchaCulture("Backslop", "fast acidification and safer batch starts", "using mature kombucha as starter lowers pH early"),
  Acetic: kombuchaProcess("Acetic", "sharp vinegar-like drive on the palate", "too much acetic character makes the drink harsh and culinary rather than refreshing"),
  Gluconic: kombuchaProcess("Gluconic", "a gentler acid line with softer sourness", "this acid often contributes freshness without the bite of straight vinegar notes"),
  Lactic: kombuchaProcess("Lactic", "rounder, yogurt-like acidity when it appears", "its softer profile can shift the drink toward a smoother sour impression"),
  Malic: kombuchaProcess("Malic", "apple-like acidity and crispness", "the term helps tasters separate green-fruit lift from harsher acetic notes"),
  Succinic: kombuchaProcess("Succinic", "a savory-bitter acid accent in the finish", "it can add complexity but can also read coarse if balance is poor"),
  Carbonation: kombuchaProcess("Carbonation", "package pressure and mouthfeel", "dissolved carbon dioxide drives liveliness and shelf behavior"),
  Effervescence: kombuchaProcess("Effervescence", "how fine and elegant the bubbles feel in service", "bubble texture changes perceived freshness"),
  Fizz: kombuchaProcess("Fizz", "casual service language for visible sparkle and lift", "retail staff use it to describe liveliness in approachable terms"),
  Vinegar: kombuchaProcess("Vinegar", "the point where the batch has moved too far toward acetic sharpness", "producers watch this closely to avoid losing drinkability"),
  Tanginess: kombuchaProcess("Tanginess", "bright, appetizing acidity in the finished drink", "the word helps sell sour refreshment without sounding harsh"),
  Dryness: kombuchaProcess("Dryness", "how little residual sugar remains at bottling", "it signals a cleaner finish and a more adult profile"),
  Headspace: kombuchaProcess("Headspace", "oxygen exposure and package pressure risk", "the fill level affects both acetic development and carbonation"),
  Biofilm: kombuchaCulture("Biofilm", "surface growth, sanitation review, and culture behavior", "not every film is healthy kombucha growth, so the term sharpens QA language"),
  Cooling: kombuchaProcess("Cooling", "slowing fermentation before storage or transport", "temperature control is one of the cleanest ways to steady a live product"),
  Flavoring: kombuchaProcess("Flavoring", "how fruit, spice, or herb additions reshape the base tea ferment", "secondary additions can raise both appeal and instability"),
  Secondary: kombuchaProcess("Secondary", "bottle conditioning, flavor integration, and extra fizz", "this stage often decides final pressure and aromatic style"),
  Primary: kombuchaProcess("Primary", "the main fermentation where sugar is first transformed", "getting this stage right sets the ceiling for the whole batch"),
  Acidification: kombuchaProcess("Acidification", "microbial safety and final balance", "dropping pH quickly protects the batch and defines the style"),
  Sanitation: kombuchaProcess("Sanitation", "preventing spoilage and off-flavor organisms", "clean equipment is non-negotiable with a live acidic beverage"),
  Contamination: kombuchaProcess("Contamination", "why a batch has drifted off profile or become unsafe", "the term is used when unwanted organisms overtake the intended culture"),
  Mold: kombuchaProcess("Mold", "a discard decision rather than a salvage discussion", "visible mold means the culture and batch can no longer be trusted"),
  Kahm: kombuchaProcess("Kahm", "surface yeast growth that signals quality trouble", "it is not the same as mold, but it still strips freshness and clean flavor"),
  Culture: kombuchaCulture("Culture", "the living engine of the beverage", "operators use the word broadly for the yeast-and-bacteria system that governs flavor and safety"),
  Symbiosis: kombuchaCulture("Symbiosis", "the balance between yeast fermentation and bacterial acid formation", "kombucha quality depends on those partners working in step"),
  Dilution: kombuchaProcess("Dilution", "adjusting intensity before packaging or service", "watering back can recover balance, but it also changes acid, sugar, and aroma definition"),
  Sourness: kombuchaProcess("Sourness", "consumer-facing tartness and refreshment level", "the term lets tasters discuss acid impact apart from aroma"),
  Ethanol: kombuchaProcess("Ethanol", "compliance, label risk, and fermentation stage", "alcohol is a normal intermediate and has to be managed carefully"),
  Acetate: kombuchaProcess("Acetate", "volatile ester and solvent-like notes when the ferment drifts", "producers track it because it can move a batch from lively to coarse"),
  Cellulose: kombuchaCulture("Cellulose", "pellicle formation and the physical structure of the culture", "bacterial cellulose is one visual sign of an active ferment"),
  Nectar: juiceProcess("Nectar", "a richer fruit style that needs added body or sweetness", "the term tells buyers the drink is not simply straight juice"),
  Concentrate: juiceProcess("Concentrate", "cost, logistics, and reprocessing options", "removing water changes freight efficiency and formulation flexibility"),
  Reconstitution: juiceProcess("Reconstitution", "how a concentrate returns to saleable strength", "water quality and ratio accuracy decide whether the finished juice feels complete"),
  Clarifier: juiceProcess("Clarifier", "how haze is reduced before packaging", "clear juice needs solids managed without stripping too much character"),
  Pectinase: juiceProcess("Pectinase", "yield, settling, and filtration ease", "breaking down pectin helps free juice and lower viscosity"),
  Enzyme: juiceProcess("Enzyme", "targeted changes to texture, extraction, or clarification", "processors use specific enzymes to solve specific plant problems"),
  Cloudiness: juiceSensory("Cloudiness", "natural-looking opacity and suspended solids", "for some styles it signals freshness, while for others it reads as instability"),
  Pulp: juiceSensory("Pulp", "texture and a sense of less processed fruit", "the amount of pulp changes both drinking feel and customer preference"),
  Pressing: juiceProcess("Pressing", "how efficiently fruit becomes juice without harsh extraction", "press choices affect yield, solids, and bitterness"),
  Aseptic: juiceProcess("Aseptic", "shelf-stable packaging without refrigeration", "sterile product and sterile pack conditions extend life while preserving flavor"),
  Sweetener: juiceProcess("Sweetener", "final balance and target market style", "adding sweetness changes both label position and sensory honesty"),
  Acidulant: juiceProcess("Acidulant", "brightness, microbial stability, and flavor lift", "added acid can restore structure that fruit alone does not provide"),
  Stabilizer: juiceProcess("Stabilizer", "suspension and texture over shelf life", "it helps keep the drink uniform instead of separating out"),
  Deaeration: juiceProcess("Deaeration", "oxidative stability and fresher flavor retention", "removing dissolved oxygen limits browning and aroma loss"),
  Browning: juiceSensory("Browning", "oxidation damage or heat stress in the product", "the term matters because color shift often warns of flavor decline"),
  Ascorbate: juiceProcess("Ascorbate", "protecting color and limiting oxidation", "ascorbic additions are often used as an antioxidant tool"),
  Citric: juiceProcess("Citric", "sharpening the acid line in fruit beverages", "the term is useful when final brightness needs to be adjusted predictably"),
  Tartaric: juiceProcess("Tartaric", "firmer, wine-like acid structure in certain blends", "it is used when a sharper and more persistent acid backbone is wanted"),
  Turbidity: juiceSensory("Turbidity", "the amount of suspended matter in the juice", "it helps QA teams decide whether the product looks intentionally rustic or poorly settled"),
  Sedimentation: juiceProcess("Sedimentation", "how solids fall out during holding or distribution", "the term matters because visible separation can hurt consumer trust"),
  Retort: juiceProcess("Retort", "thermal preservation in sealed packages", "that heat step secures shelf life but can also flatten fresh fruit notes"),
  Chiller: juiceProcess("Chiller", "bringing juice down to a stable storage temperature quickly", "fast cooling protects aroma and slows spoilage"),
  Conveyor: juiceProcess("Conveyor", "line efficiency and gentle package handling", "even simple movement systems matter when throughput and damage control are on the line"),
  Mouthfeel: juiceSensory("Mouthfeel", "how weight, texture, and smoothness register on the palate", "buyers often decide repeat purchase on feel as much as flavor"),
  Flavor: juiceSensory("Flavor", "the overall taste identity of the juice", "the term lets teams discuss whether fruit character tastes fresh, cooked, dilute, or balanced"),
  Color: juiceSensory("Color", "visual ripeness, style, and processing impact", "customers judge quality long before the first sip"),
  Hue: juiceSensory("Hue", "the shade and tonal direction of the juice", "small hue shifts can reveal oxidation, dilution, or fruit variety differences"),
  Pomace: juiceProcess("Pomace", "what remains after extraction and whether more value can be recovered", "the term matters in yield calculations and by-product planning"),
  Coldpress: juiceProcess("Coldpress", "a fresh, minimally heated positioning", "the style is sold on cleaner flavor and premium wellness appeal"),
  Juiciness: juiceSensory("Juiciness", "how vividly a beverage evokes ripe, fresh fruit", "the word is useful in sales because it points to immediacy and drinkability"),
  Ripening: juiceProcess("Ripening", "harvest timing and sugar-acid balance before processing", "fruit picked at the wrong stage never fully recovers in the tank"),
  Storage: juiceProcess("Storage", "how temperature and time preserve or erode freshness", "good storage is one of the cheapest quality protections in the business"),
  Labeling: juiceProcess("Labeling", "how the product is legally and commercially presented", "claims about juice content, sweeteners, or processing must match the package"),
  Distribution: juiceProcess("Distribution", "how the product survives the route to market", "cold chain, handling, and shelf rotation all influence the final drink"),
  Refreshment: juiceSensory("Refreshment", "the drink's ability to quench and invite another sip", "it is a useful sales term because balance matters more than sheer sweetness"),
  Casein: milkProcess("Casein", "body, whiteness, and curd formation", "casein is the key milk protein in cheese and many dairy textures"),
  Lactose: milkProcess("Lactose", "natural sweetness and fermentation potential", "milk sugar affects both flavor and digestibility"),
  Lactase: milkProcess("Lactase", "making milk easier to tolerate and slightly sweeter", "the enzyme splits lactose into simpler sugars"),
  Whey: milkProcess("Whey", "the liquid fraction left after curd formation", "its composition matters for cheese yield, beverages, and powders"),
  Curd: milkProcess("Curd", "the solid phase that becomes cheese or strained dairy", "managing curd texture decides moisture and final style"),
  Creamline: milkProcess("Creamline", "a non-homogenized look that signals richness and minimal processing", "the rise of fat to the top changes both appearance and marketing story"),
  Homogenization: milkProcess("Homogenization", "fat distribution and visual uniformity", "breaking fat globules keeps cream from separating"),
  Uht: milkProcess("Uht", "long shelf life without refrigeration before opening", "ultra-high-temperature treatment trades some fresh flavor for convenience"),
  Skimming: milkProcess("Skimming", "reducing fat level and changing texture", "removing cream shifts both nutrition and sensory weight"),
  Rennet: milkProcess("Rennet", "controlled coagulation in cheesemaking", "it triggers a cleaner curd set than uncontrolled souring"),
  Coagulation: milkProcess("Coagulation", "the moment liquid milk turns into a structured gel", "that transition is fundamental in cheese and cultured dairy"),
  Curdling: milkProcess("Curdling", "an unwanted split or an intended transformation depending on context", "the term helps separate technique from spoilage"),
  Churning: milkProcess("Churning", "turning cream into butter by disrupting the emulsion", "the process decides grain, buttermilk release, and final texture"),
  Culturing: milkProcess("Culturing", "using live microbes to acidify and flavor dairy", "it drives yogurt, kefir, and many fermented milk styles"),
  Probiotic: milkProcess("Probiotic", "live-culture positioning and gut-health marketing", "the term matters only when the product is built around viable strains"),
  Thermization: milkProcess("Thermization", "milder heat treatment before further processing", "it lowers microbial load without fully pasteurizing the milk"),
  Ultraheat: milkProcess("Ultraheat", "extreme heat processing for shelf stability", "the term helps explain cooked notes and extended storage life"),
  Microfiltration: milkProcess("Microfiltration", "removing microbes and particles with less heat impact", "it can extend shelf life while keeping a fresher profile"),
  Separation: milkProcess("Separation", "splitting cream from skim for later standardization", "controlling fat streams is basic dairy plant practice"),
  Creaming: milkProcess("Creaming", "the natural rise of fat in non-homogenized milk", "it changes both mouthfeel and visual expectation"),
  Lipolysis: milkProcess("Lipolysis", "fat breakdown and the development of sharp dairy notes", "too much can taste rancid, but controlled levels add character in some products"),
  Proteolysis: milkProcess("Proteolysis", "protein breakdown during ripening or fermentation", "it softens texture and builds savory depth"),
  Gelation: milkProcess("Gelation", "the setting of yogurt, custard, or other dairy structures", "the final texture depends on how the protein network forms"),
  Syneresis: milkProcess("Syneresis", "whey leakage from a gelled dairy product", "it is a critical fault call when yogurt or curd starts to weep"),
  Lactation: milkSource("Lactation", "seasonal yield and compositional shifts", "stage of lactation changes fat, protein, and milk volume"),
  Colostrum: milkSource("Colostrum", "the first milk after birth and its unusual richness", "it is nutritionally different and not treated like standard market milk"),
  Mastitis: milkSource("Mastitis", "animal health, somatic cell counts, and flavor risk", "udder infection directly affects quality and farm economics"),
  Caseinate: milkProcess("Caseinate", "using milk protein as a functional ingredient", "processors rely on it for emulsification and added body"),
  Buttermilk: milkProcess("Buttermilk", "either a cultured drink or the liquid left from butter making", "the term affects both recipe design and label language"),
  Kefir: milkProcess("Kefir", "a cultured dairy drink with lively acidity and slight effervescence", "it is used when the goal is a more dynamic fermented profile than yogurt"),
  Yogurt: milkProcess("Yogurt", "set or stirred cultured milk with clear acid freshness", "the term frames texture, live culture use, and market expectation"),
  Laban: milkProcess("Laban", "a savory, drinkable cultured milk style", "it helps position dairy beyond sweet yogurt formats"),
  Holstein: milkSource("Holstein", "high-volume milk supply with moderate fat", "breed choice affects both economics and composition"),
  Jersey: milkSource("Jersey", "richer fat and protein concentration", "the breed is often cited when a creamier dairy profile is desired"),
  Guernsey: milkSource("Guernsey", "golden milk color and generous richness", "its breed identity supports premium dairy storytelling"),
  Buffalo: milkSource("Buffalo", "dense milk suited to mozzarella and rich cultured products", "higher solids change both yield and texture"),
  Caprine: milkSource("Caprine", "goat-milk identity and a lighter fat structure", "the term is used when species character matters to flavor or digestibility"),
  Ovine: milkSource("Ovine", "sheep-milk richness and high cheese yield", "its solids concentration changes texture and value"),
  Bovine: milkSource("Bovine", "standard cow-milk supply in most commercial dairy systems", "the term is useful when species must be stated precisely"),
  Silage: milkSource("Silage", "feed-derived aromas that can carry into the milk", "ration style affects sensory quality and seasonality"),
  Feedlot: milkSource("Feedlot", "intensive production economics and feed consistency", "the management system helps explain cost and compositional uniformity"),
  Milkshed: milkSource("Milkshed", "the geographic supply zone feeding a plant or brand", "origin logistics and local identity both depend on it"),
  Foaming: milkProcess("Foaming", "how milk behaves for cappuccino and latte service", "protein and fat balance determine bubble stability"),
  Texturization: milkProcess("Texturization", "steaming milk to the right gloss and density", "bar service depends on controlled microfoam rather than random bubbles"),
  Pasteurizer: milkProcess("Pasteurizer", "the equipment step that makes milk safer for sale", "time and temperature choices shape both safety and flavor retention"),
  Aquifer: waterSource("Aquifer", "source consistency and mineral identity", "underground geology often defines the water long before bottling"),
  Alkalinity: waterChem("Alkalinity", "buffering capacity and how resistant the water is to pH change", "it influences taste, extraction, and how a water handles acid in coffee or food pairing"),
  Hardness: waterChem("Hardness", "scale risk and the grip of calcium and magnesium on the palate", "hard water behaves differently in both equipment and extraction"),
  Softness: waterChem("Softness", "a gentler mouthfeel and lower mineral load", "the term helps explain why some waters taste round but extract lightly"),
  Mineralization: waterChem("Mineralization", "overall dissolved-mineral intensity and texture", "it is a core driver of both flavor and premium positioning"),
  Conductivity: waterChem("Conductivity", "how much dissolved ionic material the water contains", "higher conductivity usually signals a more mineralized water"),
  Bicarbonate: waterChem("Bicarbonate", "buffering power and chalky structure", "it is one of the key ions behind alkalinity"),
  Calcium: waterChem("Calcium", "hardness, structure, and extraction support", "calcium can improve brewing performance but also build scale"),
  Magnesium: waterChem("Magnesium", "hardness with a sharper effect on flavor extraction", "it is prized in many coffee water recipes for lifting perceived clarity"),
  Sodium: waterChem("Sodium", "saline roundness and palate width", "in balance it can soften the impression of acidity, but too much tastes flat or salty"),
  Potassium: waterChem("Potassium", "minor mineral contribution and subtle palate softness", "the term matters when full ionic balance is being discussed rather than headline minerals alone"),
  Sulfate: waterChem("Sulfate", "a drier, more assertive mineral impression", "higher sulfate can make water feel firmer and more bitter"),
  Chloride: waterChem("Chloride", "fullness and a softer round texture at moderate levels", "too much can damage equipment and muddy flavor"),
  Silica: waterChem("Silica", "a smooth, polished texture often noted in premium still waters", "it is a talking point when mouthfeel rather than hardness drives the style"),
  Fluoride: waterChem("Fluoride", "regulatory and health discussion more than broad sensory style", "its presence is tracked closely in many municipal and packaged waters"),
  Nitrate: waterChem("Nitrate", "source vulnerability and compliance risk", "elevated nitrate points to contamination pressure from agriculture or waste"),
  Nitrite: waterChem("Nitrite", "an immediate safety concern in water analysis", "it is watched closely because acceptable levels are very low"),
  Arsenic: waterChem("Arsenic", "whether a source is safe and legally saleable", "trace toxic metals turn a geology story into a compliance issue"),
  Manganese: waterChem("Manganese", "metallic notes, staining, and technical treatment needs", "even moderate levels can hurt both appearance and taste"),
  Iron: waterChem("Iron", "rusty flavor, discoloration, and source treatment decisions", "the term matters whenever water tastes metallic or leaves deposits"),
  Potability: waterTreatment("Potability", "whether the water is fit for human consumption", "all source romance is secondary if the water does not meet safety standards"),
  Disinfection: waterTreatment("Disinfection", "microbial safety before bottling or service", "the purpose is to control pathogens without destroying drinkability"),
  Chlorination: waterTreatment("Chlorination", "residual protection in treated water", "chlorine is effective, but it has to be controlled to avoid medicinal flavor"),
  Ozonation: waterTreatment("Ozonation", "clean microbial control with little residual taste", "ozone works fast and then dissipates"),
  Ultraviolet: waterTreatment("Ultraviolet", "microbial reduction without adding a chemical residue", "UV is useful when producers want clean treatment and neutral flavor impact"),
  Membrane: waterTreatment("Membrane", "precision filtration such as reverse osmosis", "membrane systems let operators strip out unwanted dissolved material"),
  Remineralization: waterTreatment("Remineralization", "restoring balance after aggressive filtration", "water stripped too clean often tastes hollow until minerals are put back"),
  Sparkling: waterTreatment("Sparkling", "carbonation level, bubble texture, and pairing energy", "the presence of dissolved CO2 changes both palate lift and service occasion"),
  Stillwater: waterTreatment("Stillwater", "a quiet texture without carbonation", "the term helps contrast source and mineral style without bubble interference"),
  Springwater: waterSource("Springwater", "natural emergence and premium origin storytelling", "the legal and marketing value rests on water rising from an underground source"),
  Glacial: waterSource("Glacial", "cold-origin purity cues and very clean branding", "the term is often used when source image matters as much as chemistry"),
  Artesian: waterSource("Artesian", "confined-source pressure and distinctive provenance", "a naturally pressurized source can support both quality narrative and technical distinction"),
  Groundwater: waterSource("Groundwater", "subsurface sourcing and mineral pickup from geology", "many packaged waters are defined more by underground travel than by surface conditions"),
  Watershed: waterSource("Watershed", "the broader landscape feeding a source", "what happens across the drainage area shapes long-term quality risk"),
  Catchment: waterSource("Catchment", "where source water is collected and protected", "good catchment management keeps contamination risk low"),
  Runoff: waterSource("Runoff", "how quickly contaminants or sediments can reach a source", "the term matters in both environmental review and source protection"),
  Recharge: waterSource("Recharge", "how an aquifer is naturally replenished", "recharge rate affects sustainability and extraction planning"),
  Hydrology: waterSource("Hydrology", "how water moves through a region and into supply", "understanding flow patterns supports source planning and risk management"),
  Hydrogeology: waterSource("Hydrogeology", "the relationship between rock structure and groundwater behavior", "the term explains why one source is stable, mineral, or vulnerable"),
  Desalination: waterTreatment("Desalination", "turning saline feed water into usable drinking water", "the process opens supply options where fresh water is scarce"),
  Brackish: waterChem("Brackish", "water that sits between fresh and fully saline", "the term matters because moderate salt content changes both treatment needs and taste"),
  Salinity: waterChem("Salinity", "the total salt impression and treatment burden", "higher salinity changes palatability, pairing, and process requirements"),
  Palatability: waterTreatment("Palatability", "whether the water is actually pleasant to drink", "legal safety alone does not guarantee guest approval"),
  Purity: waterTreatment("Purity", "a clean, fault-free impression in the glass", "in trade language it is useful only when backed by analysis rather than vague marketing"),
};

const missing = rows.filter((row) => !texts[row.term]);
if (missing.length) {
  console.error("Missing terms:", missing.map((row) => row.term).join(", "));
  process.exit(1);
}

const lines = [];
lines.push("-- Original editorial rewrites for terminology_entries.how_to_apply");
lines.push(`-- Scope: coffee, kombucha, juice, milk, and water from ${sourceTitle}`);
lines.push("begin;");

for (const row of rows) {
  lines.push("");
  lines.push("update public.terminology_entries");
  lines.push(`set how_to_apply = $txt$${texts[row.term]}$txt$`);
  lines.push(`where term = '${row.term.replace(/'/g, "''")}'`);
  lines.push(`  and beverage_type = '${row.beverage_type}'`);
  lines.push(`  and source_title = '${sourceTitle}';`);
}

lines.push("");
lines.push("commit;");
fs.writeFileSync("output/how_to_apply_misc.sql", lines.join("\n"));
console.log(`Wrote ${rows.length} updates to output/how_to_apply_misc.sql`);
