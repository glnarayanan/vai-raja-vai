import { motion, AnimatePresence } from 'framer-motion';

const ITEM_ICONS = {
  phone: { emoji: '\uD83D\uDCF1', label: 'Phone' },
  diamond: { emoji: '\uD83D\uDC8E', label: 'Diamond' },
};

function InventoryItem({ item, onUse }) {
  const iconData = ITEM_ICONS[item.type] || { emoji: '\uD83D\uDCE6', label: item.type };
  const isDiamond = item.type === 'diamond';
  const isEmpty = item.usesRemaining <= 0;

  return (
    <motion.button
      className={`relative flex flex-col items-center gap-1 rounded-xl border px-3 py-2 transition-colors duration-200 ${
        isEmpty
          ? 'cursor-not-allowed border-white/5 bg-white/5 opacity-40'
          : isDiamond
            ? 'cursor-pointer border-red-500/30 bg-red-500/10 hover:bg-red-500/20'
            : 'cursor-pointer border-white/10 bg-white/10 hover:bg-white/15'
      }`}
      whileHover={isEmpty ? {} : { scale: 1.08 }}
      whileTap={isEmpty ? {} : { scale: 0.95 }}
      onClick={() => !isEmpty && onUse?.(item)}
      disabled={isEmpty}
    >
      <span className="text-2xl">{iconData.emoji}</span>
      <span className="text-[10px] font-medium text-white/60">{iconData.label}</span>

      {/* Uses remaining badge */}
      <span
        className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
          isEmpty
            ? 'bg-white/20 text-white/40'
            : 'bg-kollywood-teal text-kollywood-deep'
        }`}
      >
        {item.usesRemaining}
      </span>

      {/* Diamond risk indicator */}
      {isDiamond && !isEmpty && (
        <motion.span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-red-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          RISK
        </motion.span>
      )}
    </motion.button>
  );
}

export default function InventoryBar({ inventory = [], onUseItem }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-kollywood-deep/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center px-4 py-3">
        {/* Evidence items */}
        <div className="flex items-center gap-2.5">
          <AnimatePresence>
            {inventory.map((item) => (
              <motion.div
                key={item.id || item.type}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <InventoryItem item={item} onUse={onUseItem} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
