import { chordSettingsState, isPlayState, chordSettingsHanler, toggleTransport } from "../stateController/GlobalController";
import PadButton from "./parts/PadButton";
import { useSnapshot } from 'valtio'
import { Constants } from "../constants/constants";

const chordSettingConfig = Constants.CHORD_SETTINGS_INIT;
const Pad = () => {
    const isPlayMetronome = useSnapshot(isPlayState).isPlayMetronome;
    const enableChord = useSnapshot(chordSettingsState).enableChord;

    return (
        <div className="mt-5 mx-6">
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3">
                    <PadButton id='play' text={isPlayMetronome ? "■" : "▶"} onChange={toggleTransport} checked={isPlayMetronome} />
                </div>
                {
                    chordSettingConfig.map(e => {
                        const checked = enableChord.find(e2 => e2 === e.key) ? true : false;
                        return (
                            <div className="col-span-1" key={e.key}>
                                <PadButton id={'chord' + e.key} text={e.buttonDisplayName} checked={checked} onChange={() => chordSettingsHanler(e.key)} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Pad