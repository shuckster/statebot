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

//
// STATEBOT EXPORTS
//
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
 * <script src="https://unpkg.com/statebot@2.0.0/dist/statebot.min.browser.js"></script>
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
var rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
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
  var linesOfRoutes = linesToProcess.map(decomposeLineIntoRoute).flat(1);
  var linesOfTransitions = linesOfRoutes.map(decomposeRouteIntoTransition).flat(1);
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

function decomposeLineIntoRoute(line) {
  return line.reduce(function (acc, states) {
    return acc === false ? {
      previousStates: _toConsumableArray(states),
      pairs: []
    } : {
      previousStates: _toConsumableArray(states),
      pairs: [].concat(_toConsumableArray(acc.pairs), [[_toConsumableArray(acc.previousStates), _toConsumableArray(states)]])
    };
  }, false).pairs;
}

function decomposeRouteIntoTransition(_ref) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0ZWJvdC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vc3RhdGVib3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9ub2RlX21vZHVsZXMvLnBucG0vcmVnaXN0cnkubnBtanMub3JnL2V2ZW50cy8zLjEuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy9hc3NlcnRpb25zLmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL3BhcnNpbmcuanMiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvc3RhdGVib3QuanMiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJvdXRlSXNQb3NzaWJsZSIsImFzc2VydFJvdXRlIiwicmVxdWlyZSIsImlzU3RhdGVib3QiLCJkZWNvbXBvc2VSb3V0ZSIsIkRlZmVyIiwiT25jZSIsIlJldm9rYWJsZSIsIkxvZ2dlciIsIkFyZ1R5cGVFcnJvciIsImlzVGVtcGxhdGVMaXRlcmFsIiwiYXJnVHlwZUVycm9yIiwibWFjaGluZSIsImV4cGVjdGVkUm91dGUiLCJlcnIiLCJUeXBlRXJyb3IiLCJyb3V0ZSIsImV2ZXJ5Iiwic3RhdGUiLCJpbmRleCIsImxlbmd0aCIsIm5leHRTdGF0ZSIsImF2YWlsYWJsZVN0YXRlcyIsInN0YXRlc0F2YWlsYWJsZUZyb21IZXJlIiwicGFzc2VzIiwiaW5jbHVkZXMiLCJhc3NlcnRpb25JZCIsIm9wdGlvbnMiLCJkZXNjcmlwdGlvbiIsImZyb21TdGF0ZSIsInJ1biIsInBlcm1pdHRlZERldmlhdGlvbnMiLCJ0aW1lb3V0SW5NcyIsImxvZ0xldmVsIiwiY29uc29sZSIsInByZWZpeCIsIm5hbWUiLCJsb2ciLCJqb2luIiwiZnJvbVN0YXRlQWN0aW9uRm4iLCJyZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiIsInRvdGFsVGltZVRha2VuIiwiVGltZVRha2VuIiwic3RhdGVUaW1lVGFrZW4iLCJhc3NlcnRpb25UaW1lb3V0VGltZXIiLCJkZXZpYXRpb25zIiwicGVuZGluZyIsInVuZXhwZWN0ZWQiLCJjb25zdW1lUm91dGUiLCJyZXBvcnQiLCJUYWJsZSIsImZpbmFsaXNlUmVwb3J0IiwiYWRkUm93IiwibG9jayIsInRhYmxlIiwiY29udGVudCIsImVudGVyZWRTdGF0ZSIsImV4cGVjdGVkU3RhdGUiLCJzaGlmdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiRXJyb3IiLCJjbGVhclRpbWVvdXRBbmRSZXNvbHZlIiwiY2xlYXJUaW1lb3V0IiwicmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lciIsImNsZWFyVGltZW91dEFuZFJlamVjdCIsImJhaWxvdXQiLCJtZXNzYWdlIiwiY3VycmVudFN0YXRlIiwiaW5TdGF0ZSIsInNldFRpbWVvdXQiLCJyZXZva2UiLCJmbiIsIm9uU3dpdGNoaW5nIiwiY29sdW1ucyIsImFsaWdubWVudHMiLCJhbGlnbm1lbnQiLCJtYXAiLCJfIiwibG9ja2VkIiwiYXJncyIsIm9iaiIsInJlZHVjZSIsImFjYyIsImNvbCIsInJvdyIsInB1c2giLCJjb2xTaXplcyIsIk1hdGgiLCJtYXgiLCJwYWRMZWZ0Iiwic3RyIiwibGVuIiwicmVwZWF0IiwicGFkUmlnaHQiLCJzaXplcyIsImZvcm1hdEZpZWxkIiwidmFsdWUiLCJzaXplIiwiYWxpZ24iLCJvdXRwdXQiLCJmb3JtYXR0ZWRSb3ciLCJzdGFydFRpbWUiLCJEYXRlIiwibm93IiwiZm10IiwibnVtIiwiZGlnaXRzIiwidG9GaXhlZCIsInJlcGxhY2UiLCJkdXJhdGlvbiIsIlN0YXRlYm90IiwiZGVjb21wb3NlQ2hhcnQiLCJjeFBpcGUiLCJjeEFycm93IiwicnhEaXNhbGxvd2VkQ2hhcmFjdGVycyIsInJ4Q1JMRiIsInJ4Q29tbWVudCIsInJ4T3BlcmF0b3JzIiwicnhVbnNhZmUiLCJyeExpbmVDb250aW5hdGlvbnMiLCJSZWdFeHAiLCJ1bmlxIiwidGVtcGxhdGVMaXRlcmFsIiwicmF3TGluZXMiLCJmbGF0IiwiY29kZU9ubHkiLCJyZW1vdmVDb21tZW50cyIsImxpbmVzIiwiY29uZGVuc2VMaW5lcyIsImZsYXR0ZW5lZFJvdXRlIiwic2FuaXRpc2VMaW5lcyIsImxpbmVzVG9Qcm9jZXNzIiwibGluZXNPZlJvdXRlcyIsImRlY29tcG9zZUxpbmVJbnRvUm91dGUiLCJsaW5lc09mVHJhbnNpdGlvbnMiLCJkZWNvbXBvc2VSb3V0ZUludG9UcmFuc2l0aW9uIiwic3RhdGVzIiwicm91dGVLZXlzIiwiZmlsdGVyZWRSb3V0ZXMiLCJmaWx0ZXJlZFN0YXRlcyIsInRyYW5zaXRpb25zIiwic3BsaXQiLCJyb3V0ZXMiLCJhcnJheU9mU3RyaW5ncyIsInN0cmluZyIsInBhcnQiLCJmaWx0ZXIiLCJCb29sZWFuIiwibGluZSIsInRlc3QiLCJ0cmltIiwiY3VycmVudExpbmUiLCJwcmV2aW91c1N0YXRlcyIsInBhaXJzIiwiZnJvbVN0YXRlcyIsInRvU3RhdGVzIiwidG9TdGF0ZSIsIkV2ZW50RW1pdHRlciIsImlzUG9qbyIsImlzRXZlbnRFbWl0dGVyIiwiUmVmZXJlbmNlQ291bnRlciIsImxvZ1ByZWZpeCIsImNoYXJ0IiwidW5kZWZpbmVkIiwiaGlzdG9yeUxpbWl0IiwiY2FuV2FybiIsInN0YXJ0SW4iLCJ0cmFuc2l0aW9uSWQiLCJzdGF0ZUhpc3RvcnkiLCJzdGF0ZUhpc3RvcnlMaW1pdCIsImV2ZW50cyIsImludGVybmFsRXZlbnRzIiwiSU5URVJOQUxfRVZFTlRTIiwiU1RBVEVfQ0hBTkdJTkciLCJTVEFURV9DSEFOR0VEIiwiZW1pdEludGVybmFsRXZlbnQiLCJldmVudE5hbWUiLCJlbWl0Iiwib25JbnRlcm5hbEV2ZW50IiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsInN0YXRlc0hhbmRsZWQiLCJyb3V0ZXNIYW5kbGVkIiwiZXZlbnRzSGFuZGxlZCIsImFwcGx5SGl0Y2hlciIsImhpdGNoZXIiLCJmbk5hbWUiLCJoaXRjaGVyQWN0aW9ucyIsImVudGVyIiwiRW50ZXIiLCJFbWl0IiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJyb3V0ZUNoYXJ0IiwiYWN0aW9uT3JDb25maWciLCJhY3Rpb24iLCJfb24iLCJvbiIsIl90aGVuIiwidGhlbiIsIkFycmF5IiwiaXNBcnJheSIsImV2ZW50TmFtZXMiLCJhbGxTdGF0ZXMiLCJhbGxSb3V0ZXMiLCJkZWNvbXBvc2VkRXZlbnRzIiwiX2NvbmZpZ3MiLCJkZWNvbXBvc2VDb25maWdzIiwiY29uZmlncyIsImFsbENsZWFudXBGbnMiLCJpbmNyZWFzZSIsIm9uRXZlbnQiLCJldmVudFdhc0hhbmRsZWQiLCJzb21lIiwicGFzc2VkIiwidHJhbnNpdGlvbk5vT3AiLCJ0cmFuc2l0aW9uQ29uZmlncyIsInRyYW5zaXRpb24iLCJpbnZhbGlkU3RhdGVzIiwiaW52YWxpZFJvdXRlcyIsIndhcm4iLCJjb25maWciLCJwcmV2aW91c1N0YXRlIiwiYW55T3JGbiIsImNvbmRpdGlvbk1hdGNoZXMiLCJmbkFyZ3MiLCJJblN0YXRlIiwiY2FuVHJhbnNpdGlvblRvIiwidGVzdFN0YXRlcyIsIm5leHRTdGF0ZXMiLCJfc3RhdGUiLCJuZXh0Um91dGUiLCJpbmZvIiwiY2IiLCJkZWNyZWFzZVJlZkNvdW50IiwicmVtb3ZlRXZlbnQiLCJvblN3aXRjaGVkIiwib25FeGl0aW5nIiwiZGVjcmVhc2VSZWZDb3VudHMiLCJvbkV4aXRlZCIsIm9uRW50ZXJpbmciLCJvbkVudGVyZWQiLCJyZXNldCIsImxhc3RTdGF0ZSIsInByZXZSb3V0ZSIsImluc3BlY3QiLCJyZWZzIiwibG9nUmVmQ291bnRlckluZm8iLCJyZWZDb3VudGVyIiwidG9WYWx1ZSIsIl9fU1RBVEVCT1RfXyIsImhpc3RvcnkiLCJvblRyYW5zaXRpb25zIiwicGVyZm9ybVRyYW5zaXRpb25zIiwiZ2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJpdGVtIiwiaW5wdXQiLCJvbmUiLCJpbmRleE9mIiwiZGVmZXIiLCJ0aW1lciIsIl9mbiIsInJlc3VsdCIsInJldm9rZWQiLCJraW5kIiwiX3JlZnMiLCJleHBlY3RpbmciLCJyZWYiLCJjb3VudE9mIiwiZGVjcmVhc2UiLCJjb3VudCIsImtleXMiLCJzb3J0Iiwia2V5IiwiZXJyUHJlZml4IiwidHlwZU1hcCIsImFyZ01hcCIsImFyZ05hbWUiLCJhcmdUeXBlIiwic2lnbmF0dXJlIiwiYXJnIiwiZXJyb3JEZXNjIiwidHlwZU5hbWUiLCJ0eXBlTWF0Y2hlcyIsImxldmVsIiwiX2xldmVsIiwibm9uZSIsImNhbkxvZyIsImNhbkluZm8iLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FB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RUFBRTtBQUpFLEtBQUQsQ0FLTkQsTUFMTSxLQUtLLENBTGQ7QUFNRDs7QUFDRCxXQUFTMUgsT0FBVCxHQUFvQjtBQUNsQixXQUFPMEgsTUFBTSxJQUFJLENBQWpCO0FBQ0Q7O0FBQ0QsV0FBU0UsTUFBVCxHQUFtQjtBQUNqQixXQUFPRixNQUFNLElBQUksQ0FBakI7QUFDRDs7QUFDRCxXQUFTRyxPQUFULEdBQW9CO0FBQ2xCLFdBQU9ILE1BQU0sSUFBSSxDQUFqQjtBQUNEOztBQUNELFNBQU87QUFDTDFILFdBQU8sRUFBUEEsT0FESztBQUVMNEgsVUFBTSxFQUFOQSxNQUZLO0FBR0xDLFdBQU8sRUFBUEEsT0FISztBQUtMekQsUUFBSSxFQUFFO0FBQUE7O0FBQUEsYUFBYXlELE9BQU8sTUFBTSxZQUFBbFEsT0FBTyxFQUFDeU0sSUFBUiwyQkFBMUI7QUFBQSxLQUxEO0FBTUxyTCxTQUFLLEVBQUU7QUFBQTs7QUFBQSxhQUFhNk8sTUFBTSxNQUFNLGFBQUFqUSxPQUFPLEVBQUNvQixLQUFSLDRCQUF6QjtBQUFBLEtBTkY7QUFPTGpCLE9BQUcsRUFBRTtBQUFBOztBQUFBLGFBQWE4UCxNQUFNLE1BQU0sYUFBQWpRLE9BQU8sRUFBQ0csR0FBUiw0QkFBekI7QUFBQSxLQVBBO0FBUUwwTCxRQUFJLEVBQUU7QUFBQTs7QUFBQSxhQUFheEQsT0FBTyxNQUFNLGFBQUFySSxPQUFPLEVBQUM2TCxJQUFSLDRCQUExQjtBQUFBLEtBUkQ7QUFTTHNFLFNBQUssRUFBRTtBQUFBOztBQUFBLGFBQWEsYUFBQW5RLE9BQU8sRUFBQ21RLEtBQVIsNEJBQWI7QUFBQTtBQVRGLEdBQVA7QUFXRCxDIiwiZmlsZSI6Ii4vc3RhdGVib3QuZGV2LmJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzdGF0ZWJvdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJzdGF0ZWJvdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEFTU0VSVElPTiBIRUxQRVJTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcm91dGVJc1Bvc3NpYmxlLFxuICBhc3NlcnRSb3V0ZVxufVxuXG5jb25zdCB7IGlzU3RhdGVib3QgfSA9IHJlcXVpcmUoJy4vc3RhdGVib3QnKVxuY29uc3QgeyBkZWNvbXBvc2VSb3V0ZSB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcbmNvbnN0IHtcbiAgRGVmZXIsXG4gIE9uY2UsXG4gIFJldm9rYWJsZSxcbiAgTG9nZ2VyLFxuICBBcmdUeXBlRXJyb3IsXG4gIGlzVGVtcGxhdGVMaXRlcmFsXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcignc3RhdGVib3QuJylcblxuZnVuY3Rpb24gcm91dGVJc1Bvc3NpYmxlIChtYWNoaW5lLCBleHBlY3RlZFJvdXRlKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcigncm91dGVJc1Bvc3NpYmxlJyxcbiAgICB7IG1hY2hpbmU6IGlzU3RhdGVib3QsIGV4cGVjdGVkUm91dGU6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgbWFjaGluZSwgZXhwZWN0ZWRSb3V0ZVxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3Qgcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShleHBlY3RlZFJvdXRlKVxuICByZXR1cm4gcm91dGUuZXZlcnkoKHN0YXRlLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA9PT0gcm91dGUubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gcm91dGVbaW5kZXggKyAxXVxuICAgICAgY29uc3QgYXZhaWxhYmxlU3RhdGVzID0gbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZShzdGF0ZSlcbiAgICAgIGNvbnN0IHBhc3NlcyA9IGF2YWlsYWJsZVN0YXRlcy5pbmNsdWRlcyhuZXh0U3RhdGUpXG4gICAgICByZXR1cm4gcGFzc2VzXG4gICAgfVxuICB9KVxufVxuXG5sZXQgYXNzZXJ0aW9uSWQgPSAwXG5cbi8qKlxuICoge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9IG9wdGlvbnMuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBhc3NlcnRSb3V0ZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dXG4gKiAgRGVzY3JpYmUgdGhlIHN1Y2Nlc3MtY29uZGl0aW9uIGZvciB0aGlzIGFzc2VydGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbZnJvbVN0YXRlPVwiXCJdXG4gKiAgV2FpdCBmb3IgdGhlIG1hY2hpbmUgdG8gYmUgaW4gdGhpcyBzdGF0ZSBiZWZvcmUgYXNzZXJ0aW9uIGJlZ2lucy5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IFtydW5dXG4gKiAgUnVuIHRoaXMgZnVuY3Rpb24ganVzdCBiZWZvcmUgc3RhcnRpbmcgdGhlIGFzc2VydGlvbi5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGVybWl0dGVkRGV2aWF0aW9ucz0wXVxuICogIElmIHdlIGhpdCBhbiB1bmV4cGVjdGVkIHN0YXRlIGR1cmluZyBhc3NlcnRpb24sIHRoaXMgaXMgYSBcImRldmlhdGlvblwiLlxuICogIEl0IG1pZ2h0IGJlIHRoYXQgdGhlIEZTTSB3aWxsIGNvbWUgYmFjayB0byB0aGUgZXhwZWN0ZWQgc3RhdGUgYWdhaW5cbiAqICBhZnRlciBhIGNlcnRhaW4gbnVtYmVyIG9mIHRoZXNlLiBGb3IgZXhhbXBsZSwgaWYgeW91ciBGU00gaGFzIGFcbiAqICBcInJldHJ5XCIgcm91dGUgY29uZmlndXJlZCwgdGhpcyBudW1iZXIgY2FuIGFjY291bnQgZm9yIGl0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFt0aW1lb3V0SW5Ncz0xMDAwXVxuICogIFBlcm1pdHRlZCBsZW5ndGggb2YgdGltZSBmb3IgdGhlIGVudGlyZSBhc3NlcnRpb24sIGluIG1pbGxpc2Vjb25kcy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbG9nTGV2ZWw9M11cbiAqICBOb3JtYWxseSB3ZSB3YW50IGxvZ3MgZm9yIGFzc2VydGlvbnMsIHJpZ2h0PyBXZWxsLCB5b3UgY2FuIHR1bmVcbiAqICB0aGVtIGp1c3QgbGlrZSB5b3UgY2FuIHdpdGgge0BsaW5rICNzdGF0ZWJvdG9wdGlvbnN8c3RhdGVib3RPcHRpb25zfS5cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRSb3V0ZSAobWFjaGluZSwgZXhwZWN0ZWRSb3V0ZSwgb3B0aW9ucykge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2Fzc2VydFJvdXRlJyxcbiAgICB7IG1hY2hpbmU6IGlzU3RhdGVib3QsIGV4cGVjdGVkUm91dGU6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgbWFjaGluZSwgZXhwZWN0ZWRSb3V0ZVxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgYXNzZXJ0aW9uSWQgKz0gMVxuXG4gIGNvbnN0IHtcbiAgICBkZXNjcmlwdGlvbiA9ICdBc3NlcnRpb24gY29tcGxldGUnLFxuICAgIGZyb21TdGF0ZSA9ICcnLFxuICAgIHJ1biA9ICgpID0+IHt9LFxuICAgIHBlcm1pdHRlZERldmlhdGlvbnMgPSAwLFxuICAgIHRpbWVvdXRJbk1zID0gMTAwMCxcbiAgICBsb2dMZXZlbCA9IDNcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuXG4gIGNvbnN0IHByZWZpeCA9IGBTdGF0ZWJvdFske21hY2hpbmUubmFtZSgpfV06IGFJZDwke2Fzc2VydGlvbklkfT5gXG4gIGNvbnN0IHJvdXRlID0gZGVjb21wb3NlUm91dGUoZXhwZWN0ZWRSb3V0ZSlcblxuICBjb25zb2xlLmxvZyhgXFxuJHtwcmVmaXh9OiBBc3NlcnRpbmcgcm91dGU6IFske3JvdXRlLmpvaW4oJyA+ICcpfV1gKVxuICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9OiA+IEFzc2VydGlvbiB3aWxsIHN0YXJ0IGZyb20gc3RhdGU6IFwiJHtmcm9tU3RhdGV9XCJgKVxuXG4gIGNvbnN0IGZyb21TdGF0ZUFjdGlvbkZuID0gRGVmZXIocnVuKVxuICBsZXQgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSAoKSA9PiB7IH1cblxuICBjb25zdCB0b3RhbFRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gIGxldCBzdGF0ZVRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gIGxldCBhc3NlcnRpb25UaW1lb3V0VGltZXJcbiAgbGV0IGRldmlhdGlvbnMgPSAwXG4gIGxldCBwZW5kaW5nID0gdHJ1ZVxuICBsZXQgdW5leHBlY3RlZCA9IGZhbHNlXG5cbiAgY29uc3QgY29uc3VtZVJvdXRlID0gWy4uLnJvdXRlXVxuICBjb25zdCByZXBvcnQgPSBUYWJsZShcbiAgICBbJ3N0YXRlJywgJ2V4cGVjdGVkJywgJ2luZm8nLCAndG9vayddLFxuICAgIFsnY2VudGVyJywgJ2NlbnRlcicsICdsZWZ0JywgJ3JpZ2h0J11cbiAgKVxuXG4gIGNvbnN0IGZpbmFsaXNlUmVwb3J0ID0gT25jZShlcnIgPT4ge1xuICAgIGFkZFJvdygnJywgJycsICcnLCAnVE9UQUw6ICcgKyB0b3RhbFRpbWVUYWtlbigpKVxuICAgIHJlcG9ydC5sb2NrKClcbiAgICBjb25zb2xlLmxvZyhgXFxuJHtwcmVmaXh9OiAke2Rlc2NyaXB0aW9ufTogWyR7ZXJyID8gJ0ZBSUxFRCcgOiAnU1VDQ0VTUyd9XWApXG4gICAgY29uc29sZS50YWJsZShyZXBvcnQuY29udGVudCgpKVxuICAgIHJldHVybiBlcnJcbiAgfSlcblxuICBjb25zdCB7IGFkZFJvdyB9ID0gcmVwb3J0XG4gIGZ1bmN0aW9uIGVudGVyZWRTdGF0ZSAoc3RhdGUpIHtcbiAgICBpZiAocGVuZGluZykge1xuICAgICAgYWRkUm93KHN0YXRlLCAnLScsICdQRU5ESU5HJylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZVswXVxuICAgICAgaWYgKGV4cGVjdGVkU3RhdGUgPT09IHN0YXRlKSB7XG4gICAgICAgIGFkZFJvdyhzdGF0ZSwgZXhwZWN0ZWRTdGF0ZSwgdW5leHBlY3RlZCA/ICdSRUFMSUdORUQnIDogJ09LQVknLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gZmFsc2VcbiAgICAgICAgY29uc3VtZVJvdXRlLnNoaWZ0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZFJvdyhzdGF0ZSwgZXhwZWN0ZWRTdGF0ZSwgJ1dST05HIFNUQVRFJywgc3RhdGVUaW1lVGFrZW4oKSlcbiAgICAgICAgdW5leHBlY3RlZCA9IHRydWVcbiAgICAgICAgZGV2aWF0aW9ucyArPSAxXG4gICAgICB9XG4gICAgICBzdGF0ZVRpbWVUYWtlbiA9IFRpbWVUYWtlbigpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAoY29uc3VtZVJvdXRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVqZWN0KGZpbmFsaXNlUmVwb3J0KG5ldyBFcnJvcignTk8gUk9VVEUgVE8gVEVTVCcpKSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyVGltZW91dEFuZFJlc29sdmUgPSAoLi4uYXJncykgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGFzc2VydGlvblRpbWVvdXRUaW1lcilcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIoKVxuICAgICAgcmVzb2x2ZSguLi5hcmdzKVxuICAgIH1cblxuICAgIGNvbnN0IGNsZWFyVGltZW91dEFuZFJlamVjdCA9IGVyciA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZWplY3QoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGJhaWxvdXQgPSBtZXNzYWdlID0+IHtcbiAgICAgIHdoaWxlIChjb25zdW1lUm91dGUubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgICBhZGRSb3cobWFjaGluZS5jdXJyZW50U3RhdGUoKSwgYCgke2V4cGVjdGVkU3RhdGV9KWAsIG1lc3NhZ2UpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgfVxuICAgICAgY2xlYXJUaW1lb3V0QW5kUmVqZWN0KGZpbmFsaXNlUmVwb3J0KG5ldyBFcnJvcihtZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgaWYgKG1hY2hpbmUuaW5TdGF0ZShmcm9tU3RhdGUpKSB7XG4gICAgICBwZW5kaW5nID0gZmFsc2VcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgIH1cblxuICAgIGNvbnN0IHsgcmV2b2tlLCBmbiB9ID0gUmV2b2thYmxlKHN0YXRlID0+IHtcbiAgICAgIGFzc2VydGlvblRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBiYWlsb3V0KCdUSU1FT1VUJylcbiAgICAgIH0sIHRpbWVvdXRJbk1zKVxuXG4gICAgICBlbnRlcmVkU3RhdGUoc3RhdGUpXG4gICAgICBpZiAocGVuZGluZyAmJiBzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9IGZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIH1cbiAgICAgIGlmIChkZXZpYXRpb25zID4gcGVybWl0dGVkRGV2aWF0aW9ucykge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBiYWlsb3V0KCdUT08gTUFOWSBERVZJQVRJT05TJylcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZShmaW5hbGlzZVJlcG9ydCgpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyID0gbWFjaGluZS5vblN3aXRjaGluZyhmbilcbiAgfSlcbn1cblxuZnVuY3Rpb24gVGFibGUgKGNvbHVtbnMgPSBbXSwgYWxpZ25tZW50cyA9IFtdKSB7XG4gIGNvbnN0IHRhYmxlID0gW11cbiAgY29uc3QgYWxpZ25tZW50ID0gY29sdW1ucy5tYXAoKF8sIGluZGV4KSA9PiBhbGlnbm1lbnRzW2luZGV4XSB8fCAnY2VudGVyJylcblxuICBsZXQgbG9ja2VkID0gZmFsc2VcbiAgZnVuY3Rpb24gbG9jayAoKSB7XG4gICAgbG9ja2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUm93ICguLi5hcmdzKSB7XG4gICAgaWYgKGxvY2tlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IG9iaiA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJvdyA9IGFyZ3NbaW5kZXhdIHx8ICcnXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtjb2xdOiByb3dcbiAgICAgIH1cbiAgICB9LCB7fSlcbiAgICB0YWJsZS5wdXNoKG9iailcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbFNpemVzICgpIHtcbiAgICByZXR1cm4gdGFibGUucmVkdWNlKChhY2MsIHJvdykgPT4gY29sdW1ucy5tYXAoKGNvbCwgaW5kZXgpID0+IE1hdGgubWF4KHJvd1tjb2xdLmxlbmd0aCwgYWNjW2luZGV4XSkpLCBjb2x1bW5zLm1hcCgoKSA9PiAwKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhZExlZnQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuIHN0ciArICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aClcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhZFJpZ2h0IChzdHIsIGxlbikge1xuICAgIHJldHVybiAnICcucmVwZWF0KGxlbiAtIHN0ci5sZW5ndGgpICsgc3RyXG4gIH1cblxuICBmdW5jdGlvbiBjb250ZW50ICgpIHtcbiAgICBjb25zdCBzaXplcyA9IGNvbFNpemVzKClcbiAgICBmdW5jdGlvbiBmb3JtYXRGaWVsZCAodmFsdWUsIGluZGV4KSB7XG4gICAgICBjb25zdCBzaXplID0gc2l6ZXNbaW5kZXhdXG4gICAgICBjb25zdCBhbGlnbiA9IGFsaWdubWVudFtpbmRleF1cbiAgICAgIGlmIChhbGlnbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHJldHVybiBwYWRMZWZ0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgaWYgKGFsaWduID09PSAncmlnaHQnKSB7XG4gICAgICAgIHJldHVybiBwYWRSaWdodCh2YWx1ZSwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICBjb25zdCBvdXRwdXQgPSB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRSb3cgPSBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjb2wsIGluZGV4KSA9PiAoe1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtjb2xdOiBmb3JtYXRGaWVsZChyb3dbY29sXSwgaW5kZXgpXG4gICAgICB9KSwge30pXG4gICAgICByZXR1cm4gWy4uLmFjYywgZm9ybWF0dGVkUm93XVxuICAgIH0sIFtdKVxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9jazogbG9jayxcbiAgICBhZGRSb3c6IGFkZFJvdyxcbiAgICBjb250ZW50OiBjb250ZW50XG4gIH1cbn1cblxuZnVuY3Rpb24gVGltZVRha2VuICgpIHtcbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXG4gIGZ1bmN0aW9uIGZtdCAobnVtLCBkaWdpdHMpIHtcbiAgICByZXR1cm4gbnVtLnRvRml4ZWQoZGlnaXRzKS5yZXBsYWNlKC9cXC4wKyQvLCAnJylcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lXG5cbiAgICBpZiAoZHVyYXRpb24gPCA1MDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24pfSBtc2BcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uIDwgNTAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDIpfSBzIGBcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uIDwgNjAwMDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwLCAxKX0gcyBgXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwIC8gNjAsIDEpfSBtIGBcbiAgICB9XG4gIH1cbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEVYUE9SVFNcbi8vXG5cbmNvbnN0IHsgU3RhdGVib3QsIGlzU3RhdGVib3QgfSA9IHJlcXVpcmUoJy4vc3RhdGVib3QnKVxuY29uc3QgeyBhc3NlcnRSb3V0ZSwgcm91dGVJc1Bvc3NpYmxlIH0gPSByZXF1aXJlKCcuL2Fzc2VydGlvbnMnKVxuY29uc3QgeyBkZWNvbXBvc2VDaGFydCB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcblxuLyoqXG4gKiA8aW1nIHNyYz1cIi4vbG9nby1mdWxsLnBuZ1wiIHN0eWxlPVwibWF4LXdpZHRoOiAyNTVweDsgbWFyZ2luOiAxMHB4IDA7XCIgLz5cbiAqXG4gKiBXcml0ZSBtb3JlIHJvYnVzdCBhbmQgdW5kZXJzdGFuZGFibGUgcHJvZ3JhbXMuXG4gKlxuICogU3RhdGVib3QgaG9wZXMgdG8gbWFrZSBbRmluaXRlIFN0YXRlIE1hY2hpbmVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaW5pdGUtc3RhdGVfbWFjaGluZSkgKEZTTXMpIGEgbGl0dGxlIG1vcmUgYWNjZXNzaWJsZS5cbiAqXG4gKiBZb3UncmUgcmVhZGluZyB0aGUgZG9jdW1lbnRhdGlvbi4gT3RoZXIgZXhpdHMgYXJlOlxuICpcbiAqIC0gVGhlIFtSRUFETUUgZmlsZV0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdC9ibG9iL21hc3Rlci9SRUFETUUubWQpXG4gKiAtIFRoZSBbR2l0aHViIFJlcG9dKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3QpXG4gKiAtIFRoZSBzaGVsbC1zY3JpcHQgdmVyc2lvbiwgW1N0YXRlYm90LXNoXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90LXNoKVxuICpcbiAqIFN0YXRlYm90IHdhcyB3cml0dGVuIGJ5IFtDb25hbiBUaGVvYmFsZF0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci8pIGFuZFxuICogaXMgW0lTQyBsaWNlbnNlZF0oLi4vTElDRU5TRSkuXG4gKlxuICogIyMjIEp1bXAgcmlnaHQgaW5cbiAqXG4gKiBZb3UgY2FuIGluc3RhbGwgU3RhdGVib3QgaW50byB5b3VyIGBucG1gIHByb2plY3Q6XG4gKlxuICogYGBgc2hcbiAqIG5wbSBpIHN0YXRlYm90XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHN0YXRlYm90IGZyb20gJ3N0YXRlYm90J1xuICogYGBgXG4gKlxuICogT3Igbm9uLWBucG1gIHByb2plY3Q6XG4gKlxuICogYGBganNcbiAqIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly91bnBrZy5jb20vc3RhdGVib3RAMi4wLjAvZGlzdC9zdGF0ZWJvdC5taW4uYnJvd3Nlci5qc1wiPjwvc2NyaXB0PlxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHsgU3RhdGVib3QgfSA9IHN0YXRlYm90XG4gKiAvLyBNYWtlIG1hY2hpbmVzIHdpdGggU3RhdGVib3QoKVxuICpcbiAqIGNvbnN0IHsgaXNTdGF0ZWJvdCwgcm91dGVJc1Bvc3NpYmxlLCBhc3NlcnRSb3V0ZSB9ID0gc3RhdGVib3RcbiAqIC8vIFRoZXNlIGFyZSBhc3NlcnRpb24gaGVscGVycyB5b3UgY2FuIHVzZSBmb3IgdGVzdGluZ1xuICogYGBgXG4gKlxuICogIyMjIE9wZW4gdGhlIGRldmVsb3Blci1jb25zb2xlIDopXG4gKlxuICogSSd2ZSBpbmNsdWRlZCBTdGF0ZWJvdCBpbiB0aGlzIHBhZ2UuIE9wZW4gdGhlIGRldmVsb3Blci1jb25zb2xlIHRvXG4gKiBmb2xsb3cgYWxvbmcgd2l0aCB0aGUgZXhhbXBsZXMgYmVsb3c6XG4gKlxuICogYGBganNcbiAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3Byb21pc2UtbGlrZScsIHtcbiAqICAgY2hhcnQ6IGBcbiAqICAgICAvLyBUaGlzIG9uZSB3aWxsIGJlaGF2ZSBhIGJpdCBsaWtlIGEgUHJvbWlzZVxuICogICAgIGlkbGUgLT4gcGVuZGluZyAtPlxuICogICAgICAgcmVzb2x2ZWQgfCByZWplY3RlZFxuICpcbiAqICAgICAvLyAuLi5hbmQgd2UncmUgZG9uZVxuICogICAgIHJlc29sdmVkIC0+IGRvbmVcbiAqICAgICByZWplY3RlZCAtPiBkb25lXG4gKiAgIGAsXG4gKiAgIHN0YXJ0SW46ICdpZGxlJ1xuICogfSlcbiAqXG4gKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbygncGVuZGluZycpXG4gKiAvLyB0cnVlXG4gKlxuICogbWFjaGluZS5lbnRlcigncGVuZGluZycpXG4gKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAqIC8vIFtcInJlc29sdmVkXCIsIFwicmVqZWN0ZWRcIl1cbiAqIGBgYFxuICpcbiAqIFdlIGNhbiBob29rLXVwIGV2ZW50cyB3aXRoIHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnMgLnBlcmZvcm1UcmFuc2l0aW9ucygpfTpcbiAqXG4gKiBgYGBqc1xuICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICogICdwZW5kaW5nIC0+IHJlc29sdmVkJzoge1xuICogICAgb246ICdkYXRhLWxvYWRlZCdcbiAqICB9LFxuICogICdwZW5kaW5nIC0+IHJlamVjdGVkJzoge1xuICogICAgb246IFsndGltZW91dCcsICdkYXRhLWVycm9yJ10sXG4gKiAgICB0aGVuOiAobXNnKSA9PiB7XG4gKiAgICAgIGNvbnNvbGUud2FybignVWggb2guLi4nLCBtc2cpXG4gKiAgICB9XG4gKiAgfSxcbiAqICAncmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lJzoge1xuICogICAgb246ICd0aGF0cy1hbGwtZm9sa3MnXG4gKiAgfVxuICogfSlcbiAqXG4gKiBtYWNoaW5lLmVtaXQoJ2RhdGEtZXJyb3InLCAnRGlkIHlvdSBoZWFyIHRoYXQ/JylcbiAqIGBgYFxuICpcbiAqIEhlcmUncyB0aGUgQVBJOlxuICpcbiAqIHwgSGl0Y2hlcnMgfCBTdGF0dXMgfCBBY3Rpb25zIHxcbiAqIHwtfC18LXxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnQgLm9uRXZlbnQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtY2FudHJhbnNpdGlvbnRvIC5jYW5UcmFuc2l0aW9uVG8oKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtc3RhdGVzYXZhaWxhYmxlZnJvbWhlcmUgLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX0gLyB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnRyYW5zaXRpb25zIC5vblRyYW5zaXRpb25zKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZSAuY3VycmVudFN0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXByZXZpb3Vzc3RhdGUgLnByZXZpb3VzU3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeSAuaGlzdG9yeSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gLyB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJpbmcgLm9uRW50ZXJpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZSAuaW5TdGF0ZSgpfSAvIHtAbGluayAjaW5zdGF0ZS1zdGF0ZS1vdXRwdXR3aGVudHJ1ZS0xIC5JblN0YXRlKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbXJlc2V0IC5yZXNldCgpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRlZCAub25FeGl0ZWQoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5mbyAuaW5mbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21pbnNwZWN0IC5pbnNwZWN0KCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW5hbWUgLm5hbWUoKX0gfCAgfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hpbmcgLm9uU3dpdGNoaW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoZWQgLm9uU3dpdGNoZWQoKX0gfCAgfCAgfFxuICpcbiAqIDxpbWcgc3JjPVwiLi9sb2dvLXNtYWxsLnBuZ1wiIHN0eWxlPVwibWF4LXdpZHRoOiA3NXB4OyBtYXJnaW46IDE1cHggMCAwIDVweDtcIiAvPlxuICpcbiAqIEBtb2R1bGUgc3RhdGVib3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IGBvYmplY3RgLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xlbW1pbmcnLCB7XG4gICAqICAgY2hhcnQ6IGBcbiAgICogICAgIHdhbGtpbmcgLT4gKGRpZ2dpbmcgfCBidWlsZGluZyB8IGZhbGxpbmcpIC0+XG4gICAqICAgICAgIHdhbGtpbmdcbiAgICpcbiAgICogICAgIGZhbGxpbmcgLT4gc3BsYXR0aW5nXG4gICAqICAgICB3YWxraW5nIC0+IGV4aXRpbmdcbiAgICogICBgXG4gICAqIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqICBHaXZlIHlvdXIgU3RhdGVib3QgYSBuYW1lLiBVc2VkIGZvciBsb2dnaW5nIGFuZCBieSB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gICAqIEBwYXJhbSB7c3RhdGVib3RPcHRpb25zfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtzdGF0ZWJvdEZzbX1cbiAgICovXG4gIFN0YXRlYm90LFxuXG4gIC8qKlxuICAgKiBUZXN0cyB0aGF0IGFuIG9iamVjdCBpcyBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICAgKlxuICAgKiBpc1N0YXRlYm90KG1hY2hpbmUpXG4gICAqIC8vIHRydWVcbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc1N0YXRlYm90LFxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCBhIGNlcnRhaW4gcm91dGUgY2FuIGJlIGZvbGxvd2VkIGJ5IGFcbiAgICoge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gICAqXG4gICAqIFRoaXMgbWVyZWx5IHRlc3RzIHRoYXQgYSBjZXJ0YWluIHBhdGggY2FuIGJlIHRha2VuIHRocm91Z2ggYVxuICAgKiBzdGF0ZS1tYWNoaW5lLiBJdCBkb2Vzbid0IGFzc2VydCB0aGF0IHRoZSBzdGF0ZXMgYXJlIG1vdmVkLXRocm91Z2hcbiAgICogd2hpbGUgdGhlIG1hY2hpbmUgaXMgd29ya2luZywgYXMgd2l0aFxuICAgKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdGF0ZWJvdEZzbX0gbWFjaGluZVxuICAgKiAgVGhlIG1hY2hpbmUgdG8gdGVzdCB0aGUgcm91dGUgb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSByb3V0ZVxuICAgKiAgVGhlIHJvdXRlIHRvIHRlc3QgYXMgYW4gYXJyb3ctZGVsaW1pdGVkIHN0cmluZzpcbiAgICpcbiAgICogIGBcbiAgICogIFwiaWRsZSAtPiBwZW5kaW5nIC0+IHN1Y2Nlc3MgLT4gZG9uZVwiXG4gICAqICBgXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAgICpcbiAgICogcm91dGVJc1Bvc3NpYmxlKG1hY2hpbmUsXG4gICAqICAgJ3dhbGtpbmcgLT4gZmFsbGluZyAtPiBzcGxhdHRpbmcgLT4gd2Fsa2luZydcbiAgICogKVxuICAgKiAvLyBmYWxzZVxuICAgKi9cbiAgcm91dGVJc1Bvc3NpYmxlLFxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCBhIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219IHRyYWNlZCB0aGUgcm91dGUgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBXaGVyZWFzIHtAbGluayAjc3RhdGVib3Ryb3V0ZWlzcG9zc2libGV8cm91dGVJc1Bvc3NpYmxlKCl9IG9ubHkgY2hlY2tzXG4gICAqIHRoYXQgYSBwYXJ0aWN1bGFyIHJvdXRlIGNhbiBiZSBmb2xsb3dlZCwgYGFzc2VydFJvdXRlYCB3aWxsIGhvb2staW50b1xuICAgKiBhIG1hY2hpbmUgYW5kIHdhaXQgZm9yIGl0IHRvIHRyYWNlIHRoZSBzcGVjaWZpZWQgcGF0aCB3aXRoaW4gYVxuICAgKiB0aW1lb3V0IHBlcmlvZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAYXN5bmNcbiAgICogQHBhcmFtIHtzdGF0ZWJvdEZzbX0gbWFjaGluZVxuICAgKiAgVGhlIG1hY2hpbmUgdG8gcnVuIHRoZSBhc3NlcnRpb24gb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBleHBlY3RlZFJvdXRlXG4gICAqICBUaGUgZXhwZWN0ZWQgcm91dGUgYXMgYW4gYXJyb3ctZGVsaW1pdGVkIHN0cmluZzpcbiAgICpcbiAgICogIGBcbiAgICogIFwiaWRsZSAtPiBwZW5kaW5nIC0+IHN1Y2Nlc3MgLT4gZG9uZVwiXG4gICAqICBgXG4gICAqIEBwYXJhbSB7YXNzZXJ0Um91dGVPcHRpb25zfSBbb3B0aW9uc11cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICAgKlxuICAgKiBhc3NlcnRSb3V0ZShcbiAgICogICBtYWNoaW5lLCAncHJlcGFyZSAtPiBkZWJvdW5jZSAtPiBzZW5kaW5nIC0+IGRvbmUgLT4gaWRsZScsXG4gICAqICAge1xuICAgKiAgICAgZGVzY3JpcHRpb246ICdFbWFpbCBzZW50IHdpdGggbm8gaXNzdWVzJyxcbiAgICogICAgIGZyb21TdGF0ZTogJ2lkbGUnLFxuICAgKiAgICAgdGltZW91dEluTXM6IDEwMDAgKiAyMCxcbiAgICogICAgIHBlcm1pdHRlZERldmlhdGlvbnM6IDAsXG4gICAqICAgICBsb2dMZXZlbDogM1xuICAgKiAgIH1cbiAgICogKVxuICAgKiAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnQXNzZXJ0aW9uIHBhc3NlZCEnKSlcbiAgICogLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGBXaG9vcHM6ICR7ZXJyfWApKVxuICAgKlxuICAgKiBtYWNoaW5lLmVudGVyKCdpZGxlJylcbiAgICovXG4gIGFzc2VydFJvdXRlLFxuXG4gIC8qKlxuICAgKiBEZWNvbXBvc2UgYSB7QGxpbmsgc3RhdGVib3RDaGFydH0gaW50byBhbiBvYmplY3Qgb2YgYHN0YXRlc2AsIGByb3V0ZXNgLFxuICAgKiBhbmQgYHRyYW5zaXRpb25zYC5cbiAgICpcbiAgICogU3RhdGVib3QoKSB1c2VzIHRoaXMgaW50ZXJuYWxseSB0byBwYXJzZSBjaGFydHMuIEV4cG9zZWQgZm9yIGRlYnVnZ2luZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0YXRlYm90Q2hhcnR9IGNoYXJ0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnRgXG4gICAqICAgcGVuZGluZyAtPlxuICAgKiAgICAgc3VjY2VzcyB8IGZhaWx1cmVcbiAgICogYFxuICAgKiAvLyBzdGF0ZXMgPSBbJ3BlbmRpbmcnLCAnc3VjY2VzcycsICdmYWlsdXJlJ11cbiAgICogLy8gcm91dGVzID0gWyAncGVuZGluZy0+c3VjY2VzcycsICdwZW5kaW5nLT5mYWlsdXJlJ11cbiAgICogLy8gdHJhbnNpdGlvbnMgPSBbXG4gICAqIC8vICAgWydwZW5kaW5nJywgJ3N1Y2Nlc3MnXSxcbiAgICogLy8gICBbJ3BlbmRpbmcnLCAnZmFpbHVyZSddXG4gICAqIC8vIF1cbiAgICovXG4gIGRlY29tcG9zZUNoYXJ0XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBDSEFSVC9ST1VURSBQQVJTSU5HXG4vL1xuXG5jb25zdCBjeFBpcGUgPSAnfCdcbmNvbnN0IGN4QXJyb3cgPSAnLT4nXG5cbmNvbnN0IHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMgPSAvW15hLXowLTkhQCMkJV4mKjpfKz08Pnx+LlxceDJEXS9naVxuY29uc3QgcnhDUkxGID0gL1tcXHJcXG5dL1xuY29uc3QgcnhDb21tZW50ID0gLyhcXC9cXC9bXlxcblxccl0qKS9cblxuY29uc3QgcnhPcGVyYXRvcnMgPSBbY3hQaXBlLCBjeEFycm93XVxuICAubWFwKHJ4VW5zYWZlID0+IHJ4VW5zYWZlLnJlcGxhY2UoJ3wnLCAnXFxcXHwnKSlcbiAgLmpvaW4oJ3wnKVxuXG5jb25zdCByeExpbmVDb250aW5hdGlvbnMgPSBuZXcgUmVnRXhwKGAoJHtyeE9wZXJhdG9yc30pJGApXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjeFBpcGUsXG4gIGN4QXJyb3csXG4gIHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsXG4gIGRlY29tcG9zZUNoYXJ0LFxuICBkZWNvbXBvc2VSb3V0ZVxufVxuXG5jb25zdCB7IHVuaXEsIEFyZ1R5cGVFcnJvciwgaXNUZW1wbGF0ZUxpdGVyYWwgfSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlICh0ZW1wbGF0ZUxpdGVyYWwpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VSb3V0ZScsXG4gICAgeyB0ZW1wbGF0ZUxpdGVyYWw6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgdGVtcGxhdGVMaXRlcmFsXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCByYXdMaW5lcyA9IFt0ZW1wbGF0ZUxpdGVyYWxdLmZsYXQoKVxuICBjb25zdCBjb2RlT25seSA9IHJlbW92ZUNvbW1lbnRzKHJhd0xpbmVzKVxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlTGluZXMoY29kZU9ubHkpXG4gIGNvbnN0IGZsYXR0ZW5lZFJvdXRlID0gc2FuaXRpc2VMaW5lcyhsaW5lcykuZmxhdCgyKVxuICByZXR1cm4gZmxhdHRlbmVkUm91dGVcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlQ2hhcnQgKHRlbXBsYXRlTGl0ZXJhbCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZUNoYXJ0JyxcbiAgICB7IHRlbXBsYXRlTGl0ZXJhbDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICB0ZW1wbGF0ZUxpdGVyYWxcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IHJhd0xpbmVzID0gW3RlbXBsYXRlTGl0ZXJhbF0uZmxhdCgpXG4gIGNvbnN0IGNvZGVPbmx5ID0gcmVtb3ZlQ29tbWVudHMocmF3TGluZXMpXG4gIGNvbnN0IGxpbmVzID0gY29uZGVuc2VMaW5lcyhjb2RlT25seSlcbiAgY29uc3QgbGluZXNUb1Byb2Nlc3MgPSBzYW5pdGlzZUxpbmVzKGxpbmVzKVxuICBjb25zdCBsaW5lc09mUm91dGVzID0gbGluZXNUb1Byb2Nlc3NcbiAgICAubWFwKGRlY29tcG9zZUxpbmVJbnRvUm91dGUpXG4gICAgLmZsYXQoMSlcbiAgY29uc3QgbGluZXNPZlRyYW5zaXRpb25zID0gbGluZXNPZlJvdXRlc1xuICAgIC5tYXAoZGVjb21wb3NlUm91dGVJbnRvVHJhbnNpdGlvbilcbiAgICAuZmxhdCgxKVxuICBjb25zdCBzdGF0ZXMgPSBbXVxuICBjb25zdCByb3V0ZUtleXMgPSBsaW5lc09mVHJhbnNpdGlvbnMubWFwKHJvdXRlID0+IHtcbiAgICBzdGF0ZXMucHVzaCguLi5yb3V0ZSlcbiAgICByZXR1cm4gcm91dGUuam9pbihjeEFycm93KVxuICB9KVxuICBjb25zdCBmaWx0ZXJlZFJvdXRlcyA9IHVuaXEocm91dGVLZXlzKVxuICBjb25zdCBmaWx0ZXJlZFN0YXRlcyA9IHVuaXEoc3RhdGVzKVxuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb25zOiBmaWx0ZXJlZFJvdXRlcy5tYXAocm91dGUgPT4gcm91dGUuc3BsaXQoY3hBcnJvdykpLFxuICAgIHJvdXRlczogZmlsdGVyZWRSb3V0ZXMsXG4gICAgc3RhdGVzOiBmaWx0ZXJlZFN0YXRlc1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNvbW1lbnRzIChhcnJheU9mU3RyaW5ncykge1xuICByZXR1cm4gYXJyYXlPZlN0cmluZ3NcbiAgICAucmVkdWNlKChhY2MsIHN0cmluZykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgLi4uc3RyaW5nLnNwbGl0KHJ4Q1JMRikubWFwKHBhcnQgPT4gcGFydFxuICAgICAgICAgIC5yZXBsYWNlKHJ4Q29tbWVudCwgJycpKVxuICAgICAgXVxuICAgIH0sIFtdKVxuICAgIC5maWx0ZXIoQm9vbGVhbilcbn1cblxuZnVuY3Rpb24gY29uZGVuc2VMaW5lcyAobGluZXMpIHtcbiAgcmV0dXJuIGxpbmVzLnJlZHVjZSgoYWNjLCBsaW5lKSA9PiByeExpbmVDb250aW5hdGlvbnMudGVzdChsaW5lLnRyaW0oKSlcbiAgICA/IHtcbiAgICAgIGxpbmVzOiBhY2MubGluZXMsXG4gICAgICBjdXJyZW50TGluZTogYWNjLmN1cnJlbnRMaW5lICsgbGluZVxuICAgIH1cbiAgICA6IHtcbiAgICAgIGxpbmVzOiBbLi4uYWNjLmxpbmVzLCBhY2MuY3VycmVudExpbmUgKyBsaW5lXSxcbiAgICAgIGN1cnJlbnRMaW5lOiAnJ1xuICAgIH0sIHtcbiAgICBsaW5lczogW10sXG4gICAgY3VycmVudExpbmU6ICcnXG4gIH0pLmxpbmVzXG59XG5cbmZ1bmN0aW9uIHNhbml0aXNlTGluZXMgKGxpbmVzKSB7XG4gIHJldHVybiBsaW5lcy5tYXAobGluZSA9PiBsaW5lLnNwbGl0KGN4QXJyb3cpLm1hcChzdHIgPT4gc3RyXG4gICAgLnJlcGxhY2UocnhEaXNhbGxvd2VkQ2hhcmFjdGVycywgJycpXG4gICAgLnNwbGl0KGN4UGlwZSlcbiAgICAubWFwKHBhcnQgPT4gcGFydC50cmltKCkpKSlcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlTGluZUludG9Sb3V0ZSAobGluZSkge1xuICByZXR1cm4gbGluZS5yZWR1Y2UoKGFjYywgc3RhdGVzKSA9PlxuICAgIGFjYyA9PT0gZmFsc2VcbiAgICAgID8ge1xuICAgICAgICBwcmV2aW91c1N0YXRlczogWy4uLnN0YXRlc10sXG4gICAgICAgIHBhaXJzOiBbXVxuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIHByZXZpb3VzU3RhdGVzOiBbLi4uc3RhdGVzXSxcbiAgICAgICAgcGFpcnM6IFsuLi5hY2MucGFpcnMsIFtbLi4uYWNjLnByZXZpb3VzU3RhdGVzXSwgWy4uLnN0YXRlc11dXVxuICAgICAgfSwgZmFsc2UpXG4gICAgLnBhaXJzXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZVJvdXRlSW50b1RyYW5zaXRpb24gKFtmcm9tU3RhdGVzLCB0b1N0YXRlc10pIHtcbiAgcmV0dXJuIGZyb21TdGF0ZXMucmVkdWNlKChhY2MsIGZyb21TdGF0ZSkgPT4gW1xuICAgIC4uLmFjYyxcbiAgICAuLi50b1N0YXRlcy5tYXAodG9TdGF0ZSA9PiB7XG4gICAgICByZXR1cm4gW2Zyb21TdGF0ZSwgdG9TdGF0ZV1cbiAgICB9KVxuICBdLCBbXSlcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEZTTVxuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN0YXRlYm90LFxuICBpc1N0YXRlYm90XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBTdGF0ZWJvdC5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBzdGF0ZWJvdE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAqICBUaGUgc3RhdGUtY2hhcnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3N0YXJ0SW49PGF1dG8+XVxuICogIFRoZSBzdGF0ZSBpbiB3aGljaCB0byBzdGFydC4gSWYgdW5zcGVjaWZpZWQsIHRoZSBmaXJzdCBzdGF0ZSBpbiB0aGVcbiAqICBjaGFydCB3aWxsIGJlIHVzZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgSG93IG5vaXN5IHRoZSBsb2dnaW5nIGlzLCBmcm9tIDEgdG8gMzpcbiAqICBgYGBcbiAqICAxKSBjb25zb2xlLndhcm5cbiAqICAyKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlXG4gKiAgMykgY29uc29sZS53YXJuL2xvZy90YWJsZS9pbmZvXG4gKiAgYGBgXG4gKiAgYDNgIGlzIHRoZSBkZWZhdWx0LiBBcmd1bWVudCB0eXBlLWVycm9ycyB3aWxsIGFsd2F5cyBgdGhyb3dgLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtoaXN0b3J5TGltaXQ9Ml1cbiAqICBMaW1pdCBob3cgbXVjaCBoaXN0b3J5IHRoZSBzdGF0ZS1tYWNoaW5lIGtlZXBzLiBBY2Nlc3NlZCB2aWFcbiAqICB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeXxzdGF0ZWJvdEZzbSNoaXN0b3J5KCl9LlxuICogQHByb3BlcnR5IHtldmVudHN9IFtldmVudHNdXG4gKiAgSWYgeW91IHdpc2ggdG8gaGF2ZSB5b3VyIFN0YXRlYm90cyBsaXN0ZW4gdG8gZXZlbnRzIGNvbWluZyBmcm9tXG4gKiAgYSBzaGFyZWQgRXZlbnRFbWl0dGVyLCB5b3UgY2FuIHBhc3MgaXQgaW4gaGVyZS4gVGhlIGBlbWl0KClgL2BvbkV2ZW50KClgL1xuICogIGBwZXJmb3JtVHJhbnNpdGlvbnMoKWAgbWV0aG9kcyB3aWxsIHVzZSBpdC5cbiAqXG4gKiAgSXQgc2hvdWxkIGhhdmUgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19jbGFzc19ldmVudGVtaXR0ZXJ8RXZlbnRFbWl0dGVyfS5cbiAqL1xuXG4vKipcbiAqIEEgZGVzY3JpcHRpb24gb2YgYWxsIHRoZSBzdGF0ZXMgaW4gYSBtYWNoaW5lLCBwbHVzIGFsbCBvZiB0aGVcbiAqIHBlcm1pdHRlZCB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZW0uXG4gKlxuICogVGhpcyBpcyBkZWZpbmVkIHVzaW5nIGEgYHN0cmluZ2Agb3IgYW4gYGFycmF5YCBvZiBzdHJpbmdzLCBidXRcbiAqICB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHN8VGVtcGxhdGUgTGl0ZXJhbHN9XG4gKiBhcmUgbXVjaCBtb3JlIGNvbnZlbmllbnQuXG4gKlxuICogQW4gYXJyb3cgYC0+YCBjb25maWd1cmVzIGEgKipwZXJtaXR0ZWQgdHJhbnNpdGlvbioqIGJldHdlZW4gdHdvIHN0YXRlczpcbiAqXG4gKiBgYGBcbiAqIGZyb20tc3RhdGUgLT4gdG8tc3RhdGVcbiAqIGBgYFxuICpcbiAqIEl0J3MgdGhlIG9ubHkgb3BlcmF0b3IgbmVlZGVkIHRvIGJ1aWxkIGFueSBjaGFydDpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWRcbiAqICAgcGVuZGluZyAtPiByZWplY3RlZFxuICogICByZXNvbHZlZCAtPiBkb25lXG4gKiAgIHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIFRoZSBcIk9SXCIgb3BlcmF0b3IgYHxgIGNhbiBoZWxwIHVzIHJlbW92ZSBzb21lIHJlZHVuZGFuY3kgZnJvbSB0aGUgYWJvdmUgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZFxuICogICByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEluIGJvdGggY2hhcnRzLCBgcGVuZGluZ2AgY2FuIHRyYW5zaXRpb24gdG8gYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgLCBhbmRcbiAqIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCBjYW4gYm90aCB0cmFuc2l0aW9uIHRvIGBkb25lYC5cbiAqXG4gKiBXZSBjYW4gc3RyZWFtbGluZSB0aGlzIGV2ZW4gZnVydGhlcjpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEFnYWluLCB0aGlzIGlzIGV4YWN0bHkgZXF1aXZhbGVudCB0byB0aGUgcHJldmlvdXMgdHdvIGV4YW1wbGVzLlxuICpcbiAqIE5vdGljZSBpbiB0aGlzIG9uZSB0aGF0IHdlIGhhdmUgcGFyZW50aGVzZXMgYChgIGApYCBzdXJyb3VuZGluZyBgcmVzb2x2ZWRgXG4gKiBhbmQgYHJlamVjdGVkYC4gVGhleSBhcmUgYWN0dWFsbHkgY29tcGxldGVseSBpZ25vcmVkIGJ5IHRoZSBwYXJzZXIsIGFuZFxuICogeW91IGNhbiB1c2UgdGhlbSBhcyB5b3UgcGxlYXNlIHRvIGhlbHAgbWFrZSB5b3VyIGNoYXJ0cyBtb3JlIHJlYWRhYmxlLlxuICpcbiAqIEEgY2hhcnQgd29ya3MgZXhhY3RseSB0aGUgc2FtZSB3aXRob3V0IHRoZW06XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQ2hhcnRzIGNhbiBhbHNvIGJlIHNwbGl0IGFjcm9zcyBtdWx0aXBsZS1saW5lczpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT5cbiAqICAgcmVzb2x2ZWQgfFxuICogICByZWplY3RlZCAtPlxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqIE5vdGljZSB0aGF0IGFsbCB3aGl0ZS1zcGFjZSBpcyBpZ25vcmVkIG9uIGVpdGhlciBzaWRlIG9mIHRoZSBgLT5gXG4gKiBhbmQgYHxgLlxuICpcbiAqIGAvLyBDb21tZW50cyBvZiB0aGlzIGtpbmQgYXJlIGFsbG93ZWQsIHRvbzpgXG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IC8vIFdoZXJlIGRvIHdlIGdvIGZyb20gaGVyZT9cbiAqICAgICAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gLy8gQWgsIHllc1xuICpcbiAqICAgLy8gQW5kIG5vdyB3ZSdyZSBhbGwgZmluaXNoZWRcbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogRmluYWxseSwgaGVyZSdzIGEgbW9yZSBmdWxsIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBkcmFnRHJvcENoYXJ0ID0gYFxuICogICBpZGxlIC0+XG4gKiAgICAgZHJhZy1kZXRlY3QgLT5cbiAqICAgICAgIChkcmFnZ2luZyB8IGNsaWNrZWQpXG4gKlxuICogICAvLyBKdXN0IGEgY2xpY2ssIGJhaWwtb3V0IVxuICogICBjbGlja2VkIC0+IGlkbGVcbiAqXG4gKiAgIC8vIERyYWcgZGV0ZWN0ZWQhXG4gKiAgIGRyYWdnaW5nIC0+XG4gKiAgICAgZHJhZy13YWl0IC0+IGRyYWdnZWQgLT4gZHJhZy13YWl0XG4gKlxuICogICAvLyBEcmFnIGZpbmlzaGVkLi4uXG4gKiAgIChkcmFnLXdhaXQgfCBkcmFnZ2VkKSAtPlxuICogICAgIChkcmFnLWRvbmUgfCBkcmFnLWNhbmNlbCkgLT5cbiAqICAgICAgIGlkbGVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmd8c3RyaW5nW119IHN0YXRlYm90Q2hhcnRcbiAqL1xuXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHNcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNvbnN0IHtcbiAgaXNQb2pvLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlcixcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIFJlZmVyZW5jZUNvdW50ZXJcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgeyBkZWNvbXBvc2VDaGFydCwgY3hBcnJvdyB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcblxuZnVuY3Rpb24gU3RhdGVib3QgKG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IFR5cGVFcnJvcignXFxuU3RhdGVib3Q6IFBsZWFzZSBzcGVjaWZ5IGEgbmFtZSBmb3IgdGhpcyBtYWNoaW5lJylcbiAgfVxuXG4gIGNvbnN0IGxvZ1ByZWZpeCA9IGBTdGF0ZWJvdFske25hbWV9XWBcbiAgaWYgKCFpc1Bvam8ob3B0aW9ucykpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoYFxcbiR7bG9nUHJlZml4fTogUGxlYXNlIHNwZWNpZnkgb3B0aW9ucyBmb3IgdGhpcyBtYWNoaW5lYClcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBjaGFydCA9IHVuZGVmaW5lZCxcbiAgICBsb2dMZXZlbCA9IDMsXG4gICAgaGlzdG9yeUxpbWl0ID0gMlxuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcihgJHtsb2dQcmVmaXh9I2ApXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG4gIGNvbnN0IHsgY2FuV2FybiB9ID0gY29uc29sZVxuXG4gIGNvbnN0IHtcbiAgICBzdGF0ZXMgPSBbXSxcbiAgICByb3V0ZXMgPSBbXVxuICB9ID0gY2hhcnQgPyBkZWNvbXBvc2VDaGFydChjaGFydCkgOiBvcHRpb25zXG5cbiAgbGV0IHsgc3RhcnRJbiB9ID0gb3B0aW9uc1xuICBpZiAoc3RhcnRJbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnRJbiA9IHN0YXRlc1swXVxuICB9XG5cbiAgaWYgKCFzdGF0ZXMuaW5jbHVkZXMoc3RhcnRJbikpIHtcbiAgICB0aHJvdyBFcnJvcihgJHtsb2dQcmVmaXh9OiBTdGFydGluZy1zdGF0ZSBub3QgaW4gY2hhcnQ6IFwiJHtzdGFydElufVwiYClcbiAgfVxuXG4gIGxldCB0cmFuc2l0aW9uSWQgPSAwXG4gIGNvbnN0IHN0YXRlSGlzdG9yeSA9IFtzdGFydEluXVxuICBjb25zdCBzdGF0ZUhpc3RvcnlMaW1pdCA9IE1hdGgubWF4KGhpc3RvcnlMaW1pdCwgMilcbiAgY29uc3QgZXZlbnRzID0gaXNFdmVudEVtaXR0ZXIob3B0aW9ucy5ldmVudHMpID8gb3B0aW9ucy5ldmVudHMgOiBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBjb25zdCBpbnRlcm5hbEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBjb25zdCBJTlRFUk5BTF9FVkVOVFMgPSB7XG4gICAgU1RBVEVfQ0hBTkdJTkc6ICcoQU5ZKXN0YXRlOmNoYW5naW5nJyxcbiAgICBTVEFURV9DSEFOR0VEOiAnKEFOWSlzdGF0ZTpjaGFuZ2VkJ1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdEludGVybmFsRXZlbnQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW1pdEludGVybmFsRXZlbnQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVybmFsRXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gb25JbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIGZuKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkludGVybmFsRXZlbnQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycsIGZuOiAnZnVuY3Rpb24nIH0sIGV2ZW50TmFtZSwgZm4pXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBpbnRlcm5hbEV2ZW50cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpbnRlcm5hbEV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0YXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3N0YXRlcycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBzdGF0ZS1jaGFuZ2VzJyxcbiAgICBbLi4uc3RhdGVzXVxuICApXG4gIGNvbnN0IHJvdXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3RyYW5zaXRpb25zJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHRyYW5zaXRpb25zJyxcbiAgICBbLi4ucm91dGVzXVxuICApXG4gIGNvbnN0IGV2ZW50c0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ2V2ZW50cycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHMnXG4gIClcblxuICAvLyBJbnRlcnByZXRzIG9uVHJhbnNpdGlvbnMoKSBhbmQgcGVyZm9ybVRyYW5zaXRpb25zKClcbiAgZnVuY3Rpb24gYXBwbHlIaXRjaGVyIChoaXRjaGVyLCBmbk5hbWUpIHtcbiAgICBjb25zdCBoaXRjaGVyQWN0aW9ucyA9XG4gICAgICB0eXBlb2YgaGl0Y2hlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IGhpdGNoZXIoeyBlbnRlciwgZW1pdCwgRW50ZXIsIEVtaXQgfSlcbiAgICAgICAgOiBpc1Bvam8oaGl0Y2hlcilcbiAgICAgICAgICA/IGhpdGNoZXJcbiAgICAgICAgICA6IG51bGxcblxuICAgIGlmICghaXNQb2pvKGhpdGNoZXJBY3Rpb25zKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEV4cGVjdGVkIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0YFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50cyA9IHt9XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSBbXVxuXG4gICAgT2JqZWN0LmVudHJpZXMoaGl0Y2hlckFjdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoW3JvdXRlQ2hhcnQsIGFjdGlvbk9yQ29uZmlnXSkgPT4ge1xuICAgICAgICAvLyBvblRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbk9yQ29uZmlnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogYWN0aW9uT3JDb25maWcgfSlcbiAgICAgICAgfSBlbHNlIGlmICghaXNQb2pvKGFjdGlvbk9yQ29uZmlnKSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBjb25zdCB7IG9uOiBfb24sIHRoZW46IF90aGVuIH0gPSBhY3Rpb25PckNvbmZpZ1xuICAgICAgICBpZiAodHlwZW9mIF9vbiA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShfb24pKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnROYW1lcyA9IFtfb25dLmZsYXQoKVxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXVxuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogX3RoZW4gfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgICAgICAgLy8gKEJlaGF2ZSBsaWtlIG9uVHJhbnNpdGlvbnMgaWYgYSBjb25maWcgaXMgc3BlY2lmaWVkLCBidXRcbiAgICAgICAgICAvLyAgdGhlcmUgaXMgbm8gXCJvblwiIGV2ZW50Li4uKVxuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICAgIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgY29uc3QgZGVjb21wb3NlZEV2ZW50cyA9IE9iamVjdC5lbnRyaWVzKGV2ZW50cylcbiAgICAgIC5yZWR1Y2UoKGFjYywgW2V2ZW50TmFtZSwgX2NvbmZpZ3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIGNvbmZpZ3MgfSA9IGRlY29tcG9zZUNvbmZpZ3MoX2NvbmZpZ3MpXG4gICAgICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgIFtldmVudE5hbWVdOiBjb25maWdzXG4gICAgICAgIH1cbiAgICAgIH0sIHt9KVxuXG4gICAgY29uc3QgYWxsQ2xlYW51cEZucyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMoZGVjb21wb3NlZEV2ZW50cylcbiAgICAgICAgLm1hcCgoW2V2ZW50TmFtZSwgY29uZmlnc10pID0+IHtcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZXZlbnRzSGFuZGxlZC5pbmNyZWFzZShldmVudE5hbWUpLFxuICAgICAgICAgICAgb25FdmVudChldmVudE5hbWUsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50V2FzSGFuZGxlZCA9IGNvbmZpZ3Muc29tZShcbiAgICAgICAgICAgICAgICAoeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXNzZWQgPSBpblN0YXRlKGZyb21TdGF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiguLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgcmV0dXJuICEhcGFzc2VkXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICBpZiAoIWV2ZW50V2FzSGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25Ob09wKGBFdmVudCBub3QgaGFuZGxlZDogXCIke2V2ZW50TmFtZX1cImApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICB9KS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBvblRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGNvbnN0IHRyYW5zaXRpb25Db25maWdzID0gZGVjb21wb3NlQ29uZmlncyh0cmFuc2l0aW9ucylcblxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnN0YXRlcylcbiAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnJvdXRlcylcbiAgICB9XG5cbiAgICBhbGxDbGVhbnVwRm5zLnB1c2goXG4gICAgICAuLi50cmFuc2l0aW9uQ29uZmlncy5jb25maWdzLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgY29uc3QgeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9ID0gdHJhbnNpdGlvblxuICAgICAgICBjb25zdCByb3V0ZSA9IGAke2Zyb21TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgcm91dGVzSGFuZGxlZC5pbmNyZWFzZShyb3V0ZSksXG4gICAgICAgICAgb25JbnRlcm5hbEV2ZW50KHJvdXRlLCBhY3Rpb24pXG4gICAgICAgIF1cbiAgICAgIH0pLmZsYXQoKVxuICAgIClcblxuICAgIC8vIERlYnVnZ2luZywgaWYgd2UncmUgYXQgdGhlIHJpZ2h0IGxldmVsXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgY29uc3QgaW52YWxpZFN0YXRlcyA9IGFsbFN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gIXN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gICAgICBjb25zdCBpbnZhbGlkUm91dGVzID0gYWxsUm91dGVzLmZpbHRlcihyb3V0ZSA9PiAhcm91dGVzLmluY2x1ZGVzKHJvdXRlKSlcbiAgICAgIGlmIChpbnZhbGlkU3RhdGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBJbnZhbGlkIHN0YXRlcyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFN0YXRlcy5tYXAoc3RhdGUgPT4gYCAgPiBcIiR7c3RhdGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBpZiAoaW52YWxpZFJvdXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCB0cmFuc2l0aW9ucyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFJvdXRlcy5tYXAocm91dGUgPT4gYCAgPiBcIiR7cm91dGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGFsbENsZWFudXBGbnMuZm9yRWFjaChmbiA9PiBmbigpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb21wb3NlQ29uZmlncyAoY29uZmlncykge1xuICAgIGNvbnN0IGFsbFN0YXRlcyA9IFtdXG4gICAgY29uc3QgYWxsUm91dGVzID0gW11cblxuICAgIGNvbnN0IF9jb25maWdzID0gY29uZmlncy5yZWR1Y2UoKGFjYywgY29uZmlnKSA9PiB7XG4gICAgICBjb25zdCB7IHJvdXRlQ2hhcnQsIGFjdGlvbiB9ID0gY29uZmlnXG4gICAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnQocm91dGVDaGFydClcbiAgICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgICBhbGxSb3V0ZXMucHVzaCguLi5yb3V0ZXMpXG4gICAgICB9XG4gICAgICByZXR1cm4gW1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIC4uLnRyYW5zaXRpb25zLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHRyYW5zaXRpb25cbiAgICAgICAgICByZXR1cm4geyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSwgW10pXG5cbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnczogX2NvbmZpZ3MsXG4gICAgICBzdGF0ZXM6IGFsbFN0YXRlcyxcbiAgICAgIHJvdXRlczogYWxsUm91dGVzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlvdXNTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMl1cbiAgfVxuXG4gIGZ1bmN0aW9uIGN1cnJlbnRTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMV1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluU3RhdGUgKHN0YXRlLCBhbnlPckZuLCAuLi5mbkFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2luU3RhdGUnLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGNvbmRpdGlvbk1hdGNoZXMgPSBjdXJyZW50U3RhdGUoKSA9PT0gc3RhdGVcblxuICAgIGlmIChhbnlPckZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghY29uZGl0aW9uTWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhbnlPckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBhbnlPckZuKC4uLmZuQXJncylcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbnlPckZuXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmRpdGlvbk1hdGNoZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIEluU3RhdGUgKHN0YXRlLCBhbnlPckZuKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdJblN0YXRlJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmZuQXJncykgPT4gaW5TdGF0ZShzdGF0ZSwgYW55T3JGbiwgLi4uZm5BcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuVHJhbnNpdGlvblRvICguLi5zdGF0ZXMpIHtcbiAgICBjb25zdCB0ZXN0U3RhdGVzID0gc3RhdGVzLmZsYXQoKVxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignY2FuVHJhbnNpdGlvblRvJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgdGVzdFN0YXRlc1swXSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGlmICghdGVzdFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZXMgPSBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgcmV0dXJuIHRlc3RTdGF0ZXMuZXZlcnkoc3RhdGUgPT4gbmV4dFN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gIH1cblxuICBmdW5jdGlvbiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSAoc3RhdGUpIHtcbiAgICBjb25zdCBfc3RhdGUgPSBzdGF0ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHN0YXRlXG4gICAgICA6IGN1cnJlbnRTdGF0ZSgpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3N0YXRlc0F2YWlsYWJsZUZyb21IZXJlJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgX3N0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlcy5yZWR1Y2UoKGFjYywgcm91dGUpID0+IHtcbiAgICAgIGNvbnN0IFtmcm9tU3RhdGUsIHRvU3RhdGVdID0gcm91dGUuc3BsaXQoY3hBcnJvdylcbiAgICAgICAgLm1hcChzdGF0ZSA9PiBzdGF0ZS50cmltKCkpXG5cbiAgICAgIGlmIChmcm9tU3RhdGUgPT09IF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gWy4uLmFjYywgdG9TdGF0ZV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIEVtaXQgKGV2ZW50TmFtZSkge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignRW1pdCcsIHsgZXZlbnROYW1lOiAnc3RyaW5nJyB9LCBldmVudE5hbWUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgIHJldHVybiBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VtaXQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIEVudGVyIChzdGF0ZSkge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignRW50ZXInLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgcmV0dXJuIGVudGVyKHN0YXRlLCAuLi5hcmdzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVudGVyIChzdGF0ZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW50ZXInLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGluU3RhdGUgPSBjdXJyZW50U3RhdGUoKVxuICAgIGNvbnN0IHRvU3RhdGUgPSBzdGF0ZVxuXG4gICAgaWYgKHRvU3RhdGUgPT09IGluU3RhdGUpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBBbHJlYWR5IGluIHN0YXRlOiBcIiR7dG9TdGF0ZX1cImApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlcy5pbmNsdWRlcyh0b1N0YXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgc3RhdGUgXCIke3RvU3RhdGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFJvdXRlID0gYCR7aW5TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgaWYgKCFyb3V0ZXMuaW5jbHVkZXMobmV4dFJvdXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgdHJhbnNpdGlvbiBcIiR7bmV4dFJvdXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIEZlbGwtdGhyb3VnaCwgY2FuIGVudGVyIG5leHQgc3RhdGVcbiAgICBjb25zb2xlLmluZm8oYCR7bG9nUHJlZml4fTogdElkPCR7Kyt0cmFuc2l0aW9uSWR9PjogJHtuZXh0Um91dGV9YClcblxuICAgIHN0YXRlSGlzdG9yeS5wdXNoKHRvU3RhdGUpXG4gICAgaWYgKHN0YXRlSGlzdG9yeS5sZW5ndGggPiBzdGF0ZUhpc3RvcnlMaW1pdCkge1xuICAgICAgc3RhdGVIaXN0b3J5LnNoaWZ0KClcbiAgICB9XG5cbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdJTkcsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQobmV4dFJvdXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0VELCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXZlbnQgKGV2ZW50TmFtZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXZlbnQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIGV2ZW50TmFtZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBldmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Td2l0Y2hpbmcgKGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvblN3aXRjaGluZycsIHsgY2I6ICdmdW5jdGlvbicgfSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50ID0gc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdJTkcpXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvbkludGVybmFsRXZlbnQoXG4gICAgICBJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdJTkcsXG4gICAgICAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGNiKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uU3dpdGNoZWQgKGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvblN3aXRjaGVkJywgeyBjYjogJ2Z1bmN0aW9uJyB9LCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnQgPSBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0VEKVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25JbnRlcm5hbEV2ZW50KFxuICAgICAgSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HRUQsXG4gICAgICAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGNiKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXhpdGluZyAoc3RhdGUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkV4aXRpbmcnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmV4aXRpbmdgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgIGNiKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FeGl0ZWQgKHN0YXRlLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FeGl0ZWQnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmV4aXRlZGApXG4gICAgXVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25Td2l0Y2hlZCgodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBjYih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRW50ZXJpbmcgKHN0YXRlLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FbnRlcmluZycsIHsgc3RhdGU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBzdGF0ZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06ZW50ZXJpbmdgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gdG9TdGF0ZSkge1xuICAgICAgICBjYihmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FbnRlcmVkIChzdGF0ZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRW50ZXJlZCcsIHsgc3RhdGU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBzdGF0ZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06ZW50ZXJlZGApXG4gICAgXVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25Td2l0Y2hlZCgodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IHRvU3RhdGUpIHtcbiAgICAgICAgY2IoZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fTogU3RhdGUtbWFjaGluZSByZXNldCFgKVxuXG4gICAgc3RhdGVIaXN0b3J5Lmxlbmd0aCA9IDBcbiAgICBzdGF0ZUhpc3RvcnkucHVzaChzdGFydEluKVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbk5vT3AgKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBsYXN0U3RhdGUgPSBwcmV2aW91c1N0YXRlKClcbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCBwcmV2Um91dGUgPSBgJHtsYXN0U3RhdGUgPT09IHVuZGVmaW5lZCA/ICdbdW5kZWZpbmVkXScgOiBsYXN0U3RhdGV9LT4ke2luU3RhdGV9YFxuXG4gICAgY29uc3QgYXZhaWxhYmxlU3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIGlmICghYXZhaWxhYmxlU3RhdGVzLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBUaGVyZSBhcmUgbm8gc3RhdGVzIGF2YWlsYWJsZSBmcm9tIFwiJHtpblN0YXRlfVwiYFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGAke2xvZ1ByZWZpeH06ICR7bWVzc2FnZX1cXG5gICtcbiAgICAgICAgICBgICA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiJHtwcmV2Um91dGV9XCJcXG5gICtcbiAgICAgICAgICBgICA+IEZyb20gXCIke2luU3RhdGV9XCIsIHZhbGlkIHN0YXRlcyBhcmU6IFske2F2YWlsYWJsZVN0YXRlc1xuICAgICAgICAgICAgLm1hcChzdGF0ZSA9PiBgXCIke3N0YXRlfVwiYClcbiAgICAgICAgICAgIC5qb2luKCcsICcpfV1gXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlczogc3RhdGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICB0cmFuc2l0aW9uczogcm91dGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICBldmVudHM6IGV2ZW50c0hhbmRsZWQucmVmcygpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5mbyAoKSB7XG4gICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fTogSW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzdGF0ZS1tYWNoaW5lYClcblxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHN0YXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8ocm91dGVzSGFuZGxlZClcbiAgICBsb2dSZWZDb3VudGVySW5mbyhldmVudHNIYW5kbGVkKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9nUmVmQ291bnRlckluZm8gKHJlZkNvdW50ZXIpIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCB0YWJsZSB9ID0gcmVmQ291bnRlci50b1ZhbHVlKClcbiAgICBjb25zb2xlLmxvZyhkZXNjcmlwdGlvbilcbiAgICBpZiAodGFibGUubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLnRhYmxlKHRhYmxlKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnICA+IE5vIGluZm9ybWF0aW9uJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBzdGF0ZS1tYWNoaW5lIG9iamVjdCBjcmVhdGVkIGJ5XG4gICAqIHtAbGluayAjc3RhdGVib3RzdGF0ZWJvdHxTdGF0ZWJvdCgpfS5cbiAgICogQHR5cGVkZWYge09iamVjdH0gc3RhdGVib3RGc21cbiAgICovXG5cbiAgcmV0dXJuIHtcbiAgICAvLyBGb3IgaWRlbnRpZnlpbmcgU3RhdGVib3Qgb2JqZWN0c1xuICAgIF9fU1RBVEVCT1RfXzogMSxcblxuICAgIC8qKlxuICAgICAqIFRlc3RzIHRvIHNlZSBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgc3BlY2lmaWVkIHN0YXRlIGZyb21cbiAgICAgKiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogSWYgbW9yZSB0aGFuIG9uZSBzdGF0ZSBpcyBzcGVjaWZpZWQsIGB0cnVlYCBpcyByZXR1cm5lZCBvbmx5IGlmXG4gICAgICogKipBTEwqKiBzdGF0ZXMgYXJlIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2dhbWUtbWVudXMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+XG4gICAgICogICAgICAgbWVudSAtPlxuICAgICAqICAgICAgICAgcGxheSB8XG4gICAgICogICAgICAgICBvcHRpb25zIHxcbiAgICAgKiAgICAgICAgIHNvdW5kIHxcbiAgICAgKiAgICAgICAgIHF1aXRcbiAgICAgKlxuICAgICAqICAgICAvLyBHbyBiYWNrIHRvIG1lbnVcbiAgICAgKiAgICAgcGxheSB8IG9wdGlvbnMgfCBzb3VuZCAtPiBtZW51XG4gICAgICpcbiAgICAgKiAgICAgLy8gQ2FuIHF1aXQgZnJvbSBtYWluIGdhbWUsIHRvb1xuICAgICAqICAgICBwbGF5IC0+IHF1aXRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BsYXknKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdtZW51JylcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbyhbJ3BsYXknLCAnb3B0aW9ucyddKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBjYW5UcmFuc2l0aW9uVG86IGNhblRyYW5zaXRpb25UbyxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdidXR0b24nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IGNsaWNrZWRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICovXG4gICAgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBlbWl0cyBhbiBldmVudCwgZmlyaW5nIGFueSBsaXN0ZW5lcnMgYWRkZWQgdXNpbmdcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zfC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gb3Ige0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnR8Lm9uRXZlbnQoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc11cbiAgICAgKiAgT3B0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqICBXaGV0aGVyIG9yIG5vdCB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICBTZWU6IHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19lbWl0dGVyX2VtaXRfZXZlbnRuYW1lX2FyZ3N8Tm9kZSBFdmVudHN9XG4gICAgICogIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogU3RhdGVib3QgaW1wb3J0cyBgRXZlbnRFbWl0dGVyYCBmcm9tIHRoZVxuICAgICAqICB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzfGV2ZW50c31cbiAgICAgKiBwYWNrYWdlIGZvciBkZWFsaW5nIHdpdGggZXZlbnRzIGluIHRoZSBicm93c2VyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdiYXNpYy1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IHJlZGlyZWN0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiB7XG4gICAgICogICAgIG9uOiAncG9zdC1kYXRhJyxcbiAgICAgKiAgICAgdGhlbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgYXJnczogJywgYXJncylcbiAgICAgKiAgICAgICAvLyBzZXRUaW1lb3V0KG1hY2hpbmUuRW50ZXIoJ3JlZGlyZWN0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCdwb3N0LWRhdGEnLCAnSGVsbG8sIHdvcmxkIScpXG4gICAgICogLy8gRXZlbnQgYXJnczogW1wiSGVsbG8sIHdvcmxkIVwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic2VuZGluZ1wiXG4gICAgICovXG4gICAgZW1pdDogZW1pdCxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiAgVGhlIGRlc2lyZWQgZXZlbnQgdG8ge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhhdCBldmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgndHJhZmZpYy1saWdodHMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBnbyAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tc3RvcCAtPlxuICAgICAqICAgICAgIHN0b3BcbiAgICAgKlxuICAgICAqICAgICAvLyAuLi5nb3R0YSBrZWVwIHRoYXQgdHJhZmZpYyBmbG93aW5nXG4gICAgICogICAgIHN0b3AgLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLWdvIC0+XG4gICAgICogICAgICAgZ29cbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnc3RvcCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3N0b3AgLT4gcHJlcGFyZS10by1nbyc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tZ28gLT4gZ28nOiAgICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ2dvIC0+IHByZXBhcmUtdG8tc3RvcCc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tc3RvcCAtPiBzdG9wJzogeyBvbjogJ3RpbWVyJyB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBuZXh0VHJhZmZpY0xpZ2h0ID0gbWFjaGluZS5FbWl0KCd0aW1lcicpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3RvcFwiXG4gICAgICpcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInByZXBhcmUtdG8tc3RvcFwiXG4gICAgICovXG4gICAgRW1pdDogRW1pdCxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZyBhcyBpdCBpc1xuICAgICAqIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YXRlIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2RpYWxvZycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2hvd2luZy1tb2RhbCAtPiAoc2F2aW5nIHwgaWRsZSlcbiAgICAgKiAgICAgICBzYXZpbmcgLT4gaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NhdmluZycpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIC8vIFtkaWFsb2ddOiBJbnZhbGlkIHRyYW5zaXRpb24gXCJpZGxlLT5zYXZpbmdcIiwgbm90IHN3aXRjaGluZ1xuICAgICAqIC8vID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCJbdW5kZWZpbmVkXS0+aWRsZVwiXG4gICAgICogLy8gPiBGcm9tIFwiaWRsZVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbXCJzaG93aW5nLW1vZGFsXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzaG93aW5nLW1vZGFsJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgZW50ZXI6IGVudGVyLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nXG4gICAgICogYXMgaXQgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYW4gY2hhbmdlIHRoZSBzdGF0ZSB3aGVuIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncG9wdXAtbWVudScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gbWVudS1vcGVuZWQgLT5cbiAgICAgKiAgICAgICAoaXRlbS1jbGlja2VkIHwgaWRsZSlcbiAgICAgKlxuICAgICAqICAgICBpdGVtLWNsaWNrZWQgLT4gaWRsZVxuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdtZW51LW9wZW5lZCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2sgPSBtYWNoaW5lLkVudGVyKCdpdGVtLWNsaWNrZWQnKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIm1lbnUtb3BlbmVkXCJcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrKClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpdGVtLWNsaWNrZWRcIlxuICAgICAqL1xuICAgIEVudGVyOiBFbnRlcixcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHN0YXRlcyB0aGUgbWFjaGluZSBoYXMgYmVlbiBpbiBzbyBmYXIsIHVwIHRvIGEgbGltaXQgc2V0XG4gICAgICogYnkgYGhpc3RvcnlMaW1pdGAgaW4ge0BsaW5rIHN0YXRlYm90T3B0aW9uc30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEEgY29weSBvZiB0aGUgc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZG93bmxvYWRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGxvYWRpbmcgLT4gKGZhaWx1cmUgfCBzdWNjZXNzKVxuICAgICAqICAgICAgIGZhaWx1cmUgLT4gbG9hZGluZ1xuICAgICAqICAgICAgIHN1Y2Nlc3MgLT4gZG9uZVxuICAgICAqICAgYCxcbiAgICAgKiAgIGhpc3RvcnlMaW1pdDogNFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdmYWlsdXJlJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdsb2FkaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzdWNjZXNzJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiBtYWNoaW5lLmhpc3RvcnkoKVxuICAgICAqIC8vIFtcImZhaWx1cmVcIiwgXCJsb2FkaW5nXCIsIFwic3VjY2Vzc1wiLCBcImRvbmVcIl1cbiAgICAgKi9cbiAgICBoaXN0b3J5OiAoKSA9PiBbLi4uc3RhdGVIaXN0b3J5XSxcblxuICAgIC8qKlxuICAgICAqIFByaW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUgdG8gdGhlIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbmZvKClcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBJbmZvcm1hdGlvbiBhYm91dCB0aGlzIHN0YXRlLW1hY2hpbmUuXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgc3RhdGVzICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICAgJ2RvbmUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAgJ2lkbGUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XSBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgIHRyYW5zaXRpb25zICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICdpZGxlLT5yZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAnaWRsZS0+c2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmctPmRvbmUnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZy0+ZG9uZScgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAgICAgKiAvLyAoTm8gaW5mb3JtYXRpb24pXG4gICAgICovXG4gICAgaW5mbzogKCkgPT4gaW5mbygpLFxuXG4gICAgLyoqXG4gICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBTYW1lIGRldGFpbHMgYXMge0BsaW5rICNzdGF0ZWJvdGZzbWluZm98LmluZm8oKX0gaW4gb2JqZWN0LWZvcm0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluc3BlY3QoKVxuICAgICAqIC8vIFdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgICAqIC8vICB7IHN0YXRlcywgdHJhbnNpdGlvbnMsIGV2ZW50cyB9XG4gICAgICpcbiAgICAgKiAvLyBUaGVzZSB3aWxsIGVhY2ggaGF2ZSBrZXktdmFsdWVzLCB0aGUga2V5IGJlaW5nIHRoZSBuYW1lXG4gICAgICogLy8gYW5kIHRoZSB2YWx1ZSBiZWluZyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBhdHRhY2hlZC5cbiAgICAgKi9cbiAgICBpbnNwZWN0OiAoKSA9PiBpbnNwZWN0KCksXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBgc3RhdGVgLCBpbW1lZGlhdGVseSByZXR1cm5pbmcgZWl0aGVyXG4gICAgICogYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgdGhlbiBpdHMgcmV0dXJuLXZhbHVlIHdpbGwgYmUgdXNlZFxuICAgICAqIGFzIHRoZSBgdHJ1ZWAtdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbHwqfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgJ1B1cnJyci4uLicpXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIGluU3RhdGU6IGluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gcnVuLCB0ZXN0cyB0aGF0XG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IG1hdGNoZXMgdGhlXG4gICAgICogc3BlY2lmaWVkIHN0YXRlLCByZXR1cm5pbmcgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FsbHMge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIGlkbGluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScpXG4gICAgICogdmFyIHB1cnJpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogaWRsaW5nKClcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBJZGxpbmchXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBJblN0YXRlOiBJblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGFsc28gYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9XG4gICAgICogZm9yIHRoZSBzYW1lLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ0F5LCB0aGVyZeKAmXMgdGhlIHJ1Yi4nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICB0aGUtcXVlc3Rpb24gLT4gKHRvLWJlIHwgbm90LXRvLWJlKVxuICAgICAqICAgICAgIG5vdC10by1iZSAtPiBwZXJjaGFuY2UtdG8tZHJlYW1cbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5uYW1lKClcbiAgICAgKiAvLyBcIkF5LCB0aGVyZeKAmXMgdGhlIHJ1Yi5cIlxuICAgICAqL1xuICAgIG5hbWU6ICgpID0+IG5hbWUsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJlZCBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmVkIGZyb206IHJlY2VpdmluZ1xuICAgICAqL1xuICAgIG9uRW50ZXJlZDogb25FbnRlcmVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGJlY29tZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtlbnRlckNhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmVkKCdkb25lJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIG1hZGUgaXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyaW5nKCdkb25lJywgZnJvbVN0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdFbnRlcmluZyBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gRW50ZXJpbmcgZnJvbTogc2VuZGluZ1xuICAgICAqIC8vIFdlIG1hZGUgaXQhXG4gICAgICovXG4gICAgb25FbnRlcmluZzogb25FbnRlcmluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGVudGVyQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIHNwZWNpZmllZFxuICAgICAqIGV2ZW50IGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28gLT4gZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfSxcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV2ZW50KCd0aW1lcicsICgpID0+IHtcbiAgICAgKiAgIHJlZHJhd1RyYWZmaWNMaWdodHMoKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBzZXRJbnRlcnZhbChtYWNoaW5lLkVtaXQoJ3RpbWVyJyksIDIwMDApXG4gICAgICovXG4gICAgb25FdmVudDogb25FdmVudCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIGFyZSBoZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIC8vIFdlIGFyZSBoZWFkaW5nIHRvOiBzZW5kaW5nXG4gICAgICovXG4gICAgb25FeGl0ZWQ6IG9uRXhpdGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdQZWFjZSBvdXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRpbmcoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdIZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gSGVhZGluZyB0bzogcmVjZWl2aW5nXG4gICAgICogLy8gUGVhY2Ugb3V0IVxuICAgICAqL1xuICAgIG9uRXhpdGluZzogb25FeGl0aW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBleGl0Q2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYFdlIHdlbnQgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBXZSB3ZW50IGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoZWQ6IG9uU3dpdGNoZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYmVmb3JlICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBHb2luZyBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIEdvaW5nIGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoaW5nOiBvblN3aXRjaGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBzd2l0Y2hDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUnVuIGNhbGxiYWNrcyB3aGVuIHRyYW5zaXRpb25zIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHJlY2VpdmVEYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBUaGUgYWJvdmUgZXhhbXBsZSB1c2luZyBhIGZ1bmN0aW9uIGZvciBjb25maWdcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoKHsgZW50ZXIgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBlbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IGVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBldGMuLi5cbiAgICAgKi9cbiAgICBvblRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdvblRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIHRyYW5zaXRpb25zIHdoZW4gZXZlbnRzIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIFVzZSBgdGhlbmAgdG8gb3B0aW9uYWxseSBhZGQgY2FsbGJhY2tzIHRvIHRob3NlIHRyYW5zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29tcGxleC1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIHVwZGF0ZVxuICAgICAqXG4gICAgICogICAgIC8vIE1heWJlIHRoaW5ncyB0YWtlIGEgbG9uZyB0aW1lLi4uXG4gICAgICogICAgIHVwZGF0ZSAtPlxuICAgICAqICAgICAgIHdhaXRpbmcgLT4gd2FpdGluZy1hLXdoaWxlXG4gICAgICpcbiAgICAgKiAgICAgLy8gV2hpY2ggcGF0aCB3aWxsIHdlIHRha2U/XG4gICAgICogICAgIHdhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT5cbiAgICAgKiAgICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dFxuICAgICAqXG4gICAgICogICAgIC8vIEFsbCBkb25lIVxuICAgICAqICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dCAtPlxuICAgICAqICAgICAgIGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoKHsgRW50ZXIsIGVtaXQgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHVwZGF0ZSc6IHtcbiAgICAgKiAgICAgb246ICd1c2VyLXNhdmVkJyxcbiAgICAgKiAgICAgdGhlbjogKGRhdGEpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnU2VuZGluZyBkYXRhOiAnLCBkYXRhKVxuICAgICAqXG4gICAgICogICAgICAgc2VuZERhdGEoZGF0YSlcbiAgICAgKiAgICAgICAgIC50aGVuKEVudGVyKCdzdWNjZXNzJykpXG4gICAgICogICAgICAgICAuY2F0Y2goRW50ZXIoJ2ZhaWxlZCcpKVxuICAgICAqXG4gICAgICogICAgICAgZW1pdCgnZGF0YS1zZW50JylcbiAgICAgKiAgICAgfVxuICAgICAqICAgfSxcbiAgICAgKiAgICd1cGRhdGUgLT4gd2FpdGluZyc6IHtcbiAgICAgKiAgICAgb246ICdkYXRhLXNlbnQnLFxuICAgICAqICAgICB0aGVuOiAoKSA9PiB7XG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcignd2FpdGluZy1hLXdoaWxlJyksIDc1MClcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd0aW1lb3V0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIEp1c3QgdG8gaWxsdXN0cmF0ZSB0aGF0IHlvdSBjYW4gbWl4IG4nIG1hdGNoIHdpdGggb25UcmFuc2l0aW9uczpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gc3VjY2Vzcyc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0xvdmVseSEnKVxuICAgICAqICAgfSxcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHRpbWVvdXQnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXZWxsLCBhdCBsZWFzdCB5b3UgaGF2ZSB5b3VyIHNob2VzJylcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCd1c2VyLXNhdmVkJywgWydzb21lJywgJ2RhdGEnXSlcbiAgICAgKiAvLyBTZW5kaW5nIGRhdGE6IFtcInNvbWVcIiwgXCJkYXRhXCJdXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBwZXJmb3JtVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ3BlcmZvcm1UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgVGhlIHByZXZpb3VzIHN0YXRlLCBvciBgdW5kZWZpbmVkYCBpZiB0aGVyZSBpc24ndCBvbmUgKGllOyB5b3VcbiAgICAgKiAgaGF2ZSBqdXN0IGNhbGxlZCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXR8LnJlc2V0KCl9LCBvciB0aGVcbiAgICAgKiAgbWFjaGluZSBoYXMganVzdCBzdGFydGVkLilcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnc2ltcGxlLXNlbmRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUucHJldmlvdXNTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKi9cbiAgICBwcmV2aW91c1N0YXRlOiBwcmV2aW91c1N0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUtbWFjaGluZSB0byBpdHMgc3RhcnRpbmctc3RhdGUgYW5kIGNsZWFycyB0aGVcbiAgICAgKiBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQWxsIGxpc3RlbmVycyB3aWxsIHN0aWxsIGJlIGF0dGFjaGVkLCBidXQgbm8gZXZlbnRzIG9yIHRyYW5zaXRpb25zIHdpbGwgYmUgZmlyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY2Fyb3VzZWwnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBwYWdlLTEgLT5cbiAgICAgKiAgICAgcGFnZS0yIC0+XG4gICAgICogICAgIHBhZ2UtMyAtPlxuICAgICAqICAgICBwYWdlLTQgLT4gcGFnZS0xXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3BhZ2UtMicpXG4gICAgICogbWFjaGluZS5yZXNldCgpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicGFnZS0xXCJcbiAgICAgKi9cbiAgICByZXNldDogcmVzZXQsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYGFycmF5YCBvZiBzdGF0ZXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBzdGF0ZSBzcGVjaWZpZWQuXG4gICAgICogSWYgbm8gc3RhdGUgaXMgcGFzc2VkLWluLCB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlXSBUaGUgc3RhdGUgdG8gY2hlY2suIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqICBpZiB1bnNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgICAqIC8vIFtcInNlbmRpbmdcIiwgXCJyZWNlaXZpbmdcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoJ3JlY2VpdmluZycpXG4gICAgICogLy8gW1wiZG9uZVwiXVxuICAgICAqL1xuICAgIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlOiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzU3RhdGVib3QgKG1hY2hpbmUpIHtcbiAgcmV0dXJuIChcbiAgICBpc1Bvam8obWFjaGluZSkgJiZcbiAgICB0eXBlb2YgbWFjaGluZS5fX1NUQVRFQk9UX18gPT09ICdudW1iZXInXG4gIClcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIFVUSUxTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzUG9qbyxcbiAgaXNUZW1wbGF0ZUxpdGVyYWwsXG4gIHVuaXEsXG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIFJlZmVyZW5jZUNvdW50ZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyXG59XG5cbmZ1bmN0aW9uIGlzRXZlbnRFbWl0dGVyIChvYmopIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmouZW1pdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiBvYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2Ygb2JqLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nXG4gIClcbn1cblxuZnVuY3Rpb24gaXNQb2pvIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZVxufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTGl0ZXJhbCAob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmouZXZlcnkoaXRlbSA9PiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHVuaXEgKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgb25lKSA9PiAoYWNjLmluZGV4T2Yob25lKSA9PT0gLTEgPyBbLi4uYWNjLCBvbmVdIDogYWNjKSwgW10pXG59XG5cbmZ1bmN0aW9uIGRlZmVyIChmbiwgLi4uYXJncykge1xuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoZm4sIDAsIC4uLmFyZ3MpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5mdW5jdGlvbiBEZWZlciAoZm4pIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBkZWZlcihmbiwgLi4uYXJncylcbn1cblxuZnVuY3Rpb24gT25jZSAoZm4pIHtcbiAgY29uc3QgeyByZXZva2UsIGZuOiBfZm4gfSA9IFJldm9rYWJsZShmbilcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICByZXN1bHQgPSBfZm4oLi4uYXJncylcbiAgICByZXZva2UoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBSZXZva2FibGUgKGZuKSB7XG4gIGxldCByZXZva2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4ge1xuICAgIGZuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCFyZXZva2VkKSB7XG4gICAgICAgIHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICByZXZva2U6ICgpID0+IHtcbiAgICAgIHJldm9rZWQgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFJlZmVyZW5jZUNvdW50ZXIgKG5hbWUsIGtpbmQsIGRlc2NyaXB0aW9uLCAuLi5leHBlY3RpbmcpIHtcbiAgY29uc3QgX3JlZnMgPSB7fTtcbiAgWy4uLmV4cGVjdGluZ10uZmxhdCgpLmZvckVhY2gocmVmID0+IHtcbiAgICBfcmVmc1tyZWZdID0gMFxuICB9KVxuICBmdW5jdGlvbiBpbmNyZWFzZSAocmVmKSB7XG4gICAgX3JlZnNbcmVmXSA9IGNvdW50T2YocmVmKSArIDFcbiAgICByZXR1cm4gKCkgPT4gZGVjcmVhc2UocmVmKVxuICB9XG4gIGZ1bmN0aW9uIGRlY3JlYXNlIChyZWYpIHtcbiAgICBjb25zdCBjb3VudCA9IGNvdW50T2YocmVmKSAtIDFcbiAgICBfcmVmc1tyZWZdID0gTWF0aC5tYXgoY291bnQsIDApXG4gIH1cbiAgZnVuY3Rpb24gY291bnRPZiAocmVmKSB7XG4gICAgcmV0dXJuIF9yZWZzW3JlZl0gfHwgMFxuICB9XG4gIGZ1bmN0aW9uIHJlZnMgKCkge1xuICAgIHJldHVybiB7IC4uLl9yZWZzIH1cbiAgfVxuICBmdW5jdGlvbiB0YWJsZSAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKF9yZWZzKS5zb3J0KClcbiAgICAgIC5tYXAoa2V5ID0+IFtrZXksIF9yZWZzW2tleV1dKVxuICAgICAgLm1hcCgoW3JlZiwgY291bnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgW2tpbmRdOiByZWYsXG4gICAgICAgICAgcmVmczogY291bnQgfHwgJ05vbmUnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gdG9WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBgU3RhdGVib3RbJHtuYW1lfV06ICR7ZGVzY3JpcHRpb259OmAsXG4gICAgICB0YWJsZTogdGFibGUoKVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGluY3JlYXNlOiBpbmNyZWFzZSxcbiAgICBkZWNyZWFzZTogZGVjcmVhc2UsXG4gICAgY291bnRPZjogY291bnRPZixcbiAgICB0b1ZhbHVlOiB0b1ZhbHVlLFxuICAgIHJlZnM6IHJlZnNcbiAgfVxufVxuXG5mdW5jdGlvbiBBcmdUeXBlRXJyb3IgKGVyclByZWZpeCA9ICcnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm5OYW1lLCB0eXBlTWFwLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgYXJnTWFwID0gT2JqZWN0LmVudHJpZXModHlwZU1hcClcbiAgICAgIC5tYXAoKFthcmdOYW1lLCBhcmdUeXBlXSkgPT4ge1xuICAgICAgICByZXR1cm4geyBhcmdOYW1lLCBhcmdUeXBlIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBzaWduYXR1cmUgPSBPYmplY3Qua2V5cyh0eXBlTWFwKS5qb2luKCcsICcpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdzXG4gICAgICAubWFwKChhcmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYXJnTmFtZSwgYXJnVHlwZSB9ID0gYXJnTWFwW2luZGV4XVxuICAgICAgICBpZiAoYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gYEFyZ3VtZW50IHVuZGVmaW5lZDogXCIke2FyZ05hbWV9XCJgXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXJyb3JEZXNjXG4gICAgICAgIGxldCB0eXBlTmFtZVxuICAgICAgICBsZXQgdHlwZU1hdGNoZXNcblxuICAgICAgICBpZiAodHlwZW9mIGFyZ1R5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IGFyZ1R5cGUoYXJnKSA9PT0gdHJ1ZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZS5uYW1lXG4gICAgICAgICAgZXJyb3JEZXNjID0gYCR7dHlwZU5hbWV9KCR7YXJnTmFtZX0pIGRpZCBub3QgcmV0dXJuIHRydWVgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuICAgICAgICAgIHR5cGVNYXRjaGVzID0gdHlwZW9mIGFyZyA9PT0gYXJnVHlwZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGBBcmd1bWVudCBcIiR7YXJnTmFtZX1cIiBzaG91bGQgYmUgYSAke3R5cGVOYW1lfWBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHlwZU1hdGNoZXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYCR7ZXJyb3JEZXNjfTogJHthcmdOYW1lfSA9PT0gJHt0eXBlb2YgYXJnfSgke2FyZ30pYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcblxuICAgIGlmICghZXJyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgXFxuJHtlcnJQcmVmaXh9JHtmbk5hbWV9KCR7c2lnbmF0dXJlfSk6XFxuYCArXG4gICAgICAgIGAke2Vyci5tYXAoZXJyID0+IGA+ICR7ZXJyfWApLmpvaW4oJ1xcbicpfWBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gTG9nZ2VyIChsZXZlbCkge1xuICBsZXQgX2xldmVsID0gbGV2ZWxcbiAgaWYgKHR5cGVvZiBfbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgX2xldmVsID0gKHtcbiAgICAgIGluZm86IDMsXG4gICAgICBsb2c6IDIsXG4gICAgICB3YXJuOiAxLFxuICAgICAgbm9uZTogMFxuICAgIH0pW19sZXZlbF0gfHwgM1xuICB9XG4gIGZ1bmN0aW9uIGNhbldhcm4gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMVxuICB9XG4gIGZ1bmN0aW9uIGNhbkxvZyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAyXG4gIH1cbiAgZnVuY3Rpb24gY2FuSW5mbyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAzXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjYW5XYXJuLFxuICAgIGNhbkxvZyxcbiAgICBjYW5JbmZvLFxuXG4gICAgaW5mbzogKC4uLmFyZ3MpID0+IGNhbkluZm8oKSAmJiBjb25zb2xlLmluZm8oLi4uYXJncyksXG4gICAgdGFibGU6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLnRhYmxlKC4uLmFyZ3MpLFxuICAgIGxvZzogKC4uLmFyZ3MpID0+IGNhbkxvZygpICYmIGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuICAgIHdhcm46ICguLi5hcmdzKSA9PiBjYW5XYXJuKCkgJiYgY29uc29sZS53YXJuKC4uLmFyZ3MpLFxuICAgIGVycm9yOiAoLi4uYXJncykgPT4gY29uc29sZS5lcnJvciguLi5hcmdzKVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9