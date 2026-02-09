import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import ChapterCard from '../ui/ChapterCard';
import { THE_CONFRONTATION_DIALOGUES } from '../../data/dialogueContent';

export default function TheConfrontation() {
  const [currentDialogueId, setCurrentDialogueId] = useState('confrontation_1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const addFact = useGameStore((s) => s.addFact);
  const updateMythiliSuspicion = useGameStore((s) => s.updateMythiliSuspicion);
  const setChoice = useGameStore((s) => s.setChoice);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const saveGame = useGameStore((s) => s.saveGame);
  const trackRecapEvent = useGameStore((s) => s.trackRecapEvent);

  const currentDialogue = THE_CONFRONTATION_DIALOGUES.find((d) => d.id === currentDialogueId);

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
          scene: 'THE_CONFRONTATION',
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
          text: 'Mythili swallowed the diamonds. Running to the bridge.',
          scene: 'THE_CONFRONTATION',
        });
        setTimeout(() => {
          transitionScene('THE_BRIDGE');
        }, 1500);
      }
    },
    [addFact, updateMythiliSuspicion, setChoice, transitionScene, saveGame, trackRecapEvent]
  );

  if (!currentDialogue) return null;

  const isMythiliScene = ['confrontation_4', 'confrontation_5', 'confrontation_6'].includes(currentDialogueId);

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-ui text-xs tracking-wide text-ink-light">
          {isMythiliScene ? "Smuggler's Hideout — Mythili Arrives" : "Smuggler's Hideout — Captive"}
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
        <ChapterCard
          scene="THE_CONFRONTATION"
          headline="RUN."
          subtext="Mythili is on the bridge."
          color="text-danger"
        />
      )}
    </div>
  );
}
