import React, { useEffect } from 'react';
import * as Tone from 'tone';
import contextJson from '../context/context.json'
import { useAtom } from 'jotai';
import { useKey } from 'react-use';
import { playStateAtom } from '../atoms/atom';

const singleNoteList = contextJson.singleNoteList;


const Main = () => {
    const [note, setNote] = React.useState("X");
    const [beatCount, setBeatCount] = React.useState(0);
    const [playState, setPlayState] = useAtom(playStateAtom);
    
    useKey(' ', () => {
        Tone.Transport.toggle();
        setPlayState(Tone.Transport.state.toString());
    });

    useEffect(() => {
        const synth = new Tone.Synth({ envelope: { release: 0.4 } }).toDestination();
        const part = new Tone.Part(((time, value) => {
            synth.triggerAttackRelease(value.note, "0.1", time, value.velocity);
            Tone.Draw.schedule(draw, time);
        }), [
            { time: 0, note: "C6", velocity: 1 },
            { time: "0:1", note: "C5", velocity: 1 },
            { time: "0:2", note: "C5", velocity: 1 },
            { time: "0:3", note: "C5", velocity: 1 }
        ]).start(0);
        part.loop = true;

        return () => { Tone.Transport.cancel(); setBeatCount(0); };
    }, [playState])


    const draw = () => {
        const position = Tone.Transport.position.toString().split(":").map(Number);
        const beat = position[1];
        setBeatCount(beat);

        if (beat === 0) {
            const singleNote = Math.floor(Math.random() * singleNoteList.length);
            setNote(singleNoteList[singleNote].note);
        }
    }

    return (
        <div className='border border-black h-full'>
            Main
            <h1>{note}</h1>
            <h1>{beatCount + 1}</h1>
            {/* &#9837;	&#9839; */}
        </div>
    )
}

export default Main;