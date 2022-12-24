import { accidentalHandler } from "../stateController/GlobalController";
import BpmSlider from "./BpmSlider"


const Mixer = () => {
    // TODO とりあえず、プルダウン実装。あとで変える
    const pullDown = ["natural", "sharp", "flat"];
    

    return (
        <div className="p-3 flex flex-col justify-center">
            Mixer
            <div className="h-5"></div>
            <BpmSlider />
            <div>
                <input
                    // value={pcKeyToMidiOffset}
                    type="number"
                    // onChange={(e) => pcKeyOffSetChange(e.target.value)}
                    min="36"
                    max="48"
                    className='w-1/2'
                />
            </div>
            <select onChange={(e) => accidentalHandler(e.target.value)}>
                { pullDown.map((e) => <option key={e} value={e}>{e}</option>) }
            </select>
        </div>
    )
}

export default Mixer