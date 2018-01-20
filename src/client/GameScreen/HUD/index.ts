import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import RadarLocal from './RadarLocal';
import RadarGalaxy from './RadarGalaxy';
import PauseStatus from './PauseStatus';

function init() {
    PauseStatus.init();
    RadarLocal.init();
    RadarGalaxy.init();
    UnitDisplay.init();
    WeaponsDisplay.init();
}

function update() {
    RadarGalaxy.update();
    RadarLocal.update();
    UnitDisplay.update();
    WeaponsDisplay.update();
}

export default {
    init,
    update,
    setFocus:        RadarLocal.setOrigin,
    setPauseVisible: PauseStatus.setVisible
}