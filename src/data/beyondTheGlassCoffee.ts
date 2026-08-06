import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const coffeeArtwork = (
  slug: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/coffee/${slug}-1600.webp`,
  srcSet:
    `/beyond-the-glass/coffee/${slug}-960.webp 960w, ` +
    `/beyond-the-glass/coffee/${slug}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/coffee/${slug}-portrait-960.webp`,
  portraitSrcSet:
    `/beyond-the-glass/coffee/${slug}-portrait-640.webp 640w, ` +
    `/beyond-the-glass/coffee/${slug}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  position: "center",
  portraitPosition: "center",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

type CoffeeSceneSeed = Omit<BeyondTheGlassScene, "number" | "range">;

const coffeeSceneSeeds: CoffeeSceneSeed[] = [
  {
    id: "coffee-academy-gate",
    title: "The Coffee Academy Gate",
    eyebrow: "SIP Academy · Coffee",
    summary:
      "Coffee terraces, a seed conservatory, processing mill, roastery, tasting library, and café wake around the Academy canals.",
    checkpoint: "Academy to coffee lands",
    motion: "establish",
    artwork: coffeeArtwork(
      "coffee-academy-gate",
      "Sippy, Roma, and Hummin enter the brass-and-glass SIP Academy coffee wing at sunrise, with coffee terraces, nursery, mill, roastery, tasting library, café, and luminous blue canals visible around them."
    ),
    landmark: { label: "Coffee Academy gate", x: 50, y: 50 },
    drop: { x: 51, y: 63, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Plant",
        title: "Coffee begins as a living seed",
        detail:
          "A coffee bean is the seed inside a fruit. Species, variety, planting material, site, and farm care begin shaping the lot long before roasting."
      },
      {
        eyebrow: "Fruit",
        title: "The cherry protects two seeds most of the time",
        detail:
          "Skin, pulp, mucilage, parchment, and silverskin surround the seed. Processing removes those layers in different sequences."
      },
      {
        eyebrow: "People",
        title: "Quality crosses many hands",
        detail:
          "Nursery teams, growers, pickers, millers, exporters, importers, roasters, quality staff, and baristas each control a different handoff."
      },
      {
        eyebrow: "System",
        title: "Trace the decisions, not a single recipe",
        detail:
          "Species, climate, harvest, process, drying, storage, roast, grind, water, brewing, and service interact; no isolated step guarantees the cup."
      },
      {
        eyebrow: "Guest",
        title: "The final cup carries the full route",
        detail:
          "A café can reveal origin and craft only when freshness, equipment, water, recipe control, hospitality, and accurate communication work together."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Welcome to the coffee wing. We will follow one seed through farm, mill, trade, roast, brew, and the final guest handoff."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "I am tracing the flavor clues: flower, ripe fruit, fermentation, browning, extraction, texture, and finish."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "I will hold the record: variety, lot, moisture, roast, particle size, water, extraction, and service."
      }
    ]
  },
  {
    id: "coffee-system-map",
    title: "From Seed to Service",
    eyebrow: "Learning map",
    summary:
      "One connected field atlas links plant, fruit, green coffee, roasted coffee, ground coffee, beverage, and guest.",
    checkpoint: "See the whole system",
    motion: "glide",
    artwork: coffeeArtwork(
      "coffee-academy-gate",
      "A complete SIP Academy coffee map linking seed nursery, highland farm, processing and drying stations, dry mill, export warehouse, roastery, quality lab, brew bar, and café."
    ),
    landmark: { label: "Coffee system map", x: 50, y: 42 },
    drop: { x: 48, y: 58, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Farm",
        title: "Seed, nursery, site, tree",
        detail:
          "Healthy and traceable planting material meets local climate, soil, shade, nutrition, water, pests, pruning, and the grower’s production goals."
      },
      {
        eyebrow: "Postharvest",
        title: "Cherry becomes stable green coffee",
        detail:
          "Harvest, separation, depulping choices, fermentation, washing choices, drying, resting, hulling, sorting, and storage determine what reaches the roaster."
      },
      {
        eyebrow: "Trade",
        title: "The lot moves with records",
        detail:
          "Identity, physical condition, contracts, samples, packaging, warehousing, and transport connect producers with buyers while protecting quality."
      },
      {
        eyebrow: "Roastery",
        title: "Heat transforms the seed",
        detail:
          "The roaster manages heat, airflow, time, batch behavior, cooling, quality control, and packaging for the intended brewing context."
      },
      {
        eyebrow: "Café",
        title: "Grind, water, recipe, service",
        detail:
          "Brewing controls extraction and strength; service adds equipment care, milk or dilution choices, communication, and hospitality."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Read the map forward, then backward. Every cup can be traced to a field decision, and every field decision needs a route to value."
      }
    ]
  },
  {
    id: "coffee-seed-nursery",
    title: "The Seed and Nursery",
    eyebrow: "Planting material",
    summary:
      "A seed lot becomes a nursery population only through identity, germination, sanitation, selection, and careful establishment.",
    checkpoint: "Seed to seedling",
    motion: "cutaway",
    artwork: coffeeArtwork(
      "coffee-farm-lifecycle",
      "A layered coffee nursery cutaway showing labeled seed lots without text, germination beds, roots, cotyledon-stage seedlings, healthy young plants under shade, and field-ready coffee plants."
    ),
    landmark: { label: "Seed nursery", x: 27, y: 43 },
    drop: { x: 42, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Species",
        title: "Arabica and canephora are not interchangeable",
        detail:
          "Coffea arabica and Coffea canephora are the two species in wide commercial cultivation; their reproductive biology, diversity, agronomy, and cup potential differ."
      },
      {
        eyebrow: "Variety",
        title: "Choose for the real site",
        detail:
          "Yield potential, stature, maturity, quality potential, altitude fit, nutrition needs, and resistance or susceptibility all matter in variety selection."
      },
      {
        eyebrow: "Identity",
        title: "Traceability begins before planting",
        detail:
          "Seed source and nursery labeling help preserve genetic identity and let growers match planting material to recommendations and field plans."
      },
      {
        eyebrow: "Roots",
        title: "A seedling is more than its leaves",
        detail:
          "Balanced roots, healthy foliage, suitable media, water management, shade, and sanitation support survival after transplanting."
      },
      {
        eyebrow: "Selection",
        title: "Uniform does not mean identical destiny",
        detail:
          "Nursery teams remove unhealthy or off-type plants, but field performance still depends on environment, management, and the quality of establishment."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "The first record is the seed lot. Identity lost in the nursery cannot be reconstructed from the roasted cup."
      }
    ]
  },
  {
    id: "coffee-genetics-atlas",
    title: "Species, Variety, and Planting Material",
    eyebrow: "Genetics · Farm fit",
    summary:
      "Species, variety, breeding history, propagation, and verified planting material shape what a coffee tree can express and withstand.",
    checkpoint: "Identity before planting",
    motion: "cutaway",
    artwork: coffeeArtwork(
      "coffee-genetics-resilience",
      "A SIP Academy botanical atlas showing adult Arabica and canephora coffee trees, open coffee flowers and cherries, seed and clonal nursery pathways, root systems, variety trial rows, and a climate-resilience field station without printed labels."
    ),
    landmark: { label: "Coffee genetics atlas", x: 48, y: 41 },
    drop: { x: 49, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Species",
        title: "Arabica and canephora hold different toolkits",
        detail:
          "Coffea arabica and Coffea canephora differ in genetics, reproductive behavior, field adaptation, plant form, disease response, and sensory potential. Neither species has one universal flavor profile."
      },
      {
        eyebrow: "Variety",
        title: "A variety is more than a famous name",
        detail:
          "Variety choice links yield, stature, maturity, cup-quality potential, nutrition demand, altitude fit, and resistance or susceptibility to local threats."
      },
      {
        eyebrow: "Breeding",
        title: "Selections, introgression, and F1 hybrids solve different problems",
        detail:
          "Traditional selection, crosses, introgressed rust-resistant material, and F1 hybrids can combine traits differently; performance still depends on the site and management."
      },
      {
        eyebrow: "Propagation",
        title: "Seed and clonal routes need different controls",
        detail:
          "Arabica is commonly raised from seed, while canephora may be propagated clonally. The propagation route affects uniformity, genetic diversity, nursery practice, and traceability."
      },
      {
        eyebrow: "Purity",
        title: "The label must match the plant",
        detail:
          "Seed-lot isolation, source records, careful handling, plant health, and genetic verification help a grower receive the variety and performance they intended to buy."
      },
      {
        eyebrow: "Trial",
        title: "Local evidence outranks reputation",
        detail:
          "Multi-location and on-farm trials test how planting material responds to real soils, temperature, rainfall, pests, crop load, management, and market goals."
      },
      {
        eyebrow: "Diversity",
        title: "Genetic diversity is future capacity",
        detail:
          "Conserving and using diverse coffee genetic resources gives breeders and farming communities more options as climate and disease pressure change."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Before terroir can speak, the plant needs an identity. Species, variety, propagation, and verified nursery records define the possibilities that enter the field."
      }
    ]
  },
  {
    id: "coffee-farm-ecology",
    title: "The Living Coffee Farm",
    eyebrow: "Agronomy · Place",
    summary:
      "Coffee trees share a living site with soil, roots, shade, rain, sun, wind, pests, diseases, workers, and neighboring ecosystems.",
    checkpoint: "Site to healthy tree",
    motion: "orbit",
    artwork: coffeeArtwork(
      "coffee-farm-lifecycle",
      "An interactive highland coffee farm atlas with soil and roots visible below ground, coffee trees at multiple growth stages, shade trees, irrigation and drainage, weather, coffee leaf rust, berry borer monitoring, pruning, and workers scouting the field."
    ),
    landmark: { label: "Living farm", x: 47, y: 47 },
    drop: { x: 38, y: 60, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Site",
        title: "Climate and elevation are context, not flavor labels",
        detail:
          "Temperature, rainfall pattern, solar exposure, wind, topography, and elevation influence development and risk, but their effects depend on variety and management."
      },
      {
        eyebrow: "Soil",
        title: "Roots need air, water, nutrients, and space",
        detail:
          "Soil structure, drainage, organic matter, fertility, biology, and rooting depth affect tree health; growers diagnose the site rather than treating soil type as a tasting note."
      },
      {
        eyebrow: "Shade",
        title: "Shade changes the farm microclimate",
        detail:
          "Shade trees can affect temperature, light, moisture, habitat, and farm products, but density and species must fit local production and disease conditions."
      },
      {
        eyebrow: "Canopy",
        title: "Pruning balances renewal and access",
        detail:
          "Canopy management supports productive wood, airflow, light distribution, manageable height, harvest access, and the farm’s chosen production cycle."
      },
      {
        eyebrow: "Risks",
        title: "Rust and berry borer require integrated attention",
        detail:
          "Coffee leaf rust is a fungal disease and coffee berry borer is an insect pest. Monitoring, sanitation, resistant material, cultural practices, and locally approved controls work as a system."
      },
      {
        eyebrow: "People",
        title: "Agronomy is repeated observation",
        detail:
          "Scouting, records, worker knowledge, soil and leaf analysis where appropriate, weather awareness, and timely action are more useful than a one-size recipe."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "A coffee farm is not scenery around the bean. It is the living production system that makes the fruit possible."
      }
    ]
  },
  {
    id: "coffee-farm-resilience",
    title: "The Resilient Coffee Farm",
    eyebrow: "Agroecology · Risk",
    summary:
      "Shade, soil cover, nutrition, pruning, water, biodiversity, and integrated pest and disease management form one adaptive farm system.",
    checkpoint: "Manage the whole field",
    motion: "orbit",
    artwork: coffeeArtwork(
      "coffee-genetics-resilience",
      "A layered coffee agroforestry field atlas showing shade trees, windbreaks, ground cover, pruned coffee trees, soil organic matter, water infiltration, beneficial habitat, coffee leaf rust monitoring, and careful worker observation without printed labels."
    ),
    landmark: { label: "Resilient coffee farm", x: 58, y: 45 },
    drop: { x: 39, y: 61, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Shade",
        title: "Shade is a site-specific climate tool",
        detail:
          "Tree species, density, architecture, rainfall, cloud cover, altitude, wind, and production goals determine whether shade moderates heat and water stress or becomes excessive competition."
      },
      {
        eyebrow: "Soil",
        title: "Protect the living root zone",
        detail:
          "Ground cover, organic inputs, erosion control, drainage, traffic management, and nutrient decisions protect structure, biology, water movement, and root access."
      },
      {
        eyebrow: "Water",
        title: "Read rainfall, storage, and plant demand together",
        detail:
          "Mulch, shade, infiltration, irrigation where appropriate, drainage, and crop load all influence water status; one rainfall total cannot describe the farm."
      },
      {
        eyebrow: "Architecture",
        title: "Pruning renews productive wood",
        detail:
          "Stumping, rejuvenation, height control, sucker management, spacing, and harvest access are long-term decisions about light, labor, disease pressure, and future crop."
      },
      {
        eyebrow: "Rust",
        title: "Coffee leaf rust needs integrated management",
        detail:
          "Variety susceptibility, plant nutrition, shade and humidity, field monitoring, sanitation, renovation, local forecasting, and approved controls must be combined for the real farm."
      },
      {
        eyebrow: "Pests",
        title: "Observe before acting",
        detail:
          "Coffee berry borer and other pests require correct identification, monitoring, harvest sanitation, habitat and cultural controls, and locally authorized interventions rather than a universal spray calendar."
      },
      {
        eyebrow: "Climate",
        title: "Resilience is an evolving plan",
        detail:
          "Heat, irregular flowering rains, drought, intense storms, landslides, and shifting pest pressure can change together, so growers adapt planting material, shade, soil, water, and farm economics as a system."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "A resilient farm is not one miracle input. It is a connected plan for roots, canopy, water, biodiversity, plant health, labor, and the next season."
      }
    ]
  },
  {
    id: "coffee-flower-cherry",
    title: "Flower to Ripe Cherry",
    eyebrow: "Plant development",
    summary:
      "Flowering, fruit set, seed development, and ripening unfold on a tree whose harvest may contain more than one maturity stage.",
    checkpoint: "Flower to fruit",
    motion: "reassemble",
    artwork: coffeeArtwork(
      "coffee-farm-lifecycle",
      "A deconstructed coffee branch timeline showing buds, white coffee flowers, early green fruit, expanding cherries, yellow-to-red ripening fruit, leaves, nodes, and the two seeds inside a ripe cherry."
    ),
    landmark: { label: "Flower and cherry", x: 58, y: 42 },
    drop: { x: 64, y: 61, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Flower",
        title: "Rain and weather can synchronize flowering",
        detail:
          "Flowering response and fruit set depend on plant condition and local weather; uneven flowering can produce multiple ripeness stages on one tree."
      },
      {
        eyebrow: "Fruit set",
        title: "Not every flower becomes a harvestable cherry",
        detail:
          "Pollination biology, tree health, weather, resources, and stress affect fruit set and retention."
      },
      {
        eyebrow: "Anatomy",
        title: "Skin, pulp, mucilage, parchment, silverskin, seed",
        detail:
          "These layers explain why natural, pulped, washed, wet-hulled, and other processing paths handle the same fruit differently."
      },
      {
        eyebrow: "Ripeness",
        title: "Color is useful, but it is not the whole decision",
        detail:
          "Producers may combine color, feel, sample measurements, taste, variety knowledge, weather, labor, and processing capacity when planning harvest."
      },
      {
        eyebrow: "Peaberry",
        title: "Sometimes one rounded seed develops",
        detail:
          "Most cherries contain two flat-sided seeds; a peaberry contains one rounded seed and is often separated by size or shape at the dry mill."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "The first sensory mystery is ripeness. One branch can hold flowers, green fruit, and ripe cherries at the same time."
      }
    ]
  },
  {
    id: "coffee-harvest",
    title: "The Harvest Decision",
    eyebrow: "Field to receiving station",
    summary:
      "Selective picking, strip picking, and mechanical harvesting create different sorting needs, labor patterns, and fruit mixtures.",
    checkpoint: "Tree to intake",
    motion: "glide",
    artwork: coffeeArtwork(
      "coffee-harvest-processing",
      "A coffee harvest field atlas showing selective hand picking, strip picking, mechanized harvesting where terrain permits, collection baskets and tarps, cherry flotation, intake scales, lot tags, and ripe versus unripe fruit."
    ),
    landmark: { label: "Harvest station", x: 34, y: 52 },
    drop: { x: 58, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Selective harvest",
        title: "Pick ripe fruit and return",
        detail:
          "Selective picking can reduce unwanted maturity stages but requires skilled labor and repeated passes as fruit ripens."
      },
      {
        eyebrow: "Strip harvest",
        title: "Remove a broader maturity mix",
        detail:
          "Strip picking is faster but commonly increases the need for careful separation before processing."
      },
      {
        eyebrow: "Mechanical",
        title: "Machine harvest depends on terrain and system",
        detail:
          "Mechanization can improve speed and reduce labor demand where farm layout, slope, cultivar, equipment, and processing capacity support it."
      },
      {
        eyebrow: "Intake",
        title: "Record the lot before it disappears into the mill",
        detail:
          "Time, farm block, producer, variety where known, weight, fruit condition, and intended process establish the next traceability link."
      },
      {
        eyebrow: "Separation",
        title: "Sort before defects become shared",
        detail:
          "Visual sorting, flotation, density, and equipment remove foreign material and separate some damaged, dry, immature, or otherwise unsuitable fruit."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Harvest links the tree to the mill clock. Fruit condition, weather, labor, distance, and processing capacity all arrive together."
      }
    ]
  },
  {
    id: "coffee-processing-crossroads",
    title: "The Processing Crossroads",
    eyebrow: "Postharvest transformation",
    summary:
      "Natural, washed, pulped-natural or honey-style, and wet-hulled paths remove fruit layers in different sequences.",
    checkpoint: "Cherry to drying form",
    motion: "cutaway",
    artwork: coffeeArtwork(
      "coffee-harvest-processing",
      "A four-path SIP Academy coffee processing mill showing intact cherries for natural processing, depulping and fermentation-washing for washed coffee, mucilage-coated parchment for pulped-natural or honey-style processing, and a separate wet-hulled path, with clean water and by-product handling."
    ),
    landmark: { label: "Processing crossroads", x: 52, y: 49 },
    drop: { x: 49, y: 66, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Natural",
        title: "Dry the coffee inside the whole fruit",
        detail:
          "Natural processing dries intact cherries before the dried fruit layers are removed. Fruit condition and even drying are critical."
      },
      {
        eyebrow: "Washed",
        title: "Remove skin, manage mucilage, wash, then dry",
        detail:
          "Washed systems depulp cherries, remove mucilage through fermentation and washing or mechanical means, then dry coffee in parchment."
      },
      {
        eyebrow: "Pulped natural or honey-style",
        title: "Dry parchment with some mucilage retained",
        detail:
          "Terminology and practice vary by origin, but these routes generally depulp and then dry with a chosen amount of mucilage remaining."
      },
      {
        eyebrow: "Wet-hulled",
        title: "Remove parchment before final drying",
        detail:
          "Wet-hulled coffee follows a distinct regional process in which parchment is removed at a higher moisture stage before the green coffee is dried further."
      },
      {
        eyebrow: "Fermentation",
        title: "Microbes and enzymes are active, not magical",
        detail:
          "Fermentation conditions can help remove mucilage and can influence sensory outcome; producers manage time, temperature, cleanliness, water, vessel, and fruit condition."
      },
      {
        eyebrow: "Responsibility",
        title: "Water and fruit by-products need a plan",
        detail:
          "Process selection affects water use, wastewater, pulp, energy, labor, equipment, risk, and what infrastructure the farm or mill must support."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Processing names are route labels, not guaranteed flavor labels. I will record exactly which layers were removed, when, and under what controls."
      }
    ]
  },
  {
    id: "coffee-wet-mill-control",
    title: "Inside the Wet Mill",
    eyebrow: "Process control · Fermentation",
    summary:
      "Reception, separation, depulping, mucilage management, fermentation, washing choices, water stewardship, and rapid handoffs protect the living lot.",
    checkpoint: "Cherry to clean parchment",
    motion: "cutaway",
    artwork: coffeeArtwork(
      "coffee-wetmill-control",
      "A brass-and-glass SIP Academy coffee wet mill cutaway showing cherry reception, float separation, a depulper, channels, fermentation tanks, mechanical demucilaging, clean water measurement, wastewater treatment, parchment transfer, and quality staff without printed labels."
    ),
    landmark: { label: "Coffee wet mill", x: 51, y: 46 },
    drop: { x: 49, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Reception",
        title: "Record the fruit before transforming it",
        detail:
          "Lot identity, delivery time, cherry condition, ripeness distribution, contamination, temperature, and mass establish the process record before water or machinery changes the fruit."
      },
      {
        eyebrow: "Separation",
        title: "Density clues support—not replace—inspection",
        detail:
          "Floatation and mechanical sorting can separate some underripe, dried, damaged, or low-density fruit, but operators still verify what each stream contains."
      },
      {
        eyebrow: "Depulping",
        title: "Set machinery to the real cherry",
        detail:
          "Disc or drum depulpers remove skin and pulp with calibrated gaps and flow; poor adjustment can leave fruit intact or damage seed and parchment."
      },
      {
        eyebrow: "Mucilage",
        title: "Biological and mechanical removal are different routes",
        detail:
          "Tank fermentation, mechanical demucilaging, partial retention, or combinations alter time, water, labor, microbial conditions, and the material sent to drying."
      },
      {
        eyebrow: "Fermentation",
        title: "Track the lot, not a universal clock",
        detail:
          "Temperature, time, fruit condition, oxygen exposure, vessel hygiene, water, microbial ecology, and process goal interact; no single duration fits every mill or coffee."
      },
      {
        eyebrow: "Water",
        title: "Clean water and wastewater are one responsibility",
        detail:
          "Measure water use, prevent cross-contamination, separate solids, and treat high-organic-load effluent according to local systems rather than sending process water directly into waterways."
      },
      {
        eyebrow: "Handoff",
        title: "Move stable, identified parchment to drying",
        detail:
          "Rinsing where used, drainage, clean transport, lot separation, and prompt spreading reduce the chance that an intended process becomes uncontrolled delay."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "The wet mill is a chain of measured handoffs. Fruit condition, machinery, fermentation, water, hygiene, and lot identity must remain connected."
      }
    ]
  },
  {
    id: "coffee-drying",
    title: "The Drying Terrace",
    eyebrow: "Stability · Moisture management",
    summary:
      "Sun, air, layer depth, turning, shelter, mechanical heat, time, and measurement bring coffee toward stable storage.",
    checkpoint: "Wet coffee to stable lot",
    motion: "orbit",
    artwork: coffeeArtwork(
      "coffee-drying-drymill",
      "A coffee drying atlas with raised beds, patios, a solar dryer, a guarded mechanical dryer, workers turning thin layers, moisture sampling, rain covers, airflow, lot separation, and defects isolated from sound coffee."
    ),
    landmark: { label: "Drying terrace", x: 43, y: 47 },
    drop: { x: 61, y: 60, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Goal",
        title: "Dry evenly enough for safe storage",
        detail:
          "The objective is not speed alone. Coffee must reach a stable condition without re-wetting, overheating, contamination, or pockets of excess moisture."
      },
      {
        eyebrow: "Sun drying",
        title: "Surface, depth, movement, weather",
        detail:
          "Patios and raised beds use solar energy and airflow; layer depth, turning frequency, covering, and local humidity shape the drying curve."
      },
      {
        eyebrow: "Mechanical drying",
        title: "Heat and airflow need boundaries",
        detail:
          "Mechanical systems can add capacity and weather resilience, but operators manage air, temperature, load, residence time, energy, and uniformity."
      },
      {
        eyebrow: "Measurement",
        title: "Moisture and water activity answer different questions",
        detail:
          "Moisture content estimates how much water is present; water activity describes how available that water is for reactions and microbial growth."
      },
      {
        eyebrow: "Hygiene",
        title: "Keep clean coffee away from wetness and rejects",
        detail:
          "Clean surfaces, separated lots, controlled animals and dust, dry covers, and protected storage reduce contamination and mould risk."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Drying turns a perishable harvest into a storable product. The slow work is uniformity, protection, and measurement."
      }
    ]
  },
  {
    id: "coffee-dry-mill",
    title: "The Dry Mill and Export Lot",
    eyebrow: "Preparation · Trade",
    summary:
      "Rested parchment or dried cherry becomes export-ready green coffee through hulling, cleaning, grading, sorting, sampling, and packing.",
    checkpoint: "Dried coffee to green lot",
    motion: "rotate",
    artwork: coffeeArtwork(
      "coffee-drying-drymill",
      "A cutaway dry mill with parchment and dried cherry intake, huller, aspirator, screens, density table, optical sorter, hand-sorting belt, sample table, lined coffee bags, lot codes, pallets, and a dry export warehouse."
    ),
    landmark: { label: "Dry mill", x: 58, y: 48 },
    drop: { x: 42, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Hulling",
        title: "Remove the final dry outer layer",
        detail:
          "The dry mill removes parchment from washed or pulped coffee, or dried fruit layers from natural coffee, without treating the seed as indestructible."
      },
      {
        eyebrow: "Screens",
        title: "Size is a physical specification",
        detail:
          "Screens separate beans by dimensions. Screen size can support roast planning and contract specifications but is not a universal quality score."
      },
      {
        eyebrow: "Density",
        title: "Gravity tables separate by behavior",
        detail:
          "Airflow and vibration can separate beans that differ in density or aerodynamic behavior after preliminary cleaning and sizing."
      },
      {
        eyebrow: "Optical sorting",
        title: "Color and appearance reveal some defects",
        detail:
          "Optical and hand sorting remove selected visual defects and foreign material, but physical assessment and cupping still answer different questions."
      },
      {
        eyebrow: "Sample",
        title: "The contract lot needs a representative sample",
        detail:
          "Sampling, physical assessment, roast preparation, sensory evaluation, lot identity, and agreed specifications support transparent buying decisions."
      },
      {
        eyebrow: "Warehouse",
        title: "Dry, clean, ventilated, protected",
        detail:
          "Green coffee is vulnerable to moisture, odours, contamination, heat, and time; packaging and warehouse practice protect the lot before shipment."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "The dry mill converts a farm lot into a trade lot. Every separation changes what remains, so every sample must keep its identity."
      }
    ]
  },
  {
    id: "coffee-green-quality-lab",
    title: "The Green Coffee Quality Lab",
    eyebrow: "Physical assessment · Safety",
    summary:
      "Moisture, water activity, odor, color, density, screen distribution, defects, sample roasting, and traceable records reveal how a lot may travel and perform.",
    checkpoint: "Inspect before trade",
    motion: "orbit",
    artwork: coffeeArtwork(
      "coffee-green-quality",
      "A detailed SIP Academy green coffee laboratory showing a moisture meter, water-activity instrument, sample trays, defect sorting, screen sieves, density separation, ultraviolet-safe inspection light, sample roaster, sealed reference jars, and traceability records without readable text."
    ),
    landmark: { label: "Green coffee quality lab", x: 54, y: 44 },
    drop: { x: 45, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Moisture",
        title: "Moisture content and water activity answer different questions",
        detail:
          "Moisture content estimates water mass; water activity describes water availability for chemical and microbial change. Both need representative sampling and calibrated methods."
      },
      {
        eyebrow: "Condition",
        title: "Odor, color, and cleanliness reveal storage history",
        detail:
          "Musty, phenolic, smoky, chemical, or baggy odors and abnormal color can signal contamination, age, poor drying, or storage exposure that a size screen will not explain."
      },
      {
        eyebrow: "Defects",
        title: "Physical defects need consistent definitions",
        detail:
          "Foreign matter and damaged, insect-affected, moldy, sour, black, immature, broken, or parchment-retained seeds are classified by a stated system—not by casual appearance alone."
      },
      {
        eyebrow: "Size",
        title: "Screen size supports preparation, not automatic quality",
        detail:
          "Sieving describes particle dimensions and can help roasting uniformity or contract preparation; large seed is not inherently more flavorful than small seed."
      },
      {
        eyebrow: "Density",
        title: "Density is a sorting clue with limits",
        detail:
          "Gravity tables and density measurements can separate differently developed or damaged material, but variety, moisture, processing, and seed structure affect the result."
      },
      {
        eyebrow: "Safety",
        title: "Prevent mold and ochratoxin risk through the chain",
        detail:
          "Controlled drying, protection from re-wetting, clean storage, moisture barriers, inspection, and responsible disposition of compromised lots reduce risk; roasting is not a substitute for prevention."
      },
      {
        eyebrow: "Value",
        title: "Physical evidence joins sensory and extrinsic evidence",
        detail:
          "The SCA Coffee Value Assessment separates physical, descriptive, affective, and extrinsic information so one observation does not pretend to explain the entire coffee."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Before we taste, the green coffee is already speaking through moisture, odor, color, defects, density, preparation, and the story its records can support."
      }
    ]
  },
  {
    id: "coffee-logistics",
    title: "The Green Coffee Journey",
    eyebrow: "Storage · Logistics",
    summary:
      "Green coffee travels through warehouse, container, port, importer, and roastery while moisture, odour, heat, delay, and records remain active risks.",
    checkpoint: "Origin to roastery",
    motion: "glide",
    artwork: coffeeArtwork(
      "coffee-drying-drymill",
      "A connected green coffee logistics scene showing lined export bags on pallets, dry warehouse inspection, protected truck, clean container, port, importer warehouse, sample room, and a final roastery receiving bay."
    ),
    landmark: { label: "Green coffee route", x: 67, y: 44 },
    drop: { x: 34, y: 62, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Packaging",
        title: "The bag manages handling and exposure",
        detail:
          "Outer bags provide strength and identification; barrier liners or other package systems may reduce moisture and odour exchange when correctly used."
      },
      {
        eyebrow: "Container",
        title: "Inspect before loading",
        detail:
          "A clean, dry, sound container and protected loading reduce leaks, contamination, re-wetting, condensation, and odour pickup."
      },
      {
        eyebrow: "Condition",
        title: "Green coffee continues to change",
        detail:
          "Temperature, relative humidity, moisture gradients, oxygen exposure, packaging, and time can alter physical and sensory condition during storage."
      },
      {
        eyebrow: "Documents",
        title: "Identity travels with the lot",
        detail:
          "Contract, lot code, origin, producer information, process, quantity, shipment, sample history, and receiving checks connect physical coffee to its records."
      },
      {
        eyebrow: "Receiving",
        title: "Verify what arrived",
        detail:
          "Roasters compare seals, bags, lot identity, condition, sample results, moisture or other agreed checks, and sensory performance before production use."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Trade is not empty space between farm and roaster. It is a long custody test for identity and condition."
      }
    ]
  },
  {
    id: "coffee-roast-transformation",
    title: "Green Seed, Roasted Coffee",
    eyebrow: "Roasting · Transformation",
    summary:
      "Heat transfer drives drying, browning reactions, physical expansion, gas formation, aroma development, and an irreversible change in the seed.",
    checkpoint: "Green to roasted",
    motion: "reassemble",
    artwork: coffeeArtwork(
      "coffee-roastery",
      "A cinematic coffee roast transformation showing green seeds entering a brass-and-glass drum roaster, then progressive color, expansion, first-crack energy, aromatic vapor, and rapid cooling, with no operational values displayed."
    ),
    landmark: { label: "Roast transformation", x: 48, y: 47 },
    drop: { x: 54, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Heat transfer",
        title: "Convection, conduction, and radiation share the work",
        detail:
          "Roaster design, batch size, gas or electric input, airflow, drum behavior, bean properties, and control choices shape how heat reaches the coffee."
      },
      {
        eyebrow: "Drying",
        title: "Water leaves while the seed warms",
        detail:
          "Early roast energy raises bean temperature and removes moisture; uneven heat transfer can create uneven physical and sensory development."
      },
      {
        eyebrow: "Browning",
        title: "Maillard chemistry builds color and aroma precursors",
        detail:
          "Reducing sugars and amino compounds participate in complex browning reactions; caramelization and thermal degradation are related but distinct processes."
      },
      {
        eyebrow: "First crack",
        title: "The bean becomes audibly dynamic",
        detail:
          "Pressure from water vapor and gases contributes to cellular fracture and expansion. First crack is a physical marker, not a universal finish line."
      },
      {
        eyebrow: "Development",
        title: "Time after first crack is only one lens",
        detail:
          "Roasters consider the full heat history, rate of change, color, sensory target, solubility, equipment, and coffee—not one percentage or clock value alone."
      },
      {
        eyebrow: "Cooling",
        title: "Stop the roast quickly and cleanly",
        detail:
          "Effective cooling limits continued thermal change and prepares the batch for quality checks, rest, packaging, and later brewing."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "Roasting does not paint flavor onto a blank bean. It transforms what the farm and mill delivered, creating some clues and erasing others."
      }
    ]
  },
  {
    id: "coffee-roaster-anatomy",
    title: "Inside the Roaster",
    eyebrow: "Equipment · Control",
    summary:
      "A deconstructed roaster reveals charge path, drum or chamber, heat source, airflow, probes, exhaust, chaff collection, discharge, and cooling.",
    checkpoint: "Machine to batch record",
    motion: "rotate",
    artwork: coffeeArtwork(
      "coffee-roastery",
      "A deconstructed rotating coffee roaster field atlas with hopper, charge gate, perforated drum, heat source, airflow path, temperature probes, sight glass, trier, exhaust, cyclone and chaff collector, discharge door, and cooling tray."
    ),
    landmark: { label: "Roaster anatomy", x: 61, y: 48 },
    drop: { x: 35, y: 65, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Charge",
        title: "The batch enters a prepared thermal system",
        detail:
          "Charge condition, coffee mass, machine state, and green-coffee properties influence the roast’s opening energy exchange."
      },
      {
        eyebrow: "Drum or chamber",
        title: "Agitation and contact distribute heat",
        detail:
          "Machine geometry and movement affect mixing, contact, residence pattern, and how consistently beans experience the roast environment."
      },
      {
        eyebrow: "Heat source",
        title: "Input is not identical to bean response",
        detail:
          "A control change acts through the machine and airflow before the coffee responds; operators interpret trends instead of assuming instant effect."
      },
      {
        eyebrow: "Airflow",
        title: "Move heat, moisture, smoke, and chaff",
        detail:
          "Airflow participates in heat transfer and exhaust management; too little or too much can change machine behavior and cup outcome."
      },
      {
        eyebrow: "Sensors",
        title: "Probes are instruments with context",
        detail:
          "Temperature probes and software provide repeatable reference signals, but placement, response time, batch size, maintenance, and operator observation affect interpretation."
      },
      {
        eyebrow: "Cooling tray",
        title: "Air and agitation arrest the batch",
        detail:
          "Rapid, even cooling reduces carryover roasting and clears the way for batch inspection and safe handling."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "A roast curve is a sensor record of a physical system. It becomes useful only when linked to machine state, coffee, color, and cup."
      }
    ]
  },
  {
    id: "coffee-roast-chemistry",
    title: "The Roast Transformation Lab",
    eyebrow: "Heat · Structure · Aroma",
    summary:
      "Heat and mass transfer drive drying, browning, gas formation, structural change, aroma chemistry, and the narrow handoff into cooling.",
    checkpoint: "Read the changing seed",
    motion: "rotate",
    artwork: coffeeArtwork(
      "coffee-roast-chemistry",
      "A cinematic SIP Academy roast chemistry atlas showing one coffee seed progressing from green through yellowing and browning to first crack and cooled roast, with a transparent roaster cutaway, heat and airflow paths, moisture and gas release, aromatic vapor, bean-cell expansion, and a cooling tray without printed labels."
    ),
    landmark: { label: "Roast transformation lab", x: 52, y: 45 },
    drop: { x: 49, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Energy",
        title: "Heat reaches coffee by several paths",
        detail:
          "Conduction, convection, and radiation contribute differently with roaster design, batch size, airflow, burner or element output, drum speed, and bean movement."
      },
      {
        eyebrow: "Drying",
        title: "Water leaves while temperature rises",
        detail:
          "Early roasting drives moisture movement and creates thermal gradients through the seed; the rate of energy input affects later browning and structural change."
      },
      {
        eyebrow: "Browning",
        title: "Maillard chemistry builds many aroma precursors and products",
        detail:
          "Reducing sugars and amino compounds participate in complex reaction networks as temperature rises; caramelization and other thermal reactions also contribute."
      },
      {
        eyebrow: "First crack",
        title: "Pressure makes the structure audible",
        detail:
          "Steam and gases build as the porous seed expands and weakens. First crack is a useful physical marker, not an identical chemical endpoint for every coffee or machine."
      },
      {
        eyebrow: "Development",
        title: "Time after first crack is not a quality formula",
        detail:
          "Post-crack energy and time influence color, solubility, acidity, bitterness, aroma, texture, and defect risk, but percentage rules cannot replace the full roast curve and sensory result."
      },
      {
        eyebrow: "Gas",
        title: "Roasted coffee continues changing after discharge",
        detail:
          "Carbon dioxide and volatile compounds evolve during rest and storage; roast degree, bean structure, grinding, temperature, oxygen, and packaging affect release and staling."
      },
      {
        eyebrow: "Cooling",
        title: "End the roast quickly and evenly",
        detail:
          "Rapid, clean, uniform cooling limits continued thermal change and protects the next measurements; contaminated cooling air or slow discharge can undo careful roasting."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "The roaster does not paint flavor onto a seed. Heat redirects water, structure, gases, acids, sugars, amino compounds, and aroma pathways—then cooling stops the run."
      }
    ]
  },
  {
    id: "coffee-cupping-lab",
    title: "The Coffee Value Lab",
    eyebrow: "Quality · Sensory",
    summary:
      "Physical, descriptive, affective, and extrinsic assessments answer different questions about the same coffee.",
    checkpoint: "Measure and describe",
    motion: "orbit",
    artwork: coffeeArtwork(
      "coffee-cupping-lab",
      "A circular SIP Academy coffee evaluation laboratory with green samples, roast samples, cupping bowls, scales, grinders, kettles, aroma references, color and defect trays, forms, coded cups, and a calibrated sensory team."
    ),
    landmark: { label: "Coffee value lab", x: 50, y: 46 },
    drop: { x: 47, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Physical",
        title: "Describe the material coffee",
        detail:
          "Physical assessment considers characteristics such as color, defects, moisture, and size using defined sampling and test methods."
      },
      {
        eyebrow: "Descriptive",
        title: "Record what is perceived",
        detail:
          "Descriptive assessment uses shared categories and intensity language for aroma, flavor, aftertaste, acidity, sweetness, mouthfeel, and other sensory attributes."
      },
      {
        eyebrow: "Affective",
        title: "Record impression of quality separately",
        detail:
          "Affective assessment captures a taster’s quality impression without pretending that preference and objective description are the same task."
      },
      {
        eyebrow: "Extrinsic",
        title: "Value also lives outside the cup",
        detail:
          "Origin, producer, variety, process, certifications, traceability, and other information can contribute value and must be documented rather than inferred from flavor."
      },
      {
        eyebrow: "Mechanics",
        title: "Preparation must be repeatable",
        detail:
          "Sample roast, rest, dose, water, grind, vessel, timing, coded presentation, cleaning, and room conditions support fair comparison."
      },
      {
        eyebrow: "Calibration",
        title: "Shared language is trained, not assumed",
        detail:
          "References, repeated practice, discussion, blind samples, and data help teams align while still acknowledging individual perception and preference."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 9,
        text:
          "First describe the cup, then say how much you value it. Keeping those questions separate makes sensory communication clearer."
      }
    ]
  },
  {
    id: "coffee-grinder",
    title: "The Grinder Changes the Map",
    eyebrow: "Preparation · Particle system",
    summary:
      "Burr geometry, spacing, alignment, speed, heat, retention, and particle distribution determine how water can reach the roasted coffee.",
    checkpoint: "Whole bean to particles",
    motion: "cutaway",
    artwork: coffeeArtwork(
      "coffee-brewing-atlas",
      "A deconstructed coffee grinder and particle atlas showing hopper, dosing gate, upper and lower burrs, adjustment collar, motor, chute, retention pockets, coarse-to-fine particles, fines, boulders, and a clean measured dose."
    ),
    landmark: { label: "Grinder atlas", x: 38, y: 46 },
    drop: { x: 61, y: 65, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Burrs",
        title: "Geometry breaks coffee into a distribution",
        detail:
          "A grinder does not create one particle size. Burr design, spacing, alignment, coffee, and operating condition create a range of sizes and shapes."
      },
      {
        eyebrow: "Surface area",
        title: "Finer particles expose more coffee",
        detail:
          "Greater exposed surface generally accelerates extraction, while very fine material can also increase resistance and uneven flow in percolation systems."
      },
      {
        eyebrow: "Fines and boulders",
        title: "The tails of the distribution matter",
        detail:
          "Very small and very large particles extract differently; the practical goal is a distribution suited to the brewer, coffee, and sensory target."
      },
      {
        eyebrow: "Retention",
        title: "Not every gram exits immediately",
        detail:
          "Coffee can remain in the burr chamber or chute and exchange with later doses, affecting mass, freshness, recipe control, and allergen or flavor-change procedures."
      },
      {
        eyebrow: "Dial-in",
        title: "Adjust one connected variable at a time",
        detail:
          "Baristas use dose, output, time or flow, strength, extraction, and sensory results to guide grind changes rather than chasing one clock number."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "The grinder redraws the extraction surface. I will track mass, setting, time, flow, and taste as one connected record."
      }
    ]
  },
  {
    id: "coffee-water-room",
    title: "The Coffee Water Room",
    eyebrow: "Water chemistry · Equipment",
    summary:
      "Source water, hardness, alkalinity, treatment, temperature, hygiene, and equipment protection determine how faithfully a brewing recipe can perform.",
    checkpoint: "Build the brewing solvent",
    motion: "glide",
    artwork: coffeeArtwork(
      "coffee-water-extraction",
      "A SIP Academy coffee water laboratory connecting source-water sample jars, mineral and alkalinity testing, carbon and membrane filtration, controlled remineralization, a heated brew loop, scale and corrosion cutaways, clean storage, and multiple coffee brewers without printed labels."
    ),
    landmark: { label: "Coffee water room", x: 49, y: 43 },
    drop: { x: 50, y: 63, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Source",
        title: "Start with the water that actually arrives",
        detail:
          "Municipal, well, spring, or treated water can vary over time. Measure the source and the point of use rather than assuming a filter creates a fixed result forever."
      },
      {
        eyebrow: "Hardness",
        title: "Dissolved minerals influence extraction and scale",
        detail:
          "Calcium and magnesium contribute to hardness and can interact with coffee compounds; concentration, temperature, carbonate balance, and equipment design also influence scale risk."
      },
      {
        eyebrow: "Alkalinity",
        title: "Buffering changes how acidity is perceived",
        detail:
          "Alkalinity describes acid-neutralizing capacity. Too much can flatten perceived acidity; too little may leave water aggressive to equipment or make the cup less buffered."
      },
      {
        eyebrow: "Treatment",
        title: "Match the system to the problem",
        detail:
          "Sediment filtration, activated carbon, ion exchange, membrane treatment, blending, and remineralization solve different issues and require maintenance and verification."
      },
      {
        eyebrow: "Temperature",
        title: "The measured brew temperature belongs to a system",
        detail:
          "Heater control, preheating, slurry geometry, flow, ambient loss, and measurement location determine the temperature coffee actually experiences."
      },
      {
        eyebrow: "Equipment",
        title: "Good cup water must also protect the machine",
        detail:
          "Corrosion, scale, biofilm, filter exhaustion, stagnant storage, and unsafe plumbing can damage equipment or destabilize flavor even when a single test looks acceptable."
      },
      {
        eyebrow: "Verification",
        title: "Taste and measurement close the loop",
        detail:
          "Track conductivity or dissolved solids where useful, hardness, alkalinity, filter service, sensory performance, and equipment condition against a defined target for the café."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Water is the largest part of the cup and the working fluid inside the machine. Measure the source, treatment, minerals, temperature, hygiene, and equipment response together."
      }
    ]
  },
  {
    id: "coffee-brewing",
    title: "The Brewing Atlas",
    eyebrow: "Extraction · Water",
    summary:
      "Immersion, percolation, espresso, and hybrid brewers organize contact, flow, filtration, pressure, and separation differently.",
    checkpoint: "Ground coffee to beverage",
    motion: "rotate",
    artwork: coffeeArtwork(
      "coffee-brewing-atlas",
      "A radial coffee brewing laboratory comparing immersion, pour-over percolation, batch brewing, espresso, and hybrid methods around a central water and extraction model, with scales, grinder, refractometer, filters, kettle, pressure gauge, and clean service vessels."
    ),
    landmark: { label: "Brewing atlas", x: 53, y: 48 },
    drop: { x: 50, y: 62, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Water",
        title: "Potable water still needs brewing context",
        detail:
          "Hardness, alkalinity, treatment, temperature, and equipment compatibility affect extraction, perceived acidity, scale risk, and consistency."
      },
      {
        eyebrow: "Brew ratio",
        title: "Coffee and water establish the mass balance",
        detail:
          "The ratio sets the starting relationship between available coffee and brewing water, but strength and extraction also depend on method and process."
      },
      {
        eyebrow: "Contact",
        title: "Time, grind, temperature, and agitation alter kinetics",
        detail:
          "These variables influence how quickly soluble material moves into water; their sensory effect is mediated through extraction, strength, flow, and uniformity."
      },
      {
        eyebrow: "Strength",
        title: "TDS describes concentration",
        detail:
          "Total dissolved solids estimates beverage strength. It does not by itself tell whether the extraction was even or whether a guest will prefer the cup."
      },
      {
        eyebrow: "Extraction yield",
        title: "Measure how much dry coffee mass dissolved",
        detail:
          "Extraction yield relates beverage mass, strength, and dry coffee dose; it helps compare recipes but remains a measurement, not a universal quality verdict."
      },
      {
        eyebrow: "Filtration",
        title: "Filters change more than clarity",
        detail:
          "Paper, metal, cloth, and settling systems retain different particles and oils, changing texture, clarity, flow, maintenance, and waste."
      },
      {
        eyebrow: "Preference",
        title: "There is no single ideal cup for every guest",
        detail:
          "Research shows preferences span different strengths and extraction yields; professionals use measurement to reproduce a target, then verify it sensorially."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "Brewing is controlled dissolution and separation. The method changes the route, but measurement and tasting must still agree."
      }
    ]
  },
  {
    id: "coffee-service",
    title: "The Living Café",
    eyebrow: "Service · Guest",
    summary:
      "Freshness, storage, dial-in, milk or dilution, workflow, equipment care, communication, and hospitality complete the seed-to-service journey.",
    checkpoint: "Brew bar to guest",
    motion: "reassemble",
    artwork: coffeeArtwork(
      "coffee-cafe-service",
      "A warm SIP Academy café service scene connecting roasted-coffee storage, grinder and espresso bar, batch brewer, filtered water, milk station, tea-safe separation, cleaning tools, tasting flight, menu conversation, reusable service ware, and a guest receiving a cup."
    ),
    landmark: { label: "Living café", x: 63, y: 46 },
    drop: { x: 50, y: 69, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Freshness",
        title: "Protect coffee from oxygen, moisture, heat, and time",
        detail:
          "Appropriate barrier packaging, closure, storage, stock rotation, grinding near service, and realistic production dates help preserve intended performance."
      },
      {
        eyebrow: "Dial-in",
        title: "The recipe is a controlled starting point",
        detail:
          "Baristas verify dose, output, time or flow, temperature where relevant, strength or extraction when available, and sensory result as coffee and conditions change."
      },
      {
        eyebrow: "Milk and alternatives",
        title: "Texture without hiding the coffee or guest need",
        detail:
          "Steam, air, temperature, base composition, pour, cleanliness, and allergen procedures shape milk-based and alternative beverages."
      },
      {
        eyebrow: "Equipment care",
        title: "Clean tools preserve both safety and flavor",
        detail:
          "Backflushing where appropriate, grinder and brewer cleaning, steam-wand hygiene, water-system care, and maintenance prevent residue and instability."
      },
      {
        eyebrow: "Communication",
        title: "Describe without inventing provenance",
        detail:
          "Servers can explain origin, producer, variety, process, roast, brew, sensory description, ingredients, allergens, and caffeine context only as accurately as records support."
      },
      {
        eyebrow: "Hospitality",
        title: "Preference is part of quality",
        detail:
          "The best handoff listens to the guest, offers understandable choices, serves at a usable temperature, and invites curiosity without gatekeeping."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "The final clue is human. A clear description and a cup suited to the guest reconnect every person behind the coffee."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Lot, roast, recipe, water, grinder, service, and feedback: the record closes where the next improvement begins."
      }
    ]
  }
];

