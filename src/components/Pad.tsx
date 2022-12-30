import { useSnapshot } from 'valtio'
import PadButton from './parts/PadButton'
import { Constants } from '../constants/constants'
import { gameState, GameContoller } from '../controller/GameController'

const chordSettingConfig = Constants.CHORD_SETTINGS_INIT
function Pad() {
  const { isPlay, selectedChord } = useSnapshot(gameState)
  const selectedChordKey = selectedChord.map((e) => e.key)

  return (
    <div className="mt-5 mx-6">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3">
          <PadButton id="play" text={isPlay ? '■' : '▶'} onChange={GameContoller.metronomeToggle} checked={isPlay} />
        </div>
        {chordSettingConfig.map((e) => {
          const checked = selectedChordKey.includes(e.key)
          return (
            <div className="col-span-1" key={e.key}>
              <PadButton
                id={`chord${e.key}`}
                text={e.buttonDisplayName}
                checked={checked}
                onChange={() => GameContoller.chordSettingsHanler(e)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Pad
