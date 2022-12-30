import { WebMidi, Note, Input } from 'webmidi'
import * as Tone from 'tone'
import { proxy, subscribe } from 'valtio'
import { type } from 'os'
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
    GameContoller.subscribeCorrectNote()
  }

  static createNextChord() {
    const chord = ChordCalculator.createRandomChord(
      gameState.selectedChord,
      gameState.selectedAccidental,
      gameState.beforeRootNote
    )
    gameState.currentChord = chord
    gameState.beforeRootNote = chord?.notesInChord[0]

    gameState.correctNotes.splice(0)
    gameState.correctNotes.push(...new Array(chord.notesInChordDegree.length).fill(false))
  }

  static gameReset() {
    NoteController.partReset()
  }

  static metronomeToggle() {
    NoteController.toggleTransport()
    gameState.isPlay = !gameState.isPlay

    if (!gameState.isPlay) {
      GameContoller.createNextChord()
    }
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
    gameState.playingNotes = []
  }

  static setSelectedAccidental = (accidental: Accidental) => {
    gameState.selectedAccidental = accidental
  }

  static subscribeCorrectNote() {
    subscribe(gameState.correctNotes, () => {
      if (!gameState.isPlay && gameState.correctNotes.every((e) => e === true)) {
        GameContoller.createNextChord()
      }
    })
  }
}
