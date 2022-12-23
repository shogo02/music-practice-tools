import { MusicalConstants } from '../constants/musicalConstants'
import { Chord, ChordSettings } from '../constants/type';
import { Note } from "../../node_modules/webmidi/dist/esm/webmidi.esm";

export class ChordCalculator {
    private readonly CHORD = MusicalConstants.CHORD;
    private readonly NATURAL_ROOT = MusicalConstants.NATURAL_ROOT

    beforeRootNoteName = "";
    accidental = '';
    chordSettings: ChordSettings | null = null;

    getRandomRoot() {
        const shuffle = () => {
            const rootNoteName = this.NATURAL_ROOT[this.getRandomNumber(this.NATURAL_ROOT.length)];
            const rootNote = new Note(rootNoteName + "1");
            const pattern = ["natural"];
            if (this.chordSettings?._sharp.isTrue && !["E", "B"].includes(rootNote.name)) pattern.push("sharp");
            if (this.chordSettings?._flat.isTrue && !["C", "F"].includes(rootNote.name)) pattern.push("flat");

            switch (pattern[this.getRandomNumber(pattern.length)]) {
                case "sharp":
                    rootNote.accidental = '#';
                    break;
                case "flat":
                    rootNote.accidental = 'b';
                    break;
            }
            return rootNote;
        }
        
        let result = shuffle();
        while (this.beforeRootNoteName === result.identifier) {
            result = shuffle();
        }
        this.beforeRootNoteName = result.identifier;

        return result;
    }

    createRandomChord(rootNote?: Note): Chord {
        const tmpRootNote = rootNote ?? this.getRandomRoot();

        const chordSettingsArray = Object.entries(this.chordSettings ?? {}).filter(([key, value]) => {
            return value.isTrue === true && key !== '_sharp' && key !== '_flat'; // TODO chordSettingsからsharpとflatはなくしたい
        });
        const chordSetting = chordSettingsArray[this.getRandomNumber(chordSettingsArray.length)];
        const chordConfig = Object.entries(this.CHORD).find(([key, value]) => key === chordSetting[0]) ?? ["", []];
        
        const notesInChord = this.convertToFlatNotes(this.createNotesInChord(tmpRootNote, chordConfig[1]));
        const rootNoteName = tmpRootNote.name + (tmpRootNote.accidental ?? "");

        return {
            chordName: rootNoteName + (chordSetting[1].chordType === "M" ? "" : chordSetting[1].chordType),
            notesInChordName: notesInChord.map(e => e.name + (e.accidental ?? "")),
            notesInChordDegree: chordConfig[1]
        }
    }

    createNotesInChord(rootNote: Note, chordConfig: Array<number>) {
        const result: Array<Note> = [];
        chordConfig.forEach(e => {
            result.push(new Note(rootNote.getOffsetNumber(0, e - 1)));
        })
        return result;
    }

    convertToFlatNotes(notes: Array<Note>) {
        if(this.accidental !== "flat") return notes;

        return notes.map(e => {
            if(e.accidental === "#") {
                e = new Note(e.getOffsetNumber(0, 1))
                e.accidental = "b"
            }
            return e
        })
    }

    getRandomNumber(max: number) {
        return Math.floor(Math.random() * max);
    }
}