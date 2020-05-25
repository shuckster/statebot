
/*
 * Statebot
 * v2.2.0
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
function decomposeChart (templateLiteral) {
  const err = argTypeError('decomposeChart',
    { templateLiteral: isTemplateLiteral$1 },
    templateLiteral
  );
  if (err) {
    throw TypeError(err)
  }
  const lines = condensedLines(templateLiteral);
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
 * @property {string} [startIn=<auto>]
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
  function Emit (eventName) {
    const err = argTypeError('Emit', { eventName: isString$1 }, eventName);
    if (err) {
      throw TypeError(err)
    }
    return (...args) => emit(eventName, ...args)
  }
  function Enter (state) {
    const err = argTypeError('Enter', { state: isString$1 }, state);
    if (err) {
      throw TypeError(err)
    }
    return (...args) => enter(state, ...args)
  }
  function InState (state, anyOrFn) {
    const err = argTypeError('InState', { state: isString$1 }, state);
    if (err) {
      throw TypeError(err)
    }
    return (...fnArgs) => inState(state, anyOrFn, ...fnArgs)
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
     *       .then(() => machine.enter('done', 'sent'))
     *       .catch(() => machine.enter('done', 'failed'))
     *   },
     *   'idle -> receiving': () => {
     *     receiveData()
     *       .then(() => machine.enter('done', 'received'))
     *       .catch(() => machine.enter('done', 'failed'))
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
     * machine.onTransitions(({ enter }) => ({
     *   'idle -> sending': () => {
     *     sendData()
     *       .then(() => enter('done', 'sent'))
     *       .catch(() => enter('done', 'failed'))
     *   },
     *   'idle -> receiving': () => {
     *     receiveData()
     *       .then(() => enter('done', 'received'))
     *       .catch(() => enter('done', 'failed'))
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
function isStatebot (machine) {
  return (
    isPojo$1(machine) &&
    typeof machine.__STATEBOT__ === 'number'
  )
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
function routeIsPossible (machine, expectedRoute) {
  const err = argTypeError$1('routeIsPossible',
    { machine: isStatebot$1, expectedRoute: isTemplateLiteral$2 },
    machine, expectedRoute
  );
  if (err) {
    throw TypeError(err)
  }
  const route = decomposeRoute$1(expectedRoute);
  return route.every((state, index) => {
    if (index === route.length - 1) {
      return true
    } else {
      const nextState = route[index + 1];
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
 * <script src="https://unpkg.com/statebot@2.2.0/dist/browser/statebot.min.js"></script>
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
 * | {@link #statebotfsmperformtransitions .performTransitions()} / {@link #statebotfsmonevent .onEvent()} | {@link #statebotfsmcantransitionto .canTransitionTo()} / {@link #statebotfsmstatesavailablefromhere .statesAvailableFromHere()} | {@link #statebotfsmemit .emit()} / {@link #emit-name .Emit()} |
 * | {@link #statebotfsmontransitions .onTransitions()} | {@link #statebotfsmcurrentstate .currentState()} / {@link #statebotfsmpreviousstate .previousState()} / {@link #statebotfsmhistory .history()} | {@link #statebotfsmenter .enter()} / {@link #enter-state-1 .Enter()} |
 * | {@link #statebotfsmonentering .onEntering()} / {@link #statebotfsmonentered .onEntered()} | {@link #statebotfsminstate .inState()} / {@link #instate-state-outputwhentrue-1 .InState()} | {@link #statebotfsmreset .reset()} |
 * | {@link #statebotfsmonexiting .onExiting()} / {@link #statebotfsmonexited .onExited()} | {@link #statebotfsminfo .info()} / {@link #statebotfsminspect .inspect()} / {@link #statebotfsmname .name()} |  |
 * | {@link #statebotfsmonswitching .onSwitching()} / {@link #statebotfsmonswitched .onSwitched()} |  |  |
 *
 * <img src="./logo-small.png" style="max-width: 75px; margin: 15px 0 0 5px;" />
 *
 * @module statebot
 */
