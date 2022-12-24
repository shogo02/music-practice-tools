import { Chord } from '../constants/type';
import { Note } from "../../node_modules/webmidi/dist/esm/webmidi.esm";
import { Constants } from '../constants/constants';
import { accidentalState, beforeRootNoteHandler, beforeRootNoteState, chordSettingsState, pcKeyOffSetState } from '../stateController/GlobalController';

const NATURAL_ROOT = Constants.NATURAL_ROOT
const NOTES_IN_CHORD_CONFIG = Constants.NOTES_IN_CHORD_CONFIG;
const CHORD_SETTINGS_INIT = Constants.CHORD_SETTINGS_INIT


export const getRandomRoot = () => {
    const accidental = accidentalState.selectedAccidental;
    const beforeRootNote = beforeRootNoteState.beforeRootNote;
    const shuffle = () => {
        const rootNoteName = NATURAL_ROOT[getRandomNumber(NATURAL_ROOT.length)];
        const rootNote = new Note(rootNoteName + "1");
        const pattern = ["natural"];
        if (accidental.includes("sharp") && !["E", "B"].includes(rootNote.name)) pattern.push("sharp");
        if (accidental.includes("flat") && !["C", "F"].includes(rootNote.name)) pattern.push("flat");

        switch (pattern[getRandomNumber(pattern.length)]) {
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
    while (beforeRootNote?.identifier === result.identifier) {
        result = shuffle();
    }
    beforeRootNoteHandler(result);

    return result;
}



export const createRandomChord = (rootNote?: Note): Chord => {
    const tmpRootNote = rootNote ?? getRandomRoot();
    const chordSettings = chordSettingsState.enableChord;
    const chordSettingKey = chordSettings[getRandomNumber(chordSettings.length)];
    const chordConfig = NOTES_IN_CHORD_CONFIG.find(e => e.key === chordSettingKey);
    if(!chordConfig) throw new Error(`not found chord config.`);
    const notesInChord = convertToFlatNotes(createNotesInChord(tmpRootNote, chordConfig?.notesInChord));
    const rootNoteName = tmpRootNote.name + (tmpRootNote.accidental ?? "");
    
    return {
        chordName: rootNoteName + CHORD_SETTINGS_INIT.find(e => e.key === chordSettingKey)?.chordAttachName,
        notesInChordName: notesInChord.map(e => e.name + (e.accidental ?? "")),
        notesInChordDegree: chordConfig?.notesInChord
    }
}

export const getRandomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const convertToFlatNotes = (notes: Array<Note>) => {
    const accidental = accidentalState.selectedAccidental;
    if(accidental !== "flat") return notes;

    return notes.map(e => {
        if(e.accidental === "#") {
            e = new Note(e.getOffsetNumber(0, 1))
            e.accidental = "b"
        }
        return e
    })
}

export const createNotesInChord = (rootNote: Note, chordConfig: Array<number>) => {
    const result: Array<Note> = [];
    chordConfig.forEach(e => {
        result.push(new Note(rootNote.getOffsetNumber(0, e - 1)));
    })
    return result;
}

export const pcKeyToNote = (key: string) => {
    const pcKey = Constants.PC_KEY;
    const pcKeyOffSet = pcKeyOffSetState.pcKeyOffSet + 37;

    let index = pcKey[0].findIndex((value) => value == key);
    if(index >= 0) {
        let tmpNote = new Note(index);
        return new Note(tmpNote.getOffsetNumber(4))
    }

    index = pcKey[1].findIndex((value) => value === key);
    if(index >= 0) {
        let tmpNote = new Note(index);
        return new Note(tmpNote.getOffsetNumber(5));
    }
    
    return ;
}
