import { useAccess } from "../context/AccessContext";
import { useAuth } from "../context/AuthContext";

type AccountDashboardProps = {
  onNavigate: (route: string) => void;
};

type SectionProgress = {
  section: "Learn" | "Taste" | "Connect";
  completed: number;
  total: number;
  streak: string;
  lastMilestone: string;
};

const adminPreviewProgress: SectionProgress[] = [
  { section: "Learn", completed: 18, total: 24, streak: "6-day streak", lastMilestone: "Sipopedia: 300 terms reviewed" },
  { section: "Taste", completed: 11, total: 16, streak: "4-day streak", lastMilestone: "Flavor Wheel calibration pass" },
  { section: "Connect", completed: 9, total: 14, streak: "3-day streak", lastMilestone: "Ai Winecast study set complete" }
];

export function AccountDashboard({ onNavigate }: AccountDashboardProps) {
  const { user } = useAuth();
  const { tier, profile, subscription, isAdmin } = useAccess();

  if (!user) {
    return (
      <section className="account-dashboard">
        <header className="section-header">
          <h2>Account Dashboard</h2>
          <p>Sign in to view progress, billing status, and data controls.</p>
        </header>
        <div className="account-dashboard-actions">
          <button className="btn btn-primary" onClick={() => onNavigate("login")}>
            Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="account-dashboard">
      <header className="section-header">
        <div className="section-header-copy">
          <h2>Account Dashboard</h2>
          <p>Consolidated account controls, progress snapshots, and lifecycle actions.</p>
        </div>
        <div className="section-header-action">
          <button className="btn btn-light" onClick={() => onNavigate("app/launch")}>
            Back to Launch Deck
          </button>
        </div>
      </header>

      <div className="account-dashboard-grid">
        <article className="account-card">
          <h3>Profile</h3>
          <p><strong>Email:</strong> {user.email ?? "Unknown"}</p>
          <p><strong>Display name:</strong> {profile?.displayName ?? "Not set"}</p>
          <p><strong>Tier:</strong> {tier.toUpperCase()}</p>
          <p><strong>Role:</strong> {profile?.role ?? "visitor"}</p>
          {isAdmin ? <p className="hint">Admin preview mode enabled.</p> : null}
        </article>

        <article className="account-card">
          <h3>Membership</h3>
          <p><strong>Status:</strong> {subscription?.status ?? "no active subscription"}</p>
          <p><strong>Plan:</strong> {subscription?.planCode ?? "starter"}</p>
          <p><strong>Period end:</strong> {subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : "-"}</p>
          <div className="account-dashboard-actions">
            <button className="btn btn-light" disabled title="Billing portal wiring pending">
              Manage Payment Method
            </button>
            <button className="btn btn-light" disabled title="Cancellation flow wiring pending">
              Cancel Membership
            </button>
          </div>
        </article>

        <article className="account-card account-card-wide">
          <h3>Achievements</h3>
          <p>Section-level learning progress consolidated for quick review.</p>
          <div className="account-achievement-list">
            {adminPreviewProgress.map((item) => {
              const percentage = Math.round((item.completed / item.total) * 100);
              return (
                <div key={item.section} className="account-achievement-item">
                  <div className="account-achievement-top">
                    <strong>{item.section}</strong>
                    <span>{item.completed}/{item.total} complete ({percentage}%)</span>
                  </div>
                  <div className="account-achievement-bar">
                    <span style={{ width: `${percentage}%` }} />
                  </div>
                  <p>{item.streak} · {item.lastMilestone}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className="account-card account-card-wide">
          <h3>Data & Privacy</h3>
          <p>Self-service data tools for export and account removal will be expanded here.</p>
          <div className="account-dashboard-actions">
            <button className="btn btn-light" disabled title="Data export job queue not yet connected">
              Export My Data
            </button>
            <button className="btn btn-light" disabled title="Deletion workflow not yet connected">
              Delete My Data
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
