import React from 'react';
import { Slider } from '@mui/material';
import * as Tone from 'tone';

type BpmSliderProps = {
    setBpm: any,
}

const BpmSlider = (props: BpmSliderProps) => {
    const [viewBpm, setViewBpm] = React.useState(120);
    Tone.Transport.bpm.value = viewBpm;

    return (
      <div className="App">
        <h1>{viewBpm} bpm</h1>
        
        <Slider
            defaultValue={120}
            aria-label="Bpm"
            valueLabelDisplay="off"
            min={30}
            max={360}
            style={{width: 200}}
            onChange={(event, value: any) => setViewBpm(value)}
        />
      </div>
    );
}

export default BpmSlider