import type {
  BeyondTheGlassChapter,
  BeyondTheGlassFieldNote,
  BeyondTheGlassNarrationLine,
  BeyondTheGlassScene,
  BeyondTheGlassSpeaker
} from "./beyondTheGlassChapters";

const sodasArtwork = (
  slug: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/sodas/${slug}-1600.webp`,
  srcSet:
    `/beyond-the-glass/sodas/${slug}-960.webp 960w, ` +
    `/beyond-the-glass/sodas/${slug}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/sodas/${slug}-portrait-960.webp`,
  portraitSrcSet:
    `/beyond-the-glass/sodas/${slug}-portrait-640.webp 640w, ` +
    `/beyond-the-glass/sodas/${slug}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  position: "center",
  portraitPosition: "center",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

const note = (
  eyebrow: string,
  title: string,
  detail: string
): BeyondTheGlassFieldNote => ({ eyebrow, title, detail });

const guide = (
  speaker: BeyondTheGlassSpeaker,
  text: string,
  durationSeconds = 7
): BeyondTheGlassNarrationLine => ({ speaker, text, durationSeconds });

type SodasSceneSeed = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  checkpoint: string;
  motion: BeyondTheGlassScene["motion"];
  art: string;
  alt: string;
  landmark: BeyondTheGlassScene["landmark"];
  drop: BeyondTheGlassScene["drop"];
  fieldNotes: BeyondTheGlassFieldNote[];
  narration: BeyondTheGlassNarrationLine[];
};

