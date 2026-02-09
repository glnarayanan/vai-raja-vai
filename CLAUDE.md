# Vai Raja Vai - Movie-Faithful Edition (v3.0)

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
├── store/gameStore.js          # Zustand store (Mythili suspicion, friend panic, choices)
├── data/
│   ├── dialogueContent.js      # All 7 scenes dialogue trees (~43 nodes)
│   └── panicDialogues.js       # Friend leak strings per failureStyle × panic tier
├── components/
│   ├── TitleScreen.jsx         # Start menu
│   ├── ui/                     # Header, DialogueBox, SocialHub, PanicMeter, etc.
│   ├── scenes/                 # 7 scenes + SceneManager
│   └── endings/                # BridgeReconciliation (4 quality variants) + EndingRecap
└── App.jsx                     # Root: routes scenes, manages inventory
```

## Key Systems
- **Mythili Suspicion (0-100)**: Single meter tracking wife's trust across 7 scenes
- **Friend Panic**: 4 friends with panic levels (0-100), leak risk at party based on panic
- **Choice Cascade**: Early choices affect later scene options and outcomes
- **4 Ending Qualities**: CINEMATIC (<20), RELIEVED (20-45), BY_A_THREAD (45-70), BARELY_MADE_IT (70+)

## 7 Scenes
1. THE_FLIGHT — Hijacking, meet Mythili, wedding
2. THE_MISUNDERSTANDING — Nirmala rescue, Mythili leaves, wrong room
3. BANGALORE_BIRTHDAY — Maggie, fake death, body disposal, diamonds
4. THE_AFTERMATH — News panic, calm friends, Ugadi party prep
5. UGADI_PARTY — Mythili conversation, friend leaks, Maggie alive, smuggler kidnap
6. THE_CONFRONTATION — Smuggler hideout, Mythili arrives, pills
7. THE_BRIDGE — Bridge rescue, truth revealed, reconciliation

## Key Docs
| Doc | Path |
|-----|------|
| Original Plot | `documentation/original-movie-plot.md` |
| PRD | `documentation/prd.md` |
| Brainstorm | `docs/brainstorms/2026-02-09-movie-faithful-rewrite-brainstorm.md` |
