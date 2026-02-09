import { useGameStore } from '../../store/gameStore';
import TheFlight from './TheFlight';
import TheMisunderstanding from './TheMisunderstanding';
import BangaloreBirthday from './BangaloreBirthday';
import TheAftermath from './TheAftermath';
import UgadiParty from './UgadiParty';
import TheConfrontation from './TheConfrontation';
import TheBridge from './TheBridge';

export default function SceneManager() {
  const currentScene = useGameStore((s) => s.currentScene);

  switch (currentScene) {
    case 'THE_FLIGHT':
      return <TheFlight />;
    case 'THE_MISUNDERSTANDING':
      return <TheMisunderstanding />;
    case 'BANGALORE_BIRTHDAY':
      return <BangaloreBirthday />;
    case 'THE_AFTERMATH':
      return <TheAftermath />;
    case 'UGADI_PARTY':
      return <UgadiParty />;
    case 'THE_CONFRONTATION':
      return <TheConfrontation />;
    case 'THE_BRIDGE':
      return <TheBridge />;
    default:
      return (
        <div className="flex items-center justify-center py-20">
          <p className="text-ink-light">Unknown scene: {currentScene}</p>
        </div>
      );
  }
}
