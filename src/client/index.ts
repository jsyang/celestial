import {onDOMContentLoaded, start, stop} from './Game';

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);

// HMR support
const _module = (module as any);

if (_module && _module.hot) {
    _module.hot.accept('./client/index', () => {
        stop();
        start();
    });
}