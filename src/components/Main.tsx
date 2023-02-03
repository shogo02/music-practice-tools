import parse from 'html-react-parser'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { Note } from 'webmidi'
import { GameContoller } from '../controller/GameController'
import { gameState } from '../controller/GameState'
import { MidiController } from '../controller/MidiController'
import { NoteController } from '../controller/NoteController'
import ChordCalculator from '../util/ChordCalculator'
import { convertMusicalSymbols } from '../util/converter'
import { Score } from './score/Score'

function Main() {
  useEffect(() => {
    GameContoller.gameReset()
    MidiController.initialize()
    NoteController.initialize()
    GameContoller.initialize()
  }, [])

  const { currentBeat, currentChord, correctNotes, playingNotes, selectedAccidental, selectedDiatonicRoot, chordType } =
    useSnapshot(gameState)

  let tmpPlayingNotes = [...playingNotes] as Array<Note>
  let displayNortesInChord = [...currentChord.notesInChord] as Array<Note>

  if (selectedAccidental === 'flat' || selectedDiatonicRoot.includes('b')) {
    tmpPlayingNotes = ChordCalculator.convertToFlatNotes(tmpPlayingNotes, 'flat')
    displayNortesInChord = ChordCalculator.convertToFlatNotes(displayNortesInChord, 'flat')
  }

  const displayPlayingNotes = tmpPlayingNotes
    .sort((a, b) => (a.number < b.number ? -1 : 1))
    .map((e) => e.name + (e.accidental ?? ''))

  return (
    <div className="border border-black h-full bg-[#000730] text-cyan-200 p-4 flex flex-col items-center">
      <div className="text-4xl">{currentBeat}</div>
      <div className="text-6xl text-center">{parse(convertMusicalSymbols(currentChord?.chordName ?? 'X'))}</div>
      <div className="text-4xl text-center">
        {displayNortesInChord?.map((value, index) => {
          const className = correctNotes[index] ? 'text-red-300' : ''
          return (
            <span key={value.identifier} className={className}>
              {parse(convertMusicalSymbols(value.name + (value.accidental ?? '')))}{' '}
            </span>
          )
        })}
      </div>
      <div className="text-3xl text-center">{currentChord?.notesInChord.map((e) => e.number).join(' ')}</div>
      {/* <div className="text-3xl text-center">{currentChord?.notesInChordDegree.join(' ')}</div> */}
      <Score displayNortesInChord={displayNortesInChord} selectedDiatonicRoot={selectedDiatonicRoot} chordType={chordType} />
      <div className="text-3xl text-center">{parse(convertMusicalSymbols(displayPlayingNotes.join(' ')))}</div>
      {/* <sub>7</sub><sup>(-5)</sup> */}
      {/* &#9837;	&#9839; */}
    </div>
  )
}

export default Main
