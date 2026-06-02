import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useAuth } from "../context/AuthContext";
import { SipAvatarViewer } from "./SipAvatar";
import {
  avatarAccessories,
  avatarAccentSwatches,
  avatarArchetypes,
  avatarBeverageCategories,
  avatarBuilds,
  avatarCompanions,
  avatarExpressions,
  avatarFinishes,
  avatarHairStyles,
  avatarHairSwatches,
  avatarJacketSwatches,
  avatarLoadouts,
  avatarMasteryTiers,
  avatarPresentationOptions,
  avatarProfessions,
  avatarPronounOptions,
  avatarSensoryTraits,
  avatarSpecializations,
  avatarSkinSwatches,
  avatarSpriteFamilies,
  avatarSpriteOptions,
  avatarStageBackdrops,
  avatarStances,
  avatarWorkContexts,
  getAvatarBeverageCategory,
  getAvatarLoadout,
  getAvatarMasteryTier,
  getAvatarProfession,
  getAvatarPronounLabel,
  getAvatarSecondaryBeverageCategory,
  getAvatarSpecialization,
  getAvatarSpritesForFamily,
  getAvatarStageBackdrop,
  getAvatarSpecializationsForCategory,
  getAvatarWorkContext,
  getCategoryDefaults,
  getLoadoutDefaults,
  getProfessionDefaults,
  getSipAvatarSprite,
  getSpecializationDefaults,
  getStudioDefaultsForSprite,
  randomSipAvatarDesign,
  readSipAvatar,
  saveSipAvatar,
  type AvatarAccessory,
  type AvatarArchetype,
  type AvatarBeverageCategory,
  type AvatarBuild,
  type AvatarCompanion,
  type AvatarExpression,
  type AvatarFinish,
  type AvatarHairStyle,
  type AvatarLoadout,
  type AvatarMasteryTier,
  type AvatarPresentation,
  type AvatarPronouns,
  type AvatarSensoryTrait,
  type AvatarSpecialization,
  type AvatarSpriteFamily,
  type AvatarSpriteId,
  type AvatarStageBackdrop,
  type AvatarStance,
  type AvatarWorkContext,
  type SipAvatarDesign
} from "../lib/sipAvatar";

type AvatarCreatorProps = {
  onNavigate: (route: string) => void;
};

type AvatarPanelId = "identity" | "profession" | "body" | "hair" | "wardrobe" | "gear" | "sensory" | "profile";

const avatarPanels: Array<{ id: AvatarPanelId; label: string; detail: string }> = [
  { id: "identity", label: "Identity", detail: "Name, pronouns, and category" },
  { id: "profession", label: "Career", detail: "Role, context, and mastery" },
  { id: "body", label: "Build", detail: "Base, sprite, stance" },
  { id: "hair", label: "Features", detail: "Hair, skin, expression" },
  { id: "wardrobe", label: "Wardrobe", detail: "Palette, finish, backdrop" },
  { id: "gear", label: "Gear", detail: "Tools and role silhouette" },
  { id: "sensory", label: "Sensory", detail: "Flavor signature" },
  { id: "profile", label: "Review", detail: "Dashboard card" }
];

type SensoryField = keyof Pick<
  SipAvatarDesign,
  "sensoryAcidity" | "sensorySweetness" | "sensoryBitterness" | "sensoryBody" | "sensoryAroma" | "sensoryTexture"
>;

const sensoryFieldMap: Record<AvatarSensoryTrait, SensoryField> = {
  acidity: "sensoryAcidity",
  sweetness: "sensorySweetness",
  bitterness: "sensoryBitterness",
  body: "sensoryBody",
  aroma: "sensoryAroma",
  texture: "sensoryTexture"
};

function getSafeSpriteId(value: SipAvatarDesign["spriteId"] | undefined, fallback: SipAvatarDesign["spriteId"]): SipAvatarDesign["spriteId"] {
  return value ?? fallback;
}

