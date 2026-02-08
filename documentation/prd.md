# Vai Raja Vai: The Lie-Chain Orchestrator
## Product Requirements Document (PRD)

---

## 1. Project Overview

### Logline
Five friends, one "dead" body, and a million lies. Can you keep the story straight before the wives find out?

### Core Objective
Navigate a series of social encounters by maintaining a consistent narrative. Prevent the collective "Suspicion Meter" from hitting 100% and avoid logic collapses. The game adapts the plot of the 2002 Tamil film *Panchatanthiram* into an interactive logic puzzle where lies compound and truth becomes a dependency graph.

### Environment
- **Platform**: Web-browser based
- **Tech Stack**: React, Tailwind CSS, Framer Motion
- **Backend**: None (fully client-side)
- **State Persistence**: localStorage (saves after every player choice)

---

## 2. Story Context (Based on Film Plot)

The game follows Ram and his four friends (Ayyappan Nair, Vedham, Hegde, Reddy) through the chaotic aftermath of a Bangalore trip gone wrong. Key plot points:

1. **The Bangalore Trip**: Friends hire a call girl named Maggie for Ram's birthday to help him forget about his wife Mythili
2. **The "Death"**: They find Maggie apparently dead and panic-dispose of her body in a dry riverbed
3. **The Diamond**: Ram discovers diamonds in Maggie's phone, attracting dangerous smugglers
4. **The Party**: Wives plan a Ugadi party to reunite Ram and Mythili, but Maggie shows up alive demanding her diamonds
5. **The Truth**: Maggie faked her death; the diamonds belong to smugglers; chaos ensues

### Character Roster

**The Husbands (Player + 4 Friends)**
- **Ram** (Player): The protagonist trying to keep the story straight
- **Ayyappan Nair**: The over-explainer who adds too many details
- **Vedham**: Generally reliable but prone to panic
- **Hegde**: The agreeable one who says "yes" to everything
- **Reddy**: The loose cannon who mentions sensitive info randomly

