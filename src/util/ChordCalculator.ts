import { Note } from 'webmidi'
import {
  Chord,
  ChordKeyName,
  ChordSettingElement,
  ChordType,
  DiatonicRoot,
  NotesInChordConfig,
  NotesInChordElement,
} from '../constants/type'
import { Constants } from '../constants/constants'

const { NATURAL_ROOT, NOTES_IN_CHORD_CONFIG, CHORD_SETTINGS_INIT, DIATONIC_3NOTE, DIATONIC_4NOTE, SCALE_NOTES } = Constants

export default class ChordCalculator {
  static getRandomRoot(selectedAccidental: string, beforeRootNote?: Note) {
    const shuffle = () => {
      const rootNoteName = NATURAL_ROOT[ChordCalculator.getRandomNumber(NATURAL_ROOT.length)]
      const rootNote = new Note(`${rootNoteName}4`)
      const pattern = ['natural']
      if (selectedAccidental.includes('sharp') && !['E', 'B'].includes(rootNote.name)) pattern.push('sharp')
      if (selectedAccidental.includes('flat') && !['C', 'F'].includes(rootNote.name)) pattern.push('flat')

      switch (pattern[ChordCalculator.getRandomNumber(pattern.length)]) {
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
    const randomChord = selectedChord[ChordCalculator.getRandomNumber(selectedChord.length)]
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

  static getRandomNumber = (max: number) => Math.floor(Math.random() * max)

  static convertToFlatNotes = (notes: Array<Note>, selectedAccidental: string) => {
    if (selectedAccidental !== 'flat') return notes

    return notes.map((e) => {
      let tmpNote = e
      if (e.accidental === '#') {
        tmpNote = new Note(e.getOffsetNumber(0, 1))
        tmpNote.accidental = 'b'
      }
      return tmpNote
    })
  }

  static createRootFromNotes = (rootNote: Note, intervalList: Array<number>, rootOffSet: number = 0) => {
    const result: Array<Note> = []
    intervalList.forEach((e) => {
      result.push(new Note(rootNote.getOffsetNumber(0, e - 1 + rootOffSet)))
    })
    return result
  }

  // ダイアトニックコード用
  static createRnadomDiatonicChord(chordType: ChordType, selectedDiatonicRoot: DiatonicRoot, beforeRootNote?: Note) {
    const notesInScale = SCALE_NOTES.find((e) => e.key === 'majorScale')?.notesInScale
    if (!notesInScale) throw new Error(`not found scale note`)
    const baseRootNote = new Note(`${selectedDiatonicRoot}4`)

    let rootNote = baseRootNote
    let randomNumber = 0
    const shuffle = () => {
      randomNumber = ChordCalculator.getRandomNumber(notesInScale.length)
      const interval = notesInScale[randomNumber]
      rootNote = new Note(baseRootNote.getOffsetNumber(0, interval - 1))
      return rootNote
    }

    let result = shuffle()
    while (beforeRootNote?.identifier === result.identifier) {
      result = shuffle()
    }

    let rootNoteKey: ChordKeyName
    if (chordType === 'diatonic3Note') {
      rootNoteKey = DIATONIC_3NOTE[randomNumber]
    } else if (chordType === 'diatonic4Note') {
      rootNoteKey = DIATONIC_4NOTE[randomNumber]
    } else {
      throw new Error('undifined chord type')
    }

    const chordConfig = NOTES_IN_CHORD_CONFIG.find((e) => e.key === rootNoteKey)
    if (!chordConfig) throw new Error(`not found chord config.`)

    const chord = ChordCalculator.createRootFromNotes(result, chordConfig.notesInChord)

    const rootNoteName = chord[0].name + (chord[0].accidental ?? '')
    const chordAttachName = CHORD_SETTINGS_INIT.find((e) => e.key === rootNoteKey)?.chordAttachName
    if (chordAttachName === undefined) throw new Error(`not found chord attach name.`)

    return {
      chordName: rootNoteName + chordAttachName,
      notesInChord: chord,
      notesInChordDegree: chordConfig.notesInChord,
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
