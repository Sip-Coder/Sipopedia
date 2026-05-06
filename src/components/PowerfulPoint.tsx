type PowerfulPointProps = {
  onNavigate: (next: string) => void;
};

export function PowerfulPoint({ onNavigate }: PowerfulPointProps) {
  return (
    <section className="powerful-point-page" aria-label="Powerful Point">
      <header className="section-header powerful-point-hero">
        <p className="nav-overline">Powerful Point</p>
        <h2>Your Beverage Intelligence Operating System</h2>
        <p>
          Sip Studies combines academy instruction, tasting workflows, industry intelligence, and AI support into one connected platform for modern beverage learning.
        </p>
      </header>

      <div className="powerful-point-grid">
        <article className="powerful-point-card">
          <h3>Character</h3>
          <p>Hospitality teams, educators, and enthusiasts who need one practical system for beverage mastery.</p>
        </article>
        <article className="powerful-point-card">
          <h3>Problem</h3>
          <p>Most training stacks are fragmented across disconnected tools, scattered resources, and inconsistent standards.</p>
        </article>
        <article className="powerful-point-card">
          <h3>Guide</h3>
          <p>Sip Studies delivers a guided pathway through Sip Academy, Sipopedia, maps, quizzes, journals, and cohort features.</p>
        </article>
        <article className="powerful-point-card">
          <h3>Plan</h3>
          <p>Learn core foundations, calibrate sensory skills, apply live workflows, then expand through AI RnD and Somm Support modules.</p>
        </article>
        <article className="powerful-point-card">
          <h3>Call To Action</h3>
          <p>Start in the Launch Deck, review plans, then enroll when ready to unlock the full workspace.</p>
        </article>
        <article className="powerful-point-card">
          <h3>Success</h3>
          <p>Teams gain consistent language, faster recall, stronger service confidence, and clearer growth tracking across modules.</p>
        </article>
      </div>

      <section className="powerful-point-band" aria-label="What we do">
        <h3>What Sip Studies Covers</h3>
        <div className="powerful-point-pill-row">
          <span className="powerful-point-pill">Sip Academy</span>
          <span className="powerful-point-pill">Sipopedia</span>
          <span className="powerful-point-pill">Flavor Wheel</span>
          <span className="powerful-point-pill">Tasting Journal</span>
          <span className="powerful-point-pill">Global Regions & Maps</span>
          <span className="powerful-point-pill">Grapes & Grains</span>
          <span className="powerful-point-pill">Bev Recipes</span>
          <span className="powerful-point-pill">Beverage News</span>
          <span className="powerful-point-pill">Tasting Groups</span>
          <span className="powerful-point-pill">AI News & Ai Winecast</span>
          <span className="powerful-point-pill">Somm Events</span>
          <span className="powerful-point-pill">Admin + Terminology Ops</span>
        </div>
      </section>

      <div className="powerful-point-actions">
        <button className="btn btn-primary" onClick={() => onNavigate("checkout")}>
          Enroll Now
        </button>
        <button className="btn btn-light" onClick={() => onNavigate("app/starter")}>
          Open Launch Deck
        </button>
      </div>
    </section>
  );
}

