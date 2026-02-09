import { motion } from 'framer-motion';

export default function PanicNotification({ alert }) {
  if (!alert) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        x: [0, -4, 4, -2, 2, 0],
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        x: { duration: 0.4, delay: 0.2 },
      }}
      className="fixed inset-x-4 top-24 z-60 mx-auto max-w-md rounded-2xl border-2 border-amber-500/60 bg-kollywood-deep/95 p-5 shadow-2xl backdrop-blur-md"
    >
      {/* Flash effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-amber-500/20"
        animate={{ opacity: [0.4, 0, 0.2, 0] }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-400">
          {alert.friendName} is cracking
        </p>
        <p className="text-sm leading-relaxed text-white/90">
          {alert.leakText}
        </p>
      </div>
    </motion.div>
  );
}
