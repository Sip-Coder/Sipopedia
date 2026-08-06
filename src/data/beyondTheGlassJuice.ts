import type {
  BeyondTheGlassChapter,
  BeyondTheGlassFieldNote,
  BeyondTheGlassScene,
  BeyondTheGlassSpeaker
} from "./beyondTheGlassChapters";

const juiceArtwork = (
  filename: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/juice/${filename}-1600.webp`,
  srcSet: `/beyond-the-glass/juice/${filename}-960.webp 960w, /beyond-the-glass/juice/${filename}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/juice/${filename}-portrait-960.webp`,
  portraitSrcSet: `/beyond-the-glass/juice/${filename}-portrait-640.webp 640w, /beyond-the-glass/juice/${filename}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

const note = (eyebrow: string, title: string, detail: string): BeyondTheGlassFieldNote => ({
  eyebrow,
  title,
  detail
});

const line = (
  speaker: BeyondTheGlassSpeaker,
  text: string,
  durationSeconds = 8
) => ({ speaker, text, durationSeconds });

type JuiceSceneSeed = Omit<BeyondTheGlassScene, "number" | "range">;

const juiceSceneSeeds: JuiceSceneSeed[] = [
  {
    id: "juice-conservatory-gate",
    title: "The Juice Conservatory Gate",
    eyebrow: "SIP Academy · Juice",
    summary:
      "Orchard, field, press house, laboratory, package, cold chain, service, and stewardship connect around one living ingredient system.",
    checkpoint: "Crop to Conservatory",
    motion: "establish",
    artwork: juiceArtwork(
      "academy-gate",
      "Sippy, Roma, and Hummin approach a sunrise brass-and-glass Juice Conservatory surrounded by orchards, crop gardens, fruit crates, and luminous water channels."
    ),
    landmark: { label: "Juice Conservatory", x: 57, y: 40 },
    drop: { x: 50, y: 69, size: 7 },
    fieldNotes: [
      note("Foundation", "Juice begins as a crop, not a flavor", "Species, cultivar, climate, soil, water, maturity, harvest, and handling shape what the press can recover."),
      note("Definition", "Fruit juice and nectar are not interchangeable", "Identity, added water, permitted ingredients, soluble solids, and labeling depend on the product and governing standard."),
      note("System", "Extraction is only the middle", "Receiving, sanitation, hazard control, preservation, package, storage, distribution, and service remain connected to the final glass."),
      note("Evidence", "Measurements support—not replace—sensory judgment", "Soluble solids, acidity, pH, temperature, oxygen, microbiology, color, aroma, flavor, and texture answer different questions."),
      note("Boundary", "This journey makes no health promise", "Nutrition and fortification claims require specific evidence and labeling; tasting quality is not medical treatment.")
    ],
    narration: [
      line("Sippy", "Welcome to the Juice Conservatory. We will follow living crops through extraction, control, custody, and service."),
      line("Hummin", "I will keep every lot, measurement, process boundary, package, and handoff connected.", 7)
    ]
  },
  {
    id: "juice-orchard-system-map",
    title: "Orchard to Shared Glass",
    eyebrow: "System map · One connected route",
    summary:
      "A luminous route links plant, harvest, extraction, formulation, preservation, package, market, and the guest.",
    checkpoint: "Origin to guest",
    motion: "glide",
    artwork: juiceArtwork(
      "academy-gate",
      "A wide Juice Conservatory campus with orchard paths, receiving hall, press house, quality laboratory, packaging wing, warehouse, and tasting terrace connected by blue waterways."
    ),
    landmark: { label: "Juice route", x: 51, y: 52 },
    drop: { x: 52, y: 65, size: 7 },
    fieldNotes: [
      note("Inputs", "Name every material before it enters", "Crop lots, water, processing aids, ingredients, packages, and cleaning materials need identity, condition, supplier, and intended use."),
      note("Transformation", "Each operation changes the next", "Maturity affects extraction; extraction affects clarification; oxygen and heat affect flavor; package and storage affect shelf life."),
      note("Specifications", "There is no single ideal juice", "Clear or cloudy, single-strength or from concentrate, chilled or shelf-stable, pulpy or smooth products can be intentional when honestly specified."),
      note("Handoffs", "Custody is part of quality", "Lot records, release status, storage condition, transport, receiving, rotation, and service preserve the product made upstream."),
      note("Study route", "Trace cause before memorizing claims", "Ask what entered, what changed it, what evidence controlled it, and what must remain true at the guest's glass.")
    ],
    narration: [line("Sippy", "This is one route, not a stack of rooms. Every downstream choice remembers the crop and every upstream choice reaches the guest.")]
  },
  {
    id: "juice-crop-origins-seasonality",
    title: "Where Juice Crops Begin",
    eyebrow: "Origin · Crop and season",
    summary:
      "Species, cultivar, growing place, season, maturity, and postharvest condition create different raw materials for extraction.",
    checkpoint: "Plant to harvest window",
    motion: "orbit",
    artwork: juiceArtwork(
      "orchard-anatomy",
      "A botanical Juice Conservatory study garden with correct apple, citrus, grape, berry, pineapple, tomato, and carrot crop zones surrounding a deconstructed fruit display."
    ),
    landmark: { label: "Crop atlas", x: 25, y: 38 },
    drop: { x: 50, y: 64, size: 7 },
    fieldNotes: [
      note("Species", "Different crops demand different handling", "Apples, citrus, grapes, berries, pineapple, tomato, and carrot differ in tissue, enzymes, acidity, pigments, aroma, and extraction behavior."),
      note("Cultivar", "A crop name is not a full specification", "Cultivar can influence soluble solids, acids, color, tannin, aroma, yield, disease sensitivity, storage, and processing suitability."),
      note("Season", "Availability and composition move through the year", "Flowering, fruit set, weather, harvest window, storage, and transport shape when a suitable processing lot exists."),
      note("Place", "Water and growing conditions leave evidence", "Temperature, sunlight, rainfall or irrigation, soil, crop load, pests, and harvest timing can alter composition and condition."),
      note("Receiving question", "Is this lot fit for the intended product?", "Identity, maturity, damage, decay, contamination, temperature, and sensory condition matter more than a picturesque origin story.")
    ],
    narration: [line("Roma", "Before tasting a juice, meet the crop. Variety, season, maturity, and condition are already writing its aroma, acid, sweetness, color, and texture.")]
  },
  {
    id: "juice-fruit-anatomy-ripeness",
    title: "Inside the Fruit",
    eyebrow: "Deconstruction · Anatomy and ripeness",
    summary:
      "Skin, flesh, juice vesicles, seeds, core, vascular tissue, pigments, pectin, sugars, acids, and aroma precursors separate—then rejoin in the press decision.",
    checkpoint: "Structure to extraction",
    motion: "rotate",
    artwork: juiceArtwork(
      "orchard-anatomy",
      "An accurate exploded apple and orange anatomy sequence floats above orchard crops, with intact fruit, peel, flesh, juice structures, seed and core stages held inside a brass study circle."
    ),
    landmark: { label: "Fruit anatomy", x: 50, y: 39 },
    drop: { x: 52, y: 61, size: 8 },
    fieldNotes: [
      note("Surface", "Skin can protect, color, perfume, or challenge", "Waxes, pigments, microbes, soil, residues, damage, peel oils, and bitter compounds make cleaning and extraction crop-specific."),
      note("Cell wall", "Pectin helps hold plant tissue together", "Ripening and processing change pectin structure, influencing juice release, cloud, viscosity, settling, clarification, and pomace."),
      note("Solubles", "Sugars and acids move on different curves", "Soluble solids often rise while acidity and aroma evolve, but crop, weather, physiology, and storage prevent one universal ripeness rule."),
      note("Phenolics", "Color and astringency can travel with extraction", "Pigments and other phenolics may come from skin, seeds, flesh, or damage; oxygen and enzymes can change them rapidly."),
      note("Decision", "Ripeness is fit for purpose", "Fresh-eating maturity, transport maturity, pressing maturity, color target, acid balance, and storage life can point to different harvest windows.")
    ],
    narration: [line("Sippy", "The fruit opens layer by layer. What looks like one ingredient is a set of tissues that respond differently to cutting, pressure, air, heat, and time.")]
  },
  {
    id: "juice-harvest-condition",
    title: "Harvest the Intended Quality",
    eyebrow: "Field operation · Timing and condition",
    summary:
      "Harvest method, maturity, weather, container, time, temperature, and damage determine the material arriving at the press house.",
    checkpoint: "Plant to field bin",
    motion: "push-in",
    artwork: juiceArtwork(
      "orchard-anatomy",
      "A broad orchard and crop study scene showing mature fruit on correct plants, field bins, careful hand harvest, mechanical context, and an anatomy compass for maturity."
    ),
    landmark: { label: "Harvest window", x: 74, y: 48 },
    drop: { x: 69, y: 64, size: 7 },
    fieldNotes: [
      note("Timing", "Harvest follows a product target", "Soluble solids, acidity, pH, color, aroma, texture, size, disease, weather, and processing schedule can all inform the decision."),
      note("Method", "Hand and mechanical harvest trade different risks", "Labor, speed, selectivity, crop type, terrain, damage, foreign material, temperature, and delivery time determine suitability."),
      note("Containers", "Field bins should protect, not crush", "Food-contact suitability, cleanliness, fill depth, drainage, ventilation, shade, and turnover influence damage and microbial growth."),
      note("Temperature", "Time after harvest is active time", "Respiration, softening, enzymatic change, moisture loss, decay, and fermentation risk continue until the crop is cooled or processed."),
      note("Exclusion", "Rot and contamination do not improve in the press", "Dropped, moldy, chemically contaminated, pest-damaged, or badly decayed material needs risk-based rejection or segregation.")
    ],
    narration: [line("Hummin", "Harvest is the first custody transfer. I record what was picked, how, when, in what condition, and how quickly it reached control.")]
  },
  {
    id: "juice-receiving-sort-wash",
    title: "The Receiving Waterway",
    eyebrow: "Control point · Sort, wash, separate",
    summary:
      "Lot identity, inspection, sorting, washing, foreign-material removal, water control, rejects, and drains establish a clean production path.",
    checkpoint: "Field bin to clean crop",
    motion: "glide",
    artwork: juiceArtwork(
      "receiving-hall",
      "A glass-roof juice receiving hall with separate crop lanes, weighing, inspection, sorting tables, flume and spray washers, brush washing, reject channels, drains, and water treatment."
    ),
    landmark: { label: "Clean crop path", x: 57, y: 48 },
    drop: { x: 72, y: 60, size: 7 },
    fieldNotes: [
      note("Lot identity", "Do not wash away traceability", "Supplier, field or origin, cultivar, harvest time, transport, receiving condition, quantity, and lot code follow the crop into the batch record."),
      note("Sorting", "Remove what the process cannot safely correct", "Foreign material, rot, pests, severe damage, wrong crop, and unsuitable maturity are separated before size reduction spreads defects."),
      note("Washing", "Water contact is a controlled operation", "Potable quality where required, sanitizer control, contact time, turbulence, replacement, temperature, and verification depend on the crop and hazard plan."),
      note("Cross-contact", "Separate lanes only work when the system does", "Equipment design, employee flow, drains, hoses, rework, allergens, chemicals, and cleaning records prevent one lot from contaminating another."),
      note("Reject stream", "A reject needs custody too", "Quantity, reason, destination, containment, investigation, and disposition belong in the record; a side conveyor is not a control by itself.")
    ],
    narration: [line("Sippy", "At receiving, the romance of the orchard meets evidence. We keep the right lot, remove the wrong material, and build a controlled clean path.")]
  },
  {
    id: "juice-milling-size-reduction",
    title: "Open the Plant Tissue",
    eyebrow: "Press house · Milling and crushing",
    summary:
      "Cutting, rasping, crushing, or pulping opens cells for extraction while also increasing oxygen contact, heat, enzymes, and surface area.",
    checkpoint: "Whole crop to mash",
    motion: "cutaway",
    artwork: juiceArtwork(
      "press-house",
      "A deconstructive juice press house showing whole apples entering a mill, controlled mash leaving the rollers, sanitary transfer, several distinct press systems, juice pans, pumps, and pomace outlets."
    ),
    landmark: { label: "Apple mill", x: 18, y: 38 },
    drop: { x: 36, y: 60, size: 7 },
    fieldNotes: [
      note("Purpose", "Size reduction prepares extraction", "The machine creates a target particle size and cell disruption suited to the crop, press, yield, cloud, texture, and flavor specification."),
      note("Crop fit", "One mill does not fit every material", "Hard pomes, soft berries, leafy material, carrots, tomatoes, and citrus require different cutting, crushing, pulping, screening, and de-seeding choices."),
      note("Oxygen", "Every new surface can react", "Air contact can accelerate browning, aroma loss, pigment change, oxidation, and microbial exposure, so time and transfer design matter."),
      note("Temperature", "Friction and delay can warm the mash", "Temperature affects viscosity, enzymes, extraction, microbes, aroma, and later preservation; it should be measured rather than assumed."),
      note("Sanitation", "A hidden crevice becomes part of the product", "Hoppers, screens, seals, bearings, guards, discharge chutes, pumps, and dead legs need hygienic design, access, and verified cleaning.")
    ],
    narration: [line("Hummin", "Size reduction is a controlled opening. The machine changes surface area, oxygen exposure, temperature, and what the press can separate.")]
  },
  {
    id: "juice-press-systems-atlas",
    title: "The Press Systems Atlas",
    eyebrow: "Extraction · Pressure, drainage, time",
    summary:
      "Belt, rack-and-cloth, pneumatic membrane, screw, and other press systems create different paths through pressure, drainage, shear, yield, and solids.",
    checkpoint: "Mash to juice and pomace",
    motion: "orbit",
    artwork: juiceArtwork(
      "press-house",
      "A wide brass-framed press atlas with belt, rack-and-cloth, pneumatic membrane, and screw presses shown as distinct complete machines connected to separate juice and pomace streams."
    ),
    landmark: { label: "Press atlas", x: 54, y: 44 },
    drop: { x: 51, y: 63, size: 8 },
    fieldNotes: [
      note("Belt press", "Continuous compression uses porous belts", "Mash is distributed, progressively compressed, and drained; belt condition, cleaning, layer depth, pressure, and speed influence yield and solids."),
      note("Rack and cloth", "Layers create drainage area", "Mash packets alternate with racks before hydraulic compression; labor, loading, cloth care, pressure profile, and cycle time shape the result."),
      note("Membrane press", "An expanding membrane applies programmed pressure", "A closed drum can inflate in stages against perforated drainage surfaces, allowing gentle cycles when suitable for the product."),
      note("Screw press", "Continuous force moves material against resistance", "Feed, screw geometry, backpressure, screen, shear, and crop character affect throughput, solids, extraction, and wear."),
      note("Tradeoff", "Maximum yield is not automatically maximum quality", "Higher pressure or longer extraction may recover more liquid while changing bitterness, astringency, oil, solids, oxidation, and downstream load.")
    ],
    narration: [line("Sippy", "The press does not merely squeeze. Its geometry, pressure, drainage, time, and shear decide which parts of the crop travel into the liquid.")]
  },
  {
    id: "juice-citrus-extraction-rotunda",
    title: "Inside the Citrus Rotunda",
    eyebrow: "Special path · Peel, segments, oil",
    summary:
      "Citrus extraction manages peel oil, bitter tissues, segment membranes, seeds, pulp, and juice vesicles differently from apple pressing.",
    checkpoint: "Orange to separated streams",
    motion: "rotate",
    artwork: juiceArtwork(
      "citrus-extraction",
      "A citrus extraction rotunda with washed oranges, a cup-style extraction machine, peel-oil recovery, screened juice, pulp finishing, sanitary transfer, peel byproduct, and a precise exploded orange anatomy display."
    ),
    landmark: { label: "Citrus extractor", x: 54, y: 31 },
    drop: { x: 65, y: 66, size: 8 },
    fieldNotes: [
      note("Flavedo", "The colored outer peel holds aromatic oil", "Peel pressure and abrasion can recover valuable oil or introduce excessive oil and damage, so equipment separates streams intentionally."),
      note("Albedo", "White peel tissue can contribute bitterness", "Extraction design limits unwanted peel tissue while accepting that fruit condition, cultivar, and pressure alter the balance."),
      note("Vesicles", "Juice is held inside segment structures", "Cup-style or reaming systems open fruit and recover liquid while managing membranes, seeds, core, pulp, and peel differently."),
      note("Finishing", "Pulp level is a specification", "Screens and finishers remove selected coarse material while allowing a deliberate amount and particle size of pulp into the product."),
      note("Byproducts", "Peel, pulp, seed, and oil streams need separate plans", "Food, flavor, feed, extraction, energy, compost, or disposal routes depend on safety, quality, regulation, and local infrastructure.")
    ],
    narration: [line("Roma", "Citrus is a lesson in boundaries. The fragrant peel, bitter white tissue, juicy vesicles, pulp, and seeds each need a deliberate destination.")]
  },
  {
    id: "juice-cloud-pectin-clarification",
    title: "The Cloud & Pectin Lab",
    eyebrow: "Separation · Clarity with purpose",
    summary:
      "Pectin, starch, proteins, cell fragments, oils, colloids, enzymes, settling, centrifugation, and membranes shape a chosen clarity and texture.",
    checkpoint: "Raw juice to specified cloud",
    motion: "cutaway",
    artwork: juiceArtwork(
      "clarity-lab",
      "Hummin studies a glass chamber of suspended juice particles beside settling vessels, a centrifuge, membrane filtration, sampling flasks, and separate intentionally cloudy and clear product paths."
    ),
    landmark: { label: "Cloud chamber", x: 50, y: 30 },
    drop: { x: 50, y: 55, size: 8 },
    fieldNotes: [
      note("Cloud", "Suspension can be desired or unstable", "Particle size, density, pectin, proteins, oil, charge, temperature, and time determine whether cloud stays dispersed, sediments, or separates."),
      note("Pectin", "Plant structure becomes a processing variable", "Pectin can raise viscosity and resist pressing or filtration; approved pectolytic enzymes may be used under controlled conditions for a defined purpose."),
      note("Settling", "Gravity works when particles can separate", "Time, temperature, tank geometry, flocculation behavior, microbial risk, and product protection determine whether settling is practical."),
      note("Centrifuge", "Density difference becomes mechanical separation", "Bowl speed, flow, solids load, discharge, oxygen pickup, heat, and cleaning affect clarification and yield."),
      note("Membrane", "Pore and pressure select a different boundary", "Prefiltration, fouling, transmembrane pressure, temperature, recovery, cleaning, and integrity matter; filtration is not a universal safety step.")
    ],
    narration: [line("Hummin", "Cloud is not automatically a defect and clarity is not automatically purity. The specification decides what remains suspended and why.")]
  },
  {
    id: "juice-blending-formulation",
    title: "The Blend Observatory",
    eyebrow: "Formulation · Identity before addition",
    summary:
      "Single juices, blends, water, concentrate, pulp, permitted ingredients, processing aids, and sensory targets meet inside a documented formulation.",
    checkpoint: "Components to blend",
    motion: "orbit",
    artwork: juiceArtwork(
      "formulation-observatory",
      "Roma and Hummin work beside a sanitary blending vessel receiving three colored juice streams, with balances, refractometer, pH and acidity tools, water, concentrate, mixing, and a tasting bench."
    ),
    landmark: { label: "Blend vessel", x: 53, y: 36 },
    drop: { x: 52, y: 58, size: 8 },
    fieldNotes: [
      note("Identity", "Juice, blend, nectar, drink, and beverage differ", "Product name and composition must match applicable standards and labeling; adding water or other ingredients can change the legal and consumer identity."),
      note("Blend", "Components should have defined jobs", "Crop lots may balance soluble solids, acidity, aroma, color, body, consistency, cost, season, and availability without hiding defects."),
      note("Water", "Reconstitution water is an ingredient", "Potability, mineral character, disinfectant, odor, microbiology, temperature, measurement, and line condition affect the finished product."),
      note("Order", "Addition sequence changes dispersion", "Pulp, concentrates, dry ingredients, flavors, acids, vitamins, and stabilizers—when permitted—need controlled weighing, mixing, temperature, and hold time."),
      note("Control", "A formula becomes a batch only through verification", "Ingredient lots, actual weights, yield, mixing, checks, deviations, rework, and release status are recorded against the approved specification.")
    ],
    narration: [line("Sippy", "A blend is not a disguise. Each component needs an identity, a measured purpose, and a truthful place in the finished product.")]
  },
  {
    id: "juice-brix-acid-balance",
    title: "Read the Balance",
    eyebrow: "Measurement · Soluble solids, acid, pH",
    summary:
      "Refractometry, density, titratable acidity, pH, temperature, sensory context, and calibration describe different pieces of the juice balance.",
    checkpoint: "Sample to decision",
    motion: "push-in",
    artwork: juiceArtwork(
      "formulation-observatory",
      "A detailed juice measurement observatory with refractometer, density glassware, pH electrode, titration bench, calibrated balance, blend vessel, natural juice samples, and Roma evaluating aroma."
    ),
    landmark: { label: "Measurement bench", x: 47, y: 67 },
    drop: { x: 46, y: 61, size: 7 },
    fieldNotes: [
      note("Refractometry", "Degrees Brix estimates soluble solids", "In juice, refractive index is often expressed as sucrose-equivalent soluble solids; acids and other dissolved components mean it is not a direct sugar assay."),
      note("Temperature", "A reading needs conditions", "Automatic or manual temperature correction, sample homogenization, pulp, bubbles, prism cleanliness, calibration, and method affect the result."),
      note("Titratable acidity", "Titration measures neutralizable acid", "It is reported to an endpoint and usually expressed as a specified acid equivalent; method, endpoint, units, and sample preparation must travel with the number."),
      note("pH", "Hydrogen-ion activity answers a different question", "pH influences taste, pigment, microbial behavior, preservative effectiveness, and process design but does not replace titratable acidity."),
      note("Sensory", "Numbers do not predict perception alone", "Sugar-acid balance, aroma, bitterness, astringency, pulp, temperature, color, expectations, and individual sensitivity shape the experience.")
    ],
    narration: [line("Roma", "I compare the number with the glass. Brix, acidity, and pH are powerful clues, but none of them can taste the product for us.")]
  },
  {
    id: "juice-pasteurization-control",
    title: "The Time–Temperature Passage",
    eyebrow: "Preservation · Validated heat",
    summary:
      "Product, target organism, temperature, time, flow, equipment, package, monitoring, verification, and corrective action make pasteurization a controlled process—not a glowing pipe.",
    checkpoint: "Raw stream to heat-controlled stream",
    motion: "glide",
    artwork: juiceArtwork(
      "process-control",
      "A juice process-control hall with a colored tubular heat exchanger, hold section, cooling zone, batch vessel, sensors, flow diversion, recorder, a separate high-pressure chamber, and a specialized ultraviolet path."
    ),
    landmark: { label: "Hold tube", x: 50, y: 35 },
    drop: { x: 54, y: 59, size: 8 },
    fieldNotes: [
      note("Hazard control", "The process target comes from the hazard analysis", "U.S. juice HACCP generally requires controls achieving at least a 5-log reduction in the pertinent microorganism for the juice, with process-specific validation."),
      note("Heat profile", "Temperature alone is incomplete", "Come-up, holding time, flow, cold spot, viscosity, particles, acidity, equipment, diversion, cooling, and package route define actual exposure."),
      note("Monitoring", "Critical limits need direct evidence", "Calibrated temperature, flow or residence time, pressure relationships where applicable, alarms, diversion, operator checks, and records support control."),
      note("Quality", "Heat can protect safety and change sensory quality", "Aroma, cooked character, color, vitamins, cloud, enzymes, texture, dissolved oxygen, and package compatibility influence process selection."),
      note("Deviation", "A missed limit is a custody event", "Affected product is identified and held while cause, records, disposition, correction, and preventive action are evaluated by authorized personnel.")
    ],
    narration: [line("Hummin", "A safe thermal process is a validated combination of product, equipment, time, temperature, flow, monitoring, and response. The pipe is only its visible shell.")]
  },
  {
    id: "juice-nonthermal-options",
    title: "The Alternate Energy Gallery",
    eyebrow: "Preservation · Process-specific alternatives",
    summary:
      "High pressure and specialized ultraviolet systems can serve defined products and packages, but 'nonthermal' does not mean universal, inactive, or automatically superior.",
    checkpoint: "Technology to validated use",
    motion: "orbit",
    artwork: juiceArtwork(
      "process-control",
      "A side-by-side educational hall separating heat exchange, sealed-package high-pressure processing, and a specialized ultraviolet flow cell with complete safety enclosures and sample points."
    ),
    landmark: { label: "Pressure chamber", x: 74, y: 48 },
    drop: { x: 74, y: 60, size: 8 },
    fieldNotes: [
      note("High pressure", "Pressure acts through a sealed product system", "Pressure level, hold, temperature, come-up cycles, product composition, package flexibility, target organism, equipment loading, and validation determine performance."),
      note("Ultraviolet", "Optical transmission sets a hard boundary", "Color, turbidity, particles, path length, flow, fouling, lamp output, dose delivery, organism, and reactor validation limit suitable juice applications."),
      note("Quality", "Reduced heat exposure is not zero change", "Pressure or ultraviolet treatment can still affect enzymes, cloud, color, texture, flavor, nutrients, package, and shelf life depending on the system."),
      note("Refrigeration", "A process and a storage condition are different controls", "Some products remain dependent on validated cold storage after treatment; the label and distribution system must match that requirement."),
      note("Verification", "New technology does not bypass HACCP", "Scientific support, process authority or qualified expertise, validation, monitoring, calibration, maintenance, records, corrective action, and reassessment remain essential.")
    ],
    narration: [line("Sippy", "Alternative energy changes the engineering, not the responsibility. Every process must fit the exact juice, hazard, equipment, package, and storage route.")]
  },
  {
    id: "juice-concentrate-aroma-recovery",
    title: "The Concentration Tower",
    eyebrow: "Water removal · Volume and aroma",
    summary:
      "Vacuum evaporation, staging, temperature, residence time, vapor separation, aroma recovery, condensed water, concentrate storage, and oxidation reshape the product before reconstitution.",
    checkpoint: "Single strength to concentrate",
    motion: "push-in",
    artwork: juiceArtwork(
      "concentration-tower",
      "A monumental multi-effect juice vacuum evaporation tower with visible stages, vapor separator, aroma recovery, condensate recovery, concentrate receiver, storage bay, and guides approaching at sunrise."
    ),
    landmark: { label: "Vacuum effects", x: 50, y: 39 },
    drop: { x: 53, y: 63, size: 8 },
    fieldNotes: [
      note("Vacuum", "Lower pressure lowers boiling temperature", "Vacuum evaporation can remove water at lower temperatures than atmospheric boiling, but heat history and residence time still affect quality."),
      note("Multiple effects", "Vapor energy can be reused", "Staged evaporators improve energy efficiency by using vapor from one effect to heat another under progressively lower pressure."),
      note("Aroma", "Volatile compounds may leave with vapor", "Aroma recovery systems can capture selected volatile fractions for controlled return, but composition and sensory impact require verification."),
      note("Concentrate", "Higher solids change handling", "Viscosity, pumping, heat transfer, mixing, freezing, microbial stability, crystallization, storage temperature, oxygen, and package become different engineering problems."),
      note("Identity", "From concentrate is a production path", "Concentration can support seasonal storage and transport efficiency; honest identity and reconstitution targets matter more than a simple quality hierarchy.")
    ],
    narration: [line("Hummin", "The tower removes water, not history. I track soluble solids, aroma fractions, heat exposure, recovered water, storage, and every later return to single strength.")]
  },
  {
    id: "juice-reconstitution-fortification",
    title: "Rebuild the Specification",
    eyebrow: "Formulation · Reconstitution and optional additions",
    summary:
      "Measured water, concentrate, recovered aroma, pulp, permitted ingredients, fortification, mixing, identity, nutrition facts, and claims return the product to a documented target.",
    checkpoint: "Concentrate to finished blend",
    motion: "reassemble",
    artwork: juiceArtwork(
      "concentration-tower",
      "A juice concentration and reconstitution tower with measured clean water and concentrate paths meeting a blend vessel, a distinct aroma loop, optional ingredient station, and finished-juice receiver."
    ),
    landmark: { label: "Reconstitution bay", x: 75, y: 66 },
    drop: { x: 71, y: 61, size: 7 },
    fieldNotes: [
      note("Water", "Return water by measurement, not appearance", "Water volume or mass, concentrate solids, final Brix, acidity, density, temperature, yield, and mixing verify the target product."),
      note("Aroma and pulp", "Recovered components need controlled custody", "Origin, storage, oxidation, microbiology, addition point, quantity, dispersion, and sensory confirmation remain part of the batch."),
      note("Fortification", "Added nutrients are regulated ingredients", "Identity, form, amount, stability, interactions, overage, permitted use, nutrition labeling, and claims require technical and regulatory review."),
      note("Claims", "Words should not outrun evidence", "'Natural,' nutrient-content, structure/function, health, no-added-sugar, and other claims have distinct conditions and should not imply disease treatment."),
      note("Verification", "Reconstitution ends with release evidence", "Formula, lots, actual additions, blend uniformity, Brix, acidity, pH, sensory, process status, package, and finished yield support disposition.")
    ],
    narration: [line("Sippy", "Reconstitution is not guesswork. Water, concentrate, aroma, pulp, nutrients, identity, measurement, and labeling must reassemble into the approved product.")]
  },
  {
    id: "juice-spoilage-safety-command",
    title: "The Quality Command Room",
    eyebrow: "Food safety · Prevent, verify, release",
    summary:
      "Hazard analysis, sanitation, process control, spoilage investigation, environmental and product evidence, retain samples, release, hold, recall readiness, and records form one defense system.",
    checkpoint: "Evidence to disposition",
    motion: "orbit",
    artwork: juiceArtwork(
      "quality-command",
      "A circular juice quality room with sanitary sampling, microscopes, incubators, retain-sample archive, package inspection, cleaning verification, lot pathways, and distinct hold and release gates."
    ),
    landmark: { label: "Evidence ring", x: 50, y: 50 },
    drop: { x: 52, y: 62, size: 8 },
    fieldNotes: [
      note("Hazards", "Safety and spoilage are not synonyms", "A product can spoil without causing disease or carry a hazard without obvious spoilage; hazard analysis and specifications address different outcomes."),
      note("Microbes", "Acid-tolerant organisms still deserve control", "Yeasts, molds, acid-tolerant bacteria, and pertinent pathogens depend on product, ingredients, environment, process, package, and storage."),
      note("Sanitation", "Cleaning removes soil; sanitizing follows a verified method", "Chemistry, concentration, time, temperature, mechanical action, coverage, rinse, residues, equipment design, and verification affect results."),
      note("Shelf life", "Stability is demonstrated under intended conditions", "Microbiology, chemistry, sensory quality, package integrity, temperature, light, oxygen, abuse, and end-of-life criteria shape the study."),
      note("Release", "A green gate represents authority, not optimism", "Completed records, specifications, process status, lab and sensory results, deviations, package checks, traceability, and authorized disposition support release.")
    ],
    narration: [line("Hummin", "Quality is not one test. I connect hazards, sanitation, process records, samples, packages, shelf life, traceability, and the authority to hold or release.")]
  },
  {
    id: "juice-packaging-oxygen-light",
    title: "The Packaging Gallery",
    eyebrow: "Protection · Fill, close, shield",
    summary:
      "Filler, closure, headspace, oxygen, light, package material, seal, code, case, integrity, and consumer use protect different product needs.",
    checkpoint: "Released juice to protected unit",
    motion: "glide",
    artwork: juiceArtwork(
      "packaging-gallery",
      "A text-free juice packaging gallery with sanitary filler and capper, clear and amber glass, opaque carton, PET bottle and bag-in-box lanes, oxygen sampling, light cabinet, closure inspection, case packer, and reject path."
    ),
    landmark: { label: "Package lanes", x: 52, y: 56 },
    drop: { x: 52, y: 63, size: 7 },
    fieldNotes: [
      note("Fill", "The filling environment is part of preservation", "Product temperature, filler hygiene, container preparation, headspace, foam, line speed, fill volume, closure timing, and post-fill handling need control."),
      note("Oxygen", "Air can enter before, during, and after filling", "Dissolved oxygen, headspace oxygen, package permeability, closure seal, light, temperature, and time influence browning, aroma, pigment, and nutrient stability."),
      note("Light", "Transparency is a sensory and stability choice", "Clear glass or plastic displays color but may expose light-sensitive components; amber or opaque materials change protection and consumer visibility."),
      note("Formats", "Glass, PET, carton, and bag-in-box trade different strengths", "Barrier, weight, breakage, closure, filling process, shelf life, transport, serving pattern, recovery system, and local infrastructure affect suitability."),
      note("Integrity", "A package must remain a controlled boundary", "Fill, torque or seam, seal, leak, code, label, lot, case, drop and transport checks support release and later investigation.")
    ],
    narration: [line("Sippy", "The package is a small protective room. Material, light, oxygen, closure, fill hygiene, storage, and use decide how well it guards the juice.")]
  },
  {
    id: "juice-cold-chain-traceability",
    title: "The Custody Relay",
    eyebrow: "Distribution · Condition and memory",
    summary:
      "Released lot, pallet, warehouse, temperature requirement, truck, receiver, display, rotation, return, complaint, and recall connect the factory to the market.",
    checkpoint: "Package to market",
    motion: "glide",
    artwork: juiceArtwork(
      "cold-chain-relay",
      "A Juice Conservatory logistics panorama showing released cases, cold warehouse, refrigerated and ambient transport lanes, receiving inspection, retail chill case, shelf-stable display, service counter, and glowing traceability routes."
    ),
    landmark: { label: "Custody relay", x: 52, y: 58 },
    drop: { x: 52, y: 66, size: 7 },
    fieldNotes: [
      note("Condition", "Storage instructions belong to the product", "Some juices require continuous refrigeration; others are commercially shelf-stable until opening. Process, package, label, and validation determine the route."),
      note("Warehouse", "Release status and location must agree", "Pallet identity, lot, quantity, condition, storage zone, temperature where required, rotation, pest control, damage, hold, and shipping record protect custody."),
      note("Transport", "A clean trailer is not the whole check", "Preload condition, sanitation, temperature where required, loading pattern, dwell time, seal, route, data, receiving inspection, and deviations matter."),
      note("Traceability", "One step back and forward is only the beginning", "Key data events and critical tracking information support faster identification, investigation, withdrawal, recall, and communication where rules apply."),
      note("Complaint", "The guest can reveal a system signal", "Package code, place, date, storage, opening, photos, symptoms or quality description, retained product, related lots, and escalation turn a complaint into evidence.")
    ],
    narration: [line("Hummin", "A lot should never disappear between factory and shelf. I remember identity, condition, location, handoff, and every reason to hold, return, or investigate.")]
  },
  {
    id: "juice-sensory-conservatory",
    title: "Read the Juice Flight",
    eyebrow: "Sensory · Evidence in the glass",
    summary:
      "Appearance, aroma, flavor, sweetness, acidity, bitterness, astringency, body, pulp, temperature, finish, and faults become a structured comparison.",
    checkpoint: "Glass to sensory map",
    motion: "orbit",
    artwork: juiceArtwork(
      "sensory-conservatory",
      "Roma leads adult learners through a modest six-juice flight in a botanical glasshouse with aroma domes, color light, balance scales, texture samples, water, and consistent tasting glasses."
    ),
    landmark: { label: "Tasting flight", x: 50, y: 54 },
    drop: { x: 51, y: 63, size: 7 },
    fieldNotes: [
      note("Appearance", "Observe before you interpret", "Color, intensity, haze, sediment, pulp, separation, bubbles, viscosity, and package-to-glass behavior may be expected, unstable, or defective by specification."),
      note("Aroma", "Separate fruit identity from processing clues", "Fresh, ripe, cooked, concentrated, fermented, oxidized, sulfurous, earthy, moldy, solvent-like, packaging, and storage notes need context before judgment."),
      note("Palate", "Name dimensions before preference", "Sweetness, acidity, bitterness, astringency, saltiness where relevant, body, pulp, oil, temperature, flavor intensity, balance, length, and afterfeel can be compared."),
      note("Method", "Control the comparison", "Same glass, pour, temperature, order, light, timing, palate reset, blind coding where useful, and clear vocabulary make differences easier to trust."),
      note("Fault", "A sensory departure should trigger evidence", "Confirm with a second sample, package and lot check, reference or retain sample, measurement, storage review, and investigation rather than diagnosis by one aroma.")
    ],
    narration: [line("Roma", "Slow down just enough to notice. I separate what I see, smell, taste, and feel—then trace each clue back through fruit, process, package, and service.")]
  },
  {
    id: "juice-service-menu-context",
    title: "The Juice Service Bar",
    eyebrow: "Hospitality · Cold, clean, truthful",
    summary:
      "Receiving, rotation, refrigeration where required, opening, holding, dispense, glass, ice, dilution, garnish, menu language, portion, allergens, and guest preference complete the final handoff.",
    checkpoint: "Package to guest",
    motion: "cutaway",
    artwork: juiceArtwork(
      "sensory-conservatory",
      "A detailed Juice Conservatory service bar with adult staff, a modest juice flight, clean glassware, chilled storage, covered aroma samples, water, temperature station, pulp comparisons, and adult guests."
    ),
    landmark: { label: "Service bar", x: 67, y: 55 },
    drop: { x: 62, y: 64, size: 7 },
    fieldNotes: [
      note("Receiving", "Service inherits the storage requirement", "Code, seal, condition, temperature where required, shelf life, rotation, opening instructions, allergens, and recall notices are checked before use."),
      note("Opening", "The package boundary changes after opening", "Refrigeration, covered storage, clean caps or taps, time marking where required, cross-contact prevention, and discard criteria depend on product and local rules."),
      note("Dispense", "Clean equipment protects the producer's work", "Pitchers, taps, lines, pumps, blenders, knives, boards, ice wells, glasses, garnishes, and reusable bottles need food-safe handling and cleaning."),
      note("Menu", "Describe the actual beverage", "Fruit or vegetable identity, from-concentrate status where required, added ingredients, allergens, sweetness, pulp, processing, serving size, and claims should be truthful and useful."),
      note("Guest", "Preference is not a deficiency", "Still or sparkling, clear or pulpy, cold or cool, tart or sweet, single fruit or blend are choices; service helps guests navigate without inventing wellness promises.")
    ],
    narration: [line("Sippy", "Hospitality is the last control point: receive honestly, store correctly, open cleanly, describe truthfully, and serve the product the guest actually chose.")]
  },
  {
    id: "juice-circularity-shared-glass",
    title: "The Orchard Returns",
    eyebrow: "Reconnection · Material, water, people",
    summary:
      "Crop, juice, pomace, peel, seed, pulp, water, energy, package, logistics, soil, evidence, and a shared glass reconnect without pretending every loop is automatic.",
    checkpoint: "Byproduct to responsibility",
    motion: "reassemble",
    artwork: juiceArtwork(
      "circularity-finale",
      "An evening Juice Conservatory terrace where adult growers, production, quality and hospitality professionals, Sippy, Roma, and Hummin share modest juices while separate conditional loops connect pomace, peel, water treatment, crates, packages, orchard soil, and the glowing press house."
    ),
    landmark: { label: "Shared glass", x: 48, y: 54 },
    drop: { x: 49, y: 64, size: 9 },
    fieldNotes: [
      note("Prevention", "The best byproduct starts with avoided loss", "Crop forecasting, harvest, receiving, yield, line changeover, leakage, overfill, rejects, shelf life, ordering, storage, and service waste all deserve measurement."),
      note("Pomace and peel", "A secondary route needs its own specification", "Food ingredients, flavor or pectin extraction, feed, digestion, compost, energy, or disposal depend on composition, contamination, stability, transport, regulation, and demand."),
      note("Water", "Reuse requires treatment and a fit-for-purpose boundary", "Source, soil load, chemicals, microbes, treatment, validation, monitoring, cross-connection control, intended use, discharge, and local rules decide the safe route."),
      note("Package", "Material choice meets local recovery reality", "Lightweighting, refill, collection, recycled content, recyclability, breakage, barrier, food contact, transport, litter, and local infrastructure create tradeoffs."),
      note("Reconnection", "The glass contains decisions, not just juice", "Origin, maturity, extraction, formulation, preservation, package, custody, service, and stewardship become useful when the learner can trace their relationships.")
    ],
    narration: [
      line("Sippy", "The orchard returns through what we prevent, recover, verify, and share. No loop is honest without a safe destination and evidence that it works."),
      line("Roma", "Taste again. The glass now carries crop, texture, process, package, people, and every choice that kept them connected.", 7)
    ]
  }
];

const juiceScenes: BeyondTheGlassScene[] = juiceSceneSeeds.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / juiceSceneSeeds.length, (index + 1) / juiceSceneSeeds.length]
}));

