
/*
 * Statebot
 * v2.3.4
 * https://shuckster.github.io/statebot/
 * License: ISC
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var events = _interopDefault(require('events'));

var utils = {
  isArray,
  isEventEmitter,
  isFunction,
  isPojo,
  isString,
  isTemplateLiteral,
  uniq,
  Defer,
  Once,
  Revokable,
  ReferenceCounter,
  ArgTypeError,
  Logger
};
function isArray (obj) {
  return Array.isArray(obj)
}
function isFunction (obj) {
  return typeof obj === 'function'
}
function isString (obj) {
  return typeof obj === 'string'
}
function isObject (obj) {
  return typeof obj === 'object'
}
function isEventEmitter (obj) {
  return (
    isObject(obj) &&
    isFunction(obj.emit) &&
    isFunction(obj.addListener) &&
    isFunction(obj.removeListener)
  )
}
function isPojo (obj) {
  if (obj === null || (!isObject(obj))) {
    return false
  }
  return Object.getPrototypeOf(obj) === Object.prototype
}
function isTemplateLiteral (obj) {
  if (isString(obj)) {
    return true
  }
  if (isArray(obj)) {
    return obj.every(item => isString(item))
  }
  return false
}
function uniq (input) {
  return input.reduce((acc, one) => (acc.indexOf(one) === -1 ? [...acc, one] : acc), [])
}
function defer (fn, ...args) {
  const timer = setTimeout(fn, 0, ...args);
  return () => {
    clearTimeout(timer);
  }
}
function Defer (fn) {
  return (...args) => defer(fn, ...args)
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
function ReferenceCounter (name, kind, description, ...expecting) {
  const _refs = {};
  [...expecting].flat().forEach(ref => {
    _refs[ref] = 0;
  });
  function increase (ref) {
    _refs[ref] = countOf(ref) + 1;
    return () => decrease(ref)
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
      description: `Statebot[${name}]: ${description}:`,
      table: table()
    }
  }
  return {
    increase: increase,
    decrease: decrease,
    countOf: countOf,
    toValue: toValue,
    refs: refs
  }
}
function ArgTypeError (errPrefix = '') {
  return function (fnName, typeMap, ...args) {
    const argMap = Object.entries(typeMap)
      .map(([argName, argType]) => {
        return { argName, argType }
      });
    const signature = Object.keys(typeMap).join(', ');
    const err = args
      .map((arg, index) => {
        const { argName, argType } = argMap[index];
        if (arg === undefined) {
          return `Argument undefined: "${argName}"`
        }
        let errorDesc;
        let typeName;
        let typeMatches;
        if (isFunction(argType)) {
          typeMatches = argType(arg) === true;
          typeName = argType.name;
          errorDesc = `${typeName}(${argName}) did not return true`;
        } else {
          typeMatches = typeof arg === argType;
          typeName = argType;
          errorDesc = `Argument "${argName}" should be a ${typeName}`;
        }
        if (!typeMatches) {
          return (
            `${errorDesc}: ${argName} === ${typeof arg}(${arg})`
          )
        }
      })
      .filter(Boolean);
    if (!err.length) {
      return undefined
    } else {
      return (
        `\n${errPrefix}${fnName}(${signature}):\n` +
        `${err.map(err => `> ${err}`).join('\n')}`
      )
    }
  }
}
function Logger (level) {
  let _level = level;
  if (isString(_level)) {
    _level = ({
      info: 3,
      log: 2,
      warn: 1,
      none: 0
    })[_level] || 3;
  }
  function canWarn () {
    return _level >= 1
  }
  function canLog () {
    return _level >= 2
  }
  function canInfo () {
    return _level >= 3
  }
  return {
    canWarn,
    canLog,
    canInfo,
    info: (...args) => canInfo() && console.info(...args),
    table: (...args) => canLog() && console.table(...args),
    log: (...args) => canLog() && console.log(...args),
    warn: (...args) => canWarn() && console.warn(...args),
    error: (...args) => console.error(...args)
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
var parsing = {
  cxPipe,
  cxArrow,
  rxDisallowedCharacters,
  decomposeChart,
  decomposeRoute
};
const { uniq: uniq$1, ArgTypeError: ArgTypeError$1, isTemplateLiteral: isTemplateLiteral$1 } = utils;
const argTypeError = ArgTypeError$1('statebot.');
function decomposeRoute (templateLiteral) {
  const err = argTypeError('decomposeRoute',
    { templateLiteral: isTemplateLiteral$1 },
    templateLiteral
  );
  if (err) {
    throw TypeError(err)
  }
  const lines = condensedLines(templateLiteral);
  const flattenedRoute = tokenisedLines(lines).flat(2);
  return flattenedRoute
}
/**
 * Decompose a {@link statebotChart} into an object of `states`, `routes`,
 * and `transitions`.
 *
 * Statebot() uses this internally to parse charts. Exposed for debugging.
 *
 * @memberof statebot
 * @function
 * @param {statebotChart} chart
 * @returns {Object}
 *
 * @example
 * var { states, routes, transitions } = decomposeChart`
 *   pending ->
 *     success | failure
 * `
 * // states = ['pending', 'success', 'failure']
 * // routes = [ 'pending->success', 'pending->failure']
 * // transitions = [
 * //   ['pending', 'success'],
 * //   ['pending', 'failure']
 * // ]
 */
