import { WebMidi, Note, Input } from "../../node_modules/webmidi/dist/esm/webmidi.esm";

export class MidiDeviceController {
    private devices: Array<Input> = [];
    private selectedDevice: Input | undefined;

    constructor(){}

    async initialize() {
        await WebMidi.enable()
            .then(() => {
                this.devices = WebMidi.inputs;
            })
            .catch(err => alert(err));
        return this.devices
    }   

    selectDevice(deviceName: string, noteOnListner: ()=>void, noteOffListner: ()=>void) {
        this.selectedDevice?.removeListener();
        this.selectedDevice = WebMidi.getInputByName(deviceName);
        this.selectedDevice?.addListener("noteon", noteOnListner);
        this.selectedDevice?.addListener("noteoff", noteOffListner);
    }
}