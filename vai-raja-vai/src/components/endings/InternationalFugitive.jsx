import { motion } from 'framer-motion';

function MugshotFrame() {
  return (
    <svg viewBox="0 0 160 200" className="h-56 w-44">
      {/* Background */}
      <rect width="160" height="200" rx="4" fill="#1a1a2e" />

      {/* Height lines */}
      {[40, 60, 80, 100, 120, 140, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
      ))}

      {/* Center line */}
      <line x1="80" y1="30" x2="80" y2="170" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />

      {/* Head - circle */}
      <circle cx="80" cy="75" r="28" fill="#2D2A5E" stroke="#D946EF" strokeWidth="1.5" />

      {/* Eyes */}
      <circle cx="70" cy="70" r="4" fill="#0F0D2E" />
      <circle cx="90" cy="70" r="4" fill="#0F0D2E" />
      <circle cx="71" cy="69" r="1.5" fill="white" fillOpacity="0.6" />
      <circle cx="91" cy="69" r="1.5" fill="white" fillOpacity="0.6" />

      {/* Eyebrows - worried */}
      <path d="M63 63 Q67 60 75 62" stroke="#0F0D2E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M85 62 Q93 60 97 63" stroke="#0F0D2E" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Mouth - frown */}
      <path d="M70 85 Q80 80 90 85" stroke="#0F0D2E" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Body / shoulders */}
      <path d="M40 130 Q50 110 80 108 Q110 110 120 130 L120 170 L40 170 Z" fill="#2D2A5E" />

      {/* Name plate */}
      <rect x="30" y="150" width="100" height="24" rx="2" fill="#0F0D2E" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" />
      <text x="80" y="166" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">
        SUSPECT #1
      </text>

      {/* Frame border */}
      <rect x="1" y="1" width="158" height="198" rx="4" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
    </svg>
  );
}

function SirenFlash({ side }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      className={`pointer-events-none absolute top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-1/2`}
      animate={{
        backgroundColor: isLeft
          ? ['rgba(239,68,68,0)', 'rgba(239,68,68,0.08)', 'rgba(239,68,68,0)']
          : ['rgba(59,130,246,0)', 'rgba(59,130,246,0.08)', 'rgba(59,130,246,0)'],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        delay: isLeft ? 0 : 0.4,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function InternationalFugitive({ onPlayAgain, stats = {} }) {
  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-kollywood-magenta px-6 py-12"
      animate={{ x: [0, -2, 2, -1, 1, 0] }}
      transition={{ delay: 2.5, duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Police siren flashes */}
      <SirenFlash side="left" />
      <SirenFlash side="right" />

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        {/* Title */}
        <motion.h1
          className="mb-2 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 12 }}
          style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
        >
          INTERNATIONAL FUGITIVE
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Worst Case Scenario
        </motion.p>

        {/* Mugshot */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 100, damping: 12 }}
        >
          <MugshotFrame />
        </motion.div>

        {/* ARRESTED stamp */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 4, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{
            delay: 2.0,
            duration: 0.15,
            ease: 'easeOut',
          }}
        >
          <div
            className="rounded-md border-4 border-red-500 px-8 py-2"
            style={{
              boxShadow: '0 0 20px rgba(239,68,68,0.4)',
            }}
          >
            <span className="text-4xl font-black tracking-widest text-red-500 uppercase sm:text-5xl">
              ARRESTED
            </span>
          </div>
        </motion.div>

        {/* What went wrong */}
        <motion.div
          className="mb-10 w-full rounded-xl border border-red-500/20 bg-black/30 p-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.5 }}
        >
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-red-400 uppercase">
            What Went Wrong
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.liesTotal != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.liesTotal}</div>
                <div className="text-xs text-white/40">Lies Told</div>
              </div>
            )}
            {stats.contradictions != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.contradictions}</div>
                <div className="text-xs text-white/40">Contradictions</div>
              </div>
            )}
            {stats.suspicionPeak != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-saffron">{stats.suspicionPeak}%</div>
                <div className="text-xs text-white/40">Peak Suspicion</div>
              </div>
            )}
            {stats.witnessesAlerted != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.witnessesAlerted}</div>
                <div className="text-xs text-white/40">Witnesses Alerted</div>
              </div>
            )}
            {stats.chainBreaks != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-kollywood-magenta">{stats.chainBreaks}</div>
                <div className="text-xs text-white/40">Chain Breaks</div>
              </div>
            )}
            {stats.policeEncounters != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-red-300">{stats.policeEncounters}</div>
                <div className="text-xs text-white/40">Police Encounters</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Try Again */}
        <motion.button
          onClick={onPlayAgain}
          className="cursor-pointer rounded-lg bg-white px-10 py-3.5 text-lg font-bold text-kollywood-deep shadow-xl transition-colors duration-300 hover:bg-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
}
