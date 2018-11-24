// Game feature toggle based on URL query string

enum GameFeature {
    AudioMuted          = 'mute',
    GamePadInUse        = 'gamepad',

    SkipTitleScreen     = 'game',
    GeometryEditorInUse = 'editor',
    TestSectorInUse     = 'test'
}

const featureToggle: Record<string, any> = {};

// Populate dictionary of game feature toggles
location.search.slice(1).split('&')
    .forEach(keyValue => {
        let [key, value]   = keyValue.split('=');
        featureToggle[key] = value;
    });

const getToggleStatus = (feature: GameFeature) => featureToggle.hasOwnProperty(feature);

export default {
    isAudioMuted:   getToggleStatus(GameFeature.AudioMuted),
    isGamePadInUse: getToggleStatus(GameFeature.GamePadInUse),

    shouldSkipTitleScreen: getToggleStatus(GameFeature.SkipTitleScreen),
    isTestSectorInUse:     getToggleStatus(GameFeature.TestSectorInUse),
    isGeometryEditorInUse: getToggleStatus(GameFeature.GeometryEditorInUse)
};
