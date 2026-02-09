import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import ChaosNotification from '../ui/ChaosNotification';
import { pickChaosEvent, CHAOS_FLOOR } from '../../data/chaosEvents';

const SCENE_DIALOGUES = [
  {
    id: 'return_1',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "You're back. Three days in Bangalore with 'the boys.' Must have been quite the spiritual journey.",
    responses: [
      {
        id: 'r1_safe',
        text: "Very peaceful trip. We visited the Dharmasthala temple. Ayyappan even donated to the hundi.",
        type: 'safe',
        fact: {
          subject: 'Bangalore Trip',
          statement: 'Visited Dharmasthala temple',
          consistency_tags: ['location', 'activity'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_activity',
          claim: 'visited Dharmasthala temple',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 2,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_2',
      },
      {
        id: 'r1_risky',
        text: "Actually, it was more interesting than we planned. Bangalore has really changed, Mythili.",
        type: 'risky',
        fact: {
          subject: 'Bangalore Trip',
          statement: 'Trip was eventful and interesting',
          consistency_tags: ['activity'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_activity',
          claim: 'eventful and interesting trip',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 8,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_2',
      },
      {
        id: 'r1_deflect',
        text: "I'm exhausted, Mythili. Can I at least take off my shoes before the interrogation starts?",
        type: 'deflect',
        fact: null,
        suspicionChange: 5,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_2',
      },
    ],
  },
  {
    id: 'return_2',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "Where exactly did you stay? Ammini told me Ayyappan mentioned some lodge on MG Road, but you told me it was a dharamshala near the temple.",
    responses: [
      {
        id: 'r2_safe',
        text: "The dharamshala was full, so we moved to a lodge nearby. Very basic. Clean sheets, that's about it.",
        type: 'safe',
        fact: {
          subject: 'Accommodation',
          statement: 'Simple lodge near temple after dharamshala was full',
          consistency_tags: ['location', 'accommodation'],
          toldTo: 'wife_mythili',
          topic: 'accommodation',
          claim: 'lodge near temple dharamshala was full',
          timestamp: 'bangalore_accommodation',
          location: 'Bangalore Lodge',
          immutable: false,
        },
        suspicionChange: 3,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_3',
      },
      {
        id: 'r2_risky',
        text: "MG Road lodge, yes. It was the closest place to the temple. Very convenient for morning prayers.",
        type: 'risky',
        fact: {
          subject: 'Accommodation',
          statement: 'Stayed at MG Road lodge, close to temple',
          consistency_tags: ['location', 'accommodation'],
          toldTo: 'wife_mythili',
          topic: 'accommodation',
          claim: 'MG Road lodge close to temple',
          timestamp: 'bangalore_accommodation',
          location: 'Bangalore MG Road Lodge',
          immutable: false,
        },
        suspicionChange: 5,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_3',
      },
      {
        id: 'r2_deflect',
        text: "Since when do you and Ammini compare notes on our trips? What is this, CBI investigation?",
        type: 'deflect',
        fact: null,
        suspicionChange: 7,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_3',
      },
    ],
  },
  {
    id: 'return_3',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "And what did you actually do for three days? Because Janaki called and said Vedham came home with a new shirt he definitely didn't own before.",
    responses: [
      {
        id: 'r3_safe',
        text: "Temple visits, some sightseeing, and shopping in Commercial Street. Vedham found a sale, you know how he is.",
        type: 'safe',
        fact: {
          subject: 'Daily Activities',
          statement: 'Visited temples, sightseeing, shopping at Commercial Street',
          consistency_tags: ['activity', 'location'],
          toldTo: 'wife_mythili',
          topic: 'daytime_activity',
          claim: 'temples sightseeing and Commercial Street shopping',
          timestamp: 'bangalore_day1',
          location: 'Bangalore Commercial Street',
          immutable: false,
        },
        suspicionChange: 2,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_4',
      },
      {
        id: 'r3_risky',
        text: "We explored the city. Had good food, saw old friends. The boys wanted to treat me for my birthday.",
        type: 'risky',
        fact: {
          subject: 'Daily Activities',
          statement: 'Birthday celebration in Bangalore, met old friends',
          consistency_tags: ['activity', 'associates'],
          toldTo: 'wife_mythili',
          topic: 'daytime_activity',
          claim: 'birthday celebration met old friends',
          timestamp: 'bangalore_day1',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 6,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_4',
      },
      {
        id: 'r3_deflect',
        text: "You're asking about Vedham's shirt? Ask Vedham's wife about Vedham's shirt. I'm not his personal shopper.",
        type: 'deflect',
        fact: null,
        suspicionChange: 4,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_4',
      },
    ],
  },
  {
    id: 'return_4',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "One more thing. You left your phone charging and it buzzed. Some number from Bangalore. Anyone I should know about?",
    responses: [
      {
        id: 'r4_safe',
        text: "Probably the lodge reception. I asked them to forward any mail that came for us.",
        type: 'safe',
        fact: {
          subject: 'Phone Contact',
          statement: 'Bangalore number is the lodge reception',
          consistency_tags: ['communication', 'associates'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_contact',
          claim: 'lodge reception number',
          timestamp: 'bangalore_evening',
          location: 'Home',
          immutable: false,
        },
        suspicionChange: 3,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_5',
      },
      {
        id: 'r4_risky',
        text: "That's the auto driver who took us around. Very helpful guy. Saved his number in case we go back.",
        type: 'risky',
        fact: {
          subject: 'Phone Contact',
          statement: 'Bangalore number belongs to the auto driver',
          consistency_tags: ['communication', 'associates'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_contact',
          claim: 'auto driver number',
          timestamp: 'bangalore_evening',
          location: 'Home',
          immutable: false,
        },
        suspicionChange: 4,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_5',
      },
      {
        id: 'r4_deflect',
        text: "You're going through my phone now, Mythili? Is there no trust left in this marriage?",
        type: 'deflect',
        fact: null,
        suspicionChange: 10,
        wifeId: 'wife_mythili',
        nextDialogue: 'return_5',
      },
    ],
  },
  {
    id: 'return_5',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "Fine. Mrs. Reddy called about the Ugadi party this weekend. All of us are coming. I hope you and your 'boys' can keep your stories straight.",
    responses: [
      {
        id: 'r5_safe',
        text: "What stories? It was a simple trip. But yes, we'll be at the party. Looking forward to it.",
        type: 'safe',
        fact: null,
        suspicionChange: -2,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
      {
        id: 'r5_risky',
        text: "Keep our stories straight? We only HAVE one story. A temple visit. What's to keep straight?",
        type: 'risky',
        fact: null,
        suspicionChange: 3,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
      {
        id: 'r5_deflect',
        text: "I missed you, Mythili. The whole trip, all I could think about was coming home to you.",
        type: 'deflect',
        fact: null,
        suspicionChange: -5,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
    ],
  },
];

export default function TheReturn() {
  const [currentDialogueId, setCurrentDialogueId] = useState('return_1');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [acquiredPhone, setAcquiredPhone] = useState(false);
  const chaosTimerRef = useRef(null);

  const addFact = useGameStore((s) => s.addFact);
  const updateWifeSuspicion = useGameStore((s) => s.updateWifeSuspicion);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const acquireEvidence = useGameStore((s) => s.acquireEvidence);
  const saveGame = useGameStore((s) => s.saveGame);
  const triggerChaosEvent = useGameStore((s) => s.triggerChaosEvent);
  const chaosEventsTriggered = useGameStore((s) => s.chaosEventsTriggered);
  const currentChaosEvent = useGameStore((s) => s.currentChaosEvent);

  // Chaos event timer — ensure floor of 1 event for THE_RETURN
  useEffect(() => {
    const triggeredIds = chaosEventsTriggered
      .filter((e) => e.scene === 'THE_RETURN')
      .map((e) => e.eventId);
    const floor = CHAOS_FLOOR.THE_RETURN || 1;

    const scheduleChaos = () => {
      const delay = 15000 + Math.random() * 20000;
      chaosTimerRef.current = setTimeout(() => {
        const event = pickChaosEvent('THE_RETURN', triggeredIds);
        if (event) triggerChaosEvent(event);
      }, delay);
    };

    if (triggeredIds.length < floor) {
      // Urgent: fire first event sooner
      const urgentDelay = 8000 + Math.random() * 7000;
      chaosTimerRef.current = setTimeout(() => {
        const event = pickChaosEvent('THE_RETURN', triggeredIds);
        if (event) triggerChaosEvent(event);
        scheduleChaos();
      }, urgentDelay);
    } else {
      scheduleChaos();
    }

    return () => clearTimeout(chaosTimerRef.current);
  }, [triggerChaosEvent, chaosEventsTriggered]);

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
      {/* Chaos event notification */}
      <AnimatePresence>
        {currentChaosEvent && (
          <ChaosNotification event={currentChaosEvent} />
        )}
      </AnimatePresence>

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
