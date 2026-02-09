import { motion } from 'framer-motion';

const SCENE_NUMBERS = {
  THE_FLIGHT: 'I',
  THE_MISUNDERSTANDING: 'II',
  BANGALORE_BIRTHDAY: 'III',
  THE_AFTERMATH: 'IV',
  UGADI_PARTY: 'V',
  THE_CONFRONTATION: 'VI',
  THE_BRIDGE: 'VII',
};

export default function ChapterCard({ scene, headline, subtext, color = 'text-ink' }) {
  const chapterNum = SCENE_NUMBERS[scene];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center py-16 text-center"
    >
      {/* Chapter number */}
      {chapterNum && (
        <motion.span
          className="mb-4 font-display text-sm font-normal tracking-[0.3em] text-ink-faint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {chapterNum}
        </motion.span>
      )}

      {/* Thin rule */}
      <motion.div
        className="mb-6 h-px w-12 bg-ink-faint/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      {/* Headline */}
      <motion.p
        className={`font-display text-lg font-semibold ${color}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        {headline}
      </motion.p>

      {/* Subtext */}
      {subtext && (
        <motion.p
          className="mt-3 max-w-xs text-sm italic leading-relaxed text-ink-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}
