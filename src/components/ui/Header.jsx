import SuspicionBar from './SuspicionBar';

export default function Header({ sceneTitle, mythiliSuspicion = 0 }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-kollywood-deep/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        {/* Scene title */}
        <h1 className="truncate text-2xl font-bold text-white">
          {sceneTitle || 'Vai Raja Vai'}
        </h1>

        {/* Mythili suspicion meter */}
        <SuspicionBar suspicion={mythiliSuspicion} />
      </div>
    </header>
  );
}
