import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent
} from "react";
import { VinePartGlyph, vineAnatomyParts } from "./VineAnatomyParallax";

const VINE_SELECTION_STORAGE_KEY = "sipopedia:btg:vine-anatomy:selected:v1";
const DETAIL_ID = "vine-and-berry-atlas-detail";

type VineFieldAtlasProps = {
  onSelect?: (index: number | null) => void;
};

const phonePositions: Record<string, readonly [number, number]> = {
  trunk: [7, 18],
  cordon: [21.3, 18],
  cane: [35.7, 18],
  spur: [50, 18],
  "node-bud": [64.3, 18],
  shoot: [78.7, 18],
  tendril: [93, 18],
  roots: [7, 82],
  "graft-union": [21.3, 82],
  canopy: [35.7, 82],
  flowering: [50, 82],
  "berry-set": [64.3, 82],
  veraison: [78.7, 82],
  "ripe-cluster": [93, 82]
};

const studyGroups = [
  { label: "Root", partIndex: 0 },
  { label: "Permanent wood", partIndex: 2 },
  { label: "One-year wood", partIndex: 4 },
  { label: "Green growth", partIndex: 7 },
  { label: "Berry", partIndex: 10 }
] as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const triangle = (value: number, center: number, width: number) =>
  clamp(1 - Math.abs(value - center) / width);

