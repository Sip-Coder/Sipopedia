export type LessonType = "video" | "exercise" | "build";

export type GuideStyle = "visor" | "antenna" | "halo" | "scanner" | "spark" | "orbital";

export type Guide = {
  id: string;
  name: string;
  role: string;
  note: string;
  focus: string;
  style: GuideStyle;
  palette: [string, string];
  accent: string;
};

export type KeyTerm = {
  term: string;
  definition: string;
};

export type CourseLesson = {
  id: string;
  sequence: number;
  chapter: string;
  title: string;
  type: LessonType;
  minutes: number;
  guideId: string;
  summary: string;
  objectives: string[];
  keyConcepts: string[];
  walkthrough: string[];
  practice: string[];
  deliverables: string[];
  reflection: string[];
  promptTemplate: string;
  keyTerms: KeyTerm[];
  printChecklist: string[];
};

type LessonBlueprint = {
  sequence: number;
  chapter: string;
  title: string;
  type: LessonType;
  minutes: number;
  guideId: string;
  focus: string;
  deliverable: string;
};

export const courseGuides: Guide[] = [
  {
    id: "astra",
    name: "Astra",
    role: "Prompt Architect",
    note: "Turns messy requests into precise, reusable prompts.",
    focus: "Prompt clarity",
    style: "visor",
    palette: ["#4b9fff", "#305fdd"],
    accent: "#d8ecff"
  },
  {
    id: "byte",
    name: "Byte",
    role: "Data Mapper",
    note: "Teaches how to structure examples and context windows.",
    focus: "Context control",
    style: "antenna",
    palette: ["#2bc7a6", "#10927d"],
    accent: "#d8fff6"
  },
  {
    id: "nova",
    name: "Nova",
    role: "Model Strategist",
    note: "Matches each job with the right model behavior and speed.",
    focus: "Model routing",
    style: "halo",
    palette: ["#f7a646", "#de7632"],
    accent: "#ffe5ca"
  },
  {
    id: "quill",
    name: "Quill",
    role: "Safety Pilot",
    note: "Builds guardrails so your outputs stay clean and reliable.",
    focus: "Safety and policy",
    style: "scanner",
    palette: ["#b46cff", "#7d46d8"],
    accent: "#efdcff"
  },
  {
    id: "orbit",
    name: "Orbit",
    role: "Agent Builder",
    note: "Guides tool use, memory, and step-by-step action plans.",
    focus: "Agent workflow",
    style: "orbital",
    palette: ["#3dc9e7", "#1689b2"],
    accent: "#d7f5ff"
  },
  {
    id: "mica",
    name: "Mica",
    role: "Prototype Captain",
    note: "Keeps every project shippable and product-ready.",
    focus: "Shipping fast",
    style: "spark",
    palette: ["#ff7e82", "#d74e5f"],
    accent: "#ffe0e5"
  }
];

