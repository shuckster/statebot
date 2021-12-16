
//
// STATEBOT FSM
//

export {
  Statebot,
  isStatebot
}

/**
 * Options for creating a Statebot.
 *
 * @typedef {Object} statebotOptions
 * @property {statebotChart} chart
 *  The state-chart.
 * @property {string} [startIn=auto]
 *  The state in which to start. If unspecified, the first state in the
 *  chart will be used.
 * @property {number} [logLevel=3]
 *  How noisy the logging is, from 1 to 3:
 *  ```
 *  1) console.warn
 *  2) console.warn/log/table
 *  3) console.warn/log/table/info
 *  ```
 *  `3` is the default. Argument type-errors will always `throw`.
 * @property {number} [historyLimit=2]
 *  Limit how much history the state-machine keeps. Accessed via
 *  {@link #statebotfsmhistory|statebotFsm#history()}.
 * @property {events} [events]
 *  If you wish to have your Statebots listen to events coming from
 *  a shared EventEmitter, you can pass it in here. The `emit()`/`onEvent()`/
 *  `performTransitions()` methods will use it.
 *
 *  It should have the same signature as {@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}.
 *
 *  - Since Statebot 2.5.0 {@link https://npmjs.com/mitt|mitt} is also compatible.
 *  - Since Statebot 2.6.0 {@link https://npmjs.com/mitt|mitt} is used internally.
 */

/**
 * A description of all the states in a machine, plus all of the
 * permitted transitions between them.
 *
 * This is defined using a `string` or an `array` of strings, but
 *  {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals|Template Literals}
 * are much more convenient.
 *
 * An arrow `->` configures a **permitted transition** between two states:
 *
 * ```
 * from-state -> to-state
 * ```
 *
 * It's the only operator needed to build any chart:
 *
 * ```js
 * var promiseLikeChart = `
 *   pending -> resolved
 *   pending -> rejected
 *   resolved -> done
 *   rejected -> done
 * `
 * ```
 *
 * The "OR" operator `|` can help us remove some redundancy from the above example:
 *
 * ```js
 * var promiseLikeChart = `
 *   pending -> resolved | rejected
 *   resolved | rejected -> done
 * `
 * ```
 *
 * In both charts, `pending` can transition to `resolved` or `rejected`, and
 * `resolved` or `rejected` can both transition to `done`.
 *
 * We can streamline this even further:
 *
 * ```js
 * var promiseLikeChart = `
 *   pending -> (resolved | rejected) -> done
 * `
 * ```
 *
 * Again, this is exactly equivalent to the previous two examples.
 *
 * Notice in this one that we have parentheses `(` `)` surrounding `resolved`
 * and `rejected`. They are actually completely ignored by the parser, and
 * you can use them as you please to help make your charts more readable.
 *
 * A chart works exactly the same without them:
 *
 * ```js
 * var promiseLikeChart = `
 *   pending -> resolved | rejected -> done
 * `
 * ```
 *
 * Charts can also be split across multiple-lines:
 *
 * ```js
 * var promiseLikeChart = `
 *   pending ->
 *   resolved |
 *   rejected ->
 *   done
 * `
 * ```
 * Notice that all white-space is ignored on either side of the `->`
 * and `|`.
 *
 * `// Comments of this kind are allowed, too:`
 *
 * ```js
 * var promiseLikeChart = `
 *   pending -> // Where do we go from here?
 *     (resolved | rejected) -> // Ah, yes
 *
 *   // And now we're all finished
 *   done
 * `
 * ```
 *
 * Finally, here's a more full example:
 *
 * ```js
 * var dragDropChart = `
 *   idle ->
 *     drag-detect ->
 *       (dragging | clicked)
 *
 *   // Just a click, bail-out!
 *   clicked -> idle
 *
 *   // Drag detected!
 *   dragging ->
 *     drag-wait -> dragged -> drag-wait
 *
 *   // Drag finished...
 *   (drag-wait | dragged) ->
 *     (drag-done | drag-cancel) ->
 *       idle
 * `
 * ```
 *
 * @typedef {string|string[]} statebotChart
 */

const ON_EXITING = 'onExiting'
const ON_ENTERING = 'onEntering'
const ON_EXITED = 'onExited'
const ON_ENTERED = 'onEntered'
const ON_SWITCHING = 'onSwitching'
const ON_SWITCHED = 'onSwitched'

const INTERNAL_EVENTS = {
  [ON_SWITCHING]: '(ANY)state:changing',
  [ON_SWITCHED]: '(ANY)state:changed'
}

import mitt from 'mitt'

import {
  wrapEmitter,
  Logger,
  ReferenceCounter,
  Pausables,
  Once,
} from './utils'

import {
  isArray,
  isEventEmitter,
  isFunction,
  isPojo,
  isString,
  isUndefined,
  ArgTypeError,
} from './types'

import { decomposeChart, cxArrow } from './parsing'

/**
 * Create a {@link #statebotfsm|statebotFsm} `object`.
 *
 * @memberof statebot
 * @function
 * @example
 * var machine = Statebot('lemming', {
 *   chart: `
 *     walking -> (digging | building | falling) ->
 *       walking
 *
 *     falling -> splatting
 *     walking -> exiting
 *   `
 * })
 *
 * @param {string} name
 *  Give your Statebot a name. Used for logging and by {@link #statebotassertroute|assertRoute()}.
 * @param {statebotOptions} options
 */

