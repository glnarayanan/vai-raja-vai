import { motion } from 'framer-motion';

export default function FriendAlert({ alert, onIntercept, onIgnore }) {
  if (!alert) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed top-20 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-kollywood-saffron/40 bg-kollywood-deep/95 p-4 shadow-xl backdrop-blur-md"
    >
      <p className="mb-3 text-sm font-semibold text-kollywood-saffron">
        {alert.friendName} is heading toward {alert.targetWifeName}...
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => onIntercept(alert.friendId)}
          className="flex-1 cursor-pointer rounded-lg bg-kollywood-saffron px-4 py-2 text-sm font-bold text-kollywood-deep transition-colors duration-200 hover:bg-kollywood-saffron/80"
        >
          Intercept
        </button>
        <button
          onClick={onIgnore}
          className="flex-1 cursor-pointer rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/10"
        >
          Ignore
        </button>
      </div>
    </motion.div>
  );
}
