import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const energyArtwork = (
  filename: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/energy-drinks/${filename}-1600.webp`,
  srcSet: `/beyond-the-glass/energy-drinks/${filename}-960.webp 960w, /beyond-the-glass/energy-drinks/${filename}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/energy-drinks/${filename}-portrait-960.webp`,
  portraitSrcSet: `/beyond-the-glass/energy-drinks/${filename}-portrait-640.webp 640w, /beyond-the-glass/energy-drinks/${filename}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

type EnergySceneSeed = Omit<BeyondTheGlassScene, "number" | "range">;

const energySceneSeeds: EnergySceneSeed[] = [
  {
    id: "energy-systems-conservatory",
    title: "Enter the Energy Systems Conservatory",
    eyebrow: "SIP Academy · Energy Drinks",
    summary:
      "Caffeine, water, flavor, formulation, process, package, regulation, and personal context connect inside one evidence-first beverage system.",
    checkpoint: "Signal to system",
    motion: "establish",
    artwork: energyArtwork(
      "academy-gate",
      "Adult guides Sippy and Roma and the ivory robot Hummin approach a sunrise brass-and-glass Energy Systems Conservatory surrounded by water, botanical, formulation, and package study stations."
    ),
    landmark: { label: "Energy Systems Conservatory", x: 50, y: 35 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Category",
        title: "Energy drink is a market name, not one universal formula",
        detail:
          "Products vary in caffeine, container size, sugar, acids, vitamins, botanicals, carbonation, and legal identity. The package and jurisdiction define the actual product."
      },
      {
        eyebrow: "Purpose",
        title: "Alertness is not the same as hydration or nutrition",
        detail:
          "A useful review separates the intended occasion from claims about fluid replacement, sports performance, nourishment, or general wellness."
      },
      {
        eyebrow: "System",
        title: "The finished drink matters more than one famous ingredient",
        detail:
          "Amount, serving, matrix, process, storage, other caffeine sources, and individual sensitivity shape the real experience."
      },
      {
        eyebrow: "Safety",
        title: "Caffeine guidance is context, not a consumption target",
        detail:
          "Age, pregnancy, medications, health conditions, timing, body size, tolerance, and sensitivity can change what is appropriate for a person."
      },
      {
        eyebrow: "Route",
        title: "Origin → dose → process → package → choice",
        detail:
          "This trip follows caffeine and supporting ingredients through formulation, quality, labeling, distribution, sensory evaluation, and informed use."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Welcome to the Energy Systems Conservatory. We will trace the whole drink without turning a marketing promise into a medical claim."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "I will keep source, amount, serving, process, regulation, timing, and uncertainty connected."
      }
    ]
  },
  {
    id: "energy-category-crossroads",
    title: "Choose the Right Beverage Map",
    eyebrow: "Category crossroads · Similar packages, different purposes",
    summary:
      "Energy drinks, sports drinks, hydration products, coffee, tea, soft drinks, and concentrated shots can overlap in appearance without being interchangeable.",
    checkpoint: "Name the use",
    motion: "glide",
    artwork: energyArtwork(
      "category-crossroads",
      "Adult beverage students and Hummin compare unlabeled water, coffee, tea, hydration, and energy-style drinks in a luminous brass-and-glass category conservatory."
    ),
    landmark: { label: "Category compass", x: 50, y: 60 },
    drop: { x: 50, y: 68, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Energy",
        title: "Energy drinks are usually caffeine-centered formulations",
        detail:
          "They may also contain sugar, acids, flavors, vitamins, amino acids, or botanicals, but no single supporting ingredient defines every product."
      },
      {
        eyebrow: "Sports",
        title: "Sports drinks are designed around fluid and fuel context",
        detail:
          "Water, carbohydrate, and electrolytes may support specific prolonged or intense activity contexts. That is a different design question from stimulant delivery."
      },
      {
        eyebrow: "Hydration",
        title: "Hydration does not require caffeine",
        detail:
          "Water remains the fluid foundation. Electrolyte needs vary with diet, duration, environment, sweat loss, and individual circumstances."
      },
      {
        eyebrow: "Coffee and tea",
        title: "Traditional beverages can also contribute caffeine",
        detail:
          "Brew method, leaf or bean, serving size, and preparation change caffeine content. Total exposure includes every source, not only energy drinks."
      },
      {
        eyebrow: "Shots",
        title: "Small volume can still carry a concentrated serving",
        detail:
          "Package size is not a reliable proxy for caffeine amount. Read the product identity, serving information, and caffeine declaration where provided."
      },
      {
        eyebrow: "Student cue",
        title: "Match the product to the question",
        detail:
          "Are you examining alertness, hydration, flavor, calories, nutrients, convenience, or a label claim? Start there before comparing cans."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "The packages may rhyme, but their purposes do not. First name the job you expect the beverage to do."
      }
    ]
  },
  {
    id: "energy-product-identity",
    title: "Read the Product Before the Promise",
    eyebrow: "Identity · Food, supplement, and jurisdiction",
    summary:
      "The same front-of-pack style can sit on products governed by different rules, declarations, cautions, and claim frameworks.",
    checkpoint: "Package to category",
    motion: "orbit",
    artwork: energyArtwork(
      "evidence-safety",
      "An evidence and safety observatory compares plain cans, cups, bottles, ingredient records, regulatory pathways, and adult-use contexts without promotional branding."
    ),
    landmark: { label: "Identity archive", x: 51, y: 34 },
    drop: { x: 50, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "United States",
        title: "An energy product may be a conventional food or dietary supplement",
        detail:
          "The statement of identity and the Nutrition Facts or Supplement Facts presentation help reveal which framework the marketer is using."
      },
      {
        eyebrow: "Jurisdiction",
        title: "The same formula can meet different rules in different markets",
        detail:
          "Permitted ingredients, maximum amounts, warnings, caffeine declarations, and claims vary. Never export one country’s rule as a universal standard."
      },
      {
        eyebrow: "Serving",
        title: "Container and serving are not always the same unit",
        detail:
          "Check servings per container before calculating caffeine, sugars, calories, vitamins, or other ingredients for the amount actually consumed."
      },
      {
        eyebrow: "Ingredients",
        title: "Caffeine can arrive through more than one listed ingredient",
        detail:
          "Added caffeine and caffeine-containing botanicals can contribute to the same total. A botanical name does not make its caffeine invisible."
      },
      {
        eyebrow: "Claims",
        title: "A lawful claim still needs truthful support",
        detail:
          "Composition, nutrient-content, structure/function, and disease claims are not interchangeable. Product category and exact wording matter."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Before I compare formulas, I identify the legal product, market, serving unit, ingredient list, declarations, and claim type."
      }
    ]
  },
  {
    id: "energy-caffeine-origins",
    title: "Follow Caffeine to Its Sources",
    eyebrow: "Caffeine · Plant, ingredient, and total exposure",
    summary:
      "Coffee, tea, guarana, yerba mate, kola, cacao, and added caffeine can all contribute to one day’s total.",
    checkpoint: "Source to molecule",
    motion: "orbit",
    artwork: energyArtwork(
      "caffeine-origins",
      "A luminous caffeine molecule stands among protected coffee, tea, guarana, mate, kola, cacao, and purified ingredient specimens inside a brass botanical laboratory."
    ),
    landmark: { label: "Caffeine molecule", x: 50, y: 38 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Plant sources",
        title: "Caffeine occurs naturally in several botanicals",
        detail:
          "Coffee and tea are familiar examples; guarana, yerba mate, kola nut, and cacao can also contribute caffeine in different preparations and amounts."
      },
      {
        eyebrow: "Added caffeine",
        title: "Purified caffeine may be added directly",
        detail:
          "The finished product needs an accurate total regardless of whether the molecule began in a plant stream or another permitted source."
      },
      {
        eyebrow: "FDA context",
        title: "The body does not assign a safety halo to ‘natural’ caffeine",
        detail:
          "FDA notes no difference in how the body handles naturally occurring and added caffeine. Source storytelling does not replace exposure math."
      },
      {
        eyebrow: "Botanical variability",
        title: "Plant material is not automatically standardized",
        detail:
          "Species, plant part, geography, harvest, extraction, and lot can change composition. Ingredient specifications help control that variability."
      },
      {
        eyebrow: "Total",
        title: "Count caffeine from every contributing ingredient",
        detail:
          "Coffee, tea, chocolate, energy products, supplements, foods, and some medicines can share the same day. A single-can view can miss the larger total."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Caffeine has many doorways into the formula. We will keep the origin story separate from the amount that reaches the serving."
      }
    ]
  },
  {
    id: "energy-caffeine-extraction",
    title: "Separate, Purify, Specify",
    eyebrow: "Ingredient making · Extraction is not the final dose",
    summary:
      "Extraction and purification turn variable raw material into an ingredient that still needs identity, purity, strength, and lot control.",
    checkpoint: "Botanical to specification",
    motion: "cutaway",
    artwork: energyArtwork(
      "caffeine-origins",
      "Botanical caffeine sources, extraction vessels, purification columns, crystal specimens, and an identity archive surround a central caffeine model in a brass-and-glass laboratory."
    ),
    landmark: { label: "Purification column", x: 50, y: 50 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Extraction",
        title: "A process first moves soluble material out of a source",
        detail:
          "Water, temperature, pressure, time, particle size, and other process choices affect what leaves the plant along with the target compound."
      },
      {
        eyebrow: "Purification",
        title: "Isolation narrows the composition",
        detail:
          "Filtration, adsorption, crystallization, and other food-ingredient operations can separate caffeine from companion material. The exact commercial route varies."
      },
      {
        eyebrow: "Origin",
        title: "A label term may not reveal the manufacturing route",
        detail:
          "Do not infer botanical origin, extraction method, or sustainability from the word caffeine alone; rely on supplier documentation and traceability."
      },
      {
        eyebrow: "Specification",
        title: "Identity and purity belong to every lot",
        detail:
          "A fit-for-purpose specification can address assay, impurities, microbiology, moisture, physical form, packaging, storage, and approved use."
      },
      {
        eyebrow: "Handoff",
        title: "Ingredient strength must enter the formulation calculation",
        detail:
          "The formulator converts assay and batch size into a controlled addition, then verifies the finished beverage rather than trusting the weigh-up alone."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Extraction creates a stream. Purification and specification create a controlled ingredient. Finished-product testing closes the loop."
      }
    ]
  },
  {
    id: "energy-serving-math",
    title: "Do the Serving Math",
    eyebrow: "Exposure · Milligrams need a denominator",
    summary:
      "Caffeine per serving becomes meaningful only after servings per container, containers consumed, other sources, and time are included.",
    checkpoint: "Serving to total",
    motion: "rotate",
    artwork: energyArtwork(
      "serving-exposure",
      "A central plain can connects to cup and can sizes, divided serving vessels, a timing dial, coffee and tea specimens, and repeated containers in a brass exposure observatory."
    ),
    landmark: { label: "Exposure table", x: 50, y: 51 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Unit",
        title: "Start with milligrams per declared serving",
        detail:
          "A number without its serving basis cannot be compared responsibly. Confirm whether the declaration applies to a portion or the whole container."
      },
      {
        eyebrow: "Container",
        title: "Multiply by servings actually consumed",
        detail:
          "Milligrams per serving × servings per container × fraction of the container consumed gives the product contribution."
      },
      {
        eyebrow: "Stacking",
        title: "Add every caffeinated food, drink, and supplement",
        detail:
          "Coffee, tea, soda, chocolate, energy products, pre-workout products, and some medicines can accumulate across the same day."
      },
      {
        eyebrow: "Comparison",
        title: "Container size does not predict caffeine concentration",
        detail:
          "A small shot can be concentrated; a large can can contain multiple servings. Compare amount, volume, and actual use together."
      },
      {
        eyebrow: "Guidance",
        title: "A population reference is not a personal prescription",
        detail:
          "FDA cites 400 mg per day as an amount not generally associated with negative effects for most adults, while emphasizing wide individual variation."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "My calculation is simple: amount per serving, servings used, every other source, and the time window in which they meet."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "A taller can can feel gentler and still contain more. The label—not the silhouette—holds the useful clue."
      }
    ]
  },
  {
    id: "energy-timing-sensitivity",
    title: "Timing Changes the Experience",
    eyebrow: "Human context · Sensitivity is real",
    summary:
      "The same serving can feel different across people and occasions because timing, sleep, pregnancy, medications, conditions, and sensitivity matter.",
    checkpoint: "Dose to person",
    motion: "glide",
    artwork: energyArtwork(
      "serving-exposure",
      "An unlabeled caffeine serving sits beneath a timing arc with adult-use contexts, other caffeine sources, repeated containers, and an evidence desk in a dark teal observatory."
    ),
    landmark: { label: "Timing dial", x: 71, y: 28 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Timing",
        title: "Caffeine close to bedtime can affect sleep",
        detail:
          "EFSA notes that even a single 100 mg dose may affect sleep duration and patterns in some adults, especially when consumed near bedtime."
      },
      {
        eyebrow: "Sensitivity",
        title: "People absorb and clear caffeine differently",
        detail:
          "Genetics, habitual use, body size, health context, and other factors can change onset, intensity, duration, and unwanted effects."
      },
      {
        eyebrow: "Life stage",
        title: "Pregnancy and breastfeeding need specific guidance",
        detail:
          "Official recommendations differ by jurisdiction and circumstance. A health professional can help interpret total caffeine from all sources."
      },
      {
        eyebrow: "Young people",
        title: "Energy drinks are not recommended for children and teens",
        detail:
          "FDA and CDC summarize expert guidance against energy drinks for these groups. Water and age-appropriate beverages remain the safer default."
      },
      {
        eyebrow: "Medicines and conditions",
        title: "General population guidance does not cover every person",
        detail:
          "Some conditions and medicines can alter sensitivity or risk. Questions about suitability belong with a qualified health professional."
      },
      {
        eyebrow: "Alcohol",
        title: "Caffeine does not reverse alcohol impairment",
        detail:
          "CDC warns that combining alcohol and caffeine can encourage more drinking and risk while leaving alcohol’s effects on the body unchanged."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "A caffeine number belongs beside a clock, a person, their other sources, and the option to choose something else."
      }
    ]
  },
  {
    id: "energy-water-foundation",
    title: "Build on the Water",
    eyebrow: "Foundation · Source, treatment, and verification",
    summary:
      "Water makes most of the beverage and carries every dissolved, suspended, flavored, and carbonated choice that follows.",
    checkpoint: "Source to process water",
    motion: "cutaway",
    artwork: energyArtwork(
      "water-foundation",
      "A central clear-water reservoir connects to source, carbon filtration, membrane, mineral adjustment, ultraviolet, and finished-water verification stations in a brass academy gallery."
    ),
    landmark: { label: "Finished-water reservoir", x: 50, y: 41 },
    drop: { x: 50, y: 66, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Source",
        title: "Raw water starts with a specific profile",
        detail:
          "Minerals, alkalinity, organic matter, disinfectant residuals, and microbiological quality can affect flavor, cleaning, stability, and treatment design."
      },
      {
        eyebrow: "Treatment",
        title: "Every treatment should solve a named problem",
        detail:
          "Filtration, activated carbon, softening, membranes, ultraviolet treatment, or other steps are selected and validated for the source and intended use."
      },
      {
        eyebrow: "Minerals",
        title: "Low mineral content is not automatically ideal",
        detail:
          "Mineral balance can influence taste, buffering, corrosion, ingredient behavior, and process performance. The desired profile is formulation-specific."
      },
      {
        eyebrow: "Microbiology",
        title: "Water safety continues through the plant",
        detail:
          "Storage, distribution loops, dead legs, filters, hoses, and sampling points need hygienic design, monitoring, and maintenance."
      },
      {
        eyebrow: "Verification",
        title: "A clear appearance is not a complete specification",
        detail:
          "Chemical, physical, microbiological, and sensory checks answer different questions about process water."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Before caffeine enters, the water already carries a source history, treatment plan, sensory profile, and verification record."
      }
    ]
  },
  {
    id: "energy-sweetener-architecture",
    title: "Design the Sweetness",
    eyebrow: "Sweeteners · Calories, intensity, and balance",
    summary:
      "Sugar and non-sugar sweeteners can shape energy, texture, bitterness, acidity, finish, labeling, and the place of the drink in the overall diet.",
    checkpoint: "Sweetness to structure",
    motion: "orbit",
    artwork: energyArtwork(
      "flavor-architecture",
      "A central carbonated drink receives separate streams of water, sugar crystals, high-intensity sweetener droplets, citrus acidity, bitter botanicals, aroma vapor, and color in a sensory theater."
    ),
    landmark: { label: "Sweetness station", x: 34, y: 65 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Sugars",
        title: "Sugars contribute carbohydrate energy and sensory weight",
        detail:
          "Sucrose, glucose, fructose, syrups, and juice-derived sugars differ in composition but all need honest total and added-sugar context where applicable."
      },
      {
        eyebrow: "Non-sugar sweeteners",
        title: "Lower sugar does not make the rest of the formula disappear",
        detail:
          "Caffeine, acids, flavors, serving size, and individual context still need evaluation even when caloric sweeteners are reduced or absent."
      },
      {
        eyebrow: "Balance",
        title: "Sweetness can soften bitterness and acidity",
        detail:
          "Changing one sweetener can alter temporal profile, aftertaste, aroma release, carbonation perception, and the amount of flavor needed."
      },
      {
        eyebrow: "Measurement",
        title: "Brix-like readings do not identify every dissolved solid",
        detail:
          "Instrument readings are useful process tools, but formulas with acids, salts, vitamins, and high-intensity sweeteners need method-aware interpretation."
      },
      {
        eyebrow: "Diet",
        title: "One beverage belongs inside the whole dietary pattern",
        detail:
          "WHO advises limiting free sugars. Nutrition Facts and serving information help place a product within total intake rather than judging by flavor alone."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Sweetness is not just a number. It changes bitterness, acidity, aroma, bubbles, texture, and what remains after the swallow."
      }
    ]
  },
  {
    id: "energy-acid-flavor-color",
    title: "Tune the Sensory Signal",
    eyebrow: "Acid, flavor, color · Identity without efficacy",
    summary:
      "Acids, aromas, bitterness, color, and carbonation create recognition and refreshment but do not prove a functional benefit.",
    checkpoint: "Signal to sensation",
    motion: "rotate",
    artwork: energyArtwork(
      "flavor-architecture",
      "Citrus, berry pigment, botanical aroma, acid crystals, bitter leaves, clear bubbles, and a central unlabeled drink form a balanced radial flavor system in a dark teal academy theater."
    ),
    landmark: { label: "Flavor convergence", x: 50, y: 48 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Acid",
        title: "Titratable acidity and pH answer different questions",
        detail:
          "One describes total acid neutralization capacity; the other describes hydrogen-ion activity. Both can matter for flavor, process, preservation, and ingredient behavior."
      },
      {
        eyebrow: "Flavor",
        title: "Aroma can lead perception before taste begins",
        detail:
          "Citrus, berry, tropical, herbal, and other profiles can mask caffeine bitterness or make acidity feel brighter, but they do not change the caffeine amount."
      },
      {
        eyebrow: "Color",
        title: "Color is an ingredient and identity choice—not evidence",
        detail:
          "Permitted uses and declarations vary by additive and market. Natural origin does not remove the need for lawful use, stability, and accurate labeling."
      },
      {
        eyebrow: "Stability",
        title: "Light, oxygen, pH, and time can shift the sensory profile",
        detail:
          "Color fade, aroma loss, oxidation, haze, and flavor scalping can appear even when the product remains sealed."
      },
      {
        eyebrow: "Sensory control",
        title: "A reference sample makes drift easier to detect",
        detail:
          "Trained comparison across batches and shelf life can reveal changes that a single isolated tasting might miss."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Bright color and sharp citrus can make a drink feel fast. Our job is to enjoy the cue without confusing it with proof."
      }
    ]
  },
  {
    id: "energy-vitamins-minerals",
    title: "Put Vitamins in Context",
    eyebrow: "Micronutrients · Presence, need, and total intake",
    summary:
      "B vitamins and minerals participate in normal metabolism, but their presence in a can does not guarantee an immediate feeling or added benefit for every person.",
    checkpoint: "Nutrient to evidence",
    motion: "orbit",
    artwork: energyArtwork(
      "nutrient-evidence",
      "Crystalline vitamins, mineral salts, molecular forms, botanical specimens, carbohydrate substrate, and human evidence orbit a central unlabeled beverage and uncertainty prism."
    ),
    landmark: { label: "Composition ring", x: 38, y: 48 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Metabolism",
        title: "B vitamins help normal pathways; they are not stimulant molecules",
        detail:
          "They participate in processes that release and use energy from food, but adding more does not automatically create extra energy or alertness."
      },
      {
        eyebrow: "Need",
        title: "Benefit depends partly on nutritional status",
        detail:
          "Correcting inadequate intake is different from adding a large amount for someone already meeting needs. The finished product should not imply universal deficiency."
      },
      {
        eyebrow: "Amount",
        title: "Percent Daily Value is context, not a performance score",
        detail:
          "It helps compare nutrient contribution per serving. A higher percentage is not automatically a better beverage for every person."
      },
      {
        eyebrow: "Form and stability",
        title: "Chemical form and storage can affect the declared amount",
        detail:
          "Solubility, light, oxygen, pH, heat, package, and time can influence vitamin stability and the overage needed to meet label through shelf life."
      },
      {
        eyebrow: "Total exposure",
        title: "Foods, fortified drinks, and supplements can overlap",
        detail:
          "Upper-limit and interaction context differs by nutrient, age, and life stage. More than one product can contribute to the same total."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "A vitamin can be important without turning the beverage into instant energy. Need, amount, form, and the whole diet stay in view."
      }
    ]
  },
  {
    id: "energy-functional-ingredients",
    title: "Cross the Evidence Bridge",
    eyebrow: "Functional ingredients · One formula, separate questions",
    summary:
      "Taurine, amino acids, glucuronolactone, botanicals, and other additions need ingredient-specific identity, dose, evidence, interaction, and jurisdiction review.",
    checkpoint: "Ingredient to substantiation",
    motion: "reassemble",
    artwork: energyArtwork(
      "nutrient-evidence",
      "Ingredient composition stations and a separate human-evidence ring connect through an uncertainty prism inside a brass-and-glass research gallery."
    ),
    landmark: { label: "Evidence ring", x: 61, y: 48 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Identity",
        title: "A familiar name can hide different forms and specifications",
        detail:
          "Chemical form, botanical species and part, extraction, purity, carrier, particle size, and lot consistency can change the ingredient being studied."
      },
      {
        eyebrow: "Dose",
        title: "Evidence at one amount does not transfer automatically",
        detail:
          "Compare the studied amount, serving pattern, population, and duration with the finished beverage rather than citing the ingredient name alone."
      },
      {
        eyebrow: "Product",
        title: "A single-ingredient study is not a multi-ingredient result",
        detail:
          "Caffeine, sugar, other actives, sensory expectations, and product use can complicate attribution. Finished-product evidence is stronger for finished-product claims."
      },
      {
        eyebrow: "Safety",
        title: "Interactions and combined exposure deserve their own review",
        detail:
          "Natural origin does not guarantee compatibility with medicines, conditions, pregnancy, or other supplements."
      },
      {
        eyebrow: "Uncertainty",
        title: "Mixed or limited evidence should remain visible",
        detail:
          "An honest field note can distinguish plausible mechanism, laboratory findings, observational data, human trials, and unresolved questions."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 10,
        text:
          "I do not let one ingredient borrow evidence from another. Identity, amount, population, product, and uncertainty travel together."
      }
    ]
  },
  {
    id: "energy-formulation-lab",
    title: "Build the Formula in Order",
    eyebrow: "Pilot lab · Solubility, sequence, and control",
    summary:
      "Water, caffeine, sweeteners, acids, flavors, colors, vitamins, and supporting ingredients only become a stable beverage through controlled formulation.",
    checkpoint: "Bench to pilot",
    motion: "cutaway",
    artwork: energyArtwork(
      "formulation-lab",
      "A transparent central blend vessel connects to water, ingredient dosing, flavor concentrates, powders, pH checks, gas control, and a plain can inside a dark brass formulation laboratory."
    ),
    landmark: { label: "Pilot blend vessel", x: 50, y: 43 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Order",
        title: "Sequence can prevent or create defects",
        detail:
          "Some powders need pre-dispersion; some acids should follow dissolution; some flavors need gentle handling. A formula is also an order of operations."
      },
      {
        eyebrow: "Solubility",
        title: "A clear bench sample can still fail later",
        detail:
          "Temperature, pH, ionic strength, concentration, mixing energy, time, and other ingredients can drive precipitation, haze, or sediment."
      },
      {
        eyebrow: "Assay",
        title: "Ingredient potency belongs in the batch calculation",
        detail:
          "Actual assay, moisture, carriers, and target batch size affect the weigh-up. Independent verification checks the finished concentration."
      },
      {
        eyebrow: "Scale-up",
        title: "A larger tank changes more than volume",
        detail:
          "Mixing time, shear, heat transfer, addition location, foam, oxygen pickup, and line hold-up can shift the result."
      },
      {
        eyebrow: "Pilot decision",
        title: "Lock the process, not only the ingredient list",
        detail:
          "A robust specification links formula, procedure, in-process checks, sensory target, package, and shelf-life plan."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The ingredient list tells us what entered. The process record tells us how those materials became one controlled beverage."
      }
    ]
  },
  {
    id: "energy-blending-carbonation",
    title: "Blend, Chill, Carbonate",
    eyebrow: "Process physics · Liquid and gas under control",
    summary:
      "Mixing creates uniformity; temperature and pressure govern how carbon dioxide dissolves, remains in solution, and releases at opening.",
    checkpoint: "Blend to bubbles",
    motion: "rotate",
    artwork: energyArtwork(
      "blending-carbonation",
      "A closed blend tank and transparent carbonation vessel connect to dosing, agitation, temperature, pressure, dissolved-gas, and transfer stations while Hummin observes safely."
    ),
    landmark: { label: "Carbonation vessel", x: 61, y: 43 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Mixing",
        title: "Uniformity needs the right circulation and time",
        detail:
          "Tank geometry, impeller, batch volume, viscosity, addition point, and recirculation affect whether ingredients distribute evenly."
      },
      {
        eyebrow: "Temperature",
        title: "Cold liquid generally holds carbon dioxide more readily",
        detail:
          "Chilling helps controlled dissolution, but the target depends on product style, pressure, package, line capability, and sensory design."
      },
      {
        eyebrow: "Pressure",
        title: "Dissolved gas and headspace stay in equilibrium",
        detail:
          "Pressure changes during transfer, filling, storage, and opening can release gas, create foam, and alter fill control."
      },
      {
        eyebrow: "Nucleation",
        title: "Rough surfaces and particles can start bubble release",
        detail:
          "Package condition, suspended material, temperature, agitation, and pouring surface affect visible fizz and foam."
      },
      {
        eyebrow: "Style",
        title: "An energy drink does not have to be carbonated",
        detail:
          "Still and sparkling versions require different sensory, processing, filling, package, and shelf-life decisions."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "The bubbles are not decoration. Temperature, pressure, surfaces, transfer, and package keep the gas story coherent."
      }
    ]
  },
  {
    id: "energy-hygienic-processing",
    title: "Protect the Beverage Through the Line",
    eyebrow: "Food safety · Control the actual hazards",
    summary:
      "Ingredient receiving, water, blending, preservation, transfer, equipment cleaning, and the environment belong to one verified food-safety plan.",
    checkpoint: "Hazard to control",
    motion: "glide",
    artwork: energyArtwork(
      "processing-line",
      "A cutaway energy-beverage facility shows ingredient dosing, water treatment, blending, controlled processing, hygienic transfer, filling, inspection, and storage with adult operators and Hummin."
    ),
    landmark: { label: "Hygienic transfer", x: 51, y: 53 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Hazard analysis",
        title: "Controls begin with the product and process",
        detail:
          "Biological, chemical, physical, and allergen hazards are evaluated for the actual ingredients, equipment, facility, package, and distribution."
      },
      {
        eyebrow: "Process choice",
        title: "There is no single universal energy-drink kill step",
        detail:
          "Hot fill, tunnel treatment, aseptic processing, cold fill with validated hurdles, or other systems depend on formula, pH, package, and regulatory context."
      },
      {
        eyebrow: "Cleaning",
        title: "Clean-in-place needs verified coverage",
        detail:
          "Time, temperature, chemical concentration, flow, mechanical action, drainage, and rinse verification work together."
      },
      {
        eyebrow: "Allergens",
        title: "Cross-contact can enter through ingredients and shared equipment",
        detail:
          "Protein, flavor, botanical, or other components may introduce allergen concerns. Segregation, sequencing, cleaning, and label control matter."
      },
      {
        eyebrow: "Records",
        title: "Monitoring proves the control was operating",
        detail:
          "Deviations, corrective action, verification, supplier records, sanitation, and release decisions keep the process auditable."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "A polished can begins with less glamorous work: hazard analysis, hygienic design, verified cleaning, monitoring, and honest release decisions."
      }
    ]
  },
  {
    id: "energy-filling-seaming",
    title: "Close the Can Correctly",
    eyebrow: "Packaging · Fill, headspace, seam, and traceability",
    summary:
      "Controlled filling and a sound double seam protect carbonation, hygiene, identity, and shelf life long after the can leaves the line.",
    checkpoint: "Liquid to sealed package",
    motion: "cutaway",
    artwork: energyArtwork(
      "filling-seaming",
      "A hygienic can line shows preparation, filling, lid placement, double seaming, seam inspection, code verification, and packed plain cans with a magnified seam cross-section."
    ),
    landmark: { label: "Double seam cutaway", x: 50, y: 66 },
    drop: { x: 50, y: 68, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Filling",
        title: "Temperature, pressure, and foam affect fill control",
        detail:
          "Carbonated products often need controlled counter-pressure conditions; still products use other filling designs. The process must match the beverage."
      },
      {
        eyebrow: "Headspace",
        title: "The space above the liquid is part of the package system",
        detail:
          "Fill level, dissolved gas, residual oxygen, pressure, and thermal behavior can influence stability and package performance."
      },
      {
        eyebrow: "Double seam",
        title: "Body flange and lid curl must interlock correctly",
        detail:
          "Seam dimensions and overlap are checked against container specifications; visual inspection alone cannot reveal every internal defect."
      },
      {
        eyebrow: "Inspection",
        title: "Destructive teardown complements online checks",
        detail:
          "Routine measurements, leak or pressure tests, fill checks, and seam teardown create a more complete view of package integrity."
      },
      {
        eyebrow: "Traceability",
        title: "A legible lot code connects package to records",
        detail:
          "Date, line, time, materials, batch, inspection, warehouse, and distribution records support investigation and targeted recall."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "The seam is a small structure carrying a large responsibility: pressure, hygiene, oxygen control, identity, and traceability."
      }
    ]
  },
  {
    id: "energy-quality-release",
    title: "Prove the Batch You Made",
    eyebrow: "Quality · Identity, assay, safety, and sensory",
    summary:
      "Finished-product release combines ingredient records, caffeine assay, chemistry, microbiology, package integrity, sensory comparison, and deviation review.",
    checkpoint: "Batch to evidence",
    motion: "orbit",
    artwork: energyArtwork(
      "evidence-safety",
      "Adult analysts and Hummin examine plain cans, liquid samples, laboratory instruments, serving silhouettes, and an evidence archive in a dark brass quality observatory."
    ),
    landmark: { label: "Release table", x: 47, y: 61 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Identity",
        title: "Right ingredient, right lot, right status",
        detail:
          "Approved supplier, certificate review, receiving checks, identity testing where appropriate, and controlled storage support material traceability."
      },
      {
        eyebrow: "Caffeine assay",
        title: "Verify total caffeine in the finished product",
        detail:
          "A suitable analytical method should capture the declared product contribution, including caffeine supplied through botanical ingredients where relevant."
      },
      {
        eyebrow: "Chemistry",
        title: "pH, soluble solids, density, color, and gas answer different questions",
        detail:
          "Specifications should connect to process control, sensory target, preservation, fill performance, and shelf life rather than exist as decorative numbers."
      },
      {
        eyebrow: "Microbiology",
        title: "Testing complements—not replaces—preventive control",
        detail:
          "Sampling can support verification, but safety depends on validated process and sanitation controls across the whole lot."
      },
      {
        eyebrow: "Package",
        title: "Integrity belongs in the release decision",
        detail:
          "Seam, leak, fill, pressure, code, appearance, and shipping configuration checks connect the beverage to its protective container."
      },
      {
        eyebrow: "Disposition",
        title: "A deviation needs evidence before release",
        detail:
          "Hold, investigation, impact assessment, corrective action, rework or rejection, and documented authorization protect the decision from schedule pressure."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 10,
        text:
          "Release is not one green light. It is a chain of identity, process, assay, safety, sensory, package, and documented judgment."
      }
    ]
  },
  {
    id: "energy-labels-regulation",
    title: "Translate the Label by Market",
    eyebrow: "Regulation · Geography changes the rulebook",
    summary:
      "Caffeine declarations, caution statements, serving rules, product identity, permitted additions, and claims differ across jurisdictions.",
    checkpoint: "Rule to package",
    motion: "rotate",
    artwork: energyArtwork(
      "evidence-safety",
      "Plain cans and cups, container silhouettes, adult-use context icons, ingredient samples, evidence records, and a balance emblem form a global label observatory."
    ),
    landmark: { label: "Market rulebook", x: 54, y: 31 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "United States",
        title: "FDA has no regulation specific to the marketing name energy drink",
        detail:
          "General food or dietary-supplement requirements apply according to product identity. Added caffeine appears in the ingredient list; total amount is often declared voluntarily."
      },
      {
        eyebrow: "Canada",
        title: "Caffeinated energy drinks have explicit supplemented-food rules",
        detail:
          "Health Canada limits total caffeine to 180 mg per serving and requires specified caffeine information and caution statements for this category."
      },
      {
        eyebrow: "Europe",
        title: "EFSA risk assessment is not the same as one universal label law",
        detail:
          "EFSA provides scientific safety context, while European Union and national rules govern labeling and permitted presentation. Verify the destination market."
      },
      {
        eyebrow: "Serving",
        title: "Per serving and per container can tell different stories",
        detail:
          "Serving size, servings per package, caffeine declaration, nutrition information, and any maximum-use wording must work together without ambiguity."
      },
      {
        eyebrow: "Claims",
        title: "A front claim cannot erase required context",
        detail:
          "Ingredient list, nutrition panel, cautions, net quantity, responsible business, lot identity, and substantiation remain part of the complete package."
      },
      {
        eyebrow: "Stewardship",
        title: "Formulas and labels need change control",
        detail:
          "Ingredient limits, warnings, permitted claims, and label rules evolve. Market-specific review should continue after launch."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "A can does not carry the same legal meaning everywhere. The destination market changes the ingredients, declarations, cautions, and claims we must verify."
      }
    ]
  },
  {
    id: "energy-storage-distribution",
    title: "Protect the Route to the Shelf",
    eyebrow: "Logistics · Time, temperature, light, motion, and damage",
    summary:
      "Warehouse and distribution conditions can change flavor, color, vitamin retention, carbonation, package integrity, and remaining shelf life.",
    checkpoint: "Release to retail",
    motion: "glide",
    artwork: energyArtwork(
      "storage-retail",
      "Plain cans move from a clean warehouse through protected transport to ambient and chilled retail while Roma checks damage, temperature exposure, rotation, and recycling routes."
    ),
    landmark: { label: "Distribution portal", x: 51, y: 49 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Temperature",
        title: "Heat can accelerate chemical and sensory change",
        detail:
          "A product may be shelf-stable and still lose quality faster under abusive temperatures. Distribution studies should reflect realistic routes."
      },
      {
        eyebrow: "Light",
        title: "Package opacity helps, but secondary packaging also matters",
        detail:
          "Light exposure can affect sensitive colors, flavors, and vitamins in some formats; pallet wrap, cartons, displays, and storage location shape exposure."
      },
      {
        eyebrow: "Damage",
        title: "Dents and seam strikes are not merely cosmetic",
        detail:
          "Packages near the seam, lid, or severe deformation may need segregation and evaluation under the manufacturer’s criteria."
      },
      {
        eyebrow: "Rotation",
        title: "First-expired, first-out protects usable shelf life",
        detail:
          "Date visibility, inventory records, warehouse zoning, and retail rotation reduce old stock and make investigations faster."
      },
      {
        eyebrow: "Traceability",
        title: "The route should remain visible after shipment",
        detail:
          "Lot-to-customer and customer-to-lot records support targeted communication, retrieval, and recall rather than guessing across the whole market."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "The lot record leaves the factory with the cans. Temperature, damage, destination, rotation, and remaining shelf life travel beside it."
      }
    ]
  },
  {
    id: "energy-retail-service",
    title: "Make the Shelf Comparison Useful",
    eyebrow: "Retail and service · Amount before aura",
    summary:
      "Package size, caffeine amount, servings, sugar, ingredients, cautions, intended use, and personal timing deserve more attention than color or shelf position.",
    checkpoint: "Shelf to decision",
    motion: "orbit",
    artwork: energyArtwork(
      "storage-retail",
      "A calm unlabeled retail shelf and chilled cabinet connect to package-size comparison, intact-can inspection, inventory rotation, and a consultation table inside SIP Academy."
    ),
    landmark: { label: "Comparison shelf", x: 81, y: 45 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Compare",
        title: "Use the same denominator",
        detail:
          "Compare caffeine per container and per serving, then place sugar, calories, and other ingredients beside the same amount actually consumed."
      },
      {
        eyebrow: "Freshness",
        title: "Check date, seal, seam, and package condition",
        detail:
          "Reject leaking, bulging, severely damaged, or otherwise compromised packages and follow local reporting or return procedures."
      },
      {
        eyebrow: "Service",
        title: "Ask when caffeine amount is not visible",
        detail:
          "FDA notes restaurants and other retail establishments are not generally required to disclose caffeine amount. Preparation and size can vary."
      },
      {
        eyebrow: "Hydration",
        title: "Offer water without making it a punishment",
        detail:
          "A clear water option supports choice and helps prevent an energy drink from being mistaken for the only available hydration solution."
      },
      {
        eyebrow: "Alcohol",
        title: "Do not present caffeine as a way to offset alcohol",
        detail:
          "Caffeine does not make alcohol impairment disappear. Responsible service avoids normalizing or promoting the combination."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Good service makes comparison easier, keeps water available, and never sells caffeine as a shortcut around sleep or alcohol impairment."
      }
    ]
  },
  {
    id: "energy-sensory-evaluation",
    title: "Taste Without the Hype",
    eyebrow: "Sensory · Appearance, aroma, structure, and finish",
    summary:
      "A small comparative tasting can reveal sweetness, acidity, bitterness, aroma, carbonation, texture, and aftertaste without turning consumption into a challenge.",
    checkpoint: "Formula to perception",
    motion: "push-in",
    artwork: energyArtwork(
      "informed-choice",
      "Adult Sippy and Roma, Hummin, and an adult guest compare a single plain can, water, food, timing, evidence, and sensory study stations at an evening conservatory table."
    ),
    landmark: { label: "Sensory table", x: 51, y: 59 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Appearance",
        title: "Color, clarity, sediment, and bubbles open the inspection",
        detail:
          "Compare against product style and reference rather than assuming every haze or low-carbonation presentation is defective."
      },
      {
        eyebrow: "Aroma",
        title: "Temperature changes what escapes the glass",
        detail:
          "Cold service can suppress aroma and sweetness while emphasizing sharpness and carbonation. Allow consistent conditions for comparison."
      },
      {
        eyebrow: "Taste",
        title: "Sweet, sour, and bitter arrive on different timelines",
        detail:
          "Caffeine bitterness may appear late; acids can feel immediate; sweeteners can linger. Describe sequence instead of reducing the drink to one score."
      },
      {
        eyebrow: "Texture",
        title: "Carbonation, dissolved solids, and temperature shape body",
        detail:
          "Bubbles can increase bite; sugar can add weight; acids and chilling can make the same liquid feel leaner or sharper."
      },
      {
        eyebrow: "Practice",
        title: "Small samples and a spit or discard option preserve control",
        detail:
          "Sensory education does not require finishing multiple caffeinated servings. Label samples and track total exposure."
      },
      {
        eyebrow: "Meaning",
        title: "Preference does not establish safety or efficacy",
        detail:
          "A delicious drink can still be unsuitable for a person or occasion; a disliked drink is not automatically unsafe. Keep judgments separate."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 10,
        text:
          "Taste the architecture, not the advertising: aroma first, then sweetness, acidity, bitterness, bubbles, body, and what lingers."
      }
    ]
  },
  {
    id: "energy-informed-choice-circularity",
    title: "Reconnect the Whole Can",
    eyebrow: "Informed choice · Product, person, and material loop",
    summary:
      "The final choice reconnects caffeine total, serving, timing, sensitivity, nutrition, evidence, package condition, service, and the can’s material after use.",
    checkpoint: "Signal to stewardship",
    motion: "reassemble",
    artwork: energyArtwork(
      "informed-choice",
      "Adult Sippy and Roma, the ivory robot Hummin, and an adult guest sit at an evening evidence table beneath a circular aluminum collection, sorting, remanufacture, and new-can route."
    ),
    landmark: { label: "Informed table", x: 50, y: 57 },
    drop: { x: 50, y: 67, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Choice",
        title: "Start with the reason and the alternative",
        detail:
          "Alertness, taste, habit, convenience, social setting, or sport are different occasions. Water, food, rest, coffee, tea, or no caffeinated drink may fit differently."
      },
      {
        eyebrow: "Total",
        title: "Count the whole day before opening the next container",
        detail:
          "Serving math, other caffeine sources, timing, and individual guidance turn a front-panel number into usable context."
      },
      {
        eyebrow: "Agency",
        title: "Declining or stopping is a valid outcome",
        detail:
          "Sensory dislike, unwanted effects, uncertainty, cautions, sleep plans, medication questions, or simple preference are sufficient reasons to choose differently."
      },
      {
        eyebrow: "Evidence",
        title: "Keep claims proportional to what was tested",
        detail:
          "Ingredient mechanism, finished-product evidence, studied population, amount, duration, and unresolved questions should remain visible."
      },
      {
        eyebrow: "Material",
        title: "Empty, sort, and recycle where local systems accept the package",
        detail:
          "Aluminum can circulate again, but collection, contamination, sorting, remanufacture, and local infrastructure determine whether that loop closes."
      },
      {
        eyebrow: "Field team",
        title: "Curiosity works best beside restraint",
        detail:
          "Learn the system deeply, communicate uncertainty clearly, and leave every person room to make a context-aware choice."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "You have followed the signal from source and serving to process, package, person, and material loop. Understanding leaves room for choice."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "System complete: identity, exposure, evidence, safety, quality, label, context, and stewardship remain linked."
      }
    ]
  }
];

