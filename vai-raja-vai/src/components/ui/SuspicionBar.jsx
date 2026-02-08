import { motion } from 'framer-motion';

function getBarColor(suspicion) {
  if (suspicion < 30) return 'bg-kollywood-teal';
  if (suspicion < 60) return 'bg-gradient-to-r from-kollywood-teal to-amber-400';
  if (suspicion < 85) return 'bg-gradient-to-r from-amber-400 to-kollywood-magenta';
  return 'bg-kollywood-magenta';
}

function getGlowColor(suspicion) {
  if (suspicion < 30) return 'shadow-kollywood-teal/40';
  if (suspicion < 60) return 'shadow-amber-400/40';
  return 'shadow-kollywood-magenta/50';
}

export default function SuspicionBar({ suspicion = 0 }) {
  const clampedSuspicion = Math.max(0, Math.min(100, suspicion));
  const isVibrating = clampedSuspicion > 80;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
        Suspicion
      </span>
      <div className="relative h-3 w-36 overflow-hidden rounded-full bg-white/10 sm:w-48">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full shadow-lg ${getBarColor(clampedSuspicion)} ${getGlowColor(clampedSuspicion)}`}
          initial={{ width: 0 }}
          animate={{
            width: `${clampedSuspicion}%`,
            x: isVibrating ? [-1, 1, -1, 0] : 0,
          }}
          transition={{
            width: { type: 'spring', stiffness: 80, damping: 15 },
            x: isVibrating
              ? { repeat: Infinity, duration: 0.3, ease: 'easeInOut' }
              : { duration: 0 },
          }}
        />
      </div>
      <span
        className={`min-w-[2.5rem] text-right font-mono text-sm font-bold transition-colors duration-300 ${
          clampedSuspicion > 80
            ? 'text-kollywood-magenta'
            : clampedSuspicion > 50
              ? 'text-amber-400'
              : 'text-kollywood-teal'
        }`}
      >
        {clampedSuspicion}%
      </span>
    </div>
  );
}
