
/*
 * Statebot
 * v3.0.5
 * https://shuckster.github.io/statebot/
 * License: MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mitt = require('mitt');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mitt__default = /*#__PURE__*/_interopDefaultLegacy(mitt);

function isEventEmitter(obj) {
  return (
    isObject(obj) &&
    isFunction(obj.emit) &&
    (isFunction(obj.addListener) || isFunction(obj.on)) &&
    (isFunction(obj.removeListener) || isFunction(obj.off))
  )
}
isEventEmitter.displayName = 'isEventEmitter';
isArray.displayName = 'isUnset';
function isArray(obj) {
  return Array.isArray(obj)
}
isArray.displayName = 'isArray';
function isArguments(obj) {
  return Object.prototype.toString.call(obj) === '[object Arguments]'
}
isArguments.displayName = 'isArguments';
function isFunction(obj) {
  return typeof obj === 'function'
}
isFunction.displayName = 'isFunction';
function isString(obj) {
  return typeof obj === 'string'
}
isString.displayName = 'isString';
function isAllStrings (arr) {
  return isArray(arr) && arr.every(isString)
}
isAllStrings.displayName = 'isAllStrings';
function isUndefined(obj) {
  return obj === undefined
}
isUndefined.displayName = 'isUndefined';
function isNull(obj) {
  return obj === null
}
isNull.displayName = 'isNull';
function isNumber(obj) {
  return typeof obj === 'number'
}
isNumber.displayName = 'isNumber';
function isObject(obj) {
  return typeof obj === 'object' && !isNull(obj)
}
isObject.displayName = 'isObject';
function isPojo(obj) {
  if (isNull(obj) || !isObject(obj) || isArguments(obj)) {
    return false
  }
  return Object.getPrototypeOf(obj) === Object.prototype
}
isPojo.displayName = 'isPojo';
function isTemplateLiteral(obj) {
  if (isString(obj)) {
    return true
  }
  if (!isArray(obj)) {
    return false
  }
  return obj.every(isString)
}
isTemplateLiteral.displayName = 'isTemplateLiteral';
const typeErrorStringIfFnReturnsFalse = (argName, argTypeFn, arg) => {
  return argTypeFn(arg)
    ? undefined
    : (argTypeFn.displayName || argTypeFn.name) +
        `(${argName}) did not return true`
};
const typeErrorStringIfTypeOfFails = (argName, argType, arg) => {
  return typeof arg === argType
    ? undefined
    : `Argument "${argName}" should be a ${argType}`
};
const typeErrorStringFromArgument = argMap => (arg, index) => {
  if (index >= argMap.length) {
    return
  }
  const { argName, argType } = argMap[index];
  if (isUndefined(arg)) {
    return `Argument undefined: "${argName}"`
  }
  const permittedArgTypes = Array.isArray(argType) ? argType : [argType];
  const errorDescs = permittedArgTypes
    .map(argType =>
      isFunction(argType)
        ? typeErrorStringIfFnReturnsFalse(argName, argType, arg)
        : typeErrorStringIfTypeOfFails(argName, argType, arg)
    )
    .filter(isString);
  const multipleTypesSpecified = permittedArgTypes.length > 1;
  const shouldError = multipleTypesSpecified
    ? errorDescs.length > 1
    : errorDescs.length;
  if (shouldError) {
    return (
      errorDescs.join('\n| ') +
      `\n> typeof ${argName} === ${typeof arg}(${JSON.stringify(arg)})`
    )
  }
};
function ArgTypeError(namespace) {
  return typeMap => {
    const argMap = Object.entries(typeMap).map(([argName, argType]) => ({
      argName,
      argType
    }));
    return fnName =>
      (...args) => {
        const processedArgs = Array
          .from(args, x => isArguments(x) ? Array.from(x) : x)
          .flat(1);
        const err = processedArgs
          .map(typeErrorStringFromArgument(argMap))
          .filter(isString);
        if (!err.length) {
          return
        }
        const signature = Object.keys(typeMap).join(', ');
        return (
          `\n${namespace || ''}${fnName}(${signature}):\n` +
          `${err.map(err => `| ${err}`).join('\n')}`
        )
      }
  }
}

