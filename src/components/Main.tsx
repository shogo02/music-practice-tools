import parse from 'html-react-parser';
import { convertMusicalSymbols } from '../util/converter';
import { useSnapshot } from 'valtio'
import { beatPositionState, displayChordState, playNotesState } from '../stateController/GlobalController';


const Main = () => {
    const beatPosition = useSnapshot(beatPositionState).value;
    const displayChord = useSnapshot(displayChordState);
    const playNotes = [...useSnapshot(playNotesState).playNotes];
    const displayPlayNotes = playNotes.sort((a, b) => {
        return (a.number < b.number) ? -1 : 1;
    }).map(e => e.name + (e.accidental ?? ""));
    
    return (
        <div className='border border-black h-full bg-[#000730] text-cyan-200 p-7'>
            <div className='text-4xl'>{beatPosition}</div>
            <div className='text-6xl text-center'>{parse(convertMusicalSymbols(displayChord.chordName))}</div>
            <div className='text-4xl text-center'>{parse(convertMusicalSymbols(displayChord.notesInChordName.join(" ")))}</div>
            <div className='text-3xl text-center'>{displayChord.notesInChordDegree.join(" ")}</div>
            <div className='text-3xl text-center'>{parse(convertMusicalSymbols(displayPlayNotes.join(" ")))}</div>


            {/* <sub>7</sub><sup>(-5)</sup> */}
            {/* &#9837;	&#9839; */}
        </div>
    )
}

export default Main;