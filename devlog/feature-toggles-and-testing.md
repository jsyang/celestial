# Feature Toggles and Testing 
_Tags: #testing, #scenarios_
 
Written 2019-01-20

Some of the code for Celestial Combat has been structured to provide a easy facility for
switching major subsystems of the game on/off. Additionally, unit testing is not time-efficient
given the benefits vs effort involved: we offer a cheaper solution in the form of scenario tests.

## Feature toggles

You have the option of toggling game functionality via the URL you use to access the game.
The toggles are activated by the presence / absence of URL query strings: for instance,
to turn off all game audio:
 
- http://localhost:3000/?mute

or if you want to turn off all audio AND skip the title screen:

- http://localhost:3000/?mute&game

See `src/client/startupOptions.ts` for a full list of feature toggles.

```
    AudioMuted          = 'mute',
    GamePadInUse        = 'gamepad',
    SkipTitleScreen     = 'game',
    GeometryEditorInUse = 'editor',
    TestSectorInUse     = 'test'
```

#### Scenario tests

Using the scenario feature toggle, you can establish a controlled environment 
where you can set exactly what the starting state is and see the emergent behaviors of
your system unfold.

- `yarn watch`
- Edit `src/client/TestScreen/ScenarioSystem.ts` to create the scenario's initial conditions

For example:
```typescript
function init() {
    // Create enemy solar system with 1 star and 1 unpopulated planet
    const star = Entity.create('Star', {x: 5000, y: 5000});

    const planet = Entity.create('Planet', {
        star,
        orbitDistance: 1600 + 2 * 800,
        orbitRotation: 0
    });

    planet.team = enemyTeam;
    planet.updateFlagColor();

    // Create an attacker that targets this planet and will attempt to land
    // to lay claim to it
    const fighter = Entity.create('Fighter', {
        x:                        15000,
        y:                        15000,
        isFighterAutoAccelerated: true,
        team:                     focusTeam,
        attackTarget:             planet
    });

    Focus.setFocus(fighter);
}
```

You may then observe the scenario unfold at: http://localhost:3000/?test&game , and 
tweak entity / component values and logic accordingly until the desired behaviors are achieved.
