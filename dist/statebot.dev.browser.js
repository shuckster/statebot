(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["statebot"] = factory();
	else
		root["statebot"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/.pnpm/registry.npmjs.org/events/3.1.0/node_modules/events/events.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmjs.org/events/3.1.0/node_modules/events/events.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./src/assertions.js":
/*!***************************!*\
  !*** ./src/assertions.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
// STATEBOT ASSERTION HELPERS
//
module.exports = {
  routeIsPossible: routeIsPossible,
  assertRoute: assertRoute
};

var _require = __webpack_require__(/*! ./statebot */ "./src/statebot.js"),
    isStatebot = _require.isStatebot;

var _require2 = __webpack_require__(/*! ./parsing */ "./src/parsing.js"),
    decomposeRoute = _require2.decomposeRoute;

var _require3 = __webpack_require__(/*! ./utils */ "./src/utils.js"),
    Defer = _require3.Defer,
    Once = _require3.Once,
    Revokable = _require3.Revokable,
    Logger = _require3.Logger,
    ArgTypeError = _require3.ArgTypeError,
    isTemplateLiteral = _require3.isTemplateLiteral;

var argTypeError = ArgTypeError('statebot.');

function routeIsPossible(machine, expectedRoute) {
  var err = argTypeError('routeIsPossible', {
    machine: isStatebot,
    expectedRoute: isTemplateLiteral
  }, machine, expectedRoute);

  if (err) {
    throw TypeError(err);
  }

  var route = decomposeRoute(expectedRoute);
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
      return _objectSpread({}, acc, _defineProperty({}, col, row));
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
        return _objectSpread({}, acc, _defineProperty({}, col, formatField(row[col], index)));
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./statebot */ "./src/statebot.js"),
    Statebot = _require.Statebot,
    isStatebot = _require.isStatebot;

var _require2 = __webpack_require__(/*! ./assertions */ "./src/assertions.js"),
    assertRoute = _require2.assertRoute,
    routeIsPossible = _require2.routeIsPossible;

var _require3 = __webpack_require__(/*! ./parsing */ "./src/parsing.js"),
    decomposeChart = _require3.decomposeChart;
/**
 * <img src="./logo-full.png" style="max-width: 255px; margin: 10px 0;" />
 *
 * Write more robust and understandable programs.
 *
 * Statebot hopes to make [Finite State Machines](https://en.wikipedia.org/wiki/Finite-state_machine) (FSMs) a little more accessible.
 *
 * You're reading the documentation. Other exits are:
 *
 * - [The README file](../README.md)
 * - [The Github Repo](https://github.com/shuckster/statebot)
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
 * <script src="https://unpkg.com/shuckster/dist/statebot.min.browser.js"></script>
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


module.exports = {
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
  Statebot: Statebot,

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
  isStatebot: isStatebot,

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
  routeIsPossible: routeIsPossible,

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
  assertRoute: assertRoute,

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
  decomposeChart: decomposeChart
};

/***/ }),

/***/ "./src/parsing.js":
/*!************************!*\
  !*** ./src/parsing.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
// STATEBOT CHART/ROUTE PARSING
//
var cxPipe = '|';
var cxArrow = '->';
var rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:\-_+=<>|~\\.§]/gi;
var rxCRLF = /[\r\n]/;
var rxComment = /(\/\/[^\n\r]*)/;
var rxOperators = [cxPipe, cxArrow].map(function (rxUnsafe) {
  return rxUnsafe.replace('|', '\\|');
}).join('|');
var rxLineContinations = new RegExp("(".concat(rxOperators, ")$"));
module.exports = {
  cxPipe: cxPipe,
  cxArrow: cxArrow,
  rxDisallowedCharacters: rxDisallowedCharacters,
  decomposeChart: decomposeChart,
  decomposeRoute: decomposeRoute
};

var _require = __webpack_require__(/*! ./utils */ "./src/utils.js"),
    uniq = _require.uniq,
    ArgTypeError = _require.ArgTypeError,
    isTemplateLiteral = _require.isTemplateLiteral;

var argTypeError = ArgTypeError('statebot.');

function decomposeRoute(templateLiteral) {
  var err = argTypeError('decomposeRoute', {
    templateLiteral: isTemplateLiteral
  }, templateLiteral);

  if (err) {
    throw TypeError(err);
  }

  var rawLines = [templateLiteral].flat();
  var codeOnly = removeComments(rawLines);
  var lines = condenseLines(codeOnly);
  var flattenedRoute = sanitiseLines(lines).flat(2);
  return flattenedRoute;
}

function decomposeChart(templateLiteral) {
  var err = argTypeError('decomposeChart', {
    templateLiteral: isTemplateLiteral
  }, templateLiteral);

  if (err) {
    throw TypeError(err);
  }

  var rawLines = [templateLiteral].flat();
  var codeOnly = removeComments(rawLines);
  var lines = condenseLines(codeOnly);
  var linesToProcess = sanitiseLines(lines);
  var linesOfRoutes = linesToProcess.map(decomposeLinesIntoRoutes).flat(1);
  var linesOfTransitions = linesOfRoutes.map(decomposeRoutesIntoTransitions).flat(1);
  var states = [];
  var routeKeys = linesOfTransitions.map(function (route) {
    states.push.apply(states, _toConsumableArray(route));
    return route.join(cxArrow);
  });
  var filteredRoutes = uniq(routeKeys);
  var filteredStates = uniq(states);
  return {
    transitions: filteredRoutes.map(function (route) {
      return route.split(cxArrow);
    }),
    routes: filteredRoutes,
    states: filteredStates
  };
}

function removeComments(arrayOfStrings) {
  return arrayOfStrings.reduce(function (acc, string) {
    if (typeof string !== 'string') {
      return acc;
    }

    return [].concat(_toConsumableArray(acc), _toConsumableArray(string.split(rxCRLF).map(function (part) {
      return part.replace(rxComment, '');
    })));
  }, []).filter(Boolean);
}

function condenseLines(lines) {
  return lines.reduce(function (acc, line) {
    return rxLineContinations.test(line.trim()) ? {
      lines: acc.lines,
      currentLine: acc.currentLine + line
    } : {
      lines: [].concat(_toConsumableArray(acc.lines), [acc.currentLine + line]),
      currentLine: ''
    };
  }, {
    lines: [],
    currentLine: ''
  }).lines;
}

function sanitiseLines(lines) {
  return lines.map(function (line) {
    return line.split(cxArrow).map(function (str) {
      return str.replace(rxDisallowedCharacters, '').split(cxPipe).map(function (part) {
        return part.trim();
      });
    });
  });
}

function decomposeLinesIntoRoutes(input) {
  return input.reduce(function (acc, states) {
    return acc === false ? {
      previousStates: _toConsumableArray(states),
      pairs: []
    } : {
      previousStates: _toConsumableArray(states),
      pairs: [].concat(_toConsumableArray(acc.pairs), [[_toConsumableArray(acc.previousStates), _toConsumableArray(states)]])
    };
  }, false).pairs;
}

function decomposeRoutesIntoTransitions(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      fromStates = _ref2[0],
      toStates = _ref2[1];

  return fromStates.reduce(function (acc, fromState) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(toStates.map(function (toState) {
      return [fromState, toState];
    })));
  }, []);
}

/***/ }),

/***/ "./src/statebot.js":
/*!*************************!*\
  !*** ./src/statebot.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
// STATEBOT FSM
//
module.exports = {
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
// https://www.npmjs.com/package/events

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/.pnpm/registry.npmjs.org/events/3.1.0/node_modules/events/events.js");

var _require = __webpack_require__(/*! ./utils */ "./src/utils.js"),
    isPojo = _require.isPojo,
    ArgTypeError = _require.ArgTypeError,
    Logger = _require.Logger,
    isEventEmitter = _require.isEventEmitter,
    ReferenceCounter = _require.ReferenceCounter;

var _require2 = __webpack_require__(/*! ./parsing */ "./src/parsing.js"),
    decomposeChart = _require2.decomposeChart,
    cxArrow = _require2.cxArrow;