var src = {
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
   * @returns {statebotFsm}
   */
  Statebot: Statebot$1,
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
   * @param {any} [object] The object to test.
   * @returns {boolean}
   */
  isStatebot: isStatebot$2,
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
  routeIsPossible: routeIsPossible$1,
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
  assertRoute: assertRoute$1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVib3QuZGV2LmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMuanMiLCIuLi8uLi9zcmMvcGFyc2luZy5qcyIsIi4uLy4uL3NyYy9zdGF0ZWJvdC5qcyIsIi4uLy4uL3NyYy9hc3NlcnRpb25zLmpzIiwiLi4vLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLy9cbi8vIFNUQVRFQk9UIFVUSUxTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheSxcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzRnVuY3Rpb24sXG4gIGlzUG9qbyxcbiAgaXNTdHJpbmcsXG4gIGlzVGVtcGxhdGVMaXRlcmFsLFxuICB1bmlxLFxuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBSZWZlcmVuY2VDb3VudGVyLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlclxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChvYmopIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKVxufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbidcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZydcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNFdmVudEVtaXR0ZXIgKG9iaikge1xuICByZXR1cm4gKFxuICAgIGlzT2JqZWN0KG9iaikgJiZcbiAgICBpc0Z1bmN0aW9uKG9iai5lbWl0KSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLmFkZExpc3RlbmVyKSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLnJlbW92ZUxpc3RlbmVyKVxuICApXG59XG5cbmZ1bmN0aW9uIGlzUG9qbyAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgKCFpc09iamVjdChvYmopKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZVxufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTGl0ZXJhbCAob2JqKSB7XG4gIGlmIChpc1N0cmluZyhvYmopKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5ldmVyeShpdGVtID0+IGlzU3RyaW5nKGl0ZW0pKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiB1bmlxIChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIG9uZSkgPT4gKGFjYy5pbmRleE9mKG9uZSkgPT09IC0xID8gWy4uLmFjYywgb25lXSA6IGFjYyksIFtdKVxufVxuXG5mdW5jdGlvbiBkZWZlciAoZm4sIC4uLmFyZ3MpIHtcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCAwLCAuLi5hcmdzKVxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuZnVuY3Rpb24gRGVmZXIgKGZuKSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4gZGVmZXIoZm4sIC4uLmFyZ3MpXG59XG5cbmZ1bmN0aW9uIE9uY2UgKGZuKSB7XG4gIGNvbnN0IHsgcmV2b2tlLCBmbjogX2ZuIH0gPSBSZXZva2FibGUoZm4pXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgcmVzdWx0ID0gX2ZuKC4uLmFyZ3MpXG4gICAgcmV2b2tlKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZnVuY3Rpb24gUmV2b2thYmxlIChmbikge1xuICBsZXQgcmV2b2tlZCA9IGZhbHNlXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIHtcbiAgICBmbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICghcmV2b2tlZCkge1xuICAgICAgICByZXN1bHQgPSBmbiguLi5hcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgcmV2b2tlOiAoKSA9PiB7XG4gICAgICByZXZva2VkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBSZWZlcmVuY2VDb3VudGVyIChuYW1lLCBraW5kLCBkZXNjcmlwdGlvbiwgLi4uZXhwZWN0aW5nKSB7XG4gIGNvbnN0IF9yZWZzID0ge307XG4gIFsuLi5leHBlY3RpbmddLmZsYXQoKS5mb3JFYWNoKHJlZiA9PiB7XG4gICAgX3JlZnNbcmVmXSA9IDBcbiAgfSlcbiAgZnVuY3Rpb24gaW5jcmVhc2UgKHJlZikge1xuICAgIF9yZWZzW3JlZl0gPSBjb3VudE9mKHJlZikgKyAxXG4gICAgcmV0dXJuICgpID0+IGRlY3JlYXNlKHJlZilcbiAgfVxuICBmdW5jdGlvbiBkZWNyZWFzZSAocmVmKSB7XG4gICAgY29uc3QgY291bnQgPSBjb3VudE9mKHJlZikgLSAxXG4gICAgX3JlZnNbcmVmXSA9IE1hdGgubWF4KGNvdW50LCAwKVxuICB9XG4gIGZ1bmN0aW9uIGNvdW50T2YgKHJlZikge1xuICAgIHJldHVybiBfcmVmc1tyZWZdIHx8IDBcbiAgfVxuICBmdW5jdGlvbiByZWZzICgpIHtcbiAgICByZXR1cm4geyAuLi5fcmVmcyB9XG4gIH1cbiAgZnVuY3Rpb24gdGFibGUgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhfcmVmcykuc29ydCgpXG4gICAgICAubWFwKGtleSA9PiBba2V5LCBfcmVmc1trZXldXSlcbiAgICAgIC5tYXAoKFtyZWYsIGNvdW50XSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFtraW5kXTogcmVmLFxuICAgICAgICAgIHJlZnM6IGNvdW50IHx8ICdOb25lJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHRvVmFsdWUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNjcmlwdGlvbjogYFN0YXRlYm90WyR7bmFtZX1dOiAke2Rlc2NyaXB0aW9ufTpgLFxuICAgICAgdGFibGU6IHRhYmxlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpbmNyZWFzZTogaW5jcmVhc2UsXG4gICAgZGVjcmVhc2U6IGRlY3JlYXNlLFxuICAgIGNvdW50T2Y6IGNvdW50T2YsXG4gICAgdG9WYWx1ZTogdG9WYWx1ZSxcbiAgICByZWZzOiByZWZzXG4gIH1cbn1cblxuZnVuY3Rpb24gQXJnVHlwZUVycm9yIChlcnJQcmVmaXggPSAnJykge1xuICByZXR1cm4gZnVuY3Rpb24gKGZuTmFtZSwgdHlwZU1hcCwgLi4uYXJncykge1xuICAgIGNvbnN0IGFyZ01hcCA9IE9iamVjdC5lbnRyaWVzKHR5cGVNYXApXG4gICAgICAubWFwKChbYXJnTmFtZSwgYXJnVHlwZV0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgYXJnTmFtZSwgYXJnVHlwZSB9XG4gICAgICB9KVxuXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gT2JqZWN0LmtleXModHlwZU1hcCkuam9pbignLCAnKVxuXG4gICAgY29uc3QgZXJyID0gYXJnc1xuICAgICAgLm1hcCgoYXJnLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IGFyZ05hbWUsIGFyZ1R5cGUgfSA9IGFyZ01hcFtpbmRleF1cbiAgICAgICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGBBcmd1bWVudCB1bmRlZmluZWQ6IFwiJHthcmdOYW1lfVwiYFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yRGVzY1xuICAgICAgICBsZXQgdHlwZU5hbWVcbiAgICAgICAgbGV0IHR5cGVNYXRjaGVzXG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oYXJnVHlwZSkpIHtcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IGFyZ1R5cGUoYXJnKSA9PT0gdHJ1ZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZS5uYW1lXG4gICAgICAgICAgZXJyb3JEZXNjID0gYCR7dHlwZU5hbWV9KCR7YXJnTmFtZX0pIGRpZCBub3QgcmV0dXJuIHRydWVgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuICAgICAgICAgIHR5cGVNYXRjaGVzID0gdHlwZW9mIGFyZyA9PT0gYXJnVHlwZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGBBcmd1bWVudCBcIiR7YXJnTmFtZX1cIiBzaG91bGQgYmUgYSAke3R5cGVOYW1lfWBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHlwZU1hdGNoZXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYCR7ZXJyb3JEZXNjfTogJHthcmdOYW1lfSA9PT0gJHt0eXBlb2YgYXJnfSgke2FyZ30pYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcblxuICAgIGlmICghZXJyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgXFxuJHtlcnJQcmVmaXh9JHtmbk5hbWV9KCR7c2lnbmF0dXJlfSk6XFxuYCArXG4gICAgICAgIGAke2Vyci5tYXAoZXJyID0+IGA+ICR7ZXJyfWApLmpvaW4oJ1xcbicpfWBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gTG9nZ2VyIChsZXZlbCkge1xuICBsZXQgX2xldmVsID0gbGV2ZWxcbiAgaWYgKGlzU3RyaW5nKF9sZXZlbCkpIHtcbiAgICBfbGV2ZWwgPSAoe1xuICAgICAgaW5mbzogMyxcbiAgICAgIGxvZzogMixcbiAgICAgIHdhcm46IDEsXG4gICAgICBub25lOiAwXG4gICAgfSlbX2xldmVsXSB8fCAzXG4gIH1cbiAgZnVuY3Rpb24gY2FuV2FybiAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAxXG4gIH1cbiAgZnVuY3Rpb24gY2FuTG9nICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDJcbiAgfVxuICBmdW5jdGlvbiBjYW5JbmZvICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDNcbiAgfVxuICByZXR1cm4ge1xuICAgIGNhbldhcm4sXG4gICAgY2FuTG9nLFxuICAgIGNhbkluZm8sXG5cbiAgICBpbmZvOiAoLi4uYXJncykgPT4gY2FuSW5mbygpICYmIGNvbnNvbGUuaW5mbyguLi5hcmdzKSxcbiAgICB0YWJsZTogKC4uLmFyZ3MpID0+IGNhbkxvZygpICYmIGNvbnNvbGUudGFibGUoLi4uYXJncyksXG4gICAgbG9nOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS5sb2coLi4uYXJncyksXG4gICAgd2FybjogKC4uLmFyZ3MpID0+IGNhbldhcm4oKSAmJiBjb25zb2xlLndhcm4oLi4uYXJncyksXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiBjb25zb2xlLmVycm9yKC4uLmFyZ3MpXG4gIH1cbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIENIQVJUL1JPVVRFIFBBUlNJTkdcbi8vXG5cbmNvbnN0IHJ4Q1JMRiA9IC9bXFxyXFxuXS9cbmNvbnN0IGN4UGlwZSA9ICd8J1xuY29uc3QgY3hBcnJvdyA9ICctPidcbmNvbnN0IHJ4T3BlcmF0b3JzID0gW2N4UGlwZSwgY3hBcnJvd11cbiAgLm1hcChyeFVuc2FmZSA9PiByeFVuc2FmZS5yZXBsYWNlKCd8JywgJ1xcXFx8JykpXG4gIC5qb2luKCd8JylcblxuY29uc3QgcnhMaW5lQ29udGluYXRpb25zID0gbmV3IFJlZ0V4cChgKCR7cnhPcGVyYXRvcnN9KSRgKVxuY29uc3QgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyA9IC9bXmEtejAtOSFAIyQlXiYqOl8rPTw+fH4uXFx4MkRdL2dpXG5jb25zdCByeENvbW1lbnQgPSAvKFxcL1xcL1teXFxuXFxyXSopL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3hQaXBlLFxuICBjeEFycm93LFxuICByeERpc2FsbG93ZWRDaGFyYWN0ZXJzLFxuICBkZWNvbXBvc2VDaGFydCxcbiAgZGVjb21wb3NlUm91dGVcbn1cblxuY29uc3QgeyB1bmlxLCBBcmdUeXBlRXJyb3IsIGlzVGVtcGxhdGVMaXRlcmFsIH0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VSb3V0ZSAodGVtcGxhdGVMaXRlcmFsKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZGVjb21wb3NlUm91dGUnLFxuICAgIHsgdGVtcGxhdGVMaXRlcmFsOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIHRlbXBsYXRlTGl0ZXJhbFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZWRMaW5lcyh0ZW1wbGF0ZUxpdGVyYWwpXG4gIGNvbnN0IGZsYXR0ZW5lZFJvdXRlID0gdG9rZW5pc2VkTGluZXMobGluZXMpLmZsYXQoMilcbiAgcmV0dXJuIGZsYXR0ZW5lZFJvdXRlXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZUNoYXJ0ICh0ZW1wbGF0ZUxpdGVyYWwpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VDaGFydCcsXG4gICAgeyB0ZW1wbGF0ZUxpdGVyYWw6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgdGVtcGxhdGVMaXRlcmFsXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlZExpbmVzKHRlbXBsYXRlTGl0ZXJhbClcbiAgY29uc3QgbGluZXNPZlRva2VucyA9IHRva2VuaXNlZExpbmVzKGxpbmVzKVxuICBjb25zdCBsaW5lc09mUm91dGVzID0gbGluZXNPZlRva2Vuc1xuICAgIC5tYXAoZGVjb21wb3NlUm91dGVGcm9tVG9rZW5zKVxuICAgIC5mbGF0KDEpXG5cbiAgY29uc3QgbGluZXNPZlRyYW5zaXRpb25zID0gbGluZXNPZlJvdXRlc1xuICAgIC5tYXAoZGVjb21wb3NlVHJhbnNpdGlvbnNGcm9tUm91dGUpXG4gICAgLmZsYXQoMSlcblxuICBjb25zdCBzdGF0ZXMgPSBbXVxuICBjb25zdCByb3V0ZUtleXMgPSBsaW5lc09mVHJhbnNpdGlvbnMubWFwKHJvdXRlID0+IHtcbiAgICBzdGF0ZXMucHVzaCguLi5yb3V0ZSlcbiAgICByZXR1cm4gcm91dGUuam9pbihjeEFycm93KVxuICB9KVxuXG4gIGNvbnN0IGZpbHRlcmVkUm91dGVzID0gdW5pcShyb3V0ZUtleXMpXG4gIGNvbnN0IGZpbHRlcmVkU3RhdGVzID0gdW5pcShzdGF0ZXMpXG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvbnM6IGZpbHRlcmVkUm91dGVzLm1hcChyb3V0ZSA9PiByb3V0ZS5zcGxpdChjeEFycm93KSksXG4gICAgcm91dGVzOiBmaWx0ZXJlZFJvdXRlcyxcbiAgICBzdGF0ZXM6IGZpbHRlcmVkU3RhdGVzXG4gIH1cbn1cblxuZnVuY3Rpb24gbGluZXNGcm9tIChzdHJPckFycikge1xuICByZXR1cm4gW3N0ck9yQXJyXVxuICAgIC5mbGF0KClcbiAgICAucmVkdWNlKChhY2MsIGxpbmUpID0+IFsuLi5hY2MsIGxpbmUuc3BsaXQocnhDUkxGKV0sIFtdKVxuICAgIC5mbGF0KClcbn1cblxuZnVuY3Rpb24gY29uZGVuc2VkTGluZXMgKHN0ck9yQXJyKSB7XG4gIGNvbnN0IGlucHV0ID0gbGluZXNGcm9tKHN0ck9yQXJyKVxuICBjb25zdCBvdXRwdXQgPSBbXVxuXG4gIGlucHV0LnJlZHVjZSgoY29uZGVuc2VkTGluZSwgbGluZSkgPT4ge1xuICAgIGNvbnN0IHNhbml0aXNlZExpbmUgPSBsaW5lXG4gICAgICAucmVwbGFjZShyeENvbW1lbnQsICcnKVxuICAgICAgLnJlcGxhY2UocnhEaXNhbGxvd2VkQ2hhcmFjdGVycywgJycpXG5cbiAgICBpZiAoIXNhbml0aXNlZExpbmUpIHtcbiAgICAgIHJldHVybiBjb25kZW5zZWRMaW5lXG4gICAgfVxuXG4gICAgaWYgKHJ4TGluZUNvbnRpbmF0aW9ucy50ZXN0KHNhbml0aXNlZExpbmUpKSB7XG4gICAgICByZXR1cm4gY29uZGVuc2VkTGluZSArIHNhbml0aXNlZExpbmVcbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChjb25kZW5zZWRMaW5lICsgc2FuaXRpc2VkTGluZSlcbiAgICByZXR1cm4gJydcbiAgfSwgJycpXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5mdW5jdGlvbiB0b2tlbmlzZWRMaW5lcyAobGluZXMpIHtcbiAgcmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IGxpbmUuc3BsaXQoY3hBcnJvdykubWFwKHN0ciA9PiBzdHIuc3BsaXQoY3hQaXBlKSkpXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlRnJvbVRva2VucyAobGluZSkge1xuICBjb25zdCBvdXRwdXQgPSBbXVxuXG4gIGxpbmUucmVkdWNlKChwcmV2aW91c1N0YXRlcywgc3RhdGVzKSA9PiB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGVzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFsuLi5zdGF0ZXNdXG4gICAgfVxuXG4gICAgb3V0cHV0LnB1c2goW3ByZXZpb3VzU3RhdGVzLCBbLi4uc3RhdGVzXV0pXG4gICAgcmV0dXJuIFsuLi5zdGF0ZXNdXG4gIH0sIGZhbHNlKVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlVHJhbnNpdGlvbnNGcm9tUm91dGUgKFtmcm9tU3RhdGVzLCB0b1N0YXRlc10pIHtcbiAgcmV0dXJuIGZyb21TdGF0ZXMucmVkdWNlKChhY2MsIGZyb21TdGF0ZSkgPT4gW1xuICAgIC4uLmFjYyxcbiAgICAuLi50b1N0YXRlcy5tYXAodG9TdGF0ZSA9PiB7XG4gICAgICByZXR1cm4gW2Zyb21TdGF0ZSwgdG9TdGF0ZV1cbiAgICB9KVxuICBdLCBbXSlcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEZTTVxuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN0YXRlYm90LFxuICBpc1N0YXRlYm90XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBTdGF0ZWJvdC5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBzdGF0ZWJvdE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAqICBUaGUgc3RhdGUtY2hhcnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3N0YXJ0SW49PGF1dG8+XVxuICogIFRoZSBzdGF0ZSBpbiB3aGljaCB0byBzdGFydC4gSWYgdW5zcGVjaWZpZWQsIHRoZSBmaXJzdCBzdGF0ZSBpbiB0aGVcbiAqICBjaGFydCB3aWxsIGJlIHVzZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgSG93IG5vaXN5IHRoZSBsb2dnaW5nIGlzLCBmcm9tIDEgdG8gMzpcbiAqICBgYGBcbiAqICAxKSBjb25zb2xlLndhcm5cbiAqICAyKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlXG4gKiAgMykgY29uc29sZS53YXJuL2xvZy90YWJsZS9pbmZvXG4gKiAgYGBgXG4gKiAgYDNgIGlzIHRoZSBkZWZhdWx0LiBBcmd1bWVudCB0eXBlLWVycm9ycyB3aWxsIGFsd2F5cyBgdGhyb3dgLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtoaXN0b3J5TGltaXQ9Ml1cbiAqICBMaW1pdCBob3cgbXVjaCBoaXN0b3J5IHRoZSBzdGF0ZS1tYWNoaW5lIGtlZXBzLiBBY2Nlc3NlZCB2aWFcbiAqICB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeXxzdGF0ZWJvdEZzbSNoaXN0b3J5KCl9LlxuICogQHByb3BlcnR5IHtldmVudHN9IFtldmVudHNdXG4gKiAgSWYgeW91IHdpc2ggdG8gaGF2ZSB5b3VyIFN0YXRlYm90cyBsaXN0ZW4gdG8gZXZlbnRzIGNvbWluZyBmcm9tXG4gKiAgYSBzaGFyZWQgRXZlbnRFbWl0dGVyLCB5b3UgY2FuIHBhc3MgaXQgaW4gaGVyZS4gVGhlIGBlbWl0KClgL2BvbkV2ZW50KClgL1xuICogIGBwZXJmb3JtVHJhbnNpdGlvbnMoKWAgbWV0aG9kcyB3aWxsIHVzZSBpdC5cbiAqXG4gKiAgSXQgc2hvdWxkIGhhdmUgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19jbGFzc19ldmVudGVtaXR0ZXJ8RXZlbnRFbWl0dGVyfS5cbiAqL1xuXG4vKipcbiAqIEEgZGVzY3JpcHRpb24gb2YgYWxsIHRoZSBzdGF0ZXMgaW4gYSBtYWNoaW5lLCBwbHVzIGFsbCBvZiB0aGVcbiAqIHBlcm1pdHRlZCB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZW0uXG4gKlxuICogVGhpcyBpcyBkZWZpbmVkIHVzaW5nIGEgYHN0cmluZ2Agb3IgYW4gYGFycmF5YCBvZiBzdHJpbmdzLCBidXRcbiAqICB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHN8VGVtcGxhdGUgTGl0ZXJhbHN9XG4gKiBhcmUgbXVjaCBtb3JlIGNvbnZlbmllbnQuXG4gKlxuICogQW4gYXJyb3cgYC0+YCBjb25maWd1cmVzIGEgKipwZXJtaXR0ZWQgdHJhbnNpdGlvbioqIGJldHdlZW4gdHdvIHN0YXRlczpcbiAqXG4gKiBgYGBcbiAqIGZyb20tc3RhdGUgLT4gdG8tc3RhdGVcbiAqIGBgYFxuICpcbiAqIEl0J3MgdGhlIG9ubHkgb3BlcmF0b3IgbmVlZGVkIHRvIGJ1aWxkIGFueSBjaGFydDpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWRcbiAqICAgcGVuZGluZyAtPiByZWplY3RlZFxuICogICByZXNvbHZlZCAtPiBkb25lXG4gKiAgIHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIFRoZSBcIk9SXCIgb3BlcmF0b3IgYHxgIGNhbiBoZWxwIHVzIHJlbW92ZSBzb21lIHJlZHVuZGFuY3kgZnJvbSB0aGUgYWJvdmUgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZFxuICogICByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEluIGJvdGggY2hhcnRzLCBgcGVuZGluZ2AgY2FuIHRyYW5zaXRpb24gdG8gYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgLCBhbmRcbiAqIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCBjYW4gYm90aCB0cmFuc2l0aW9uIHRvIGBkb25lYC5cbiAqXG4gKiBXZSBjYW4gc3RyZWFtbGluZSB0aGlzIGV2ZW4gZnVydGhlcjpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEFnYWluLCB0aGlzIGlzIGV4YWN0bHkgZXF1aXZhbGVudCB0byB0aGUgcHJldmlvdXMgdHdvIGV4YW1wbGVzLlxuICpcbiAqIE5vdGljZSBpbiB0aGlzIG9uZSB0aGF0IHdlIGhhdmUgcGFyZW50aGVzZXMgYChgIGApYCBzdXJyb3VuZGluZyBgcmVzb2x2ZWRgXG4gKiBhbmQgYHJlamVjdGVkYC4gVGhleSBhcmUgYWN0dWFsbHkgY29tcGxldGVseSBpZ25vcmVkIGJ5IHRoZSBwYXJzZXIsIGFuZFxuICogeW91IGNhbiB1c2UgdGhlbSBhcyB5b3UgcGxlYXNlIHRvIGhlbHAgbWFrZSB5b3VyIGNoYXJ0cyBtb3JlIHJlYWRhYmxlLlxuICpcbiAqIEEgY2hhcnQgd29ya3MgZXhhY3RseSB0aGUgc2FtZSB3aXRob3V0IHRoZW06XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQ2hhcnRzIGNhbiBhbHNvIGJlIHNwbGl0IGFjcm9zcyBtdWx0aXBsZS1saW5lczpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT5cbiAqICAgcmVzb2x2ZWQgfFxuICogICByZWplY3RlZCAtPlxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqIE5vdGljZSB0aGF0IGFsbCB3aGl0ZS1zcGFjZSBpcyBpZ25vcmVkIG9uIGVpdGhlciBzaWRlIG9mIHRoZSBgLT5gXG4gKiBhbmQgYHxgLlxuICpcbiAqIGAvLyBDb21tZW50cyBvZiB0aGlzIGtpbmQgYXJlIGFsbG93ZWQsIHRvbzpgXG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IC8vIFdoZXJlIGRvIHdlIGdvIGZyb20gaGVyZT9cbiAqICAgICAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gLy8gQWgsIHllc1xuICpcbiAqICAgLy8gQW5kIG5vdyB3ZSdyZSBhbGwgZmluaXNoZWRcbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogRmluYWxseSwgaGVyZSdzIGEgbW9yZSBmdWxsIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBkcmFnRHJvcENoYXJ0ID0gYFxuICogICBpZGxlIC0+XG4gKiAgICAgZHJhZy1kZXRlY3QgLT5cbiAqICAgICAgIChkcmFnZ2luZyB8IGNsaWNrZWQpXG4gKlxuICogICAvLyBKdXN0IGEgY2xpY2ssIGJhaWwtb3V0IVxuICogICBjbGlja2VkIC0+IGlkbGVcbiAqXG4gKiAgIC8vIERyYWcgZGV0ZWN0ZWQhXG4gKiAgIGRyYWdnaW5nIC0+XG4gKiAgICAgZHJhZy13YWl0IC0+IGRyYWdnZWQgLT4gZHJhZy13YWl0XG4gKlxuICogICAvLyBEcmFnIGZpbmlzaGVkLi4uXG4gKiAgIChkcmFnLXdhaXQgfCBkcmFnZ2VkKSAtPlxuICogICAgIChkcmFnLWRvbmUgfCBkcmFnLWNhbmNlbCkgLT5cbiAqICAgICAgIGlkbGVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmd8c3RyaW5nW119IHN0YXRlYm90Q2hhcnRcbiAqL1xuXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHNcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNvbnN0IHtcbiAgaXNBcnJheSxcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzRnVuY3Rpb24sXG4gIGlzUG9qbyxcbiAgaXNTdHJpbmcsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyLFxuICBSZWZlcmVuY2VDb3VudGVyXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQsIGN4QXJyb3cgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbmZ1bmN0aW9uIFN0YXRlYm90IChuYW1lLCBvcHRpb25zKSB7XG4gIGlmICghaXNTdHJpbmcobmFtZSkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1xcblN0YXRlYm90OiBQbGVhc2Ugc3BlY2lmeSBhIG5hbWUgZm9yIHRoaXMgbWFjaGluZScpXG4gIH1cblxuICBjb25zdCBsb2dQcmVmaXggPSBgU3RhdGVib3RbJHtuYW1lfV1gXG4gIGlmICghaXNQb2pvKG9wdGlvbnMpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGBcXG4ke2xvZ1ByZWZpeH06IFBsZWFzZSBzcGVjaWZ5IG9wdGlvbnMgZm9yIHRoaXMgbWFjaGluZWApXG4gIH1cblxuICBjb25zdCB7XG4gICAgY2hhcnQgPSB1bmRlZmluZWQsXG4gICAgbG9nTGV2ZWwgPSAzLFxuICAgIGhpc3RvcnlMaW1pdCA9IDJcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoYCR7bG9nUHJlZml4fSNgKVxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuICBjb25zdCB7IGNhbldhcm4gfSA9IGNvbnNvbGVcblxuICBjb25zdCB7XG4gICAgc3RhdGVzID0gW10sXG4gICAgcm91dGVzID0gW11cbiAgfSA9IGNoYXJ0ID8gZGVjb21wb3NlQ2hhcnQoY2hhcnQpIDogb3B0aW9uc1xuXG4gIGNvbnN0IHsgc3RhcnRJbiA9IHN0YXRlc1swXSB9ID0gb3B0aW9uc1xuICBpZiAoIXN0YXRlcy5pbmNsdWRlcyhzdGFydEluKSkge1xuICAgIHRocm93IEVycm9yKGAke2xvZ1ByZWZpeH06IFN0YXJ0aW5nLXN0YXRlIG5vdCBpbiBjaGFydDogXCIke3N0YXJ0SW59XCJgKVxuICB9XG5cbiAgbGV0IHRyYW5zaXRpb25JZCA9IDBcbiAgY29uc3Qgc3RhdGVIaXN0b3J5ID0gW3N0YXJ0SW5dXG4gIGNvbnN0IHN0YXRlSGlzdG9yeUxpbWl0ID0gTWF0aC5tYXgoaGlzdG9yeUxpbWl0LCAyKVxuICBjb25zdCBldmVudHMgPSBpc0V2ZW50RW1pdHRlcihvcHRpb25zLmV2ZW50cykgPyBvcHRpb25zLmV2ZW50cyA6IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGNvbnN0IGludGVybmFsRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIGNvbnN0IElOVEVSTkFMX0VWRU5UUyA9IHtcbiAgICBvblN3aXRjaGluZzogJyhBTlkpc3RhdGU6Y2hhbmdpbmcnLFxuICAgIG9uU3dpdGNoZWQ6ICcoQU5ZKXN0YXRlOmNoYW5nZWQnXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0SW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGludGVybmFsRXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gb25JbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIGZuKSB7XG4gICAgaW50ZXJuYWxFdmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaW50ZXJuYWxFdmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGF0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdzdGF0ZXMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlcycsXG4gICAgWy4uLnN0YXRlc11cbiAgKVxuICBjb25zdCByb3V0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICd0cmFuc2l0aW9ucycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9ucycsXG4gICAgWy4uLnJvdXRlc11cbiAgKVxuICBjb25zdCBldmVudHNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdldmVudHMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzJ1xuICApXG5cbiAgLy8gSW50ZXJwcmV0cyBvblRyYW5zaXRpb25zKCkgYW5kIHBlcmZvcm1UcmFuc2l0aW9ucygpXG4gIGZ1bmN0aW9uIGFwcGx5SGl0Y2hlciAoaGl0Y2hlciwgZm5OYW1lKSB7XG4gICAgY29uc3QgaGl0Y2hlckFjdGlvbnMgPVxuICAgICAgaXNGdW5jdGlvbihoaXRjaGVyKVxuICAgICAgICA/IGhpdGNoZXIoeyBlbnRlciwgZW1pdCwgRW50ZXIsIEVtaXQgfSlcbiAgICAgICAgOiBpc1Bvam8oaGl0Y2hlcilcbiAgICAgICAgICA/IGhpdGNoZXJcbiAgICAgICAgICA6IG51bGxcblxuICAgIGlmICghaXNQb2pvKGhpdGNoZXJBY3Rpb25zKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEV4cGVjdGVkIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0YFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50cyA9IHt9XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSBbXVxuXG4gICAgT2JqZWN0LmVudHJpZXMoaGl0Y2hlckFjdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoW3JvdXRlQ2hhcnQsIGFjdGlvbk9yQ29uZmlnXSkgPT4ge1xuICAgICAgICAvLyBvblRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBpZiAoaXNGdW5jdGlvbihhY3Rpb25PckNvbmZpZykpIHtcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9IGVsc2UgaWYgKCFpc1Bvam8oYWN0aW9uT3JDb25maWcpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMS8zLi4uXG4gICAgICAgIGNvbnN0IHsgb246IF9vbiwgdGhlbjogX3RoZW4gfSA9IGFjdGlvbk9yQ29uZmlnXG4gICAgICAgIGlmIChpc1N0cmluZyhfb24pIHx8IGlzQXJyYXkoX29uKSkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZXMgPSBbX29uXS5mbGF0KClcbiAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IF90aGVuIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKF90aGVuKSkge1xuICAgICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgICAgICAgLy8gKEJlaGF2ZSBsaWtlIG9uVHJhbnNpdGlvbnMgaWYgYSBjb25maWcgaXMgc3BlY2lmaWVkLCBidXRcbiAgICAgICAgICAvLyAgdGhlcmUgaXMgbm8gXCJvblwiIGV2ZW50Li4uKVxuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICAgIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgY29uc3QgZGVjb21wb3NlZEV2ZW50cyA9IE9iamVjdC5lbnRyaWVzKGV2ZW50cylcbiAgICAgIC5yZWR1Y2UoKGFjYywgW2V2ZW50TmFtZSwgX2NvbmZpZ3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIGNvbmZpZ3MgfSA9IGRlY29tcG9zZUNvbmZpZ3MoX2NvbmZpZ3MsIGNhbldhcm4pXG4gICAgICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgIFtldmVudE5hbWVdOiBjb25maWdzXG4gICAgICAgIH1cbiAgICAgIH0sIHt9KVxuXG4gICAgY29uc3QgYWxsQ2xlYW51cEZucyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMoZGVjb21wb3NlZEV2ZW50cylcbiAgICAgICAgLm1hcCgoW2V2ZW50TmFtZSwgY29uZmlnc10pID0+XG4gICAgICAgICAgW1xuICAgICAgICAgICAgZXZlbnRzSGFuZGxlZC5pbmNyZWFzZShldmVudE5hbWUpLFxuICAgICAgICAgICAgb25FdmVudChldmVudE5hbWUsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50V2FzSGFuZGxlZCA9IGNvbmZpZ3Muc29tZShcbiAgICAgICAgICAgICAgICAoeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXNzZWQgPSBpblN0YXRlKGZyb21TdGF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKC4uLmFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICByZXR1cm4gISFwYXNzZWRcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIGlmICghZXZlbnRXYXNIYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk5vT3AoYEV2ZW50IG5vdCBoYW5kbGVkOiBcIiR7ZXZlbnROYW1lfVwiYClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgICkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gb25UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29uZmlncyA9IGRlY29tcG9zZUNvbmZpZ3ModHJhbnNpdGlvbnMsIGNhbldhcm4pXG5cbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBhbGxTdGF0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5zdGF0ZXMpXG4gICAgICBhbGxSb3V0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5yb3V0ZXMpXG4gICAgfVxuXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4udHJhbnNpdGlvbkNvbmZpZ3MuY29uZmlncy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSA9IHRyYW5zaXRpb25cbiAgICAgICAgY29uc3Qgcm91dGUgPSBgJHtmcm9tU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHJvdXRlc0hhbmRsZWQuaW5jcmVhc2Uocm91dGUpLFxuICAgICAgICAgIG9uSW50ZXJuYWxFdmVudChyb3V0ZSwgYWN0aW9uKVxuICAgICAgICBdXG4gICAgICB9KS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBEZWJ1Z2dpbmcsIGlmIHdlJ3JlIGF0IHRoZSByaWdodCBsZXZlbFxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGNvbnN0IGludmFsaWRTdGF0ZXMgPSBhbGxTdGF0ZXMuZmlsdGVyKHN0YXRlID0+ICFzdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICAgICAgY29uc3QgaW52YWxpZFJvdXRlcyA9IGFsbFJvdXRlcy5maWx0ZXIocm91dGUgPT4gIXJvdXRlcy5pbmNsdWRlcyhyb3V0ZSkpXG4gICAgICBpZiAoaW52YWxpZFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCBzdGF0ZXMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRTdGF0ZXMubWFwKHN0YXRlID0+IGAgID4gXCIke3N0YXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgaWYgKGludmFsaWRSb3V0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgdHJhbnNpdGlvbnMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRSb3V0ZXMubWFwKHJvdXRlID0+IGAgID4gXCIke3JvdXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBhbGxDbGVhbnVwRm5zLmZvckVhY2goZm4gPT4gZm4oKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDJdXG4gIH1cblxuICBmdW5jdGlvbiBjdXJyZW50U3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDFdXG4gIH1cblxuICBmdW5jdGlvbiBjYW5UcmFuc2l0aW9uVG8gKC4uLnN0YXRlcykge1xuICAgIGNvbnN0IHRlc3RTdGF0ZXMgPSBzdGF0ZXMuZmxhdCgpXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdjYW5UcmFuc2l0aW9uVG8nLCB7IHN0YXRlOiBpc1N0cmluZyB9LCB0ZXN0U3RhdGVzWzBdKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgaWYgKCF0ZXN0U3RhdGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICByZXR1cm4gdGVzdFN0YXRlcy5ldmVyeShzdGF0ZSA9PiBuZXh0U3RhdGVzLmluY2x1ZGVzKHN0YXRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlIChzdGF0ZSkge1xuICAgIGNvbnN0IF9zdGF0ZSA9IHN0YXRlICE9PSB1bmRlZmluZWRcbiAgICAgID8gc3RhdGVcbiAgICAgIDogY3VycmVudFN0YXRlKClcblxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBfc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGVzLnJlZHVjZSgoYWNjLCByb3V0ZSkgPT4ge1xuICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSByb3V0ZS5zcGxpdChjeEFycm93KVxuICAgICAgICAubWFwKHN0YXRlID0+IHN0YXRlLnRyaW0oKSlcblxuICAgICAgaWYgKGZyb21TdGF0ZSA9PT0gX3N0YXRlKSB7XG4gICAgICAgIHJldHVybiBbLi4uYWNjLCB0b1N0YXRlXVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4sIC4uLmZuQXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignaW5TdGF0ZScsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgY29uZGl0aW9uTWF0Y2hlcyA9IGN1cnJlbnRTdGF0ZSgpID09PSBzdGF0ZVxuXG4gICAgaWYgKGFueU9yRm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFjb25kaXRpb25NYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbihhbnlPckZuKSkge1xuICAgICAgICByZXR1cm4gYW55T3JGbiguLi5mbkFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gYW55T3JGblxuICAgIH1cblxuICAgIHJldHVybiBjb25kaXRpb25NYXRjaGVzXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VtaXQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIGVudGVyIChzdGF0ZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW50ZXInLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGluU3RhdGUgPSBjdXJyZW50U3RhdGUoKVxuICAgIGNvbnN0IHRvU3RhdGUgPSBzdGF0ZVxuXG4gICAgaWYgKHRvU3RhdGUgPT09IGluU3RhdGUpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBBbHJlYWR5IGluIHN0YXRlOiBcIiR7dG9TdGF0ZX1cImApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlcy5pbmNsdWRlcyh0b1N0YXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgc3RhdGUgXCIke3RvU3RhdGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFJvdXRlID0gYCR7aW5TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgaWYgKCFyb3V0ZXMuaW5jbHVkZXMobmV4dFJvdXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgdHJhbnNpdGlvbiBcIiR7bmV4dFJvdXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIEZlbGwtdGhyb3VnaCwgY2FuIGVudGVyIG5leHQgc3RhdGVcbiAgICBjb25zb2xlLmluZm8oYCR7bG9nUHJlZml4fTogdElkPCR7Kyt0cmFuc2l0aW9uSWR9PjogJHtuZXh0Um91dGV9YClcblxuICAgIHN0YXRlSGlzdG9yeS5wdXNoKHRvU3RhdGUpXG4gICAgaWYgKHN0YXRlSGlzdG9yeS5sZW5ndGggPiBzdGF0ZUhpc3RvcnlMaW1pdCkge1xuICAgICAgc3RhdGVIaXN0b3J5LnNoaWZ0KClcbiAgICB9XG5cbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMub25Td2l0Y2hpbmcsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQobmV4dFJvdXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5vblN3aXRjaGVkLCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXZlbnQgKGV2ZW50TmFtZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXZlbnQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcsIGNiOiBpc0Z1bmN0aW9uIH0sIGV2ZW50TmFtZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBldmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgICByZXR1cm4gKCkgPT4gZXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gIH1cblxuICBjb25zdCBzd2l0Y2hNZXRob2RzID0gT2JqZWN0LmtleXMoSU5URVJOQUxfRVZFTlRTKVxuICAgIC5yZWR1Y2UoKG9iaiwgbWV0aG9kTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbbWV0aG9kTmFtZV06IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcihtZXRob2ROYW1lLCB7IGNiOiBpc0Z1bmN0aW9uIH0sIGNiKVxuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudCA9IHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoSU5URVJOQUxfRVZFTlRTW21ldGhvZE5hbWVdKVxuICAgICAgICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25JbnRlcm5hbEV2ZW50KFxuICAgICAgICAgICAgSU5URVJOQUxfRVZFTlRTW21ldGhvZE5hbWVdLFxuICAgICAgICAgICAgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBjYih0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVFdmVudCgpXG4gICAgICAgICAgICBkZWNyZWFzZVJlZkNvdW50KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7fSlcblxuICBjb25zdCBlbnRlckV4aXRNZXRob2RzID0gW1xuICAgIFsnRXhpdGluZycsICdvblN3aXRjaGluZyddLFxuICAgIFsnRW50ZXJpbmcnLCAnb25Td2l0Y2hpbmcnXSxcbiAgICBbJ0V4aXRlZCcsICdvblN3aXRjaGVkJ10sXG4gICAgWydFbnRlcmVkJywgJ29uU3dpdGNoZWQnXVxuICBdXG4gICAgLnJlZHVjZSgob2JqLCBuYW1lcykgPT4ge1xuICAgICAgY29uc3QgW25hbWUsIHN3aXRjaE1ldGhvZF0gPSBuYW1lc1xuICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGBvbiR7bmFtZX1gXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW21ldGhvZE5hbWVdOiBmdW5jdGlvbiAoc3RhdGUsIGNiKSB7XG4gICAgICAgICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKG1ldGhvZE5hbWUsIHsgc3RhdGU6IGlzU3RyaW5nLCBjYjogaXNGdW5jdGlvbiB9LCBzdGF0ZSwgY2IpXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgICAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06JHtldmVudE5hbWV9YClcbiAgICAgICAgICBdXG4gICAgICAgICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBzd2l0Y2hNZXRob2RzW3N3aXRjaE1ldGhvZF0oKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignRXhpdCcpID09PSAwKSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2IodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSB0b1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2IoZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge30pXG5cbiAgZnVuY3Rpb24gRW1pdCAoZXZlbnROYW1lKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdFbWl0JywgeyBldmVudE5hbWU6IGlzU3RyaW5nIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uYXJncykgPT4gZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBFbnRlciAoc3RhdGUpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VudGVyJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IGVudGVyKHN0YXRlLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gSW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4pIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0luU3RhdGUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uZm5BcmdzKSA9PiBpblN0YXRlKHN0YXRlLCBhbnlPckZuLCAuLi5mbkFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH06IFN0YXRlLW1hY2hpbmUgcmVzZXQhYClcblxuICAgIHN0YXRlSGlzdG9yeS5sZW5ndGggPSAwXG4gICAgc3RhdGVIaXN0b3J5LnB1c2goc3RhcnRJbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25Ob09wIChtZXNzYWdlKSB7XG4gICAgY29uc3QgbGFzdFN0YXRlID0gcHJldmlvdXNTdGF0ZSgpXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgcHJldlJvdXRlID0gYCR7bGFzdFN0YXRlID09PSB1bmRlZmluZWQgPyAnW3VuZGVmaW5lZF0nIDogbGFzdFN0YXRlfS0+JHtpblN0YXRlfWBcblxuICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICBpZiAoIWF2YWlsYWJsZVN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gVGhlcmUgYXJlIG5vIHN0YXRlcyBhdmFpbGFibGUgZnJvbSBcIiR7aW5TdGF0ZX1cImBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBGcm9tIFwiJHtpblN0YXRlfVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbJHthdmFpbGFibGVTdGF0ZXNcbiAgICAgICAgICAgIC5tYXAoc3RhdGUgPT4gYFwiJHtzdGF0ZX1cImApXG4gICAgICAgICAgICAuam9pbignLCAnKX1dYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZXM6IHN0YXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgdHJhbnNpdGlvbnM6IHJvdXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgZXZlbnRzOiBldmVudHNIYW5kbGVkLnJlZnMoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluZm8gKCkge1xuICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZWApXG5cbiAgICBsb2dSZWZDb3VudGVySW5mbyhzdGF0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHJvdXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8oZXZlbnRzSGFuZGxlZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1JlZkNvdW50ZXJJbmZvIChyZWZDb3VudGVyKSB7XG4gICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgdGFibGUgfSA9IHJlZkNvdW50ZXIudG9WYWx1ZSgpXG4gICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24pXG4gICAgaWYgKHRhYmxlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS50YWJsZSh0YWJsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJyAgPiBObyBpbmZvcm1hdGlvbicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgc3RhdGUtbWFjaGluZSBvYmplY3QgY3JlYXRlZCBieVxuICAgKiB7QGxpbmsgI3N0YXRlYm90c3RhdGVib3R8U3RhdGVib3QoKX0uXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90RnNtXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgLy8gRm9yIGlkZW50aWZ5aW5nIFN0YXRlYm90IG9iamVjdHNcbiAgICBfX1NUQVRFQk9UX186IDEsXG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB0byBzZWUgaWYgd2UgY2FuIHRyYW5zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSBmcm9tXG4gICAgICogdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIElmIG1vcmUgdGhhbiBvbmUgc3RhdGUgaXMgc3BlY2lmaWVkLCBgdHJ1ZWAgaXMgcmV0dXJuZWQgb25seSBpZlxuICAgICAqICoqQUxMKiogc3RhdGVzIGFyZSBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gc3RhdGVzXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdnYW1lLW1lbnVzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPlxuICAgICAqICAgICAgIG1lbnUgLT5cbiAgICAgKiAgICAgICAgIHBsYXkgfFxuICAgICAqICAgICAgICAgb3B0aW9ucyB8XG4gICAgICogICAgICAgICBzb3VuZCB8XG4gICAgICogICAgICAgICBxdWl0XG4gICAgICpcbiAgICAgKiAgICAgLy8gR28gYmFjayB0byBtZW51XG4gICAgICogICAgIHBsYXkgfCBvcHRpb25zIHwgc291bmQgLT4gbWVudVxuICAgICAqXG4gICAgICogICAgIC8vIENhbiBxdWl0IGZyb20gbWFpbiBnYW1lLCB0b29cbiAgICAgKiAgICAgcGxheSAtPiBxdWl0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwbGF5JylcbiAgICAgKiAvLyBmYWxzZVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignbWVudScpXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oWydwbGF5JywgJ29wdGlvbnMnXSlcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgY2FuVHJhbnNpdGlvblRvOiBjYW5UcmFuc2l0aW9uVG8sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29yb3V0aW5lJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgc3VzcGVuZGVkIC0+IHJ1bm5pbmcgLT4gKHN1c3BlbmRlZCB8IGRlYWQpXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInN1c3BlbmRlZFwiXG4gICAgICovXG4gICAgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBlbWl0cyBhbiBldmVudCwgZmlyaW5nIGFueSBsaXN0ZW5lcnMgYWRkZWQgdXNpbmdcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zfC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gb3Ige0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnR8Lm9uRXZlbnQoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc11cbiAgICAgKiAgT3B0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqICBXaGV0aGVyIG9yIG5vdCB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICBTZWU6IHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19lbWl0dGVyX2VtaXRfZXZlbnRuYW1lX2FyZ3N8Tm9kZSBFdmVudHN9XG4gICAgICogIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogU3RhdGVib3QgaW1wb3J0cyBgRXZlbnRFbWl0dGVyYCBmcm9tIHRoZVxuICAgICAqICB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzfGV2ZW50c31cbiAgICAgKiBwYWNrYWdlIGZvciBkZWFsaW5nIHdpdGggZXZlbnRzIGluIHRoZSBicm93c2VyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdiYXNpYy1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IHJlZGlyZWN0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiB7XG4gICAgICogICAgIG9uOiAncG9zdC1kYXRhJyxcbiAgICAgKiAgICAgdGhlbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgYXJnczogJywgYXJncylcbiAgICAgKiAgICAgICAvLyBzZXRUaW1lb3V0KG1hY2hpbmUuRW50ZXIoJ3JlZGlyZWN0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCdwb3N0LWRhdGEnLCAnSGVsbG8sIHdvcmxkIScpXG4gICAgICogLy8gRXZlbnQgYXJnczogW1wiSGVsbG8sIHdvcmxkIVwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic2VuZGluZ1wiXG4gICAgICovXG4gICAgZW1pdDogZW1pdCxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiAgVGhlIGRlc2lyZWQgZXZlbnQgdG8ge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhhdCBldmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgndHJhZmZpYy1saWdodHMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBnbyAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tc3RvcCAtPlxuICAgICAqICAgICAgIHN0b3BcbiAgICAgKlxuICAgICAqICAgICAvLyAuLi5nb3R0YSBrZWVwIHRoYXQgdHJhZmZpYyBmbG93aW5nXG4gICAgICogICAgIHN0b3AgLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLWdvIC0+XG4gICAgICogICAgICAgZ29cbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnc3RvcCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3N0b3AgLT4gcHJlcGFyZS10by1nbyc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tZ28gLT4gZ28nOiAgICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ2dvIC0+IHByZXBhcmUtdG8tc3RvcCc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tc3RvcCAtPiBzdG9wJzogeyBvbjogJ3RpbWVyJyB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBuZXh0VHJhZmZpY0xpZ2h0ID0gbWFjaGluZS5FbWl0KCd0aW1lcicpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3RvcFwiXG4gICAgICpcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInByZXBhcmUtdG8tc3RvcFwiXG4gICAgICovXG4gICAgRW1pdDogRW1pdCxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZyBhcyBpdCBpc1xuICAgICAqIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YXRlIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2RpYWxvZycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2hvd2luZy1tb2RhbCAtPiAoc2F2aW5nIHwgaWRsZSlcbiAgICAgKiAgICAgICBzYXZpbmcgLT4gaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NhdmluZycpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIC8vIFtkaWFsb2ddOiBJbnZhbGlkIHRyYW5zaXRpb24gXCJpZGxlLT5zYXZpbmdcIiwgbm90IHN3aXRjaGluZ1xuICAgICAqIC8vID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCJbdW5kZWZpbmVkXS0+aWRsZVwiXG4gICAgICogLy8gPiBGcm9tIFwiaWRsZVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbXCJzaG93aW5nLW1vZGFsXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzaG93aW5nLW1vZGFsJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgZW50ZXI6IGVudGVyLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nXG4gICAgICogYXMgaXQgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYW4gY2hhbmdlIHRoZSBzdGF0ZSB3aGVuIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncG9wdXAtbWVudScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gbWVudS1vcGVuZWQgLT5cbiAgICAgKiAgICAgICAoaXRlbS1jbGlja2VkIHwgaWRsZSlcbiAgICAgKlxuICAgICAqICAgICBpdGVtLWNsaWNrZWQgLT4gaWRsZVxuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdtZW51LW9wZW5lZCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2sgPSBtYWNoaW5lLkVudGVyKCdpdGVtLWNsaWNrZWQnKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIm1lbnUtb3BlbmVkXCJcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrKClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpdGVtLWNsaWNrZWRcIlxuICAgICAqL1xuICAgIEVudGVyOiBFbnRlcixcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHN0YXRlcyB0aGUgbWFjaGluZSBoYXMgYmVlbiBpbiBzbyBmYXIsIHVwIHRvIGEgbGltaXQgc2V0XG4gICAgICogYnkgYGhpc3RvcnlMaW1pdGAgaW4ge0BsaW5rIHN0YXRlYm90T3B0aW9uc30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEEgY29weSBvZiB0aGUgc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZG93bmxvYWRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGxvYWRpbmcgLT4gKGZhaWx1cmUgfCBzdWNjZXNzKVxuICAgICAqICAgICAgIGZhaWx1cmUgLT4gbG9hZGluZ1xuICAgICAqICAgICAgIHN1Y2Nlc3MgLT4gZG9uZVxuICAgICAqICAgYCxcbiAgICAgKiAgIGhpc3RvcnlMaW1pdDogNFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdmYWlsdXJlJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdsb2FkaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzdWNjZXNzJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiBtYWNoaW5lLmhpc3RvcnkoKVxuICAgICAqIC8vIFtcImZhaWx1cmVcIiwgXCJsb2FkaW5nXCIsIFwic3VjY2Vzc1wiLCBcImRvbmVcIl1cbiAgICAgKi9cbiAgICBoaXN0b3J5OiAoKSA9PiBbLi4uc3RhdGVIaXN0b3J5XSxcblxuICAgIC8qKlxuICAgICAqIFByaW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUgdG8gdGhlIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbmZvKClcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBJbmZvcm1hdGlvbiBhYm91dCB0aGlzIHN0YXRlLW1hY2hpbmUuXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgc3RhdGVzICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICAgJ2RvbmUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAgJ2lkbGUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XSBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgIHRyYW5zaXRpb25zICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICdpZGxlLT5yZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAnaWRsZS0+c2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmctPmRvbmUnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZy0+ZG9uZScgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAgICAgKiAvLyAoTm8gaW5mb3JtYXRpb24pXG4gICAgICovXG4gICAgaW5mbzogKCkgPT4gaW5mbygpLFxuXG4gICAgLyoqXG4gICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBTYW1lIGRldGFpbHMgYXMge0BsaW5rICNzdGF0ZWJvdGZzbWluZm98LmluZm8oKX0gaW4gb2JqZWN0LWZvcm0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluc3BlY3QoKVxuICAgICAqIC8vIFdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgICAqIC8vICB7IHN0YXRlcywgdHJhbnNpdGlvbnMsIGV2ZW50cyB9XG4gICAgICpcbiAgICAgKiAvLyBUaGVzZSB3aWxsIGVhY2ggaGF2ZSBrZXktdmFsdWVzLCB0aGUga2V5IGJlaW5nIHRoZSBuYW1lXG4gICAgICogLy8gYW5kIHRoZSB2YWx1ZSBiZWluZyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBhdHRhY2hlZC5cbiAgICAgKi9cbiAgICBpbnNwZWN0OiAoKSA9PiBpbnNwZWN0KCksXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBgc3RhdGVgLCBpbW1lZGlhdGVseSByZXR1cm5pbmcgZWl0aGVyXG4gICAgICogYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgdGhlbiBpdHMgcmV0dXJuLXZhbHVlIHdpbGwgYmUgdXNlZFxuICAgICAqIGFzIHRoZSBgdHJ1ZWAtdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbHwqfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgJ1B1cnJyci4uLicpXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIGluU3RhdGU6IGluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gcnVuLCB0ZXN0cyB0aGF0XG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IG1hdGNoZXMgdGhlXG4gICAgICogc3BlY2lmaWVkIHN0YXRlLCByZXR1cm5pbmcgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FsbHMge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIGlkbGluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScpXG4gICAgICogdmFyIHB1cnJpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogaWRsaW5nKClcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBJZGxpbmchXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBJblN0YXRlOiBJblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGFsc28gYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9XG4gICAgICogZm9yIHRoZSBzYW1lLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ0F5LCB0aGVyZeKAmXMgdGhlIHJ1Yi4nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICB0aGUtcXVlc3Rpb24gLT4gKHRvLWJlIHwgbm90LXRvLWJlKVxuICAgICAqICAgICAgIG5vdC10by1iZSAtPiBwZXJjaGFuY2UtdG8tZHJlYW1cbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5uYW1lKClcbiAgICAgKiAvLyBcIkF5LCB0aGVyZeKAmXMgdGhlIHJ1Yi5cIlxuICAgICAqL1xuICAgIG5hbWU6ICgpID0+IG5hbWUsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJlZCBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmVkIGZyb206IHJlY2VpdmluZ1xuICAgICAqL1xuICAgIG9uRW50ZXJlZDogZW50ZXJFeGl0TWV0aG9kcy5vbkVudGVyZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipCRUZPUkUqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgYmVjb21lcyB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2VudGVyQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAoZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyZWQoJ2RvbmUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnV2UgbWFkZSBpdCEnKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJpbmcoJ2RvbmUnLCBmcm9tU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0VudGVyaW5nIGZyb206JywgZnJvbVN0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmluZyBmcm9tOiBzZW5kaW5nXG4gICAgICogLy8gV2UgbWFkZSBpdCFcbiAgICAgKi9cbiAgICBvbkVudGVyaW5nOiBlbnRlckV4aXRNZXRob2RzLm9uRW50ZXJpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBlbnRlckNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBldmVudCBpcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgVGhlIGNhbGxiYWNrLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvIC0+IGdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH0sXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FdmVudCgndGltZXInLCAoKSA9PiB7XG4gICAgICogICByZWRyYXdUcmFmZmljTGlnaHRzKClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogc2V0SW50ZXJ2YWwobWFjaGluZS5FbWl0KCd0aW1lcicpLCAyMDAwKVxuICAgICAqL1xuICAgIG9uRXZlbnQ6IG9uRXZlbnQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBhcmUgaGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiAvLyBXZSBhcmUgaGVhZGluZyB0bzogc2VuZGluZ1xuICAgICAqL1xuICAgIG9uRXhpdGVkOiBlbnRlckV4aXRNZXRob2RzLm9uRXhpdGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdQZWFjZSBvdXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRpbmcoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdIZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gSGVhZGluZyB0bzogcmVjZWl2aW5nXG4gICAgICogLy8gUGVhY2Ugb3V0IVxuICAgICAqL1xuICAgIG9uRXhpdGluZzogZW50ZXJFeGl0TWV0aG9kcy5vbkV4aXRpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0aW5nIC5vbkV4aXRpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRlZCAub25FeGl0ZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGV4aXRDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgKipBTlkqKlxuICAgICAqIHN0YXRlLWNoYW5nZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N3aXRjaENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25Td2l0Y2hlZCgodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgV2Ugd2VudCBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIFdlIHdlbnQgZnJvbSBcImlkbGVcIiB0byBcInJlY2VpdmluZ1wiXG4gICAgICovXG4gICAgb25Td2l0Y2hlZDogc3dpdGNoTWV0aG9kcy5vblN3aXRjaGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGJlZm9yZSAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgR29pbmcgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBHb2luZyBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGluZzogc3dpdGNoTWV0aG9kcy5vblN3aXRjaGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBzd2l0Y2hDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUnVuIGNhbGxiYWNrcyB3aGVuIHRyYW5zaXRpb25zIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHJlY2VpdmVEYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBUaGUgYWJvdmUgZXhhbXBsZSB1c2luZyBhIGZ1bmN0aW9uIGZvciBjb25maWdcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoKHsgZW50ZXIgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBlbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IGVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBldGMuLi5cbiAgICAgKi9cbiAgICBvblRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdvblRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIHRyYW5zaXRpb25zIHdoZW4gZXZlbnRzIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIFVzZSBgdGhlbmAgdG8gb3B0aW9uYWxseSBhZGQgY2FsbGJhY2tzIHRvIHRob3NlIHRyYW5zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29tcGxleC1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIHVwZGF0ZVxuICAgICAqXG4gICAgICogICAgIC8vIE1heWJlIHRoaW5ncyB0YWtlIGEgbG9uZyB0aW1lLi4uXG4gICAgICogICAgIHVwZGF0ZSAtPlxuICAgICAqICAgICAgIHdhaXRpbmcgLT4gd2FpdGluZy1hLXdoaWxlXG4gICAgICpcbiAgICAgKiAgICAgLy8gV2hpY2ggcGF0aCB3aWxsIHdlIHRha2U/XG4gICAgICogICAgIHdhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT5cbiAgICAgKiAgICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dFxuICAgICAqXG4gICAgICogICAgIC8vIEFsbCBkb25lIVxuICAgICAqICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dCAtPlxuICAgICAqICAgICAgIGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoKHsgRW50ZXIsIGVtaXQgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHVwZGF0ZSc6IHtcbiAgICAgKiAgICAgb246ICd1c2VyLXNhdmVkJyxcbiAgICAgKiAgICAgdGhlbjogKGRhdGEpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnU2VuZGluZyBkYXRhOiAnLCBkYXRhKVxuICAgICAqXG4gICAgICogICAgICAgc2VuZERhdGEoZGF0YSlcbiAgICAgKiAgICAgICAgIC50aGVuKEVudGVyKCdzdWNjZXNzJykpXG4gICAgICogICAgICAgICAuY2F0Y2goRW50ZXIoJ2ZhaWxlZCcpKVxuICAgICAqXG4gICAgICogICAgICAgZW1pdCgnZGF0YS1zZW50JylcbiAgICAgKiAgICAgfVxuICAgICAqICAgfSxcbiAgICAgKiAgICd1cGRhdGUgLT4gd2FpdGluZyc6IHtcbiAgICAgKiAgICAgb246ICdkYXRhLXNlbnQnLFxuICAgICAqICAgICB0aGVuOiAoKSA9PiB7XG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcignd2FpdGluZy1hLXdoaWxlJyksIDc1MClcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd0aW1lb3V0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIEp1c3QgdG8gaWxsdXN0cmF0ZSB0aGF0IHlvdSBjYW4gbWl4IG4nIG1hdGNoIHdpdGggb25UcmFuc2l0aW9uczpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gc3VjY2Vzcyc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0xvdmVseSEnKVxuICAgICAqICAgfSxcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHRpbWVvdXQnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXZWxsLCBhdCBsZWFzdCB5b3UgaGF2ZSB5b3VyIHNob2VzJylcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCd1c2VyLXNhdmVkJywgWydzb21lJywgJ2RhdGEnXSlcbiAgICAgKiAvLyBTZW5kaW5nIGRhdGE6IFtcInNvbWVcIiwgXCJkYXRhXCJdXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBwZXJmb3JtVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ3BlcmZvcm1UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgVGhlIHByZXZpb3VzIHN0YXRlLCBvciBgdW5kZWZpbmVkYCBpZiB0aGVyZSBpc24ndCBvbmUgKGllOyB5b3VcbiAgICAgKiAgaGF2ZSBqdXN0IGNhbGxlZCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXR8LnJlc2V0KCl9LCBvciB0aGVcbiAgICAgKiAgbWFjaGluZSBoYXMganVzdCBzdGFydGVkLilcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnc2ltcGxlLXNlbmRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUucHJldmlvdXNTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKi9cbiAgICBwcmV2aW91c1N0YXRlOiBwcmV2aW91c1N0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUtbWFjaGluZSB0byBpdHMgc3RhcnRpbmctc3RhdGUgYW5kIGNsZWFycyB0aGVcbiAgICAgKiBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQWxsIGxpc3RlbmVycyB3aWxsIHN0aWxsIGJlIGF0dGFjaGVkLCBidXQgbm8gZXZlbnRzIG9yIHRyYW5zaXRpb25zIHdpbGwgYmUgZmlyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY2Fyb3VzZWwnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBwYWdlLTEgLT5cbiAgICAgKiAgICAgcGFnZS0yIC0+XG4gICAgICogICAgIHBhZ2UtMyAtPlxuICAgICAqICAgICBwYWdlLTQgLT4gcGFnZS0xXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3BhZ2UtMicpXG4gICAgICogbWFjaGluZS5yZXNldCgpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicGFnZS0xXCJcbiAgICAgKi9cbiAgICByZXNldDogcmVzZXQsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYGFycmF5YCBvZiBzdGF0ZXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBzdGF0ZSBzcGVjaWZpZWQuXG4gICAgICogSWYgbm8gc3RhdGUgaXMgcGFzc2VkLWluLCB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlXSBUaGUgc3RhdGUgdG8gY2hlY2suIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqICBpZiB1bnNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgICAqIC8vIFtcInNlbmRpbmdcIiwgXCJyZWNlaXZpbmdcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoJ3JlY2VpdmluZycpXG4gICAgICogLy8gW1wiZG9uZVwiXVxuICAgICAqL1xuICAgIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlOiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzU3RhdGVib3QgKG1hY2hpbmUpIHtcbiAgcmV0dXJuIChcbiAgICBpc1Bvam8obWFjaGluZSkgJiZcbiAgICB0eXBlb2YgbWFjaGluZS5fX1NUQVRFQk9UX18gPT09ICdudW1iZXInXG4gIClcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlQ29uZmlncyAoY29uZmlncywgY2FuV2Fybikge1xuICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gIGNvbnN0IF9jb25maWdzID0gY29uZmlncy5yZWR1Y2UoKGFjYywgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgeyByb3V0ZUNoYXJ0LCBhY3Rpb24gfSA9IGNvbmZpZ1xuICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydChyb3V0ZUNoYXJ0KVxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmFjYyxcbiAgICAgIC4uLnRyYW5zaXRpb25zLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSB0cmFuc2l0aW9uXG4gICAgICAgIHJldHVybiB7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH1cbiAgICAgIH0pXG4gICAgXVxuICB9LCBbXSlcblxuICByZXR1cm4ge1xuICAgIGNvbmZpZ3M6IF9jb25maWdzLFxuICAgIHN0YXRlczogYWxsU3RhdGVzLFxuICAgIHJvdXRlczogYWxsUm91dGVzXG4gIH1cbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEFTU0VSVElPTiBIRUxQRVJTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcm91dGVJc1Bvc3NpYmxlLFxuICBhc3NlcnRSb3V0ZVxufVxuXG5jb25zdCB7IGlzU3RhdGVib3QgfSA9IHJlcXVpcmUoJy4vc3RhdGVib3QnKVxuY29uc3QgeyBkZWNvbXBvc2VSb3V0ZSB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcbmNvbnN0IHtcbiAgRGVmZXIsXG4gIE9uY2UsXG4gIFJldm9rYWJsZSxcbiAgTG9nZ2VyLFxuICBBcmdUeXBlRXJyb3IsXG4gIGlzVGVtcGxhdGVMaXRlcmFsXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcignc3RhdGVib3QuJylcblxuZnVuY3Rpb24gcm91dGVJc1Bvc3NpYmxlIChtYWNoaW5lLCBleHBlY3RlZFJvdXRlKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcigncm91dGVJc1Bvc3NpYmxlJyxcbiAgICB7IG1hY2hpbmU6IGlzU3RhdGVib3QsIGV4cGVjdGVkUm91dGU6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgbWFjaGluZSwgZXhwZWN0ZWRSb3V0ZVxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3Qgcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShleHBlY3RlZFJvdXRlKVxuICByZXR1cm4gcm91dGUuZXZlcnkoKHN0YXRlLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA9PT0gcm91dGUubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gcm91dGVbaW5kZXggKyAxXVxuICAgICAgY29uc3QgYXZhaWxhYmxlU3RhdGVzID0gbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZShzdGF0ZSlcbiAgICAgIGNvbnN0IHBhc3NlcyA9IGF2YWlsYWJsZVN0YXRlcy5pbmNsdWRlcyhuZXh0U3RhdGUpXG4gICAgICByZXR1cm4gcGFzc2VzXG4gICAgfVxuICB9KVxufVxuXG5sZXQgYXNzZXJ0aW9uSWQgPSAwXG5cbi8qKlxuICoge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9IG9wdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBhc3NlcnRSb3V0ZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dXG4gKiAgRGVzY3JpYmUgdGhlIHN1Y2Nlc3MtY29uZGl0aW9uIGZvciB0aGlzIGFzc2VydGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZnJvbVN0YXRlPVwiXCJdXG4gKiAgV2FpdCBmb3IgdGhlIG1hY2hpbmUgdG8gYmUgaW4gdGhpcyBzdGF0ZSBiZWZvcmUgYXNzZXJ0aW9uIGJlZ2lucy5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IFtydW5dXG4gKiAgUnVuIHRoaXMgZnVuY3Rpb24ganVzdCBiZWZvcmUgc3RhcnRpbmcgdGhlIGFzc2VydGlvbi5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGVybWl0dGVkRGV2aWF0aW9ucz0wXVxuICogIElmIHdlIGhpdCBhbiB1bmV4cGVjdGVkIHN0YXRlIGR1cmluZyBhc3NlcnRpb24sIHRoaXMgaXMgYSBcImRldmlhdGlvblwiLlxuICogIEl0IG1pZ2h0IGJlIHRoYXQgdGhlIEZTTSB3aWxsIGNvbWUgYmFjayB0byB0aGUgZXhwZWN0ZWQgc3RhdGUgYWdhaW5cbiAqICBhZnRlciBhIGNlcnRhaW4gbnVtYmVyIG9mIHRoZXNlLiBGb3IgZXhhbXBsZSwgaWYgeW91ciBGU00gaGFzIGFcbiAqICBcInJldHJ5XCIgcm91dGUgY29uZmlndXJlZCwgdGhpcyBudW1iZXIgY2FuIGFjY291bnQgZm9yIGl0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFt0aW1lb3V0SW5Ncz0xMDAwXVxuICogIFBlcm1pdHRlZCBsZW5ndGggb2YgdGltZSBmb3IgdGhlIGVudGlyZSBhc3NlcnRpb24sIGluIG1pbGxpc2Vjb25kcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbG9nTGV2ZWw9M11cbiAqICBOb3JtYWxseSB3ZSB3YW50IGxvZ3MgZm9yIGFzc2VydGlvbnMsIHJpZ2h0PyBXZWxsLCB5b3UgY2FuIHR1bmVcbiAqICB0aGVtIGp1c3QgbGlrZSB5b3UgY2FuIHdpdGgge0BsaW5rICNzdGF0ZWJvdG9wdGlvbnN8c3RhdGVib3RPcHRpb25zfS5cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRSb3V0ZSAobWFjaGluZSwgZXhwZWN0ZWRSb3V0ZSwgb3B0aW9ucykge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2Fzc2VydFJvdXRlJyxcbiAgICB7IG1hY2hpbmU6IGlzU3RhdGVib3QsIGV4cGVjdGVkUm91dGU6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgbWFjaGluZSwgZXhwZWN0ZWRSb3V0ZVxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgYXNzZXJ0aW9uSWQgKz0gMVxuXG4gIGNvbnN0IHtcbiAgICBkZXNjcmlwdGlvbiA9ICdBc3NlcnRpb24gY29tcGxldGUnLFxuICAgIGZyb21TdGF0ZSA9ICcnLFxuICAgIHJ1biA9ICgpID0+IHt9LFxuICAgIHBlcm1pdHRlZERldmlhdGlvbnMgPSAwLFxuICAgIHRpbWVvdXRJbk1zID0gMTAwMCxcbiAgICBsb2dMZXZlbCA9IDNcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuXG4gIGNvbnN0IHByZWZpeCA9IGBTdGF0ZWJvdFske21hY2hpbmUubmFtZSgpfV06IGFJZDwke2Fzc2VydGlvbklkfT5gXG4gIGNvbnN0IHJvdXRlID0gZGVjb21wb3NlUm91dGUoZXhwZWN0ZWRSb3V0ZSlcblxuICBjb25zb2xlLmxvZyhgXFxuJHtwcmVmaXh9OiBBc3NlcnRpbmcgcm91dGU6IFske3JvdXRlLmpvaW4oJyA+ICcpfV1gKVxuICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9OiA+IEFzc2VydGlvbiB3aWxsIHN0YXJ0IGZyb20gc3RhdGU6IFwiJHtmcm9tU3RhdGV9XCJgKVxuXG4gIGNvbnN0IGZyb21TdGF0ZUFjdGlvbkZuID0gRGVmZXIocnVuKVxuICBsZXQgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSAoKSA9PiB7IH1cblxuICBjb25zdCB0b3RhbFRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gIGxldCBzdGF0ZVRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gIGxldCBhc3NlcnRpb25UaW1lb3V0VGltZXJcbiAgbGV0IGRldmlhdGlvbnMgPSAwXG4gIGxldCBwZW5kaW5nID0gdHJ1ZVxuICBsZXQgdW5leHBlY3RlZCA9IGZhbHNlXG5cbiAgY29uc3QgY29uc3VtZVJvdXRlID0gWy4uLnJvdXRlXVxuICBjb25zdCByZXBvcnQgPSBUYWJsZShcbiAgICBbJ3N0YXRlJywgJ2V4cGVjdGVkJywgJ2luZm8nLCAndG9vayddLFxuICAgIFsnY2VudGVyJywgJ2NlbnRlcicsICdsZWZ0JywgJ3JpZ2h0J11cbiAgKVxuXG4gIGNvbnN0IGZpbmFsaXNlUmVwb3J0ID0gT25jZShlcnIgPT4ge1xuICAgIGFkZFJvdygnJywgJycsICcnLCAnVE9UQUw6ICcgKyB0b3RhbFRpbWVUYWtlbigpKVxuICAgIHJlcG9ydC5sb2NrKClcbiAgICBjb25zb2xlLmxvZyhgXFxuJHtwcmVmaXh9OiAke2Rlc2NyaXB0aW9ufTogWyR7ZXJyID8gJ0ZBSUxFRCcgOiAnU1VDQ0VTUyd9XWApXG4gICAgY29uc29sZS50YWJsZShyZXBvcnQuY29udGVudCgpKVxuICAgIHJldHVybiBlcnJcbiAgfSlcblxuICBjb25zdCB7IGFkZFJvdyB9ID0gcmVwb3J0XG4gIGZ1bmN0aW9uIGVudGVyZWRTdGF0ZSAoc3RhdGUpIHtcbiAgICBpZiAocGVuZGluZykge1xuICAgICAgYWRkUm93KHN0YXRlLCAnLScsICdQRU5ESU5HJylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZVswXVxuICAgICAgaWYgKGV4cGVjdGVkU3RhdGUgPT09IHN0YXRlKSB7XG4gICAgICAgIGFkZFJvdyhzdGF0ZSwgZXhwZWN0ZWRTdGF0ZSwgdW5leHBlY3RlZCA/ICdSRUFMSUdORUQnIDogJ09LQVknLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gZmFsc2VcbiAgICAgICAgY29uc3VtZVJvdXRlLnNoaWZ0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZFJvdyhzdGF0ZSwgZXhwZWN0ZWRTdGF0ZSwgJ1dST05HIFNUQVRFJywgc3RhdGVUaW1lVGFrZW4oKSlcbiAgICAgICAgdW5leHBlY3RlZCA9IHRydWVcbiAgICAgICAgZGV2aWF0aW9ucyArPSAxXG4gICAgICB9XG4gICAgICBzdGF0ZVRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoY29uc3VtZVJvdXRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVqZWN0KGZpbmFsaXNlUmVwb3J0KG5ldyBFcnJvcignTk8gUk9VVEUgVE8gVEVTVCcpKSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyVGltZW91dEFuZFJlc29sdmUgPSAoLi4uYXJncykgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGFzc2VydGlvblRpbWVvdXRUaW1lcilcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIoKVxuICAgICAgcmVzb2x2ZSguLi5hcmdzKVxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyVGltZW91dEFuZFJlamVjdCA9IGVyciA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZWplY3QoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGJhaWxvdXQgPSBtZXNzYWdlID0+IHtcbiAgICAgIHdoaWxlIChjb25zdW1lUm91dGUubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgICBhZGRSb3cobWFjaGluZS5jdXJyZW50U3RhdGUoKSwgYCgke2V4cGVjdGVkU3RhdGV9KWAsIG1lc3NhZ2UpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgfVxuICAgICAgY2xlYXJUaW1lb3V0QW5kUmVqZWN0KGZpbmFsaXNlUmVwb3J0KG5ldyBFcnJvcihtZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgaWYgKG1hY2hpbmUuaW5TdGF0ZShmcm9tU3RhdGUpKSB7XG4gICAgICBwZW5kaW5nID0gZmFsc2VcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgIH1cblxuICAgIGNvbnN0IHsgcmV2b2tlLCBmbiB9ID0gUmV2b2thYmxlKHN0YXRlID0+IHtcbiAgICAgIGFzc2VydGlvblRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBiYWlsb3V0KCdUSU1FT1VUJylcbiAgICAgIH0sIHRpbWVvdXRJbk1zKVxuXG4gICAgICBlbnRlcmVkU3RhdGUoc3RhdGUpXG4gICAgICBpZiAocGVuZGluZyAmJiBzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9IGZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpYXRpb25zID4gcGVybWl0dGVkRGV2aWF0aW9ucykge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBiYWlsb3V0KCdUT08gTUFOWSBERVZJQVRJT05TJylcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZShmaW5hbGlzZVJlcG9ydCgpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyID0gbWFjaGluZS5vblN3aXRjaGluZyhmbilcbiAgfSlcbn1cblxuZnVuY3Rpb24gVGFibGUgKGNvbHVtbnMgPSBbXSwgYWxpZ25tZW50cyA9IFtdKSB7XG4gIGNvbnN0IHRhYmxlID0gW11cbiAgY29uc3QgYWxpZ25tZW50ID0gY29sdW1ucy5tYXAoKF8sIGluZGV4KSA9PiBhbGlnbm1lbnRzW2luZGV4XSB8fCAnY2VudGVyJylcblxuICBsZXQgbG9ja2VkID0gZmFsc2VcbiAgZnVuY3Rpb24gbG9jayAoKSB7XG4gICAgbG9ja2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUm93ICguLi5hcmdzKSB7XG4gICAgaWYgKGxvY2tlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IG9iaiA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IGFyZ3NbaW5kZXhdIHx8ICcnXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtjb2xdOiByb3dcbiAgICAgIH1cbiAgICB9LCB7fSlcbiAgICB0YWJsZS5wdXNoKG9iailcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbFNpemVzICgpIHtcbiAgICByZXR1cm4gdGFibGUucmVkdWNlKChhY2MsIHJvdykgPT4gY29sdW1ucy5tYXAoKGNvbCwgaW5kZXgpID0+IE1hdGgubWF4KHJvd1tjb2xdLmxlbmd0aCwgYWNjW2luZGV4XSkpLCBjb2x1bW5zLm1hcCgoKSA9PiAwKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhZExlZnQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuIHN0ciArICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhZFJpZ2h0IChzdHIsIGxlbikge1xuICAgIHJldHVybiAnICcucmVwZWF0KGxlbiAtIHN0ci5sZW5ndGgpICsgc3RyXG4gIH1cblxuICBmdW5jdGlvbiBjb250ZW50ICgpIHtcbiAgICBjb25zdCBzaXplcyA9IGNvbFNpemVzKClcbiAgICBmdW5jdGlvbiBmb3JtYXRGaWVsZCAodmFsdWUsIGluZGV4KSB7XG4gICAgICBjb25zdCBzaXplID0gc2l6ZXNbaW5kZXhdXG4gICAgICBjb25zdCBhbGlnbiA9IGFsaWdubWVudFtpbmRleF1cbiAgICAgIGlmIChhbGlnbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHJldHVybiBwYWRMZWZ0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgaWYgKGFsaWduID09PSAncmlnaHQnKSB7XG4gICAgICAgIHJldHVybiBwYWRSaWdodCh2YWx1ZSwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICBjb25zdCBvdXRwdXQgPSB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRSb3cgPSBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjb2wsIGluZGV4KSA9PiAoe1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtjb2xdOiBmb3JtYXRGaWVsZChyb3dbY29sXSwgaW5kZXgpXG4gICAgICB9KSwge30pXG4gICAgICByZXR1cm4gWy4uLmFjYywgZm9ybWF0dGVkUm93XVxuICAgIH0sIFtdKVxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9jazogbG9jayxcbiAgICBhZGRSb3c6IGFkZFJvdyxcbiAgICBjb250ZW50OiBjb250ZW50XG4gIH1cbn1cblxuZnVuY3Rpb24gVGltZVRha2VuICgpIHtcbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXG4gIGZ1bmN0aW9uIGZtdCAobnVtLCBkaWdpdHMpIHtcbiAgICByZXR1cm4gbnVtLnRvRml4ZWQoZGlnaXRzKS5yZXBsYWNlKC9cXC4wKyQvLCAnJylcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lXG5cbiAgICBpZiAoZHVyYXRpb24gPCA1MDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24pfSBtc2BcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uIDwgNTAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDIpfSBzIGBcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uIDwgNjAwMDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwLCAxKX0gcyBgXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwIC8gNjAsIDEpfSBtIGBcbiAgICB9XG4gIH1cbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEVYUE9SVFNcbi8vXG5cbmNvbnN0IHsgU3RhdGVib3QsIGlzU3RhdGVib3QgfSA9IHJlcXVpcmUoJy4vc3RhdGVib3QnKVxuY29uc3QgeyBhc3NlcnRSb3V0ZSwgcm91dGVJc1Bvc3NpYmxlIH0gPSByZXF1aXJlKCcuL2Fzc2VydGlvbnMnKVxuY29uc3QgeyBkZWNvbXBvc2VDaGFydCB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcblxuLyoqXG4gKiA8aW1nIHNyYz1cIi4vbG9nby1mdWxsLnBuZ1wiIHN0eWxlPVwibWF4LXdpZHRoOiAyNTVweDsgbWFyZ2luOiAxMHB4IDA7XCIgLz5cbiAqXG4gKiBXcml0ZSBtb3JlIHJvYnVzdCBhbmQgdW5kZXJzdGFuZGFibGUgcHJvZ3JhbXMuXG4gKlxuICogU3RhdGVib3QgaG9wZXMgdG8gbWFrZSBbRmluaXRlIFN0YXRlIE1hY2hpbmVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaW5pdGUtc3RhdGVfbWFjaGluZSkgKEZTTXMpIGEgbGl0dGxlIG1vcmUgYWNjZXNzaWJsZS5cbiAqXG4gKiBZb3UncmUgcmVhZGluZyB0aGUgZG9jdW1lbnRhdGlvbi4gT3RoZXIgZXhpdHMgYXJlOlxuICpcbiAqIC0gVGhlIFtSRUFETUUgZmlsZV0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdC9ibG9iL21hc3Rlci9SRUFETUUubWQpXG4gKiAtIFRoZSBbR2l0aHViIFJlcG9dKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3QpXG4gKiAtIFRoZSBzaGVsbC1zY3JpcHQgdmVyc2lvbiwgW1N0YXRlYm90LXNoXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90LXNoKVxuICpcbiAqIFN0YXRlYm90IHdhcyB3cml0dGVuIGJ5IFtDb25hbiBUaGVvYmFsZF0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci8pIGFuZFxuICogaXMgW0lTQyBsaWNlbnNlZF0oLi4vTElDRU5TRSkuXG4gKlxuICogIyMjIEp1bXAgcmlnaHQgaW5cbiAqXG4gKiBZb3UgY2FuIGluc3RhbGwgU3RhdGVib3QgaW50byB5b3VyIGBucG1gIHByb2plY3Q6XG4gKlxuICogYGBgc2hcbiAqIG5wbSBpIHN0YXRlYm90XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHN0YXRlYm90IGZyb20gJ3N0YXRlYm90J1xuICogYGBgXG4gKlxuICogT3Igbm9uLWBucG1gIHByb2plY3Q6XG4gKlxuICogYGBganNcbiAqIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly91bnBrZy5jb20vc3RhdGVib3RAMi4yLjAvZGlzdC9icm93c2VyL3N0YXRlYm90Lm1pbi5qc1wiPjwvc2NyaXB0PlxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHsgU3RhdGVib3QgfSA9IHN0YXRlYm90XG4gKiAvLyBNYWtlIG1hY2hpbmVzIHdpdGggU3RhdGVib3QoKVxuICpcbiAqIGNvbnN0IHsgaXNTdGF0ZWJvdCwgcm91dGVJc1Bvc3NpYmxlLCBhc3NlcnRSb3V0ZSB9ID0gc3RhdGVib3RcbiAqIC8vIFRoZXNlIGFyZSBhc3NlcnRpb24gaGVscGVycyB5b3UgY2FuIHVzZSBmb3IgdGVzdGluZ1xuICogYGBgXG4gKlxuICogIyMjIE9wZW4gdGhlIGRldmVsb3Blci1jb25zb2xlIDopXG4gKlxuICogSSd2ZSBpbmNsdWRlZCBTdGF0ZWJvdCBpbiB0aGlzIHBhZ2UuIE9wZW4gdGhlIGRldmVsb3Blci1jb25zb2xlIHRvXG4gKiBmb2xsb3cgYWxvbmcgd2l0aCB0aGUgZXhhbXBsZXMgYmVsb3c6XG4gKlxuICogYGBganNcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3Byb21pc2UtbGlrZScsIHtcbiAqICAgY2hhcnQ6IGBcbiAqICAgICAvLyBUaGlzIG9uZSB3aWxsIGJlaGF2ZSBhIGJpdCBsaWtlIGEgUHJvbWlzZVxuICogICAgIGlkbGUgLT4gcGVuZGluZyAtPlxuICogICAgICAgcmVzb2x2ZWQgfCByZWplY3RlZFxuICpcbiAqICAgICAvLyAuLi5hbmQgd2UncmUgZG9uZVxuICogICAgIHJlc29sdmVkIC0+IGRvbmVcbiAqICAgICByZWplY3RlZCAtPiBkb25lXG4gKiAgIGAsXG4gKiAgIHN0YXJ0SW46ICdpZGxlJ1xuICogfSlcbiAqXG4gKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbygncGVuZGluZycpXG4gKiAvLyB0cnVlXG4gKlxuICogbWFjaGluZS5lbnRlcigncGVuZGluZycpXG4gKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAqIC8vIFtcInJlc29sdmVkXCIsIFwicmVqZWN0ZWRcIl1cbiAqIGBgYFxuICpcbiAqIFdlIGNhbiBob29rLXVwIGV2ZW50cyB3aXRoIHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnMgLnBlcmZvcm1UcmFuc2l0aW9ucygpfTpcbiAqXG4gKiBgYGBqc1xuICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICogICdwZW5kaW5nIC0+IHJlc29sdmVkJzoge1xuICogICAgb246ICdkYXRhLWxvYWRlZCdcbiAqICB9LFxuICogICdwZW5kaW5nIC0+IHJlamVjdGVkJzoge1xuICogICAgb246IFsndGltZW91dCcsICdkYXRhLWVycm9yJ10sXG4gKiAgICB0aGVuOiAobXNnKSA9PiB7XG4gKiAgICAgIGNvbnNvbGUud2FybignVWggb2guLi4nLCBtc2cpXG4gKiAgICB9XG4gKiAgfSxcbiAqICAncmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lJzoge1xuICogICAgb246ICd0aGF0cy1hbGwtZm9sa3MnXG4gKiAgfVxuICogfSlcbiAqXG4gKiBtYWNoaW5lLmVtaXQoJ2RhdGEtZXJyb3InLCAnRGlkIHlvdSBoZWFyIHRoYXQ/JylcbiAqIGBgYFxuICpcbiAqIEhlcmUncyB0aGUgQVBJOlxuICpcbiAqIHwgSGl0Y2hlcnMgfCBTdGF0dXMgfCBBY3Rpb25zIHxcbiAqIHwtfC18LXxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnQgLm9uRXZlbnQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtY2FudHJhbnNpdGlvbnRvIC5jYW5UcmFuc2l0aW9uVG8oKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtc3RhdGVzYXZhaWxhYmxlZnJvbWhlcmUgLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX0gLyB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnRyYW5zaXRpb25zIC5vblRyYW5zaXRpb25zKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZSAuY3VycmVudFN0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXByZXZpb3Vzc3RhdGUgLnByZXZpb3VzU3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeSAuaGlzdG9yeSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gLyB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJpbmcgLm9uRW50ZXJpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZSAuaW5TdGF0ZSgpfSAvIHtAbGluayAjaW5zdGF0ZS1zdGF0ZS1vdXRwdXR3aGVudHJ1ZS0xIC5JblN0YXRlKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbXJlc2V0IC5yZXNldCgpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRlZCAub25FeGl0ZWQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5mbyAuaW5mbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21pbnNwZWN0IC5pbnNwZWN0KCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW5hbWUgLm5hbWUoKX0gfCAgfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hpbmcgLm9uU3dpdGNoaW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoZWQgLm9uU3dpdGNoZWQoKX0gfCAgfCAgfFxuICpcbiAqIDxpbWcgc3JjPVwiLi9sb2dvLXNtYWxsLnBuZ1wiIHN0eWxlPVwibWF4LXdpZHRoOiA3NXB4OyBtYXJnaW46IDE1cHggMCAwIDVweDtcIiAvPlxuICpcbiAqIEBtb2R1bGUgc3RhdGVib3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IGBvYmplY3RgLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xlbW1pbmcnLCB7XG4gICAqICAgY2hhcnQ6IGBcbiAgICogICAgIHdhbGtpbmcgLT4gKGRpZ2dpbmcgfCBidWlsZGluZyB8IGZhbGxpbmcpIC0+XG4gICAqICAgICAgIHdhbGtpbmdcbiAgICpcbiAgICogICAgIGZhbGxpbmcgLT4gc3BsYXR0aW5nXG4gICAqICAgICB3YWxraW5nIC0+IGV4aXRpbmdcbiAgICogICBgXG4gICAqIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqICBHaXZlIHlvdXIgU3RhdGVib3QgYSBuYW1lLiBVc2VkIGZvciBsb2dnaW5nIGFuZCBieSB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gICAqIEBwYXJhbSB7c3RhdGVib3RPcHRpb25zfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtzdGF0ZWJvdEZzbX1cbiAgICovXG4gIFN0YXRlYm90LFxuXG4gIC8qKlxuICAgKiBUZXN0cyB0aGF0IGFuIG9iamVjdCBpcyBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICAgKlxuICAgKiBpc1N0YXRlYm90KG1hY2hpbmUpXG4gICAqIC8vIHRydWVcbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc1N0YXRlYm90LFxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCBhIGNlcnRhaW4gcm91dGUgY2FuIGJlIGZvbGxvd2VkIGJ5IGFcbiAgICoge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gICAqXG4gICAqIFRoaXMgbWVyZWx5IHRlc3RzIHRoYXQgYSBjZXJ0YWluIHBhdGggY2FuIGJlIHRha2VuIHRocm91Z2ggYVxuICAgKiBzdGF0ZS1tYWNoaW5lLiBJdCBkb2Vzbid0IGFzc2VydCB0aGF0IHRoZSBzdGF0ZXMgYXJlIG1vdmVkLXRocm91Z2hcbiAgICogd2hpbGUgdGhlIG1hY2hpbmUgaXMgd29ya2luZywgYXMgd2l0aFxuICAgKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdGF0ZWJvdEZzbX0gbWFjaGluZVxuICAgKiAgVGhlIG1hY2hpbmUgdG8gdGVzdCB0aGUgcm91dGUgb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSByb3V0ZVxuICAgKiAgVGhlIHJvdXRlIHRvIHRlc3QgYXMgYW4gYXJyb3ctZGVsaW1pdGVkIHN0cmluZzpcbiAgICpcbiAgICogIGBcbiAgICogIFwiaWRsZSAtPiBwZW5kaW5nIC0+IHN1Y2Nlc3MgLT4gZG9uZVwiXG4gICAqICBgXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAgICpcbiAgICogcm91dGVJc1Bvc3NpYmxlKG1hY2hpbmUsXG4gICAqICAgJ3dhbGtpbmcgLT4gZmFsbGluZyAtPiBzcGxhdHRpbmcgLT4gd2Fsa2luZydcbiAgICogKVxuICAgKiAvLyBmYWxzZVxuICAgKi9cbiAgcm91dGVJc1Bvc3NpYmxlLFxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IHRyYWNlZCB0aGUgcm91dGUgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBXaGVyZWFzIHtAbGluayAjc3RhdGVib3Ryb3V0ZWlzcG9zc2libGV8cm91dGVJc1Bvc3NpYmxlKCl9IG9ubHkgY2hlY2tzXG4gICAqIHRoYXQgYSBwYXJ0aWN1bGFyIHJvdXRlIGNhbiBiZSBmb2xsb3dlZCwgYGFzc2VydFJvdXRlYCB3aWxsIGhvb2staW50b1xuICAgKiBhIG1hY2hpbmUgYW5kIHdhaXQgZm9yIGl0IHRvIHRyYWNlIHRoZSBzcGVjaWZpZWQgcGF0aCB3aXRoaW4gYVxuICAgKiB0aW1lb3V0IHBlcmlvZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAYXN5bmNcbiAgICogQHBhcmFtIHtzdGF0ZWJvdEZzbX0gbWFjaGluZVxuICAgKiAgVGhlIG1hY2hpbmUgdG8gcnVuIHRoZSBhc3NlcnRpb24gb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBleHBlY3RlZFJvdXRlXG4gICAqICBUaGUgZXhwZWN0ZWQgcm91dGUgYXMgYW4gYXJyb3ctZGVsaW1pdGVkIHN0cmluZzpcbiAgICpcbiAgICogIGBcbiAgICogIFwiaWRsZSAtPiBwZW5kaW5nIC0+IHN1Y2Nlc3MgLT4gZG9uZVwiXG4gICAqICBgXG4gICAqIEBwYXJhbSB7YXNzZXJ0Um91dGVPcHRpb25zfSBbb3B0aW9uc11cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICAgKlxuICAgKiBhc3NlcnRSb3V0ZShcbiAgICogICBtYWNoaW5lLCAncHJlcGFyZSAtPiBkZWJvdW5jZSAtPiBzZW5kaW5nIC0+IGRvbmUgLT4gaWRsZScsXG4gICAqICAge1xuICAgKiAgICAgZGVzY3JpcHRpb246ICdFbWFpbCBzZW50IHdpdGggbm8gaXNzdWVzJyxcbiAgICogICAgIGZyb21TdGF0ZTogJ2lkbGUnLFxuICAgKiAgICAgdGltZW91dEluTXM6IDEwMDAgKiAyMCxcbiAgICogICAgIHBlcm1pdHRlZERldmlhdGlvbnM6IDAsXG4gICAqICAgICBsb2dMZXZlbDogM1xuICAgKiAgIH1cbiAgICogKVxuICAgKiAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnQXNzZXJ0aW9uIHBhc3NlZCEnKSlcbiAgICogLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGBXaG9vcHM6ICR7ZXJyfWApKVxuICAgKlxuICAgKiBtYWNoaW5lLmVudGVyKCdpZGxlJylcbiAgICovXG4gIGFzc2VydFJvdXRlLFxuXG4gIC8qKlxuICAgKiBEZWNvbXBvc2UgYSB7QGxpbmsgc3RhdGVib3RDaGFydH0gaW50byBhbiBvYmplY3Qgb2YgYHN0YXRlc2AsIGByb3V0ZXNgLFxuICAgKiBhbmQgYHRyYW5zaXRpb25zYC5cbiAgICpcbiAgICogU3RhdGVib3QoKSB1c2VzIHRoaXMgaW50ZXJuYWxseSB0byBwYXJzZSBjaGFydHMuIEV4cG9zZWQgZm9yIGRlYnVnZ2luZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0YXRlYm90Q2hhcnR9IGNoYXJ0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnRgXG4gICAqICAgcGVuZGluZyAtPlxuICAgKiAgICAgc3VjY2VzcyB8IGZhaWx1cmVcbiAgICogYFxuICAgKiAvLyBzdGF0ZXMgPSBbJ3BlbmRpbmcnLCAnc3VjY2VzcycsICdmYWlsdXJlJ11cbiAgICogLy8gcm91dGVzID0gWyAncGVuZGluZy0+c3VjY2VzcycsICdwZW5kaW5nLT5mYWlsdXJlJ11cbiAgICogLy8gdHJhbnNpdGlvbnMgPSBbXG4gICAqIC8vICAgWydwZW5kaW5nJywgJ3N1Y2Nlc3MnXSxcbiAgICogLy8gICBbJ3BlbmRpbmcnLCAnZmFpbHVyZSddXG4gICAqIC8vIF1cbiAgICovXG4gIGRlY29tcG9zZUNoYXJ0XG59XG4iXSwibmFtZXMiOlsidW5pcSIsIkFyZ1R5cGVFcnJvciIsImlzVGVtcGxhdGVMaXRlcmFsIiwicmVxdWlyZSQkMCIsImlzQXJyYXkiLCJpc0V2ZW50RW1pdHRlciIsImlzRnVuY3Rpb24iLCJpc1Bvam8iLCJpc1N0cmluZyIsIkxvZ2dlciIsIlJlZmVyZW5jZUNvdW50ZXIiLCJkZWNvbXBvc2VDaGFydCIsImN4QXJyb3ciLCJyZXF1aXJlJCQxIiwiZXZlbnRzIiwiRXZlbnRFbWl0dGVyIiwiaXNTdGF0ZWJvdCIsImRlY29tcG9zZVJvdXRlIiwiRGVmZXIiLCJPbmNlIiwiUmV2b2thYmxlIiwicmVxdWlyZSQkMiIsImFyZ1R5cGVFcnJvciIsIlN0YXRlYm90IiwiYXNzZXJ0Um91dGUiLCJyb3V0ZUlzUG9zc2libGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxTQUFjLEdBQUc7QUFDakIsRUFBRSxPQUFPO0FBQ1QsRUFBRSxjQUFjO0FBQ2hCLEVBQUUsVUFBVTtBQUNaLEVBQUUsTUFBTTtBQUNSLEVBQUUsUUFBUTtBQUNWLEVBQUUsaUJBQWlCO0FBQ25CLEVBQUUsSUFBSTtBQUNOLEVBQUUsS0FBSztBQUNQLEVBQUUsSUFBSTtBQUNOLEVBQUUsU0FBUztBQUNYLEVBQUUsZ0JBQWdCO0FBQ2xCLEVBQUUsWUFBWTtBQUNkLEVBQUUsTUFBTTtBQUNSLEVBQUM7QUFFRCxTQUFTLE9BQU8sRUFBRSxHQUFHLEVBQUU7QUFDdkIsRUFBRSxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEVBQUUsSUFBSTtBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxFQUFFLElBQUk7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksS0FBSyxFQUFFLEtBQUs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksS0FBSyxFQUFFLEtBQUs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FBQztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEVBQUUsTUFBTSxJQUFJLEVBQUU7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRTtBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLEVBQUUsT0FBTztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxFQUFFLE1BQU0sSUFBSTtBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksU0FBUyxFQUFFLGdCQUFnQixDQUFDLFNBQVM7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sRUFBRSxPQUFPO0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxFQUFFLGdCQUFnQixDQUFDLFFBQVE7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFVBQVUsRUFBRSxhQUFhLENBQUMsVUFBVTtBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVc7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEVBQUUsV0FBVyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0JBQWtCLEVBQUUsV0FBVyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLENBQUM7QUFFdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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
