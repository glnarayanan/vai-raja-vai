import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';

const FINALE_DIALOGUES = [
  {
    id: 'finale_1',
    speaker: 'Smuggler',
    speakerColor: '#EF4444',
    text: "So. You're the ones who have my diamonds. I've been looking for you. Hand them over, and nobody gets hurt.",
    responses: [
      {
        id: 'f1_safe',
        text: "Diamonds? We don't have any diamonds. You've got the wrong group of men.",
        type: 'safe',
        fact: {
          subject: 'Diamond Possession',
          statement: 'Denied having any diamonds',
          consistency_tags: ['items', 'knowledge'],
          toldTo: 'wife_mythili',
          topic: 'diamonds',
          claim: 'do not have any diamonds',
          timestamp: 'riverbed_finale',
          location: 'Dry Riverbed',
          immutable: false,
        },
        suspicionChange: 0,
        nextDialogue: 'finale_2',
      },
      {
        id: 'f1_risky',
        text: "Maybe we do, maybe we don't. What's it worth to you?",
        type: 'risky',
        fact: {
          subject: 'Diamond Possession',
          statement: 'Implied having the diamonds',
          consistency_tags: ['items', 'knowledge'],
          toldTo: 'wife_mythili',
          topic: 'diamonds',
          claim: 'might have the diamonds',
          timestamp: 'riverbed_finale',
          location: 'Dry Riverbed',
          immutable: false,
        },
        suspicionChange: 5,
        nextDialogue: 'finale_2',
      },
      {
        id: 'f1_deflect',
        text: "Look, there's been a misunderstanding. Let's all calm down and talk like civilized people.",
        type: 'deflect',
        fact: null,
        suspicionChange: 0,
        nextDialogue: 'finale_2',
      },
    ],
  },
  {
    id: 'finale_2',
    speaker: 'Inspector',
    speakerColor: '#3B82F6',
    text: "Nobody move! I'm Inspector Deshpande. I've been watching all of you. The diamonds, the lies, the 'dead' girl — I know everything.",
    responses: [
      {
        id: 'f2_safe',
        text: "Inspector! Thank God you're here! This smuggler was threatening us!",
        type: 'safe',
        fact: {
          subject: 'Inspector Encounter',
          statement: 'Cooperated with inspector immediately',
          consistency_tags: ['authority'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_reason',
          claim: 'we were being threatened by smuggler',
          timestamp: 'riverbed_finale',
          location: 'Dry Riverbed',
          immutable: false,
        },
        suspicionChange: -5,
        nextDialogue: 'finale_3',
      },
      {
        id: 'f2_risky',
        text: "We can explain everything, Inspector. It's not what it looks like.",
        type: 'risky',
        fact: {
          subject: 'Inspector Encounter',
          statement: 'Offered to explain, admitted it looks bad',
          consistency_tags: ['authority'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_reason',
          claim: 'can explain everything',
          timestamp: 'riverbed_finale',
          location: 'Dry Riverbed',
          immutable: false,
        },
        suspicionChange: 3,
        nextDialogue: 'finale_3',
      },
      {
        id: 'f2_deflect',
        text: "Inspector, with all due respect — we're just five friends who went to Bangalore. That's it.",
        type: 'deflect',
        fact: {
          subject: 'Inspector Encounter',
          statement: 'Claimed to be just friends on a trip',
          consistency_tags: ['activity'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_reason',
          claim: 'just five friends who went to Bangalore',
          timestamp: 'riverbed_finale',
          location: 'Dry Riverbed',
          immutable: false,
        },
        suspicionChange: 0,
        nextDialogue: 'finale_3',
      },
    ],
  },
  {
    id: 'finale_3',
    speaker: 'Narrator',
    speakerColor: '#F59E0B',
    text: "The dry riverbed. The same place where it all began. The smuggler wants the diamonds. The inspector wants the truth. The wives want answers. What do you do?",
    isEvidenceToss: true,
    responses: [
      {
        id: 'f3_toss',
        text: "Throw the diamond into the riverbed! Get rid of the evidence!",
        type: 'risky',
        fact: null,
        suspicionChange: 0,
        nextDialogue: null,
        action: 'EVIDENCE_TOSS',
      },
      {
        id: 'f3_surrender',
        text: "Hand the diamond to the inspector. Cooperate fully. It's over.",
        type: 'safe',
        fact: null,
        suspicionChange: -20,
        nextDialogue: null,
        action: 'SURRENDER',
      },
      {
        id: 'f3_bluff',
        text: "There are no diamonds! Maggie was lying! Search us if you want!",
        type: 'deflect',
        fact: null,
        suspicionChange: 0,
        nextDialogue: null,
        action: 'BLUFF',
      },
    ],
  },
];

const RiverbedSVG = () => (
  <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto opacity-60">
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0F0D2E" />
        <stop offset="100%" stopColor="#1E1B4B" />
      </linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#sky)" />
    <circle cx="320" cy="40" r="20" fill="rgba(255,255,255,0.8)" />
    {/* Ground */}
    <path d="M0 150 Q100 140 200 155 Q300 145 400 150 L400 200 L0 200 Z" fill="#3D2B1F" />
    <path d="M0 160 Q80 155 160 165 Q280 155 400 160 L400 200 L0 200 Z" fill="#2D1F14" />
    {/* Rocks */}
    <ellipse cx="50" cy="155" rx="15" ry="8" fill="#4A3728" />
    <ellipse cx="180" cy="160" rx="20" ry="10" fill="#4A3728" />
    <ellipse cx="330" cy="152" rx="12" ry="6" fill="#4A3728" />
    {/* 5 silhouettes sitting */}
    {[60, 130, 200, 270, 340].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={130} r={8} fill="#1a1a2e" />
        <rect x={x - 6} y={138} width={12} height={15} rx={3} fill="#1a1a2e" />
      </g>
    ))}
    {/* Stars */}
    {[
      [30, 20],
      [90, 35],
      [150, 15],
      [220, 30],
      [280, 10],
      [370, 25],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={1} fill="white" opacity={0.6} />
    ))}
  </svg>
);

