# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.1.3] - 2023-04-13

### Fixed

- Oh dear: require() should be import

## [3.1.2] - 2023-04-13

### Fixed

- Bad require() path

## [3.1.1] - 2023-04-13

### Updated

- README tweaks

## [3.1.0] - 2023-04-13

### Added

- `mermaid` helper function to allow Mermaid state-diagrams to be used with Statebot:

```js
import { Statebot, mermaid } from 'statebot'

const fsm = Statebot('traffic-lights', {
  chart: mermaid`
    stateDiagram
    direction LR
      go --> prepareToStop
        prepareToStop --> stop

      %% ...gotta keep that traffic flowing
      stop --> prepareToGo
        prepareToGo --> go
  `
})
```

Front-matter is ignored:

```js
import { Statebot, mermaid } from 'statebot'

const fsm = Statebot('traffic-lights', {
  chart: mermaid`
    ---
    title: Traffic lights
    ---
    stateDiagram
    direction LR
      go --> prepareToStop
        prepareToStop --> stop

      %% ...gotta keep that traffic flowing
      stop --> prepareToGo
        prepareToGo --> go
  `
})
```

`:::` blocks are also ignored, which is useful because the Mermaid Preview extension for VS Code will display a chart when the cursor is placed between the blocks:

```js
import { Statebot, mermaid as mmd } from 'statebot'

const fsm = Statebot('traffic-lights', {
  chart: mmd`
    ::: mermaid
    stateDiagram
    direction LR
      go --> prepareToStop
        prepareToStop --> stop

      %% ...gotta keep that traffic flowing
      stop --> prepareToGo
        prepareToGo --> go
    :::
  `
})
```

> **Note:** Mermaid start `[*] -->` and stop `--> [*]` states will become `__START__` and `__STOP__` Statebot states respectively.

## [3.0.7] - 2023-02-03

### Fixed

- package.json .mjs exports for Hooks

## [3.0.6] - 2023-02-03

### Changed

- Most .js extensions are now .mjs. Hopefully this fixes compatibility with newer Jest versions

## [3.0.5] - 2022-07-09

### Updated

- README tweak

## [3.0.4] - 2022-07-09

### Fixed

- Typedefs for TStatebotFsm should be methods rather than props

## [3.0.3] - 2022-07-07

### Updated

- Exclude mitt from cjs/esm build: It's specified as a regular dependency now
- Remove .dev from build filenames
- Tweak README as JSDoc lives in index.d.ts now

## [3.0.2] - 2022-07-07

### Fixed

- Out of date types locations in package.json

## [3.0.1] - 2022-07-07

### Updated

- Links to hooks

## [3.0.0] - 2022-07-07

### BREAKING CHANGES

Imports updated:

- `routeIsPossible` / `assertRoute` now come from 'statebot/assert'
- React/Mithril Hooks can be imported from 'statebot/hooks/react' and 'statebot/hooks/mithril'. There are no longer separate packages for these.

### Updated

- Documentation now built with Typedoc
- Typedefs are now manually updated instead of generated from jsdoc

## [2.9.3] - 2022-01-11

### Fixed

- Fix esbuild error by re-ordering package.json exports

## [2.9.2] - 2021-12-20

### Fixed

- Fix WebPack error: "Default condition should be last one"

## [2.9.1] - 2021-12-18

### Fixed

- Replace nullish coalescing `??` with ternary to fix Bundlephobia error.

## [2.9.0] - 2021-12-18

### Added

- peek(eventName, stateObject?), tests, documentation
- canTransitionTo('state', { afterEvent: 'event' }), tests, documentation

### Updated

- Updated dependencies

## [2.8.1] - 2021-09-04

### Updated

- Updated dependencies, tweaked README

## [2.8.0] - 2021-06-07

### Added

- If a `performTransition` `then` method or `onTransitions` callback
  return a function, it will be invoked when the state is exited in the
  same manner as if an `.onExiting()` handler was created using it.

## [2.7.4] - 2021-04-25

### Fixed

- Guard against wrapped-on() args not being an array

## [2.7.3] - 2021-04-25

### Updated

- Dependencies, package.json tweaks

## [2.7.2] - 2021-01-22

### Fixed

- Wrong package.json setting for Node

## [2.7.1] - 2021-01-17

### Fixed

- Updated README example required commas

## [2.7.0] - 2021-01-17

### Added

- inState/InState now supports an object for config as well as a string:

