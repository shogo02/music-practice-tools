import { ChordSettings, NotesInChordConfig } from "./type";

export class InitialValues {
    static readonly BPM = 120;
    static readonly VOLUME = -10;
    static readonly PC_EY_OFFSET = 36;
    static readonly KEYBOARD_OFFSET = 36;
    static readonly METRONOME_PATTERN = [
        { time: 0, note: "C6", velocity: 1 },
        { time: "0:1", note: "C5", velocity: 1 },
        { time: "0:2", note: "C5", velocity: 1 },
        { time: "0:3", note: "C5", velocity: 1 }
    ]
}

export class Constants {
    static readonly MASTER_VOLUME = {
        min: -60,
        max: 0,
    }

    static readonly BPM = {
        min: 30,
        max: 360,
    }

    static readonly PC_KEY = [
        ["z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m", ",", "l", ".", ";", "/", "_", "]"],
        ["q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u", "i", "9", "o", "0", "p", "@", "^", "[", "¥"]

        // "a", "z", "s", "x", "d", "c", "f", "v", "g", "b", "h", "n", "j", "m", "k", ",", "l", ".", ";", "/", ":", "_", "]",
        // "1", "q", "2", "w", "3", "e", "4", "r", "5", "t", "6", "y", "7", "u", "8", "i", "9", "o", "0", "p", "-", "@", "^",
    ];

    static readonly CHORD_SETTINGS_INIT: ChordSettings = [
        { key: "power", buttonDisplayName: "5", chordAttachName: "5" },
        { key: "major", buttonDisplayName: "M", chordAttachName: "" },
        { key: "minor", buttonDisplayName: "m", chordAttachName: "m" },
        { key: "dim", buttonDisplayName: "dim", chordAttachName: "dim" },
        { key: "aug", buttonDisplayName: "aug", chordAttachName: "aug" },
        { key: "sus2", buttonDisplayName: "sus2", chordAttachName: "sus2" },
        { key: "sus4", buttonDisplayName: "sus4", chordAttachName: "sus4" },
        { key: "6", buttonDisplayName: "6", chordAttachName: "6" },
        { key: "m6", buttonDisplayName: "m6", chordAttachName: "m6" },
        { key: "7", buttonDisplayName: "7", chordAttachName: "7" },
        { key: "M7", buttonDisplayName: "M7", chordAttachName: "M7" },
        { key: "m7", buttonDisplayName: "m7", chordAttachName: "m7" },
        { key: "aug7", buttonDisplayName: "aug7", chordAttachName: "aug7" },
        { key: "dim7", buttonDisplayName: "dim7", chordAttachName: "dim7" },
        { key: "7b5", buttonDisplayName: "7(b5)", chordAttachName: "7(b5)" },
        { key: "7shp5", buttonDisplayName: "7(#5)", chordAttachName: "7(#5)" },
        { key: "m7b5", buttonDisplayName: "m7(b5)", chordAttachName: "m7(b5)" },
        { key: "m7shp5", buttonDisplayName: "m7(#5)", chordAttachName: "m7(#5)" },
    ]

    static readonly NOTES_IN_CHORD_CONFIG: NotesInChordConfig = [
        { key: "power", notesInChord: [1, 8] },
        { key: "major", notesInChord: [1, 5, 8] },
        { key: "minor", notesInChord: [1, 4, 8] },
        { key: "dim", notesInChord: [1, 4, 7] },
        { key: "aug", notesInChord: [1, 5, 9] },
        { key: "sus2", notesInChord: [1, 3, 8] },
        { key: "sus4", notesInChord: [1, 6, 8] },
        { key: "6", notesInChord: [1, 5, 8, 10] },
        { key: "m6", notesInChord: [1, 4, 8, 10] },
        { key: "7", notesInChord: [1, 5, 8, 11] },
        { key: "M7", notesInChord: [1, 5, 8, 12] },
        { key: "m7", notesInChord: [1, 4, 8, 11] },
        { key: "aug7", notesInChord: [1, 4, 8, 12] },
        { key: "dim7", notesInChord: [1, 5, 9, 11] },
        { key: "7b5", notesInChord: [1, 5, 7, 11] },
        { key: "7shp5", notesInChord: [1, 5, 9, 11] },
        { key: "m7b5", notesInChord: [1, 4, 7, 11] },
        { key: "m7shp5", notesInChord: [1, 4, 9, 11] },
    ]

    static readonly MIDI_HALF_NOTE_NUMBER = [
        1, 3, 6, 8, 10, 13, 15, 18, 20, 22, 25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 
        51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87, 90, 92, 94, 97, 
        99, 102, 104, 106, 109, 111, 114, 116, 118, 121, 123, 126
    ];

    static readonly NATURAL_ROOT = ["C", "D", "E", "F", "G", "A", "B"];
}