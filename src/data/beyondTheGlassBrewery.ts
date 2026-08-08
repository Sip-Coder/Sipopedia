import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const breweryArtwork = (
  filename: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/brewery/${filename}-1600.webp`,
  srcSet: `/beyond-the-glass/brewery/${filename}-960.webp 960w, /beyond-the-glass/brewery/${filename}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/brewery/${filename}-portrait-960.webp`,
  portraitSrcSet: `/beyond-the-glass/brewery/${filename}-portrait-640.webp 640w, /beyond-the-glass/brewery/${filename}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

const breweryScenes: BeyondTheGlassScene[] = [
  {
    id: "brewery-academy-plaza",
    number: "01",
    title: "Brewery Gate",
    range: [0, 0.067],
    eyebrow: "SIP Academy · Brewery",
    summary:
      "The brewery wing opens beside hop bines, malt sacks, copper kettles, stainless tanks, and blue Academy canals.",
    checkpoint: "Academy to brewhouse",
    motion: "establish",
    artwork: breweryArtwork(
      "brewery-opening",
      "Sippy, Roma, and Hummin enter the SIP Academy brewery wing at sunrise, surrounded by hop gardens, malt sacks, copper vessels, stainless tanks, and luminous blue canals."
    ),
    landmark: { label: "Brewery gate", x: 19, y: 49 },
    drop: { x: 57, y: 48, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Water",
        title: "Brewing liquor sets the stage",
        detail:
          "Brewers verify and adjust water for the intended mash and beer; mineral content and alkalinity can affect process performance and flavor."
      },
      {
        eyebrow: "Malt",
        title: "Malt carries starch, color, and grain flavor",
        detail:
          "Malted grain supplies extract and enzymes, while kilning and specialty-malt choices help shape color and flavors from bread to toast and roast."
      },
      {
        eyebrow: "Hops",
        title: "Hops can add bitterness, flavor, and aroma",
        detail:
          "Variety, form, dose, timing, and temperature change what hop resins and oils contribute to the finished beer."
      },
      {
        eyebrow: "Yeast",
        title: "Yeast makes beer, not simply alcohol",
        detail:
          "A healthy fermentation converts wort sugars into alcohol and carbon dioxide while creating style-defining flavor compounds."
      },
      {
        eyebrow: "Service",
        title: "Quality must survive the full route",
        detail:
          "Packaging, oxygen control, date rotation, cold storage, draught hygiene, and glass service protect the brewer’s intent."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "Welcome to the brewery wing. We’ll connect each ingredient to the vessel, decision, and person that carries it toward the glass."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "I’m following the flavor trail: fresh bread, citrus peel, fermentation fruit, roast, spice, and the clues that say a beer has faded."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "I’ll track the system: temperatures, transfers, gravity, oxygen, carbonation, sanitation, and cold-chain custody."
      }
    ]
  },
  {
    id: "brewery-system-map",
    number: "02",
    title: "From Grain to Tap",
    range: [0.067, 0.133],
    eyebrow: "Learning map",
    summary:
      "One connected route carries raw ingredients through the hot side, cold side, package, and final service.",
    checkpoint: "See the whole system",
    motion: "glide",
    artwork: breweryArtwork(
      "grain-to-tap-system",
      "An illustrated cutaway map of the SIP Academy brewery connecting ingredient rooms, mill, mash and lauter vessels, kettle, cellar tanks, packaging line, cold storage, and taproom."
    ),
    landmark: { label: "Brewhouse route", x: 24, y: 52 },
    drop: { x: 58, y: 58, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Ingredients",
        title: "Water, malt, hops, and yeast",
        detail:
          "The classic brewing quartet enters at different moments and performs different chemical, biological, and sensory jobs."
      },
      {
        eyebrow: "Hot side",
        title: "Mill, mash, lauter, kettle, whirlpool",
        detail:
          "The brewhouse opens grain, builds fermentable wort, boils it with hops, and separates hot solids before cooling."
      },
      {
        eyebrow: "Cold side",
        title: "Chill, ferment, mature, clarify",
        detail:
          "Once cooled, every transfer demands sanitary control while yeast, temperature, and time transform wort into beer."
      },
      {
        eyebrow: "Package",
        title: "Brite tank to can, bottle, or keg",
        detail:
          "Carbonation, low oxygen pickup, fill control, and a sound closure protect flavor and package integrity."
      },
      {
        eyebrow: "Guest",
        title: "Cold chain, clean lines, beer-clean glass",
        detail:
          "The route ends only when a fresh, properly stored beer reaches clean draught equipment and an appropriate glass."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "Read this map as one promise. Every handoff must preserve what the earlier rooms created."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Flavor does not live in one room. It gathers, changes, and sometimes disappears as the beer moves."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Hot side becomes cold side at the chiller. From that boundary onward, sanitation and oxygen control become critical."
      }
    ]
  },
  {
    id: "brewery-water-room",
    number: "03",
    title: "The Water Room",
    range: [0.133, 0.2],
    eyebrow: "Ingredient · Brewing liquor",
    summary:
      "Incoming water is tested, treated when needed, and matched to the process rather than treated as invisible filler.",
    checkpoint: "Source to mash",
    motion: "cutaway",
    artwork: breweryArtwork(
      "brewery-water-room",
      "A cutaway brewery water room with source pipes, carbon filtration, mineral dosing, a laboratory sample bench, hot-liquor tank, and water flowing toward the mash tun."
    ),
    landmark: { label: "Water treatment", x: 36, y: 46 },
    drop: { x: 27, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Potability",
        title: "Safe is the minimum, suitability is the goal",
        detail:
          "Brewing water must be potable, consistent, and free of unwanted sensory or microbiological surprises before recipe adjustments begin."
      },
      {
        eyebrow: "Alkalinity",
        title: "Alkalinity resists a drop in pH",
        detail:
          "Brewers consider source-water alkalinity alongside the grain bill because both influence mash pH and downstream performance."
      },
      {
        eyebrow: "Minerals",
        title: "Calcium, sulfate, chloride, and company",
        detail:
          "Mineral ions can affect yeast nutrition, process behavior, mouthfeel, and flavor emphasis, but no single ratio guarantees a beer style."
      },
      {
        eyebrow: "Removal",
        title: "Treatment begins by removing problems",
        detail:
          "Filtration or other treatment may address sediment, disinfectant character, excessive mineral load, or source-water variability."
      },
      {
        eyebrow: "Liquor tanks",
        title: "Hot and cold water are scheduled resources",
        detail:
          "Breweries store and heat process water for mashing, sparging, cleaning, and cooling while monitoring both quality and use."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "Water is the brewery’s most traveled ingredient. It enters the beer, carries heat, cleans equipment, and links almost every room."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Minerals can change how bitterness, fullness, and finish are perceived, but I never judge the water by one number alone."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Source report, sensory check, alkalinity, hardness, and treatment log: consistency starts with measurement."
      }
    ]
  },
  {
    id: "brewery-malt-house",
    number: "04",
    title: "Kernel to Malt",
    range: [0.2, 0.267],
    eyebrow: "Ingredient · Grain",
    summary:
      "A dormant cereal kernel is steeped, allowed to germinate, and then kilned into a brewing ingredient.",
    checkpoint: "Barley to malt",
    motion: "reassemble",
    artwork: breweryArtwork(
      "brewery-malt-house",
      "A deconstructed barley kernel beside steeping vessels, a germination floor, kiln, pale base malt, and progressively darker specialty malts."
    ),
    landmark: { label: "Malt house", x: 44, y: 44 },
    drop: { x: 50, y: 65, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Kernel",
        title: "Husk, endosperm, embryo",
        detail:
          "The husk can support lautering, the endosperm stores starch and protein, and the embryo activates the living grain during germination."
      },
      {
        eyebrow: "Steeping",
        title: "Water wakes the kernel",
        detail:
          "The maltster raises kernel moisture through controlled wet and air rests so germination can begin evenly."
      },
      {
        eyebrow: "Germination",
        title: "The grain prepares its own reserves",
        detail:
          "Germination develops enzymes and modifies the endosperm, making its stored material more accessible in the brewhouse."
      },
      {
        eyebrow: "Kilning",
        title: "Heat stops growth and builds character",
        detail:
          "Drying and kilning stabilize green malt; time and temperature help determine color, aroma, flavor, and enzyme preservation."
      },
      {
        eyebrow: "Malt palette",
        title: "Base malt works; specialty malt accents",
        detail:
          "Base malts commonly supply most extract and enzymatic power, while specialty malts can contribute caramel, toast, roast, color, or texture."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "Before the brewery receives grain, the maltster has already performed a controlled transformation: wake it, modify it, then preserve it."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Pale malt can suggest dough and cracker; deeper kilning can lead us toward crust, toast, caramel, chocolate, or roast."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Moisture, protein, extract, color, and diastatic power help the brewer decide how a malt will behave."
      }
    ]
  },
  {
    id: "brewery-hop-garden",
    number: "05",
    title: "Inside the Hop Cone",
    range: [0.267, 0.333],
    eyebrow: "Ingredient · Hops",
    summary:
      "A climbing bine and its cone carry bittering resins and volatile oils into very different stages of brewing.",
    checkpoint: "Bine to brew",
    motion: "orbit",
    artwork: breweryArtwork(
      "brewery-hop-cone",
      "A hop yard and rotating cutaway hop cone revealing bracts, strig, and yellow lupulin glands beside kettle, whirlpool, and dry-hop destinations."
    ),
    landmark: { label: "Hop cone", x: 62, y: 42 },
    drop: { x: 45, y: 66, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Plant",
        title: "Bines climb; cones hold the brewing treasure",
        detail:
          "Commercial hop plants are trained upward, and the mature cones contain glands rich in resins and aromatic oils."
      },
      {
        eyebrow: "Lupulin",
        title: "Yellow glands, concentrated chemistry",
        detail:
          "Lupulin glands contain alpha acids and essential oils that brewers target through different additions and temperatures."
      },
      {
        eyebrow: "Boil",
        title: "Heat transforms alpha acids",
        detail:
          "Kettle boiling isomerizes alpha acids into more soluble bitter compounds; time and wort conditions affect the result."
      },
      {
        eyebrow: "Late additions",
        title: "Whirlpool timing protects another aroma set",
        detail:
          "Later hot-side additions generally preserve more volatile hop character than a long boil, though extraction and loss continue."
      },
      {
        eyebrow: "Dry hopping",
        title: "Cold-side hops emphasize aroma and flavor",
        detail:
          "Hops added after chilling primarily build hop aroma and flavor; brewers also manage oxygen pickup, contact, and the possibility of hop creep."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "One cone can visit the kettle, whirlpool, or cellar. Its destination changes which parts of its chemistry survive into the glass."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "I’m looking beyond citrus and pine: hops may read floral, herbal, spicy, tropical, resinous, earthy, or something entirely regional."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Variety, crop, form, dose, temperature, contact time, and oxygen exposure all belong in the hop record."
      }
    ]
  },
  {
    id: "brewery-yeast-lab",
    number: "06",
    title: "The Living Culture",
    range: [0.333, 0.4],
    eyebrow: "Ingredient · Yeast",
    summary:
      "The smallest guide in the brewery determines attenuation, alcohol, carbonation, and a large share of aroma.",
    checkpoint: "Culture to pitch",
    motion: "push-in",
    artwork: breweryArtwork(
      "brewery-yeast-lab",
      "A brewery yeast laboratory with microscope, culture flask, cell-count chamber, oxygenated wort, and separate ale and lager fermentation paths."
    ),
    landmark: { label: "Yeast culture", x: 52, y: 45 },
    drop: { x: 31, y: 64, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Ale yeast",
        title: "Saccharomyces cerevisiae",
        detail:
          "Ale strains often ferment warmer than lager strains and may express noticeable fruity esters; some strains also produce spicy phenols."
      },
      {
        eyebrow: "Lager yeast",
        title: "Saccharomyces pastorianus",
        detail:
          "Lager strains generally ferment cooler and often leave a sensory profile that foregrounds malt and hops, followed by extended cold maturation."
      },
      {
        eyebrow: "Pitch",
        title: "Right culture, healthy cells, suitable quantity",
        detail:
          "Brewers consider strain, viability, vitality, cell count, wort gravity, and temperature when preparing a pitch."
      },
      {
        eyebrow: "Early oxygen",
        title: "Oxygen has a narrow useful window",
        detail:
          "Wort may be oxygenated before or at pitching to support yeast growth; oxygen pickup later in the process threatens flavor stability."
      },
      {
        eyebrow: "Flavor",
        title: "Fermentation creates more than ethanol",
        detail:
          "Yeast produces carbon dioxide and flavor-active compounds; strain and fermentation conditions influence esters, sulfur notes, phenols, and cleanup."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "The recipe becomes alive here. Brewers create the conditions, but yeast performs the central conversion."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Banana, pear, pepper, clove, clean grain, or sulfur can all become clues to strain and fermentation conditions."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Identity, generation, viability, cell count, pitch temperature, gravity curve, and sensory result stay connected in my log."
      }
    ]
  },
  {
    id: "brewery-roller-mill",
    number: "07",
    title: "The Roller Mill",
    range: [0.4, 0.467],
    eyebrow: "Equipment · Milling",
    summary:
      "Rollers open the malt into grist while the brewer balances exposed endosperm against an intact-enough husk.",
    checkpoint: "Kernel to grist",
    motion: "rotate",
    artwork: breweryArtwork(
      "brewery-roller-mill",
      "A rotating cutaway roller mill separating malt into husk, coarse grits, fine grits, and flour before the grist falls into a covered grist case."
    ),
    landmark: { label: "Roller gap", x: 50, y: 43 },
    drop: { x: 72, y: 63, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Rollers",
        title: "The gap controls the crush",
        detail:
          "Roller spacing is set for the malt and brewhouse so kernels open consistently without turning the entire charge into flour."
      },
      {
        eyebrow: "Husk",
        title: "Husk becomes a filter-bed tool",
        detail:
          "For many barley-based mashes, relatively intact husk material helps the grain bed drain during lautering."
      },
      {
        eyebrow: "Endosperm",
        title: "Expose starch for the mash",
        detail:
          "Breaking the endosperm increases access to starch and other soluble material that hot water and malt enzymes will work on next."
      },
      {
        eyebrow: "Grist fractions",
        title: "Husk, grits, and flour must balance",
        detail:
          "Brewers inspect the crush because coarse or fine extremes can reduce extract recovery or make separation difficult."
      },
      {
        eyebrow: "Containment",
        title: "Grain dust is controlled, not ignored",
        detail:
          "Mills and grist handling need guarding, dust control, housekeeping, and safe operating procedures because suspended grain dust can be hazardous."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "Milling is not about pulverizing. It is the first equipment choice that must satisfy both extraction and separation."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "A good crush smells vividly of fresh grain, but the real proof appears in the mash and the runoff."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "I compare roller setting, grist fractions, extract, lauter behavior, and the next adjustment as one feedback loop."
      }
    ]
  },
  {
    id: "brewery-mash-lauter",
    number: "08",
    title: "Mash and Lauter",
    range: [0.467, 0.533],
    eyebrow: "Equipment · Conversion and separation",
    summary:
      "Hot water and grist build wort; the grain bed then separates that sweet liquid from spent solids.",
    checkpoint: "Grist to wort",
    motion: "cutaway",
    artwork: breweryArtwork(
      "brewhouse-cutaway",
      "A split cutaway mash and lauter system showing hydrated grist, active enzymes, rakes, false bottom, recirculating vorlauf, sparge spray, bright wort, and spent grain."
    ),
    landmark: { label: "Mash conversion", x: 35, y: 43 },
    drop: { x: 65, y: 62, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Mash-in",
        title: "Grist meets controlled hot liquor",
        detail:
          "Mixing aims for even hydration and the brewer’s planned temperature, consistency, and pH without dry pockets."
      },
      {
        eyebrow: "Enzymes",
        title: "Starch becomes fermentable and unfermentable sugars",
        detail:
          "Malt enzymes work within temperature- and pH-sensitive ranges; the mash program helps shape wort fermentability and body."
      },
      {
        eyebrow: "Grain bed",
        title: "The mash becomes its own filter",
        detail:
          "In a lauter tun, husk and grain particles settle over a false bottom while wort drains through the bed."
      },
      {
        eyebrow: "Vorlauf",
        title: "Recirculation sets the bed",
        detail:
          "Early runoff is recirculated to help establish the filter bed and reduce particles moving forward."
      },
      {
        eyebrow: "Sparge",
        title: "Rinse carefully, stop deliberately",
        detail:
          "Sparging can recover additional extract, but the brewer manages flow, temperature, pH, gravity, and flavor rather than chasing every last sugar."
      },
      {
        eyebrow: "Wort",
        title: "Sweet liquid leaves spent grain behind",
        detail:
          "The collected wort carries sugars, color, flavor compounds, protein, and nutrients onward to the kettle."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "This room performs two different jobs: conversion in the mash, then separation through the grain bed."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "The wort is sweet, but its sweetness is architecture: some sugars are easy for yeast to consume, while others help remain as body."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Temperature, pH, time, runoff clarity, flow, gravity, and extract become one live process record."
      }
    ]
  },
  {
    id: "brewery-kettle-whirlpool",
    number: "09",
    title: "Kettle and Whirlpool",
    range: [0.533, 0.6],
    eyebrow: "Equipment · Boil and separation",
    summary:
      "A vigorous boil stabilizes and concentrates wort, while hop timing and whirlpool flow shape bitterness, aroma, and clarity.",
    checkpoint: "Wort to hot break",
    motion: "orbit",
    artwork: breweryArtwork(
      "brewery-kettle-whirlpool",
      "A copper brew kettle and stainless whirlpool in cutaway, showing boiling wort, timed hop additions, vapor, hot break, tangential inlet, and a central trub cone."
    ),
    landmark: { label: "Kettle boil", x: 38, y: 45 },
    drop: { x: 73, y: 60, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Boil",
        title: "Heat stabilizes and concentrates wort",
        detail:
          "Boiling sanitizes wort, stops mash-enzyme activity, drives evaporation, and helps form protein-rich hot break."
      },
      {
        eyebrow: "Bitterness",
        title: "Alpha acids change in the kettle",
        detail:
          "Boil heat isomerizes hop alpha acids into bitter compounds; utilization depends on more than time alone."
      },
      {
        eyebrow: "Aroma timing",
        title: "Every hot-side hop addition makes a tradeoff",
        detail:
          "Longer heat exposure favors bittering and drives off more volatile oil, while later kettle and whirlpool additions retain a different aromatic profile."
      },
      {
        eyebrow: "Vapor",
        title: "The boil must vent what it removes",
        detail:
          "A suitable boil and open vapor path help remove unwanted volatiles while concentrating the wort to target gravity."
      },
      {
        eyebrow: "Whirlpool",
        title: "Tangential flow gathers solids",
        detail:
          "Circular flow encourages hop matter and hot-break material to collect toward the vessel center so clearer wort can be drawn away."
      },
      {
        eyebrow: "Trub",
        title: "Leave the cone; take the wort",
        detail:
          "The brewer balances solid removal against wort loss before sending the hot liquid to the chiller."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "The kettle transforms; the whirlpool sorts. Together they prepare a stable, hopped wort for the cold side."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "The same hop can taste different after a long boil, a whirlpool rest, or a cold-side addition. Timing becomes flavor."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Boil vigor, evaporation, gravity, hop timing, whirlpool rest, and wort loss remain visible in the batch history."
      }
    ]
  },
  {
    id: "brewery-wort-chiller",
    number: "10",
    title: "Across the Cold-Side Gate",
    range: [0.6, 0.667],
    eyebrow: "Equipment · Chilling and transfer",
    summary:
      "A heat exchanger cools wort to fermentation temperature and marks the brewery’s strictest sanitation boundary.",
    checkpoint: "Hot wort to pitch",
    motion: "push-in",
    artwork: breweryArtwork(
      "brewery-cold-side-gate",
      "A transparent plate heat exchanger showing hot wort and cold water moving through separate channels, followed by sanitary piping, cold break, oxygenation point, and fermenter inlet."
    ),
    landmark: { label: "Heat exchanger", x: 50, y: 45 },
    drop: { x: 75, y: 63, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Heat exchange",
        title: "Two streams pass without mixing",
        detail:
          "Hot wort transfers heat across plates to a cooling stream so it can reach the selected yeast’s pitching temperature efficiently."
      },
      {
        eyebrow: "Cold break",
        title: "Cooling changes what stays dissolved",
        detail:
          "Rapid cooling encourages additional protein and polyphenol material to precipitate as cold break."
      },
      {
        eyebrow: "Sanitary boundary",
        title: "After the boil, contamination risk changes",
        detail:
          "The chiller, hoses, pipes, valves, and fermenter must be cleaned and sanitized because cooled wort is highly vulnerable to unwanted microbes."
      },
      {
        eyebrow: "Pitch temperature",
        title: "Yeast receives a deliberate climate",
        detail:
          "The outlet temperature is set for strain, recipe, and fermentation plan rather than merely made as cold as possible."
      },
      {
        eyebrow: "Oxygenation",
        title: "Add oxygen before yeast growth, then guard against it",
        detail:
          "Brewers may oxygenate chilled wort to support yeast at pitching; after this early window, oxygen pickup can accelerate staling."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "The chiller is a threshold. The boiling wort leaves heat behind and enters a world where clean contact surfaces matter enormously."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Nothing dramatic should announce a good transfer. The flavor clue is what remains absent: contamination, harsh pickup, or premature staling."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Inlet temperature, outlet temperature, flow, sanitation verification, oxygen dose, and fermenter destination close the handoff."
      }
    ]
  },
  {
    id: "brewery-fermentation-hall",
    number: "11",
    title: "Fermentation Hall",
    range: [0.667, 0.733],
    eyebrow: "Cellar · Primary fermentation",
    summary:
      "Yeast consumes wort sugars inside temperature-controlled vessels while gravity falls, carbon dioxide rises, and flavor develops.",
    checkpoint: "Wort becomes beer",
    motion: "cutaway",
    artwork: breweryArtwork(
      "fermentation-cellar",
      "A cutaway fermentation hall with an open fermenter and cylindroconical tank, active yeast, falling gravity scale, cooling jackets, carbon dioxide path, kräusen, and sampling port."
    ),
    landmark: { label: "Active fermentation", x: 52, y: 43 },
    drop: { x: 72, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Pitch",
        title: "Yeast enters cooled, oxygenated wort",
        detail:
          "The brewer pitches a selected culture into prepared wort and establishes the planned fermentation temperature."
      },
      {
        eyebrow: "Conversion",
        title: "Sugar becomes alcohol, carbon dioxide, and flavor",
        detail:
          "Fermentation lowers extract and gravity as yeast metabolizes fermentable sugars and produces multiple sensory-active compounds."
      },
      {
        eyebrow: "Temperature",
        title: "Cooling jackets steer the fermentation",
        detail:
          "Fermentation creates heat, so vessel cooling and temperature tracking help manage yeast performance and flavor expression."
      },
      {
        eyebrow: "Vessel",
        title: "Open and closed systems behave differently",
        detail:
          "Vessel geometry, pressure, depth, collection, and exposure influence operations; no single fermenter is universal for every beer."
      },
      {
        eyebrow: "Gravity curve",
        title: "Attenuation is watched over time",
        detail:
          "Repeated gravity or extract readings show fermentation progress and help identify an unexpected slowdown or endpoint."
      },
      {
        eyebrow: "Cleanup",
        title: "Do not rush yeast off the job",
        detail:
          "Time near the end of fermentation can allow yeast to reduce some unwanted intermediates before cooling or transfer."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "The cellar is active even when it looks still. Yeast changes density, pressure, temperature, aroma, and identity at once."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Fruit, spice, sulfur, butter, solvent, and clean grain are not random adjectives here; they are clues to strain, health, and process."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "I watch temperature and gravity as curves, not isolated readings, then compare them with pitch data and sensory checks."
      }
    ]
  },
  {
    id: "brewery-conditioning-brite",
    number: "12",
    title: "Conditioning and Brite",
    range: [0.733, 0.8],
    eyebrow: "Cellar · Maturation and finishing",
    summary:
      "Young beer rests, sheds solids, may be clarified or filtered, and reaches its intended carbonation before package.",
    checkpoint: "Young beer to bright beer",
    motion: "glide",
    artwork: breweryArtwork(
      "brewery-conditioning-brite",
      "A cold brewery cellar showing lagering tanks, settling yeast, dry-hop vessel, centrifuge and filter alternatives, brite tank, carbonation stone, pressure gauge, and low-oxygen transfer."
    ),
    landmark: { label: "Brite tank", x: 65, y: 44 },
    drop: { x: 36, y: 64, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Maturation",
        title: "Time refines immature beer",
        detail:
          "Conditioning gives flavor compounds time to settle or change and allows yeast and other solids to separate from the beer."
      },
      {
        eyebrow: "Lagering",
        title: "Cold storage is a process, not a style name alone",
        detail:
          "Extended cold maturation is central to lager production and may improve flavor integration and clarity."
      },
      {
        eyebrow: "Clarification",
        title: "Gravity, finings, centrifuge, or filtration",
        detail:
          "Breweries choose among settling and mechanical methods according to beer style, stability goals, equipment, and desired haze."
      },
      {
        eyebrow: "Dry hop",
        title: "Cold-side aroma needs careful handling",
        detail:
          "Dry hopping can build vivid aroma but also introduces oxygen risk, solids, yield loss, and possible renewed fermentation from hop creep."
      },
      {
        eyebrow: "Brite tank",
        title: "The final staging vessel",
        detail:
          "A brite tank holds finished beer for carbonation, clarification, quality checks, and controlled transfer to packaging."
      },
      {
        eyebrow: "Carbonation",
        title: "Carbon dioxide becomes structure",
        detail:
          "Natural or adjusted carbonation affects aroma release, texture, foam, dispense behavior, and package pressure."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "Fermentation made beer; conditioning makes that beer ready. The goal is not always crystal clarity, but deliberate stability and presentation."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Carbonation lifts aroma and changes texture. Too little can feel dull; too much can sharpen the whole experience."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Time, temperature, pressure, turbidity, dissolved oxygen, carbonation, and tank release checks guard the final cellar handoff."
      }
    ]
  },
  {
    id: "brewery-quality-lab",
    number: "13",
    title: "The Quality Lab",
    range: [0.8, 0.867],
    eyebrow: "Quality · Chemistry, microbiology, sensory",
    summary:
      "A quality program connects measurements, microbiological checks, and trained human senses from wort through package.",
    checkpoint: "Measure the promise",
    motion: "reassemble",
    artwork: breweryArtwork(
      "quality-lab-sensory-panel",
      "A brewery quality laboratory with hydrometer and density meter, pH meter, microscope, yeast count grid, dissolved-oxygen meter, can seam inspection, and a trained sensory panel."
    ),
    landmark: { label: "Quality bench", x: 48, y: 43 },
    drop: { x: 73, y: 63, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Gravity",
        title: "Extract tracks brewhouse and fermentation performance",
        detail:
          "Original and final gravity or extract measurements help quantify wort strength, fermentation progress, and consistency."
      },
      {
        eyebrow: "pH",
        title: "One measurement follows the entire route",
        detail:
          "Brewers monitor pH at selected process points because it influences enzymes, fermentation, stability, and sensory balance."
      },
      {
        eyebrow: "Microbiology",
        title: "Look for the organisms that should—and should not—be there",
        detail:
          "Microscopy, culture methods, or other tests can assess yeast health and detect unwanted microorganisms according to brewery risk."
      },
      {
        eyebrow: "Oxygen",
        title: "Cold-side pickup is measured in small amounts",
        detail:
          "Dissolved oxygen and total package oxygen checks help identify staling risk introduced during transfers or filling."
      },
      {
        eyebrow: "Package",
        title: "A good beer still needs a sound container",
        detail:
          "Fill level, carbonation, closure or seam integrity, code, and package condition are verified alongside the liquid."
      },
      {
        eyebrow: "Sensory",
        title: "A trained panel closes the loop",
        detail:
          "Appearance, aroma, taste, mouthfeel, and finish reveal whether analytical results align with the intended brand profile."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "Quality is not one final inspection. It is a trail of evidence connecting raw materials, process, package, and sensory intent."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "The sensory panel asks two questions: is this beer sound, and is it the beer the brewery meant to make?"
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Chemistry, microbiology, and sensory are strongest when they explain one another instead of living in separate files."
      }
    ]
  },
  {
    id: "brewery-packaging-cold-chain",
    number: "14",
    title: "Package and Cold Chain",
    range: [0.867, 0.933],
    eyebrow: "Market · Can, bottle, keg",
    summary:
      "The filling line must minimize oxygen, protect carbonation, close the package, record identity, and keep beer fresh in distribution.",
    checkpoint: "Brite tank to market",
    motion: "rotate",
    artwork: breweryArtwork(
      "packaging-line-cold-chain",
      "A brewery packaging line branching from a brite tank to rinsed cans, bottles, and kegs, with carbon-dioxide purge, fillers, seamer, capper, date coder, cold warehouse, and refrigerated delivery."
    ),
    landmark: { label: "Packaging line", x: 46, y: 45 },
    drop: { x: 73, y: 65, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Purge and fill",
        title: "Displace air, hold carbonation",
        detail:
          "Packaging systems use controlled filling and carbon dioxide management to reduce oxygen pickup, foam loss, and carbonation change."
      },
      {
        eyebrow: "Can",
        title: "The double seam is part of beer quality",
        detail:
          "A correctly formed can seam protects against leakage and gas exchange; breweries inspect seam dimensions and package integrity."
      },
      {
        eyebrow: "Bottle",
        title: "Closure and light protection matter",
        detail:
          "Caps or other closures must seal reliably, while brown glass or opaque secondary packaging offers stronger light protection than clear or green glass."
      },
      {
        eyebrow: "Keg",
        title: "A reusable package joins the draught system",
        detail:
          "Cleaned, inspected, purged, and filled kegs carry beer to a coupler and dispense system that must preserve pressure and hygiene."
      },
      {
        eyebrow: "Identity",
        title: "Label and code make the package traceable",
        detail:
          "Required label information, truthful product identity, lot or date coding, and release records connect a package to its beer and market."
      },
      {
        eyebrow: "Cold chain",
        title: "Time and warmth accelerate change",
        detail:
          "Refrigerated storage, date rotation, light protection, and careful distribution help preserve freshness—especially in hop-forward beer."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "The package is not a picture frame. It is a pressure vessel, oxygen barrier, legal identity, and traveling quality system."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Papery oxidation, faded hops, or skunky aroma may begin after brewing, which means distribution is still part of flavor."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Fill, closure, dissolved oxygen, code, warehouse temperature, shipment, and retail rotation extend the batch record into the market."
      }
    ]
  },
  {
    id: "brewery-taproom-service",
    number: "15",
    title: "The Final Pour",
    range: [0.933, 1],
    eyebrow: "Service · Taproom and table",
    summary:
      "A cold keg, balanced draught system, clean line, beer-clean glass, and informed server complete the grain-to-tap journey.",
    checkpoint: "Tap to guest",
    motion: "reassemble",
    artwork: breweryArtwork(
      "taproom-draught-service",
      "A warm SIP Academy taproom cutaway connecting cold keg storage, coupler, gas regulator, beer line, faucet, beer-clean glass station, tasting flight, food pairing, and responsible guest service."
    ),
    landmark: { label: "Final pour", x: 66, y: 45 },
    drop: { x: 48, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Cold storage",
        title: "Keep the keg cold and give it time to settle",
        detail:
          "Consistent refrigeration preserves freshness and helps draught beer pour predictably after the keg has reached serving temperature."
      },
      {
        eyebrow: "Draught path",
        title: "Keg, coupler, line, faucet",
        detail:
          "A balanced system uses appropriate gas, pressure, temperature, line resistance, and clean components to deliver the intended pour."
      },
      {
        eyebrow: "Cleaning",
        title: "Dirty lines rewrite the beer",
        detail:
          "Regular line and faucet cleaning prevents buildup and off flavors; the Cicerone syllabus and BA guidance call for a 14-day line-cleaning cycle."
      },
      {
        eyebrow: "Glassware",
        title: "Beer-clean glass protects foam and aroma",
        detail:
          "Clean, residue-free glassware supports stable foam and lets the guest see, smell, and taste the beer without outside interference."
      },
      {
        eyebrow: "Pour",
        title: "Foam is part of presentation",
        detail:
          "An appropriate pour manages the glass angle, flow, and final head for the beer and service format rather than trying to eliminate foam."
      },
      {
        eyebrow: "Hospitality",
        title: "Translate style and strength responsibly",
        detail:
          "Servers communicate flavor, freshness, allergens or ingredients when relevant, serving size, and ABV while watching guest wellbeing."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 7,
        text:
          "The brewery’s work reaches the guest through a final machine and a final human. Both must understand the beer they are carrying."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Now read the glass: appearance, aroma, taste, mouthfeel, and finish reconnect every room we visited."
      },
      {
        speaker: "Hummin",
        durationSeconds: 6,
        text:
          "Date code, keg temperature, line-cleaning record, gas setting, glass check, and guest feedback complete the system memory."
      }
    ]
  }
];

