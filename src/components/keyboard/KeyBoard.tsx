
import { useAtom } from 'jotai';
import React from 'react'
import { midiNoteOnKeyAtom } from '../../atoms/atom';
import Key from './Key'

function KeyBoard() {
    const [midiNoteOnKey, setMidiKey] = useAtom(midiNoteOnKeyAtom);

    const offSet = 36
    const keyBoardMaxNumber = 48;
    const keyArray = [...Array(keyBoardMaxNumber)].map((_, i) => i + offSet);

    return (
        <div className='flex justify-center'>
            <div className='h-36 w-3/4 flex justify-center'>
                {
                    keyArray.map((e) => {
                        return (
                            <div className="col-span-1" key={e}>
                                <Key midiNumber={e} midiNoteOnKey={midiNoteOnKey}/>
                            </div>
                        );
                    })

                }
            </div>
        </div>
    )
}

export default KeyBoard