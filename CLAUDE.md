# Vai Raja Vai - Movie-Faithful Edition (v3.0)

## Architecture
React 19 + Tailwind CSS v4 + Framer Motion + Zustand game.
Single-page client-side app (no backend). State persisted to localStorage.

## Quick Commands
```bash
npm run dev    # Dev server at :5173
npm run build  # Production build
```

## GitHub Pages Deployment
Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`).
- Pushes to `main` branch trigger automatic deployment
- The built site is served from `/vai-raja-vai/` base path
- `.nojekyll` file prevents Jekyll processing (required for JSX syntax in docs)

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

## Design Context

### Users
Both Tamil cinema fans (who recognize Panchatanthiram references) and casual interactive fiction players. Relaxed play sessions — narrative tension through writing and choice, not visual overload. Reward film knowledge without requiring it.

### Brand Personality
**Dramatic, Witty, Cinematic.** Thriller tension with sharp comedy — serious chaos caused by well-meaning idiots. The UI should feel authored and literary, like a well-designed book, not a software interface.

### Aesthetic Direction
- **Visual tone**: Warm editorial. Light paper/cream base. Think 80 Days meets a Penguin paperback — typographic confidence, generous whitespace, restrained color used with purpose.
- **References**: 80 Days (Inkle) for literary elegance, warm palette, and stat-tracking UI. Reigns for minimal, decisive choice presentation with wit.
- **Anti-references**: Cyberpunk/neon/glassmorphism, vibe-coded dark UIs, generic visual novel templates, anything with backdrop-blur + glow shadows.
- **Theme**: Light mode. Warm, textured, editorial. Color is an accent, not the foundation.

### Design Principles
1. **Editorial, not engineered** — The game should feel like a beautifully typeset book, not an app. Typography and spacing do the heavy lifting.
2. **Less is tension** — Restraint creates suspense. A single red number on a cream page is more alarming than a glowing neon meter.
3. **Wit in the details** — Humor lives in microcopy, timing, and character voice — never in visual noise.
4. **Choices feel weighty** — Generous space around options. Let the player sit with the decision. No visual clutter competing for attention.
5. **Color is earned** — Mostly neutral palette. Color appears sparingly to signal state changes, danger, or key moments — making it meaningful when it does appear.

### Color System (Target — warm editorial)
| Token | Hex | Role |
|-------|-----|------|
| `paper` | `#FAF6F1` | Base background — warm off-white |
| `ink` | `#2C2418` | Primary text — warm near-black |
| `ink-light` | `#6B5D4D` | Secondary text, labels |
| `ink-faint` | `#B8AD9E` | Tertiary text, borders |
| `saffron` | `#D97706` | Primary accent — warmth, titles, key moments |
| `danger` | `#B91C1C` | Suspicion spikes, critical states |
| `calm` | `#0F766E` | Safe states, resolved tension |
| `surface` | `#F0EBE3` | Cards, elevated surfaces |

### Animation Language
- Subtle and purposeful — no gratuitous motion
- Typewriter effect for dialogue (keeps literary feel)
- Simple fades and slides for transitions (no spring physics bouncing)
- State changes through color shifts, not shaking/glowing
- Respect `prefers-reduced-motion`

### Accessibility
- Standard best practices: good contrast on light backgrounds, keyboard nav, screen reader support
- Light theme naturally provides better readability
- No strict WCAG target but warm ink-on-paper palette should exceed AA contrast

## Key Docs
| Doc | Path |
|-----|------|
| Original Plot | `documentation/original-movie-plot.md` |
| PRD | `documentation/prd.md` |
| Brainstorm | `docs/brainstorms/2026-02-09-movie-faithful-rewrite-brainstorm.md` |
