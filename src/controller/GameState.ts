import { WebMidi, Note, Input } from 'webmidi'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Accidental, Chord, ChordKeyName, ChordSettingElement, ChordSettings } from '../constants/type'

type GameState = {
  selectedChord: Array<ChordSettingElement>
  isPlay: boolean
  currentBeat: number
  currentChord: Chord
  correctNotes: Array<boolean | undefined>
  beforeRootNote: Note | undefined
  selectedAccidental: Accidental
  playingNotes: Array<Note>
  keyBoardOctobe: number
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
})
