
//
// STATEBOT FSM
//

export {
  Statebot,
  isStatebot
}

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
  Definitions,
  Logger,
  ReferenceCounter,
  Pausables,
  Once,
} from './utils'

import {
  isArray,
  isNumber,
  isEventEmitter,
  isFunction,
  isPojo,
  isString,
  isAllStrings,
  isUndefined,
  ArgTypeError,
} from './types'

import { decomposeChart, cxArrow } from './parsing'

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

  const transitionsFromEvents = Definitions()

  const internalEvents = wrapEmitter(mitt())
  const emitInternalEvent = Pausable(internalEvents.emit)

  function onInternalEvent (eventName, cb) {
    internalEvents.on(eventName, cb)
    return () => internalEvents.off(eventName, cb)
  }

  const statesHandled = ReferenceCounter(
    logPrefix,
    'states',
    'Listening for the following state-changes',
    [...states]
  )
  const routesHandled = ReferenceCounter(
    logPrefix,
    'transitions',
    'Listening for the following transitions',
    [...routes]
  )
  const eventsHandled = ReferenceCounter(
    logPrefix,
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
        `${logPrefix}#${fnName}(): Expected an object, or a function that returns an object`
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
          `${logPrefix}#${fnName}(): Invalid states specified:\n` +
          invalidStates.map(state => `  > "${state}"`).join('\n')
        )
      }
      if (invalidRoutes.length) {
        _console.warn(
          `${logPrefix}#${fnName}(): Invalid transitions specified:\n` +
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
      ].concat(
        configs.map(({ fromState, toState }) =>
          transitionsFromEvents.define(`${eventName}:${fromState}`, toState)
        )
      )
    }

    function runActionFor (state, actionFn, ...args) {
      const onExitingState = actionFn(...args)
      if (isFunction(onExitingState)) {
        const uninstall = Once(enterExitMethods[ON_EXITING](state, (toState) => {
          uninstall()
          onExitingState(toState)
        }))

        allCleanupFns.push(uninstall)
      }
    }

    function bindActionTo (state, actionFn) {
      return (...args) => runActionFor(state, actionFn, ...args)
    }
  }

  function _peek (eventName, stateObject, calledInternally = true) {
    const err1 = argTypeError({ eventName: isString })('peek')(eventName)
    if (err1) {
      throw new TypeError(err1)
    }

    const eventAndState = eventName + ':' + currentState()
    const statesFromEvent = transitionsFromEvents.definitionsOf(eventAndState)

    if (statesFromEvent.length > 1) {
      const reason =
        `${logPrefix}: Event "${eventName}" causes multiple transitions.\n` +
        `  > From state: "${currentState()}"\n` +
        `  > To states: "${statesFromEvent.join(', ')}"\n\n` +
        `Check your performTransitions() config.`

      throw new RangeError(reason)
    }

    if (!calledInternally && statesFromEvent.length === 0) {
      if (eventsHandled.countOf(eventName) === 0) {
        _console.warn(`${logPrefix}: Event not handled: "${eventName}"`)
      } else {
        _console.warn(`${logPrefix}: Will not transition after emitting: "${eventName}"`)
      }
    }

    const toState = statesFromEvent[0]

    if (isUndefined(stateObject)) {
      return isUndefined(toState) ? currentState() : toState
    }

    const err2 = argTypeError({ stateObject: isPojo })('peek')(stateObject)
    if (err2) {
      throw new TypeError(err2)
    }

    if (Object.prototype.hasOwnProperty.call(stateObject, toState)) {
      const anyOrFn = stateObject[toState]
      return isFunction(anyOrFn)
        ? anyOrFn()
        : anyOrFn
    }
    return null
  }

  function peek (eventName, stateObject) {
    return _peek(eventName, stateObject, false)
  }

  function previousState () {
    return stateHistory[stateHistory.length - 2]
  }

  function currentState () {
    return stateHistory[stateHistory.length - 1]
  }

  function _state_canTransitionTo (...states) {
    const err = argTypeError(
      { states: isAllStrings }
    )('canTransitionTo')([states])
    if (err) {
      throw new TypeError(err)
    }

    if (!states.length) {
      return false
    }

    const nextStates = statesAvailableFromHere()
    return states.every(state => nextStates.includes(state))
  }

  function canTransitionTo (...states) {
    const testStates = states.flat()
    if (
      testStates.length === 2 &&
      isString(testStates[0]) &&
      isPojo(testStates[1])
    ) {
      const thisState = testStates[0]
      const { afterEmitting } = testStates[1]
      const err = argTypeError(
        { thisState: isString, '{ afterEmitting }': isString }
      )('canTransitionTo')(thisState, afterEmitting)
      if (err) {
        throw new TypeError(err)
      }
      return (
        thisState !== currentState() &&
        _peek(afterEmitting) === thisState
      )
    }

    return _state_canTransitionTo(...testStates)
  }

  function statesAvailableFromHere (state) {
    const _state = !isUndefined(state)
      ? state
      : currentState()

    const err = argTypeError(
      { state: isString }
    )('statesAvailableFromHere')(_state)
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
    const err = argTypeError(
      { state: [isString, isPojo] }
    )('inState')(args[0])
    if (err) {
      throw new TypeError(err)
    }

    return isPojo(args[0])
      ? _inStateObject(...args)
      : _inState(...args)
  }

  const emit = (eventName, ...args) => {
    const err = argTypeError(
      { eventName: isString }
    )('emit')(eventName)
    if (err) {
      throw new TypeError(err)
    }
    _peek(eventName)
    return events.emit(eventName, ...args)
  }

  const enter = (state, ...args) => {
    const err = argTypeError(
      { state: isString }
    )('enter')(state)
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
  }

  function onEvent (eventName, cb) {
    const err = argTypeError(
      { eventName: isString, cb: isFunction }
    )('onEvent')(eventName, cb)
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
        const err = argTypeError({ cb: isFunction })(methodName)(cb)
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
          const err = argTypeError(
            { state: isString, cb: isFunction }
          )(methodName)(state, cb)
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
    const err = argTypeError({ eventName: isString })('Emit')(eventName)
    if (err) {
      throw new TypeError(err)
    }

    return (...args) => emit(eventName, ...[...curriedArgs, ...args])
  }

  function Enter (state, ...curriedArgs) {
    const err = argTypeError({ state: isString })('Enter')(state)
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
    const err = argTypeError({ state: [isString, isPojo] })('InState')(args[0])
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

  return {
    __STATEBOT__: 1,
    statesAvailableFromHere,
    canTransitionTo,
    currentState,
    previousState,
    history: () => [...stateHistory],

    emit: Pausable(emit),
    Emit: Pausable(Emit),
    enter: Pausable(enter),
    Enter: Pausable(Enter),
    inState,
    InState,

    info: () => info(),
    inspect: () => inspect(),
    name: () => name,

    onEntered: enterExitMethods[ON_ENTERED],
    onEntering: enterExitMethods[ON_ENTERING],
    onExited: enterExitMethods[ON_EXITED],
    onExiting: enterExitMethods[ON_EXITING],
    onSwitched: switchMethods[ON_SWITCHED],
    onSwitching: switchMethods[ON_SWITCHING],

    onEvent,
    onTransitions: transitions => applyHitcher(transitions, 'onTransitions'),
    performTransitions: transitions => applyHitcher(transitions, 'performTransitions'),

    pause,
    paused,
    peek,
    reset,
    resume,
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

function isStatebot (object) {
  return (
    isPojo(object) &&
    isNumber(object.__STATEBOT__)
  )
}
