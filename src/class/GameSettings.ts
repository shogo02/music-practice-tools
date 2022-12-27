import { Constants } from "../constants/constants";
import { ChordKeyName } from "../constants/type";


export class GameSettings {
    private chordSettings = Constants.CHORD_SETTINGS_INIT;
    private selectedChord: ChordKeyName = "major";

    setSelectedChord(key: ChordKeyName){
        this.selectedChord = key;
    }
}