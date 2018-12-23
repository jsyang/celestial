# Simplifying development tooling
_Tags: #tooling #code_
 
In progress 2018-12-22

Being a developer, writing code is preferable 9 times out of 10 to get something done on a software project.
For those other times, code can hinder rather than help the realization of ideas. Some factors that make it important
to have good tooling are:
 
1. To avoid having to write code when the task least requires it OR
2. The immediate results of writing code are not worth the effort AND
3. To ensure barriers for contributing to the project are minimized

For CelCom, there are three main tasks that required tooling of this sort. 

## Vector graphics

CelCom runs exclusively on vector graphics.
vector graphics are collections of points that form lines, and lines that form polygons to visually represent game entities.
They are drawn to the screen by the renderer and is one of the simplest ways to represent graphics on a computer. 
Vector graphics are storage-efficient and don't lose resolution after scaling. This makes them perfect for games that run
inside a web browser if they happen to fit the game style and the added computational cost of rendering them 
can be afforded.

coding these polygons by hand would be tedious every time you wanted to create or modify a polygon. so writing a tool
to do this makes perfect sense: the geometry editor is the resulting product.

### Geometry editor

You can use the geometry editor to create polygons to be displayed inside the game engine. 
[Launch geometry editor](http://jsyang.ca/celestial?editor).

![geometry editor](how-to-play/editor.png)

See `LETTERS` within `src/client/constants.ts` for an example of the output. Developers can also run the game locally
and start the editor there: 

1. `yarn watch`
2. http://localhost:3000/?editor

## Creating builds

Project used webpack to create a single client-side JS file that would minimize the number of network requests as well as
total loading time. As of 2018, webpack is the standard bundler for many JS projects. it has a vast collection of plugins
for configuring and transforming code and assets. 

The downside of webpack is having to configure the tool and then update these configs to do what you want requires 
significant effort. you have many categories of plugins that must be used in a coordinated fashion (and often times
individually configured) to build the bundle in exactly the way you know should be built. `webpack.config.js` files
could easily become sprawling messes of interdependent files on larger projects, commonly requiring the full attention
of at least one developer simply to keep the build toolchain up to date with the growth of a codebase. 

Some people thought there could be a better approach to doing this and started working on alternative tools with one
goal in mind: avoiding as much as config as possible while doing the same thing: compile client-side bundles.

### "Zero-config"

[ParcelJS](https://parceljs.org) is one such alternative to the config hell that many webpack projects become. It began 
a trend of thought for build tools in 2018 that quickly gained momentum. Plugins are automatically installed when required,
allowing the developer to focus more of their time on building features vs messing with the build infrastructure. 

- amount of config in code compared:

- link to last state of the webpack config file
- link to current parcel yarn scripts
 
not all perfect however, some things that are straightforward in webpack need clever workarounds / new ways of thinking
with parceljs. parceljs is also huge in terms of number of its child dependencies within node_modules, whereas this is 
limited with webpack (being explicitly defined).

- assets / helper scripts
- parcel specific quirks
    - node_modules is HUGE!
    - webpack still handles tree shaking better

## Releasing builds 

Hosting CelCom is provided by GitHub Pages: each commit into the `master` branch of the git repository publishes the 
codebase as a statically served website hosted on GitHub CDNs. This means publishing things is simple:

- no additional hosting provider is needed (same as version control provider)
- publishing new builds is done by modifying files and then committing them
- the general public receive updates immediately
- need to see which builds a client is receiving: create a readily visible build tag (tied to time of build and the
commit that was served)
    
