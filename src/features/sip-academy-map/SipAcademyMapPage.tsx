import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  BatteryCharging,
  BeerBottle,
  Coffee,
  Compass,
  Cow,
  Drop,
  Factory,
  FirstAidKit,
  Flask,
  GlobeHemisphereWest,
  Leaf,
  MapTrifold,
  Mountains,
  OrangeSlice,
  Scales,
  Sparkle,
  TeaBag,
  Wine
} from "@phosphor-icons/react";
import { SipAcademyGlobe } from "./SipAcademyGlobe";
import {
  SIP_ACADEMY_CAMPUSES,
  SIP_ACADEMY_GUILDS,
  SIP_ACADEMY_WORLD_SELECTION,
  selectionFromHash,
  selectionToHash,
  type SipAcademyCampus,
  type SipAcademyCampusId,
  type SipAcademyGuild,
  type SipAcademyGuildId,
  type SipAcademyMapSelection
} from "./sipAcademyGuilds";
import {
  SIP_ACADEMY_GUILD_ART,
  SIP_ACADEMY_NODE_ART,
  SIP_ACADEMY_STUDY_ART,
  type SipAcademyStudyLayerId
} from "./sipAcademyNodeArt";
import "./sip-academy-map.css";

const GUILD_ICONS: Record<SipAcademyGuildId, Icon> = {
  cask: Wine,
  steep: TeaBag,
  source: Drop,
  energy: BatteryCharging,
  culture: Sparkle
};

const CAMPUS_ICONS: Record<SipAcademyCampusId, Icon> = {
  wine: Wine,
  beer: BeerBottle,
  spirits: Flask,
  coffee: Coffee,
  tea: TeaBag,
  kombucha: Leaf,
  water: Drop,
  juice: OrangeSlice,
  milk: Cow,
  "health-drinks": FirstAidKit,
  protein: Scales,
  "energy-drinks": BatteryCharging,
  sodas: Sparkle,
  fermented: Flask,
  "regional-drinks": GlobeHemisphereWest
};

function GuildIcon({ guildId, size = 22 }: { guildId: SipAcademyGuildId; size?: number }) {
  const Glyph = GUILD_ICONS[guildId];
  return <Glyph aria-hidden="true" size={size} weight="duotone" />;
}

function CampusIcon({ campusId, size = 22 }: { campusId: SipAcademyCampusId; size?: number }) {
  const Glyph = CAMPUS_ICONS[campusId];
  return <Glyph aria-hidden="true" size={size} weight="duotone" />;
}

function GuildMedallion({ guildId }: { guildId: SipAcademyGuildId }) {
  const art = SIP_ACADEMY_GUILD_ART[guildId];
  return (
    <span className="sam-node-medallion" aria-hidden="true">
      <img
        alt=""
        decoding="async"
        loading="lazy"
        src={art.src}
        style={{ objectPosition: art.position }}
      />
      <span className="sam-node-medallion__glyph"><GuildIcon guildId={guildId} size={16} /></span>
    </span>
  );
}

function CampusMedallion({ campusId }: { campusId: SipAcademyCampusId }) {
  const art = SIP_ACADEMY_NODE_ART[campusId];
  return (
    <span className="sam-node-medallion" aria-hidden="true">
      <img
        alt=""
        decoding="async"
        loading="lazy"
        src={art.src}
        style={{ objectPosition: art.position }}
      />
      <span className="sam-node-medallion__glyph"><CampusIcon campusId={campusId} size={16} /></span>
    </span>
  );
}

const CAMPUS_STUDY_LAYER_META: Record<
  SipAcademyStudyLayerId,
  { eyebrow: string; title: string; Icon: Icon }
> = {
  terroir: { eyebrow: "Land and source", title: "Terroir", Icon: Mountains },
  architecture: { eyebrow: "Campus iconology", title: "Architecture", Icon: Compass },
  facilities: { eyebrow: "Inside the gates", title: "Facilities", Icon: Factory }
};

function CampusStudyMedallion({
  campusId,
  layerId
}: {
  campusId: SipAcademyCampusId;
  layerId: SipAcademyStudyLayerId;
}) {
  const art = SIP_ACADEMY_STUDY_ART[campusId][layerId];
  const Glyph = CAMPUS_STUDY_LAYER_META[layerId].Icon;
  return (
    <span className="sam-study-medallion" aria-hidden="true">
      <img
        alt=""
        decoding="async"
        loading="lazy"
        src={art.src}
        style={{ objectPosition: art.position }}
      />
      <span className="sam-study-medallion__glyph"><Glyph size={17} weight="duotone" /></span>
    </span>
  );
}

