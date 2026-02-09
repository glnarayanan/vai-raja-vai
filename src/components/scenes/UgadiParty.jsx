import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import DialogueBox from '../ui/DialogueBox';
import ResponseOptions from '../ui/ResponseOptions';
import RecoveryMode from '../ui/RecoveryMode';
import { chaoticPool } from '../../data/chaoticPool';

const PARTY_DIALOGUES = [
  {
    id: 'party_1',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "So, how was Bangalore? I heard it was quite the trip. Tell me everything!",
    responses: [
      {
        id: 'p1_safe',
        text: "Very simple trip. Temples, food, and early nights. Nothing exciting at all.",
        type: 'safe',
        fact: {
          subject: 'Bangalore Trip',
          statement: 'Temples, food, early nights',
          consistency_tags: ['activity', 'time'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_activity',
          claim: 'temples food and early nights',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 2,
        wifeId: 'wife_mythili',
        nextDialogue: 'party_2',
      },
      {
        id: 'p1_risky',
        text: "Bangalore is always fun! Great food, great weather. We should all go sometime.",
        type: 'risky',
        fact: {
          subject: 'Bangalore Trip',
          statement: 'Fun trip, great food and weather',
          consistency_tags: ['activity'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_activity',
          claim: 'fun trip with great food',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 5,
        wifeId: 'wife_mythili',
        nextDialogue: 'party_2',
      },
      {
        id: 'p1_deflect',
        text: "Forget Bangalore — this party is amazing! The decorations are beautiful.",
        type: 'deflect',
        fact: null,
        suspicionChange: 0,
        wifeId: 'wife_mythili',
        nextDialogue: 'party_2',
      },
    ],
  },
  {
    id: 'party_2',
    speaker: 'Ammini',
    speakerColor: '#14B8A6',
    text: "Ayyappan said something about a really fancy hotel? But you told Mythili it was a simple lodge...",
    triggerBlurtCheck: true,
    friendInvolved: 'friend_ayyappan',
    responses: [
      {
        id: 'p2_safe',
        text: "Ayyappan exaggerates! It had a nice lobby but the rooms were very basic.",
        type: 'safe',
        fact: {
          subject: 'Accommodation',
          statement: 'Nice lobby but basic rooms',
          consistency_tags: ['location', 'accommodation'],
          toldTo: 'wife_ammini',
          topic: 'accommodation',
          claim: 'nice lobby but basic rooms',
          timestamp: 'bangalore_accommodation',
          location: 'Bangalore Hotel',
          immutable: false,
        },
        suspicionChange: 3,
        wifeId: 'wife_ammini',
        nextDialogue: 'party_3',
      },
      {
        id: 'p2_risky',
        text: "We changed hotels on the second day. The first one was... not great.",
        type: 'risky',
        fact: {
          subject: 'Accommodation',
          statement: 'Changed hotels on day 2',
          consistency_tags: ['location', 'accommodation', 'time'],
          toldTo: 'wife_ammini',
          topic: 'accommodation',
          claim: 'changed hotels on day two',
          timestamp: 'bangalore_accommodation',
          location: 'Bangalore Second Hotel',
          immutable: false,
        },
        suspicionChange: 8,
        wifeId: 'wife_ammini',
        nextDialogue: 'party_3',
      },
      {
        id: 'p2_deflect',
        text: "Ammini! Have you tried the biryani? Mrs. Reddy makes the best biryani in the city!",
        type: 'deflect',
        fact: null,
        suspicionChange: 1,
        wifeId: 'wife_ammini',
        nextDialogue: 'party_3',
      },
    ],
  },
  {
    id: 'party_3',
    speaker: 'Chamundi',
    speakerColor: '#F59E0B',
    text: "My husband Reddy keeps mentioning some girl's name in his sleep. 'Maggi' or something? Do you know who that is?",
    responses: [
      {
        id: 'p3_safe',
        text: "Maggi? He's probably dreaming about Maggi noodles. You know how he loves his snacks!",
        type: 'safe',
        fact: {
          subject: 'Maggi Reference',
          statement: 'Maggi is noodles, Reddy loves snacks',
          consistency_tags: ['people', 'associates'],
          toldTo: 'wife_chamundi',
          topic: 'maggie_identity',
          claim: 'maggi means noodles',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 2,
        wifeId: 'wife_chamundi',
        nextDialogue: 'party_4',
      },
      {
        id: 'p3_risky',
        text: "Oh, that's the name of the restaurant we went to. 'Maggi's Kitchen.' Very popular.",
        type: 'risky',
        fact: {
          subject: 'Maggi Reference',
          statement: "Maggi's Kitchen restaurant",
          consistency_tags: ['location', 'people'],
          toldTo: 'wife_chamundi',
          topic: 'maggie_identity',
          claim: "maggi is a restaurant name",
          timestamp: 'bangalore_trip',
          location: "Maggi's Kitchen",
          immutable: false,
        },
        suspicionChange: 6,
        wifeId: 'wife_chamundi',
        nextDialogue: 'party_4',
      },
      {
        id: 'p3_deflect',
        text: "Chamundi, I think Reddy just talks a lot in his sleep. My mother used to do the same!",
        type: 'deflect',
        fact: null,
        suspicionChange: 1,
        wifeId: 'wife_chamundi',
        nextDialogue: 'party_4',
      },
    ],
  },
  {
    id: 'party_4',
    speaker: 'Janaki',
    speakerColor: '#BEF264',
    text: "Hegde told me you all went to bed by 10 PM every night. But Vedham's wife says he called her at 2 AM sounding very... awake.",
    triggerBlurtCheck: true,
    friendInvolved: 'friend_hegde',
    responses: [
      {
        id: 'p4_safe',
        text: "Vedham had a stomachache one night. He was up, the rest of us were asleep.",
        type: 'safe',
        fact: {
          subject: 'Nighttime Activities',
          statement: 'Vedham had stomachache, others slept',
          consistency_tags: ['time', 'activity', 'associates'],
          toldTo: 'wife_janaki',
          topic: 'nighttime_activity',
          claim: 'everyone slept except Vedham stomachache',
          timestamp: 'bangalore_night1',
          location: 'Bangalore Hotel',
          immutable: false,
        },
        suspicionChange: 3,
        wifeId: 'wife_janaki',
        nextDialogue: 'party_5',
      },
      {
        id: 'p4_risky',
        text: "We watched a late movie one night. Very boring Telugu film. Everyone fell asleep during it.",
        type: 'risky',
        fact: {
          subject: 'Nighttime Activities',
          statement: 'Watched late movie, fell asleep',
          consistency_tags: ['time', 'activity'],
          toldTo: 'wife_janaki',
          topic: 'nighttime_activity',
          claim: 'watched a late movie',
          timestamp: 'bangalore_night1',
          location: 'Bangalore Hotel',
          immutable: false,
        },
        suspicionChange: 7,
        wifeId: 'wife_janaki',
        nextDialogue: 'party_5',
      },
      {
        id: 'p4_deflect',
        text: "Janaki, you know how Vedham worries. He probably just called to say goodnight. Such a sweet husband!",
        type: 'deflect',
        fact: null,
        suspicionChange: 0,
        wifeId: 'wife_janaki',
        nextDialogue: 'party_5',
      },
    ],
  },
  {
    id: 'party_5',
    speaker: 'Mrs. Reddy',
    speakerColor: '#818CF8',
    text: "I found a receipt in Vedham's pocket. From somewhere called 'Paradise Lounge.' Is that a temple?",
    responses: [
      {
        id: 'p5_safe',
        text: "It's a vegetarian restaurant! 'Paradise' is a famous biryani chain in Bangalore.",
        type: 'safe',
        fact: {
          subject: 'Paradise Receipt',
          statement: 'Paradise is a vegetarian restaurant chain',
          consistency_tags: ['location', 'activity'],
          toldTo: 'wife_mrs_reddy',
          topic: 'paradise_visit',
          claim: 'paradise is a vegetarian restaurant',
          timestamp: 'bangalore_day2',
          location: 'Bangalore Paradise Restaurant',
          immutable: false,
        },
        suspicionChange: 3,
        wifeId: 'wife_mrs_reddy',
        nextDialogue: 'party_6',
      },
      {
        id: 'p5_risky',
        text: "Must be from a previous trip. We didn't go to any place called Paradise.",
        type: 'risky',
        fact: {
          subject: 'Paradise Receipt',
          statement: 'Receipt is from previous trip',
          consistency_tags: ['location', 'time'],
          toldTo: 'wife_mrs_reddy',
          topic: 'paradise_visit',
          claim: 'receipt is from a previous trip',
          timestamp: 'bangalore_day2',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 5,
        wifeId: 'wife_mrs_reddy',
        nextDialogue: 'party_6',
      },
      {
        id: 'p5_deflect',
        text: "Mrs. Reddy, are you going through Vedham's pockets? That's not very trusting of you!",
        type: 'deflect',
        fact: null,
        suspicionChange: 2,
        wifeId: 'wife_mrs_reddy',
        nextDialogue: 'party_6',
      },
    ],
  },
  {
    id: 'party_6',
    speaker: 'Mythili',
    speakerColor: '#D946EF',
    text: "I've been talking to the other wives. Some of your stories don't quite add up, Ram. Care to clarify?",
    triggerBlurtCheck: true,
    friendInvolved: 'friend_reddy',
    responses: [
      {
        id: 'p6_safe',
        text: "Mythili, five men remembering a trip differently is perfectly normal. Ask any group of friends!",
        type: 'safe',
        fact: null,
        suspicionChange: 4,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
      {
        id: 'p6_risky',
        text: "What doesn't add up? We went to Bangalore, visited some places, came home. Simple.",
        type: 'risky',
        fact: {
          subject: 'Trip Summary',
          statement: 'Simple Bangalore trip, nothing more',
          consistency_tags: ['activity'],
          toldTo: 'wife_mythili',
          topic: 'bangalore_activity',
          claim: 'simple trip nothing more',
          timestamp: 'bangalore_trip',
          location: 'Bangalore',
          immutable: false,
        },
        suspicionChange: 8,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
      {
        id: 'p6_deflect',
        text: "You're right. Maybe we should all sit down and I'll tell the whole story. Just... not right now. The biryani is getting cold!",
        type: 'deflect',
        fact: null,
        suspicionChange: 3,
        wifeId: 'wife_mythili',
        nextDialogue: null,
      },
    ],
  },
];

export default function UgadiParty() {
  const [currentDialogueId, setCurrentDialogueId] = useState('party_1');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryData, setRecoveryData] = useState(null);
  const [foundPhoto, setFoundPhoto] = useState(false);
  const [blurtMessage, setBlurtMessage] = useState(null);
  const alcoholTimerRef = useRef(null);
  const photoTimerRef = useRef(null);

  const addFact = useGameStore((s) => s.addFact);
  const updateWifeSuspicion = useGameStore((s) => s.updateWifeSuspicion);
  const transitionScene = useGameStore((s) => s.transitionScene);
  const friends = useGameStore((s) => s.friends);
  const wives = useGameStore((s) => s.wives);
  const incrementAlcohol = useGameStore((s) => s.incrementAlcohol);
  const acquireEvidence = useGameStore((s) => s.acquireEvidence);
  const factLedger = useGameStore((s) => s.factLedger);
  const validateConsistency = useGameStore((s) => s.validateConsistency);
  const triggerRecoveryMode = useGameStore((s) => s.triggerRecoveryMode);
  const resolveRecovery = useGameStore((s) => s.resolveRecovery);
  const saveGame = useGameStore((s) => s.saveGame);
  const getGlobalSuspicion = useGameStore((s) => s.getGlobalSuspicion);
  const foundPhotoRef = useRef(false);

  // Alcohol timer - increment every 30 seconds (game time accelerated)
  useEffect(() => {
    alcoholTimerRef.current = setInterval(() => {
      const friendIds = ['friend_ayyappan', 'friend_vedham', 'friend_hegde', 'friend_reddy'];
      const randomFriend = friendIds[Math.floor(Math.random() * friendIds.length)];
      incrementAlcohol(randomFriend);
    }, 30000);

    return () => clearInterval(alcoholTimerRef.current);
  }, [incrementAlcohol]);

  // Keep foundPhotoRef in sync with foundPhoto state
  useEffect(() => {
    foundPhotoRef.current = foundPhoto;
  }, [foundPhoto]);

  // Photo discovery timer
  useEffect(() => {
    if (foundPhoto) return;

    const tryFindPhoto = () => {
      if (foundPhotoRef.current) return;
      if (Math.random() < 0.6) {
        acquireEvidence('item_photo');
        setFoundPhoto(true);
        foundPhotoRef.current = true;
        clearTimeout(photoTimerRef.current);
      }
    };

    // Try at 30 seconds, guaranteed at 60 seconds
    photoTimerRef.current = setTimeout(() => {
      tryFindPhoto();
      if (!foundPhotoRef.current) {
        photoTimerRef.current = setTimeout(() => {
          if (!foundPhotoRef.current) {
            acquireEvidence('item_photo');
            setFoundPhoto(true);
            foundPhotoRef.current = true;
          }
        }, 30000);
      }
    }, 30000);

    return () => clearTimeout(photoTimerRef.current);
  }, [foundPhoto, acquireEvidence]);

  const checkForBlurt = useCallback(
    (friendId) => {
      const friend = friends.find((f) => f.id === friendId);
      if (!friend) return null;

      const isUnsynced = !friend.lastSyncedAt || friend.knowledgeBase.length === 0;
      const isDrunk = friend.reliability < 40 || friend.alcohol_level > 3;

      if (isUnsynced || isDrunk) {
        const blurtChance = isUnsynced ? 0.7 : 0.5;
        if (Math.random() < blurtChance) {
          const subjects = Object.keys(chaoticPool);
          const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
          const blurts = chaoticPool[randomSubject]?.[friend.failureStyle] || [];
          if (blurts.length > 0) {
            return {
              friend,
              blurt: blurts[Math.floor(Math.random() * blurts.length)],
              subject: randomSubject,
            };
          }
        }
      }
      return null;
    },
    [friends]
  );

  const handleResponse = useCallback(
    (response) => {
      const dialogue = PARTY_DIALOGUES.find((d) => d.id === currentDialogueId);

      if (response.fact) {
        const newFact = {
          ...response.fact,
        };

        addFact(newFact);

        // Check consistency
        const validation = validateConsistency(newFact);
        if (validation && validation.hasCollision) {
          const wifeId = response.wifeId || 'wife_mythili';
          const wife = wives.find((w) => w.id === wifeId) || wives[0];
          setRecoveryData({
            collision: validation,
            wife,
          });
          setShowRecovery(true);
          saveGame();
          return;
        }
      }

      if (response.suspicionChange && response.wifeId) {
        updateWifeSuspicion(response.wifeId, response.suspicionChange);
      }

      // Check for friend blurt
      if (dialogue?.triggerBlurtCheck && dialogue?.friendInvolved) {
        const blurtResult = checkForBlurt(dialogue.friendInvolved);
        if (blurtResult) {
          setBlurtMessage(blurtResult);
          updateWifeSuspicion(response.wifeId || 'wife_mythili', 15);
          // Trigger recovery after showing the blurt
          setTimeout(() => {
            setBlurtMessage(null);
            const blurtWifeId = response.wifeId || 'wife_mythili';
            const blurtWife = wives.find((w) => w.id === blurtWifeId) || wives[0];
            setRecoveryData({
              collision: {
                hasCollision: true,
                collisionType: 'CHAOTIC_BLURT',
                blurt: blurtResult.blurt,
                friend: blurtResult.friend.name,
              },
              wife: blurtWife,
            });
            setShowRecovery(true);
          }, 2000);
          saveGame();
          return;
        }
      }

      saveGame();

      // Check for scene transition based on suspicion
      const globalSusp = getGlobalSuspicion();
      if (globalSusp >= 60 || !response.nextDialogue) {
        setIsTransitioning(true);
        setTimeout(() => {
          transitionScene('THE_CONFRONTATION');
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
      currentDialogueId,
      addFact,
      updateWifeSuspicion,
      transitionScene,
      checkForBlurt,
      validateConsistency,
      saveGame,
      getGlobalSuspicion,
      wives,
    ]
  );

  const handleRecoveryResolve = useCallback(
    (optionId) => {
      // Call the store's resolveRecovery with SCREAMING_SNAKE_CASE option
      const optionMap = { 'technicality': 'TECHNICALITY', 'double-down': 'DOUBLE_DOWN', 'diversion': 'DIVERSION' };
      resolveRecovery(optionMap[optionId] || optionId);

      setShowRecovery(false);
      setRecoveryData(null);

      const dialogue = PARTY_DIALOGUES.find((d) => d.id === currentDialogueId);
      const currentResponse = dialogue?.responses?.[0];

      if (currentResponse?.nextDialogue) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentDialogueId(currentResponse.nextDialogue);
          setIsTransitioning(false);
        }, 500);
      }
    },
    [currentDialogueId, resolveRecovery]
  );

  const handleRecoveryTimeout = useCallback(() => {
    // Use getState() to avoid stale closure over recoveryData
    const currentRecoveryData = useGameStore.getState().recoveryMode;
    const wifeId = currentRecoveryData?.wife || 'wife_mythili';

    setShowRecovery(false);
    setRecoveryData(null);
    updateWifeSuspicion(wifeId, 20);

    const globalSusp = getGlobalSuspicion();
    if (globalSusp >= 85) {
      transitionScene('RIVERBED_FINALE');
    }
  }, [updateWifeSuspicion, getGlobalSuspicion, transitionScene]);

  const currentDialogue = PARTY_DIALOGUES.find((d) => d.id === currentDialogueId);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <h2 className="text-kollywood-saffron font-bold text-2xl">The Ugadi Party</h2>
        <p className="text-white/50 text-sm mt-1">Reddy's House — Multiple Rooms</p>
      </motion.div>

      {/* Friend blurt notification */}
      <AnimatePresence>
        {blurtMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-kollywood-magenta/20 border-2 border-kollywood-magenta rounded-xl p-4"
          >
            <p className="text-kollywood-saffron font-semibold text-sm uppercase tracking-wide">
              {blurtMessage.friend.name} blurts out:
            </p>
            <p className="text-white text-lg mt-2 italic">"{blurtMessage.blurt}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Found photo notification */}
      <AnimatePresence>
        {foundPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-kollywood-lime/20 border border-kollywood-lime rounded-lg p-3 text-center"
          >
            <span className="text-2xl">📷</span>
            <p className="text-kollywood-lime text-sm font-semibold">Maggi Photo found!</p>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Recovery Mode Overlay */}
      <AnimatePresence>
        {showRecovery && recoveryData && (
          <RecoveryMode
            collision={recoveryData.collision}
            wife={recoveryData.wife}
            onResolve={handleRecoveryResolve}
            onTimeout={handleRecoveryTimeout}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
