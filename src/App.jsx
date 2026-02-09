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

  let screen;

  if (currentScene === 'TITLE') {
    screen = (
      <TitleScreen
        onNewGame={handleNewGame}
        onContinue={handleContinue}
        hasSavedGame={hasSaved}
      />
    );
  } else if (currentScene === 'ENDING' && endingQuality) {
    screen = (
      <EndingScreen
        endingQuality={endingQuality}
        onPlayAgain={handlePlayAgain}
      />
    );
  } else {
    screen = (
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

  return (
    <>
      {screen}
      <footer className="fixed inset-x-0 bottom-0 z-30 py-2 text-center font-body text-xs leading-relaxed text-ink-faint">
        <p>
          Created with ❤️, nostalgia, and 🤖 by Lakshmi Narayanan (LN)
          {' — '}
          <a href="https://x.com/_glnarayanan" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-faint/40 underline-offset-2 transition-colors duration-200 hover:text-ink-light">X</a>
          {' · '}
          <a href="https://linkedin.com/in/glnarayanan" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-faint/40 underline-offset-2 transition-colors duration-200 hover:text-ink-light">LinkedIn</a>
          {' · '}
          <a href="https://gln.me" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-faint/40 underline-offset-2 transition-colors duration-200 hover:text-ink-light">Website</a>
        </p>
      </footer>
    </>
  );
}