function guildForCampus(campus: SipAcademyCampus): SipAcademyGuild {
  return SIP_ACADEMY_GUILDS.find((guild) => guild.id === campus.guild) ?? SIP_ACADEMY_GUILDS[0];
}

function guildAccent(guild: SipAcademyGuild): string {
  return guild.campusIds
    .map((campusId) => SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === campusId)?.accent)
    .find((accent): accent is string => Boolean(accent)) ?? "#79d6e7";
}

function updateSelectionHash(selection: SipAcademyMapSelection) {
  if (typeof window === "undefined") return;
  window.history.replaceState(
    { ...window.history.state, sipAcademyMapSelection: selection },
    "",
    selectionToHash(selection)
  );
}

function WorldFieldNote() {
  return (
    <div className="sam-note-content sam-world-note">
      <div className="sam-note-heading">
        <span className="sam-note-icon"><GlobeHemisphereWest aria-hidden="true" size={28} weight="duotone" /></span>
        <div>
          <span className="sam-kicker">World overview</span>
          <h2>All guilds in view</h2>
        </div>
      </div>
      <p className="sam-note-motto">Five connected territories. Fifteen specialist academies.</p>
      <p>Rotate the globe, then choose a gold guild node to reveal its three academy campuses.</p>
      <div className="sam-note-rule" aria-hidden="true" />
      <p className="sam-world-note-hint"><Compass aria-hidden="true" weight="duotone" /> Tap or click open globe space at any time to return here.</p>
    </div>
  );
}

