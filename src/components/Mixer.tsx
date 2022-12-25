import { accidentalHandler, midiDevicesState, noteOctobeState, selectedMidiDeviceHandler, setNoteOctobe } from "../stateController/GlobalController";
import BpmSlider from "./BpmSlider"
import { useSnapshot } from 'valtio'
import { Constants } from "../constants/constants";


const Mixer = () => {
    const noteOctobe = useSnapshot(noteOctobeState).noteOctobe;
    const midiDevices = useSnapshot(midiDevicesState).devices;

    // TODO とりあえず、プルダウン実装。あとで変える
    const pullDown = ["natural", "sharp", "flat"];
    

    return (
        <div className="p-3 flex flex-col justify-center">
            Mixer
            <div className="h-5"></div>
            <BpmSlider />
            <div>
                <input
                    value={noteOctobe}
                    type="number"
                    onChange={(e) => setNoteOctobe(Number(e.target.value))}
                    min={Constants.OCTOBE.min}
                    max={Constants.OCTOBE.max}
                    className='w-1/2'
                />
            </div>
            <select onChange={(e) => accidentalHandler(e.target.value)}>
                { pullDown.map((e) => <option key={e} value={e}>{e}</option>) }
            </select>
            <select onChange={(e) => selectedMidiDeviceHandler(e.target.value)}>
                { midiDevices.map((e) => <option key={e} value={e}>{e}</option>) }
            </select>
        </div>
    )
}

export default Mixer