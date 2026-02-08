import { motion } from 'framer-motion';

function RiverbedScene() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-lg" fill="none">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="riverbed-run-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F0D2E" />
          <stop offset="60%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#2D2A5E" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A3728" />
          <stop offset="100%" stopColor="#2C1E12" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="400" height="200" fill="url(#riverbed-run-sky)" />

      {/* Moon */}
      <circle cx="320" cy="40" r="18" fill="white" fillOpacity="0.8" />
      <circle cx="326" cy="36" r="16" fill="url(#riverbed-run-sky)" />

      {/* Stars */}
      <circle cx="50" cy="25" r="1" fill="white" fillOpacity="0.6" />
      <circle cx="120" cy="15" r="1.2" fill="white" fillOpacity="0.4" />
      <circle cx="200" cy="30" r="0.8" fill="white" fillOpacity="0.5" />
      <circle cx="260" cy="20" r="1" fill="white" fillOpacity="0.3" />
      <circle cx="370" cy="55" r="0.8" fill="white" fillOpacity="0.4" />
      <circle cx="80" cy="50" r="0.6" fill="white" fillOpacity="0.5" />

      {/* Ground / riverbed */}
      <path d="M0 140 Q50 135 100 140 Q150 145 200 138 Q250 132 300 142 Q350 148 400 140 L400 200 L0 200 Z" fill="url(#ground)" />

      {/* Rocks */}
      <ellipse cx="30" cy="155" rx="15" ry="6" fill="#3D2B1A" />
      <ellipse cx="180" cy="150" rx="12" ry="5" fill="#352418" />
      <ellipse cx="350" cy="158" rx="18" ry="7" fill="#3D2B1A" />
      <ellipse cx="280" cy="152" rx="10" ry="4" fill="#2C1E12" />

      {/* 5 Silhouettes sitting */}
      {[80, 140, 200, 260, 330].map((x, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 + i * 0.4, duration: 0.8 }}
        >
          {/* Head */}
          <circle cx={x} cy={118} r={6} fill="#0A0812" />
          {/* Body */}
          <path
            d={`M${x - 8} 140 Q${x - 6} 126 ${x} 124 Q${x + 6} 126 ${x + 8} 140`}
            fill="#0A0812"
          />
          {/* Legs folded */}
          <path
            d={`M${x - 8} 138 Q${x - 12} 142 ${x - 6} 145 L${x + 6} 145 Q${x + 12} 142 ${x + 8} 138`}
            fill="#0A0812"
          />
        </motion.g>
      ))}

      {/* Moonlight reflection on ground */}
      <ellipse cx="320" cy="145" rx="30" ry="3" fill="white" fillOpacity="0.03" />
    </svg>
  );
}

const paragraphs = [
  'The lies collapsed like a house of cards in a Chennai monsoon.',
  'Now all five of you sit in the dried-up Cooum riverbed, staring at a moon that frankly looks as disappointed as your mothers would.',
  'On the bright side, nobody went to jail. On the less bright side, you\'re all now known as "those idiots who can\'t even fake a death properly."',
];

export default function RiverbedRun({ onPlayAgain, stats = {} }) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12"
      style={{
        background: 'linear-gradient(to bottom, #1a1510, #0F0D2E)',
      }}
    >
      {/* Sepia overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(160,120,60,0.3), transparent)',
        }}
      />

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        {/* Title */}
        <motion.h1
          className="mb-2 text-5xl font-bold text-kollywood-saffron sm:text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          style={{ textShadow: '0 0 30px rgba(245,158,11,0.25)' }}
        >
          RIVERBED RUN
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          The Plan Fell Apart
        </motion.p>

        {/* SVG Illustration */}
        <motion.div
          className="mb-10 w-full overflow-hidden rounded-2xl border border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
        >
          <RiverbedScene />
        </motion.div>

        {/* Narrative */}
        <div className="mb-10 space-y-4">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-base leading-relaxed text-white/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 + i * 0.8, duration: 0.7 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Stats */}
        {stats && Object.keys(stats).length > 0 && (
          <motion.div
            className="mb-10 grid grid-cols-2 gap-4 rounded-xl border border-white/5 bg-white/5 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 0.5 }}
          >
            {stats.liesTotal != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-saffron">{stats.liesTotal}</div>
                <div className="text-xs text-white/40">Lies Told</div>
              </div>
            )}
            {stats.suspicionPeak != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-magenta">{stats.suspicionPeak}%</div>
                <div className="text-xs text-white/40">Peak Suspicion</div>
              </div>
            )}
            {stats.contradictions != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.contradictions}</div>
                <div className="text-xs text-white/40">Contradictions</div>
              </div>
            )}
            {stats.chainBreaks != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">{stats.chainBreaks}</div>
                <div className="text-xs text-white/40">Chain Breaks</div>
              </div>
            )}
          </motion.div>
        )}

        {/* Try Again */}
        <motion.button
          onClick={onPlayAgain}
          className="cursor-pointer rounded-lg border border-kollywood-saffron/30 bg-kollywood-saffron/10 px-10 py-3.5 text-lg font-bold text-kollywood-saffron transition-colors duration-300 hover:bg-kollywood-saffron/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Try Again
        </motion.button>
      </div>
    </div>
  );
}
