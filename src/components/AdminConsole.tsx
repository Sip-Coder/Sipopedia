import { useEffect, useMemo, useState } from "react";
import { useAccess } from "../context/AccessContext";
import { supabase } from "../lib/supabase";
import { trackEvent } from "../lib/analytics";
import {
  SITE_MAP_PAGES,
  type PageStatusMap,
  type PageRoomAccess,
  type PagePublicationStatus,
  readPageStatusMap,
  writePageStatusMap
} from "../lib/siteMap";

type AdminConsoleProps = {
  onNavigate: (route: string) => void;
};

type UserRow = {
  id: string;
  display_name: string | null;
  role: "student" | "mentor" | "admin";
  created_at: string | null;
};

const adminRoleLabels: Record<UserRow["role"], string> = {
  student: "student (subscription)",
  mentor: "investor (contribution)",
  admin: "admin"
};

type DashboardStats = {
  profiles: number;
  terms: number;
  notes: number;
  subscriptions: number;
};

type SubscriptionRow = {
  id: string;
  user_id: string;
  plan_code: string;
  status: "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired";
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  updated_at: string;
};

type SocialPlatformKey = "instagram" | "facebook" | "linkedin" | "x" | "tiktok" | "youtube";

type SocialPlatform = {
  id: SocialPlatformKey;
  label: string;
  handle: string;
  postType: string;
  limit: number;
};

const defaultStats: DashboardStats = { profiles: 0, terms: 0, notes: 0, subscriptions: 0 };

const socialPlatforms: SocialPlatform[] = [
  { id: "instagram", label: "Instagram", handle: "@sipstudies", postType: "Feed, Reel, Story", limit: 2200 },
  { id: "facebook", label: "Facebook", handle: "Sip Studies", postType: "Page post", limit: 63206 },
  { id: "linkedin", label: "LinkedIn", handle: "Sip Studies", postType: "Company update", limit: 3000 },
  { id: "x", label: "X", handle: "@sipstudies", postType: "Short post", limit: 280 },
  { id: "tiktok", label: "TikTok", handle: "@sipstudies", postType: "Video caption", limit: 2200 },
  { id: "youtube", label: "YouTube", handle: "Sip Studies", postType: "Short or community post", limit: 5000 }
];

const initialConnectedPlatforms = socialPlatforms.reduce(
  (accumulator, platform) => ({ ...accumulator, [platform.id]: false }),
  {} as Record<SocialPlatformKey, boolean>
);

