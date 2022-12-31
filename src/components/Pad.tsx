import { useSnapshot } from 'valtio'
import { useEffect } from 'react'
import PadButton from './parts/PadButton'
import { Constants } from '../constants/constants'
import { GameContoller } from '../controller/GameController'
import { gameState } from '../controller/GameState'
import { DiatonicRoot } from '../constants/type'

const { CHORD_SETTINGS_INIT, DIATONIC_ROOT, DIATONIC_MINER } = Constants

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
  const { selectedDiatonicRoot } = useSnapshot(gameState)
  const rotateArray = [
    'rotate-[0deg]',
    'rotate-[30deg]',
    'rotate-[60deg]',
    'rotate-[90deg]',
    'rotate-[120deg]',
    'rotate-[150deg]',
    'rotate-[180deg]',
    'rotate-[210deg]',
    'rotate-[240deg]',
    'rotate-[270deg]',
    'rotate-[300deg]',
    'rotate-[330deg]',
  ]
  return (
    <div>
      <ul className="relative border p-0 mx-1 my-auto border-black w-[300px] h-[300px] rounded-[50%] list-none overflow-hidden rotate-[-15deg]">
        {rotateArray.map((value, index) => {
          const addClassName = DIATONIC_ROOT[index] === selectedDiatonicRoot ? 'bg-sky-600' : ''
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              onClick={() => GameContoller.selectDiatonicChordRoot(DIATONIC_ROOT[index] as DiatonicRoot)}
              key={value}
              className={`overflow-hidden absolute top-0 right-0 w-1/2 h-1/2 origin-[0%_100%] border border-black ${addClassName} ${value} skew-y-[-60deg]`}
            >
              <div className="absolute rotate-[0deg] skew-y-[60deg] w-[0%]">{DIATONIC_ROOT[index]}</div>
            </li>
          )
        })}
      </ul>
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
