import { WebMidi, Note, Input } from 'webmidi/dist/esm/webmidi.esm';
import * as Tone from 'tone';
import { proxy } from 'valtio';
import { ChordKeyName } from '../constants/type';
import { Constants } from '../constants/constants';

class GameController {
  chordSettings = Constants.CHORD_SETTINGS_INIT;

  selectedChord: ChordKeyName = 'major';

  isPlay = false;

  currentBeat = 0;

  correctNote: Array<Note | undefined> = [];

  incorrectNote: Array<Note | undefined> = [];

  constructor() { }

  setSelectedChord(key: ChordKeyName) {
    this.selectedChord = key;
  }

  metronomeToggle() {
    this.isPlay = !this.isPlay;
  }
}

export const gameControllerState: GameController = proxy(new GameController());
