import { Note } from 'webmidi'
import {
  Accidental,
  Chord,
  ChordKeyName,
  ChordSettingElement,
  ChordType,
  DiatonicRoot,
  NotesInChordConfig,
  NotesInChordElement,
} from '../constants/type'
import { Constants } from '../constants/constants'
import { convertToFlat, createNoteFromNoteName, transposeNote } from './NoteService'
import { createChord, createChordName, getChordConfig, getChordKeyName } from './ChordService'

const {
  NATURAL_ROOT,
  NOTES_IN_CHORD_CONFIG,
  CHORD_SETTINGS_INIT,
  DIATONIC_3NOTE,
  DIATONIC_4NOTE,
  SCALE_NOTE_NUMBERS,
  MAJOR_SCALE_NOTE,
} = Constants

export default class ChordCalculator {
  static getRandomRoot(selectedAccidental: string, beforeRootNote?: Note) {
    const shuffle = () => {
      const rootNoteName = NATURAL_ROOT[ChordCalculator.createRandomNumber(NATURAL_ROOT.length)]
      const rootNote = new Note(`${rootNoteName}4`)
      const pattern = ['natural']
      if (selectedAccidental.includes('sharp') && !['E', 'B'].includes(rootNote.name)) pattern.push('sharp')
      if (selectedAccidental.includes('flat') && !['C', 'F'].includes(rootNote.name)) pattern.push('flat')

      switch (pattern[ChordCalculator.createRandomNumber(pattern.length)]) {
        case 'sharp':
          rootNote.accidental = '#'
          break
        case 'flat':
          rootNote.accidental = 'b'
          break
        default:
      }
      return rootNote
    }

    let result = shuffle()
    while (beforeRootNote?.identifier === result.identifier) {
      result = shuffle()
    }

    return result
  }

  static createRandomChord(selectedChord: Array<ChordSettingElement>, selectedAccidental: string, beforeRootNote?: Note): Chord {
    const tmpRootNote = ChordCalculator.getRandomRoot(selectedAccidental, beforeRootNote)
    const randomChord = selectedChord[ChordCalculator.createRandomNumber(selectedChord.length)]
    const chordConfig = NOTES_IN_CHORD_CONFIG.find((e) => e.key === randomChord.key)
    if (!chordConfig) throw new Error(`not found chord config.`)
    const notes = ChordCalculator.createRootFromNotes(tmpRootNote, chordConfig?.notesInChord)
    const rootNoteName = tmpRootNote.name + (tmpRootNote.accidental ?? '')

    return {
      chordName: rootNoteName + randomChord.chordAttachName,
      notesInChord: notes,
      notesInChordDegree: chordConfig.notesInChord,
    }
  }

  static createRandomNumber = (max: number) => Math.floor(Math.random() * max)

  // static convertToFlatNotes = (notes: Array<Note>, selectedAccidental: string) => {
  //   if (selectedAccidental !== 'flat') return notes

  //   return notes.map((e) => {
  //     let tmpNote = e
  //     if (e.accidental === '#') {
  //       tmpNote = new Note(e.getOffsetNumber(0, 1))
  //       tmpNote.accidental = 'b'
  //     }
  //     return tmpNote
  //   })
  // }

  static createRootFromNotes = (rootNote: Note, intervalList: Array<number>, rootOffSet: number = 0) => {
    const result: Array<Note> = []
    intervalList.forEach((e) => {
      result.push(new Note(rootNote.getOffsetNumber(0, e - 1 + rootOffSet)))
    })
    return result
  }

  static convertOctoveInChord(baseNote: Note, chord: Note[]): Note[] {
    if (chord[0].octave === baseNote.octave) return chord
    const result = chord.map((e) => (e.octave === baseNote.octave ? e : new Note(e.getOffsetNumber(-1))))
    return result
  }

  // ダイアトニックコード用
  static createRnadomDiatonicChord(
    chordType: ChordType,
    selectedDiatonicRoot: DiatonicRoot,
    selectedAccidental: Accidental,
    beforeRootNote?: Note
  ) {
    const majorScaleNote = MAJOR_SCALE_NOTE[selectedDiatonicRoot]

    const notesInScale = SCALE_NOTE_NUMBERS.majorScale
    const baseRootNote = createNoteFromNoteName(selectedDiatonicRoot)

    let randomNumber = 0
    const shuffle = () => {
      randomNumber = ChordCalculator.createRandomNumber(notesInScale.length)
      const interval = notesInScale[randomNumber]
      const rootNote = transposeNote(baseRootNote, 0, interval - 1)
      return rootNote
    }

    let resultRootNote = shuffle()
    while (beforeRootNote?.identifier === resultRootNote.identifier) {
      resultRootNote = shuffle()
    }

    const chordKeyName = getChordKeyName(chordType, randomNumber + 1)
    const chord = createChord(resultRootNote, chordKeyName, selectedAccidental)
    const chordName = createChordName(chord[0], chordKeyName)
    const chordConfig = getChordConfig(chordKeyName)

    return {
      chordName,
      notesInChord: chord,
      notesInChordDegree: chordConfig?.notesInChord,
    }
  }

  static pcKeyToNote = (key: string) => {
    const pcKey = Constants.PC_KEY

    let index = pcKey[0].findIndex((value) => value === key)
    if (index >= 0) {
      const tmpNote = new Note(index)
      return new Note(tmpNote.getOffsetNumber(4))
    }

    index = pcKey[1].findIndex((value) => value === key)
    if (index >= 0) {
      const tmpNote = new Note(index)
      return new Note(tmpNote.getOffsetNumber(5))
    }
    return undefined
  }
}
