import { motion } from 'framer-motion';

export default function PanicNotification({ alert }) {
  if (!alert) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed inset-x-4 top-24 z-60 mx-auto max-w-md rounded-2xl border-2 border-danger/60 bg-danger/5 p-5 shadow-lg"
    >
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-danger">
          {alert.friendName} is cracking
        </p>
        <p className="text-sm leading-relaxed text-ink">
          {alert.leakText}
        </p>
      </div>
    </motion.div>
  );
}
