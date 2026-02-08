import { motion, AnimatePresence } from 'framer-motion';

const ITEM_ICONS = {
  phone: { emoji: '\uD83D\uDCF1', label: 'Phone' },
  diamond: { emoji: '\uD83D\uDC8E', label: 'Diamond' },
  photo: { emoji: '\uD83D\uDCF7', label: 'Photo' },
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

export default function InventoryBar({
  inventory = [],
  onUseItem,
  onVaiRajaVai,
  vaiRajaVaiCooldown = 0,
  isVaiRajaVaiAvailable = true,
}) {
  const isOnCooldown = vaiRajaVaiCooldown > 0;
  const canUseVRV = isVaiRajaVaiAvailable && !isOnCooldown;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-kollywood-deep/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
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

        {/* Vai Raja Vai button */}
        <motion.button
          className={`relative overflow-hidden rounded-xl px-5 py-2.5 font-bold transition-opacity duration-200 ${
            canUseVRV
              ? 'cursor-pointer bg-gradient-to-r from-kollywood-lime to-kollywood-teal text-kollywood-deep shadow-lg shadow-kollywood-lime/20'
              : 'cursor-not-allowed bg-white/10 text-white/30'
          }`}
          whileHover={canUseVRV ? { scale: 1.05 } : {}}
          whileTap={canUseVRV ? { scale: 0.95 } : {}}
          onClick={() => canUseVRV && onVaiRajaVai?.()}
          disabled={!canUseVRV}
        >
          {/* Pulsing glow when available */}
          {canUseVRV && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl bg-white/20"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          )}

          <span className="relative z-10 text-sm tracking-wide">
            {isOnCooldown ? (
              <span className="font-mono">{vaiRajaVaiCooldown}s</span>
            ) : (
              'Vai Raja Vai!'
            )}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
