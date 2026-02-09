import { motion } from 'framer-motion';

const titleLetters = 'VAI RAJA VAI'.split('');

const letterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.04,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function TitleScreen({ onNewGame, onContinue, hasSavedGame }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper">
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Title */}
        <div className="mb-4 flex flex-wrap justify-center">
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block text-6xl font-bold tracking-tight text-saffron sm:text-7xl md:text-8xl"
              style={{
                marginRight: letter === ' ' ? '0.4em' : '0.02em',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="mb-3 text-xl font-medium tracking-wide text-calm sm:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          The Lie-Chain Orchestrator
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mb-12 max-w-md text-base text-ink-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          One husband. One wife. One truth. And a web of misunderstandings.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <motion.button
            custom={2.4}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNewGame}
            className="cursor-pointer rounded-lg bg-saffron px-12 py-4 text-lg font-semibold text-paper shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            New Game
          </motion.button>

          {hasSavedGame && (
            <motion.button
              custom={2.7}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="cursor-pointer rounded-lg border border-ink-faint bg-surface px-10 py-3 text-lg font-semibold text-ink-light transition-colors duration-300 hover:bg-ink-faint/10"
            >
              Continue
            </motion.button>
          )}
        </div>

        {/* Typographic ornament */}
        <motion.p
          className="mt-16 text-ink-faint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 1.2 }}
        >
          ---
        </motion.p>
      </div>
    </div>
  );
}