function GuildFieldNote({
  guild,
  onSelect
}: {
  guild: SipAcademyGuild;
  onSelect: (selection: SipAcademyMapSelection) => void;
}) {
  const campuses = guild.campusIds
    .map((campusId) => SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === campusId))
    .filter((campus): campus is SipAcademyCampus => Boolean(campus));

  return (
    <div className="sam-note-content">
      <div className="sam-note-heading">
        <span className="sam-note-icon"><GuildIcon guildId={guild.id} size={28} /></span>
        <div>
          <span className="sam-kicker">Guild territory</span>
          <h2>{guild.name}</h2>
        </div>
      </div>
      <p className="sam-note-motto">{guild.motto}</p>
      <p>{guild.description}</p>
      <div className="sam-note-rule" aria-hidden="true" />
      <h3>What this guild protects</h3>
      <ul className="sam-focus-list">
        {guild.focus.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <h3>Academies in this territory</h3>
      <div className="sam-note-campus-list">
        {campuses.map((campus, index) => (
          <div
            className="sam-note-campus"
            key={campus.id}
            style={{ "--sam-node-accent": campus.accent, "--sam-node-index": index } as CSSProperties}
          >
            <button
              aria-controls="sam-world"
              className="sam-node-card"
              type="button"
              onClick={() => onSelect({ kind: "campus", id: campus.id })}
            >
              <CampusMedallion campusId={campus.id} />
              <span className="sam-node-copy">
                <span className="sam-node-eyebrow">Locate campus</span>
                <strong>{campus.shortName}</strong>
                <small>{campus.signal}</small>
              </span>
            </button>
            {campus.route ? (
              <a href={campus.route} aria-label={`Enter ${campus.name}`}>
                <span className="sam-node-action-label">Enter</span>
                <ArrowRight aria-hidden="true" size={20} weight="bold" />
              </a>
            ) : (
              <span className="sam-campus-planned" aria-label={`${campus.name} adventure forthcoming`}>
                <span className="sam-node-action-label">Soon</span>
                <Sparkle aria-hidden="true" size={18} weight="duotone" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CampusFieldNote({
  campus,
  onSelect
}: {
  campus: SipAcademyCampus;
  onSelect: (selection: SipAcademyMapSelection) => void;
}) {
  const [studyLayer, setStudyLayer] = useState<SipAcademyStudyLayerId>("terroir");
  const guild = guildForCampus(campus);
  const affiliations = [campus.guild, ...(campus.affiliateGuilds ?? [])]
    .map((id) => SIP_ACADEMY_GUILDS.find((item) => item.id === id))
    .filter((item): item is SipAcademyGuild => Boolean(item));
  const studyLayers: Array<{ id: SipAcademyStudyLayerId; copy: string }> = [
    { id: "terroir", copy: campus.terroir },
    { id: "architecture", copy: campus.architecture },
    { id: "facilities", copy: campus.program }
  ];
  const selectedStudy = studyLayers.find((item) => item.id === studyLayer) ?? studyLayers[0];
  const selectedStudyMeta = CAMPUS_STUDY_LAYER_META[selectedStudy.id];
  const selectedStudyArt = SIP_ACADEMY_STUDY_ART[campus.id][selectedStudy.id];

  useEffect(() => {
    setStudyLayer("terroir");
  }, [campus.id]);

  const handleStudyKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = studyLayers.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;
    else return;

    event.preventDefault();
    const nextId = studyLayers[nextIndex].id;
    setStudyLayer(nextId);
    requestAnimationFrame(() => document.getElementById(`sam-study-${campus.id}-${nextId}`)?.focus());
  };

  return (
    <div className="sam-note-content">
      <div className="sam-note-heading">
        <span className="sam-note-icon" style={{ "--sam-campus-accent": campus.accent } as CSSProperties}>
          <CampusIcon campusId={campus.id} size={30} />
        </span>
        <div>
          <span className="sam-kicker">Academy campus</span>
          <h2>{campus.name}</h2>
        </div>
      </div>
      <p className="sam-note-motto">{campus.signal}</p>
      <p>{campus.description}</p>
      <div className="sam-affiliations" aria-label="Guild affiliations">
        {affiliations.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => onSelect({ kind: "guild", id: item.id })}
            style={{ "--sam-node-accent": guildAccent(item) } as CSSProperties}
          >
            <GuildMedallion guildId={item.id} />
            <span>
              <small>Explore guild</small>
              <strong>{item.name}</strong>
            </span>
          </button>
        ))}
      </div>
      <div className="sam-note-rule" aria-hidden="true" />
      <h3>Field curriculum</h3>
      <ul className="sam-focus-list">
        {campus.focus.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="sam-campus-atlas">
        <div className="sam-campus-atlas__rail" role="tablist" aria-label={`${campus.name} field studies`}>
          {studyLayers.map((item, index) => {
            const meta = CAMPUS_STUDY_LAYER_META[item.id];
            const selected = studyLayer === item.id;
            return (
              <button
                aria-controls={`sam-study-panel-${campus.id}`}
                aria-selected={selected}
                className={selected ? "is-selected" : ""}
                id={`sam-study-${campus.id}-${item.id}`}
                key={item.id}
                onClick={() => setStudyLayer(item.id)}
                onKeyDown={(event) => handleStudyKeyDown(event, index)}
                role="tab"
                style={{ "--sam-node-accent": campus.accent } as CSSProperties}
                tabIndex={selected ? 0 : -1}
                type="button"
              >
                <CampusStudyMedallion campusId={campus.id} layerId={item.id} />
                <span>
                  <small>{meta.eyebrow}</small>
                  <strong>{meta.title}</strong>
                </span>
              </button>
            );
          })}
        </div>
        <section
          aria-labelledby={`sam-study-${campus.id}-${selectedStudy.id}`}
          className="sam-campus-atlas__detail"
          id={`sam-study-panel-${campus.id}`}
          role="tabpanel"
          style={{ "--sam-node-accent": campus.accent } as CSSProperties}
          tabIndex={0}
        >
          <div className="sam-campus-atlas__detail-media" aria-hidden="true">
            <img
              alt=""
              decoding="async"
              loading="lazy"
              src={selectedStudyArt.src}
              style={{ objectPosition: selectedStudyArt.position }}
            />
          </div>
          <div className="sam-campus-atlas__detail-copy">
            <span className="sam-kicker">{selectedStudyMeta.eyebrow}</span>
            <h3>{selectedStudy.id === "architecture" ? "Architecture with a purpose" : selectedStudyMeta.title}</h3>
            <p>{selectedStudy.copy}</p>
          </div>
        </section>
      </div>
      {campus.route ? (
        <a className="sam-enter-adventure" href={campus.route}>
          <CampusMedallion campusId={campus.id} />
          <span>
            <small>Open the gates</small>
            Enter {campus.shortName} Adventure
          </span>
          <ArrowRight aria-hidden="true" size={22} weight="bold" />
        </a>
      ) : (
        <div className="sam-enter-adventure is-planned" role="status">
          <span>
            <small>Academy planning</small>
            {campus.shortName} Adventure forthcoming
          </span>
          <Sparkle aria-hidden="true" size={22} weight="duotone" />
        </div>
      )}
      <button className="sam-return-guild" type="button" onClick={() => onSelect({ kind: "guild", id: guild.id })}>
        <GuildMedallion guildId={guild.id} />
        <span>Return to {guild.name}</span>
      </button>
    </div>
  );
}

function AcademyDirectory({
  onSelect,
  selection
}: {
  onSelect: (selection: SipAcademyMapSelection) => void;
  selection: SipAcademyMapSelection;
}) {
  const activeGuildId = selection.kind === "guild"
    ? selection.id
    : selection.kind === "campus"
      ? SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === selection.id)?.guild
      : undefined;

  return (
    <section className="sam-directory" aria-labelledby="sam-directory-title">
      <div className="sam-section-heading">
        <div>
          <span className="sam-kicker">World directory</span>
          <h2 id="sam-directory-title">Every academy, one connected system</h2>
        </div>
        <p>Choose a campus to locate it on the globe, or enter its adventure directly.</p>
      </div>
      <div className="sam-directory-grid">
        {SIP_ACADEMY_GUILDS.map((guild) => {
          const campuses = guild.campusIds
            .map((id) => SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === id))
            .filter((campus): campus is SipAcademyCampus => Boolean(campus));
          return (
            <section
              className="sam-directory-guild"
              key={guild.id}
              aria-labelledby={`sam-directory-${guild.id}`}
              style={{ "--sam-node-accent": guildAccent(guild) } as CSSProperties}
            >
              <button
                className="sam-directory-guild-heading"
                type="button"
                onClick={() => onSelect({ kind: "guild", id: guild.id })}
                aria-controls="sam-world"
                aria-pressed={activeGuildId === guild.id}
              >
                <GuildMedallion guildId={guild.id} />
                <span className="sam-node-copy">
                  <span className="sam-node-eyebrow">Guild territory</span>
                  <strong id={`sam-directory-${guild.id}`}>{guild.name}</strong>
                  <small>{guild.motto}</small>
                </span>
              </button>
              <ul>
                {campuses.map((campus) => {
                  const isSelected = selection.kind === "campus" && selection.id === campus.id;
                  return (
                    <li
                      key={campus.id}
                      className={isSelected ? "is-selected" : ""}
                      style={{ "--sam-node-accent": campus.accent } as CSSProperties}
                    >
                      <button
                        aria-controls="sam-world"
                        aria-pressed={isSelected}
                        type="button"
                        onClick={() => onSelect({ kind: "campus", id: campus.id })}
                      >
                        <CampusMedallion campusId={campus.id} />
                        <span className="sam-node-copy">
                          <span className="sam-node-eyebrow">{isSelected ? "Campus in focus" : "Locate campus"}</span>
                          <strong>{campus.name}</strong>
                          <small>{campus.signal}</small>
                        </span>
                      </button>
                      {campus.route ? (
                        <a href={campus.route} aria-label={`Enter ${campus.name}`}>
                          <ArrowRight aria-hidden="true" size={19} weight="bold" />
                        </a>
                      ) : (
                        <span className="sam-campus-planned" aria-label={`${campus.name} adventure forthcoming`}>
                          <Sparkle aria-hidden="true" size={17} weight="duotone" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export function SipAcademyMapPage() {
  const [selection, setSelection] = useState<SipAcademyMapSelection>(() => selectionFromHash());

  useEffect(() => {
    const readLocation = () => setSelection(selectionFromHash());
    window.addEventListener("hashchange", readLocation);
    window.addEventListener("popstate", readLocation);
    return () => {
      window.removeEventListener("hashchange", readLocation);
      window.removeEventListener("popstate", readLocation);
    };
  }, []);

  const selectedGuild = useMemo(
    () => selection.kind === "guild" ? SIP_ACADEMY_GUILDS.find((guild) => guild.id === selection.id) : undefined,
    [selection]
  );
  const selectedCampus = useMemo(
    () => selection.kind === "campus" ? SIP_ACADEMY_CAMPUSES.find((campus) => campus.id === selection.id) : undefined,
    [selection]
  );
  const activeGuild = selectedGuild ?? (selectedCampus ? guildForCampus(selectedCampus) : undefined);
  const selectionAnnouncement = selectedCampus
    ? `${selectedCampus.name} selected. ${selectedCampus.signal}.`
    : activeGuild
      ? `${activeGuild.name} selected. ${activeGuild.campusIds.length} academies available.`
      : "World overview selected. Five guilds and fifteen academies available.";

  const handleSelect = (nextSelection: SipAcademyMapSelection) => {
    setSelection(nextSelection);
    updateSelectionHash(nextSelection);
  };

  const handleClear = () => handleSelect(SIP_ACADEMY_WORLD_SELECTION);

  return (
    <main className="sam-page">
      <header className="sam-hero">
        <div className="sam-hero-copy">
          <span className="sam-kicker"><GlobeHemisphereWest aria-hidden="true" weight="duotone" /> SIP Academy · World Atlas</span>
          <h1>Sip Academy Map</h1>
          <p>Orbit one living campus world. Five guild continents contain fifteen academy countries, each shaped by the land, water, and production systems it teaches.</p>
        </div>
        <dl className="sam-world-stats" aria-label="Academy world overview">
          <div><dt>Guilds</dt><dd>5</dd></div>
          <div><dt>Academies</dt><dd>{SIP_ACADEMY_CAMPUSES.length}</dd></div>
          <div><dt>Campus view</dt><dd>360°</dd></div>
        </dl>
      </header>

      <nav className="sam-guild-compass" aria-label="Academy guilds">
        {SIP_ACADEMY_GUILDS.map((guild) => {
          const selected = activeGuild?.id === guild.id;
          return (
            <button
              type="button"
              key={guild.id}
              onClick={() => handleSelect({ kind: "guild", id: guild.id })}
              aria-pressed={selected}
              aria-controls="sam-world"
              className={selected ? "is-selected" : ""}
              style={{ "--sam-node-accent": guildAccent(guild) } as CSSProperties}
            >
              <GuildMedallion guildId={guild.id} />
              <span className="sam-guild-copy">
                <span className="sam-node-eyebrow">{selected ? "Active guild" : "Explore guild"}</span>
                <strong>{guild.name}</strong>
                <small>{guild.focus.join(" · ")}</small>
              </span>
              <ArrowRight className="sam-guild-arrow" aria-hidden="true" size={18} weight="bold" />
            </button>
          );
        })}
      </nav>

      <section className="sam-world" id="sam-world" aria-labelledby="sam-world-title">
        <div className="sam-world-heading">
          <div>
            <span className="sam-kicker"><Compass aria-hidden="true" weight="duotone" /> Interactive campus globe</span>
            <h2 id="sam-world-title">Rotate the world. Find your guild.</h2>
          </div>
          <p>Choose a guild to illuminate its continent. Choose an academy to trace its country border and move close enough to inspect its real 3D campus.</p>
        </div>
        <div className="sam-world-layout">
          <div className="sam-globe-zone">
            <SipAcademyGlobe selection={selection} onSelect={handleSelect} onClear={handleClear} />
          </div>
          <aside className="sam-field-note" id="sam-field-note" aria-label="Selected academy map field note">
            <span className="sam-paper-label">SIP Academy field note</span>
            {selectedCampus ? (
              <CampusFieldNote campus={selectedCampus} onSelect={handleSelect} />
            ) : selectedGuild ? (
              <GuildFieldNote guild={selectedGuild} onSelect={handleSelect} />
            ) : (
              <WorldFieldNote />
            )}
          </aside>
        </div>
        <p className="sam-sr-only" role="status" aria-live="polite">{selectionAnnouncement}</p>
      </section>

      <AcademyDirectory onSelect={handleSelect} selection={selection} />

      <footer className="sam-map-footer">
        <MapTrifold aria-hidden="true" size={28} weight="duotone" />
        <p><strong>One world, many ways of learning.</strong> Guild borders show stewardship—not walls. Culture remains a shared commons across the academy.</p>
      </footer>
    </main>
  );
}

export default SipAcademyMapPage;
