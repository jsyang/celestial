import GeometryEditScreen from './GeometryEditScreen';
import GameScreen from './GameScreen';
import TitleScreen from './TitleScreen';
import Assets from './assets';
import startupOptions from './startupOptions';
import TestScreen from './TestScreen';
import {init} from './Network/p2p';

const onTitleScreenFadeout = () => {
    GameScreen.init();
    GameScreen.start();
};

function onDOMContentLoaded() {
    removeEventListener('DOMContentLoaded', onDOMContentLoaded);

    let onAssetsLoad;
    let shouldLoadAssets = true;

    if (startupOptions.isTestSectorInUse) {
        onAssetsLoad = () => {
            TestScreen.init();
            TestScreen.start();
        };
    } else if (startupOptions.isP2PTesting) {
        // todo: flesh this out more
        shouldLoadAssets = false;
        init();
    } else if (startupOptions.shouldSkipTitleScreen) {
        onAssetsLoad = onTitleScreenFadeout;
    } else if (startupOptions.isGeometryEditorInUse) {
        onAssetsLoad = GeometryEditScreen.start;
    } else {
        TitleScreen.setFadeOutCallback(onTitleScreenFadeout);
        onAssetsLoad = TitleScreen.start;
    }

    if (shouldLoadAssets) {
        Assets
            .load()
            .then(onAssetsLoad);
    }
}

addEventListener('DOMContentLoaded', onDOMContentLoaded);
