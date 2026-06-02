export type ServiceRoleplayCategory = "sommelier" | "beer" | "bar" | "recovery";

export type ServiceRoleplayRoute = {
  label: string;
  route: string;
};

export type ServiceRoleplayOption = {
  id: string;
  label: string;
  response: string;
  score: number;
  outcome: string;
  coaching: string;
  strengths: string[];
  fixes: string[];
};

export type ServiceRoleplayStep = {
  id: string;
  title: string;
  guestCue: string;
  stationCue: string;
  options: ServiceRoleplayOption[];
};

export type ServiceRoleplayScenario = {
  id: string;
  category: ServiceRoleplayCategory;
  title: string;
  credentialSignal: string;
  difficulty: "Foundation" | "Service Ready" | "Exam Pressure";
  setup: string;
  successCriteria: string[];
  handoffs: ServiceRoleplayRoute[];
  steps: ServiceRoleplayStep[];
};

export type ServiceRoleplayScore = {
  points: number;
  maxPoints: number;
  percent: number;
  rating: string;
  strengths: string[];
  fixes: string[];
  completedSteps: number;
};

export const serviceRoleplayCategoryLabels: Record<ServiceRoleplayCategory, string> = {
  sommelier: "Sommelier",
  beer: "Beer Service",
  bar: "Bar Service",
  recovery: "Recovery"
};

