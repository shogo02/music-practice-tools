import parse from 'html-react-parser'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { gameState, GameContoller } from '../controller/GameController'
import { MidiController } from '../controller/MidiController'
import { NoteController } from '../controller/NoteController'
import { convertMusicalSymbols } from '../util/converter'

function Main() {
  useEffect(() => {
    GameContoller.gameReset()
    MidiController.initialize()
    NoteController.initialize()
    GameContoller.initialize()
  }, [])

  const { currentBeat, currentChord, correctNotes, playingNotes } = useSnapshot(gameState)
  const displayPlayingNotes = playingNotes.map((e) => e.name + (e.accidental ?? ''))

  return (
    <div className="border border-black h-full bg-[#000730] text-cyan-200 p-7">
      <div className="text-4xl">{currentBeat}</div>
      <div className="text-6xl text-center">{parse(convertMusicalSymbols(currentChord?.chordName ?? 'X'))}</div>
      <div className="text-4xl text-center">
        {currentChord?.notesInChord.map((value, index) => {
          const className = correctNotes[index] ? 'text-red-300' : ''
          return (
            <span key={value.identifier} className={className}>
              {parse(convertMusicalSymbols(value.name + (value.accidental ?? '')))}{' '}
            </span>
          )
        })}
      </div>
      <div className="text-3xl text-center">{currentChord?.notesInChordDegree.join(' ')}</div>
      <div className="text-3xl text-center">{parse(convertMusicalSymbols(displayPlayingNotes.join(' ')))}</div>

      {/* <sub>7</sub><sup>(-5)</sup> */}
      {/* &#9837;	&#9839; */}
    </div>
  )
}

export default Main
