import { MusicalConstants } from '../constants/musicalConstants'

export type Note = {
    noteId: number;
    note: String;
}
export type RootNoteConfig = Note & {
    isAbleToRootSharp?: boolean;
    isAbleToRootFlat?: boolean;
}

export type Chord = {
    rootNoteId: number;
    _3rd: 'none' | 'major' | 'minor' | 'sus4';
    _5th: 'none' | 'perfect' | 'aug' | 'dim';
    _7th: 'none' | 'major' | 'minor';
    _9th: 'none' | 'natural' | 'sharp' | 'flat';
    _11th: 'none' | 'natural' | 'sharp';
    _13th: 'none' | 'natural' | 'flat';
}

export class NotesInChord {
    root: Note = {noteId: 0, note: "", };
    _3rd: Note | null = null;
    _5th: Note | null = null;
    _7th: Note | null = null;
    _9th: Note | null = null;
    _11th: Note | null = null;
    _13th: Note | null = null;
}

export const normalRoot: Array<RootNoteConfig> = [
    { noteId: 1, note: "C", isAbleToRootSharp: true, isAbleToRootFlat: false},
    { noteId: 3, note: "D", isAbleToRootSharp: true, isAbleToRootFlat: true},
    { noteId: 5, note: "E", isAbleToRootSharp: false, isAbleToRootFlat: true},
    { noteId: 6, note: "F", isAbleToRootSharp: true, isAbleToRootFlat: false},
    { noteId: 8, note: "G", isAbleToRootSharp: true, isAbleToRootFlat: true},
    { noteId: 10, note: "A", isAbleToRootSharp: true, isAbleToRootFlat: true},
    { noteId: 12, note: "B", isAbleToRootSharp: false, isAbleToRootFlat: true},
];

export const sharpFlatList = [2, 4, 7, 9, 11]


export class ChordCalculator {
    readonly MC = MusicalConstants;
    readonly INTERVAL = this.MC.IntervalFromRoot;

    beforeRootNoteId = 0;
    sharpNotaion: boolean | null = null;
    flatNotaion: boolean | null = null;

    getRandomRoot(isRootSharp?: boolean, isRootFlat?: boolean) {
        const shuffle = () => {
            const rootNote = normalRoot[this.getRandomNumber()];

            let patternList = [rootNote];

            if (isRootSharp && rootNote.isAbleToRootSharp) {
                const sharpNoteId = this.getNoteIdFromInterval(rootNote.noteId, 1);
                patternList.push({noteId: sharpNoteId, note: rootNote.note + "#"});
            }
            if (isRootFlat && rootNote.isAbleToRootFlat) {
                const flatNoteId = this.getNoteIdFromInterval(rootNote.noteId, -1);
                patternList.push({noteId: flatNoteId, note: rootNote.note + "b"});
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

    getNotesInCode(rootNote: Note, chord: Chord) {
        const result = new NotesInChord();
        
        const noteId3rd = this.getNoteIdFromInterval(rootNote.noteId, 4);
        const noteId5th = this.getNoteIdFromInterval(rootNote.noteId, 7);
        const noteId7th = this.getNoteIdFromInterval(rootNote.noteId, 11);
        const noteId9th = this.getNoteIdFromInterval(rootNote.noteId, 2);
        const noteId11th = this.getNoteIdFromInterval(rootNote.noteId, 5);
        const noteId13th = this.getNoteIdFromInterval(rootNote.noteId, 9);
        
        result.root = rootNote;
        result._3rd = {noteId: noteId3rd, note: this.getNote(noteId3rd)};
        result._5th = {noteId: noteId5th, note: this.getNote(noteId5th)};
        result._7th = {noteId: noteId7th, note: this.getNote(noteId7th)};
        result._9th = {noteId: noteId9th, note: this.getNote(noteId9th)};
        result._11th = {noteId: noteId11th, note: this.getNote(noteId11th)};
        result._13th = {noteId: noteId13th, note: this.getNote(noteId13th)};
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
        if (isSharpOrFlat && this.sharpNotaion) {
            tmpNoteId = this.getNoteIdFromInterval(noteId, -1);
            note = normalRoot.find(e => e.noteId === tmpNoteId)?.note + "#";
        }else if(isSharpOrFlat && this.flatNotaion){
            tmpNoteId = this.getNoteIdFromInterval(noteId, 1);
            note = normalRoot.find(e => e.noteId === tmpNoteId)?.note + "b";
        } else {
            note = normalRoot.find(e => e.noteId === tmpNoteId)?.note + "";
        }

        return note ?? "";
    }

    getNoteIdFromInterval(noteId: number, interval: number){
        let resultNoteId = noteId + interval;
        if(resultNoteId < 1) resultNoteId = 12 - resultNoteId; 
        if(resultNoteId > 12) resultNoteId = resultNoteId - 12;
        return resultNoteId;
    }
}