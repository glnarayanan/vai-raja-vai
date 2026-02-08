# Implementation Prompt: Vai Raja Vai

Build a web-based simulation game called **Vai Raja Vai** using React, Tailwind CSS, and Framer Motion. This game adapts the 2002 Tamil film *Panchatanthiram* into an interactive logic puzzle where players must maintain consistent lies across multiple NPCs. Refer to the more detailed /documentation/prd.md when you need more information, logic examples, and information - it's your gospel but also think on your own. 

---

## Tech Stack & Setup

**Core Technologies:**
- React 18+ (use Vite for scaffolding)
- Tailwind CSS 3+ with custom color palette
- Framer Motion for animations
- No backend (fully client-side)

**Package Installation:**
```bash
npm create vite@latest vai-raja-vai -- --template react
cd vai-raja-vai
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion
```

---

## Critical Implementation Requirements

### 1. State Management & Logic Engine

**The Logic Ledger** (Core state management):
- Implement a centralized state manager (React Context or Zustand) for the **FactLedger**
- Store all player dialogue choices as Fact objects:

```javascript
{
  id: "fact_001",
  subject: "Bangalore Trip",
  statement: "We were at a temple",
  witnesses: ["Wife_Mythili", "Friend_Ayyappan"],
  timestamp: "16:00",
  location: "Living Room",
  consistency_tags: ["location", "activity", "associates"],
  immutable: false,
  created_at: Date.now()
}
```

**The Consistency Engine**:
Implement `validateConsistency()` function that runs after every player choice to detect:

1. **Spatial Collision**: Same timestamp, different locations to different NPCs
2. **Temporal Collision**: Two places at same time
3. **Association Collision**: Friend's knowledgeBase contradicts player statement

```javascript
const validateConsistency = (newFact, existingFacts, friendKnowledgeBases) => {
  // Check for facts with same timestamp
  const timeConflicts = existingFacts.filter(f => 
    f.timestamp === newFact.timestamp && 
    f.id !== newFact.id
  );
  
  // Spatial: Different locations at same time
  const spatialCollisions = timeConflicts.filter(f =>
    f.consistency_tags.includes('location') &&
    f.statement !== newFact.statement
  );
  
  // Temporal: Check if locations are geographically impossible
  // Association: Cross-reference with friend knowledgeBases
  
  return {
    hasCollision: spatialCollisions.length > 0,
    collisionType: 'SPATIAL', // or TEMPORAL or ASSOCIATION
    conflictingFacts: spatialCollisions
  };
};
```

**localStorage Persistence**:
- Auto-save after every player choice, Evidence use, or scene transition
- Save structure:
```javascript
{
  gameVersion: "1.0.0",
  savedAt: Date.now(),
  currentScene: "UGADI_PARTY",
  globalSuspicion: 45,
  playerStats: { confidence: 65, technicalityCount: 3 },
  factLedger: [...],
  wives: [...],
  friends: [...],
  inventory: [...]
}
```
- On load: Check for existing save, offer "Continue" or "New Game"

---

### 2. NPC System

**Create 5 Wife NPCs** with individual suspicion meters:
```javascript
{
  id: "wife_mythili",
  name: "Mythili",
  suspicion: 0, // 0-100
  intelligence: 90, // Affects how easily she's fooled
  suspicionGainRate: 5, // % per inconsistency
  knowledgeBase: [] // Facts she's heard
}
```

**Create 4 Friend NPCs** with reliability stats:
```javascript
{
  id: "friend_ayyappan",
  name: "Ayyappan Nair",
  reliability: 80, // 0-100, decreases with alcohol
  alcohol_level: 0, // Increases during party scene
  lastSyncedAt: null, // Timestamp of last Vai Raja Vai sync
  knowledgeBase: [], // Synced facts from player
  failureStyle: "OVER_EXPLAINER" // OVER_EXPLAINER | NERVOUS | AGREEABLE | LOOSE_CANNON
}
```

**The Chaotic Blurt Engine**:
```javascript
const getChaoticBlurt = (friend, subject, playerLie) => {
  if (friend.reliability < 30 || friend.alcohol_level > 3) {
    // Pull from ChaoticPool based on subject
    const blurts = chaoticPool[subject][friend.failureStyle];
    return blurts[Math.floor(Math.random() * blurts.length)];
  }
  return "Yeah, what he said."; // Safe response
};

// ChaoticPool data structure
const chaoticPool = {
  location: {
    OVER_EXPLAINER: [
      "The temple at exactly 3:47 PM. It was 23 degrees...",
      // More variants
    ],
    LOOSE_CANNON: [
      "Budget? Then why did the room have a gold-plated bathtub?",
      // More variants from PRD table
    ]
    // ... other failure styles
  }
  // ... other subjects
};
```

