import { useEffect, useMemo, useState } from "react";
import sipStudiosLogo from "../assets/brand/logo-sip-studios-opt.webp";
import aiRnDLogo from "../assets/brand/logo-ai-rnd-opt.webp";
import sommSupportLogo from "../assets/brand/logo-somm-support-opt.webp";
import { normalizeExternalUrl } from "../lib/urlSafety";

type ThemeId = "sage-sunset" | "ocean-glow" | "citrus-night" | "wine-forest";
type SocialPlatformKey = "facebook" | "instagram" | "youtube" | "tiktok" | "x" | "linkedin" | "substack";
type BlockImageKey = "none" | "sip-studios" | "ai-rnd" | "somm-support";
type BlockTone = "solid" | "glass";

type EventsTheme = {
  id: ThemeId;
  label: string;
  gradients: string[];
};

type EventsProfile = {
  name: string;
  handle: string;
  tagline: string;
  bio: string;
};

type SocialConnection = {
  platform: SocialPlatformKey;
  label: string;
  mediaLabel: string;
  url: string;
  enabled: boolean;
};

type LinkBlock = {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  tag: string;
  image: BlockImageKey;
  tone: BlockTone;
  enabled: boolean;
};

type StoredState = {
  themeId: ThemeId;
  autoCycle: boolean;
  profile: EventsProfile;
  socials: SocialConnection[];
  blocks: LinkBlock[];
};

const STORAGE_KEY = "sipstudies:somm-events-builder:v1";

const THEMES: EventsTheme[] = [
  {
    id: "sage-sunset",
    label: "Sage Sunset",
    gradients: [
      "linear-gradient(155deg, #f5e6c8 0%, #c9e0cf 52%, #7eb8b5 100%)",
      "linear-gradient(155deg, #f1dfb7 0%, #d5ead8 45%, #6ea9a5 100%)",
      "linear-gradient(160deg, #f7e4c8 0%, #dcebd8 44%, #82b1aa 100%)"
    ]
  },
  {
    id: "ocean-glow",
    label: "Ocean Glow",
    gradients: [
      "linear-gradient(160deg, #0f4755 0%, #2f7a80 44%, #e4d8b8 100%)",
      "linear-gradient(160deg, #123f4e 0%, #2e7b73 48%, #e8d6ad 100%)",
      "linear-gradient(160deg, #0e4a55 0%, #3d7e85 44%, #edd9b9 100%)"
    ]
  },
  {
    id: "citrus-night",
    label: "Citrus Night",
    gradients: [
      "linear-gradient(155deg, #182b37 0%, #2a5f6a 45%, #d7a968 100%)",
      "linear-gradient(155deg, #1e2a40 0%, #356876 44%, #cc9658 100%)",
      "linear-gradient(155deg, #152d3b 0%, #2f6074 46%, #d5a167 100%)"
    ]
  },
  {
    id: "wine-forest",
    label: "Wine Forest",
    gradients: [
      "linear-gradient(160deg, #2a1b28 0%, #375d4c 48%, #d2b07b 100%)",
      "linear-gradient(160deg, #311f2d 0%, #3d6652 50%, #cbab73 100%)",
      "linear-gradient(160deg, #251a2a 0%, #3a624e 50%, #d4b487 100%)"
    ]
  }
];

const DEFAULT_PROFILE: EventsProfile = {
  name: "Sip Studies",
  handle: "@SipStudies",
  tagline: "Somm Support Events",
  bio: "Modular event microsite for photos, videos, links, and social channels."
};

