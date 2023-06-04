import { Note } from 'webmidi'
import { Constants } from '../constants/constants'
import { Accidental, Chord, ChordType, GameType } from '../constants/type'
import { convertAccidentalToSymbole } from './converter'
import { createNoteFromMidiNumber } from './NoteService'

const { NOTES_IN_CHORD_CONFIG, CHORD_SETTINGS_INIT, DIATONIC_3NOTE, DIATONIC_4NOTE } = Constants

export function getChordConfig(chordKeyName: ChordType) {
  const result = NOTES_IN_CHORD_CONFIG.find((e) => e.key === chordKeyName)
  if (!result) throw new Error('undifined chord config')
  return result
}

export function createChord(rootNote: Note, chordKeyName: ChordType, accidental: Accidental, baseOctobe: number = 0) {
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

export function createChordName(rootNote: Note, chordKeyName: ChordType) {
  const rootNoteName = rootNote.name + (rootNote.accidental ?? '')
  const chordAttachName = CHORD_SETTINGS_INIT.find((e) => e.key === chordKeyName)?.chordAttachName
  return rootNoteName + chordAttachName
}

export function getChordType(chordType: GameType, chordDegree: number): ChordType {
  if (chordType === 'diatonic3Note') {
    return DIATONIC_3NOTE[chordDegree - 1]
  }
  if (chordType === 'diatonic4Note') {
    return DIATONIC_4NOTE[chordDegree - 1]
  }
  throw new Error('undifined chord type')
}
