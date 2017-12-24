import GameScreen from './GameScreen';
import TitleScreen from './TitleScreen';
import Assets from './assets';

function onDOMContentLoaded() {
    TitleScreen.setFadeOutCallback(
        () => {
            GameScreen.init();
            GameScreen.start();
        }
    );

    Assets
        .load()
        .then(TitleScreen.start);
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);

const _module = (module as any);

if (_module && _module.hot) {
    _module.hot.accept();
}