
import { InitialValues } from '../../constants/constants';
import Key from './Key'
import { useSnapshot } from 'valtio'
import { playNotesState } from '../../stateController/GlobalController';
import { Note } from "../../../node_modules/webmidi/dist/esm/webmidi.esm";

function KeyBoard() {
    const playNotes = useSnapshot(playNotesState).playNotes;

    const offSet = InitialValues.KEYBOARD_OFFSET;
    const keyBoardMaxNumber = 48;
    const keyArray = [...Array(keyBoardMaxNumber)].map((_, i) => i + offSet);

    return (
        <div className='flex justify-center'>
            <div className='h-36 w-3/4 flex justify-center'>
                {
                    keyArray.map((e) => {
                        const playNote = playNotes.find(e2 => e2.number === e) as Note;
                        return (
                            <div className="col-span-1" key={e}>
                            <Key midiNumber={e} playNote={playNote} pcKey={""}/>
                            </div>
                        );
                    })

                }
            </div>
        </div>
    )
}

export default KeyBoard