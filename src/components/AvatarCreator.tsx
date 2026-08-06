import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, Check, FloppyDisk, Shuffle } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";
import {
  avatarRoster,
  avatarRosterCategoryKeys,
  getAvatarRosterPreset,
  getAvatarRosterPresetForDesign,
  type AvatarRosterCategoryKey,
  type AvatarRosterPreset
} from "../data/avatarRoster";
import {
  readSipAvatar,
  saveSipAvatar,
  type SipAvatarDesign
} from "../lib/sipAvatar";
import "./avatar-roster.css";

type AvatarCreatorProps = {
  onNavigate: (route: string) => void;
};

type SaveState = "idle" | "saved" | "error";

const categoryAccent: Record<AvatarRosterCategoryKey, string> = {
  wine: "#a94d68",
  beer: "#d69a45",
  spirits: "#c77b3d",
  coffee: "#9d6a4c",
  tea: "#66a77b",
  kombucha: "#a66cc2",
  juice: "#ee7c54",
  milk: "#bcdde5",
  water: "#72c7df",
  "energy-drinks": "#c8a1ff",
  "protein-drinks": "#93c78f",
  soda: "#ef6f92"
};

const categoryLabel = new Map(avatarRoster.map((preset) => [preset.categoryKey, preset.categoryLabel]));

function mergePreset(current: SipAvatarDesign, preset: AvatarRosterPreset): SipAvatarDesign {
  return {
    ...current,
    ...preset.designPatch,
    rosterCharacterId: preset.id
  };
}

