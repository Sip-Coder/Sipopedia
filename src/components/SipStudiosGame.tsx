import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";

type Point = { x: number; y: number };

type Npc = {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  color: string;
  lines: string[];
};

const NPCS: Npc[] = [
  {
    id: "aria",
    name: "Aria",
    role: "Cellar Mentor",
    x: 18,
    y: 34,
    color: "#d8e6da",
    lines: [
      "Welcome to Sip Studios. Run your palate warmup before tonight's service.",
      "Start with fruit, then structure, then finish. Your logic should feel automatic.",
      "Return after a blind round and I will unlock your precision challenge."
    ]
  },
  {
    id: "marco",
    name: "Marco",
    role: "Pairing Guide",
    x: 58,
    y: 45,
    color: "#cbe0d4",
    lines: [
      "Guests are ordering duck confit. Which red would you lead with first?",
      "Think texture before intensity. Match weight, then tune acid.",
      "Great. Keep that in mind when you enter Pairing Theater."
    ]
  },
  {
    id: "sol",
    name: "Sol",
    role: "Map Keeper",
    x: 78,
    y: 24,
    color: "#b9d6c8",
    lines: [
      "Every region has clues hidden in climate, soil, and tradition.",
      "Your next checkpoint is The Aging Vault. Click there after this chat.",
      "When in doubt, anchor on acid, tannin, alcohol, and fruit profile."
    ]
  },
  {
    id: "nora",
    name: "Nora",
    role: "Service Coach",
    x: 34,
    y: 70,
    color: "#d4e8dd",
    lines: [
      "Table six asks for a dry white with citrus and mineral profile.",
      "Your script: greet, confirm preference, propose two options, then serve confidently.",
      "Polish your timing and your guest trust score rises fast."
    ]
  }
];

function clampPercent(value: number): number {
  return Math.min(96, Math.max(4, value));
}

