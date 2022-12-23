import { useAtom } from "jotai";
import { accidentalAtom } from "../atoms/atom";
import ToggleButton from "./parts/ToggleButton"


const Nob = () => {
    const [accidental, setAccidental] = useAtom(accidentalAtom);
    const onClickFlatOrSharpNotation = () => {
        accidental === 'sharp' ? setAccidental('flat') : setAccidental('sharp')
    }
    return (
        <div>
            Nob
            <ToggleButton onClick={onClickFlatOrSharpNotation} trueText={'#'} falseText={'b'} isTrue={accidental === 'sharp'} />
        </div>
    )
}

export default Nob