```js
inState('idle')
// true | false

inState('idle', 'waiting')
// "waiting" | null

inState({
  idle: 'hold up',
  success: () => 'fn-result',
  done: <JSX />
})
// "hold up" | "fn-result" | <JSX /> | null
```

## [2.6.3] - 2021-01-13

### Added

- package.json exports

## [2.6.2] - 2021-01-04

### Fixed

- Revert previous argument-defaults tweak, as it bugged Enter(). Fixed, regression test added

### Added

- Further tests for arity of emit/Emit

### Changed

- Replace padLeft/padRight with padEnd/padStart respectively

## [2.6.1] - 2021-01-02

### Updated

- Add code-comments to make CodeFactor happy with documentation page
- Remove argument-defaults to reduce compiled/minified code-size slightly

## [2.6.0] - 2020-12-30

### Changed

- Now using Mitt for events
- Changed license from ISC to MIT

## [2.5.1] - 2020-08-11

### Fixed

- Custom event-emitter support broken in previous commit (emit not working)

## [2.5.0] - 2020-08-10

### Updated

- Dependencies
- Throws if invalid event-emitter passed-in

### Added

- Compatibility with mitt event-emitter library
- inState + statesAvailableFromHere tests
- More links for pause/resume/paused in docs
- Build-comments for CodeFactor

## [2.4.0] - 2020-07-23

### Updated

- Dependencies

### Added

- pause/paused/resume methods, tests, docs

## [2.3.10] - 2020-07-15

### Updated

- Put an example at the top of the README to get to the point more quickly :P

## [2.3.9] - 2020-07-14

### Fixed

- routeIsPossible() did not support "backtracking" in some cases

### Added

- Basic tests for backtracking

## [2.3.8] - 2020-07-11

### Fixed

- Charts with empty-strings for states were not always parsing properly

### Added

- Added tests for charts with empty-strings
- Added tests for callback-counts + ordering
- Tweak Hook-examples in the README

## [2.3.7] - 2020-07-06

### Fixed

- .DS_Store snuck into dist/
- Build index.d.ts automatically, fixing broken autocompletion
- ESM build renamed from .mjs to .js, since tsc won't read it to build index.d.ts otherwise

## [2.3.6] - 2020-07-06

### Changed

- Use ES6 import/export syntax in source-files (slightly small dist/ files resulted)
- Put dev source-maps in their own files

### Added

- Build ES6 module in dist/esm
- Got started with some basic tests
- React Hooks :) and Mithril ones, too

## [2.3.5] - 2020-06-22

### Fixed

- Fix require().default regression in Rollup config

## [2.3.4] - 2020-06-22

### Added

- Build documentation.js JSON in `docs/` for tinkering

### Fixed

- Compatibility with projects using Rollup

### Updated

- Emphasise in docs that Statebot isn't bound to a particular framework
- Updated babel, documentation, eslint, rollup

## [2.3.3] - 2020-06-14

### Added

- Include a React example in docs + README

## [2.3.2] - 2020-05-29

### Fixed

- Typo in code

### Changed

- A few more README tweaks

## [2.3.1] - 2020-05-27

### Fixed

- Fix docs for updated Enter/Emit

## [2.3.0] - 2020-05-27

### Added

- Enter/Emit can accept arguments that will curry into the functions
  they return.
- inState now fully documented.
- InState supports currying arguments into outputWhenTrue() argument.

## [2.2.1] - 2020-05-26

### Fixed

- A few JSDoc links weren't working
- VS Code autocomplete wasn't working fully

## [2.2.0] - 2020-05-25

### Changed

- Migrated from Webpack to Rollup; smaller min builds, UMD build
- Add "files" to package.json to reduce npm module size
- Reduce code-size a little

## [2.1.1] - 2020-05-23

### Changed

- README tweaks
- Upgrade dev-dependencies

## [2.1.0] - 2020-04-24

### Fixed

- Browser build now uses 'var' webpack option rather than 'umd'

### Changed

- Lua inspired 'coroutine' chart in the JSDocs

## [2.0.0] - 2020-04-20

### Changed

- Updated disallowed characters for cross-env compatibility of charts.

  This was a tiny change to Statebot, but will break any charts using
  the characters now excluded (probably none at this point!) Still,
  it's good to show semver willing, eh? ;)

### Added

- Include links to the shell-port, Statebot-sh

## [1.0.6] - 2020-04-13

### Fixed

- Various post-publishing documentation fixes

## [1.0.0] - 2020-04-13

### Added

- Statebot :)
