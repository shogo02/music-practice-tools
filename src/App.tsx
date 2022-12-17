import KeyBoard from './components/KeyBoard';
import Main from './components/Main'
import Mixer from './components/Mixer';
import Nob from './components/Nob';
import Pad from './components/Pad';


function App() {
    return (
        <div className='h-screen'>
            <div className="flex flex-row justify-between h-3/4">
                <div className="basis-1/5 border border-black">
                    <Pad />
                </div>
                <div className="basis-full border border-black flex flex-col">
                    <div className='h-5/6 border border-black'>
                        <Main />
                    </div>
                    <div className='h-1/6 border border-black'>
                        <Nob />
                    </div>
                </div>
                <div className="basis-1/5 border border-black">
                    <Mixer />
                </div>
            </div>
            <div className='h-full border border-black'>
                <KeyBoard />
            </div>
        </div>
    );
}

export default App;