export const juiceFieldTrip: BeyondTheGlassChapter = {
  slug: "juice",
  title: "Beyond The Glass",
  chapterTitle: "Juice · From Orchard to Shared Glass",
  subject: "A complete, evidence-led juice field trip",
  description:
    "A visual SIP Academy journey through crop origin and ripeness, harvest, receiving, washing, milling, press systems, citrus extraction, pectin and clarification, formulation, Brix and acid, validated preservation, concentration and reconstitution, food safety, packaging, custody, sensory evaluation, service, and material stewardship.",
  coreMessage:
    "Juice is not simply fruit in a bottle: plant anatomy, maturity, extraction, measurement, preservation, package, custody, service, and responsible material choices keep crop identity truthful and the guest's glass fit to share.",
  assets: {
    academyMap: "/beyond-the-glass/juice/academy-gate-1600.webp",
    academyMapSet:
      "/beyond-the-glass/juice/academy-gate-960.webp 960w, /beyond-the-glass/juice/academy-gate-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/juice/academy-gate-960.webp"
  },
  scenes: juiceScenes,
  sources: [
    {
      id: "juice-fda-haccp-regulation",
      organization: "Electronic Code of Federal Regulations",
      title: "21 CFR Part 120 — Hazard Analysis and Critical Control Point Systems",
      url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-120",
      note: "Primary U.S. rule for juice HACCP, sanitation standard operating procedures, hazard analysis, the 5-log performance requirement, monitoring, corrective action, verification, records, and imported juice."
    },
    {
      id: "juice-fda-hazards-controls-guidance",
      organization: "U.S. Food and Drug Administration",
      title: "Juice HACCP Hazards and Controls Guidance, First Edition",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-juice-hazard-analysis-critical-control-point-hazards-and-controls-guidance-first",
      note: "Official hazard-control guidance supporting crop receiving, pathogens, patulin context, process controls, pasteurization, equipment, verification, and product-specific analysis."
    },
    {
      id: "juice-codex-standard",
      organization: "Codex Alimentarius Commission",
      title: "CXS 247-2005 — General Standard for Fruit Juices and Nectars",
      url: "https://workspace.fao.org/sites/codex/Standards/CXS%20247-2005/CXS_247e.pdf",
      note: "International identity and composition reference for fruit juices, juices from concentrate, concentrated fruit juice, water extraction, fruit purée and nectars, including Brix and permitted ingredients context."
    },
    {
      id: "juice-fda-cgmp-preventive-controls",
      organization: "U.S. Food and Drug Administration",
      title: "Current Good Manufacturing Practice, Hazard Analysis, and Risk-Based Preventive Controls for Human Food",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-current-good-manufacturing-practice-hazard-analysis-and-risk-based-preventive",
      note: "Primary U.S. food-safety framework supporting hygienic design, sanitation, supply-chain controls, process controls, allergen controls, monitoring, corrective action, verification, records, and recall planning."
    },
    {
      id: "juice-fda-unpasteurized-warning",
      organization: "Electronic Code of Federal Regulations",
      title: "21 CFR 101.17(g) — Warning Statement for Fruit and Vegetable Juice Products",
      url: "https://www.ecfr.gov/current/title-21/section-101.17",
      note: "Primary U.S. labeling requirement for specified untreated packaged juice products that have not been processed to prevent, reduce, or eliminate pathogens."
    },
    {
      id: "juice-fda-fortification-policy",
      organization: "Electronic Code of Federal Regulations",
      title: "21 CFR 104.20 — Nutritional Quality Guidelines for Foods",
      url: "https://www.ecfr.gov/current/title-21/section-104.20",
      note: "Primary U.S. fortification-policy reference supporting rational nutrient addition and restraint around indiscriminate fortification."
    },
    {
      id: "juice-fda-food-labeling-guide",
      organization: "U.S. Food and Drug Administration",
      title: "Food Labeling Guide",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-food-labeling-guide",
      note: "Official U.S. guidance supporting statement of identity, ingredient declarations, nutrition labeling, nutrient-content claims, net quantity, and other package communication."
    },
    {
      id: "juice-iso-soluble-solids",
      organization: "International Organization for Standardization",
      title: "ISO 2173:2003 — Fruit and Vegetable Products: Determination of Soluble Solids — Refractometric Method",
      url: "https://www.iso.org/standard/35851.html",
      note: "International method reference supporting careful discussion of refractometric soluble-solids measurement, sample preparation, temperature, and reporting."
    },
    {
      id: "juice-iso-titratable-acidity",
      organization: "International Organization for Standardization",
      title: "ISO 750:1998 — Fruit and Vegetable Products: Determination of Titratable Acidity",
      url: "https://www.iso.org/standard/22569.html",
      note: "International method reference supporting titration, endpoint, expression of results, and distinction between titratable acidity and pH."
    },
    {
      id: "juice-fda-traceability-rule",
      organization: "U.S. Food and Drug Administration",
      title: "FSMA Final Rule: Requirements for Additional Traceability Records for Certain Foods",
      url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods",
      note: "Official traceability context for key data elements, critical tracking events, traceability plans, investigations, and records; applicability depends on the food and supply chain."
    },
    {
      id: "juice-fda-food-code",
      organization: "U.S. Food and Drug Administration",
      title: "2022 FDA Food Code",
      url: "https://www.fda.gov/food/fda-food-code/food-code-2022",
      note: "Authoritative model retail-food reference used for receiving, temperature control, equipment sanitation, employee practices, time marking, cross-contamination prevention, and service context."
    },
    {
      id: "juice-epa-water-reuse",
      organization: "U.S. Environmental Protection Agency",
      title: "National Water Reuse Action Plan",
      url: "https://www.epa.gov/waterreuse/national-water-reuse-action-plan",
      note: "Primary U.S. water-reuse planning context supporting fit-for-purpose treatment, risk management, local requirements, monitoring, and cross-connection control rather than automatic process-water reuse."
    },
    {
      id: "juice-usda-fooddata-central",
      organization: "U.S. Department of Agriculture",
      title: "FoodData Central",
      url: "https://fdc.nal.usda.gov/",
      note: "Primary U.S. nutrient-composition database used as context for crop and juice composition variability; it does not substitute for a finished product's verified nutrition labeling."
    },
    {
      id: "juice-fao-processing-manual",
      organization: "Food and Agriculture Organization of the United Nations",
      title: "Fruit and Vegetable Processing",
      url: "https://www.fao.org/4/v5030e/v5030e00.htm",
      note: "Technical processing reference supporting receiving, preparation, extraction, clarification, concentration, preservation, packaging, byproduct, and small-to-industrial operation context."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
