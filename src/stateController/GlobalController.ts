import { proxy } from 'valtio'
import * as Tone from 'tone';
import { subscribe } from 'valtio'
import { Constants, InitialValues } from '../constants/constants';
import { convertToFlatNotes, createRandomChord, pcKeyToNote } from '../util/ChordCalculator';
import { Chord, CorrectChord } from '../constants/type';
import { WebMidi, Note, Input } from "../../node_modules/webmidi/dist/esm/webmidi.esm";




// TODO 関数や変数の整理が必要

const metronomeSynth = new Tone.Synth({ envelope: { release: 0.4 } }).toDestination();
const keyboardSynth = new Tone.PolySynth(Tone.Synth, { envelope: { attack: 0.01 } }).toDestination();

const part = new Tone.Part(((time, value) => {
    metronomeSynth.triggerAttackRelease(value.note, "0.1", time, value.velocity);
    Tone.Draw.schedule(draw, time);
}), InitialValues.METRONOME_PATTERN).start(0);
part.loop = true;

const draw = () => {
    const position = Tone.Transport.position.toString().split(":").map(Number);
    beatPositionState.value = position[1] + 1;

    if (beatPositionState.value === 1) {
        const chord = createRandomChord();
        displayChordHandler(chord);
    }
}
export const beatPositionState = proxy({ value: 0 });



export const isPlayState = proxy({ isPlatMetronome: false })
export const toggleTransport = () => {
    isPlayState.isPlatMetronome = !isPlayState.isPlatMetronome;
}
subscribe(isPlayState, () => {
    beatPositionState.value = 0;
    Tone.Transport.toggle();
})

export const chordSettingsState = proxy({ enableChord: ["major"] })
export const chordSettingsHanler = (key: string) => {
    if (chordSettingsState.enableChord.includes(key)) {
        chordSettingsState.enableChord = chordSettingsState.enableChord.filter(e => e !== key);
    } else {
        chordSettingsState.enableChord.push(key);
    }
    if (!chordSettingsState.enableChord.length) chordSettingsState.enableChord = ["major"]
}

export const accidentalState = proxy({ selectedAccidental: "natural" });
export const accidentalHandler = (key: string) => {
    accidentalState.selectedAccidental = key;
}

export const beforeRootNoteState = proxy<{ beforeRootNote: Note | null }>({ beforeRootNote: null })
export const beforeRootNoteHandler = (note: Note) => {
    beforeRootNoteState.beforeRootNote = note;
}

export const displayChordState = proxy<CorrectChord>({ chordName: "X", notesInChordName: ["X"], notesInChordDegree: [0], correctNotesInChord: [] })
const displayChordHandler = (chord: Chord) => {
    displayChordState.chordName = chord.chordName;
    displayChordState.notesInChordDegree = chord.notesInChordDegree;
    displayChordState.notesInChordName = chord.notesInChordName;
    displayChordState.correctNotesInChord = new Array(chord.notesInChordName.length);
}

export let playNotesState = proxy<{ playNotes: Array<Note> }>({ playNotes: [] });
const addPlayNotesState = (note: Note) => {
    if (playNotesState.playNotes.findIndex(e => e.identifier === note.identifier) === -1) {
        playNotesState.playNotes.push(note);

        const correctNoteIndex = displayChordState.notesInChordName.indexOf(note.name + (note.accidental ?? ""));
        displayChordState.correctNotesInChord[correctNoteIndex] = note.name + (note.accidental ?? "");
    }
}
const removePlayNotesState = (note: Note) => {
    playNotesState.playNotes = playNotesState.playNotes.filter(e => e.identifier !== note.identifier);
}
const initPlayNoteState = () => {
    playNotesState.playNotes = [];
}


export const noteOctobeState = proxy({ noteOctobe: InitialValues.NOTE_OCTOBE });
export const setNoteOctobe = (noteOctobe: number) => {
    noteOctobeState.noteOctobe = noteOctobe;
    keyboardSynth.releaseAll();
    initPlayNoteState();
}

export const pcKeyOffSetState = proxy({ pcKeyOffSet: 0 });

let myInput: Input | undefined;
export const midiDevicesState = proxy({ devices: [""] })
const initMidiDeviceState = () => {
    midiDevicesState.devices = WebMidi.inputs.map((e) => e.name );
    selectedMidiDeviceHandler(midiDevicesState.devices[0]);
}

export const selectedMidiDevice = proxy({ selectedMidiDevice: "" });
export const selectedMidiDeviceHandler = (deviceName: string) => {
    myInput?.removeListener();
    myInput = WebMidi.getInputByName(deviceName);
    selectedMidiDevice.selectedMidiDevice = deviceName;
    myInput?.addListener("noteon", (e) => {
        noteOn(e.note);
    });
    myInput?.addListener("noteoff", (e) => {
        noteOff(e.note);
    });
}

let pressingKey: Array<string> = [];
export const keyDownHanler = (event: KeyboardEvent) => {
    if (pressingKey.includes(event.key)) return;
    if (Constants.PC_KEY.flatMap(e => e).includes(event.key)) {
        const note = pcKeyToNote(event.key);
        if (!note) throw new Error("faild pc key to note.")
        noteOn(note);
    }

    if (event.key === " ") {
        toggleTransport();
    }

    pressingKey.push(event.key);
}
export const keyUpHanler = (event: KeyboardEvent) => {
    if (Constants.PC_KEY.flatMap(e => e).includes(event.key)) {
        const note = pcKeyToNote(event.key);
        if (!note) throw new Error("faild pc key to note.")
        noteOff(note);
    }
    pressingKey = pressingKey.filter(e => e !== event.key);
}

const noteOn = (note: Note) => {
    const tmpNote = convertToFlatNotes([note])[0];
    tmpNote.octave += noteOctobeState.noteOctobe;
    keyboardSynth.triggerRelease(tmpNote.identifier)
    keyboardSynth.triggerAttack(tmpNote.identifier);
    addPlayNotesState(tmpNote);
}

const noteOff = (note: Note) => {
    const tmpNote = convertToFlatNotes([note])[0];
    tmpNote.octave += noteOctobeState.noteOctobe;
    keyboardSynth.triggerRelease(tmpNote.identifier)
    removePlayNotesState(tmpNote);
}



const midiInit = () => {
    initMidiDeviceState();
}

WebMidi
    .enable()
    .then(midiInit)
    .catch(err => alert(err));