import { WebMidi, Note, Input } from 'webmidi'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Accidental, Chord, ChordType, ChordSettingElement, ChordSettings, GameType, DiatonicRoot } from '../constants/type'

type GameState = {
  selectedChord: Array<ChordSettingElement>
  isPlay: boolean
  currentBeat: number
  currentChord: Chord
  correctNotes: Array<boolean>
  beforeRootNote: Note | undefined
  selectedAccidental: Accidental
  playingNotes: Array<Note>
  keyBoardOctobe: number
  chordType: GameType
  selectedDiatonicRoot: DiatonicRoot
}

export const gameState: GameState = proxy({
  selectedChord: [],
  isPlay: false,
  currentBeat: 0,
  currentChord: { chordName: '', notesInChord: [], notesInChordDegree: [] },
  correctNotes: [],
  beforeRootNote: undefined,
  selectedAccidental: 'natural',
  playingNotes: [],
  keyBoardOctobe: 0,
  chordType: 'diatonic3Note',
  selectedDiatonicRoot: 'C',
})
