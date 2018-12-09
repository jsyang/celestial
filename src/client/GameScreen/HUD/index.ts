import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import Pointers from './Pointers';
import RadarGalaxy from './RadarGalaxy';
import PauseModal from './PauseModal';
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
    TextContainer.init();
    RadarGalaxyExpanded.init(controlInstance);
    CommandTextContainer.init();
    Reticles.init();
    PauseModal.init();
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
    PauseModal.update();
}

function onResize() {
    Pointers.onResize();
    RadarGalaxyExpanded.onResize();
    SpeedIndicator.onResize();
    TextContainer.onResize();
    CommandTextContainer.onResize();
    PauseModal.onResize();
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
    setPauseVisible:    PauseModal.setVisible,
    pauseModal:         PauseModal.modal
}