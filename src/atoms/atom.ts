import { atom } from 'jotai'

export const playStateAtom = atom("stoped");
export const isSingleNoteSharpAtom = atom(false);
export const isSingleNoteFlatAtom = atom(false);
export const flatOrSharpNotaitionAtom = atom('sharp');
export const noteSettingsAtom = atom({
    isMajor3rd: false,
    isMinor3rd: false,
    isSus4: false,
    is5th: false,
    isAug: false,
    isDim: false,
    isMajor7th: false,
    isMinor7th: false,
    is6th: false,
});