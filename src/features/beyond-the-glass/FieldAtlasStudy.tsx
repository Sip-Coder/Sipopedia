import type { CSSProperties } from "react";
import type { BeyondTheGlassScene } from "../../data/beyondTheGlassChapters";

type AtlasPoint = readonly [number, number];

type AtlasSceneDesign = {
  graphics?: readonly (string | null)[];
  labels: readonly string[];
  phase:
    | "guides"
    | "vineyard"
    | "production"
    | "cellar"
    | "commerce"
    | "service";
  focus: readonly AtlasPoint[];
};

const ATLAS_SCENE_DESIGNS: Record<string, AtlasSceneDesign> = {
  "guides-at-sunrise": {
    graphics: [
      "/beyond-the-glass/guides/animated/sippy-still.png",
      "/beyond-the-glass/guides/animated/roma-still.png",
      "/beyond-the-glass/guides/animated/hummin-still.png"
    ],
    labels: ["Sippy", "Roma", "Hummin"],
    phase: "guides",
    focus: [[30, 52], [49, 52], [68, 54]]
  },
  "two-regions": {
    labels: ["Coastal site", "Inland site", "Winery map"],
    phase: "vineyard",
    focus: [[24, 44], [77, 42], [51, 62]]
  },
  "rain-and-roots": {
    graphics: [
      "/beyond-the-glass/wine-rain-roots-960.webp",
      "/beyond-the-glass/wine-rain-roots-960.webp",
      null,
      null,
      "/beyond-the-glass/curriculum/viticulture-living-vineyard-960.webp"
    ],
    labels: ["Irrigation", "Root line", "Soil", "Rootstock", "Water stress"],
    phase: "vineyard",
    focus: [[50, 20], [49, 76], [25, 76], [74, 75], [88, 45]]
  },
  harvest: {
    graphics: [null, null, null, "/beyond-the-glass/nodes/harvest-mechanical.webp", null],
    labels: ["Timing", "Fruit care", "Hand pick", "Machine pick", "Field cooling"],
    phase: "vineyard",
    focus: [[47, 45], [64, 58], [76, 62], [28, 55], [87, 42]]
  },
  "crush-house": {
    labels: ["Destem", "Skin contact", "Sort", "Press", "Move must"],
    phase: "production",
    focus: [[52, 42], [66, 57], [22, 53], [76, 48], [48, 73]]
  },
  fermentation: {
    graphics: ["/beyond-the-glass/nodes/fermentation-conversion.webp", null, null, null, null],
    labels: ["Yeast", "Cap work", "Stainless", "Open-top", "Conversion"],
    phase: "production",
    focus: [[50, 66], [24, 48], [77, 39], [36, 40], [67, 63]]
  },
  "wine-crossroads": {
    labels: ["Still", "Sparkling", "Fortified"],
    phase: "production",
    focus: [[24, 47], [51, 42], [78, 48]]
  },
  laboratory: {
    graphics: [
      null,
      "/beyond-the-glass/curriculum/wine-chemistry-glass-960.webp",
      "/beyond-the-glass/curriculum/wine-chemistry-glass-960.webp",
      null,
      "/beyond-the-glass/curriculum/wine-fault-detective-960.webp"
    ],
    labels: ["Sample", "SO₂ + acid", "pH + TA", "Density", "Oxygen"],
    phase: "production",
    focus: [[35, 53], [63, 58], [77, 48], [50, 35], [20, 45]]
  },
  "barrel-aging": {
    graphics: [null, "/beyond-the-glass/nodes/cellar-environment.webp", null, null, null],
    labels: ["Oak", "Cellar", "Compare", "Barrel anatomy", "Other vessels"],
    phase: "cellar",
    focus: [[24, 52], [50, 40], [50, 68], [77, 45], [85, 65]]
  },
  "barrel-workbench": {
    labels: ["Sample", "Top + rack", "Clean", "Lees", "Sediment"],
    phase: "cellar",
    focus: [[40, 54], [66, 54], [20, 58], [78, 36], [53, 76]]
  },
  "finishing-bench": {
    labels: ["Blend", "Stabilize", "Filter"],
    phase: "production",
    focus: [[24, 52], [51, 48], [78, 52]]
  },
  "sustainability-loop": {
    labels: ["Measure", "Circular use"],
    phase: "production",
    focus: [[35, 48], [67, 50]]
  },
  bottling: {
    graphics: [null, null, "/beyond-the-glass/nodes/closure-headspace.webp", null, null],
    labels: ["Line", "Clean", "Closure", "Headspace", "Traceability"],
    phase: "production",
    focus: [[30, 50], [16, 58], [57, 47], [70, 48], [84, 58]]
  },
  "bottle-passport": {
    labels: ["Identity", "Permission", "Map key"],
    phase: "commerce",
    focus: [[50, 46], [25, 62], [76, 62]]
  },
  "tasting-flight": {
    labels: ["Flight order", "Sensory method", "Compare"],
    phase: "service",
    focus: [[28, 60], [51, 57], [75, 60]]
  },
  "warehouse-logistics": {
    graphics: [null, "/beyond-the-glass/nodes/transport-heat-light.webp", null, null, null],
    labels: ["Identity", "Heat + light", "Chain of care", "Rotation", "Peak heat"],
    phase: "commerce",
    focus: [[25, 52], [75, 35], [53, 57], [35, 70], [82, 68]]
  },
  market: {
    labels: ["Placement", "Condition", "Occasion", "Promise", "Feedback"],
    phase: "commerce",
    focus: [[25, 45], [74, 42], [52, 62], [36, 68], [78, 68]]
  },
  "restaurant-buying": {
    labels: ["Fit", "By the glass", "Train", "Store", "Price"],
    phase: "commerce",
    focus: [[30, 45], [71, 46], [48, 62], [82, 35], [21, 68]]
  },
  restaurant: {
    graphics: [
      null,
      "/beyond-the-glass/curriculum/wine-fault-detective-960.webp",
      "/beyond-the-glass/winery-tour/tasting-flight-960.webp",
      null,
      null
    ],
    labels: ["Final meter", "TCA", "Responsibility", "Present", "Glassware"],
    phase: "service",
    focus: [[50, 63], [24, 47], [76, 48], [37, 70], [67, 70]]
  },
  "first-sip": {
    labels: ["Living map"],
    phase: "service",
    focus: [[51, 62]]
  }
};

