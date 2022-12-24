import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useKey } from "react-use";
import { Note } from "../../../node_modules/webmidi/dist/esm/webmidi.esm";
import { accidentalAtom } from "../../atoms/atom";
import { MusicalConstants } from "../../constants/musicalConstants";

type KeyProps = {
    midiNumber: number,
    midiNoteOnKey: Array<Note>,
    pcKey: string,
}

function Key(props: KeyProps) {
    const [pcKeyPress, setPcKeyPress] = useState(false);

      
    let midiNoteOnKey = props.midiNoteOnKey.find(e => e.number === props.midiNumber);
    
    let addClassName = "";
    if (MusicalConstants.midiHalfNoteNumber.find(e => e === props.midiNumber)) {
        addClassName += "h-20 w-7 mx-[-14px] bg-slate-600 z-10 ";
    } else {
        addClassName += "h-36 w-10  ";

    }

    if (midiNoteOnKey || pcKeyPress) {
        addClassName += "bg-sky-600 "
    }

    return (
        <div className="flex" onKeyDown={() => console.log("key")}>
            <div className={addClassName + " border border-black flex justify-center items-end rounded-b-lg"}>
                <div className="p-2">
                    {(midiNoteOnKey?.name ?? "") + (midiNoteOnKey?.accidental ?? "")}
                    {props.pcKey ?? "none"}
                </div>
            </div>
        </div>
    )
}

export default Key