export const serviceRoleplayScenarios: ServiceRoleplayScenario[] = [
  {
    id: "corked-bottle-recovery",
    category: "sommelier",
    title: "Corked Bottle Recovery",
    credentialSignal: "CMS-style table service",
    difficulty: "Service Ready",
    setup: "A guest says the Pinot Noir smells damp and asks whether the bottle is bad. The table is watching and the entree course is landing soon.",
    successCriteria: [
      "Acknowledge the concern without arguing.",
      "Assess the bottle calmly and protect the guest experience.",
      "Offer a replacement or comparable alternative while keeping service moving."
    ],
    handoffs: [
      { label: "Service Sheet", route: "app/study-sheets" },
      { label: "Flavor Wheel", route: "app/flavor-wheel" },
      { label: "Quiz Retake", route: "app/beverage-quiz?preset=bar-service" }
    ],
    steps: [
      {
        id: "corked-first-response",
        title: "First response",
        guestCue: "This smells like wet cardboard. Is something wrong with it?",
        stationCue: "You have a clean glass and the bottle in hand.",
        options: [
          {
            id: "acknowledge-assess",
            label: "Acknowledge and assess",
            response: "Thank you for pointing that out. Let me check the bottle in a fresh glass, and I will take care of it right away if it is not showing correctly.",
            score: 4,
            outcome: "The guest feels heard and the table sees a controlled service sequence.",
            coaching: "Best answer. It validates the guest, creates an evidence step, and promises a fix without over-explaining TCA.",
            strengths: ["Guest validation", "Controlled assessment", "Professional language"],
            fixes: []
          },
          {
            id: "lecture-tca",
            label: "Explain TCA immediately",
            response: "That can be TCA, which is a cork taint compound. It happens sometimes, and it is not dangerous.",
            score: 2,
            outcome: "The answer is technically useful but it delays the fix and risks sounding defensive.",
            coaching: "Add hospitality first. Technical vocabulary should support the service move, not replace it.",
            strengths: ["Technical vocabulary"],
            fixes: ["Lead with the guest experience", "Name the immediate fix"]
          },
          {
            id: "dismiss-palate",
            label: "Dismiss the concern",
            response: "Pinot can smell earthy, so it is probably just the style.",
            score: 0,
            outcome: "The guest has to argue with you to get help.",
            coaching: "Do not correct the guest before checking. Earthy style notes and cork taint must be separated with a fresh-glass assessment.",
            strengths: [],
            fixes: ["Avoid dismissal", "Assess before concluding", "Protect trust"]
          }
        ]
      },
      {
        id: "corked-fix",
        title: "Fix and pacing",
        guestCue: "The guest asks whether they need to pick something else.",
        stationCue: "The kitchen has fired the main course.",
        options: [
          {
            id: "replace-or-comparable",
            label: "Replace or offer comparable",
            response: "I can replace this bottle with the same wine. If you want a change, I can also bring a comparable red with the same body and freshness for the dish.",
            score: 4,
            outcome: "The guest gets a clear fix and a useful alternative without pressure.",
            coaching: "Best answer. It names the correction, offers agency, and keeps the pairing logic intact.",
            strengths: ["Clear recovery", "Guest agency", "Pairing continuity"],
            fixes: []
          },
          {
            id: "manager-only",
            label: "Defer everything to manager",
            response: "I need to ask a manager what we are allowed to do.",
            score: 1,
            outcome: "The guest hears uncertainty and service slows down.",
            coaching: "Manager involvement may be needed, but the guest still needs a clear holding action.",
            strengths: ["Policy awareness"],
            fixes: ["Own the immediate service step", "Offer a holding solution"]
          },
          {
            id: "discount-first",
            label: "Lead with discount",
            response: "I can discount it if you want to keep drinking it.",
            score: 0,
            outcome: "The table may feel pushed to accept a flawed product.",
            coaching: "Recovery is not a price negotiation first. Replace flawed product when reasonable, then document the issue.",
            strengths: [],
            fixes: ["Fix product before pricing", "Avoid pressure", "Document after service"]
          }
        ]
      }
    ]
  },
  {
    id: "ipa-freshness-service",
    category: "beer",
    title: "IPA Freshness And Bitterness",
    credentialSignal: "Cicerone-style beer service",
    difficulty: "Foundation",
    setup: "A guest wants an IPA but says they dislike harsh bitterness. The freshest keg is a hazy IPA, while an older West Coast IPA is still on the list.",
    successCriteria: [
      "Protect freshness and avoid stale-hop service.",
      "Translate bitterness, aroma, and body into plain language.",
      "Offer a confident style recommendation."
    ],
    handoffs: [
      { label: "Beer Service Sheet", route: "app/study-sheets" },
      { label: "Beer Quiz", route: "app/beverage-quiz?preset=beer-server" },
      { label: "Resources", route: "app/resources" }
    ],
    steps: [
      {
        id: "ipa-recommendation",
        title: "Recommendation",
        guestCue: "I want hops, but I do not want something aggressively bitter.",
        stationCue: "Freshness, draught date, and glass cleanliness are your first beer-service controls.",
        options: [
          {
            id: "fresh-hazy",
            label: "Recommend fresh hazy IPA",
            response: "I would steer you to the fresh hazy IPA. It gives hop aroma and fruit character with a softer bitterness than the West Coast option.",
            score: 4,
            outcome: "The guest gets hop character without the bitterness profile they rejected.",
            coaching: "Best answer. It uses freshness and style language together.",
            strengths: ["Freshness protection", "Style translation", "Guest preference match"],
            fixes: []
          },
          {
            id: "old-west-coast",
            label: "Recommend older West Coast IPA",
            response: "The West Coast IPA is the classic choice, so I would go with that.",
            score: 1,
            outcome: "The recommendation ignores both freshness and the guest's bitterness cue.",
            coaching: "Classic identity is not enough. Freshness and preference fit are central beer-service decisions.",
            strengths: ["Style awareness"],
            fixes: ["Prioritize freshness", "Match bitterness preference"]
          },
          {
            id: "avoid-ipa",
            label: "Avoid IPA entirely",
            response: "If you dislike bitterness, you probably should not order an IPA.",
            score: 0,
            outcome: "The guest loses a route into a category they wanted to explore.",
            coaching: "Use a bridge style instead of closing the door. The guest asked for hops, not zero bitterness.",
            strengths: [],
            fixes: ["Offer a bridge", "Keep guest agency", "Use plain style language"]
          }
        ]
      },
      {
        id: "ipa-quality-check",
        title: "Quality check",
        guestCue: "The guest asks why the beer smells dull after the first sip.",
        stationCue: "You can inspect aroma, carbonation, glass condition, and keg age before assuming preference.",
        options: [
          {
            id: "fresh-sample",
            label: "Check and replace if stale",
            response: "Let me taste-check a fresh sample and confirm the keg is showing right. If it is dull or oxidized, I will replace it with a fresher pour.",
            score: 4,
            outcome: "The guest sees quality control instead of a preference argument.",
            coaching: "Best answer. It names a concrete assessment and a clear correction.",
            strengths: ["Quality control", "Freshness language", "Recovery sequence"],
            fixes: []
          },
          {
            id: "blame-hazy",
            label: "Blame the style",
            response: "Hazy IPAs are just like that sometimes.",
            score: 0,
            outcome: "The guest receives no quality assurance.",
            coaching: "Do not hide behind style. Dull hop aroma can signal age, oxygen, or poor handling.",
            strengths: [],
            fixes: ["Check quality", "Separate style from fault"]
          },
          {
            id: "offer-lemon",
            label: "Offer garnish",
            response: "I can add citrus if you want more aroma.",
            score: 1,
            outcome: "The garnish masks the issue and breaks style expectations.",
            coaching: "Fix or replace the product before modifying it.",
            strengths: ["Guest accommodation"],
            fixes: ["Do not mask faults", "Verify product first"]
          }
        ]
      }
    ]
  },
  {
    id: "martini-preference-translation",
    category: "bar",
    title: "Martini Preference Translation",
    credentialSignal: "BarSmarts-style practical service",
    difficulty: "Service Ready",
    setup: "A guest orders a Martini but is unsure about gin versus vodka, dry versus wet, and olive versus twist.",
    successCriteria: [
      "Ask efficient preference questions.",
      "Translate technique and garnish into flavor outcomes.",
      "Confirm the build before sending it to the well."
    ],
    handoffs: [
      { label: "Classic Specs", route: "app/study-sheets" },
      { label: "Cocktails", route: "app/cocktails" },
      { label: "Bar Quiz", route: "app/beverage-quiz?preset=bar-service" }
    ],
    steps: [
      {
        id: "martini-questions",
        title: "Preference questions",
        guestCue: "I know I want a Martini, but I do not know what kind.",
        stationCue: "The bar is busy. You need two or three questions, not a lecture.",
        options: [
          {
            id: "focused-questions",
            label: "Ask focused questions",
            response: "Do you want it crisp and spirit-forward, or a little softer with more vermouth? And do you prefer a savory olive note or a bright lemon twist?",
            score: 4,
            outcome: "The guest can answer by flavor instead of technical vocabulary.",
            coaching: "Best answer. It translates dry/wet and garnish choices into sensory outcomes.",
            strengths: ["Efficient discovery", "Guest language", "Build confirmation"],
            fixes: []
          },
          {
            id: "recite-history",
            label: "Recite the Martini family",
            response: "A Martini can be dry, wet, perfect, dirty, Gibson, vodka, gin, or fifty-fifty.",
            score: 1,
            outcome: "The guest receives information but no easy decision path.",
            coaching: "Reduce options to flavor outcomes. A busy service interaction needs decision support.",
            strengths: ["Category knowledge"],
            fixes: ["Reduce choice overload", "Ask preference questions"]
          },
          {
            id: "default-vodka",
            label: "Default to vodka",
            response: "Most people just get vodka, so I will make that.",
            score: 0,
            outcome: "The guest's preference is replaced by assumption.",
            coaching: "Do not default away from discovery. Two questions can produce a better drink and better trust.",
            strengths: [],
            fixes: ["Avoid assumptions", "Confirm base spirit", "Confirm garnish"]
          }
        ]
      },
      {
        id: "martini-confirm",
        title: "Confirm the build",
        guestCue: "The guest says: gin, crisp, lemon, not too much vermouth.",
        stationCue: "You need to translate that into a well ticket or verbal call.",
        options: [
          {
            id: "confirm-gin-dry-twist",
            label: "Confirm dry gin Martini",
            response: "Great: gin Martini, dry, stirred cold, lemon twist. I will keep it crisp and aromatic.",
            score: 4,
            outcome: "The build is clear for guest and bartender.",
            coaching: "Best answer. It confirms base, ratio direction, technique, temperature, and garnish.",
            strengths: ["Spec confirmation", "Technique language", "Guest confidence"],
            fixes: []
          },
          {
            id: "dirty-olive",
            label: "Make it dirty",
            response: "I will make it dirty with olives so it has more flavor.",
            score: 0,
            outcome: "The drink contradicts the guest's lemon and crisp cues.",
            coaching: "Savory brine is not a default flavor upgrade. It changes the drink identity.",
            strengths: [],
            fixes: ["Respect garnish cue", "Confirm before changing spec"]
          },
          {
            id: "shake-it",
            label: "Shake for coldness",
            response: "I will shake it hard so it gets very cold.",
            score: 1,
            outcome: "The drink may be colder but loses expected clarity and texture.",
            coaching: "A clear spirit-forward Martini is normally stirred unless the guest asks otherwise.",
            strengths: ["Temperature concern"],
            fixes: ["Use correct technique", "Separate cold from aerated"]
          }
        ]
      }
    ]
  },
  {
    id: "low-abv-pairing-recovery",
    category: "recovery",
    title: "Low-ABV Pairing Rescue",
    credentialSignal: "Responsible service and pairing language",
    difficulty: "Exam Pressure",
    setup: "A guest wants a pairing for spicy food but says they need to keep alcohol low because they are driving.",
    successCriteria: [
      "Respect safety and pacing without awkwardness.",
      "Use sweetness, acid, bitterness, and bubbles to solve the pairing.",
      "Offer low-ABV or no-ABV choices with equal hospitality."
    ],
    handoffs: [
      { label: "Pairing Sheet", route: "app/study-sheets" },
      { label: "Cellar Scanner", route: "app/cellar-scanner" },
      { label: "Support Teams", route: "support" }
    ],
    steps: [
      {
        id: "low-abv-recommend",
        title: "Recommendation",
        guestCue: "I want something that works with heat, but I need to keep it light.",
        stationCue: "You have sparkling water, low-ABV spritz options, off-dry Riesling by the glass, and a no-ABV hop tea.",
        options: [
          {
            id: "low-abv-two-choice",
            label: "Offer equal-status choices",
            response: "For spice and lower alcohol, I would choose either a small pour of off-dry Riesling for sweetness and acid, or the no-ABV hop tea for bubbles and refreshment.",
            score: 4,
            outcome: "The guest receives two valid choices without judgment.",
            coaching: "Best answer. It solves the pairing and respects the stated safety constraint.",
            strengths: ["Responsible service", "Pairing logic", "Equal hospitality"],
            fixes: []
          },
          {
            id: "push-wine",
            label: "Push regular wine",
            response: "Riesling is the best pairing, so I would just do a normal glass.",
            score: 1,
            outcome: "The pairing logic is right, but the safety cue is minimized.",
            coaching: "Keep the pairing but adjust pour size or offer a no-ABV alternative.",
            strengths: ["Pairing logic"],
            fixes: ["Respect alcohol constraint", "Offer portion control"]
          },
          {
            id: "water-only",
            label: "Offer only water",
            response: "If you are driving, I can just bring water.",
            score: 0,
            outcome: "The guest's dining experience is flattened.",
            coaching: "Responsible service can still be hospitable. Offer a thoughtful no-ABV or low-ABV pairing.",
            strengths: ["Safety awareness"],
            fixes: ["Preserve hospitality", "Use no-ABV pairing tools"]
          }
        ]
      },
      {
        id: "low-abv-pacing",
        title: "Pacing",
        guestCue: "The guest picks the small Riesling pour and asks for another halfway through.",
        stationCue: "You can offer pacing, water, and a no-ABV bridge.",
        options: [
          {
            id: "pace-bridge",
            label: "Pace and bridge",
            response: "I can bring a second small pour with more water, or we can switch to the hop tea now and keep the same refreshing pairing lane.",
            score: 4,
            outcome: "The guest remains in control and gets a safe bridge.",
            coaching: "Best answer. It keeps hospitality intact while managing alcohol pacing.",
            strengths: ["Pacing", "Guest agency", "Safe alternative"],
            fixes: []
          },
          {
            id: "auto-refill",
            label: "Auto refill",
            response: "Of course, I will bring another full glass.",
            score: 0,
            outcome: "The service ignores the original safety constraint.",
            coaching: "Do not escalate alcohol after a guest named a driving constraint.",
            strengths: [],
            fixes: ["Track stated limits", "Offer low/no-ABV bridge"]
          },
          {
            id: "refuse-abruptly",
            label: "Refuse abruptly",
            response: "No, you said you are driving.",
            score: 1,
            outcome: "Safety is protected, but the tone may embarrass the guest.",
            coaching: "Maintain dignity. Offer pacing or no-ABV choices rather than a blunt refusal unless service refusal is required.",
            strengths: ["Safety boundary"],
            fixes: ["Use respectful tone", "Offer alternatives"]
          }
        ]
      }
    ]
  }
];

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function ratingForPercent(percent: number, completedSteps: number): string {
  if (completedSteps === 0) return "Choose a response";
  if (percent >= 90) return "Floor ready";
  if (percent >= 75) return "Service safe";
  if (percent >= 55) return "Needs rehearsal";
  return "Rebuild the sequence";
}

export function scoreServiceRoleplayScenario(
  scenario: ServiceRoleplayScenario,
  selectedOptionIds: Record<string, string | undefined>
): ServiceRoleplayScore {
  const maxPoints = scenario.steps.reduce((sum, step) => sum + Math.max(...step.options.map((option) => option.score)), 0);
  const selectedOptions = scenario.steps
    .map((step) => step.options.find((option) => option.id === selectedOptionIds[step.id]))
    .filter((option): option is ServiceRoleplayOption => Boolean(option));
  const points = selectedOptions.reduce((sum, option) => sum + option.score, 0);
  const percent = maxPoints ? Math.round((points / maxPoints) * 100) : 0;
  const strengths = uniqueValues(selectedOptions.flatMap((option) => option.strengths));
  const fixes = uniqueValues(selectedOptions.flatMap((option) => option.fixes));

  return {
    points,
    maxPoints,
    percent,
    rating: ratingForPercent(percent, selectedOptions.length),
    strengths: strengths.length ? strengths : ["No strengths captured yet"],
    fixes: fixes.length ? fixes : selectedOptions.length === scenario.steps.length ? ["Repeat the scenario under time pressure"] : ["Answer every cue before saving the attempt"],
    completedSteps: selectedOptions.length
  };
}
