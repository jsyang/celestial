// Game feature toggle based on URL query string

enum GameFeature {
    AudioMuted          = 'mute',
    GeometryEditorInUse = 'editor',
    SkipTitleScreen     = 'game',
    GamePadInUse        = 'gamepad'
}

// Store all feature toggles
const queryStringOptions = location.search.slice(1).split('&');
const featureToggle      = {};
for (let i = queryStringOptions.length - 1; i >= 0; i--) {
    let [key, value]   = queryStringOptions[i].split('=');
    featureToggle[key] = value;
}

const getToggleStatus = (feature: GameFeature) => featureToggle.hasOwnProperty(feature);

export default {
    isAudioMuted:   getToggleStatus(GameFeature.AudioMuted),
    isGamePadInUse: getToggleStatus(GameFeature.GamePadInUse),

    shouldSkipTitleScreen: getToggleStatus(GameFeature.SkipTitleScreen),
    isGeometryEditorInUse: getToggleStatus(GameFeature.GeometryEditorInUse)
};