export function AvatarCreator({ onNavigate }: AvatarCreatorProps) {
  const { user } = useAuth();
  const ownerId = user?.id ?? user?.email ?? "guest";
  const [design, setDesign] = useState<SipAvatarDesign>(() => readSipAvatar(ownerId));
  const [activePanel, setActivePanel] = useState<AvatarPanelId>("identity");
  const selectedSprite = useMemo(() => getSipAvatarSprite(design), [design]);
  const selectedCategory = useMemo(() => getAvatarBeverageCategory(design), [design]);
  const selectedSecondaryCategory = useMemo(() => getAvatarSecondaryBeverageCategory(design), [design]);
  const selectedProfession = useMemo(() => getAvatarProfession(design), [design]);
  const selectedLoadout = useMemo(() => getAvatarLoadout(design), [design]);
  const selectedBackdrop = useMemo(() => getAvatarStageBackdrop(design), [design]);
  const selectedWorkContext = useMemo(() => getAvatarWorkContext(design), [design]);
  const selectedMasteryTier = useMemo(() => getAvatarMasteryTier(design), [design]);
  const selectedSpecialization = useMemo(() => getAvatarSpecialization(design), [design]);
  const selectedPresentation = useMemo(() => avatarPresentationOptions.find((option) => option.id === design.presentation) ?? avatarPresentationOptions[0], [design.presentation]);
  const pronounLabel = useMemo(() => getAvatarPronounLabel(design), [design]);
  const [activeFamily, setActiveFamily] = useState<AvatarSpriteFamily>(selectedSprite.family);
  const [history, setHistory] = useState<SipAvatarDesign[]>([]);
  const [previewRotation, setPreviewRotation] = useState(0);
  const familySprites = useMemo(() => getAvatarSpritesForFamily(activeFamily), [activeFamily]);
  const categorySpecializations = useMemo(() => getAvatarSpecializationsForCategory(design.beverageCategory), [design.beverageCategory]);
  const savedDate = useMemo(() => (design.updatedAt === new Date(0).toISOString() ? "Not saved yet" : new Date(design.updatedAt).toLocaleString()), [design.updatedAt]);
  const activePanelIndex = Math.max(0, avatarPanels.findIndex((panel) => panel.id === activePanel));
  const profileDepth = Math.round(
    [
      design.name ? 1 : 0,
      design.title ? 1 : 0,
      design.beverageCategory ? 1 : 0,
      design.specialization ? 1 : 0,
      design.workContext ? 1 : 0,
      design.masteryTier ? 1 : 0,
      design.spriteId ? 1 : 0,
      design.loadout ? 1 : 0
    ].reduce((sum, value) => sum + value, 0) * 12.5
  );
  const sensoryAverage = Math.round(
    avatarSensoryTraits.reduce((sum, trait) => sum + Number(design[sensoryFieldMap[trait.id]]), 0) / avatarSensoryTraits.length
  );

  useEffect(() => {
    const saved = readSipAvatar(ownerId);
    setDesign(saved);
    setActiveFamily(getSipAvatarSprite(saved).family);
    setHistory([]);
    setPreviewRotation(0);
  }, [ownerId]);

  const commitDesign = (update: Partial<SipAvatarDesign> | ((current: SipAvatarDesign) => SipAvatarDesign)) => {
    setDesign((current) => {
      const next = typeof update === "function" ? update(current) : { ...current, ...update };
      setHistory((stack) => [...stack.slice(-23), current]);
      return next;
    });
  };

  const updateDesign = (patch: Partial<SipAvatarDesign>) => {
    commitDesign(patch);
  };

  const updateName = (name: string) => {
    updateDesign({ name });
  };

  const updateTitle = (title: string) => {
    updateDesign({ title });
  };

  const updatePronouns = (pronouns: AvatarPronouns) => {
    updateDesign({ pronouns });
  };

  const chooseCategory = (categoryId: AvatarBeverageCategory) => {
    const category = avatarBeverageCategories.find((item) => item.id === categoryId) ?? avatarBeverageCategories[0];
    const professionDefaults = getProfessionDefaults(category.defaultProfession);
    const nextSpriteId = getSafeSpriteId(professionDefaults.spriteId, design.spriteId);
    setActiveFamily(getSipAvatarSprite({ spriteId: nextSpriteId }).family);
    commitDesign((current) => ({ ...current, ...professionDefaults, ...getCategoryDefaults(categoryId), beverageCategory: categoryId }));
    setActivePanel("profession");
  };

  const chooseProfession = (professionId: SipAvatarDesign["profession"]) => {
    const defaults = getProfessionDefaults(professionId);
    const nextSpriteId = getSafeSpriteId(defaults.spriteId, design.spriteId);
    setActiveFamily(getSipAvatarSprite({ spriteId: nextSpriteId }).family);
    commitDesign((current) => ({ ...current, ...defaults }));
  };

  const chooseLoadout = (loadoutId: AvatarLoadout) => {
    updateDesign(getLoadoutDefaults(loadoutId));
  };

  const updateSprite = (spriteId: AvatarSpriteId) => {
    const sprite = avatarSpriteOptions.find((option) => option.id === spriteId) ?? avatarSpriteOptions[0];
    setActiveFamily(sprite.family);
    commitDesign((current) => ({ ...current, ...getStudioDefaultsForSprite(spriteId), spriteId }));
  };

  const chooseFamily = (family: AvatarSpriteFamily) => {
    const familyMeta = avatarSpriteFamilies.find((item) => item.id === family) ?? avatarSpriteFamilies[0];
    setActiveFamily(family);
    commitDesign((current) => ({ ...current, ...getStudioDefaultsForSprite(familyMeta.defaultSpriteId), spriteId: familyMeta.defaultSpriteId }));
    setActivePanel("body");
  };

  const chooseWorkContext = (workContext: AvatarWorkContext) => {
    const context = avatarWorkContexts.find((item) => item.id === workContext) ?? avatarWorkContexts[0];
    commitDesign((current) => ({ ...current, ...getLoadoutDefaults(context.defaultLoadout), workContext: context.id }));
  };

  const chooseMasteryTier = (masteryTier: AvatarMasteryTier) => {
    updateDesign({ masteryTier });
  };

  const chooseSpecialization = (specialization: AvatarSpecialization) => {
    updateDesign(getSpecializationDefaults(specialization));
  };

  const updateSecondaryCategory = (secondaryBeverageCategory: AvatarBeverageCategory) => {
    if (secondaryBeverageCategory === design.beverageCategory) return;
    updateDesign({ secondaryBeverageCategory });
  };

  const updateHairStyle = (hairStyle: AvatarHairStyle) => {
    updateDesign({ hairStyle });
  };

  const updateHairColor = (hair: string) => {
    updateDesign({ hair });
  };

  const updateAccessory = (accessory: AvatarAccessory) => {
    updateDesign({ accessory });
  };

  const updateSensoryTrait = (trait: AvatarSensoryTrait, value: number) => {
    updateDesign({ [sensoryFieldMap[trait]]: Math.max(0, Math.min(100, Math.round(value))) } as Partial<SipAvatarDesign>);
  };

  const undoDesign = () => {
    setHistory((stack) => {
      const previous = stack[stack.length - 1];
      if (previous) {
        setDesign(previous);
        setActiveFamily(getSipAvatarSprite(previous).family);
      }
      return stack.slice(0, -1);
    });
  };

  const randomizeDesign = () => {
    const randomized = randomSipAvatarDesign(design);
    setActiveFamily(getSipAvatarSprite(randomized).family);
    commitDesign(randomized);
  };

  const saveDesign = () => {
    const saved = saveSipAvatar(ownerId, design);
    setDesign(saved);
    onNavigate("account");
  };

  if (!user) {
    return (
      <section className="avatar-creator-page">
        <header className="section-header">
          <h2>Avatar Creator</h2>
          <p>Log in before creating a saved Sip Studies character.</p>
        </header>
        <button className="btn btn-primary" type="button" onClick={() => onNavigate("login?next=account/avatar")}>
          Log In
        </button>
      </section>
    );
  }

  return (
    <section className="avatar-creator-page" aria-label="Sip Studies avatar creator">
      <header className="avatar-creator-hero">
        <div>
          <p className="nav-overline">Beverage Pro Character Studio</p>
          <h2>Character creation for modern beverage pros.</h2>
          <p>{avatarProfessions.length} career presets, {avatarSpecializations.length} specializations, inclusive identity controls, sensory signatures, and dashboard-ready loadouts.</p>
        </div>
        <div className="avatar-creator-actions">
          <button className="btn btn-light" type="button" onClick={() => onNavigate("account")}>
            Back to Dashboard
          </button>
          <button className="btn btn-light" type="button" onClick={undoDesign} disabled={!history.length}>
            Undo
          </button>
          <button className="btn btn-light" type="button" onClick={randomizeDesign}>
            Randomize
          </button>
          <button className="btn btn-primary" type="button" onClick={saveDesign}>
            Save Character
          </button>
        </div>
      </header>

      <div className="avatar-creator-layout">
        <aside className="avatar-creator-rail" aria-label="Character creator navigation">
          <div className="avatar-creator-status-card">
            <span>Studio Depth</span>
            <strong>{profileDepth}%</strong>
            <small>{selectedMasteryTier.label} / {sensoryAverage}% sensory signature</small>
            <div className="avatar-progress-track" aria-hidden="true">
              <span style={{ width: `${profileDepth}%` }} />
            </div>
          </div>
          <div className="avatar-builder-tabs" role="tablist" aria-label="Character option groups">
            {avatarPanels.map((panel, index) => (
              <button
                key={panel.id}
                type="button"
                role="tab"
                aria-selected={activePanel === panel.id}
                className={activePanel === panel.id ? "active" : ""}
                onClick={() => setActivePanel(panel.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{panel.label}</strong>
                <small>{panel.detail}</small>
              </button>
            ))}
          </div>
          <div className="avatar-rail-summary">
            <span>{selectedCategory.label}</span>
            <span>{selectedWorkContext.label}</span>
            <span>{selectedSpecialization.label}</span>
          </div>
        </aside>

        <section className="avatar-creator-stage-card" aria-label="Character preview">
          <div className="avatar-stage-dossier">
            <span>
              <small>Character</small>
              <strong>{design.name}</strong>
            </span>
            <span>
              <small>Profession</small>
              <strong>{selectedProfession.label}</strong>
            </span>
            <span>
              <small>Category</small>
              <strong>{selectedCategory.label}</strong>
            </span>
            <span>
              <small>Specialty</small>
              <strong>{selectedSpecialization.label}</strong>
            </span>
            <span>
              <small>Context</small>
              <strong>{selectedWorkContext.label}</strong>
            </span>
          </div>
          <SipAvatarViewer design={design} label={`${design.name} ${selectedProfession.label} preview`} rotation={previewRotation} />
          <div className="avatar-stage-readout">
            <span>{design.title}</span>
            <span>{pronounLabel}</span>
            <span>{selectedMasteryTier.badge}</span>
            <span>{selectedPresentation.label}</span>
            <span>{selectedBackdrop.label}</span>
            <span>{selectedSprite.label}</span>
          </div>
          <div className="avatar-rotation-controls" aria-label="Preview rotation controls">
            <button type="button" onClick={() => setPreviewRotation((current) => current - 18)} aria-label="Rotate preview left" title="Rotate preview left">
              L
            </button>
            <button type="button" onClick={() => setPreviewRotation(0)} aria-label="Reset preview rotation" title="Reset preview rotation">
              F
            </button>
            <button type="button" onClick={() => setPreviewRotation((current) => current + 18)} aria-label="Rotate preview right" title="Rotate preview right">
              R
            </button>
            <span className="avatar-rotation-readout">{activePanelIndex + 1}/{avatarPanels.length} {avatarPanels[activePanelIndex]?.label}</span>
          </div>
          <div className="avatar-sensory-mini" aria-label="Sensory signature preview">
            {avatarSensoryTraits.map((trait) => (
              <span key={trait.id} style={{ "--avatar-sensory-value": `${design[sensoryFieldMap[trait.id]]}%` } as CSSProperties}>
                <small>{trait.label}</small>
              </span>
            ))}
          </div>
        </section>

        <section className="avatar-control-panel" aria-label="Avatar customization controls">
          <div className="avatar-builder-panel">
            {activePanel === "identity" ? (
              <div className="avatar-option-group">
                <div className="avatar-modern-field-grid">
                  <label className="avatar-name-field">
                    Character name
                    <input value={design.name} onChange={(event) => updateName(event.target.value)} maxLength={32} />
                  </label>
                  <label className="avatar-name-field">
                    Professional title
                    <input value={design.title} onChange={(event) => updateTitle(event.target.value)} maxLength={42} />
                  </label>
                </div>

                <h3>Pronouns</h3>
                <div className="avatar-pill-row avatar-pill-row-large">
                  {avatarPronounOptions.map((option) => (
                    <button key={option.id} type="button" className={design.pronouns === option.id ? "active" : ""} onClick={() => updatePronouns(option.id)}>
                      {option.label}
                    </button>
                  ))}
                </div>
                {design.pronouns === "custom" ? (
                  <label className="avatar-name-field avatar-custom-pronouns">
                    Custom pronouns
                    <input value={design.customPronouns} onChange={(event) => updateDesign({ customPronouns: event.target.value })} maxLength={24} />
                  </label>
                ) : null}

                <h3>Presentation</h3>
                <div className="avatar-choice-grid">
                  {avatarPresentationOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={design.presentation === option.id ? "active" : ""}
                      onClick={() => updateDesign({ presentation: option.id as AvatarPresentation })}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.detail}</span>
                    </button>
                  ))}
                </div>

                <h3>Beverage Category</h3>
                <div className="avatar-category-grid">
                  {avatarBeverageCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={design.beverageCategory === category.id ? "active" : ""}
                      onClick={() => chooseCategory(category.id)}
                      style={{ "--avatar-category-accent": category.accent } as CSSProperties}
                    >
                      <strong>{category.label}</strong>
                      <span>{category.detail}</span>
                    </button>
                  ))}
                </div>

                <h3>Secondary Category</h3>
                <div className="avatar-pill-row avatar-pill-row-large">
                  {avatarBeverageCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={design.secondaryBeverageCategory === category.id ? "active" : ""}
                      onClick={() => updateSecondaryCategory(category.id)}
                      disabled={category.id === design.beverageCategory}
                      aria-label={`${category.label} secondary category`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activePanel === "profession" ? (
              <div className="avatar-option-group">
                <h3>Profession Presets</h3>
                <div className="avatar-profession-grid">
                  {avatarProfessions.map((profession) => {
                    const preview = getSipAvatarSprite({ spriteId: profession.defaultSpriteId });
                    const category = avatarBeverageCategories.find((item) => item.id === profession.category) ?? avatarBeverageCategories[0];
                    return (
                      <button
                        key={profession.id}
                        type="button"
                        className={design.profession === profession.id ? "active" : ""}
                        onClick={() => chooseProfession(profession.id)}
                        style={{ "--avatar-category-accent": profession.accent } as CSSProperties}
                      >
                        <img src={preview.src} alt="" loading="lazy" draggable={false} />
                        <span>
                          <small>{category.label}</small>
                          <strong>{profession.label}</strong>
                          <em>{profession.detail}</em>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <h3>Work Context</h3>
                <div className="avatar-choice-grid avatar-work-grid">
                  {avatarWorkContexts.map((context) => (
                    <button key={context.id} type="button" className={design.workContext === context.id ? "active" : ""} onClick={() => chooseWorkContext(context.id)}>
                      <strong>{context.label}</strong>
                      <span>{context.detail}</span>
                    </button>
                  ))}
                </div>

                <h3>Specialization</h3>
                <div className="avatar-choice-grid">
                  {categorySpecializations.map((specialization) => (
                    <button
                      key={specialization.id}
                      type="button"
                      className={design.specialization === specialization.id ? "active" : ""}
                      onClick={() => chooseSpecialization(specialization.id)}
                    >
                      <strong>{specialization.label}</strong>
                      <span>{specialization.detail}</span>
                    </button>
                  ))}
                </div>

                <h3>Mastery Tier</h3>
                <div className="avatar-mastery-grid">
                  {avatarMasteryTiers.map((tier) => (
                    <button key={tier.id} type="button" className={design.masteryTier === tier.id ? "active" : ""} onClick={() => chooseMasteryTier(tier.id)}>
                      <span>{tier.badge}</span>
                      <strong>{tier.label}</strong>
                      <small>{tier.detail}</small>
                    </button>
                  ))}
                </div>

                <h3>Loadouts</h3>
                <div className="avatar-loadout-grid">
                  {avatarLoadouts.map((loadout) => (
                    <button key={loadout.id} type="button" className={design.loadout === loadout.id ? "active" : ""} onClick={() => chooseLoadout(loadout.id)}>
                      <strong>{loadout.label}</strong>
                      <span>{loadout.detail}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activePanel === "body" ? (
              <div className="avatar-option-group">
                <h3>Body Base</h3>
                <div className="avatar-family-grid">
                  {avatarSpriteFamilies.map((family) => {
                    const preview = getSipAvatarSprite({ spriteId: family.defaultSpriteId });
                    const active = selectedSprite.family === family.id;
                    return (
                      <button key={family.id} type="button" className={active ? "active" : ""} onClick={() => chooseFamily(family.id)}>
                        <img src={preview.src} alt="" loading="lazy" draggable={false} />
                        <span>
                          <strong>{family.label}</strong>
                          <small>{family.detail}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <h3>Sprite Variant</h3>
                <div className="avatar-sprite-grid">
                  {familySprites.map((sprite) => (
                    <button key={sprite.id} type="button" className={design.spriteId === sprite.id ? "active" : ""} onClick={() => updateSprite(sprite.id)}>
                      <img src={sprite.src} alt="" loading="lazy" draggable={false} />
                      <span>
                        <strong>{sprite.label}</strong>
                        <small>{sprite.detail}</small>
                      </span>
                    </button>
                  ))}
                </div>

                <h3>Build, Stance, and Expression</h3>
                <div className="avatar-option-row">
                  <div className="avatar-option-group">
                    <div className="avatar-pill-row avatar-pill-row-large">
                      {avatarBuilds.map((build) => (
                        <button key={build.id} type="button" className={design.build === build.id ? "active" : ""} onClick={() => updateDesign({ build: build.id as AvatarBuild })}>
                          {build.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="avatar-option-group">
                    <div className="avatar-pill-row avatar-pill-row-large">
                      {avatarStances.map((stance) => (
                        <button key={stance.id} type="button" className={design.stance === stance.id ? "active" : ""} onClick={() => updateDesign({ stance: stance.id as AvatarStance })}>
                          {stance.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="avatar-option-group">
                    <div className="avatar-pill-row avatar-pill-row-large">
                      {avatarExpressions.map((expression) => (
                        <button
                          key={expression.id}
                          type="button"
                          className={design.expression === expression.id ? "active" : ""}
                          onClick={() => updateDesign({ expression: expression.id as AvatarExpression })}
                        >
                          {expression.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activePanel === "hair" ? (
              <div className="avatar-option-group">
                <h3>Hair Style</h3>
                <div className="avatar-pill-row avatar-pill-row-large">
                  {avatarHairStyles.map((hair) => (
                    <button key={hair.id} type="button" className={design.hairStyle === hair.id ? "active" : ""} onClick={() => updateHairStyle(hair.id)}>
                      {hair.label}
                    </button>
                  ))}
                </div>
                <div className="avatar-swatch-grid">
                  <div>
                    <h3>Hair Color</h3>
                    <div className="avatar-swatch-row">
                      {avatarHairSwatches.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={design.hair.toLowerCase() === color.toLowerCase() ? "active" : ""}
                          style={{ background: color }}
                          onClick={() => updateHairColor(color)}
                          aria-label={`Hair color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>Skin Tone</h3>
                    <div className="avatar-swatch-row">
                      {avatarSkinSwatches.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={design.skin.toLowerCase() === color.toLowerCase() ? "active" : ""}
                          style={{ background: color }}
                          onClick={() => updateDesign({ skin: color })}
                          aria-label={`Skin tone ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activePanel === "wardrobe" ? (
              <div className="avatar-option-group">
                <div className="avatar-swatch-grid">
                  <div>
                    <h3>Jacket Color</h3>
                    <div className="avatar-swatch-row">
                      {avatarJacketSwatches.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={design.jacket.toLowerCase() === color.toLowerCase() ? "active" : ""}
                          style={{ background: color }}
                          onClick={() => updateDesign({ jacket: color })}
                          aria-label={`Jacket color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>Accent Color</h3>
                    <div className="avatar-swatch-row">
                      {avatarAccentSwatches.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={design.accent.toLowerCase() === color.toLowerCase() ? "active" : ""}
                          style={{ background: color }}
                          onClick={() => updateDesign({ accent: color })}
                          aria-label={`Accent color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <h3>Material Finish</h3>
                <div className="avatar-pill-row avatar-pill-row-large">
                  {avatarFinishes.map((finish) => (
                    <button key={finish.id} type="button" className={design.finish === finish.id ? "active" : ""} onClick={() => updateDesign({ finish: finish.id as AvatarFinish })}>
                      {finish.label}
                    </button>
                  ))}
                </div>

                <h3>Stage Backdrop</h3>
                <div className="avatar-loadout-grid">
                  {avatarStageBackdrops.map((backdrop) => (
                    <button key={backdrop.id} type="button" className={design.backdrop === backdrop.id ? "active" : ""} onClick={() => updateDesign({ backdrop: backdrop.id as AvatarStageBackdrop })}>
                      <strong>{backdrop.label}</strong>
                      <span>{backdrop.detail}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activePanel === "gear" ? (
              <div className="avatar-option-group">
                <h3>Feature Overlay</h3>
                <div className="avatar-pill-row avatar-pill-row-large">
                  {avatarAccessories.map((accessory) => (
                    <button key={accessory.id} type="button" className={design.accessory === accessory.id ? "active" : ""} onClick={() => updateAccessory(accessory.id)}>
                      {accessory.label}
                    </button>
                  ))}
                </div>

                <h3>Professional Tool</h3>
                <div className="avatar-pill-row avatar-pill-row-large">
                  {avatarCompanions.map((companion) => (
                    <button key={companion.id} type="button" className={design.companion === companion.id ? "active" : ""} onClick={() => updateDesign({ companion: companion.id as AvatarCompanion })}>
                      {companion.label}
                    </button>
                  ))}
                </div>

                <h3>Role Silhouette</h3>
                <div className="avatar-choice-grid">
                  {avatarArchetypes.map((archetype) => (
                    <button key={archetype.id} type="button" className={design.archetype === archetype.id ? "active" : ""} onClick={() => updateDesign({ archetype: archetype.id as AvatarArchetype })}>
                      <strong>{archetype.label}</strong>
                      <span>{archetype.detail}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activePanel === "sensory" ? (
              <div className="avatar-option-group">
                <div className="avatar-sensory-header">
                  <div>
                    <h3>Sensory Signature</h3>
                    <p>{selectedSpecialization.detail}</p>
                  </div>
                  <strong>{sensoryAverage}%</strong>
                </div>
                <div className="avatar-sensory-grid">
                  {avatarSensoryTraits.map((trait) => {
                    const value = Number(design[sensoryFieldMap[trait.id]]);
                    return (
                      <label key={trait.id} className="avatar-sensory-slider">
                        <span>
                          <strong>{trait.label}</strong>
                          <small>{trait.detail}</small>
                          <em>{value}</em>
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={value}
                          onChange={(event) => updateSensoryTrait(trait.id, Number(event.target.value))}
                          aria-label={`${trait.label} sensory intensity`}
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="avatar-choice-grid">
                  {categorySpecializations.map((specialization) => (
                    <button
                      key={specialization.id}
                      type="button"
                      className={design.specialization === specialization.id ? "active" : ""}
                      onClick={() => chooseSpecialization(specialization.id)}
                    >
                      <strong>{specialization.label}</strong>
                      <span>{specialization.detail}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activePanel === "profile" ? (
              <div className="avatar-option-group">
                <h3>Profile Card</h3>
                <div className="avatar-profile-summary avatar-profile-summary-modern">
                  <SipAvatarViewer design={design} size="small" label={`${design.name} profile preview`} />
                  <div>
                    <strong>{design.name}</strong>
                    <span>{design.title}</span>
                    <small>{selectedProfession.label} / {selectedCategory.label} + {selectedSecondaryCategory.label} / {pronounLabel}</small>
                    <div className="avatar-current-picks">
                      <span>{selectedPresentation.label}</span>
                      <span>{selectedWorkContext.label}</span>
                      <span>{selectedMasteryTier.label}</span>
                      <span>{selectedSpecialization.label}</span>
                      <span>{selectedLoadout.label}</span>
                      <span>{selectedBackdrop.label}</span>
                      <span>{selectedSprite.label}</span>
                      <span>{design.finish}</span>
                    </div>
                    <div className="avatar-profile-bars">
                      {avatarSensoryTraits.map((trait) => (
                        <span key={trait.id}>
                          <small>{trait.label}</small>
                          <em style={{ width: `${design[sensoryFieldMap[trait.id]]}%` }} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="avatar-save-note">Last saved: {savedDate}</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </section>
  );
}
