import { useEffect, useState, type CSSProperties } from "react";
import { clamp, progressBetween } from "./useScrollStoryProgress";

export type VineAnatomyPart = {
  id: string;
  label: string;
  group: "Permanent vine" | "Fruiting wood" | "Green growth" | "Annual cycle";
  definition: string;
  assembled: readonly [number, number];
  exploded: readonly [number, number];
  glyph:
    | "roots"
    | "graft"
    | "trunk"
    | "cordon"
    | "cane"
    | "spur"
    | "bud"
    | "shoot"
    | "tendril"
    | "canopy"
    | "flower"
    | "berry-set"
    | "veraison"
    | "cluster";
};

export const vineAnatomyParts: readonly VineAnatomyPart[] = [
  {
    id: "roots",
    label: "Root system",
    group: "Permanent vine",
    definition:
      "The roots anchor the vine and take up water and mineral nutrients. On a grafted vine, they belong to the selected rootstock.",
    assembled: [50, 79],
    exploded: [11, 77],
    glyph: "roots"
  },
  {
    id: "graft-union",
    label: "Graft union",
    group: "Permanent vine",
    definition:
      "The graft union joins the fruiting scion above ground to the selected rootstock below it.",
    assembled: [50, 69],
    exploded: [29, 86],
    glyph: "graft"
  },
  {
    id: "trunk",
    label: "Trunk",
    group: "Permanent vine",
    definition:
      "The trunk is the vine’s permanent vertical body between the roots and the head or cordons.",
    assembled: [50, 57],
    exploded: [10, 54],
    glyph: "trunk"
  },
  {
    id: "cordon",
    label: "Cordon",
    group: "Permanent vine",
    definition:
      "A cordon is a permanent horizontal extension of the trunk, at least two years old, that can carry fruiting spurs.",
    assembled: [50, 45],
    exploded: [25, 29],
    glyph: "cordon"
  },
  {
    id: "cane",
    label: "Cane",
    group: "Fruiting wood",
    definition:
      "A cane is a mature, woody shoot from the previous growing season. Its retained buds can produce this season’s fruiting shoots.",
    assembled: [38, 35],
    exploded: [38, 20],
    glyph: "cane"
  },
  {
    id: "spur",
    label: "Spur",
    group: "Fruiting wood",
    definition:
      "A spur is a short section of one-year-old cane retained at pruning with fewer buds than a fruiting cane.",
    assembled: [43, 43],
    exploded: [74, 27],
    glyph: "spur"
  },
  {
    id: "node-bud",
    label: "Node + bud",
    group: "Fruiting wood",
    definition:
      "A bud sits at a node on a cane or shoot. At bud break, its primary growing point usually opens into a new shoot.",
    assembled: [35, 28],
    exploded: [90, 10],
    glyph: "bud"
  },
  {
    id: "shoot",
    label: "Shoot",
    group: "Green growth",
    definition:
      "A shoot is the current season’s green growth from a bud. It carries leaves, tendrils, and often flower or grape clusters.",
    assembled: [31, 23],
    exploded: [91, 43],
    glyph: "shoot"
  },
  {
    id: "tendril",
    label: "Tendril",
    group: "Green growth",
    definition:
      "A tendril is the vine’s twining support organ, helping a growing shoot hold onto wires or nearby structures.",
    assembled: [21, 16],
    exploded: [10, 12],
    glyph: "tendril"
  },
  {
    id: "canopy",
    label: "Leaf canopy",
    group: "Green growth",
    definition:
      "The canopy is the system of shoots and leaves. It captures light, exchanges gases, and powers photosynthesis.",
    assembled: [50, 18],
    exploded: [49, 9],
    glyph: "canopy"
  },
  {
    id: "flowering",
    label: "Flowering",
    group: "Annual cycle",
    definition:
      "Flower clusters emerge on shoots. Successful flowering and fertilization allow berries to begin forming.",
    assembled: [57, 28],
    exploded: [76, 11],
    glyph: "flower"
  },
  {
    id: "berry-set",
    label: "Berry set",
    group: "Annual cycle",
    definition:
      "After flowering, fertilized ovaries develop into small, firm green berries that enlarge through the season.",
    assembled: [62, 33],
    exploded: [91, 63],
    glyph: "berry-set"
  },
  {
    id: "veraison",
    label: "Véraison",
    group: "Annual cycle",
    definition:
      "Véraison marks the onset of ripening: berries soften and colored varieties begin changing from green to red or purple.",
    assembled: [66, 37],
    exploded: [76, 82],
    glyph: "veraison"
  },
  {
    id: "ripe-cluster",
    label: "Ripe cluster",
    group: "Annual cycle",
    definition:
      "As berries ripen, sugar, acids, aromas, and phenolics change until the grower chooses the harvest moment.",
    assembled: [75, 42],
    exploded: [52, 90],
    glyph: "cluster"
  }
] as const;

