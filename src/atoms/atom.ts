import { atom } from 'jotai'
import { ChordSettings, PcKeyToMidiMap } from '../constants/type';
import { MusicalConstants } from '../constants/musicalConstants'
import { Note } from "../../node_modules/webmidi/dist/esm/webmidi.esm";
import { InitialValues } from '../constants/constants';

export const playStateAtom = atom("stoped");
export const accidentalAtom = atom('sharp');
export const chordSettingsAtom = atom<ChordSettings>(MusicalConstants.CHORD_SETTINGS_INIT);
export const midiNoteOnKeyAtom = atom<Array<Note>>([]);
export const pcKeyToMidiMapAtom = atom<Array<PcKeyToMidiMap>>([]);
export const pcKeyToMidiOffsetAtom = atom(InitialValues.PC_EY_OFFSET);
export const pcKeyPressAtom = atom<Array<string>>([]);