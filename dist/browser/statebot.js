
/*
 * Statebot
 * v3.0.2
 * https://shuckster.github.io/statebot/
 * License: MIT
 */
/* exported statebot */
/* eslint-disable no-func-assign, no-unsafe-finally, no-unused-vars */
var statebot = (function (exports) {
  'use strict';

  function mitt (n) {
    return {
      all: n = n || new Map(),
      on: function (t, e) {
        var i = n.get(t);
        i ? i.push(e) : n.set(t, [e]);
      },
      off: function (t, e) {
        var i = n.get(t);
        i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
      },
      emit: function (t, e) {
        var i = n.get(t);
        i && i.slice().map(function (n) {
          n(e);
        }), (i = n.get("*")) && i.slice().map(function (n) {
          n(t, e);
        });
      }
    };
  }

  function isEventEmitter(obj) {
    return isObject(obj) && isFunction(obj.emit) && (isFunction(obj.addListener) || isFunction(obj.on)) && (isFunction(obj.removeListener) || isFunction(obj.off));
  }

  isEventEmitter.displayName = 'isEventEmitter';

  isArray.displayName = 'isUnset';

  function isArray(obj) {
    return Array.isArray(obj);
  }

  isArray.displayName = 'isArray';

  function isArguments(obj) {
    return Object.prototype.toString.call(obj) === '[object Arguments]';
  }

  isArguments.displayName = 'isArguments';

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  isFunction.displayName = 'isFunction';

  function isString(obj) {
    return typeof obj === 'string';
  }

  isString.displayName = 'isString';

  function isAllStrings(arr) {
    return isArray(arr) && arr.every(isString);
  }

  isAllStrings.displayName = 'isAllStrings';

  function isUndefined(obj) {
    return obj === undefined;
  }

  isUndefined.displayName = 'isUndefined';

  function isNull(obj) {
    return obj === null;
  }

  isNull.displayName = 'isNull';

  function isNumber(obj) {
    return typeof obj === 'number';
  }

  isNumber.displayName = 'isNumber';

  function isObject(obj) {
    return typeof obj === 'object' && !isNull(obj);
  }

  isObject.displayName = 'isObject';

  function isPojo(obj) {
    if (isNull(obj) || !isObject(obj) || isArguments(obj)) {
      return false;
    }

    return Object.getPrototypeOf(obj) === Object.prototype;
  }

  isPojo.displayName = 'isPojo';

  function isTemplateLiteral(obj) {
    if (isString(obj)) {
      return true;
    }

    if (!isArray(obj)) {
      return false;
    }

    return obj.every(isString);
  }

  isTemplateLiteral.displayName = 'isTemplateLiteral';

  const typeErrorStringIfFnReturnsFalse = (argName, argTypeFn, arg) => {
    return argTypeFn(arg) ? undefined : (argTypeFn.displayName || argTypeFn.name) + "(".concat(argName, ") did not return true");
  };

  const typeErrorStringIfTypeOfFails = (argName, argType, arg) => {
    return typeof arg === argType ? undefined : "Argument \"".concat(argName, "\" should be a ").concat(argType);
  };

  const typeErrorStringFromArgument = argMap => (arg, index) => {
    if (index >= argMap.length) {
      return;
    }

    const {
      argName,
      argType
    } = argMap[index];

    if (isUndefined(arg)) {
      return "Argument undefined: \"".concat(argName, "\"");
    }

    const permittedArgTypes = Array.isArray(argType) ? argType : [argType];
    const errorDescs = permittedArgTypes.map(argType => isFunction(argType) ? typeErrorStringIfFnReturnsFalse(argName, argType, arg) : typeErrorStringIfTypeOfFails(argName, argType, arg)).filter(isString);
    const multipleTypesSpecified = permittedArgTypes.length > 1;
    const shouldError = multipleTypesSpecified ? errorDescs.length > 1 : errorDescs.length;

    if (shouldError) {
      return errorDescs.join('\n| ') + "\n> typeof ".concat(argName, " === ").concat(typeof arg, "(").concat(JSON.stringify(arg), ")");
    }
  };

  function ArgTypeError(namespace) {
    return typeMap => {
      const argMap = Object.entries(typeMap).map(_ref => {
        let [argName, argType] = _ref;
        return {
          argName,
          argType
        };
      });
      return fnName => function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        const processedArgs = Array.from(args, x => isArguments(x) ? Array.from(x) : x).flat(1);
        const err = processedArgs.map(typeErrorStringFromArgument(argMap)).filter(isString);

        if (!err.length) {
          return;
        }

        const signature = Object.keys(typeMap).join(', ');
        return "\n".concat(namespace || '').concat(fnName, "(").concat(signature, "):\n") + "".concat(err.map(err => "| ".concat(err)).join('\n'));
      };
    };
  }

  function wrapEmitter(events) {
    const emit = function (eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return events.emit(eventName, args);
    };

    const addListener = events.addListener ? function () {
      return events.addListener(...arguments);
    } : function () {
      return events.on(...arguments);
    };
    const removeListener = events.removeListener ? function () {
      return events.removeListener(...arguments);
    } : function () {
      return events.off(...arguments);
    };
    const wrapMap = new Map();

    function on(eventName, fn) {
      let fnMeta = wrapMap.get(fn);

      if (!fnMeta) {
        fnMeta = {
          handleEvent: function () {
            let args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            return fn(...[args].flat());
          },
          refCount: 0
        };
        wrapMap.set(fn, fnMeta);
      }

      fnMeta.refCount += 1;
      addListener(eventName, fnMeta.handleEvent);
    }

    function off(eventName, fn) {
      let fnMeta = wrapMap.get(fn);

      if (!fnMeta) {
        return;
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
    };
  }

  function uniq(input) {
    return input.reduce((acc, one) => acc.indexOf(one) === -1 ? (acc.push(one), acc) : acc, []);
  }

  function defer(fn) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    const timer = setTimeout(fn, 0, ...args);
    return () => {
      clearTimeout(timer);
    };
  }

  function Defer(fn) {
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return defer(fn, ...args);
    };
  }

  function Once(fn) {
    const {
      revoke,
      fn: _fn
    } = Revokable(fn);
    let result;
    return function () {
      result = _fn(...arguments);
      revoke();
      return result;
    };
  }

  function Revokable(fn) {
    let revoked = false;
    let result;
    return {
      fn: function () {
        if (!revoked) {
          result = fn(...arguments);
        }

        return result;
      },
      revoke: () => {
        revoked = true;
      }
    };
  }

  function Pausables(startPaused, runFnWhenPaused) {
    runFnWhenPaused = runFnWhenPaused || function () {};

    let paused = !!startPaused;

    function Pausable(fn) {
      return function () {
        if (paused) {
          runFnWhenPaused();
          return false;
        }

        return fn(...arguments);
      };
    }

    return {
      Pausable,
      paused: () => paused,
      pause: () => {
        paused = true;
      },
      resume: () => {
        paused = false;
      }
    };
  }

  function ReferenceCounter(logPrefix, kind, description) {
    for (var _len4 = arguments.length, expecting = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
      expecting[_key4 - 3] = arguments[_key4];
    }

    const _refs = [...expecting].flat().reduce((acc, ref) => ({ ...acc,
      [ref]: 0
    }), {});

    function increase(ref) {
      _refs[ref] = countOf(ref) + 1;
      return () => {
        decrease(ref);
      };
    }

    function decrease(ref) {
      const count = countOf(ref) - 1;
      _refs[ref] = Math.max(count, 0);
    }

    function countOf(ref) {
      return _refs[ref] || 0;
    }

    function refs() {
      return { ..._refs
      };
    }

    function table() {
      return Object.keys(_refs).sort().map(key => [key, _refs[key]]).map(_ref => {
        let [ref, count] = _ref;
        return {
          [kind]: ref,
          refs: count || 'None'
        };
      });
    }

    function toValue() {
      return {
        description: "".concat(logPrefix, ": ").concat(description, ":"),
        table: table()
      };
    }

    return {
      increase,
      decrease,
      countOf,
      toValue,
      refs
    };
  }

  function Definitions() {
    const dictionary = {};

    function undefine(word, definition) {
      dictionary[word] = (dictionary[word] || []).filter(next => next !== definition);

      if (dictionary[word].length === 0) {
        delete dictionary[word];
      }
    }

    function define(word, definition) {
      dictionary[word] = dictionary[word] || [];
      dictionary[word].push(definition);
      return () => undefine(word, definition);
    }

    function definitionsOf(word) {
      return dictionary[word] || [];
    }

    return {
      define,
      undefine,
      definitionsOf
    };
  }

  function Logger(level, _console) {
    if (isString(level)) {
      level = {
        info: 3,
        log: 2,
        warn: 1,
        none: 0
      }[level] || 3;
    }

    function canWarn() {
      return level >= 1;
    }

    function canLog() {
      return level >= 2;
    }

    function canInfo() {
      return level >= 3;
    }

    const {
      info,
      table,
      log,
      warn,
      error
    } = _console || console;
    return {
      canWarn,
      canLog,
      canInfo,
      info: function () {
        canInfo() && info(...arguments);
      },
      table: function () {
        canLog() && table(...arguments);
      },
      log: function () {
        canLog() && log(...arguments);
      },
      warn: function () {
        canWarn() && warn(...arguments);
      },
      error: function () {
        error(...arguments);
      }
    };
  }

  const rxCRLF = /[\r\n]/;
  const cxPipe = '|';
  const cxArrow = '->';
  const rxOperators = [cxPipe, cxArrow].map(rxUnsafe => rxUnsafe.replace('|', '\\|')).join('|');
  const rxLineContinuations = new RegExp("(".concat(rxOperators, ")$"));
  const rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
  const rxComment = /(\/\/[^\n\r]*)/;
  const argTypeError$1 = ArgTypeError('statebot.');

  function decomposeRoute(templateLiteral) {
    const err = argTypeError$1({
      templateLiteral: isTemplateLiteral
    })('decomposeRoute')(templateLiteral);

    if (err) {
      throw TypeError(err);
    }

    const lines = condensedLines(templateLiteral);
    const linesOfTokens = tokenisedLines(lines);
    const route = linesOfTokens.flat(2);
    return route;
  }

  function decomposeChart(chart) {
    const err = argTypeError$1({
      chart: isTemplateLiteral
    })('decomposeChart')(chart);

    if (err) {
      throw TypeError(err);
    }

    const lines = condensedLines(chart);
    const linesOfTokens = tokenisedLines(lines);
    const linesOfRoutes = linesOfTokens.flatMap(decomposeRouteFromTokens);
    const linesOfTransitions = linesOfRoutes.flatMap(decomposeTransitionsFromRoute);
    let emptyStateFound = false;
    const routeKeys = linesOfTransitions.map(route => {
      if (route.includes('')) {
        emptyStateFound = true;
      }

      return route.join(cxArrow);
    });
    const filteredRoutes = uniq(routeKeys);
    const filteredStates = uniq(linesOfTokens.flat(3));
    return {
      transitions: filteredRoutes.map(route => route.split(cxArrow)),
      routes: filteredRoutes,
      states: !emptyStateFound ? filteredStates.filter(Boolean) : filteredStates
    };
  }

  function linesFrom(strOrArr) {
    return [strOrArr].flat().reduce((acc, line) => [...acc, ...line.split(rxCRLF)], []);
  }

  function condensedLines(strOrArr) {
    const input = linesFrom(strOrArr);
    const output = [];
    let previousLineHasContinuation = false;

    const condenseLine = (condensedLine, line) => {
      const sanitisedLine = line.replace(rxComment, '').replace(rxDisallowedCharacters, '');

      if (!sanitisedLine) {
        return condensedLine;
      }

      previousLineHasContinuation = rxLineContinuations.test(sanitisedLine);

      if (previousLineHasContinuation) {
        return condensedLine + sanitisedLine;
      }

      output.push(condensedLine + sanitisedLine);
      return '';
    };

    const finalCondensedLine = input.reduce(condenseLine, '');

    if (previousLineHasContinuation || finalCondensedLine) {
      return [...output, finalCondensedLine];
    }

    return [...output];
  }

  function tokenisedLines(lines) {
    return lines.map(line => line.split(cxArrow).map(str => str.split(cxPipe)));
  }

  function decomposeRouteFromTokens(line) {
    const output = [];
    line.reduce((previousStates, states) => {
      if (previousStates === false) {
        return [...states];
      }

      output.push([previousStates, [...states]]);
      return [...states];
    }, false);
    return output;
  }

  function decomposeTransitionsFromRoute(_ref) {
    let [fromStates, toStates] = _ref;
    return fromStates.reduce((acc, fromState) => (acc.push(...toStates.map(toState => [fromState, toState])), acc), []);
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

  function Statebot(name, options) {
    if (!isString(name)) {
      throw new TypeError('\nStatebot: Please specify a name for this machine');
    }

    const logPrefix = "Statebot[".concat(name, "]");

    if (!isPojo(options)) {
      throw new TypeError("\n".concat(logPrefix, ": Please specify options for this machine"));
    }

    const {
      chart = undefined,
      logLevel = 3,
      historyLimit = 2
    } = options || {};
    const events = isUndefined(options.events) ? wrapEmitter(mitt()) : isEventEmitter(options.events) && wrapEmitter(options.events);

    if (!events) {
      throw new TypeError("\n".concat(logPrefix, ": Invalid event-emitter specified in options"));
    }

    const {
      states = [],
      routes = []
    } = chart ? decomposeChart(chart) : options;
    const {
      startIn = states[0]
    } = options;

    if (!states.includes(startIn)) {
      throw new Error("".concat(logPrefix, ": Starting-state not in chart: \"").concat(startIn, "\""));
    }

    const argTypeError = ArgTypeError("".concat(logPrefix, "#"));

    const _console = Logger(logLevel, console);

    const {
      canWarn
    } = _console;
    const stateHistory = [startIn];
    const stateHistoryLimit = Math.max(historyLimit, 2);
    let transitionId = 0;
    const {
      pause,
      resume,
      paused,
      Pausable
    } = Pausables(false, () => _console.warn("".concat(logPrefix, ": Ignoring callback, paused")));
    const transitionsFromEvents = Definitions();
    const internalEvents = wrapEmitter(mitt());
    const emitInternalEvent = Pausable(internalEvents.emit);

    function onInternalEvent(eventName, cb) {
      internalEvents.on(eventName, cb);
      return () => internalEvents.off(eventName, cb);
    }

    const statesHandled = ReferenceCounter(logPrefix, 'states', 'Listening for the following state-changes', [...states]);
    const routesHandled = ReferenceCounter(logPrefix, 'transitions', 'Listening for the following transitions', [...routes]);
    const eventsHandled = ReferenceCounter(logPrefix, 'events', 'Listening for the following events');

    function applyHitcher(hitcher, fnName) {
      const hitcherActions = isFunction(hitcher) ? hitcher({
        enter,
        emit,
        Enter,
        Emit
      }) : isPojo(hitcher) ? hitcher : null;

      if (!isPojo(hitcherActions)) {
        throw new TypeError("".concat(logPrefix, "#").concat(fnName, "(): Expected an object, or a function that returns an object"));
      }

      const allStates = [];
      const allRoutes = [];
      const {
        transitionsForEvents,
        transitionsOnly
      } = decomposeHitcherActions(hitcherActions);
      const eventsMappedToTransitionConfigs = Object.entries(transitionsForEvents).reduce(decomposeTransitionsForEvent, {});
      const transitionConfigs = expandTransitions(transitionsOnly, canWarn);
      const allCleanupFns = Object.entries(eventsMappedToTransitionConfigs).map(createEventHandlerForTransition).concat(transitionConfigs.configs.map(runThenMethodOnTransition)).flat();

      if (canWarn()) {
        allStates.push(...transitionConfigs.states);
        allRoutes.push(...transitionConfigs.routes);
        const invalidStates = allStates.filter(state => !states.includes(state));
        const invalidRoutes = allRoutes.filter(route => !routes.includes(route));

        if (invalidStates.length) {
          _console.warn("".concat(logPrefix, "#").concat(fnName, "(): Invalid states specified:\n") + invalidStates.map(state => "  > \"".concat(state, "\"")).join('\n'));
        }

        if (invalidRoutes.length) {
          _console.warn("".concat(logPrefix, "#").concat(fnName, "(): Invalid transitions specified:\n") + invalidRoutes.map(route => "  > \"".concat(route, "\"")).join('\n'));
        }
      }

      return () => allCleanupFns.map(fn => fn());

      function runThenMethodOnTransition(config) {
        const {
          fromState,
          toState,
          action
        } = config;
        const route = "".concat(fromState, "->").concat(toState);
        return [routesHandled.increase(route), onInternalEvent(route, bindActionTo(toState, action))];
      }

      function decomposeTransitionsForEvent(acc, _ref) {
        let [eventName, transitionsAndAction] = _ref;
        const {
          states,
          routes,
          configs
        } = expandTransitions(transitionsAndAction, canWarn);

        if (canWarn()) {
          allStates.push(...states);
          allRoutes.push(...routes);
        }

        return { ...acc,
          [eventName]: configs
        };
      }

      function ifStateThenEnterState(_ref2) {
        let {
          fromState,
          toState,
          action,
          args
        } = _ref2;
        return inState(fromState, () => {
          enter(toState, ...args);
          isFunction(action) && runActionFor(toState, action, ...args);
          return true;
        });
      }

      function createEventHandlerForTransition(_ref3) {
        let [eventName, configs] = _ref3;
        return [eventsHandled.increase(eventName), onEvent(eventName, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          const eventWasHandled = configs.map(config => ({ ...config,
            args
          })).some(ifStateThenEnterState);

          if (!eventWasHandled) {
            transitionNoOp("Event not handled: \"".concat(eventName, "\""));
          }
        })].concat(configs.map(_ref4 => {
          let {
            fromState,
            toState
          } = _ref4;
          return transitionsFromEvents.define("".concat(eventName, ":").concat(fromState), toState);
        }));
      }

      function runActionFor(state, actionFn) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        const onExitingState = actionFn(...args);

        if (isFunction(onExitingState)) {
          const uninstall = Once(enterExitMethods[ON_EXITING](state, toState => {
            uninstall();
            onExitingState(toState);
          }));
          allCleanupFns.push(uninstall);
        }
      }

      function bindActionTo(state, actionFn) {
        return function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return runActionFor(state, actionFn, ...args);
        };
      }
    }

    function _peek(eventName, stateObject) {
      let calledInternally = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      const err1 = argTypeError({
        eventName: isString
      })('peek')(eventName);

      if (err1) {
        throw new TypeError(err1);
      }

      const eventAndState = eventName + ':' + currentState();
      const statesFromEvent = transitionsFromEvents.definitionsOf(eventAndState);

      if (statesFromEvent.length > 1) {
        const reason = "".concat(logPrefix, ": Event \"").concat(eventName, "\" causes multiple transitions.\n") + "  > From state: \"".concat(currentState(), "\"\n") + "  > To states: \"".concat(statesFromEvent.join(', '), "\"\n\n") + "Check your performTransitions() config.";
        throw new RangeError(reason);
      }

      if (!calledInternally && statesFromEvent.length === 0) {
        if (eventsHandled.countOf(eventName) === 0) {
          _console.warn("".concat(logPrefix, ": Event not handled: \"").concat(eventName, "\""));
        } else {
          _console.warn("".concat(logPrefix, ": Will not transition after emitting: \"").concat(eventName, "\""));
        }
      }

      const toState = statesFromEvent[0];

      if (isUndefined(stateObject)) {
        return isUndefined(toState) ? currentState() : toState;
      }

      const err2 = argTypeError({
        stateObject: isPojo
      })('peek')(stateObject);

      if (err2) {
        throw new TypeError(err2);
      }

      if (Object.prototype.hasOwnProperty.call(stateObject, toState)) {
        const anyOrFn = stateObject[toState];
        return isFunction(anyOrFn) ? anyOrFn() : anyOrFn;
      }

      return null;
    }

    function peek(eventName, stateObject) {
      return _peek(eventName, stateObject, false);
    }

    function previousState() {
      return stateHistory[stateHistory.length - 2];
    }

    function currentState() {
      return stateHistory[stateHistory.length - 1];
    }

    function _state_canTransitionTo() {
      for (var _len4 = arguments.length, states = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        states[_key4] = arguments[_key4];
      }

      const err = argTypeError({
        states: isAllStrings
      })('canTransitionTo')([states]);

      if (err) {
        throw new TypeError(err);
      }

      if (!states.length) {
        return false;
      }

      const nextStates = statesAvailableFromHere();
      return states.every(state => nextStates.includes(state));
    }

    function canTransitionTo() {
      for (var _len5 = arguments.length, states = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        states[_key5] = arguments[_key5];
      }

      const testStates = states.flat();

      if (testStates.length === 2 && isString(testStates[0]) && isPojo(testStates[1])) {
        const thisState = testStates[0];
        const {
          afterEmitting
        } = testStates[1];
        const err = argTypeError({
          thisState: isString,
          '{ afterEmitting }': isString
        })('canTransitionTo')(thisState, afterEmitting);

        if (err) {
          throw new TypeError(err);
        }

        return thisState !== currentState() && _peek(afterEmitting) === thisState;
      }

      return _state_canTransitionTo(...testStates);
    }

    function statesAvailableFromHere(state) {
      const _state = !isUndefined(state) ? state : currentState();

      const err = argTypeError({
        state: isString
      })('statesAvailableFromHere')(_state);

      if (err) {
        throw new TypeError(err);
      }

      return routes.reduce((acc, route) => {
        const [fromState, toState] = route.split(cxArrow).map(state => state.trim());
        return fromState === _state ? [...acc, toState] : acc;
      }, []);
    }

    function _inState(state, anyOrFn) {
      const conditionMatches = currentState() === state;

      if (isUndefined(anyOrFn)) {
        return conditionMatches;
      }

      if (!conditionMatches) {
        return null;
      }

      if (isFunction(anyOrFn)) {
        for (var _len6 = arguments.length, fnArgs = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
          fnArgs[_key6 - 2] = arguments[_key6];
        }

        return anyOrFn(...fnArgs);
      }

      return anyOrFn;
    }

    function _inStateObject(stateObject) {
      const match = Object.entries(stateObject).find(_ref5 => {
        let [state] = _ref5;
        return _inState(state);
      });

      for (var _len7 = arguments.length, fnArgs = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        fnArgs[_key7 - 1] = arguments[_key7];
      }

      return match ? _inState(...match.concat(fnArgs)) : null;
    }

    function inState() {
      const err = argTypeError({
        state: [isString, isPojo]
      })('inState')(arguments.length <= 0 ? undefined : arguments[0]);

      if (err) {
        throw new TypeError(err);
      }

      return isPojo(arguments.length <= 0 ? undefined : arguments[0]) ? _inStateObject(...arguments) : _inState(...arguments);
    }

    const emit = function (eventName) {
      const err = argTypeError({
        eventName: isString
      })('emit')(eventName);

      if (err) {
        throw new TypeError(err);
      }

      _peek(eventName);

      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      return events.emit(eventName, ...args);
    };

    const enter = function (state) {
      const err = argTypeError({
        state: isString
      })('enter')(state);

      if (err) {
        throw new TypeError(err);
      }

      const inState = currentState();
      const toState = state;

      if (toState === inState) {
        transitionNoOp("Already in state: \"".concat(toState, "\""));
        return false;
      }

      if (!states.includes(toState)) {
        transitionNoOp("Invalid state \"".concat(toState, "\", not switching"));
        return false;
      }

      const nextRoute = "".concat(inState, "->").concat(toState);

      if (!routes.includes(nextRoute)) {
        transitionNoOp("Invalid transition \"".concat(nextRoute, "\", not switching"));
        return false;
      }

      _console.info("".concat(logPrefix, ": tId<").concat(++transitionId, ">: ").concat(nextRoute));

      stateHistory.push(toState);

      if (stateHistory.length > stateHistoryLimit) {
        stateHistory.shift();
      }

      for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHING], toState, inState, ...args);
      emitInternalEvent(nextRoute, ...args);
      emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHED], toState, inState, ...args);
      return true;
    };

    function onEvent(eventName, cb) {
      const err = argTypeError({
        eventName: isString,
        cb: isFunction
      })('onEvent')(eventName, cb);

      if (err) {
        throw new TypeError(err);
      }

      events.on(eventName, cb);
      return () => events.off(eventName, cb);
    }

    const switchMethods = Object.keys(INTERNAL_EVENTS).reduce((obj, methodName) => ({ ...obj,
      [methodName]: cb => {
        const err = argTypeError({
          cb: isFunction
        })(methodName)(cb);

        if (err) {
          throw new TypeError(err);
        }

        const decreaseRefCount = statesHandled.increase(INTERNAL_EVENTS[methodName]);
        const removeEvent = onInternalEvent(INTERNAL_EVENTS[methodName], cb);
        return () => {
          removeEvent();
          decreaseRefCount();
        };
      }
    }), {});
    const enterExitMethods = [[ON_EXITING, ON_SWITCHING], [ON_ENTERING, ON_SWITCHING], [ON_EXITED, ON_SWITCHED], [ON_ENTERED, ON_SWITCHED]].reduce((obj, names) => {
      const [methodName, switchMethod] = names;
      const name = methodName.slice(2);
      const eventName = name.toLowerCase();
      return { ...obj,
        [methodName]: (state, cb) => {
          const err = argTypeError({
            state: isString,
            cb: isFunction
          })(methodName)(state, cb);

          if (err) {
            throw new TypeError(err);
          }

          const decreaseRefCounts = [statesHandled.increase(state), statesHandled.increase("".concat(state, ":").concat(eventName))];
          const removeEvent = switchMethods[switchMethod](function (toState, fromState) {
            for (var _len10 = arguments.length, args = new Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
              args[_key10 - 2] = arguments[_key10];
            }

            if (name.indexOf('Exit') === 0) {
              state === fromState && cb(toState, ...args);
            } else {
              state === toState && cb(fromState, ...args);
            }
          });
          return () => {
            removeEvent();
            decreaseRefCounts.map(fn => fn());
          };
        }
      };
    }, {});

    function Emit(eventName) {
      for (var _len11 = arguments.length, curriedArgs = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        curriedArgs[_key11 - 1] = arguments[_key11];
      }

      const err = argTypeError({
        eventName: isString
      })('Emit')(eventName);

      if (err) {
        throw new TypeError(err);
      }

      return function () {
        for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          args[_key12] = arguments[_key12];
        }

        return emit(eventName, ...[...curriedArgs, ...args]);
      };
    }

    function Enter(state) {
      for (var _len13 = arguments.length, curriedArgs = new Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
        curriedArgs[_key13 - 1] = arguments[_key13];
      }

      const err = argTypeError({
        state: isString
      })('Enter')(state);

      if (err) {
        throw new TypeError(err);
      }

      return function () {
        for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
          args[_key14] = arguments[_key14];
        }

        return enter(state, ...[...curriedArgs, ...args]);
      };
    }

    function _InState(state, anyOrFn) {
      for (var _len15 = arguments.length, curriedFnArgs = new Array(_len15 > 2 ? _len15 - 2 : 0), _key15 = 2; _key15 < _len15; _key15++) {
        curriedFnArgs[_key15 - 2] = arguments[_key15];
      }

      return function () {
        for (var _len16 = arguments.length, fnArgs = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
          fnArgs[_key16] = arguments[_key16];
        }

        return inState(state, anyOrFn, ...[...curriedFnArgs, ...fnArgs]);
      };
    }

    function _InStateObject(stateObject) {
      for (var _len17 = arguments.length, curriedFnArgs = new Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
        curriedFnArgs[_key17 - 1] = arguments[_key17];
      }

      return function () {
        for (var _len18 = arguments.length, fnArgs = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
          fnArgs[_key18] = arguments[_key18];
        }

        return inState(stateObject, ...[...curriedFnArgs, ...fnArgs]);
      };
    }

    function InState() {
      const err = argTypeError({
        state: [isString, isPojo]
      })('InState')(arguments.length <= 0 ? undefined : arguments[0]);

      if (err) {
        throw new TypeError(err);
      }

      return isPojo(arguments.length <= 0 ? undefined : arguments[0]) ? _InStateObject(...arguments) : _InState(...arguments);
    }

    function reset() {
      _console.warn("".concat(logPrefix, ": State-machine reset!"));

      stateHistory.length = 0;
      stateHistory.push(startIn);
    }

    function transitionNoOp(message) {
      const lastState = previousState();
      const inState = currentState();
      const prevRoute = "".concat(isUndefined(lastState) ? '[undefined]' : lastState, "->").concat(inState);
      const availableStates = statesAvailableFromHere();

      if (!availableStates.length) {
        _console.info("".concat(logPrefix, ": ").concat(message, "\n") + "  > Previous transition: \"".concat(prevRoute, "\"\n") + "  > There are no states available from \"".concat(inState, "\""));
      } else {
        _console.info("".concat(logPrefix, ": ").concat(message, "\n") + "  > Previous transition: \"".concat(prevRoute, "\"\n") + "  > From \"".concat(inState, "\", valid states are: [").concat(availableStates.map(state => "\"".concat(state, "\"")).join(', '), "]"));
      }
    }

    function inspect() {
      return {
        states: statesHandled.refs(),
        transitions: routesHandled.refs(),
        events: eventsHandled.refs()
      };
    }

    function info() {
      _console.log("".concat(logPrefix, ": Information about this state-machine"));

      logRefCounterInfo(statesHandled);
      logRefCounterInfo(routesHandled);
      logRefCounterInfo(eventsHandled);
    }

    function logRefCounterInfo(refCounter) {
      const {
        description,
        table
      } = refCounter.toValue();

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
      resume
    };
  }

  function decomposeHitcherActions(hitcherActions) {
    const transitionsForEvents = {};
    const transitionsOnly = [];
    Object.entries(hitcherActions).map(_ref6 => {
      let [routeChart, actionFnOrConfigObj] = _ref6;

      if (isFunction(actionFnOrConfigObj)) {
        transitionsOnly.push({
          routeChart,
          action: actionFnOrConfigObj
        });
        return;
      }

      if (!isPojo(actionFnOrConfigObj)) {
        return;
      }

      const {
        on: _on,
        then: _then
      } = actionFnOrConfigObj;
      const hasValidEventNames = isString(_on) || isArray(_on);

      if (hasValidEventNames) {
        const eventNames = [_on].flat();
        eventNames.map(name => {
          transitionsForEvents[name] = transitionsForEvents[name] || [];
          transitionsForEvents[name].push({
            routeChart,
            action: _then
          });
        });
        return;
      }

      if (isFunction(_then)) {
        transitionsOnly.push({
          routeChart,
          action: actionFnOrConfigObj
        });
      }
    });
    return {
      transitionsForEvents,
      transitionsOnly
    };
  }

  function expandTransitions(configs, canWarn) {
    const allStates = [];
    const allRoutes = [];

    const _configs = configs.reduce((acc, config) => {
      const {
        routeChart,
        action
      } = config;
      const {
        states,
        routes,
        transitions
      } = decomposeChart(routeChart);

      if (canWarn()) {
        allStates.push(...states);
        allRoutes.push(...routes);
      }

      return [...acc, ...transitions.map(_ref7 => {
        let [fromState, toState] = _ref7;
        return {
          fromState,
          toState,
          action
        };
      })];
    }, []);

    return {
      configs: _configs,
      states: allStates,
      routes: allRoutes
    };
  }

  function isStatebot(object) {
    return isPojo(object) && isNumber(object.__STATEBOT__);
  }

  const argTypeError = ArgTypeError('statebot.');

  function routeIsPossible(machine, route) {
    const err = argTypeError({
      machine: isStatebot,
      route: isTemplateLiteral
    })('routeIsPossible')(machine, route);

    if (err) {
      throw TypeError(err);
    }

    const _route = decomposeRoute(route);

    return _route.every((state, index) => {
      if (index === _route.length - 1) {
        return true;
      } else {
        const nextState = _route[index + 1];
        const availableStates = machine.statesAvailableFromHere(state);
        const passes = availableStates.includes(nextState);
        return passes;
      }
    });
  }

  let assertionId = 0;

  function assertRoute(machine, expectedRoute, options) {
    const err = argTypeError({
      machine: isStatebot,
      expectedRoute: isTemplateLiteral
    })('assertRoute')(machine, expectedRoute);

    if (err) {
      throw TypeError(err);
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
    const console = Logger(logLevel);
    const prefix = "Statebot[".concat(machine.name(), "]: aId<").concat(assertionId, ">");
    const route = decomposeRoute(expectedRoute);
    console.log("\n".concat(prefix, ": Asserting route: [").concat(route.join(' > '), "]"));
    console.log("".concat(prefix, ": > Assertion will start from state: \"").concat(fromState, "\""));
    const fromStateActionFn = Defer(run);

    let removeFromStateActionFn = () => {};

    const totalTimeTaken = TimeTaken();
    let stateTimeTaken = TimeTaken();
    let assertionTimeoutTimer;
    let deviations = 0;
    let pending = true;
    let unexpected = false;
    const consumeRoute = [...route];
    const report = Table(['state', 'expected', 'info', 'took'], ['center', 'center', 'left', 'right']);
    const finaliseReport = Once(err => {
      addRow('', '', '', 'TOTAL: ' + totalTimeTaken());
      report.lock();
      console.log("\n".concat(prefix, ": ").concat(description, ": [").concat(err ? 'FAILED' : 'SUCCESS', "]"));
      console.table(report.content());
      return err;
    });
    const {
      addRow
    } = report;

    function enteredState(state) {
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
        return;
      }

      const clearTimeoutAndResolve = function () {
        clearTimeout(assertionTimeoutTimer);
        removeFromStateActionFn();
        removeOnSwitchingListener();
        resolve(...arguments);
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
          addRow(machine.currentState(), "(".concat(expectedState, ")"), message);
          unexpected = false;
        }

        clearTimeoutAndReject(finaliseReport(new Error(message)));
      };

      if (machine.inState(fromState)) {
        pending = false;
        removeFromStateActionFn = fromStateActionFn();
      }

      const {
        revoke,
        fn
      } = Revokable(state => {
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
    });
  }

  function Table(columns, alignments) {
    columns = columns || [];
    alignments = alignments || [];
    const table = [];
    const alignment = columns.map((_, index) => alignments[index] || 'center');
    let locked = false;

    function lock() {
      locked = true;
    }

    function addRow() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (locked) {
        return;
      }

      const obj = columns.reduce((acc, col, index) => {
        const row = args[index] || '';
        return { ...acc,
          [col]: row
        };
      }, {});
      table.push(obj);
    }

    function colSizes() {
      return table.reduce((acc, row) => columns.map((col, index) => Math.max(row[col].length, acc[index])), columns.map(() => 0));
    }

    function content() {
      const sizes = colSizes();

      function formatField(value, index) {
        const size = sizes[index];
        const align = alignment[index];

        if (align === 'left') {
          return value.padEnd(size);
        }

        if (align === 'right') {
          return value.padStart(size);
        }

        return value;
      }

      const output = table.reduce((acc, row) => {
        const formattedRow = columns.reduce((acc, col, index) => ({ ...acc,
          [col]: formatField(row[col], index)
        }), {});
        return [...acc, formattedRow];
      }, []);
      return output;
    }

    return {
      lock: lock,
      addRow: addRow,
      content: content
    };
  }

  function TimeTaken() {
    const startTime = Date.now();

    function fmt(num, digits) {
      return num.toFixed(digits).replace(/\.0+$/, '');
    }

    return function () {
      const duration = Date.now() - startTime;

      if (duration < 500) {
        return "".concat(fmt(duration), " ms");
      } else if (duration < 5000) {
        return "".concat(fmt(duration / 1000, 2), " s ");
      } else if (duration < 60000) {
        return "".concat(fmt(duration / 1000, 1), " s ");
      } else {
        return "".concat(fmt(duration / 1000 / 60, 1), " m ");
      }
    };
  }

  const makeHooks = _ref => {
    let {
      Statebot,
      useEffect,
      useState,
      useMemo
    } = _ref;

    if (![useEffect, useState, useMemo].every(x => typeof x === 'function')) {
      console.warn('Statebot Hooks unavailable: React or Mithril not found');
    }

    function useStatebot(bot) {
      const [state, setState] = useState(bot.currentState());
      useEffect(() => {
        let done = false;
        const removeListener = bot.onSwitched(toState => {
          if (done) {
            return;
          }

          setState(toState);
        });
        return () => {
          done = true;
          removeListener();
        };
      }, [bot]);
      return state;
    }

    function useStatebotFactory(name, config) {
      const {
        bot,
        listeners
      } = useMemo(() => {
        const {
          performTransitions = {},
          onTransitions = {},
          ...botConfig
        } = config || {};
        const bot = Statebot(name, botConfig);
        const listeners = [bot.performTransitions(performTransitions), bot.onTransitions(onTransitions)];
        return {
          bot,
          listeners
        };
      }, []);
      useEffect(() => () => {
        if (typeof bot.pause === 'function') {
          bot.pause();
        }

        listeners.forEach(off => off());
      }, [bot, listeners]);
      const state = useStatebot(bot);
      return {
        state,
        bot
      };
    }

    function useStatebotEvent(bot, eventName, stateOrFn, maybeFn) {
      useEffect(() => {
        let done = false;

        function onSwitchFn() {
          if (done) {
            return;
          }

          stateOrFn(...arguments);
        }

        function onEnterOrExitFn() {
          if (done) {
            return;
          }

          maybeFn(...arguments);
        }

        const args = typeof maybeFn === 'function' ? [stateOrFn, onEnterOrExitFn] : [onSwitchFn];
        const removeListener = bot[eventName](...args);
        return () => {
          done = true;
          removeListener();
        };
      }, [bot, eventName, stateOrFn, maybeFn]);
    }

    return {
      useStatebot,
      useStatebotFactory,
      useStatebotEvent
    };
  };

  const {
    useEffect,
    useState,
    useMemo
  } = (global => typeof React !== 'undefined' ? React : global)(window);

  const {
    useStatebot,
    useStatebotFactory,
    useStatebotEvent
  } = makeHooks({
    Statebot,
    useEffect,
    useState,
    useMemo
  });

  exports.Statebot = Statebot;
  exports.assertRoute = assertRoute;
  exports.decomposeChart = decomposeChart;
  exports.isStatebot = isStatebot;
  exports.routeIsPossible = routeIsPossible;
  exports.useStatebot = useStatebot;
  exports.useStatebotEvent = useStatebotEvent;
  exports.useStatebotFactory = useStatebotFactory;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
//# sourceMappingURL=statebot.js.map
