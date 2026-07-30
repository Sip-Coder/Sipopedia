import type { BeyondTheGlassSpeaker } from "./beyondTheGlassChapters";

export type BeyondTheGlassCurriculumSection = {
  id: string;
  label: string;
  title: string;
  summary: string;
  details: string[];
};

export type BeyondTheGlassCurriculumLab = {
  id: string;
  sceneId: string;
  guide: BeyondTheGlassSpeaker;
  eyebrow: string;
  title: string;
  summary: string;
  guideNote: string;
  artwork: {
    landscapeSrc: string;
    landscapeSrcSet: string;
    portraitSrc: string;
    portraitSrcSet: string;
    alt: string;
  };
  sections: BeyondTheGlassCurriculumSection[];
  sourceIds: string[];
  deepDive?: {
    label: string;
    href: string;
    returnNote: string;
  };
};

const chemistryLab: BeyondTheGlassCurriculumLab = {
  id: "inside-the-glass",
  sceneId: "laboratory",
  guide: "Hummin",
  eyebrow: "CSW visual lab · Wine composition",
  title: "Inside the Glass",
  summary:
    "A glass of wine is a connected solution. Explore six structural families one at a time, without losing sight of the whole.",
  guideNote:
    "I mapped the glass as a living system. Choose one glowing pathway, then return to the center to see how structure becomes sensation.",
  artwork: {
    landscapeSrc: "/beyond-the-glass/curriculum/wine-chemistry-glass-1600.webp",
    landscapeSrcSet:
      "/beyond-the-glass/curriculum/wine-chemistry-glass-960.webp 960w, /beyond-the-glass/curriculum/wine-chemistry-glass-1600.webp 1600w",
    portraitSrc: "/beyond-the-glass/curriculum/wine-chemistry-glass-portrait-960.webp",
    portraitSrcSet:
      "/beyond-the-glass/curriculum/wine-chemistry-glass-portrait-600.webp 600w, /beyond-the-glass/curriculum/wine-chemistry-glass-portrait-960.webp 960w",
    alt:
      "A ruby wine glass in a magical SIP Academy laboratory, with separate glowing pathways for water, alcohol, acids, sugars, phenolics, and aroma or protection compounds."
  },
  sections: [
    {
      id: "water",
      label: "01",
      title: "Water",
      summary:
        "Water is the main liquid medium. It carries dissolved compounds and helps every other component meet the senses.",
      details: [
        "It supports the solution that holds acids, sugars, minerals, and many aroma-active compounds.",
        "Its role is structural: the other families do not act in isolation."
      ]
    },
    {
      id: "alcohol",
      label: "02",
      title: "Alcohol",
      summary:
        "Yeast converts fermentable sugar mainly into ethanol and carbon dioxide. Ethanol changes warmth, body, and aroma release.",
      details: [
        "Alcohol level is measured separately from sweetness.",
        "Balance depends on alcohol interacting with acid, sugar, phenolics, and serving conditions."
      ]
    },
    {
      id: "acids",
      label: "03",
      title: "Acids + pH",
      summary:
        "Tartaric, malic, citric, lactic, acetic, and succinic acids can contribute to wine chemistry and sensory shape.",
      details: [
        "pH describes hydrogen-ion activity; total or titratable acidity measures a different property. They are related, not interchangeable.",
        "Acid influences freshness, microbial stability, color behavior, and many production decisions."
      ]
    },
    {
      id: "sugars",
      label: "04",
      title: "Sugars",
      summary:
        "Glucose and fructose are the principal grape sugars tracked in wine. Remaining sugar can add sweetness and alter perceived body.",
      details: [
        "Sucrose is not usually the principal residual grape sugar; when present in analysis or production context it must be explained separately.",
        "Perceived sweetness also changes with acidity, alcohol, temperature, and other structural cues."
      ]
    },
    {
      id: "phenolics",
      label: "05",
      title: "Phenolics",
      summary:
        "Anthocyanins contribute color; flavanols and related tannins influence bitterness, astringency, structure, and aging behavior.",
      details: [
        "Resveratrol is a stilbene phenolic found in grapes and wine.",
        "Vanillin is strongly associated with oak influence and is better treated as an aroma-active phenolic aldehyde than as a tannin."
      ]
    },
    {
      id: "other",
      label: "06",
      title: "Aroma + protection",
      summary:
        "Aldehydes, esters, dissolved gases, and sulfites belong to different chemical families but all can change the finished wine.",
      details: [
        "Esters can support fruity aromas; aldehydes may be fermentation products or oxidation signals.",
        "Carbon dioxide and oxygen affect texture and development. Sulfur dioxide is managed for antioxidant and antimicrobial protection."
      ]
    }
  ],
  sourceIds: ["oiv-analytical-parameters", "oiv-wine-sugars"]
};

