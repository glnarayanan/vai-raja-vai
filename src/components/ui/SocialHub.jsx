import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NpcAvatar from './NpcAvatar';

const FRIEND_COLORS = {
  OVER_EXPLAINER: '#3B82F6',
  NERVOUS: '#F59E0B',
  AGREEABLE: '#14B8A6',
  LOOSE_CANNON: '#EF4444',
};

export default function SocialHub({ mythiliSuspicion = 0, friends = [] }) {
  const [selectedNpc, setSelectedNpc] = useState(null);

  const handleNpcClick = (npc) => {
    setSelectedNpc((prev) => (prev?.name === npc.name ? null : npc));
  };

  return (
    <div className="relative w-full border-b border-white/10 bg-kollywood-deep/60 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="flex gap-6">
          {/* Mythili */}
          <div className="flex shrink-0 items-start gap-1">
            <span className="mr-2 mt-3 text-[10px] font-semibold uppercase tracking-widest text-kollywood-magenta/60">
              Wife
            </span>
            <button
              className="cursor-pointer bg-transparent p-0"
              onClick={() => handleNpcClick({ name: 'Mythili', suspicion: mythiliSuspicion, color: '#D946EF' })}
            >
              <NpcAvatar
                name="Mythili"
                color="#D946EF"
                suspicion={mythiliSuspicion}
                isActive={mythiliSuspicion > 0}
              />
            </button>
          </div>

          {/* Separator */}
          {friends.length > 0 && (
            <div className="mx-1 mt-2 w-px self-stretch bg-white/10" />
          )}

          {/* Friends */}
          {friends.length > 0 && (
            <div className="flex shrink-0 items-start gap-1">
              <span className="mr-2 mt-3 text-[10px] font-semibold uppercase tracking-widest text-kollywood-teal/60">
                Friends
              </span>
              <div className="flex gap-3">
                {friends.map((friend) => (
                  <button
                    key={friend.name}
                    className="cursor-pointer bg-transparent p-0"
                    onClick={() => handleNpcClick(friend)}
                  >
                    <NpcAvatar
                      name={friend.name}
                      color={FRIEND_COLORS[friend.failureStyle] || '#14B8A6'}
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
            className="absolute left-1/2 top-full z-40 mt-1 -translate-x-1/2 rounded-lg border border-white/10 bg-kollywood-deep/95 px-4 py-2.5 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold" style={{ color: selectedNpc.color || FRIEND_COLORS[selectedNpc.failureStyle] || '#14B8A6' }}>
                {selectedNpc.name}
              </span>
              {selectedNpc.suspicion !== undefined && (
                <span className="text-xs text-white/50">
                  Suspicion: {selectedNpc.suspicion}%
                </span>
              )}
              {selectedNpc.panic !== undefined && selectedNpc.panic > 0 && (
                <span className="text-xs text-white/50">
                  Panic: {selectedNpc.panic}%
                </span>
              )}
              {selectedNpc.calmed && (
                <span className="text-xs text-kollywood-teal">Calmed</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
