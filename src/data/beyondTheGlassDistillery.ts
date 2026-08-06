import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const distilleryArtwork = (
  slug: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/distillery/${slug}-1600.webp`,
  srcSet:
    `/beyond-the-glass/distillery/${slug}-960.webp 960w, ` +
    `/beyond-the-glass/distillery/${slug}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/distillery/${slug}-portrait-960.webp`,
  portraitSrcSet:
    `/beyond-the-glass/distillery/${slug}-portrait-640.webp 640w, ` +
    `/beyond-the-glass/distillery/${slug}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  position: "center",
  portraitPosition: "center",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

const distilleryScenes: BeyondTheGlassScene[] = [
  {
    id: "distillery-gate",
    number: "01",
    title: "The Distillery Gate",
    range: [0, 0.0625],
    eyebrow: "SIP Academy · Distillery",
    summary:
      "The Academy stillhouse opens as a map of ingredients, fermentation, separation, maturation, identity, and service.",
    checkpoint: "Academy to stillhouse",
    motion: "establish",
    artwork: distilleryArtwork(
      "distillery-gate",
      "Sippy, Roma, and Hummin enter the SIP Academy distillery wing, where grain, fruit, cane, agave, botanicals, copper pot stills, columns, barrels, and a tasting library connect around luminous blue canals."
    ),
    landmark: { label: "Distillery gate", x: 50, y: 47 },
    drop: { x: 53, y: 58, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Foundation",
        title: "Fermentation comes before distillation",
        detail:
          "Yeast first converts fermentable sugars into a lower-alcohol liquid. Distillation then separates and concentrates selected volatile components."
      },
      {
        eyebrow: "Identity",
        title: "The legal name changes the route",
        detail:
          "Whisky, rum, brandy, gin, agave spirits, and vodka follow different standards for raw material, process, maturation, and labeling."
      },
      {
        eyebrow: "Equipment",
        title: "Pot and column stills solve different problems",
        detail:
          "Batch pot stills and continuous columns organize vapor and liquid differently; neither design guarantees quality or one fixed flavor style."
      },
      {
        eyebrow: "Time",
        title: "Not every spirit belongs in wood",
        detail:
          "Some categories require oak maturation, some permit it, and others are commonly bottled without it. Category rules always come first."
      },
      {
        eyebrow: "Guest",
        title: "The final pour carries the whole system",
        detail:
          "Proof, package, storage, measure, dilution, glassware, and responsible hospitality shape the last handoff."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Welcome to the distillery wing. We will follow the system without pretending every spirit takes the same road."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "I will chase the sensory clues: grain, fruit, cane, agave, botanicals, copper, oak, and time."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "I will guard the boundaries: category, origin, equipment, proof, records, label, and responsible service."
      }
    ]
  },
  {
    id: "distillery-material-crossroads",
    number: "02",
    title: "Raw Material Crossroads",
    range: [0.0625, 0.125],
    eyebrow: "Category paths",
    summary:
      "A six-way ingredient atlas shows why grain, fruit, cane, agave, neutral spirit, and botanicals cannot be taught as one recipe.",
    checkpoint: "Source to category",
    motion: "glide",
    artwork: distilleryArtwork(
      "distillery-gate",
      "An illustrated SIP Academy ingredient crossroads with grain fields, an orchard, sugar cane, blue agave, a neutral-spirit laboratory, and a botanical greenhouse feeding distinct paths toward the stillhouse."
    ),
    landmark: { label: "Ingredient crossroads", x: 49, y: 52 },
    drop: { x: 49, y: 52, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Grain",
        title: "Whisky begins with a fermented grain mash",
        detail:
          "The grain bill and the governing standard shape the category; bourbon, rye, malt whisky, and other types are not interchangeable names."
      },
      {
        eyebrow: "Fruit",
        title: "Brandy keeps fruit origin visible",
        detail:
          "Brandy is distilled from fermented fruit juice, mash, wine, or qualifying fruit residues, with specific names governed by source and place."
      },
      {
        eyebrow: "Cane",
        title: "Rum follows the sugar-cane family",
        detail:
          "Rum may begin with cane juice, syrup, molasses, or other cane by-products; those starting materials can create very different fermentation contexts."
      },
      {
        eyebrow: "Agave",
        title: "Tequila is a protected, place-bound path",
        detail:
          "Tequila must follow Mexican rules, authorized geography, and the blue Weber agave requirement; not every agave spirit is Tequila."
      },
      {
        eyebrow: "Botanicals",
        title: "Gin must lead with juniper",
        detail:
          "Gin can be produced through several authorized flavoring paths, but its main characteristic flavor must come from juniper."
      },
      {
        eyebrow: "Neutral spirit",
        title: "Vodka has its own standard",
        detail:
          "In the United States, vodka belongs to the neutral-spirits class. Flavor additions can move a product into another designation."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Choose the raw material and the map changes. The legal identity tells us which doors can open next."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "A ripe pear, malted barley, molasses, and cooked agave do not begin with the same aroma vocabulary."
      },
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "No universal recipe detected. I will mark each claim as common, optional, required, or category-specific."
      }
    ]
  },
  {
    id: "distillery-mill-mash",
    number: "03",
    title: "Unlocking Fermentable Sugar",
    range: [0.125, 0.1875],
    eyebrow: "Preparation",
    summary:
      "A layered cutaway follows size reduction, cooking or mashing, sugar release, separation choices, and the liquid prepared for yeast.",
    checkpoint: "Material to fermentable liquid",
    motion: "cutaway",
    artwork: distilleryArtwork(
      "distillery-fermentation",
      "A safe educational cutaway of the SIP Academy preparation hall, showing grain milling and mashing beside separate fruit, cane, and agave preparation paths, with no operational controls or recipe values."
    ),
    landmark: { label: "Preparation hall", x: 46, y: 48 },
    drop: { x: 60, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Mill",
        title: "Particle size changes access",
        detail:
          "Milling exposes grain structure for later conversion, but equipment and target grist differ by raw material and production system."
      },
      {
        eyebrow: "Conversion",
        title: "Starch must become fermentable sugar",
        detail:
          "In grain production, enzymes make starch-derived material available to yeast. The exact approach depends on grain and house practice."
      },
      {
        eyebrow: "Fruit and cane",
        title: "Sugar may already be available",
        detail:
          "Fruit juice, cane juice, syrup, and molasses begin with different sugar, acid, nutrient, and solids profiles than grain mash."
      },
      {
        eyebrow: "Agave",
        title: "The plant requires its own preparation story",
        detail:
          "Tequila production begins with mature blue Weber agave harvested in authorized areas and processed under Mexican standards."
      },
      {
        eyebrow: "Solids",
        title: "Clear and solids-rich ferments are both possible",
        detail:
          "Some systems separate liquid before fermentation while others retain more solids; the choice affects handling and the next equipment path."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "This room is about access. The producer prepares the raw material so yeast can reach fermentable sugar."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Preparation already changes the clues: cereal, fruit skin, cane richness, roasted agave, and the texture of solids."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "I am separating concepts, not issuing a recipe. Equipment, timing, and conditions remain producer-controlled."
      }
    ]
  },
  {
    id: "distillery-fermentation",
    number: "04",
    title: "The Fermentation Hall",
    range: [0.1875, 0.25],
    eyebrow: "Microbiology",
    summary:
      "Yeast transforms prepared liquid into wash, beer, wine, or another category-specific fermented base ready for legal production.",
    checkpoint: "Sugar to fermented base",
    motion: "orbit",
    artwork: distilleryArtwork(
      "distillery-fermentation",
      "An orbit-ready SIP Academy fermentation hall with open and closed vessels, active yeast imagery, cooling jackets, a quality bench, and distinct grain, fruit, cane, and agave streams."
    ),
    landmark: { label: "Fermentation hall", x: 54, y: 45 },
    drop: { x: 39, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Yeast",
        title: "Fermentation creates alcohol and aroma precursors",
        detail:
          "Yeast converts fermentable sugars into ethanol and carbon dioxide while producing metabolites that can influence the eventual spirit."
      },
      {
        eyebrow: "Vessel",
        title: "Open and closed systems manage exposure differently",
        detail:
          "Vessel material, geometry, cleaning, cooling, and openness form part of a producer's fermentation environment."
      },
      {
        eyebrow: "Temperature",
        title: "Heat is a living-system variable",
        detail:
          "Fermentation produces heat. Producers monitor the process to protect yeast performance and the intended sensory direction."
      },
      {
        eyebrow: "Microbes",
        title: "House character can include more than one organism",
        detail:
          "Some traditions encourage a broader microbial ecology; others prioritize controlled inoculation and consistency. This is not universal."
      },
      {
        eyebrow: "Handoff",
        title: "Distillation starts with the fermented base it receives",
        detail:
          "Raw material, nutrients, yeast, solids, acidity, time, and sanitation have already shaped the liquid entering the stillhouse."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Distillation does not invent the story from nothing. Fermentation hands it a living library of compounds."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "This is where fruit, floral, cereal, earthy, and sulfur clues may begin to appear, shift, or disappear."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Monitoring is the lesson: yeast health, heat, acidity, time, hygiene, and a documented handoff to distillation."
      }
    ]
  },
  {
    id: "distillery-stillhouse-crossroads",
    number: "05",
    title: "Pot or Column?",
    range: [0.25, 0.3125],
    eyebrow: "Separation systems",
    summary:
      "The fermented stream reaches two architectures: the episodic chamber of a pot still and the continuous staged separation of a column.",
    checkpoint: "Fermenter to still",
    motion: "establish",
    artwork: distilleryArtwork(
      "stillhouse-crossroads",
      "A grand SIP Academy stillhouse split between a copper pot-still train and a tall continuous column, connected by a luminous diagram of liquid, vapor, condensation, and collection."
    ),
    landmark: { label: "Stillhouse crossroads", x: 50, y: 48 },
    drop: { x: 50, y: 58, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Pot still",
        title: "A batch moves through a defined run",
        detail:
          "A pot still receives a batch, creates vapor, condenses it, and then prepares for another run; still shape and operating choices influence separation."
      },
      {
        eyebrow: "Column still",
        title: "Repeated stages can operate continuously",
        detail:
          "A column arranges many vapor-liquid contacts through plates or packing, allowing a steady feed and collection under controlled conditions."
      },
      {
        eyebrow: "Hybrid",
        title: "Real stillhouses can combine systems",
        detail:
          "Pot, column, retort, and hybrid configurations vary by tradition and producer. The two diagrams are learning anchors, not a complete catalog."
      },
      {
        eyebrow: "Proof",
        title: "More separation can mean a lighter profile",
        detail:
          "Higher rectification generally carries fewer congeners into the distillate, but style depends on the complete system rather than proof alone."
      },
      {
        eyebrow: "Law",
        title: "Category rules can constrain the equipment path",
        detail:
          "Protected names and standards may define raw materials, distillation limits, location, still type, or maturation. Always check the governing specification."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Two great architectures stand before us. We will walk each one before comparing what it can preserve or separate."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Do not call one flavorful and the other flavorless. The sensory result belongs to the whole design."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "System labels active: batch, continuous, stage count, reflux, copper contact, collection, and legal limit."
      }
    ]
  },
  {
    id: "distillery-pot-still",
    number: "06",
    title: "Inside the Pot Still",
    range: [0.3125, 0.375],
    eyebrow: "Equipment atlas",
    summary:
      "A rotating cutaway separates the pot, neck, head, lyne arm, condenser, and receiver without turning the scene into an operating guide.",
    checkpoint: "Batch anatomy",
    motion: "orbit",
    artwork: distilleryArtwork(
      "stillhouse-crossroads",
      "A deconstructed copper pot still in the SIP Academy equipment gallery, with pot, swan neck, head, lyne arm, condenser, and receiver separated into an accessible field atlas."
    ),
    landmark: { label: "Pot still", x: 46, y: 48 },
    drop: { x: 63, y: 55, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Pot",
        title: "The charge is heated as a batch",
        detail:
          "The vessel holds the fermented liquid for one run. Heating method, fill, shape, and house procedure belong to trained, licensed production."
      },
      {
        eyebrow: "Head and neck",
        title: "Geometry changes vapor travel",
        detail:
          "Height, shape, and internal surfaces influence how readily vapor continues forward or condenses and returns."
      },
      {
        eyebrow: "Lyne arm",
        title: "The vapor path has direction",
        detail:
          "The arm carries vapor toward condensation; its geometry participates in the system's reflux and flow behavior."
      },
      {
        eyebrow: "Condenser",
        title: "Vapor returns to liquid",
        detail:
          "Cooling removes energy from the vapor so the selected stream can be collected as liquid distillate."
      },
      {
        eyebrow: "Receiver",
        title: "Collection preserves identity and records",
        detail:
          "Separated streams move into controlled receiving and measurement systems before further distillation, maturation, blending, or lawful disposition."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Walk the vapor path: pot, head, neck, arm, condenser, receiver. Each shape belongs to one connected machine."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "The still is not a flavor stamp. It is a selective stage where some aromatic families travel more readily than others."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "This atlas explains anatomy only. Safe operation belongs to trained professionals in permitted facilities."
      }
    ]
  },
  {
    id: "distillery-column-still",
    number: "07",
    title: "Inside the Column Still",
    range: [0.375, 0.4375],
    eyebrow: "Equipment atlas",
    summary:
      "The column opens into staged contacts, feed, heat, reflux, draw points, and condensation in one continuous vertical system.",
    checkpoint: "Continuous anatomy",
    motion: "cutaway",
    artwork: distilleryArtwork(
      "stillhouse-crossroads",
      "A full-height cutaway of a SIP Academy continuous column still, showing a safe conceptual view of feed, staged plates, vapor rise, liquid descent, reflux, condenser, and collection points."
    ),
    landmark: { label: "Column still", x: 50, y: 47 },
    drop: { x: 50, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Feed",
        title: "Fermented liquid enters a moving system",
        detail:
          "Unlike a single pot batch, a continuous column can accept feed while separated streams leave under steady controlled operation."
      },
      {
        eyebrow: "Stages",
        title: "Plates create repeated vapor-liquid contact",
        detail:
          "Each stage supports another separation step, building rectification through the height of the column."
      },
      {
        eyebrow: "Vapor and liquid",
        title: "Two flows move in opposing directions",
        detail:
          "Vapor generally rises while liquid descends, exchanging energy and volatile components across the column."
      },
      {
        eyebrow: "Reflux",
        title: "Returned condensate sharpens separation",
        detail:
          "Part of a condensed stream can be returned to the system, increasing repeated contact and changing the separation profile."
      },
      {
        eyebrow: "Draw points",
        title: "Different streams leave at designed locations",
        detail:
          "A column can collect streams from distinct points, but configuration and lawful use vary widely among spirit categories."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The column turns one tall shell into many connected separation stages. Follow the two flows through the tower."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "A cleaner profile can still carry identity. Raw material, fermentation, settings, and collection choices remain part of the story."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Continuous does not mean simple. Feed, stages, reflux, draw points, heat balance, and records all remain connected."
      }
    ]
  },
  {
    id: "distillery-vapor-path",
    number: "08",
    title: "Copper, Reflux, Condensation",
    range: [0.4375, 0.5],
    eyebrow: "Physical chemistry",
    summary:
      "A luminous vapor ribbon circles the still, showing how heat, volatility, copper contact, reflux, and cooling interact.",
    checkpoint: "Liquid to vapor to liquid",
    motion: "rotate",
    artwork: distilleryArtwork(
      "stillhouse-crossroads",
      "A cinematic SIP Academy vapor-path study with copper surfaces, rising vapor, returning reflux droplets, a condenser coil, and aromatic compound constellations shown without operational values."
    ),
    landmark: { label: "Vapor path", x: 52, y: 45 },
    drop: { x: 66, y: 57, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Volatility",
        title: "Compounds do not travel identically",
        detail:
          "A distillation system separates through differences in vapor-liquid behavior, but the result is a complex mixture rather than one compound at a time."
      },
      {
        eyebrow: "Copper",
        title: "Contact can influence sulfur chemistry",
        detail:
          "Copper surfaces participate in reactions involving sulfur compounds and can materially affect new-spirit aroma. Contact varies by still design."
      },
      {
        eyebrow: "Reflux",
        title: "Some vapor condenses and returns",
        detail:
          "Returned liquid undergoes more vapor-liquid contact, which can change rectification and the congeners carried onward."
      },
      {
        eyebrow: "Condenser",
        title: "Cooling completes the phase change",
        detail:
          "The condenser turns vapor back into liquid. Condenser design and material form part of the total production system."
      },
      {
        eyebrow: "Congeners",
        title: "Flavor lives in a family of compounds",
        detail:
          "Alcohols, esters, acids, aldehydes, sulfur compounds, and other volatiles can contribute positively or negatively depending on identity and concentration."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Watch the same liquid change state twice. The route from liquid to vapor and back creates the separation."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "I am following families, not single magic molecules: fruit, solvent, grain, sulfur, floral, oily, and earthy clues."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Copper, geometry, reflux, cooling, and collection are interacting variables, not isolated quality scores."
      }
    ]
  },
  {
    id: "distillery-fractions",
    number: "09",
    title: "The Sensory Cut",
    range: [0.5, 0.5625],
    eyebrow: "Collection decisions",
    summary:
      "Three conceptual streams separate and rejoin around a protected center, teaching heads, hearts, and tails without operational cut instructions.",
    checkpoint: "Run to selected spirit",
    motion: "reassemble",
    artwork: distilleryArtwork(
      "stillhouse-crossroads",
      "An abstract SIP Academy spirit-safe display where three labeled conceptual streams orbit a protected central receiver, illustrating heads, hearts, and tails without temperatures, timings, or do-it-yourself controls."
    ),
    landmark: { label: "Spirit safe", x: 50, y: 49 },
    drop: { x: 50, y: 49, size: 9 },
    fieldNotes: [
      {
        eyebrow: "Early stream",
        title: "Heads is a broad production term",
        detail:
          "Producers use sensory, analytical, equipment, legal, and house criteria to manage earlier-running components. The boundary is not universal."
      },
      {
        eyebrow: "Center stream",
        title: "Hearts names the selected core",
        detail:
          "The heart is the portion selected for the intended spirit, but its composition and size depend on category, still, and house style."
      },
      {
        eyebrow: "Later stream",
        title: "Tails carries a changing composition",
        detail:
          "Later-running spirit can show heavier, earthy, oily, or cereal-associated character. Management differs by process."
      },
      {
        eyebrow: "Reuse",
        title: "Some streams may return within controlled production",
        detail:
          "A distillery may recycle or redistill qualifying fractions according to its system, permits, records, and category rules."
      },
      {
        eyebrow: "Safety",
        title: "This is professional judgment, not a home guide",
        detail:
          "Distillation involves fire, pressure, concentrated alcohol vapor, legal controls, and analytical decisions. This atlas intentionally omits operating instructions."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Heads, hearts, and tails are a map of changing composition, not three universal clock times."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "The distiller listens with trained senses and instruments, selecting a house profile rather than chasing a single perfect cut."
      },
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Operational values are sealed. The safe lesson is variation, professional control, lawful records, and sensory consequence."
      }
    ]
  },
  {
    id: "distillery-protected-paths",
    number: "10",
    title: "Six Protected Paths",
    range: [0.5625, 0.625],
    eyebrow: "Category field atlas",
    summary:
      "A map of whisky, rum, brandy, gin, agave spirits, and vodka reveals where geography and law redirect the production journey.",
    checkpoint: "Spirit to identity",
    motion: "glide",
    artwork: distilleryArtwork(
      "distillery-gate",
      "A six-branch SIP Academy identity map with distinct original landscapes and vessels for whisky, rum, brandy, gin, agave spirits, and vodka, each linked to a legal reference archive."
    ),
    landmark: { label: "Identity archive", x: 50, y: 50 },
    drop: { x: 50, y: 50, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Whisky",
        title: "Grain, proof, wood, place, and time define types",
        detail:
          "Bourbon, Scotch, Irish whiskey, American single malt, and other whisky names carry distinct legal conditions. Do not transfer one rule to another."
      },
      {
        eyebrow: "Rum",
        title: "Cane is the common family, not one fixed style",
        detail:
          "Cane juice, syrup, molasses, still design, maturation, and regional law create divergent rum traditions."
      },
      {
        eyebrow: "Brandy",
        title: "Fruit and place can both control the name",
        detail:
          "Grape brandy, fruit brandy, pomace spirit, Cognac, Calvados, and Pisco illustrate why source and geographic rules matter."
      },
      {
        eyebrow: "Gin",
        title: "Juniper leads, methods branch",
        detail:
          "Original distillation, redistillation, mixing, extracts, and optional maturation can sit under different gin designations and local rules."
      },
      {
        eyebrow: "Agave spirits",
        title: "Agave is a genus; Tequila is a protected identity",
        detail:
          "Tequila and Mezcal are distinctive products of Mexico with their own governing rules; the broader agave-spirit class is not a shortcut around them."
      },
      {
        eyebrow: "Vodka",
        title: "Neutral-spirit rules shape the clean canvas",
        detail:
          "U.S. vodka is defined within neutral spirits; treatment, flavoring, and storage claims must remain consistent with its legal designation."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "This archive protects names from becoming vague style words. Place and law are part of the production story."
      },
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Compare the clues without ranking them: malt and smoke, cane and ester, fruit and oak, juniper and citrus, agave and earth."
      },
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Before making a claim, retrieve the current standard for that category and market. Labels are evidence, not decoration."
      }
    ]
  },
  {
    id: "distillery-botanical-cabinet",
    number: "11",
    title: "The Botanical Cabinet",
    range: [0.625, 0.6875],
    eyebrow: "Gin detour",
    summary:
      "Roma opens an optional gin cabinet where juniper, supporting botanicals, extraction paths, balance, and labeling become sensory evidence.",
    checkpoint: "Neutral base to botanical identity",
    motion: "orbit",
    artwork: distilleryArtwork(
      "distillery-assembly",
      "Roma explores a magical SIP Academy botanical cabinet with juniper, citrus peel, coriander seed, roots, flowers, a botanical basket, and a small redistillation still arranged as a non-operational sensory atlas."
    ),
    landmark: { label: "Botanical cabinet", x: 48, y: 47 },
    drop: { x: 64, y: 54, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Juniper",
        title: "The defining aroma must lead",
        detail:
          "Under the U.S. standard, gin derives its main characteristic flavor from juniper berries even when many other botanicals support it."
      },
      {
        eyebrow: "Citrus",
        title: "Peel can lift the top notes",
        detail:
          "Citrus materials may contribute bright aromatic compounds, but variety, preparation, extraction, and blend context all matter."
      },
      {
        eyebrow: "Seeds and roots",
        title: "Structure can feel dry, spicy, earthy, or floral",
        detail:
          "Coriander, angelica, orris, and other botanicals are examples, not mandatory ingredients or a universal formula."
      },
      {
        eyebrow: "Method",
        title: "Maceration, vapor contact, extracts, and mixing differ",
        detail:
          "Authorized methods and designation language vary. The production claim must match what was actually done."
      },
      {
        eyebrow: "Balance",
        title: "More botanicals does not mean more clarity",
        detail:
          "A coherent gin keeps juniper legible while supporting aromas unfold across neat nosing, dilution, and mixed service."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "This is a category detour, not the universal distillery route. Gin begins where juniper becomes identity."
      },
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "My evidence board starts with juniper, then asks what citrus, seed, root, flower, and spice are doing around it."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Method and label must agree. I am checking distilled, mixed, flavored, aged, and specialty claims separately."
      }
    ]
  },
  {
    id: "distillery-cooperage",
    number: "12",
    title: "A Barrel Becomes a Vessel",
    range: [0.6875, 0.75],
    eyebrow: "Cooperage",
    summary:
      "An exploded barrel rotates through stave, grain, head, hoop, bung, toast, char, size, origin, and previous use.",
    checkpoint: "Wood to vessel",
    motion: "rotate",
    artwork: distilleryArtwork(
      "cooperage-warehouse",
      "A deconstructed oak barrel in the SIP Academy cooperage with staves, heads, hoops, bung, wood grain, toasted interior, char layer, and previous-cask identity shown as selectable parts."
    ),
    landmark: { label: "Cooperage", x: 52, y: 49 },
    drop: { x: 52, y: 55, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Staves",
        title: "Wood structure controls the vessel",
        detail:
          "Species, grain, seasoning, stave thickness, and construction influence extraction and oxygen movement, but no single factor predicts flavor alone."
      },
      {
        eyebrow: "Toast and char",
        title: "Heat transforms the inner surface",
        detail:
          "Toasting and charring create different thermal layers and extractable compounds. Category and producer practice determine what is permitted."
      },
      {
        eyebrow: "New or used",
        title: "Previous use changes the starting point",
        detail:
          "New oak, refill casks, and qualifying wine, beer, or spirit casks offer different extractive histories and legal implications."
      },
      {
        eyebrow: "Size",
        title: "Surface relationship changes with vessel scale",
        detail:
          "Smaller and larger vessels create different wood-to-liquid relationships, but climate, time, entry strength, and refill history also matter."
      },
      {
        eyebrow: "Seal",
        title: "Hoops, heads, and bung make a working package",
        detail:
          "The cooper shapes and joins wood so the vessel can hold spirit while allowing the controlled exchanges associated with maturation."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "A barrel is architecture: staves, heads, hoops, bung, grain, heat treatment, size, origin, and history."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Vanilla, spice, caramel, smoke, coconut, fruit, and tannin are possibilities, never promises from one label word."
      },
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "I am recording cask identity, fill date, spirit identity, warehouse location, repairs, samples, and every lawful transfer."
      }
    ]
  },
  {
    id: "distillery-warehouse",
    number: "13",
    title: "The Warehouse Clock",
    range: [0.75, 0.8125],
    eyebrow: "Maturation",
    summary:
      "The camera orbits ricks, dunnage, pallets, climate zones, casks, samples, losses, and the changing conversation between spirit, wood, and air.",
    checkpoint: "New spirit to matured component",
    motion: "orbit",
    artwork: distilleryArtwork(
      "cooperage-warehouse",
      "A wide SIP Academy maturation warehouse with dunnage-style casks, tall ricks, palletized barrels, climate gradients, sampling records, and barrels highlighted across different positions."
    ),
    landmark: { label: "Maturation warehouse", x: 51, y: 48 },
    drop: { x: 64, y: 62, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Climate",
        title: "Temperature and humidity shape the exchange",
        detail:
          "Warehouse climate influences extraction, reactions, evaporation, and proof movement; outcomes differ dramatically by region and building."
      },
      {
        eyebrow: "Position",
        title: "A barrel's address can matter",
        detail:
          "Airflow, height, wall exposure, floor type, and local temperature patterns can create variation within one warehouse."
      },
      {
        eyebrow: "Oxygen and time",
        title: "Maturation is extraction plus reaction",
        detail:
          "Wood compounds, oxygen ingress, concentration, evaporation, and chemical reactions interact; aging is not simply adding oak flavor."
      },
      {
        eyebrow: "Sampling",
        title: "The calendar does not replace sensory review",
        detail:
          "Teams compare aroma, flavor, structure, proof, color where relevant, and cask condition while maintaining traceable records."
      },
      {
        eyebrow: "Category",
        title: "Time and vessel rules are not portable",
        detail:
          "Bourbon, Scotch, Irish whiskey, Tequila age classes, brandy, rum, gin, and vodka do not share one maturation requirement."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Time is only one axis. Wood, climate, warehouse, position, spirit, proof, and repeated assessment move with it."
      },
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Two neighboring casks can rhyme without matching. I am tasting for family resemblance and useful difference."
      },
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Every cask remains an identified component with a history, not an anonymous barrel in a beautiful room."
      }
    ]
  },
  {
    id: "distillery-assembly",
    number: "14",
    title: "The Assembly Room",
    range: [0.8125, 0.875],
    eyebrow: "Blending and finishing",
    summary:
      "Matured and unaged components move through a category-aware atlas of blending, proof adjustment, resting, filtration, color, and final quality review.",
    checkpoint: "Components to final liquid",
    motion: "reassemble",
    artwork: distilleryArtwork(
      "distillery-assembly",
      "A SIP Academy spirit assembly room with component samples, blending vessels, water treatment, proof measurement, filtration options, color-reference cards, and a final quality bench in separate safe zones."
    ),
    landmark: { label: "Assembly room", x: 50, y: 47 },
    drop: { x: 50, y: 60, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Blend",
        title: "Components can build consistency or complexity",
        detail:
          "Blending may combine casks, ages, distillates, or permitted spirit types. The product designation must truthfully describe the result."
      },
      {
        eyebrow: "Proofing",
        title: "Water can adjust alcoholic strength",
        detail:
          "Proof reduction is a controlled production and gauging step. Water quality, integration time, temperature, and measurement all matter."
      },
      {
        eyebrow: "Filtration",
        title: "Clarity choices can change presentation",
        detail:
          "Filtration may address particles or haze, but methods and intensity vary; claims about flavor impact require product-specific evidence."
      },
      {
        eyebrow: "Color",
        title: "Color permission depends on category",
        detail:
          "Some spirits may use permitted caramel or other materials with required disclosures, while categories such as bourbon prohibit added coloring."
      },
      {
        eyebrow: "QA",
        title: "Final approval joins sensory, analytical, and legal checks",
        detail:
          "The finished batch is reviewed for identity, proof, appearance, aroma, taste, stability, records, and label compatibility before packaging."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The assembly room turns individual components into one truthful finished identity. Every addition must have a reason and permission."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Blending is composition. I am looking for continuity, contrast, texture, finish, and a clear house voice."
      },
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Proof, volume, formula status, treatment, color, age, origin, and batch records must reconcile before release."
      }
    ]
  },
  {
    id: "distillery-bottle-passport",
    number: "15",
    title: "The Bottle Passport",
    range: [0.875, 0.9375],
    eyebrow: "Packaging and traceability",
    summary:
      "The bottling line turns final liquid into a traceable package carrying identity, alcohol content, origin, age, disclosures, lot history, and destination.",
    checkpoint: "Tank to market",
    motion: "glide",
    artwork: distilleryArtwork(
      "distillery-assembly",
      "A wide SIP Academy bottling and logistics hall with rinsing, filling, closure, label inspection, case packing, lot-code scanning, warehouse pallets, and distribution routes."
    ),
    landmark: { label: "Bottling line", x: 51, y: 49 },
    drop: { x: 67, y: 58, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Fill and closure",
        title: "Package integrity protects the batch",
        detail:
          "Clean containers, accurate fill, sound closures, and inspection protect identity and reduce leakage, contamination, and presentation failures."
      },
      {
        eyebrow: "Label",
        title: "Brand, class or type, and alcohol content anchor identity",
        detail:
          "U.S. distilled-spirit labels carry mandatory information, with added statements required when age, origin, color, treatment, or other conditions apply."
      },
      {
        eyebrow: "Lot trail",
        title: "The bottle must point backward",
        detail:
          "Batch, tank, package, and case records help connect a finished bottle to the spirits, operations, and approvals behind it."
      },
      {
        eyebrow: "Warehouse",
        title: "Finished goods still need controlled custody",
        detail:
          "Inventory, breakage, security, storage, tax status, and lawful removal remain part of the production system after bottling."
      },
      {
        eyebrow: "Distribution",
        title: "The bottle crosses regulated handoffs",
        detail:
          "Importer, wholesaler, retailer, and direct-shipping rules vary by jurisdiction; a label approval is not permission for every sales route."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "A bottle is a passport. It carries the spirit's identity from the production record into the marketplace."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "The guest sees glass and paper. I see proof, fill, closure, age, origin, category, and a promise of what is inside."
      },
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Trace backward: lot, case, bottling tank, components, casks or source spirits, gauges, and lawful records."
      }
    ]
  },
  {
    id: "distillery-final-service",
    number: "16",
    title: "From Warehouse to Glass",
    range: [0.9375, 1],
    eyebrow: "Sensory and responsible service",
    summary:
      "The journey ends with retail context, a measured pour, optional dilution, sensory comparison, cocktail use, and hospitality that keeps the guest in control.",
    checkpoint: "Spirit to guest",
    motion: "push-in",
    artwork: distilleryArtwork(
      "distillery-final-service",
      "An intimate SIP Academy spirits library and restaurant bar where Sippy, Roma, and Hummin guide a responsible tasting with small measured pours, water, aroma notes, food, and alcohol-free participation."
    ),
    landmark: { label: "Spirits library", x: 50, y: 54 },
    drop: { x: 58, y: 58, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Retail",
        title: "Read category before romance",
        detail:
          "Begin with class or type, alcohol content, origin, age statement, bottler or importer, and disclosures before interpreting marketing language."
      },
      {
        eyebrow: "Measure",
        title: "Serving size and alcohol strength work together",
        detail:
          "A U.S. standard drink contains 14 grams of pure alcohol; a mixed drink may contain one, more than one, or less depending on its actual recipe."
      },
      {
        eyebrow: "Sensory",
        title: "Observe, nose, taste, dilute, compare",
        detail:
          "Small pours, optional water, written notes, spit cups, and side-by-side comparison reveal change without requiring greater consumption."
      },
      {
        eyebrow: "Cocktail",
        title: "The spirit has a role, not a pedestal",
        detail:
          "In mixed service, strength, sweetness, acidity, dilution, temperature, aroma, and texture should preserve a clear purpose for the base spirit."
      },
      {
        eyebrow: "Hospitality",
        title: "The safest guest decision always wins",
        detail:
          "Offer water, food, alcohol-free participation, measured pours, pacing, transport support, and a clear stop. Never pressure a guest to drink."
      },
      {
        eyebrow: "Return path",
        title: "Every sensory clue can travel backward",
        detail:
          "Cereal, fruit, cane, agave, juniper, copper, ester, oak, smoke, sweetness, and texture can reconnect the glass to its production choices."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The journey ends where the guest remains in control. Identity, measure, context, and hospitality arrive together."
      },
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Taste for connections, not trophies. A small sample can reveal raw material, fermentation, still, vessel, blend, and service."
      },
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Standard-drink math is a safety tool, not a target. Alcohol-free participation completes the same learning path."
      }
    ]
  }
];

