import { proxy } from 'valtio'
import * as Tone from 'tone';
import { subscribe } from 'valtio'
import { Constants, InitialValues } from '../constants/constants';
import { convertToFlatNotes, createRandomChord, pcKeyToNote } from '../util/ChordCalculator';
import { Chord } from '../constants/type';
import { WebMidi, Note } from "../../node_modules/webmidi/dist/esm/webmidi.esm";




// TODO 関数や変数の整理が必要

const metronomeSynth = new Tone.Synth({ envelope: { release: 0.4 } }).toDestination();
const keyboardSynth = new Tone.PolySynth().toDestination();

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

export const displayChordState = proxy<Chord>({ chordName: "X", notesInChordName: ["X"], notesInChordDegree: [0] })
const displayChordHandler = (chord: Chord) => {
    displayChordState.chordName = chord.chordName;
    displayChordState.notesInChordDegree = chord.notesInChordDegree;
    displayChordState.notesInChordName = chord.notesInChordName;
}

export let playNotesState = proxy<{ playNotes: Array<Note> }>({ playNotes: [] });
const addPlayNotesState = (note: Note) => {
    if(playNotesState.playNotes.findIndex(e => e.identifier === note.identifier)){
        playNotesState.playNotes.push(note);
    }
}
const removePlayNotesState = (note: Note) => {
    playNotesState.playNotes = playNotesState.playNotes.filter(e => e.identifier !== note.identifier);
}


export const pcKeyOffSetState = proxy({ pcKeyOffSet: 0 });


let pressingKey: Array<string> = [];
export const keyDownHanler = (event: KeyboardEvent) => {
    console.log(event.key)
    if (Constants.PC_KEY.flatMap(e => e).includes(event.key) && !pressingKey.includes(event.key)) {
        const note = pcKeyToNote(event.key);
        if(!note) throw new Error("faild pc key to note.")

        
        const tmpNote = convertToFlatNotes([note])[0];
        keyboardSynth.triggerAttack(tmpNote.identifier);
        addPlayNotesState(tmpNote);

        pressingKey.push(event.key);
    }
}
export const keyUpHanler = (event: KeyboardEvent) => {
    if (Constants.PC_KEY.flatMap(e => e).includes(event.key)) {
        const note = pcKeyToNote(event.key);
        if(!note) throw new Error("faild pc key to note.")
        
        const tmpNote = convertToFlatNotes([note])[0];

        keyboardSynth.triggerRelease(tmpNote.identifier)
        removePlayNotesState(tmpNote);

        pressingKey = pressingKey.filter(e => e !== event.key);
    }
}



const mitiInit = () => {
    // const myInput = WebMidi.getInputByName("MKII V49");
    WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));
    // const myInput = WebMidi.getInputByName("Digital Piano");
    const myInput = WebMidi.getInputByName("Digital Keyboard");

    myInput?.addListener("noteon", (e) => {
        const tmpNote = convertToFlatNotes([e.note])[0];
        keyboardSynth.triggerAttack(tmpNote.identifier);
        addPlayNotesState(tmpNote);
    });
    myInput?.addListener("noteoff", (e) => {
        const tmpNote = convertToFlatNotes([e.note])[0];
        console.log(tmpNote.identifier);
        keyboardSynth.triggerRelease(tmpNote.identifier)
        removePlayNotesState(tmpNote);
    });
}

WebMidi
    .enable()
    .then(mitiInit)
    .catch(err => alert(err));