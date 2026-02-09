import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import ChapterCard from '../ui/ChapterCard';
import PanicNotification from '../ui/PanicNotification';
import PanicMeter from '../ui/PanicMeter';
import { UGADI_PARTY_DIALOGUES } from '../../data/dialogueContent';

export default function UgadiParty() {
  const [currentDialogueId, setCurrentDialogueId] = useState('party_1');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const leakCheckDone = useRef(new Set());

  const addFact = useGameStore((s) => s.addFact);
  const updateMythiliSuspicion = useGameStore((s) => s.updateMythiliSuspicion);
  const setChoice = useGameStore((s) => s.setChoice);
  const rollFriendLeak = useGameStore((s) => s.rollFriendLeak);
  const triggerPanicAlert = useGameStore((s) => s.triggerPanicAlert);
  const acquireEvidence = useGameStore((s) => s.acquireEvidence);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const saveGame = useGameStore((s) => s.saveGame);
  const trackRecapEvent = useGameStore((s) => s.trackRecapEvent);
  const friends = useGameStore((s) => s.friends);
  const currentPanicAlert = useGameStore((s) => s.currentPanicAlert);

  const currentDialogue = UGADI_PARTY_DIALOGUES.find((d) => d.id === currentDialogueId);

  // Check for friend leaks at key transition points (between dialogue nodes)
  useEffect(() => {
    const leakNodes = ['party_2', 'party_2b', 'party_4', 'party_5'];
    if (!leakNodes.includes(currentDialogueId)) return;
    if (leakCheckDone.current.has(currentDialogueId)) return;
    leakCheckDone.current.add(currentDialogueId);

    // Pick a random friend to check for leak
    const shuffled = [...friends].sort(() => Math.random() - 0.5);
    for (const friend of shuffled) {
      const result = rollFriendLeak(friend.id);
      if (result.leaked) {
        triggerPanicAlert({
          friendId: friend.id,
          friendName: friend.name,
          leakText: result.leakText,
        });
        updateMythiliSuspicion(12);
        trackRecapEvent({
          type: 'FRIEND_LEAK',
          text: `${friend.name} cracked at the party: "${result.leakText}"`,
          scene: 'UGADI_PARTY',
        });
        break;
      }
    }
  }, [currentDialogueId, friends, rollFriendLeak, triggerPanicAlert, updateMythiliSuspicion, trackRecapEvent]);

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
          scene: 'UGADI_PARTY',
        });
      }
      // Maggie reveals diamonds at party_6 — player now knows about the diamond cache
      if (currentDialogueId === 'party_6') {
        acquireEvidence('item_diamond');
        trackRecapEvent({
          type: 'DIAMOND_REVEAL',
          text: 'Maggie revealed the diamonds hidden in her phone case',
          scene: 'UGADI_PARTY',
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
          text: 'Kidnapped by the smuggler. Mythili saw everything.',
          scene: 'UGADI_PARTY',
        });
        setTimeout(() => {
          transitionScene('THE_CONFRONTATION');
        }, 1500);
      }
    },
    [addFact, updateMythiliSuspicion, setChoice, acquireEvidence, transitionScene, saveGame, trackRecapEvent, currentDialogueId]
  );

  if (!currentDialogue) return null;

  const isMaggieScene = ['party_5', 'party_6', 'party_7', 'party_8'].includes(currentDialogueId);

  return (
    <div className="flex flex-col gap-5">
      {/* Panic alert overlay */}
      <AnimatePresence>
        {currentPanicAlert && (
          <PanicNotification alert={currentPanicAlert} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-ui text-xs tracking-wide text-ink-light">
          {isMaggieScene ? "Reddy's House — Everything Falls Apart" : "Reddy's House — Ugadi Celebration"}
        </p>
      </motion.div>

      {/* Panic meter visible during party */}
      {!isMaggieScene && (
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
              isAmbush={isMaggieScene}
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
          scene="UGADI_PARTY"
          headline="Dragged away at gunpoint..."
          subtext="The smuggler's hideout awaits."
          color="text-danger"
        />
      )}
    </div>
  );
}