const distilleryExpansionScenesByAnchor: Partial<Record<string, BeyondTheGlassScene[]>> = {
  "distillery-material-crossroads": [
    {
      id: "distillery-process-water",
      number: "",
      title: "The Process Water Ledger",
      range: [0, 0],
      eyebrow: "Water · Distinct production roles",
      summary:
        "Source, mash, cooling, cleaning, and proof-reduction water follow different specifications, controls, and category rules.",
      checkpoint: "Water with a purpose",
      motion: "cutaway",
      artwork: distilleryArtwork(
        "distillery-water-proofing",
        "A glass-and-brass SIP Academy distillery water observatory with separate source testing, mash water, condenser cooling, cleaning, proof-reduction, gauging, and blending stations around a central controlled-water vessel."
      ),
      landmark: { label: "Process water observatory", x: 50, y: 48 },
      drop: { x: 50, y: 63, size: 7 },
      fieldNotes: [
        {
          eyebrow: "Source",
          title: "Potable and consistent comes before romance",
          detail:
            "A distillery verifies incoming water for safety, consistency, treatment needs, and sensory suitability instead of assuming a famous source performs every job without control."
        },
        {
          eyebrow: "Cook and mash",
          title: "Water unlocks the raw material",
          detail:
            "Cereal cooking and mashing, fruit or cane handling, and agave processing use category-specific water and heat plans to make fermentable material available."
        },
        {
          eyebrow: "Cooling",
          title: "Condenser water carries heat away",
          detail:
            "Cooling-water flow and temperature support stable condensation; closed loops or heat recovery can reduce demand when the equipment and facility design permit."
        },
        {
          eyebrow: "Cleaning",
          title: "Cleaning water stays out of the product path",
          detail:
            "Validated cleaning, rinsing, drainage, and verification protect vessels and transfer lines while trained staff keep process and cleaning streams correctly separated."
        },
        {
          eyebrow: "Reduction",
          title: "Proofing water becomes part of the spirit",
          detail:
            "Where category rules and the product plan allow, measured water reduces strength before maturation, assembly, or bottling; quality and addition sequence can affect clarity and integration."
        },
        {
          eyebrow: "Ledger",
          title: "Use and discharge are measured separately",
          detail:
            "Meters, sample points, batch records, wastewater strength, and destination reveal whether the distillery is improving rather than simply moving water off site."
        }
      ],
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text:
            "Water is not one ingredient with one job. It cooks, cools, cleans, transfers heat, and sometimes becomes part of the final assembly."
        },
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "I keep each stream separate: source, specification, treatment, destination, temperature, quantity, discharge, and the category rule that applies."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "Proofing water can change texture and aroma release, but no poetic source story replaces a controlled addition and a sound spirit."
        }
      ]
    }
  ],
  "distillery-fermentation": [
    {
      id: "distillery-safety-boundary",
      number: "",
      title: "The Safe Stillhouse",
      range: [0, 0],
      eyebrow: "Professional practice · Hazard control",
      summary:
        "Dust, carbon dioxide, heat, pressure, alcohol vapor, confined spaces, and moving equipment require engineered controls and trained work.",
      checkpoint: "No shortcut becomes a lesson",
      motion: "glide",
      artwork: distilleryArtwork(
        "distillery-safety-systems",
        "A clean SIP Academy stillhouse overview with dust extraction, ventilation, guarded hot equipment, remote monitoring, bonding and grounding, pressure protection, spill containment, and restricted low-area access."
      ),
      landmark: { label: "Safety systems", x: 51, y: 48 },
      drop: { x: 41, y: 64, size: 6 },
      fieldNotes: [
        {
          eyebrow: "Grain dust",
          title: "Fine dry material is controlled at the source",
          detail:
            "Enclosed transfer, extraction, housekeeping, suitable electrical equipment, guarding, and written procedures reduce dust, ignition, and mechanical hazards around milling."
        },
        {
          eyebrow: "Carbon dioxide",
          title: "Fermentation gas can collect where people cannot sense it",
          detail:
            "Ventilation, monitoring, restricted access, training, and confined-space procedures address carbon dioxide accumulation around fermenters, pits, and low areas."
        },
        {
          eyebrow: "Alcohol vapor",
          title: "Contain the fuel and control ignition",
          detail:
            "Closed equipment, ventilation, vapor management, suitable electrical classification, bonding and grounding, leak prevention, and ignition control protect production areas."
        },
        {
          eyebrow: "Pressure",
          title: "A closed vessel needs a designed escape path",
          detail:
            "Rated vessels, unobstructed relief protection, inspection, safe isolation, and operating limits prevent heat or blockage from turning pressure into an uncontrolled release."
        },
        {
          eyebrow: "Heat and motion",
          title: "Guards and isolation protect the intervention",
          detail:
            "Hot surfaces, pumps, agitators, conveyors, valves, and elevated work require guarding, access control, lockout, fall protection, and task-specific training."
        },
        {
          eyebrow: "Culture",
          title: "A safe system expects someone to stop the job",
          detail:
            "Permits, alarms, emergency planning, maintenance, incident review, and stop-work authority make safety an operating condition rather than a poster."
        }
      ],
      narration: [
        {
          speaker: "Hummin",
          durationSeconds: 9,
          text:
            "This scene is a systems map, not an operating tutorial. The professional route is engineered control, training, authorization, and verified maintenance."
        },
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text:
            "Craft does not mean improvisation around dust, pressure, gas, heat, or vapor. Expertise includes knowing when the process must stop."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "A beautiful spirit is never worth an unsafe shortcut. The people remain the most important part of the system."
        }
      ]
    }
  ],
  "distillery-warehouse": [
    {
      id: "distillery-vessel-crossroads",
      number: "",
      title: "The Cask and Vessel Crossroads",
      range: [0, 0],
      eyebrow: "Maturation · Category-aware choices",
      summary:
        "New charred oak, used casks, finishing vessels, larger wood, inert storage, and unaged release are different legal and sensory paths.",
      checkpoint: "Choose a vessel honestly",
      motion: "orbit",
      artwork: distilleryArtwork(
        "cask-vessel-crossroads",
        "A radial SIP Academy maturation rotunda comparing new charred oak, used oak, large neutral wood, inert stainless storage, finishing-cask options, and a clear unaged-spirit path."
      ),
      landmark: { label: "Vessel crossroads", x: 50, y: 49 },
      drop: { x: 50, y: 63, size: 7 },
      fieldNotes: [
        {
          eyebrow: "New charred oak",
          title: "Some identities require a specific first vessel",
          detail:
            "New charred oak can contribute extraction, color, filtration, oxygen-mediated change, and warehouse interaction; legal requirements vary by spirit category and jurisdiction."
        },
        {
          eyebrow: "Used cask",
          title: "Previous use changes the starting point",
          detail:
            "A used cask may contribute less fresh wood character and may carry traces of its earlier contents, but age, condition, storage, and preparation matter more than the cask name alone."
        },
        {
          eyebrow: "Finish",
          title: "A finishing vessel is an additional chapter",
          detail:
            "A producer may move qualifying spirit into another permitted vessel for a defined sensory purpose, while category rules and truthful presentation determine what can be claimed."
        },
        {
          eyebrow: "Large wood",
          title: "Vessel geometry changes the rate of contact",
          detail:
            "Larger vats and tuns generally offer less wood surface per unit of spirit than smaller casks, which can support marrying, holding, or a gentler maturation role."
        },
        {
          eyebrow: "Inert storage",
          title: "Stainless preserves without pretending to mature like oak",
          detail:
            "Inert tanks can hold, rest, proof, marry, or stage spirit with controlled exposure; they do not reproduce the extraction and oxygen exchange of a wooden cask."
        },
        {
          eyebrow: "Unaged path",
          title: "Wood is not a universal requirement",
          detail:
            "Vodka, gin, selected agave, rum, fruit, cane, and other spirits may be released without wood when their standards of identity and product plan permit."
        }
      ],
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text:
            "The honest route begins with category. A vessel that defines one spirit may be optional, prohibited, or irrelevant for another."
        },
        {
          speaker: "Roma",
          durationSeconds: 8,
          text:
            "I compare wood, previous fill, char or toast, size, climate, time, and proof before naming the flavor contribution."
        },
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "Cask serial, origin, construction, prior use, fill date, entry strength, location, samples, transfers, and legal identity stay linked."
        }
      ]
    }
  ],
  "distillery-assembly": [
    {
      id: "distillery-proofing-lab",
      number: "",
      title: "The Proofing Laboratory",
      range: [0, 0],
      eyebrow: "Measurement · Strength and quantity",
      summary:
        "Temperature, density, dissolved solids, water addition, volume, and records turn a strength reading into a controlled release decision.",
      checkpoint: "Gauge what is actually there",
      motion: "push-in",
      artwork: distilleryArtwork(
        "distillery-water-proofing",
        "A SIP Academy proofing laboratory with controlled water, hydrometers and thermometers, a density instrument, small laboratory still, measured blending vessel, and retained samples."
      ),
      landmark: { label: "Proofing bench", x: 49, y: 55 },
      drop: { x: 58, y: 65, size: 6 },
      fieldNotes: [
        {
          eyebrow: "ABV and proof",
          title: "Strength needs a stated convention",
          detail:
            "Alcohol by volume is a percentage; in the United States, proof is twice the ABV value. Other markets and records may use different conventions, reference temperatures, or units."
        },
        {
          eyebrow: "Temperature",
          title: "A hydrometer reading requires correction",
          detail:
            "Liquid density changes with temperature, so regulated gauging uses a thermometer and prescribed tables or an approved instrument to determine true strength."
        },
        {
          eyebrow: "Instrument",
          title: "Hydrometer and density meter still need method control",
          detail:
            "Clean instruments, suitable ranges, calibration or verification, bubble-free samples, temperature control, and trained reading support an accurate result."
        },
        {
          eyebrow: "Obscuration",
          title: "Dissolved solids can hide true proof",
          detail:
            "Sugar, flavoring, or other dissolved material can change density; regulated methods may require a correction or laboratory separation before true proof is determined."
        },
        {
          eyebrow: "Reduction",
          title: "Water addition is staged and measured",
          detail:
            "Producers calculate and verify reductions, allow integration where appropriate, monitor clarity and temperature, and follow category and tax rules instead of relying on arithmetic alone."
        },
        {
          eyebrow: "Gauge record",
          title: "Quantity and proof travel together",
          detail:
            "Tank, volume or weight, temperature, strength, method, operator, time, additions, losses, and disposition form the professional gauge record."
        }
      ],
      narration: [
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "Proofing is measurement under a method. Temperature, density, obscuration, quantity, instrument, and record determine what the number means."
        },
        {
          speaker: "Sippy",
          durationSeconds: 7,
          text:
            "A bottle strength is not guessed at the end. It is traced through gauges and additions that preserve both identity and accountability."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "Reduction can change aroma release and texture, but the sensory check follows the accurate gauge—it does not replace it."
        }
      ]
    },
    {
      id: "distillery-quality-lab",
      number: "",
      title: "The Spirit Quality Lab",
      range: [0, 0],
      eyebrow: "Release · Analytical and sensory fit",
      summary:
        "Identity, strength, clarity, color, sensory profile, stability, package compatibility, and retained samples converge before release.",
      checkpoint: "Measure, compare, release",
      motion: "cutaway",
      artwork: distilleryArtwork(
        "spirit-quality-lab",
        "A glass-and-brass SIP Academy spirit quality laboratory with gauging instruments, a small laboratory still, controlled color and clarity light, measured dilution, aroma references, blind sensory samples, and a retained-sample archive."
      ),
      landmark: { label: "Release laboratory", x: 50, y: 49 },
      drop: { x: 51, y: 65, size: 6 },
      fieldNotes: [
        {
          eyebrow: "Identity",
          title: "Test the product against its declared category",
          detail:
            "Raw material, production, maturation, additions, treatment, geographic protection, and records must support the class, type, age, origin, and other claims used at release."
        },
        {
          eyebrow: "Strength",
          title: "Verify final alcohol after the final operation",
          detail:
            "Proof or ABV is checked using the required method after reduction, blending, flavoring, sweetening, filtration, or other permitted operations that can change the reading."
        },
        {
          eyebrow: "Clarity and color",
          title: "Appearance needs a product-specific standard",
          detail:
            "Haze, sediment, color, particles, or instability may be expected, permitted, preventable, or unacceptable depending on the spirit and its presentation."
        },
        {
          eyebrow: "Sensory",
          title: "Compare to intent, reference, and defect risk",
          detail:
            "A trained panel uses controlled samples to assess aroma, flavor, texture, finish, integration, batch fit, taints, and process deviations without turning preference into the only standard."
        },
        {
          eyebrow: "Compatibility",
          title: "The package is part of the stability check",
          detail:
            "Closure, liner, glass, decoration, fill, light, temperature, shipping, and contact time can affect leakage, appearance, aroma, or presentation."
        },
        {
          eyebrow: "Archive",
          title: "Retained samples let the future compare backward",
          detail:
            "Representative retained samples, storage conditions, lot identity, analytical results, panel notes, and disposition support complaints, investigations, and improvement."
        }
      ],
      narration: [
        {
          speaker: "Roma",
          durationSeconds: 8,
          text:
            "Quality is not simply smoothness. I compare category truth, batch intent, aroma, texture, finish, integration, and any clue that should stop release."
        },
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "Identity record, gauge, visual check, sensory result, package trial, retained sample, approval, and corrective action form one release file."
        },
        {
          speaker: "Sippy",
          durationSeconds: 7,
          text:
            "The laboratory protects trust by making the final claim testable. A beautiful story still has to match the spirit in the bottle."
        }
      ]
    },
    {
      id: "distillery-sustainability-loop",
      number: "",
      title: "The Distillery Gives Back",
      range: [0, 0],
      eyebrow: "Systems · Water, heat, material, logistics",
      summary:
        "A measured resource map connects farming, spent material, heat, water, wastewater, packaging, warehouse energy, and transport.",
      checkpoint: "Responsibility stays traceable",
      motion: "reassemble",
      artwork: distilleryArtwork(
        "distillery-sustainability-loop",
        "An open-air SIP Academy distillery systems court connecting raw-material fields, spent-material custody, heat recovery, water metering and treatment, optional carbon-dioxide recovery, renewable energy, packaging, warehouse, and logistics to a central monitoring hub."
      ),
      landmark: { label: "Resource ledger", x: 50, y: 49 },
      drop: { x: 44, y: 64, size: 7 },
      fieldNotes: [
        {
          eyebrow: "Baseline",
          title: "Measure intensity across the whole route",
          detail:
            "Water, energy, fuel, wastewater, solid residuals, packaging, evaporation, warehouse losses, and transport are compared with production over time before improvement claims are made."
        },
        {
          eyebrow: "Spent material",
          title: "Stillage and grain need an approved destination",
          detail:
            "Feed, digestion, compost, extraction, irrigation, or treatment may be possible only when composition, storage, contamination, local rules, and the receiving system make the route suitable."
        },
        {
          eyebrow: "Heat",
          title: "Cooking and distillation create recovery opportunities",
          detail:
            "Heat exchangers, condensers, hot water, steam systems, insulation, and process scheduling can reduce demand when product, worker, and equipment safeguards remain intact."
        },
        {
          eyebrow: "Water and effluent",
          title: "Cooling water and high-strength wastewater are not interchangeable",
          detail:
            "Segregated streams, metering, closed loops, pretreatment, organic-load monitoring, discharge limits, and verified reuse plans make water management credible."
        },
        {
          eyebrow: "Package and warehouse",
          title: "Glass weight, case design, breakage, and storage all count",
          detail:
            "Bottle mass, recycled content, closures, secondary packaging, pallet efficiency, warehouse climate, loss, and damage influence material and energy use."
        },
        {
          eyebrow: "Transport",
          title: "The route to market belongs in the product map",
          detail:
            "Bulk versus bottled movement, shipment distance, load efficiency, mode, returns, breakage, and local distribution choices affect custody and footprint."
        }
      ],
      narration: [
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "A residual does not vanish when it leaves the gate. I keep quantity, composition, destination, acceptance, transport, and final treatment connected."
        },
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text:
            "Responsibility is a complete route: field, process, warehouse, package, shipment, and the people or ecosystems receiving each output."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "Efficient heat, clean water, sound barrels, stable proof, and intact packages protect flavor as well as resources."
        }
      ]
    }
  ]
};

