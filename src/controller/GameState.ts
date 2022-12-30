import { WebMidi, Note, Input } from 'webmidi'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Accidental, Chord, ChordKeyName, ChordSettingElement, ChordSettings } from '../constants/type'

type GameState = {
  selectedChord: Array<ChordSettingElement>
  isPlay: boolean
  currentBeat: number
  currentChord: Chord | undefined
  correctNotes: Array<boolean | undefined>
  beforeRootNote: Note | undefined
  selectedAccidental: string
  playingNotes: Array<Note>
  keyBoardOctobe: number
}

export const gameState: GameState = proxy({
  selectedChord: [],
  isPlay: false,
  currentBeat: 0,
  currentChord: undefined,
  correctNotes: [],
  beforeRootNote: undefined,
  selectedAccidental: 'natural',
  playingNotes: [],
  keyBoardOctobe: 0,
})
