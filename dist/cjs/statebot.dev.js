
/*
 * Statebot
 * v2.2.1
 * https://shuckster.github.io/statebot/
 * License: ISC
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
const rxLineContinations = new RegExp(`(${rxOperators})$`);
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
    if (rxLineContinations.test(sanitisedLine)) {
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
 * <script src="https://unpkg.com/statebot@2.2.1/dist/browser/statebot.min.js"></script>
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
 * | {@link #statebotfsmperformtransitions .performTransitions()} / {@link #statebotfsmonevent .onEvent()} | {@link #statebotfsmcantransitionto .canTransitionTo()} / {@link #statebotfsmstatesavailablefromhere .statesAvailableFromHere()} | {@link #statebotfsmemit .emit()} / {@link #emit-eventname .Emit()} |
 * | {@link #statebotfsmontransitions .onTransitions()} | {@link #statebotfsmcurrentstate .currentState()} / {@link #statebotfsmpreviousstate .previousState()} / {@link #statebotfsmhistory .history()} | {@link #statebotfsmenter .enter()} / {@link #enter-state .Enter()} |
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
var src_1 = src.Statebot;
var src_2 = src.isStatebot;
var src_3 = src.routeIsPossible;
var src_4 = src.assertRoute;
var src_5 = src.decomposeChart;

exports.Statebot = src_1;
exports.assertRoute = src_4;
exports.decomposeChart = src_5;
exports.default = src;
exports.isStatebot = src_2;
exports.routeIsPossible = src_3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVib3QuZGV2LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMuanMiLCIuLi8uLi9zcmMvcGFyc2luZy5qcyIsIi4uLy4uL3NyYy9zdGF0ZWJvdC5qcyIsIi4uLy4uL3NyYy9hc3NlcnRpb25zLmpzIiwiLi4vLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLy9cbi8vIFNUQVRFQk9UIFVUSUxTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheSxcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzRnVuY3Rpb24sXG4gIGlzUG9qbyxcbiAgaXNTdHJpbmcsXG4gIGlzVGVtcGxhdGVMaXRlcmFsLFxuICB1bmlxLFxuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBSZWZlcmVuY2VDb3VudGVyLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlclxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChvYmopIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKVxufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbidcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZydcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNFdmVudEVtaXR0ZXIgKG9iaikge1xuICByZXR1cm4gKFxuICAgIGlzT2JqZWN0KG9iaikgJiZcbiAgICBpc0Z1bmN0aW9uKG9iai5lbWl0KSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLmFkZExpc3RlbmVyKSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLnJlbW92ZUxpc3RlbmVyKVxuICApXG59XG5cbmZ1bmN0aW9uIGlzUG9qbyAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgKCFpc09iamVjdChvYmopKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZVxufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTGl0ZXJhbCAob2JqKSB7XG4gIGlmIChpc1N0cmluZyhvYmopKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5ldmVyeShpdGVtID0+IGlzU3RyaW5nKGl0ZW0pKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiB1bmlxIChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIG9uZSkgPT4gKGFjYy5pbmRleE9mKG9uZSkgPT09IC0xID8gWy4uLmFjYywgb25lXSA6IGFjYyksIFtdKVxufVxuXG5mdW5jdGlvbiBkZWZlciAoZm4sIC4uLmFyZ3MpIHtcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCAwLCAuLi5hcmdzKVxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuZnVuY3Rpb24gRGVmZXIgKGZuKSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4gZGVmZXIoZm4sIC4uLmFyZ3MpXG59XG5cbmZ1bmN0aW9uIE9uY2UgKGZuKSB7XG4gIGNvbnN0IHsgcmV2b2tlLCBmbjogX2ZuIH0gPSBSZXZva2FibGUoZm4pXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgcmVzdWx0ID0gX2ZuKC4uLmFyZ3MpXG4gICAgcmV2b2tlKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZnVuY3Rpb24gUmV2b2thYmxlIChmbikge1xuICBsZXQgcmV2b2tlZCA9IGZhbHNlXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIHtcbiAgICBmbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICghcmV2b2tlZCkge1xuICAgICAgICByZXN1bHQgPSBmbiguLi5hcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgcmV2b2tlOiAoKSA9PiB7XG4gICAgICByZXZva2VkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBSZWZlcmVuY2VDb3VudGVyIChuYW1lLCBraW5kLCBkZXNjcmlwdGlvbiwgLi4uZXhwZWN0aW5nKSB7XG4gIGNvbnN0IF9yZWZzID0ge307XG4gIFsuLi5leHBlY3RpbmddLmZsYXQoKS5mb3JFYWNoKHJlZiA9PiB7XG4gICAgX3JlZnNbcmVmXSA9IDBcbiAgfSlcbiAgZnVuY3Rpb24gaW5jcmVhc2UgKHJlZikge1xuICAgIF9yZWZzW3JlZl0gPSBjb3VudE9mKHJlZikgKyAxXG4gICAgcmV0dXJuICgpID0+IGRlY3JlYXNlKHJlZilcbiAgfVxuICBmdW5jdGlvbiBkZWNyZWFzZSAocmVmKSB7XG4gICAgY29uc3QgY291bnQgPSBjb3VudE9mKHJlZikgLSAxXG4gICAgX3JlZnNbcmVmXSA9IE1hdGgubWF4KGNvdW50LCAwKVxuICB9XG4gIGZ1bmN0aW9uIGNvdW50T2YgKHJlZikge1xuICAgIHJldHVybiBfcmVmc1tyZWZdIHx8IDBcbiAgfVxuICBmdW5jdGlvbiByZWZzICgpIHtcbiAgICByZXR1cm4geyAuLi5fcmVmcyB9XG4gIH1cbiAgZnVuY3Rpb24gdGFibGUgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhfcmVmcykuc29ydCgpXG4gICAgICAubWFwKGtleSA9PiBba2V5LCBfcmVmc1trZXldXSlcbiAgICAgIC5tYXAoKFtyZWYsIGNvdW50XSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFtraW5kXTogcmVmLFxuICAgICAgICAgIHJlZnM6IGNvdW50IHx8ICdOb25lJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHRvVmFsdWUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNjcmlwdGlvbjogYFN0YXRlYm90WyR7bmFtZX1dOiAke2Rlc2NyaXB0aW9ufTpgLFxuICAgICAgdGFibGU6IHRhYmxlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpbmNyZWFzZTogaW5jcmVhc2UsXG4gICAgZGVjcmVhc2U6IGRlY3JlYXNlLFxuICAgIGNvdW50T2Y6IGNvdW50T2YsXG4gICAgdG9WYWx1ZTogdG9WYWx1ZSxcbiAgICByZWZzOiByZWZzXG4gIH1cbn1cblxuZnVuY3Rpb24gQXJnVHlwZUVycm9yIChlcnJQcmVmaXggPSAnJykge1xuICByZXR1cm4gZnVuY3Rpb24gKGZuTmFtZSwgdHlwZU1hcCwgLi4uYXJncykge1xuICAgIGNvbnN0IGFyZ01hcCA9IE9iamVjdC5lbnRyaWVzKHR5cGVNYXApXG4gICAgICAubWFwKChbYXJnTmFtZSwgYXJnVHlwZV0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgYXJnTmFtZSwgYXJnVHlwZSB9XG4gICAgICB9KVxuXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gT2JqZWN0LmtleXModHlwZU1hcCkuam9pbignLCAnKVxuXG4gICAgY29uc3QgZXJyID0gYXJnc1xuICAgICAgLm1hcCgoYXJnLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IGFyZ05hbWUsIGFyZ1R5cGUgfSA9IGFyZ01hcFtpbmRleF1cbiAgICAgICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGBBcmd1bWVudCB1bmRlZmluZWQ6IFwiJHthcmdOYW1lfVwiYFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yRGVzY1xuICAgICAgICBsZXQgdHlwZU5hbWVcbiAgICAgICAgbGV0IHR5cGVNYXRjaGVzXG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oYXJnVHlwZSkpIHtcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IGFyZ1R5cGUoYXJnKSA9PT0gdHJ1ZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZS5uYW1lXG4gICAgICAgICAgZXJyb3JEZXNjID0gYCR7dHlwZU5hbWV9KCR7YXJnTmFtZX0pIGRpZCBub3QgcmV0dXJuIHRydWVgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuICAgICAgICAgIHR5cGVNYXRjaGVzID0gdHlwZW9mIGFyZyA9PT0gYXJnVHlwZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGBBcmd1bWVudCBcIiR7YXJnTmFtZX1cIiBzaG91bGQgYmUgYSAke3R5cGVOYW1lfWBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHlwZU1hdGNoZXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYCR7ZXJyb3JEZXNjfTogJHthcmdOYW1lfSA9PT0gJHt0eXBlb2YgYXJnfSgke2FyZ30pYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcblxuICAgIGlmICghZXJyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgXFxuJHtlcnJQcmVmaXh9JHtmbk5hbWV9KCR7c2lnbmF0dXJlfSk6XFxuYCArXG4gICAgICAgIGAke2Vyci5tYXAoZXJyID0+IGA+ICR7ZXJyfWApLmpvaW4oJ1xcbicpfWBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gTG9nZ2VyIChsZXZlbCkge1xuICBsZXQgX2xldmVsID0gbGV2ZWxcbiAgaWYgKGlzU3RyaW5nKF9sZXZlbCkpIHtcbiAgICBfbGV2ZWwgPSAoe1xuICAgICAgaW5mbzogMyxcbiAgICAgIGxvZzogMixcbiAgICAgIHdhcm46IDEsXG4gICAgICBub25lOiAwXG4gICAgfSlbX2xldmVsXSB8fCAzXG4gIH1cbiAgZnVuY3Rpb24gY2FuV2FybiAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAxXG4gIH1cbiAgZnVuY3Rpb24gY2FuTG9nICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDJcbiAgfVxuICBmdW5jdGlvbiBjYW5JbmZvICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDNcbiAgfVxuICByZXR1cm4ge1xuICAgIGNhbldhcm4sXG4gICAgY2FuTG9nLFxuICAgIGNhbkluZm8sXG5cbiAgICBpbmZvOiAoLi4uYXJncykgPT4gY2FuSW5mbygpICYmIGNvbnNvbGUuaW5mbyguLi5hcmdzKSxcbiAgICB0YWJsZTogKC4uLmFyZ3MpID0+IGNhbkxvZygpICYmIGNvbnNvbGUudGFibGUoLi4uYXJncyksXG4gICAgbG9nOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS5sb2coLi4uYXJncyksXG4gICAgd2FybjogKC4uLmFyZ3MpID0+IGNhbldhcm4oKSAmJiBjb25zb2xlLndhcm4oLi4uYXJncyksXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiBjb25zb2xlLmVycm9yKC4uLmFyZ3MpXG4gIH1cbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIENIQVJUL1JPVVRFIFBBUlNJTkdcbi8vXG5cbmNvbnN0IHJ4Q1JMRiA9IC9bXFxyXFxuXS9cbmNvbnN0IGN4UGlwZSA9ICd8J1xuY29uc3QgY3hBcnJvdyA9ICctPidcbmNvbnN0IHJ4T3BlcmF0b3JzID0gW2N4UGlwZSwgY3hBcnJvd11cbiAgLm1hcChyeFVuc2FmZSA9PiByeFVuc2FmZS5yZXBsYWNlKCd8JywgJ1xcXFx8JykpXG4gIC5qb2luKCd8JylcblxuY29uc3QgcnhMaW5lQ29udGluYXRpb25zID0gbmV3IFJlZ0V4cChgKCR7cnhPcGVyYXRvcnN9KSRgKVxuY29uc3QgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyA9IC9bXmEtejAtOSFAIyQlXiYqOl8rPTw+fH4uXFx4MkRdL2dpXG5jb25zdCByeENvbW1lbnQgPSAvKFxcL1xcL1teXFxuXFxyXSopL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3hQaXBlLFxuICBjeEFycm93LFxuICByeERpc2FsbG93ZWRDaGFyYWN0ZXJzLFxuICBkZWNvbXBvc2VDaGFydCxcbiAgZGVjb21wb3NlUm91dGVcbn1cblxuY29uc3QgeyB1bmlxLCBBcmdUeXBlRXJyb3IsIGlzVGVtcGxhdGVMaXRlcmFsIH0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VSb3V0ZSAodGVtcGxhdGVMaXRlcmFsKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZGVjb21wb3NlUm91dGUnLFxuICAgIHsgdGVtcGxhdGVMaXRlcmFsOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIHRlbXBsYXRlTGl0ZXJhbFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZWRMaW5lcyh0ZW1wbGF0ZUxpdGVyYWwpXG4gIGNvbnN0IGZsYXR0ZW5lZFJvdXRlID0gdG9rZW5pc2VkTGluZXMobGluZXMpLmZsYXQoMilcbiAgcmV0dXJuIGZsYXR0ZW5lZFJvdXRlXG59XG5cbi8qKlxuICogRGVjb21wb3NlIGEge0BsaW5rIHN0YXRlYm90Q2hhcnR9IGludG8gYW4gb2JqZWN0IG9mIGBzdGF0ZXNgLCBgcm91dGVzYCxcbiAqIGFuZCBgdHJhbnNpdGlvbnNgLlxuICpcbiAqIFN0YXRlYm90KCkgdXNlcyB0aGlzIGludGVybmFsbHkgdG8gcGFyc2UgY2hhcnRzLiBFeHBvc2VkIGZvciBkZWJ1Z2dpbmcuXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnRgXG4gKiAgIHBlbmRpbmcgLT5cbiAqICAgICBzdWNjZXNzIHwgZmFpbHVyZVxuICogYFxuICogLy8gc3RhdGVzID0gWydwZW5kaW5nJywgJ3N1Y2Nlc3MnLCAnZmFpbHVyZSddXG4gKiAvLyByb3V0ZXMgPSBbICdwZW5kaW5nLT5zdWNjZXNzJywgJ3BlbmRpbmctPmZhaWx1cmUnXVxuICogLy8gdHJhbnNpdGlvbnMgPSBbXG4gKiAvLyAgIFsncGVuZGluZycsICdzdWNjZXNzJ10sXG4gKiAvLyAgIFsncGVuZGluZycsICdmYWlsdXJlJ11cbiAqIC8vIF1cbiAqL1xuXG5mdW5jdGlvbiBkZWNvbXBvc2VDaGFydCAoY2hhcnQpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VDaGFydCcsXG4gICAgeyBjaGFydDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBjaGFydFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZWRMaW5lcyhjaGFydClcbiAgY29uc3QgbGluZXNPZlRva2VucyA9IHRva2VuaXNlZExpbmVzKGxpbmVzKVxuICBjb25zdCBsaW5lc09mUm91dGVzID0gbGluZXNPZlRva2Vuc1xuICAgIC5tYXAoZGVjb21wb3NlUm91dGVGcm9tVG9rZW5zKVxuICAgIC5mbGF0KDEpXG5cbiAgY29uc3QgbGluZXNPZlRyYW5zaXRpb25zID0gbGluZXNPZlJvdXRlc1xuICAgIC5tYXAoZGVjb21wb3NlVHJhbnNpdGlvbnNGcm9tUm91dGUpXG4gICAgLmZsYXQoMSlcblxuICBjb25zdCBzdGF0ZXMgPSBbXVxuICBjb25zdCByb3V0ZUtleXMgPSBsaW5lc09mVHJhbnNpdGlvbnMubWFwKHJvdXRlID0+IHtcbiAgICBzdGF0ZXMucHVzaCguLi5yb3V0ZSlcbiAgICByZXR1cm4gcm91dGUuam9pbihjeEFycm93KVxuICB9KVxuXG4gIGNvbnN0IGZpbHRlcmVkUm91dGVzID0gdW5pcShyb3V0ZUtleXMpXG4gIGNvbnN0IGZpbHRlcmVkU3RhdGVzID0gdW5pcShzdGF0ZXMpXG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvbnM6IGZpbHRlcmVkUm91dGVzLm1hcChyb3V0ZSA9PiByb3V0ZS5zcGxpdChjeEFycm93KSksXG4gICAgcm91dGVzOiBmaWx0ZXJlZFJvdXRlcyxcbiAgICBzdGF0ZXM6IGZpbHRlcmVkU3RhdGVzXG4gIH1cbn1cblxuZnVuY3Rpb24gbGluZXNGcm9tIChzdHJPckFycikge1xuICByZXR1cm4gW3N0ck9yQXJyXVxuICAgIC5mbGF0KClcbiAgICAucmVkdWNlKChhY2MsIGxpbmUpID0+IFsuLi5hY2MsIGxpbmUuc3BsaXQocnhDUkxGKV0sIFtdKVxuICAgIC5mbGF0KClcbn1cblxuZnVuY3Rpb24gY29uZGVuc2VkTGluZXMgKHN0ck9yQXJyKSB7XG4gIGNvbnN0IGlucHV0ID0gbGluZXNGcm9tKHN0ck9yQXJyKVxuICBjb25zdCBvdXRwdXQgPSBbXVxuXG4gIGlucHV0LnJlZHVjZSgoY29uZGVuc2VkTGluZSwgbGluZSkgPT4ge1xuICAgIGNvbnN0IHNhbml0aXNlZExpbmUgPSBsaW5lXG4gICAgICAucmVwbGFjZShyeENvbW1lbnQsICcnKVxuICAgICAgLnJlcGxhY2UocnhEaXNhbGxvd2VkQ2hhcmFjdGVycywgJycpXG5cbiAgICBpZiAoIXNhbml0aXNlZExpbmUpIHtcbiAgICAgIHJldHVybiBjb25kZW5zZWRMaW5lXG4gICAgfVxuXG4gICAgaWYgKHJ4TGluZUNvbnRpbmF0aW9ucy50ZXN0KHNhbml0aXNlZExpbmUpKSB7XG4gICAgICByZXR1cm4gY29uZGVuc2VkTGluZSArIHNhbml0aXNlZExpbmVcbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChjb25kZW5zZWRMaW5lICsgc2FuaXRpc2VkTGluZSlcbiAgICByZXR1cm4gJydcbiAgfSwgJycpXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5mdW5jdGlvbiB0b2tlbmlzZWRMaW5lcyAobGluZXMpIHtcbiAgcmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IGxpbmUuc3BsaXQoY3hBcnJvdykubWFwKHN0ciA9PiBzdHIuc3BsaXQoY3hQaXBlKSkpXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlRnJvbVRva2VucyAobGluZSkge1xuICBjb25zdCBvdXRwdXQgPSBbXVxuXG4gIGxpbmUucmVkdWNlKChwcmV2aW91c1N0YXRlcywgc3RhdGVzKSA9PiB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGVzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFsuLi5zdGF0ZXNdXG4gICAgfVxuXG4gICAgb3V0cHV0LnB1c2goW3ByZXZpb3VzU3RhdGVzLCBbLi4uc3RhdGVzXV0pXG4gICAgcmV0dXJuIFsuLi5zdGF0ZXNdXG4gIH0sIGZhbHNlKVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlVHJhbnNpdGlvbnNGcm9tUm91dGUgKFtmcm9tU3RhdGVzLCB0b1N0YXRlc10pIHtcbiAgcmV0dXJuIGZyb21TdGF0ZXMucmVkdWNlKChhY2MsIGZyb21TdGF0ZSkgPT4gW1xuICAgIC4uLmFjYyxcbiAgICAuLi50b1N0YXRlcy5tYXAodG9TdGF0ZSA9PiB7XG4gICAgICByZXR1cm4gW2Zyb21TdGF0ZSwgdG9TdGF0ZV1cbiAgICB9KVxuICBdLCBbXSlcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEZTTVxuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN0YXRlYm90LFxuICBpc1N0YXRlYm90XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBTdGF0ZWJvdC5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBzdGF0ZWJvdE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAqICBUaGUgc3RhdGUtY2hhcnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3N0YXJ0SW49YXV0b11cbiAqICBUaGUgc3RhdGUgaW4gd2hpY2ggdG8gc3RhcnQuIElmIHVuc3BlY2lmaWVkLCB0aGUgZmlyc3Qgc3RhdGUgaW4gdGhlXG4gKiAgY2hhcnQgd2lsbCBiZSB1c2VkLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIEhvdyBub2lzeSB0aGUgbG9nZ2luZyBpcywgZnJvbSAxIHRvIDM6XG4gKiAgYGBgXG4gKiAgMSkgY29uc29sZS53YXJuXG4gKiAgMikgY29uc29sZS53YXJuL2xvZy90YWJsZVxuICogIDMpIGNvbnNvbGUud2Fybi9sb2cvdGFibGUvaW5mb1xuICogIGBgYFxuICogIGAzYCBpcyB0aGUgZGVmYXVsdC4gQXJndW1lbnQgdHlwZS1lcnJvcnMgd2lsbCBhbHdheXMgYHRocm93YC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbaGlzdG9yeUxpbWl0PTJdXG4gKiAgTGltaXQgaG93IG11Y2ggaGlzdG9yeSB0aGUgc3RhdGUtbWFjaGluZSBrZWVwcy4gQWNjZXNzZWQgdmlhXG4gKiAge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3Rvcnl8c3RhdGVib3RGc20jaGlzdG9yeSgpfS5cbiAqIEBwcm9wZXJ0eSB7ZXZlbnRzfSBbZXZlbnRzXVxuICogIElmIHlvdSB3aXNoIHRvIGhhdmUgeW91ciBTdGF0ZWJvdHMgbGlzdGVuIHRvIGV2ZW50cyBjb21pbmcgZnJvbVxuICogIGEgc2hhcmVkIEV2ZW50RW1pdHRlciwgeW91IGNhbiBwYXNzIGl0IGluIGhlcmUuIFRoZSBgZW1pdCgpYC9gb25FdmVudCgpYC9cbiAqICBgcGVyZm9ybVRyYW5zaXRpb25zKClgIG1ldGhvZHMgd2lsbCB1c2UgaXQuXG4gKlxuICogIEl0IHNob3VsZCBoYXZlIHRoZSBzYW1lIHNpZ25hdHVyZSBhcyB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfY2xhc3NfZXZlbnRlbWl0dGVyfEV2ZW50RW1pdHRlcn0uXG4gKi9cblxuLyoqXG4gKiBBIGRlc2NyaXB0aW9uIG9mIGFsbCB0aGUgc3RhdGVzIGluIGEgbWFjaGluZSwgcGx1cyBhbGwgb2YgdGhlXG4gKiBwZXJtaXR0ZWQgdHJhbnNpdGlvbnMgYmV0d2VlbiB0aGVtLlxuICpcbiAqIFRoaXMgaXMgZGVmaW5lZCB1c2luZyBhIGBzdHJpbmdgIG9yIGFuIGBhcnJheWAgb2Ygc3RyaW5ncywgYnV0XG4gKiAge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL1RlbXBsYXRlX2xpdGVyYWxzfFRlbXBsYXRlIExpdGVyYWxzfVxuICogYXJlIG11Y2ggbW9yZSBjb252ZW5pZW50LlxuICpcbiAqIEFuIGFycm93IGAtPmAgY29uZmlndXJlcyBhICoqcGVybWl0dGVkIHRyYW5zaXRpb24qKiBiZXR3ZWVuIHR3byBzdGF0ZXM6XG4gKlxuICogYGBgXG4gKiBmcm9tLXN0YXRlIC0+IHRvLXN0YXRlXG4gKiBgYGBcbiAqXG4gKiBJdCdzIHRoZSBvbmx5IG9wZXJhdG9yIG5lZWRlZCB0byBidWlsZCBhbnkgY2hhcnQ6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkXG4gKiAgIHBlbmRpbmcgLT4gcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBUaGUgXCJPUlwiIG9wZXJhdG9yIGB8YCBjYW4gaGVscCB1cyByZW1vdmUgc29tZSByZWR1bmRhbmN5IGZyb20gdGhlIGFib3ZlIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBJbiBib3RoIGNoYXJ0cywgYHBlbmRpbmdgIGNhbiB0cmFuc2l0aW9uIHRvIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCwgYW5kXG4gKiBgcmVzb2x2ZWRgIG9yIGByZWplY3RlZGAgY2FuIGJvdGggdHJhbnNpdGlvbiB0byBgZG9uZWAuXG4gKlxuICogV2UgY2FuIHN0cmVhbWxpbmUgdGhpcyBldmVuIGZ1cnRoZXI6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IChyZXNvbHZlZCB8IHJlamVjdGVkKSAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBBZ2FpbiwgdGhpcyBpcyBleGFjdGx5IGVxdWl2YWxlbnQgdG8gdGhlIHByZXZpb3VzIHR3byBleGFtcGxlcy5cbiAqXG4gKiBOb3RpY2UgaW4gdGhpcyBvbmUgdGhhdCB3ZSBoYXZlIHBhcmVudGhlc2VzIGAoYCBgKWAgc3Vycm91bmRpbmcgYHJlc29sdmVkYFxuICogYW5kIGByZWplY3RlZGAuIFRoZXkgYXJlIGFjdHVhbGx5IGNvbXBsZXRlbHkgaWdub3JlZCBieSB0aGUgcGFyc2VyLCBhbmRcbiAqIHlvdSBjYW4gdXNlIHRoZW0gYXMgeW91IHBsZWFzZSB0byBoZWxwIG1ha2UgeW91ciBjaGFydHMgbW9yZSByZWFkYWJsZS5cbiAqXG4gKiBBIGNoYXJ0IHdvcmtzIGV4YWN0bHkgdGhlIHNhbWUgd2l0aG91dCB0aGVtOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIENoYXJ0cyBjYW4gYWxzbyBiZSBzcGxpdCBhY3Jvc3MgbXVsdGlwbGUtbGluZXM6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+XG4gKiAgIHJlc29sdmVkIHxcbiAqICAgcmVqZWN0ZWQgLT5cbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKiBOb3RpY2UgdGhhdCBhbGwgd2hpdGUtc3BhY2UgaXMgaWdub3JlZCBvbiBlaXRoZXIgc2lkZSBvZiB0aGUgYC0+YFxuICogYW5kIGB8YC5cbiAqXG4gKiBgLy8gQ29tbWVudHMgb2YgdGhpcyBraW5kIGFyZSBhbGxvd2VkLCB0b286YFxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiAvLyBXaGVyZSBkbyB3ZSBnbyBmcm9tIGhlcmU/XG4gKiAgICAgKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IC8vIEFoLCB5ZXNcbiAqXG4gKiAgIC8vIEFuZCBub3cgd2UncmUgYWxsIGZpbmlzaGVkXG4gKiAgIGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEZpbmFsbHksIGhlcmUncyBhIG1vcmUgZnVsbCBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgZHJhZ0Ryb3BDaGFydCA9IGBcbiAqICAgaWRsZSAtPlxuICogICAgIGRyYWctZGV0ZWN0IC0+XG4gKiAgICAgICAoZHJhZ2dpbmcgfCBjbGlja2VkKVxuICpcbiAqICAgLy8gSnVzdCBhIGNsaWNrLCBiYWlsLW91dCFcbiAqICAgY2xpY2tlZCAtPiBpZGxlXG4gKlxuICogICAvLyBEcmFnIGRldGVjdGVkIVxuICogICBkcmFnZ2luZyAtPlxuICogICAgIGRyYWctd2FpdCAtPiBkcmFnZ2VkIC0+IGRyYWctd2FpdFxuICpcbiAqICAgLy8gRHJhZyBmaW5pc2hlZC4uLlxuICogICAoZHJhZy13YWl0IHwgZHJhZ2dlZCkgLT5cbiAqICAgICAoZHJhZy1kb25lIHwgZHJhZy1jYW5jZWwpIC0+XG4gKiAgICAgICBpZGxlXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZWJvdENoYXJ0XG4gKi9cblxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jb25zdCB7XG4gIGlzQXJyYXksXG4gIGlzRXZlbnRFbWl0dGVyLFxuICBpc0Z1bmN0aW9uLFxuICBpc1Bvam8sXG4gIGlzU3RyaW5nLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlcixcbiAgUmVmZXJlbmNlQ291bnRlclxufSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCB7IGRlY29tcG9zZUNoYXJ0LCBjeEFycm93IH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuXG4vKipcbiAqIENyZWF0ZSBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IGBvYmplY3RgLlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGVtbWluZycsIHtcbiAqICAgY2hhcnQ6IGBcbiAqICAgICB3YWxraW5nIC0+IChkaWdnaW5nIHwgYnVpbGRpbmcgfCBmYWxsaW5nKSAtPlxuICogICAgICAgd2Fsa2luZ1xuICpcbiAqICAgICBmYWxsaW5nIC0+IHNwbGF0dGluZ1xuICogICAgIHdhbGtpbmcgLT4gZXhpdGluZ1xuICogICBgXG4gKiB9KVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiAgR2l2ZSB5b3VyIFN0YXRlYm90IGEgbmFtZS4gVXNlZCBmb3IgbG9nZ2luZyBhbmQgYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9LlxuICogQHBhcmFtIHtzdGF0ZWJvdE9wdGlvbnN9IG9wdGlvbnNcbiAqL1xuXG5mdW5jdGlvbiBTdGF0ZWJvdCAobmFtZSwgb3B0aW9ucykge1xuICBpZiAoIWlzU3RyaW5nKG5hbWUpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdcXG5TdGF0ZWJvdDogUGxlYXNlIHNwZWNpZnkgYSBuYW1lIGZvciB0aGlzIG1hY2hpbmUnKVxuICB9XG5cbiAgY29uc3QgbG9nUHJlZml4ID0gYFN0YXRlYm90WyR7bmFtZX1dYFxuICBpZiAoIWlzUG9qbyhvcHRpb25zKSkge1xuICAgIHRocm93IFR5cGVFcnJvcihgXFxuJHtsb2dQcmVmaXh9OiBQbGVhc2Ugc3BlY2lmeSBvcHRpb25zIGZvciB0aGlzIG1hY2hpbmVgKVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGNoYXJ0ID0gdW5kZWZpbmVkLFxuICAgIGxvZ0xldmVsID0gMyxcbiAgICBoaXN0b3J5TGltaXQgPSAyXG4gIH0gPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKGAke2xvZ1ByZWZpeH0jYClcbiAgY29uc3QgY29uc29sZSA9IExvZ2dlcihsb2dMZXZlbClcbiAgY29uc3QgeyBjYW5XYXJuIH0gPSBjb25zb2xlXG5cbiAgY29uc3Qge1xuICAgIHN0YXRlcyA9IFtdLFxuICAgIHJvdXRlcyA9IFtdXG4gIH0gPSBjaGFydCA/IGRlY29tcG9zZUNoYXJ0KGNoYXJ0KSA6IG9wdGlvbnNcblxuICBjb25zdCB7IHN0YXJ0SW4gPSBzdGF0ZXNbMF0gfSA9IG9wdGlvbnNcbiAgaWYgKCFzdGF0ZXMuaW5jbHVkZXMoc3RhcnRJbikpIHtcbiAgICB0aHJvdyBFcnJvcihgJHtsb2dQcmVmaXh9OiBTdGFydGluZy1zdGF0ZSBub3QgaW4gY2hhcnQ6IFwiJHtzdGFydElufVwiYClcbiAgfVxuXG4gIGxldCB0cmFuc2l0aW9uSWQgPSAwXG4gIGNvbnN0IHN0YXRlSGlzdG9yeSA9IFtzdGFydEluXVxuICBjb25zdCBzdGF0ZUhpc3RvcnlMaW1pdCA9IE1hdGgubWF4KGhpc3RvcnlMaW1pdCwgMilcbiAgY29uc3QgZXZlbnRzID0gaXNFdmVudEVtaXR0ZXIob3B0aW9ucy5ldmVudHMpID8gb3B0aW9ucy5ldmVudHMgOiBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBjb25zdCBpbnRlcm5hbEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBjb25zdCBJTlRFUk5BTF9FVkVOVFMgPSB7XG4gICAgb25Td2l0Y2hpbmc6ICcoQU5ZKXN0YXRlOmNoYW5naW5nJyxcbiAgICBvblN3aXRjaGVkOiAnKEFOWSlzdGF0ZTpjaGFuZ2VkJ1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdEludGVybmFsRXZlbnQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIHJldHVybiBpbnRlcm5hbEV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uSW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCBmbikge1xuICAgIGludGVybmFsRXZlbnRzLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZm4pXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGludGVybmFsRXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgZm4pXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RhdGVzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAnc3RhdGVzJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXMnLFxuICAgIFsuLi5zdGF0ZXNdXG4gIClcbiAgY29uc3Qgcm91dGVzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAndHJhbnNpdGlvbnMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnMnLFxuICAgIFsuLi5yb3V0ZXNdXG4gIClcbiAgY29uc3QgZXZlbnRzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAnZXZlbnRzJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50cydcbiAgKVxuXG4gIC8vIEludGVycHJldHMgb25UcmFuc2l0aW9ucygpIGFuZCBwZXJmb3JtVHJhbnNpdGlvbnMoKVxuICBmdW5jdGlvbiBhcHBseUhpdGNoZXIgKGhpdGNoZXIsIGZuTmFtZSkge1xuICAgIGNvbnN0IGhpdGNoZXJBY3Rpb25zID1cbiAgICAgIGlzRnVuY3Rpb24oaGl0Y2hlcilcbiAgICAgICAgPyBoaXRjaGVyKHsgZW50ZXIsIGVtaXQsIEVudGVyLCBFbWl0IH0pXG4gICAgICAgIDogaXNQb2pvKGhpdGNoZXIpXG4gICAgICAgICAgPyBoaXRjaGVyXG4gICAgICAgICAgOiBudWxsXG5cbiAgICBpZiAoIWlzUG9qbyhoaXRjaGVyQWN0aW9ucykpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBFeHBlY3RlZCBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdGBcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBldmVudHMgPSB7fVxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gW11cblxuICAgIE9iamVjdC5lbnRyaWVzKGhpdGNoZXJBY3Rpb25zKVxuICAgICAgLmZvckVhY2goKFtyb3V0ZUNoYXJ0LCBhY3Rpb25PckNvbmZpZ10pID0+IHtcbiAgICAgICAgLy8gb25UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oYWN0aW9uT3JDb25maWcpKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogYWN0aW9uT3JDb25maWcgfSlcbiAgICAgICAgfSBlbHNlIGlmICghaXNQb2pvKGFjdGlvbk9yQ29uZmlnKSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBjb25zdCB7IG9uOiBfb24sIHRoZW46IF90aGVuIH0gPSBhY3Rpb25PckNvbmZpZ1xuICAgICAgICBpZiAoaXNTdHJpbmcoX29uKSB8fCBpc0FycmF5KF9vbikpIHtcbiAgICAgICAgICBjb25zdCBldmVudE5hbWVzID0gW19vbl0uZmxhdCgpXG4gICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdXG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBfdGhlbiB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihfdGhlbikpIHtcbiAgICAgICAgICAvLyBvblRyYW5zaXRpb25zIDIvMy4uLlxuICAgICAgICAgIC8vIChCZWhhdmUgbGlrZSBvblRyYW5zaXRpb25zIGlmIGEgY29uZmlnIGlzIHNwZWNpZmllZCwgYnV0XG4gICAgICAgICAgLy8gIHRoZXJlIGlzIG5vIFwib25cIiBldmVudC4uLilcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgY29uc3QgYWxsU3RhdGVzID0gW11cbiAgICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDIvMy4uLlxuICAgIGNvbnN0IGRlY29tcG9zZWRFdmVudHMgPSBPYmplY3QuZW50cmllcyhldmVudHMpXG4gICAgICAucmVkdWNlKChhY2MsIFtldmVudE5hbWUsIF9jb25maWdzXSkgPT4ge1xuICAgICAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCBjb25maWdzIH0gPSBkZWNvbXBvc2VDb25maWdzKF9jb25maWdzLCBjYW5XYXJuKVxuICAgICAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICBbZXZlbnROYW1lXTogY29uZmlnc1xuICAgICAgICB9XG4gICAgICB9LCB7fSlcblxuICAgIGNvbnN0IGFsbENsZWFudXBGbnMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGFsbENsZWFudXBGbnMucHVzaChcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKGRlY29tcG9zZWRFdmVudHMpXG4gICAgICAgIC5tYXAoKFtldmVudE5hbWUsIGNvbmZpZ3NdKSA9PlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGV2ZW50c0hhbmRsZWQuaW5jcmVhc2UoZXZlbnROYW1lKSxcbiAgICAgICAgICAgIG9uRXZlbnQoZXZlbnROYW1lLCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBldmVudFdhc0hhbmRsZWQgPSBjb25maWdzLnNvbWUoXG4gICAgICAgICAgICAgICAgKHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc2VkID0gaW5TdGF0ZShmcm9tU3RhdGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50ZXIodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiguLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgcmV0dXJuICEhcGFzc2VkXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICBpZiAoIWV2ZW50V2FzSGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25Ob09wKGBFdmVudCBub3QgaGFuZGxlZDogXCIke2V2ZW50TmFtZX1cImApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICApLmZsYXQoKVxuICAgIClcblxuICAgIC8vIG9uVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgY29uc3QgdHJhbnNpdGlvbkNvbmZpZ3MgPSBkZWNvbXBvc2VDb25maWdzKHRyYW5zaXRpb25zLCBjYW5XYXJuKVxuXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgYWxsU3RhdGVzLnB1c2goLi4udHJhbnNpdGlvbkNvbmZpZ3Muc3RhdGVzKVxuICAgICAgYWxsUm91dGVzLnB1c2goLi4udHJhbnNpdGlvbkNvbmZpZ3Mucm91dGVzKVxuICAgIH1cblxuICAgIGFsbENsZWFudXBGbnMucHVzaChcbiAgICAgIC4uLnRyYW5zaXRpb25Db25maWdzLmNvbmZpZ3MubWFwKHRyYW5zaXRpb24gPT4ge1xuICAgICAgICBjb25zdCB7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH0gPSB0cmFuc2l0aW9uXG4gICAgICAgIGNvbnN0IHJvdXRlID0gYCR7ZnJvbVN0YXRlfS0+JHt0b1N0YXRlfWBcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICByb3V0ZXNIYW5kbGVkLmluY3JlYXNlKHJvdXRlKSxcbiAgICAgICAgICBvbkludGVybmFsRXZlbnQocm91dGUsIGFjdGlvbilcbiAgICAgICAgXVxuICAgICAgfSkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gRGVidWdnaW5nLCBpZiB3ZSdyZSBhdCB0aGUgcmlnaHQgbGV2ZWxcbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBjb25zdCBpbnZhbGlkU3RhdGVzID0gYWxsU3RhdGVzLmZpbHRlcihzdGF0ZSA9PiAhc3RhdGVzLmluY2x1ZGVzKHN0YXRlKSlcbiAgICAgIGNvbnN0IGludmFsaWRSb3V0ZXMgPSBhbGxSb3V0ZXMuZmlsdGVyKHJvdXRlID0+ICFyb3V0ZXMuaW5jbHVkZXMocm91dGUpKVxuICAgICAgaWYgKGludmFsaWRTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgc3RhdGVzIHNwZWNpZmllZDpcXG5gICtcbiAgICAgICAgICBpbnZhbGlkU3RhdGVzLm1hcChzdGF0ZSA9PiBgICA+IFwiJHtzdGF0ZX1cImApLmpvaW4oJ1xcbicpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmIChpbnZhbGlkUm91dGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBJbnZhbGlkIHRyYW5zaXRpb25zIHNwZWNpZmllZDpcXG5gICtcbiAgICAgICAgICBpbnZhbGlkUm91dGVzLm1hcChyb3V0ZSA9PiBgICA+IFwiJHtyb3V0ZX1cImApLmpvaW4oJ1xcbicpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gYWxsQ2xlYW51cEZucy5mb3JFYWNoKGZuID0+IGZuKCkpXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1N0YXRlICgpIHtcbiAgICByZXR1cm4gc3RhdGVIaXN0b3J5W3N0YXRlSGlzdG9yeS5sZW5ndGggLSAyXVxuICB9XG5cbiAgZnVuY3Rpb24gY3VycmVudFN0YXRlICgpIHtcbiAgICByZXR1cm4gc3RhdGVIaXN0b3J5W3N0YXRlSGlzdG9yeS5sZW5ndGggLSAxXVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuVHJhbnNpdGlvblRvICguLi5zdGF0ZXMpIHtcbiAgICBjb25zdCB0ZXN0U3RhdGVzID0gc3RhdGVzLmZsYXQoKVxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignY2FuVHJhbnNpdGlvblRvJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgdGVzdFN0YXRlc1swXSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGlmICghdGVzdFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZXMgPSBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgcmV0dXJuIHRlc3RTdGF0ZXMuZXZlcnkoc3RhdGUgPT4gbmV4dFN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gIH1cblxuICBmdW5jdGlvbiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSAoc3RhdGUpIHtcbiAgICBjb25zdCBfc3RhdGUgPSBzdGF0ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHN0YXRlXG4gICAgICA6IGN1cnJlbnRTdGF0ZSgpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3N0YXRlc0F2YWlsYWJsZUZyb21IZXJlJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgX3N0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlcy5yZWR1Y2UoKGFjYywgcm91dGUpID0+IHtcbiAgICAgIGNvbnN0IFtmcm9tU3RhdGUsIHRvU3RhdGVdID0gcm91dGUuc3BsaXQoY3hBcnJvdylcbiAgICAgICAgLm1hcChzdGF0ZSA9PiBzdGF0ZS50cmltKCkpXG5cbiAgICAgIGlmIChmcm9tU3RhdGUgPT09IF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gWy4uLmFjYywgdG9TdGF0ZV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGluU3RhdGUgKHN0YXRlLCBhbnlPckZuLCAuLi5mbkFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2luU3RhdGUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGNvbmRpdGlvbk1hdGNoZXMgPSBjdXJyZW50U3RhdGUoKSA9PT0gc3RhdGVcblxuICAgIGlmIChhbnlPckZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghY29uZGl0aW9uTWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKGlzRnVuY3Rpb24oYW55T3JGbikpIHtcbiAgICAgICAgcmV0dXJuIGFueU9yRm4oLi4uZm5BcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFueU9yRm5cbiAgICB9XG5cbiAgICByZXR1cm4gY29uZGl0aW9uTWF0Y2hlc1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbWl0JywgeyBldmVudE5hbWU6IGlzU3RyaW5nIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBldmVudHMuZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBlbnRlciAoc3RhdGUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VudGVyJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCB0b1N0YXRlID0gc3RhdGVcblxuICAgIGlmICh0b1N0YXRlID09PSBpblN0YXRlKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgQWxyZWFkeSBpbiBzdGF0ZTogXCIke3RvU3RhdGV9XCJgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZXMuaW5jbHVkZXModG9TdGF0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHN0YXRlIFwiJHt0b1N0YXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRSb3V0ZSA9IGAke2luU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgIGlmICghcm91dGVzLmluY2x1ZGVzKG5leHRSb3V0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHRyYW5zaXRpb24gXCIke25leHRSb3V0ZX1cIiwgbm90IHN3aXRjaGluZ2ApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBGZWxsLXRocm91Z2gsIGNhbiBlbnRlciBuZXh0IHN0YXRlXG4gICAgY29uc29sZS5pbmZvKGAke2xvZ1ByZWZpeH06IHRJZDwkeysrdHJhbnNpdGlvbklkfT46ICR7bmV4dFJvdXRlfWApXG5cbiAgICBzdGF0ZUhpc3RvcnkucHVzaCh0b1N0YXRlKVxuICAgIGlmIChzdGF0ZUhpc3RvcnkubGVuZ3RoID4gc3RhdGVIaXN0b3J5TGltaXQpIHtcbiAgICAgIHN0YXRlSGlzdG9yeS5zaGlmdCgpXG4gICAgfVxuXG4gICAgZW1pdEludGVybmFsRXZlbnQoSU5URVJOQUxfRVZFTlRTLm9uU3dpdGNoaW5nLCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KG5leHRSb3V0ZSwgLi4uYXJncylcbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMub25Td2l0Y2hlZCwgdG9TdGF0ZSwgaW5TdGF0ZSwgLi4uYXJncylcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBvbkV2ZW50IChldmVudE5hbWUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkV2ZW50JywgeyBldmVudE5hbWU6IGlzU3RyaW5nLCBjYjogaXNGdW5jdGlvbiB9LCBldmVudE5hbWUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgZXZlbnRzLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gICAgcmV0dXJuICgpID0+IGV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGNiKVxuICB9XG5cbiAgY29uc3Qgc3dpdGNoTWV0aG9kcyA9IE9iamVjdC5rZXlzKElOVEVSTkFMX0VWRU5UUylcbiAgICAucmVkdWNlKChvYmosIG1ldGhvZE5hbWUpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW21ldGhvZE5hbWVdOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IobWV0aG9kTmFtZSwgeyBjYjogaXNGdW5jdGlvbiB9LCBjYilcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnQgPSBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKElOVEVSTkFMX0VWRU5UU1ttZXRob2ROYW1lXSlcbiAgICAgICAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uSW50ZXJuYWxFdmVudChcbiAgICAgICAgICAgIElOVEVSTkFMX0VWRU5UU1ttZXRob2ROYW1lXSxcbiAgICAgICAgICAgICh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgY2IodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgICAgICAgZGVjcmVhc2VSZWZDb3VudCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge30pXG5cbiAgY29uc3QgZW50ZXJFeGl0TWV0aG9kcyA9IFtcbiAgICBbJ0V4aXRpbmcnLCAnb25Td2l0Y2hpbmcnXSxcbiAgICBbJ0VudGVyaW5nJywgJ29uU3dpdGNoaW5nJ10sXG4gICAgWydFeGl0ZWQnLCAnb25Td2l0Y2hlZCddLFxuICAgIFsnRW50ZXJlZCcsICdvblN3aXRjaGVkJ11cbiAgXVxuICAgIC5yZWR1Y2UoKG9iaiwgbmFtZXMpID0+IHtcbiAgICAgIGNvbnN0IFtuYW1lLCBzd2l0Y2hNZXRob2RdID0gbmFtZXNcbiAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBgb24ke25hbWV9YFxuICAgICAgY29uc3QgZXZlbnROYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFttZXRob2ROYW1lXTogZnVuY3Rpb24gKHN0YXRlLCBjYikge1xuICAgICAgICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcihtZXRob2ROYW1lLCB7IHN0YXRlOiBpc1N0cmluZywgY2I6IGlzRnVuY3Rpb24gfSwgc3RhdGUsIGNiKVxuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICAgICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgICAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OiR7ZXZlbnROYW1lfWApXG4gICAgICAgICAgXVxuICAgICAgICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gc3dpdGNoTWV0aG9kc1tzd2l0Y2hNZXRob2RdKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ0V4aXQnKSA9PT0gMCkge1xuICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNiKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdG9TdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNiKGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgICAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHt9KVxuXG4gIGZ1bmN0aW9uIEVtaXQgKGV2ZW50TmFtZSwgLi4uY3VycmllZEFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VtaXQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBlbWl0KGV2ZW50TmFtZSwgLi4uWy4uLmN1cnJpZWRBcmdzLCAuLi5hcmdzXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIEVudGVyIChzdGF0ZSwgLi4uY3VycmllZEFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VudGVyJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IGVudGVyKHN0YXRlLCAuLi5bLi4uY3VycmllZEFyZ3MsIC4uLmFyZ3NdKVxuICB9XG5cbiAgZnVuY3Rpb24gSW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4sIC4uLmN1cnJpZWRGbkFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0luU3RhdGUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uZm5BcmdzKSA9PlxuICAgICAgaW5TdGF0ZShzdGF0ZSwgYW55T3JGbiwgLi4uWy4uLmN1cnJpZWRGbkFyZ3MsIC4uLmZuQXJnc10pXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH06IFN0YXRlLW1hY2hpbmUgcmVzZXQhYClcblxuICAgIHN0YXRlSGlzdG9yeS5sZW5ndGggPSAwXG4gICAgc3RhdGVIaXN0b3J5LnB1c2goc3RhcnRJbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25Ob09wIChtZXNzYWdlKSB7XG4gICAgY29uc3QgbGFzdFN0YXRlID0gcHJldmlvdXNTdGF0ZSgpXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgcHJldlJvdXRlID0gYCR7bGFzdFN0YXRlID09PSB1bmRlZmluZWQgPyAnW3VuZGVmaW5lZF0nIDogbGFzdFN0YXRlfS0+JHtpblN0YXRlfWBcblxuICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICBpZiAoIWF2YWlsYWJsZVN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gVGhlcmUgYXJlIG5vIHN0YXRlcyBhdmFpbGFibGUgZnJvbSBcIiR7aW5TdGF0ZX1cImBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBGcm9tIFwiJHtpblN0YXRlfVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbJHthdmFpbGFibGVTdGF0ZXNcbiAgICAgICAgICAgIC5tYXAoc3RhdGUgPT4gYFwiJHtzdGF0ZX1cImApXG4gICAgICAgICAgICAuam9pbignLCAnKX1dYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZXM6IHN0YXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgdHJhbnNpdGlvbnM6IHJvdXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgZXZlbnRzOiBldmVudHNIYW5kbGVkLnJlZnMoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluZm8gKCkge1xuICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZWApXG5cbiAgICBsb2dSZWZDb3VudGVySW5mbyhzdGF0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHJvdXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8oZXZlbnRzSGFuZGxlZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1JlZkNvdW50ZXJJbmZvIChyZWZDb3VudGVyKSB7XG4gICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgdGFibGUgfSA9IHJlZkNvdW50ZXIudG9WYWx1ZSgpXG4gICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24pXG4gICAgaWYgKHRhYmxlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS50YWJsZSh0YWJsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJyAgPiBObyBpbmZvcm1hdGlvbicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgc3RhdGUtbWFjaGluZSBvYmplY3QgY3JlYXRlZCBieVxuICAgKiB7QGxpbmsgI3N0YXRlYm90c3RhdGVib3R8U3RhdGVib3QoKX0uXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90RnNtXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogRm9yIGlkZW50aWZ5aW5nIFN0YXRlYm90IG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9fU1RBVEVCT1RfXzogMSxcblxuICAgIC8qKlxuICAgICAqIFRlc3RzIHRvIHNlZSBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgc3BlY2lmaWVkIHN0YXRlIGZyb21cbiAgICAgKiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogSWYgbW9yZSB0aGFuIG9uZSBzdGF0ZSBpcyBzcGVjaWZpZWQsIGB0cnVlYCBpcyByZXR1cm5lZCBvbmx5IGlmXG4gICAgICogKipBTEwqKiBzdGF0ZXMgYXJlIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2dhbWUtbWVudXMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+XG4gICAgICogICAgICAgbWVudSAtPlxuICAgICAqICAgICAgICAgcGxheSB8XG4gICAgICogICAgICAgICBvcHRpb25zIHxcbiAgICAgKiAgICAgICAgIHNvdW5kIHxcbiAgICAgKiAgICAgICAgIHF1aXRcbiAgICAgKlxuICAgICAqICAgICAvLyBHbyBiYWNrIHRvIG1lbnVcbiAgICAgKiAgICAgcGxheSB8IG9wdGlvbnMgfCBzb3VuZCAtPiBtZW51XG4gICAgICpcbiAgICAgKiAgICAgLy8gQ2FuIHF1aXQgZnJvbSBtYWluIGdhbWUsIHRvb1xuICAgICAqICAgICBwbGF5IC0+IHF1aXRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BsYXknKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdtZW51JylcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbyhbJ3BsYXknLCAnb3B0aW9ucyddKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBjYW5UcmFuc2l0aW9uVG86IGNhblRyYW5zaXRpb25UbyxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjb3JvdXRpbmUnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBzdXNwZW5kZWQgLT4gcnVubmluZyAtPiAoc3VzcGVuZGVkIHwgZGVhZClcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3VzcGVuZGVkXCJcbiAgICAgKi9cbiAgICBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGVtaXRzIGFuIGV2ZW50LCBmaXJpbmcgYW55IGxpc3RlbmVycyBhZGRlZCB1c2luZ1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnN8LnBlcmZvcm1UcmFuc2l0aW9ucygpfSBvciB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudHwub25FdmVudCgpfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXVxuICAgICAqICBPcHRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogIFdoZXRoZXIgb3Igbm90IHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogIFNlZToge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2VtaXR0ZXJfZW1pdF9ldmVudG5hbWVfYXJnc3xOb2RlIEV2ZW50c31cbiAgICAgKiAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBTdGF0ZWJvdCBpbXBvcnRzIGBFdmVudEVtaXR0ZXJgIGZyb20gdGhlXG4gICAgICogIHtAbGluayBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHN8ZXZlbnRzfVxuICAgICAqIHBhY2thZ2UgZm9yIGRlYWxpbmcgd2l0aCBldmVudHMgaW4gdGhlIGJyb3dzZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Jhc2ljLWZvcm0nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgLT4gcmVkaXJlY3RcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6IHtcbiAgICAgKiAgICAgb246ICdwb3N0LWRhdGEnLFxuICAgICAqICAgICB0aGVuOiAoLi4uYXJncykgPT4ge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBhcmdzOiAnLCBhcmdzKVxuICAgICAqICAgICAgIC8vIHNldFRpbWVvdXQobWFjaGluZS5FbnRlcigncmVkaXJlY3QnKSwgNTAwMClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVtaXQoJ3Bvc3QtZGF0YScsICdIZWxsbywgd29ybGQhJylcbiAgICAgKiAvLyBFdmVudCBhcmdzOiBbXCJIZWxsbywgd29ybGQhXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzZW5kaW5nXCJcbiAgICAgKi9cbiAgICBlbWl0OiBlbWl0LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqICBUaGUgZGVzaXJlZCBldmVudCB0byB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfS5cbiAgICAgKiBAcGFyYW0gey4uLip9IFtjdXJyaWVkQXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHRoYXQgd2lsbCBjdXJyeSBpbnRvIHRoZSByZXR1cm5lZCBgZW1pdCgpYCBmdW5jdGlvblxuICAgICAqICB3aGVuZXZlciBpdCBpcyBjYWxsZWQuXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhhdCBldmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgndHJhZmZpYy1saWdodHMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBnbyAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tc3RvcCAtPlxuICAgICAqICAgICAgIHN0b3BcbiAgICAgKlxuICAgICAqICAgICAvLyAuLi5nb3R0YSBrZWVwIHRoYXQgdHJhZmZpYyBmbG93aW5nXG4gICAgICogICAgIHN0b3AgLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLWdvIC0+XG4gICAgICogICAgICAgZ29cbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnc3RvcCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3N0b3AgLT4gcHJlcGFyZS10by1nbyc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tZ28gLT4gZ28nOiAgICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ2dvIC0+IHByZXBhcmUtdG8tc3RvcCc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tc3RvcCAtPiBzdG9wJzogeyBvbjogJ3RpbWVyJyB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBuZXh0VHJhZmZpY0xpZ2h0ID0gbWFjaGluZS5FbWl0KCd0aW1lcicpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3RvcFwiXG4gICAgICpcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInByZXBhcmUtdG8tc3RvcFwiXG4gICAgICovXG4gICAgRW1pdDogRW1pdCxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZyBhcyBpdCBpc1xuICAgICAqIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXVxuICAgICAqICBPcHRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byB0cmFuc2l0aW9uIGNhbGxiYWNrcy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YXRlIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2RpYWxvZycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2hvd2luZy1tb2RhbCAtPiAoc2F2aW5nIHwgaWRsZSlcbiAgICAgKiAgICAgICBzYXZpbmcgLT4gaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NhdmluZycpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIC8vIFtkaWFsb2ddOiBJbnZhbGlkIHRyYW5zaXRpb24gXCJpZGxlLT5zYXZpbmdcIiwgbm90IHN3aXRjaGluZ1xuICAgICAqIC8vID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCJbdW5kZWZpbmVkXS0+aWRsZVwiXG4gICAgICogLy8gPiBGcm9tIFwiaWRsZVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbXCJzaG93aW5nLW1vZGFsXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzaG93aW5nLW1vZGFsJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgZW50ZXI6IGVudGVyLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nXG4gICAgICogYXMgaXQgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcGFyYW0gey4uLip9IFtjdXJyaWVkQXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHRoYXQgd2lsbCBjdXJyeSBpbnRvIHRoZSByZXR1cm5lZCBgZW50ZXIoKWAgZnVuY3Rpb25cbiAgICAgKiAgd2hlbmV2ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgQSBmdW5jdGlvbiB0aGF0IGNhbiBjaGFuZ2UgdGhlIHN0YXRlIHdoZW4gY2FsbGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwb3B1cC1tZW51Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBtZW51LW9wZW5lZCAtPlxuICAgICAqICAgICAgIChpdGVtLWNsaWNrZWQgfCBpZGxlKVxuICAgICAqXG4gICAgICogICAgIGl0ZW0tY2xpY2tlZCAtPiBpZGxlXG4gICAgICogICBgLFxuICAgICAqICAgc3RhcnRJbjogJ21lbnUtb3BlbmVkJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBidXR0b24ub25jbGljayA9IG1hY2hpbmUuRW50ZXIoJ2l0ZW0tY2xpY2tlZCcpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwibWVudS1vcGVuZWRcIlxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2soKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIml0ZW0tY2xpY2tlZFwiXG4gICAgICovXG4gICAgRW50ZXI6IEVudGVyLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgc3RhdGVzIHRoZSBtYWNoaW5lIGhhcyBiZWVuIGluIHNvIGZhciwgdXAgdG8gYSBsaW1pdCBzZXRcbiAgICAgKiBieSBgaGlzdG9yeUxpbWl0YCBpbiB7QGxpbmsgc3RhdGVib3RPcHRpb25zfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQSBjb3B5IG9mIHRoZSBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdkb3dubG9hZGVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPiAoZmFpbHVyZSB8IHN1Y2Nlc3MpXG4gICAgICogICAgICAgZmFpbHVyZSAtPiBsb2FkaW5nXG4gICAgICogICAgICAgc3VjY2VzcyAtPiBkb25lXG4gICAgICogICBgLFxuICAgICAqICAgaGlzdG9yeUxpbWl0OiA0XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2ZhaWx1cmUnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2xvYWRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3N1Y2Nlc3MnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIG1hY2hpbmUuaGlzdG9yeSgpXG4gICAgICogLy8gW1wiZmFpbHVyZVwiLCBcImxvYWRpbmdcIiwgXCJzdWNjZXNzXCIsIFwiZG9uZVwiXVxuICAgICAqL1xuICAgIGhpc3Rvcnk6ICgpID0+IFsuLi5zdGF0ZUhpc3RvcnldLFxuXG4gICAgLyoqXG4gICAgICogUHJpbnQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZSB0byB0aGUgY29uc29sZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluZm8oKVxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZS5cbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICBzdGF0ZXMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgICAnZG9uZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICAnaWRsZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdIExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9uczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICAgdHJhbnNpdGlvbnMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgJ2lkbGUtPnJlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICdpZGxlLT5zZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZy0+ZG9uZScg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nLT5kb25lJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICAgICAqIC8vIChObyBpbmZvcm1hdGlvbilcbiAgICAgKi9cbiAgICBpbmZvOiAoKSA9PiBpbmZvKCksXG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFNhbWUgZGV0YWlscyBhcyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5mb3wuaW5mbygpfSBpbiBvYmplY3QtZm9ybS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5zcGVjdCgpXG4gICAgICogLy8gV2lsbCByZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAgICogLy8gIHsgc3RhdGVzLCB0cmFuc2l0aW9ucywgZXZlbnRzIH1cbiAgICAgKlxuICAgICAqIC8vIFRoZXNlIHdpbGwgZWFjaCBoYXZlIGtleS12YWx1ZXMsIHRoZSBrZXkgYmVpbmcgdGhlIG5hbWVcbiAgICAgKiAvLyBhbmQgdGhlIHZhbHVlIGJlaW5nIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGF0dGFjaGVkLlxuICAgICAqL1xuICAgIGluc3BlY3Q6ICgpID0+IGluc3BlY3QoKSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9XG4gICAgICogbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGBzdGF0ZWAsIGltbWVkaWF0ZWx5IHJldHVybmluZyBlaXRoZXJcbiAgICAgKiBgdHJ1ZWAgb3IgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGBvdXRwdXRXaGVuVHJ1ZWAgaXMgc3BlY2lmaWVkLCB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBpbnN0ZWFkIG9mIGB0cnVlYCwgYW5kIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2ZcbiAgICAgKiAgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCB0aGVuIGl0cyByZXR1cm4tdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAgICogYXMgdGhlIGB0cnVlYC12YWx1ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUgdG8gdGVzdCBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBbb3V0cHV0V2hlblRydWVdXG4gICAgICogIE9wdGlvbmFsIGB0cnVlYC12YWx1ZS4gSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgYmVcbiAgICAgKiAgY2FsbGVkIGFuZCBpdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcGFyYW0gey4uLip9IFtmbkFyZ3NdXG4gICAgICogIEFyZ3VtZW50cyB0aGF0IHdpbGwgcGFzcyBpbnRvIGBvdXRwdXRXaGVuVHJ1ZSgpYCBpZiBpdCBoYXNcbiAgICAgKiAgYmVlbiBkZWZpbmVkIGFzIGEgZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbHwqfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgJ1B1cnJyci4uLicpXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIGluU3RhdGU6IGluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gcnVuLCB0ZXN0cyB0aGF0XG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IG1hdGNoZXMgdGhlXG4gICAgICogc3BlY2lmaWVkIHN0YXRlLCByZXR1cm5pbmcgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHBhcmFtIHsuLi4qfSBbY3VycmllZEZuQXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHRoYXQgd2lsbCBjdXJyeSBpbnRvIGBvdXRwdXRXaGVuVHJ1ZSgpYCBpZiBpdCBoYXNcbiAgICAgKiAgYmVlbiBkZWZpbmVkIGFzIGEgZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FsbHMge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIGlkbGluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScpXG4gICAgICogdmFyIHB1cnJpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogaWRsaW5nKClcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBJZGxpbmchXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBJblN0YXRlOiBJblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGFsc28gYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9XG4gICAgICogZm9yIHRoZSBzYW1lLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ0F5LCB0aGVyZeKAmXMgdGhlIHJ1Yi4nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICB0aGUtcXVlc3Rpb24gLT4gKHRvLWJlIHwgbm90LXRvLWJlKVxuICAgICAqICAgICAgIG5vdC10by1iZSAtPiBwZXJjaGFuY2UtdG8tZHJlYW1cbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5uYW1lKClcbiAgICAgKiAvLyBcIkF5LCB0aGVyZeKAmXMgdGhlIHJ1Yi5cIlxuICAgICAqL1xuICAgIG5hbWU6ICgpID0+IG5hbWUsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJlZCBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmVkIGZyb206IHJlY2VpdmluZ1xuICAgICAqL1xuICAgIG9uRW50ZXJlZDogZW50ZXJFeGl0TWV0aG9kcy5vbkVudGVyZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipCRUZPUkUqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgYmVjb21lcyB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2VudGVyQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAoZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyZWQoJ2RvbmUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnV2UgbWFkZSBpdCEnKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJpbmcoJ2RvbmUnLCBmcm9tU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0VudGVyaW5nIGZyb206JywgZnJvbVN0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmluZyBmcm9tOiBzZW5kaW5nXG4gICAgICogLy8gV2UgbWFkZSBpdCFcbiAgICAgKi9cbiAgICBvbkVudGVyaW5nOiBlbnRlckV4aXRNZXRob2RzLm9uRW50ZXJpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBlbnRlckNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBldmVudCBpcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgVGhlIGNhbGxiYWNrLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvIC0+IGdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH0sXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FdmVudCgndGltZXInLCAoKSA9PiB7XG4gICAgICogICByZWRyYXdUcmFmZmljTGlnaHRzKClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogc2V0SW50ZXJ2YWwobWFjaGluZS5FbWl0KCd0aW1lcicpLCAyMDAwKVxuICAgICAqL1xuICAgIG9uRXZlbnQ6IG9uRXZlbnQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBhcmUgaGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiAvLyBXZSBhcmUgaGVhZGluZyB0bzogc2VuZGluZ1xuICAgICAqL1xuICAgIG9uRXhpdGVkOiBlbnRlckV4aXRNZXRob2RzLm9uRXhpdGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdQZWFjZSBvdXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRpbmcoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdIZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gSGVhZGluZyB0bzogcmVjZWl2aW5nXG4gICAgICogLy8gUGVhY2Ugb3V0IVxuICAgICAqL1xuICAgIG9uRXhpdGluZzogZW50ZXJFeGl0TWV0aG9kcy5vbkV4aXRpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0aW5nIC5vbkV4aXRpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRlZCAub25FeGl0ZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGV4aXRDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgKipBTlkqKlxuICAgICAqIHN0YXRlLWNoYW5nZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N3aXRjaENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25Td2l0Y2hlZCgodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgV2Ugd2VudCBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIFdlIHdlbnQgZnJvbSBcImlkbGVcIiB0byBcInJlY2VpdmluZ1wiXG4gICAgICovXG4gICAgb25Td2l0Y2hlZDogc3dpdGNoTWV0aG9kcy5vblN3aXRjaGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGJlZm9yZSAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgR29pbmcgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBHb2luZyBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGluZzogc3dpdGNoTWV0aG9kcy5vblN3aXRjaGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBzd2l0Y2hDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUnVuIGNhbGxiYWNrcyB3aGVuIHRyYW5zaXRpb25zIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbihtYWNoaW5lLkVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2gobWFjaGluZS5FbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbihtYWNoaW5lLkVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKG1hY2hpbmUuRW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHJlY2VpdmVEYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBUaGUgYWJvdmUgZXhhbXBsZSB1c2luZyBhIGZ1bmN0aW9uIGZvciBjb25maWdcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoKHsgRW50ZXIgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbihFbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKEVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKEVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKEVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBldGMuLi5cbiAgICAgKi9cbiAgICBvblRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdvblRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIHRyYW5zaXRpb25zIHdoZW4gZXZlbnRzIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIFVzZSBgdGhlbmAgdG8gb3B0aW9uYWxseSBhZGQgY2FsbGJhY2tzIHRvIHRob3NlIHRyYW5zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29tcGxleC1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIHVwZGF0ZVxuICAgICAqXG4gICAgICogICAgIC8vIE1heWJlIHRoaW5ncyB0YWtlIGEgbG9uZyB0aW1lLi4uXG4gICAgICogICAgIHVwZGF0ZSAtPlxuICAgICAqICAgICAgIHdhaXRpbmcgLT4gd2FpdGluZy1hLXdoaWxlXG4gICAgICpcbiAgICAgKiAgICAgLy8gV2hpY2ggcGF0aCB3aWxsIHdlIHRha2U/XG4gICAgICogICAgIHdhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT5cbiAgICAgKiAgICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dFxuICAgICAqXG4gICAgICogICAgIC8vIEFsbCBkb25lIVxuICAgICAqICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dCAtPlxuICAgICAqICAgICAgIGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoKHsgRW50ZXIsIGVtaXQgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHVwZGF0ZSc6IHtcbiAgICAgKiAgICAgb246ICd1c2VyLXNhdmVkJyxcbiAgICAgKiAgICAgdGhlbjogKGRhdGEpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnU2VuZGluZyBkYXRhOiAnLCBkYXRhKVxuICAgICAqXG4gICAgICogICAgICAgc2VuZERhdGEoZGF0YSlcbiAgICAgKiAgICAgICAgIC50aGVuKEVudGVyKCdzdWNjZXNzJykpXG4gICAgICogICAgICAgICAuY2F0Y2goRW50ZXIoJ2ZhaWxlZCcpKVxuICAgICAqXG4gICAgICogICAgICAgZW1pdCgnZGF0YS1zZW50JylcbiAgICAgKiAgICAgfVxuICAgICAqICAgfSxcbiAgICAgKiAgICd1cGRhdGUgLT4gd2FpdGluZyc6IHtcbiAgICAgKiAgICAgb246ICdkYXRhLXNlbnQnLFxuICAgICAqICAgICB0aGVuOiAoKSA9PiB7XG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcignd2FpdGluZy1hLXdoaWxlJyksIDc1MClcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd0aW1lb3V0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIEp1c3QgdG8gaWxsdXN0cmF0ZSB0aGF0IHlvdSBjYW4gbWl4IG4nIG1hdGNoIHdpdGggb25UcmFuc2l0aW9uczpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gc3VjY2Vzcyc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0xvdmVseSEnKVxuICAgICAqICAgfSxcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHRpbWVvdXQnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXZWxsLCBhdCBsZWFzdCB5b3UgaGF2ZSB5b3VyIHNob2VzJylcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCd1c2VyLXNhdmVkJywgWydzb21lJywgJ2RhdGEnXSlcbiAgICAgKiAvLyBTZW5kaW5nIGRhdGE6IFtcInNvbWVcIiwgXCJkYXRhXCJdXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBwZXJmb3JtVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ3BlcmZvcm1UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgVGhlIHByZXZpb3VzIHN0YXRlLCBvciBgdW5kZWZpbmVkYCBpZiB0aGVyZSBpc24ndCBvbmUgKGllOyB5b3VcbiAgICAgKiAgaGF2ZSBqdXN0IGNhbGxlZCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXR8LnJlc2V0KCl9LCBvciB0aGVcbiAgICAgKiAgbWFjaGluZSBoYXMganVzdCBzdGFydGVkLilcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnc2ltcGxlLXNlbmRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUucHJldmlvdXNTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKi9cbiAgICBwcmV2aW91c1N0YXRlOiBwcmV2aW91c1N0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUtbWFjaGluZSB0byBpdHMgc3RhcnRpbmctc3RhdGUgYW5kIGNsZWFycyB0aGVcbiAgICAgKiBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQWxsIGxpc3RlbmVycyB3aWxsIHN0aWxsIGJlIGF0dGFjaGVkLCBidXQgbm8gZXZlbnRzIG9yIHRyYW5zaXRpb25zIHdpbGwgYmUgZmlyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY2Fyb3VzZWwnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBwYWdlLTEgLT5cbiAgICAgKiAgICAgcGFnZS0yIC0+XG4gICAgICogICAgIHBhZ2UtMyAtPlxuICAgICAqICAgICBwYWdlLTQgLT4gcGFnZS0xXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3BhZ2UtMicpXG4gICAgICogbWFjaGluZS5yZXNldCgpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicGFnZS0xXCJcbiAgICAgKi9cbiAgICByZXNldDogcmVzZXQsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYGFycmF5YCBvZiBzdGF0ZXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBzdGF0ZSBzcGVjaWZpZWQuXG4gICAgICogSWYgbm8gc3RhdGUgaXMgcGFzc2VkLWluLCB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlXSBUaGUgc3RhdGUgdG8gY2hlY2suIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqICBpZiB1bnNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgICAqIC8vIFtcInNlbmRpbmdcIiwgXCJyZWNlaXZpbmdcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoJ3JlY2VpdmluZycpXG4gICAgICogLy8gW1wiZG9uZVwiXVxuICAgICAqL1xuICAgIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlOiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZUNvbmZpZ3MgKGNvbmZpZ3MsIGNhbldhcm4pIHtcbiAgY29uc3QgYWxsU3RhdGVzID0gW11cbiAgY29uc3QgYWxsUm91dGVzID0gW11cblxuICBjb25zdCBfY29uZmlncyA9IGNvbmZpZ3MucmVkdWNlKChhY2MsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IHsgcm91dGVDaGFydCwgYWN0aW9uIH0gPSBjb25maWdcbiAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnQocm91dGVDaGFydClcbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICBhbGxSb3V0ZXMucHVzaCguLi5yb3V0ZXMpXG4gICAgfVxuICAgIHJldHVybiBbXG4gICAgICAuLi5hY2MsXG4gICAgICAuLi50cmFuc2l0aW9ucy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IFtmcm9tU3RhdGUsIHRvU3RhdGVdID0gdHJhbnNpdGlvblxuICAgICAgICByZXR1cm4geyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9XG4gICAgICB9KVxuICAgIF1cbiAgfSwgW10pXG5cbiAgcmV0dXJuIHtcbiAgICBjb25maWdzOiBfY29uZmlncyxcbiAgICBzdGF0ZXM6IGFsbFN0YXRlcyxcbiAgICByb3V0ZXM6IGFsbFJvdXRlc1xuICB9XG59XG5cbi8qKlxuICogVGVzdHMgdGhhdCBhbiBvYmplY3QgaXMgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICpcbiAqIGlzU3RhdGVib3QobWFjaGluZSlcbiAqIC8vIHRydWVcbiAqXG4gKiBAcGFyYW0ge2FueX0gb2JqZWN0IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5cbmZ1bmN0aW9uIGlzU3RhdGVib3QgKG9iamVjdCkge1xuICByZXR1cm4gKFxuICAgIGlzUG9qbyhvYmplY3QpICYmXG4gICAgdHlwZW9mIG9iamVjdC5fX1NUQVRFQk9UX18gPT09ICdudW1iZXInXG4gIClcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEFTU0VSVElPTiBIRUxQRVJTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcm91dGVJc1Bvc3NpYmxlLFxuICBhc3NlcnRSb3V0ZVxufVxuXG5jb25zdCB7IGlzU3RhdGVib3QgfSA9IHJlcXVpcmUoJy4vc3RhdGVib3QnKVxuY29uc3QgeyBkZWNvbXBvc2VSb3V0ZSB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcbmNvbnN0IHtcbiAgRGVmZXIsXG4gIE9uY2UsXG4gIFJldm9rYWJsZSxcbiAgTG9nZ2VyLFxuICBBcmdUeXBlRXJyb3IsXG4gIGlzVGVtcGxhdGVMaXRlcmFsXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcignc3RhdGVib3QuJylcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhIGNlcnRhaW4gcm91dGUgY2FuIGJlIGZvbGxvd2VkIGJ5IGFcbiAqIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICpcbiAqIFRoaXMgbWVyZWx5IHRlc3RzIHRoYXQgYSBjZXJ0YWluIHBhdGggY2FuIGJlIHRha2VuIHRocm91Z2ggYVxuICogc3RhdGUtbWFjaGluZS4gSXQgZG9lc24ndCBhc3NlcnQgdGhhdCB0aGUgc3RhdGVzIGFyZSBtb3ZlZC10aHJvdWdoXG4gKiB3aGlsZSB0aGUgbWFjaGluZSBpcyB3b3JraW5nLCBhcyB3aXRoXG4gKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAqICBUaGUgbWFjaGluZSB0byB0ZXN0IHRoZSByb3V0ZSBvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSByb3V0ZVxuICogIFRoZSByb3V0ZSB0byB0ZXN0IGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gKlxuICogIGBcbiAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICogIGBcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAqXG4gKiByb3V0ZUlzUG9zc2libGUobWFjaGluZSxcbiAqICAgJ3dhbGtpbmcgLT4gZmFsbGluZyAtPiBzcGxhdHRpbmcgLT4gd2Fsa2luZydcbiAqIClcbiAqIC8vIGZhbHNlXG4gKi9cblxuZnVuY3Rpb24gcm91dGVJc1Bvc3NpYmxlIChtYWNoaW5lLCByb3V0ZSkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3JvdXRlSXNQb3NzaWJsZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCByb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCByb3V0ZVxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgX3JvdXRlID0gZGVjb21wb3NlUm91dGUocm91dGUpXG4gIHJldHVybiBfcm91dGUuZXZlcnkoKHN0YXRlLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA9PT0gX3JvdXRlLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IF9yb3V0ZVtpbmRleCArIDFdXG4gICAgICBjb25zdCBhdmFpbGFibGVTdGF0ZXMgPSBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKHN0YXRlKVxuICAgICAgY29uc3QgcGFzc2VzID0gYXZhaWxhYmxlU3RhdGVzLmluY2x1ZGVzKG5leHRTdGF0ZSlcbiAgICAgIHJldHVybiBwYXNzZXNcbiAgICB9XG4gIH0pXG59XG5cbmxldCBhc3NlcnRpb25JZCA9IDBcblxuLyoqXG4gKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0gb3B0aW9ucy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IGFzc2VydFJvdXRlT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkZXNjcmlwdGlvbl1cbiAqICBEZXNjcmliZSB0aGUgc3VjY2Vzcy1jb25kaXRpb24gZm9yIHRoaXMgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtmcm9tU3RhdGU9XCJcIl1cbiAqICBXYWl0IGZvciB0aGUgbWFjaGluZSB0byBiZSBpbiB0aGlzIHN0YXRlIGJlZm9yZSBhc3NlcnRpb24gYmVnaW5zLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW3J1bl1cbiAqICBSdW4gdGhpcyBmdW5jdGlvbiBqdXN0IGJlZm9yZSBzdGFydGluZyB0aGUgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtwZXJtaXR0ZWREZXZpYXRpb25zPTBdXG4gKiAgSWYgd2UgaGl0IGFuIHVuZXhwZWN0ZWQgc3RhdGUgZHVyaW5nIGFzc2VydGlvbiwgdGhpcyBpcyBhIFwiZGV2aWF0aW9uXCIuXG4gKiAgSXQgbWlnaHQgYmUgdGhhdCB0aGUgRlNNIHdpbGwgY29tZSBiYWNrIHRvIHRoZSBleHBlY3RlZCBzdGF0ZSBhZ2FpblxuICogIGFmdGVyIGEgY2VydGFpbiBudW1iZXIgb2YgdGhlc2UuIEZvciBleGFtcGxlLCBpZiB5b3VyIEZTTSBoYXMgYVxuICogIFwicmV0cnlcIiByb3V0ZSBjb25maWd1cmVkLCB0aGlzIG51bWJlciBjYW4gYWNjb3VudCBmb3IgaXQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3RpbWVvdXRJbk1zPTEwMDBdXG4gKiAgUGVybWl0dGVkIGxlbmd0aCBvZiB0aW1lIGZvciB0aGUgZW50aXJlIGFzc2VydGlvbiwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIE5vcm1hbGx5IHdlIHdhbnQgbG9ncyBmb3IgYXNzZXJ0aW9ucywgcmlnaHQ/IFdlbGwsIHlvdSBjYW4gdHVuZVxuICogIHRoZW0ganVzdCBsaWtlIHlvdSBjYW4gd2l0aCB7QGxpbmsgI3N0YXRlYm90b3B0aW9uc3xzdGF0ZWJvdE9wdGlvbnN9LlxuICovXG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfSB0cmFjZWQgdGhlIHJvdXRlIHNwZWNpZmllZC5cbiAqXG4gKiBXaGVyZWFzIHtAbGluayAjc3RhdGVib3Ryb3V0ZWlzcG9zc2libGV8cm91dGVJc1Bvc3NpYmxlKCl9IG9ubHkgY2hlY2tzXG4gKiB0aGF0IGEgcGFydGljdWxhciByb3V0ZSBjYW4gYmUgZm9sbG93ZWQsIGBhc3NlcnRSb3V0ZWAgd2lsbCBob29rLWludG9cbiAqIGEgbWFjaGluZSBhbmQgd2FpdCBmb3IgaXQgdG8gdHJhY2UgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGhpbiBhXG4gKiB0aW1lb3V0IHBlcmlvZC5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQGFzeW5jXG4gKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gKiAgVGhlIG1hY2hpbmUgdG8gcnVuIHRoZSBhc3NlcnRpb24gb24uXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZXhwZWN0ZWRSb3V0ZVxuICogIFRoZSBleHBlY3RlZCByb3V0ZSBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICpcbiAqICBgXG4gKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAqICBgXG4gKiBAcGFyYW0ge2Fzc2VydFJvdXRlT3B0aW9uc30gW29wdGlvbnNdXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gKlxuICogYXNzZXJ0Um91dGUoXG4gKiAgIG1hY2hpbmUsICdwcmVwYXJlIC0+IGRlYm91bmNlIC0+IHNlbmRpbmcgLT4gZG9uZSAtPiBpZGxlJyxcbiAqICAge1xuICogICAgIGRlc2NyaXB0aW9uOiAnRW1haWwgc2VudCB3aXRoIG5vIGlzc3VlcycsXG4gKiAgICAgZnJvbVN0YXRlOiAnaWRsZScsXG4gKiAgICAgdGltZW91dEluTXM6IDEwMDAgKiAyMCxcbiAqICAgICBwZXJtaXR0ZWREZXZpYXRpb25zOiAwLFxuICogICAgIGxvZ0xldmVsOiAzXG4gKiAgIH1cbiAqIClcbiAqIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdBc3NlcnRpb24gcGFzc2VkIScpKVxuICogLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGBXaG9vcHM6ICR7ZXJyfWApKVxuICpcbiAqIG1hY2hpbmUuZW50ZXIoJ2lkbGUnKVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydFJvdXRlIChtYWNoaW5lLCBleHBlY3RlZFJvdXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignYXNzZXJ0Um91dGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBhc3NlcnRpb25JZCArPSAxXG5cbiAgY29uc3Qge1xuICAgIGRlc2NyaXB0aW9uID0gJ0Fzc2VydGlvbiBjb21wbGV0ZScsXG4gICAgZnJvbVN0YXRlID0gJycsXG4gICAgcnVuID0gKCkgPT4ge30sXG4gICAgcGVybWl0dGVkRGV2aWF0aW9ucyA9IDAsXG4gICAgdGltZW91dEluTXMgPSAxMDAwLFxuICAgIGxvZ0xldmVsID0gM1xuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG5cbiAgY29uc3QgcHJlZml4ID0gYFN0YXRlYm90WyR7bWFjaGluZS5uYW1lKCl9XTogYUlkPCR7YXNzZXJ0aW9uSWR9PmBcbiAgY29uc3Qgcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShleHBlY3RlZFJvdXRlKVxuXG4gIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06IEFzc2VydGluZyByb3V0ZTogWyR7cm91dGUuam9pbignID4gJyl9XWApXG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH06ID4gQXNzZXJ0aW9uIHdpbGwgc3RhcnQgZnJvbSBzdGF0ZTogXCIke2Zyb21TdGF0ZX1cImApXG5cbiAgY29uc3QgZnJvbVN0YXRlQWN0aW9uRm4gPSBEZWZlcihydW4pXG4gIGxldCByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9ICgpID0+IHsgfVxuXG4gIGNvbnN0IHRvdGFsVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IGFzc2VydGlvblRpbWVvdXRUaW1lclxuICBsZXQgZGV2aWF0aW9ucyA9IDBcbiAgbGV0IHBlbmRpbmcgPSB0cnVlXG4gIGxldCB1bmV4cGVjdGVkID0gZmFsc2VcblxuICBjb25zdCBjb25zdW1lUm91dGUgPSBbLi4ucm91dGVdXG4gIGNvbnN0IHJlcG9ydCA9IFRhYmxlKFxuICAgIFsnc3RhdGUnLCAnZXhwZWN0ZWQnLCAnaW5mbycsICd0b29rJ10sXG4gICAgWydjZW50ZXInLCAnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXVxuICApXG5cbiAgY29uc3QgZmluYWxpc2VSZXBvcnQgPSBPbmNlKGVyciA9PiB7XG4gICAgYWRkUm93KCcnLCAnJywgJycsICdUT1RBTDogJyArIHRvdGFsVGltZVRha2VuKCkpXG4gICAgcmVwb3J0LmxvY2soKVxuICAgIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06ICR7ZGVzY3JpcHRpb259OiBbJHtlcnIgPyAnRkFJTEVEJyA6ICdTVUNDRVNTJ31dYClcbiAgICBjb25zb2xlLnRhYmxlKHJlcG9ydC5jb250ZW50KCkpXG4gICAgcmV0dXJuIGVyclxuICB9KVxuXG4gIGNvbnN0IHsgYWRkUm93IH0gPSByZXBvcnRcbiAgZnVuY3Rpb24gZW50ZXJlZFN0YXRlIChzdGF0ZSkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICBhZGRSb3coc3RhdGUsICctJywgJ1BFTkRJTkcnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlWzBdXG4gICAgICBpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCB1bmV4cGVjdGVkID8gJ1JFQUxJR05FRCcgOiAnT0tBWScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgICBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCAnV1JPTkcgU1RBVEUnLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gdHJ1ZVxuICAgICAgICBkZXZpYXRpb25zICs9IDFcbiAgICAgIH1cbiAgICAgIHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKCdOTyBST1VURSBUTyBURVNUJykpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZXNvbHZlKC4uLmFyZ3MpXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVqZWN0ID0gZXJyID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlamVjdChlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgYmFpbG91dCA9IG1lc3NhZ2UgPT4ge1xuICAgICAgd2hpbGUgKGNvbnN1bWVSb3V0ZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICAgIGFkZFJvdyhtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpLCBgKCR7ZXhwZWN0ZWRTdGF0ZX0pYCwgbWVzc2FnZSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBjbGVhclRpbWVvdXRBbmRSZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKG1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBpZiAobWFjaGluZS5pblN0YXRlKGZyb21TdGF0ZSkpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgfVxuXG4gICAgY29uc3QgeyByZXZva2UsIGZuIH0gPSBSZXZva2FibGUoc3RhdGUgPT4ge1xuICAgICAgYXNzZXJ0aW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RJTUVPVVQnKVxuICAgICAgfSwgdGltZW91dEluTXMpXG5cbiAgICAgIGVudGVyZWRTdGF0ZShzdGF0ZSlcbiAgICAgIGlmIChwZW5kaW5nICYmIHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgfVxuICAgICAgaWYgKGRldmlhdGlvbnMgPiBwZXJtaXR0ZWREZXZpYXRpb25zKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RPTyBNQU5ZIERFVklBVElPTlMnKVxuICAgICAgfVxuICAgICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBjbGVhclRpbWVvdXRBbmRSZXNvbHZlKGZpbmFsaXNlUmVwb3J0KCkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIgPSBtYWNoaW5lLm9uU3dpdGNoaW5nKGZuKVxuICB9KVxufVxuXG5mdW5jdGlvbiBUYWJsZSAoY29sdW1ucyA9IFtdLCBhbGlnbm1lbnRzID0gW10pIHtcbiAgY29uc3QgdGFibGUgPSBbXVxuICBjb25zdCBhbGlnbm1lbnQgPSBjb2x1bW5zLm1hcCgoXywgaW5kZXgpID0+IGFsaWdubWVudHNbaW5kZXhdIHx8ICdjZW50ZXInKVxuXG4gIGxldCBsb2NrZWQgPSBmYWxzZVxuICBmdW5jdGlvbiBsb2NrICgpIHtcbiAgICBsb2NrZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSb3cgKC4uLmFyZ3MpIHtcbiAgICBpZiAobG9ja2VkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgb2JqID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXJnc1tpbmRleF0gfHwgJydcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IHJvd1xuICAgICAgfVxuICAgIH0sIHt9KVxuICAgIHRhYmxlLnB1c2gob2JqKVxuICB9XG5cbiAgZnVuY3Rpb24gY29sU2l6ZXMgKCkge1xuICAgIHJldHVybiB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiBjb2x1bW5zLm1hcCgoY29sLCBpbmRleCkgPT4gTWF0aC5tYXgocm93W2NvbF0ubGVuZ3RoLCBhY2NbaW5kZXhdKSksIGNvbHVtbnMubWFwKCgpID0+IDApKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkTGVmdCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gc3RyICsgJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkUmlnaHQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aCkgKyBzdHJcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHNpemVzID0gY29sU2l6ZXMoKVxuICAgIGZ1bmN0aW9uIGZvcm1hdEZpZWxkICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBzaXplc1tpbmRleF1cbiAgICAgIGNvbnN0IGFsaWduID0gYWxpZ25tZW50W2luZGV4XVxuICAgICAgaWYgKGFsaWduID09PSAnbGVmdCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZExlZnQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICBpZiAoYWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZFJpZ2h0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGNvbnN0IG91dHB1dCA9IHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFJvdyA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+ICh7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IGZvcm1hdEZpZWxkKHJvd1tjb2xdLCBpbmRleClcbiAgICAgIH0pLCB7fSlcbiAgICAgIHJldHVybiBbLi4uYWNjLCBmb3JtYXR0ZWRSb3ddXG4gICAgfSwgW10pXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2NrOiBsb2NrLFxuICAgIGFkZFJvdzogYWRkUm93LFxuICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBUaW1lVGFrZW4gKCkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cbiAgZnVuY3Rpb24gZm10IChudW0sIGRpZ2l0cykge1xuICAgIHJldHVybiBudW0udG9GaXhlZChkaWdpdHMpLnJlcGxhY2UoL1xcLjArJC8sICcnKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydFRpbWVcblxuICAgIGlmIChkdXJhdGlvbiA8IDUwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbil9IG1zYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA1MDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMil9IHMgYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA2MDAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDEpfSBzIGBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAgLyA2MCwgMSl9IG0gYFxuICAgIH1cbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRVhQT1JUU1xuLy9cblxuY29uc3QgeyBTdGF0ZWJvdCwgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGFzc2VydFJvdXRlLCByb3V0ZUlzUG9zc2libGUgfSA9IHJlcXVpcmUoJy4vYXNzZXJ0aW9ucycpXG5jb25zdCB7IGRlY29tcG9zZUNoYXJ0IH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuXG4vKipcbiAqIDxpbWcgc3JjPVwiLi9sb2dvLWZ1bGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDI1NXB4OyBtYXJnaW46IDEwcHggMDtcIiAvPlxuICpcbiAqIFdyaXRlIG1vcmUgcm9idXN0IGFuZCB1bmRlcnN0YW5kYWJsZSBwcm9ncmFtcy5cbiAqXG4gKiBTdGF0ZWJvdCBob3BlcyB0byBtYWtlIFtGaW5pdGUgU3RhdGUgTWFjaGluZXNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpbml0ZS1zdGF0ZV9tYWNoaW5lKSAoRlNNcykgYSBsaXR0bGUgbW9yZSBhY2Nlc3NpYmxlLlxuICpcbiAqIFlvdSdyZSByZWFkaW5nIHRoZSBkb2N1bWVudGF0aW9uLiBPdGhlciBleGl0cyBhcmU6XG4gKlxuICogLSBUaGUgW1JFQURNRSBmaWxlXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90L2Jsb2IvbWFzdGVyL1JFQURNRS5tZClcbiAqIC0gVGhlIFtHaXRodWIgUmVwb10oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdClcbiAqIC0gVGhlIHNoZWxsLXNjcmlwdCB2ZXJzaW9uLCBbU3RhdGVib3Qtc2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3Qtc2gpXG4gKlxuICogU3RhdGVib3Qgd2FzIHdyaXR0ZW4gYnkgW0NvbmFuIFRoZW9iYWxkXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyLykgYW5kXG4gKiBpcyBbSVNDIGxpY2Vuc2VkXSguLi9MSUNFTlNFKS5cbiAqXG4gKiAjIyMgSnVtcCByaWdodCBpblxuICpcbiAqIFlvdSBjYW4gaW5zdGFsbCBTdGF0ZWJvdCBpbnRvIHlvdXIgYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBzaFxuICogbnBtIGkgc3RhdGVib3RcbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgc3RhdGVib3QgZnJvbSAnc3RhdGVib3QnXG4gKiBgYGBcbiAqXG4gKiBPciBub24tYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBqc1xuICogPHNjcmlwdCBzcmM9XCJodHRwczovL3VucGtnLmNvbS9zdGF0ZWJvdEAyLjIuMS9kaXN0L2Jyb3dzZXIvc3RhdGVib3QubWluLmpzXCI+PC9zY3JpcHQ+XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgeyBTdGF0ZWJvdCB9ID0gc3RhdGVib3RcbiAqIC8vIE1ha2UgbWFjaGluZXMgd2l0aCBTdGF0ZWJvdCgpXG4gKlxuICogY29uc3QgeyBpc1N0YXRlYm90LCByb3V0ZUlzUG9zc2libGUsIGFzc2VydFJvdXRlIH0gPSBzdGF0ZWJvdFxuICogLy8gVGhlc2UgYXJlIGFzc2VydGlvbiBoZWxwZXJzIHlvdSBjYW4gdXNlIGZvciB0ZXN0aW5nXG4gKiBgYGBcbiAqXG4gKiAjIyMgT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgOilcbiAqXG4gKiBJJ3ZlIGluY2x1ZGVkIFN0YXRlYm90IGluIHRoaXMgcGFnZS4gT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgdG9cbiAqIGZvbGxvdyBhbG9uZyB3aXRoIHRoZSBleGFtcGxlcyBiZWxvdzpcbiAqXG4gKiBgYGBqc1xuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncHJvbWlzZS1saWtlJywge1xuICogICBjaGFydDogYFxuICogICAgIC8vIFRoaXMgb25lIHdpbGwgYmVoYXZlIGEgYml0IGxpa2UgYSBQcm9taXNlXG4gKiAgICAgaWRsZSAtPiBwZW5kaW5nIC0+XG4gKiAgICAgICByZXNvbHZlZCB8IHJlamVjdGVkXG4gKlxuICogICAgIC8vIC4uLmFuZCB3ZSdyZSBkb25lXG4gKiAgICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICAgIHJlamVjdGVkIC0+IGRvbmVcbiAqICAgYCxcbiAqICAgc3RhcnRJbjogJ2lkbGUnXG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwZW5kaW5nJylcbiAqIC8vIHRydWVcbiAqXG4gKiBtYWNoaW5lLmVudGVyKCdwZW5kaW5nJylcbiAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICogLy8gW1wicmVzb2x2ZWRcIiwgXCJyZWplY3RlZFwiXVxuICogYGBgXG4gKlxuICogV2UgY2FuIGhvb2stdXAgZXZlbnRzIHdpdGgge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9OlxuICpcbiAqIGBgYGpzXG4gKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gKiAgJ3BlbmRpbmcgLT4gcmVzb2x2ZWQnOiB7XG4gKiAgICBvbjogJ2RhdGEtbG9hZGVkJ1xuICogIH0sXG4gKiAgJ3BlbmRpbmcgLT4gcmVqZWN0ZWQnOiB7XG4gKiAgICBvbjogWyd0aW1lb3V0JywgJ2RhdGEtZXJyb3InXSxcbiAqICAgIHRoZW46IChtc2cpID0+IHtcbiAqICAgICAgY29uc29sZS53YXJuKCdVaCBvaC4uLicsIG1zZylcbiAqICAgIH1cbiAqICB9LFxuICogICdyZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmUnOiB7XG4gKiAgICBvbjogJ3RoYXRzLWFsbC1mb2xrcydcbiAqICB9XG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuZW1pdCgnZGF0YS1lcnJvcicsICdEaWQgeW91IGhlYXIgdGhhdD8nKVxuICogYGBgXG4gKlxuICogSGVyZSdzIHRoZSBBUEk6XG4gKlxuICogfCBIaXRjaGVycyB8IFN0YXR1cyB8IEFjdGlvbnMgfFxuICogfC18LXwtfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudCAub25FdmVudCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jYW50cmFuc2l0aW9udG8gLmNhblRyYW5zaXRpb25UbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21zdGF0ZXNhdmFpbGFibGVmcm9taGVyZSAuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfSAvIHtAbGluayAjZW1pdC1ldmVudG5hbWUgLkVtaXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb250cmFuc2l0aW9ucyAub25UcmFuc2l0aW9ucygpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGUgLmN1cnJlbnRTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21wcmV2aW91c3N0YXRlIC5wcmV2aW91c1N0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3RvcnkgLmhpc3RvcnkoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IC8ge0BsaW5rICNlbnRlci1zdGF0ZSAuRW50ZXIoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyZWQgLm9uRW50ZXJlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlIC5pblN0YXRlKCl9IC8ge0BsaW5rICNpbnN0YXRlLXN0YXRlLW91dHB1dHdoZW50cnVlLWN1cnJpZWRmbmFyZ3MgLkluU3RhdGUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXQgLnJlc2V0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbmZvIC5pbmZvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWluc3BlY3QgLmluc3BlY3QoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtbmFtZSAubmFtZSgpfSB8ICB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSB8ICB8ICB8XG4gKlxuICogPGltZyBzcmM9XCIuL2xvZ28tc21hbGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDc1cHg7IG1hcmdpbjogMTVweCAwIDAgNXB4O1wiIC8+XG4gKlxuICogQG1vZHVsZSBzdGF0ZWJvdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTdGF0ZWJvdCxcbiAgaXNTdGF0ZWJvdCxcbiAgcm91dGVJc1Bvc3NpYmxlLFxuICBhc3NlcnRSb3V0ZSxcbiAgZGVjb21wb3NlQ2hhcnRcbn1cbiJdLCJuYW1lcyI6WyJ1bmlxIiwiQXJnVHlwZUVycm9yIiwiaXNUZW1wbGF0ZUxpdGVyYWwiLCJyZXF1aXJlJCQwIiwiaXNBcnJheSIsImlzRXZlbnRFbWl0dGVyIiwiaXNGdW5jdGlvbiIsImlzUG9qbyIsImlzU3RyaW5nIiwiTG9nZ2VyIiwiUmVmZXJlbmNlQ291bnRlciIsImRlY29tcG9zZUNoYXJ0IiwiY3hBcnJvdyIsInJlcXVpcmUkJDEiLCJldmVudHMiLCJFdmVudEVtaXR0ZXIiLCJpc1N0YXRlYm90IiwiZGVjb21wb3NlUm91dGUiLCJEZWZlciIsIk9uY2UiLCJSZXZva2FibGUiLCJyZXF1aXJlJCQyIiwiYXJnVHlwZUVycm9yIiwiU3RhdGVib3QiLCJhc3NlcnRSb3V0ZSIsInJvdXRlSXNQb3NzaWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLFNBQWMsR0FBRztBQUNqQixFQUFFLE9BQU87QUFDVCxFQUFFLGNBQWM7QUFDaEIsRUFBRSxVQUFVO0FBQ1osRUFBRSxNQUFNO0FBQ1IsRUFBRSxRQUFRO0FBQ1YsRUFBRSxpQkFBaUI7QUFDbkIsRUFBRSxJQUFJO0FBQ04sRUFBRSxLQUFLO0FBQ1AsRUFBRSxJQUFJO0FBQ04sRUFBRSxTQUFTO0FBQ1gsRUFBRSxnQkFBZ0I7QUFDbEIsRUFBRSxZQUFZO0FBQ2QsRUFBRSxNQUFNO0FBQ1IsRUFBQztBQUVELFNBQVMsT0FBTyxFQUFFLEdBQUcsRUFBRTtBQUN2QixFQUFFLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQVMsVUFBVSxFQUFFLEdBQUcsRUFBRTtBQUMxQixFQUFFLE9BQU8sT0FBTyxHQUFHLEtBQUssVUFBVTtBQUNsQyxDQUFDO0FBRUQsU0FBUyxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLEVBQUUsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRO0FBQ2hDLENBQUM7QUFFRCxTQUFTLFFBQVEsRUFBRSxHQUFHLEVBQUU7QUFDeEIsRUFBRSxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVE7QUFDaEMsQ0FBQztBQUVELFNBQVMsY0FBYyxFQUFFLEdBQUcsRUFBRTtBQUM5QixFQUFFO0FBQ0YsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ2pCLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDeEIsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUMvQixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO0FBQ2xDLEdBQUc7QUFDSCxDQUFDO0FBRUQsU0FBUyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3RCLEVBQUUsSUFBSSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDeEMsSUFBSSxPQUFPLEtBQUs7QUFDaEIsR0FBRztBQUNILEVBQUUsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxTQUFTO0FBQ3hELENBQUM7QUFFRCxTQUFTLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtBQUNqQyxFQUFFLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3JCLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUNILEVBQUUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QyxHQUFHO0FBQ0gsRUFBRSxPQUFPLEtBQUs7QUFDZCxDQUFDO0FBRUQsU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3RCLEVBQUUsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ3hGLENBQUM7QUFFRCxTQUFTLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUU7QUFDN0IsRUFBRSxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksRUFBQztBQUMxQyxFQUFFLE9BQU8sTUFBTTtBQUNmLElBQUksWUFBWSxDQUFDLEtBQUssRUFBQztBQUN2QixHQUFHO0FBQ0gsQ0FBQztBQUNELFNBQVMsS0FBSyxFQUFFLEVBQUUsRUFBRTtBQUNwQixFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ3hDLENBQUM7QUFFRCxTQUFTLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDbkIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFDO0FBQzNDLEVBQUUsSUFBSSxPQUFNO0FBQ1osRUFBRSxPQUFPLFVBQVUsR0FBRyxJQUFJLEVBQUU7QUFDNUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFDO0FBQ3pCLElBQUksTUFBTSxHQUFFO0FBQ1osSUFBSSxPQUFPLE1BQU07QUFDakIsR0FBRztBQUNILENBQUM7QUFFRCxTQUFTLFNBQVMsRUFBRSxFQUFFLEVBQUU7QUFDeEIsRUFBRSxJQUFJLE9BQU8sR0FBRyxNQUFLO0FBQ3JCLEVBQUUsSUFBSSxPQUFNO0FBQ1osRUFBRSxPQUFPO0FBQ1QsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksS0FBSztBQUNyQixNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDcEIsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFDO0FBQzVCLE9BQU87QUFDUCxNQUFNLE9BQU8sTUFBTTtBQUNuQixLQUFLO0FBQ0wsSUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixNQUFNLE9BQU8sR0FBRyxLQUFJO0FBQ3BCLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxTQUFTLEVBQUU7QUFDbEUsRUFBRSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDbkIsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSTtBQUN2QyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDO0FBQ2xCLEdBQUcsRUFBQztBQUNKLEVBQUUsU0FBUyxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQzFCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDO0FBQ2pDLElBQUksT0FBTyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUM7QUFDOUIsR0FBRztBQUNILEVBQUUsU0FBUyxRQUFRLEVBQUUsR0FBRyxFQUFFO0FBQzFCLElBQUksTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUM7QUFDbEMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDO0FBQ25DLEdBQUc7QUFDSCxFQUFFLFNBQVMsT0FBTyxFQUFFLEdBQUcsRUFBRTtBQUN6QixJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDMUIsR0FBRztBQUNILEVBQUUsU0FBUyxJQUFJLElBQUk7QUFDbkIsSUFBSSxPQUFPLEVBQUUsR0FBRyxLQUFLLEVBQUU7QUFDdkIsR0FBRztBQUNILEVBQUUsU0FBUyxLQUFLLElBQUk7QUFDcEIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQ3BDLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxLQUFLO0FBQzdCLFFBQVEsT0FBTztBQUNmLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRztBQUNyQixVQUFVLElBQUksRUFBRSxLQUFLLElBQUksTUFBTTtBQUMvQixTQUFTO0FBQ1QsT0FBTyxDQUFDO0FBQ1IsR0FBRztBQUNILEVBQUUsU0FBUyxPQUFPLElBQUk7QUFDdEIsSUFBSSxPQUFPO0FBQ1gsTUFBTSxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNwQixLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUUsT0FBTztBQUNULElBQUksUUFBUSxFQUFFLFFBQVE7QUFDdEIsSUFBSSxRQUFRLEVBQUUsUUFBUTtBQUN0QixJQUFJLE9BQU8sRUFBRSxPQUFPO0FBQ3BCLElBQUksT0FBTyxFQUFFLE9BQU87QUFDcEIsSUFBSSxJQUFJLEVBQUUsSUFBSTtBQUNkLEdBQUc7QUFDSCxDQUFDO0FBRUQsU0FBUyxZQUFZLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBRTtBQUN2QyxFQUFFLE9BQU8sVUFBVSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFO0FBQzdDLElBQUksTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDMUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztBQUNuQyxRQUFRLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ25DLE9BQU8sRUFBQztBQUVSLElBQUksTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDO0FBRXJELElBQUksTUFBTSxHQUFHLEdBQUcsSUFBSTtBQUNwQixPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEtBQUs7QUFDM0IsUUFBUSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUM7QUFDbEQsUUFBUSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDL0IsVUFBVSxPQUFPLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNuRCxTQUFTO0FBRVQsUUFBUSxJQUFJLFVBQVM7QUFDckIsUUFBUSxJQUFJLFNBQVE7QUFDcEIsUUFBUSxJQUFJLFlBQVc7QUFFdkIsUUFBUSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNqQyxVQUFVLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSTtBQUM3QyxVQUFVLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSTtBQUNqQyxVQUFVLFNBQVMsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMscUJBQXFCLEVBQUM7QUFDbkUsU0FBUyxNQUFNO0FBRWYsVUFBVSxXQUFXLEdBQUcsT0FBTyxHQUFHLEtBQUssUUFBTztBQUM5QyxVQUFVLFFBQVEsR0FBRyxRQUFPO0FBQzVCLFVBQVUsU0FBUyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLEVBQUM7QUFDckUsU0FBUztBQUVULFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUMxQixVQUFVO0FBQ1YsWUFBWSxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTyxDQUFDO0FBQ1IsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFDO0FBRXRCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7QUFDckIsTUFBTSxPQUFPLFNBQVM7QUFDdEIsS0FBSyxNQUFNO0FBQ1gsTUFBTTtBQUNOLFFBQVEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQ2xELFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNsRCxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDO0FBRUQsU0FBUyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3hCLEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBSztBQUNwQixFQUFFLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3hCLElBQUksTUFBTSxHQUFHLENBQUM7QUFDZCxNQUFNLElBQUksRUFBRSxDQUFDO0FBQ2IsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDYixNQUFNLElBQUksRUFBRSxDQUFDO0FBQ2IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUM7QUFDbkIsR0FBRztBQUNILEVBQUUsU0FBUyxPQUFPLElBQUk7QUFDdEIsSUFBSSxPQUFPLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLEdBQUc7QUFDSCxFQUFFLFNBQVMsTUFBTSxJQUFJO0FBQ3JCLElBQUksT0FBTyxNQUFNLElBQUksQ0FBQztBQUN0QixHQUFHO0FBQ0gsRUFBRSxTQUFTLE9BQU8sSUFBSTtBQUN0QixJQUFJLE9BQU8sTUFBTSxJQUFJLENBQUM7QUFDdEIsR0FBRztBQUNILEVBQUUsT0FBTztBQUNULElBQUksT0FBTztBQUNYLElBQUksTUFBTTtBQUNWLElBQUksT0FBTztBQUVYLElBQUksSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEtBQUssT0FBTyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN6RCxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDMUQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksS0FBSyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RELElBQUksSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEtBQUssT0FBTyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN6RCxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDOUMsR0FBRztBQUNIOztBQzlOQSxNQUFNLE1BQU0sR0FBRyxTQUFRO0FBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUc7QUFDbEIsTUFBTSxPQUFPLEdBQUcsS0FBSTtBQUNwQixNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDckMsR0FBRyxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2hELEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQztBQUVaLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQzFELE1BQU0sc0JBQXNCLEdBQUcsbUNBQWtDO0FBQ2pFLE1BQU0sU0FBUyxHQUFHLGlCQUFnQjtBQUVsQyxXQUFjLEdBQUc7QUFDakIsRUFBRSxNQUFNO0FBQ1IsRUFBRSxPQUFPO0FBQ1QsRUFBRSxzQkFBc0I7QUFDeEIsRUFBRSxjQUFjO0FBQ2hCLEVBQUUsY0FBYztBQUNoQixFQUFDO0FBRUQsTUFBTSxRQUFFQSxNQUFJLGdCQUFFQyxjQUFZLHFCQUFFQyxtQkFBaUIsRUFBRSxHQUFHQyxNQUFrQjtBQUVwRSxNQUFNLFlBQVksR0FBR0YsY0FBWSxDQUFDLFdBQVcsRUFBQztBQUU5QyxTQUFTLGNBQWMsRUFBRSxlQUFlLEVBQUU7QUFDMUMsRUFBRSxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsZ0JBQWdCO0FBQzNDLElBQUksRUFBRSxlQUFlLEVBQUVDLG1CQUFpQixFQUFFO0FBQzFDLElBQUksZUFBZTtBQUNuQixJQUFHO0FBQ0gsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUNYLElBQUksTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDO0FBQ3hCLEdBQUc7QUFFSCxFQUFFLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxlQUFlLEVBQUM7QUFDL0MsRUFBRSxNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQztBQUN0RCxFQUFFLE9BQU8sY0FBYztBQUN2QixDQUFDO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLFNBQVMsY0FBYyxFQUFFLEtBQUssRUFBRTtBQUNoQyxFQUFFLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxnQkFBZ0I7QUFDM0MsSUFBSSxFQUFFLEtBQUssRUFBRUEsbUJBQWlCLEVBQUU7QUFDaEMsSUFBSSxLQUFLO0FBQ1QsSUFBRztBQUNILEVBQUUsSUFBSSxHQUFHLEVBQUU7QUFDWCxJQUFJLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUN4QixHQUFHO0FBRUgsRUFBRSxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFDO0FBQ3JDLEVBQUUsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBQztBQUM3QyxFQUFFLE1BQU0sYUFBYSxHQUFHLGFBQWE7QUFDckMsS0FBSyxHQUFHLENBQUMsd0JBQXdCLENBQUM7QUFDbEMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFDO0FBRVosRUFBRSxNQUFNLGtCQUFrQixHQUFHLGFBQWE7QUFDMUMsS0FBSyxHQUFHLENBQUMsNkJBQTZCLENBQUM7QUFDdkMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFDO0FBRVosRUFBRSxNQUFNLE1BQU0sR0FBRyxHQUFFO0FBQ25CLEVBQUUsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtBQUNwRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUM7QUFDekIsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzlCLEdBQUcsRUFBQztBQUVKLEVBQUUsTUFBTSxjQUFjLEdBQUdGLE1BQUksQ0FBQyxTQUFTLEVBQUM7QUFDeEMsRUFBRSxNQUFNLGNBQWMsR0FBR0EsTUFBSSxDQUFDLE1BQU0sRUFBQztBQUNyQyxFQUFFLE9BQU87QUFDVCxJQUFJLFdBQVcsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xFLElBQUksTUFBTSxFQUFFLGNBQWM7QUFDMUIsSUFBSSxNQUFNLEVBQUUsY0FBYztBQUMxQixHQUFHO0FBQ0gsQ0FBQztBQUVELFNBQVMsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUM5QixFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDbkIsS0FBSyxJQUFJLEVBQUU7QUFDWCxLQUFLLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQzVELEtBQUssSUFBSSxFQUFFO0FBQ1gsQ0FBQztBQUVELFNBQVMsY0FBYyxFQUFFLFFBQVEsRUFBRTtBQUNuQyxFQUFFLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUM7QUFDbkMsRUFBRSxNQUFNLE1BQU0sR0FBRyxHQUFFO0FBRW5CLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLEtBQUs7QUFDeEMsSUFBSSxNQUFNLGFBQWEsR0FBRyxJQUFJO0FBQzlCLE9BQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7QUFDN0IsT0FBTyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxFQUFDO0FBRTFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN4QixNQUFNLE9BQU8sYUFBYTtBQUMxQixLQUFLO0FBRUwsSUFBSSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUNoRCxNQUFNLE9BQU8sYUFBYSxHQUFHLGFBQWE7QUFDMUMsS0FBSztBQUVMLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxFQUFDO0FBQzlDLElBQUksT0FBTyxFQUFFO0FBQ2IsR0FBRyxFQUFFLEVBQUUsRUFBQztBQUVSLEVBQUUsT0FBTyxNQUFNO0FBQ2YsQ0FBQztBQUVELFNBQVMsY0FBYyxFQUFFLEtBQUssRUFBRTtBQUNoQyxFQUFFLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBRUQsU0FBUyx3QkFBd0IsRUFBRSxJQUFJLEVBQUU7QUFDekMsRUFBRSxNQUFNLE1BQU0sR0FBRyxHQUFFO0FBRW5CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsRUFBRSxNQUFNLEtBQUs7QUFDMUMsSUFBSSxJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUU7QUFDbEMsTUFBTSxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDeEIsS0FBSztBQUVMLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBQztBQUM5QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUN0QixHQUFHLEVBQUUsS0FBSyxFQUFDO0FBRVgsRUFBRSxPQUFPLE1BQU07QUFDZixDQUFDO0FBRUQsU0FBUyw2QkFBNkIsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRTtBQUNoRSxFQUFFLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLEtBQUs7QUFDL0MsSUFBSSxHQUFHLEdBQUc7QUFDVixJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUk7QUFDL0IsTUFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztBQUNqQyxLQUFLLENBQUM7QUFDTixHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ1I7O0FDeEpBLFlBQWMsR0FBRztBQUNqQixFQUFFLFFBQVE7QUFDVixFQUFFLFVBQVU7QUFDWixFQUFDO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0EsTUFBTTtBQUNOLFdBQUVJLFNBQU87QUFDVCxrQkFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxFQUFFLElBQUk7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksRUFBRSxJQUFJO0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxLQUFLLEVBQUUsS0FBSztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxLQUFLLEVBQUUsS0FBSztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksRUFBRSxNQUFNLElBQUksRUFBRTtBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxFQUFFLE1BQU0sT0FBTyxFQUFFO0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxFQUFFLE9BQU87QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEVBQUUsTUFBTSxJQUFJO0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxFQUFFLE9BQU87QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTtBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTO0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksVUFBVSxFQUFFLGFBQWEsQ0FBQyxVQUFVO0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFdBQVcsRUFBRSxhQUFhLENBQUMsV0FBVztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsRUFBRSxXQUFXLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUM7QUFFNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrQkFBa0IsRUFBRSxXQUFXLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQztBQUV0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtPQUVjLEdBQUc7QUFDakIsWUFBRUUsVUFBUTtBQUNWLGNBQUVQLFlBQVU7QUFDWixtQkFBRVMsaUJBQWU7QUFDakIsZUFBRUQsYUFBVztBQUNiLGtCQUFFYixnQkFBYztBQUNoQjs7Ozs7Ozs7Ozs7Ozs7In0=
