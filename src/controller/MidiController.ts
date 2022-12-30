import { proxy } from 'valtio'
import { WebMidi, Input } from 'webmidi'
import { NoteController } from './NoteController'

type MidiDeviceState = {
  devices: Array<string>
  selectedDevice: string | undefined
}

export const midiDeviceState: MidiDeviceState = proxy({
  devices: [],
  selectedDevice: undefined,
})

export class MidiController {
  static async initialize() {
    await WebMidi.enable()
      .then((value) => {
        midiDeviceState.devices = value.inputs.map((e) => e.name)
      })
      .catch((err) => {})
    if (midiDeviceState.devices.length) {
      MidiController.selectDevice(midiDeviceState.devices[0])
    }
  }

  static selectDevice(deviceName: string) {
    WebMidi.getInputByName(midiDeviceState.selectedDevice ?? '')?.removeListener()
    const midiDevice = WebMidi.getInputByName(deviceName)
    midiDeviceState.selectedDevice = midiDevice?.name
    midiDevice?.addListener('noteon', (e) => NoteController.noteOn(e.note))
    midiDevice?.addListener('noteoff', (e) => NoteController.noteOff(e.note))
  }
}
