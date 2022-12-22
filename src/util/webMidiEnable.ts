import { WebMidi } from "../../node_modules/webmidi/dist/esm/webmidi.esm";
import * as Tone from 'tone';




export const midiInit = () => {
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}


function onEnabled() {

    // Inputs
    WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));

    // Outputs
    WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));
    
    const synth = new Tone.PolySynth().toDestination();
    const myInput = WebMidi.getInputByName("Digital Piano");
    myInput?.addListener("noteon", (e) => {
        synth.triggerAttack(e.note.identifier)
    });
    myInput?.addListener("noteoff", (e) => {
        synth.triggerRelease(e.note.identifier)
    });
}





