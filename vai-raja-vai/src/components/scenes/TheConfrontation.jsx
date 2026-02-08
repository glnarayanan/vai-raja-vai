import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import RecoveryMode from '../ui/RecoveryMode';

const CONFRONTATION_DIALOGUES = [
  {
    id: 'confront_1',
    speaker: 'Maggie',
    speakerColor: '#F472B6',
    text: "Surprise! Remember me, Ram? I believe you have something that belongs to me. The diamonds. Where are they?",
    responses: [
      {
        id: 'c1_safe',
        text: "I'm sorry, who are you? I think you have the wrong person.",
        type: 'safe',
        fact: {
          subject: 'Maggie Encounter',
          statement: "Don't know this woman",
          consistency_tags: ['people', 'associates'],
          timestamp: '21:00',
        },
        suspicionChange: 3,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_2',
      },
      {
        id: 'c1_risky',
        text: "Maggie! What are you— I mean... how lovely to see you! Old family friend, everyone!",
        type: 'risky',
        fact: {
          subject: 'Maggie Encounter',
          statement: 'Maggie is an old family friend',
          consistency_tags: ['people', 'associates'],
          timestamp: '21:00',
        },
        suspicionChange: 10,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_2',
      },
      {
        id: 'c1_deflect',
        text: "Everyone! Who wants more biryani? The second batch just came out!",
        type: 'deflect',
        fact: null,
        suspicionChange: 5,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_2',
      },
    ],
  },
  {
    id: 'confront_2',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "Ram... who is this woman? And why does she seem to know you so well?",
    responses: [
      {
        id: 'c2_safe',
        text: "She must be one of Reddy's relatives. You know how many people he invites to parties.",
        type: 'safe',
        fact: {
          subject: 'Maggie Identity',
          statement: "Reddy's relative at the party",
          consistency_tags: ['people', 'associates'],
          timestamp: '21:00',
        },
        suspicionChange: 5,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_3',
      },
      {
        id: 'c2_risky',
        text: "She's... a colleague. From work. We worked on a project together. In Bangalore. Once.",
        type: 'risky',
        fact: {
          subject: 'Maggie Identity',
          statement: 'Work colleague from Bangalore project',
          consistency_tags: ['people', 'associates', 'location'],
          timestamp: '21:00',
        },
        suspicionChange: 12,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_3',
      },
      {
        id: 'c2_deflect',
        text: "Mythili, not now. I need to talk to Ayyappan about something urgent. Work stuff.",
        type: 'deflect',
        fact: null,
        suspicionChange: 8,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_3',
      },
    ],
  },
  {
    id: 'confront_3',
    speaker: 'Maggie',
    speakerColor: '#F472B6',
    text: "Don't play games with me, Ram. I know about the Maragadham. Hand it over quietly, or I tell everyone here what REALLY happened in Bangalore.",
    responses: [
      {
        id: 'c3_safe',
        text: "I have no idea what you're talking about. Maragadham? Is that a movie?",
        type: 'safe',
        fact: {
          subject: 'Diamond Reference',
          statement: "Don't know what Maragadham is",
          consistency_tags: ['items', 'knowledge'],
          timestamp: '21:30',
        },
        suspicionChange: 5,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_4',
        diamondRisk: true,
      },
      {
        id: 'c3_risky',
        text: "Lower your voice! Fine, meet me outside in five minutes. We'll sort this out.",
        type: 'risky',
        fact: null,
        suspicionChange: 15,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_4',
      },
      {
        id: 'c3_deflect',
        text: "Everyone, Maggie is clearly confused. She's been drinking. Let me help her find her car.",
        type: 'deflect',
        fact: {
          subject: 'Maggie Status',
          statement: 'Maggie is drunk and confused',
          consistency_tags: ['people'],
          timestamp: '21:30',
        },
        suspicionChange: 7,
        wifeId: 'wife_mythili',
        nextDialogue: 'confront_4',
      },
    ],
  },
  {
    id: 'confront_4',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "Ram. I have been patient. I have listened to five different versions of your Bangalore trip from five different people. I want the TRUTH. Now.",
    responses: [
      {
        id: 'c4_safe',
        text: "Mythili, I promise you — nothing happened in Bangalore that you need to worry about. Trust me.",
        type: 'safe',
        fact: null,
        suspicionChange: 8,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
      {
        id: 'c4_risky',
        text: "Fine. We didn't just go to temples. We went out. Had fun. But that's ALL that happened.",
        type: 'risky',
        fact: {
          subject: 'Truth Admission',
          statement: 'Went out and had fun, nothing else',
          consistency_tags: ['activity'],
          timestamp: '10:00',
        },
        suspicionChange: 12,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
      {
        id: 'c4_deflect',
        text: "You want the truth? Here it is: I love you, I missed you the whole trip, and I'm tired of being interrogated at a party!",
        type: 'deflect',
        fact: null,
        suspicionChange: 5,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
    ],
  },
];

export default function TheConfrontation() {
  const [currentDialogueId, setCurrentDialogueId] = useState('confront_1');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryData, setRecoveryData] = useState(null);

  const addFact = useGameStore((s) => s.addFact);
  const updateWifeSuspicion = useGameStore((s) => s.updateWifeSuspicion);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const validateConsistency = useGameStore((s) => s.validateConsistency);
  const saveGame = useGameStore((s) => s.saveGame);
  const getGlobalSuspicion = useGameStore((s) => s.getGlobalSuspicion);
  const diamondDiscovered = useGameStore((s) => s.diamondDiscovered);
  const triggerEnding = useGameStore((s) => s.triggerEnding);

  const currentDialogue = CONFRONTATION_DIALOGUES.find((d) => d.id === currentDialogueId);

  const handleResponse = useCallback(
    (response) => {
      // Check diamond discovery risk
      if (response.diamondRisk && Math.random() < 0.2) {
        triggerEnding('INTERNATIONAL_FUGITIVE');
        return;
      }

      if (response.fact) {
        const newFact = {
          id: `fact_confront_${Date.now()}`,
          ...response.fact,
          witnesses: [response.wifeId || 'wife_mythili'],
          location: "Reddy's House - Party",
          immutable: false,
          created_at: Date.now(),
        };

        addFact(newFact);

        const validation = validateConsistency(newFact);
        if (validation && validation.hasCollision) {
          setRecoveryData({
            collision: validation,
            wifeId: response.wifeId || 'wife_mythili',
          });
          setShowRecovery(true);
          saveGame();
          return;
        }
      }

      if (response.suspicionChange) {
        updateWifeSuspicion(response.wifeId || 'wife_mythili', response.suspicionChange);
      }

      saveGame();

      const globalSusp = getGlobalSuspicion();
      if (globalSusp >= 85 || !response.nextDialogue) {
        setIsTransitioning(true);
        setTimeout(() => {
          if (globalSusp >= 85) {
            transitionScene('RIVERBED_FINALE');
          } else {
            transitionScene('RIVERBED_FINALE');
          }
        }, 1000);
        return;
      }

      if (response.nextDialogue) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentDialogueId(response.nextDialogue);
          setIsTransitioning(false);
        }, 500);
      }
    },
    [
      addFact,
      updateWifeSuspicion,
      transitionScene,
      validateConsistency,
      saveGame,
      getGlobalSuspicion,
      triggerEnding,
    ]
  );

  const handleRecoveryResolve = useCallback(
    (option) => {
      setShowRecovery(false);
      setRecoveryData(null);

      const dialogue = CONFRONTATION_DIALOGUES.find((d) => d.id === currentDialogueId);
      if (dialogue?.responses?.[0]?.nextDialogue) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentDialogueId(dialogue.responses[0].nextDialogue);
          setIsTransitioning(false);
        }, 500);
      }
    },
    [currentDialogueId]
  );

  const handleRecoveryTimeout = useCallback(() => {
    setShowRecovery(false);
    setRecoveryData(null);
    updateWifeSuspicion('wife_mythili', 20);

    const globalSusp = getGlobalSuspicion();
    if (globalSusp >= 85) {
      transitionScene('RIVERBED_FINALE');
    }
  }, [updateWifeSuspicion, getGlobalSuspicion, transitionScene]);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-kollywood-magenta font-bold text-2xl">The Confrontation</h2>
        <p className="text-white/50 text-sm mt-1">Reddy's House — Tension Rising</p>
      </motion.div>

      {/* Maggie entrance effect */}
      {currentDialogueId === 'confront_1' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-pink-500/20 border border-pink-500 rounded-xl p-3 text-center mb-2"
        >
          <span className="text-xl">⚡</span>
          <p className="text-pink-400 font-semibold text-sm">MAGGIE HAS ARRIVED</p>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {!isTransitioning && !showRecovery && currentDialogue && (
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

      <AnimatePresence>
        {showRecovery && recoveryData && (
          <RecoveryMode
            collision={recoveryData.collision}
            wifeId={recoveryData.wifeId}
            onResolve={handleRecoveryResolve}
            onTimeout={handleRecoveryTimeout}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
