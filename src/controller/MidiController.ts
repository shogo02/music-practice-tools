import { proxy } from 'valtio';
import { WebMidi, Input } from "webmidi";

class MidiController {
  private devices: Array<Input> = [];

  private selectedDevice: Input | undefined;

  constructor() { }

  async initialize() {
    await WebMidi.enable()
      .then((value) => { this.devices = value.inputs })
      .catch((err) => alert(err));
    return this.devices;
  }

  selectDevice(deviceName: string, noteOnListner: () => void, noteOffListner: () => void) {
    this.selectedDevice?.removeListener();
    this.selectedDevice = WebMidi.getInputByName(deviceName);
    this.selectedDevice?.addListener('noteon', noteOnListner);
    this.selectedDevice?.addListener('noteoff', noteOffListner);
  }
}

export const midiControllerState: MidiController = proxy(new MidiController());
