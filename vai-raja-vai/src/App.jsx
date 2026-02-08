import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import TitleScreen from './components/TitleScreen';
import GameLayout from './components/ui/GameLayout';
import SceneManager from './components/scenes/SceneManager';
import EndingScreen from './components/endings/EndingScreen';

// Map store ending IDs to EndingScreen component keys
const ENDING_MAP = {
  CLEAN_SWEEP: 'cleanSweep',
  I_DIDNT_SAY_DANCE: 'iDidntSayDance',
  RIVERBED_RUN: 'riverbedRun',
  INTERNATIONAL_FUGITIVE: 'internationalFugitive',
};

// Map store inventory items to InventoryBar format
const mapInventoryForUI = (inventory) =>
  inventory
    .filter((item) => item.acquired)
    .map((item) => {
      const typeMap = {
        item_diamond: 'diamond',
        item_phone: 'phone',
        item_photo: 'photo',
      };
      const maxUsesMap = {
        item_phone: 3,
        item_photo: 1,
        item_diamond: 99,
      };
      const maxUses = item.maxUses ?? maxUsesMap[item.id] ?? 99;
      return {
        id: item.id,
        type: typeMap[item.id] || item.id,
        usesRemaining: Math.max(0, maxUses - item.usedCount),
        name: item.name,
      };
    });

const SCENE_TITLES = {
  THE_RETURN: 'The Return',
  UGADI_PARTY: 'The Ugadi Party',
  THE_CONFRONTATION: 'The Confrontation',
  RIVERBED_FINALE: 'The Riverbed Finale',
};

export default function App() {
  const currentScene = useGameStore((s) => s.currentScene);
  const ending = useGameStore((s) => s.ending);
  const wives = useGameStore((s) => s.wives);
  const friends = useGameStore((s) => s.friends);
  const inventory = useGameStore((s) => s.inventory);
  const playerStats = useGameStore((s) => s.playerStats);
  const vaiRajaVaiCooldownEnd = useGameStore((s) => s.vaiRajaVaiCooldownEnd);

  const globalSuspicion = useGameStore((s) => {
    if (!s.wives || s.wives.length === 0) return 0;
    const total = s.wives.reduce((sum, w) => sum + (w.suspicion || 0), 0);
    return Math.round(total / s.wives.length);
  });
  const vrvAvailable = useGameStore((s) => {
    if (!s.vaiRajaVaiCooldownEnd) return true;
    return Date.now() >= s.vaiRajaVaiCooldownEnd;
  });

  const startNewGame = useGameStore((s) => s.startNewGame);
  const loadGame = useGameStore((s) => s.loadGame);
  const hasSaveGame = useGameStore((s) => s.hasSaveGame);
  const syncFriends = useGameStore((s) => s.syncFriends);
  const setVaiRajaVaiCooldown = useGameStore((s) => s.setVaiRajaVaiCooldown);
  const isVaiRajaVaiAvailable = useGameStore((s) => s.isVaiRajaVaiAvailable);
  const useEvidence = useGameStore((s) => s.useEvidence);
  const saveGame = useGameStore((s) => s.saveGame);

  const [vrvCooldown, setVrvCooldown] = useState(0);
  const [leakageFlash, setLeakageFlash] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const cooldownRef = useRef(null);

  // Check for saved game on mount
  useEffect(() => {
    setHasSaved(hasSaveGame());
  }, [hasSaveGame]);

  // VRV cooldown timer
  useEffect(() => {
    if (!vaiRajaVaiCooldownEnd) {
      setVrvCooldown(0);
      return;
    }

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((vaiRajaVaiCooldownEnd - Date.now()) / 1000));
      setVrvCooldown(remaining);
      if (remaining <= 0 && cooldownRef.current) {
        clearInterval(cooldownRef.current);
      }
    };

    tick();
    cooldownRef.current = setInterval(tick, 1000);
    return () => clearInterval(cooldownRef.current);
  }, [vaiRajaVaiCooldownEnd]);

  const handleNewGame = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  const handleContinue = useCallback(() => {
    loadGame();
  }, [loadGame]);

  const handlePlayAgain = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  const handleVaiRajaVai = useCallback(() => {
    if (!isVaiRajaVaiAvailable()) return;

    const result = syncFriends();
    setVaiRajaVaiCooldown();
    saveGame();

    if (result.leaked) {
      setLeakageFlash(true);
      setTimeout(() => setLeakageFlash(false), 1500);
    }
  }, [syncFriends, setVaiRajaVaiCooldown, isVaiRajaVaiAvailable, saveGame]);

  const handleUseItem = useCallback(
    (item) => {
      const factLedger = useGameStore.getState().factLedger;
      const targetFact = [...factLedger].reverse().find((f) => !f.immutable);
      if (targetFact) {
        useEvidence(item.id, targetFact.id);
        saveGame();
      }
    },
    [useEvidence, saveGame]
  );

  const mappedInventory = mapInventoryForUI(inventory);

  // Title Screen
  if (currentScene === 'TITLE') {
    return (
      <TitleScreen
        onNewGame={handleNewGame}
        onContinue={handleContinue}
        hasSavedGame={hasSaved}
      />
    );
  }

  // Ending Screen
  if (currentScene === 'ENDING' && ending) {
    const endingStats = {
      liesTotal: useGameStore.getState().factLedger?.length || 0,
      suspicionPeak: Math.max(...(wives.map((w) => w.suspicion) || [0])),
      contradictions: playerStats.doubleDownCount + playerStats.diversionCount,
      technicalityCount: playerStats.technicalityCount,
      confidence: playerStats.confidence,
    };

    return (
      <EndingScreen
        ending={ENDING_MAP[ending] || ending}
        onPlayAgain={handlePlayAgain}
        stats={endingStats}
        technicalities={[
          "Temple Run, not Temple!",
          "The pub inside the temple",
          "Champagne-flavored curd rice",
          "Spiritual theme bar",
          "Budget luxury accommodation",
        ]}
      />
    );
  }

  // Game Scenes
  return (
    <>
      {/* Leakage flash overlay */}
      <AnimatePresence>
        {leakageFlash && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[100] bg-yellow-400/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <GameLayout
        sceneTitle={SCENE_TITLES[currentScene] || currentScene}
        globalSuspicion={globalSuspicion}
        wives={wives}
        friends={friends}
        inventory={mappedInventory}
        onUseItem={handleUseItem}
        onVaiRajaVai={handleVaiRajaVai}
        vaiRajaVaiCooldown={vrvCooldown}
        isVaiRajaVaiAvailable={vrvAvailable}
      >
        <SceneManager />
      </GameLayout>
    </>
  );
}
