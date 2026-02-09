import { motion } from 'framer-motion';

const titleLetters = 'VAI RAJA VAI'.split('');

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.6 + i * 0.06,
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, type: 'spring', stiffness: 100, damping: 14 },
  }),
};

export default function TitleScreen({ onNewGame, onContinue, hasSavedGame }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-kollywood-midnight">
      {/* Pulsing background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, rgba(217,70,239,0.08) 0%, transparent 70%)',
            'radial-gradient(ellipse at 30% 60%, rgba(245,158,11,0.1) 0%, transparent 70%)',
            'radial-gradient(ellipse at 70% 40%, rgba(20,184,166,0.08) 0%, transparent 70%)',
            'radial-gradient(ellipse at 50% 50%, rgba(217,70,239,0.08) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Film grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

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
              className="inline-block text-6xl font-bold text-kollywood-saffron sm:text-7xl md:text-8xl"
              style={{
                textShadow: '0 0 30px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.15)',
                marginRight: letter === ' ' ? '0.4em' : '0.02em',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="mb-3 text-xl font-medium tracking-wide text-kollywood-teal sm:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          The Lie-Chain Orchestrator
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mb-12 max-w-md text-base text-white/50 italic"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNewGame}
            className="relative cursor-pointer rounded-lg bg-gradient-to-r from-kollywood-lime to-emerald-400 px-10 py-3.5 text-lg font-bold text-kollywood-deep shadow-lg shadow-kollywood-lime/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-kollywood-lime/30"
          >
            New Game
          </motion.button>

          {hasSavedGame && (
            <motion.button
              custom={2.7}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="cursor-pointer rounded-lg border border-white/20 bg-white/5 px-10 py-3 text-lg font-semibold text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:text-white/90"
            >
              Continue
            </motion.button>
          )}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-16 h-px w-48 bg-gradient-to-r from-transparent via-kollywood-saffron/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 3.0, duration: 1.2 }}
        />
      </div>
    </div>
  );
}
