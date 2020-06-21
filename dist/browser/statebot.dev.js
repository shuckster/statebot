
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

  exports.default = src;

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVib3QuZGV2LmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcm9sbHVwLXBsdWdpbi1ub2RlLWJ1aWx0aW5zQDIuMS4yL25vZGVfbW9kdWxlcy9yb2xsdXAtcGx1Z2luLW5vZGUtYnVpbHRpbnMvc3JjL2VzNi9ldmVudHMuanMiLCIuLi8uLi9zcmMvdXRpbHMuanMiLCIuLi8uLi9zcmMvcGFyc2luZy5qcyIsIi4uLy4uL3NyYy9zdGF0ZWJvdC5qcyIsIi4uLy4uL3NyYy9hc3NlcnRpb25zLmpzIiwiLi4vLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGRvbWFpbjtcblxuLy8gVGhpcyBjb25zdHJ1Y3RvciBpcyB1c2VkIHRvIHN0b3JlIGV2ZW50IGhhbmRsZXJzLiBJbnN0YW50aWF0aW5nIHRoaXMgaXNcbi8vIGZhc3RlciB0aGFuIGV4cGxpY2l0bHkgY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgdG8gZ2V0IGEgXCJjbGVhblwiIGVtcHR5XG4vLyBvYmplY3QgKHRlc3RlZCB3aXRoIHY4IHY0LjkpLlxuZnVuY3Rpb24gRXZlbnRIYW5kbGVycygpIHt9XG5FdmVudEhhbmRsZXJzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjtcbmV4cG9ydCB7RXZlbnRFbWl0dGVyfTtcblxuLy8gbm9kZWpzIG9kZGl0eVxuLy8gcmVxdWlyZSgnZXZlbnRzJykgPT09IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlclxuXG5FdmVudEVtaXR0ZXIudXNpbmdEb21haW5zID0gZmFsc2U7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZG9tYWluID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRvbWFpbiA9IG51bGw7XG4gIGlmIChFdmVudEVtaXR0ZXIudXNpbmdEb21haW5zKSB7XG4gICAgLy8gaWYgdGhlcmUgaXMgYW4gYWN0aXZlIGRvbWFpbiwgdGhlbiBhdHRhY2ggdG8gaXQuXG4gICAgaWYgKGRvbWFpbi5hY3RpdmUgJiYgISh0aGlzIGluc3RhbmNlb2YgZG9tYWluLkRvbWFpbikpIHtcbiAgICAgIHRoaXMuZG9tYWluID0gZG9tYWluLmFjdGl2ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcIm5cIiBhcmd1bWVudCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbi8vIFRoZXNlIHN0YW5kYWxvbmUgZW1pdCogZnVuY3Rpb25zIGFyZSB1c2VkIHRvIG9wdGltaXplIGNhbGxpbmcgb2YgZXZlbnRcbi8vIGhhbmRsZXJzIGZvciBmYXN0IGNhc2VzIGJlY2F1c2UgZW1pdCgpIGl0c2VsZiBvZnRlbiBoYXMgYSB2YXJpYWJsZSBudW1iZXIgb2Zcbi8vIGFyZ3VtZW50cyBhbmQgY2FuIGJlIGRlb3B0aW1pemVkIGJlY2F1c2Ugb2YgdGhhdC4gVGhlc2UgZnVuY3Rpb25zIGFsd2F5cyBoYXZlXG4vLyB0aGUgc2FtZSBudW1iZXIgb2YgYXJndW1lbnRzIGFuZCB0aHVzIGRvIG5vdCBnZXQgZGVvcHRpbWl6ZWQsIHNvIHRoZSBjb2RlXG4vLyBpbnNpZGUgdGhlbSBjYW4gZXhlY3V0ZSBmYXN0ZXIuXG5mdW5jdGlvbiBlbWl0Tm9uZShoYW5kbGVyLCBpc0ZuLCBzZWxmKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRUd28oaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJnMSwgYXJnMikge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZiwgYXJnMSwgYXJnMik7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmLCBhcmcxLCBhcmcyKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdFRocmVlKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1pdE1hbnkoaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJncykge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgZXZlbnRzLCBkb21haW47XG4gIHZhciBuZWVkRG9tYWluRXhpdCA9IGZhbHNlO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PSBudWxsKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGRvbWFpbiA9IHRoaXMuZG9tYWluO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICBpZiAoZG9tYWluKSB7XG4gICAgICBpZiAoIWVyKVxuICAgICAgICBlciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudCcpO1xuICAgICAgZXIuZG9tYWluRW1pdHRlciA9IHRoaXM7XG4gICAgICBlci5kb21haW4gPSBkb21haW47XG4gICAgICBlci5kb21haW5UaHJvd24gPSBmYWxzZTtcbiAgICAgIGRvbWFpbi5lbWl0KCdlcnJvcicsIGVyKTtcbiAgICB9IGVsc2UgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKCFoYW5kbGVyKVxuICAgIHJldHVybiBmYWxzZTtcblxuICB2YXIgaXNGbiA9IHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nO1xuICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICBzd2l0Y2ggKGxlbikge1xuICAgIC8vIGZhc3QgY2FzZXNcbiAgICBjYXNlIDE6XG4gICAgICBlbWl0Tm9uZShoYW5kbGVyLCBpc0ZuLCB0aGlzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGVtaXRPbmUoaGFuZGxlciwgaXNGbiwgdGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIGVtaXRUd28oaGFuZGxlciwgaXNGbiwgdGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgZW1pdFRocmVlKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgICAgYnJlYWs7XG4gICAgLy8gc2xvd2VyXG4gICAgZGVmYXVsdDpcbiAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgZW1pdE1hbnkoaGFuZGxlciwgaXNGbiwgdGhpcywgYXJncyk7XG4gIH1cblxuICBpZiAobmVlZERvbWFpbkV4aXQpXG4gICAgZG9tYWluLmV4aXQoKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmICghZXZlbnRzKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBuZXcgRXZlbnRIYW5kbGVycygpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgICAgaWYgKHByZXBlbmQpIHtcbiAgICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIGlmICghZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBtID0gJGdldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgICAgaWYgKG0gJiYgbSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSkge1xuICAgICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyB0eXBlICsgJyBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgICBlbWl0V2FybmluZyh3KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gZW1pdFdhcm5pbmcoZSkge1xuICB0eXBlb2YgY29uc29sZS53YXJuID09PSAnZnVuY3Rpb24nID8gY29uc29sZS53YXJuKGUpIDogY29uc29sZS5sb2coZSk7XG59XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBnKCkge1xuICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0YXJnZXQsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgcmV0dXJuIGc7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKCFldmVudHMpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKCFsaXN0KVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IChsaXN0Lmxpc3RlbmVyICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRIYW5kbGVycygpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgbGlzdFswXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoIWV2ZW50cylcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmICghZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRIYW5kbGVycygpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwga2V5OyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGRvIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICAgICAgICB9IHdoaWxlIChsaXN0ZW5lcnNbMF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHZhciBldmxpc3RlbmVyO1xuICB2YXIgcmV0O1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmICghZXZlbnRzKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIHtcbiAgICBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICAgIGlmICghZXZsaXN0ZW5lcilcbiAgICAgIHJldCA9IFtdO1xuICAgIGVsc2UgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgICAgcmV0ID0gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl07XG4gICAgZWxzZVxuICAgICAgcmV0ID0gdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0Lm93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuLy8gQWJvdXQgMS41eCBmYXN0ZXIgdGhhbiB0aGUgdHdvLWFyZyB2ZXJzaW9uIG9mIEFycmF5I3NwbGljZSgpLlxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAodmFyIGkgPSBpbmRleCwgayA9IGkgKyAxLCBuID0gbGlzdC5sZW5ndGg7IGsgPCBuOyBpICs9IDEsIGsgKz0gMSlcbiAgICBsaXN0W2ldID0gbGlzdFtrXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIGkpIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0pXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBVVElMU1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXksXG4gIGlzRXZlbnRFbWl0dGVyLFxuICBpc0Z1bmN0aW9uLFxuICBpc1Bvam8sXG4gIGlzU3RyaW5nLFxuICBpc1RlbXBsYXRlTGl0ZXJhbCxcbiAgdW5pcSxcbiAgRGVmZXIsXG4gIE9uY2UsXG4gIFJldm9rYWJsZSxcbiAgUmVmZXJlbmNlQ291bnRlcixcbiAgQXJnVHlwZUVycm9yLFxuICBMb2dnZXJcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAob2JqKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KG9iailcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nXG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnXG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzRXZlbnRFbWl0dGVyIChvYmopIHtcbiAgcmV0dXJuIChcbiAgICBpc09iamVjdChvYmopICYmXG4gICAgaXNGdW5jdGlvbihvYmouZW1pdCkgJiZcbiAgICBpc0Z1bmN0aW9uKG9iai5hZGRMaXN0ZW5lcikgJiZcbiAgICBpc0Z1bmN0aW9uKG9iai5yZW1vdmVMaXN0ZW5lcilcbiAgKVxufVxuXG5mdW5jdGlvbiBpc1Bvam8gKG9iaikge1xuICBpZiAob2JqID09PSBudWxsIHx8ICghaXNPYmplY3Qob2JqKSkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGVcbn1cblxuZnVuY3Rpb24gaXNUZW1wbGF0ZUxpdGVyYWwgKG9iaikge1xuICBpZiAoaXNTdHJpbmcob2JqKSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmouZXZlcnkoaXRlbSA9PiBpc1N0cmluZyhpdGVtKSlcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gdW5pcSAoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0LnJlZHVjZSgoYWNjLCBvbmUpID0+IChhY2MuaW5kZXhPZihvbmUpID09PSAtMSA/IFsuLi5hY2MsIG9uZV0gOiBhY2MpLCBbXSlcbn1cblxuZnVuY3Rpb24gZGVmZXIgKGZuLCAuLi5hcmdzKSB7XG4gIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dChmbiwgMCwgLi4uYXJncylcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gIH1cbn1cbmZ1bmN0aW9uIERlZmVyIChmbikge1xuICByZXR1cm4gKC4uLmFyZ3MpID0+IGRlZmVyKGZuLCAuLi5hcmdzKVxufVxuXG5mdW5jdGlvbiBPbmNlIChmbikge1xuICBjb25zdCB7IHJldm9rZSwgZm46IF9mbiB9ID0gUmV2b2thYmxlKGZuKVxuICBsZXQgcmVzdWx0XG4gIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIHJlc3VsdCA9IF9mbiguLi5hcmdzKVxuICAgIHJldm9rZSgpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbmZ1bmN0aW9uIFJldm9rYWJsZSAoZm4pIHtcbiAgbGV0IHJldm9rZWQgPSBmYWxzZVxuICBsZXQgcmVzdWx0XG4gIHJldHVybiB7XG4gICAgZm46ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoIXJldm9rZWQpIHtcbiAgICAgICAgcmVzdWx0ID0gZm4oLi4uYXJncylcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuICAgIHJldm9rZTogKCkgPT4ge1xuICAgICAgcmV2b2tlZCA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gUmVmZXJlbmNlQ291bnRlciAobmFtZSwga2luZCwgZGVzY3JpcHRpb24sIC4uLmV4cGVjdGluZykge1xuICBjb25zdCBfcmVmcyA9IHt9O1xuICBbLi4uZXhwZWN0aW5nXS5mbGF0KCkuZm9yRWFjaChyZWYgPT4ge1xuICAgIF9yZWZzW3JlZl0gPSAwXG4gIH0pXG4gIGZ1bmN0aW9uIGluY3JlYXNlIChyZWYpIHtcbiAgICBfcmVmc1tyZWZdID0gY291bnRPZihyZWYpICsgMVxuICAgIHJldHVybiAoKSA9PiBkZWNyZWFzZShyZWYpXG4gIH1cbiAgZnVuY3Rpb24gZGVjcmVhc2UgKHJlZikge1xuICAgIGNvbnN0IGNvdW50ID0gY291bnRPZihyZWYpIC0gMVxuICAgIF9yZWZzW3JlZl0gPSBNYXRoLm1heChjb3VudCwgMClcbiAgfVxuICBmdW5jdGlvbiBjb3VudE9mIChyZWYpIHtcbiAgICByZXR1cm4gX3JlZnNbcmVmXSB8fCAwXG4gIH1cbiAgZnVuY3Rpb24gcmVmcyAoKSB7XG4gICAgcmV0dXJuIHsgLi4uX3JlZnMgfVxuICB9XG4gIGZ1bmN0aW9uIHRhYmxlICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoX3JlZnMpLnNvcnQoKVxuICAgICAgLm1hcChrZXkgPT4gW2tleSwgX3JlZnNba2V5XV0pXG4gICAgICAubWFwKChbcmVmLCBjb3VudF0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBba2luZF06IHJlZixcbiAgICAgICAgICByZWZzOiBjb3VudCB8fCAnTm9uZSdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxuICBmdW5jdGlvbiB0b1ZhbHVlICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGVzY3JpcHRpb246IGBTdGF0ZWJvdFske25hbWV9XTogJHtkZXNjcmlwdGlvbn06YCxcbiAgICAgIHRhYmxlOiB0YWJsZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgaW5jcmVhc2U6IGluY3JlYXNlLFxuICAgIGRlY3JlYXNlOiBkZWNyZWFzZSxcbiAgICBjb3VudE9mOiBjb3VudE9mLFxuICAgIHRvVmFsdWU6IHRvVmFsdWUsXG4gICAgcmVmczogcmVmc1xuICB9XG59XG5cbmZ1bmN0aW9uIEFyZ1R5cGVFcnJvciAoZXJyUHJlZml4ID0gJycpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChmbk5hbWUsIHR5cGVNYXAsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBhcmdNYXAgPSBPYmplY3QuZW50cmllcyh0eXBlTWFwKVxuICAgICAgLm1hcCgoW2FyZ05hbWUsIGFyZ1R5cGVdKSA9PiB7XG4gICAgICAgIHJldHVybiB7IGFyZ05hbWUsIGFyZ1R5cGUgfVxuICAgICAgfSlcblxuICAgIGNvbnN0IHNpZ25hdHVyZSA9IE9iamVjdC5rZXlzKHR5cGVNYXApLmpvaW4oJywgJylcblxuICAgIGNvbnN0IGVyciA9IGFyZ3NcbiAgICAgIC5tYXAoKGFyZywgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgeyBhcmdOYW1lLCBhcmdUeXBlIH0gPSBhcmdNYXBbaW5kZXhdXG4gICAgICAgIGlmIChhcmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBgQXJndW1lbnQgdW5kZWZpbmVkOiBcIiR7YXJnTmFtZX1cImBcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlcnJvckRlc2NcbiAgICAgICAgbGV0IHR5cGVOYW1lXG4gICAgICAgIGxldCB0eXBlTWF0Y2hlc1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGFyZ1R5cGUpKSB7XG4gICAgICAgICAgdHlwZU1hdGNoZXMgPSBhcmdUeXBlKGFyZykgPT09IHRydWVcbiAgICAgICAgICB0eXBlTmFtZSA9IGFyZ1R5cGUubmFtZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGAke3R5cGVOYW1lfSgke2FyZ05hbWV9KSBkaWQgbm90IHJldHVybiB0cnVlYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB2YWxpZC10eXBlb2ZcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IHR5cGVvZiBhcmcgPT09IGFyZ1R5cGVcbiAgICAgICAgICB0eXBlTmFtZSA9IGFyZ1R5cGVcbiAgICAgICAgICBlcnJvckRlc2MgPSBgQXJndW1lbnQgXCIke2FyZ05hbWV9XCIgc2hvdWxkIGJlIGEgJHt0eXBlTmFtZX1gXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXR5cGVNYXRjaGVzKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGAke2Vycm9yRGVzY306ICR7YXJnTmFtZX0gPT09ICR7dHlwZW9mIGFyZ30oJHthcmd9KWBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG5cbiAgICBpZiAoIWVyci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgYFxcbiR7ZXJyUHJlZml4fSR7Zm5OYW1lfSgke3NpZ25hdHVyZX0pOlxcbmAgK1xuICAgICAgICBgJHtlcnIubWFwKGVyciA9PiBgPiAke2Vycn1gKS5qb2luKCdcXG4nKX1gXG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIExvZ2dlciAobGV2ZWwpIHtcbiAgbGV0IF9sZXZlbCA9IGxldmVsXG4gIGlmIChpc1N0cmluZyhfbGV2ZWwpKSB7XG4gICAgX2xldmVsID0gKHtcbiAgICAgIGluZm86IDMsXG4gICAgICBsb2c6IDIsXG4gICAgICB3YXJuOiAxLFxuICAgICAgbm9uZTogMFxuICAgIH0pW19sZXZlbF0gfHwgM1xuICB9XG4gIGZ1bmN0aW9uIGNhbldhcm4gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMVxuICB9XG4gIGZ1bmN0aW9uIGNhbkxvZyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAyXG4gIH1cbiAgZnVuY3Rpb24gY2FuSW5mbyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAzXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjYW5XYXJuLFxuICAgIGNhbkxvZyxcbiAgICBjYW5JbmZvLFxuXG4gICAgaW5mbzogKC4uLmFyZ3MpID0+IGNhbkluZm8oKSAmJiBjb25zb2xlLmluZm8oLi4uYXJncyksXG4gICAgdGFibGU6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLnRhYmxlKC4uLmFyZ3MpLFxuICAgIGxvZzogKC4uLmFyZ3MpID0+IGNhbkxvZygpICYmIGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuICAgIHdhcm46ICguLi5hcmdzKSA9PiBjYW5XYXJuKCkgJiYgY29uc29sZS53YXJuKC4uLmFyZ3MpLFxuICAgIGVycm9yOiAoLi4uYXJncykgPT4gY29uc29sZS5lcnJvciguLi5hcmdzKVxuICB9XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBDSEFSVC9ST1VURSBQQVJTSU5HXG4vL1xuXG5jb25zdCByeENSTEYgPSAvW1xcclxcbl0vXG5jb25zdCBjeFBpcGUgPSAnfCdcbmNvbnN0IGN4QXJyb3cgPSAnLT4nXG5jb25zdCByeE9wZXJhdG9ycyA9IFtjeFBpcGUsIGN4QXJyb3ddXG4gIC5tYXAocnhVbnNhZmUgPT4gcnhVbnNhZmUucmVwbGFjZSgnfCcsICdcXFxcfCcpKVxuICAuam9pbignfCcpXG5cbmNvbnN0IHJ4TGluZUNvbnRpbnVhdGlvbnMgPSBuZXcgUmVnRXhwKGAoJHtyeE9wZXJhdG9yc30pJGApXG5jb25zdCByeERpc2FsbG93ZWRDaGFyYWN0ZXJzID0gL1teYS16MC05IUAjJCVeJio6Xys9PD58fi5cXHgyRF0vZ2lcbmNvbnN0IHJ4Q29tbWVudCA9IC8oXFwvXFwvW15cXG5cXHJdKikvXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjeFBpcGUsXG4gIGN4QXJyb3csXG4gIHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsXG4gIGRlY29tcG9zZUNoYXJ0LFxuICBkZWNvbXBvc2VSb3V0ZVxufVxuXG5jb25zdCB7IHVuaXEsIEFyZ1R5cGVFcnJvciwgaXNUZW1wbGF0ZUxpdGVyYWwgfSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlICh0ZW1wbGF0ZUxpdGVyYWwpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VSb3V0ZScsXG4gICAgeyB0ZW1wbGF0ZUxpdGVyYWw6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgdGVtcGxhdGVMaXRlcmFsXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlZExpbmVzKHRlbXBsYXRlTGl0ZXJhbClcbiAgY29uc3QgZmxhdHRlbmVkUm91dGUgPSB0b2tlbmlzZWRMaW5lcyhsaW5lcykuZmxhdCgyKVxuICByZXR1cm4gZmxhdHRlbmVkUm91dGVcbn1cblxuLyoqXG4gKiBEZWNvbXBvc2UgYSB7QGxpbmsgc3RhdGVib3RDaGFydH0gaW50byBhbiBvYmplY3Qgb2YgYHN0YXRlc2AsIGByb3V0ZXNgLFxuICogYW5kIGB0cmFuc2l0aW9uc2AuXG4gKlxuICogU3RhdGVib3QoKSB1c2VzIHRoaXMgaW50ZXJuYWxseSB0byBwYXJzZSBjaGFydHMuIEV4cG9zZWQgZm9yIGRlYnVnZ2luZy5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICogQHJldHVybnMge09iamVjdH1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydGBcbiAqICAgcGVuZGluZyAtPlxuICogICAgIHN1Y2Nlc3MgfCBmYWlsdXJlXG4gKiBgXG4gKiAvLyBzdGF0ZXMgPSBbJ3BlbmRpbmcnLCAnc3VjY2VzcycsICdmYWlsdXJlJ11cbiAqIC8vIHJvdXRlcyA9IFsgJ3BlbmRpbmctPnN1Y2Nlc3MnLCAncGVuZGluZy0+ZmFpbHVyZSddXG4gKiAvLyB0cmFuc2l0aW9ucyA9IFtcbiAqIC8vICAgWydwZW5kaW5nJywgJ3N1Y2Nlc3MnXSxcbiAqIC8vICAgWydwZW5kaW5nJywgJ2ZhaWx1cmUnXVxuICogLy8gXVxuICovXG5cbmZ1bmN0aW9uIGRlY29tcG9zZUNoYXJ0IChjaGFydCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZUNoYXJ0JyxcbiAgICB7IGNoYXJ0OiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIGNoYXJ0XG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlZExpbmVzKGNoYXJ0KVxuICBjb25zdCBsaW5lc09mVG9rZW5zID0gdG9rZW5pc2VkTGluZXMobGluZXMpXG4gIGNvbnN0IGxpbmVzT2ZSb3V0ZXMgPSBsaW5lc09mVG9rZW5zXG4gICAgLm1hcChkZWNvbXBvc2VSb3V0ZUZyb21Ub2tlbnMpXG4gICAgLmZsYXQoMSlcblxuICBjb25zdCBsaW5lc09mVHJhbnNpdGlvbnMgPSBsaW5lc09mUm91dGVzXG4gICAgLm1hcChkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSlcbiAgICAuZmxhdCgxKVxuXG4gIGNvbnN0IHN0YXRlcyA9IFtdXG4gIGNvbnN0IHJvdXRlS2V5cyA9IGxpbmVzT2ZUcmFuc2l0aW9ucy5tYXAocm91dGUgPT4ge1xuICAgIHN0YXRlcy5wdXNoKC4uLnJvdXRlKVxuICAgIHJldHVybiByb3V0ZS5qb2luKGN4QXJyb3cpXG4gIH0pXG5cbiAgY29uc3QgZmlsdGVyZWRSb3V0ZXMgPSB1bmlxKHJvdXRlS2V5cylcbiAgY29uc3QgZmlsdGVyZWRTdGF0ZXMgPSB1bmlxKHN0YXRlcylcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2l0aW9uczogZmlsdGVyZWRSb3V0ZXMubWFwKHJvdXRlID0+IHJvdXRlLnNwbGl0KGN4QXJyb3cpKSxcbiAgICByb3V0ZXM6IGZpbHRlcmVkUm91dGVzLFxuICAgIHN0YXRlczogZmlsdGVyZWRTdGF0ZXNcbiAgfVxufVxuXG5mdW5jdGlvbiBsaW5lc0Zyb20gKHN0ck9yQXJyKSB7XG4gIHJldHVybiBbc3RyT3JBcnJdXG4gICAgLmZsYXQoKVxuICAgIC5yZWR1Y2UoKGFjYywgbGluZSkgPT4gWy4uLmFjYywgbGluZS5zcGxpdChyeENSTEYpXSwgW10pXG4gICAgLmZsYXQoKVxufVxuXG5mdW5jdGlvbiBjb25kZW5zZWRMaW5lcyAoc3RyT3JBcnIpIHtcbiAgY29uc3QgaW5wdXQgPSBsaW5lc0Zyb20oc3RyT3JBcnIpXG4gIGNvbnN0IG91dHB1dCA9IFtdXG5cbiAgaW5wdXQucmVkdWNlKChjb25kZW5zZWRMaW5lLCBsaW5lKSA9PiB7XG4gICAgY29uc3Qgc2FuaXRpc2VkTGluZSA9IGxpbmVcbiAgICAgIC5yZXBsYWNlKHJ4Q29tbWVudCwgJycpXG4gICAgICAucmVwbGFjZShyeERpc2FsbG93ZWRDaGFyYWN0ZXJzLCAnJylcblxuICAgIGlmICghc2FuaXRpc2VkTGluZSkge1xuICAgICAgcmV0dXJuIGNvbmRlbnNlZExpbmVcbiAgICB9XG5cbiAgICBpZiAocnhMaW5lQ29udGludWF0aW9ucy50ZXN0KHNhbml0aXNlZExpbmUpKSB7XG4gICAgICByZXR1cm4gY29uZGVuc2VkTGluZSArIHNhbml0aXNlZExpbmVcbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChjb25kZW5zZWRMaW5lICsgc2FuaXRpc2VkTGluZSlcbiAgICByZXR1cm4gJydcbiAgfSwgJycpXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5mdW5jdGlvbiB0b2tlbmlzZWRMaW5lcyAobGluZXMpIHtcbiAgcmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IGxpbmUuc3BsaXQoY3hBcnJvdykubWFwKHN0ciA9PiBzdHIuc3BsaXQoY3hQaXBlKSkpXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlRnJvbVRva2VucyAobGluZSkge1xuICBjb25zdCBvdXRwdXQgPSBbXVxuXG4gIGxpbmUucmVkdWNlKChwcmV2aW91c1N0YXRlcywgc3RhdGVzKSA9PiB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGVzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFsuLi5zdGF0ZXNdXG4gICAgfVxuXG4gICAgb3V0cHV0LnB1c2goW3ByZXZpb3VzU3RhdGVzLCBbLi4uc3RhdGVzXV0pXG4gICAgcmV0dXJuIFsuLi5zdGF0ZXNdXG4gIH0sIGZhbHNlKVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlVHJhbnNpdGlvbnNGcm9tUm91dGUgKFtmcm9tU3RhdGVzLCB0b1N0YXRlc10pIHtcbiAgcmV0dXJuIGZyb21TdGF0ZXMucmVkdWNlKChhY2MsIGZyb21TdGF0ZSkgPT4gW1xuICAgIC4uLmFjYyxcbiAgICAuLi50b1N0YXRlcy5tYXAodG9TdGF0ZSA9PiB7XG4gICAgICByZXR1cm4gW2Zyb21TdGF0ZSwgdG9TdGF0ZV1cbiAgICB9KVxuICBdLCBbXSlcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEZTTVxuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN0YXRlYm90LFxuICBpc1N0YXRlYm90XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBTdGF0ZWJvdC5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBzdGF0ZWJvdE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAqICBUaGUgc3RhdGUtY2hhcnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3N0YXJ0SW49YXV0b11cbiAqICBUaGUgc3RhdGUgaW4gd2hpY2ggdG8gc3RhcnQuIElmIHVuc3BlY2lmaWVkLCB0aGUgZmlyc3Qgc3RhdGUgaW4gdGhlXG4gKiAgY2hhcnQgd2lsbCBiZSB1c2VkLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIEhvdyBub2lzeSB0aGUgbG9nZ2luZyBpcywgZnJvbSAxIHRvIDM6XG4gKiAgYGBgXG4gKiAgMSkgY29uc29sZS53YXJuXG4gKiAgMikgY29uc29sZS53YXJuL2xvZy90YWJsZVxuICogIDMpIGNvbnNvbGUud2Fybi9sb2cvdGFibGUvaW5mb1xuICogIGBgYFxuICogIGAzYCBpcyB0aGUgZGVmYXVsdC4gQXJndW1lbnQgdHlwZS1lcnJvcnMgd2lsbCBhbHdheXMgYHRocm93YC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbaGlzdG9yeUxpbWl0PTJdXG4gKiAgTGltaXQgaG93IG11Y2ggaGlzdG9yeSB0aGUgc3RhdGUtbWFjaGluZSBrZWVwcy4gQWNjZXNzZWQgdmlhXG4gKiAge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3Rvcnl8c3RhdGVib3RGc20jaGlzdG9yeSgpfS5cbiAqIEBwcm9wZXJ0eSB7ZXZlbnRzfSBbZXZlbnRzXVxuICogIElmIHlvdSB3aXNoIHRvIGhhdmUgeW91ciBTdGF0ZWJvdHMgbGlzdGVuIHRvIGV2ZW50cyBjb21pbmcgZnJvbVxuICogIGEgc2hhcmVkIEV2ZW50RW1pdHRlciwgeW91IGNhbiBwYXNzIGl0IGluIGhlcmUuIFRoZSBgZW1pdCgpYC9gb25FdmVudCgpYC9cbiAqICBgcGVyZm9ybVRyYW5zaXRpb25zKClgIG1ldGhvZHMgd2lsbCB1c2UgaXQuXG4gKlxuICogIEl0IHNob3VsZCBoYXZlIHRoZSBzYW1lIHNpZ25hdHVyZSBhcyB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfY2xhc3NfZXZlbnRlbWl0dGVyfEV2ZW50RW1pdHRlcn0uXG4gKi9cblxuLyoqXG4gKiBBIGRlc2NyaXB0aW9uIG9mIGFsbCB0aGUgc3RhdGVzIGluIGEgbWFjaGluZSwgcGx1cyBhbGwgb2YgdGhlXG4gKiBwZXJtaXR0ZWQgdHJhbnNpdGlvbnMgYmV0d2VlbiB0aGVtLlxuICpcbiAqIFRoaXMgaXMgZGVmaW5lZCB1c2luZyBhIGBzdHJpbmdgIG9yIGFuIGBhcnJheWAgb2Ygc3RyaW5ncywgYnV0XG4gKiAge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL1RlbXBsYXRlX2xpdGVyYWxzfFRlbXBsYXRlIExpdGVyYWxzfVxuICogYXJlIG11Y2ggbW9yZSBjb252ZW5pZW50LlxuICpcbiAqIEFuIGFycm93IGAtPmAgY29uZmlndXJlcyBhICoqcGVybWl0dGVkIHRyYW5zaXRpb24qKiBiZXR3ZWVuIHR3byBzdGF0ZXM6XG4gKlxuICogYGBgXG4gKiBmcm9tLXN0YXRlIC0+IHRvLXN0YXRlXG4gKiBgYGBcbiAqXG4gKiBJdCdzIHRoZSBvbmx5IG9wZXJhdG9yIG5lZWRlZCB0byBidWlsZCBhbnkgY2hhcnQ6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkXG4gKiAgIHBlbmRpbmcgLT4gcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBUaGUgXCJPUlwiIG9wZXJhdG9yIGB8YCBjYW4gaGVscCB1cyByZW1vdmUgc29tZSByZWR1bmRhbmN5IGZyb20gdGhlIGFib3ZlIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBJbiBib3RoIGNoYXJ0cywgYHBlbmRpbmdgIGNhbiB0cmFuc2l0aW9uIHRvIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCwgYW5kXG4gKiBgcmVzb2x2ZWRgIG9yIGByZWplY3RlZGAgY2FuIGJvdGggdHJhbnNpdGlvbiB0byBgZG9uZWAuXG4gKlxuICogV2UgY2FuIHN0cmVhbWxpbmUgdGhpcyBldmVuIGZ1cnRoZXI6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IChyZXNvbHZlZCB8IHJlamVjdGVkKSAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBBZ2FpbiwgdGhpcyBpcyBleGFjdGx5IGVxdWl2YWxlbnQgdG8gdGhlIHByZXZpb3VzIHR3byBleGFtcGxlcy5cbiAqXG4gKiBOb3RpY2UgaW4gdGhpcyBvbmUgdGhhdCB3ZSBoYXZlIHBhcmVudGhlc2VzIGAoYCBgKWAgc3Vycm91bmRpbmcgYHJlc29sdmVkYFxuICogYW5kIGByZWplY3RlZGAuIFRoZXkgYXJlIGFjdHVhbGx5IGNvbXBsZXRlbHkgaWdub3JlZCBieSB0aGUgcGFyc2VyLCBhbmRcbiAqIHlvdSBjYW4gdXNlIHRoZW0gYXMgeW91IHBsZWFzZSB0byBoZWxwIG1ha2UgeW91ciBjaGFydHMgbW9yZSByZWFkYWJsZS5cbiAqXG4gKiBBIGNoYXJ0IHdvcmtzIGV4YWN0bHkgdGhlIHNhbWUgd2l0aG91dCB0aGVtOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIENoYXJ0cyBjYW4gYWxzbyBiZSBzcGxpdCBhY3Jvc3MgbXVsdGlwbGUtbGluZXM6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+XG4gKiAgIHJlc29sdmVkIHxcbiAqICAgcmVqZWN0ZWQgLT5cbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKiBOb3RpY2UgdGhhdCBhbGwgd2hpdGUtc3BhY2UgaXMgaWdub3JlZCBvbiBlaXRoZXIgc2lkZSBvZiB0aGUgYC0+YFxuICogYW5kIGB8YC5cbiAqXG4gKiBgLy8gQ29tbWVudHMgb2YgdGhpcyBraW5kIGFyZSBhbGxvd2VkLCB0b286YFxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiAvLyBXaGVyZSBkbyB3ZSBnbyBmcm9tIGhlcmU/XG4gKiAgICAgKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IC8vIEFoLCB5ZXNcbiAqXG4gKiAgIC8vIEFuZCBub3cgd2UncmUgYWxsIGZpbmlzaGVkXG4gKiAgIGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEZpbmFsbHksIGhlcmUncyBhIG1vcmUgZnVsbCBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgZHJhZ0Ryb3BDaGFydCA9IGBcbiAqICAgaWRsZSAtPlxuICogICAgIGRyYWctZGV0ZWN0IC0+XG4gKiAgICAgICAoZHJhZ2dpbmcgfCBjbGlja2VkKVxuICpcbiAqICAgLy8gSnVzdCBhIGNsaWNrLCBiYWlsLW91dCFcbiAqICAgY2xpY2tlZCAtPiBpZGxlXG4gKlxuICogICAvLyBEcmFnIGRldGVjdGVkIVxuICogICBkcmFnZ2luZyAtPlxuICogICAgIGRyYWctd2FpdCAtPiBkcmFnZ2VkIC0+IGRyYWctd2FpdFxuICpcbiAqICAgLy8gRHJhZyBmaW5pc2hlZC4uLlxuICogICAoZHJhZy13YWl0IHwgZHJhZ2dlZCkgLT5cbiAqICAgICAoZHJhZy1kb25lIHwgZHJhZy1jYW5jZWwpIC0+XG4gKiAgICAgICBpZGxlXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZWJvdENoYXJ0XG4gKi9cblxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jb25zdCB7XG4gIGlzQXJyYXksXG4gIGlzRXZlbnRFbWl0dGVyLFxuICBpc0Z1bmN0aW9uLFxuICBpc1Bvam8sXG4gIGlzU3RyaW5nLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlcixcbiAgUmVmZXJlbmNlQ291bnRlclxufSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCB7IGRlY29tcG9zZUNoYXJ0LCBjeEFycm93IH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuXG4vKipcbiAqIENyZWF0ZSBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IGBvYmplY3RgLlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGVtbWluZycsIHtcbiAqICAgY2hhcnQ6IGBcbiAqICAgICB3YWxraW5nIC0+IChkaWdnaW5nIHwgYnVpbGRpbmcgfCBmYWxsaW5nKSAtPlxuICogICAgICAgd2Fsa2luZ1xuICpcbiAqICAgICBmYWxsaW5nIC0+IHNwbGF0dGluZ1xuICogICAgIHdhbGtpbmcgLT4gZXhpdGluZ1xuICogICBgXG4gKiB9KVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiAgR2l2ZSB5b3VyIFN0YXRlYm90IGEgbmFtZS4gVXNlZCBmb3IgbG9nZ2luZyBhbmQgYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9LlxuICogQHBhcmFtIHtzdGF0ZWJvdE9wdGlvbnN9IG9wdGlvbnNcbiAqL1xuXG5mdW5jdGlvbiBTdGF0ZWJvdCAobmFtZSwgb3B0aW9ucykge1xuICBpZiAoIWlzU3RyaW5nKG5hbWUpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdcXG5TdGF0ZWJvdDogUGxlYXNlIHNwZWNpZnkgYSBuYW1lIGZvciB0aGlzIG1hY2hpbmUnKVxuICB9XG5cbiAgY29uc3QgbG9nUHJlZml4ID0gYFN0YXRlYm90WyR7bmFtZX1dYFxuICBpZiAoIWlzUG9qbyhvcHRpb25zKSkge1xuICAgIHRocm93IFR5cGVFcnJvcihgXFxuJHtsb2dQcmVmaXh9OiBQbGVhc2Ugc3BlY2lmeSBvcHRpb25zIGZvciB0aGlzIG1hY2hpbmVgKVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGNoYXJ0ID0gdW5kZWZpbmVkLFxuICAgIGxvZ0xldmVsID0gMyxcbiAgICBoaXN0b3J5TGltaXQgPSAyXG4gIH0gPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKGAke2xvZ1ByZWZpeH0jYClcbiAgY29uc3QgY29uc29sZSA9IExvZ2dlcihsb2dMZXZlbClcbiAgY29uc3QgeyBjYW5XYXJuIH0gPSBjb25zb2xlXG5cbiAgY29uc3Qge1xuICAgIHN0YXRlcyA9IFtdLFxuICAgIHJvdXRlcyA9IFtdXG4gIH0gPSBjaGFydCA/IGRlY29tcG9zZUNoYXJ0KGNoYXJ0KSA6IG9wdGlvbnNcblxuICBjb25zdCB7IHN0YXJ0SW4gPSBzdGF0ZXNbMF0gfSA9IG9wdGlvbnNcbiAgaWYgKCFzdGF0ZXMuaW5jbHVkZXMoc3RhcnRJbikpIHtcbiAgICB0aHJvdyBFcnJvcihgJHtsb2dQcmVmaXh9OiBTdGFydGluZy1zdGF0ZSBub3QgaW4gY2hhcnQ6IFwiJHtzdGFydElufVwiYClcbiAgfVxuXG4gIGxldCB0cmFuc2l0aW9uSWQgPSAwXG4gIGNvbnN0IHN0YXRlSGlzdG9yeSA9IFtzdGFydEluXVxuICBjb25zdCBzdGF0ZUhpc3RvcnlMaW1pdCA9IE1hdGgubWF4KGhpc3RvcnlMaW1pdCwgMilcbiAgY29uc3QgZXZlbnRzID0gaXNFdmVudEVtaXR0ZXIob3B0aW9ucy5ldmVudHMpID8gb3B0aW9ucy5ldmVudHMgOiBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBjb25zdCBpbnRlcm5hbEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBjb25zdCBJTlRFUk5BTF9FVkVOVFMgPSB7XG4gICAgb25Td2l0Y2hpbmc6ICcoQU5ZKXN0YXRlOmNoYW5naW5nJyxcbiAgICBvblN3aXRjaGVkOiAnKEFOWSlzdGF0ZTpjaGFuZ2VkJ1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdEludGVybmFsRXZlbnQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIHJldHVybiBpbnRlcm5hbEV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uSW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCBmbikge1xuICAgIGludGVybmFsRXZlbnRzLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZm4pXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGludGVybmFsRXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgZm4pXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RhdGVzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAnc3RhdGVzJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXMnLFxuICAgIFsuLi5zdGF0ZXNdXG4gIClcbiAgY29uc3Qgcm91dGVzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAndHJhbnNpdGlvbnMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnMnLFxuICAgIFsuLi5yb3V0ZXNdXG4gIClcbiAgY29uc3QgZXZlbnRzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAnZXZlbnRzJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50cydcbiAgKVxuXG4gIC8vIEludGVycHJldHMgb25UcmFuc2l0aW9ucygpIGFuZCBwZXJmb3JtVHJhbnNpdGlvbnMoKVxuICBmdW5jdGlvbiBhcHBseUhpdGNoZXIgKGhpdGNoZXIsIGZuTmFtZSkge1xuICAgIGNvbnN0IGhpdGNoZXJBY3Rpb25zID1cbiAgICAgIGlzRnVuY3Rpb24oaGl0Y2hlcilcbiAgICAgICAgPyBoaXRjaGVyKHsgZW50ZXIsIGVtaXQsIEVudGVyLCBFbWl0IH0pXG4gICAgICAgIDogaXNQb2pvKGhpdGNoZXIpXG4gICAgICAgICAgPyBoaXRjaGVyXG4gICAgICAgICAgOiBudWxsXG5cbiAgICBpZiAoIWlzUG9qbyhoaXRjaGVyQWN0aW9ucykpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBFeHBlY3RlZCBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdGBcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBldmVudHMgPSB7fVxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gW11cblxuICAgIE9iamVjdC5lbnRyaWVzKGhpdGNoZXJBY3Rpb25zKVxuICAgICAgLmZvckVhY2goKFtyb3V0ZUNoYXJ0LCBhY3Rpb25PckNvbmZpZ10pID0+IHtcbiAgICAgICAgLy8gb25UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oYWN0aW9uT3JDb25maWcpKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogYWN0aW9uT3JDb25maWcgfSlcbiAgICAgICAgfSBlbHNlIGlmICghaXNQb2pvKGFjdGlvbk9yQ29uZmlnKSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBjb25zdCB7IG9uOiBfb24sIHRoZW46IF90aGVuIH0gPSBhY3Rpb25PckNvbmZpZ1xuICAgICAgICBpZiAoaXNTdHJpbmcoX29uKSB8fCBpc0FycmF5KF9vbikpIHtcbiAgICAgICAgICBjb25zdCBldmVudE5hbWVzID0gW19vbl0uZmxhdCgpXG4gICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdXG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBfdGhlbiB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihfdGhlbikpIHtcbiAgICAgICAgICAvLyBvblRyYW5zaXRpb25zIDIvMy4uLlxuICAgICAgICAgIC8vIChCZWhhdmUgbGlrZSBvblRyYW5zaXRpb25zIGlmIGEgY29uZmlnIGlzIHNwZWNpZmllZCwgYnV0XG4gICAgICAgICAgLy8gIHRoZXJlIGlzIG5vIFwib25cIiBldmVudC4uLilcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgY29uc3QgYWxsU3RhdGVzID0gW11cbiAgICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDIvMy4uLlxuICAgIGNvbnN0IGRlY29tcG9zZWRFdmVudHMgPSBPYmplY3QuZW50cmllcyhldmVudHMpXG4gICAgICAucmVkdWNlKChhY2MsIFtldmVudE5hbWUsIF9jb25maWdzXSkgPT4ge1xuICAgICAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCBjb25maWdzIH0gPSBkZWNvbXBvc2VDb25maWdzKF9jb25maWdzLCBjYW5XYXJuKVxuICAgICAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICBbZXZlbnROYW1lXTogY29uZmlnc1xuICAgICAgICB9XG4gICAgICB9LCB7fSlcblxuICAgIGNvbnN0IGFsbENsZWFudXBGbnMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGFsbENsZWFudXBGbnMucHVzaChcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKGRlY29tcG9zZWRFdmVudHMpXG4gICAgICAgIC5tYXAoKFtldmVudE5hbWUsIGNvbmZpZ3NdKSA9PlxuICAgICAgICAgIFtcbiAgICAgICAgICAgIGV2ZW50c0hhbmRsZWQuaW5jcmVhc2UoZXZlbnROYW1lKSxcbiAgICAgICAgICAgIG9uRXZlbnQoZXZlbnROYW1lLCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBldmVudFdhc0hhbmRsZWQgPSBjb25maWdzLnNvbWUoXG4gICAgICAgICAgICAgICAgKHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc2VkID0gaW5TdGF0ZShmcm9tU3RhdGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50ZXIodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiguLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgcmV0dXJuICEhcGFzc2VkXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICBpZiAoIWV2ZW50V2FzSGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25Ob09wKGBFdmVudCBub3QgaGFuZGxlZDogXCIke2V2ZW50TmFtZX1cImApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICApLmZsYXQoKVxuICAgIClcblxuICAgIC8vIG9uVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgY29uc3QgdHJhbnNpdGlvbkNvbmZpZ3MgPSBkZWNvbXBvc2VDb25maWdzKHRyYW5zaXRpb25zLCBjYW5XYXJuKVxuXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgYWxsU3RhdGVzLnB1c2goLi4udHJhbnNpdGlvbkNvbmZpZ3Muc3RhdGVzKVxuICAgICAgYWxsUm91dGVzLnB1c2goLi4udHJhbnNpdGlvbkNvbmZpZ3Mucm91dGVzKVxuICAgIH1cblxuICAgIGFsbENsZWFudXBGbnMucHVzaChcbiAgICAgIC4uLnRyYW5zaXRpb25Db25maWdzLmNvbmZpZ3MubWFwKHRyYW5zaXRpb24gPT4ge1xuICAgICAgICBjb25zdCB7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH0gPSB0cmFuc2l0aW9uXG4gICAgICAgIGNvbnN0IHJvdXRlID0gYCR7ZnJvbVN0YXRlfS0+JHt0b1N0YXRlfWBcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICByb3V0ZXNIYW5kbGVkLmluY3JlYXNlKHJvdXRlKSxcbiAgICAgICAgICBvbkludGVybmFsRXZlbnQocm91dGUsIGFjdGlvbilcbiAgICAgICAgXVxuICAgICAgfSkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gRGVidWdnaW5nLCBpZiB3ZSdyZSBhdCB0aGUgcmlnaHQgbGV2ZWxcbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBjb25zdCBpbnZhbGlkU3RhdGVzID0gYWxsU3RhdGVzLmZpbHRlcihzdGF0ZSA9PiAhc3RhdGVzLmluY2x1ZGVzKHN0YXRlKSlcbiAgICAgIGNvbnN0IGludmFsaWRSb3V0ZXMgPSBhbGxSb3V0ZXMuZmlsdGVyKHJvdXRlID0+ICFyb3V0ZXMuaW5jbHVkZXMocm91dGUpKVxuICAgICAgaWYgKGludmFsaWRTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgc3RhdGVzIHNwZWNpZmllZDpcXG5gICtcbiAgICAgICAgICBpbnZhbGlkU3RhdGVzLm1hcChzdGF0ZSA9PiBgICA+IFwiJHtzdGF0ZX1cImApLmpvaW4oJ1xcbicpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmIChpbnZhbGlkUm91dGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBJbnZhbGlkIHRyYW5zaXRpb25zIHNwZWNpZmllZDpcXG5gICtcbiAgICAgICAgICBpbnZhbGlkUm91dGVzLm1hcChyb3V0ZSA9PiBgICA+IFwiJHtyb3V0ZX1cImApLmpvaW4oJ1xcbicpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gYWxsQ2xlYW51cEZucy5mb3JFYWNoKGZuID0+IGZuKCkpXG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1N0YXRlICgpIHtcbiAgICByZXR1cm4gc3RhdGVIaXN0b3J5W3N0YXRlSGlzdG9yeS5sZW5ndGggLSAyXVxuICB9XG5cbiAgZnVuY3Rpb24gY3VycmVudFN0YXRlICgpIHtcbiAgICByZXR1cm4gc3RhdGVIaXN0b3J5W3N0YXRlSGlzdG9yeS5sZW5ndGggLSAxXVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuVHJhbnNpdGlvblRvICguLi5zdGF0ZXMpIHtcbiAgICBjb25zdCB0ZXN0U3RhdGVzID0gc3RhdGVzLmZsYXQoKVxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignY2FuVHJhbnNpdGlvblRvJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgdGVzdFN0YXRlc1swXSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGlmICghdGVzdFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZXMgPSBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgcmV0dXJuIHRlc3RTdGF0ZXMuZXZlcnkoc3RhdGUgPT4gbmV4dFN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gIH1cblxuICBmdW5jdGlvbiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSAoc3RhdGUpIHtcbiAgICBjb25zdCBfc3RhdGUgPSBzdGF0ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHN0YXRlXG4gICAgICA6IGN1cnJlbnRTdGF0ZSgpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3N0YXRlc0F2YWlsYWJsZUZyb21IZXJlJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgX3N0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlcy5yZWR1Y2UoKGFjYywgcm91dGUpID0+IHtcbiAgICAgIGNvbnN0IFtmcm9tU3RhdGUsIHRvU3RhdGVdID0gcm91dGUuc3BsaXQoY3hBcnJvdylcbiAgICAgICAgLm1hcChzdGF0ZSA9PiBzdGF0ZS50cmltKCkpXG5cbiAgICAgIGlmIChmcm9tU3RhdGUgPT09IF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gWy4uLmFjYywgdG9TdGF0ZV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGluU3RhdGUgKHN0YXRlLCBhbnlPckZuLCAuLi5mbkFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2luU3RhdGUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGNvbmRpdGlvbk1hdGNoZXMgPSBjdXJyZW50U3RhdGUoKSA9PT0gc3RhdGVcblxuICAgIGlmIChhbnlPckZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghY29uZGl0aW9uTWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKGlzRnVuY3Rpb24oYW55T3JGbikpIHtcbiAgICAgICAgcmV0dXJuIGFueU9yRm4oLi4uZm5BcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFueU9yRm5cbiAgICB9XG5cbiAgICByZXR1cm4gY29uZGl0aW9uTWF0Y2hlc1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbWl0JywgeyBldmVudE5hbWU6IGlzU3RyaW5nIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBldmVudHMuZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBlbnRlciAoc3RhdGUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VudGVyJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCB0b1N0YXRlID0gc3RhdGVcblxuICAgIGlmICh0b1N0YXRlID09PSBpblN0YXRlKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgQWxyZWFkeSBpbiBzdGF0ZTogXCIke3RvU3RhdGV9XCJgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZXMuaW5jbHVkZXModG9TdGF0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHN0YXRlIFwiJHt0b1N0YXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRSb3V0ZSA9IGAke2luU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgIGlmICghcm91dGVzLmluY2x1ZGVzKG5leHRSb3V0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHRyYW5zaXRpb24gXCIke25leHRSb3V0ZX1cIiwgbm90IHN3aXRjaGluZ2ApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBGZWxsLXRocm91Z2gsIGNhbiBlbnRlciBuZXh0IHN0YXRlXG4gICAgY29uc29sZS5pbmZvKGAke2xvZ1ByZWZpeH06IHRJZDwkeysrdHJhbnNpdGlvbklkfT46ICR7bmV4dFJvdXRlfWApXG5cbiAgICBzdGF0ZUhpc3RvcnkucHVzaCh0b1N0YXRlKVxuICAgIGlmIChzdGF0ZUhpc3RvcnkubGVuZ3RoID4gc3RhdGVIaXN0b3J5TGltaXQpIHtcbiAgICAgIHN0YXRlSGlzdG9yeS5zaGlmdCgpXG4gICAgfVxuXG4gICAgZW1pdEludGVybmFsRXZlbnQoSU5URVJOQUxfRVZFTlRTLm9uU3dpdGNoaW5nLCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KG5leHRSb3V0ZSwgLi4uYXJncylcbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMub25Td2l0Y2hlZCwgdG9TdGF0ZSwgaW5TdGF0ZSwgLi4uYXJncylcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBvbkV2ZW50IChldmVudE5hbWUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkV2ZW50JywgeyBldmVudE5hbWU6IGlzU3RyaW5nLCBjYjogaXNGdW5jdGlvbiB9LCBldmVudE5hbWUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgZXZlbnRzLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gICAgcmV0dXJuICgpID0+IGV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGNiKVxuICB9XG5cbiAgY29uc3Qgc3dpdGNoTWV0aG9kcyA9IE9iamVjdC5rZXlzKElOVEVSTkFMX0VWRU5UUylcbiAgICAucmVkdWNlKChvYmosIG1ldGhvZE5hbWUpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW21ldGhvZE5hbWVdOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IobWV0aG9kTmFtZSwgeyBjYjogaXNGdW5jdGlvbiB9LCBjYilcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnQgPSBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKElOVEVSTkFMX0VWRU5UU1ttZXRob2ROYW1lXSlcbiAgICAgICAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uSW50ZXJuYWxFdmVudChcbiAgICAgICAgICAgIElOVEVSTkFMX0VWRU5UU1ttZXRob2ROYW1lXSxcbiAgICAgICAgICAgICh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgY2IodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgICAgICAgZGVjcmVhc2VSZWZDb3VudCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge30pXG5cbiAgY29uc3QgZW50ZXJFeGl0TWV0aG9kcyA9IFtcbiAgICBbJ0V4aXRpbmcnLCAnb25Td2l0Y2hpbmcnXSxcbiAgICBbJ0VudGVyaW5nJywgJ29uU3dpdGNoaW5nJ10sXG4gICAgWydFeGl0ZWQnLCAnb25Td2l0Y2hlZCddLFxuICAgIFsnRW50ZXJlZCcsICdvblN3aXRjaGVkJ11cbiAgXVxuICAgIC5yZWR1Y2UoKG9iaiwgbmFtZXMpID0+IHtcbiAgICAgIGNvbnN0IFtuYW1lLCBzd2l0Y2hNZXRob2RdID0gbmFtZXNcbiAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBgb24ke25hbWV9YFxuICAgICAgY29uc3QgZXZlbnROYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFttZXRob2ROYW1lXTogZnVuY3Rpb24gKHN0YXRlLCBjYikge1xuICAgICAgICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcihtZXRob2ROYW1lLCB7IHN0YXRlOiBpc1N0cmluZywgY2I6IGlzRnVuY3Rpb24gfSwgc3RhdGUsIGNiKVxuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICAgICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgICAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OiR7ZXZlbnROYW1lfWApXG4gICAgICAgICAgXVxuICAgICAgICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gc3dpdGNoTWV0aG9kc1tzd2l0Y2hNZXRob2RdKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ0V4aXQnKSA9PT0gMCkge1xuICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNiKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdG9TdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNiKGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgICAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHt9KVxuXG4gIGZ1bmN0aW9uIEVtaXQgKGV2ZW50TmFtZSwgLi4uY3VycmllZEFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VtaXQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBlbWl0KGV2ZW50TmFtZSwgLi4uWy4uLmN1cnJpZWRBcmdzLCAuLi5hcmdzXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIEVudGVyIChzdGF0ZSwgLi4uY3VycmllZEFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VudGVyJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IGVudGVyKHN0YXRlLCAuLi5bLi4uY3VycmllZEFyZ3MsIC4uLmFyZ3NdKVxuICB9XG5cbiAgZnVuY3Rpb24gSW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4sIC4uLmN1cnJpZWRGbkFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0luU3RhdGUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uZm5BcmdzKSA9PlxuICAgICAgaW5TdGF0ZShzdGF0ZSwgYW55T3JGbiwgLi4uWy4uLmN1cnJpZWRGbkFyZ3MsIC4uLmZuQXJnc10pXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH06IFN0YXRlLW1hY2hpbmUgcmVzZXQhYClcblxuICAgIHN0YXRlSGlzdG9yeS5sZW5ndGggPSAwXG4gICAgc3RhdGVIaXN0b3J5LnB1c2goc3RhcnRJbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25Ob09wIChtZXNzYWdlKSB7XG4gICAgY29uc3QgbGFzdFN0YXRlID0gcHJldmlvdXNTdGF0ZSgpXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgcHJldlJvdXRlID0gYCR7bGFzdFN0YXRlID09PSB1bmRlZmluZWQgPyAnW3VuZGVmaW5lZF0nIDogbGFzdFN0YXRlfS0+JHtpblN0YXRlfWBcblxuICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICBpZiAoIWF2YWlsYWJsZVN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gVGhlcmUgYXJlIG5vIHN0YXRlcyBhdmFpbGFibGUgZnJvbSBcIiR7aW5TdGF0ZX1cImBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBGcm9tIFwiJHtpblN0YXRlfVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbJHthdmFpbGFibGVTdGF0ZXNcbiAgICAgICAgICAgIC5tYXAoc3RhdGUgPT4gYFwiJHtzdGF0ZX1cImApXG4gICAgICAgICAgICAuam9pbignLCAnKX1dYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZXM6IHN0YXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgdHJhbnNpdGlvbnM6IHJvdXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgZXZlbnRzOiBldmVudHNIYW5kbGVkLnJlZnMoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluZm8gKCkge1xuICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZWApXG5cbiAgICBsb2dSZWZDb3VudGVySW5mbyhzdGF0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHJvdXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8oZXZlbnRzSGFuZGxlZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1JlZkNvdW50ZXJJbmZvIChyZWZDb3VudGVyKSB7XG4gICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgdGFibGUgfSA9IHJlZkNvdW50ZXIudG9WYWx1ZSgpXG4gICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24pXG4gICAgaWYgKHRhYmxlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS50YWJsZSh0YWJsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJyAgPiBObyBpbmZvcm1hdGlvbicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgc3RhdGUtbWFjaGluZSBvYmplY3QgY3JlYXRlZCBieVxuICAgKiB7QGxpbmsgI3N0YXRlYm90c3RhdGVib3R8U3RhdGVib3QoKX0uXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90RnNtXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogRm9yIGlkZW50aWZ5aW5nIFN0YXRlYm90IG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9fU1RBVEVCT1RfXzogMSxcblxuICAgIC8qKlxuICAgICAqIFRlc3RzIHRvIHNlZSBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgc3BlY2lmaWVkIHN0YXRlIGZyb21cbiAgICAgKiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogSWYgbW9yZSB0aGFuIG9uZSBzdGF0ZSBpcyBzcGVjaWZpZWQsIGB0cnVlYCBpcyByZXR1cm5lZCBvbmx5IGlmXG4gICAgICogKipBTEwqKiBzdGF0ZXMgYXJlIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2dhbWUtbWVudXMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+XG4gICAgICogICAgICAgbWVudSAtPlxuICAgICAqICAgICAgICAgcGxheSB8XG4gICAgICogICAgICAgICBvcHRpb25zIHxcbiAgICAgKiAgICAgICAgIHNvdW5kIHxcbiAgICAgKiAgICAgICAgIHF1aXRcbiAgICAgKlxuICAgICAqICAgICAvLyBHbyBiYWNrIHRvIG1lbnVcbiAgICAgKiAgICAgcGxheSB8IG9wdGlvbnMgfCBzb3VuZCAtPiBtZW51XG4gICAgICpcbiAgICAgKiAgICAgLy8gQ2FuIHF1aXQgZnJvbSBtYWluIGdhbWUsIHRvb1xuICAgICAqICAgICBwbGF5IC0+IHF1aXRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BsYXknKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdtZW51JylcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbyhbJ3BsYXknLCAnb3B0aW9ucyddKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBjYW5UcmFuc2l0aW9uVG86IGNhblRyYW5zaXRpb25UbyxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjb3JvdXRpbmUnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBzdXNwZW5kZWQgLT4gcnVubmluZyAtPiAoc3VzcGVuZGVkIHwgZGVhZClcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3VzcGVuZGVkXCJcbiAgICAgKi9cbiAgICBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGVtaXRzIGFuIGV2ZW50LCBmaXJpbmcgYW55IGxpc3RlbmVycyBhZGRlZCB1c2luZ1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnN8LnBlcmZvcm1UcmFuc2l0aW9ucygpfSBvciB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudHwub25FdmVudCgpfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXVxuICAgICAqICBPcHRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogIFdoZXRoZXIgb3Igbm90IHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogIFNlZToge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2VtaXR0ZXJfZW1pdF9ldmVudG5hbWVfYXJnc3xOb2RlIEV2ZW50c31cbiAgICAgKiAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBTdGF0ZWJvdCBpbXBvcnRzIGBFdmVudEVtaXR0ZXJgIGZyb20gdGhlXG4gICAgICogIHtAbGluayBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHN8ZXZlbnRzfVxuICAgICAqIHBhY2thZ2UgZm9yIGRlYWxpbmcgd2l0aCBldmVudHMgaW4gdGhlIGJyb3dzZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Jhc2ljLWZvcm0nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgLT4gcmVkaXJlY3RcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6IHtcbiAgICAgKiAgICAgb246ICdwb3N0LWRhdGEnLFxuICAgICAqICAgICB0aGVuOiAoLi4uYXJncykgPT4ge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBhcmdzOiAnLCBhcmdzKVxuICAgICAqICAgICAgIC8vIHNldFRpbWVvdXQobWFjaGluZS5FbnRlcigncmVkaXJlY3QnKSwgNTAwMClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVtaXQoJ3Bvc3QtZGF0YScsICdIZWxsbywgd29ybGQhJylcbiAgICAgKiAvLyBFdmVudCBhcmdzOiBbXCJIZWxsbywgd29ybGQhXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzZW5kaW5nXCJcbiAgICAgKi9cbiAgICBlbWl0OiBlbWl0LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqICBUaGUgZGVzaXJlZCBldmVudCB0byB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfS5cbiAgICAgKiBAcGFyYW0gey4uLip9IFtjdXJyaWVkQXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHRoYXQgd2lsbCBjdXJyeSBpbnRvIHRoZSByZXR1cm5lZCBgZW1pdCgpYCBmdW5jdGlvblxuICAgICAqICB3aGVuZXZlciBpdCBpcyBjYWxsZWQuXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhhdCBldmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgndHJhZmZpYy1saWdodHMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBnbyAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tc3RvcCAtPlxuICAgICAqICAgICAgIHN0b3BcbiAgICAgKlxuICAgICAqICAgICAvLyAuLi5nb3R0YSBrZWVwIHRoYXQgdHJhZmZpYyBmbG93aW5nXG4gICAgICogICAgIHN0b3AgLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLWdvIC0+XG4gICAgICogICAgICAgZ29cbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnc3RvcCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3N0b3AgLT4gcHJlcGFyZS10by1nbyc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tZ28gLT4gZ28nOiAgICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ2dvIC0+IHByZXBhcmUtdG8tc3RvcCc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tc3RvcCAtPiBzdG9wJzogeyBvbjogJ3RpbWVyJyB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBuZXh0VHJhZmZpY0xpZ2h0ID0gbWFjaGluZS5FbWl0KCd0aW1lcicpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3RvcFwiXG4gICAgICpcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInByZXBhcmUtdG8tc3RvcFwiXG4gICAgICovXG4gICAgRW1pdDogRW1pdCxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZyBhcyBpdCBpc1xuICAgICAqIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXVxuICAgICAqICBPcHRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byB0cmFuc2l0aW9uIGNhbGxiYWNrcy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YXRlIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2RpYWxvZycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2hvd2luZy1tb2RhbCAtPiAoc2F2aW5nIHwgaWRsZSlcbiAgICAgKiAgICAgICBzYXZpbmcgLT4gaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NhdmluZycpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIC8vIFtkaWFsb2ddOiBJbnZhbGlkIHRyYW5zaXRpb24gXCJpZGxlLT5zYXZpbmdcIiwgbm90IHN3aXRjaGluZ1xuICAgICAqIC8vID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCJbdW5kZWZpbmVkXS0+aWRsZVwiXG4gICAgICogLy8gPiBGcm9tIFwiaWRsZVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbXCJzaG93aW5nLW1vZGFsXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzaG93aW5nLW1vZGFsJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgZW50ZXI6IGVudGVyLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nXG4gICAgICogYXMgaXQgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcGFyYW0gey4uLip9IFtjdXJyaWVkQXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHRoYXQgd2lsbCBjdXJyeSBpbnRvIHRoZSByZXR1cm5lZCBgZW50ZXIoKWAgZnVuY3Rpb25cbiAgICAgKiAgd2hlbmV2ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgQSBmdW5jdGlvbiB0aGF0IGNhbiBjaGFuZ2UgdGhlIHN0YXRlIHdoZW4gY2FsbGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwb3B1cC1tZW51Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBtZW51LW9wZW5lZCAtPlxuICAgICAqICAgICAgIChpdGVtLWNsaWNrZWQgfCBpZGxlKVxuICAgICAqXG4gICAgICogICAgIGl0ZW0tY2xpY2tlZCAtPiBpZGxlXG4gICAgICogICBgLFxuICAgICAqICAgc3RhcnRJbjogJ21lbnUtb3BlbmVkJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBidXR0b24ub25jbGljayA9IG1hY2hpbmUuRW50ZXIoJ2l0ZW0tY2xpY2tlZCcpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwibWVudS1vcGVuZWRcIlxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2soKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIml0ZW0tY2xpY2tlZFwiXG4gICAgICovXG4gICAgRW50ZXI6IEVudGVyLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgc3RhdGVzIHRoZSBtYWNoaW5lIGhhcyBiZWVuIGluIHNvIGZhciwgdXAgdG8gYSBsaW1pdCBzZXRcbiAgICAgKiBieSBgaGlzdG9yeUxpbWl0YCBpbiB7QGxpbmsgc3RhdGVib3RPcHRpb25zfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQSBjb3B5IG9mIHRoZSBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdkb3dubG9hZGVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPiAoZmFpbHVyZSB8IHN1Y2Nlc3MpXG4gICAgICogICAgICAgZmFpbHVyZSAtPiBsb2FkaW5nXG4gICAgICogICAgICAgc3VjY2VzcyAtPiBkb25lXG4gICAgICogICBgLFxuICAgICAqICAgaGlzdG9yeUxpbWl0OiA0XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2ZhaWx1cmUnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2xvYWRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3N1Y2Nlc3MnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIG1hY2hpbmUuaGlzdG9yeSgpXG4gICAgICogLy8gW1wiZmFpbHVyZVwiLCBcImxvYWRpbmdcIiwgXCJzdWNjZXNzXCIsIFwiZG9uZVwiXVxuICAgICAqL1xuICAgIGhpc3Rvcnk6ICgpID0+IFsuLi5zdGF0ZUhpc3RvcnldLFxuXG4gICAgLyoqXG4gICAgICogUHJpbnQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZSB0byB0aGUgY29uc29sZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluZm8oKVxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZS5cbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICBzdGF0ZXMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgICAnZG9uZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICAnaWRsZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdIExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9uczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICAgdHJhbnNpdGlvbnMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgJ2lkbGUtPnJlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICdpZGxlLT5zZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZy0+ZG9uZScg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nLT5kb25lJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICAgICAqIC8vIChObyBpbmZvcm1hdGlvbilcbiAgICAgKi9cbiAgICBpbmZvOiAoKSA9PiBpbmZvKCksXG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFNhbWUgZGV0YWlscyBhcyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5mb3wuaW5mbygpfSBpbiBvYmplY3QtZm9ybS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5zcGVjdCgpXG4gICAgICogLy8gV2lsbCByZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAgICogLy8gIHsgc3RhdGVzLCB0cmFuc2l0aW9ucywgZXZlbnRzIH1cbiAgICAgKlxuICAgICAqIC8vIFRoZXNlIHdpbGwgZWFjaCBoYXZlIGtleS12YWx1ZXMsIHRoZSBrZXkgYmVpbmcgdGhlIG5hbWVcbiAgICAgKiAvLyBhbmQgdGhlIHZhbHVlIGJlaW5nIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGF0dGFjaGVkLlxuICAgICAqL1xuICAgIGluc3BlY3Q6ICgpID0+IGluc3BlY3QoKSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9XG4gICAgICogbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGBzdGF0ZWAsIGltbWVkaWF0ZWx5IHJldHVybmluZyBlaXRoZXJcbiAgICAgKiBgdHJ1ZWAgb3IgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGBvdXRwdXRXaGVuVHJ1ZWAgaXMgc3BlY2lmaWVkLCB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBpbnN0ZWFkIG9mIGB0cnVlYCwgYW5kIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2ZcbiAgICAgKiAgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCB0aGVuIGl0cyByZXR1cm4tdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAgICogYXMgdGhlIGB0cnVlYC12YWx1ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUgdG8gdGVzdCBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBbb3V0cHV0V2hlblRydWVdXG4gICAgICogIE9wdGlvbmFsIGB0cnVlYC12YWx1ZS4gSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgYmVcbiAgICAgKiAgY2FsbGVkIGFuZCBpdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcGFyYW0gey4uLip9IFtmbkFyZ3NdXG4gICAgICogIEFyZ3VtZW50cyB0aGF0IHdpbGwgcGFzcyBpbnRvIGBvdXRwdXRXaGVuVHJ1ZSgpYCBpZiBpdCBoYXNcbiAgICAgKiAgYmVlbiBkZWZpbmVkIGFzIGEgZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbHwqfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgJ1B1cnJyci4uLicpXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIGluU3RhdGU6IGluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gcnVuLCB0ZXN0cyB0aGF0XG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IG1hdGNoZXMgdGhlXG4gICAgICogc3BlY2lmaWVkIHN0YXRlLCByZXR1cm5pbmcgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHBhcmFtIHsuLi4qfSBbY3VycmllZEZuQXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHRoYXQgd2lsbCBjdXJyeSBpbnRvIGBvdXRwdXRXaGVuVHJ1ZSgpYCBpZiBpdCBoYXNcbiAgICAgKiAgYmVlbiBkZWZpbmVkIGFzIGEgZnVuY3Rpb24uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FsbHMge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIGlkbGluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScpXG4gICAgICogdmFyIHB1cnJpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogaWRsaW5nKClcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBJZGxpbmchXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBJblN0YXRlOiBJblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGFsc28gYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9XG4gICAgICogZm9yIHRoZSBzYW1lLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ0F5LCB0aGVyZeKAmXMgdGhlIHJ1Yi4nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICB0aGUtcXVlc3Rpb24gLT4gKHRvLWJlIHwgbm90LXRvLWJlKVxuICAgICAqICAgICAgIG5vdC10by1iZSAtPiBwZXJjaGFuY2UtdG8tZHJlYW1cbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5uYW1lKClcbiAgICAgKiAvLyBcIkF5LCB0aGVyZeKAmXMgdGhlIHJ1Yi5cIlxuICAgICAqL1xuICAgIG5hbWU6ICgpID0+IG5hbWUsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJlZCBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmVkIGZyb206IHJlY2VpdmluZ1xuICAgICAqL1xuICAgIG9uRW50ZXJlZDogZW50ZXJFeGl0TWV0aG9kcy5vbkVudGVyZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipCRUZPUkUqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgYmVjb21lcyB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2VudGVyQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAoZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyZWQoJ2RvbmUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnV2UgbWFkZSBpdCEnKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJpbmcoJ2RvbmUnLCBmcm9tU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0VudGVyaW5nIGZyb206JywgZnJvbVN0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmluZyBmcm9tOiBzZW5kaW5nXG4gICAgICogLy8gV2UgbWFkZSBpdCFcbiAgICAgKi9cbiAgICBvbkVudGVyaW5nOiBlbnRlckV4aXRNZXRob2RzLm9uRW50ZXJpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBlbnRlckNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBldmVudCBpcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgVGhlIGNhbGxiYWNrLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvIC0+IGdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH0sXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FdmVudCgndGltZXInLCAoKSA9PiB7XG4gICAgICogICByZWRyYXdUcmFmZmljTGlnaHRzKClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogc2V0SW50ZXJ2YWwobWFjaGluZS5FbWl0KCd0aW1lcicpLCAyMDAwKVxuICAgICAqL1xuICAgIG9uRXZlbnQ6IG9uRXZlbnQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBhcmUgaGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiAvLyBXZSBhcmUgaGVhZGluZyB0bzogc2VuZGluZ1xuICAgICAqL1xuICAgIG9uRXhpdGVkOiBlbnRlckV4aXRNZXRob2RzLm9uRXhpdGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdQZWFjZSBvdXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRpbmcoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdIZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gSGVhZGluZyB0bzogcmVjZWl2aW5nXG4gICAgICogLy8gUGVhY2Ugb3V0IVxuICAgICAqL1xuICAgIG9uRXhpdGluZzogZW50ZXJFeGl0TWV0aG9kcy5vbkV4aXRpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0aW5nIC5vbkV4aXRpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRlZCAub25FeGl0ZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGV4aXRDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgKipBTlkqKlxuICAgICAqIHN0YXRlLWNoYW5nZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N3aXRjaENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25Td2l0Y2hlZCgodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgV2Ugd2VudCBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIFdlIHdlbnQgZnJvbSBcImlkbGVcIiB0byBcInJlY2VpdmluZ1wiXG4gICAgICovXG4gICAgb25Td2l0Y2hlZDogc3dpdGNoTWV0aG9kcy5vblN3aXRjaGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGJlZm9yZSAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgR29pbmcgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBHb2luZyBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGluZzogc3dpdGNoTWV0aG9kcy5vblN3aXRjaGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBzd2l0Y2hDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUnVuIGNhbGxiYWNrcyB3aGVuIHRyYW5zaXRpb25zIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbihtYWNoaW5lLkVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2gobWFjaGluZS5FbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbihtYWNoaW5lLkVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKG1hY2hpbmUuRW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHJlY2VpdmVEYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBUaGUgYWJvdmUgZXhhbXBsZSB1c2luZyBhIGZ1bmN0aW9uIGZvciBjb25maWdcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoKHsgRW50ZXIgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbihFbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKEVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKEVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKEVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBldGMuLi5cbiAgICAgKi9cbiAgICBvblRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdvblRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIHRyYW5zaXRpb25zIHdoZW4gZXZlbnRzIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIFVzZSBgdGhlbmAgdG8gb3B0aW9uYWxseSBhZGQgY2FsbGJhY2tzIHRvIHRob3NlIHRyYW5zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29tcGxleC1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIHVwZGF0ZVxuICAgICAqXG4gICAgICogICAgIC8vIE1heWJlIHRoaW5ncyB0YWtlIGEgbG9uZyB0aW1lLi4uXG4gICAgICogICAgIHVwZGF0ZSAtPlxuICAgICAqICAgICAgIHdhaXRpbmcgLT4gd2FpdGluZy1hLXdoaWxlXG4gICAgICpcbiAgICAgKiAgICAgLy8gV2hpY2ggcGF0aCB3aWxsIHdlIHRha2U/XG4gICAgICogICAgIHdhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT5cbiAgICAgKiAgICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dFxuICAgICAqXG4gICAgICogICAgIC8vIEFsbCBkb25lIVxuICAgICAqICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dCAtPlxuICAgICAqICAgICAgIGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoKHsgRW50ZXIsIGVtaXQgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHVwZGF0ZSc6IHtcbiAgICAgKiAgICAgb246ICd1c2VyLXNhdmVkJyxcbiAgICAgKiAgICAgdGhlbjogKGRhdGEpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnU2VuZGluZyBkYXRhOiAnLCBkYXRhKVxuICAgICAqXG4gICAgICogICAgICAgc2VuZERhdGEoZGF0YSlcbiAgICAgKiAgICAgICAgIC50aGVuKEVudGVyKCdzdWNjZXNzJykpXG4gICAgICogICAgICAgICAuY2F0Y2goRW50ZXIoJ2ZhaWxlZCcpKVxuICAgICAqXG4gICAgICogICAgICAgZW1pdCgnZGF0YS1zZW50JylcbiAgICAgKiAgICAgfVxuICAgICAqICAgfSxcbiAgICAgKiAgICd1cGRhdGUgLT4gd2FpdGluZyc6IHtcbiAgICAgKiAgICAgb246ICdkYXRhLXNlbnQnLFxuICAgICAqICAgICB0aGVuOiAoKSA9PiB7XG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcignd2FpdGluZy1hLXdoaWxlJyksIDc1MClcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd0aW1lb3V0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIEp1c3QgdG8gaWxsdXN0cmF0ZSB0aGF0IHlvdSBjYW4gbWl4IG4nIG1hdGNoIHdpdGggb25UcmFuc2l0aW9uczpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gc3VjY2Vzcyc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0xvdmVseSEnKVxuICAgICAqICAgfSxcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHRpbWVvdXQnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXZWxsLCBhdCBsZWFzdCB5b3UgaGF2ZSB5b3VyIHNob2VzJylcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCd1c2VyLXNhdmVkJywgWydzb21lJywgJ2RhdGEnXSlcbiAgICAgKiAvLyBTZW5kaW5nIGRhdGE6IFtcInNvbWVcIiwgXCJkYXRhXCJdXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBwZXJmb3JtVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ3BlcmZvcm1UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgVGhlIHByZXZpb3VzIHN0YXRlLCBvciBgdW5kZWZpbmVkYCBpZiB0aGVyZSBpc24ndCBvbmUgKGllOyB5b3VcbiAgICAgKiAgaGF2ZSBqdXN0IGNhbGxlZCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXR8LnJlc2V0KCl9LCBvciB0aGVcbiAgICAgKiAgbWFjaGluZSBoYXMganVzdCBzdGFydGVkLilcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnc2ltcGxlLXNlbmRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUucHJldmlvdXNTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKi9cbiAgICBwcmV2aW91c1N0YXRlOiBwcmV2aW91c1N0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUtbWFjaGluZSB0byBpdHMgc3RhcnRpbmctc3RhdGUgYW5kIGNsZWFycyB0aGVcbiAgICAgKiBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQWxsIGxpc3RlbmVycyB3aWxsIHN0aWxsIGJlIGF0dGFjaGVkLCBidXQgbm8gZXZlbnRzIG9yIHRyYW5zaXRpb25zIHdpbGwgYmUgZmlyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY2Fyb3VzZWwnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBwYWdlLTEgLT5cbiAgICAgKiAgICAgcGFnZS0yIC0+XG4gICAgICogICAgIHBhZ2UtMyAtPlxuICAgICAqICAgICBwYWdlLTQgLT4gcGFnZS0xXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3BhZ2UtMicpXG4gICAgICogbWFjaGluZS5yZXNldCgpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicGFnZS0xXCJcbiAgICAgKi9cbiAgICByZXNldDogcmVzZXQsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYGFycmF5YCBvZiBzdGF0ZXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBzdGF0ZSBzcGVjaWZpZWQuXG4gICAgICogSWYgbm8gc3RhdGUgaXMgcGFzc2VkLWluLCB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlXSBUaGUgc3RhdGUgdG8gY2hlY2suIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqICBpZiB1bnNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgICAqIC8vIFtcInNlbmRpbmdcIiwgXCJyZWNlaXZpbmdcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoJ3JlY2VpdmluZycpXG4gICAgICogLy8gW1wiZG9uZVwiXVxuICAgICAqL1xuICAgIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlOiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZUNvbmZpZ3MgKGNvbmZpZ3MsIGNhbldhcm4pIHtcbiAgY29uc3QgYWxsU3RhdGVzID0gW11cbiAgY29uc3QgYWxsUm91dGVzID0gW11cblxuICBjb25zdCBfY29uZmlncyA9IGNvbmZpZ3MucmVkdWNlKChhY2MsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IHsgcm91dGVDaGFydCwgYWN0aW9uIH0gPSBjb25maWdcbiAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnQocm91dGVDaGFydClcbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICBhbGxSb3V0ZXMucHVzaCguLi5yb3V0ZXMpXG4gICAgfVxuICAgIHJldHVybiBbXG4gICAgICAuLi5hY2MsXG4gICAgICAuLi50cmFuc2l0aW9ucy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IFtmcm9tU3RhdGUsIHRvU3RhdGVdID0gdHJhbnNpdGlvblxuICAgICAgICByZXR1cm4geyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9XG4gICAgICB9KVxuICAgIF1cbiAgfSwgW10pXG5cbiAgcmV0dXJuIHtcbiAgICBjb25maWdzOiBfY29uZmlncyxcbiAgICBzdGF0ZXM6IGFsbFN0YXRlcyxcbiAgICByb3V0ZXM6IGFsbFJvdXRlc1xuICB9XG59XG5cbi8qKlxuICogVGVzdHMgdGhhdCBhbiBvYmplY3QgaXMgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICpcbiAqIGlzU3RhdGVib3QobWFjaGluZSlcbiAqIC8vIHRydWVcbiAqXG4gKiBAcGFyYW0ge2FueX0gb2JqZWN0IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5cbmZ1bmN0aW9uIGlzU3RhdGVib3QgKG9iamVjdCkge1xuICByZXR1cm4gKFxuICAgIGlzUG9qbyhvYmplY3QpICYmXG4gICAgdHlwZW9mIG9iamVjdC5fX1NUQVRFQk9UX18gPT09ICdudW1iZXInXG4gIClcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEFTU0VSVElPTiBIRUxQRVJTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcm91dGVJc1Bvc3NpYmxlLFxuICBhc3NlcnRSb3V0ZVxufVxuXG5jb25zdCB7IGlzU3RhdGVib3QgfSA9IHJlcXVpcmUoJy4vc3RhdGVib3QnKVxuY29uc3QgeyBkZWNvbXBvc2VSb3V0ZSB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcbmNvbnN0IHtcbiAgRGVmZXIsXG4gIE9uY2UsXG4gIFJldm9rYWJsZSxcbiAgTG9nZ2VyLFxuICBBcmdUeXBlRXJyb3IsXG4gIGlzVGVtcGxhdGVMaXRlcmFsXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcignc3RhdGVib3QuJylcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhIGNlcnRhaW4gcm91dGUgY2FuIGJlIGZvbGxvd2VkIGJ5IGFcbiAqIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICpcbiAqIFRoaXMgbWVyZWx5IHRlc3RzIHRoYXQgYSBjZXJ0YWluIHBhdGggY2FuIGJlIHRha2VuIHRocm91Z2ggYVxuICogc3RhdGUtbWFjaGluZS4gSXQgZG9lc24ndCBhc3NlcnQgdGhhdCB0aGUgc3RhdGVzIGFyZSBtb3ZlZC10aHJvdWdoXG4gKiB3aGlsZSB0aGUgbWFjaGluZSBpcyB3b3JraW5nLCBhcyB3aXRoXG4gKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAqICBUaGUgbWFjaGluZSB0byB0ZXN0IHRoZSByb3V0ZSBvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSByb3V0ZVxuICogIFRoZSByb3V0ZSB0byB0ZXN0IGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gKlxuICogIGBcbiAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICogIGBcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAqXG4gKiByb3V0ZUlzUG9zc2libGUobWFjaGluZSxcbiAqICAgJ3dhbGtpbmcgLT4gZmFsbGluZyAtPiBzcGxhdHRpbmcgLT4gd2Fsa2luZydcbiAqIClcbiAqIC8vIGZhbHNlXG4gKi9cblxuZnVuY3Rpb24gcm91dGVJc1Bvc3NpYmxlIChtYWNoaW5lLCByb3V0ZSkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3JvdXRlSXNQb3NzaWJsZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCByb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCByb3V0ZVxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgX3JvdXRlID0gZGVjb21wb3NlUm91dGUocm91dGUpXG4gIHJldHVybiBfcm91dGUuZXZlcnkoKHN0YXRlLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA9PT0gX3JvdXRlLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IF9yb3V0ZVtpbmRleCArIDFdXG4gICAgICBjb25zdCBhdmFpbGFibGVTdGF0ZXMgPSBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKHN0YXRlKVxuICAgICAgY29uc3QgcGFzc2VzID0gYXZhaWxhYmxlU3RhdGVzLmluY2x1ZGVzKG5leHRTdGF0ZSlcbiAgICAgIHJldHVybiBwYXNzZXNcbiAgICB9XG4gIH0pXG59XG5cbmxldCBhc3NlcnRpb25JZCA9IDBcblxuLyoqXG4gKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0gb3B0aW9ucy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IGFzc2VydFJvdXRlT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkZXNjcmlwdGlvbl1cbiAqICBEZXNjcmliZSB0aGUgc3VjY2Vzcy1jb25kaXRpb24gZm9yIHRoaXMgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtmcm9tU3RhdGU9XCJcIl1cbiAqICBXYWl0IGZvciB0aGUgbWFjaGluZSB0byBiZSBpbiB0aGlzIHN0YXRlIGJlZm9yZSBhc3NlcnRpb24gYmVnaW5zLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW3J1bl1cbiAqICBSdW4gdGhpcyBmdW5jdGlvbiBqdXN0IGJlZm9yZSBzdGFydGluZyB0aGUgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtwZXJtaXR0ZWREZXZpYXRpb25zPTBdXG4gKiAgSWYgd2UgaGl0IGFuIHVuZXhwZWN0ZWQgc3RhdGUgZHVyaW5nIGFzc2VydGlvbiwgdGhpcyBpcyBhIFwiZGV2aWF0aW9uXCIuXG4gKiAgSXQgbWlnaHQgYmUgdGhhdCB0aGUgRlNNIHdpbGwgY29tZSBiYWNrIHRvIHRoZSBleHBlY3RlZCBzdGF0ZSBhZ2FpblxuICogIGFmdGVyIGEgY2VydGFpbiBudW1iZXIgb2YgdGhlc2UuIEZvciBleGFtcGxlLCBpZiB5b3VyIEZTTSBoYXMgYVxuICogIFwicmV0cnlcIiByb3V0ZSBjb25maWd1cmVkLCB0aGlzIG51bWJlciBjYW4gYWNjb3VudCBmb3IgaXQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3RpbWVvdXRJbk1zPTEwMDBdXG4gKiAgUGVybWl0dGVkIGxlbmd0aCBvZiB0aW1lIGZvciB0aGUgZW50aXJlIGFzc2VydGlvbiwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIE5vcm1hbGx5IHdlIHdhbnQgbG9ncyBmb3IgYXNzZXJ0aW9ucywgcmlnaHQ/IFdlbGwsIHlvdSBjYW4gdHVuZVxuICogIHRoZW0ganVzdCBsaWtlIHlvdSBjYW4gd2l0aCB7QGxpbmsgI3N0YXRlYm90b3B0aW9uc3xzdGF0ZWJvdE9wdGlvbnN9LlxuICovXG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfSB0cmFjZWQgdGhlIHJvdXRlIHNwZWNpZmllZC5cbiAqXG4gKiBXaGVyZWFzIHtAbGluayAjc3RhdGVib3Ryb3V0ZWlzcG9zc2libGV8cm91dGVJc1Bvc3NpYmxlKCl9IG9ubHkgY2hlY2tzXG4gKiB0aGF0IGEgcGFydGljdWxhciByb3V0ZSBjYW4gYmUgZm9sbG93ZWQsIGBhc3NlcnRSb3V0ZWAgd2lsbCBob29rLWludG9cbiAqIGEgbWFjaGluZSBhbmQgd2FpdCBmb3IgaXQgdG8gdHJhY2UgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGhpbiBhXG4gKiB0aW1lb3V0IHBlcmlvZC5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQGFzeW5jXG4gKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gKiAgVGhlIG1hY2hpbmUgdG8gcnVuIHRoZSBhc3NlcnRpb24gb24uXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZXhwZWN0ZWRSb3V0ZVxuICogIFRoZSBleHBlY3RlZCByb3V0ZSBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICpcbiAqICBgXG4gKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAqICBgXG4gKiBAcGFyYW0ge2Fzc2VydFJvdXRlT3B0aW9uc30gW29wdGlvbnNdXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gKlxuICogYXNzZXJ0Um91dGUoXG4gKiAgIG1hY2hpbmUsICdwcmVwYXJlIC0+IGRlYm91bmNlIC0+IHNlbmRpbmcgLT4gZG9uZSAtPiBpZGxlJyxcbiAqICAge1xuICogICAgIGRlc2NyaXB0aW9uOiAnRW1haWwgc2VudCB3aXRoIG5vIGlzc3VlcycsXG4gKiAgICAgZnJvbVN0YXRlOiAnaWRsZScsXG4gKiAgICAgdGltZW91dEluTXM6IDEwMDAgKiAyMCxcbiAqICAgICBwZXJtaXR0ZWREZXZpYXRpb25zOiAwLFxuICogICAgIGxvZ0xldmVsOiAzXG4gKiAgIH1cbiAqIClcbiAqIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdBc3NlcnRpb24gcGFzc2VkIScpKVxuICogLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGBXaG9vcHM6ICR7ZXJyfWApKVxuICpcbiAqIG1hY2hpbmUuZW50ZXIoJ2lkbGUnKVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydFJvdXRlIChtYWNoaW5lLCBleHBlY3RlZFJvdXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignYXNzZXJ0Um91dGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBhc3NlcnRpb25JZCArPSAxXG5cbiAgY29uc3Qge1xuICAgIGRlc2NyaXB0aW9uID0gJ0Fzc2VydGlvbiBjb21wbGV0ZScsXG4gICAgZnJvbVN0YXRlID0gJycsXG4gICAgcnVuID0gKCkgPT4ge30sXG4gICAgcGVybWl0dGVkRGV2aWF0aW9ucyA9IDAsXG4gICAgdGltZW91dEluTXMgPSAxMDAwLFxuICAgIGxvZ0xldmVsID0gM1xuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG5cbiAgY29uc3QgcHJlZml4ID0gYFN0YXRlYm90WyR7bWFjaGluZS5uYW1lKCl9XTogYUlkPCR7YXNzZXJ0aW9uSWR9PmBcbiAgY29uc3Qgcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShleHBlY3RlZFJvdXRlKVxuXG4gIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06IEFzc2VydGluZyByb3V0ZTogWyR7cm91dGUuam9pbignID4gJyl9XWApXG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH06ID4gQXNzZXJ0aW9uIHdpbGwgc3RhcnQgZnJvbSBzdGF0ZTogXCIke2Zyb21TdGF0ZX1cImApXG5cbiAgY29uc3QgZnJvbVN0YXRlQWN0aW9uRm4gPSBEZWZlcihydW4pXG4gIGxldCByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9ICgpID0+IHsgfVxuXG4gIGNvbnN0IHRvdGFsVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IGFzc2VydGlvblRpbWVvdXRUaW1lclxuICBsZXQgZGV2aWF0aW9ucyA9IDBcbiAgbGV0IHBlbmRpbmcgPSB0cnVlXG4gIGxldCB1bmV4cGVjdGVkID0gZmFsc2VcblxuICBjb25zdCBjb25zdW1lUm91dGUgPSBbLi4ucm91dGVdXG4gIGNvbnN0IHJlcG9ydCA9IFRhYmxlKFxuICAgIFsnc3RhdGUnLCAnZXhwZWN0ZWQnLCAnaW5mbycsICd0b29rJ10sXG4gICAgWydjZW50ZXInLCAnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXVxuICApXG5cbiAgY29uc3QgZmluYWxpc2VSZXBvcnQgPSBPbmNlKGVyciA9PiB7XG4gICAgYWRkUm93KCcnLCAnJywgJycsICdUT1RBTDogJyArIHRvdGFsVGltZVRha2VuKCkpXG4gICAgcmVwb3J0LmxvY2soKVxuICAgIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06ICR7ZGVzY3JpcHRpb259OiBbJHtlcnIgPyAnRkFJTEVEJyA6ICdTVUNDRVNTJ31dYClcbiAgICBjb25zb2xlLnRhYmxlKHJlcG9ydC5jb250ZW50KCkpXG4gICAgcmV0dXJuIGVyclxuICB9KVxuXG4gIGNvbnN0IHsgYWRkUm93IH0gPSByZXBvcnRcbiAgZnVuY3Rpb24gZW50ZXJlZFN0YXRlIChzdGF0ZSkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICBhZGRSb3coc3RhdGUsICctJywgJ1BFTkRJTkcnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlWzBdXG4gICAgICBpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCB1bmV4cGVjdGVkID8gJ1JFQUxJR05FRCcgOiAnT0tBWScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgICBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCAnV1JPTkcgU1RBVEUnLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gdHJ1ZVxuICAgICAgICBkZXZpYXRpb25zICs9IDFcbiAgICAgIH1cbiAgICAgIHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKCdOTyBST1VURSBUTyBURVNUJykpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZXNvbHZlKC4uLmFyZ3MpXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVqZWN0ID0gZXJyID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlamVjdChlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgYmFpbG91dCA9IG1lc3NhZ2UgPT4ge1xuICAgICAgd2hpbGUgKGNvbnN1bWVSb3V0ZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICAgIGFkZFJvdyhtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpLCBgKCR7ZXhwZWN0ZWRTdGF0ZX0pYCwgbWVzc2FnZSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBjbGVhclRpbWVvdXRBbmRSZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKG1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBpZiAobWFjaGluZS5pblN0YXRlKGZyb21TdGF0ZSkpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgfVxuXG4gICAgY29uc3QgeyByZXZva2UsIGZuIH0gPSBSZXZva2FibGUoc3RhdGUgPT4ge1xuICAgICAgYXNzZXJ0aW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RJTUVPVVQnKVxuICAgICAgfSwgdGltZW91dEluTXMpXG5cbiAgICAgIGVudGVyZWRTdGF0ZShzdGF0ZSlcbiAgICAgIGlmIChwZW5kaW5nICYmIHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgfVxuICAgICAgaWYgKGRldmlhdGlvbnMgPiBwZXJtaXR0ZWREZXZpYXRpb25zKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RPTyBNQU5ZIERFVklBVElPTlMnKVxuICAgICAgfVxuICAgICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBjbGVhclRpbWVvdXRBbmRSZXNvbHZlKGZpbmFsaXNlUmVwb3J0KCkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIgPSBtYWNoaW5lLm9uU3dpdGNoaW5nKGZuKVxuICB9KVxufVxuXG5mdW5jdGlvbiBUYWJsZSAoY29sdW1ucyA9IFtdLCBhbGlnbm1lbnRzID0gW10pIHtcbiAgY29uc3QgdGFibGUgPSBbXVxuICBjb25zdCBhbGlnbm1lbnQgPSBjb2x1bW5zLm1hcCgoXywgaW5kZXgpID0+IGFsaWdubWVudHNbaW5kZXhdIHx8ICdjZW50ZXInKVxuXG4gIGxldCBsb2NrZWQgPSBmYWxzZVxuICBmdW5jdGlvbiBsb2NrICgpIHtcbiAgICBsb2NrZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSb3cgKC4uLmFyZ3MpIHtcbiAgICBpZiAobG9ja2VkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgb2JqID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXJnc1tpbmRleF0gfHwgJydcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IHJvd1xuICAgICAgfVxuICAgIH0sIHt9KVxuICAgIHRhYmxlLnB1c2gob2JqKVxuICB9XG5cbiAgZnVuY3Rpb24gY29sU2l6ZXMgKCkge1xuICAgIHJldHVybiB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiBjb2x1bW5zLm1hcCgoY29sLCBpbmRleCkgPT4gTWF0aC5tYXgocm93W2NvbF0ubGVuZ3RoLCBhY2NbaW5kZXhdKSksIGNvbHVtbnMubWFwKCgpID0+IDApKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkTGVmdCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gc3RyICsgJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkUmlnaHQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aCkgKyBzdHJcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHNpemVzID0gY29sU2l6ZXMoKVxuICAgIGZ1bmN0aW9uIGZvcm1hdEZpZWxkICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBzaXplc1tpbmRleF1cbiAgICAgIGNvbnN0IGFsaWduID0gYWxpZ25tZW50W2luZGV4XVxuICAgICAgaWYgKGFsaWduID09PSAnbGVmdCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZExlZnQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICBpZiAoYWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZFJpZ2h0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGNvbnN0IG91dHB1dCA9IHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFJvdyA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+ICh7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IGZvcm1hdEZpZWxkKHJvd1tjb2xdLCBpbmRleClcbiAgICAgIH0pLCB7fSlcbiAgICAgIHJldHVybiBbLi4uYWNjLCBmb3JtYXR0ZWRSb3ddXG4gICAgfSwgW10pXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2NrOiBsb2NrLFxuICAgIGFkZFJvdzogYWRkUm93LFxuICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBUaW1lVGFrZW4gKCkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cbiAgZnVuY3Rpb24gZm10IChudW0sIGRpZ2l0cykge1xuICAgIHJldHVybiBudW0udG9GaXhlZChkaWdpdHMpLnJlcGxhY2UoL1xcLjArJC8sICcnKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydFRpbWVcblxuICAgIGlmIChkdXJhdGlvbiA8IDUwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbil9IG1zYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA1MDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMil9IHMgYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA2MDAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDEpfSBzIGBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAgLyA2MCwgMSl9IG0gYFxuICAgIH1cbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRVhQT1JUU1xuLy9cblxuY29uc3QgeyBTdGF0ZWJvdCwgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGFzc2VydFJvdXRlLCByb3V0ZUlzUG9zc2libGUgfSA9IHJlcXVpcmUoJy4vYXNzZXJ0aW9ucycpXG5jb25zdCB7IGRlY29tcG9zZUNoYXJ0IH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuXG4vKipcbiAqIDxpbWcgc3JjPVwiLi9sb2dvLWZ1bGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDI1NXB4OyBtYXJnaW46IDEwcHggMDtcIiAvPlxuICpcbiAqIFdyaXRlIG1vcmUgcm9idXN0IGFuZCB1bmRlcnN0YW5kYWJsZSBwcm9ncmFtcy5cbiAqXG4gKiBTdGF0ZWJvdCBob3BlcyB0byBtYWtlIFtGaW5pdGUgU3RhdGUgTWFjaGluZXNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpbml0ZS1zdGF0ZV9tYWNoaW5lKSAoRlNNcykgYSBsaXR0bGUgbW9yZSBhY2Nlc3NpYmxlLlxuICpcbiAqIFlvdSdyZSByZWFkaW5nIHRoZSBkb2N1bWVudGF0aW9uLiBPdGhlciBleGl0cyBhcmU6XG4gKlxuICogLSBUaGUgW1JFQURNRSBmaWxlXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90L2Jsb2IvbWFzdGVyL1JFQURNRS5tZClcbiAqIC0gVGhlIFtHaXRodWIgUmVwb10oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdClcbiAqIC0gVGhlIHNoZWxsLXNjcmlwdCB2ZXJzaW9uLCBbU3RhdGVib3Qtc2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3Qtc2gpXG4gKlxuICogU3RhdGVib3Qgd2FzIHdyaXR0ZW4gYnkgW0NvbmFuIFRoZW9iYWxkXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyLykgYW5kXG4gKiBpcyBbSVNDIGxpY2Vuc2VkXSguLi9MSUNFTlNFKS5cbiAqXG4gKiAjIyMgSnVtcCByaWdodCBpblxuICpcbiAqIFBsYXkgYXJvdW5kIHdpdGggYW4gZXhhbXBsZSB0aGF0IHVzZXMgUmVhY3QgaW4gW3RoaXMgQ29kZVNhbmRib3hdKGh0dHBzOi8vY29kZXNhbmRib3guaW8vcy9zdGF0ZWJvdC1yZWFjdC1vdDN4ZT9maWxlPS9zcmMvTG9hZGVyLmpzKS5cbiAqXG4gKiBZb3UgY2FuIGluc3RhbGwgU3RhdGVib3QgaW50byB5b3VyIGBucG1gIHByb2plY3Q6XG4gKlxuICogYGBgc2hcbiAqIG5wbSBpIHN0YXRlYm90XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHN0YXRlYm90IGZyb20gJ3N0YXRlYm90J1xuICogYGBgXG4gKlxuICogT3Igbm9uLWBucG1gIHByb2plY3Q6XG4gKlxuICogYGBganNcbiAqIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly91bnBrZy5jb20vc3RhdGVib3RAMi4zLjMvZGlzdC9icm93c2VyL3N0YXRlYm90Lm1pbi5qc1wiPjwvc2NyaXB0PlxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHsgU3RhdGVib3QgfSA9IHN0YXRlYm90XG4gKiAvLyBNYWtlIG1hY2hpbmVzIHdpdGggU3RhdGVib3QoKVxuICpcbiAqIGNvbnN0IHsgaXNTdGF0ZWJvdCwgcm91dGVJc1Bvc3NpYmxlLCBhc3NlcnRSb3V0ZSB9ID0gc3RhdGVib3RcbiAqIC8vIFRoZXNlIGFyZSBhc3NlcnRpb24gaGVscGVycyB5b3UgY2FuIHVzZSBmb3IgdGVzdGluZ1xuICogYGBgXG4gKlxuICogIyMjIE9wZW4gdGhlIGRldmVsb3Blci1jb25zb2xlIDopXG4gKlxuICogSSd2ZSBpbmNsdWRlZCBTdGF0ZWJvdCBpbiB0aGlzIHBhZ2UuIE9wZW4gdGhlIGRldmVsb3Blci1jb25zb2xlIHRvXG4gKiBmb2xsb3cgYWxvbmcgd2l0aCB0aGUgZXhhbXBsZXMgYmVsb3c6XG4gKlxuICogYGBganNcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3Byb21pc2UtbGlrZScsIHtcbiAqICAgY2hhcnQ6IGBcbiAqICAgICAvLyBUaGlzIG9uZSB3aWxsIGJlaGF2ZSBhIGJpdCBsaWtlIGEgUHJvbWlzZVxuICogICAgIGlkbGUgLT4gcGVuZGluZyAtPlxuICogICAgICAgcmVzb2x2ZWQgfCByZWplY3RlZFxuICpcbiAqICAgICAvLyAuLi5hbmQgd2UncmUgZG9uZVxuICogICAgIHJlc29sdmVkIC0+IGRvbmVcbiAqICAgICByZWplY3RlZCAtPiBkb25lXG4gKiAgIGAsXG4gKiAgIHN0YXJ0SW46ICdpZGxlJ1xuICogfSlcbiAqXG4gKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbygncGVuZGluZycpXG4gKiAvLyB0cnVlXG4gKlxuICogbWFjaGluZS5lbnRlcigncGVuZGluZycpXG4gKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAqIC8vIFtcInJlc29sdmVkXCIsIFwicmVqZWN0ZWRcIl1cbiAqIGBgYFxuICpcbiAqIFdlIGNhbiBob29rLXVwIGV2ZW50cyB3aXRoIHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnMgLnBlcmZvcm1UcmFuc2l0aW9ucygpfTpcbiAqXG4gKiBgYGBqc1xuICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICogICdwZW5kaW5nIC0+IHJlc29sdmVkJzoge1xuICogICAgb246ICdkYXRhLWxvYWRlZCdcbiAqICB9LFxuICogICdwZW5kaW5nIC0+IHJlamVjdGVkJzoge1xuICogICAgb246IFsndGltZW91dCcsICdkYXRhLWVycm9yJ10sXG4gKiAgICB0aGVuOiAobXNnKSA9PiB7XG4gKiAgICAgIGNvbnNvbGUud2FybignVWggb2guLi4nLCBtc2cpXG4gKiAgICB9XG4gKiAgfSxcbiAqICAncmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lJzoge1xuICogICAgb246ICd0aGF0cy1hbGwtZm9sa3MnXG4gKiAgfVxuICogfSlcbiAqXG4gKiBtYWNoaW5lLmVtaXQoJ2RhdGEtZXJyb3InLCAnRGlkIHlvdSBoZWFyIHRoYXQ/JylcbiAqIGBgYFxuICpcbiAqIEhlcmUncyB0aGUgQVBJOlxuICpcbiAqIHwgSGl0Y2hlcnMgfCBTdGF0dXMgfCBBY3Rpb25zIHxcbiAqIHwtfC18LXxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnQgLm9uRXZlbnQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtY2FudHJhbnNpdGlvbnRvIC5jYW5UcmFuc2l0aW9uVG8oKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtc3RhdGVzYXZhaWxhYmxlZnJvbWhlcmUgLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX0gLyB7QGxpbmsgI2VtaXQtZXZlbnRuYW1lLWN1cnJpZWRhcmdzIC5FbWl0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9udHJhbnNpdGlvbnMgLm9uVHJhbnNpdGlvbnMoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlIC5jdXJyZW50U3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtcHJldmlvdXNzdGF0ZSAucHJldmlvdXNTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21oaXN0b3J5IC5oaXN0b3J5KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSAvIHtAbGluayAjZW50ZXItc3RhdGUtY3VycmllZGFyZ3MgLkVudGVyKCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJpbmcgLm9uRW50ZXJpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZSAuaW5TdGF0ZSgpfSAvIHtAbGluayAjaW5zdGF0ZS1zdGF0ZS1vdXRwdXR3aGVudHJ1ZS1jdXJyaWVkZm5hcmdzIC5JblN0YXRlKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbXJlc2V0IC5yZXNldCgpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRlZCAub25FeGl0ZWQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5mbyAuaW5mbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21pbnNwZWN0IC5pbnNwZWN0KCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW5hbWUgLm5hbWUoKX0gfCAgfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hpbmcgLm9uU3dpdGNoaW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoZWQgLm9uU3dpdGNoZWQoKX0gfCAgfCAgfFxuICpcbiAqIDxpbWcgc3JjPVwiLi9sb2dvLXNtYWxsLnBuZ1wiIHN0eWxlPVwibWF4LXdpZHRoOiA3NXB4OyBtYXJnaW46IDE1cHggMCAwIDVweDtcIiAvPlxuICpcbiAqIEBtb2R1bGUgc3RhdGVib3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3RhdGVib3QsXG4gIGlzU3RhdGVib3QsXG4gIHJvdXRlSXNQb3NzaWJsZSxcbiAgYXNzZXJ0Um91dGUsXG4gIGRlY29tcG9zZUNoYXJ0XG59XG4iXSwibmFtZXMiOlsiZG9tYWluIiwiRXZlbnRIYW5kbGVycyIsInByb3RvdHlwZSIsIk9iamVjdCIsImNyZWF0ZSIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJjYWxsIiwidXNpbmdEb21haW5zIiwidW5kZWZpbmVkIiwiX2V2ZW50cyIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiYWN0aXZlIiwiZ2V0UHJvdG90eXBlT2YiLCJfZXZlbnRzQ291bnQiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiaXNOYU4iLCJUeXBlRXJyb3IiLCIkZ2V0TWF4TGlzdGVuZXJzIiwidGhhdCIsImdldE1heExpc3RlbmVycyIsImVtaXROb25lIiwiaGFuZGxlciIsImlzRm4iLCJzZWxmIiwibGVuIiwibGVuZ3RoIiwibGlzdGVuZXJzIiwiYXJyYXlDbG9uZSIsImkiLCJlbWl0T25lIiwiYXJnMSIsImVtaXRUd28iLCJhcmcyIiwiZW1pdFRocmVlIiwiYXJnMyIsImVtaXRNYW55IiwiYXJncyIsImFwcGx5IiwiZW1pdCIsInR5cGUiLCJlciIsImV2ZW50cyIsImRvRXJyb3IiLCJlcnJvciIsImFyZ3VtZW50cyIsIkVycm9yIiwiZG9tYWluRW1pdHRlciIsImRvbWFpblRocm93biIsImVyciIsImNvbnRleHQiLCJBcnJheSIsIl9hZGRMaXN0ZW5lciIsInRhcmdldCIsImxpc3RlbmVyIiwicHJlcGVuZCIsIm0iLCJleGlzdGluZyIsIm5ld0xpc3RlbmVyIiwidW5zaGlmdCIsInB1c2giLCJ3YXJuZWQiLCJ3IiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImVtaXRXYXJuaW5nIiwiZSIsImNvbnNvbGUiLCJ3YXJuIiwibG9nIiwiYWRkTGlzdGVuZXIiLCJvbiIsInByZXBlbmRMaXN0ZW5lciIsIl9vbmNlV3JhcCIsImZpcmVkIiwiZyIsInJlbW92ZUxpc3RlbmVyIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic3BsaWNlT25lIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwia2V5cyIsImtleSIsImV2bGlzdGVuZXIiLCJyZXQiLCJ1bndyYXBMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsIlJlZmxlY3QiLCJvd25LZXlzIiwiaW5kZXgiLCJrIiwicG9wIiwiYXJyIiwiY29weSIsImlzQXJyYXkiLCJpc0V2ZW50RW1pdHRlciIsImlzRnVuY3Rpb24iLCJpc1Bvam8iLCJpc1N0cmluZyIsImlzVGVtcGxhdGVMaXRlcmFsIiwidW5pcSIsIkRlZmVyIiwiT25jZSIsIlJldm9rYWJsZSIsIlJlZmVyZW5jZUNvdW50ZXIiLCJBcmdUeXBlRXJyb3IiLCJMb2dnZXIiLCJvYmoiLCJpc09iamVjdCIsImV2ZXJ5IiwiaXRlbSIsImlucHV0IiwicmVkdWNlIiwiYWNjIiwib25lIiwiaW5kZXhPZiIsImRlZmVyIiwiZm4iLCJ0aW1lciIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJyZXZva2UiLCJfZm4iLCJyZXN1bHQiLCJyZXZva2VkIiwia2luZCIsImRlc2NyaXB0aW9uIiwiX3JlZnMiLCJleHBlY3RpbmciLCJmbGF0IiwiZm9yRWFjaCIsInJlZiIsImluY3JlYXNlIiwiY291bnRPZiIsImRlY3JlYXNlIiwiTWF0aCIsIm1heCIsInJlZnMiLCJ0YWJsZSIsInNvcnQiLCJtYXAiLCJ0b1ZhbHVlIiwiZXJyUHJlZml4IiwiZm5OYW1lIiwidHlwZU1hcCIsImFyZ01hcCIsImVudHJpZXMiLCJhcmdOYW1lIiwiYXJnVHlwZSIsInNpZ25hdHVyZSIsImpvaW4iLCJhcmciLCJlcnJvckRlc2MiLCJ0eXBlTmFtZSIsInR5cGVNYXRjaGVzIiwiZmlsdGVyIiwiQm9vbGVhbiIsImxldmVsIiwiX2xldmVsIiwiaW5mbyIsIm5vbmUiLCJjYW5XYXJuIiwiY2FuTG9nIiwiY2FuSW5mbyIsInJ4Q1JMRiIsImN4UGlwZSIsImN4QXJyb3ciLCJyeE9wZXJhdG9ycyIsInJ4VW5zYWZlIiwicmVwbGFjZSIsInJ4TGluZUNvbnRpbnVhdGlvbnMiLCJSZWdFeHAiLCJyeERpc2FsbG93ZWRDaGFyYWN0ZXJzIiwicnhDb21tZW50IiwiZGVjb21wb3NlQ2hhcnQiLCJkZWNvbXBvc2VSb3V0ZSIsInJlcXVpcmUkJDAiLCJhcmdUeXBlRXJyb3IiLCJ0ZW1wbGF0ZUxpdGVyYWwiLCJsaW5lcyIsImNvbmRlbnNlZExpbmVzIiwiZmxhdHRlbmVkUm91dGUiLCJ0b2tlbmlzZWRMaW5lcyIsImNoYXJ0IiwibGluZXNPZlRva2VucyIsImxpbmVzT2ZSb3V0ZXMiLCJkZWNvbXBvc2VSb3V0ZUZyb21Ub2tlbnMiLCJsaW5lc09mVHJhbnNpdGlvbnMiLCJkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSIsInN0YXRlcyIsInJvdXRlS2V5cyIsInJvdXRlIiwiZmlsdGVyZWRSb3V0ZXMiLCJmaWx0ZXJlZFN0YXRlcyIsInRyYW5zaXRpb25zIiwic3BsaXQiLCJyb3V0ZXMiLCJsaW5lc0Zyb20iLCJzdHJPckFyciIsImxpbmUiLCJvdXRwdXQiLCJjb25kZW5zZWRMaW5lIiwic2FuaXRpc2VkTGluZSIsInRlc3QiLCJzdHIiLCJwcmV2aW91c1N0YXRlcyIsImZyb21TdGF0ZXMiLCJ0b1N0YXRlcyIsImZyb21TdGF0ZSIsInRvU3RhdGUiLCJTdGF0ZWJvdCIsImlzU3RhdGVib3QiLCJyZXF1aXJlJCQxIiwib3B0aW9ucyIsImxvZ1ByZWZpeCIsImxvZ0xldmVsIiwiaGlzdG9yeUxpbWl0Iiwic3RhcnRJbiIsImluY2x1ZGVzIiwidHJhbnNpdGlvbklkIiwic3RhdGVIaXN0b3J5Iiwic3RhdGVIaXN0b3J5TGltaXQiLCJpbnRlcm5hbEV2ZW50cyIsIklOVEVSTkFMX0VWRU5UUyIsIm9uU3dpdGNoaW5nIiwib25Td2l0Y2hlZCIsImVtaXRJbnRlcm5hbEV2ZW50IiwiZXZlbnROYW1lIiwib25JbnRlcm5hbEV2ZW50Iiwic3RhdGVzSGFuZGxlZCIsInJvdXRlc0hhbmRsZWQiLCJldmVudHNIYW5kbGVkIiwiYXBwbHlIaXRjaGVyIiwiaGl0Y2hlciIsImhpdGNoZXJBY3Rpb25zIiwiZW50ZXIiLCJFbnRlciIsIkVtaXQiLCJyb3V0ZUNoYXJ0IiwiYWN0aW9uT3JDb25maWciLCJhY3Rpb24iLCJfb24iLCJfdGhlbiIsInRoZW4iLCJhbGxTdGF0ZXMiLCJhbGxSb3V0ZXMiLCJkZWNvbXBvc2VkRXZlbnRzIiwiX2NvbmZpZ3MiLCJkZWNvbXBvc2VDb25maWdzIiwiY29uZmlncyIsImFsbENsZWFudXBGbnMiLCJvbkV2ZW50IiwiZXZlbnRXYXNIYW5kbGVkIiwic29tZSIsInBhc3NlZCIsImluU3RhdGUiLCJ0cmFuc2l0aW9uTm9PcCIsInRyYW5zaXRpb25Db25maWdzIiwidHJhbnNpdGlvbiIsImludmFsaWRTdGF0ZXMiLCJzdGF0ZSIsImludmFsaWRSb3V0ZXMiLCJwcmV2aW91c1N0YXRlIiwiY3VycmVudFN0YXRlIiwiY2FuVHJhbnNpdGlvblRvIiwidGVzdFN0YXRlcyIsIm5leHRTdGF0ZXMiLCJzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSIsIl9zdGF0ZSIsInRyaW0iLCJhbnlPckZuIiwiY29uZGl0aW9uTWF0Y2hlcyIsImZuQXJncyIsIm5leHRSb3V0ZSIsInNoaWZ0IiwiY2IiLCJzd2l0Y2hNZXRob2RzIiwibWV0aG9kTmFtZSIsImRlY3JlYXNlUmVmQ291bnQiLCJyZW1vdmVFdmVudCIsImVudGVyRXhpdE1ldGhvZHMiLCJuYW1lcyIsInN3aXRjaE1ldGhvZCIsInRvTG93ZXJDYXNlIiwiZGVjcmVhc2VSZWZDb3VudHMiLCJjdXJyaWVkQXJncyIsIkluU3RhdGUiLCJjdXJyaWVkRm5BcmdzIiwicmVzZXQiLCJtZXNzYWdlIiwibGFzdFN0YXRlIiwicHJldlJvdXRlIiwiYXZhaWxhYmxlU3RhdGVzIiwiaW5zcGVjdCIsImxvZ1JlZkNvdW50ZXJJbmZvIiwicmVmQ291bnRlciIsIl9fU1RBVEVCT1RfXyIsImhpc3RvcnkiLCJvbkVudGVyZWQiLCJvbkVudGVyaW5nIiwib25FeGl0ZWQiLCJvbkV4aXRpbmciLCJvblRyYW5zaXRpb25zIiwicGVyZm9ybVRyYW5zaXRpb25zIiwiY29uZmlnIiwib2JqZWN0Iiwicm91dGVJc1Bvc3NpYmxlIiwiYXNzZXJ0Um91dGUiLCJyZXF1aXJlJCQyIiwibWFjaGluZSIsIl9yb3V0ZSIsIm5leHRTdGF0ZSIsInBhc3NlcyIsImFzc2VydGlvbklkIiwiZXhwZWN0ZWRSb3V0ZSIsInJ1biIsInBlcm1pdHRlZERldmlhdGlvbnMiLCJ0aW1lb3V0SW5NcyIsInByZWZpeCIsImZyb21TdGF0ZUFjdGlvbkZuIiwicmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4iLCJ0b3RhbFRpbWVUYWtlbiIsIlRpbWVUYWtlbiIsInN0YXRlVGltZVRha2VuIiwiYXNzZXJ0aW9uVGltZW91dFRpbWVyIiwiZGV2aWF0aW9ucyIsInBlbmRpbmciLCJ1bmV4cGVjdGVkIiwiY29uc3VtZVJvdXRlIiwicmVwb3J0IiwiVGFibGUiLCJmaW5hbGlzZVJlcG9ydCIsImFkZFJvdyIsImxvY2siLCJjb250ZW50IiwiZW50ZXJlZFN0YXRlIiwiZXhwZWN0ZWRTdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSIsInJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIiLCJjbGVhclRpbWVvdXRBbmRSZWplY3QiLCJiYWlsb3V0IiwiY29sdW1ucyIsImFsaWdubWVudHMiLCJhbGlnbm1lbnQiLCJfIiwibG9ja2VkIiwiY29sIiwicm93IiwiY29sU2l6ZXMiLCJwYWRMZWZ0IiwicmVwZWF0IiwicGFkUmlnaHQiLCJzaXplcyIsImZvcm1hdEZpZWxkIiwidmFsdWUiLCJzaXplIiwiYWxpZ24iLCJmb3JtYXR0ZWRSb3ciLCJzdGFydFRpbWUiLCJEYXRlIiwi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
