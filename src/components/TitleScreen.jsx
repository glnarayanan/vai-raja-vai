import { useState } from 'react';
import { motion } from 'framer-motion';

const EPIGRAPHS = [
  'One husband. One wife. One truth.\nAnd a web of misunderstandings.',
  'The best lies are the ones\nyou tell to protect the people you love.',
  'Four friends. One secret.\nZero chance of keeping it.',
  'A tale of marriages, misunderstandings,\nand one very inconvenient corpse.',
  'In which a simple birthday trip\nbecomes an international incident.',
  'The trouble with honest men\nis that they make terrible liars.',
  'Every married man knows:\nthe truth is not always the safest option.',
  'A smuggler, a diamond, and a wife\nwho notices everything.',
];

const titleLetters = 'VAI RAJA VAI'.split('');

const letterVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.04,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function TitleScreen({ onNewGame, onContinue, hasSavedGame }) {
  const [epigraph] = useState(() => EPIGRAPHS[Math.floor(Math.random() * EPIGRAPHS.length)]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper">
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Title — editorial serif */}
        <div className="mb-6 flex flex-wrap justify-center">
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block font-display text-6xl font-semibold tracking-wide text-saffron sm:text-7xl md:text-8xl"
              style={{
                marginRight: letter === ' ' ? '0.35em' : '0.01em',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {/* Thin rule */}
        <motion.div
          className="mb-6 h-px w-24 bg-ink-faint/40"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        />

        {/* Subtitle */}
        <motion.p
          className="mb-2 font-display text-xl font-normal tracking-wide text-calm italic sm:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          The Lie-Chain Orchestrator
        </motion.p>

        {/* Epigraph — randomized each visit */}
        <motion.p
          className="mb-16 max-w-xs whitespace-pre-line text-sm leading-relaxed text-ink-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          {epigraph}
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <motion.button
            custom={2.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewGame}
            className="cursor-pointer rounded bg-saffron px-14 py-3.5 font-ui text-sm font-semibold uppercase tracking-widest text-paper transition-opacity duration-200 hover:opacity-90 active:opacity-80"
          >
            New Game
          </motion.button>

          {hasSavedGame && (
            <motion.button
              custom={2.7}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="cursor-pointer border-b border-ink-faint bg-transparent px-8 py-2.5 font-ui text-sm font-medium tracking-wide text-ink-light transition-colors duration-200 hover:text-ink hover:border-ink"
            >
              Continue
            </motion.button>
          )}
        </div>

        {/* Typographic ornament */}
        <motion.p
          className="mt-20 font-display text-2xl text-ink-faint/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 1.2 }}
        >
          &#167;
        </motion.p>
      </div>

    </div>
  );
}