const faultLab: BeyondTheGlassCurriculumLab = {
  id: "fault-detective",
  sceneId: "barrel-aging",
  guide: "Roma",
  eyebrow: "CSW visual lab · Wine faults",
  title: "The Fault Detective Lab",
  summary:
    "Fault recognition starts by separating a sensory clue from its possible cause. Explore the evidence without treating every unusual aroma as a flaw.",
  guideNote:
    "I never name a fault from one dramatic sniff. I gather the clue, compare it with the wine’s style and condition, then ask what else could explain it.",
  artwork: {
    landscapeSrc: "/beyond-the-glass/curriculum/wine-fault-detective-1600.webp",
    landscapeSrcSet:
      "/beyond-the-glass/curriculum/wine-fault-detective-960.webp 960w, /beyond-the-glass/curriculum/wine-fault-detective-1600.webp 1600w",
    portraitSrc: "/beyond-the-glass/curriculum/wine-fault-detective-portrait-960.webp",
    portraitSrcSet:
      "/beyond-the-glass/curriculum/wine-fault-detective-portrait-600.webp 600w, /beyond-the-glass/curriculum/wine-fault-detective-portrait-960.webp 960w",
    alt:
      "A central wine glass in SIP Academy's sensory laboratory, surrounded by separate visual evidence stations for cork taint, sulfur reduction, oxidation, microbial spoilage, and volatile acidity."
  },
  sections: [
    {
      id: "tca",
      label: "01",
      title: "Cork taint · TCA",
      summary:
        "2,4,6-trichloroanisole is a principal cork-taint compound. It can suppress fruit and create musty, mouldy, damp-cellar or wet-cardboard impressions.",
      details: [
        "The clue is extremely potent, so a seemingly quiet or stripped wine can be part of the evidence.",
        "Do not assume every earthy aroma is TCA; compare the whole sensory pattern."
      ]
    },
    {
      id: "reduction",
      label: "02",
      title: "Reductive sulfur",
      summary:
        "Hydrogen sulfide is associated with rotten-egg aroma. Thiols, traditionally called mercaptans, can suggest cabbage, garlic, onion, sewage, or rubber.",
      details: [
        "Hydrogen sulfide, thiols, and disulfides are related but not interchangeable.",
        "Sulfur dioxide is a different compound: correctly managed, it protects wine; excess free SO₂ may itself become sensory."
      ]
    },
    {
      id: "volatile-acidity",
      label: "03",
      title: "Volatile acidity + ester",
      summary:
        "Acetic acid can read as vinegar. Ethyl acetate may smell solvent-like or like nail-polish remover, although low levels can add fruity complexity.",
      details: [
        "The analytical measure of volatile acidity contains mainly acetic acid plus smaller contributions from other volatile acids.",
        "Lactic acid is central to malolactic conversion and is not automatically a fault; butyric acid belongs in a separate volatile-acid context."
      ]
    },
    {
      id: "brett",
      label: "04",
      title: "Brettanomyces",
      summary:
        "Brettanomyces spoilage can generate volatile phenols associated with medicinal, smoky, spicy, leathery, or barnyard impressions.",
      details: [
        "The effect depends on concentration and on the wine’s existing style and structure.",
        "Diminished fruit and a drying or metallic aftertaste can support the diagnosis."
      ]
    },
    {
      id: "oxidation",
      label: "05",
      title: "Oxidation",
      summary:
        "Oxidation can dull fruit and move toward bruised apple, nut, straw, sherry-like, or madeirised character as the wine changes.",
      details: [
        "Aldehydes, including acetaldehyde, participate in oxidation-related sensory change.",
        "Oxidative handling is intentional in some wine styles; context separates technique from fault."
      ]
    },
    {
      id: "ripeness",
      label: "06",
      title: "Not every green note is a fault",
      summary:
        "Leafy or under-ripe characters may come from grape variety, growing conditions, harvest timing, or extraction—not necessarily microbial spoilage.",
      details: [
        "Fault recognition combines aroma, palate, appearance, wine style, and production history.",
        "Personal detection thresholds differ, so calibrated comparison matters."
      ]
    }
  ],
  sourceIds: ["awri-wine-faults", "awri-sensory-fault-panel"]
};

