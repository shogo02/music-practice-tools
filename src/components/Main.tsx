import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useAtom } from 'jotai';
import { useKey } from 'react-use';
import { accidentalAtom, chordSettingsAtom, playStateAtom, midiNoteOnKeyAtom } from '../atoms/atom';
import { ChordCalculator } from '../util/ChordCalculator';
import parse, { domToReact } from 'html-react-parser';
import { convertMusicalSymbols } from '../util/converter';
import { WebMidi, Note } from "../../node_modules/webmidi/dist/esm/webmidi.esm";

const chordCalculator = new ChordCalculator();


const Main = () => {
    const [beatCount, setBeatCount] = React.useState(0);
    const [note, setNote] = React.useState("X");
    const [notesInChord, setNotesInChord] = React.useState({ noteId: "", note: "X" });
    const [playState, setPlayState] = useAtom(playStateAtom);
    const [accidental, setAccidental] = useAtom(accidentalAtom);
    const [chordSettings, setChordSettingsAtom] = useAtom(chordSettingsAtom);
    const [midiNoteOnKey, setMidiKey] = useAtom(midiNoteOnKeyAtom);
    
    const midiKeyRef = useRef<Array<Note>>([]);
    midiKeyRef.current = midiNoteOnKey;
    
    const accidentalRef = useRef("");
    accidentalRef.current = accidental

    useKey(' ', () => {
        Tone.Transport.toggle();
        setPlayState(Tone.Transport.state.toString());
    });

    useEffect(() => {
        WebMidi
            .enable()
            .then(mitiInit)
            .catch(err => alert(err));
    }, [])

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

        chordCalculator.accidental = accidental;
        chordCalculator.chordSettings = chordSettings;

        return () => { Tone.Transport.cancel(); };
    }, [playState, accidental, chordSettings])


    const draw = () => {
        const position = Tone.Transport.position.toString().split(":").map(Number);
        const beat = position[1];
        setBeatCount(beat);

        if (beat === 0) {
            const root = chordCalculator.getRandomRoot();

            const chord = chordCalculator.getChord(root);
            const tmpNotesInChord = chord?.notesInChord.map(e => e.noteName).join(" ") ?? "";
            setNote(chord?.chordName ?? "not found");
            setNotesInChord({ noteId: "", note: tmpNotesInChord });
        }
    }
    
    const mitiInit = () => {
        WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));
        // const myInput = WebMidi.getInputByName("Digital Piano");
        const myInput = WebMidi.getInputByName("Digital Keyboard");
        const synth = new Tone.PolySynth().toDestination();
        myInput?.addListener("noteon", (e) => {
            let tmpNote = e.note;
            if(tmpNote.accidental === "#" && accidentalRef.current === "flat") {
                tmpNote = new Note(e.note.getOffsetNumber(0, 1));
                tmpNote.accidental = 'b'
            }
            synth.triggerAttack(tmpNote.identifier);
            setMidiKey([...midiKeyRef.current, tmpNote]);
        });
        myInput?.addListener("noteoff", (e) => {
            let tmpNote = e.note;
            if(tmpNote.accidental === "#" && accidentalRef.current === "flat") {
                tmpNote = new Note(e.note.getOffsetNumber(0, 1));
                tmpNote.accidental = 'b'
            }
            synth.triggerRelease(tmpNote.identifier)
            setMidiKey(midiKeyRef.current.filter(m => m.number !== tmpNote.number))
        });
    }
    
    const viewInputNote = midiNoteOnKey.sort((a, b) => {
        return (a.number < b.number) ? -1 : 1;
    }).map(e => {
        let tmpAccidental = e.accidental ?? "";
        return e.name + tmpAccidental;
    }).join(" ");


    return (
        <div className='border border-black h-full bg-[#000730] text-cyan-200 p-7'>
            <div className='text-4xl'>{beatCount + 1}</div>
            <div className='text-6xl text-center'>{parse(convertMusicalSymbols(note))}</div>
            <div className='text-4xl text-center'>{parse(convertMusicalSymbols(notesInChord.note))}</div>
            <div className='text-1xl text-center'>{notesInChord.noteId}</div>
            <div className='text-1xl text-center'>{viewInputNote}</div>


            {/* <sub>7</sub><sup>(-5)</sup> */}
            {/* &#9837;	&#9839; */}
        </div>
    )
}

export default Main;