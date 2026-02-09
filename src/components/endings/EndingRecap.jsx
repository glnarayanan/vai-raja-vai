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
    <div className="min-h-screen bg-kollywood-midnight px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-kollywood-saffron">Your Journey</h1>
          <p className="text-white/40">Every choice, every consequence.</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 grid grid-cols-3 gap-3"
        >
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-kollywood-teal">{recap.mythiliSuspicion}%</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Suspicion</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-white/80">{mins}:{secs.toString().padStart(2, '0')}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Time</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-kollywood-saffron">{recap.factsTotal}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Facts</p>
          </div>
        </motion.div>

        {/* Choices Made */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Choices Made
          </p>
          <div className="flex flex-col gap-2">
            {choices.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-white/50">{c.label}</span>
                <span className="font-medium text-white/80">{c.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Friend Panic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Friend Status
          </p>
          <div className="flex flex-col gap-2">
            {recap.friends.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-white/50">{f.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-mono font-bold ${f.panic > 60 ? 'text-red-400' : f.panic > 30 ? 'text-amber-400' : 'text-green-400'}`}>
                    {f.panic}% panic
                  </span>
                  {f.calmed && <span className="text-[10px] text-kollywood-teal">CALMED</span>}
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
            className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400/60">
              Friend Leaks
            </p>
            {leaks.map((leak, i) => (
              <p key={i} className="mb-1 text-sm text-white/60">
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
          className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Share
          </p>
          <p className="text-sm leading-relaxed text-white/60">{shareText}</p>
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
            className="cursor-pointer rounded-lg border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/10"
          >
            Back
          </button>
          <button
            onClick={onPlayAgain}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-kollywood-lime to-emerald-400 px-8 py-2.5 text-sm font-bold text-kollywood-deep shadow-lg"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </div>
  );
}
