import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import { BANGALORE_BIRTHDAY_DIALOGUES } from '../../data/dialogueContent';

export default function BangaloreBirthday() {
  const [currentDialogueId, setCurrentDialogueId] = useState('birthday_1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const addFact = useGameStore((s) => s.addFact);
  const updateMythiliSuspicion = useGameStore((s) => s.updateMythiliSuspicion);
  const setChoice = useGameStore((s) => s.setChoice);
  const updateFriendPanic = useGameStore((s) => s.updateFriendPanic);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const saveGame = useGameStore((s) => s.saveGame);
  const trackRecapEvent = useGameStore((s) => s.trackRecapEvent);

  const currentDialogue = BANGALORE_BIRTHDAY_DIALOGUES.find((d) => d.id === currentDialogueId);

  const handleResponse = useCallback(
    (response) => {
      if (response.fact) {
        addFact(response.fact);
      }
      if (response.suspicionChange) {
        updateMythiliSuspicion(response.suspicionChange);
      }
      if (response.choiceKey) {
        setChoice(response.choiceKey, response.choiceValue);
        trackRecapEvent({
          type: 'CHOICE',
          text: `${response.choiceKey}: ${response.choiceValue}`,
          scene: 'BANGALORE_BIRTHDAY',
        });
      }
      // Initialize friend panic from body disposal choice
      if (response.panicChange) {
        Object.entries(response.panicChange).forEach(([friendId, amount]) => {
          updateFriendPanic(friendId, amount);
        });
        trackRecapEvent({
          type: 'PANIC_INIT',
          text: 'Friend panic levels initialized from body disposal',
          scene: 'BANGALORE_BIRTHDAY',
        });
      }
      saveGame();

      if (response.nextDialogue) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentDialogueId(response.nextDialogue);
          setIsTransitioning(false);
        }, 500);
      } else {
        setIsTransitioning(true);
        trackRecapEvent({
          type: 'SCENE_END',
          text: 'Bangalore nightmare is over. Back to Chennai.',
          scene: 'BANGALORE_BIRTHDAY',
        });
        setTimeout(() => {
          transitionScene('THE_AFTERMATH');
        }, 1500);
      }
    },
    [addFact, updateMythiliSuspicion, setChoice, updateFriendPanic, transitionScene, saveGame, trackRecapEvent]
  );

  if (!currentDialogue) return null;

  const getSubtitle = () => {
    if (currentDialogueId === 'birthday_1') return 'Chennai — Ram\'s Apartment';
    if (['birthday_2', 'birthday_3'].includes(currentDialogueId)) return 'Bangalore — Hotel Room';
    if (currentDialogueId === 'birthday_4') return 'Bangalore — Parking Lot';
    if (currentDialogueId === 'birthday_5') return 'Highway — Returning from Riverbed';
    return 'Highway — Back to Chennai';
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-kollywood-saffron font-bold text-2xl">Bangalore Birthday</h2>
        <p className="text-white/50 text-sm mt-1">{getSubtitle()}</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentDialogueId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <DialogueBox
              speaker={currentDialogue.speaker}
              text={currentDialogue.text}
              speakerColor={currentDialogue.speakerColor}
            />
            <ResponseOptions
              options={currentDialogue.responses.map((r) => ({
                id: r.id,
                text: r.text,
                type: r.type,
              }))}
              onSelect={(optionId) => {
                const response = currentDialogue.responses.find((r) => r.id === optionId);
                if (response) handleResponse(response);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isTransitioning && !currentDialogue.responses[0]?.nextDialogue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-400 text-lg font-semibold"
          >
            The secret is buried. For now.
          </motion.div>
          <p className="text-white/50 text-sm mt-2">Three days later...</p>
        </motion.div>
      )}
    </div>
  );
}
