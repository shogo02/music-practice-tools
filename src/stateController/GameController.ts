import { GamePlayMode } from "../constants/type";
import { proxy } from 'valtio'
import { WebMidi, Note, Input } from "../../node_modules/webmidi/dist/esm/webmidi.esm";
import { MidiDeviceController } from "../class/MidiDevices";
import * as Tone from 'tone';
import { GameSettings } from "../class/GameSettings";

export class GameController {
    correctNote: Array<Note | undefined> = [];
    incorrectNote: Array<Note | undefined> = [];
    isPlay = false;
    gameSetting = new GameSettings();
    mdController = new MidiDeviceController();

    constructor() {
        this.midiInit();
    }

    async midiInit() {
        const devices = await this.mdController.initialize();
        this.mdController.selectDevice(devices[0].name, this.noteOn, this.noteOff)
    }

    judgeNote(note: Note) {
        const state = proxy<{ todoList: string[] }>({
            todoList: [],
        });
    }

    toggleTransport() {
        Tone.Transport.toggle();
    }

    noteOn() {
        console.log("noteOn")
    }

    noteOff() {
        console.log("noteOff")
    }

    keyDownHandler(event: KeyboardEvent) {
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
    keyUpHandler(event: KeyboardEvent) {
        // if (Constants.PC_KEY.flatMap(e => e).includes(event.key)) {
        //     const note = pcKeyToNote(event.key);
        //     if (!note) throw new Error("faild pc key to note.")
        //     noteOff(note);
        // }
        // pressingKey = pressingKey.filter(e => e !== event.key);
    }
}

export const gameControllerState: GameController = proxy(new GameController())
