import PadButton from "./parts/PadButton";
import { useSnapshot } from 'valtio'
import { Constants } from "../constants/constants";
import { globalController } from "../controller/GlobalController";

const chordSettingConfig = Constants.CHORD_SETTINGS_INIT;
const Pad = () => {
    const gc = useSnapshot(globalController);
    console.log(gc)
    // const isPlay = gc.isPlay;
    // const metronomeToggle = gc.metronomeToggle;

    return (
        <div className="mt-5 mx-6">
            <div className="grid grid-cols-3 gap-5">
                {/* <div className="col-span-3">
                    <PadButton id='play' text={isPlay ? "■" : "▶"} onChange={metronomeToggle} checked={isPlay} />
                </div> */}
                {/* {
                    chordSettingConfig.map(e => {
                        const checked = false;
                        // const checked = enableChord.find(e2 => e2 === e.key) ? true : false;
                        return (
                            <div className="col-span-1" key={e.key}>
                                <PadButton id={'chord' + e.key} text={e.buttonDisplayName} checked={checked} onChange={() => gc.setSelectedChord(e.key)} />
                            </div>
                        );
                    })
                } */}
            </div>
        </div>
    )
}

export default Pad