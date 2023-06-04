import { Note } from 'webmidi'
import {
  Accidental,
  Chord,
  ChordType,
  ChordSettingElement,
  GameType,
  DiatonicRoot,
  NotesInChordConfig,
  NotesInChordElement,
} from '../constants/type'
import { Constants } from '../constants/constants'
import { convertToFlat, createNoteFromNoteIdentifiers, createNoteFromNoteName, transposeNote } from './NoteService'
import { createChord, createChordName, getChordConfig, getChordType } from './ChordService'

const {
  NATURAL_ROOT,
  NOTES_IN_CHORD_CONFIG,
  CHORD_SETTINGS_INIT,
  DIATONIC_3NOTE,
  DIATONIC_4NOTE,
  SCALE_NOTE_NUMBERS,
  MAJOR_SCALE_IDENTIFIERS,
} = Constants

export default class ChordCalculator {
  static getRandomRoot(selectedAccidental: string, beforeRootNote?: Note) {
    const shuffle = () => {
      const rootNoteName = NATURAL_ROOT[ChordCalculator.createRandomNumber(7)]
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
    gameType: GameType,
    selectedDiatonicRoot: DiatonicRoot,
    selectedAccidental: Accidental,
    beforeRootNote?: Note
  ): Chord {
    const majScaleIdentifiers = MAJOR_SCALE_IDENTIFIERS[selectedDiatonicRoot]
    let chordDegree = 0
    let chordType: ChordType = 'major'
    const shuffle = () => {
      chordDegree = ChordCalculator.createRandomNumber(7) + 1 // 1 to 7
      chordType = getChordType(gameType, chordDegree) // major or minor etc...

      // TODO ↓ここの取得方法から考える
      let notesDegree: number[] = []
      if (gameType === 'diatonic3Note') {
        notesDegree = [0, 2, 4].map((e) => {
          const number = e + chordDegree
          // return number
          return number < 6 ? number : number - 6
        })
      } else if (gameType === 'diatonic4Note') {
        notesDegree = [0, 2, 4, 6]
      }

      console.log(notesDegree)

      const noteIdentifiers = notesDegree.map((e) => majScaleIdentifiers[e])
      const chord = createNoteFromNoteIdentifiers(noteIdentifiers)
      // const rootNote = transposeNote(baseRootNote, 0, interval - 1)
      return chord

      // 0~6のランダム数字を取得 → ダイアトニックコードの度数が決まる
      // ダイアトニックコードの中から、chordtype(maj, min ...etc)を取得
      // chordtypeによって
    }

    let notesInChord = shuffle()
    while (beforeRootNote?.identifier === notesInChord[0].identifier) {
      notesInChord = shuffle()
    }
    const chordName = createChordName(notesInChord[0], chordType)

    return {
      chordName,
      notesInChord,
    }
  }

  static createChord(key: DiatonicRoot, chordType: ChordType, chordDegree: number) {
    
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
