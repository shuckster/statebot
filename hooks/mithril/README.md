# statebot/hooks/mithril

Mithril Hooks for Statebot.

- [Statebot](https://github.com/shuckster/statebot) is a Finite State Machine library.
- [Mithril](https://mithril.js.org/) is an [SPA](https://en.wikipedia.org/wiki/Single-page_application) framework.
- [mithril-hooks](https://github.com/ArthurClemens/mithril-hooks) bring React-like Hooks to Mithril.

For React itself, see: [statebot/hooks/react](https://github.com/shuckster/statebot/tree/master/hooks/react)

- [Examples](#examples)
  - [useStatebot](#usestatebot)
  - [useStatebotFactory](#usestatebotfactory)
  - [useStatebotEvent](#useStatebotEvent)
- [Notes](#notes)
  - [useRef](#useref)
- [Contributing](#contributing)
- [License](#license)

# Examples

Installation:

```sh
npm i mithril mithril-hooks statebot
```

## useStatebot

For hooking-into Statebots that have life-cycles independent of the components that use them, `useStatebot`:

```jsx
import m from 'mithril'
import { withHooks as MithrilComponent } from 'mithril-hooks'

import { Statebot } from 'statebot'
import { useStatebot } from 'statebot/hooks/mithril'

export const loadMachine = Statebot('loader', {
  chart: `
    idle ->
      waiting ->
      loaded | failed ->
      idle
  `
})

loadMachine.performTransitions(({ emit }) => ({
  'idle -> waiting': {
    on: 'start-loading',
    then: () => {
      // Fail half the time for this demo
      const fail = Math.random() > 0.5
      setTimeout(() => {
        fail ? emit('error') : emit('success')
      }, 1000)
    }
  },
  'waiting -> loaded': {
    on: 'success'
  },
  'waiting -> failed': {
    on: 'error'
  }
}))

const { Enter, Emit, inState } = loadMachine

const LoadingButton = MithrilComponent(() => {
  const state = useStatebot(loadMachine)

  return m(
    'button',
    {
      className: state,
      onclick: Emit('start-loading'),
      disabled: !inState('idle')
    },
    inState('idle', 'Load'),
    inState('waiting', 'Please wait...'),
    inState('loaded', 'Done!'),
    inState('failed', 'Whoops!')
  )
})

const ResetButton = MithrilComponent(() => {
  return m(
    'button',
    {
      onclick: Enter('idle')
    },
    'Reset'
  )
})
```

You can play around with this one in a [CodeSandbox](https://codesandbox.io/s/statebot-mithril-brvwl?file=/src/Loader.js).

## useStatebotFactory

For Statebots whose life-cycles are tied to the components using them, `useStatebotFactory`:

```jsx
import m from 'mithril'
import { withHooks } from 'mithril-hooks'
import { useStatebotFactory } from 'statebot/hooks/mithril'

const CHART = `
  idle ->
    loading -> (loaded | failed) ->
    idle
`

const EVENT = {
  START_LOADING: 'start-loading',
  LOAD_SUCCESS: 'load-success',
  LOAD_ERROR: 'load-error'
}

const LoadingButton = withHooks(props => {
  const { state, bot } = useStatebotFactory('loading-button', {
    chart: CHART,
    startIn: 'idle',
    logLevel: 4,

    performTransitions: ({ Emit }) => ({
      'idle -> loading': {
        on: EVENT.START_LOADING,
        then: () => setTimeout(Emit(EVENT.LOAD_SUCCESS), 1000)
      },
      'loading -> loaded': {
        on: EVENT.LOAD_SUCCESS
      },
      'loading -> failed': {
        on: EVENT.LOAD_ERROR
      }
    }),

    onTransitions: () => ({
      'loading -> failed': () => {
        console.log('Oops...')
      }
    })
  })

  return (
    <button
      className={state}
      onClick={bot.Emit(EVENT.START_LOADING)}
      disabled={bot.inState('loading')}
    >
      {bot.inState('idle', 'Load')}
      {bot.inState('loading', 'Please wait...')}
      {bot.inState('loaded', 'Done!')} ({state})
    </button>
  )
})
```

## useStatebotEvent

To hook-into [onEvent](https://shuckster.github.io/statebot/#statebotfsmonevent), [onEntering](https://shuckster.github.io/statebot/#statebotfsmonentering)/[ed](https://shuckster.github.io/statebot/#statebotfsmonentered), [onExiting](https://shuckster.github.io/statebot/#statebotfsmonexiting)/[ed](https://shuckster.github.io/statebot/#statebotfsmonexited), [onSwitching](https://shuckster.github.io/statebot/#statebotfsmonswitching)/[ed](https://shuckster.github.io/statebot/#statebotfsmonswitched) with side-effects cleanup, `useStatebotEvent`:

```jsx
import m from 'mithril'
import { withHooks } from 'mithril-hooks'
import { Statebot } from 'statebot'
import { useStatebot, useStatebotEvent } from 'statebot/hooks/mithril'

const bot = Statebot('loader', {
  chart: `
    idle ->
      loading -> (loaded | failed) ->
      idle
  `
})

const { Enter, Emit, inState } = bot

const LoadingButton = withHooks(props => {
  const state = useStatebot(bot)

  useStatebotEvent(bot, 'onEntered', 'loading', () =>
    setTimeout(bot.Emit(EVENT.LOAD_SUCCESS), seconds(1))
  )

  // You can achieve the same with useEffect, and you
  // get more control over the dependencies, too:
  useEffect(() => {
    const cleanupFn = bot.onExited('loading', () =>
      setTimeout(bot.Enter('idle'), seconds(2))
    )
    return cleanupFn
  }, [bot])

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
})

function seconds(n) {
  return n * 1000
}
```

# Notes

As you can see, the examples use [JSX](https://reactjs.org/docs/introducing-jsx.html), which is not always typical of a Mithril project.

Here are some of the config settings for getting this working, if you're interested (lifted from the [Mithril docs](https://mithril.js.org/jsx.html)):

```sh
npm i --save-dev @babel/plugin-transform-react-jsx
```

```js
// .babelrc
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
        "pragma": "m",
        "pragmaFrag": "'['"
    }]
  ]
}

```

```sh
npm i --save-dev eslint-plugin-mithril
```

```js
// .eslintrc
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": ["plugin:mithril/recommended"]
}
```

## useRef

There's no `useRef` hook provided by `mithril-hooks`, but the following technique works for me:

```jsx
import m from 'mithril'
import { withHooks, useState } from 'mithril-hooks'

const ContainerWithRef = withHooks(props => {
  const { children, setRef = () => {} } = props || {}
  return <div oncreate={vnode => setRef(vnode.dom)}>{children}</div>
})

// Later...

const MyComponentThatNeedsAnElementRef = withHooks(props => {
  const { children } = props || {}
  const [elementRef, setElementRef] = useState()

  useEffect(() => {
    console.log('elementRef = ', elementRef)
  }, [elementRef])

  return (
    <>
      <ContainerWithRef setRef={setElementRef}>{children}</ContainerWithRef>
    </>
  )
})
```

# Contributing

This is a pretty basic implementation of hooks for Statebot. I don't _think_ much else is needed, but by all means fork and tinker with it as you like.

Of course, please stop-by the [Statebot repo](https://github.com/shuckster/statebot) itself. :)

## License

Statebot was written by [Conan Theobald](https://github.com/shuckster/) and is [MIT licensed](./LICENSE).
