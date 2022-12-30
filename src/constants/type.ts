import { Note } from 'webmidi'

export type ChordKeyName =
  | 'power'
  | 'major'
  | 'minor'
  | 'dim'
  | 'aug'
  | 'sus2'
  | 'sus4'
  | '6'
  | 'm6'
  | '7'
  | 'M7'
  | 'm7'
  | 'mM7'
  | 'aug7'
  | 'dim7'
  | '7b5'
  | '7shp5'
  | 'm7b5'
  | 'm7shp5'

export type ChordSettingElement = {
  key: ChordKeyName
  chordAttachName: string
  buttonDisplayName: string
}
export type ChordSettings = Array<ChordSettingElement>

export type NotesInChordElement = {
  key: ChordKeyName
  notesInChord: Array<number>
}
export type NotesInChordConfig = Array<NotesInChordElement>

export type NoteConfig = {
  noteId: number
  noteName: string
}
export type RootNoteConfig = NoteConfig & {
  isAbleToRootSharp?: boolean
  isAbleToRootFlat?: boolean
}

export type Chord = {
  chordName: string
  notesInChord: Array<Note>
  notesInChordDegree: Array<number>
}

export type CorrectChord = Chord & {
  correctNotesInChord: Array<string>
}

export type PcKeyToMidiMap = {
  midiNumber: number
  pcKey: string
}

export type GamePlayMode = 'tempo' | 'nextByMyself' | 'correctToNext'

export type Accidental = 'natural' | 'sharp' | 'flat'
