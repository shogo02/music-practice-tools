import React, { useEffect } from 'react';
import * as Tone from 'tone';
import { useAtom } from 'jotai';
import { useKey } from 'react-use';
import { flatOrSharpNotaitionAtom, chordSettingsAtom, playStateAtom } from '../atoms/atom';
import { Chord, ChordCalculator } from '../util/chordCalculator';
import parse, { domToReact } from 'html-react-parser';
import { convertMusicalSymbols } from '../util/converter';

const chordCalculator = new ChordCalculator();

const Main = () => {
    const [beatCount, setBeatCount] = React.useState(0);
    const [note, setNote] = React.useState("X");
    const [notesInChord, setNotesInChord] = React.useState({noteId: "", note: ""});
    const [playState, setPlayState] = useAtom(playStateAtom);
    const [flatOrSharpNotaition, setflatOrSharpNotaition] = useAtom(flatOrSharpNotaitionAtom);
    const [chordSettings, setChordSettingsAtom] = useAtom(chordSettingsAtom);
    
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

        chordCalculator.flatOrSharpNotaition = flatOrSharpNotaition;
        chordCalculator.chordSettings = chordSettings;

        return () => { Tone.Transport.cancel(); };
    }, [playState, flatOrSharpNotaition, chordSettings])


    const draw = () => {
        const position = Tone.Transport.position.toString().split(":").map(Number);
        const beat = position[1];
        setBeatCount(beat);

        if (beat === 0) {
            const root = chordCalculator.getRandomRoot();
            setNote(root.note.toString());
            
            const chord: Chord = {
                rootNoteId: root.noteId,
                _3rd: "major",
                _5th: "none",
                _7th: "none",
                _9th: "none",
                _11th: "none",
                _13th: "none",
            }
            const notesInChord = chordCalculator.getNotesInCode(root, chord);
            setNotesInChord({
                noteId: (
                    notesInChord.root.noteId.toString() + " " + 
                    notesInChord._3rd?.noteId.toString() + " " + 
                    notesInChord._5th?.noteId.toString() + " " + 
                    notesInChord._7th?.noteId.toString() + " " + 
                    notesInChord._9th?.noteId.toString() + " " + 
                    notesInChord._11th?.noteId.toString() + " " + 
                    notesInChord._13th?.noteId.toString()
                ),
                note: (
                    notesInChord.root.note.toString() + " " + 
                    notesInChord._3rd?.note.toString() + " " + 
                    notesInChord._5th?.note.toString() + " " + 
                    notesInChord._7th?.note.toString() + " " + 
                    notesInChord._9th?.note.toString() + " " + 
                    notesInChord._11th?.note.toString() + " " + 
                    notesInChord._13th?.note.toString()
                )
            });
        }
    }

    return (
        <div className='border border-black h-full bg-[#000730] text-cyan-200 p-7'>
            <div className='text-4xl'>{beatCount + 1}</div>
            <div className='text-5xl text-center'>{ parse(note) }</div>
            <div className='text-2xl text-center'>{ parse(notesInChord.note) }</div>
            <div className='text-1xl text-center'>{notesInChord.noteId}</div>

            {/* <sub>7</sub><sup>(-5)</sup> */}
            {/* &#9837;	&#9839; */}
        </div>
    )
}

export default Main;