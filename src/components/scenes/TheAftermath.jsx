import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import PanicMeter from '../ui/PanicMeter';
import { THE_AFTERMATH_DIALOGUES } from '../../data/dialogueContent';

export default function TheAftermath() {
  const [currentDialogueId, setCurrentDialogueId] = useState('aftermath_1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const addFact = useGameStore((s) => s.addFact);
  const updateMythiliSuspicion = useGameStore((s) => s.updateMythiliSuspicion);
  const setChoice = useGameStore((s) => s.setChoice);
  const calmFriend = useGameStore((s) => s.calmFriend);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const saveGame = useGameStore((s) => s.saveGame);
  const trackRecapEvent = useGameStore((s) => s.trackRecapEvent);
  const friends = useGameStore((s) => s.friends);

  const currentDialogue = THE_AFTERMATH_DIALOGUES.find((d) => d.id === currentDialogueId);

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
          scene: 'THE_AFTERMATH',
        });
      }

      // Calm friends based on dialogue node
      if (currentDialogueId === 'aftermath_2') {
        const method = response.id.includes('reassure') ? 'reassure' : 'threaten';
        calmFriend('friend_ayyappan', method);
      }
      if (currentDialogueId === 'aftermath_3') {
        calmFriend('friend_vedham', 'reassure');
      }
      if (currentDialogueId === 'aftermath_4') {
        calmFriend('friend_hegde', 'reassure');
      }
      if (currentDialogueId === 'aftermath_5') {
        calmFriend('friend_reddy', 'reassure');
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
          text: 'Ugadi party awaits.',
          scene: 'THE_AFTERMATH',
        });
        setTimeout(() => {
          transitionScene('UGADI_PARTY');
        }, 1500);
      }
    },
    [addFact, updateMythiliSuspicion, setChoice, calmFriend, transitionScene, saveGame, trackRecapEvent, currentDialogueId]
  );

  if (!currentDialogue) return null;

  const isFriendCalming = ['aftermath_2', 'aftermath_3', 'aftermath_4', 'aftermath_5'].includes(currentDialogueId);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-kollywood-saffron font-bold text-2xl">The Aftermath</h2>
        <p className="text-white/50 text-sm mt-1">Chennai — Three Days Later</p>
      </motion.div>

      {/* Show panic meter during friend-calming dialogues */}
      {isFriendCalming && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PanicMeter friends={friends} />
        </motion.div>
      )}

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
            className="text-amber-400 text-lg font-semibold"
          >
            The Ugadi party approaches...
          </motion.div>
          <p className="text-white/50 text-sm mt-2">One chance to fix everything.</p>
        </motion.div>
      )}
    </div>
  );
}
