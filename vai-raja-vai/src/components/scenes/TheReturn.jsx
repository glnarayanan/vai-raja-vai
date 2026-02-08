import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';

const SCENE_DIALOGUES = [
  {
    id: 'return_1',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "You're back! So... how was Bangalore? You were gone for three whole days.",
    responses: [
      {
        id: 'r1_safe',
        text: "It was peaceful. We visited a few temples and had a quiet time.",
        type: 'safe',
        fact: {
          subject: 'Bangalore Trip',
          statement: 'Visited temples, quiet trip',
          consistency_tags: ['location', 'activity'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_activity',
          claim: 'visited temples',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 2,
        nextDialogue: 'return_2',
      },
      {
        id: 'r1_risky',
        text: "It was... interesting. More eventful than we planned, actually.",
        type: 'risky',
        fact: {
          subject: 'Bangalore Trip',
          statement: 'Eventful trip',
          consistency_tags: ['activity'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_activity',
          claim: 'eventful trip',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 8,
        nextDialogue: 'return_2',
      },
      {
        id: 'r1_deflect',
        text: "I missed you so much! The trip doesn't matter. How have YOU been?",
        type: 'deflect',
        fact: null,
        suspicionChange: 0,
        nextDialogue: 'return_2',
      },
    ],
  },
  {
    id: 'return_2',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "Where exactly did you stay? Ayyappan's wife Alice was asking me and I didn't know what to tell her.",
    responses: [
      {
        id: 'r2_safe',
        text: "A simple lodge on MG Road. Nothing fancy, just a clean place to sleep.",
        type: 'safe',
        fact: {
          subject: 'Accommodation',
          statement: 'Simple lodge on MG Road',
          consistency_tags: ['location', 'accommodation'],
          toldTo: 'wife_mythili',
          topic: 'accommodation',
          claim: 'simple lodge on MG Road',
          timestamp: 'bangalore_accommodation',
          location: 'Bangalore MG Road Lodge',
          immutable: false,
        },
        suspicionChange: 3,
        nextDialogue: 'return_3',
      },
      {
        id: 'r2_risky',
        text: "Reddy's cousin has a place there. Very nice actually — maybe we can go sometime.",
        type: 'risky',
        fact: {
          subject: 'Accommodation',
          statement: "Stayed at Reddy's cousin's place",
          consistency_tags: ['location', 'accommodation', 'associates'],
          toldTo: 'wife_mythili',
          topic: 'accommodation',
          claim: "stayed at Reddy's cousin's place",
          timestamp: 'bangalore_accommodation',
          location: "Reddy's Cousin's Place",
          immutable: false,
        },
        suspicionChange: 5,
        nextDialogue: 'return_3',
      },
      {
        id: 'r2_deflect',
        text: "You know how Ayyappan is — he probably already told Alice everything. Ask her!",
        type: 'deflect',
        fact: null,
        suspicionChange: 4,
        nextDialogue: 'return_3',
      },
    ],
  },
  {
    id: 'return_3',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "And what did you do all day? Three days is a long time for just temples...",
    responses: [
      {
        id: 'r3_safe',
        text: "Temples in the morning, some shopping, early dinner. Ayyappan wanted to see Lalbagh Garden too.",
        type: 'safe',
        fact: {
          subject: 'Daily Activities',
          statement: 'Temples, shopping, Lalbagh Garden',
          consistency_tags: ['activity', 'location'],
          toldTo: 'wife_mythili',
          topic: 'daytime_activity',
          claim: 'temples shopping and Lalbagh Garden',
          timestamp: 'bangalore_day1',
          location: 'Bangalore Lalbagh',
          immutable: false,
        },
        suspicionChange: 2,
        nextDialogue: 'return_4',
      },
      {
        id: 'r3_risky',
        text: "Honestly? Mostly just catching up with the boys. You know how it is when five friends get together.",
        type: 'risky',
        fact: {
          subject: 'Daily Activities',
          statement: 'Catching up with friends',
          consistency_tags: ['activity', 'associates'],
          toldTo: 'wife_mythili',
          topic: 'daytime_activity',
          claim: 'catching up with friends',
          timestamp: 'bangalore_day1',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 6,
        nextDialogue: 'return_4',
      },
      {
        id: 'r3_deflect',
        text: "Same old boring stuff. But look what I got you from Bangalore!",
        type: 'deflect',
        fact: null,
        suspicionChange: -2,
        nextDialogue: 'return_4',
        special: 'GIFT',
      },
    ],
  },
  {
    id: 'return_4',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "Hmm. Your phone was switched off for almost a whole evening. Care to explain?",
    responses: [
      {
        id: 'r4_safe',
        text: "Battery died! You know my phone. I really need to get a new one.",
        type: 'safe',
        fact: {
          subject: 'Phone Status',
          statement: 'Battery died during trip',
          consistency_tags: ['communication', 'time'],
          toldTo: 'wife_mythili',
          topic: 'evening_activity',
          claim: 'phone battery died',
          timestamp: 'bangalore_evening',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 3,
        nextDialogue: 'return_5',
      },
      {
        id: 'r4_risky',
        text: "We were in a temple — I switched it off out of respect. Very spiritual place.",
        type: 'risky',
        fact: {
          subject: 'Phone Status',
          statement: 'Phone off in temple out of respect',
          consistency_tags: ['communication', 'location', 'activity'],
          toldTo: 'wife_mythili',
          topic: 'evening_activity',
          claim: 'switched phone off in temple',
          timestamp: 'bangalore_evening',
          location: 'Bangalore Temple',
          immutable: false,
        },
        suspicionChange: 7,
        nextDialogue: 'return_5',
      },
      {
        id: 'r4_deflect',
        text: "Wait — were you trying to call? I'm sorry, Mythili. I should have been more careful.",
        type: 'deflect',
        fact: null,
        suspicionChange: 1,
        nextDialogue: 'return_5',
      },
    ],
  },
  {
    id: 'return_5',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "One more thing. Reddy's wife Priya mentioned something about a 'special birthday celebration' for you. What was that about?",
    responses: [
      {
        id: 'r5_safe',
        text: "Oh, the boys surprised me with a small cake at the lodge. It was sweet of them.",
        type: 'safe',
        fact: {
          subject: 'Birthday Celebration',
          statement: 'Small cake at the lodge',
          consistency_tags: ['activity', 'location', 'associates'],
          toldTo: 'wife_mythili',
          topic: 'birthday_celebration',
          claim: 'small cake at the lodge',
          timestamp: 'bangalore_night1',
          location: 'Bangalore Lodge',
          immutable: false,
        },
        suspicionChange: 4,
        nextDialogue: null,
      },
      {
        id: 'r5_risky',
        text: "Special? It was just dinner at a restaurant. Reddy always exaggerates everything.",
        type: 'risky',
        fact: {
          subject: 'Birthday Celebration',
          statement: 'Dinner at a restaurant',
          consistency_tags: ['activity', 'location'],
          toldTo: 'wife_mythili',
          topic: 'birthday_celebration',
          claim: 'dinner at a restaurant',
          timestamp: 'bangalore_night1',
          location: 'Bangalore Restaurant',
          immutable: false,
        },
        suspicionChange: 6,
        nextDialogue: null,
      },
      {
        id: 'r5_deflect',
        text: "You know what the best celebration would be? Spending time with you. Let's go out tonight!",
        type: 'deflect',
        fact: null,
        suspicionChange: -3,
        nextDialogue: null,
      },
    ],
  },
];

export default function TheReturn() {
  const [currentDialogueId, setCurrentDialogueId] = useState('return_1');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [acquiredPhone, setAcquiredPhone] = useState(false);

  const addFact = useGameStore((s) => s.addFact);
  const updateWifeSuspicion = useGameStore((s) => s.updateWifeSuspicion);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const acquireEvidence = useGameStore((s) => s.acquireEvidence);
  const saveGame = useGameStore((s) => s.saveGame);

  const currentDialogue = SCENE_DIALOGUES.find((d) => d.id === currentDialogueId);

  const handleResponse = useCallback(
    (response) => {
      if (response.fact) {
        addFact({
          ...response.fact,
        });
      }

      if (response.suspicionChange) {
        updateWifeSuspicion('wife_mythili', response.suspicionChange);
      }

      saveGame();

      if (response.nextDialogue) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentDialogueId(response.nextDialogue);
          setIsTransitioning(false);
        }, 500);
      } else {
        // Scene complete - acquire phone and transition
        if (!acquiredPhone) {
          acquireEvidence('item_phone');
          setAcquiredPhone(true);
        }
        setIsTransitioning(true);
        setTimeout(() => {
          transitionScene('UGADI_PARTY');
        }, 1500);
      }
    },
    [addFact, updateWifeSuspicion, transitionScene, acquireEvidence, saveGame, acquiredPhone]
  );

  if (!currentDialogue) return null;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="text-kollywood-saffron font-bold text-2xl">The Return</h2>
        <p className="text-white/50 text-sm mt-1">Home — Living Room</p>
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

      {isTransitioning && !currentDialogue.responses.find((r) => r.nextDialogue) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-kollywood-lime text-lg font-semibold"
          >
            You found a phone with suspicious call logs...
          </motion.div>
          <p className="text-white/50 text-sm mt-2">Cell Phone acquired!</p>
        </motion.div>
      )}
    </div>
  );
}
