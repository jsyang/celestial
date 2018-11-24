import GeometryEditScreen from './GeometryEditScreen';
import GameScreen from './GameScreen';
import TitleScreen from './TitleScreen';
import Assets from './assets';
import startupOptions from './startupOptions';

const onTitleScreenFadeout = () => {
    GameScreen.init();
    GameScreen.start();
};

function onDOMContentLoaded() {
    removeEventListener('DOMContentLoaded', onDOMContentLoaded);

    let onAssetsLoad;

    if (startupOptions.isTestSectorInUse) {
        onAssetsLoad = onTitleScreenFadeout;
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
