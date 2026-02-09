import { useEffect, useRef, useState } from 'react';
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
  const prevSuspicion = useRef(clampedSuspicion);
  const [isSpiking, setIsSpiking] = useState(false);

  useEffect(() => {
    if (clampedSuspicion > prevSuspicion.current) {
      setIsSpiking(true);
      const timer = setTimeout(() => setIsSpiking(false), 600);
      prevSuspicion.current = clampedSuspicion;
      return () => clearTimeout(timer);
    }
    prevSuspicion.current = clampedSuspicion;
  }, [clampedSuspicion]);

  return (
    <div className="flex items-center gap-3">
      <span className="font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
        Suspicion
      </span>
      <div className="relative h-1.5 w-28 overflow-hidden rounded-full bg-ink-faint/15 sm:w-40">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${getBarColor(clampedSuspicion)}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedSuspicion}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <motion.span
        className={`min-w-[2rem] text-right font-ui text-xs font-bold tabular-nums ${getTextColor(clampedSuspicion)}`}
        animate={isSpiking ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {clampedSuspicion}%
      </motion.span>
    </div>
  );
}
