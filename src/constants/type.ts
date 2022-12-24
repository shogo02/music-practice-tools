
export type ChordSettingElement = {
    isTrue: boolean,
    chordType: string,
}

export type ChordSettings = {
    _sharp: ChordSettingElement;
    _flat: ChordSettingElement;
    _power: ChordSettingElement;
    _M: ChordSettingElement;
    _m: ChordSettingElement;
    _dim: ChordSettingElement;
    _aug: ChordSettingElement;
    _sus2: ChordSettingElement;
    _sus4: ChordSettingElement;
    _6: ChordSettingElement;
    _m6: ChordSettingElement;
    _7: ChordSettingElement;
    _M7: ChordSettingElement;
    _m7: ChordSettingElement;
    _mM7: ChordSettingElement;
    _aug7: ChordSettingElement;
    _dim7: ChordSettingElement;
    _7b5: ChordSettingElement;
    _7shp5: ChordSettingElement;
    _m7b5: ChordSettingElement;
    _m7shp5: ChordSettingElement;
}

export type NoteConfig = {
    noteId: number;
    noteName: string;
}
export type RootNoteConfig = NoteConfig & {
    isAbleToRootSharp?: boolean;
    isAbleToRootFlat?: boolean;
}

export type Chord = {
    chordName: string;
    notesInChordName: Array<string>;
    notesInChordDegree: Array<number>;
}

export type PcKeyToMidiMap = {
    midiNumber: number,
    pcKey: string
}