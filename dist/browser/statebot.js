/*
 * Statebot
 * v3.1.3
 * https://shuckster.github.io/statebot/
 * License: MIT
 */
/* exported statebot */
/* eslint-disable no-func-assign, no-unsafe-finally, no-unused-vars */
var statebot = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/browser.js
  var browser_exports = {};
  __export(browser_exports, {
    Statebot: () => Statebot,
    assertRoute: () => assertRoute,
    decomposeChart: () => decomposeChart,
    isStatebot: () => isStatebot,
    mermaid: () => mermaid,
    routeIsPossible: () => routeIsPossible,
    useStatebot: () => useStatebot,
    useStatebotEvent: () => useStatebotEvent,
    useStatebotFactory: () => useStatebotFactory
  });

  // node_modules/.pnpm/mitt@3.0.1/node_modules/mitt/dist/mitt.mjs
  function mitt_default(n) {
    return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
      var i = n.get(t);
      i ? i.push(e) : n.set(t, [e]);
    }, off: function(t, e) {
      var i = n.get(t);
      i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
    }, emit: function(t, e) {
      var i = n.get(t);
      i && i.slice().map(function(n2) {
        n2(e);
      }), (i = n.get("*")) && i.slice().map(function(n2) {
        n2(t, e);
      });
    } };
  }

  // src/types.js
  function isEventEmitter(obj) {
    return isObject(obj) && isFunction(obj.emit) && (isFunction(obj.addListener) || isFunction(obj.on)) && (isFunction(obj.removeListener) || isFunction(obj.off));
  }
  isEventEmitter.displayName = "isEventEmitter";
  isArray.displayName = "isUnset";
  function isArray(obj) {
    return Array.isArray(obj);
  }
  isArray.displayName = "isArray";
  function isArguments(obj) {
    return Object.prototype.toString.call(obj) === "[object Arguments]";
  }
  isArguments.displayName = "isArguments";
  function isBoolean(obj) {
    return obj === true || obj === false;
  }
  isBoolean.displayName = "isBoolean";
  function isFunction(obj) {
    return typeof obj === "function";
  }
  isFunction.displayName = "isFunction";
  function isString(obj) {
    return typeof obj === "string";
  }
  isString.displayName = "isString";
  function isAllStrings(arr) {
    return isArray(arr) && arr.every(isString);
  }
  isAllStrings.displayName = "isAllStrings";
  function isUndefined(obj) {
    return obj === void 0;
  }
  isUndefined.displayName = "isUndefined";
  function isNull(obj) {
    return obj === null;
  }
  isNull.displayName = "isNull";
  function isNumber(obj) {
    return typeof obj === "number";
  }
  isNumber.displayName = "isNumber";
  function isObject(obj) {
    return typeof obj === "object" && !isNull(obj);
  }
  isObject.displayName = "isObject";
  function isPojo(obj) {
    if (isNull(obj) || !isObject(obj) || isArguments(obj)) {
      return false;
    }
    return Object.getPrototypeOf(obj) === Object.prototype;
  }
  isPojo.displayName = "isPojo";
  function isTemplateLiteral(obj) {
    if (isString(obj)) {
      return true;
    }
    if (!isArray(obj)) {
      return false;
    }
    return obj.every(isString);
  }
  isTemplateLiteral.displayName = "isTemplateLiteral";
  var typeErrorStringIfFnReturnsFalse = (argName, argTypeFn, arg) => {
    return argTypeFn(arg) ? void 0 : (argTypeFn.displayName || argTypeFn.name) + `(${argName}) did not return true`;
  };
  var typeErrorStringIfTypeOfFails = (argName, argType, arg) => {
    return typeof arg === argType ? void 0 : `Argument "${argName}" should be a ${argType}`;
  };
  var typeErrorStringFromArgument = (argMap) => (arg, index) => {
    if (index >= argMap.length) {
      return;
    }
    const { argName, argType } = argMap[index];
    if (isUndefined(arg)) {
      return `Argument undefined: "${argName}"`;
    }
    const permittedArgTypes = Array.isArray(argType) ? argType : [argType];
    const errorDescs = permittedArgTypes.map(
      (argType2) => isFunction(argType2) ? typeErrorStringIfFnReturnsFalse(argName, argType2, arg) : typeErrorStringIfTypeOfFails(argName, argType2, arg)
    ).filter(isString);
    const multipleTypesSpecified = permittedArgTypes.length > 1;
    const shouldError = multipleTypesSpecified ? errorDescs.length > 1 : errorDescs.length;
    if (shouldError) {
      return errorDescs.join("\n| ") + `
> typeof ${argName} === ${typeof arg}(${JSON.stringify(arg)})`;
    }
  };
  function ArgTypeError(namespace) {
    return (typeMap) => {
      const argMap = Object.entries(typeMap).map(([argName, argType]) => ({
        argName,
        argType
      }));
      return (fnName) => (...args) => {
        const processedArgs = Array.from(args, (x) => isArguments(x) ? Array.from(x) : x).flat(1);
        const err = processedArgs.map(typeErrorStringFromArgument(argMap)).filter(isString);
        if (!err.length) {
          return;
        }
        const signature = Object.keys(typeMap).join(", ");
        return `
${namespace || ""}${fnName}(${signature}):
${err.map((err2) => `| ${err2}`).join("\n")}`;
      };
    };
  }

  // src/utils.js
  function wrapEmitter(events) {
    const emit = (eventName, ...args) => events.emit(eventName, args);
    const addListener = events.addListener ? (...args) => events.addListener(...args) : (...args) => events.on(...args);
    const removeListener = events.removeListener ? (...args) => events.removeListener(...args) : (...args) => events.off(...args);
    const wrapMap = /* @__PURE__ */ new Map();
    function on(eventName, fn) {
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
    return input.reduce(
      (acc, one) => acc.indexOf(one) === -1 ? (acc.push(one), acc) : acc,
      []
    );
  }
  function defer(fn, ...args) {
    const timer = setTimeout(fn, 0, ...args);
    return () => {
      clearTimeout(timer);
    };
  }
  function Defer(fn) {
    return (...args) => defer(fn, ...args);
  }
  function Once(fn) {
    const { revoke, fn: _fn } = Revokable(fn);
    let result;
    return function(...args) {
      result = _fn(...args);
      revoke();
      return result;
    };
  }
  function Revokable(fn) {
    let revoked = false;
    let result;
    return {
      fn: (...args) => {
        if (!revoked) {
          result = fn(...args);
        }
        return result;
      },
      revoke: () => {
        revoked = true;
      }
    };
  }
  function Pausables(startPaused, runFnWhenPaused) {
    runFnWhenPaused = runFnWhenPaused || function() {
    };
    let paused = !!startPaused;
    function Pausable(fn) {
      return (...args) => {
        if (paused) {
          runFnWhenPaused();
          return false;
        }
        return fn(...args);
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
  function ReferenceCounter(logPrefix, kind, description, ...expecting) {
    const _refs = [...expecting].flat().reduce((acc, ref) => ({ ...acc, [ref]: 0 }), {});
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
      return { ..._refs };
    }
    function table() {
      return Object.keys(_refs).sort((a, b) => a - b).map((key) => [key, _refs[key]]).map(([ref, count]) => {
        return {
          [kind]: ref,
          refs: count || "None"
        };
      });
    }
    function toValue() {
      return {
        description: `${logPrefix}: ${description}:`,
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
    const { info, table, log, warn, error } = _console || console;
    return {
      canWarn,
      canLog,
      canInfo,
      info: (...args) => {
        canInfo() && info(...args);
      },
      table: (...args) => {
        canLog() && table(...args);
      },
      log: (...args) => {
        canLog() && log(...args);
      },
      warn: (...args) => {
        canWarn() && warn(...args);
      },
      error: (...args) => {
        error(...args);
      }
    };
  }

  // src/parsing.js
  var rxCRLF = /[\r\n]/;
  var cxPipe = "|";
  var cxArrow = "->";
  var rxOperators = [cxPipe, cxArrow].map((rxUnsafe) => rxUnsafe.replace("|", "\\|")).join("|");
  var rxLineContinuations = new RegExp(`(${rxOperators})$`);
  var rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
  var rxComment = /(\/\/[^\n\r]*)/;
  var argTypeError = ArgTypeError("statebot.");
  function decomposeRoute(templateLiteral) {
    const err = argTypeError(
      { templateLiteral: isTemplateLiteral }
    )("decomposeRoute")(templateLiteral);
    if (err) {
      throw TypeError(err);
    }
    const lines = condensedLines(templateLiteral);
    const linesOfTokens = tokenisedLines(lines);
    const route = linesOfTokens.flat(2);
    return route;
  }
  function decomposeChart(chart) {
    const err = argTypeError(
      { chart: isTemplateLiteral }
    )("decomposeChart")(chart);
    if (err) {
      throw TypeError(err);
    }
    const lines = condensedLines(chart);
    const linesOfTokens = tokenisedLines(lines);
    const linesOfRoutes = linesOfTokens.flatMap(decomposeRouteFromTokens);
    const linesOfTransitions = linesOfRoutes.flatMap(decomposeTransitionsFromRoute);
    let emptyStateFound = false;
    const routeKeys = linesOfTransitions.map((route) => {
      if (route.includes("")) {
        emptyStateFound = true;
      }
      return route.join(cxArrow);
    });
    const filteredRoutes = uniq(routeKeys);
    const filteredStates = uniq(linesOfTokens.flat(3));
    return {
      transitions: filteredRoutes.map((route) => route.split(cxArrow)),
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
      const sanitisedLine = line.replace(rxComment, "").replace(rxDisallowedCharacters, "");
      if (!sanitisedLine) {
        return condensedLine;
      }
      previousLineHasContinuation = rxLineContinuations.test(sanitisedLine);
      if (previousLineHasContinuation) {
        return condensedLine + sanitisedLine;
      }
      output.push(condensedLine + sanitisedLine);
      return "";
    };
    const finalCondensedLine = input.reduce(condenseLine, "");
    if (previousLineHasContinuation || finalCondensedLine) {
      return [...output, finalCondensedLine];
    }
    return [...output];
  }
  function tokenisedLines(lines) {
    return lines.map(
      (line) => line.split(cxArrow).map((str) => str.split(cxPipe))
    );
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
  function decomposeTransitionsFromRoute([fromStates, toStates]) {
    return fromStates.reduce(
      (acc, fromState) => (acc.push(...toStates.map((toState) => [fromState, toState])), acc),
      []
    );
  }

  // src/statebot.js
  var ON_EXITING = "onExiting";
  var ON_ENTERING = "onEntering";
  var ON_EXITED = "onExited";
  var ON_ENTERED = "onEntered";
  var ON_SWITCHING = "onSwitching";
  var ON_SWITCHED = "onSwitched";
  var INTERNAL_EVENTS = {
    [ON_SWITCHING]: "(ANY)state:changing",
    [ON_SWITCHED]: "(ANY)state:changed"
  };
  function Statebot(name, options) {
    if (!isString(name)) {
      throw new TypeError("\nStatebot: Please specify a name for this machine");
    }
    const logPrefix = `Statebot[${name}]`;
    if (!isPojo(options)) {
      throw new TypeError(`
${logPrefix}: Please specify options for this machine`);
    }
    const {
      chart = void 0,
      logLevel = 3,
      historyLimit = 2
    } = options || {};
    const events = isUndefined(options.events) ? wrapEmitter(mitt_default()) : isEventEmitter(options.events) && wrapEmitter(options.events);
    if (!events) {
      throw new TypeError(`
${logPrefix}: Invalid event-emitter specified in options`);
    }
    const { states = [], routes = [] } = chart ? decomposeChart(chart) : options;
    const { startIn = states[0] } = options;
    if (!states.includes(startIn)) {
      throw new Error(`${logPrefix}: Starting-state not in chart: "${startIn}"`);
    }
    const argTypeError3 = ArgTypeError(`${logPrefix}#`);
    const _console = Logger(logLevel, console);
    const { canWarn } = _console;
    const stateHistory = [startIn];
    const stateHistoryLimit = Math.max(historyLimit, 2);
    let transitionId = 0;
    const { pause, resume, paused, Pausable } = Pausables(
      false,
      () => _console.warn(`${logPrefix}: Ignoring callback, paused`)
    );
    const transitionsFromEvents = Definitions();
    const internalEvents = wrapEmitter(mitt_default());
    const emitInternalEvent = Pausable(internalEvents.emit);
    function onInternalEvent(eventName, cb) {
      internalEvents.on(eventName, cb);
      return () => internalEvents.off(eventName, cb);
    }
    const statesHandled = ReferenceCounter(
      logPrefix,
      "states",
      "Listening for the following state-changes",
      [...states]
    );
    const routesHandled = ReferenceCounter(
      logPrefix,
      "transitions",
      "Listening for the following transitions",
      [...routes]
    );
    const eventsHandled = ReferenceCounter(
      logPrefix,
      "events",
      "Listening for the following events"
    );
    function applyHitcher(hitcher, fnName) {
      const hitcherActions = isFunction(hitcher) ? hitcher({ enter, emit, Enter, Emit }) : isPojo(hitcher) ? hitcher : null;
      if (!isPojo(hitcherActions)) {
        throw new TypeError(
          `${logPrefix}#${fnName}(): Expected an object, or a function that returns an object`
        );
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
        const invalidStates = allStates.filter((state) => !states.includes(state));
        const invalidRoutes = allRoutes.filter((route) => !routes.includes(route));
        if (invalidStates.length) {
          _console.warn(
            `${logPrefix}#${fnName}(): Invalid states specified:
` + invalidStates.map((state) => `  > "${state}"`).join("\n")
          );
        }
        if (invalidRoutes.length) {
          _console.warn(
            `${logPrefix}#${fnName}(): Invalid transitions specified:
` + invalidRoutes.map((route) => `  > "${route}"`).join("\n")
          );
        }
      }
      return () => allCleanupFns.map((fn) => fn());
      function runThenMethodOnTransition(config) {
        const { fromState, toState, action } = config;
        const route = `${fromState}->${toState}`;
        return [
          routesHandled.increase(route),
          onInternalEvent(route, bindActionTo(toState, action))
        ];
      }
      function decomposeTransitionsForEvent(acc, [eventName, transitionsAndAction]) {
        const {
          states: states2,
          routes: routes2,
          configs
        } = expandTransitions(transitionsAndAction, canWarn);
        if (canWarn()) {
          allStates.push(...states2);
          allRoutes.push(...routes2);
        }
        return {
          ...acc,
          [eventName]: configs
        };
      }
      function ifStateThenEnterState({ fromState, toState, action, args }) {
        return inState(fromState, () => {
          enter(toState, ...args);
          isFunction(action) && runActionFor(toState, action, ...args);
          return true;
        });
      }
      function createEventHandlerForTransition([eventName, configs]) {
        return [
          eventsHandled.increase(eventName),
          onEvent(eventName, (...args) => {
            const eventWasHandled = configs.map((config) => ({ ...config, args })).some(ifStateThenEnterState);
            if (!eventWasHandled) {
              transitionNoOp(`Event not handled: "${eventName}"`);
            }
          })
        ].concat(
          configs.map(
            ({ fromState, toState }) => transitionsFromEvents.define(`${eventName}:${fromState}`, toState)
          )
        );
      }
      function runActionFor(state, actionFn, ...args) {
        const onExitingState = actionFn(...args);
        if (isFunction(onExitingState)) {
          const uninstall = Once(enterExitMethods[ON_EXITING](state, (toState) => {
            uninstall();
            onExitingState(toState);
          }));
          allCleanupFns.push(uninstall);
        }
      }
      function bindActionTo(state, actionFn) {
        return (...args) => runActionFor(state, actionFn, ...args);
      }
    }
    function _peek(eventName, stateObject, calledInternally = true) {
      const err1 = argTypeError3({ eventName: isString })("peek")(eventName);
      if (err1) {
        throw new TypeError(err1);
      }
      const eventAndState = eventName + ":" + currentState();
      const statesFromEvent = transitionsFromEvents.definitionsOf(eventAndState);
      if (statesFromEvent.length > 1) {
        const reason = `${logPrefix}: Event "${eventName}" causes multiple transitions.
  > From state: "${currentState()}"
  > To states: "${statesFromEvent.join(", ")}"

Check your performTransitions() config.`;
        throw new RangeError(reason);
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
        return isUndefined(toState) ? currentState() : toState;
      }
      const err2 = argTypeError3({ stateObject: isPojo })("peek")(stateObject);
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
    function _state_canTransitionTo(...states2) {
      const err = argTypeError3(
        { states: isAllStrings }
      )("canTransitionTo")([states2]);
      if (err) {
        throw new TypeError(err);
      }
      if (!states2.length) {
        return false;
      }
      const nextStates = statesAvailableFromHere();
      return states2.every((state) => nextStates.includes(state));
    }
    function canTransitionTo(...states2) {
      const testStates = states2.flat();
      if (testStates.length === 2 && isString(testStates[0]) && isPojo(testStates[1])) {
        const thisState = testStates[0];
        const { afterEmitting } = testStates[1];
        const err = argTypeError3(
          { thisState: isString, "{ afterEmitting }": isString }
        )("canTransitionTo")(thisState, afterEmitting);
        if (err) {
          throw new TypeError(err);
        }
        return thisState !== currentState() && _peek(afterEmitting) === thisState;
      }
      return _state_canTransitionTo(...testStates);
    }
    function statesAvailableFromHere(state) {
      const _state = !isUndefined(state) ? state : currentState();
      const err = argTypeError3(
        { state: isString }
      )("statesAvailableFromHere")(_state);
      if (err) {
        throw new TypeError(err);
      }
      return routes.reduce((acc, route) => {
        const [fromState, toState] = route.split(cxArrow).map((state2) => state2.trim());
        return fromState === _state ? [...acc, toState] : acc;
      }, []);
    }
    function _inState(state, anyOrFn, ...fnArgs) {
      const conditionMatches = currentState() === state;
      if (isUndefined(anyOrFn)) {
        return conditionMatches;
      }
      if (!conditionMatches) {
        return null;
      }
      if (isFunction(anyOrFn)) {
        return anyOrFn(...fnArgs);
      }
      return anyOrFn;
    }
    function _inStateObject(stateObject, ...fnArgs) {
      const match = Object.entries(stateObject).find(([state]) => _inState(state));
      return match ? _inState(...match.concat(fnArgs)) : null;
    }
    function inState(...args) {
      const err = argTypeError3(
        { state: [isString, isPojo] }
      )("inState")(args[0]);
      if (err) {
        throw new TypeError(err);
      }
      return isPojo(args[0]) ? _inStateObject(...args) : _inState(...args);
    }
    const emit = (eventName, ...args) => {
      const err = argTypeError3(
        { eventName: isString }
      )("emit")(eventName);
      if (err) {
        throw new TypeError(err);
      }
      _peek(eventName);
      return events.emit(eventName, ...args);
    };
    const enter = (state, ...args) => {
      const err = argTypeError3(
        { state: isString }
      )("enter")(state);
      if (err) {
        throw new TypeError(err);
      }
      const inState2 = currentState();
      const toState = state;
      if (toState === inState2) {
        transitionNoOp(`Already in state: "${toState}"`);
        return false;
      }
      if (!states.includes(toState)) {
        transitionNoOp(`Invalid state "${toState}", not switching`);
        return false;
      }
      const nextRoute = `${inState2}->${toState}`;
      if (!routes.includes(nextRoute)) {
        transitionNoOp(`Invalid transition "${nextRoute}", not switching`);
        return false;
      }
      _console.info(`${logPrefix}: tId<${++transitionId}>: ${nextRoute}`);
      stateHistory.push(toState);
      if (stateHistory.length > stateHistoryLimit) {
        stateHistory.shift();
      }
      emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHING], toState, inState2, ...args);
      emitInternalEvent(nextRoute, ...args);
      emitInternalEvent(INTERNAL_EVENTS[ON_SWITCHED], toState, inState2, ...args);
      return true;
    };
    function onEvent(eventName, cb) {
      const err = argTypeError3(
        { eventName: isString, cb: isFunction }
      )("onEvent")(eventName, cb);
      if (err) {
        throw new TypeError(err);
      }
      events.on(eventName, cb);
      return () => events.off(eventName, cb);
    }
    const switchMethods = Object.keys(INTERNAL_EVENTS).reduce((obj, methodName) => ({
      ...obj,
      [methodName]: (cb) => {
        const err = argTypeError3({ cb: isFunction })(methodName)(cb);
        if (err) {
          throw new TypeError(err);
        }
        const decreaseRefCount = statesHandled.increase(
          INTERNAL_EVENTS[methodName]
        );
        const removeEvent = onInternalEvent(
          INTERNAL_EVENTS[methodName],
          cb
        );
        return () => {
          removeEvent();
          decreaseRefCount();
        };
      }
    }), {});
    const enterExitMethods = [
      [ON_EXITING, ON_SWITCHING],
      [ON_ENTERING, ON_SWITCHING],
      [ON_EXITED, ON_SWITCHED],
      [ON_ENTERED, ON_SWITCHED]
    ].reduce((obj, names) => {
      const [methodName, switchMethod] = names;
      const name2 = methodName.slice(2);
      const eventName = name2.toLowerCase();
      return {
        ...obj,
        [methodName]: (state, cb) => {
          const err = argTypeError3(
            { state: isString, cb: isFunction }
          )(methodName)(state, cb);
          if (err) {
            throw new TypeError(err);
          }
          const decreaseRefCounts = [
            statesHandled.increase(state),
            statesHandled.increase(`${state}:${eventName}`)
          ];
          const removeEvent = switchMethods[switchMethod](
            (toState, fromState, ...args) => {
              if (name2.indexOf("Exit") === 0) {
                state === fromState && cb(toState, ...args);
              } else {
                state === toState && cb(fromState, ...args);
              }
            }
          );
          return () => {
            removeEvent();
            decreaseRefCounts.forEach((fn) => fn());
          };
        }
      };
    }, {});
    function Emit(eventName, ...curriedArgs) {
      const err = argTypeError3({ eventName: isString })("Emit")(eventName);
      if (err) {
        throw new TypeError(err);
      }
      return (...args) => emit(eventName, ...[...curriedArgs, ...args]);
    }
    function Enter(state, ...curriedArgs) {
      const err = argTypeError3({ state: isString })("Enter")(state);
      if (err) {
        throw new TypeError(err);
      }
      return (...args) => enter(state, ...[...curriedArgs, ...args]);
    }
    function _InState(state, anyOrFn, ...curriedFnArgs) {
      return (...fnArgs) => inState(state, anyOrFn, ...[...curriedFnArgs, ...fnArgs]);
    }
    function _InStateObject(stateObject, ...curriedFnArgs) {
      return (...fnArgs) => inState(stateObject, ...[...curriedFnArgs, ...fnArgs]);
    }
    function InState(...args) {
      const err = argTypeError3({ state: [isString, isPojo] })("InState")(args[0]);
      if (err) {
        throw new TypeError(err);
      }
      return isPojo(args[0]) ? _InStateObject(...args) : _InState(...args);
    }
    function reset() {
      _console.warn(`${logPrefix}: State-machine reset!`);
      stateHistory.length = 0;
      stateHistory.push(startIn);
    }
    function transitionNoOp(message) {
      const lastState = previousState();
      const inState2 = currentState();
      const prevRoute = `${isUndefined(lastState) ? "[undefined]" : lastState}->${inState2}`;
      const availableStates = statesAvailableFromHere();
      if (!availableStates.length) {
        _console.info(
          `${logPrefix}: ${message}
  > Previous transition: "${prevRoute}"
  > There are no states available from "${inState2}"`
        );
      } else {
        _console.info(
          `${logPrefix}: ${message}
  > Previous transition: "${prevRoute}"
  > From "${inState2}", valid states are: [${availableStates.map((state) => `"${state}"`).join(", ")}]`
        );
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
      _console.log(`${logPrefix}: Information about this state-machine`);
      logRefCounterInfo(statesHandled);
      logRefCounterInfo(routesHandled);
      logRefCounterInfo(eventsHandled);
    }
    function logRefCounterInfo(refCounter) {
      const { description, table } = refCounter.toValue();
      _console.log(description);
      if (table.length) {
        _console.table(table);
      } else {
        _console.log("  > No information");
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
      onTransitions: (transitions) => applyHitcher(transitions, "onTransitions"),
      performTransitions: (transitions) => applyHitcher(transitions, "performTransitions"),
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
    Object.entries(hitcherActions).map(([routeChart, actionFnOrConfigObj]) => {
      if (isFunction(actionFnOrConfigObj)) {
        transitionsOnly.push({ routeChart, action: actionFnOrConfigObj });
        return;
      }
      if (!isPojo(actionFnOrConfigObj)) {
        return;
      }
      const { on: _on, then: _then } = actionFnOrConfigObj;
      const hasValidEventNames = isString(_on) || isArray(_on);
      if (hasValidEventNames) {
        const eventNames = [_on].flat();
        eventNames.map((name) => {
          transitionsForEvents[name] = transitionsForEvents[name] || [];
          transitionsForEvents[name].push({ routeChart, action: _then });
        });
        return;
      }
      if (isFunction(_then)) {
        transitionsOnly.push({ routeChart, action: actionFnOrConfigObj });
      }
    });
    return { transitionsForEvents, transitionsOnly };
  }
  function expandTransitions(configs, canWarn) {
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
        ...transitions.map(
          ([fromState, toState]) => ({ fromState, toState, action })
        )
      ];
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

  // assert/index.mjs
  var argTypeError2 = ArgTypeError("statebot.");
  function routeIsPossible(machine, route) {
    const err = argTypeError2(
      { machine: isStatebot, route: isTemplateLiteral }
    )("routeIsPossible")(machine, route);
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
  var assertionId = 0;
  function assertRoute(machine, expectedRoute, options) {
    const err = argTypeError2(
      { machine: isStatebot, expectedRoute: isTemplateLiteral }
    )("assertRoute")(machine, expectedRoute);
    if (err) {
      throw TypeError(err);
    }
    assertionId += 1;
    const {
      description = "Assertion complete",
      fromState = "",
      run = () => {
      },
      permittedDeviations = 0,
      timeoutInMs = 1e3,
      logLevel = 3
    } = options || {};
    const console2 = Logger(logLevel);
    const prefix = `Statebot[${machine.name()}]: aId<${assertionId}>`;
    const route = decomposeRoute(expectedRoute);
    console2.log(`
${prefix}: Asserting route: [${route.join(" > ")}]`);
    console2.log(`${prefix}: > Assertion will start from state: "${fromState}"`);
    const fromStateActionFn = Defer(run);
    let removeFromStateActionFn = () => {
    };
    const totalTimeTaken = TimeTaken();
    let stateTimeTaken = TimeTaken();
    let assertionTimeoutTimer;
    let deviations = 0;
    let pending = true;
    let unexpected = false;
    const consumeRoute = [...route];
    const report = Table(
      ["state", "expected", "info", "took"],
      ["center", "center", "left", "right"]
    );
    const finaliseReport = Once((err2) => {
      addRow("", "", "", "TOTAL: " + totalTimeTaken());
      report.lock();
      console2.log(`
${prefix}: ${description}: [${err2 ? "FAILED" : "SUCCESS"}]`);
      console2.table(report.content());
      return err2;
    });
    const { addRow } = report;
    function enteredState(state) {
      if (pending) {
        addRow(state, "-", "PENDING");
      } else {
        const expectedState = consumeRoute[0];
        if (expectedState === state) {
          addRow(state, expectedState, unexpected ? "REALIGNED" : "OKAY", stateTimeTaken());
          unexpected = false;
          consumeRoute.shift();
        } else {
          addRow(state, expectedState, "WRONG STATE", stateTimeTaken());
          unexpected = true;
          deviations += 1;
        }
        stateTimeTaken = TimeTaken();
      }
    }
    return new Promise((resolve, reject) => {
      if (consumeRoute.length === 0) {
        reject(finaliseReport(new Error("NO ROUTE TO TEST")));
        return;
      }
      const clearTimeoutAndResolve = (...args) => {
        clearTimeout(assertionTimeoutTimer);
        removeFromStateActionFn();
        removeOnSwitchingListener();
        resolve(...args);
      };
      const clearTimeoutAndReject = (err2) => {
        clearTimeout(assertionTimeoutTimer);
        removeFromStateActionFn();
        removeOnSwitchingListener();
        reject(err2);
      };
      const bailout = (message) => {
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
      const { revoke, fn } = Revokable((state) => {
        assertionTimeoutTimer = setTimeout(() => {
          revoke();
          bailout("TIMEOUT");
        }, timeoutInMs);
        enteredState(state);
        if (pending && state === fromState) {
          pending = false;
          removeFromStateActionFn = fromStateActionFn();
        }
        if (deviations > permittedDeviations) {
          revoke();
          bailout("TOO MANY DEVIATIONS");
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
    const alignment = columns.map((_, index) => alignments[index] || "center");
    let locked = false;
    function lock() {
      locked = true;
    }
    function addRow(...args) {
      if (locked) {
        return;
      }
      const obj = columns.reduce((acc, col, index) => {
        const row = args[index] || "";
        return {
          ...acc,
          [col]: row
        };
      }, {});
      table.push(obj);
    }
    function colSizes() {
      return table.reduce(
        (acc, row) => columns.map(
          (col, index) => Math.max(row[col].length, acc[index])
        ),
        columns.map(() => 0)
      );
    }
    function content() {
      const sizes = colSizes();
      function formatField(value, index) {
        const size = sizes[index];
        const align = alignment[index];
        if (align === "left") {
          return value.padEnd(size);
        }
        if (align === "right") {
          return value.padStart(size);
        }
        return value;
      }
      const output = table.reduce((acc, row) => {
        const formattedRow = columns.reduce((acc2, col, index) => ({
          ...acc2,
          [col]: formatField(row[col], index)
        }), {});
        return [...acc, formattedRow];
      }, []);
      return output;
    }
    return {
      lock,
      addRow,
      content
    };
  }
  function TimeTaken() {
    const startTime = Date.now();
    function fmt(num, digits) {
      return num.toFixed(digits).replace(/\.0+$/, "");
    }
    return function() {
      const duration = Date.now() - startTime;
      if (duration < 500) {
        return `${fmt(duration)} ms`;
      } else if (duration < 5e3) {
        return `${fmt(duration / 1e3, 2)} s `;
      } else if (duration < 6e4) {
        return `${fmt(duration / 1e3, 1)} s `;
      } else {
        return `${fmt(duration / 1e3 / 60, 1)} m `;
      }
    };
  }

  // src/mermaid.js
  var rxFrontMatter = /---[\r\n]+[\w\W]*---[\r\n]+[\r\n\s]*/m;
  var rxMermaidHeader = /stateDiagram(-v2)?[\r\n\s]*/g;
  var rxMermaidDirection = /direction\s+(TB|TD|BT|RL|LR)[\r\n\s]*/g;
  var rxMermaidComment = /%%/g;
  var rxMermaidArrow = /-->/g;
  var rxMermaidStartState = /\[\*\]\s*-->/g;
  var rxMermaidStopState = /-->\s*\[\*\]/g;
  var rxMermaidPreviewVsts = /::: ?mermaid([\s\S]*?):::/g;
  function mermaid(mmd) {
    return linesFrom(mmd).join("\n").replace(rxMermaidPreviewVsts, "$1").replace(rxFrontMatter, "").replace(rxMermaidHeader, "").replace(rxMermaidDirection, "").replace(rxMermaidComment, "//").replace(rxMermaidStartState, "__START__ -->").replace(rxMermaidStopState, "--> __STOP__").replace(rxMermaidArrow, cxArrow);
  }

  // hooks/make-hooks.mjs
  var makeHooks = ({ Statebot: Statebot2, useEffect: useEffect2, useState: useState2, useMemo: useMemo2 }) => {
    if (![useEffect2, useState2, useMemo2].every((x) => typeof x === "function")) {
      console.warn("Statebot Hooks unavailable: React or Mithril not found");
    }
    function useStatebot2(bot) {
      const [state, setState] = useState2(bot.currentState());
      useEffect2(() => {
        let done = false;
        const removeListener = bot.onSwitched((toState) => {
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
    function useStatebotFactory2(name, config) {
      const { bot, listeners } = useMemo2(() => {
        const {
          performTransitions = {},
          onTransitions = {},
          ...botConfig
        } = config || {};
        const bot2 = Statebot2(name, botConfig);
        const listeners2 = [
          bot2.performTransitions(performTransitions),
          bot2.onTransitions(onTransitions)
        ];
        return {
          bot: bot2,
          listeners: listeners2
        };
      }, []);
      useEffect2(
        () => () => {
          if (typeof bot.pause === "function") {
            bot.pause();
          }
          listeners.forEach((off) => off());
        },
        [bot, listeners]
      );
      const state = useStatebot2(bot);
      return { state, bot };
    }
    function useStatebotEvent2(bot, eventName, stateOrFn, maybeFn) {
      useEffect2(() => {
        let done = false;
        function onSwitchFn(...args2) {
          if (done) {
            return;
          }
          stateOrFn(...args2);
        }
        function onEnterOrExitFn(...args2) {
          if (done) {
            return;
          }
          maybeFn(...args2);
        }
        const args = typeof maybeFn === "function" ? [stateOrFn, onEnterOrExitFn] : [onSwitchFn];
        const removeListener = bot[eventName](...args);
        return () => {
          done = true;
          removeListener();
        };
      }, [bot, eventName, stateOrFn, maybeFn]);
    }
    return {
      useStatebot: useStatebot2,
      useStatebotFactory: useStatebotFactory2,
      useStatebotEvent: useStatebotEvent2
    };
  };

  // src/browser.js
  var { useEffect, useState, useMemo } = /* @__PURE__ */ ((global) => typeof React !== "undefined" ? (
    // eslint-disable-next-line no-undef
    React
  ) : global)(window);
  var { useStatebot, useStatebotFactory, useStatebotEvent } = makeHooks({
    Statebot,
    useEffect,
    useState,
    useMemo
  });
  return __toCommonJS(browser_exports);
})();
//# sourceMappingURL=statebot.js.map
