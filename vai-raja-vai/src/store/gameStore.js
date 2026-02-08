import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GAME_VERSION = "1.0.0";
const SAVE_KEY = "vai-raja-vai-save";
const MANUAL_SAVE_KEY = "vai-raja-vai-manual-save";
const VAI_RAJA_VAI_COOLDOWN_MS = 60_000;
const SYNC_LEAKAGE_RISK = 0.1; // 10%
const SYNC_LEAKAGE_SUSPICION = 20;

const SCENES = [
  "TITLE",
  "THE_RETURN",
  "UGADI_PARTY",
  "THE_CONFRONTATION",
  "RIVERBED_FINALE",
  "ENDING",
];

const ENDINGS = [
  "CLEAN_SWEEP",
  "I_DIDNT_SAY_DANCE",
  "RIVERBED_RUN",
  "INTERNATIONAL_FUGITIVE",
];

const COLLISION_TYPES = {
  SPATIAL: "SPATIAL",
  TEMPORAL: "TEMPORAL",
  ASSOCIATION: "ASSOCIATION",
};

// ---------------------------------------------------------------------------
// Initial state factory — always returns a fresh copy
// ---------------------------------------------------------------------------

const createInitialState = () => ({
  // Game meta
  gameVersion: GAME_VERSION,
  currentScene: "TITLE",
  ending: null,
  gameStarted: false,

  // Player
  playerStats: {
    confidence: 50,
    technicalityCount: 0,
    doubleDownCount: 0,
    diversionCount: 0,
  },

  // Fact Ledger (core game engine)
  factLedger: [],

  // Wives (5 NPCs)
  wives: [
    {
      id: "wife_mythili",
      name: "Mythili",
      suspicion: 0,
      intelligence: 90,
      suspicionGainRate: 5,
      knowledgeBase: [],
      color: "#D946EF",
    },
    {
      id: "wife_alice",
      name: "Alice",
      suspicion: 0,
      intelligence: 70,
      suspicionGainRate: 3,
      knowledgeBase: [],
      color: "#14B8A6",
    },
    {
      id: "wife_priya",
      name: "Priya",
      suspicion: 0,
      intelligence: 75,
      suspicionGainRate: 4,
      knowledgeBase: [],
      color: "#F59E0B",
    },
    {
      id: "wife_deepa",
      name: "Deepa",
      suspicion: 0,
      intelligence: 65,
      suspicionGainRate: 3,
      knowledgeBase: [],
      color: "#BEF264",
    },
    {
      id: "wife_lakshmi",
      name: "Lakshmi",
      suspicion: 0,
      intelligence: 60,
      suspicionGainRate: 2,
      knowledgeBase: [],
      color: "#818CF8",
    },
  ],

  // Friends (4 NPCs)
  friends: [
    {
      id: "friend_ayyappan",
      name: "Ayyappan Nair",
      reliability: 80,
      alcohol_level: 0,
      lastSyncedAt: null,
      knowledgeBase: [],
      failureStyle: "OVER_EXPLAINER",
    },
    {
      id: "friend_vedham",
      name: "Vedham",
      reliability: 70,
      alcohol_level: 0,
      lastSyncedAt: null,
      knowledgeBase: [],
      failureStyle: "NERVOUS",
    },
    {
      id: "friend_hegde",
      name: "Hegde",
      reliability: 60,
      alcohol_level: 0,
      lastSyncedAt: null,
      knowledgeBase: [],
      failureStyle: "AGREEABLE",
    },
    {
      id: "friend_reddy",
      name: "Reddy",
      reliability: 50,
      alcohol_level: 0,
      lastSyncedAt: null,
      knowledgeBase: [],
      failureStyle: "LOOSE_CANNON",
    },
  ],

  // Inventory
  inventory: [
    {
      id: "item_diamond",
      name: "Maragadham Diamond",
      status: "HIDDEN",
      usedCount: 0,
      maxUses: null,
      acquired: true,
    },
  ],

  // Vai Raja Vai sync cooldown
  vaiRajaVaiCooldownEnd: null,

  // Recovery mode
  recoveryMode: null,

  // Current dialogue state
  currentDialogue: null,
  currentWife: null,

  // Alcohol timer (for party scene)
  alcoholTimerActive: false,

  // Diamond status
  diamondDiscovered: false,
  evidenceTossFailed: false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Generate a unique ID for facts. Simple but sufficient for single-player.
 */
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
      // 1. addFact(fact)
      // =====================================================================
      addFact: (fact) => {
        const enrichedFact = {
          id: generateId(),
          createdAt: Date.now(),
          immutable: false,
          evidenceId: null,
          ...fact,
        };

        set((state) => ({
          factLedger: [...state.factLedger, enrichedFact],
        }));

        return enrichedFact;
      },

      // =====================================================================
      // 2. validateConsistency(newFact)
      // =====================================================================
      validateConsistency: (newFact) => {
        const { factLedger, friends } = get();
        const collisions = [];

        for (const existing of factLedger) {
          // ---- Spatial collision ----
          // Same timestamp range, but told different locations to different NPCs
          if (
            newFact.timestamp === existing.timestamp &&
            newFact.location &&
            existing.location &&
            newFact.location !== existing.location &&
            newFact.toldTo !== existing.toldTo
          ) {
            collisions.push({
              type: COLLISION_TYPES.SPATIAL,
              conflictingFact: existing,
              reason: `Claimed to be at "${newFact.location}" but previously told ${existing.toldTo} you were at "${existing.location}" at the same time.`,
            });
          }

          // ---- Temporal collision ----
          // Same time period, geographically impossible locations
          if (
            newFact.timestamp === existing.timestamp &&
            newFact.location &&
            existing.location &&
            newFact.location !== existing.location &&
            newFact.toldTo === existing.toldTo
          ) {
            collisions.push({
              type: COLLISION_TYPES.TEMPORAL,
              conflictingFact: existing,
              reason: `Cannot be at "${newFact.location}" and "${existing.location}" at the same time.`,
            });
          }
        }

        // ---- Association collision ----
        // Check if any friend's knowledgeBase contradicts the new fact
        for (const friend of friends) {
          for (const knownFact of friend.knowledgeBase) {
            if (
              newFact.topic &&
              knownFact.topic === newFact.topic &&
              knownFact.claim !== newFact.claim
            ) {
              collisions.push({
                type: COLLISION_TYPES.ASSOCIATION,
                conflictingFact: knownFact,
                friendId: friend.id,
                reason: `${friend.name} knows a different version: "${knownFact.claim}" vs your new claim "${newFact.claim}".`,
              });
            }
          }
        }

        return {
          hasCollision: collisions.length > 0,
          collisionType: collisions.length > 0 ? collisions[0].type : null,
          conflictingFacts: collisions,
        };
      },

      // =====================================================================
      // 3. getGlobalSuspicion()
      // =====================================================================
      getGlobalSuspicion: () => {
        const { wives } = get();
        if (wives.length === 0) return 0;
        const total = wives.reduce((sum, wife) => sum + wife.suspicion, 0);
        return Math.round(total / wives.length);
      },

      // =====================================================================
      // 4. updateWifeSuspicion(wifeId, amount)
      // =====================================================================
      updateWifeSuspicion: (wifeId, amount) => {
        set((state) => ({
          wives: state.wives.map((wife) =>
            wife.id === wifeId
              ? { ...wife, suspicion: clamp(wife.suspicion + amount, 0, 100) }
              : wife
          ),
        }));
      },

      // =====================================================================
      // 5. updateFriendReliability(friendId, amount)
      // =====================================================================
      updateFriendReliability: (friendId, amount) => {
        set((state) => ({
          friends: state.friends.map((friend) =>
            friend.id === friendId
              ? {
                  ...friend,
                  reliability: clamp(friend.reliability + amount, 0, 100),
                }
              : friend
          ),
        }));
      },

      // =====================================================================
      // 6. syncFriends()
      // =====================================================================
      syncFriends: () => {
        const { factLedger } = get();
        const now = Date.now();

        set((state) => ({
          friends: state.friends.map((friend) => ({
            ...friend,
            knowledgeBase: [...factLedger],
            lastSyncedAt: now,
          })),
        }));

        // 10% leakage risk — a wife overhears or a friend lets something slip
        if (Math.random() < SYNC_LEAKAGE_RISK) {
          const { wives } = get();
          // Pick a random wife to gain suspicion
          const targetWife = wives[Math.floor(Math.random() * wives.length)];
          get().updateWifeSuspicion(targetWife.id, SYNC_LEAKAGE_SUSPICION);

          return {
            leaked: true,
            leakedTo: targetWife.id,
            leakedToName: targetWife.name,
          };
        }

        return { leaked: false };
      },

      // =====================================================================
      // 7. setVaiRajaVaiCooldown()
      // =====================================================================
      setVaiRajaVaiCooldown: () => {
        set({
          vaiRajaVaiCooldownEnd: Date.now() + VAI_RAJA_VAI_COOLDOWN_MS,
        });
      },

      // =====================================================================
      // 8. isVaiRajaVaiAvailable()
      // =====================================================================
      isVaiRajaVaiAvailable: () => {
        const { vaiRajaVaiCooldownEnd } = get();
        if (vaiRajaVaiCooldownEnd === null) return true;
        return Date.now() >= vaiRajaVaiCooldownEnd;
      },

      // =====================================================================
      // 9. acquireEvidence(itemId)
      // =====================================================================
      acquireEvidence: (itemId) => {
        set((state) => {
          const exists = state.inventory.some((item) => item.id === itemId);
          if (exists) {
            // Mark as acquired if it already exists in the manifest
            return {
              inventory: state.inventory.map((item) =>
                item.id === itemId ? { ...item, acquired: true } : item
              ),
            };
          }
          // Add new item
          return {
            inventory: [
              ...state.inventory,
              {
                id: itemId,
                name: itemId,
                status: "HIDDEN",
                usedCount: 0,
                maxUses: null,
                acquired: true,
              },
            ],
          };
        });
      },

      // =====================================================================
      // 10. useEvidence(itemId, factId)
      // =====================================================================
      useEvidence: (itemId, factId) => {
        const { inventory } = get();
        const item = inventory.find((i) => i.id === itemId);

        if (!item || !item.acquired) {
          return { success: false, reason: "Item not in inventory." };
        }
        if (item.maxUses !== null && item.usedCount >= item.maxUses) {
          return { success: false, reason: "Item has no remaining uses." };
        }

        // Lock the fact
        get().lockFact(factId, itemId);

        // Decrement uses
        set((state) => ({
          inventory: state.inventory.map((i) =>
            i.id === itemId ? { ...i, usedCount: i.usedCount + 1 } : i
          ),
        }));

        return { success: true };
      },

      // =====================================================================
      // 11. lockFact(factId, evidenceId)
      // =====================================================================
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
      // 12. incrementAlcohol(friendId)
      // =====================================================================
      incrementAlcohol: (friendId) => {
        set((state) => ({
          friends: state.friends.map((friend) =>
            friend.id === friendId
              ? {
                  ...friend,
                  alcohol_level: friend.alcohol_level + 1,
                  reliability: clamp(friend.reliability - 5, 0, 100),
                }
              : friend
          ),
        }));
      },

      // =====================================================================
      // 13. needsSync(friendId)
      // =====================================================================
      needsSync: (friendId) => {
        const { friends, factLedger } = get();
        const friend = friends.find((f) => f.id === friendId);
        if (!friend) return false;

        // If never synced, any facts mean they need sync
        if (friend.lastSyncedAt === null) return factLedger.length > 0;

        // Check if any facts were added after last sync
        return factLedger.some((fact) => fact.createdAt > friend.lastSyncedAt);
      },

      // =====================================================================
      // 14. getChaoticBlurtRisk(friendId)
      // =====================================================================
      getChaoticBlurtRisk: (friendId) => {
        const { friends } = get();
        const friend = friends.find((f) => f.id === friendId);
        if (!friend) return 0;

        // Lower reliability + higher alcohol = higher blurt risk
        // Base risk from unreliability (0-100 scale, inverted)
        const unreliability = 100 - friend.reliability;
        // Alcohol amplifies risk (each drink adds ~10% to the risk pool)
        const alcoholFactor = friend.alcohol_level * 10;
        // Combined risk, capped at 95% — there's always a tiny chance they hold it together
        const risk = clamp(
          Math.round((unreliability + alcoholFactor) / 2),
          0,
          95
        );

        return risk;
      },

      // =====================================================================
      // 15. transitionScene(sceneId)
      // =====================================================================
      transitionScene: (sceneId) => {
        if (!SCENES.includes(sceneId)) {
          console.warn(`[gameStore] Invalid scene: "${sceneId}"`);
          return;
        }

        set({
          currentScene: sceneId,
          currentDialogue: null,
          currentWife: null,
          recoveryMode: null,
        });
      },

      // =====================================================================
      // 16. setCurrentDialogue(dialogue)
      // =====================================================================
      setCurrentDialogue: (dialogue) => {
        set({ currentDialogue: dialogue });
      },

      // =====================================================================
      // 17. setCurrentWife(wifeId)
      // =====================================================================
      setCurrentWife: (wifeId) => {
        set({ currentWife: wifeId });
      },

      // =====================================================================
      // 18. triggerRecoveryMode(collision, wifeId)
      // =====================================================================
      triggerRecoveryMode: (collision, wifeId) => {
        set({
          recoveryMode: {
            collision,
            wife: wifeId,
            timer: Date.now(),
            options: ["TECHNICALITY", "DOUBLE_DOWN", "DIVERSION"],
          },
        });
      },

      // =====================================================================
      // 19. resolveRecovery(option)
      // =====================================================================
      resolveRecovery: (option) => {
        const { recoveryMode, wives, playerStats, inventory } = get();

        if (!recoveryMode) {
          return { success: false, reason: "Not in recovery mode." };
        }

        const wife = wives.find((w) => w.id === recoveryMode.wife);
        if (!wife) {
          return { success: false, reason: "Wife not found." };
        }

        // Base success rates per wife (keyed by wife id)
        // Higher intelligence wives are harder to fool
        const baseRates = {
          TECHNICALITY: {
            wife_mythili: 20,
            wife_alice: 40,
            wife_priya: 35,
            wife_deepa: 45,
            wife_lakshmi: 50,
          },
          DOUBLE_DOWN: {
            wife_mythili: 15,
            wife_alice: 35,
            wife_priya: 30,
            wife_deepa: 40,
            wife_lakshmi: 45,
          },
          DIVERSION: {
            wife_mythili: 25,
            wife_alice: 45,
            wife_priya: 40,
            wife_deepa: 50,
            wife_lakshmi: 55,
          },
        };

        const optionRates = baseRates[option];
        if (!optionRates) {
          return { success: false, reason: `Invalid option: ${option}` };
        }

        let baseRate = optionRates[wife.id] ?? 30;

        // Player confidence bonus
        baseRate += playerStats.confidence / 10;

        // Diamond bonus for DOUBLE_DOWN
        if (option === "DOUBLE_DOWN") {
          const hasDiamond = inventory.some(
            (item) =>
              item.id === "item_diamond" &&
              item.acquired &&
              item.status !== "DESTROYED"
          );
          if (hasDiamond) {
            baseRate += 20;
          }
        }

        const roll = Math.random() * 100;
        const success = roll < baseRate;

        // Update player stats
        const statKey =
          option === "TECHNICALITY"
            ? "technicalityCount"
            : option === "DOUBLE_DOWN"
              ? "doubleDownCount"
              : "diversionCount";

        if (success) {
          set((state) => ({
            playerStats: {
              ...state.playerStats,
              [statKey]: state.playerStats[statKey] + 1,
              confidence: clamp(state.playerStats.confidence + 5, 0, 100),
            },
            recoveryMode: null,
          }));
        } else {
          // Failed recovery — suspicion spikes based on wife's gain rate
          const suspicionPenalty = wife.suspicionGainRate * 3;
          get().updateWifeSuspicion(wife.id, suspicionPenalty);

          set((state) => ({
            playerStats: {
              ...state.playerStats,
              [statKey]: state.playerStats[statKey] + 1,
              confidence: clamp(state.playerStats.confidence - 10, 0, 100),
            },
            recoveryMode: null,
          }));
        }

        return {
          success,
          roll: Math.round(roll),
          threshold: Math.round(baseRate),
          option,
          wifeId: wife.id,
        };
      },

      // =====================================================================
      // 20. clearRecoveryMode()
      // =====================================================================
      clearRecoveryMode: () => {
        set({ recoveryMode: null });
      },

      // =====================================================================
      // 21. startNewGame()
      // =====================================================================
      startNewGame: () => {
        set({
          ...createInitialState(),
          gameStarted: true,
          currentScene: "THE_RETURN",
        });
      },

      // =====================================================================
      // 22. determineEnding()
      // =====================================================================
      determineEnding: () => {
        const {
          wives,
          diamondDiscovered,
          evidenceTossFailed,
          playerStats,
          factLedger,
        } = get();

        const globalSuspicion = get().getGlobalSuspicion();
        const maxSuspicion = Math.max(...wives.map((w) => w.suspicion));
        const immutableFacts = factLedger.filter((f) => f.immutable).length;

        // CLEAN_SWEEP: All wives have low suspicion and most facts are locked
        if (
          globalSuspicion < 20 &&
          maxSuspicion < 30 &&
          immutableFacts >= Math.floor(factLedger.length * 0.5)
        ) {
          return "CLEAN_SWEEP";
        }

        // I_DIDNT_SAY_DANCE: Moderate suspicion, player relied on diversions
        if (
          globalSuspicion >= 20 &&
          globalSuspicion < 60 &&
          playerStats.diversionCount >= 3
        ) {
          return "I_DIDNT_SAY_DANCE";
        }

        // RIVERBED_RUN: Diamond was discovered or evidence toss failed
        if (diamondDiscovered || evidenceTossFailed) {
          return "RIVERBED_RUN";
        }

        // INTERNATIONAL_FUGITIVE: Maximum chaos — high suspicion everywhere
        if (globalSuspicion >= 60 || maxSuspicion >= 80) {
          return "INTERNATIONAL_FUGITIVE";
        }

        // Fallback — shouldn't normally reach here, but default to the safest ending
        return "I_DIDNT_SAY_DANCE";
      },

      // =====================================================================
      // 23. triggerEnding(endingId)
      // =====================================================================
      triggerEnding: (endingId) => {
        if (!ENDINGS.includes(endingId)) {
          console.warn(`[gameStore] Invalid ending: "${endingId}"`);
          return;
        }

        set({
          ending: endingId,
          currentScene: "ENDING",
          currentDialogue: null,
          currentWife: null,
          recoveryMode: null,
        });
      },

      // =====================================================================
      // 24. saveGame()
      // =====================================================================
      saveGame: () => {
        try {
          const state = get();
          // Extract only serializable state (exclude functions)
          const serializable = {
            gameVersion: state.gameVersion,
            currentScene: state.currentScene,
            ending: state.ending,
            gameStarted: state.gameStarted,
            playerStats: state.playerStats,
            factLedger: state.factLedger,
            wives: state.wives,
            friends: state.friends,
            inventory: state.inventory,
            vaiRajaVaiCooldownEnd: state.vaiRajaVaiCooldownEnd,
            recoveryMode: state.recoveryMode,
            currentDialogue: state.currentDialogue,
            currentWife: state.currentWife,
            alcoholTimerActive: state.alcoholTimerActive,
            diamondDiscovered: state.diamondDiscovered,
            evidenceTossFailed: state.evidenceTossFailed,
          };

          localStorage.setItem(MANUAL_SAVE_KEY, JSON.stringify(serializable));
          return { success: true };
        } catch (error) {
          console.error("[gameStore] Save failed:", error);
          return { success: false, error: error.message };
        }
      },

      // =====================================================================
      // 25. loadGame()
      // =====================================================================
      loadGame: () => {
        try {
          const raw = localStorage.getItem(MANUAL_SAVE_KEY);
          if (!raw) {
            return { success: false, reason: "No save data found." };
          }

          const parsed = JSON.parse(raw);

          // Version check — reject saves from incompatible versions
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

      // =====================================================================
      // 26. hasSaveGame()
      // =====================================================================
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
      // Only persist serializable game state, not actions
      partialize: (state) => ({
        gameVersion: state.gameVersion,
        currentScene: state.currentScene,
        ending: state.ending,
        gameStarted: state.gameStarted,
        playerStats: state.playerStats,
        factLedger: state.factLedger,
        wives: state.wives,
        friends: state.friends,
        inventory: state.inventory,
        vaiRajaVaiCooldownEnd: state.vaiRajaVaiCooldownEnd,
        recoveryMode: state.recoveryMode,
        currentDialogue: state.currentDialogue,
        currentWife: state.currentWife,
        alcoholTimerActive: state.alcoholTimerActive,
        diamondDiscovered: state.diamondDiscovered,
        evidenceTossFailed: state.evidenceTossFailed,
      }),
      version: 1,
      migrate: (persistedState, version) => {
        // Future migrations can be handled here
        if (version === 0) {
          return { ...createInitialState(), ...persistedState };
        }
        return persistedState;
      },
    }
  )
);

export { useGameStore };
export default useGameStore;
