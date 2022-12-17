import React from 'react';
import { Slider } from '@mui/material';
import * as Tone from 'tone';



const BpmSlider = () => {
    const [bpm, setBpm] = React.useState(120);
    Tone.Transport.bpm.value = bpm;

    return (
      <div className="App">
        <h1>{bpm} bpm</h1>
        
        <Slider
            defaultValue={120}
            aria-label="Bpm"
            valueLabelDisplay="off"
            min={30}
            max={360}
            style={{width: 200}}
            onChange={(event, value: any) => setBpm(value)}
        />
      </div>
    );
}

export default BpmSlider