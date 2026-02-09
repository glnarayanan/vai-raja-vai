function getPanicColor(panic) {
  if (panic < 30) return 'bg-calm';
  if (panic < 60) return 'bg-saffron';
  return 'bg-danger';
}

function getSuspicionBorder(suspicion) {
  if (suspicion === undefined || suspicion === null) return 'border-transparent';
  if (suspicion < 30) return 'border-transparent';
  if (suspicion < 85) return 'border-saffron';
  return 'border-danger';
}

export default function NpcAvatar({
  name,
  color = '#0F766E',
  suspicion,
  panic,
  isActive = false,
}) {
  const firstLetter = name?.charAt(0)?.toUpperCase() || '?';
  const hasSuspicion = suspicion !== undefined && suspicion !== null;
  const hasPanic = panic !== undefined && panic !== null && panic > 0;

  return (
    <div className="relative flex h-[5.5rem] flex-col items-center gap-1">
      <div className="relative">
        {/* Avatar circle */}
        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 font-ui text-lg font-bold transition-[border-color] duration-300 ${
            isActive ? 'border-saffron' : hasSuspicion ? getSuspicionBorder(suspicion) : 'border-transparent'
          }`}
          style={{ backgroundColor: color + '33', color }}
        >
          {firstLetter}
        </div>

        {/* Panic dot (for friends) */}
        {hasPanic && (
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface ${getPanicColor(panic)}`}
          />
        )}
      </div>

      {/* Name label */}
      <span className="max-w-[4rem] truncate text-center font-ui text-[11px] font-medium text-ink-light">
        {name}
      </span>
    </div>
  );
}
