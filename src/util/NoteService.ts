import { Note } from 'webmidi'
import { Accidental } from '../constants/type'

export function createNoteFromMidiNumber(midiNumber: number, accidental: Accidental = 'natural'): Note {
  let resultNote = new Note(midiNumber)
  if (accidental === 'flat' && resultNote.accidental === '#') {
    resultNote = new Note(midiNumber + 1)
    resultNote.accidental = 'b'
  }
  return resultNote
}

export function createNoteFromNoteName(noteName: string, octobe: number = 0): Note {
  return new Note(noteName + octobe)
}

export function transposeNote(note: Note, octobe: number = 0, semitone: number = 0) {
  return new Note(note.getOffsetNumber(octobe, semitone))
}

export function convertToFlat(note: Note) {
  const resultNote = transposeNote(note, 0, 1)
  resultNote.accidental = 'b'
  return resultNote
}
