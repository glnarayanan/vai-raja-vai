import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GAME_VERSION = "3.0.0";
const SAVE_KEY = "vai-raja-vai-save-v3";
const MANUAL_SAVE_KEY = "vai-raja-vai-manual-save-v3";
const SCENES = [
  "TITLE",
  "THE_FLIGHT",
  "THE_MISUNDERSTANDING",
  "BANGALORE_BIRTHDAY",
  "THE_AFTERMATH",
  "UGADI_PARTY",
  "THE_CONFRONTATION",
  "THE_BRIDGE",
  "ENDING",
];

// ---------------------------------------------------------------------------
// Initial state factory — always returns a fresh copy
// ---------------------------------------------------------------------------

const createInitialState = () => ({
  // Game meta
  gameVersion: GAME_VERSION,
  currentScene: "TITLE",
  endingQuality: null, // CINEMATIC | RELIEVED | BY_A_THREAD | BARELY_MADE_IT
  gameStarted: false,
  gameStartTime: null,

  // Mythili suspicion (single 0-100 meter)
  mythiliSuspicion: 0,

  // Friends (4 NPCs — panic replaces reliability/alcohol)
  friends: [
    {
      id: "friend_ayyappan",
      name: "Ayyappan Nair",
      failureStyle: "OVER_EXPLAINER",
      panic: 0,
      calmed: false,
    },
    {
      id: "friend_vedham",
      name: "Vedham",
      failureStyle: "NERVOUS",
      panic: 0,
      calmed: false,
    },
    {
      id: "friend_hegde",
      name: "Hegde",
      failureStyle: "AGREEABLE",
      panic: 0,
      calmed: false,
    },
    {
      id: "friend_reddy",
      name: "Reddy",
      failureStyle: "LOOSE_CANNON",
      panic: 0,
      calmed: false,
    },
  ],

  // Choice cascade tracking
  choices: {
    personality: null,
    weddingToast: null,
    rescueMethod: null,
    explanationToMythili: null,
    wrongRoom: null,
    refusalStyle: null,
    policeStance: null,
    disposalCare: null,
    diamondHiding: null,
    friendCalming: {},
    partyPrep: null,
    mythiliConversation: null,
    maggieResponse: null,
    smugglerResponse: null,
    smugglerHandling: null,
    mythiliArrival: null,
    bridgeApproach: null,
    bridgeDialogue: null,
    mythiliCall: null,
    mrsNairResponse: null,
    smugglerEvidence: null,
  },

  // Fact ledger (simplified — no per-wife toldTo)
  factLedger: [],

  // Inventory
  inventory: [
    {
      id: "item_diamond",
      name: "Maragadham Diamond",
      status: "HIDDEN",
      acquired: false,
    },
  ],

  // Current dialogue state
  currentDialogue: null,

  // Panic alert (friend leak notification)
  currentPanicAlert: null, // { friendId, friendName, leakText }

  // Recap events for ending screen
  recapEvents: [],
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const generateId = () =>
  `fact_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

const useGameStore = create(
  persist(
    (set, get) => ({
      // Spread initial state
      ...createInitialState(),

      // =====================================================================
      // Mythili Suspicion
      // =====================================================================
      updateMythiliSuspicion: (amount) => {
        set((state) => ({
          mythiliSuspicion: clamp(state.mythiliSuspicion + amount, 0, 100),
        }));
      },

      // =====================================================================
      // Friend Panic
      // =====================================================================
      updateFriendPanic: (friendId, amount) => {
        set((state) => ({
          friends: state.friends.map((f) =>
            f.id === friendId
              ? { ...f, panic: clamp(f.panic + amount, 0, 100) }
              : f
          ),
        }));
      },

      calmFriend: (friendId, method) => {
        const reduction = method === "threaten" ? 15 : method === "reassure" ? 20 : 18;
        set((state) => ({
          friends: state.friends.map((f) =>
            f.id === friendId
              ? { ...f, calmed: true, panic: clamp(f.panic - reduction, 0, 100) }
              : f
          ),
          choices: {
            ...state.choices,
            friendCalming: {
              ...state.choices.friendCalming,
              [friendId]: method,
            },
          },
        }));
      },

      // =====================================================================
      // Friend Leak Roll
      // =====================================================================
      rollFriendLeak: (friendId) => {
        const { friends } = get();
        const friend = friends.find((f) => f.id === friendId);
        if (!friend) return { leaked: false, leakText: null };

        // panic>70 = guaranteed leak, panic>40 = possible, else no leak
        if (friend.panic <= 40) return { leaked: false, leakText: null };
        if (friend.panic > 70 || Math.random() < (friend.panic - 40) / 40) {
          const leakTexts = {
            OVER_EXPLAINER: "Actually, let me explain — it wasn't really what it looked like in Bangalore...",
            NERVOUS: "I... we... nothing happened! Why would you even... I need water.",
            AGREEABLE: "Yes, yes, exactly! Wait — what did you ask? Yes to that too!",
            LOOSE_CANNON: "Who told you about the body?! I mean — what body? There's no body!",
          };
          return {
            leaked: true,
            leakText: leakTexts[friend.failureStyle] || "Something slipped out...",
          };
        }
        return { leaked: false, leakText: null };
      },

      // =====================================================================
      // Panic Alert
      // =====================================================================
      triggerPanicAlert: (alert) => {
        set({ currentPanicAlert: alert });
        setTimeout(() => {
          useGameStore.setState({ currentPanicAlert: null });
        }, 3000);
      },

      // =====================================================================
      // Choice Cascade
      // =====================================================================
      setChoice: (key, value) => {
        set((state) => ({
          choices: { ...state.choices, [key]: value },
        }));
      },

      getChoice: (key) => {
        return get().choices[key] ?? null;
      },

      // =====================================================================
      // Fact Ledger
      // =====================================================================
      addFact: (fact) => {
        const enrichedFact = {
          id: generateId(),
          createdAt: Date.now(),
          immutable: false,
          ...fact,
        };
        set((state) => ({
          factLedger: [...state.factLedger, enrichedFact],
        }));
        return enrichedFact;
      },

      lockFact: (factId, evidenceId) => {
        set((state) => ({
          factLedger: state.factLedger.map((fact) =>
            fact.id === factId
              ? { ...fact, immutable: true, evidenceId }
              : fact
          ),
        }));
      },

      // =====================================================================
      // Inventory
      // =====================================================================
      acquireEvidence: (itemId) => {
        set((state) => {
          const exists = state.inventory.some((item) => item.id === itemId);
          if (exists) {
            return {
              inventory: state.inventory.map((item) =>
                item.id === itemId ? { ...item, acquired: true } : item
              ),
            };
          }
          return {
            inventory: [
              ...state.inventory,
              { id: itemId, name: itemId, status: "HIDDEN", acquired: true },
            ],
          };
        });
      },

      useEvidence: (itemId, factId) => {
        const { inventory } = get();
        const item = inventory.find((i) => i.id === itemId);
        if (!item || !item.acquired) {
          return { success: false, reason: "Item not in inventory." };
        }
        get().lockFact(factId, itemId);
        return { success: true };
      },

      // =====================================================================
      // Scene Transitions
      // =====================================================================
      transitionScene: (sceneId) => {
        if (!SCENES.includes(sceneId)) {
          console.warn(`[gameStore] Invalid scene: "${sceneId}"`);
          return;
        }
        set({
          currentScene: sceneId,
          currentDialogue: null,
        });
      },

      setCurrentDialogue: (dialogue) => {
        set({ currentDialogue: dialogue });
      },

      // =====================================================================
      // Ending System
      // =====================================================================
      determineEndingQuality: () => {
        const { mythiliSuspicion } = get();
        if (mythiliSuspicion < 40) return "CINEMATIC";
        if (mythiliSuspicion < 60) return "RELIEVED";
        if (mythiliSuspicion < 85) return "BY_A_THREAD";
        return "BARELY_MADE_IT";
      },

      triggerEnding: () => {
        const quality = get().determineEndingQuality();
        set({
          endingQuality: quality,
          currentScene: "ENDING",
          currentDialogue: null,
        });
      },

      getEndingRecap: () => {
        const state = get();
        const duration = state.gameStartTime
          ? Date.now() - state.gameStartTime
          : 0;

        return {
          duration,
          mythiliSuspicion: Math.round(state.mythiliSuspicion),
          endingQuality: state.endingQuality,
          choices: { ...state.choices },
          friends: state.friends.map((f) => ({
            name: f.name,
            panic: f.panic,
            calmed: f.calmed,
            failureStyle: f.failureStyle,
          })),
          recapEvents: [...state.recapEvents],
          factsTotal: state.factLedger.length,
        };
      },

      // =====================================================================
      // Recap Events
      // =====================================================================
      trackRecapEvent: (event) => {
        set((state) => ({
          recapEvents: [
            ...state.recapEvents,
            { ...event, timestamp: Date.now() },
          ],
        }));
      },

      // =====================================================================
      // Game Lifecycle
      // =====================================================================
      startNewGame: () => {
        set({
          ...createInitialState(),
          gameStarted: true,
          currentScene: "THE_FLIGHT",
          gameStartTime: Date.now(),
        });
      },

      saveGame: () => {
        try {
          const state = get();
          const serializable = {
            gameVersion: state.gameVersion,
            currentScene: state.currentScene,
            endingQuality: state.endingQuality,
            gameStarted: state.gameStarted,
            gameStartTime: state.gameStartTime,
            mythiliSuspicion: state.mythiliSuspicion,
            friends: state.friends,
            choices: state.choices,
            factLedger: state.factLedger,
            inventory: state.inventory,
            currentDialogue: state.currentDialogue,
            currentPanicAlert: state.currentPanicAlert,
            recapEvents: state.recapEvents,
          };
          localStorage.setItem(MANUAL_SAVE_KEY, JSON.stringify(serializable));
          return { success: true };
        } catch (error) {
          console.error("[gameStore] Save failed:", error);
          return { success: false, error: error.message };
        }
      },

      loadGame: () => {
        try {
          const raw = localStorage.getItem(MANUAL_SAVE_KEY);
          if (!raw) {
            return { success: false, reason: "No save data found." };
          }
          const parsed = JSON.parse(raw);
          if (parsed.gameVersion !== GAME_VERSION) {
            return {
              success: false,
              reason: `Save version mismatch. Expected ${GAME_VERSION}, got ${parsed.gameVersion}.`,
            };
          }
          set(parsed);
          return { success: true };
        } catch (error) {
          console.error("[gameStore] Load failed:", error);
          return { success: false, error: error.message };
        }
      },

      hasSaveGame: () => {
        try {
          const raw = localStorage.getItem(MANUAL_SAVE_KEY);
          if (!raw) return false;
          const parsed = JSON.parse(raw);
          return parsed.gameVersion === GAME_VERSION;
        } catch {
          return false;
        }
      },
    }),

    // -----------------------------------------------------------------------
    // Persist middleware configuration
    // -----------------------------------------------------------------------
    {
      name: SAVE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        gameVersion: state.gameVersion,
        currentScene: state.currentScene,
        endingQuality: state.endingQuality,
        gameStarted: state.gameStarted,
        gameStartTime: state.gameStartTime,
        mythiliSuspicion: state.mythiliSuspicion,
        friends: state.friends,
        choices: state.choices,
        factLedger: state.factLedger,
        inventory: state.inventory,
        currentDialogue: state.currentDialogue,
        currentPanicAlert: state.currentPanicAlert,
        recapEvents: state.recapEvents,
      }),
      version: 2,
      migrate: (persistedState, version) => {
        // v1 → v2: complete state shape change for v3.0
        if (version < 2) {
          return createInitialState();
        }
        return persistedState;
      },
    }
  )
);

export { useGameStore };
export default useGameStore;
