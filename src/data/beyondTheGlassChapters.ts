export type BeyondTheGlassSpeaker = "Sippy" | "Roma" | "Hummin";

export type BeyondTheGlassNarrationLine = {
  speaker: BeyondTheGlassSpeaker;
  text: string;
  durationSeconds: number;
};

export type BeyondTheGlassScene = {
  id: string;
  number: string;
  title: string;
  range: readonly [number, number];
  eyebrow: string;
  summary: string;
  emotionalPurpose: string;
  visualCue: string;
  narration: BeyondTheGlassNarrationLine[];
};

export type BeyondTheGlassLayer = {
  id: string;
  number: string;
  title: string;
  guide: BeyondTheGlassSpeaker;
  object: string;
  explanation: string;
  question: string;
  sourceIds: string[];
};

export type BeyondTheGlassSource = {
  id: string;
  organization: string;
  title: string;
  url: string;
  note: string;
};

export type BeyondTheGlassChapter = {
  slug: string;
  title: string;
  chapterTitle: string;
  subject: string;
  description: string;
  coreMessage: string;
  assets: {
    opening: string;
    midAltitude: string;
    centralSubject: string;
    isolation: string;
    orbit: string;
    noise: string;
    finalArtifact: string;
    lobby: string;
    reducedMotionPoster: string;
    socialShare: string;
  };
  scenes: BeyondTheGlassScene[];
  knowledgeLayers: BeyondTheGlassLayer[];
  sources: BeyondTheGlassSource[];
  primaryCta: { label: string; route: string };
  secondaryCta: { label: string; href: string };
};

