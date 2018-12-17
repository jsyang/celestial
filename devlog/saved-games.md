# Implementing saved games
_Tags: #featuredev, #code_
 
2018-12-16

Celestial Combat is a game a large ambition and potential scope. Players fight
cut-throat battles that span solar systems and galaxies with hundreds of ships and
planet sized caches of materials for war production.

I've previously put off implementing saving and loading game states because
gameplay itself took first priority, but as that became solidified, the question of
how to persist a player's progress grew louder. Purpose is simple:
giving players a way to save their score and progress within a battle means
they are likely to come back to the game because some semblance of progress can be
accumulated. People are familiar with this.


---

key concept is serialization

entities already ripe for this, due to ECS. but entities have references to other entities: how to handle this?

use creation Ids, handle serialization of reference fields differently when serializing a whole entity:
use a serialization map. in my instance, i combined relevant fields that were attributable to specific components into a map for the entire entity.

once serialized, you will need some way of recreating those references when loading a saved game
with creation ids, you can do this in 2 passes:

deserialize the saved game data into an intermediate state: all entities are created but references are not yet linked
inflate the references by retrieving the entities referenced by creation ID so these fields become pointed to other entities as they were previously

save game handling: currently compressed JSON stored in localstorage

Will want to save other info about a game state, not just entities:
rank
score
number of consecutive wins / losses (for game over)

examples in code.