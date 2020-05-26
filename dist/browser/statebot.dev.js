
/*
 * Statebot
 * v2.2.1
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
  var rxLineContinations = new RegExp("(".concat(rxOperators, ")$"));
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

      if (rxLineContinations.test(sanitisedLine)) {
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
      var err = argTypeError('Emit', {
        eventName: isString$1
      }, eventName);

      if (err) {
        throw TypeError(err);
      }

      return function () {
        for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }

        return emit.apply(void 0, [eventName].concat(args));
      };
    }

    function Enter(state) {
      var err = argTypeError('Enter', {
        state: isString$1
      }, state);

      if (err) {
        throw TypeError(err);
      }

      return function () {
        for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          args[_key10] = arguments[_key10];
        }

        return enter.apply(void 0, [state].concat(args));
      };
    }

    function InState(state, anyOrFn) {
      var err = argTypeError('InState', {
        state: isString$1
      }, state);

      if (err) {
        throw TypeError(err);
      }

      return function () {
        for (var _len11 = arguments.length, fnArgs = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
          fnArgs[_key11] = arguments[_key11];
        }

        return inState.apply(void 0, [state, anyOrFn].concat(fnArgs));
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
   * | {@link #statebotfsmonentering .onEntering()} / {@link #statebotfsmonentered .onEntered()} | {@link #statebotfsminstate .inState()} / {@link #instate-state-outputwhentrue-1 .InState()} | {@link #statebotfsmreset .reset()} |
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVib3QuZGV2LmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcmVnaXN0cnkubnBtanMub3JnL3JvbGx1cC1wbHVnaW4tbm9kZS1idWlsdGlucy8yLjEuMi9ub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLWJ1aWx0aW5zL3NyYy9lczYvZXZlbnRzLmpzIiwiLi4vLi4vc3JjL3V0aWxzLmpzIiwiLi4vLi4vc3JjL3BhcnNpbmcuanMiLCIuLi8uLi9zcmMvc3RhdGVib3QuanMiLCIuLi8uLi9zcmMvYXNzZXJ0aW9ucy5qcyIsIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkb21haW47XG5cbi8vIFRoaXMgY29uc3RydWN0b3IgaXMgdXNlZCB0byBzdG9yZSBldmVudCBoYW5kbGVycy4gSW5zdGFudGlhdGluZyB0aGlzIGlzXG4vLyBmYXN0ZXIgdGhhbiBleHBsaWNpdGx5IGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIHRvIGdldCBhIFwiY2xlYW5cIiBlbXB0eVxuLy8gb2JqZWN0ICh0ZXN0ZWQgd2l0aCB2OCB2NC45KS5cbmZ1bmN0aW9uIEV2ZW50SGFuZGxlcnMoKSB7fVxuRXZlbnRIYW5kbGVycy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XG5leHBvcnQge0V2ZW50RW1pdHRlcn07XG5cbi8vIG5vZGVqcyBvZGRpdHlcbi8vIHJlcXVpcmUoJ2V2ZW50cycpID09PSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXJcblxuRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucyA9IGZhbHNlO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmRvbWFpbiA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kb21haW4gPSBudWxsO1xuICBpZiAoRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucykge1xuICAgIC8vIGlmIHRoZXJlIGlzIGFuIGFjdGl2ZSBkb21haW4sIHRoZW4gYXR0YWNoIHRvIGl0LlxuICAgIGlmIChkb21haW4uYWN0aXZlICYmICEodGhpcyBpbnN0YW5jZW9mIGRvbWFpbi5Eb21haW4pKSB7XG4gICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbi5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJuXCIgYXJndW1lbnQgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG4vLyBUaGVzZSBzdGFuZGFsb25lIGVtaXQqIGZ1bmN0aW9ucyBhcmUgdXNlZCB0byBvcHRpbWl6ZSBjYWxsaW5nIG9mIGV2ZW50XG4vLyBoYW5kbGVycyBmb3IgZmFzdCBjYXNlcyBiZWNhdXNlIGVtaXQoKSBpdHNlbGYgb2Z0ZW4gaGFzIGEgdmFyaWFibGUgbnVtYmVyIG9mXG4vLyBhcmd1bWVudHMgYW5kIGNhbiBiZSBkZW9wdGltaXplZCBiZWNhdXNlIG9mIHRoYXQuIFRoZXNlIGZ1bmN0aW9ucyBhbHdheXMgaGF2ZVxuLy8gdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyBhbmQgdGh1cyBkbyBub3QgZ2V0IGRlb3B0aW1pemVkLCBzbyB0aGUgY29kZVxuLy8gaW5zaWRlIHRoZW0gY2FuIGV4ZWN1dGUgZmFzdGVyLlxuZnVuY3Rpb24gZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgc2VsZikge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZik7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdE9uZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEsIGFyZzIpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEsIGFyZzIpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSwgYXJnMik7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZ3MpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGV2ZW50cywgZG9tYWluO1xuICB2YXIgbmVlZERvbWFpbkV4aXQgPSBmYWxzZTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT0gbnVsbCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBkb21haW4gPSB0aGlzLmRvbWFpbjtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgaWYgKGRvbWFpbikge1xuICAgICAgaWYgKCFlcilcbiAgICAgICAgZXIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQnKTtcbiAgICAgIGVyLmRvbWFpbkVtaXR0ZXIgPSB0aGlzO1xuICAgICAgZXIuZG9tYWluID0gZG9tYWluO1xuICAgICAgZXIuZG9tYWluVGhyb3duID0gZmFsc2U7XG4gICAgICBkb21haW4uZW1pdCgnZXJyb3InLCBlcik7XG4gICAgfSBlbHNlIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmICghaGFuZGxlcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGlzRm4gPSB0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJztcbiAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICAvLyBmYXN0IGNhc2VzXG4gICAgY2FzZSAxOlxuICAgICAgZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgdGhpcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIHNsb3dlclxuICAgIGRlZmF1bHQ6XG4gICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgaWYgKG5lZWREb21haW5FeGl0KVxuICAgIGRvbWFpbi5leGl0KCk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoIWV2ZW50cykge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKCFleGlzdGluZykge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBpZiAoIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICAgIGlmIChtICYmIG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0pIHtcbiAgICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgdHlwZSArICcgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgICAgZW1pdFdhcm5pbmcodyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIGVtaXRXYXJuaW5nKGUpIHtcbiAgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gJ2Z1bmN0aW9uJyA/IGNvbnNvbGUud2FybihlKSA6IGNvbnNvbGUubG9nKGUpO1xufVxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgZmlyZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHJldHVybiBnO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmICghbGlzdClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCAobGlzdC5saXN0ZW5lciAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGxpc3RbMF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cztcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKCFldmVudHMpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoIWV2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGtleTsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBkbyB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfSB3aGlsZSAobGlzdGVuZXJzWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICB2YXIgZXZsaXN0ZW5lcjtcbiAgdmFyIHJldDtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoIWV2ZW50cylcbiAgICByZXQgPSBbXTtcbiAgZWxzZSB7XG4gICAgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgICBpZiAoIWV2bGlzdGVuZXIpXG4gICAgICByZXQgPSBbXTtcbiAgICBlbHNlIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldCA9IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdO1xuICAgIGVsc2VcbiAgICAgIHJldCA9IHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdC5vd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKS5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKHZhciBpID0gaW5kZXgsIGsgPSBpICsgMSwgbiA9IGxpc3QubGVuZ3RoOyBrIDwgbjsgaSArPSAxLCBrICs9IDEpXG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBpKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgVVRJTFNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5LFxuICBpc0V2ZW50RW1pdHRlcixcbiAgaXNGdW5jdGlvbixcbiAgaXNQb2pvLFxuICBpc1N0cmluZyxcbiAgaXNUZW1wbGF0ZUxpdGVyYWwsXG4gIHVuaXEsXG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIFJlZmVyZW5jZUNvdW50ZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKG9iaikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopXG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJ1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc0V2ZW50RW1pdHRlciAob2JqKSB7XG4gIHJldHVybiAoXG4gICAgaXNPYmplY3Qob2JqKSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLmVtaXQpICYmXG4gICAgaXNGdW5jdGlvbihvYmouYWRkTGlzdGVuZXIpICYmXG4gICAgaXNGdW5jdGlvbihvYmoucmVtb3ZlTGlzdGVuZXIpXG4gIClcbn1cblxuZnVuY3Rpb24gaXNQb2pvIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCAoIWlzT2JqZWN0KG9iaikpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBPYmplY3QucHJvdG90eXBlXG59XG5cbmZ1bmN0aW9uIGlzVGVtcGxhdGVMaXRlcmFsIChvYmopIHtcbiAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmV2ZXJ5KGl0ZW0gPT4gaXNTdHJpbmcoaXRlbSkpXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHVuaXEgKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgb25lKSA9PiAoYWNjLmluZGV4T2Yob25lKSA9PT0gLTEgPyBbLi4uYWNjLCBvbmVdIDogYWNjKSwgW10pXG59XG5cbmZ1bmN0aW9uIGRlZmVyIChmbiwgLi4uYXJncykge1xuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoZm4sIDAsIC4uLmFyZ3MpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5mdW5jdGlvbiBEZWZlciAoZm4pIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBkZWZlcihmbiwgLi4uYXJncylcbn1cblxuZnVuY3Rpb24gT25jZSAoZm4pIHtcbiAgY29uc3QgeyByZXZva2UsIGZuOiBfZm4gfSA9IFJldm9rYWJsZShmbilcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICByZXN1bHQgPSBfZm4oLi4uYXJncylcbiAgICByZXZva2UoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBSZXZva2FibGUgKGZuKSB7XG4gIGxldCByZXZva2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4ge1xuICAgIGZuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCFyZXZva2VkKSB7XG4gICAgICAgIHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICByZXZva2U6ICgpID0+IHtcbiAgICAgIHJldm9rZWQgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFJlZmVyZW5jZUNvdW50ZXIgKG5hbWUsIGtpbmQsIGRlc2NyaXB0aW9uLCAuLi5leHBlY3RpbmcpIHtcbiAgY29uc3QgX3JlZnMgPSB7fTtcbiAgWy4uLmV4cGVjdGluZ10uZmxhdCgpLmZvckVhY2gocmVmID0+IHtcbiAgICBfcmVmc1tyZWZdID0gMFxuICB9KVxuICBmdW5jdGlvbiBpbmNyZWFzZSAocmVmKSB7XG4gICAgX3JlZnNbcmVmXSA9IGNvdW50T2YocmVmKSArIDFcbiAgICByZXR1cm4gKCkgPT4gZGVjcmVhc2UocmVmKVxuICB9XG4gIGZ1bmN0aW9uIGRlY3JlYXNlIChyZWYpIHtcbiAgICBjb25zdCBjb3VudCA9IGNvdW50T2YocmVmKSAtIDFcbiAgICBfcmVmc1tyZWZdID0gTWF0aC5tYXgoY291bnQsIDApXG4gIH1cbiAgZnVuY3Rpb24gY291bnRPZiAocmVmKSB7XG4gICAgcmV0dXJuIF9yZWZzW3JlZl0gfHwgMFxuICB9XG4gIGZ1bmN0aW9uIHJlZnMgKCkge1xuICAgIHJldHVybiB7IC4uLl9yZWZzIH1cbiAgfVxuICBmdW5jdGlvbiB0YWJsZSAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKF9yZWZzKS5zb3J0KClcbiAgICAgIC5tYXAoa2V5ID0+IFtrZXksIF9yZWZzW2tleV1dKVxuICAgICAgLm1hcCgoW3JlZiwgY291bnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgW2tpbmRdOiByZWYsXG4gICAgICAgICAgcmVmczogY291bnQgfHwgJ05vbmUnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gdG9WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBgU3RhdGVib3RbJHtuYW1lfV06ICR7ZGVzY3JpcHRpb259OmAsXG4gICAgICB0YWJsZTogdGFibGUoKVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGluY3JlYXNlOiBpbmNyZWFzZSxcbiAgICBkZWNyZWFzZTogZGVjcmVhc2UsXG4gICAgY291bnRPZjogY291bnRPZixcbiAgICB0b1ZhbHVlOiB0b1ZhbHVlLFxuICAgIHJlZnM6IHJlZnNcbiAgfVxufVxuXG5mdW5jdGlvbiBBcmdUeXBlRXJyb3IgKGVyclByZWZpeCA9ICcnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm5OYW1lLCB0eXBlTWFwLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgYXJnTWFwID0gT2JqZWN0LmVudHJpZXModHlwZU1hcClcbiAgICAgIC5tYXAoKFthcmdOYW1lLCBhcmdUeXBlXSkgPT4ge1xuICAgICAgICByZXR1cm4geyBhcmdOYW1lLCBhcmdUeXBlIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBzaWduYXR1cmUgPSBPYmplY3Qua2V5cyh0eXBlTWFwKS5qb2luKCcsICcpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdzXG4gICAgICAubWFwKChhcmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYXJnTmFtZSwgYXJnVHlwZSB9ID0gYXJnTWFwW2luZGV4XVxuICAgICAgICBpZiAoYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gYEFyZ3VtZW50IHVuZGVmaW5lZDogXCIke2FyZ05hbWV9XCJgXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXJyb3JEZXNjXG4gICAgICAgIGxldCB0eXBlTmFtZVxuICAgICAgICBsZXQgdHlwZU1hdGNoZXNcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihhcmdUeXBlKSkge1xuICAgICAgICAgIHR5cGVNYXRjaGVzID0gYXJnVHlwZShhcmcpID09PSB0cnVlXG4gICAgICAgICAgdHlwZU5hbWUgPSBhcmdUeXBlLm5hbWVcbiAgICAgICAgICBlcnJvckRlc2MgPSBgJHt0eXBlTmFtZX0oJHthcmdOYW1lfSkgZGlkIG5vdCByZXR1cm4gdHJ1ZWBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdmFsaWQtdHlwZW9mXG4gICAgICAgICAgdHlwZU1hdGNoZXMgPSB0eXBlb2YgYXJnID09PSBhcmdUeXBlXG4gICAgICAgICAgdHlwZU5hbWUgPSBhcmdUeXBlXG4gICAgICAgICAgZXJyb3JEZXNjID0gYEFyZ3VtZW50IFwiJHthcmdOYW1lfVwiIHNob3VsZCBiZSBhICR7dHlwZU5hbWV9YFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0eXBlTWF0Y2hlcykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBgJHtlcnJvckRlc2N9OiAke2FyZ05hbWV9ID09PSAke3R5cGVvZiBhcmd9KCR7YXJnfSlgXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuXG4gICAgaWYgKCFlcnIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBcXG4ke2VyclByZWZpeH0ke2ZuTmFtZX0oJHtzaWduYXR1cmV9KTpcXG5gICtcbiAgICAgICAgYCR7ZXJyLm1hcChlcnIgPT4gYD4gJHtlcnJ9YCkuam9pbignXFxuJyl9YFxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBMb2dnZXIgKGxldmVsKSB7XG4gIGxldCBfbGV2ZWwgPSBsZXZlbFxuICBpZiAoaXNTdHJpbmcoX2xldmVsKSkge1xuICAgIF9sZXZlbCA9ICh7XG4gICAgICBpbmZvOiAzLFxuICAgICAgbG9nOiAyLFxuICAgICAgd2FybjogMSxcbiAgICAgIG5vbmU6IDBcbiAgICB9KVtfbGV2ZWxdIHx8IDNcbiAgfVxuICBmdW5jdGlvbiBjYW5XYXJuICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDFcbiAgfVxuICBmdW5jdGlvbiBjYW5Mb2cgKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMlxuICB9XG4gIGZ1bmN0aW9uIGNhbkluZm8gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gM1xuICB9XG4gIHJldHVybiB7XG4gICAgY2FuV2FybixcbiAgICBjYW5Mb2csXG4gICAgY2FuSW5mbyxcblxuICAgIGluZm86ICguLi5hcmdzKSA9PiBjYW5JbmZvKCkgJiYgY29uc29sZS5pbmZvKC4uLmFyZ3MpLFxuICAgIHRhYmxlOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS50YWJsZSguLi5hcmdzKSxcbiAgICBsb2c6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4gY2FuV2FybigpICYmIGNvbnNvbGUud2FybiguLi5hcmdzKSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IGNvbnNvbGUuZXJyb3IoLi4uYXJncylcbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQ0hBUlQvUk9VVEUgUEFSU0lOR1xuLy9cblxuY29uc3QgcnhDUkxGID0gL1tcXHJcXG5dL1xuY29uc3QgY3hQaXBlID0gJ3wnXG5jb25zdCBjeEFycm93ID0gJy0+J1xuY29uc3QgcnhPcGVyYXRvcnMgPSBbY3hQaXBlLCBjeEFycm93XVxuICAubWFwKHJ4VW5zYWZlID0+IHJ4VW5zYWZlLnJlcGxhY2UoJ3wnLCAnXFxcXHwnKSlcbiAgLmpvaW4oJ3wnKVxuXG5jb25zdCByeExpbmVDb250aW5hdGlvbnMgPSBuZXcgUmVnRXhwKGAoJHtyeE9wZXJhdG9yc30pJGApXG5jb25zdCByeERpc2FsbG93ZWRDaGFyYWN0ZXJzID0gL1teYS16MC05IUAjJCVeJio6Xys9PD58fi5cXHgyRF0vZ2lcbmNvbnN0IHJ4Q29tbWVudCA9IC8oXFwvXFwvW15cXG5cXHJdKikvXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjeFBpcGUsXG4gIGN4QXJyb3csXG4gIHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsXG4gIGRlY29tcG9zZUNoYXJ0LFxuICBkZWNvbXBvc2VSb3V0ZVxufVxuXG5jb25zdCB7IHVuaXEsIEFyZ1R5cGVFcnJvciwgaXNUZW1wbGF0ZUxpdGVyYWwgfSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlICh0ZW1wbGF0ZUxpdGVyYWwpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VSb3V0ZScsXG4gICAgeyB0ZW1wbGF0ZUxpdGVyYWw6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgdGVtcGxhdGVMaXRlcmFsXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlZExpbmVzKHRlbXBsYXRlTGl0ZXJhbClcbiAgY29uc3QgZmxhdHRlbmVkUm91dGUgPSB0b2tlbmlzZWRMaW5lcyhsaW5lcykuZmxhdCgyKVxuICByZXR1cm4gZmxhdHRlbmVkUm91dGVcbn1cblxuLyoqXG4gKiBEZWNvbXBvc2UgYSB7QGxpbmsgc3RhdGVib3RDaGFydH0gaW50byBhbiBvYmplY3Qgb2YgYHN0YXRlc2AsIGByb3V0ZXNgLFxuICogYW5kIGB0cmFuc2l0aW9uc2AuXG4gKlxuICogU3RhdGVib3QoKSB1c2VzIHRoaXMgaW50ZXJuYWxseSB0byBwYXJzZSBjaGFydHMuIEV4cG9zZWQgZm9yIGRlYnVnZ2luZy5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICogQHJldHVybnMge09iamVjdH1cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydGBcbiAqICAgcGVuZGluZyAtPlxuICogICAgIHN1Y2Nlc3MgfCBmYWlsdXJlXG4gKiBgXG4gKiAvLyBzdGF0ZXMgPSBbJ3BlbmRpbmcnLCAnc3VjY2VzcycsICdmYWlsdXJlJ11cbiAqIC8vIHJvdXRlcyA9IFsgJ3BlbmRpbmctPnN1Y2Nlc3MnLCAncGVuZGluZy0+ZmFpbHVyZSddXG4gKiAvLyB0cmFuc2l0aW9ucyA9IFtcbiAqIC8vICAgWydwZW5kaW5nJywgJ3N1Y2Nlc3MnXSxcbiAqIC8vICAgWydwZW5kaW5nJywgJ2ZhaWx1cmUnXVxuICogLy8gXVxuICovXG5cbmZ1bmN0aW9uIGRlY29tcG9zZUNoYXJ0IChjaGFydCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZUNoYXJ0JyxcbiAgICB7IGNoYXJ0OiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIGNoYXJ0XG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlZExpbmVzKGNoYXJ0KVxuICBjb25zdCBsaW5lc09mVG9rZW5zID0gdG9rZW5pc2VkTGluZXMobGluZXMpXG4gIGNvbnN0IGxpbmVzT2ZSb3V0ZXMgPSBsaW5lc09mVG9rZW5zXG4gICAgLm1hcChkZWNvbXBvc2VSb3V0ZUZyb21Ub2tlbnMpXG4gICAgLmZsYXQoMSlcblxuICBjb25zdCBsaW5lc09mVHJhbnNpdGlvbnMgPSBsaW5lc09mUm91dGVzXG4gICAgLm1hcChkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSlcbiAgICAuZmxhdCgxKVxuXG4gIGNvbnN0IHN0YXRlcyA9IFtdXG4gIGNvbnN0IHJvdXRlS2V5cyA9IGxpbmVzT2ZUcmFuc2l0aW9ucy5tYXAocm91dGUgPT4ge1xuICAgIHN0YXRlcy5wdXNoKC4uLnJvdXRlKVxuICAgIHJldHVybiByb3V0ZS5qb2luKGN4QXJyb3cpXG4gIH0pXG5cbiAgY29uc3QgZmlsdGVyZWRSb3V0ZXMgPSB1bmlxKHJvdXRlS2V5cylcbiAgY29uc3QgZmlsdGVyZWRTdGF0ZXMgPSB1bmlxKHN0YXRlcylcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2l0aW9uczogZmlsdGVyZWRSb3V0ZXMubWFwKHJvdXRlID0+IHJvdXRlLnNwbGl0KGN4QXJyb3cpKSxcbiAgICByb3V0ZXM6IGZpbHRlcmVkUm91dGVzLFxuICAgIHN0YXRlczogZmlsdGVyZWRTdGF0ZXNcbiAgfVxufVxuXG5mdW5jdGlvbiBsaW5lc0Zyb20gKHN0ck9yQXJyKSB7XG4gIHJldHVybiBbc3RyT3JBcnJdXG4gICAgLmZsYXQoKVxuICAgIC5yZWR1Y2UoKGFjYywgbGluZSkgPT4gWy4uLmFjYywgbGluZS5zcGxpdChyeENSTEYpXSwgW10pXG4gICAgLmZsYXQoKVxufVxuXG5mdW5jdGlvbiBjb25kZW5zZWRMaW5lcyAoc3RyT3JBcnIpIHtcbiAgY29uc3QgaW5wdXQgPSBsaW5lc0Zyb20oc3RyT3JBcnIpXG4gIGNvbnN0IG91dHB1dCA9IFtdXG5cbiAgaW5wdXQucmVkdWNlKChjb25kZW5zZWRMaW5lLCBsaW5lKSA9PiB7XG4gICAgY29uc3Qgc2FuaXRpc2VkTGluZSA9IGxpbmVcbiAgICAgIC5yZXBsYWNlKHJ4Q29tbWVudCwgJycpXG4gICAgICAucmVwbGFjZShyeERpc2FsbG93ZWRDaGFyYWN0ZXJzLCAnJylcblxuICAgIGlmICghc2FuaXRpc2VkTGluZSkge1xuICAgICAgcmV0dXJuIGNvbmRlbnNlZExpbmVcbiAgICB9XG5cbiAgICBpZiAocnhMaW5lQ29udGluYXRpb25zLnRlc3Qoc2FuaXRpc2VkTGluZSkpIHtcbiAgICAgIHJldHVybiBjb25kZW5zZWRMaW5lICsgc2FuaXRpc2VkTGluZVxuICAgIH1cblxuICAgIG91dHB1dC5wdXNoKGNvbmRlbnNlZExpbmUgKyBzYW5pdGlzZWRMaW5lKVxuICAgIHJldHVybiAnJ1xuICB9LCAnJylcblxuICByZXR1cm4gb3V0cHV0XG59XG5cbmZ1bmN0aW9uIHRva2VuaXNlZExpbmVzIChsaW5lcykge1xuICByZXR1cm4gbGluZXMubWFwKGxpbmUgPT4gbGluZS5zcGxpdChjeEFycm93KS5tYXAoc3RyID0+IHN0ci5zcGxpdChjeFBpcGUpKSlcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGVGcm9tVG9rZW5zIChsaW5lKSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdXG5cbiAgbGluZS5yZWR1Y2UoKHByZXZpb3VzU3RhdGVzLCBzdGF0ZXMpID0+IHtcbiAgICBpZiAocHJldmlvdXNTdGF0ZXMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gWy4uLnN0YXRlc11cbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChbcHJldmlvdXNTdGF0ZXMsIFsuLi5zdGF0ZXNdXSlcbiAgICByZXR1cm4gWy4uLnN0YXRlc11cbiAgfSwgZmFsc2UpXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSAoW2Zyb21TdGF0ZXMsIHRvU3RhdGVzXSkge1xuICByZXR1cm4gZnJvbVN0YXRlcy5yZWR1Y2UoKGFjYywgZnJvbVN0YXRlKSA9PiBbXG4gICAgLi4uYWNjLFxuICAgIC4uLnRvU3RhdGVzLm1hcCh0b1N0YXRlID0+IHtcbiAgICAgIHJldHVybiBbZnJvbVN0YXRlLCB0b1N0YXRlXVxuICAgIH0pXG4gIF0sIFtdKVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRlNNXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3RhdGVib3QsXG4gIGlzU3RhdGVib3Rcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIFN0YXRlYm90LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICogIFRoZSBzdGF0ZS1jaGFydC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc3RhcnRJbj1hdXRvXVxuICogIFRoZSBzdGF0ZSBpbiB3aGljaCB0byBzdGFydC4gSWYgdW5zcGVjaWZpZWQsIHRoZSBmaXJzdCBzdGF0ZSBpbiB0aGVcbiAqICBjaGFydCB3aWxsIGJlIHVzZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgSG93IG5vaXN5IHRoZSBsb2dnaW5nIGlzLCBmcm9tIDEgdG8gMzpcbiAqICBgYGBcbiAqICAxKSBjb25zb2xlLndhcm5cbiAqICAyKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlXG4gKiAgMykgY29uc29sZS53YXJuL2xvZy90YWJsZS9pbmZvXG4gKiAgYGBgXG4gKiAgYDNgIGlzIHRoZSBkZWZhdWx0LiBBcmd1bWVudCB0eXBlLWVycm9ycyB3aWxsIGFsd2F5cyBgdGhyb3dgLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtoaXN0b3J5TGltaXQ9Ml1cbiAqICBMaW1pdCBob3cgbXVjaCBoaXN0b3J5IHRoZSBzdGF0ZS1tYWNoaW5lIGtlZXBzLiBBY2Nlc3NlZCB2aWFcbiAqICB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeXxzdGF0ZWJvdEZzbSNoaXN0b3J5KCl9LlxuICogQHByb3BlcnR5IHtldmVudHN9IFtldmVudHNdXG4gKiAgSWYgeW91IHdpc2ggdG8gaGF2ZSB5b3VyIFN0YXRlYm90cyBsaXN0ZW4gdG8gZXZlbnRzIGNvbWluZyBmcm9tXG4gKiAgYSBzaGFyZWQgRXZlbnRFbWl0dGVyLCB5b3UgY2FuIHBhc3MgaXQgaW4gaGVyZS4gVGhlIGBlbWl0KClgL2BvbkV2ZW50KClgL1xuICogIGBwZXJmb3JtVHJhbnNpdGlvbnMoKWAgbWV0aG9kcyB3aWxsIHVzZSBpdC5cbiAqXG4gKiAgSXQgc2hvdWxkIGhhdmUgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19jbGFzc19ldmVudGVtaXR0ZXJ8RXZlbnRFbWl0dGVyfS5cbiAqL1xuXG4vKipcbiAqIEEgZGVzY3JpcHRpb24gb2YgYWxsIHRoZSBzdGF0ZXMgaW4gYSBtYWNoaW5lLCBwbHVzIGFsbCBvZiB0aGVcbiAqIHBlcm1pdHRlZCB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZW0uXG4gKlxuICogVGhpcyBpcyBkZWZpbmVkIHVzaW5nIGEgYHN0cmluZ2Agb3IgYW4gYGFycmF5YCBvZiBzdHJpbmdzLCBidXRcbiAqICB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHN8VGVtcGxhdGUgTGl0ZXJhbHN9XG4gKiBhcmUgbXVjaCBtb3JlIGNvbnZlbmllbnQuXG4gKlxuICogQW4gYXJyb3cgYC0+YCBjb25maWd1cmVzIGEgKipwZXJtaXR0ZWQgdHJhbnNpdGlvbioqIGJldHdlZW4gdHdvIHN0YXRlczpcbiAqXG4gKiBgYGBcbiAqIGZyb20tc3RhdGUgLT4gdG8tc3RhdGVcbiAqIGBgYFxuICpcbiAqIEl0J3MgdGhlIG9ubHkgb3BlcmF0b3IgbmVlZGVkIHRvIGJ1aWxkIGFueSBjaGFydDpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWRcbiAqICAgcGVuZGluZyAtPiByZWplY3RlZFxuICogICByZXNvbHZlZCAtPiBkb25lXG4gKiAgIHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIFRoZSBcIk9SXCIgb3BlcmF0b3IgYHxgIGNhbiBoZWxwIHVzIHJlbW92ZSBzb21lIHJlZHVuZGFuY3kgZnJvbSB0aGUgYWJvdmUgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZFxuICogICByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEluIGJvdGggY2hhcnRzLCBgcGVuZGluZ2AgY2FuIHRyYW5zaXRpb24gdG8gYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgLCBhbmRcbiAqIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCBjYW4gYm90aCB0cmFuc2l0aW9uIHRvIGBkb25lYC5cbiAqXG4gKiBXZSBjYW4gc3RyZWFtbGluZSB0aGlzIGV2ZW4gZnVydGhlcjpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEFnYWluLCB0aGlzIGlzIGV4YWN0bHkgZXF1aXZhbGVudCB0byB0aGUgcHJldmlvdXMgdHdvIGV4YW1wbGVzLlxuICpcbiAqIE5vdGljZSBpbiB0aGlzIG9uZSB0aGF0IHdlIGhhdmUgcGFyZW50aGVzZXMgYChgIGApYCBzdXJyb3VuZGluZyBgcmVzb2x2ZWRgXG4gKiBhbmQgYHJlamVjdGVkYC4gVGhleSBhcmUgYWN0dWFsbHkgY29tcGxldGVseSBpZ25vcmVkIGJ5IHRoZSBwYXJzZXIsIGFuZFxuICogeW91IGNhbiB1c2UgdGhlbSBhcyB5b3UgcGxlYXNlIHRvIGhlbHAgbWFrZSB5b3VyIGNoYXJ0cyBtb3JlIHJlYWRhYmxlLlxuICpcbiAqIEEgY2hhcnQgd29ya3MgZXhhY3RseSB0aGUgc2FtZSB3aXRob3V0IHRoZW06XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQ2hhcnRzIGNhbiBhbHNvIGJlIHNwbGl0IGFjcm9zcyBtdWx0aXBsZS1saW5lczpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT5cbiAqICAgcmVzb2x2ZWQgfFxuICogICByZWplY3RlZCAtPlxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqIE5vdGljZSB0aGF0IGFsbCB3aGl0ZS1zcGFjZSBpcyBpZ25vcmVkIG9uIGVpdGhlciBzaWRlIG9mIHRoZSBgLT5gXG4gKiBhbmQgYHxgLlxuICpcbiAqIGAvLyBDb21tZW50cyBvZiB0aGlzIGtpbmQgYXJlIGFsbG93ZWQsIHRvbzpgXG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IC8vIFdoZXJlIGRvIHdlIGdvIGZyb20gaGVyZT9cbiAqICAgICAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gLy8gQWgsIHllc1xuICpcbiAqICAgLy8gQW5kIG5vdyB3ZSdyZSBhbGwgZmluaXNoZWRcbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogRmluYWxseSwgaGVyZSdzIGEgbW9yZSBmdWxsIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBkcmFnRHJvcENoYXJ0ID0gYFxuICogICBpZGxlIC0+XG4gKiAgICAgZHJhZy1kZXRlY3QgLT5cbiAqICAgICAgIChkcmFnZ2luZyB8IGNsaWNrZWQpXG4gKlxuICogICAvLyBKdXN0IGEgY2xpY2ssIGJhaWwtb3V0IVxuICogICBjbGlja2VkIC0+IGlkbGVcbiAqXG4gKiAgIC8vIERyYWcgZGV0ZWN0ZWQhXG4gKiAgIGRyYWdnaW5nIC0+XG4gKiAgICAgZHJhZy13YWl0IC0+IGRyYWdnZWQgLT4gZHJhZy13YWl0XG4gKlxuICogICAvLyBEcmFnIGZpbmlzaGVkLi4uXG4gKiAgIChkcmFnLXdhaXQgfCBkcmFnZ2VkKSAtPlxuICogICAgIChkcmFnLWRvbmUgfCBkcmFnLWNhbmNlbCkgLT5cbiAqICAgICAgIGlkbGVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmd8c3RyaW5nW119IHN0YXRlYm90Q2hhcnRcbiAqL1xuXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHNcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNvbnN0IHtcbiAgaXNBcnJheSxcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzRnVuY3Rpb24sXG4gIGlzUG9qbyxcbiAgaXNTdHJpbmcsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyLFxuICBSZWZlcmVuY2VDb3VudGVyXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQsIGN4QXJyb3cgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbi8qKlxuICogQ3JlYXRlIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gYG9iamVjdGAuXG4gKlxuICogQG1lbWJlcm9mIHN0YXRlYm90XG4gKiBAZnVuY3Rpb25cbiAqIEBleGFtcGxlXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsZW1taW5nJywge1xuICogICBjaGFydDogYFxuICogICAgIHdhbGtpbmcgLT4gKGRpZ2dpbmcgfCBidWlsZGluZyB8IGZhbGxpbmcpIC0+XG4gKiAgICAgICB3YWxraW5nXG4gKlxuICogICAgIGZhbGxpbmcgLT4gc3BsYXR0aW5nXG4gKiAgICAgd2Fsa2luZyAtPiBleGl0aW5nXG4gKiAgIGBcbiAqIH0pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqICBHaXZlIHlvdXIgU3RhdGVib3QgYSBuYW1lLiBVc2VkIGZvciBsb2dnaW5nIGFuZCBieSB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gKiBAcGFyYW0ge3N0YXRlYm90T3B0aW9uc30gb3B0aW9uc1xuICovXG5cbmZ1bmN0aW9uIFN0YXRlYm90IChuYW1lLCBvcHRpb25zKSB7XG4gIGlmICghaXNTdHJpbmcobmFtZSkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1xcblN0YXRlYm90OiBQbGVhc2Ugc3BlY2lmeSBhIG5hbWUgZm9yIHRoaXMgbWFjaGluZScpXG4gIH1cblxuICBjb25zdCBsb2dQcmVmaXggPSBgU3RhdGVib3RbJHtuYW1lfV1gXG4gIGlmICghaXNQb2pvKG9wdGlvbnMpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGBcXG4ke2xvZ1ByZWZpeH06IFBsZWFzZSBzcGVjaWZ5IG9wdGlvbnMgZm9yIHRoaXMgbWFjaGluZWApXG4gIH1cblxuICBjb25zdCB7XG4gICAgY2hhcnQgPSB1bmRlZmluZWQsXG4gICAgbG9nTGV2ZWwgPSAzLFxuICAgIGhpc3RvcnlMaW1pdCA9IDJcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoYCR7bG9nUHJlZml4fSNgKVxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuICBjb25zdCB7IGNhbldhcm4gfSA9IGNvbnNvbGVcblxuICBjb25zdCB7XG4gICAgc3RhdGVzID0gW10sXG4gICAgcm91dGVzID0gW11cbiAgfSA9IGNoYXJ0ID8gZGVjb21wb3NlQ2hhcnQoY2hhcnQpIDogb3B0aW9uc1xuXG4gIGNvbnN0IHsgc3RhcnRJbiA9IHN0YXRlc1swXSB9ID0gb3B0aW9uc1xuICBpZiAoIXN0YXRlcy5pbmNsdWRlcyhzdGFydEluKSkge1xuICAgIHRocm93IEVycm9yKGAke2xvZ1ByZWZpeH06IFN0YXJ0aW5nLXN0YXRlIG5vdCBpbiBjaGFydDogXCIke3N0YXJ0SW59XCJgKVxuICB9XG5cbiAgbGV0IHRyYW5zaXRpb25JZCA9IDBcbiAgY29uc3Qgc3RhdGVIaXN0b3J5ID0gW3N0YXJ0SW5dXG4gIGNvbnN0IHN0YXRlSGlzdG9yeUxpbWl0ID0gTWF0aC5tYXgoaGlzdG9yeUxpbWl0LCAyKVxuICBjb25zdCBldmVudHMgPSBpc0V2ZW50RW1pdHRlcihvcHRpb25zLmV2ZW50cykgPyBvcHRpb25zLmV2ZW50cyA6IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGNvbnN0IGludGVybmFsRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIGNvbnN0IElOVEVSTkFMX0VWRU5UUyA9IHtcbiAgICBvblN3aXRjaGluZzogJyhBTlkpc3RhdGU6Y2hhbmdpbmcnLFxuICAgIG9uU3dpdGNoZWQ6ICcoQU5ZKXN0YXRlOmNoYW5nZWQnXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0SW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGludGVybmFsRXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gb25JbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIGZuKSB7XG4gICAgaW50ZXJuYWxFdmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaW50ZXJuYWxFdmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGF0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdzdGF0ZXMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlcycsXG4gICAgWy4uLnN0YXRlc11cbiAgKVxuICBjb25zdCByb3V0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICd0cmFuc2l0aW9ucycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9ucycsXG4gICAgWy4uLnJvdXRlc11cbiAgKVxuICBjb25zdCBldmVudHNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdldmVudHMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzJ1xuICApXG5cbiAgLy8gSW50ZXJwcmV0cyBvblRyYW5zaXRpb25zKCkgYW5kIHBlcmZvcm1UcmFuc2l0aW9ucygpXG4gIGZ1bmN0aW9uIGFwcGx5SGl0Y2hlciAoaGl0Y2hlciwgZm5OYW1lKSB7XG4gICAgY29uc3QgaGl0Y2hlckFjdGlvbnMgPVxuICAgICAgaXNGdW5jdGlvbihoaXRjaGVyKVxuICAgICAgICA/IGhpdGNoZXIoeyBlbnRlciwgZW1pdCwgRW50ZXIsIEVtaXQgfSlcbiAgICAgICAgOiBpc1Bvam8oaGl0Y2hlcilcbiAgICAgICAgICA/IGhpdGNoZXJcbiAgICAgICAgICA6IG51bGxcblxuICAgIGlmICghaXNQb2pvKGhpdGNoZXJBY3Rpb25zKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEV4cGVjdGVkIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0YFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50cyA9IHt9XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSBbXVxuXG4gICAgT2JqZWN0LmVudHJpZXMoaGl0Y2hlckFjdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoW3JvdXRlQ2hhcnQsIGFjdGlvbk9yQ29uZmlnXSkgPT4ge1xuICAgICAgICAvLyBvblRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBpZiAoaXNGdW5jdGlvbihhY3Rpb25PckNvbmZpZykpIHtcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9IGVsc2UgaWYgKCFpc1Bvam8oYWN0aW9uT3JDb25maWcpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMS8zLi4uXG4gICAgICAgIGNvbnN0IHsgb246IF9vbiwgdGhlbjogX3RoZW4gfSA9IGFjdGlvbk9yQ29uZmlnXG4gICAgICAgIGlmIChpc1N0cmluZyhfb24pIHx8IGlzQXJyYXkoX29uKSkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZXMgPSBbX29uXS5mbGF0KClcbiAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IF90aGVuIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKF90aGVuKSkge1xuICAgICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgICAgICAgLy8gKEJlaGF2ZSBsaWtlIG9uVHJhbnNpdGlvbnMgaWYgYSBjb25maWcgaXMgc3BlY2lmaWVkLCBidXRcbiAgICAgICAgICAvLyAgdGhlcmUgaXMgbm8gXCJvblwiIGV2ZW50Li4uKVxuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICAgIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgY29uc3QgZGVjb21wb3NlZEV2ZW50cyA9IE9iamVjdC5lbnRyaWVzKGV2ZW50cylcbiAgICAgIC5yZWR1Y2UoKGFjYywgW2V2ZW50TmFtZSwgX2NvbmZpZ3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIGNvbmZpZ3MgfSA9IGRlY29tcG9zZUNvbmZpZ3MoX2NvbmZpZ3MsIGNhbldhcm4pXG4gICAgICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgIFtldmVudE5hbWVdOiBjb25maWdzXG4gICAgICAgIH1cbiAgICAgIH0sIHt9KVxuXG4gICAgY29uc3QgYWxsQ2xlYW51cEZucyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMoZGVjb21wb3NlZEV2ZW50cylcbiAgICAgICAgLm1hcCgoW2V2ZW50TmFtZSwgY29uZmlnc10pID0+XG4gICAgICAgICAgW1xuICAgICAgICAgICAgZXZlbnRzSGFuZGxlZC5pbmNyZWFzZShldmVudE5hbWUpLFxuICAgICAgICAgICAgb25FdmVudChldmVudE5hbWUsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50V2FzSGFuZGxlZCA9IGNvbmZpZ3Muc29tZShcbiAgICAgICAgICAgICAgICAoeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXNzZWQgPSBpblN0YXRlKGZyb21TdGF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKC4uLmFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICByZXR1cm4gISFwYXNzZWRcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIGlmICghZXZlbnRXYXNIYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk5vT3AoYEV2ZW50IG5vdCBoYW5kbGVkOiBcIiR7ZXZlbnROYW1lfVwiYClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgICkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gb25UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29uZmlncyA9IGRlY29tcG9zZUNvbmZpZ3ModHJhbnNpdGlvbnMsIGNhbldhcm4pXG5cbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBhbGxTdGF0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5zdGF0ZXMpXG4gICAgICBhbGxSb3V0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5yb3V0ZXMpXG4gICAgfVxuXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4udHJhbnNpdGlvbkNvbmZpZ3MuY29uZmlncy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSA9IHRyYW5zaXRpb25cbiAgICAgICAgY29uc3Qgcm91dGUgPSBgJHtmcm9tU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHJvdXRlc0hhbmRsZWQuaW5jcmVhc2Uocm91dGUpLFxuICAgICAgICAgIG9uSW50ZXJuYWxFdmVudChyb3V0ZSwgYWN0aW9uKVxuICAgICAgICBdXG4gICAgICB9KS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBEZWJ1Z2dpbmcsIGlmIHdlJ3JlIGF0IHRoZSByaWdodCBsZXZlbFxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGNvbnN0IGludmFsaWRTdGF0ZXMgPSBhbGxTdGF0ZXMuZmlsdGVyKHN0YXRlID0+ICFzdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICAgICAgY29uc3QgaW52YWxpZFJvdXRlcyA9IGFsbFJvdXRlcy5maWx0ZXIocm91dGUgPT4gIXJvdXRlcy5pbmNsdWRlcyhyb3V0ZSkpXG4gICAgICBpZiAoaW52YWxpZFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCBzdGF0ZXMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRTdGF0ZXMubWFwKHN0YXRlID0+IGAgID4gXCIke3N0YXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgaWYgKGludmFsaWRSb3V0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgdHJhbnNpdGlvbnMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRSb3V0ZXMubWFwKHJvdXRlID0+IGAgID4gXCIke3JvdXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBhbGxDbGVhbnVwRm5zLmZvckVhY2goZm4gPT4gZm4oKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDJdXG4gIH1cblxuICBmdW5jdGlvbiBjdXJyZW50U3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDFdXG4gIH1cblxuICBmdW5jdGlvbiBjYW5UcmFuc2l0aW9uVG8gKC4uLnN0YXRlcykge1xuICAgIGNvbnN0IHRlc3RTdGF0ZXMgPSBzdGF0ZXMuZmxhdCgpXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdjYW5UcmFuc2l0aW9uVG8nLCB7IHN0YXRlOiBpc1N0cmluZyB9LCB0ZXN0U3RhdGVzWzBdKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgaWYgKCF0ZXN0U3RhdGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICByZXR1cm4gdGVzdFN0YXRlcy5ldmVyeShzdGF0ZSA9PiBuZXh0U3RhdGVzLmluY2x1ZGVzKHN0YXRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlIChzdGF0ZSkge1xuICAgIGNvbnN0IF9zdGF0ZSA9IHN0YXRlICE9PSB1bmRlZmluZWRcbiAgICAgID8gc3RhdGVcbiAgICAgIDogY3VycmVudFN0YXRlKClcblxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBfc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGVzLnJlZHVjZSgoYWNjLCByb3V0ZSkgPT4ge1xuICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSByb3V0ZS5zcGxpdChjeEFycm93KVxuICAgICAgICAubWFwKHN0YXRlID0+IHN0YXRlLnRyaW0oKSlcblxuICAgICAgaWYgKGZyb21TdGF0ZSA9PT0gX3N0YXRlKSB7XG4gICAgICAgIHJldHVybiBbLi4uYWNjLCB0b1N0YXRlXVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4sIC4uLmZuQXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignaW5TdGF0ZScsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgY29uZGl0aW9uTWF0Y2hlcyA9IGN1cnJlbnRTdGF0ZSgpID09PSBzdGF0ZVxuXG4gICAgaWYgKGFueU9yRm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFjb25kaXRpb25NYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbihhbnlPckZuKSkge1xuICAgICAgICByZXR1cm4gYW55T3JGbiguLi5mbkFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gYW55T3JGblxuICAgIH1cblxuICAgIHJldHVybiBjb25kaXRpb25NYXRjaGVzXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VtaXQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIGVudGVyIChzdGF0ZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW50ZXInLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGluU3RhdGUgPSBjdXJyZW50U3RhdGUoKVxuICAgIGNvbnN0IHRvU3RhdGUgPSBzdGF0ZVxuXG4gICAgaWYgKHRvU3RhdGUgPT09IGluU3RhdGUpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBBbHJlYWR5IGluIHN0YXRlOiBcIiR7dG9TdGF0ZX1cImApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlcy5pbmNsdWRlcyh0b1N0YXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgc3RhdGUgXCIke3RvU3RhdGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFJvdXRlID0gYCR7aW5TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgaWYgKCFyb3V0ZXMuaW5jbHVkZXMobmV4dFJvdXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgdHJhbnNpdGlvbiBcIiR7bmV4dFJvdXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIEZlbGwtdGhyb3VnaCwgY2FuIGVudGVyIG5leHQgc3RhdGVcbiAgICBjb25zb2xlLmluZm8oYCR7bG9nUHJlZml4fTogdElkPCR7Kyt0cmFuc2l0aW9uSWR9PjogJHtuZXh0Um91dGV9YClcblxuICAgIHN0YXRlSGlzdG9yeS5wdXNoKHRvU3RhdGUpXG4gICAgaWYgKHN0YXRlSGlzdG9yeS5sZW5ndGggPiBzdGF0ZUhpc3RvcnlMaW1pdCkge1xuICAgICAgc3RhdGVIaXN0b3J5LnNoaWZ0KClcbiAgICB9XG5cbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMub25Td2l0Y2hpbmcsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQobmV4dFJvdXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5vblN3aXRjaGVkLCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXZlbnQgKGV2ZW50TmFtZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXZlbnQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcsIGNiOiBpc0Z1bmN0aW9uIH0sIGV2ZW50TmFtZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBldmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgICByZXR1cm4gKCkgPT4gZXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gIH1cblxuICBjb25zdCBzd2l0Y2hNZXRob2RzID0gT2JqZWN0LmtleXMoSU5URVJOQUxfRVZFTlRTKVxuICAgIC5yZWR1Y2UoKG9iaiwgbWV0aG9kTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbbWV0aG9kTmFtZV06IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcihtZXRob2ROYW1lLCB7IGNiOiBpc0Z1bmN0aW9uIH0sIGNiKVxuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudCA9IHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoSU5URVJOQUxfRVZFTlRTW21ldGhvZE5hbWVdKVxuICAgICAgICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25JbnRlcm5hbEV2ZW50KFxuICAgICAgICAgICAgSU5URVJOQUxfRVZFTlRTW21ldGhvZE5hbWVdLFxuICAgICAgICAgICAgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBjYih0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVFdmVudCgpXG4gICAgICAgICAgICBkZWNyZWFzZVJlZkNvdW50KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7fSlcblxuICBjb25zdCBlbnRlckV4aXRNZXRob2RzID0gW1xuICAgIFsnRXhpdGluZycsICdvblN3aXRjaGluZyddLFxuICAgIFsnRW50ZXJpbmcnLCAnb25Td2l0Y2hpbmcnXSxcbiAgICBbJ0V4aXRlZCcsICdvblN3aXRjaGVkJ10sXG4gICAgWydFbnRlcmVkJywgJ29uU3dpdGNoZWQnXVxuICBdXG4gICAgLnJlZHVjZSgob2JqLCBuYW1lcykgPT4ge1xuICAgICAgY29uc3QgW25hbWUsIHN3aXRjaE1ldGhvZF0gPSBuYW1lc1xuICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGBvbiR7bmFtZX1gXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW21ldGhvZE5hbWVdOiBmdW5jdGlvbiAoc3RhdGUsIGNiKSB7XG4gICAgICAgICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKG1ldGhvZE5hbWUsIHsgc3RhdGU6IGlzU3RyaW5nLCBjYjogaXNGdW5jdGlvbiB9LCBzdGF0ZSwgY2IpXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgICAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06JHtldmVudE5hbWV9YClcbiAgICAgICAgICBdXG4gICAgICAgICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBzd2l0Y2hNZXRob2RzW3N3aXRjaE1ldGhvZF0oKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignRXhpdCcpID09PSAwKSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2IodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSB0b1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2IoZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge30pXG5cbiAgZnVuY3Rpb24gRW1pdCAoZXZlbnROYW1lKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdFbWl0JywgeyBldmVudE5hbWU6IGlzU3RyaW5nIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uYXJncykgPT4gZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBFbnRlciAoc3RhdGUpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VudGVyJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IGVudGVyKHN0YXRlLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gSW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4pIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0luU3RhdGUnLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uZm5BcmdzKSA9PiBpblN0YXRlKHN0YXRlLCBhbnlPckZuLCAuLi5mbkFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH06IFN0YXRlLW1hY2hpbmUgcmVzZXQhYClcblxuICAgIHN0YXRlSGlzdG9yeS5sZW5ndGggPSAwXG4gICAgc3RhdGVIaXN0b3J5LnB1c2goc3RhcnRJbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25Ob09wIChtZXNzYWdlKSB7XG4gICAgY29uc3QgbGFzdFN0YXRlID0gcHJldmlvdXNTdGF0ZSgpXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgcHJldlJvdXRlID0gYCR7bGFzdFN0YXRlID09PSB1bmRlZmluZWQgPyAnW3VuZGVmaW5lZF0nIDogbGFzdFN0YXRlfS0+JHtpblN0YXRlfWBcblxuICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICBpZiAoIWF2YWlsYWJsZVN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gVGhlcmUgYXJlIG5vIHN0YXRlcyBhdmFpbGFibGUgZnJvbSBcIiR7aW5TdGF0ZX1cImBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBGcm9tIFwiJHtpblN0YXRlfVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbJHthdmFpbGFibGVTdGF0ZXNcbiAgICAgICAgICAgIC5tYXAoc3RhdGUgPT4gYFwiJHtzdGF0ZX1cImApXG4gICAgICAgICAgICAuam9pbignLCAnKX1dYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZXM6IHN0YXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgdHJhbnNpdGlvbnM6IHJvdXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgZXZlbnRzOiBldmVudHNIYW5kbGVkLnJlZnMoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluZm8gKCkge1xuICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZWApXG5cbiAgICBsb2dSZWZDb3VudGVySW5mbyhzdGF0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHJvdXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8oZXZlbnRzSGFuZGxlZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1JlZkNvdW50ZXJJbmZvIChyZWZDb3VudGVyKSB7XG4gICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgdGFibGUgfSA9IHJlZkNvdW50ZXIudG9WYWx1ZSgpXG4gICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24pXG4gICAgaWYgKHRhYmxlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS50YWJsZSh0YWJsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJyAgPiBObyBpbmZvcm1hdGlvbicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgc3RhdGUtbWFjaGluZSBvYmplY3QgY3JlYXRlZCBieVxuICAgKiB7QGxpbmsgI3N0YXRlYm90c3RhdGVib3R8U3RhdGVib3QoKX0uXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90RnNtXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogRm9yIGlkZW50aWZ5aW5nIFN0YXRlYm90IG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9fU1RBVEVCT1RfXzogMSxcblxuICAgIC8qKlxuICAgICAqIFRlc3RzIHRvIHNlZSBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgc3BlY2lmaWVkIHN0YXRlIGZyb21cbiAgICAgKiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogSWYgbW9yZSB0aGFuIG9uZSBzdGF0ZSBpcyBzcGVjaWZpZWQsIGB0cnVlYCBpcyByZXR1cm5lZCBvbmx5IGlmXG4gICAgICogKipBTEwqKiBzdGF0ZXMgYXJlIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2dhbWUtbWVudXMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+XG4gICAgICogICAgICAgbWVudSAtPlxuICAgICAqICAgICAgICAgcGxheSB8XG4gICAgICogICAgICAgICBvcHRpb25zIHxcbiAgICAgKiAgICAgICAgIHNvdW5kIHxcbiAgICAgKiAgICAgICAgIHF1aXRcbiAgICAgKlxuICAgICAqICAgICAvLyBHbyBiYWNrIHRvIG1lbnVcbiAgICAgKiAgICAgcGxheSB8IG9wdGlvbnMgfCBzb3VuZCAtPiBtZW51XG4gICAgICpcbiAgICAgKiAgICAgLy8gQ2FuIHF1aXQgZnJvbSBtYWluIGdhbWUsIHRvb1xuICAgICAqICAgICBwbGF5IC0+IHF1aXRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BsYXknKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdtZW51JylcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbyhbJ3BsYXknLCAnb3B0aW9ucyddKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBjYW5UcmFuc2l0aW9uVG86IGNhblRyYW5zaXRpb25UbyxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjb3JvdXRpbmUnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBzdXNwZW5kZWQgLT4gcnVubmluZyAtPiAoc3VzcGVuZGVkIHwgZGVhZClcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3VzcGVuZGVkXCJcbiAgICAgKi9cbiAgICBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGVtaXRzIGFuIGV2ZW50LCBmaXJpbmcgYW55IGxpc3RlbmVycyBhZGRlZCB1c2luZ1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnN8LnBlcmZvcm1UcmFuc2l0aW9ucygpfSBvciB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudHwub25FdmVudCgpfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXVxuICAgICAqICBPcHRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogIFdoZXRoZXIgb3Igbm90IHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogIFNlZToge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2VtaXR0ZXJfZW1pdF9ldmVudG5hbWVfYXJnc3xOb2RlIEV2ZW50c31cbiAgICAgKiAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBTdGF0ZWJvdCBpbXBvcnRzIGBFdmVudEVtaXR0ZXJgIGZyb20gdGhlXG4gICAgICogIHtAbGluayBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHN8ZXZlbnRzfVxuICAgICAqIHBhY2thZ2UgZm9yIGRlYWxpbmcgd2l0aCBldmVudHMgaW4gdGhlIGJyb3dzZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Jhc2ljLWZvcm0nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgLT4gcmVkaXJlY3RcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6IHtcbiAgICAgKiAgICAgb246ICdwb3N0LWRhdGEnLFxuICAgICAqICAgICB0aGVuOiAoLi4uYXJncykgPT4ge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBhcmdzOiAnLCBhcmdzKVxuICAgICAqICAgICAgIC8vIHNldFRpbWVvdXQobWFjaGluZS5FbnRlcigncmVkaXJlY3QnKSwgNTAwMClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVtaXQoJ3Bvc3QtZGF0YScsICdIZWxsbywgd29ybGQhJylcbiAgICAgKiAvLyBFdmVudCBhcmdzOiBbXCJIZWxsbywgd29ybGQhXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzZW5kaW5nXCJcbiAgICAgKi9cbiAgICBlbWl0OiBlbWl0LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqICBUaGUgZGVzaXJlZCBldmVudCB0byB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfS5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBlbWl0cyB0aGF0IGV2ZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdzdG9wJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAncHJlcGFyZS10by1nbyAtPiBnbyc6ICAgICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAncHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIG5leHRUcmFmZmljTGlnaHQgPSBtYWNoaW5lLkVtaXQoJ3RpbWVyJylcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzdG9wXCJcbiAgICAgKlxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicHJlcGFyZS10by1zdG9wXCJcbiAgICAgKi9cbiAgICBFbWl0OiBFbWl0LFxuXG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nIGFzIGl0IGlzXG4gICAgICogYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIGRlc2lyZWQgc3RhdGUgdG8gc3dpdGNoLXRvLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdXG4gICAgICogIE9wdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRyYW5zaXRpb24gY2FsbGJhY2tzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgc3RhdGUgY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZGlhbG9nJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzaG93aW5nLW1vZGFsIC0+IChzYXZpbmcgfCBpZGxlKVxuICAgICAqICAgICAgIHNhdmluZyAtPiBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcImlkbGVcIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2F2aW5nJylcbiAgICAgKiAvLyBmYWxzZVxuICAgICAqXG4gICAgICogLy8gW2RpYWxvZ106IEludmFsaWQgdHJhbnNpdGlvbiBcImlkbGUtPnNhdmluZ1wiLCBub3Qgc3dpdGNoaW5nXG4gICAgICogLy8gPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIlt1bmRlZmluZWRdLT5pZGxlXCJcbiAgICAgKiAvLyA+IEZyb20gXCJpZGxlXCIsIHZhbGlkIHN0YXRlcyBhcmU6IFtcInNob3dpbmctbW9kYWxcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3Nob3dpbmctbW9kYWwnKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBlbnRlcjogZW50ZXIsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUsIHNvIGxvbmdcbiAgICAgKiBhcyBpdCBpcyBhY2Nlc3NpYmxlIGZyb20gdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIGRlc2lyZWQgc3RhdGUgdG8gc3dpdGNoLXRvLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgQSBmdW5jdGlvbiB0aGF0IGNhbiBjaGFuZ2UgdGhlIHN0YXRlIHdoZW4gY2FsbGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwb3B1cC1tZW51Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBtZW51LW9wZW5lZCAtPlxuICAgICAqICAgICAgIChpdGVtLWNsaWNrZWQgfCBpZGxlKVxuICAgICAqXG4gICAgICogICAgIGl0ZW0tY2xpY2tlZCAtPiBpZGxlXG4gICAgICogICBgLFxuICAgICAqICAgc3RhcnRJbjogJ21lbnUtb3BlbmVkJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBidXR0b24ub25jbGljayA9IG1hY2hpbmUuRW50ZXIoJ2l0ZW0tY2xpY2tlZCcpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwibWVudS1vcGVuZWRcIlxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2soKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIml0ZW0tY2xpY2tlZFwiXG4gICAgICovXG4gICAgRW50ZXI6IEVudGVyLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgc3RhdGVzIHRoZSBtYWNoaW5lIGhhcyBiZWVuIGluIHNvIGZhciwgdXAgdG8gYSBsaW1pdCBzZXRcbiAgICAgKiBieSBgaGlzdG9yeUxpbWl0YCBpbiB7QGxpbmsgc3RhdGVib3RPcHRpb25zfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQSBjb3B5IG9mIHRoZSBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdkb3dubG9hZGVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPiAoZmFpbHVyZSB8IHN1Y2Nlc3MpXG4gICAgICogICAgICAgZmFpbHVyZSAtPiBsb2FkaW5nXG4gICAgICogICAgICAgc3VjY2VzcyAtPiBkb25lXG4gICAgICogICBgLFxuICAgICAqICAgaGlzdG9yeUxpbWl0OiA0XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2ZhaWx1cmUnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2xvYWRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3N1Y2Nlc3MnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIG1hY2hpbmUuaGlzdG9yeSgpXG4gICAgICogLy8gW1wiZmFpbHVyZVwiLCBcImxvYWRpbmdcIiwgXCJzdWNjZXNzXCIsIFwiZG9uZVwiXVxuICAgICAqL1xuICAgIGhpc3Rvcnk6ICgpID0+IFsuLi5zdGF0ZUhpc3RvcnldLFxuXG4gICAgLyoqXG4gICAgICogUHJpbnQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZSB0byB0aGUgY29uc29sZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluZm8oKVxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZS5cbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICBzdGF0ZXMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgICAnZG9uZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICAnaWRsZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdIExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9uczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICAgdHJhbnNpdGlvbnMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgJ2lkbGUtPnJlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICdpZGxlLT5zZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZy0+ZG9uZScg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nLT5kb25lJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICAgICAqIC8vIChObyBpbmZvcm1hdGlvbilcbiAgICAgKi9cbiAgICBpbmZvOiAoKSA9PiBpbmZvKCksXG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFNhbWUgZGV0YWlscyBhcyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5mb3wuaW5mbygpfSBpbiBvYmplY3QtZm9ybS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5zcGVjdCgpXG4gICAgICogLy8gV2lsbCByZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAgICogLy8gIHsgc3RhdGVzLCB0cmFuc2l0aW9ucywgZXZlbnRzIH1cbiAgICAgKlxuICAgICAqIC8vIFRoZXNlIHdpbGwgZWFjaCBoYXZlIGtleS12YWx1ZXMsIHRoZSBrZXkgYmVpbmcgdGhlIG5hbWVcbiAgICAgKiAvLyBhbmQgdGhlIHZhbHVlIGJlaW5nIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGF0dGFjaGVkLlxuICAgICAqL1xuICAgIGluc3BlY3Q6ICgpID0+IGluc3BlY3QoKSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9XG4gICAgICogbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGBzdGF0ZWAsIGltbWVkaWF0ZWx5IHJldHVybmluZyBlaXRoZXJcbiAgICAgKiBgdHJ1ZWAgb3IgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGBvdXRwdXRXaGVuVHJ1ZWAgaXMgc3BlY2lmaWVkLCB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBpbnN0ZWFkIG9mIGB0cnVlYCwgYW5kIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2ZcbiAgICAgKiAgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCB0aGVuIGl0cyByZXR1cm4tdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAgICogYXMgdGhlIGB0cnVlYC12YWx1ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUgdG8gdGVzdCBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBbb3V0cHV0V2hlblRydWVdXG4gICAgICogIE9wdGlvbmFsIGB0cnVlYC12YWx1ZS4gSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgYmVcbiAgICAgKiAgY2FsbGVkIGFuZCBpdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfCp9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAnUHVycnJyLi4uJylcbiAgICAgKiAvLyBcIlB1cnJyci4uLlwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdnZWFyLTEnKVxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdJZGxpbmchJylcbiAgICAgKiAgIHJldHVybiAnUHVycnJyLi4uJ1xuICAgICAqIH0pXG4gICAgICogLy8gbnVsbFxuICAgICAqIC8vIF4gdGhlIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgYXQgYWxsIGluIHRoZSBgZmFsc2VgIGNhc2UsXG4gICAgICogLy8gICBzbyBubyBjb25zb2xlLmxvZyBlaXRoZXIuXG4gICAgICovXG4gICAgaW5TdGF0ZTogaW5TdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBydW4sIHRlc3RzIHRoYXRcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0gbWF0Y2hlcyB0aGVcbiAgICAgKiBzcGVjaWZpZWQgc3RhdGUsIHJldHVybmluZyBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlfC5pblN0YXRlKCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUgdG8gdGVzdCBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBbb3V0cHV0V2hlblRydWVdXG4gICAgICogIE9wdGlvbmFsIGB0cnVlYC12YWx1ZS4gSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgYmVcbiAgICAgKiAgY2FsbGVkIGFuZCBpdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYWxscyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGl0dGxlLXJldnZlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICAoZ2Vhci0xIHwgZ2Vhci0yIHwgcmV2ZXJzZSkgLT5cbiAgICAgKiAgICAgaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiB2YXIgaWRsaW5nID0gbWFjaGluZS5JblN0YXRlKCdpZGxlJylcbiAgICAgKiB2YXIgcHVycmluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdJZGxpbmchJylcbiAgICAgKiAgIHJldHVybiAnUHVycnJyLi4uJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBpZGxpbmcoKVxuICAgICAqIC8vIHRydWVcbiAgICAgKlxuICAgICAqIHB1cnJpbmcoKVxuICAgICAqIC8vIElkbGluZyFcbiAgICAgKiAvLyBcIlB1cnJyci4uLlwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdnZWFyLTEnKVxuICAgICAqIHB1cnJpbmcoKVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIEluU3RhdGU6IEluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBzdGF0ZS1tYWNoaW5lLlxuICAgICAqXG4gICAgICogVXNlZCBmb3IgbG9nZ2luZyBhbmQgYWxzbyBieSB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX1cbiAgICAgKiBmb3IgdGhlIHNhbWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnQXksIHRoZXJl4oCZcyB0aGUgcnViLicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHRoZS1xdWVzdGlvbiAtPiAodG8tYmUgfCBub3QtdG8tYmUpXG4gICAgICogICAgICAgbm90LXRvLWJlIC0+IHBlcmNoYW5jZS10by1kcmVhbVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm5hbWUoKVxuICAgICAqIC8vIFwiQXksIHRoZXJl4oCZcyB0aGUgcnViLlwiXG4gICAgICovXG4gICAgbmFtZTogKCkgPT4gbmFtZSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGJlY29tZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtlbnRlckNhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmVkKCdkb25lJywgZnJvbVN0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdFbnRlcmVkIGZyb206JywgZnJvbVN0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyZWQgZnJvbTogcmVjZWl2aW5nXG4gICAgICovXG4gICAgb25FbnRlcmVkOiBlbnRlckV4aXRNZXRob2RzLm9uRW50ZXJlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBtYWRlIGl0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmluZygnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJpbmcgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyaW5nIGZyb206IHNlbmRpbmdcbiAgICAgKiAvLyBXZSBtYWRlIGl0IVxuICAgICAqL1xuICAgIG9uRW50ZXJpbmc6IGVudGVyRXhpdE1ldGhvZHMub25FbnRlcmluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGVudGVyQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIHNwZWNpZmllZFxuICAgICAqIGV2ZW50IGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28gLT4gZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfSxcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV2ZW50KCd0aW1lcicsICgpID0+IHtcbiAgICAgKiAgIHJlZHJhd1RyYWZmaWNMaWdodHMoKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBzZXRJbnRlcnZhbChtYWNoaW5lLkVtaXQoJ3RpbWVyJyksIDIwMDApXG4gICAgICovXG4gICAgb25FdmVudDogb25FdmVudCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIGFyZSBoZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIC8vIFdlIGFyZSBoZWFkaW5nIHRvOiBzZW5kaW5nXG4gICAgICovXG4gICAgb25FeGl0ZWQ6IGVudGVyRXhpdE1ldGhvZHMub25FeGl0ZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipCRUZPUkUqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgaXMgbm8gbG9uZ2VyIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZXhpdENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXhpdGVkKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1BlYWNlIG91dCEnKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXhpdGluZygnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0hlYWRpbmcgdG86JywgdG9TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBIZWFkaW5nIHRvOiByZWNlaXZpbmdcbiAgICAgKiAvLyBQZWFjZSBvdXQhXG4gICAgICovXG4gICAgb25FeGl0aW5nOiBlbnRlckV4aXRNZXRob2RzLm9uRXhpdGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgZXhpdENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSBhZnRlciAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGVkKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBXZSB3ZW50IGZyb20gXCIke2Zyb21TdGF0ZX1cIiB0byBcIiR7dG9TdGF0ZX1cImApXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogLy8gV2Ugd2VudCBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGVkOiBzd2l0Y2hNZXRob2RzLm9uU3dpdGNoZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYmVmb3JlICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBHb2luZyBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIEdvaW5nIGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoaW5nOiBzd2l0Y2hNZXRob2RzLm9uU3dpdGNoaW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoaW5nIC5vblN3aXRjaGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoZWQgLm9uU3dpdGNoZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIHN3aXRjaENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBSdW4gY2FsbGJhY2tzIHdoZW4gdHJhbnNpdGlvbnMgaGFwcGVuLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgc2VuZERhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnc2VudCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAncmVjZWl2ZWQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lJzogd2hhdEhhcHBlbmVkID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FsbCBmaW5pc2hlZDogJywgd2hhdEhhcHBlbmVkKVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNlbmREYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gcmVjZWl2ZURhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFRoZSBhYm92ZSBleGFtcGxlIHVzaW5nIGEgZnVuY3Rpb24gZm9yIGNvbmZpZ1xuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucygoeyBlbnRlciB9KSA9PiAoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgc2VuZERhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IGVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ2lkbGUgLT4gcmVjZWl2aW5nJzogKCkgPT4ge1xuICAgICAqICAgICByZWNlaXZlRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gZW50ZXIoJ2RvbmUnLCAncmVjZWl2ZWQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIGV0Yy4uLlxuICAgICAqL1xuICAgIG9uVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ29uVHJhbnNpdGlvbnMnKSxcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gdHJhbnNpdGlvbnMgd2hlbiBldmVudHMgaGFwcGVuLlxuICAgICAqXG4gICAgICogVXNlIGB0aGVuYCB0byBvcHRpb25hbGx5IGFkZCBjYWxsYmFja3MgdG8gdGhvc2UgdHJhbnNpdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gdHJhbnNpdGlvbnNcbiAgICAgKiAgQ29uZmlndXJhdGlvbiBpbiB0aGUgZm9ybSBvZiBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgICAqICByZXR1cm5zIGFuIG9iamVjdC4gSWYgYSBmdW5jdGlvbiBpcyB1c2VkLCB0aGVyZSB3aWxsIGJlIGEgc2luZ2xlXG4gICAgICogIGFyZ3VtZW50IHBhc3NlZC1pbjogYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzXG4gICAgICogIGF0dGFjaGVkIGFzIGEgY29udmVuaWVuY2U6XG4gICAgICpcbiAgICAgKiAgLSB7e0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfSwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0sIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0sIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9fVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGFkZGVkXG4gICAgICogIGJ5IHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjb21wbGV4LWZvcm0nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgdXBkYXRlXG4gICAgICpcbiAgICAgKiAgICAgLy8gTWF5YmUgdGhpbmdzIHRha2UgYSBsb25nIHRpbWUuLi5cbiAgICAgKiAgICAgdXBkYXRlIC0+XG4gICAgICogICAgICAgd2FpdGluZyAtPiB3YWl0aW5nLWEtd2hpbGVcbiAgICAgKlxuICAgICAqICAgICAvLyBXaGljaCBwYXRoIHdpbGwgd2UgdGFrZT9cbiAgICAgKiAgICAgd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPlxuICAgICAqICAgICAgIHN1Y2Nlc3MgfCBmYWlsZWQgfCB0aW1lb3V0XG4gICAgICpcbiAgICAgKiAgICAgLy8gQWxsIGRvbmUhXG4gICAgICogICAgIHN1Y2Nlc3MgfCBmYWlsZWQgfCB0aW1lb3V0IC0+XG4gICAgICogICAgICAgZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucygoeyBFbnRlciwgZW1pdCB9KSA9PiAoe1xuICAgICAqICAgJ2lkbGUgLT4gdXBkYXRlJzoge1xuICAgICAqICAgICBvbjogJ3VzZXItc2F2ZWQnLFxuICAgICAqICAgICB0aGVuOiAoZGF0YSkgPT4ge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdTZW5kaW5nIGRhdGE6ICcsIGRhdGEpXG4gICAgICpcbiAgICAgKiAgICAgICBzZW5kRGF0YShkYXRhKVxuICAgICAqICAgICAgICAgLnRoZW4oRW50ZXIoJ3N1Y2Nlc3MnKSlcbiAgICAgKiAgICAgICAgIC5jYXRjaChFbnRlcignZmFpbGVkJykpXG4gICAgICpcbiAgICAgKiAgICAgICBlbWl0KCdkYXRhLXNlbnQnKVxuICAgICAqICAgICB9XG4gICAgICogICB9LFxuICAgICAqICAgJ3VwZGF0ZSAtPiB3YWl0aW5nJzoge1xuICAgICAqICAgICBvbjogJ2RhdGEtc2VudCcsXG4gICAgICogICAgIHRoZW46ICgpID0+IHtcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd3YWl0aW5nLWEtd2hpbGUnKSwgNzUwKVxuICAgICAqICAgICAgIHNldFRpbWVvdXQoRW50ZXIoJ3RpbWVvdXQnKSwgNTAwMClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqIH0pKVxuICAgICAqXG4gICAgICogLy8gSnVzdCB0byBpbGx1c3RyYXRlIHRoYXQgeW91IGNhbiBtaXggbicgbWF0Y2ggd2l0aCBvblRyYW5zaXRpb25zOlxuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucyh7XG4gICAgICogICAnd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPiBzdWNjZXNzJzogKCkgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnTG92ZWx5IScpXG4gICAgICogICB9LFxuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gdGltZW91dCc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1dlbGwsIGF0IGxlYXN0IHlvdSBoYXZlIHlvdXIgc2hvZXMnKVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVtaXQoJ3VzZXItc2F2ZWQnLCBbJ3NvbWUnLCAnZGF0YSddKVxuICAgICAqIC8vIFNlbmRpbmcgZGF0YTogW1wic29tZVwiLCBcImRhdGFcIl1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNlbmREYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqL1xuICAgIHBlcmZvcm1UcmFuc2l0aW9uczogdHJhbnNpdGlvbnMgPT4gYXBwbHlIaXRjaGVyKHRyYW5zaXRpb25zLCAncGVyZm9ybVRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwcmV2aW91cyBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfVxuICAgICAqICBUaGUgcHJldmlvdXMgc3RhdGUsIG9yIGB1bmRlZmluZWRgIGlmIHRoZXJlIGlzbid0IG9uZSAoaWU7IHlvdVxuICAgICAqICBoYXZlIGp1c3QgY2FsbGVkIHtAbGluayAjc3RhdGVib3Rmc21yZXNldHwucmVzZXQoKX0sIG9yIHRoZVxuICAgICAqICBtYWNoaW5lIGhhcyBqdXN0IHN0YXJ0ZWQuKVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdzaW1wbGUtc2VuZGVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogbWFjaGluZS5wcmV2aW91c1N0YXRlKClcbiAgICAgKiAvLyBcImlkbGVcIlxuICAgICAqL1xuICAgIHByZXZpb3VzU3RhdGU6IHByZXZpb3VzU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdGF0ZS1tYWNoaW5lIHRvIGl0cyBzdGFydGluZy1zdGF0ZSBhbmQgY2xlYXJzIHRoZVxuICAgICAqIHN0YXRlLWhpc3RvcnkuXG4gICAgICpcbiAgICAgKiBBbGwgbGlzdGVuZXJzIHdpbGwgc3RpbGwgYmUgYXR0YWNoZWQsIGJ1dCBubyBldmVudHMgb3IgdHJhbnNpdGlvbnMgd2lsbCBiZSBmaXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjYXJvdXNlbCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHBhZ2UtMSAtPlxuICAgICAqICAgICBwYWdlLTIgLT5cbiAgICAgKiAgICAgcGFnZS0zIC0+XG4gICAgICogICAgIHBhZ2UtNCAtPiBwYWdlLTFcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncGFnZS0yJylcbiAgICAgKiBtYWNoaW5lLnJlc2V0KClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJwYWdlLTFcIlxuICAgICAqL1xuICAgIHJlc2V0OiByZXNldCxcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBgYXJyYXlgIG9mIHN0YXRlcyBhY2Nlc3NpYmxlIGZyb20gdGhlIHN0YXRlIHNwZWNpZmllZC5cbiAgICAgKiBJZiBubyBzdGF0ZSBpcyBwYXNzZWQtaW4sIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0gaXMgdXNlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGVdIFRoZSBzdGF0ZSB0byBjaGVjay4ge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9XG4gICAgICogIGlmIHVuc3BlY2lmaWVkLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmdbXX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgICogLy8gW1wic2VuZGluZ1wiLCBcInJlY2VpdmluZ1wiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgncmVjZWl2aW5nJylcbiAgICAgKiAvLyBbXCJkb25lXCJdXG4gICAgICovXG4gICAgc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmU6IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlQ29uZmlncyAoY29uZmlncywgY2FuV2Fybikge1xuICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gIGNvbnN0IF9jb25maWdzID0gY29uZmlncy5yZWR1Y2UoKGFjYywgY29uZmlnKSA9PiB7XG4gICAgY29uc3QgeyByb3V0ZUNoYXJ0LCBhY3Rpb24gfSA9IGNvbmZpZ1xuICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydChyb3V0ZUNoYXJ0KVxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmFjYyxcbiAgICAgIC4uLnRyYW5zaXRpb25zLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSB0cmFuc2l0aW9uXG4gICAgICAgIHJldHVybiB7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH1cbiAgICAgIH0pXG4gICAgXVxuICB9LCBbXSlcblxuICByZXR1cm4ge1xuICAgIGNvbmZpZ3M6IF9jb25maWdzLFxuICAgIHN0YXRlczogYWxsU3RhdGVzLFxuICAgIHJvdXRlczogYWxsUm91dGVzXG4gIH1cbn1cblxuLyoqXG4gKiBUZXN0cyB0aGF0IGFuIG9iamVjdCBpcyBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gKlxuICogaXNTdGF0ZWJvdChtYWNoaW5lKVxuICogLy8gdHJ1ZVxuICpcbiAqIEBwYXJhbSB7YW55fSBvYmplY3QgVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblxuZnVuY3Rpb24gaXNTdGF0ZWJvdCAob2JqZWN0KSB7XG4gIHJldHVybiAoXG4gICAgaXNQb2pvKG9iamVjdCkgJiZcbiAgICB0eXBlb2Ygb2JqZWN0Ll9fU1RBVEVCT1RfXyA9PT0gJ251bWJlcidcbiAgKVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQVNTRVJUSU9OIEhFTFBFUlNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByb3V0ZUlzUG9zc2libGUsXG4gIGFzc2VydFJvdXRlXG59XG5cbmNvbnN0IHsgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGRlY29tcG9zZVJvdXRlIH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuY29uc3Qge1xuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBMb2dnZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgaXNUZW1wbGF0ZUxpdGVyYWxcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IGEgY2VydGFpbiByb3V0ZSBjYW4gYmUgZm9sbG93ZWQgYnkgYVxuICoge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gKlxuICogVGhpcyBtZXJlbHkgdGVzdHMgdGhhdCBhIGNlcnRhaW4gcGF0aCBjYW4gYmUgdGFrZW4gdGhyb3VnaCBhXG4gKiBzdGF0ZS1tYWNoaW5lLiBJdCBkb2Vzbid0IGFzc2VydCB0aGF0IHRoZSBzdGF0ZXMgYXJlIG1vdmVkLXRocm91Z2hcbiAqIHdoaWxlIHRoZSBtYWNoaW5lIGlzIHdvcmtpbmcsIGFzIHdpdGhcbiAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAqXG4gKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdGF0ZWJvdEZzbX0gbWFjaGluZVxuICogIFRoZSBtYWNoaW5lIHRvIHRlc3QgdGhlIHJvdXRlIG9uLlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHJvdXRlXG4gKiAgVGhlIHJvdXRlIHRvIHRlc3QgYXMgYW4gYXJyb3ctZGVsaW1pdGVkIHN0cmluZzpcbiAqXG4gKiAgYFxuICogIFwiaWRsZSAtPiBwZW5kaW5nIC0+IHN1Y2Nlc3MgLT4gZG9uZVwiXG4gKiAgYFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICpcbiAqIHJvdXRlSXNQb3NzaWJsZShtYWNoaW5lLFxuICogICAnd2Fsa2luZyAtPiBmYWxsaW5nIC0+IHNwbGF0dGluZyAtPiB3YWxraW5nJ1xuICogKVxuICogLy8gZmFsc2VcbiAqL1xuXG5mdW5jdGlvbiByb3V0ZUlzUG9zc2libGUgKG1hY2hpbmUsIHJvdXRlKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcigncm91dGVJc1Bvc3NpYmxlJyxcbiAgICB7IG1hY2hpbmU6IGlzU3RhdGVib3QsIHJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIHJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBfcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShyb3V0ZSlcbiAgcmV0dXJuIF9yb3V0ZS5ldmVyeSgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSBfcm91dGUubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gX3JvdXRlW2luZGV4ICsgMV1cbiAgICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoc3RhdGUpXG4gICAgICBjb25zdCBwYXNzZXMgPSBhdmFpbGFibGVTdGF0ZXMuaW5jbHVkZXMobmV4dFN0YXRlKVxuICAgICAgcmV0dXJuIHBhc3Nlc1xuICAgIH1cbiAgfSlcbn1cblxubGV0IGFzc2VydGlvbklkID0gMFxuXG4vKipcbiAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfSBvcHRpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gYXNzZXJ0Um91dGVPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Rlc2NyaXB0aW9uXVxuICogIERlc2NyaWJlIHRoZSBzdWNjZXNzLWNvbmRpdGlvbiBmb3IgdGhpcyBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Zyb21TdGF0ZT1cIlwiXVxuICogIFdhaXQgZm9yIHRoZSBtYWNoaW5lIHRvIGJlIGluIHRoaXMgc3RhdGUgYmVmb3JlIGFzc2VydGlvbiBiZWdpbnMuXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBbcnVuXVxuICogIFJ1biB0aGlzIGZ1bmN0aW9uIGp1c3QgYmVmb3JlIHN0YXJ0aW5nIHRoZSBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3Blcm1pdHRlZERldmlhdGlvbnM9MF1cbiAqICBJZiB3ZSBoaXQgYW4gdW5leHBlY3RlZCBzdGF0ZSBkdXJpbmcgYXNzZXJ0aW9uLCB0aGlzIGlzIGEgXCJkZXZpYXRpb25cIi5cbiAqICBJdCBtaWdodCBiZSB0aGF0IHRoZSBGU00gd2lsbCBjb21lIGJhY2sgdG8gdGhlIGV4cGVjdGVkIHN0YXRlIGFnYWluXG4gKiAgYWZ0ZXIgYSBjZXJ0YWluIG51bWJlciBvZiB0aGVzZS4gRm9yIGV4YW1wbGUsIGlmIHlvdXIgRlNNIGhhcyBhXG4gKiAgXCJyZXRyeVwiIHJvdXRlIGNvbmZpZ3VyZWQsIHRoaXMgbnVtYmVyIGNhbiBhY2NvdW50IGZvciBpdC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbdGltZW91dEluTXM9MTAwMF1cbiAqICBQZXJtaXR0ZWQgbGVuZ3RoIG9mIHRpbWUgZm9yIHRoZSBlbnRpcmUgYXNzZXJ0aW9uLCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgTm9ybWFsbHkgd2Ugd2FudCBsb2dzIGZvciBhc3NlcnRpb25zLCByaWdodD8gV2VsbCwgeW91IGNhbiB0dW5lXG4gKiAgdGhlbSBqdXN0IGxpa2UgeW91IGNhbiB3aXRoIHtAbGluayAjc3RhdGVib3RvcHRpb25zfHN0YXRlYm90T3B0aW9uc30uXG4gKi9cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IHRyYWNlZCB0aGUgcm91dGUgc3BlY2lmaWVkLlxuICpcbiAqIFdoZXJlYXMge0BsaW5rICNzdGF0ZWJvdHJvdXRlaXNwb3NzaWJsZXxyb3V0ZUlzUG9zc2libGUoKX0gb25seSBjaGVja3NcbiAqIHRoYXQgYSBwYXJ0aWN1bGFyIHJvdXRlIGNhbiBiZSBmb2xsb3dlZCwgYGFzc2VydFJvdXRlYCB3aWxsIGhvb2staW50b1xuICogYSBtYWNoaW5lIGFuZCB3YWl0IGZvciBpdCB0byB0cmFjZSB0aGUgc3BlY2lmaWVkIHBhdGggd2l0aGluIGFcbiAqIHRpbWVvdXQgcGVyaW9kLlxuICpcbiAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICogQGZ1bmN0aW9uXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAqICBUaGUgbWFjaGluZSB0byBydW4gdGhlIGFzc2VydGlvbiBvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBleHBlY3RlZFJvdXRlXG4gKiAgVGhlIGV4cGVjdGVkIHJvdXRlIGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gKlxuICogIGBcbiAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICogIGBcbiAqIEBwYXJhbSB7YXNzZXJ0Um91dGVPcHRpb25zfSBbb3B0aW9uc11cbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAqXG4gKiBhc3NlcnRSb3V0ZShcbiAqICAgbWFjaGluZSwgJ3ByZXBhcmUgLT4gZGVib3VuY2UgLT4gc2VuZGluZyAtPiBkb25lIC0+IGlkbGUnLFxuICogICB7XG4gKiAgICAgZGVzY3JpcHRpb246ICdFbWFpbCBzZW50IHdpdGggbm8gaXNzdWVzJyxcbiAqICAgICBmcm9tU3RhdGU6ICdpZGxlJyxcbiAqICAgICB0aW1lb3V0SW5NczogMTAwMCAqIDIwLFxuICogICAgIHBlcm1pdHRlZERldmlhdGlvbnM6IDAsXG4gKiAgICAgbG9nTGV2ZWw6IDNcbiAqICAgfVxuICogKVxuICogLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ0Fzc2VydGlvbiBwYXNzZWQhJykpXG4gKiAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoYFdob29wczogJHtlcnJ9YCkpXG4gKlxuICogbWFjaGluZS5lbnRlcignaWRsZScpXG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0Um91dGUgKG1hY2hpbmUsIGV4cGVjdGVkUm91dGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdhc3NlcnRSb3V0ZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCBleHBlY3RlZFJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIGV4cGVjdGVkUm91dGVcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGFzc2VydGlvbklkICs9IDFcblxuICBjb25zdCB7XG4gICAgZGVzY3JpcHRpb24gPSAnQXNzZXJ0aW9uIGNvbXBsZXRlJyxcbiAgICBmcm9tU3RhdGUgPSAnJyxcbiAgICBydW4gPSAoKSA9PiB7fSxcbiAgICBwZXJtaXR0ZWREZXZpYXRpb25zID0gMCxcbiAgICB0aW1lb3V0SW5NcyA9IDEwMDAsXG4gICAgbG9nTGV2ZWwgPSAzXG4gIH0gPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uc3QgY29uc29sZSA9IExvZ2dlcihsb2dMZXZlbClcblxuICBjb25zdCBwcmVmaXggPSBgU3RhdGVib3RbJHttYWNoaW5lLm5hbWUoKX1dOiBhSWQ8JHthc3NlcnRpb25JZH0+YFxuICBjb25zdCByb3V0ZSA9IGRlY29tcG9zZVJvdXRlKGV4cGVjdGVkUm91dGUpXG5cbiAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogQXNzZXJ0aW5nIHJvdXRlOiBbJHtyb3V0ZS5qb2luKCcgPiAnKX1dYClcbiAgY29uc29sZS5sb2coYCR7cHJlZml4fTogPiBBc3NlcnRpb24gd2lsbCBzdGFydCBmcm9tIHN0YXRlOiBcIiR7ZnJvbVN0YXRlfVwiYClcblxuICBjb25zdCBmcm9tU3RhdGVBY3Rpb25GbiA9IERlZmVyKHJ1bilcbiAgbGV0IHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gKCkgPT4geyB9XG5cbiAgY29uc3QgdG90YWxUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgYXNzZXJ0aW9uVGltZW91dFRpbWVyXG4gIGxldCBkZXZpYXRpb25zID0gMFxuICBsZXQgcGVuZGluZyA9IHRydWVcbiAgbGV0IHVuZXhwZWN0ZWQgPSBmYWxzZVxuXG4gIGNvbnN0IGNvbnN1bWVSb3V0ZSA9IFsuLi5yb3V0ZV1cbiAgY29uc3QgcmVwb3J0ID0gVGFibGUoXG4gICAgWydzdGF0ZScsICdleHBlY3RlZCcsICdpbmZvJywgJ3Rvb2snXSxcbiAgICBbJ2NlbnRlcicsICdjZW50ZXInLCAnbGVmdCcsICdyaWdodCddXG4gIClcblxuICBjb25zdCBmaW5hbGlzZVJlcG9ydCA9IE9uY2UoZXJyID0+IHtcbiAgICBhZGRSb3coJycsICcnLCAnJywgJ1RPVEFMOiAnICsgdG90YWxUaW1lVGFrZW4oKSlcbiAgICByZXBvcnQubG9jaygpXG4gICAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogJHtkZXNjcmlwdGlvbn06IFske2VyciA/ICdGQUlMRUQnIDogJ1NVQ0NFU1MnfV1gKVxuICAgIGNvbnNvbGUudGFibGUocmVwb3J0LmNvbnRlbnQoKSlcbiAgICByZXR1cm4gZXJyXG4gIH0pXG5cbiAgY29uc3QgeyBhZGRSb3cgfSA9IHJlcG9ydFxuICBmdW5jdGlvbiBlbnRlcmVkU3RhdGUgKHN0YXRlKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIGFkZFJvdyhzdGF0ZSwgJy0nLCAnUEVORElORycpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSBjb25zdW1lUm91dGVbMF1cbiAgICAgIGlmIChleHBlY3RlZFN0YXRlID09PSBzdGF0ZSkge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsIHVuZXhwZWN0ZWQgPyAnUkVBTElHTkVEJyA6ICdPS0FZJywgc3RhdGVUaW1lVGFrZW4oKSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICAgIGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsICdXUk9ORyBTVEFURScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSB0cnVlXG4gICAgICAgIGRldmlhdGlvbnMgKz0gMVxuICAgICAgfVxuICAgICAgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IoJ05PIFJPVVRFIFRPIFRFU1QnKSkpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZXNvbHZlID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlc29sdmUoLi4uYXJncylcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZWplY3QgPSBlcnIgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGFzc2VydGlvblRpbWVvdXRUaW1lcilcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIoKVxuICAgICAgcmVqZWN0KGVycilcbiAgICB9XG5cbiAgICBjb25zdCBiYWlsb3V0ID0gbWVzc2FnZSA9PiB7XG4gICAgICB3aGlsZSAoY29uc3VtZVJvdXRlLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlLnNoaWZ0KClcbiAgICAgICAgYWRkUm93KG1hY2hpbmUuY3VycmVudFN0YXRlKCksIGAoJHtleHBlY3RlZFN0YXRlfSlgLCBtZXNzYWdlKVxuICAgICAgICB1bmV4cGVjdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dEFuZFJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IobWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGlmIChtYWNoaW5lLmluU3RhdGUoZnJvbVN0YXRlKSkge1xuICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9IGZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICB9XG5cbiAgICBjb25zdCB7IHJldm9rZSwgZm4gfSA9IFJldm9rYWJsZShzdGF0ZSA9PiB7XG4gICAgICBhc3NlcnRpb25UaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVElNRU9VVCcpXG4gICAgICB9LCB0aW1lb3V0SW5NcylcblxuICAgICAgZW50ZXJlZFN0YXRlKHN0YXRlKVxuICAgICAgaWYgKHBlbmRpbmcgJiYgc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBwZW5kaW5nID0gZmFsc2VcbiAgICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICB9XG4gICAgICBpZiAoZGV2aWF0aW9ucyA+IHBlcm1pdHRlZERldmlhdGlvbnMpIHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVE9PIE1BTlkgREVWSUFUSU9OUycpXG4gICAgICB9XG4gICAgICBpZiAoY29uc3VtZVJvdXRlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGNsZWFyVGltZW91dEFuZFJlc29sdmUoZmluYWxpc2VSZXBvcnQoKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lciA9IG1hY2hpbmUub25Td2l0Y2hpbmcoZm4pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIFRhYmxlIChjb2x1bW5zID0gW10sIGFsaWdubWVudHMgPSBbXSkge1xuICBjb25zdCB0YWJsZSA9IFtdXG4gIGNvbnN0IGFsaWdubWVudCA9IGNvbHVtbnMubWFwKChfLCBpbmRleCkgPT4gYWxpZ25tZW50c1tpbmRleF0gfHwgJ2NlbnRlcicpXG5cbiAgbGV0IGxvY2tlZCA9IGZhbHNlXG4gIGZ1bmN0aW9uIGxvY2sgKCkge1xuICAgIGxvY2tlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFJvdyAoLi4uYXJncykge1xuICAgIGlmIChsb2NrZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBvYmogPSBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjb2wsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByb3cgPSBhcmdzW2luZGV4XSB8fCAnJ1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogcm93XG4gICAgICB9XG4gICAgfSwge30pXG4gICAgdGFibGUucHVzaChvYmopXG4gIH1cblxuICBmdW5jdGlvbiBjb2xTaXplcyAoKSB7XG4gICAgcmV0dXJuIHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IGNvbHVtbnMubWFwKChjb2wsIGluZGV4KSA9PiBNYXRoLm1heChyb3dbY29sXS5sZW5ndGgsIGFjY1tpbmRleF0pKSwgY29sdW1ucy5tYXAoKCkgPT4gMCkpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRMZWZ0IChzdHIsIGxlbikge1xuICAgIHJldHVybiBzdHIgKyAnICcucmVwZWF0KGxlbiAtIHN0ci5sZW5ndGgpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRSaWdodCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKSArIHN0clxuICB9XG5cbiAgZnVuY3Rpb24gY29udGVudCAoKSB7XG4gICAgY29uc3Qgc2l6ZXMgPSBjb2xTaXplcygpXG4gICAgZnVuY3Rpb24gZm9ybWF0RmllbGQgKHZhbHVlLCBpbmRleCkge1xuICAgICAgY29uc3Qgc2l6ZSA9IHNpemVzW2luZGV4XVxuICAgICAgY29uc3QgYWxpZ24gPSBhbGlnbm1lbnRbaW5kZXhdXG4gICAgICBpZiAoYWxpZ24gPT09ICdsZWZ0Jykge1xuICAgICAgICByZXR1cm4gcGFkTGVmdCh2YWx1ZSwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIGlmIChhbGlnbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICByZXR1cm4gcGFkUmlnaHQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gdGFibGUucmVkdWNlKChhY2MsIHJvdykgPT4ge1xuICAgICAgY29uc3QgZm9ybWF0dGVkUm93ID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4gKHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogZm9ybWF0RmllbGQocm93W2NvbF0sIGluZGV4KVxuICAgICAgfSksIHt9KVxuICAgICAgcmV0dXJuIFsuLi5hY2MsIGZvcm1hdHRlZFJvd11cbiAgICB9LCBbXSlcbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvY2s6IGxvY2ssXG4gICAgYWRkUm93OiBhZGRSb3csXG4gICAgY29udGVudDogY29udGVudFxuICB9XG59XG5cbmZ1bmN0aW9uIFRpbWVUYWtlbiAoKSB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KClcblxuICBmdW5jdGlvbiBmbXQgKG51bSwgZGlnaXRzKSB7XG4gICAgcmV0dXJuIG51bS50b0ZpeGVkKGRpZ2l0cykucmVwbGFjZSgvXFwuMCskLywgJycpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuXG4gICAgaWYgKGR1cmF0aW9uIDwgNTAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uKX0gbXNgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDUwMDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwLCAyKX0gcyBgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDYwMDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMSl9IHMgYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCAvIDYwLCAxKX0gbSBgXG4gICAgfVxuICB9XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBFWFBPUlRTXG4vL1xuXG5jb25zdCB7IFN0YXRlYm90LCBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgYXNzZXJ0Um91dGUsIHJvdXRlSXNQb3NzaWJsZSB9ID0gcmVxdWlyZSgnLi9hc3NlcnRpb25zJylcbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbi8qKlxuICogPGltZyBzcmM9XCIuL2xvZ28tZnVsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogMjU1cHg7IG1hcmdpbjogMTBweCAwO1wiIC8+XG4gKlxuICogV3JpdGUgbW9yZSByb2J1c3QgYW5kIHVuZGVyc3RhbmRhYmxlIHByb2dyYW1zLlxuICpcbiAqIFN0YXRlYm90IGhvcGVzIHRvIG1ha2UgW0Zpbml0ZSBTdGF0ZSBNYWNoaW5lc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmluaXRlLXN0YXRlX21hY2hpbmUpIChGU01zKSBhIGxpdHRsZSBtb3JlIGFjY2Vzc2libGUuXG4gKlxuICogWW91J3JlIHJlYWRpbmcgdGhlIGRvY3VtZW50YXRpb24uIE90aGVyIGV4aXRzIGFyZTpcbiAqXG4gKiAtIFRoZSBbUkVBRE1FIGZpbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3QvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kKVxuICogLSBUaGUgW0dpdGh1YiBSZXBvXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90KVxuICogLSBUaGUgc2hlbGwtc2NyaXB0IHZlcnNpb24sIFtTdGF0ZWJvdC1zaF0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdC1zaClcbiAqXG4gKiBTdGF0ZWJvdCB3YXMgd3JpdHRlbiBieSBbQ29uYW4gVGhlb2JhbGRdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvKSBhbmRcbiAqIGlzIFtJU0MgbGljZW5zZWRdKC4uL0xJQ0VOU0UpLlxuICpcbiAqICMjIyBKdW1wIHJpZ2h0IGluXG4gKlxuICogWW91IGNhbiBpbnN0YWxsIFN0YXRlYm90IGludG8geW91ciBgbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYHNoXG4gKiBucG0gaSBzdGF0ZWJvdFxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGltcG9ydCBzdGF0ZWJvdCBmcm9tICdzdGF0ZWJvdCdcbiAqIGBgYFxuICpcbiAqIE9yIG5vbi1gbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYGpzXG4gKiA8c2NyaXB0IHNyYz1cImh0dHBzOi8vdW5wa2cuY29tL3N0YXRlYm90QDIuMi4xL2Rpc3QvYnJvd3Nlci9zdGF0ZWJvdC5taW4uanNcIj48L3NjcmlwdD5cbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCB7IFN0YXRlYm90IH0gPSBzdGF0ZWJvdFxuICogLy8gTWFrZSBtYWNoaW5lcyB3aXRoIFN0YXRlYm90KClcbiAqXG4gKiBjb25zdCB7IGlzU3RhdGVib3QsIHJvdXRlSXNQb3NzaWJsZSwgYXNzZXJ0Um91dGUgfSA9IHN0YXRlYm90XG4gKiAvLyBUaGVzZSBhcmUgYXNzZXJ0aW9uIGhlbHBlcnMgeW91IGNhbiB1c2UgZm9yIHRlc3RpbmdcbiAqIGBgYFxuICpcbiAqICMjIyBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSA6KVxuICpcbiAqIEkndmUgaW5jbHVkZWQgU3RhdGVib3QgaW4gdGhpcyBwYWdlLiBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSB0b1xuICogZm9sbG93IGFsb25nIHdpdGggdGhlIGV4YW1wbGVzIGJlbG93OlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwcm9taXNlLWxpa2UnLCB7XG4gKiAgIGNoYXJ0OiBgXG4gKiAgICAgLy8gVGhpcyBvbmUgd2lsbCBiZWhhdmUgYSBiaXQgbGlrZSBhIFByb21pc2VcbiAqICAgICBpZGxlIC0+IHBlbmRpbmcgLT5cbiAqICAgICAgIHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqXG4gKiAgICAgLy8gLi4uYW5kIHdlJ3JlIGRvbmVcbiAqICAgICByZXNvbHZlZCAtPiBkb25lXG4gKiAgICAgcmVqZWN0ZWQgLT4gZG9uZVxuICogICBgLFxuICogICBzdGFydEluOiAnaWRsZSdcbiAqIH0pXG4gKlxuICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BlbmRpbmcnKVxuICogLy8gdHJ1ZVxuICpcbiAqIG1hY2hpbmUuZW50ZXIoJ3BlbmRpbmcnKVxuICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gKiAvLyBbXCJyZXNvbHZlZFwiLCBcInJlamVjdGVkXCJdXG4gKiBgYGBcbiAqXG4gKiBXZSBjYW4gaG9vay11cCBldmVudHMgd2l0aCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX06XG4gKlxuICogYGBganNcbiAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAqICAncGVuZGluZyAtPiByZXNvbHZlZCc6IHtcbiAqICAgIG9uOiAnZGF0YS1sb2FkZWQnXG4gKiAgfSxcbiAqICAncGVuZGluZyAtPiByZWplY3RlZCc6IHtcbiAqICAgIG9uOiBbJ3RpbWVvdXQnLCAnZGF0YS1lcnJvciddLFxuICogICAgdGhlbjogKG1zZykgPT4ge1xuICogICAgICBjb25zb2xlLndhcm4oJ1VoIG9oLi4uJywgbXNnKVxuICogICAgfVxuICogIH0sXG4gKiAgJ3Jlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZSc6IHtcbiAqICAgIG9uOiAndGhhdHMtYWxsLWZvbGtzJ1xuICogIH1cbiAqIH0pXG4gKlxuICogbWFjaGluZS5lbWl0KCdkYXRhLWVycm9yJywgJ0RpZCB5b3UgaGVhciB0aGF0PycpXG4gKiBgYGBcbiAqXG4gKiBIZXJlJ3MgdGhlIEFQSTpcbiAqXG4gKiB8IEhpdGNoZXJzIHwgU3RhdHVzIHwgQWN0aW9ucyB8XG4gKiB8LXwtfC18XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnMgLnBlcmZvcm1UcmFuc2l0aW9ucygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmV2ZW50IC5vbkV2ZW50KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWNhbnRyYW5zaXRpb250byAuY2FuVHJhbnNpdGlvblRvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXN0YXRlc2F2YWlsYWJsZWZyb21oZXJlIC5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9IC8ge0BsaW5rICNlbWl0LWV2ZW50bmFtZSAuRW1pdCgpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnRyYW5zaXRpb25zIC5vblRyYW5zaXRpb25zKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZSAuY3VycmVudFN0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXByZXZpb3Vzc3RhdGUgLnByZXZpb3VzU3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeSAuaGlzdG9yeSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gLyB7QGxpbmsgI2VudGVyLXN0YXRlIC5FbnRlcigpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGUgLmluU3RhdGUoKX0gLyB7QGxpbmsgI2luc3RhdGUtc3RhdGUtb3V0cHV0d2hlbnRydWUtMSAuSW5TdGF0ZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21yZXNldCAucmVzZXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0aW5nIC5vbkV4aXRpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluZm8gLmluZm8oKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zcGVjdCAuaW5zcGVjdCgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21uYW1lIC5uYW1lKCl9IHwgIHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoaW5nIC5vblN3aXRjaGluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IHwgIHwgIHxcbiAqXG4gKiA8aW1nIHNyYz1cIi4vbG9nby1zbWFsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogNzVweDsgbWFyZ2luOiAxNXB4IDAgMCA1cHg7XCIgLz5cbiAqXG4gKiBAbW9kdWxlIHN0YXRlYm90XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN0YXRlYm90LFxuICBpc1N0YXRlYm90LFxuICByb3V0ZUlzUG9zc2libGUsXG4gIGFzc2VydFJvdXRlLFxuICBkZWNvbXBvc2VDaGFydFxufVxuIl0sIm5hbWVzIjpbImRvbWFpbiIsIkV2ZW50SGFuZGxlcnMiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJjcmVhdGUiLCJFdmVudEVtaXR0ZXIiLCJpbml0IiwiY2FsbCIsInVzaW5nRG9tYWlucyIsInVuZGVmaW5lZCIsIl9ldmVudHMiLCJfbWF4TGlzdGVuZXJzIiwiZGVmYXVsdE1heExpc3RlbmVycyIsImFjdGl2ZSIsImdldFByb3RvdHlwZU9mIiwiX2V2ZW50c0NvdW50Iiwic2V0TWF4TGlzdGVuZXJzIiwibiIsImlzTmFOIiwiVHlwZUVycm9yIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0Tm9uZSIsImhhbmRsZXIiLCJpc0ZuIiwic2VsZiIsImxlbiIsImxlbmd0aCIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJpIiwiZW1pdE9uZSIsImFyZzEiLCJlbWl0VHdvIiwiYXJnMiIsImVtaXRUaHJlZSIsImFyZzMiLCJlbWl0TWFueSIsImFyZ3MiLCJhcHBseSIsImVtaXQiLCJ0eXBlIiwiZXIiLCJldmVudHMiLCJkb0Vycm9yIiwiZXJyb3IiLCJhcmd1bWVudHMiLCJFcnJvciIsImRvbWFpbkVtaXR0ZXIiLCJkb21haW5UaHJvd24iLCJlcnIiLCJjb250ZXh0IiwiQXJyYXkiLCJfYWRkTGlzdGVuZXIiLCJ0YXJnZXQiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJwdXNoIiwid2FybmVkIiwidyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJlbWl0V2FybmluZyIsImUiLCJjb25zb2xlIiwid2FybiIsImxvZyIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJfb25jZVdyYXAiLCJmaXJlZCIsImciLCJyZW1vdmVMaXN0ZW5lciIsIm9uY2UiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNwbGljZU9uZSIsInJlbW92ZUFsbExpc3RlbmVycyIsImtleXMiLCJrZXkiLCJldmxpc3RlbmVyIiwicmV0IiwidW53cmFwTGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsImluZGV4IiwiayIsInBvcCIsImFyciIsImNvcHkiLCJpc0FycmF5IiwiaXNFdmVudEVtaXR0ZXIiLCJpc0Z1bmN0aW9uIiwiaXNQb2pvIiwiaXNTdHJpbmciLCJpc1RlbXBsYXRlTGl0ZXJhbCIsInVuaXEiLCJEZWZlciIsIk9uY2UiLCJSZXZva2FibGUiLCJSZWZlcmVuY2VDb3VudGVyIiwiQXJnVHlwZUVycm9yIiwiTG9nZ2VyIiwib2JqIiwiaXNPYmplY3QiLCJldmVyeSIsIml0ZW0iLCJpbnB1dCIsInJlZHVjZSIsImFjYyIsIm9uZSIsImluZGV4T2YiLCJkZWZlciIsImZuIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicmV2b2tlIiwiX2ZuIiwicmVzdWx0IiwicmV2b2tlZCIsImtpbmQiLCJkZXNjcmlwdGlvbiIsIl9yZWZzIiwiZXhwZWN0aW5nIiwiZmxhdCIsImZvckVhY2giLCJyZWYiLCJpbmNyZWFzZSIsImNvdW50T2YiLCJkZWNyZWFzZSIsIk1hdGgiLCJtYXgiLCJyZWZzIiwidGFibGUiLCJzb3J0IiwibWFwIiwidG9WYWx1ZSIsImVyclByZWZpeCIsImZuTmFtZSIsInR5cGVNYXAiLCJhcmdNYXAiLCJlbnRyaWVzIiwiYXJnTmFtZSIsImFyZ1R5cGUiLCJzaWduYXR1cmUiLCJqb2luIiwiYXJnIiwiZXJyb3JEZXNjIiwidHlwZU5hbWUiLCJ0eXBlTWF0Y2hlcyIsImZpbHRlciIsIkJvb2xlYW4iLCJsZXZlbCIsIl9sZXZlbCIsImluZm8iLCJub25lIiwiY2FuV2FybiIsImNhbkxvZyIsImNhbkluZm8iLCJyeENSTEYiLCJjeFBpcGUiLCJjeEFycm93IiwicnhPcGVyYXRvcnMiLCJyeFVuc2FmZSIsInJlcGxhY2UiLCJyeExpbmVDb250aW5hdGlvbnMiLCJSZWdFeHAiLCJyeERpc2FsbG93ZWRDaGFyYWN0ZXJzIiwicnhDb21tZW50IiwiZGVjb21wb3NlQ2hhcnQiLCJkZWNvbXBvc2VSb3V0ZSIsInJlcXVpcmUkJDAiLCJhcmdUeXBlRXJyb3IiLCJ0ZW1wbGF0ZUxpdGVyYWwiLCJsaW5lcyIsImNvbmRlbnNlZExpbmVzIiwiZmxhdHRlbmVkUm91dGUiLCJ0b2tlbmlzZWRMaW5lcyIsImNoYXJ0IiwibGluZXNPZlRva2VucyIsImxpbmVzT2ZSb3V0ZXMiLCJkZWNvbXBvc2VSb3V0ZUZyb21Ub2tlbnMiLCJsaW5lc09mVHJhbnNpdGlvbnMiLCJkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSIsInN0YXRlcyIsInJvdXRlS2V5cyIsInJvdXRlIiwiZmlsdGVyZWRSb3V0ZXMiLCJmaWx0ZXJlZFN0YXRlcyIsInRyYW5zaXRpb25zIiwic3BsaXQiLCJyb3V0ZXMiLCJsaW5lc0Zyb20iLCJzdHJPckFyciIsImxpbmUiLCJvdXRwdXQiLCJjb25kZW5zZWRMaW5lIiwic2FuaXRpc2VkTGluZSIsInRlc3QiLCJzdHIiLCJwcmV2aW91c1N0YXRlcyIsImZyb21TdGF0ZXMiLCJ0b1N0YXRlcyIsImZyb21TdGF0ZSIsInRvU3RhdGUiLCJTdGF0ZWJvdCIsImlzU3RhdGVib3QiLCJyZXF1aXJlJCQxIiwib3B0aW9ucyIsImxvZ1ByZWZpeCIsImxvZ0xldmVsIiwiaGlzdG9yeUxpbWl0Iiwic3RhcnRJbiIsImluY2x1ZGVzIiwidHJhbnNpdGlvbklkIiwic3RhdGVIaXN0b3J5Iiwic3RhdGVIaXN0b3J5TGltaXQiLCJpbnRlcm5hbEV2ZW50cyIsIklOVEVSTkFMX0VWRU5UUyIsIm9uU3dpdGNoaW5nIiwib25Td2l0Y2hlZCIsImVtaXRJbnRlcm5hbEV2ZW50IiwiZXZlbnROYW1lIiwib25JbnRlcm5hbEV2ZW50Iiwic3RhdGVzSGFuZGxlZCIsInJvdXRlc0hhbmRsZWQiLCJldmVudHNIYW5kbGVkIiwiYXBwbHlIaXRjaGVyIiwiaGl0Y2hlciIsImhpdGNoZXJBY3Rpb25zIiwiZW50ZXIiLCJFbnRlciIsIkVtaXQiLCJyb3V0ZUNoYXJ0IiwiYWN0aW9uT3JDb25maWciLCJhY3Rpb24iLCJfb24iLCJfdGhlbiIsInRoZW4iLCJhbGxTdGF0ZXMiLCJhbGxSb3V0ZXMiLCJkZWNvbXBvc2VkRXZlbnRzIiwiX2NvbmZpZ3MiLCJkZWNvbXBvc2VDb25maWdzIiwiY29uZmlncyIsImFsbENsZWFudXBGbnMiLCJvbkV2ZW50IiwiZXZlbnRXYXNIYW5kbGVkIiwic29tZSIsInBhc3NlZCIsImluU3RhdGUiLCJ0cmFuc2l0aW9uTm9PcCIsInRyYW5zaXRpb25Db25maWdzIiwidHJhbnNpdGlvbiIsImludmFsaWRTdGF0ZXMiLCJzdGF0ZSIsImludmFsaWRSb3V0ZXMiLCJwcmV2aW91c1N0YXRlIiwiY3VycmVudFN0YXRlIiwiY2FuVHJhbnNpdGlvblRvIiwidGVzdFN0YXRlcyIsIm5leHRTdGF0ZXMiLCJzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSIsIl9zdGF0ZSIsInRyaW0iLCJhbnlPckZuIiwiY29uZGl0aW9uTWF0Y2hlcyIsImZuQXJncyIsIm5leHRSb3V0ZSIsInNoaWZ0IiwiY2IiLCJzd2l0Y2hNZXRob2RzIiwibWV0aG9kTmFtZSIsImRlY3JlYXNlUmVmQ291bnQiLCJyZW1vdmVFdmVudCIsImVudGVyRXhpdE1ldGhvZHMiLCJuYW1lcyIsInN3aXRjaE1ldGhvZCIsInRvTG93ZXJDYXNlIiwiZGVjcmVhc2VSZWZDb3VudHMiLCJJblN0YXRlIiwicmVzZXQiLCJtZXNzYWdlIiwibGFzdFN0YXRlIiwicHJldlJvdXRlIiwiYXZhaWxhYmxlU3RhdGVzIiwiaW5zcGVjdCIsImxvZ1JlZkNvdW50ZXJJbmZvIiwicmVmQ291bnRlciIsIl9fU1RBVEVCT1RfXyIsImhpc3RvcnkiLCJvbkVudGVyZWQiLCJvbkVudGVyaW5nIiwib25FeGl0ZWQiLCJvbkV4aXRpbmciLCJvblRyYW5zaXRpb25zIiwicGVyZm9ybVRyYW5zaXRpb25zIiwiY29uZmlnIiwib2JqZWN0Iiwicm91dGVJc1Bvc3NpYmxlIiwiYXNzZXJ0Um91dGUiLCJyZXF1aXJlJCQyIiwibWFjaGluZSIsIl9yb3V0ZSIsIm5leHRTdGF0ZSIsInBhc3NlcyIsImFzc2VydGlvbklkIiwiZXhwZWN0ZWRSb3V0ZSIsInJ1biIsInBlcm1pdHRlZERldmlhdGlvbnMiLCJ0aW1lb3V0SW5NcyIsInByZWZpeCIsImZyb21TdGF0ZUFjdGlvbkZuIiwicmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4iLCJ0b3RhbFRpbWVUYWtlbiIsIlRpbWVUYWtlbiIsInN0YXRlVGltZVRha2VuIiwiYXNzZXJ0aW9uVGltZW91dFRpbWVyIiwiZGV2aWF0aW9ucyIsInBlbmRpbmciLCJ1bmV4cGVjdGVkIiwiY29uc3VtZVJvdXRlIiwicmVwb3J0IiwiVGFibGUiLCJmaW5hbGlzZVJlcG9ydCIsImFkZFJvdyIsImxvY2siLCJjb250ZW50IiwiZW50ZXJlZFN0YXRlIiwiZXhwZWN0ZWRTdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSIsInJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIiLCJjbGVhclRpbWVvdXRBbmRSZWplY3QiLCJiYWlsb3V0IiwiY29sdW1ucyIsImFsaWdubWVudHMiLCJhbGlnbm1lbnQiLCJfIiwibG9ja2VkIiwiY29sIiwicm93IiwiY29sU2l6ZXMiLCJwYWRMZWZ0IiwicmVwZWF0IiwicGFkUmlnaHQiLCJzaXplcyIsImZvcm1hdEZpZWxkIiwidmFsdWUiLCJzaXplIiwiYWxpZ24iLCJmb3JtYXR0ZWRSb3ciLCJzdGFydFRpbWUiLCJEYXRlIiwibm93IiwiZm10IiwibnVtIiwiZGlnaXRzIiwidG9GaXhlZCIsImR1cmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBRUEsSUFBSUEsTUFBSjs7RUFLQSxTQUFTQyxhQUFULEdBQXlCOztFQUN6QkEsYUFBYSxDQUFDQyxTQUFkLEdBQTBCQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQTFCOztFQUVBLFNBQVNDLFlBQVQsR0FBd0I7RUFDdEJBLEVBQUFBLFlBQVksQ0FBQ0MsSUFBYixDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkI7RUFDRDtFQU1ERixZQUFZLENBQUNBLFlBQWIsR0FBNEJBLFlBQTVCO0VBRUFBLFlBQVksQ0FBQ0csWUFBYixHQUE0QixLQUE1QjtFQUVBSCxZQUFZLENBQUNILFNBQWIsQ0FBdUJGLE1BQXZCLEdBQWdDUyxTQUFoQztFQUNBSixZQUFZLENBQUNILFNBQWIsQ0FBdUJRLE9BQXZCLEdBQWlDRCxTQUFqQztFQUNBSixZQUFZLENBQUNILFNBQWIsQ0FBdUJTLGFBQXZCLEdBQXVDRixTQUF2QztFQUlBSixZQUFZLENBQUNPLG1CQUFiLEdBQW1DLEVBQW5DOztFQUVBUCxZQUFZLENBQUNDLElBQWIsR0FBb0IsWUFBVztFQUM3QixPQUFLTixNQUFMLEdBQWMsSUFBZDs7RUFDQSxNQUFJSyxZQUFZLENBQUNHLFlBQWpCLEVBQStCO0VBRTdCLFFBQUlSLE1BQU0sQ0FBQ2EsTUFBUCxDQUFKLEVBQXVEO0VBR3hEOztFQUVELE1BQUksQ0FBQyxLQUFLSCxPQUFOLElBQWlCLEtBQUtBLE9BQUws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
