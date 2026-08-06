import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const milkArtwork = (
  filename: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: "/beyond-the-glass/milk/" + filename + "-1600.webp",
  srcSet:
    "/beyond-the-glass/milk/" +
    filename +
    "-960.webp 960w, /beyond-the-glass/milk/" +
    filename +
    "-1600.webp 1600w",
  portraitSrc: "/beyond-the-glass/milk/" + filename + "-portrait-960.webp",
  portraitSrcSet:
    "/beyond-the-glass/milk/" +
    filename +
    "-portrait-640.webp 640w, /beyond-the-glass/milk/" +
    filename +
    "-portrait-960.webp 960w",
  alt,
  fit: "contain",
  portraitFit: "contain",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

const milkNotes = (
  entries: ReadonlyArray<readonly [eyebrow: string, title: string, detail: string]>
): BeyondTheGlassScene["fieldNotes"] =>
  entries.map(([eyebrow, title, detail]) => ({ eyebrow, title, detail }));

const milkNarration = (
  speaker: "Sippy" | "Roma" | "Hummin",
  text: string,
  durationSeconds = 8
): BeyondTheGlassScene["narration"][number] => ({ speaker, text, durationSeconds });

type MilkSceneSeed = Omit<BeyondTheGlassScene, "number" | "range">;

const milkSceneSeeds: MilkSceneSeed[] = [
  {
    id: "milk-creamery-gate",
    title: "The Creamery Gate",
    eyebrow: "SIP Academy · Milk",
    summary:
      "Pasture, animal care, hygienic collection, processing, cold custody, hospitality, and evidence meet inside one connected dairy system.",
    checkpoint: "Pasture to creamery",
    motion: "establish",
    artwork: milkArtwork(
      "academy-dawn",
      "A sunrise SIP Academy creamery connects cow pasture, goat and sheep paddocks, a milk tanker bay, stainless processing halls, cold rooms, blue waterways, and a warm service terrace."
    ),
    landmark: { label: "Creamery gate", x: 52, y: 43 },
    drop: { x: 51, y: 65, size: 8 },
    fieldNotes: milkNotes([
      [
        "Definition",
        "Milk begins as a mammary secretion",
        "Codex defines milk as the normal mammary secretion of milking animals, obtained without addition or extraction and intended for liquid consumption or further processing."
      ],
      [
        "System",
        "Safety is built across handoffs",
        "Animal health, milking hygiene, rapid cooling, protected transport, validated processing, packaging, storage, and service each contribute different controls."
      ],
      [
        "Diversity",
        "Cow, goat, and sheep milk are not interchangeable",
        "Species, breed, diet, season, stage of lactation, and farming conditions influence composition, sensory character, and processing behavior."
      ],
      [
        "Boundary",
        "Dairy and plant-based beverages need separate evidence",
        "Plant-based alternatives can share uses with milk, but their ingredients, processing, allergens, and nutrient profiles vary and should be compared by label rather than assumed equivalent."
      ],
      [
        "Route",
        "Pasture → milk house → creamery → guest",
        "This field trip follows a pasteurized fluid-milk pathway while identifying product-specific and jurisdiction-specific branches instead of teaching one universal recipe."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "Welcome to the Creamery Gate. We will follow one protected chain from animal and pasture to a truthful, well-served glass."
      ),
      milkNarration(
        "Hummin",
        "I will keep animal health, lot custody, temperatures, tests, process controls, cleaning, packages, and recalls connected."
      )
    ]
  },
  {
    id: "milk-system-map",
    title: "Pasture to Shared Glass",
    eyebrow: "System map · One continuous promise",
    summary:
      "A luminous cold chain carries milk from the farm through testing, transformation, package, market, service, and memory.",
    checkpoint: "See the whole route",
    motion: "glide",
    artwork: milkArtwork(
      "academy-dawn",
      "A complete SIP Academy dairy campus shows pasture, milking hall, cooling room, tanker reception, quality laboratory, creamery equipment, packaging, refrigerated distribution, retail, and service as one route."
    ),
    landmark: { label: "Cold-chain route", x: 52, y: 57 },
    drop: { x: 49, y: 67, size: 7 },
    fieldNotes: milkNotes([
      [
        "Farm",
        "Healthy animals and clean routines begin the chain",
        "Competent care, suitable feed and water, comfortable housing or pasture, disease observation, clean equipment, and calm handling support welfare and milk quality."
      ],
      [
        "Collection",
        "Cooling starts a race against microbial growth",
        "Milk moves through protected lines to rapid cooling, an agitated bulk tank, documented temperature, representative sampling, and sealed tanker custody."
      ],
      [
        "Creamery",
        "Tests decide where the load may go",
        "Identity, seal, temperature, sensory condition, residue screening, compositional checks, and quality results inform acceptance, segregation, investigation, or rejection."
      ],
      [
        "Process",
        "Each unit operation has a distinct job",
        "Separation adjusts fat streams; pasteurization controls pathogens; homogenization changes fat-globule distribution; packaging and refrigeration protect the finished product."
      ],
      [
        "Guest",
        "A safe package still needs good service",
        "Receiving, refrigeration, date rotation, allergen communication, clean equipment, steaming technique, tasting, and responsible disposal complete the chain."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "Read the glowing route as one promise. A later room cannot repair every failure from an earlier handoff."
      ),
      milkNarration(
        "Roma",
        "Flavor leaves clues all along the route: feed and season, heat treatment, light, oxygen, storage, steaming, and service."
      )
    ]
  },
  {
    id: "milk-farm-ecology",
    title: "The Living Farm System",
    eyebrow: "Farm ecology · Welfare and resources",
    summary:
      "Animals, people, feed, water, shelter, soil, weather, manure, and veterinary observation form the biological foundation of the beverage.",
    checkpoint: "Farm system to animal",
    motion: "orbit",
    artwork: milkArtwork(
      "farm-ecology",
      "A calm dairy cow stands at the center of a sunrise farm atlas connected to pasture, clean water, feed storage, shade, bedding, hoof footing, animal-health observation, barn ventilation, and manure management."
    ),
    landmark: { label: "Farm ecology", x: 50, y: 48 },
    drop: { x: 42, y: 63, size: 7 },
    fieldNotes: milkNotes([
      [
        "Competence",
        "Care depends on trained observation",
        "People responsible for dairy animals need species-appropriate knowledge of behavior, handling, milking, biosecurity, disease signs, pain, stress, and corrective care."
      ],
      [
        "Feed and water",
        "Inputs affect health, output, and quality",
        "Animals need sufficient clean water and balanced feed; feed identity, storage, contamination risks, seasonal supply, and ration design belong to the farm control system."
      ],
      [
        "Comfort",
        "Rest, footing, shade, and ventilation are measurable",
        "Lying time, cleanliness, lameness, lesions, heat stress, behavior, udder health, and body condition provide outcome evidence rather than decorative welfare claims."
      ],
      [
        "Health",
        "Treatment records protect animals and the milk pool",
        "Veterinary oversight, medicine identity, dosage, withdrawal periods, treated-animal identification, and segregation help prevent residues from entering saleable milk."
      ],
      [
        "Resources",
        "Water, manure, energy, and soil remain connected",
        "Cleaning water, nutrient recovery, runoff protection, manure storage, pasture management, cooling energy, and biodiversity influence the farm's wider footprint."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "The beverage does not begin at the filler. It begins with living animals, skilled people, and a farm system that must be observed every day."
      )
    ]
  },
  {
    id: "milk-species-breed-context",
    title: "Many Animals, Different Milks",
    eyebrow: "Species and breed · Composition is contextual",
    summary:
      "Cow, goat, and sheep milk share core structures but differ in average solids, fat, protein, sensory expression, and common uses.",
    checkpoint: "Animal to composition",
    motion: "rotate",
    artwork: milkArtwork(
      "species-composition",
      "A central illuminated milk droplet in the SIP Academy composition observatory is framed by cow, goat, and sheep silhouettes and three separate unlabelled milk samples."
    ),
    landmark: { label: "Species observatory", x: 51, y: 45 },
    drop: { x: 50, y: 46, size: 9 },
    fieldNotes: milkNotes([
      [
        "Cow",
        "Breed and lactation still matter within a species",
        "Cow milk composition varies with genetics, feed, health, stage of lactation, season, parity, and management; a single textbook average is not a batch specification."
      ],
      [
        "Goat",
        "Similar categories do not mean identical behavior",
        "Goat milk can differ in fat-globule distribution, protein fractions, aroma, seasonal supply, and processing performance; product goals determine suitability."
      ],
      [
        "Sheep",
        "Higher average solids change the processing canvas",
        "Sheep milk commonly has more fat and protein than cow or goat milk, which helps explain its frequent use in concentrated and cultured dairy products."
      ],
      [
        "Breed",
        "Selection changes more than appearance",
        "Breed can influence yield, component concentrations, fat-to-protein balance, heat tolerance, disease resilience, and how the milk behaves in a chosen product."
      ],
      [
        "Evidence",
        "Test the lot instead of assuming the animal",
        "Species and breed give useful context, but representative sampling and compositional, microbiological, and sensory evidence describe the milk actually received."
      ]
    ]),
    narration: [
      milkNarration(
        "Roma",
        "Do not flatten dairy into one flavor. Species, breed, season, feed, and lactation change the sensory and technical possibilities."
      )
    ]
  },
  {
    id: "milk-composition-drop",
    title: "Inside the Milk Drop",
    eyebrow: "Composition · A structured dispersion",
    summary:
      "Water carries lactose, minerals, vitamins, proteins, fat globules, enzymes, gases, and trace compounds through a dynamic food matrix.",
    checkpoint: "Macro to micro",
    motion: "push-in",
    artwork: milkArtwork(
      "species-composition",
      "A translucent milk drop opens into water phase, fat globules, casein-micelle-like structures, whey-protein forms, lactose motifs, minerals, and vitamins inside a brass scientific observatory."
    ),
    landmark: { label: "Milk matrix", x: 51, y: 43 },
    drop: { x: 51, y: 43, size: 10 },
    fieldNotes: milkNotes([
      [
        "Water phase",
        "Most fluid milk is water",
        "Dissolved and dispersed constituents travel through an aqueous phase whose proportion varies by species and product; water quality also matters in processing and cleaning."
      ],
      [
        "Fat",
        "Globules carry texture and flavor chemistry",
        "Milk fat occurs in membrane-coated globules. Amount, globule distribution, temperature, separation, homogenization, light, and oxygen affect stability and sensory character."
      ],
      [
        "Protein",
        "Caseins and whey proteins behave differently",
        "Caseins organize largely in micelles; whey proteins remain in the serum phase and respond differently to acid, enzymes, minerals, and heat."
      ],
      [
        "Carbohydrate",
        "Lactose is the principal milk sugar",
        "Lactose contributes solids and mild sweetness, can be hydrolyzed by lactase, and becomes a substrate for starter cultures in fermented products."
      ],
      [
        "Minerals and vitamins",
        "Natural content and fortification are separate facts",
        "Milk contains minerals and vitamins, but species, feed, processing, fat level, jurisdiction, and voluntary or required fortification influence the finished label."
      ],
      [
        "Quality",
        "Composition and safety tests answer different questions",
        "Fat, protein, solids, freezing point, acidity, cells, residues, microbial quality, sensory condition, and identity are related measurements, not one quality score."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "Milk is neither a simple solution nor an empty white liquid. Its phases respond differently to heat, pressure, enzymes, acid, light, oxygen, and time."
      )
    ]
  },
  {
    id: "milk-lactation-welfare",
    title: "Lactation, Health & Daily Care",
    eyebrow: "Biology · Observation before extraction",
    summary:
      "Stage of lactation, udder health, comfort, nutrition, medication, stress, and milking frequency influence the animal and the milk.",
    checkpoint: "Animal to milking readiness",
    motion: "orbit",
    artwork: milkArtwork(
      "farm-ecology",
      "A calm adult dairy animal is surrounded by connected visual zones for feed and water, udder-health observation, clean bedding, hoof comfort, shade, ventilation, veterinary records, and treated-milk segregation."
    ),
    landmark: { label: "Care circle", x: 53, y: 50 },
    drop: { x: 46, y: 62, size: 7 },
    fieldNotes: milkNotes([
      [
        "Lactation",
        "Milk changes across the lactation cycle",
        "Yield and concentrations do not remain fixed from early to late lactation, so farm and processor records need context instead of assuming every milking is identical."
      ],
      [
        "Udder health",
        "Clinical and subclinical problems need different evidence",
        "Visible inflammation or abnormal milk demands action, while somatic-cell trends and other herd records can signal problems that are not obvious in one observation."
      ],
      [
        "Medication",
        "Withdrawal control is a custody system",
        "Treated animals, medicine and dose, timing, milk-withhold interval, identification, segregation, and verification must remain connected before milk enters the common tank."
      ],
      [
        "Comfort",
        "Calm movement supports welfare and consistent routines",
        "Handling, footing, noise, crowding, equipment fit, waiting time, and release from the parlor can affect behavior, injury risk, and the quality of the milking routine."
      ],
      [
        "Non-saleable milk",
        "Not every secretion belongs in the food chain",
        "Colostrum, abnormal milk, milk during applicable treatment or withdrawal, and other excluded material require clear separation and lawful disposition."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "Before equipment touches the animal, the team decides whether she is healthy, comfortable, identified, and eligible to enter the saleable milk stream."
      )
    ]
  },
  {
    id: "milk-hygienic-milking",
    title: "The Hygienic Milking Hall",
    eyebrow: "Collection · Equipment and routine",
    summary:
      "Preparation, attachment, vacuum and pulsation, milk flow, detachment, filtering, cooling, and cleaning work as one repeatable routine.",
    checkpoint: "Animal to protected line",
    motion: "cutaway",
    artwork: milkArtwork(
      "milking-parlor",
      "A clean modern milking-parlor cutaway shows an adult operator, calm cow, udder preparation, teat-cup cluster, vacuum and pulsation equipment, transparent milk line, receiver, filter, plate cooler, bulk tank, drainage, and clean-in-place routing."
    ),
    landmark: { label: "Milking cluster", x: 38, y: 52 },
    drop: { x: 50, y: 66, size: 7 },
    fieldNotes: milkNotes([
      [
        "Entry",
        "Clean animals and clean hands reduce contamination",
        "Calm entry, operator hygiene, appropriate gloves or hand practices, clean contact surfaces, and a documented udder-preparation routine protect both animal and milk."
      ],
      [
        "Preparation",
        "Teat cleaning needs contact time and drying",
        "The approved preparation method should loosen soil, control microorganisms, avoid transferring dirty solution, allow needed contact time, and finish with clean dry teats."
      ],
      [
        "Cluster",
        "Vacuum and pulsation need correct fit and maintenance",
        "Liner condition, attachment, alignment, vacuum stability, pulsation, milk-out timing, slips, and automatic detachment influence teat condition and milking performance."
      ],
      [
        "Protected path",
        "Milk should stay inside clean sanitary equipment",
        "The line, receiver, pump, filter, cooler, valves, and tank form a food-contact chain that requires hygienic design, verified cleaning, and protection from cross-connections."
      ],
      [
        "Records",
        "Abnormal events should remain visible",
        "Animal identification, excluded milk, equipment alarms, liner changes, cleaning verification, bulk-tank temperature, and sample custody help explain the lot later."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "The parlor is a synchronized machine and care routine. A clean teat, correctly working cluster, protected line, rapid cooler, and verified wash all matter."
      )
    ]
  },
  {
    id: "milk-rapid-cooling",
    title: "Cool the Milk, Protect the Clock",
    eyebrow: "Temperature · The first cold-chain gate",
    summary:
      "A plate cooler and agitated bulk tank remove heat, hold milk under specification, and create the first documented lot.",
    checkpoint: "Warm milk to cold custody",
    motion: "cutaway",
    artwork: milkArtwork(
      "cooling-collection",
      "Milk travels from a milking line through a plate cooler into a cutaway agitated bulk tank with temperature probe, protected sample port, cleaning circuit, and sealed tanker connection at dawn."
    ),
    landmark: { label: "Plate cooler", x: 31, y: 48 },
    drop: { x: 53, y: 52, size: 8 },
    fieldNotes: milkNotes([
      [
        "Heat exchange",
        "Cold media and milk stay separated",
        "A plate cooler transfers heat through metal surfaces; potable-water protection, pressure relationships, clean plates, gasket integrity, and flow balance matter."
      ],
      [
        "Time and temperature",
        "The target belongs to a validated standard",
        "Cooling limits and timing vary by jurisdiction and collection pattern. Operators follow the applicable specification and investigate excursions rather than copying one number globally."
      ],
      [
        "Agitation",
        "A representative tank is gently mixed",
        "Adequate agitation supports uniform temperature and representative sampling without churning air, damaging equipment, or replacing the need for correct cooling."
      ],
      [
        "Sample",
        "Sampling is a controlled operation",
        "Sanitary technique, correct container, representative mixing, identification, temperature, seal, custody, and preservation help make the laboratory result meaningful."
      ],
      [
        "Tank",
        "Insulation slows heat gain; it does not create safety",
        "The bulk tank needs cleanable surfaces, calibrated measurement, protected openings, verified washing, correct drainage, and maintenance as well as insulation."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "Cooling protects time. The tank, sample, and temperature record become the first shared evidence between farm and creamery."
      )
    ]
  },
  {
    id: "milk-tanker-custody",
    title: "The Tanker Custody Relay",
    eyebrow: "Transport · Lot identity and segregation",
    summary:
      "The hauler verifies the farm tank, collects a representative sample, protects the hose and compartments, and preserves traceability to the receiving bay.",
    checkpoint: "Farm tank to receiving",
    motion: "glide",
    artwork: milkArtwork(
      "cooling-collection",
      "A protected milk tanker connection links an agitated farm bulk tank, sanitary sample station, clean transfer hose, sealed compartments, temperature record, and the distant creamery receiving route."
    ),
    landmark: { label: "Custody connection", x: 77, y: 53 },
    drop: { x: 69, y: 60, size: 7 },
    fieldNotes: milkNotes([
      [
        "Before pickup",
        "The hauler checks more than volume",
        "Farm identity, tank condition, agitation, temperature, odor or appearance, excluded-load instructions, sample materials, and prior pickup records help protect the route."
      ],
      [
        "Hose",
        "A clean connection stays protected",
        "Caps, fittings, hose storage, pump, air entry, valve position, external soil, and post-transfer drainage can affect hygiene and cross-contamination."
      ],
      [
        "Compartment",
        "Commingling changes the consequence of one failure",
        "Compartment identity, sequence, farm samples, seals, temperature, volume, and wash status support root-cause investigation when a load fails."
      ],
      [
        "Route",
        "Time and temperature continue during transport",
        "Insulation, route duration, ambient conditions, delays, mechanical condition, and receiving readiness influence whether custody remains within specification."
      ],
      [
        "Wash",
        "The tanker is a food-contact vessel",
        "Validated wash cycles, chemical control, drainage, inspection, wash records, and protection after cleaning matter before the next load enters."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "A tanker combines farms and consequences. Samples, compartments, seals, temperatures, routes, and wash records preserve the story of the load."
      )
    ]
  },
  {
    id: "milk-receiving-quality-gate",
    title: "The Receiving Quality Gate",
    eyebrow: "Laboratory · Accept, hold, investigate, or reject",
    summary:
      "The creamery verifies custody and tests the load before routing it into protected storage.",
    checkpoint: "Tanker to raw silo",
    motion: "push-in",
    artwork: milkArtwork(
      "receiving-lab",
      "A tanker enters a cold-blue creamery receiving bay beside a glass quality laboratory, protected sample station, screening instruments, raw-milk silo manifold, and separate hold and acceptance routes."
    ),
    landmark: { label: "Receiving sample", x: 69, y: 60 },
    drop: { x: 62, y: 66, size: 7 },
    fieldNotes: milkNotes([
      [
        "Custody",
        "Seal and paperwork must match the load",
        "Hauler, farms or route, compartment, seal, time, temperature, volume, sample set, wash status, and receiving-silo assignment should reconcile before unloading."
      ],
      [
        "Residues",
        "A screening result is a gate, not a decorative test",
        "Validated antibiotic-residue screening, controls, result interpretation, confirmation procedure, hold status, notification, investigation, and lawful disposition must follow the program."
      ],
      [
        "Composition",
        "Components support payment and routing",
        "Fat, protein, total solids or solids-not-fat, freezing-point context, acidity, density, and other program tests can support identity, product planning, and anomaly investigation."
      ],
      [
        "Microbial quality",
        "Indicators do not all mean the same thing",
        "Bacterial counts, somatic cells, coliform context, sensory condition, temperature, and pathogen controls answer different questions and use jurisdiction-specific limits."
      ],
      [
        "Decision",
        "Do not unload first and explain later",
        "Acceptance, segregated hold, retest, supplier contact, rejection, diversion, cleaning response, and records should be defined before a questionable load reaches a common silo."
      ],
      [
        "Silo",
        "Raw and finished zones stay separated",
        "Valve logic, line identification, protected vents, agitation, temperature, level control, cleaning status, and prevention of cross-connections protect raw-milk storage."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "Receiving is a decision point. The load remains held until identity, temperature, residues, composition, quality, and destination agree."
      )
    ]
  },
  {
    id: "milk-separation-standardization",
    title: "The Separator & Standardizer",
    eyebrow: "Composition · Separate, measure, recombine",
    summary:
      "Centrifugal force divides cream and skim streams; controlled recombination builds an intended fat composition where that product path calls for it.",
    checkpoint: "Raw silo to formulation",
    motion: "rotate",
    artwork: milkArtwork(
      "separation-standardization",
      "A cutaway disc-stack cream separator divides milk into cream and skim streams, then flow meters and a sanitary manifold recombine measured streams into an agitated standardization tank."
    ),
    landmark: { label: "Separator bowl", x: 48, y: 45 },
    drop: { x: 51, y: 59, size: 8 },
    fieldNotes: milkNotes([
      [
        "Centrifuge",
        "Density differences drive separation",
        "A rapidly rotating disc stack shortens the distance droplets must travel, moving denser skim phase and lighter fat-rich cream into different controlled outlets."
      ],
      [
        "Temperature",
        "Separation performance depends on the feed",
        "Feed temperature, flow, fat-globule condition, sediment load, bowl setup, pressure, and equipment specification influence efficiency and product quality."
      ],
      [
        "Cream",
        "The concentrated fat stream is a valuable ingredient",
        "Cream identity, fat result, temperature, storage, oxidation protection, destination, and lot traceability remain controlled after it leaves the separator."
      ],
      [
        "Skim",
        "The lower-fat stream still contains milk solids",
        "Skim milk retains lactose, proteins, minerals, vitamins, and water; its exact composition and legal name depend on the product and jurisdiction."
      ],
      [
        "Standardization",
        "Measured recombination targets a specification",
        "Flow control and laboratory confirmation can adjust fat or other solids for a named product, but not every milk is standardized and legal categories differ."
      ],
      [
        "Clarification",
        "Solids removal is not pasteurization",
        "Clarification or bactofugation can remove selected particulate or microbial load in some systems, but these operations do not replace the validated safety process required for the product."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "The separator does not erase milk. It creates two useful streams whose measurement, destination, and later recombination must remain visible."
      )
    ]
  },
  {
    id: "milk-pasteurization",
    title: "The Pasteurization Passage",
    eyebrow: "Thermal control · Time and temperature",
    summary:
      "A validated heat process raises milk to the required condition for the required time, verifies flow, diverts off-spec product, and rapidly cools the finished stream.",
    checkpoint: "Raw side to pasteurized side",
    motion: "cutaway",
    artwork: milkArtwork(
      "pasteurization-homogenization",
      "A cutaway plate heat-exchanger system shows a balance tank, regeneration, heating plates, holding tube, temperature and flow sensors, a safe flow-diversion loop, cooling section, and a separate downstream homogenizer."
    ),
    landmark: { label: "Holding and diversion", x: 50, y: 48 },
    drop: { x: 50, y: 60, size: 8 },
    fieldNotes: milkNotes([
      [
        "Public health",
        "Pasteurization controls disease-causing microorganisms",
        "The process uses a validated time-and-temperature relationship and properly designed equipment to destroy relevant pathogens; farm hygiene alone cannot guarantee raw milk is pathogen-free."
      ],
      [
        "Regeneration",
        "Outgoing milk can preheat incoming milk without mixing",
        "A plate exchanger can recover energy across intact metal surfaces while pressure relationships, plate integrity, gaskets, and leak response protect the finished side."
      ],
      [
        "Holding",
        "Temperature without residence time is incomplete",
        "Flow rate, holding-tube geometry, timing pump, temperature measurement, recorder, legal standard, and product characteristics combine to establish the required exposure."
      ],
      [
        "Diversion",
        "Product below the validated condition returns safely",
        "A correctly configured flow-diversion device prevents underprocessed milk from entering the pasteurized side and creates a visible event for correction and records."
      ],
      [
        "Cooling",
        "Heat control ends with protected cooling",
        "Pasteurized milk is cooled, routed into a protected finished-product zone, and kept separated from raw equipment, personnel routes, air, water, and cross-connections."
      ],
      [
        "Qualification",
        "Schedules differ by product and jurisdiction",
        "Batch, high-temperature short-time, higher-heat, ultra-pasteurized, UHT, and aseptic systems have different validated combinations, equipment, packaging, and shelf-life claims."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "Pasteurization is a verified control system, not a warm tank. Time, temperature, flow, diversion, cooling, equipment tests, and records must agree."
      )
    ]
  },
  {
    id: "milk-homogenization",
    title: "The Homogenizer Valve",
    eyebrow: "Physical structure · Pressure and stability",
    summary:
      "High pressure forces milk through a narrow valve region, reducing fat-globule size and changing how the emulsion resists cream separation.",
    checkpoint: "Globule to stable dispersion",
    motion: "push-in",
    artwork: milkArtwork(
      "pasteurization-homogenization",
      "A high-pressure homogenizer cutaway reveals the pump, valve seat, narrow gap, turbulence and impact zone, with larger fat globules entering and a finer distribution leaving."
    ),
    landmark: { label: "Homogenizing valve", x: 78, y: 48 },
    drop: { x: 73, y: 57, size: 8 },
    fieldNotes: milkNotes([
      [
        "Pressure",
        "A pump creates controlled energy",
        "Homogenization uses high pressure and a precisely maintained valve assembly; the actual pressure and number of stages belong to the product and equipment specification."
      ],
      [
        "Valve gap",
        "A narrow passage creates disruption",
        "Rapid acceleration, pressure change, turbulence, shear, and impact contribute to reducing fat-globule size as milk crosses the valve."
      ],
      [
        "Surface",
        "Smaller globules create more interface",
        "New fat surface is covered by proteins and membrane material, changing emulsion behavior, light scattering, texture, and susceptibility to some defects."
      ],
      [
        "Stability",
        "Cream rise slows; gravity does not disappear",
        "A finer globule distribution helps limit visible creaming in fluid milk, but formulation, temperature, handling, enzymes, age, and package still affect stability."
      ],
      [
        "Boundary",
        "Homogenization is not a microbial kill step",
        "It changes physical structure. A validated pasteurization or other approved safety process, sanitary design, finished-side protection, and refrigeration remain separate controls."
      ]
    ]),
    narration: [
      milkNarration(
        "Roma",
        "The homogenizer changes the way fat travels through the glass. Look for the sensory result, then trace it back to pressure, valve condition, and emulsion structure."
      )
    ]
  },
  {
    id: "milk-esl-uht-fork",
    title: "The Shelf-Life Fork",
    eyebrow: "Product paths · Refrigerated and shelf-stable are different systems",
    summary:
      "Extended-shelf-life, ultra-pasteurized, UHT-aseptic, and conventionally pasteurized products combine heat, hygiene, package, and storage in different ways.",
    checkpoint: "Process to intended shelf life",
    motion: "glide",
    artwork: milkArtwork(
      "packaging",
      "A protected dairy packaging hall shows distinct refrigerated bottle and carton lanes and a separate aseptic-package lane connected to different process and storage environments."
    ),
    landmark: { label: "Product-path fork", x: 50, y: 48 },
    drop: { x: 51, y: 60, size: 8 },
    fieldNotes: milkNotes([
      [
        "Pasteurized",
        "Refrigerated milk depends on continuous cold custody",
        "Conventional pasteurization controls target pathogens but does not sterilize the product; post-process protection, refrigeration, date coding, distribution, and consumer handling remain essential."
      ],
      [
        "Ultra-pasteurized",
        "A higher heat designation does not automatically mean room-temperature storage",
        "In U.S. terminology, ultra-pasteurized products may still be packaged and sold refrigerated; the label, package, process, and validated shelf-life program define handling."
      ],
      [
        "ESL",
        "Extended shelf life is a system outcome",
        "Higher-heat or nonthermal adjuncts where permitted, very clean finished zones, low recontamination risk, package barrier, and cold chain can extend refrigerated life."
      ],
      [
        "UHT and aseptic",
        "Commercial sterility depends on process plus sterile package",
        "UHT treatment paired with aseptic processing and packaging can support unopened ambient storage, but validated equipment, package integrity, distribution, and after-opening instructions remain critical."
      ],
      [
        "Sensory",
        "Heat history can change flavor and stability",
        "Cooked, sulfurous, caramel-like, oxidized, age-gelation, sediment, and color changes depend on product composition, process severity, oxygen, enzymes, package, light, and time."
      ],
      [
        "Truth",
        "Never infer storage from appearance alone",
        "Two similar cartons may have different process and storage requirements. The legal statement of identity, handling instruction, seal, date, and producer specification guide custody."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "Shelf life is never one machine. Process severity, finished-zone hygiene, package barrier, temperature, time, and after-opening handling form the complete path."
      )
    ]
  },
  {
    id: "milk-lactose-fortification",
    title: "The Formulation Studio",
    eyebrow: "Branches · Lactase, fortification, and solids",
    summary:
      "Lactose hydrolysis, measured nutrient addition, and composition adjustment create distinct products whose labels and controls must remain accurate.",
    checkpoint: "Base milk to named product",
    motion: "reassemble",
    artwork: milkArtwork(
      "lactose-fortification",
      "A central milk stream divides into sanitary pilot vessels for lactase dosing, vitamin and mineral fortification, composition adjustment, inline mixing, sampling, and controlled recombination."
    ),
    landmark: { label: "Formulation manifold", x: 50, y: 42 },
    drop: { x: 50, y: 60, size: 8 },
    fieldNotes: milkNotes([
      [
        "Lactase",
        "Hydrolysis splits lactose into glucose and galactose",
        "A controlled lactase treatment reduces lactose and commonly increases perceived sweetness because the resulting sugars taste sweeter than the original lactose."
      ],
      [
        "Allergy boundary",
        "Lactose-free does not mean milk-protein-free",
        "Lactose intolerance concerns carbohydrate digestion; milk allergy concerns immune reactions to milk proteins. Lactose-reduced dairy still requires milk-allergen communication."
      ],
      [
        "Fortification",
        "Added nutrients need identity, dose, mixing, and verification",
        "Vitamin or mineral addition may be required or voluntary depending on product and jurisdiction; supplier documentation, dosing accuracy, uniformity, losses, label values, and records matter."
      ],
      [
        "Fat and solids",
        "A formulation is more than one percentage",
        "Fat, protein, lactose, minerals, stabilizers where permitted, added sugar, flavor, total solids, heat stability, viscosity, and legal standard influence the finished beverage."
      ],
      [
        "Sampling",
        "Uniform mixing must be demonstrated",
        "Tank geometry, addition order, solubility, shear, time, temperature, recirculation, hold conditions, representative samples, and laboratory methods support a truthful batch."
      ],
      [
        "Claims",
        "A process feature is not a health promise",
        "Lactose-free, reduced-fat, fortified, high-protein, organic, animal-welfare, or environmental statements each need their own lawful criteria and evidence."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "A named formulation begins with controlled ingredients and ends with analytical, label, allergen, mixing, and traceability evidence."
      )
    ]
  },
  {
    id: "milk-cultured-branch",
    title: "The Culture Conservatory",
    eyebrow: "Fermented branch · Starter, acid, texture, cooling",
    summary:
      "A pasteurized milk base receives a defined starter, develops acidity and texture under controlled conditions, then cools and moves to its intended package.",
    checkpoint: "Milk base to cultured product",
    motion: "orbit",
    artwork: milkArtwork(
      "cultured-branch",
      "A warm-to-cool creamery culture conservatory shows starter preparation, sanitary inoculation, incubated milk, acidity sampling, set and stirred texture pathways, endpoint cooling, blending, and filling."
    ),
    landmark: { label: "Culture vessel", x: 54, y: 47 },
    drop: { x: 57, y: 59, size: 8 },
    fieldNotes: milkNotes([
      [
        "Base",
        "The milk base is designed for the cultured product",
        "Species, fat, protein, total solids, heat treatment, homogenization, stabilizers where permitted, sugar, and flavor plan influence culture performance and texture."
      ],
      [
        "Starter",
        "A defined culture is a living production input",
        "Organism identity, supplier lot, storage, activity, inoculation dose, contamination protection, and compatibility with the product specification matter."
      ],
      [
        "Incubation",
        "Temperature and time shape acid development",
        "The validated culture range, vessel control, agitation or set condition, oxygen exposure, initial composition, and culture health influence the rate and sensory outcome."
      ],
      [
        "Endpoint",
        "pH and titratable acidity describe different evidence",
        "pH reflects hydrogen-ion activity; titratable acidity measures acid neutralization under a method. Texture, aroma, time, temperature, and specification help interpret both."
      ],
      [
        "Cooling",
        "The culture must be slowed at the intended point",
        "Rapid controlled cooling, agitation choice, fruit or flavor addition, package hygiene, refrigeration, and shelf-life checks protect the desired texture and acidity."
      ],
      [
        "Claims",
        "Fermented does not automatically mean probiotic",
        "Culture identity, viable level through shelf life, claimed benefit, evidence, regulatory category, storage, and serving conditions determine whether a specific statement is supportable."
      ]
    ]),
    narration: [
      milkNarration(
        "Roma",
        "Culture creates acidity, aroma, and texture, but the producer still chooses the base, organisms, endpoint, cooling, and way the guest will experience it."
      )
    ]
  },
  {
    id: "milk-plant-alternative-comparison",
    title: "The Separate Comparison Table",
    eyebrow: "Plant-based branch · Similar use, different evidence",
    summary:
      "Dairy milk, fortified soy beverage, oat beverage, and nut-based beverages can share a service context without sharing ingredients, allergens, composition, or process.",
    checkpoint: "Name, label, compare",
    motion: "rotate",
    artwork: milkArtwork(
      "plant-alternative",
      "A neutral SIP Academy evidence table holds separate unbranded glasses and packages for dairy milk, soy beverage, oat beverage, and almond beverage, with source ingredients, processing equipment, allergen cues, and a botanical conservatory kept distinct from the creamery."
    ),
    landmark: { label: "Evidence table", x: 50, y: 52 },
    drop: { x: 50, y: 59, size: 7 },
    fieldNotes: milkNotes([
      [
        "Source",
        "Name the plant before comparing the beverage",
        "Soy, oat, rice, pea, almond, coconut, sesame, and other sources bring different proteins, starches, fats, flavors, allergens, processing needs, and environmental contexts."
      ],
      [
        "Process",
        "Extraction and formulation build the finished alternative",
        "Soaking or milling, extraction, filtration, enzyme use, heat treatment, emulsification, homogenization, fortification, flavor, stabilization, and package vary by source and producer."
      ],
      [
        "Nutrition",
        "Similar color is not nutritional equivalence",
        "Protein, calcium, vitamin D, potassium, fat, saturated fat, carbohydrate, added sugar, sodium, fortification, serving size, and bioavailability context should be read from the product."
      ],
      [
        "Allergens",
        "Milk-free can introduce different major allergens",
        "Milk, soy, tree nuts, sesame, wheat or gluten context, and cross-contact depend on ingredients, facility, jurisdiction, and labeling; lactose-free and dairy-free are not synonyms."
      ],
      [
        "Service",
        "Foaming and flavor behavior differ",
        "Protein, fat, emulsifiers, stabilizers, acidity, temperature, steam energy, storage, shaking, and barista technique influence separation, foam, flavor masking, and waste."
      ],
      [
        "Language",
        "Dairy terms and common names vary by market",
        "Codex and national rules seek clear, non-misleading names. Students should inspect the exact legal market and label rather than universalize one naming debate."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "Comparison should increase clarity, not declare a winner. Name the source, read the label, identify allergens, and match the beverage to the guest and use."
      )
    ]
  },
  {
    id: "milk-microbial-cip",
    title: "The Hygiene Loop",
    eyebrow: "Food safety · Zoning, microbes, and clean-in-place",
    summary:
      "Preventive controls, hygienic design, raw-to-finished separation, validated cleaning, environmental awareness, and verification protect the process between batches.",
    checkpoint: "Risk point to verified clean",
    motion: "orbit",
    artwork: milkArtwork(
      "cip-microbial",
      "A complete creamery clean-in-place circuit surrounds a central tank with spray device, valve cluster, supply station, color-coded rinse and cleaning phases, return monitoring, drainability, finished-side protection, and a separate microbial-quality laboratory."
    ),
    landmark: { label: "CIP return", x: 61, y: 58 },
    drop: { x: 52, y: 51, size: 8 },
    fieldNotes: milkNotes([
      [
        "Hazards",
        "Raw milk can carry pathogens even from a careful farm",
        "Relevant hazards include organisms such as Campylobacter, pathogenic Escherichia coli, Listeria, Salmonella, and others; preventive controls use multiple barriers rather than trusting appearance."
      ],
      [
        "Spoilage",
        "Safety and shelf-life failures overlap but are not identical",
        "Psychrotrophic growth, post-process contamination, enzymes, souring, bitterness, rancidity, gas, ropiness, age gelation, light oxidation, and package damage require different investigations."
      ],
      [
        "Zoning",
        "Raw and pasteurized areas need intentional separation",
        "People, air, drains, hoses, tools, water, packaging, traffic, maintenance, condensate, and waste can create cross-connections if the finished side is not protected."
      ],
      [
        "CIP sequence",
        "Flow, chemistry, heat, time, and coverage work together",
        "Pre-rinse, detergent phase, intermediate rinse, acid or sanitation step where specified, final condition, concentration, temperature, velocity, time, spray coverage, and return state need validation."
      ],
      [
        "Hygienic design",
        "Cleanability begins before the wash starts",
        "Surface finish, weld quality, gasket condition, valve design, dead legs, slope, drainage, spray shadow, pump selection, instrument ports, and disassembly points affect results."
      ],
      [
        "Verification",
        "A completed cycle is not automatically a clean system",
        "Cycle records, chemical checks, visual inspection, ATP or other rapid methods where appropriate, allergen verification, microbiological monitoring, corrective action, and trend review provide evidence."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "The wash is a controlled process of its own. Design, sequence, flow, chemistry, temperature, time, coverage, inspection, and corrective action all leave evidence."
      )
    ]
  },
  {
    id: "milk-packaging-traceability",
    title: "The Package Passport",
    eyebrow: "Protection · Light, oxygen, seal, and lot identity",
    summary:
      "A protected filling environment places milk into a compatible container, applies a sound closure, verifies the seal, codes the lot, and prepares it for its intended storage route.",
    checkpoint: "Finished tank to case",
    motion: "glide",
    artwork: milkArtwork(
      "packaging",
      "A complete dairy packaging line moves milk from a protected finished tank through enclosed fillers into opaque cartons, light-protective bottles, and a separate aseptic-package path, then closure, seal inspection, lot coding, case packing, and pallet handoff."
    ),
    landmark: { label: "Protected filler", x: 51, y: 43 },
    drop: { x: 49, y: 56, size: 8 },
    fieldNotes: milkNotes([
      [
        "Filler",
        "Post-process contamination is a major finished-side risk",
        "Clean product supply, filler sanitation, enclosure, air, container and closure handling, operator traffic, condensate, maintenance, and startup controls protect pasteurized milk."
      ],
      [
        "Light",
        "Package opacity can protect flavor and nutrients",
        "Light exposure can accelerate oxidation and affect compounds such as riboflavin and flavor; barrier performance depends on material, color, thickness, display, and time."
      ],
      [
        "Oxygen",
        "Headspace and material permeability shape aging",
        "Dissolved oxygen, filling turbulence, headspace, closure seal, package barrier, light, temperature, fat composition, and storage duration influence oxidized character."
      ],
      [
        "Seal",
        "A closure is a measurable control point",
        "Cap torque or application, tamper evidence, carton seal, leak detection, aseptic integrity where applicable, container damage, fill volume, and rejection systems support package fitness."
      ],
      [
        "Lot",
        "The package needs a traceable identity",
        "Product, plant, line, date or time window, ingredient and packaging lots, process record, destination, and case or pallet link support targeted investigation and recall."
      ],
      [
        "Materials",
        "Package choice creates tradeoffs",
        "Barrier, refrigeration, weight, breakage, recyclability, recycled content, local infrastructure, food-contact suitability, product loss, and transport efficiency belong to life-cycle evaluation."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "The package is both shield and passport. It protects the product while carrying the identity needed to rotate, investigate, and recall it."
      )
    ]
  },
  {
    id: "milk-cold-chain",
    title: "The Cold-Chain Relay",
    eyebrow: "Distribution · Continuous temperature custody",
    summary:
      "Cold room, pallet, refrigerated vehicle, receiving dock, retail case, café refrigerator, and opened-package practice form one perishable route.",
    checkpoint: "Case to service refrigerator",
    motion: "glide",
    artwork: milkArtwork(
      "cold-chain-service",
      "A continuous luminous cold-blue path connects creamery cold storage, temperature logger, pallet, refrigerated truck, receiving check, retail dairy case, café refrigerator, clean service counter, and tasting setup."
    ),
    landmark: { label: "Receiving handoff", x: 50, y: 49 },
    drop: { x: 65, y: 61, size: 7 },
    fieldNotes: milkNotes([
      [
        "Dispatch",
        "Load only product that is ready for the route",
        "Product temperature, case condition, pallet pattern, lot identity, vehicle sanitation, refrigeration status, route, seal, logger, and destination should agree before release."
      ],
      [
        "Transport",
        "Refrigeration removes heat; it does not reverse abuse",
        "Airflow, door openings, load pattern, ambient heat, mechanical condition, route delay, defrost, sensor location, and pre-cooling influence product temperature."
      ],
      [
        "Receiving",
        "The next custodian inspects before accepting",
        "Vehicle, seal, product and ambient temperatures where required, package damage, leaks, dates, lot, quantity, evidence of refreezing or abuse, and storage readiness guide the decision."
      ],
      [
        "Rotation",
        "Date management needs the correct product context",
        "First-expiring-first-out, label meaning, local law, storage history, package integrity, opening date, producer guidance, and sensory or quality policy influence use and disposal."
      ],
      [
        "Opened package",
        "The consumer or café creates a new exposure",
        "Clean hands, protected pour, prompt return to refrigeration, cap hygiene, refrigerator performance, cross-contact, time open, and discard guidance affect remaining life."
      ],
      [
        "Ambient exception",
        "Unopened shelf-stable products follow a different route",
        "Validated aseptic or retort products may travel at ambient temperature before opening; package integrity, heat exposure, label directions, and refrigeration after opening still apply."
      ]
    ]),
    narration: [
      milkNarration(
        "Hummin",
        "Cold custody is a relay. Every logger, door, pallet, dock, case, refrigerator, opening time, and discard decision can change the product."
      )
    ]
  },
  {
    id: "milk-sensory-service",
    title: "The Milk Service Lab",
    eyebrow: "Hospitality · Observe, heat, foam, and communicate",
    summary:
      "Appearance, aroma, flavor, texture, temperature, package condition, steaming, glass cleanliness, allergens, and guest context shape the final encounter.",
    checkpoint: "Package to guest",
    motion: "push-in",
    artwork: milkArtwork(
      "cold-chain-service",
      "A warm professional service counter is connected to a clean milk refrigerator, unopened package, stainless steaming pitcher, espresso machine, tasting glasses, cold-chain record, and adult service professional."
    ),
    landmark: { label: "Service counter", x: 79, y: 47 },
    drop: { x: 67, y: 69, size: 7 },
    fieldNotes: milkNotes([
      [
        "Look",
        "Package and pour provide the first evidence",
        "Seal, swelling, leakage, date, storage, sediment where unexpected, color, opacity, separation, clotting, foreign matter, and glass cleanliness can stop service before tasting."
      ],
      [
        "Smell",
        "Name the clue before naming the cause",
        "Clean dairy, feed-related, cooked, sulfurous, oxidized, light-struck, rancid, sour, fruity, malty, musty, barny, sanitizer-like, or refrigerator odors need context and investigation."
      ],
      [
        "Taste and texture",
        "Fat, protein, sugar, minerals, process, and temperature interact",
        "Sweetness, saltiness, acidity, cooked character, body, coating, chalkiness, astringency, emulsion stability, foam, and finish help connect sensory evidence to the system."
      ],
      [
        "Steam",
        "Foam is controlled air in a heated protein system",
        "Cold starting milk, clean pitcher, fresh product, steam quality, air introduction, whirlpool, target temperature, protein condition, fat level, and immediate cleaning influence microfoam."
      ],
      [
        "Safety",
        "Do not taste a suspect product to prove it is unsafe",
        "Broken cold chain, swollen or leaking package, curdling, abnormal odor, contamination, allergen uncertainty, or equipment hygiene failure requires rejection and response, not sensory bravado."
      ],
      [
        "Guest",
        "Ask before substituting",
        "Milk allergy, lactose intolerance, dietary choice, plant-source allergen, desired flavor, beverage use, temperature, and cross-contact concerns require clear, non-medical communication."
      ]
    ]),
    narration: [
      milkNarration(
        "Roma",
        "Service is sensory investigation with boundaries. Observe the package, smell the product, taste only when appropriate, steam with purpose, and communicate allergens honestly."
      )
    ]
  },
  {
    id: "milk-shared-glass",
    title: "The Shared Glass",
    eyebrow: "Reconnection · A perishable system remembered",
    summary:
      "The final glass reconnects animal and pasture, skilled care, collection, custody, laboratory evidence, processing, hygiene, package, cold chain, service, and informed choice.",
    checkpoint: "Pasture to memory",
    motion: "reassemble",
    artwork: milkArtwork(
      "shared-glass",
      "At sunset on a SIP Academy terrace, adult farmers, animal-care professionals, hauler, lab technician, creamery operator, packaging worker, distributor, barista, learners, and the ivory robot Hummin gather around one pasteurized milk tasting while pasture, creamery, cold-chain road, waterways, and resource-recovery garden remain connected."
    ),
    landmark: { label: "Shared glass", x: 51, y: 63 },
    drop: { x: 51, y: 65, size: 9 },
    fieldNotes: milkNotes([
      [
        "Animal",
        "The glass begins with living-care decisions",
        "Species, breed, lactation, health, feed, water, comfort, treatment, observation, and the competence of caregivers shape the starting material."
      ],
      [
        "Custody",
        "Every handoff needs identity and conditions",
        "Farm tank, sample, tanker, receiving result, silo, process batch, filler, package, pallet, vehicle, retailer, and opened container form one traceable chain."
      ],
      [
        "Control",
        "No single machine guarantees quality",
        "Cooling, residue prevention, pasteurization, zoning, hygienic design, cleaning, package integrity, refrigeration, and service each control different failure modes."
      ],
      [
        "Choice",
        "Different milk products finish honestly",
        "Species, fat level, lactose-reduced, fortified, cultured, refrigerated, shelf-stable, and plant-based alternatives belong to clearly named paths with different evidence."
      ],
      [
        "Circularity",
        "Losses and resources remain part of the beverage",
        "Animal feed, water, manure nutrients, process water, cleaning chemistry, heat recovery, whey or side streams, packaging, transport, food waste, and local recovery infrastructure need systems thinking."
      ],
      [
        "Guest",
        "Understanding supports informed enjoyment",
        "A safe, well-kept product, clear label, honest allergen communication, appropriate portion, clean service, sensory vocabulary, and respect for preference make the final handoff human."
      ]
    ]),
    narration: [
      milkNarration(
        "Sippy",
        "The glass is not simple because the system is not simple. Understanding reconnects the animal, people, equipment, evidence, package, temperature, and guest."
      ),
      milkNarration(
        "Roma",
        "Taste slowly. You are reading a perishable chain, not memorizing a white liquid."
      )
    ]
  }
];

const milkScenes: BeyondTheGlassScene[] = milkSceneSeeds.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / milkSceneSeeds.length, (index + 1) / milkSceneSeeds.length]
}));

export const milkFieldTrip: BeyondTheGlassChapter = {
  slug: "milk",
  title: "Beyond The Glass",
  chapterTitle: "Milk · From Pasture to Shared Glass",
  subject: "A complete, evidence-led dairy milk field trip",
  description:
    "A visual SIP Academy journey through farm ecology, species and composition, animal care, hygienic milking, cooling, tanker custody, receiving tests, separation, pasteurization, homogenization, shelf-life paths, lactose-free processing, fortification, cultured products, plant-based comparison, hygiene, packaging, cold chain, sensory evaluation, service, traceability, and resource circularity.",
  coreMessage:
    "Milk quality is a connected perishable system: animal care, protected collection, custody evidence, validated processing, hygienic design, truthful naming, package integrity, temperature control, and human judgment carry the beverage safely from pasture to guest.",
  assets: {
    academyMap: "/beyond-the-glass/milk/academy-dawn-1600.webp",
    academyMapSet:
      "/beyond-the-glass/milk/academy-dawn-960.webp 960w, /beyond-the-glass/milk/academy-dawn-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/milk/academy-dawn-960.webp"
  },
  scenes: milkScenes,
  sources: [
    {
      id: "milk-fda-pmo-2023",
      organization: "U.S. Food and Drug Administration",
      title: "Grade “A” Pasteurized Milk Ordinance — 2023 Revision",
      url: "https://www.fda.gov/media/180975/download",
      note:
        "Primary U.S. model reference for farm and plant sanitation, cooling, transportation, raw and pasteurized standards, laboratory programs, pasteurization equipment, time-temperature controls, flow diversion, aseptic and shelf-stable paths, packaging, and records. Other jurisdictions use their own requirements."
    },
    {
      id: "milk-fda-grass-to-glass",
      organization: "U.S. Food and Drug Administration",
      title: "Keeping Your Milk Safe From the Grass to the Glass",
      url: "https://www.fda.gov/consumers/consumer-updates/keeping-your-milk-safe-grass-glass",
      note:
        "Official overview connecting farm design, cooling, transport, worker and equipment controls, pasteurization, laboratory testing, package plant codes, and traceability."
    },
    {
      id: "milk-fda-raw-safety",
      organization: "U.S. Food and Drug Administration",
      title: "Food Safety and Raw Milk",
      url: "https://www.fda.gov/food/buy-store-serve-safe-food/food-safety-and-raw-milk",
      note:
        "Official U.S. public-health reference supporting the raw-milk hazard boundary, the role of pasteurization, and restraint around unsupported raw-milk health claims."
    },
    {
      id: "milk-cdc-raw-milk",
      organization: "U.S. Centers for Disease Control and Prevention",
      title: "Raw Milk",
      url: "https://www.cdc.gov/food-safety/foods/raw-milk.html",
      note:
        "Current public-health reference for raw-milk pathogens, vulnerable populations, pasteurization, and refrigerated handling."
    },
    {
      id: "milk-codex-dairy-terms",
      organization: "Codex Alimentarius Commission",
      title: "CXS 206-1999 — General Standard for the Use of Dairy Terms",
      url: "https://www.fao.org/input/download/standards/332/CXS_206e.pdf",
      note:
        "International reference for milk, milk product, composite, reconstituted and recombined definitions and fair, non-misleading use of dairy terms."
    },
    {
      id: "milk-codex-fermented",
      organization: "Codex Alimentarius Commission",
      title: "CXS 243-2003 — Standard for Fermented Milks",
      url: "https://www.fao.org/input/download/standards/400/CXS_243e.pdf",
      note:
        "International reference for fermented-milk categories, starter organisms, raw materials, composition, hygiene, and labeling context."
    },
    {
      id: "milk-fao-composition",
      organization: "Food and Agriculture Organization of the United Nations",
      title: "Milk Composition",
      url: "https://www.fao.org/dairy-production-products/products/milk-composition/en/",
      note:
        "Authoritative species-level overview supporting contextual discussion of cow, goat, sheep, buffalo, camel, yak and equine milk composition and the influence of breed, diet, lactation, environment, and season."
    },
    {
      id: "milk-fao-farm-practices",
      organization: "Food and Agriculture Organization of the United Nations",
      title: "Dairy Farm Practices",
      url: "https://www.fao.org/dairy-production-products/production/farm-practices/",
      note:
        "Authoritative farm-system overview for animal health, milking hygiene, nutrition, feed and water, welfare, environment, and socioeconomic management."
    },
    {
      id: "milk-woah-welfare",
      organization: "World Organisation for Animal Health",
      title: "Terrestrial Animal Health Code, Chapter 7.11: Animal Welfare and Dairy Cattle Production Systems",
      url: "https://www.woah.org/fileadmin/Home/eng/Health_standards/tahc/current/chapitre_aw_dairy_cattle.pdf",
      note:
        "International animal-welfare framework supporting trained care, outcome-based measures, handling, housing, feeding, health, milking, and transport context."
    },
    {
      id: "milk-fda-dairy-haccp",
      organization: "U.S. Food and Drug Administration",
      title: "Dairy Grade A Voluntary HACCP",
      url: "https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/dairy-grade-voluntary-haccp",
      note:
        "Official U.S. reference for science-based hazard analysis and preventive-control alternatives within the Grade A milk program."
    },
    {
      id: "milk-fda-plant-alternatives",
      organization: "U.S. Food and Drug Administration",
      title: "Plant-Based Milk and Animal Food Alternatives",
      url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/plant-based-milk-and-animal-food-alternatives",
      note:
        "Current U.S. naming, composition, labeling, and nutrition-comparison context for plant-based milk alternatives; guidance status and jurisdiction are identified rather than universalized."
    },
    {
      id: "milk-fda-nutrient-difference",
      organization: "U.S. Food and Drug Administration",
      title: "Milk and Plant-Based Milk Alternatives: Know the Nutrient Difference",
      url: "https://www.fda.gov/consumers/consumer-updates/milk-and-plant-based-milk-alternatives-know-nutrient-difference",
      note:
        "Official consumer reference supporting label-based comparison of protein, calcium, vitamin D, potassium, saturated fat, and added sugar without assuming nutritional equivalence."
    },
    {
      id: "milk-fda-allergens",
      organization: "U.S. Food and Drug Administration",
      title: "Food Allergies: What You Need to Know",
      url: "https://www.fda.gov/food/buy-store-serve-safe-food/food-allergies-what-you-need-know",
      note:
        "Official U.S. reference for major-allergen labeling, including milk, soy, tree nuts, sesame, and other sources relevant to dairy and plant-based comparison."
    },
    {
      id: "milk-fda-food-code",
      organization: "U.S. Food and Drug Administration",
      title: "2022 FDA Food Code",
      url: "https://www.fda.gov/food/fda-food-code/food-code-2022",
      note:
        "Authoritative U.S. model retail-food reference used for receiving, cold holding, employee practice, equipment sanitation, allergen communication, and service context."
    },
    {
      id: "milk-iso-sensory",
      organization: "International Organization for Standardization",
      title: "ISO 22935-1:2009 — Milk and Milk Products: Sensory Analysis",
      url: "https://www.iso.org/standard/41213.html",
      note:
        "International sensory-analysis reference for recruiting, selecting, training and monitoring assessors and for controlled sensory evaluation of milk and milk products."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
