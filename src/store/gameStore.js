import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GAME_VERSION = "2.0.0";
const SAVE_KEY = "vai-raja-vai-save-v2";
const MANUAL_SAVE_KEY = "vai-raja-vai-manual-save-v2";
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
  "RIVERBED_RUN",
  "INTERNATIONAL_FUGITIVE",
  "SURVIVED_SOMEHOW",
  "BUSTED",
  "FULL_CHAOS",
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
      id: "wife_ammini",
      name: "Ammini",
      suspicion: 0,
      intelligence: 80,
      suspicionGainRate: 3,
      knowledgeBase: [],
      color: "#14B8A6",
    },
    {
      id: "wife_chamundi",
      name: "Chamundi",
      suspicion: 0,
      intelligence: 70,
      suspicionGainRate: 4,
      knowledgeBase: [],
      color: "#F59E0B",
    },
    {
      id: "wife_janaki",
      name: "Janaki",
      suspicion: 0,
      intelligence: 65,
      suspicionGainRate: 3,
      knowledgeBase: [],
      color: "#BEF264",
    },
    {
      id: "wife_mrs_reddy",
      name: "Mrs. Reddy",
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

  // Current dialogue state
  currentDialogue: null,
  currentWife: null,

  // Alcohol timer (for party scene)
  alcoholTimerActive: false,

  // Diamond status
  diamondDiscovered: false,
  evidenceTossFailed: false,

  // Chaos systems (Phase 4+)
  chaosEventsTriggered: [],     // {eventId, scene, timestamp}
  ambushHistory: [],             // {wifeId, scene, dialogueId, timestamp}
  collisionReveals: [],          // {factId1, factId2, wifeId, resolved}
  friendBlurtHistory: [],        // {friendId, wifeId, blurt, timestamp}
  friendPositions: {},           // {friend_ayyappan: 'wife_ammini', ...}
  friendInterceptedCount: 0,
  wifePatience: {
    wife_mythili: 3,
    wife_ammini: 3,
    wife_chamundi: 3,
    wife_janaki: 3,
    wife_mrs_reddy: 3,
  },
  recapEvents: [],               // {type, text, timestamp, scene}
  gameStartTime: null,
  currentAmbush: null,
  currentChaosEvent: null,
  friendAlert: null,
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
      // 6. acquireEvidence(itemId)
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
      // 10. getChaoticBlurtRisk(friendId)
      // =====================================================================
      getChaoticBlurtRisk: (friendId) => {
        const { friends } = get();
        const friend = friends.find((f) => f.id === friendId);
        if (!friend) return 0;

        // Base 40%, +20% if drunk (alcohol > 2), max 90%
        let risk = 40;
        if (friend.alcohol_level > 2) risk += 20;
        // Lower reliability adds more risk
        risk += Math.round((100 - friend.reliability) / 5);
        return clamp(risk, 0, 90);
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
      // 14. resolveCollision(wifeId, option)
      // =====================================================================
      resolveCollision: (wifeId, option) => {
        const { wives, playerStats, inventory } = get();
        const wife = wives.find((w) => w.id === wifeId);
        if (!wife) return { success: false, reason: "Wife not found." };

        // Base success rates per wife intelligence
        const baseRates = {
          REFRAME: { wife_mythili: 20, wife_ammini: 30, wife_chamundi: 35, wife_janaki: 45, wife_mrs_reddy: 50 },
          DOUBLE_DOWN: { wife_mythili: 15, wife_ammini: 25, wife_chamundi: 30, wife_janaki: 40, wife_mrs_reddy: 45 },
          DEFLECT: { wife_mythili: 25, wife_ammini: 35, wife_chamundi: 40, wife_janaki: 50, wife_mrs_reddy: 55 },
        };

        const optionRates = baseRates[option];
        if (!optionRates) return { success: false, reason: `Invalid option: ${option}` };

        let baseRate = optionRates[wife.id] ?? 30;
        baseRate += playerStats.confidence / 10;

        if (option === "DOUBLE_DOWN") {
          const hasDiamond = inventory.some(
            (item) => item.id === "item_diamond" && item.acquired && item.status !== "DESTROYED"
          );
          if (hasDiamond) baseRate += 20;
        }

        const roll = Math.random() * 100;
        const success = roll < baseRate;

        if (success) {
          set((state) => ({
            playerStats: {
              ...state.playerStats,
              confidence: clamp(state.playerStats.confidence + 5, 0, 100),
            },
          }));
        } else {
          const suspicionPenalty = wife.suspicionGainRate * 3;
          get().updateWifeSuspicion(wife.id, suspicionPenalty);
          // Cascade: +5 to all other wives
          wives.forEach((w) => {
            if (w.id !== wife.id) get().updateWifeSuspicion(w.id, 5);
          });
          set((state) => ({
            playerStats: {
              ...state.playerStats,
              confidence: clamp(state.playerStats.confidence - 10, 0, 100),
            },
          }));
        }

        return { success, roll: Math.round(roll), threshold: Math.round(baseRate), option, wifeId: wife.id };
      },

      // =====================================================================
      // 15. startNewGame()
      // =====================================================================
      startNewGame: () => {
        set({
          ...createInitialState(),
          gameStarted: true,
          currentScene: "THE_RETURN",
          gameStartTime: Date.now(),
        });
      },

      // =====================================================================
      // 22. determineEnding()
      // =====================================================================
      determineEnding: () => {
        const { wives, diamondDiscovered, collisionReveals, friendBlurtHistory } = get();

        const globalSuspicion = get().getGlobalSuspicion();
        const maxSuspicion = Math.max(...wives.map((w) => w.suspicion));
        const wivesAbove50 = wives.filter((w) => w.suspicion > 50).length;
        const blurtsReachedWives = friendBlurtHistory.length;
        const reveals = collisionReveals.length;

        // INTERNATIONAL_FUGITIVE (~5%): diamond discovered
        if (diamondDiscovered) {
          return "INTERNATIONAL_FUGITIVE";
        }

        // CLEAN_SWEEP (~10%): very hard to achieve
        if (globalSuspicion < 10 && maxSuspicion < 20 && reveals === 0 && blurtsReachedWives === 0) {
          return "CLEAN_SWEEP";
        }

        // FULL_CHAOS (~20%): everything fell apart
        if (globalSuspicion > 70 || wivesAbove50 >= 4) {
          return "FULL_CHAOS";
        }

        // SURVIVED_SOMEHOW (~25%): scraped by
        if (globalSuspicion < 40 && wivesAbove50 <= 2 && reveals < 3) {
          return "SURVIVED_SOMEHOW";
        }

        // BUSTED (~40%): default fallback
        return "BUSTED";
      },

      // =====================================================================
      // Chaos system stubs (implemented in Phases 5-9)
      // =====================================================================

      triggerWifeAmbush: (wifeId, sceneId) => {
        // Set currentAmbush — the component is responsible for picking the dialogue
        const { wives } = get();
        const wife = wives.find((w) => w.id === wifeId);
        if (!wife) return;

        set((state) => ({
          currentAmbush: { wifeId, sceneId, timestamp: Date.now() },
          ambushHistory: [
            ...state.ambushHistory,
            { wifeId, scene: sceneId, timestamp: Date.now() },
          ],
        }));
      },

      triggerChaosEvent: (event) => {
        if (!event) return;

        // Apply effects
        if (event.effect) {
          if (event.effect.allWives) {
            const { wives } = get();
            wives.forEach((w) => {
              get().updateWifeSuspicion(w.id, event.effect.suspicionDelta);
            });
          } else if (event.effect.targetWife) {
            get().updateWifeSuspicion(event.effect.targetWife, event.effect.suspicionDelta);
          }
          if (event.effect.diamondRisk && Math.random() < 0.15) {
            set({ diamondDiscovered: true });
          }
        }

        set((state) => ({
          currentChaosEvent: event,
          chaosEventsTriggered: [
            ...state.chaosEventsTriggered,
            { eventId: event.id, scene: state.currentScene, timestamp: Date.now() },
          ],
          recapEvents: [
            ...state.recapEvents,
            {
              type: 'CHAOS_EVENT',
              text: `${event.title}: ${event.description}`,
              timestamp: Date.now(),
              scene: state.currentScene,
            },
          ],
        }));

        // Auto-clear after 3s
        setTimeout(() => {
          useGameStore.setState({ currentChaosEvent: null });
        }, 3000);
      },

      updateFriendAutonomous: () => {
        const { friends, wives } = get();
        // Pick a random non-passed-out friend
        const activeFriends = friends.filter((f) => f.alcohol_level <= 5);
        if (activeFriends.length === 0) return;

        const friend = activeFriends[Math.floor(Math.random() * activeFriends.length)];
        // Pick a random wife to wander toward
        const targetWife = wives[Math.floor(Math.random() * wives.length)];

        set((state) => ({
          friendPositions: {
            ...state.friendPositions,
            [friend.id]: targetWife.id,
          },
          friendAlert: {
            friendId: friend.id,
            friendName: friend.name,
            targetWifeId: targetWife.id,
            targetWifeName: targetWife.name,
            timestamp: Date.now(),
          },
        }));
      },

      resolveAmbush: (option) => {
        const { currentAmbush, wives } = get();
        if (!currentAmbush) return { success: false };

        const wife = wives.find((w) => w.id === currentAmbush.wifeId);
        if (!wife) return { success: false };

        // Base success rates per option type
        const baseRates = { REFRAME: 45, DOUBLE_DOWN: 30, DEFLECT: 55 };
        const baseRate = baseRates[option] || 40;
        // Wife intelligence reduces success (higher intel = harder)
        const successChance = Math.max(10, baseRate - (wife.intelligence - 50));
        const roll = Math.random() * 100;
        const success = roll < successChance;

        if (success) {
          // Minor suspicion bump even on success
          get().updateWifeSuspicion(currentAmbush.wifeId, 3);
        } else {
          // Failed: suspicion spike + cascade to other wives
          get().updateWifeSuspicion(currentAmbush.wifeId, 12);
          // Cascade: +5 to two random other wives
          const otherWives = wives.filter((w) => w.id !== currentAmbush.wifeId);
          const shuffled = otherWives.sort(() => Math.random() - 0.5);
          for (let i = 0; i < Math.min(2, shuffled.length); i++) {
            get().updateWifeSuspicion(shuffled[i].id, 5);
          }
        }

        set((state) => ({
          currentAmbush: null,
          recapEvents: [
            ...state.recapEvents,
            {
              type: success ? 'AMBUSH_SURVIVED' : 'AMBUSH_FAILED',
              text: `${wife.name} ambushed you (${option}) — ${success ? 'survived' : 'caught!'}`,
              timestamp: Date.now(),
              scene: currentAmbush.sceneId,
            },
          ],
        }));

        return { success };
      },

      trackRecapEvent: (event) => {
        set((state) => ({
          recapEvents: [...state.recapEvents, { ...event, timestamp: Date.now() }],
        }));
      },

      getDisasterRecap: () => {
        // Phase 9: Build recap from collisionReveals, blurtHistory, etc.
        const state = get();
        return {
          collisionReveals: state.collisionReveals,
          friendBlurtHistory: state.friendBlurtHistory,
          ambushHistory: state.ambushHistory,
          wives: state.wives,
          duration: state.gameStartTime ? Date.now() - state.gameStartTime : 0,
          recapEvents: state.recapEvents,
        };
      },

      drainPatience: (wifeId) => {
        const { wifePatience } = get();
        const current = wifePatience[wifeId] ?? 3;
        const next = current - 1;

        if (next <= 0) {
          // Wife storms off — +15 to all other wives
          const { wives } = get();
          wives.forEach((w) => {
            if (w.id !== wifeId) {
              get().updateWifeSuspicion(w.id, 15);
            }
          });

          set((state) => ({
            wifePatience: { ...state.wifePatience, [wifeId]: 0 },
            recapEvents: [
              ...state.recapEvents,
              {
                type: 'WIFE_STORMED_OFF',
                text: `${wives.find((w) => w.id === wifeId)?.name || wifeId} stormed off!`,
                timestamp: Date.now(),
                scene: state.currentScene,
              },
            ],
          }));
        } else {
          set((state) => ({
            wifePatience: { ...state.wifePatience, [wifeId]: next },
          }));
        }
      },

      interceptFriend: (friendId) => {
        const { currentWife } = get();
        // Intercepting costs +5 suspicion to current conversation wife
        const wifeId = currentWife || 'wife_mythili';
        get().updateWifeSuspicion(wifeId, 5);

        set((state) => ({
          friendAlert: null,
          friendInterceptedCount: state.friendInterceptedCount + 1,
          friendPositions: {
            ...state.friendPositions,
            [friendId]: null, // send friend back to wandering
          },
          recapEvents: [
            ...state.recapEvents,
            {
              type: 'FRIEND_INTERCEPTED',
              text: `Intercepted ${state.friends.find((f) => f.id === friendId)?.name || friendId}`,
              timestamp: Date.now(),
              scene: state.currentScene,
            },
          ],
        }));
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
            currentDialogue: state.currentDialogue,
            currentWife: state.currentWife,
            alcoholTimerActive: state.alcoholTimerActive,
            diamondDiscovered: state.diamondDiscovered,
            evidenceTossFailed: state.evidenceTossFailed,
            chaosEventsTriggered: state.chaosEventsTriggered,
            ambushHistory: state.ambushHistory,
            collisionReveals: state.collisionReveals,
            friendBlurtHistory: state.friendBlurtHistory,
            friendPositions: state.friendPositions,
            friendInterceptedCount: state.friendInterceptedCount,
            wifePatience: state.wifePatience,
            recapEvents: state.recapEvents,
            gameStartTime: state.gameStartTime,
            currentAmbush: state.currentAmbush,
            currentChaosEvent: state.currentChaosEvent,
            friendAlert: state.friendAlert,
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
        currentDialogue: state.currentDialogue,
        currentWife: state.currentWife,
        alcoholTimerActive: state.alcoholTimerActive,
        diamondDiscovered: state.diamondDiscovered,
        evidenceTossFailed: state.evidenceTossFailed,
        chaosEventsTriggered: state.chaosEventsTriggered,
        ambushHistory: state.ambushHistory,
        collisionReveals: state.collisionReveals,
        friendBlurtHistory: state.friendBlurtHistory,
        friendPositions: state.friendPositions,
        friendInterceptedCount: state.friendInterceptedCount,
        wifePatience: state.wifePatience,
        recapEvents: state.recapEvents,
        gameStartTime: state.gameStartTime,
        currentAmbush: state.currentAmbush,
        currentChaosEvent: state.currentChaosEvent,
        friendAlert: state.friendAlert,
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