function decomposeChart (chart) {
  const err = argTypeError('decomposeChart',
    { chart: isTemplateLiteral$1 },
    chart
  );
  if (err) {
    throw TypeError(err)
  }
  const lines = condensedLines(chart);
  const linesOfTokens = tokenisedLines(lines);
  const linesOfRoutes = linesOfTokens
    .map(decomposeRouteFromTokens)
    .flat(1);
  const linesOfTransitions = linesOfRoutes
    .map(decomposeTransitionsFromRoute)
    .flat(1);
  const states = [];
  const routeKeys = linesOfTransitions.map(route => {
    states.push(...route);
    return route.join(cxArrow)
  });
  const filteredRoutes = uniq$1(routeKeys);
  const filteredStates = uniq$1(states);
  return {
    transitions: filteredRoutes.map(route => route.split(cxArrow)),
    routes: filteredRoutes,
    states: filteredStates
  }
}
function linesFrom (strOrArr) {
  return [strOrArr]
    .flat()
    .reduce((acc, line) => [...acc, line.split(rxCRLF)], [])
    .flat()
}
function condensedLines (strOrArr) {
  const input = linesFrom(strOrArr);
  const output = [];
  input.reduce((condensedLine, line) => {
    const sanitisedLine = line
      .replace(rxComment, '')
      .replace(rxDisallowedCharacters, '');
    if (!sanitisedLine) {
      return condensedLine
    }
    if (rxLineContinuations.test(sanitisedLine)) {
      return condensedLine + sanitisedLine
    }
    output.push(condensedLine + sanitisedLine);
    return ''
  }, '');
  return output
}
function tokenisedLines (lines) {
  return lines.map(line => line.split(cxArrow).map(str => str.split(cxPipe)))
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
function decomposeTransitionsFromRoute ([fromStates, toStates]) {
  return fromStates.reduce((acc, fromState) => [
    ...acc,
    ...toStates.map(toState => {
      return [fromState, toState]
    })
  ], [])
}

var statebot = {
  Statebot,
  isStatebot
};
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
const {
  isArray: isArray$1,
  isEventEmitter: isEventEmitter$1,
  isFunction: isFunction$1,
  isPojo: isPojo$1,
  isString: isString$1,
  ArgTypeError: ArgTypeError$2,
  Logger: Logger$1,
  ReferenceCounter: ReferenceCounter$1
} = utils;
const { decomposeChart: decomposeChart$1, cxArrow: cxArrow$1 } = parsing;
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
  if (!isString$1(name)) {
    throw TypeError('\nStatebot: Please specify a name for this machine')
  }
  const logPrefix = `Statebot[${name}]`;
  if (!isPojo$1(options)) {
    throw TypeError(`\n${logPrefix}: Please specify options for this machine`)
  }
  const {
    chart = undefined,
    logLevel = 3,
    historyLimit = 2
  } = options || {};
  const argTypeError = ArgTypeError$2(`${logPrefix}#`);
  const console = Logger$1(logLevel);
  const { canWarn } = console;
  const {
    states = [],
    routes = []
  } = chart ? decomposeChart$1(chart) : options;
  const { startIn = states[0] } = options;
  if (!states.includes(startIn)) {
    throw Error(`${logPrefix}: Starting-state not in chart: "${startIn}"`)
  }
  let transitionId = 0;
  const stateHistory = [startIn];
  const stateHistoryLimit = Math.max(historyLimit, 2);
  const events$1 = isEventEmitter$1(options.events) ? options.events : new events();
  const internalEvents = new events();
  const INTERNAL_EVENTS = {
    onSwitching: '(ANY)state:changing',
    onSwitched: '(ANY)state:changed'
  };
  function emitInternalEvent (eventName, ...args) {
    return internalEvents.emit(eventName, ...args)
  }
  function onInternalEvent (eventName, fn) {
    internalEvents.addListener(eventName, fn);
    return function () {
      internalEvents.removeListener(eventName, fn);
    }
  }
  const statesHandled = ReferenceCounter$1(
    name,
    'states',
    'Listening for the following state-changes',
    [...states]
  );
  const routesHandled = ReferenceCounter$1(
    name,
    'transitions',
    'Listening for the following transitions',
    [...routes]
  );
  const eventsHandled = ReferenceCounter$1(
    name,
    'events',
    'Listening for the following events'
  );
  function applyHitcher (hitcher, fnName) {
    const hitcherActions =
      isFunction$1(hitcher)
        ? hitcher({ enter, emit, Enter, Emit })
        : isPojo$1(hitcher)
          ? hitcher
          : null;
    if (!isPojo$1(hitcherActions)) {
      throw TypeError(
        `Statebot[${name}]#${fnName}(): Expected an object, or a function that returns an object`
      )
    }
    const events = {};
    const transitions = [];
    Object.entries(hitcherActions)
      .forEach(([routeChart, actionOrConfig]) => {
        if (isFunction$1(actionOrConfig)) {
          transitions.push({ routeChart, action: actionOrConfig });
        } else if (!isPojo$1(actionOrConfig)) {
          return
        }
        const { on: _on, then: _then } = actionOrConfig;
        if (isString$1(_on) || isArray$1(_on)) {
          const eventNames = [_on].flat();
          eventNames.forEach(eventName => {
            events[eventName] = events[eventName] || [];
            events[eventName].push({ routeChart, action: _then });
          });
        } else if (isFunction$1(_then)) {
          transitions.push({ routeChart, action: actionOrConfig });
        }
      });
    const allStates = [];
    const allRoutes = [];
    const decomposedEvents = Object.entries(events)
      .reduce((acc, [eventName, _configs]) => {
        const { states, routes, configs } = decomposeConfigs(_configs, canWarn);
        if (canWarn()) {
          allStates.push(...states);
          allRoutes.push(...routes);
        }
        return {
          ...acc,
          [eventName]: configs
        }
      }, {});
    const allCleanupFns = [];
    allCleanupFns.push(
      ...Object.entries(decomposedEvents)
        .map(([eventName, configs]) =>
          [
            eventsHandled.increase(eventName),
            onEvent(eventName, (...args) => {
              const eventWasHandled = configs.some(
                ({ fromState, toState, action }) => {
                  const passed = inState(fromState, () => {
                    enter(toState, ...args);
                    if (isFunction$1(action)) {
                      action(...args);
                    }
                    return true
                  });
                  return !!passed
                });
              if (!eventWasHandled) {
                transitionNoOp(`Event not handled: "${eventName}"`);
              }
            })
          ]
        ).flat()
    );
    const transitionConfigs = decomposeConfigs(transitions, canWarn);
    if (canWarn()) {
      allStates.push(...transitionConfigs.states);
      allRoutes.push(...transitionConfigs.routes);
    }
    allCleanupFns.push(
      ...transitionConfigs.configs.map(transition => {
        const { fromState, toState, action } = transition;
        const route = `${fromState}->${toState}`;
        return [
          routesHandled.increase(route),
          onInternalEvent(route, action)
        ]
      }).flat()
    );
    if (canWarn()) {
      const invalidStates = allStates.filter(state => !states.includes(state));
      const invalidRoutes = allRoutes.filter(route => !routes.includes(route));
      if (invalidStates.length) {
        console.warn(
          `Statebot[${name}]#${fnName}(): Invalid states specified:\n` +
          invalidStates.map(state => `  > "${state}"`).join('\n')
        );
      }
      if (invalidRoutes.length) {
        console.warn(
          `Statebot[${name}]#${fnName}(): Invalid transitions specified:\n` +
          invalidRoutes.map(route => `  > "${route}"`).join('\n')
        );
      }
    }
    return () => allCleanupFns.forEach(fn => fn())
  }
  function previousState () {
    return stateHistory[stateHistory.length - 2]
  }
  function currentState () {
    return stateHistory[stateHistory.length - 1]
  }
  function canTransitionTo (...states) {
    const testStates = states.flat();
    const err = argTypeError('canTransitionTo', { state: isString$1 }, testStates[0]);
    if (err) {
      throw TypeError(err)
    }
    if (!testStates.length) {
      return false
    }
    const nextStates = statesAvailableFromHere();
    return testStates.every(state => nextStates.includes(state))
  }
  function statesAvailableFromHere (state) {
    const _state = state !== undefined
      ? state
      : currentState();
    const err = argTypeError('statesAvailableFromHere', { state: isString$1 }, _state);
    if (err) {
      throw TypeError(err)
    }
    return routes.reduce((acc, route) => {
      const [fromState, toState] = route.split(cxArrow$1)
        .map(state => state.trim());
      if (fromState === _state) {
        return [...acc, toState]
      }
      return acc
    }, [])
  }
  function inState (state, anyOrFn, ...fnArgs) {
    const err = argTypeError('inState', { state: isString$1 }, state);
    if (err) {
      throw TypeError(err)
    }
    const conditionMatches = currentState() === state;
    if (anyOrFn !== undefined) {
      if (!conditionMatches) {
        return null
      }
      if (isFunction$1(anyOrFn)) {
        return anyOrFn(...fnArgs)
      }
      return anyOrFn
    }
    return conditionMatches
  }
  function emit (eventName, ...args) {
    const err = argTypeError('emit', { eventName: isString$1 }, eventName);
    if (err) {
      throw TypeError(err)
    }
    return events$1.emit(eventName, ...args)
  }
  function enter (state, ...args) {
    const err = argTypeError('enter', { state: isString$1 }, state);
    if (err) {
      throw TypeError(err)
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
    console.info(`${logPrefix}: tId<${++transitionId}>: ${nextRoute}`);
    stateHistory.push(toState);
    if (stateHistory.length > stateHistoryLimit) {
      stateHistory.shift();
    }
    emitInternalEvent(INTERNAL_EVENTS.onSwitching, toState, inState, ...args);
    emitInternalEvent(nextRoute, ...args);
    emitInternalEvent(INTERNAL_EVENTS.onSwitched, toState, inState, ...args);
    return true
  }
  function onEvent (eventName, cb) {
    const err = argTypeError('onEvent', { eventName: isString$1, cb: isFunction$1 }, eventName, cb);
    if (err) {
      throw TypeError(err)
    }
    events$1.addListener(eventName, cb);
    return () => events$1.removeListener(eventName, cb)
  }
  const switchMethods = Object.keys(INTERNAL_EVENTS)
    .reduce((obj, methodName) => {
      return {
        ...obj,
        [methodName]: function (cb) {
          const err = argTypeError(methodName, { cb: isFunction$1 }, cb);
          if (err) {
            throw TypeError(err)
          }
          const decreaseRefCount = statesHandled.increase(INTERNAL_EVENTS[methodName]);
          const removeEvent = onInternalEvent(
            INTERNAL_EVENTS[methodName],
            (toState, fromState, ...args) => {
              cb(toState, fromState, ...args);
            }
          );
          return () => {
            removeEvent();
            decreaseRefCount();
          }
        }
      }
    }, {});
  const enterExitMethods = [
    ['Exiting', 'onSwitching'],
    ['Entering', 'onSwitching'],
    ['Exited', 'onSwitched'],
    ['Entered', 'onSwitched']
  ]
    .reduce((obj, names) => {
      const [name, switchMethod] = names;
      const methodName = `on${name}`;
      const eventName = name.toLowerCase();
      return {
        ...obj,
        [methodName]: function (state, cb) {
          const err = argTypeError(methodName, { state: isString$1, cb: isFunction$1 }, state, cb);
          if (err) {
            throw TypeError(err)
          }
          const decreaseRefCounts = [
            statesHandled.increase(state),
            statesHandled.increase(`${state}:${eventName}`)
          ];
          const removeEvent = switchMethods[switchMethod]((toState, fromState, ...args) => {
            if (name.indexOf('Exit') === 0) {
              if (state === fromState) {
                cb(toState, ...args);
              }
            } else {
              if (state === toState) {
                cb(fromState, ...args);
              }
            }
          });
          return () => {
            removeEvent();
            decreaseRefCounts.map(fn => fn());
          }
        }
      }
    }, {});
  function Emit (eventName, ...curriedArgs) {
    const err = argTypeError('Emit', { eventName: isString$1 }, eventName);
    if (err) {
      throw TypeError(err)
    }
    return (...args) => emit(eventName, ...[...curriedArgs, ...args])
  }
  function Enter (state, ...curriedArgs) {
    const err = argTypeError('Enter', { state: isString$1 }, state);
    if (err) {
      throw TypeError(err)
    }
    return (...args) => enter(state, ...[...curriedArgs, ...args])
  }
  function InState (state, anyOrFn, ...curriedFnArgs) {
    const err = argTypeError('InState', { state: isString$1 }, state);
    if (err) {
      throw TypeError(err)
    }
    return (...fnArgs) =>
      inState(state, anyOrFn, ...[...curriedFnArgs, ...fnArgs])
  }
  function reset () {
    console.warn(`${logPrefix}: State-machine reset!`);
    stateHistory.length = 0;
    stateHistory.push(startIn);
  }
  function transitionNoOp (message) {
    const lastState = previousState();
    const inState = currentState();
    const prevRoute = `${lastState === undefined ? '[undefined]' : lastState}->${inState}`;
    const availableStates = statesAvailableFromHere();
    if (!availableStates.length) {
      console.info(
        `${logPrefix}: ${message}\n` +
          `  > Previous transition: "${prevRoute}"\n` +
          `  > There are no states available from "${inState}"`
      );
    } else {
      console.info(
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
    console.log(`${logPrefix}: Information about this state-machine`);
    logRefCounterInfo(statesHandled);
    logRefCounterInfo(routesHandled);
    logRefCounterInfo(eventsHandled);
  }
  function logRefCounterInfo (refCounter) {
    const { description, table } = refCounter.toValue();
    console.log(description);
    if (table.length) {
      console.table(table);
    } else {
      console.log('  > No information');
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
     *         play |
     *         options |
     *         sound |
     *         quit
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
    canTransitionTo: canTransitionTo,
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
    currentState: currentState,
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
    emit: emit,
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
    Emit: Emit,
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
     * // [dialog]: Invalid transition "idle->saving", not switching
     * // > Previous transition: "[undefined]->idle"
     * // > From "idle", valid states are: ["showing-modal"]
     *
     * machine.enter('showing-modal')
     * // true
     */
    enter: enter,
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
    Enter: Enter,
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
     * @memberof statebotFsm
     * @instance
     * @function
     * @param {string} state The state to test against.
     * @param {any|function} [outputWhenTrue]
     *  Optional `true`-value. If a function is specified, it will be
     *  called and its return value will be used.
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
     * machine.inState('idle', () => {
     *   console.log('Idling!')
     *   return 'Purrrr...'
     * })
     * // null
     * // ^ the function is not called at all in the `false` case,
     * //   so no console.log either.
     */
    inState: inState,
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
    InState: InState,
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
    onEntered: enterExitMethods.onEntered,
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
    onEntering: enterExitMethods.onEntering,
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
    onEvent: onEvent,
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
    onExited: enterExitMethods.onExited,
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
    onExiting: enterExitMethods.onExiting,
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
    onSwitched: switchMethods.onSwitched,
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
    onSwitching: switchMethods.onSwitching,
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
     * Perform transitions when events happen.
     *
     * Use `then` to optionally add callbacks to those transitions.
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
    previousState: previousState,
    /**
     * Returns the state-machine to its starting-state and clears the
     * state-history.
     *
     * All listeners will still be attached, but no events or transitions will be fired.
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
    reset: reset,
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
    statesAvailableFromHere: statesAvailableFromHere
  }
}
function decomposeConfigs (configs, canWarn) {
  const allStates = [];
  const allRoutes = [];
  const _configs = configs.reduce((acc, config) => {
    const { routeChart, action } = config;
    const { states, routes, transitions } = decomposeChart$1(routeChart);
    if (canWarn()) {
      allStates.push(...states);
      allRoutes.push(...routes);
    }
    return [
      ...acc,
      ...transitions.map(transition => {
        const [fromState, toState] = transition;
        return { fromState, toState, action }
      })
    ]
  }, []);
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
    isPojo$1(object) &&
    typeof object.__STATEBOT__ === 'number'
  )
}

var assertions = {
  routeIsPossible,
  assertRoute
};
const { isStatebot: isStatebot$1 } = statebot;
const { decomposeRoute: decomposeRoute$1 } = parsing;
const {
  Defer: Defer$1,
  Once: Once$1,
  Revokable: Revokable$1,
  Logger: Logger$2,
  ArgTypeError: ArgTypeError$3,
  isTemplateLiteral: isTemplateLiteral$2
} = utils;
const argTypeError$1 = ArgTypeError$3('statebot.');
/**
 * Assert that a certain route can be followed by a
 * {@link #statebotfsm|statebotFsm}.
 *
 * This merely tests that a certain path can be taken through a
 * state-machine. It doesn't assert that the states are moved-through
 * while the machine is working, as with
 * {@link #statebotassertroute|assertRoute()}.
 *
 * @memberof statebot
 * @function
 * @param {statebotFsm} machine
 *  The machine to test the route on.
 * @param {string|string[]} route
 *  The route to test as an arrow-delimited string:
 *
 *  `
 *  "idle -> pending -> success -> done"
 *  `
 * @returns {boolean}
 *
 * @example
 * var machine = Statebot(...)
 *
 * routeIsPossible(machine,
 *   'walking -> falling -> splatting -> walking'
 * )
 * // false
 */
function routeIsPossible (machine, route) {
  const err = argTypeError$1('routeIsPossible',
    { machine: isStatebot$1, route: isTemplateLiteral$2 },
    machine, route
  );
  if (err) {
    throw TypeError(err)
  }
  const _route = decomposeRoute$1(route);
  return _route.every((state, index) => {
    if (index === _route.length - 1) {
      return true
    } else {
      const nextState = _route[index + 1];
      const availableStates = machine.statesAvailableFromHere(state);
      const passes = availableStates.includes(nextState);
      return passes
    }
  })
}
let assertionId = 0;
/**
 * {@link #statebotassertroute|assertRoute()} options.
 * @typedef {Object} assertRouteOptions
 * @property {string} [description]
 *  Describe the success-condition for this assertion.
 * @property {string} [fromState=""]
 *  Wait for the machine to be in this state before assertion begins.
 * @property {function} [run]
 *  Run this function just before starting the assertion.
 * @property {number} [permittedDeviations=0]
 *  If we hit an unexpected state during assertion, this is a "deviation".
 *  It might be that the FSM will come back to the expected state again
 *  after a certain number of these. For example, if your FSM has a
 *  "retry" route configured, this number can account for it.
 * @property {number} [timeoutInMs=1000]
 *  Permitted length of time for the entire assertion, in milliseconds.
 * @property {number} [logLevel=3]
 *  Normally we want logs for assertions, right? Well, you can tune
 *  them just like you can with {@link #statebotoptions|statebotOptions}.
 */
/**
 * Assert that a {@link #statebotfsm|statebotFsm} traced the route specified.
 *
 * Whereas {@link #statebotrouteispossible|routeIsPossible()} only checks
 * that a particular route can be followed, `assertRoute` will hook-into
 * a machine and wait for it to trace the specified path within a
 * timeout period.
 *
 * @memberof statebot
 * @function
 * @async
 * @param {statebotFsm} machine
 *  The machine to run the assertion on.
 * @param {string|string[]} expectedRoute
 *  The expected route as an arrow-delimited string:
 *
 *  `
 *  "idle -> pending -> success -> done"
 *  `
 * @param {assertRouteOptions} [options]
 * @returns {Promise}
 *
 * @example
 * var machine = Statebot(...)
 *
 * assertRoute(
 *   machine, 'prepare -> debounce -> sending -> done -> idle',
 *   {
 *     description: 'Email sent with no issues',
 *     fromState: 'idle',
 *     timeoutInMs: 1000 * 20,
 *     permittedDeviations: 0,
 *     logLevel: 3
 *   }
 * )
 * .then(() => console.log('Assertion passed!'))
 * .catch(err => console.error(`Whoops: ${err}`))
 *
 * machine.enter('idle')
 */
function assertRoute (machine, expectedRoute, options) {
  const err = argTypeError$1('assertRoute',
    { machine: isStatebot$1, expectedRoute: isTemplateLiteral$2 },
    machine, expectedRoute
  );
  if (err) {
    throw TypeError(err)
  }
  assertionId += 1;
  const {
    description = 'Assertion complete',
    fromState = '',
    run = () => {},
    permittedDeviations = 0,
    timeoutInMs = 1000,
    logLevel = 3
  } = options || {};
  const console = Logger$2(logLevel);
  const prefix = `Statebot[${machine.name()}]: aId<${assertionId}>`;
  const route = decomposeRoute$1(expectedRoute);
  console.log(`\n${prefix}: Asserting route: [${route.join(' > ')}]`);
  console.log(`${prefix}: > Assertion will start from state: "${fromState}"`);
  const fromStateActionFn = Defer$1(run);
  let removeFromStateActionFn = () => { };
  const totalTimeTaken = TimeTaken();
  let stateTimeTaken = TimeTaken();
  let assertionTimeoutTimer;
  let deviations = 0;
  let pending = true;
  let unexpected = false;
  const consumeRoute = [...route];
  const report = Table(
    ['state', 'expected', 'info', 'took'],
    ['center', 'center', 'left', 'right']
  );
  const finaliseReport = Once$1(err => {
    addRow('', '', '', 'TOTAL: ' + totalTimeTaken());
    report.lock();
    console.log(`\n${prefix}: ${description}: [${err ? 'FAILED' : 'SUCCESS'}]`);
    console.table(report.content());
    return err
  });
  const { addRow } = report;
  function enteredState (state) {
    if (pending) {
      addRow(state, '-', 'PENDING');
    } else {
      const expectedState = consumeRoute[0];
      if (expectedState === state) {
        addRow(state, expectedState, unexpected ? 'REALIGNED' : 'OKAY', stateTimeTaken());
        unexpected = false;
        consumeRoute.shift();
      } else {
        addRow(state, expectedState, 'WRONG STATE', stateTimeTaken());
        unexpected = true;
        deviations += 1;
      }
      stateTimeTaken = TimeTaken();
    }
  }
  return new Promise((resolve, reject) => {
    if (consumeRoute.length === 0) {
      reject(finaliseReport(new Error('NO ROUTE TO TEST')));
      return
    }
    const clearTimeoutAndResolve = (...args) => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      resolve(...args);
    };
    const clearTimeoutAndReject = err => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      reject(err);
    };
    const bailout = message => {
      while (consumeRoute.length) {
        const expectedState = consumeRoute.shift();
        addRow(machine.currentState(), `(${expectedState})`, message);
        unexpected = false;
      }
      clearTimeoutAndReject(finaliseReport(new Error(message)));
    };
    if (machine.inState(fromState)) {
      pending = false;
      removeFromStateActionFn = fromStateActionFn();
    }
    const { revoke, fn } = Revokable$1(state => {
      assertionTimeoutTimer = setTimeout(() => {
        revoke();
        bailout('TIMEOUT');
      }, timeoutInMs);
      enteredState(state);
      if (pending && state === fromState) {
        pending = false;
        removeFromStateActionFn = fromStateActionFn();
      }
      if (deviations > permittedDeviations) {
        revoke();
        bailout('TOO MANY DEVIATIONS');
      }
      if (consumeRoute.length <= 0) {
        revoke();
        clearTimeoutAndResolve(finaliseReport());
      }
    });
    const removeOnSwitchingListener = machine.onSwitching(fn);
  })
}
function Table (columns = [], alignments = []) {
  const table = [];
  const alignment = columns.map((_, index) => alignments[index] || 'center');
  let locked = false;
  function lock () {
    locked = true;
  }
  function addRow (...args) {
    if (locked) {
      return
    }
    const obj = columns.reduce((acc, col, index) => {
      const row = args[index] || '';
      return {
        ...acc,
        [col]: row
      }
    }, {});
    table.push(obj);
  }
  function colSizes () {
    return table.reduce((acc, row) => columns.map((col, index) => Math.max(row[col].length, acc[index])), columns.map(() => 0))
  }
  function padLeft (str, len) {
    return str + ' '.repeat(len - str.length)
  }
  function padRight (str, len) {
    return ' '.repeat(len - str.length) + str
  }
  function content () {
    const sizes = colSizes();
    function formatField (value, index) {
      const size = sizes[index];
      const align = alignment[index];
      if (align === 'left') {
        return padLeft(value, size)
      }
      if (align === 'right') {
        return padRight(value, size)
      }
      return value
    }
    const output = table.reduce((acc, row) => {
      const formattedRow = columns.reduce((acc, col, index) => ({
        ...acc,
        [col]: formatField(row[col], index)
      }), {});
      return [...acc, formattedRow]
    }, []);
    return output
  }
  return {
    lock: lock,
    addRow: addRow,
    content: content
  }
}
function TimeTaken () {
  const startTime = Date.now();
  function fmt (num, digits) {
    return num.toFixed(digits).replace(/\.0+$/, '')
  }
  return function () {
    const duration = Date.now() - startTime;
    if (duration < 500) {
      return `${fmt(duration)} ms`
    } else if (duration < 5000) {
      return `${fmt(duration / 1000, 2)} s `
    } else if (duration < 60000) {
      return `${fmt(duration / 1000, 1)} s `
    } else {
      return `${fmt(duration / 1000 / 60, 1)} m `
    }
  }
}

const { Statebot: Statebot$1, isStatebot: isStatebot$2 } = statebot;
const { assertRoute: assertRoute$1, routeIsPossible: routeIsPossible$1 } = assertions;
const { decomposeChart: decomposeChart$2 } = parsing;
/**
 * <img src="./logo-full.png" style="max-width: 255px; margin: 10px 0;" />
 *
 * Write more robust and understandable programs.
 *
 * Statebot hopes to make [Finite State Machines](https://en.wikipedia.org/wiki/Finite-state_machine) (FSMs) a little more accessible.
 *
 * You're reading the documentation. Other exits are:
 *
 * - The [README file](https://github.com/shuckster/statebot/blob/master/README.md)
 * - The [Github Repo](https://github.com/shuckster/statebot)
 * - The shell-script version, [Statebot-sh](https://github.com/shuckster/statebot-sh)
 *
 * Statebot was written by [Conan Theobald](https://github.com/shuckster/) and
 * is [ISC licensed](../LICENSE).
 *
 * ### Jump right in
 *
 * Play around with an example that uses React in [this CodeSandbox](https://codesandbox.io/s/statebot-react-ot3xe?file=/src/Loader.js).
 *
 * You can install Statebot into your `npm` project:
 *
 * ```sh
 * npm i statebot
 * ```
 *
 * ```js
 * import statebot from 'statebot'
 * ```
 *
 * Or non-`npm` project:
 *
 * ```js
 * <script src="https://unpkg.com/statebot@2.3.4/dist/browser/statebot.min.js"></script>
 * ```
 *
 * ```js
 * const { Statebot } = statebot
 * // Make machines with Statebot()
 *
 * const { isStatebot, routeIsPossible, assertRoute } = statebot
 * // These are assertion helpers you can use for testing
 * ```
 *
 * ### Open the developer-console :)
 *
 * I've included Statebot in this page. Open the developer-console to
 * follow along with the examples below:
 *
 * ```js
 * var machine = Statebot('promise-like', {
 *   chart: `
 *     // This one will behave a bit like a Promise
 *     idle -> pending ->
 *       resolved | rejected
 *
 *     // ...and we're done
 *     resolved -> done
 *     rejected -> done
 *   `,
 *   startIn: 'idle'
 * })
 *
 * machine.canTransitionTo('pending')
 * // true
 *
 * machine.enter('pending')
 * machine.statesAvailableFromHere()
 * // ["resolved", "rejected"]
 * ```
 *
 * We can hook-up events with {@link #statebotfsmperformtransitions .performTransitions()}:
 *
 * ```js
 * machine.performTransitions({
 *  'pending -> resolved': {
 *    on: 'data-loaded'
 *  },
 *  'pending -> rejected': {
 *    on: ['timeout', 'data-error'],
 *    then: (msg) => {
 *      console.warn('Uh oh...', msg)
 *    }
 *  },
 *  'resolved | rejected -> done': {
 *    on: 'thats-all-folks'
 *  }
 * })
 *
 * machine.emit('data-error', 'Did you hear that?')
 * ```
 *
 * Here's the API:
 *
 * | Hitchers | Status | Actions |
 * |-|-|-|
 * | {@link #statebotfsmperformtransitions .performTransitions()} / {@link #statebotfsmonevent .onEvent()} | {@link #statebotfsmcantransitionto .canTransitionTo()} / {@link #statebotfsmstatesavailablefromhere .statesAvailableFromHere()} | {@link #statebotfsmemit .emit()} / {@link #emit-eventname-curriedargs .Emit()} |
 * | {@link #statebotfsmontransitions .onTransitions()} | {@link #statebotfsmcurrentstate .currentState()} / {@link #statebotfsmpreviousstate .previousState()} / {@link #statebotfsmhistory .history()} | {@link #statebotfsmenter .enter()} / {@link #enter-state-curriedargs .Enter()} |
 * | {@link #statebotfsmonentering .onEntering()} / {@link #statebotfsmonentered .onEntered()} | {@link #statebotfsminstate .inState()} / {@link #instate-state-outputwhentrue-curriedfnargs .InState()} | {@link #statebotfsmreset .reset()} |
 * | {@link #statebotfsmonexiting .onExiting()} / {@link #statebotfsmonexited .onExited()} | {@link #statebotfsminfo .info()} / {@link #statebotfsminspect .inspect()} / {@link #statebotfsmname .name()} |  |
 * | {@link #statebotfsmonswitching .onSwitching()} / {@link #statebotfsmonswitched .onSwitched()} |  |  |
 *
 * <img src="./logo-small.png" style="max-width: 75px; margin: 15px 0 0 5px;" />
 *
 * @module statebot
 */
var src = {
  Statebot: Statebot$1,
  isStatebot: isStatebot$2,
  routeIsPossible: routeIsPossible$1,
  assertRoute: assertRoute$1,
  decomposeChart: decomposeChart$2
};

module.exports = src;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVib3QuZGV2LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMuanMiLCIuLi8uLi9zcmMvcGFyc2luZy5qcyIsIi4uLy4uL3NyYy9zdGF0ZWJvdC5qcyIsIi4uLy4uL3NyYy9hc3NlcnRpb25zLmpzIiwiLi4vLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLy9cbi8vIFNUQVRFQk9UIFVUSUxTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheSxcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzRnVuY3Rpb24sXG4gIGlzUG9qbyxcbiAgaXNTdHJpbmcsXG4gIGlzVGVtcGxhdGVMaXRlcmFsLFxuICB1bmlxLFxuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBSZWZlcmVuY2VDb3VudGVyLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlclxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChvYmopIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKVxufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbidcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZydcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNFdmVudEVtaXR0ZXIgKG9iaikge1xuICByZXR1cm4gKFxuICAgIGlzT2JqZWN0KG9iaikgJiZcbiAgICBpc0Z1bmN0aW9uKG9iai5lbWl0KSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLmFkZExpc3RlbmVyKSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLnJlbW92ZUxpc3RlbmVyKVxuICApXG59XG5cbmZ1bmN0aW9uIGlzUG9qbyAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgKCFpc09iamVjdChvYmopKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZVxufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTGl0ZXJhbCAob2JqKSB7XG4gIGlmIChpc1N0cmluZyhvYmopKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5ldmVyeShpdGVtID0+IGlzU3RyaW5nKGl0ZW0pKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiB1bmlxIChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIG9uZSkgPT4gKGFjYy5pbmRleE9mKG9uZSkgPT09IC0xID8gWy4uLmFjYywgb25lXSA6IGFjYyksIFtdKVxufVxuXG5mdW5jdGlvbiBkZWZlciAoZm4sIC4uLmFyZ3MpIHtcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCAwLCAuLi5hcmdzKVxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuZnVuY3Rpb24gRGVmZXIgKGZuKSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4gZGVmZXIoZm4sIC4uLmFyZ3MpXG59XG5cbmZ1bmN0aW9uIE9uY2UgKGZuKSB7XG4gIGNvbnN0IHsgcmV2b2tlLCBmbjogX2ZuIH0gPSBSZXZva2FibGUoZm4pXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgcmVzdWx0ID0gX2ZuKC4uLmFyZ3MpXG4gICAgcmV2b2tlKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZnVuY3Rpb24gUmV2b2thYmxlIChmbikge1xuICBsZXQgcmV2b2tlZCA9IGZhbHNlXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIHtcbiAgICBmbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICghcmV2b2tlZCkge1xuICAgICAgICByZXN1bHQgPSBmbiguLi5hcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgcmV2b2tlOiAoKSA9PiB7XG4gICAgICByZXZva2VkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBSZWZlcmVuY2VDb3VudGVyIChuYW1lLCBraW5kLCBkZXNjcmlwdGlvbiwgLi4uZXhwZWN0aW5nKSB7XG4gIGNvbnN0IF9yZWZzID0ge307XG4gIFsuLi5leHBlY3RpbmddLmZsYXQoKS5mb3JFYWNoKHJlZiA9PiB7XG4gICAgX3JlZnNbcmVmXSA9IDBcbiAgfSlcbiAgZnVuY3Rpb24gaW5jcmVhc2UgKHJlZikge1xuICAgIF9yZWZzW3JlZl0gPSBjb3VudE9mKHJlZikgKyAxXG4gICAgcmV0dXJuICgpID0+IGRlY3JlYXNlKHJlZilcbiAgfVxuICBmdW5jdGlvbiBkZWNyZWFzZSAocmVmKSB7XG4gICAgY29uc3QgY291bnQgPSBjb3VudE9mKHJlZikgLSAxXG4gICAgX3JlZnNbcmVmXSA9IE1hdGgubWF4KGNvdW50LCAwKVxuICB9XG4gIGZ1bmN0aW9uIGNvdW50T2YgKHJlZikge1xuICAgIHJldHVybiBfcmVmc1tyZWZdIHx8IDBcbiAgfVxuICBmdW5jdGlvbiByZWZzICgpIHtcbiAgICByZXR1cm4geyAuLi5fcmVmcyB9XG4gIH1cbiAgZnVuY3Rpb24gdGFibGUgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhfcmVmcykuc29ydCgpXG4gICAgICAubWFwKGtleSA9PiBba2V5LCBfcmVmc1trZXldXSlcbiAgICAgIC5tYXAoKFtyZWYsIGNvdW50XSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFtraW5kXTogcmVmLFxuICAgICAgICAgIHJlZnM6IGNvdW50IHx8ICdOb25lJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHRvVmFsdWUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNjcmlwdGlvbjogYFN0YXRlYm90WyR7bmFtZX1dOiAke2Rlc2NyaXB0aW9ufTpgLFxuICAgICAgdGFibGU6IHRhYmxlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpbmNyZWFzZTogaW5jcmVhc2UsXG4gICAgZGVjcmVhc2U6IGRlY3JlYXNlLFxuICAgIGNvdW50T2Y6IGNvdW50T2YsXG4gICAgdG9WYWx1ZTogdG9WYWx1ZSxcbiAgICByZWZzOiByZWZzXG4gIH1cbn1cblxuZnVuY3Rpb24gQXJnVHlwZUVycm9yIChlcnJQcmVmaXggPSAnJykge1xuICByZXR1cm4gZnVuY3Rpb24gKGZuTmFtZSwgdHlwZU1hcCwgLi4uYXJncykge1xuICAgIGNvbnN0IGFyZ01hcCA9IE9iamVjdC5lbnRyaWVzKHR5cGVNYXApXG4gICAgICAubWFwKChbYXJnTmFtZSwgYXJnVHlwZV0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgYXJnTmFtZSwgYXJnVHlwZSB9XG4gICAgICB9KVxuXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gT2JqZWN0LmtleXModHlwZU1hcCkuam9pbignLCAnKVxuXG4gICAgY29uc3QgZXJyID0gYXJnc1xuICAgICAgLm1hcCgoYXJnLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IGFyZ05hbWUsIGFyZ1R5cGUgfSA9IGFyZ01hcFtpbmRleF1cbiAgICAgICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGBBcmd1bWVudCB1bmRlZmluZWQ6IFwiJHthcmdOYW1lfVwiYFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yRGVzY1xuICAgICAgICBsZXQgdHlwZU5hbWVcbiAgICAgICAgbGV0IHR5cGVNYXRjaGVzXG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oYXJnVHlwZSkpIHtcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IGFyZ1R5cGUoYXJnKSA9PT0gdHJ1ZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZS5uYW1lXG4gICAgICAgICAgZXJyb3JEZXNjID0gYCR7dHlwZU5hbWV9KCR7YXJnTmFtZX0pIGRpZCBub3QgcmV0dXJuIHRydWVgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuICAgICAgICAgIHR5cGVNYXRjaGVzID0gdHlwZW9mIGFyZyA9PT0gYXJnVHlwZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGBBcmd1bWVudCBcIiR7YXJnTmFtZX1cIiBzaG91bGQgYmUgYSAke3R5cGVOYW1lfWBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHlwZU1hdGNoZXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYCR7ZXJyb3JEZXNjfTogJHthcmdOYW1lfSA9PT0gJHt0eXBlb2YgYXJnfSgke2FyZ30pYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcblxuICAgIGlmICghZXJyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgXFxuJHtlcnJQcmVmaXh9JHtmbk5hbWV9KCR7c2lnbmF0dXJlfSk6XFxuYCArXG4gICAgICAgIGAke2Vyci5tYXAoZXJyID0+IGA+ICR7ZXJyfWApLmpvaW4oJ1xcbicpfWBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gTG9nZ2VyIChsZXZlbCkge1xuICBsZXQgX2xldmVsID0gbGV2ZWxcbiAgaWYgKGlzU3RyaW5nKF9sZXZlbCkpIHtcbiAgICBfbGV2ZWwgPSAoe1xuICAgICAgaW5mbzogMyxcbiAgICAgIGxvZzogMixcbiAgICAgIHdhcm46IDEsXG4gICAgICBub25lOiAwXG4gICAgfSlbX2xldmVsXSB8fCAzXG4gIH1cbiAgZnVuY3Rpb24gY2FuV2FybiAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAxXG4gIH1cbiAgZnVuY3Rpb24gY2FuTG9nICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDJcbiAgfVxuICBmdW5jdGlvbiBjYW5JbmZvICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDNcbiAgfVxuICByZXR1cm4ge1xuICAgIGNhbldhcm4sXG4gICAgY2FuTG9nLFxuICAgIGNhbkluZm8sXG5cbiAgICBpbmZvOiAoLi4uYXJncykgPT4gY2FuSW5mbygpICYmIGNvbnNvbGUuaW5mbyguLi5hcmdzKSxcbiAgICB0YWJsZTogKC4uLmFyZ3MpID0+IGNhbkxvZygpICYmIGNvbnNvbGUudGFibGUoLi4uYXJncyksXG4gICAgbG9nOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS5sb2coLi4uYXJncyksXG4gICAgd2FybjogKC4uLmFyZ3MpID0+IGNhbldhcm4oKSAmJiBjb25zb2xlLndhcm4oLi4uYXJncyksXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiBjb25zb2xlLmVycm9yKC4uLmFyZ3MpXG4gIH1cbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIENIQVJUL1JPVVRFIFBBUlNJTkdcbi8vXG5cbmNvbnN0IHJ4Q1JMRiA9IC9bXFxyXFxuXS9cbmNvbnN0IGN4UGlwZSA9ICd8J1xuY29uc3QgY3hBcnJvdyA9ICctPidcbmNvbnN0IHJ4T3BlcmF0b3JzID0gW2N4UGlwZSwgY3hBcnJvd11cbiAgLm1hcChyeFVuc2FmZSA9PiByeFVuc2FmZS5yZXBsYWNlKCd8JywgJ1xcXFx8JykpXG4gIC5qb2luKCd8JylcblxuY29uc3QgcnhMaW5lQ29udGludWF0aW9ucyA9IG5ldyBSZWdFeHAoYCgke3J4T3BlcmF0b3JzfSkkYClcbmNvbnN0IHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMgPSAvW15hLXowLTkhQCMkJV4mKjpfKz08Pnx+LlxceDJEXS9naVxuY29uc3QgcnhDb21tZW50ID0gLyhcXC9cXC9bXlxcblxccl0qKS9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGN4UGlwZSxcbiAgY3hBcnJvdyxcbiAgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyxcbiAgZGVjb21wb3NlQ2hhcnQsXG4gIGRlY29tcG9zZVJvdXRlXG59XG5cbmNvbnN0IHsgdW5pcSwgQXJnVHlwZUVycm9yLCBpc1RlbXBsYXRlTGl0ZXJhbCB9ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcignc3RhdGVib3QuJylcblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGUgKHRlbXBsYXRlTGl0ZXJhbCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZVJvdXRlJyxcbiAgICB7IHRlbXBsYXRlTGl0ZXJhbDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICB0ZW1wbGF0ZUxpdGVyYWxcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IGxpbmVzID0gY29uZGVuc2VkTGluZXModGVtcGxhdGVMaXRlcmFsKVxuICBjb25zdCBmbGF0dGVuZWRSb3V0ZSA9IHRva2VuaXNlZExpbmVzKGxpbmVzKS5mbGF0KDIpXG4gIHJldHVybiBmbGF0dGVuZWRSb3V0ZVxufVxuXG4vKipcbiAqIERlY29tcG9zZSBhIHtAbGluayBzdGF0ZWJvdENoYXJ0fSBpbnRvIGFuIG9iamVjdCBvZiBgc3RhdGVzYCwgYHJvdXRlc2AsXG4gKiBhbmQgYHRyYW5zaXRpb25zYC5cbiAqXG4gKiBTdGF0ZWJvdCgpIHVzZXMgdGhpcyBpbnRlcm5hbGx5IHRvIHBhcnNlIGNoYXJ0cy4gRXhwb3NlZCBmb3IgZGVidWdnaW5nLlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0YXRlYm90Q2hhcnR9IGNoYXJ0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgeyBzdGF0ZXMsIHJvdXRlcywgdHJhbnNpdGlvbnMgfSA9IGRlY29tcG9zZUNoYXJ0YFxuICogICBwZW5kaW5nIC0+XG4gKiAgICAgc3VjY2VzcyB8IGZhaWx1cmVcbiAqIGBcbiAqIC8vIHN0YXRlcyA9IFsncGVuZGluZycsICdzdWNjZXNzJywgJ2ZhaWx1cmUnXVxuICogLy8gcm91dGVzID0gWyAncGVuZGluZy0+c3VjY2VzcycsICdwZW5kaW5nLT5mYWlsdXJlJ11cbiAqIC8vIHRyYW5zaXRpb25zID0gW1xuICogLy8gICBbJ3BlbmRpbmcnLCAnc3VjY2VzcyddLFxuICogLy8gICBbJ3BlbmRpbmcnLCAnZmFpbHVyZSddXG4gKiAvLyBdXG4gKi9cblxuZnVuY3Rpb24gZGVjb21wb3NlQ2hhcnQgKGNoYXJ0KSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZGVjb21wb3NlQ2hhcnQnLFxuICAgIHsgY2hhcnQ6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgY2hhcnRcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IGxpbmVzID0gY29uZGVuc2VkTGluZXMoY2hhcnQpXG4gIGNvbnN0IGxpbmVzT2ZUb2tlbnMgPSB0b2tlbmlzZWRMaW5lcyhsaW5lcylcbiAgY29uc3QgbGluZXNPZlJvdXRlcyA9IGxpbmVzT2ZUb2tlbnNcbiAgICAubWFwKGRlY29tcG9zZVJvdXRlRnJvbVRva2VucylcbiAgICAuZmxhdCgxKVxuXG4gIGNvbnN0IGxpbmVzT2ZUcmFuc2l0aW9ucyA9IGxpbmVzT2ZSb3V0ZXNcbiAgICAubWFwKGRlY29tcG9zZVRyYW5zaXRpb25zRnJvbVJvdXRlKVxuICAgIC5mbGF0KDEpXG5cbiAgY29uc3Qgc3RhdGVzID0gW11cbiAgY29uc3Qgcm91dGVLZXlzID0gbGluZXNPZlRyYW5zaXRpb25zLm1hcChyb3V0ZSA9PiB7XG4gICAgc3RhdGVzLnB1c2goLi4ucm91dGUpXG4gICAgcmV0dXJuIHJvdXRlLmpvaW4oY3hBcnJvdylcbiAgfSlcblxuICBjb25zdCBmaWx0ZXJlZFJvdXRlcyA9IHVuaXEocm91dGVLZXlzKVxuICBjb25zdCBmaWx0ZXJlZFN0YXRlcyA9IHVuaXEoc3RhdGVzKVxuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb25zOiBmaWx0ZXJlZFJvdXRlcy5tYXAocm91dGUgPT4gcm91dGUuc3BsaXQoY3hBcnJvdykpLFxuICAgIHJvdXRlczogZmlsdGVyZWRSb3V0ZXMsXG4gICAgc3RhdGVzOiBmaWx0ZXJlZFN0YXRlc1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpbmVzRnJvbSAoc3RyT3JBcnIpIHtcbiAgcmV0dXJuIFtzdHJPckFycl1cbiAgICAuZmxhdCgpXG4gICAgLnJlZHVjZSgoYWNjLCBsaW5lKSA9PiBbLi4uYWNjLCBsaW5lLnNwbGl0KHJ4Q1JMRildLCBbXSlcbiAgICAuZmxhdCgpXG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlZExpbmVzIChzdHJPckFycikge1xuICBjb25zdCBpbnB1dCA9IGxpbmVzRnJvbShzdHJPckFycilcbiAgY29uc3Qgb3V0cHV0ID0gW11cblxuICBpbnB1dC5yZWR1Y2UoKGNvbmRlbnNlZExpbmUsIGxpbmUpID0+IHtcbiAgICBjb25zdCBzYW5pdGlzZWRMaW5lID0gbGluZVxuICAgICAgLnJlcGxhY2UocnhDb21tZW50LCAnJylcbiAgICAgIC5yZXBsYWNlKHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsICcnKVxuXG4gICAgaWYgKCFzYW5pdGlzZWRMaW5lKSB7XG4gICAgICByZXR1cm4gY29uZGVuc2VkTGluZVxuICAgIH1cblxuICAgIGlmIChyeExpbmVDb250aW51YXRpb25zLnRlc3Qoc2FuaXRpc2VkTGluZSkpIHtcbiAgICAgIHJldHVybiBjb25kZW5zZWRMaW5lICsgc2FuaXRpc2VkTGluZVxuICAgIH1cblxuICAgIG91dHB1dC5wdXNoKGNvbmRlbnNlZExpbmUgKyBzYW5pdGlzZWRMaW5lKVxuICAgIHJldHVybiAnJ1xuICB9LCAnJylcblxuICByZXR1cm4gb3V0cHV0XG59XG5cbmZ1bmN0aW9uIHRva2VuaXNlZExpbmVzIChsaW5lcykge1xuICByZXR1cm4gbGluZXMubWFwKGxpbmUgPT4gbGluZS5zcGxpdChjeEFycm93KS5tYXAoc3RyID0+IHN0ci5zcGxpdChjeFBpcGUpKSlcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGVGcm9tVG9rZW5zIChsaW5lKSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdXG5cbiAgbGluZS5yZWR1Y2UoKHByZXZpb3VzU3RhdGVzLCBzdGF0ZXMpID0+IHtcbiAgICBpZiAocHJldmlvdXNTdGF0ZXMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gWy4uLnN0YXRlc11cbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChbcHJldmlvdXNTdGF0ZXMsIFsuLi5zdGF0ZXNdXSlcbiAgICByZXR1cm4gWy4uLnN0YXRlc11cbiAgfSwgZmFsc2UpXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSAoW2Zyb21TdGF0ZXMsIHRvU3RhdGVzXSkge1xuICByZXR1cm4gZnJvbVN0YXRlcy5yZWR1Y2UoKGFjYywgZnJvbVN0YXRlKSA9PiBbXG4gICAgLi4uYWNjLFxuICAgIC4uLnRvU3RhdGVzLm1hcCh0b1N0YXRlID0+IHtcbiAgICAgIHJldHVybiBbZnJvbVN0YXRlLCB0b1N0YXRlXVxuICAgIH0pXG4gIF0sIFtdKVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRlNNXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3RhdGVib3QsXG4gIGlzU3RhdGVib3Rcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIFN0YXRlYm90LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICogIFRoZSBzdGF0ZS1jaGFydC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc3RhcnRJbj1hdXRvXVxuICogIFRoZSBzdGF0ZSBpbiB3aGljaCB0byBzdGFydC4gSWYgdW5zcGVjaWZpZWQsIHRoZSBmaXJzdCBzdGF0ZSBpbiB0aGVcbiAqICBjaGFydCB3aWxsIGJlIHVzZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgSG93IG5vaXN5IHRoZSBsb2dnaW5nIGlzLCBmcm9tIDEgdG8gMzpcbiAqICBgYGBcbiAqICAxKSBjb25zb2xlLndhcm5cbiAqICAyKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlXG4gKiAgMykgY29uc29sZS53YXJuL2xvZy90YWJsZS9pbmZvXG4gKiAgYGBgXG4gKiAgYDNgIGlzIHRoZSBkZWZhdWx0LiBBcmd1bWVudCB0eXBlLWVycm9ycyB3aWxsIGFsd2F5cyBgdGhyb3dgLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtoaXN0b3J5TGltaXQ9Ml1cbiAqICBMaW1pdCBob3cgbXVjaCBoaXN0b3J5IHRoZSBzdGF0ZS1tYWNoaW5lIGtlZXBzLiBBY2Nlc3NlZCB2aWFcbiAqICB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeXxzdGF0ZWJvdEZzbSNoaXN0b3J5KCl9LlxuICogQHByb3BlcnR5IHtldmVudHN9IFtldmVudHNdXG4gKiAgSWYgeW91IHdpc2ggdG8gaGF2ZSB5b3VyIFN0YXRlYm90cyBsaXN0ZW4gdG8gZXZlbnRzIGNvbWluZyBmcm9tXG4gKiAgYSBzaGFyZWQgRXZlbnRFbWl0dGVyLCB5b3UgY2FuIHBhc3MgaXQgaW4gaGVyZS4gVGhlIGBlbWl0KClgL2BvbkV2ZW50KClgL1xuICogIGBwZXJmb3JtVHJhbnNpdGlvbnMoKWAgbWV0aG9kcyB3aWxsIHVzZSBpdC5cbiAqXG4gKiAgSXQgc2hvdWxkIGhhdmUgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19jbGFzc19ldmVudGVtaXR0ZXJ8RXZlbnRFbWl0dGVyfS5cbiAqL1xuXG4vKipcbiAqIEEgZGVzY3JpcHRpb24gb2YgYWxsIHRoZSBzdGF0ZXMgaW4gYSBtYWNoaW5lLCBwbHVzIGFsbCBvZiB0aGVcbiAqIHBlcm1pdHRlZCB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZW0uXG4gKlxuICogVGhpcyBpcyBkZWZpbmVkIHVzaW5nIGEgYHN0cmluZ2Agb3IgYW4gYGFycmF5YCBvZiBzdHJpbmdzLCBidXRcbiAqICB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHN8VGVtcGxhdGUgTGl0ZXJhbHN9XG4gKiBhcmUgbXVjaCBtb3JlIGNvbnZlbmllbnQuXG4gKlxuICogQW4gYXJyb3cgYC0+YCBjb25maWd1cmVzIGEgKipwZXJtaXR0ZWQgdHJhbnNpdGlvbioqIGJldHdlZW4gdHdvIHN0YXRlczpcbiAqXG4gKiBgYGBcbiAqIGZyb20tc3RhdGUgLT4gdG8tc3RhdGVcbiAqIGBgYFxuICpcbiAqIEl0J3MgdGhlIG9ubHkgb3BlcmF0b3IgbmVlZGVkIHRvIGJ1aWxkIGFueSBjaGFydDpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWRcbiAqICAgcGVuZGluZyAtPiByZWplY3RlZFxuICogICByZXNvbHZlZCAtPiBkb25lXG4gKiAgIHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIFRoZSBcIk9SXCIgb3BlcmF0b3IgYHxgIGNhbiBoZWxwIHVzIHJlbW92ZSBzb21lIHJlZHVuZGFuY3kgZnJvbSB0aGUgYWJvdmUgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZFxuICogICByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEluIGJvdGggY2hhcnRzLCBgcGVuZGluZ2AgY2FuIHRyYW5zaXRpb24gdG8gYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgLCBhbmRcbiAqIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCBjYW4gYm90aCB0cmFuc2l0aW9uIHRvIGBkb25lYC5cbiAqXG4gKiBXZSBjYW4gc3RyZWFtbGluZSB0aGlzIGV2ZW4gZnVydGhlcjpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEFnYWluLCB0aGlzIGlzIGV4YWN0bHkgZXF1aXZhbGVudCB0byB0aGUgcHJldmlvdXMgdHdvIGV4YW1wbGVzLlxuICpcbiAqIE5vdGljZSBpbiB0aGlzIG9uZSB0aGF0IHdlIGhhdmUgcGFyZW50aGVzZXMgYChgIGApYCBzdXJyb3VuZGluZyBgcmVzb2x2ZWRgXG4gKiBhbmQgYHJlamVjdGVkYC4gVGhleSBhcmUgYWN0dWFsbHkgY29tcGxldGVseSBpZ25vcmVkIGJ5IHRoZSBwYXJzZXIsIGFuZFxuICogeW91IGNhbiB1c2UgdGhlbSBhcyB5b3UgcGxlYXNlIHRvIGhlbHAgbWFrZSB5b3VyIGNoYXJ0cyBtb3JlIHJlYWRhYmxlLlxuICpcbiAqIEEgY2hhcnQgd29ya3MgZXhhY3RseSB0aGUgc2FtZSB3aXRob3V0IHRoZW06XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQ2hhcnRzIGNhbiBhbHNvIGJlIHNwbGl0IGFjcm9zcyBtdWx0aXBsZS1saW5lczpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT5cbiAqICAgcmVzb2x2ZWQgfFxuICogICByZWplY3RlZCAtPlxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqIE5vdGljZSB0aGF0IGFsbCB3aGl0ZS1zcGFjZSBpcyBpZ25vcmVkIG9uIGVpdGhlciBzaWRlIG9mIHRoZSBgLT5gXG4gKiBhbmQgYHxgLlxuICpcbiAqIGAvLyBDb21tZW50cyBvZiB0aGlzIGtpbmQgYXJlIGFsbG93ZWQsIHRvbzpgXG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IC8vIFdoZXJlIGRvIHdlIGdvIGZyb20gaGVyZT9cbiAqICAgICAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gLy8gQWgsIHllc1xuICpcbiAqICAgLy8gQW5kIG5vdyB3ZSdyZSBhbGwgZmluaXNoZWRcbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogRmluYWxseSwgaGVyZSdzIGEgbW9yZSBmdWxsIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBkcmFnRHJvcENoYXJ0ID0gYFxuICogICBpZGxlIC0+XG4gKiAgICAgZHJhZy1kZXRlY3QgLT5cbiAqICAgICAgIChkcmFnZ2luZyB8IGNsaWNrZWQpXG4gKlxuICogICAvLyBKdXN0IGEgY2xpY2ssIGJhaWwtb3V0IVxuICogICBjbGlja2VkIC0+IGlkbGVcbiAqXG4gKiAgIC8vIERyYWcgZGV0ZWN0ZWQhXG4gKiAgIGRyYWdnaW5nIC0+XG4gKiAgICAgZHJhZy13YWl0IC0+IGRyYWdnZWQgLT4gZHJhZy13YWl0XG4gKlxuICogICAvLyBEcmFnIGZpbmlzaGVkLi4uXG4gKiAgIChkcmFnLXdhaXQgfCBkcmFnZ2VkKSAtPlxuICogICAgIChkcmFnLWRvbmUgfCBkcmFnLWNhbmNlbCkgLT5cbiAqICAgICAgIGlkbGVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmd8c3RyaW5nW119IHN0YXRlYm90Q2hhcnRcbiAqL1xuXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHNcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNvbnN0IHtcbiAgaXNBcnJheSxcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzRnVuY3Rpb24sXG4gIGlzUG9qbyxcbiAgaXNTdHJpbmcsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyLFxuICBSZWZlcmVuY2VDb3VudGVyXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQsIGN4QXJyb3cgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbi8qKlxuICogQ3JlYXRlIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gYG9iamVjdGAuXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsZW1taW5nJywge1xuICogICBjaGFydDogYFxuICogICAgIHdhbGtpbmcgLT4gKGRpZ2dpbmcgfCBidWlsZGluZyB8IGZhbGxpbmcpIC0+XG4gKiAgICAgICB3YWxraW5nXG4gKlxuICogICAgIGZhbGxpbmcgLT4gc3BsYXR0aW5nXG4gKiAgICAgd2Fsa2luZyAtPiBleGl0aW5nXG4gKiAgIGBcbiAqIH0pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqICBHaXZlIHlvdXIgU3RhdGVib3QgYSBuYW1lLiBVc2VkIGZvciBsb2dnaW5nIGFuZCBieSB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gKiBAcGFyYW0ge3N0YXRlYm90T3B0aW9uc30gb3B0aW9uc1xuICovXG5cbmZ1bmN0aW9uIFN0YXRlYm90IChuYW1lLCBvcHRpb25zKSB7XG4gIGlmICghaXNTdHJpbmcobmFtZSkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1xcblN0YXRlYm90OiBQbGVhc2Ugc3BlY2lmeSBhIG5hbWUgZm9yIHRoaXMgbWFjaGluZScpXG4gIH1cblxuICBjb25zdCBsb2dQcmVmaXggPSBgU3RhdGVib3RbJHtuYW1lfV1gXG4gIGlmICghaXNQb2pvKG9wdGlvbnMpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGBcXG4ke2xvZ1ByZWZpeH06IFBsZWFzZSBzcGVjaWZ5IG9wdGlvbnMgZm9yIHRoaXMgbWFjaGluZWApXG4gIH1cblxuICBjb25zdCB7XG4gICAgY2hhcnQgPSB1bmRlZmluZWQsXG4gICAgbG9nTGV2ZWwgPSAzLFxuICAgIGhpc3RvcnlMaW1pdCA9IDJcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoYCR7bG9nUHJlZml4fSNgKVxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuICBjb25zdCB7IGNhbldhcm4gfSA9IGNvbnNvbGVcblxuICBjb25zdCB7XG4gICAgc3RhdGVzID0gW10sXG4gICAgcm91dGVzID0gW11cbiAgfSA9IGNoYXJ0ID8gZGVjb21wb3NlQ2hhcnQoY2hhcnQpIDogb3B0aW9uc1xuXG4gIGNvbnN0IHsgc3RhcnRJbiA9IHN0YXRlc1swXSB9ID0gb3B0aW9uc1xuICBpZiAoIXN0YXRlcy5pbmNsdWRlcyhzdGFydEluKSkge1xuICAgIHRocm93IEVycm9yKGAke2xvZ1ByZWZpeH06IFN0YXJ0aW5nLXN0YXRlIG5vdCBpbiBjaGFydDogXCIke3N0YXJ0SW59XCJgKVxuICB9XG5cbiAgbGV0IHRyYW5zaXRpb25JZCA9IDBcbiAgY29uc3Qgc3RhdGVIaXN0b3J5ID0gW3N0YXJ0SW5dXG4gIGNvbnN0IHN0YXRlSGlzdG9yeUxpbWl0ID0gTWF0aC5tYXgoaGlzdG9yeUxpbWl0LCAyKVxuICBjb25zdCBldmVudHMgPSBpc0V2ZW50RW1pdHRlcihvcHRpb25zLmV2ZW50cykgPyBvcHRpb25zLmV2ZW50cyA6IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGNvbnN0IGludGVybmFsRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIGNvbnN0IElOVEVSTkFMX0VWRU5UUyA9IHtcbiAgICBvblN3aXRjaGluZzogJyhBTlkpc3RhdGU6Y2hhbmdpbmcnLFxuICAgIG9uU3dpdGNoZWQ6ICcoQU5ZKXN0YXRlOmNoYW5nZWQnXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0SW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGludGVybmFsRXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gb25JbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIGZuKSB7XG4gICAgaW50ZXJuYWxFdmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaW50ZXJuYWxFdmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGF0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdzdGF0ZXMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlcycsXG4gICAgWy4uLnN0YXRlc11cbiAgKVxuICBjb25zdCByb3V0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICd0cmFuc2l0aW9ucycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9ucycsXG4gICAgWy4uLnJvdXRlc11cbiAgKVxuICBjb25zdCBldmVudHNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdldmVudHMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzJ1xuICApXG5cbiAgLy8gSW50ZXJwcmV0cyBvblRyYW5zaXRpb25zKCkgYW5kIHBlcmZvcm1UcmFuc2l0aW9ucygpXG4gIGZ1bmN0aW9uIGFwcGx5SGl0Y2hlciAoaGl0Y2hlciwgZm5OYW1lKSB7XG4gICAgY29uc3QgaGl0Y2hlckFjdGlvbnMgPVxuICAgICAgaXNGdW5jdGlvbihoaXRjaGVyKVxuICAgICAgICA/IGhpdGNoZXIoeyBlbnRlciwgZW1pdCwgRW50ZXIsIEVtaXQgfSlcbiAgICAgICAgOiBpc1Bvam8oaGl0Y2hlcilcbiAgICAgICAgICA/IGhpdGNoZXJcbiAgICAgICAgICA6IG51bGxcblxuICAgIGlmICghaXNQb2pvKGhpdGNoZXJBY3Rpb25zKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEV4cGVjdGVkIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0YFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50cyA9IHt9XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSBbXVxuXG4gICAgT2JqZWN0LmVudHJpZXMoaGl0Y2hlckFjdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoW3JvdXRlQ2hhcnQsIGFjdGlvbk9yQ29uZmlnXSkgPT4ge1xuICAgICAgICAvLyBvblRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBpZiAoaXNGdW5jdGlvbihhY3Rpb25PckNvbmZpZykpIHtcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9IGVsc2UgaWYgKCFpc1Bvam8oYWN0aW9uT3JDb25maWcpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMS8zLi4uXG4gICAgICAgIGNvbnN0IHsgb246IF9vbiwgdGhlbjogX3RoZW4gfSA9IGFjdGlvbk9yQ29uZmlnXG4gICAgICAgIGlmIChpc1N0cmluZyhfb24pIHx8IGlzQXJyYXkoX29uKSkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZXMgPSBbX29uXS5mbGF0KClcbiAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IF90aGVuIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKF90aGVuKSkge1xuICAgICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgICAgICAgLy8gKEJlaGF2ZSBsaWtlIG9uVHJhbnNpdGlvbnMgaWYgYSBjb25maWcgaXMgc3BlY2lmaWVkLCBidXRcbiAgICAgICAgICAvLyAgdGhlcmUgaXMgbm8gXCJvblwiIGV2ZW50Li4uKVxuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICAgIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgY29uc3QgZGVjb21wb3NlZEV2ZW50cyA9IE9iamVjdC5lbnRyaWVzKGV2ZW50cylcbiAgICAgIC5yZWR1Y2UoKGFjYywgW2V2ZW50TmFtZSwgX2NvbmZpZ3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIGNvbmZpZ3MgfSA9IGRlY29tcG9zZUNvbmZpZ3MoX2NvbmZpZ3MsIGNhbldhcm4pXG4gICAgICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgIFtldmVudE5hbWVdOiBjb25maWdzXG4gICAgICAgIH1cbiAgICAgIH0sIHt9KVxuXG4gICAgY29uc3QgYWxsQ2xlYW51cEZucyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMoZGVjb21wb3NlZEV2ZW50cylcbiAgICAgICAgLm1hcCgoW2V2ZW50TmFtZSwgY29uZmlnc10pID0+XG4gICAgICAgICAgW1xuICAgICAgICAgICAgZXZlbnRzSGFuZGxlZC5pbmNyZWFzZShldmVudE5hbWUpLFxuICAgICAgICAgICAgb25FdmVudChldmVudE5hbWUsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50V2FzSGFuZGxlZCA9IGNvbmZpZ3Muc29tZShcbiAgICAgICAgICAgICAgICAoeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXNzZWQgPSBpblN0YXRlKGZyb21TdGF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKC4uLmFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICByZXR1cm4gISFwYXNzZWRcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIGlmICghZXZlbnRXYXNIYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk5vT3AoYEV2ZW50IG5vdCBoYW5kbGVkOiBcIiR7ZXZlbnROYW1lfVwiYClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgICkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gb25UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29uZmlncyA9IGRlY29tcG9zZUNvbmZpZ3ModHJhbnNpdGlvbnMsIGNhbldhcm4pXG5cbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBhbGxTdGF0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5zdGF0ZXMpXG4gICAgICBhbGxSb3V0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5yb3V0ZXMpXG4gICAgfVxuXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4udHJhbnNpdGlvbkNvbmZpZ3MuY29uZmlncy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSA9IHRyYW5zaXRpb25cbiAgICAgICAgY29uc3Qgcm91dGUgPSBgJHtmcm9tU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHJvdXRlc0hhbmRsZWQuaW5jcmVhc2Uocm91dGUpLFxuICAgICAgICAgIG9uSW50ZXJuYWxFdmVudChyb3V0ZSwgYWN0aW9uKVxuICAgICAgICBdXG4gICAgICB9KS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBEZWJ1Z2dpbmcsIGlmIHdlJ3JlIGF0IHRoZSByaWdodCBsZXZlbFxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGNvbnN0IGludmFsaWRTdGF0ZXMgPSBhbGxTdGF0ZXMuZmlsdGVyKHN0YXRlID0+ICFzdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICAgICAgY29uc3QgaW52YWxpZFJvdXRlcyA9IGFsbFJvdXRlcy5maWx0ZXIocm91dGUgPT4gIXJvdXRlcy5pbmNsdWRlcyhyb3V0ZSkpXG4gICAgICBpZiAoaW52YWxpZFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCBzdGF0ZXMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRTdGF0ZXMubWFwKHN0YXRlID0+IGAgID4gXCIke3N0YXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgaWYgKGludmFsaWRSb3V0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgdHJhbnNpdGlvbnMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRSb3V0ZXMubWFwKHJvdXRlID0+IGAgID4gXCIke3JvdXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBhbGxDbGVhbnVwRm5zLmZvckVhY2goZm4gPT4gZm4oKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDJdXG4gIH1cblxuICBmdW5jdGlvbiBjdXJyZW50U3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDFdXG4gIH1cblxuICBmdW5jdGlvbiBjYW5UcmFuc2l0aW9uVG8gKC4uLnN0YXRlcykge1xuICAgIGNvbnN0IHRlc3RTdGF0ZXMgPSBzdGF0ZXMuZmxhdCgpXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdjYW5UcmFuc2l0aW9uVG8nLCB7IHN0YXRlOiBpc1N0cmluZyB9LCB0ZXN0U3RhdGVzWzBdKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgaWYgKCF0ZXN0U3RhdGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICByZXR1cm4gdGVzdFN0YXRlcy5ldmVyeShzdGF0ZSA9PiBuZXh0U3RhdGVzLmluY2x1ZGVzKHN0YXRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlIChzdGF0ZSkge1xuICAgIGNvbnN0IF9zdGF0ZSA9IHN0YXRlICE9PSB1bmRlZmluZWRcbiAgICAgID8gc3RhdGVcbiAgICAgIDogY3VycmVudFN0YXRlKClcblxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBfc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGVzLnJlZHVjZSgoYWNjLCByb3V0ZSkgPT4ge1xuICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSByb3V0ZS5zcGxpdChjeEFycm93KVxuICAgICAgICAubWFwKHN0YXRlID0+IHN0YXRlLnRyaW0oKSlcblxuICAgICAgaWYgKGZyb21TdGF0ZSA9PT0gX3N0YXRlKSB7XG4gICAgICAgIHJldHVybiBbLi4uYWNjLCB0b1N0YXRlXVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4sIC4uLmZuQXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignaW5TdGF0ZScsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgY29uZGl0aW9uTWF0Y2hlcyA9IGN1cnJlbnRTdGF0ZSgpID09PSBzdGF0ZVxuXG4gICAgaWYgKGFueU9yRm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFjb25kaXRpb25NYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbihhbnlPckZuKSkge1xuICAgICAgICByZXR1cm4gYW55T3JGbiguLi5mbkFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gYW55T3JGblxuICAgIH1cblxuICAgIHJldHVybiBjb25kaXRpb25NYXRjaGVzXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VtaXQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIGVudGVyIChzdGF0ZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW50ZXInLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGluU3RhdGUgPSBjdXJyZW50U3RhdGUoKVxuICAgIGNvbnN0IHRvU3RhdGUgPSBzdGF0ZVxuXG4gICAgaWYgKHRvU3RhdGUgPT09IGluU3RhdGUpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBBbHJlYWR5IGluIHN0YXRlOiBcIiR7dG9TdGF0ZX1cImApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlcy5pbmNsdWRlcyh0b1N0YXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgc3RhdGUgXCIke3RvU3RhdGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFJvdXRlID0gYCR7aW5TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgaWYgKCFyb3V0ZXMuaW5jbHVkZXMobmV4dFJvdXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgdHJhbnNpdGlvbiBcIiR7bmV4dFJvdXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIEZlbGwtdGhyb3VnaCwgY2FuIGVudGVyIG5leHQgc3RhdGVcbiAgICBjb25zb2xlLmluZm8oYCR7bG9nUHJlZml4fTogdElkPCR7Kyt0cmFuc2l0aW9uSWR9PjogJHtuZXh0Um91dGV9YClcblxuICAgIHN0YXRlSGlzdG9yeS5wdXNoKHRvU3RhdGUpXG4gICAgaWYgKHN0YXRlSGlzdG9yeS5sZW5ndGggPiBzdGF0ZUhpc3RvcnlMaW1pdCkge1xuICAgICAgc3RhdGVIaXN0b3J5LnNoaWZ0KClcbiAgICB9XG5cbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMub25Td2l0Y2hpbmcsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQobmV4dFJvdXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5vblN3aXRjaGVkLCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXZlbnQgKGV2ZW50TmFtZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXZlbnQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcsIGNiOiBpc0Z1bmN0aW9uIH0sIGV2ZW50TmFtZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBldmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgICByZXR1cm4gKCkgPT4gZXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gIH1cblxuICBjb25zdCBzd2l0Y2hNZXRob2RzID0gT2JqZWN0LmtleXMoSU5URVJOQUxfRVZFTlRTKVxuICAgIC5yZWR1Y2UoKG9iaiwgbWV0aG9kTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbbWV0aG9kTmFtZV06IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcihtZXRob2ROYW1lLCB7IGNiOiBpc0Z1bmN0aW9uIH0sIGNiKVxuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudCA9IHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoSU5URVJOQUxfRVZFTlRTW21ldGhvZE5hbWVdKVxuICAgICAgICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25JbnRlcm5hbEV2ZW50KFxuICAgICAgICAgICAgSU5URVJOQUxfRVZFTlRTW21ldGhvZE5hbWVdLFxuICAgICAgICAgICAgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBjYih0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVFdmVudCgpXG4gICAgICAgICAgICBkZWNyZWFzZVJlZkNvdW50KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7fSlcblxuICBjb25zdCBlbnRlckV4aXRNZXRob2RzID0gW1xuICAgIFsnRXhpdGluZycsICdvblN3aXRjaGluZyddLFxuICAgIFsnRW50ZXJpbmcnLCAnb25Td2l0Y2hpbmcnXSxcbiAgICBbJ0V4aXRlZCcsICdvblN3aXRjaGVkJ10sXG4gICAgWydFbnRlcmVkJywgJ29uU3dpdGNoZWQnXVxuICBdXG4gICAgLnJlZHVjZSgob2JqLCBuYW1lcykgPT4ge1xuICAgICAgY29uc3QgW25hbWUsIHN3aXRjaE1ldGhvZF0gPSBuYW1lc1xuICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGBvbiR7bmFtZX1gXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW21ldGhvZE5hbWVdOiBmdW5jdGlvbiAoc3RhdGUsIGNiKSB7XG4gICAgICAgICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKG1ldGhvZE5hbWUsIHsgc3RhdGU6IGlzU3RyaW5nLCBjYjogaXNGdW5jdGlvbiB9LCBzdGF0ZSwgY2IpXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgICAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06JHtldmVudE5hbWV9YClcbiAgICAgICAgICBdXG4gICAgICAgICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBzd2l0Y2hNZXRob2RzW3N3aXRjaE1ldGhvZF0oKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignRXhpdCcpID09PSAwKSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2IodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSB0b1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2IoZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge30pXG5cbiAgZnVuY3Rpb24gRW1pdCAoZXZlbnROYW1lLCAuLi5jdXJyaWVkQXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignRW1pdCcsIHsgZXZlbnROYW1lOiBpc1N0cmluZyB9LCBldmVudE5hbWUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IGVtaXQoZXZlbnROYW1lLCAuLi5bLi4uY3VycmllZEFyZ3MsIC4uLmFyZ3NdKVxuICB9XG5cbiAgZnVuY3Rpb24gRW50ZXIgKHN0YXRlLCAuLi5jdXJyaWVkQXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignRW50ZXInLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uYXJncykgPT4gZW50ZXIoc3RhdGUsIC4uLlsuLi5jdXJyaWVkQXJncywgLi4uYXJnc10pXG4gIH1cblxuICBmdW5jdGlvbiBJblN0YXRlIChzdGF0ZSwgYW55T3JGbiwgLi4uY3VycmllZEZuQXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignSW5TdGF0ZScsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5mbkFyZ3MpID0+XG4gICAgICBpblN0YXRlKHN0YXRlLCBhbnlPckZuLCAuLi5bLi4uY3VycmllZEZuQXJncywgLi4uZm5BcmdzXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fTogU3RhdGUtbWFjaGluZSByZXNldCFgKVxuXG4gICAgc3RhdGVIaXN0b3J5Lmxlbmd0aCA9IDBcbiAgICBzdGF0ZUhpc3RvcnkucHVzaChzdGFydEluKVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbk5vT3AgKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBsYXN0U3RhdGUgPSBwcmV2aW91c1N0YXRlKClcbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCBwcmV2Um91dGUgPSBgJHtsYXN0U3RhdGUgPT09IHVuZGVmaW5lZCA/ICdbdW5kZWZpbmVkXScgOiBsYXN0U3RhdGV9LT4ke2luU3RhdGV9YFxuXG4gICAgY29uc3QgYXZhaWxhYmxlU3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIGlmICghYXZhaWxhYmxlU3RhdGVzLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBUaGVyZSBhcmUgbm8gc3RhdGVzIGF2YWlsYWJsZSBmcm9tIFwiJHtpblN0YXRlfVwiYFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGAke2xvZ1ByZWZpeH06ICR7bWVzc2FnZX1cXG5gICtcbiAgICAgICAgICBgICA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiJHtwcmV2Um91dGV9XCJcXG5gICtcbiAgICAgICAgICBgICA+IEZyb20gXCIke2luU3RhdGV9XCIsIHZhbGlkIHN0YXRlcyBhcmU6IFske2F2YWlsYWJsZVN0YXRlc1xuICAgICAgICAgICAgLm1hcChzdGF0ZSA9PiBgXCIke3N0YXRlfVwiYClcbiAgICAgICAgICAgIC5qb2luKCcsICcpfV1gXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlczogc3RhdGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICB0cmFuc2l0aW9uczogcm91dGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICBldmVudHM6IGV2ZW50c0hhbmRsZWQucmVmcygpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5mbyAoKSB7XG4gICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fTogSW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzdGF0ZS1tYWNoaW5lYClcblxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHN0YXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8ocm91dGVzSGFuZGxlZClcbiAgICBsb2dSZWZDb3VudGVySW5mbyhldmVudHNIYW5kbGVkKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9nUmVmQ291bnRlckluZm8gKHJlZkNvdW50ZXIpIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCB0YWJsZSB9ID0gcmVmQ291bnRlci50b1ZhbHVlKClcbiAgICBjb25zb2xlLmxvZyhkZXNjcmlwdGlvbilcbiAgICBpZiAodGFibGUubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLnRhYmxlKHRhYmxlKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnICA+IE5vIGluZm9ybWF0aW9uJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBzdGF0ZS1tYWNoaW5lIG9iamVjdCBjcmVhdGVkIGJ5XG4gICAqIHtAbGluayAjc3RhdGVib3RzdGF0ZWJvdHxTdGF0ZWJvdCgpfS5cbiAgICogQHR5cGVkZWYge09iamVjdH0gc3RhdGVib3RGc21cbiAgICovXG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBGb3IgaWRlbnRpZnlpbmcgU3RhdGVib3Qgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX19TVEFURUJPVF9fOiAxLFxuXG4gICAgLyoqXG4gICAgICogVGVzdHMgdG8gc2VlIGlmIHdlIGNhbiB0cmFuc2l0aW9uIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUgZnJvbVxuICAgICAqIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBJZiBtb3JlIHRoYW4gb25lIHN0YXRlIGlzIHNwZWNpZmllZCwgYHRydWVgIGlzIHJldHVybmVkIG9ubHkgaWZcbiAgICAgKiAqKkFMTCoqIHN0YXRlcyBhcmUgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHN0YXRlc1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZ2FtZS1tZW51cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGxvYWRpbmcgLT5cbiAgICAgKiAgICAgICBtZW51IC0+XG4gICAgICogICAgICAgICBwbGF5IHxcbiAgICAgKiAgICAgICAgIG9wdGlvbnMgfFxuICAgICAqICAgICAgICAgc291bmQgfFxuICAgICAqICAgICAgICAgcXVpdFxuICAgICAqXG4gICAgICogICAgIC8vIEdvIGJhY2sgdG8gbWVudVxuICAgICAqICAgICBwbGF5IHwgb3B0aW9ucyB8IHNvdW5kIC0+IG1lbnVcbiAgICAgKlxuICAgICAqICAgICAvLyBDYW4gcXVpdCBmcm9tIG1haW4gZ2FtZSwgdG9vXG4gICAgICogICAgIHBsYXkgLT4gcXVpdFxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbygncGxheScpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ21lbnUnKVxuICAgICAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKFsncGxheScsICdvcHRpb25zJ10pXG4gICAgICogLy8gdHJ1ZVxuICAgICAqL1xuICAgIGNhblRyYW5zaXRpb25UbzogY2FuVHJhbnNpdGlvblRvLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Nvcm91dGluZScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHN1c3BlbmRlZCAtPiBydW5uaW5nIC0+IChzdXNwZW5kZWQgfCBkZWFkKVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzdXNwZW5kZWRcIlxuICAgICAqL1xuICAgIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgZW1pdHMgYW4gZXZlbnQsIGZpcmluZyBhbnkgbGlzdGVuZXJzIGFkZGVkIHVzaW5nXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9uc3wucGVyZm9ybVRyYW5zaXRpb25zKCl9IG9yIHtAbGluayAjc3RhdGVib3Rmc21vbmV2ZW50fC5vbkV2ZW50KCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdXG4gICAgICogIE9wdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIGxpc3RlbmVycy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiAgV2hldGhlciBvciBub3QgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgU2VlOiB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfZW1pdHRlcl9lbWl0X2V2ZW50bmFtZV9hcmdzfE5vZGUgRXZlbnRzfVxuICAgICAqICBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIFN0YXRlYm90IGltcG9ydHMgYEV2ZW50RW1pdHRlcmAgZnJvbSB0aGVcbiAgICAgKiAge0BsaW5rIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2V2ZW50c3xldmVudHN9XG4gICAgICogcGFja2FnZSBmb3IgZGVhbGluZyB3aXRoIGV2ZW50cyBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnYmFzaWMtZm9ybScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiByZWRpcmVjdFxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzoge1xuICAgICAqICAgICBvbjogJ3Bvc3QtZGF0YScsXG4gICAgICogICAgIHRoZW46ICguLi5hcmdzKSA9PiB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0V2ZW50IGFyZ3M6ICcsIGFyZ3MpXG4gICAgICogICAgICAgLy8gc2V0VGltZW91dChtYWNoaW5lLkVudGVyKCdyZWRpcmVjdCcpLCA1MDAwKVxuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW1pdCgncG9zdC1kYXRhJywgJ0hlbGxvLCB3b3JsZCEnKVxuICAgICAqIC8vIEV2ZW50IGFyZ3M6IFtcIkhlbGxvLCB3b3JsZCFcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInNlbmRpbmdcIlxuICAgICAqL1xuICAgIGVtaXQ6IGVtaXQsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBlbWl0cyB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogIFRoZSBkZXNpcmVkIGV2ZW50IHRvIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LlxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2N1cnJpZWRBcmdzXVxuICAgICAqICBBcmd1bWVudHMgdGhhdCB3aWxsIGN1cnJ5IGludG8gdGhlIHJldHVybmVkIGBlbWl0KClgIGZ1bmN0aW9uXG4gICAgICogIHdoZW5ldmVyIGl0IGlzIGNhbGxlZC5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBlbWl0cyB0aGF0IGV2ZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdzdG9wJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAncHJlcGFyZS10by1nbyAtPiBnbyc6ICAgICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAncHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIG5leHRUcmFmZmljTGlnaHQgPSBtYWNoaW5lLkVtaXQoJ3RpbWVyJylcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzdG9wXCJcbiAgICAgKlxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicHJlcGFyZS10by1zdG9wXCJcbiAgICAgKi9cbiAgICBFbWl0OiBFbWl0LFxuXG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nIGFzIGl0IGlzXG4gICAgICogYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIGRlc2lyZWQgc3RhdGUgdG8gc3dpdGNoLXRvLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdXG4gICAgICogIE9wdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRyYW5zaXRpb24gY2FsbGJhY2tzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgc3RhdGUgY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZGlhbG9nJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzaG93aW5nLW1vZGFsIC0+IChzYXZpbmcgfCBpZGxlKVxuICAgICAqICAgICAgIHNhdmluZyAtPiBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcImlkbGVcIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2F2aW5nJylcbiAgICAgKiAvLyBmYWxzZVxuICAgICAqXG4gICAgICogLy8gW2RpYWxvZ106IEludmFsaWQgdHJhbnNpdGlvbiBcImlkbGUtPnNhdmluZ1wiLCBub3Qgc3dpdGNoaW5nXG4gICAgICogLy8gPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIlt1bmRlZmluZWRdLT5pZGxlXCJcbiAgICAgKiAvLyA+IEZyb20gXCJpZGxlXCIsIHZhbGlkIHN0YXRlcyBhcmU6IFtcInNob3dpbmctbW9kYWxcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3Nob3dpbmctbW9kYWwnKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBlbnRlcjogZW50ZXIsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUsIHNvIGxvbmdcbiAgICAgKiBhcyBpdCBpcyBhY2Nlc3NpYmxlIGZyb20gdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIGRlc2lyZWQgc3RhdGUgdG8gc3dpdGNoLXRvLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2N1cnJpZWRBcmdzXVxuICAgICAqICBBcmd1bWVudHMgdGhhdCB3aWxsIGN1cnJ5IGludG8gdGhlIHJldHVybmVkIGBlbnRlcigpYCBmdW5jdGlvblxuICAgICAqICB3aGVuZXZlciBpdCBpcyBjYWxsZWQuXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FuIGNoYW5nZSB0aGUgc3RhdGUgd2hlbiBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3BvcHVwLW1lbnUnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IG1lbnUtb3BlbmVkIC0+XG4gICAgICogICAgICAgKGl0ZW0tY2xpY2tlZCB8IGlkbGUpXG4gICAgICpcbiAgICAgKiAgICAgaXRlbS1jbGlja2VkIC0+IGlkbGVcbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnbWVudS1vcGVuZWQnXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrID0gbWFjaGluZS5FbnRlcignaXRlbS1jbGlja2VkJylcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJtZW51LW9wZW5lZFwiXG4gICAgICpcbiAgICAgKiBidXR0b24ub25jbGljaygpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaXRlbS1jbGlja2VkXCJcbiAgICAgKi9cbiAgICBFbnRlcjogRW50ZXIsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBzdGF0ZXMgdGhlIG1hY2hpbmUgaGFzIGJlZW4gaW4gc28gZmFyLCB1cCB0byBhIGxpbWl0IHNldFxuICAgICAqIGJ5IGBoaXN0b3J5TGltaXRgIGluIHtAbGluayBzdGF0ZWJvdE9wdGlvbnN9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBIGNvcHkgb2YgdGhlIHN0YXRlLWhpc3RvcnkuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Rvd25sb2FkZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+IChmYWlsdXJlIHwgc3VjY2VzcylcbiAgICAgKiAgICAgICBmYWlsdXJlIC0+IGxvYWRpbmdcbiAgICAgKiAgICAgICBzdWNjZXNzIC0+IGRvbmVcbiAgICAgKiAgIGAsXG4gICAgICogICBoaXN0b3J5TGltaXQ6IDRcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZmFpbHVyZScpXG4gICAgICogbWFjaGluZS5lbnRlcignbG9hZGluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignc3VjY2VzcycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogbWFjaGluZS5oaXN0b3J5KClcbiAgICAgKiAvLyBbXCJmYWlsdXJlXCIsIFwibG9hZGluZ1wiLCBcInN1Y2Nlc3NcIiwgXCJkb25lXCJdXG4gICAgICovXG4gICAgaGlzdG9yeTogKCkgPT4gWy4uLnN0YXRlSGlzdG9yeV0sXG5cbiAgICAvKipcbiAgICAgKiBQcmludCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudCBtYWNoaW5lIHRvIHRoZSBjb25zb2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5mbygpXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogSW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzdGF0ZS1tYWNoaW5lLlxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBzdGF0ZS1jaGFuZ2VzOlxuICAgICAqIC8vIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgICAqIC8vIOKUgiAoaW5kZXgpIOKUgiAgIHN0YXRlcyAgICDilIIgICAjICAgIOKUglxuICAgICAqIC8vIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgICAqIC8vIOKUgiAgICAwICAgIOKUgiAgICdkb25lJyAgICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAxICAgIOKUgiAgICdpZGxlJyAgICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAyICAgIOKUgiAncmVjZWl2aW5nJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAzICAgIOKUgiAgJ3NlbmRpbmcnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgICAqIC8vIFtoYWxmLWR1cGxleF0gTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHRyYW5zaXRpb25zOlxuICAgICAqIC8vIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgICAqIC8vIOKUgiAoaW5kZXgpIOKUgiAgICB0cmFuc2l0aW9ucyAgICDilIIgICAjICAgIOKUglxuICAgICAqIC8vIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgICAqIC8vIOKUgiAgICAwICAgIOKUgiAnaWRsZS0+cmVjZWl2aW5nJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAxICAgIOKUgiAgJ2lkbGUtPnNlbmRpbmcnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAyICAgIOKUgiAncmVjZWl2aW5nLT5kb25lJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAzICAgIOKUgiAgJ3NlbmRpbmctPmRvbmUnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gICAgICogLy8gKE5vIGluZm9ybWF0aW9uKVxuICAgICAqL1xuICAgIGluZm86ICgpID0+IGluZm8oKSxcblxuICAgIC8qKlxuICAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudCBtYWNoaW5lLlxuICAgICAqXG4gICAgICogU2FtZSBkZXRhaWxzIGFzIHtAbGluayAjc3RhdGVib3Rmc21pbmZvfC5pbmZvKCl9IGluIG9iamVjdC1mb3JtLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbnNwZWN0KClcbiAgICAgKiAvLyBXaWxsIHJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICAgKiAvLyAgeyBzdGF0ZXMsIHRyYW5zaXRpb25zLCBldmVudHMgfVxuICAgICAqXG4gICAgICogLy8gVGhlc2Ugd2lsbCBlYWNoIGhhdmUga2V5LXZhbHVlcywgdGhlIGtleSBiZWluZyB0aGUgbmFtZVxuICAgICAqIC8vIGFuZCB0aGUgdmFsdWUgYmVpbmcgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgYXR0YWNoZWQuXG4gICAgICovXG4gICAgaW5zcGVjdDogKCkgPT4gaW5zcGVjdCgpLFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX1cbiAgICAgKiBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgYHN0YXRlYCwgaW1tZWRpYXRlbHkgcmV0dXJuaW5nIGVpdGhlclxuICAgICAqIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIHRoZW4gaXRzIHJldHVybi12YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICAgKiBhcyB0aGUgYHRydWVgLXZhbHVlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZSB0byB0ZXN0IGFnYWluc3QuXG4gICAgICogQHBhcmFtIHthbnl8ZnVuY3Rpb259IFtvdXRwdXRXaGVuVHJ1ZV1cbiAgICAgKiAgT3B0aW9uYWwgYHRydWVgLXZhbHVlLiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgaXQgd2lsbCBiZVxuICAgICAqICBjYWxsZWQgYW5kIGl0cyByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2ZuQXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHRoYXQgd2lsbCBwYXNzIGludG8gYG91dHB1dFdoZW5UcnVlKClgIGlmIGl0IGhhc1xuICAgICAqICBiZWVuIGRlZmluZWQgYXMgYSBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfCp9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAnUHVycnJyLi4uJylcbiAgICAgKiAvLyBcIlB1cnJyci4uLlwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdnZWFyLTEnKVxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdJZGxpbmchJylcbiAgICAgKiAgIHJldHVybiAnUHVycnJyLi4uJ1xuICAgICAqIH0pXG4gICAgICogLy8gbnVsbFxuICAgICAqIC8vIF4gdGhlIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgYXQgYWxsIGluIHRoZSBgZmFsc2VgIGNhc2UsXG4gICAgICogLy8gICBzbyBubyBjb25zb2xlLmxvZyBlaXRoZXIuXG4gICAgICovXG4gICAgaW5TdGF0ZTogaW5TdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBydW4sIHRlc3RzIHRoYXRcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0gbWF0Y2hlcyB0aGVcbiAgICAgKiBzcGVjaWZpZWQgc3RhdGUsIHJldHVybmluZyBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlfC5pblN0YXRlKCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUgdG8gdGVzdCBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBbb3V0cHV0V2hlblRydWVdXG4gICAgICogIE9wdGlvbmFsIGB0cnVlYC12YWx1ZS4gSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgYmVcbiAgICAgKiAgY2FsbGVkIGFuZCBpdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcGFyYW0gey4uLip9IFtjdXJyaWVkRm5BcmdzXVxuICAgICAqICBBcmd1bWVudHMgdGhhdCB3aWxsIGN1cnJ5IGludG8gYG91dHB1dFdoZW5UcnVlKClgIGlmIGl0IGhhc1xuICAgICAqICBiZWVuIGRlZmluZWQgYXMgYSBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYWxscyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGl0dGxlLXJldnZlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICAoZ2Vhci0xIHwgZ2Vhci0yIHwgcmV2ZXJzZSkgLT5cbiAgICAgKiAgICAgaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiB2YXIgaWRsaW5nID0gbWFjaGluZS5JblN0YXRlKCdpZGxlJylcbiAgICAgKiB2YXIgcHVycmluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdJZGxpbmchJylcbiAgICAgKiAgIHJldHVybiAnUHVycnJyLi4uJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBpZGxpbmcoKVxuICAgICAqIC8vIHRydWVcbiAgICAgKlxuICAgICAqIHB1cnJpbmcoKVxuICAgICAqIC8vIElkbGluZyFcbiAgICAgKiAvLyBcIlB1cnJyci4uLlwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdnZWFyLTEnKVxuICAgICAqIHB1cnJpbmcoKVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIEluU3RhdGU6IEluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBzdGF0ZS1tYWNoaW5lLlxuICAgICAqXG4gICAgICogVXNlZCBmb3IgbG9nZ2luZyBhbmQgYWxzbyBieSB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX1cbiAgICAgKiBmb3IgdGhlIHNhbWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnQXksIHRoZXJl4oCZcyB0aGUgcnViLicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHRoZS1xdWVzdGlvbiAtPiAodG8tYmUgfCBub3QtdG8tYmUpXG4gICAgICogICAgICAgbm90LXRvLWJlIC0+IHBlcmNoYW5jZS10by1kcmVhbVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm5hbWUoKVxuICAgICAqIC8vIFwiQXksIHRoZXJl4oCZcyB0aGUgcnViLlwiXG4gICAgICovXG4gICAgbmFtZTogKCkgPT4gbmFtZSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGJlY29tZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtlbnRlckNhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmVkKCdkb25lJywgZnJvbVN0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdFbnRlcmVkIGZyb206JywgZnJvbVN0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyZWQgZnJvbTogcmVjZWl2aW5nXG4gICAgICovXG4gICAgb25FbnRlcmVkOiBlbnRlckV4aXRNZXRob2RzLm9uRW50ZXJlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBtYWRlIGl0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmluZygnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJpbmcgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyaW5nIGZyb206IHNlbmRpbmdcbiAgICAgKiAvLyBXZSBtYWRlIGl0IVxuICAgICAqL1xuICAgIG9uRW50ZXJpbmc6IGVudGVyRXhpdE1ldGhvZHMub25FbnRlcmluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGVudGVyQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIHNwZWNpZmllZFxuICAgICAqIGV2ZW50IGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28gLT4gZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfSxcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV2ZW50KCd0aW1lcicsICgpID0+IHtcbiAgICAgKiAgIHJlZHJhd1RyYWZmaWNMaWdodHMoKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBzZXRJbnRlcnZhbChtYWNoaW5lLkVtaXQoJ3RpbWVyJyksIDIwMDApXG4gICAgICovXG4gICAgb25FdmVudDogb25FdmVudCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIGFyZSBoZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIC8vIFdlIGFyZSBoZWFkaW5nIHRvOiBzZW5kaW5nXG4gICAgICovXG4gICAgb25FeGl0ZWQ6IGVudGVyRXhpdE1ldGhvZHMub25FeGl0ZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipCRUZPUkUqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgaXMgbm8gbG9uZ2VyIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZXhpdENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXhpdGVkKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1BlYWNlIG91dCEnKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXhpdGluZygnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0hlYWRpbmcgdG86JywgdG9TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBIZWFkaW5nIHRvOiByZWNlaXZpbmdcbiAgICAgKiAvLyBQZWFjZSBvdXQhXG4gICAgICovXG4gICAgb25FeGl0aW5nOiBlbnRlckV4aXRNZXRob2RzLm9uRXhpdGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgZXhpdENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSBhZnRlciAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGVkKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBXZSB3ZW50IGZyb20gXCIke2Zyb21TdGF0ZX1cIiB0byBcIiR7dG9TdGF0ZX1cImApXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogLy8gV2Ugd2VudCBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGVkOiBzd2l0Y2hNZXRob2RzLm9uU3dpdGNoZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYmVmb3JlICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBHb2luZyBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIEdvaW5nIGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoaW5nOiBzd2l0Y2hNZXRob2RzLm9uU3dpdGNoaW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoaW5nIC5vblN3aXRjaGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoZWQgLm9uU3dpdGNoZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIHN3aXRjaENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBSdW4gY2FsbGJhY2tzIHdoZW4gdHJhbnNpdGlvbnMgaGFwcGVuLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgc2VuZERhdGEoKVxuICAgICAqICAgICAgIC50aGVuKG1hY2hpbmUuRW50ZXIoJ2RvbmUnLCAnc2VudCcpKVxuICAgICAqICAgICAgIC5jYXRjaChtYWNoaW5lLkVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKG1hY2hpbmUuRW50ZXIoJ2RvbmUnLCAncmVjZWl2ZWQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2gobWFjaGluZS5FbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lJzogd2hhdEhhcHBlbmVkID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FsbCBmaW5pc2hlZDogJywgd2hhdEhhcHBlbmVkKVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNlbmREYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gcmVjZWl2ZURhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFRoZSBhYm92ZSBleGFtcGxlIHVzaW5nIGEgZnVuY3Rpb24gZm9yIGNvbmZpZ1xuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucygoeyBFbnRlciB9KSA9PiAoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgc2VuZERhdGEoKVxuICAgICAqICAgICAgIC50aGVuKEVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goRW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ2lkbGUgLT4gcmVjZWl2aW5nJzogKCkgPT4ge1xuICAgICAqICAgICByZWNlaXZlRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oRW50ZXIoJ2RvbmUnLCAncmVjZWl2ZWQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goRW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIGV0Yy4uLlxuICAgICAqL1xuICAgIG9uVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ29uVHJhbnNpdGlvbnMnKSxcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gdHJhbnNpdGlvbnMgd2hlbiBldmVudHMgaGFwcGVuLlxuICAgICAqXG4gICAgICogVXNlIGB0aGVuYCB0byBvcHRpb25hbGx5IGFkZCBjYWxsYmFja3MgdG8gdGhvc2UgdHJhbnNpdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gdHJhbnNpdGlvbnNcbiAgICAgKiAgQ29uZmlndXJhdGlvbiBpbiB0aGUgZm9ybSBvZiBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgICAqICByZXR1cm5zIGFuIG9iamVjdC4gSWYgYSBmdW5jdGlvbiBpcyB1c2VkLCB0aGVyZSB3aWxsIGJlIGEgc2luZ2xlXG4gICAgICogIGFyZ3VtZW50IHBhc3NlZC1pbjogYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzXG4gICAgICogIGF0dGFjaGVkIGFzIGEgY29udmVuaWVuY2U6XG4gICAgICpcbiAgICAgKiAgLSB7e0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfSwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0sIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0sIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9fVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGFkZGVkXG4gICAgICogIGJ5IHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjb21wbGV4LWZvcm0nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgdXBkYXRlXG4gICAgICpcbiAgICAgKiAgICAgLy8gTWF5YmUgdGhpbmdzIHRha2UgYSBsb25nIHRpbWUuLi5cbiAgICAgKiAgICAgdXBkYXRlIC0+XG4gICAgICogICAgICAgd2FpdGluZyAtPiB3YWl0aW5nLWEtd2hpbGVcbiAgICAgKlxuICAgICAqICAgICAvLyBXaGljaCBwYXRoIHdpbGwgd2UgdGFrZT9cbiAgICAgKiAgICAgd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPlxuICAgICAqICAgICAgIHN1Y2Nlc3MgfCBmYWlsZWQgfCB0aW1lb3V0XG4gICAgICpcbiAgICAgKiAgICAgLy8gQWxsIGRvbmUhXG4gICAgICogICAgIHN1Y2Nlc3MgfCBmYWlsZWQgfCB0aW1lb3V0IC0+XG4gICAgICogICAgICAgZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucygoeyBFbnRlciwgZW1pdCB9KSA9PiAoe1xuICAgICAqICAgJ2lkbGUgLT4gdXBkYXRlJzoge1xuICAgICAqICAgICBvbjogJ3VzZXItc2F2ZWQnLFxuICAgICAqICAgICB0aGVuOiAoZGF0YSkgPT4ge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdTZW5kaW5nIGRhdGE6ICcsIGRhdGEpXG4gICAgICpcbiAgICAgKiAgICAgICBzZW5kRGF0YShkYXRhKVxuICAgICAqICAgICAgICAgLnRoZW4oRW50ZXIoJ3N1Y2Nlc3MnKSlcbiAgICAgKiAgICAgICAgIC5jYXRjaChFbnRlcignZmFpbGVkJykpXG4gICAgICpcbiAgICAgKiAgICAgICBlbWl0KCdkYXRhLXNlbnQnKVxuICAgICAqICAgICB9XG4gICAgICogICB9LFxuICAgICAqICAgJ3VwZGF0ZSAtPiB3YWl0aW5nJzoge1xuICAgICAqICAgICBvbjogJ2RhdGEtc2VudCcsXG4gICAgICogICAgIHRoZW46ICgpID0+IHtcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd3YWl0aW5nLWEtd2hpbGUnKSwgNzUwKVxuICAgICAqICAgICAgIHNldFRpbWVvdXQoRW50ZXIoJ3RpbWVvdXQnKSwgNTAwMClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqIH0pKVxuICAgICAqXG4gICAgICogLy8gSnVzdCB0byBpbGx1c3RyYXRlIHRoYXQgeW91IGNhbiBtaXggbicgbWF0Y2ggd2l0aCBvblRyYW5zaXRpb25zOlxuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucyh7XG4gICAgICogICAnd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPiBzdWNjZXNzJzogKCkgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnTG92ZWx5IScpXG4gICAgICogICB9LFxuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gdGltZW91dCc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1dlbGwsIGF0IGxlYXN0IHlvdSBoYXZlIHlvdXIgc2hvZXMnKVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVtaXQoJ3VzZXItc2F2ZWQnLCBbJ3NvbWUnLCAnZGF0YSddKVxuICAgICAqIC8vIFNlbmRpbmcgZGF0YTogW1wic29tZVwiLCBcImRhdGFcIl1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNlbmREYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqL1xuICAgIHBlcmZvcm1UcmFuc2l0aW9uczogdHJhbnNpdGlvbnMgPT4gYXBwbHlIaXRjaGVyKHRyYW5zaXRpb25zLCAncGVyZm9ybVRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwcmV2aW91cyBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfVxuICAgICAqICBUaGUgcHJldmlvdXMgc3RhdGUsIG9yIGB1bmRlZmluZWRgIGlmIHRoZXJlIGlzbid0IG9uZSAoaWU7IHlvdVxuICAgICAqICBoYXZlIGp1c3QgY2FsbGVkIHtAbGluayAjc3RhdGVib3Rmc21yZXNldHwucmVzZXQoKX0sIG9yIHRoZVxuICAgICAqICBtYWNoaW5lIGhhcyBqdXN0IHN0YXJ0ZWQuKVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdzaW1wbGUtc2VuZGVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogbWFjaGluZS5wcmV2aW91c1N0YXRlKClcbiAgICAgKiAvLyBcImlkbGVcIlxuICAgICAqL1xuICAgIHByZXZpb3VzU3RhdGU6IHByZXZpb3VzU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdGF0ZS1tYWNoaW5lIHRvIGl0cyBzdGFydGluZy1zdGF0ZSBhbmQgY2xlYXJzIHRoZVxuICAgICAqIHN0YXRlLWhpc3RvcnkuXG4gICAgICpcbiAgICAgKiBBbGwgbGlzdGVuZXJzIHdpbGwgc3RpbGwgYmUgYXR0YWNoZWQsIGJ1dCBubyBldmVudHMgb3IgdHJhbnNpdGlvbnMgd2lsbCBiZSBmaXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjYXJvdXNlbCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHBhZ2UtMSAtPlxuICAgICAqICAgICBwYWdlLTIgLT5cbiAgICAgKiAgICAgcGFnZS0zIC0+XG4gICAgICogICAgIHBhZ2UtNCAtPiBwYWdlLTFcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncGFnZS0yJylcbiAgICAgKiBtYWNoaW5lLnJlc2V0KClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJwYWdlLTFcIlxuICAgICAqL1xuICAgIHJlc2V0OiByZXNldCxcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBgYXJyYXlgIG9mIHN0YXRlcyBhY2Nlc3NpYmxlIGZyb20gdGhlIHN0YXRlIHNwZWNpZmllZC5cbiAgICAgKiBJZiBubyBzdGF0ZSBpcyBwYXNzZWQtaW4sIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0gaXMgdXNlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGVdIFRoZSBzdGF0ZSB0byBjaGVjay4ge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9XG4gICAgICogIGlmIHVuc3BlY2lmaWVkLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmdbXX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgICogLy8gW1wic2VuZGluZ1wiLCBcInJlY2VpdmluZ1wiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgncmVjZWl2aW5nJylcbiAgICAgKiAvLyBbXCJkb25lXCJdXG4gICAgICovXG4gICAgc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmU6IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlQ29uZmlncyAoY29uZmlncywgY2FuV2Fybikge1xuICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gIGNvbnN0IF9jb25maWdzID0gY29uZmlncy5yZWR1Y2UoKGFjYywgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgeyByb3V0ZUNoYXJ0LCBhY3Rpb24gfSA9IGNvbmZpZ1xuICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydChyb3V0ZUNoYXJ0KVxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmFjYyxcbiAgICAgIC4uLnRyYW5zaXRpb25zLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSB0cmFuc2l0aW9uXG4gICAgICAgIHJldHVybiB7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH1cbiAgICAgIH0pXG4gICAgXVxuICB9LCBbXSlcblxuICByZXR1cm4ge1xuICAgIGNvbmZpZ3M6IF9jb25maWdzLFxuICAgIHN0YXRlczogYWxsU3RhdGVzLFxuICAgIHJvdXRlczogYWxsUm91dGVzXG4gIH1cbn1cblxuLyoqXG4gKiBUZXN0cyB0aGF0IGFuIG9iamVjdCBpcyBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gKlxuICogaXNTdGF0ZWJvdChtYWNoaW5lKVxuICogLy8gdHJ1ZVxuICpcbiAqIEBwYXJhbSB7YW55fSBvYmplY3QgVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblxuZnVuY3Rpb24gaXNTdGF0ZWJvdCAob2JqZWN0KSB7XG4gIHJldHVybiAoXG4gICAgaXNQb2pvKG9iamVjdCkgJiZcbiAgICB0eXBlb2Ygb2JqZWN0Ll9fU1RBVEVCT1RfXyA9PT0gJ251bWJlcidcbiAgKVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQVNTRVJUSU9OIEhFTFBFUlNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByb3V0ZUlzUG9zc2libGUsXG4gIGFzc2VydFJvdXRlXG59XG5cbmNvbnN0IHsgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGRlY29tcG9zZVJvdXRlIH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuY29uc3Qge1xuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBMb2dnZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgaXNUZW1wbGF0ZUxpdGVyYWxcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGEgY2VydGFpbiByb3V0ZSBjYW4gYmUgZm9sbG93ZWQgYnkgYVxuICoge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gKlxuICogVGhpcyBtZXJlbHkgdGVzdHMgdGhhdCBhIGNlcnRhaW4gcGF0aCBjYW4gYmUgdGFrZW4gdGhyb3VnaCBhXG4gKiBzdGF0ZS1tYWNoaW5lLiBJdCBkb2Vzbid0IGFzc2VydCB0aGF0IHRoZSBzdGF0ZXMgYXJlIG1vdmVkLXRocm91Z2hcbiAqIHdoaWxlIHRoZSBtYWNoaW5lIGlzIHdvcmtpbmcsIGFzIHdpdGhcbiAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdGF0ZWJvdEZzbX0gbWFjaGluZVxuICogIFRoZSBtYWNoaW5lIHRvIHRlc3QgdGhlIHJvdXRlIG9uLlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHJvdXRlXG4gKiAgVGhlIHJvdXRlIHRvIHRlc3QgYXMgYW4gYXJyb3ctZGVsaW1pdGVkIHN0cmluZzpcbiAqXG4gKiAgYFxuICogIFwiaWRsZSAtPiBwZW5kaW5nIC0+IHN1Y2Nlc3MgLT4gZG9uZVwiXG4gKiAgYFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICpcbiAqIHJvdXRlSXNQb3NzaWJsZShtYWNoaW5lLFxuICogICAnd2Fsa2luZyAtPiBmYWxsaW5nIC0+IHNwbGF0dGluZyAtPiB3YWxraW5nJ1xuICogKVxuICogLy8gZmFsc2VcbiAqL1xuXG5mdW5jdGlvbiByb3V0ZUlzUG9zc2libGUgKG1hY2hpbmUsIHJvdXRlKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcigncm91dGVJc1Bvc3NpYmxlJyxcbiAgICB7IG1hY2hpbmU6IGlzU3RhdGVib3QsIHJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIHJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBfcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShyb3V0ZSlcbiAgcmV0dXJuIF9yb3V0ZS5ldmVyeSgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSBfcm91dGUubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gX3JvdXRlW2luZGV4ICsgMV1cbiAgICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoc3RhdGUpXG4gICAgICBjb25zdCBwYXNzZXMgPSBhdmFpbGFibGVTdGF0ZXMuaW5jbHVkZXMobmV4dFN0YXRlKVxuICAgICAgcmV0dXJuIHBhc3Nlc1xuICAgIH1cbiAgfSlcbn1cblxubGV0IGFzc2VydGlvbklkID0gMFxuXG4vKipcbiAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfSBvcHRpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gYXNzZXJ0Um91dGVPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Rlc2NyaXB0aW9uXVxuICogIERlc2NyaWJlIHRoZSBzdWNjZXNzLWNvbmRpdGlvbiBmb3IgdGhpcyBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Zyb21TdGF0ZT1cIlwiXVxuICogIFdhaXQgZm9yIHRoZSBtYWNoaW5lIHRvIGJlIGluIHRoaXMgc3RhdGUgYmVmb3JlIGFzc2VydGlvbiBiZWdpbnMuXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBbcnVuXVxuICogIFJ1biB0aGlzIGZ1bmN0aW9uIGp1c3QgYmVmb3JlIHN0YXJ0aW5nIHRoZSBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3Blcm1pdHRlZERldmlhdGlvbnM9MF1cbiAqICBJZiB3ZSBoaXQgYW4gdW5leHBlY3RlZCBzdGF0ZSBkdXJpbmcgYXNzZXJ0aW9uLCB0aGlzIGlzIGEgXCJkZXZpYXRpb25cIi5cbiAqICBJdCBtaWdodCBiZSB0aGF0IHRoZSBGU00gd2lsbCBjb21lIGJhY2sgdG8gdGhlIGV4cGVjdGVkIHN0YXRlIGFnYWluXG4gKiAgYWZ0ZXIgYSBjZXJ0YWluIG51bWJlciBvZiB0aGVzZS4gRm9yIGV4YW1wbGUsIGlmIHlvdXIgRlNNIGhhcyBhXG4gKiAgXCJyZXRyeVwiIHJvdXRlIGNvbmZpZ3VyZWQsIHRoaXMgbnVtYmVyIGNhbiBhY2NvdW50IGZvciBpdC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbdGltZW91dEluTXM9MTAwMF1cbiAqICBQZXJtaXR0ZWQgbGVuZ3RoIG9mIHRpbWUgZm9yIHRoZSBlbnRpcmUgYXNzZXJ0aW9uLCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgTm9ybWFsbHkgd2Ugd2FudCBsb2dzIGZvciBhc3NlcnRpb25zLCByaWdodD8gV2VsbCwgeW91IGNhbiB0dW5lXG4gKiAgdGhlbSBqdXN0IGxpa2UgeW91IGNhbiB3aXRoIHtAbGluayAjc3RhdGVib3RvcHRpb25zfHN0YXRlYm90T3B0aW9uc30uXG4gKi9cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IHRyYWNlZCB0aGUgcm91dGUgc3BlY2lmaWVkLlxuICpcbiAqIFdoZXJlYXMge0BsaW5rICNzdGF0ZWJvdHJvdXRlaXNwb3NzaWJsZXxyb3V0ZUlzUG9zc2libGUoKX0gb25seSBjaGVja3NcbiAqIHRoYXQgYSBwYXJ0aWN1bGFyIHJvdXRlIGNhbiBiZSBmb2xsb3dlZCwgYGFzc2VydFJvdXRlYCB3aWxsIGhvb2staW50b1xuICogYSBtYWNoaW5lIGFuZCB3YWl0IGZvciBpdCB0byB0cmFjZSB0aGUgc3BlY2lmaWVkIHBhdGggd2l0aGluIGFcbiAqIHRpbWVvdXQgcGVyaW9kLlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAqICBUaGUgbWFjaGluZSB0byBydW4gdGhlIGFzc2VydGlvbiBvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBleHBlY3RlZFJvdXRlXG4gKiAgVGhlIGV4cGVjdGVkIHJvdXRlIGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gKlxuICogIGBcbiAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICogIGBcbiAqIEBwYXJhbSB7YXNzZXJ0Um91dGVPcHRpb25zfSBbb3B0aW9uc11cbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAqXG4gKiBhc3NlcnRSb3V0ZShcbiAqICAgbWFjaGluZSwgJ3ByZXBhcmUgLT4gZGVib3VuY2UgLT4gc2VuZGluZyAtPiBkb25lIC0+IGlkbGUnLFxuICogICB7XG4gKiAgICAgZGVzY3JpcHRpb246ICdFbWFpbCBzZW50IHdpdGggbm8gaXNzdWVzJyxcbiAqICAgICBmcm9tU3RhdGU6ICdpZGxlJyxcbiAqICAgICB0aW1lb3V0SW5NczogMTAwMCAqIDIwLFxuICogICAgIHBlcm1pdHRlZERldmlhdGlvbnM6IDAsXG4gKiAgICAgbG9nTGV2ZWw6IDNcbiAqICAgfVxuICogKVxuICogLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ0Fzc2VydGlvbiBwYXNzZWQhJykpXG4gKiAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoYFdob29wczogJHtlcnJ9YCkpXG4gKlxuICogbWFjaGluZS5lbnRlcignaWRsZScpXG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0Um91dGUgKG1hY2hpbmUsIGV4cGVjdGVkUm91dGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdhc3NlcnRSb3V0ZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCBleHBlY3RlZFJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIGV4cGVjdGVkUm91dGVcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGFzc2VydGlvbklkICs9IDFcblxuICBjb25zdCB7XG4gICAgZGVzY3JpcHRpb24gPSAnQXNzZXJ0aW9uIGNvbXBsZXRlJyxcbiAgICBmcm9tU3RhdGUgPSAnJyxcbiAgICBydW4gPSAoKSA9PiB7fSxcbiAgICBwZXJtaXR0ZWREZXZpYXRpb25zID0gMCxcbiAgICB0aW1lb3V0SW5NcyA9IDEwMDAsXG4gICAgbG9nTGV2ZWwgPSAzXG4gIH0gPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uc3QgY29uc29sZSA9IExvZ2dlcihsb2dMZXZlbClcblxuICBjb25zdCBwcmVmaXggPSBgU3RhdGVib3RbJHttYWNoaW5lLm5hbWUoKX1dOiBhSWQ8JHthc3NlcnRpb25JZH0+YFxuICBjb25zdCByb3V0ZSA9IGRlY29tcG9zZVJvdXRlKGV4cGVjdGVkUm91dGUpXG5cbiAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogQXNzZXJ0aW5nIHJvdXRlOiBbJHtyb3V0ZS5qb2luKCcgPiAnKX1dYClcbiAgY29uc29sZS5sb2coYCR7cHJlZml4fTogPiBBc3NlcnRpb24gd2lsbCBzdGFydCBmcm9tIHN0YXRlOiBcIiR7ZnJvbVN0YXRlfVwiYClcblxuICBjb25zdCBmcm9tU3RhdGVBY3Rpb25GbiA9IERlZmVyKHJ1bilcbiAgbGV0IHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gKCkgPT4geyB9XG5cbiAgY29uc3QgdG90YWxUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgYXNzZXJ0aW9uVGltZW91dFRpbWVyXG4gIGxldCBkZXZpYXRpb25zID0gMFxuICBsZXQgcGVuZGluZyA9IHRydWVcbiAgbGV0IHVuZXhwZWN0ZWQgPSBmYWxzZVxuXG4gIGNvbnN0IGNvbnN1bWVSb3V0ZSA9IFsuLi5yb3V0ZV1cbiAgY29uc3QgcmVwb3J0ID0gVGFibGUoXG4gICAgWydzdGF0ZScsICdleHBlY3RlZCcsICdpbmZvJywgJ3Rvb2snXSxcbiAgICBbJ2NlbnRlcicsICdjZW50ZXInLCAnbGVmdCcsICdyaWdodCddXG4gIClcblxuICBjb25zdCBmaW5hbGlzZVJlcG9ydCA9IE9uY2UoZXJyID0+IHtcbiAgICBhZGRSb3coJycsICcnLCAnJywgJ1RPVEFMOiAnICsgdG90YWxUaW1lVGFrZW4oKSlcbiAgICByZXBvcnQubG9jaygpXG4gICAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogJHtkZXNjcmlwdGlvbn06IFske2VyciA/ICdGQUlMRUQnIDogJ1NVQ0NFU1MnfV1gKVxuICAgIGNvbnNvbGUudGFibGUocmVwb3J0LmNvbnRlbnQoKSlcbiAgICByZXR1cm4gZXJyXG4gIH0pXG5cbiAgY29uc3QgeyBhZGRSb3cgfSA9IHJlcG9ydFxuICBmdW5jdGlvbiBlbnRlcmVkU3RhdGUgKHN0YXRlKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIGFkZFJvdyhzdGF0ZSwgJy0nLCAnUEVORElORycpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSBjb25zdW1lUm91dGVbMF1cbiAgICAgIGlmIChleHBlY3RlZFN0YXRlID09PSBzdGF0ZSkge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsIHVuZXhwZWN0ZWQgPyAnUkVBTElHTkVEJyA6ICdPS0FZJywgc3RhdGVUaW1lVGFrZW4oKSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICAgIGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsICdXUk9ORyBTVEFURScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSB0cnVlXG4gICAgICAgIGRldmlhdGlvbnMgKz0gMVxuICAgICAgfVxuICAgICAgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IoJ05PIFJPVVRFIFRPIFRFU1QnKSkpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZXNvbHZlID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlc29sdmUoLi4uYXJncylcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZWplY3QgPSBlcnIgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGFzc2VydGlvblRpbWVvdXRUaW1lcilcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIoKVxuICAgICAgcmVqZWN0KGVycilcbiAgICB9XG5cbiAgICBjb25zdCBiYWlsb3V0ID0gbWVzc2FnZSA9PiB7XG4gICAgICB3aGlsZSAoY29uc3VtZVJvdXRlLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlLnNoaWZ0KClcbiAgICAgICAgYWRkUm93KG1hY2hpbmUuY3VycmVudFN0YXRlKCksIGAoJHtleHBlY3RlZFN0YXRlfSlgLCBtZXNzYWdlKVxuICAgICAgICB1bmV4cGVjdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dEFuZFJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IobWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGlmIChtYWNoaW5lLmluU3RhdGUoZnJvbVN0YXRlKSkge1xuICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9IGZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICB9XG5cbiAgICBjb25zdCB7IHJldm9rZSwgZm4gfSA9IFJldm9rYWJsZShzdGF0ZSA9PiB7XG4gICAgICBhc3NlcnRpb25UaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVElNRU9VVCcpXG4gICAgICB9LCB0aW1lb3V0SW5NcylcblxuICAgICAgZW50ZXJlZFN0YXRlKHN0YXRlKVxuICAgICAgaWYgKHBlbmRpbmcgJiYgc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBwZW5kaW5nID0gZmFsc2VcbiAgICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICB9XG4gICAgICBpZiAoZGV2aWF0aW9ucyA+IHBlcm1pdHRlZERldmlhdGlvbnMpIHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVE9PIE1BTlkgREVWSUFUSU9OUycpXG4gICAgICB9XG4gICAgICBpZiAoY29uc3VtZVJvdXRlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGNsZWFyVGltZW91dEFuZFJlc29sdmUoZmluYWxpc2VSZXBvcnQoKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lciA9IG1hY2hpbmUub25Td2l0Y2hpbmcoZm4pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIFRhYmxlIChjb2x1bW5zID0gW10sIGFsaWdubWVudHMgPSBbXSkge1xuICBjb25zdCB0YWJsZSA9IFtdXG4gIGNvbnN0IGFsaWdubWVudCA9IGNvbHVtbnMubWFwKChfLCBpbmRleCkgPT4gYWxpZ25tZW50c1tpbmRleF0gfHwgJ2NlbnRlcicpXG5cbiAgbGV0IGxvY2tlZCA9IGZhbHNlXG4gIGZ1bmN0aW9uIGxvY2sgKCkge1xuICAgIGxvY2tlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFJvdyAoLi4uYXJncykge1xuICAgIGlmIChsb2NrZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBvYmogPSBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjb2wsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByb3cgPSBhcmdzW2luZGV4XSB8fCAnJ1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogcm93XG4gICAgICB9XG4gICAgfSwge30pXG4gICAgdGFibGUucHVzaChvYmopXG4gIH1cblxuICBmdW5jdGlvbiBjb2xTaXplcyAoKSB7XG4gICAgcmV0dXJuIHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IGNvbHVtbnMubWFwKChjb2wsIGluZGV4KSA9PiBNYXRoLm1heChyb3dbY29sXS5sZW5ndGgsIGFjY1tpbmRleF0pKSwgY29sdW1ucy5tYXAoKCkgPT4gMCkpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRMZWZ0IChzdHIsIGxlbikge1xuICAgIHJldHVybiBzdHIgKyAnICcucmVwZWF0KGxlbiAtIHN0ci5sZW5ndGgpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRSaWdodCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKSArIHN0clxuICB9XG5cbiAgZnVuY3Rpb24gY29udGVudCAoKSB7XG4gICAgY29uc3Qgc2l6ZXMgPSBjb2xTaXplcygpXG4gICAgZnVuY3Rpb24gZm9ybWF0RmllbGQgKHZhbHVlLCBpbmRleCkge1xuICAgICAgY29uc3Qgc2l6ZSA9IHNpemVzW2luZGV4XVxuICAgICAgY29uc3QgYWxpZ24gPSBhbGlnbm1lbnRbaW5kZXhdXG4gICAgICBpZiAoYWxpZ24gPT09ICdsZWZ0Jykge1xuICAgICAgICByZXR1cm4gcGFkTGVmdCh2YWx1ZSwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIGlmIChhbGlnbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICByZXR1cm4gcGFkUmlnaHQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gdGFibGUucmVkdWNlKChhY2MsIHJvdykgPT4ge1xuICAgICAgY29uc3QgZm9ybWF0dGVkUm93ID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4gKHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogZm9ybWF0RmllbGQocm93W2NvbF0sIGluZGV4KVxuICAgICAgfSksIHt9KVxuICAgICAgcmV0dXJuIFsuLi5hY2MsIGZvcm1hdHRlZFJvd11cbiAgICB9LCBbXSlcbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvY2s6IGxvY2ssXG4gICAgYWRkUm93OiBhZGRSb3csXG4gICAgY29udGVudDogY29udGVudFxuICB9XG59XG5cbmZ1bmN0aW9uIFRpbWVUYWtlbiAoKSB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KClcblxuICBmdW5jdGlvbiBmbXQgKG51bSwgZGlnaXRzKSB7XG4gICAgcmV0dXJuIG51bS50b0ZpeGVkKGRpZ2l0cykucmVwbGFjZSgvXFwuMCskLywgJycpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuXG4gICAgaWYgKGR1cmF0aW9uIDwgNTAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uKX0gbXNgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDUwMDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwLCAyKX0gcyBgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDYwMDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMSl9IHMgYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCAvIDYwLCAxKX0gbSBgXG4gICAgfVxuICB9XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBFWFBPUlRTXG4vL1xuXG5jb25zdCB7IFN0YXRlYm90LCBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgYXNzZXJ0Um91dGUsIHJvdXRlSXNQb3NzaWJsZSB9ID0gcmVxdWlyZSgnLi9hc3NlcnRpb25zJylcbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbi8qKlxuICogPGltZyBzcmM9XCIuL2xvZ28tZnVsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogMjU1cHg7IG1hcmdpbjogMTBweCAwO1wiIC8+XG4gKlxuICogV3JpdGUgbW9yZSByb2J1c3QgYW5kIHVuZGVyc3RhbmRhYmxlIHByb2dyYW1zLlxuICpcbiAqIFN0YXRlYm90IGhvcGVzIHRvIG1ha2UgW0Zpbml0ZSBTdGF0ZSBNYWNoaW5lc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmluaXRlLXN0YXRlX21hY2hpbmUpIChGU01zKSBhIGxpdHRsZSBtb3JlIGFjY2Vzc2libGUuXG4gKlxuICogWW91J3JlIHJlYWRpbmcgdGhlIGRvY3VtZW50YXRpb24uIE90aGVyIGV4aXRzIGFyZTpcbiAqXG4gKiAtIFRoZSBbUkVBRE1FIGZpbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3QvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kKVxuICogLSBUaGUgW0dpdGh1YiBSZXBvXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90KVxuICogLSBUaGUgc2hlbGwtc2NyaXB0IHZlcnNpb24sIFtTdGF0ZWJvdC1zaF0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdC1zaClcbiAqXG4gKiBTdGF0ZWJvdCB3YXMgd3JpdHRlbiBieSBbQ29uYW4gVGhlb2JhbGRdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvKSBhbmRcbiAqIGlzIFtJU0MgbGljZW5zZWRdKC4uL0xJQ0VOU0UpLlxuICpcbiAqICMjIyBKdW1wIHJpZ2h0IGluXG4gKlxuICogUGxheSBhcm91bmQgd2l0aCBhbiBleGFtcGxlIHRoYXQgdXNlcyBSZWFjdCBpbiBbdGhpcyBDb2RlU2FuZGJveF0oaHR0cHM6Ly9jb2Rlc2FuZGJveC5pby9zL3N0YXRlYm90LXJlYWN0LW90M3hlP2ZpbGU9L3NyYy9Mb2FkZXIuanMpLlxuICpcbiAqIFlvdSBjYW4gaW5zdGFsbCBTdGF0ZWJvdCBpbnRvIHlvdXIgYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBzaFxuICogbnBtIGkgc3RhdGVib3RcbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgc3RhdGVib3QgZnJvbSAnc3RhdGVib3QnXG4gKiBgYGBcbiAqXG4gKiBPciBub24tYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBqc1xuICogPHNjcmlwdCBzcmM9XCJodHRwczovL3VucGtnLmNvbS9zdGF0ZWJvdEAyLjMuNC9kaXN0L2Jyb3dzZXIvc3RhdGVib3QubWluLmpzXCI+PC9zY3JpcHQ+XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgeyBTdGF0ZWJvdCB9ID0gc3RhdGVib3RcbiAqIC8vIE1ha2UgbWFjaGluZXMgd2l0aCBTdGF0ZWJvdCgpXG4gKlxuICogY29uc3QgeyBpc1N0YXRlYm90LCByb3V0ZUlzUG9zc2libGUsIGFzc2VydFJvdXRlIH0gPSBzdGF0ZWJvdFxuICogLy8gVGhlc2UgYXJlIGFzc2VydGlvbiBoZWxwZXJzIHlvdSBjYW4gdXNlIGZvciB0ZXN0aW5nXG4gKiBgYGBcbiAqXG4gKiAjIyMgT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgOilcbiAqXG4gKiBJJ3ZlIGluY2x1ZGVkIFN0YXRlYm90IGluIHRoaXMgcGFnZS4gT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgdG9cbiAqIGZvbGxvdyBhbG9uZyB3aXRoIHRoZSBleGFtcGxlcyBiZWxvdzpcbiAqXG4gKiBgYGBqc1xuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncHJvbWlzZS1saWtlJywge1xuICogICBjaGFydDogYFxuICogICAgIC8vIFRoaXMgb25lIHdpbGwgYmVoYXZlIGEgYml0IGxpa2UgYSBQcm9taXNlXG4gKiAgICAgaWRsZSAtPiBwZW5kaW5nIC0+XG4gKiAgICAgICByZXNvbHZlZCB8IHJlamVjdGVkXG4gKlxuICogICAgIC8vIC4uLmFuZCB3ZSdyZSBkb25lXG4gKiAgICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICAgIHJlamVjdGVkIC0+IGRvbmVcbiAqICAgYCxcbiAqICAgc3RhcnRJbjogJ2lkbGUnXG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwZW5kaW5nJylcbiAqIC8vIHRydWVcbiAqXG4gKiBtYWNoaW5lLmVudGVyKCdwZW5kaW5nJylcbiAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICogLy8gW1wicmVzb2x2ZWRcIiwgXCJyZWplY3RlZFwiXVxuICogYGBgXG4gKlxuICogV2UgY2FuIGhvb2stdXAgZXZlbnRzIHdpdGgge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9OlxuICpcbiAqIGBgYGpzXG4gKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gKiAgJ3BlbmRpbmcgLT4gcmVzb2x2ZWQnOiB7XG4gKiAgICBvbjogJ2RhdGEtbG9hZGVkJ1xuICogIH0sXG4gKiAgJ3BlbmRpbmcgLT4gcmVqZWN0ZWQnOiB7XG4gKiAgICBvbjogWyd0aW1lb3V0JywgJ2RhdGEtZXJyb3InXSxcbiAqICAgIHRoZW46IChtc2cpID0+IHtcbiAqICAgICAgY29uc29sZS53YXJuKCdVaCBvaC4uLicsIG1zZylcbiAqICAgIH1cbiAqICB9LFxuICogICdyZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmUnOiB7XG4gKiAgICBvbjogJ3RoYXRzLWFsbC1mb2xrcydcbiAqICB9XG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuZW1pdCgnZGF0YS1lcnJvcicsICdEaWQgeW91IGhlYXIgdGhhdD8nKVxuICogYGBgXG4gKlxuICogSGVyZSdzIHRoZSBBUEk6XG4gKlxuICogfCBIaXRjaGVycyB8IFN0YXR1cyB8IEFjdGlvbnMgfFxuICogfC18LXwtfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudCAub25FdmVudCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jYW50cmFuc2l0aW9udG8gLmNhblRyYW5zaXRpb25UbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21zdGF0ZXNhdmFpbGFibGVmcm9taGVyZSAuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfSAvIHtAbGluayAjZW1pdC1ldmVudG5hbWUtY3VycmllZGFyZ3MgLkVtaXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb250cmFuc2l0aW9ucyAub25UcmFuc2l0aW9ucygpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGUgLmN1cnJlbnRTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21wcmV2aW91c3N0YXRlIC5wcmV2aW91c1N0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3RvcnkgLmhpc3RvcnkoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IC8ge0BsaW5rICNlbnRlci1zdGF0ZS1jdXJyaWVkYXJncyAuRW50ZXIoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyZWQgLm9uRW50ZXJlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlIC5pblN0YXRlKCl9IC8ge0BsaW5rICNpbnN0YXRlLXN0YXRlLW91dHB1dHdoZW50cnVlLWN1cnJpZWRmbmFyZ3MgLkluU3RhdGUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXQgLnJlc2V0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbmZvIC5pbmZvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWluc3BlY3QgLmluc3BlY3QoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtbmFtZSAubmFtZSgpfSB8ICB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSB8ICB8ICB8XG4gKlxuICogPGltZyBzcmM9XCIuL2xvZ28tc21hbGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDc1cHg7IG1hcmdpbjogMTVweCAwIDAgNXB4O1wiIC8+XG4gKlxuICogQG1vZHVsZSBzdGF0ZWJvdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTdGF0ZWJvdCxcbiAgaXNTdGF0ZWJvdCxcbiAgcm91dGVJc1Bvc3NpYmxlLFxuICBhc3NlcnRSb3V0ZSxcbiAgZGVjb21wb3NlQ2hhcnRcbn1cbiJdLCJuYW1lcyI6WyJ1bmlxIiwiQXJnVHlwZUVycm9yIiwiaXNUZW1wbGF0ZUxpdGVyYWwiLCJyZXF1aXJlJCQwIiwiaXNBcnJheSIsImlzRXZlbnRFbWl0dGVyIiwiaXNGdW5jdGlvbiIsImlzUG9qbyIsImlzU3RyaW5nIiwiTG9nZ2VyIiwiUmVmZXJlbmNlQ291bnRlciIsImRlY29tcG9zZUNoYXJ0IiwiY3hBcnJvdyIsInJlcXVpcmUkJDEiLCJldmVudHMiLCJFdmVudEVtaXR0ZXIiLCJpc1N0YXRlYm90IiwiZGVjb21wb3NlUm91dGUiLCJEZWZlciIsIk9uY2UiLCJSZXZva2FibGUiLCJyZXF1aXJlJCQyIiwiYXJnVHlwZUVycm9yIiwiU3RhdGVib3QiLCJhc3NlcnRSb3V0ZSIsInJvdXRlSXNQb3NzaWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQSxTQUFjLEdBQUc7QUFDakIsRUFBRSxPQUFPO0FBQ1QsRUFBRSxjQUFjO0FBQ2hCLEVBQUUsVUFBVTtBQUNaLEVBQUUsTUFBTTtBQUNSLEVBQUUsUUFBUTtBQUNWLEVBQUUsaUJBQWlCO0FBQ25CLEVBQUUsSUFBSTtBQUNOLEVBQUUsS0FBSztBQUNQLEVBQUUsSUFBSTtBQUNOLEVBQUUsU0FBUztBQUNYLEVBQUUsZ0JBQWdCO0FBQ2xCLEVBQUUsWUFBWTtBQUNkLEVBQUUsTUFBTTtBQUNSLEVBQUM7QUFFRCxTQUFTLE9BQU8sRUFBRSxHQUFHLEVBQUU7QUFDdkIsRUFBRSxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQzNCLENBQUM7QUFFRCxTQUFTLFVBQVUsRUFBRSxHQUFHLEVBQUU7QUFDMUIsRUFBRSxPQUFPLE9BQU8sR0FBRyxLQUFLLFVBQVU7QUFDbEMsQ0FBQztBQUVELFNBQVMsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUN4QixFQUFFLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUTtBQUNoQyxDQUFDO0FBRUQsU0FBUyxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLEVBQUUsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRO0FBQ2hDLENBQUM7QUFFRCxTQUFTLGNBQWMsRUFBRSxHQUFHLEVBQUU7QUFDOUIsRUFBRTtBQUNGLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUNqQixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3hCLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDL0IsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUNsQyxHQUFHO0FBQ0gsQ0FBQztBQUVELFNBQVMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUN0QixFQUFFLElBQUksR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3hDLElBQUksT0FBTyxLQUFLO0FBQ2hCLEdBQUc7QUFDSCxFQUFFLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUMsU0FBUztBQUN4RCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7QUFDakMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNyQixJQUFJLE9BQU8sSUFBSTtBQUNmLEdBQUc7QUFDSCxFQUFFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3BCLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUMsR0FBRztBQUNILEVBQUUsT0FBTyxLQUFLO0FBQ2QsQ0FBQztBQUVELFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUN0QixFQUFFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUN4RixDQUFDO0FBRUQsU0FBUyxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFO0FBQzdCLEVBQUUsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUM7QUFDMUMsRUFBRSxPQUFPLE1BQU07QUFDZixJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUM7QUFDdkIsR0FBRztBQUNILENBQUM7QUFDRCxTQUFTLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDcEIsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQztBQUN4QyxDQUFDO0FBRUQsU0FBUyxJQUFJLEVBQUUsRUFBRSxFQUFFO0FBQ25CLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBQztBQUMzQyxFQUFFLElBQUksT0FBTTtBQUNaLEVBQUUsT0FBTyxVQUFVLEdBQUcsSUFBSSxFQUFFO0FBQzVCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBQztBQUN6QixJQUFJLE1BQU0sR0FBRTtBQUNaLElBQUksT0FBTyxNQUFNO0FBQ2pCLEdBQUc7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTLEVBQUUsRUFBRSxFQUFFO0FBQ3hCLEVBQUUsSUFBSSxPQUFPLEdBQUcsTUFBSztBQUNyQixFQUFFLElBQUksT0FBTTtBQUNaLEVBQUUsT0FBTztBQUNULElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEtBQUs7QUFDckIsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFFBQVEsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBQztBQUM1QixPQUFPO0FBQ1AsTUFBTSxPQUFPLE1BQU07QUFDbkIsS0FBSztBQUNMLElBQUksTUFBTSxFQUFFLE1BQU07QUFDbEIsTUFBTSxPQUFPLEdBQUcsS0FBSTtBQUNwQixLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFFRCxTQUFTLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsU0FBUyxFQUFFO0FBQ2xFLEVBQUUsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ25CLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUk7QUFDdkMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQztBQUNsQixHQUFHLEVBQUM7QUFDSixFQUFFLFNBQVMsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUMxQixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQztBQUNqQyxJQUFJLE9BQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQzlCLEdBQUc7QUFDSCxFQUFFLFNBQVMsUUFBUSxFQUFFLEdBQUcsRUFBRTtBQUMxQixJQUFJLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDO0FBQ2xDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBQztBQUNuQyxHQUFHO0FBQ0gsRUFBRSxTQUFTLE9BQU8sRUFBRSxHQUFHLEVBQUU7QUFDekIsSUFBSSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQzFCLEdBQUc7QUFDSCxFQUFFLFNBQVMsSUFBSSxJQUFJO0FBQ25CLElBQUksT0FBTyxFQUFFLEdBQUcsS0FBSyxFQUFFO0FBQ3ZCLEdBQUc7QUFDSCxFQUFFLFNBQVMsS0FBSyxJQUFJO0FBQ3BCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRTtBQUNwQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDcEMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSztBQUM3QixRQUFRLE9BQU87QUFDZixVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUc7QUFDckIsVUFBVSxJQUFJLEVBQUUsS0FBSyxJQUFJLE1BQU07QUFDL0IsU0FBUztBQUNULE9BQU8sQ0FBQztBQUNSLEdBQUc7QUFDSCxFQUFFLFNBQVMsT0FBTyxJQUFJO0FBQ3RCLElBQUksT0FBTztBQUNYLE1BQU0sV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUN2RCxNQUFNLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEIsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFLE9BQU87QUFDVCxJQUFJLFFBQVEsRUFBRSxRQUFRO0FBQ3RCLElBQUksUUFBUSxFQUFFLFFBQVE7QUFDdEIsSUFBSSxPQUFPLEVBQUUsT0FBTztBQUNwQixJQUFJLE9BQU8sRUFBRSxPQUFPO0FBQ3BCLElBQUksSUFBSSxFQUFFLElBQUk7QUFDZCxHQUFHO0FBQ0gsQ0FBQztBQUVELFNBQVMsWUFBWSxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUU7QUFDdkMsRUFBRSxPQUFPLFVBQVUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksRUFBRTtBQUM3QyxJQUFJLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQzFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7QUFDbkMsUUFBUSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUNuQyxPQUFPLEVBQUM7QUFFUixJQUFJLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQztBQUVyRCxJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUk7QUFDcEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxLQUFLO0FBQzNCLFFBQVEsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFDO0FBQ2xELFFBQVEsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQy9CLFVBQVUsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbkQsU0FBUztBQUVULFFBQVEsSUFBSSxVQUFTO0FBQ3JCLFFBQVEsSUFBSSxTQUFRO0FBQ3BCLFFBQVEsSUFBSSxZQUFXO0FBRXZCLFFBQVEsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDakMsVUFBVSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUk7QUFDN0MsVUFBVSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUk7QUFDakMsVUFBVSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixFQUFDO0FBQ25FLFNBQVMsTUFBTTtBQUVmLFVBQVUsV0FBVyxHQUFHLE9BQU8sR0FBRyxLQUFLLFFBQU87QUFDOUMsVUFBVSxRQUFRLEdBQUcsUUFBTztBQUM1QixVQUFVLFNBQVMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxFQUFDO0FBQ3JFLFNBQVM7QUFFVCxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDMUIsVUFBVTtBQUNWLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNoRSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU8sQ0FBQztBQUNSLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBQztBQUV0QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO0FBQ3JCLE1BQU0sT0FBTyxTQUFTO0FBQ3RCLEtBQUssTUFBTTtBQUNYLE1BQU07QUFDTixRQUFRLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQztBQUNsRCxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEQsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQztBQUVELFNBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN4QixFQUFFLElBQUksTUFBTSxHQUFHLE1BQUs7QUFDcEIsRUFBRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN4QixJQUFJLE1BQU0sR0FBRyxDQUFDO0FBQ2QsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNiLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDWixNQUFNLElBQUksRUFBRSxDQUFDO0FBQ2IsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFDO0FBQ25CLEdBQUc7QUFDSCxFQUFFLFNBQVMsT0FBTyxJQUFJO0FBQ3RCLElBQUksT0FBTyxNQUFNLElBQUksQ0FBQztBQUN0QixHQUFHO0FBQ0gsRUFBRSxTQUFTLE1BQU0sSUFBSTtBQUNyQixJQUFJLE9BQU8sTUFBTSxJQUFJLENBQUM7QUFDdEIsR0FBRztBQUNILEVBQUUsU0FBUyxPQUFPLElBQUk7QUFDdEIsSUFBSSxPQUFPLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLEdBQUc7QUFDSCxFQUFFLE9BQU87QUFDVCxJQUFJLE9BQU87QUFDWCxJQUFJLE1BQU07QUFDVixJQUFJLE9BQU87QUFFWCxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDekQsSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksS0FBSyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzFELElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLEtBQUssTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN0RCxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDekQsSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzlDLEdBQUc7QUFDSDs7QUM5TkEsTUFBTSxNQUFNLEdBQUcsU0FBUTtBQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFHO0FBQ2xCLE1BQU0sT0FBTyxHQUFHLEtBQUk7QUFDcEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0FBQ3JDLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRCxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUM7QUFFWixNQUFNLG1CQUFtQixHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBQztBQUMzRCxNQUFNLHNCQUFzQixHQUFHLG1DQUFrQztBQUNqRSxNQUFNLFNBQVMsR0FBRyxpQkFBZ0I7QUFFbEMsV0FBYyxHQUFHO0FBQ2pCLEVBQUUsTUFBTTtBQUNSLEVBQUUsT0FBTztBQUNULEVBQUUsc0JBQXNCO0FBQ3hCLEVBQUUsY0FBYztBQUNoQixFQUFFLGNBQWM7QUFDaEIsRUFBQztBQUVELE1BQU0sUUFBRUEsTUFBSSxnQkFBRUMsY0FBWSxxQkFBRUMsbUJBQWlCLEVBQUUsR0FBR0MsTUFBa0I7QUFFcEUsTUFBTSxZQUFZLEdBQUdGLGNBQVksQ0FBQyxXQUFXLEVBQUM7QUFFOUMsU0FBUyxjQUFjLEVBQUUsZUFBZSxFQUFFO0FBQzFDLEVBQUUsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLGdCQUFnQjtBQUMzQyxJQUFJLEVBQUUsZUFBZSxFQUFFQyxtQkFBaUIsRUFBRTtBQUMxQyxJQUFJLGVBQWU7QUFDbkIsSUFBRztBQUNILEVBQUUsSUFBSSxHQUFHLEVBQUU7QUFDWCxJQUFJLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUN4QixHQUFHO0FBRUgsRUFBRSxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsZUFBZSxFQUFDO0FBQy9DLEVBQUUsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7QUFDdEQsRUFBRSxPQUFPLGNBQWM7QUFDdkIsQ0FBQztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxTQUFTLGNBQWMsRUFBRSxLQUFLLEVBQUU7QUFDaEMsRUFBRSxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsZ0JBQWdCO0FBQzNDLElBQUksRUFBRSxLQUFLLEVBQUVBLG1CQUFpQixFQUFFO0FBQ2hDLElBQUksS0FBSztBQUNULElBQUc7QUFDSCxFQUFFLElBQUksR0FBRyxFQUFFO0FBQ1gsSUFBSSxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFDeEIsR0FBRztBQUVILEVBQUUsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBQztBQUNyQyxFQUFFLE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUM7QUFDN0MsRUFBRSxNQUFNLGFBQWEsR0FBRyxhQUFhO0FBQ3JDLEtBQUssR0FBRyxDQUFDLHdCQUF3QixDQUFDO0FBQ2xDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBQztBQUVaLEVBQUUsTUFBTSxrQkFBa0IsR0FBRyxhQUFhO0FBQzFDLEtBQUssR0FBRyxDQUFDLDZCQUE2QixDQUFDO0FBQ3ZDLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBQztBQUVaLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRTtBQUNuQixFQUFFLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUk7QUFDcEQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFDO0FBQ3pCLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM5QixHQUFHLEVBQUM7QUFFSixFQUFFLE1BQU0sY0FBYyxHQUFHRixNQUFJLENBQUMsU0FBUyxFQUFDO0FBQ3hDLEVBQUUsTUFBTSxjQUFjLEdBQUdBLE1BQUksQ0FBQyxNQUFNLEVBQUM7QUFDckMsRUFBRSxPQUFPO0FBQ1QsSUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRSxJQUFJLE1BQU0sRUFBRSxjQUFjO0FBQzFCLElBQUksTUFBTSxFQUFFLGNBQWM7QUFDMUIsR0FBRztBQUNILENBQUM7QUFFRCxTQUFTLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDOUIsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ25CLEtBQUssSUFBSSxFQUFFO0FBQ1gsS0FBSyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM1RCxLQUFLLElBQUksRUFBRTtBQUNYLENBQUM7QUFFRCxTQUFTLGNBQWMsRUFBRSxRQUFRLEVBQUU7QUFDbkMsRUFBRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFDO0FBQ25DLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRTtBQUVuQixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxLQUFLO0FBQ3hDLElBQUksTUFBTSxhQUFhLEdBQUcsSUFBSTtBQUM5QixPQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQzdCLE9BQU8sT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsRUFBQztBQUUxQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDeEIsTUFBTSxPQUFPLGFBQWE7QUFDMUIsS0FBSztBQUVMLElBQUksSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7QUFDakQsTUFBTSxPQUFPLGFBQWEsR0FBRyxhQUFhO0FBQzFDLEtBQUs7QUFFTCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsRUFBQztBQUM5QyxJQUFJLE9BQU8sRUFBRTtBQUNiLEdBQUcsRUFBRSxFQUFFLEVBQUM7QUFFUixFQUFFLE9BQU8sTUFBTTtBQUNmLENBQUM7QUFFRCxTQUFTLGNBQWMsRUFBRSxLQUFLLEVBQUU7QUFDaEMsRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUVELFNBQVMsd0JBQXdCLEVBQUUsSUFBSSxFQUFFO0FBQ3pDLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRTtBQUVuQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxLQUFLO0FBQzFDLElBQUksSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO0FBQ2xDLE1BQU0sT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLEtBQUs7QUFFTCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUM7QUFDOUMsSUFBSSxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDdEIsR0FBRyxFQUFFLEtBQUssRUFBQztBQUVYLEVBQUUsT0FBTyxNQUFNO0FBQ2YsQ0FBQztBQUVELFNBQVMsNkJBQTZCLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEVBQUU7QUFDaEUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxLQUFLO0FBQy9DLElBQUksR0FBRyxHQUFHO0FBQ1YsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJO0FBQy9CLE1BQU0sT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7QUFDakMsS0FBSyxDQUFDO0FBQ04sR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUNSOztBQ3hKQSxZQUFjLEdBQUc7QUFDakIsRUFBRSxRQUFRO0FBQ1YsRUFBRSxVQUFVO0FBQ1osRUFBQztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBLE1BQU07QUFDTixXQUFFSSxTQUFPO0FBQ1Qsa0JBQUVDLGdCQUFjO0FBQ2hCLGNBQUVDLFlBQVU7QUFDWixVQUFFQyxRQUFNO0FBQ1IsWUFBRUMsVUFBUTtBQUNWLGdCQUFFUCxjQUFZO0FBQ2QsVUFBRVEsUUFBTTtBQUNSLG9CQUFFQyxrQkFBZ0I7QUFDbEIsQ0FBQyxHQUFHUCxNQUFrQjtBQUV0QixNQUFNLGtCQUFFUSxnQkFBYyxXQUFFQyxTQUFPLEVBQUUsR0FBR0MsUUFBb0I7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLFNBQVMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDbEMsRUFBRSxJQUFJLENBQUNMLFVBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN2QixJQUFJLE1BQU0sU0FBUyxDQUFDLG9EQUFvRCxDQUFDO0FBQ3pFLEdBQUc7QUFFSCxFQUFFLE1BQU0sU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUM7QUFDdkMsRUFBRSxJQUFJLENBQUNELFFBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUN4QixJQUFJLE1BQU0sU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzlFLEdBQUc7QUFFSCxFQUFFLE1BQU07QUFDUixJQUFJLEtBQUssR0FBRyxTQUFTO0FBQ3JCLElBQUksUUFBUSxHQUFHLENBQUM7QUFDaEIsSUFBSSxZQUFZLEdBQUcsQ0FBQztBQUNwQixHQUFHLEdBQUcsT0FBTyxJQUFJLEdBQUU7QUFFbkIsRUFBRSxNQUFNLFlBQVksR0FBR04sY0FBWSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFDcEQsRUFBRSxNQUFNLE9BQU8sR0FBR1EsUUFBTSxDQUFDLFFBQVEsRUFBQztBQUNsQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxRQUFPO0FBRTdCLEVBQUUsTUFBTTtBQUNSLElBQUksTUFBTSxHQUFHLEVBQUU7QUFDZixJQUFJLE1BQU0sR0FBRyxFQUFFO0FBQ2YsR0FBRyxHQUFHLEtBQUssR0FBR0UsZ0JBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFPO0FBRTdDLEVBQUUsTUFBTSxFQUFFLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxRQUFPO0FBQ3pDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDakMsSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRSxHQUFHO0FBRUgsRUFBRSxJQUFJLFlBQVksR0FBRyxFQUFDO0FBQ3RCLEVBQUUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUM7QUFDaEMsRUFBRSxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBQztBQUNyRCxFQUFFLE1BQU1HLFFBQU0sR0FBR1QsZ0JBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJVSxNQUFZLEdBQUU7QUFFckYsRUFBRSxNQUFNLGNBQWMsR0FBRyxJQUFJQSxNQUFZLEdBQUU7QUFDM0MsRUFBRSxNQUFNLGVBQWUsR0FBRztBQUMxQixJQUFJLFdBQVcsRUFBRSxxQkFBcUI7QUFDdEMsSUFBSSxVQUFVLEVBQUUsb0JBQW9CO0FBQ3BDLElBQUc7QUFFSCxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxFQUFFO0FBQ2xELElBQUksT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsRCxHQUFHO0FBRUgsRUFBRSxTQUFTLGVBQWUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0FBQzNDLElBQUksY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFDO0FBQzdDLElBQUksT0FBTyxZQUFZO0FBQ3ZCLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFDO0FBQ2xELEtBQUs7QUFDTCxHQUFHO0FBRUgsRUFBRSxNQUFNLGFBQWEsR0FBR0wsa0JBQWdCO0FBQ3hDLElBQUksSUFBSTtBQUNSLElBQUksUUFBUTtBQUNaLElBQUksMkNBQTJDO0FBQy9DLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNmLElBQUc7QUFDSCxFQUFFLE1BQU0sYUFBYSxHQUFHQSxrQkFBZ0I7QUFDeEMsSUFBSSxJQUFJO0FBQ1IsSUFBSSxhQUFhO0FBQ2pCLElBQUkseUNBQXlDO0FBQzdDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNmLElBQUc7QUFDSCxFQUFFLE1BQU0sYUFBYSxHQUFHQSxrQkFBZ0I7QUFDeEMsSUFBSSxJQUFJO0FBQ1IsSUFBSSxRQUFRO0FBQ1osSUFBSSxvQ0FBb0M7QUFDeEMsSUFBRztBQUdILEVBQUUsU0FBUyxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMxQyxJQUFJLE1BQU0sY0FBYztBQUN4QixNQUFNSixZQUFVLENBQUMsT0FBTyxDQUFDO0FBQ3pCLFVBQVUsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDL0MsVUFBVUMsUUFBTSxDQUFDLE9BQU8sQ0FBQztBQUN6QixZQUFZLE9BQU87QUFDbkIsWUFBWSxLQUFJO0FBRWhCLElBQUksSUFBSSxDQUFDQSxRQUFNLENBQUMsY0FBYyxDQUFDLEVBQUU7QUFDakMsTUFBTSxNQUFNLFNBQVM7QUFDckIsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyw0REFBNEQsQ0FBQztBQUNqRyxPQUFPO0FBQ1AsS0FBSztBQUVMLElBQUksTUFBTSxNQUFNLEdBQUcsR0FBRTtBQUNyQixJQUFJLE1BQU0sV0FBVyxHQUFHLEdBQUU7QUFFMUIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUNsQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxLQUFLO0FBRWpELFFBQVEsSUFBSUQsWUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ3hDLFVBQVUsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUM7QUFDbEUsU0FBUyxNQUFNLElBQUksQ0FBQ0MsUUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQzVDLFVBQVUsTUFBTTtBQUNoQixTQUFTO0FBR1QsUUFBUSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsZUFBYztBQUN2RCxRQUFRLElBQUlDLFVBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSUosU0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzNDLFVBQVUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUU7QUFDekMsVUFBVSxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSTtBQUMxQyxZQUFZLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRTtBQUN2RCxZQUFZLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFDO0FBQ2pFLFdBQVcsRUFBQztBQUNaLFNBQVMsTUFBTSxJQUFJRSxZQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFJdEMsVUFBVSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBQztBQUNsRSxTQUFTO0FBQ1QsT0FBTyxFQUFDO0FBRVIsSUFBSSxNQUFNLFNBQVMsR0FBRyxHQUFFO0FBQ3hCLElBQUksTUFBTSxTQUFTLEdBQUcsR0FBRTtBQUd4QixJQUFJLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDbkQsT0FBTyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUs7QUFDOUMsUUFBUSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFDO0FBQy9FLFFBQVEsSUFBSSxPQUFPLEVBQUUsRUFBRTtBQUN2QixVQUFVLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUM7QUFDbkMsVUFBVSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFDO0FBQ25DLFNBQVM7QUFDVCxRQUFRLE9BQU87QUFDZixVQUFVLEdBQUcsR0FBRztBQUNoQixVQUFVLENBQUMsU0FBUyxHQUFHLE9BQU87QUFDOUIsU0FBUztBQUNULE9BQU8sRUFBRSxFQUFFLEVBQUM7QUFFWixJQUFJLE1BQU0sYUFBYSxHQUFHLEdBQUU7QUFHNUIsSUFBSSxhQUFhLENBQUMsSUFBSTtBQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztBQUN6QyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztBQUNsQyxVQUFVO0FBQ1YsWUFBWSxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztBQUM3QyxZQUFZLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLElBQUksS0FBSztBQUM1QyxjQUFjLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxJQUFJO0FBQ2xELGdCQUFnQixDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSztBQUNwRCxrQkFBa0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNO0FBQzFELG9CQUFvQixLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFDO0FBQzNDLG9CQUFvQixJQUFJQSxZQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDNUMsc0JBQXNCLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBQztBQUNyQyxxQkFBcUI7QUFDckIsb0JBQW9CLE9BQU8sSUFBSTtBQUMvQixtQkFBbUIsRUFBQztBQUNwQixrQkFBa0IsT0FBTyxDQUFDLENBQUMsTUFBTTtBQUNqQyxpQkFBaUIsRUFBQztBQUVsQixjQUFjLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDcEMsZ0JBQWdCLGNBQWMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUNuRSxlQUFlO0FBQ2YsYUFBYSxDQUFDO0FBQ2QsV0FBVztBQUNYLFNBQVMsQ0FBQyxJQUFJLEVBQUU7QUFDaEIsTUFBSztBQUdMLElBQUksTUFBTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFDO0FBRXBFLElBQUksSUFBSSxPQUFPLEVBQUUsRUFBRTtBQUNuQixNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUM7QUFDakQsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFDO0FBQ2pELEtBQUs7QUFFTCxJQUFJLGFBQWEsQ0FBQyxJQUFJO0FBQ3RCLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSTtBQUNyRCxRQUFRLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLFdBQVU7QUFDekQsUUFBUSxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBQztBQUNoRCxRQUFRLE9BQU87QUFDZixVQUFVLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3ZDLFVBQVUsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7QUFDeEMsU0FBUztBQUNULE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRTtBQUNmLE1BQUs7QUFHTCxJQUFJLElBQUksT0FBTyxFQUFFLEVBQUU7QUFDbkIsTUFBTSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUM7QUFDOUUsTUFBTSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUM7QUFDOUUsTUFBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7QUFDaEMsUUFBUSxPQUFPLENBQUMsSUFBSTtBQUNwQixVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLCtCQUErQixDQUFDO0FBQ3RFLFVBQVUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNqRSxVQUFTO0FBQ1QsT0FBTztBQUNQLE1BQU0sSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsT0FBTyxDQUFDLElBQUk7QUFDcEIsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQztBQUMzRSxVQUFVLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDakUsVUFBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBRUwsSUFBSSxPQUFPLE1BQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7QUFDbEQsR0FBRztBQUVILEVBQUUsU0FBUyxhQUFhLElBQUk7QUFDNUIsSUFBSSxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNoRCxHQUFHO0FBRUgsRUFBRSxTQUFTLFlBQVksSUFBSTtBQUMzQixJQUFJLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELEdBQUc7QUFFSCxFQUFFLFNBQVMsZUFBZSxFQUFFLEdBQUcsTUFBTSxFQUFFO0FBQ3ZDLElBQUksTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRTtBQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRUUsVUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQ25GLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUMxQixLQUFLO0FBRUwsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUM1QixNQUFNLE9BQU8sS0FBSztBQUNsQixLQUFLO0FBRUwsSUFBSSxNQUFNLFVBQVUsR0FBRyx1QkFBdUIsR0FBRTtBQUNoRCxJQUFJLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRSxHQUFHO0FBRUgsRUFBRSxTQUFTLHVCQUF1QixFQUFFLEtBQUssRUFBRTtBQUMzQyxJQUFJLE1BQU0sTUFBTSxHQUFHLEtBQUssS0FBSyxTQUFTO0FBQ3RDLFFBQVEsS0FBSztBQUNiLFFBQVEsWUFBWSxHQUFFO0FBRXRCLElBQUksTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLHlCQUF5QixFQUFFLEVBQUUsS0FBSyxFQUFFQSxVQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUM7QUFDcEYsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDO0FBQzFCLEtBQUs7QUFFTCxJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEtBQUs7QUFDekMsTUFBTSxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUNJLFNBQU8sQ0FBQztBQUN2RCxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxFQUFDO0FBRW5DLE1BQU0sSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO0FBQ2hDLFFBQVEsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLE9BQU8sQ0FBQztBQUNoQyxPQUFPO0FBQ1AsTUFBTSxPQUFPLEdBQUc7QUFDaEIsS0FBSyxFQUFFLEVBQUUsQ0FBQztBQUNWLEdBQUc7QUFFSCxFQUFFLFNBQVMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUU7QUFDL0MsSUFBSSxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFSixVQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUM7QUFDbkUsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDO0FBQzFCLEtBQUs7QUFFTCxJQUFJLE1BQU0sZ0JBQWdCLEdBQUcsWUFBWSxFQUFFLEtBQUssTUFBSztBQUVyRCxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtBQUMvQixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUM3QixRQUFRLE9BQU8sSUFBSTtBQUNuQixPQUFPO0FBQ1AsTUFBTSxJQUFJRixZQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDL0IsUUFBUSxPQUFPLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNqQyxPQUFPO0FBQ1AsTUFBTSxPQUFPLE9BQU87QUFDcEIsS0FBSztBQUVMLElBQUksT0FBTyxnQkFBZ0I7QUFDM0IsR0FBRztBQUVILEVBQUUsU0FBUyxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxFQUFFO0FBQ3JDLElBQUksTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRUUsVUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFDO0FBQ3hFLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUMxQixLQUFLO0FBRUwsSUFBSSxPQUFPTSxRQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQztBQUMxQyxHQUFHO0FBRUgsRUFBRSxTQUFTLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLEVBQUU7QUFDbEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFTixVQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUM7QUFDakUsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDO0FBQzFCLEtBQUs7QUFFTCxJQUFJLE1BQU0sT0FBTyxHQUFHLFlBQVksR0FBRTtBQUNsQyxJQUFJLE1BQU0sT0FBTyxHQUFHLE1BQUs7QUFFekIsSUFBSSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7QUFDN0IsTUFBTSxjQUFjLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFDdEQsTUFBTSxPQUFPLEtBQUs7QUFDbEIsS0FBSztBQUVMLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDbkMsTUFBTSxjQUFjLENBQUMsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUM7QUFDakUsTUFBTSxPQUFPLEtBQUs7QUFDbEIsS0FBSztBQUVMLElBQUksTUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUM7QUFDOUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUNyQyxNQUFNLGNBQWMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO0FBQ3hFLE1BQU0sT0FBTyxLQUFLO0FBQ2xCLEtBQUs7QUFHTCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxZQUFZLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUM7QUFFdEUsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQztBQUM5QixJQUFJLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsRUFBRTtBQUNqRCxNQUFNLFlBQVksQ0FBQyxLQUFLLEdBQUU7QUFDMUIsS0FBSztBQUVMLElBQUksaUJBQWlCLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFDO0FBQzdFLElBQUksaUJBQWlCLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxFQUFDO0FBQ3pDLElBQUksaUJBQWlCLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFDO0FBRTVFLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUVILEVBQUUsU0FBUyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtBQUNuQyxJQUFJLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUVBLFVBQVEsRUFBRSxFQUFFLEVBQUVGLFlBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUM7QUFDL0YsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDO0FBQzFCLEtBQUs7QUFFTCxJQUFJUSxRQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUM7QUFDckMsSUFBSSxPQUFPLE1BQU1BLFFBQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztBQUNyRCxHQUFHO0FBRUgsRUFBRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztBQUNwRCxLQUFLLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxVQUFVLEtBQUs7QUFDakMsTUFBTSxPQUFPO0FBQ2IsUUFBUSxHQUFHLEdBQUc7QUFDZCxRQUFRLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQ3BDLFVBQVUsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRVIsWUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFDO0FBQ3RFLFVBQVUsSUFBSSxHQUFHLEVBQUU7QUFDbkIsWUFBWSxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFDaEMsV0FBVztBQUVYLFVBQVUsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBQztBQUN0RixVQUFVLE1BQU0sV0FBVyxHQUFHLGVBQWU7QUFDN0MsWUFBWSxlQUFlLENBQUMsVUFBVSxDQUFDO0FBQ3ZDLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxLQUFLO0FBQzdDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLEVBQUM7QUFDN0MsYUFBYTtBQUNiLFlBQVc7QUFDWCxVQUFVLE9BQU8sTUFBTTtBQUN2QixZQUFZLFdBQVcsR0FBRTtBQUN6QixZQUFZLGdCQUFnQixHQUFFO0FBQzlCLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFFVixFQUFFLE1BQU0sZ0JBQWdCLEdBQUc7QUFDM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUM7QUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUM7QUFDL0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7QUFDNUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7QUFDN0IsR0FBRztBQUNILEtBQUssTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssS0FBSztBQUM1QixNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEdBQUcsTUFBSztBQUN4QyxNQUFNLE1BQU0sVUFBVSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFDO0FBQ3BDLE1BQU0sTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRTtBQUMxQyxNQUFNLE9BQU87QUFDYixRQUFRLEdBQUcsR0FBRztBQUNkLFFBQVEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxLQUFLLEVBQUUsRUFBRSxFQUFFO0FBQzNDLFVBQVUsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRUUsVUFBUSxFQUFFLEVBQUUsRUFBRUYsWUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztBQUM5RixVQUFVLElBQUksR0FBRyxFQUFFO0FBQ25CLFlBQVksTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDO0FBQ2hDLFdBQVc7QUFFWCxVQUFVLE1BQU0saUJBQWlCLEdBQUc7QUFDcEMsWUFBWSxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUN6QyxZQUFZLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUMzRCxZQUFXO0FBQ1gsVUFBVSxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxLQUFLO0FBQzNGLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1QyxjQUFjLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUN2QyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksRUFBQztBQUNwQyxlQUFlO0FBQ2YsYUFBYSxNQUFNO0FBQ25CLGNBQWMsSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFO0FBQ3JDLGdCQUFnQixFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxFQUFDO0FBQ3RDLGVBQWU7QUFDZixhQUFhO0FBQ2IsV0FBVyxFQUFDO0FBQ1osVUFBVSxPQUFPLE1BQU07QUFDdkIsWUFBWSxXQUFXLEdBQUU7QUFDekIsWUFBWSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0FBQzdDLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFFVixFQUFFLFNBQVMsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLFdBQVcsRUFBRTtBQUM1QyxJQUFJLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUVFLFVBQVEsRUFBRSxFQUFFLFNBQVMsRUFBQztBQUN4RSxJQUFJLElBQUksR0FBRyxFQUFFO0FBQ2IsTUFBTSxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFDMUIsS0FBSztBQUVMLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDckUsR0FBRztBQUVILEVBQUUsU0FBUyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsV0FBVyxFQUFFO0FBQ3pDLElBQUksTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRUEsVUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFDO0FBQ2pFLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUMxQixLQUFLO0FBRUwsSUFBSSxPQUFPLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNsRSxHQUFHO0FBRUgsRUFBRSxTQUFTLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsYUFBYSxFQUFFO0FBQ3RELElBQUksTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRUEsVUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFDO0FBQ25FLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUMxQixLQUFLO0FBRUwsSUFBSSxPQUFPLENBQUMsR0FBRyxNQUFNO0FBQ3JCLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsYUFBYSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDL0QsR0FBRztBQUVILEVBQUUsU0FBUyxLQUFLLElBQUk7QUFDcEIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsc0JBQXNCLENBQUMsRUFBQztBQUV0RCxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBQztBQUMzQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDO0FBQzlCLEdBQUc7QUFFSCxFQUFFLFNBQVMsY0FBYyxFQUFFLE9BQU8sRUFBRTtBQUNwQyxJQUFJLE1BQU0sU0FBUyxHQUFHLGFBQWEsR0FBRTtBQUNyQyxJQUFJLE1BQU0sT0FBTyxHQUFHLFlBQVksR0FBRTtBQUNsQyxJQUFJLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEtBQUssU0FBUyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFDO0FBRTFGLElBQUksTUFBTSxlQUFlLEdBQUcsdUJBQXVCLEdBQUU7QUFDckQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUNqQyxNQUFNLE9BQU8sQ0FBQyxJQUFJO0FBQ2xCLFFBQVEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUNwQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUNyRCxVQUFVLENBQUMsd0NBQXdDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMvRCxRQUFPO0FBQ1AsS0FBSyxNQUFNO0FBQ1gsTUFBTSxPQUFPLENBQUMsSUFBSTtBQUNsQixRQUFRLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDcEMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFDckQsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsZUFBZTtBQUN0RSxhQUFhLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixRQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFFSCxFQUFFLFNBQVMsT0FBTyxJQUFJO0FBQ3RCLElBQUksT0FBTztBQUNYLE1BQU0sTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUU7QUFDbEMsTUFBTSxXQUFXLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRTtBQUN2QyxNQUFNLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ2xDLEtBQUs7QUFDTCxHQUFHO0FBRUgsRUFBRSxTQUFTLElBQUksSUFBSTtBQUNuQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFDO0FBRXJFLElBQUksaUJBQWlCLENBQUMsYUFBYSxFQUFDO0FBQ3BDLElBQUksaUJBQWlCLENBQUMsYUFBYSxFQUFDO0FBQ3BDLElBQUksaUJBQWlCLENBQUMsYUFBYSxFQUFDO0FBQ3BDLEdBQUc7QUFFSCxFQUFFLFNBQVMsaUJBQWlCLEVBQUUsVUFBVSxFQUFFO0FBQzFDLElBQUksTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUMsT0FBTyxHQUFFO0FBQ3ZELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUM7QUFDNUIsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDdEIsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQztBQUMxQixLQUFLLE1BQU07QUFDWCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUM7QUFDdkMsS0FBSztBQUNMLEdBQUc7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsRUFBRSxPQUFPO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksWUFBWSxFQUFFLENBQUM7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGVBQWUsRUFBRSxlQUFlO0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksWUFBWSxFQUFFLFlBQVk7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksRUFBRSxJQUFJO0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEVBQUUsSUFBSTtBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksS0FBSyxFQUFFLEtBQUs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksS0FBSyxFQUFFLEtBQUs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FBQztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEVBQUUsTUFBTSxJQUFJLEVBQUU7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRTtBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLEVBQUUsT0FBTztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxFQUFFLE1BQU0sSUFBSTtBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksU0FBUyxFQUFFLGdCQUFnQixDQUFDLFNBQVM7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxFQUFFLGdCQUFnQixDQUFDLFFBQVE7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFVBQVUsRUFBRSxhQUFhLENBQUMsVUFBVTtBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVc7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEVBQUUsV0FBVyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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