const sodasSceneSeeds: SodasSceneSeed[] = [
  {
    id: "sodas-academy-gate",
    title: "The Sodas Adventure",
    eyebrow: "SIP Academy · Carbonated beverages",
    summary:
      "A bright bubble rises through the Academy's Soda Pavilion and opens a complete route from treated water and formulation to pressure, package, fountain, and shared service.",
    checkpoint: "Water to shared sparkle",
    motion: "establish",
    art: "sodas-opening",
    alt:
      "Sippy, Roma, and Hummin walking through the brass-and-glass SIP Academy Soda Pavilion at sunrise, surrounded by cyan water canals, ingredient galleries, stainless process vessels, and generic sparkling beverages.",
    landmark: { label: "Soda Pavilion", x: 50, y: 42 },
    drop: { x: 51, y: 54, size: 8 },
    fieldNotes: [
      note("Category", "Soda is a family, not one formula", "Carbonated water-based flavored drinks can differ in sweetener system, acidity, flavor, color, cloud, caffeine, juice content, preservation, package, and local legal identity."),
      note("Foundation", "Water carries the entire design", "Source conditions and treatment affect flavor clarity, ingredient performance, equipment, and consistency."),
      note("Pressure", "Carbon dioxide changes both texture and process", "Dissolved gas creates bite and bubbles while requiring cold product, controlled pressure, suitable equipment, and sound closures."),
      note("Evidence", "Every handoff leaves a record", "Ingredient custody, batch ratios, process checks, package inspection, lot coding, and distribution history support release and investigation."),
      note("Choice", "The label belongs inside the lesson", "Ingredient and nutrition information can support comparison without turning one beverage into a universal verdict about health."),
      note("Field team", "Three guides read three kinds of clues", "Sippy follows the route, Roma translates sensory structure, and Hummin protects measurements and process memory.")
    ],
    narration: [
      guide("Sippy", "Welcome to the Soda Pavilion. We will follow water, flavor, pressure, package, and service as one connected system."),
      guide("Roma", "I will show how sweetness, acidity, aroma, bubbles, temperature, and glass shape the experience."),
      guide("Hummin", "I will hold the specifications, records, and jurisdiction flags. No single formula speaks for every soda.")
    ]
  },
  {
    id: "sodas-route-atlas",
    title: "The Bubble Route",
    eyebrow: "Process atlas",
    summary:
      "The Academy route links treatment, formulation, cooling, carbonation, filling, quality, logistics, and service without pretending every product uses identical equipment or ingredients.",
    checkpoint: "Map the system",
    motion: "glide",
    art: "sodas-opening",
    alt:
      "A wide Soda Pavilion process panorama connecting ingredient conservatories, treatment halls, syrup vessels, carbonators, filling lines, warehouse routes, and a fountain counter with glowing cyan pathways.",
    landmark: { label: "Process promenade", x: 50, y: 60 },
    drop: { x: 49, y: 37, size: 7 },
    fieldNotes: [
      note("Inputs", "Approved materials enter under custody", "Water, sweeteners, acids, flavors, colors, stabilizers, carbon dioxide, and packages are received, identified, stored, and released according to the product plan."),
      note("Formulation", "A recipe becomes controlled ratios", "The formula defines permitted ingredients and target ranges; operators translate it into measured additions and verified batches."),
      note("Preparation", "Cold and low air favor carbonation", "Product is commonly chilled and may be deaerated before carbon dioxide is dissolved under controlled conditions."),
      note("Protection", "Hygiene follows the entire route", "Sanitary design, cleaning, environmental controls, closed transfer, and verification protect the product between ingredients and package."),
      note("Package", "The container must hold pressure and identity", "Fill conditions, closure integrity, coding, handling, and storage preserve carbonation, quality, and traceability."),
      note("Service", "The final system may be a package or a fountain", "A sealed can and a post-mix fountain reach the guest through different equipment, checks, and cleaning responsibilities.")
    ],
    narration: [guide("Sippy", "The route is modular. Some drinks are clear, cloudy, sugared, diet, caffeinated, preserved, hot-filled, cold-filled, or aseptic. Follow the product's actual specification.")]
  },
  {
    id: "sodas-water-foundation",
    title: "Water Before Flavor",
    eyebrow: "Base water · Treatment",
    summary:
      "Source water is characterized and treated to a product-specific target before syrup, flavor, or carbon dioxide enters the story.",
    checkpoint: "Build a consistent base",
    motion: "cutaway",
    art: "water-treatment",
    alt:
      "A brass-and-glass Soda Pavilion water-treatment gallery with media filters, activated carbon, membrane skids, UV chamber, stainless tanks, sampling taps, and a central treated-water reservoir connected by cyan routes.",
    landmark: { label: "Treated-water reservoir", x: 50, y: 58 },
    drop: { x: 50, y: 58, size: 7 },
    fieldNotes: [
      note("Source", "The starting chemistry is local", "Minerals, alkalinity, disinfectant residual, organic matter, taste and odor, and seasonal variability can influence treatment decisions."),
      note("Filtration", "Particles and media have different jobs", "Depth or cartridge filtration can reduce suspended material; selected media can address specific taste, odor, or process concerns."),
      note("Activated carbon", "Adsorption can protect flavor clarity", "Carbon treatment may reduce chlorine and selected organic compounds, but capacity and breakthrough require monitoring."),
      note("Membranes", "Separation changes dissolved composition", "Where used, reverse osmosis or other membranes can create a more consistent base while producing a concentrate stream that needs management."),
      note("Disinfection", "Microbial control must fit the process", "UV, ozone, filtration, approved chemicals, heat, or other barriers may be used according to the plant and jurisdiction; no single barrier is universal."),
      note("Verification", "The target is defined before release", "Operators compare relevant water measurements and sensory condition with the product and food-safety plan before transfer.")
    ],
    narration: [guide("Hummin", "A beverage formula begins with measured water, not an abstract idea of purity. Characterize the source, choose justified barriers, and verify the released base.")]
  },
  {
    id: "sodas-ingredient-gallery",
    title: "The Ingredient Constellation",
    eyebrow: "Formulation · Building blocks",
    summary:
      "Water, sweeteners, acids, flavors, colors, emulsions, preservatives, caffeine, and other permitted ingredients can play distinct roles, but no soda needs every station.",
    checkpoint: "Function before fashion",
    motion: "orbit",
    art: "ingredient-gallery",
    alt:
      "A circular Soda Pavilion ingredient gallery with treated sparkling water at the center and separate stations for sugars, high-intensity sweetener samples, citrus acids, botanical extracts, colors, and emulsion demonstrators.",
    landmark: { label: "Formulation hub", x: 50, y: 42 },
    drop: { x: 50, y: 42, size: 7 },
    fieldNotes: [
      note("Water", "The largest ingredient is also a process medium", "Water carries dissolved ingredients and carbon dioxide while shaping taste, extraction, cleaning, cooling, and consistency."),
      note("Sweetener", "Sweetness can come from different systems", "Nutritive sugars, high-intensity sweeteners, blends, or no sweetener may be used according to formula, permitted use, label, and market."),
      note("Acid", "Sourness also manages balance", "Citric, phosphoric, malic, or other permitted acids can influence taste, pH, preservation strategy, and flavor expression; choices are product-specific."),
      note("Flavor", "Aroma may come from extracts or compounded systems", "Natural or artificial flavor declarations and permitted uses depend on formulation and jurisdiction; sensory language does not establish legal identity."),
      note("Appearance", "Color and cloud are separate design tools", "Permitted colors influence hue, while emulsions or clouding systems can create opacity and carry oil-soluble flavor components."),
      note("Other tools", "Function must be explicit", "Preservatives, caffeine, stabilizers, antioxidants, sequestrants, or juice components may appear in some products and must be lawful, controlled, and declared as required.")
    ],
    narration: [guide("Roma", "Read each ingredient by function first. Sweetness, sourness, aroma, color, texture, stability, and stimulation are different design questions.")]
  },
  {
    id: "sodas-sweetness-architecture",
    title: "The Sweetness Observatory",
    eyebrow: "Sweeteners · Comparison",
    summary:
      "Full-sugar, reduced-sugar, diet, and zero-sugar products solve sweetness, body, flavor release, aftertaste, and label requirements with different formulation strategies.",
    checkpoint: "Compare dose and effect",
    motion: "rotate",
    art: "sweetness-studio",
    alt:
      "A symmetrical academy sweetness observatory comparing crystalline sugar, liquid nutritive syrup, precision high-intensity sweetener stations, balance scales, sparkling base water, and tasting glasses.",
    landmark: { label: "Sweetness balance", x: 50, y: 53 },
    drop: { x: 50, y: 35, size: 7 },
    fieldNotes: [
      note("Nutritive", "Sugar contributes more than sweetness", "Sucrose, glucose-fructose syrups, or other caloric sweeteners can affect soluble solids, density, mouthfeel, flavor balance, and Nutrition Facts."),
      note("High intensity", "Tiny doses can deliver strong sweetness", "Permitted high-intensity sweeteners are much sweeter than sucrose, so accurate low-dose handling and distribution are essential."),
      note("Blend", "One sweetener may not solve the whole profile", "Formulators may combine sweeteners to shape onset, persistence, aftertaste, cost, stability, and sweetness quality."),
      note("Diet and zero", "Marketing terms follow local rules", "A diet, light, zero-sugar, sugar-free, or reduced-sugar claim must satisfy the governing jurisdiction and does not reveal the full ingredient system by itself."),
      note("PKU notice", "Aspartame carries a specific declaration", "In the United States, products containing aspartame require a phenylalanine statement for people with phenylketonuria."),
      note("Informed choice", "Use the actual label, not category assumptions", "Compare serving size, total and added sugars, calories, ingredients, caffeine statements where applicable, and personal needs without medicalizing the tasting note.")
    ],
    narration: [guide("Roma", "Sweetness is a time curve as well as an intensity. Compare onset, peak, finish, body, acidity, aroma, and aftertaste before naming a preference.")]
  },
  {
    id: "sodas-acid-balance",
    title: "The Acid Compass",
    eyebrow: "Acids · pH · Sensory balance",
    summary:
      "Acids can provide sourness and structure while pH, titratable acidity, buffering, ingredient interactions, and preservation design remain distinct measurements.",
    checkpoint: "Separate sourness from pH",
    motion: "rotate",
    art: "flavor-emulsion",
    alt:
      "A Soda Pavilion formulation studio with separate citrus, acid-crystal, sparkling-water, color, cloud, emulsion, and finished-drink stations arranged around a central glass vessel.",
    landmark: { label: "Acid station", x: 24, y: 62 },
    drop: { x: 43, y: 45, size: 7 },
    fieldNotes: [
      note("Citric", "Citrus-like brightness is common but not universal", "Citric acid is used in many beverages for tartness and formulation control; its role depends on the complete recipe."),
      note("Phosphoric", "A different acid creates a different structure", "Phosphoric acid is associated with some cola-type beverages, but brand style and jurisdiction determine actual use."),
      note("Malic", "A longer tart impression can support fruit styles", "Malic acid may contribute a firm, lingering sourness in selected formulations."),
      note("pH", "Hydrogen-ion activity is not total acid", "pH helps describe acidity and process conditions, while it does not by itself measure all titratable acid or predict exact sensory sourness."),
      note("Titratable acidity", "Neutralization gives another lens", "A validated titration can estimate total titratable acid under the chosen method; units and endpoint must be defined."),
      note("Preservation", "Acid is one hurdle, not a safety guarantee", "Product pH can support a control strategy, but ingredients, processing, preservatives, hygiene, package, storage, and regulation must be considered together.")
    ],
    narration: [guide("Hummin", "Do not substitute one acidity number for another. Record pH, method-specific titratable acidity, formula, temperature, and the product specification they serve.")]
  },
  {
    id: "sodas-flavor-library",
    title: "The Flavor Library",
    eyebrow: "Aroma · Extracts · Compounded systems",
    summary:
      "Citrus oils, botanical extracts, spices, vanilla, cola-type blends, fruit characters, and other flavor systems are built, protected, and declared according to formula and law.",
    checkpoint: "Build aroma in layers",
    motion: "orbit",
    art: "flavor-emulsion",
    alt:
      "A luminous academy flavor library with citrus peel, botanicals, spices, vanilla, sealed extract vessels, sparkling base water, and separated finished-drink trials.",
    landmark: { label: "Botanical library", x: 22, y: 28 },
    drop: { x: 49, y: 42, size: 7 },
    fieldNotes: [
      note("Top notes", "Volatile aroma appears quickly", "Highly volatile components can define the first impression and may be affected by storage, oxygen, heat, and package permeability."),
      note("Base notes", "Persistent character supports identity", "Vanilla, spice, caramel-like, root, or other deeper notes can shape the middle and finish of a flavor system."),
      note("Citrus oil", "Oil-soluble aroma needs a delivery strategy", "Citrus oil may be dispersed through a suitable emulsion or other approved flavor system rather than dissolving freely in water."),
      note("Extract", "Source and process influence composition", "An extract, essence, oil, or compounded flavor is not interchangeable simply because the sensory description sounds similar."),
      note("Declaration", "Flavor terms have legal meaning", "Natural flavor, artificial flavor, characterizing flavor, and named ingredient statements follow jurisdiction-specific definitions and labeling rules."),
      note("Protection", "Oxygen, light, heat, and time can shift aroma", "Formula, deaeration, antioxidants where permitted, package choice, storage, and shelf-life validation help protect the intended profile.")
    ],
    narration: [guide("Roma", "A flavor is not one smell in one bottle. Follow its fast notes, deeper notes, carrier, acidity, bubbles, temperature, and the package that protects it.")]
  },
  {
    id: "sodas-color-cloud-emulsion",
    title: "The Visible Formula",
    eyebrow: "Color · Cloud · Emulsion",
    summary:
      "Hue, clarity, opacity, and suspended droplets are designed and controlled separately, even when the guest experiences them together.",
    checkpoint: "See the structure",
    motion: "cutaway",
    art: "flavor-emulsion",
    alt:
      "A wide Soda Pavilion visual-formulation gallery with permitted color trials, clear and cloudy beverages, a magnified emulsion droplet cylinder, botanical extracts, and a central sparkling-water vessel.",
    landmark: { label: "Emulsion lens", x: 82, y: 56 },
    drop: { x: 78, y: 53, size: 7 },
    fieldNotes: [
      note("Color", "A permitted color has defined uses", "Color additives must be authorized for their intended use and declared as required; U.S. color regulation does not use the GRAS pathway."),
      note("Hue", "Appearance can set flavor expectation", "A beverage's color can influence expectation, yet hue alone does not prove ingredient source or flavor identity."),
      note("Cloud", "Opacity can be intentional", "Clouding systems may create a juice-like or botanical appearance and must remain stable within the validated product life."),
      note("Emulsion", "Tiny droplets carry oil-soluble material", "An oil-in-water emulsion disperses flavor oil or cloud components through small droplets stabilized by an appropriate permitted system."),
      note("Instability", "Ringing, creaming, or separation are clues", "Droplet size, density, emulsifier, pH, ionic conditions, temperature, shear, and time can affect visible stability."),
      note("Specification", "Appearance needs measurable limits", "Validated methods may track color, turbidity, ring formation, droplet condition, or visual defects against the product standard.")
    ],
    narration: [guide("Hummin", "Clear, cloudy, bright, pale, stable, separated: describe what the package shows, then connect it to a measured specification rather than a guess.")]
  },
  {
    id: "sodas-syrup-room",
    title: "The Syrup Room",
    eyebrow: "Batching · Custody · Dosing",
    summary:
      "Dry and liquid ingredients become a controlled finished syrup through identity checks, measured additions, mixing, filtration where appropriate, and protected transfer.",
    checkpoint: "Formula to finished syrup",
    motion: "push-in",
    art: "syrup-room",
    alt:
      "A sunrise-lit Soda Pavilion syrup room with dry sweetener silos, sugar-dissolving vessel, jacketed syrup tank, guarded concentrate cabinets, metering pumps, filters, and a central proportioning manifold.",
    landmark: { label: "Finished-syrup manifold", x: 50, y: 52 },
    drop: { x: 50, y: 37, size: 7 },
    fieldNotes: [
      note("Identity", "The right material must reach the right batch", "Receiving, status, lot, allergen or cross-contact information where relevant, expiration, and formula authorization are checked before use."),
      note("Mass", "Weighing protects ratio", "Load cells, scales, metering, and second-person or electronic verification may support accurate additions according to the site's controls."),
      note("Dissolution", "Solids need controlled energy", "Water temperature, agitation, addition rate, and time influence dissolution while the exact method follows the ingredient and equipment."),
      note("Order", "Sequence can affect the batch", "Addition order may influence solubility, foaming, pH, emulsion stability, flavor loss, and preservative performance."),
      note("Finished syrup", "A concentrated intermediate needs its own checks", "Soluble solids, pH, sensory condition, volume or mass, appearance, and formula-specific measurements may be verified before release."),
      note("Transfer", "Closed custody continues", "Sanitary pumps, strainers or filters where justified, identified lines, and batch records protect the route to proportioning.")
    ],
    narration: [guide("Sippy", "The syrup room is where a written formula becomes physical custody. Identify, measure, mix, verify, and release before the batch moves on.")]
  },
  {
    id: "sodas-chill-deaerate",
    title: "Cold, Quiet Water",
    eyebrow: "Preparation · Temperature · Dissolved air",
    summary:
      "Product is chilled and, where the process calls for it, deaerated so carbon dioxide can be dissolved predictably while oxygen-sensitive quality is better protected.",
    checkpoint: "Prepare for gas",
    motion: "glide",
    art: "chill-deaeration",
    alt:
      "A Soda Pavilion chilling and deaeration hall with plate heat exchanger, insulated cold loop, central chilled reservoir, vacuum deaeration vessel, instruments, and protected product piping.",
    landmark: { label: "Chilled reservoir", x: 49, y: 49 },
    drop: { x: 48, y: 49, size: 7 },
    fieldNotes: [
      note("Heat exchanger", "Temperature changes without mixing utilities", "A sanitary heat exchanger transfers heat across a barrier between product and a cooling medium."),
      note("Cold", "Lower temperature generally supports gas solubility", "Under otherwise comparable conditions, colder liquid can hold more dissolved carbon dioxide, reducing the pressure needed for a target equilibrium."),
      note("Dissolved air", "Existing gases compete for space and quality", "Deaeration may reduce oxygen and nitrogen before carbonation, supporting gas control and selected flavor or shelf-life goals."),
      note("Vacuum", "Lower pressure can release dissolved gases", "A deaerator increases gas removal through pressure reduction, surface area, contact time, and equipment design."),
      note("Hygiene", "Cold equipment is still food equipment", "Condensation, dead legs, seals, and inaccessible surfaces can create risks unless sanitary design, cleaning, and inspection remain effective."),
      note("Measurement", "Temperature belongs with pressure and gas", "Carbonation interpretation requires product temperature, pressure, composition, sampling method, and instrument condition.")
    ],
    narration: [guide("Hummin", "Carbonation starts before the carbonator. Record temperature and dissolved-air control so pressure and gas measurements describe the same physical system.")]
  },
  {
    id: "sodas-carbonation-physics",
    title: "Inside the Bubble",
    eyebrow: "Carbon dioxide · Solubility",
    summary:
      "A deconstructed carbonator reveals gas supply, dissolution, equilibrium, nucleation, bubble growth, and the sensory bite created when pressure is released.",
    checkpoint: "Dissolve under pressure",
    motion: "cutaway",
    art: "carbonation-physics",
    alt:
      "A wide Soda Pavilion carbonation cutaway with a tall bubble column, gas supply, chilled product routes, mixing and contact vessels, pressure instruments, and a filling branch.",
    landmark: { label: "Carbonation column", x: 50, y: 38 },
    drop: { x: 50, y: 47, size: 8 },
    fieldNotes: [
      note("CO2", "Food-grade gas enters a controlled system", "Supplier approval, specifications, storage, distribution, and site controls protect the carbon dioxide used for direct food contact."),
      note("Equilibrium", "Pressure and temperature set the physical opportunity", "Dissolved carbon dioxide approaches an equilibrium governed by temperature, gas partial pressure, liquid composition, contact, and time."),
      note("Contact", "Small bubbles and surface area aid transfer", "Carbonators use suitable mixing or contact devices to bring gas and chilled product together efficiently without assuming instant equilibrium."),
      note("Carbonic acid", "A small fraction reacts with water", "Dissolved carbon dioxide and carbonic-acid equilibria contribute to the sharp sensation and pH, while added food acids often contribute more total tartness."),
      note("Nucleation", "Bubbles need places to begin", "Scratches, fibers, particles, glass condition, temperature, and agitation can create sites where gas leaves solution and bubbles grow."),
      note("Release", "Opening the system changes the balance", "When pressure falls, carbon dioxide becomes less soluble and escapes; warmer temperature and agitation usually accelerate the loss.")
    ],
    narration: [guide("Sippy", "The bubble is stored potential. Cold product and pressure hold carbon dioxide in solution; opening, pouring, warming, and nucleation reveal it.")]
  },
  {
    id: "sodas-pressure-balance",
    title: "The Pressure Chamber",
    eyebrow: "Gas control · Product protection",
    summary:
      "Carbonation remains stable only when tanks, lines, samples, filler, container, closure, and temperature behave as one pressure-managed system.",
    checkpoint: "Hold the equilibrium",
    motion: "rotate",
    art: "carbonation-physics",
    alt:
      "A brass-framed Soda Pavilion pressure gallery showing carbon dioxide storage, regulators, a carbonator, pressurized buffer tank, temperature and pressure instruments, safe relief paths, and a closed sample station.",
    landmark: { label: "Pressure regulator", x: 72, y: 28 },
    drop: { x: 53, y: 50, size: 7 },
    fieldNotes: [
      note("Regulation", "Supply pressure is stepped and controlled", "Regulators, valves, instrumentation, and protected distribution match the gas source to equipment design and operating needs."),
      note("Vessel", "Pressure equipment has defined limits", "Rated tanks, fittings, hoses, relief devices, inspection, and maintenance must follow manufacturer and jurisdiction requirements."),
      note("Headspace", "Gas and liquid share the vessel", "Headspace pressure, product temperature, fill level, agitation, residence time, and composition influence dissolved gas behavior."),
      note("Sampling", "A careless sample can lose the answer", "Validated carbonation sampling minimizes warming, pressure loss, foam, and gas escape before measurement."),
      note("Safety", "Carbon dioxide can displace oxygen", "Gas storage and use require ventilation, leak control, monitoring or procedures appropriate to the site, training, and emergency planning."),
      note("No universal target", "Carbonation is part of the style", "Different sodas, packages, and service systems use different gas targets; verify the product specification rather than assuming one ideal level.")
    ],
    narration: [guide("Hummin", "Pressure is not a decorative gauge. It connects gas safety, product temperature, vessel limits, carbonation, filler behavior, package integrity, and the measurement method.")]
  },
  {
    id: "sodas-proportion-blend",
    title: "The Proportioning Engine",
    eyebrow: "Water + syrup · Uniformity",
    summary:
      "Treated water and finished syrup meet through controlled ratio, flow, mixing, residence, and recirculation before the product is released to filling.",
    checkpoint: "Make one consistent beverage",
    motion: "cutaway",
    art: "blend-pressure",
    alt:
      "A wide Soda Pavilion blending wall with separate cyan water and amber syrup routes, flow meters, ratio manifold, inline mixer cutaway, central blend tank, sample point, pressure buffer, and branching package lines.",
    landmark: { label: "Blend tank", x: 50, y: 51 },
    drop: { x: 50, y: 51, size: 7 },
    fieldNotes: [
      note("Ratio", "Flow must match the formula", "Calibrated meters, pumps, valves, or batch masses control the water-to-syrup relationship within the validated process."),
      note("Mixing", "Uniformity needs sufficient contact", "Inline or vessel mixing distributes soluble solids, acids, flavors, and dispersed systems without assuming every formula needs the same shear."),
      note("Brix", "Refractive solids can support ratio control", "A refractometer reading may track soluble-solids consistency for sugar-sweetened products, but interpretation depends on formula, temperature compensation, and method."),
      note("Diet products", "A Brix number may not represent sweetness", "High-intensity sweeteners contribute little mass, so diet or zero-sugar products need formula-appropriate controls beyond conventional sugar Brix."),
      note("Recirculation", "A loop can stabilize or overwork the product", "Recirculation may support uniformity and line balance, while excessive time, shear, warming, or gas loss can damage quality."),
      note("Release", "Specification precedes filler", "Relevant ratio, chemistry, sensory, gas, appearance, and record checks are completed according to the product plan before filling continues.")
    ],
    narration: [guide("Sippy", "This engine turns two controlled streams into one repeatable drink. Ratio, mixing, temperature, gas, and release evidence must agree.")]
  },
  {
    id: "sodas-hygiene-loop",
    title: "The Hygiene Loop",
    eyebrow: "Sanitary design · Cleaning · Verification",
    summary:
      "Equipment design, clean-in-place circuits, environmental separation, hygienic handling, and verification work together to protect a high-throughput beverage system.",
    checkpoint: "Clean, inspect, release",
    motion: "glide",
    art: "cip-hygiene",
    alt:
      "A Soda Pavilion clean-in-place gallery with cleaning-solution tanks, spray-ball vessel cutaway, color-separated supply and return loops, drainable piping, airlock, rinse recovery, and verification bench.",
    landmark: { label: "CIP return", x: 52, y: 51 },
    drop: { x: 52, y: 51, size: 7 },
    fieldNotes: [
      note("Design", "Cleanability begins before the cleaning cycle", "Food-contact surfaces, welds, seals, valves, slope, drainage, access, and avoidance of stagnant zones influence whether soil can be removed."),
      note("Cycle", "Time, action, chemistry, and temperature interact", "A validated clean-in-place program defines solution, concentration, temperature, flow or mechanical action, contact time, sequence, and equipment scope."),
      note("Rinse", "Removal must include the cleaner", "Rinse criteria and return measurements help show when displaced product, soil, and cleaning chemicals have left the circuit."),
      note("Verification", "A completed timer is not the only evidence", "Inspection, conductivity, concentration, temperature, flow, ATP or residue tools, microbiological methods, and records may support verification according to risk."),
      note("Zoning", "People and tools can cross boundaries", "Traffic, footwear, hoses, utensils, drains, aerosols, condensate, and maintenance activities require controls suited to the plant layout."),
      note("Changeover", "The next product inherits the last handoff", "Flavor, color, sweetener, preservative, allergen or cross-contact status where applicable, and cleaning residues are considered before line release.")
    ],
    narration: [guide("Hummin", "Cleaning is a designed process with defined scope and evidence. The cycle is complete only when the equipment is suitable for its next use.")]
  },
  {
    id: "sodas-counterpressure-fill",
    title: "The Quiet Fill",
    eyebrow: "Counterpressure · Container handoff",
    summary:
      "Cold carbonated product enters prepared containers while pressure is managed to limit foam and gas loss before closure.",
    checkpoint: "Tank to container",
    motion: "push-in",
    art: "counterpressure-fill",
    alt:
      "A grand Soda Pavilion packaging room with cold product buffer, container preparation stations, rotary counterpressure filler cutaway, fill valves, and separate complete can and generic bottle conveyors.",
    landmark: { label: "Rotary filler", x: 50, y: 43 },
    drop: { x: 50, y: 48, size: 7 },
    fieldNotes: [
      note("Container", "The package arrives clean and suitable", "Container handling and preparation follow the package, supplier, process, and plant controls rather than one universal rinse step."),
      note("Equalize", "Container pressure approaches filler pressure", "Counterpressure filling reduces the sudden pressure drop that would otherwise release carbon dioxide and create excessive foam."),
      note("Fill", "Product enters under controlled conditions", "Valve sequence, product temperature, pressure, flow, fill height or volume, and container movement influence fill performance."),
      note("Snift", "Pressure is released deliberately", "Controlled depressurization before container discharge helps manage foam and protects the next closure handoff."),
      note("Oxygen", "Package oxygen may affect flavor stability", "Where oxygen-sensitive quality matters, product deaeration, gas management, filling practice, closure timing, and package permeability are considered together."),
      note("Inspection", "A fast line still checks individual outcomes", "Fill level, container damage, contamination, coding, closure presence, and other defects may be monitored with validated line controls.")
    ],
    narration: [guide("Sippy", "A calm fill is a pressure choreography: prepare, equalize, fill, release, close. Speed matters only after the handoff stays controlled.")]
  },
  {
    id: "sodas-closure-anatomy",
    title: "The Closure Theater",
    eyebrow: "Can seam · Bottle closure",
    summary:
      "A can double seam and a bottle closure protect carbonation through different materials, geometries, application forces, inspection methods, and failure modes.",
    checkpoint: "Build the pressure boundary",
    motion: "cutaway",
    art: "closure-cutaway",
    alt:
      "A museum-like Soda Pavilion closure theater with exploded aluminum can lid and body-hook layers, seaming roll and chuck, bottle neck and multiple generic cap types, torque tester, gauges, and leak-test stations.",
    landmark: { label: "Double seam cutaway", x: 24, y: 33 },
    drop: { x: 50, y: 72, size: 7 },
    fieldNotes: [
      note("Double seam", "Metal layers interlock under controlled forming", "The can body flange and lid curl are formed by a chuck and seaming rolls into an interlocked, compressed seam with product-specific specifications."),
      note("Seam checks", "External appearance is not the whole seam", "Countersink, seam thickness and width, teardown measurements, overlap or tightness indicators, and leak tests may be used according to the package program."),
      note("Cap", "Bottle closures use another pressure boundary", "Threaded caps, crown closures, or other systems rely on compatible neck finish, liner or seal design, application force or torque, and tamper features."),
      note("Torque", "Too loose and too tight can both fail", "Application and removal torque targets are package-specific and influenced by cap, neck, liner, temperature, and equipment condition."),
      note("Leak", "Carbon dioxide finds weak boundaries", "Damage, contamination at the seal, misalignment, worn tooling, poor seam formation, cracked finishes, or incorrect application can cause gas or product loss."),
      note("Trend", "Inspection protects the line before failure spreads", "Package measurements are trended by head or station so drift can be investigated and affected product controlled.")
    ],
    narration: [guide("Hummin", "The closure is a pressure instrument made at production speed. Measure its geometry and application, not just whether it looks closed.")]
  },
  {
    id: "sodas-quality-lab",
    title: "The Release Laboratory",
    eyebrow: "Quality · Food safety · Evidence",
    summary:
      "A release decision combines formula and process records with chemistry, carbonation, package, sensory, microbiological, and traceability evidence appropriate to the product.",
    checkpoint: "Measure before release",
    motion: "orbit",
    art: "qa-lab",
    alt:
      "A wide Soda Pavilion quality laboratory with refractometer, pH station, carbonation tester, seam inspection equipment, torque and leak gauges, retained samples, microbiological work area, and sensory glasses.",
    landmark: { label: "Sample hub", x: 50, y: 47 },
    drop: { x: 50, y: 47, size: 7 },
    fieldNotes: [
      note("Brix", "Soluble-solids readings need product context", "Method, calibration, temperature, formula, and sample preparation determine whether refractometry can support syrup or finished-product control."),
      note("pH and acid", "Two measurements answer different questions", "pH and method-specific titratable acidity may both be used, with limits tied to the product and control plan."),
      note("CO2", "Gas measurement includes temperature and method", "A carbonation result is interpreted with sample temperature, pressure, agitation or instrument procedure, and product specification."),
      note("Package", "Fill and closure protect the result", "Net contents or fill, seam or cap integrity, leak condition, container damage, code quality, and appearance may be checked by line and laboratory systems."),
      note("Microbiology", "Hazard control is product- and process-specific", "Environmental, ingredient, in-process, or finished-product testing can support a broader preventive system; testing alone does not manufacture safety."),
      note("Sensory", "A trained comparison can detect drift", "Appearance, aroma, sweetness, acidity, carbonation, mouthfeel, flavor, aftertaste, and defects are compared under controlled serving conditions."),
      note("Disposition", "Release, hold, rework, or reject needs authority", "Specification results, deviations, investigation, corrective action, traceability, and responsible approval determine product disposition.")
    ],
    narration: [guide("Hummin", "No single number releases the beverage. Chemistry, gas, package, microbiology, sensory, records, and deviation control must describe the same lot.")]
  },
  {
    id: "sodas-package-passport",
    title: "The Package Passport",
    eyebrow: "Container · Code · Traceability",
    summary:
      "The finished container connects product identity, material suitability, closure, net contents, lot history, and the information a guest can actually read.",
    checkpoint: "Give the lot an identity",
    motion: "glide",
    art: "warehouse-label",
    alt:
      "A Soda Pavilion logistics atlas with generic cans and bottles, vision inspection and lot coding, palletized cases, warehouse lanes, delivery routes, retail shelf, and a blank label-study panel.",
    landmark: { label: "Code inspection", x: 20, y: 26 },
    drop: { x: 22, y: 25, size: 7 },
    fieldNotes: [
      note("Material", "Package choice changes performance", "Aluminum, glass, PET, multilayer components, liners, closures, inks, and secondary packaging have different barrier, weight, handling, recycling, and food-contact considerations."),
      note("Pressure", "The container must match the carbonated product", "Package design, fill conditions, closure, storage temperature, distribution stress, and shelf-life validation support pressure integrity."),
      note("Light and oxygen", "Barrier needs depend on the formula", "Color, flavor, vitamins, botanical compounds, and other sensitive components may influence package-barrier and storage choices."),
      note("Code", "The lot needs a retrievable history", "Readable date or lot information links ingredients, process records, packaging materials, inspections, release, warehouse location, and distribution."),
      note("Net contents", "Declared quantity needs process control", "Filler setup, density or volume basis, package variation, check systems, and jurisdiction requirements support compliant net contents."),
      note("Recall", "Traceability must work in both directions", "A practical system identifies what entered a lot, where the lot went, what remains, and who can make a timely control decision.")
    ],
    narration: [guide("Sippy", "The package is a passport, not just a billboard. It holds pressure, protects quality, carries information, and connects the lot to its full history.")]
  },
  {
    id: "sodas-warehouse-route",
    title: "The Distribution Relay",
    eyebrow: "Warehouse · Transport · Retail",
    summary:
      "Pallet, warehouse, vehicle, shelf, and stock rotation protect a pressurized product whose flavor and package can still be damaged by heat, sunlight, impact, time, or poor handling.",
    checkpoint: "Move without losing the design",
    motion: "glide",
    art: "warehouse-label",
    alt:
      "A wide academy distribution route showing inspected generic soda packages, stable pallets, organized warehouse lanes, monitored loading dock, unbranded delivery vehicles, and a retail shelf connected by cyan traceability lines.",
    landmark: { label: "Warehouse lane", x: 33, y: 67 },
    drop: { x: 69, y: 51, size: 7 },
    fieldNotes: [
      note("Pallet", "Unit loads need stability and protection", "Case pattern, wrap or restraint, pallet condition, height, weight, and package strength are matched to handling and transport."),
      note("Heat", "Temperature can accelerate quality change", "High storage temperatures can increase flavor loss, package pressure, color change, or other deterioration depending on formulation and package."),
      note("Sunlight", "Light and local heating can damage the handoff", "Direct sun or display heat can warm product and affect light-sensitive ingredients or package performance."),
      note("Impact", "A dent can be more than cosmetic", "Crushing, seam damage, cracked glass, stressed bottle finishes, cap damage, abrasion, or pallet collapse require defined inspection and disposition."),
      note("Rotation", "Older suitable product moves first", "Date control and first-expire-first-out or another validated rotation rule reduce avoidable aging while respecting holds and market requirements."),
      note("Retail", "The last shelf is part of custody", "Stock condition, display temperature, sunlight, package cleanliness, damage removal, and code readability affect the guest's final choice.")
    ],
    narration: [guide("Hummin", "The warehouse is not empty time. Temperature, light, impact, rotation, and code visibility continue the process after the filler stops.")]
  },
  {
    id: "sodas-label-literacy",
    title: "Read the Actual Beverage",
    eyebrow: "Label · Ingredients · Informed choice",
    summary:
      "Name, serving size, ingredients, added sugars, sweeteners, caffeine statements, color or preservative declarations, claims, and package quantity are read under the rules of the market where the product is sold.",
    checkpoint: "Compare without mythology",
    motion: "push-in",
    art: "warehouse-label",
    alt:
      "A Soda Pavilion label-study gallery with enlarged generic blank package panels, ingredient-order blocks, nutrition-table shapes, cans and bottles, comparison tools, and a traceability route to warehouse and retail.",
    landmark: { label: "Label study panel", x: 24, y: 68 },
    drop: { x: 24, y: 68, size: 7 },
    fieldNotes: [
      note("Identity", "Start with the product name", "A carbonated soft drink, soda water, flavored water, juice drink, energy drink, or another identity can trigger different expectations and rules by jurisdiction."),
      note("Ingredients", "Order usually follows predominance by weight", "In the United States, ingredients are generally listed in descending order by weight, subject to applicable exemptions and declaration rules."),
      note("Added sugars", "Use the serving and the declared amount", "U.S. Nutrition Facts separates total sugars and added sugars; other jurisdictions use their own nutrition formats and definitions."),
      note("Sweetener", "Diet or zero does not name the formula", "The ingredient list identifies the sweetener system. Aspartame requires a phenylalanine statement in the United States."),
      note("Caffeine", "Presence and quantity rules vary", "Caffeine may come from added caffeine or ingredients; declaration and quantitative labeling differ by jurisdiction and product category."),
      note("Claims", "A front-panel phrase has conditions", "Sugar-free, reduced sugar, no added sugar, natural, flavored, juice, functional, recycling, and other claims need context and legal support."),
      note("Choice", "One label serves many different people", "Compare the information relevant to taste, ingredients, dietary pattern, caffeine preference, allergies or sensitivities, serving size, package, and local guidance without giving medical advice.")
    ],
    narration: [guide("Roma", "Taste tells you what you experience. The label tells you what the producer is required or chooses to declare. Use both, but never make one impersonate the other.")]
  },
  {
    id: "sodas-fountain-system",
    title: "The Fountain Under the Counter",
    eyebrow: "Bag-in-box · Post-mix · Line hygiene",
    summary:
      "A fountain builds the beverage at service from treated water, carbon dioxide, chilled systems, concentrated syrup, calibrated ratio, ice, nozzle, and a disciplined cleaning schedule.",
    checkpoint: "Mix at the point of service",
    motion: "cutaway",
    art: "packaging-fountain",
    alt:
      "A Soda Pavilion service cutaway with bag-in-box syrup racks, pumps, carbon dioxide supply, water treatment, carbonator, ice bank, proportioning valves, beverage lines, removable nozzle, cleaning tools, and a generic fountain counter.",
    landmark: { label: "Post-mix valve", x: 80, y: 43 },
    drop: { x: 80, y: 43, size: 7 },
    fieldNotes: [
      note("Bag-in-box", "Concentrate travels separately", "A sealed syrup package connects through a compatible fitting and pump or pressure system; identity, date, storage, and changeover remain controlled."),
      note("Water", "The outlet inherits the building and equipment", "Incoming potable water, local treatment where used, pressure, flow, temperature, filters, backflow protection, and maintenance affect the drink."),
      note("Carbonator", "Gas dissolves before the dispensing valve", "A fountain carbonator combines chilled water and carbon dioxide under pressure; ventilation and gas-system safety remain site responsibilities."),
      note("Ratio", "The valve meters syrup and carbonated water", "Validated calibration checks help prevent a drink that is too weak, too strong, flat, foamy, or inconsistent across flavors."),
      note("Ice", "Ice is food and dilution", "Approved water, clean equipment, protected scoops or dispensers, machine hygiene, and service volume affect safety, temperature, and final concentration."),
      note("Nozzle", "The last centimeters can undo the system", "Nozzles, diffusers, drip trays, splash zones, connectors, and adjacent surfaces need cleaning and maintenance at required frequencies."),
      note("Troubleshoot", "Taste and foam point to several causes", "Warm product, gas pressure, empty syrup, ratio drift, blocked lines, dirty components, poor ice, or wrong connection require a systematic check rather than guesswork.")
    ],
    narration: [guide("Sippy", "At the fountain, the factory becomes a small local process plant. Water, gas, syrup, ice, calibration, hygiene, and maintenance all meet in one pour.")]
  },
  {
    id: "sodas-shared-sparkle",
    title: "The Shared Sparkle",
    eyebrow: "Sensory · Service · Circularity",
    summary:
      "The final glass reconnects formulation, pressure, package or fountain, informed choice, hospitality, material recovery, and the responsibility to describe the drink honestly.",
    checkpoint: "Serve, compare, return",
    motion: "reassemble",
    art: "packaging-fountain",
    alt:
      "A welcoming Soda Pavilion service hall with generic cans and bottles, a clean fountain, chilled glasses, a small sensory flight, packaging return stations, warehouse view, and the three adult guides beside cyan water canals.",
    landmark: { label: "Shared tasting counter", x: 68, y: 60 },
    drop: { x: 68, y: 60, size: 8 },
    fieldNotes: [
      note("Appearance", "Color, clarity, cloud, and bubble stream set expectations", "Observe the product without assuming that vivid color, opacity, or a persistent head proves ingredient quality or safety."),
      note("Aroma", "Carbonation changes release", "Bubbles, temperature, glass shape, agitation, and time influence how volatile aromas reach the nose."),
      note("Taste", "Sweetness and acidity are a moving balance", "Compare onset, peak, sourness, bitterness where present, flavor identity, aftertaste, and how the profile changes as gas and temperature fall."),
      note("Texture", "Bubble size is not a fixed product property", "Carbonation level, nucleation sites, pour, glass condition, temperature, dissolved ingredients, and time shape perceived prickle and foam."),
      note("Service", "Give the guest clear, unpressured options", "Offer package or fountain information when known, reasonable portion and ice choices, caffeine or sweetener details from the label, and water without unsupported wellness claims."),
      note("Circularity", "Recovery begins with local reality", "Package reduction, refill or fountain systems, lightweighting, recycled content, collection, deposit systems, and material recycling depend on design, hygiene, infrastructure, and jurisdiction."),
      note("Return", "Every bubble leaves a larger system", "Water use, ingredients, carbon dioxide, energy, cleaning, packaging, transport, waste, and recovery remain connected after the glass is empty.")
    ],
    narration: [
      guide("Roma", "A good soda tasting is specific: what do sweetness, acid, aroma, bubbles, temperature, and aftertaste actually do in this glass?"),
      guide("Hummin", "The package, fountain, lot, label, and recovery route complete the record."),
      guide("Sippy", "The shared sparkle is not one verdict. It is a clear view of how a designed beverage reaches a person, and where responsibility travels next.")
    ]
  }
];

