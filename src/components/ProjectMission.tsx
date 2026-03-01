import { useMemo, useState } from "react";

type Step = {
  id: string;
  title: string;
  prompt: string;
  expected: string;
};

const steps: Step[] = [
  {
    id: "brief",
    title: "Client Brief",
    prompt: "A startup wants a calming living room concept in under 15 seconds render time.",
    expected: "Speed + mood"
  },
  {
    id: "layout",
    title: "Layout Intent",
    prompt: "Choose your anchor object first and place supporting pieces around it.",
    expected: "Couch anchor"
  },
  {
    id: "ai",
    title: "AI Prompt",
    prompt: "Write one prompt that keeps style coherent across camera angles.",
    expected: "Consistent style"
  }
];

export function ProjectMission() {
  const [index, setIndex] = useState(0);
  const current = steps[index];
  const progress = useMemo(() => Math.round(((index + 1) / steps.length) * 100), [index]);

  return (
    <section className="mission">
      <div className="section-header">
        <h2>Interactive mission</h2>
        <p>First pass of a guided exercise flow for the 3D interior design track.</p>
      </div>
      <div className="mission-shell">
        <div className="mission-info">
          <p className="mission-chip">
            Step {index + 1}/{steps.length}
          </p>
          <h3>{current.title}</h3>
          <p>{current.prompt}</p>
          <small>Target outcome: {current.expected}</small>
        </div>
        <div className="mission-progress">
          <div className="progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>{progress}% complete</p>
          <div className="mission-buttons">
            <button
              className="btn btn-light"
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              disabled={index === 0}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setIndex((value) => Math.min(steps.length - 1, value + 1))}
              disabled={index === steps.length - 1}
            >
              Next step
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
