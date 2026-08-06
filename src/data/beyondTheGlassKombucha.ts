import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const kombuchaArtwork = (
  filename: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/kombucha/${filename}-1600.webp`,
  srcSet: `/beyond-the-glass/kombucha/${filename}-960.webp 960w, /beyond-the-glass/kombucha/${filename}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/kombucha/${filename}-portrait-960.webp`,
  portraitSrcSet: `/beyond-the-glass/kombucha/${filename}-portrait-640.webp 640w, /beyond-the-glass/kombucha/${filename}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

type KombuchaSceneSeed = Omit<BeyondTheGlassScene, "number" | "range">;

const kombuchaSceneSeeds: KombuchaSceneSeed[] = [
  {
    id: "kombucha-culture-house-gate",
    title: "The Culture House Gate",
    eyebrow: "SIP Academy · Kombucha",
    summary:
      "Tea, sugar, water, microbes, oxygen, time, temperature, and human control meet inside one living production system.",
    checkpoint: "Academy to culture house",
    motion: "establish",
    artwork: kombuchaArtwork(
      "academy-gate",
      "Adult guides Sippy and Roma and the ivory robot Hummin arrive at a sunrise brass-and-glass Kombucha Culture House surrounded by tea fields and luminous waterways."
    ),
    landmark: { label: "Culture House", x: 51, y: 38 },
    drop: { x: 50, y: 68, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Foundation",
        title: "Kombucha is a managed fermentation",
        detail:
          "A brewed, sweetened tea or other suitable substrate is inoculated with an active mixed culture, then monitored as microbes transform it."
      },
      {
        eyebrow: "Culture",
        title: "SCOBY describes a community, not one organism",
        detail:
          "Yeasts and bacteria vary among cultures and producers. The visible pellicle can be part of the system, but active liquid culture also matters."
      },
      {
        eyebrow: "Control",
        title: "A living process still needs specifications",
        detail:
          "Ingredient identity, sanitation, inoculum, time, temperature, oxygen, acidity, alcohol, carbonation, and package stability all need deliberate control."
      },
      {
        eyebrow: "Boundary",
        title: "Alcohol status can change after packaging",
        detail:
          "In the United States, TTB rules apply when kombucha reaches 0.5% alcohol by volume or more at any point, including after bottling."
      },
      {
        eyebrow: "Route",
        title: "Tea → culture → package → guest",
        detail:
          "This field trip follows the full system without treating one recipe, organism mix, flavor, or finishing choice as universal."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Welcome to the Culture House. Kombucha feels alive because it is a managed relationship among ingredients, microbes, environment, and people."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "I’ll keep culture identity, process controls, alcohol, pressure, lot custody, and cold-chain decisions connected."
      }
    ]
  },
  {
    id: "kombucha-system-map",
    title: "Tea to Living Culture",
    eyebrow: "System map · One connected route",
    summary:
      "A luminous path connects extraction, inoculation, fermentation, flavor, stabilization, package, distribution, service, and sensory evidence.",
    checkpoint: "Ingredient to guest",
    motion: "glide",
    artwork: kombuchaArtwork(
      "academy-gate",
      "A wide Kombucha Culture House campus with tea garden, brewing hall, fermentation conservatory, quality laboratory, packaging wing, cold store, and service terrace connected by glowing paths."
    ),
    landmark: { label: "Living process map", x: 50, y: 52 },
    drop: { x: 52, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Inputs",
        title: "Every batch begins with named materials",
        detail:
          "Water, tea or substrate, sugar source, active culture, and any later flavor ingredients each bring quality, safety, allergen, and traceability questions."
      },
      {
        eyebrow: "Transformation",
        title: "The process is sequential and overlapping",
        detail:
          "Tea extraction, cooling, inoculation, yeast activity, bacterial activity, acid development, flavoring, carbonation, and storage affect one another."
      },
      {
        eyebrow: "Evidence",
        title: "Measurements and sensory checks tell different truths",
        detail:
          "pH, titratable acidity, soluble solids, alcohol, pressure, temperature, appearance, aroma, and flavor are related but not interchangeable."
      },
      {
        eyebrow: "Handoff",
        title: "Control continues beyond the fermenter",
        detail:
          "Stabilization choice, filling, package integrity, refrigeration, transport, retail display, draft hygiene, and guest communication remain part of the product."
      },
      {
        eyebrow: "Study method",
        title: "Follow cause before memorizing claims",
        detail:
          "Ask what entered, what changed it, what controlled the change, what evidence was measured, and what must remain stable."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "We are not touring a sequence of rooms. We are tracing one system whose decisions stay connected all the way to the guest."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Every sensory clue has a route backward—to tea, culture, time, temperature, flavor, package, or service."
      }
    ]
  },
  {
    id: "kombucha-water-tea-foundation",
    title: "Water Meets the Leaf",
    eyebrow: "Foundation · Extraction",
    summary:
      "Water chemistry, tea identity, dose, temperature, time, and filtration create the base the culture will inherit.",
    checkpoint: "Water to tea liquor",
    motion: "push-in",
    artwork: kombuchaArtwork(
      "sweet-tea",
      "A brass-and-glass sweet-tea preparation laboratory showing treated water, measured tea leaves, a steeping vessel, filtration, and a clear path toward cooling."
    ),
    landmark: { label: "Tea extractor", x: 30, y: 45 },
    drop: { x: 18, y: 55, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Water",
        title: "Water is both ingredient and extraction medium",
        detail:
          "Mineral content, alkalinity, disinfectant residuals, taste, odor, and microbiological fitness can affect extraction, fermentation, and finished sensory quality."
      },
      {
        eyebrow: "Tea",
        title: "Camellia sinensis supplies a real sensory foundation",
        detail:
          "Tea type, origin, grade, freshness, storage, and extraction method influence color, bitterness, astringency, aroma, and nutrients available to the culture."
      },
      {
        eyebrow: "Extraction",
        title: "Time and temperature change what enters solution",
        detail:
          "Hotter or longer extraction does not simply mean better; the producer targets repeatable tea character while avoiding uncontrolled harshness."
      },
      {
        eyebrow: "Filtration",
        title: "Leaf separation protects the next operation",
        detail:
          "Removing spent leaf at the intended point controls continued extraction and keeps later fermentation equipment and transfers predictable."
      },
      {
        eyebrow: "Receiving",
        title: "Ingredient lots need identity before use",
        detail:
          "Supplier, lot, condition, storage, date, and allergen or flavor declarations establish the batch record before fermentation begins."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Before the culture arrives, water and leaf define the stage. Extraction should be intentional, repeatable, and traceable."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Taste the tea before fermentation. Its bitterness, astringency, aroma, and body do not disappear; they become part of the transformation."
      }
    ]
  },
  {
    id: "kombucha-sweet-tea-lab",
    title: "Build the Sweet Tea",
    eyebrow: "Preparation · Sugar and cooling",
    summary:
      "Sugar dissolves into hot tea, then the liquid cools to a culture-safe range before inoculation.",
    checkpoint: "Tea to substrate",
    motion: "cutaway",
    artwork: kombuchaArtwork(
      "sweet-tea",
      "A cutaway SIP Academy preparation line showing tea extraction, sugar dissolution, mixing, sanitary transfer, cooling coils, temperature measurement, and a receiving fermentation vessel."
    ),
    landmark: { label: "Cooling path", x: 68, y: 56 },
    drop: { x: 51, y: 62, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Sugar",
        title: "Sugar is fermentable substrate, not only sweetness",
        detail:
          "Yeasts use available sugars during fermentation. Starting concentration and later processing influence residual sweetness, alcohol potential, acidity, and carbonation."
      },
      {
        eyebrow: "Mixing",
        title: "Dissolution must be even and measured",
        detail:
          "Documented quantities and complete dissolution help the batch begin from a known composition rather than pockets of inconsistent concentration."
      },
      {
        eyebrow: "Cooling",
        title: "Hot tea must not injure the culture",
        detail:
          "The substrate is cooled before inoculation; the exact target belongs to the producer’s validated culture and process specification."
      },
      {
        eyebrow: "Transfer",
        title: "Every hose and fitting is a contact surface",
        detail:
          "Clean design, verified sanitation, protected connections, and controlled transfer reduce contamination and cross-contact risk."
      },
      {
        eyebrow: "Baseline",
        title: "Record the batch before microbes change it",
        detail:
          "Volume, temperature, soluble solids, ingredient lots, appearance, and tea sensory condition form a useful starting record."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "The culture deserves a known starting point: measured ingredients, complete dissolution, clean transfer, and a safe inoculation temperature."
      }
    ]
  },
  {
    id: "kombucha-culture-library",
    title: "Meet the Living Culture",
    eyebrow: "Microbiology · SCOBY ecology",
    summary:
      "Yeasts, acetic acid bacteria, active liquid, and the cellulose pellicle form a variable community rather than a single universal recipe.",
    checkpoint: "Culture to community",
    motion: "orbit",
    artwork: kombuchaArtwork(
      "culture-ecology",
      "A transparent kombucha fermentation vessel with visible liquid culture, surface cellulose pellicle, suspended yeast, bacterial activity, magnified microbe insets, and adult guides in a clean laboratory."
    ),
    landmark: { label: "Culture ecology", x: 51, y: 41 },
    drop: { x: 51, y: 64, size: 8 },
    fieldNotes: [
      {
        eyebrow: "SCOBY",
        title: "The acronym names a symbiotic culture",
        detail:
          "A SCOBY can contain multiple yeasts and bacteria whose composition varies by source, environment, maintenance, and production history."
      },
      {
        eyebrow: "Liquid starter",
        title: "Active fermented liquid carries culture and acidity",
        detail:
          "A producer’s inoculum strategy may rely strongly on mature liquid culture; the visible surface pellicle alone is not the entire fermentation system."
      },
      {
        eyebrow: "Pellicle",
        title: "The surface mat is largely bacterial cellulose",
        detail:
          "Acetic acid bacteria can produce a cellulose layer at the air–liquid interface. Its appearance is not by itself proof of batch quality or safety."
      },
      {
        eyebrow: "Yeast",
        title: "Yeasts unlock fermentable pathways",
        detail:
          "Yeasts hydrolyze and metabolize sugars, producing ethanol, carbon dioxide, and aroma-active compounds that other microbes and later controls influence."
      },
      {
        eyebrow: "Bacteria",
        title: "Acetic acid bacteria need oxygen for key reactions",
        detail:
          "They can oxidize ethanol and other substrates into organic acids. Culture balance and vessel conditions shape the rate and outcome."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Meet a community, not a mascot. The liquid, pellicle, yeasts, bacteria, oxygen, and maintenance history all contribute."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Culture composition varies. Good records describe the actual inoculum and its performance instead of assuming every SCOBY behaves the same."
      }
    ]
  },
  {
    id: "kombucha-first-fermentation",
    title: "The First Fermentation",
    eyebrow: "Vessel · Oxygen, time, temperature",
    summary:
      "A covered, breathable vessel creates a controlled interface where culture, substrate, air, and time begin reshaping the tea.",
    checkpoint: "Inoculation to active ferment",
    motion: "push-in",
    artwork: kombuchaArtwork(
      "first-fermentation",
      "A dedicated first-fermentation room with an open-atmosphere vessel, protective breathable cover, active liquid culture, surface pellicle, measured starter addition, temperature probe, batch clock, and sanitary sampling point."
    ),
    landmark: { label: "Fermentation vessel", x: 50, y: 49 },
    drop: { x: 55, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Inoculation",
        title: "The batch receives a measured active culture",
        detail:
          "Inoculum condition and proportion belong to a validated producer specification; visual pellicle size is not a reliable universal dosing rule."
      },
      {
        eyebrow: "Oxygen",
        title: "Surface access affects acetic acid bacteria",
        detail:
          "A breathable protected cover can admit oxygen while excluding pests and debris. Vessel geometry changes the surface-area relationship."
      },
      {
        eyebrow: "Temperature",
        title: "Fermentation conditions shape rate and ecology",
        detail:
          "Temperature influences microbial activity and sensory development. Stable control matters more than copying one universal number."
      },
      {
        eyebrow: "Time",
        title: "The endpoint is a specification, not a calendar myth",
        detail:
          "Producers follow validated measurements and sensory targets because culture, substrate, vessel, and environment can change the timeline."
      },
      {
        eyebrow: "Protection",
        title: "Breathable does not mean exposed",
        detail:
          "Physical barriers, sanitary rooms, pest control, clean tools, restricted access, and batch separation protect the ferment."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "The first fermentation is a controlled conversation with air. Vessel shape, protection, temperature, culture, and time set its boundaries."
      }
    ]
  },
  {
    id: "kombucha-metabolism-observatory",
    title: "The Metabolism Observatory",
    eyebrow: "Transformation · Sugar, gas, alcohol, acids",
    summary:
      "Yeast and bacteria create an interdependent flow of compounds, but real cultures do not follow one fixed universal pathway.",
    checkpoint: "Sugar to transformation",
    motion: "rotate",
    artwork: kombuchaArtwork(
      "metabolism-observatory",
      "A circular metabolism observatory connecting one active kombucha vessel to separate stations for soluble solids, pH, titratable acidity, alcohol, temperature, pressure, and sensory samples."
    ),
    landmark: { label: "Metabolic pathways", x: 52, y: 38 },
    drop: { x: 52, y: 62, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Sucrose",
        title: "The starting sugar can be split and consumed",
        detail:
          "Microbial enzymes can break sucrose into glucose and fructose, which become available to different organisms and pathways."
      },
      {
        eyebrow: "Ethanol",
        title: "Yeast activity can create alcohol",
        detail:
          "Ethanol is an intermediate and potential finished-product constituent. It must be measured and controlled rather than assumed to disappear."
      },
      {
        eyebrow: "Carbon dioxide",
        title: "Gas may escape or later become carbonation",
        detail:
          "In an open first ferment much carbon dioxide dissipates; closed later conditioning or force carbonation changes pressure and retention."
      },
      {
        eyebrow: "Organic acids",
        title: "Acid development is plural",
        detail:
          "Acetic, gluconic, glucuronic, lactic, and other acids may be reported, but their presence and concentration vary with culture and process."
      },
      {
        eyebrow: "Aroma",
        title: "Metabolism creates more than sourness",
        detail:
          "Esters, aldehydes, higher alcohols, tea compounds, and added flavor ingredients can contribute aroma; balance and condition require sensory evidence."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Sugar does not travel down one straight line. Culture composition and process conditions shape alcohol, gas, acids, and aroma-active compounds."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Taste the transition: tea structure remains while sweetness, acidity, aroma, and carbonation begin negotiating a new balance."
      }
    ]
  },
  {
    id: "kombucha-fermentation-control",
    title: "Read the Fermentation",
    eyebrow: "Control · Measurements and senses",
    summary:
      "A disciplined producer reads acidity, soluble solids, alcohol, temperature, appearance, aroma, flavor, and time together.",
    checkpoint: "Activity to endpoint",
    motion: "cutaway",
    artwork: kombuchaArtwork(
      "quality-stabilization",
      "A kombucha quality observatory with pH meter, titration station, refractometer, alcohol analysis, pressure gauge, sample archive, sensory glasses, and fermentation vessels visible behind the lab."
    ),
    landmark: { label: "Control bench", x: 51, y: 55 },
    drop: { x: 48, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "pH",
        title: "pH describes hydrogen-ion activity",
        detail:
          "It is important for process control and microbial ecology, but it does not directly state total acid concentration or finished sourness."
      },
      {
        eyebrow: "Titratable acidity",
        title: "TA estimates the acid neutralization demand",
        detail:
          "Titratable acidity offers different information from pH and often tracks perceived acid structure more usefully when interpreted with sensory data."
      },
      {
        eyebrow: "Soluble solids",
        title: "Brix is not a finished sugar oracle",
        detail:
          "Refractometer readings become harder to interpret once alcohol, acids, and other dissolved compounds enter the mixture; validated methods matter."
      },
      {
        eyebrow: "Alcohol",
        title: "ABV needs a suitable analytical method",
        detail:
          "Because the matrix is complex and alcohol can change after packaging, producers use appropriate testing and stability controls rather than inference alone."
      },
      {
        eyebrow: "Sensory",
        title: "Condition belongs beside the numbers",
        detail:
          "Appearance, aroma, flavor, acidity, sweetness, tea character, carbonation, and faults help determine whether the measured batch also meets its sensory target."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "No single number finishes the story. pH, titratable acidity, soluble solids, alcohol, temperature, time, and sensory condition answer different questions."
      }
    ]
  },
  {
    id: "kombucha-flavor-crossroads",
    title: "The Flavor Crossroads",
    eyebrow: "Design · Tea, botanicals, fruit",
    summary:
      "A finished base can remain tea-forward or move through carefully controlled fruit, juice, herb, spice, and botanical paths.",
    checkpoint: "Base to expression",
    motion: "glide",
    artwork: kombuchaArtwork(
      "flavor-carbonation",
      "A central kombucha manifold branches into tea-forward, fruit, herb, spice, botanical, and unflavored vessels with clean ingredient stations and a separate carbonation wing."
    ),
    landmark: { label: "Flavor manifold", x: 50, y: 48 },
    drop: { x: 50, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Tea-forward",
        title: "Flavoring is optional",
        detail:
          "A well-made kombucha can foreground tea, fermentation, acidity, and subtle culture-derived aroma without added fruit or botanicals."
      },
      {
        eyebrow: "Fruit",
        title: "Juice and purée bring more than aroma",
        detail:
          "They may add fermentable sugar, acid, pulp, microbes, allergens or cross-contact risk, color, and package-stability questions."
      },
      {
        eyebrow: "Botanicals",
        title: "Identity, dose, and extraction need control",
        detail:
          "Herbs, spices, roots, flowers, and flavor extracts differ in strength, composition, safety considerations, and labeling requirements."
      },
      {
        eyebrow: "Timing",
        title: "When an ingredient enters changes the outcome",
        detail:
          "Pre-fermentation, post-fermentation, and package conditioning expose flavor materials to different microbes, oxygen, time, and pressure."
      },
      {
        eyebrow: "Trial bench",
        title: "Small controlled trials protect the full batch",
        detail:
          "Bench evaluation can compare flavor, stability, sugar contribution, color, sediment, sensory balance, and legal label implications before scale-up."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Flavor is not decoration. Every fruit, herb, spice, or extract changes the sensory evidence and may change fermentation, pressure, stability, or labeling too."
      }
    ]
  },
  {
    id: "kombucha-carbonation-chamber",
    title: "The Carbonation Chamber",
    eyebrow: "Gas · Condition or control",
    summary:
      "Natural package conditioning and controlled carbonation can both create sparkle, but they create different monitoring and pressure responsibilities.",
    checkpoint: "Still to sparkling",
    motion: "orbit",
    artwork: kombuchaArtwork(
      "flavor-carbonation",
      "A split kombucha carbonation chamber showing carefully conditioned bottles in a protected rack on one side and a chilled brite-style tank with controlled carbon dioxide and pressure instrumentation on the other."
    ),
    landmark: { label: "Carbonation paths", x: 70, y: 47 },
    drop: { x: 61, y: 63, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Conditioning",
        title: "Residual fermentation can build package pressure",
        detail:
          "Fermentable material, viable microbes, temperature, time, and package strength interact. Uncontrolled conditioning can create unsafe overpressure."
      },
      {
        eyebrow: "Force carbonation",
        title: "Chilled liquid can receive measured carbon dioxide",
        detail:
          "A controlled tank process separates carbonation adjustment from continued sugar fermentation, though sanitation and package stability still matter."
      },
      {
        eyebrow: "Temperature",
        title: "Cold liquid retains gas more readily",
        detail:
          "Temperature and pressure influence dissolved carbon dioxide, foam, opening behavior, sensory lift, and package performance."
      },
      {
        eyebrow: "Package",
        title: "Bottle, can, and keg have rated limits",
        detail:
          "The producer matches carbonation target and stability plan to suitable containers, closures, seams, valves, handling, and distribution conditions."
      },
      {
        eyebrow: "Service",
        title: "Carbonation changes the sensory presentation",
        detail:
          "Bubble size, intensity, foam, temperature, glass condition, and pour method affect aroma release, texture, acidity, and guest perception."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Sparkle carries responsibility. The maker must know whether pressure comes from continued fermentation, controlled gas addition, or both."
      }
    ]
  },
  {
    id: "kombucha-alcohol-boundary",
    title: "The Alcohol Boundary",
    eyebrow: "Compliance · Fermentation can continue",
    summary:
      "Alcohol created by yeast may be transformed, retained, or regenerated later, so classification depends on verified product behavior—not intention.",
    checkpoint: "Ferment to legal identity",
    motion: "cutaway",
    artwork: kombuchaArtwork(
      "alcohol-boundary",
      "A dedicated alcohol and package-stability checkpoint comparing the same kombucha lot during fermentation, at filling, and after warm and cold storage with alcohol and pressure testing."
    ),
    landmark: { label: "Alcohol analysis", x: 60, y: 62 },
    drop: { x: 58, y: 59, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Threshold",
        title: "0.5% ABV changes U.S. federal treatment",
        detail:
          "TTB states that kombucha at or above 0.5% alcohol by volume at any time—including after bottling—is subject to federal alcohol beverage laws."
      },
      {
        eyebrow: "Dynamics",
        title: "Alcohol can move during the product life",
        detail:
          "Yeast may continue producing ethanol when fermentable sugar and viable cells remain; bacterial conversion and stabilization choices also affect the curve."
      },
      {
        eyebrow: "Testing",
        title: "A suitable method must match the matrix",
        detail:
          "Complex acids, sugars, solids, and carbonation can complicate measurement. Finished-product and shelf-life verification need appropriate analytical methods."
      },
      {
        eyebrow: "Temperature history",
        title: "Warm storage can reactivate change",
        detail:
          "If viable microbes and substrate remain, temperature abuse can alter alcohol, carbonation, acidity, aroma, and package pressure."
      },
      {
        eyebrow: "Label and market",
        title: "Classification affects more than one line of copy",
        detail:
          "Formula, labeling, production, tax, age, distribution, and state requirements may differ; producers need current jurisdiction-specific guidance."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Intent does not set alcohol status. The product’s measured behavior during production, packaging, and shelf life determines which requirements apply."
      }
    ]
  },
  {
    id: "kombucha-quality-safety-lab",
    title: "The Quality & Safety Lab",
    eyebrow: "Verification · The whole control system",
    summary:
      "Sanitation, ingredients, culture, acidity, alcohol, pressure, sensory condition, environment, package, and traceability work as one preventive system.",
    checkpoint: "Observation to release",
    motion: "orbit",
    artwork: kombuchaArtwork(
      "quality-stabilization",
      "A complete kombucha quality and food-safety observatory with sanitation verification, microbiology plates, pH and titration tools, soluble-solids and alcohol testing, pressure gauge, sensory bench, sample archive, and release pathways."
    ),
    landmark: { label: "Release laboratory", x: 50, y: 51 },
    drop: { x: 50, y: 65, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Sanitation",
        title: "Cleanable design precedes clean appearance",
        detail:
          "Food-contact surfaces, dead legs, gaskets, valves, hoses, drains, tools, air flow, and employee practices belong in documented cleaning and verification programs."
      },
      {
        eyebrow: "Acidity",
        title: "Low pH is one control, not a complete safety proof",
        detail:
          "Validated formulation and fermentation controls sit within broader hazard analysis, sanitation, ingredient control, environmental monitoring, and corrective action."
      },
      {
        eyebrow: "Culture condition",
        title: "Normal pellicle is not a universal visual test",
        detail:
          "Surface appearance varies, while unwanted molds or contamination require trained recognition and a defined hold-and-disposition process."
      },
      {
        eyebrow: "Release",
        title: "A specification joins numbers, senses, and records",
        detail:
          "Lot release can consider pH, TA, ABV, soluble solids, pressure, sensory condition, package integrity, sanitation checks, and traceable batch documentation."
      },
      {
        eyebrow: "Corrective action",
        title: "Uncertainty creates a hold, not a guess",
        detail:
          "Out-of-specification results, damaged packages, contamination concerns, or missing records need isolation, investigation, documented disposition, and learning."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Safety does not come from one sour number. It comes from a preventive system that can show what happened, detect departure, and respond."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "A release decision is an evidence bundle: process, sanitation, analysis, sensory condition, package, traceability, and corrective-action status."
      }
    ]
  },
  {
    id: "kombucha-stabilization-crossroads",
    title: "The Stabilization Crossroads",
    eyebrow: "Choice · Live, filtered, thermal, cold",
    summary:
      "Producers choose how much microbial activity and sediment remain, then design processing, refrigeration, carbonation, and shelf life around that choice.",
    checkpoint: "Living culture to stable product",
    motion: "rotate",
    artwork: kombuchaArtwork(
      "quality-stabilization",
      "A kombucha stabilization observatory branching from one finished ferment into cold-live storage, fine filtration, and controlled thermal treatment, each reconnecting to a monitored packaging path."
    ),
    landmark: { label: "Stability paths", x: 76, y: 37 },
    drop: { x: 66, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Live refrigerated",
        title: "Viability requires a controlled product life",
        detail:
          "If active microbes and fermentable substrate remain, cold-chain specification and shelf-life testing help control alcohol, pressure, acidity, and sensory drift."
      },
      {
        eyebrow: "Filtration",
        title: "Pore size and load determine what is removed",
        detail:
          "Clarification and microbial reduction are not identical. Filter selection, integrity, sanitation, fouling, oxygen pickup, and target specification matter."
      },
      {
        eyebrow: "Thermal process",
        title: "Heat can improve stability and change sensory character",
        detail:
          "A validated time–temperature process can reduce viable microbes; flavor, aroma, color, carbonation, package compatibility, and regulatory claims must be considered."
      },
      {
        eyebrow: "Cold storage",
        title: "Refrigeration supports control but does not erase history",
        detail:
          "Cold can slow activity, but it does not repair an uncontrolled ferment, unsuitable package, sanitation failure, or already excessive alcohol or pressure."
      },
      {
        eyebrow: "Truthful identity",
        title: "Process and label should tell the same story",
        detail:
          "Terms such as raw, live, filtered, pasteurized, shelf-stable, and refrigerated need to match the actual process and applicable rules."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "There is no single honest finish. There are different stability paths, each with consequences for microbes, flavor, package, distribution, and claims."
      }
    ]
  },
  {
    id: "kombucha-packaging-line",
    title: "The Packaging Run",
    eyebrow: "Equipment · Bottle, can, keg",
    summary:
      "Clean transfer, oxygen control, accurate fill, secure closure, pressure tolerance, coding, and inspection turn a batch into traceable packages.",
    checkpoint: "Tank to package",
    motion: "glide",
    artwork: kombuchaArtwork(
      "packaging-market",
      "A complete hygienic kombucha filling hall with transfer lines, glass-bottle filler and capper, aluminum-can filler and seamer, stainless kegs, fill inspection, coding, refrigerated hold, and intact packages."
    ),
    landmark: { label: "Filling line", x: 39, y: 57 },
    drop: { x: 44, y: 63, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Transfer",
        title: "The last hose can still change the product",
        detail:
          "Sanitation, temperature, pressure, dissolved gas, oxygen pickup, agitation, and hold time remain active variables between tank and filler."
      },
      {
        eyebrow: "Glass bottle",
        title: "Bottle and closure must suit the pressure plan",
        detail:
          "Container rating, defects, crown or cap application, headspace, light exposure, handling, and breakage controls all influence performance."
      },
      {
        eyebrow: "Can",
        title: "A seam is a precise mechanical seal",
        detail:
          "Can condition, liner compatibility, fill, foam, double-seam setup, teardown inspection, oxygen, and coding require documented control."
      },
      {
        eyebrow: "Keg",
        title: "Reusable packages need complete custody",
        detail:
          "Keg cleaning, valve integrity, fill, pressure, identification, cold storage, delivery, coupler compatibility, and draught-system hygiene stay connected."
      },
      {
        eyebrow: "Inspection",
        title: "Fill, seal, code, and condition earn release",
        detail:
          "Operators verify net contents, closure or seam, leaks, pressure, appearance, lot code, date information, case identity, and hold status."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Packaging is a precision process. Fill, gas, oxygen, seal, pressure, code, case, and cold storage extend the batch record into every unit."
      }
    ]
  },
  {
    id: "kombucha-sustainability-loop",
    title: "The Responsibility Loop",
    eyebrow: "Resources · Measure before claiming",
    summary:
      "Tea, water, energy, cleaning, cooling, packaging, transport, organic by-products, and people reveal where responsibility can become measurable work.",
    checkpoint: "Resource to consequence",
    motion: "orbit",
    artwork: kombuchaArtwork(
      "sustainability-loop",
      "A circular SIP Academy kombucha courtyard connecting tea garden, composted organic material, hygienic vessel washing, water and heat recovery equipment, solar daylighting, returnable bottles, recyclable cans, reusable kegs, and cellulose research."
    ),
    landmark: { label: "Resource loop", x: 51, y: 53 },
    drop: { x: 50, y: 69, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Water",
        title: "Ingredient and cleaning water need separate accounting",
        detail:
          "Metering by process helps identify extraction, cooling, clean-in-place, rinse, sanitation, and utility demand without pretending all recovered water is reusable for food contact."
      },
      {
        eyebrow: "Energy",
        title: "Heating and refrigeration pull in opposite directions",
        detail:
          "Tea extraction, hot-water generation, cooling, fermentation control, cold storage, and delivery create different opportunities for insulation, heat recovery, scheduling, and renewable supply."
      },
      {
        eyebrow: "Organics",
        title: "Spent tea and flavor solids require a real outlet",
        detail:
          "Composting, feed, anaerobic digestion, or disposal suitability depends on local rules, contamination, ingredients, transport, and a verified receiving use."
      },
      {
        eyebrow: "Package",
        title: "Reuse and recycling depend on systems beyond the container",
        detail:
          "Bottle return logistics, wash energy, breakage, can recovery, keg circulation, secondary packaging, distance, and actual local infrastructure shape impact."
      },
      {
        eyebrow: "People",
        title: "Responsible production includes working conditions",
        detail:
          "Safe chemical handling, ergonomics, training, fair scheduling, heat and cold exposure, inclusive service, and honest claims belong beside resource metrics."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "A circular-looking diagram is not proof. Responsibility becomes credible when flows are measured, limits are named, and a real next use exists."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "The guest may see a beautiful bottle. We should still be able to trace water, energy, ingredients, package, labor, and waste behind it."
      }
    ]
  },
  {
    id: "kombucha-market-passport",
    title: "The Market Passport",
    eyebrow: "Identity · What the package must communicate",
    summary:
      "Ingredients, nutrition, allergens, caffeine context, alcohol status, refrigeration, net contents, business identity, date and lot information prepare the product for its market.",
    checkpoint: "Package to identity",
    motion: "push-in",
    artwork: kombuchaArtwork(
      "packaging-market",
      "A refrigerated kombucha market passport station with assorted blank glass bottles and cans, package inspection, lot-code scanner, ingredient records, cold cases, and receiving staff without readable brand text."
    ),
    landmark: { label: "Package identity", x: 74, y: 38 },
    drop: { x: 70, y: 60, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Ingredient statement",
        title: "The label follows what actually entered",
        detail:
          "Tea or substrate, sugar, culture-related language, juice, botanicals, flavors, colors, preservatives, and processing aids need evaluation under applicable labeling rules."
      },
      {
        eyebrow: "Allergens",
        title: "Flavor innovation can create cross-contact duties",
        detail:
          "Ingredients and shared equipment may introduce major allergens or other sensitivities, requiring supplier control, sanitation, segregation, and truthful declaration."
      },
      {
        eyebrow: "Alcohol and caffeine",
        title: "Two familiar compounds need accurate context",
        detail:
          "Tea may contribute caffeine and fermentation may create alcohol. Claims and disclosures must match verified composition and the regulations of the intended market."
      },
      {
        eyebrow: "Storage",
        title: "Refrigerated means a real temperature requirement",
        detail:
          "Handling statements, date coding, shelf-life basis, and distribution instructions should align with the product’s validated stability plan."
      },
      {
        eyebrow: "Traceability",
        title: "Every unit needs a route back to the batch",
        detail:
          "Lot code, production records, ingredient lots, package materials, release results, case identity, shipment, and customer destination support rapid investigation."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "A package is a compact record. It should connect the guest and the supply chain to the actual ingredients, process, storage needs, and production lot."
      }
    ]
  },
  {
    id: "kombucha-cold-chain",
    title: "The Cold-Chain Relay",
    eyebrow: "Logistics · Stability in motion",
    summary:
      "Cold room, pallet, vehicle, receiving dock, retail case, and restaurant storage share responsibility for a refrigerated living product.",
    checkpoint: "Factory to market",
    motion: "glide",
    artwork: kombuchaArtwork(
      "cold-chain-relay",
      "A connected cold-chain relay moving sealed kombucha from a cold room through an insulated cart and refrigerated vehicle to a receiving check and final service cooler."
    ),
    landmark: { label: "Refrigerated relay", x: 73, y: 52 },
    drop: { x: 64, y: 68, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Warehouse",
        title: "Released product still has a hold temperature",
        detail:
          "Calibrated monitoring, airflow, stock rotation, door management, alarm response, segregation, and inventory status protect the validated shelf-life assumptions."
      },
      {
        eyebrow: "Transport",
        title: "The warmest handoff can define the risk",
        detail:
          "Pre-cooled vehicles, loading time, route length, ambient heat, pallet airflow, stops, data logging, and exception procedures influence actual product temperature."
      },
      {
        eyebrow: "Receiving",
        title: "Condition is checked before custody changes",
        detail:
          "Receiver checks product identity, quantity, temperature where required, package damage, leaks, swelling, date, lot, and refrigeration capacity."
      },
      {
        eyebrow: "Retail",
        title: "A cooler is part of production control",
        detail:
          "Case temperature, light, rotation, door seals, stocking density, display claims, and removal of damaged units affect the product the guest receives."
      },
      {
        eyebrow: "Excursion",
        title: "A broken chain needs documented disposition",
        detail:
          "Time–temperature evidence and validated product limits guide hold, evaluation, return, or disposal rather than automatic acceptance or arbitrary rejection."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Refrigeration is a relay. Every handoff either preserves the product’s validated life or creates a question that records must answer."
      }
    ]
  },
  {
    id: "kombucha-sensory-flight",
    title: "The Living Culture Flight",
    eyebrow: "Sensory · Compare the evidence",
    summary:
      "A structured flight separates appearance, aroma, tea character, acidity, sweetness, carbonation, texture, finish, and condition.",
    checkpoint: "Package to palate",
    motion: "orbit",
    artwork: kombuchaArtwork(
      "sensory-service",
      "Adult Roma leads a professional kombucha sensory flight of distinct colors, clarity, sediment, foam, and carbonation while Sippy and Hummin compare aroma, temperature, tea character, and package information."
    ),
    landmark: { label: "Sensory flight", x: 49, y: 58 },
    drop: { x: 48, y: 62, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Appearance",
        title: "Clarity and sediment need product context",
        detail:
          "Haze, yeast sediment, fruit solids, pellicle fragments, color, foam, and bubbles can be intentional or problematic depending on specification and stability."
      },
      {
        eyebrow: "Aroma",
        title: "Name tea, fermentation, and flavor separately",
        detail:
          "Describe leaf, fruit, floral, spice, herb, vinegar-like, yeasty, sulfurous, solvent-like, musty, or oxidized clues before deciding quality."
      },
      {
        eyebrow: "Balance",
        title: "Acidity and sweetness are not a single scale",
        detail:
          "Intensity, type of acidity, residual sweetness, tea bitterness, astringency, carbonation, temperature, and aroma interact in perceived balance."
      },
      {
        eyebrow: "Texture",
        title: "Gas, acid, tannin, solids, and temperature shape the mouthfeel",
        detail:
          "Prickle, foam, body, drying grip, viscosity, pulp, chalkiness, heat, and finish help translate process choices into sensory evidence."
      },
      {
        eyebrow: "Condition",
        title: "A fault is a departure from specification",
        detail:
          "Unexpected mold, putrid or fecal notes, severe solvent character, package gush, ropey texture, leaking, or dangerous overpressure require rejection and investigation."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Separate the clues before scoring the drink. Look, smell, taste, feel, compare, and connect each observation to tea, culture, flavor, package, and service."
      }
    ]
  },
  {
    id: "kombucha-draft-service",
    title: "The Draft & Service Station",
    eyebrow: "Hospitality · Cold, clean, informed",
    summary:
      "Refrigerated storage, suitable dispense equipment, line hygiene, pressure, glass condition, pour technique, and guest guidance complete the service system.",
    checkpoint: "Keg to guest",
    motion: "cutaway",
    artwork: kombuchaArtwork(
      "draft-service-station",
      "A cutaway draft-kombucha station showing a chilled keg, coupler, regulator, insulated beverage line, secondary cooling, faucet, drip tray, glass rinser, cleaning loop, service professional, Roma, and Hummin."
    ),
    landmark: { label: "Service station", x: 73, y: 43 },
    drop: { x: 66, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Dedicated system",
        title: "Product compatibility reaches the draught line",
        detail:
          "Keg, coupler, tubing, seals, metal contact, pressure source, and cleaning chemistry must suit the beverage and equipment manufacturer’s requirements."
      },
      {
        eyebrow: "Line hygiene",
        title: "Cold does not replace cleaning",
        detail:
          "Documented cleaning frequency, concentration, contact time, rinse verification, faucet care, coupler sanitation, and trained staff protect flavor and safety."
      },
      {
        eyebrow: "Pressure and temperature",
        title: "Balance prevents flat pours and foam loss",
        detail:
          "Product temperature, carbonation level, line resistance, elevation, serving pressure, glass condition, and faucet technique determine dispense behavior."
      },
      {
        eyebrow: "Package pour",
        title: "Sediment can be included or left behind intentionally",
        detail:
          "Staff can explain whether to gently roll, keep settled, decant, or pour the full package according to producer guidance and guest preference."
      },
      {
        eyebrow: "Guest communication",
        title: "State alcohol, caffeine, sugar, allergens, and storage honestly",
        detail:
          "Service language should not promise medical benefits, hide alcohol status, or imply every fermented tea suits every guest."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Hospitality is the final control point: cold product, clean equipment, balanced dispense, a thoughtful pour, and truthful guest guidance."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Choose the glass and pour for the product in front of you, then help the guest notice tea, culture, aroma, texture, and finish."
      }
    ]
  },
  {
    id: "kombucha-shared-glass",
    title: "The Shared Glass",
    eyebrow: "Reconnection · A living system remembered",
    summary:
      "The final glass reconnects water, leaf, sugar, culture, oxygen, time, control, flavor, package, cold chain, hospitality, and a guest’s informed choice.",
    checkpoint: "Culture to memory",
    motion: "reassemble",
    artwork: kombuchaArtwork(
      "shared-glass-finale",
      "An evening SIP Academy terrace where adult producers, quality and service professionals, Roma, Hummin, and an adult learner reconnect tea garden, Culture House, cold chain, field notes, and one careful shared kombucha tasting."
    ),
    landmark: { label: "Shared glass", x: 53, y: 59 },
    drop: { x: 52, y: 64, size: 9 },
    fieldNotes: [
      {
        eyebrow: "Origin",
        title: "The glass still contains the leaf and water story",
        detail:
          "Tea identity, water, extraction, sugar, and ingredient sourcing establish the substrate the culture transformed."
      },
      {
        eyebrow: "Living process",
        title: "Microbes created possibilities and obligations",
        detail:
          "Yeast and bacteria contributed gas, alcohol, acids, cellulose, and aroma while demanding control of sanitation, time, temperature, oxygen, and stability."
      },
      {
        eyebrow: "Evidence",
        title: "Quality is a connected record",
        detail:
          "Measurements, sensory observations, package integrity, lot custody, shelf-life verification, and service condition explain why the glass is fit to share."
      },
      {
        eyebrow: "Choice",
        title: "Different products can finish honestly",
        detail:
          "Tea-forward or flavored, still or sparkling, live refrigerated or stabilized, package or draft—each path should match its process and claims."
      },
      {
        eyebrow: "Guest",
        title: "Understanding improves consent and enjoyment",
        detail:
          "Clear information about alcohol, caffeine, sugar, allergens, ingredients, storage, sensory character, and serving size helps the guest choose well."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The culture does not make the system mysterious. It makes connection essential—from leaf and microbe to package, service, and an informed guest."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Taste the tea, the transformation, and the choices. You are not memorizing a trend; you are learning to read a living beverage."
      }
    ]
  }
];

