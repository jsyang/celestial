import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import RadarLocal from './RadarLocal';
import RadarGalaxy from './RadarGalaxy';
import PauseStatus from './PauseStatus';
import TextContainer from './TextContainer';
import RadarGalaxyExpanded from './RadarGalaxyExpanded';
import {isHumanTeam} from '../../constants';
import SpeedIndicator from './SpeedIndicator';
import ScoreRankDisplay from './ScoreRankDisplay';

function init() {
    RadarLocal.init();
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
    RadarLocal.update();
    UnitDisplay.update();
    WeaponsDisplay.update();
    ScoreRankDisplay.update();
    RadarGalaxyExpanded.update();
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
    setFocus:        RadarLocal.setOrigin,
    setPauseVisible: PauseStatus.setVisible
}