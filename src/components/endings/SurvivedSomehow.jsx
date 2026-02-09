import { motion } from 'framer-motion';

const paragraphs = [
  'By the skin of your teeth. By the grace of Ayyappan\'s selective memory. By the sheer power of deflection.',
  'The wives are still suspicious. The friends are still unreliable. But somehow — SOMEHOW — you made it through the night without the whole thing collapsing.',
  'This isn\'t a victory. This is a stay of execution. They WILL compare notes tomorrow.',
];

export default function SurvivedSomehow({ onPlayAgain, stats = {} }) {
  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12"
      initial={{ backgroundColor: '#1E1B4B' }}
      animate={{ backgroundColor: '#134E4A' }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    >
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <motion.h1
          className="mb-2 text-5xl font-bold text-emerald-300 sm:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 10 }}
        >
          SURVIVED... SOMEHOW
        </motion.h1>

        <motion.p
          className="mb-8 text-lg font-medium text-emerald-300/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          Barely. Just Barely.
        </motion.p>

        <motion.div
          className="mb-8 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 150, damping: 12 }}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-3 border-emerald-400/50 bg-emerald-900/30">
            <span className="text-5xl select-none">😰</span>
          </div>
        </motion.div>

        <div className="mb-10 space-y-4">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-base leading-relaxed text-emerald-100/80"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 + i * 0.5, duration: 0.7 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {stats && Object.keys(stats).length > 0 && (
          <motion.div
            className="mb-10 grid grid-cols-2 gap-4 rounded-xl bg-emerald-900/30 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
            {stats.liesTotal != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">{stats.liesTotal}</div>
                <div className="text-xs text-emerald-300/60">Lies Told</div>
              </div>
            )}
            {stats.suspicionPeak != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">{stats.suspicionPeak}%</div>
                <div className="text-xs text-emerald-300/60">Peak Suspicion</div>
              </div>
            )}
          </motion.div>
        )}

        <motion.button
          onClick={onPlayAgain}
          className="cursor-pointer rounded-lg bg-emerald-600 px-10 py-3.5 text-lg font-bold text-white shadow-xl transition-colors duration-300 hover:bg-emerald-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Try for Clean Sweep?
        </motion.button>
      </div>
    </motion.div>
  );
}
