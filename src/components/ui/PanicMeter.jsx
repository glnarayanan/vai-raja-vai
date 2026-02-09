import { motion } from 'framer-motion';

function getPanicBarColor(panic) {
  if (panic < 30) return 'bg-calm';
  if (panic < 60) return 'bg-saffron';
  return 'bg-danger';
}

export default function PanicMeter({ friends = [] }) {
  if (friends.length === 0) return null;

  return (
    <div className="rounded-lg border border-ink-faint/20 bg-surface p-3">
      <p className="mb-2 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-light">
        Friend Panic
      </p>
      <div className="flex flex-col gap-2">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-2">
            <span className="w-16 truncate font-ui text-xs font-medium text-ink-light">
              {friend.name.split(' ')[0]}
            </span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink-faint/20">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${getPanicBarColor(friend.panic)}`}
                initial={{ width: 0 }}
                animate={{ width: `${friend.panic}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <span className="w-8 text-right font-ui text-[10px] font-bold tabular-nums text-ink">
              {friend.panic}
            </span>
            {friend.calmed && (
              <span className="font-ui text-[10px] font-semibold text-calm">OK</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