export default function RiverbedFinale() {
  const [currentDialogueId, setCurrentDialogueId] = useState('finale_1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const addFact = useGameStore((s) => s.addFact);
  const updateWifeSuspicion = useGameStore((s) => s.updateWifeSuspicion);
  const getGlobalSuspicion = useGameStore((s) => s.getGlobalSuspicion);
  const triggerEnding = useGameStore((s) => s.triggerEnding);
  const determineEnding = useGameStore((s) => s.determineEnding);
  const saveGame = useGameStore((s) => s.saveGame);
  const wives = useGameStore((s) => s.wives);
  const inventory = useGameStore((s) => s.inventory);

  const currentDialogue = FINALE_DIALOGUES.find((d) => d.id === currentDialogueId);

  const handleEvidenceToss = useCallback(() => {
    // Check if wives are watching (proximity check)
    const watchingWives = wives.filter((w) => w.suspicion > 50);
    const caughtChance = watchingWives.length * 0.2;

    if (Math.random() < caughtChance) {
      // Caught!
      triggerEnding('INTERNATIONAL_FUGITIVE');
    } else {
      // Success - reduce suspicion significantly
      wives.forEach((w) => updateWifeSuspicion(w.id, -20));
      const ending = determineEnding();
      triggerEnding(ending || 'RIVERBED_RUN');
    }
  }, [wives, updateWifeSuspicion, triggerEnding, determineEnding]);

  const handleSurrender = useCallback(() => {
    wives.forEach((w) => updateWifeSuspicion(w.id, -20));
    const ending = determineEnding();
    triggerEnding(ending || 'CLEAN_SWEEP');
  }, [wives, updateWifeSuspicion, triggerEnding, determineEnding]);

  const handleBluff = useCallback(() => {
    const hasDiamond = inventory.some((i) => i.id === 'item_diamond' && i.acquired);
    if (hasDiamond && Math.random() < 0.4) {
      triggerEnding('INTERNATIONAL_FUGITIVE');
    } else {
      const ending = determineEnding();
      triggerEnding(ending || 'RIVERBED_RUN');
    }
  }, [inventory, triggerEnding, determineEnding]);

  const handleResponse = useCallback(
    (response) => {
      if (response.fact) {
        addFact({ ...response.fact });
      }

      if (response.suspicionChange) {
        updateWifeSuspicion('wife_mythili', response.suspicionChange);
      }

      saveGame();

      if (response.action) {
        setIsTransitioning(true);
        setTimeout(() => {
          switch (response.action) {
            case 'EVIDENCE_TOSS':
              handleEvidenceToss();
              break;
            case 'SURRENDER':
              handleSurrender();
              break;
            case 'BLUFF':
              handleBluff();
              break;
          }
        }, 1500);
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
    [addFact, updateWifeSuspicion, saveGame, handleEvidenceToss, handleSurrender, handleBluff]
  );

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-red-500 font-bold text-2xl">The Riverbed Finale</h2>
        <p className="text-white/50 text-sm mt-1">The Dry Riverbed — Where It All Began</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <RiverbedSVG />
      </motion.div>

      <AnimatePresence mode="wait">
        {!isTransitioning && currentDialogue && (
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

      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70 text-lg"
          >
            The moment of truth...
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