const DEFAULT_SOCIALS: SocialConnection[] = [
  {
    platform: "substack",
    label: "Substack",
    mediaLabel: "Essays + Announcements",
    url: "https://sipstudies.substack.com/",
    enabled: true
  },
  {
    platform: "youtube",
    label: "YouTube",
    mediaLabel: "Videos + Shorts",
    url: "https://www.youtube.com/@sipstudies",
    enabled: true
  },
  {
    platform: "instagram",
    label: "Instagram",
    mediaLabel: "Reels + Photos",
    url: "https://instagram.com/sip.studies",
    enabled: true
  },
  {
    platform: "tiktok",
    label: "TikTok",
    mediaLabel: "Short Videos",
    url: "https://www.tiktok.com/@sipstudies",
    enabled: true
  },
  {
    platform: "facebook",
    label: "Facebook",
    mediaLabel: "Albums + Clips",
    url: "https://www.facebook.com/SipStudies",
    enabled: true
  },
  {
    platform: "tiktok",
    label: "TikTok",
    mediaLabel: "Short Videos",
    url: "https://www.tiktok.com/@sipstudies",
    enabled: false
  },
  { platform: "x", label: "X", mediaLabel: "Posts + Media", url: "", enabled: false },
  { platform: "linkedin", label: "LinkedIn", mediaLabel: "Event Updates", url: "", enabled: false }
];

const DEFAULT_BLOCKS: LinkBlock[] = [
  {
    id: "block-sip-studies",
    title: "SIP STUDIES",
    subtitle: "Primary website and navigation hub",
    url: "https://www.sipstudies.com/",
    tag: "Website",
    image: "sip-studios",
    tone: "solid",
    enabled: true
  },
  {
    id: "block-sip-academy",
    title: "SIP ACADEMY - WINE",
    subtitle: "Guided learning modules",
    url: "https://www.sipstudies.com/sip-academy-wine",
    tag: "Learning",
    image: "sip-studios",
    tone: "glass",
    enabled: true
  },
  {
    id: "block-sipopedia",
    title: "SIPOPEDIA",
    subtitle: "Terminology and reference knowledge",
    url: "https://www.sipstudies.com/sipopedia",
    tag: "Reference",
    image: "somm-support",
    tone: "solid",
    enabled: true
  },
  {
    id: "block-ai-rnd",
    title: "AI RnD",
    subtitle: "AI-focused research and updates",
    url: "https://www.sipstudies.com/ai-rnd",
    tag: "Innovation",
    image: "ai-rnd",
    tone: "glass",
    enabled: true
  }
];

const BLOCK_IMAGE_OPTIONS: Array<{ key: BlockImageKey; label: string }> = [
  { key: "none", label: "None" },
  { key: "sip-studios", label: "Sip Studios Logo" },
  { key: "ai-rnd", label: "Ai RnD Logo" },
  { key: "somm-support", label: "Somm Support Logo" }
];

const BLOCK_IMAGE_MAP: Record<Exclude<BlockImageKey, "none">, string> = {
  "sip-studios": sipStudiosLogo,
  "ai-rnd": aiRnDLogo,
  "somm-support": sommSupportLogo
};

