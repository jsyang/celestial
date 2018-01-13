require('fpsmeter');
import GameScreen from './GameScreen';
import TitleScreen from './TitleScreen';
import Assets from './assets';
import Input from './Input';

function onTitleScreenFadeout() {
    GameScreen.init();
    GameScreen.start();
}

const isGameScreenStart = location.search.match(/game$/);

function onDOMContentLoaded() {
    (window as any).FPSMETER = {tick: new Function()};
    //
    //     new (window as any).FPSMeter({
    //     left:    'auto',
    //     top:     'auto',
    //     bottom:  '5px',
    //     right:   '5px',
    //     heat:    0,
    //     graph:   1,
    //     history: 40
    // });

    let onAssetsLoad;

    if (isGameScreenStart) {
        onAssetsLoad = onTitleScreenFadeout;
    } else {
        TitleScreen.setFadeOutCallback(onTitleScreenFadeout);
        onAssetsLoad = TitleScreen.start;
    }

    Input.init();

    Assets
        .load()
        .then(onAssetsLoad);
}

addEventListener('DOMContentLoaded', onDOMContentLoaded);