export const journeyOfADrop: BeyondTheGlassChapter = {
  slug: "journey-of-a-drop",
  title: "Beyond The Glass",
  chapterTitle: "The Journey of a Drop",
  subject: "A single drop of water",
  description:
    "Follow Sippy, Roma, and Hummin through the connected origins, ingredients, processes, people, and responsibilities inside every beverage.",
  coreMessage: "Every sip contains a system. Every system contains a story.",
  assets: {
    opening: "/beyond-the-glass/landscape-living-archive.webp",
    midAltitude: "/beyond-the-glass/landscape-mid-altitude.webp",
    centralSubject: "/beyond-the-glass/central-drop.webp",
    isolation: "/beyond-the-glass/drop-isolation.webp",
    orbit: "/beyond-the-glass/knowledge-orbit.webp",
    noise: "/beyond-the-glass/noise-fragments.webp",
    finalArtifact: "/beyond-the-glass/living-knowledge-card.webp",
    lobby: "/beyond-the-glass/living-archive-lobby.webp",
    reducedMotionPoster: "/beyond-the-glass/poster-reduced-motion.webp",
    socialShare: "/beyond-the-glass/social-beyond-the-glass.webp"
  },
  scenes: [
    {
      id: "living-landscape",
      number: "01",
      title: "The Living Landscape",
      range: [0, 0.12],
      eyebrow: "Wonder",
      summary: "An entire beverage world comes into view, connected by water.",
      emotionalPurpose: "Reveal scale and connection.",
      visualCue: "Aerial ecosystem with illuminated waterways.",
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 24,
          text:
            "From a distance, a beverage can appear simple. But every sip begins inside a much larger world: clouds and watersheds, soil and roots, growers and makers, cellars and cafés, laboratories, service rooms, and the communities that keep them connected."
        }
      ]
    },
    {
      id: "signal",
      number: "02",
      title: "The Signal",
      range: [0.12, 0.25],
      eyebrow: "Curiosity",
      summary: "Roma senses a ripple. Hummin discovers that its records are incomplete.",
      emotionalPurpose: "Focus the learner on one precise subject.",
      visualCue: "A warm signal travels through the landscape and stops at the Drop.",
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text: "To understand the whole system, we can begin with something small."
        },
        {
          speaker: "Roma",
          durationSeconds: 12,
          text:
            "There—one cool ripple carrying stone, leaf, metal, and memory. But taste alone cannot tell us who brought it here."
        },
        {
          speaker: "Hummin",
          durationSeconds: 11,
          text:
            "Signal confirmed. Origin record incomplete. Mineral, energy, labor, and access pathways are disconnected."
        }
      ]
    },
    {
      id: "aerial-dive",
      number: "03",
      title: "The Aerial Dive",
      range: [0.25, 0.42],
      eyebrow: "Discovery",
      summary: "The guides follow water from landscape into beverage systems.",
      emotionalPurpose: "Replace magnification with relationship tracing.",
      visualCue: "Crossfaded aerial, mid-altitude, and macro layers.",
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 20,
          text:
            "Look closer—not only at what water is, but at everything required for it to reach an ingredient, move through a process, enter a glass, and become part of someone’s experience."
        },
        {
          speaker: "Roma",
          durationSeconds: 10,
          text:
            "Along the way, place leaves clues: temperature, minerals, plants, vessels, and the choices people make."
        },
        {
          speaker: "Hummin",
          durationSeconds: 10,
          text:
            "The route is physical, chemical, biological, economic, and human. No single measurement explains it."
        }
      ]
    },
    {
      id: "isolation",
      number: "04",
      title: "Isolation",
      range: [0.42, 0.52],
      eyebrow: "The Noise",
      summary: "Unsupported labels replace origins, people, and evidence.",
      emotionalPurpose: "Challenge the assumption that an object explains itself.",
      visualCue: "The Drop floats alone while archive pathways fragment.",
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 16,
          text:
            "A drop alone tells us almost nothing. Pure, natural, and premium may sound complete, but meaning lives in origins, evidence, consequences, and people."
        },
        {
          speaker: "Roma",
          durationSeconds: 7,
          text: "Sensation without context can become a guess."
        },
        {
          speaker: "Hummin",
          durationSeconds: 7,
          text: "Data without people can become a blind spot."
        },
        {
          speaker: "Sippy",
          durationSeconds: 8,
          text: "Then we do not hide the missing pieces. We learn how to reconnect them."
        }
      ]
    },
    {
      id: "deconstruction",
      number: "05",
      title: "Deconstruction",
      range: [0.52, 0.75],
      eyebrow: "Ten connected layers",
      summary: "The Drop opens into origin, ingredients, process, science, culture, people, access, service, technology, and responsibility.",
      emotionalPurpose: "Give complexity an understandable structure.",
      visualCue: "Ten tactile archive objects form a connected orbit.",
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 13,
          text:
            "The Drop is opening into ten connected layers. Each one adds a question, a consequence, and a relationship to the final glass."
        },
        {
          speaker: "Sippy",
          durationSeconds: 13,
          text:
            "This is Origin. It asks where the water began, which landscapes shaped its path, and what changed before it reached the beverage system."
        },
        {
          speaker: "Roma",
          durationSeconds: 13,
          text:
            "This is Ingredients. Water carries and extracts compounds that can influence texture, aroma, balance, and the way another ingredient expresses itself."
        },
        {
          speaker: "Hummin",
          durationSeconds: 13,
          text:
            "This is Process. Filtration, heating, cooling, fermentation, cleaning, dilution, and storage each change what the system can produce safely and consistently."
        },
        {
          speaker: "Hummin",
          durationSeconds: 14,
          text:
            "This is Science. Chemistry, biology, physics, and sensory perception explain why water dissolves, transports, reacts, cools, cleans, and changes what we perceive."
        },
        {
          speaker: "Roma",
          durationSeconds: 13,
          text:
            "This is Culture. Language, ritual, hospitality, identity, and memory shape how water and beverages are prepared, valued, and shared."
        },
        {
          speaker: "Sippy",
          durationSeconds: 14,
          text:
            "This is People. Farmers, water workers, producers, cleaners, transporters, educators, and service teams make the final glass possible."
        },
        {
          speaker: "Sippy",
          durationSeconds: 15,
          text:
            "This is Access. A resource has different meaning when people cannot safely receive it, afford it, understand it, or participate in the knowledge built around it."
        },
        {
          speaker: "Roma",
          durationSeconds: 13,
          text:
            "This is Service. Storage, temperature, cleanliness, glassware, language, and the final handoff can protect—or undo—everything that came before."
        },
        {
          speaker: "Hummin",
          durationSeconds: 14,
          text:
            "This is Technology. Sensors, data, automation, and artificial intelligence can reveal patterns and support decisions, but they do not remove the need for human judgment."
        },
        {
          speaker: "Hummin",
          durationSeconds: 15,
          text:
            "This is Responsibility. Sources must be checked, uncertainty disclosed, safety protected, environmental cost considered, and mistakes made visible enough to improve."
        }
      ]
    },
    {
      id: "system-in-motion",
      number: "06",
      title: "The System in Motion",
      range: [0.75, 0.86],
      eyebrow: "Cause and effect",
      summary: "Every layer begins changing the layers around it.",
      emotionalPurpose: "Show that knowledge becomes useful through connection.",
      visualCue: "Pathways illuminate between the ten objects.",
      narration: [
        { speaker: "Roma", durationSeconds: 8, text: "Water changes the ingredient." },
        { speaker: "Hummin", durationSeconds: 8, text: "The ingredient changes the process." },
        {
          speaker: "Sippy",
          durationSeconds: 16,
          text:
            "The process changes flavor, labor, energy, waste, service, and who can share the final glass. Knowledge becomes useful when these pieces can speak to one another."
        }
      ]
    },
    {
      id: "reassembly",
      number: "07",
      title: "Reassembly",
      range: [0.86, 0.94],
      eyebrow: "Understanding",
      summary: "The system becomes a Living Knowledge Card with sources and pathways.",
      emotionalPurpose: "Transform insight into a reusable learning artifact.",
      visualCue: "The orbit folds into a complete archive object.",
      narration: [
        {
          speaker: "Roma",
          durationSeconds: 8,
          text: "We remember more when sensation has a story."
        },
        {
          speaker: "Hummin",
          durationSeconds: 8,
          text: "We trust more when the story has evidence."
        },
        {
          speaker: "Sippy",
          durationSeconds: 18,
          text:
            "When we reconnect the pieces, we do not return to the same object. Now it is more than a drop. It is a story we can question, verify, remember, and pass forward."
        }
      ]
    },
    {
      id: "invitation",
      number: "08",
      title: "The Living Archive",
      range: [0.94, 1],
      eyebrow: "Action",
      summary: "The completed artifact unlocks the next room.",
      emotionalPurpose: "Give the learner agency and hope.",
      visualCue: "The Living Archive opens behind the artifact.",
      narration: [
        {
          speaker: "Sippy",
          durationSeconds: 15,
          text:
            "Every sip contains a system. Every system contains a story. The archive is alive—choose what we explore next."
        }
      ]
    }
  ],
  knowledgeLayers: [
    {
      id: "origin",
      number: "01",
      title: "Origin",
      guide: "Sippy",
      object: "Watershed and spring topography",
      explanation:
        "Origin asks where water began, which landscapes shaped its path, and what changed before it entered a beverage system.",
      question: "What part of a water source would you verify first?",
      sourceIds: ["usgs-water-cycle", "who-water-quality"]
    },
    {
      id: "ingredients",
      number: "02",
      title: "Ingredients",
      guide: "Roma",
      object: "Mineral and botanical vessel",
      explanation:
        "Water carries and extracts compounds that can influence texture, aroma, balance, and how another ingredient expresses itself.",
      question: "Which ingredient-water relationship most changes the beverage you know?",
      sourceIds: ["usgs-water-properties"]
    },
    {
      id: "process",
      number: "03",
      title: "Process",
      guide: "Hummin",
      object: "Filter, pipe, and fermentation vessel",
      explanation:
        "Filtration, heating, cooling, fermentation, cleaning, dilution, and storage affect safety, consistency, and sensory outcomes.",
      question: "Where could one process decision alter both quality and safety?",
      sourceIds: ["who-water-quality", "fda-food-code"]
    },
    {
      id: "science",
      number: "04",
      title: "Science",
      guide: "Hummin",
      object: "Molecular and sensory prism",
      explanation:
        "Chemistry, biology, physics, and sensory perception explain why water dissolves, transports, reacts, cools, and cleans.",
      question: "Which measurable property could help explain a sensory change?",
      sourceIds: ["usgs-water-properties"]
    },
    {
      id: "culture",
      number: "05",
      title: "Culture",
      guide: "Roma",
      object: "Ritual cup and memory ribbon",
      explanation:
        "Language, ritual, hospitality, identity, and memory shape how water and beverages are prepared, valued, and shared.",
      question: "What ritual changes the meaning of a familiar beverage?",
      sourceIds: ["unesco-foodways"]
    },
    {
      id: "people",
      number: "06",
      title: "People",
      guide: "Sippy",
      object: "Connected hands and working tools",
      explanation:
        "Farmers, water workers, producers, cleaners, transporters, educators, and service teams make the final glass possible.",
      question: "Whose work is usually invisible when this beverage is served?",
      sourceIds: ["fao-water"]
    },
    {
      id: "access",
      number: "07",
      title: "Access",
      guide: "Sippy",
      object: "Tap, bridge, and open pathway",
      explanation:
        "A resource has different meaning when people cannot safely receive it, afford it, understand it, or participate in its knowledge.",
      question: "Who benefits from this system, and who may still be excluded?",
      sourceIds: ["jmp-water-access", "who-drinking-water"]
    },
    {
      id: "service",
      number: "08",
      title: "Service",
      guide: "Roma",
      object: "Tray, glass, and temperature tool",
      explanation:
        "Storage, temperature, cleanliness, glassware, language, and the final handoff can protect—or undo—everything that came before.",
      question: "Which service choice most changes the guest’s experience?",
      sourceIds: ["fda-food-code"]
    },
    {
      id: "technology",
      number: "09",
      title: "Technology",
      guide: "Hummin",
      object: "Sensor and data instrument",
      explanation:
        "Sensors, data, automation, and AI can reveal patterns and support decisions without removing the need for human judgment.",
      question: "What should a tool measure, and what must a person still decide?",
      sourceIds: ["nist-ai-rmf"]
    },
    {
      id: "responsibility",
      number: "10",
      title: "Responsibility",
      guide: "Hummin",
      object: "Protective verification ring",
      explanation:
        "Sources must be checked, uncertainty disclosed, safety protected, environmental cost considered, and mistakes made visible enough to improve.",
      question: "What claim in this system deserves stronger evidence?",
      sourceIds: ["who-water-quality", "nist-ai-rmf"]
    }
  ],
  sources: [
    {
      id: "usgs-water-cycle",
      organization: "U.S. Geological Survey",
      title: "Water Science School",
      url: "https://www.usgs.gov/water-science-school",
      note: "Water-cycle, surface-water, groundwater, water-use, and education resources."
    },
    {
      id: "usgs-water-properties",
      organization: "U.S. Geological Survey",
      title: "Properties of water",
      url: "https://www.usgs.gov/water-science-school/properties-water",
      note: "Physical and chemical properties of water."
    },
    {
      id: "who-water-quality",
      organization: "World Health Organization",
      title: "Guidelines for drinking-water quality",
      url: "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/water-safety-and-quality/drinking-water-quality-guidelines",
      note: "Risk-based drinking-water quality guidance from catchment to consumer."
    },
    {
      id: "who-drinking-water",
      organization: "World Health Organization",
      title: "Drinking-water",
      url: "https://www.who.int/en/news-room/fact-sheets/detail/drinking-water",
      note: "Public-health context for safe and readily available drinking water."
    },
    {
      id: "jmp-water-access",
      organization: "WHO/UNICEF Joint Monitoring Programme",
      title: "WASH data",
      url: "https://washdata.org/",
      note: "Global monitoring of water, sanitation, and hygiene access."
    },
    {
      id: "fao-water",
      organization: "Food and Agriculture Organization",
      title: "Land, soil and water",
      url: "https://www.fao.org/land-water/en",
      note: "Integrated land, soil, water, agriculture, and food-system resources."
    },
    {
      id: "fda-food-code",
      organization: "U.S. Food and Drug Administration",
      title: "Food Code 2022",
      url: "https://www.fda.gov/food/fda-food-code/food-code-2022",
      note: "Model food-service safety and handling provisions."
    },
    {
      id: "nist-ai-rmf",
      organization: "National Institute of Standards and Technology",
      title: "AI Risk Management Framework",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      note: "Human-centered risk, transparency, verification, and accountability guidance."
    },
    {
      id: "unesco-foodways",
      organization: "UNESCO",
      title: "Foodways as living heritage",
      url: "https://ich.unesco.org/",
      note: "Cultural practices, knowledge, and identity connected to foodways."
    }
  ],
  primaryCta: { label: "Enter Sipopedia", route: "sipopedia" },
  secondaryCta: { label: "Explore future chapters", href: "#btg-archive-title" }
};
