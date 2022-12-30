import { Note } from 'webmidi'
import { Chord, ChordSettingElement } from '../constants/type'
import { Constants } from '../constants/constants'

const { NATURAL_ROOT, NOTES_IN_CHORD_CONFIG, CHORD_SETTINGS_INIT } = Constants

export default class ChordCalculator {
  static getRandomRoot(selectedAccidental: string, beforeRootNote?: Note) {
    const shuffle = () => {
      const rootNoteName = NATURAL_ROOT[ChordCalculator.getRandomNumber(NATURAL_ROOT.length)]
      const rootNote = new Note(`${rootNoteName}1`)
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
    const notes = ChordCalculator.createNotesInChord(tmpRootNote, chordConfig?.notesInChord)
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

  static createNotesInChord = (rootNote: Note, chordConfig: Array<number>) => {
    const result: Array<Note> = []
    chordConfig.forEach((e) => {
      result.push(new Note(rootNote.getOffsetNumber(0, e - 1)))
    })
    return result
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
