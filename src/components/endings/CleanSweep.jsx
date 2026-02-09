import { motion } from 'framer-motion';

function ConfettiParticle({ delay, x, color }) {
  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        backgroundColor: color,
        left: `${x}%`,
        top: '-5%',
      }}
      initial={{ opacity: 0, y: -20, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: ['0vh', '100vh'],
        rotate: [0, Math.random() * 720 - 360],
        x: [0, Math.random() * 100 - 50],
      }}
      transition={{
        delay,
        duration: Math.random() * 3 + 3,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: 'easeIn',
      }}
    />
  );
}

const confettiColors = [
  '#F59E0B', '#14B8A6', '#D946EF', '#BEF264', '#FBBF24', '#34D399',
];

const npcNames = ['Mythili', 'Ammini', 'Chamundi', 'Janaki', 'Mrs. Reddy'];

const paragraphs = [
  'Every thread held. Every lie interlocked like a Swiss watch designed by a madman.',
  'The inspector left with nothing. The neighbors suspect nothing. The "body" is sipping chai in Kodaikanal.',
  'You didn\'t just survive the night — you conducted a symphony of deception so flawless it would make Kamal Haasan weep with pride.',
];

function AchievementBadge() {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      className="h-20 w-20"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 3.5, type: 'spring', stiffness: 150, damping: 12 }}
    >
      <circle cx="40" cy="40" r="36" fill="none" stroke="#F59E0B" strokeWidth="3" />
      <circle cx="40" cy="40" r="30" fill="#F59E0B" fillOpacity="0.15" />
      <path
        d="M28 40 L36 48 L54 30"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 8 L43 16 L40 14 L37 16 Z"
        fill="#F59E0B"
      />
      <path
        d="M40 72 L43 64 L40 66 L37 64 Z"
        fill="#F59E0B"
      />
    </motion.svg>
  );
}

export default function CleanSweep({ onPlayAgain, stats = {} }) {
  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12"
      initial={{ backgroundColor: '#1E1B4B' }}
      animate={{ backgroundColor: '#F59E0B' }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    >
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiParticle
            key={i}
            delay={2 + i * 0.15}
            x={Math.random() * 100}
            color={confettiColors[i % confettiColors.length]}
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        {/* Title */}
        <motion.h1
          className="mb-2 text-6xl font-bold text-kollywood-deep sm:text-7xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 10 }}
          style={{ textShadow: '0 2px 20px rgba(15,13,46,0.2)' }}
        >
          CLEAN SWEEP
        </motion.h1>

        <motion.p
          className="mb-8 text-lg font-medium text-kollywood-deep/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          Perfect Deception
        </motion.p>

        {/* NPC Avatars */}
        <motion.div
          className="mb-10 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {npcNames.map((name, i) => (
            <motion.div
              key={name}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.15 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-3 border-emerald-400 bg-kollywood-deep/10 shadow-lg shadow-emerald-400/20">
                <span className="text-2xl select-none">
                  {['\u263A', '\u263B', '\u263A', '\u263B', '\u263A'][i]}
                </span>
              </div>
              <span className="text-xs font-medium text-kollywood-deep/70">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Narrative paragraphs */}
        <div className="mb-10 space-y-4">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-base leading-relaxed text-kollywood-deep/80"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 + i * 0.6, duration: 0.7 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Achievement */}
        <motion.div
          className="mb-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
        >
          <AchievementBadge />
          <span className="text-sm font-semibold tracking-wider text-kollywood-deep/60 uppercase">
            Achievement Unlocked
          </span>
          <span className="text-lg font-bold text-kollywood-deep">
            The Puppet Master
          </span>
        </motion.div>

        {/* Stats */}
        {stats && Object.keys(stats).length > 0 && (
          <motion.div
            className="mb-10 grid grid-cols-2 gap-4 rounded-xl bg-kollywood-deep/10 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.0, duration: 0.5 }}
          >
            {stats.liesTotal != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-deep">{stats.liesTotal}</div>
                <div className="text-xs text-kollywood-deep/60">Lies Told</div>
              </div>
            )}
            {stats.suspicionPeak != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-deep">{stats.suspicionPeak}%</div>
                <div className="text-xs text-kollywood-deep/60">Peak Suspicion</div>
              </div>
            )}
            {stats.timeTaken != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-deep">{stats.timeTaken}</div>
                <div className="text-xs text-kollywood-deep/60">Time Taken</div>
              </div>
            )}
            {stats.contradictions != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-deep">{stats.contradictions}</div>
                <div className="text-xs text-kollywood-deep/60">Contradictions</div>
              </div>
            )}
          </motion.div>
        )}

        {/* Play Again */}
        <motion.button
          onClick={onPlayAgain}
          className="cursor-pointer rounded-lg bg-kollywood-deep px-10 py-3.5 text-lg font-bold text-kollywood-saffron shadow-xl transition-colors duration-300 hover:bg-kollywood-midnight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Play Again
        </motion.button>
      </div>
    </motion.div>
  );
}
