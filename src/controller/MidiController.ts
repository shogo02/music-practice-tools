import { proxy } from 'valtio'
import { WebMidi, Input } from 'webmidi'
import { NoteController } from './NoteController'

type MidiDeviceState = {
  devices: Array<Input>
  selectedDevice: Input | undefined
}

export const midiDeviceState: MidiDeviceState = proxy({
  devices: [],
  selectedDevice: undefined,
})

export class MidiController {
  static async initialize() {
    await WebMidi.enable()
      .then((value) => {
        midiDeviceState.devices = value.inputs
        if (midiDeviceState.devices.length) {
          MidiController.selectDevice(midiDeviceState.devices[0].name, NoteController.noteOn, NoteController.noteOff)
        }
      })
      .catch((err) => {})
  }

  static selectDevice(deviceName: string, noteOnListner: () => void, noteOffListner: () => void) {
    midiDeviceState.selectedDevice?.removeListener()
    midiDeviceState.selectedDevice = WebMidi.getInputByName(deviceName)
    midiDeviceState.selectedDevice?.addListener('noteon', noteOnListner)
    midiDeviceState.selectedDevice?.addListener('noteoff', noteOffListner)
  }
}
