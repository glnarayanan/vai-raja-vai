import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RECOVERY_OPTIONS = [
  {
    id: 'technicality',
    label: 'Semantic Shift',
    type: 'technicality',
    color: 'kollywood-teal',
    borderClass: 'border-kollywood-teal/50',
    bgClass: 'bg-kollywood-teal/15',
    hoverBgClass: 'hover:bg-kollywood-teal/25',
    textClass: 'text-kollywood-teal',
  },
  {
    id: 'double-down',
    label: 'Fact Overwrite',
    type: 'double-down',
    color: 'kollywood-magenta',
    borderClass: 'border-kollywood-magenta/50',
    bgClass: 'bg-kollywood-magenta/15',
    hoverBgClass: 'hover:bg-kollywood-magenta/25',
    textClass: 'text-kollywood-magenta',
  },
  {
    id: 'diversion',
    label: 'Aggression Pivot',
    type: 'diversion',
    color: 'kollywood-saffron',
    borderClass: 'border-kollywood-saffron/50',
    bgClass: 'bg-kollywood-saffron/15',
    hoverBgClass: 'hover:bg-kollywood-saffron/25',
    textClass: 'text-kollywood-saffron',
  },
];

export default function RecoveryMode({ collision, wife, onResolve, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(5);
  const timerRef = useRef(null);
  const hasTimedOut = useRef(false);

  const handleTimeout = useCallback(() => {
    if (!hasTimedOut.current) {
      hasTimedOut.current = true;
      onTimeout?.();
    }
  }, [onTimeout]);

  useEffect(() => {
    hasTimedOut.current = false;
    setTimeLeft(5);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [collision, handleTimeout]);

  const handleResolve = (optionId) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onResolve?.(optionId);
  };

  const timerProgress = timeLeft / 5;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-fuchsia-500/20 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulsing fuchsia border overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 border-4 border-fuchsia-500"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />

        <motion.div
          className="mx-4 w-full max-w-lg rounded-2xl border border-fuchsia-500/30 bg-kollywood-deep/95 p-6 shadow-2xl shadow-fuchsia-500/20 backdrop-blur-lg"
          initial={{ scale: 0.7, y: 30, rotateX: 15 }}
          animate={{ scale: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.7, y: 30 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          {/* Header */}
          <div className="mb-4 text-center">
            <motion.h2
              className="text-lg font-black uppercase tracking-widest text-fuchsia-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Recovery Mode
            </motion.h2>
            {wife && (
              <p className="mt-1 text-sm text-white/50">
                {wife.name} caught a contradiction!
              </p>
            )}
          </div>

          {/* Timer */}
          <div className="mb-5 flex flex-col items-center">
            <motion.span
              className="bg-gradient-to-r from-kollywood-teal to-kollywood-magenta bg-clip-text font-mono text-6xl font-black text-transparent"
              key={timeLeft}
              initial={{ scale: 1.3, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              {timeLeft}
            </motion.span>

            {/* Timer bar */}
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-kollywood-teal to-kollywood-magenta"
                animate={{ width: `${timerProgress * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Conflicting facts */}
          {collision && (
            <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Conflicting Facts
              </p>
              <div className="space-y-2">
                {collision.originalClaim && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-kollywood-teal" />
                    <p className="text-sm text-white/70">{collision.originalClaim}</p>
                  </div>
                )}
                {collision.newClaim && (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-kollywood-magenta" />
                    <p className="text-sm text-white/70">{collision.newClaim}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recovery buttons */}
          <div className="flex flex-col gap-2.5">
            {RECOVERY_OPTIONS.map((option, index) => (
              <motion.button
                key={option.id}
                className={`cursor-pointer rounded-xl border px-5 py-3.5 text-left font-semibold transition-colors duration-200 ${option.borderClass} ${option.bgClass} ${option.hoverBgClass} ${option.textClass}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleResolve(option.id)}
              >
                <span className="text-xs opacity-60">{option.type.replace('-', ' ').toUpperCase()}</span>
                <p className="mt-0.5 text-sm">{option.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
