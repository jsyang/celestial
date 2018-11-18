import GeometryEditScreen from './GeometryEditScreen';
import GameScreen from './GameScreen';
import TitleScreen from './TitleScreen';
import Assets from './assets';
import Input from './Input';

const onTitleScreenFadeout = () => {
    GameScreen.init();
    GameScreen.start();
};

const isGameScreenStart         = location.search.match(/game$/);
const isGeometryEditScreenStart = location.search.match(/editor$/);

function onDOMContentLoaded() {
    removeEventListener('DOMContentLoaded', onDOMContentLoaded);

    let onAssetsLoad;

    if (isGameScreenStart) {
        onAssetsLoad = onTitleScreenFadeout;
    } else if (isGeometryEditScreenStart) {
        onAssetsLoad = GeometryEditScreen.start;
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
