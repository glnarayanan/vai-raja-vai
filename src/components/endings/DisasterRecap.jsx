import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

const RATINGS = [
  { min: 0, label: 'Temple Visit', desc: 'Suspiciously clean' },
  { min: 20, label: 'Minor Mischief', desc: 'A few white lies' },
  { min: 40, label: 'Classic Panchathanthiram', desc: 'Worthy of the five friends' },
  { min: 60, label: 'Full Kamal', desc: 'Dasavatharam-level deception' },
  { min: 80, label: 'Absolute Mayhem', desc: 'Even Nagesh is speechless' },
];

function getRating(score) {
  for (let i = RATINGS.length - 1; i >= 0; i--) {
    if (score >= RATINGS[i].min) return RATINGS[i];
  }
  return RATINGS[0];
}

function formatDuration(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

export default function DisasterRecap({ onBack, onPlayAgain }) {
  const recap = useGameStore((s) => s.getDisasterRecap());
  const shareText = useGameStore((s) => s.generateShareText());
  const [copied, setCopied] = useState(false);

  const rating = getRating(recap.chaosScore);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center bg-kollywood-deep px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md space-y-5">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="mb-1 text-3xl font-bold text-kollywood-saffron">
            Your Lies Unraveled
          </h1>
          <p className="text-sm text-white/50">The Chaos Recap</p>
        </motion.div>

        {/* Chaos Score Card */}
        <motion.div
          className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-1 text-5xl font-bold text-kollywood-saffron">
            {recap.chaosScore}
          </div>
          <div className="mb-3 text-xs text-white/40">CHAOS SCORE</div>
          <div className="text-lg font-semibold text-white/90">{rating.label}</div>
          <div className="text-sm text-white/50">{rating.desc}</div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <div className="text-xl font-bold text-white/90">{recap.liesTotal}</div>
            <div className="text-xs text-white/40">Lies Told</div>
          </div>
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <div className="text-xl font-bold text-white/90">{formatDuration(recap.duration)}</div>
            <div className="text-xs text-white/40">Survived</div>
          </div>
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <div className="text-xl font-bold text-white/90">{recap.globalSuspicion}%</div>
            <div className="text-xs text-white/40">Suspicion</div>
          </div>
        </motion.div>

        {/* Per-Wife Suspicion Bars */}
        <motion.div
          className="rounded-xl border border-white/10 bg-white/5 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="mb-3 text-sm font-semibold text-white/70">Wife Suspicion Levels</h3>
          <div className="space-y-2">
            {recap.wives.map((wife) => (
              <div key={wife.name} className="flex items-center gap-3">
                <span className="w-24 truncate text-xs text-white/60">{wife.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor:
                        wife.suspicion >= 70
                          ? '#EF4444'
                          : wife.suspicion >= 40
                            ? '#F59E0B'
                            : '#10B981',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${wife.suspicion}%` }}
                    transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-white/50">{wife.suspicion}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contradictions */}
        {recap.contradictions.length > 0 && (
          <motion.div
            className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <h3 className="mb-3 text-sm font-semibold text-red-300/80">
              Contradictions Caught ({recap.contradictions.length})
            </h3>
            <div className="space-y-3">
              {recap.contradictions.slice(0, 5).map((c, i) => (
                <div key={i} className="rounded-lg bg-red-500/5 p-3">
                  <div className="mb-2 text-xs font-medium text-red-300/60">{c.topic}</div>
                  <div className="space-y-1 text-xs">
                    <div className="text-white/70">
                      <span className="text-red-300/70">To {c.version1.wife}:</span> "{c.version1.claim}"
                    </div>
                    <div className="text-white/70">
                      <span className="text-red-300/70">To {c.version2.wife}:</span> "{c.version2.claim}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Friend Blurt Highlights */}
        {recap.blurtHighlights.length > 0 && (
          <motion.div
            className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <h3 className="mb-3 text-sm font-semibold text-amber-300/80">
              Friend Blunders ({recap.blurtHighlights.length})
            </h3>
            <div className="space-y-2">
              {recap.blurtHighlights.slice(0, 4).map((b, i) => (
                <div key={i} className="text-xs text-white/70">
                  <span className="font-medium text-amber-300/70">{b.friend}</span> told{' '}
                  <span className="font-medium text-amber-300/70">{b.wife}</span>: "{b.blurt}"
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Event Summary */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <div className="text-lg font-bold text-white/90">{recap.ambushCount}</div>
            <div className="text-xs text-white/40">Wife Ambushes</div>
          </div>
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <div className="text-lg font-bold text-white/90">{recap.chaosEventCount}</div>
            <div className="text-xs text-white/40">Chaos Events</div>
          </div>
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <div className="text-lg font-bold text-white/90">{recap.friendInterceptedCount}</div>
            <div className="text-xs text-white/40">Friends Intercepted</div>
          </div>
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <div className="text-lg font-bold text-white/90">{recap.stormedOff}</div>
            <div className="text-xs text-white/40">Wives Stormed Off</div>
          </div>
        </motion.div>

        {/* Share */}
        <motion.div
          className="rounded-xl border border-white/10 bg-white/5 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <p className="mb-3 text-xs italic text-white/50">{shareText}</p>
          <button
            onClick={handleCopy}
            className="w-full cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/15"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex gap-3 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
        >
          <button
            onClick={onBack}
            className="flex-1 cursor-pointer rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/5"
          >
            Back to Ending
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 cursor-pointer rounded-lg bg-kollywood-saffron px-4 py-3 text-sm font-bold text-kollywood-deep transition-opacity duration-200 hover:opacity-90"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
