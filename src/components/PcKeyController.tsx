import { useEffect } from "react";
import { keyDownHanler, keyUpHanler } from "../stateController/GlobalController";


function PcKeyController() {
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