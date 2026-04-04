# Sip Studios Game V2 PRD

## 1. Product Goal
Create a smooth, Duolingo-inspired interactive learning game where students master equipment and process flow in a winery, brewery, and distillery.

## 2. Success Criteria
- Learners can identify equipment by name, role, and process stage across all three facilities.
- Learners can sequence production steps correctly.
- Learners can diagnose common equipment/process faults.
- Session quality improves over time using spaced repetition and mistake review.
- Game runs smoothly on desktop and mobile with low-friction controls.

## 3. Scope
### In Scope (V2)
- Facility map progression: Winery -> Brewery -> Distillery.
- Node-based learning path with lock/unlock.
- Equipment hotspot exploration scenes.
- Challenge engine with multiple activity types.
- Mastery progression, XP, streak, rewards.
- Supabase-backed profile progress.
- Admin content controls for equipment/challenge data.

### Out of Scope (V2)
- Multiplayer.
- Full voice-acted narrative.
- Complex 3D rendering.

## 4. User Experience Model
### Core Loop
1. Enter facility path node.
2. Complete micro-lesson for target equipment.
3. Play 1-2 active challenges.
4. Receive immediate feedback and XP.
5. Unlock next node or repeat mistake review.

### Session Targets
- Session length: 3 to 7 minutes.
- Challenges per node: 3 to 5.
- Time to first interaction: < 10 seconds.

## 5. Learning Design
### Facility Coverage
- Winery: sorting line, crusher-destemmer, press, fermenter, pump-over setup, barrel room, filtration, bottling line.
- Brewery: mill, mash tun, lauter tun, kettle, whirlpool, plate chiller, fermenter, bright tank, canning/kegging.
- Distillery: mash cooker, fermenter, pot still, column still, condenser, spirit safe, proofing tank, barrel warehouse, filtration.

### Challenge Types
- Hotspot Identify: tap the correct equipment.
- Process Sequence: order equipment/stages.
- Function Match: match equipment to purpose.
- Fault Diagnosis: select likely root cause and corrective action.
- Safety Check: pick required safety step before operating equipment.

### Adaptive Behavior
- Missed items are reintroduced via spaced repetition.
- Repeated misses downgrade confidence and increase practice frequency.
- Mastered items appear less often unless in cumulative checks.

## 6. Game System Requirements
### Progression
- XP per correct answer and completion bonuses.
- Streak increments on daily completion.
- Per-equipment mastery states: `new`, `learning`, `proficient`, `mastered`.
- Facility unlock rules based on mastery threshold.

### Feedback and Rewards
- Instant correctness feedback.
- Clear explanation for wrong answers.
- Node completion reward animation.
- "Practice mistakes" queue entry after each node.

## 7. Art and Asset Production Plan
### Character Assets
#### Playable/Guide Characters
- 3 primary mentors: Winery Mentor, Brewmaster Mentor, Distiller Mentor.
- 6 support NPCs total (2 per facility).

#### Required Character Angles (Primary Mentors)
- Front.
- Back.
- Left profile.
- Right profile.
- 3/4 front left.
- 3/4 front right.

#### Required Gesture/State Set (Primary Mentors)
- Idle neutral.
- Walk cycle (4-6 frames).
- Point/explain.
- Celebrate/success.
- Concern/warning.
- Thinking.
- Correct feedback pose.
- Incorrect feedback pose.

#### Portrait Set (Dialogue UI)
- Neutral.
- Encouraging.
- Warning.
- Excited.

### Environment Assets
- 3 hub backgrounds (winery, brewery, distillery).
- 9 to 12 sub-scenes (production zones).
- Lighting variants: default, highlighted interaction, completion state.

### Equipment Assets
- Winery equipment sprites: ~25.
- Brewery equipment sprites: ~30.
- Distillery equipment sprites: ~25.
- Variants per equipment:
  - Normal.
  - Hotspot-highlighted.
  - Active/operating.
  - Fault state.

### UI and FX Assets
- Path node icons: locked, available, completed, mastered.
- Reward chest/badge variants.
- Highlight pulse, steam/liquid cues, confetti burst.
- Gesture callout stickers and mentor speech bubble skins.

### Audio Assets
- Ambient loop per facility.
- UI SFX: click, correct, incorrect, unlock, reward.
- Optional mentor voice stingers (phase 2).

