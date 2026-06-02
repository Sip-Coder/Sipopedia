export type CategorySprintId = "beer" | "spirits" | "bar";

export type CategorySprintModule = {
  title: string;
  outcome: string;
  drill: string;
  steps: string[];
  checkpoint: string;
  mentorCue: string;
};

export type CategoryTrainingSprint = {
  id: CategorySprintId;
  label: string;
  title: string;
  audience: string;
  benchmark: string;
  summary: string;
  drillPresetId: string;
  routeLabel: string;
  modules: CategorySprintModule[];
  proofPoints: string[];
  capstone: string;
};

export const categoryTrainingSprints: CategoryTrainingSprint[] = [
  {
    id: "beer",
    label: "Beer Track",
    title: "Cicerone-Style Beer Service Sprint",
    audience: "Beer servers, taproom teams, and beverage learners",
    benchmark: "Style, draught, storage, and off-flavor readiness",
    summary:
      "A short Academy path for learners who need beer service confidence before deeper brewing theory. It turns style language, draught quality, and fault recognition into repeatable shiftside decisions.",
    drillPresetId: "beer-server",
    routeLabel: "Launch Beer Quiz",
    modules: [
      {
        title: "Style Signal",
        outcome: "Separate ale/lager process cues, ABV range, bitterness, and service language.",
        drill: "Compare one classic lager, one wheat beer, and one hop-forward ale.",
        steps: [
          "Name the fermentation family before naming the style.",
          "Attach one malt, hop, yeast, and strength cue.",
          "Translate the style into one guest-safe sentence."
        ],
        checkpoint: "Can the learner explain why a pilsner, hefeweizen, stout, and IPA should not be described the same way?",
        mentorCue: "Coach for style family first, then service language."
      },
      {
        title: "Draught Quality",
        outcome: "Explain why pressure, temperature, clean lines, and glassware change the pour.",
        drill: "Diagnose a foamy pour with one likely cause and one corrective question.",
        steps: [
          "Start with temperature, pressure, glass cleanliness, and line condition.",
          "Connect the visible pour issue to one likely operating cause.",
          "Ask the shift lead one corrective question before serving the next guest."
        ],
        checkpoint: "Can the learner separate foamy pour causes from flat, stale, warm, or dirty-glass symptoms?",
        mentorCue: "Reward operational diagnosis, not memorized vocabulary alone."
      },
      {
        title: "Off-Flavor Call",
        outcome: "Name common faults without embarrassing the guest or the producer.",
        drill: "Translate diacetyl or lightstrike into a calm service response.",
        steps: [
          "Identify the sensory marker in plain words.",
          "State one likely cause without overclaiming certainty.",
          "Practice a replacement or escalation script."
        ],
        checkpoint: "Can the learner identify diacetyl, oxidation, lightstrike, and acetaldehyde using guest-safe language?",
        mentorCue: "Keep the language calm: quality issue first, blame never."
      }
    ],
    proofPoints: ["Style recall", "Draught diagnosis", "Guest-safe fault language"],
    capstone: "Run a three-beer mini flight: one clean style ID, one draught diagnosis, and one calm fault-recovery script."
  },
  {
    id: "spirits",
    label: "Spirits Track",
    title: "Spirits Category Logic Sprint",
    audience: "Retail teams, bartenders, and WSET-style spirits learners",
    benchmark: "Base material, distillation, maturation, and category identity",
    summary:
      "A compact path for spirits learners who need to connect production choices to what appears on a back bar, menu, or exam question.",
    drillPresetId: "spirits-category",
    routeLabel: "Launch Spirits Quiz",
    modules: [
      {
        title: "Base Material",
        outcome: "Connect grain, fruit, agave, cane, and botanical bases to category identity.",
        drill: "Pick one spirit and state the fermentable source before naming the style.",
        steps: [
          "Name the fermentable source before the category.",
          "Separate raw material, fermentation, and distillation language.",
          "Attach one expected aroma, texture, or service cue."
        ],
        checkpoint: "Can the learner connect whiskey, brandy, rum, tequila, vodka, and gin to base-material logic?",
        mentorCue: "Push the learner to trace category identity back to production cause."
      },
      {
        title: "Distillation Cut",
        outcome: "Explain heads, hearts, and tails as quality-control language.",
        drill: "Describe why a clean heart cut matters without using production jargon.",
        steps: [
          "Define the quality goal of selecting the heart of the run.",
          "Connect still type to texture, concentration, or neutrality.",
          "Explain the choice in one sentence a guest would understand."
        ],
        checkpoint: "Can the learner describe pot, column, and cut decisions without sounding like a chemistry lecture?",
        mentorCue: "Score clarity: production detail must become useful service language."
      },
      {
        title: "Maturation Cue",
        outcome: "Read oak, char, oxidation, and proof as service clues.",
        drill: "Recommend neat, rocks, highball, or cocktail use from a style cue.",
        steps: [
          "Identify oak, char, oxidation, proof, or age statement clues.",
          "Translate intensity into neat, rocks, highball, or cocktail service.",
          "Name one tradeoff: aroma lift, dilution, texture, or value."
        ],
        checkpoint: "Can the learner justify service format from category and maturation evidence?",
        mentorCue: "Ask for the why behind the serve, not just the serve itself."
      }
    ],
    proofPoints: ["Production-to-style logic", "Maturation vocabulary", "Menu-ready category language"],
    capstone: "Build a back-bar recommendation set: one neat pour, one rocks serve, one highball, and one cocktail base with production reasons."
  },
  {
    id: "bar",
    label: "Bartender Track",
    title: "Bar Service Confidence Sprint",
    audience: "New bartenders, servers, and team trainers",
    benchmark: "Guest sequence, confidence, practical explanation, and pre-shift use",
    summary:
      "A hospitality-first path for turning beverage knowledge into clear guest guidance, team consistency, and fast service decisions.",
    drillPresetId: "bar-service",
    routeLabel: "Launch Service Quiz",
    modules: [
      {
        title: "Guest Read",
        outcome: "Ask one useful preference question and turn it into a safe recommendation.",
        drill: "Convert 'not too sweet' into one clarifying question and one suggestion.",
        steps: [
          "Ask one preference question tied to sweetness, strength, texture, or flavor.",
          "Confirm the guest's boundary before naming the drink.",
          "Recommend one option and one nearby backup."
        ],
        checkpoint: "Can the learner turn vague guest language into a confident, low-risk recommendation?",
        mentorCue: "Grade the question quality before the recommendation."
      },
      {
        title: "Build Language",
        outcome: "Explain acidity, bitterness, smoke, oak, sweetness, and texture in plain English.",
        drill: "Translate one technical descriptor into guest-facing words.",
        steps: [
          "Choose one technical descriptor.",
          "Translate it into a guest-facing taste promise.",
          "Name when that descriptor would be a selling point or a warning."
        ],
        checkpoint: "Can the learner explain bitter, smoky, oaky, tart, creamy, and dry without hiding behind jargon?",
        mentorCue: "Make every descriptor earn its place in the sale."
      },
      {
        title: "Shift Close",
        outcome: "Turn weak topics into the next team drill instead of a one-off correction.",
        drill: "Choose one missed quiz topic and assign a two-minute pre-shift recap.",
        steps: [
          "Pick one weak topic from quiz, roleplay, or service feedback.",
          "Assign one two-minute recap for the next pre-shift.",
          "Define the observable behavior that proves improvement."
        ],
        checkpoint: "Can the learner convert a miss into a team drill with one owner and one proof point?",
        mentorCue: "Close the loop: weak topic, practice rep, visible behavior."
      }
    ],
    proofPoints: ["Guest-facing language", "Shift-ready correction", "Manager training handoff"],
    capstone: "Run a five-minute bar pre-shift: one guest-read script, one descriptor translation, and one weak-topic team assignment."
  }
];
