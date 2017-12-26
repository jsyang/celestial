import GameScreen from './GameScreen';
import TitleScreen from './TitleScreen';
import Assets from './assets';

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

    Assets
        .load()
        .then(onAssetsLoad);
}

addEventListener('DOMContentLoaded', onDOMContentLoaded);