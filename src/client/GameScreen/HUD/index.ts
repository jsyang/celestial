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
import Reticles from './Reticles';
import CommandTextContainer from './CommandTextContainer';

function init(controlInstance?) {
    Pointers.init();
    RadarGalaxy.init();
    UnitDisplay.init();
    WeaponsDisplay.init();
    SpeedIndicator.init();
    ScoreRankDisplay.init();
    RadarGalaxyExpanded.init(controlInstance);
    TextContainer.init();
    CommandTextContainer.init();
    PauseStatus.init();
    Reticles.init();
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
    Reticles.update();
}

function onResize() {
    Pointers.onResize();
    RadarGalaxyExpanded.onResize();
    SpeedIndicator.onResize();
    TextContainer.onResize();
    CommandTextContainer.onResize();
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
    displayCommandText: CommandTextContainer.displayText,
    setFocus:           Pointers.setOrigin,
    setPauseVisible:    PauseStatus.setVisible
}