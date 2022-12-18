export type Note = {
    noteId: number;
    note: String;
    isAbleToSharp?: boolean;
    isAbleToFlat?: boolean;
}
export type Chord = {
    rootNoteId: number;
    _3rd: 'none' | 'major' | 'miner' | 'sus4';
    _5th: 'none' | 'perfect' | 'aug' | 'dim';
    _7th: 'none' | 'major' | 'minor';
    _9th: 'none' | 'natural' | 'sharp' | 'flat';
    _11th: 'none' | 'natural' | 'sharp';
    _13th: 'none' | 'natural' | 'flat';
}

export const normalRoot: Array<Note> = [
    { noteId: 1, note: "C", isAbleToSharp: true, isAbleToFlat: false},
    { noteId: 3, note: "D", isAbleToSharp: true, isAbleToFlat: true},
    { noteId: 5, note: "E", isAbleToSharp: false, isAbleToFlat: true},
    { noteId: 7, note: "F", isAbleToSharp: true, isAbleToFlat: false},
    { noteId: 9, note: "G", isAbleToSharp: true, isAbleToFlat: true},
    { noteId: 11, note: "A", isAbleToSharp: true, isAbleToFlat: true},
    { noteId: 12, note: "B", isAbleToSharp: false, isAbleToFlat: true},
];


export const sharpFlatRootList = [2, 4, 6, 8, 10]

export class ChordCalculator {
    beforeRootNoteId = 0;

    constructor(){
    }
    
    getRandomRoot(isSharp?: boolean, isFlat?: boolean) {
        const shuffle = () => {
            let tmp = normalRoot[this.getRandomNumber()];

            let patternList = [tmp];

            if (isSharp && tmp.isAbleToSharp) {
                const sharpNoteId = this.getNoteIdFromInterval(tmp.noteId, 1);
                patternList.push({noteId: sharpNoteId, note: tmp.note + "#"});
            }
            if (isFlat && tmp.isAbleToFlat) {
                const flatNoteId = this.getNoteIdFromInterval(tmp.noteId, -1);
                patternList.push({noteId: flatNoteId, note: tmp.note + "b"});
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

    getNotesInCode(chord: Chord, isSharp?: boolean, isFlat?: boolean) {
        let result: Array<Note> = [];
        // const root = { noteId: chord.rootNoteId, note: }
        result.push()

        return result;
    }

    getRandomNumber(max: number = 7) {
        let result = Math.floor(Math.random() * max);
        return result;
    }

    getNote(noteId: number, isSharp?: boolean, isFlat?: boolean) {
        const interval = isSharp ? 1 : (isFlat ? -1 : 0);
        let note = normalRoot.find(e => e.noteId === noteId);
        if (!note && interval < 0 && 0 < interval) {
            note = normalRoot.find(e => e.noteId === this.getNoteIdFromInterval(noteId, interval));
        }
        return note;
    }

    getNoteIdFromInterval(noteId: number, interval: number){
        let resultNoteId = noteId + interval;
        if(resultNoteId < 1) resultNoteId = 12 - resultNoteId; 
        if(resultNoteId > 12) resultNoteId = 1 + resultNoteId;
        return resultNoteId;
    }
}