import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import { THE_BRIDGE_DIALOGUES } from '../../data/dialogueContent';

export default function TheBridge() {
  const [currentDialogueId, setCurrentDialogueId] = useState('bridge_1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const addFact = useGameStore((s) => s.addFact);
  const setChoice = useGameStore((s) => s.setChoice);
  const triggerEnding = useGameStore((s) => s.triggerEnding);
  const saveGame = useGameStore((s) => s.saveGame);
  const trackRecapEvent = useGameStore((s) => s.trackRecapEvent);

  const currentDialogue = THE_BRIDGE_DIALOGUES.find((d) => d.id === currentDialogueId);

  const handleResponse = useCallback(
    (response) => {
      if (response.fact) {
        addFact(response.fact);
      }
      if (response.choiceKey) {
        setChoice(response.choiceKey, response.choiceValue);
        trackRecapEvent({
          type: 'CHOICE',
          text: `${response.choiceKey}: ${response.choiceValue}`,
          scene: 'THE_BRIDGE',
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
        // Final scene — trigger ending
        setIsTransitioning(true);
        trackRecapEvent({
          type: 'GAME_END',
          text: 'Ram saved Mythili. The truth came out.',
          scene: 'THE_BRIDGE',
        });
        setTimeout(() => {
          triggerEnding();
        }, 2500);
      }
    },
    [addFact, setChoice, triggerEnding, saveGame, trackRecapEvent]
  );

  if (!currentDialogue) return null;

  const isReconciliation = ['bridge_4', 'bridge_5'].includes(currentDialogueId);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className={`font-bold text-2xl ${isReconciliation ? 'text-kollywood-teal' : 'text-red-400'}`}>
          {isReconciliation ? 'Reconciliation' : 'The Bridge'}
        </h2>
        <p className="text-white/50 text-sm mt-1">
          {isReconciliation ? 'The truth comes out.' : 'The bridge — everything ends here.'}
        </p>
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
              isPressured={!isReconciliation}
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
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="text-kollywood-teal text-2xl font-bold"
          >
            Together again.
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/50 text-sm mt-3"
          >
            The whole truth is finally out.
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