const kombuchaScenes: BeyondTheGlassScene[] = kombuchaSceneSeeds.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / kombuchaSceneSeeds.length, (index + 1) / kombuchaSceneSeeds.length]
}));

export const kombuchaFieldTrip: BeyondTheGlassChapter = {
  slug: "kombucha",
  title: "Beyond The Glass",
  chapterTitle: "Kombucha · From Tea to Living Culture",
  subject: "A complete, process-controlled kombucha field trip",
  description:
    "A visual SIP Academy journey through water and tea, sweet-tea preparation, SCOBY ecology, first fermentation, metabolism, process control, flavor, carbonation, alcohol compliance, food safety, stabilization, packaging, sustainability, cold chain, sensory evaluation, and responsible service.",
  coreMessage:
    "Kombucha is not one recipe or one organism: ingredients, culture ecology, oxygen, time, temperature, measurements, finishing, package, distribution, and human judgment keep a living process truthful and shareable.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/kombucha/academy-gate-960.webp"
  },
  scenes: kombuchaScenes,
  sources: [
    {
      id: "ttb-kombucha-general",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Kombucha General Requirements",
      url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/kombucha/general-requirements",
      note:
        "Official U.S. federal reference for the 0.5% ABV threshold, alcohol created during fermentation, post-bottling change, production, formula, labeling, tax, and trade requirements."
    },
    {
      id: "ttb-kombucha-testing-methods",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Testing Methods to Measure Kombucha Alcohol Content",
      url:
        "https://www.ttb.gov/regulated-commodities/beverage-alcohol/kombucha/testing-methods",
      note:
        "Official U.S. reference supporting alcohol verification during production, at bottling, and after bottling, together with the need for a scientifically valid method suited to the beverage."
    },
    {
      id: "fda-preventive-controls-human-food",
      organization: "U.S. Food and Drug Administration",
      title: "Current Good Manufacturing Practice, Hazard Analysis, and Risk-Based Preventive Controls for Human Food",
      url:
        "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-current-good-manufacturing-practice-hazard-analysis-and-risk-based-preventive",
      note:
        "Primary U.S. food-safety framework supporting hazard analysis, sanitation, process controls, supply-chain controls, monitoring, corrective action, verification, records, and recall planning."
    },
    {
      id: "fda-food-code-2022",
      organization: "U.S. Food and Drug Administration",
      title: "2022 FDA Food Code",
      url: "https://www.fda.gov/food/fda-food-code/food-code-2022",
      note:
        "Authoritative model retail-food reference used for receiving, cold holding, equipment sanitation, employee practices, consumer information, and service context."
    },
    {
      id: "ba-kombucha-draught-context",
      organization: "Brewers Association",
      title: "Draught Beer Quality Manual",
      url: "https://www.brewersassociation.org/educational-publications/draught-beer-quality-manual/",
      note:
        "Authoritative draught-equipment reference for component anatomy, gas and dispense balance, line hygiene, faucet and coupler care, and pouring practice. It is used here as equipment context, not as a universal kombucha pressure, temperature, or cleaning specification."
    },
    {
      id: "villarreal-soto-kombucha-review",
      organization: "Journal of Food Science",
      title: "Understanding Kombucha Tea Fermentation: A Review",
      url: "https://pubmed.ncbi.nlm.nih.gov/29508944/",
      note:
        "Peer-reviewed review supporting kombucha substrates, culture variability, yeast and bacterial metabolism, cellulose pellicle, organic acids, ethanol, processing variables, and research limitations."
    },
    {
      id: "miranda-kombucha-review",
      organization: "Journal of Food Science",
      title: "Kombucha: A Review of Substrates, Regulations, Composition, and Biological Properties",
      url: "https://pubmed.ncbi.nlm.nih.gov/35029317/",
      note:
        "Peer-reviewed synthesis supporting careful discussion of substrates, microbial ecology, chemical composition, regulation, sensory variation, and restraint around biological or health claims."
    },
    {
      id: "iso-tea-sensory-preparation-kombucha",
      organization: "International Organization for Standardization",
      title: "ISO 3103:2019 — Tea: Preparation of Liquor for Use in Sensory Tests",
      url: "https://www.iso.org/standard/73224.html",
      note:
        "Current international tea sensory standard used as context for controlled comparison of the tea substrate, not as a kombucha production formula."
    },
    {
      id: "fda-traceability-rule",
      organization: "U.S. Food and Drug Administration",
      title: "FSMA Final Rule: Requirements for Additional Traceability Records for Certain Foods",
      url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods",
      note:
        "Official traceability context supporting lot identity, receiving, transformation, shipping, investigation, and record-based custody; applicability depends on product and supply chain."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