const vineFamilyLab: BeyondTheGlassCurriculumLab = {
  id: "vine-family",
  sceneId: "rain-and-roots",
  guide: "Hummin",
  eyebrow: "CSW visual lab · Grape varieties",
  title: "The Vine Family Workshop",
  summary:
    "The fruiting vine above the soil and the roots below it may have different genetic identities, connected at one carefully made graft union.",
  guideNote:
    "I archive the family tree in layers: species, cultivar, clone, mutation, crossing, hybrid, scion, and rootstock. Similar words can describe very different relationships.",
  artwork: {
    landscapeSrc: "/beyond-the-glass/curriculum/vine-family-rootstock-1600.webp",
    landscapeSrcSet:
      "/beyond-the-glass/curriculum/vine-family-rootstock-960.webp 960w, /beyond-the-glass/curriculum/vine-family-rootstock-1600.webp 1600w",
    portraitSrc: "/beyond-the-glass/curriculum/vine-family-rootstock-portrait-960.webp",
    portraitSrcSet:
      "/beyond-the-glass/curriculum/vine-family-rootstock-portrait-600.webp 600w, /beyond-the-glass/curriculum/vine-family-rootstock-portrait-960.webp 960w",
    alt:
      "A complete grapevine and soil cutaway in the SIP Academy conservatory, showing a fruiting scion, graft union, deep root system, four botanical species specimens, and a magnified phylloxera clue."
  },
  sections: [
    {
      id: "vinifera",
      label: "01",
      title: "Vitis vinifera",
      summary:
        "Most classic European wine-grape cultivars belong to Vitis vinifera. The named cultivar normally forms the fruiting scion above the graft.",
      details: [
        "Cultivar names such as Cabernet Sauvignon or Riesling identify cultivated genetic selections.",
        "A cultivar may be propagated through many individual vines."
      ]
    },
    {
      id: "american-species",
      label: "02",
      title: "American Vitis context",
      summary:
        "Vitis riparia and Vitis rupestris are important rootstock contributors. Vitis labrusca and Vitis aestivalis are also North American species with distinct breeding and regional contexts.",
      details: [
        "These species should not all be presented as interchangeable rootstocks.",
        "Rootstock selections and hybrids are matched to pest resistance, soil, water, vigor, and site needs."
      ]
    },
    {
      id: "graft",
      label: "03",
      title: "Scion + rootstock",
      summary:
        "Grafting joins the desired fruiting cultivar above ground to a selected root system below ground.",
      details: [
        "The graft union must remain visible and healthy.",
        "Rootstock can influence vigor, water and nutrient uptake, and adaptation without changing the scion’s named cultivar."
      ]
    },
    {
      id: "phylloxera",
      label: "04",
      title: "Phylloxera",
      summary:
        "Grape phylloxera is a tiny root-feeding insect. Damage to susceptible Vitis vinifera roots can weaken or kill vines.",
      details: [
        "Resistant rootstocks are the durable foundation of management in affected regions.",
        "Resistance is not the same as complete immunity."
      ]
    },
    {
      id: "clones",
      label: "05",
      title: "Clones + mutations",
      summary:
        "A clone is a vegetatively propagated selection within a cultivar. A mutation is a genetic change that can produce a new trait or selection.",
      details: [
        "Clonal selections may differ in timing, yield, cluster shape, color, or sensory tendencies.",
        "Mutation does not automatically create a new species."
      ]
    },
    {
      id: "crossing-hybrid",
      label: "06",
      title: "Crossings + hybrids",
      summary:
        "A crossing has two parents of the same species; an interspecific hybrid combines parents from different species.",
      details: [
        "Breeding goals can include disease resistance, cold hardiness, flavor, or adaptation.",
        "Parentage should be checked rather than inferred from a grape’s common name."
      ]
    }
  ],
  sourceIds: ["uc-ipm-phylloxera", "umn-grape-anatomy"],
  deepDive: {
    label: "Open the Grapes & Grains reference",
    href: "/#app/grapes/grapes?from=beyond-the-glass&lab=vine-family",
    returnNote: "Your Beyond the Glass stop is saved; use Back to return here."
  }
};

