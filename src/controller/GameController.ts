import { WebMidi, Note, Input } from 'webmidi'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Accidental, Chord, ChordKeyName, ChordSettingElement, ChordSettings } from '../constants/type'
import { Constants } from '../constants/constants'
import { NoteController } from './NoteController'
import ChordCalculator from '../util/ChordCalculator'
import { gameState } from './GameState'

export class GameContoller {
  static initialize() {
    GameContoller.createNextChord()

    const draw = () => {
      const position = NoteController.getCurrentBeat()
      gameState.currentBeat = position
      if (position === 1) {
        GameContoller.createNextChord()
      }
    }
    NoteController.createMetronomeBeat(draw)
  }

  static createNextChord() {
    const chord = ChordCalculator.createRandomChord(
      gameState.selectedChord,
      gameState.selectedAccidental,
      gameState.beforeRootNote
    )
    gameState.currentChord = chord
    gameState.beforeRootNote = chord?.notesInChord[0]

    gameState.correctNotes = new Array(chord.notesInChord.length).map((e) => false)
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

  static setKeyBoardOctobe = (octobe: number) => {
    NoteController.clearKeyboradReleaseALl()
    gameState.keyBoardOctobe = octobe
  }

  static setSelectedAccidental = (accidental: Accidental) => {
    gameState.selectedAccidental = accidental
  }
}
