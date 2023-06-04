import { WebMidi, Note, Input } from 'webmidi'
import * as Tone from 'tone'
import { proxy } from 'valtio'
import { Accidental, Chord, ChordType, ChordSettingElement, ChordSettings } from '../constants/type'
import { Constants } from '../constants/constants'
import { NoteController } from './NoteController'
import ChordCalculator from '../util/ChordCalculator'
import { gameState } from './GameState'
import { GameContoller } from './GameController'

class PcKeyController {
  static noteOnTrigger(key: string) {
    const note = ChordCalculator.pcKeyToNote(key)
    if (!note) throw new Error('faild pc key to note.')
    NoteController.noteOn(note)
  }

  static noteOffTrigger(key: string) {
    const note = ChordCalculator.pcKeyToNote(key)
    if (!note) throw new Error('faild pc key to note.')
    NoteController.noteOff(note)
  }

  static toggleTransportTrigger() {
    GameContoller.metronomeToggle()
  }
}

let pressingKey: Array<string> = []
export const keyDownHanler = (event: KeyboardEvent) => {
  if (pressingKey.includes(event.key)) return
  if (event.key === ' ') {
    PcKeyController.toggleTransportTrigger()
  } else if (Constants.PC_KEY.flatMap((e) => e).includes(event.key)) {
    PcKeyController.noteOnTrigger(event.key)
  }
  pressingKey.push(event.key)
}
export const keyUpHanler = (event: KeyboardEvent) => {
  if (Constants.PC_KEY.flatMap((e) => e).includes(event.key)) {
    PcKeyController.noteOffTrigger(event.key)
  }
  pressingKey = pressingKey.filter((e) => e !== event.key)
}
