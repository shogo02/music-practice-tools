import { useAtom } from "jotai";
import * as Tone from 'tone';
import { flatNotationAtom, isSingleNoteFlatAtom, isSingleNoteSharpAtom, playStateAtom, sharpNotationAtom } from '../atoms/atom'
import PadButton from "./Parts.tsx/PadButton";

const Pad = () => {
    const [playState, setPlayState] = useAtom(playStateAtom);
    const [isSingleNoteSharp, setIsSingleNoteSharp] = useAtom(isSingleNoteSharpAtom);
    const [isSingleNoteFlat, setIsSingleNoteFlat] = useAtom(isSingleNoteFlatAtom);
    const [sharpNotation, setSharpNotation] = useAtom(sharpNotationAtom);
    const [flatNotation, setFlatNotation] = useAtom(flatNotationAtom);

    const transportState = Tone.Transport.state.toString();
    const onClickPlay = () => {
        Tone.Transport.toggle();
        setPlayState(Tone.Transport.state.toString());
    }
    const playButtonText = transportState == "started" ? "■" : "▶";

    const onClickSingleNoteSharp = () => { 
        isSingleNoteSharp ? setIsSingleNoteSharp(false) : setIsSingleNoteSharp(true) 
    }
    const onClickSingleNoteFlat = () => {
        isSingleNoteFlat ? setIsSingleNoteFlat(false) : setIsSingleNoteFlat(true)
    }
    const onClickSharpNotation = () => { 
        sharpNotation ? setSharpNotation(false) : setSharpNotation(true) 
    }
    const onClickFlatNotation = () => {
        flatNotation ? setFlatNotation(false) : setFlatNotation(true)
    }

    return (
        <div className="mt-20 mx-6">
            <div className="grid grid-cols-3 gap-5">
                <div onClick={onClickPlay} className="col-span-3">
                    <PadButton text={playButtonText} />
                </div>
                <div className="col-span-1"><PadButton text={"R"} /></div>
                <div className="col-span-1">
                    <PadButton text={'&#9839;'} onClick={onClickSingleNoteSharp} isTrue={isSingleNoteSharp} />
                </div>
                <div className="col-span-1">
                    <PadButton text={'&#9837;'} onClick={onClickSingleNoteFlat} isTrue={isSingleNoteFlat} />
                </div>
                <div className="col-span-1">
                    <PadButton text={'&#9839;'} onClick={onClickSharpNotation} isTrue={sharpNotation} />
                </div>
                <div className="col-span-1">
                    <PadButton text={'&#9837;'} onClick={onClickFlatNotation} isTrue={flatNotation} />
                </div>
                <div className="col-span-1"><PadButton text={"5"} /></div>
                <div className="col-span-1"><PadButton text={"M"} /></div>
                <div className="col-span-1"><PadButton text={"m"} /></div>
                <div className="col-span-1"><PadButton text={"dim"} /></div>
                <div className="col-span-1"><PadButton text={"aug"} /></div>
                <div className="col-span-1"><PadButton text={"sus4"} /></div>
                <div className="col-span-1"><PadButton text={"M7"} /></div>
                <div className="col-span-1"><PadButton text={"7"} /></div>
                <div className="col-span-1"><PadButton text={"mM7"} /></div>
                <div className="col-span-1"><PadButton text={"m7"} /></div>
                {/* <div className="col-span-1"><PadButton text={"m7(-5)"} /></div> */}
            </div>
        </div>
    )
}

export default Pad