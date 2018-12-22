# Entity Component System (ECS)
_Tags: #architecture #patterns #code_

2018-12-22

games are massively data-driven systems that require a software architecture
to afford the game developer enough ease and flexibility to create and extend
game behavior and logic, especially when the game has many types of interacting pieces

one common pattern used in writing logic for games is the Entity-Component-System
architectural pattern. it defines a game as interactions between 3 kinds of data:
1. game entities: the "things" of a game
2. components: the "properties" (or attributes) of a game "thing"
3. systems: how the game updates "things" because of their "properties"

## A concept re-adapted 

when creating new things, we don't always need to stick exactly to the definition of
the concept that we are implementing. there is always freedom to explore and experiment
with the methodology as long as the resulting product meets our high level requirements.

in this case, the requirement is that the game IS a game. how the logic is structured
can then be considered a side-effect, rather than the cause of the how the game behaves.

for celestial combat, entities are classes, all extending a main base class `LivingEntity`.
We use classes and not POJOs (Plain-Old-Javascript-Objects) because there are times when 
it is more logical and convenient to call a class method than to have a separate handlers
for specific actions. 

These classes contain many properties, e.g. `x`, `y`, `rotation`. Some properties are tied
to a Component, which is a JS module that contains both the flag property for it, and the
handler for the entity which owns that property.

A system in our implementation is at a conceptually higher level than the original ECS concept.
Systems handle how factions operate: 
- when do we create new entities
- when does a faction win / lose

- mermaid diagram: c4 zoom

## Alternatives to ECS

- alternative composition: mixins, messaging systems with central update authority
- deeply nested inheritance. example: https://github.com/lvella/xevil/blob/master/classes.txt 

pros and cons: each architectural pattern only makes as much sense as the
developer is able to parse + grok it. if deeply nested inherited OO makes sense to
one person but does not totally mesh with another then this can be a serious barrier for 
development. computers do not care what pattern is used. architecture is only for the benefit of developers. 

https://www.gamedev.net/forums/topic/665394-alternatives-to-entity-component-design/ 