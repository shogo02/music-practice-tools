import { WebMidi, Note, Input } from 'webmidi/dist/esm/webmidi.esm'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Constants } from '../constants/constants'

export class NoteController {
  static metronomeSynth: Tone.Synth<Tone.SynthOptions>

  static keyboardSynth: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>

  static initialize() {
    NoteController.metronomeSynth = new Tone.Synth({
      envelope: { release: 0.4 },
    }).toDestination()

    NoteController.keyboardSynth = new Tone.PolySynth(Tone.Synth, {
      envelope: { attack: 0.01 },
    }).toDestination()
  }

  static noteOn() {
    console.log('noteOn')
  }

  static noteOff() {
    console.log('noteOff')
  }

  static toggleTransport() {
    Tone.Transport.toggle()
  }

  static createMetronomeBeat(draw?: () => void) {
    const part = new Tone.Part((time, value) => {
      NoteController.metronomeSynth.triggerAttackRelease(value.note, '0.1', time, value.velocity)
      if (draw) Tone.Draw.schedule(draw, time)
    }, Constants.METRONOME_PATTERN).start(0)
    part.loop = true
  }

  static getCurrentBeat() {
    return Tone.Transport.position.toString().split(':').map(Number)[1] + 1
  }

  static partReset() {
    Tone.Transport.cancel()
  }
}
