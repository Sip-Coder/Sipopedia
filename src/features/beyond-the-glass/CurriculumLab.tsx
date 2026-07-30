import { useEffect, useRef, useState } from "react";
import type { BeyondTheGlassCurriculumLab } from "../../data/beyondTheGlassCurriculum";
import { GuideSprite } from "./GuideSprite";

type CurriculumLabProps = {
  lab: BeyondTheGlassCurriculumLab;
  onClose: () => void;
  reducedMotion?: boolean;
};

export function CurriculumLab({ lab, onClose, reducedMotion = false }: CurriculumLabProps) {
  const [activeSectionId, setActiveSectionId] = useState(lab.sections[0]?.id ?? "");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeSection =
    lab.sections.find((section) => section.id === activeSectionId) ?? lab.sections[0];

  useEffect(() => {
    setActiveSectionId(lab.sections[0]?.id ?? "");
  }, [lab]);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section
      aria-labelledby={`${lab.id}-title`}
      aria-modal="true"
      className="btg-curriculum-lab"
      role="dialog"
    >
      <header className="btg-curriculum-lab__header">
        <div>
          <p className="btg-kicker">{lab.eyebrow}</p>
          <h2 id={`${lab.id}-title`}>{lab.title}</h2>
        </div>
        <button onClick={onClose} ref={closeButtonRef} type="button">
          Return to journey
        </button>
      </header>

      <div className="btg-curriculum-lab__body">
        <figure className="btg-curriculum-lab__art">
          <picture>
            <source
              media="(max-width: 640px) and (orientation: portrait)"
              srcSet={lab.artwork.portraitSrcSet}
            />
            <img
              alt={lab.artwork.alt}
              decoding="async"
              loading="eager"
              sizes="(max-width: 640px) 100vw, 64vw"
              src={lab.artwork.landscapeSrc}
              srcSet={lab.artwork.landscapeSrcSet}
            />
          </picture>
        </figure>

        <div className="btg-curriculum-lab__lesson">
          <p className="btg-curriculum-lab__summary">{lab.summary}</p>
          <blockquote className="btg-lab-letter" data-speaker={lab.guide}>
            <GuideSprite
              active
              cue={`${lab.id}:${activeSectionId}`}
              reducedMotion={reducedMotion}
              speaker={lab.guide}
            />
            <div>
              <strong>A field note from {lab.guide}</strong>
              <p>{lab.guideNote}</p>
            </div>
          </blockquote>

          <div className="btg-lab-tabs" aria-label={`${lab.title} components`} role="tablist">
            {lab.sections.map((section) => (
              <button
                aria-controls={`${lab.id}-${section.id}`}
                aria-selected={section.id === activeSection?.id}
                id={`${lab.id}-${section.id}-tab`}
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                role="tab"
                type="button"
              >
                <span>{section.label}</span>
                {section.title}
              </button>
            ))}
          </div>

          {activeSection ? (
            <article
              aria-labelledby={`${lab.id}-${activeSection.id}-tab`}
              className="btg-lab-explainer"
              id={`${lab.id}-${activeSection.id}`}
              role="tabpanel"
            >
              <p>{activeSection.summary}</p>
              <ul>
                {activeSection.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ) : null}
          {lab.deepDive ? (
            <aside className="btg-lab-deep-dive">
              <a href={lab.deepDive.href}>{lab.deepDive.label}</a>
              <small>{lab.deepDive.returnNote}</small>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
