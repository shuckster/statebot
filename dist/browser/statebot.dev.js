
/*
 * Statebot
 * v2.3.3
 * https://shuckster.github.io/statebot/
 * License: ISC
 */

var statebot = (function (exports) {
  'use strict';

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
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
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

  var domain;

  function EventHandlers() {}

  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.usingDomains = false;
  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function () {
    this.domain = null;

    if (EventEmitter.usingDomains) {
      if (domain.active ) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  function emitNone(handler, isFn, self) {
    if (isFn) handler.call(self);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self);
      }
    }
  }

  function emitOne(handler, isFn, self, arg1) {
    if (isFn) handler.call(self, arg1);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self, arg1);
      }
    }
  }

  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) handler.call(self, arg1, arg2);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self, arg1, arg2);
      }
    }
  }

  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) handler.call(self, arg1, arg2, arg3);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self, arg1, arg2, arg3);
      }
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn) handler.apply(self, args);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].apply(self, args);
      }
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = type === 'error';
    events = this._events;
    if (events) doError = doError && events.error == null;else if (!doError) return false;
    domain = this.domain;

    if (doError) {
      er = arguments[1];

      if (domain) {
        if (!er) er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er;
      } else {
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }

      return false;
    }

    handler = events[type];
    if (!handler) return false;
    var isFn = typeof handler === 'function';
    len = arguments.length;

    switch (len) {
      case 1:
        emitNone(handler, isFn, this);
        break;

      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;

      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;

      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;

      default:
        args = new Array(len - 1);

        for (i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }

        emitMany(handler, isFn, this, args);
    }
    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    events = target._events;

    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      if (events.newListener) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener);
        events = target._events;
      }

      existing = events[type];
    }

    if (!existing) {
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else {
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      if (!existing.warned) {
        m = $getMaxListeners(target);

        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }

  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

  function _onceWrap(target, type, listener) {
    var fired = false;

    function g() {
      target.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }

    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    events = this._events;
    if (!events) return this;
    list = events[type];
    if (!list) return this;

    if (list === listener || list.listener && list.listener === listener) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length; i-- > 0;) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (list.length === 1) {
        list[0] = undefined;

        if (--this._eventsCount === 0) {
          this._events = new EventHandlers();
          return this;
        } else {
          delete events[type];
        }
      } else {
        spliceOne(list, position);
      }

      if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events;
    events = this._events;
    if (!events) return this;

    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      } else if (events[type]) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
      }

      return this;
    }

    if (arguments.length === 0) {
      var keys = Object.keys(events);

      for (var i = 0, key; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }

      this.removeAllListeners('removeListener');
      this._events = new EventHandlers();
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {
      do {
        this.removeListener(type, listeners[listeners.length - 1]);
      } while (listeners[0]);
    }

    return this;
  };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;
    if (!events) ret = [];else {
      evlistener = events[type];
      if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
    }
    return ret;
  };

  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;

  function listenerCount(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k];
    }

    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);

    while (i--) {
      copy[i] = arr[i];
    }

    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);

    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }

    return ret;
  }

  var utils = {
    isArray: isArray,
    isEventEmitter: isEventEmitter,
    isFunction: isFunction,
    isPojo: isPojo,
    isString: isString,
    isTemplateLiteral: isTemplateLiteral,
    uniq: uniq,
    Defer: Defer,
    Once: Once,
    Revokable: Revokable,
    ReferenceCounter: ReferenceCounter,
    ArgTypeError: ArgTypeError,
    Logger: Logger
  };

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

  function isEventEmitter(obj) {
    return isObject(obj) && isFunction(obj.emit) && isFunction(obj.addListener) && isFunction(obj.removeListener);
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

    if (isArray(obj)) {
      return obj.every(function (item) {
        return isString(item);
      });
    }

    return false;
  }

  function uniq(input) {
    return input.reduce(function (acc, one) {
      return acc.indexOf(one) === -1 ? [].concat(_toConsumableArray(acc), [one]) : acc;
    }, []);
  }

  function defer(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var timer = setTimeout.apply(void 0, [fn, 0].concat(args));
    return function () {
      clearTimeout(timer);
    };
  }

  function Defer(fn) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
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

  function ReferenceCounter(name, kind, description) {
    var _refs = {};

    for (var _len3 = arguments.length, expecting = new Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
      expecting[_key3 - 3] = arguments[_key3];
    }

    [].concat(expecting).flat().forEach(function (ref) {
      _refs[ref] = 0;
    });

    function increase(ref) {
      _refs[ref] = countOf(ref) + 1;
      return function () {
        return decrease(ref);
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

  function ArgTypeError() {
    var errPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return function (fnName, typeMap) {
      var argMap = Object.entries(typeMap).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            argName = _ref5[0],
            argType = _ref5[1];

        return {
          argName: argName,
          argType: argType
        };
      });
      var signature = Object.keys(typeMap).join(', ');

      for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      var err = args.map(function (arg, index) {
        var _argMap$index = argMap[index],
            argName = _argMap$index.argName,
            argType = _argMap$index.argType;

        if (arg === undefined) {
          return "Argument undefined: \"".concat(argName, "\"");
        }

        var errorDesc;
        var typeName;
        var typeMatches;

        if (isFunction(argType)) {
          typeMatches = argType(arg) === true;
          typeName = argType.name;
          errorDesc = "".concat(typeName, "(").concat(argName, ") did not return true");
        } else {
          typeMatches = _typeof(arg) === argType;
          typeName = argType;
          errorDesc = "Argument \"".concat(argName, "\" should be a ").concat(typeName);
        }

        if (!typeMatches) {
          return "".concat(errorDesc, ": ").concat(argName, " === ").concat(_typeof(arg), "(").concat(arg, ")");
        }
      }).filter(Boolean);

      if (!err.length) {
        return undefined;
      } else {
        return "\n".concat(errPrefix).concat(fnName, "(").concat(signature, "):\n") + "".concat(err.map(function (err) {
          return "> ".concat(err);
        }).join('\n'));
      }
    };
  }

  function Logger(level) {
    var _level = level;

    if (isString(_level)) {
      _level = {
        info: 3,
        log: 2,
        warn: 1,
        none: 0
      }[_level] || 3;
    }

    function canWarn() {
      return _level >= 1;
    }

    function canLog() {
      return _level >= 2;
    }

    function canInfo() {
      return _level >= 3;
    }

    return {
      canWarn: canWarn,
      canLog: canLog,
      canInfo: canInfo,
      info: function info() {
        var _console;

        return canInfo() && (_console = console).info.apply(_console, arguments);
      },
      table: function table() {
        var _console2;

        return canLog() && (_console2 = console).table.apply(_console2, arguments);
      },
      log: function log() {
        var _console3;

        return canLog() && (_console3 = console).log.apply(_console3, arguments);
      },
      warn: function warn() {
        var _console4;

        return canWarn() && (_console4 = console).warn.apply(_console4, arguments);
      },
      error: function error() {
        var _console5;

        return (_console5 = console).error.apply(_console5, arguments);
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
  var parsing = {
    cxPipe: cxPipe,
    cxArrow: cxArrow,
    rxDisallowedCharacters: rxDisallowedCharacters,
    decomposeChart: decomposeChart,
    decomposeRoute: decomposeRoute
  };
  var uniq$1 = utils.uniq,
      ArgTypeError$1 = utils.ArgTypeError,
      isTemplateLiteral$1 = utils.isTemplateLiteral;
  var argTypeError = ArgTypeError$1('statebot.');

  function decomposeRoute(templateLiteral) {
    var err = argTypeError('decomposeRoute', {
      templateLiteral: isTemplateLiteral$1
    }, templateLiteral);

    if (err) {
      throw TypeError(err);
    }

    var lines = condensedLines(templateLiteral);
    var flattenedRoute = tokenisedLines(lines).flat(2);
    return flattenedRoute;
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
    var err = argTypeError('decomposeChart', {
      chart: isTemplateLiteral$1
    }, chart);

    if (err) {
      throw TypeError(err);
    }

    var lines = condensedLines(chart);
    var linesOfTokens = tokenisedLines(lines);
    var linesOfRoutes = linesOfTokens.map(decomposeRouteFromTokens).flat(1);
    var linesOfTransitions = linesOfRoutes.map(decomposeTransitionsFromRoute).flat(1);
    var states = [];
    var routeKeys = linesOfTransitions.map(function (route) {
      states.push.apply(states, _toConsumableArray(route));
      return route.join(cxArrow);
    });
    var filteredRoutes = uniq$1(routeKeys);
    var filteredStates = uniq$1(states);
    return {
      transitions: filteredRoutes.map(function (route) {
        return route.split(cxArrow);
      }),
      routes: filteredRoutes,
      states: filteredStates
    };
  }

  function linesFrom(strOrArr) {
    return [strOrArr].flat().reduce(function (acc, line) {
      return [].concat(_toConsumableArray(acc), [line.split(rxCRLF)]);
    }, []).flat();
  }

  function condensedLines(strOrArr) {
    var input = linesFrom(strOrArr);
    var output = [];
    input.reduce(function (condensedLine, line) {
      var sanitisedLine = line.replace(rxComment, '').replace(rxDisallowedCharacters, '');

      if (!sanitisedLine) {
        return condensedLine;
      }

      if (rxLineContinuations.test(sanitisedLine)) {
        return condensedLine + sanitisedLine;
      }

      output.push(condensedLine + sanitisedLine);
      return '';
    }, '');
    return output;
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

  var statebot = {
    Statebot: Statebot,
    isStatebot: isStatebot
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

  var isArray$1 = utils.isArray,
      isEventEmitter$1 = utils.isEventEmitter,
      isFunction$1 = utils.isFunction,
      isPojo$1 = utils.isPojo,
      isString$1 = utils.isString,
      ArgTypeError$2 = utils.ArgTypeError,
      Logger$1 = utils.Logger,
      ReferenceCounter$1 = utils.ReferenceCounter;
  var decomposeChart$1 = parsing.decomposeChart,
      cxArrow$1 = parsing.cxArrow;
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
    if (!isString$1(_name)) {
      throw TypeError('\nStatebot: Please specify a name for this machine');
    }

    var logPrefix = "Statebot[".concat(_name, "]");

    if (!isPojo$1(options)) {
      throw TypeError("\n".concat(logPrefix, ": Please specify options for this machine"));
    }

    var _ref = options || {},
        _ref$chart = _ref.chart,
        chart = _ref$chart === void 0 ? undefined : _ref$chart,
        _ref$logLevel = _ref.logLevel,
        logLevel = _ref$logLevel === void 0 ? 3 : _ref$logLevel,
        _ref$historyLimit = _ref.historyLimit,
        historyLimit = _ref$historyLimit === void 0 ? 2 : _ref$historyLimit;

    var argTypeError = ArgTypeError$2("".concat(logPrefix, "#"));
    var console = Logger$1(logLevel);
    var canWarn = console.canWarn;

    var _ref2 = chart ? decomposeChart$1(chart) : options,
        _ref2$states = _ref2.states,
        states = _ref2$states === void 0 ? [] : _ref2$states,
        _ref2$routes = _ref2.routes,
        routes = _ref2$routes === void 0 ? [] : _ref2$routes;

    var _options$startIn = options.startIn,
        startIn = _options$startIn === void 0 ? states[0] : _options$startIn;

    if (!states.includes(startIn)) {
      throw Error("".concat(logPrefix, ": Starting-state not in chart: \"").concat(startIn, "\""));
    }

    var transitionId = 0;
    var stateHistory = [startIn];
    var stateHistoryLimit = Math.max(historyLimit, 2);
    var events = isEventEmitter$1(options.events) ? options.events : new EventEmitter();
    var internalEvents = new EventEmitter();
    var INTERNAL_EVENTS = {
      onSwitching: '(ANY)state:changing',
      onSwitched: '(ANY)state:changed'
    };

    function emitInternalEvent(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return internalEvents.emit.apply(internalEvents, [eventName].concat(args));
    }

    function onInternalEvent(eventName, fn) {
      internalEvents.addListener(eventName, fn);
      return function () {
        internalEvents.removeListener(eventName, fn);
      };
    }

    var statesHandled = ReferenceCounter$1(_name, 'states', 'Listening for the following state-changes', _toConsumableArray(states));
    var routesHandled = ReferenceCounter$1(_name, 'transitions', 'Listening for the following transitions', _toConsumableArray(routes));
    var eventsHandled = ReferenceCounter$1(_name, 'events', 'Listening for the following events');

    function applyHitcher(hitcher, fnName) {
      var hitcherActions = isFunction$1(hitcher) ? hitcher({
        enter: enter,
        emit: emit,
        Enter: Enter,
        Emit: Emit
      }) : isPojo$1(hitcher) ? hitcher : null;

      if (!isPojo$1(hitcherActions)) {
        throw TypeError("Statebot[".concat(_name, "]#").concat(fnName, "(): Expected an object, or a function that returns an object"));
      }

      var events = {};
      var transitions = [];
      Object.entries(hitcherActions).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            routeChart = _ref4[0],
            actionOrConfig = _ref4[1];

        if (isFunction$1(actionOrConfig)) {
          transitions.push({
            routeChart: routeChart,
            action: actionOrConfig
          });
        } else if (!isPojo$1(actionOrConfig)) {
          return;
        }

        var _on = actionOrConfig.on,
            _then = actionOrConfig.then;

        if (isString$1(_on) || isArray$1(_on)) {
          var eventNames = [_on].flat();
          eventNames.forEach(function (eventName) {
            events[eventName] = events[eventName] || [];
            events[eventName].push({
              routeChart: routeChart,
              action: _then
            });
          });
        } else if (isFunction$1(_then)) {
          transitions.push({
            routeChart: routeChart,
            action: actionOrConfig
          });
        }
      });
      var allStates = [];
      var allRoutes = [];
      var decomposedEvents = Object.entries(events).reduce(function (acc, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            eventName = _ref6[0],
            _configs = _ref6[1];

        var _decomposeConfigs = decomposeConfigs(_configs, canWarn),
            states = _decomposeConfigs.states,
            routes = _decomposeConfigs.routes,
            configs = _decomposeConfigs.configs;

        if (canWarn()) {
          allStates.push.apply(allStates, _toConsumableArray(states));
          allRoutes.push.apply(allRoutes, _toConsumableArray(routes));
        }

        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, eventName, configs));
      }, {});
      var allCleanupFns = [];
      allCleanupFns.push.apply(allCleanupFns, _toConsumableArray(Object.entries(decomposedEvents).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            eventName = _ref8[0],
            configs = _ref8[1];

        return [eventsHandled.increase(eventName), onEvent(eventName, function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var eventWasHandled = configs.some(function (_ref9) {
            var fromState = _ref9.fromState,
                toState = _ref9.toState,
                action = _ref9.action;
            var passed = inState(fromState, function () {
              enter.apply(void 0, [toState].concat(args));

              if (isFunction$1(action)) {
                action.apply(void 0, args);
              }

              return true;
            });
            return !!passed;
          });

          if (!eventWasHandled) {
            transitionNoOp("Event not handled: \"".concat(eventName, "\""));
          }
        })];
      }).flat()));
      var transitionConfigs = decomposeConfigs(transitions, canWarn);

      if (canWarn()) {
        allStates.push.apply(allStates, _toConsumableArray(transitionConfigs.states));
        allRoutes.push.apply(allRoutes, _toConsumableArray(transitionConfigs.routes));
      }

      allCleanupFns.push.apply(allCleanupFns, _toConsumableArray(transitionConfigs.configs.map(function (transition) {
        var fromState = transition.fromState,
            toState = transition.toState,
            action = transition.action;
        var route = "".concat(fromState, "->").concat(toState);
        return [routesHandled.increase(route), onInternalEvent(route, action)];
      }).flat()));

      if (canWarn()) {
        var invalidStates = allStates.filter(function (state) {
          return !states.includes(state);
        });
        var invalidRoutes = allRoutes.filter(function (route) {
          return !routes.includes(route);
        });

        if (invalidStates.length) {
          console.warn("Statebot[".concat(_name, "]#").concat(fnName, "(): Invalid states specified:\n") + invalidStates.map(function (state) {
            return "  > \"".concat(state, "\"");
          }).join('\n'));
        }

        if (invalidRoutes.length) {
          console.warn("Statebot[".concat(_name, "]#").concat(fnName, "(): Invalid transitions specified:\n") + invalidRoutes.map(function (route) {
            return "  > \"".concat(route, "\"");
          }).join('\n'));
        }
      }

      return function () {
        return allCleanupFns.forEach(function (fn) {
          return fn();
        });
      };
    }

    function previousState() {
      return stateHistory[stateHistory.length - 2];
    }

    function currentState() {
      return stateHistory[stateHistory.length - 1];
    }

    function canTransitionTo() {
      for (var _len3 = arguments.length, states = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        states[_key3] = arguments[_key3];
      }

      var testStates = states.flat();
      var err = argTypeError('canTransitionTo', {
        state: isString$1
      }, testStates[0]);

      if (err) {
        throw TypeError(err);
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
        state: isString$1
      }, _state);

      if (err) {
        throw TypeError(err);
      }

      return routes.reduce(function (acc, route) {
        var _route$split$map = route.split(cxArrow$1).map(function (state) {
          return state.trim();
        }),
            _route$split$map2 = _slicedToArray(_route$split$map, 2),
            fromState = _route$split$map2[0],
            toState = _route$split$map2[1];

        if (fromState === _state) {
          return [].concat(_toConsumableArray(acc), [toState]);
        }

        return acc;
      }, []);
    }

    function inState(state, anyOrFn) {
      var err = argTypeError('inState', {
        state: isString$1
      }, state);

      if (err) {
        throw TypeError(err);
      }

      var conditionMatches = currentState() === state;

      if (anyOrFn !== undefined) {
        if (!conditionMatches) {
          return null;
        }

        if (isFunction$1(anyOrFn)) {
          for (var _len4 = arguments.length, fnArgs = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            fnArgs[_key4 - 2] = arguments[_key4];
          }

          return anyOrFn.apply(void 0, fnArgs);
        }

        return anyOrFn;
      }

      return conditionMatches;
    }

    function emit(eventName) {
      var err = argTypeError('emit', {
        eventName: isString$1
      }, eventName);

      if (err) {
        throw TypeError(err);
      }

      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return events.emit.apply(events, [eventName].concat(args));
    }

    function enter(state) {
      var err = argTypeError('enter', {
        state: isString$1
      }, state);

      if (err) {
        throw TypeError(err);
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

      console.info("".concat(logPrefix, ": tId<").concat(++transitionId, ">: ").concat(nextRoute));
      stateHistory.push(toState);

      if (stateHistory.length > stateHistoryLimit) {
        stateHistory.shift();
      }

      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      emitInternalEvent.apply(void 0, [INTERNAL_EVENTS.onSwitching, toState, inState].concat(args));
      emitInternalEvent.apply(void 0, [nextRoute].concat(args));
      emitInternalEvent.apply(void 0, [INTERNAL_EVENTS.onSwitched, toState, inState].concat(args));
      return true;
    }

    function onEvent(eventName, cb) {
      var err = argTypeError('onEvent', {
        eventName: isString$1,
        cb: isFunction$1
      }, eventName, cb);

      if (err) {
        throw TypeError(err);
      }

      events.addListener(eventName, cb);
      return function () {
        return events.removeListener(eventName, cb);
      };
    }

    var switchMethods = Object.keys(INTERNAL_EVENTS).reduce(function (obj, methodName) {
      return _objectSpread2(_objectSpread2({}, obj), {}, _defineProperty({}, methodName, function (cb) {
        var err = argTypeError(methodName, {
          cb: isFunction$1
        }, cb);

        if (err) {
          throw TypeError(err);
        }

        var decreaseRefCount = statesHandled.increase(INTERNAL_EVENTS[methodName]);
        var removeEvent = onInternalEvent(INTERNAL_EVENTS[methodName], function (toState, fromState) {
          for (var _len7 = arguments.length, args = new Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
            args[_key7 - 2] = arguments[_key7];
          }

          cb.apply(void 0, [toState, fromState].concat(args));
        });
        return function () {
          removeEvent();
          decreaseRefCount();
        };
      }));
    }, {});
    var enterExitMethods = [['Exiting', 'onSwitching'], ['Entering', 'onSwitching'], ['Exited', 'onSwitched'], ['Entered', 'onSwitched']].reduce(function (obj, names) {
      var _names = _slicedToArray(names, 2),
          name = _names[0],
          switchMethod = _names[1];

      var methodName = "on".concat(name);
      var eventName = name.toLowerCase();
      return _objectSpread2(_objectSpread2({}, obj), {}, _defineProperty({}, methodName, function (state, cb) {
        var err = argTypeError(methodName, {
          state: isString$1,
          cb: isFunction$1
        }, state, cb);

        if (err) {
          throw TypeError(err);
        }

        var decreaseRefCounts = [statesHandled.increase(state), statesHandled.increase("".concat(state, ":").concat(eventName))];
        var removeEvent = switchMethods[switchMethod](function (toState, fromState) {
          for (var _len8 = arguments.length, args = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
            args[_key8 - 2] = arguments[_key8];
          }

          if (name.indexOf('Exit') === 0) {
            if (state === fromState) {
              cb.apply(void 0, [toState].concat(args));
            }
          } else {
            if (state === toState) {
              cb.apply(void 0, [fromState].concat(args));
            }
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
      for (var _len9 = arguments.length, curriedArgs = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        curriedArgs[_key9 - 1] = arguments[_key9];
      }

      var err = argTypeError('Emit', {
        eventName: isString$1
      }, eventName);

      if (err) {
        throw TypeError(err);
      }

      return function () {
        for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          args[_key10] = arguments[_key10];
        }

        return emit.apply(void 0, [eventName].concat([].concat(curriedArgs, args)));
      };
    }

    function Enter(state) {
      for (var _len11 = arguments.length, curriedArgs = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        curriedArgs[_key11 - 1] = arguments[_key11];
      }

      var err = argTypeError('Enter', {
        state: isString$1
      }, state);

      if (err) {
        throw TypeError(err);
      }

      return function () {
        for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          args[_key12] = arguments[_key12];
        }

        return enter.apply(void 0, [state].concat([].concat(curriedArgs, args)));
      };
    }

    function InState(state, anyOrFn) {
      for (var _len13 = arguments.length, curriedFnArgs = new Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _key13 < _len13; _key13++) {
        curriedFnArgs[_key13 - 2] = arguments[_key13];
      }

      var err = argTypeError('InState', {
        state: isString$1
      }, state);

      if (err) {
        throw TypeError(err);
      }

      return function () {
        for (var _len14 = arguments.length, fnArgs = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
          fnArgs[_key14] = arguments[_key14];
        }

        return inState.apply(void 0, [state, anyOrFn].concat([].concat(curriedFnArgs, fnArgs)));
      };
    }

    function reset() {
      console.warn("".concat(logPrefix, ": State-machine reset!"));
      stateHistory.length = 0;
      stateHistory.push(startIn);
    }

    function transitionNoOp(message) {
      var lastState = previousState();
      var inState = currentState();
      var prevRoute = "".concat(lastState === undefined ? '[undefined]' : lastState, "->").concat(inState);
      var availableStates = statesAvailableFromHere();

      if (!availableStates.length) {
        console.info("".concat(logPrefix, ": ").concat(message, "\n") + "  > Previous transition: \"".concat(prevRoute, "\"\n") + "  > There are no states available from \"".concat(inState, "\""));
      } else {
        console.info("".concat(logPrefix, ": ").concat(message, "\n") + "  > Previous transition: \"".concat(prevRoute, "\"\n") + "  > From \"".concat(inState, "\", valid states are: [").concat(availableStates.map(function (state) {
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
      console.log("".concat(logPrefix, ": Information about this state-machine"));
      logRefCounterInfo(statesHandled);
      logRefCounterInfo(routesHandled);
      logRefCounterInfo(eventsHandled);
    }

    function logRefCounterInfo(refCounter) {
      var _refCounter$toValue = refCounter.toValue(),
          description = _refCounter$toValue.description,
          table = _refCounter$toValue.table;

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
      onTransitions: function onTransitions(transitions) {
        return applyHitcher(transitions, 'onTransitions');
      },

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
    };
  }

  function decomposeConfigs(configs, canWarn) {
    var allStates = [];
    var allRoutes = [];

    var _configs = configs.reduce(function (acc, config) {
      var routeChart = config.routeChart,
          action = config.action;

      var _decomposeChart = decomposeChart$1(routeChart),
          states = _decomposeChart.states,
          routes = _decomposeChart.routes,
          transitions = _decomposeChart.transitions;

      if (canWarn()) {
        allStates.push.apply(allStates, _toConsumableArray(states));
        allRoutes.push.apply(allRoutes, _toConsumableArray(routes));
      }

      return [].concat(_toConsumableArray(acc), _toConsumableArray(transitions.map(function (transition) {
        var _transition = _slicedToArray(transition, 2),
            fromState = _transition[0],
            toState = _transition[1];

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
    return isPojo$1(object) && typeof object.__STATEBOT__ === 'number';
  }

  var assertions = {
    routeIsPossible: routeIsPossible,
    assertRoute: assertRoute
  };
  var isStatebot$1 = statebot.isStatebot;
  var decomposeRoute$1 = parsing.decomposeRoute;
  var Defer$1 = utils.Defer,
      Once$1 = utils.Once,
      Revokable$1 = utils.Revokable,
      Logger$2 = utils.Logger,
      ArgTypeError$3 = utils.ArgTypeError,
      isTemplateLiteral$2 = utils.isTemplateLiteral;
  var argTypeError$1 = ArgTypeError$3('statebot.');
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
    var err = argTypeError$1('routeIsPossible', {
      machine: isStatebot$1,
      route: isTemplateLiteral$2
    }, machine, route);

    if (err) {
      throw TypeError(err);
    }

    var _route = decomposeRoute$1(route);

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
    var err = argTypeError$1('assertRoute', {
      machine: isStatebot$1,
      expectedRoute: isTemplateLiteral$2
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

    var console = Logger$2(logLevel);
    var prefix = "Statebot[".concat(machine.name(), "]: aId<").concat(assertionId, ">");
    var route = decomposeRoute$1(expectedRoute);
    console.log("\n".concat(prefix, ": Asserting route: [").concat(route.join(' > '), "]"));
    console.log("".concat(prefix, ": > Assertion will start from state: \"").concat(fromState, "\""));
    var fromStateActionFn = Defer$1(run);

    var removeFromStateActionFn = function removeFromStateActionFn() {};

    var totalTimeTaken = TimeTaken();
    var stateTimeTaken = TimeTaken();
    var assertionTimeoutTimer;
    var deviations = 0;
    var pending = true;
    var unexpected = false;

    var consumeRoute = _toConsumableArray(route);

    var report = Table(['state', 'expected', 'info', 'took'], ['center', 'center', 'left', 'right']);
    var finaliseReport = Once$1(function (err) {
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

      var _Revokable = Revokable$1(function (state) {
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

  function Table() {
    var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var alignments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
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

    function padLeft(str, len) {
      return str + ' '.repeat(len - str.length);
    }

    function padRight(str, len) {
      return ' '.repeat(len - str.length) + str;
    }

    function content() {
      var sizes = colSizes();

      function formatField(value, index) {
        var size = sizes[index];
        var align = alignment[index];

        if (align === 'left') {
          return padLeft(value, size);
        }

        if (align === 'right') {
          return padRight(value, size);
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

  var Statebot$1 = statebot.Statebot,
      isStatebot$2 = statebot.isStatebot;
  var assertRoute$1 = assertions.assertRoute,
      routeIsPossible$1 = assertions.routeIsPossible;
  var decomposeChart$2 = parsing.decomposeChart;
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
   * <script src="https://unpkg.com/statebot@2.3.3/dist/browser/statebot.min.js"></script>
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

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVib3QuZGV2LmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcmVnaXN0cnkubnBtanMub3JnL3JvbGx1cC1wbHVnaW4tbm9kZS1idWlsdGlucy8yLjEuMi9ub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLWJ1aWx0aW5zL3NyYy9lczYvZXZlbnRzLmpzIiwiLi4vLi4vc3JjL3V0aWxzLmpzIiwiLi4vLi4vc3JjL3BhcnNpbmcuanMiLCIuLi8uLi9zcmMvc3RhdGVib3QuanMiLCIuLi8uLi9zcmMvYXNzZXJ0aW9ucy5qcyIsIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkb21haW47XG5cbi8vIFRoaXMgY29uc3RydWN0b3IgaXMgdXNlZCB0byBzdG9yZSBldmVudCBoYW5kbGVycy4gSW5zdGFudGlhdGluZyB0aGlzIGlzXG4vLyBmYXN0ZXIgdGhhbiBleHBsaWNpdGx5IGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIHRvIGdldCBhIFwiY2xlYW5cIiBlbXB0eVxuLy8gb2JqZWN0ICh0ZXN0ZWQgd2l0aCB2OCB2NC45KS5cbmZ1bmN0aW9uIEV2ZW50SGFuZGxlcnMoKSB7fVxuRXZlbnRIYW5kbGVycy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XG5leHBvcnQge0V2ZW50RW1pdHRlcn07XG5cbi8vIG5vZGVqcyBvZGRpdHlcbi8vIHJlcXVpcmUoJ2V2ZW50cycpID09PSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXJcblxuRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucyA9IGZhbHNlO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmRvbWFpbiA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kb21haW4gPSBudWxsO1xuICBpZiAoRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucykge1xuICAgIC8vIGlmIHRoZXJlIGlzIGFuIGFjdGl2ZSBkb21haW4sIHRoZW4gYXR0YWNoIHRvIGl0LlxuICAgIGlmIChkb21haW4uYWN0aXZlICYmICEodGhpcyBpbnN0YW5jZW9mIGRvbWFpbi5Eb21haW4pKSB7XG4gICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbi5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJuXCIgYXJndW1lbnQgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG4vLyBUaGVzZSBzdGFuZGFsb25lIGVtaXQqIGZ1bmN0aW9ucyBhcmUgdXNlZCB0byBvcHRpbWl6ZSBjYWxsaW5nIG9mIGV2ZW50XG4vLyBoYW5kbGVycyBmb3IgZmFzdCBjYXNlcyBiZWNhdXNlIGVtaXQoKSBpdHNlbGYgb2Z0ZW4gaGFzIGEgdmFyaWFibGUgbnVtYmVyIG9mXG4vLyBhcmd1bWVudHMgYW5kIGNhbiBiZSBkZW9wdGltaXplZCBiZWNhdXNlIG9mIHRoYXQuIFRoZXNlIGZ1bmN0aW9ucyBhbHdheXMgaGF2ZVxuLy8gdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyBhbmQgdGh1cyBkbyBub3QgZ2V0IGRlb3B0aW1pemVkLCBzbyB0aGUgY29kZVxuLy8gaW5zaWRlIHRoZW0gY2FuIGV4ZWN1dGUgZmFzdGVyLlxuZnVuY3Rpb24gZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgc2VsZikge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZik7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdE9uZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEsIGFyZzIpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEsIGFyZzIpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSwgYXJnMik7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZ3MpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGV2ZW50cywgZG9tYWluO1xuICB2YXIgbmVlZERvbWFpbkV4aXQgPSBmYWxzZTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT0gbnVsbCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBkb21haW4gPSB0aGlzLmRvbWFpbjtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgaWYgKGRvbWFpbikge1xuICAgICAgaWYgKCFlcilcbiAgICAgICAgZXIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQnKTtcbiAgICAgIGVyLmRvbWFpbkVtaXR0ZXIgPSB0aGlzO1xuICAgICAgZXIuZG9tYWluID0gZG9tYWluO1xuICAgICAgZXIuZG9tYWluVGhyb3duID0gZmFsc2U7XG4gICAgICBkb21haW4uZW1pdCgnZXJyb3InLCBlcik7XG4gICAgfSBlbHNlIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmICghaGFuZGxlcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGlzRm4gPSB0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJztcbiAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICAvLyBmYXN0IGNhc2VzXG4gICAgY2FzZSAxOlxuICAgICAgZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgdGhpcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIHNsb3dlclxuICAgIGRlZmF1bHQ6XG4gICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgaWYgKG5lZWREb21haW5FeGl0KVxuICAgIGRvbWFpbi5leGl0KCk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoIWV2ZW50cykge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKCFleGlzdGluZykge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBpZiAoIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICAgIGlmIChtICYmIG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0pIHtcbiAgICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgdHlwZSArICcgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgICAgZW1pdFdhcm5pbmcodyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIGVtaXRXYXJuaW5nKGUpIHtcbiAgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gJ2Z1bmN0aW9uJyA/IGNvbnNvbGUud2FybihlKSA6IGNvbnNvbGUubG9nKGUpO1xufVxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgZmlyZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHJldHVybiBnO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmICghbGlzdClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCAobGlzdC5saXN0ZW5lciAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGxpc3RbMF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cztcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKCFldmVudHMpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoIWV2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGtleTsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBkbyB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfSB3aGlsZSAobGlzdGVuZXJzWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICB2YXIgZXZsaXN0ZW5lcjtcbiAgdmFyIHJldDtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoIWV2ZW50cylcbiAgICByZXQgPSBbXTtcbiAgZWxzZSB7XG4gICAgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgICBpZiAoIWV2bGlzdGVuZXIpXG4gICAgICByZXQgPSBbXTtcbiAgICBlbHNlIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldCA9IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdO1xuICAgIGVsc2VcbiAgICAgIHJldCA9IHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdC5vd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKS5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKHZhciBpID0gaW5kZXgsIGsgPSBpICsgMSwgbiA9IGxpc3QubGVuZ3RoOyBrIDwgbjsgaSArPSAxLCBrICs9IDEpXG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBpKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgVVRJTFNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5LFxuICBpc0V2ZW50RW1pdHRlcixcbiAgaXNGdW5jdGlvbixcbiAgaXNQb2pvLFxuICBpc1N0cmluZyxcbiAgaXNUZW1wbGF0ZUxpdGVyYWwsXG4gIHVuaXEsXG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIFJlZmVyZW5jZUNvdW50ZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKG9iaikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopXG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJ1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc0V2ZW50RW1pdHRlciAob2JqKSB7XG4gIHJldHVybiAoXG4gICAgaXNPYmplY3Qob2JqKSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLmVtaXQpICYmXG4gICAgaXNGdW5jdGlvbihvYmouYWRkTGlzdGVuZXIpICYmXG4gICAgaXNGdW5jdGlvbihvYmoucmVtb3ZlTGlzdGVuZXIpXG4gIClcbn1cblxuZnVuY3Rpb24gaXNQb2pvIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCAoIWlzT2JqZWN0KG9iaikpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBPYmplY3QucHJvdG90eXBlXG59XG5cbmZ1bmN0aW9uIGlzVGVtcGxhdGVMaXRlcmFsIChvYmopIHtcbiAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmV2ZXJ5KGl0ZW0gPT4gaXNTdHJpbmcoaXRlbSkpXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHVuaXEgKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgb25lKSA9PiAoYWNjLmluZGV4T2Yob25lKSA9PT0gLTEgPyBbLi4uYWNjLCBvbmVdIDogYWNjKSwgW10pXG59XG5cbmZ1bmN0aW9uIGRlZmVyIChmbiwgLi4uYXJncykge1xuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoZm4sIDAsIC4uLmFyZ3MpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5mdW5jdGlvbiBEZWZlciAoZm4pIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBkZWZlcihmbiwgLi4uYXJncylcbn1cblxuZnVuY3Rpb24gT25jZSAoZm4pIHtcbiAgY29uc3QgeyByZXZva2UsIGZuOiBfZm4gfSA9IFJldm9rYWJsZShmbilcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICByZXN1bHQgPSBfZm4oLi4uYXJncylcbiAgICByZXZva2UoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBSZXZva2FibGUgKGZuKSB7XG4gIGxldCByZXZva2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4ge1xuICAgIGZuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCFyZXZva2VkKSB7XG4gICAgICAgIHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICByZXZva2U6ICgpID0+IHtcbiAgICAgIHJldm9rZWQgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFJlZmVyZW5jZUNvdW50ZXIgKG5hbWUsIGtpbmQsIGRlc2NyaXB0aW9uLCAuLi5leHBlY3RpbmcpIHtcbiAgY29uc3QgX3JlZnMgPSB7fTtcbiAgWy4uLmV4cGVjdGluZ10uZmxhdCgpLmZvckVhY2gocmVmID0+IHtcbiAgICBfcmVmc1tyZWZdID0gMFxuICB9KVxuICBmdW5jdGlvbiBpbmNyZWFzZSAocmVmKSB7XG4gICAgX3JlZnNbcmVmXSA9IGNvdW50T2YocmVmKSArIDFcbiAgICByZXR1cm4gKCkgPT4gZGVjcmVhc2UocmVmKVxuICB9XG4gIGZ1bmN0aW9uIGRlY3JlYXNlIChyZWYpIHtcbiAgICBjb25zdCBjb3VudCA9IGNvdW50T2YocmVmKSAtIDFcbiAgICBfcmVmc1tyZWZdID0gTWF0aC5tYXgoY291bnQsIDApXG4gIH1cbiAgZnVuY3Rpb24gY291bnRPZiAocmVmKSB7XG4gICAgcmV0dXJuIF9yZWZzW3JlZl0gfHwgMFxuICB9XG4gIGZ1bmN0aW9uIHJlZnMgKCkge1xuICAgIHJldHVybiB7IC4uLl9yZWZzIH1cbiAgfVxuICBmdW5jdGlvbiB0YWJsZSAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKF9yZWZzKS5zb3J0KClcbiAgICAgIC5tYXAoa2V5ID0+IFtrZXksIF9yZWZzW2tleV1dKVxuICAgICAgLm1hcCgoW3JlZiwgY291bnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgW2tpbmRdOiByZWYsXG4gICAgICAgICAgcmVmczogY291bnQgfHwgJ05vbmUnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gdG9WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBgU3RhdGVib3RbJHtuYW1lfV06ICR7ZGVzY3JpcHRpb259OmAsXG4gICAgICB0YWJsZTogdGFibGUoKVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGluY3JlYXNlOiBpbmNyZWFzZSxcbiAgICBkZWNyZWFzZTogZGVjcmVhc2UsXG4gICAgY291bnRPZjogY291bnRPZixcbiAgICB0b1ZhbHVlOiB0b1ZhbHVlLFxuICAgIHJlZnM6IHJlZnNcbiAgfVxufVxuXG5mdW5jdGlvbiBBcmdUeXBlRXJyb3IgKGVyclByZWZpeCA9ICcnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm5OYW1lLCB0eXBlTWFwLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgYXJnTWFwID0gT2JqZWN0LmVudHJpZXModHlwZU1hcClcbiAgICAgIC5tYXAoKFthcmdOYW1lLCBhcmdUeXBlXSkgPT4ge1xuICAgICAgICByZXR1cm4geyBhcmdOYW1lLCBhcmdUeXBlIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBzaWduYXR1cmUgPSBPYmplY3Qua2V5cyh0eXBlTWFwKS5qb2luKCcsICcpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdzXG4gICAgICAubWFwKChhcmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYXJnTmFtZSwgYXJnVHlwZSB9ID0gYXJnTWFwW2luZGV4XVxuICAgICAgICBpZiAoYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gYEFyZ3VtZW50IHVuZGVmaW5lZDogXCIke2FyZ05hbWV9XCJgXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXJyb3JEZXNjXG4gICAgICAgIGxldCB0eXBlTmFtZVxuICAgICAgICBsZXQgdHlwZU1hdGNoZXNcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihhcmdUeXBlKSkge1xuICAgICAgICAgIHR5cGVNYXRjaGVzID0gYXJnVHlwZShhcmcpID09PSB0cnVlXG4gICAgICAgICAgdHlwZU5hbWUgPSBhcmdUeXBlLm5hbWVcbiAgICAgICAgICBlcnJvckRlc2MgPSBgJHt0eXBlTmFtZX0oJHthcmdOYW1lfSkgZGlkIG5vdCByZXR1cm4gdHJ1ZWBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdmFsaWQtdHlwZW9mXG4gICAgICAgICAgdHlwZU1hdGNoZXMgPSB0eXBlb2YgYXJnID09PSBhcmdUeXBlXG4gICAgICAgICAgdHlwZU5hbWUgPSBhcmdUeXBlXG4gICAgICAgICAgZXJyb3JEZXNjID0gYEFyZ3VtZW50IFwiJHthcmdOYW1lfVwiIHNob3VsZCBiZSBhICR7dHlwZU5hbWV9YFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0eXBlTWF0Y2hlcykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBgJHtlcnJvckRlc2N9OiAke2FyZ05hbWV9ID09PSAke3R5cGVvZiBhcmd9KCR7YXJnfSlgXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuXG4gICAgaWYgKCFlcnIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBcXG4ke2VyclByZWZpeH0ke2ZuTmFtZX0oJHtzaWduYXR1cmV9KTpcXG5gICtcbiAgICAgICAgYCR7ZXJyLm1hcChlcnIgPT4gYD4gJHtlcnJ9YCkuam9pbignXFxuJyl9YFxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBMb2dnZXIgKGxldmVsKSB7XG4gIGxldCBfbGV2ZWwgPSBsZXZlbFxuICBpZiAoaXNTdHJpbmcoX2xldmVsKSkge1xuICAgIF9sZXZlbCA9ICh7XG4gICAgICBpbmZvOiAzLFxuICAgICAgbG9nOiAyLFxuICAgICAgd2FybjogMSxcbiAgICAgIG5vbmU6IDBcbiAgICB9KVtfbGV2ZWxdIHx8IDNcbiAgfVxuICBmdW5jdGlvbiBjYW5XYXJuICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDFcbiAgfVxuICBmdW5jdGlvbiBjYW5Mb2cgKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMlxuICB9XG4gIGZ1bmN0aW9uIGNhbkluZm8gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gM1xuICB9XG4gIHJldHVybiB7XG4gICAgY2FuV2FybixcbiAgICBjYW5Mb2csXG4gICAgY2FuSW5mbyxcblxuICAgIGluZm86ICguLi5hcmdzKSA9PiBjYW5JbmZvKCkgJiYgY29uc29sZS5pbmZvKC4uLmFyZ3MpLFxuICAgIHRhYmxlOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS50YWJsZSguLi5hcmdzKSxcbiAgICBsb2c6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4gY2FuV2FybigpICYmIGNvbnNvbGUud2FybiguLi5hcmdzKSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IGNvbnNvbGUuZXJyb3IoLi4uYXJncylcbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQ0hBUlQvUk9VVEUgUEFSU0lOR1xuLy9cblxuY29uc3QgcnhDUkxGID0gL1tcXHJcXG5dL1xuY29uc3QgY3hQaXBlID0gJ3wnXG5jb25zdCBjeEFycm93ID0gJy0+J1xuY29uc3QgcnhPcGVyYXRvcnMgPSBbY3hQaXBlLCBjeEFycm93XVxuICAubWFwKHJ4VW5zYWZlID0+IHJ4VW5zYWZlLnJlcGxhY2UoJ3wnLCAnXFxcXHwnKSlcbiAgLmpvaW4oJ3wnKVxuXG5jb25zdCByeExpbmVDb250aW51YXRpb25zID0gbmV3IFJlZ0V4cChgKCR7cnhPcGVyYXRvcnN9KSRgKVxuY29uc3QgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyA9IC9bXmEtejAtOSFAIyQlXiYqOl8rPTw+fH4uXFx4MkRdL2dpXG5jb25zdCByeENvbW1lbnQgPSAvKFxcL1xcL1teXFxuXFxyXSopL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3hQaXBlLFxuICBjeEFycm93LFxuICByeERpc2FsbG93ZWRDaGFyYWN0ZXJzLFxuICBkZWNvbXBvc2VDaGFydCxcbiAgZGVjb21wb3NlUm91dGVcbn1cblxuY29uc3QgeyB1bmlxLCBBcmdUeXBlRXJyb3IsIGlzVGVtcGxhdGVMaXRlcmFsIH0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VSb3V0ZSAodGVtcGxhdGVMaXRlcmFsKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZGVjb21wb3NlUm91dGUnLFxuICAgIHsgdGVtcGxhdGVMaXRlcmFsOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIHRlbXBsYXRlTGl0ZXJhbFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZWRMaW5lcyh0ZW1wbGF0ZUxpdGVyYWwpXG4gIGNvbnN0IGZsYXR0ZW5lZFJvdXRlID0gdG9rZW5pc2VkTGluZXMobGluZXMpLmZsYXQoMilcbiAgcmV0dXJuIGZsYXR0ZW5lZFJvdXRlXG59XG5cbi8qKlxuICogRGVjb21wb3NlIGEge0BsaW5rIHN0YXRlYm90Q2hhcnR9IGludG8gYW4gb2JqZWN0IG9mIGBzdGF0ZXNgLCBgcm91dGVzYCxcbiAqIGFuZCBgdHJhbnNpdGlvbnNgLlxuICpcbiAqIFN0YXRlYm90KCkgdXNlcyB0aGlzIGludGVybmFsbHkgdG8gcGFyc2UgY2hhcnRzLiBFeHBvc2VkIGZvciBkZWJ1Z2dpbmcuXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnRgXG4gKiAgIHBlbmRpbmcgLT5cbiAqICAgICBzdWNjZXNzIHwgZmFpbHVyZVxuICogYFxuICogLy8gc3RhdGVzID0gWydwZW5kaW5nJywgJ3N1Y2Nlc3MnLCAnZmFpbHVyZSddXG4gKiAvLyByb3V0ZXMgPSBbICdwZW5kaW5nLT5zdWNjZXNzJywgJ3BlbmRpbmctPmZhaWx1cmUnXVxuICogLy8gdHJhbnNpdGlvbnMgPSBbXG4gKiAvLyAgIFsncGVuZGluZycsICdzdWNjZXNzJ10sXG4gKiAvLyAgIFsncGVuZGluZycsICdmYWlsdXJlJ11cbiAqIC8vIF1cbiAqL1xuXG5mdW5jdGlvbiBkZWNvbXBvc2VDaGFydCAoY2hhcnQpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VDaGFydCcsXG4gICAgeyBjaGFydDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBjaGFydFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZWRMaW5lcyhjaGFydClcbiAgY29uc3QgbGluZXNPZlRva2VucyA9IHRva2VuaXNlZExpbmVzKGxpbmVzKVxuICBjb25zdCBsaW5lc09mUm91dGVzID0gbGluZXNPZlRva2Vuc1xuICAgIC5tYXAoZGVjb21wb3NlUm91dGVGcm9tVG9rZW5zKVxuICAgIC5mbGF0KDEpXG5cbiAgY29uc3QgbGluZXNPZlRyYW5zaXRpb25zID0gbGluZXNPZlJvdXRlc1xuICAgIC5tYXAoZGVjb21wb3NlVHJhbnNpdGlvbnNGcm9tUm91dGUpXG4gICAgLmZsYXQoMSlcblxuICBjb25zdCBzdGF0ZXMgPSBbXVxuICBjb25zdCByb3V0ZUtleXMgPSBsaW5lc09mVHJhbnNpdGlvbnMubWFwKHJvdXRlID0+IHtcbiAgICBzdGF0ZXMucHVzaCguLi5yb3V0ZSlcbiAgICByZXR1cm4gcm91dGUuam9pbihjeEFycm93KVxuICB9KVxuXG4gIGNvbnN0IGZpbHRlcmVkUm91dGVzID0gdW5pcShyb3V0ZUtleXMpXG4gIGNvbnN0IGZpbHRlcmVkU3RhdGVzID0gdW5pcShzdGF0ZXMpXG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvbnM6IGZpbHRlcmVkUm91dGVzLm1hcChyb3V0ZSA9PiByb3V0ZS5zcGxpdChjeEFycm93KSksXG4gICAgcm91dGVzOiBmaWx0ZXJlZFJvdXRlcyxcbiAgICBzdGF0ZXM6IGZpbHRlcmVkU3RhdGVzXG4gIH1cbn1cblxuZnVuY3Rpb24gbGluZXNGcm9tIChzdHJPckFycikge1xuICByZXR1cm4gW3N0ck9yQXJyXVxuICAgIC5mbGF0KClcbiAgICAucmVkdWNlKChhY2MsIGxpbmUpID0+IFsuLi5hY2MsIGxpbmUuc3BsaXQocnhDUkxGKV0sIFtdKVxuICAgIC5mbGF0KClcbn1cblxuZnVuY3Rpb24gY29uZGVuc2VkTGluZXMgKHN0ck9yQXJyKSB7XG4gIGNvbnN0IGlucHV0ID0gbGluZXNGcm9tKHN0ck9yQXJyKVxuICBjb25zdCBvdXRwdXQgPSBbXVxuXG4gIGlucHV0LnJlZHVjZSgoY29uZGVuc2VkTGluZSwgbGluZSkgPT4ge1xuICAgIGNvbnN0IHNhbml0aXNlZExpbmUgPSBsaW5lXG4gICAgICAucmVwbGFjZShyeENvbW1lbnQsICcnKVxuICAgICAgLnJlcGxhY2UocnhEaXNhbGxvd2VkQ2hhcmFjdGVycywgJycpXG5cbiAgICBpZiAoIXNhbml0aXNlZExpbmUpIHtcbiAgICAgIHJldHVybiBjb25kZW5zZWRMaW5lXG4gICAgfVxuXG4gICAgaWYgKHJ4TGluZUNvbnRpbnVhdGlvbnMudGVzdChzYW5pdGlzZWRMaW5lKSkge1xuICAgICAgcmV0dXJuIGNvbmRlbnNlZExpbmUgKyBzYW5pdGlzZWRMaW5lXG4gICAgfVxuXG4gICAgb3V0cHV0LnB1c2goY29uZGVuc2VkTGluZSArIHNhbml0aXNlZExpbmUpXG4gICAgcmV0dXJuICcnXG4gIH0sICcnKVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuZnVuY3Rpb24gdG9rZW5pc2VkTGluZXMgKGxpbmVzKSB7XG4gIHJldHVybiBsaW5lcy5tYXAobGluZSA9PiBsaW5lLnNwbGl0KGN4QXJyb3cpLm1hcChzdHIgPT4gc3RyLnNwbGl0KGN4UGlwZSkpKVxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VSb3V0ZUZyb21Ub2tlbnMgKGxpbmUpIHtcbiAgY29uc3Qgb3V0cHV0ID0gW11cblxuICBsaW5lLnJlZHVjZSgocHJldmlvdXNTdGF0ZXMsIHN0YXRlcykgPT4ge1xuICAgIGlmIChwcmV2aW91c1N0YXRlcyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBbLi4uc3RhdGVzXVxuICAgIH1cblxuICAgIG91dHB1dC5wdXNoKFtwcmV2aW91c1N0YXRlcywgWy4uLnN0YXRlc11dKVxuICAgIHJldHVybiBbLi4uc3RhdGVzXVxuICB9LCBmYWxzZSlcblxuICByZXR1cm4gb3V0cHV0XG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZVRyYW5zaXRpb25zRnJvbVJvdXRlIChbZnJvbVN0YXRlcywgdG9TdGF0ZXNdKSB7XG4gIHJldHVybiBmcm9tU3RhdGVzLnJlZHVjZSgoYWNjLCBmcm9tU3RhdGUpID0+IFtcbiAgICAuLi5hY2MsXG4gICAgLi4udG9TdGF0ZXMubWFwKHRvU3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIFtmcm9tU3RhdGUsIHRvU3RhdGVdXG4gICAgfSlcbiAgXSwgW10pXG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBGU01cbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTdGF0ZWJvdCxcbiAgaXNTdGF0ZWJvdFxufVxuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgU3RhdGVib3QuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gc3RhdGVib3RPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0YXRlYm90Q2hhcnR9IGNoYXJ0XG4gKiAgVGhlIHN0YXRlLWNoYXJ0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzdGFydEluPWF1dG9dXG4gKiAgVGhlIHN0YXRlIGluIHdoaWNoIHRvIHN0YXJ0LiBJZiB1bnNwZWNpZmllZCwgdGhlIGZpcnN0IHN0YXRlIGluIHRoZVxuICogIGNoYXJ0IHdpbGwgYmUgdXNlZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbG9nTGV2ZWw9M11cbiAqICBIb3cgbm9pc3kgdGhlIGxvZ2dpbmcgaXMsIGZyb20gMSB0byAzOlxuICogIGBgYFxuICogIDEpIGNvbnNvbGUud2FyblxuICogIDIpIGNvbnNvbGUud2Fybi9sb2cvdGFibGVcbiAqICAzKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlL2luZm9cbiAqICBgYGBcbiAqICBgM2AgaXMgdGhlIGRlZmF1bHQuIEFyZ3VtZW50IHR5cGUtZXJyb3JzIHdpbGwgYWx3YXlzIGB0aHJvd2AuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2hpc3RvcnlMaW1pdD0yXVxuICogIExpbWl0IGhvdyBtdWNoIGhpc3RvcnkgdGhlIHN0YXRlLW1hY2hpbmUga2VlcHMuIEFjY2Vzc2VkIHZpYVxuICogIHtAbGluayAjc3RhdGVib3Rmc21oaXN0b3J5fHN0YXRlYm90RnNtI2hpc3RvcnkoKX0uXG4gKiBAcHJvcGVydHkge2V2ZW50c30gW2V2ZW50c11cbiAqICBJZiB5b3Ugd2lzaCB0byBoYXZlIHlvdXIgU3RhdGVib3RzIGxpc3RlbiB0byBldmVudHMgY29taW5nIGZyb21cbiAqICBhIHNoYXJlZCBFdmVudEVtaXR0ZXIsIHlvdSBjYW4gcGFzcyBpdCBpbiBoZXJlLiBUaGUgYGVtaXQoKWAvYG9uRXZlbnQoKWAvXG4gKiAgYHBlcmZvcm1UcmFuc2l0aW9ucygpYCBtZXRob2RzIHdpbGwgdXNlIGl0LlxuICpcbiAqICBJdCBzaG91bGQgaGF2ZSB0aGUgc2FtZSBzaWduYXR1cmUgYXMge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2NsYXNzX2V2ZW50ZW1pdHRlcnxFdmVudEVtaXR0ZXJ9LlxuICovXG5cbi8qKlxuICogQSBkZXNjcmlwdGlvbiBvZiBhbGwgdGhlIHN0YXRlcyBpbiBhIG1hY2hpbmUsIHBsdXMgYWxsIG9mIHRoZVxuICogcGVybWl0dGVkIHRyYW5zaXRpb25zIGJldHdlZW4gdGhlbS5cbiAqXG4gKiBUaGlzIGlzIGRlZmluZWQgdXNpbmcgYSBgc3RyaW5nYCBvciBhbiBgYXJyYXlgIG9mIHN0cmluZ3MsIGJ1dFxuICogIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFsc3xUZW1wbGF0ZSBMaXRlcmFsc31cbiAqIGFyZSBtdWNoIG1vcmUgY29udmVuaWVudC5cbiAqXG4gKiBBbiBhcnJvdyBgLT5gIGNvbmZpZ3VyZXMgYSAqKnBlcm1pdHRlZCB0cmFuc2l0aW9uKiogYmV0d2VlbiB0d28gc3RhdGVzOlxuICpcbiAqIGBgYFxuICogZnJvbS1zdGF0ZSAtPiB0by1zdGF0ZVxuICogYGBgXG4gKlxuICogSXQncyB0aGUgb25seSBvcGVyYXRvciBuZWVkZWQgdG8gYnVpbGQgYW55IGNoYXJ0OlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZFxuICogICBwZW5kaW5nIC0+IHJlamVjdGVkXG4gKiAgIHJlc29sdmVkIC0+IGRvbmVcbiAqICAgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogVGhlIFwiT1JcIiBvcGVyYXRvciBgfGAgY2FuIGhlbHAgdXMgcmVtb3ZlIHNvbWUgcmVkdW5kYW5jeSBmcm9tIHRoZSBhYm92ZSBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZCB8IHJlamVjdGVkXG4gKiAgIHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogSW4gYm90aCBjaGFydHMsIGBwZW5kaW5nYCBjYW4gdHJhbnNpdGlvbiB0byBgcmVzb2x2ZWRgIG9yIGByZWplY3RlZGAsIGFuZFxuICogYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgIGNhbiBib3RoIHRyYW5zaXRpb24gdG8gYGRvbmVgLlxuICpcbiAqIFdlIGNhbiBzdHJlYW1saW5lIHRoaXMgZXZlbiBmdXJ0aGVyOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQWdhaW4sIHRoaXMgaXMgZXhhY3RseSBlcXVpdmFsZW50IHRvIHRoZSBwcmV2aW91cyB0d28gZXhhbXBsZXMuXG4gKlxuICogTm90aWNlIGluIHRoaXMgb25lIHRoYXQgd2UgaGF2ZSBwYXJlbnRoZXNlcyBgKGAgYClgIHN1cnJvdW5kaW5nIGByZXNvbHZlZGBcbiAqIGFuZCBgcmVqZWN0ZWRgLiBUaGV5IGFyZSBhY3R1YWxseSBjb21wbGV0ZWx5IGlnbm9yZWQgYnkgdGhlIHBhcnNlciwgYW5kXG4gKiB5b3UgY2FuIHVzZSB0aGVtIGFzIHlvdSBwbGVhc2UgdG8gaGVscCBtYWtlIHlvdXIgY2hhcnRzIG1vcmUgcmVhZGFibGUuXG4gKlxuICogQSBjaGFydCB3b3JrcyBleGFjdGx5IHRoZSBzYW1lIHdpdGhvdXQgdGhlbTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBDaGFydHMgY2FuIGFsc28gYmUgc3BsaXQgYWNyb3NzIG11bHRpcGxlLWxpbmVzOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPlxuICogICByZXNvbHZlZCB8XG4gKiAgIHJlamVjdGVkIC0+XG4gKiAgIGRvbmVcbiAqIGBcbiAqIGBgYFxuICogTm90aWNlIHRoYXQgYWxsIHdoaXRlLXNwYWNlIGlzIGlnbm9yZWQgb24gZWl0aGVyIHNpZGUgb2YgdGhlIGAtPmBcbiAqIGFuZCBgfGAuXG4gKlxuICogYC8vIENvbW1lbnRzIG9mIHRoaXMga2luZCBhcmUgYWxsb3dlZCwgdG9vOmBcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gLy8gV2hlcmUgZG8gd2UgZ28gZnJvbSBoZXJlP1xuICogICAgIChyZXNvbHZlZCB8IHJlamVjdGVkKSAtPiAvLyBBaCwgeWVzXG4gKlxuICogICAvLyBBbmQgbm93IHdlJ3JlIGFsbCBmaW5pc2hlZFxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBGaW5hbGx5LCBoZXJlJ3MgYSBtb3JlIGZ1bGwgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIGRyYWdEcm9wQ2hhcnQgPSBgXG4gKiAgIGlkbGUgLT5cbiAqICAgICBkcmFnLWRldGVjdCAtPlxuICogICAgICAgKGRyYWdnaW5nIHwgY2xpY2tlZClcbiAqXG4gKiAgIC8vIEp1c3QgYSBjbGljaywgYmFpbC1vdXQhXG4gKiAgIGNsaWNrZWQgLT4gaWRsZVxuICpcbiAqICAgLy8gRHJhZyBkZXRlY3RlZCFcbiAqICAgZHJhZ2dpbmcgLT5cbiAqICAgICBkcmFnLXdhaXQgLT4gZHJhZ2dlZCAtPiBkcmFnLXdhaXRcbiAqXG4gKiAgIC8vIERyYWcgZmluaXNoZWQuLi5cbiAqICAgKGRyYWctd2FpdCB8IGRyYWdnZWQpIC0+XG4gKiAgICAgKGRyYWctZG9uZSB8IGRyYWctY2FuY2VsKSAtPlxuICogICAgICAgaWRsZVxuICogYFxuICogYGBgXG4gKlxuICogQHR5cGVkZWYge3N0cmluZ3xzdHJpbmdbXX0gc3RhdGVib3RDaGFydFxuICovXG5cbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2V2ZW50c1xuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY29uc3Qge1xuICBpc0FycmF5LFxuICBpc0V2ZW50RW1pdHRlcixcbiAgaXNGdW5jdGlvbixcbiAgaXNQb2pvLFxuICBpc1N0cmluZyxcbiAgQXJnVHlwZUVycm9yLFxuICBMb2dnZXIsXG4gIFJlZmVyZW5jZUNvdW50ZXJcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgeyBkZWNvbXBvc2VDaGFydCwgY3hBcnJvdyB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcblxuLyoqXG4gKiBDcmVhdGUgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfSBgb2JqZWN0YC5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xlbW1pbmcnLCB7XG4gKiAgIGNoYXJ0OiBgXG4gKiAgICAgd2Fsa2luZyAtPiAoZGlnZ2luZyB8IGJ1aWxkaW5nIHwgZmFsbGluZykgLT5cbiAqICAgICAgIHdhbGtpbmdcbiAqXG4gKiAgICAgZmFsbGluZyAtPiBzcGxhdHRpbmdcbiAqICAgICB3YWxraW5nIC0+IGV4aXRpbmdcbiAqICAgYFxuICogfSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogIEdpdmUgeW91ciBTdGF0ZWJvdCBhIG5hbWUuIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGJ5IHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAqIEBwYXJhbSB7c3RhdGVib3RPcHRpb25zfSBvcHRpb25zXG4gKi9cblxuZnVuY3Rpb24gU3RhdGVib3QgKG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc1N0cmluZyhuYW1lKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignXFxuU3RhdGVib3Q6IFBsZWFzZSBzcGVjaWZ5IGEgbmFtZSBmb3IgdGhpcyBtYWNoaW5lJylcbiAgfVxuXG4gIGNvbnN0IGxvZ1ByZWZpeCA9IGBTdGF0ZWJvdFske25hbWV9XWBcbiAgaWYgKCFpc1Bvam8ob3B0aW9ucykpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoYFxcbiR7bG9nUHJlZml4fTogUGxlYXNlIHNwZWNpZnkgb3B0aW9ucyBmb3IgdGhpcyBtYWNoaW5lYClcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBjaGFydCA9IHVuZGVmaW5lZCxcbiAgICBsb2dMZXZlbCA9IDMsXG4gICAgaGlzdG9yeUxpbWl0ID0gMlxuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcihgJHtsb2dQcmVmaXh9I2ApXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG4gIGNvbnN0IHsgY2FuV2FybiB9ID0gY29uc29sZVxuXG4gIGNvbnN0IHtcbiAgICBzdGF0ZXMgPSBbXSxcbiAgICByb3V0ZXMgPSBbXVxuICB9ID0gY2hhcnQgPyBkZWNvbXBvc2VDaGFydChjaGFydCkgOiBvcHRpb25zXG5cbiAgY29uc3QgeyBzdGFydEluID0gc3RhdGVzWzBdIH0gPSBvcHRpb25zXG4gIGlmICghc3RhdGVzLmluY2x1ZGVzKHN0YXJ0SW4pKSB7XG4gICAgdGhyb3cgRXJyb3IoYCR7bG9nUHJlZml4fTogU3RhcnRpbmctc3RhdGUgbm90IGluIGNoYXJ0OiBcIiR7c3RhcnRJbn1cImApXG4gIH1cblxuICBsZXQgdHJhbnNpdGlvbklkID0gMFxuICBjb25zdCBzdGF0ZUhpc3RvcnkgPSBbc3RhcnRJbl1cbiAgY29uc3Qgc3RhdGVIaXN0b3J5TGltaXQgPSBNYXRoLm1heChoaXN0b3J5TGltaXQsIDIpXG4gIGNvbnN0IGV2ZW50cyA9IGlzRXZlbnRFbWl0dGVyKG9wdGlvbnMuZXZlbnRzKSA/IG9wdGlvbnMuZXZlbnRzIDogbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3QgaW50ZXJuYWxFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgY29uc3QgSU5URVJOQUxfRVZFTlRTID0ge1xuICAgIG9uU3dpdGNoaW5nOiAnKEFOWSlzdGF0ZTpjaGFuZ2luZycsXG4gICAgb25Td2l0Y2hlZDogJyhBTlkpc3RhdGU6Y2hhbmdlZCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXRJbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxFdmVudHMuZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBvbkludGVybmFsRXZlbnQgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpbnRlcm5hbEV2ZW50cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpbnRlcm5hbEV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0YXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3N0YXRlcycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBzdGF0ZS1jaGFuZ2VzJyxcbiAgICBbLi4uc3RhdGVzXVxuICApXG4gIGNvbnN0IHJvdXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3RyYW5zaXRpb25zJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHRyYW5zaXRpb25zJyxcbiAgICBbLi4ucm91dGVzXVxuICApXG4gIGNvbnN0IGV2ZW50c0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ2V2ZW50cycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHMnXG4gIClcblxuICAvLyBJbnRlcnByZXRzIG9uVHJhbnNpdGlvbnMoKSBhbmQgcGVyZm9ybVRyYW5zaXRpb25zKClcbiAgZnVuY3Rpb24gYXBwbHlIaXRjaGVyIChoaXRjaGVyLCBmbk5hbWUpIHtcbiAgICBjb25zdCBoaXRjaGVyQWN0aW9ucyA9XG4gICAgICBpc0Z1bmN0aW9uKGhpdGNoZXIpXG4gICAgICAgID8gaGl0Y2hlcih7IGVudGVyLCBlbWl0LCBFbnRlciwgRW1pdCB9KVxuICAgICAgICA6IGlzUG9qbyhoaXRjaGVyKVxuICAgICAgICAgID8gaGl0Y2hlclxuICAgICAgICAgIDogbnVsbFxuXG4gICAgaWYgKCFpc1Bvam8oaGl0Y2hlckFjdGlvbnMpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogRXhwZWN0ZWQgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3RgXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnRzID0ge31cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IFtdXG5cbiAgICBPYmplY3QuZW50cmllcyhoaXRjaGVyQWN0aW9ucylcbiAgICAgIC5mb3JFYWNoKChbcm91dGVDaGFydCwgYWN0aW9uT3JDb25maWddKSA9PiB7XG4gICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMS8zLi4uXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGFjdGlvbk9yQ29uZmlnKSkge1xuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoIWlzUG9qbyhhY3Rpb25PckNvbmZpZykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgY29uc3QgeyBvbjogX29uLCB0aGVuOiBfdGhlbiB9ID0gYWN0aW9uT3JDb25maWdcbiAgICAgICAgaWYgKGlzU3RyaW5nKF9vbikgfHwgaXNBcnJheShfb24pKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnROYW1lcyA9IFtfb25dLmZsYXQoKVxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXVxuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogX3RoZW4gfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oX3RoZW4pKSB7XG4gICAgICAgICAgLy8gb25UcmFuc2l0aW9ucyAyLzMuLi5cbiAgICAgICAgICAvLyAoQmVoYXZlIGxpa2Ugb25UcmFuc2l0aW9ucyBpZiBhIGNvbmZpZyBpcyBzcGVjaWZpZWQsIGJ1dFxuICAgICAgICAgIC8vICB0aGVyZSBpcyBubyBcIm9uXCIgZXZlbnQuLi4pXG4gICAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogYWN0aW9uT3JDb25maWcgfSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIGNvbnN0IGFsbFN0YXRlcyA9IFtdXG4gICAgY29uc3QgYWxsUm91dGVzID0gW11cblxuICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAyLzMuLi5cbiAgICBjb25zdCBkZWNvbXBvc2VkRXZlbnRzID0gT2JqZWN0LmVudHJpZXMoZXZlbnRzKVxuICAgICAgLnJlZHVjZSgoYWNjLCBbZXZlbnROYW1lLCBfY29uZmlnc10pID0+IHtcbiAgICAgICAgY29uc3QgeyBzdGF0ZXMsIHJvdXRlcywgY29uZmlncyB9ID0gZGVjb21wb3NlQ29uZmlncyhfY29uZmlncywgY2FuV2FybilcbiAgICAgICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgICAgICBhbGxSb3V0ZXMucHVzaCguLi5yb3V0ZXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgW2V2ZW50TmFtZV06IGNvbmZpZ3NcbiAgICAgICAgfVxuICAgICAgfSwge30pXG5cbiAgICBjb25zdCBhbGxDbGVhbnVwRm5zID0gW11cblxuICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBhbGxDbGVhbnVwRm5zLnB1c2goXG4gICAgICAuLi5PYmplY3QuZW50cmllcyhkZWNvbXBvc2VkRXZlbnRzKVxuICAgICAgICAubWFwKChbZXZlbnROYW1lLCBjb25maWdzXSkgPT5cbiAgICAgICAgICBbXG4gICAgICAgICAgICBldmVudHNIYW5kbGVkLmluY3JlYXNlKGV2ZW50TmFtZSksXG4gICAgICAgICAgICBvbkV2ZW50KGV2ZW50TmFtZSwgKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZXZlbnRXYXNIYW5kbGVkID0gY29uZmlncy5zb21lKFxuICAgICAgICAgICAgICAgICh7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NlZCA9IGluU3RhdGUoZnJvbVN0YXRlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGVyKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiAhIXBhc3NlZFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgaWYgKCFldmVudFdhc0hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTm9PcChgRXZlbnQgbm90IGhhbmRsZWQ6IFwiJHtldmVudE5hbWV9XCJgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgKS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBvblRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGNvbnN0IHRyYW5zaXRpb25Db25maWdzID0gZGVjb21wb3NlQ29uZmlncyh0cmFuc2l0aW9ucywgY2FuV2FybilcblxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnN0YXRlcylcbiAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnJvdXRlcylcbiAgICB9XG5cbiAgICBhbGxDbGVhbnVwRm5zLnB1c2goXG4gICAgICAuLi50cmFuc2l0aW9uQ29uZmlncy5jb25maWdzLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgY29uc3QgeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9ID0gdHJhbnNpdGlvblxuICAgICAgICBjb25zdCByb3V0ZSA9IGAke2Zyb21TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgcm91dGVzSGFuZGxlZC5pbmNyZWFzZShyb3V0ZSksXG4gICAgICAgICAgb25JbnRlcm5hbEV2ZW50KHJvdXRlLCBhY3Rpb24pXG4gICAgICAgIF1cbiAgICAgIH0pLmZsYXQoKVxuICAgIClcblxuICAgIC8vIERlYnVnZ2luZywgaWYgd2UncmUgYXQgdGhlIHJpZ2h0IGxldmVsXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgY29uc3QgaW52YWxpZFN0YXRlcyA9IGFsbFN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gIXN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gICAgICBjb25zdCBpbnZhbGlkUm91dGVzID0gYWxsUm91dGVzLmZpbHRlcihyb3V0ZSA9PiAhcm91dGVzLmluY2x1ZGVzKHJvdXRlKSlcbiAgICAgIGlmIChpbnZhbGlkU3RhdGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBJbnZhbGlkIHN0YXRlcyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFN0YXRlcy5tYXAoc3RhdGUgPT4gYCAgPiBcIiR7c3RhdGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBpZiAoaW52YWxpZFJvdXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCB0cmFuc2l0aW9ucyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFJvdXRlcy5tYXAocm91dGUgPT4gYCAgPiBcIiR7cm91dGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGFsbENsZWFudXBGbnMuZm9yRWFjaChmbiA9PiBmbigpKVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlvdXNTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMl1cbiAgfVxuXG4gIGZ1bmN0aW9uIGN1cnJlbnRTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMV1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblRyYW5zaXRpb25UbyAoLi4uc3RhdGVzKSB7XG4gICAgY29uc3QgdGVzdFN0YXRlcyA9IHN0YXRlcy5mbGF0KClcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2NhblRyYW5zaXRpb25UbycsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHRlc3RTdGF0ZXNbMF0pXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBpZiAoIXRlc3RTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIHJldHVybiB0ZXN0U3RhdGVzLmV2ZXJ5KHN0YXRlID0+IG5leHRTdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUgKHN0YXRlKSB7XG4gICAgY29uc3QgX3N0YXRlID0gc3RhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgPyBzdGF0ZVxuICAgICAgOiBjdXJyZW50U3RhdGUoKVxuXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZScsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIF9zdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiByb3V0ZXMucmVkdWNlKChhY2MsIHJvdXRlKSA9PiB7XG4gICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHJvdXRlLnNwbGl0KGN4QXJyb3cpXG4gICAgICAgIC5tYXAoc3RhdGUgPT4gc3RhdGUudHJpbSgpKVxuXG4gICAgICBpZiAoZnJvbVN0YXRlID09PSBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5hY2MsIHRvU3RhdGVdXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBpblN0YXRlIChzdGF0ZSwgYW55T3JGbiwgLi4uZm5BcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdpblN0YXRlJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBjb25kaXRpb25NYXRjaGVzID0gY3VycmVudFN0YXRlKCkgPT09IHN0YXRlXG5cbiAgICBpZiAoYW55T3JGbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWNvbmRpdGlvbk1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGFueU9yRm4pKSB7XG4gICAgICAgIHJldHVybiBhbnlPckZuKC4uLmZuQXJncylcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbnlPckZuXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmRpdGlvbk1hdGNoZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW1pdCcsIHsgZXZlbnROYW1lOiBpc1N0cmluZyB9LCBldmVudE5hbWUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gZW50ZXIgKHN0YXRlLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbnRlcicsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgdG9TdGF0ZSA9IHN0YXRlXG5cbiAgICBpZiAodG9TdGF0ZSA9PT0gaW5TdGF0ZSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEFscmVhZHkgaW4gc3RhdGU6IFwiJHt0b1N0YXRlfVwiYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICghc3RhdGVzLmluY2x1ZGVzKHRvU3RhdGUpKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgSW52YWxpZCBzdGF0ZSBcIiR7dG9TdGF0ZX1cIiwgbm90IHN3aXRjaGluZ2ApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0Um91dGUgPSBgJHtpblN0YXRlfS0+JHt0b1N0YXRlfWBcbiAgICBpZiAoIXJvdXRlcy5pbmNsdWRlcyhuZXh0Um91dGUpKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgSW52YWxpZCB0cmFuc2l0aW9uIFwiJHtuZXh0Um91dGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gRmVsbC10aHJvdWdoLCBjYW4gZW50ZXIgbmV4dCBzdGF0ZVxuICAgIGNvbnNvbGUuaW5mbyhgJHtsb2dQcmVmaXh9OiB0SWQ8JHsrK3RyYW5zaXRpb25JZH0+OiAke25leHRSb3V0ZX1gKVxuXG4gICAgc3RhdGVIaXN0b3J5LnB1c2godG9TdGF0ZSlcbiAgICBpZiAoc3RhdGVIaXN0b3J5Lmxlbmd0aCA+IHN0YXRlSGlzdG9yeUxpbWl0KSB7XG4gICAgICBzdGF0ZUhpc3Rvcnkuc2hpZnQoKVxuICAgIH1cblxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5vblN3aXRjaGluZywgdG9TdGF0ZSwgaW5TdGF0ZSwgLi4uYXJncylcbiAgICBlbWl0SW50ZXJuYWxFdmVudChuZXh0Um91dGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQoSU5URVJOQUxfRVZFTlRTLm9uU3dpdGNoZWQsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gb25FdmVudCAoZXZlbnROYW1lLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FdmVudCcsIHsgZXZlbnROYW1lOiBpc1N0cmluZywgY2I6IGlzRnVuY3Rpb24gfSwgZXZlbnROYW1lLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGV2ZW50cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGNiKVxuICAgIHJldHVybiAoKSA9PiBldmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgfVxuXG4gIGNvbnN0IHN3aXRjaE1ldGhvZHMgPSBPYmplY3Qua2V5cyhJTlRFUk5BTF9FVkVOVFMpXG4gICAgLnJlZHVjZSgob2JqLCBtZXRob2ROYW1lKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFttZXRob2ROYW1lXTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKG1ldGhvZE5hbWUsIHsgY2I6IGlzRnVuY3Rpb24gfSwgY2IpXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50ID0gc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShJTlRFUk5BTF9FVkVOVFNbbWV0aG9kTmFtZV0pXG4gICAgICAgICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvbkludGVybmFsRXZlbnQoXG4gICAgICAgICAgICBJTlRFUk5BTF9FVkVOVFNbbWV0aG9kTmFtZV0sXG4gICAgICAgICAgICAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIGNiKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgICAgICAgIGRlY3JlYXNlUmVmQ291bnQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHt9KVxuXG4gIGNvbnN0IGVudGVyRXhpdE1ldGhvZHMgPSBbXG4gICAgWydFeGl0aW5nJywgJ29uU3dpdGNoaW5nJ10sXG4gICAgWydFbnRlcmluZycsICdvblN3aXRjaGluZyddLFxuICAgIFsnRXhpdGVkJywgJ29uU3dpdGNoZWQnXSxcbiAgICBbJ0VudGVyZWQnLCAnb25Td2l0Y2hlZCddXG4gIF1cbiAgICAucmVkdWNlKChvYmosIG5hbWVzKSA9PiB7XG4gICAgICBjb25zdCBbbmFtZSwgc3dpdGNoTWV0aG9kXSA9IG5hbWVzXG4gICAgICBjb25zdCBtZXRob2ROYW1lID0gYG9uJHtuYW1lfWBcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbbWV0aG9kTmFtZV06IGZ1bmN0aW9uIChzdGF0ZSwgY2IpIHtcbiAgICAgICAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IobWV0aG9kTmFtZSwgeyBzdGF0ZTogaXNTdHJpbmcsIGNiOiBpc0Z1bmN0aW9uIH0sIHN0YXRlLCBjYilcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICAgICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfToke2V2ZW50TmFtZX1gKVxuICAgICAgICAgIF1cbiAgICAgICAgICBjb25zdCByZW1vdmVFdmVudCA9IHN3aXRjaE1ldGhvZHNbc3dpdGNoTWV0aG9kXSgodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKCdFeGl0JykgPT09IDApIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IHRvU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYihmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVFdmVudCgpXG4gICAgICAgICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7fSlcblxuICBmdW5jdGlvbiBFbWl0IChldmVudE5hbWUsIC4uLmN1cnJpZWRBcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdFbWl0JywgeyBldmVudE5hbWU6IGlzU3RyaW5nIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uYXJncykgPT4gZW1pdChldmVudE5hbWUsIC4uLlsuLi5jdXJyaWVkQXJncywgLi4uYXJnc10pXG4gIH1cblxuICBmdW5jdGlvbiBFbnRlciAoc3RhdGUsIC4uLmN1cnJpZWRBcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdFbnRlcicsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBlbnRlcihzdGF0ZSwgLi4uWy4uLmN1cnJpZWRBcmdzLCAuLi5hcmdzXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIEluU3RhdGUgKHN0YXRlLCBhbnlPckZuLCAuLi5jdXJyaWVkRm5BcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdJblN0YXRlJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmZuQXJncykgPT5cbiAgICAgIGluU3RhdGUoc3RhdGUsIGFueU9yRm4sIC4uLlsuLi5jdXJyaWVkRm5BcmdzLCAuLi5mbkFyZ3NdKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9OiBTdGF0ZS1tYWNoaW5lIHJlc2V0IWApXG5cbiAgICBzdGF0ZUhpc3RvcnkubGVuZ3RoID0gMFxuICAgIHN0YXRlSGlzdG9yeS5wdXNoKHN0YXJ0SW4pXG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uTm9PcCAobWVzc2FnZSkge1xuICAgIGNvbnN0IGxhc3RTdGF0ZSA9IHByZXZpb3VzU3RhdGUoKVxuICAgIGNvbnN0IGluU3RhdGUgPSBjdXJyZW50U3RhdGUoKVxuICAgIGNvbnN0IHByZXZSb3V0ZSA9IGAke2xhc3RTdGF0ZSA9PT0gdW5kZWZpbmVkID8gJ1t1bmRlZmluZWRdJyA6IGxhc3RTdGF0ZX0tPiR7aW5TdGF0ZX1gXG5cbiAgICBjb25zdCBhdmFpbGFibGVTdGF0ZXMgPSBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgaWYgKCFhdmFpbGFibGVTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGAke2xvZ1ByZWZpeH06ICR7bWVzc2FnZX1cXG5gICtcbiAgICAgICAgICBgICA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiJHtwcmV2Um91dGV9XCJcXG5gICtcbiAgICAgICAgICBgICA+IFRoZXJlIGFyZSBubyBzdGF0ZXMgYXZhaWxhYmxlIGZyb20gXCIke2luU3RhdGV9XCJgXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gRnJvbSBcIiR7aW5TdGF0ZX1cIiwgdmFsaWQgc3RhdGVzIGFyZTogWyR7YXZhaWxhYmxlU3RhdGVzXG4gICAgICAgICAgICAubWFwKHN0YXRlID0+IGBcIiR7c3RhdGV9XCJgKVxuICAgICAgICAgICAgLmpvaW4oJywgJyl9XWBcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGVzOiBzdGF0ZXNIYW5kbGVkLnJlZnMoKSxcbiAgICAgIHRyYW5zaXRpb25zOiByb3V0ZXNIYW5kbGVkLnJlZnMoKSxcbiAgICAgIGV2ZW50czogZXZlbnRzSGFuZGxlZC5yZWZzKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmZvICgpIHtcbiAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9OiBJbmZvcm1hdGlvbiBhYm91dCB0aGlzIHN0YXRlLW1hY2hpbmVgKVxuXG4gICAgbG9nUmVmQ291bnRlckluZm8oc3RhdGVzSGFuZGxlZClcbiAgICBsb2dSZWZDb3VudGVySW5mbyhyb3V0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKGV2ZW50c0hhbmRsZWQpXG4gIH1cblxuICBmdW5jdGlvbiBsb2dSZWZDb3VudGVySW5mbyAocmVmQ291bnRlcikge1xuICAgIGNvbnN0IHsgZGVzY3JpcHRpb24sIHRhYmxlIH0gPSByZWZDb3VudGVyLnRvVmFsdWUoKVxuICAgIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uKVxuICAgIGlmICh0YWJsZS5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUudGFibGUodGFibGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCcgID4gTm8gaW5mb3JtYXRpb24nKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHN0YXRlLW1hY2hpbmUgb2JqZWN0IGNyZWF0ZWQgYnlcbiAgICoge0BsaW5rICNzdGF0ZWJvdHN0YXRlYm90fFN0YXRlYm90KCl9LlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBzdGF0ZWJvdEZzbVxuICAgKi9cblxuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEZvciBpZGVudGlmeWluZyBTdGF0ZWJvdCBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfX1NUQVRFQk9UX186IDEsXG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB0byBzZWUgaWYgd2UgY2FuIHRyYW5zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSBmcm9tXG4gICAgICogdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIElmIG1vcmUgdGhhbiBvbmUgc3RhdGUgaXMgc3BlY2lmaWVkLCBgdHJ1ZWAgaXMgcmV0dXJuZWQgb25seSBpZlxuICAgICAqICoqQUxMKiogc3RhdGVzIGFyZSBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gc3RhdGVzXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdnYW1lLW1lbnVzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPlxuICAgICAqICAgICAgIG1lbnUgLT5cbiAgICAgKiAgICAgICAgIHBsYXkgfFxuICAgICAqICAgICAgICAgb3B0aW9ucyB8XG4gICAgICogICAgICAgICBzb3VuZCB8XG4gICAgICogICAgICAgICBxdWl0XG4gICAgICpcbiAgICAgKiAgICAgLy8gR28gYmFjayB0byBtZW51XG4gICAgICogICAgIHBsYXkgfCBvcHRpb25zIHwgc291bmQgLT4gbWVudVxuICAgICAqXG4gICAgICogICAgIC8vIENhbiBxdWl0IGZyb20gbWFpbiBnYW1lLCB0b29cbiAgICAgKiAgICAgcGxheSAtPiBxdWl0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwbGF5JylcbiAgICAgKiAvLyBmYWxzZVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignbWVudScpXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oWydwbGF5JywgJ29wdGlvbnMnXSlcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgY2FuVHJhbnNpdGlvblRvOiBjYW5UcmFuc2l0aW9uVG8sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29yb3V0aW5lJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgc3VzcGVuZGVkIC0+IHJ1bm5pbmcgLT4gKHN1c3BlbmRlZCB8IGRlYWQpXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInN1c3BlbmRlZFwiXG4gICAgICovXG4gICAgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBlbWl0cyBhbiBldmVudCwgZmlyaW5nIGFueSBsaXN0ZW5lcnMgYWRkZWQgdXNpbmdcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zfC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gb3Ige0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnR8Lm9uRXZlbnQoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc11cbiAgICAgKiAgT3B0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqICBXaGV0aGVyIG9yIG5vdCB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICBTZWU6IHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19lbWl0dGVyX2VtaXRfZXZlbnRuYW1lX2FyZ3N8Tm9kZSBFdmVudHN9XG4gICAgICogIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogU3RhdGVib3QgaW1wb3J0cyBgRXZlbnRFbWl0dGVyYCBmcm9tIHRoZVxuICAgICAqICB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzfGV2ZW50c31cbiAgICAgKiBwYWNrYWdlIGZvciBkZWFsaW5nIHdpdGggZXZlbnRzIGluIHRoZSBicm93c2VyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdiYXNpYy1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IHJlZGlyZWN0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiB7XG4gICAgICogICAgIG9uOiAncG9zdC1kYXRhJyxcbiAgICAgKiAgICAgdGhlbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgYXJnczogJywgYXJncylcbiAgICAgKiAgICAgICAvLyBzZXRUaW1lb3V0KG1hY2hpbmUuRW50ZXIoJ3JlZGlyZWN0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCdwb3N0LWRhdGEnLCAnSGVsbG8sIHdvcmxkIScpXG4gICAgICogLy8gRXZlbnQgYXJnczogW1wiSGVsbG8sIHdvcmxkIVwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic2VuZGluZ1wiXG4gICAgICovXG4gICAgZW1pdDogZW1pdCxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiAgVGhlIGRlc2lyZWQgZXZlbnQgdG8ge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uXG4gICAgICogQHBhcmFtIHsuLi4qfSBbY3VycmllZEFyZ3NdXG4gICAgICogIEFyZ3VtZW50cyB0aGF0IHdpbGwgY3VycnkgaW50byB0aGUgcmV0dXJuZWQgYGVtaXQoKWAgZnVuY3Rpb25cbiAgICAgKiAgd2hlbmV2ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoYXQgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgLFxuICAgICAqICAgc3RhcnRJbjogJ3N0b3AnXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdwcmVwYXJlLXRvLWdvIC0+IGdvJzogICAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AnOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiB2YXIgbmV4dFRyYWZmaWNMaWdodCA9IG1hY2hpbmUuRW1pdCgndGltZXInKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInN0b3BcIlxuICAgICAqXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJwcmVwYXJlLXRvLXN0b3BcIlxuICAgICAqL1xuICAgIEVtaXQ6IEVtaXQsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBjaGFuZ2VzIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUsIHNvIGxvbmcgYXMgaXQgaXNcbiAgICAgKiBhY2Nlc3NpYmxlIGZyb20gdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgZGVzaXJlZCBzdGF0ZSB0byBzd2l0Y2gtdG8uXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc11cbiAgICAgKiAgT3B0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gdHJhbnNpdGlvbiBjYWxsYmFja3MuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBzdGF0ZSBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdkaWFsb2cnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNob3dpbmctbW9kYWwgLT4gKHNhdmluZyB8IGlkbGUpXG4gICAgICogICAgICAgc2F2aW5nIC0+IGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzYXZpbmcnKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiAvLyBbZGlhbG9nXTogSW52YWxpZCB0cmFuc2l0aW9uIFwiaWRsZS0+c2F2aW5nXCIsIG5vdCBzd2l0Y2hpbmdcbiAgICAgKiAvLyA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiW3VuZGVmaW5lZF0tPmlkbGVcIlxuICAgICAqIC8vID4gRnJvbSBcImlkbGVcIiwgdmFsaWQgc3RhdGVzIGFyZTogW1wic2hvd2luZy1tb2RhbFwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2hvd2luZy1tb2RhbCcpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqL1xuICAgIGVudGVyOiBlbnRlcixcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZ1xuICAgICAqIGFzIGl0IGlzIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgZGVzaXJlZCBzdGF0ZSB0byBzd2l0Y2gtdG8uXG4gICAgICogQHBhcmFtIHsuLi4qfSBbY3VycmllZEFyZ3NdXG4gICAgICogIEFyZ3VtZW50cyB0aGF0IHdpbGwgY3VycnkgaW50byB0aGUgcmV0dXJuZWQgYGVudGVyKClgIGZ1bmN0aW9uXG4gICAgICogIHdoZW5ldmVyIGl0IGlzIGNhbGxlZC5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYW4gY2hhbmdlIHRoZSBzdGF0ZSB3aGVuIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncG9wdXAtbWVudScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gbWVudS1vcGVuZWQgLT5cbiAgICAgKiAgICAgICAoaXRlbS1jbGlja2VkIHwgaWRsZSlcbiAgICAgKlxuICAgICAqICAgICBpdGVtLWNsaWNrZWQgLT4gaWRsZVxuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdtZW51LW9wZW5lZCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2sgPSBtYWNoaW5lLkVudGVyKCdpdGVtLWNsaWNrZWQnKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIm1lbnUtb3BlbmVkXCJcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrKClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpdGVtLWNsaWNrZWRcIlxuICAgICAqL1xuICAgIEVudGVyOiBFbnRlcixcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHN0YXRlcyB0aGUgbWFjaGluZSBoYXMgYmVlbiBpbiBzbyBmYXIsIHVwIHRvIGEgbGltaXQgc2V0XG4gICAgICogYnkgYGhpc3RvcnlMaW1pdGAgaW4ge0BsaW5rIHN0YXRlYm90T3B0aW9uc30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEEgY29weSBvZiB0aGUgc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZG93bmxvYWRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGxvYWRpbmcgLT4gKGZhaWx1cmUgfCBzdWNjZXNzKVxuICAgICAqICAgICAgIGZhaWx1cmUgLT4gbG9hZGluZ1xuICAgICAqICAgICAgIHN1Y2Nlc3MgLT4gZG9uZVxuICAgICAqICAgYCxcbiAgICAgKiAgIGhpc3RvcnlMaW1pdDogNFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdmYWlsdXJlJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdsb2FkaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzdWNjZXNzJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiBtYWNoaW5lLmhpc3RvcnkoKVxuICAgICAqIC8vIFtcImZhaWx1cmVcIiwgXCJsb2FkaW5nXCIsIFwic3VjY2Vzc1wiLCBcImRvbmVcIl1cbiAgICAgKi9cbiAgICBoaXN0b3J5OiAoKSA9PiBbLi4uc3RhdGVIaXN0b3J5XSxcblxuICAgIC8qKlxuICAgICAqIFByaW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUgdG8gdGhlIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbmZvKClcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBJbmZvcm1hdGlvbiBhYm91dCB0aGlzIHN0YXRlLW1hY2hpbmUuXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgc3RhdGVzICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICAgJ2RvbmUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAgJ2lkbGUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XSBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgIHRyYW5zaXRpb25zICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICdpZGxlLT5yZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAnaWRsZS0+c2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmctPmRvbmUnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZy0+ZG9uZScgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAgICAgKiAvLyAoTm8gaW5mb3JtYXRpb24pXG4gICAgICovXG4gICAgaW5mbzogKCkgPT4gaW5mbygpLFxuXG4gICAgLyoqXG4gICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBTYW1lIGRldGFpbHMgYXMge0BsaW5rICNzdGF0ZWJvdGZzbWluZm98LmluZm8oKX0gaW4gb2JqZWN0LWZvcm0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluc3BlY3QoKVxuICAgICAqIC8vIFdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgICAqIC8vICB7IHN0YXRlcywgdHJhbnNpdGlvbnMsIGV2ZW50cyB9XG4gICAgICpcbiAgICAgKiAvLyBUaGVzZSB3aWxsIGVhY2ggaGF2ZSBrZXktdmFsdWVzLCB0aGUga2V5IGJlaW5nIHRoZSBuYW1lXG4gICAgICogLy8gYW5kIHRoZSB2YWx1ZSBiZWluZyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBhdHRhY2hlZC5cbiAgICAgKi9cbiAgICBpbnNwZWN0OiAoKSA9PiBpbnNwZWN0KCksXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBgc3RhdGVgLCBpbW1lZGlhdGVseSByZXR1cm5pbmcgZWl0aGVyXG4gICAgICogYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgdGhlbiBpdHMgcmV0dXJuLXZhbHVlIHdpbGwgYmUgdXNlZFxuICAgICAqIGFzIHRoZSBgdHJ1ZWAtdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHBhcmFtIHsuLi4qfSBbZm5BcmdzXVxuICAgICAqICBBcmd1bWVudHMgdGhhdCB3aWxsIHBhc3MgaW50byBgb3V0cHV0V2hlblRydWUoKWAgaWYgaXQgaGFzXG4gICAgICogIGJlZW4gZGVmaW5lZCBhcyBhIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufG51bGx8Kn1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGl0dGxlLXJldnZlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICAoZ2Vhci0xIHwgZ2Vhci0yIHwgcmV2ZXJzZSkgLT5cbiAgICAgKiAgICAgaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnKVxuICAgICAqIC8vIHRydWVcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScsICdQdXJycnIuLi4nKVxuICAgICAqIC8vIFwiUHVycnJyLi4uXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2dlYXItMScpXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0lkbGluZyEnKVxuICAgICAqICAgcmV0dXJuICdQdXJycnIuLi4nXG4gICAgICogfSlcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBpblN0YXRlOiBpblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIHJ1biwgdGVzdHMgdGhhdFxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfSBtYXRjaGVzIHRoZVxuICAgICAqIHNwZWNpZmllZCBzdGF0ZSwgcmV0dXJuaW5nIGVpdGhlciBgdHJ1ZWAgb3IgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGBvdXRwdXRXaGVuVHJ1ZWAgaXMgc3BlY2lmaWVkLCB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBpbnN0ZWFkIG9mIGB0cnVlYCwgYW5kIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2ZcbiAgICAgKiAgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZSB0byB0ZXN0IGFnYWluc3QuXG4gICAgICogQHBhcmFtIHthbnl8ZnVuY3Rpb259IFtvdXRwdXRXaGVuVHJ1ZV1cbiAgICAgKiAgT3B0aW9uYWwgYHRydWVgLXZhbHVlLiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgaXQgd2lsbCBiZVxuICAgICAqICBjYWxsZWQgYW5kIGl0cyByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2N1cnJpZWRGbkFyZ3NdXG4gICAgICogIEFyZ3VtZW50cyB0aGF0IHdpbGwgY3VycnkgaW50byBgb3V0cHV0V2hlblRydWUoKWAgaWYgaXQgaGFzXG4gICAgICogIGJlZW4gZGVmaW5lZCBhcyBhIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgQSBmdW5jdGlvbiB0aGF0IGNhbGxzIHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlfC5pblN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBpZGxpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnKVxuICAgICAqIHZhciBwdXJyaW5nID0gbWFjaGluZS5JblN0YXRlKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0lkbGluZyEnKVxuICAgICAqICAgcmV0dXJuICdQdXJycnIuLi4nXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIGlkbGluZygpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogcHVycmluZygpXG4gICAgICogLy8gSWRsaW5nIVxuICAgICAqIC8vIFwiUHVycnJyLi4uXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2dlYXItMScpXG4gICAgICogcHVycmluZygpXG4gICAgICogLy8gbnVsbFxuICAgICAqIC8vIF4gdGhlIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgYXQgYWxsIGluIHRoZSBgZmFsc2VgIGNhc2UsXG4gICAgICogLy8gICBzbyBubyBjb25zb2xlLmxvZyBlaXRoZXIuXG4gICAgICovXG4gICAgSW5TdGF0ZTogSW5TdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBVc2VkIGZvciBsb2dnaW5nIGFuZCBhbHNvIGJ5IHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfVxuICAgICAqIGZvciB0aGUgc2FtZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBuYW1lIG9mIHRoZSBzdGF0ZS1tYWNoaW5lLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdBeSwgdGhlcmXigJlzIHRoZSBydWIuJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgdGhlLXF1ZXN0aW9uIC0+ICh0by1iZSB8IG5vdC10by1iZSlcbiAgICAgKiAgICAgICBub3QtdG8tYmUgLT4gcGVyY2hhbmNlLXRvLWRyZWFtXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUubmFtZSgpXG4gICAgICogLy8gXCJBeSwgdGhlcmXigJlzIHRoZSBydWIuXCJcbiAgICAgKi9cbiAgICBuYW1lOiAoKSA9PiBuYW1lLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQUZURVIqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgYmVjb21lcyB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2VudGVyQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAoZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyZWQoJ2RvbmUnLCBmcm9tU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0VudGVyZWQgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gRW50ZXJlZCBmcm9tOiByZWNlaXZpbmdcbiAgICAgKi9cbiAgICBvbkVudGVyZWQ6IGVudGVyRXhpdE1ldGhvZHMub25FbnRlcmVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGJlY29tZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtlbnRlckNhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmVkKCdkb25lJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIG1hZGUgaXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyaW5nKCdkb25lJywgZnJvbVN0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdFbnRlcmluZyBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gRW50ZXJpbmcgZnJvbTogc2VuZGluZ1xuICAgICAqIC8vIFdlIG1hZGUgaXQhXG4gICAgICovXG4gICAgb25FbnRlcmluZzogZW50ZXJFeGl0TWV0aG9kcy5vbkVudGVyaW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJpbmcgLm9uRW50ZXJpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyZWQgLm9uRW50ZXJlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgZW50ZXJDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSBhZnRlciB0aGUgc3BlY2lmaWVkXG4gICAgICogZXZlbnQgaXMgY2FsbGVkLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIFRoZSBjYWxsYmFjay5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgndHJhZmZpYy1saWdodHMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBnbyAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tc3RvcCAtPlxuICAgICAqICAgICAgIHN0b3BcbiAgICAgKlxuICAgICAqICAgICAvLyAuLi5nb3R0YSBrZWVwIHRoYXQgdHJhZmZpYyBmbG93aW5nXG4gICAgICogICAgIHN0b3AgLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLWdvIC0+XG4gICAgICogICAgICAgZ29cbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3N0b3AgLT4gcHJlcGFyZS10by1nbyAtPiBnbyc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ2dvIC0+IHByZXBhcmUtdG8tc3RvcCAtPiBzdG9wJzogeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXZlbnQoJ3RpbWVyJywgKCkgPT4ge1xuICAgICAqICAgcmVkcmF3VHJhZmZpY0xpZ2h0cygpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHNldEludGVydmFsKG1hY2hpbmUuRW1pdCgndGltZXInKSwgMjAwMClcbiAgICAgKi9cbiAgICBvbkV2ZW50OiBvbkV2ZW50LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQUZURVIqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgaXMgbm8gbG9uZ2VyIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZXhpdENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXhpdGVkKCdpZGxlJywgdG9TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnV2UgYXJlIGhlYWRpbmcgdG86JywgdG9TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogLy8gV2UgYXJlIGhlYWRpbmcgdG86IHNlbmRpbmdcbiAgICAgKi9cbiAgICBvbkV4aXRlZDogZW50ZXJFeGl0TWV0aG9kcy5vbkV4aXRlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnUGVhY2Ugb3V0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0aW5nKCdpZGxlJywgdG9TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEhlYWRpbmcgdG86IHJlY2VpdmluZ1xuICAgICAqIC8vIFBlYWNlIG91dCFcbiAgICAgKi9cbiAgICBvbkV4aXRpbmc6IGVudGVyRXhpdE1ldGhvZHMub25FeGl0aW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBleGl0Q2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYFdlIHdlbnQgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBXZSB3ZW50IGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoZWQ6IHN3aXRjaE1ldGhvZHMub25Td2l0Y2hlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSBiZWZvcmUgKipBTlkqKlxuICAgICAqIHN0YXRlLWNoYW5nZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N3aXRjaENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25Td2l0Y2hpbmcoKHRvU3RhdGUsIGZyb21TdGF0ZSkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYEdvaW5nIGZyb20gXCIke2Zyb21TdGF0ZX1cIiB0byBcIiR7dG9TdGF0ZX1cImApXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogLy8gR29pbmcgZnJvbSBcImlkbGVcIiB0byBcInJlY2VpdmluZ1wiXG4gICAgICovXG4gICAgb25Td2l0Y2hpbmc6IHN3aXRjaE1ldGhvZHMub25Td2l0Y2hpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hpbmcgLm9uU3dpdGNoaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgc3dpdGNoQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9TdGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFJ1biBjYWxsYmFja3Mgd2hlbiB0cmFuc2l0aW9ucyBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gdHJhbnNpdGlvbnNcbiAgICAgKiAgQ29uZmlndXJhdGlvbiBpbiB0aGUgZm9ybSBvZiBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgICAqICByZXR1cm5zIGFuIG9iamVjdC4gSWYgYSBmdW5jdGlvbiBpcyB1c2VkLCB0aGVyZSB3aWxsIGJlIGEgc2luZ2xlXG4gICAgICogIGFyZ3VtZW50IHBhc3NlZC1pbjogYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzXG4gICAgICogIGF0dGFjaGVkIGFzIGEgY29udmVuaWVuY2U6XG4gICAgICpcbiAgICAgKiAgLSB7e0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfSwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0sIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0sIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9fVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGFkZGVkXG4gICAgICogIGJ5IHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucyh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzogKCkgPT4ge1xuICAgICAqICAgICBzZW5kRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4obWFjaGluZS5FbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKG1hY2hpbmUuRW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ2lkbGUgLT4gcmVjZWl2aW5nJzogKCkgPT4ge1xuICAgICAqICAgICByZWNlaXZlRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4obWFjaGluZS5FbnRlcignZG9uZScsICdyZWNlaXZlZCcpKVxuICAgICAqICAgICAgIC5jYXRjaChtYWNoaW5lLkVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gc2VuZERhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiByZWNlaXZlRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gVGhlIGFib3ZlIGV4YW1wbGUgdXNpbmcgYSBmdW5jdGlvbiBmb3IgY29uZmlnXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKCh7IEVudGVyIH0pID0+ICh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzogKCkgPT4ge1xuICAgICAqICAgICBzZW5kRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oRW50ZXIoJ2RvbmUnLCAnc2VudCcpKVxuICAgICAqICAgICAgIC5jYXRjaChFbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbihFbnRlcignZG9uZScsICdyZWNlaXZlZCcpKVxuICAgICAqICAgICAgIC5jYXRjaChFbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lJzogd2hhdEhhcHBlbmVkID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FsbCBmaW5pc2hlZDogJywgd2hhdEhhcHBlbmVkKVxuICAgICAqICAgfVxuICAgICAqIH0pKVxuICAgICAqXG4gICAgICogLy8gZXRjLi4uXG4gICAgICovXG4gICAgb25UcmFuc2l0aW9uczogdHJhbnNpdGlvbnMgPT4gYXBwbHlIaXRjaGVyKHRyYW5zaXRpb25zLCAnb25UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSB0cmFuc2l0aW9ucyB3aGVuIGV2ZW50cyBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBVc2UgYHRoZW5gIHRvIG9wdGlvbmFsbHkgYWRkIGNhbGxiYWNrcyB0byB0aG9zZSB0cmFuc2l0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2NvbXBsZXgtZm9ybScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICB1cGRhdGVcbiAgICAgKlxuICAgICAqICAgICAvLyBNYXliZSB0aGluZ3MgdGFrZSBhIGxvbmcgdGltZS4uLlxuICAgICAqICAgICB1cGRhdGUgLT5cbiAgICAgKiAgICAgICB3YWl0aW5nIC0+IHdhaXRpbmctYS13aGlsZVxuICAgICAqXG4gICAgICogICAgIC8vIFdoaWNoIHBhdGggd2lsbCB3ZSB0YWtlP1xuICAgICAqICAgICB3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+XG4gICAgICogICAgICAgc3VjY2VzcyB8IGZhaWxlZCB8IHRpbWVvdXRcbiAgICAgKlxuICAgICAqICAgICAvLyBBbGwgZG9uZSFcbiAgICAgKiAgICAgc3VjY2VzcyB8IGZhaWxlZCB8IHRpbWVvdXQgLT5cbiAgICAgKiAgICAgICBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKCh7IEVudGVyLCBlbWl0IH0pID0+ICh7XG4gICAgICogICAnaWRsZSAtPiB1cGRhdGUnOiB7XG4gICAgICogICAgIG9uOiAndXNlci1zYXZlZCcsXG4gICAgICogICAgIHRoZW46IChkYXRhKSA9PiB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ1NlbmRpbmcgZGF0YTogJywgZGF0YSlcbiAgICAgKlxuICAgICAqICAgICAgIHNlbmREYXRhKGRhdGEpXG4gICAgICogICAgICAgICAudGhlbihFbnRlcignc3VjY2VzcycpKVxuICAgICAqICAgICAgICAgLmNhdGNoKEVudGVyKCdmYWlsZWQnKSlcbiAgICAgKlxuICAgICAqICAgICAgIGVtaXQoJ2RhdGEtc2VudCcpXG4gICAgICogICAgIH1cbiAgICAgKiAgIH0sXG4gICAgICogICAndXBkYXRlIC0+IHdhaXRpbmcnOiB7XG4gICAgICogICAgIG9uOiAnZGF0YS1zZW50JyxcbiAgICAgKiAgICAgdGhlbjogKCkgPT4ge1xuICAgICAqICAgICAgIHNldFRpbWVvdXQoRW50ZXIoJ3dhaXRpbmctYS13aGlsZScpLCA3NTApXG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcigndGltZW91dCcpLCA1MDAwKVxuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBKdXN0IHRvIGlsbHVzdHJhdGUgdGhhdCB5b3UgY2FuIG1peCBuJyBtYXRjaCB3aXRoIG9uVHJhbnNpdGlvbnM6XG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHN1Y2Nlc3MnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdMb3ZlbHkhJylcbiAgICAgKiAgIH0sXG4gICAgICogICAnd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPiB0aW1lb3V0JzogKCkgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnV2VsbCwgYXQgbGVhc3QgeW91IGhhdmUgeW91ciBzaG9lcycpXG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW1pdCgndXNlci1zYXZlZCcsIFsnc29tZScsICdkYXRhJ10pXG4gICAgICogLy8gU2VuZGluZyBkYXRhOiBbXCJzb21lXCIsIFwiZGF0YVwiXVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gc2VuZERhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICovXG4gICAgcGVyZm9ybVRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdwZXJmb3JtVHJhbnNpdGlvbnMnKSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByZXZpb3VzIHN0YXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9XG4gICAgICogIFRoZSBwcmV2aW91cyBzdGF0ZSwgb3IgYHVuZGVmaW5lZGAgaWYgdGhlcmUgaXNuJ3Qgb25lIChpZTsgeW91XG4gICAgICogIGhhdmUganVzdCBjYWxsZWQge0BsaW5rICNzdGF0ZWJvdGZzbXJlc2V0fC5yZXNldCgpfSwgb3IgdGhlXG4gICAgICogIG1hY2hpbmUgaGFzIGp1c3Qgc3RhcnRlZC4pXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3NpbXBsZS1zZW5kZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiBtYWNoaW5lLnByZXZpb3VzU3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICovXG4gICAgcHJldmlvdXNTdGF0ZTogcHJldmlvdXNTdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHN0YXRlLW1hY2hpbmUgdG8gaXRzIHN0YXJ0aW5nLXN0YXRlIGFuZCBjbGVhcnMgdGhlXG4gICAgICogc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEFsbCBsaXN0ZW5lcnMgd2lsbCBzdGlsbCBiZSBhdHRhY2hlZCwgYnV0IG5vIGV2ZW50cyBvciB0cmFuc2l0aW9ucyB3aWxsIGJlIGZpcmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Nhcm91c2VsJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgcGFnZS0xIC0+XG4gICAgICogICAgIHBhZ2UtMiAtPlxuICAgICAqICAgICBwYWdlLTMgLT5cbiAgICAgKiAgICAgcGFnZS00IC0+IHBhZ2UtMVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdwYWdlLTInKVxuICAgICAqIG1hY2hpbmUucmVzZXQoKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInBhZ2UtMVwiXG4gICAgICovXG4gICAgcmVzZXQ6IHJlc2V0LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGBhcnJheWAgb2Ygc3RhdGVzIGFjY2Vzc2libGUgZnJvbSB0aGUgc3RhdGUgc3BlY2lmaWVkLlxuICAgICAqIElmIG5vIHN0YXRlIGlzIHBhc3NlZC1pbiwgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfSBpcyB1c2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZV0gVGhlIHN0YXRlIHRvIGNoZWNrLiB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX1cbiAgICAgKiAgaWYgdW5zcGVjaWZpZWQuXG4gICAgICogQHJldHVybnMge1N0cmluZ1tdfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICAgKiAvLyBbXCJzZW5kaW5nXCIsIFwicmVjZWl2aW5nXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIFtcImRvbmVcIl1cbiAgICAgKi9cbiAgICBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZTogc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmVcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VDb25maWdzIChjb25maWdzLCBjYW5XYXJuKSB7XG4gIGNvbnN0IGFsbFN0YXRlcyA9IFtdXG4gIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgY29uc3QgX2NvbmZpZ3MgPSBjb25maWdzLnJlZHVjZSgoYWNjLCBjb25maWcpID0+IHtcbiAgICBjb25zdCB7IHJvdXRlQ2hhcnQsIGFjdGlvbiB9ID0gY29uZmlnXG4gICAgY29uc3QgeyBzdGF0ZXMsIHJvdXRlcywgdHJhbnNpdGlvbnMgfSA9IGRlY29tcG9zZUNoYXJ0KHJvdXRlQ2hhcnQpXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgIH1cbiAgICByZXR1cm4gW1xuICAgICAgLi4uYWNjLFxuICAgICAgLi4udHJhbnNpdGlvbnMubWFwKHRyYW5zaXRpb24gPT4ge1xuICAgICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHRyYW5zaXRpb25cbiAgICAgICAgcmV0dXJuIHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfVxuICAgICAgfSlcbiAgICBdXG4gIH0sIFtdKVxuXG4gIHJldHVybiB7XG4gICAgY29uZmlnczogX2NvbmZpZ3MsXG4gICAgc3RhdGVzOiBhbGxTdGF0ZXMsXG4gICAgcm91dGVzOiBhbGxSb3V0ZXNcbiAgfVxufVxuXG4vKipcbiAqIFRlc3RzIHRoYXQgYW4gb2JqZWN0IGlzIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAqXG4gKiBpc1N0YXRlYm90KG1hY2hpbmUpXG4gKiAvLyB0cnVlXG4gKlxuICogQHBhcmFtIHthbnl9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc1N0YXRlYm90IChvYmplY3QpIHtcbiAgcmV0dXJuIChcbiAgICBpc1Bvam8ob2JqZWN0KSAmJlxuICAgIHR5cGVvZiBvYmplY3QuX19TVEFURUJPVF9fID09PSAnbnVtYmVyJ1xuICApXG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBBU1NFUlRJT04gSEVMUEVSU1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJvdXRlSXNQb3NzaWJsZSxcbiAgYXNzZXJ0Um91dGVcbn1cblxuY29uc3QgeyBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgZGVjb21wb3NlUm91dGUgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5jb25zdCB7XG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIExvZ2dlcixcbiAgQXJnVHlwZUVycm9yLFxuICBpc1RlbXBsYXRlTGl0ZXJhbFxufSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYSBjZXJ0YWluIHJvdXRlIGNhbiBiZSBmb2xsb3dlZCBieSBhXG4gKiB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAqXG4gKiBUaGlzIG1lcmVseSB0ZXN0cyB0aGF0IGEgY2VydGFpbiBwYXRoIGNhbiBiZSB0YWtlbiB0aHJvdWdoIGFcbiAqIHN0YXRlLW1hY2hpbmUuIEl0IGRvZXNuJ3QgYXNzZXJ0IHRoYXQgdGhlIHN0YXRlcyBhcmUgbW92ZWQtdGhyb3VnaFxuICogd2hpbGUgdGhlIG1hY2hpbmUgaXMgd29ya2luZywgYXMgd2l0aFxuICoge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9LlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gKiAgVGhlIG1hY2hpbmUgdG8gdGVzdCB0aGUgcm91dGUgb24uXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcm91dGVcbiAqICBUaGUgcm91dGUgdG8gdGVzdCBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICpcbiAqICBgXG4gKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAqICBgXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gKlxuICogcm91dGVJc1Bvc3NpYmxlKG1hY2hpbmUsXG4gKiAgICd3YWxraW5nIC0+IGZhbGxpbmcgLT4gc3BsYXR0aW5nIC0+IHdhbGtpbmcnXG4gKiApXG4gKiAvLyBmYWxzZVxuICovXG5cbmZ1bmN0aW9uIHJvdXRlSXNQb3NzaWJsZSAobWFjaGluZSwgcm91dGUpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdyb3V0ZUlzUG9zc2libGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgcm91dGU6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgbWFjaGluZSwgcm91dGVcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IF9yb3V0ZSA9IGRlY29tcG9zZVJvdXRlKHJvdXRlKVxuICByZXR1cm4gX3JvdXRlLmV2ZXJ5KChzdGF0ZSwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPT09IF9yb3V0ZS5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXh0U3RhdGUgPSBfcm91dGVbaW5kZXggKyAxXVxuICAgICAgY29uc3QgYXZhaWxhYmxlU3RhdGVzID0gbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZShzdGF0ZSlcbiAgICAgIGNvbnN0IHBhc3NlcyA9IGF2YWlsYWJsZVN0YXRlcy5pbmNsdWRlcyhuZXh0U3RhdGUpXG4gICAgICByZXR1cm4gcGFzc2VzXG4gICAgfVxuICB9KVxufVxuXG5sZXQgYXNzZXJ0aW9uSWQgPSAwXG5cbi8qKlxuICoge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9IG9wdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBhc3NlcnRSb3V0ZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dXG4gKiAgRGVzY3JpYmUgdGhlIHN1Y2Nlc3MtY29uZGl0aW9uIGZvciB0aGlzIGFzc2VydGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZnJvbVN0YXRlPVwiXCJdXG4gKiAgV2FpdCBmb3IgdGhlIG1hY2hpbmUgdG8gYmUgaW4gdGhpcyBzdGF0ZSBiZWZvcmUgYXNzZXJ0aW9uIGJlZ2lucy5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IFtydW5dXG4gKiAgUnVuIHRoaXMgZnVuY3Rpb24ganVzdCBiZWZvcmUgc3RhcnRpbmcgdGhlIGFzc2VydGlvbi5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGVybWl0dGVkRGV2aWF0aW9ucz0wXVxuICogIElmIHdlIGhpdCBhbiB1bmV4cGVjdGVkIHN0YXRlIGR1cmluZyBhc3NlcnRpb24sIHRoaXMgaXMgYSBcImRldmlhdGlvblwiLlxuICogIEl0IG1pZ2h0IGJlIHRoYXQgdGhlIEZTTSB3aWxsIGNvbWUgYmFjayB0byB0aGUgZXhwZWN0ZWQgc3RhdGUgYWdhaW5cbiAqICBhZnRlciBhIGNlcnRhaW4gbnVtYmVyIG9mIHRoZXNlLiBGb3IgZXhhbXBsZSwgaWYgeW91ciBGU00gaGFzIGFcbiAqICBcInJldHJ5XCIgcm91dGUgY29uZmlndXJlZCwgdGhpcyBudW1iZXIgY2FuIGFjY291bnQgZm9yIGl0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFt0aW1lb3V0SW5Ncz0xMDAwXVxuICogIFBlcm1pdHRlZCBsZW5ndGggb2YgdGltZSBmb3IgdGhlIGVudGlyZSBhc3NlcnRpb24sIGluIG1pbGxpc2Vjb25kcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbG9nTGV2ZWw9M11cbiAqICBOb3JtYWxseSB3ZSB3YW50IGxvZ3MgZm9yIGFzc2VydGlvbnMsIHJpZ2h0PyBXZWxsLCB5b3UgY2FuIHR1bmVcbiAqICB0aGVtIGp1c3QgbGlrZSB5b3UgY2FuIHdpdGgge0BsaW5rICNzdGF0ZWJvdG9wdGlvbnN8c3RhdGVib3RPcHRpb25zfS5cbiAqL1xuXG4vKipcbiAqIEFzc2VydCB0aGF0IGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gdHJhY2VkIHRoZSByb3V0ZSBzcGVjaWZpZWQuXG4gKlxuICogV2hlcmVhcyB7QGxpbmsgI3N0YXRlYm90cm91dGVpc3Bvc3NpYmxlfHJvdXRlSXNQb3NzaWJsZSgpfSBvbmx5IGNoZWNrc1xuICogdGhhdCBhIHBhcnRpY3VsYXIgcm91dGUgY2FuIGJlIGZvbGxvd2VkLCBgYXNzZXJ0Um91dGVgIHdpbGwgaG9vay1pbnRvXG4gKiBhIG1hY2hpbmUgYW5kIHdhaXQgZm9yIGl0IHRvIHRyYWNlIHRoZSBzcGVjaWZpZWQgcGF0aCB3aXRoaW4gYVxuICogdGltZW91dCBwZXJpb2QuXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBhc3luY1xuICogQHBhcmFtIHtzdGF0ZWJvdEZzbX0gbWFjaGluZVxuICogIFRoZSBtYWNoaW5lIHRvIHJ1biB0aGUgYXNzZXJ0aW9uIG9uLlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGV4cGVjdGVkUm91dGVcbiAqICBUaGUgZXhwZWN0ZWQgcm91dGUgYXMgYW4gYXJyb3ctZGVsaW1pdGVkIHN0cmluZzpcbiAqXG4gKiAgYFxuICogIFwiaWRsZSAtPiBwZW5kaW5nIC0+IHN1Y2Nlc3MgLT4gZG9uZVwiXG4gKiAgYFxuICogQHBhcmFtIHthc3NlcnRSb3V0ZU9wdGlvbnN9IFtvcHRpb25zXVxuICogQHJldHVybnMge1Byb21pc2V9XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICpcbiAqIGFzc2VydFJvdXRlKFxuICogICBtYWNoaW5lLCAncHJlcGFyZSAtPiBkZWJvdW5jZSAtPiBzZW5kaW5nIC0+IGRvbmUgLT4gaWRsZScsXG4gKiAgIHtcbiAqICAgICBkZXNjcmlwdGlvbjogJ0VtYWlsIHNlbnQgd2l0aCBubyBpc3N1ZXMnLFxuICogICAgIGZyb21TdGF0ZTogJ2lkbGUnLFxuICogICAgIHRpbWVvdXRJbk1zOiAxMDAwICogMjAsXG4gKiAgICAgcGVybWl0dGVkRGV2aWF0aW9uczogMCxcbiAqICAgICBsb2dMZXZlbDogM1xuICogICB9XG4gKiApXG4gKiAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnQXNzZXJ0aW9uIHBhc3NlZCEnKSlcbiAqIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihgV2hvb3BzOiAke2Vycn1gKSlcbiAqXG4gKiBtYWNoaW5lLmVudGVyKCdpZGxlJylcbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRSb3V0ZSAobWFjaGluZSwgZXhwZWN0ZWRSb3V0ZSwgb3B0aW9ucykge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2Fzc2VydFJvdXRlJyxcbiAgICB7IG1hY2hpbmU6IGlzU3RhdGVib3QsIGV4cGVjdGVkUm91dGU6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgbWFjaGluZSwgZXhwZWN0ZWRSb3V0ZVxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgYXNzZXJ0aW9uSWQgKz0gMVxuXG4gIGNvbnN0IHtcbiAgICBkZXNjcmlwdGlvbiA9ICdBc3NlcnRpb24gY29tcGxldGUnLFxuICAgIGZyb21TdGF0ZSA9ICcnLFxuICAgIHJ1biA9ICgpID0+IHt9LFxuICAgIHBlcm1pdHRlZERldmlhdGlvbnMgPSAwLFxuICAgIHRpbWVvdXRJbk1zID0gMTAwMCxcbiAgICBsb2dMZXZlbCA9IDNcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuXG4gIGNvbnN0IHByZWZpeCA9IGBTdGF0ZWJvdFske21hY2hpbmUubmFtZSgpfV06IGFJZDwke2Fzc2VydGlvbklkfT5gXG4gIGNvbnN0IHJvdXRlID0gZGVjb21wb3NlUm91dGUoZXhwZWN0ZWRSb3V0ZSlcblxuICBjb25zb2xlLmxvZyhgXFxuJHtwcmVmaXh9OiBBc3NlcnRpbmcgcm91dGU6IFske3JvdXRlLmpvaW4oJyA+ICcpfV1gKVxuICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9OiA+IEFzc2VydGlvbiB3aWxsIHN0YXJ0IGZyb20gc3RhdGU6IFwiJHtmcm9tU3RhdGV9XCJgKVxuXG4gIGNvbnN0IGZyb21TdGF0ZUFjdGlvbkZuID0gRGVmZXIocnVuKVxuICBsZXQgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSAoKSA9PiB7IH1cblxuICBjb25zdCB0b3RhbFRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gIGxldCBzdGF0ZVRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gIGxldCBhc3NlcnRpb25UaW1lb3V0VGltZXJcbiAgbGV0IGRldmlhdGlvbnMgPSAwXG4gIGxldCBwZW5kaW5nID0gdHJ1ZVxuICBsZXQgdW5leHBlY3RlZCA9IGZhbHNlXG5cbiAgY29uc3QgY29uc3VtZVJvdXRlID0gWy4uLnJvdXRlXVxuICBjb25zdCByZXBvcnQgPSBUYWJsZShcbiAgICBbJ3N0YXRlJywgJ2V4cGVjdGVkJywgJ2luZm8nLCAndG9vayddLFxuICAgIFsnY2VudGVyJywgJ2NlbnRlcicsICdsZWZ0JywgJ3JpZ2h0J11cbiAgKVxuXG4gIGNvbnN0IGZpbmFsaXNlUmVwb3J0ID0gT25jZShlcnIgPT4ge1xuICAgIGFkZFJvdygnJywgJycsICcnLCAnVE9UQUw6ICcgKyB0b3RhbFRpbWVUYWtlbigpKVxuICAgIHJlcG9ydC5sb2NrKClcbiAgICBjb25zb2xlLmxvZyhgXFxuJHtwcmVmaXh9OiAke2Rlc2NyaXB0aW9ufTogWyR7ZXJyID8gJ0ZBSUxFRCcgOiAnU1VDQ0VTUyd9XWApXG4gICAgY29uc29sZS50YWJsZShyZXBvcnQuY29udGVudCgpKVxuICAgIHJldHVybiBlcnJcbiAgfSlcblxuICBjb25zdCB7IGFkZFJvdyB9ID0gcmVwb3J0XG4gIGZ1bmN0aW9uIGVudGVyZWRTdGF0ZSAoc3RhdGUpIHtcbiAgICBpZiAocGVuZGluZykge1xuICAgICAgYWRkUm93KHN0YXRlLCAnLScsICdQRU5ESU5HJylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZVswXVxuICAgICAgaWYgKGV4cGVjdGVkU3RhdGUgPT09IHN0YXRlKSB7XG4gICAgICAgIGFkZFJvdyhzdGF0ZSwgZXhwZWN0ZWRTdGF0ZSwgdW5leHBlY3RlZCA/ICdSRUFMSUdORUQnIDogJ09LQVknLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gZmFsc2VcbiAgICAgICAgY29uc3VtZVJvdXRlLnNoaWZ0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZFJvdyhzdGF0ZSwgZXhwZWN0ZWRTdGF0ZSwgJ1dST05HIFNUQVRFJywgc3RhdGVUaW1lVGFrZW4oKSlcbiAgICAgICAgdW5leHBlY3RlZCA9IHRydWVcbiAgICAgICAgZGV2aWF0aW9ucyArPSAxXG4gICAgICB9XG4gICAgICBzdGF0ZVRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoY29uc3VtZVJvdXRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVqZWN0KGZpbmFsaXNlUmVwb3J0KG5ldyBFcnJvcignTk8gUk9VVEUgVE8gVEVTVCcpKSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyVGltZW91dEFuZFJlc29sdmUgPSAoLi4uYXJncykgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGFzc2VydGlvblRpbWVvdXRUaW1lcilcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIoKVxuICAgICAgcmVzb2x2ZSguLi5hcmdzKVxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyVGltZW91dEFuZFJlamVjdCA9IGVyciA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZWplY3QoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGJhaWxvdXQgPSBtZXNzYWdlID0+IHtcbiAgICAgIHdoaWxlIChjb25zdW1lUm91dGUubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgICBhZGRSb3cobWFjaGluZS5jdXJyZW50U3RhdGUoKSwgYCgke2V4cGVjdGVkU3RhdGV9KWAsIG1lc3NhZ2UpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgfVxuICAgICAgY2xlYXJUaW1lb3V0QW5kUmVqZWN0KGZpbmFsaXNlUmVwb3J0KG5ldyBFcnJvcihtZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgaWYgKG1hY2hpbmUuaW5TdGF0ZShmcm9tU3RhdGUpKSB7XG4gICAgICBwZW5kaW5nID0gZmFsc2VcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgIH1cblxuICAgIGNvbnN0IHsgcmV2b2tlLCBmbiB9ID0gUmV2b2thYmxlKHN0YXRlID0+IHtcbiAgICAgIGFzc2VydGlvblRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBiYWlsb3V0KCdUSU1FT1VUJylcbiAgICAgIH0sIHRpbWVvdXRJbk1zKVxuXG4gICAgICBlbnRlcmVkU3RhdGUoc3RhdGUpXG4gICAgICBpZiAocGVuZGluZyAmJiBzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9IGZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpYXRpb25zID4gcGVybWl0dGVkRGV2aWF0aW9ucykge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBiYWlsb3V0KCdUT08gTUFOWSBERVZJQVRJT05TJylcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZShmaW5hbGlzZVJlcG9ydCgpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyID0gbWFjaGluZS5vblN3aXRjaGluZyhmbilcbiAgfSlcbn1cblxuZnVuY3Rpb24gVGFibGUgKGNvbHVtbnMgPSBbXSwgYWxpZ25tZW50cyA9IFtdKSB7XG4gIGNvbnN0IHRhYmxlID0gW11cbiAgY29uc3QgYWxpZ25tZW50ID0gY29sdW1ucy5tYXAoKF8sIGluZGV4KSA9PiBhbGlnbm1lbnRzW2luZGV4XSB8fCAnY2VudGVyJylcblxuICBsZXQgbG9ja2VkID0gZmFsc2VcbiAgZnVuY3Rpb24gbG9jayAoKSB7XG4gICAgbG9ja2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUm93ICguLi5hcmdzKSB7XG4gICAgaWYgKGxvY2tlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IG9iaiA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IGFyZ3NbaW5kZXhdIHx8ICcnXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtjb2xdOiByb3dcbiAgICAgIH1cbiAgICB9LCB7fSlcbiAgICB0YWJsZS5wdXNoKG9iailcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbFNpemVzICgpIHtcbiAgICByZXR1cm4gdGFibGUucmVkdWNlKChhY2MsIHJvdykgPT4gY29sdW1ucy5tYXAoKGNvbCwgaW5kZXgpID0+IE1hdGgubWF4KHJvd1tjb2xdLmxlbmd0aCwgYWNjW2luZGV4XSkpLCBjb2x1bW5zLm1hcCgoKSA9PiAwKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhZExlZnQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuIHN0ciArICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhZFJpZ2h0IChzdHIsIGxlbikge1xuICAgIHJldHVybiAnICcucmVwZWF0KGxlbiAtIHN0ci5sZW5ndGgpICsgc3RyXG4gIH1cblxuICBmdW5jdGlvbiBjb250ZW50ICgpIHtcbiAgICBjb25zdCBzaXplcyA9IGNvbFNpemVzKClcbiAgICBmdW5jdGlvbiBmb3JtYXRGaWVsZCAodmFsdWUsIGluZGV4KSB7XG4gICAgICBjb25zdCBzaXplID0gc2l6ZXNbaW5kZXhdXG4gICAgICBjb25zdCBhbGlnbiA9IGFsaWdubWVudFtpbmRleF1cbiAgICAgIGlmIChhbGlnbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHJldHVybiBwYWRMZWZ0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgaWYgKGFsaWduID09PSAncmlnaHQnKSB7XG4gICAgICAgIHJldHVybiBwYWRSaWdodCh2YWx1ZSwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICBjb25zdCBvdXRwdXQgPSB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRSb3cgPSBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjb2wsIGluZGV4KSA9PiAoe1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtjb2xdOiBmb3JtYXRGaWVsZChyb3dbY29sXSwgaW5kZXgpXG4gICAgICB9KSwge30pXG4gICAgICByZXR1cm4gWy4uLmFjYywgZm9ybWF0dGVkUm93XVxuICAgIH0sIFtdKVxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9jazogbG9jayxcbiAgICBhZGRSb3c6IGFkZFJvdyxcbiAgICBjb250ZW50OiBjb250ZW50XG4gIH1cbn1cblxuZnVuY3Rpb24gVGltZVRha2VuICgpIHtcbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXG4gIGZ1bmN0aW9uIGZtdCAobnVtLCBkaWdpdHMpIHtcbiAgICByZXR1cm4gbnVtLnRvRml4ZWQoZGlnaXRzKS5yZXBsYWNlKC9cXC4wKyQvLCAnJylcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lXG5cbiAgICBpZiAoZHVyYXRpb24gPCA1MDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24pfSBtc2BcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uIDwgNTAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDIpfSBzIGBcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uIDwgNjAwMDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwLCAxKX0gcyBgXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwIC8gNjAsIDEpfSBtIGBcbiAgICB9XG4gIH1cbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEVYUE9SVFNcbi8vXG5cbmNvbnN0IHsgU3RhdGVib3QsIGlzU3RhdGVib3QgfSA9IHJlcXVpcmUoJy4vc3RhdGVib3QnKVxuY29uc3QgeyBhc3NlcnRSb3V0ZSwgcm91dGVJc1Bvc3NpYmxlIH0gPSByZXF1aXJlKCcuL2Fzc2VydGlvbnMnKVxuY29uc3QgeyBkZWNvbXBvc2VDaGFydCB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcblxuLyoqXG4gKiA8aW1nIHNyYz1cIi4vbG9nby1mdWxsLnBuZ1wiIHN0eWxlPVwibWF4LXdpZHRoOiAyNTVweDsgbWFyZ2luOiAxMHB4IDA7XCIgLz5cbiAqXG4gKiBXcml0ZSBtb3JlIHJvYnVzdCBhbmQgdW5kZXJzdGFuZGFibGUgcHJvZ3JhbXMuXG4gKlxuICogU3RhdGVib3QgaG9wZXMgdG8gbWFrZSBbRmluaXRlIFN0YXRlIE1hY2hpbmVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaW5pdGUtc3RhdGVfbWFjaGluZSkgKEZTTXMpIGEgbGl0dGxlIG1vcmUgYWNjZXNzaWJsZS5cbiAqXG4gKiBZb3UncmUgcmVhZGluZyB0aGUgZG9jdW1lbnRhdGlvbi4gT3RoZXIgZXhpdHMgYXJlOlxuICpcbiAqIC0gVGhlIFtSRUFETUUgZmlsZV0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdC9ibG9iL21hc3Rlci9SRUFETUUubWQpXG4gKiAtIFRoZSBbR2l0aHViIFJlcG9dKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3QpXG4gKiAtIFRoZSBzaGVsbC1zY3JpcHQgdmVyc2lvbiwgW1N0YXRlYm90LXNoXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90LXNoKVxuICpcbiAqIFN0YXRlYm90IHdhcyB3cml0dGVuIGJ5IFtDb25hbiBUaGVvYmFsZF0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci8pIGFuZFxuICogaXMgW0lTQyBsaWNlbnNlZF0oLi4vTElDRU5TRSkuXG4gKlxuICogIyMjIEp1bXAgcmlnaHQgaW5cbiAqXG4gKiBQbGF5IGFyb3VuZCB3aXRoIGFuIGV4YW1wbGUgdGhhdCB1c2VzIFJlYWN0IGluIFt0aGlzIENvZGVTYW5kYm94XShodHRwczovL2NvZGVzYW5kYm94LmlvL3Mvc3RhdGVib3QtcmVhY3Qtb3QzeGU/ZmlsZT0vc3JjL0xvYWRlci5qcykuXG4gKlxuICogWW91IGNhbiBpbnN0YWxsIFN0YXRlYm90IGludG8geW91ciBgbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYHNoXG4gKiBucG0gaSBzdGF0ZWJvdFxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGltcG9ydCBzdGF0ZWJvdCBmcm9tICdzdGF0ZWJvdCdcbiAqIGBgYFxuICpcbiAqIE9yIG5vbi1gbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYGpzXG4gKiA8c2NyaXB0IHNyYz1cImh0dHBzOi8vdW5wa2cuY29tL3N0YXRlYm90QDIuMy4zL2Rpc3QvYnJvd3Nlci9zdGF0ZWJvdC5taW4uanNcIj48L3NjcmlwdD5cbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCB7IFN0YXRlYm90IH0gPSBzdGF0ZWJvdFxuICogLy8gTWFrZSBtYWNoaW5lcyB3aXRoIFN0YXRlYm90KClcbiAqXG4gKiBjb25zdCB7IGlzU3RhdGVib3QsIHJvdXRlSXNQb3NzaWJsZSwgYXNzZXJ0Um91dGUgfSA9IHN0YXRlYm90XG4gKiAvLyBUaGVzZSBhcmUgYXNzZXJ0aW9uIGhlbHBlcnMgeW91IGNhbiB1c2UgZm9yIHRlc3RpbmdcbiAqIGBgYFxuICpcbiAqICMjIyBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSA6KVxuICpcbiAqIEkndmUgaW5jbHVkZWQgU3RhdGVib3QgaW4gdGhpcyBwYWdlLiBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSB0b1xuICogZm9sbG93IGFsb25nIHdpdGggdGhlIGV4YW1wbGVzIGJlbG93OlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwcm9taXNlLWxpa2UnLCB7XG4gKiAgIGNoYXJ0OiBgXG4gKiAgICAgLy8gVGhpcyBvbmUgd2lsbCBiZWhhdmUgYSBiaXQgbGlrZSBhIFByb21pc2VcbiAqICAgICBpZGxlIC0+IHBlbmRpbmcgLT5cbiAqICAgICAgIHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqXG4gKiAgICAgLy8gLi4uYW5kIHdlJ3JlIGRvbmVcbiAqICAgICByZXNvbHZlZCAtPiBkb25lXG4gKiAgICAgcmVqZWN0ZWQgLT4gZG9uZVxuICogICBgLFxuICogICBzdGFydEluOiAnaWRsZSdcbiAqIH0pXG4gKlxuICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BlbmRpbmcnKVxuICogLy8gdHJ1ZVxuICpcbiAqIG1hY2hpbmUuZW50ZXIoJ3BlbmRpbmcnKVxuICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gKiAvLyBbXCJyZXNvbHZlZFwiLCBcInJlamVjdGVkXCJdXG4gKiBgYGBcbiAqXG4gKiBXZSBjYW4gaG9vay11cCBldmVudHMgd2l0aCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX06XG4gKlxuICogYGBganNcbiAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAqICAncGVuZGluZyAtPiByZXNvbHZlZCc6IHtcbiAqICAgIG9uOiAnZGF0YS1sb2FkZWQnXG4gKiAgfSxcbiAqICAncGVuZGluZyAtPiByZWplY3RlZCc6IHtcbiAqICAgIG9uOiBbJ3RpbWVvdXQnLCAnZGF0YS1lcnJvciddLFxuICogICAgdGhlbjogKG1zZykgPT4ge1xuICogICAgICBjb25zb2xlLndhcm4oJ1VoIG9oLi4uJywgbXNnKVxuICogICAgfVxuICogIH0sXG4gKiAgJ3Jlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZSc6IHtcbiAqICAgIG9uOiAndGhhdHMtYWxsLWZvbGtzJ1xuICogIH1cbiAqIH0pXG4gKlxuICogbWFjaGluZS5lbWl0KCdkYXRhLWVycm9yJywgJ0RpZCB5b3UgaGVhciB0aGF0PycpXG4gKiBgYGBcbiAqXG4gKiBIZXJlJ3MgdGhlIEFQSTpcbiAqXG4gKiB8IEhpdGNoZXJzIHwgU3RhdHVzIHwgQWN0aW9ucyB8XG4gKiB8LXwtfC18XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnMgLnBlcmZvcm1UcmFuc2l0aW9ucygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmV2ZW50IC5vbkV2ZW50KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWNhbnRyYW5zaXRpb250byAuY2FuVHJhbnNpdGlvblRvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXN0YXRlc2F2YWlsYWJsZWZyb21oZXJlIC5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9IC8ge0BsaW5rICNlbWl0LWV2ZW50bmFtZS1jdXJyaWVkYXJncyAuRW1pdCgpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnRyYW5zaXRpb25zIC5vblRyYW5zaXRpb25zKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZSAuY3VycmVudFN0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXByZXZpb3Vzc3RhdGUgLnByZXZpb3VzU3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeSAuaGlzdG9yeSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gLyB7QGxpbmsgI2VudGVyLXN0YXRlLWN1cnJpZWRhcmdzIC5FbnRlcigpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGUgLmluU3RhdGUoKX0gLyB7QGxpbmsgI2luc3RhdGUtc3RhdGUtb3V0cHV0d2hlbnRydWUtY3VycmllZGZuYXJncyAuSW5TdGF0ZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21yZXNldCAucmVzZXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0aW5nIC5vbkV4aXRpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluZm8gLmluZm8oKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zcGVjdCAuaW5zcGVjdCgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21uYW1lIC5uYW1lKCl9IHwgIHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoaW5nIC5vblN3aXRjaGluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IHwgIHwgIHxcbiAqXG4gKiA8aW1nIHNyYz1cIi4vbG9nby1zbWFsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogNzVweDsgbWFyZ2luOiAxNXB4IDAgMCA1cHg7XCIgLz5cbiAqXG4gKiBAbW9kdWxlIHN0YXRlYm90XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN0YXRlYm90LFxuICBpc1N0YXRlYm90LFxuICByb3V0ZUlzUG9zc2libGUsXG4gIGFzc2VydFJvdXRlLFxuICBkZWNvbXBvc2VDaGFydFxufVxuIl0sIm5hbWVzIjpbImRvbWFpbiIsIkV2ZW50SGFuZGxlcnMiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJjcmVhdGUiLCJFdmVudEVtaXR0ZXIiLCJpbml0IiwiY2FsbCIsInVzaW5nRG9tYWlucyIsInVuZGVmaW5lZCIsIl9ldmVudHMiLCJfbWF4TGlzdGVuZXJzIiwiZGVmYXVsdE1heExpc3RlbmVycyIsImFjdGl2ZSIsImdldFByb3RvdHlwZU9mIiwiX2V2ZW50c0NvdW50Iiwic2V0TWF4TGlzdGVuZXJzIiwibiIsImlzTmFOIiwiVHlwZUVycm9yIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0Tm9uZSIsImhhbmRsZXIiLCJpc0ZuIiwic2VsZiIsImxlbiIsImxlbmd0aCIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJpIiwiZW1pdE9uZSIsImFyZzEiLCJlbWl0VHdvIiwiYXJnMiIsImVtaXRUaHJlZSIsImFyZzMiLCJlbWl0TWFueSIsImFyZ3MiLCJhcHBseSIsImVtaXQiLCJ0eXBlIiwiZXIiLCJldmVudHMiLCJkb0Vycm9yIiwiZXJyb3IiLCJhcmd1bWVudHMiLCJFcnJvciIsImRvbWFpbkVtaXR0ZXIiLCJkb21haW5UaHJvd24iLCJlcnIiLCJjb250ZXh0IiwiQXJyYXkiLCJfYWRkTGlzdGVuZXIiLCJ0YXJnZXQiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJwdXNoIiwid2FybmVkIiwidyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJlbWl0V2FybmluZyIsImUiLCJjb25zb2xlIiwid2FybiIsImxvZyIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJfb25jZVdyYXAiLCJmaXJlZCIsImciLCJyZW1vdmVMaXN0ZW5lciIsIm9uY2UiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNwbGljZU9uZSIsInJlbW92ZUFsbExpc3RlbmVycyIsImtleXMiLCJrZXkiLCJldmxpc3RlbmVyIiwicmV0IiwidW53cmFwTGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsImluZGV4IiwiayIsInBvcCIsImFyciIsImNvcHkiLCJpc0FycmF5IiwiaXNFdmVudEVtaXR0ZXIiLCJpc0Z1bmN0aW9uIiwiaXNQb2pvIiwiaXNTdHJpbmciLCJpc1RlbXBsYXRlTGl0ZXJhbCIsInVuaXEiLCJEZWZlciIsIk9uY2UiLCJSZXZva2FibGUiLCJSZWZlcmVuY2VDb3VudGVyIiwiQXJnVHlwZUVycm9yIiwiTG9nZ2VyIiwib2JqIiwiaXNPYmplY3QiLCJldmVyeSIsIml0ZW0iLCJpbnB1dCIsInJlZHVjZSIsImFjYyIsIm9uZSIsImluZGV4T2YiLCJkZWZlciIsImZuIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicmV2b2tlIiwiX2ZuIiwicmVzdWx0IiwicmV2b2tlZCIsImtpbmQiLCJkZXNjcmlwdGlvbiIsIl9yZWZzIiwiZXhwZWN0aW5nIiwiZmxhdCIsImZvckVhY2giLCJyZWYiLCJpbmNyZWFzZSIsImNvdW50T2YiLCJkZWNyZWFzZSIsIk1hdGgiLCJtYXgiLCJyZWZzIiwidGFibGUiLCJzb3J0IiwibWFwIiwidG9WYWx1ZSIsImVyclByZWZpeCIsImZuTmFtZSIsInR5cGVNYXAiLCJhcmdNYXAiLCJlbnRyaWVzIiwiYXJnTmFtZSIsImFyZ1R5cGUiLCJzaWduYXR1cmUiLCJqb2luIiwiYXJnIiwiZXJyb3JEZXNjIiwidHlwZU5hbWUiLCJ0eXBlTWF0Y2hlcyIsImZpbHRlciIsIkJvb2xlYW4iLCJsZXZlbCIsIl9sZXZlbCIsImluZm8iLCJub25lIiwiY2FuV2FybiIsImNhbkxvZyIsImNhbkluZm8iLCJyeENSTEYiLCJjeFBpcGUiLCJjeEFycm93IiwicnhPcGVyYXRvcnMiLCJyeFVuc2FmZSIsInJlcGxhY2UiLCJyeExpbmVDb250aW51YXRpb25zIiwiUmVnRXhwIiwicnhEaXNhbGxvd2VkQ2hhcmFjdGVycyIsInJ4Q29tbWVudCIsImRlY29tcG9zZUNoYXJ0IiwiZGVjb21wb3NlUm91dGUiLCJyZXF1aXJlJCQwIiwiYXJnVHlwZUVycm9yIiwidGVtcGxhdGVMaXRlcmFsIiwibGluZXMiLCJjb25kZW5zZWRMaW5lcyIsImZsYXR0ZW5lZFJvdXRlIiwidG9rZW5pc2VkTGluZXMiLCJjaGFydCIsImxpbmVzT2ZUb2tlbnMiLCJsaW5lc09mUm91dGVzIiwiZGVjb21wb3NlUm91dGVGcm9tVG9rZW5zIiwibGluZXNPZlRyYW5zaXRpb25zIiwiZGVjb21wb3NlVHJhbnNpdGlvbnNGcm9tUm91dGUiLCJzdGF0ZXMiLCJyb3V0ZUtleXMiLCJyb3V0ZSIsImZpbHRlcmVkUm91dGVzIiwiZmlsdGVyZWRTdGF0ZXMiLCJ0cmFuc2l0aW9ucyIsInNwbGl0Iiwicm91dGVzIiwibGluZXNGcm9tIiwic3RyT3JBcnIiLCJsaW5lIiwib3V0cHV0IiwiY29uZGVuc2VkTGluZSIsInNhbml0aXNlZExpbmUiLCJ0ZXN0Iiwic3RyIiwicHJldmlvdXNTdGF0ZXMiLCJmcm9tU3RhdGVzIiwidG9TdGF0ZXMiLCJmcm9tU3RhdGUiLCJ0b1N0YXRlIiwiU3RhdGVib3QiLCJpc1N0YXRlYm90IiwicmVxdWlyZSQkMSIsIm9wdGlvbnMiLCJsb2dQcmVmaXgiLCJsb2dMZXZlbCIsImhpc3RvcnlMaW1pdCIsInN0YXJ0SW4iLCJpbmNsdWRlcyIsInRyYW5zaXRpb25JZCIsInN0YXRlSGlzdG9yeSIsInN0YXRlSGlzdG9yeUxpbWl0IiwiaW50ZXJuYWxFdmVudHMiLCJJTlRFUk5BTF9FVkVOVFMiLCJvblN3aXRjaGluZyIsIm9uU3dpdGNoZWQiLCJlbWl0SW50ZXJuYWxFdmVudCIsImV2ZW50TmFtZSIsIm9uSW50ZXJuYWxFdmVudCIsInN0YXRlc0hhbmRsZWQiLCJyb3V0ZXNIYW5kbGVkIiwiZXZlbnRzSGFuZGxlZCIsImFwcGx5SGl0Y2hlciIsImhpdGNoZXIiLCJoaXRjaGVyQWN0aW9ucyIsImVudGVyIiwiRW50ZXIiLCJFbWl0Iiwicm91dGVDaGFydCIsImFjdGlvbk9yQ29uZmlnIiwiYWN0aW9uIiwiX29uIiwiX3RoZW4iLCJ0aGVuIiwiYWxsU3RhdGVzIiwiYWxsUm91dGVzIiwiZGVjb21wb3NlZEV2ZW50cyIsIl9jb25maWdzIiwiZGVjb21wb3NlQ29uZmlncyIsImNvbmZpZ3MiLCJhbGxDbGVhbnVwRm5zIiwib25FdmVudCIsImV2ZW50V2FzSGFuZGxlZCIsInNvbWUiLCJwYXNzZWQiLCJpblN0YXRlIiwidHJhbnNpdGlvbk5vT3AiLCJ0cmFuc2l0aW9uQ29uZmlncyIsInRyYW5zaXRpb24iLCJpbnZhbGlkU3RhdGVzIiwic3RhdGUiLCJpbnZhbGlkUm91dGVzIiwicHJldmlvdXNTdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImNhblRyYW5zaXRpb25UbyIsInRlc3RTdGF0ZXMiLCJuZXh0U3RhdGVzIiwic3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUiLCJfc3RhdGUiLCJ0cmltIiwiYW55T3JGbiIsImNvbmRpdGlvbk1hdGNoZXMiLCJmbkFyZ3MiLCJuZXh0Um91dGUiLCJzaGlmdCIsImNiIiwic3dpdGNoTWV0aG9kcyIsIm1ldGhvZE5hbWUiLCJkZWNyZWFzZVJlZkNvdW50IiwicmVtb3ZlRXZlbnQiLCJlbnRlckV4aXRNZXRob2RzIiwibmFtZXMiLCJzd2l0Y2hNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsImRlY3JlYXNlUmVmQ291bnRzIiwiY3VycmllZEFyZ3MiLCJJblN0YXRlIiwiY3VycmllZEZuQXJncyIsInJlc2V0IiwibWVzc2FnZSIsImxhc3RTdGF0ZSIsInByZXZSb3V0ZSIsImF2YWlsYWJsZVN0YXRlcyIsImluc3BlY3QiLCJsb2dSZWZDb3VudGVySW5mbyIsInJlZkNvdW50ZXIiLCJfX1NUQVRFQk9UX18iLCJoaXN0b3J5Iiwib25FbnRlcmVkIiwib25FbnRlcmluZyIsIm9uRXhpdGVkIiwib25FeGl0aW5nIiwib25UcmFuc2l0aW9ucyIsInBlcmZvcm1UcmFuc2l0aW9ucyIsImNvbmZpZyIsIm9iamVjdCIsInJvdXRlSXNQb3NzaWJsZSIsImFzc2VydFJvdXRlIiwicmVxdWlyZSQkMiIsIm1hY2hpbmUiLCJfcm91dGUiLCJuZXh0U3RhdGUiLCJwYXNzZXMiLCJhc3NlcnRpb25JZCIsImV4cGVjdGVkUm91dGUiLCJydW4iLCJwZXJtaXR0ZWREZXZpYXRpb25zIiwidGltZW91dEluTXMiLCJwcmVmaXgiLCJmcm9tU3RhdGVBY3Rpb25GbiIsInJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuIiwidG90YWxUaW1lVGFrZW4iLCJUaW1lVGFrZW4iLCJzdGF0ZVRpbWVUYWtlbiIsImFzc2VydGlvblRpbWVvdXRUaW1lciIsImRldmlhdGlvbnMiLCJwZW5kaW5nIiwidW5leHBlY3RlZCIsImNvbnN1bWVSb3V0ZSIsInJlcG9ydCIsIlRhYmxlIiwiZmluYWxpc2VSZXBvcnQiLCJhZGRSb3ciLCJsb2NrIiwiY29udGVudCIsImVudGVyZWRTdGF0ZSIsImV4cGVjdGVkU3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNsZWFyVGltZW91dEFuZFJlc29sdmUiLCJyZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyIiwiY2xlYXJUaW1lb3V0QW5kUmVqZWN0IiwiYmFpbG91dCIsImNvbHVtbnMiLCJhbGlnbm1lbnRzIiwiYWxpZ25tZW50IiwiXyIsImxvY2tlZCIsImNvbCIsInJvdyIsImNvbFNpemVzIiwicGFkTGVmdCIsInJlcGVhdCIsInBhZFJpZ2h0Iiwic2l6ZXMiLCJmb3JtYXRGaWVsZCIsInZhbHVlIiwic2l6ZSIsImFsaWduIiwiZm9ybWF0dGVkUm93Iiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImZtdCIsIm51bSIsImRpZ2l0cyIsInRvRml4ZWQiLCJkdXJhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUVBLElBQUlBLE1BQUo7O0VBS0EsU0FBU0MsYUFBVCxHQUF5Qjs7RUFDekJBLGFBQWEsQ0FBQ0MsU0FBZCxHQUEwQkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUExQjs7RUFFQSxTQUFTQyxZQUFULEdBQXdCO0VBQ3RCQSxFQUFBQSxZQUFZLENBQUNDLElBQWIsQ0FBa0JDLElBQWxCLENBQXVCLElBQXZCO0VBQ0Q7RUFNREYsWUFBWSxDQUFDQSxZQUFiLEdBQTRCQSxZQUE1QjtFQUVBQSxZQUFZLENBQUNHLFlBQWIsR0FBNEIsS0FBNUI7RUFFQUgsWUFBWSxDQUFDSCxTQUFiLENBQXVCRixNQUF2QixHQUFnQ1MsU0FBaEM7RUFDQUosWUFBWSxDQUFDSCxTQUFiLENBQXVCUSxPQUF2QixHQUFpQ0QsU0FBakM7RUFDQUosWUFBWSxDQUFDSCxTQUFiLENBQXVCUyxhQUF2QixHQUF1Q0YsU0FBdkM7RUFJQUosWUFBWSxDQUFDTyxtQkFBYixHQUFtQyxFQUFuQzs7RUFFQVAsWUFBWSxDQUFDQyxJQUFiLEdBQW9CLFlBQVc7RUFDN0IsT0FBS04sTUFBTCxHQUFjLElBQWQ7O0VBQ0EsTUFBSUssWUFBWSxDQUFDRyxZQUFqQixFQUErQjtFQUU3QixRQUFJUixNQUFNLENBQUNhLE1BQVAsQ0FBSixFQUF1RDtFQUd4RDs7RUFFRCxNQUFJLENBQUMsS0FBS0gsT0FBTixJQUFpQixLQUFLQSxPQUFMLEtBQWlCUCxNQUFNLENBQUNXLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEJKLE9BQWxFLEVBQTJFO0VB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
