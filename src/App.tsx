import Main from './components/Main'
import Mixer from './components/Mixer';
import Nob from './components/Nob';
import Pad from './components/Pad';
import { Provider } from 'jotai';
import KeyBoard from './components/keyboard/KeyBoard';

function App() {
    return (
        <Provider>
            <div className='h-screen bg-[#dedede] select-none font-mono'>
                <div className="flex flex-row justify-between h-3/4">
                    <div className="basis-1/2 border border-black">
                        <Pad />
                    </div>
                    <div className="basis-full border border-black flex flex-col pt-20 mx-14">
                        <div className='h-5/6 border border-black'>
                            <Main />
                        </div>
                        <div className='h-1/6 border border-black'>
                            <Nob />
                        </div>
                    </div>
                    <div className="basis-1/2 border border-black">
                        <Mixer />
                    </div>
                </div>
                <div className='h-1/4 border border-black'>
                    <KeyBoard />
                </div>
            </div>
        </Provider>
    );
}

export default App;
