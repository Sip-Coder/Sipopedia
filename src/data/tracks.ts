export type Lesson = {
  title: string;
  type: "video" | "exercise" | "build";
  minutes: number;
};

export type Level = {
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Track = {
  title: string;
  icon: string;
  goal: string;
  levels: Level[];
};

export const tracks: Track[] = [
  {
    title: "People + AI + Business",
    icon: "01",
    goal: "Learn where AI creates leverage in teams and products.",
    levels: [
      {
        title: "Starter",
        description: "Understand models, tokens, prompts, and ROI basics.",
        lessons: [
          { title: "How AI tools actually work", type: "video", minutes: 12 },
          { title: "Map one job to AI automation", type: "exercise", minutes: 16 },
          { title: "Pitch your AI workflow", type: "build", minutes: 18 }
        ]
      },
      {
        title: "Builder",
        description: "Design repeatable AI systems for real workflows.",
        lessons: [
          { title: "Prompt systems and guardrails", type: "video", minutes: 15 },
          { title: "AI policy for small teams", type: "exercise", minutes: 14 },
          { title: "Case study teardown", type: "build", minutes: 20 }
        ]
      }
    ]
  },
  {
    title: "Agent Toolbox",
    icon: "02",
    goal: "Use OpenAI, Anthropic, Google, and Meta in one practical workflow.",
    levels: [
      {
        title: "Starter",
        description: "Choose the right model for each task.",
        lessons: [
          { title: "Model comparison playbook", type: "video", minutes: 10 },
          { title: "Cost vs quality lab", type: "exercise", minutes: 17 },
          { title: "Build a multi-model prompt chain", type: "build", minutes: 24 }
        ]
      },
      {
        title: "Builder",
        description: "Route user requests to the best provider automatically.",
        lessons: [
          { title: "Fallback strategy", type: "video", minutes: 11 },
          { title: "Latency tuning", type: "exercise", minutes: 13 },
          { title: "Ship your first router", type: "build", minutes: 26 }
        ]
      }
    ]
  },
  {
    title: "3D Product Studio",
    icon: "03",
    goal: "Turn ideas into guided projects with game-like progression.",
    levels: [
      {
        title: "Starter",
        description: "Model a simple home interior with AI-assisted planning.",
        lessons: [
          { title: "Scene planning for beginners", type: "video", minutes: 14 },
          { title: "Room layout challenge", type: "exercise", minutes: 20 },
          { title: "Render your first design", type: "build", minutes: 27 }
        ]
      },
      {
        title: "Builder",
        description: "Build a portfolio-ready interactive demo.",
        lessons: [
          { title: "Interaction patterns", type: "video", minutes: 12 },
          { title: "Performance checklist", type: "exercise", minutes: 15 },
          { title: "Publish project walkthrough", type: "build", minutes: 30 }
        ]
      }
    ]
  }
];

