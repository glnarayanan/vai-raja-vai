import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from './store/gameStore';
import TitleScreen from './components/TitleScreen';
import GameLayout from './components/ui/GameLayout';
import SceneManager from './components/scenes/SceneManager';
import EndingScreen from './components/endings/EndingScreen';

const SCENE_TITLES = {
  THE_FLIGHT: 'The Flight',
  THE_MISUNDERSTANDING: 'The Misunderstanding',
  BANGALORE_BIRTHDAY: 'Bangalore Birthday',
  THE_AFTERMATH: 'The Aftermath',
  UGADI_PARTY: 'The Ugadi Party',
  THE_CONFRONTATION: 'The Confrontation',
  THE_BRIDGE: 'The Bridge',
};

export default function App() {
  const currentScene = useGameStore((s) => s.currentScene);
  const endingQuality = useGameStore((s) => s.endingQuality);
  const mythiliSuspicion = useGameStore((s) => s.mythiliSuspicion);
  const friends = useGameStore((s) => s.friends);
  const inventory = useGameStore((s) => s.inventory);

  const startNewGame = useGameStore((s) => s.startNewGame);
  const loadGame = useGameStore((s) => s.loadGame);
  const hasSaveGame = useGameStore((s) => s.hasSaveGame);
  const saveGame = useGameStore((s) => s.saveGame);
  const useEvidence = useGameStore((s) => s.useEvidence);

  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    setHasSaved(hasSaveGame());
  }, [hasSaveGame]);

  const handleNewGame = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  const handleContinue = useCallback(() => {
    loadGame();
  }, [loadGame]);

  const handlePlayAgain = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

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

  // Map inventory for InventoryBar (simplified for v3)
  const mappedInventory = inventory
    .filter((item) => item.acquired)
    .map((item) => ({
      id: item.id,
      type: item.id === 'item_diamond' ? 'diamond' : item.id === 'item_phone' ? 'phone' : item.id,
      usesRemaining: 99,
      name: item.name,
    }));

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
  if (currentScene === 'ENDING' && endingQuality) {
    return (
      <EndingScreen
        endingQuality={endingQuality}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  // Game Scenes
  return (
    <GameLayout
      sceneTitle={SCENE_TITLES[currentScene] || currentScene}
      mythiliSuspicion={mythiliSuspicion}
      friends={friends}
      inventory={mappedInventory}
      onUseItem={handleUseItem}
    >
      <SceneManager />
    </GameLayout>
  );
}