function Statebot (name, options) {
  if (!isString(name)) {
    throw new TypeError('\nStatebot: Please specify a name for this machine')
  }

  const logPrefix = `Statebot[${name}]`
  if (!isPojo(options)) {
    throw new TypeError(`\n${logPrefix}: Please specify options for this machine`)
  }

  const {
    chart = undefined,
    logLevel = 3,
    historyLimit = 2
  } = options || {}

  const events = isUndefined(options.events)
    ? wrapEmitter(mitt())
    : isEventEmitter(options.events) && wrapEmitter(options.events)

  if (!events) {
    throw new TypeError(`\n${logPrefix}: Invalid event-emitter specified in options`)
  }

  const { states = [], routes = [] } = chart
    ? decomposeChart(chart)
    : options

  const { startIn = states[0] } = options

  if (!states.includes(startIn)) {
    throw new Error(`${logPrefix}: Starting-state not in chart: "${startIn}"`)
  }

  const argTypeError = ArgTypeError(`${logPrefix}#`)
  const _console = Logger(logLevel, console)
  const { canWarn } = _console

  const stateHistory = [startIn]
  const stateHistoryLimit = Math.max(historyLimit, 2)

  let transitionId = 0

  const { pause, resume, paused, Pausable } = Pausables(false, () =>
    _console.warn(`${logPrefix}: Ignoring callback, paused`)
  )

  const internalEvents = wrapEmitter(mitt())
  const emitInternalEvent = Pausable(internalEvents.emit)

  function onInternalEvent (eventName, cb) {
    internalEvents.on(eventName, cb)
    return () => internalEvents.off(eventName, cb)
  }

  const statesHandled = ReferenceCounter(
    name,
    'states',
    'Listening for the following state-changes',
    [...states]
  )
  const routesHandled = ReferenceCounter(
    name,
    'transitions',
    'Listening for the following transitions',
    [...routes]
  )
  const eventsHandled = ReferenceCounter(
    name,
    'events',
    'Listening for the following events'
  )

  // Interprets onTransitions() and performTransitions()
  function applyHitcher (hitcher, fnName) {
    const hitcherActions =
      isFunction(hitcher)
        ? hitcher({ enter, emit, Enter, Emit })
        : isPojo(hitcher) ? hitcher : null

    if (!isPojo(hitcherActions)) {
      throw new TypeError(
        `Statebot[${name}]#${fnName}(): Expected an object, or a function that returns an object`
      )
    }

    const allStates = []
    const allRoutes = []
    const {
      transitionsForEvents,
      transitionsOnly
    } = decomposeHitcherActions(hitcherActions)

    // Handle performTransitions() signature
    // (configs with an event, and maybe a then-method too)
    const eventsMappedToTransitionConfigs = Object
      .entries(transitionsForEvents)
      .reduce(decomposeTransitionsForEvent, {})

    // Handle onTransitions() signature
    // (transition-only, and maybe a then-function too)
    const transitionConfigs = expandTransitions(transitionsOnly, canWarn)

    // Now install handlers for on/performTransitions:
    const allCleanupFns =
      Object
        .entries(eventsMappedToTransitionConfigs)
        .map(createEventHandlerForTransition)
        .concat(transitionConfigs.configs.map(runThenMethodOnTransition))
        .flat()

    // Debugging
    // (if we're at the right level)
    if (canWarn()) {
      allStates.push(...transitionConfigs.states)
      allRoutes.push(...transitionConfigs.routes)

      const invalidStates = allStates.filter(state => !states.includes(state))
      const invalidRoutes = allRoutes.filter(route => !routes.includes(route))

      if (invalidStates.length) {
        _console.warn(
          `Statebot[${name}]#${fnName}(): Invalid states specified:\n` +
          invalidStates.map(state => `  > "${state}"`).join('\n')
        )
      }
      if (invalidRoutes.length) {
        _console.warn(
          `Statebot[${name}]#${fnName}(): Invalid transitions specified:\n` +
          invalidRoutes.map(route => `  > "${route}"`).join('\n')
        )
      }
    }

    return () => allCleanupFns.map(fn => fn())

    // Helper for onTransitions()
    function runThenMethodOnTransition (config) {
      const { fromState, toState, action } = config
      const route = `${fromState}->${toState}`
      return [
        routesHandled.increase(route),
        onInternalEvent(route, bindActionTo(toState, action))
      ]
    }

    // Helpers for performTransitions()
    function decomposeTransitionsForEvent (acc, [eventName, transitionsAndAction]) {
      const {
        states,
        routes,
        configs
      } = expandTransitions(transitionsAndAction, canWarn)

      if (canWarn()) {
        allStates.push(...states)
        allRoutes.push(...routes)
      }

      return {
        ...acc,
        [eventName]: configs
      }
    }

    function ifStateThenEnterState ({ fromState, toState, action, args }) {
      return inState(fromState, () => {
        enter(toState, ...args)
        isFunction(action) && runActionFor(toState, action, ...args)
        return true
      })
    }

    function createEventHandlerForTransition ([eventName, configs]) {
      return [
        eventsHandled.increase(eventName),
        onEvent(eventName, (...args) => {
          const eventWasHandled = configs
            .map(config => ({ ...config, args }))
            .some(ifStateThenEnterState)

          if (!eventWasHandled) {
            transitionNoOp(`Event not handled: "${eventName}"`)
          }
        })
      ]
    }

    function runActionFor(state, actionFn, ...args) {
      const onExitingState = actionFn(...args)
      if (isFunction(onExitingState)) {
        const uninstall = Once(enterExitMethods[ON_EXITING](state, (toState) => {
          uninstall()
          onExitingState(toState)
        }))

        allCleanupFns.push(uninstall)
      }
    }

    function bindActionTo(state, actionFn) {
      return (...args) => runActionFor(state, actionFn, ...args)
    }
  }

  function previousState () {
    return stateHistory[stateHistory.length - 2]
  }

  function currentState () {
    return stateHistory[stateHistory.length - 1]
  }

  function canTransitionTo (...states) {
    const testStates = states.flat()
    const err = argTypeError('canTransitionTo', { state: isString }, testStates[0])
    if (err) {
      throw new TypeError(err)
    }

    if (!testStates.length) {
      return false
    }

    const nextStates = statesAvailableFromHere()
    return testStates.every(state => nextStates.includes(state))
  }

  function statesAvailableFromHere (state) {
    const _state = !isUndefined(state)
      ? state
      : currentState()

    const err = argTypeError('statesAvailableFromHere', { state: isString }, _state)
    if (err) {
      throw new TypeError(err)
    }

    return routes.reduce((acc, route) => {
      const [fromState, toState] = route
        .split(cxArrow)
        .map(state => state.trim())

      return (fromState === _state)
        ? [...acc, toState]
        : acc
    }, [])
  }

  function _inState (state, anyOrFn, ...fnArgs) {
    const conditionMatches = currentState() === state

    if (isUndefined(anyOrFn)) {
      return conditionMatches
    }
    if (!conditionMatches) {
      return null
    }
    if (isFunction(anyOrFn)) {
      return anyOrFn(...fnArgs)
    }

    return anyOrFn
  }

  function _inStateObject(stateObject, ...fnArgs) {
    const match = Object
      .entries(stateObject)
      .find(([state]) => _inState(state))

    return match
      ? _inState(...match.concat(fnArgs))
      : null
  }

  function inState (...args) {
    const err = argTypeError('inState', { state: [isString, isPojo] }, args[0])
    if (err) {
      throw new TypeError(err)
    }

    return isPojo(args[0])
      ? _inStateObject(...args)
      : _inState(...args)
  }

  const emit = Pausable((eventName, ...args) => {
    const err = argTypeError('emit', { eventName: isString }, eventName)
    if (err) {
      throw new TypeError(err)
    }

    return events.emit(eventName, ...args)
  })

  const enter = Pausable((state, ...args) => {
    const err = argTypeError('enter', { state: isString }, state)
    if (err) {
      throw new TypeError(err)
    }

    const inState = currentState()
    const toState = state

    if (toState === inState) {
      transitionNoOp(`Already in state: "${toState}"`)
      return false
    }

    if (!states.includes(toState)) {
      transitionNoOp(`Invalid state "${toState}", not switching`)
      return false
    }

    const nextRoute = `${inState}->${toState}`
    if (!routes.includes(nextRoute)) {
      transitionNoOp(`Invalid transition "${nextRoute}", not switching`)
      return false
    }

    // Fell-through, can enter next state
    _console.info(`${logPrefix}: tId<${++transitionId}>: ${nextRoute}`)

    stateHistory.push(toState)
    if (stateHistory.length > stateHistoryLimit) {
      stateHistory.shift()
    }

    emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHING], toState, inState, ...args)
    emitInternalEvent(nextRoute, ...args)
    emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHED], toState, inState, ...args)

    return true
  })

  function onEvent (eventName, cb) {
    const err = argTypeError('onEvent',
      { eventName: isString, cb: isFunction },
      eventName, cb
    )
    if (err) {
      throw new TypeError(err)
    }

    events.on(eventName, cb)
    return () => events.off(eventName, cb)
  }

  const switchMethods = Object
    .keys(INTERNAL_EVENTS)
    .reduce((obj, methodName) => ({
      ...obj,
      [methodName]: cb => {
        const err = argTypeError(methodName, { cb: isFunction }, cb)
        if (err) {
          throw new TypeError(err)
        }

        const decreaseRefCount = statesHandled.increase(
          INTERNAL_EVENTS[methodName]
        )
        const removeEvent = onInternalEvent(
          INTERNAL_EVENTS[methodName], cb
        )

        return () => {
          removeEvent()
          decreaseRefCount()
        }
      }
    }), {})

  const enterExitMethods = [
    [ON_EXITING, ON_SWITCHING],
    [ON_ENTERING, ON_SWITCHING],
    [ON_EXITED, ON_SWITCHED],
    [ON_ENTERED, ON_SWITCHED]
  ]
    .reduce((obj, names) => {
      const [methodName, switchMethod] = names
      const name = methodName.slice(2)
      const eventName = name.toLowerCase()

      return {
        ...obj,
        [methodName]: (state, cb) => {
          const err = argTypeError(methodName,
            { state: isString, cb: isFunction },
            state, cb
          )
          if (err) {
            throw new TypeError(err)
          }

          const decreaseRefCounts = [
            statesHandled.increase(state),
            statesHandled.increase(`${state}:${eventName}`)
          ]

          const removeEvent = switchMethods[switchMethod](
            (toState, fromState, ...args) => {
              if (name.indexOf('Exit') === 0) {
                state === fromState && cb(toState, ...args)
              } else {
                state === toState && cb(fromState, ...args)
              }
            }
          )

          return () => {
            removeEvent()
            decreaseRefCounts.map(fn => fn())
          }
        }
      }
    }, {})

  function Emit (eventName, ...curriedArgs) {
    const err = argTypeError('Emit', { eventName: isString }, eventName)
    if (err) {
      throw new TypeError(err)
    }

    return (...args) => emit(eventName, ...[...curriedArgs, ...args])
  }

  function Enter (state, ...curriedArgs) {
    const err = argTypeError('Enter', { state: isString }, state)
    if (err) {
      throw new TypeError(err)
    }

    return (...args) => enter(state, ...[...curriedArgs, ...args])
  }

  function _InState (state, anyOrFn, ...curriedFnArgs) {
    return (...fnArgs) =>
      inState(state, anyOrFn, ...[...curriedFnArgs, ...fnArgs])
  }

  function _InStateObject(stateObject, ...curriedFnArgs) {
    return (...fnArgs) =>
      inState(stateObject, ...[...curriedFnArgs, ...fnArgs])
  }

  function InState (...args) {
    const err = argTypeError('InState', { state: [isString, isPojo] }, args[0])
    if (err) {
      throw new TypeError(err)
    }

    return isPojo(args[0])
      ? _InStateObject(...args)
      : _InState(...args)
  }

  function reset () {
    _console.warn(`${logPrefix}: State-machine reset!`)

    stateHistory.length = 0
    stateHistory.push(startIn)
  }

  function transitionNoOp (message) {
    const lastState = previousState()
    const inState = currentState()
    const prevRoute =
      `${isUndefined(lastState) ? '[undefined]' : lastState}->${inState}`

    const availableStates = statesAvailableFromHere()
    if (!availableStates.length) {
      _console.info(
        `${logPrefix}: ${message}\n` +
          `  > Previous transition: "${prevRoute}"\n` +
          `  > There are no states available from "${inState}"`
      )
    } else {
      _console.info(
        `${logPrefix}: ${message}\n` +
          `  > Previous transition: "${prevRoute}"\n` +
          `  > From "${inState}", valid states are: [${availableStates
            .map(state => `"${state}"`)
            .join(', ')}]`
      )
    }
  }

  function inspect () {
    return {
      states: statesHandled.refs(),
      transitions: routesHandled.refs(),
      events: eventsHandled.refs()
    }
  }

  function info () {
    _console.log(`${logPrefix}: Information about this state-machine`)

    logRefCounterInfo(statesHandled)
    logRefCounterInfo(routesHandled)
    logRefCounterInfo(eventsHandled)
  }

  function logRefCounterInfo (refCounter) {
    const { description, table } = refCounter.toValue()
    _console.log(description)
    if (table.length) {
      _console.table(table)
    } else {
      _console.log('  > No information')
    }
  }

  /**
   * A state-machine object created by
   * {@link #statebotstatebot|Statebot()}.
   * @typedef {Object} statebotFsm
   */

  return {
    /**
     * For identifying Statebot objects.
     *
     * @private
     */
    __STATEBOT__: 1,

    /**
     * Tests to see if we can transition to the specified state from
     * the {@link #statebotfsmcurrentstate|.currentState()}.
     *
     * If more than one state is specified, `true` is returned only if
     * **ALL** states are available.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string|string[]} states
     * @returns {boolean}
     * @example
     * var machine = Statebot('game-menus', {
     *   chart: `
     *     loading ->
     *       menu ->
     *            play |
     *         options |
     *           sound |
     *            quit
     *
     *     // Go back to menu
     *     play | options | sound -> menu
     *
     *     // Can quit from main game, too
     *     play -> quit
     *   `
     * })
     *
     * machine.canTransitionTo('play')
     * // false
     *
     * machine.enter('menu')
     * machine.canTransitionTo(['play', 'options'])
     * // true
     */
    canTransitionTo,

    /**
     * Returns the current state.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @returns {string}
     *
     * @example
     * var machine = Statebot('coroutine', {
     *   chart: `
     *     suspended -> running -> (suspended | dead)
     *   `
     * })
     *
     * machine.currentState()
     * // "suspended"
     */
    currentState,

    /**
     * Immediately emits an event, firing any listeners added using
     * {@link #statebotfsmperformtransitions|.performTransitions()} or {@link #statebotfsmonevent|.onEvent()}.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} eventName
     * @param {...*} [args]
     *  Optional arguments to pass to listeners.
     * @returns {boolean}
     *  Whether or not the event had listeners.
     *
     *  See: {@link https://nodejs.org/api/events.html#events_emitter_emit_eventname_args|Node Events}
     *  for more information.
     *
     * Statebot imports `EventEmitter` from the
     *  {@link https://www.npmjs.com/package/events|events}
     * package for dealing with events in the browser.
     *
     * Since Statebot 2.6.0 {@link https://npmjs.com/mitt|mitt} is
     * used for both the browser and non-browser builds.
     *
     * @example
     * var machine = Statebot('basic-form', {
     *   chart: `
     *     idle -> sending -> redirect
     *   `
     * })
     *
     * machine.performTransitions({
     *   'idle -> sending': {
     *     on: 'post-data',
     *     then: (...args) => {
     *       console.log('Event args: ', args)
     *       // setTimeout(machine.Enter('redirect'), 5000)
     *     }
     *   }
     * })
     *
     * machine.emit('post-data', 'Hello, world!')
     * // Event args: ["Hello, world!"]
     *
     * machine.currentState()
     * // "sending"
     */
    emit,

    /**
     * Creates a function that emits the specified event.
     *
     * (This is essentially a convenience wrapper around {@link #statebotfsmemit|.emit()}.)
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} eventName
     *  The desired event to {@link #statebotfsmemit|.emit()}.
     * @param {...*} [curriedArgs]
     *  Arguments that will curry into the returned `emit()` function
     *  whenever it is called.
     * @returns {function} A function that emits that event.
     *
     * @example
     * var machine = Statebot('traffic-lights', {
     *   chart: `
     *     go ->
     *       prepare-to-stop ->
     *       stop
     *
     *     // ...gotta keep that traffic flowing
     *     stop ->
     *       prepare-to-go ->
     *       go
     *   `,
     *   startIn: 'stop'
     * })
     *
     * machine.performTransitions({
     *   'stop -> prepare-to-go':   { on: 'timer' },
     *   'prepare-to-go -> go':     { on: 'timer' },
     *   'go -> prepare-to-stop':   { on: 'timer' },
     *   'prepare-to-stop -> stop': { on: 'timer' }
     * })
     *
     * var nextTrafficLight = machine.Emit('timer')
     * machine.currentState()
     * // "stop"
     *
     * nextTrafficLight()
     * nextTrafficLight()
     * nextTrafficLight()
     *
     * machine.currentState()
     * // "prepare-to-stop"
     */
    Emit,

    /**
     * Immediately changes to the specified state, so long as it is
     * accessible from the {@link #statebotfsmcurrentstate|.currentState()}.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The desired state to switch-to.
     * @param {...*} [args]
     *  Optional arguments to pass to transition callbacks.
     * @returns {boolean} Whether or not the state changed.
     *
     * @example
     * var machine = Statebot('dialog', {
     *   chart: `
     *     idle -> showing-modal -> (saving | idle)
     *       saving -> idle
     *   `
     * })
     *
     * machine.currentState()
     * // "idle"
     *
     * machine.enter('saving')
     * // false
     *
     * // Statebot[dialog]: Invalid transition "idle->saving", not switching
     * // > Previous transition: "[undefined]->idle"
     * // > From "idle", valid states are: ["showing-modal"]
     *
     * machine.enter('showing-modal')
     * // true
     */
    enter,

    /**
     * Creates a function that changes to the specified state, so long
     * as it is accessible from the {@link #statebotfsmcurrentstate|.currentState()}.
     *
     * (This is essentially a convenience wrapper around {@link #statebotfsmenter|.enter()}.)
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The desired state to switch-to.
     * @param {...*} [curriedArgs]
     *  Arguments that will curry into the returned `enter()` function
     *  whenever it is called.
     * @returns {function}
     *  A function that can change the state when called.
     *
     * @example
     * var machine = Statebot('popup-menu', {
     *   chart: `
     *     idle -> menu-opened ->
     *       (item-clicked | idle)
     *
     *     item-clicked -> idle
     *   `,
     *   startIn: 'menu-opened'
     * })
     *
     * button.onclick = machine.Enter('item-clicked')
     * machine.currentState()
     * // "menu-opened"
     *
     * button.onclick()
     * machine.currentState()
     * // "item-clicked"
     */
    Enter,

    /**
     * Returns all states the machine has been in so far, up to a limit set
     * by `historyLimit` in {@link statebotOptions}.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @returns {string[]} A copy of the state-history.
     *
     * @example
     * var machine = Statebot('downloader', {
     *   chart: `
     *     loading -> (failure | success)
     *       failure -> loading
     *       success -> done
     *   `,
     *   historyLimit: 4
     * })
     *
     * machine.enter('failure')
     * machine.enter('loading')
     * machine.enter('success')
     * machine.enter('done')
     * machine.history()
     * // ["failure", "loading", "success", "done"]
     */
    history: () => [...stateHistory],

    /**
     * Print information about the current machine to the console.
     *
     * @memberof statebotFsm
     * @instance
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.info()
     * // [half-duplex]: Information about this state-machine.
     * // [half-duplex]: Listening for the following state-changes:
     * // ┌─────────┬─────────────┬────────┐
     * // │ (index) │   states    │   #    │
     * // ├─────────┼─────────────┼────────┤
     * // │    0    │   'done'    │ 'None' │
     * // │    1    │   'idle'    │ 'None' │
     * // │    2    │ 'receiving' │ 'None' │
     * // │    3    │  'sending'  │ 'None' │
     * // └─────────┴─────────────┴────────┘
     * // [half-duplex] Listening for the following transitions:
     * // ┌─────────┬───────────────────┬────────┐
     * // │ (index) │    transitions    │   #    │
     * // ├─────────┼───────────────────┼────────┤
     * // │    0    │ 'idle->receiving' │ 'None' │
     * // │    1    │  'idle->sending'  │ 'None' │
     * // │    2    │ 'receiving->done' │ 'None' │
     * // │    3    │  'sending->done'  │ 'None' │
     * // └─────────┴───────────────────┴────────┘
     * // [half-duplex]: Listening for the following events:
     * // (No information)
     */
    info: () => info(),

    /**
     * Get information about the current machine.
     *
     * Same details as {@link #statebotfsminfo|.info()} in object-form.
     *
     * @memberof statebotFsm
     * @instance
     * @returns {object}
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.inspect()
     * // Will return an object with the following signature:
     * //  { states, transitions, events }
     *
     * // These will each have key-values, the key being the name
     * // and the value being the number of listeners attached.
     */
    inspect: () => inspect(),

    /**
     * Checks if the {@link #statebotfsmcurrentstate|.currentState()}
     * matches the specified `state`, immediately returning either
     * `true` or `false`.
     *
     * If `outputWhenTrue` is specified, then it will be returned
     * instead of `true`, and `null` will be returned instead of
     *  `false`.
     *
     * If a function is specified, then its return-value will be used
     * as the `true`-value.
     *
     * Since v2.7.0:
     * - An object can be used instead of a string, with the keys
     *   being the states, and the values corresponding to their
     *   `outputWhenTrue` value. See the updated example below.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string|object} state
     *  The state to test against. This can be a string if you have a
     *  single condition, or an object for multiple. (See example.)
     * @param {any|function} [outputWhenTrue]
     *  When a string is specified as the first argment, this becomes
     *  an optional `true`-value that is returned if the state matches.
     *  If a function is specified, it will be called and its return
     *  value will be used.
     * @param {...*} [fnArgs]
     *  Arguments that will pass into `outputWhenTrue()` if it has
     *  been defined as a function.
     * @returns {boolean|null|*}
     *
     * @example
     * var machine = Statebot('little-revver', {
     *   chart: `
     *     idle ->
     *       (gear-1 | gear-2 | reverse) ->
     *     idle
     *   `
     * })
     *
     * machine.inState('idle')
     * // true
     *
     * machine.inState('idle', 'Purrrr...')
     * // "Purrrr..."
     *
     * machine.enter('gear-1')
     *
     * // Since v2.7.0:
     * machine.inState({
     *   'idle': 'Purrrr...',
     *   'gear-1': () => 'Chugga-chugga-chugga...',
     *   'gear-2': () => 'Brumma-brumma-brum-brum...',
     *   'reverse': false,
     * })
     * // "Chugga-chugga-chugga..."
     *
     * machine.inState('idle', () => {
     *   console.log('Idling!')
     *   return 'Purrrr...'
     * })
     * // null
     * // ^ the function is not called at all in the `false` case,
     * //   so no console.log either.
     */
    inState,

    /**
     * Returns a function which, when run, tests that
     * {@link #statebotfsmcurrentstate|.currentState()} matches the
     * specified state, returning either `true` or `false`.
     *
     * If `outputWhenTrue` is specified, then it will be returned
     * instead of `true`, and `null` will be returned instead of
     *  `false`.
     *
     * (This is essentially a convenience wrapper around {@link #statebotfsminstate|.inState()}.)
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The state to test against.
     * @param {any|function} [outputWhenTrue]
     *  Optional `true`-value. If a function is specified, it will be
     *  called and its return value will be used.
     * @param {...*} [curriedFnArgs]
     *  Arguments that will curry into `outputWhenTrue()` if it has
     *  been defined as a function.
     * @returns {function}
     *  A function that calls {@link #statebotfsminstate|.inState()}.
     *
     * @example
     * var machine = Statebot('little-revver', {
     *   chart: `
     *     idle ->
     *       (gear-1 | gear-2 | reverse) ->
     *     idle
     *   `
     * })
     *
     * var idling = machine.InState('idle')
     * var purring = machine.InState('idle', () => {
     *   console.log('Idling!')
     *   return 'Purrrr...'
     * })
     *
     * idling()
     * // true
     *
     * purring()
     * // Idling!
     * // "Purrrr..."
     *
     * machine.enter('gear-1')
     * purring()
     * // null
     * // ^ the function is not called at all in the `false` case,
     * //   so no console.log either.
     */
    InState,

    /**
     * Returns the name of the state-machine.
     *
     * Used for logging and also by {@link #statebotassertroute|assertRoute()}
     * for the same.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @returns {string} The name of the state-machine.
     *
     * @example
     * var machine = Statebot('Ay, there’s the rub.', {
     *   chart: `
     *     the-question -> (to-be | not-to-be)
     *       not-to-be -> perchance-to-dream
     *   `
     * })
     *
     * machine.name()
     * // "Ay, there’s the rub."
     */
    name: () => name,

    /**
     * Adds a listener that runs a callback immediately **AFTER** the
     * specified-state becomes the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The state.
     * @param {enterCallback} cb
     *  A callback function with the signature:
     *
     *  `(fromState, ...args?)`
     * @returns {function} A function that removes the listener.
     *
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onEntered('done', fromState => {
     *   console.log('Entered from:', fromState)
     * })
     *
     * machine.enter('receiving')
     * machine.enter('done')
     * // Entered from: receiving
     */
    onEntered: enterExitMethods[ON_ENTERED],

    /**
     * Adds a listener that runs a callback immediately **BEFORE** the
     * specified-state becomes the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The state.
     * @param {enterCallback} cb
     *  A callback function with the signature:
     *
     *  `(fromState, ...args?)`
     * @returns {function} A function that removes the listener.
     *
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onEntered('done', () => {
     *   console.log('We made it!')
     * })
     *
     * machine.onEntering('done', fromState => {
     *   console.log('Entering from:', fromState)
     * })
     *
     * machine.enter('sending')
     * machine.enter('done')
     * // Entering from: sending
     * // We made it!
     */
    onEntering: enterExitMethods[ON_ENTERING],

    /**
     * {@link #statebotfsmonentering .onEntering()} /
     * {@link #statebotfsmonentered .onEntered()} callback signature.
     *
     * @callback enterCallback
     * @param {string} fromState
     * @param {...any} [args]
     *  Arguments passed-down from {@link #statebotfsmenter .enter()} or
     *  {@link #statebotfsmemit .emit()}
     */

    /**
     * Adds a listener that runs a callback immediately after the specified
     * event is called.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} name The event name.
     * @param {function} cb The callback.
     * @returns {function} A function that removes the listener.
     *
     * @example
     * var machine = Statebot('traffic-lights', {
     *   chart: `
     *     go ->
     *       prepare-to-stop ->
     *       stop
     *
     *     // ...gotta keep that traffic flowing
     *     stop ->
     *       prepare-to-go ->
     *       go
     *   `
     * })
     *
     * machine.performTransitions({
     *   'stop -> prepare-to-go -> go':   { on: 'timer' },
     *   'go -> prepare-to-stop -> stop': { on: 'timer' },
     * })
     *
     * machine.onEvent('timer', () => {
     *   redrawTrafficLights()
     * })
     *
     * setInterval(machine.Emit('timer'), 2000)
     */
    onEvent,

    /**
     * Adds a listener that runs a callback immediately **AFTER** the
     * specified-state is no longer the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The state.
     * @param {exitCallback} cb
     *  A callback function with the signature:
     *
     *  `(toState, ...args?)`
     * @returns {function} A function that removes the listener.
     *
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onExited('idle', toState => {
     *   console.log('We are heading to:', toState)
     * })
     *
     * machine.enter('sending')
     * // We are heading to: sending
     */
    onExited: enterExitMethods[ON_EXITED],

    /**
     * Adds a listener that runs a callback immediately **BEFORE** the
     * specified-state is no longer the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The state.
     * @param {exitCallback} cb
     *  A callback function with the signature:
     *
     *  `(toState, ...args?)`
     * @returns {function} A function that removes the listener.
     *
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onExited('idle', () => {
     *   console.log('Peace out!')
     * })
     *
     * machine.onExiting('idle', toState => {
     *   console.log('Heading to:', toState)
     * })
     *
     * machine.enter('receiving')
     * machine.enter('done')
     * // Heading to: receiving
     * // Peace out!
     */
    onExiting: enterExitMethods[ON_EXITING],

    /**
     * {@link #statebotfsmonexiting .onExiting()} /
     * {@link #statebotfsmonexited .onExited()} callback signature.
     *
     * @callback exitCallback
     * @param {string} toState
     * @param {...any} [args]
     *  Arguments passed-down from {@link #statebotfsmenter .enter()} or
     *  {@link #statebotfsmemit .emit()}
     */

    /**
     * Adds a listener that runs a callback immediately after **ANY**
     * state-change.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {switchCallback} cb
     *  A callback function with the signature:
     *
     *  `(toState, fromState, ...args?)`
     * @returns {function} A function that removes the listener.
     *
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onSwitched((toState, fromState) => {
     *   console.log(`We went from "${fromState}" to "${toState}"`)
     * })
     *
     * machine.enter('receiving')
     * // We went from "idle" to "receiving"
     */
    onSwitched: switchMethods[ON_SWITCHED],

    /**
     * Adds a listener that runs a callback immediately before **ANY**
     * state-change.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {switchCallback} cb
     *  A callback function with the signature:
     *
     *  `(toState, fromState, ...args?)`
     * @returns {function} A function that removes the listener.
     *
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onSwitching((toState, fromState) => {
     *   console.log(`Going from "${fromState}" to "${toState}"`)
     * })
     *
     * machine.enter('receiving')
     * // Going from "idle" to "receiving"
     */
    onSwitching: switchMethods[ON_SWITCHING],

    /**
     * {@link #statebotfsmonswitching .onSwitching()} /
     * {@link #statebotfsmonswitched .onSwitched()} callback signature.
     *
     * @callback switchCallback
     * @param {string} toState
     * @param {string} fromState
     * @param {...any} [args]
     *  Arguments passed-down from {@link #statebotfsmenter .enter()} or
     *  {@link #statebotfsmemit .emit()}
     */

    /**
     * Run callbacks when transitions happen.
     *
     * Since v2.8.0:
     * - If a callback returns a function, it will be invoked when
     *   the state is exited in the same manner as if an {@link #statebotfsmonexiting .onExiting()}
     *   handler was created using it.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {object|function} transitions
     *  Configuration in the form of an object, or a function that
     *  returns an object. If a function is used, there will be a single
     *  argument passed-in: an object with the following methods
     *  attached as a convenience:
     *
     *  - {{@link #statebotfsmenter|.enter()}, {@link #statebotfsmemit|.emit()}, {@link #enter-state-1 .Enter()}, {@link #emit-name .Emit()}}
     *
     * @returns {function} A function that removes all listeners added
     *  by this method.
     *
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onTransitions({
     *   'idle -> sending': () => {
     *     sendData()
     *       .then(machine.Enter('done', 'sent'))
     *       .catch(machine.Enter('done', 'failed'))
     *   },
     *   'idle -> receiving': () => {
     *     receiveData()
     *       .then(machine.Enter('done', 'received'))
     *       .catch(machine.Enter('done', 'failed'))
     *   },
     *   'sending | receiving -> done': whatHappened => {
     *     console.log('All finished: ', whatHappened)
     *   }
     * })
     *
     * machine.enter('sending')
     *
     * function sendData() {
     *   return new Promise((resolve, reject) => {
     *     setTimeout(resolve, 1000)
     *     setTimeout(reject, 750 + Math.round(Math.random() * 750))
     *   })
     * }
     *
     * function receiveData() {
     *   return new Promise((resolve, reject) => {
     *     setTimeout(resolve, 1000)
     *     setTimeout(reject, 750 + Math.round(Math.random() * 750))
     *   })
     * }
     *
     * @example
     * // The above example using a function for config
     * machine.onTransitions(({ Enter }) => ({
     *   'idle -> sending': () => {
     *     sendData()
     *       .then(Enter('done', 'sent'))
     *       .catch(Enter('done', 'failed'))
     *   },
     *   'idle -> receiving': () => {
     *     receiveData()
     *       .then(Enter('done', 'received'))
     *       .catch(Enter('done', 'failed'))
     *   },
     *   'sending | receiving -> done': whatHappened => {
     *     console.log('All finished: ', whatHappened)
     *   }
     * }))
     *
     * // etc...
     */
    onTransitions: transitions => applyHitcher(transitions, 'onTransitions'),

    /**
     * Pause the machine. {@link #statebotfsmemit|.emit()} and {@link #statebotfsmenter|.enter()} will be no-ops until
     * the machine is {@link #statebotfsmresume|.resume()}'d.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     */
    pause,

    /**
     * Returns `true` if the machine is {@link #statebotfsmpause|.pause()}'d
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @returns {boolean}
     */
    paused,

    /**
     * Perform transitions when events happen.
     *
     * Use `then` to optionally add callbacks to those transitions.
     *
     * Since v2.8.0:
     * - If a `then` method returns a function, it will be invoked when
     *   the state is exited in the same manner as if an {@link #statebotfsmonexiting .onExiting()}
     *   handler was created using it.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {object|function} transitions
     *  Configuration in the form of an object, or a function that
     *  returns an object. If a function is used, there will be a single
     *  argument passed-in: an object with the following methods
     *  attached as a convenience:
     *
     *  - {{@link #statebotfsmenter|.enter()}, {@link #statebotfsmemit|.emit()}, {@link #enter-state-1 .Enter()}, {@link #emit-name .Emit()}}
     *
     * @returns {function} A function that removes all listeners added
     *  by this method.
     *
     * @example
     * var machine = Statebot('complex-form', {
     *   chart: `
     *     idle ->
     *       update
     *
     *     // Maybe things take a long time...
     *     update ->
     *       waiting -> waiting-a-while
     *
     *     // Which path will we take?
     *     waiting | waiting-a-while ->
     *       success | failed | timeout
     *
     *     // All done!
     *     success | failed | timeout ->
     *       done
     *   `
     * })
     *
     * machine.performTransitions(({ Enter, emit }) => ({
     *   'idle -> update': {
     *     on: 'user-saved',
     *     then: (data) => {
     *       console.log('Sending data: ', data)
     *
     *       sendData(data)
     *         .then(Enter('success'))
     *         .catch(Enter('failed'))
     *
     *       emit('data-sent')
     *     }
     *   },
     *   'update -> waiting': {
     *     on: 'data-sent',
     *     then: () => {
     *       setTimeout(Enter('waiting-a-while'), 750)
     *       setTimeout(Enter('timeout'), 5000)
     *     }
     *   }
     * }))
     *
     * // Just to illustrate that you can mix n' match with onTransitions:
     * machine.onTransitions({
     *   'waiting | waiting-a-while -> success': () => {
     *     console.log('Lovely!')
     *   },
     *   'waiting | waiting-a-while -> timeout': () => {
     *     console.log('Well, at least you have your shoes')
     *   }
     * })
     *
     * machine.emit('user-saved', ['some', 'data'])
     * // Sending data: ["some", "data"]
     *
     * function sendData() {
     *   return new Promise((resolve, reject) => {
     *     setTimeout(resolve, 1000)
     *     setTimeout(reject, 750 + Math.round(Math.random() * 750))
     *   })
     * }
     */
    performTransitions: transitions => applyHitcher(transitions, 'performTransitions'),

    /**
     * Returns the previous state.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @returns {string|undefined}
     *  The previous state, or `undefined` if there isn't one (ie; you
     *  have just called {@link #statebotfsmreset|.reset()}, or the
     *  machine has just started.)
     *
     * @example
     * var machine = Statebot('simple-sender', {
     *   chart: `
     *     idle -> sending -> done
     *   `
     * })
     *
     * machine.enter('sending')
     * machine.previousState()
     * // "idle"
     */
    previousState,

    /**
     * Returns the state-machine to its starting-state and clears the
     * state-history.
     *
     * All listeners will still be attached, but no events or
     * transitions will be fired. The pause-state will be maintained.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     *
     * @example
     * var machine = Statebot('carousel', {
     *   chart: `
     *     page-1 ->
     *     page-2 ->
     *     page-3 ->
     *     page-4 -> page-1
     *   `
     * })
     *
     * machine.enter('page-2')
     * machine.reset()
     * machine.currentState()
     * // "page-1"
     */
    reset,

    /**
     * Resume a {@link #statebotfsmpause|.pause()}'d machine.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     */
    resume,

    /**
     * Return an `array` of states accessible from the state specified.
     * If no state is passed-in, the {@link #statebotfsmcurrentstate|.currentState()} is used.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} [state] The state to check. {@link #statebotfsmcurrentstate|.currentState()}
     *  if unspecified.
     * @returns {String[]}
     * @example
     * var machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.statesAvailableFromHere()
     * // ["sending", "receiving"]
     *
     * machine.statesAvailableFromHere('receiving')
     * // ["done"]
     */
    statesAvailableFromHere
  }
}

