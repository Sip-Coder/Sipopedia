import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const healthArtwork = (
  filename: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/health-drinks/${filename}-1600.webp`,
  srcSet: `/beyond-the-glass/health-drinks/${filename}-960.webp 960w, /beyond-the-glass/health-drinks/${filename}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/health-drinks/${filename}-portrait-960.webp`,
  portraitSrcSet: `/beyond-the-glass/health-drinks/${filename}-portrait-640.webp 640w, /beyond-the-glass/health-drinks/${filename}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

type HealthSceneSeed = Omit<BeyondTheGlassScene, "number" | "range">;

const healthSceneSeeds: HealthSceneSeed[] = [
  {
    id: "health-evidence-conservatory-gate",
    title: "The Evidence Conservatory",
    eyebrow: "SIP Academy · Health Drinks",
    summary:
      "Ingredients, formulation, dose, evidence, processing, package, and human context meet inside one functional-beverage system.",
    checkpoint: "Claim to evidence",
    motion: "establish",
    artwork: healthArtwork(
      "academy-gate",
      "Adult guides Sippy and Roma and the ivory robot Hummin enter a sunrise brass-and-teal Botanical Evidence Conservatory connected to formulation and quality laboratories."
    ),
    landmark: { label: "Evidence Conservatory", x: 50, y: 33 },
    drop: { x: 50, y: 68, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Category",
        title: "Health drink is a marketplace phrase",
        detail:
          "It can describe foods, beverages, dietary supplements, or products with no special legal category. Identity and governing rules depend on the actual product and market."
      },
      {
        eyebrow: "Purpose",
        title: "Start with intended use",
        detail:
          "Hydration, nutrition, sensory enjoyment, convenience, and supplementation are different goals. A useful review asks which goal the product can reasonably support."
      },
      {
        eyebrow: "Evidence",
        title: "An ingredient study is not a finished-drink result",
        detail:
          "Form, amount, serving pattern, population, product matrix, and study design affect whether evidence transfers to a commercial beverage."
      },
      {
        eyebrow: "Safety",
        title: "More is not automatically better",
        detail:
          "Total exposure can include foods, drinks, supplements, and medicines. Suitability varies by person, health context, life stage, and ingredient."
      },
      {
        eyebrow: "Route",
        title: "Formula → proof → package → person",
        detail:
          "This adventure follows material identity, physical behavior, process control, label context, storage, sensory quality, and informed choice."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Welcome to the Evidence Conservatory. We will treat every promise as a question connecting ingredient, amount, product, evidence, and person."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "I will keep identity, formulation, processing, exposure, stability, label context, and uncertainty linked."
      }
    ]
  },
  {
    id: "health-system-map",
    title: "Map the Whole Formula",
    eyebrow: "System map · Evidence before aura",
    summary:
      "A luminous route links water, active and supporting ingredients, process, measurement, claims, storage, service, and the guest.",
    checkpoint: "Ingredient to choice",
    motion: "glide",
    artwork: healthArtwork(
      "academy-gate",
      "A complete Botanical Evidence Conservatory campus with hydration, formulation, culture, quality, packaging, distribution, and sensory halls joined by luminous water channels."
    ),
    landmark: { label: "Functional beverage system", x: 51, y: 47 },
    drop: { x: 51, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Matrix",
        title: "Water carries more than a headline ingredient",
        detail:
          "Acids, sweeteners, minerals, proteins, fibers, flavors, stabilizers, colors, cultures, and gases can alter taste, safety, processing, and shelf life."
      },
      {
        eyebrow: "Sequence",
        title: "Order of addition changes the process",
        detail:
          "Hydration time, temperature, shear, pH, ionic strength, and ingredient interactions can decide whether a formula disperses, precipitates, foams, or separates."
      },
      {
        eyebrow: "Measurement",
        title: "One test cannot prove the whole product",
        detail:
          "Chemical, physical, microbiological, sensory, packaging, and label checks answer different questions and need fit-for-purpose methods."
      },
      {
        eyebrow: "Handoff",
        title: "Stability continues after filling",
        detail:
          "Time, temperature, light, oxygen, motion, distribution, opening, and service can change a product that passed the filling line."
      },
      {
        eyebrow: "Student lens",
        title: "Ask what is known—and what is assumed",
        detail:
          "Trace each claim to the ingredient form, amount, serving, product tests, evidence type, and population actually studied."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "A functional beverage is not a list of famous ingredients. It is a system whose parts can strengthen, weaken, or contradict one another."
      }
    ]
  },
  {
    id: "health-intended-use-claims",
    title: "Read the Promise",
    eyebrow: "Claim literacy · Product before promotion",
    summary:
      "A claim becomes more useful when its wording, evidence, dose, population, and product category are examined together.",
    checkpoint: "Promise to question",
    motion: "orbit",
    artwork: healthArtwork(
      "evidence-hall",
      "A brass-and-glass Hall of Claims with beverage samples, ingredient records, botanical archives, and a central evidence prism separating different levels of support."
    ),
    landmark: { label: "Evidence prism", x: 50, y: 37 },
    drop: { x: 50, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Wording",
        title: "Specific language creates a testable question",
        detail:
          "‘Contains electrolytes’ describes composition; ‘supports hydration’ proposes a function; disease-treatment language enters a different and tightly regulated territory."
      },
      {
        eyebrow: "Evidence ladder",
        title: "Mechanism is not the same as outcome",
        detail:
          "Laboratory plausibility, animal work, observational studies, controlled human trials, and evidence reviews provide different strengths and limits."
      },
      {
        eyebrow: "Transfer",
        title: "Match the evidence to the sold product",
        detail:
          "Check ingredient identity, chemical form, dose, delivery matrix, serving pattern, duration, comparator, and studied population."
      },
      {
        eyebrow: "Context",
        title: "Baseline diet changes relevance",
        detail:
          "A nutrient or ingredient may matter differently when intake is low, adequate, high, or combined with other sources."
      },
      {
        eyebrow: "Uncertainty",
        title: "Responsible language leaves room for limits",
        detail:
          "A credible explanation names what is established, what remains uncertain, and which people or situations may require extra caution."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "I treat every promise as a flavor clue: name it precisely, trace where it came from, and notice what the headline leaves out."
      }
    ]
  },
  {
    id: "health-label-frameworks",
    title: "Find the Governing Label",
    eyebrow: "Identity · Food, beverage, or supplement",
    summary:
      "The package framework shapes which panel, claims, ingredients, servings, warnings, and responsibilities apply.",
    checkpoint: "Category to panel",
    motion: "cutaway",
    artwork: healthArtwork(
      "evidence-hall",
      "A conceptual label archive where generic beverage packages and ingredient ledgers move through separate food and dietary-supplement evidence pathways without readable brand text."
    ),
    landmark: { label: "Label pathways", x: 50, y: 54 },
    drop: { x: 50, y: 70, size: 7 },
    fieldNotes: [
      {
        eyebrow: "United States example",
        title: "Nutrition Facts and Supplement Facts are not interchangeable",
        detail:
          "Conventional foods and dietary supplements use different U.S. labeling frameworks. The product’s intended use and presentation help determine its category."
      },
      {
        eyebrow: "Serving",
        title: "Package size can differ from serving size",
        detail:
          "Read the amount per serving and the number of servings. A bottle consumed at once may still contain more than one labeled serving."
      },
      {
        eyebrow: "Ingredients",
        title: "The complete ingredient list matters",
        detail:
          "Supporting acids, sweeteners, flavors, colors, stabilizers, preservatives, and carriers can affect suitability and sensory performance."
      },
      {
        eyebrow: "Claims",
        title: "A permitted statement is not unlimited proof",
        detail:
          "Different claim types have different conditions. U.S. dietary-supplement structure/function claims also carry specific notification and disclaimer requirements."
      },
      {
        eyebrow: "Jurisdiction",
        title: "Rules change across markets",
        detail:
          "Ingredient status, claim wording, nutrient values, warnings, and labeling conventions must be checked for the product and destination market."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Before comparing panels, identify the product category and jurisdiction. Similar-looking drinks can carry different legal responsibilities."
      }
    ]
  },
  {
    id: "health-water-foundation",
    title: "Water Builds the Matrix",
    eyebrow: "Foundation · Quality and treatment",
    summary:
      "Water controls dilution, taste, mineral load, processing behavior, microbiological risk, and nearly every later measurement.",
    checkpoint: "Source to process water",
    motion: "push-in",
    artwork: healthArtwork(
      "hydration-electrolytes",
      "A luminous hydrochemistry chamber with a central treated-water vessel, sampling bench, mineral stations, and connected formulation lines."
    ),
    landmark: { label: "Water matrix", x: 50, y: 35 },
    drop: { x: 50, y: 61, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Fitness",
        title: "Source water needs a defined specification",
        detail:
          "Microbiological condition, disinfectant residuals, hardness, alkalinity, metals, odor, taste, and local requirements can affect process and product."
      },
      {
        eyebrow: "Treatment",
        title: "Treatment should solve a named problem",
        detail:
          "Filtration, activated carbon, softening, membranes, ultraviolet treatment, or other steps are selected and verified for the source and use—not added as decoration."
      },
      {
        eyebrow: "Chemistry",
        title: "Minerals interact with the formula",
        detail:
          "Ions can influence taste, buffering, protein behavior, emulsions, precipitation, processing surfaces, and analytical results."
      },
      {
        eyebrow: "Sanitation",
        title: "Clean water does not protect a dirty path",
        detail:
          "Tanks, hoses, valves, filters, dead legs, and filling equipment remain contact surfaces requiring hygienic design and verified cleaning."
      },
      {
        eyebrow: "Baseline",
        title: "Record water before ingredients arrive",
        detail:
          "A useful batch record identifies source or treatment state and the checks relevant to the validated process."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Water is not empty space. It is the matrix that carries every ingredient and exposes every weak point in the process."
      }
    ]
  },
  {
    id: "health-electrolyte-context",
    title: "Electrolytes Need Context",
    eyebrow: "Hydration · Composition and use",
    summary:
      "Electrolyte identity, concentration, food context, losses, palatability, total intake, and the individual decide what a formula means.",
    checkpoint: "Ion to serving",
    motion: "orbit",
    artwork: healthArtwork(
      "hydration-electrolytes",
      "A deconstructed electrolyte observatory with a central water vessel and colorful mineral stations connected by measured glass channels."
    ),
    landmark: { label: "Ion constellation", x: 50, y: 52 },
    drop: { x: 50, y: 63, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Identity",
        title: "Electrolyte is a chemical behavior, not one ingredient",
        detail:
          "Sodium, potassium, chloride, calcium, magnesium, and phosphate compounds dissociate differently and also contribute taste, buffering, and formulation effects."
      },
      {
        eyebrow: "Use",
        title: "Ordinary hydration and substantial losses are different cases",
        detail:
          "Need depends on activity, environment, sweat or illness-related losses, diet, health context, and professional guidance when appropriate."
      },
      {
        eyebrow: "Concentration",
        title: "The amount per serving matters",
        detail:
          "A front-panel callout does not reveal concentration, serving count, total package intake, or the contributions from the rest of the diet."
      },
      {
        eyebrow: "Palate",
        title: "Salt, acid, sweetness, and aroma negotiate drinkability",
        detail:
          "A technically targeted formula still needs sensory balance so the intended serving can be consumed comfortably."
      },
      {
        eyebrow: "Caution",
        title: "Some people need individualized guidance",
        detail:
          "Kidney, heart, blood-pressure, medication, and other contexts can change electrolyte suitability. This adventure cannot replace qualified care."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Electrolyte is not a magic plural. Name the ions, amounts, serving, intended use, total exposure, and person before interpreting the formula."
      }
    ]
  },
  {
    id: "health-protein-dispersal",
    title: "Protein Enters the Vortex",
    eyebrow: "Macronutrient · Source and dispersibility",
    summary:
      "Protein type, allergen identity, particle behavior, hydration, heat, pH, minerals, and shear determine whether a drink remains usable.",
    checkpoint: "Powder to dispersion",
    motion: "rotate",
    artwork: healthArtwork(
      "protein-dispersal",
      "A complete brass-and-glass protein formulation system with dairy and plant protein streams feeding a central hydration and high-shear mixing chamber."
    ),
    landmark: { label: "Protein vortex", x: 50, y: 52 },
    drop: { x: 50, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Source",
        title: "Protein ingredients are not interchangeable",
        detail:
          "Whey, casein, soy, pea, and other proteins differ in composition, flavor, solubility, heat response, processing history, and allergen status."
      },
      {
        eyebrow: "Hydration",
        title: "Powder needs water, time, and a planned sequence",
        detail:
          "Rapid surface wetting can trap dry interiors. Temperature, induction, mixing energy, rest time, and order of addition shape dispersion."
      },
      {
        eyebrow: "Environment",
        title: "pH and minerals can move protein toward instability",
        detail:
          "Charge, ionic conditions, heating, and interactions with other ingredients influence aggregation, sediment, viscosity, and mouthfeel."
      },
      {
        eyebrow: "Nutrition",
        title: "Protein amount is only one question",
        detail:
          "Serving amount, source, amino-acid profile, digestibility context, total diet, energy, sugar, and intended use all belong in interpretation."
      },
      {
        eyebrow: "Allergen",
        title: "Source identity must survive every handoff",
        detail:
          "Supplier records, segregation, sanitation, label review, change control, and service communication help manage allergen risk."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Protein announces itself through aroma, chalkiness, astringency, thickness, sediment, and aftertaste. Those clues point back to source and process."
      }
    ]
  },
  {
    id: "health-fiber-prebiotic",
    title: "Fiber Changes the Flow",
    eyebrow: "Structure · Hydration and substrate",
    summary:
      "Fiber identity and amount can change viscosity, dispersion, sweetness perception, sediment, tolerance, and how the beverage is consumed.",
    checkpoint: "Fiber to texture",
    motion: "cutaway",
    artwork: healthArtwork(
      "fiber-prebiotic",
      "A botanical fiber laboratory with a central spiral of hydrated plant fibers and transparent columns showing dispersion and different viscosity states."
    ),
    landmark: { label: "Fiber spiral", x: 50, y: 43 },
    drop: { x: 50, y: 68, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Identity",
        title: "Fiber is a family of materials",
        detail:
          "Solubility, viscosity, fermentability, particle size, processing, and analytical definition vary; ‘fiber’ does not predict one physical or physiological result."
      },
      {
        eyebrow: "Prebiotic language",
        title: "Not every fiber is automatically a prebiotic",
        detail:
          "Prebiotic classification depends on evidence that a substrate is selectively used by host microorganisms and confers a health benefit."
      },
      {
        eyebrow: "Process",
        title: "Hydration can be slow and sequence-sensitive",
        detail:
          "Poor dispersion can create fisheyes, clumps, sediment, unexpected viscosity, or processing difficulty."
      },
      {
        eyebrow: "Sensory",
        title: "Texture changes flavor perception",
        detail:
          "Thickness and coating can alter sweetness, acidity, aroma release, aftertaste, and the perceived size of a serving."
      },
      {
        eyebrow: "Tolerance",
        title: "Serving amount and adaptation matter",
        detail:
          "Some fibers can cause gastrointestinal discomfort for some people, especially at higher or sudden intakes; individual response varies."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Fiber can be nutrient, substrate, thickener, and sensory force. Name the material and amount before assigning a function."
      }
    ]
  },
  {
    id: "health-live-culture-viability",
    title: "Can the Culture Survive?",
    eyebrow: "Microbiology · Identity, amount, and time",
    summary:
      "A culture claim depends on organism identity, viable amount where relevant, matrix, process, package, storage, and the end of shelf life.",
    checkpoint: "Culture to expiry",
    motion: "glide",
    artwork: healthArtwork(
      "culture-viability",
      "A teal-glass culture observatory with protected microbial samples, refrigerated and warm chambers, time pathways, microscopy, and uncertainty controls."
    ),
    landmark: { label: "Viability chamber", x: 50, y: 44 },
    drop: { x: 50, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Identity",
        title: "Genus, species, and strain can matter",
        detail:
          "Evidence for one strain, amount, product, or population should not be silently transferred to every microorganism sold under a broad category."
      },
      {
        eyebrow: "Viability",
        title: "Live at manufacture is not live at consumption",
        detail:
          "Heat, acidity, oxygen, water activity, competing ingredients, package barrier, temperature, and time can reduce viable counts."
      },
      {
        eyebrow: "Definitions",
        title: "Probiotic, live culture, and postbiotic are not synonyms",
        detail:
          "Each term carries a different concept and evidence burden. Inactivated microorganisms or their components should not be presented as live cells."
      },
      {
        eyebrow: "Verification",
        title: "The method must distinguish what the claim needs",
        detail:
          "Culture, molecular, or other methods answer different identity and viability questions; a validated plan should match the stated claim."
      },
      {
        eyebrow: "Caution",
        title: "Vulnerable people may need professional advice",
        detail:
          "Live-microbe products are not equally appropriate for everyone. Immunocompromised or seriously ill people should discuss use with qualified clinicians."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "A living-culture claim has a clock. Identity, viable amount, package, storage, and the end of shelf life must agree."
      }
    ]
  },
  {
    id: "health-micronutrient-orbit",
    title: "Micronutrients Orbit the Serving",
    eyebrow: "Vitamins and minerals · Total exposure",
    summary:
      "Nutrient identity, chemical form, amount, bioavailability context, total intake, upper limits, and population belong in one view.",
    checkpoint: "Nutrient to daily pattern",
    motion: "orbit",
    artwork: healthArtwork(
      "micronutrient-orbit",
      "A celestial brass micronutrient observatory with ingredient forms orbiting a central measured beverage serving, ledgers, balances, and a prism."
    ),
    landmark: { label: "Measured serving", x: 50, y: 48 },
    drop: { x: 50, y: 63, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Reference values",
        title: "Daily Value is a label tool",
        detail:
          "It helps compare labeled amounts in the United States but is not a personalized prescription and does not replace age- or life-stage-specific dietary reference values."
      },
      {
        eyebrow: "Form",
        title: "Chemical form and matrix can matter",
        detail:
          "Solubility, stability, interactions, processing losses, and absorption context differ among nutrients and forms."
      },
      {
        eyebrow: "Exposure",
        title: "Add every source before judging the total",
        detail:
          "Foods, fortified drinks, supplements, medications, and repeated servings can contribute to the same nutrient intake."
      },
      {
        eyebrow: "Upper limits",
        title: "Some nutrients have intake ceilings",
        detail:
          "Tolerable Upper Intake Levels address chronic high intake risk for many—but not all—nutrients and require age and life-stage context."
      },
      {
        eyebrow: "Stability",
        title: "The label amount needs shelf-life support",
        detail:
          "Light, oxygen, heat, moisture, pH, and interactions can degrade or change some nutrients, so formulation and testing must support the declared amount."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Micronutrients are small in mass, not small in responsibility. Compare form, serving, total exposure, stability, and the person."
      }
    ]
  },
  {
    id: "health-botanical-evidence",
    title: "The Botanical Evidence Bridge",
    eyebrow: "Plants and fungi · Tradition, chemistry, and trials",
    summary:
      "Botanical identity, plant part, preparation, marker profile, dose, human evidence, interactions, and uncertainty must cross the same bridge.",
    checkpoint: "Tradition to substantiation",
    motion: "reassemble",
    artwork: healthArtwork(
      "botanical-evidence",
      "A grand brass-and-glass herbarium with botanical specimens, extraction benches, historical records, laboratory characterization, human-study symbols, and an uncertainty archive."
    ),
    landmark: { label: "Evidence bridge", x: 50, y: 41 },
    drop: { x: 50, y: 70, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Identity",
        title: "Common name is not enough",
        detail:
          "Botanical name, plant part, source, extraction or preparation, composition, contaminants, and lot consistency can change what the ingredient is."
      },
      {
        eyebrow: "Tradition",
        title: "Historical use is meaningful context, not automatic proof",
        detail:
          "Traditional practice can guide questions and respectful sourcing while remaining distinct from controlled evidence for a modern finished product."
      },
      {
        eyebrow: "Dose",
        title: "Extract ratios and marker compounds need interpretation",
        detail:
          "Concentration language does not by itself establish exposure, bioavailability, benefit, or safety."
      },
      {
        eyebrow: "Evidence",
        title: "Study design decides what can be concluded",
        detail:
          "Population, comparator, duration, outcomes, sample size, blinding, product identity, and replication shape confidence."
      },
      {
        eyebrow: "Interactions",
        title: "Natural does not mean universally compatible",
        detail:
          "Botanicals can interact with medicines, conditions, procedures, pregnancy, or other supplements. Qualified guidance may be needed."
      },
      {
        eyebrow: "Stewardship",
        title: "Traceability includes people and ecosystems",
        detail:
          "Authentication, adulteration control, harvest pressure, labor, biodiversity, and supplier relationships belong in responsible botanical sourcing."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Botanicals carry aroma, culture, chemistry, and uncertainty together. Respect the story—and still ask what was tested."
      }
    ]
  },
  {
    id: "health-sugar-sweetener",
    title: "Sweetness Has More Than One Source",
    eyebrow: "Formulation · Sugars and sweeteners",
    summary:
      "Added sugars, naturally occurring sugars, low- and no-calorie sweeteners, serving size, taste, energy, and the whole dietary pattern need separate attention.",
    checkpoint: "Sweetener to serving",
    motion: "orbit",
    artwork: healthArtwork(
      "flavor-balance",
      "A circular sensory balancing chamber where separate sweetness, acid, botanical bitterness, fruit, mineral, aroma, and texture streams converge into one tasting glass."
    ),
    landmark: { label: "Sweetness prism", x: 28, y: 43 },
    drop: { x: 50, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Label",
        title: "Total sugars and added sugars answer different questions",
        detail:
          "In the U.S. Nutrition Facts framework, total sugars include naturally occurring and added sugars, while added sugars are declared separately for conventional foods."
      },
      {
        eyebrow: "Serving",
        title: "Front-of-package language can hide the arithmetic",
        detail:
          "Compare grams per serving, servings per package, likely consumption, and other sugar sources in the day."
      },
      {
        eyebrow: "Alternatives",
        title: "Low- and no-calorie sweeteners differ",
        detail:
          "Sweetness potency, temporal profile, aftertaste, stability, regulatory status, use level, and individual tolerance vary by ingredient."
      },
      {
        eyebrow: "Function",
        title: "Sugar can do more than taste sweet",
        detail:
          "It can influence body, solids, freezing point, browning, fermentation potential, preservation context, and flavor release."
      },
      {
        eyebrow: "Pattern",
        title: "One drink belongs inside a whole diet",
        detail:
          "A useful choice considers frequency, portion, overall nutrient pattern, preferences, goals, and any qualified dietary guidance."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Sweetness is not one switch. Source, amount, timing, aftertaste, texture, and the rest of the formula all change what you perceive."
      }
    ]
  },
  {
    id: "health-acid-flavor-mask",
    title: "Flavor Carries the Formula",
    eyebrow: "Sensory · Acids, aroma, bitterness, and texture",
    summary:
      "Acids and flavors can make minerals, proteins, fibers, botanicals, and sweeteners drinkable without erasing their chemical and sensory effects.",
    checkpoint: "Function to palate",
    motion: "reassemble",
    artwork: healthArtwork(
      "flavor-balance",
      "A flavor-detective laboratory where colorful ingredient streams orbit and recombine around a central tasting glass and sensory comparison flight."
    ),
    landmark: { label: "Flavor convergence", x: 50, y: 48 },
    drop: { x: 50, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Acid",
        title: "pH and titratable acidity are related, not identical",
        detail:
          "pH reflects hydrogen-ion activity while titratable acidity estimates acid neutralization under the chosen method; both can matter for flavor and process."
      },
      {
        eyebrow: "Masking",
        title: "Flavor can redirect attention, not remove material",
        detail:
          "Vanilla, cocoa, fruit, spice, salt, sweetness, and aroma strategies may soften bitterness or off-notes, but the underlying ingredient and exposure remain."
      },
      {
        eyebrow: "Texture",
        title: "Body changes intensity and timing",
        detail:
          "Protein, fiber, hydrocolloids, oil droplets, particles, and carbonation can change aroma release, coating, dryness, and aftertaste."
      },
      {
        eyebrow: "Stability",
        title: "Flavor can drift during shelf life",
        detail:
          "Oxidation, light, heat, scalping into packaging, ingredient reactions, and microbial change can alter the sensory profile."
      },
      {
        eyebrow: "Panel",
        title: "Controlled comparisons reveal tradeoffs",
        detail:
          "Blind or coded samples, consistent temperature and portion, defined attributes, and repeat observations reduce expectation bias."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Flavor is where the formula tells on itself. Acidity, bitterness, aroma, texture, temperature, and aftertaste reveal hidden process choices."
      }
    ]
  },
  {
    id: "health-emulsion-suspension",
    title: "Hold the Formula Together",
    eyebrow: "Physical stability · Emulsions and suspensions",
    summary:
      "Droplets, particles, proteins, fibers, interfaces, viscosity, density, charge, and time determine whether a beverage stays acceptably uniform.",
    checkpoint: "Mix to shelf",
    motion: "cutaway",
    artwork: healthArtwork(
      "physical-stability",
      "A deconstructed physical-stability laboratory with oil droplets, particles, networks, a central mixing vessel, settling and creaming columns, and time-lapse samples."
    ),
    landmark: { label: "Stability vessel", x: 50, y: 44 },
    drop: { x: 50, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Emulsion",
        title: "Oil and water need a managed interface",
        detail:
          "Droplet size, emulsifier selection, homogenization, viscosity, density, pH, minerals, heat, and storage influence creaming and coalescence."
      },
      {
        eyebrow: "Suspension",
        title: "Particles respond to size, density, and flow",
        detail:
          "Sedimentation can be slowed or managed through particle control, viscosity, structured fluids, processing, and an honest shake instruction where appropriate."
      },
      {
        eyebrow: "Protein",
        title: "Aggregation can look like sediment or graininess",
        detail:
          "Heat, acidity, minerals, storage, and ingredient interactions can change protein solubility and network formation."
      },
      {
        eyebrow: "Distinction",
        title: "Physical separation is not the same as microbial spoilage",
        detail:
          "A product may separate without being unsafe or appear uniform while carrying a microbiological hazard. Each needs its own evaluation."
      },
      {
        eyebrow: "Specification",
        title: "Acceptable stability is product-specific",
        detail:
          "Design intent, package, serving ritual, storage, sensory expectations, and validated shelf life define what change is acceptable."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Uniform appearance is an engineered state. Watch interfaces, particles, proteins, viscosity, temperature, motion, and time."
      }
    ]
  },
  {
    id: "health-serving-exposure",
    title: "Do the Serving Math",
    eyebrow: "Exposure · Amount, frequency, and accumulation",
    summary:
      "One serving, one package, repeated use, other foods, supplements, and medicines can produce very different total exposures.",
    checkpoint: "Package to pattern",
    motion: "rotate",
    artwork: healthArtwork(
      "serving-exposure",
      "A brass serving observatory where one package divides into measured portions, daily sources accumulate on an abacus, and a clockwork timeline tracks repeat exposure."
    ),
    landmark: { label: "Serving divider", x: 50, y: 37 },
    drop: { x: 50, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Step 1",
        title: "Find the labeled serving",
        detail:
          "Record the serving size, amount of each relevant ingredient or nutrient, and servings per package where disclosed."
      },
      {
        eyebrow: "Step 2",
        title: "Compare the amount actually consumed",
        detail:
          "A full package, concentrated shot, powder scoop, or café preparation may not equal one labeled serving."
      },
      {
        eyebrow: "Step 3",
        title: "Add repeat occasions",
        detail:
          "Frequency and duration can matter as much as a single use, especially when the same ingredient appears in multiple products."
      },
      {
        eyebrow: "Step 4",
        title: "Include the rest of the intake pattern",
        detail:
          "Foods, fortified beverages, supplements, prescriptions, and over-the-counter products may contribute overlapping nutrients or bioactive ingredients."
      },
      {
        eyebrow: "Step 5",
        title: "Interpret with the right context",
        detail:
          "Age, body size, life stage, health conditions, medications, activity, and qualified professional guidance can change relevance."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "The package tells one unit of the story. Your real exposure is amount times servings times frequency, plus every other source."
      }
    ]
  },
  {
    id: "health-sensitive-context",
    title: "Pause at the Consultation Door",
    eyebrow: "Individual context · Interactions and life stages",
    summary:
      "Medicines, procedures, pregnancy, breastfeeding, childhood, allergies, illness, and intensive treatment can change whether an ingredient is appropriate.",
    checkpoint: "General information to personal decision",
    motion: "glide",
    artwork: healthArtwork(
      "serving-exposure",
      "A calm measurement hall with serving arithmetic, sensitive-population symbols, an interaction pathway, and a warmly lit consultation doorway."
    ),
    landmark: { label: "Consultation door", x: 71, y: 59 },
    drop: { x: 50, y: 70, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Medicines",
        title: "Ingredients can alter or be altered by medications",
        detail:
          "Possible interactions can involve absorption, metabolism, clotting, blood pressure, glucose, sedation, stimulation, or other pathways."
      },
      {
        eyebrow: "Procedures",
        title: "Surgery and testing create special timing questions",
        detail:
          "Some ingredients can affect bleeding, anesthesia, laboratory results, or preparation instructions; the care team should know what is being used."
      },
      {
        eyebrow: "Life stage",
        title: "Pregnancy and breastfeeding need specific review",
        detail:
          "Safety evidence can be limited, and tolerable exposures or ingredient recommendations may differ. Consult qualified prenatal or clinical care."
      },
      {
        eyebrow: "Children",
        title: "Adult formulations are not automatically child-appropriate",
        detail:
          "Body size, nutrient needs, stimulant exposure, sweeteners, botanicals, serving sizes, and evidence may differ substantially."
      },
      {
        eyebrow: "Boundary",
        title: "Education is not individualized medical advice",
        detail:
          "Bring the product label, ingredient amounts, frequency, goals, health history, and medication list to a pharmacist, dietitian, or clinician when needed."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "A general product story ends at this door. Personal suitability belongs with qualified care and the complete ingredient record."
      }
    ]
  },
  {
    id: "health-pilot-formulation",
    title: "Scale the Formula Carefully",
    eyebrow: "Pilot plant · Sequence and process",
    summary:
      "Bench success must survive ingredient staging, order of addition, mixing, heat, transfer, homogenization, filling, sanitation, and scale.",
    checkpoint: "Beaker to pilot line",
    motion: "glide",
    artwork: healthArtwork(
      "pilot-plant",
      "A complete brass, stainless, and teal-glass pilot line linking bench formula, ingredient staging, powder induction, high-shear mixing, heat exchange, homogenization, deaeration, and small-batch filling while Hummin observes."
    ),
    landmark: { label: "Pilot line", x: 50, y: 55 },
    drop: { x: 50, y: 69, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Formula",
        title: "Mass balance begins with named specifications",
        detail:
          "Ingredient identity, concentration, purity, water contribution, overages where justified, target yield, and processing losses need documented assumptions."
      },
      {
        eyebrow: "Sequence",
        title: "Order of addition can prevent or create defects",
        detail:
          "Proteins, hydrocolloids, minerals, acids, emulsifiers, flavors, and cultures may require different hydration and addition conditions."
      },
      {
        eyebrow: "Scale",
        title: "The same rpm is not the same mixing environment",
        detail:
          "Vessel geometry, impeller, tip speed, power, flow, heat transfer, residence time, and shear history change with scale."
      },
      {
        eyebrow: "Process",
        title: "Every treatment changes more than one property",
        detail:
          "Heat, pressure, homogenization, deaeration, filtration, or hold time can affect safety, nutrients, flavor, color, texture, and stability."
      },
      {
        eyebrow: "Records",
        title: "A reproducible batch leaves a trail",
        detail:
          "Lots, weights, times, temperatures, speeds, pressures, samples, deviations, yields, sanitation, and operator observations support learning and control."
      },
      {
        eyebrow: "People",
        title: "Change control protects the formula",
        detail:
          "Supplier, ingredient, equipment, package, claim, and process changes need review because effects can appear far downstream."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 10,
        text:
          "Scale-up is not enlargement. Geometry, energy, heat, time, sequence, sanitation, and measurement must recreate the intended product."
      }
    ]
  },
  {
    id: "health-microbial-control",
    title: "Build Safety into the Route",
    eyebrow: "Food safety · Hazard analysis and controls",
    summary:
      "Ingredient hazards, water, personnel, environment, sanitation, process, package, storage, and distribution require a product-specific preventive system.",
    checkpoint: "Hazard to verified control",
    motion: "cutaway",
    artwork: healthArtwork(
      "quality-stability",
      "A complete quality hall with hygienic zones, protected product transfer, cold, ambient, and warm chambers, microbiology and chemistry benches, and a central sample path."
    ),
    landmark: { label: "Protected sample path", x: 50, y: 47 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Hazards",
        title: "Biological, chemical, and physical hazards differ",
        detail:
          "A hazard analysis considers ingredients, process, equipment, environment, allergens, packaging, storage, intended use, and reasonably foreseeable handling."
      },
      {
        eyebrow: "Process",
        title: "No preservation method is universal",
        detail:
          "Heat, refrigeration, acidity, preservatives, filtration, high pressure, aseptic processing, or combinations require product-specific validation and regulatory review."
      },
      {
        eyebrow: "Sanitation",
        title: "Hygienic design supports repeatable cleaning",
        detail:
          "Accessible surfaces, drainage, compatible materials, controlled connections, validated cycles, verification, and environmental monitoring reduce hidden risk."
      },
      {
        eyebrow: "Monitoring",
        title: "A critical number needs an action plan",
        detail:
          "Limits, frequency, responsibility, instruments, records, deviations, corrective actions, verification, and disposition belong together."
      },
      {
        eyebrow: "Boundary",
        title: "Sensory quality cannot certify safety",
        detail:
          "Pathogens or hazards may be present without obvious odor, appearance, or taste; validated controls and testing plans answer different questions."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Safety is not a final test. It is a chain of identified hazards, validated controls, monitoring, corrective action, verification, and records."
      }
    ]
  },
  {
    id: "health-stability-shelf-life",
    title: "Watch the Product Age",
    eyebrow: "Shelf life · Chemical, physical, microbial, and sensory change",
    summary:
      "A shelf-life claim must survive realistic time, temperature, light, oxygen, motion, package, opening, and distribution conditions.",
    checkpoint: "Fresh fill to end of life",
    motion: "rotate",
    artwork: healthArtwork(
      "quality-stability",
      "A stability observatory with cold, ambient, and warm chambers, real-time and accelerated sample paths, package inspection, microscopy, chemistry, and sensory stations."
    ),
    landmark: { label: "Stability chambers", x: 50, y: 25 },
    drop: { x: 50, y: 63, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Dimensions",
        title: "Shelf life has several failure modes",
        detail:
          "Microbial growth, nutrient loss, oxidation, flavor drift, color change, separation, sediment, viscosity, gas, pressure, seal loss, and package interaction may limit life."
      },
      {
        eyebrow: "Design",
        title: "Real-time storage anchors the claim",
        detail:
          "Accelerated studies can inform risk and comparison, but relationships with real conditions must be understood rather than assumed."
      },
      {
        eyebrow: "Distribution",
        title: "Temperature excursions and vibration belong in the study",
        detail:
          "Warehouse, freight, parcel delivery, retail display, consumer transport, and repeated opening can differ from a quiet laboratory shelf."
      },
      {
        eyebrow: "Package",
        title: "Barrier and closure are part of the formula",
        detail:
          "Oxygen, moisture, light, gas, seal integrity, headspace, migration, adsorption, and compatibility can affect product stability."
      },
      {
        eyebrow: "Claim",
        title: "Declared amounts need end-of-life support",
        detail:
          "When nutrient, culture, or other quantitative claims depend on retention, the test plan should address variability and the labeled storage period."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Shelf life is a prediction supported by evidence. Test the actual formula, package, conditions, measurements, and failure criteria."
      }
    ]
  },
  {
    id: "health-qa-label-allergen",
    title: "Release the Right Lot",
    eyebrow: "Quality · Specification, claims, and allergens",
    summary:
      "A releasable lot connects supplier identity, in-process controls, finished specifications, package, label, allergens, traceability, and authorized claims.",
    checkpoint: "Batch record to release",
    motion: "reassemble",
    artwork: healthArtwork(
      "evidence-hall",
      "A claims and quality archive with botanical specimens, beverage samples, supplier ledgers, package pathways, and a central evidence prism for lot release."
    ),
    landmark: { label: "Release prism", x: 50, y: 34 },
    drop: { x: 50, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Identity",
        title: "Supplier approval does not replace receiving checks",
        detail:
          "Material identity, lot, condition, documentation, storage, allergen status, expiry, and risk-based verification establish what entered the batch."
      },
      {
        eyebrow: "Specification",
        title: "Release criteria should be defined before results arrive",
        detail:
          "Chemical, physical, microbiological, sensory, package, label, and documentation criteria need methods, limits, responsibilities, and deviation rules."
      },
      {
        eyebrow: "Claims",
        title: "Substantiation connects wording to evidence",
        detail:
          "Formula, ingredient forms, quantities, analytical support, stability, human evidence, target population, and actual advertising context should agree."
      },
      {
        eyebrow: "Allergens",
        title: "Control is larger than bold type",
        detail:
          "Supplier information, segregation, scheduling, sanitation, rework, label reconciliation, verification, and service communication all matter."
      },
      {
        eyebrow: "Traceability",
        title: "One step back and forward is only the beginning",
        detail:
          "Ingredient lots, transformations, packaging lots, shipments, complaints, retention samples, and recall readiness create usable product history."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Quality release is a connected decision: the right materials, process, test results, package, label, claims, allergens, and records."
      }
    ]
  },
  {
    id: "health-package-distribution",
    title: "The Package Joins the Formula",
    eyebrow: "Commercial chain · Barrier, storage, and custody",
    summary:
      "Container, closure, light and oxygen barrier, headspace, format, secondary pack, warehouse, transport, and display keep changing the product story.",
    checkpoint: "Fill to market",
    motion: "glide",
    artwork: healthArtwork(
      "package-to-guest",
      "An evening SIP Academy route connecting generic bottles, cartons and cans to package barriers, warehouse custody, transport, retail coolers, ambient shelves, café service, and a final table."
    ),
    landmark: { label: "Custody route", x: 55, y: 31 },
    drop: { x: 50, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Compatibility",
        title: "Product and package can exchange more than heat",
        detail:
          "Migration, adsorption, flavor scalping, corrosion, stress cracking, gas transfer, light, oxygen, and closure interactions require evaluation."
      },
      {
        eyebrow: "Format",
        title: "Bottle, can, carton, pouch, and concentrate change use",
        detail:
          "Portion, reclosure, mixing accuracy, tamper evidence, portability, shelf protection, recyclability, and service behavior differ."
      },
      {
        eyebrow: "Storage",
        title: "Ambient and refrigerated products need different discipline",
        detail:
          "A cold-chain claim requires controlled receiving, storage, transport, display, monitoring, and response to excursions."
      },
      {
        eyebrow: "Custody",
        title: "Lot identity must travel with the product",
        detail:
          "Case codes, pallet records, shipments, locations, returns, complaints, and recall systems preserve accountability beyond the factory."
      },
      {
        eyebrow: "Sustainability",
        title: "Impact belongs to the whole system",
        detail:
          "Ingredient sourcing, water, energy, yield loss, refrigeration, package mass, recycled content, recoverability, transport, and waste can trade off."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "The package becomes part of the experiment. Barrier, closure, storage, transport, display, and opening continue the formulation."
      }
    ]
  },
  {
    id: "health-sensory-informed-choice",
    title: "Choose with the Whole Story",
    eyebrow: "Final field table · Sensory, context, and agency",
    summary:
      "The guest reconnects intended use, complete ingredients, serving math, evidence, cautions, package condition, sensory quality, and personal context.",
    checkpoint: "Evidence to informed choice",
    motion: "reassemble",
    artwork: healthArtwork(
      "package-to-guest",
      "A warm evening Botanical Evidence Conservatory terrace where adult Sippy and Roma, Hummin, an adult guest, small tasting samples, package routes, and a consultation table reconnect the full system."
    ),
    landmark: { label: "Informed table", x: 50, y: 62 },
    drop: { x: 50, y: 66, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Purpose",
        title: "Name what you want the drink to do",
        detail:
          "Hydration, convenient nutrition, supplementation, sensory pleasure, or another goal creates a clearer basis for comparison."
      },
      {
        eyebrow: "Composition",
        title: "Read beyond the featured ingredient",
        detail:
          "Check the full ingredient list, nutrient and active amounts, serving count, sugars and sweeteners, allergens, stimulants, cultures, and supporting additives."
      },
      {
        eyebrow: "Evidence",
        title: "Match confidence to the actual support",
        detail:
          "Distinguish composition, plausible mechanism, traditional use, preliminary findings, stronger human evidence, and uncertain transfer to the finished drink."
      },
      {
        eyebrow: "Sensory",
        title: "Enjoyment is useful information",
        detail:
          "Appearance, aroma, sweetness, acidity, bitterness, texture, temperature, aftertaste, and portion influence whether a product fits its intended use."
      },
      {
        eyebrow: "Boundary",
        title: "Know when to ask for help",
        detail:
          "Medication, pregnancy, childhood, allergy, illness, surgery, unusual symptoms, or intensive supplementation can justify pharmacist, dietitian, or clinician review."
      },
      {
        eyebrow: "Agency",
        title: "Not choosing is also a valid choice",
        detail:
          "A product can be interesting, well made, and still unnecessary for a particular person, day, budget, or goal."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Taste with curiosity, read with precision, and choose without pressure. A good beverage story gives you more agency, not more fear."
      },
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "You have crossed the whole system—from promise and formula to evidence, package, person, and the freedom to decide."
      }
    ]
  }
];