const coffeeScenes: BeyondTheGlassScene[] = coffeeSceneSeeds.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / coffeeSceneSeeds.length, (index + 1) / coffeeSceneSeeds.length]
}));

export const coffeeFieldTrip: BeyondTheGlassChapter = {
  slug: "coffee",
  title: "Beyond The Glass",
  chapterTitle: "Coffee · From Seed to Service",
  subject: "Coffee field trip",
  description:
    "A visual SIP Academy coffee adventure following species and planting material, farm ecology and resilience, cherry development, harvest, wet-mill control, drying, green-coffee assessment, trade, roast chemistry, sensory evaluation, grinding, water, brewing, and café service.",
  coreMessage:
    "Every cup contains a connected living system: genetics, place, farm resilience, postharvest control, physical evidence, trade custody, heat, water, equipment, sensory judgment, and hospitality.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/coffee/coffee-academy-gate-960.webp"
  },
  scenes: coffeeScenes,
  sources: [
    {
      id: "sca-standards",
      organization: "Specialty Coffee Association",
      title: "SCA Standards",
      url: "https://sca.coffee/research/coffee-standards",
      note:
        "Primary standards index for Coffee Value Assessment, green-coffee work, equipment, brewing performance, shared terminology, and professional practice."
    },
    {
      id: "sca-coffee-value-assessment",
      organization: "Specialty Coffee Association",
      title: "Coffee Value Assessment",
      url: "https://sca.coffee/value-assessment",
      note:
        "Primary framework for separating physical, descriptive, affective, and extrinsic assessment."
    },
    {
      id: "wcr-variety-catalog",
      organization: "World Coffee Research",
      title: "Coffee Varieties Catalog",
      url: "https://varieties.worldcoffeeresearch.org/",
      note:
        "Primary open catalog for Arabica and Robusta species, varieties, agronomic traits, altitude fit, quality potential, and pest or disease context."
    },
    {
      id: "wcr-resources",
      organization: "World Coffee Research",
      title: "Resources and Good Practice Guides",
      url: "https://worldcoffeeresearch.org/resources",
      note:
        "Supports seed and nursery practice, variety knowledge, sensory lexicon context, shade systems, and farm decision framing."
    },
    {
      id: "wcr-nursery-guide",
      organization: "World Coffee Research",
      title: "Good Practice Guide: Coffee Nursery Management",
      url: "https://worldcoffeeresearch.org/guias",
      note:
        "Primary technical guidance for genetically traceable, healthy planting material, nursery substrates, nutrition, plant health, root quality, and professional seed systems."
    },
    {
      id: "wcr-rust",
      organization: "World Coffee Research",
      title: "Prevention and Control of Coffee Leaf Rust",
      url: "https://worldcoffeeresearch.org/resources/prevention-and-control-of-coffee-leaf-rust",
      note:
        "Supports accurate disease identification and integrated management framing without prescribing a universal control program."
    },
    {
      id: "itc-coffee-guide",
      organization: "International Trade Centre",
      title: "The Coffee Guide, Fourth Edition",
      url: "https://www.intracen.org/media/5718",
      note:
        "Primary international value-chain reference for production, processing, trade, logistics, risk, quality, and market context."
    },
    {
      id: "fao-postharvest",
      organization: "Food and Agriculture Organization of the United Nations",
      title: "Coffee Post-Harvest Handling and Processing",
      url: "https://www.fao.org/4/x6939e/X6939e11.htm",
      note:
        "Supports processing, drying, parchment handling, hulling, grading, storage, and postharvest risk framing."
    },
    {
      id: "codex-ota-coffee",
      organization: "Codex Alimentarius Commission",
      title: "Code of Practice for the Prevention and Reduction of Ochratoxin A Contamination in Coffee",
      url: "https://www.fao.org/fao-who-codexalimentarius/sh-proxy/en/?lnk=1&url=https%253A%252F%252Fworkspace.fao.org%252Fsites%252Fcodex%252FStandards%252FCXC%2B69-2009%252FCXC_069e.pdf",
      note:
        "Supports responsible drying, re-wetting prevention, hygiene, moisture management, storage, and transport practices."
    },
    {
      id: "iso-green-coffee-inspection",
      organization: "International Organization for Standardization",
      title: "ISO 4149:2025 — Green Coffee: Olfactory and Visual Examination and Determination of Foreign Matter and Defects",
      url: "https://www.iso.org/standard/87699.html",
      note:
        "Current international method context for representative olfactory and visual inspection, foreign matter, defects, quality control, and commercial assessment."
    },
    {
      id: "iso-green-coffee-moisture",
      organization: "International Organization for Standardization",
      title: "ISO 6673:2025 — Green Coffee: Determination of Loss in Mass at 105 °C",
      url: "https://www.iso.org/standard/87697.html",
      note:
        "Current reference method context for loss in mass conventionally used to determine green-coffee water content and calibrate routine moisture methods."
    },
    {
      id: "uc-davis-coffee-publications",
      organization: "UC Davis Coffee Center",
      title: "Coffee Science Publications",
      url: "https://coffeecenter.ucdavis.edu/faculty-research/publications",
      note:
        "Primary university research index for roast chemistry, brewing strength and extraction, temperature, acidity, sensory science, storage, and process engineering."
    },
    {
      id: "uc-davis-control-chart",
      organization: "UC Davis College of Engineering",
      title: "UC Davis Coffee Center Contributes Research to New Brewing Control Chart",
      url: "https://engineering.ucdavis.edu/news/uc-davis-coffee-center-contributes-research-new-brewing-control-chart",
      note:
        "Supports the modern relationship among total dissolved solids, extraction yield, sensory profiles, and diverse consumer preferences."
    },
    {
      id: "ico-quality-chain",
      organization: "International Coffee Organization",
      title: "How Coffee Quality Is Maintained",
      url: "https://www.ico.org/market-development-toolkit/page/index/8/quality/98",
      note:
        "Supports whole-chain quality framing from production through storage, roasting, preparation, and the final cup."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