**Un-synced Friend Behavior**:
When a friend interacts with a wife and hasn't been synced (via Vai Raja Vai):
- 70% chance to blurt from ChaoticPool
- If blurt contradicts player lie → trigger **Panic Cascade**

---

### 3. The "Vai Raja Vai" Sync Mechanic

**Implementation**:
```javascript
const syncFriends = () => {
  // Update all friends' knowledgeBases
  friends.forEach(friend => {
    friend.knowledgeBase = [...playerFactLedger];
    friend.lastSyncedAt = Date.now();
  });
  
  // 10% Leakage Risk
  if (Math.random() < 0.10) {
    triggerLeakage(); // Screen flash, Mythili's eyes narrow
    globalSuspicion += 20;
    showStatus("Wife Overheard!");
  }
  
  // Set 60-second cooldown
  setVaiRajaVaiCooldown(60000);
};
```

**UI Requirements**:
- Button styled with Lemon Lime (#BEF264) gradient
- Pulsing animation when available
- Disabled during cooldown (show timer)
- Visual feedback on leakage (yellow screen flash)

---

### 4. Alcohol Modifier (Party Scene)

**Mechanism**:
- During "Ugadi Party" scene, auto-increment friend `alcohol_level` every 2-3 minutes
- Each drink decreases `reliability` by 5%
- UI shows friend reliability with color coding:
  - Green: > 60%
  - Yellow: 40-60%
  - Red: < 40%

**Effect on Blurting**:
```javascript
if (friend.reliability < 40 || friend.alcohol_level > 3) {
  // Bypass synced knowledgeBase
  // Pull from ChaoticPool instead
  return getChaoticBlurt(friend, subject, playerLie);
}
```

---

### 5. Evidence System

**Three Evidence Items**:

1. **Cell Phone** (Acquired: Scene 1)
   - Action: "Show Call Log"
   - Effect: Locks location for last 2 in-game hours, clears Spatial Collisions
   - Usage limit: 3 times before it becomes suspicious
   
2. **Maragadham Diamond** (In inventory from start)
   - Status: Hidden (must stay hidden to win cleanly)
   - Passive: +20% success on "Double Down" options
   - Risk: Leakage causes double suspicion (40% instead of 20%)
   - If discovered: Instant Game Over → International Fugitive
   
3. **Maggi Photo** (Acquired: Scene 2, random find during party)
   - Action: "Present Evidence"
   - Effect: Converts a Lie to Verified Fact (sets `immutable: true`)
   - Single-use item

**Evidence Lock Mechanism**:
```javascript
const lockFact = (factId, evidenceId) => {
  const fact = factLedger.find(f => f.id === factId);
  fact.immutable = true;
  fact.locked_by = evidenceId;
  
  // validateConsistency now skips immutable facts
  if (fact.immutable) return { valid: true };
};
```

**Inventory UI**:
- Tab at bottom of screen
- Shows icons: 📱 (phone), 💎 (diamond with risk indicator), 📷 (photo)
- Click to use, shows which facts are currently locked

---

### 6. High-Voltage Dialogue Mode (Recovery System)

**Trigger**: When `validateConsistency()` detects a collision or friend blurts chaotic dialogue

**Visual State**:
```jsx
<motion.div
  className="fixed inset-0 bg-fuchsia-500/20 backdrop-blur-sm"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  <motion.div
    className="border-4 border-fuchsia-500"
    animate={{
      borderColor: ['#D946EF', '#F59E0B', '#D946EF'],
    }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    {/* Recovery UI */}
  </motion.div>
</motion.div>
```

**5-Second Timer**:
- Large countdown display (font-mono, text-6xl)
- Gradient from Electric Teal → Hot Magenta as time decreases
- If timer hits 0: Suspicion +20%, trigger Panic Cascade

**Three Recovery Options**:

| Option | Effect | Success Calculation |
|--------|--------|---------------------|
| **Technicality** | -10% Suspicion | Base 40-70% depending on wife |
| **Double Down** | +15% Confidence, +5% Suspicion, updates Fact | Base 50-80%, +20% if Diamond |
| **Diversion** | Resets timer, +10% Friction | Base 30-60% |

```javascript
const calculateSuccess = (option, wife, playerConfidence, hasDiamond) => {
  let baseRate = option.baseSuccessRate[wife.id];
  baseRate += playerConfidence / 10;
  
  if (option === 'DOUBLE_DOWN' && hasDiamond) {
    baseRate += 20;
  }
  
  return Math.random() * 100 < baseRate;
};
```

**Context-Based Dialogue**:
- Track which options work against which wives
- Generate variations based on subject (location, activity, etc.)
- Example from PRD:
  - Technicality: "I didn't say 'Temple', I said 'Temple Run'!"
  - Double Down: "We went to the temple inside the pub. It's a theme bar."
  - Diversion: "Are you saying you don't trust Ayyappan?"

---

### 7. Panic Cascade Animation

When a chaotic blurt occurs:

```jsx
const triggerPanicCascade = () => {
  // 1. Wife's text bubble grows
  setWifeBubbleScale(1.2);
  
  // 2. Text becomes all caps
  setWifeTextStyle({ textTransform: 'uppercase', fontWeight: 'bold' });
  
  // 3. Suspicion spikes
  wife.suspicion += 15;
  globalSuspicion += 5;
  
  // 4. Chain reaction: other NPCs vibrate
  npcs.forEach((npc, index) => {
    setTimeout(() => {
      animateNPC(npc, {
        scale: [1, 1.2, 1],
        backgroundColor: ['#14B8A6', '#D946EF', '#14B8A6']
      });
    }, index * 200); // Stagger
  });
};
```

---

### 8. Suspicion System

**Global Suspicion Calculation**:
```javascript
const globalSuspicion = wives.reduce((sum, w) => sum + w.suspicion, 0) / wives.length;
```

**Visual Representation**:
```jsx
<div className="w-full h-4 bg-indigo-950 rounded-full overflow-hidden">
  <motion.div
    className={`h-full ${getSuspicionColor(globalSuspicion)}`}
    style={{ width: `${globalSuspicion}%` }}
    animate={{
      x: globalSuspicion > 80 ? [-1, 1, -1, 0] : 0
    }}
    transition={{
      repeat: globalSuspicion > 80 ? Infinity : 0,
      duration: 0.5
    }}
  />
</div>

const getSuspicionColor = (level) => {
  if (level < 30) return 'bg-teal-500';
  if (level < 60) return 'bg-gradient-to-r from-teal-500 to-amber-500';
  if (level < 85) return 'bg-gradient-to-r from-amber-500 to-fuchsia-500';
  return 'bg-fuchsia-500';
};
```

---

### 9. Game Flow & Scenes

**Scene Progression** (fluid based on suspicion thresholds):

1. **The Return** (Suspicion: 0-20%)
   - Setting: Home
   - NPCs: Mythili
   - Objective: Establish initial Bangalore lie
   - Evidence: Acquire Cell Phone

2. **Ugadi Party** (Suspicion: 20-60%)
   - Setting: Reddy's house
   - NPCs: All 5 wives + 4 friends
   - Objective: Keep stories straight across multiple conversations
   - Alcohol Modifier: Active
   - Evidence: Find Maggi Photo (60% chance in first 5 mins, guaranteed after 10 mins)

3. **The Confrontation** (Suspicion: 60-85%)
   - Setting: Party continues
   - NPCs: Maggie appears
   - Objective: Manage new NPC while maintaining old lies

4. **Riverbed Finale** (Suspicion: 85-100% OR triggered by events)
   - Setting: Dry riverbed
   - NPCs: Smuggler, Police
   - Special: Evidence Toss mechanic

**Scene Transition**:
```javascript
useEffect(() => {
  if (globalSuspicion > 20 && currentScene === 'THE_RETURN') {
    transitionToScene('UGADI_PARTY');
  }
  // ... other transitions
}, [globalSuspicion]);
```

---

### 10. Four Endings

Implement ending logic based on game state:

```javascript
const determineEnding = () => {
  const unresolvedCollisions = factLedger.filter(f => 
    f.hasCollision && !f.immutable
  ).length;
  
  // Best Ending
  if (globalSuspicion < 30 && unresolvedCollisions === 0 && 
      diamondStatus === 'HIDDEN') {
    return 'CLEAN_SWEEP';
  }
  
  // Alternate Win
  if (playerStats.technicalityCount >= 5 && globalSuspicion < 60) {
    return 'I_DIDNT_SAY_DANCE';
  }
  
  // Primary Fail
  if (globalSuspicion > 85 || unresolvedCollisions > 3) {
    return 'RIVERBED_RUN';
  }
  
  // Worst Ending
  if (diamondDiscovered || evidenceTossFailed) {
    return 'INTERNATIONAL_FUGITIVE';
  }
};
```

**Ending Screens**:
- **Clean Sweep**: Vibrant Saffron fade, all NPCs smiling, achievement badge
- **I Didn't Say Dance**: Word cloud of Technicalities, special achievement
- **Riverbed Run**: SVG illustration of 5 men in dry riverbed, sepia tone
- **International Fugitive**: Police sirens animation, mugshot-style avatar, Hot Magenta background

---

### 11. UI/UX Specifications

**Color Palette** (Kollywood 2002 aesthetic):
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'kollywood-midnight': '#1E1B4B',
        'kollywood-saffron': '#F59E0B',
        'kollywood-teal': '#14B8A6',
        'kollywood-magenta': '#D946EF',
        'kollywood-lime': '#BEF264',
      }
    }
  }
}
```

**Layout Components**:

1. **Header**: Scene title + Global Suspicion bar
2. **Social Hub**: NPC avatars with status indicators (synced/un-synced, drunk/sober)
3. **Dialogue Box**: Current conversation with wife
4. **Response Options**: 3-4 buttons for player choices
5. **Inventory Bar**: Evidence items + Vai Raja Vai button
6. **Friend Status Panel** (sidebar): Real-time reliability meters

**Framer Motion Animations**:

```jsx
// Suspicion meter vibration (when > 80%)
<motion.div
  animate={{ x: suspicion > 80 ? [-1, 1, -1, 0] : 0 }}
  transition={{ repeat: Infinity, duration: 0.5 }}
