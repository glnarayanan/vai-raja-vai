import Header from './Header';
import SocialHub from './SocialHub';
import InventoryBar from './InventoryBar';

export default function GameLayout({
  children,
  sceneTitle,
  mythiliSuspicion = 0,
  friends = [],
  inventory = [],
  onUseItem,
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-paper">
      {/* Sticky header */}
      <Header sceneTitle={sceneTitle} mythiliSuspicion={mythiliSuspicion} />

      {/* NPC status hub */}
      <SocialHub mythiliSuspicion={mythiliSuspicion} friends={friends} />

      {/* Main content area */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom inventory bar */}
      <InventoryBar
        inventory={inventory}
        onUseItem={onUseItem}
      />
    </div>
  );
}
