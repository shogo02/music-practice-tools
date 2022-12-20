import { useAtom } from "jotai";
import { useState } from "react";
import * as Tone from 'tone';
import { chordSettingsAtom, playStateAtom } from '../atoms/atom';
import { MusicalConstants } from "../constants/musicalConstants";
import { ChordSettings } from "../constants/type";
import PadButton from "./Parts.tsx/PadButton";

const Pad = () => {
    const [playState, setPlayState] = useAtom(playStateAtom);
    const [chordSettings, setChordSettings] = useAtom(chordSettingsAtom);

    const onClickPlay = () => {
        Tone.Transport.toggle();
        const transportState = Tone.Transport.state.toString();
        setPlayState(transportState);
    }

    const onClickChord = (positionKey: string) => {
        let updatedChordSettings = Object.entries(chordSettings);
        updatedChordSettings.forEach(([key, value], index) => {
            if(key === positionKey) value.isTrue = !value.isTrue;
        })
        setChordSettings(Object.fromEntries(updatedChordSettings) as ChordSettings);
    };

    return (
        <div className="mt-5 mx-6">
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3">
                    <PadButton id='play' text={playState === "started" ? "■" : "▶"} onChange={onClickPlay} checked={playState === "started" ? true : false} />
                </div>
                {
                    Object.entries(chordSettings).map(([key, value], index) => {
                        return (
                            <div className="col-span-1" key={key}>
                                <PadButton id={'chord' + key} text={value.text} checked={value.isTrue} onChange={() => onClickChord(key)} />
                            </div>
                        );
                    })

                }
            </div>
        </div>
    )
}

export default Pad