const energyScenes: BeyondTheGlassScene[] = energySceneSeeds.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / energySceneSeeds.length, (index + 1) / energySceneSeeds.length]
}));

export const energyFieldTrip: BeyondTheGlassChapter = {
  slug: "energy-drinks",
  title: "Beyond The Glass",
  chapterTitle: "Energy Drinks · From Signal to Stewardship",
  subject: "An evidence-first caffeinated energy beverage field trip",
  description:
    "A visual SIP Academy journey through category taxonomy, product identity, caffeine origin and purification, serving math, timing and sensitivity, water, sweeteners, acids, flavor, color, vitamins, functional ingredients, formulation, carbonation, hygienic processing, filling, quality release, market-specific labeling, storage, retail, sensory evaluation, informed choice, and circularity.",
  coreMessage:
    "An energy drink is not one molecule or one promise: source, total caffeine, serving, timing, individual sensitivity, complete formula, evidence, process, package, jurisdiction, service, and the freedom to choose keep the signal connected to reality.",
  assets: {
    academyMap: "/beyond-the-glass/energy-drinks/academy-gate-1600.webp",
    academyMapSet:
      "/beyond-the-glass/energy-drinks/academy-gate-960.webp 960w, /beyond-the-glass/energy-drinks/academy-gate-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/energy-drinks/category-crossroads-960.webp"
  },
  scenes: energyScenes,
  sources: [
    {
      id: "energy-fda-caffeine",
      organization: "U.S. Food and Drug Administration",
      title: "Spilling the Beans: How Much Caffeine is Too Much?",
      url: "https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much",
      note:
        "Primary U.S. consumer and regulatory context for total caffeine, wide individual variation, children and teens, pregnancy and medications, labeling, natural versus added caffeine, concentrated caffeine, and energy-drink ranges."
    },
    {
      id: "energy-efsa-caffeine",
      organization: "European Food Safety Authority",
      title: "Caffeine",
      url: "https://www.efsa.europa.eu/en/topics/topic/caffeine",
      note:
        "Official European scientific risk-assessment summary for single and daily caffeine exposure, sleep timing, pregnancy and lactation, exercise, young people, and the limits of the assessment."
    },
    {
      id: "energy-health-canada-caffeine-foods",
      organization: "Health Canada",
      title: "Caffeine in Foods",
      url: "https://www.canada.ca/en/health-canada/services/food-nutrition/food-safety/food-additives/caffeine-foods.html",
      note:
        "Official Canadian context for natural and added caffeine sources, average food and beverage amounts, sensitivity, and age- and life-stage recommendations."
    },
    {
      id: "energy-health-canada-ced",
      organization: "Health Canada",
      title: "Caffeinated Energy Drinks",
      url: "https://www.canada.ca/en/health-canada/services/food-nutrition/supplemented-foods/caffeinated-energy-drinks.html",
      note:
        "Primary Canadian category reference for total caffeine limit per serving, supplemented-food labeling, caution statements, sensitive groups, maximum servings, and distinction from energy shots."
    },
    {
      id: "energy-cdc-youth",
      organization: "Centers for Disease Control and Prevention",
      title: "The Buzz on Energy Drinks",
      url: "https://www.cdc.gov/school-nutrition/energy-drinks/index.html",
      note:
        "Official school-health context distinguishing energy drinks from sports drinks and summarizing expert guidance and concerns for children and adolescents."
    },
    {
      id: "energy-cdc-alcohol",
      organization: "Centers for Disease Control and Prevention",
      title: "Effects of Mixing Alcohol and Caffeine",
      url: "https://www.cdc.gov/alcohol/about-alcohol-use/alcohol-caffeine.html",
      note:
        "Official U.S. warning that caffeine does not reduce alcohol's effects and that combining the two can increase drinking and related harm."
    },
    {
      id: "energy-fda-additives-gras",
      organization: "U.S. Food and Drug Administration",
      title: "Food Additives and GRAS Ingredients: Information for Consumers",
      url: "https://www.fda.gov/food/food-ingredients-packaging/food-additives-and-gras-ingredients-information-consumers",
      note:
        "Official U.S. framework for food-ingredient safety, intended conditions of use, GRAS status, food additives, emerging evidence, adverse-event reporting, and caffeine oversight."
    },
    {
      id: "energy-fda-nutrition-facts",
      organization: "U.S. Food and Drug Administration",
      title: "Changes to the Nutrition Facts Label",
      url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/changes-nutrition-facts-label",
      note:
        "Primary U.S. reference for serving size, servings per container, calories, added sugars, nutrient amounts, and Daily Value context on conventional foods."
    },
    {
      id: "energy-fda-structure-function",
      organization: "U.S. Food and Drug Administration",
      title: "Structure/Function Claims",
      url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/structurefunction-claims",
      note:
        "Official U.S. distinction between conventional-food and dietary-supplement structure/function claims, substantiation, notification, disclaimers, and disease claims."
    },
    {
      id: "energy-fda-color-additives",
      organization: "U.S. Food and Drug Administration",
      title: "Color Additives Questions and Answers for Consumers",
      url: "https://www.fda.gov/food/color-additives-information-consumers/color-additives-questions-and-answers-consumers",
      note:
        "Official U.S. context for approved uses, conditions, certification, exempt colors, ingredient declarations, safety evaluation, and consumer questions."
    },
    {
      id: "energy-fda-food-ingredients",
      organization: "U.S. Food and Drug Administration",
      title: "Types of Food Ingredients",
      url: "https://www.fda.gov/food/food-additives-and-gras-ingredients-information-consumers/types-food-ingredients",
      note:
        "Official explanation of ingredient-list order and the technological roles of preservatives, sweeteners, flavors, colors, emulsifiers, stabilizers, nutrients, and other food ingredients."
    },
    {
      id: "energy-fda-preventive-controls",
      organization: "U.S. Food and Drug Administration",
      title: "FSMA Final Rule for Preventive Controls for Human Food",
      url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-preventive-controls-human-food",
      note:
        "Primary U.S. food-safety framework for hazard analysis, process, allergen and sanitation controls, supply chain, monitoring, corrective actions, verification, records, and recall planning."
    },
    {
      id: "energy-fda-allergens",
      organization: "U.S. Food and Drug Administration",
      title: "Food Allergies",
      url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies",
      note:
        "Official U.S. reference for major allergen declarations, allergen cross-contact controls, inspections, recalls, and current allergen information."
    },
    {
      id: "energy-nih-vitamin-b6",
      organization: "National Institutes of Health Office of Dietary Supplements",
      title: "Vitamin B6: Fact Sheet for Health Professionals",
      url: "https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/",
      note:
        "Authoritative micronutrient context for forms, normal metabolic roles, dietary sources, recommended intakes, status, excessive intake, and medication interactions."
    },
    {
      id: "energy-nih-vitamin-b12",
      organization: "National Institutes of Health Office of Dietary Supplements",
      title: "Vitamin B12: Fact Sheet for Health Professionals",
      url: "https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/",
      note:
        "Authoritative context for vitamin B12 forms, normal roles, food and supplement sources, intake and status, absorption, health evidence, and interactions."
    },
    {
      id: "energy-who-healthy-diet",
      organization: "World Health Organization",
      title: "Healthy Diet",
      url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
      note:
        "Authoritative global context for adequacy, balance, moderation, diversity, free sugars, sodium, and placing sweetened beverages within an overall dietary pattern."
    },
    {
      id: "energy-codex-labeling",
      organization: "Codex Alimentarius Commission",
      title: "General Standard for the Labelling of Prepackaged Foods (CXS 1-1985)",
      url: "https://www.fao.org/fao-who-codexalimentarius/codex-texts/list-standards/en/",
      note:
        "International reference for truthful, non-misleading prepackaged-food identity, ingredient declaration, net contents, responsible party, origin where required, lot identification, date marking, and instructions."
    },
    {
      id: "energy-fda-bottled-water",
      organization: "U.S. Food and Drug Administration",
      title: "Bottled Water Everywhere: Keeping it Safe",
      url: "https://www.fda.gov/consumers/consumer-updates/bottled-water-everywhere-keeping-it-safe",
      note:
        "Official U.S. context for bottled-water source and treatment language, quality standards, manufacturing practice, sampling, and label identity."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
