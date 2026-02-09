import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CleanSweep from './CleanSweep';
import RiverbedRun from './RiverbedRun';
import InternationalFugitive from './InternationalFugitive';
import SurvivedSomehow from './SurvivedSomehow';
import Busted from './Busted';
import FullChaos from './FullChaos';
import DisasterRecap from './DisasterRecap';

const ENDINGS = {
  cleanSweep: CleanSweep,
  riverbedRun: RiverbedRun,
  internationalFugitive: InternationalFugitive,
  survivedSomehow: SurvivedSomehow,
  busted: Busted,
  fullChaos: FullChaos,
};

export default function EndingScreen({ ending, onPlayAgain, stats, technicalities }) {
  const [showRecap, setShowRecap] = useState(false);
  const EndingComponent = ENDINGS[ending];

  if (!EndingComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-kollywood-midnight">
        <div className="text-center">
          <p className="mb-4 text-xl text-white/60">
            Unknown ending: <span className="font-mono text-kollywood-magenta">{ending}</span>
          </p>
          <button
            onClick={onPlayAgain}
            className="cursor-pointer rounded-lg bg-kollywood-saffron px-8 py-3 font-bold text-kollywood-deep transition-colors duration-300 hover:bg-kollywood-saffron/90"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

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
            <DisasterRecap
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
            <EndingComponent
              onPlayAgain={onPlayAgain}
              stats={stats}
              technicalities={technicalities}
            />

            {/* Recap toggle button */}
            <motion.button
              onClick={() => setShowRecap(true)}
              className="fixed bottom-6 right-6 z-50 cursor-pointer rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/80 shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Your Chaos Recap
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
