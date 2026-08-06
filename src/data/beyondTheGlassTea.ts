import type { BeyondTheGlassChapter, BeyondTheGlassScene } from "./beyondTheGlassChapters";

const teaArtwork = (
  filename: string,
  alt: string
): BeyondTheGlassScene["artwork"] => ({
  src: `/beyond-the-glass/tea/${filename}-1600.webp`,
  srcSet: `/beyond-the-glass/tea/${filename}-960.webp 960w, /beyond-the-glass/tea/${filename}-1600.webp 1600w`,
  portraitSrc: `/beyond-the-glass/tea/${filename}-portrait-960.webp`,
  portraitSrcSet: `/beyond-the-glass/tea/${filename}-portrait-640.webp 640w, /beyond-the-glass/tea/${filename}-portrait-960.webp 960w`,
  alt,
  fit: "contain",
  portraitFit: "contain",
  position: "center",
  portraitPosition: "center",
  aspectRatio: "16 / 9",
  portraitAspectRatio: "4 / 5"
});

type TeaSceneSeed = Omit<BeyondTheGlassScene, "number" | "range">;

const teaSceneSeeds: TeaSceneSeed[] = [
  {
    id: "tea-academy-gate",
    title: "The Tea Garden Gate",
    eyebrow: "SIP Academy · Tea",
    summary:
      "The Tea wing opens from a brass-and-glass pavilion into living terraces, mist, water, and one remarkably adaptable plant.",
    checkpoint: "Academy to garden",
    motion: "establish",
    artwork: teaArtwork(
      "tea-academy-gate",
      "Adult guides Sippy and Roma and the ivory robot Hummin enter the SIP Academy tea wing at sunrise above misty Camellia sinensis terraces and luminous blue waterways."
    ),
    landmark: { label: "Tea pavilion", x: 71, y: 31 },
    drop: { x: 35, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Plant",
        title: "True tea begins with Camellia sinensis",
        detail:
          "White, green, yellow, oolong, black, and dark teas begin with the same species; cultivar, place, pluck, and processing create different paths."
      },
      {
        eyebrow: "People",
        title: "Leaf quality is carried by human decisions",
        detail:
          "Garden care, plucking standard, transport time, factory control, sorting, storage, and service all leave evidence in the cup."
      },
      {
        eyebrow: "Water",
        title: "The final ingredient also reveals the leaf",
        detail:
          "Water composition, temperature, leaf-to-water ratio, time, and vessel determine what a finished tea releases during brewing."
      },
      {
        eyebrow: "Language",
        title: "Oxidation is not automatically fermentation",
        detail:
          "Most black- and oolong-tea color change is enzymatic oxidation. Microbial fermentation is a separate process important to certain dark teas."
      },
      {
        eyebrow: "Route",
        title: "Garden → craft → cup",
        detail:
          "This field trip follows the living shoot through style-specific manufacture, trade, brewing, sensory evaluation, and hospitality."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Welcome to the Tea wing. One plant becomes many traditions, but every cup begins with a real garden and a sequence of choices."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "I’ll follow the clues from fresh leaf and flowers to toasted grain, fruit, spice, smoke, sweetness, briskness, and finish."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "I’ll keep plant identity, process order, moisture, temperature, lot custody, and brewing conditions connected."
      }
    ]
  },
  {
    id: "tea-one-plant",
    title: "One Plant, Many Possibilities",
    eyebrow: "Botany · Camellia sinensis",
    summary:
      "A living tea bush opens into roots, woody frame, buds, shoots, mature leaves, flowers, seeds, and cultivated variation.",
    checkpoint: "Species to cultivar",
    motion: "orbit",
    artwork: teaArtwork(
      "tea-garden-cultivar",
      "A complete Camellia sinensis bush with visible roots, woody frame, buds, young shoots, mature leaves, white flower, seed capsule, nursery plants, and highland tea fields."
    ),
    landmark: { label: "Living tea bush", x: 51, y: 40 },
    drop: { x: 50, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Species",
        title: "Camellia sinensis is the shared origin",
        detail:
          "Cultivated tea is commonly discussed through botanical varieties such as var. sinensis and var. assamica, plus many selected cultivars and local populations."
      },
      {
        eyebrow: "Young growth",
        title: "Buds and tender leaves are active material",
        detail:
          "Young shoots often contain the texture and chemistry targeted for quality tea, though the desired pluck varies with product and producer."
      },
      {
        eyebrow: "Mature structure",
        title: "Roots and woody growth sustain repeated harvest",
        detail:
          "Roots support water and nutrient uptake; pruning and tipping maintain a productive plucking table above the permanent frame."
      },
      {
        eyebrow: "Cultivar",
        title: "Selection changes field and cup behavior",
        detail:
          "Cultivars can differ in growth, stress response, yield, harvest timing, leaf chemistry, and suitability for particular styles."
      },
      {
        eyebrow: "Propagation",
        title: "Seed and clonal plants do not tell the same story",
        detail:
          "Seedlings increase genetic variation; vegetative propagation preserves the selected cultivar more consistently."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Meet the whole plant before you meet a tea style. Roots, permanent wood, young shoots, flowers, seed, and cultivar all belong to its biography."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Species is only the first field. Cultivar identity and propagation method help explain what the garden can become."
      }
    ]
  },
  {
    id: "tea-nursery-cultivar",
    title: "The Tea Nursery and Cultivar Library",
    eyebrow: "Planting material · Architecture",
    summary:
      "Seed, selected mother bushes, cuttings, rooted plants, cultivar identity, and field trials connect Camellia sinensis diversity to the future garden.",
    checkpoint: "Identity before the field",
    motion: "cutaway",
    artwork: teaArtwork(
      "tea-nursery-resilience",
      "A SIP Academy tea nursery atlas showing Camellia sinensis seed, selected adult mother bushes, nodal cuttings, rooting beds, shaded nursery plants, healthy roots, cultivar trial rows, and a brass-and-glass botanical archive without printed labels."
    ),
    landmark: { label: "Tea nursery and cultivar library", x: 49, y: 44 },
    drop: { x: 43, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Species",
        title: "Camellia sinensis contains meaningful diversity",
        detail:
          "The species includes cultivated variation often discussed through var. sinensis, var. assamica, and many local cultivars, clones, landraces, selections, and breeding lines."
      },
      {
        eyebrow: "Seed",
        title: "Seedlings preserve variation",
        detail:
          "Sexual reproduction reshuffles traits, so seed populations can be less uniform than clonal fields while contributing diversity valuable to selection and breeding."
      },
      {
        eyebrow: "Cutting",
        title: "Clonal propagation preserves a selected plant",
        detail:
          "Nodal cuttings can reproduce a chosen bush more consistently, but nursery hygiene, rooting quality, mother-bush identity, and genetic breadth still matter."
      },
      {
        eyebrow: "Cultivar",
        title: "Choose for garden and manufacturing goal",
        detail:
          "Growth habit, flush timing, yield, chemistry, cold or drought response, pest and disease susceptibility, and intended tea style all influence cultivar choice."
      },
      {
        eyebrow: "Root",
        title: "A field-ready plant starts below the surface",
        detail:
          "Balanced roots, healthy shoots, suitable substrate, nutrition, drainage, hardening, and careful transplanting support establishment better than tall weak growth."
      },
      {
        eyebrow: "Trial",
        title: "Local trials reveal the useful traits",
        detail:
          "A cultivar’s reputation cannot replace evidence from the actual elevation, soil, weather, management, pest pressure, manufacture, and sensory evaluation."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Before a tea garden becomes a landscape, it is a decision about diversity, cultivar identity, propagation, healthy roots, and evidence from the real site."
      }
    ]
  },
  {
    id: "tea-garden-terroir",
    title: "The Living Tea Garden",
    eyebrow: "Place · Climate and management",
    summary:
      "Slope, soil, water, light, temperature, wind, shade, pruning, and field health shape the shoot before harvest.",
    checkpoint: "Site to shoot",
    motion: "glide",
    artwork: teaArtwork(
      "tea-garden-cultivar",
      "A highland tea garden field atlas showing terraces, drainage, shade trees, nursery beds, weather instruments, pruning tables, roots, and luminous water movement."
    ),
    landmark: { label: "Garden conditions", x: 73, y: 43 },
    drop: { x: 55, y: 60, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Climate",
        title: "Temperature and rain set the growth rhythm",
        detail:
          "Tea needs suitable warmth and moisture, but heat, drought, intense rain, frost, and changing seasons can alter yield, shoot quality, and field resilience."
      },
      {
        eyebrow: "Soil and drainage",
        title: "Roots need water without prolonged waterlogging",
        detail:
          "Soil structure, organic matter, acidity, fertility, slope, and drainage affect root health and the plant’s access to water and nutrients."
      },
      {
        eyebrow: "Light and shade",
        title: "Canopy exposure changes growth conditions",
        detail:
          "Shade, cloud, aspect, and plant density change light and temperature around the shoot; effects are site- and style-dependent rather than universally better."
      },
      {
        eyebrow: "Pruning table",
        title: "A managed bush renews harvestable shoots",
        detail:
          "Pruning and tipping shape a reachable plucking surface and stimulate new growth while the permanent plant remains in the field."
      },
      {
        eyebrow: "Stewardship",
        title: "Soil, biodiversity, pests, and labor belong together",
        detail:
          "Integrated field management considers erosion, soil cover, plant nutrition, pest thresholds, worker safety, and careful use of approved crop-protection tools."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Tea is not grown in a backdrop. Slope, water, soil, weather, shade, pruning, and care create the conditions for every new shoot."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Place can leave clues, but I never turn one altitude or one fog bank into a guaranteed flavor."
      }
    ]
  },
  {
    id: "tea-garden-resilience",
    title: "The Resilient Tea Garden",
    eyebrow: "Canopy · Soil · Plant health",
    summary:
      "Pruning cycles, plucking table, shade, soil, drainage, nutrition, weather, pests, disease, and worker observation keep a perennial garden productive.",
    checkpoint: "Manage the living canopy",
    motion: "orbit",
    artwork: teaArtwork(
      "tea-nursery-resilience",
      "A layered Camellia sinensis garden field atlas showing a level plucking table, pruning stages, shade trees, mulch and soil roots, drainage on slopes, weather instruments, blister blight and mite monitoring, beneficial habitat, and adult garden teams without printed labels."
    ),
    landmark: { label: "Resilient tea garden", x: 56, y: 42 },
    drop: { x: 38, y: 64, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Frame",
        title: "Pruning builds the future plucking table",
        detail:
          "Formative pruning, maintenance pruning, skiffing, tipping, and recovery periods shape bush height, branch density, productive shoots, access, and the next harvest cycle."
      },
      {
        eyebrow: "Flush",
        title: "Harvest depends on regrowth",
        detail:
          "Plucking removes young shoots; temperature, moisture, nutrition, cultivar, daylight, previous harvest, and canopy condition influence how quickly the next flush develops."
      },
      {
        eyebrow: "Soil",
        title: "Protect acidity, structure, roots, and slopes",
        detail:
          "Organic matter, ground cover, drainage, erosion control, traffic, and site-specific nutrition help roots function in tea’s often acidic growing conditions."
      },
      {
        eyebrow: "Shade",
        title: "Shade is a managed relationship",
        detail:
          "Species, spacing, lopping, wind, altitude, heat, moisture, pest pressure, and competition determine whether shade supports the garden or limits it."
      },
      {
        eyebrow: "Disease",
        title: "Tender shoots require careful monitoring",
        detail:
          "Blister blight and other diseases vary by region and weather. Forecasting, sanitation, canopy airflow, resistant material, and locally authorized controls belong in an integrated plan."
      },
      {
        eyebrow: "Pests",
        title: "Correct identification comes before intervention",
        detail:
          "Mites, tea mosquito bugs, thrips, loopers, flushworms, borers, and other pests differ by region; monitoring and thresholds guide cultural, biological, physical, and approved chemical responses."
      },
      {
        eyebrow: "Climate",
        title: "A perennial crop records changing weather",
        detail:
          "Heat, drought, intense rainfall, frost, wind, landslides, and shifting pest pressure can alter yield and chemistry, so resilience joins plant choice, soil, shade, water, and livelihood planning."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The neat green table is not a natural shape. It is years of pruning, regrowth, soil care, shade, weather, plant health, and skilled observation."
      }
    ]
  },
  {
    id: "tea-plucking-run",
    title: "The Plucking Run",
    eyebrow: "Harvest · Standard and speed",
    summary:
      "Hands or machines collect a chosen portion of new growth, then the clock starts on heat, bruising, moisture loss, and factory arrival.",
    checkpoint: "Shoot to basket",
    motion: "push-in",
    artwork: teaArtwork(
      "tea-garden-cultivar",
      "Tea workers carefully pluck tender shoots into clean baskets in a misty highland garden, beside a detailed bud and young-leaf study and a nearby collection point."
    ),
    landmark: { label: "Harvest shoot", x: 86, y: 31 },
    drop: { x: 68, y: 59, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Plucking standard",
        title: "The chosen shoot depends on the tea",
        detail:
          "A bud and two young leaves is a familiar fine-plucking reference, but bud-only, coarser, mature-leaf, and machine-harvest standards also serve specific products."
      },
      {
        eyebrow: "Hand harvest",
        title: "Selection can happen one shoot at a time",
        detail:
          "Skilled hand plucking can protect shoot integrity and select maturity, but it depends on trained labor, fair working conditions, time, and field access."
      },
      {
        eyebrow: "Mechanical harvest",
        title: "Speed changes the sorting problem",
        detail:
          "Mechanical collection can cover more area quickly but may gather a broader mix of leaf and stem, shifting control toward setup and post-harvest sorting."
      },
      {
        eyebrow: "Leaf care",
        title: "Heat and compression begin changing the leaf",
        detail:
          "Overfilled sacks, delay, sun, and rough transport can warm, bruise, or unevenly dehydrate fresh leaf before intentional processing begins."
      },
      {
        eyebrow: "Custody",
        title: "Field lot becomes factory lot",
        detail:
          "Collection time, garden block, cultivar, leaf condition, mass, and receiving inspection establish the traceable identity of the batch."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "The pluck defines the raw material. From this moment, gentle handling and fast, traceable movement protect what the garden created."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Garden block, cultivar, pluck standard, collection time, mass, temperature, and leaf condition become one receiving record."
      }
    ]
  },
  {
    id: "tea-fresh-leaf-receiving",
    title: "The Fresh Leaf Receiving Bay",
    eyebrow: "Handoff · Condition",
    summary:
      "Time, shoot standard, leaf temperature, bruising, foreign matter, lot identity, clean transport, and factory capacity determine how the living leaf enters manufacture.",
    checkpoint: "Garden to factory",
    motion: "glide",
    artwork: teaArtwork(
      "tea-leaf-receiving",
      "A SIP Academy tea factory receiving bay showing adult workers delivering ventilated fresh-leaf baskets, sample inspection of bud-and-leaf standards, gentle weighing, temperature measurement, lot-separated shallow trays, clean transport vehicles, foreign-matter removal, and rapid movement toward withering without printed labels."
    ),
    landmark: { label: "Fresh leaf receiving bay", x: 50, y: 45 },
    drop: { x: 46, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Time",
        title: "Fresh leaf keeps respiring after plucking",
        detail:
          "Delay, deep compaction, heat, poor ventilation, and rough transport can change aroma precursors, moisture, color, and condition before controlled manufacture begins."
      },
      {
        eyebrow: "Standard",
        title: "Verify the shoot that was ordered",
        detail:
          "Bud-and-leaf count, tenderness, banjhi or dormant shoots, coarse leaf, stems, damage, contamination, and cultivar mix affect both processing behavior and lot value."
      },
      {
        eyebrow: "Handling",
        title: "Protect leaf from pressure and unwanted bruising",
        detail:
          "Ventilated containers, shallow loading, clean surfaces, shade, and careful unloading reduce heating and cell damage before the intended withering or shaping step."
      },
      {
        eyebrow: "Measure",
        title: "Mass and condition establish the factory record",
        detail:
          "Representative sampling, calibrated weighing, leaf temperature, arrival time, supplier or field identity, and observed condition create the first manufacturing checkpoint."
      },
      {
        eyebrow: "Capacity",
        title: "The factory must match incoming flow",
        detail:
          "Harvest volume, withering-trough space, labor, power, weather, and planned style determine whether leaf can move promptly without mixing or overload."
      },
      {
        eyebrow: "Custody",
        title: "Keep lots distinct until blending is intentional",
        detail:
          "Field, cultivar, plucking round, producer, date, and receiving observations remain useful only when containers, trays, records, and factory routing preserve the link."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "The factory receives a living, changing material. Time, heat, pressure, shoot standard, capacity, and lot identity decide what reaches the withering trough."
      }
    ]
  },
  {
    id: "tea-withering-loft",
    title: "The Withering Loft",
    eyebrow: "Process · Moisture and pliability",
    summary:
      "Fresh leaf rests in moving air so moisture changes and the shoot becomes suitable for the next style-specific operation.",
    checkpoint: "Fresh to pliable",
    motion: "cutaway",
    artwork: teaArtwork(
      "tea-withering-loft-corrected",
      "A dry brass-and-glass tea withering loft with fresh leaf spread in shallow even beds, clean fans moving air through perforated troughs, humidity and temperature instruments, leaf becoming flexible, and adult tea makers including Sippy and Hummin checking condition without any spray or added mist."
    ),
    landmark: { label: "Withering trough", x: 52, y: 48 },
    drop: { x: 35, y: 62, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Physical wither",
        title: "Water leaves the shoot",
        detail:
          "Controlled moisture loss reduces turgor and makes leaves more pliable for rolling, bruising, or drying. The target varies by tea style."
      },
      {
        eyebrow: "Chemical change",
        title: "The leaf remains metabolically active",
        detail:
          "Aroma precursors and other compounds continue changing during withering; time and conditions influence later sensory development."
      },
      {
        eyebrow: "Airflow",
        title: "Even air prevents uneven leaf",
        detail:
          "Bed depth, turning, fan speed, temperature, and humidity affect the rate and uniformity of moisture loss."
      },
      {
        eyebrow: "Style fork",
        title: "Not every tea receives the same wither",
        detail:
          "White, oolong, and black teas commonly rely on meaningful withering; green- and yellow-tea sequences may use little or none depending on tradition."
      },
      {
        eyebrow: "Decision",
        title: "Feel, aroma, mass, and time inform release",
        detail:
          "Operators evaluate softness, stem flexibility, scent, leaf temperature, moisture loss, and process plan rather than following the clock alone."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Withering is controlled change, not waiting. Air, leaf depth, humidity, temperature, moisture loss, and style target move together."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "The fresh cut-grass edge may soften as floral and fruit possibilities begin to appear, but the leaf still has several paths ahead."
      }
    ]
  },
  {
    id: "tea-shaping-room",
    title: "Shape and Bruise",
    eyebrow: "Craft · Rolling and maceration",
    summary:
      "Hands, rollers, drums, and CTC machinery shape the leaf and may break cells, changing extraction and access to oxygen.",
    checkpoint: "Leaf to form",
    motion: "rotate",
    artwork: teaArtwork(
      "tea-shaping-oxidation",
      "A SIP Academy tea craft hall with hand rolling, orthodox rollers, oolong tumbling, and CTC equipment in separate zones around a branching leaf path."
    ),
    landmark: { label: "Rolling station", x: 24, y: 30 },
    drop: { x: 50, y: 59, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Hand shaping",
        title: "Form can be built by touch",
        detail:
          "Hand rolling, pressing, twisting, flattening, and repeated heating can create leaf form while controlling damage and aroma release."
      },
      {
        eyebrow: "Orthodox rolling",
        title: "Pressure twists and bruises whole leaf",
        detail:
          "Orthodox rollers shape withered leaf and rupture cells to a controlled degree, preparing many black and oolong teas for oxidation."
      },
      {
        eyebrow: "CTC",
        title: "Crush, tear, curl makes smaller particles",
        detail:
          "CTC machinery rapidly macerates leaf into granular tea suited to fast, strong extraction; it is not a universal measure of quality."
      },
      {
        eyebrow: "Oolong craft",
        title: "Bruising can be gradual and selective",
        detail:
          "Repeated tossing or tumbling can bruise leaf edges while the producer watches aroma and color before fixation."
      },
      {
        eyebrow: "Extraction",
        title: "Particle size changes the cup",
        detail:
          "Broken leaf exposes more surface area and generally extracts faster than intact leaf; brewing needs to respond to the finished grade."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Shaping is both architecture and chemistry. The maker decides how much to twist, bruise, break, or preserve before the next step."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Whole twists, pearl shapes, flat leaves, needles, and granules hint at craft and brewing behavior, but they do not tell the whole quality story."
      }
    ]
  },
  {
    id: "tea-oxidation-clock",
    title: "The Oxidation Clock",
    eyebrow: "Chemistry · Enzymes and oxygen",
    summary:
      "Bruised leaf meets oxygen while enzymes transform catechins and the maker watches color, aroma, time, temperature, and humidity.",
    checkpoint: "Green to copper",
    motion: "orbit",
    artwork: teaArtwork(
      "tea-shaping-oxidation",
      "A branching tea oxidation workshop showing green leaf becoming coppery on clean oxidation tables with monitored humidity and distinct green, oolong, black, and white paths."
    ),
    landmark: { label: "Oxidation tables", x: 71, y: 31 },
    drop: { x: 58, y: 57, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Enzymes",
        title: "Cell damage brings reactants together",
        detail:
          "Rolling or bruising lets leaf polyphenols, oxygen, and enzymes interact, driving color and flavor changes in many oolong and black teas."
      },
      {
        eyebrow: "Black tea",
        title: "Oxidation develops copper leaf and brisk liquor",
        detail:
          "Black-tea manufacture usually permits extensive enzymatic oxidation before drying stops the enzymes. Exact targets vary by origin and style."
      },
      {
        eyebrow: "Oolong tea",
        title: "Partial oxidation spans many traditions",
        detail:
          "Oolong processing may alternate withering, tossing, resting, bruising, and aroma checks before fixation arrests further enzymatic change."
      },
      {
        eyebrow: "Control",
        title: "Time alone is not the process",
        detail:
          "Leaf temperature, oxygen access, humidity, layer depth, degree of maceration, cultivar, and sensory target all influence the result."
      },
      {
        eyebrow: "Vocabulary",
        title: "Call this oxidation when microbes are not driving it",
        detail:
          "Industry language sometimes says fermentation, but enzymatic oxidation differs from microbial post-fermentation used for certain dark teas."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 9,
        text:
          "Oxidation is a monitored reaction: leaf damage, enzymes, oxygen, temperature, humidity, time, and the maker’s sensory target."
      },
      {
        speaker: "Roma",
        durationSeconds: 7,
        text:
          "Watch green become copper and fresh leaf become fruit, flowers, malt, spice, or deeper sweetness. Aroma helps call the stop."
      }
    ]
  },
  {
    id: "tea-leaf-chemistry-lab",
    title: "Inside the Tea Leaf",
    eyebrow: "Chemistry · Sensory potential",
    summary:
      "Caffeine, amino acids, catechins and other polyphenols, pigments, enzymes, carbohydrates, minerals, and volatile precursors change with plant, season, manufacture, and brew.",
    checkpoint: "Read the compounds carefully",
    motion: "orbit",
    artwork: teaArtwork(
      "tea-leaf-chemistry",
      "A cinematic SIP Academy tea chemistry laboratory centered on a magnified Camellia sinensis leaf cutaway with cells and veins, analytical instruments, infusion samples, catechin-to-theaflavin and thearubigin color transitions suggested visually, aroma vapor, caffeine crystals, amino-acid and polyphenol models, and adult researchers without printed labels."
    ),
    landmark: { label: "Tea leaf chemistry lab", x: 50, y: 45 },
    drop: { x: 48, y: 67, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Caffeine",
        title: "Caffeine varies within and among teas",
        detail:
          "Genetics, shoot position, season, growing conditions, processing, leaf particle size, dose, water, time, and repeated infusions affect measured caffeine and what reaches the cup."
      },
      {
        eyebrow: "Amino acids",
        title: "Theanine is one part of a larger taste system",
        detail:
          "Free amino acids, including theanine, can contribute to savory, sweet, and brothy impressions, but their effect is perceived alongside polyphenols, caffeine, aroma, and brew strength."
      },
      {
        eyebrow: "Catechins",
        title: "Fresh leaf stores reactive polyphenols",
        detail:
          "Catechins are prominent flavan-3-ols in fresh and minimally oxidized tea. Heat, enzymes, oxygen, moisture, and time redirect them through different pathways."
      },
      {
        eyebrow: "Oxidation products",
        title: "Theaflavins and thearubigins emerge during black-tea manufacture",
        detail:
          "Enzymatic oxidation and subsequent reactions transform catechin-derived material into complex pigments and flavor-active compounds associated with color, brightness, briskness, body, and astringency."
      },
      {
        eyebrow: "Aroma",
        title: "Volatiles come from plant and process",
        detail:
          "Cultivar, leaf maturity, stress, withering, cell disruption, oxidation, heating, roasting, microbes, storage, and brewing can create, release, transform, or lose aroma compounds."
      },
      {
        eyebrow: "Measure",
        title: "One number cannot define tea quality",
        detail:
          "Methods for caffeine, total polyphenols, catechins, water extract, moisture, particle size, color, and volatile compounds answer specific questions and need representative samples."
      },
      {
        eyebrow: "Health claims",
        title: "Composition is not permission to promise outcomes",
        detail:
          "The presence of caffeine, polyphenols, or other compounds does not justify disease-treatment claims; communicate serving context and evidence without turning a chemistry lesson into medical advice."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 10,
        text:
          "Inside the leaf, bitterness, astringency, savoriness, color, aroma, and energy are not separate buttons. Plant chemistry and process keep rewriting the balance."
      }
    ]
  },
  {
    id: "tea-fixation-station",
    title: "Fix the Moment",
    eyebrow: "Heat · Enzyme deactivation",
    summary:
      "Steam, heated pans, or other controlled heat deactivates enzymes and arrests enzymatic oxidation at the chosen point.",
    checkpoint: "Heat to halt",
    motion: "cutaway",
    artwork: teaArtwork(
      "tea-shaping-oxidation",
      "A tea fixation station with steam chamber, heated pans, tumbling drums, leaf cooling, and distinct green- and oolong-tea paths in a brass-and-glass Academy workshop."
    ),
    landmark: { label: "Fixation heat", x: 15, y: 72 },
    drop: { x: 42, y: 58, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Purpose",
        title: "Heat deactivates oxidation enzymes",
        detail:
          "Fixation—also called kill-green in some traditions—uses heat to arrest enzymatic oxidation and stabilize the maker’s chosen point."
      },
      {
        eyebrow: "Steam",
        title: "Moist heat moves quickly through leaf",
        detail:
          "Steaming is strongly associated with Japanese green-tea manufacture, but specific equipment, duration, and outcomes differ among teas."
      },
      {
        eyebrow: "Pan or drum",
        title: "Dry heat adds another sensory route",
        detail:
          "Heated pans or rotating drums can deactivate enzymes while creating style-specific cooked, nutty, chestnut, or toasted impressions."
      },
      {
        eyebrow: "Oolong stop",
        title: "Fixation preserves a chosen partial oxidation",
        detail:
          "For many oolongs, fixation follows controlled bruising and oxidation, stopping the reaction before later rolling and drying."
      },
      {
        eyebrow: "Balance",
        title: "Too little and too much both matter",
        detail:
          "Insufficient heating can leave enzymes active; excessive or uneven heat can scorch leaf, dull aroma, or create inconsistent moisture."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Fixation is a decisive pause. Steam, pan, or drum heat stops the enzyme activity at the point the maker intends to preserve."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Method, leaf load, temperature, residence time, cooling, and residual moisture stay linked in the batch record."
      }
    ]
  },
  {
    id: "tea-drying-finish",
    title: "Dry for the Journey",
    eyebrow: "Stability · Moisture and aroma",
    summary:
      "Air and heat reduce moisture to a stable target while the maker protects leaf integrity and develops the intended finish.",
    checkpoint: "Made tea",
    motion: "glide",
    artwork: teaArtwork(
      "tea-drying-sorting",
      "A complete tea drying hall with conveyor dryer, basket roaster, leaf cooling, moisture checks, and finished green, oolong, black, and white tea in separate lots."
    ),
    landmark: { label: "Drying line", x: 44, y: 45 },
    drop: { x: 66, y: 63, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Stability",
        title: "Lower moisture slows deterioration",
        detail:
          "Drying brings made tea toward a stable moisture level for sorting and storage while stopping heat-sensitive or enzymatic change as the process requires."
      },
      {
        eyebrow: "Equipment",
        title: "Airflow and leaf depth shape uniformity",
        detail:
          "Conveyor dryers, ovens, baskets, pans, drums, and sun-drying traditions create different heat-transfer and handling conditions."
      },
      {
        eyebrow: "Aroma",
        title: "Drying can preserve and create aroma",
        detail:
          "Time and temperature influence volatile retention and thermal aromas; the goal is product-specific rather than maximum heat."
      },
      {
        eyebrow: "Cooling",
        title: "Hot leaf should not enter a sealed package",
        detail:
          "Controlled cooling limits condensation and helps the team inspect dry-leaf aroma, color, feel, and moisture consistency."
      },
      {
        eyebrow: "Roast",
        title: "A finishing roast is a separate choice",
        detail:
          "Some oolong and other teas receive later roasting for aroma development or stability; roast level should not be confused with the initial drying step."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "The goal is stable made tea, not simply hot leaf. Moisture, airflow, temperature, residence time, cooling, and aroma all need confirmation."
      },
      {
        speaker: "Roma",
        durationSeconds: 6,
        text:
          "Dry leaf should smell alive, not damp, stale, or scorched. The finish protects the next journey."
      }
    ]
  },
  {
    id: "tea-sorting-room",
    title: "Sort the Leaf",
    eyebrow: "Grade · Size and integrity",
    summary:
      "Screens, airflow, optics, and hands separate finished tea by particle size, density, appearance, and defects without pretending grade equals flavor.",
    checkpoint: "Leaf to lot",
    motion: "cutaway",
    artwork: teaArtwork(
      "tea-drying-sorting",
      "A tea sorting hall with vibrating screens, airflow separator, optical inspection, whole leaf, broken leaf, fannings, dust, stems, and clean traceable lots."
    ),
    landmark: { label: "Sorting screens", x: 64, y: 42 },
    drop: { x: 53, y: 61, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Screen size",
        title: "Grades often describe particle size",
        detail:
          "Terms such as whole leaf, broken leaf, fannings, and dust commonly describe physical grade and extraction behavior, not a universal quality ranking."
      },
      {
        eyebrow: "Cleanliness",
        title: "Foreign material and defects are removed",
        detail:
          "Magnets, sieves, airflow, optical sorting, and hand inspection help remove fiber, stalk, stones, metal, or off-spec leaf."
      },
      {
        eyebrow: "Uniformity",
        title: "Similar particles brew more predictably",
        detail:
          "A consistent lot reduces the risk that tiny particles overextract before larger leaves have fully opened."
      },
      {
        eyebrow: "CTC and orthodox",
        title: "Form should be judged in context",
        detail:
          "Granular CTC and twisted orthodox teas serve different brewing, blending, and market needs; neither label alone guarantees quality."
      },
      {
        eyebrow: "Lot identity",
        title: "Sorting creates new traceable fractions",
        detail:
          "Each separated grade retains links to garden, production batch, test results, mass balance, storage, and eventual blend or package."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Sorting turns one finished batch into useful, consistent lots. Read grade as physical information, not a shortcut to taste."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Every fraction receives a new lot identity while preserving the evidence of where it came from."
      }
    ]
  },
  {
    id: "tea-quality-cupping-lab",
    title: "The Tea Quality and Cupping Lab",
    eyebrow: "Condition · Comparison",
    summary:
      "Dry leaf, infused leaf, liquor, moisture, particle distribution, water extract, caffeine, polyphenols, taint, defects, and controlled tasting create a defensible quality record.",
    checkpoint: "Inspect, infuse, compare",
    motion: "orbit",
    artwork: teaArtwork(
      "tea-quality-cupping",
      "A refined SIP Academy professional tea laboratory showing dry-leaf trays, particle-size sieves, moisture and analytical instruments, white tasting bowls and lidded cups, timed standardized infusions, infused leaves displayed on lids, liquor color and clarity comparisons, aroma evaluation, and adult tasters including Roma and Hummin without printed labels."
    ),
    landmark: { label: "Tea quality and cupping lab", x: 52, y: 44 },
    drop: { x: 47, y: 66, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Dry leaf",
        title: "Appearance describes preparation and condition",
        detail:
          "Color, shape, twist, particle distribution, tips, stems, foreign matter, bloom, breakage, and uniformity provide clues; none alone proves sensory quality."
      },
      {
        eyebrow: "Infused leaf",
        title: "Open leaf reveals manufacture",
        detail:
          "Color, tenderness, evenness, leaf size, oxidation pattern, scorching, stalk, and aroma can expose raw-material or process differences hidden in the dry sample."
      },
      {
        eyebrow: "Liquor",
        title: "Read aroma, taste, mouthfeel, and finish together",
        detail:
          "Intensity, clarity, sweetness, umami, acidity, bitterness, astringency, briskness, body, drying texture, balance, faults, and persistence need precise language and brew context."
      },
      {
        eyebrow: "Standard",
        title: "ISO 3103 supports comparison, not universal service",
        detail:
          "A controlled infusion method reduces preparation variation during sensory tests; cultural and hospitality brewing traditions remain legitimate for their own purposes."
      },
      {
        eyebrow: "Condition",
        title: "Moisture, oxygen, heat, light, and odor leave evidence",
        detail:
          "Stale, musty, smoky, chemical, metallic, rancid, scorched, sour, or storage-tainted character should be investigated through package, warehouse, process, and sample history."
      },
      {
        eyebrow: "Grade",
        title: "Particle-size grades are not universal quality rankings",
        detail:
          "Whole-leaf, broken, fannings, dust, orthodox, and CTC terms describe preparation within particular systems; origin and trade conventions must be stated before comparing labels."
      },
      {
        eyebrow: "Evidence",
        title: "Analytical and sensory records answer different questions",
        detail:
          "Moisture, water extract, caffeine, polyphenols, residues, particle size, color, and sensory results become useful when method, sample, lot, and decision are linked."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 10,
        text:
          "The lab protects curiosity from guesswork. We compare dry leaf, wet leaf, liquor, condition, measurement, and context before we declare what a tea is worth."
      }
    ]
  },
  {
    id: "tea-style-crossroads",
    title: "Six Tea Paths",
    eyebrow: "Style · Branching manufacture",
    summary:
      "One plant becomes six tea families through different choices in withering, fixation, oxidation, shaping, drying, and microbial transformation.",
    checkpoint: "One plant, six families",
    motion: "reassemble",
    artwork: teaArtwork(
      "tea-style-crossroads",
      "A luminous SIP Academy tea crossroads branching one Camellia sinensis shoot toward coherent white, green, yellow, oolong, black, and dark-tea craft stations and cups."
    ),
    landmark: { label: "Style crossroads", x: 50, y: 47 },
    drop: { x: 50, y: 58, size: 7 },
    fieldNotes: [
      {
        eyebrow: "White tea",
        title: "Wither and dry, with careful variation",
        detail:
          "White tea is generally minimally handled and relies strongly on withering and drying, though cultivar, pluck, airflow, and exact practice vary."
      },
      {
        eyebrow: "Green tea",
        title: "Early fixation redirects the leaf",
        detail:
          "Green-tea manufacture uses early heat fixation to limit enzymatic oxidation, followed by style-specific shaping and drying that may emphasize fresh, steamed, toasted, or roasted character."
      },
      {
        eyebrow: "Yellow tea",
        title: "A controlled sealed rest changes the route",
        detail:
          "Yellow-tea traditions add a managed yellowing stage after or around fixation, using warmth, moisture, wrapping or heaping, time, and repeated handling before final drying."
      },
      {
        eyebrow: "Oolong",
        title: "Bruise, partially oxidize, fix, and shape",
        detail:
          "Oolong is a broad family whose makers manage withering, repeated agitation, partial oxidation, fixation, rolling, drying, and sometimes roasting."
      },
      {
        eyebrow: "Black tea",
        title: "Extensive enzymatic oxidation before drying",
        detail:
          "Withering and maceration prepare black tea for extensive oxidation; drying arrests the reaction and stabilizes the leaf."
      },
      {
        eyebrow: "Dark tea",
        title: "Microbial post-fermentation creates another route",
        detail:
          "Certain dark teas undergo microbial transformation during pile fermentation or aging. That biology is distinct from black-tea enzymatic oxidation."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The six families are not six plants. They are branching craft systems built from plant material, place, sequence, and control."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Follow the sequence before predicting the cup. Color names alone cannot explain aroma, texture, or quality."
      }
    ]
  },
  {
    id: "tea-dark-transformation",
    title: "The Dark Tea Transformation Room",
    eyebrow: "Microbes · Time · Storage",
    summary:
      "Pile fermentation, controlled moisture and heat, microbial ecology, turning, drying, compression, clean storage, and aging create category-specific dark-tea routes.",
    checkpoint: "Oxidation is not the whole story",
    motion: "cutaway",
    artwork: teaArtwork(
      "tea-dark-trade",
      "A warm SIP Academy dark-tea transformation room showing clean leaf piles monitored for temperature and moisture, careful turning, microbial activity suggested through subtle luminous patterns, drying racks, loose and compressed finished forms, breathable clean aging storage, sample tasting, and adult tea makers without printed labels."
    ),
    landmark: { label: "Dark tea transformation room", x: 51, y: 45 },
    drop: { x: 44, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Category",
        title: "Dark tea is not simply very oxidized black tea",
        detail:
          "Microbial transformation after initial manufacture distinguishes post-fermented dark-tea routes from the enzyme-driven oxidation emphasized in black and oolong tea."
      },
      {
        eyebrow: "Route",
        title: "Pile fermentation and aging are not identical processes",
        detail:
          "Some teas receive an accelerated moist-pile transformation; others develop through slower storage, and many traditions combine processing, compression, and later aging differently."
      },
      {
        eyebrow: "Control",
        title: "Moisture, temperature, oxygen, and turning guide the pile",
        detail:
          "Operators monitor heat distribution, humidity, leaf condition, aroma, microbial activity, turning, sanitation, and endpoint so biological change remains intentional."
      },
      {
        eyebrow: "Form",
        title: "Loose and compressed tea age differently",
        detail:
          "Leaf grade, compression density, shape, wrapper, storage airflow, humidity, temperature, and handling alter how moisture, oxygen, and aroma move through the tea."
      },
      {
        eyebrow: "Condition",
        title: "Aging does not excuse contamination",
        detail:
          "Clean material, controlled storage, pest protection, odor separation, moisture monitoring, and sensory inspection distinguish desired development from mold, taint, or unsafe deterioration."
      },
      {
        eyebrow: "Language",
        title: "Name the specific tradition and process",
        detail:
          "Pu'er and other dark teas have protected, geographic, historical, and manufacturing contexts; avoid treating one famous example as the definition of every post-fermented tea."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 10,
        text:
          "Here the process record gains a living variable: microbes. Temperature, moisture, oxygen, turning, sanitation, form, and storage decide whether time becomes craft or damage."
      }
    ]
  },
  {
    id: "tea-blending-room",
    title: "The Blending Table",
    eyebrow: "Assembly · Origin and intent",
    summary:
      "Single-origin lots, seasonal components, scented teas, flavored teas, and house blends meet at a transparent assembly table.",
    checkpoint: "Lots to expression",
    motion: "orbit",
    artwork: teaArtwork(
      "tea-blending-packaging",
      "A SIP Academy tea blending archive with distinct origin lots, balance scale, tasting cups, jasmine flowers, bergamot peel, permitted flavor tools, and a traceable blend vessel."
    ),
    landmark: { label: "Blending table", x: 43, y: 49 },
    drop: { x: 60, y: 61, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Single lot",
        title: "Specificity preserves variation",
        detail:
          "A garden, field, cultivar, season, or production lot can stand alone when its identity and quality support the intended release."
      },
      {
        eyebrow: "Blend",
        title: "Components can build consistency or complexity",
        detail:
          "Blenders may combine gardens, seasons, grades, or styles to reach a house profile, price, strength, color, or supply target."
      },
      {
        eyebrow: "Scented tea",
        title: "Aroma can be transferred from botanicals",
        detail:
          "Traditional scenting may repeatedly expose finished tea to fragrant flowers such as jasmine, followed by separation and finishing."
      },
      {
        eyebrow: "Flavored tea",
        title: "Added flavor should be declared honestly",
        detail:
          "Natural or other permitted flavorings, oils, spices, fruit, and botanicals create flavored blends whose ingredients and allergens require accurate presentation."
      },
      {
        eyebrow: "Formula",
        title: "Every component keeps a traceable role",
        detail:
          "Blend percentages, component lots, sensory approval, allergen review, claims, and final mass balance define the release."
      }
    ],
    narration: [
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Blending is composition, not disguise. Each component should have a clear sensory job and an honest place in the story."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Formula, component lots, weights, sensory approval, declarations, and final mass balance must reconcile."
      }
    ]
  },
  {
    id: "tea-package-passport",
    title: "The Tea Passport",
    eyebrow: "Packaging · Protection and traceability",
    summary:
      "Finished tea enters moisture-, oxygen-, light-, and aroma-conscious packaging with truthful identity, lot coding, storage, and a route to market.",
    checkpoint: "Made tea to market",
    motion: "glide",
    artwork: teaArtwork(
      "tea-blending-packaging",
      "A wide SIP Academy tea packing and traceability hall with lined pouches, tins, tea bags, lot coding, seal inspection, cartons, cool dry storage, and route maps."
    ),
    landmark: { label: "Packing line", x: 71, y: 50 },
    drop: { x: 57, y: 62, size: 6 },
    fieldNotes: [
      {
        eyebrow: "Barrier",
        title: "Dry tea still reacts with its environment",
        detail:
          "Packaging helps limit moisture uptake, oxygen, light, contamination, and foreign odors that can flatten or distort tea."
      },
      {
        eyebrow: "Format",
        title: "Loose leaf and portion packs change brewing behavior",
        detail:
          "Leaf room, particle size, dose, filter material, and package oxygen exposure affect convenience, extraction, and freshness."
      },
      {
        eyebrow: "Label",
        title: "Identity should separate tea from story",
        detail:
          "Product name, ingredients, net quantity, responsible business, date coding, origin claims, and instructions must follow the destination market’s rules."
      },
      {
        eyebrow: "Lot code",
        title: "The package must point backward",
        detail:
          "A lot code connects the retail pack to packed batch, blend, component lots, testing, supplier records, and corrective action."
      },
      {
        eyebrow: "Storage",
        title: "Cool, dry, dark, clean, and odor-safe",
        detail:
          "Warehousing and retail presentation should protect sealed tea from heat, humidity, light, pests, damage, and strong surrounding aromas."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 8,
        text:
          "Packaging is the leaf’s travel gear. It protects dryness and aroma while carrying a truthful, traceable identity into the market."
      },
      {
        speaker: "Hummin",
        durationSeconds: 7,
        text:
          "Trace backward from package code to packing run, blend, component lots, process records, and garden custody."
      }
    ]
  },
  {
    id: "tea-trade-custody",
    title: "The Tea Trade and Custody Hall",
    eyebrow: "Lot · Warehouse · Market",
    summary:
      "Producer records, samples, auctions or direct contracts, dry storage, odor protection, shipping, blending custody, and truthful claims carry tea from factory to buyer.",
    checkpoint: "Factory to market",
    motion: "glide",
    artwork: teaArtwork(
      "tea-dark-trade",
      "A wide SIP Academy tea trade hall connecting producer lots and samples, a neutral auction and direct-contract desk, sealed moisture-barrier packages, clean dry warehouse stacks, odor-isolated storage, container loading, traceability seals, blending custody, and adult smallholder and buyer teams without printed labels."
    ),
    landmark: { label: "Tea trade and custody hall", x: 54, y: 44 },
    drop: { x: 47, y: 65, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Lot",
        title: "Identity must survive aggregation",
        detail:
          "Producer, garden or region, cultivar where known, pluck, manufacture, date, grade, mass, tests, and package codes remain meaningful only when records and physical lots agree."
      },
      {
        eyebrow: "Sample",
        title: "The offer sample should represent the shipment",
        detail:
          "Sampling method, sealing, storage, preparation, and comparison to pre-shipment or arrival material protect both buyer and seller from judging an unrepresentative handful."
      },
      {
        eyebrow: "Market",
        title: "Auctions and direct contracts are different routes",
        detail:
          "Public auction, private sale, cooperative marketing, estate contract, importer program, and direct relationship distribute information, price discovery, risk, and bargaining power differently."
      },
      {
        eyebrow: "Warehouse",
        title: "Dry tea is highly vulnerable to its environment",
        detail:
          "Moisture, heat, oxygen, light, pests, dust, chemicals, spices, smoke, fuel, and strong odors can damage condition, so barriers, spacing, inspection, and stock rotation matter."
      },
      {
        eyebrow: "Transit",
        title: "Containers need dryness and odor control",
        detail:
          "Clean inspection, dry flooring, intact liners, suitable pallets, condensation risk management, sealing, route timing, and arrival checks help protect tea through transport."
      },
      {
        eyebrow: "Value",
        title: "Traceability should return value, not only paperwork",
        detail:
          "Smallholders and workers can carry much of the production risk; transparent quality evidence, contracts, payment terms, services, and market access determine whether traceability improves livelihoods."
      },
      {
        eyebrow: "Claim",
        title: "Origin, style, grade, and certification need boundaries",
        detail:
          "State the governing geography, standard, chain of custody, blend composition, certification scope, and evidence rather than implying every front-label term means the same thing worldwide."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 10,
        text:
          "Tea can cross many borders after the factory. Samples, contracts, packages, warehouses, containers, records, and fair communication must protect both the leaf and the people behind it."
      }
    ]
  },
  {
    id: "tea-brew-compass",
    title: "The Brew Compass",
    eyebrow: "Extraction · Water, dose, heat, and time",
    summary:
      "The same tea becomes different cups as water, leaf ratio, temperature, time, agitation, vessel, and repeated infusions change extraction.",
    checkpoint: "Leaf to liquor",
    motion: "push-in",
    artwork: teaArtwork(
      "tea-brewing-service",
      "A SIP Academy tea brewing laboratory with kettle, water station, scales, thermometer, timer, gaiwan, kyusu, teapot, tasting bowls, leaf expansion, and multiple infusion paths."
    ),
    landmark: { label: "Brewing compass", x: 49, y: 46 },
    drop: { x: 32, y: 59, size: 7 },
    fieldNotes: [
      {
        eyebrow: "Water",
        title: "Water quality changes what the leaf can show",
        detail:
          "Potable water with appropriate mineral content and no off-odors supports clarity; extreme hardness, alkalinity, chlorine character, or softness can alter extraction and perception."
      },
      {
        eyebrow: "Dose",
        title: "Leaf-to-water ratio sets the extraction load",
        detail:
          "Mass is more reliable than spoon volume because twisted, compressed, and broken teas occupy very different space."
      },
      {
        eyebrow: "Temperature",
        title: "Hotter water extracts faster and differently",
        detail:
          "Temperature should fit the leaf and goal; delicate green teas often use cooler water than robust black teas, but fixed rules ignore style, dose, and time."
      },
      {
        eyebrow: "Time",
        title: "Longer is not automatically stronger in a useful way",
        detail:
          "Time interacts with particle size, dose, temperature, agitation, and chemistry. Overlong extraction may emphasize bitterness or astringency."
      },
      {
        eyebrow: "Repeat",
        title: "Some leaves are designed to open across infusions",
        detail:
          "Gongfu and other repeated-infusion approaches use different ratios and shorter steeps, revealing changing aroma, texture, and finish over time."
      },
      {
        eyebrow: "Vessel",
        title: "Geometry and agitation steer contact",
        detail:
          "A gaiwan, basket infuser, kyusu, lidded bowl, or large pot gives leaves different room to open. Pouring, stirring, and vessel heat retention can change extraction even when dose and time match."
      },
      {
        eyebrow: "Method",
        title: "Tea service is culturally plural",
        detail:
          "Steeping, boiling, whisking, simmering with milk or spices, and cold extraction are distinct practices. Judge each method against its tea, tradition, safety, and intended experience rather than one universal recipe."
      }
    ],
    narration: [
      {
        speaker: "Hummin",
        durationSeconds: 8,
        text:
          "Record the brew before judging the leaf: water, dose, temperature, time, vessel, agitation, and infusion number."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Taste the curve. Aroma arrives, structure builds, sweetness shifts, and the finish tells you whether to adjust the next infusion."
      }
    ]
  },
  {
    id: "tea-table-service",
    title: "The Living Tea Table",
    eyebrow: "Sensory · Service and hospitality",
    summary:
      "Dry leaf, infused leaf, liquor, temperature, vessel, context, and guest care reconnect the garden and factory at the table.",
    checkpoint: "Garden to memory",
    motion: "reassemble",
    artwork: teaArtwork(
      "tea-brewing-service",
      "An intimate SIP Academy tea pavilion where adult Sippy and Roma and Hummin guide a comparative service with small cups, dry leaf, infused leaf, water, food, and welcoming guests."
    ),
    landmark: { label: "Tea table", x: 58, y: 57 },
    drop: { x: 47, y: 64, size: 8 },
    fieldNotes: [
      {
        eyebrow: "Observe",
        title: "Read dry leaf, wet leaf, and liquor together",
        detail:
          "Appearance, leaf integrity, aroma, liquor color, clarity, taste, mouthfeel, aftertaste, and changing infusions create a fuller record than one score."
      },
      {
        eyebrow: "Calibrate",
        title: "Standardized preparation supports comparison",
        detail:
          "A consistent method such as ISO 3103 can support comparative sensory work; it is a test protocol, not the only correct way to serve tea."
      },
      {
        eyebrow: "Language",
        title: "Name evidence before prestige",
        detail:
          "Describe aroma, taste, texture, balance, intensity, persistence, condition, and brewing context before relying on price, origin, or marketing claims."
      },
      {
        eyebrow: "Hospitality",
        title: "The guest controls pace and participation",
        detail:
          "Explain caffeine when relevant, offer water and food, accommodate temperature and dietary needs, and provide caffeine-free infusions without presenting them as true tea."
      },
      {
        eyebrow: "Temperature care",
        title: "A beautiful cup should be comfortable to drink",
        detail:
          "Let very hot liquor cool before service and warn the guest when a vessel retains heat. IARC defines beverages consumed above 65 Â°C as very hot; safe hospitality never treats scalding temperature as a mark of quality."
      },
      {
        eyebrow: "Reconnection",
        title: "Every clue travels backward",
        detail:
          "Freshness, floral lift, umami, briskness, roast, oxidation, smoke, sweetness, astringency, and finish can reconnect the cup to plant, process, package, and brew."
      }
    ],
    narration: [
      {
        speaker: "Sippy",
        durationSeconds: 9,
        text:
          "The table is not the end of the process. It is where the garden, maker, merchant, brewer, and guest finally become visible together."
      },
      {
        speaker: "Roma",
        durationSeconds: 8,
        text:
          "Taste slowly and name what is present. You are not memorizing a color family; you are recognizing connected choices."
      }
    ]
  }
];

