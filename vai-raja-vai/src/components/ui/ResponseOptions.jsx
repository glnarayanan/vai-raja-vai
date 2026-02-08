import { motion } from 'framer-motion';

const TYPE_STYLES = {
  safe: {
    base: 'border-kollywood-teal/40 bg-kollywood-teal/10 text-kollywood-teal',
    hover: 'hover:bg-kollywood-teal/20 hover:border-kollywood-teal/60',
    disabled: 'border-kollywood-teal/10 bg-kollywood-teal/5 text-kollywood-teal/30',
  },
  risky: {
    base: 'border-kollywood-magenta/40 bg-kollywood-magenta/10 text-kollywood-magenta',
    hover: 'hover:bg-kollywood-magenta/20 hover:border-kollywood-magenta/60',
    disabled: 'border-kollywood-magenta/10 bg-kollywood-magenta/5 text-kollywood-magenta/30',
  },
  deflect: {
    base: 'border-kollywood-saffron/40 bg-kollywood-saffron/10 text-kollywood-saffron',
    hover: 'hover:bg-kollywood-saffron/20 hover:border-kollywood-saffron/60',
    disabled: 'border-kollywood-saffron/10 bg-kollywood-saffron/5 text-kollywood-saffron/30',
  },
};

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
        const style = TYPE_STYLES[option.type] || TYPE_STYLES.safe;
        const isDisabled = option.disabled;

        return (
          <motion.button
            key={option.id}
            variants={itemVariants}
            whileHover={isDisabled ? {} : { scale: 1.02, x: 4 }}
            whileTap={isDisabled ? {} : { scale: 0.98 }}
            className={`cursor-pointer rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-colors duration-200 ${
              isDisabled
                ? `cursor-not-allowed ${style.disabled}`
                : `${style.base} ${style.hover}`
            }`}
            onClick={() => !isDisabled && onSelect?.(option.id)}
            disabled={isDisabled}
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDisabled ? 'opacity-30' : 'opacity-60'
                }`}
              >
                {option.type === 'safe'
                  ? 'Safe'
                  : option.type === 'risky'
                    ? 'Risky'
                    : 'Deflect'}
              </span>
              <span className={`h-px flex-1 ${isDisabled ? 'bg-white/5' : 'bg-white/10'}`} />
            </div>
            <p className="mt-1.5">{option.text}</p>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
