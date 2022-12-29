import { WebMidi, Note, Input } from "webmidi/dist/esm/webmidi.esm";
import * as Tone from 'tone';
import { InitialValues } from "../constants/constants";
import { proxy } from 'valtio'
class NoteController {
    constructor(
        public metronomeSynth = new Tone.Synth({ envelope: { release: 0.4 } }).toDestination(),
        public keyboardSynth = new Tone.PolySynth(Tone.Synth, { envelope: { attack: 0.01 } }).toDestination()
    ) { }

    noteOn() {
        console.log("noteOn")
    }

    noteOff() {
        console.log("noteOff")
    }

    toggleTransport() {
        // Tone.Transport.toggle();
    }

    createMetronomeBeat(draw?: () => void) {
        const part = new Tone.Part(((time, value) => {
            this.metronomeSynth.triggerAttackRelease(value.note, "0.1", time, value.velocity);
            if (draw) Tone.Draw.schedule(draw, time);
        }), InitialValues.METRONOME_PATTERN).start(0);
        part.loop = true;
    }

    getCurrentBeat() {
        return Tone.Transport.position.toString().split(":").map(Number)[1] + 1;
    }
}

export const noteControllerState: NoteController = proxy(new NoteController())
