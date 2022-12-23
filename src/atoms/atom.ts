import { atom } from 'jotai'
import { ChordSettings } from '../constants/type';
import { MusicalConstants } from '../constants/musicalConstants'
import { Note } from "../../node_modules/webmidi/dist/esm/webmidi.esm";

export const playStateAtom = atom("stoped");
export const accidentalAtom = atom('sharp');
export const chordSettingsAtom = atom<ChordSettings>(MusicalConstants.CHORD_SETTINGS_INIT);
export const midiNoteOnKeyAtom = atom<Array<Note>>([]);