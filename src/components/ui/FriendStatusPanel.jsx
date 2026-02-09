import { motion } from 'framer-motion';

function getReliabilityBarColor(reliability) {
  if (reliability > 60) return 'bg-green-500';
  if (reliability >= 40) return 'bg-yellow-400';
  return 'bg-red-500';
}

function getReliabilityBarBg(reliability) {
  if (reliability > 60) return 'bg-green-500/15';
  if (reliability >= 40) return 'bg-yellow-400/15';
  return 'bg-red-500/15';
}

function DrinkIcons({ level }) {
  const maxDrinks = 5;
  const clamped = Math.max(0, Math.min(level, maxDrinks));
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxDrinks }, (_, i) => (
        <span
          key={i}
          className={`text-xs transition-opacity duration-300 ${i < clamped ? 'opacity-100' : 'opacity-20'}`}
        >
          🍺
        </span>
      ))}
    </div>
  );
}

export default function FriendStatusPanel({ friends = [] }) {
  if (!friends.length) return null;

  return (
    <div className="w-full rounded-xl border border-white/10 bg-kollywood-deep/60 p-4 backdrop-blur-sm">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
        Friend Network
      </h3>

      <div className="space-y-4">
        {friends.map((friend) => {
          return (
            <div key={friend.name} className="space-y-2">
              {/* Name row */}
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-semibold"
                  style={{ color: { OVER_EXPLAINER: '#3B82F6', NERVOUS: '#F59E0B', AGREEABLE: '#14B8A6', LOOSE_CANNON: '#EF4444' }[friend.failureStyle] || '#14B8A6' }}
                >
                  {friend.name}
                </span>
              </div>

              {/* Reliability bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40">Reliability</span>
                  <span className="font-mono text-[10px] text-white/50">
                    {friend.reliability ?? 0}%
                  </span>
                </div>
                <div
                  className={`h-2 w-full overflow-hidden rounded-full ${getReliabilityBarBg(friend.reliability ?? 0)}`}
                >
                  <motion.div
                    className={`h-full rounded-full ${getReliabilityBarColor(friend.reliability ?? 0)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(0, Math.min(100, friend.reliability ?? 0))}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  />
                </div>
              </div>

              {/* Alcohol level */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40">Alcohol</span>
                <DrinkIcons level={friend.alcohol_level ?? 0} />
              </div>

              {/* Separator */}
              <div className="h-px bg-white/5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