export function AdminConsole({ onNavigate }: AdminConsoleProps) {
  const { isAdmin, loading } = useAccess();
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "site-map" | "access" | "subscriptions" | "content">("overview");
  const [publishedPageStatuses, setPublishedPageStatuses] = useState<PageStatusMap>(() => readPageStatusMap());
  const [draftPageStatuses, setDraftPageStatuses] = useState<PageStatusMap>(() => readPageStatusMap());
  const [siteMapNotice, setSiteMapNotice] = useState("No staged page visibility changes.");
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<SocialPlatformKey, boolean>>(initialConnectedPlatforms);
  const [targetPlatforms, setTargetPlatforms] = useState<Record<SocialPlatformKey, boolean>>(initialConnectedPlatforms);
  const [socialPostTopic, setSocialPostTopic] = useState("");
  const [socialPostBody, setSocialPostBody] = useState("");
  const [socialMediaFiles, setSocialMediaFiles] = useState<string[]>([]);
  const [socialPostStatus, setSocialPostStatus] = useState("Draft not staged.");

  useEffect(() => {
    if (!isAdmin || !supabase) return;
    const client = supabase;
    let active = true;
    setLoadingData(true);
    setError("");

    const load = async () => {
      const [profilesResult, terminologyResult, notesResult] = await Promise.all([
        client.from("profiles").select("id,display_name,role,created_at"),
        client.from("terminology_entries").select("id", { count: "exact", head: true }),
        client.from("tasting_notes").select("id", { count: "exact", head: true })
      ]);
      const subscriptionsResult = await client
        .from("customer_subscriptions")
        .select("id,user_id,plan_code,status,current_period_end,cancel_at_period_end,updated_at")
        .order("updated_at", { ascending: false })
        .limit(100);

      if (!active) return;

      const profilesError = profilesResult.error;
      if (profilesError) {
        setError(profilesError.message);
        setLoadingData(false);
        return;
      }

      const nextUsers = (profilesResult.data as UserRow[] | null) ?? [];
      const nextSubscriptions = (subscriptionsResult.data as SubscriptionRow[] | null) ?? [];
      setUsers(nextUsers.sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? "")));
      setSubscriptions(nextSubscriptions);
      setStats({
        profiles: nextUsers.length,
        terms: terminologyResult.count ?? 0,
        notes: notesResult.count ?? 0,
        subscriptions: subscriptionsResult.count ?? nextSubscriptions.length
      });
      setLoadingData(false);
    };

    void load();
    return () => {
      active = false;
    };
  }, [isAdmin]);

  const siteMapDirty = useMemo(
    () =>
      SITE_MAP_PAGES.some((page) => {
        const published = publishedPageStatuses[page.route];
        const draft = draftPageStatuses[page.route];
        return published?.room !== draft?.room || published?.status !== draft?.status;
      }),
    [draftPageStatuses, publishedPageStatuses]
  );

  const siteMapCounts = useMemo(() => {
    return SITE_MAP_PAGES.reduce(
      (acc, page) => {
        const config = draftPageStatuses[page.route] ?? { room: page.defaultRoom, status: page.defaultStatus };
        acc.rooms[config.room] += 1;
        acc.statuses[config.status] += 1;
        return acc;
      },
      {
        rooms: { Lobby: 0, Game: 0, Boss: 0 } as Record<PageRoomAccess, number>,
        statuses: { public: 0, edit: 0, off: 0 } as Record<PagePublicationStatus, number>
      }
    );
  }, [draftPageStatuses]);

  const roleCounts = useMemo(() => {
    const counts = { student: 0, mentor: 0, admin: 0 };
    for (const user of users) counts[user.role] += 1;
    return counts;
  }, [users]);

  const updateRole = async (id: string, role: "student" | "mentor" | "admin") => {
    if (!supabase) return;
    if (!isAdmin) {
      setError("Admin access required.");
      return;
    }
    const { error: updateError } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, role } : user)));
    trackEvent("admin_role_update", { userId: id, role });
  };

  const updateSubscriptionStatus = async (
    id: string,
    status: "trialing" | "active" | "past_due" | "unpaid" | "canceled" | "incomplete" | "incomplete_expired"
  ) => {
    if (!supabase) return;
    if (!isAdmin) {
      setError("Admin access required.");
      return;
    }
    const { error: updateError } = await supabase.from("customer_subscriptions").update({ status }).eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSubscriptions((current) => current.map((subscription) => (subscription.id === id ? { ...subscription, status } : subscription)));
    trackEvent("admin_subscription_update", { subscriptionId: id, status });
  };

  const connectedCount = socialPlatforms.filter((platform) => connectedPlatforms[platform.id]).length;
  const selectedTargetCount = socialPlatforms.filter((platform) => targetPlatforms[platform.id]).length;
  const selectedPlatformLabels = socialPlatforms
    .filter((platform) => targetPlatforms[platform.id])
    .map((platform) => platform.label);

  const toggleConnectedPlatform = (platformId: SocialPlatformKey) => {
    setConnectedPlatforms((current) => {
      const nextConnected = !current[platformId];
      if (!nextConnected) {
        setTargetPlatforms((targets) => ({ ...targets, [platformId]: false }));
      }
      return { ...current, [platformId]: nextConnected };
    });
  };

  const toggleTargetPlatform = (platformId: SocialPlatformKey) => {
    if (!connectedPlatforms[platformId]) return;
    setTargetPlatforms((current) => ({ ...current, [platformId]: !current[platformId] }));
  };

  const generateSocialPostDraft = () => {
    const topic = socialPostTopic.trim() || "Sip Studies beverage education";
    const nextBody = [
      `${topic}`,
      "",
      "Build better beverage confidence with a focused Sip Studies lesson, map, or practice loop today.",
      "",
      "#SipStudies #BeverageEducation #WineStudy"
    ].join("\n");
    setSocialPostBody(nextBody);
    setSocialPostStatus("Generated draft ready for review.");
    trackEvent("admin_social_post_generate", { topic });
  };

  const stageSocialPost = () => {
    if (!socialPostBody.trim()) {
      setSocialPostStatus("Write or generate a post before staging.");
      return;
    }
    if (selectedTargetCount === 0) {
      setSocialPostStatus("Select at least one connected platform before staging.");
      return;
    }
    setSocialPostStatus(`Staged for ${selectedPlatformLabels.join(", ")}. Publishing API handoff is ready for backend wiring.`);
    trackEvent("admin_social_post_stage", { platforms: selectedPlatformLabels, mediaCount: socialMediaFiles.length });
  };

  const updateDraftPageRoom = (route: string, room: PageRoomAccess) => {
    setDraftPageStatuses((current) => {
      const currentConfig = current[route] ?? { room, status: "public" as const };
      return { ...current, [route]: { ...currentConfig, room } };
    });
    setSiteMapNotice("Page room change staged. Click Publish to apply all edits.");
  };

  const updateDraftPageStatus = (route: string, status: PagePublicationStatus) => {
    setDraftPageStatuses((current) => {
      const currentConfig = current[route] ?? { room: "Lobby" as const, status };
      return { ...current, [route]: { ...currentConfig, status } };
    });
    setSiteMapNotice("Page status change staged. Click Publish to apply all edits.");
  };

  const publishSiteMapChanges = () => {
    writePageStatusMap(draftPageStatuses);
    setPublishedPageStatuses(draftPageStatuses);
    setSiteMapNotice("Published page visibility changes for this site instance.");
    trackEvent("admin_site_map_publish", {
      pageCount: SITE_MAP_PAGES.length,
      lobby: siteMapCounts.rooms.Lobby,
      game: siteMapCounts.rooms.Game,
      boss: siteMapCounts.rooms.Boss,
      public: siteMapCounts.statuses.public,
      edit: siteMapCounts.statuses.edit,
      off: siteMapCounts.statuses.off
    });
  };

  const resetSiteMapDraft = () => {
    const published = readPageStatusMap();
    setPublishedPageStatuses(published);
    setDraftPageStatuses(published);
    setSiteMapNotice("Discarded staged changes.");
  };

  if (loading) {
    return (
      <section className="admin-console">
        <p>Checking admin access...</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="admin-console">
        <h2>Admin Console</h2>
        <p className="error">Admin access required.</p>
        <button className="btn btn-light" onClick={() => onNavigate("home")}>
          Back Home
        </button>
      </section>
    );
  }

  return (
    <section className="admin-console">
      <div className="section-header">
        <h2>Admin Console</h2>
        <p>Manage access tiers, content operations, and launch readiness from one dashboard.</p>
      </div>

      <nav className="page-nav page-nav-sub">
        <button className={`btn ${activeTab === "overview" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button className={`btn ${activeTab === "site-map" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("site-map")}>
          Site Map
        </button>
        <button className={`btn ${activeTab === "access" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("access")}>
          Access
        </button>
        <button
          className={`btn ${activeTab === "subscriptions" ? "btn-primary" : "btn-light"}`}
          onClick={() => setActiveTab("subscriptions")}
        >
          Subscriptions
        </button>
        <button className={`btn ${activeTab === "content" ? "btn-primary" : "btn-light"}`} onClick={() => setActiveTab("content")}>
          Content Ops
        </button>
      </nav>

      {error ? <p className="error">{error}</p> : null}
      {loadingData ? <p>Loading admin data...</p> : null}

      {activeTab === "overview" ? (
        <div className="admin-overview-groups">
          <section className="admin-overview-group" aria-label="Users overview">
            <p className="admin-overview-group-label">Users:</p>
            <div className="admin-overview-grid">
              <article className="admin-card">
                <p className="admin-eyebrow">Audience</p>
                <p className="admin-metric">{stats.profiles}</p>
                <div className="admin-stat-subpills" aria-label="Audience by role">
                  <span><strong>{roleCounts.student}</strong> Students</span>
                  <span><strong>{roleCounts.mentor}</strong> Investors</span>
                  <span><strong>{roleCounts.admin}</strong> Admins</span>
                </div>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Billing</p>
                <p className="admin-metric">{stats.subscriptions}</p>
                <small>Synced from customer subscription records</small>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Practice</p>
                <p className="admin-metric">{stats.notes}</p>
                <small>Saved tasting journal records</small>
              </article>
            </div>
          </section>

          <section className="admin-overview-group" aria-label="Site overview">
            <p className="admin-overview-group-label">Site:</p>
            <div className="admin-overview-grid">
              <article className="admin-card">
                <p className="admin-eyebrow">Sipopedia</p>
                <p className="admin-metric">{stats.terms}</p>
                <small>Published terminology entries</small>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Page Access</p>
                <p className="admin-metric">{SITE_MAP_PAGES.length}</p>
                <div className="admin-stat-subpills" aria-label="Page access by room">
                  <span><strong>{siteMapCounts.rooms.Lobby}</strong> Lobby</span>
                  <span><strong>{siteMapCounts.rooms.Game}</strong> Game</span>
                  <span><strong>{siteMapCounts.rooms.Boss}</strong> Boss</span>
                </div>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Visibility</p>
                <p className="admin-metric">{siteMapCounts.statuses.public}</p>
                <div className="admin-stat-subpills" aria-label="Page visibility by status">
                  <span><strong>{siteMapCounts.statuses.public}</strong> Public</span>
                  <span><strong>{siteMapCounts.statuses.edit}</strong> Edit</span>
                  <span><strong>{siteMapCounts.statuses.off}</strong> Off</span>
                </div>
              </article>
            </div>
          </section>

          <section className="admin-overview-group" aria-label="Edits overview">
            <p className="admin-overview-group-label">Edits:</p>
            <div className="admin-overview-grid">
              <article className="admin-card">
                <p className="admin-eyebrow">Publishing</p>
                <p className="admin-metric">{connectedCount}</p>
                <small>{socialPlatforms.length} available channels in Social Posts</small>
              </article>
              <article className="admin-card">
                <p className="admin-eyebrow">Drafts</p>
                <p className="admin-metric">{siteMapDirty ? 1 : 0}</p>
                <small>{siteMapDirty ? "Site Map has unpublished page access edits" : "No staged page access edits"}</small>
              </article>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === "site-map" ? (
        <article className="admin-card site-map-admin">
          <div className="site-map-admin-header">
            <div>
              <p className="admin-eyebrow">Page Access</p>
              <h3>Site Map</h3>
              <p>
                Assign pages to a room for audience access, then set whether each page is public, edit-only, or off.
                Published changes update navigation and route access in this site instance.
              </p>
            </div>
            <div className="site-map-admin-counts" aria-label="Site map access counts">
              <div className="site-map-count-row" aria-label="Room counts">
                <span className="site-map-count-label">Room:</span>
                <span><strong>{siteMapCounts.rooms.Lobby}</strong> Lobby</span>
                <span><strong>{siteMapCounts.rooms.Game}</strong> Game</span>
                <span><strong>{siteMapCounts.rooms.Boss}</strong> Boss</span>
              </div>
              <div className="site-map-count-row" aria-label="Status counts">
                <span className="site-map-count-label">Status:</span>
                <span><strong>{siteMapCounts.statuses.public}</strong> Public</span>
                <span><strong>{siteMapCounts.statuses.edit}</strong> Edit</span>
                <span><strong>{siteMapCounts.statuses.off}</strong> Off</span>
              </div>
            </div>
          </div>

          <div className="site-map-admin-table">
            <table>
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Room</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {SITE_MAP_PAGES.map((page) => {
                  const draftConfig = draftPageStatuses[page.route] ?? { room: page.defaultRoom, status: page.defaultStatus };
                  const publishedConfig = publishedPageStatuses[page.route] ?? { room: page.defaultRoom, status: page.defaultStatus };
                  const changed = draftConfig.room !== publishedConfig.room || draftConfig.status !== publishedConfig.status;
                  return (
                    <tr key={page.route} className={changed ? "changed" : ""}>
                      <td>
                        <strong>{page.label}</strong>
                        <small>{page.description}</small>
                      </td>
                      <td>
                        <div className="site-map-status-toggle" role="group" aria-label={`${page.label} room`}>
                          {(["Lobby", "Game", "Boss"] as const).map((room) => (
                            <button
                              key={room}
                              type="button"
                              className={`site-map-status-btn status-${room.toLowerCase()} ${draftConfig.room === room ? "active" : ""}`}
                              onClick={() => updateDraftPageRoom(page.route, room)}
                              aria-pressed={draftConfig.room === room}
                            >
                              {room}
                            </button>
                          ))}
                        </div>
                        <small>{page.section}</small>
                      </td>
                      <td><code>{page.route}</code></td>
                      <td>
                        <div className="site-map-status-toggle" role="group" aria-label={`${page.label} visibility`}>
                          {(["public", "edit", "off"] as const).map((status) => (
                            <button
                              key={status}
                              type="button"
                              className={`site-map-status-btn status-${status} ${draftConfig.status === status ? "active" : ""}`}
                              onClick={() => updateDraftPageStatus(page.route, status)}
                              aria-pressed={draftConfig.status === status}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                        {changed ? (
                          <small className="site-map-change-note">
                            staged from {publishedConfig.room} / {publishedConfig.status}
                          </small>
                        ) : null}
                      </td>
                      <td>
                        <button className="btn btn-light" type="button" onClick={() => onNavigate(page.route)}>
                          Open
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="site-map-publish-bar">
            <p>{siteMapNotice}</p>
            <div className="admin-actions">
              <button className="btn btn-light" type="button" onClick={resetSiteMapDraft} disabled={!siteMapDirty}>
                Discard Changes
              </button>
              <button className="btn btn-primary" type="button" onClick={publishSiteMapChanges} disabled={!siteMapDirty}>
                Publish
              </button>
            </div>
          </div>
        </article>
      ) : null}

      {activeTab === "subscriptions" ? (
        <article className="admin-card">
          <h3>Subscription Entitlements</h3>
          <p>This table controls paid workspace access. Keep statuses synced through billing webhooks when possible.</p>
          <div className="admin-user-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Period End</th>
                  <th>Cancel End</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td>{subscription.user_id.slice(0, 8)}</td>
                    <td>{subscription.plan_code}</td>
                    <td>
                      <select
                        value={subscription.status}
                        onChange={(event) =>
                          void updateSubscriptionStatus(
                            subscription.id,
                            event.target.value as SubscriptionRow["status"]
                          )
                        }
                      >
                        <option value="trialing">trialing</option>
                        <option value="active">active</option>
                        <option value="past_due">past_due</option>
                        <option value="unpaid">unpaid</option>
                        <option value="canceled">canceled</option>
                        <option value="incomplete">incomplete</option>
                        <option value="incomplete_expired">incomplete_expired</option>
                      </select>
                    </td>
                    <td>{subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : "-"}</td>
                    <td>{subscription.cancel_at_period_end ? "yes" : "no"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ) : null}

      {activeTab === "access" ? (
        <article className="admin-card">
          <h3>User Access Control</h3>
          <p>Use visitor for unauthenticated/public users, student for subscription access, investor for contribution access, and admin for back-office privileges.</p>
          <p className="hint">Visitor is public/no profile role needed.</p>
          <div className="admin-user-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.display_name || user.id.slice(0, 8)}</td>
                    <td>{adminRoleLabels[user.role]}</td>
                    <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</td>
                    <td>
                      <select value={user.role} onChange={(event) => void updateRole(user.id, event.target.value as UserRow["role"])}>
                        <option value="student">student (subscription)</option>
                        <option value="mentor">investor (contribution)</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ) : null}

      {activeTab === "content" ? (
        <div className="admin-content-ops">
          <article className="admin-card">
            <h3>Content Operations</h3>
            <p>Use Terminology Admin for source-safe publishing workflow and glossary maintenance.</p>
            <div className="admin-actions">
              <button className="btn btn-primary" onClick={() => onNavigate("admin/terminology")}>
                Open Terminology Admin
              </button>
              <button className="btn btn-light" onClick={() => onNavigate("app/sip-academy")}>
                Preview Learner Workspace
              </button>
            </div>
          </article>

          <article className="admin-card social-posts-card">
            <div className="social-posts-header">
              <div>
                <p className="admin-eyebrow">Content Operations</p>
                <h3>Social Posts</h3>
                <p>Connect channels, compose once, attach media, and stage a platform-ready post from the console.</p>
              </div>
              <div className="social-posts-status">
                <strong>{connectedCount}</strong>
                <span>connected</span>
              </div>
            </div>

            <section className="social-posts-grid" aria-label="Social post account connections">
              {socialPlatforms.map((platform) => {
                const connected = connectedPlatforms[platform.id];
                const targeted = targetPlatforms[platform.id];
                return (
                  <article key={platform.id} className={`social-platform-card${connected ? " connected" : ""}`}>
                    <div>
                      <h4>{platform.label}</h4>
                      <p>{platform.handle}</p>
                      <small>{platform.postType}</small>
                    </div>
                    <div className="social-platform-actions">
                      <label>
                        <input
                          type="checkbox"
                          checked={connected}
                          onChange={() => toggleConnectedPlatform(platform.id)}
                        />
                        Connected
                      </label>
                      <label className={!connected ? "disabled" : ""}>
                        <input
                          type="checkbox"
                          checked={targeted}
                          disabled={!connected}
                          onChange={() => toggleTargetPlatform(platform.id)}
                        />
                        Target
                      </label>
                    </div>
                  </article>
                );
              })}
            </section>

            <div className="social-posts-composer">
              <label>
                Post prompt
                <input
                  value={socialPostTopic}
                  onChange={(event) => setSocialPostTopic(event.target.value)}
                  placeholder="Example: promote the new African wine regions map"
                />
              </label>
              <label>
                Post copy
                <textarea
                  value={socialPostBody}
                  onChange={(event) => {
                    setSocialPostBody(event.target.value);
                    setSocialPostStatus("Draft edited.");
                  }}
                  rows={7}
                  placeholder="Write one post here, then target connected channels below."
                />
              </label>
              <label>
                Photos and videos
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(event) => {
                    const fileNames = Array.from(event.target.files ?? []).map((file) => file.name);
                    setSocialMediaFiles(fileNames);
                    setSocialPostStatus(fileNames.length > 0 ? `${fileNames.length} media file(s) attached locally.` : "No media attached.");
                  }}
                />
              </label>
            </div>

            <div className="social-posts-preview">
              <div>
                <p className="admin-eyebrow">Targets</p>
                <div className="social-posts-target-list">
                  {socialPlatforms.map((platform) => (
                    <span key={platform.id} className={targetPlatforms[platform.id] ? "active" : ""}>
                      {platform.label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="admin-eyebrow">Media</p>
                <div className="social-posts-media-list">
                  {socialMediaFiles.length > 0 ? socialMediaFiles.map((fileName) => <span key={fileName}>{fileName}</span>) : <span>No media selected</span>}
                </div>
              </div>
              <div>
                <p className="admin-eyebrow">Readiness</p>
                <p>{socialPostStatus}</p>
              </div>
            </div>

            <div className="admin-actions">
              <button className="btn btn-primary" type="button" onClick={generateSocialPostDraft}>
                Generate Draft
              </button>
              <button className="btn btn-light" type="button" onClick={stageSocialPost}>
                Stage Distribution
              </button>
              <button className="btn btn-light" type="button" disabled title="Requires platform API credentials and backend publishing queue.">
                Publish to Platforms
              </button>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
