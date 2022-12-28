import { useEffect } from "react";
import { globalController } from "../controller/GlobalController";
import { useSnapshot } from 'valtio'


function PcKeyController() {
    const {keyDownHandler, keyUpHandler} = useSnapshot(globalController);

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler, false);
        return () => {
            document.removeEventListener("keydown", keyDownHandler, false);
        }
    }, [keyDownHandler]);

    useEffect(() => {
        document.addEventListener("keyup", keyUpHandler, false);
        return () => {
            document.removeEventListener("keyup", keyUpHandler, false);
        }
    }, [keyUpHandler]);

    return (
        <div></div>
    )
}

export default PcKeyController