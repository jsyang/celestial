import {onDOMContentLoaded} from './Game';

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);

const _module = (module as any);

if (_module && _module.hot) {
    _module.hot.accept(
        './client/index',
        () => location.reload()
    );
}