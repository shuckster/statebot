
/*
 * Statebot
 * v2.8.0
 * https://shuckster.github.io/statebot/
 * License: MIT
 */
/* exported statebot */
/* eslint-disable no-func-assign, no-unsafe-finally, no-unused-vars */
var statebot = (function (exports) {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function mitt (n) {
    return {
      all: n = n || new Map(),
      on: function on(t, e) {
        var i = n.get(t);
        i && i.push(e) || n.set(t, [e]);
      },
      off: function off(t, e) {
        var i = n.get(t);
        i && i.splice(i.indexOf(e) >>> 0, 1);
      },
      emit: function emit(t, e) {
        (n.get(t) || []).slice().map(function (n) {
          n(e);
        }), (n.get("*") || []).slice().map(function (n) {
          n(t, e);
        });
      }
    };
  }

  function isEventEmitter(obj) {
    return isObject(obj) && isFunction(obj.emit) && (isFunction(obj.addListener) || isFunction(obj.on)) && (isFunction(obj.removeListener) || isFunction(obj.off));
  }

  function isArray(obj) {
    return Array.isArray(obj);
  }

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function isString(obj) {
    return typeof obj === 'string';
  }

  function isObject(obj) {
    return _typeof(obj) === 'object';
  }

  function isPojo(obj) {
    if (obj === null || !isObject(obj)) {
      return false;
    }

    return Object.getPrototypeOf(obj) === Object.prototype;
  }

  function isTemplateLiteral(obj) {
    if (isString(obj)) {
      return true;
    }

    if (!isArray(obj)) {
      return false;
    }

    return obj.every(isString);
  }

  var typeErrorStringIfFnReturnsFalse = function typeErrorStringIfFnReturnsFalse(argName, argTypeFn, arg) {
    return argTypeFn(arg) ? undefined : "".concat(argTypeFn.name, "(").concat(argName, ") did not return true");
  };

  var typeErrorStringIfTypeOfFails = function typeErrorStringIfTypeOfFails(argName, argType, arg) {
    return _typeof(arg) === argType ? undefined : "Argument \"".concat(argName, "\" should be a ").concat(argType);
  };

  var typeErrorStringFromArgument = function typeErrorStringFromArgument(argMap, arg, index) {
    var _argMap$index = argMap[index],
        argName = _argMap$index.argName,
        argType = _argMap$index.argType;

    if (arg === undefined) {
      return "Argument undefined: \"".concat(argName, "\"");
    }

    var permittedArgTypes = Array.isArray(argType) ? argType : [argType];
    var errorDescs = permittedArgTypes.map(function (argType) {
      return isFunction(argType) ? typeErrorStringIfFnReturnsFalse(argName, argType, arg) : typeErrorStringIfTypeOfFails(argName, argType, arg);
    }).filter(isString);
    var multipleTypesSpecified = permittedArgTypes.length > 1;
    var shouldError = multipleTypesSpecified ? errorDescs.length > 1 : errorDescs.length;

    if (shouldError) {
      return "".concat(errorDescs.join('\n| '), "\n> typeof ").concat(argName, " === ").concat(_typeof(arg), "(").concat(JSON.stringify(arg), ")");
    }
  };
  /**
   * Helper for enforcing correct argument-types.
   *
   * @private
   * @param {string} errPrefix
   *
   * @example
   * const argTypeError = ArgTypeError('namespace#')
   *
   * function myFn (myArg1, myArg2) {
   *   const err = argTypeError('myFn',
   *     { myArg1: isString, myArg2: Boolean },
   *     myArg1, myArg2
   *   )
   *   if (err) {
   *     throw new TypeError(err)
   *   }
   * }
   */


  function ArgTypeError(errPrefix) {
    return function (fnName, typeMap) {
      var argMap = Object.entries(typeMap).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            argName = _ref2[0],
            argType = _ref2[1];

        return {
          argName: argName,
          argType: argType
        };
      });

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var err = args.map(function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return typeErrorStringFromArgument.apply(void 0, [argMap].concat(args));
      }).filter(isString);

      if (!err.length) {
        return;
      }

      var signature = Object.keys(typeMap).join(', ');
      return "\n".concat(errPrefix || '').concat(fnName, "(").concat(signature, "):\n") + "".concat(err.map(function (err) {
        return "| ".concat(err);
      }).join('\n'));
    };
  }

  function wrapEmitter(events) {
    var emit = function emit(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return events.emit(eventName, args);
    };

    var addListener = events.addListener ? function () {
      return events.addListener.apply(events, arguments);
    } : function () {
      return events.on.apply(events, arguments);
    };
    var removeListener = events.removeListener ? function () {
      return events.removeListener.apply(events, arguments);
    } : function () {
      return events.off.apply(events, arguments);
    };
    var wrapMap = new Map();

    function on(eventName, fn) {
      var fnMeta = wrapMap.get(fn);

      if (!fnMeta) {
        fnMeta = {
          handleEvent: function handleEvent() {
            var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            return fn.apply(void 0, _toConsumableArray([args].flat()));
          },
          refCount: 0
        };
        wrapMap.set(fn, fnMeta);
      }

      fnMeta.refCount += 1;
      addListener(eventName, fnMeta.handleEvent);
    }

    function off(eventName, fn) {
      var fnMeta = wrapMap.get(fn);

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
      emit: emit,
      on: on,
      off: off
    };
  }

  function uniq(input) {
    return input.reduce(function (acc, one) {
      return acc.indexOf(one) === -1 ? [].concat(_toConsumableArray(acc), [one]) : acc;
    }, []);
  }

  function defer(fn) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var timer = setTimeout.apply(void 0, [fn, 0].concat(args));
    return function () {
      clearTimeout(timer);
    };
  }

  function Defer(fn) {
    return function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return defer.apply(void 0, [fn].concat(args));
    };
  }

  function Once(fn) {
    var _Revokable = Revokable(fn),
        revoke = _Revokable.revoke,
        _fn = _Revokable.fn;

    var result;
    return function () {
      result = _fn.apply(void 0, arguments);
      revoke();
      return result;
    };
  }

  function Revokable(_fn2) {
    var revoked = false;
    var result;
    return {
      fn: function fn() {
        if (!revoked) {
          result = _fn2.apply(void 0, arguments);
        }

        return result;
      },
      revoke: function revoke() {
        revoked = true;
      }
    };
  }

  function Pausables(startPaused, runFnWhenPaused) {
    runFnWhenPaused = runFnWhenPaused || function () {};

    var _paused = !!startPaused;

    function Pausable(fn) {
      return function () {
        if (_paused) {
          runFnWhenPaused();
          return false;
        }

        return fn.apply(void 0, arguments);
      };
    }

    return {
      Pausable: Pausable,
      paused: function paused() {
        return _paused;
      },
      pause: function pause() {
        _paused = true;
      },
      resume: function resume() {
        _paused = false;
      }
    };
  }

  function ReferenceCounter(name, kind, description) {
    for (var _len4 = arguments.length, expecting = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
      expecting[_key4 - 3] = arguments[_key4];
    }

    var _refs = [].concat(expecting).flat().reduce(function (acc, ref) {
      return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, ref, 0));
    }, {});

    function increase(ref) {
      _refs[ref] = countOf(ref) + 1;
      return function () {
        decrease(ref);
      };
    }

    function decrease(ref) {
      var count = countOf(ref) - 1;
      _refs[ref] = Math.max(count, 0);
    }

    function countOf(ref) {
      return _refs[ref] || 0;
    }

    function refs() {
      return _objectSpread2({}, _refs);
    }

    function table() {
      return Object.keys(_refs).sort().map(function (key) {
        return [key, _refs[key]];
      }).map(function (_ref) {
        var _ref3;

        var _ref2 = _slicedToArray(_ref, 2),
            ref = _ref2[0],
            count = _ref2[1];

        return _ref3 = {}, _defineProperty(_ref3, kind, ref), _defineProperty(_ref3, "refs", count || 'None'), _ref3;
      });
    }

    function toValue() {
      return {
        description: "Statebot[".concat(name, "]: ").concat(description, ":"),
        table: table()
      };
    }

    return {
      increase: increase,
      decrease: decrease,
      countOf: countOf,
      toValue: toValue,
      refs: refs
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

    var _ref4 = _console || console,
        _info = _ref4.info,
        _table = _ref4.table,
        _log = _ref4.log,
        _warn = _ref4.warn,
        _error = _ref4.error;

    return {
      canWarn: canWarn,
      canLog: canLog,
      canInfo: canInfo,
      info: function info() {
        canInfo() && _info.apply(void 0, arguments);
      },
      table: function table() {
        canLog() && _table.apply(void 0, arguments);
      },
      log: function log() {
        canLog() && _log.apply(void 0, arguments);
      },
      warn: function warn() {
        canWarn() && _warn.apply(void 0, arguments);
      },
      error: function error() {
        _error.apply(void 0, arguments);
      }
    };
  }

  var rxCRLF = /[\r\n]/;
  var cxPipe = '|';
  var cxArrow = '->';
  var rxOperators = [cxPipe, cxArrow].map(function (rxUnsafe) {
    return rxUnsafe.replace('|', '\\|');
  }).join('|');
  var rxLineContinuations = new RegExp("(".concat(rxOperators, ")$"));
  var rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
  var rxComment = /(\/\/[^\n\r]*)/;
  var argTypeError$1 = ArgTypeError('statebot.');

  function decomposeRoute(templateLiteral) {
    var err = argTypeError$1('decomposeRoute', {
      templateLiteral: isTemplateLiteral
    }, templateLiteral);

    if (err) {
      throw TypeError(err);
    }

    var lines = condensedLines(templateLiteral);
    var linesOfTokens = tokenisedLines(lines);
    var route = linesOfTokens.flat(2);
    return route;
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


  function decomposeChart(chart) {
    var err = argTypeError$1('decomposeChart', {
      chart: isTemplateLiteral
    }, chart);

    if (err) {
      throw TypeError(err);
    }

    var lines = condensedLines(chart);
    var linesOfTokens = tokenisedLines(lines);
    var linesOfRoutes = linesOfTokens.flatMap(decomposeRouteFromTokens);
    var linesOfTransitions = linesOfRoutes.flatMap(decomposeTransitionsFromRoute);
    var emptyStateFound = false;
    var routeKeys = linesOfTransitions.map(function (route) {
      if (route.includes('')) {
        emptyStateFound = true;
      }

      return route.join(cxArrow);
    });
    var filteredRoutes = uniq(routeKeys);
    var filteredStates = uniq(linesOfTokens.flat(3));
    return {
      transitions: filteredRoutes.map(function (route) {
        return route.split(cxArrow);
      }),
      routes: filteredRoutes,
      states: !emptyStateFound ? filteredStates.filter(Boolean) : filteredStates
    };
  }

  function linesFrom(strOrArr) {
    return [strOrArr].flat().reduce(function (acc, line) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(line.split(rxCRLF)));
    }, []);
  }

  function condensedLines(strOrArr) {
    var input = linesFrom(strOrArr);
    var output = [];
    var previousLineHasContinuation = false;

    var condenseLine = function condenseLine(condensedLine, line) {
      var sanitisedLine = line.replace(rxComment, '').replace(rxDisallowedCharacters, '');

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

    var finalCondensedLine = input.reduce(condenseLine, '');

    if (previousLineHasContinuation || finalCondensedLine) {
      return [].concat(output, [finalCondensedLine]);
    }

    return [].concat(output);
  }

  function tokenisedLines(lines) {
    return lines.map(function (line) {
      return line.split(cxArrow).map(function (str) {
        return str.split(cxPipe);
      });
    });
  }

  function decomposeRouteFromTokens(line) {
    var output = [];
    line.reduce(function (previousStates, states) {
      if (previousStates === false) {
        return _toConsumableArray(states);
      }

      output.push([previousStates, _toConsumableArray(states)]);
      return _toConsumableArray(states);
    }, false);
    return output;
  }

  function decomposeTransitionsFromRoute(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        fromStates = _ref2[0],
        toStates = _ref2[1];

    return fromStates.reduce(function (acc, fromState) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(toStates.map(function (toState) {
        return [fromState, toState];
      })));
    }, []);
  }

  var _INTERNAL_EVENTS;
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

  var ON_EXITING = 'onExiting';
  var ON_ENTERING = 'onEntering';
  var ON_EXITED = 'onExited';
  var ON_ENTERED = 'onEntered';
  var ON_SWITCHING = 'onSwitching';
  var ON_SWITCHED = 'onSwitched';
  var INTERNAL_EVENTS = (_INTERNAL_EVENTS = {}, _defineProperty(_INTERNAL_EVENTS, ON_SWITCHING, '(ANY)state:changing'), _defineProperty(_INTERNAL_EVENTS, ON_SWITCHED, '(ANY)state:changed'), _INTERNAL_EVENTS);
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

  function Statebot(_name, options) {
    if (!isString(_name)) {
      throw new TypeError('\nStatebot: Please specify a name for this machine');
    }

    var logPrefix = "Statebot[".concat(_name, "]");

    if (!isPojo(options)) {
      throw new TypeError("\n".concat(logPrefix, ": Please specify options for this machine"));
    }

    var _ref = options || {},
        _ref$chart = _ref.chart,
        chart = _ref$chart === void 0 ? undefined : _ref$chart,
        _ref$logLevel = _ref.logLevel,
        logLevel = _ref$logLevel === void 0 ? 3 : _ref$logLevel,
        _ref$historyLimit = _ref.historyLimit,
        historyLimit = _ref$historyLimit === void 0 ? 2 : _ref$historyLimit;

    var events = options.events === undefined ? wrapEmitter(mitt()) : isEventEmitter(options.events) && wrapEmitter(options.events);

    if (!events) {
      throw new TypeError("\n".concat(logPrefix, ": Invalid event-emitter specified in options"));
    }

    var _ref2 = chart ? decomposeChart(chart) : options,
        _ref2$states = _ref2.states,
        states = _ref2$states === void 0 ? [] : _ref2$states,
        _ref2$routes = _ref2.routes,
        routes = _ref2$routes === void 0 ? [] : _ref2$routes;

    var _options$startIn = options.startIn,
        startIn = _options$startIn === void 0 ? states[0] : _options$startIn;

    if (!states.includes(startIn)) {
      throw new Error("".concat(logPrefix, ": Starting-state not in chart: \"").concat(startIn, "\""));
    }

    var argTypeError = ArgTypeError("".concat(logPrefix, "#"));

    var _console = Logger(logLevel, console);

    var canWarn = _console.canWarn;
    var stateHistory = [startIn];
    var stateHistoryLimit = Math.max(historyLimit, 2);
    var transitionId = 0;

    var _Pausables = Pausables(false, function () {
      return _console.warn("".concat(logPrefix, ": Ignoring callback, paused"));
    }),
        pause = _Pausables.pause,
        resume = _Pausables.resume,
        paused = _Pausables.paused,
        Pausable = _Pausables.Pausable;

    var internalEvents = wrapEmitter(mitt());
    var emitInternalEvent = Pausable(internalEvents.emit);

    function onInternalEvent(eventName, cb) {
      internalEvents.on(eventName, cb);
      return function () {
        return internalEvents.off(eventName, cb);
      };
    }

    var statesHandled = ReferenceCounter(_name, 'states', 'Listening for the following state-changes', _toConsumableArray(states));
    var routesHandled = ReferenceCounter(_name, 'transitions', 'Listening for the following transitions', _toConsumableArray(routes));
    var eventsHandled = ReferenceCounter(_name, 'events', 'Listening for the following events');

    function applyHitcher(hitcher, fnName) {
      var hitcherActions = isFunction(hitcher) ? hitcher({
        enter: enter,
        emit: emit,
        Enter: Enter,
        Emit: Emit
      }) : isPojo(hitcher) ? hitcher : null;

      if (!isPojo(hitcherActions)) {
        throw new TypeError("Statebot[".concat(_name, "]#").concat(fnName, "(): Expected an object, or a function that returns an object"));
      }

      var allStates = [];
      var allRoutes = [];

      var _decomposeHitcherActi = decomposeHitcherActions(hitcherActions),
          transitionsForEvents = _decomposeHitcherActi.transitionsForEvents,
          transitionsOnly = _decomposeHitcherActi.transitionsOnly;

      var eventsMappedToTransitionConfigs = Object.entries(transitionsForEvents).reduce(decomposeTransitionsForEvent, {});
      var transitionConfigs = expandTransitions(transitionsOnly, canWarn);
      var allCleanupFns = Object.entries(eventsMappedToTransitionConfigs).map(createEventHandlerForTransition).concat(transitionConfigs.configs.map(runThenMethodOnTransition)).flat();

      if (canWarn()) {
        allStates.push.apply(allStates, _toConsumableArray(transitionConfigs.states));
        allRoutes.push.apply(allRoutes, _toConsumableArray(transitionConfigs.routes));
        var invalidStates = allStates.filter(function (state) {
          return !states.includes(state);
        });
        var invalidRoutes = allRoutes.filter(function (route) {
          return !routes.includes(route);
        });

        if (invalidStates.length) {
          _console.warn("Statebot[".concat(_name, "]#").concat(fnName, "(): Invalid states specified:\n") + invalidStates.map(function (state) {
            return "  > \"".concat(state, "\"");
          }).join('\n'));
        }

        if (invalidRoutes.length) {
          _console.warn("Statebot[".concat(_name, "]#").concat(fnName, "(): Invalid transitions specified:\n") + invalidRoutes.map(function (route) {
            return "  > \"".concat(route, "\"");
          }).join('\n'));
        }
      }

      return function () {
        return allCleanupFns.map(function (fn) {
          return fn();
        });
      };

      function runThenMethodOnTransition(config) {
        var fromState = config.fromState,
            toState = config.toState,
            action = config.action;
        var route = "".concat(fromState, "->").concat(toState);
        return [routesHandled.increase(route), onInternalEvent(route, bindActionTo(toState, action))];
      }

      function decomposeTransitionsForEvent(acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            eventName = _ref4[0],
            transitionsAndAction = _ref4[1];

        var _expandTransitions = expandTransitions(transitionsAndAction, canWarn),
            states = _expandTransitions.states,
            routes = _expandTransitions.routes,
            configs = _expandTransitions.configs;

        if (canWarn()) {
          allStates.push.apply(allStates, _toConsumableArray(states));
          allRoutes.push.apply(allRoutes, _toConsumableArray(routes));
        }

        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, eventName, configs));
      }

      function ifStateThenEnterState(_ref5) {
        var fromState = _ref5.fromState,
            toState = _ref5.toState,
            action = _ref5.action,
            args = _ref5.args;
        return inState(fromState, function () {
          enter.apply(void 0, [toState].concat(_toConsumableArray(args)));
          isFunction(action) && runActionFor.apply(void 0, [toState, action].concat(_toConsumableArray(args)));
          return true;
        });
      }

      function createEventHandlerForTransition(_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            eventName = _ref7[0],
            configs = _ref7[1];

        return [eventsHandled.increase(eventName), onEvent(eventName, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var eventWasHandled = configs.map(function (config) {
            return _objectSpread2(_objectSpread2({}, config), {}, {
              args: args
            });
          }).some(ifStateThenEnterState);

          if (!eventWasHandled) {
            transitionNoOp("Event not handled: \"".concat(eventName, "\""));
          }
        })];
      }

      function runActionFor(state, actionFn) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var onExitingState = actionFn.apply(void 0, args);

        if (isFunction(onExitingState)) {
          var uninstall = Once(enterExitMethods[ON_EXITING](state, function (toState) {
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

          return runActionFor.apply(void 0, [state, actionFn].concat(args));
        };
      }
    }

    function previousState() {
      return stateHistory[stateHistory.length - 2];
    }

    function currentState() {
      return stateHistory[stateHistory.length - 1];
    }

    function canTransitionTo() {
      for (var _len4 = arguments.length, states = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        states[_key4] = arguments[_key4];
      }

      var testStates = states.flat();
      var err = argTypeError('canTransitionTo', {
        state: isString
      }, testStates[0]);

      if (err) {
        throw new TypeError(err);
      }

      if (!testStates.length) {
        return false;
      }

      var nextStates = statesAvailableFromHere();
      return testStates.every(function (state) {
        return nextStates.includes(state);
      });
    }

    function statesAvailableFromHere(state) {
      var _state = state !== undefined ? state : currentState();

      var err = argTypeError('statesAvailableFromHere', {
        state: isString
      }, _state);

      if (err) {
        throw new TypeError(err);
      }

      return routes.reduce(function (acc, route) {
        var _route$split$map = route.split(cxArrow).map(function (state) {
          return state.trim();
        }),
            _route$split$map2 = _slicedToArray(_route$split$map, 2),
            fromState = _route$split$map2[0],
            toState = _route$split$map2[1];

        return fromState === _state ? [].concat(_toConsumableArray(acc), [toState]) : acc;
      }, []);
    }

    function _inState(state, anyOrFn) {
      var conditionMatches = currentState() === state;

      if (anyOrFn === undefined) {
        return conditionMatches;
      }

      if (!conditionMatches) {
        return null;
      }

      if (isFunction(anyOrFn)) {
        for (var _len5 = arguments.length, fnArgs = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
          fnArgs[_key5 - 2] = arguments[_key5];
        }

        return anyOrFn.apply(void 0, fnArgs);
      }

      return anyOrFn;
    }

    function _inStateObject(stateObject) {
      var match = Object.entries(stateObject).find(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 1),
            state = _ref9[0];

        return _inState(state);
      });

      for (var _len6 = arguments.length, fnArgs = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        fnArgs[_key6 - 1] = arguments[_key6];
      }

      return match ? _inState.apply(void 0, _toConsumableArray(match.concat(fnArgs))) : null;
    }

    function inState() {
      var err = argTypeError('inState', {
        state: [isString, isPojo]
      }, arguments.length <= 0 ? undefined : arguments[0]);

      if (err) {
        throw new TypeError(err);
      }

      return isPojo(arguments.length <= 0 ? undefined : arguments[0]) ? _inStateObject.apply(void 0, arguments) : _inState.apply(void 0, arguments);
    }

    var emit = Pausable(function (eventName) {
      var err = argTypeError('emit', {
        eventName: isString
      }, eventName);

      if (err) {
        throw new TypeError(err);
      }

      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      return events.emit.apply(events, [eventName].concat(args));
    });
    var enter = Pausable(function (state) {
      var err = argTypeError('enter', {
        state: isString
      }, state);

      if (err) {
        throw new TypeError(err);
      }

      var inState = currentState();
      var toState = state;

      if (toState === inState) {
        transitionNoOp("Already in state: \"".concat(toState, "\""));
        return false;
      }

      if (!states.includes(toState)) {
        transitionNoOp("Invalid state \"".concat(toState, "\", not switching"));
        return false;
      }

      var nextRoute = "".concat(inState, "->").concat(toState);

      if (!routes.includes(nextRoute)) {
        transitionNoOp("Invalid transition \"".concat(nextRoute, "\", not switching"));
        return false;
      }

      _console.info("".concat(logPrefix, ": tId<").concat(++transitionId, ">: ").concat(nextRoute));

      stateHistory.push(toState);

      if (stateHistory.length > stateHistoryLimit) {
        stateHistory.shift();
      }

      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      emitInternalEvent.apply(void 0, [INTERNAL_EVENTS[ON_SWITCHING], toState, inState].concat(args));
      emitInternalEvent.apply(void 0, [nextRoute].concat(args));
      emitInternalEvent.apply(void 0, [INTERNAL_EVENTS[ON_SWITCHED], toState, inState].concat(args));
      return true;
    });

    function onEvent(eventName, cb) {
      var err = argTypeError('onEvent', {
        eventName: isString,
        cb: isFunction
      }, eventName, cb);

      if (err) {
        throw new TypeError(err);
      }

      events.on(eventName, cb);
      return function () {
        return events.off(eventName, cb);
      };
    }

    var switchMethods = Object.keys(INTERNAL_EVENTS).reduce(function (obj, methodName) {
      return _objectSpread2(_objectSpread2({}, obj), {}, _defineProperty({}, methodName, function (cb) {
        var err = argTypeError(methodName, {
          cb: isFunction
        }, cb);

        if (err) {
          throw new TypeError(err);
        }

        var decreaseRefCount = statesHandled.increase(INTERNAL_EVENTS[methodName]);
        var removeEvent = onInternalEvent(INTERNAL_EVENTS[methodName], cb);
        return function () {
          removeEvent();
          decreaseRefCount();
        };
      }));
    }, {});
    var enterExitMethods = [[ON_EXITING, ON_SWITCHING], [ON_ENTERING, ON_SWITCHING], [ON_EXITED, ON_SWITCHED], [ON_ENTERED, ON_SWITCHED]].reduce(function (obj, names) {
      var _names = _slicedToArray(names, 2),
          methodName = _names[0],
          switchMethod = _names[1];

      var name = methodName.slice(2);
      var eventName = name.toLowerCase();
      return _objectSpread2(_objectSpread2({}, obj), {}, _defineProperty({}, methodName, function (state, cb) {
        var err = argTypeError(methodName, {
          state: isString,
          cb: isFunction
        }, state, cb);

        if (err) {
          throw new TypeError(err);
        }

        var decreaseRefCounts = [statesHandled.increase(state), statesHandled.increase("".concat(state, ":").concat(eventName))];
        var removeEvent = switchMethods[switchMethod](function (toState, fromState) {
          for (var _len9 = arguments.length, args = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
            args[_key9 - 2] = arguments[_key9];
          }

          if (name.indexOf('Exit') === 0) {
            state === fromState && cb.apply(void 0, [toState].concat(args));
          } else {
            state === toState && cb.apply(void 0, [fromState].concat(args));
          }
        });
        return function () {
          removeEvent();
          decreaseRefCounts.map(function (fn) {
            return fn();
          });
        };
      }));
    }, {});

    function Emit(eventName) {
      for (var _len10 = arguments.length, curriedArgs = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        curriedArgs[_key10 - 1] = arguments[_key10];
      }

      var err = argTypeError('Emit', {
        eventName: isString
      }, eventName);

      if (err) {
        throw new TypeError(err);
      }

      return function () {
        for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
          args[_key11] = arguments[_key11];
        }

        return emit.apply(void 0, [eventName].concat([].concat(curriedArgs, args)));
      };
    }

    function Enter(state) {
      for (var _len12 = arguments.length, curriedArgs = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
        curriedArgs[_key12 - 1] = arguments[_key12];
      }

      var err = argTypeError('Enter', {
        state: isString
      }, state);

      if (err) {
        throw new TypeError(err);
      }

      return function () {
        for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
          args[_key13] = arguments[_key13];
        }

        return enter.apply(void 0, [state].concat([].concat(curriedArgs, args)));
      };
    }

    function _InState(state, anyOrFn) {
      for (var _len14 = arguments.length, curriedFnArgs = new Array(_len14 > 2 ? _len14 - 2 : 0), _key14 = 2; _key14 < _len14; _key14++) {
        curriedFnArgs[_key14 - 2] = arguments[_key14];
      }

      return function () {
        for (var _len15 = arguments.length, fnArgs = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
          fnArgs[_key15] = arguments[_key15];
        }

        return inState.apply(void 0, [state, anyOrFn].concat([].concat(curriedFnArgs, fnArgs)));
      };
    }

    function _InStateObject(stateObject) {
      for (var _len16 = arguments.length, curriedFnArgs = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        curriedFnArgs[_key16 - 1] = arguments[_key16];
      }

      return function () {
        for (var _len17 = arguments.length, fnArgs = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
          fnArgs[_key17] = arguments[_key17];
        }

        return inState.apply(void 0, [stateObject].concat([].concat(curriedFnArgs, fnArgs)));
      };
    }

    function InState() {
      var err = argTypeError('InState', {
        state: [isString, isPojo]
      }, arguments.length <= 0 ? undefined : arguments[0]);

      if (err) {
        throw new TypeError(err);
      }

      return isPojo(arguments.length <= 0 ? undefined : arguments[0]) ? _InStateObject.apply(void 0, arguments) : _InState.apply(void 0, arguments);
    }

    function reset() {
      _console.warn("".concat(logPrefix, ": State-machine reset!"));

      stateHistory.length = 0;
      stateHistory.push(startIn);
    }

    function transitionNoOp(message) {
      var lastState = previousState();
      var inState = currentState();
      var prevRoute = "".concat(lastState === undefined ? '[undefined]' : lastState, "->").concat(inState);
      var availableStates = statesAvailableFromHere();

      if (!availableStates.length) {
        _console.info("".concat(logPrefix, ": ").concat(message, "\n") + "  > Previous transition: \"".concat(prevRoute, "\"\n") + "  > There are no states available from \"".concat(inState, "\""));
      } else {
        _console.info("".concat(logPrefix, ": ").concat(message, "\n") + "  > Previous transition: \"".concat(prevRoute, "\"\n") + "  > From \"".concat(inState, "\", valid states are: [").concat(availableStates.map(function (state) {
          return "\"".concat(state, "\"");
        }).join(', '), "]"));
      }
    }

    function _inspect() {
      return {
        states: statesHandled.refs(),
        transitions: routesHandled.refs(),
        events: eventsHandled.refs()
      };
    }

    function _info() {
      _console.log("".concat(logPrefix, ": Information about this state-machine"));

      logRefCounterInfo(statesHandled);
      logRefCounterInfo(routesHandled);
      logRefCounterInfo(eventsHandled);
    }

    function logRefCounterInfo(refCounter) {
      var _refCounter$toValue = refCounter.toValue(),
          description = _refCounter$toValue.description,
          table = _refCounter$toValue.table;

      _console.log(description);

      if (table.length) {
        _console.table(table);
      } else {
        _console.log('  > No information');
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
      history: function history() {
        return [].concat(stateHistory);
      },

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
      info: function info() {
        return _info();
      },

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
      inspect: function inspect() {
        return _inspect();
      },

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
      name: function name() {
        return _name;
      },

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
      onTransitions: function onTransitions(transitions) {
        return applyHitcher(transitions, 'onTransitions');
      },

      /**
       * Pause the machine. {@link #statebotfsmemit|.emit()} and {@link #statebotfsmenter|.enter()} will be no-ops until
       * the machine is {@link #statebotfsmresume|.resume()}'d.
       *
       * @memberof statebotFsm
       * @instance
       * @function
       */
      pause: pause,

      /**
       * Returns `true` if the machine is {@link #statebotfsmpause|.pause()}'d
       *
       * @memberof statebotFsm
       * @instance
       * @function
       * @returns {boolean}
       */
      paused: paused,

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
      performTransitions: function performTransitions(transitions) {
        return applyHitcher(transitions, 'performTransitions');
      },

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
      reset: reset,

      /**
       * Resume a {@link #statebotfsmpause|.pause()}'d machine.
       *
       * @memberof statebotFsm
       * @instance
       * @function
       */
      resume: resume,

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
    };
  }

  function decomposeHitcherActions(hitcherActions) {
    var transitionsForEvents = {};
    var transitionsOnly = [];
    Object.entries(hitcherActions).map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
          routeChart = _ref11[0],
          actionFnOrConfigObj = _ref11[1];

      if (isFunction(actionFnOrConfigObj)) {
        transitionsOnly.push({
          routeChart: routeChart,
          action: actionFnOrConfigObj
        });
        return;
      }

      if (!isPojo(actionFnOrConfigObj)) {
        return;
      }

      var _on = actionFnOrConfigObj.on,
          _then = actionFnOrConfigObj.then;
      var hasValidEventNames = isString(_on) || isArray(_on);

      if (hasValidEventNames) {
        var eventNames = [_on].flat();
        eventNames.map(function (name) {
          transitionsForEvents[name] = transitionsForEvents[name] || [];
          transitionsForEvents[name].push({
            routeChart: routeChart,
            action: _then
          });
        });
        return;
      }

      if (isFunction(_then)) {
        transitionsOnly.push({
          routeChart: routeChart,
          action: actionFnOrConfigObj
        });
      }
    });
    return {
      transitionsForEvents: transitionsForEvents,
      transitionsOnly: transitionsOnly
    };
  }

  function expandTransitions(configs, canWarn) {
    var allStates = [];
    var allRoutes = [];

    var _configs = configs.reduce(function (acc, config) {
      var routeChart = config.routeChart,
          action = config.action;

      var _decomposeChart = decomposeChart(routeChart),
          states = _decomposeChart.states,
          routes = _decomposeChart.routes,
          transitions = _decomposeChart.transitions;

      if (canWarn()) {
        allStates.push.apply(allStates, _toConsumableArray(states));
        allRoutes.push.apply(allRoutes, _toConsumableArray(routes));
      }

      return [].concat(_toConsumableArray(acc), _toConsumableArray(transitions.map(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
            fromState = _ref13[0],
            toState = _ref13[1];

        return {
          fromState: fromState,
          toState: toState,
          action: action
        };
      })));
    }, []);

    return {
      configs: _configs,
      states: allStates,
      routes: allRoutes
    };
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


  function isStatebot(object) {
    return isPojo(object) && typeof object.__STATEBOT__ === 'number';
  }

  var argTypeError = ArgTypeError('statebot.');
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

  function routeIsPossible(machine, route) {
    var err = argTypeError('routeIsPossible', {
      machine: isStatebot,
      route: isTemplateLiteral
    }, machine, route);

    if (err) {
      throw TypeError(err);
    }

    var _route = decomposeRoute(route);

    return _route.every(function (state, index) {
      if (index === _route.length - 1) {
        return true;
      } else {
        var nextState = _route[index + 1];
        var availableStates = machine.statesAvailableFromHere(state);
        var passes = availableStates.includes(nextState);
        return passes;
      }
    });
  }

  var assertionId = 0;
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

  function assertRoute(machine, expectedRoute, options) {
    var err = argTypeError('assertRoute', {
      machine: isStatebot,
      expectedRoute: isTemplateLiteral
    }, machine, expectedRoute);

    if (err) {
      throw TypeError(err);
    }

    assertionId += 1;

    var _ref = options || {},
        _ref$description = _ref.description,
        description = _ref$description === void 0 ? 'Assertion complete' : _ref$description,
        _ref$fromState = _ref.fromState,
        fromState = _ref$fromState === void 0 ? '' : _ref$fromState,
        _ref$run = _ref.run,
        run = _ref$run === void 0 ? function () {} : _ref$run,
        _ref$permittedDeviati = _ref.permittedDeviations,
        permittedDeviations = _ref$permittedDeviati === void 0 ? 0 : _ref$permittedDeviati,
        _ref$timeoutInMs = _ref.timeoutInMs,
        timeoutInMs = _ref$timeoutInMs === void 0 ? 1000 : _ref$timeoutInMs,
        _ref$logLevel = _ref.logLevel,
        logLevel = _ref$logLevel === void 0 ? 3 : _ref$logLevel;

    var console = Logger(logLevel);
    var prefix = "Statebot[".concat(machine.name(), "]: aId<").concat(assertionId, ">");
    var route = decomposeRoute(expectedRoute);
    console.log("\n".concat(prefix, ": Asserting route: [").concat(route.join(' > '), "]"));
    console.log("".concat(prefix, ": > Assertion will start from state: \"").concat(fromState, "\""));
    var fromStateActionFn = Defer(run);

    var removeFromStateActionFn = function removeFromStateActionFn() {};

    var totalTimeTaken = TimeTaken();
    var stateTimeTaken = TimeTaken();
    var assertionTimeoutTimer;
    var deviations = 0;
    var pending = true;
    var unexpected = false;

    var consumeRoute = _toConsumableArray(route);

    var report = Table(['state', 'expected', 'info', 'took'], ['center', 'center', 'left', 'right']);
    var finaliseReport = Once(function (err) {
      addRow('', '', '', 'TOTAL: ' + totalTimeTaken());
      report.lock();
      console.log("\n".concat(prefix, ": ").concat(description, ": [").concat(err ? 'FAILED' : 'SUCCESS', "]"));
      console.table(report.content());
      return err;
    });
    var addRow = report.addRow;

    function enteredState(state) {
      if (pending) {
        addRow(state, '-', 'PENDING');
      } else {
        var expectedState = consumeRoute[0];

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

    return new Promise(function (resolve, reject) {
      if (consumeRoute.length === 0) {
        reject(finaliseReport(new Error('NO ROUTE TO TEST')));
        return;
      }

      var clearTimeoutAndResolve = function clearTimeoutAndResolve() {
        clearTimeout(assertionTimeoutTimer);
        removeFromStateActionFn();
        removeOnSwitchingListener();
        resolve.apply(void 0, arguments);
      };

      var clearTimeoutAndReject = function clearTimeoutAndReject(err) {
        clearTimeout(assertionTimeoutTimer);
        removeFromStateActionFn();
        removeOnSwitchingListener();
        reject(err);
      };

      var bailout = function bailout(message) {
        while (consumeRoute.length) {
          var expectedState = consumeRoute.shift();
          addRow(machine.currentState(), "(".concat(expectedState, ")"), message);
          unexpected = false;
        }

        clearTimeoutAndReject(finaliseReport(new Error(message)));
      };

      if (machine.inState(fromState)) {
        pending = false;
        removeFromStateActionFn = fromStateActionFn();
      }

      var _Revokable = Revokable(function (state) {
        assertionTimeoutTimer = setTimeout(function () {
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
      }),
          revoke = _Revokable.revoke,
          fn = _Revokable.fn;

      var removeOnSwitchingListener = machine.onSwitching(fn);
    });
  }

  function Table(columns, alignments) {
    columns = columns || [];
    alignments = alignments || [];
    var table = [];
    var alignment = columns.map(function (_, index) {
      return alignments[index] || 'center';
    });
    var locked = false;

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

      var obj = columns.reduce(function (acc, col, index) {
        var row = args[index] || '';
        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, col, row));
      }, {});
      table.push(obj);
    }

    function colSizes() {
      return table.reduce(function (acc, row) {
        return columns.map(function (col, index) {
          return Math.max(row[col].length, acc[index]);
        });
      }, columns.map(function () {
        return 0;
      }));
    }

    function content() {
      var sizes = colSizes();

      function formatField(value, index) {
        var size = sizes[index];
        var align = alignment[index];

        if (align === 'left') {
          return value.padEnd(size);
        }

        if (align === 'right') {
          return value.padStart(size);
        }

        return value;
      }

      var output = table.reduce(function (acc, row) {
        var formattedRow = columns.reduce(function (acc, col, index) {
          return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, col, formatField(row[col], index)));
        }, {});
        return [].concat(_toConsumableArray(acc), [formattedRow]);
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
    var startTime = Date.now();

    function fmt(num, digits) {
      return num.toFixed(digits).replace(/\.0+$/, '');
    }

    return function () {
      var duration = Date.now() - startTime;

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

  exports.Statebot = Statebot;
  exports.assertRoute = assertRoute;
  exports.decomposeChart = decomposeChart;
  exports.isStatebot = isStatebot;
  exports.routeIsPossible = routeIsPossible;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=statebot.dev.js.map
