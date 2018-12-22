# Fighter Spaceship AI
_Tags: #routines #behaviortree_
 
2018-12-xx

AI is a nebulous term, trending in the popular lexicon over the past few years.
In our case, game AI, specifically: game AI for Celestial Combat basically means
autonomous control of vehicles and structures within the game:
- non-human factions perform tasks to further themselves towards a single goal: winning the battle
- AI controlled spaceships use the same means to affect the game world [as their human counterparts so 
game immersion is left intact](https://tvtropes.org/pmwiki/pmwiki.php/Main/TheComputerIsaCheatingBastard)

As of this writing, the player can only control Fighter ships, all structures and craft are
computer controlled whether or not they belong to an AI faction.

The fighter ship is capable of 3 high level actions: moving to a location, attacking things,
and landing on planets.

## Moving

if docked, undock and increase speed until the ship is far enough away from the docking point.
once space-borne, accelerate until we get to a point where we need to begin decelerating to reach
our destination. the point when we need to start braking can be calculated based on the turn rate
and current speed.

## Attacking
enter an orbit around the target to be attacked and begin attacking within a close distance.
lead shots into the target based on how quickly the fighter is moving

only shoot if fighter is pointing towards the target. 

## Landing
same as attacking but as the distance between the fighter closes in on the planet, first priority
is ensuring that speed is below a certain number so a safe landing can happen.

emergent behavior: AI fighter will accelerate quickly away from the planet if the speed
was too fast to make the landing.  

## Behavior tree concepts
[Behavior trees](https://en.wikipedia.org/wiki/Behavior_tree_(artificial_intelligence,_robotics_and_control)) can be used as systems to compose game entity logic in a certain manner.
We can steal some useful ideas from behavior trees without taking the whole concept: 
1. Sequences: a list of tasks that quits on the first "failure" of a task
2. Selectors: a list of tasks that quits on the first "success" of a task

Using these, a holistic fighter AI can be composed from an set of elemental functions
that causes the fighter to do a single thing.  

Combining this with the usage of the testing scenario feature toggle, we can tweak the
configuration of the AI until it is good enough to resemble a human player.

Full source code for the fighter AI can be found in [`src/client/component/accelerateFighterToAttackTarget.ts`](https://github.com/jsyang/celestial/blob/master/src/client/component/accelerateFighterToAttackTarget.ts)