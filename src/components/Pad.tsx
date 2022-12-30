import { useSnapshot } from 'valtio';
import PadButton from './parts/PadButton';
import { Constants } from '../constants/constants';
import { gameControllerState } from '../controller/GameController';
import { GlobalController } from '../controller/GlobalController';

const chordSettingConfig = Constants.CHORD_SETTINGS_INIT;
function Pad() {
  const gameController = useSnapshot(gameControllerState);

  // const isPlay = gc.isPlay;
  // const metronomeToggle = gc.metronomeToggle;

  return (
    <div className="mt-5 mx-6">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3">
          <PadButton id="play" text={gameController.isPlay ? '■' : '▶'} onChange={GlobalController.metronomeToggle} checked={gameController.isPlay} />
        </div>
        {/* {
                    chordSettingConfig.map(e => {
                        const checked = false;
                        // const checked = enableChord.find(e2 => e2 === e.key) ? true : false;
                        return (
                            <div className="col-span-1" key={e.key}>
                                <PadButton id={'chord' + e.key} text={e.buttonDisplayName} checked={checked} onChange={() => gc.setSelectedChord(e.key)} />
                            </div>
                        );
                    })
                } */}
      </div>
    </div>
  );
}

export default Pad;
