import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function ResponseOptions({ options = [], onSelect }) {
  if (!options.length) return null;

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {options.map((option) => {
        const isDisabled = option.disabled;

        return (
          <motion.button
            key={option.id}
            variants={itemVariants}
            whileTap={isDisabled ? {} : { scale: 0.98 }}
            className={`cursor-pointer rounded-lg border px-5 py-3.5 text-left font-body text-[15px] leading-relaxed transition-colors duration-200 ${
              isDisabled
                ? 'cursor-not-allowed border-ink-faint/20 text-ink-faint'
                : 'border-ink-faint/30 bg-paper text-ink hover:border-saffron/40 hover:bg-surface active:bg-surface/80'
            }`}
            onClick={() => !isDisabled && onSelect?.(option.id)}
            disabled={isDisabled}
          >
            <p>{option.text}</p>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
