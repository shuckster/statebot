
/*
 * Statebot
 * v2.1.1
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

  function decomposeChart(templateLiteral) {
    var err = argTypeError('decomposeChart', {
      templateLiteral: isTemplateLiteral$1
    }, templateLiteral);

    if (err) {
      throw TypeError(err);
    }

    var lines = condensedLines(templateLiteral);
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

  function isStatebot(machine) {
    return isPojo$1(machine) && typeof machine.__STATEBOT__ === 'number';
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

  function routeIsPossible(machine, expectedRoute) {
    var err = argTypeError$1('routeIsPossible', {
      machine: isStatebot$1,
      expectedRoute: isTemplateLiteral$2
    }, machine, expectedRoute);

    if (err) {
      throw TypeError(err);
    }

    var route = decomposeRoute$1(expectedRoute);
    return route.every(function (state, index) {
      if (index === route.length - 1) {
        return true;
      } else {
        var nextState = route[index + 1];
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
   * <script src="https://unpkg.com/statebot@2.1.1/dist/browser/statebot.min.js"></script>
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

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVib3QuZGV2LmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcmVnaXN0cnkubnBtanMub3JnL3JvbGx1cC1wbHVnaW4tbm9kZS1idWlsdGlucy8yLjEuMi9ub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLWJ1aWx0aW5zL3NyYy9lczYvZXZlbnRzLmpzIiwiLi4vLi4vc3JjL3V0aWxzLmpzIiwiLi4vLi4vc3JjL3BhcnNpbmcuanMiLCIuLi8uLi9zcmMvc3RhdGVib3QuanMiLCIuLi8uLi9zcmMvYXNzZXJ0aW9ucy5qcyIsIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBkb21haW47XG5cbi8vIFRoaXMgY29uc3RydWN0b3IgaXMgdXNlZCB0byBzdG9yZSBldmVudCBoYW5kbGVycy4gSW5zdGFudGlhdGluZyB0aGlzIGlzXG4vLyBmYXN0ZXIgdGhhbiBleHBsaWNpdGx5IGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIHRvIGdldCBhIFwiY2xlYW5cIiBlbXB0eVxuLy8gb2JqZWN0ICh0ZXN0ZWQgd2l0aCB2OCB2NC45KS5cbmZ1bmN0aW9uIEV2ZW50SGFuZGxlcnMoKSB7fVxuRXZlbnRIYW5kbGVycy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XG5leHBvcnQge0V2ZW50RW1pdHRlcn07XG5cbi8vIG5vZGVqcyBvZGRpdHlcbi8vIHJlcXVpcmUoJ2V2ZW50cycpID09PSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXJcblxuRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucyA9IGZhbHNlO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmRvbWFpbiA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kb21haW4gPSBudWxsO1xuICBpZiAoRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucykge1xuICAgIC8vIGlmIHRoZXJlIGlzIGFuIGFjdGl2ZSBkb21haW4sIHRoZW4gYXR0YWNoIHRvIGl0LlxuICAgIGlmIChkb21haW4uYWN0aXZlICYmICEodGhpcyBpbnN0YW5jZW9mIGRvbWFpbi5Eb21haW4pKSB7XG4gICAgICB0aGlzLmRvbWFpbiA9IGRvbWFpbi5hY3RpdmU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJuXCIgYXJndW1lbnQgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG4vLyBUaGVzZSBzdGFuZGFsb25lIGVtaXQqIGZ1bmN0aW9ucyBhcmUgdXNlZCB0byBvcHRpbWl6ZSBjYWxsaW5nIG9mIGV2ZW50XG4vLyBoYW5kbGVycyBmb3IgZmFzdCBjYXNlcyBiZWNhdXNlIGVtaXQoKSBpdHNlbGYgb2Z0ZW4gaGFzIGEgdmFyaWFibGUgbnVtYmVyIG9mXG4vLyBhcmd1bWVudHMgYW5kIGNhbiBiZSBkZW9wdGltaXplZCBiZWNhdXNlIG9mIHRoYXQuIFRoZXNlIGZ1bmN0aW9ucyBhbHdheXMgaGF2ZVxuLy8gdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyBhbmQgdGh1cyBkbyBub3QgZ2V0IGRlb3B0aW1pemVkLCBzbyB0aGUgY29kZVxuLy8gaW5zaWRlIHRoZW0gY2FuIGV4ZWN1dGUgZmFzdGVyLlxuZnVuY3Rpb24gZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgc2VsZikge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZik7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdE9uZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEsIGFyZzIpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEsIGFyZzIpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSwgYXJnMik7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCBzZWxmLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZ3MpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGV2ZW50cywgZG9tYWluO1xuICB2YXIgbmVlZERvbWFpbkV4aXQgPSBmYWxzZTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT0gbnVsbCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBkb21haW4gPSB0aGlzLmRvbWFpbjtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgaWYgKGRvbWFpbikge1xuICAgICAgaWYgKCFlcilcbiAgICAgICAgZXIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQnKTtcbiAgICAgIGVyLmRvbWFpbkVtaXR0ZXIgPSB0aGlzO1xuICAgICAgZXIuZG9tYWluID0gZG9tYWluO1xuICAgICAgZXIuZG9tYWluVGhyb3duID0gZmFsc2U7XG4gICAgICBkb21haW4uZW1pdCgnZXJyb3InLCBlcik7XG4gICAgfSBlbHNlIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmICghaGFuZGxlcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGlzRm4gPSB0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJztcbiAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICAvLyBmYXN0IGNhc2VzXG4gICAgY2FzZSAxOlxuICAgICAgZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgdGhpcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIHNsb3dlclxuICAgIGRlZmF1bHQ6XG4gICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGVtaXRNYW55KGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgaWYgKG5lZWREb21haW5FeGl0KVxuICAgIGRvbWFpbi5leGl0KCk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoIWV2ZW50cykge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKCFleGlzdGluZykge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBpZiAoIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICAgIGlmIChtICYmIG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0pIHtcbiAgICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgdHlwZSArICcgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgICAgZW1pdFdhcm5pbmcodyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIGVtaXRXYXJuaW5nKGUpIHtcbiAgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gJ2Z1bmN0aW9uJyA/IGNvbnNvbGUud2FybihlKSA6IGNvbnNvbGUubG9nKGUpO1xufVxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgZmlyZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHJldHVybiBnO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmICghbGlzdClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCAobGlzdC5saXN0ZW5lciAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGxpc3RbMF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cztcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKCFldmVudHMpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoIWV2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGtleTsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBkbyB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfSB3aGlsZSAobGlzdGVuZXJzWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICB2YXIgZXZsaXN0ZW5lcjtcbiAgdmFyIHJldDtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoIWV2ZW50cylcbiAgICByZXQgPSBbXTtcbiAgZWxzZSB7XG4gICAgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgICBpZiAoIWV2bGlzdGVuZXIpXG4gICAgICByZXQgPSBbXTtcbiAgICBlbHNlIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldCA9IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdO1xuICAgIGVsc2VcbiAgICAgIHJldCA9IHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdC5vd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKS5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKHZhciBpID0gaW5kZXgsIGsgPSBpICsgMSwgbiA9IGxpc3QubGVuZ3RoOyBrIDwgbjsgaSArPSAxLCBrICs9IDEpXG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBpKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgVVRJTFNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5LFxuICBpc0V2ZW50RW1pdHRlcixcbiAgaXNGdW5jdGlvbixcbiAgaXNQb2pvLFxuICBpc1N0cmluZyxcbiAgaXNUZW1wbGF0ZUxpdGVyYWwsXG4gIHVuaXEsXG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIFJlZmVyZW5jZUNvdW50ZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKG9iaikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopXG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJ1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc0V2ZW50RW1pdHRlciAob2JqKSB7XG4gIHJldHVybiAoXG4gICAgaXNPYmplY3Qob2JqKSAmJlxuICAgIGlzRnVuY3Rpb24ob2JqLmVtaXQpICYmXG4gICAgaXNGdW5jdGlvbihvYmouYWRkTGlzdGVuZXIpICYmXG4gICAgaXNGdW5jdGlvbihvYmoucmVtb3ZlTGlzdGVuZXIpXG4gIClcbn1cblxuZnVuY3Rpb24gaXNQb2pvIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCAoIWlzT2JqZWN0KG9iaikpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBPYmplY3QucHJvdG90eXBlXG59XG5cbmZ1bmN0aW9uIGlzVGVtcGxhdGVMaXRlcmFsIChvYmopIHtcbiAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmV2ZXJ5KGl0ZW0gPT4gaXNTdHJpbmcoaXRlbSkpXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHVuaXEgKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgb25lKSA9PiAoYWNjLmluZGV4T2Yob25lKSA9PT0gLTEgPyBbLi4uYWNjLCBvbmVdIDogYWNjKSwgW10pXG59XG5cbmZ1bmN0aW9uIGRlZmVyIChmbiwgLi4uYXJncykge1xuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoZm4sIDAsIC4uLmFyZ3MpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5mdW5jdGlvbiBEZWZlciAoZm4pIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBkZWZlcihmbiwgLi4uYXJncylcbn1cblxuZnVuY3Rpb24gT25jZSAoZm4pIHtcbiAgY29uc3QgeyByZXZva2UsIGZuOiBfZm4gfSA9IFJldm9rYWJsZShmbilcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICByZXN1bHQgPSBfZm4oLi4uYXJncylcbiAgICByZXZva2UoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBSZXZva2FibGUgKGZuKSB7XG4gIGxldCByZXZva2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4ge1xuICAgIGZuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCFyZXZva2VkKSB7XG4gICAgICAgIHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICByZXZva2U6ICgpID0+IHtcbiAgICAgIHJldm9rZWQgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFJlZmVyZW5jZUNvdW50ZXIgKG5hbWUsIGtpbmQsIGRlc2NyaXB0aW9uLCAuLi5leHBlY3RpbmcpIHtcbiAgY29uc3QgX3JlZnMgPSB7fTtcbiAgWy4uLmV4cGVjdGluZ10uZmxhdCgpLmZvckVhY2gocmVmID0+IHtcbiAgICBfcmVmc1tyZWZdID0gMFxuICB9KVxuICBmdW5jdGlvbiBpbmNyZWFzZSAocmVmKSB7XG4gICAgX3JlZnNbcmVmXSA9IGNvdW50T2YocmVmKSArIDFcbiAgICByZXR1cm4gKCkgPT4gZGVjcmVhc2UocmVmKVxuICB9XG4gIGZ1bmN0aW9uIGRlY3JlYXNlIChyZWYpIHtcbiAgICBjb25zdCBjb3VudCA9IGNvdW50T2YocmVmKSAtIDFcbiAgICBfcmVmc1tyZWZdID0gTWF0aC5tYXgoY291bnQsIDApXG4gIH1cbiAgZnVuY3Rpb24gY291bnRPZiAocmVmKSB7XG4gICAgcmV0dXJuIF9yZWZzW3JlZl0gfHwgMFxuICB9XG4gIGZ1bmN0aW9uIHJlZnMgKCkge1xuICAgIHJldHVybiB7IC4uLl9yZWZzIH1cbiAgfVxuICBmdW5jdGlvbiB0YWJsZSAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKF9yZWZzKS5zb3J0KClcbiAgICAgIC5tYXAoa2V5ID0+IFtrZXksIF9yZWZzW2tleV1dKVxuICAgICAgLm1hcCgoW3JlZiwgY291bnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgW2tpbmRdOiByZWYsXG4gICAgICAgICAgcmVmczogY291bnQgfHwgJ05vbmUnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gdG9WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBgU3RhdGVib3RbJHtuYW1lfV06ICR7ZGVzY3JpcHRpb259OmAsXG4gICAgICB0YWJsZTogdGFibGUoKVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGluY3JlYXNlOiBpbmNyZWFzZSxcbiAgICBkZWNyZWFzZTogZGVjcmVhc2UsXG4gICAgY291bnRPZjogY291bnRPZixcbiAgICB0b1ZhbHVlOiB0b1ZhbHVlLFxuICAgIHJlZnM6IHJlZnNcbiAgfVxufVxuXG5mdW5jdGlvbiBBcmdUeXBlRXJyb3IgKGVyclByZWZpeCA9ICcnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm5OYW1lLCB0eXBlTWFwLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgYXJnTWFwID0gT2JqZWN0LmVudHJpZXModHlwZU1hcClcbiAgICAgIC5tYXAoKFthcmdOYW1lLCBhcmdUeXBlXSkgPT4ge1xuICAgICAgICByZXR1cm4geyBhcmdOYW1lLCBhcmdUeXBlIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBzaWduYXR1cmUgPSBPYmplY3Qua2V5cyh0eXBlTWFwKS5qb2luKCcsICcpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdzXG4gICAgICAubWFwKChhcmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYXJnTmFtZSwgYXJnVHlwZSB9ID0gYXJnTWFwW2luZGV4XVxuICAgICAgICBpZiAoYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gYEFyZ3VtZW50IHVuZGVmaW5lZDogXCIke2FyZ05hbWV9XCJgXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXJyb3JEZXNjXG4gICAgICAgIGxldCB0eXBlTmFtZVxuICAgICAgICBsZXQgdHlwZU1hdGNoZXNcblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihhcmdUeXBlKSkge1xuICAgICAgICAgIHR5cGVNYXRjaGVzID0gYXJnVHlwZShhcmcpID09PSB0cnVlXG4gICAgICAgICAgdHlwZU5hbWUgPSBhcmdUeXBlLm5hbWVcbiAgICAgICAgICBlcnJvckRlc2MgPSBgJHt0eXBlTmFtZX0oJHthcmdOYW1lfSkgZGlkIG5vdCByZXR1cm4gdHJ1ZWBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdmFsaWQtdHlwZW9mXG4gICAgICAgICAgdHlwZU1hdGNoZXMgPSB0eXBlb2YgYXJnID09PSBhcmdUeXBlXG4gICAgICAgICAgdHlwZU5hbWUgPSBhcmdUeXBlXG4gICAgICAgICAgZXJyb3JEZXNjID0gYEFyZ3VtZW50IFwiJHthcmdOYW1lfVwiIHNob3VsZCBiZSBhICR7dHlwZU5hbWV9YFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0eXBlTWF0Y2hlcykge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBgJHtlcnJvckRlc2N9OiAke2FyZ05hbWV9ID09PSAke3R5cGVvZiBhcmd9KCR7YXJnfSlgXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuXG4gICAgaWYgKCFlcnIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBcXG4ke2VyclByZWZpeH0ke2ZuTmFtZX0oJHtzaWduYXR1cmV9KTpcXG5gICtcbiAgICAgICAgYCR7ZXJyLm1hcChlcnIgPT4gYD4gJHtlcnJ9YCkuam9pbignXFxuJyl9YFxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBMb2dnZXIgKGxldmVsKSB7XG4gIGxldCBfbGV2ZWwgPSBsZXZlbFxuICBpZiAoaXNTdHJpbmcoX2xldmVsKSkge1xuICAgIF9sZXZlbCA9ICh7XG4gICAgICBpbmZvOiAzLFxuICAgICAgbG9nOiAyLFxuICAgICAgd2FybjogMSxcbiAgICAgIG5vbmU6IDBcbiAgICB9KVtfbGV2ZWxdIHx8IDNcbiAgfVxuICBmdW5jdGlvbiBjYW5XYXJuICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDFcbiAgfVxuICBmdW5jdGlvbiBjYW5Mb2cgKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMlxuICB9XG4gIGZ1bmN0aW9uIGNhbkluZm8gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gM1xuICB9XG4gIHJldHVybiB7XG4gICAgY2FuV2FybixcbiAgICBjYW5Mb2csXG4gICAgY2FuSW5mbyxcblxuICAgIGluZm86ICguLi5hcmdzKSA9PiBjYW5JbmZvKCkgJiYgY29uc29sZS5pbmZvKC4uLmFyZ3MpLFxuICAgIHRhYmxlOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS50YWJsZSguLi5hcmdzKSxcbiAgICBsb2c6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4gY2FuV2FybigpICYmIGNvbnNvbGUud2FybiguLi5hcmdzKSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IGNvbnNvbGUuZXJyb3IoLi4uYXJncylcbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQ0hBUlQvUk9VVEUgUEFSU0lOR1xuLy9cblxuY29uc3QgcnhDUkxGID0gL1tcXHJcXG5dL1xuY29uc3QgY3hQaXBlID0gJ3wnXG5jb25zdCBjeEFycm93ID0gJy0+J1xuY29uc3QgcnhPcGVyYXRvcnMgPSBbY3hQaXBlLCBjeEFycm93XVxuICAubWFwKHJ4VW5zYWZlID0+IHJ4VW5zYWZlLnJlcGxhY2UoJ3wnLCAnXFxcXHwnKSlcbiAgLmpvaW4oJ3wnKVxuXG5jb25zdCByeExpbmVDb250aW5hdGlvbnMgPSBuZXcgUmVnRXhwKGAoJHtyeE9wZXJhdG9yc30pJGApXG5jb25zdCByeERpc2FsbG93ZWRDaGFyYWN0ZXJzID0gL1teYS16MC05IUAjJCVeJio6Xys9PD58fi5cXHgyRF0vZ2lcbmNvbnN0IHJ4Q29tbWVudCA9IC8oXFwvXFwvW15cXG5cXHJdKikvXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjeFBpcGUsXG4gIGN4QXJyb3csXG4gIHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsXG4gIGRlY29tcG9zZUNoYXJ0LFxuICBkZWNvbXBvc2VSb3V0ZVxufVxuXG5jb25zdCB7IHVuaXEsIEFyZ1R5cGVFcnJvciwgaXNUZW1wbGF0ZUxpdGVyYWwgfSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlICh0ZW1wbGF0ZUxpdGVyYWwpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VSb3V0ZScsXG4gICAgeyB0ZW1wbGF0ZUxpdGVyYWw6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgdGVtcGxhdGVMaXRlcmFsXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlZExpbmVzKHRlbXBsYXRlTGl0ZXJhbClcbiAgY29uc3QgZmxhdHRlbmVkUm91dGUgPSB0b2tlbmlzZWRMaW5lcyhsaW5lcykuZmxhdCgyKVxuICByZXR1cm4gZmxhdHRlbmVkUm91dGVcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlQ2hhcnQgKHRlbXBsYXRlTGl0ZXJhbCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZUNoYXJ0JyxcbiAgICB7IHRlbXBsYXRlTGl0ZXJhbDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICB0ZW1wbGF0ZUxpdGVyYWxcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IGxpbmVzID0gY29uZGVuc2VkTGluZXModGVtcGxhdGVMaXRlcmFsKVxuICBjb25zdCBsaW5lc09mVG9rZW5zID0gdG9rZW5pc2VkTGluZXMobGluZXMpXG4gIGNvbnN0IGxpbmVzT2ZSb3V0ZXMgPSBsaW5lc09mVG9rZW5zXG4gICAgLm1hcChkZWNvbXBvc2VSb3V0ZUZyb21Ub2tlbnMpXG4gICAgLmZsYXQoMSlcblxuICBjb25zdCBsaW5lc09mVHJhbnNpdGlvbnMgPSBsaW5lc09mUm91dGVzXG4gICAgLm1hcChkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSlcbiAgICAuZmxhdCgxKVxuXG4gIGNvbnN0IHN0YXRlcyA9IFtdXG4gIGNvbnN0IHJvdXRlS2V5cyA9IGxpbmVzT2ZUcmFuc2l0aW9ucy5tYXAocm91dGUgPT4ge1xuICAgIHN0YXRlcy5wdXNoKC4uLnJvdXRlKVxuICAgIHJldHVybiByb3V0ZS5qb2luKGN4QXJyb3cpXG4gIH0pXG5cbiAgY29uc3QgZmlsdGVyZWRSb3V0ZXMgPSB1bmlxKHJvdXRlS2V5cylcbiAgY29uc3QgZmlsdGVyZWRTdGF0ZXMgPSB1bmlxKHN0YXRlcylcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2l0aW9uczogZmlsdGVyZWRSb3V0ZXMubWFwKHJvdXRlID0+IHJvdXRlLnNwbGl0KGN4QXJyb3cpKSxcbiAgICByb3V0ZXM6IGZpbHRlcmVkUm91dGVzLFxuICAgIHN0YXRlczogZmlsdGVyZWRTdGF0ZXNcbiAgfVxufVxuXG5mdW5jdGlvbiBsaW5lc0Zyb20gKHN0ck9yQXJyKSB7XG4gIHJldHVybiBbc3RyT3JBcnJdXG4gICAgLmZsYXQoKVxuICAgIC5yZWR1Y2UoKGFjYywgbGluZSkgPT4gWy4uLmFjYywgbGluZS5zcGxpdChyeENSTEYpXSwgW10pXG4gICAgLmZsYXQoKVxufVxuXG5mdW5jdGlvbiBjb25kZW5zZWRMaW5lcyAoc3RyT3JBcnIpIHtcbiAgY29uc3QgaW5wdXQgPSBsaW5lc0Zyb20oc3RyT3JBcnIpXG4gIGNvbnN0IG91dHB1dCA9IFtdXG5cbiAgaW5wdXQucmVkdWNlKChjb25kZW5zZWRMaW5lLCBsaW5lKSA9PiB7XG4gICAgY29uc3Qgc2FuaXRpc2VkTGluZSA9IGxpbmVcbiAgICAgIC5yZXBsYWNlKHJ4Q29tbWVudCwgJycpXG4gICAgICAucmVwbGFjZShyeERpc2FsbG93ZWRDaGFyYWN0ZXJzLCAnJylcblxuICAgIGlmICghc2FuaXRpc2VkTGluZSkge1xuICAgICAgcmV0dXJuIGNvbmRlbnNlZExpbmVcbiAgICB9XG5cbiAgICBpZiAocnhMaW5lQ29udGluYXRpb25zLnRlc3Qoc2FuaXRpc2VkTGluZSkpIHtcbiAgICAgIHJldHVybiBjb25kZW5zZWRMaW5lICsgc2FuaXRpc2VkTGluZVxuICAgIH1cblxuICAgIG91dHB1dC5wdXNoKGNvbmRlbnNlZExpbmUgKyBzYW5pdGlzZWRMaW5lKVxuICAgIHJldHVybiAnJ1xuICB9LCAnJylcblxuICByZXR1cm4gb3V0cHV0XG59XG5cbmZ1bmN0aW9uIHRva2VuaXNlZExpbmVzIChsaW5lcykge1xuICByZXR1cm4gbGluZXMubWFwKGxpbmUgPT4gbGluZS5zcGxpdChjeEFycm93KS5tYXAoc3RyID0+IHN0ci5zcGxpdChjeFBpcGUpKSlcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGVGcm9tVG9rZW5zIChsaW5lKSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdXG5cbiAgbGluZS5yZWR1Y2UoKHByZXZpb3VzU3RhdGVzLCBzdGF0ZXMpID0+IHtcbiAgICBpZiAocHJldmlvdXNTdGF0ZXMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gWy4uLnN0YXRlc11cbiAgICB9XG5cbiAgICBvdXRwdXQucHVzaChbcHJldmlvdXNTdGF0ZXMsIFsuLi5zdGF0ZXNdXSlcbiAgICByZXR1cm4gWy4uLnN0YXRlc11cbiAgfSwgZmFsc2UpXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VUcmFuc2l0aW9uc0Zyb21Sb3V0ZSAoW2Zyb21TdGF0ZXMsIHRvU3RhdGVzXSkge1xuICByZXR1cm4gZnJvbVN0YXRlcy5yZWR1Y2UoKGFjYywgZnJvbVN0YXRlKSA9PiBbXG4gICAgLi4uYWNjLFxuICAgIC4uLnRvU3RhdGVzLm1hcCh0b1N0YXRlID0+IHtcbiAgICAgIHJldHVybiBbZnJvbVN0YXRlLCB0b1N0YXRlXVxuICAgIH0pXG4gIF0sIFtdKVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRlNNXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3RhdGVib3QsXG4gIGlzU3RhdGVib3Rcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIFN0YXRlYm90LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICogIFRoZSBzdGF0ZS1jaGFydC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc3RhcnRJbj08YXV0bz5dXG4gKiAgVGhlIHN0YXRlIGluIHdoaWNoIHRvIHN0YXJ0LiBJZiB1bnNwZWNpZmllZCwgdGhlIGZpcnN0IHN0YXRlIGluIHRoZVxuICogIGNoYXJ0IHdpbGwgYmUgdXNlZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbG9nTGV2ZWw9M11cbiAqICBIb3cgbm9pc3kgdGhlIGxvZ2dpbmcgaXMsIGZyb20gMSB0byAzOlxuICogIGBgYFxuICogIDEpIGNvbnNvbGUud2FyblxuICogIDIpIGNvbnNvbGUud2Fybi9sb2cvdGFibGVcbiAqICAzKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlL2luZm9cbiAqICBgYGBcbiAqICBgM2AgaXMgdGhlIGRlZmF1bHQuIEFyZ3VtZW50IHR5cGUtZXJyb3JzIHdpbGwgYWx3YXlzIGB0aHJvd2AuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2hpc3RvcnlMaW1pdD0yXVxuICogIExpbWl0IGhvdyBtdWNoIGhpc3RvcnkgdGhlIHN0YXRlLW1hY2hpbmUga2VlcHMuIEFjY2Vzc2VkIHZpYVxuICogIHtAbGluayAjc3RhdGVib3Rmc21oaXN0b3J5fHN0YXRlYm90RnNtI2hpc3RvcnkoKX0uXG4gKiBAcHJvcGVydHkge2V2ZW50c30gW2V2ZW50c11cbiAqICBJZiB5b3Ugd2lzaCB0byBoYXZlIHlvdXIgU3RhdGVib3RzIGxpc3RlbiB0byBldmVudHMgY29taW5nIGZyb21cbiAqICBhIHNoYXJlZCBFdmVudEVtaXR0ZXIsIHlvdSBjYW4gcGFzcyBpdCBpbiBoZXJlLiBUaGUgYGVtaXQoKWAvYG9uRXZlbnQoKWAvXG4gKiAgYHBlcmZvcm1UcmFuc2l0aW9ucygpYCBtZXRob2RzIHdpbGwgdXNlIGl0LlxuICpcbiAqICBJdCBzaG91bGQgaGF2ZSB0aGUgc2FtZSBzaWduYXR1cmUgYXMge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2NsYXNzX2V2ZW50ZW1pdHRlcnxFdmVudEVtaXR0ZXJ9LlxuICovXG5cbi8qKlxuICogQSBkZXNjcmlwdGlvbiBvZiBhbGwgdGhlIHN0YXRlcyBpbiBhIG1hY2hpbmUsIHBsdXMgYWxsIG9mIHRoZVxuICogcGVybWl0dGVkIHRyYW5zaXRpb25zIGJldHdlZW4gdGhlbS5cbiAqXG4gKiBUaGlzIGlzIGRlZmluZWQgdXNpbmcgYSBgc3RyaW5nYCBvciBhbiBgYXJyYXlgIG9mIHN0cmluZ3MsIGJ1dFxuICogIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFsc3xUZW1wbGF0ZSBMaXRlcmFsc31cbiAqIGFyZSBtdWNoIG1vcmUgY29udmVuaWVudC5cbiAqXG4gKiBBbiBhcnJvdyBgLT5gIGNvbmZpZ3VyZXMgYSAqKnBlcm1pdHRlZCB0cmFuc2l0aW9uKiogYmV0d2VlbiB0d28gc3RhdGVzOlxuICpcbiAqIGBgYFxuICogZnJvbS1zdGF0ZSAtPiB0by1zdGF0ZVxuICogYGBgXG4gKlxuICogSXQncyB0aGUgb25seSBvcGVyYXRvciBuZWVkZWQgdG8gYnVpbGQgYW55IGNoYXJ0OlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZFxuICogICBwZW5kaW5nIC0+IHJlamVjdGVkXG4gKiAgIHJlc29sdmVkIC0+IGRvbmVcbiAqICAgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogVGhlIFwiT1JcIiBvcGVyYXRvciBgfGAgY2FuIGhlbHAgdXMgcmVtb3ZlIHNvbWUgcmVkdW5kYW5jeSBmcm9tIHRoZSBhYm92ZSBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZCB8IHJlamVjdGVkXG4gKiAgIHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogSW4gYm90aCBjaGFydHMsIGBwZW5kaW5nYCBjYW4gdHJhbnNpdGlvbiB0byBgcmVzb2x2ZWRgIG9yIGByZWplY3RlZGAsIGFuZFxuICogYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgIGNhbiBib3RoIHRyYW5zaXRpb24gdG8gYGRvbmVgLlxuICpcbiAqIFdlIGNhbiBzdHJlYW1saW5lIHRoaXMgZXZlbiBmdXJ0aGVyOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQWdhaW4sIHRoaXMgaXMgZXhhY3RseSBlcXVpdmFsZW50IHRvIHRoZSBwcmV2aW91cyB0d28gZXhhbXBsZXMuXG4gKlxuICogTm90aWNlIGluIHRoaXMgb25lIHRoYXQgd2UgaGF2ZSBwYXJlbnRoZXNlcyBgKGAgYClgIHN1cnJvdW5kaW5nIGByZXNvbHZlZGBcbiAqIGFuZCBgcmVqZWN0ZWRgLiBUaGV5IGFyZSBhY3R1YWxseSBjb21wbGV0ZWx5IGlnbm9yZWQgYnkgdGhlIHBhcnNlciwgYW5kXG4gKiB5b3UgY2FuIHVzZSB0aGVtIGFzIHlvdSBwbGVhc2UgdG8gaGVscCBtYWtlIHlvdXIgY2hhcnRzIG1vcmUgcmVhZGFibGUuXG4gKlxuICogQSBjaGFydCB3b3JrcyBleGFjdGx5IHRoZSBzYW1lIHdpdGhvdXQgdGhlbTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBDaGFydHMgY2FuIGFsc28gYmUgc3BsaXQgYWNyb3NzIG11bHRpcGxlLWxpbmVzOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPlxuICogICByZXNvbHZlZCB8XG4gKiAgIHJlamVjdGVkIC0+XG4gKiAgIGRvbmVcbiAqIGBcbiAqIGBgYFxuICogTm90aWNlIHRoYXQgYWxsIHdoaXRlLXNwYWNlIGlzIGlnbm9yZWQgb24gZWl0aGVyIHNpZGUgb2YgdGhlIGAtPmBcbiAqIGFuZCBgfGAuXG4gKlxuICogYC8vIENvbW1lbnRzIG9mIHRoaXMga2luZCBhcmUgYWxsb3dlZCwgdG9vOmBcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gLy8gV2hlcmUgZG8gd2UgZ28gZnJvbSBoZXJlP1xuICogICAgIChyZXNvbHZlZCB8IHJlamVjdGVkKSAtPiAvLyBBaCwgeWVzXG4gKlxuICogICAvLyBBbmQgbm93IHdlJ3JlIGFsbCBmaW5pc2hlZFxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBGaW5hbGx5LCBoZXJlJ3MgYSBtb3JlIGZ1bGwgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIGRyYWdEcm9wQ2hhcnQgPSBgXG4gKiAgIGlkbGUgLT5cbiAqICAgICBkcmFnLWRldGVjdCAtPlxuICogICAgICAgKGRyYWdnaW5nIHwgY2xpY2tlZClcbiAqXG4gKiAgIC8vIEp1c3QgYSBjbGljaywgYmFpbC1vdXQhXG4gKiAgIGNsaWNrZWQgLT4gaWRsZVxuICpcbiAqICAgLy8gRHJhZyBkZXRlY3RlZCFcbiAqICAgZHJhZ2dpbmcgLT5cbiAqICAgICBkcmFnLXdhaXQgLT4gZHJhZ2dlZCAtPiBkcmFnLXdhaXRcbiAqXG4gKiAgIC8vIERyYWcgZmluaXNoZWQuLi5cbiAqICAgKGRyYWctd2FpdCB8IGRyYWdnZWQpIC0+XG4gKiAgICAgKGRyYWctZG9uZSB8IGRyYWctY2FuY2VsKSAtPlxuICogICAgICAgaWRsZVxuICogYFxuICogYGBgXG4gKlxuICogQHR5cGVkZWYge3N0cmluZ3xzdHJpbmdbXX0gc3RhdGVib3RDaGFydFxuICovXG5cbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2V2ZW50c1xuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY29uc3Qge1xuICBpc0FycmF5LFxuICBpc0V2ZW50RW1pdHRlcixcbiAgaXNGdW5jdGlvbixcbiAgaXNQb2pvLFxuICBpc1N0cmluZyxcbiAgQXJnVHlwZUVycm9yLFxuICBMb2dnZXIsXG4gIFJlZmVyZW5jZUNvdW50ZXJcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgeyBkZWNvbXBvc2VDaGFydCwgY3hBcnJvdyB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcblxuZnVuY3Rpb24gU3RhdGVib3QgKG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc1N0cmluZyhuYW1lKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignXFxuU3RhdGVib3Q6IFBsZWFzZSBzcGVjaWZ5IGEgbmFtZSBmb3IgdGhpcyBtYWNoaW5lJylcbiAgfVxuXG4gIGNvbnN0IGxvZ1ByZWZpeCA9IGBTdGF0ZWJvdFske25hbWV9XWBcbiAgaWYgKCFpc1Bvam8ob3B0aW9ucykpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoYFxcbiR7bG9nUHJlZml4fTogUGxlYXNlIHNwZWNpZnkgb3B0aW9ucyBmb3IgdGhpcyBtYWNoaW5lYClcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBjaGFydCA9IHVuZGVmaW5lZCxcbiAgICBsb2dMZXZlbCA9IDMsXG4gICAgaGlzdG9yeUxpbWl0ID0gMlxuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcihgJHtsb2dQcmVmaXh9I2ApXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG4gIGNvbnN0IHsgY2FuV2FybiB9ID0gY29uc29sZVxuXG4gIGNvbnN0IHtcbiAgICBzdGF0ZXMgPSBbXSxcbiAgICByb3V0ZXMgPSBbXVxuICB9ID0gY2hhcnQgPyBkZWNvbXBvc2VDaGFydChjaGFydCkgOiBvcHRpb25zXG5cbiAgY29uc3QgeyBzdGFydEluID0gc3RhdGVzWzBdIH0gPSBvcHRpb25zXG4gIGlmICghc3RhdGVzLmluY2x1ZGVzKHN0YXJ0SW4pKSB7XG4gICAgdGhyb3cgRXJyb3IoYCR7bG9nUHJlZml4fTogU3RhcnRpbmctc3RhdGUgbm90IGluIGNoYXJ0OiBcIiR7c3RhcnRJbn1cImApXG4gIH1cblxuICBsZXQgdHJhbnNpdGlvbklkID0gMFxuICBjb25zdCBzdGF0ZUhpc3RvcnkgPSBbc3RhcnRJbl1cbiAgY29uc3Qgc3RhdGVIaXN0b3J5TGltaXQgPSBNYXRoLm1heChoaXN0b3J5TGltaXQsIDIpXG4gIGNvbnN0IGV2ZW50cyA9IGlzRXZlbnRFbWl0dGVyKG9wdGlvbnMuZXZlbnRzKSA/IG9wdGlvbnMuZXZlbnRzIDogbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3QgaW50ZXJuYWxFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgY29uc3QgSU5URVJOQUxfRVZFTlRTID0ge1xuICAgIG9uU3dpdGNoaW5nOiAnKEFOWSlzdGF0ZTpjaGFuZ2luZycsXG4gICAgb25Td2l0Y2hlZDogJyhBTlkpc3RhdGU6Y2hhbmdlZCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXRJbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxFdmVudHMuZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBvbkludGVybmFsRXZlbnQgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBpbnRlcm5hbEV2ZW50cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpbnRlcm5hbEV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0YXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3N0YXRlcycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBzdGF0ZS1jaGFuZ2VzJyxcbiAgICBbLi4uc3RhdGVzXVxuICApXG4gIGNvbnN0IHJvdXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3RyYW5zaXRpb25zJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHRyYW5zaXRpb25zJyxcbiAgICBbLi4ucm91dGVzXVxuICApXG4gIGNvbnN0IGV2ZW50c0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ2V2ZW50cycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHMnXG4gIClcblxuICAvLyBJbnRlcnByZXRzIG9uVHJhbnNpdGlvbnMoKSBhbmQgcGVyZm9ybVRyYW5zaXRpb25zKClcbiAgZnVuY3Rpb24gYXBwbHlIaXRjaGVyIChoaXRjaGVyLCBmbk5hbWUpIHtcbiAgICBjb25zdCBoaXRjaGVyQWN0aW9ucyA9XG4gICAgICBpc0Z1bmN0aW9uKGhpdGNoZXIpXG4gICAgICAgID8gaGl0Y2hlcih7IGVudGVyLCBlbWl0LCBFbnRlciwgRW1pdCB9KVxuICAgICAgICA6IGlzUG9qbyhoaXRjaGVyKVxuICAgICAgICAgID8gaGl0Y2hlclxuICAgICAgICAgIDogbnVsbFxuXG4gICAgaWYgKCFpc1Bvam8oaGl0Y2hlckFjdGlvbnMpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogRXhwZWN0ZWQgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3RgXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnRzID0ge31cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IFtdXG5cbiAgICBPYmplY3QuZW50cmllcyhoaXRjaGVyQWN0aW9ucylcbiAgICAgIC5mb3JFYWNoKChbcm91dGVDaGFydCwgYWN0aW9uT3JDb25maWddKSA9PiB7XG4gICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMS8zLi4uXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGFjdGlvbk9yQ29uZmlnKSkge1xuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoIWlzUG9qbyhhY3Rpb25PckNvbmZpZykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgY29uc3QgeyBvbjogX29uLCB0aGVuOiBfdGhlbiB9ID0gYWN0aW9uT3JDb25maWdcbiAgICAgICAgaWYgKGlzU3RyaW5nKF9vbikgfHwgaXNBcnJheShfb24pKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnROYW1lcyA9IFtfb25dLmZsYXQoKVxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXVxuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogX3RoZW4gfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oX3RoZW4pKSB7XG4gICAgICAgICAgLy8gb25UcmFuc2l0aW9ucyAyLzMuLi5cbiAgICAgICAgICAvLyAoQmVoYXZlIGxpa2Ugb25UcmFuc2l0aW9ucyBpZiBhIGNvbmZpZyBpcyBzcGVjaWZpZWQsIGJ1dFxuICAgICAgICAgIC8vICB0aGVyZSBpcyBubyBcIm9uXCIgZXZlbnQuLi4pXG4gICAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogYWN0aW9uT3JDb25maWcgfSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIGNvbnN0IGFsbFN0YXRlcyA9IFtdXG4gICAgY29uc3QgYWxsUm91dGVzID0gW11cblxuICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAyLzMuLi5cbiAgICBjb25zdCBkZWNvbXBvc2VkRXZlbnRzID0gT2JqZWN0LmVudHJpZXMoZXZlbnRzKVxuICAgICAgLnJlZHVjZSgoYWNjLCBbZXZlbnROYW1lLCBfY29uZmlnc10pID0+IHtcbiAgICAgICAgY29uc3QgeyBzdGF0ZXMsIHJvdXRlcywgY29uZmlncyB9ID0gZGVjb21wb3NlQ29uZmlncyhfY29uZmlncywgY2FuV2FybilcbiAgICAgICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgICAgICBhbGxSb3V0ZXMucHVzaCguLi5yb3V0ZXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgW2V2ZW50TmFtZV06IGNvbmZpZ3NcbiAgICAgICAgfVxuICAgICAgfSwge30pXG5cbiAgICBjb25zdCBhbGxDbGVhbnVwRm5zID0gW11cblxuICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBhbGxDbGVhbnVwRm5zLnB1c2goXG4gICAgICAuLi5PYmplY3QuZW50cmllcyhkZWNvbXBvc2VkRXZlbnRzKVxuICAgICAgICAubWFwKChbZXZlbnROYW1lLCBjb25maWdzXSkgPT5cbiAgICAgICAgICBbXG4gICAgICAgICAgICBldmVudHNIYW5kbGVkLmluY3JlYXNlKGV2ZW50TmFtZSksXG4gICAgICAgICAgICBvbkV2ZW50KGV2ZW50TmFtZSwgKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZXZlbnRXYXNIYW5kbGVkID0gY29uZmlncy5zb21lKFxuICAgICAgICAgICAgICAgICh7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NlZCA9IGluU3RhdGUoZnJvbVN0YXRlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGVyKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiAhIXBhc3NlZFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgaWYgKCFldmVudFdhc0hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTm9PcChgRXZlbnQgbm90IGhhbmRsZWQ6IFwiJHtldmVudE5hbWV9XCJgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgKS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBvblRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGNvbnN0IHRyYW5zaXRpb25Db25maWdzID0gZGVjb21wb3NlQ29uZmlncyh0cmFuc2l0aW9ucywgY2FuV2FybilcblxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnN0YXRlcylcbiAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnJvdXRlcylcbiAgICB9XG5cbiAgICBhbGxDbGVhbnVwRm5zLnB1c2goXG4gICAgICAuLi50cmFuc2l0aW9uQ29uZmlncy5jb25maWdzLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgY29uc3QgeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9ID0gdHJhbnNpdGlvblxuICAgICAgICBjb25zdCByb3V0ZSA9IGAke2Zyb21TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgcm91dGVzSGFuZGxlZC5pbmNyZWFzZShyb3V0ZSksXG4gICAgICAgICAgb25JbnRlcm5hbEV2ZW50KHJvdXRlLCBhY3Rpb24pXG4gICAgICAgIF1cbiAgICAgIH0pLmZsYXQoKVxuICAgIClcblxuICAgIC8vIERlYnVnZ2luZywgaWYgd2UncmUgYXQgdGhlIHJpZ2h0IGxldmVsXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgY29uc3QgaW52YWxpZFN0YXRlcyA9IGFsbFN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gIXN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gICAgICBjb25zdCBpbnZhbGlkUm91dGVzID0gYWxsUm91dGVzLmZpbHRlcihyb3V0ZSA9PiAhcm91dGVzLmluY2x1ZGVzKHJvdXRlKSlcbiAgICAgIGlmIChpbnZhbGlkU3RhdGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBJbnZhbGlkIHN0YXRlcyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFN0YXRlcy5tYXAoc3RhdGUgPT4gYCAgPiBcIiR7c3RhdGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBpZiAoaW52YWxpZFJvdXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCB0cmFuc2l0aW9ucyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFJvdXRlcy5tYXAocm91dGUgPT4gYCAgPiBcIiR7cm91dGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGFsbENsZWFudXBGbnMuZm9yRWFjaChmbiA9PiBmbigpKVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlvdXNTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMl1cbiAgfVxuXG4gIGZ1bmN0aW9uIGN1cnJlbnRTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMV1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblRyYW5zaXRpb25UbyAoLi4uc3RhdGVzKSB7XG4gICAgY29uc3QgdGVzdFN0YXRlcyA9IHN0YXRlcy5mbGF0KClcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2NhblRyYW5zaXRpb25UbycsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHRlc3RTdGF0ZXNbMF0pXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBpZiAoIXRlc3RTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIHJldHVybiB0ZXN0U3RhdGVzLmV2ZXJ5KHN0YXRlID0+IG5leHRTdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUgKHN0YXRlKSB7XG4gICAgY29uc3QgX3N0YXRlID0gc3RhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgPyBzdGF0ZVxuICAgICAgOiBjdXJyZW50U3RhdGUoKVxuXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZScsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIF9zdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiByb3V0ZXMucmVkdWNlKChhY2MsIHJvdXRlKSA9PiB7XG4gICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHJvdXRlLnNwbGl0KGN4QXJyb3cpXG4gICAgICAgIC5tYXAoc3RhdGUgPT4gc3RhdGUudHJpbSgpKVxuXG4gICAgICBpZiAoZnJvbVN0YXRlID09PSBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5hY2MsIHRvU3RhdGVdXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBpblN0YXRlIChzdGF0ZSwgYW55T3JGbiwgLi4uZm5BcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdpblN0YXRlJywgeyBzdGF0ZTogaXNTdHJpbmcgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBjb25kaXRpb25NYXRjaGVzID0gY3VycmVudFN0YXRlKCkgPT09IHN0YXRlXG5cbiAgICBpZiAoYW55T3JGbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWNvbmRpdGlvbk1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGFueU9yRm4pKSB7XG4gICAgICAgIHJldHVybiBhbnlPckZuKC4uLmZuQXJncylcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbnlPckZuXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmRpdGlvbk1hdGNoZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW1pdCcsIHsgZXZlbnROYW1lOiBpc1N0cmluZyB9LCBldmVudE5hbWUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gZW50ZXIgKHN0YXRlLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbnRlcicsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgdG9TdGF0ZSA9IHN0YXRlXG5cbiAgICBpZiAodG9TdGF0ZSA9PT0gaW5TdGF0ZSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEFscmVhZHkgaW4gc3RhdGU6IFwiJHt0b1N0YXRlfVwiYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICghc3RhdGVzLmluY2x1ZGVzKHRvU3RhdGUpKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgSW52YWxpZCBzdGF0ZSBcIiR7dG9TdGF0ZX1cIiwgbm90IHN3aXRjaGluZ2ApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0Um91dGUgPSBgJHtpblN0YXRlfS0+JHt0b1N0YXRlfWBcbiAgICBpZiAoIXJvdXRlcy5pbmNsdWRlcyhuZXh0Um91dGUpKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgSW52YWxpZCB0cmFuc2l0aW9uIFwiJHtuZXh0Um91dGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gRmVsbC10aHJvdWdoLCBjYW4gZW50ZXIgbmV4dCBzdGF0ZVxuICAgIGNvbnNvbGUuaW5mbyhgJHtsb2dQcmVmaXh9OiB0SWQ8JHsrK3RyYW5zaXRpb25JZH0+OiAke25leHRSb3V0ZX1gKVxuXG4gICAgc3RhdGVIaXN0b3J5LnB1c2godG9TdGF0ZSlcbiAgICBpZiAoc3RhdGVIaXN0b3J5Lmxlbmd0aCA+IHN0YXRlSGlzdG9yeUxpbWl0KSB7XG4gICAgICBzdGF0ZUhpc3Rvcnkuc2hpZnQoKVxuICAgIH1cblxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5vblN3aXRjaGluZywgdG9TdGF0ZSwgaW5TdGF0ZSwgLi4uYXJncylcbiAgICBlbWl0SW50ZXJuYWxFdmVudChuZXh0Um91dGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQoSU5URVJOQUxfRVZFTlRTLm9uU3dpdGNoZWQsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gb25FdmVudCAoZXZlbnROYW1lLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FdmVudCcsIHsgZXZlbnROYW1lOiBpc1N0cmluZywgY2I6IGlzRnVuY3Rpb24gfSwgZXZlbnROYW1lLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGV2ZW50cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGNiKVxuICAgIHJldHVybiAoKSA9PiBldmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgfVxuXG4gIGNvbnN0IHN3aXRjaE1ldGhvZHMgPSBPYmplY3Qua2V5cyhJTlRFUk5BTF9FVkVOVFMpXG4gICAgLnJlZHVjZSgob2JqLCBtZXRob2ROYW1lKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFttZXRob2ROYW1lXTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKG1ldGhvZE5hbWUsIHsgY2I6IGlzRnVuY3Rpb24gfSwgY2IpXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50ID0gc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShJTlRFUk5BTF9FVkVOVFNbbWV0aG9kTmFtZV0pXG4gICAgICAgICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvbkludGVybmFsRXZlbnQoXG4gICAgICAgICAgICBJTlRFUk5BTF9FVkVOVFNbbWV0aG9kTmFtZV0sXG4gICAgICAgICAgICAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIGNiKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgICAgICAgIGRlY3JlYXNlUmVmQ291bnQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHt9KVxuXG4gIGNvbnN0IGVudGVyRXhpdE1ldGhvZHMgPSBbXG4gICAgWydFeGl0aW5nJywgJ29uU3dpdGNoaW5nJ10sXG4gICAgWydFbnRlcmluZycsICdvblN3aXRjaGluZyddLFxuICAgIFsnRXhpdGVkJywgJ29uU3dpdGNoZWQnXSxcbiAgICBbJ0VudGVyZWQnLCAnb25Td2l0Y2hlZCddXG4gIF1cbiAgICAucmVkdWNlKChvYmosIG5hbWVzKSA9PiB7XG4gICAgICBjb25zdCBbbmFtZSwgc3dpdGNoTWV0aG9kXSA9IG5hbWVzXG4gICAgICBjb25zdCBtZXRob2ROYW1lID0gYG9uJHtuYW1lfWBcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBbbWV0aG9kTmFtZV06IGZ1bmN0aW9uIChzdGF0ZSwgY2IpIHtcbiAgICAgICAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IobWV0aG9kTmFtZSwgeyBzdGF0ZTogaXNTdHJpbmcsIGNiOiBpc0Z1bmN0aW9uIH0sIHN0YXRlLCBjYilcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICAgICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfToke2V2ZW50TmFtZX1gKVxuICAgICAgICAgIF1cbiAgICAgICAgICBjb25zdCByZW1vdmVFdmVudCA9IHN3aXRjaE1ldGhvZHNbc3dpdGNoTWV0aG9kXSgodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBpZiAobmFtZS5pbmRleE9mKCdFeGl0JykgPT09IDApIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IHRvU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYihmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVFdmVudCgpXG4gICAgICAgICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7fSlcblxuICBmdW5jdGlvbiBFbWl0IChldmVudE5hbWUpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VtaXQnLCB7IGV2ZW50TmFtZTogaXNTdHJpbmcgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIEVudGVyIChzdGF0ZSkge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignRW50ZXInLCB7IHN0YXRlOiBpc1N0cmluZyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uYXJncykgPT4gZW50ZXIoc3RhdGUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBJblN0YXRlIChzdGF0ZSwgYW55T3JGbikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignSW5TdGF0ZScsIHsgc3RhdGU6IGlzU3RyaW5nIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5mbkFyZ3MpID0+IGluU3RhdGUoc3RhdGUsIGFueU9yRm4sIC4uLmZuQXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fTogU3RhdGUtbWFjaGluZSByZXNldCFgKVxuXG4gICAgc3RhdGVIaXN0b3J5Lmxlbmd0aCA9IDBcbiAgICBzdGF0ZUhpc3RvcnkucHVzaChzdGFydEluKVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbk5vT3AgKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBsYXN0U3RhdGUgPSBwcmV2aW91c1N0YXRlKClcbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCBwcmV2Um91dGUgPSBgJHtsYXN0U3RhdGUgPT09IHVuZGVmaW5lZCA/ICdbdW5kZWZpbmVkXScgOiBsYXN0U3RhdGV9LT4ke2luU3RhdGV9YFxuXG4gICAgY29uc3QgYXZhaWxhYmxlU3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIGlmICghYXZhaWxhYmxlU3RhdGVzLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBUaGVyZSBhcmUgbm8gc3RhdGVzIGF2YWlsYWJsZSBmcm9tIFwiJHtpblN0YXRlfVwiYFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGAke2xvZ1ByZWZpeH06ICR7bWVzc2FnZX1cXG5gICtcbiAgICAgICAgICBgICA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiJHtwcmV2Um91dGV9XCJcXG5gICtcbiAgICAgICAgICBgICA+IEZyb20gXCIke2luU3RhdGV9XCIsIHZhbGlkIHN0YXRlcyBhcmU6IFske2F2YWlsYWJsZVN0YXRlc1xuICAgICAgICAgICAgLm1hcChzdGF0ZSA9PiBgXCIke3N0YXRlfVwiYClcbiAgICAgICAgICAgIC5qb2luKCcsICcpfV1gXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlczogc3RhdGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICB0cmFuc2l0aW9uczogcm91dGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICBldmVudHM6IGV2ZW50c0hhbmRsZWQucmVmcygpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5mbyAoKSB7XG4gICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fTogSW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzdGF0ZS1tYWNoaW5lYClcblxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHN0YXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8ocm91dGVzSGFuZGxlZClcbiAgICBsb2dSZWZDb3VudGVySW5mbyhldmVudHNIYW5kbGVkKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9nUmVmQ291bnRlckluZm8gKHJlZkNvdW50ZXIpIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCB0YWJsZSB9ID0gcmVmQ291bnRlci50b1ZhbHVlKClcbiAgICBjb25zb2xlLmxvZyhkZXNjcmlwdGlvbilcbiAgICBpZiAodGFibGUubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLnRhYmxlKHRhYmxlKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnICA+IE5vIGluZm9ybWF0aW9uJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBzdGF0ZS1tYWNoaW5lIG9iamVjdCBjcmVhdGVkIGJ5XG4gICAqIHtAbGluayAjc3RhdGVib3RzdGF0ZWJvdHxTdGF0ZWJvdCgpfS5cbiAgICogQHR5cGVkZWYge09iamVjdH0gc3RhdGVib3RGc21cbiAgICovXG5cbiAgcmV0dXJuIHtcbiAgICAvLyBGb3IgaWRlbnRpZnlpbmcgU3RhdGVib3Qgb2JqZWN0c1xuICAgIF9fU1RBVEVCT1RfXzogMSxcblxuICAgIC8qKlxuICAgICAqIFRlc3RzIHRvIHNlZSBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgc3BlY2lmaWVkIHN0YXRlIGZyb21cbiAgICAgKiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogSWYgbW9yZSB0aGFuIG9uZSBzdGF0ZSBpcyBzcGVjaWZpZWQsIGB0cnVlYCBpcyByZXR1cm5lZCBvbmx5IGlmXG4gICAgICogKipBTEwqKiBzdGF0ZXMgYXJlIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2dhbWUtbWVudXMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+XG4gICAgICogICAgICAgbWVudSAtPlxuICAgICAqICAgICAgICAgcGxheSB8XG4gICAgICogICAgICAgICBvcHRpb25zIHxcbiAgICAgKiAgICAgICAgIHNvdW5kIHxcbiAgICAgKiAgICAgICAgIHF1aXRcbiAgICAgKlxuICAgICAqICAgICAvLyBHbyBiYWNrIHRvIG1lbnVcbiAgICAgKiAgICAgcGxheSB8IG9wdGlvbnMgfCBzb3VuZCAtPiBtZW51XG4gICAgICpcbiAgICAgKiAgICAgLy8gQ2FuIHF1aXQgZnJvbSBtYWluIGdhbWUsIHRvb1xuICAgICAqICAgICBwbGF5IC0+IHF1aXRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BsYXknKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdtZW51JylcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbyhbJ3BsYXknLCAnb3B0aW9ucyddKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBjYW5UcmFuc2l0aW9uVG86IGNhblRyYW5zaXRpb25UbyxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjb3JvdXRpbmUnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBzdXNwZW5kZWQgLT4gcnVubmluZyAtPiAoc3VzcGVuZGVkIHwgZGVhZClcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3VzcGVuZGVkXCJcbiAgICAgKi9cbiAgICBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGVtaXRzIGFuIGV2ZW50LCBmaXJpbmcgYW55IGxpc3RlbmVycyBhZGRlZCB1c2luZ1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnN8LnBlcmZvcm1UcmFuc2l0aW9ucygpfSBvciB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudHwub25FdmVudCgpfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0gey4uLip9IFthcmdzXVxuICAgICAqICBPcHRpb25hbCBhcmd1bWVudHMgdG8gcGFzcyB0byBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogIFdoZXRoZXIgb3Igbm90IHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogIFNlZToge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2VtaXR0ZXJfZW1pdF9ldmVudG5hbWVfYXJnc3xOb2RlIEV2ZW50c31cbiAgICAgKiAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICpcbiAgICAgKiBTdGF0ZWJvdCBpbXBvcnRzIGBFdmVudEVtaXR0ZXJgIGZyb20gdGhlXG4gICAgICogIHtAbGluayBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHN8ZXZlbnRzfVxuICAgICAqIHBhY2thZ2UgZm9yIGRlYWxpbmcgd2l0aCBldmVudHMgaW4gdGhlIGJyb3dzZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Jhc2ljLWZvcm0nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgLT4gcmVkaXJlY3RcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6IHtcbiAgICAgKiAgICAgb246ICdwb3N0LWRhdGEnLFxuICAgICAqICAgICB0aGVuOiAoLi4uYXJncykgPT4ge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBhcmdzOiAnLCBhcmdzKVxuICAgICAqICAgICAgIC8vIHNldFRpbWVvdXQobWFjaGluZS5FbnRlcigncmVkaXJlY3QnKSwgNTAwMClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVtaXQoJ3Bvc3QtZGF0YScsICdIZWxsbywgd29ybGQhJylcbiAgICAgKiAvLyBFdmVudCBhcmdzOiBbXCJIZWxsbywgd29ybGQhXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzZW5kaW5nXCJcbiAgICAgKi9cbiAgICBlbWl0OiBlbWl0LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqICBUaGUgZGVzaXJlZCBldmVudCB0byB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfS5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBlbWl0cyB0aGF0IGV2ZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdzdG9wJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAncHJlcGFyZS10by1nbyAtPiBnbyc6ICAgICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAncHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIG5leHRUcmFmZmljTGlnaHQgPSBtYWNoaW5lLkVtaXQoJ3RpbWVyJylcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzdG9wXCJcbiAgICAgKlxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqIG5leHRUcmFmZmljTGlnaHQoKVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicHJlcGFyZS10by1zdG9wXCJcbiAgICAgKi9cbiAgICBFbWl0OiBFbWl0LFxuXG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nIGFzIGl0IGlzXG4gICAgICogYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIGRlc2lyZWQgc3RhdGUgdG8gc3dpdGNoLXRvLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgc3RhdGUgY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZGlhbG9nJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzaG93aW5nLW1vZGFsIC0+IChzYXZpbmcgfCBpZGxlKVxuICAgICAqICAgICAgIHNhdmluZyAtPiBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcImlkbGVcIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2F2aW5nJylcbiAgICAgKiAvLyBmYWxzZVxuICAgICAqXG4gICAgICogLy8gW2RpYWxvZ106IEludmFsaWQgdHJhbnNpdGlvbiBcImlkbGUtPnNhdmluZ1wiLCBub3Qgc3dpdGNoaW5nXG4gICAgICogLy8gPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIlt1bmRlZmluZWRdLT5pZGxlXCJcbiAgICAgKiAvLyA+IEZyb20gXCJpZGxlXCIsIHZhbGlkIHN0YXRlcyBhcmU6IFtcInNob3dpbmctbW9kYWxcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3Nob3dpbmctbW9kYWwnKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBlbnRlcjogZW50ZXIsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUsIHNvIGxvbmdcbiAgICAgKiBhcyBpdCBpcyBhY2Nlc3NpYmxlIGZyb20gdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIGRlc2lyZWQgc3RhdGUgdG8gc3dpdGNoLXRvLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgQSBmdW5jdGlvbiB0aGF0IGNhbiBjaGFuZ2UgdGhlIHN0YXRlIHdoZW4gY2FsbGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwb3B1cC1tZW51Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBtZW51LW9wZW5lZCAtPlxuICAgICAqICAgICAgIChpdGVtLWNsaWNrZWQgfCBpZGxlKVxuICAgICAqXG4gICAgICogICAgIGl0ZW0tY2xpY2tlZCAtPiBpZGxlXG4gICAgICogICBgLFxuICAgICAqICAgc3RhcnRJbjogJ21lbnUtb3BlbmVkJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBidXR0b24ub25jbGljayA9IG1hY2hpbmUuRW50ZXIoJ2l0ZW0tY2xpY2tlZCcpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwibWVudS1vcGVuZWRcIlxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2soKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIml0ZW0tY2xpY2tlZFwiXG4gICAgICovXG4gICAgRW50ZXI6IEVudGVyLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgc3RhdGVzIHRoZSBtYWNoaW5lIGhhcyBiZWVuIGluIHNvIGZhciwgdXAgdG8gYSBsaW1pdCBzZXRcbiAgICAgKiBieSBgaGlzdG9yeUxpbWl0YCBpbiB7QGxpbmsgc3RhdGVib3RPcHRpb25zfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQSBjb3B5IG9mIHRoZSBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdkb3dubG9hZGVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPiAoZmFpbHVyZSB8IHN1Y2Nlc3MpXG4gICAgICogICAgICAgZmFpbHVyZSAtPiBsb2FkaW5nXG4gICAgICogICAgICAgc3VjY2VzcyAtPiBkb25lXG4gICAgICogICBgLFxuICAgICAqICAgaGlzdG9yeUxpbWl0OiA0XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2ZhaWx1cmUnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2xvYWRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3N1Y2Nlc3MnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIG1hY2hpbmUuaGlzdG9yeSgpXG4gICAgICogLy8gW1wiZmFpbHVyZVwiLCBcImxvYWRpbmdcIiwgXCJzdWNjZXNzXCIsIFwiZG9uZVwiXVxuICAgICAqL1xuICAgIGhpc3Rvcnk6ICgpID0+IFsuLi5zdGF0ZUhpc3RvcnldLFxuXG4gICAgLyoqXG4gICAgICogUHJpbnQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZSB0byB0aGUgY29uc29sZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluZm8oKVxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZS5cbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICBzdGF0ZXMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgICAnZG9uZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICAnaWRsZScgICAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdIExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9uczpcbiAgICAgKiAvLyDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICAgKiAvLyDilIIgKGluZGV4KSDilIIgICAgdHJhbnNpdGlvbnMgICAg4pSCICAgIyAgICDilIJcbiAgICAgKiAvLyDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICAgKiAvLyDilIIgICAgMCAgICDilIIgJ2lkbGUtPnJlY2VpdmluZycg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMSAgICDilIIgICdpZGxlLT5zZW5kaW5nJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMiAgICDilIIgJ3JlY2VpdmluZy0+ZG9uZScg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilIIgICAgMyAgICDilIIgICdzZW5kaW5nLT5kb25lJyAg4pSCICdOb25lJyDilIJcbiAgICAgKiAvLyDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLTilIDilIDilIDilIDilIDilIDilIDilIDilJhcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzOlxuICAgICAqIC8vIChObyBpbmZvcm1hdGlvbilcbiAgICAgKi9cbiAgICBpbmZvOiAoKSA9PiBpbmZvKCksXG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFNhbWUgZGV0YWlscyBhcyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5mb3wuaW5mbygpfSBpbiBvYmplY3QtZm9ybS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5zcGVjdCgpXG4gICAgICogLy8gV2lsbCByZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAgICogLy8gIHsgc3RhdGVzLCB0cmFuc2l0aW9ucywgZXZlbnRzIH1cbiAgICAgKlxuICAgICAqIC8vIFRoZXNlIHdpbGwgZWFjaCBoYXZlIGtleS12YWx1ZXMsIHRoZSBrZXkgYmVpbmcgdGhlIG5hbWVcbiAgICAgKiAvLyBhbmQgdGhlIHZhbHVlIGJlaW5nIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGF0dGFjaGVkLlxuICAgICAqL1xuICAgIGluc3BlY3Q6ICgpID0+IGluc3BlY3QoKSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9XG4gICAgICogbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGBzdGF0ZWAsIGltbWVkaWF0ZWx5IHJldHVybmluZyBlaXRoZXJcbiAgICAgKiBgdHJ1ZWAgb3IgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGBvdXRwdXRXaGVuVHJ1ZWAgaXMgc3BlY2lmaWVkLCB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBpbnN0ZWFkIG9mIGB0cnVlYCwgYW5kIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2ZcbiAgICAgKiAgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCB0aGVuIGl0cyByZXR1cm4tdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAgICogYXMgdGhlIGB0cnVlYC12YWx1ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUgdG8gdGVzdCBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBbb3V0cHV0V2hlblRydWVdXG4gICAgICogIE9wdGlvbmFsIGB0cnVlYC12YWx1ZS4gSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgYmVcbiAgICAgKiAgY2FsbGVkIGFuZCBpdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfCp9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAnUHVycnJyLi4uJylcbiAgICAgKiAvLyBcIlB1cnJyci4uLlwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdnZWFyLTEnKVxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdJZGxpbmchJylcbiAgICAgKiAgIHJldHVybiAnUHVycnJyLi4uJ1xuICAgICAqIH0pXG4gICAgICogLy8gbnVsbFxuICAgICAqIC8vIF4gdGhlIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgYXQgYWxsIGluIHRoZSBgZmFsc2VgIGNhc2UsXG4gICAgICogLy8gICBzbyBubyBjb25zb2xlLmxvZyBlaXRoZXIuXG4gICAgICovXG4gICAgaW5TdGF0ZTogaW5TdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBydW4sIHRlc3RzIHRoYXRcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0gbWF0Y2hlcyB0aGVcbiAgICAgKiBzcGVjaWZpZWQgc3RhdGUsIHJldHVybmluZyBlaXRoZXIgYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlfC5pblN0YXRlKCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUgdG8gdGVzdCBhZ2FpbnN0LlxuICAgICAqIEBwYXJhbSB7YW55fGZ1bmN0aW9ufSBbb3V0cHV0V2hlblRydWVdXG4gICAgICogIE9wdGlvbmFsIGB0cnVlYC12YWx1ZS4gSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIGl0IHdpbGwgYmVcbiAgICAgKiAgY2FsbGVkIGFuZCBpdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYWxscyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGl0dGxlLXJldnZlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICAoZ2Vhci0xIHwgZ2Vhci0yIHwgcmV2ZXJzZSkgLT5cbiAgICAgKiAgICAgaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiB2YXIgaWRsaW5nID0gbWFjaGluZS5JblN0YXRlKCdpZGxlJylcbiAgICAgKiB2YXIgcHVycmluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdJZGxpbmchJylcbiAgICAgKiAgIHJldHVybiAnUHVycnJyLi4uJ1xuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBpZGxpbmcoKVxuICAgICAqIC8vIHRydWVcbiAgICAgKlxuICAgICAqIHB1cnJpbmcoKVxuICAgICAqIC8vIElkbGluZyFcbiAgICAgKiAvLyBcIlB1cnJyci4uLlwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdnZWFyLTEnKVxuICAgICAqIHB1cnJpbmcoKVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIEluU3RhdGU6IEluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBzdGF0ZS1tYWNoaW5lLlxuICAgICAqXG4gICAgICogVXNlZCBmb3IgbG9nZ2luZyBhbmQgYWxzbyBieSB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX1cbiAgICAgKiBmb3IgdGhlIHNhbWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnQXksIHRoZXJl4oCZcyB0aGUgcnViLicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHRoZS1xdWVzdGlvbiAtPiAodG8tYmUgfCBub3QtdG8tYmUpXG4gICAgICogICAgICAgbm90LXRvLWJlIC0+IHBlcmNoYW5jZS10by1kcmVhbVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm5hbWUoKVxuICAgICAqIC8vIFwiQXksIHRoZXJl4oCZcyB0aGUgcnViLlwiXG4gICAgICovXG4gICAgbmFtZTogKCkgPT4gbmFtZSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGJlY29tZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtlbnRlckNhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmVkKCdkb25lJywgZnJvbVN0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdFbnRlcmVkIGZyb206JywgZnJvbVN0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyZWQgZnJvbTogcmVjZWl2aW5nXG4gICAgICovXG4gICAgb25FbnRlcmVkOiBlbnRlckV4aXRNZXRob2RzLm9uRW50ZXJlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBtYWRlIGl0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmluZygnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJpbmcgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyaW5nIGZyb206IHNlbmRpbmdcbiAgICAgKiAvLyBXZSBtYWRlIGl0IVxuICAgICAqL1xuICAgIG9uRW50ZXJpbmc6IGVudGVyRXhpdE1ldGhvZHMub25FbnRlcmluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGVudGVyQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIHNwZWNpZmllZFxuICAgICAqIGV2ZW50IGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28gLT4gZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfSxcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV2ZW50KCd0aW1lcicsICgpID0+IHtcbiAgICAgKiAgIHJlZHJhd1RyYWZmaWNMaWdodHMoKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBzZXRJbnRlcnZhbChtYWNoaW5lLkVtaXQoJ3RpbWVyJyksIDIwMDApXG4gICAgICovXG4gICAgb25FdmVudDogb25FdmVudCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIGFyZSBoZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIC8vIFdlIGFyZSBoZWFkaW5nIHRvOiBzZW5kaW5nXG4gICAgICovXG4gICAgb25FeGl0ZWQ6IGVudGVyRXhpdE1ldGhvZHMub25FeGl0ZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipCRUZPUkUqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgaXMgbm8gbG9uZ2VyIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZXhpdENhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKHRvU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXhpdGVkKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1BlYWNlIG91dCEnKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRXhpdGluZygnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0hlYWRpbmcgdG86JywgdG9TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBIZWFkaW5nIHRvOiByZWNlaXZpbmdcbiAgICAgKiAvLyBQZWFjZSBvdXQhXG4gICAgICovXG4gICAgb25FeGl0aW5nOiBlbnRlckV4aXRNZXRob2RzLm9uRXhpdGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgZXhpdENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSBhZnRlciAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGVkKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBXZSB3ZW50IGZyb20gXCIke2Zyb21TdGF0ZX1cIiB0byBcIiR7dG9TdGF0ZX1cImApXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogLy8gV2Ugd2VudCBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGVkOiBzd2l0Y2hNZXRob2RzLm9uU3dpdGNoZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYmVmb3JlICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBHb2luZyBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIEdvaW5nIGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoaW5nOiBzd2l0Y2hNZXRob2RzLm9uU3dpdGNoaW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoaW5nIC5vblN3aXRjaGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoZWQgLm9uU3dpdGNoZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIHN3aXRjaENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBSdW4gY2FsbGJhY2tzIHdoZW4gdHJhbnNpdGlvbnMgaGFwcGVuLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgc2VuZERhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnc2VudCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAncmVjZWl2ZWQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lJzogd2hhdEhhcHBlbmVkID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FsbCBmaW5pc2hlZDogJywgd2hhdEhhcHBlbmVkKVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNlbmREYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gcmVjZWl2ZURhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFRoZSBhYm92ZSBleGFtcGxlIHVzaW5nIGEgZnVuY3Rpb24gZm9yIGNvbmZpZ1xuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucygoeyBlbnRlciB9KSA9PiAoe1xuICAgICAqICAgJ2lkbGUgLT4gc2VuZGluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgc2VuZERhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IGVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ2lkbGUgLT4gcmVjZWl2aW5nJzogKCkgPT4ge1xuICAgICAqICAgICByZWNlaXZlRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gZW50ZXIoJ2RvbmUnLCAncmVjZWl2ZWQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIGV0Yy4uLlxuICAgICAqL1xuICAgIG9uVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ29uVHJhbnNpdGlvbnMnKSxcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gdHJhbnNpdGlvbnMgd2hlbiBldmVudHMgaGFwcGVuLlxuICAgICAqXG4gICAgICogVXNlIGB0aGVuYCB0byBvcHRpb25hbGx5IGFkZCBjYWxsYmFja3MgdG8gdGhvc2UgdHJhbnNpdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gdHJhbnNpdGlvbnNcbiAgICAgKiAgQ29uZmlndXJhdGlvbiBpbiB0aGUgZm9ybSBvZiBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgICAqICByZXR1cm5zIGFuIG9iamVjdC4gSWYgYSBmdW5jdGlvbiBpcyB1c2VkLCB0aGVyZSB3aWxsIGJlIGEgc2luZ2xlXG4gICAgICogIGFyZ3VtZW50IHBhc3NlZC1pbjogYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzXG4gICAgICogIGF0dGFjaGVkIGFzIGEgY29udmVuaWVuY2U6XG4gICAgICpcbiAgICAgKiAgLSB7e0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfSwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0sIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0sIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9fVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGFkZGVkXG4gICAgICogIGJ5IHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjb21wbGV4LWZvcm0nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgdXBkYXRlXG4gICAgICpcbiAgICAgKiAgICAgLy8gTWF5YmUgdGhpbmdzIHRha2UgYSBsb25nIHRpbWUuLi5cbiAgICAgKiAgICAgdXBkYXRlIC0+XG4gICAgICogICAgICAgd2FpdGluZyAtPiB3YWl0aW5nLWEtd2hpbGVcbiAgICAgKlxuICAgICAqICAgICAvLyBXaGljaCBwYXRoIHdpbGwgd2UgdGFrZT9cbiAgICAgKiAgICAgd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPlxuICAgICAqICAgICAgIHN1Y2Nlc3MgfCBmYWlsZWQgfCB0aW1lb3V0XG4gICAgICpcbiAgICAgKiAgICAgLy8gQWxsIGRvbmUhXG4gICAgICogICAgIHN1Y2Nlc3MgfCBmYWlsZWQgfCB0aW1lb3V0IC0+XG4gICAgICogICAgICAgZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucygoeyBFbnRlciwgZW1pdCB9KSA9PiAoe1xuICAgICAqICAgJ2lkbGUgLT4gdXBkYXRlJzoge1xuICAgICAqICAgICBvbjogJ3VzZXItc2F2ZWQnLFxuICAgICAqICAgICB0aGVuOiAoZGF0YSkgPT4ge1xuICAgICAqICAgICAgIGNvbnNvbGUubG9nKCdTZW5kaW5nIGRhdGE6ICcsIGRhdGEpXG4gICAgICpcbiAgICAgKiAgICAgICBzZW5kRGF0YShkYXRhKVxuICAgICAqICAgICAgICAgLnRoZW4oRW50ZXIoJ3N1Y2Nlc3MnKSlcbiAgICAgKiAgICAgICAgIC5jYXRjaChFbnRlcignZmFpbGVkJykpXG4gICAgICpcbiAgICAgKiAgICAgICBlbWl0KCdkYXRhLXNlbnQnKVxuICAgICAqICAgICB9XG4gICAgICogICB9LFxuICAgICAqICAgJ3VwZGF0ZSAtPiB3YWl0aW5nJzoge1xuICAgICAqICAgICBvbjogJ2RhdGEtc2VudCcsXG4gICAgICogICAgIHRoZW46ICgpID0+IHtcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd3YWl0aW5nLWEtd2hpbGUnKSwgNzUwKVxuICAgICAqICAgICAgIHNldFRpbWVvdXQoRW50ZXIoJ3RpbWVvdXQnKSwgNTAwMClcbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqIH0pKVxuICAgICAqXG4gICAgICogLy8gSnVzdCB0byBpbGx1c3RyYXRlIHRoYXQgeW91IGNhbiBtaXggbicgbWF0Y2ggd2l0aCBvblRyYW5zaXRpb25zOlxuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucyh7XG4gICAgICogICAnd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPiBzdWNjZXNzJzogKCkgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnTG92ZWx5IScpXG4gICAgICogICB9LFxuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gdGltZW91dCc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1dlbGwsIGF0IGxlYXN0IHlvdSBoYXZlIHlvdXIgc2hvZXMnKVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVtaXQoJ3VzZXItc2F2ZWQnLCBbJ3NvbWUnLCAnZGF0YSddKVxuICAgICAqIC8vIFNlbmRpbmcgZGF0YTogW1wic29tZVwiLCBcImRhdGFcIl1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHNlbmREYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqL1xuICAgIHBlcmZvcm1UcmFuc2l0aW9uczogdHJhbnNpdGlvbnMgPT4gYXBwbHlIaXRjaGVyKHRyYW5zaXRpb25zLCAncGVyZm9ybVRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwcmV2aW91cyBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfVxuICAgICAqICBUaGUgcHJldmlvdXMgc3RhdGUsIG9yIGB1bmRlZmluZWRgIGlmIHRoZXJlIGlzbid0IG9uZSAoaWU7IHlvdVxuICAgICAqICBoYXZlIGp1c3QgY2FsbGVkIHtAbGluayAjc3RhdGVib3Rmc21yZXNldHwucmVzZXQoKX0sIG9yIHRoZVxuICAgICAqICBtYWNoaW5lIGhhcyBqdXN0IHN0YXJ0ZWQuKVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdzaW1wbGUtc2VuZGVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogbWFjaGluZS5wcmV2aW91c1N0YXRlKClcbiAgICAgKiAvLyBcImlkbGVcIlxuICAgICAqL1xuICAgIHByZXZpb3VzU3RhdGU6IHByZXZpb3VzU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdGF0ZS1tYWNoaW5lIHRvIGl0cyBzdGFydGluZy1zdGF0ZSBhbmQgY2xlYXJzIHRoZVxuICAgICAqIHN0YXRlLWhpc3RvcnkuXG4gICAgICpcbiAgICAgKiBBbGwgbGlzdGVuZXJzIHdpbGwgc3RpbGwgYmUgYXR0YWNoZWQsIGJ1dCBubyBldmVudHMgb3IgdHJhbnNpdGlvbnMgd2lsbCBiZSBmaXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdjYXJvdXNlbCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHBhZ2UtMSAtPlxuICAgICAqICAgICBwYWdlLTIgLT5cbiAgICAgKiAgICAgcGFnZS0zIC0+XG4gICAgICogICAgIHBhZ2UtNCAtPiBwYWdlLTFcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncGFnZS0yJylcbiAgICAgKiBtYWNoaW5lLnJlc2V0KClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJwYWdlLTFcIlxuICAgICAqL1xuICAgIHJlc2V0OiByZXNldCxcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBgYXJyYXlgIG9mIHN0YXRlcyBhY2Nlc3NpYmxlIGZyb20gdGhlIHN0YXRlIHNwZWNpZmllZC5cbiAgICAgKiBJZiBubyBzdGF0ZSBpcyBwYXNzZWQtaW4sIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0gaXMgdXNlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGVdIFRoZSBzdGF0ZSB0byBjaGVjay4ge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9XG4gICAgICogIGlmIHVuc3BlY2lmaWVkLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmdbXX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgICogLy8gW1wic2VuZGluZ1wiLCBcInJlY2VpdmluZ1wiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgncmVjZWl2aW5nJylcbiAgICAgKiAvLyBbXCJkb25lXCJdXG4gICAgICovXG4gICAgc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmU6IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTdGF0ZWJvdCAobWFjaGluZSkge1xuICByZXR1cm4gKFxuICAgIGlzUG9qbyhtYWNoaW5lKSAmJlxuICAgIHR5cGVvZiBtYWNoaW5lLl9fU1RBVEVCT1RfXyA9PT0gJ251bWJlcidcbiAgKVxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VDb25maWdzIChjb25maWdzLCBjYW5XYXJuKSB7XG4gIGNvbnN0IGFsbFN0YXRlcyA9IFtdXG4gIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgY29uc3QgX2NvbmZpZ3MgPSBjb25maWdzLnJlZHVjZSgoYWNjLCBjb25maWcpID0+IHtcbiAgICBjb25zdCB7IHJvdXRlQ2hhcnQsIGFjdGlvbiB9ID0gY29uZmlnXG4gICAgY29uc3QgeyBzdGF0ZXMsIHJvdXRlcywgdHJhbnNpdGlvbnMgfSA9IGRlY29tcG9zZUNoYXJ0KHJvdXRlQ2hhcnQpXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgIH1cbiAgICByZXR1cm4gW1xuICAgICAgLi4uYWNjLFxuICAgICAgLi4udHJhbnNpdGlvbnMubWFwKHRyYW5zaXRpb24gPT4ge1xuICAgICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHRyYW5zaXRpb25cbiAgICAgICAgcmV0dXJuIHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfVxuICAgICAgfSlcbiAgICBdXG4gIH0sIFtdKVxuXG4gIHJldHVybiB7XG4gICAgY29uZmlnczogX2NvbmZpZ3MsXG4gICAgc3RhdGVzOiBhbGxTdGF0ZXMsXG4gICAgcm91dGVzOiBhbGxSb3V0ZXNcbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQVNTRVJUSU9OIEhFTFBFUlNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByb3V0ZUlzUG9zc2libGUsXG4gIGFzc2VydFJvdXRlXG59XG5cbmNvbnN0IHsgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGRlY29tcG9zZVJvdXRlIH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuY29uc3Qge1xuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBMb2dnZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgaXNUZW1wbGF0ZUxpdGVyYWxcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG5mdW5jdGlvbiByb3V0ZUlzUG9zc2libGUgKG1hY2hpbmUsIGV4cGVjdGVkUm91dGUpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdyb3V0ZUlzUG9zc2libGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCByb3V0ZSA9IGRlY29tcG9zZVJvdXRlKGV4cGVjdGVkUm91dGUpXG4gIHJldHVybiByb3V0ZS5ldmVyeSgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSByb3V0ZS5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXh0U3RhdGUgPSByb3V0ZVtpbmRleCArIDFdXG4gICAgICBjb25zdCBhdmFpbGFibGVTdGF0ZXMgPSBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKHN0YXRlKVxuICAgICAgY29uc3QgcGFzc2VzID0gYXZhaWxhYmxlU3RhdGVzLmluY2x1ZGVzKG5leHRTdGF0ZSlcbiAgICAgIHJldHVybiBwYXNzZXNcbiAgICB9XG4gIH0pXG59XG5cbmxldCBhc3NlcnRpb25JZCA9IDBcblxuLyoqXG4gKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0gb3B0aW9ucy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IGFzc2VydFJvdXRlT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkZXNjcmlwdGlvbl1cbiAqICBEZXNjcmliZSB0aGUgc3VjY2Vzcy1jb25kaXRpb24gZm9yIHRoaXMgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtmcm9tU3RhdGU9XCJcIl1cbiAqICBXYWl0IGZvciB0aGUgbWFjaGluZSB0byBiZSBpbiB0aGlzIHN0YXRlIGJlZm9yZSBhc3NlcnRpb24gYmVnaW5zLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW3J1bl1cbiAqICBSdW4gdGhpcyBmdW5jdGlvbiBqdXN0IGJlZm9yZSBzdGFydGluZyB0aGUgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtwZXJtaXR0ZWREZXZpYXRpb25zPTBdXG4gKiAgSWYgd2UgaGl0IGFuIHVuZXhwZWN0ZWQgc3RhdGUgZHVyaW5nIGFzc2VydGlvbiwgdGhpcyBpcyBhIFwiZGV2aWF0aW9uXCIuXG4gKiAgSXQgbWlnaHQgYmUgdGhhdCB0aGUgRlNNIHdpbGwgY29tZSBiYWNrIHRvIHRoZSBleHBlY3RlZCBzdGF0ZSBhZ2FpblxuICogIGFmdGVyIGEgY2VydGFpbiBudW1iZXIgb2YgdGhlc2UuIEZvciBleGFtcGxlLCBpZiB5b3VyIEZTTSBoYXMgYVxuICogIFwicmV0cnlcIiByb3V0ZSBjb25maWd1cmVkLCB0aGlzIG51bWJlciBjYW4gYWNjb3VudCBmb3IgaXQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3RpbWVvdXRJbk1zPTEwMDBdXG4gKiAgUGVybWl0dGVkIGxlbmd0aCBvZiB0aW1lIGZvciB0aGUgZW50aXJlIGFzc2VydGlvbiwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIE5vcm1hbGx5IHdlIHdhbnQgbG9ncyBmb3IgYXNzZXJ0aW9ucywgcmlnaHQ/IFdlbGwsIHlvdSBjYW4gdHVuZVxuICogIHRoZW0ganVzdCBsaWtlIHlvdSBjYW4gd2l0aCB7QGxpbmsgI3N0YXRlYm90b3B0aW9uc3xzdGF0ZWJvdE9wdGlvbnN9LlxuICovXG5cbmZ1bmN0aW9uIGFzc2VydFJvdXRlIChtYWNoaW5lLCBleHBlY3RlZFJvdXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignYXNzZXJ0Um91dGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBhc3NlcnRpb25JZCArPSAxXG5cbiAgY29uc3Qge1xuICAgIGRlc2NyaXB0aW9uID0gJ0Fzc2VydGlvbiBjb21wbGV0ZScsXG4gICAgZnJvbVN0YXRlID0gJycsXG4gICAgcnVuID0gKCkgPT4ge30sXG4gICAgcGVybWl0dGVkRGV2aWF0aW9ucyA9IDAsXG4gICAgdGltZW91dEluTXMgPSAxMDAwLFxuICAgIGxvZ0xldmVsID0gM1xuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG5cbiAgY29uc3QgcHJlZml4ID0gYFN0YXRlYm90WyR7bWFjaGluZS5uYW1lKCl9XTogYUlkPCR7YXNzZXJ0aW9uSWR9PmBcbiAgY29uc3Qgcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShleHBlY3RlZFJvdXRlKVxuXG4gIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06IEFzc2VydGluZyByb3V0ZTogWyR7cm91dGUuam9pbignID4gJyl9XWApXG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH06ID4gQXNzZXJ0aW9uIHdpbGwgc3RhcnQgZnJvbSBzdGF0ZTogXCIke2Zyb21TdGF0ZX1cImApXG5cbiAgY29uc3QgZnJvbVN0YXRlQWN0aW9uRm4gPSBEZWZlcihydW4pXG4gIGxldCByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9ICgpID0+IHsgfVxuXG4gIGNvbnN0IHRvdGFsVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IGFzc2VydGlvblRpbWVvdXRUaW1lclxuICBsZXQgZGV2aWF0aW9ucyA9IDBcbiAgbGV0IHBlbmRpbmcgPSB0cnVlXG4gIGxldCB1bmV4cGVjdGVkID0gZmFsc2VcblxuICBjb25zdCBjb25zdW1lUm91dGUgPSBbLi4ucm91dGVdXG4gIGNvbnN0IHJlcG9ydCA9IFRhYmxlKFxuICAgIFsnc3RhdGUnLCAnZXhwZWN0ZWQnLCAnaW5mbycsICd0b29rJ10sXG4gICAgWydjZW50ZXInLCAnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXVxuICApXG5cbiAgY29uc3QgZmluYWxpc2VSZXBvcnQgPSBPbmNlKGVyciA9PiB7XG4gICAgYWRkUm93KCcnLCAnJywgJycsICdUT1RBTDogJyArIHRvdGFsVGltZVRha2VuKCkpXG4gICAgcmVwb3J0LmxvY2soKVxuICAgIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06ICR7ZGVzY3JpcHRpb259OiBbJHtlcnIgPyAnRkFJTEVEJyA6ICdTVUNDRVNTJ31dYClcbiAgICBjb25zb2xlLnRhYmxlKHJlcG9ydC5jb250ZW50KCkpXG4gICAgcmV0dXJuIGVyclxuICB9KVxuXG4gIGNvbnN0IHsgYWRkUm93IH0gPSByZXBvcnRcbiAgZnVuY3Rpb24gZW50ZXJlZFN0YXRlIChzdGF0ZSkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICBhZGRSb3coc3RhdGUsICctJywgJ1BFTkRJTkcnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlWzBdXG4gICAgICBpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCB1bmV4cGVjdGVkID8gJ1JFQUxJR05FRCcgOiAnT0tBWScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgICBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCAnV1JPTkcgU1RBVEUnLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gdHJ1ZVxuICAgICAgICBkZXZpYXRpb25zICs9IDFcbiAgICAgIH1cbiAgICAgIHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKCdOTyBST1VURSBUTyBURVNUJykpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZXNvbHZlKC4uLmFyZ3MpXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVqZWN0ID0gZXJyID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlamVjdChlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgYmFpbG91dCA9IG1lc3NhZ2UgPT4ge1xuICAgICAgd2hpbGUgKGNvbnN1bWVSb3V0ZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICAgIGFkZFJvdyhtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpLCBgKCR7ZXhwZWN0ZWRTdGF0ZX0pYCwgbWVzc2FnZSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBjbGVhclRpbWVvdXRBbmRSZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKG1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBpZiAobWFjaGluZS5pblN0YXRlKGZyb21TdGF0ZSkpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgfVxuXG4gICAgY29uc3QgeyByZXZva2UsIGZuIH0gPSBSZXZva2FibGUoc3RhdGUgPT4ge1xuICAgICAgYXNzZXJ0aW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RJTUVPVVQnKVxuICAgICAgfSwgdGltZW91dEluTXMpXG5cbiAgICAgIGVudGVyZWRTdGF0ZShzdGF0ZSlcbiAgICAgIGlmIChwZW5kaW5nICYmIHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgfVxuICAgICAgaWYgKGRldmlhdGlvbnMgPiBwZXJtaXR0ZWREZXZpYXRpb25zKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RPTyBNQU5ZIERFVklBVElPTlMnKVxuICAgICAgfVxuICAgICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBjbGVhclRpbWVvdXRBbmRSZXNvbHZlKGZpbmFsaXNlUmVwb3J0KCkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIgPSBtYWNoaW5lLm9uU3dpdGNoaW5nKGZuKVxuICB9KVxufVxuXG5mdW5jdGlvbiBUYWJsZSAoY29sdW1ucyA9IFtdLCBhbGlnbm1lbnRzID0gW10pIHtcbiAgY29uc3QgdGFibGUgPSBbXVxuICBjb25zdCBhbGlnbm1lbnQgPSBjb2x1bW5zLm1hcCgoXywgaW5kZXgpID0+IGFsaWdubWVudHNbaW5kZXhdIHx8ICdjZW50ZXInKVxuXG4gIGxldCBsb2NrZWQgPSBmYWxzZVxuICBmdW5jdGlvbiBsb2NrICgpIHtcbiAgICBsb2NrZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSb3cgKC4uLmFyZ3MpIHtcbiAgICBpZiAobG9ja2VkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgb2JqID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXJnc1tpbmRleF0gfHwgJydcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IHJvd1xuICAgICAgfVxuICAgIH0sIHt9KVxuICAgIHRhYmxlLnB1c2gob2JqKVxuICB9XG5cbiAgZnVuY3Rpb24gY29sU2l6ZXMgKCkge1xuICAgIHJldHVybiB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiBjb2x1bW5zLm1hcCgoY29sLCBpbmRleCkgPT4gTWF0aC5tYXgocm93W2NvbF0ubGVuZ3RoLCBhY2NbaW5kZXhdKSksIGNvbHVtbnMubWFwKCgpID0+IDApKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkTGVmdCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gc3RyICsgJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkUmlnaHQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aCkgKyBzdHJcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHNpemVzID0gY29sU2l6ZXMoKVxuICAgIGZ1bmN0aW9uIGZvcm1hdEZpZWxkICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBzaXplc1tpbmRleF1cbiAgICAgIGNvbnN0IGFsaWduID0gYWxpZ25tZW50W2luZGV4XVxuICAgICAgaWYgKGFsaWduID09PSAnbGVmdCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZExlZnQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICBpZiAoYWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZFJpZ2h0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGNvbnN0IG91dHB1dCA9IHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFJvdyA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+ICh7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IGZvcm1hdEZpZWxkKHJvd1tjb2xdLCBpbmRleClcbiAgICAgIH0pLCB7fSlcbiAgICAgIHJldHVybiBbLi4uYWNjLCBmb3JtYXR0ZWRSb3ddXG4gICAgfSwgW10pXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2NrOiBsb2NrLFxuICAgIGFkZFJvdzogYWRkUm93LFxuICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBUaW1lVGFrZW4gKCkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cbiAgZnVuY3Rpb24gZm10IChudW0sIGRpZ2l0cykge1xuICAgIHJldHVybiBudW0udG9GaXhlZChkaWdpdHMpLnJlcGxhY2UoL1xcLjArJC8sICcnKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydFRpbWVcblxuICAgIGlmIChkdXJhdGlvbiA8IDUwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbil9IG1zYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA1MDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMil9IHMgYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA2MDAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDEpfSBzIGBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAgLyA2MCwgMSl9IG0gYFxuICAgIH1cbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRVhQT1JUU1xuLy9cblxuY29uc3QgeyBTdGF0ZWJvdCwgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGFzc2VydFJvdXRlLCByb3V0ZUlzUG9zc2libGUgfSA9IHJlcXVpcmUoJy4vYXNzZXJ0aW9ucycpXG5jb25zdCB7IGRlY29tcG9zZUNoYXJ0IH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuXG4vKipcbiAqIDxpbWcgc3JjPVwiLi9sb2dvLWZ1bGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDI1NXB4OyBtYXJnaW46IDEwcHggMDtcIiAvPlxuICpcbiAqIFdyaXRlIG1vcmUgcm9idXN0IGFuZCB1bmRlcnN0YW5kYWJsZSBwcm9ncmFtcy5cbiAqXG4gKiBTdGF0ZWJvdCBob3BlcyB0byBtYWtlIFtGaW5pdGUgU3RhdGUgTWFjaGluZXNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpbml0ZS1zdGF0ZV9tYWNoaW5lKSAoRlNNcykgYSBsaXR0bGUgbW9yZSBhY2Nlc3NpYmxlLlxuICpcbiAqIFlvdSdyZSByZWFkaW5nIHRoZSBkb2N1bWVudGF0aW9uLiBPdGhlciBleGl0cyBhcmU6XG4gKlxuICogLSBUaGUgW1JFQURNRSBmaWxlXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90L2Jsb2IvbWFzdGVyL1JFQURNRS5tZClcbiAqIC0gVGhlIFtHaXRodWIgUmVwb10oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdClcbiAqIC0gVGhlIHNoZWxsLXNjcmlwdCB2ZXJzaW9uLCBbU3RhdGVib3Qtc2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3Qtc2gpXG4gKlxuICogU3RhdGVib3Qgd2FzIHdyaXR0ZW4gYnkgW0NvbmFuIFRoZW9iYWxkXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyLykgYW5kXG4gKiBpcyBbSVNDIGxpY2Vuc2VkXSguLi9MSUNFTlNFKS5cbiAqXG4gKiAjIyMgSnVtcCByaWdodCBpblxuICpcbiAqIFlvdSBjYW4gaW5zdGFsbCBTdGF0ZWJvdCBpbnRvIHlvdXIgYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBzaFxuICogbnBtIGkgc3RhdGVib3RcbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgc3RhdGVib3QgZnJvbSAnc3RhdGVib3QnXG4gKiBgYGBcbiAqXG4gKiBPciBub24tYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBqc1xuICogPHNjcmlwdCBzcmM9XCJodHRwczovL3VucGtnLmNvbS9zdGF0ZWJvdEAyLjEuMS9kaXN0L2Jyb3dzZXIvc3RhdGVib3QubWluLmpzXCI+PC9zY3JpcHQ+XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgeyBTdGF0ZWJvdCB9ID0gc3RhdGVib3RcbiAqIC8vIE1ha2UgbWFjaGluZXMgd2l0aCBTdGF0ZWJvdCgpXG4gKlxuICogY29uc3QgeyBpc1N0YXRlYm90LCByb3V0ZUlzUG9zc2libGUsIGFzc2VydFJvdXRlIH0gPSBzdGF0ZWJvdFxuICogLy8gVGhlc2UgYXJlIGFzc2VydGlvbiBoZWxwZXJzIHlvdSBjYW4gdXNlIGZvciB0ZXN0aW5nXG4gKiBgYGBcbiAqXG4gKiAjIyMgT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgOilcbiAqXG4gKiBJJ3ZlIGluY2x1ZGVkIFN0YXRlYm90IGluIHRoaXMgcGFnZS4gT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgdG9cbiAqIGZvbGxvdyBhbG9uZyB3aXRoIHRoZSBleGFtcGxlcyBiZWxvdzpcbiAqXG4gKiBgYGBqc1xuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncHJvbWlzZS1saWtlJywge1xuICogICBjaGFydDogYFxuICogICAgIC8vIFRoaXMgb25lIHdpbGwgYmVoYXZlIGEgYml0IGxpa2UgYSBQcm9taXNlXG4gKiAgICAgaWRsZSAtPiBwZW5kaW5nIC0+XG4gKiAgICAgICByZXNvbHZlZCB8IHJlamVjdGVkXG4gKlxuICogICAgIC8vIC4uLmFuZCB3ZSdyZSBkb25lXG4gKiAgICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICAgIHJlamVjdGVkIC0+IGRvbmVcbiAqICAgYCxcbiAqICAgc3RhcnRJbjogJ2lkbGUnXG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwZW5kaW5nJylcbiAqIC8vIHRydWVcbiAqXG4gKiBtYWNoaW5lLmVudGVyKCdwZW5kaW5nJylcbiAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICogLy8gW1wicmVzb2x2ZWRcIiwgXCJyZWplY3RlZFwiXVxuICogYGBgXG4gKlxuICogV2UgY2FuIGhvb2stdXAgZXZlbnRzIHdpdGgge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9OlxuICpcbiAqIGBgYGpzXG4gKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gKiAgJ3BlbmRpbmcgLT4gcmVzb2x2ZWQnOiB7XG4gKiAgICBvbjogJ2RhdGEtbG9hZGVkJ1xuICogIH0sXG4gKiAgJ3BlbmRpbmcgLT4gcmVqZWN0ZWQnOiB7XG4gKiAgICBvbjogWyd0aW1lb3V0JywgJ2RhdGEtZXJyb3InXSxcbiAqICAgIHRoZW46IChtc2cpID0+IHtcbiAqICAgICAgY29uc29sZS53YXJuKCdVaCBvaC4uLicsIG1zZylcbiAqICAgIH1cbiAqICB9LFxuICogICdyZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmUnOiB7XG4gKiAgICBvbjogJ3RoYXRzLWFsbC1mb2xrcydcbiAqICB9XG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuZW1pdCgnZGF0YS1lcnJvcicsICdEaWQgeW91IGhlYXIgdGhhdD8nKVxuICogYGBgXG4gKlxuICogSGVyZSdzIHRoZSBBUEk6XG4gKlxuICogfCBIaXRjaGVycyB8IFN0YXR1cyB8IEFjdGlvbnMgfFxuICogfC18LXwtfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudCAub25FdmVudCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jYW50cmFuc2l0aW9udG8gLmNhblRyYW5zaXRpb25UbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21zdGF0ZXNhdmFpbGFibGVmcm9taGVyZSAuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfSAvIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9udHJhbnNpdGlvbnMgLm9uVHJhbnNpdGlvbnMoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlIC5jdXJyZW50U3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtcHJldmlvdXNzdGF0ZSAucHJldmlvdXNTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21oaXN0b3J5IC5oaXN0b3J5KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSAvIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyZWQgLm9uRW50ZXJlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlIC5pblN0YXRlKCl9IC8ge0BsaW5rICNpbnN0YXRlLXN0YXRlLW91dHB1dHdoZW50cnVlLTEgLkluU3RhdGUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXQgLnJlc2V0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbmZvIC5pbmZvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWluc3BlY3QgLmluc3BlY3QoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtbmFtZSAubmFtZSgpfSB8ICB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSB8ICB8ICB8XG4gKlxuICogPGltZyBzcmM9XCIuL2xvZ28tc21hbGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDc1cHg7IG1hcmdpbjogMTVweCAwIDAgNXB4O1wiIC8+XG4gKlxuICogQG1vZHVsZSBzdGF0ZWJvdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gYG9iamVjdGAuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGVtbWluZycsIHtcbiAgICogICBjaGFydDogYFxuICAgKiAgICAgd2Fsa2luZyAtPiAoZGlnZ2luZyB8IGJ1aWxkaW5nIHwgZmFsbGluZykgLT5cbiAgICogICAgICAgd2Fsa2luZ1xuICAgKlxuICAgKiAgICAgZmFsbGluZyAtPiBzcGxhdHRpbmdcbiAgICogICAgIHdhbGtpbmcgLT4gZXhpdGluZ1xuICAgKiAgIGBcbiAgICogfSlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogIEdpdmUgeW91ciBTdGF0ZWJvdCBhIG5hbWUuIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGJ5IHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAgICogQHBhcmFtIHtzdGF0ZWJvdE9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHJldHVybnMge3N0YXRlYm90RnNtfVxuICAgKi9cbiAgU3RhdGVib3QsXG5cbiAgLyoqXG4gICAqIFRlc3RzIHRoYXQgYW4gb2JqZWN0IGlzIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIGlzU3RhdGVib3QobWFjaGluZSlcbiAgICogLy8gdHJ1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gW29iamVjdF0gVGhlIG9iamVjdCB0byB0ZXN0LlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU3RhdGVib3QsXG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGEgY2VydGFpbiByb3V0ZSBjYW4gYmUgZm9sbG93ZWQgYnkgYVxuICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAgICpcbiAgICogVGhpcyBtZXJlbHkgdGVzdHMgdGhhdCBhIGNlcnRhaW4gcGF0aCBjYW4gYmUgdGFrZW4gdGhyb3VnaCBhXG4gICAqIHN0YXRlLW1hY2hpbmUuIEl0IGRvZXNuJ3QgYXNzZXJ0IHRoYXQgdGhlIHN0YXRlcyBhcmUgbW92ZWQtdGhyb3VnaFxuICAgKiB3aGlsZSB0aGUgbWFjaGluZSBpcyB3b3JraW5nLCBhcyB3aXRoXG4gICAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gICAqICBUaGUgbWFjaGluZSB0byB0ZXN0IHRoZSByb3V0ZSBvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHJvdXRlXG4gICAqICBUaGUgcm91dGUgdG8gdGVzdCBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICAgKlxuICAgKiAgYFxuICAgKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAgICogIGBcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICAgKlxuICAgKiByb3V0ZUlzUG9zc2libGUobWFjaGluZSxcbiAgICogICAnd2Fsa2luZyAtPiBmYWxsaW5nIC0+IHNwbGF0dGluZyAtPiB3YWxraW5nJ1xuICAgKiApXG4gICAqIC8vIGZhbHNlXG4gICAqL1xuICByb3V0ZUlzUG9zc2libGUsXG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gdHJhY2VkIHRoZSByb3V0ZSBzcGVjaWZpZWQuXG4gICAqXG4gICAqIFdoZXJlYXMge0BsaW5rICNzdGF0ZWJvdHJvdXRlaXNwb3NzaWJsZXxyb3V0ZUlzUG9zc2libGUoKX0gb25seSBjaGVja3NcbiAgICogdGhhdCBhIHBhcnRpY3VsYXIgcm91dGUgY2FuIGJlIGZvbGxvd2VkLCBgYXNzZXJ0Um91dGVgIHdpbGwgaG9vay1pbnRvXG4gICAqIGEgbWFjaGluZSBhbmQgd2FpdCBmb3IgaXQgdG8gdHJhY2UgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGhpbiBhXG4gICAqIHRpbWVvdXQgcGVyaW9kLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBhc3luY1xuICAgKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gICAqICBUaGUgbWFjaGluZSB0byBydW4gdGhlIGFzc2VydGlvbiBvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGV4cGVjdGVkUm91dGVcbiAgICogIFRoZSBleHBlY3RlZCByb3V0ZSBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICAgKlxuICAgKiAgYFxuICAgKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAgICogIGBcbiAgICogQHBhcmFtIHthc3NlcnRSb3V0ZU9wdGlvbnN9IFtvcHRpb25zXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIGFzc2VydFJvdXRlKFxuICAgKiAgIG1hY2hpbmUsICdwcmVwYXJlIC0+IGRlYm91bmNlIC0+IHNlbmRpbmcgLT4gZG9uZSAtPiBpZGxlJyxcbiAgICogICB7XG4gICAqICAgICBkZXNjcmlwdGlvbjogJ0VtYWlsIHNlbnQgd2l0aCBubyBpc3N1ZXMnLFxuICAgKiAgICAgZnJvbVN0YXRlOiAnaWRsZScsXG4gICAqICAgICB0aW1lb3V0SW5NczogMTAwMCAqIDIwLFxuICAgKiAgICAgcGVybWl0dGVkRGV2aWF0aW9uczogMCxcbiAgICogICAgIGxvZ0xldmVsOiAzXG4gICAqICAgfVxuICAgKiApXG4gICAqIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdBc3NlcnRpb24gcGFzc2VkIScpKVxuICAgKiAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoYFdob29wczogJHtlcnJ9YCkpXG4gICAqXG4gICAqIG1hY2hpbmUuZW50ZXIoJ2lkbGUnKVxuICAgKi9cbiAgYXNzZXJ0Um91dGUsXG5cbiAgLyoqXG4gICAqIERlY29tcG9zZSBhIHtAbGluayBzdGF0ZWJvdENoYXJ0fSBpbnRvIGFuIG9iamVjdCBvZiBgc3RhdGVzYCwgYHJvdXRlc2AsXG4gICAqIGFuZCBgdHJhbnNpdGlvbnNgLlxuICAgKlxuICAgKiBTdGF0ZWJvdCgpIHVzZXMgdGhpcyBpbnRlcm5hbGx5IHRvIHBhcnNlIGNoYXJ0cy4gRXhwb3NlZCBmb3IgZGVidWdnaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydGBcbiAgICogICBwZW5kaW5nIC0+XG4gICAqICAgICBzdWNjZXNzIHwgZmFpbHVyZVxuICAgKiBgXG4gICAqIC8vIHN0YXRlcyA9IFsncGVuZGluZycsICdzdWNjZXNzJywgJ2ZhaWx1cmUnXVxuICAgKiAvLyByb3V0ZXMgPSBbICdwZW5kaW5nLT5zdWNjZXNzJywgJ3BlbmRpbmctPmZhaWx1cmUnXVxuICAgKiAvLyB0cmFuc2l0aW9ucyA9IFtcbiAgICogLy8gICBbJ3BlbmRpbmcnLCAnc3VjY2VzcyddLFxuICAgKiAvLyAgIFsncGVuZGluZycsICdmYWlsdXJlJ11cbiAgICogLy8gXVxuICAgKi9cbiAgZGVjb21wb3NlQ2hhcnRcbn1cbiJdLCJuYW1lcyI6WyJkb21haW4iLCJFdmVudEhhbmRsZXJzIiwicHJvdG90eXBlIiwiT2JqZWN0IiwiY3JlYXRlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsImNhbGwiLCJ1c2luZ0RvbWFpbnMiLCJ1bmRlZmluZWQiLCJfZXZlbnRzIiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJhY3RpdmUiLCJnZXRQcm90b3R5cGVPZiIsIl9ldmVudHNDb3VudCIsInNldE1heExpc3RlbmVycyIsIm4iLCJpc05hTiIsIlR5cGVFcnJvciIsIiRnZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiZ2V0TWF4TGlzdGVuZXJzIiwiZW1pdE5vbmUiLCJoYW5kbGVyIiwiaXNGbiIsInNlbGYiLCJsZW4iLCJsZW5ndGgiLCJsaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwiaSIsImVtaXRPbmUiLCJhcmcxIiwiZW1pdFR3byIsImFyZzIiLCJlbWl0VGhyZWUiLCJhcmczIiwiZW1pdE1hbnkiLCJhcmdzIiwiYXBwbHkiLCJlbWl0IiwidHlwZSIsImVyIiwiZXZlbnRzIiwiZG9FcnJvciIsImVycm9yIiwiYXJndW1lbnRzIiwiRXJyb3IiLCJkb21haW5FbWl0dGVyIiwiZG9tYWluVGhyb3duIiwiZXJyIiwiY29udGV4dCIsIkFycmF5IiwiX2FkZExpc3RlbmVyIiwidGFyZ2V0IiwibGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0IiwicHVzaCIsIndhcm5lZCIsInciLCJuYW1lIiwiZW1pdHRlciIsImNvdW50IiwiZW1pdFdhcm5pbmciLCJlIiwiY29uc29sZSIsIndhcm4iLCJsb2ciLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwiX29uY2VXcmFwIiwiZmlyZWQiLCJnIiwicmVtb3ZlTGlzdGVuZXIiLCJvbmNlIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImxpc3QiLCJwb3NpdGlvbiIsIm9yaWdpbmFsTGlzdGVuZXIiLCJzcGxpY2VPbmUiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiZXZsaXN0ZW5lciIsInJldCIsInVud3JhcExpc3RlbmVycyIsImxpc3RlbmVyQ291bnQiLCJldmVudE5hbWVzIiwiUmVmbGVjdCIsIm93bktleXMiLCJpbmRleCIsImsiLCJwb3AiLCJhcnIiLCJjb3B5IiwiaXNBcnJheSIsImlzRXZlbnRFbWl0dGVyIiwiaXNGdW5jdGlvbiIsImlzUG9qbyIsImlzU3RyaW5nIiwiaXNUZW1wbGF0ZUxpdGVyYWwiLCJ1bmlxIiwiRGVmZXIiLCJPbmNlIiwiUmV2b2thYmxlIiwiUmVmZXJlbmNlQ291bnRlciIsIkFyZ1R5cGVFcnJvciIsIkxvZ2dlciIsIm9iaiIsImlzT2JqZWN0IiwiZXZlcnkiLCJpdGVtIiwiaW5wdXQiLCJyZWR1Y2UiLCJhY2MiLCJvbmUiLCJpbmRleE9mIiwiZGVmZXIiLCJmbiIsInRpbWVyIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInJldm9rZSIsIl9mbiIsInJlc3VsdCIsInJldm9rZWQiLCJraW5kIiwiZGVzY3JpcHRpb24iLCJfcmVmcyIsImV4cGVjdGluZyIsImZsYXQiLCJmb3JFYWNoIiwicmVmIiwiaW5jcmVhc2UiLCJjb3VudE9mIiwiZGVjcmVhc2UiLCJNYXRoIiwibWF4IiwicmVmcyIsInRhYmxlIiwic29ydCIsIm1hcCIsInRvVmFsdWUiLCJlcnJQcmVmaXgiLCJmbk5hbWUiLCJ0eXBlTWFwIiwiYXJnTWFwIiwiZW50cmllcyIsImFyZ05hbWUiLCJhcmdUeXBlIiwic2lnbmF0dXJlIiwiam9pbiIsImFyZyIsImVycm9yRGVzYyIsInR5cGVOYW1lIiwidHlwZU1hdGNoZXMiLCJmaWx0ZXIiLCJCb29sZWFuIiwibGV2ZWwiLCJfbGV2ZWwiLCJpbmZvIiwibm9uZSIsImNhbldhcm4iLCJjYW5Mb2ciLCJjYW5JbmZvIiwicnhDUkxGIiwiY3hQaXBlIiwiY3hBcnJvdyIsInJ4T3BlcmF0b3JzIiwicnhVbnNhZmUiLCJyZXBsYWNlIiwicnhMaW5lQ29udGluYXRpb25zIiwiUmVnRXhwIiwicnhEaXNhbGxvd2VkQ2hhcmFjdGVycyIsInJ4Q29tbWVudCIsImRlY29tcG9zZUNoYXJ0IiwiZGVjb21wb3NlUm91dGUiLCJyZXF1aXJlJCQwIiwiYXJnVHlwZUVycm9yIiwidGVtcGxhdGVMaXRlcmFsIiwibGluZXMiLCJjb25kZW5zZWRMaW5lcyIsImZsYXR0ZW5lZFJvdXRlIiwidG9rZW5pc2VkTGluZXMiLCJsaW5lc09mVG9rZW5zIiwibGluZXNPZlJvdXRlcyIsImRlY29tcG9zZVJvdXRlRnJvbVRva2VucyIsImxpbmVzT2ZUcmFuc2l0aW9ucyIsImRlY29tcG9zZVRyYW5zaXRpb25zRnJvbVJvdXRlIiwic3RhdGVzIiwicm91dGVLZXlzIiwicm91dGUiLCJmaWx0ZXJlZFJvdXRlcyIsImZpbHRlcmVkU3RhdGVzIiwidHJhbnNpdGlvbnMiLCJzcGxpdCIsInJvdXRlcyIsImxpbmVzRnJvbSIsInN0ck9yQXJyIiwibGluZSIsIm91dHB1dCIsImNvbmRlbnNlZExpbmUiLCJzYW5pdGlzZWRMaW5lIiwidGVzdCIsInN0ciIsInByZXZpb3VzU3RhdGVzIiwiZnJvbVN0YXRlcyIsInRvU3RhdGVzIiwiZnJvbVN0YXRlIiwidG9TdGF0ZSIsIlN0YXRlYm90IiwiaXNTdGF0ZWJvdCIsInJlcXVpcmUkJDEiLCJvcHRpb25zIiwibG9nUHJlZml4IiwiY2hhcnQiLCJsb2dMZXZlbCIsImhpc3RvcnlMaW1pdCIsInN0YXJ0SW4iLCJpbmNsdWRlcyIsInRyYW5zaXRpb25JZCIsInN0YXRlSGlzdG9yeSIsInN0YXRlSGlzdG9yeUxpbWl0IiwiaW50ZXJuYWxFdmVudHMiLCJJTlRFUk5BTF9FVkVOVFMiLCJvblN3aXRjaGluZyIsIm9uU3dpdGNoZWQiLCJlbWl0SW50ZXJuYWxFdmVudCIsImV2ZW50TmFtZSIsIm9uSW50ZXJuYWxFdmVudCIsInN0YXRlc0hhbmRsZWQiLCJyb3V0ZXNIYW5kbGVkIiwiZXZlbnRzSGFuZGxlZCIsImFwcGx5SGl0Y2hlciIsImhpdGNoZXIiLCJoaXRjaGVyQWN0aW9ucyIsImVudGVyIiwiRW50ZXIiLCJFbWl0Iiwicm91dGVDaGFydCIsImFjdGlvbk9yQ29uZmlnIiwiYWN0aW9uIiwiX29uIiwiX3RoZW4iLCJ0aGVuIiwiYWxsU3RhdGVzIiwiYWxsUm91dGVzIiwiZGVjb21wb3NlZEV2ZW50cyIsIl9jb25maWdzIiwiZGVjb21wb3NlQ29uZmlncyIsImNvbmZpZ3MiLCJhbGxDbGVhbnVwRm5zIiwib25FdmVudCIsImV2ZW50V2FzSGFuZGxlZCIsInNvbWUiLCJwYXNzZWQiLCJpblN0YXRlIiwidHJhbnNpdGlvbk5vT3AiLCJ0cmFuc2l0aW9uQ29uZmlncyIsInRyYW5zaXRpb24iLCJpbnZhbGlkU3RhdGVzIiwic3RhdGUiLCJpbnZhbGlkUm91dGVzIiwicHJldmlvdXNTdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImNhblRyYW5zaXRpb25UbyIsInRlc3RTdGF0ZXMiLCJuZXh0U3RhdGVzIiwic3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUiLCJfc3RhdGUiLCJ0cmltIiwiYW55T3JGbiIsImNvbmRpdGlvbk1hdGNoZXMiLCJmbkFyZ3MiLCJuZXh0Um91dGUiLCJzaGlmdCIsImNiIiwic3dpdGNoTWV0aG9kcyIsIm1ldGhvZE5hbWUiLCJkZWNyZWFzZVJlZkNvdW50IiwicmVtb3ZlRXZlbnQiLCJlbnRlckV4aXRNZXRob2RzIiwibmFtZXMiLCJzd2l0Y2hNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsImRlY3JlYXNlUmVmQ291bnRzIiwiSW5TdGF0ZSIsInJlc2V0IiwibWVzc2FnZSIsImxhc3RTdGF0ZSIsInByZXZSb3V0ZSIsImF2YWlsYWJsZVN0YXRlcyIsImluc3BlY3QiLCJsb2dSZWZDb3VudGVySW5mbyIsInJlZkNvdW50ZXIiLCJfX1NUQVRFQk9UX18iLCJoaXN0b3J5Iiwib25FbnRlcmVkIiwib25FbnRlcmluZyIsIm9uRXhpdGVkIiwib25FeGl0aW5nIiwib25UcmFuc2l0aW9ucyIsInBlcmZvcm1UcmFuc2l0aW9ucyIsIm1hY2hpbmUiLCJjb25maWciLCJyb3V0ZUlzUG9zc2libGUiLCJhc3NlcnRSb3V0ZSIsInJlcXVpcmUkJDIiLCJleHBlY3RlZFJvdXRlIiwibmV4dFN0YXRlIiwicGFzc2VzIiwiYXNzZXJ0aW9uSWQiLCJydW4iLCJwZXJtaXR0ZWREZXZpYXRpb25zIiwidGltZW91dEluTXMiLCJwcmVmaXgiLCJmcm9tU3RhdGVBY3Rpb25GbiIsInJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuIiwidG90YWxUaW1lVGFrZW4iLCJUaW1lVGFrZW4iLCJzdGF0ZVRpbWVUYWtlbiIsImFzc2VydGlvblRpbWVvdXRUaW1lciIsImRldmlhdGlvbnMiLCJwZW5kaW5nIiwidW5leHBlY3RlZCIsImNvbnN1bWVSb3V0ZSIsInJlcG9ydCIsIlRhYmxlIiwiZmluYWxpc2VSZXBvcnQiLCJhZGRSb3ciLCJsb2NrIiwiY29udGVudCIsImVudGVyZWRTdGF0ZSIsImV4cGVjdGVkU3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNsZWFyVGltZW91dEFuZFJlc29sdmUiLCJyZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyIiwiY2xlYXJUaW1lb3V0QW5kUmVqZWN0IiwiYmFpbG91dCIsImNvbHVtbnMiLCJhbGlnbm1lbnRzIiwiYWxpZ25tZW50IiwiXyIsImxvY2tlZCIsImNvbCIsInJvdyIsImNvbFNpemVzIiwicGFkTGVmdCIsInJlcGVhdCIsInBhZFJpZ2h0Iiwic2l6ZXMiLCJmb3JtYXRGaWVsZCIsInZhbHVlIiwic2l6ZSIsImFsaWduIiwiZm9ybWF0dGVkUm93Iiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImZtdCIsIm51bSIsImRpZ2l0cyIsInRvRml4ZWQiLCJkdXJhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUVBLElBQUlBLE1BQUo7O0VBS0EsU0FBU0MsYUFBVCxHQUF5Qjs7RUFDekJBLGFBQWEsQ0FBQ0MsU0FBZCxHQUEwQkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUExQjs7RUFFQSxTQUFTQyxZQUFULEdBQXdCO0VBQ3RCQSxFQUFBQSxZQUFZLENBQUNDLElBQWIsQ0FBa0JDLElBQWxCLENBQXVCLElBQXZCO0VBQ0Q7RUFNREYsWUFBWSxDQUFDQSxZQUFiLEdBQTRCQSxZQUE1QjtFQUVBQSxZQUFZLENBQUNHLFlBQWIsR0FBNEIsS0FBNUI7RUFFQUgsWUFBWSxDQUFDSCxTQUFiLENBQXVCRixNQUF2QixHQUFnQ1MsU0FBaEM7RUFDQUosWUFBWSxDQUFDSCxTQUFiLENBQXVCUSxPQUF2QixHQUFpQ0QsU0FBakM7RUFDQUosWUFBWSxDQUFDSCxTQUFiLENBQXVCUyxhQUF2QixHQUF1Q0YsU0FBdkM7RUFJQUosWUFBWSxDQUFDTyxtQkFB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