export function AvatarCreator({ onNavigate }: AvatarCreatorProps) {
  const { user } = useAuth();
  const ownerId = user?.id ?? user?.email ?? "guest";
  const [design, setDesign] = useState<SipAvatarDesign>(() => readSipAvatar(ownerId));
  const initialPreset = useMemo(() => getAvatarRosterPresetForDesign(design), []);
  const [selectedPresetId, setSelectedPresetId] = useState(initialPreset.id);
  const [activeCategory, setActiveCategory] = useState<AvatarRosterCategoryKey>(initialPreset.categoryKey);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const selectedPreset = getAvatarRosterPreset(selectedPresetId) ?? avatarRoster[0];
  const visibleCharacters = useMemo(
    () => avatarRoster.filter((preset) => preset.categoryKey === activeCategory),
    [activeCategory]
  );
  useEffect(() => {
    const saved = readSipAvatar(ownerId);
    const preset = getAvatarRosterPresetForDesign(saved);
    setDesign(saved.rosterCharacterId ? saved : mergePreset(saved, preset));
    setSelectedPresetId(preset.id);
    setActiveCategory(preset.categoryKey);
    setSaveState("idle");
  }, [ownerId]);

  const choosePreset = (preset: AvatarRosterPreset) => {
    setSelectedPresetId(preset.id);
    setActiveCategory(preset.categoryKey);
    setDesign((current) => mergePreset(current, preset));
    setSaveState("idle");
  };

  const chooseCategory = (category: AvatarRosterCategoryKey) => {
    setActiveCategory(category);
    const currentPair = avatarRoster.find(
      (preset) => preset.categoryKey === category && preset.adultPresentation === selectedPreset.adultPresentation
    );
    choosePreset(currentPair ?? avatarRoster.find((preset) => preset.categoryKey === category) ?? avatarRoster[0]);
  };

  const surpriseMe = () => {
    const choices = avatarRoster.filter((preset) => preset.id !== selectedPresetId);
    choosePreset(choices[Math.floor(Math.random() * choices.length)] ?? avatarRoster[0]);
  };

  const saveDesign = () => {
    try {
      const saved = saveSipAvatar(ownerId, {
        ...design,
        rosterCharacterId: selectedPreset.id
      });
      setDesign(saved);
      setSaveState("saved");
      window.setTimeout(() => onNavigate("account"), 650);
    } catch {
      setSaveState("error");
    }
  };

  if (!user) {
    return (
      <section className="character-roster-page character-roster-login">
        <p className="character-roster-kicker">Sip Studies Player Roster</p>
        <h1>Choose a character after you log in.</h1>
        <p>Your selection is saved to your account workspace on this device.</p>
        <button className="btn btn-primary" type="button" onClick={() => onNavigate("login?next=account/avatar")}>
          Log In
        </button>
      </section>
    );
  }

  const previewStyle = { "--character-accent": categoryAccent[selectedPreset.categoryKey] } as CSSProperties;

  return (
    <section className="character-roster-page" aria-label="Sip Studies character roster">
      <header className="character-roster-header">
        <div>
          <p className="character-roster-kicker">Sip Studies Player Roster</p>
          <h1>Choose your character.</h1>
          <p>
            Meet 24 adult beverage specialists from across the Sip Studies universe. Pick a world, choose a character, and make them part of your profile.
          </p>
        </div>
        <div className="character-roster-header-actions">
          <button type="button" className="character-roster-button character-roster-button-quiet" onClick={() => onNavigate("account")}>
            <ArrowLeft aria-hidden="true" weight="bold" />
            Dashboard
          </button>
          <button type="button" className="character-roster-button character-roster-button-quiet" onClick={surpriseMe}>
            <Shuffle aria-hidden="true" weight="bold" />
            Surprise me
          </button>
          <button type="button" className="character-roster-button character-roster-button-save" onClick={saveDesign}>
            <FloppyDisk aria-hidden="true" weight="bold" />
            Save character
          </button>
        </div>
      </header>

      <div className="character-roster-steps" aria-label="Character selection progress">
        <span className="complete"><b>1</b> Choose a world</span>
        <span className="complete"><b>2</b> Pick your character</span>
        <span><b>3</b> Save to your profile</span>
      </div>

      <div className="character-roster-layout">
        <section className="character-roster-preview" style={previewStyle} aria-label="Selected character preview">
          <div className="character-roster-preview-topline">
            <span>{selectedPreset.categoryLabel}</span>
            <span>{selectedPreset.adultPresentation === "woman" ? "Woman" : "Man"}</span>
          </div>
          <div className="character-roster-artwork">
            <img
              src={selectedPreset.imagePath}
              alt={selectedPreset.altText}
              draggable={false}
            />
          </div>
          <div className="character-roster-preview-copy">
            <p>Selected character</p>
            <h2>{selectedPreset.displayName}</h2>
            <strong>{selectedPreset.designPatch.title}</strong>
            <span>{selectedPreset.roleDescription}</span>
          </div>
          <div className="character-roster-preview-status" aria-live="polite">
            <Check aria-hidden="true" weight="bold" />
            Ready for your profile
          </div>
        </section>

        <div className="character-roster-deck">
          <section className="character-roster-panel" aria-labelledby="beverage-world-heading">
            <div className="character-roster-panel-heading">
              <span>01</span>
              <div>
                <h2 id="beverage-world-heading">Choose a beverage world</h2>
                <p>Twelve worlds. Two original adult characters in each.</p>
              </div>
            </div>
            <div className="character-world-grid" aria-label="Beverage worlds">
              {avatarRosterCategoryKeys.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "active" : ""}
                  aria-pressed={activeCategory === category}
                  onClick={() => chooseCategory(category)}
                  style={{ "--world-accent": categoryAccent[category] } as CSSProperties}
                >
                  <i aria-hidden="true" />
                  <span>{categoryLabel.get(category)}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="character-roster-panel" aria-labelledby="character-pair-heading">
            <div className="character-roster-panel-heading">
              <span>02</span>
              <div>
                <h2 id="character-pair-heading">Choose your {categoryLabel.get(activeCategory)} character</h2>
                <p>Each character arrives with a distinct role, point of view, and profile starter.</p>
              </div>
            </div>
            <div className="character-pair-grid">
              {visibleCharacters.map((preset) => {
                const active = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={active ? "active" : ""}
                    aria-pressed={active}
                    onClick={() => choosePreset(preset)}
                  >
                    <span className="character-pair-image">
                      <img src={preset.imagePath} alt="" loading={active ? "eager" : "lazy"} draggable={false} />
                    </span>
                    <span className="character-pair-copy">
                      <small>{preset.adultPresentation === "woman" ? "Woman" : "Man"}</small>
                      <strong>{preset.displayName}</strong>
                      <em>{preset.designPatch.title}</em>
                    </span>
                    <span className="character-pair-check" aria-hidden="true">
                      <Check weight="bold" />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="character-roster-save-zone">
            <div aria-live="polite">
              {saveState === "saved" ? <strong>Character saved. Returning to your dashboard…</strong> : null}
              {saveState === "error" ? <strong>We could not save this character on this device. Please try again.</strong> : null}
              {saveState === "idle" ? <span>Your current account data remains intact until you save this selection.</span> : null}
            </div>
            <button type="button" className="character-roster-button character-roster-button-save" onClick={saveDesign}>
              <FloppyDisk aria-hidden="true" weight="bold" />
              Save {selectedPreset.displayName}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
