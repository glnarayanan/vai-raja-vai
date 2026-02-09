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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

export default function ResponseOptions({ options = [], onSelect }) {
  if (!options.length) return null;

  return (
    <motion.div
      className="flex flex-col gap-2.5"
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
            whileHover={isDisabled ? {} : { scale: 1.02, x: 4 }}
            whileTap={isDisabled ? {} : { scale: 0.98 }}
            className={`cursor-pointer rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-colors duration-200 ${
              isDisabled
                ? 'cursor-not-allowed border-white/10 bg-white/5 text-white/30'
                : 'border-white/20 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/30'
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