function wrapEmitter (events) {
  const emit = (eventName, ...args) =>
    events.emit(eventName, args);
  const addListener = events.addListener
    ? (...args) => events.addListener(...args)
    : (...args) => events.on(...args);
  const removeListener = events.removeListener
    ? (...args) => events.removeListener(...args)
    : (...args) => events.off(...args);
  const wrapMap = new Map();
  function on (eventName, fn) {
    let fnMeta = wrapMap.get(fn);
    if (!fnMeta) {
      fnMeta = {
        handleEvent: (args = []) => fn(...[args].flat()),
        refCount: 0
      };
      wrapMap.set(fn, fnMeta);
    }
    fnMeta.refCount += 1;
    addListener(eventName, fnMeta.handleEvent);
  }
  function off (eventName, fn) {
    let fnMeta = wrapMap.get(fn);
    if (!fnMeta) {
      return
    }
    removeListener(eventName, fnMeta.handleEvent);
    fnMeta.refCount -= 1;
    if (fnMeta.refCount === 0) {
      wrapMap.delete(fn);
    }
  }
  return {
    emit,
    on,
    off
  }
}
function uniq (input) {
  return input.reduce((acc, one) =>
    acc.indexOf(one) === -1
      ? (acc.push(one), acc)
      : acc
    , []
  )
}
function Once (fn) {
  const { revoke, fn: _fn } = Revokable(fn);
  let result;
  return function (...args) {
    result = _fn(...args);
    revoke();
    return result
  }
}
function Revokable (fn) {
  let revoked = false;
  let result;
  return {
    fn: (...args) => {
      if (!revoked) {
        result = fn(...args);
      }
      return result
    },
    revoke: () => {
      revoked = true;
    }
  }
}
function Pausables (startPaused, runFnWhenPaused) {
  runFnWhenPaused = runFnWhenPaused || function () {};
  let paused = !!startPaused;
  function Pausable (fn) {
    return (...args) => {
      if (paused) {
        runFnWhenPaused();
        return false
      }
      return fn(...args)
    }
  }
  return {
    Pausable,
    paused: () => paused,
    pause: () => { paused = true; },
    resume: () => { paused = false; },
  }
}
function ReferenceCounter (logPrefix, kind, description, ...expecting) {
  const _refs = [...expecting]
    .flat()
    .reduce((acc, ref) => ({ ...acc, [ref]: 0 }), {});
  function increase (ref) {
    _refs[ref] = countOf(ref) + 1;
    return () => { decrease(ref); }
  }
  function decrease (ref) {
    const count = countOf(ref) - 1;
    _refs[ref] = Math.max(count, 0);
  }
  function countOf (ref) {
    return _refs[ref] || 0
  }
  function refs () {
    return { ..._refs }
  }
  function table () {
    return Object.keys(_refs).sort()
      .map(key => [key, _refs[key]])
      .map(([ref, count]) => {
        return {
          [kind]: ref,
          refs: count || 'None'
        }
      })
  }
  function toValue () {
    return {
      description: `${logPrefix}: ${description}:`,
      table: table()
    }
  }
  return {
    increase,
    decrease,
    countOf,
    toValue,
    refs
  }
}
function Definitions() {
  const dictionary = {};
  function undefine(word, definition) {
    dictionary[word] = (dictionary[word] || []).filter(
      (next) => next !== definition
    );
    if (dictionary[word].length === 0) {
      delete dictionary[word];
    }
  }
  function define(word, definition) {
    dictionary[word] = dictionary[word] || [];
    dictionary[word].push(definition);
    return () => undefine(word, definition)
  }
  function definitionsOf(word) {
    return dictionary[word] || []
  }
  return {
    define,
    undefine,
    definitionsOf,
  }
}
function Logger (level, _console) {
  if (isString(level)) {
    level = ({
      info: 3,
      log: 2,
      warn: 1,
      none: 0
    })[level] || 3;
  }
  function canWarn () {
    return level >= 1
  }
  function canLog () {
    return level >= 2
  }
  function canInfo () {
    return level >= 3
  }
  const { info, table, log, warn, error } = _console || console;
  return {
    canWarn,
    canLog,
    canInfo,
    info: (...args) => { canInfo() && info(...args); },
    table: (...args) => { canLog() && table(...args); },
    log: (...args) => { canLog() && log(...args); },
    warn: (...args) => { canWarn() && warn(...args); },
    error: (...args) => { error(...args); }
  }
}