const teaScenes: BeyondTheGlassScene[] = teaSceneSeeds.map((scene, index) => ({
  ...scene,
  number: String(index + 1).padStart(2, "0"),
  range: [index / teaSceneSeeds.length, (index + 1) / teaSceneSeeds.length]
}));

export const teaFieldTrip: BeyondTheGlassChapter = {
  slug: "tea",
  title: "Beyond The Glass",
  chapterTitle: "Tea · From Garden to Cup",
  subject: "A style-aware tea field trip",
  description:
    "A 22-stop visual SIP Academy field trip through Camellia sinensis genetics, nursery and garden resilience, plucking and fresh-leaf receiving, leaf chemistry, withering, shaping, oxidation, fixation, drying, sorting, six tea-style crossroads, microbial dark-tea transformation, quality cupping, trade custody, brewing, sensory evaluation, and hospitality.",
  coreMessage:
    "White, green, yellow, oolong, black, and dark tea share Camellia sinensis, not one universal process: plant material, place, pluck, time, heat, oxygen, microbes, storage, water, trade, and service create the truthful path from nursery to living cup.",
  assets: {
    academyMap: "/beyond-the-glass/sip-academy-1600.webp",
    academyMapSet:
      "/beyond-the-glass/sip-academy-960.webp 960w, /beyond-the-glass/sip-academy-1600.webp 1600w",
    centralDrop: "/beyond-the-glass/central-drop.webp",
    reducedMotionPoster: "/beyond-the-glass/tea/tea-academy-gate-960.webp"
  },
  scenes: teaScenes,
  sources: [
    {
      id: "fao-tea-smallholders",
      organization: "Food and Agriculture Organization of the United Nations",
      title: "Contribution of Smallholders to the Tea Sub-sector and Policies Required to Enhance Their Livelihood",
      url:
        "https://www.fao.org/fileadmin/templates/est/COMM_MARKETS_MONITORING/Tea/Documents/IGG_20/12-CRS2-Smallholders.pdf",
      note:
        "Primary intergovernmental reference connecting Camellia sinensis cultivation, soil and drainage management, regular plucking, factory proximity, and the smallholder production system."
    },
    {
      id: "fao-crop-to-cup",
      organization: "Food and Agriculture Organization of the United Nations",
      title: "From Crop to Cup: Working with Kenya to Make Tea Low Carbon",
      url:
        "https://www.fao.org/climate-change/news/news-detail/from-crop-to-cup--working-with-kenya-to-make-tea-low-carbon/en",
      note:
        "Current FAO field context for tea-growing climate, slopes, soils, smallholder livelihoods, soil improvement, and climate risk."
    },
    {
      id: "tea-board-india-plant-protection",
      organization: "Tea Board India",
      title: "Plant Protection Code for the Indian Tea Industry, Version 19",
      url: "https://www.teaboard.gov.in/pdf/PPC_Version_19_April_2026_pdf9891.pdf",
      note:
        "Official current reference for integrated field stewardship, worker and consumer safety, approved crop protection, pest and disease monitoring, pruning, and plucking conditions."
    },
    {
      id: "us-tea-research-review",
      organization: "Frontiers in Plant Science",
      title: "United States Tea: Ongoing Research and Production Solutions",
      url: "https://doi.org/10.3389/fpls.2022.934651",
      note:
        "Peer-reviewed technical synthesis used for Camellia sinensis botany and the style-specific distinctions among withering, bruising, oxidation, fixation, drying, and microbial dark-tea processing."
    },
    {
      id: "tea-quality-sensory-review",
      organization: "Foods",
      title: "Tea Quality: Analytical Methods and Sensory Analyses",
      url: "https://doi.org/10.3390/foods13223580",
      note:
        "Peer-reviewed current synthesis supporting careful links among leaf chemistry, manufacture, aroma, taste, color, texture, brewing, and sensory evaluation."
    },
    {
      id: "black-tea-harvest-processing-review",
      organization: "Foods",
      title: "Tea Harvesting and Processing Techniques and Their Effect on Black Tea Quality",
      url: "https://doi.org/10.3390/foods12244467",
      note:
        "Peer-reviewed review supporting black-tea plucking, withering, rolling or CTC maceration, enzymatic oxidation, drying, grading, and quality-control context."
    },
    {
      id: "iso-tea-sensory-preparation",
      organization: "International Organization for Standardization",
      title: "ISO 3103:2019 — Tea: Preparation of Liquor for Use in Sensory Tests",
      url: "https://www.iso.org/standard/73224.html",
      note:
        "Current international standard confirming a controlled infusion method for comparative sensory testing; used as a calibration protocol rather than a universal service recipe."
    },
    {
      id: "iso-black-tea-standard",
      organization: "International Organization for Standardization",
      title: "ISO 3720:2011 — Black Tea: Definition and Basic Requirements",
      url: "https://www.iso.org/standard/51541.html",
      note:
        "International standards context for black-tea identity and basic requirements, complementing the process and grading lessons."
    },
    {
      id: "kew-camellia-sinensis",
      organization: "Royal Botanic Gardens, Kew",
      title: "Camellia sinensis (L.) Kuntze — Plants of the World Online",
      url:
        "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A828548-1/general-information",
      note:
        "Authoritative botanical reference for the accepted species, cultivated habit, distribution, and the sinensis and assamica variety context used in the nursery and genetics stop."
    },
    {
      id: "iso-green-tea-standard",
      organization: "International Organization for Standardization",
      title: "ISO 11287:2011 — Green Tea: Definition and Basic Requirements",
      url: "https://www.iso.org/standard/51540.html",
      note:
        "Current confirmed international standard supporting green-tea plant material, identity, basic chemical requirements, packing, and marking context."
    },
    {
      id: "iso-white-tea-definition",
      organization: "International Organization for Standardization",
      title: "ISO/TR 12591:2013 — White Tea: Definition",
      url: "https://www.iso.org/standard/51542.html",
      note:
        "Internationally agreed white-tea definition based on plant source and production method, used to keep the style crossroads process-specific."
    },
    {
      id: "iso-tea-chemical-classification",
      organization: "International Organization for Standardization",
      title: "ISO/TS 5617:2025 — Tea: Classification by Chemical Composition",
      url: "https://www.iso.org/standard/81441.html",
      note:
        "Current technical specification for chemical classification of six primary tea types, supporting careful discussion of catechins, caffeine, theanine, and style identity without reducing tea to one compound."
    },
    {
      id: "upasi-tea-pests-diseases",
      organization: "UPASI Tea Research Foundation",
      title: "Tea Pests and Diseases",
      url: "https://www.upasitearesearch.org/pests-diseases/",
      note:
        "Tea-research reference for common garden pest and disease pressure, used alongside Tea Board India stewardship guidance in the resilience stop."
    },
    {
      id: "iarc-very-hot-beverages",
      organization: "International Agency for Research on Cancer, World Health Organization",
      title: "Cancer of the Oesophagus and Drinking Very Hot Beverages",
      url: "https://www.iarc.who.int/media-centre-iarc-news-drinking-very-hot-beverages/",
      note:
        "Official temperature-safety reference defining very hot beverages as those consumed above 65 °C; used only for guest-care guidance, not to make disease-treatment claims about tea."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" }
};
