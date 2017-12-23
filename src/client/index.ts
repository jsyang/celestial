import GameScreen from './GameScreen';
import Assets from './assets';

function onDOMContentLoaded() {
    Assets
        .load()
        .then(GameScreen.init)
        .then(GameScreen.start);
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);

const _module = (module as any);

if (_module && _module.hot) {
    _module.hot.accept();
}