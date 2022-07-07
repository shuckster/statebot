export const makeHooks = ({ Statebot, useEffect, useState, useMemo }) => {
  if (![useEffect, useState, useMemo].every(x => typeof x === 'function')) {
    console.warn('Statebot Hooks unavailable: React or Mithril not found')
  }

  function useStatebot(bot) {
    const [state, setState] = useState(bot.currentState())

    useEffect(() => {
      let done = false

      const removeListener = bot.onSwitched((toState) => {
        if (done) {
          return
        }
        setState(toState)
      })

      return () => {
        done = true
        removeListener()
      }
    }, [bot])

    return state
  }

  function useStatebotFactory(name, config) {
    // We memoise Statebot since it's based on EventEmitter,
    // so we create it once and add/remove listeners for
    // the life-cycle of the component
    const { bot, listeners } = useMemo(() => {
      const {
        performTransitions = {},
        onTransitions = {},
        ...botConfig
      } = config || {}

      const bot = Statebot(name, botConfig)
      const listeners = [
        bot.performTransitions(performTransitions),
        bot.onTransitions(onTransitions),
      ]

      return {
        bot,
        listeners,
      }
    }, [])

    useEffect(
      () => () => {
        if (typeof bot.pause === 'function') {
          bot.pause()
        }
        listeners.forEach((off) => off())
      },
      [bot, listeners]
    )

    const state = useStatebot(bot)

    return { state, bot }
  }

  function useStatebotEvent(bot, eventName, stateOrFn, maybeFn) {
    useEffect(() => {
      let done = false

      function onSwitchFn(...args) {
        if (done) {
          return
        }
        stateOrFn(...args)
      }
      function onEnterOrExitFn(...args) {
        if (done) {
          return
        }
        maybeFn(...args)
      }

      const args =
        typeof maybeFn === 'function'
          ? [stateOrFn, onEnterOrExitFn]
          : [onSwitchFn]

      const removeListener = bot[eventName](...args)

      return () => {
        done = true
        removeListener()
      }
    }, [bot, eventName, stateOrFn, maybeFn])
  }

  return {
    useStatebot,
    useStatebotFactory,
    useStatebotEvent,
  }
}
