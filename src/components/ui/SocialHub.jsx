import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NpcAvatar from './NpcAvatar';

const FRIEND_COLORS = {
  OVER_EXPLAINER: '#3B82F6',
  NERVOUS: '#D97706',
  AGREEABLE: '#0F766E',
  LOOSE_CANNON: '#B91C1C',
};

export default function SocialHub({ mythiliSuspicion = 0, friends = [] }) {
  const [selectedNpc, setSelectedNpc] = useState(null);

  const handleNpcClick = (npc) => {
    setSelectedNpc((prev) => (prev?.name === npc.name ? null : npc));
  };

  return (
    <div className="relative w-full border-b border-ink-faint/30 bg-surface">
      <div className="mx-auto max-w-3xl overflow-x-auto px-4 py-3">
        <div className="flex gap-6">
          {/* Mythili */}
          <div className="flex shrink-0 items-start gap-1">
            <span className="mr-2 mt-3 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-light">
              Wife
            </span>
            <button
              className="cursor-pointer bg-transparent p-0"
              onClick={() => handleNpcClick({ name: 'Mythili', suspicion: mythiliSuspicion, color: '#B91C1C' })}
              aria-label={`Mythili — suspicion ${mythiliSuspicion}%`}
            >
              <NpcAvatar
                name="Mythili"
                color="#B91C1C"
                suspicion={mythiliSuspicion}
                isActive={mythiliSuspicion > 0}
              />
            </button>
          </div>

          {/* Separator */}
          {friends.length > 0 && (
            <div className="mx-1 mt-2 w-px self-stretch bg-ink-faint/30" />
          )}

          {/* Friends */}
          {friends.length > 0 && (
            <div className="flex shrink-0 items-start gap-1">
              <span className="mr-2 mt-3 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-light">
                Friends
              </span>
              <div className="flex gap-3">
                {friends.map((friend) => (
                  <button
                    key={friend.name}
                    className="cursor-pointer bg-transparent p-0"
                    onClick={() => handleNpcClick(friend)}
                    aria-label={`${friend.name}${friend.panic > 0 ? ` — panic ${friend.panic}%` : ''}`}
                  >
                    <NpcAvatar
                      name={friend.name}
                      color={FRIEND_COLORS[friend.failureStyle] || '#0F766E'}
                      panic={friend.panic}
                      isActive={friend.panic > 0}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Selected NPC detail - positioned as overlay */}
      <AnimatePresence>
        {selectedNpc && (
          <motion.div
            className="absolute left-1/2 top-full z-40 mt-1 -translate-x-1/2 rounded-lg border border-ink-faint/30 bg-surface px-4 py-2.5 shadow-md"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-3">
              <span className="font-ui font-semibold" style={{ color: selectedNpc.color || FRIEND_COLORS[selectedNpc.failureStyle] || '#0F766E' }}>
                {selectedNpc.name}
              </span>
              {selectedNpc.suspicion !== undefined && (
                <span className="font-ui text-xs text-ink-light">
                  Suspicion: {selectedNpc.suspicion}%
                </span>
              )}
              {selectedNpc.panic !== undefined && selectedNpc.panic > 0 && (
                <span className="font-ui text-xs text-ink-light">
                  Panic: {selectedNpc.panic}%
                </span>
              )}
              {selectedNpc.calmed && (
                <span className="font-ui text-xs text-calm">Calmed</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
