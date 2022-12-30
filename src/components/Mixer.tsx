import { useSnapshot } from 'valtio'
import BpmSlider from './BpmSlider'
import { Constants } from '../constants/constants'
import { GameContoller } from '../controller/GameController'
import { Accidental, ChordType } from '../constants/type'
import { MidiController, midiDeviceState } from '../controller/MidiController'
import { gameState } from '../controller/GameState'

function Mixer() {
  const { keyBoardOctobe } = useSnapshot(gameState)
  const { devices } = useSnapshot(midiDeviceState)

  // TODO とりあえず、プルダウン実装。あとで変える
  const pullDown: Array<Accidental> = ['natural', 'sharp', 'flat']
  const chordTypes: Array<ChordType> = ['random', 'diatonic3Note', 'diatonic4Note']

  return (
    <div className="p-3 flex flex-col justify-center">
      Mixer
      <div className="h-5" />
      <BpmSlider />
      <div>
        <input
          value={keyBoardOctobe}
          type="number"
          onChange={(e) => GameContoller.setKeyBoardOctobe(Number(e.target.value))}
          min={Constants.OCTOBE.min}
          max={Constants.OCTOBE.max}
          className="w-1/2"
        />
      </div>
      <select onChange={(e) => GameContoller.setSelectedAccidental(e.target.value as Accidental)}>
        {pullDown.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <select onChange={(e) => MidiController.selectDevice(e.target.value)}>
        {devices.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <select onChange={(e) => GameContoller.selectChordType(e.target.value as ChordType)}>
        {chordTypes.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Mixer