const healthScenes: BeyondTheGlassScene[] = healthSceneSeeds.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / healthSceneSeeds.length, (index + 1) / healthSceneSeeds.length]
}));

export const healthFieldTrip: BeyondTheGlassChapter = {
  slug: "health-drinks",
  title: "Beyond The Glass",
  chapterTitle: "Health Drinks · From Promise to Proof",
  subject: "An evidence-first functional and wellness beverage field trip",
  description:
    "A visual SIP Academy journey through category and claim literacy, water, electrolytes, proteins, fibers, live cultures, micronutrients, botanicals, sweetness, flavor, physical stability, exposure math, sensitive contexts, pilot formulation, food safety, shelf life, quality release, packaging, distribution, sensory evaluation, and informed choice.",
  coreMessage:
    "A functional beverage is not a halo ingredient: intended use, complete composition, serving and total exposure, strength of evidence, process, stability, package, individual context, and honest uncertainty keep the promise connected to reality.",
  assets: {
    academyMap: "/beyond-the-glass/health-drinks/academy-gate-1600.webp",
    academyMapSet:
      "/beyond-the-glass/health-drinks/academy-gate-960.webp 960w, /beyond-the-glass/health-drinks/academy-gate-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/health-drinks/evidence-hall-960.webp"
  },
  scenes: healthScenes,
  sources: [
    {
      id: "health-fda-nutrition-facts",
      organization: "U.S. Food and Drug Administration",
      title: "Changes to the Nutrition Facts Label",
      url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/changes-nutrition-facts-label",
      note:
        "Primary U.S. reference for serving information, calories, nutrients, Daily Values, total and added sugars, and conventional-food label interpretation."
    },
    {
      id: "health-fda-supplement-labeling",
      organization: "U.S. Food and Drug Administration",
      title: "Dietary Supplement Labeling Guide",
      url: "https://www.fda.gov/food/dietary-supplements-guidance-documents-regulatory-information/dietary-supplement-labeling-guide",
      note:
        "Primary U.S. reference for dietary-supplement identity statements, Supplement Facts, ingredient lists, net quantity, responsible-firm information, and label presentation."
    },
    {
      id: "health-fda-structure-function-claims",
      organization: "U.S. Food and Drug Administration",
      title: "Structure/Function Claims",
      url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/structurefunction-claims",
      note:
        "Official U.S. context for conventional-food and dietary-supplement structure/function claims, disease-claim boundaries, notifications, and disclaimers."
    },
    {
      id: "health-ftc-health-products-guidance",
      organization: "Federal Trade Commission",
      title: "Health Products Compliance Guidance",
      url: "https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance",
      note:
        "Primary U.S. advertising-substantiation reference supporting clear claim interpretation, competent and reliable scientific evidence, study relevance, disclosures, endorsements, and total-ad context."
    },
    {
      id: "health-nih-ods-what-you-need-to-know",
      organization: "National Institutes of Health Office of Dietary Supplements",
      title: "Dietary Supplements: What You Need to Know",
      url: "https://ods.od.nih.gov/factsheets/WYNTK-Consumer/",
      note:
        "Authoritative consumer reference for supplement identity, evidence limits, quality, medication interactions, surgery, pregnancy, children, adverse effects, and qualified professional consultation."
    },
    {
      id: "health-nih-ods-probiotics",
      organization: "National Institutes of Health Office of Dietary Supplements",
      title: "Probiotics: Fact Sheet for Health Professionals",
      url: "https://ods.od.nih.gov/factsheets/Probiotics-HealthProfessional/",
      note:
        "Authoritative context for probiotic definitions, strain specificity, viable counts, storage, product variability, evidence, safety, and cautions for vulnerable populations."
    },
    {
      id: "health-nih-ods-botanical-background",
      organization: "National Institutes of Health Office of Dietary Supplements",
      title: "Botanical Dietary Supplements Background Information",
      url: "https://ods.od.nih.gov/factsheets/BotanicalBackground-Consumer/",
      note:
        "Authoritative context for botanical identity, plant parts, preparations and extracts, standardization, evidence, quality, interactions, and safety considerations."
    },
    {
      id: "health-nih-ods-magnesium",
      organization: "National Institutes of Health Office of Dietary Supplements",
      title: "Magnesium: Fact Sheet for Health Professionals",
      url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/",
      note:
        "Example micronutrient reference showing dietary sources, supplement forms, intake recommendations, upper-limit context, interactions, and population considerations."
    },
    {
      id: "health-nih-ods-potassium",
      organization: "National Institutes of Health Office of Dietary Supplements",
      title: "Potassium: Fact Sheet for Health Professionals",
      url: "https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/",
      note:
        "Authoritative electrolyte context for physiological roles, food and supplement sources, intake, health conditions, medication interactions, and safety."
    },
    {
      id: "health-national-academies-dri",
      organization: "National Academies of Sciences, Engineering, and Medicine",
      title: "Dietary Reference Intakes Tables and Application",
      url: "https://www.nationalacademies.org/our-work/summary-report-of-the-dietary-reference-intakes",
      note:
        "Primary framework for Recommended Dietary Allowances, Adequate Intakes, Tolerable Upper Intake Levels, and careful application across age and life-stage groups."
    },
    {
      id: "health-fda-preventive-controls",
      organization: "U.S. Food and Drug Administration",
      title: "FSMA Final Rule for Preventive Controls for Human Food",
      url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-preventive-controls-human-food",
      note:
        "Primary U.S. food-safety framework for hazard analysis, preventive controls, sanitation, supply chain, allergens, monitoring, corrective action, verification, records, and recall planning."
    },
    {
      id: "health-fda-food-allergies",
      organization: "U.S. Food and Drug Administration",
      title: "Food Allergies",
      url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies",
      note:
        "Official U.S. reference for major food allergen labeling, cross-contact context, consumer safety, recalls, and current allergen information."
    },
    {
      id: "health-fda-food-labeling-guide",
      organization: "U.S. Food and Drug Administration",
      title: "Food Labeling Guide",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-food-labeling-guide",
      note:
        "Primary U.S. conventional-food labeling reference for statement of identity, net quantity, ingredient declaration, nutrition labeling, claims, and responsible-firm information."
    },
    {
      id: "health-fda-bottled-water",
      organization: "U.S. Food and Drug Administration",
      title: "Bottled Water Everywhere: Keeping it Safe",
      url: "https://www.fda.gov/consumers/consumer-updates/bottled-water-everywhere-keeping-it-safe",
      note:
        "Official U.S. context for bottled-water regulation, source and treatment language, quality standards, manufacturing practice, and label identity."
    },
    {
      id: "health-codex-nutrition-labeling",
      organization: "Codex Alimentarius Commission",
      title: "Guidelines on Nutrition Labelling (CXG 2-1985)",
      url: "https://www.fao.org/fao-who-codexalimentarius/codex-texts/guidelines/en/",
      note:
        "International food-standard context for nutrition declarations, nutrient reference values, serving or portion expression, presentation, and non-misleading nutrition information."
    },
    {
      id: "health-who-healthy-diet",
      organization: "World Health Organization",
      title: "Healthy Diet",
      url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
      note:
        "Authoritative global context for dietary patterns, free sugars, sodium, fats, fruits and vegetables, and the principle that individual products belong within an overall diet."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
