import { WebMidi, Note, Input } from 'webmidi'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Chord, ChordKeyName, ChordSettingElement, ChordSettings } from '../constants/type'
import { Constants } from '../constants/constants'
import { NoteController } from './NoteController'
import ChordCalculator from '../util/ChordCalculator'

type GameState = {
  selectedChord: Array<ChordSettingElement>
  isPlay: boolean
  currentBeat: number
  currentChord: Chord | undefined
  correctNotes: Array<boolean | undefined>
  beforeRootNote: Note | undefined
  selectedAccidental: string
  playingNotes: Array<Note>
}

export const gameState: GameState = proxy({
  selectedChord: [],
  isPlay: false,
  currentBeat: 0,
  currentChord: undefined,
  correctNotes: [],
  beforeRootNote: undefined,
  selectedAccidental: 'natural',
  playingNotes: [new Note(60)],
})

export class GameContoller {
  static initialize() {
    const draw = () => {
      const position = NoteController.getCurrentBeat()
      gameState.currentBeat = position
      if (position === 1) {
        const chord = ChordCalculator.createRandomChord(
          gameState.selectedChord,
          gameState.selectedAccidental,
          gameState.beforeRootNote
        )
        gameState.currentChord = chord
        gameState.beforeRootNote = chord?.notesInChord[0]

        gameState.correctNotes = new Array(chord.notesInChord.length).map((e) => false)
      }
    }
    NoteController.createMetronomeBeat(draw)
  }

  static gameReset() {
    NoteController.partReset()
  }

  static metronomeToggle() {
    NoteController.toggleTransport()
    gameState.isPlay = !gameState.isPlay
  }

  static chordSettingHanler = (chordSettingElement: ChordSettingElement) => {
    const selectedChordKey = gameState.selectedChord.map((e) => e.key)
    if (selectedChordKey.includes(chordSettingElement.key)) {
      gameState.selectedChord = gameState.selectedChord.filter((e) => e.key !== chordSettingElement.key)
    } else {
      gameState.selectedChord.push(chordSettingElement)
    }
  }
}