function Statebot(_name, options) {
  if (typeof _name !== 'string') {
    throw TypeError('\nStatebot: Please specify a name for this machine');
  }

  var logPrefix = "Statebot[".concat(_name, "]");

  if (!isPojo(options)) {
    throw TypeError("\n".concat(logPrefix, ": Please specify options for this machine"));
  }

  var _ref = options || {},
      _ref$chart = _ref.chart,
      chart = _ref$chart === void 0 ? undefined : _ref$chart,
      _ref$logLevel = _ref.logLevel,
      logLevel = _ref$logLevel === void 0 ? 3 : _ref$logLevel,
      _ref$historyLimit = _ref.historyLimit,
      historyLimit = _ref$historyLimit === void 0 ? 2 : _ref$historyLimit;

  var argTypeError = ArgTypeError("".concat(logPrefix, "#"));
  var console = Logger(logLevel);
  var canWarn = console.canWarn;

  var _ref2 = chart ? decomposeChart(chart) : options,
      _ref2$states = _ref2.states,
      states = _ref2$states === void 0 ? [] : _ref2$states,
      _ref2$routes = _ref2.routes,
      routes = _ref2$routes === void 0 ? [] : _ref2$routes;

  var startIn = options.startIn;

  if (startIn === undefined) {
    startIn = states[0];
  }

  if (!states.includes(startIn)) {
    throw Error("".concat(logPrefix, ": Starting-state not in chart: \"").concat(startIn, "\""));
  }

  var transitionId = 0;
  var stateHistory = [startIn];
  var stateHistoryLimit = Math.max(historyLimit, 2);
  var events = isEventEmitter(options.events) ? options.events : new EventEmitter();
  var internalEvents = new EventEmitter();
  var INTERNAL_EVENTS = {
    STATE_CHANGING: '(ANY)state:changing',
    STATE_CHANGED: '(ANY)state:changed'
  };

  function emitInternalEvent(eventName) {
    var err = argTypeError('emitInternalEvent', {
      eventName: 'string'
    }, eventName);

    if (err) {
      throw TypeError(err);
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return internalEvents.emit.apply(internalEvents, [eventName].concat(args));
  }

  function onInternalEvent(eventName, fn) {
    var err = argTypeError('onInternalEvent', {
      eventName: 'string',
      fn: 'function'
    }, eventName, fn);

    if (err) {
      throw TypeError(err);
    }

    internalEvents.addListener(eventName, fn);
    return function () {
      internalEvents.removeListener(eventName, fn);
    };
  }

  var statesHandled = ReferenceCounter(_name, 'states', 'Listening for the following state-changes', _toConsumableArray(states));
  var routesHandled = ReferenceCounter(_name, 'transitions', 'Listening for the following transitions', _toConsumableArray(routes));
  var eventsHandled = ReferenceCounter(_name, 'events', 'Listening for the following events'); // Interprets onTransitions() and performTransitions()

  function applyHitcher(hitcher, fnName) {
    var hitcherActions = typeof hitcher === 'function' ? hitcher({
      enter: enter,
      emit: emit,
      Enter: Enter,
      Emit: Emit
    }) : isPojo(hitcher) ? hitcher : null;

    if (!isPojo(hitcherActions)) {
      throw TypeError("Statebot[".concat(_name, "]#").concat(fnName, "(): Expected an object, or a function that returns an object"));
    }

    var events = {};
    var transitions = [];
    Object.entries(hitcherActions).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          routeChart = _ref4[0],
          actionOrConfig = _ref4[1];

      // onTransitions 1/3...
      if (typeof actionOrConfig === 'function') {
        transitions.push({
          routeChart: routeChart,
          action: actionOrConfig
        });
      } else if (!isPojo(actionOrConfig)) {
        return;
      } // performTransitions 1/3...


      var _on = actionOrConfig.on,
          _then = actionOrConfig.then;

      if (typeof _on === 'string' || Array.isArray(_on)) {
        var eventNames = [_on].flat();
        eventNames.forEach(function (eventName) {
          events[eventName] = events[eventName] || [];
          events[eventName].push({
            routeChart: routeChart,
            action: _then
          });
        });
      } else if (typeof _then === 'function') {
        // onTransitions 2/3...
        // (Behave like onTransitions if a config is specified, but
        //  there is no "on" event...)
        transitions.push({
          routeChart: routeChart,
          action: actionOrConfig
        });
      }
    });
    var allStates = [];
    var allRoutes = []; // performTransitions 2/3...

    var decomposedEvents = Object.entries(events).reduce(function (acc, _ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          eventName = _ref6[0],
          _configs = _ref6[1];

      var _decomposeConfigs = decomposeConfigs(_configs),
          states = _decomposeConfigs.states,
          routes = _decomposeConfigs.routes,
          configs = _decomposeConfigs.configs;

      if (canWarn()) {
        allStates.push.apply(allStates, _toConsumableArray(states));
        allRoutes.push.apply(allRoutes, _toConsumableArray(routes));
      }

      return _objectSpread({}, acc, _defineProperty({}, eventName, configs));
    }, {});
    var allCleanupFns = []; // performTransitions 3/3...

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

            if (typeof action === 'function') {
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
    }).flat())); // onTransitions 3/3...

    var transitionConfigs = decomposeConfigs(transitions);

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
    }).flat())); // Debugging, if we're at the right level

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

  function decomposeConfigs(configs) {
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

  function previousState() {
    return stateHistory[stateHistory.length - 2];
  }

  function currentState() {
    return stateHistory[stateHistory.length - 1];
  }

  function inState(state, anyOrFn) {
    var err = argTypeError('inState', {
      state: 'string'
    }, state);

    if (err) {
      throw TypeError(err);
    }

    var conditionMatches = currentState() === state;

    if (anyOrFn !== undefined) {
      if (!conditionMatches) {
        return null;
      }

      if (typeof anyOrFn === 'function') {
        for (var _len3 = arguments.length, fnArgs = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          fnArgs[_key3 - 2] = arguments[_key3];
        }

        return anyOrFn.apply(void 0, fnArgs);
      }

      return anyOrFn;
    }

    return conditionMatches;
  }

  function InState(state, anyOrFn) {
    var err = argTypeError('InState', {
      state: 'string'
    }, state);

    if (err) {
      throw TypeError(err);
    }

    return function () {
      for (var _len4 = arguments.length, fnArgs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        fnArgs[_key4] = arguments[_key4];
      }

      return inState.apply(void 0, [state, anyOrFn].concat(fnArgs));
    };
  }

  function canTransitionTo() {
    for (var _len5 = arguments.length, states = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      states[_key5] = arguments[_key5];
    }

    var testStates = states.flat();
    var err = argTypeError('canTransitionTo', {
      state: 'string'
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
      state: 'string'
    }, _state);

    if (err) {
      throw TypeError(err);
    }

    return routes.reduce(function (acc, route) {
      var _route$split$map = route.split(cxArrow).map(function (state) {
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

  function Emit(eventName) {
    var err = argTypeError('Emit', {
      eventName: 'string'
    }, eventName);

    if (err) {
      throw TypeError(err);
    }

    return function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return emit.apply(void 0, [eventName].concat(args));
    };
  }

  function emit(eventName) {
    var err = argTypeError('emit', {
      eventName: 'string'
    }, eventName);

    if (err) {
      throw TypeError(err);
    }

    for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    return events.emit.apply(events, [eventName].concat(args));
  }

  function Enter(state) {
    var err = argTypeError('Enter', {
      state: 'string'
    }, state);

    if (err) {
      throw TypeError(err);
    }

    return function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return enter.apply(void 0, [state].concat(args));
    };
  }

  function enter(state) {
    var err = argTypeError('enter', {
      state: 'string'
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
    } // Fell-through, can enter next state


    console.info("".concat(logPrefix, ": tId<").concat(++transitionId, ">: ").concat(nextRoute));
    stateHistory.push(toState);

    if (stateHistory.length > stateHistoryLimit) {
      stateHistory.shift();
    }

    for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    emitInternalEvent.apply(void 0, [INTERNAL_EVENTS.STATE_CHANGING, toState, inState].concat(args));
    emitInternalEvent.apply(void 0, [nextRoute].concat(args));
    emitInternalEvent.apply(void 0, [INTERNAL_EVENTS.STATE_CHANGED, toState, inState].concat(args));
    return true;
  }

  function onEvent(eventName, cb) {
    var err = argTypeError('onEvent', {
      eventName: 'string',
      cb: 'function'
    }, eventName, cb);

    if (err) {
      throw TypeError(err);
    }

    events.addListener(eventName, cb);
    return function () {
      events.removeListener(eventName, cb);
    };
  }

  function onSwitching(cb) {
    var err = argTypeError('onSwitching', {
      cb: 'function'
    }, cb);

    if (err) {
      throw TypeError(err);
    }

    var decreaseRefCount = statesHandled.increase(INTERNAL_EVENTS.STATE_CHANGING);
    var removeEvent = onInternalEvent(INTERNAL_EVENTS.STATE_CHANGING, function (toState, fromState) {
      for (var _len10 = arguments.length, args = new Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
        args[_key10 - 2] = arguments[_key10];
      }

      cb.apply(void 0, [toState, fromState].concat(args));
    });
    return function () {
      removeEvent();
      decreaseRefCount();
    };
  }

  function onSwitched(cb) {
    var err = argTypeError('onSwitched', {
      cb: 'function'
    }, cb);

    if (err) {
      throw TypeError(err);
    }

    var decreaseRefCount = statesHandled.increase(INTERNAL_EVENTS.STATE_CHANGED);
    var removeEvent = onInternalEvent(INTERNAL_EVENTS.STATE_CHANGED, function (toState, fromState) {
      for (var _len11 = arguments.length, args = new Array(_len11 > 2 ? _len11 - 2 : 0), _key11 = 2; _key11 < _len11; _key11++) {
        args[_key11 - 2] = arguments[_key11];
      }

      cb.apply(void 0, [toState, fromState].concat(args));
    });
    return function () {
      removeEvent();
      decreaseRefCount();
    };
  }

  function onExiting(state, cb) {
    var err = argTypeError('onExiting', {
      state: 'string',
      cb: 'function'
    }, state, cb);

    if (err) {
      throw TypeError(err);
    }

    var decreaseRefCounts = [statesHandled.increase(state), statesHandled.increase("".concat(state, ":exiting"))];
    var removeEvent = onSwitching(function (toState, fromState) {
      if (state === fromState) {
        for (var _len12 = arguments.length, args = new Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2; _key12 < _len12; _key12++) {
          args[_key12 - 2] = arguments[_key12];
        }

        cb.apply(void 0, [toState].concat(args));
      }
    });
    return function () {
      removeEvent();
      decreaseRefCounts.map(function (fn) {
        return fn();
      });
    };
  }

  function onExited(state, cb) {
    var err = argTypeError('onExited', {
      state: 'string',
      cb: 'function'
    }, state, cb);

    if (err) {
      throw TypeError(err);
    }

    var decreaseRefCounts = [statesHandled.increase(state), statesHandled.increase("".concat(state, ":exited"))];
    var removeEvent = onSwitched(function (toState, fromState) {
      if (state === fromState) {
        for (var _len13 = arguments.length, args = new Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _key13 < _len13; _key13++) {
          args[_key13 - 2] = arguments[_key13];
        }

        cb.apply(void 0, [toState].concat(args));
      }
    });
    return function () {
      removeEvent();
      decreaseRefCounts.map(function (fn) {
        return fn();
      });
    };
  }

  function onEntering(state, cb) {
    var err = argTypeError('onEntering', {
      state: 'string',
      cb: 'function'
    }, state, cb);

    if (err) {
      throw TypeError(err);
    }

    var decreaseRefCounts = [statesHandled.increase(state), statesHandled.increase("".concat(state, ":entering"))];
    var removeEvent = onSwitching(function (toState, fromState) {
      if (state === toState) {
        for (var _len14 = arguments.length, args = new Array(_len14 > 2 ? _len14 - 2 : 0), _key14 = 2; _key14 < _len14; _key14++) {
          args[_key14 - 2] = arguments[_key14];
        }

        cb.apply(void 0, [fromState].concat(args));
      }
    });
    return function () {
      removeEvent();
      decreaseRefCounts.map(function (fn) {
        return fn();
      });
    };
  }

  function onEntered(state, cb) {
    var err = argTypeError('onEntered', {
      state: 'string',
      cb: 'function'
    }, state, cb);

    if (err) {
      throw TypeError(err);
    }

    var decreaseRefCounts = [statesHandled.increase(state), statesHandled.increase("".concat(state, ":entered"))];
    var removeEvent = onSwitched(function (toState, fromState) {
      if (state === toState) {
        for (var _len15 = arguments.length, args = new Array(_len15 > 2 ? _len15 - 2 : 0), _key15 = 2; _key15 < _len15; _key15++) {
          args[_key15 - 2] = arguments[_key15];
        }

        cb.apply(void 0, [fromState].concat(args));
      }
    });
    return function () {
      removeEvent();
      decreaseRefCounts.map(function (fn) {
        return fn();
      });
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
    // For identifying Statebot objects
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
     * var machine = Statebot('button', {
     *   chart: `
     *     idle -> clicked
     *   `
     * })
     *
     * machine.currentState()
     * // "idle"
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
    onEntered: onEntered,

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
    onEntering: onEntering,

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
    onExited: onExited,

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
    onExiting: onExiting,

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
    onSwitched: onSwitched,

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
    onSwitching: onSwitching,

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
  return isPojo(machine) && typeof machine.__STATEBOT__ === 'number';
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//
// STATEBOT UTILS
//
module.exports = {
  isEventEmitter: isEventEmitter,
  isPojo: isPojo,
  isTemplateLiteral: isTemplateLiteral,
  uniq: uniq,
  Defer: Defer,
  Once: Once,
  Revokable: Revokable,
  ReferenceCounter: ReferenceCounter,
  ArgTypeError: ArgTypeError,
  Logger: Logger
};

function isEventEmitter(obj) {
  return _typeof(obj) === 'object' && typeof obj.emit === 'function' && typeof obj.addListener === 'function' && typeof obj.removeListener === 'function';
}

function isPojo(obj) {
  if (obj === null || _typeof(obj) !== 'object') {
    return false;
  }

  return Object.getPrototypeOf(obj) === Object.prototype;
}

function isTemplateLiteral(obj) {
  if (typeof obj === 'string') {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.every(function (item) {
      return typeof item === 'string';
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
    return _objectSpread({}, _refs);
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

      if (typeof argType === 'function') {
        typeMatches = argType(arg) === true;
        typeName = argType.name;
        errorDesc = "".concat(typeName, "(").concat(argName, ") did not return true");
      } else {
        // eslint-disable-next-line valid-typeof
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

  if (typeof _level === 'string') {
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

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0ZWJvdC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vc3RhdGVib3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9ub2RlX21vZHVsZXMvLnBucG0vcmVnaXN0cnkubnBtanMub3JnL2V2ZW50cy8zLjEuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL3BhcnNpbmcuanMiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvc3RhdGVib3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJvdXRlSXNQb3NzaWJsZSIsImFzc2VydFJvdXRlIiwicmVxdWlyZSIsImlzU3RhdGVib3QiLCJkZWNvbXBvc2VSb3V0ZSIsIkRlZmVyIiwiT25jZSIsIlJldm9rYWJsZSIsIkxvZ2dlciIsIkFyZ1R5cGVFcnJvciIsImlzVGVtcGxhdGVMaXRlcmFsIiwiYXJnVHlwZUVycm9yIiwibWFjaGluZSIsImV4cGVjdGVkUm91dGUiLCJlcnIiLCJUeXBlRXJyb3IiLCJyb3V0ZSIsImV2ZXJ5Iiwic3RhdGUiLCJpbmRleCIsImxlbmd0aCIsIm5leHRTdGF0ZSIsImF2YWlsYWJsZVN0YXRlcyIsInN0YXRlc0F2YWlsYWJsZUZyb21IZXJlIiwicGFzc2VzIiwiaW5jbHVkZXMiLCJhc3NlcnRpb25JZCIsIm9wdGlvbnMiLCJkZXNjcmlwdGlvbiIsImZyb21TdGF0ZSIsInJ1biIsInBlcm1pdHRlZERldmlhdGlvbnMiLCJ0aW1lb3V0SW5NcyIsImxvZ0xldmVsIiwiY29uc29sZSIsInByZWZpeCIsIm5hbWUiLCJsb2ciLCJqb2luIiwiZnJvbVN0YXRlQWN0aW9uRm4iLCJyZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiIsInRvdGFsVGltZVRha2VuIiwiVGltZVRha2VuIiwic3RhdGVUaW1lVGFrZW4iLCJhc3NlcnRpb25UaW1lb3V0VGltZXIiLCJkZXZpYXRpb25zIiwicGVuZGluZyIsInVuZXhwZWN0ZWQiLCJjb25zdW1lUm91dGUiLCJyZXBvcnQiLCJUYWJsZSIsImZpbmFsaXNlUmVwb3J0IiwiYWRkUm93IiwibG9jayIsInRhYmxlIiwiY29udGVudCIsImVudGVyZWRTdGF0ZSIsImV4cGVjdGVkU3RhdGUiLCJzaGlmdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiRXJyb3IiLCJjbGVhclRpbWVvdXRBbmRSZXNvbHZlIiwiY2xlYXJUaW1lb3V0IiwicmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lciIsImNsZWFyVGltZW91dEFuZFJlamVjdCIsImJhaWxvdXQiLCJtZXNzYWdlIiwiY3VycmVudFN0YXRlIiwiaW5TdGF0ZSIsInNldFRpbWVvdXQiLCJyZXZva2UiLCJmbiIsIm9uU3dpdGNoaW5nIiwiY29sdW1ucyIsImFsaWdubWVudHMiLCJhbGlnbm1lbnQiLCJtYXAiLCJfIiwibG9ja2VkIiwiYXJncyIsIm9iaiIsInJlZHVjZSIsImFjYyIsImNvbCIsInJvdyIsInB1c2giLCJjb2xTaXplcyIsIk1hdGgiLCJtYXgiLCJwYWRMZWZ0Iiwic3RyIiwibGVuIiwicmVwZWF0IiwicGFkUmlnaHQiLCJzaXplcyIsImZvcm1hdEZpZWxkIiwidmFsdWUiLCJzaXplIiwiYWxpZ24iLCJvdXRwdXQiLCJmb3JtYXR0ZWRSb3ciLCJzdGFydFRpbWUiLCJEYXRlIiwibm93IiwiZm10IiwibnVtIiwiZGlnaXRzIiwidG9GaXhlZCIsInJlcGxhY2UiLCJkdXJhdGlvbiIsIlN0YXRlYm90IiwiZGVjb21wb3NlQ2hhcnQiLCJjeFBpcGUiLCJjeEFycm93IiwicnhEaXNhbGxvd2VkQ2hhcmFjdGVycyIsInJ4Q1JMRiIsInJ4Q29tbWVudCIsInJ4T3BlcmF0b3JzIiwicnhVbnNhZmUiLCJyeExpbmVDb250aW5hdGlvbnMiLCJSZWdFeHAiLCJ1bmlxIiwidGVtcGxhdGVMaXRlcmFsIiwicmF3TGluZXMiLCJmbGF0IiwiY29kZU9ubHkiLCJyZW1vdmVDb21tZW50cyIsImxpbmVzIiwiY29uZGVuc2VMaW5lcyIsImZsYXR0ZW5lZFJvdXRlIiwic2FuaXRpc2VMaW5lcyIsImxpbmVzVG9Qcm9jZXNzIiwibGluZXNPZlJvdXRlcyIsImRlY29tcG9zZUxpbmVzSW50b1JvdXRlcyIsImxpbmVzT2ZUcmFuc2l0aW9ucyIsImRlY29tcG9zZVJvdXRlc0ludG9UcmFuc2l0aW9ucyIsInN0YXRlcyIsInJvdXRlS2V5cyIsImZpbHRlcmVkUm91dGVzIiwiZmlsdGVyZWRTdGF0ZXMiLCJ0cmFuc2l0aW9ucyIsInNwbGl0Iiwicm91dGVzIiwiYXJyYXlPZlN0cmluZ3MiLCJzdHJpbmciLCJwYXJ0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxpbmUiLCJ0ZXN0IiwidHJpbSIsImN1cnJlbnRMaW5lIiwiaW5wdXQiLCJwcmV2aW91c1N0YXRlcyIsInBhaXJzIiwiZnJvbVN0YXRlcyIsInRvU3RhdGVzIiwidG9TdGF0ZSIsIkV2ZW50RW1pdHRlciIsImlzUG9qbyIsImlzRXZlbnRFbWl0dGVyIiwiUmVmZXJlbmNlQ291bnRlciIsImxvZ1ByZWZpeCIsImNoYXJ0IiwidW5kZWZpbmVkIiwiaGlzdG9yeUxpbWl0IiwiY2FuV2FybiIsInN0YXJ0SW4iLCJ0cmFuc2l0aW9uSWQiLCJzdGF0ZUhpc3RvcnkiLCJzdGF0ZUhpc3RvcnlMaW1pdCIsImV2ZW50cyIsImludGVybmFsRXZlbnRzIiwiSU5URVJOQUxfRVZFTlRTIiwiU1RBVEVfQ0hBTkdJTkciLCJTVEFURV9DSEFOR0VEIiwiZW1pdEludGVybmFsRXZlbnQiLCJldmVudE5hbWUiLCJlbWl0Iiwib25JbnRlcm5hbEV2ZW50IiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsInN0YXRlc0hhbmRsZWQiLCJyb3V0ZXNIYW5kbGVkIiwiZXZlbnRzSGFuZGxlZCIsImFwcGx5SGl0Y2hlciIsImhpdGNoZXIiLCJmbk5hbWUiLCJoaXRjaGVyQWN0aW9ucyIsImVudGVyIiwiRW50ZXIiLCJFbWl0IiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJyb3V0ZUNoYXJ0IiwiYWN0aW9uT3JDb25maWciLCJhY3Rpb24iLCJfb24iLCJvbiIsIl90aGVuIiwidGhlbiIsIkFycmF5IiwiaXNBcnJheSIsImV2ZW50TmFtZXMiLCJhbGxTdGF0ZXMiLCJhbGxSb3V0ZXMiLCJkZWNvbXBvc2VkRXZlbnRzIiwiX2NvbmZpZ3MiLCJkZWNvbXBvc2VDb25maWdzIiwiY29uZmlncyIsImFsbENsZWFudXBGbnMiLCJpbmNyZWFzZSIsIm9uRXZlbnQiLCJldmVudFdhc0hhbmRsZWQiLCJzb21lIiwicGFzc2VkIiwidHJhbnNpdGlvbk5vT3AiLCJ0cmFuc2l0aW9uQ29uZmlncyIsInRyYW5zaXRpb24iLCJpbnZhbGlkU3RhdGVzIiwiaW52YWxpZFJvdXRlcyIsIndhcm4iLCJjb25maWciLCJwcmV2aW91c1N0YXRlIiwiYW55T3JGbiIsImNvbmRpdGlvbk1hdGNoZXMiLCJmbkFyZ3MiLCJJblN0YXRlIiwiY2FuVHJhbnNpdGlvblRvIiwidGVzdFN0YXRlcyIsIm5leHRTdGF0ZXMiLCJfc3RhdGUiLCJuZXh0Um91dGUiLCJpbmZvIiwiY2IiLCJkZWNyZWFzZVJlZkNvdW50IiwicmVtb3ZlRXZlbnQiLCJvblN3aXRjaGVkIiwib25FeGl0aW5nIiwiZGVjcmVhc2VSZWZDb3VudHMiLCJvbkV4aXRlZCIsIm9uRW50ZXJpbmciLCJvbkVudGVyZWQiLCJyZXNldCIsImxhc3RTdGF0ZSIsInByZXZSb3V0ZSIsImluc3BlY3QiLCJyZWZzIiwibG9nUmVmQ291bnRlckluZm8iLCJyZWZDb3VudGVyIiwidG9WYWx1ZSIsIl9fU1RBVEVCT1RfXyIsImhpc3RvcnkiLCJvblRyYW5zaXRpb25zIiwicGVyZm9ybVRyYW5zaXRpb25zIiwiZ2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJpdGVtIiwib25lIiwiaW5kZXhPZiIsImRlZmVyIiwidGltZXIiLCJfZm4iLCJyZXN1bHQiLCJyZXZva2VkIiwia2luZCIsIl9yZWZzIiwiZXhwZWN0aW5nIiwicmVmIiwiY291bnRPZiIsImRlY3JlYXNlIiwiY291bnQiLCJrZXlzIiwic29ydCIsImtleSIsImVyclByZWZpeCIsInR5cGVNYXAiLCJhcmdNYXAiLCJhcmdOYW1lIiwiYXJnVHlwZSIsInNpZ25hdHVyZSIsImFyZyIsImVycm9yRGVzYyIsInR5cGVOYW1lIiwidHlwZU1hdGNoZXMiLCJsZXZlbCIsIl9sZXZlbCIsIm5vbmUiLCJjYW5Mb2ciLCJjYW5JbmZvIiwiZXJyb3IiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLGlDQUFpQyxRQUFRO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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SkUsS0FBRCxDQUtORCxNQUxNLEtBS0ssQ0FMZDtBQU1EOztBQUNELFdBQVN6SCxPQUFULEdBQW9CO0FBQ2xCLFdBQU95SCxNQUFNLElBQUksQ0FBakI7QUFDRDs7QUFDRCxXQUFTRSxNQUFULEdBQW1CO0FBQ2pCLFdBQU9GLE1BQU0sSUFBSSxDQUFqQjtBQUNEOztBQUNELFdBQVNHLE9BQVQsR0FBb0I7QUFDbEIsV0FBT0gsTUFBTSxJQUFJLENBQWpCO0FBQ0Q7O0FBQ0QsU0FBTztBQUNMekgsV0FBTyxFQUFQQSxPQURLO0FBRUwySCxVQUFNLEVBQU5BLE1BRks7QUFHTEMsV0FBTyxFQUFQQSxPQUhLO0FBS0x4RCxRQUFJLEVBQUU7QUFBQTs7QUFBQSxhQUFhd0QsT0FBTyxNQUFNLFlBQUFsUSxPQUFPLEVBQUMwTSxJQUFSLDJCQUExQjtBQUFBLEtBTEQ7QUFNTHRMLFNBQUssRUFBRTtBQUFBOztBQUFBLGFBQWE2TyxNQUFNLE1BQU0sYUFBQWpRLE9BQU8sRUFBQ29CLEtBQVIsNEJBQXpCO0FBQUEsS0FORjtBQU9MakIsT0FBRyxFQUFFO0FBQUE7O0FBQUEsYUFBYThQLE1BQU0sTUFBTSxhQUFBalEsT0FBTyxFQUFDRyxHQUFSLDRCQUF6QjtBQUFBLEtBUEE7QUFRTDJMLFFBQUksRUFBRTtBQUFBOztBQUFBLGFBQWF4RCxPQUFPLE1BQU0sYUFBQXRJLE9BQU8sRUFBQzhMLElBQVIsNEJBQTFCO0FBQUEsS0FSRDtBQVNMcUUsU0FBSyxFQUFFO0FBQUE7O0FBQUEsYUFBYSxhQUFBblEsT0FBTyxFQUFDbVEsS0FBUiw0QkFBYjtBQUFBO0FBVEYsR0FBUDtBQVdELEMiLCJmaWxlIjoiLi9zdGF0ZWJvdC5kZXYuYnJvd3Nlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YXRlYm90XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInN0YXRlYm90XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQVNTRVJUSU9OIEhFTFBFUlNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByb3V0ZUlzUG9zc2libGUsXG4gIGFzc2VydFJvdXRlXG59XG5cbmNvbnN0IHsgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGRlY29tcG9zZVJvdXRlIH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuY29uc3Qge1xuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBMb2dnZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgaXNUZW1wbGF0ZUxpdGVyYWxcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG5mdW5jdGlvbiByb3V0ZUlzUG9zc2libGUgKG1hY2hpbmUsIGV4cGVjdGVkUm91dGUpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdyb3V0ZUlzUG9zc2libGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCByb3V0ZSA9IGRlY29tcG9zZVJvdXRlKGV4cGVjdGVkUm91dGUpXG4gIHJldHVybiByb3V0ZS5ldmVyeSgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSByb3V0ZS5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXh0U3RhdGUgPSByb3V0ZVtpbmRleCArIDFdXG4gICAgICBjb25zdCBhdmFpbGFibGVTdGF0ZXMgPSBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKHN0YXRlKVxuICAgICAgY29uc3QgcGFzc2VzID0gYXZhaWxhYmxlU3RhdGVzLmluY2x1ZGVzKG5leHRTdGF0ZSlcbiAgICAgIHJldHVybiBwYXNzZXNcbiAgICB9XG4gIH0pXG59XG5cbmxldCBhc3NlcnRpb25JZCA9IDBcblxuLyoqXG4gKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0gb3B0aW9ucy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IGFzc2VydFJvdXRlT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkZXNjcmlwdGlvbl1cbiAqICBEZXNjcmliZSB0aGUgc3VjY2Vzcy1jb25kaXRpb24gZm9yIHRoaXMgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtmcm9tU3RhdGU9XCJcIl1cbiAqICBXYWl0IGZvciB0aGUgbWFjaGluZSB0byBiZSBpbiB0aGlzIHN0YXRlIGJlZm9yZSBhc3NlcnRpb24gYmVnaW5zLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW3J1bl1cbiAqICBSdW4gdGhpcyBmdW5jdGlvbiBqdXN0IGJlZm9yZSBzdGFydGluZyB0aGUgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtwZXJtaXR0ZWREZXZpYXRpb25zPTBdXG4gKiAgSWYgd2UgaGl0IGFuIHVuZXhwZWN0ZWQgc3RhdGUgZHVyaW5nIGFzc2VydGlvbiwgdGhpcyBpcyBhIFwiZGV2aWF0aW9uXCIuXG4gKiAgSXQgbWlnaHQgYmUgdGhhdCB0aGUgRlNNIHdpbGwgY29tZSBiYWNrIHRvIHRoZSBleHBlY3RlZCBzdGF0ZSBhZ2FpblxuICogIGFmdGVyIGEgY2VydGFpbiBudW1iZXIgb2YgdGhlc2UuIEZvciBleGFtcGxlLCBpZiB5b3VyIEZTTSBoYXMgYVxuICogIFwicmV0cnlcIiByb3V0ZSBjb25maWd1cmVkLCB0aGlzIG51bWJlciBjYW4gYWNjb3VudCBmb3IgaXQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3RpbWVvdXRJbk1zPTEwMDBdXG4gKiAgUGVybWl0dGVkIGxlbmd0aCBvZiB0aW1lIGZvciB0aGUgZW50aXJlIGFzc2VydGlvbiwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIE5vcm1hbGx5IHdlIHdhbnQgbG9ncyBmb3IgYXNzZXJ0aW9ucywgcmlnaHQ/IFdlbGwsIHlvdSBjYW4gdHVuZVxuICogIHRoZW0ganVzdCBsaWtlIHlvdSBjYW4gd2l0aCB7QGxpbmsgI3N0YXRlYm90b3B0aW9uc3xzdGF0ZWJvdE9wdGlvbnN9LlxuICovXG5cbmZ1bmN0aW9uIGFzc2VydFJvdXRlIChtYWNoaW5lLCBleHBlY3RlZFJvdXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignYXNzZXJ0Um91dGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBhc3NlcnRpb25JZCArPSAxXG5cbiAgY29uc3Qge1xuICAgIGRlc2NyaXB0aW9uID0gJ0Fzc2VydGlvbiBjb21wbGV0ZScsXG4gICAgZnJvbVN0YXRlID0gJycsXG4gICAgcnVuID0gKCkgPT4ge30sXG4gICAgcGVybWl0dGVkRGV2aWF0aW9ucyA9IDAsXG4gICAgdGltZW91dEluTXMgPSAxMDAwLFxuICAgIGxvZ0xldmVsID0gM1xuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG5cbiAgY29uc3QgcHJlZml4ID0gYFN0YXRlYm90WyR7bWFjaGluZS5uYW1lKCl9XTogYUlkPCR7YXNzZXJ0aW9uSWR9PmBcbiAgY29uc3Qgcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShleHBlY3RlZFJvdXRlKVxuXG4gIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06IEFzc2VydGluZyByb3V0ZTogWyR7cm91dGUuam9pbignID4gJyl9XWApXG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH06ID4gQXNzZXJ0aW9uIHdpbGwgc3RhcnQgZnJvbSBzdGF0ZTogXCIke2Zyb21TdGF0ZX1cImApXG5cbiAgY29uc3QgZnJvbVN0YXRlQWN0aW9uRm4gPSBEZWZlcihydW4pXG4gIGxldCByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9ICgpID0+IHsgfVxuXG4gIGNvbnN0IHRvdGFsVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IGFzc2VydGlvblRpbWVvdXRUaW1lclxuICBsZXQgZGV2aWF0aW9ucyA9IDBcbiAgbGV0IHBlbmRpbmcgPSB0cnVlXG4gIGxldCB1bmV4cGVjdGVkID0gZmFsc2VcblxuICBjb25zdCBjb25zdW1lUm91dGUgPSBbLi4ucm91dGVdXG4gIGNvbnN0IHJlcG9ydCA9IFRhYmxlKFxuICAgIFsnc3RhdGUnLCAnZXhwZWN0ZWQnLCAnaW5mbycsICd0b29rJ10sXG4gICAgWydjZW50ZXInLCAnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXVxuICApXG5cbiAgY29uc3QgZmluYWxpc2VSZXBvcnQgPSBPbmNlKGVyciA9PiB7XG4gICAgYWRkUm93KCcnLCAnJywgJycsICdUT1RBTDogJyArIHRvdGFsVGltZVRha2VuKCkpXG4gICAgcmVwb3J0LmxvY2soKVxuICAgIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06ICR7ZGVzY3JpcHRpb259OiBbJHtlcnIgPyAnRkFJTEVEJyA6ICdTVUNDRVNTJ31dYClcbiAgICBjb25zb2xlLnRhYmxlKHJlcG9ydC5jb250ZW50KCkpXG4gICAgcmV0dXJuIGVyclxuICB9KVxuXG4gIGNvbnN0IHsgYWRkUm93IH0gPSByZXBvcnRcbiAgZnVuY3Rpb24gZW50ZXJlZFN0YXRlIChzdGF0ZSkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICBhZGRSb3coc3RhdGUsICctJywgJ1BFTkRJTkcnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlWzBdXG4gICAgICBpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCB1bmV4cGVjdGVkID8gJ1JFQUxJR05FRCcgOiAnT0tBWScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgICBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCAnV1JPTkcgU1RBVEUnLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gdHJ1ZVxuICAgICAgICBkZXZpYXRpb25zICs9IDFcbiAgICAgIH1cbiAgICAgIHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKCdOTyBST1VURSBUTyBURVNUJykpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZXNvbHZlKC4uLmFyZ3MpXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVqZWN0ID0gZXJyID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlamVjdChlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgYmFpbG91dCA9IG1lc3NhZ2UgPT4ge1xuICAgICAgd2hpbGUgKGNvbnN1bWVSb3V0ZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICAgIGFkZFJvdyhtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpLCBgKCR7ZXhwZWN0ZWRTdGF0ZX0pYCwgbWVzc2FnZSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBjbGVhclRpbWVvdXRBbmRSZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKG1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBpZiAobWFjaGluZS5pblN0YXRlKGZyb21TdGF0ZSkpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgfVxuXG4gICAgY29uc3QgeyByZXZva2UsIGZuIH0gPSBSZXZva2FibGUoc3RhdGUgPT4ge1xuICAgICAgYXNzZXJ0aW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RJTUVPVVQnKVxuICAgICAgfSwgdGltZW91dEluTXMpXG5cbiAgICAgIGVudGVyZWRTdGF0ZShzdGF0ZSlcbiAgICAgIGlmIChwZW5kaW5nICYmIHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgfVxuICAgICAgaWYgKGRldmlhdGlvbnMgPiBwZXJtaXR0ZWREZXZpYXRpb25zKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RPTyBNQU5ZIERFVklBVElPTlMnKVxuICAgICAgfVxuICAgICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBjbGVhclRpbWVvdXRBbmRSZXNvbHZlKGZpbmFsaXNlUmVwb3J0KCkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIgPSBtYWNoaW5lLm9uU3dpdGNoaW5nKGZuKVxuICB9KVxufVxuXG5mdW5jdGlvbiBUYWJsZSAoY29sdW1ucyA9IFtdLCBhbGlnbm1lbnRzID0gW10pIHtcbiAgY29uc3QgdGFibGUgPSBbXVxuICBjb25zdCBhbGlnbm1lbnQgPSBjb2x1bW5zLm1hcCgoXywgaW5kZXgpID0+IGFsaWdubWVudHNbaW5kZXhdIHx8ICdjZW50ZXInKVxuXG4gIGxldCBsb2NrZWQgPSBmYWxzZVxuICBmdW5jdGlvbiBsb2NrICgpIHtcbiAgICBsb2NrZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSb3cgKC4uLmFyZ3MpIHtcbiAgICBpZiAobG9ja2VkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgb2JqID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXJnc1tpbmRleF0gfHwgJydcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IHJvd1xuICAgICAgfVxuICAgIH0sIHt9KVxuICAgIHRhYmxlLnB1c2gob2JqKVxuICB9XG5cbiAgZnVuY3Rpb24gY29sU2l6ZXMgKCkge1xuICAgIHJldHVybiB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiBjb2x1bW5zLm1hcCgoY29sLCBpbmRleCkgPT4gTWF0aC5tYXgocm93W2NvbF0ubGVuZ3RoLCBhY2NbaW5kZXhdKSksIGNvbHVtbnMubWFwKCgpID0+IDApKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkTGVmdCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gc3RyICsgJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkUmlnaHQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aCkgKyBzdHJcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHNpemVzID0gY29sU2l6ZXMoKVxuICAgIGZ1bmN0aW9uIGZvcm1hdEZpZWxkICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBzaXplc1tpbmRleF1cbiAgICAgIGNvbnN0IGFsaWduID0gYWxpZ25tZW50W2luZGV4XVxuICAgICAgaWYgKGFsaWduID09PSAnbGVmdCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZExlZnQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICBpZiAoYWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZFJpZ2h0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGNvbnN0IG91dHB1dCA9IHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFJvdyA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+ICh7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IGZvcm1hdEZpZWxkKHJvd1tjb2xdLCBpbmRleClcbiAgICAgIH0pLCB7fSlcbiAgICAgIHJldHVybiBbLi4uYWNjLCBmb3JtYXR0ZWRSb3ddXG4gICAgfSwgW10pXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2NrOiBsb2NrLFxuICAgIGFkZFJvdzogYWRkUm93LFxuICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBUaW1lVGFrZW4gKCkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cbiAgZnVuY3Rpb24gZm10IChudW0sIGRpZ2l0cykge1xuICAgIHJldHVybiBudW0udG9GaXhlZChkaWdpdHMpLnJlcGxhY2UoL1xcLjArJC8sICcnKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydFRpbWVcblxuICAgIGlmIChkdXJhdGlvbiA8IDUwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbil9IG1zYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA1MDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMil9IHMgYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA2MDAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDEpfSBzIGBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAgLyA2MCwgMSl9IG0gYFxuICAgIH1cbiAgfVxufVxuIiwiXG5jb25zdCB7IFN0YXRlYm90LCBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgYXNzZXJ0Um91dGUsIHJvdXRlSXNQb3NzaWJsZSB9ID0gcmVxdWlyZSgnLi9hc3NlcnRpb25zJylcbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbi8qKlxuICogPGltZyBzcmM9XCIuL2xvZ28tZnVsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogMjU1cHg7IG1hcmdpbjogMTBweCAwO1wiIC8+XG4gKlxuICogV3JpdGUgbW9yZSByb2J1c3QgYW5kIHVuZGVyc3RhbmRhYmxlIHByb2dyYW1zLlxuICpcbiAqIFN0YXRlYm90IGhvcGVzIHRvIG1ha2UgW0Zpbml0ZSBTdGF0ZSBNYWNoaW5lc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmluaXRlLXN0YXRlX21hY2hpbmUpIChGU01zKSBhIGxpdHRsZSBtb3JlIGFjY2Vzc2libGUuXG4gKlxuICogWW91J3JlIHJlYWRpbmcgdGhlIGRvY3VtZW50YXRpb24uIE90aGVyIGV4aXRzIGFyZTpcbiAqXG4gKiAtIFtUaGUgUkVBRE1FIGZpbGVdKC4uL1JFQURNRS5tZClcbiAqIC0gW1RoZSBHaXRodWIgUmVwb10oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdClcbiAqXG4gKiBTdGF0ZWJvdCB3YXMgd3JpdHRlbiBieSBbQ29uYW4gVGhlb2JhbGRdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvKSBhbmRcbiAqIGlzIFtJU0MgbGljZW5zZWRdKC4uL0xJQ0VOU0UpLlxuICpcbiAqICMjIyBKdW1wIHJpZ2h0IGluXG4gKlxuICogWW91IGNhbiBpbnN0YWxsIFN0YXRlYm90IGludG8geW91ciBgbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYHNoXG4gKiBucG0gaSBzdGF0ZWJvdFxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGltcG9ydCBzdGF0ZWJvdCBmcm9tICdzdGF0ZWJvdCdcbiAqIGBgYFxuICpcbiAqIE9yIG5vbi1gbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYGpzXG4gKiA8c2NyaXB0IHNyYz1cImh0dHBzOi8vdW5wa2cuY29tL3NodWNrc3Rlci9kaXN0L3N0YXRlYm90Lm1pbi5icm93c2VyLmpzXCI+PC9zY3JpcHQ+XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgeyBTdGF0ZWJvdCB9ID0gc3RhdGVib3RcbiAqIC8vIE1ha2UgbWFjaGluZXMgd2l0aCBTdGF0ZWJvdCgpXG4gKlxuICogY29uc3QgeyBpc1N0YXRlYm90LCByb3V0ZUlzUG9zc2libGUsIGFzc2VydFJvdXRlIH0gPSBzdGF0ZWJvdFxuICogLy8gVGhlc2UgYXJlIGFzc2VydGlvbiBoZWxwZXJzIHlvdSBjYW4gdXNlIGZvciB0ZXN0aW5nXG4gKiBgYGBcbiAqXG4gKiAjIyMgT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgOilcbiAqXG4gKiBJJ3ZlIGluY2x1ZGVkIFN0YXRlYm90IGluIHRoaXMgcGFnZS4gT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgdG9cbiAqIGZvbGxvdyBhbG9uZyB3aXRoIHRoZSBleGFtcGxlcyBiZWxvdzpcbiAqXG4gKiBgYGBqc1xuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncHJvbWlzZS1saWtlJywge1xuICogICBjaGFydDogYFxuICogICAgIC8vIFRoaXMgb25lIHdpbGwgYmVoYXZlIGEgYml0IGxpa2UgYSBQcm9taXNlXG4gKiAgICAgaWRsZSAtPiBwZW5kaW5nIC0+XG4gKiAgICAgICByZXNvbHZlZCB8IHJlamVjdGVkXG4gKlxuICogICAgIC8vIC4uLmFuZCB3ZSdyZSBkb25lXG4gKiAgICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICAgIHJlamVjdGVkIC0+IGRvbmVcbiAqICAgYCxcbiAqICAgc3RhcnRJbjogJ2lkbGUnXG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwZW5kaW5nJylcbiAqIC8vIHRydWVcbiAqXG4gKiBtYWNoaW5lLmVudGVyKCdwZW5kaW5nJylcbiAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICogLy8gW1wicmVzb2x2ZWRcIiwgXCJyZWplY3RlZFwiXVxuICogYGBgXG4gKlxuICogV2UgY2FuIGhvb2stdXAgZXZlbnRzIHdpdGgge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9OlxuICpcbiAqIGBgYGpzXG4gKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gKiAgJ3BlbmRpbmcgLT4gcmVzb2x2ZWQnOiB7XG4gKiAgICBvbjogJ2RhdGEtbG9hZGVkJ1xuICogIH0sXG4gKiAgJ3BlbmRpbmcgLT4gcmVqZWN0ZWQnOiB7XG4gKiAgICBvbjogWyd0aW1lb3V0JywgJ2RhdGEtZXJyb3InXSxcbiAqICAgIHRoZW46IChtc2cpID0+IHtcbiAqICAgICAgY29uc29sZS53YXJuKCdVaCBvaC4uLicsIG1zZylcbiAqICAgIH1cbiAqICB9LFxuICogICdyZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmUnOiB7XG4gKiAgICBvbjogJ3RoYXRzLWFsbC1mb2xrcydcbiAqICB9XG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuZW1pdCgnZGF0YS1lcnJvcicsICdEaWQgeW91IGhlYXIgdGhhdD8nKVxuICogYGBgXG4gKlxuICogSGVyZSdzIHRoZSBBUEk6XG4gKlxuICogfCBIaXRjaGVycyB8IFN0YXR1cyB8IEFjdGlvbnMgfFxuICogfC18LXwtfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudCAub25FdmVudCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jYW50cmFuc2l0aW9udG8gLmNhblRyYW5zaXRpb25UbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21zdGF0ZXNhdmFpbGFibGVmcm9taGVyZSAuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfSAvIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9udHJhbnNpdGlvbnMgLm9uVHJhbnNpdGlvbnMoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlIC5jdXJyZW50U3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtcHJldmlvdXNzdGF0ZSAucHJldmlvdXNTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21oaXN0b3J5IC5oaXN0b3J5KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSAvIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyZWQgLm9uRW50ZXJlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlIC5pblN0YXRlKCl9IC8ge0BsaW5rICNpbnN0YXRlLXN0YXRlLW91dHB1dHdoZW50cnVlLTEgLkluU3RhdGUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXQgLnJlc2V0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbmZvIC5pbmZvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWluc3BlY3QgLmluc3BlY3QoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtbmFtZSAubmFtZSgpfSB8ICB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSB8ICB8ICB8XG4gKlxuICogPGltZyBzcmM9XCIuL2xvZ28tc21hbGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDc1cHg7IG1hcmdpbjogMTVweCAwIDAgNXB4O1wiIC8+XG4gKlxuICogQG1vZHVsZSBzdGF0ZWJvdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gYG9iamVjdGAuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGVtbWluZycsIHtcbiAgICogICBjaGFydDogYFxuICAgKiAgICAgd2Fsa2luZyAtPiAoZGlnZ2luZyB8IGJ1aWxkaW5nIHwgZmFsbGluZykgLT5cbiAgICogICAgICAgd2Fsa2luZ1xuICAgKlxuICAgKiAgICAgZmFsbGluZyAtPiBzcGxhdHRpbmdcbiAgICogICAgIHdhbGtpbmcgLT4gZXhpdGluZ1xuICAgKiAgIGBcbiAgICogfSlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogIEdpdmUgeW91ciBTdGF0ZWJvdCBhIG5hbWUuIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGJ5IHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAgICogQHBhcmFtIHtzdGF0ZWJvdE9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHJldHVybnMge3N0YXRlYm90RnNtfVxuICAgKi9cbiAgU3RhdGVib3QsXG5cbiAgLyoqXG4gICAqIFRlc3RzIHRoYXQgYW4gb2JqZWN0IGlzIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIGlzU3RhdGVib3QobWFjaGluZSlcbiAgICogLy8gdHJ1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gW29iamVjdF0gVGhlIG9iamVjdCB0byB0ZXN0LlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU3RhdGVib3QsXG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGEgY2VydGFpbiByb3V0ZSBjYW4gYmUgZm9sbG93ZWQgYnkgYVxuICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAgICpcbiAgICogVGhpcyBtZXJlbHkgdGVzdHMgdGhhdCBhIGNlcnRhaW4gcGF0aCBjYW4gYmUgdGFrZW4gdGhyb3VnaCBhXG4gICAqIHN0YXRlLW1hY2hpbmUuIEl0IGRvZXNuJ3QgYXNzZXJ0IHRoYXQgdGhlIHN0YXRlcyBhcmUgbW92ZWQtdGhyb3VnaFxuICAgKiB3aGlsZSB0aGUgbWFjaGluZSBpcyB3b3JraW5nLCBhcyB3aXRoXG4gICAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gICAqICBUaGUgbWFjaGluZSB0byB0ZXN0IHRoZSByb3V0ZSBvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHJvdXRlXG4gICAqICBUaGUgcm91dGUgdG8gdGVzdCBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICAgKlxuICAgKiAgYFxuICAgKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAgICogIGBcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICAgKlxuICAgKiByb3V0ZUlzUG9zc2libGUobWFjaGluZSxcbiAgICogICAnd2Fsa2luZyAtPiBmYWxsaW5nIC0+IHNwbGF0dGluZyAtPiB3YWxraW5nJ1xuICAgKiApXG4gICAqIC8vIGZhbHNlXG4gICAqL1xuICByb3V0ZUlzUG9zc2libGUsXG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gdHJhY2VkIHRoZSByb3V0ZSBzcGVjaWZpZWQuXG4gICAqXG4gICAqIFdoZXJlYXMge0BsaW5rICNzdGF0ZWJvdHJvdXRlaXNwb3NzaWJsZXxyb3V0ZUlzUG9zc2libGUoKX0gb25seSBjaGVja3NcbiAgICogdGhhdCBhIHBhcnRpY3VsYXIgcm91dGUgY2FuIGJlIGZvbGxvd2VkLCBgYXNzZXJ0Um91dGVgIHdpbGwgaG9vay1pbnRvXG4gICAqIGEgbWFjaGluZSBhbmQgd2FpdCBmb3IgaXQgdG8gdHJhY2UgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGhpbiBhXG4gICAqIHRpbWVvdXQgcGVyaW9kLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBhc3luY1xuICAgKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gICAqICBUaGUgbWFjaGluZSB0byBydW4gdGhlIGFzc2VydGlvbiBvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGV4cGVjdGVkUm91dGVcbiAgICogIFRoZSBleHBlY3RlZCByb3V0ZSBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICAgKlxuICAgKiAgYFxuICAgKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAgICogIGBcbiAgICogQHBhcmFtIHthc3NlcnRSb3V0ZU9wdGlvbnN9IFtvcHRpb25zXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIGFzc2VydFJvdXRlKFxuICAgKiAgIG1hY2hpbmUsICdwcmVwYXJlIC0+IGRlYm91bmNlIC0+IHNlbmRpbmcgLT4gZG9uZSAtPiBpZGxlJyxcbiAgICogICB7XG4gICAqICAgICBkZXNjcmlwdGlvbjogJ0VtYWlsIHNlbnQgd2l0aCBubyBpc3N1ZXMnLFxuICAgKiAgICAgZnJvbVN0YXRlOiAnaWRsZScsXG4gICAqICAgICB0aW1lb3V0SW5NczogMTAwMCAqIDIwLFxuICAgKiAgICAgcGVybWl0dGVkRGV2aWF0aW9uczogMCxcbiAgICogICAgIGxvZ0xldmVsOiAzXG4gICAqICAgfVxuICAgKiApXG4gICAqIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdBc3NlcnRpb24gcGFzc2VkIScpKVxuICAgKiAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoYFdob29wczogJHtlcnJ9YCkpXG4gICAqXG4gICAqIG1hY2hpbmUuZW50ZXIoJ2lkbGUnKVxuICAgKi9cbiAgYXNzZXJ0Um91dGUsXG5cbiAgLyoqXG4gICAqIERlY29tcG9zZSBhIHtAbGluayBzdGF0ZWJvdENoYXJ0fSBpbnRvIGFuIG9iamVjdCBvZiBgc3RhdGVzYCwgYHJvdXRlc2AsXG4gICAqIGFuZCBgdHJhbnNpdGlvbnNgLlxuICAgKlxuICAgKiBTdGF0ZWJvdCgpIHVzZXMgdGhpcyBpbnRlcm5hbGx5IHRvIHBhcnNlIGNoYXJ0cy4gRXhwb3NlZCBmb3IgZGVidWdnaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydGBcbiAgICogICBwZW5kaW5nIC0+XG4gICAqICAgICBzdWNjZXNzIHwgZmFpbHVyZVxuICAgKiBgXG4gICAqIC8vIHN0YXRlcyA9IFsncGVuZGluZycsICdzdWNjZXNzJywgJ2ZhaWx1cmUnXVxuICAgKiAvLyByb3V0ZXMgPSBbICdwZW5kaW5nLT5zdWNjZXNzJywgJ3BlbmRpbmctPmZhaWx1cmUnXVxuICAgKiAvLyB0cmFuc2l0aW9ucyA9IFtcbiAgICogLy8gICBbJ3BlbmRpbmcnLCAnc3VjY2VzcyddLFxuICAgKiAvLyAgIFsncGVuZGluZycsICdmYWlsdXJlJ11cbiAgICogLy8gXVxuICAgKi9cbiAgZGVjb21wb3NlQ2hhcnRcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIENIQVJUL1JPVVRFIFBBUlNJTkdcbi8vXG5cbmNvbnN0IGN4UGlwZSA9ICd8J1xuY29uc3QgY3hBcnJvdyA9ICctPidcblxuY29uc3QgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyA9IC9bXmEtejAtOSFAIyQlXiYqOlxcLV8rPTw+fH5cXFxcLsKnXS9naVxuY29uc3QgcnhDUkxGID0gL1tcXHJcXG5dL1xuY29uc3QgcnhDb21tZW50ID0gLyhcXC9cXC9bXlxcblxccl0qKS9cblxuY29uc3QgcnhPcGVyYXRvcnMgPSBbY3hQaXBlLCBjeEFycm93XVxuICAubWFwKHJ4VW5zYWZlID0+IHJ4VW5zYWZlLnJlcGxhY2UoJ3wnLCAnXFxcXHwnKSlcbiAgLmpvaW4oJ3wnKVxuXG5jb25zdCByeExpbmVDb250aW5hdGlvbnMgPSBuZXcgUmVnRXhwKGAoJHtyeE9wZXJhdG9yc30pJGApXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjeFBpcGUsXG4gIGN4QXJyb3csXG4gIHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsXG4gIGRlY29tcG9zZUNoYXJ0LFxuICBkZWNvbXBvc2VSb3V0ZVxufVxuXG5jb25zdCB7IHVuaXEsIEFyZ1R5cGVFcnJvciwgaXNUZW1wbGF0ZUxpdGVyYWwgfSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlICh0ZW1wbGF0ZUxpdGVyYWwpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VSb3V0ZScsXG4gICAgeyB0ZW1wbGF0ZUxpdGVyYWw6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgdGVtcGxhdGVMaXRlcmFsXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCByYXdMaW5lcyA9IFt0ZW1wbGF0ZUxpdGVyYWxdLmZsYXQoKVxuICBjb25zdCBjb2RlT25seSA9IHJlbW92ZUNvbW1lbnRzKHJhd0xpbmVzKVxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlTGluZXMoY29kZU9ubHkpXG4gIGNvbnN0IGZsYXR0ZW5lZFJvdXRlID0gc2FuaXRpc2VMaW5lcyhsaW5lcykuZmxhdCgyKVxuICByZXR1cm4gZmxhdHRlbmVkUm91dGVcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlQ2hhcnQgKHRlbXBsYXRlTGl0ZXJhbCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZUNoYXJ0JyxcbiAgICB7IHRlbXBsYXRlTGl0ZXJhbDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICB0ZW1wbGF0ZUxpdGVyYWxcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IHJhd0xpbmVzID0gW3RlbXBsYXRlTGl0ZXJhbF0uZmxhdCgpXG4gIGNvbnN0IGNvZGVPbmx5ID0gcmVtb3ZlQ29tbWVudHMocmF3TGluZXMpXG4gIGNvbnN0IGxpbmVzID0gY29uZGVuc2VMaW5lcyhjb2RlT25seSlcbiAgY29uc3QgbGluZXNUb1Byb2Nlc3MgPSBzYW5pdGlzZUxpbmVzKGxpbmVzKVxuICBjb25zdCBsaW5lc09mUm91dGVzID0gbGluZXNUb1Byb2Nlc3NcbiAgICAubWFwKGRlY29tcG9zZUxpbmVzSW50b1JvdXRlcylcbiAgICAuZmxhdCgxKVxuICBjb25zdCBsaW5lc09mVHJhbnNpdGlvbnMgPSBsaW5lc09mUm91dGVzXG4gICAgLm1hcChkZWNvbXBvc2VSb3V0ZXNJbnRvVHJhbnNpdGlvbnMpXG4gICAgLmZsYXQoMSlcbiAgY29uc3Qgc3RhdGVzID0gW11cbiAgY29uc3Qgcm91dGVLZXlzID0gbGluZXNPZlRyYW5zaXRpb25zLm1hcChyb3V0ZSA9PiB7XG4gICAgc3RhdGVzLnB1c2goLi4ucm91dGUpXG4gICAgcmV0dXJuIHJvdXRlLmpvaW4oY3hBcnJvdylcbiAgfSlcbiAgY29uc3QgZmlsdGVyZWRSb3V0ZXMgPSB1bmlxKHJvdXRlS2V5cylcbiAgY29uc3QgZmlsdGVyZWRTdGF0ZXMgPSB1bmlxKHN0YXRlcylcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2l0aW9uczogZmlsdGVyZWRSb3V0ZXMubWFwKHJvdXRlID0+IHJvdXRlLnNwbGl0KGN4QXJyb3cpKSxcbiAgICByb3V0ZXM6IGZpbHRlcmVkUm91dGVzLFxuICAgIHN0YXRlczogZmlsdGVyZWRTdGF0ZXNcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVDb21tZW50cyAoYXJyYXlPZlN0cmluZ3MpIHtcbiAgcmV0dXJuIGFycmF5T2ZTdHJpbmdzXG4gICAgLnJlZHVjZSgoYWNjLCBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gYWNjXG4gICAgICB9XG4gICAgICByZXR1cm4gW1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIC4uLnN0cmluZy5zcGxpdChyeENSTEYpLm1hcChwYXJ0ID0+IHBhcnRcbiAgICAgICAgICAucmVwbGFjZShyeENvbW1lbnQsICcnKSlcbiAgICAgIF1cbiAgICB9LCBbXSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlTGluZXMgKGxpbmVzKSB7XG4gIHJldHVybiBsaW5lcy5yZWR1Y2UoKGFjYywgbGluZSkgPT4gcnhMaW5lQ29udGluYXRpb25zLnRlc3QobGluZS50cmltKCkpXG4gICAgPyB7XG4gICAgICBsaW5lczogYWNjLmxpbmVzLFxuICAgICAgY3VycmVudExpbmU6IGFjYy5jdXJyZW50TGluZSArIGxpbmVcbiAgICB9XG4gICAgOiB7XG4gICAgICBsaW5lczogWy4uLmFjYy5saW5lcywgYWNjLmN1cnJlbnRMaW5lICsgbGluZV0sXG4gICAgICBjdXJyZW50TGluZTogJydcbiAgICB9LCB7XG4gICAgbGluZXM6IFtdLFxuICAgIGN1cnJlbnRMaW5lOiAnJ1xuICB9KS5saW5lc1xufVxuXG5mdW5jdGlvbiBzYW5pdGlzZUxpbmVzIChsaW5lcykge1xuICByZXR1cm4gbGluZXMubWFwKGxpbmUgPT4gbGluZS5zcGxpdChjeEFycm93KS5tYXAoc3RyID0+IHN0clxuICAgIC5yZXBsYWNlKHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsICcnKVxuICAgIC5zcGxpdChjeFBpcGUpXG4gICAgLm1hcChwYXJ0ID0+IHBhcnQudHJpbSgpKSkpXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZUxpbmVzSW50b1JvdXRlcyAoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0LnJlZHVjZSgoYWNjLCBzdGF0ZXMpID0+IGFjYyA9PT0gZmFsc2VcbiAgICA/IHtcbiAgICAgIHByZXZpb3VzU3RhdGVzOiBbLi4uc3RhdGVzXSxcbiAgICAgIHBhaXJzOiBbXVxuICAgIH1cbiAgICA6IHtcbiAgICAgIHByZXZpb3VzU3RhdGVzOiBbLi4uc3RhdGVzXSxcbiAgICAgIHBhaXJzOiBbLi4uYWNjLnBhaXJzLCBbWy4uLmFjYy5wcmV2aW91c1N0YXRlc10sIFsuLi5zdGF0ZXNdXV1cbiAgICB9LCBmYWxzZSkucGFpcnNcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGVzSW50b1RyYW5zaXRpb25zIChbZnJvbVN0YXRlcywgdG9TdGF0ZXNdKSB7XG4gIHJldHVybiBmcm9tU3RhdGVzLnJlZHVjZSgoYWNjLCBmcm9tU3RhdGUpID0+IFtcbiAgICAuLi5hY2MsXG4gICAgLi4udG9TdGF0ZXMubWFwKHRvU3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIFtmcm9tU3RhdGUsIHRvU3RhdGVdXG4gICAgfSlcbiAgXSwgW10pXG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBGU01cbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTdGF0ZWJvdCxcbiAgaXNTdGF0ZWJvdFxufVxuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgU3RhdGVib3QuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gc3RhdGVib3RPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0YXRlYm90Q2hhcnR9IGNoYXJ0XG4gKiAgVGhlIHN0YXRlLWNoYXJ0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzdGFydEluPTxhdXRvPl1cbiAqICBUaGUgc3RhdGUgaW4gd2hpY2ggdG8gc3RhcnQuIElmIHVuc3BlY2lmaWVkLCB0aGUgZmlyc3Qgc3RhdGUgaW4gdGhlXG4gKiAgY2hhcnQgd2lsbCBiZSB1c2VkLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIEhvdyBub2lzeSB0aGUgbG9nZ2luZyBpcywgZnJvbSAxIHRvIDM6XG4gKiAgYGBgXG4gKiAgMSkgY29uc29sZS53YXJuXG4gKiAgMikgY29uc29sZS53YXJuL2xvZy90YWJsZVxuICogIDMpIGNvbnNvbGUud2Fybi9sb2cvdGFibGUvaW5mb1xuICogIGBgYFxuICogIGAzYCBpcyB0aGUgZGVmYXVsdC4gQXJndW1lbnQgdHlwZS1lcnJvcnMgd2lsbCBhbHdheXMgYHRocm93YC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbaGlzdG9yeUxpbWl0PTJdXG4gKiAgTGltaXQgaG93IG11Y2ggaGlzdG9yeSB0aGUgc3RhdGUtbWFjaGluZSBrZWVwcy4gQWNjZXNzZWQgdmlhXG4gKiAge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3Rvcnl8c3RhdGVib3RGc20jaGlzdG9yeSgpfS5cbiAqIEBwcm9wZXJ0eSB7ZXZlbnRzfSBbZXZlbnRzXVxuICogIElmIHlvdSB3aXNoIHRvIGhhdmUgeW91ciBTdGF0ZWJvdHMgbGlzdGVuIHRvIGV2ZW50cyBjb21pbmcgZnJvbVxuICogIGEgc2hhcmVkIEV2ZW50RW1pdHRlciwgeW91IGNhbiBwYXNzIGl0IGluIGhlcmUuIFRoZSBgZW1pdCgpYC9gb25FdmVudCgpYC9cbiAqICBgcGVyZm9ybVRyYW5zaXRpb25zKClgIG1ldGhvZHMgd2lsbCB1c2UgaXQuXG4gKlxuICogIEl0IHNob3VsZCBoYXZlIHRoZSBzYW1lIHNpZ25hdHVyZSBhcyB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfY2xhc3NfZXZlbnRlbWl0dGVyfEV2ZW50RW1pdHRlcn0uXG4gKi9cblxuLyoqXG4gKiBBIGRlc2NyaXB0aW9uIG9mIGFsbCB0aGUgc3RhdGVzIGluIGEgbWFjaGluZSwgcGx1cyBhbGwgb2YgdGhlXG4gKiBwZXJtaXR0ZWQgdHJhbnNpdGlvbnMgYmV0d2VlbiB0aGVtLlxuICpcbiAqIFRoaXMgaXMgZGVmaW5lZCB1c2luZyBhIGBzdHJpbmdgIG9yIGFuIGBhcnJheWAgb2Ygc3RyaW5ncywgYnV0XG4gKiAge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL1RlbXBsYXRlX2xpdGVyYWxzfFRlbXBsYXRlIExpdGVyYWxzfVxuICogYXJlIG11Y2ggbW9yZSBjb252ZW5pZW50LlxuICpcbiAqIEFuIGFycm93IGAtPmAgY29uZmlndXJlcyBhICoqcGVybWl0dGVkIHRyYW5zaXRpb24qKiBiZXR3ZWVuIHR3byBzdGF0ZXM6XG4gKlxuICogYGBgXG4gKiBmcm9tLXN0YXRlIC0+IHRvLXN0YXRlXG4gKiBgYGBcbiAqXG4gKiBJdCdzIHRoZSBvbmx5IG9wZXJhdG9yIG5lZWRlZCB0byBidWlsZCBhbnkgY2hhcnQ6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkXG4gKiAgIHBlbmRpbmcgLT4gcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBUaGUgXCJPUlwiIG9wZXJhdG9yIGB8YCBjYW4gaGVscCB1cyByZW1vdmUgc29tZSByZWR1bmRhbmN5IGZyb20gdGhlIGFib3ZlIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBJbiBib3RoIGNoYXJ0cywgYHBlbmRpbmdgIGNhbiB0cmFuc2l0aW9uIHRvIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCwgYW5kXG4gKiBgcmVzb2x2ZWRgIG9yIGByZWplY3RlZGAgY2FuIGJvdGggdHJhbnNpdGlvbiB0byBgZG9uZWAuXG4gKlxuICogV2UgY2FuIHN0cmVhbWxpbmUgdGhpcyBldmVuIGZ1cnRoZXI6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IChyZXNvbHZlZCB8IHJlamVjdGVkKSAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBBZ2FpbiwgdGhpcyBpcyBleGFjdGx5IGVxdWl2YWxlbnQgdG8gdGhlIHByZXZpb3VzIHR3byBleGFtcGxlcy5cbiAqXG4gKiBOb3RpY2UgaW4gdGhpcyBvbmUgdGhhdCB3ZSBoYXZlIHBhcmVudGhlc2VzIGAoYCBgKWAgc3Vycm91bmRpbmcgYHJlc29sdmVkYFxuICogYW5kIGByZWplY3RlZGAuIFRoZXkgYXJlIGFjdHVhbGx5IGNvbXBsZXRlbHkgaWdub3JlZCBieSB0aGUgcGFyc2VyLCBhbmRcbiAqIHlvdSBjYW4gdXNlIHRoZW0gYXMgeW91IHBsZWFzZSB0byBoZWxwIG1ha2UgeW91ciBjaGFydHMgbW9yZSByZWFkYWJsZS5cbiAqXG4gKiBBIGNoYXJ0IHdvcmtzIGV4YWN0bHkgdGhlIHNhbWUgd2l0aG91dCB0aGVtOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIENoYXJ0cyBjYW4gYWxzbyBiZSBzcGxpdCBhY3Jvc3MgbXVsdGlwbGUtbGluZXM6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+XG4gKiAgIHJlc29sdmVkIHxcbiAqICAgcmVqZWN0ZWQgLT5cbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKiBOb3RpY2UgdGhhdCBhbGwgd2hpdGUtc3BhY2UgaXMgaWdub3JlZCBvbiBlaXRoZXIgc2lkZSBvZiB0aGUgYC0+YFxuICogYW5kIGB8YC5cbiAqXG4gKiBgLy8gQ29tbWVudHMgb2YgdGhpcyBraW5kIGFyZSBhbGxvd2VkLCB0b286YFxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiAvLyBXaGVyZSBkbyB3ZSBnbyBmcm9tIGhlcmU/XG4gKiAgICAgKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IC8vIEFoLCB5ZXNcbiAqXG4gKiAgIC8vIEFuZCBub3cgd2UncmUgYWxsIGZpbmlzaGVkXG4gKiAgIGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEZpbmFsbHksIGhlcmUncyBhIG1vcmUgZnVsbCBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgZHJhZ0Ryb3BDaGFydCA9IGBcbiAqICAgaWRsZSAtPlxuICogICAgIGRyYWctZGV0ZWN0IC0+XG4gKiAgICAgICAoZHJhZ2dpbmcgfCBjbGlja2VkKVxuICpcbiAqICAgLy8gSnVzdCBhIGNsaWNrLCBiYWlsLW91dCFcbiAqICAgY2xpY2tlZCAtPiBpZGxlXG4gKlxuICogICAvLyBEcmFnIGRldGVjdGVkIVxuICogICBkcmFnZ2luZyAtPlxuICogICAgIGRyYWctd2FpdCAtPiBkcmFnZ2VkIC0+IGRyYWctd2FpdFxuICpcbiAqICAgLy8gRHJhZyBmaW5pc2hlZC4uLlxuICogICAoZHJhZy13YWl0IHwgZHJhZ2dlZCkgLT5cbiAqICAgICAoZHJhZy1kb25lIHwgZHJhZy1jYW5jZWwpIC0+XG4gKiAgICAgICBpZGxlXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZWJvdENoYXJ0XG4gKi9cblxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jb25zdCB7XG4gIGlzUG9qbyxcbiAgQXJnVHlwZUVycm9yLFxuICBMb2dnZXIsXG4gIGlzRXZlbnRFbWl0dGVyLFxuICBSZWZlcmVuY2VDb3VudGVyXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQsIGN4QXJyb3cgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbmZ1bmN0aW9uIFN0YXRlYm90IChuYW1lLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1xcblN0YXRlYm90OiBQbGVhc2Ugc3BlY2lmeSBhIG5hbWUgZm9yIHRoaXMgbWFjaGluZScpXG4gIH1cblxuICBjb25zdCBsb2dQcmVmaXggPSBgU3RhdGVib3RbJHtuYW1lfV1gXG4gIGlmICghaXNQb2pvKG9wdGlvbnMpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGBcXG4ke2xvZ1ByZWZpeH06IFBsZWFzZSBzcGVjaWZ5IG9wdGlvbnMgZm9yIHRoaXMgbWFjaGluZWApXG4gIH1cblxuICBjb25zdCB7XG4gICAgY2hhcnQgPSB1bmRlZmluZWQsXG4gICAgbG9nTGV2ZWwgPSAzLFxuICAgIGhpc3RvcnlMaW1pdCA9IDJcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoYCR7bG9nUHJlZml4fSNgKVxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuICBjb25zdCB7IGNhbldhcm4gfSA9IGNvbnNvbGVcblxuICBjb25zdCB7XG4gICAgc3RhdGVzID0gW10sXG4gICAgcm91dGVzID0gW11cbiAgfSA9IGNoYXJ0ID8gZGVjb21wb3NlQ2hhcnQoY2hhcnQpIDogb3B0aW9uc1xuXG4gIGxldCB7IHN0YXJ0SW4gfSA9IG9wdGlvbnNcbiAgaWYgKHN0YXJ0SW4gPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0SW4gPSBzdGF0ZXNbMF1cbiAgfVxuXG4gIGlmICghc3RhdGVzLmluY2x1ZGVzKHN0YXJ0SW4pKSB7XG4gICAgdGhyb3cgRXJyb3IoYCR7bG9nUHJlZml4fTogU3RhcnRpbmctc3RhdGUgbm90IGluIGNoYXJ0OiBcIiR7c3RhcnRJbn1cImApXG4gIH1cblxuICBsZXQgdHJhbnNpdGlvbklkID0gMFxuICBjb25zdCBzdGF0ZUhpc3RvcnkgPSBbc3RhcnRJbl1cbiAgY29uc3Qgc3RhdGVIaXN0b3J5TGltaXQgPSBNYXRoLm1heChoaXN0b3J5TGltaXQsIDIpXG4gIGNvbnN0IGV2ZW50cyA9IGlzRXZlbnRFbWl0dGVyKG9wdGlvbnMuZXZlbnRzKSA/IG9wdGlvbnMuZXZlbnRzIDogbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3QgaW50ZXJuYWxFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgY29uc3QgSU5URVJOQUxfRVZFTlRTID0ge1xuICAgIFNUQVRFX0NIQU5HSU5HOiAnKEFOWSlzdGF0ZTpjaGFuZ2luZycsXG4gICAgU1RBVEVfQ0hBTkdFRDogJyhBTlkpc3RhdGU6Y2hhbmdlZCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXRJbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VtaXRJbnRlcm5hbEV2ZW50JywgeyBldmVudE5hbWU6ICdzdHJpbmcnIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBpbnRlcm5hbEV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uSW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCBmbikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25JbnRlcm5hbEV2ZW50JywgeyBldmVudE5hbWU6ICdzdHJpbmcnLCBmbjogJ2Z1bmN0aW9uJyB9LCBldmVudE5hbWUsIGZuKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgaW50ZXJuYWxFdmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaW50ZXJuYWxFdmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGF0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdzdGF0ZXMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlcycsXG4gICAgWy4uLnN0YXRlc11cbiAgKVxuICBjb25zdCByb3V0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICd0cmFuc2l0aW9ucycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9ucycsXG4gICAgWy4uLnJvdXRlc11cbiAgKVxuICBjb25zdCBldmVudHNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdldmVudHMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzJ1xuICApXG5cbiAgLy8gSW50ZXJwcmV0cyBvblRyYW5zaXRpb25zKCkgYW5kIHBlcmZvcm1UcmFuc2l0aW9ucygpXG4gIGZ1bmN0aW9uIGFwcGx5SGl0Y2hlciAoaGl0Y2hlciwgZm5OYW1lKSB7XG4gICAgY29uc3QgaGl0Y2hlckFjdGlvbnMgPVxuICAgICAgdHlwZW9mIGhpdGNoZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBoaXRjaGVyKHsgZW50ZXIsIGVtaXQsIEVudGVyLCBFbWl0IH0pXG4gICAgICAgIDogaXNQb2pvKGhpdGNoZXIpXG4gICAgICAgICAgPyBoaXRjaGVyXG4gICAgICAgICAgOiBudWxsXG5cbiAgICBpZiAoIWlzUG9qbyhoaXRjaGVyQWN0aW9ucykpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBFeHBlY3RlZCBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdGBcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBldmVudHMgPSB7fVxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gW11cblxuICAgIE9iamVjdC5lbnRyaWVzKGhpdGNoZXJBY3Rpb25zKVxuICAgICAgLmZvckVhY2goKFtyb3V0ZUNoYXJ0LCBhY3Rpb25PckNvbmZpZ10pID0+IHtcbiAgICAgICAgLy8gb25UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25PckNvbmZpZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoIWlzUG9qbyhhY3Rpb25PckNvbmZpZykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgY29uc3QgeyBvbjogX29uLCB0aGVuOiBfdGhlbiB9ID0gYWN0aW9uT3JDb25maWdcbiAgICAgICAgaWYgKHR5cGVvZiBfb24gPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoX29uKSkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZXMgPSBbX29uXS5mbGF0KClcbiAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IF90aGVuIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgX3RoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBvblRyYW5zaXRpb25zIDIvMy4uLlxuICAgICAgICAgIC8vIChCZWhhdmUgbGlrZSBvblRyYW5zaXRpb25zIGlmIGEgY29uZmlnIGlzIHNwZWNpZmllZCwgYnV0XG4gICAgICAgICAgLy8gIHRoZXJlIGlzIG5vIFwib25cIiBldmVudC4uLilcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgY29uc3QgYWxsU3RhdGVzID0gW11cbiAgICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDIvMy4uLlxuICAgIGNvbnN0IGRlY29tcG9zZWRFdmVudHMgPSBPYmplY3QuZW50cmllcyhldmVudHMpXG4gICAgICAucmVkdWNlKChhY2MsIFtldmVudE5hbWUsIF9jb25maWdzXSkgPT4ge1xuICAgICAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCBjb25maWdzIH0gPSBkZWNvbXBvc2VDb25maWdzKF9jb25maWdzKVxuICAgICAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICBbZXZlbnROYW1lXTogY29uZmlnc1xuICAgICAgICB9XG4gICAgICB9LCB7fSlcblxuICAgIGNvbnN0IGFsbENsZWFudXBGbnMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGFsbENsZWFudXBGbnMucHVzaChcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKGRlY29tcG9zZWRFdmVudHMpXG4gICAgICAgIC5tYXAoKFtldmVudE5hbWUsIGNvbmZpZ3NdKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGV2ZW50c0hhbmRsZWQuaW5jcmVhc2UoZXZlbnROYW1lKSxcbiAgICAgICAgICAgIG9uRXZlbnQoZXZlbnROYW1lLCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBldmVudFdhc0hhbmRsZWQgPSBjb25maWdzLnNvbWUoXG4gICAgICAgICAgICAgICAgKHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc2VkID0gaW5TdGF0ZShmcm9tU3RhdGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50ZXIodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiAhIXBhc3NlZFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgaWYgKCFldmVudFdhc0hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTm9PcChgRXZlbnQgbm90IGhhbmRsZWQ6IFwiJHtldmVudE5hbWV9XCJgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgfSkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gb25UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29uZmlncyA9IGRlY29tcG9zZUNvbmZpZ3ModHJhbnNpdGlvbnMpXG5cbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBhbGxTdGF0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5zdGF0ZXMpXG4gICAgICBhbGxSb3V0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5yb3V0ZXMpXG4gICAgfVxuXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4udHJhbnNpdGlvbkNvbmZpZ3MuY29uZmlncy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSA9IHRyYW5zaXRpb25cbiAgICAgICAgY29uc3Qgcm91dGUgPSBgJHtmcm9tU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHJvdXRlc0hhbmRsZWQuaW5jcmVhc2Uocm91dGUpLFxuICAgICAgICAgIG9uSW50ZXJuYWxFdmVudChyb3V0ZSwgYWN0aW9uKVxuICAgICAgICBdXG4gICAgICB9KS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBEZWJ1Z2dpbmcsIGlmIHdlJ3JlIGF0IHRoZSByaWdodCBsZXZlbFxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGNvbnN0IGludmFsaWRTdGF0ZXMgPSBhbGxTdGF0ZXMuZmlsdGVyKHN0YXRlID0+ICFzdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICAgICAgY29uc3QgaW52YWxpZFJvdXRlcyA9IGFsbFJvdXRlcy5maWx0ZXIocm91dGUgPT4gIXJvdXRlcy5pbmNsdWRlcyhyb3V0ZSkpXG4gICAgICBpZiAoaW52YWxpZFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCBzdGF0ZXMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRTdGF0ZXMubWFwKHN0YXRlID0+IGAgID4gXCIke3N0YXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgaWYgKGludmFsaWRSb3V0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgdHJhbnNpdGlvbnMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRSb3V0ZXMubWFwKHJvdXRlID0+IGAgID4gXCIke3JvdXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBhbGxDbGVhbnVwRm5zLmZvckVhY2goZm4gPT4gZm4oKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29tcG9zZUNvbmZpZ3MgKGNvbmZpZ3MpIHtcbiAgICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICAgIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgICBjb25zdCBfY29uZmlncyA9IGNvbmZpZ3MucmVkdWNlKChhY2MsIGNvbmZpZykgPT4ge1xuICAgICAgY29uc3QgeyByb3V0ZUNoYXJ0LCBhY3Rpb24gfSA9IGNvbmZpZ1xuICAgICAgY29uc3QgeyBzdGF0ZXMsIHJvdXRlcywgdHJhbnNpdGlvbnMgfSA9IGRlY29tcG9zZUNoYXJ0KHJvdXRlQ2hhcnQpXG4gICAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICAuLi50cmFuc2l0aW9ucy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSB0cmFuc2l0aW9uXG4gICAgICAgICAgcmV0dXJuIHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0sIFtdKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3M6IF9jb25maWdzLFxuICAgICAgc3RhdGVzOiBhbGxTdGF0ZXMsXG4gICAgICByb3V0ZXM6IGFsbFJvdXRlc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDJdXG4gIH1cblxuICBmdW5jdGlvbiBjdXJyZW50U3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDFdXG4gIH1cblxuICBmdW5jdGlvbiBpblN0YXRlIChzdGF0ZSwgYW55T3JGbiwgLi4uZm5BcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdpblN0YXRlJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBjb25kaXRpb25NYXRjaGVzID0gY3VycmVudFN0YXRlKCkgPT09IHN0YXRlXG5cbiAgICBpZiAoYW55T3JGbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWNvbmRpdGlvbk1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYW55T3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gYW55T3JGbiguLi5mbkFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gYW55T3JGblxuICAgIH1cblxuICAgIHJldHVybiBjb25kaXRpb25NYXRjaGVzXG4gIH1cblxuICBmdW5jdGlvbiBJblN0YXRlIChzdGF0ZSwgYW55T3JGbikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignSW5TdGF0ZScsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5mbkFyZ3MpID0+IGluU3RhdGUoc3RhdGUsIGFueU9yRm4sIC4uLmZuQXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblRyYW5zaXRpb25UbyAoLi4uc3RhdGVzKSB7XG4gICAgY29uc3QgdGVzdFN0YXRlcyA9IHN0YXRlcy5mbGF0KClcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2NhblRyYW5zaXRpb25UbycsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIHRlc3RTdGF0ZXNbMF0pXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBpZiAoIXRlc3RTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIHJldHVybiB0ZXN0U3RhdGVzLmV2ZXJ5KHN0YXRlID0+IG5leHRTdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUgKHN0YXRlKSB7XG4gICAgY29uc3QgX3N0YXRlID0gc3RhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgPyBzdGF0ZVxuICAgICAgOiBjdXJyZW50U3RhdGUoKVxuXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZScsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIF9zdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiByb3V0ZXMucmVkdWNlKChhY2MsIHJvdXRlKSA9PiB7XG4gICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHJvdXRlLnNwbGl0KGN4QXJyb3cpXG4gICAgICAgIC5tYXAoc3RhdGUgPT4gc3RhdGUudHJpbSgpKVxuXG4gICAgICBpZiAoZnJvbVN0YXRlID09PSBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5hY2MsIHRvU3RhdGVdXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBFbWl0IChldmVudE5hbWUpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VtaXQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbWl0JywgeyBldmVudE5hbWU6ICdzdHJpbmcnIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBldmVudHMuZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBFbnRlciAoc3RhdGUpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VudGVyJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgIHJldHVybiBlbnRlcihzdGF0ZSwgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbnRlciAoc3RhdGUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VudGVyJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCB0b1N0YXRlID0gc3RhdGVcblxuICAgIGlmICh0b1N0YXRlID09PSBpblN0YXRlKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgQWxyZWFkeSBpbiBzdGF0ZTogXCIke3RvU3RhdGV9XCJgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZXMuaW5jbHVkZXModG9TdGF0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHN0YXRlIFwiJHt0b1N0YXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRSb3V0ZSA9IGAke2luU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgIGlmICghcm91dGVzLmluY2x1ZGVzKG5leHRSb3V0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHRyYW5zaXRpb24gXCIke25leHRSb3V0ZX1cIiwgbm90IHN3aXRjaGluZ2ApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBGZWxsLXRocm91Z2gsIGNhbiBlbnRlciBuZXh0IHN0YXRlXG4gICAgY29uc29sZS5pbmZvKGAke2xvZ1ByZWZpeH06IHRJZDwkeysrdHJhbnNpdGlvbklkfT46ICR7bmV4dFJvdXRlfWApXG5cbiAgICBzdGF0ZUhpc3RvcnkucHVzaCh0b1N0YXRlKVxuICAgIGlmIChzdGF0ZUhpc3RvcnkubGVuZ3RoID4gc3RhdGVIaXN0b3J5TGltaXQpIHtcbiAgICAgIHN0YXRlSGlzdG9yeS5zaGlmdCgpXG4gICAgfVxuXG4gICAgZW1pdEludGVybmFsRXZlbnQoSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HSU5HLCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KG5leHRSb3V0ZSwgLi4uYXJncylcbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdFRCwgdG9TdGF0ZSwgaW5TdGF0ZSwgLi4uYXJncylcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBvbkV2ZW50IChldmVudE5hbWUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkV2ZW50JywgeyBldmVudE5hbWU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBldmVudE5hbWUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgZXZlbnRzLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGNiKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uU3dpdGNoaW5nIChjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25Td2l0Y2hpbmcnLCB7IGNiOiAnZnVuY3Rpb24nIH0sIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudCA9IHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HSU5HKVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25JbnRlcm5hbEV2ZW50KFxuICAgICAgSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HSU5HLFxuICAgICAgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICBjYih0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50KClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblN3aXRjaGVkIChjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25Td2l0Y2hlZCcsIHsgY2I6ICdmdW5jdGlvbicgfSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50ID0gc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdFRClcbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uSW50ZXJuYWxFdmVudChcbiAgICAgIElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0VELFxuICAgICAgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICBjYih0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50KClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkV4aXRpbmcgKHN0YXRlLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FeGl0aW5nJywgeyBzdGF0ZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIHN0YXRlLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfTpleGl0aW5nYClcbiAgICBdXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBjYih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXhpdGVkIChzdGF0ZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXhpdGVkJywgeyBzdGF0ZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIHN0YXRlLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfTpleGl0ZWRgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgY2IodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkVudGVyaW5nIChzdGF0ZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRW50ZXJpbmcnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmVudGVyaW5nYClcbiAgICBdXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IHRvU3RhdGUpIHtcbiAgICAgICAgY2IoZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRW50ZXJlZCAoc3RhdGUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkVudGVyZWQnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmVudGVyZWRgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSB0b1N0YXRlKSB7XG4gICAgICAgIGNiKGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH06IFN0YXRlLW1hY2hpbmUgcmVzZXQhYClcblxuICAgIHN0YXRlSGlzdG9yeS5sZW5ndGggPSAwXG4gICAgc3RhdGVIaXN0b3J5LnB1c2goc3RhcnRJbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25Ob09wIChtZXNzYWdlKSB7XG4gICAgY29uc3QgbGFzdFN0YXRlID0gcHJldmlvdXNTdGF0ZSgpXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgcHJldlJvdXRlID0gYCR7bGFzdFN0YXRlID09PSB1bmRlZmluZWQgPyAnW3VuZGVmaW5lZF0nIDogbGFzdFN0YXRlfS0+JHtpblN0YXRlfWBcblxuICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICBpZiAoIWF2YWlsYWJsZVN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gVGhlcmUgYXJlIG5vIHN0YXRlcyBhdmFpbGFibGUgZnJvbSBcIiR7aW5TdGF0ZX1cImBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBGcm9tIFwiJHtpblN0YXRlfVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbJHthdmFpbGFibGVTdGF0ZXNcbiAgICAgICAgICAgIC5tYXAoc3RhdGUgPT4gYFwiJHtzdGF0ZX1cImApXG4gICAgICAgICAgICAuam9pbignLCAnKX1dYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZXM6IHN0YXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgdHJhbnNpdGlvbnM6IHJvdXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgZXZlbnRzOiBldmVudHNIYW5kbGVkLnJlZnMoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluZm8gKCkge1xuICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZWApXG5cbiAgICBsb2dSZWZDb3VudGVySW5mbyhzdGF0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHJvdXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8oZXZlbnRzSGFuZGxlZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1JlZkNvdW50ZXJJbmZvIChyZWZDb3VudGVyKSB7XG4gICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgdGFibGUgfSA9IHJlZkNvdW50ZXIudG9WYWx1ZSgpXG4gICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24pXG4gICAgaWYgKHRhYmxlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS50YWJsZSh0YWJsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJyAgPiBObyBpbmZvcm1hdGlvbicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgc3RhdGUtbWFjaGluZSBvYmplY3QgY3JlYXRlZCBieVxuICAgKiB7QGxpbmsgI3N0YXRlYm90c3RhdGVib3R8U3RhdGVib3QoKX0uXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90RnNtXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgLy8gRm9yIGlkZW50aWZ5aW5nIFN0YXRlYm90IG9iamVjdHNcbiAgICBfX1NUQVRFQk9UX186IDEsXG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB0byBzZWUgaWYgd2UgY2FuIHRyYW5zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSBmcm9tXG4gICAgICogdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIElmIG1vcmUgdGhhbiBvbmUgc3RhdGUgaXMgc3BlY2lmaWVkLCBgdHJ1ZWAgaXMgcmV0dXJuZWQgb25seSBpZlxuICAgICAqICoqQUxMKiogc3RhdGVzIGFyZSBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gc3RhdGVzXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdnYW1lLW1lbnVzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPlxuICAgICAqICAgICAgIG1lbnUgLT5cbiAgICAgKiAgICAgICAgIHBsYXkgfFxuICAgICAqICAgICAgICAgb3B0aW9ucyB8XG4gICAgICogICAgICAgICBzb3VuZCB8XG4gICAgICogICAgICAgICBxdWl0XG4gICAgICpcbiAgICAgKiAgICAgLy8gR28gYmFjayB0byBtZW51XG4gICAgICogICAgIHBsYXkgfCBvcHRpb25zIHwgc291bmQgLT4gbWVudVxuICAgICAqXG4gICAgICogICAgIC8vIENhbiBxdWl0IGZyb20gbWFpbiBnYW1lLCB0b29cbiAgICAgKiAgICAgcGxheSAtPiBxdWl0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwbGF5JylcbiAgICAgKiAvLyBmYWxzZVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignbWVudScpXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oWydwbGF5JywgJ29wdGlvbnMnXSlcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgY2FuVHJhbnNpdGlvblRvOiBjYW5UcmFuc2l0aW9uVG8sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnYnV0dG9uJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBjbGlja2VkXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcImlkbGVcIlxuICAgICAqL1xuICAgIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgZW1pdHMgYW4gZXZlbnQsIGZpcmluZyBhbnkgbGlzdGVuZXJzIGFkZGVkIHVzaW5nXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9uc3wucGVyZm9ybVRyYW5zaXRpb25zKCl9IG9yIHtAbGluayAjc3RhdGVib3Rmc21vbmV2ZW50fC5vbkV2ZW50KCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdXG4gICAgICogIE9wdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIGxpc3RlbmVycy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiAgV2hldGhlciBvciBub3QgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgU2VlOiB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfZW1pdHRlcl9lbWl0X2V2ZW50bmFtZV9hcmdzfE5vZGUgRXZlbnRzfVxuICAgICAqICBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIFN0YXRlYm90IGltcG9ydHMgYEV2ZW50RW1pdHRlcmAgZnJvbSB0aGVcbiAgICAgKiAge0BsaW5rIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2V2ZW50c3xldmVudHN9XG4gICAgICogcGFja2FnZSBmb3IgZGVhbGluZyB3aXRoIGV2ZW50cyBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnYmFzaWMtZm9ybScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiByZWRpcmVjdFxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzoge1xuICAgICAqICAgICBvbjogJ3Bvc3QtZGF0YScsXG4gICAgICogICAgIHRoZW46ICguLi5hcmdzKSA9PiB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0V2ZW50IGFyZ3M6ICcsIGFyZ3MpXG4gICAgICogICAgICAgLy8gc2V0VGltZW91dChtYWNoaW5lLkVudGVyKCdyZWRpcmVjdCcpLCA1MDAwKVxuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW1pdCgncG9zdC1kYXRhJywgJ0hlbGxvLCB3b3JsZCEnKVxuICAgICAqIC8vIEV2ZW50IGFyZ3M6IFtcIkhlbGxvLCB3b3JsZCFcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInNlbmRpbmdcIlxuICAgICAqL1xuICAgIGVtaXQ6IGVtaXQsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBlbWl0cyB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogIFRoZSBkZXNpcmVkIGV2ZW50IHRvIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoYXQgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgLFxuICAgICAqICAgc3RhcnRJbjogJ3N0b3AnXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdwcmVwYXJlLXRvLWdvIC0+IGdvJzogICAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AnOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiB2YXIgbmV4dFRyYWZmaWNMaWdodCA9IG1hY2hpbmUuRW1pdCgndGltZXInKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInN0b3BcIlxuICAgICAqXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJwcmVwYXJlLXRvLXN0b3BcIlxuICAgICAqL1xuICAgIEVtaXQ6IEVtaXQsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBjaGFuZ2VzIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUsIHNvIGxvbmcgYXMgaXQgaXNcbiAgICAgKiBhY2Nlc3NpYmxlIGZyb20gdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgZGVzaXJlZCBzdGF0ZSB0byBzd2l0Y2gtdG8uXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBzdGF0ZSBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdkaWFsb2cnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNob3dpbmctbW9kYWwgLT4gKHNhdmluZyB8IGlkbGUpXG4gICAgICogICAgICAgc2F2aW5nIC0+IGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzYXZpbmcnKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiAvLyBbZGlhbG9nXTogSW52YWxpZCB0cmFuc2l0aW9uIFwiaWRsZS0+c2F2aW5nXCIsIG5vdCBzd2l0Y2hpbmdcbiAgICAgKiAvLyA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiW3VuZGVmaW5lZF0tPmlkbGVcIlxuICAgICAqIC8vID4gRnJvbSBcImlkbGVcIiwgdmFsaWQgc3RhdGVzIGFyZTogW1wic2hvd2luZy1tb2RhbFwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2hvd2luZy1tb2RhbCcpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqL1xuICAgIGVudGVyOiBlbnRlcixcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZ1xuICAgICAqIGFzIGl0IGlzIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgZGVzaXJlZCBzdGF0ZSB0byBzd2l0Y2gtdG8uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FuIGNoYW5nZSB0aGUgc3RhdGUgd2hlbiBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3BvcHVwLW1lbnUnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IG1lbnUtb3BlbmVkIC0+XG4gICAgICogICAgICAgKGl0ZW0tY2xpY2tlZCB8IGlkbGUpXG4gICAgICpcbiAgICAgKiAgICAgaXRlbS1jbGlja2VkIC0+IGlkbGVcbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnbWVudS1vcGVuZWQnXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrID0gbWFjaGluZS5FbnRlcignaXRlbS1jbGlja2VkJylcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJtZW51LW9wZW5lZFwiXG4gICAgICpcbiAgICAgKiBidXR0b24ub25jbGljaygpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaXRlbS1jbGlja2VkXCJcbiAgICAgKi9cbiAgICBFbnRlcjogRW50ZXIsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBzdGF0ZXMgdGhlIG1hY2hpbmUgaGFzIGJlZW4gaW4gc28gZmFyLCB1cCB0byBhIGxpbWl0IHNldFxuICAgICAqIGJ5IGBoaXN0b3J5TGltaXRgIGluIHtAbGluayBzdGF0ZWJvdE9wdGlvbnN9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBIGNvcHkgb2YgdGhlIHN0YXRlLWhpc3RvcnkuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Rvd25sb2FkZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+IChmYWlsdXJlIHwgc3VjY2VzcylcbiAgICAgKiAgICAgICBmYWlsdXJlIC0+IGxvYWRpbmdcbiAgICAgKiAgICAgICBzdWNjZXNzIC0+IGRvbmVcbiAgICAgKiAgIGAsXG4gICAgICogICBoaXN0b3J5TGltaXQ6IDRcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZmFpbHVyZScpXG4gICAgICogbWFjaGluZS5lbnRlcignbG9hZGluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignc3VjY2VzcycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogbWFjaGluZS5oaXN0b3J5KClcbiAgICAgKiAvLyBbXCJmYWlsdXJlXCIsIFwibG9hZGluZ1wiLCBcInN1Y2Nlc3NcIiwgXCJkb25lXCJdXG4gICAgICovXG4gICAgaGlzdG9yeTogKCkgPT4gWy4uLnN0YXRlSGlzdG9yeV0sXG5cbiAgICAvKipcbiAgICAgKiBQcmludCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudCBtYWNoaW5lIHRvIHRoZSBjb25zb2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5mbygpXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogSW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzdGF0ZS1tYWNoaW5lLlxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBzdGF0ZS1jaGFuZ2VzOlxuICAgICAqIC8vIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgICAqIC8vIOKUgiAoaW5kZXgpIOKUgiAgIHN0YXRlcyAgICDilIIgICAjICAgIOKUglxuICAgICAqIC8vIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgICAqIC8vIOKUgiAgICAwICAgIOKUgiAgICdkb25lJyAgICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAxICAgIOKUgiAgICdpZGxlJyAgICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAyICAgIOKUgiAncmVjZWl2aW5nJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAzICAgIOKUgiAgJ3NlbmRpbmcnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgICAqIC8vIFtoYWxmLWR1cGxleF0gTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHRyYW5zaXRpb25zOlxuICAgICAqIC8vIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgICAqIC8vIOKUgiAoaW5kZXgpIOKUgiAgICB0cmFuc2l0aW9ucyAgICDilIIgICAjICAgIOKUglxuICAgICAqIC8vIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgICAqIC8vIOKUgiAgICAwICAgIOKUgiAnaWRsZS0+cmVjZWl2aW5nJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAxICAgIOKUgiAgJ2lkbGUtPnNlbmRpbmcnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAyICAgIOKUgiAncmVjZWl2aW5nLT5kb25lJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAzICAgIOKUgiAgJ3NlbmRpbmctPmRvbmUnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gICAgICogLy8gKE5vIGluZm9ybWF0aW9uKVxuICAgICAqL1xuICAgIGluZm86ICgpID0+IGluZm8oKSxcblxuICAgIC8qKlxuICAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudCBtYWNoaW5lLlxuICAgICAqXG4gICAgICogU2FtZSBkZXRhaWxzIGFzIHtAbGluayAjc3RhdGVib3Rmc21pbmZvfC5pbmZvKCl9IGluIG9iamVjdC1mb3JtLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbnNwZWN0KClcbiAgICAgKiAvLyBXaWxsIHJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICAgKiAvLyAgeyBzdGF0ZXMsIHRyYW5zaXRpb25zLCBldmVudHMgfVxuICAgICAqXG4gICAgICogLy8gVGhlc2Ugd2lsbCBlYWNoIGhhdmUga2V5LXZhbHVlcywgdGhlIGtleSBiZWluZyB0aGUgbmFtZVxuICAgICAqIC8vIGFuZCB0aGUgdmFsdWUgYmVpbmcgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgYXR0YWNoZWQuXG4gICAgICovXG4gICAgaW5zcGVjdDogKCkgPT4gaW5zcGVjdCgpLFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX1cbiAgICAgKiBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgYHN0YXRlYCwgaW1tZWRpYXRlbHkgcmV0dXJuaW5nIGVpdGhlclxuICAgICAqIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIHRoZW4gaXRzIHJldHVybi12YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICAgKiBhcyB0aGUgYHRydWVgLXZhbHVlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZSB0byB0ZXN0IGFnYWluc3QuXG4gICAgICogQHBhcmFtIHthbnl8ZnVuY3Rpb259IFtvdXRwdXRXaGVuVHJ1ZV1cbiAgICAgKiAgT3B0aW9uYWwgYHRydWVgLXZhbHVlLiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgaXQgd2lsbCBiZVxuICAgICAqICBjYWxsZWQgYW5kIGl0cyByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufG51bGx8Kn1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGl0dGxlLXJldnZlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICAoZ2Vhci0xIHwgZ2Vhci0yIHwgcmV2ZXJzZSkgLT5cbiAgICAgKiAgICAgaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnKVxuICAgICAqIC8vIHRydWVcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScsICdQdXJycnIuLi4nKVxuICAgICAqIC8vIFwiUHVycnJyLi4uXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2dlYXItMScpXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0lkbGluZyEnKVxuICAgICAqICAgcmV0dXJuICdQdXJycnIuLi4nXG4gICAgICogfSlcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBpblN0YXRlOiBpblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIHJ1biwgdGVzdHMgdGhhdFxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfSBtYXRjaGVzIHRoZVxuICAgICAqIHNwZWNpZmllZCBzdGF0ZSwgcmV0dXJuaW5nIGVpdGhlciBgdHJ1ZWAgb3IgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGBvdXRwdXRXaGVuVHJ1ZWAgaXMgc3BlY2lmaWVkLCB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBpbnN0ZWFkIG9mIGB0cnVlYCwgYW5kIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2ZcbiAgICAgKiAgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZSB0byB0ZXN0IGFnYWluc3QuXG4gICAgICogQHBhcmFtIHthbnl8ZnVuY3Rpb259IFtvdXRwdXRXaGVuVHJ1ZV1cbiAgICAgKiAgT3B0aW9uYWwgYHRydWVgLXZhbHVlLiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgaXQgd2lsbCBiZVxuICAgICAqICBjYWxsZWQgYW5kIGl0cyByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgQSBmdW5jdGlvbiB0aGF0IGNhbGxzIHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlfC5pblN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBpZGxpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnKVxuICAgICAqIHZhciBwdXJyaW5nID0gbWFjaGluZS5JblN0YXRlKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0lkbGluZyEnKVxuICAgICAqICAgcmV0dXJuICdQdXJycnIuLi4nXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIGlkbGluZygpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogcHVycmluZygpXG4gICAgICogLy8gSWRsaW5nIVxuICAgICAqIC8vIFwiUHVycnJyLi4uXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2dlYXItMScpXG4gICAgICogcHVycmluZygpXG4gICAgICogLy8gbnVsbFxuICAgICAqIC8vIF4gdGhlIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgYXQgYWxsIGluIHRoZSBgZmFsc2VgIGNhc2UsXG4gICAgICogLy8gICBzbyBubyBjb25zb2xlLmxvZyBlaXRoZXIuXG4gICAgICovXG4gICAgSW5TdGF0ZTogSW5TdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBVc2VkIGZvciBsb2dnaW5nIGFuZCBhbHNvIGJ5IHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfVxuICAgICAqIGZvciB0aGUgc2FtZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBuYW1lIG9mIHRoZSBzdGF0ZS1tYWNoaW5lLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdBeSwgdGhlcmXigJlzIHRoZSBydWIuJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgdGhlLXF1ZXN0aW9uIC0+ICh0by1iZSB8IG5vdC10by1iZSlcbiAgICAgKiAgICAgICBub3QtdG8tYmUgLT4gcGVyY2hhbmNlLXRvLWRyZWFtXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUubmFtZSgpXG4gICAgICogLy8gXCJBeSwgdGhlcmXigJlzIHRoZSBydWIuXCJcbiAgICAgKi9cbiAgICBuYW1lOiAoKSA9PiBuYW1lLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQUZURVIqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgYmVjb21lcyB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2VudGVyQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAoZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyZWQoJ2RvbmUnLCBmcm9tU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0VudGVyZWQgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gRW50ZXJlZCBmcm9tOiByZWNlaXZpbmdcbiAgICAgKi9cbiAgICBvbkVudGVyZWQ6IG9uRW50ZXJlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBtYWRlIGl0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmluZygnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJpbmcgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyaW5nIGZyb206IHNlbmRpbmdcbiAgICAgKiAvLyBXZSBtYWRlIGl0IVxuICAgICAqL1xuICAgIG9uRW50ZXJpbmc6IG9uRW50ZXJpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBlbnRlckNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBldmVudCBpcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgVGhlIGNhbGxiYWNrLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvIC0+IGdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH0sXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FdmVudCgndGltZXInLCAoKSA9PiB7XG4gICAgICogICByZWRyYXdUcmFmZmljTGlnaHRzKClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogc2V0SW50ZXJ2YWwobWFjaGluZS5FbWl0KCd0aW1lcicpLCAyMDAwKVxuICAgICAqL1xuICAgIG9uRXZlbnQ6IG9uRXZlbnQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBhcmUgaGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiAvLyBXZSBhcmUgaGVhZGluZyB0bzogc2VuZGluZ1xuICAgICAqL1xuICAgIG9uRXhpdGVkOiBvbkV4aXRlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnUGVhY2Ugb3V0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0aW5nKCdpZGxlJywgdG9TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEhlYWRpbmcgdG86IHJlY2VpdmluZ1xuICAgICAqIC8vIFBlYWNlIG91dCFcbiAgICAgKi9cbiAgICBvbkV4aXRpbmc6IG9uRXhpdGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgZXhpdENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSBhZnRlciAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGVkKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBXZSB3ZW50IGZyb20gXCIke2Zyb21TdGF0ZX1cIiB0byBcIiR7dG9TdGF0ZX1cImApXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogLy8gV2Ugd2VudCBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGVkOiBvblN3aXRjaGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGJlZm9yZSAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgR29pbmcgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBHb2luZyBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGluZzogb25Td2l0Y2hpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hpbmcgLm9uU3dpdGNoaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgc3dpdGNoQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9TdGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFJ1biBjYWxsYmFja3Mgd2hlbiB0cmFuc2l0aW9ucyBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gdHJhbnNpdGlvbnNcbiAgICAgKiAgQ29uZmlndXJhdGlvbiBpbiB0aGUgZm9ybSBvZiBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgICAqICByZXR1cm5zIGFuIG9iamVjdC4gSWYgYSBmdW5jdGlvbiBpcyB1c2VkLCB0aGVyZSB3aWxsIGJlIGEgc2luZ2xlXG4gICAgICogIGFyZ3VtZW50IHBhc3NlZC1pbjogYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzXG4gICAgICogIGF0dGFjaGVkIGFzIGEgY29udmVuaWVuY2U6XG4gICAgICpcbiAgICAgKiAgLSB7e0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfSwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0sIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0sIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9fVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGFkZGVkXG4gICAgICogIGJ5IHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucyh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzogKCkgPT4ge1xuICAgICAqICAgICBzZW5kRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ2lkbGUgLT4gcmVjZWl2aW5nJzogKCkgPT4ge1xuICAgICAqICAgICByZWNlaXZlRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdyZWNlaXZlZCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gc2VuZERhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiByZWNlaXZlRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gVGhlIGFib3ZlIGV4YW1wbGUgdXNpbmcgYSBmdW5jdGlvbiBmb3IgY29uZmlnXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKCh7IGVudGVyIH0pID0+ICh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzogKCkgPT4ge1xuICAgICAqICAgICBzZW5kRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gZW50ZXIoJ2RvbmUnLCAnc2VudCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBlbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBlbnRlcignZG9uZScsICdyZWNlaXZlZCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBlbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lJzogd2hhdEhhcHBlbmVkID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FsbCBmaW5pc2hlZDogJywgd2hhdEhhcHBlbmVkKVxuICAgICAqICAgfVxuICAgICAqIH0pKVxuICAgICAqXG4gICAgICogLy8gZXRjLi4uXG4gICAgICovXG4gICAgb25UcmFuc2l0aW9uczogdHJhbnNpdGlvbnMgPT4gYXBwbHlIaXRjaGVyKHRyYW5zaXRpb25zLCAnb25UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSB0cmFuc2l0aW9ucyB3aGVuIGV2ZW50cyBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBVc2UgYHRoZW5gIHRvIG9wdGlvbmFsbHkgYWRkIGNhbGxiYWNrcyB0byB0aG9zZSB0cmFuc2l0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2NvbXBsZXgtZm9ybScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICB1cGRhdGVcbiAgICAgKlxuICAgICAqICAgICAvLyBNYXliZSB0aGluZ3MgdGFrZSBhIGxvbmcgdGltZS4uLlxuICAgICAqICAgICB1cGRhdGUgLT5cbiAgICAgKiAgICAgICB3YWl0aW5nIC0+IHdhaXRpbmctYS13aGlsZVxuICAgICAqXG4gICAgICogICAgIC8vIFdoaWNoIHBhdGggd2lsbCB3ZSB0YWtlP1xuICAgICAqICAgICB3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+XG4gICAgICogICAgICAgc3VjY2VzcyB8IGZhaWxlZCB8IHRpbWVvdXRcbiAgICAgKlxuICAgICAqICAgICAvLyBBbGwgZG9uZSFcbiAgICAgKiAgICAgc3VjY2VzcyB8IGZhaWxlZCB8IHRpbWVvdXQgLT5cbiAgICAgKiAgICAgICBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKCh7IEVudGVyLCBlbWl0IH0pID0+ICh7XG4gICAgICogICAnaWRsZSAtPiB1cGRhdGUnOiB7XG4gICAgICogICAgIG9uOiAndXNlci1zYXZlZCcsXG4gICAgICogICAgIHRoZW46IChkYXRhKSA9PiB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ1NlbmRpbmcgZGF0YTogJywgZGF0YSlcbiAgICAgKlxuICAgICAqICAgICAgIHNlbmREYXRhKGRhdGEpXG4gICAgICogICAgICAgICAudGhlbihFbnRlcignc3VjY2VzcycpKVxuICAgICAqICAgICAgICAgLmNhdGNoKEVudGVyKCdmYWlsZWQnKSlcbiAgICAgKlxuICAgICAqICAgICAgIGVtaXQoJ2RhdGEtc2VudCcpXG4gICAgICogICAgIH1cbiAgICAgKiAgIH0sXG4gICAgICogICAndXBkYXRlIC0+IHdhaXRpbmcnOiB7XG4gICAgICogICAgIG9uOiAnZGF0YS1zZW50JyxcbiAgICAgKiAgICAgdGhlbjogKCkgPT4ge1xuICAgICAqICAgICAgIHNldFRpbWVvdXQoRW50ZXIoJ3dhaXRpbmctYS13aGlsZScpLCA3NTApXG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcigndGltZW91dCcpLCA1MDAwKVxuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBKdXN0IHRvIGlsbHVzdHJhdGUgdGhhdCB5b3UgY2FuIG1peCBuJyBtYXRjaCB3aXRoIG9uVHJhbnNpdGlvbnM6XG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHN1Y2Nlc3MnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdMb3ZlbHkhJylcbiAgICAgKiAgIH0sXG4gICAgICogICAnd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPiB0aW1lb3V0JzogKCkgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnV2VsbCwgYXQgbGVhc3QgeW91IGhhdmUgeW91ciBzaG9lcycpXG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW1pdCgndXNlci1zYXZlZCcsIFsnc29tZScsICdkYXRhJ10pXG4gICAgICogLy8gU2VuZGluZyBkYXRhOiBbXCJzb21lXCIsIFwiZGF0YVwiXVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gc2VuZERhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICovXG4gICAgcGVyZm9ybVRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdwZXJmb3JtVHJhbnNpdGlvbnMnKSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByZXZpb3VzIHN0YXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9XG4gICAgICogIFRoZSBwcmV2aW91cyBzdGF0ZSwgb3IgYHVuZGVmaW5lZGAgaWYgdGhlcmUgaXNuJ3Qgb25lIChpZTsgeW91XG4gICAgICogIGhhdmUganVzdCBjYWxsZWQge0BsaW5rICNzdGF0ZWJvdGZzbXJlc2V0fC5yZXNldCgpfSwgb3IgdGhlXG4gICAgICogIG1hY2hpbmUgaGFzIGp1c3Qgc3RhcnRlZC4pXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3NpbXBsZS1zZW5kZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiBtYWNoaW5lLnByZXZpb3VzU3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICovXG4gICAgcHJldmlvdXNTdGF0ZTogcHJldmlvdXNTdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHN0YXRlLW1hY2hpbmUgdG8gaXRzIHN0YXJ0aW5nLXN0YXRlIGFuZCBjbGVhcnMgdGhlXG4gICAgICogc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEFsbCBsaXN0ZW5lcnMgd2lsbCBzdGlsbCBiZSBhdHRhY2hlZCwgYnV0IG5vIGV2ZW50cyBvciB0cmFuc2l0aW9ucyB3aWxsIGJlIGZpcmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Nhcm91c2VsJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgcGFnZS0xIC0+XG4gICAgICogICAgIHBhZ2UtMiAtPlxuICAgICAqICAgICBwYWdlLTMgLT5cbiAgICAgKiAgICAgcGFnZS00IC0+IHBhZ2UtMVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdwYWdlLTInKVxuICAgICAqIG1hY2hpbmUucmVzZXQoKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInBhZ2UtMVwiXG4gICAgICovXG4gICAgcmVzZXQ6IHJlc2V0LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGBhcnJheWAgb2Ygc3RhdGVzIGFjY2Vzc2libGUgZnJvbSB0aGUgc3RhdGUgc3BlY2lmaWVkLlxuICAgICAqIElmIG5vIHN0YXRlIGlzIHBhc3NlZC1pbiwgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfSBpcyB1c2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZV0gVGhlIHN0YXRlIHRvIGNoZWNrLiB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX1cbiAgICAgKiAgaWYgdW5zcGVjaWZpZWQuXG4gICAgICogQHJldHVybnMge1N0cmluZ1tdfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICAgKiAvLyBbXCJzZW5kaW5nXCIsIFwicmVjZWl2aW5nXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIFtcImRvbmVcIl1cbiAgICAgKi9cbiAgICBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZTogc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmVcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1N0YXRlYm90IChtYWNoaW5lKSB7XG4gIHJldHVybiAoXG4gICAgaXNQb2pvKG1hY2hpbmUpICYmXG4gICAgdHlwZW9mIG1hY2hpbmUuX19TVEFURUJPVF9fID09PSAnbnVtYmVyJ1xuICApXG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBVVElMU1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzRXZlbnRFbWl0dGVyLFxuICBpc1Bvam8sXG4gIGlzVGVtcGxhdGVMaXRlcmFsLFxuICB1bmlxLFxuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBSZWZlcmVuY2VDb3VudGVyLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlclxufVxuXG5mdW5jdGlvbiBpc0V2ZW50RW1pdHRlciAob2JqKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiZcbiAgICB0eXBlb2Ygb2JqLmVtaXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2Ygb2JqLmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIG9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJ1xuICApXG59XG5cbmZ1bmN0aW9uIGlzUG9qbyAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGVcbn1cblxuZnVuY3Rpb24gaXNUZW1wbGF0ZUxpdGVyYWwgKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmV2ZXJ5KGl0ZW0gPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiB1bmlxIChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIG9uZSkgPT4gKGFjYy5pbmRleE9mKG9uZSkgPT09IC0xID8gWy4uLmFjYywgb25lXSA6IGFjYyksIFtdKVxufVxuXG5mdW5jdGlvbiBkZWZlciAoZm4sIC4uLmFyZ3MpIHtcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCAwLCAuLi5hcmdzKVxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuZnVuY3Rpb24gRGVmZXIgKGZuKSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4gZGVmZXIoZm4sIC4uLmFyZ3MpXG59XG5cbmZ1bmN0aW9uIE9uY2UgKGZuKSB7XG4gIGNvbnN0IHsgcmV2b2tlLCBmbjogX2ZuIH0gPSBSZXZva2FibGUoZm4pXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgcmVzdWx0ID0gX2ZuKC4uLmFyZ3MpXG4gICAgcmV2b2tlKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZnVuY3Rpb24gUmV2b2thYmxlIChmbikge1xuICBsZXQgcmV2b2tlZCA9IGZhbHNlXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIHtcbiAgICBmbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICghcmV2b2tlZCkge1xuICAgICAgICByZXN1bHQgPSBmbiguLi5hcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgcmV2b2tlOiAoKSA9PiB7XG4gICAgICByZXZva2VkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBSZWZlcmVuY2VDb3VudGVyIChuYW1lLCBraW5kLCBkZXNjcmlwdGlvbiwgLi4uZXhwZWN0aW5nKSB7XG4gIGNvbnN0IF9yZWZzID0ge307XG4gIFsuLi5leHBlY3RpbmddLmZsYXQoKS5mb3JFYWNoKHJlZiA9PiB7XG4gICAgX3JlZnNbcmVmXSA9IDBcbiAgfSlcbiAgZnVuY3Rpb24gaW5jcmVhc2UgKHJlZikge1xuICAgIF9yZWZzW3JlZl0gPSBjb3VudE9mKHJlZikgKyAxXG4gICAgcmV0dXJuICgpID0+IGRlY3JlYXNlKHJlZilcbiAgfVxuICBmdW5jdGlvbiBkZWNyZWFzZSAocmVmKSB7XG4gICAgY29uc3QgY291bnQgPSBjb3VudE9mKHJlZikgLSAxXG4gICAgX3JlZnNbcmVmXSA9IE1hdGgubWF4KGNvdW50LCAwKVxuICB9XG4gIGZ1bmN0aW9uIGNvdW50T2YgKHJlZikge1xuICAgIHJldHVybiBfcmVmc1tyZWZdIHx8IDBcbiAgfVxuICBmdW5jdGlvbiByZWZzICgpIHtcbiAgICByZXR1cm4geyAuLi5fcmVmcyB9XG4gIH1cbiAgZnVuY3Rpb24gdGFibGUgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhfcmVmcykuc29ydCgpXG4gICAgICAubWFwKGtleSA9PiBba2V5LCBfcmVmc1trZXldXSlcbiAgICAgIC5tYXAoKFtyZWYsIGNvdW50XSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFtraW5kXTogcmVmLFxuICAgICAgICAgIHJlZnM6IGNvdW50IHx8ICdOb25lJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHRvVmFsdWUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNjcmlwdGlvbjogYFN0YXRlYm90WyR7bmFtZX1dOiAke2Rlc2NyaXB0aW9ufTpgLFxuICAgICAgdGFibGU6IHRhYmxlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpbmNyZWFzZTogaW5jcmVhc2UsXG4gICAgZGVjcmVhc2U6IGRlY3JlYXNlLFxuICAgIGNvdW50T2Y6IGNvdW50T2YsXG4gICAgdG9WYWx1ZTogdG9WYWx1ZSxcbiAgICByZWZzOiByZWZzXG4gIH1cbn1cblxuZnVuY3Rpb24gQXJnVHlwZUVycm9yIChlcnJQcmVmaXggPSAnJykge1xuICByZXR1cm4gZnVuY3Rpb24gKGZuTmFtZSwgdHlwZU1hcCwgLi4uYXJncykge1xuICAgIGNvbnN0IGFyZ01hcCA9IE9iamVjdC5lbnRyaWVzKHR5cGVNYXApXG4gICAgICAubWFwKChbYXJnTmFtZSwgYXJnVHlwZV0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgYXJnTmFtZSwgYXJnVHlwZSB9XG4gICAgICB9KVxuXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gT2JqZWN0LmtleXModHlwZU1hcCkuam9pbignLCAnKVxuXG4gICAgY29uc3QgZXJyID0gYXJnc1xuICAgICAgLm1hcCgoYXJnLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IGFyZ05hbWUsIGFyZ1R5cGUgfSA9IGFyZ01hcFtpbmRleF1cbiAgICAgICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGBBcmd1bWVudCB1bmRlZmluZWQ6IFwiJHthcmdOYW1lfVwiYFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yRGVzY1xuICAgICAgICBsZXQgdHlwZU5hbWVcbiAgICAgICAgbGV0IHR5cGVNYXRjaGVzXG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHlwZU1hdGNoZXMgPSBhcmdUeXBlKGFyZykgPT09IHRydWVcbiAgICAgICAgICB0eXBlTmFtZSA9IGFyZ1R5cGUubmFtZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGAke3R5cGVOYW1lfSgke2FyZ05hbWV9KSBkaWQgbm90IHJldHVybiB0cnVlYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB2YWxpZC10eXBlb2ZcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IHR5cGVvZiBhcmcgPT09IGFyZ1R5cGVcbiAgICAgICAgICB0eXBlTmFtZSA9IGFyZ1R5cGVcbiAgICAgICAgICBlcnJvckRlc2MgPSBgQXJndW1lbnQgXCIke2FyZ05hbWV9XCIgc2hvdWxkIGJlIGEgJHt0eXBlTmFtZX1gXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXR5cGVNYXRjaGVzKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGAke2Vycm9yRGVzY306ICR7YXJnTmFtZX0gPT09ICR7dHlwZW9mIGFyZ30oJHthcmd9KWBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG5cbiAgICBpZiAoIWVyci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgYFxcbiR7ZXJyUHJlZml4fSR7Zm5OYW1lfSgke3NpZ25hdHVyZX0pOlxcbmAgK1xuICAgICAgICBgJHtlcnIubWFwKGVyciA9PiBgPiAke2Vycn1gKS5qb2luKCdcXG4nKX1gXG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIExvZ2dlciAobGV2ZWwpIHtcbiAgbGV0IF9sZXZlbCA9IGxldmVsXG4gIGlmICh0eXBlb2YgX2xldmVsID09PSAnc3RyaW5nJykge1xuICAgIF9sZXZlbCA9ICh7XG4gICAgICBpbmZvOiAzLFxuICAgICAgbG9nOiAyLFxuICAgICAgd2FybjogMSxcbiAgICAgIG5vbmU6IDBcbiAgICB9KVtfbGV2ZWxdIHx8IDNcbiAgfVxuICBmdW5jdGlvbiBjYW5XYXJuICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDFcbiAgfVxuICBmdW5jdGlvbiBjYW5Mb2cgKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMlxuICB9XG4gIGZ1bmN0aW9uIGNhbkluZm8gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gM1xuICB9XG4gIHJldHVybiB7XG4gICAgY2FuV2FybixcbiAgICBjYW5Mb2csXG4gICAgY2FuSW5mbyxcblxuICAgIGluZm86ICguLi5hcmdzKSA9PiBjYW5JbmZvKCkgJiYgY29uc29sZS5pbmZvKC4uLmFyZ3MpLFxuICAgIHRhYmxlOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS50YWJsZSguLi5hcmdzKSxcbiAgICBsb2c6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4gY2FuV2FybigpICYmIGNvbnNvbGUud2FybiguLi5hcmdzKSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IGNvbnNvbGUuZXJyb3IoLi4uYXJncylcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==