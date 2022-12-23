
import { useAtom } from 'jotai';
import React from 'react'
import { midiNoteOnKeyAtom } from '../../atoms/atom';
import Key from './Key'

export const SustainBar = () => {
    return (
        <div className='h-1 bg-black'></div>
    )
};


function KeyBoard() {
    const [midiNoteOnKey, setMidiKey] = useAtom(midiNoteOnKeyAtom);

    const offSet = 36
    const keyBoardMaxNumber = 48;
    const keyArray = [...Array(keyBoardMaxNumber)].map((_, i) => i + offSet);

    return (
        <div className='flex flex-col'>
            <SustainBar />
            <div className='h-36 flex justify-center'>
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