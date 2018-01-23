import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import RadarLocal from './RadarLocal';
import RadarGalaxy from './RadarGalaxy';
import PauseStatus from './PauseStatus';
import TextContainer from './TextContainer';
import {TEAM} from '../../constants';

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

function displayText(team, text) {
    // Only display text for human team
    if (team === TEAM.MAGENTA) {
        TextContainer.displayText(text);
    }
}

export default {
    init,
    update,
    displayText,
    setFocus:        RadarLocal.setOrigin,
    setPauseVisible: PauseStatus.setVisible
}