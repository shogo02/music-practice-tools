import { useAtom } from "jotai";
import { useState } from "react";
import * as Tone from 'tone';
import { isSingleNoteFlatAtom, isSingleNoteSharpAtom, noteSettingsAtom, playStateAtom } from '../atoms/atom'
import PadButton from "./Parts.tsx/PadButton";

const Pad = () => {
    const [playState, setPlayState] = useAtom(playStateAtom);
    const [isSingleNoteSharp, setIsSingleNoteSharp] = useAtom(isSingleNoteSharpAtom);
    const [isSingleNoteFlat, setIsSingleNoteFlat] = useAtom(isSingleNoteFlatAtom);
    const [noteSettings, setnoteSettings] = useAtom(noteSettingsAtom);

    const onClickPlay = () => {
        Tone.Transport.toggle();
        const transportState = Tone.Transport.state.toString();
        setPlayState(transportState);
    }

    const onClickSingleNoteSharp = () => { setIsSingleNoteSharp(!isSingleNoteSharp) }
    const onClickSingleNoteFlat = () => { setIsSingleNoteFlat(!isSingleNoteFlat) }
    const onClickNoteSetting = (target: string) => {
        if(target === 'major3rd') setnoteSettings({...noteSettings, isMajor3rd: !noteSettings.isMajor3rd})
        if(target === 'minor3rd') setnoteSettings({...noteSettings, isMinor3rd: !noteSettings.isMinor3rd})
        if(target === 'sus4') setnoteSettings({...noteSettings, isSus4: !noteSettings.isSus4})
        if(target === '5th') setnoteSettings({...noteSettings, is5th: !noteSettings.is5th})
        if(target === 'aug') setnoteSettings({...noteSettings, isAug: !noteSettings.isAug})
        if(target === 'dim') setnoteSettings({...noteSettings, isDim: !noteSettings.isDim})
        if(target === 'major7th') setnoteSettings({...noteSettings, isMajor7th: !noteSettings.isMajor7th})
        if(target === 'minor7th') setnoteSettings({...noteSettings, isMinor7th: !noteSettings.isMinor7th})
    }

    return (
        <div className="mt-20 mx-6">
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3">
                    <PadButton text={playState === "started" ? "■" : "▶"} onClick={onClickPlay} isTrue={playState === "started" ? true : false} />
                </div>
                <div className="col-span-1">
                    <PadButton text={'#'} onClick={onClickSingleNoteSharp} isTrue={isSingleNoteSharp} />
                </div>
                <div className="col-span-1">
                    <PadButton text={'b'} onClick={onClickSingleNoteFlat} isTrue={isSingleNoteFlat} />
                </div>
                <div className="col-span-1"><PadButton text={""} /></div>
                <div className="col-span-1">
                    <PadButton text={"M"} onClick={() => onClickNoteSetting('major3rd')} isTrue={noteSettings.isMajor3rd} />
                </div>
                <div className="col-span-1">
                    <PadButton text={"m"}  onClick={() => onClickNoteSetting('minor3rd')} isTrue={noteSettings.isMinor3rd} />
                </div>
                <div className="col-span-1">
                    <PadButton text={"sus4"}  onClick={() => onClickNoteSetting('sus4')} isTrue={noteSettings.isSus4} />
                </div>
                <div className="col-span-1">
                    <PadButton text={"5"}  onClick={() => onClickNoteSetting('5th')} isTrue={noteSettings.is5th} />
                </div>
                <div className="col-span-1">
                    <PadButton text={"aug"}  onClick={() => onClickNoteSetting('aug')} isTrue={noteSettings.isAug} />
                </div>
                <div className="col-span-1">
                    <PadButton text={"dim"}  onClick={() => onClickNoteSetting('dim')} isTrue={noteSettings.isDim} />
                </div>
                <div className="col-span-1">
                    <PadButton text={"M7"}  onClick={() => onClickNoteSetting('major7th')} isTrue={noteSettings.isMajor7th} />
                </div>
                <div className="col-span-1">
                    <PadButton text={"7"}  onClick={() => onClickNoteSetting('minor7th')} isTrue={noteSettings.isMinor7th} />
                </div>
                {/* <div className="col-span-1"><PadButton text={"m7(-5)"} /></div> */}
            </div>
        </div>
    )
}

export default Pad