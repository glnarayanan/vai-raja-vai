import { motion } from 'framer-motion';

const QUALITY_CONFIG = {
  CINEMATIC: {
    title: 'Perfect Reunion',
    color: '#D97706',
    bgGradient: 'from-[#D97706]/5 via-paper to-paper',
    borderColor: 'border-saffron/40',
    description: 'Mythili immediately understands. The truth was always there — she just needed to hear it. She holds you, crying. Not from sadness, but relief. This is a movie ending.',
    mythiliLine: '"I always knew, deep down. You\'re too stupid to cheat successfully. But you\'re brave enough to save everyone around you. That\'s the man I married."',
    friendsLine: 'Your friends weep openly. Nair gives a fifteen-minute speech about the power of friendship. For once, nobody minds.',
  },
  RELIEVED: {
    title: 'Together Again',
    color: '#0F766E',
    bgGradient: 'from-[#0F766E]/5 via-paper to-paper',
    borderColor: 'border-calm/40',
    description: "It takes time. Mythili listens, frowns, asks questions. Your friends fill in the gaps — Hegde confirms the Nirmala story. Vedham breaks down crying. Slowly, Mythili's anger melts into tired relief.",
    mythiliLine: '"You should have told me everything from the start. But I understand why you didn\'t. We have a lot of talking to do, Ram. But... I\'m glad you\'re alive."',
    friendsLine: 'Nair apologizes to everyone individually. Reddy threatens to fight the smuggler again. Hegde agrees with everything. It feels like home.',
  },
  BY_A_THREAD: {
    title: 'By A Thread',
    color: '#D97706',
    bgGradient: 'from-[#D97706]/5 via-paper to-paper',
    borderColor: 'border-saffron/30',
    description: "Mythili almost walks away. Twice. She doesn't want to hear it. But the inspector confirms the kidnapping. Maggie, in handcuffs, confirms the blackmail. Slowly, reluctantly, Mythili turns back.",
    mythiliLine: '"I don\'t trust you right now, Ram. I may not trust you for a long time. But I believe this story — because no one could make up something this ridiculous. We\'ll work on it."',
    friendsLine: "Your friends look like they've aged ten years. Vedham promises to never leave the house again. Nobody laughs, because he's completely serious.",
  },
  BARELY_MADE_IT: {
    title: 'Barely Made It',
    color: '#B91C1C',
    bgGradient: 'from-[#B91C1C]/5 via-paper to-paper',
    borderColor: 'border-danger/30',
    description: "Mythili is furious. Even after hearing everything — the kidnapping, the fake death, the diamonds — she's not ready to forgive. But she's alive. And when she looks at Ram, there's something beneath the anger.",
    mythiliLine: '"You have made my life a living nightmare, Ram. I came to SAVE you and found you with another woman. AGAIN. The truth doesn\'t erase how that felt. But... you caught me when I fell. So I\'ll stay. For now."',
    friendsLine: 'Your friends avoid eye contact. Reddy mutters that this whole thing was definitely not his fault. Nobody agrees, but nobody argues either.',
  },
};

export default function BridgeReconciliation({ quality, onPlayAgain, stats }) {
  const config = QUALITY_CONFIG[quality] || QUALITY_CONFIG.RELIEVED;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${config.bgGradient} px-6 py-12`}>
      <div className="mx-auto max-w-2xl">
        {/* Title — cinematic reveal with dramatic pause */}
        <div className="mb-8 text-center">
          {/* Film title arrives first */}
          <motion.p
            className="mb-4 font-display text-lg italic text-ink-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Vai Raja Vai
          </motion.p>

          {/* Thin rule builds anticipation */}
          <motion.div
            className="mx-auto mb-5 h-px w-16 bg-ink-faint/40"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          />

          {/* Quality title reveals after a dramatic hold */}
          <motion.h1
            className="font-display text-5xl font-semibold tracking-wide sm:text-6xl"
            style={{ color: config.color }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {config.title}
          </motion.h1>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className={`mb-8 rounded-lg border ${config.borderColor} bg-surface p-6`}
        >
          <p className="text-base leading-relaxed text-ink">
            {config.description}
          </p>
        </motion.div>

        {/* Mythili's line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4.5, duration: 0.8 }}
          className="mb-6 rounded-lg border-l-2 border-danger/40 bg-danger/5 p-6"
        >
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-danger" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[0.15em] text-danger">
              Mythili
            </span>
          </div>
          <p className="text-base italic leading-relaxed text-ink">
            {config.mythiliLine}
          </p>
        </motion.div>

        {/* Friends line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5, duration: 0.8 }}
          className="mb-10 rounded-lg bg-surface p-5"
        >
          <p className="text-sm leading-relaxed text-ink-light">
            {config.friendsLine}
          </p>
        </motion.div>

        {/* Stats summary */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.5 }}
            className="mb-8 rounded-lg border border-ink-faint/20 bg-surface p-5"
          >
            <p className="mb-3 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-light">
              Your Journey
            </p>
            <div className="grid grid-cols-2 gap-3 font-ui text-sm">
              <div>
                <span className="text-ink-light">Suspicion: </span>
                <span className="font-bold tabular-nums" style={{ color: config.color }}>{stats.mythiliSuspicion}%</span>
              </div>
              <div>
                <span className="text-ink-light">Facts told: </span>
                <span className="font-bold tabular-nums text-ink">{stats.factsTotal}</span>
              </div>
              <div>
                <span className="text-ink-light">Quality: </span>
                <span className="font-bold" style={{ color: config.color }}>{quality}</span>
              </div>
              <div>
                <span className="text-ink-light">Time: </span>
                <span className="font-bold tabular-nums text-ink">{Math.floor((stats.duration || 0) / 60000)}m</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Play again */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 7 }}
          className="text-center"
        >
          <button
            onClick={onPlayAgain}
            className="cursor-pointer rounded bg-saffron px-10 py-3.5 font-ui text-sm font-semibold uppercase tracking-widest text-paper transition-opacity duration-200 hover:opacity-90 active:opacity-80"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </div>
  );
}