const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const VINE_SELECTION_STORAGE_KEY = "sipopedia:btg:vine-anatomy:selected:v1";

const triangle = (value: number, center: number, width: number) =>
  clamp(1 - Math.abs(value - center) / width);

export function vineAnatomyPartForProgress(progress: number): VineAnatomyPart {
  const studyProgress = progressBetween(progress, 0.12, 0.9);
  const index = Math.min(
    vineAnatomyParts.length - 1,
    Math.floor(studyProgress * vineAnatomyParts.length)
  );
  return vineAnatomyParts[index] ?? vineAnatomyParts[0];
}

function VinePartGlyph({ type }: { type: VineAnatomyPart["glyph"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2.6
  };

  if (type === "roots") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M32 7v16m0 0C21 28 16 37 11 55m21-32c11 5 16 14 21 32" />
        <path {...common} d="M24 28 18 47m5-12-9 5m26-12 6 19m-5-12 9 5M32 31 28 56m4-25 5 25" />
      </svg>
    );
  }

  if (type === "graft") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M25 56c4-12 2-20 7-26 5-7 3-14 6-23M39 56c-4-12-2-20-7-26-5-7-3-14-6-23" />
        <path {...common} d="m22 31 20 5M21 36l20 5" />
      </svg>
    );
  }

  if (type === "trunk") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M24 58c5-16 2-31 7-51m9 51c-5-16-2-31-7-51M18 58h28" />
        <path {...common} d="M27 19c6 4 5 9 10 13m-12 5c6 3 6 8 13 11" />
      </svg>
    );
  }

  if (type === "cordon") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M6 36c13-5 22-4 26 0 4-4 13-5 26 0M32 36V53" />
        <path {...common} d="m17 33 2-10m27 10-2-10" />
      </svg>
    );
  }

  if (type === "cane") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M12 53c10-5 13-16 20-24 7-8 12-13 21-17" />
        <circle cx="22" cy="42" r="2.4" fill="currentColor" />
        <circle cx="32" cy="29" r="2.4" fill="currentColor" />
        <circle cx="43" cy="19" r="2.4" fill="currentColor" />
      </svg>
    );
  }

  if (type === "spur") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M10 49h25c3 0 5-2 5-5V20" />
        <path {...common} d="m40 29 11-8M40 38l11 5" />
        <circle cx="51" cy="21" r="3.3" fill="currentColor" />
        <circle cx="51" cy="43" r="3.3" fill="currentColor" />
      </svg>
    );
  }

  if (type === "bud") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M12 46c13-2 21-9 25-21" />
        <path
          d="M37 25c-2-11 5-18 14-19 2 10-2 19-14 19Z"
          fill="currentColor"
          opacity=".82"
        />
        <circle cx="29" cy="33" r="4" fill="currentColor" />
      </svg>
    );
  }

  if (type === "shoot") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M29 57c4-16 4-32 8-50" />
        <path {...common} d="M33 40 18 28m17 2 14-12m-18 7L20 13" />
        <path d="M16 23c8-2 12 2 12 9-8 2-12-2-12-9Zm28-9c7-1 11 3 10 10-7 1-11-3-10-10Z" fill="currentColor" opacity=".78" />
      </svg>
    );
  }

  if (type === "tendril") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path {...common} d="M11 49c17-7 9-27 26-30 13-2 16 15 7 19-9 4-14-9-5-13 9-4 17 8 11 18" />
      </svg>
    );
  }

  if (type === "canopy") {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64">
        <path
          {...common}
          d="M32 55V18m0 18-18-13m18 8 17-16M12 18c12-8 20 0 20 13-12 4-21-1-20-13Zm40-7c-1 13-8 19-20 16 0-12 8-21 20-16Z"
        />
      </svg>
    );
  }

  const berries =
    type === "flower"
      ? ["#efd99d", "#f7edc8"]
      : type === "berry-set"
        ? ["#92ba54", "#6f963c"]
        : type === "veraison"
          ? ["#839f45", "#75537d", "#a36779"]
          : ["#50395e", "#6b4774"];

  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path {...common} d="M31 9c-2 9-1 12 4 17" />
      {[0, 1, 2, 3, 4].map((row) =>
        Array.from({ length: Math.max(1, 4 - Math.floor(row / 2)) }, (_, column) => {
          const x = 21 + column * 9 + (row % 2) * 4.5;
          const y = 25 + row * 7;
          const radius = type === "flower" ? 2.4 : type === "berry-set" ? 3.5 : 4.3;
          return (
            <circle
              cx={x}
              cy={y}
              fill={berries[(row + column) % berries.length]}
              key={`${row}-${column}`}
              r={radius}
              stroke="currentColor"
              strokeWidth=".8"
            />
          );
        })
      )}
    </svg>
  );
}

