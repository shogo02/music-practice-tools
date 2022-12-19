import { useAtom } from "jotai";
import { flatOrSharpNotaitionAtom } from "../atoms/atom";
import ToggleButton from "./Parts.tsx/ToggleButton"


const Nob = () => {
    const [flatOrSharpNotaition, setflatOrSharpNotaition] = useAtom(flatOrSharpNotaitionAtom);
    const onClickFlatOrSharpNotation = () => {
        flatOrSharpNotaition === 'sharp' ? setflatOrSharpNotaition('flat') : setflatOrSharpNotaition('sharp')
    }
    return (
        <div>
            Nob
            <ToggleButton onClick={onClickFlatOrSharpNotation} trueText={'#'} falseText={'b'} isTrue={flatOrSharpNotaition === 'sharp'} />
        </div>
    )
}

export default Nob