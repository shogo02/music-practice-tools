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
  correctNotes: Array<Note | undefined>
  inncorrectNotes: Array<Note | undefined>
  beforeRootNote: Note | undefined
  selectedAccidental: string
}

export const gameState: GameState = proxy({
  selectedChord: [{ key: 'major', buttonDisplayName: 'M', chordAttachName: '' }],
  isPlay: false,
  currentBeat: 0,
  currentChord: undefined,
  correctNotes: [],
  inncorrectNotes: [],
  beforeRootNote: undefined,
  selectedAccidental: 'natural',
})

export class GameContoller {
  // setSelectedChord(key: ChordKeyName) {
  //   this.selectedChord = key;
  // }

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

  static chordSettingsHanler = (chordSettingElement: ChordSettingElement) => {
    const selectedChordKey = gameState.selectedChord.map((e) => e.key)
    if (selectedChordKey.includes(chordSettingElement.key)) {
      gameState.selectedChord = gameState.selectedChord.filter((e) => e.key !== chordSettingElement.key)
    } else {
      gameState.selectedChord.push(chordSettingElement)
    }

    if (!gameState.selectedChord.length) {
      const defaultChord = Constants.CHORD_SETTINGS_INIT.find((e) => e.key === 'major')
      if (!defaultChord) throw new Error('not found default chord')
      gameState.selectedChord = [defaultChord]
    }
  }
}
