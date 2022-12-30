import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import PadButton from './parts/PadButton'
import { Constants } from '../constants/constants'
import { GameContoller } from '../controller/GameController'
import { gameState } from '../controller/GameState'
import { DiatonicRoot } from '../constants/type'

const { CHORD_SETTINGS_INIT, DIATONIC_ROOT } = Constants

export function RandomChordType() {
  const { selectedChord } = useSnapshot(gameState)
  const selectedChordKey = selectedChord.map((e) => e.key)

  if (!selectedChordKey.length) {
    const defaultChord = CHORD_SETTINGS_INIT.find((e) => e.key === 'major')
    if (!defaultChord) throw new Error('undifind default chord')
    GameContoller.chordSettingHanler(defaultChord)
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {CHORD_SETTINGS_INIT.map((e) => {
        const checked = selectedChordKey.includes(e.key)
        return (
          <div className="col-span-1" key={e.key}>
            <PadButton
              id={`chord${e.key}`}
              text={e.buttonDisplayName}
              checked={checked}
              onChange={() => GameContoller.chordSettingHanler(e)}
            />
          </div>
        )
      })}
    </div>
  )
}

export function Diatonic3Note() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {DIATONIC_ROOT.map((e) => (
        <div key={e} className="border border-black" onClick={() => GameContoller.selectDiatonicChordRoot(e)}>
          {e}
        </div>
      ))}
    </div>
  )
}

export function ChordTypeRender() {
  const { chordType } = useSnapshot(gameState)
  if (chordType === 'random') {
    return <RandomChordType />
  }
  return <Diatonic3Note />
}

function Pad() {
  const { isPlay, chordType } = useSnapshot(gameState)

  return (
    <div className="mt-5 mx-6">
      <div className="grid grid-cols-3 gap-5 mb-5">
        <div className="col-span-3">
          <PadButton id="play" text={isPlay ? '■' : '▶'} onChange={GameContoller.metronomeToggle} checked={isPlay} />
        </div>
      </div>
      <ChordTypeRender />
      <div />
    </div>
  )
}

export default Pad
