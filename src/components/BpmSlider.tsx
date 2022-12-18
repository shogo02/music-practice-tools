import React from 'react';
import { Slider } from '@mui/material';
import * as Tone from 'tone';



const BpmSlider = () => {
  const [bpm, setBpm] = React.useState(120);
  const [volume, setVolume] = React.useState(-14);

  Tone.Transport.bpm.value = bpm;
  Tone.Master.volume.value = volume;

  return (
    <div className="App">
      <h1>{bpm} bpm</h1>

      <Slider
        defaultValue={bpm}
        valueLabelDisplay="off"
        min={30}
        max={360}
        style={{ width: 200 }}
        onChange={(event, value: any) => setBpm(value)}
      />

      <h1>{volume} db</h1>
      <Slider
        defaultValue={volume}
        valueLabelDisplay="off"
        min={-60}
        max={0}
        style={{ width: 200 }}
        onChange={(event, value: any) => setVolume(value)}
      />
    </div>
  );
}

export default BpmSlider