export function VineFieldAtlas({ onSelect }: VineFieldAtlasProps) {
  const nodeButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const onSelectRef = useRef(onSelect);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const activeIndex = selectedPartId
    ? vineAnatomyParts.findIndex((part) => part.id === selectedPartId)
    : -1;
  const activePart = activeIndex >= 0 ? vineAnatomyParts[activeIndex] : null;
  const orbitProgress =
    activeIndex >= 0 ? activeIndex / Math.max(1, vineAnatomyParts.length - 1) : 0;
  const leftFrameOpacity = triangle(orbitProgress, 0.22, 0.2);
  const rightFrameOpacity = triangle(orbitProgress, 0.64, 0.2);
  const frontFrameOpacity = clamp(1 - Math.max(leftFrameOpacity, rightFrameOpacity));
  const activeGroupIndex =
    activeIndex < 0
      ? -1
      : activeIndex <= 1
        ? 0
        : activeIndex <= 3
          ? 1
          : activeIndex <= 6
            ? 2
            : activeIndex <= 9
              ? 3
              : 4;

  onSelectRef.current = onSelect;

  useEffect(() => {
    try {
      const storedPartId = window.localStorage.getItem(VINE_SELECTION_STORAGE_KEY);
      if (storedPartId && vineAnatomyParts.some((part) => part.id === storedPartId)) {
        setSelectedPartId(storedPartId);
        onSelectRef.current?.(
          vineAnatomyParts.findIndex((part) => part.id === storedPartId)
        );
      }
    } catch {
      // The atlas remains fully usable when local storage is unavailable.
    }
  }, []);

  const selectPart = (partId: string | null) => {
    setSelectedPartId(partId);
    onSelectRef.current?.(
      partId === null
        ? null
        : vineAnatomyParts.findIndex((part) => part.id === partId)
    );
    try {
      if (partId) window.localStorage.setItem(VINE_SELECTION_STORAGE_KEY, partId);
      else window.localStorage.removeItem(VINE_SELECTION_STORAGE_KEY);
    } catch {
      // Selection still works for the current visit.
    }
  };

  const selectAndFocus = (index: number) => {
    const safeIndex =
      (index + vineAnatomyParts.length) % vineAnatomyParts.length;
    selectPart(vineAnatomyParts[safeIndex]?.id ?? null);
    window.requestAnimationFrame(() => nodeButtonRefs.current[safeIndex]?.focus());
  };

  const handleNodeKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectAndFocus(index + 1);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectAndFocus(index - 1);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectAndFocus(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectAndFocus(vineAnatomyParts.length - 1);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      selectPart(null);
    }
  };

  return (
    <section
      aria-label="The Vine Builds a Berry interactive field atlas"
      className="btg-field-atlas btg-field-atlas--vine"
      data-phase="vineyard"
      style={
        {
          "--btg-atlas-aspect": "16 / 9",
          "--btg-atlas-count": studyGroups.length
        } as CSSProperties
      }
    >
      <div className="btg-field-atlas__canvas">
        <div className="btg-field-atlas__world">
          <div className="btg-vine-atlas__orbit">
            <picture>
              <source
                media="(max-width: 960px)"
                srcSet="/beyond-the-glass/vine-anatomy/vine-anatomy-front-960.webp"
              />
              <img
                alt="A complete grapevine study plate showing roots and graft union below the soil, permanent trunk and cordon, fruiting canes, shoots, leaves, flowers, and ripening grape clusters above."
                className="btg-vine-atlas__frame"
                decoding="async"
                src="/beyond-the-glass/vine-anatomy/vine-anatomy-front-1600.webp"
                style={{ opacity: frontFrameOpacity }}
              />
            </picture>
            {activeIndex >= 0 ? (
              <>
                <picture>
                  <source
                    media="(max-width: 960px)"
                    srcSet="/beyond-the-glass/vine-anatomy/vine-anatomy-orbit-left-960.webp"
                  />
                  <img
                    alt=""
                    className="btg-vine-atlas__frame"
                    decoding="async"
                    src="/beyond-the-glass/vine-anatomy/vine-anatomy-orbit-left-1600.webp"
                    style={{ opacity: leftFrameOpacity }}
                  />
                </picture>
                <picture>
                  <source
                    media="(max-width: 960px)"
                    srcSet="/beyond-the-glass/vine-anatomy/vine-anatomy-orbit-right-960.webp"
                  />
                  <img
                    alt=""
                    className="btg-vine-atlas__frame"
                    decoding="async"
                    src="/beyond-the-glass/vine-anatomy/vine-anatomy-orbit-right-1600.webp"
                    style={{ opacity: rightFrameOpacity }}
                  />
                </picture>
              </>
            ) : null}
          </div>

          <div className="btg-field-atlas__nodes btg-vine-atlas__nodes">
            {vineAnatomyParts.map((part, index) => {
              const isActive = index === activeIndex;
              const phonePosition = phonePositions[part.id] ?? part.exploded;
              const style = {
                "--btg-atlas-node-x": `${part.exploded[0]}%`,
                "--btg-atlas-node-y": `${part.exploded[1]}%`,
                "--btg-atlas-phone-x": `${phonePosition[0]}%`,
                "--btg-atlas-phone-y": `${phonePosition[1]}%`
              } as CSSProperties;

              return (
                <button
                  aria-controls={DETAIL_ID}
                  aria-label={`Focus ${part.label}`}
                  aria-pressed={isActive}
                  className={isActive ? "is-active" : ""}
                  data-art="icon"
                  data-group={part.group}
                  data-part={part.id}
                  key={part.id}
                  onClick={() => selectPart(part.id)}
                  onKeyDown={(event) => handleNodeKeyDown(event, index)}
                  ref={(node) => {
                    nodeButtonRefs.current[index] = node;
                  }}
                  style={style}
                  tabIndex={activeIndex < 0 ? (index === 0 ? 0 : -1) : isActive ? 0 : -1}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className="btg-field-atlas__lens btg-vine-atlas__lens"
                  >
                    <VinePartGlyph type={part.glyph} />
                  </span>
                  <span className="sr-only">{part.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        aria-label="The Vine Builds a Berry study layers"
        className="btg-field-atlas__rail"
      >
        {studyGroups.map((group, index) => (
          <button
            aria-controls={DETAIL_ID}
            aria-pressed={index === activeGroupIndex}
            key={group.label}
            onClick={() => selectAndFocus(group.partIndex)}
            type="button"
          >
            {group.label}
          </button>
        ))}
      </div>

      <aside aria-live="polite" className="btg-field-atlas__detail" id={DETAIL_ID}>
        <div className="btg-field-atlas__field-note">
          <span>{activePart?.group ?? "Complete vine"}</span>
          <strong>{activePart?.label ?? "Choose any glowing anatomy node"}</strong>
          <p>
            {activePart?.definition ??
              "Explore rootstock, permanent wood, fruiting wood, green growth, and berry development at your own pace."}
          </p>
        </div>
        <nav aria-label="Vine anatomy node controls">
          <button
            aria-label="Focus the previous vine anatomy node"
            onClick={() =>
              activeIndex < 0
                ? selectAndFocus(vineAnatomyParts.length - 1)
                : selectAndFocus(activeIndex - 1)
            }
            type="button"
          >
            <span aria-hidden="true">←</span>
            <span className="btg-desktop-label">Previous</span>
          </button>
          <button onClick={() => selectPart(null)} type="button">
            Overview
          </button>
          <button
            aria-label="Focus the next vine anatomy node"
            onClick={() =>
              activeIndex < 0 ? selectAndFocus(0) : selectAndFocus(activeIndex + 1)
            }
            type="button"
          >
            <span className="btg-desktop-label">Next</span>
            <span aria-hidden="true">→</span>
          </button>
        </nav>
      </aside>
    </section>
  );
}
