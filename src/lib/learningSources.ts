export type LearningSource = {
  label: string;
  href: string;
  note: string;
};

export type LearningSourcePack = {
  title: string;
  summary: string;
  cues: string[];
  sources: LearningSource[];
};

const wsetWine: LearningSource = {
  label: "WSET Level 2 Award in Wines",
  href: "https://www.wsetglobal.com/qualifications/wset-level-2-award-in-wines/",
  note: "Wine styles, tasting method, service, storage, pairing, grapes, and global indications."
};

const wsetSpirits: LearningSource = {
  label: "WSET Spirits Qualifications",
  href: "https://www.wsetglobal.com/qualifications/wset-spirits-qualifications/",
  note: "Brand-neutral spirits education across production, categories, service, and commercial use."
};

const wsetLevelOneSpirits: LearningSource = {
  label: "WSET Level 1 Award in Spirits",
  href: "https://www.wsetglobal.com/qualifications/wset-level-1-award-in-spirits/",
  note: "Foundational spirit production, category identity, tasting, and service vocabulary."
};

const cmsCourses: LearningSource = {
  label: "CMS Americas Courses",
  href: "https://www.mastersommeliers.org/certification/courses/",
  note: "Sommelier pathway with tasting, service, theory, hospitality, and business expectations."
};

const cmsResourceLibrary: LearningSource = {
  label: "CMS Americas Resource Library",
  href: "https://www.mastersommeliers.org/resources/resource-library/",
  note: "Curriculum guides, tasting journal resources, and expected skillset references."
};

const ciceroneBeerServer: LearningSource = {
  label: "Cicerone Certified Beer Server",
  href: "https://www.cicerone.org/us-en/certifications/certified-beer-server",
  note: "Beer service, clean glassware, proper pours, beer handling, core styles, and flavor language."
};

const ciceroneCertified: LearningSource = {
  label: "Certified Cicerone",
  href: "https://www.cicerone.org/us-en/certifications/certified-cicerone",
  note: "Professional beer service, sensory evaluation, tasting skills, and beer-quality proof."
};

const sweEducation: LearningSource = {
  label: "Society of Wine Educators",
  href: "https://societyofwineeducators.org/education-certifications/",
  note: "CSW, CSS, CWE, CSE, and Hospitality/Beverage Specialist Certificate pathways."
};

const barSmarts: LearningSource = {
  label: "BarSmarts",
  href: "https://www.barsmarts.com/",
  note: "Bartender education benchmark for spirits, cocktails, service, and practical bar knowledge."
};

const diageoOnline: LearningSource = {
  label: "Diageo Bar Academy Online Training",
  href: "https://www.diageobaracademy.com/en-us/home/online-training-and-e-learning",
  note: "Trade-facing bartender learning benchmark for practical skills and repeatable training."
};

const winePack: LearningSourcePack = {
  title: "Wine Credential Lens",
  summary: "Use this as independent study support, not an official credential substitute.",
  cues: ["WSET-style SAT language", "CMS-style service and theory sequence", "Evidence before conclusion"],
  sources: [wsetWine, cmsCourses, cmsResourceLibrary]
};

const servicePack: LearningSourcePack = {
  title: "Service Credential Lens",
  summary: "Anchor the answer in hospitality sequence, guest-safe language, and repeatable service decisions.",
  cues: ["Guest intent first", "Clean sequence", "Plain-language recommendation"],
  sources: [cmsCourses, sweEducation, barSmarts, diageoOnline]
};

const spiritsPack: LearningSourcePack = {
  title: "Spirits Credential Lens",
  summary: "Trace category identity back to base material, production choices, maturation, and service use.",
  cues: ["Base material", "Distillation choice", "Maturation and service role"],
  sources: [wsetSpirits, wsetLevelOneSpirits, sweEducation, barSmarts]
};

const beerPack: LearningSourcePack = {
  title: "Beer Credential Lens",
  summary: "Connect every answer to service quality, style vocabulary, and beer-fault prevention.",
  cues: ["Clean pour", "Style language", "Fault prevention"],
  sources: [ciceroneBeerServer, ciceroneCertified]
};

const beverageGeneralPack: LearningSourcePack = {
  title: "Beverage Study Lens",
  summary: "Cross-check the prompt against credential-style tasting, theory, and hospitality standards.",
  cues: ["Tasting evidence", "Theory link", "Service-ready language"],
  sources: [wsetWine, cmsCourses, sweEducation]
};

function includesAny(value: string, needles: string[]) {
  return needles.some((needle) => value.includes(needle));
}

export function learningSourcePackForQuiz(examType: string, topicId: string): LearningSourcePack {
  const normalizedTopic = topicId.toLowerCase();

  if (includesAny(normalizedTopic, ["beer", "draught"])) return beerPack;
  if (includesAny(normalizedTopic, ["spirit", "distillation", "maturation"])) return spiritsPack;
  if (includesAny(normalizedTopic, ["service", "hospitality", "pairing", "storage"])) return servicePack;

  if (examType === "Cicerone") return beerPack;
  if (examType === "WSET") return includesAny(normalizedTopic, ["spirit"]) ? spiritsPack : winePack;
  if (examType === "CMS") return winePack;
  if (examType === "SWE") return normalizedTopic === "service" ? servicePack : beverageGeneralPack;

  return beverageGeneralPack;
}

export function learningSourcePackForAcademyLesson(tag: string, mission: string, unit: number): LearningSourcePack {
  if (tag === "Service" || mission === "Boss") return servicePack;
  if (unit >= 5) {
    return {
      ...winePack,
      cues: ["Production method", "Style outcome", "Service temperature and sequence"]
    };
  }
  if (tag === "Structure") {
    return {
      ...winePack,
      cues: ["Acidity, tannin, body", "Climate and winemaking cause", "Recommendation language"]
    };
  }
  if (tag === "Aromas") {
    return {
      ...winePack,
      cues: ["Aroma family", "Grape or production cue", "Confidence check"]
    };
  }
  return winePack;
}

export function learningSourcePackForCategorySprint(sprintId: string): LearningSourcePack {
  if (sprintId === "beer") return beerPack;
  if (sprintId === "spirits") return spiritsPack;
  if (sprintId === "bar") return servicePack;
  return beverageGeneralPack;
}