const lessonBlueprints: LessonBlueprint[] = [
  {
    sequence: 1,
    chapter: "Foundations",
    title: "How AI Systems Actually Produce Answers",
    type: "video",
    minutes: 18,
    guideId: "astra",
    focus: "request pipeline clarity",
    deliverable: "AI request lifecycle map"
  },
  {
    sequence: 2,
    chapter: "Foundations",
    title: "Tokens, Context Windows, and Truncation",
    type: "exercise",
    minutes: 22,
    guideId: "byte",
    focus: "token budgeting",
    deliverable: "token budget worksheet"
  },
  {
    sequence: 3,
    chapter: "Prompt Design",
    title: "Prompt Anatomy: Role, Task, Context, Constraints",
    type: "video",
    minutes: 19,
    guideId: "astra",
    focus: "prompt structure",
    deliverable: "prompt anatomy template"
  },
  {
    sequence: 4,
    chapter: "Prompt Design",
    title: "Prompt Debugging and Iteration Loops",
    type: "build",
    minutes: 28,
    guideId: "mica",
    focus: "prompt debugging process",
    deliverable: "iteration log"
  },
  {
    sequence: 5,
    chapter: "Model Strategy",
    title: "Model Tradeoffs: Quality, Cost, and Latency",
    type: "video",
    minutes: 17,
    guideId: "nova",
    focus: "model selection criteria",
    deliverable: "model score matrix"
  },
  {
    sequence: 6,
    chapter: "Model Strategy",
    title: "Task-to-Model Routing Rules",
    type: "exercise",
    minutes: 24,
    guideId: "nova",
    focus: "routing thresholds",
    deliverable: "routing policy table"
  },
  {
    sequence: 7,
    chapter: "Data and Retrieval",
    title: "Grounding Answers with Retrieval",
    type: "video",
    minutes: 20,
    guideId: "byte",
    focus: "evidence-backed outputs",
    deliverable: "grounding policy"
  },
  {
    sequence: 8,
    chapter: "Data and Retrieval",
    title: "Context Curation and Noise Reduction",
    type: "exercise",
    minutes: 21,
    guideId: "byte",
    focus: "context quality control",
    deliverable: "context curation checklist"
  },
  {
    sequence: 9,
    chapter: "Evaluation",
    title: "Quality Scoring and Regression Testing",
    type: "video",
    minutes: 20,
    guideId: "quill",
    focus: "evaluation rubric design",
    deliverable: "benchmark scorecard"
  },
  {
    sequence: 10,
    chapter: "Evaluation",
    title: "Safety Guardrails and Policy Alignment",
    type: "exercise",
    minutes: 23,
    guideId: "quill",
    focus: "safe response design",
    deliverable: "guardrail playbook"
  },
  {
    sequence: 11,
    chapter: "Agents and Tools",
    title: "Function Calling for Actionable Assistants",
    type: "video",
    minutes: 19,
    guideId: "orbit",
    focus: "tool invocation reliability",
    deliverable: "tool schema contract"
  },
  {
    sequence: 12,
    chapter: "Agents and Tools",
    title: "Agent Planning with Step Dependencies",
    type: "exercise",
    minutes: 26,
    guideId: "orbit",
    focus: "task decomposition",
    deliverable: "agent execution plan"
  },
  {
    sequence: 13,
    chapter: "Agents and Tools",
    title: "Memory Design: Session vs Long-Term Context",
    type: "video",
    minutes: 18,
    guideId: "byte",
    focus: "memory boundaries",
    deliverable: "memory policy document"
  },
  {
    sequence: 14,
    chapter: "Agents and Tools",
    title: "Build Lab: Retrieval + Tool Calling Workflow",
    type: "build",
    minutes: 31,
    guideId: "orbit",
    focus: "hybrid assistant architecture",
    deliverable: "assistant architecture diagram"
  },
  {
    sequence: 15,
    chapter: "Performance",
    title: "Cost Management with Caching and Prompt Discipline",
    type: "video",
    minutes: 16,
    guideId: "nova",
    focus: "cost optimization",
    deliverable: "cost optimization plan"
  },
  {
    sequence: 16,
    chapter: "Performance",
    title: "Latency Engineering for Real-Time UX",
    type: "exercise",
    minutes: 22,
    guideId: "nova",
    focus: "latency tuning",
    deliverable: "latency budget sheet"
  },
  {
    sequence: 17,
    chapter: "Operations",
    title: "Production Monitoring and Alerting",
    type: "video",
    minutes: 17,
    guideId: "quill",
    focus: "observability",
    deliverable: "monitoring dashboard spec"
  },
  {
    sequence: 18,
    chapter: "Operations",
    title: "Human Review and Escalation Loops",
    type: "exercise",
    minutes: 23,
    guideId: "quill",
    focus: "human-in-the-loop governance",
    deliverable: "escalation policy matrix"
  },
  {
    sequence: 19,
    chapter: "Product Delivery",
    title: "AI UX for Transparency and Trust",
    type: "video",
    minutes: 18,
    guideId: "mica",
    focus: "trust-centered interface design",
    deliverable: "AI UX wireframe packet"
  },
  {
    sequence: 20,
    chapter: "Product Delivery",
    title: "Capstone: Ship Your AI Assistant",
    type: "build",
    minutes: 35,
    guideId: "mica",
    focus: "launch readiness",
    deliverable: "release packet"
  }
];

function makeLesson(lesson: LessonBlueprint): CourseLesson {
  const id = `l${String(lesson.sequence).padStart(2, "0")}`;
  return {
    id,
    ...lesson,
    summary: `Deep training in ${lesson.focus}, with production-level patterns and practical implementation guidance.`,
    objectives: [
      `Understand the core principles behind ${lesson.focus}.`,
      `Apply ${lesson.focus} in a realistic AI workflow scenario.`,
      `Produce a reusable artifact for future projects.`
    ],
    keyConcepts: [
      `${lesson.focus} must be explicit, testable, and repeatable.`,
      "Good AI systems combine clear instructions, high-quality context, and evaluation discipline.",
      "Operational readiness requires reliability, safety, and performance controls."
    ],
    walkthrough: [
      `Review the lesson scenario and define success criteria for ${lesson.focus}.`,
      "Run a structured implementation sequence with checkpoints.",
      `Capture final decisions and turn them into a ${lesson.deliverable}.`
    ],
    practice: [
      "Complete the guided challenge with your own example workflow.",
      "Document one failure mode and one mitigation strategy.",
      "Refactor your first attempt using the lesson checklist."
    ],
    deliverables: [
      `Primary artifact: ${lesson.deliverable}.`,
      "One-page implementation notes for your personal playbook.",
      "Quality review using the lesson evaluation criteria."
    ],
    reflection: [
      `What part of ${lesson.focus} felt least predictable?`,
      "What changed between your first and final attempt?",
      "How will you operationalize this in a real product?"
    ],
    promptTemplate:
      "Role: Senior AI coach. Task: Guide this lesson objective with a strict checklist. Constraints: concise, no skipped steps, explicit assumptions. Output: action plan + quality review.",
    keyTerms: [
      { term: "Scope control", definition: "Keeping the model task bounded to required output only." },
      { term: "Quality gate", definition: "A check that must pass before moving to the next step." },
      { term: "Failure mode", definition: "A predictable way output can break or degrade." },
      { term: "Mitigation", definition: "A specific action that lowers risk or improves reliability." }
    ],
    printChecklist: [
      `I completed the core ${lesson.focus} workflow.`,
      "I documented a failure mode and mitigation.",
      `I produced the required artifact: ${lesson.deliverable}.`
    ]
  };
}

export const courseLessons: CourseLesson[] = lessonBlueprints.map(makeLesson);
