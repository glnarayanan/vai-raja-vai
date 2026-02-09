import { motion } from 'framer-motion';

const paragraphs = [
  'The web of lies was intricate. Beautiful, even. But like all great Tamil movie schemes, it had one fatal flaw: your friends.',
  'Ayyappan talked too much. Vedham panicked at the wrong time. Hegde agreed to conflicting stories. And Reddy... Reddy was Reddy.',
  'The wives have formed an alliance. They\'re comparing notes RIGHT NOW. Tomorrow morning, there will be consequences.',
];

export default function Busted({ onPlayAgain, stats = {} }) {
  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12"
      initial={{ backgroundColor: '#1E1B4B' }}
      animate={{ backgroundColor: '#78350F' }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    >
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <motion.h1
          className="mb-2 text-5xl font-bold text-amber-300 sm:text-6xl"
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 10 }}
        >
          BUSTED
        </motion.h1>

        <motion.p
          className="mb-8 text-lg font-medium text-amber-300/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          A Comedy of Errors
        </motion.p>

        <motion.div
          className="mb-8 flex items-center justify-center"
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 100, damping: 10 }}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-3 border-amber-400/50 bg-amber-900/30">
            <span className="text-5xl select-none">🤦</span>
          </div>
        </motion.div>

        <div className="mb-10 space-y-4">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-base leading-relaxed text-amber-100/80"
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
            className="mb-10 grid grid-cols-2 gap-4 rounded-xl bg-amber-900/30 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
            {stats.liesTotal != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-300">{stats.liesTotal}</div>
                <div className="text-xs text-amber-300/60">Lies Told</div>
              </div>
            )}
            {stats.suspicionPeak != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-300">{stats.suspicionPeak}%</div>
                <div className="text-xs text-amber-300/60">Peak Suspicion</div>
              </div>
            )}
            {stats.contradictions != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-300">{stats.contradictions}</div>
                <div className="text-xs text-amber-300/60">Contradictions</div>
              </div>
            )}
          </motion.div>
        )}

        <motion.button
          onClick={onPlayAgain}
          className="cursor-pointer rounded-lg bg-amber-600 px-10 py-3.5 text-lg font-bold text-white shadow-xl transition-colors duration-300 hover:bg-amber-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Play Again
        </motion.button>
      </div>
    </motion.div>
  );
}
