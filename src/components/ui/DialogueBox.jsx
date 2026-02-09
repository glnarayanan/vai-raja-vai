import { motion } from 'framer-motion';

export default function DialogueBox({
  speaker,
  text,
  speakerColor = '#0F766E',
  isAmbush = false,
}) {
  return (
    <motion.div
      className={`relative rounded-lg border-l-2 bg-surface/60 px-6 py-5 ${
        isAmbush ? 'border-l-saffron' : 'border-l-ink-faint/30'
      }`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Speaker name — hidden for narrator (prose needs no attribution) */}
      {speaker && speaker !== 'Narrator' && (
        <p className="mb-2 font-ui text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: speakerColor }}>
          {speaker}
        </p>
      )}

      {/* Dialogue text — serif */}
      <p className="font-body text-base leading-[1.8] text-ink">
        {text}
      </p>
    </motion.div>
  );
}