/>

// Vai Raja Vai button pulse
<motion.button
  animate={{
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0 0 rgba(190, 242, 100, 0.7)',
      '0 0 0 10px rgba(190, 242, 100, 0)'
    ]
  }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Vai Raja Vai
</motion.button>

// Recovery Mode zoom
<motion.div
  initial={{ scale: 1 }}
  animate={{ scale: 1.1 }}
  transition={{ duration: 0.3 }}
>
  {playerAvatar}
</motion.div>
```

**Typography**:
- Headers: `font-bold text-4xl tracking-tight`
- Dialogue: `font-medium text-lg leading-relaxed`
- UI Elements: `font-semibold text-sm uppercase tracking-wide`
- Timer: `font-mono text-6xl font-black`

---

### 12. SVG Generation Guidelines

**For Claude Code**:
Generate simple, colorful SVG illustrations for:

1. **NPC Avatars**: Abstract geometric faces with distinct colors
   - Mythili: Hot Magenta theme
   - Alice: Electric Teal theme
   - Friends: Vibrant Saffron variants

2. **Riverbed Scene**: Minimalist landscape
   - Dry riverbed with rocks
   - Moonlit sky (Deep Indigo gradient)
   - 5 silhouettes sitting

3. **Evidence Icons**:
   - Cell Phone: Simple smartphone outline
   - Diamond: Geometric crystal shape (Hot Magenta glow)
   - Photo: Polaroid-style frame

4. **Achievement Badges**: Circular badges with icons

**Style Guidelines**:
- Use color palette from spec
- Bold, high-contrast designs
- 2000s aesthetic: slight gradients, "glossy" effects
- Keep file sizes small (< 5KB per SVG)

---

### 13. Implementation Checklist

**Phase 1: Core Setup**
- [ ] Initialize Vite + React project
- [ ] Configure Tailwind with custom Kollywood palette
- [ ] Install Framer Motion
- [ ] Set up project structure (components, contexts, utils)

**Phase 2: State Management**
- [ ] Create FactLedger context
- [ ] Implement Fact schema
- [ ] Build validateConsistency() function
- [ ] Set up localStorage save/load hooks

**Phase 3: NPC System**
- [ ] Create Wife NPC component with suspicion state
- [ ] Create Friend NPC component with reliability/alcohol
- [ ] Build ChaoticPool data structure
- [ ] Implement getChaoticBlurt() logic

**Phase 4: Core Mechanics**
- [ ] Build Vai Raja Vai sync button with cooldown
- [ ] Implement Alcohol Modifier logic
- [ ] Create Evidence items (Phone, Diamond, Photo)
- [ ] Build Evidence lock mechanism

**Phase 5: UI Components**
- [ ] Social Hub layout
- [ ] Suspicion gauges (individual + global)
- [ ] Dialogue box with response options
- [ ] Inventory bar
- [ ] Friend status panel

**Phase 6: High-Voltage Mode**
- [ ] Recovery Mode UI overlay
- [ ] 5-second countdown timer
- [ ] Three recovery options with success calculation
- [ ] Context-based dialogue variations

**Phase 7: Scenes & Flow**
- [ ] Scene 1: The Return
- [ ] Scene 2: Ugadi Party
- [ ] Scene 3: The Confrontation
- [ ] Scene 4: Riverbed Finale
- [ ] Scene transition logic

**Phase 8: Endings**
- [ ] Ending determination logic
- [ ] Clean Sweep screen
- [ ] I Didn't Say Dance screen
- [ ] Riverbed Run screen (with SVG)
- [ ] International Fugitive screen

**Phase 9: Animations**
- [ ] Suspicion meter vibration
- [ ] Panic Cascade chain reaction
- [ ] Vai Raja Vai pulse
- [ ] Recovery Mode zoom
- [ ] Screen flash effects

**Phase 10: Polish**
- [ ] Generate all SVG assets
- [ ] Add sound effects (optional, with mute toggle)
- [ ] Implement accessibility features
- [ ] Test save/load persistence
- [ ] Cross-browser testing
- [ ] Performance optimization

---

## Key Technical Notes

### Performance Optimization
- Lazy load Framer Motion components
- Use React.memo for NPC components
- Debounce localStorage writes (but ensure save on critical actions)
- Optimize SVG rendering with React.lazy

### localStorage Best Practices
```javascript
// Save wrapper with error handling
const saveGame = (gameState) => {
  try {
    localStorage.setItem('vai-raja-vai-save', JSON.stringify(gameState));
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    return false;
  }
};