const viticultureLab: BeyondTheGlassCurriculumLab = {
  id: "living-vineyard",
  sceneId: "vine-and-berry",
  guide: "Sippy",
  eyebrow: "CSW visual lab · Viticulture",
  title: "Read the Living Vineyard",
  summary:
    "Training, climate, soil, water, pests, and harvest measurement all meet in the same living system. Explore one layer at a time.",
  guideNote:
    "A vineyard is not scenery. Every wire, cut, leaf, slope, cloud, and sample is a decision. Let’s read those decisions before we follow the grape indoors.",
  artwork: {
    landscapeSrc: "/beyond-the-glass/curriculum/viticulture-living-vineyard-1600.webp",
    landscapeSrcSet:
      "/beyond-the-glass/curriculum/viticulture-living-vineyard-960.webp 960w, /beyond-the-glass/curriculum/viticulture-living-vineyard-1600.webp 1600w",
    portraitSrc:
      "/beyond-the-glass/curriculum/viticulture-living-vineyard-portrait-960.webp",
    portraitSrcSet:
      "/beyond-the-glass/curriculum/viticulture-living-vineyard-portrait-600.webp 600w, /beyond-the-glass/curriculum/viticulture-living-vineyard-portrait-960.webp 960w",
    alt:
      "A SIP Academy vineyard teaching panorama with five separate vine-training systems, seasonal development clues, contrasting climate and site conditions, and a grower's measurement workbench."
  },
  sections: [
    {
      id: "anatomy",
      label: "01",
      title: "Vine anatomy + cycle",
      summary:
        "Trunk and older arms or cordons support one-year canes, short spurs, and the season’s green shoots, leaves, tendrils, flowers, and clusters.",
      details: [
        "The annual sequence runs from bud break through flowering, fruit set, veraison, ripening, and harvest.",
        "Photosynthesis builds sugars; respiration uses energy; transpiration moves water; translocation distributes resources among sources and sinks."
      ]
    },
    {
      id: "training",
      label: "02",
      title: "Training + pruning",
      summary:
        "Bush or head training, Guyot cane training, bilateral cordon, VSP, and pergola systems organize fruiting wood and canopy space differently.",
      details: [
        "Cane versus spur pruning depends partly on where fruitful buds occur.",
        "Canopy management balances light, airflow, disease pressure, sun exposure, and ripening."
      ]
    },
    {
      id: "climate-site",
      label: "03",
      title: "Climate + physical geography",
      summary:
        "Macroclimate, mesoclimate, and vine-level microclimate interact with weather, latitude, elevation, slope, aspect, and proximity to water.",
      details: [
        "Temperature, precipitation, humidity, fog, wind, and diurnal range shape growth and ripening.",
        "Maritime, Mediterranean, and continental are broad climate patterns—not complete descriptions of every site."
      ]
    },
    {
      id: "soil-water",
      label: "04",
      title: "Soil + water",
      summary:
        "Clay, silt, sand, and gravel differ in drainage, water-holding behavior, temperature, and rooting environment.",
      details: [
        "Soil fertility, irrigation, water stress, drainage, and rootstock choice affect vigor and fruit development.",
        "Growers manage water using soil, weather, and vine-status evidence rather than one universal schedule."
      ]
    },
    {
      id: "pressure",
      label: "05",
      title: "Disease + pests",
      summary:
        "Fungi, bacteria, insects, and wildlife can damage leaves, roots, shoots, and fruit. Botrytis cinerea can be harmful bunch rot or beneficial noble rot in specific conditions.",
      details: [
        "Key pressure can include powdery and downy mildew, trunk disease, phylloxera, mealybugs, leafhoppers, mites, birds, deer, and wild pigs.",
        "Prevention combines site design, sanitation, canopy airflow, monitoring, timing, and appropriate integrated management."
      ]
    },
    {
      id: "ripeness",
      label: "06",
      title: "Harvest evidence",
      summary:
        "Harvest decisions compare sugar or must weight, acid, pH, phenolic maturity, flavor, seed and skin condition, weather risk, and wine-style goals.",
      details: [
        "Brix is one scale for soluble solids. Oechsle and Klosterneuburger Mostwaage (KMW) are regional must-weight scales.",
        "Sugar ripeness alone does not prove flavor, acid, or phenolic ripeness."
      ]
    }
  ],
  sourceIds: [
    "swe-csw-standards",
    "swe-vine-cycle",
    "swe-cwe-viticulture-vocabulary",
    "psu-cane-spur",
    "umn-grape-anatomy",
    "osu-grape-training",
    "uc-ipm-pruning",
    "dwi-must-weight",
    "austrian-wine-kmw"
  ],
  deepDive: {
    label: "Explore grape and agricultural references",
    href: "/#app/grapes/grapes?from=beyond-the-glass&lab=living-vineyard",
    returnNote: "Your Beyond the Glass stop is saved; use Back to return here."
  }
};

export const beyondTheGlassCurriculumLabs: Partial<
  Record<string, BeyondTheGlassCurriculumLab>
> = {
  "rain-and-roots": vineFamilyLab,
  "vine-and-berry": viticultureLab,
  laboratory: chemistryLab,
  "barrel-aging": faultLab
};
