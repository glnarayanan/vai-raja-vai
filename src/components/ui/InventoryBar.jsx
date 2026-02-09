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
      className={`relative flex min-h-[44px] min-w-[44px] flex-col items-center gap-1 rounded-lg border px-3 py-2 transition-colors duration-200 ${
        isEmpty
          ? 'cursor-not-allowed border-ink-faint/20 bg-ink-faint/5 opacity-40'
          : isDiamond
            ? 'cursor-pointer border-danger/40 bg-danger/5 hover:bg-danger/10'
            : 'cursor-pointer border-ink-faint/40 bg-surface hover:bg-ink-faint/10'
      }`}
      whileHover={isEmpty ? {} : { scale: 1.05 }}
      whileTap={isEmpty ? {} : { scale: 0.95 }}
      onClick={() => !isEmpty && onUse?.(item)}
      disabled={isEmpty}
    >
      <span className="text-2xl">{iconData.emoji}</span>
      <span className="font-ui text-[10px] font-medium text-ink-light">{iconData.label}</span>

      {/* Uses remaining badge */}
      <span
        className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full font-ui text-[10px] font-bold ${
          isEmpty
            ? 'bg-ink-faint/30 text-ink-light'
            : 'bg-calm text-paper'
        }`}
      >
        {item.usesRemaining}
      </span>

      {/* Diamond risk indicator */}
      {isDiamond && !isEmpty && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-ui text-[9px] font-bold text-danger">
          RISK
        </span>
      )}
    </motion.button>
  );
}

export default function InventoryBar({ inventory = [], onUseItem }) {
  if (inventory.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-faint/30 bg-paper">
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
