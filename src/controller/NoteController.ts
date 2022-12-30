import { WebMidi, Note, Input, NoteMessageEvent } from 'webmidi'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Constants } from '../constants/constants'
import ChordCalculator from '../util/ChordCalculator'
import { gameState } from './GameState'

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

  static noteOn(note: Note) {
    const tmpNote = note
    tmpNote.octave += gameState.keyBoardOctobe
    NoteController.keyboardSynth.triggerRelease(tmpNote.identifier)
    NoteController.keyboardSynth.triggerAttack(tmpNote.identifier)
    gameState.playingNotes.push(tmpNote)

    const correctNoteIndex = gameState.currentChord.notesInChord.findIndex(
      (e) => e.name + (e.accidental ?? '') === note.name + (note.accidental ?? '')
    )
    if (correctNoteIndex > -1) gameState.correctNotes[correctNoteIndex] = true
  }

  static noteOff(note: Note) {
    const tmpNote = note
    tmpNote.octave += gameState.keyBoardOctobe
    NoteController.keyboardSynth.triggerRelease(tmpNote.identifier)
    gameState.playingNotes = gameState.playingNotes.filter((e) => e.identifier !== tmpNote.identifier)
  }

  static toggleTransport() {
    Tone.Transport.toggle()
  }

  static clearKeyboradReleaseALl() {
    NoteController.keyboardSynth.releaseAll()
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
