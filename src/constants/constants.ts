
export class InitialValues {
    static readonly BPM = 120;
    static readonly VOLUME = -10;
    static readonly PC_EY_OFFSET = 36;
    static readonly KEYBOARD_OFFSET = 36;
}

export class Constants {
    static readonly MASTER_VOLUME = {
        min: -60,
        max: 0,
    }

    static readonly BPM = {
        min: 30,
        max: 360,
    }

    static readonly PCKeyToMidi = [
        "z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m", ",", "l", ".", ";", "/", "_",
        "q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u", "i", "9", "o", "0", "p", "@"
    ];
}