**The Wives (5 NPCs)**
- **Mythili** (Ram's wife): The primary interrogator, highest suspicion sensitivity
- **Alice** (one of the friend's wives)
- **Others** (3 more wives to be named during implementation)

**Other NPCs**
- **Maggie/Maragathavalli**: The "dead" call girl who reappears
- **The Smuggler**: Diamond owner (appears in final act)
- **Undercover Inspector**: Police presence in finale

---

## 3. The Logic Ledger (Technical Engine)

The "Brain" of the game is a **Consistency-Validation Engine** that treats "Truth" as a variable and "Lies" as a dependency graph.

### A. The Fact Schema

Every dialogue choice creates a **Fact** object stored in global React state:

```json
{
  "id": "fact_001",
  "subject": "Bangalore Trip",
  "statement": "We were at a temple",
  "witnesses": ["Wife_Mythili", "Friend_Ayyappan"],
  "timestamp": "16:00",
  "location": "Living Room",
  "consistency_tags": ["location", "activity", "associates"],
  "immutable": false,
  "created_at": 1234567890
}
```

**Field Descriptions:**
- `id`: Unique identifier for the fact
- `subject`: Topic category for collision detection
- `statement`: The actual lie told
- `witnesses`: Array of NPCs who heard this version
- `timestamp`: In-game time when statement was made
- `location`: Where the lie was told (affects spatial collision)
- `consistency_tags`: Categories used for validation
- `immutable`: If true, locked by Evidence and cannot be overridden
- `created_at`: Unix timestamp for ordering

### B. Collision Detection Logic

The `validateConsistency()` function runs after every player choice to check for three failure types:

#### 1. Spatial Collision
**Definition**: Claiming to be at Location A to NPC X, but Location B to NPC Y for the same timestamp.

**Example**: 
- To Mythili: "We were at a temple at 4 PM"
- To Alice: "We were at a pub at 4 PM"

**Detection Logic**:
```javascript
facts.filter(f => f.timestamp === currentTime && f.consistency_tags.includes('location'))
  .map(f => f.statement)
  .filter((v, i, a) => a.indexOf(v) !== i) // Find duplicates with different statements
```

#### 2. Temporal Collision
**Definition**: Claiming to be in City A and City B at the same time.

**Example**:
- "We were in Bangalore at 3 PM"
- "We were in Chennai at 3 PM"

**Detection Logic**: Check if any two facts with the same timestamp reference conflicting locations in their statements.

#### 3. Association Collision
**Definition**: Claiming Friend A was with you, while Friend A's `knowledgeBase` indicates they were elsewhere.

**Example**:
- Player to Mythili: "Ayyappan was with me at the temple"
- Ayyappan's wife already questioned him; his KnowledgeBase says: "I was at the pub"

**Detection Logic**: Cross-reference player statements with friend `knowledgeBase` entries for the same time period.

---

## 4. Game Progression Structure

The game flows through **suspicion-based thresholds** rather than discrete levels. However, the narrative follows these key scenes:

### Scene Structure

1. **The Return (Suspicion: 0-20%)**
   - Setting: Home
   - NPCs: Mythili primarily
   - Objective: Establish the initial lie about Bangalore
   - Evidence available: Cell Phone (acquired here)

2. **The Ugadi Party (Suspicion: 20-60%)**
   - Setting: Reddy's house, multiple rooms
   - NPCs: All 5 wives + 4 friends
   - Objective: Keep stories straight across multiple conversations
   - Alcohol Modifier: Active
   - Evidence available: Maggi Photo (found during party)

3. **The Confrontation (Suspicion: 60-85%)**
   - Setting: Party continues, tension escalates
   - NPCs: Maggie appears, demanding diamonds
   - Objective: Manage new NPC while maintaining old lies
   - Evidence available: Maragadham Diamond (in inventory throughout)

4. **The Riverbed Finale (Suspicion: 85-100% OR triggered by events)**
   - Setting: The dry riverbed location
   - NPCs: Smuggler, Police, all wives
   - Objective: Final resolution
   - Special Mechanic: Evidence Toss

---

## 5. Advanced Game Mechanics

### A. "Vai Raja Vai" Sync Mechanic

A UI button labeled **"Vai Raja Vai"** allows the player to pull friends aside and sync their stories.

**Visual**: Lemon Lime (#BEF264) button with gradient, pulses when available

**Mechanism**: 
```javascript
// Attempts to map Player.currentLies -> Friend.KnowledgeBase
friends.forEach(friend => {
  friend.knowledgeBase = [...playerFactLedger];
  friend.lastSyncedAt = Date.now();
});
```

**Cooldown**: 60 seconds (in-game time) between syncs to prevent spam

**Leakage Risk**: 10% chance a Wife NPC "overhears" the sync conversation

**Leakage Logic**:
```javascript
if (Math.random() < 0.10) {
  triggerStatus("Wife Overheard!");
  suspicion += 20;
  // UI: Screen flashes yellow, Mythili's avatar narrows eyes
  // Play audio cue: low bass hum
}
```

**Un-synced State**: 
- If a friend is cornered by a wife while "Un-synced" (hasn't been updated via Vai Raja Vai), there's a **70% chance** they blurt a "Random Fact"
- This triggers a **Panic Cascade** (see below)

### B. The "Alcohol" Modifier (Reliability Degradation)

During the **Ugadi Party** scene, the Alcohol Modifier becomes active.

**Mechanism**:
- Each friend has a `reliability` stat (starts at 100)
- Each "Drink" consumed reduces `reliability` by 5%
- Drinking happens automatically every 2-3 minutes of in-game party time
- Player can see friend reliability in UI (color-coded: Green > 60%, Yellow 40-60%, Red < 40%)

**The Blurting Logic**:
When `reliability < 40` OR `alcohol_level > 3`:
- NPC bypasses their synced `FactLedger`
- Instead pulls from the **ChaoticPool** (see below)
- 75% chance of blurting on any wife interaction

### C. The Chaotic Blurt Pool

A predefined set of dialogue that contradicts player lies. Organized by subject category.

| Character | Context (Your Lie) | The Blurt (Their Chaos) | Collision Type |
|-----------|-------------------|-------------------------|----------------|
| Hegde | "We were at a quiet temple." | "Quiet? The bass was so loud my chest was vibrating! And the priest was wearing a bikini!" | Spatial / Activity |
| Reddy | "We stayed at a budget lodge." | "Budget? Then why did the room have a gold-plated bathtub and a 'Vavvaal' hanging from the ceiling?" | Location / Item Leak |
| Ayyappan | "We didn't see any girls there." | "Exactly! Except for that one 'Maggi' girl... but she was mostly just lying on the floor not moving." | Dead Body / NPC Leak |
| Vedham | "We were in Bangalore." | "Bangalore? Is that where we were? I thought the sign said 'Welcome to the Middle of the Ocean'?" | Spatial / Reality Collapse |
| Hegde | "We took a taxi." | "A taxi with a helicopter propeller? Because I remember seeing the clouds from the sunroof!" | Temporal / Logic |
| Reddy | "We ate simple curd rice." | "The curd rice was okay, but the champagne we poured on it was chef's kiss." | Alcohol / Activity |
| Ayyappan | "The car broke down." | "It didn't break down, it just... stopped existing for a few hours. Like my memories!" | Temporal Collision |
| Hegde | "We were sleeping by 10 PM." | "Sleeping? Then who was that guy who looked like me dancing on the table at 2 AM? My twin brother, Ganesh?" | Temporal / Association |

**Implementation**:
```javascript
const getChaoticBlurt = (subject, reliability) => {
  if (reliability < 30) {
    return chaoticPool[subject][Math.floor(Math.random() * chaoticPool[subject].length)];
  }
  return "Yeah, what he said."; // The 'Safe' response
}
```

### D. The Panic Cascade

When a chaotic blurt occurs:

1. **Visual Effect**: Wife NPC's text bubble grows 20% larger
2. **Text Effect**: Wife's response appears in ALL CAPS with increased font weight
3. **Suspicion Spike**: Immediate +15% to that wife's individual suspicion
4. **Global Suspicion**: +5% to the collective meter
5. **Time Pressure**: Player has 3 seconds to select a Recovery Option (see below)
6. **Chain Reaction**: If not recovered, triggers investigations from other wives (+10% to all)

**UI Animation Sequence**:
```javascript
// 1. Blurt appears in friend's bubble
// 2. Wife's avatar zooms in (scale: 1.2)
// 3. Screen border pulses red (3 pulses over 1 second)
// 4. Recovery Mode component mounts with 3-second timer
// 5. Background dims, Recovery Options appear center-screen
```

---

## 6. Evidence Management (Truth Anchors)

The **Inventory Tab** stores physical items that interact with the Fact Schema. Using an item can "Lock" a lie as a **Verified Fact**.

**Technical Note**: When locked, the fact's `immutable` field is set to `true`, preventing `validateConsistency()` from flagging it as a collision.

### Evidence Schema

```json
{
  "id": "item_001",
  "name": "The 'Vavvaal' Diamond",
  "status": "Hidden",
  "linked_fact_id": "fact_005",
  "risk_multiplier": 2.5,
  "description": "If found, suspicion hits 100% instantly.",
  "acquired_at": null,
  "used_count": 0
}
```

### A. The Cell Phone (Acquired: Scene 1)

**Action**: "Show Call Log"

**Effect**: 
- Forges a Timestamp for a specific location
- "Locks" your current location for the last 2 in-game hours
- Clears any **Spatial Collisions** in that time window
- Can only be used 3 times before it becomes "suspicious" to wives

**UI**: Shows as a mobile phone icon, glows Lemon Lime when usable

### B. The Maragadham Diamond (In inventory from start)

**Status**: Hidden (must remain in "Hidden" status to win cleanly)

**Passive Effect**:
- While in inventory: +20% success rate on "Double Down" recovery options
- Risk: Any "Leakage" from Vai Raja Vai sync causes **double** the suspicion penalty (40% instead of 20%)
- If discovered by wives or police: **Instant Game Over** → International Fugitive ending

**UI**: Diamond icon with pulsing Hot Magenta glow, has a "risk" warning indicator

### C. The Maggi Photo (Acquired: Scene 2, during party)

**Action**: "Present Evidence"

**Effect**:
- Converts a "Lie" into a **Verified Fact**
- Once verified, NPCs will no longer question that specific detail
- Effectively "closes" that branch of the dependency graph
- Single-use item

**Acquisition Trigger**: Player finds it while exploring Reddy's house during the party

**UI**: Polaroid-style photo icon

### D. Evidence Acquisition Flow

**Cell Phone**: 
- Trigger: Scene 1 completion, Ram finds diamonds in Maggie's phone
- Narrative moment: "You discover a cache of diamonds... and a phone full of lies."

**Maggi Photo**:
- Trigger: Scene 2, player chooses to "Search the room" action
- Random chance (60%) of finding it in first 5 minutes of party
- If not found, appears automatically after 10 minutes

**Maragadham Diamond**:
- Already in inventory at game start (part of plot)
- Cannot be dropped or removed except in Riverbed Finale

---

## 7. The Evidence Toss (Finale Mechanic)

In Scene 4 (**The Riverbed Finale**), a unique action becomes available: **"Throw Evidence"**

**Logic**:
```javascript
// Check proximity of all Wife NPCs
const proximityCheck = wives.every(wife => wife.proximity < 30);

if (proximityCheck) {
  // Success: Evidence disposed, suspicion -20%
  removeFromInventory(selectedEvidence);
  suspicion -= 20;
} else {
  // Caught: Triggers International Fugitive ending
  triggerEnding('INTERNATIONAL_FUGITIVE');
}
```

**UI Flow**:
1. Riverbed scene background loads (SVG illustration)
2. "Throw Evidence" button appears (pulsing red)
3. On click: Shows proximity radar of wife locations
4. Player confirms or cancels
5. Result animation plays

---

## 8. High-Voltage Dialogue Mode (Recovery System)

When a collision is detected, the UI enters **Recovery Mode**.

### Trigger Conditions
- `validateConsistency()` returns a collision type
- A friend blurts from ChaoticPool
- Two wives compare notes and find discrepancies

### Visual State
- **Border**: Entire game container gets a pulsing red border (3px, fuchsia-500)
- **Background**: Backdrop dims to 40% opacity
- **Zoom**: Player avatar scales to 1.1x
- **Timer**: 5-second countdown appears top-center (large, bold, Electric Teal → Hot Magenta gradient as time runs out)
- **Sound**: Low bass hum plays (if audio enabled)

### Recovery Options

Player must choose one of three options within 5 seconds:

| Option | Logic Type | Stat Changes | Dialogue Example |
|--------|-----------|--------------|------------------|
| **The Technicality** | Semantic Shift | -10% Suspicion to current wife<br/>+5% Confidence | "I didn't say 'Temple', I said 'Temple Run'! It's a game we were playing at the pub." |
| **Double Down** | Fact Overwrite | +15% Confidence<br/>+5% Suspicion to current wife<br/>Updates Fact Ledger | "We went to the temple inside the pub. It's a theme bar, Mythili. Very spiritual." |
| **The Diversion** | Aggression Pivot | Resets timer<br/>+10% Friction with wife<br/>-5% Global Suspicion | "Why are you questioning the location? Are you saying you don't trust Ayyappan?" |

### Context-Based Variations

The game tracks which strategies work against which wives and adapts dialogue:

**Against Mythili** (High intelligence, hard to fool):
- Technicality: 40% success rate
- Double Down: 60% success rate (if Diamond in inventory: 80%)
- Diversion: 30% success rate

**Against Alice** (More trusting):
- Technicality: 70% success rate
- Double Down: 50% success rate
- Diversion: 60% success rate

**Success Rate Calculation**:
```javascript
const calculateSuccess = (option, wife, playerConfidence) => {
  let baseRate = option.baseSuccessRate[wife.id];
  baseRate += (playerConfidence / 10); // Confidence affects success
  
  if (option === 'DOUBLE_DOWN' && hasDiamond) {
    baseRate += 20;
  }
  
  return Math.random() * 100 < baseRate;
}
```

### Failure State

If timer reaches 0 without selection:
- **Panic Freeze**: Ram stammers, fails to respond
- **Suspicion Spike**: +20% to current wife, +10% globally
- **Cascade Risk**: 80% chance other wives join interrogation
- **If Global Suspicion > 80%**: Triggers "Riverbed Run" ending

---

## 9. NPC Personality Logic

Each friend has unique behavior patterns when **un-synced** or under the **Alcohol Modifier**.

### Ayyappan Nair (The Over-Explainer)

**Synced Behavior**: Reliable, follows player's lead

**Un-synced Behavior**:
- Adds unnecessary details: timestamps, weather, clothing descriptions
- Creates 2-3 additional Fact Objects per conversation
- Increases future collision probability by 15%

**Example**:
```
Player lie: "We visited a temple"
Ayyappan (un-synced): "Yes, the temple at exactly 3:47 PM. It was slightly overcast, 
about 23 degrees. Ram was wearing his blue shirt—the one with the small coffee stain."
```

**Alcohol Effect**: Becomes MORE detailed, talks faster, interrupts player

### Vedham (The Nervous One)

**Synced Behavior**: Stays quiet, nods agreement

**Un-synced Behavior**:
- 50% chance to panic and admit "I don't remember"
- Creates temporal inconsistencies by guessing
- If questioned twice, has 30% chance to blurt truth

**Example**:
```
Wife: "What time did you arrive in Bangalore?"
Vedham (un-synced, panicked): "I... uh... morning? Or was it evening? 
Everything's a blur!"
```

**Alcohol Effect**: Paranoia increases, may preemptively confess to avoid trouble

### Hegde (The Agreeable)

**Synced Behavior**: Confirms player statements enthusiastically

**Un-synced Behavior**:
- Says "Yes" to ANY wife question, regardless of contradiction
- Creates association collisions immediately
- Highest risk for Panic Cascade

**Example**:
```
Wife: "So you were at a temple?"
Hegde (un-synced): "Yes!"
Wife: "And also at a bar?"
Hegde (un-synced): "Yes, absolutely!"
```

**Alcohol Effect**: Agrees even MORE enthusiastically, adds random affirmations

### Reddy (The Loose Cannon)

**Synced Behavior**: Follows script but with slight improvisations

**Un-synced Behavior**:
- 40% chance to mention "Maragadham" (diamond) or "Maggi" randomly
- References plot points that haven't been revealed yet
- High risk of item leak collisions

**Example**:
```
Wife: "What did you do in Bangalore?"
Reddy (un-synced): "Oh, we just... you know... definitely didn't see any dead 
girls or find any diamonds or anything like that!"
```

**Alcohol Effect**: Volume increases, mentions taboo subjects, becomes suspicious

---

## 10. Suspicion System

### Individual Wife Suspicion

Each wife has an individual suspicion meter (0-100%):

**Mythili**: 
- Base sensitivity: High (gains +5% per minor inconsistency)
- Threshold for "danger": 60%
- At 80%: Calls other wives to verify

**Alice**:
- Base sensitivity: Medium (gains +3% per minor inconsistency)
- Threshold for "danger": 70%
- At 80%: Becomes quiet, observes carefully

**Other Wives** (3 more):
- Base sensitivity: Low-Medium (gains +2-4% per inconsistency)
- Thresholds: 65-75%

### Global Suspicion Meter

The collective suspicion of all wives:

**Formula**: 
```javascript
globalSuspicion = (wife1.suspicion + wife2.suspicion + ... + wife5.suspicion) / 5
```

**Visual Representation**:
- 0-30%: Electric Teal bar, smooth animation
- 31-60%: Gradient from Teal to Amber
- 61-85%: Gradient from Amber to Hot Magenta, bar vibrates
- 86-100%: Solid Hot Magenta, screen shake effect active

### Suspicion Modifiers

**Positive Actions** (reduce suspicion):
- Using Evidence correctly: -10% to -20%
- Successful Technicality recovery: -10%
- Long period without collisions (5+ minutes): -5%

**Negative Actions** (increase suspicion):
- Collision detected: +10% to +15%
- Chaotic blurt: +15%
- Timer expires in Recovery Mode: +20%
- Leakage from Vai Raja Vai: +20%
- Friend contradicts player: +15%

---

## 11. UI/UX Requirements

### Color Palette (Kollywood 2002 Aesthetic)

Based on provided color scheme:

| Layer | Color | Tailwind Class | Hex |
|-------|-------|----------------|-----|
| Background | Deep Indigo / Midnight | `bg-indigo-950` | #1E1B4B |
| Primary UI | Vibrant Saffron | `bg-amber-500` | #F59E0B |
| Suspicion (Safe) | Electric Teal | `bg-teal-500` | #14B8A6 |
| Suspicion (Danger) | Hot Magenta | `bg-fuchsia-500` | #D946EF |
| Accent / Action | Lemon Lime | `bg-lime-300` | #BEF264 |

### Layout Structure

```
┌─────────────────────────────────────────┐
│  Header: Scene Title + Global Suspicion │
├─────────────────────────────────────────┤
│  ┌───────────┐  ┌──────────────────┐   │
│  │           │  │   Dialogue Box    │   │
│  │  NPC      │  │                   │   │
│  │  Avatar   │  │  Wife: "Where    │   │
│  │  & Status │  │   were you?"      │   │
│  │           │  │                   │   │
│  └───────────┘  └──────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │     Player Response Options      │  │
│  │  [Temple] [Pub] [Movie Theater]  │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │  Bottom Bar: Inventory + Actions │  │
│  │  [📱] [💎] [📷]  [Vai Raja Vai]  │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Framer Motion Specifications

**Suspicion Meter Vibration**:
```javascript
// When Suspicion > 80%
animate={{
  x: [-1, 1, -1, 0],
  transition: { repeat: Infinity, duration: 0.5 }
}}
```

**Panic Cascade Animation**:
```javascript
// Trigger chain reaction on all NPC icons
npcs.forEach((npc, index) => {
  setTimeout(() => {
    npc.animate({
      scale: [1, 1.2, 1],
      backgroundColor: ['#14B8A6', '#D946EF', '#14B8A6'],
    }, {
      duration: 0.5,
    });
  }, index * 200); // Stagger by 200ms
});
```

**Recovery Mode Zoom**:
```javascript
// On collision detection
<motion.div
  initial={{ scale: 1 }}
  animate={{ scale: 1.1 }}
  transition={{ duration: 0.3 }}
>
  {playerAvatar}
</motion.div>
```

**Vai Raja Vai Button Pulse**:
```javascript
<motion.button
  animate={{
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0 0 rgba(190, 242, 100, 0.7)',
      '0 0 0 10px rgba(190, 242, 100, 0)',
    ],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
>
  Vai Raja Vai
</motion.button>
```

### Typography

- **Headers**: `font-bold text-4xl tracking-tight` (scene titles)
- **Dialogue**: `font-medium text-lg leading-relaxed` (conversations)
- **UI Elements**: `font-semibold text-sm uppercase tracking-wide` (buttons)
- **Timer**: `font-mono text-6xl font-black` (countdown in Recovery Mode)

### Responsive Design

- **Mobile-first**: Default design for 375px width
- **Tablet**: 768px breakpoint, side-by-side NPC and dialogue
- **Desktop**: 1024px breakpoint, show all friends' status simultaneously

---

## 12. Ending Logic

The game has **4 possible endings** based on Logic Ledger state and player actions:

### A. The Clean Sweep (Best Ending)

**Conditions**:
- Global Suspicion < 30%
- Zero unresolved collisions in Logic Ledger
- Maragadham Diamond status: "Hidden" OR "Returned" (to smuggler peacefully)
- All wives' individual suspicion < 50%

**Narrative**:
> "Somehow, against all odds, you kept the story straight. Mythili never discovered the truth about Bangalore. The diamonds were quietly returned. Your friends owe you more than they'll ever admit. Maybe you're not such a terrible liar after all."

**Visual**: 
- Screen fades to Vibrant Saffron
- All NPC avatars appear smiling
- "Clean Sweep" achievement badge (SVG)

### B. The "I Didn't Say Dance" Victory (Alternate Win)

**Conditions**:
- Used "The Technicality" recovery option successfully **5 or more times**
- Global Suspicion < 60%
- At least 2 collisions resolved via Technicality

**Narrative**:
> "You talked your way out of everything with pure semantic gymnastics. 'Temple Run,' 'Trance atmosphere,' 'Champagne-flavored curd rice'—your friends are in awe of your absurd explanations. The wives are confused but satisfied. Sort of."

**Visual**:
- Screen shows a "word cloud" of all your Technicalities
- Hot Magenta text highlighting the most ridiculous ones
- Special achievement: "The Wordsmith"

### C. The Riverbed Run (Primary Fail State)

**Conditions**:
- Global Suspicion > 85%
- More than 3 unresolved collisions in Logic Ledger
- OR: Timer expired in Recovery Mode 3+ times

**Narrative**:
> "The lies collapsed like a house of cards. The wives compared notes. Your friends panicked. There's only one place left to hide... the same dry riverbed where this all began. At least you're together."

**Visual**:
- SVG illustration: 5 men sitting in a dry riverbed under moonlight
- Sepia tone filter over scene
- Melancholic but humorous tone
- "Game Over" text in Vibrant Saffron

### D. The International Fugitive (Worst Ending)

**Conditions**:
- Diamond discovered by wives or police
- OR: Failed "Evidence Toss" in Riverbed scene (caught by wife)
- OR: Smuggler confrontation went wrong

**Narrative**:
> "The diamonds. The body. The lies. It all came crashing down. The police don't believe your story. Neither do the wives. You're going away for a crime you didn't even commit. Congratulations, you've achieved maximum chaos."

**Visual**:
- Police sirens flashing (red and blue SVG animation)
- Mugshot-style player avatar
- Hot Magenta background
- "Arrested" stamp

---

## 13. Save System (localStorage)

### Save Triggers

The game auto-saves after:
1. Every dialogue choice
2. Every Evidence use
3. Every Vai Raja Vai sync
4. Every Recovery Mode resolution
5. Scene transitions

### Save Data Structure

```json
{
  "gameVersion": "1.0.0",
  "savedAt": 1234567890,
  "currentScene": "UGADI_PARTY",
  "globalSuspicion": 45,
  "playerStats": {
    "confidence": 65,
    "technicalityCount": 3,
    "doubleDownCount": 1,
    "diversionCount": 2
  },
  "factLedger": [ /* Array of Fact objects */ ],
  "wives": [ /* Array of Wife NPC states */ ],
  "friends": [ /* Array of Friend NPC states */ ],
  "inventory": [ /* Array of Evidence items */ ],
  "timeline": [ /* Array of game events for replay */ ]
}
```

### Load Behavior

- **On game start**: Check for existing save in localStorage
- **If save exists**: Show "Continue" and "New Game" options
- **If "Continue"**: Load state and resume at last checkpoint
- **If "New Game"**: Clear localStorage and start fresh
- **Clear conditions**: 
  - User explicitly selects "New Game"
  - User clears browser data
  - Game version mismatch (major version change)

---

## 14. Accessibility & Polish

### Accessibility Features

- **Keyboard Navigation**: Full tab-index support for all interactive elements
- **Screen Reader**: ARIA labels on all UI components
- **Color Blind Mode**: Optional high-contrast mode (toggle in settings)
- **Text Sizing**: Respect browser zoom levels
- **Reduced Motion**: Respect `prefers-reduced-motion` media query

### Polish Elements

- **Loading States**: Skeleton screens during save/load
- **Haptic Feedback**: Vibration API on mobile for collision detection
- **Sound Design** (optional, can be muted):
  - Soft tabla drums for background ambiance
  - Bass hum for Recovery Mode
  - Coin "ding" for successful Evidence use
  - Glass shatter for Panic Cascade
- **Easter Eggs**:
  - Reference to "Maggi" in code comments
  - Hidden achievement for finding all Chaotic Blurts
  - "Vavvaal Mode" (hard mode unlocked after first completion)

---

## 15. Success Metrics (Post-Launch)

While not implemented in MVP, consider tracking:

- Average game completion rate
- Most common ending achieved
- Most used Recovery Option
- Average number of Vai Raja Vai syncs per playthrough
- Heatmap of collision types (which lies fail most)

---

## 16. Technical Constraints & Notes

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Minimum version: Chrome 90+, Firefox 88+, Safari 14+
- No IE11 support

### Performance Targets
- Initial load: < 3 seconds on 4G
- Interaction response: < 100ms
- localStorage read/write: < 50ms
- Animation frame rate: 60fps

### Bundle Size Goals
- Total bundle: < 500KB (gzipped)
- Initial JavaScript: < 200KB
- Lazy-load Framer Motion if needed

### Known Limitations
- No multiplayer support
- No backend analytics
- No cloud saves (localStorage only)
- No procedural generation (all dialogue pre-written)

---

## Appendix A: Full NPC Roster

### The Husbands

1. **Ram** (Player Character)
   - Role: Protagonist, trying to keep story straight
   - Starting Confidence: 50
   - Special Ability: Can use Evidence items

2. **Ayyappan Nair**
   - Reliability: 80 (high)
   - Failure Style: Over-explains
   - Alcohol Tolerance: Medium

3. **Vedham**
   - Reliability: 70
   - Failure Style: Nervous, panics
   - Alcohol Tolerance: Low

4. **Hegde**
   - Reliability: 60
   - Failure Style: Agrees with everything
   - Alcohol Tolerance: Low

5. **Reddy**
   - Reliability: 50
   - Failure Style: Loose cannon, mentions taboo topics
   - Alcohol Tolerance: High (but more unpredictable)

### The Wives

1. **Mythili** (Ram's wife)
   - Intelligence: 90 (highest)
   - Base Suspicion Gain: +5% per inconsistency
   - Special: Can call other wives to verify

2. **Alice**
   - Intelligence: 70
   - Base Suspicion Gain: +3% per inconsistency
   - Special: Observes quietly when suspicious

3-5. **Other Wives** (names TBD during implementation)
   - Intelligence: 60-75
   - Base Suspicion Gain: +2-4% per inconsistency

---

## Appendix B: Dialogue Flow Example

**Scene**: Early Ugadi Party
**NPCs Present**: Mythili, Alice, Ayyappan

**Mythili**: "So, how was Bangalore? I heard it was quite the trip."

**Player Options**:
1. [Safe] "It was fine, just a simple temple visit."
2. [Risky] "Actually, it was more interesting than we planned..."
3. [Deflect] "Hey, have you tried the snacks? They're great!"

**If Player chooses Option 1:**
- Creates Fact: `{subject: "Bangalore", statement: "Temple visit", witnesses: ["Mythili"]}`
- Mythili Suspicion: +2% (minor increase, but she's not fully convinced)
- Game prompts: "Ayyappan is approaching Mythili. He is UN-SYNCED."

**If Ayyappan is Un-synced**:
- 70% chance: Ayyappan blurts from ChaoticPool
- Actual: "Temple visit? Oh yeah, the temple... at 3:47 PM specifically. Very spiritual. Although I thought we were at a pub?"
- **COLLISION DETECTED**: Spatial Collision (Temple vs. Pub)
- **High-Voltage Mode** triggers

**Recovery Options Appear**:
1. **Technicality**: "He means the 'Pub'lic temple. It's a famous one!"
2. **Double Down**: "We went to both. Temple first, then pub. Very cultured."
3. **Diversion**: "Mythili, why are you interrogating us? Don't you trust us?"

**If Player chooses Technicality**:
- Success Roll: 40% (base) + 6.5% (confidence 65) = 46.5%
- If Success: Mythili Suspicion -10%, returns to Safe state
- If Fail: Mythili Suspicion +15%, she's now actively investigating

---

## Appendix C: Implementation Checklist

### Phase 1: Core Engine
- [ ] Initialize React app with Vite
- [ ] Set up Tailwind with custom color palette
- [ ] Install Framer Motion
- [ ] Create Fact Schema and Logic Ledger state management
- [ ] Implement validateConsistency() function
- [ ] Build localStorage save/load system

### Phase 2: NPC System
- [ ] Create NPC base class with knowledgeBase
- [ ] Implement Wife NPCs with individual suspicion
- [ ] Implement Friend NPCs with reliability stat
- [ ] Build ChaoticPool dialogue system
- [ ] Create getChaoticBlurt() logic

### Phase 3: UI Components
- [ ] Build Social Hub layout
- [ ] Create Suspicion Gauges (individual + global)
- [ ] Implement High-Voltage Dialogue Mode
- [ ] Design Recovery Mode UI with timer
- [ ] Build Inventory Tab
- [ ] Create Vai Raja Vai button with animation

### Phase 4: Game Flow
- [ ] Implement Scene 1: The Return
- [ ] Implement Scene 2: Ugadi Party
- [ ] Implement Scene 3: The Confrontation
- [ ] Implement Scene 4: Riverbed Finale
- [ ] Build ending screens (all 4 variants)

### Phase 5: Evidence System
- [ ] Create Evidence items (Phone, Diamond, Photo)
- [ ] Implement "Lock" mechanic (immutable facts)
- [ ] Build Evidence Toss functionality
- [ ] Add acquisition triggers

### Phase 6: Polish
- [ ] Add all Framer Motion animations
- [ ] Implement color transitions for suspicion
- [ ] Add sound effects (optional)
- [ ] Test save/load across browser refreshes
- [ ] Add accessibility features
- [ ] Optimize bundle size

### Phase 7: Testing & Balance
- [ ] Playtest Scene 1 collision detection
- [ ] Balance suspicion gain/loss rates
- [ ] Test all 4 endings are reachable
- [ ] Verify Vai Raja Vai cooldown works
- [ ] Check localStorage persistence
- [ ] Cross-browser testing

---

**End of PRD**

*Version 1.0 | February 2026*