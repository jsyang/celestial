import GeometryEditScreen from './GeometryEditScreen';
import GameScreen from './GameScreen';
import TitleScreen from './TitleScreen';
import Assets from './assets';
import startupOptions from './startupOptions';
import TestScreen from './TestScreen';

const onTitleScreenFadeout = () => {
    GameScreen.init();
    GameScreen.start();
};

function onDOMContentLoaded() {
    removeEventListener('DOMContentLoaded', onDOMContentLoaded);

    let onAssetsLoad;

    if (startupOptions.isTestSectorInUse) {
        onAssetsLoad = () => {
            TestScreen.init();
            TestScreen.start();
        };
    } else if (startupOptions.shouldSkipTitleScreen) {
        onAssetsLoad = onTitleScreenFadeout;
    } else if (startupOptions.isGeometryEditorInUse) {
        onAssetsLoad = GeometryEditScreen.start;
    } else {
        TitleScreen.setFadeOutCallback(onTitleScreenFadeout);
        onAssetsLoad = TitleScreen.start;
    }

    Assets
        .load()
        .then(onAssetsLoad);
}

addEventListener('DOMContentLoaded', onDOMContentLoaded);
