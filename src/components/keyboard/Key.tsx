import { Note } from "../../../node_modules/webmidi/dist/esm/webmidi.esm";
import { Constants } from "../../constants/constants";

type KeyProps = {
    midiNumber: number,
    playNote: Note | undefined,
    pcKey: string,
}

function Key(props: KeyProps) {
    const displayNoteName = (props.playNote?.name ?? "") + (props.playNote?.accidental ?? "")
    let addClassName = "";
    if (Constants.midiHalfNoteNumber.find(e => e === props.midiNumber)) {
        addClassName += "h-20 w-7 mx-[-14px] bg-slate-600 z-10 ";
    } else {
        addClassName += "h-36 w-10  ";

    }

    if (props.playNote) {
        addClassName += "bg-sky-600 "
    }

    return (
        <div className="flex" onKeyDown={() => console.log("key")}>
            <div className={addClassName + " border border-black flex justify-center items-end rounded-b-lg"}>
                <div className="p-2">
                    {displayNoteName}
                    {props.pcKey ?? "none"}
                </div>
            </div>
        </div>
    )
}

export default Key