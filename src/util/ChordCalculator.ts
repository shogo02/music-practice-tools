import { MusicalConstants } from '../constants/musicalConstants'
import { Chord, ChordSettings, NoteConfig, RootNoteConfig } from '../constants/type';


export const normalRoot: Array<RootNoteConfig> = [
    { noteId: 1, noteName: "C", isAbleToRootSharp: true, isAbleToRootFlat: false },
    { noteId: 3, noteName: "D", isAbleToRootSharp: true, isAbleToRootFlat: true },
    { noteId: 5, noteName: "E", isAbleToRootSharp: false, isAbleToRootFlat: true },
    { noteId: 6, noteName: "F", isAbleToRootSharp: true, isAbleToRootFlat: false },
    { noteId: 8, noteName: "G", isAbleToRootSharp: true, isAbleToRootFlat: true },
    { noteId: 10, noteName: "A", isAbleToRootSharp: true, isAbleToRootFlat: true },
    { noteId: 12, noteName: "B", isAbleToRootSharp: false, isAbleToRootFlat: true },
];

export const sharpFlatList = [2, 4, 7, 9, 11]


export class ChordCalculator {
    readonly CHORD = MusicalConstants.CHORD;

    beforeRootNoteId = 0;
    flatOrSharpNotaition = '';
    chordSettings: ChordSettings | null = null;

    static sortNoteName(noteNames: Array<string>) {
        const order = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const sortedNoteNames = noteNames.sort((a, b) => {
            return order.indexOf(a) - order.indexOf(b);
        })
        return sortedNoteNames;
    }

    getRandomRoot() {
        const shuffle = () => {
            const rootNote = normalRoot[this.getRandomNumber()];

            let patternList = [rootNote];

            if (this.chordSettings?._sharp.isTrue && rootNote.isAbleToRootSharp) {
                const sharpNoteId = this.getNoteIdFromInterval(rootNote.noteId, 1);
                patternList.push({ noteId: sharpNoteId, noteName: rootNote.noteName + "#" });
            }
            if (this.chordSettings?._flat.isTrue && rootNote.isAbleToRootFlat) {
                const flatNoteId = this.getNoteIdFromInterval(rootNote.noteId, -1);
                patternList.push({ noteId: flatNoteId, noteName: rootNote.noteName + "b" });
            }
            let index = this.getRandomNumber(patternList.length);

            return patternList[index];
        }

        let result = shuffle();
        while (this.beforeRootNoteId === result.noteId) {
            result = shuffle();
        }
        this.beforeRootNoteId = result.noteId;

        return result;
    }

    getChord(rootNote: NoteConfig) {
        const chordSettingsArray = Object.entries(this.chordSettings ?? {}).filter(([key, value]) => {
            return value.isTrue === true && key !== '_sharp' && key !== '_flat'; // TODO chordSettingsからsharpとflatはなくしたい
        });
        const chordSetting = chordSettingsArray[this.getRandomNumber(chordSettingsArray.length)];
        const chordConfig = Object.entries(MusicalConstants.CHORD).find(([key, value]) => key === chordSetting[0]);

        if (!chordConfig) return;

        const notesInChord = this.getNotesInCode(rootNote, chordConfig?.[1]);

        const resultChord: Chord = {
            chordName: rootNote.noteName + (chordSetting[1].chordType === MusicalConstants.CHORD_SETTINGS_INIT._M.chordType ? "" : chordSetting[1].chordType),
            notesInChord: notesInChord
        }
        return resultChord;
    }

    getNotesInCode(rootNote: NoteConfig, chordConfig: Array<number>) {
        const result: Array<NoteConfig> = [];
        chordConfig.forEach(e => {
            const interval = this.getNoteIdFromInterval(rootNote.noteId, e - 1);
            result.push({
                noteId: e,
                noteName: this.getNote(interval)
            })
        })
        return result;
    }

    getRandomNumber(max: number = 7) {
        let result = Math.floor(Math.random() * max);
        return result;
    }

    getNote(noteId: number) {
        let tmpNoteId = noteId;
        let note = "";

        const isSharpOrFlat = sharpFlatList.indexOf(noteId) < 0 ? false : true;
        if (isSharpOrFlat && this.flatOrSharpNotaition === 'sharp') {
            tmpNoteId = this.getNoteIdFromInterval(noteId, -1);
            note = normalRoot.find(e => e.noteId === tmpNoteId)?.noteName + "#";
        } else if (isSharpOrFlat && this.flatOrSharpNotaition === 'flat') {
            tmpNoteId = this.getNoteIdFromInterval(noteId, 1);
            note = normalRoot.find(e => e.noteId === tmpNoteId)?.noteName + "b";
        } else {
            note = normalRoot.find(e => e.noteId === tmpNoteId)?.noteName + "";
        }

        return note ?? "";
    }

    getNoteIdFromInterval(noteId: number, interval: number) {
        let resultNoteId = noteId + interval;
        if (resultNoteId < 1) resultNoteId = 12 - resultNoteId;
        if (resultNoteId > 12) resultNoteId = resultNoteId - 12;
        return resultNoteId;
    }
}