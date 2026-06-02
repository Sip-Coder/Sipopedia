import { type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { getSipAvatarSprite, getSipAvatarStudioLayers, type SipAvatarDesign } from "../lib/sipAvatar";

type AvatarStyle = CSSProperties & {
  "--avatar-rotation": string;
  "--avatar-hair-color"?: string;
  "--avatar-hair-mask"?: string;
  "--avatar-skin"?: string;
  "--avatar-jacket"?: string;
  "--avatar-accent"?: string;
};

type ViewerStyle = CSSProperties & {
  "--avatar-skin": string;
  "--avatar-jacket": string;
  "--avatar-accent": string;
};

type SipAvatarFigureProps = {
  design: SipAvatarDesign;
  rotation?: number;
  size?: "small" | "large";
};

type SipAvatarViewerProps = SipAvatarFigureProps & {
  label: string;
  onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: ReactPointerEvent<HTMLDivElement>) => void;
};

export function SipAvatarFigure({ design, rotation = 0, size = "large" }: SipAvatarFigureProps) {
  const sprite = getSipAvatarSprite(design);
  const studioLayers = getSipAvatarStudioLayers(design);
  const style: AvatarStyle = {
    "--avatar-rotation": `${rotation * 0.25}deg`,
    "--avatar-hair-color": design.hair,
    "--avatar-hair-mask": studioLayers ? `url(${studioLayers.hairMaskSrc})` : undefined,
    "--avatar-skin": design.skin,
    "--avatar-jacket": design.jacket,
    "--avatar-accent": design.accent
  };

  return (
    <div
      className={`sip-avatar-figure sip-avatar-figure-${size} archetype-${design.archetype} build-${design.build} stance-${design.stance} expression-${design.expression} accessory-${design.accessory} companion-${design.companion} finish-${design.finish}`}
      style={style}
      aria-label={`${design.name} Sip Studies avatar`}
    >
      <div className="sip-avatar-shadow" />
      <div className="sip-avatar-rotator">
        {studioLayers ? (
          <div className="sip-avatar-layer-stack">
            <img className="sip-avatar-sprite-image sip-avatar-layer-image" src={studioLayers.baseSrc} alt="" draggable={false} />
            <span className="sip-avatar-hair-layer" aria-hidden="true" />
            <img className="sip-avatar-layer-image sip-avatar-hair-outline-layer" src={studioLayers.hairOutlineSrc} alt="" draggable={false} />
            {studioLayers.featureSrc ? <img className="sip-avatar-layer-image sip-avatar-feature-layer" src={studioLayers.featureSrc} alt="" draggable={false} /> : null}
          </div>
        ) : (
          <img className="sip-avatar-sprite-image" src={sprite.src} alt="" draggable={false} />
        )}
      </div>
    </div>
  );
}

export function SipAvatarViewer({
  design,
  rotation = 0,
  size = "large",
  label,
  onPointerDown,
  onPointerMove,
  onPointerUp
}: SipAvatarViewerProps) {
  const sprite = getSipAvatarSprite(design);
  const style: ViewerStyle = {
    "--avatar-skin": design.skin,
    "--avatar-jacket": design.jacket,
    "--avatar-accent": design.accent
  };

  return (
    <div
      className={`sip-avatar-viewer avatar-backdrop-${design.backdrop} avatar-category-${design.beverageCategory}`}
      role="img"
      aria-label={label}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="sip-avatar-stage-halo" aria-hidden="true" />
      <div className="sip-avatar-grid-floor" aria-hidden="true" />
      <SipAvatarFigure design={design} rotation={rotation} size={size} />
      <div className="sip-avatar-tool-ring" aria-hidden="true">
        <span>{design.companion}</span>
        <span>{design.loadout}</span>
      </div>
      <div className="sip-avatar-stage-caption" aria-hidden="true">
        <strong>{design.name}</strong>
        <span>{design.title || sprite.detail}</span>
      </div>
    </div>
  );
}
