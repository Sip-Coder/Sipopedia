import { useEffect, useMemo, useState } from "react";
import { categoryTrainingSprints, type CategorySprintId, type CategoryTrainingSprint } from "../lib/categoryTrainingSprints";
import { learningSourcePackForCategorySprint } from "../lib/learningSources";
import { LearningSourcePanel } from "./LearningSourcePanel";

const CATEGORY_ARC_STORAGE_KEY = "sipstudies:category-training-arcs:v1";

type CategoryArcProgressRecord = {
  activeModuleIndex: number;
  completedModuleTitles: string[];
  lastUpdated: string;
};

type CategoryArcProgress = Partial<Record<CategorySprintId, CategoryArcProgressRecord>>;

function defaultArcProgress(): CategoryArcProgressRecord {
  return {
    activeModuleIndex: 0,
    completedModuleTitles: [],
    lastUpdated: ""
  };
}

function readCategoryArcProgress(): CategoryArcProgress {
  if (typeof window === "undefined") return {};

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CATEGORY_ARC_STORAGE_KEY) ?? "{}");
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as CategoryArcProgress;
  } catch {
    return {};
  }
}

function downloadTextFile(filename: string, body: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function buildArcPacket(sprint: CategoryTrainingSprint, progress: CategoryArcProgressRecord) {
  const completed = new Set(progress.completedModuleTitles);

  return [
    "Sip Studies Category Lesson Arc",
    sprint.title,
    "",
    `Audience: ${sprint.audience}`,
    `Benchmark: ${sprint.benchmark}`,
    `Capstone: ${sprint.capstone}`,
    "",
    "Arc Modules",
    ...sprint.modules.flatMap((module, index) => [
      "",
      `${index + 1}. ${module.title}${completed.has(module.title) ? " [complete]" : ""}`,
      `Outcome: ${module.outcome}`,
      "Steps:",
      ...module.steps.map((step) => `- ${step}`),
      `Drill: ${module.drill}`,
      `Checkpoint: ${module.checkpoint}`,
      `Mentor cue: ${module.mentorCue}`
    ]),
    "",
    `Quiz handoff: #app/beverage-quiz?preset=${sprint.drillPresetId}`
  ].join("\n");
}

export function CategoryTrainingSprints() {
  const [activeSprintId, setActiveSprintId] = useState<CategorySprintId>(categoryTrainingSprints[0].id);
  const [arcProgress, setArcProgress] = useState<CategoryArcProgress>(readCategoryArcProgress);

  useEffect(() => {
    window.localStorage.setItem(CATEGORY_ARC_STORAGE_KEY, JSON.stringify(arcProgress));
  }, [arcProgress]);

  const activeSprint = useMemo(
    () => categoryTrainingSprints.find((sprint) => sprint.id === activeSprintId) ?? categoryTrainingSprints[0],
    [activeSprintId]
  );
  const activeProgress = arcProgress[activeSprint.id] ?? defaultArcProgress();
  const activeModuleIndex = Math.min(activeProgress.activeModuleIndex, activeSprint.modules.length - 1);
  const activeModule = activeSprint.modules[activeModuleIndex];
  const completedModuleTitles = new Set(activeProgress.completedModuleTitles);
  const completedCount = activeSprint.modules.filter((module) => completedModuleTitles.has(module.title)).length;
  const completionPercent = Math.round((completedCount / activeSprint.modules.length) * 100);
  const activeModuleComplete = completedModuleTitles.has(activeModule.title);

  const updateSprintProgress = (
    sprint: CategoryTrainingSprint,
    updater: (current: CategoryArcProgressRecord) => CategoryArcProgressRecord
  ) => {
    setArcProgress((current) => {
      const next = updater(current[sprint.id] ?? defaultArcProgress());
      return {
        ...current,
        [sprint.id]: {
          ...next,
          activeModuleIndex: Math.max(0, Math.min(next.activeModuleIndex, sprint.modules.length - 1)),
          completedModuleTitles: Array.from(new Set(next.completedModuleTitles)),
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  const selectModule = (index: number) => {
    updateSprintProgress(activeSprint, (current) => ({ ...current, activeModuleIndex: index }));
  };

  const completeActiveModule = () => {
    updateSprintProgress(activeSprint, (current) => ({
      ...current,
      activeModuleIndex: Math.min(activeModuleIndex + 1, activeSprint.modules.length - 1),
      completedModuleTitles: [...current.completedModuleTitles, activeModule.title]
    }));
  };

  const resetActiveSprint = () => {
    updateSprintProgress(activeSprint, () => defaultArcProgress());
  };

  const downloadActiveArc = () => {
    downloadTextFile(`sip-studies-${activeSprint.id}-lesson-arc.md`, buildArcPacket(activeSprint, activeProgress));
  };

  return (
    <section className="academy-category-sprints" aria-labelledby="academy-category-sprints-title">
      <div className="academy-category-sprints-head">
        <p className="academy-campaign-kicker">Beer + Spirits Academy Paths</p>
        <h3 id="academy-category-sprints-title">Interactive beer, spirits, and bar arcs.</h3>
        <p>
          Competitor programs make category practice obvious. These arcs now move beer, spirits, and bar-service learners
          through lesson checkpoints before the quiz drill.
        </p>
      </div>

      <div className="academy-category-sprint-grid">
        {categoryTrainingSprints.map((sprint) => (
          <article key={sprint.id} className={`academy-category-sprint academy-category-sprint-${sprint.id}`}>
            <div className="academy-category-sprint-top">
              <span>{sprint.label}</span>
              <strong>{sprint.benchmark}</strong>
            </div>
            <h4>{sprint.title}</h4>
            <p>{sprint.summary}</p>
            <div className="academy-category-sprint-audience">{sprint.audience}</div>

            <div className="academy-category-module-list">
              {sprint.modules.map((module) => (
                <section key={`${sprint.id}-${module.title}`}>
                  <h5>{module.title}</h5>
                  <p>{module.outcome}</p>
                  <small>{module.drill}</small>
                </section>
              ))}
            </div>

            <div className="academy-category-proof">
              {sprint.proofPoints.map((point) => (
                <span key={`${sprint.id}-${point}`}>{point}</span>
              ))}
            </div>

            <LearningSourcePanel pack={learningSourcePackForCategorySprint(sprint.id)} title="Official Benchmark" compact tone="dark" />

            <a className="btn btn-primary" href={`#app/beverage-quiz?preset=${encodeURIComponent(sprint.drillPresetId)}`}>
              {sprint.routeLabel}
            </a>
          </article>
        ))}
      </div>

      <section className="academy-category-arc-lab" aria-labelledby="academy-category-arc-lab-title">
        <div className="academy-category-arc-head">
          <div>
            <p className="academy-campaign-kicker">Lesson Arc Lab</p>
            <h4 id="academy-category-arc-lab-title">{activeSprint.title}</h4>
            <p>{activeSprint.capstone}</p>
          </div>
          <div className="academy-category-arc-score" aria-label={`${completionPercent}% complete`}>
            <strong>{completionPercent}%</strong>
            <span>{completedCount}/{activeSprint.modules.length} checkpoints</span>
          </div>
        </div>

        <div className="academy-category-arc-tabs" role="tablist" aria-label="Category lesson arcs">
          {categoryTrainingSprints.map((sprint) => (
            <button
              key={sprint.id}
              type="button"
              role="tab"
              aria-selected={sprint.id === activeSprint.id}
              className={sprint.id === activeSprint.id ? "active" : ""}
              onClick={() => setActiveSprintId(sprint.id)}
            >
              {sprint.label}
            </button>
          ))}
        </div>

        <div className="academy-category-arc-progress" aria-hidden="true">
          <span style={{ width: `${completionPercent}%` }} />
        </div>

        <div className="academy-category-arc-workspace">
          <div className="academy-category-arc-rail" aria-label={`${activeSprint.label} modules`}>
            {activeSprint.modules.map((module, index) => {
              const isActive = index === activeModuleIndex;
              const isComplete = completedModuleTitles.has(module.title);
              return (
                <button
                  key={module.title}
                  type="button"
                  className={isActive ? "active" : ""}
                  onClick={() => selectModule(index)}
                >
                  <span>{isComplete ? "Done" : `Module ${index + 1}`}</span>
                  <strong>{module.title}</strong>
                </button>
              );
            })}
          </div>

          <article className="academy-category-arc-module">
            <div className="academy-category-arc-module-top">
              <span>{activeSprint.benchmark}</span>
              <strong>{activeModuleComplete ? "Checkpoint Complete" : "Checkpoint Open"}</strong>
            </div>
            <h5>{activeModule.title}</h5>
            <p>{activeModule.outcome}</p>

            <ol className="academy-category-arc-steps">
              {activeModule.steps.map((step) => (
                <li key={`${activeModule.title}-${step}`}>{step}</li>
              ))}
            </ol>

            <div className="academy-category-arc-checks">
              <section>
                <span>Drill</span>
                <p>{activeModule.drill}</p>
              </section>
              <section>
                <span>Checkpoint</span>
                <p>{activeModule.checkpoint}</p>
              </section>
              <section>
                <span>Mentor Cue</span>
                <p>{activeModule.mentorCue}</p>
              </section>
            </div>

            <div className="academy-category-arc-actions">
              <button type="button" className="btn btn-primary" onClick={completeActiveModule}>
                {activeModuleComplete ? "Advance Arc" : "Complete Checkpoint"}
              </button>
              <a className="btn btn-light" href={`#app/beverage-quiz?preset=${encodeURIComponent(activeSprint.drillPresetId)}`}>
                Quiz Drill
              </a>
              <button type="button" className="btn btn-light" onClick={downloadActiveArc}>
                Download Arc
              </button>
              <button type="button" className="btn btn-ghost" onClick={resetActiveSprint}>
                Reset
              </button>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
