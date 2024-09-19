---
title: "Noita Dev Log"
publishDate: "2024-09-19"
---

# Noita Dev Log

- [Noita uses ECS for their game engine](https://noita.wiki.gg/wiki/Modding:_Basics)
- [Noita Gameplay - Explaining what every pixel is simulated means](https://www.youtube.com/watch?v=0We8a8AFPp8)
- Fantastic [Particle System](/particle_systems.md)
- Note: [the sand simulation itself don't use ECS, it would be very slow to have every grain of sand be an entity on its own. A dictated game engine tightly coupled to the simulation is needed. Fragment shader could also help. However, other game stuffs like characters or spells, ECS would be a great fit.](https://www.reddit.com/r/rust_gamedev/comments/y9bl1o/ecs_for_falling_sand_simulation/)

## QNA from noita Dev

[ref: Reddit post](https://www.reddit.com/r/gamedev/comments/d93op6/noita_pixel_simulation_any_tip_about_how_is_it/)

Q:  Hi, I'm playing Noita and I think it is awesome how they simulate every pixel on screen. Any tip about how they have managed to accomplish this?

A:  I don't know how you want to go about doing this kind of simulation, but we have our custom engine that's written in C++. The simulation is done on the CPU, mostly it comes down to figuring out how to update things effectively.

There's 2 talks I've given.

One of them is the GDC talk - <https://www.youtube.com/watch?v=prXuyMCgbTc>

Second one is the Fantastic Arcade talk - <https://youtu.be/kZsMZjzT0ZM?t=3500>

Q: I'm very curious about how the data was stored.

Also, did you process everything off-screen as well? How would you have delt with water flowing off-screen if not?

lastly, how did you "combine" pixels into solid objects, like the falling ice in the trailer.

A: The world is divided into 512x512 chunks. As you move in the world, more of these 512x512 chunks are generated by the procedural generation system. And the old ones are saved to the disk. The game tries to keep 12 of these going at any point.

To update things that are outside the screen, the game just keeps of list of areas to update and updates those. Sometimes you might come across a shelf of liquids that fall down when you see them, but it rare enough that it doesn't cause any real issues.

Pixels are combined into solid objects by triangulating them and then giving those polygons to box2d.