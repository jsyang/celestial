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