const sequencedDistilleryScenes: BeyondTheGlassScene[] = distilleryScenes
  .flatMap((scene) => [scene, ...(distilleryExpansionScenesByAnchor[scene.id] ?? [])])
  .map((scene, index, allScenes) => ({
    ...scene,
    number: String(index + 1).padStart(2, "0"),
    range: [index / allScenes.length, (index + 1) / allScenes.length]
  }));

export const distilleryFieldTrip: BeyondTheGlassChapter = {
  slug: "distillery",
  title: "Beyond The Glass",
  chapterTitle: "Spirits · From Source to Service",
  subject: "A category-aware distillery field trip",
  description:
    "A visual SIP Academy journey through raw-material forks, fermentation, pot and column stills, professional fraction selection, protected identities, maturation, assembly, traceability, sensory evaluation, and responsible service.",
  coreMessage:
    "Every spirit is a connected system, but no single process describes them all: raw material, law, place, fermentation, separation, maturation, assembly, label, and service determine the truthful path.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/distillery/distillery-gate-960.webp"
  },
  scenes: sequencedDistilleryScenes,
  sources: [
    {
      id: "ecfr-distilled-spirits-identity",
      organization: "Electronic Code of Federal Regulations",
      title: "27 CFR Part 5, Subpart I — Standards of Identity for Distilled Spirits",
      url: "https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-5/subpart-I",
      note:
        "Current U.S. primary legal source for neutral spirits and vodka, whisky types, gin, brandy, rum, agave spirits, and category-specific production, storage, and designation rules."
    },
    {
      id: "ttb-distilled-spirits-labeling",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Distilled Spirits Labeling",
      url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/distilled-spirits/labeling",
      note:
        "Current TTB guidance for mandatory distilled-spirit label information, approvals, disclosures, and links to governing regulations."
    },
    {
      id: "ttb-label-anatomy",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Anatomy of a Distilled Spirits Label",
      url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/distilled-spirits/ds-labeling-home/anatomy-of-a-distilled-spirits-label-tool",
      note:
        "Primary U.S. labeling reference for brand, class or type, alcohol content, and truthful presentation of identity."
    },
    {
      id: "ttb-proofing",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Distilled Spirits Proofing Tutorial",
      url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/distilled-spirits/proofing-tutorial",
      note:
        "Primary reference establishing proof determination and gauging as controlled professional compliance functions."
    },
    {
      id: "ttb-retail-records",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Beverage Alcohol Retailers",
      url: "https://www.ttb.gov/ttb-audiences/business-owners/retailers-beverage-alcohol",
      note:
        "Primary reference for U.S. retailer registration and receipt records, supporting the producer-to-market traceability lesson."
    },
    {
      id: "scotch-whisky-product-specification",
      organization: "UK Department for Environment, Food and Rural Affairs",
      title: "Scotch Whisky Technical File",
      url: "https://assets.publishing.service.gov.uk/media/5fd36667e90e07662ed92c85/Scotch_Whisky_Technical_File_-_June_2019.pdf",
      note:
        "Official product specification for Scotch Whisky raw materials, fermentation, distillation, maturation, permitted casks, blending, coloring, strength adjustment, and protected identity."
    },
    {
      id: "scotch-whisky-verification",
      organization: "HM Revenue & Customs",
      title: "Producing Scotch Whisky",
      url: "https://www.gov.uk/guidance/producing-scotch-whisky",
      note:
        "Official verification guidance connecting fermentation, distillation, maturation, blending, and final labeling to the protected Scotch Whisky specification."
    },
    {
      id: "irish-whiskey-technical-file",
      organization: "Department of Agriculture, Food and the Marine, Ireland",
      title: "Irish Whiskey Technical File",
      url: "https://www.marketaccess.agriculture.gov.ie/media/marketaccess/content/Irish%20Whiskey%20Technical%20File.pdf",
      note:
        "Official Irish Whiskey GI specification used for category-aware pot-still and column-still context, Irish production, maturation, and labeling."
    },
    {
      id: "tequila-regulatory-council",
      organization: "Consejo Regulador del Tequila",
      title: "Our Tequila — Authenticity and Certified Quality",
      url: "https://www.crt.org.mx/en/our-tequila/",
      note:
        "Official CRT reference for the blue Weber agave requirement, authorized geography, certification, and NOM-006-SCFI-2012 production framework."
    },
    {
      id: "whiskey-aroma-review",
      organization: "Beverages (peer-reviewed journal)",
      title: "Sources of Volatile Aromatic Congeners in Whiskey",
      url: "https://doi.org/10.3390/beverages9030064",
      note:
        "Peer-reviewed production-science review supporting high-level treatment of fermentation congeners, vapor behavior, reflux, still geometry, copper contact, and maturation-derived aroma."
    },
    {
      id: "niaaa-standard-drink",
      organization: "National Institute on Alcohol Abuse and Alcoholism",
      title: "What Is a Standard Drink?",
      url: "https://rethinkingdrinking.niaaa.nih.gov/how-much-too-much/whats-standard-drink",
      note:
        "U.S. public-health reference for standard-drink equivalence and the caution that actual alcohol content and serving sizes vary."
    },
    {
      id: "ttb-gauging-manual",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Gauging Manual — 27 CFR Part 30",
      url: "https://www.ttb.gov/public-information/foia/distilled-spirits-gauging-manual",
      note:
        "Primary U.S. regulatory reference for proof and quantity determination, hydrometers and thermometers, temperature correction, true proof, obscuration, and prescribed gauging tables."
    },
    {
      id: "ttb-proofing-devices",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Alternative Devices for Determination of Proof",
      url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/distilled-spirits/approvalalternatedevices",
      note:
        "Current TTB reference for the relationship between prescribed hydrometer methods and approved density-measurement alternatives used for tax determination."
    },
    {
      id: "osha-distillery-safety",
      organization: "Occupational Safety and Health Administration",
      title: "OSHA Technical Manual, Section IV, Chapter 5",
      url: "https://www.osha.gov/otm/section-4-safety-hazards/chapter-5",
      note:
        "Primary worker-safety reference supporting high-level treatment of grain dust, ethanol vapor, carbon dioxide, ignition control, ventilation, bonding and grounding, monitoring, containment, and engineered safeguards."
    },
    {
      id: "discus-sustainability",
      organization: "Distilled Spirits Council of the United States",
      title: "Sustainability in the Spirits Industry",
      url: "https://distilledspirits.org/sustainability-initiatives/",
      note:
        "Industry reference for responsible water use, energy efficiency, conditional spent-grain reuse, waste reduction, packaging, and transport; local suitability and regulatory verification remain required."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
