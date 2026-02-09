import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

const CHOICE_LABELS = {
  personality: 'Personality',
  weddingToast: 'Wedding Toast',
  rescueMethod: 'Rescue Method',
  explanationToMythili: 'Explanation to Mythili',
  wrongRoom: 'Wrong Room',
  refusalStyle: 'Refused Maggie',
  policeStance: 'Police Stance',
  disposalCare: 'Disposal Care',
  diamondHiding: 'Diamond Hiding',
  partyPrep: 'Party Prep',
  mythiliConversation: 'Mythili Conversation',
  maggieResponse: 'Maggie Response',
  smugglerResponse: 'Smuggler Response',
  smugglerHandling: 'Smuggler Handling',
  mythiliArrival: 'Mythili Arrival',
  bridgeApproach: 'Bridge Approach',
  bridgeDialogue: 'Bridge Dialogue',
  mythiliCall: 'Mythili Phone Call',
  mrsNairResponse: 'Mrs. Nair Confrontation',
  smugglerEvidence: 'Smuggler Evidence',
};

export default function EndingRecap({ onBack, onPlayAgain }) {
  const getEndingRecap = useGameStore((s) => s.getEndingRecap);
  const recap = getEndingRecap();

  const duration = recap.duration;
  const mins = Math.floor(duration / 60000);
  const secs = Math.floor((duration % 60000) / 1000);

  // Filter meaningful choices (exclude nulls and friendCalming object)
  const choices = Object.entries(recap.choices)
    .filter(([key, val]) => val !== null && key !== 'friendCalming' && typeof val === 'string')
    .map(([key, val]) => ({
      label: CHOICE_LABELS[key] || key,
      value: val,
    }));

  // Friend calming choices
  const friendCalming = recap.choices.friendCalming || {};
  const calmingEntries = Object.entries(friendCalming).map(([id, method]) => {
    const friendName = recap.friends.find((f) => f.name.toLowerCase().includes(id.replace('friend_', '')))?.name || id;
    return { friend: friendName, method };
  });

  // Leaks from recap events
  const leaks = recap.recapEvents.filter((e) => e.type === 'FRIEND_LEAK');

  // Share text
  const shareText = `I played Vai Raja Vai and got ${recap.endingQuality} ending with ${recap.mythiliSuspicion}% suspicion in ${mins}m ${secs}s. ${leaks.length > 0 ? `${leaks.length} friend(s) cracked under pressure.` : 'No friend leaks!'} #VaiRajaVai`;

  return (
    <div className="min-h-screen bg-paper px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 font-display text-3xl font-semibold tracking-wide text-saffron">Your Journey</h1>
          <p className="font-display italic text-ink-light">Every choice, every consequence.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 grid grid-cols-3 gap-3"
        >
          <div className="rounded-lg border border-ink-faint/20 bg-surface p-4 text-center">
            <p className="font-display text-2xl font-semibold tabular-nums text-calm">{recap.mythiliSuspicion}%</p>
            <p className="font-ui text-[10px] uppercase tracking-widest text-ink-light">Suspicion</p>
          </div>
          <div className="rounded-lg border border-ink-faint/20 bg-surface p-4 text-center">
            <p className="font-display text-2xl font-semibold tabular-nums text-ink">{mins}:{secs.toString().padStart(2, '0')}</p>
            <p className="font-ui text-[10px] uppercase tracking-widest text-ink-light">Time</p>
          </div>
          <div className="rounded-lg border border-ink-faint/20 bg-surface p-4 text-center">
            <p className="font-display text-2xl font-semibold tabular-nums text-saffron">{recap.factsTotal}</p>
            <p className="font-ui text-[10px] uppercase tracking-widest text-ink-light">Facts</p>
          </div>
        </motion.div>

        {/* Choices Made */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 rounded-lg border border-ink-faint/20 bg-surface p-5"
        >
          <p className="mb-3 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-light">
            Choices Made
          </p>
          <div className="flex flex-col gap-2">
            {choices.map((c, i) => (
              <div key={i} className="flex items-center justify-between font-ui text-sm">
                <span className="text-ink-light">{c.label}</span>
                <span className="font-medium text-ink">{c.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Friend Panic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6 rounded-lg border border-ink-faint/20 bg-surface p-5"
        >
          <p className="mb-3 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-light">
            Friend Status
          </p>
          <div className="flex flex-col gap-2">
            {recap.friends.map((f, i) => (
              <div key={i} className="flex items-center justify-between font-ui text-sm">
                <span className="text-ink-light">{f.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold tabular-nums ${f.panic > 60 ? 'text-danger' : f.panic > 30 ? 'text-saffron' : 'text-calm'}`}>
                    {f.panic}% panic
                  </span>
                  {f.calmed && <span className="text-[10px] font-semibold text-calm">CALMED</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaks */}
        {leaks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-6 rounded-lg border-l-2 border-danger/40 bg-danger/5 p-5"
          >
            <p className="mb-3 font-ui text-[10px] font-semibold uppercase tracking-widest text-danger">
              Friend Leaks
            </p>
            {leaks.map((leak, i) => (
              <p key={i} className="mb-1 text-sm text-ink-light">
                {leak.text}
              </p>
            ))}
          </motion.div>
        )}

        {/* Share text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-8 rounded-lg border border-ink-faint/20 bg-surface p-4"
        >
          <p className="mb-2 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-light">
            Share
          </p>
          <p className="text-sm leading-relaxed text-ink-light">{shareText}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={onBack}
            className="cursor-pointer border-b border-ink-faint bg-transparent px-6 py-2.5 font-ui text-sm font-medium tracking-wide text-ink-light transition-colors duration-200 hover:text-ink hover:border-ink"
          >
            Back
          </button>
          <button
            onClick={onPlayAgain}
            className="cursor-pointer rounded bg-saffron px-8 py-3 font-ui text-sm font-semibold uppercase tracking-widest text-paper transition-opacity duration-200 hover:opacity-90 active:opacity-80"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </div>
  );
}
