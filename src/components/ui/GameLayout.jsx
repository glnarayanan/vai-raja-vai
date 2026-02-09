import Header from './Header';
import SocialHub from './SocialHub';
import InventoryBar from './InventoryBar';

export default function GameLayout({
  children,
  sceneTitle,
  globalSuspicion = 0,
  wives = [],
  friends = [],
  inventory = [],
  onUseItem,
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-kollywood-midnight">
      {/* Sticky header */}
      <Header sceneTitle={sceneTitle} globalSuspicion={globalSuspicion} />

      {/* NPC status hub */}
      <SocialHub wives={wives} friends={friends} />

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