const rxCRLF = /[\r\n]/;
const cxPipe = '|';
const cxArrow = '->';
const rxOperators = [cxPipe, cxArrow]
  .map(rxUnsafe => rxUnsafe.replace('|', '\\|'))
  .join('|');
const rxLineContinuations = new RegExp(`(${rxOperators})$`);
const rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
const rxComment = /(\/\/[^\n\r]*)/;
const argTypeError = ArgTypeError('statebot.');
function decomposeChart (chart) {
  const err = argTypeError(
    { chart: isTemplateLiteral }
  )('decomposeChart')(chart);
  if (err) {
    throw TypeError(err)
  }
  const lines = condensedLines(chart);
  const linesOfTokens = tokenisedLines(lines);
  const linesOfRoutes = linesOfTokens
    .flatMap(decomposeRouteFromTokens);
  const linesOfTransitions = linesOfRoutes
    .flatMap(decomposeTransitionsFromRoute);
  let emptyStateFound = false;
  const routeKeys = linesOfTransitions.map(route => {
    if (route.includes('')) {
      emptyStateFound = true;
    }
    return route.join(cxArrow)
  });
  const filteredRoutes = uniq(routeKeys);
  const filteredStates = uniq(linesOfTokens.flat(3));
  return {
    transitions: filteredRoutes.map(route => route.split(cxArrow)),
    routes: filteredRoutes,
    states: !emptyStateFound
      ? filteredStates.filter(Boolean)
      : filteredStates
  }
}
function linesFrom (strOrArr) {
  return [strOrArr]
    .flat()
    .reduce((acc, line) => [...acc, ...line.split(rxCRLF)], [])
}
function condensedLines (strOrArr) {
  const input = linesFrom(strOrArr);
  const output = [];
  let previousLineHasContinuation = false;
  const condenseLine = (condensedLine, line) => {
    const sanitisedLine = line
      .replace(rxComment, '')
      .replace(rxDisallowedCharacters, '');
    if (!sanitisedLine) {
      return condensedLine
    }
    previousLineHasContinuation = rxLineContinuations
      .test(sanitisedLine);
    if (previousLineHasContinuation) {
      return condensedLine + sanitisedLine
    }
    output.push(condensedLine + sanitisedLine);
    return ''
  };
  const finalCondensedLine = input
    .reduce(condenseLine, '');
  if (previousLineHasContinuation || finalCondensedLine) {
    return [...output, finalCondensedLine]
  }
  return [...output]
}
function tokenisedLines (lines) {
  return lines
    .map(line => line
      .split(cxArrow)
      .map(str => str.split(cxPipe))
    )
}
function decomposeRouteFromTokens (line) {
  const output = [];
  line.reduce((previousStates, states) => {
    if (previousStates === false) {
      return [...states]
    }
    output.push([previousStates, [...states]]);
    return [...states]
  }, false);
  return output
}
function decomposeTransitionsFromRoute([fromStates, toStates]) {
  return fromStates.reduce(
    (acc, fromState) => (
      acc.push(...toStates.map(toState => [fromState, toState])), acc
    ),
    []
  )
}

