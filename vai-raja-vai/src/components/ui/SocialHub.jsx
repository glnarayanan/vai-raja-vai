import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NpcAvatar from './NpcAvatar';

export default function SocialHub({ wives = [], friends = [] }) {
  const [selectedNpc, setSelectedNpc] = useState(null);

  const handleNpcClick = (npc) => {
    setSelectedNpc((prev) => (prev?.name === npc.name ? null : npc));
  };

  return (
    <div className="w-full border-b border-white/10 bg-kollywood-deep/60 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="flex gap-6 overflow-x-auto scrollbar-none">
          {/* Wives section */}
          {wives.length > 0 && (
            <div className="flex shrink-0 items-start gap-1">
              <span className="mr-2 mt-3 text-[10px] font-semibold uppercase tracking-widest text-kollywood-saffron/60">
                Wives
              </span>
              <div className="flex gap-3">
                {wives.map((wife) => (
                  <button
                    key={wife.name}
                    className="cursor-pointer bg-transparent p-0"
                    onClick={() => handleNpcClick(wife)}
                  >
                    <NpcAvatar
                      name={wife.name}
                      color={wife.color}
                      suspicion={wife.suspicion}
                      isSynced={wife.isSynced}
                      isActive={wife.isActive}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Separator */}
          {wives.length > 0 && friends.length > 0 && (
            <div className="mx-1 mt-2 w-px self-stretch bg-white/10" />
          )}

          {/* Friends section */}
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
                      color={friend.color}
                      reliability={friend.reliability}
                      isSynced={friend.isSynced}
                      alcoholLevel={friend.alcoholLevel}
                      isActive={friend.isActive}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected NPC detail */}
        <AnimatePresence>
          {selectedNpc && (
            <motion.div
              className="mt-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold" style={{ color: selectedNpc.color }}>
                  {selectedNpc.name}
                </span>
                {selectedNpc.suspicion !== undefined && (
                  <span className="text-xs text-white/50">
                    Suspicion: {selectedNpc.suspicion}%
                  </span>
                )}
                {selectedNpc.reliability !== undefined && (
                  <span className="text-xs text-white/50">
                    Reliability: {selectedNpc.reliability}%
                  </span>
                )}
                {!selectedNpc.isSynced && (
                  <span className="text-xs font-medium text-orange-400">Un-synced</span>
                )}
                {selectedNpc.alcoholLevel > 0 && (
                  <span className="text-xs text-white/50">
                    Alcohol: {selectedNpc.alcoholLevel}/5
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
