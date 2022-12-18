import { useAtom } from "jotai";
import * as Tone from 'tone';
import { isFlatAtom, isSharpAtom, playStateAtom } from '../atoms/atom'
import PadButton from "./Parts.tsx/PadButton";

const Pad = () => {
    const [playState, setPlayState] = useAtom(playStateAtom);
    const [isSharp, setIsSharp] = useAtom(isSharpAtom);
    const [isFlat, setIsFlat] = useAtom(isFlatAtom);

    const transportState = Tone.Transport.state.toString();
    const onClickPlay = () => {
        Tone.Transport.toggle();
        setPlayState(Tone.Transport.state.toString());
    }
    const playButtonText = transportState == "started" ? "■" : "▶";

    const onClickSharp = () => { isSharp ? setIsSharp(false) : setIsSharp(true) }
    const onClickFlat = () => { isFlat ? setIsFlat(false) : setIsFlat(true) }

    return (
        <div className="mt-20 mx-6">
            <div className="grid grid-cols-3 gap-5">
                <div onClick={onClickPlay} className="col-span-3">
                    <PadButton text={playButtonText} />
                </div>
                <div className="col-span-1"><PadButton text={'&#9839;'} onClick={onClickSharp} isTrue={isSharp} /></div>
                <div className="col-span-1"><PadButton text={'&#9837;'} onClick={onClickFlat} isTrue={isFlat} /></div>
                <div className="col-span-1"><PadButton text={"R"} /></div>
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
                <div className="col-span-1"><PadButton text={"m7(-5)"} /></div>
            </div>
        </div>
    )
}

export default Pad