import parse from 'html-react-parser'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { gameState, GameContoller } from '../controller/GameController'
import { MidiController } from '../controller/MidiController'
import { NoteController } from '../controller/NoteController'
import { convertMusicalSymbols } from '../util/converter'

function Main() {
  const { currentBeat, currentChord, correctNotes } = useSnapshot(gameState)

  useEffect(() => {
    GameContoller.gameReset()
    MidiController.initialize()
    NoteController.initialize()
    GameContoller.initialize()
  }, [])

  return (
    <div className="border border-black h-full bg-[#000730] text-cyan-200 p-7">
      <div className="text-4xl">{currentBeat}</div>
      <div className="text-6xl text-center">{parse(convertMusicalSymbols(currentChord?.chordName ?? 'X'))}</div>
      {/* <div className="text-4xl text-center">
        {currentChord?.notesInChord.map((value, index) => {
          const className = correctNotes.correctNotesInChord[index] ? 'text-red-300' : ''
          return (
            <span key={value} className={className}>
              {parse(convertMusicalSymbols(value))}{' '}
            </span>
          )
        })}
      </div>
      <div className="text-3xl text-center">{displayChord.notesInChordDegree.join(' ')}</div>
      <div className="text-3xl text-center">{parse(convertMusicalSymbols(displayPlayNotes.join(' ')))}</div> */}

      {/* <sub>7</sub><sup>(-5)</sup> */}
      {/* &#9837;	&#9839; */}
    </div>
  )
}

export default Main
