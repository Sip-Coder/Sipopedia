import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import type { BeyondTheGlassScene } from "../../data/beyondTheGlassChapters";
import {
  ATLAS_SCENE_DESIGNS,
  GENERIC_ATLAS_ICONS,
  semanticAtlasIcon,
  semanticAtlasPhase,
  type AtlasPoint,
  type AtlasSceneDesign
} from "./fieldAtlasDesigns";

const NODE_LAYOUTS: Record<number, readonly AtlasPoint[]> = {
  1: [[50, 52]],
  2: [[31, 36], [69, 36]],
  3: [[22, 34], [50, 22], [78, 34]],
  4: [[20, 32], [42, 20], [64, 20], [82, 36]],
  5: [[18, 31], [36, 18], [64, 18], [82, 31], [50, 72]],
  6: [[16, 28], [50, 17], [84, 28], [16, 72], [50, 83], [84, 72]],
  7: [[14, 27], [50, 15], [86, 27], [86, 70], [50, 84], [14, 70], [50, 49]],
  8: [[14, 25], [38, 15], [62, 15], [86, 25], [86, 73], [62, 84], [38, 84], [14, 73]],
  9: [[14, 24], [38, 14], [62, 14], [86, 24], [86, 72], [62, 84], [38, 84], [14, 72], [50, 49]]
};

/*
 * The commissioned atlas points remain tied to their pictured subject on
 * larger canvases. Phones need a deliberately wider perimeter so five
 * 44-pixel lesson medallions cannot collide while the whole 16:9 plate stays
 * visible. These coordinates change placement only; every scene keeps its
 * authored graphic, label, and teaching relationship.
 */
const PHONE_NODE_LAYOUTS: Record<number, readonly AtlasPoint[]> = {
  1: [[50, 50]],
  2: [[28, 34], [72, 34]],
  3: [[20, 34], [50, 20], [80, 34]],
  4: [[20, 28], [80, 28], [28, 74], [72, 74]],
  5: [[14, 27], [50, 17], [86, 27], [27, 76], [73, 76]],
  6: [[13, 24], [50, 15], [87, 24], [13, 76], [50, 85], [87, 76]],
  7: [[12, 23], [50, 14], [88, 23], [88, 73], [50, 86], [12, 73], [50, 50]],
  8: [[12, 22], [37, 13], [63, 13], [88, 22], [88, 75], [63, 87], [37, 87], [12, 75]],
  9: [[12, 21], [37, 12], [63, 12], [88, 21], [88, 74], [63, 88], [37, 88], [12, 74], [50, 50]]
};

const fallbackDesign = (scene: BeyondTheGlassScene): AtlasSceneDesign => ({
  phase: semanticAtlasPhase(scene.id),
  nodes: scene.fieldNotes.map((note, index) => ({
    art: "icon",
    focus:
      NODE_LAYOUTS[Math.min(9, Math.max(1, scene.fieldNotes.length))]?.[index] ?? [50, 50],
    icon: semanticAtlasIcon(note),
    label: note.eyebrow
  }))
});

type FieldAtlasStudyProps = {
  onOpenLab?: () => void;
  onSelect: (index: number | null) => void;
  scene: BeyondTheGlassScene;
  selectedIndex: number | null;
};

