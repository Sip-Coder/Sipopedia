import { useMemo, useState, type CSSProperties } from "react";
import {
  scoreServiceRoleplayScenario,
  serviceRoleplayCategoryLabels,
  serviceRoleplayScenarios,
  type ServiceRoleplayCategory,
  type ServiceRoleplayScenario
} from "../lib/serviceRoleplay";

type ServiceRoleplayLabProps = {
  onNavigate: (route: string) => void;
};

type SavedRoleplayAttempt = {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  category: ServiceRoleplayCategory;
  points: number;
  maxPoints: number;
  percent: number;
  rating: string;
  createdAt: string;
};

const ATTEMPT_STORAGE_KEY = "sipstudies:service-roleplay-attempts:v1";
const categoryOrder: Array<"all" | ServiceRoleplayCategory> = ["all", "sommelier", "beer", "bar", "recovery"];

function categoryLabel(category: "all" | ServiceRoleplayCategory): string {
  return category === "all" ? "All Scenarios" : serviceRoleplayCategoryLabels[category];
}

function readSavedAttempts(): SavedRoleplayAttempt[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(ATTEMPT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedRoleplayAttempt[];
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

function writeSavedAttempts(attempts: SavedRoleplayAttempt[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify(attempts.slice(0, 8)));
}

function buildCoachingText(scenario: ServiceRoleplayScenario, score: ReturnType<typeof scoreServiceRoleplayScenario>): string {
  return [
    scenario.title,
    `${score.points}/${score.maxPoints} points - ${score.percent}% - ${score.rating}`,
    "",
    "Success criteria:",
    ...scenario.successCriteria.map((item) => `- ${item}`),
    "",
    "Strengths:",
    ...score.strengths.map((item) => `- ${item}`),
    "",
    "Rehearsal fixes:",
    ...score.fixes.map((item) => `- ${item}`)
  ].join("\n");
}

export function ServiceRoleplayLab({ onNavigate }: ServiceRoleplayLabProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | ServiceRoleplayCategory>("all");
  const [activeScenarioId, setActiveScenarioId] = useState(serviceRoleplayScenarios[0].id);
  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<string, string | undefined>>({});
  const [responseDrafts, setResponseDrafts] = useState<Record<string, string>>({});
  const [revealedStepIds, setRevealedStepIds] = useState<Record<string, true>>({});
  const [savedAttempts, setSavedAttempts] = useState<SavedRoleplayAttempt[]>(() => readSavedAttempts());
  const [notice, setNotice] = useState("");

  const visibleScenarios = useMemo(
    () => serviceRoleplayScenarios.filter((scenario) => activeCategory === "all" || scenario.category === activeCategory),
    [activeCategory]
  );
  const activeScenario = useMemo(
    () => visibleScenarios.find((scenario) => scenario.id === activeScenarioId) ?? visibleScenarios[0] ?? serviceRoleplayScenarios[0],
    [activeScenarioId, visibleScenarios]
  );
  const score = useMemo(() => scoreServiceRoleplayScenario(activeScenario, selectedOptionIds), [activeScenario, selectedOptionIds]);
  const categoryCounts = useMemo(
    () =>
      categoryOrder.reduce<Record<string, number>>((acc, category) => {
        acc[category] = category === "all" ? serviceRoleplayScenarios.length : serviceRoleplayScenarios.filter((scenario) => scenario.category === category).length;
        return acc;
      }, {}),
    []
  );
  const isComplete = score.completedSteps === activeScenario.steps.length;

  const changeCategory = (category: "all" | ServiceRoleplayCategory) => {
    const nextScenario = serviceRoleplayScenarios.find((scenario) => category === "all" || scenario.category === category) ?? serviceRoleplayScenarios[0];
    setActiveCategory(category);
    setActiveScenarioId(nextScenario.id);
    setSelectedOptionIds({});
    setResponseDrafts({});
    setRevealedStepIds({});
    setNotice("");
  };

  const chooseScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setSelectedOptionIds({});
    setResponseDrafts({});
    setRevealedStepIds({});
    setNotice("");
  };

  const saveAttempt = () => {
    if (!isComplete) {
      setNotice("Answer every service cue before saving the scored attempt.");
      return;
    }

    const nextAttempt: SavedRoleplayAttempt = {
      id: `${activeScenario.id}-${Date.now()}`,
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      category: activeScenario.category,
      points: score.points,
      maxPoints: score.maxPoints,
      percent: score.percent,
      rating: score.rating,
      createdAt: new Date().toISOString()
    };
    const nextAttempts = [nextAttempt, ...savedAttempts].slice(0, 8);
    setSavedAttempts(nextAttempts);
    writeSavedAttempts(nextAttempts);
    setNotice("Roleplay attempt saved locally.");
  };

  const copyCoaching = async () => {
    const text = buildCoachingText(activeScenario, score);
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setNotice("Copy is unavailable in this browser. Save the attempt instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setNotice("Coaching note copied.");
    } catch {
      setNotice("Copy failed in this browser. Save the attempt instead.");
    }
  };

  return (
    <section className="service-roleplay-page">
      <header className="section-header service-roleplay-hero">
        <p className="checkout-eyebrow">Service Roleplay Lab</p>
        <h2>Scored guest scenarios for service, beer, bar, and recovery practice.</h2>
        <p>
          Turn credential-style service pressure into repeatable reps. Choose responses, get scored coaching, save attempts,
          and jump into the next study route.
        </p>
        <p className="hint">
          Goal → respond in your own words → compare service choices → review coaching → choose the next practice route.
        </p>
        <div className="service-roleplay-hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate("app/beverage-quiz?preset=bar-service")}>
            Run Service Quiz
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate("app/study-sheets")}>
            Print Service Sheets
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate("study-paths")}>
            Credential Paths
          </button>
        </div>
        {notice ? <p className="service-roleplay-notice">{notice}</p> : null}
      </header>

      <div className="service-roleplay-layout">
        <aside className="service-roleplay-sidebar" aria-label="Service roleplay scenario filters">
          <div className="service-roleplay-category-grid">
            {categoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                className={category === activeCategory ? "active" : ""}
                onClick={() => changeCategory(category)}
              >
                <span>{categoryLabel(category)}</span>
                <strong>{categoryCounts[category]} rep{categoryCounts[category] === 1 ? "" : "s"}</strong>
              </button>
            ))}
          </div>

          <div className="service-roleplay-scenario-list" role="list">
            {visibleScenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                role="listitem"
                className={scenario.id === activeScenario.id ? "active" : ""}
                onClick={() => chooseScenario(scenario.id)}
              >
                <span>{serviceRoleplayCategoryLabels[scenario.category]}</span>
                <strong>{scenario.title}</strong>
                <small>{scenario.credentialSignal}</small>
              </button>
            ))}
          </div>

          <section className="service-roleplay-history" aria-label="Saved roleplay attempts">
            <h3>Saved Attempts</h3>
            {savedAttempts.length ? (
              savedAttempts.map((attempt) => (
                <article key={attempt.id}>
                  <span>{serviceRoleplayCategoryLabels[attempt.category]}</span>
                  <strong>{attempt.percent}% - {attempt.rating}</strong>
                  <small>{attempt.scenarioTitle}</small>
                  <time dateTime={attempt.createdAt}>{new Date(attempt.createdAt).toLocaleString()}</time>
                </article>
              ))
            ) : (
              <p>No saved reps yet.</p>
            )}
          </section>
        </aside>

        <article className="service-roleplay-panel">
          <div className="service-roleplay-panel-head">
            <div>
              <p className="nav-overline">{serviceRoleplayCategoryLabels[activeScenario.category]}</p>
              <h3>{activeScenario.title}</h3>
              <p>{activeScenario.setup}</p>
            </div>
            <div className="service-roleplay-score-card">
              <span>{activeScenario.difficulty}</span>
              <strong>{score.percent}%</strong>
              <small>{score.points}/{score.maxPoints} points</small>
            </div>
          </div>

          <section className="service-roleplay-success">
            <div>
              <strong>{activeScenario.credentialSignal}</strong>
              <span>{score.completedSteps}/{activeScenario.steps.length} cues answered</span>
            </div>
            <ul>
              {activeScenario.successCriteria.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </section>

          <div className="service-roleplay-meter" aria-label={`Score ${score.percent}%`}>
            <span style={{ width: `${score.percent}%` } as CSSProperties} />
          </div>

          <div className="service-roleplay-step-stack">
            {activeScenario.steps.map((step, stepIndex) => {
              const selectedOptionId = selectedOptionIds[step.id];
              const selectedOption = step.options.find((option) => option.id === selectedOptionId);

              return (
                <section key={step.id} className="service-roleplay-step">
                  <div className="service-roleplay-step-head">
                    <span>Round {stepIndex + 1}</span>
                    <h4>{step.title}</h4>
                  </div>
                  <div className="service-roleplay-cues">
                    <p>
                      <strong>Guest:</strong> {step.guestCue}
                    </p>
                    <p>
                      <strong>Station:</strong> {step.stationCue}
                    </p>
                  </div>
                  <div className="service-roleplay-cues">
                    <label htmlFor={`roleplay-response-${step.id}`}>
                      <strong>Try first:</strong> What would you say or do before seeing the choices?
                    </label>
                    <textarea
                      id={`roleplay-response-${step.id}`}
                      value={responseDrafts[step.id] ?? ""}
                      onChange={(event) => {
                        setResponseDrafts((current) => ({ ...current, [step.id]: event.target.value }));
                        setNotice("");
                      }}
                      placeholder="Rehearse a concise guest-facing response..."
                      rows={3}
                    />
                    {!revealedStepIds[step.id] ? (
                      <button
                        type="button"
                        className="btn btn-light"
                        disabled={(responseDrafts[step.id]?.trim().length ?? 0) < 12}
                        onClick={() => setRevealedStepIds((current) => ({ ...current, [step.id]: true }))}
                      >
                        Compare Response Choices
                      </button>
                    ) : null}
                  </div>
                  {revealedStepIds[step.id] ? (
                    <div className="service-roleplay-options">
                      {step.options.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className={option.id === selectedOptionId ? "selected" : ""}
                          aria-pressed={option.id === selectedOptionId}
                          onClick={() => {
                            setSelectedOptionIds((current) => ({ ...current, [step.id]: option.id }));
                            setNotice("");
                          }}
                        >
                          <span>{option.label}</span>
                          <strong>{option.response}</strong>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="hint">Write at least 12 characters to unlock the comparison choices.</p>
                  )}
                  {selectedOption ? (
                    <div className={`service-roleplay-feedback score-${selectedOption.score}`}>
                      <span>{selectedOption.score} points</span>
                      <p>{selectedOption.outcome}</p>
                      <small>{selectedOption.coaching}</small>
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>

          <section className="service-roleplay-results">
            <div>
              <p className="nav-overline">Coaching Result</p>
              <h4>{score.rating}</h4>
              <p>{isComplete ? "Save this attempt or repeat under time pressure." : "Complete every round to unlock a reliable score."}</p>
            </div>
            <div className="service-roleplay-result-grid">
              <section>
                <h5>Strengths</h5>
                <ul>
                  {score.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h5>Fix Next</h5>
                <ul>
                  {score.fixes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
            <div className="service-roleplay-actions">
              <button type="button" className="btn btn-primary" onClick={saveAttempt}>
                Save Scored Rep
              </button>
              <button type="button" className="btn btn-light" onClick={copyCoaching}>
                Copy Coaching
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setSelectedOptionIds({});
                  setResponseDrafts({});
                  setRevealedStepIds({});
                  setNotice("");
                }}
              >
                Restart Scenario
              </button>
            </div>
          </section>

          <section className="service-roleplay-handoffs">
            <h4>Next study route</h4>
            <div>
              {activeScenario.handoffs.map((handoff) => (
                <button key={handoff.label} type="button" className="btn btn-light" onClick={() => onNavigate(handoff.route)}>
                  {handoff.label}
                </button>
              ))}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}