const breweryExpansionScenesByAnchor: Partial<Record<string, BeyondTheGlassScene[]>> = {
  "brewery-wort-chiller": [
    {
      id: "brewery-hygiene-gate",
      number: "",
      title: "The Hygiene Gate",
      range: [0, 0],
      eyebrow: "Quality system · Cleaning and sanitation",
      summary:
        "A validated cleaning loop protects cooled wort and beer before either reaches the next vessel.",
      checkpoint: "Clean before culture",
      motion: "cutaway",
      artwork: breweryArtwork(
        "brewery-hygiene-cip",
        "A cutaway SIP Academy brewery hygiene room with separate rinse, cleaning, and sanitizing vessels connected through a closed return manifold, spray device, hose station, and verification bench."
      ),
      landmark: { label: "Cleaning loop", x: 50, y: 47 },
      drop: { x: 68, y: 61, size: 6 },
      fieldNotes: [
        {
          eyebrow: "Sequence",
          title: "Cleaning and sanitizing are different jobs",
          detail:
            "Cleaning removes soil and residue; sanitizing reduces microorganisms on an already clean surface. A brewery verifies both rather than treating one word as the whole program."
        },
        {
          eyebrow: "CIP loop",
          title: "The return tells the operator what happened",
          detail:
            "A clean-in-place circuit moves a controlled solution through tanks, pipework, valves, and spray devices, then returns it for monitored concentration, temperature, time, and flow."
        },
        {
          eyebrow: "Design",
          title: "Hygienic equipment leaves fewer hiding places",
          detail:
            "Drainability, sound seals, suitable surface condition, complete spray coverage, and avoiding stagnant pockets make a repeatable cleaning result easier to achieve."
        },
        {
          eyebrow: "Verification",
          title: "A completed cycle is not automatic proof",
          detail:
            "Visual inspection, rinse checks, ATP or other rapid screening, and targeted microbiological testing can verify the brewery's program according to its risk plan."
        },
        {
          eyebrow: "Boundary",
          title: "Cold-side connections stay protected",
          detail:
            "Sanitized hoses, fittings, sample ports, and receiving vessels help protect cooled wort and finished beer during every transfer."
        },
        {
          eyebrow: "Safety",
          title: "Chemistry requires controlled handling",
          detail:
            "Trained staff use documented chemicals, compatible equipment, segregation, ventilation, protective equipment, and lockout procedures instead of improvising a cleaning mix."
        }
      ],
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text:
            "At the cold-side gate, the next flavor decision is invisible: make every product-contact surface ready before the culture arrives."
        },
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "I connect cycle recipe, return condition, inspection, verification, and corrective action. A green light alone is not the record."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "Clean beer tastes like the intended recipe. Contamination writes a different recipe after the brewer has finished."
        }
      ]
    }
  ],
  "brewery-fermentation-hall": [
    {
      id: "brewery-fermentation-paths",
      number: "",
      title: "Fermentation Paths",
      range: [0, 0],
      eyebrow: "Culture · Temperature · Vessel",
      summary:
        "Ale, lager, open-fermented, and mixed-culture programs use different organisms, vessels, temperatures, and custody plans.",
      checkpoint: "One wort, different futures",
      motion: "orbit",
      artwork: breweryArtwork(
        "fermentation-paths",
        "A radial SIP Academy fermentation hall comparing closed ale tanks, cool lager tanks and conditioning tunnel, selected open fermenters, and a physically separated mixed-culture wood cellar around a central yeast laboratory."
      ),
      landmark: { label: "Fermentation crossroads", x: 50, y: 49 },
      drop: { x: 51, y: 64, size: 7 },
      fieldNotes: [
        {
          eyebrow: "Ale path",
          title: "Warm is relative, not a universal set point",
          detail:
            "Many ale strains ferment warmer than lager strains and may express noticeable esters or phenols, but the brewer follows the selected culture and desired beer rather than a single ale temperature."
        },
        {
          eyebrow: "Lager path",
          title: "Cool fermentation continues into cold time",
          detail:
            "Lager programs commonly pair a suitable strain and cooler fermentation with maturation that supports cleanup, settling, flavor integration, and stability."
        },
        {
          eyebrow: "Open vessel",
          title: "Open fermentation is a controlled choice",
          detail:
            "Some breweries use shallow or open vessels for selected traditions and strains while controlling room hygiene, air, foam, collection, and transfer exposure."
        },
        {
          eyebrow: "Mixed culture",
          title: "Mixed is not the same as spontaneous",
          detail:
            "A mixed-culture beer may be deliberately inoculated with selected yeast and bacteria; spontaneous fermentation relies on environmental capture under its own tightly managed program."
        },
        {
          eyebrow: "Separation",
          title: "House cultures need physical and procedural borders",
          detail:
            "Dedicated hoses, tools, vessels, testing, scheduling, and traffic patterns can protect clean beer from organisms intentionally used elsewhere."
        }
      ],
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text:
            "Fermentation has branches. The honest lesson is not ale versus lager—it is culture, vessel, temperature, time, and the boundaries that keep each program true."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "Fruit, spice, sulfur, acidity, dryness, and texture can be fingerprints of a chosen path, not automatic signs of quality or fault."
        },
        {
          speaker: "Hummin",
          durationSeconds: 7,
          text:
            "I store each branch separately: organism, generation, pitch, temperature curve, vessel, gravity, sensory result, and release decision."
        }
      ]
    }
  ],
  "brewery-conditioning-brite": [
    {
      id: "brewery-wood-wild-time",
      number: "",
      title: "Wood, Culture, and Time",
      range: [0, 0],
      eyebrow: "Specialist cellar · Optional routes",
      summary:
        "Foeders, barrels, mixed cultures, blending, and bottle conditioning create specialist routes that demand patient, separated custody.",
      checkpoint: "Time becomes an ingredient",
      motion: "glide",
      artwork: breweryArtwork(
        "mixed-culture-cellar",
        "A SIP Academy specialist beer cellar with a central foeder cutaway, smaller barrels, an isolated coolship alcove, blending bench, bottle-conditioning rack, and a clean stainless reference tank."
      ),
      landmark: { label: "Cellar foeder", x: 50, y: 44 },
      drop: { x: 61, y: 64, size: 7 },
      fieldNotes: [
        {
          eyebrow: "Vessel scale",
          title: "A foeder and a barrel do not age beer the same way",
          detail:
            "Vessel size, shape, wood condition, previous contents, headspace, and cellar environment change surface contact, oxygen exposure, extraction, and resident microbiology."
        },
        {
          eyebrow: "Wood history",
          title: "The previous occupant leaves a clue",
          detail:
            "Newer wood can contribute more wood-derived character; used wine or spirit casks may carry both residual flavor and microbiological risk that the brewer evaluates deliberately."
        },
        {
          eyebrow: "Culture",
          title: "Slow transformation needs its own monitoring plan",
          detail:
            "Mixed yeast and bacteria can change acidity, attenuation, aroma, and texture over months or years, so tasting and analysis continue throughout aging."
        },
        {
          eyebrow: "Blending",
          title: "The final beer may be assembled, not discovered",
          detail:
            "Blenders compare age, acidity, aroma, texture, and stability, then combine components to reach a coherent target while preserving lot traceability."
        },
        {
          eyebrow: "Bottle conditioning",
          title: "A package can host a final fermentation",
          detail:
            "Selected beers receive measured fermentable material and viable culture for in-package carbonation; pressure, uniformity, stability, and storage require professional control."
        },
        {
          eyebrow: "Custody",
          title: "Specialist beer stays separated and identified",
          detail:
            "Dedicated equipment, sample plans, package checks, and explicit release criteria keep a creative cellar from becoming an uncontrolled source of variation."
        }
      ],
      narration: [
        {
          speaker: "Roma",
          durationSeconds: 8,
          text:
            "This cellar rewards patience. Wood, microbes, oxygen, fruit, and time can build complexity, but none of them excuses a muddy result."
        },
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "Every vessel keeps an identity: fill, source beer, culture, wood history, samples, losses, blend destination, and package condition."
        },
        {
          speaker: "Sippy",
          durationSeconds: 7,
          text:
            "Treat this as an optional wing of the brewery, not a rule every beer must follow. Freshness is still the correct destination for many styles."
        }
      ]
    }
  ],
  "brewery-quality-lab": [
    {
      id: "brewery-style-compass",
      number: "",
      title: "The Beer Style Compass",
      range: [0, 0],
      eyebrow: "Sensory map · Families, not fences",
      summary:
        "Six comparison stations connect raw materials and process choices to recognizable sensory families without turning style into a rigid recipe.",
      checkpoint: "Process becomes pattern",
      motion: "orbit",
      artwork: breweryArtwork(
        "beer-style-compass",
        "A circular SIP Academy beer observatory with six distinct sensory stations for crisp pale lager, hop-forward beer, malt-led amber beer, wheat or farmhouse beer, dark roast beer, and tart or mixed-culture beer."
      ),
      landmark: { label: "Style compass", x: 50, y: 50 },
      drop: { x: 50, y: 64, size: 7 },
      fieldNotes: [
        {
          eyebrow: "Crisp and pale",
          title: "Fermentation precision can foreground delicacy",
          detail:
            "Pale lager families often balance light-colored malt, restrained fermentation character, hop structure, carbonation, and a clean finish, with many regional variations."
        },
        {
          eyebrow: "Hop-forward",
          title: "Bitterness is only one axis of hop expression",
          detail:
            "Hop-led pale ales and IPAs can emphasize aroma, flavor, bitterness, fermentation profile, body, clarity, or haze in different combinations."
        },
        {
          eyebrow: "Malt-led",
          title: "Color does not tell the whole malt story",
          detail:
            "Amber and brown families may feature bread, toast, caramel, nut, or dried-fruit impressions, but balance, attenuation, roast, and hop structure still vary."
        },
        {
          eyebrow: "Wheat and farmhouse",
          title: "Grain and fermentation share the spotlight",
          detail:
            "Wheat-led and farmhouse traditions can use distinctive grists, cultures, spices, hopping, carbonation, and service customs; the family name does not guarantee one flavor."
        },
        {
          eyebrow: "Dark and roast",
          title: "Roast can range from cocoa to coffee to char",
          detail:
            "Porter and stout families coordinate dark malt, bitterness, sweetness, body, fermentation, and strength instead of relying on color alone."
        },
        {
          eyebrow: "Tart, wild, and sour",
          title: "Acidity needs origin and balance",
          detail:
            "Kettle-soured, mixed-culture, spontaneous, fruit, and wood-aged beers can reach acidity by different routes; a sour taste alone does not identify the process."
        }
      ],
      narration: [
        {
          speaker: "Roma",
          durationSeconds: 8,
          text:
            "A style name is a useful searchlight, not a prison. Compare appearance, aroma, flavor, mouthfeel, balance, strength, and process clues together."
        },
        {
          speaker: "Sippy",
          durationSeconds: 7,
          text:
            "Use the compass to ask a better question: what did this brewer intend, and which connected choices made that intent legible?"
        },
        {
          speaker: "Hummin",
          durationSeconds: 7,
          text:
            "Family, substyle, declared specialty ingredients, measured parameters, and sensory notes remain separate fields in the archive."
        }
      ]
    },
    {
      id: "brewery-sustainability-loop",
      number: "",
      title: "The Brewery Gives Back",
      range: [0, 0],
      eyebrow: "Systems · Resources and byproducts",
      summary:
        "Water, heat, carbon dioxide, spent grain, wastewater, packaging, and transport become measurable responsibility loops.",
      checkpoint: "Measure before claiming",
      motion: "reassemble",
      artwork: breweryArtwork(
        "brewery-sustainability-loop",
        "An open-air SIP Academy brewery utility court connecting heat recovery, water metering, wastewater treatment, conditional spent-grain reuse, optional carbon-dioxide recovery, packaging, logistics, and a central monitoring hub."
      ),
      landmark: { label: "Resource loop", x: 50, y: 49 },
      drop: { x: 42, y: 63, size: 7 },
      fieldNotes: [
        {
          eyebrow: "Benchmark",
          title: "Track intensity before celebrating an improvement",
          detail:
            "Breweries compare water, energy, wastewater, solid waste, and emissions against production over time so a larger or smaller batch does not hide performance."
        },
        {
          eyebrow: "Heat",
          title: "The hottest streams can serve the next task",
          detail:
            "Heat recovered from wort cooling, steam systems, refrigeration, or hot water may reduce the energy needed elsewhere when engineering and food-safety boundaries allow."
        },
        {
          eyebrow: "Water",
          title: "Use, reuse, and discharge are different decisions",
          detail:
            "Metering reveals demand; suitable reuse requires a defined quality and purpose; high-strength brewery wastewater still needs controlled treatment and discharge."
        },
        {
          eyebrow: "Spent grain",
          title: "A byproduct needs an approved destination",
          detail:
            "Spent grain may support feed, food, compost, digestion, or other local routes when storage, contamination control, regulation, and the receiving partner make the use appropriate."
        },
        {
          eyebrow: "Carbon dioxide",
          title: "Recovery is possible, not automatic",
          detail:
            "Some breweries capture and purify fermentation carbon dioxide; equipment, quality verification, scale, energy, and economics determine whether reuse is suitable."
        },
        {
          eyebrow: "Package and route",
          title: "Material and distance belong in the same map",
          detail:
            "Package weight, recycled content, breakage, return systems, pallet efficiency, refrigeration, and delivery distance all affect the final footprint."
        }
      ],
      narration: [
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text:
            "I do not store a green badge. I store water, energy, waste, emissions, destination, baseline, and the verified change."
        },
        {
          speaker: "Sippy",
          durationSeconds: 7,
          text:
            "Circular thinking begins with honest boundaries. A resource has not been recovered until its next safe use is real."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "Efficiency protects flavor too: stable cooling, clean water, sound packages, and a dependable cold chain are quality decisions."
        }
      ]
    }
  ],
  "brewery-packaging-cold-chain": [
    {
      id: "brewery-beer-passport",
      number: "",
      title: "The Beer Passport",
      range: [0, 0],
      eyebrow: "Identity · Package and lot",
      summary:
        "The finished package connects truthful product identity, strength, format, date, lot, and destination to the batch behind it.",
      checkpoint: "Beer becomes traceable",
      motion: "glide",
      artwork: breweryArtwork(
        "beer-passport-market",
        "A SIP Academy package inspection hall with unlabeled cans, a brown bottle, and a keg connected to closure inspection, abstract code scanning, cold warehouse, refrigerated delivery, retail cooler, and restaurant receiving."
      ),
      landmark: { label: "Package passport", x: 50, y: 55 },
      drop: { x: 58, y: 66, size: 6 },
      fieldNotes: [
        {
          eyebrow: "Identity",
          title: "Read class, type, and strength before the story",
          detail:
            "Product identity, alcohol content, net contents, producer or bottler information, and required statements anchor the package before optional style or marketing language."
        },
        {
          eyebrow: "Date and lot",
          title: "A useful code points backward and forward",
          detail:
            "A legible lot or date system links the package to filling conditions and retained samples while helping warehouses, retailers, and guests manage freshness."
        },
        {
          eyebrow: "Format",
          title: "Can, bottle, and keg carry different risks",
          detail:
            "Seam or closure integrity, light protection, internal pressure, transport damage, reusable-keg cleaning, and dispensing custody vary by package."
        },
        {
          eyebrow: "Claims",
          title: "Optional language still has to be truthful",
          detail:
            "Style, origin, process, ingredient, freshness, and sustainability claims require support and may face different rules in different markets."
        },
        {
          eyebrow: "Recall path",
          title: "Traceability is designed before a problem",
          detail:
            "Batch, package, pallet, customer, and disposition records make a targeted investigation or withdrawal possible without guessing which beer moved where."
        }
      ],
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text:
            "The beer passport lets a guest read forward and a brewery trace backward. Identity and custody meet on one package."
        },
        {
          speaker: "Hummin",
          durationSeconds: 7,
          text:
            "Batch, tank, filler, seam or closure, code, pallet, warehouse, account, and retained sample form one searchable chain."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text:
            "Fresh beer should not need detective work, but the code tells me whether the market treated freshness as part of the product."
        }
      ]
    },
    {
      id: "brewery-market-custody",
      number: "",
      title: "Cold Chain to Menu",
      range: [0, 0],
      eyebrow: "Commercial chain · Warehouse, retail, restaurant",
      summary:
        "Storage, light, time, transport, rotation, receiving, and menu knowledge determine whether the intended beer reaches the guest.",
      checkpoint: "Package to account",
      motion: "push-in",
      artwork: breweryArtwork(
        "brewery-market-custody",
        "A wide SIP Academy beer custody route from package inspection through refrigerated warehouse and delivery to a retail cooler and restaurant receiving station."
      ),
      landmark: { label: "Market custody", x: 71, y: 49 },
      drop: { x: 70, y: 63, size: 6 },
      fieldNotes: [
        {
          eyebrow: "Warehouse",
          title: "First in, first out needs a freshness purpose",
          detail:
            "Receipts, dates, storage zones, temperature, damage checks, and inventory rotation should match the beer's stability and the brewery's release expectations."
        },
        {
          eyebrow: "Transport",
          title: "Warm time accumulates",
          detail:
            "Loading, route duration, truck condition, delivery windows, and account storage can accelerate flavor change even when the package looks intact."
        },
        {
          eyebrow: "Light",
          title: "Protect hop-derived compounds from damaging exposure",
          detail:
            "Opaque packages and closed cases offer strong protection; brown glass protects more effectively than clear or green glass but still benefits from careful display."
        },
        {
          eyebrow: "Retail",
          title: "A cooler is only useful when it is managed",
          detail:
            "Temperature, cleanliness, lighting, shelf position, date rotation, and staff understanding shape the condition and discoverability of packaged beer."
        },
        {
          eyebrow: "Restaurant",
          title: "Receiving begins the draught or table record",
          detail:
            "Staff check delivery condition, date, temperature, keg identity, storage capacity, line assignment, menu description, and intended service rate."
        },
        {
          eyebrow: "Feedback",
          title: "The commercial chain can report back",
          detail:
            "Returns, sensory complaints, slow-moving stock, foaming, package damage, and guest response help the brewery distinguish production issues from custody failures."
        }
      ],
      narration: [
        {
          speaker: "Roma",
          durationSeconds: 8,
          text:
            "Freshness has a route. Warm storage, bright light, slow rotation, or a forgotten keg can erase the hop and fermentation detail we followed."
        },
        {
          speaker: "Hummin",
          durationSeconds: 7,
          text:
            "Warehouse, shipment, delivery, account, cooler, keg, line, menu, return: the market is the last production record."
        },
        {
          speaker: "Sippy",
          durationSeconds: 7,
          text:
            "Commercial success and product integrity are not separate lessons. The right beer must reach the right place in sound condition."
        }
      ]
    }
  ]
};

