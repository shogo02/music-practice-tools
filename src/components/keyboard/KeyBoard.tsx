
// import { midiNoteOnKeyAtom, pcKeyPressAtom, pcKeyToMidiMapAtom, pcKeyToMidiOffsetAtom } from '../../atoms/atom';
import { InitialValues } from '../../constants/constants';
import Key from './Key'

function KeyBoard() {
    // const [midiNoteOnKey, setMidiKey] = useAtom(midiNoteOnKeyAtom);
    // const [pcKeyToMidiMap, setPcKeyToMidiMap] = useAtom(pcKeyToMidiMapAtom);

    // const [pcKeyPress, setPcKeyPress] = useAtom(pcKeyPressAtom);

    const offSet = InitialValues.KEYBOARD_OFFSET;
    const keyBoardMaxNumber = 48;
    const keyArray = [...Array(keyBoardMaxNumber)].map((_, i) => i + offSet);

    return (
        <div className='flex justify-center'>
            <div className='h-36 w-3/4 flex justify-center'>
                {
                    // keyArray.map((e) => {
                    //     const pckey = pcKeyToMidiMap.find(e2 => e2.midiNumber === e)?.pcKey ?? "";
                    //     return (
                    //         <div className="col-span-1" key={e}>
                    //             <Key midiNumber={e} midiNoteOnKey={midiNoteOnKey} pcKey={pckey}/>
                    //         </div>
                    //     );
                    // })

                }
            </div>
        </div>
    )
}

export default KeyBoard