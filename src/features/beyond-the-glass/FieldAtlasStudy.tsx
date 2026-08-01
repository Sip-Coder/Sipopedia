import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import type { BeyondTheGlassScene } from "../../data/beyondTheGlassChapters";
import {
  ATLAS_SCENE_DESIGNS,
  GENERIC_ATLAS_ICONS,
  type AtlasPoint,
  type AtlasSceneDesign
} from "./fieldAtlasDesigns";

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
  phase: "production",
  nodes: scene.fieldNotes.map((note, index) => ({
    art: "icon",
    focus:
      NODE_LAYOUTS[Math.min(5, Math.max(1, scene.fieldNotes.length))]?.[index] ?? [50, 50],
    icon: GENERIC_ATLAS_ICONS.production,
    label: note.eyebrow
  }))
});

type FieldAtlasStudyProps = {
  artTransform: string;
  onOpenLab?: () => void;
  onSelect: (index: number | null) => void;
  scene: BeyondTheGlassScene;
  selectedIndex: number | null;
};

export function FieldAtlasStudy({
  artTransform,
  onOpenLab,
  onSelect,
  scene,
  selectedIndex
}: FieldAtlasStudyProps) {
  const nodeButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const design = ATLAS_SCENE_DESIGNS[scene.id] ?? fallbackDesign(scene);
  const count = Math.min(5, Math.max(1, scene.fieldNotes.length));
  const layout = NODE_LAYOUTS[count] ?? NODE_LAYOUTS[1];
  const phoneLayout = PHONE_NODE_LAYOUTS[count] ?? PHONE_NODE_LAYOUTS[1];
  const activeNote = selectedIndex === null ? null : (scene.fieldNotes[selectedIndex] ?? null);
  const activeFocus =
    selectedIndex === null
      ? null
      : (design.nodes[selectedIndex]?.focus ?? layout[selectedIndex] ?? [50, 50]);
  const sceneImage = scene.artwork.srcSet?.split(",")[0]?.trim().split(" ")[0] ?? scene.artwork.src;
  const detailId = `${scene.id}-atlas-detail`;

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
      style={{ "--btg-atlas-count": count } as CSSProperties}
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
              transform: `${artTransform}${activeFocus ? " scale(1.075)" : ""}`,
              transformOrigin: activeFocus ? `${activeFocus[0]}% ${activeFocus[1]}%` : "50% 50%"
            }}
          />
        </picture>

        <div className="btg-field-atlas__nodes">
          {scene.fieldNotes.map((note, index) => {
            const nodeDesign = design.nodes[index];
            const position =
              nodeDesign?.focus ?? layout[index] ?? layout[layout.length - 1] ?? [50, 50];
            const mobilePosition =
              phoneLayout[index] ?? phoneLayout[phoneLayout.length - 1] ?? position;
            const focus = nodeDesign?.focus ?? position;
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
              "--btg-atlas-phone-x": `${mobilePosition[0]}%`,
              "--btg-atlas-phone-y": `${mobilePosition[1]}%`
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

      <div aria-label={`${scene.title} study layers`} className="btg-field-atlas__rail">
        {scene.fieldNotes.map((note, index) => (
          <button
            aria-pressed={selectedIndex === index}
            aria-controls={detailId}
            key={`${scene.id}-rail-${note.title}`}
            onClick={() => onSelect(index)}
            tabIndex={-1}
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