const ON_EXITING = 'onExiting';
const ON_ENTERING = 'onEntering';
const ON_EXITED = 'onExited';
const ON_ENTERED = 'onEntered';
const ON_SWITCHING = 'onSwitching';
const ON_SWITCHED = 'onSwitched';
const INTERNAL_EVENTS = {
  [ON_SWITCHING]: '(ANY)state:changing',
  [ON_SWITCHED]: '(ANY)state:changed'
};
function Statebot (name, options) {
  if (!isString(name)) {
    throw new TypeError('\nStatebot: Please specify a name for this machine')
  }
  const logPrefix = `Statebot[${name}]`;
  if (!isPojo(options)) {
    throw new TypeError(`\n${logPrefix}: Please specify options for this machine`)
  }
  const {
    chart = undefined,
    logLevel = 3,
    historyLimit = 2
  } = options || {};
  const events = isUndefined(options.events)
    ? wrapEmitter(mitt__default["default"]())
    : isEventEmitter(options.events) && wrapEmitter(options.events);
  if (!events) {
    throw new TypeError(`\n${logPrefix}: Invalid event-emitter specified in options`)
  }
  const { states = [], routes = [] } = chart
    ? decomposeChart(chart)
    : options;
  const { startIn = states[0] } = options;
  if (!states.includes(startIn)) {
    throw new Error(`${logPrefix}: Starting-state not in chart: "${startIn}"`)
  }
  const argTypeError = ArgTypeError(`${logPrefix}#`);
  const _console = Logger(logLevel, console);
  const { canWarn } = _console;
  const stateHistory = [startIn];
  const stateHistoryLimit = Math.max(historyLimit, 2);
  let transitionId = 0;
  const { pause, resume, paused, Pausable } = Pausables(false, () =>
    _console.warn(`${logPrefix}: Ignoring callback, paused`)
  );
  const transitionsFromEvents = Definitions();
  const internalEvents = wrapEmitter(mitt__default["default"]());
  const emitInternalEvent = Pausable(internalEvents.emit);
  function onInternalEvent (eventName, cb) {
    internalEvents.on(eventName, cb);
    return () => internalEvents.off(eventName, cb)
  }
  const statesHandled = ReferenceCounter(
    logPrefix,
    'states',
    'Listening for the following state-changes',
    [...states]
  );
  const routesHandled = ReferenceCounter(
    logPrefix,
    'transitions',
    'Listening for the following transitions',
    [...routes]
  );
  const eventsHandled = ReferenceCounter(
    logPrefix,
    'events',
    'Listening for the following events'
  );
  function applyHitcher (hitcher, fnName) {
    const hitcherActions =
      isFunction(hitcher)
        ? hitcher({ enter, emit, Enter, Emit })
        : isPojo(hitcher) ? hitcher : null;
    if (!isPojo(hitcherActions)) {
      throw new TypeError(
        `${logPrefix}#${fnName}(): Expected an object, or a function that returns an object`
      )
    }
    const allStates = [];
    const allRoutes = [];
    const {
      transitionsForEvents,
      transitionsOnly
    } = decomposeHitcherActions(hitcherActions);
    const eventsMappedToTransitionConfigs = Object
      .entries(transitionsForEvents)
      .reduce(decomposeTransitionsForEvent, {});
    const transitionConfigs = expandTransitions(transitionsOnly, canWarn);
    const allCleanupFns =
      Object
        .entries(eventsMappedToTransitionConfigs)
        .map(createEventHandlerForTransition)
        .concat(transitionConfigs.configs.map(runThenMethodOnTransition))
        .flat();
    if (canWarn()) {
      allStates.push(...transitionConfigs.states);
      allRoutes.push(...transitionConfigs.routes);
      const invalidStates = allStates.filter(state => !states.includes(state));
      const invalidRoutes = allRoutes.filter(route => !routes.includes(route));
      if (invalidStates.length) {
        _console.warn(
          `${logPrefix}#${fnName}(): Invalid states specified:\n` +
          invalidStates.map(state => `  > "${state}"`).join('\n')
        );
      }
      if (invalidRoutes.length) {
        _console.warn(
          `${logPrefix}#${fnName}(): Invalid transitions specified:\n` +
          invalidRoutes.map(route => `  > "${route}"`).join('\n')
        );
      }
    }
    return () => allCleanupFns.map(fn => fn())
    function runThenMethodOnTransition (config) {
      const { fromState, toState, action } = config;
      const route = `${fromState}->${toState}`;
      return [
        routesHandled.increase(route),
        onInternalEvent(route, bindActionTo(toState, action))
      ]
    }
    function decomposeTransitionsForEvent (acc, [eventName, transitionsAndAction]) {
      const {
        states,
        routes,
        configs
      } = expandTransitions(transitionsAndAction, canWarn);
      if (canWarn()) {
        allStates.push(...states);
        allRoutes.push(...routes);
      }
      return {
        ...acc,
        [eventName]: configs
      }
    }
    function ifStateThenEnterState ({ fromState, toState, action, args }) {
      return inState(fromState, () => {
        enter(toState, ...args);
        isFunction(action) && runActionFor(toState, action, ...args);
        return true
      })
    }
    function createEventHandlerForTransition ([eventName, configs]) {
      return [
        eventsHandled.increase(eventName),
        onEvent(eventName, (...args) => {
          const eventWasHandled = configs
            .map(config => ({ ...config, args }))
            .some(ifStateThenEnterState);
          if (!eventWasHandled) {
            transitionNoOp(`Event not handled: "${eventName}"`);
          }
        })
      ].concat(
        configs.map(({ fromState, toState }) =>
          transitionsFromEvents.define(`${eventName}:${fromState}`, toState)
        )
      )
    }
    function runActionFor (state, actionFn, ...args) {
      const onExitingState = actionFn(...args);
      if (isFunction(onExitingState)) {
        const uninstall = Once(enterExitMethods[ON_EXITING](state, (toState) => {
          uninstall();
          onExitingState(toState);
        }));
        allCleanupFns.push(uninstall);
      }
    }
    function bindActionTo (state, actionFn) {
      return (...args) => runActionFor(state, actionFn, ...args)
    }
  }
  function _peek (eventName, stateObject, calledInternally = true) {
    const err1 = argTypeError({ eventName: isString })('peek')(eventName);
    if (err1) {
      throw new TypeError(err1)
    }
    const eventAndState = eventName + ':' + currentState();
    const statesFromEvent = transitionsFromEvents.definitionsOf(eventAndState);
    if (statesFromEvent.length > 1) {
      const reason =
        `${logPrefix}: Event "${eventName}" causes multiple transitions.\n` +
        `  > From state: "${currentState()}"\n` +
        `  > To states: "${statesFromEvent.join(', ')}"\n\n` +
        `Check your performTransitions() config.`;
      throw new RangeError(reason)
    }
    if (!calledInternally && statesFromEvent.length === 0) {
      if (eventsHandled.countOf(eventName) === 0) {
        _console.warn(`${logPrefix}: Event not handled: "${eventName}"`);
      } else {
        _console.warn(`${logPrefix}: Will not transition after emitting: "${eventName}"`);
      }
    }
    const toState = statesFromEvent[0];
    if (isUndefined(stateObject)) {
      return isUndefined(toState) ? currentState() : toState
    }
    const err2 = argTypeError({ stateObject: isPojo })('peek')(stateObject);
    if (err2) {
      throw new TypeError(err2)
    }
    if (Object.prototype.hasOwnProperty.call(stateObject, toState)) {
      const anyOrFn = stateObject[toState];
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
    )('canTransitionTo')([states]);
    if (err) {
      throw new TypeError(err)
    }
    if (!states.length) {
      return false
    }
    const nextStates = statesAvailableFromHere();
    return states.every(state => nextStates.includes(state))
  }
  function canTransitionTo (...states) {
    const testStates = states.flat();
    if (
      testStates.length === 2 &&
      isString(testStates[0]) &&
      isPojo(testStates[1])
    ) {
      const thisState = testStates[0];
      const { afterEmitting } = testStates[1];
      const err = argTypeError(
        { thisState: isString, '{ afterEmitting }': isString }
      )('canTransitionTo')(thisState, afterEmitting);
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
      : currentState();
    const err = argTypeError(
      { state: isString }
    )('statesAvailableFromHere')(_state);
    if (err) {
      throw new TypeError(err)
    }
    return routes.reduce((acc, route) => {
      const [fromState, toState] = route
        .split(cxArrow)
        .map(state => state.trim());
      return (fromState === _state)
        ? [...acc, toState]
        : acc
    }, [])
  }
  function _inState (state, anyOrFn, ...fnArgs) {
    const conditionMatches = currentState() === state;
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
      .find(([state]) => _inState(state));
    return match
      ? _inState(...match.concat(fnArgs))
      : null
  }
  function inState (...args) {
    const err = argTypeError(
      { state: [isString, isPojo] }
    )('inState')(args[0]);
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
    )('emit')(eventName);
    if (err) {
      throw new TypeError(err)
    }
    _peek(eventName);
    return events.emit(eventName, ...args)
  };
  const enter = (state, ...args) => {
    const err = argTypeError(
      { state: isString }
    )('enter')(state);
    if (err) {
      throw new TypeError(err)
    }
    const inState = currentState();
    const toState = state;
    if (toState === inState) {
      transitionNoOp(`Already in state: "${toState}"`);
      return false
    }
    if (!states.includes(toState)) {
      transitionNoOp(`Invalid state "${toState}", not switching`);
      return false
    }
    const nextRoute = `${inState}->${toState}`;
    if (!routes.includes(nextRoute)) {
      transitionNoOp(`Invalid transition "${nextRoute}", not switching`);
      return false
    }
    _console.info(`${logPrefix}: tId<${++transitionId}>: ${nextRoute}`);
    stateHistory.push(toState);
    if (stateHistory.length > stateHistoryLimit) {
      stateHistory.shift();
    }
    emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHING], toState, inState, ...args);
    emitInternalEvent(nextRoute, ...args);
    emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHED], toState, inState, ...args);
    return true
  };
  function onEvent (eventName, cb) {
    const err = argTypeError(
      { eventName: isString, cb: isFunction }
    )('onEvent')(eventName, cb);
    if (err) {
      throw new TypeError(err)
    }
    events.on(eventName, cb);
    return () => events.off(eventName, cb)
  }
  const switchMethods = Object
    .keys(INTERNAL_EVENTS)
    .reduce((obj, methodName) => ({
      ...obj,
      [methodName]: cb => {
        const err = argTypeError({ cb: isFunction })(methodName)(cb);
        if (err) {
          throw new TypeError(err)
        }
        const decreaseRefCount = statesHandled.increase(
          INTERNAL_EVENTS[methodName]
        );
        const removeEvent = onInternalEvent(
          INTERNAL_EVENTS[methodName], cb
        );
        return () => {
          removeEvent();
          decreaseRefCount();
        }
      }
    }), {});
  const enterExitMethods = [
    [ON_EXITING, ON_SWITCHING],
    [ON_ENTERING, ON_SWITCHING],
    [ON_EXITED, ON_SWITCHED],
    [ON_ENTERED, ON_SWITCHED]
  ]
    .reduce((obj, names) => {
      const [methodName, switchMethod] = names;
      const name = methodName.slice(2);
      const eventName = name.toLowerCase();
      return {
        ...obj,
        [methodName]: (state, cb) => {
          const err = argTypeError(
            { state: isString, cb: isFunction }
          )(methodName)(state, cb);
          if (err) {
            throw new TypeError(err)
          }
          const decreaseRefCounts = [
            statesHandled.increase(state),
            statesHandled.increase(`${state}:${eventName}`)
          ];
          const removeEvent = switchMethods[switchMethod](
            (toState, fromState, ...args) => {
              if (name.indexOf('Exit') === 0) {
                state === fromState && cb(toState, ...args);
              } else {
                state === toState && cb(fromState, ...args);
              }
            }
          );
          return () => {
            removeEvent();
            decreaseRefCounts.map(fn => fn());
          }
        }
      }
    }, {});
  function Emit (eventName, ...curriedArgs) {
    const err = argTypeError({ eventName: isString })('Emit')(eventName);
    if (err) {
      throw new TypeError(err)
    }
    return (...args) => emit(eventName, ...[...curriedArgs, ...args])
  }
  function Enter (state, ...curriedArgs) {
    const err = argTypeError({ state: isString })('Enter')(state);
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
    const err = argTypeError({ state: [isString, isPojo] })('InState')(args[0]);
    if (err) {
      throw new TypeError(err)
    }
    return isPojo(args[0])
      ? _InStateObject(...args)
      : _InState(...args)
  }
  function reset () {
    _console.warn(`${logPrefix}: State-machine reset!`);
    stateHistory.length = 0;
    stateHistory.push(startIn);
  }
  function transitionNoOp (message) {
    const lastState = previousState();
    const inState = currentState();
    const prevRoute =
      `${isUndefined(lastState) ? '[undefined]' : lastState}->${inState}`;
    const availableStates = statesAvailableFromHere();
    if (!availableStates.length) {
      _console.info(
        `${logPrefix}: ${message}\n` +
          `  > Previous transition: "${prevRoute}"\n` +
          `  > There are no states available from "${inState}"`
      );
    } else {
      _console.info(
        `${logPrefix}: ${message}\n` +
          `  > Previous transition: "${prevRoute}"\n` +
          `  > From "${inState}", valid states are: [${availableStates
            .map(state => `"${state}"`)
            .join(', ')}]`
      );
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
    _console.log(`${logPrefix}: Information about this state-machine`);
    logRefCounterInfo(statesHandled);
    logRefCounterInfo(routesHandled);
    logRefCounterInfo(eventsHandled);
  }
  function logRefCounterInfo (refCounter) {
    const { description, table } = refCounter.toValue();
    _console.log(description);
    if (table.length) {
      _console.table(table);
    } else {
      _console.log('  > No information');
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
  const transitionsForEvents = {};
  const transitionsOnly = [];
  Object
    .entries(hitcherActions)
    .map(([routeChart, actionFnOrConfigObj]) => {
      if (isFunction(actionFnOrConfigObj)) {
        transitionsOnly.push({ routeChart, action: actionFnOrConfigObj });
        return
      }
      if (!isPojo(actionFnOrConfigObj)) {
        return
      }
      const { on: _on, then: _then } = actionFnOrConfigObj;
      const hasValidEventNames = isString(_on) || isArray(_on);
      if (hasValidEventNames) {
        const eventNames = [_on].flat();
        eventNames.map(name => {
          transitionsForEvents[name] = transitionsForEvents[name] || [];
          transitionsForEvents[name].push({ routeChart, action: _then });
        });
        return
      }
      if (isFunction(_then)) {
        transitionsOnly.push({ routeChart, action: actionFnOrConfigObj });
      }
    });
  return { transitionsForEvents, transitionsOnly }
}
function expandTransitions (configs, canWarn) {
  const allStates = [];
  const allRoutes = [];
  const _configs = configs.reduce((acc, config) => {
    const { routeChart, action } = config;
    const { states, routes, transitions } = decomposeChart(routeChart);
    if (canWarn()) {
      allStates.push(...states);
      allRoutes.push(...routes);
    }
    return [
      ...acc,
      ...transitions.map(([fromState, toState]) =>
        ({ fromState, toState, action })
      )
    ]
  }, []);
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

exports.Statebot = Statebot;
exports.decomposeChart = decomposeChart;
exports.isStatebot = isStatebot;
//# sourceMappingURL=statebot.js.map
