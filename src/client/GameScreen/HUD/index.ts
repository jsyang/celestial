import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import Pointers from './Pointers';
import RadarGalaxy from './RadarGalaxy';
import PauseStatus from './PauseStatus';
import TextContainer from './TextContainer';
import RadarGalaxyExpanded from './RadarGalaxyExpanded';
import {isHumanTeam} from '../../constants';
import SpeedIndicator from './SpeedIndicator';
import ScoreRankDisplay from './ScoreRankDisplay';

function init() {
    Pointers.init();
    RadarGalaxy.init();
    UnitDisplay.init();
    WeaponsDisplay.init();
    SpeedIndicator.init();
    ScoreRankDisplay.init();
    RadarGalaxyExpanded.init();
    TextContainer.init();
    PauseStatus.init();
}

function update() {
    SpeedIndicator.update();
    TextContainer.update();
    RadarGalaxy.update();
    Pointers.update();
    UnitDisplay.update();
    WeaponsDisplay.update();
    ScoreRankDisplay.update();
    RadarGalaxyExpanded.update();
}

function onResize() {
    // Pointers.onResize();
    RadarGalaxyExpanded.onResize();
    SpeedIndicator.onResize();
    TextContainer.onResize();
    PauseStatus.onResize();
}

function displayText(team, text) {
    if (isHumanTeam(team)) {
        TextContainer.displayText(text);
    }
}

export default {
    init,
    update,
    displayText,
    onResize,
    setFocus:        Pointers.setOrigin,
    setPauseVisible: PauseStatus.setVisible
}