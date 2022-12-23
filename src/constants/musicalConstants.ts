import { ChordSettings } from "./type"

export class MusicalConstants {
    static readonly CHORD_SETTINGS_INIT: ChordSettings = {
        _sharp: {isTrue: false, chordType: "#"},
        _flat: {isTrue: false, chordType: "b"},
        _power: {isTrue: false, chordType: "5"},
        _M: {isTrue: true, chordType: "M"},
        _m: {isTrue: false, chordType: "m"},
        _dim: {isTrue: false, chordType: "dim"},
        _aug: {isTrue: false, chordType: "aug"},
        _sus2: {isTrue: false, chordType: "sus2"},
        _sus4: {isTrue: false, chordType: "sus4"},
        _6: {isTrue: false, chordType: "6"},
        _m6: {isTrue: false, chordType: "m6"},
        _7: {isTrue: false, chordType: "7"},
        _M7: {isTrue: false, chordType: "M7"},
        _m7: {isTrue: false, chordType: "m7"},
        _mM7: {isTrue: false, chordType: "mM7"},
        _aug7: {isTrue: false, chordType: "aug7"},
        _dim7: {isTrue: false, chordType: "dim7"},
        _7b5: {isTrue: false, chordType: "7(b5)"},
        _7shp5: {isTrue: false, chordType: "7(#5)"},
        _m7b5: {isTrue: false, chordType: "m7(b5)"},
        _m7shp5: {isTrue: false, chordType: "m7(#5)"},
    }

    static readonly CHORD = {
        _power: [1, 5],
        _M: [1, 5, 8],
        _m: [1, 4, 8],
        _dim: [1, 4, 7],
        _aug: [1, 5, 9],
        _sus2: [1, 3, 8],
        _sus4: [1, 6, 8],
        _6: [1, 5, 8, 10],
        _m6: [1, 4, 8, 10],
        _7: [1, 5, 8, 11],
        _M7: [1, 5, 8, 12],
        _m7: [1, 4, 8, 11],
        _mM7: [1, 4, 8, 12],
        _aug7: [1, 5, 9, 11],
        _dim7: [1, 4, 7, 10],
        _7b5: [1, 5, 7, 11],
        _7shp5: [1, 5, 9, 11],
        _m7b5: [1, 4, 7, 11],
        _m7shp5: [1, 4, 9, 11],
    }

    static readonly midiHalfNoteNumber = [
        1, 3, 6, 8, 10, 13, 15, 18, 20, 22, 25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 
        51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87, 90, 92, 94, 97, 
        99, 102, 104, 106, 109, 111, 114, 116, 118, 121, 123, 126
    ];
}