function decomposeHitcherActions (hitcherActions) {
  // For: performTransitions()
  const transitionsForEvents = {}

  // For: onTransitions()
  const transitionsOnly = []

  Object
    .entries(hitcherActions)
    .map(([routeChart, actionFnOrConfigObj]) => {
      if (isFunction(actionFnOrConfigObj)) {
        transitionsOnly.push({ routeChart, action: actionFnOrConfigObj })
        return
      }
      if (!isPojo(actionFnOrConfigObj)) {
        return
      }

      const { on: _on, then: _then } = actionFnOrConfigObj
      const hasValidEventNames = isString(_on) || isArray(_on)
      if (hasValidEventNames) {
        const eventNames = [_on].flat()
        eventNames.map(name => {
          transitionsForEvents[name] = transitionsForEvents[name] || []
          transitionsForEvents[name].push({ routeChart, action: _then })
        })
        return
      }

      // Behave like onTransitions() if a "then" is specified but
      // there is no "on" event that triggers it
      if (isFunction(_then)) {
        transitionsOnly.push({ routeChart, action: actionFnOrConfigObj })
      }
    })

  return { transitionsForEvents, transitionsOnly }
}

function expandTransitions (configs, canWarn) {
  const allStates = []
  const allRoutes = []

  const _configs = configs.reduce((acc, config) => {
    const { routeChart, action } = config
    const { states, routes, transitions } = decomposeChart(routeChart)
    if (canWarn()) {
      allStates.push(...states)
      allRoutes.push(...routes)
    }
    return [
      ...acc,
      ...transitions.map(([fromState, toState]) =>
        ({ fromState, toState, action })
      )
    ]
  }, [])

  return {
    configs: _configs,
    states: allStates,
    routes: allRoutes
  }
}

/**
 * Tests that an object is a {@link #statebotfsm|statebotFsm}.
 *
 * @memberof statebot
 * @function
 * @example
 * var machine = Statebot(...)
 *
 * isStatebot(machine)
 * // true
 *
 * @param {any} object The object to test.
 * @returns {boolean}
 */

function isStatebot (object) {
  return (
    isPojo(object) &&
    typeof object.__STATEBOT__ === 'number'
  )
}