const sceneCount = sodasSceneSeeds.length;

const sodasScenes: BeyondTheGlassScene[] = sodasSceneSeeds.map((seed, index) => {
  const { art, alt, ...scene } = seed;
  return {
    ...scene,
    number: String(index + 1).padStart(2, "0"),
    range: [index / sceneCount, (index + 1) / sceneCount] as const,
    artwork: sodasArtwork(art, alt)
  };
});

export const sodasFieldTrip: BeyondTheGlassChapter = {
  slug: "sodas",
  title: "Beyond The Glass",
  chapterTitle: "Sodas · From Water to Shared Sparkle",
  subject: "Carbonated beverages field trip",
  description:
    "A visual SIP Academy carbonated-beverage adventure through treated water, ingredient function, sweeteners, acids, flavor, color and emulsions, syrup batching, chilling and deaeration, carbonation physics, proportioning, hygiene, counterpressure filling, closures, quality, package and distribution, label literacy, fountain systems, sensory service, informed choice, and circularity.",
  coreMessage:
    "Every sparkle is a designed system: water, permitted ingredients, measured ratios, temperature, gas, pressure, hygiene, package, evidence, service, and informed choice.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/sodas/sodas-opening-960.webp"
  },
  scenes: sodasScenes,
  sources: [
    {
      id: "fda-carbonated-soft-drinks",
      organization: "U.S. Food and Drug Administration",
      title: "Carbonated Soft Drinks: What You Should Know",
      url: "https://www.fda.gov/food/buy-store-serve-safe-food/carbonated-soft-drinks-what-you-should-know",
      note: "Primary U.S. consumer and regulatory overview for sanitary production, permitted additives, food-contact substances, ingredient order, labeling, phenylalanine notice, and benzene monitoring context."
    },
    {
      id: "fda-types-food-ingredients",
      organization: "U.S. Food and Drug Administration",
      title: "Types of Food Ingredients",
      url: "https://www.fda.gov/food/food-additives-and-gras-ingredients-information-consumers/types-food-ingredients",
      note: "Supports ingredient-function and U.S. declaration context for sweeteners, preservatives, flavors, colors, stabilizers, and related formulation tools."
    },
    {
      id: "fda-high-intensity-sweeteners",
      organization: "U.S. Food and Drug Administration",
      title: "High-Intensity Sweeteners",
      url: "https://www.fda.gov/food/food-additives-petitions/high-intensity-sweeteners",
      note: "Supports U.S. regulatory pathways, permitted high-intensity sweeteners, label identification, intended-use safety standard, and PKU context."
    },
    {
      id: "fda-aspartame-sweeteners",
      organization: "U.S. Food and Drug Administration",
      title: "Aspartame and Other Sweeteners in Food",
      url: "https://www.fda.gov/food/food-additives-petitions/aspartame-and-other-sweeteners-food",
      note: "Current FDA reference for sweetener evaluation, acceptable daily intake context, ingredient-list literacy, and careful non-alarmist consumer framing."
    },
    {
      id: "fda-color-additives",
      organization: "U.S. Food and Drug Administration",
      title: "Color Additives in Foods",
      url: "https://www.fda.gov/food/color-additives-information-consumers/color-additives-foods",
      note: "Supports intended-use authorization, certification or exempt status, declaration, and the distinction that U.S. color additives do not use a GRAS exemption."
    },
    {
      id: "fda-food-additives-gras",
      organization: "U.S. Food and Drug Administration",
      title: "Food Additives and GRAS Ingredients",
      url: "https://www.fda.gov/food/food-ingredients-packaging/food-additives-and-gras-ingredients-information-consumers",
      note: "Supports the U.S. intended-use safety and regulatory-status framing for substances added to food."
    },
    {
      id: "fda-food-contact",
      organization: "U.S. Food and Drug Administration",
      title: "Food Ingredients and Packaging",
      url: "https://www.fda.gov/food/food-ingredients-packaging",
      note: "Primary U.S. gateway for food-contact substance, packaging, ingredient, and additive regulatory programs."
    },
    {
      id: "fda-added-sugars",
      organization: "U.S. Food and Drug Administration",
      title: "Added Sugars on the Nutrition Facts Label",
      url: "https://www.fda.gov/food/nutrition-facts-label/added-sugars-nutrition-facts-label",
      note: "Supports the U.S. distinction between total and added sugars and label-led informed choice without medical advice."
    },
    {
      id: "fda-food-code-2022",
      organization: "U.S. Food and Drug Administration",
      title: "Food Code 2022",
      url: "https://www.fda.gov/food/fda-food-code/food-code-2022",
      note: "Model code supporting retail beverage-equipment hygiene, dispensing-nozzle, ice, food-contact surface, plumbing, and cleaning concepts; adoption varies by jurisdiction."
    },
    {
      id: "ecfr-part-117",
      organization: "Electronic Code of Federal Regulations",
      title: "21 CFR Part 117 — Current Good Manufacturing Practice, Hazard Analysis, and Risk-Based Preventive Controls for Human Food",
      url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-117",
      note: "Primary U.S. regulatory text for CGMP, sanitation, hazard analysis, preventive controls, monitoring, corrective action, verification, and records where applicable."
    },
    {
      id: "ecfr-soda-water",
      organization: "Electronic Code of Federal Regulations",
      title: "21 CFR 165.175 — Soda Water",
      url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-165/section-165.175",
      note: "Primary U.S. standard-of-identity text for soda water and related named products; other jurisdictions and product categories differ."
    },
    {
      id: "codex-gsfa-carbonated",
      organization: "Codex Alimentarius Commission",
      title: "GSFA Food Category 14.1.4.1 — Carbonated Water-Based Flavoured Drinks",
      url: "https://www.fao.org/gsfaonline/foods/details.html?id=249&lang=en",
      note: "International food-category and additive-provision reference covering regular and diet/light carbonated water-based flavored drinks; national implementation still governs."
    },
    {
      id: "codex-gsfa",
      organization: "Codex Alimentarius Commission",
      title: "General Standard for Food Additives (CXS 192-1995)",
      url: "https://www.fao.org/fao-who-codexalimentarius/codex-texts/dbs/gsfa/en/",
      note: "International framework for additive functional classes, food-category provisions, maximum levels, and good-manufacturing-practice use."
    },
    {
      id: "codex-labeling",
      organization: "Codex Alimentarius Commission",
      title: "General Standard for the Labelling of Pre-packaged Foods (CXS 1-1985)",
      url: "https://www.fao.org/fao-who-codexalimentarius/codex-texts/standards/en/",
      note: "International foundation for truthful presentation, food identity, ingredient listing, net contents, responsible party, lot identification, date marking, and legibility."
    },
    {
      id: "codex-food-hygiene",
      organization: "Codex Alimentarius Commission",
      title: "General Principles of Food Hygiene (CXC 1-1969)",
      url: "https://www.fao.org/fao-who-codexalimentarius/codex-texts/codes-of-practice/en/",
      note: "International foundation for food-hygiene programs and HACCP-based control from primary inputs through processing, transport, and service."
    },
    {
      id: "iupac-henry-law",
      organization: "International Union of Pure and Applied Chemistry",
      title: "IUPAC Gold Book — Henry's Law",
      url: "https://goldbook.iupac.org/terms/view/H02783",
      note: "Authoritative chemistry terminology supporting the pressure-solubility relationship while the lesson also flags temperature and beverage-composition effects."
    },
    {
      id: "osha-carbon-dioxide",
      organization: "U.S. Occupational Safety and Health Administration",
      title: "Carbon Dioxide — Chemical Data",
      url: "https://www.osha.gov/chemicaldata/183",
      note: "Primary U.S. workplace reference supporting the need to manage carbon-dioxide exposure and oxygen-displacement risk in gas storage and fountain areas."
    },
    {
      id: "epa-recycling-basics",
      organization: "U.S. Environmental Protection Agency",
      title: "Recycling Basics and Benefits",
      url: "https://www.epa.gov/recycle/recycling-basics-and-benefits",
      note: "Supports careful circularity framing that material recovery depends on product and package design, collection, sorting, markets, and local infrastructure."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
