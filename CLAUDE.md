# Vai Raja Vai - The Lie-Chain Orchestrator

## Architecture
React 19 + Tailwind CSS v4 + Framer Motion + Zustand game.
Single-page client-side app (no backend). State persisted to localStorage.

## Quick Commands
```bash
npm run dev    # Dev server at :5173
npm run build  # Production build
```

## Project Structure
```
/src/
├── store/gameStore.js          # Zustand store (all game state + logic)
├── data/
│   ├── chaoticPool.js          # NPC blurt dialogue bank (6 categories)
│   ├── dialogueContent.js      # Reference dialogue trees (all 4 scenes)
│   ├── ambushDialogues.js      # Wife ambush templates per scene/wife
│   └── chaosEvents.js          # Random chaos event definitions + floors
├── components/
│   ├── TitleScreen.jsx         # Start menu
│   ├── ui/                     # Reusable UI (Header, DialogueBox, AmbushEvent, etc.)
│   ├── scenes/                 # 4 game scenes + SceneManager
│   └── endings/                # 6 ending screens + EndingScreen + DisasterRecap
└── App.jsx                     # Root: routes scenes, manages inventory
```

## Key Systems
- **Wife Ambushes**: Timed interrupts where wives cross-reference facts (ambushDialogues.js)
- **Friend Autonomy**: Friends wander, drink, and blurt without player control (FriendAlert)
- **Chaos Events**: Unpreventable random events with per-scene minimum floors
- **Consistency Engine**: Tracks facts by topic/claim/toldTo, detects cross-wife contradictions
- **5 Endings**: CLEAN_SWEEP (~10%), SURVIVED_SOMEHOW (~25%), BUSTED (~40%), FULL_CHAOS (~20%), INTERNATIONAL_FUGITIVE (~5%)

## Key Docs
| Doc | Path |
|-----|------|
| PRD | `documentation/prd.md` |
| Implementation Spec | `documentation/implementation-prompt.md` |
