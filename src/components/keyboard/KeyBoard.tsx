import { useSnapshot } from 'valtio'
import { Note } from 'webmidi'
import { Constants } from '../../constants/constants'
import { gameState } from '../../controller/GameState'
import ChordCalculator from '../../util/ChordCalculator'
import Key from './Key'

function KeyBoard() {
  const { playingNotes, selectedAccidental, keyBoardOctobe } = useSnapshot(gameState)

  let tmpPlayingNotes = [...playingNotes] as Array<Note>

  if (selectedAccidental === 'flat') {
    tmpPlayingNotes = ChordCalculator.convertToFlatNotes(tmpPlayingNotes, selectedAccidental)
  }

  const offSet = Constants.KEYBOARD_OFFSET + keyBoardOctobe * 12
  const keyBoardMaxNumber = 48
  const keyArray = [...Array(keyBoardMaxNumber)].map((_, i) => i + offSet)

  return (
    <div className="flex justify-center">
      <div className="h-36 w-3/4 flex justify-center">
        {keyArray.map((e) => {
          const playNote = tmpPlayingNotes.find((e2) => e2.number === e) as Note
          return (
            <div className="col-span-1" key={e}>
              <Key midiNumber={e} playNote={playNote} pcKey="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KeyBoard
