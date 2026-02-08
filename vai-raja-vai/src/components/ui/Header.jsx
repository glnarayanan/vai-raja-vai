import SuspicionBar from './SuspicionBar';

export default function Header({ sceneTitle, globalSuspicion = 0 }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-kollywood-deep/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        {/* Scene title */}
        <h1 className="truncate text-2xl font-bold text-white">
          {sceneTitle || 'Vai Raja Vai'}
        </h1>

        {/* Global suspicion meter */}
        <SuspicionBar suspicion={globalSuspicion} />
      </div>
    </header>
  );
}
