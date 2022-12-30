import { useState } from 'react'
import { Slider } from '@mui/material'
import * as Tone from 'tone'
import { Constants } from '../constants/constants'

function BpmSlider() {
  const [bpm, setBpm] = useState(Constants.BPM.init)
  const [volume, setVolume] = useState(Constants.MASTER_VOLUME.init)

  Tone.Transport.bpm.value = bpm
  Tone.Master.volume.value = volume

  return (
    <div className="App">
      <h1>{bpm} bpm</h1>

      <Slider
        defaultValue={Constants.BPM.init}
        valueLabelDisplay="off"
        min={Constants.BPM.min}
        max={Constants.BPM.max}
        style={{ width: 200 }}
        onChange={(event, value: any) => setBpm(value)}
      />

      <h1>{volume} db</h1>
      <Slider
        defaultValue={Constants.MASTER_VOLUME.init}
        valueLabelDisplay="off"
        min={Constants.MASTER_VOLUME.min}
        max={Constants.MASTER_VOLUME.max}
        style={{ width: 200 }}
        onChange={(event, value: any) => setVolume(value)}
      />
    </div>
  )
}

export default BpmSlider
