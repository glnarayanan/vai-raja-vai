import { motion } from 'framer-motion';

function getPanicColor(panic) {
  if (panic < 30) return 'bg-green-500';
  if (panic < 60) return 'bg-yellow-400';
  return 'bg-red-500';
}

function getSuspicionBorder(suspicion) {
  if (suspicion === undefined || suspicion === null) return 'border-white/20';
  if (suspicion < 30) return 'border-kollywood-teal';
  if (suspicion < 60) return 'border-amber-400';
  if (suspicion < 85) return 'border-kollywood-magenta';
  return 'border-red-500';
}

function getSuspicionRingStyle(suspicion) {
  if (suspicion === undefined || suspicion === null) return {};
  const degrees = (suspicion / 100) * 360;
  const color =
    suspicion < 30
      ? '#14B8A6'
      : suspicion < 60
        ? '#FBBF24'
        : suspicion < 85
          ? '#D946EF'
          : '#EF4444';
  return {
    background: `conic-gradient(${color} ${degrees}deg, transparent ${degrees}deg)`,
  };
}

function getPanicRingStyle(panic) {
  if (panic === undefined || panic === null || panic === 0) return {};
  const degrees = (panic / 100) * 360;
  const color = panic < 30 ? '#22C55E' : panic < 60 ? '#FBBF24' : '#EF4444';
  return {
    background: `conic-gradient(${color} ${degrees}deg, transparent ${degrees}deg)`,
  };
}

export default function NpcAvatar({
  name,
  color = '#14B8A6',
  suspicion,
  panic,
  isActive = false,
}) {
  const firstLetter = name?.charAt(0)?.toUpperCase() || '?';
  const hasSuspicion = suspicion !== undefined && suspicion !== null;
  const hasPanic = panic !== undefined && panic !== null && panic > 0;

  const shakeAnimation =
    (hasSuspicion && suspicion > 85) || (hasPanic && panic > 85)
      ? { x: [-2, 2, -2, 0], transition: { repeat: Infinity, duration: 0.4 } }
      : {};

  return (
    <motion.div
      className="relative flex h-[5.5rem] flex-col items-center gap-1"
      animate={shakeAnimation}
    >
      {/* Ring (suspicion or panic) */}
      <div className="relative">
        {hasSuspicion && (
          <div
            className="absolute -inset-1 rounded-full opacity-80"
            style={getSuspicionRingStyle(suspicion)}
          />
        )}
        {hasPanic && !hasSuspicion && (
          <div
            className="absolute -inset-1 rounded-full opacity-80"
            style={getPanicRingStyle(panic)}
          />
        )}

        {/* Avatar circle */}
        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold transition-colors duration-300 ${
            hasSuspicion ? getSuspicionBorder(suspicion) : 'border-white/20'
          }`}
          style={{ backgroundColor: color + '33', color }}
        >
          {firstLetter}
        </div>

        {/* Panic dot (for friends) */}
        {hasPanic && (
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-kollywood-deep ${getPanicColor(panic)}`}
          />
        )}

        {/* Active indicator glow */}
        {isActive && (
          <motion.div
            className="absolute -inset-1.5 rounded-full border-2 border-kollywood-saffron"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Name label */}
      <span className="max-w-[4rem] truncate text-center text-[11px] font-medium text-white/70">
        {name}
      </span>
    </motion.div>
  );
}
