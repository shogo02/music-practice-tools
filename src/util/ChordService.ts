import { Note } from 'webmidi'
import { Constants } from '../constants/constants'
import { Accidental, Chord, ChordKeyName, ChordType } from '../constants/type'
import { convertAccidentalToSymbole } from './converter'
import { createNoteFromMidiNumber } from './NoteService'

const { NOTES_IN_CHORD_CONFIG, CHORD_SETTINGS_INIT, DIATONIC_3NOTE, DIATONIC_4NOTE } = Constants

export function getChordConfig(chordKeyName: ChordKeyName) {
  const result = NOTES_IN_CHORD_CONFIG.find((e) => e.key === chordKeyName)
  if (!result) throw new Error('undifined chord config')
  return result
}

export function createChord(rootNote: Note, chordKeyName: ChordKeyName, accidental: Accidental, baseOctobe: number = 0) {
  const chordConfig = getChordConfig(chordKeyName)
  let midiDiffNum = (baseOctobe - rootNote.octave) * -12
  if (midiDiffNum < 0) midiDiffNum = 0

  const result: Array<Note> = []
  chordConfig?.notesInChord.forEach((e) => {
    const midiNumber = rootNote.number + e - 1 - midiDiffNum
    result.push(createNoteFromMidiNumber(midiNumber, accidental))
  })
  return result
}

export function createChordName(rootNote: Note, chordKeyName: ChordKeyName) {
  const rootNoteName = rootNote.name + (rootNote.accidental ?? '')
  const chordAttachName = CHORD_SETTINGS_INIT.find((e) => e.key === chordKeyName)?.chordAttachName
  return rootNoteName + chordAttachName
}

export function getChordKeyName(chordType: ChordType, chordDegree: number) {
  let chordKeyName: ChordKeyName

  if (chordType === 'diatonic3Note') {
    chordKeyName = DIATONIC_3NOTE[chordDegree - 1]
  } else if (chordType === 'diatonic4Note') {
    chordKeyName = DIATONIC_4NOTE[chordDegree - 1]
  } else {
    throw new Error('undifined chord type')
  }
  return chordKeyName
}
