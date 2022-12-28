import { GamePlayMode } from "../constants/type";
import { proxy } from 'valtio'
import { WebMidi, Note, Input } from "webmidi/dist/esm/webmidi.esm";
import { MidiController } from "./MidiController";
import * as Tone from 'tone';
import { GameController } from "./GameController";
import { NoteController } from "./NoteController";
// import { gameControllerState } from "./GameController";

// const gc = gameControllerState;

class GlobalController {
    nc = new NoteController();
    gc = new GameController();
    mc = new MidiController();

    isPlay = false;
    
    constructor(
    ) {
        this.midiInit();
        this.gameInit();
    }
    
    async midiInit() {
        const devices = await this.mc.initialize();
        if(devices.length) {
            this.mc.selectDevice(devices[0].name, this.nc.noteOn, this.nc.noteOff);
        }
    }
    
    gameInit() {
        
    }
    
    metronomeToggle() {
        this.isPlay = !this.isPlay;
        // this.nc.toggleTransport();
        // this.gc.metronomeToggle();
    }

    private draw() {
        const position = this.nc.getCurrentBeat();
        this.gc.currentBeat = position;
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

export const globalController: GlobalController = proxy(new GlobalController())
