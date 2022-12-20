import { atom } from 'jotai'
import { ChordSettings } from '../constants/type';
import { MusicalConstants } from '../constants/musicalConstants'

export const playStateAtom = atom("stoped");
export const flatOrSharpNotaitionAtom = atom('sharp');
export const chordSettingsAtom = atom<ChordSettings>(MusicalConstants.CHORD_SETTINGS_INIT);