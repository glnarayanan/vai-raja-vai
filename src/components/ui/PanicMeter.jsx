import { motion } from 'framer-motion';

function getPanicBarColor(panic) {
  if (panic < 30) return 'bg-green-500';
  if (panic < 60) return 'bg-gradient-to-r from-green-500 to-amber-400';
  if (panic < 80) return 'bg-gradient-to-r from-amber-400 to-red-500';
  return 'bg-red-500';
}

export default function PanicMeter({ friends = [] }) {
  if (friends.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
        Friend Panic
      </p>
      <div className="flex flex-col gap-2">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-2">
            <span className="w-16 truncate text-xs font-medium text-white/60">
              {friend.name.split(' ')[0]}
            </span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${getPanicBarColor(friend.panic)}`}
                initial={{ width: 0 }}
                animate={{ width: `${friend.panic}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              />
            </div>
            <span className="w-8 text-right font-mono text-[10px] font-bold text-white/50">
              {friend.panic}
            </span>
            {friend.calmed && (
              <span className="text-[10px] text-kollywood-teal">OK</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
