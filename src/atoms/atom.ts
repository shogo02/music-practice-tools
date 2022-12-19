import { atom } from 'jotai'
import { NoteSettings } from '../util/chordCalculator';

export const playStateAtom = atom("stoped");
export const isSingleNoteSharpAtom = atom(false);
export const isSingleNoteFlatAtom = atom(false);
export const flatOrSharpNotaitionAtom = atom('sharp');
export const noteSettingsAtom = atom<NoteSettings>({
    isMajor3rd: false,
    isMinor3rd: false,
    isSus4: false,
    is5th: false,
    isAug5th: false,
    isDim5th: false,
    isMajor7th: false,
    isMinor7th: false,
    is6th: false,
});