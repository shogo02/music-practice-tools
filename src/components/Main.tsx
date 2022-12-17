import React, { useEffect } from 'react';
import BpmSlider from './BpmSlider';
import * as Tone from 'tone';
import contextJson from '../context/context.json'


const singleNoteList = contextJson.singleNoteList;


type mainProps = {
    beatCount: number
}
const Main = () => {

    const [bpm, setBpm] = React.useState(120); // TODO: 今のところ不要
    const [isMetronomePaly, setIsMetronomePlay] = React.useState(false);
    const [note, setNote] = React.useState("X");
    const [beatCount, setBeatCount] = React.useState(0);

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
        return () => {Tone.Transport.cancel()};
    }, [isMetronomePaly])

    const draw = () => {
        const position = Tone.Transport.position.toString().split(":").map(Number);
        const beat = position[1];
        setBeatCount(beat);

        if (beat === 0) {
            const singleNote = Math.floor(Math.random() * singleNoteList.length);
            setNote(singleNoteList[singleNote].note);
        }
    }

    const metronomeToggle = () => {
        if (isMetronomePaly) {
            Tone.Transport.stop()
            setIsMetronomePlay(false)
            setBeatCount(0)
        } else if (!isMetronomePaly) {
            Tone.Transport.start()
            setIsMetronomePlay(true)
        }
    }

    return (
        <div>Main</div>
        // <div className="App">
        //     <h1 className="text-3xl font-bold underline">{note}&#9837;m7<sup>(&#9837;5)</sup></h1>
        //     <h1>{beatCount + 1}</h1>
        //     <button className="beat" type="button" onClick={metronomeToggle}>{isMetronomePaly ? "stop" : "start"}</button>

        //     <BpmSlider setBpm={setBpm} />
        //     &#9837;	&#9839;
        // </div>
    )
}

export default Main;