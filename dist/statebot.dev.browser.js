var statebot =
/******/ (function(modules) { // webpackBootstrap
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0ZWJvdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL25vZGVfbW9kdWxlcy8ucG5wbS9yZWdpc3RyeS5ucG1qcy5vcmcvZXZlbnRzLzMuMS4wL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL2Fzc2VydGlvbnMuanMiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvcGFyc2luZy5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy9zdGF0ZWJvdC5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicm91dGVJc1Bvc3NpYmxlIiwiYXNzZXJ0Um91dGUiLCJyZXF1aXJlIiwiaXNTdGF0ZWJvdCIsImRlY29tcG9zZVJvdXRlIiwiRGVmZXIiLCJPbmNlIiwiUmV2b2thYmxlIiwiTG9nZ2VyIiwiQXJnVHlwZUVycm9yIiwiaXNUZW1wbGF0ZUxpdGVyYWwiLCJhcmdUeXBlRXJyb3IiLCJtYWNoaW5lIiwiZXhwZWN0ZWRSb3V0ZSIsImVyciIsIlR5cGVFcnJvciIsInJvdXRlIiwiZXZlcnkiLCJzdGF0ZSIsImluZGV4IiwibGVuZ3RoIiwibmV4dFN0YXRlIiwiYXZhaWxhYmxlU3RhdGVzIiwic3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUiLCJwYXNzZXMiLCJpbmNsdWRlcyIsImFzc2VydGlvbklkIiwib3B0aW9ucyIsImRlc2NyaXB0aW9uIiwiZnJvbVN0YXRlIiwicnVuIiwicGVybWl0dGVkRGV2aWF0aW9ucyIsInRpbWVvdXRJbk1zIiwibG9nTGV2ZWwiLCJjb25zb2xlIiwicHJlZml4IiwibmFtZSIsImxvZyIsImpvaW4iLCJmcm9tU3RhdGVBY3Rpb25GbiIsInJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuIiwidG90YWxUaW1lVGFrZW4iLCJUaW1lVGFrZW4iLCJzdGF0ZVRpbWVUYWtlbiIsImFzc2VydGlvblRpbWVvdXRUaW1lciIsImRldmlhdGlvbnMiLCJwZW5kaW5nIiwidW5leHBlY3RlZCIsImNvbnN1bWVSb3V0ZSIsInJlcG9ydCIsIlRhYmxlIiwiZmluYWxpc2VSZXBvcnQiLCJhZGRSb3ciLCJsb2NrIiwidGFibGUiLCJjb250ZW50IiwiZW50ZXJlZFN0YXRlIiwiZXhwZWN0ZWRTdGF0ZSIsInNoaWZ0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJFcnJvciIsImNsZWFyVGltZW91dEFuZFJlc29sdmUiLCJjbGVhclRpbWVvdXQiLCJyZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyIiwiY2xlYXJUaW1lb3V0QW5kUmVqZWN0IiwiYmFpbG91dCIsIm1lc3NhZ2UiLCJjdXJyZW50U3RhdGUiLCJpblN0YXRlIiwic2V0VGltZW91dCIsInJldm9rZSIsImZuIiwib25Td2l0Y2hpbmciLCJjb2x1bW5zIiwiYWxpZ25tZW50cyIsImFsaWdubWVudCIsIm1hcCIsIl8iLCJsb2NrZWQiLCJhcmdzIiwib2JqIiwicmVkdWNlIiwiYWNjIiwiY29sIiwicm93IiwicHVzaCIsImNvbFNpemVzIiwiTWF0aCIsIm1heCIsInBhZExlZnQiLCJzdHIiLCJsZW4iLCJyZXBlYXQiLCJwYWRSaWdodCIsInNpemVzIiwiZm9ybWF0RmllbGQiLCJ2YWx1ZSIsInNpemUiLCJhbGlnbiIsIm91dHB1dCIsImZvcm1hdHRlZFJvdyIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJmbXQiLCJudW0iLCJkaWdpdHMiLCJ0b0ZpeGVkIiwicmVwbGFjZSIsImR1cmF0aW9uIiwiU3RhdGVib3QiLCJkZWNvbXBvc2VDaGFydCIsImN4UGlwZSIsImN4QXJyb3ciLCJyeERpc2FsbG93ZWRDaGFyYWN0ZXJzIiwicnhDUkxGIiwicnhDb21tZW50IiwicnhPcGVyYXRvcnMiLCJyeFVuc2FmZSIsInJ4TGluZUNvbnRpbmF0aW9ucyIsIlJlZ0V4cCIsInVuaXEiLCJ0ZW1wbGF0ZUxpdGVyYWwiLCJyYXdMaW5lcyIsImZsYXQiLCJjb2RlT25seSIsInJlbW92ZUNvbW1lbnRzIiwibGluZXMiLCJjb25kZW5zZUxpbmVzIiwiZmxhdHRlbmVkUm91dGUiLCJzYW5pdGlzZUxpbmVzIiwibGluZXNUb1Byb2Nlc3MiLCJsaW5lc09mUm91dGVzIiwiZGVjb21wb3NlTGluZUludG9Sb3V0ZSIsImxpbmVzT2ZUcmFuc2l0aW9ucyIsImRlY29tcG9zZVJvdXRlSW50b1RyYW5zaXRpb24iLCJzdGF0ZXMiLCJyb3V0ZUtleXMiLCJmaWx0ZXJlZFJvdXRlcyIsImZpbHRlcmVkU3RhdGVzIiwidHJhbnNpdGlvbnMiLCJzcGxpdCIsInJvdXRlcyIsImFycmF5T2ZTdHJpbmdzIiwic3RyaW5nIiwicGFydCIsImZpbHRlciIsIkJvb2xlYW4iLCJsaW5lIiwidGVzdCIsInRyaW0iLCJjdXJyZW50TGluZSIsInByZXZpb3VzU3RhdGVzIiwicGFpcnMiLCJmcm9tU3RhdGVzIiwidG9TdGF0ZXMiLCJ0b1N0YXRlIiwiRXZlbnRFbWl0dGVyIiwiaXNQb2pvIiwiaXNFdmVudEVtaXR0ZXIiLCJSZWZlcmVuY2VDb3VudGVyIiwibG9nUHJlZml4IiwiY2hhcnQiLCJ1bmRlZmluZWQiLCJoaXN0b3J5TGltaXQiLCJjYW5XYXJuIiwic3RhcnRJbiIsInRyYW5zaXRpb25JZCIsInN0YXRlSGlzdG9yeSIsInN0YXRlSGlzdG9yeUxpbWl0IiwiZXZlbnRzIiwiaW50ZXJuYWxFdmVudHMiLCJJTlRFUk5BTF9FVkVOVFMiLCJTVEFURV9DSEFOR0lORyIsIlNUQVRFX0NIQU5HRUQiLCJlbWl0SW50ZXJuYWxFdmVudCIsImV2ZW50TmFtZSIsImVtaXQiLCJvbkludGVybmFsRXZlbnQiLCJhZGRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwic3RhdGVzSGFuZGxlZCIsInJvdXRlc0hhbmRsZWQiLCJldmVudHNIYW5kbGVkIiwiYXBwbHlIaXRjaGVyIiwiaGl0Y2hlciIsImZuTmFtZSIsImhpdGNoZXJBY3Rpb25zIiwiZW50ZXIiLCJFbnRlciIsIkVtaXQiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsInJvdXRlQ2hhcnQiLCJhY3Rpb25PckNvbmZpZyIsImFjdGlvbiIsIl9vbiIsIm9uIiwiX3RoZW4iLCJ0aGVuIiwiQXJyYXkiLCJpc0FycmF5IiwiZXZlbnROYW1lcyIsImFsbFN0YXRlcyIsImFsbFJvdXRlcyIsImRlY29tcG9zZWRFdmVudHMiLCJfY29uZmlncyIsImRlY29tcG9zZUNvbmZpZ3MiLCJjb25maWdzIiwiYWxsQ2xlYW51cEZucyIsImluY3JlYXNlIiwib25FdmVudCIsImV2ZW50V2FzSGFuZGxlZCIsInNvbWUiLCJwYXNzZWQiLCJ0cmFuc2l0aW9uTm9PcCIsInRyYW5zaXRpb25Db25maWdzIiwidHJhbnNpdGlvbiIsImludmFsaWRTdGF0ZXMiLCJpbnZhbGlkUm91dGVzIiwid2FybiIsImNvbmZpZyIsInByZXZpb3VzU3RhdGUiLCJhbnlPckZuIiwiY29uZGl0aW9uTWF0Y2hlcyIsImZuQXJncyIsIkluU3RhdGUiLCJjYW5UcmFuc2l0aW9uVG8iLCJ0ZXN0U3RhdGVzIiwibmV4dFN0YXRlcyIsIl9zdGF0ZSIsIm5leHRSb3V0ZSIsImluZm8iLCJjYiIsImRlY3JlYXNlUmVmQ291bnQiLCJyZW1vdmVFdmVudCIsIm9uU3dpdGNoZWQiLCJvbkV4aXRpbmciLCJkZWNyZWFzZVJlZkNvdW50cyIsIm9uRXhpdGVkIiwib25FbnRlcmluZyIsIm9uRW50ZXJlZCIsInJlc2V0IiwibGFzdFN0YXRlIiwicHJldlJvdXRlIiwiaW5zcGVjdCIsInJlZnMiLCJsb2dSZWZDb3VudGVySW5mbyIsInJlZkNvdW50ZXIiLCJ0b1ZhbHVlIiwiX19TVEFURUJPVF9fIiwiaGlzdG9yeSIsIm9uVHJhbnNpdGlvbnMiLCJwZXJmb3JtVHJhbnNpdGlvbnMiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsIml0ZW0iLCJpbnB1dCIsIm9uZSIsImluZGV4T2YiLCJkZWZlciIsInRpbWVyIiwiX2ZuIiwicmVzdWx0IiwicmV2b2tlZCIsImtpbmQiLCJfcmVmcyIsImV4cGVjdGluZyIsInJlZiIsImNvdW50T2YiLCJkZWNyZWFzZSIsImNvdW50Iiwia2V5cyIsInNvcnQiLCJrZXkiLCJlcnJQcmVmaXgiLCJ0eXBlTWFwIiwiYXJnTWFwIiwiYXJnTmFtZSIsImFyZ1R5cGUiLCJzaWduYXR1cmUiLCJhcmciLCJlcnJvckRlc2MiLCJ0eXBlTmFtZSIsInR5cGVNYXRjaGVzIiwibGV2ZWwiLCJfbGV2ZWwiLCJub25lIiwiY2FuTG9nIiwiY2FuSW5mbyIsImVycm9yIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztB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LEdBQW1CO0FBQ2pCLFdBQU9GLE1BQU0sSUFBSSxDQUFqQjtBQUNEOztBQUNELFdBQVNHLE9BQVQsR0FBb0I7QUFDbEIsV0FBT0gsTUFBTSxJQUFJLENBQWpCO0FBQ0Q7O0FBQ0QsU0FBTztBQUNMMUgsV0FBTyxFQUFQQSxPQURLO0FBRUw0SCxVQUFNLEVBQU5BLE1BRks7QUFHTEMsV0FBTyxFQUFQQSxPQUhLO0FBS0x6RCxRQUFJLEVBQUU7QUFBQTs7QUFBQSxhQUFheUQsT0FBTyxNQUFNLFlBQUFsUSxPQUFPLEVBQUN5TSxJQUFSLDJCQUExQjtBQUFBLEtBTEQ7QUFNTHJMLFNBQUssRUFBRTtBQUFBOztBQUFBLGFBQWE2TyxNQUFNLE1BQU0sYUFBQWpRLE9BQU8sRUFBQ29CLEtBQVIsNEJBQXpCO0FBQUEsS0FORjtBQU9MakIsT0FBRyxFQUFFO0FBQUE7O0FBQUEsYUFBYThQLE1BQU0sTUFBTSxhQUFBalEsT0FBTyxFQUFDRyxHQUFSLDRCQUF6QjtBQUFBLEtBUEE7QUFRTDBMLFFBQUksRUFBRTtBQUFBOztBQUFBLGFBQWF4RCxPQUFPLE1BQU0sYUFBQXJJLE9BQU8sRUFBQzZMLElBQVIsNEJBQTFCO0FBQUEsS0FSRDtBQVNMc0UsU0FBSyxFQUFFO0FBQUE7O0FBQUEsYUFBYSxhQUFBblEsT0FBTyxFQUFDbVEsS0FBUiw0QkFBYjtBQUFBO0FBVEYsR0FBUDtBQVdELEMiLCJmaWxlIjoiLi9zdGF0ZWJvdC5kZXYuYnJvd3Nlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBBU1NFUlRJT04gSEVMUEVSU1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJvdXRlSXNQb3NzaWJsZSxcbiAgYXNzZXJ0Um91dGVcbn1cblxuY29uc3QgeyBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgZGVjb21wb3NlUm91dGUgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5jb25zdCB7XG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIExvZ2dlcixcbiAgQXJnVHlwZUVycm9yLFxuICBpc1RlbXBsYXRlTGl0ZXJhbFxufSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbmZ1bmN0aW9uIHJvdXRlSXNQb3NzaWJsZSAobWFjaGluZSwgZXhwZWN0ZWRSb3V0ZSkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3JvdXRlSXNQb3NzaWJsZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCBleHBlY3RlZFJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIGV4cGVjdGVkUm91dGVcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IHJvdXRlID0gZGVjb21wb3NlUm91dGUoZXhwZWN0ZWRSb3V0ZSlcbiAgcmV0dXJuIHJvdXRlLmV2ZXJ5KChzdGF0ZSwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPT09IHJvdXRlLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJvdXRlW2luZGV4ICsgMV1cbiAgICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoc3RhdGUpXG4gICAgICBjb25zdCBwYXNzZXMgPSBhdmFpbGFibGVTdGF0ZXMuaW5jbHVkZXMobmV4dFN0YXRlKVxuICAgICAgcmV0dXJuIHBhc3Nlc1xuICAgIH1cbiAgfSlcbn1cblxubGV0IGFzc2VydGlvbklkID0gMFxuXG4vKipcbiAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfSBvcHRpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gYXNzZXJ0Um91dGVPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Rlc2NyaXB0aW9uXVxuICogIERlc2NyaWJlIHRoZSBzdWNjZXNzLWNvbmRpdGlvbiBmb3IgdGhpcyBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Zyb21TdGF0ZT1cIlwiXVxuICogIFdhaXQgZm9yIHRoZSBtYWNoaW5lIHRvIGJlIGluIHRoaXMgc3RhdGUgYmVmb3JlIGFzc2VydGlvbiBiZWdpbnMuXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBbcnVuXVxuICogIFJ1biB0aGlzIGZ1bmN0aW9uIGp1c3QgYmVmb3JlIHN0YXJ0aW5nIHRoZSBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3Blcm1pdHRlZERldmlhdGlvbnM9MF1cbiAqICBJZiB3ZSBoaXQgYW4gdW5leHBlY3RlZCBzdGF0ZSBkdXJpbmcgYXNzZXJ0aW9uLCB0aGlzIGlzIGEgXCJkZXZpYXRpb25cIi5cbiAqICBJdCBtaWdodCBiZSB0aGF0IHRoZSBGU00gd2lsbCBjb21lIGJhY2sgdG8gdGhlIGV4cGVjdGVkIHN0YXRlIGFnYWluXG4gKiAgYWZ0ZXIgYSBjZXJ0YWluIG51bWJlciBvZiB0aGVzZS4gRm9yIGV4YW1wbGUsIGlmIHlvdXIgRlNNIGhhcyBhXG4gKiAgXCJyZXRyeVwiIHJvdXRlIGNvbmZpZ3VyZWQsIHRoaXMgbnVtYmVyIGNhbiBhY2NvdW50IGZvciBpdC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbdGltZW91dEluTXM9MTAwMF1cbiAqICBQZXJtaXR0ZWQgbGVuZ3RoIG9mIHRpbWUgZm9yIHRoZSBlbnRpcmUgYXNzZXJ0aW9uLCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgTm9ybWFsbHkgd2Ugd2FudCBsb2dzIGZvciBhc3NlcnRpb25zLCByaWdodD8gV2VsbCwgeW91IGNhbiB0dW5lXG4gKiAgdGhlbSBqdXN0IGxpa2UgeW91IGNhbiB3aXRoIHtAbGluayAjc3RhdGVib3RvcHRpb25zfHN0YXRlYm90T3B0aW9uc30uXG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0Um91dGUgKG1hY2hpbmUsIGV4cGVjdGVkUm91dGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdhc3NlcnRSb3V0ZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCBleHBlY3RlZFJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIGV4cGVjdGVkUm91dGVcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGFzc2VydGlvbklkICs9IDFcblxuICBjb25zdCB7XG4gICAgZGVzY3JpcHRpb24gPSAnQXNzZXJ0aW9uIGNvbXBsZXRlJyxcbiAgICBmcm9tU3RhdGUgPSAnJyxcbiAgICBydW4gPSAoKSA9PiB7fSxcbiAgICBwZXJtaXR0ZWREZXZpYXRpb25zID0gMCxcbiAgICB0aW1lb3V0SW5NcyA9IDEwMDAsXG4gICAgbG9nTGV2ZWwgPSAzXG4gIH0gPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uc3QgY29uc29sZSA9IExvZ2dlcihsb2dMZXZlbClcblxuICBjb25zdCBwcmVmaXggPSBgU3RhdGVib3RbJHttYWNoaW5lLm5hbWUoKX1dOiBhSWQ8JHthc3NlcnRpb25JZH0+YFxuICBjb25zdCByb3V0ZSA9IGRlY29tcG9zZVJvdXRlKGV4cGVjdGVkUm91dGUpXG5cbiAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogQXNzZXJ0aW5nIHJvdXRlOiBbJHtyb3V0ZS5qb2luKCcgPiAnKX1dYClcbiAgY29uc29sZS5sb2coYCR7cHJlZml4fTogPiBBc3NlcnRpb24gd2lsbCBzdGFydCBmcm9tIHN0YXRlOiBcIiR7ZnJvbVN0YXRlfVwiYClcblxuICBjb25zdCBmcm9tU3RhdGVBY3Rpb25GbiA9IERlZmVyKHJ1bilcbiAgbGV0IHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gKCkgPT4geyB9XG5cbiAgY29uc3QgdG90YWxUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgYXNzZXJ0aW9uVGltZW91dFRpbWVyXG4gIGxldCBkZXZpYXRpb25zID0gMFxuICBsZXQgcGVuZGluZyA9IHRydWVcbiAgbGV0IHVuZXhwZWN0ZWQgPSBmYWxzZVxuXG4gIGNvbnN0IGNvbnN1bWVSb3V0ZSA9IFsuLi5yb3V0ZV1cbiAgY29uc3QgcmVwb3J0ID0gVGFibGUoXG4gICAgWydzdGF0ZScsICdleHBlY3RlZCcsICdpbmZvJywgJ3Rvb2snXSxcbiAgICBbJ2NlbnRlcicsICdjZW50ZXInLCAnbGVmdCcsICdyaWdodCddXG4gIClcblxuICBjb25zdCBmaW5hbGlzZVJlcG9ydCA9IE9uY2UoZXJyID0+IHtcbiAgICBhZGRSb3coJycsICcnLCAnJywgJ1RPVEFMOiAnICsgdG90YWxUaW1lVGFrZW4oKSlcbiAgICByZXBvcnQubG9jaygpXG4gICAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogJHtkZXNjcmlwdGlvbn06IFske2VyciA/ICdGQUlMRUQnIDogJ1NVQ0NFU1MnfV1gKVxuICAgIGNvbnNvbGUudGFibGUocmVwb3J0LmNvbnRlbnQoKSlcbiAgICByZXR1cm4gZXJyXG4gIH0pXG5cbiAgY29uc3QgeyBhZGRSb3cgfSA9IHJlcG9ydFxuICBmdW5jdGlvbiBlbnRlcmVkU3RhdGUgKHN0YXRlKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIGFkZFJvdyhzdGF0ZSwgJy0nLCAnUEVORElORycpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSBjb25zdW1lUm91dGVbMF1cbiAgICAgIGlmIChleHBlY3RlZFN0YXRlID09PSBzdGF0ZSkge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsIHVuZXhwZWN0ZWQgPyAnUkVBTElHTkVEJyA6ICdPS0FZJywgc3RhdGVUaW1lVGFrZW4oKSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICAgIGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsICdXUk9ORyBTVEFURScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSB0cnVlXG4gICAgICAgIGRldmlhdGlvbnMgKz0gMVxuICAgICAgfVxuICAgICAgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IoJ05PIFJPVVRFIFRPIFRFU1QnKSkpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZXNvbHZlID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlc29sdmUoLi4uYXJncylcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZWplY3QgPSBlcnIgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGFzc2VydGlvblRpbWVvdXRUaW1lcilcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIoKVxuICAgICAgcmVqZWN0KGVycilcbiAgICB9XG5cbiAgICBjb25zdCBiYWlsb3V0ID0gbWVzc2FnZSA9PiB7XG4gICAgICB3aGlsZSAoY29uc3VtZVJvdXRlLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlLnNoaWZ0KClcbiAgICAgICAgYWRkUm93KG1hY2hpbmUuY3VycmVudFN0YXRlKCksIGAoJHtleHBlY3RlZFN0YXRlfSlgLCBtZXNzYWdlKVxuICAgICAgICB1bmV4cGVjdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dEFuZFJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IobWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGlmIChtYWNoaW5lLmluU3RhdGUoZnJvbVN0YXRlKSkge1xuICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9IGZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICB9XG5cbiAgICBjb25zdCB7IHJldm9rZSwgZm4gfSA9IFJldm9rYWJsZShzdGF0ZSA9PiB7XG4gICAgICBhc3NlcnRpb25UaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVElNRU9VVCcpXG4gICAgICB9LCB0aW1lb3V0SW5NcylcblxuICAgICAgZW50ZXJlZFN0YXRlKHN0YXRlKVxuICAgICAgaWYgKHBlbmRpbmcgJiYgc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBwZW5kaW5nID0gZmFsc2VcbiAgICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICB9XG4gICAgICBpZiAoZGV2aWF0aW9ucyA+IHBlcm1pdHRlZERldmlhdGlvbnMpIHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVE9PIE1BTlkgREVWSUFUSU9OUycpXG4gICAgICB9XG4gICAgICBpZiAoY29uc3VtZVJvdXRlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGNsZWFyVGltZW91dEFuZFJlc29sdmUoZmluYWxpc2VSZXBvcnQoKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lciA9IG1hY2hpbmUub25Td2l0Y2hpbmcoZm4pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIFRhYmxlIChjb2x1bW5zID0gW10sIGFsaWdubWVudHMgPSBbXSkge1xuICBjb25zdCB0YWJsZSA9IFtdXG4gIGNvbnN0IGFsaWdubWVudCA9IGNvbHVtbnMubWFwKChfLCBpbmRleCkgPT4gYWxpZ25tZW50c1tpbmRleF0gfHwgJ2NlbnRlcicpXG5cbiAgbGV0IGxvY2tlZCA9IGZhbHNlXG4gIGZ1bmN0aW9uIGxvY2sgKCkge1xuICAgIGxvY2tlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFJvdyAoLi4uYXJncykge1xuICAgIGlmIChsb2NrZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBvYmogPSBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjb2wsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByb3cgPSBhcmdzW2luZGV4XSB8fCAnJ1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogcm93XG4gICAgICB9XG4gICAgfSwge30pXG4gICAgdGFibGUucHVzaChvYmopXG4gIH1cblxuICBmdW5jdGlvbiBjb2xTaXplcyAoKSB7XG4gICAgcmV0dXJuIHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IGNvbHVtbnMubWFwKChjb2wsIGluZGV4KSA9PiBNYXRoLm1heChyb3dbY29sXS5sZW5ndGgsIGFjY1tpbmRleF0pKSwgY29sdW1ucy5tYXAoKCkgPT4gMCkpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRMZWZ0IChzdHIsIGxlbikge1xuICAgIHJldHVybiBzdHIgKyAnICcucmVwZWF0KGxlbiAtIHN0ci5sZW5ndGgpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRSaWdodCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKSArIHN0clxuICB9XG5cbiAgZnVuY3Rpb24gY29udGVudCAoKSB7XG4gICAgY29uc3Qgc2l6ZXMgPSBjb2xTaXplcygpXG4gICAgZnVuY3Rpb24gZm9ybWF0RmllbGQgKHZhbHVlLCBpbmRleCkge1xuICAgICAgY29uc3Qgc2l6ZSA9IHNpemVzW2luZGV4XVxuICAgICAgY29uc3QgYWxpZ24gPSBhbGlnbm1lbnRbaW5kZXhdXG4gICAgICBpZiAoYWxpZ24gPT09ICdsZWZ0Jykge1xuICAgICAgICByZXR1cm4gcGFkTGVmdCh2YWx1ZSwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIGlmIChhbGlnbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICByZXR1cm4gcGFkUmlnaHQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gdGFibGUucmVkdWNlKChhY2MsIHJvdykgPT4ge1xuICAgICAgY29uc3QgZm9ybWF0dGVkUm93ID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4gKHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogZm9ybWF0RmllbGQocm93W2NvbF0sIGluZGV4KVxuICAgICAgfSksIHt9KVxuICAgICAgcmV0dXJuIFsuLi5hY2MsIGZvcm1hdHRlZFJvd11cbiAgICB9LCBbXSlcbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvY2s6IGxvY2ssXG4gICAgYWRkUm93OiBhZGRSb3csXG4gICAgY29udGVudDogY29udGVudFxuICB9XG59XG5cbmZ1bmN0aW9uIFRpbWVUYWtlbiAoKSB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KClcblxuICBmdW5jdGlvbiBmbXQgKG51bSwgZGlnaXRzKSB7XG4gICAgcmV0dXJuIG51bS50b0ZpeGVkKGRpZ2l0cykucmVwbGFjZSgvXFwuMCskLywgJycpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuXG4gICAgaWYgKGR1cmF0aW9uIDwgNTAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uKX0gbXNgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDUwMDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwLCAyKX0gcyBgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDYwMDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMSl9IHMgYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCAvIDYwLCAxKX0gbSBgXG4gICAgfVxuICB9XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBFWFBPUlRTXG4vL1xuXG5jb25zdCB7IFN0YXRlYm90LCBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgYXNzZXJ0Um91dGUsIHJvdXRlSXNQb3NzaWJsZSB9ID0gcmVxdWlyZSgnLi9hc3NlcnRpb25zJylcbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbi8qKlxuICogPGltZyBzcmM9XCIuL2xvZ28tZnVsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogMjU1cHg7IG1hcmdpbjogMTBweCAwO1wiIC8+XG4gKlxuICogV3JpdGUgbW9yZSByb2J1c3QgYW5kIHVuZGVyc3RhbmRhYmxlIHByb2dyYW1zLlxuICpcbiAqIFN0YXRlYm90IGhvcGVzIHRvIG1ha2UgW0Zpbml0ZSBTdGF0ZSBNYWNoaW5lc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmluaXRlLXN0YXRlX21hY2hpbmUpIChGU01zKSBhIGxpdHRsZSBtb3JlIGFjY2Vzc2libGUuXG4gKlxuICogWW91J3JlIHJlYWRpbmcgdGhlIGRvY3VtZW50YXRpb24uIE90aGVyIGV4aXRzIGFyZTpcbiAqXG4gKiAtIFRoZSBbUkVBRE1FIGZpbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3QvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kKVxuICogLSBUaGUgW0dpdGh1YiBSZXBvXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90KVxuICogLSBUaGUgc2hlbGwtc2NyaXB0IHZlcnNpb24sIFtTdGF0ZWJvdC1zaF0oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdC1zaClcbiAqXG4gKiBTdGF0ZWJvdCB3YXMgd3JpdHRlbiBieSBbQ29uYW4gVGhlb2JhbGRdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvKSBhbmRcbiAqIGlzIFtJU0MgbGljZW5zZWRdKC4uL0xJQ0VOU0UpLlxuICpcbiAqICMjIyBKdW1wIHJpZ2h0IGluXG4gKlxuICogWW91IGNhbiBpbnN0YWxsIFN0YXRlYm90IGludG8geW91ciBgbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYHNoXG4gKiBucG0gaSBzdGF0ZWJvdFxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGltcG9ydCBzdGF0ZWJvdCBmcm9tICdzdGF0ZWJvdCdcbiAqIGBgYFxuICpcbiAqIE9yIG5vbi1gbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYGpzXG4gKiA8c2NyaXB0IHNyYz1cImh0dHBzOi8vdW5wa2cuY29tL3N0YXRlYm90QDIuMC4wL2Rpc3Qvc3RhdGVib3QubWluLmJyb3dzZXIuanNcIj48L3NjcmlwdD5cbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCB7IFN0YXRlYm90IH0gPSBzdGF0ZWJvdFxuICogLy8gTWFrZSBtYWNoaW5lcyB3aXRoIFN0YXRlYm90KClcbiAqXG4gKiBjb25zdCB7IGlzU3RhdGVib3QsIHJvdXRlSXNQb3NzaWJsZSwgYXNzZXJ0Um91dGUgfSA9IHN0YXRlYm90XG4gKiAvLyBUaGVzZSBhcmUgYXNzZXJ0aW9uIGhlbHBlcnMgeW91IGNhbiB1c2UgZm9yIHRlc3RpbmdcbiAqIGBgYFxuICpcbiAqICMjIyBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSA6KVxuICpcbiAqIEkndmUgaW5jbHVkZWQgU3RhdGVib3QgaW4gdGhpcyBwYWdlLiBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSB0b1xuICogZm9sbG93IGFsb25nIHdpdGggdGhlIGV4YW1wbGVzIGJlbG93OlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwcm9taXNlLWxpa2UnLCB7XG4gKiAgIGNoYXJ0OiBgXG4gKiAgICAgLy8gVGhpcyBvbmUgd2lsbCBiZWhhdmUgYSBiaXQgbGlrZSBhIFByb21pc2VcbiAqICAgICBpZGxlIC0+IHBlbmRpbmcgLT5cbiAqICAgICAgIHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqXG4gKiAgICAgLy8gLi4uYW5kIHdlJ3JlIGRvbmVcbiAqICAgICByZXNvbHZlZCAtPiBkb25lXG4gKiAgICAgcmVqZWN0ZWQgLT4gZG9uZVxuICogICBgLFxuICogICBzdGFydEluOiAnaWRsZSdcbiAqIH0pXG4gKlxuICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BlbmRpbmcnKVxuICogLy8gdHJ1ZVxuICpcbiAqIG1hY2hpbmUuZW50ZXIoJ3BlbmRpbmcnKVxuICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gKiAvLyBbXCJyZXNvbHZlZFwiLCBcInJlamVjdGVkXCJdXG4gKiBgYGBcbiAqXG4gKiBXZSBjYW4gaG9vay11cCBldmVudHMgd2l0aCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX06XG4gKlxuICogYGBganNcbiAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAqICAncGVuZGluZyAtPiByZXNvbHZlZCc6IHtcbiAqICAgIG9uOiAnZGF0YS1sb2FkZWQnXG4gKiAgfSxcbiAqICAncGVuZGluZyAtPiByZWplY3RlZCc6IHtcbiAqICAgIG9uOiBbJ3RpbWVvdXQnLCAnZGF0YS1lcnJvciddLFxuICogICAgdGhlbjogKG1zZykgPT4ge1xuICogICAgICBjb25zb2xlLndhcm4oJ1VoIG9oLi4uJywgbXNnKVxuICogICAgfVxuICogIH0sXG4gKiAgJ3Jlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZSc6IHtcbiAqICAgIG9uOiAndGhhdHMtYWxsLWZvbGtzJ1xuICogIH1cbiAqIH0pXG4gKlxuICogbWFjaGluZS5lbWl0KCdkYXRhLWVycm9yJywgJ0RpZCB5b3UgaGVhciB0aGF0PycpXG4gKiBgYGBcbiAqXG4gKiBIZXJlJ3MgdGhlIEFQSTpcbiAqXG4gKiB8IEhpdGNoZXJzIHwgU3RhdHVzIHwgQWN0aW9ucyB8XG4gKiB8LXwtfC18XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnMgLnBlcmZvcm1UcmFuc2l0aW9ucygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmV2ZW50IC5vbkV2ZW50KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWNhbnRyYW5zaXRpb250byAuY2FuVHJhbnNpdGlvblRvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXN0YXRlc2F2YWlsYWJsZWZyb21oZXJlIC5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9IC8ge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb250cmFuc2l0aW9ucyAub25UcmFuc2l0aW9ucygpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGUgLmN1cnJlbnRTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21wcmV2aW91c3N0YXRlIC5wcmV2aW91c1N0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3RvcnkgLmhpc3RvcnkoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IC8ge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGUgLmluU3RhdGUoKX0gLyB7QGxpbmsgI2luc3RhdGUtc3RhdGUtb3V0cHV0d2hlbnRydWUtMSAuSW5TdGF0ZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21yZXNldCAucmVzZXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0aW5nIC5vbkV4aXRpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluZm8gLmluZm8oKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zcGVjdCAuaW5zcGVjdCgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21uYW1lIC5uYW1lKCl9IHwgIHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoaW5nIC5vblN3aXRjaGluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IHwgIHwgIHxcbiAqXG4gKiA8aW1nIHNyYz1cIi4vbG9nby1zbWFsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogNzVweDsgbWFyZ2luOiAxNXB4IDAgMCA1cHg7XCIgLz5cbiAqXG4gKiBAbW9kdWxlIHN0YXRlYm90XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfSBgb2JqZWN0YC5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsZW1taW5nJywge1xuICAgKiAgIGNoYXJ0OiBgXG4gICAqICAgICB3YWxraW5nIC0+IChkaWdnaW5nIHwgYnVpbGRpbmcgfCBmYWxsaW5nKSAtPlxuICAgKiAgICAgICB3YWxraW5nXG4gICAqXG4gICAqICAgICBmYWxsaW5nIC0+IHNwbGF0dGluZ1xuICAgKiAgICAgd2Fsa2luZyAtPiBleGl0aW5nXG4gICAqICAgYFxuICAgKiB9KVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiAgR2l2ZSB5b3VyIFN0YXRlYm90IGEgbmFtZS4gVXNlZCBmb3IgbG9nZ2luZyBhbmQgYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9LlxuICAgKiBAcGFyYW0ge3N0YXRlYm90T3B0aW9uc30gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7c3RhdGVib3RGc219XG4gICAqL1xuICBTdGF0ZWJvdCxcblxuICAvKipcbiAgICogVGVzdHMgdGhhdCBhbiBvYmplY3QgaXMgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAgICpcbiAgICogaXNTdGF0ZWJvdChtYWNoaW5lKVxuICAgKiAvLyB0cnVlXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNTdGF0ZWJvdCxcblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgYSBjZXJ0YWluIHJvdXRlIGNhbiBiZSBmb2xsb3dlZCBieSBhXG4gICAqIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICAgKlxuICAgKiBUaGlzIG1lcmVseSB0ZXN0cyB0aGF0IGEgY2VydGFpbiBwYXRoIGNhbiBiZSB0YWtlbiB0aHJvdWdoIGFcbiAgICogc3RhdGUtbWFjaGluZS4gSXQgZG9lc24ndCBhc3NlcnQgdGhhdCB0aGUgc3RhdGVzIGFyZSBtb3ZlZC10aHJvdWdoXG4gICAqIHdoaWxlIHRoZSBtYWNoaW5lIGlzIHdvcmtpbmcsIGFzIHdpdGhcbiAgICoge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9LlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAgICogIFRoZSBtYWNoaW5lIHRvIHRlc3QgdGhlIHJvdXRlIG9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcm91dGVcbiAgICogIFRoZSByb3V0ZSB0byB0ZXN0IGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gICAqXG4gICAqICBgXG4gICAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICAgKiAgYFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIHJvdXRlSXNQb3NzaWJsZShtYWNoaW5lLFxuICAgKiAgICd3YWxraW5nIC0+IGZhbGxpbmcgLT4gc3BsYXR0aW5nIC0+IHdhbGtpbmcnXG4gICAqIClcbiAgICogLy8gZmFsc2VcbiAgICovXG4gIHJvdXRlSXNQb3NzaWJsZSxcblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfSB0cmFjZWQgdGhlIHJvdXRlIHNwZWNpZmllZC5cbiAgICpcbiAgICogV2hlcmVhcyB7QGxpbmsgI3N0YXRlYm90cm91dGVpc3Bvc3NpYmxlfHJvdXRlSXNQb3NzaWJsZSgpfSBvbmx5IGNoZWNrc1xuICAgKiB0aGF0IGEgcGFydGljdWxhciByb3V0ZSBjYW4gYmUgZm9sbG93ZWQsIGBhc3NlcnRSb3V0ZWAgd2lsbCBob29rLWludG9cbiAgICogYSBtYWNoaW5lIGFuZCB3YWl0IGZvciBpdCB0byB0cmFjZSB0aGUgc3BlY2lmaWVkIHBhdGggd2l0aGluIGFcbiAgICogdGltZW91dCBwZXJpb2QuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGFzeW5jXG4gICAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAgICogIFRoZSBtYWNoaW5lIHRvIHJ1biB0aGUgYXNzZXJ0aW9uIG9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZXhwZWN0ZWRSb3V0ZVxuICAgKiAgVGhlIGV4cGVjdGVkIHJvdXRlIGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gICAqXG4gICAqICBgXG4gICAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICAgKiAgYFxuICAgKiBAcGFyYW0ge2Fzc2VydFJvdXRlT3B0aW9uc30gW29wdGlvbnNdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAgICpcbiAgICogYXNzZXJ0Um91dGUoXG4gICAqICAgbWFjaGluZSwgJ3ByZXBhcmUgLT4gZGVib3VuY2UgLT4gc2VuZGluZyAtPiBkb25lIC0+IGlkbGUnLFxuICAgKiAgIHtcbiAgICogICAgIGRlc2NyaXB0aW9uOiAnRW1haWwgc2VudCB3aXRoIG5vIGlzc3VlcycsXG4gICAqICAgICBmcm9tU3RhdGU6ICdpZGxlJyxcbiAgICogICAgIHRpbWVvdXRJbk1zOiAxMDAwICogMjAsXG4gICAqICAgICBwZXJtaXR0ZWREZXZpYXRpb25zOiAwLFxuICAgKiAgICAgbG9nTGV2ZWw6IDNcbiAgICogICB9XG4gICAqIClcbiAgICogLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ0Fzc2VydGlvbiBwYXNzZWQhJykpXG4gICAqIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihgV2hvb3BzOiAke2Vycn1gKSlcbiAgICpcbiAgICogbWFjaGluZS5lbnRlcignaWRsZScpXG4gICAqL1xuICBhc3NlcnRSb3V0ZSxcblxuICAvKipcbiAgICogRGVjb21wb3NlIGEge0BsaW5rIHN0YXRlYm90Q2hhcnR9IGludG8gYW4gb2JqZWN0IG9mIGBzdGF0ZXNgLCBgcm91dGVzYCxcbiAgICogYW5kIGB0cmFuc2l0aW9uc2AuXG4gICAqXG4gICAqIFN0YXRlYm90KCkgdXNlcyB0aGlzIGludGVybmFsbHkgdG8gcGFyc2UgY2hhcnRzLiBFeHBvc2VkIGZvciBkZWJ1Z2dpbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgeyBzdGF0ZXMsIHJvdXRlcywgdHJhbnNpdGlvbnMgfSA9IGRlY29tcG9zZUNoYXJ0YFxuICAgKiAgIHBlbmRpbmcgLT5cbiAgICogICAgIHN1Y2Nlc3MgfCBmYWlsdXJlXG4gICAqIGBcbiAgICogLy8gc3RhdGVzID0gWydwZW5kaW5nJywgJ3N1Y2Nlc3MnLCAnZmFpbHVyZSddXG4gICAqIC8vIHJvdXRlcyA9IFsgJ3BlbmRpbmctPnN1Y2Nlc3MnLCAncGVuZGluZy0+ZmFpbHVyZSddXG4gICAqIC8vIHRyYW5zaXRpb25zID0gW1xuICAgKiAvLyAgIFsncGVuZGluZycsICdzdWNjZXNzJ10sXG4gICAqIC8vICAgWydwZW5kaW5nJywgJ2ZhaWx1cmUnXVxuICAgKiAvLyBdXG4gICAqL1xuICBkZWNvbXBvc2VDaGFydFxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQ0hBUlQvUk9VVEUgUEFSU0lOR1xuLy9cblxuY29uc3QgY3hQaXBlID0gJ3wnXG5jb25zdCBjeEFycm93ID0gJy0+J1xuXG5jb25zdCByeERpc2FsbG93ZWRDaGFyYWN0ZXJzID0gL1teYS16MC05IUAjJCVeJio6Xys9PD58fi5cXHgyRF0vZ2lcbmNvbnN0IHJ4Q1JMRiA9IC9bXFxyXFxuXS9cbmNvbnN0IHJ4Q29tbWVudCA9IC8oXFwvXFwvW15cXG5cXHJdKikvXG5cbmNvbnN0IHJ4T3BlcmF0b3JzID0gW2N4UGlwZSwgY3hBcnJvd11cbiAgLm1hcChyeFVuc2FmZSA9PiByeFVuc2FmZS5yZXBsYWNlKCd8JywgJ1xcXFx8JykpXG4gIC5qb2luKCd8JylcblxuY29uc3QgcnhMaW5lQ29udGluYXRpb25zID0gbmV3IFJlZ0V4cChgKCR7cnhPcGVyYXRvcnN9KSRgKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3hQaXBlLFxuICBjeEFycm93LFxuICByeERpc2FsbG93ZWRDaGFyYWN0ZXJzLFxuICBkZWNvbXBvc2VDaGFydCxcbiAgZGVjb21wb3NlUm91dGVcbn1cblxuY29uc3QgeyB1bmlxLCBBcmdUeXBlRXJyb3IsIGlzVGVtcGxhdGVMaXRlcmFsIH0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VSb3V0ZSAodGVtcGxhdGVMaXRlcmFsKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZGVjb21wb3NlUm91dGUnLFxuICAgIHsgdGVtcGxhdGVMaXRlcmFsOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIHRlbXBsYXRlTGl0ZXJhbFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgcmF3TGluZXMgPSBbdGVtcGxhdGVMaXRlcmFsXS5mbGF0KClcbiAgY29uc3QgY29kZU9ubHkgPSByZW1vdmVDb21tZW50cyhyYXdMaW5lcylcbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZUxpbmVzKGNvZGVPbmx5KVxuICBjb25zdCBmbGF0dGVuZWRSb3V0ZSA9IHNhbml0aXNlTGluZXMobGluZXMpLmZsYXQoMilcbiAgcmV0dXJuIGZsYXR0ZW5lZFJvdXRlXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZUNoYXJ0ICh0ZW1wbGF0ZUxpdGVyYWwpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdkZWNvbXBvc2VDaGFydCcsXG4gICAgeyB0ZW1wbGF0ZUxpdGVyYWw6IGlzVGVtcGxhdGVMaXRlcmFsIH0sXG4gICAgdGVtcGxhdGVMaXRlcmFsXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCByYXdMaW5lcyA9IFt0ZW1wbGF0ZUxpdGVyYWxdLmZsYXQoKVxuICBjb25zdCBjb2RlT25seSA9IHJlbW92ZUNvbW1lbnRzKHJhd0xpbmVzKVxuICBjb25zdCBsaW5lcyA9IGNvbmRlbnNlTGluZXMoY29kZU9ubHkpXG4gIGNvbnN0IGxpbmVzVG9Qcm9jZXNzID0gc2FuaXRpc2VMaW5lcyhsaW5lcylcbiAgY29uc3QgbGluZXNPZlJvdXRlcyA9IGxpbmVzVG9Qcm9jZXNzXG4gICAgLm1hcChkZWNvbXBvc2VMaW5lSW50b1JvdXRlKVxuICAgIC5mbGF0KDEpXG4gIGNvbnN0IGxpbmVzT2ZUcmFuc2l0aW9ucyA9IGxpbmVzT2ZSb3V0ZXNcbiAgICAubWFwKGRlY29tcG9zZVJvdXRlSW50b1RyYW5zaXRpb24pXG4gICAgLmZsYXQoMSlcbiAgY29uc3Qgc3RhdGVzID0gW11cbiAgY29uc3Qgcm91dGVLZXlzID0gbGluZXNPZlRyYW5zaXRpb25zLm1hcChyb3V0ZSA9PiB7XG4gICAgc3RhdGVzLnB1c2goLi4ucm91dGUpXG4gICAgcmV0dXJuIHJvdXRlLmpvaW4oY3hBcnJvdylcbiAgfSlcbiAgY29uc3QgZmlsdGVyZWRSb3V0ZXMgPSB1bmlxKHJvdXRlS2V5cylcbiAgY29uc3QgZmlsdGVyZWRTdGF0ZXMgPSB1bmlxKHN0YXRlcylcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2l0aW9uczogZmlsdGVyZWRSb3V0ZXMubWFwKHJvdXRlID0+IHJvdXRlLnNwbGl0KGN4QXJyb3cpKSxcbiAgICByb3V0ZXM6IGZpbHRlcmVkUm91dGVzLFxuICAgIHN0YXRlczogZmlsdGVyZWRTdGF0ZXNcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVDb21tZW50cyAoYXJyYXlPZlN0cmluZ3MpIHtcbiAgcmV0dXJuIGFycmF5T2ZTdHJpbmdzXG4gICAgLnJlZHVjZSgoYWNjLCBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gYWNjXG4gICAgICB9XG4gICAgICByZXR1cm4gW1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIC4uLnN0cmluZy5zcGxpdChyeENSTEYpLm1hcChwYXJ0ID0+IHBhcnRcbiAgICAgICAgICAucmVwbGFjZShyeENvbW1lbnQsICcnKSlcbiAgICAgIF1cbiAgICB9LCBbXSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlTGluZXMgKGxpbmVzKSB7XG4gIHJldHVybiBsaW5lcy5yZWR1Y2UoKGFjYywgbGluZSkgPT4gcnhMaW5lQ29udGluYXRpb25zLnRlc3QobGluZS50cmltKCkpXG4gICAgPyB7XG4gICAgICBsaW5lczogYWNjLmxpbmVzLFxuICAgICAgY3VycmVudExpbmU6IGFjYy5jdXJyZW50TGluZSArIGxpbmVcbiAgICB9XG4gICAgOiB7XG4gICAgICBsaW5lczogWy4uLmFjYy5saW5lcywgYWNjLmN1cnJlbnRMaW5lICsgbGluZV0sXG4gICAgICBjdXJyZW50TGluZTogJydcbiAgICB9LCB7XG4gICAgbGluZXM6IFtdLFxuICAgIGN1cnJlbnRMaW5lOiAnJ1xuICB9KS5saW5lc1xufVxuXG5mdW5jdGlvbiBzYW5pdGlzZUxpbmVzIChsaW5lcykge1xuICByZXR1cm4gbGluZXMubWFwKGxpbmUgPT4gbGluZS5zcGxpdChjeEFycm93KS5tYXAoc3RyID0+IHN0clxuICAgIC5yZXBsYWNlKHJ4RGlzYWxsb3dlZENoYXJhY3RlcnMsICcnKVxuICAgIC5zcGxpdChjeFBpcGUpXG4gICAgLm1hcChwYXJ0ID0+IHBhcnQudHJpbSgpKSkpXG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZUxpbmVJbnRvUm91dGUgKGxpbmUpIHtcbiAgcmV0dXJuIGxpbmUucmVkdWNlKChhY2MsIHN0YXRlcykgPT5cbiAgICBhY2MgPT09IGZhbHNlXG4gICAgICA/IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZXM6IFsuLi5zdGF0ZXNdLFxuICAgICAgICBwYWlyczogW11cbiAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICBwcmV2aW91c1N0YXRlczogWy4uLnN0YXRlc10sXG4gICAgICAgIHBhaXJzOiBbLi4uYWNjLnBhaXJzLCBbWy4uLmFjYy5wcmV2aW91c1N0YXRlc10sIFsuLi5zdGF0ZXNdXV1cbiAgICAgIH0sIGZhbHNlKVxuICAgIC5wYWlyc1xufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VSb3V0ZUludG9UcmFuc2l0aW9uIChbZnJvbVN0YXRlcywgdG9TdGF0ZXNdKSB7XG4gIHJldHVybiBmcm9tU3RhdGVzLnJlZHVjZSgoYWNjLCBmcm9tU3RhdGUpID0+IFtcbiAgICAuLi5hY2MsXG4gICAgLi4udG9TdGF0ZXMubWFwKHRvU3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIFtmcm9tU3RhdGUsIHRvU3RhdGVdXG4gICAgfSlcbiAgXSwgW10pXG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBGU01cbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTdGF0ZWJvdCxcbiAgaXNTdGF0ZWJvdFxufVxuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgU3RhdGVib3QuXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gc3RhdGVib3RPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0YXRlYm90Q2hhcnR9IGNoYXJ0XG4gKiAgVGhlIHN0YXRlLWNoYXJ0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtzdGFydEluPTxhdXRvPl1cbiAqICBUaGUgc3RhdGUgaW4gd2hpY2ggdG8gc3RhcnQuIElmIHVuc3BlY2lmaWVkLCB0aGUgZmlyc3Qgc3RhdGUgaW4gdGhlXG4gKiAgY2hhcnQgd2lsbCBiZSB1c2VkLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIEhvdyBub2lzeSB0aGUgbG9nZ2luZyBpcywgZnJvbSAxIHRvIDM6XG4gKiAgYGBgXG4gKiAgMSkgY29uc29sZS53YXJuXG4gKiAgMikgY29uc29sZS53YXJuL2xvZy90YWJsZVxuICogIDMpIGNvbnNvbGUud2Fybi9sb2cvdGFibGUvaW5mb1xuICogIGBgYFxuICogIGAzYCBpcyB0aGUgZGVmYXVsdC4gQXJndW1lbnQgdHlwZS1lcnJvcnMgd2lsbCBhbHdheXMgYHRocm93YC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbaGlzdG9yeUxpbWl0PTJdXG4gKiAgTGltaXQgaG93IG11Y2ggaGlzdG9yeSB0aGUgc3RhdGUtbWFjaGluZSBrZWVwcy4gQWNjZXNzZWQgdmlhXG4gKiAge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3Rvcnl8c3RhdGVib3RGc20jaGlzdG9yeSgpfS5cbiAqIEBwcm9wZXJ0eSB7ZXZlbnRzfSBbZXZlbnRzXVxuICogIElmIHlvdSB3aXNoIHRvIGhhdmUgeW91ciBTdGF0ZWJvdHMgbGlzdGVuIHRvIGV2ZW50cyBjb21pbmcgZnJvbVxuICogIGEgc2hhcmVkIEV2ZW50RW1pdHRlciwgeW91IGNhbiBwYXNzIGl0IGluIGhlcmUuIFRoZSBgZW1pdCgpYC9gb25FdmVudCgpYC9cbiAqICBgcGVyZm9ybVRyYW5zaXRpb25zKClgIG1ldGhvZHMgd2lsbCB1c2UgaXQuXG4gKlxuICogIEl0IHNob3VsZCBoYXZlIHRoZSBzYW1lIHNpZ25hdHVyZSBhcyB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfY2xhc3NfZXZlbnRlbWl0dGVyfEV2ZW50RW1pdHRlcn0uXG4gKi9cblxuLyoqXG4gKiBBIGRlc2NyaXB0aW9uIG9mIGFsbCB0aGUgc3RhdGVzIGluIGEgbWFjaGluZSwgcGx1cyBhbGwgb2YgdGhlXG4gKiBwZXJtaXR0ZWQgdHJhbnNpdGlvbnMgYmV0d2VlbiB0aGVtLlxuICpcbiAqIFRoaXMgaXMgZGVmaW5lZCB1c2luZyBhIGBzdHJpbmdgIG9yIGFuIGBhcnJheWAgb2Ygc3RyaW5ncywgYnV0XG4gKiAge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL1RlbXBsYXRlX2xpdGVyYWxzfFRlbXBsYXRlIExpdGVyYWxzfVxuICogYXJlIG11Y2ggbW9yZSBjb252ZW5pZW50LlxuICpcbiAqIEFuIGFycm93IGAtPmAgY29uZmlndXJlcyBhICoqcGVybWl0dGVkIHRyYW5zaXRpb24qKiBiZXR3ZWVuIHR3byBzdGF0ZXM6XG4gKlxuICogYGBgXG4gKiBmcm9tLXN0YXRlIC0+IHRvLXN0YXRlXG4gKiBgYGBcbiAqXG4gKiBJdCdzIHRoZSBvbmx5IG9wZXJhdG9yIG5lZWRlZCB0byBidWlsZCBhbnkgY2hhcnQ6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkXG4gKiAgIHBlbmRpbmcgLT4gcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBUaGUgXCJPUlwiIG9wZXJhdG9yIGB8YCBjYW4gaGVscCB1cyByZW1vdmUgc29tZSByZWR1bmRhbmN5IGZyb20gdGhlIGFib3ZlIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqICAgcmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBJbiBib3RoIGNoYXJ0cywgYHBlbmRpbmdgIGNhbiB0cmFuc2l0aW9uIHRvIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCwgYW5kXG4gKiBgcmVzb2x2ZWRgIG9yIGByZWplY3RlZGAgY2FuIGJvdGggdHJhbnNpdGlvbiB0byBgZG9uZWAuXG4gKlxuICogV2UgY2FuIHN0cmVhbWxpbmUgdGhpcyBldmVuIGZ1cnRoZXI6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IChyZXNvbHZlZCB8IHJlamVjdGVkKSAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBBZ2FpbiwgdGhpcyBpcyBleGFjdGx5IGVxdWl2YWxlbnQgdG8gdGhlIHByZXZpb3VzIHR3byBleGFtcGxlcy5cbiAqXG4gKiBOb3RpY2UgaW4gdGhpcyBvbmUgdGhhdCB3ZSBoYXZlIHBhcmVudGhlc2VzIGAoYCBgKWAgc3Vycm91bmRpbmcgYHJlc29sdmVkYFxuICogYW5kIGByZWplY3RlZGAuIFRoZXkgYXJlIGFjdHVhbGx5IGNvbXBsZXRlbHkgaWdub3JlZCBieSB0aGUgcGFyc2VyLCBhbmRcbiAqIHlvdSBjYW4gdXNlIHRoZW0gYXMgeW91IHBsZWFzZSB0byBoZWxwIG1ha2UgeW91ciBjaGFydHMgbW9yZSByZWFkYWJsZS5cbiAqXG4gKiBBIGNoYXJ0IHdvcmtzIGV4YWN0bHkgdGhlIHNhbWUgd2l0aG91dCB0aGVtOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIENoYXJ0cyBjYW4gYWxzbyBiZSBzcGxpdCBhY3Jvc3MgbXVsdGlwbGUtbGluZXM6XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+XG4gKiAgIHJlc29sdmVkIHxcbiAqICAgcmVqZWN0ZWQgLT5cbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKiBOb3RpY2UgdGhhdCBhbGwgd2hpdGUtc3BhY2UgaXMgaWdub3JlZCBvbiBlaXRoZXIgc2lkZSBvZiB0aGUgYC0+YFxuICogYW5kIGB8YC5cbiAqXG4gKiBgLy8gQ29tbWVudHMgb2YgdGhpcyBraW5kIGFyZSBhbGxvd2VkLCB0b286YFxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiAvLyBXaGVyZSBkbyB3ZSBnbyBmcm9tIGhlcmU/XG4gKiAgICAgKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IC8vIEFoLCB5ZXNcbiAqXG4gKiAgIC8vIEFuZCBub3cgd2UncmUgYWxsIGZpbmlzaGVkXG4gKiAgIGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEZpbmFsbHksIGhlcmUncyBhIG1vcmUgZnVsbCBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgZHJhZ0Ryb3BDaGFydCA9IGBcbiAqICAgaWRsZSAtPlxuICogICAgIGRyYWctZGV0ZWN0IC0+XG4gKiAgICAgICAoZHJhZ2dpbmcgfCBjbGlja2VkKVxuICpcbiAqICAgLy8gSnVzdCBhIGNsaWNrLCBiYWlsLW91dCFcbiAqICAgY2xpY2tlZCAtPiBpZGxlXG4gKlxuICogICAvLyBEcmFnIGRldGVjdGVkIVxuICogICBkcmFnZ2luZyAtPlxuICogICAgIGRyYWctd2FpdCAtPiBkcmFnZ2VkIC0+IGRyYWctd2FpdFxuICpcbiAqICAgLy8gRHJhZyBmaW5pc2hlZC4uLlxuICogICAoZHJhZy13YWl0IHwgZHJhZ2dlZCkgLT5cbiAqICAgICAoZHJhZy1kb25lIHwgZHJhZy1jYW5jZWwpIC0+XG4gKiAgICAgICBpZGxlXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZWJvdENoYXJ0XG4gKi9cblxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jb25zdCB7XG4gIGlzUG9qbyxcbiAgQXJnVHlwZUVycm9yLFxuICBMb2dnZXIsXG4gIGlzRXZlbnRFbWl0dGVyLFxuICBSZWZlcmVuY2VDb3VudGVyXG59ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQsIGN4QXJyb3cgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbmZ1bmN0aW9uIFN0YXRlYm90IChuYW1lLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1xcblN0YXRlYm90OiBQbGVhc2Ugc3BlY2lmeSBhIG5hbWUgZm9yIHRoaXMgbWFjaGluZScpXG4gIH1cblxuICBjb25zdCBsb2dQcmVmaXggPSBgU3RhdGVib3RbJHtuYW1lfV1gXG4gIGlmICghaXNQb2pvKG9wdGlvbnMpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGBcXG4ke2xvZ1ByZWZpeH06IFBsZWFzZSBzcGVjaWZ5IG9wdGlvbnMgZm9yIHRoaXMgbWFjaGluZWApXG4gIH1cblxuICBjb25zdCB7XG4gICAgY2hhcnQgPSB1bmRlZmluZWQsXG4gICAgbG9nTGV2ZWwgPSAzLFxuICAgIGhpc3RvcnlMaW1pdCA9IDJcbiAgfSA9IG9wdGlvbnMgfHwge31cblxuICBjb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoYCR7bG9nUHJlZml4fSNgKVxuICBjb25zdCBjb25zb2xlID0gTG9nZ2VyKGxvZ0xldmVsKVxuICBjb25zdCB7IGNhbldhcm4gfSA9IGNvbnNvbGVcblxuICBjb25zdCB7XG4gICAgc3RhdGVzID0gW10sXG4gICAgcm91dGVzID0gW11cbiAgfSA9IGNoYXJ0ID8gZGVjb21wb3NlQ2hhcnQoY2hhcnQpIDogb3B0aW9uc1xuXG4gIGxldCB7IHN0YXJ0SW4gfSA9IG9wdGlvbnNcbiAgaWYgKHN0YXJ0SW4gPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0SW4gPSBzdGF0ZXNbMF1cbiAgfVxuXG4gIGlmICghc3RhdGVzLmluY2x1ZGVzKHN0YXJ0SW4pKSB7XG4gICAgdGhyb3cgRXJyb3IoYCR7bG9nUHJlZml4fTogU3RhcnRpbmctc3RhdGUgbm90IGluIGNoYXJ0OiBcIiR7c3RhcnRJbn1cImApXG4gIH1cblxuICBsZXQgdHJhbnNpdGlvbklkID0gMFxuICBjb25zdCBzdGF0ZUhpc3RvcnkgPSBbc3RhcnRJbl1cbiAgY29uc3Qgc3RhdGVIaXN0b3J5TGltaXQgPSBNYXRoLm1heChoaXN0b3J5TGltaXQsIDIpXG4gIGNvbnN0IGV2ZW50cyA9IGlzRXZlbnRFbWl0dGVyKG9wdGlvbnMuZXZlbnRzKSA/IG9wdGlvbnMuZXZlbnRzIDogbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgY29uc3QgaW50ZXJuYWxFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgY29uc3QgSU5URVJOQUxfRVZFTlRTID0ge1xuICAgIFNUQVRFX0NIQU5HSU5HOiAnKEFOWSlzdGF0ZTpjaGFuZ2luZycsXG4gICAgU1RBVEVfQ0hBTkdFRDogJyhBTlkpc3RhdGU6Y2hhbmdlZCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXRJbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VtaXRJbnRlcm5hbEV2ZW50JywgeyBldmVudE5hbWU6ICdzdHJpbmcnIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBpbnRlcm5hbEV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uSW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCBmbikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25JbnRlcm5hbEV2ZW50JywgeyBldmVudE5hbWU6ICdzdHJpbmcnLCBmbjogJ2Z1bmN0aW9uJyB9LCBldmVudE5hbWUsIGZuKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgaW50ZXJuYWxFdmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaW50ZXJuYWxFdmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbilcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGF0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdzdGF0ZXMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgc3RhdGUtY2hhbmdlcycsXG4gICAgWy4uLnN0YXRlc11cbiAgKVxuICBjb25zdCByb3V0ZXNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICd0cmFuc2l0aW9ucycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyB0cmFuc2l0aW9ucycsXG4gICAgWy4uLnJvdXRlc11cbiAgKVxuICBjb25zdCBldmVudHNIYW5kbGVkID0gUmVmZXJlbmNlQ291bnRlcihcbiAgICBuYW1lLFxuICAgICdldmVudHMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgZXZlbnRzJ1xuICApXG5cbiAgLy8gSW50ZXJwcmV0cyBvblRyYW5zaXRpb25zKCkgYW5kIHBlcmZvcm1UcmFuc2l0aW9ucygpXG4gIGZ1bmN0aW9uIGFwcGx5SGl0Y2hlciAoaGl0Y2hlciwgZm5OYW1lKSB7XG4gICAgY29uc3QgaGl0Y2hlckFjdGlvbnMgPVxuICAgICAgdHlwZW9mIGhpdGNoZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBoaXRjaGVyKHsgZW50ZXIsIGVtaXQsIEVudGVyLCBFbWl0IH0pXG4gICAgICAgIDogaXNQb2pvKGhpdGNoZXIpXG4gICAgICAgICAgPyBoaXRjaGVyXG4gICAgICAgICAgOiBudWxsXG5cbiAgICBpZiAoIWlzUG9qbyhoaXRjaGVyQWN0aW9ucykpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBFeHBlY3RlZCBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdGBcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBldmVudHMgPSB7fVxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gW11cblxuICAgIE9iamVjdC5lbnRyaWVzKGhpdGNoZXJBY3Rpb25zKVxuICAgICAgLmZvckVhY2goKFtyb3V0ZUNoYXJ0LCBhY3Rpb25PckNvbmZpZ10pID0+IHtcbiAgICAgICAgLy8gb25UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25PckNvbmZpZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoIWlzUG9qbyhhY3Rpb25PckNvbmZpZykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAxLzMuLi5cbiAgICAgICAgY29uc3QgeyBvbjogX29uLCB0aGVuOiBfdGhlbiB9ID0gYWN0aW9uT3JDb25maWdcbiAgICAgICAgaWYgKHR5cGVvZiBfb24gPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoX29uKSkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZXMgPSBbX29uXS5mbGF0KClcbiAgICAgICAgICBldmVudE5hbWVzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IF90aGVuIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgX3RoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBvblRyYW5zaXRpb25zIDIvMy4uLlxuICAgICAgICAgIC8vIChCZWhhdmUgbGlrZSBvblRyYW5zaXRpb25zIGlmIGEgY29uZmlnIGlzIHNwZWNpZmllZCwgYnV0XG4gICAgICAgICAgLy8gIHRoZXJlIGlzIG5vIFwib25cIiBldmVudC4uLilcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgY29uc3QgYWxsU3RhdGVzID0gW11cbiAgICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDIvMy4uLlxuICAgIGNvbnN0IGRlY29tcG9zZWRFdmVudHMgPSBPYmplY3QuZW50cmllcyhldmVudHMpXG4gICAgICAucmVkdWNlKChhY2MsIFtldmVudE5hbWUsIF9jb25maWdzXSkgPT4ge1xuICAgICAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCBjb25maWdzIH0gPSBkZWNvbXBvc2VDb25maWdzKF9jb25maWdzKVxuICAgICAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICBbZXZlbnROYW1lXTogY29uZmlnc1xuICAgICAgICB9XG4gICAgICB9LCB7fSlcblxuICAgIGNvbnN0IGFsbENsZWFudXBGbnMgPSBbXVxuXG4gICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGFsbENsZWFudXBGbnMucHVzaChcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKGRlY29tcG9zZWRFdmVudHMpXG4gICAgICAgIC5tYXAoKFtldmVudE5hbWUsIGNvbmZpZ3NdKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGV2ZW50c0hhbmRsZWQuaW5jcmVhc2UoZXZlbnROYW1lKSxcbiAgICAgICAgICAgIG9uRXZlbnQoZXZlbnROYW1lLCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBldmVudFdhc0hhbmRsZWQgPSBjb25maWdzLnNvbWUoXG4gICAgICAgICAgICAgICAgKHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcGFzc2VkID0gaW5TdGF0ZShmcm9tU3RhdGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50ZXIodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oLi4uYXJncylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiAhIXBhc3NlZFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgaWYgKCFldmVudFdhc0hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTm9PcChgRXZlbnQgbm90IGhhbmRsZWQ6IFwiJHtldmVudE5hbWV9XCJgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgfSkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gb25UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBjb25zdCB0cmFuc2l0aW9uQ29uZmlncyA9IGRlY29tcG9zZUNvbmZpZ3ModHJhbnNpdGlvbnMpXG5cbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBhbGxTdGF0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5zdGF0ZXMpXG4gICAgICBhbGxSb3V0ZXMucHVzaCguLi50cmFuc2l0aW9uQ29uZmlncy5yb3V0ZXMpXG4gICAgfVxuXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4udHJhbnNpdGlvbkNvbmZpZ3MuY29uZmlncy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfSA9IHRyYW5zaXRpb25cbiAgICAgICAgY29uc3Qgcm91dGUgPSBgJHtmcm9tU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHJvdXRlc0hhbmRsZWQuaW5jcmVhc2Uocm91dGUpLFxuICAgICAgICAgIG9uSW50ZXJuYWxFdmVudChyb3V0ZSwgYWN0aW9uKVxuICAgICAgICBdXG4gICAgICB9KS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBEZWJ1Z2dpbmcsIGlmIHdlJ3JlIGF0IHRoZSByaWdodCBsZXZlbFxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGNvbnN0IGludmFsaWRTdGF0ZXMgPSBhbGxTdGF0ZXMuZmlsdGVyKHN0YXRlID0+ICFzdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICAgICAgY29uc3QgaW52YWxpZFJvdXRlcyA9IGFsbFJvdXRlcy5maWx0ZXIocm91dGUgPT4gIXJvdXRlcy5pbmNsdWRlcyhyb3V0ZSkpXG4gICAgICBpZiAoaW52YWxpZFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCBzdGF0ZXMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRTdGF0ZXMubWFwKHN0YXRlID0+IGAgID4gXCIke3N0YXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgaWYgKGludmFsaWRSb3V0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgdHJhbnNpdGlvbnMgc3BlY2lmaWVkOlxcbmAgK1xuICAgICAgICAgIGludmFsaWRSb3V0ZXMubWFwKHJvdXRlID0+IGAgID4gXCIke3JvdXRlfVwiYCkuam9pbignXFxuJylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBhbGxDbGVhbnVwRm5zLmZvckVhY2goZm4gPT4gZm4oKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29tcG9zZUNvbmZpZ3MgKGNvbmZpZ3MpIHtcbiAgICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICAgIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgICBjb25zdCBfY29uZmlncyA9IGNvbmZpZ3MucmVkdWNlKChhY2MsIGNvbmZpZykgPT4ge1xuICAgICAgY29uc3QgeyByb3V0ZUNoYXJ0LCBhY3Rpb24gfSA9IGNvbmZpZ1xuICAgICAgY29uc3QgeyBzdGF0ZXMsIHJvdXRlcywgdHJhbnNpdGlvbnMgfSA9IGRlY29tcG9zZUNoYXJ0KHJvdXRlQ2hhcnQpXG4gICAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICAuLi50cmFuc2l0aW9ucy5tYXAodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSB0cmFuc2l0aW9uXG4gICAgICAgICAgcmV0dXJuIHsgZnJvbVN0YXRlLCB0b1N0YXRlLCBhY3Rpb24gfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0sIFtdKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3M6IF9jb25maWdzLFxuICAgICAgc3RhdGVzOiBhbGxTdGF0ZXMsXG4gICAgICByb3V0ZXM6IGFsbFJvdXRlc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDJdXG4gIH1cblxuICBmdW5jdGlvbiBjdXJyZW50U3RhdGUgKCkge1xuICAgIHJldHVybiBzdGF0ZUhpc3Rvcnlbc3RhdGVIaXN0b3J5Lmxlbmd0aCAtIDFdXG4gIH1cblxuICBmdW5jdGlvbiBpblN0YXRlIChzdGF0ZSwgYW55T3JGbiwgLi4uZm5BcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdpblN0YXRlJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBjb25kaXRpb25NYXRjaGVzID0gY3VycmVudFN0YXRlKCkgPT09IHN0YXRlXG5cbiAgICBpZiAoYW55T3JGbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWNvbmRpdGlvbk1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYW55T3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gYW55T3JGbiguLi5mbkFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gYW55T3JGblxuICAgIH1cblxuICAgIHJldHVybiBjb25kaXRpb25NYXRjaGVzXG4gIH1cblxuICBmdW5jdGlvbiBJblN0YXRlIChzdGF0ZSwgYW55T3JGbikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignSW5TdGF0ZScsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuICguLi5mbkFyZ3MpID0+IGluU3RhdGUoc3RhdGUsIGFueU9yRm4sIC4uLmZuQXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblRyYW5zaXRpb25UbyAoLi4uc3RhdGVzKSB7XG4gICAgY29uc3QgdGVzdFN0YXRlcyA9IHN0YXRlcy5mbGF0KClcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2NhblRyYW5zaXRpb25UbycsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIHRlc3RTdGF0ZXNbMF0pXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBpZiAoIXRlc3RTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIHJldHVybiB0ZXN0U3RhdGVzLmV2ZXJ5KHN0YXRlID0+IG5leHRTdGF0ZXMuaW5jbHVkZXMoc3RhdGUpKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUgKHN0YXRlKSB7XG4gICAgY29uc3QgX3N0YXRlID0gc3RhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgPyBzdGF0ZVxuICAgICAgOiBjdXJyZW50U3RhdGUoKVxuXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZScsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIF9zdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiByb3V0ZXMucmVkdWNlKChhY2MsIHJvdXRlKSA9PiB7XG4gICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHJvdXRlLnNwbGl0KGN4QXJyb3cpXG4gICAgICAgIC5tYXAoc3RhdGUgPT4gc3RhdGUudHJpbSgpKVxuXG4gICAgICBpZiAoZnJvbVN0YXRlID09PSBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5hY2MsIHRvU3RhdGVdXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgW10pXG4gIH1cblxuICBmdW5jdGlvbiBFbWl0IChldmVudE5hbWUpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VtaXQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbWl0JywgeyBldmVudE5hbWU6ICdzdHJpbmcnIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBldmVudHMuZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBFbnRlciAoc3RhdGUpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0VudGVyJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgIHJldHVybiBlbnRlcihzdGF0ZSwgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbnRlciAoc3RhdGUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VudGVyJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCB0b1N0YXRlID0gc3RhdGVcblxuICAgIGlmICh0b1N0YXRlID09PSBpblN0YXRlKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgQWxyZWFkeSBpbiBzdGF0ZTogXCIke3RvU3RhdGV9XCJgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZXMuaW5jbHVkZXModG9TdGF0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHN0YXRlIFwiJHt0b1N0YXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRSb3V0ZSA9IGAke2luU3RhdGV9LT4ke3RvU3RhdGV9YFxuICAgIGlmICghcm91dGVzLmluY2x1ZGVzKG5leHRSb3V0ZSkpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBJbnZhbGlkIHRyYW5zaXRpb24gXCIke25leHRSb3V0ZX1cIiwgbm90IHN3aXRjaGluZ2ApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBGZWxsLXRocm91Z2gsIGNhbiBlbnRlciBuZXh0IHN0YXRlXG4gICAgY29uc29sZS5pbmZvKGAke2xvZ1ByZWZpeH06IHRJZDwkeysrdHJhbnNpdGlvbklkfT46ICR7bmV4dFJvdXRlfWApXG5cbiAgICBzdGF0ZUhpc3RvcnkucHVzaCh0b1N0YXRlKVxuICAgIGlmIChzdGF0ZUhpc3RvcnkubGVuZ3RoID4gc3RhdGVIaXN0b3J5TGltaXQpIHtcbiAgICAgIHN0YXRlSGlzdG9yeS5zaGlmdCgpXG4gICAgfVxuXG4gICAgZW1pdEludGVybmFsRXZlbnQoSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HSU5HLCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KG5leHRSb3V0ZSwgLi4uYXJncylcbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdFRCwgdG9TdGF0ZSwgaW5TdGF0ZSwgLi4uYXJncylcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBvbkV2ZW50IChldmVudE5hbWUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkV2ZW50JywgeyBldmVudE5hbWU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBldmVudE5hbWUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgZXZlbnRzLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGNiKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uU3dpdGNoaW5nIChjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25Td2l0Y2hpbmcnLCB7IGNiOiAnZnVuY3Rpb24nIH0sIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudCA9IHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HSU5HKVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25JbnRlcm5hbEV2ZW50KFxuICAgICAgSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HSU5HLFxuICAgICAgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICBjYih0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50KClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblN3aXRjaGVkIChjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25Td2l0Y2hlZCcsIHsgY2I6ICdmdW5jdGlvbicgfSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50ID0gc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdFRClcbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uSW50ZXJuYWxFdmVudChcbiAgICAgIElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0VELFxuICAgICAgKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgICBjYih0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50KClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkV4aXRpbmcgKHN0YXRlLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FeGl0aW5nJywgeyBzdGF0ZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIHN0YXRlLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfTpleGl0aW5nYClcbiAgICBdXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBjYih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXhpdGVkIChzdGF0ZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXhpdGVkJywgeyBzdGF0ZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIHN0YXRlLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfTpleGl0ZWRgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgY2IodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkVudGVyaW5nIChzdGF0ZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRW50ZXJpbmcnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmVudGVyaW5nYClcbiAgICBdXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IHRvU3RhdGUpIHtcbiAgICAgICAgY2IoZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRW50ZXJlZCAoc3RhdGUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkVudGVyZWQnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmVudGVyZWRgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSB0b1N0YXRlKSB7XG4gICAgICAgIGNiKGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH06IFN0YXRlLW1hY2hpbmUgcmVzZXQhYClcblxuICAgIHN0YXRlSGlzdG9yeS5sZW5ndGggPSAwXG4gICAgc3RhdGVIaXN0b3J5LnB1c2goc3RhcnRJbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25Ob09wIChtZXNzYWdlKSB7XG4gICAgY29uc3QgbGFzdFN0YXRlID0gcHJldmlvdXNTdGF0ZSgpXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgcHJldlJvdXRlID0gYCR7bGFzdFN0YXRlID09PSB1bmRlZmluZWQgPyAnW3VuZGVmaW5lZF0nIDogbGFzdFN0YXRlfS0+JHtpblN0YXRlfWBcblxuICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICBpZiAoIWF2YWlsYWJsZVN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gVGhlcmUgYXJlIG5vIHN0YXRlcyBhdmFpbGFibGUgZnJvbSBcIiR7aW5TdGF0ZX1cImBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBGcm9tIFwiJHtpblN0YXRlfVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbJHthdmFpbGFibGVTdGF0ZXNcbiAgICAgICAgICAgIC5tYXAoc3RhdGUgPT4gYFwiJHtzdGF0ZX1cImApXG4gICAgICAgICAgICAuam9pbignLCAnKX1dYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZXM6IHN0YXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgdHJhbnNpdGlvbnM6IHJvdXRlc0hhbmRsZWQucmVmcygpLFxuICAgICAgZXZlbnRzOiBldmVudHNIYW5kbGVkLnJlZnMoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluZm8gKCkge1xuICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH06IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgc3RhdGUtbWFjaGluZWApXG5cbiAgICBsb2dSZWZDb3VudGVySW5mbyhzdGF0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHJvdXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8oZXZlbnRzSGFuZGxlZClcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1JlZkNvdW50ZXJJbmZvIChyZWZDb3VudGVyKSB7XG4gICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgdGFibGUgfSA9IHJlZkNvdW50ZXIudG9WYWx1ZSgpXG4gICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24pXG4gICAgaWYgKHRhYmxlLmxlbmd0aCkge1xuICAgICAgY29uc29sZS50YWJsZSh0YWJsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJyAgPiBObyBpbmZvcm1hdGlvbicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgc3RhdGUtbWFjaGluZSBvYmplY3QgY3JlYXRlZCBieVxuICAgKiB7QGxpbmsgI3N0YXRlYm90c3RhdGVib3R8U3RhdGVib3QoKX0uXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90RnNtXG4gICAqL1xuXG4gIHJldHVybiB7XG4gICAgLy8gRm9yIGlkZW50aWZ5aW5nIFN0YXRlYm90IG9iamVjdHNcbiAgICBfX1NUQVRFQk9UX186IDEsXG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB0byBzZWUgaWYgd2UgY2FuIHRyYW5zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSBmcm9tXG4gICAgICogdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIElmIG1vcmUgdGhhbiBvbmUgc3RhdGUgaXMgc3BlY2lmaWVkLCBgdHJ1ZWAgaXMgcmV0dXJuZWQgb25seSBpZlxuICAgICAqICoqQUxMKiogc3RhdGVzIGFyZSBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gc3RhdGVzXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdnYW1lLW1lbnVzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgbG9hZGluZyAtPlxuICAgICAqICAgICAgIG1lbnUgLT5cbiAgICAgKiAgICAgICAgIHBsYXkgfFxuICAgICAqICAgICAgICAgb3B0aW9ucyB8XG4gICAgICogICAgICAgICBzb3VuZCB8XG4gICAgICogICAgICAgICBxdWl0XG4gICAgICpcbiAgICAgKiAgICAgLy8gR28gYmFjayB0byBtZW51XG4gICAgICogICAgIHBsYXkgfCBvcHRpb25zIHwgc291bmQgLT4gbWVudVxuICAgICAqXG4gICAgICogICAgIC8vIENhbiBxdWl0IGZyb20gbWFpbiBnYW1lLCB0b29cbiAgICAgKiAgICAgcGxheSAtPiBxdWl0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwbGF5JylcbiAgICAgKiAvLyBmYWxzZVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignbWVudScpXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oWydwbGF5JywgJ29wdGlvbnMnXSlcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgY2FuVHJhbnNpdGlvblRvOiBjYW5UcmFuc2l0aW9uVG8sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29yb3V0aW5lJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgc3VzcGVuZGVkIC0+IHJ1bm5pbmcgLT4gKHN1c3BlbmRlZCB8IGRlYWQpXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInN1c3BlbmRlZFwiXG4gICAgICovXG4gICAgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBlbWl0cyBhbiBldmVudCwgZmlyaW5nIGFueSBsaXN0ZW5lcnMgYWRkZWQgdXNpbmdcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zfC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gb3Ige0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnR8Lm9uRXZlbnQoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc11cbiAgICAgKiAgT3B0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqICBXaGV0aGVyIG9yIG5vdCB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICBTZWU6IHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19lbWl0dGVyX2VtaXRfZXZlbnRuYW1lX2FyZ3N8Tm9kZSBFdmVudHN9XG4gICAgICogIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogU3RhdGVib3QgaW1wb3J0cyBgRXZlbnRFbWl0dGVyYCBmcm9tIHRoZVxuICAgICAqICB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzfGV2ZW50c31cbiAgICAgKiBwYWNrYWdlIGZvciBkZWFsaW5nIHdpdGggZXZlbnRzIGluIHRoZSBicm93c2VyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdiYXNpYy1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IHJlZGlyZWN0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiB7XG4gICAgICogICAgIG9uOiAncG9zdC1kYXRhJyxcbiAgICAgKiAgICAgdGhlbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgYXJnczogJywgYXJncylcbiAgICAgKiAgICAgICAvLyBzZXRUaW1lb3V0KG1hY2hpbmUuRW50ZXIoJ3JlZGlyZWN0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCdwb3N0LWRhdGEnLCAnSGVsbG8sIHdvcmxkIScpXG4gICAgICogLy8gRXZlbnQgYXJnczogW1wiSGVsbG8sIHdvcmxkIVwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic2VuZGluZ1wiXG4gICAgICovXG4gICAgZW1pdDogZW1pdCxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiAgVGhlIGRlc2lyZWQgZXZlbnQgdG8ge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhhdCBldmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgndHJhZmZpYy1saWdodHMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBnbyAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tc3RvcCAtPlxuICAgICAqICAgICAgIHN0b3BcbiAgICAgKlxuICAgICAqICAgICAvLyAuLi5nb3R0YSBrZWVwIHRoYXQgdHJhZmZpYyBmbG93aW5nXG4gICAgICogICAgIHN0b3AgLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLWdvIC0+XG4gICAgICogICAgICAgZ29cbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnc3RvcCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3N0b3AgLT4gcHJlcGFyZS10by1nbyc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tZ28gLT4gZ28nOiAgICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ2dvIC0+IHByZXBhcmUtdG8tc3RvcCc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tc3RvcCAtPiBzdG9wJzogeyBvbjogJ3RpbWVyJyB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBuZXh0VHJhZmZpY0xpZ2h0ID0gbWFjaGluZS5FbWl0KCd0aW1lcicpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3RvcFwiXG4gICAgICpcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInByZXBhcmUtdG8tc3RvcFwiXG4gICAgICovXG4gICAgRW1pdDogRW1pdCxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZyBhcyBpdCBpc1xuICAgICAqIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YXRlIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2RpYWxvZycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2hvd2luZy1tb2RhbCAtPiAoc2F2aW5nIHwgaWRsZSlcbiAgICAgKiAgICAgICBzYXZpbmcgLT4gaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NhdmluZycpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIC8vIFtkaWFsb2ddOiBJbnZhbGlkIHRyYW5zaXRpb24gXCJpZGxlLT5zYXZpbmdcIiwgbm90IHN3aXRjaGluZ1xuICAgICAqIC8vID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCJbdW5kZWZpbmVkXS0+aWRsZVwiXG4gICAgICogLy8gPiBGcm9tIFwiaWRsZVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbXCJzaG93aW5nLW1vZGFsXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzaG93aW5nLW1vZGFsJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgZW50ZXI6IGVudGVyLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nXG4gICAgICogYXMgaXQgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYW4gY2hhbmdlIHRoZSBzdGF0ZSB3aGVuIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncG9wdXAtbWVudScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gbWVudS1vcGVuZWQgLT5cbiAgICAgKiAgICAgICAoaXRlbS1jbGlja2VkIHwgaWRsZSlcbiAgICAgKlxuICAgICAqICAgICBpdGVtLWNsaWNrZWQgLT4gaWRsZVxuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdtZW51LW9wZW5lZCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2sgPSBtYWNoaW5lLkVudGVyKCdpdGVtLWNsaWNrZWQnKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIm1lbnUtb3BlbmVkXCJcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrKClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpdGVtLWNsaWNrZWRcIlxuICAgICAqL1xuICAgIEVudGVyOiBFbnRlcixcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHN0YXRlcyB0aGUgbWFjaGluZSBoYXMgYmVlbiBpbiBzbyBmYXIsIHVwIHRvIGEgbGltaXQgc2V0XG4gICAgICogYnkgYGhpc3RvcnlMaW1pdGAgaW4ge0BsaW5rIHN0YXRlYm90T3B0aW9uc30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEEgY29weSBvZiB0aGUgc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZG93bmxvYWRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGxvYWRpbmcgLT4gKGZhaWx1cmUgfCBzdWNjZXNzKVxuICAgICAqICAgICAgIGZhaWx1cmUgLT4gbG9hZGluZ1xuICAgICAqICAgICAgIHN1Y2Nlc3MgLT4gZG9uZVxuICAgICAqICAgYCxcbiAgICAgKiAgIGhpc3RvcnlMaW1pdDogNFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdmYWlsdXJlJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdsb2FkaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzdWNjZXNzJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiBtYWNoaW5lLmhpc3RvcnkoKVxuICAgICAqIC8vIFtcImZhaWx1cmVcIiwgXCJsb2FkaW5nXCIsIFwic3VjY2Vzc1wiLCBcImRvbmVcIl1cbiAgICAgKi9cbiAgICBoaXN0b3J5OiAoKSA9PiBbLi4uc3RhdGVIaXN0b3J5XSxcblxuICAgIC8qKlxuICAgICAqIFByaW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUgdG8gdGhlIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbmZvKClcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBJbmZvcm1hdGlvbiBhYm91dCB0aGlzIHN0YXRlLW1hY2hpbmUuXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgc3RhdGVzICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICAgJ2RvbmUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAgJ2lkbGUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XSBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgIHRyYW5zaXRpb25zICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICdpZGxlLT5yZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAnaWRsZS0+c2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmctPmRvbmUnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZy0+ZG9uZScgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAgICAgKiAvLyAoTm8gaW5mb3JtYXRpb24pXG4gICAgICovXG4gICAgaW5mbzogKCkgPT4gaW5mbygpLFxuXG4gICAgLyoqXG4gICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBTYW1lIGRldGFpbHMgYXMge0BsaW5rICNzdGF0ZWJvdGZzbWluZm98LmluZm8oKX0gaW4gb2JqZWN0LWZvcm0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluc3BlY3QoKVxuICAgICAqIC8vIFdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgICAqIC8vICB7IHN0YXRlcywgdHJhbnNpdGlvbnMsIGV2ZW50cyB9XG4gICAgICpcbiAgICAgKiAvLyBUaGVzZSB3aWxsIGVhY2ggaGF2ZSBrZXktdmFsdWVzLCB0aGUga2V5IGJlaW5nIHRoZSBuYW1lXG4gICAgICogLy8gYW5kIHRoZSB2YWx1ZSBiZWluZyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBhdHRhY2hlZC5cbiAgICAgKi9cbiAgICBpbnNwZWN0OiAoKSA9PiBpbnNwZWN0KCksXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBgc3RhdGVgLCBpbW1lZGlhdGVseSByZXR1cm5pbmcgZWl0aGVyXG4gICAgICogYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgdGhlbiBpdHMgcmV0dXJuLXZhbHVlIHdpbGwgYmUgdXNlZFxuICAgICAqIGFzIHRoZSBgdHJ1ZWAtdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbHwqfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgJ1B1cnJyci4uLicpXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIGluU3RhdGU6IGluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gcnVuLCB0ZXN0cyB0aGF0XG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IG1hdGNoZXMgdGhlXG4gICAgICogc3BlY2lmaWVkIHN0YXRlLCByZXR1cm5pbmcgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FsbHMge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIGlkbGluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScpXG4gICAgICogdmFyIHB1cnJpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogaWRsaW5nKClcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBJZGxpbmchXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBJblN0YXRlOiBJblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGFsc28gYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9XG4gICAgICogZm9yIHRoZSBzYW1lLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ0F5LCB0aGVyZeKAmXMgdGhlIHJ1Yi4nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICB0aGUtcXVlc3Rpb24gLT4gKHRvLWJlIHwgbm90LXRvLWJlKVxuICAgICAqICAgICAgIG5vdC10by1iZSAtPiBwZXJjaGFuY2UtdG8tZHJlYW1cbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5uYW1lKClcbiAgICAgKiAvLyBcIkF5LCB0aGVyZeKAmXMgdGhlIHJ1Yi5cIlxuICAgICAqL1xuICAgIG5hbWU6ICgpID0+IG5hbWUsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJlZCBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmVkIGZyb206IHJlY2VpdmluZ1xuICAgICAqL1xuICAgIG9uRW50ZXJlZDogb25FbnRlcmVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGJlY29tZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtlbnRlckNhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmVkKCdkb25lJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIG1hZGUgaXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyaW5nKCdkb25lJywgZnJvbVN0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdFbnRlcmluZyBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gRW50ZXJpbmcgZnJvbTogc2VuZGluZ1xuICAgICAqIC8vIFdlIG1hZGUgaXQhXG4gICAgICovXG4gICAgb25FbnRlcmluZzogb25FbnRlcmluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGVudGVyQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIHNwZWNpZmllZFxuICAgICAqIGV2ZW50IGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28gLT4gZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfSxcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV2ZW50KCd0aW1lcicsICgpID0+IHtcbiAgICAgKiAgIHJlZHJhd1RyYWZmaWNMaWdodHMoKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBzZXRJbnRlcnZhbChtYWNoaW5lLkVtaXQoJ3RpbWVyJyksIDIwMDApXG4gICAgICovXG4gICAgb25FdmVudDogb25FdmVudCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIGFyZSBoZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIC8vIFdlIGFyZSBoZWFkaW5nIHRvOiBzZW5kaW5nXG4gICAgICovXG4gICAgb25FeGl0ZWQ6IG9uRXhpdGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdQZWFjZSBvdXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRpbmcoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdIZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gSGVhZGluZyB0bzogcmVjZWl2aW5nXG4gICAgICogLy8gUGVhY2Ugb3V0IVxuICAgICAqL1xuICAgIG9uRXhpdGluZzogb25FeGl0aW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBleGl0Q2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYFdlIHdlbnQgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBXZSB3ZW50IGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoZWQ6IG9uU3dpdGNoZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYmVmb3JlICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBHb2luZyBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIEdvaW5nIGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoaW5nOiBvblN3aXRjaGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBzd2l0Y2hDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUnVuIGNhbGxiYWNrcyB3aGVuIHRyYW5zaXRpb25zIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHJlY2VpdmVEYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBUaGUgYWJvdmUgZXhhbXBsZSB1c2luZyBhIGZ1bmN0aW9uIGZvciBjb25maWdcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoKHsgZW50ZXIgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBlbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IGVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBldGMuLi5cbiAgICAgKi9cbiAgICBvblRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdvblRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIHRyYW5zaXRpb25zIHdoZW4gZXZlbnRzIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIFVzZSBgdGhlbmAgdG8gb3B0aW9uYWxseSBhZGQgY2FsbGJhY2tzIHRvIHRob3NlIHRyYW5zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29tcGxleC1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIHVwZGF0ZVxuICAgICAqXG4gICAgICogICAgIC8vIE1heWJlIHRoaW5ncyB0YWtlIGEgbG9uZyB0aW1lLi4uXG4gICAgICogICAgIHVwZGF0ZSAtPlxuICAgICAqICAgICAgIHdhaXRpbmcgLT4gd2FpdGluZy1hLXdoaWxlXG4gICAgICpcbiAgICAgKiAgICAgLy8gV2hpY2ggcGF0aCB3aWxsIHdlIHRha2U/XG4gICAgICogICAgIHdhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT5cbiAgICAgKiAgICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dFxuICAgICAqXG4gICAgICogICAgIC8vIEFsbCBkb25lIVxuICAgICAqICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dCAtPlxuICAgICAqICAgICAgIGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoKHsgRW50ZXIsIGVtaXQgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHVwZGF0ZSc6IHtcbiAgICAgKiAgICAgb246ICd1c2VyLXNhdmVkJyxcbiAgICAgKiAgICAgdGhlbjogKGRhdGEpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnU2VuZGluZyBkYXRhOiAnLCBkYXRhKVxuICAgICAqXG4gICAgICogICAgICAgc2VuZERhdGEoZGF0YSlcbiAgICAgKiAgICAgICAgIC50aGVuKEVudGVyKCdzdWNjZXNzJykpXG4gICAgICogICAgICAgICAuY2F0Y2goRW50ZXIoJ2ZhaWxlZCcpKVxuICAgICAqXG4gICAgICogICAgICAgZW1pdCgnZGF0YS1zZW50JylcbiAgICAgKiAgICAgfVxuICAgICAqICAgfSxcbiAgICAgKiAgICd1cGRhdGUgLT4gd2FpdGluZyc6IHtcbiAgICAgKiAgICAgb246ICdkYXRhLXNlbnQnLFxuICAgICAqICAgICB0aGVuOiAoKSA9PiB7XG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcignd2FpdGluZy1hLXdoaWxlJyksIDc1MClcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd0aW1lb3V0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIEp1c3QgdG8gaWxsdXN0cmF0ZSB0aGF0IHlvdSBjYW4gbWl4IG4nIG1hdGNoIHdpdGggb25UcmFuc2l0aW9uczpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gc3VjY2Vzcyc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0xvdmVseSEnKVxuICAgICAqICAgfSxcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHRpbWVvdXQnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXZWxsLCBhdCBsZWFzdCB5b3UgaGF2ZSB5b3VyIHNob2VzJylcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCd1c2VyLXNhdmVkJywgWydzb21lJywgJ2RhdGEnXSlcbiAgICAgKiAvLyBTZW5kaW5nIGRhdGE6IFtcInNvbWVcIiwgXCJkYXRhXCJdXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBwZXJmb3JtVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ3BlcmZvcm1UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgVGhlIHByZXZpb3VzIHN0YXRlLCBvciBgdW5kZWZpbmVkYCBpZiB0aGVyZSBpc24ndCBvbmUgKGllOyB5b3VcbiAgICAgKiAgaGF2ZSBqdXN0IGNhbGxlZCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXR8LnJlc2V0KCl9LCBvciB0aGVcbiAgICAgKiAgbWFjaGluZSBoYXMganVzdCBzdGFydGVkLilcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnc2ltcGxlLXNlbmRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUucHJldmlvdXNTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKi9cbiAgICBwcmV2aW91c1N0YXRlOiBwcmV2aW91c1N0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUtbWFjaGluZSB0byBpdHMgc3RhcnRpbmctc3RhdGUgYW5kIGNsZWFycyB0aGVcbiAgICAgKiBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQWxsIGxpc3RlbmVycyB3aWxsIHN0aWxsIGJlIGF0dGFjaGVkLCBidXQgbm8gZXZlbnRzIG9yIHRyYW5zaXRpb25zIHdpbGwgYmUgZmlyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY2Fyb3VzZWwnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBwYWdlLTEgLT5cbiAgICAgKiAgICAgcGFnZS0yIC0+XG4gICAgICogICAgIHBhZ2UtMyAtPlxuICAgICAqICAgICBwYWdlLTQgLT4gcGFnZS0xXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3BhZ2UtMicpXG4gICAgICogbWFjaGluZS5yZXNldCgpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicGFnZS0xXCJcbiAgICAgKi9cbiAgICByZXNldDogcmVzZXQsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYGFycmF5YCBvZiBzdGF0ZXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBzdGF0ZSBzcGVjaWZpZWQuXG4gICAgICogSWYgbm8gc3RhdGUgaXMgcGFzc2VkLWluLCB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlXSBUaGUgc3RhdGUgdG8gY2hlY2suIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqICBpZiB1bnNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgICAqIC8vIFtcInNlbmRpbmdcIiwgXCJyZWNlaXZpbmdcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoJ3JlY2VpdmluZycpXG4gICAgICogLy8gW1wiZG9uZVwiXVxuICAgICAqL1xuICAgIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlOiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzU3RhdGVib3QgKG1hY2hpbmUpIHtcbiAgcmV0dXJuIChcbiAgICBpc1Bvam8obWFjaGluZSkgJiZcbiAgICB0eXBlb2YgbWFjaGluZS5fX1NUQVRFQk9UX18gPT09ICdudW1iZXInXG4gIClcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIFVUSUxTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzUG9qbyxcbiAgaXNUZW1wbGF0ZUxpdGVyYWwsXG4gIHVuaXEsXG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIFJlZmVyZW5jZUNvdW50ZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyXG59XG5cbmZ1bmN0aW9uIGlzRXZlbnRFbWl0dGVyIChvYmopIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmouZW1pdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiBvYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2Ygb2JqLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nXG4gIClcbn1cblxuZnVuY3Rpb24gaXNQb2pvIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZVxufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTGl0ZXJhbCAob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmouZXZlcnkoaXRlbSA9PiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHVuaXEgKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgb25lKSA9PiAoYWNjLmluZGV4T2Yob25lKSA9PT0gLTEgPyBbLi4uYWNjLCBvbmVdIDogYWNjKSwgW10pXG59XG5cbmZ1bmN0aW9uIGRlZmVyIChmbiwgLi4uYXJncykge1xuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoZm4sIDAsIC4uLmFyZ3MpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5mdW5jdGlvbiBEZWZlciAoZm4pIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBkZWZlcihmbiwgLi4uYXJncylcbn1cblxuZnVuY3Rpb24gT25jZSAoZm4pIHtcbiAgY29uc3QgeyByZXZva2UsIGZuOiBfZm4gfSA9IFJldm9rYWJsZShmbilcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICByZXN1bHQgPSBfZm4oLi4uYXJncylcbiAgICByZXZva2UoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBSZXZva2FibGUgKGZuKSB7XG4gIGxldCByZXZva2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4ge1xuICAgIGZuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCFyZXZva2VkKSB7XG4gICAgICAgIHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICByZXZva2U6ICgpID0+IHtcbiAgICAgIHJldm9rZWQgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFJlZmVyZW5jZUNvdW50ZXIgKG5hbWUsIGtpbmQsIGRlc2NyaXB0aW9uLCAuLi5leHBlY3RpbmcpIHtcbiAgY29uc3QgX3JlZnMgPSB7fTtcbiAgWy4uLmV4cGVjdGluZ10uZmxhdCgpLmZvckVhY2gocmVmID0+IHtcbiAgICBfcmVmc1tyZWZdID0gMFxuICB9KVxuICBmdW5jdGlvbiBpbmNyZWFzZSAocmVmKSB7XG4gICAgX3JlZnNbcmVmXSA9IGNvdW50T2YocmVmKSArIDFcbiAgICByZXR1cm4gKCkgPT4gZGVjcmVhc2UocmVmKVxuICB9XG4gIGZ1bmN0aW9uIGRlY3JlYXNlIChyZWYpIHtcbiAgICBjb25zdCBjb3VudCA9IGNvdW50T2YocmVmKSAtIDFcbiAgICBfcmVmc1tyZWZdID0gTWF0aC5tYXgoY291bnQsIDApXG4gIH1cbiAgZnVuY3Rpb24gY291bnRPZiAocmVmKSB7XG4gICAgcmV0dXJuIF9yZWZzW3JlZl0gfHwgMFxuICB9XG4gIGZ1bmN0aW9uIHJlZnMgKCkge1xuICAgIHJldHVybiB7IC4uLl9yZWZzIH1cbiAgfVxuICBmdW5jdGlvbiB0YWJsZSAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKF9yZWZzKS5zb3J0KClcbiAgICAgIC5tYXAoa2V5ID0+IFtrZXksIF9yZWZzW2tleV1dKVxuICAgICAgLm1hcCgoW3JlZiwgY291bnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgW2tpbmRdOiByZWYsXG4gICAgICAgICAgcmVmczogY291bnQgfHwgJ05vbmUnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gdG9WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBgU3RhdGVib3RbJHtuYW1lfV06ICR7ZGVzY3JpcHRpb259OmAsXG4gICAgICB0YWJsZTogdGFibGUoKVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGluY3JlYXNlOiBpbmNyZWFzZSxcbiAgICBkZWNyZWFzZTogZGVjcmVhc2UsXG4gICAgY291bnRPZjogY291bnRPZixcbiAgICB0b1ZhbHVlOiB0b1ZhbHVlLFxuICAgIHJlZnM6IHJlZnNcbiAgfVxufVxuXG5mdW5jdGlvbiBBcmdUeXBlRXJyb3IgKGVyclByZWZpeCA9ICcnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm5OYW1lLCB0eXBlTWFwLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgYXJnTWFwID0gT2JqZWN0LmVudHJpZXModHlwZU1hcClcbiAgICAgIC5tYXAoKFthcmdOYW1lLCBhcmdUeXBlXSkgPT4ge1xuICAgICAgICByZXR1cm4geyBhcmdOYW1lLCBhcmdUeXBlIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBzaWduYXR1cmUgPSBPYmplY3Qua2V5cyh0eXBlTWFwKS5qb2luKCcsICcpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdzXG4gICAgICAubWFwKChhcmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYXJnTmFtZSwgYXJnVHlwZSB9ID0gYXJnTWFwW2luZGV4XVxuICAgICAgICBpZiAoYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gYEFyZ3VtZW50IHVuZGVmaW5lZDogXCIke2FyZ05hbWV9XCJgXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXJyb3JEZXNjXG4gICAgICAgIGxldCB0eXBlTmFtZVxuICAgICAgICBsZXQgdHlwZU1hdGNoZXNcblxuICAgICAgICBpZiAodHlwZW9mIGFyZ1R5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IGFyZ1R5cGUoYXJnKSA9PT0gdHJ1ZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZS5uYW1lXG4gICAgICAgICAgZXJyb3JEZXNjID0gYCR7dHlwZU5hbWV9KCR7YXJnTmFtZX0pIGRpZCBub3QgcmV0dXJuIHRydWVgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuICAgICAgICAgIHR5cGVNYXRjaGVzID0gdHlwZW9mIGFyZyA9PT0gYXJnVHlwZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGBBcmd1bWVudCBcIiR7YXJnTmFtZX1cIiBzaG91bGQgYmUgYSAke3R5cGVOYW1lfWBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHlwZU1hdGNoZXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYCR7ZXJyb3JEZXNjfTogJHthcmdOYW1lfSA9PT0gJHt0eXBlb2YgYXJnfSgke2FyZ30pYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcblxuICAgIGlmICghZXJyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgXFxuJHtlcnJQcmVmaXh9JHtmbk5hbWV9KCR7c2lnbmF0dXJlfSk6XFxuYCArXG4gICAgICAgIGAke2Vyci5tYXAoZXJyID0+IGA+ICR7ZXJyfWApLmpvaW4oJ1xcbicpfWBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gTG9nZ2VyIChsZXZlbCkge1xuICBsZXQgX2xldmVsID0gbGV2ZWxcbiAgaWYgKHR5cGVvZiBfbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgX2xldmVsID0gKHtcbiAgICAgIGluZm86IDMsXG4gICAgICBsb2c6IDIsXG4gICAgICB3YXJuOiAxLFxuICAgICAgbm9uZTogMFxuICAgIH0pW19sZXZlbF0gfHwgM1xuICB9XG4gIGZ1bmN0aW9uIGNhbldhcm4gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMVxuICB9XG4gIGZ1bmN0aW9uIGNhbkxvZyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAyXG4gIH1cbiAgZnVuY3Rpb24gY2FuSW5mbyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAzXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjYW5XYXJuLFxuICAgIGNhbkxvZyxcbiAgICBjYW5JbmZvLFxuXG4gICAgaW5mbzogKC4uLmFyZ3MpID0+IGNhbkluZm8oKSAmJiBjb25zb2xlLmluZm8oLi4uYXJncyksXG4gICAgdGFibGU6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLnRhYmxlKC4uLmFyZ3MpLFxuICAgIGxvZzogKC4uLmFyZ3MpID0+IGNhbkxvZygpICYmIGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuICAgIHdhcm46ICguLi5hcmdzKSA9PiBjYW5XYXJuKCkgJiYgY29uc29sZS53YXJuKC4uLmFyZ3MpLFxuICAgIGVycm9yOiAoLi4uYXJncykgPT4gY29uc29sZS5lcnJvciguLi5hcmdzKVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9