import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { pcKeyPressAtom } from "../atoms/atom";


function PcKeyController() {
    const [pcKeyPress, setPcKeyPress] = useAtom(pcKeyPressAtom);

    const keyDownHanler = (event: KeyboardEvent) => {
        if(!pcKeyPress.find(e => e === event.key)) setPcKeyPress([...pcKeyPress, event.key]);
    }

    const keyUpHanler = (event: KeyboardEvent) => {
        const tmp = pcKeyPress.filter(e => e !== event.key);
        setPcKeyPress(tmp);
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDownHanler, false);
        return () => {
            document.removeEventListener("keydown", keyDownHanler, false);
        }
    }, [keyDownHanler]);

    useEffect(() => {
        document.addEventListener("keyup", keyUpHanler, false);
        return () => {
            document.removeEventListener("keyup", keyUpHanler, false);
        }
    }, [keyUpHanler]);

    return (
        <div></div>
    )
}

export default PcKeyController