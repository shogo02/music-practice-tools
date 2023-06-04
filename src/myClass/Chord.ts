import { Note } from 'webmidi'

export class Chord {
  name: string | null = null

  key: string | null = null

  chordDegree: number | null = null

  notesInChord: Array<Note> | [] = []

  createChord() {
    return ''
  }
}