export function FieldAtlasStudy({
  onOpenLab,
  onSelect,
  scene,
  selectedIndex
}: FieldAtlasStudyProps) {
  const nodeButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const design = ATLAS_SCENE_DESIGNS[scene.id] ?? fallbackDesign(scene);
  const count = Math.min(9, Math.max(1, scene.fieldNotes.length));
  const layout = NODE_LAYOUTS[count] ?? NODE_LAYOUTS[1];
  const activeNote = selectedIndex === null ? null : (scene.fieldNotes[selectedIndex] ?? null);
  const activeFocus =
    selectedIndex === null
      ? null
      : (design.nodes[selectedIndex]?.focus ?? layout[selectedIndex] ?? [50, 50]);
  const sceneImage = scene.artwork.srcSet?.split(",")[0]?.trim().split(" ")[0] ?? scene.artwork.src;
  const detailId = `${scene.id}-atlas-detail`;
  const artworkFit = scene.artwork.fit ?? "cover";
  const artworkPosition = scene.artwork.position ?? "center";
  const portraitFit = scene.artwork.portraitFit ?? artworkFit;
  const portraitPosition = scene.artwork.portraitPosition ?? artworkPosition;
  const artboardStyle = {
    "--btg-atlas-aspect": scene.artwork.aspectRatio ?? "16 / 9",
    "--btg-atlas-fit": artworkFit,
    "--btg-atlas-position": artworkPosition,
    "--btg-atlas-portrait-aspect":
      scene.artwork.portraitAspectRatio ?? scene.artwork.aspectRatio ?? "16 / 9",
    "--btg-atlas-portrait-fit": portraitFit,
    "--btg-atlas-portrait-position": portraitPosition,
    "--btg-atlas-active-focus-x": `${activeFocus?.[0] ?? 50}%`,
    "--btg-atlas-active-focus-y": `${activeFocus?.[1] ?? 50}%`,
    "--btg-atlas-origin": activeFocus ? `${activeFocus[0]}% ${activeFocus[1]}%` : "50% 50%"
  } as CSSProperties;
  const selectAndFocus = (index: number) => {
    const safeIndex = (index + scene.fieldNotes.length) % scene.fieldNotes.length;
    onSelect(safeIndex);
    window.requestAnimationFrame(() => nodeButtonRefs.current[safeIndex]?.focus());
  };

  const handleNodeKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
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
      selectAndFocus(scene.fieldNotes.length - 1);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      onSelect(null);
    }
  };

  return (
    <section
      aria-label={`${scene.title} interactive field atlas`}
      className="btg-field-atlas"
      data-phase={design.phase}
      style={{ ...artboardStyle, "--btg-atlas-count": count } as CSSProperties}
    >
      <div className="btg-field-atlas__canvas">
        <div className="btg-field-atlas__world">
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
            />
          </picture>

          <div className="btg-field-atlas__nodes">
            {scene.fieldNotes.map((note, index) => {
              const nodeDesign = design.nodes[index];
              const position =
                nodeDesign?.focus ?? layout[index] ?? layout[layout.length - 1] ?? [50, 50];
              const focus = nodeDesign?.focus ?? position;
              const phonePosition =
                nodeDesign?.phoneFocus ?? PHONE_NODE_LAYOUTS[count]?.[index] ?? position;
              const isActive = selectedIndex === index;
              const customGraphic = nodeDesign?.graphic ?? null;
              const NodeIcon = nodeDesign?.icon ?? GENERIC_ATLAS_ICONS.production;
              const artKind = nodeDesign?.art ?? "icon";
              const style = {
                "--btg-atlas-focus-x": `${focus[0]}%`,
                "--btg-atlas-focus-y": `${focus[1]}%`,
                "--btg-atlas-node-image": `url(${customGraphic ?? sceneImage})`,
                "--btg-atlas-node-position": customGraphic
                  ? "center"
                  : `${focus[0]}% ${focus[1]}%`,
                "--btg-atlas-node-size": customGraphic ? "contain" : "260%",
                "--btg-atlas-node-x": `${position[0]}%`,
                "--btg-atlas-node-y": `${position[1]}%`,
                "--btg-atlas-phone-x": `${phonePosition[0]}%`,
                "--btg-atlas-phone-y": `${phonePosition[1]}%`
              } as CSSProperties;

              return (
                <button
                  aria-label={`Focus ${note.title}`}
                  aria-pressed={isActive}
                  aria-controls={detailId}
                  className={isActive ? "is-active" : ""}
                  data-art={artKind}
                  key={`${scene.id}-${note.title}`}
                  onClick={() => onSelect(index)}
                  onKeyDown={(event) => handleNodeKeyDown(event, index)}
                  ref={(node) => {
                    nodeButtonRefs.current[index] = node;
                  }}
                  style={style}
                  tabIndex={selectedIndex === null ? (index === 0 ? 0 : -1) : isActive ? 0 : -1}
                  type="button"
                >
                  <span aria-hidden="true" className="btg-field-atlas__lens">
                    {artKind === "icon" ? (
                      <NodeIcon className="btg-field-atlas__symbol" weight="duotone" />
                    ) : artKind === "crop" ? (
                      <NodeIcon className="btg-field-atlas__crop-symbol" weight="bold" />
                    ) : null}
                  </span>
                  <span className="sr-only">{nodeDesign?.label ?? note.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div aria-label={`${scene.title} study layers`} className="btg-field-atlas__rail">
        {scene.fieldNotes.map((note, index) => (
          <button
            aria-pressed={selectedIndex === index}
            aria-controls={detailId}
            key={`${scene.id}-rail-${note.title}`}
            onClick={() => selectAndFocus(index)}
            tabIndex={0}
            type="button"
          >
            {design.nodes[index]?.label ?? note.eyebrow}
          </button>
        ))}
      </div>

      <aside aria-live="polite" className="btg-field-atlas__detail" id={detailId}>
        <div className="btg-field-atlas__field-note">
          <span>{activeNote?.eyebrow ?? `${scene.fieldNotes.length} visual nodes`}</span>
          <strong>{activeNote?.title ?? scene.title}</strong>
          <p>{activeNote?.detail ?? scene.summary}</p>
        </div>
        <nav aria-label={`${scene.title} node controls`}>
          <button
            aria-label={`Focus the previous ${scene.title} node`}
            onClick={() =>
              selectedIndex === null ? selectAndFocus(scene.fieldNotes.length - 1) : selectAndFocus(selectedIndex - 1)
            }
            type="button"
          >
            <span aria-hidden="true">←</span>
            <span className="btg-desktop-label">Previous</span>
          </button>
          <button onClick={() => onSelect(null)} type="button">
            Overview
          </button>
          <button
            aria-label={`Focus the next ${scene.title} node`}
            onClick={() => (selectedIndex === null ? selectAndFocus(0) : selectAndFocus(selectedIndex + 1))}
            type="button"
          >
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