const NODE_LAYOUTS: Record<number, readonly AtlasPoint[]> = {
  1: [[50, 52]],
  2: [[31, 36], [69, 36]],
  3: [[22, 34], [50, 22], [78, 34]],
  4: [[20, 32], [42, 20], [64, 20], [82, 36]],
  5: [[18, 31], [36, 18], [58, 18], [82, 31], [50, 68]]
};

const PHONE_NODE_LAYOUTS: Record<number, readonly AtlasPoint[]> = {
  1: [[50, 52]],
  2: [[30, 34], [70, 34]],
  3: [[20, 36], [50, 20], [80, 36]],
  4: [[20, 28], [50, 18], [80, 28], [50, 72]],
  5: [[18, 30], [50, 18], [82, 30], [31, 72], [69, 72]]
};

const fallbackDesign = (scene: BeyondTheGlassScene): AtlasSceneDesign => ({
  labels: scene.fieldNotes.map((note) => note.eyebrow),
  phase: "production",
  focus: NODE_LAYOUTS[Math.min(5, Math.max(1, scene.fieldNotes.length))] ?? NODE_LAYOUTS[1]
});

type FieldAtlasStudyProps = {
  artTransform: string;
  onMove: (direction: -1 | 1) => void;
  onOpenLab?: () => void;
  onSelect: (index: number | null) => void;
  scene: BeyondTheGlassScene;
  selectedIndex: number | null;
};

