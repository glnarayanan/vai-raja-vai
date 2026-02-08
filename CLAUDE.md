# Vai Raja Vai - The Lie-Chain Orchestrator

## Architecture
React 19 + Tailwind CSS v4 + Framer Motion + Zustand game.
Single-page client-side app (no backend). State persisted to localStorage.

## Quick Commands
```bash
cd vai-raja-vai && npm run dev    # Dev server at :5173
cd vai-raja-vai && npm run build  # Production build
```

## Project Structure
```
vai-raja-vai/src/
├── store/gameStore.js          # Zustand store (all game state + logic)
├── data/chaoticPool.js         # NPC blurt dialogue bank
├── components/
│   ├── TitleScreen.jsx         # Start menu
│   ├── ui/                     # Reusable UI (Header, DialogueBox, etc.)
│   ├── scenes/                 # 4 game scenes + SceneManager
│   └── endings/                # 4 ending screens + EndingScreen wrapper
└── App.jsx                     # Root: routes scenes, manages VRV + inventory
```

## Key Docs
| Doc | Path |
|-----|------|
| PRD | `documentation/prd.md` |
| Implementation Spec | `documentation/implementation-prompt.md` |
