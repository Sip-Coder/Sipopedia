import type {
  BeyondTheGlassChapter,
  BeyondTheGlassFieldNote,
  BeyondTheGlassNarrationLine,
  BeyondTheGlassScene,
  BeyondTheGlassSpeaker
} from "./beyondTheGlassChapters";

const waterArtwork = (
  slug: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/water/${slug}-1600.webp`,
  srcSet:
    `/beyond-the-glass/water/${slug}-960.webp 960w, ` +
    `/beyond-the-glass/water/${slug}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/water/${slug}-portrait-960.webp`,
  portraitSrcSet:
    `/beyond-the-glass/water/${slug}-portrait-640.webp 640w, ` +
    `/beyond-the-glass/water/${slug}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  position: "center",
  portraitPosition: "center",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

const fieldNote = (
  eyebrow: string,
  title: string,
  detail: string
): BeyondTheGlassFieldNote => ({ eyebrow, title, detail });

const guide = (
  speaker: BeyondTheGlassSpeaker,
  text: string,
  durationSeconds = 7
): BeyondTheGlassNarrationLine => ({ speaker, text, durationSeconds });

type WaterSceneSeed = {
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

const waterSceneSeeds: WaterSceneSeed[] = [
  {
    id: "water-academy-gate",
    title: "The Water Adventure",
    eyebrow: "SIP Academy · Water",
    summary:
      "A luminous drop enters the Academy's Water Pavilion and reveals a connected journey from cloud and catchment to beverage and glass.",
    checkpoint: "Cloud to consumer",
    motion: "establish",
    art: "water-academy",
    alt:
      "The brass-and-glass SIP Academy Water Pavilion at sunrise, connected to mountains, rain clouds, rivers, a reservoir, wetlands, and a glowing aquifer by luminous blue water routes.",
    landmark: { label: "Water Pavilion", x: 50, y: 58 },
    drop: { x: 50, y: 65, size: 8 },
    fieldNotes: [
      fieldNote(
        "One water",
        "The route is a cycle, not a straight line",
        "Water moves among atmosphere, land, surface water, groundwater, living systems, infrastructure, and renewed use."
      ),
      fieldNote(
        "Source",
        "Every supply begins somewhere specific",
        "Rivers, lakes, reservoirs, springs, and aquifers carry different conditions, risks, and treatment needs."
      ),
      fieldNote(
        "Multiple barriers",
        "Safety is protected in layers",
        "Source protection, appropriate treatment, distribution control, monitoring, and sound handling work together rather than relying on one step."
      ),
      fieldNote(
        "Beverage lens",
        "Water remains an ingredient and an operating system",
        "It shapes dilution, extraction, cleaning, heat transfer, texture, consistency, and the final guest experience."
      ),
      fieldNote(
        "Field team",
        "Three guides follow three kinds of evidence",
        "Sippy traces the journey, Roma reads sensory clues, and Hummin protects the process record."
      )
    ],
    narration: [
      guide(
        "Sippy",
        "Welcome to the Water Pavilion. We are following one drop through landscapes, barriers, pipes, beverage rooms, and finally your glass."
      ),
      guide(
        "Roma",
        "I will notice what water reveals through taste, aroma, texture, temperature, and presentation—without pretending sensory clues prove safety."
      ),
      guide(
        "Hummin",
        "I will hold the system map: source, controls, measurements, custody, and the decisions that keep every handoff accountable."
      )
    ]
  },
  {
    id: "water-cycle-atlas",
    title: "The Moving Drop",
    eyebrow: "Hydrologic cycle",
    summary:
      "The drop changes location and state as solar energy, gravity, weather, geology, plants, and people keep water moving.",
    checkpoint: "Sky to land to sky",
    motion: "orbit",
    art: "water-academy",
    alt:
      "A cinematic water-cycle panorama linking clouds and rain to snowfields, rivers, lakes, soil, aquifers, plants, human use, and evaporation around the SIP Academy Water Pavilion.",
    landmark: { label: "Cycle observatory", x: 66, y: 34 },
    drop: { x: 73, y: 27, size: 7 },
    fieldNotes: [
      fieldNote("Atmosphere", "Condensation builds clouds", "Water vapor cools and condenses into liquid droplets or ice that can later return as precipitation."),
      fieldNote("Precipitation", "Rain and snow start many visible routes", "Precipitation may run over land, collect in surface water, infiltrate soil, freeze, or return to the atmosphere."),
      fieldNote("Runoff", "Gravity organizes the surface route", "Water moves downhill toward streams, rivers, lakes, wetlands, and oceans within connected drainage networks."),
      fieldNote("Infiltration", "Some water enters the ground", "Water that soaks into soil may support plants, move laterally, or recharge groundwater depending on geology and conditions."),
      fieldNote("Evapotranspiration", "Water returns through surface and leaf", "Evaporation and plant transpiration move water back to the atmosphere; rates vary with energy, weather, vegetation, and available water."),
      fieldNote("Human use", "People reroute part of the cycle", "Withdrawal, storage, irrigation, treatment, consumption, and return flows change where water is, how long it stays, and what it carries.")
    ],
    narration: [guide("Sippy", "Follow the drop, but do not expect one universal itinerary. Climate, terrain, geology, ecosystems, and human use redraw the route every day.")]
  },
  {
    id: "water-watershed-lens",
    title: "The Watershed Lens",
    eyebrow: "Source water · Surface",
    summary:
      "A watershed gathers everything flowing toward a shared outlet, so land decisions upstream can become water-quality conditions downstream.",
    checkpoint: "Read the drainage basin",
    motion: "glide",
    art: "watershed-aquifer",
    alt:
      "A wide illustrated watershed map showing mountain divides, tributaries, a reservoir, wetlands, farms, towns, forests, monitoring stations, and protected riparian corridors flowing toward a drinking-water intake.",
    landmark: { label: "Watershed divide", x: 48, y: 24 },
    drop: { x: 57, y: 50, size: 7 },
    fieldNotes: [
      fieldNote("Divide", "Ridges define where runoff travels", "A watershed boundary separates land draining toward one outlet from neighboring drainage areas."),
      fieldNote("Tributaries", "Small streams build the main river", "Headwaters and tributaries connect distant parts of the basin to the downstream supply."),
      fieldNote("Land use", "The map is also a risk inventory", "Agriculture, roads, industry, septic systems, wildfire, and urban runoff can change sediment, nutrient, chemical, and microbial pressures."),
      fieldNote("Natural infrastructure", "Wetlands and riparian areas can slow and filter", "Healthy buffers can reduce erosion, support habitat, and help protect water quality, though they do not replace required treatment."),
      fieldNote("Protection", "Preventing contamination is the first barrier", "Source-water protection can reduce risk and treatment burden by managing threats before they reach the intake."),
      fieldNote("Monitoring", "Conditions change with storms and seasons", "Operators use source observations and samples to anticipate shifts in turbidity, temperature, algae, runoff, and treatment demand.")
    ],
    narration: [guide("Hummin", "A watershed is not scenery around the system. It is the first operating room, and every upstream signal belongs in the record.")]
  },
  {
    id: "water-source-resilience",
    title: "The Source Resilience Observatory",
    eyebrow: "Source water · Change",
    summary:
      "Storm, drought, wildfire, reservoir turnover, and bloom conditions can change both water availability and the treatment challenge before the intake.",
    checkpoint: "Read a changing source",
    motion: "glide",
    art: "source-resilience",
    alt:
      "A SIP Academy source-resilience observatory overlooking a snow-fed watershed, storm rain, reservoir and intake tower, monitored deep-water layers, a recovering wildfire slope, wetlands, and luminous cyan flow paths.",
    landmark: { label: "Resilience observatory", x: 18, y: 68 },
    drop: { x: 51, y: 57, size: 7 },
    fieldNotes: [
      fieldNote("Supply", "Quantity and quality move together", "Drought can reduce available water and concentrate some constituents, while major storms can deliver sudden sediment, debris, nutrients, and contamination pressure."),
      fieldNote("Storm pulse", "Runoff can change the source in hours", "Operators watch rainfall, streamflow, turbidity, temperature, and upstream events so treatment can respond before the pulse reaches the intake."),
      fieldNote("Reservoir layers", "Temperature can organize depth", "Seasonal stratification can create water layers with different temperature, oxygen, algae, metals, taste, and odor conditions; turnover can rapidly remix them."),
      fieldNote("Intake depth", "The best withdrawal point may change", "Where infrastructure allows, operators can select intake depth using current source observations rather than assuming the reservoir is uniform."),
      fieldNote("Cyanobacteria", "A bloom needs a specific management plan", "Cyanobacterial cells may create taste and odor problems and some species can produce toxins, so prevention, monitoring, treatment, and communication must address both cells and dissolved toxins."),
      fieldNote("Wildfire", "A burned watershed can rewrite runoff", "Fire and post-fire erosion can alter sediment, organic matter, nutrients, debris, and treatment demand; impacts depend on severity, terrain, rainfall, and local systems."),
      fieldNote("Redundancy", "Resilience keeps another path available", "Utilities plan alternative sources, storage, backup power, treatment flexibility, emergency supply, mutual aid, and communication according to local hazards."),
      fieldNote("Adaptation", "The source plan must keep learning", "Trend data, inspections, forecasts, watershed partnerships, exercises, and after-action reviews help the system adjust as conditions change.")
    ],
    narration: [guide("Hummin", "A source is not a fixed recipe. Weather, reservoir depth, fire, blooms, and demand move the starting line, so resilient systems watch the landscape and preserve options.")]
  },
  {
    id: "water-groundwater-archive",
    title: "The Groundwater Archive",
    eyebrow: "Source water · Subsurface",
    summary:
      "Below the visible landscape, water occupies connected pore spaces and fractures, moving through aquifers at rates controlled by geology.",
    checkpoint: "Recharge to wellhead",
    motion: "cutaway",
    art: "watershed-aquifer",
    alt:
      "A landscape-to-aquifer cutaway showing rainfall infiltration, soil, the unsaturated zone, water table, porous aquifer layers, a confining layer, springs, groundwater flow, recharge areas, and a protected wellhead.",
    landmark: { label: "Aquifer archive", x: 58, y: 67 },
    drop: { x: 45, y: 57, size: 7 },
    fieldNotes: [
      fieldNote("Unsaturated zone", "Pores contain both air and water", "Infiltrating water moves through soil and rock above the water table before it may reach saturated material."),
      fieldNote("Water table", "Saturation begins at a moving boundary", "The water table can rise or fall with recharge, withdrawal, season, and local geology."),
      fieldNote("Porosity", "Open space stores water", "Porosity describes how much open space a material contains; it does not by itself tell how easily water can move."),
      fieldNote("Permeability", "Connected openings control movement", "Permeable material allows water to travel more readily, while low-permeability layers can slow or redirect flow."),
      fieldNote("Recharge", "Some precipitation replenishes groundwater", "Recharge depends on precipitation, soil, vegetation, slope, land cover, and the hydraulic properties below."),
      fieldNote("Wellhead", "Protection follows the contributing area", "Protecting a well means understanding the land and subsurface area from which water and contaminants could reach it.")
    ],
    narration: [guide("Sippy", "Groundwater is usually not an underground river. Imagine water moving through a living archive of pores and fractures, sometimes quickly, sometimes over centuries.")]
  },
  {
    id: "water-intake-threshold",
    title: "The Intake Threshold",
    eyebrow: "Raw water arrival",
    summary:
      "An intake transfers source water into controlled infrastructure while protecting pumps, wildlife, operators, and the treatment train.",
    checkpoint: "Source to plant",
    motion: "push-in",
    art: "intake-screening",
    alt:
      "A SIP Academy raw-water intake beside a reservoir, with a protected intake tower, fish-friendly approach, trash rack, pumps, flow meters, raw-water sampling station, and pipes entering the treatment hall.",
    landmark: { label: "Intake tower", x: 32, y: 50 },
    drop: { x: 42, y: 56, size: 7 },
    fieldNotes: [
      fieldNote("Intake", "Location controls what arrives", "Depth, season, current, reservoir stratification, debris, and source conditions influence the water entering the plant."),
      fieldNote("Protection", "The opening must manage debris and life", "Intake structures use barriers and operating practices suited to local debris, ice, sediment, and aquatic-organism concerns."),
      fieldNote("Pumps", "Flow begins as a controlled transfer", "Pumps provide the head needed to move raw water while operators watch flow, pressure, vibration, and availability."),
      fieldNote("Variability", "Raw water never stays perfectly still", "Storms, drought, wildfire, seasonal turnover, algae, and land-use events can change treatment demand."),
      fieldNote("Sampling", "The first sample establishes the starting point", "Raw-water measurements such as turbidity, temperature, pH, and other source-specific parameters guide treatment decisions."),
      fieldNote("Redundancy", "Resilience requires another path", "Utilities plan for maintenance, power loss, source events, and equipment failure rather than assuming uninterrupted ideal conditions.")
    ],
    narration: [guide("Hummin", "This threshold converts a changing landscape into an operating signal. Measure first, then choose the treatment response.")]
  },
  {
    id: "water-screening-balance",
    title: "Screens, Flow, and Balance",
    eyebrow: "Preliminary treatment",
    summary:
      "Screens and hydraulic controls remove or route large material before the finer chemistry and separation work begins.",
    checkpoint: "Protect the process",
    motion: "rotate",
    art: "intake-screening",
    alt:
      "A detailed cutaway of a water-treatment headworks with coarse and fine screens, debris handling, grit control, channels, gates, pumps, flow meters, and an operator sampling raw water.",
    landmark: { label: "Screen gallery", x: 52, y: 48 },
    drop: { x: 63, y: 56, size: 7 },
    fieldNotes: [
      fieldNote("Coarse screen", "Large debris stops first", "Bars or screens protect downstream pumps and equipment from sticks, leaves, trash, and other large material."),
      fieldNote("Fine screen", "Smaller openings refine protection", "Where used, finer screening can reduce smaller debris before later treatment, but it does not make water safe to drink."),
      fieldNote("Grit", "Dense mineral solids need a route out", "Some systems manage sand or grit early so abrasive material does not settle in or damage downstream equipment."),
      fieldNote("Flow", "Treatment depends on residence and loading", "Meters, gates, and pumps keep flow within the operating range the next barriers were designed to handle."),
      fieldNote("Condition", "Turbidity is a clue, not a complete diagnosis", "Cloudiness can affect treatment and disinfection performance, while many dissolved or microbial hazards are not visible."),
      fieldNote("Waste stream", "Removed material still needs stewardship", "Screenings, grit, and wash water require safe handling under local operational and environmental requirements.")
    ],
    narration: [guide("Roma", "The water may look nearly unchanged, but the path is now protected from the largest physical surprises. Clarity alone still cannot certify safety.")]
  },
  {
    id: "water-coagulation-flocculation",
    title: "The Floc Constellation",
    eyebrow: "Coagulation and flocculation",
    summary:
      "Chemistry and gentle motion help suspended material gather into larger, separable flocs.",
    checkpoint: "Particles gather",
    motion: "orbit",
    art: "clarification-gallery",
    alt:
      "A luminous treatment gallery showing rapid-mix coagulation, slow flocculation basins, suspended particles gathering into visible flocs, a jar-test bench, chemical feed systems, and operator controls.",
    landmark: { label: "Floc constellation", x: 53, y: 49 },
    drop: { x: 42, y: 48, size: 7 },
    fieldNotes: [
      fieldNote("Coagulant", "Dose changes particle behavior", "Appropriate coagulants help destabilize small suspended particles so they can begin to gather; selection and dose are source-specific."),
      fieldNote("Rapid mix", "Fast energy distributes chemistry", "Initial mixing disperses the coagulant quickly through the incoming water."),
      fieldNote("Charge", "Invisible forces affect separation", "Many fine particles remain suspended partly because their surface charges keep them apart until treatment changes those interactions."),
      fieldNote("Floc basin", "Gentle mixing grows larger clusters", "Controlled slow mixing increases particle contact while limiting the shear that can break fragile flocs."),
      fieldNote("Jar test", "Bench-scale trials support dose decisions", "Operators can compare coagulant doses and conditions against changing raw-water quality before adjusting the full process."),
      fieldNote("Turbidity", "A treatment signal moves through the train", "Operators track turbidity and process behavior across barriers rather than trusting only the final appearance.")
    ],
    narration: [guide("Sippy", "This is a choreography of chemistry and motion: distribute quickly, gather gently, and prepare what was suspended to leave the water.")]
  },
  {
    id: "water-sedimentation-gallery",
    title: "The Settling Gallery",
    eyebrow: "Clarification",
    summary:
      "Gravity separates heavier flocs from clarified water while basin hydraulics and solids handling protect the next barrier.",
    checkpoint: "Floc to settled solids",
    motion: "cutaway",
    art: "clarification-gallery",
    alt:
      "A cross-section of elegant sedimentation basins where flocs settle, clarified water passes over collection weirs, settled solids move toward hoppers, and operators monitor blanket depth and carryover.",
    landmark: { label: "Settling basin", x: 60, y: 58 },
    drop: { x: 61, y: 36, size: 7 },
    fieldNotes: [
      fieldNote("Settling zone", "Gravity creates separation", "Flocs denser than water settle when basin flow and residence conditions allow."),
      fieldNote("Clear zone", "Clarified water moves onward", "Water above the settling solids is collected for filtration; clarification reduces loading but is not the final safety barrier."),
      fieldNote("Weirs", "Even collection protects hydraulics", "Outlet weirs spread withdrawal across the basin to reduce short-circuiting and solids carryover."),
      fieldNote("Solids", "The removed mass becomes a managed stream", "Settled solids are collected, thickened, treated, or disposed of according to plant design and local requirements."),
      fieldNote("Blanket", "Depth and movement reveal performance", "Operators watch settled-solids accumulation and removal so it does not rise into the clarified-water path."),
      fieldNote("Carryover", "A disturbance can burden filtration", "Hydraulic surges, weak floc, or poor solids removal can send extra particles toward filters and reduce process margin.")
    ],
    narration: [guide("Hummin", "Separation is not disappearance. The particles now leave by a documented solids route while clarified water continues to another barrier.")]
  },
  {
    id: "water-filter-strata",
    title: "The Filter Strata",
    eyebrow: "Filtration",
    summary:
      "Water moves through engineered media or membranes that capture particles and support the treatment goals of the specific system.",
    checkpoint: "Clarified to filtered",
    motion: "push-in",
    art: "filtration-disinfection",
    alt:
      "A cutaway filter hall showing layers of granular media, underdrains, filter-to-waste routing, turbidity sensors, backwash flow, and a neighboring membrane train as an alternative technology.",
    landmark: { label: "Filter bed", x: 39, y: 53 },
    drop: { x: 39, y: 40, size: 7 },
    fieldNotes: [
      fieldNote("Media", "A filter is more than a kitchen strainer", "Granular filters can use layers such as sand, anthracite, or other media to remove particles through multiple capture mechanisms."),
      fieldNote("Depth", "Removal happens through the bed", "Particles can be retained within pore spaces and on media surfaces as water travels downward or through the designed flow path."),
      fieldNote("Turbidity", "Filtered-water clarity is a critical operating measure", "Systems monitor filter effluent and respond when performance moves outside required or established limits."),
      fieldNote("Head loss", "Captured material changes resistance", "As solids accumulate, resistance rises; operators use head loss, time, and water-quality signals to guide filter runs."),
      fieldNote("Backwash", "Cleaning reverses the loading", "Water, and sometimes air, expands and cleans the media so retained solids leave through a separate wash-water route."),
      fieldNote("Membranes", "Some systems use a different barrier", "Membrane processes can provide fine separation, but pretreatment, integrity, energy, cleaning, and concentrate management still matter.")
    ],
    narration: [guide("Roma", "The filter is a working landscape. As particles collect, the bed changes, and the operators read that change before the water moves on.")]
  },
  {
    id: "water-disinfection-boundary",
    title: "The Disinfection Boundary",
    eyebrow: "Microbial control",
    summary:
      "A validated disinfection strategy inactivates targeted microorganisms while operators manage dose, contact, residual, and byproduct risk.",
    checkpoint: "Barrier before distribution",
    motion: "rotate",
    art: "filtration-disinfection",
    alt:
      "A water disinfection hall with a baffled contact basin, controlled chlorine feed, ultraviolet reactors, ozone contact equipment, analyzers, and a distribution residual monitoring point shown as distinct system options.",
    landmark: { label: "Contact basin", x: 64, y: 51 },
    drop: { x: 63, y: 45, size: 7 },
    fieldNotes: [
      fieldNote("Strategy", "Different systems use different disinfectants", "Chlorine-based disinfectants, ultraviolet light, ozone, or combinations may be selected according to source, treatment, regulation, and distribution needs."),
      fieldNote("Contact", "Performance depends on dose and exposure", "Chemical disinfection is evaluated with concentration, contact time, water conditions, and organism-specific targets—not dose alone."),
      fieldNote("UV", "Light can inactivate without adding a residual", "Validated UV systems deliver a controlled dose, but UV does not by itself protect water later in the distribution network."),
      fieldNote("Ozone", "Strong oxidation serves specific treatment goals", "Ozone can support disinfection and oxidation, but system design must manage generation, contact, off-gas, and byproducts."),
      fieldNote("Residual", "Some protection must travel", "Many distribution systems maintain a disinfectant residual and monitor it as one signal of system control."),
      fieldNote("Byproducts", "Protection requires balancing risks", "Disinfectants can react with natural or added constituents, so precursor removal, dose control, and regulatory monitoring remain important.")
    ],
    narration: [guide("Hummin", "Disinfection is a validated boundary, not a magic switch. The treatment goal, water conditions, exposure, monitoring, and downstream system all belong in the decision.")]
  },
  {
    id: "water-advanced-treatment",
    title: "Advanced Water Treatment",
    eyebrow: "Advanced treatment · Fit for purpose",
    summary:
      "For dissolved, volatile, or persistent targets, engineers select a process from evidence—not from a universal checklist.",
    checkpoint: "Target to technology",
    motion: "orbit",
    art: "advanced-treatment",
    alt:
      "A brass-and-glass SIP Academy advanced-treatment hall with activated carbon, ion exchange, membrane racks, air stripping, oxidation, remineralization, blending, and a separate residuals route linked by luminous cyan water pipes.",
    landmark: { label: "Treatment atelier", x: 50, y: 50 },
    drop: { x: 52, y: 47, size: 7 },
    fieldNotes: [
      fieldNote("Activated carbon", "Adsorption captures selected compounds", "Powdered or granular activated carbon can reduce suitable organic compounds, taste-and-odor contributors, and other targets; dose, contact, competition, capacity, and changeout control performance."),
      fieldNote("Ion exchange", "Resins trade ions selectively", "Cation or anion exchange can remove targeted dissolved ions such as hardness species, nitrate, or other constituents when the resin and operating cycle are correctly selected."),
      fieldNote("Membranes", "Pressure separates at a finer scale", "Nanofiltration and reverse osmosis can reject many dissolved constituents, but pretreatment, integrity, energy, recovery, cleaning, and concentrate management remain part of the system."),
      fieldNote("Air stripping", "Volatile compounds can move to a gas phase", "Packed towers or aeration may remove suitable volatile compounds; air flow, temperature, transfer efficiency, off-gas management, and fouling matter."),
      fieldNote("Oxidation", "Reactive chemistry transforms selected targets", "Ozone or advanced oxidation can address specific contaminants or taste-and-odor compounds, but byproducts, energy, dose, contact, and downstream treatment must be evaluated."),
      fieldNote("Blending", "Finished chemistry may need rebuilding", "After aggressive separation, controlled blending or remineralization can restore stability, treatment compatibility, process performance, and sensory balance."),
      fieldNote("Residuals", "A removed contaminant still exists somewhere", "Spent media, regenerant, backwash, brine, concentrate, and off-gas require safe handling under applicable environmental and operating requirements."),
      fieldNote("Selection", "Pilot the treatment against the real water", "Source composition, target concentration, flow, variability, regulations, reliability, operator capacity, lifecycle cost, and waste routes determine the appropriate train.")
    ],
    narration: [guide("Sippy", "Advanced treatment is not a parade through every machine. Name the target, understand the whole water, prove the process, and account for what leaves by every exit.")]
  },
  {
    id: "water-mineral-signature",
    title: "The Mineral Signature",
    eyebrow: "Water chemistry",
    summary:
      "Dissolved ions shape buffering, scaling, corrosion, process behavior, and sensory perception without declaring whether water is safe.",
    checkpoint: "Read the dissolved profile",
    motion: "orbit",
    art: "mineral-quality-lab",
    alt:
      "A luminous SIP Academy water-chemistry laboratory with a central water-drop prism, mineral samples, titration glassware, pH and conductivity probes, ion diagrams, and beverage vessels arranged as an interactive study atlas.",
    landmark: { label: "Mineral prism", x: 51, y: 47 },
    drop: { x: 51, y: 47, size: 8 },
    fieldNotes: [
      fieldNote("Hardness", "Calcium and magnesium lead the measure", "Hardness is driven mainly by dissolved calcium and magnesium and can affect scaling, soap behavior, process equipment, and mouthfeel."),
      fieldNote("Alkalinity", "Buffering resists pH change", "Alkalinity is a water property associated largely with acid-neutralizing species such as bicarbonate, carbonate, and hydroxide."),
      fieldNote("pH", "Acidity is a condition, not a flavor score", "pH affects chemical equilibria, treatment, corrosion, and disinfection; it does not by itself describe alkalinity or total mineral content."),
      fieldNote("Conductivity", "Dissolved ions carry current", "Specific conductance can provide a rapid indication of ionic content and change, but identifying individual ions requires other methods."),
      fieldNote("Calcium and magnesium", "One pair, many consequences", "These ions contribute hardness and can influence precipitation, scaling, beverage extraction, and perceived texture depending on the whole system."),
      fieldNote("Chloride and sulfate", "Concentration and context matter", "These common ions can affect corrosion, treatment, and beverage flavor emphasis, but simple ratios should never replace full recipe and water analysis."),
      fieldNote("Sensory limit", "Taste cannot certify safety", "A mineral signature may be noticeable or neutral; many important contaminants have no reliable taste, smell, or appearance warning.")
    ],
    narration: [guide("Roma", "Minerals can change texture and flavor, but the palate is not a compliance laboratory. Sensory observation and safety verification do different jobs.")]
  },
  {
    id: "water-quality-lab",
    title: "The Quality Observatory",
    eyebrow: "Sampling and verification",
    summary:
      "A defensible result begins before the instrument: with the right sampling point, container, method, calibration, controls, and record.",
    checkpoint: "Sample to decision",
    motion: "cutaway",
    art: "mineral-quality-lab",
    alt:
      "A water quality observatory with mapped sample taps, sterile containers, incubators, colorimetric tests, ion instruments, calibration standards, control charts, chain-of-custody records, and operators reviewing results.",
    landmark: { label: "Quality bench", x: 63, y: 53 },
    drop: { x: 59, y: 45, size: 7 },
    fieldNotes: [
      fieldNote("Plan", "The sample must answer a defined question", "Source, treatment, distribution, beverage-process, and product samples are taken at different points for different decisions."),
      fieldNote("Microbiology", "Sampling technique protects the result", "Sterile collection, suitable holding conditions, timely analysis, and approved methods help prevent contamination or loss of evidence."),
      fieldNote("Chemistry", "No single panel measures everything", "Parameters are selected from regulatory, operational, source-risk, equipment, product, and investigative needs."),
      fieldNote("Calibration", "An instrument needs traceable reference", "Standards, blanks, checks, maintenance, and calibration records establish whether a measurement can be trusted."),
      fieldNote("Quality control", "Controls reveal drift and contamination", "Duplicates, spikes, blanks, and control charts can show whether variation belongs to the water or the method."),
      fieldNote("Operational", "Fast signals guide the process", "Online and bench measurements support immediate control, while compliance verification follows jurisdiction-specific sampling and approved-method requirements."),
      fieldNote("Records", "A number without context loses meaning", "Time, location, collector, method, conditions, units, result, action, and chain of custody preserve the decision trail.")
    ],
    narration: [guide("Hummin", "The laboratory protects context. A trustworthy number remembers where the sample came from, how it was handled, how it was measured, and what decision followed.")]
  },
  {
    id: "water-safety-plan",
    title: "The Water Safety Control Room",
    eyebrow: "Risk management · Catchment to consumer",
    summary:
      "A water safety plan maps hazards, validates barriers, watches operating limits, prepares corrective actions, verifies performance, and communicates when conditions change.",
    checkpoint: "Hazard to response",
    motion: "cutaway",
    art: "advanced-treatment",
    alt:
      "A SIP Academy water safety control room using the advanced-treatment hall as a complete system map, with distinct process barriers, monitoring stations, separate residual routes, and a luminous catchment-to-consumer path.",
    landmark: { label: "Control loop", x: 51, y: 73 },
    drop: { x: 50, y: 44, size: 7 },
    fieldNotes: [
      fieldNote("System map", "Begin with the actual supply", "Document the catchment, source, treatment, storage, distribution, premise interfaces, people, normal conditions, and credible abnormal events."),
      fieldNote("Hazard", "Ask what could enter, fail, or drift", "Microbial, chemical, physical, radiological, operational, security, climate, infrastructure, and human-factor hazards vary by system and jurisdiction."),
      fieldNote("Control measure", "Each barrier needs a defined job", "Source controls, treatment steps, pressure, residual, hygienic handling, maintenance, and other measures are evaluated against the hazards they are intended to manage."),
      fieldNote("Operating limit", "A signal must trigger a timely decision", "Useful operational monitoring is rapid, objective, located at the right point, assigned to a responsible person, and paired with an established response."),
      fieldNote("Corrective action", "Plan the recovery before the deviation", "Procedures define who acts, how control is restored, what is isolated or held, who is notified, and how the event is documented."),
      fieldNote("Verification", "Confirm the full plan is working", "Compliance monitoring, audits, inspections, user feedback, trend review, and independent surveillance perform different checks from day-to-day operational control."),
      fieldNote("Communication", "Trust requires useful context", "Consumer reports, advisories, incident messages, and return-to-service notices should state the source, issue, affected users, required action, timing, and where to get updates."),
      fieldNote("Improvement", "Close the loop after every signal", "Near misses, complaints, failures, exercises, maintenance findings, and changing source conditions belong in a documented improvement plan.")
    ],
    narration: [guide("Hummin", "The control room is a promise written as a loop: know the system, name the risk, hold each barrier inside its limits, act before confidence is lost, and verify the whole path.")]
  },
  {
    id: "water-storage-distribution",
    title: "The Traveling Reservoir",
    eyebrow: "Storage and distribution",
    summary:
      "Clearwells, tanks, pumps, valves, and pipes keep treated water available and pressurized while protecting quality through the final utility handoff.",
    checkpoint: "Plant to premise",
    motion: "glide",
    art: "distribution-beverage",
    alt:
      "A cross-section of a SIP Academy distribution network showing a clearwell, elevated tank, pump station, pressure zones, valves, mains, service lines, residual monitors, a beverage hall, and premise plumbing.",
    landmark: { label: "Distribution spine", x: 51, y: 56 },
    drop: { x: 41, y: 56, size: 7 },
    fieldNotes: [
      fieldNote("Clearwell", "Storage can complete contact and balance demand", "Plant storage may provide treated-water reserve, hydraulic stability, and—where designed—part of the required disinfectant contact path."),
      fieldNote("Tank", "Elevation stores pressure and time", "Elevated or ground storage helps balance demand and emergencies, but mixing, turnover, inspection, and maintenance protect water quality."),
      fieldNote("Pressure", "Positive pressure is a protective condition", "Pumps, tanks, and valves maintain service; pressure loss or transients can create operational and contamination concerns."),
      fieldNote("Network", "Pipes are the largest physical system", "Mains, service lines, valves, hydrants, pumps, and storage facilities connect the treatment plant to customers."),
      fieldNote("Water age", "Time changes the traveling water", "Long residence can affect residual, temperature, microbial conditions, and reaction products, so systems manage turnover and monitor zones."),
      fieldNote("Corrosion", "Water and materials interact", "Chemistry, pipe materials, scales, temperature, and hydraulics influence corrosion and the potential release of metals or other constituents."),
      fieldNote("Premise", "Responsibility changes at the service connection", "Building plumbing, fixtures, stagnation, treatment devices, and maintenance can alter water after the utility delivery point.")
    ],
    narration: [guide("Sippy", "Treatment does not end the story. Distribution is the longest room in the Academy, and time, pressure, materials, and maintenance keep writing on the water.")]
  },
  {
    id: "water-corrosion-premise",
    title: "The Final-Mile Plumbing Observatory",
    eyebrow: "Corrosion control · Premise water",
    summary:
      "The last miles place finished water in contact with mains, service lines, scales, heaters, fixtures, filters, and periods of stagnation that can change the final tap.",
    checkpoint: "Main to fixture",
    motion: "cutaway",
    art: "premise-control",
    alt:
      "A SIP Academy cutaway linking a municipal main and service line to corrosion-control monitoring, pipe material samples, building hot and cold plumbing, a water heater, fixtures, point-of-use treatment, flushing paths, and a tap sampling station.",
    landmark: { label: "Final-mile observatory", x: 59, y: 54 },
    drop: { x: 48, y: 62, size: 7 },
    fieldNotes: [
      fieldNote("Materials", "Water meets a mixed archive of surfaces", "Iron, steel, copper, brass, plastics, solders, scales, service lines, fixtures, and legacy materials interact differently with water chemistry and hydraulics."),
      fieldNote("Stability", "pH and alkalinity shape corrosion conditions", "Utilities evaluate finished-water chemistry with the actual distribution materials and treatment goals; a single pH number cannot predict every premise outcome."),
      fieldNote("Orthophosphate", "Some systems use a corrosion inhibitor", "Where selected and approved, orthophosphate can help reduce lead and copper release by supporting less-soluble protective scales; dose and performance depend on the water and existing pipe scale."),
      fieldNote("Stagnation", "Time in plumbing changes the sample", "Water held in a service line, building branch, heater, or fixture can warm, lose residual, exchange material with surfaces, and differ from freshly drawn water."),
      fieldNote("Flushing", "Movement can restore fresher water", "Purposeful flushing may replace stagnant water or respond to maintenance, but instructions should come from the relevant utility, health authority, facility plan, or device manufacturer."),
      fieldNote("Point of use", "A device creates a new control point", "Filters and treatment devices must suit the target, be installed correctly, receive scheduled maintenance, and avoid becoming a source of stagnation or microbial growth."),
      fieldNote("Tap sampling", "Collection protocol changes the evidence", "First-draw, flushed, hot, cold, fixture, and service-line samples answer different questions; method, timing, location, and conditions must stay with the result."),
      fieldNote("Custody", "The final handoff is shared", "Utility controls, building ownership, plumbing codes, facility maintenance, tenant practices, and public-health guidance each protect a different part of the route.")
    ],
    narration: [guide("Hummin", "The final tap is a meeting between utility water and premise plumbing. Preserve the evidence: material, time, temperature, flow, treatment device, sample method, and who controls the next action.")]
  },
  {
    id: "water-beverage-operations",
    title: "The Beverage Water Room",
    eyebrow: "Ingredient and utility",
    summary:
      "Beverage facilities verify incoming water, choose product-specific treatment when needed, and control every connection between process water, equipment, cleaning, and product.",
    checkpoint: "Water to recipe",
    motion: "rotate",
    art: "distribution-beverage",
    alt:
      "A cutaway SIP Academy beverage water room feeding coffee, tea, brewery, winery, distillery, and nonalcoholic beverage studios through sample points, carbon filtration, reverse osmosis, mineral blending, hot-water systems, clean-in-place equipment, and wastewater recovery controls.",
    landmark: { label: "Beverage water room", x: 68, y: 51 },
    drop: { x: 62, y: 49, size: 7 },
    fieldNotes: [
      fieldNote("Specification", "Potable is the foundation, not the whole product brief", "Facilities define incoming and finished-water requirements from safety, product, equipment, process, and consistency needs."),
      fieldNote("Carbon", "Adsorption can target selected compounds", "Activated carbon may reduce disinfectant character or other adsorbable constituents, but capacity, contact, sanitation, and replacement require control."),
      fieldNote("Reverse osmosis", "Membranes can create a lower-mineral base", "RO is useful for some products and sources, but it is not universal and requires pretreatment, integrity, sanitation, energy, and concentrate management."),
      fieldNote("Remineralization", "A blank canvas still needs a recipe", "After demineralization, controlled mineral addition or blending can support flavor, extraction, stability, equipment, and brand consistency."),
      fieldNote("Heat", "Water also carries thermal work", "Hot liquor, brewing, extraction, pasteurization support, cooling, and cleaning place different temperature and quality demands on the system."),
      fieldNote("CIP", "Cleaning chemistry needs validated boundaries", "Water quality, time, temperature, concentration, flow, rinse verification, and hygienic design work together in clean-in-place programs."),
      fieldNote("Cross-connection", "Utility and product paths must stay controlled", "Backflow prevention, hygienic connections, air gaps, valve design, and maintenance help protect both the water supply and product."),
      fieldNote("Stewardship", "Efficiency includes quality, energy, and discharge", "Measure water by use, reduce avoidable loss, recover suitable streams safely, and manage wastewater without compromising sanitation or product quality.")
    ],
    narration: [guide("Hummin", "Inside a beverage facility, water has many identities: ingredient, rinse, steam source, coolant, cleaner, and waste stream. The boundaries must remain explicit.")]
  },
  {
    id: "water-extraction-studio",
    title: "The Extraction and Dilution Studio",
    eyebrow: "Beverage process · Water at work",
    summary:
      "The same verified water can extract, dilute, proof, heat, cool, freeze, rinse, or carry steam—each role requiring its own specification and control.",
    checkpoint: "Recipe to transfer",
    motion: "orbit",
    art: "beverage-extraction",
    alt:
      "A brass-and-glass SIP Academy beverage-water atelier with a central water prism branching to coffee and tea extraction, brewery vessels, wine and spirits dilution, ice and steam systems, mineral blending, cleaning, and recovery routes.",
    landmark: { label: "Water prism", x: 50, y: 48 },
    drop: { x: 50, y: 48, size: 8 },
    fieldNotes: [
      fieldNote("Coffee and tea", "Water becomes the extraction medium", "Temperature, contact time, particle or leaf preparation, ratio, agitation, and water chemistry interact; change one variable at a time when diagnosing flavor."),
      fieldNote("Brewing liquor", "Minerals and alkalinity affect the mash and glass", "Brewers may adjust source water for mash chemistry, yeast, flavor, equipment, and consistency, while treating every addition as part of a controlled recipe."),
      fieldNote("Dilution", "Added water changes concentration and balance", "Wine, spirits, syrups, concentrates, and nonalcoholic products may use water for controlled dilution; product category, legal identity, stability, measurement, and mixing requirements differ."),
      fieldNote("Proofing", "Strength must be measured, not guessed", "Where spirits are reduced with water, temperature, volume, alcohol concentration, mixing, rest, and jurisdiction-specific gauging rules affect the verified result."),
      fieldNote("Ice", "Frozen water is still food contact", "Potable source, machine hygiene, scoop handling, storage, melt drainage, and turnover protect ice from becoming a weak handoff."),
      fieldNote("Steam", "Not every steam contact has the same requirement", "Boiler treatment, culinary steam, indirect heating, direct product contact, condensate return, and equipment guidance define different boundaries."),
      fieldNote("Heat transfer", "Water moves energy as well as flavor", "Hot-water loops, chillers, jackets, heat exchangers, and cooling towers use water differently and require explicit separation from product paths."),
      fieldNote("Consistency", "The recipe starts with a measured baseline", "Track source changes, treatment performance, mineral additions, temperature, flow, lot, and sensory result so water variation does not masquerade as process drift.")
    ],
    narration: [guide("Sippy", "In the atelier, water changes jobs without becoming anonymous. Each route needs a specification, a boundary, and a record of what the drop was asked to do.")]
  },
  {
    id: "water-carbonation-blending",
    title: "The Sparkling Waterworks",
    eyebrow: "Beverage process · Blend and package",
    summary:
      "A controlled base water moves through blending, cooling, carbonation, hygienic transfer, and package protection to become a repeatable sparkling or formulated beverage.",
    checkpoint: "Base water to bright pour",
    motion: "rotate",
    art: "beverage-extraction",
    alt:
      "A SIP Academy beverage-water atelier emphasizing demineralization, mineral blending, a central water prism, chilled carbonation equipment, syrup and flavor vessels, hygienic piping, a filling line, ice, clean-in-place, and separate recovery channels.",
    landmark: { label: "Sparkling waterworks", x: 68, y: 54 },
    drop: { x: 50, y: 49, size: 7 },
    fieldNotes: [
      fieldNote("Base water", "Begin with a defined blank canvas", "Source and product goals determine whether filtration, carbon, softening, demineralization, blending, or no additional treatment is appropriate."),
      fieldNote("Deaeration", "Dissolved gas can affect processing", "Some systems reduce dissolved oxygen before blending or carbonation to support flavor stability and gas control; method and target are product-specific."),
      fieldNote("Remineralization", "Minerals can be a deliberate formulation", "Controlled salts or source-water blending can rebuild acidity, buffering, texture, extraction, or brand character after treatment."),
      fieldNote("Blend", "Concentration needs mass balance", "Water, concentrate, sweetener, acid, flavor, and functional ingredients are verified with calibrated dosing, mixing, temperature, density or soluble-solids checks, and recipe controls as applicable."),
      fieldNote("Carbonation", "Cold water holds gas more readily", "Carbon dioxide absorption depends on temperature, pressure, contact, composition, and equilibrium; stable control is more useful than chasing one pressure number."),
      fieldNote("Oxygen", "Air pickup can shorten freshness", "Tank headspace, seals, transfers, agitation, package purge, and fill design can influence dissolved oxygen and aroma stability."),
      fieldNote("Hygiene", "The clean side starts after the final barrier", "Sanitary design, validated cleaning, protected vents, hygienic connections, environmental control, and hold-and-release rules defend the product path."),
      fieldNote("Package", "The container completes the process system", "Closure, pressure tolerance, barrier properties, light and heat exposure, coding, storage, and distribution must fit the formulation and intended shelf life.")
    ],
    narration: [guide("Roma", "Sparkle changes aroma release, acidity, texture, and refreshment. Build it from measured water and controlled gas—then let the glass reveal the result.")]
  },
  {
    id: "water-bottle-tap-package",
    title: "Bottle, Tap, and Package",
    eyebrow: "Product identity and custody",
    summary:
      "Tap water and packaged water can begin from surface, groundwater, spring, or public-system sources, but their regulation, treatment, identity, package, and custody are not interchangeable.",
    checkpoint: "Fill to guest",
    motion: "push-in",
    art: "package-shared-glass",
    alt:
      "An elegant water packaging and service hall showing a sanitary filling line, glass and recyclable containers, closures, batch coding, warehouse storage, municipal tap, refill station, café carafe, and protected delivery routes.",
    landmark: { label: "Water passport", x: 47, y: 47 },
    drop: { x: 47, y: 47, size: 8 },
    fieldNotes: [
      fieldNote("Tap", "Public drinking water follows utility regulation", "In the United States, EPA and state programs regulate public drinking water, while building plumbing can still affect the water at the final tap."),
      fieldNote("Bottled", "Packaged water follows food regulation", "In the United States, FDA bottled-water standards address identity, quality, sanitary production, sampling, and labeling; other jurisdictions use their own systems."),
      fieldNote("Identity", "Spring, mineral, well, and purified have defined meanings", "A marketing word should be checked against the governing standard, source record, and treatment—not inferred from package imagery."),
      fieldNote("Treatment", "Purified describes a compliant process outcome", "Processes such as reverse osmosis or distillation may support a purified-water identity when applicable requirements are met."),
      fieldNote("Fill", "Sanitary packaging protects finished water", "Container preparation, hygienic equipment, environmental control, closure integrity, and product testing protect the water during filling."),
      fieldNote("Traceability", "A package needs a retrievable history", "Lot coding, source and treatment records, testing, packaging materials, hold-and-release decisions, and distribution records support investigation and recall."),
      fieldNote("Storage", "Package and environment still interact", "Heat, sunlight, time, damage, odors, and poor stock rotation can affect package integrity or sensory quality; follow product and material guidance."),
      fieldNote("Reuse", "Refill works only with hygienic care", "Reusable bottles and dispensers reduce single-use packaging only when cleaning, drying, handling, and refill-point maintenance protect quality.")
    ],
    narration: [guide("Roma", "Do not let the package write the tasting note for you. Read the identity, source, treatment, custody, temperature, and glass before deciding what the water expresses.")]
  },
  {
    id: "water-access-reuse-commons",
    title: "The Water Commons",
    eyebrow: "Access · Circular stewardship",
    summary:
      "A complete water system protects safe, available, affordable service while matching every recovered stream to an appropriate end use and keeping potable boundaries unmistakable.",
    checkpoint: "Reliable service for all",
    motion: "glide",
    art: "water-commons",
    alt:
      "A welcoming SIP Academy Water Commons with an accessible refill pavilion, community kiosk, leak repair, rain garden, restored wetland, clearly separated potable and non-potable reuse routes, and diverse adult visitors and operators.",
    landmark: { label: "Community refill pavilion", x: 23, y: 48 },
    drop: { x: 49, y: 58, size: 7 },
    fieldNotes: [
      fieldNote("Safely managed", "Access requires more than an improved source", "Global monitoring defines safely managed drinking-water service as an improved source located on premises, available when needed, and free from contamination."),
      fieldNote("Reliability", "Availability is a daily operating outcome", "Source capacity, treatment, power, storage, pressure, maintenance, staffing, finance, emergency planning, and spare parts all influence continuity."),
      fieldNote("Affordability", "A connection is not access if service is unreachable", "Equitable planning considers household cost, public refill options, service interruptions, disability access, language, rural systems, and people without direct billing relationships."),
      fieldNote("Leakage", "The hidden loss deserves measurement", "Water audits, metering, pressure management, active leak detection, repair, and asset renewal can conserve treated water without shifting risk to public health."),
      fieldNote("Fit for purpose", "Reuse quality must match the end use", "Recovered rainwater, stormwater, process water, greywater, or wastewater needs source characterization, suitable treatment, verification, and jurisdiction-specific approval for its intended use."),
      fieldNote("Separation", "Non-potable routes must stay unmistakable", "Distinct plumbing, identification, backflow protection, commissioning, inspection, and user communication help prevent cross-connections."),
      fieldNote("Potable reuse", "Drinking-water reuse requires a public-health framework", "Indirect and direct potable reuse use validated multi-barrier treatment, monitoring, redundancy, response plans, regulation, and public engagement appropriate to the jurisdiction."),
      fieldNote("Stewardship", "The best gallon is not always a new withdrawal", "Prevent pollution, repair loss, use efficient equipment, recover suitable streams, protect ecosystems, and measure water and energy together before expanding supply.")
    ],
    narration: [guide("Sippy", "The Water Commons asks two linked questions: can every person rely on safe service, and is every gallon used, recovered, and returned with a purpose worthy of the source?")]
  },
  {
    id: "water-sensory-service",
    title: "The Water Service Atelier",
    eyebrow: "Sensory · Hospitality",
    summary:
      "Thoughtful service separates observation from safety claims, controls vessel and temperature, and gives the guest clear choices without inventing purity, wellness, or origin stories.",
    checkpoint: "Observe, serve, explain",
    motion: "orbit",
    art: "water-commons",
    alt:
      "A golden-hour SIP Academy water-service terrace inside the Water Commons, with clean carafes, glasses at different temperatures, still and sparkling pours, a sensory observation bench, refill pavilion, protected potable route, and welcoming adult guests.",
    landmark: { label: "Service table", x: 79, y: 76 },
    drop: { x: 78, y: 72, size: 7 },
    fieldNotes: [
      fieldNote("Prepare", "Use a neutral vessel and clean handoff", "Choose odor-free glassware or carafes, rinse and store them hygienically, protect rims and interiors, and avoid cleaner, food, cloth, or refrigerator odors."),
      fieldNote("Observe", "Describe in a consistent sequence", "Note appearance, aroma, taste, texture, finish, temperature, and carbonation without turning a preference into a universal quality judgment."),
      fieldNote("Temperature", "Cold changes what the palate can find", "Chilling often increases refreshment and can mute aroma or taste intensity; compare temperatures when investigating subtle water character."),
      fieldNote("Mineral character", "Texture emerges from the whole chemistry", "Calcium, magnesium, bicarbonate, sulfate, chloride, sodium, dissolved gas, pH, temperature, and concentration interact; one ion cannot explain the entire impression."),
      fieldNote("Sparkling", "Carbon dioxide adds acidity and tactile lift", "Carbonation changes aroma release, bite, bubble texture, and perceived refreshment; compare gas level and serving temperature alongside the base water."),
      fieldNote("Food and beverage", "Water can reset or reshape perception", "Still or sparkling water, temperature, mineral profile, and volume can affect palate reset and pairing, but service should remain guest-led rather than prescriptive."),
      fieldNote("Safety boundary", "Normal sensory character is not clearance", "Unexpected odor, taste, color, or turbidity can justify investigation, yet many hazards have no reliable sensory warning; follow utility and health-authority guidance."),
      fieldNote("Explain", "Offer facts, not mythology", "When known, describe source, treatment, carbonation, package, and service conditions accurately; make refill and accessibility options clear and avoid unsupported health claims.")
    ],
    narration: [guide("Roma", "Water tasting is disciplined attention, not a purity contest. Control the glass and temperature, describe what is present, and keep sensory language on its side of the safety boundary.")]
  },
  {
    id: "water-shared-glass",
    title: "The Shared Glass",
    eyebrow: "Access, service, and stewardship",
    summary:
      "The final glass reconnects public health, hospitality, sensory care, equitable access, source protection, and responsible water use.",
    checkpoint: "Catchment to consumer",
    motion: "reassemble",
    art: "package-shared-glass",
    alt:
      "A welcoming SIP Academy table beside a public refill fountain and luminous canal, where a clear carafe and clean glasses connect through glowing routes to a watershed, treatment pavilion, beverage halls, neighborhood, and restored wetland.",
    landmark: { label: "Shared table", x: 56, y: 57 },
    drop: { x: 50, y: 50, size: 8 },
    fieldNotes: [
      fieldNote("Appearance", "Clear is desirable but not proof", "Observe clarity and presentation, while remembering that many microbial and chemical hazards cannot be seen."),
      fieldNote("Aroma and taste", "Sensory change can trigger investigation", "Unexpected odor or flavor deserves attention, but sensory normality does not replace monitoring or public-health guidance."),
      fieldNote("Temperature", "Service temperature changes perception", "Cooler water can mute some aromas and feel more refreshing, while very cold service may hide subtle mineral or treatment character."),
      fieldNote("Glassware", "A clean vessel protects the handoff", "Use clean, odor-free glassware or carafes, avoid cross-contact from cleaners or foods, and refresh standing water appropriately."),
      fieldNote("Access", "Safe water is a public-health foundation", "Reliable access depends on protected sources, infrastructure, skilled operators, affordable service, surveillance, maintenance, and emergency resilience."),
      fieldNote("Stewardship", "Protect the source before it becomes a treatment problem", "Watershed protection, pollution prevention, efficient use, leakage control, and responsible return flows reduce pressure across the system."),
      fieldNote("Hospitality", "Offer water clearly and without pressure", "Explain source or treatment accurately when known, provide reasonable refill options, respect guest needs, and never invent purity or health claims."),
      fieldNote("Return", "Every pour remains inside the larger cycle", "The glass is not the end: use, wastewater handling, treatment, recharge, evaporation, and renewed stewardship reconnect the drop to the world.")
    ],
    narration: [
      guide("Sippy", "The final glass contains no single heroic machine. It contains a protected source, many barriers, careful records, maintained infrastructure, and a human promise."),
      guide("Roma", "Taste attentively, describe humbly, and leave safety claims to evidence."),
      guide("Hummin", "Catchment to consumer is complete. The next responsible action returns us to the source.")
    ]
  }
];

const sceneCount = waterSceneSeeds.length;

const waterScenes: BeyondTheGlassScene[] = waterSceneSeeds.map((seed, index) => {
  const { art, alt, ...scene } = seed;
  return {
    ...scene,
    number: String(index + 1).padStart(2, "0"),
    range: [index / sceneCount, (index + 1) / sceneCount] as const,
    artwork: waterArtwork(art, alt)
  };
});

export const waterFieldTrip: BeyondTheGlassChapter = {
  slug: "water",
  title: "Beyond The Glass",
  chapterTitle: "Water · From Cloud to Glass",
  subject: "Water field trip",
  description:
    "A visual SIP Academy water adventure following the hydrologic cycle, source protection and resilience, groundwater, conventional and advanced treatment, chemistry, safety planning, distribution and premise plumbing, beverage operations, packaging, equitable access, circular stewardship, and sensory service.",
  coreMessage:
    "Every glass of water contains a connected system: climate, landscape, geology, treatment, infrastructure, measurements, people, stewardship, and public trust.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/water/water-academy-960.webp"
  },
  scenes: waterScenes,
  sources: [
    {
      id: "usgs-water-science-school",
      organization: "U.S. Geological Survey",
      title: "Water Science School",
      url: "https://www.usgs.gov/water-science-school",
      note:
        "Primary earth-science reference for the water cycle, surface water, groundwater, water properties, water quality, and water use."
    },
    {
      id: "usgs-groundwater-flow",
      organization: "U.S. Geological Survey",
      title: "Groundwater Flow and the Water Cycle",
      url: "https://www.usgs.gov/water-science-school/science/groundwater-flow-and-water-cycle",
      note:
        "Supports the aquifer, water-table, porosity, permeability, recharge, and variable groundwater travel-time framing."
    },
    {
      id: "usgs-alkalinity",
      organization: "U.S. Geological Survey",
      title: "Alkalinity and Water",
      url: "https://www.usgs.gov/water-science-school/science/alkalinity-and-water",
      note:
        "Supports the distinction between alkalinity, pH, bicarbonate/carbonate buffering, and laboratory titration."
    },
    {
      id: "epa-source-water-protection",
      organization: "U.S. Environmental Protection Agency",
      title: "Basic Information about Source Water Protection",
      url: "https://www.epa.gov/sourcewaterprotection/basic-information-about-source-water-protection",
      note:
        "Supports the multi-barrier approach, source types, source protection, risk prevention, and watershed stewardship."
    },
    {
      id: "cdc-treatment-works",
      organization: "U.S. Centers for Disease Control and Prevention",
      title: "How Water Treatment Works",
      url: "https://www.cdc.gov/drinking-water/about/how-water-treatment-works.html",
      note:
        "Supports the conventional treatment sequence and careful statement that utilities use different steps according to source-water quality."
    },
    {
      id: "epa-surface-water-rules",
      organization: "U.S. Environmental Protection Agency",
      title: "Surface Water Treatment Rules",
      url: "https://www.epa.gov/dwreginfo/surface-water-treatment-rules",
      note:
        "Supports U.S. surface-water filtration/disinfection and microbial-risk framing; details remain jurisdiction-specific."
    },
    {
      id: "epa-distribution-systems",
      organization: "U.S. Environmental Protection Agency",
      title: "Drinking Water Distribution System Tools and Resources",
      url: "https://www.epa.gov/dwreginfo/drinking-water-distribution-system-tools-and-resources",
      note:
        "Supports the pipes, storage, pumps, valves, pressure, corrosion, contamination-risk, and final-barrier framing."
    },
    {
      id: "who-drinking-water-guidelines",
      organization: "World Health Organization",
      title: "Guidelines for Drinking-water Quality",
      url: "https://www.who.int/publications/i/item/9789240121225",
      note:
        "Global public-health foundation for health-based targets, catchment-to-consumer water safety plans, operational monitoring, verification, and surveillance."
    },
    {
      id: "epa-cyanotoxins",
      organization: "U.S. Environmental Protection Agency",
      title: "Managing Algal Toxins in Drinking Water",
      url: "https://www.epa.gov/habs/managing-algal-toxins-drinking-water",
      note:
        "Supports the reservoir-bloom distinction between intact cells and dissolved toxins, proactive planning, monitoring, treatment, and risk communication."
    },
    {
      id: "epa-treatability-database",
      organization: "U.S. Environmental Protection Agency",
      title: "Drinking Water Treatability Database",
      url: "https://tdb.epa.gov/tdb/home",
      note:
        "Primary technical index for contaminant-specific treatment evidence, including activated carbon, ion exchange, membranes, air stripping, and oxidation processes."
    },
    {
      id: "epa-lead-copper-rule",
      organization: "U.S. Environmental Protection Agency",
      title: "Lead and Copper Rule",
      url: "https://www.epa.gov/dwreginfo/lead-and-copper-rule",
      note:
        "Supports U.S. tap monitoring, corrosion-control treatment, plumbing-material interactions, and the careful treatment of lead and copper as final-mile concerns."
    },
    {
      id: "who-water-safety-plan",
      organization: "World Health Organization",
      title: "Water Safety Plan Manual, Second Edition",
      url: "https://www.who.int/publications/i/item/9789240067691",
      note:
        "Supports the catchment-to-consumer system map, hazard assessment, operational monitoring, corrective action, verification, climate resilience, equity, and continuous improvement."
    },
    {
      id: "epa-consumer-confidence-reports",
      organization: "U.S. Environmental Protection Agency",
      title: "Consumer Confidence Reports",
      url: "https://www.epa.gov/ccr",
      note:
        "Supports accurate U.S. public communication about source water, detected contaminants, standards, violations, corrective actions, and local contact information."
    },
    {
      id: "epa-potable-reuse",
      organization: "U.S. Environmental Protection Agency",
      title: "Potable Water Reuse and Drinking Water",
      url: "https://www.epa.gov/ground-water-and-drinking-water/potable-water-reuse-and-drinking-water",
      note:
        "Supports indirect and direct potable-reuse definitions and the need for public-health, regulatory, treatment, monitoring, and jurisdiction-specific frameworks."
    },
    {
      id: "who-jmp-access",
      organization: "World Health Organization and UNICEF Joint Monitoring Programme",
      title: "Water Supply, Sanitation and Hygiene Monitoring",
      url: "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/monitoring-and-evidence/wash-monitoring",
      note:
        "Supports the safely managed drinking-water service definition: improved source on premises, available when needed, and free from contamination."
    },
    {
      id: "ttb-water-proofing",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Distilled Spirits Proofing Tutorial",
      url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/distilled-spirits/proofing-tutorial",
      note:
        "Primary U.S. reference for beverage-alcohol proof measurement and the controlled role of water, temperature, hydrometers, and gauging in distilled-spirits operations."
    },
    {
      id: "brewers-association-water",
      organization: "Brewers Association",
      title: "Sustainability Manuals: Water and Wastewater",
      url: "https://www.brewersassociation.org/playlist/sustainability-manuals/",
      note:
        "Industry-authoritative reference for brewery water use, wastewater, conservation, efficiency, process boundaries, and treatment considerations."
    },
    {
      id: "fda-bottled-water",
      organization: "U.S. Food and Drug Administration",
      title: "Bottled Water Everywhere: Keeping it Safe",
      url: "https://www.fda.gov/consumers/consumer-updates/bottled-water-everywhere-keeping-it-safe",
      note:
        "Supports U.S. bottled-water identity, source, processing, sanitary production, quality, labeling, and EPA/FDA regulatory distinctions."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
