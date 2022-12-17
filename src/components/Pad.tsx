import { useAtom } from "jotai";
import * as Tone from 'tone';
import { playStateAtom } from '../atoms/atom'

const Pad = () => {
    const [playState, setPlayState] = useAtom(playStateAtom);
    const transportState = Tone.Transport.state.toString();
    const onClickPlay = () => {
        Tone.Transport.toggle();
        setPlayState(Tone.Transport.state.toString());
    }

    return (
        <div>
            <div onClick={onClickPlay}
                className="bg-gray-500 hover:bg-gray-400 text-white rounded px-4 py-1 w-20 text-lg text-center">
                {transportState == "started" ? "■" : "▶"}
            </div>
        </div>
    )
}

export default Pad