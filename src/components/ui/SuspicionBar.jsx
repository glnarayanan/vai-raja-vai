import { motion } from 'framer-motion';

function getBarColor(suspicion) {
  if (suspicion < 30) return 'bg-calm';
  if (suspicion < 60) return 'bg-saffron';
  return 'bg-danger';
}

function getTextColor(suspicion) {
  if (suspicion < 30) return 'text-calm';
  if (suspicion < 60) return 'text-saffron';
  return 'text-danger';
}

export default function SuspicionBar({ suspicion = 0 }) {
  const clampedSuspicion = Math.max(0, Math.min(100, suspicion));

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-light">
        Suspicion
      </span>
      <div className="relative h-3 w-36 overflow-hidden rounded-full bg-ink-faint/20 sm:w-48">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${getBarColor(clampedSuspicion)}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedSuspicion}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <span
        className={`min-w-[2.5rem] text-right font-mono text-sm font-bold transition-colors duration-300 ${getTextColor(clampedSuspicion)}`}
      >
        {clampedSuspicion}%
      </span>
    </div>
  );
}
