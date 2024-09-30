---
title: Entity Component System (ECS)
publishDate: 2024-09-20
---

# Entity Component System (ECS)

- ECS is about separating data and functionality. Resolving collisions and emmitting particles are functionality, not data, so they'd be in a system and wouldn't be 'owned' by anyone.
- In ECS you process everything in bulk. And usually in ECS, you work with Ids and not with references or heirarchical data. Everything is flat. Everything's in lists.
- Entity component systems are great for when you need to quickly iterate over all instances (usually on one of the attributes, such as position). Since most servers are reactive there is no need to optimise for iteration, instead focusing on quickly finding the few entities being operated upon.
- ECS is the in-memory equivalent of column based databases (e.g. Cassandra vs Postgres).
- [Overwatch uses ECS for part of their game engine](https://www.youtube.com/watch?v=W3aieHjyNvw)
- [Minecraft Bedrock Edition uses ECS for their game engine](https://github.com/SanderMertens/ecs-faq#how-is-ecs-different-from-entity-component-frameworks)
- [Noita uses ECS for their game engine](noita.md)
- Potential usecases
  - Vampire survivor: Many similar entities

## Why you don't use it

- [Bob Nystrom - Is There More to Game Architecture than ECS?](https://www.youtube.com/watch?v=JxI3Eu5DPwE)
