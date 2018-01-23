import Entity from '../../Entity';
import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import RadarLocal from './RadarLocal';
import RadarGalaxy from './RadarGalaxy';
import PauseStatus from './PauseStatus';
import TextContainer from './TextContainer';

function init() {
    TextContainer.init();
    PauseStatus.init();
    RadarLocal.init();
    RadarGalaxy.init();
    UnitDisplay.init();
    WeaponsDisplay.init();
}

function update() {
    TextContainer.update();
    RadarGalaxy.update();
    RadarLocal.update();
    UnitDisplay.update();
    WeaponsDisplay.update();
}

// Only display text for human team
// todo: move all TEAM references to constants.ts
const displayText = (team, text) => team === Entity.TEAM.MAGENTA? TextContainer.displayText(text) : null;

export default {
    init,
    update,
    displayText,
    setFocus:        RadarLocal.setOrigin,
    setPauseVisible: PauseStatus.setVisible
}