type VineAnatomyParallaxProps = {
  opacity?: number;
};

export function VineAnatomyParallax({
  opacity = 1
}: VineAnatomyParallaxProps) {
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
  const activeTimelineIndex =
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

  useEffect(() => {
    try {
      const storedPartId = window.localStorage.getItem(VINE_SELECTION_STORAGE_KEY);
      if (storedPartId && vineAnatomyParts.some((part) => part.id === storedPartId)) {
        setSelectedPartId(storedPartId);
      }
    } catch {
      // The atlas stays fully usable when local storage is unavailable.
    }
  }, []);

  const selectPart = (partId: string | null) => {
    setSelectedPartId(partId);
    try {
      if (partId) window.localStorage.setItem(VINE_SELECTION_STORAGE_KEY, partId);
      else window.localStorage.removeItem(VINE_SELECTION_STORAGE_KEY);
    } catch {
      // Selection still works for the current visit.
    }
  };

  const moveSelection = (direction: -1 | 1) => {
    const nextIndex =
      activeIndex < 0
        ? direction > 0
          ? 0
          : vineAnatomyParts.length - 1
        : (activeIndex + direction + vineAnatomyParts.length) % vineAnatomyParts.length;
    selectPart(vineAnatomyParts[nextIndex]?.id ?? null);
  };

  return (
    <div
      aria-label="A rotating, deconstructed grapevine anatomy study"
      className="btg-vine-anatomy"
      role="img"
      style={{ opacity } as CSSProperties}
    >
      <header className="btg-vine-anatomy__header">
        <span>Stop 05 · Vine anatomy</span>
        <strong>The Vine Builds a Berry</strong>
        <small>{activePart ? `Focused layer · ${activePart.label}` : "Overview · choose a node"}</small>
      </header>

      <div className="btg-vine-anatomy__canvas">
        <div aria-hidden="true" className="btg-vine-orbit">
          <picture>
            <source
              media="(max-width: 960px)"
              srcSet="/beyond-the-glass/vine-anatomy/vine-anatomy-front-960.webp"
            />
            <img
              alt=""
              className="btg-vine-orbit__frame btg-vine-orbit__frame--front"
              decoding="async"
              src="/beyond-the-glass/vine-anatomy/vine-anatomy-front-1600.webp"
              style={{ opacity: frontFrameOpacity }}
            />
          </picture>
          <picture>
            <source
              media="(max-width: 960px)"
              srcSet="/beyond-the-glass/vine-anatomy/vine-anatomy-orbit-left-960.webp"
            />
            <img
              alt=""
              className="btg-vine-orbit__frame btg-vine-orbit__frame--left"
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
              className="btg-vine-orbit__frame btg-vine-orbit__frame--right"
              decoding="async"
              src="/beyond-the-glass/vine-anatomy/vine-anatomy-orbit-right-1600.webp"
              style={{ opacity: rightFrameOpacity }}
            />
          </picture>
        </div>

        <div className="btg-vine-anatomy__parts">
          {vineAnatomyParts.map((part, index) => {
          const amount = 1;
          const turn = orbitProgress * Math.PI * 2 + index * 0.68;
          const depth = Math.sin(turn) * 68 * amount;
          const rotation = Math.cos(turn) * 16 * amount;
          const isActive = index === activeIndex;
          const isNeighbor = Math.abs(index - activeIndex) === 1;
          const x = isActive ? 50 : lerp(part.assembled[0], part.exploded[0], amount);
          const y = isActive ? 51 : lerp(part.assembled[1], part.exploded[1], amount);
          const style = {
            "--btg-part-depth": `${isActive ? 82 : depth}px`,
            "--btg-part-label-opacity": `${isActive ? 1 : 0}`,
            "--btg-part-rotation": `${rotation}deg`,
            "--btg-part-scale": `${isActive ? 1.22 : 0.78}`,
            "--btg-part-x": `${x}%`,
            opacity: activeIndex < 0 ? 0.9 : isActive ? 1 : isNeighbor ? 0.72 : 0.42,
            "--btg-part-y": `${y}%`
          } as CSSProperties;

          return (
            <button
              aria-label={`Focus ${part.label}: ${part.definition}`}
              aria-pressed={isActive}
              className={`btg-vine-part${isActive ? " is-active" : ""}${isNeighbor ? " is-neighbor" : ""}`}
              data-group={part.group}
              data-part={part.id}
              data-side={x >= 56 ? "east" : "west"}
              key={part.id}
              onClick={() => selectPart(part.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectPart(part.id);
                }
              }}
              style={style}
              type="button"
            >
              <span className="btg-vine-part__glyph">
                <VinePartGlyph type={part.glyph} />
              </span>
              <span className="btg-vine-part__label">
                <strong>{part.label}</strong>
                <small>{part.group}</small>
              </span>
            </button>
          );
          })}
        </div>
      </div>

      <aside aria-live="polite" className="btg-vine-anatomy__detail">
        <div className="btg-vine-anatomy__timeline" aria-label="Vine study groups">
          {["Root", "Permanent wood", "One-year wood", "Green growth", "Berry"].map(
            (label, index) => (
              <span className={index === activeTimelineIndex ? "is-active" : ""} key={label}>
                {label}
              </span>
            )
          )}
        </div>
        <div className="btg-vine-anatomy__field-note">
          <span>{activePart?.group ?? "Complete vine"}</span>
          <strong>{activePart?.label ?? "Choose any glowing anatomy node"}</strong>
          <p>
            {activePart?.definition ??
              "Explore rootstock, permanent wood, fruiting wood, green growth, and berry development at your own pace."}
          </p>
        </div>
        <nav aria-label="Vine anatomy node controls">
          <button aria-label="Focus the previous vine anatomy node" onClick={() => moveSelection(-1)} type="button">
            ← <span>Previous</span>
          </button>
          <button onClick={() => selectPart(null)} type="button">
            Overview
          </button>
          <button aria-label="Focus the next vine anatomy node" onClick={() => moveSelection(1)} type="button">
            <span>Next</span> →
          </button>
        </nav>
      </aside>
    </div>
  );
}

export function VineAnatomyReadout({ progress }: { progress: number }) {
  const part = vineAnatomyPartForProgress(progress);
  const index = vineAnatomyParts.findIndex((item) => item.id === part.id);

  return (
    <aside aria-live="polite" className="btg-vine-readout">
      <div>
        <span>
          Layer {index + 1} of {vineAnatomyParts.length}
        </span>
        <small>{part.group}</small>
      </div>
      <strong>{part.label}</strong>
      <p>{part.definition}</p>
    </aside>
  );
}

export function VineAnatomyStudyList() {
  return (
    <section aria-label="Complete vine anatomy study list" className="btg-vine-study-list">
      <h2>Vine anatomy · complete study plate</h2>
      <div>
        {vineAnatomyParts.map((part) => (
          <article key={part.id}>
            <span className="btg-vine-part__glyph">
              <VinePartGlyph type={part.glyph} />
            </span>
            <div>
              <small>{part.group}</small>
              <strong>{part.label}</strong>
              <p>{part.definition}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