function newId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `block-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeUrl(value: string) {
  return normalizeExternalUrl(value) ?? "";
}

function defaultState(): StoredState {
  return {
    themeId: "sage-sunset",
    autoCycle: true,
    profile: DEFAULT_PROFILE,
    socials: DEFAULT_SOCIALS,
    blocks: DEFAULT_BLOCKS
  };
}

function mergeSocialsWithDefaults(savedSocials?: SocialConnection[]): SocialConnection[] {
  const byPlatform = new Map<SocialPlatformKey, SocialConnection>();
  for (const defaults of DEFAULT_SOCIALS) {
    byPlatform.set(defaults.platform, defaults);
  }

  if (Array.isArray(savedSocials)) {
    for (const item of savedSocials) {
      const current = byPlatform.get(item.platform);
      if (!current) continue;
      byPlatform.set(item.platform, { ...current, ...item });
    }
  }

  const facebook = byPlatform.get("facebook");
  if (facebook) {
    byPlatform.set("facebook", {
      ...facebook,
      url: "https://www.facebook.com/SipStudies",
      enabled: true
    });
  }

  const youtube = byPlatform.get("youtube");
  if (youtube) {
    byPlatform.set("youtube", {
      ...youtube,
      url: "https://www.youtube.com/@sipstudies",
      enabled: true
    });
  }

  const instagram = byPlatform.get("instagram");
  if (instagram) {
    byPlatform.set("instagram", {
      ...instagram,
      url: "https://instagram.com/sip.studies",
      enabled: true
    });
  }

  const tiktok = byPlatform.get("tiktok");
  if (tiktok) {
    byPlatform.set("tiktok", {
      ...tiktok,
      enabled: false
    });
  }

  return DEFAULT_SOCIALS.map((defaults) => byPlatform.get(defaults.platform) ?? defaults);
}

export function SommEvents() {
  const [themeId, setThemeId] = useState<ThemeId>("sage-sunset");
  const [autoCycle, setAutoCycle] = useState(true);
  const [profile, setProfile] = useState<EventsProfile>(DEFAULT_PROFILE);
  const [socials, setSocials] = useState<SocialConnection[]>(DEFAULT_SOCIALS);
  const [blocks, setBlocks] = useState<LinkBlock[]>(DEFAULT_BLOCKS);
  const [gradientIndex, setGradientIndex] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<StoredState>;
      if (parsed.themeId && THEMES.some((theme) => theme.id === parsed.themeId)) setThemeId(parsed.themeId);
      if (typeof parsed.autoCycle === "boolean") setAutoCycle(parsed.autoCycle);
      if (parsed.profile) setProfile({ ...DEFAULT_PROFILE, ...parsed.profile });
      setSocials(mergeSocialsWithDefaults(parsed.socials));
      if (Array.isArray(parsed.blocks)) setBlocks(parsed.blocks);
    } catch {
      // Ignore malformed local storage and continue with defaults.
    }
  }, []);

  useEffect(() => {
    const payload: StoredState = { themeId, autoCycle, profile, socials, blocks };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore localStorage write failures.
    }
  }, [themeId, autoCycle, profile, socials, blocks]);

  useEffect(() => {
    if (!autoCycle) return;
    const timer = window.setInterval(() => setGradientIndex((value) => value + 1), 4500);
    return () => window.clearInterval(timer);
  }, [autoCycle]);

  const activeTheme = useMemo(() => THEMES.find((theme) => theme.id === themeId) ?? THEMES[0], [themeId]);
  const activeGradient = activeTheme.gradients[gradientIndex % activeTheme.gradients.length];
  const activeBlocks = useMemo(() => blocks.filter((block) => block.enabled), [blocks]);
  const connectedSocials = useMemo(
    () => socials.filter((item) => item.enabled && item.url.trim().length > 0),
    [socials]
  );

  const updateSocial = (platform: SocialPlatformKey, patch: Partial<SocialConnection>) => {
    setSocials((current) => current.map((item) => (item.platform === platform ? { ...item, ...patch } : item)));
  };

  const updateBlock = (id: string, patch: Partial<LinkBlock>) => {
    setBlocks((current) => current.map((block) => (block.id === id ? { ...block, ...patch } : block)));
  };

  const moveBlock = (id: string, direction: -1 | 1) => {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.id === id);
      if (index < 0) return current;
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      const [picked] = next.splice(index, 1);
      next.splice(nextIndex, 0, picked);
      return next;
    });
  };

  const addBlock = () => {
    setBlocks((current) => [
      ...current,
      {
        id: newId(),
        title: "New Event Link",
        subtitle: "Describe this destination",
        url: "",
        tag: "Module",
        image: "none",
        tone: "solid",
        enabled: true
      }
    ]);
  };

  const removeBlock = (id: string) => {
    setBlocks((current) => current.filter((block) => block.id !== id));
  };

  const resetDefaults = () => {
    const next = defaultState();
    setThemeId(next.themeId);
    setAutoCycle(next.autoCycle);
    setProfile(next.profile);
    setSocials(next.socials);
    setBlocks(next.blocks);
    setGradientIndex(0);
  };

  return (
    <section className="somm-events">
      <div className="section-header">
        <h2>Sommelier Events</h2>
        <p>Find the next useful event, understand how to prepare, and follow the registration or learning link with confidence.</p>
      </div>

      <article className="journal-card" aria-labelledby="somm-events-student-path">
        <p className="checkout-eyebrow">Student path</p>
        <h3 id="somm-events-student-path">Choose → prepare → attend</h3>
        <ol>
          <li>Choose one event that supports your current study or service goal.</li>
          <li>Review the event description and write down the prerequisite or bottle prep.</li>
          <li>Register through the verified event link, then capture one post-event takeaway.</li>
        </ol>
      </article>

      <div className="somm-events-shell">
        <article className="somm-events-preview-card">
          <div className="somm-events-preview-head">
            <strong>Student Event Guide</strong>
            <span>{activeBlocks.length} current links</span>
          </div>

          <div className="somm-events-preview-screen" style={{ backgroundImage: activeGradient }}>
            <div className="somm-events-preview-overlay" />
            <div className="somm-events-preview-content">
              <header className="somm-events-profile">
                <img src={sommSupportLogo} alt="" decoding="async" />
                <div>
                  <h3>{profile.name || "Somm Support"}</h3>
                  <p>{profile.handle || "@somm-support"}</p>
                  <small>{profile.tagline || "Events"}</small>
                </div>
              </header>
              <p className="somm-events-profile-bio">{profile.bio || "Add a short event description."}</p>

              <div className="somm-events-social-row">
                {connectedSocials.length ? (
                  connectedSocials.map((item) => {
                    const safeUrl = normalizeUrl(item.url);
                    if (!safeUrl) {
                      return null;
                    }
                    return (
                      <a key={item.platform} href={safeUrl} target="_blank" rel="noreferrer">
                        {item.label}
                      </a>
                    );
                  })
                ) : (
                  <span className="somm-events-empty-pill">Connect socials to display channel pills.</span>
                )}
              </div>

              <div className="somm-events-link-stack">
                {activeBlocks.length ? (
                  activeBlocks.map((block) => {
                    const src = block.image !== "none" ? BLOCK_IMAGE_MAP[block.image] : null;
                    const safeUrl = normalizeUrl(block.url);
                    if (!safeUrl) {
                      return null;
                    }
                    return (
                      <a
                        key={block.id}
                        className={`somm-events-link-block ${block.tone === "glass" ? "glass" : "solid"}`}
                        href={safeUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}
                        <div>
                          <p className="news-card-tag">{block.tag || "Module"}</p>
                          <h4>{block.title || "Untitled Link"}</h4>
                          <p>{block.subtitle || "Add a subtitle in the builder."}</p>
                        </div>
                      </a>
                    );
                  })
                ) : (
                  <p className="somm-events-empty">No enabled blocks. Turn on or add blocks in the builder.</p>
                )}
              </div>

              <details>
                <summary>Optional media and social channels</summary>
              <section className="somm-events-media-modules">
                <h4>Connected Media Modules</h4>
                {connectedSocials.length ? (
                  <ul>
                    {connectedSocials.map((item) => (
                      <li key={`media-${item.platform}`}>
                        <strong>{item.label}</strong>
                        <span>{item.mediaLabel}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="somm-events-empty">No media modules active yet.</p>
                )}
              </section>
              </details>
            </div>
          </div>
        </article>

        <details>
          <summary>Advanced host tools: edit the event microsite</summary>
        <aside className="somm-events-builder">
          <div className="somm-events-builder-head">
            <h3>Events Builder</h3>
            <button type="button" className="btn btn-light" onClick={resetDefaults}>
              Reset Defaults
            </button>
          </div>

          <section className="somm-events-builder-section">
            <h4>Theme + Motion</h4>
            <div className="somm-events-field-row">
              <label htmlFor="events-theme">Background Theme</label>
              <select id="events-theme" value={themeId} onChange={(event) => setThemeId(event.target.value as ThemeId)}>
                {THEMES.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
            <label className="somm-events-toggle">
              <input type="checkbox" checked={autoCycle} onChange={(event) => setAutoCycle(event.target.checked)} />
              Auto-cycle background colors
            </label>
          </section>

          <section className="somm-events-builder-section">
            <h4>Profile</h4>
            <div className="somm-events-field-row">
              <label htmlFor="events-name">Display Name</label>
              <input
                id="events-name"
                value={profile.name}
                onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
              />
            </div>
            <div className="somm-events-field-row">
              <label htmlFor="events-handle">Handle</label>
              <input
                id="events-handle"
                value={profile.handle}
                onChange={(event) => setProfile((current) => ({ ...current, handle: event.target.value }))}
                placeholder="@somm-support"
              />
            </div>
            <div className="somm-events-field-row">
              <label htmlFor="events-tagline">Tagline</label>
              <input
                id="events-tagline"
                value={profile.tagline}
                onChange={(event) => setProfile((current) => ({ ...current, tagline: event.target.value }))}
              />
            </div>
            <div className="somm-events-field-row">
              <label htmlFor="events-bio">Bio</label>
              <textarea
                id="events-bio"
                rows={2}
                value={profile.bio}
                onChange={(event) => setProfile((current) => ({ ...current, bio: event.target.value }))}
              />
            </div>
          </section>

          <section className="somm-events-builder-section">
            <h4>Social Channels</h4>
            <div className="somm-events-list">
              {socials.map((item) => (
                <article className="somm-events-row-card" key={item.platform}>
                  <div className="somm-events-row-head">
                    <strong>{item.label}</strong>
                    <label className="somm-events-toggle">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={(event) => updateSocial(item.platform, { enabled: event.target.checked })}
                      />
                      Enabled
                    </label>
                  </div>
                  <small>{item.mediaLabel}</small>
                  <input
                    value={item.url}
                    placeholder={`Paste ${item.label} URL`}
                    onChange={(event) => updateSocial(item.platform, { url: event.target.value })}
                  />
                </article>
              ))}
            </div>
          </section>

          <section className="somm-events-builder-section">
            <div className="somm-events-builder-inline-head">
              <h4>Website + Feature Blocks</h4>
              <button type="button" className="btn btn-light" onClick={addBlock}>
                Add Block
              </button>
            </div>

            <div className="somm-events-list">
              {blocks.map((block, index) => (
                <article className="somm-events-row-card" key={block.id}>
                  <div className="somm-events-row-head">
                    <strong>Block {index + 1}</strong>
                    <label className="somm-events-toggle">
                      <input
                        type="checkbox"
                        checked={block.enabled}
                        onChange={(event) => updateBlock(block.id, { enabled: event.target.checked })}
                      />
                      Visible
                    </label>
                  </div>
                  <input
                    value={block.title}
                    placeholder="Block title"
                    onChange={(event) => updateBlock(block.id, { title: event.target.value })}
                  />
                  <input
                    value={block.subtitle}
                    placeholder="Subtitle"
                    onChange={(event) => updateBlock(block.id, { subtitle: event.target.value })}
                  />
                  <input
                    value={block.url}
                    placeholder="https://..."
                    onChange={(event) => updateBlock(block.id, { url: event.target.value })}
                  />
                  <div className="somm-events-builder-grid-two">
                    <input
                      value={block.tag}
                      placeholder="Tag"
                      onChange={(event) => updateBlock(block.id, { tag: event.target.value })}
                    />
                    <select
                      value={block.image}
                      onChange={(event) => updateBlock(block.id, { image: event.target.value as BlockImageKey })}
                    >
                      {BLOCK_IMAGE_OPTIONS.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="somm-events-builder-grid-two">
                    <select
                      value={block.tone}
                      onChange={(event) => updateBlock(block.id, { tone: event.target.value as BlockTone })}
                    >
                      <option value="solid">Solid</option>
                      <option value="glass">Glass</option>
                    </select>
                    <div className="somm-events-actions">
                      <button type="button" className="btn btn-light" onClick={() => moveBlock(block.id, -1)}>
                        Up
                      </button>
                      <button type="button" className="btn btn-light" onClick={() => moveBlock(block.id, 1)}>
                        Down
                      </button>
                      <button type="button" className="btn btn-light" onClick={() => removeBlock(block.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>
        </details>
      </div>
    </section>
  );
}
