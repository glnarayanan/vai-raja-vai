import { motion } from 'framer-motion';

const npcNames = ['Mythili', 'Ammini', 'Chamundi', 'Janaki', 'Mrs. Reddy'];

const paragraphs = [
  'This wasn\'t a lie anymore. This was performance art. The Panchathanthiram.',
  'Five friends. Five wives. One diamond. Zero working stories. MAXIMUM entertainment.',
  'The wives formed a war council in the kitchen. The friends scattered like cockroaches when the light turns on. Maggi walked in right at the climax. Nagesh watched from the window with popcorn.',
  'It was chaos. Beautiful, perfect, Tamil movie chaos. Kamal Haasan would be proud.',
];

export default function FullChaos({ onPlayAgain, stats = {} }) {
  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12"
      initial={{ backgroundColor: '#1E1B4B' }}
      animate={{ backgroundColor: '#7C2D12' }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    >
      {/* Animated color bursts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {['#D946EF', '#F59E0B', '#14B8A6', '#EF4444', '#BEF264'].map((color, i) => (
          <motion.div
            key={color}
            className="absolute rounded-full opacity-20"
            style={{
              width: 200 + i * 40,
              height: 200 + i * 40,
              backgroundColor: color,
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1],
              x: [0, (i % 2 ? 30 : -30), 0],
            }}
            transition={{
              delay: 2 + i * 0.3,
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <motion.h1
          className="mb-2 text-5xl font-bold text-kollywood-saffron sm:text-6xl"
          initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 8 }}
          style={{ textShadow: '0 2px 20px rgba(249,115,22,0.3)' }}
        >
          FULL CHAOS
        </motion.h1>

        <motion.p
          className="mb-6 text-lg font-medium text-orange-300/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          The Panchathanthiram Climax
        </motion.p>

        {/* All wives angry */}
        <motion.div
          className="mb-8 flex gap-3"
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
              transition={{ delay: 1.6 + i * 0.12 }}
            >
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-full border-3 border-red-500 bg-red-500/15 shadow-lg shadow-red-500/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ delay: 2 + i * 0.15, duration: 1.5, repeat: Infinity }}
              >
                <span className="text-2xl select-none">😤</span>
              </motion.div>
              <span className="text-xs font-medium text-orange-200/70">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-10 space-y-4">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-base leading-relaxed text-orange-100/80"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 + i * 0.5, duration: 0.7 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {stats && Object.keys(stats).length > 0 && (
          <motion.div
            className="mb-10 grid grid-cols-2 gap-4 rounded-xl bg-orange-900/30 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.5 }}
          >
            {stats.liesTotal != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">{stats.liesTotal}</div>
                <div className="text-xs text-orange-300/60">Lies Told</div>
              </div>
            )}
            {stats.suspicionPeak != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">{stats.suspicionPeak}%</div>
                <div className="text-xs text-orange-300/60">Peak Suspicion</div>
              </div>
            )}
            {stats.contradictions != null && (
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">{stats.contradictions}</div>
                <div className="text-xs text-orange-300/60">Contradictions</div>
              </div>
            )}
          </motion.div>
        )}

        <motion.button
          onClick={onPlayAgain}
          className="cursor-pointer rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-10 py-3.5 text-lg font-bold text-white shadow-xl transition-opacity duration-300 hover:opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Embrace the Chaos Again
        </motion.button>
      </div>
    </motion.div>
  );
}