export function FieldAtlasStudy({
  artTransform,
  onMove,
  onOpenLab,
  onSelect,
  scene,
  selectedIndex
}: FieldAtlasStudyProps) {
  const design = ATLAS_SCENE_DESIGNS[scene.id] ?? fallbackDesign(scene);
  const count = Math.min(5, Math.max(1, scene.fieldNotes.length));
  const layout = NODE_LAYOUTS[count] ?? NODE_LAYOUTS[1];
  const phoneLayout = PHONE_NODE_LAYOUTS[count] ?? PHONE_NODE_LAYOUTS[1];
  const activeNote = selectedIndex === null ? null : (scene.fieldNotes[selectedIndex] ?? null);
  const activeFocus =
    selectedIndex === null
      ? null
      : (design.focus[selectedIndex] ?? layout[selectedIndex] ?? [50, 50]);
  const sceneImage = scene.artwork.srcSet?.split(",")[0]?.trim().split(" ")[0] ?? scene.artwork.src;

  return (
    <section
      aria-label={`${scene.title} interactive field atlas`}
      className="btg-field-atlas"
      data-phase={design.phase}
    >
      <div className="btg-field-atlas__canvas">
        <picture className="btg-field-atlas__picture">
          {scene.artwork.portraitSrc || scene.artwork.portraitSrcSet ? (
            <source
              media="(max-width: 640px) and (orientation: portrait)"
              srcSet={scene.artwork.portraitSrcSet ?? scene.artwork.portraitSrc}
            />
          ) : null}
          <img
            alt={scene.artwork.alt}
            decoding="async"
            src={scene.artwork.src}
            srcSet={scene.artwork.srcSet}
            style={{
              objectFit: scene.artwork.fit ?? "cover",
              objectPosition: scene.artwork.position ?? "center",
              transform: `${artTransform}${activeFocus ? " scale(1.035)" : ""}`,
              transformOrigin: activeFocus ? `${activeFocus[0]}% ${activeFocus[1]}%` : "50% 50%"
            }}
          />
        </picture>

        <div className="btg-field-atlas__nodes">
          {scene.fieldNotes.map((note, index) => {
            const position = layout[index] ?? layout[layout.length - 1] ?? [50, 50];
            const mobilePosition =
              phoneLayout[index] ?? phoneLayout[phoneLayout.length - 1] ?? position;
            const focus = design.focus[index] ?? position;
            const isActive = selectedIndex === index;
            const customGraphic = design.graphics?.[index] ?? null;
            const style = {
              "--btg-atlas-focus-x": `${focus[0]}%`,
              "--btg-atlas-focus-y": `${focus[1]}%`,
              "--btg-atlas-node-image": `url(${customGraphic ?? sceneImage})`,
              "--btg-atlas-node-position": customGraphic
                ? "center"
                : `${focus[0]}% ${focus[1]}%`,
              "--btg-atlas-node-size": customGraphic ? "contain" : "230%",
              "--btg-atlas-node-x": `${position[0]}%`,
              "--btg-atlas-node-y": `${position[1]}%`,
              "--btg-atlas-phone-x": `${mobilePosition[0]}%`,
              "--btg-atlas-phone-y": `${mobilePosition[1]}%`
            } as CSSProperties;

            return (
              <button
                aria-label={`Focus ${note.title}`}
                aria-pressed={isActive}
                className={isActive ? "is-active" : ""}
                key={`${scene.id}-${note.title}`}
                onClick={() => onSelect(index)}
                style={style}
                type="button"
              >
                <span aria-hidden="true" className="btg-field-atlas__lens" />
                <span className="sr-only">{design.labels[index] ?? note.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div aria-label={`${scene.title} study layers`} className="btg-field-atlas__rail">
        {scene.fieldNotes.map((note, index) => (
          <button
            aria-pressed={selectedIndex === index}
            key={`${scene.id}-rail-${note.title}`}
            onClick={() => onSelect(index)}
            type="button"
          >
            {design.labels[index] ?? note.eyebrow}
          </button>
        ))}
      </div>

      <aside aria-live="polite" className="btg-field-atlas__detail">
        <div className="btg-field-atlas__field-note">
          <span>{activeNote?.eyebrow ?? `${scene.fieldNotes.length} visual nodes`}</span>
          <strong>{activeNote?.title ?? scene.title}</strong>
          <p>{activeNote?.detail ?? scene.summary}</p>
        </div>
        <nav aria-label={`${scene.title} node controls`}>
          <button aria-label={`Focus the previous ${scene.title} node`} onClick={() => onMove(-1)} type="button">
            <span aria-hidden="true">←</span>
            <span className="btg-desktop-label">Previous</span>
          </button>
          <button onClick={() => onSelect(null)} type="button">
            Overview
          </button>
          <button aria-label={`Focus the next ${scene.title} node`} onClick={() => onMove(1)} type="button">
            <span className="btg-desktop-label">Next</span>
            <span aria-hidden="true">→</span>
          </button>
          {onOpenLab ? (
            <button className="btg-field-atlas__lab" onClick={onOpenLab} type="button">
              Deep dive
            </button>
          ) : null}
        </nav>
      </aside>
    </section>
  );
}
