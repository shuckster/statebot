# Statebot

<img src="./docs/logo-full.png" width="255" />

Write more robust and understandable programs.

Statebot hopes to make [Finite State Machines](https://en.wikipedia.org/wiki/Finite-state_machine) (FSMs) a little more accessible by focussing on their organisational benefits in a simplified way.

It's less than 8K gzipped, runs in Node and the browser, and is a [shell-script](https://github.com/shuckster/statebot-sh/) too.

- [Full documentation](https://shuckster.github.io/statebot/)

There is a lot of prior-art out there, most notably [XState](https://github.com/davidkpiano/xstate) by David Khourshid, but I hope Statebot can offer a small contribution in the field of writing code that is easier to understand six-months after it has been written.

- [Installation](#installation)
- [Quick Start](#quick-start)
  - [React example](#react-example)
  - [Node.js example](#nodejs-example)
- [Events](#events)
- [Passing data around](#passing-data-around)
- [Testing](#testing)
- [Chart Syntax](#chart-syntax)
  - [Examples of real charts](#examples-of-real-charts)
- [Why?](#why)
- [Contributing](#contributing)
  - [Credits](#credits)
  - [License](#license)

# Installation

```sh
npm i statebot
```

```js
<script src="https://unpkg.com/statebot@2.3.2/dist/browser/statebot.min.js"></script>
```

Or just download a script from the `dist/` folder and include it in your project. `statebot.dev.js` files include `JSDoc` comments, which IDEs like VS Code can pick-up to offer autocompletion.

## Quick Start:

### React example:

(You can play around with this in a [CodeSandbox](https://codesandbox.io/s/statebot-react-ot3xe?file=/src/Loader.js).)

```jsx
import React, { useState, useEffect } from 'react'
import { Statebot } from 'statebot'

// Using Statebot with React requires a 3-line Hook:
function useStatebot(bot) {
  const [state, setState] = useState(bot.currentState())
  useEffect(() => bot.onSwitched(setState), [bot])
  return [state]
}

const loader$bot = Statebot('loader', {
  chart: `
    idle ->
      loading -> (loaded | failed) ->
      idle
  `
})

loader$bot.performTransitions(({ Emit }) => ({
  'idle -> loading': {
    on: 'start-loading',
    then: () => setTimeout(Emit('success'), 1000)
  },
  'loading -> loaded': {
    on: 'success'
  },
  'loading -> failed': {
    on: 'error'
  }
}))

const { Enter, Emit, inState } = loader$bot

function LoadingButton() {
  const [state] = useStatebot(loader$bot)

  return (
    <button
      className={state}
      onClick={Emit('start-loading')}
      disabled={inState('loading')}
    >
      {inState('idle', 'Load')}
      {inState('loading', 'Please wait...')}
      {inState('loaded', 'Done!')} ({state})
    </button>
  )
}
```

### Node.js example:

```js
const { Statebot } = require('statebot')

// Describe states + transitions
const machine = Statebot('promise-like', {
  chart: `
    idle ->

      // This one behaves a bit like a Promise
      pending ->
        (resolved | rejected) ->
      done
  `,
  startIn: 'pending'
})

// Handle events...
machine.performTransitions({
  'pending -> resolved': {
    on: 'success'
  }
})

// ...and/or transitions
machine.onTransitions({
  'pending -> resolved | rejected': () => {
    console.log('Sweet!')
  }
})

machine.onExiting('pending', toState => {
  console.log(`Off we go to: ${toState}`)
})

machine.canTransitionTo('done')
// false

machine.statesAvailableFromHere()
// ["resolved", "rejected"]

machine.emit('success')
// "Off we go to: resolved"
// "Sweet!"
```

# Events

**Statebot** creates state-machines from `charts`, and we can switch states `on` events using `performTransitions`:

```js
machine.performTransitions({
  'pending -> resolved': {
    on: 'data-loaded'
  }
})

// ^ This API is designed to read like this:
//   machine, perform transition "pending to
//   resolved" on "data-loaded".
```

Let's do a little more:

```js
machine.performTransitions({
  'pending -> rejected': {
    on: ['data-error', 'timeout'],
    then: () => {
      console.warn('Did something happen?')
    }
  },

// ^ We can run something after a transition
//   happens with "then". Notice this will
//   happen after the "data-error" OR
//   "timeout" events.

  'resolved | rejected -> done': {
    on: 'finished'
  }

// ^ We can configure lots of transitions inside
//   one `performTransitions`. Here's one that
//   will switch from "resolved to done" OR
//   "rejected to done" when the "finished"
//   event is emitted.

})

// In this API, when events are emitted they
// can pass arguments to the "then" method.

// See the section below on "Passing data around".
```

We can also do stuff when states switch with `onTransitions`:

```js
machine.onTransitions({
  'pending -> resolved': function () {
    console.log('Everything went lovely...')
    machine.enter('done')
  },

  'pending -> rejected': function () {
    console.warn('That did not go so well...')
    machine.enter('done')
  },

  'resolved | rejected -> done': function () {
    console.log('All finished')
  }
})
```

Let's do a little more:

```js
machine.onTransitions(({ emit, Emit }) => ({
  'idle -> pending': function () {

// ^ This API is designed to read like this:
//   machine, on transition "idle to pending",
//   run a callback.

    getSomeData().then(
      (...args) => emit('data-loaded', ...args)
    )

// ^ emit() or Emit()? Which one to use? Maybe
//   you can infer the different meanings from
//   the .catch() of this Promise:

    .catch(Emit('data-error'))

// ^ Got it? Emit() is shorthand for:
//     (...args) => emit('event', ...args)
//
//   So emit() fires immediately, and Emit()
//   generates an emitter-method.

  }
}))

// In this API, the state-switching functions
// enter() and Enter() can pass arguments to
// these callbacks.

// See the section below on "Passing data around".
```

Both `performTransitions` and `onTransitions` take objects or functions that return objects in order to configure them.

Object:

```js
machine.onTransitions({
  'idle -> pending': // etc...
```

Function:

```js
machine.onTransitions(({ emit, enter, Emit, Enter }) => ({
  'idle -> pending': // etc...
```

In the case of a function, a single argument is passed-in: An object containing helpers for **emitting events** and **entering states**. In the above example we're pulling-in the helpers `emit` and `enter`, and also their corresponding factories: `Emit` and `Enter`.

Of course, you don't have to use an "implicit return":

```js
machine.onTransitions(({ emit, Emit, enter, Enter }) => {
  // Setup, closure gubbins and so on...

  return {
    'idle -> pending': // etc...
  }
})
```

`performTransitions` hitches onto events, and `onTransitions` hitches onto state-transitions.

A Statebot FSM can have as many `hitchers` as you like, or none at all.

In any case, once an FSM is configured we are sometimes only interested in the state we are currently `in`, about to `exit`, or about to `enter`. There are hitchers for those, too:

```js
machine.onExiting('pending', toState => {
  console.log('we are heading to:', toState)
})

machine.onEntered('done', fromState => {
  console.log('we came from:', fromState)
})

machine.currentState()
machine.previousState()
```

You can use the following snippet to tinker with the examples above:

```js
function getSomeData() {
  return new Promise(
    (resolve, reject) => {
      setTimeout(resolve, 1000)

      // Randomly reject
      setTimeout(reject,
        500 + Math.round(Math.random() * 750)
      )
    }
  )
}

// Randomly timeout
setTimeout(() => machine.emit('timeout', true),
  750 + Math.round(Math.random() * 750)
)

machine.enter('pending')
```

# Passing data around

Events can pass data to callbacks using `emit`:

```js
machine.performTransitions({
  'pending -> resolved': {
    on: ['data-loaded'], // event name(s)
    then: (...args) => {
      console.log('Received:', args)
    }
  }
})

machine.emit('data-loaded', 1, 2, 3)

// Console output:
// > Received: [1, 2, 3]
```

The state-switching method `enter` can pass data, too:

```js
machine.onTransitions({
  'idle -> pending': (...args) => {
    console.log('onTransitions:', args)
  }
})

machine.onEntering('pending',
  (fromState, ...args) => {
    console.log('onEntering:', args)
  }
)

machine.onExited('pending',
  (toState, ...args) => {
    console.log('onExited:', args)
  }
)

machine.enter('pending', 'a', 'b', 'c')
machine.enter('resolved', 3, 2, 1)

// Console output:
// > onEntering: ["a", "b", "c"]
// > onTransitions: ["a", "b", "c"]
// > onExited: [3, 2, 1]
```

# Logging

A Statebot FSM is a pretty noisy thing by default.

You can tone-it down using the `logLevel` argument in its options:

```js
const machine = Statebot('example', {
  // ...
  logLevel: 2 // Everything except console.info()
})
```

- A zero `0` here means silence
- One `1` prints `console.warn()`'s
- Two `2` prints warnings, plus `console.log()` + `console.table()`
- Three `3` prints all the above, plus `console.info()`

`3` is the default. Argument type-errors will always `throw`.

# Testing

`assertRoute` can be used to test if an FSM traced a particular route:

```js
const { assertRoute } = require('statebot')

assertRoute(
  machine, 'pending -> resolved -> done',
  {
    description: 'Data loaded with no issues',
    fromState: 'idle',
    timeoutInMs: 1000 * 20,
    permittedDeviations: 0
  }
)
.then(() => console.log('Assertion passed!'))
.catch(err => console.error(`Hot fudge: ${err}`))

machine.enter('idle')
```

As you can see, it returns a `Promise` that you can use with an assertion-library.

The method itself produces output using `console.table`:

```bash
[example] aId<1>: Data loaded with no issues: [FAILED]
┌─────────┬────────────┬────────────┬───────────────────────┬──────────────────┐
│ (index) │   states   │  expected  │         info          │       took       │
├─────────┼────────────┼────────────┼───────────────────────┼──────────────────┤
│    0    │  'pending' │ 'pending'  │ 'OKAY               ' │ '          2 ms' │
│    1    │ 'rejected' │ 'resolved' │ 'WRONG STATE        ' │ '       0.73 s ' │
│    2    │ 'rejected' │ 'resolved' │ 'TOO MANY DEVIATIONS' │ '              ' │
│    3    │ 'rejected' │  '(done)'  │ 'TOO MANY DEVIATIONS' │ '              ' │
│    4    │     ''     │     ''     │ '                   ' │ 'TOTAL: 0.74 s ' │
└─────────┴────────────┴────────────┴───────────────────────┴──────────────────┘
```

`aId<1>` means `assertRoute` has run once so far.

You can also check if a certain route can be followed with `routeIsPossible`:

```js
const { routeIsPossible } = require('statebot')

routeIsPossible(machine, 'pending -> resolved -> pending')
// false
```

# Chart Syntax

Statebot charts are just strings, or arrays of strings:

```js
var oneLiner = '-> idle -> done'
var multiLiner = [
  '-> idle',
  'idle -> done'
]
```

We can use [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to make more readable charts in modern JavaScript:

```js
const chart = `
  -> idle
  idle -> done
`
```

Charts list all _states_ and the allowed _transitions_ between them using `->`.

```js
const fsm = Statebot('just a name', {
  chart: `

    -> idle
    idle -> done

  `,
  startIn: 'idle'
})
```

**Careful now:** When `startIn` is absent the default state is inferred from the first state seen in the chart. Also, empty-strings are valid states: The first-line of this chart allows transitioning from `''` to `'idle'`, and the empty-string would be the starting-state if `startIn` were omitted.

The pipe-character `|` means _OR_:

This...

```
  pending -> resolved | rejected
  resolved | rejected -> done
```

...is shorthand for this...

```
  pending -> resolved
  pending -> rejected
  resolved -> done
  rejected -> done
```

...which is also equivalent to:

```
  pending -> (resolved | rejected) -> done
```

Notice the use of parentheses `()`. These are completely ignored by the parser and just provide syntactic sugar.

Any lines ending with `->` or `|` are considered to be part of the next line.

This...

```
  pending ->
    resolved |
      rejected
```

...is the same as this:

```
  pending -> resolved | rejected
```

Comments are allowed:

```
  // These comments
  pending ->
    resolved |  // will be
      rejected  // ignored
```

Indentation has no meaning.

## Examples of real charts

Here are some charts I've used with Statebot:

### Web-server:

```js
  // Static files
  booting ->
    image-meta -> templates -> pages

  // If pages are ready, start the web-server
  pages -> webserver

  // Problem...?
  (booting | image-meta | templates | pages | webserver) ->
    failed ->
    // A watchdog will restart the web-server
      report-and-quit
```

### Email sender:

```js
  idle -> send

  // Let's wait a few seconds before committing...
  (send | update) ->
    debounce -> sending |
      (update | cancel)

  sending -> (sent | failed)

  // All done!
  (sent | cancel | failed) -> done
```

### Drag-and-drop:

```js
  idle ->
    drag-detect ->
      (dragging | clicked)

  // Click detected!
  clicked -> idle

  // Drag detected!
  dragging ->
    drag-wait -> dragged -> drag-wait

  // Drag finished...
  (drag-wait | dragged) ->
    (drag-done | drag-cancel) ->
      idle
```

The [documentation](https://shuckster.github.io/statebot/) has a few more examples.

# Why?

> "The initial mystery that attends any journey is: How did the traveller reach his starting-point in the first place?" -Louise Bogan

I wrote Statebot to learn about FSMs, but really I ended up learning more about writing programs in general, and what I do and do not like about the process.

- 👎 I don't like sprawling configuration

- 👎 I don't like all-or-nothing APIs

- 👍 I do like things that permit clear separation of concerns

- 👍 I do like limitations that aim to encourage this

Not that I'm any good at following these myself, but it's good to have aspirations!

But above all, state-machines are extremely useful when it comes to *reading old code*. Their innate robustness and predictability are an added bonus.

With Statebot, code can be marshalled into a shape that "fans-out":

1. I can get the gist of a program from the `chart` at the top. I love the fact that it almost looks like a code-comment, but it's actually configuration.

2. Looking at how the hitchers wire-up the `transitions` gives a little more insight into the moving-parts.

3. Finally, the `callbacks` pull-in all the business-logic. This might still be a huge jumbled mess of course, but at least at this point I'll have a few leads into what's supposed to be going on.

Statebot charts look the way they do because I wanted to try to express, in code, the visualisation tools often used to represent FSMs.

Frankly, this does add a bit of redundancy when using Statebot. Transitions are repeated between charts and hitchers, and there can be a bit of to-ing and fro-ing to get them right. But for me, the pay-off of being able to jump-in to an old piece of code and grok it quickly is worth it.

I guess the bottom-line with any tool is to use it sparingly and appropriately, and the same applies with Statebot.

# Contributing

I consider the API stable and would not like it to change much. I don't want it to become a store or data-manager. Many APIs exist that are dedicated to such tasks. I'd really like to keep Statebot lean.

Of course, bug-fixes, forks, and integrations are very welcome.

Here are the things I'd personally like to work on:

- Tests using [FastCheck](https://github.com/dubzzz/fast-check)
- Examples using other libraries, such as React
- Determine compatible browser/Node versions beyond just specifying a browserslistrc
- The documentation-theme is hacked about using awk. Maybe let's not do that :P

## Credits

Statebot was inspired by a trawl through Wikipedia and Google, which in turn was inspired by [XState](https://github.com/davidkpiano/xstate) by David Khourshid. You should check it out.

Statebot integrates [events](https://www.npmjs.com/package/events) for the browser-build.

The Statebot logo uses the "You're Gone" font from [Typodermic Fonts](https://typodermicfonts.com/youre-gone/). The logo was made with [Acorn](https://flyingmeat.com/acorn/). The documentation is written in [JSDoc](https://jsdoc.app/) and is built with [documentation.js](http://documentation.js.org/).

Statebot was written by [Conan Theobald](https://github.com/shuckster/).

<img src="./docs/logo-small.png" width="75" />

## License

Statebot is [ISC licensed](./LICENSE).
