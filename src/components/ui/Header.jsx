import SuspicionBar from './SuspicionBar';

export default function Header({ sceneTitle, mythiliSuspicion = 0 }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-faint/20 bg-paper py-3">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4">
        {/* Scene title — editorial serif */}
        <h1 className="truncate font-display text-xl font-semibold tracking-wide text-ink">
          {sceneTitle || 'Vai Raja Vai'}
        </h1>

        {/* Mythili suspicion meter */}
        <SuspicionBar suspicion={mythiliSuspicion} />
      </div>
    </header>
  );
}
