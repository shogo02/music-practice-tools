import React from 'react';
import { Slider } from '@mui/material';
import * as Tone from 'tone';
import { InitialValues, Constants } from '../constants/constants';



const BpmSlider = () => {
  const [bpm, setBpm] = React.useState(InitialValues.BPM);
  const [volume, setVolume] = React.useState(InitialValues.VOLUME);

  Tone.Transport.bpm.value = bpm;
  Tone.Master.volume.value = volume;

  return (
    <div className="App">
      <h1>{bpm} bpm</h1>

      <Slider
        defaultValue={InitialValues.BPM}
        valueLabelDisplay="off"
        min={Constants.BPM.min}
        max={Constants.BPM.min}
        style={{ width: 200 }}
        onChange={(event, value: any) => setBpm(value)}
      />

      <h1>{volume} db</h1>
      <Slider
        defaultValue={InitialValues.VOLUME}
        valueLabelDisplay="off"
        min={Constants.MASTER_VOLUME.min}
        max={Constants.MASTER_VOLUME.max}
        style={{ width: 200 }}
        onChange={(event, value: any) => setVolume(value)}
      />
    </div>
  );
}

export default BpmSlider