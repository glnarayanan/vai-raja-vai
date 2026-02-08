import { useGameStore } from '../../store/gameStore';
import TheReturn from './TheReturn';
import UgadiParty from './UgadiParty';
import TheConfrontation from './TheConfrontation';
import RiverbedFinale from './RiverbedFinale';

export default function SceneManager() {
  const currentScene = useGameStore((s) => s.currentScene);

  switch (currentScene) {
    case 'THE_RETURN':
      return <TheReturn />;
    case 'UGADI_PARTY':
      return <UgadiParty />;
    case 'THE_CONFRONTATION':
      return <TheConfrontation />;
    case 'RIVERBED_FINALE':
      return <RiverbedFinale />;
    default:
      return null;
  }
}