## 8. Technical Architecture (Repo-Ready)
### Frontend Modules
- `src/components/SipStudiosGame.tsx` -> container and route shell.
- `src/game/stateMachine.ts` -> scene and progression states.
- `src/game/challengeEngine.ts` -> challenge generation/scoring.
- `src/game/spacedRepetition.ts` -> review scheduling.
- `src/game/content/equipmentCatalog.ts` -> content definitions.
- `src/game/content/facilityNodes.ts` -> path graph.
- `src/game/ui/*` -> path view, scene view, dialogue, results.

### Backend (Supabase)
- Use existing auth profile as learner key.
- Add tables:
  - `game_facility_progress`
  - `game_node_attempts`
  - `game_equipment_mastery`
  - `game_event_log`
  - `game_content_versions`

### Admin Controls
- Admin page for:
  - enabling/disabling nodes/challenges
  - tuning challenge weight by facility
  - publishing content version
  - preview mode

## 9. Data Schemas (Initial)
```ts
export type Facility = "winery" | "brewery" | "distillery";
export type MasteryState = "new" | "learning" | "proficient" | "mastered";

export type EquipmentItem = {
  id: string;
  facility: Facility;
  name: string;
  aliases: string[];
  processStage: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  controls: string[];
  safetyNotes: string[];
  commonFaults: string[];
  correctiveActions: string[];
  spriteKey: string;
  hotspotKey: string;
  tags: string[];
};

export type Challenge = {
  id: string;
  type: "hotspot" | "sequence" | "function-match" | "fault-diagnosis" | "safety-check";
  facility: Facility;
  targetEquipmentIds: string[];
  prompt: string;
  options: string[];
  correctOptionIndexes: number[];
  explanation: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
};
```

## 10. UX/UI Requirements
- Mobile-first touch interactions.
- Desktop keyboard support for accessibility.
- Reduced motion mode support.
- Maximum two taps to start a challenge from node entry.
- Persistent "You are here" indicator on facility path.

## 11. Performance Requirements
- Target 60fps desktop, minimum 30fps mid-range mobile.
- Lazy-load facility bundles and scene textures.
- Preload immediate next node assets in background.
- Keep first contentful interactive paint under 2.5s on standard broadband.

## 12. Telemetry and Analytics
Track:
- `node_started`
- `challenge_answered`
- `challenge_failed`
- `node_completed`
- `equipment_mastered`
- `practice_mistakes_opened`
- `session_ended`

Use analytics to tune:
- difficulty progression
- distractor quality
- dropout nodes

## 13. QA and Acceptance
### Functional
- All nodes unlock only under defined rules.
- Correct answers and scoring are deterministic.
- Retry flows and resume flows preserve progress.

### Educational
- Equipment purpose text validated by SME.
- Fault diagnosis options are realistic and non-ambiguous.
- Process sequencing aligns with accepted production workflows.

### Technical
- No blocking runtime errors.
- Save/load state resilient to refresh and reconnect.
- Accessibility pass for keyboard and screen reader labels.

## 14. Delivery Plan
### Phase 0: Discovery and Spec (3-5 days)
- Finalize learning outcomes and facility content schema.
- Approve wireframes and asset style guide.

### Phase 1: Vertical Slice - Winery (2-3 weeks)
- Path node flow + 1 full facility.
- 3 challenge types.
- Progress save/load and basic rewards.

### Phase 2: Brewery + Distillery (2-4 weeks)
- Add remaining facility content and scenes.
- Add fault diagnosis and safety check modes.

### Phase 3: Polish and Scale (1-3 weeks)
- Art/audio polish.
- Spaced repetition tuning.
- Analytics instrumentation and tuning.
- QA hardening.

## 15. Immediate Asset Request Checklist
### Characters
- Mentor concept sheets x3.
- Turnarounds (6 angles each) x3.
- Gesture sheets (8 states each) x3.
- Dialogue portraits (4 moods each) x3.

### Environments
- Facility hub backgrounds x3.
- Sub-scene backgrounds x9 to x12.
- Lighting/highlight overlays per scene.

### Equipment
- Equipment sprite set x80 total target.
- Highlight and fault variants for each.

### UI/FX
- Node state icons.
- Reward badge/chest set.
- Feedback animations and particle sheets.

## 16. Risk Register
- Content bottleneck from SME validation.
- Asset production delays.
- Overly long challenge sessions reducing completion.
- Difficulty imbalance across facilities.

Mitigations:
- Start with reduced "must-have" equipment list per facility.
- Ship vertical slice first and tune with telemetry.
- Keep challenge templates reusable and data-driven.