function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function SipStudiosGame() {
  const worldRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const [player, setPlayer] = useState<Point>({ x: 12, y: 80 });
  const [target, setTarget] = useState<Point | null>(null);
  const [pendingNpcId, setPendingNpcId] = useState<string | null>(null);
  const [activeNpcId, setActiveNpcId] = useState<string | null>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [visited, setVisited] = useState<Record<string, number>>({});

  const activeNpc = useMemo(() => NPCS.find((npc) => npc.id === activeNpcId) ?? null, [activeNpcId]);
  const activeLine = activeNpc ? activeNpc.lines[Math.min(lineIndex, activeNpc.lines.length - 1)] : null;
  const visitedCount = Object.keys(visited).length;

  useEffect(() => {
    const step = (ts: number) => {
      const prev = lastTickRef.current ?? ts;
      const dt = Math.min(0.05, (ts - prev) / 1000);
      lastTickRef.current = ts;
      setPlayer((current) => {
        if (!target) return current;
        const speed = 34;
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.55) return target;
        const travel = speed * dt;
        const ratio = Math.min(1, travel / dist);
        return { x: current.x + dx * ratio, y: current.y + dy * ratio };
      });
      animationRef.current = window.requestAnimationFrame(step);
    };
    animationRef.current = window.requestAnimationFrame(step);
    return () => {
      if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    };
  }, [target]);

  useEffect(() => {
    if (!target) return;
    if (distance(player, target) < 0.75) setTarget(null);
  }, [player, target]);

  useEffect(() => {
    if (!pendingNpcId) return;
    const npc = NPCS.find((item) => item.id === pendingNpcId);
    if (!npc) return;
    if (distance(player, npc) <= 8.5) {
      setActiveNpcId(npc.id);
      setLineIndex(0);
      setPendingNpcId(null);
      setVisited((current) => ({ ...current, [npc.id]: (current[npc.id] ?? 0) + 1 }));
    }
  }, [pendingNpcId, player]);

  const handleWalk = (event: PointerEvent<HTMLDivElement>) => {
    if (!worldRef.current) return;
    const rect = worldRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setActiveNpcId(null);
    setPendingNpcId(null);
    setTarget({ x: clampPercent(x), y: clampPercent(y) });
  };

  const handleNpcInteraction = (npc: Npc, event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const near = distance(player, npc) <= 8.5;
    if (!near) {
      setTarget({ x: clampPercent(npc.x - 2), y: clampPercent(npc.y + 6) });
      setPendingNpcId(npc.id);
      return;
    }
    setActiveNpcId(npc.id);
    setLineIndex(0);
    setVisited((current) => ({ ...current, [npc.id]: (current[npc.id] ?? 0) + 1 }));
  };

  const nextLine = () => {
    if (!activeNpc) return;
    setLineIndex((current) => Math.min(current + 1, activeNpc.lines.length - 1));
  };

  const closeDialogue = () => {
    setActiveNpcId(null);
    setLineIndex(0);
  };

  const currentQuest =
    visitedCount >= 4
      ? "All mentors checked in. Head to Sip Academy for the challenge ladder."
      : pendingNpcId
        ? "Walking to mentor..."
        : activeNpc
          ? `Conversation active with ${activeNpc.name}`
          : "Explore the map and click mentors to start conversations.";

  return (
    <section className="sip-game-page" aria-label="Sip Studios adventure game">
      <header className="section-header sip-game-head">
        <div className="section-header-copy">
          <p className="sip-game-kicker">Sip Studios Adventure</p>
          <h2>Wine Quest Walkaround</h2>
          <p>
            Click the world to move. Click an NPC to interact. If you are far away, your avatar will walk over and
            automatically begin the conversation.
          </p>
        </div>
      </header>

      <div className="sip-game-layout">
        <div className="sip-game-world-wrap">
          <div className="sip-game-world" ref={worldRef} onPointerDown={handleWalk} role="application" aria-label="Wine quest map">
            <div className="sip-game-grid" aria-hidden="true" />
            <div className="sip-game-terrain sip-game-terrain-1" aria-hidden="true" />
            <div className="sip-game-terrain sip-game-terrain-2" aria-hidden="true" />
            <div className="sip-game-terrain sip-game-terrain-3" aria-hidden="true" />

            <div
              className={`sip-game-player ${target ? "moving" : ""}`}
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
              aria-label="Player avatar"
            >
              <span>S</span>
            </div>

            {NPCS.map((npc) => {
              const seen = (visited[npc.id] ?? 0) > 0;
              return (
                <button
                  key={npc.id}
                  type="button"
                  className={`sip-game-npc ${activeNpcId === npc.id ? "active" : ""}`}
                  style={{ left: `${npc.x}%`, top: `${npc.y}%`, "--npc": npc.color } as CSSProperties}
                  onPointerDown={(event) => handleNpcInteraction(npc, event)}
                  aria-label={`${npc.name}, ${npc.role}`}
                >
                  <span>{npc.name[0]}</span>
                  <small>{seen ? "Visited" : npc.role}</small>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="sip-game-sidebar">
          <article className="sip-game-panel">
            <h3>Quest Status</h3>
            <p>{currentQuest}</p>
            <div className="sip-game-progress">
              <div style={{ width: `${Math.min(100, (visitedCount / NPCS.length) * 100)}%` }} />
            </div>
            <small>
              Mentors engaged: {visitedCount}/{NPCS.length}
            </small>
          </article>

          <article className="sip-game-panel">
            <h3>Controls</h3>
            <ul>
              <li>Click map: walk</li>
              <li>Click mentor: interact</li>
              <li>Complete mentor chats to unlock your challenge loop</li>
            </ul>
          </article>
        </aside>
      </div>

      {activeNpc && activeLine ? (
        <div className="sip-game-dialogue" role="dialog" aria-live="polite" aria-label={`Conversation with ${activeNpc.name}`}>
          <p className="sip-game-dialogue-kicker">
            {activeNpc.name} - {activeNpc.role}
          </p>
          <p>{activeLine}</p>
          <div className="sip-game-dialogue-actions">
            <button type="button" className="btn btn-light" onClick={closeDialogue}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={nextLine} disabled={lineIndex >= activeNpc.lines.length - 1}>
              Next
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
