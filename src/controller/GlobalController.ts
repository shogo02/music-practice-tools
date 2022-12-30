import { proxy } from 'valtio';
import { WebMidi, Note, Input } from 'webmidi/dist/esm/webmidi.esm';
import * as Tone from 'tone';
import { midiControllerState } from './MidiController';
import { noteControllerState } from './NoteController';
import { gameControllerState } from './GameController';
// import { gameControllerState } from "./GameController";

// const gc = gameControllerState;

const mc = midiControllerState;
const nc = noteControllerState;
const gc = gameControllerState;
export class GlobalController {
    constructor() {
        GlobalController.midiInit();
        GlobalController.gameInit();
    }

    private static async midiInit() {
        const devices = await mc.initialize();
        if (devices.length) {
            // mc.selectDevice(devices[0].name, nc.noteOn, nc.noteOff);
        }
    }

    private static gameInit() {

    }

    static metronomeToggle() {
        // nc.toggleTransport();
        gc.metronomeToggle();
    }

    static draw() {
        // const position = nc.getCurrentBeat();
        // gc.currentBeat = position;
    }

    static keyDownHandler(event: KeyboardEvent) {
        // if (pressingKey.includes(event.key)) return;
        // if (Constants.PC_KEY.flatMap(e => e).includes(event.key)) {
        //     const note = pcKeyToNote(event.key);
        //     if (!note) throw new Error("faild pc key to note.")
        //     noteOn(note);
        // }

        // if (event.key === " ") {
        //     toggleTransport();
        // }

        // pressingKey.push(event.key);
    }

    static keyUpHandler(event: KeyboardEvent) {
        // if (Constants.PC_KEY.flatMap(e => e).includes(event.key)) {
        //     const note = pcKeyToNote(event.key);
        //     if (!note) throw new Error("faild pc key to note.")
        //     noteOff(note);
        // }
        // pressingKey = pressingKey.filter(e => e !== event.key);
    }
}