const sequencedBreweryScenes: BeyondTheGlassScene[] = breweryScenes
  .flatMap((scene) => [scene, ...(breweryExpansionScenesByAnchor[scene.id] ?? [])])
  .map((scene, index, allScenes) => ({
    ...scene,
    number: String(index + 1).padStart(2, "0"),
    range: [index / allScenes.length, (index + 1) / allScenes.length]
  }));

export const breweryFieldTrip: BeyondTheGlassChapter = {
  slug: "brewery",
  title: "Beyond The Glass",
  chapterTitle: "Beer · From Grain to Tap",
  subject: "Brewery field trip",
  description:
    "A visual SIP Academy brewery adventure following water, malt, hops, yeast, brewhouse equipment, fermentation, quality, packaging, freshness, and service.",
  coreMessage:
    "Every pint contains a connected system: ingredients, vessels, microbes, measurements, people, distribution, and the final guest experience.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/brewery/brewery-opening-960.webp"
  },
  scenes: sequencedBreweryScenes,
  sources: [
    {
      id: "cicerone-cbs-syllabus-v6",
      organization: "Cicerone Certification Program",
      title: "Certified Beer Server Syllabus, Version 6.0",
      url: "https://www.cicerone.org/sites/default/files/resources/US_English_CBS_Syllabus_V6.0_0.pdf",
      note:
        "Primary education spine for ingredients, brewing-process sequence, beer evaluation, storage, draught systems, glassware, and service."
    },
    {
      id: "ba-brewhouse-resources",
      organization: "Brewers Association",
      title: "Brewhouse Resource Hub",
      url: "https://www.brewersassociation.org/resource-hub/brewhouse/",
      note:
        "Supports the professional framing of mash, lauter, boil, pH, oxygen, stability, and brewhouse operations."
    },
    {
      id: "ba-water-resources",
      organization: "Brewers Association",
      title: "Brewing Water Resource Hub",
      url: "https://www.brewersassociation.org/resource-hub/water/",
      note:
        "Supports brewing-water quality, treatment, mineral, and process-control framing."
    },
    {
      id: "ba-malt-resources",
      organization: "Brewers Association",
      title: "Malt Resource Hub",
      url: "https://www.brewersassociation.org/resource-hub/malt/",
      note:
        "Supports malt selection, malting, malt flavor, analysis, and raw-material quality framing."
    },
    {
      id: "ba-beer-quality",
      organization: "Brewers Association",
      title: "Beer Quality Training",
      url: "https://www.brewersassociation.org/online-courses/beer-quality/",
      note:
        "Supports the quality-system structure connecting physical, chemical, microbiological, packaging, and sensory checks."
    },
    {
      id: "ba-packaging-resources",
      organization: "Brewers Association",
      title: "Packaging Resource Hub",
      url: "https://www.brewersassociation.org/resource-hub/packaging/",
      note:
        "Supports package integrity, oxygen control, freshness, can seams, bottles, kegs, and packaging-quality framing."
    },
    {
      id: "ba-draught-quality-manual",
      organization: "Brewers Association",
      title: "Draught Beer Quality Manual",
      url: "https://www.brewersassociation.org/educational-publications/draught-beer-quality-manual/",
      note:
        "Supports cold storage, gas, draught-system components, cleaning, glassware, and retail service practices."
    },
    {
      id: "ttb-malt-beverage-labeling",
      organization: "Alcohol and Tobacco Tax and Trade Bureau",
      title: "Beer and Malt Beverage Labeling and Formulation Approval",
      url: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/beer/labeling-and-formulation",
      note:
        "Supports United States malt-beverage product identity, formula, label, and health-warning context; jurisdiction-specific claims require separate review."
    },
    {
      id: "ba-engineering-hub",
      organization: "Brewers Association",
      title: "Engineering Resource Hub",
      url: "https://www.brewersassociation.org/engineering/",
      note:
        "Professional brewery reference linking cleaning, sanitation, food safety, quality, wastewater, energy, solid waste, maintenance, and worker-safety resources used by the Hygiene Gate and systems scenes."
    },
    {
      id: "ba-quality-hub",
      organization: "Brewers Association",
      title: "Quality Resource Hub",
      url: "https://www.brewersassociation.org/resource-hub/quality/",
      note:
        "Professional reference for preventive quality programs, laboratory, microbiology, sensory, carbon-dioxide quality, food safety, and keeping-quality work."
    },
    {
      id: "ba-sustainability-benchmarking",
      organization: "Brewers Association",
      title: "Sustainability Benchmarking Reports",
      url: "https://www.brewersassociation.org/educational-publications/sustainability-benchmarking-reports/",
      note:
        "Primary industry benchmarking reference for water-use efficiency, wastewater and solid-waste reduction, energy use, and greenhouse-gas tracking without substituting claims for measured performance."
    },
    {
      id: "bjcp-2021-guidelines",
      organization: "Beer Judge Certification Program",
      title: "2021 Beer Style Guidelines",
      url: "https://www.bjcp.org/style/2021/guidelines/",
      note:
        "Current BJCP education reference used to compare sensory families and specialty declarations while preserving the distinction between competition groupings, regional traditions, and brewery-specific expression."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
