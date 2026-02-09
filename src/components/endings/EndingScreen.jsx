import CleanSweep from './CleanSweep';
import RiverbedRun from './RiverbedRun';
import InternationalFugitive from './InternationalFugitive';

const ENDINGS = {
  cleanSweep: CleanSweep,
  riverbedRun: RiverbedRun,
  internationalFugitive: InternationalFugitive,
};

export default function EndingScreen({ ending, onPlayAgain, stats, technicalities }) {
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
    <EndingComponent
      onPlayAgain={onPlayAgain}
      stats={stats}
      technicalities={technicalities}
    />
  );
}
