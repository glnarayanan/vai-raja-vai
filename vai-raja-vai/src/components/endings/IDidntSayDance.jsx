import { motion } from 'framer-motion';

function WordsmithBadge() {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      className="h-20 w-20"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 150, damping: 12 }}
    >
      <circle cx="40" cy="40" r="36" fill="none" stroke="#D946EF" strokeWidth="3" />
      <circle cx="40" cy="40" r="30" fill="#D946EF" fillOpacity="0.15" />
      {/* Quill / pen icon */}
      <path
        d="M30 55 L48 24 C50 20 55 22 53 26 L38 52 L30 55 Z"
        fill="none"
        stroke="#D946EF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 55 L28 58"
        stroke="#D946EF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export default function IDidntSayDance({ onPlayAgain, stats = {}, technicalities = [] }) {
  // Pick 3 "most ridiculous" ones to highlight (longest strings tend to be funniest)
  const sorted = [...technicalities].sort((a, b) => b.length - a.length);
  const highlighted = new Set(sorted.slice(0, Math.max(3, Math.ceil(technicalities.length * 0.3))));

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-kollywood-midnight px-6 py-12">
      {/* Magenta accent blobs */}
      <motion.div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-kollywood-magenta/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-kollywood-magenta/8 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Title */}
        <motion.h1
          className="mb-2 text-5xl font-bold text-white sm:text-6xl"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 12 }}
          style={{ textShadow: '0 0 40px rgba(217,70,239,0.4)' }}
        >
          I DIDN&apos;T SAY DANCE
        </motion.h1>

        <motion.p
          className="mb-10 text-lg text-kollywood-magenta/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Victory by Technicality
        </motion.p>

        {/* Word Cloud */}
        <motion.div
          className="relative mb-10 flex min-h-[200px] w-full flex-wrap items-center justify-center gap-3 rounded-2xl border border-kollywood-magenta/20 bg-kollywood-deep/50 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          {technicalities.length === 0 && (
            <span className="text-white/30 italic">No technicalities recorded</span>
          )}
          {technicalities.map((word, i) => {
            const isHighlighted = highlighted.has(word);
            const randomRotation = (Math.sin(i * 7.3) * 12).toFixed(1);
            const randomSize = isHighlighted
              ? `${1.1 + Math.random() * 0.4}rem`
              : `${0.75 + Math.random() * 0.3}rem`;

            return (
              <motion.span
                key={i}
                className={`inline-block rounded-lg px-3 py-1.5 font-semibold ${
                  isHighlighted
                    ? 'bg-kollywood-magenta/20 text-kollywood-magenta'
                    : 'bg-white/5 text-white/60'
                }`}
                style={{ fontSize: randomSize }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: Number(randomRotation),
                }}
                transition={{
                  delay: 1.2 + i * 0.08,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
              >
                &ldquo;{word}&rdquo;
              </motion.span>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mb-8 flex gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-kollywood-magenta">
              {technicalities.length}
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wider">
              Technicalities Used
            </div>
          </div>
          {stats.suspicionPeak != null && (
            <div className="text-center">
              <div className="text-3xl font-bold text-kollywood-teal">
                {stats.suspicionPeak}%
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wider">
                Peak Suspicion
              </div>
            </div>
          )}
          {stats.liesTotal != null && (
            <div className="text-center">
              <div className="text-3xl font-bold text-kollywood-saffron">
                {stats.liesTotal}
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wider">
                Lies Told
              </div>
            </div>
          )}
        </motion.div>

        {/* Achievement */}
        <motion.div
          className="mb-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <WordsmithBadge />
          <span className="text-sm font-semibold tracking-wider text-white/40 uppercase">
            Achievement Unlocked
          </span>
          <span className="text-lg font-bold text-kollywood-magenta">
            The Wordsmith
          </span>
        </motion.div>

        {/* Play Again */}
        <motion.button
          onClick={onPlayAgain}
          className="cursor-pointer rounded-lg bg-gradient-to-r from-kollywood-magenta to-fuchsia-400 px-10 py-3.5 text-lg font-bold text-white shadow-xl shadow-kollywood-magenta/20 transition-shadow duration-300 hover:shadow-2xl hover:shadow-kollywood-magenta/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Play Again
        </motion.button>
      </div>
    </div>
  );
}
