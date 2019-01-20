# Entity Component System (ECS)
_Tags: #architecture #patterns #code_

In progress 2018-01-20

Games are massively data-driven systems that require a balanced software architecture. With this, we desire to achieve:
- ease of development for creating and extending game behavior and logic
- flexibility in acccomodating many types of interacting game pieces

The ECS architectural pattern defines a game as interactions between 3 kinds of data:
1. **Entities**: common nouns, game things  (e.g. spaceships)
2. **Components**: adjectives, properties of game things (e.g. explodable)
3. **Systems**: sentences, how game things update when they have certain properties

## As implemented

In CelCom, all Entities (`src/client/Entity`) are classes, all extending a main base class `LivingEntity`.
We use classes and not POJOs (Plain-Old-Javascript-Objects) because there are times when it is more logical and convenient to call a class method than to have separate handlers for specific actions. A prime example being `LivingEntity.assignTeamColor()`.

These classes contain many properties, e.g. `x`, `y`, `rotation`. Some properties are tied
to a Component, which is a JS module that contains both the flag property for it, and the handler for the how the entity should update given that it has this property.

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