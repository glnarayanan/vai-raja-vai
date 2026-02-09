import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import BridgeReconciliation from './BridgeReconciliation';
import EndingRecap from './EndingRecap';

export default function EndingScreen({ endingQuality, onPlayAgain }) {
  const [showRecap, setShowRecap] = useState(false);
  const getEndingRecap = useGameStore((s) => s.getEndingRecap);
  const stats = getEndingRecap();

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {showRecap ? (
          <motion.div
            key="recap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EndingRecap
              onBack={() => setShowRecap(false)}
              onPlayAgain={onPlayAgain}
            />
          </motion.div>
        ) : (
          <motion.div
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BridgeReconciliation
              quality={endingQuality}
              onPlayAgain={onPlayAgain}
              stats={stats}
            />

            {/* Recap toggle button */}
            <motion.button
              onClick={() => setShowRecap(true)}
              className="fixed bottom-6 right-6 z-50 cursor-pointer rounded-full border border-ink-faint bg-surface px-5 py-2.5 text-sm font-medium text-ink shadow-md transition-colors duration-200 hover:bg-ink-faint/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Your Journey
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