// Load with validation
const loadGame = () => {
  try {
    const saved = localStorage.getItem('vai-raja-vai-save');
    if (!saved) return null;
    
    const gameState = JSON.parse(saved);
    
    // Version check
    if (gameState.gameVersion !== CURRENT_VERSION) {
      console.warn('Save version mismatch');
      return null;
    }
    
    return gameState;
  } catch (e) {
    console.error('Load failed:', e);
    return null;
  }
};
```

### Collision Detection Optimization
```javascript
// Index facts by timestamp for faster lookup
const factsByTimestamp = useMemo(() => {
  return factLedger.reduce((acc, fact) => {
    if (!acc[fact.timestamp]) acc[fact.timestamp] = [];
    acc[fact.timestamp].push(fact);
    return acc;
  }, {});
}, [factLedger]);
```

### Friend Sync Status Tracking
```javascript
// Helper to check if friend needs sync
const needsSync = (friend) => {
  if (!friend.lastSyncedAt) return true;
  
  // Check if any new facts created since last sync
  const newFacts = factLedger.filter(f => 
    f.created_at > friend.lastSyncedAt
  );
  
  return newFacts.length > 0;
};
```

---

## Final Notes

**Critical Success Factors**:
1. **Collision detection must be robust** - this is the core game loop
2. **localStorage must save after EVERY choice** - no progress loss
3. **Vai Raja Vai timing is crucial** - cooldown should feel strategic, not punishing
4. **Recovery Mode must be dramatic** - this is the high-stakes moment
5. **Endings must feel earned** - reflect player's strategic choices

**Balancing Guidelines**:
- Initial playthrough should be challenging but winnable
- Technicality should feel clever, not cheap
- Alcohol Modifier should create chaos but not be unfair
- Diamond risk/reward should be meaningful choice

**Testing Priorities**:
1. Can you reach all 4 endings?
2. Does localStorage persist across page refresh?
3. Do collisions trigger correctly?
4. Is Vai Raja Vai cooldown working?
5. Do un-synced friends blurt appropriately?

---

**Build with the spirit of early 2000s Kollywood chaos, modern React best practices, and a healthy respect for the absurdity of maintaining a house of lies. Vai Raja Vai!**