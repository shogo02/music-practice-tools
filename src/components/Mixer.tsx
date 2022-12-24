// import { pcKeyToMidiOffsetAtom } from "../atoms/atom";
import BpmSlider from "./BpmSlider"


const Mixer = () => {
    // const [pcKeyToMidiOffset, setPcKeyToMidiOffset] = useAtom(pcKeyToMidiOffsetAtom);

    const pcKeyOffSetChange = (e: string) => {
        console.log(e);
        // setPcKeyToMidiOffset(Number(e));
    }

    return (
        <div className="p-3 flex flex-col justify-center">
            Mixer
            <div className="h-5"></div>
            <BpmSlider />
            <div>
                <input
                    // value={pcKeyToMidiOffset}
                    type="number"
                    onChange={(e) => pcKeyOffSetChange(e.target.value)}
                    min="36"
                    max="48"
                    className='w-1/2'
                />
            </div>
        </div>
    )
}

export default Mixer