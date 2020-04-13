(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("events"));
	else if(typeof define === 'function' && define.amd)
		define(["events"], factory);
	else if(typeof exports === 'object')
		exports["statebot"] = factory(require("events"));
	else
		root["statebot"] = factory(root["events"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_events__) {
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
 * <script src="https://unpkg.com/statebot@1.0.0/dist/statebot.min.browser.js"></script>
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

var EventEmitter = __webpack_require__(/*! events */ "events");

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

/***/ }),

/***/ "events":
/*!******************************************************************************************!*\
  !*** external {"commonjs":"events","commonjs2":"events","amd":"events","root":"events"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_events__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0ZWJvdC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vc3RhdGVib3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy9wYXJzaW5nLmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL3N0YXRlYm90LmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3N0YXRlYm90L2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJldmVudHNcIixcImNvbW1vbmpzMlwiOlwiZXZlbnRzXCIsXCJhbWRcIjpcImV2ZW50c1wiLFwicm9vdFwiOlwiZXZlbnRzXCJ9Il0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyb3V0ZUlzUG9zc2libGUiLCJhc3NlcnRSb3V0ZSIsInJlcXVpcmUiLCJpc1N0YXRlYm90IiwiZGVjb21wb3NlUm91dGUiLCJEZWZlciIsIk9uY2UiLCJSZXZva2FibGUiLCJMb2dnZXIiLCJBcmdUeXBlRXJyb3IiLCJpc1RlbXBsYXRlTGl0ZXJhbCIsImFyZ1R5cGVFcnJvciIsIm1hY2hpbmUiLCJleHBlY3RlZFJvdXRlIiwiZXJyIiwiVHlwZUVycm9yIiwicm91dGUiLCJldmVyeSIsInN0YXRlIiwiaW5kZXgiLCJsZW5ndGgiLCJuZXh0U3RhdGUiLCJhdmFpbGFibGVTdGF0ZXMiLCJzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSIsInBhc3NlcyIsImluY2x1ZGVzIiwiYXNzZXJ0aW9uSWQiLCJvcHRpb25zIiwiZGVzY3JpcHRpb24iLCJmcm9tU3RhdGUiLCJydW4iLCJwZXJtaXR0ZWREZXZpYXRpb25zIiwidGltZW91dEluTXMiLCJsb2dMZXZlbCIsImNvbnNvbGUiLCJwcmVmaXgiLCJuYW1lIiwibG9nIiwiam9pbiIsImZyb21TdGF0ZUFjdGlvbkZuIiwicmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4iLCJ0b3RhbFRpbWVUYWtlbiIsIlRpbWVUYWtlbiIsInN0YXRlVGltZVRha2VuIiwiYXNzZXJ0aW9uVGltZW91dFRpbWVyIiwiZGV2aWF0aW9ucyIsInBlbmRpbmciLCJ1bmV4cGVjdGVkIiwiY29uc3VtZVJvdXRlIiwicmVwb3J0IiwiVGFibGUiLCJmaW5hbGlzZVJlcG9ydCIsImFkZFJvdyIsImxvY2siLCJ0YWJsZSIsImNvbnRlbnQiLCJlbnRlcmVkU3RhdGUiLCJleHBlY3RlZFN0YXRlIiwic2hpZnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkVycm9yIiwiY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSIsImNsZWFyVGltZW91dCIsInJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIiLCJjbGVhclRpbWVvdXRBbmRSZWplY3QiLCJiYWlsb3V0IiwibWVzc2FnZSIsImN1cnJlbnRTdGF0ZSIsImluU3RhdGUiLCJzZXRUaW1lb3V0IiwicmV2b2tlIiwiZm4iLCJvblN3aXRjaGluZyIsImNvbHVtbnMiLCJhbGlnbm1lbnRzIiwiYWxpZ25tZW50IiwibWFwIiwiXyIsImxvY2tlZCIsImFyZ3MiLCJvYmoiLCJyZWR1Y2UiLCJhY2MiLCJjb2wiLCJyb3ciLCJwdXNoIiwiY29sU2l6ZXMiLCJNYXRoIiwibWF4IiwicGFkTGVmdCIsInN0ciIsImxlbiIsInJlcGVhdCIsInBhZFJpZ2h0Iiwic2l6ZXMiLCJmb3JtYXRGaWVsZCIsInZhbHVlIiwic2l6ZSIsImFsaWduIiwib3V0cHV0IiwiZm9ybWF0dGVkUm93Iiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImZtdCIsIm51bSIsImRpZ2l0cyIsInRvRml4ZWQiLCJyZXBsYWNlIiwiZHVyYXRpb24iLCJTdGF0ZWJvdCIsImRlY29tcG9zZUNoYXJ0IiwiY3hQaXBlIiwiY3hBcnJvdyIsInJ4RGlzYWxsb3dlZENoYXJhY3RlcnMiLCJyeENSTEYiLCJyeENvbW1lbnQiLCJyeE9wZXJhdG9ycyIsInJ4VW5zYWZlIiwicnhMaW5lQ29udGluYXRpb25zIiwiUmVnRXhwIiwidW5pcSIsInRlbXBsYXRlTGl0ZXJhbCIsInJhd0xpbmVzIiwiZmxhdCIsImNvZGVPbmx5IiwicmVtb3ZlQ29tbWVudHMiLCJsaW5lcyIsImNvbmRlbnNlTGluZXMiLCJmbGF0dGVuZWRSb3V0ZSIsInNhbml0aXNlTGluZXMiLCJsaW5lc1RvUHJvY2VzcyIsImxpbmVzT2ZSb3V0ZXMiLCJkZWNvbXBvc2VMaW5lc0ludG9Sb3V0ZXMiLCJsaW5lc09mVHJhbnNpdGlvbnMiLCJkZWNvbXBvc2VSb3V0ZXNJbnRvVHJhbnNpdGlvbnMiLCJzdGF0ZXMiLCJyb3V0ZUtleXMiLCJmaWx0ZXJlZFJvdXRlcyIsImZpbHRlcmVkU3RhdGVzIiwidHJhbnNpdGlvbnMiLCJzcGxpdCIsInJvdXRlcyIsImFycmF5T2ZTdHJpbmdzIiwic3RyaW5nIiwicGFydCIsImZpbHRlciIsIkJvb2xlYW4iLCJsaW5lIiwidGVzdCIsInRyaW0iLCJjdXJyZW50TGluZSIsImlucHV0IiwicHJldmlvdXNTdGF0ZXMiLCJwYWlycyIsImZyb21TdGF0ZXMiLCJ0b1N0YXRlcyIsInRvU3RhdGUiLCJFdmVudEVtaXR0ZXIiLCJpc1Bvam8iLCJpc0V2ZW50RW1pdHRlciIsIlJlZmVyZW5jZUNvdW50ZXIiLCJsb2dQcmVmaXgiLCJjaGFydCIsInVuZGVmaW5lZCIsImhpc3RvcnlMaW1pdCIsImNhbldhcm4iLCJzdGFydEluIiwidHJhbnNpdGlvbklkIiwic3RhdGVIaXN0b3J5Iiwic3RhdGVIaXN0b3J5TGltaXQiLCJldmVudHMiLCJpbnRlcm5hbEV2ZW50cyIsIklOVEVSTkFMX0VWRU5UUyIsIlNUQVRFX0NIQU5HSU5HIiwiU1RBVEVfQ0hBTkdFRCIsImVtaXRJbnRlcm5hbEV2ZW50IiwiZXZlbnROYW1lIiwiZW1pdCIsIm9uSW50ZXJuYWxFdmVudCIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJzdGF0ZXNIYW5kbGVkIiwicm91dGVzSGFuZGxlZCIsImV2ZW50c0hhbmRsZWQiLCJhcHBseUhpdGNoZXIiLCJoaXRjaGVyIiwiZm5OYW1lIiwiaGl0Y2hlckFjdGlvbnMiLCJlbnRlciIsIkVudGVyIiwiRW1pdCIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwicm91dGVDaGFydCIsImFjdGlvbk9yQ29uZmlnIiwiYWN0aW9uIiwiX29uIiwib24iLCJfdGhlbiIsInRoZW4iLCJBcnJheSIsImlzQXJyYXkiLCJldmVudE5hbWVzIiwiYWxsU3RhdGVzIiwiYWxsUm91dGVzIiwiZGVjb21wb3NlZEV2ZW50cyIsIl9jb25maWdzIiwiZGVjb21wb3NlQ29uZmlncyIsImNvbmZpZ3MiLCJhbGxDbGVhbnVwRm5zIiwiaW5jcmVhc2UiLCJvbkV2ZW50IiwiZXZlbnRXYXNIYW5kbGVkIiwic29tZSIsInBhc3NlZCIsInRyYW5zaXRpb25Ob09wIiwidHJhbnNpdGlvbkNvbmZpZ3MiLCJ0cmFuc2l0aW9uIiwiaW52YWxpZFN0YXRlcyIsImludmFsaWRSb3V0ZXMiLCJ3YXJuIiwiY29uZmlnIiwicHJldmlvdXNTdGF0ZSIsImFueU9yRm4iLCJjb25kaXRpb25NYXRjaGVzIiwiZm5BcmdzIiwiSW5TdGF0ZSIsImNhblRyYW5zaXRpb25UbyIsInRlc3RTdGF0ZXMiLCJuZXh0U3RhdGVzIiwiX3N0YXRlIiwibmV4dFJvdXRlIiwiaW5mbyIsImNiIiwiZGVjcmVhc2VSZWZDb3VudCIsInJlbW92ZUV2ZW50Iiwib25Td2l0Y2hlZCIsIm9uRXhpdGluZyIsImRlY3JlYXNlUmVmQ291bnRzIiwib25FeGl0ZWQiLCJvbkVudGVyaW5nIiwib25FbnRlcmVkIiwicmVzZXQiLCJsYXN0U3RhdGUiLCJwcmV2Um91dGUiLCJpbnNwZWN0IiwicmVmcyIsImxvZ1JlZkNvdW50ZXJJbmZvIiwicmVmQ291bnRlciIsInRvVmFsdWUiLCJfX1NUQVRFQk9UX18iLCJoaXN0b3J5Iiwib25UcmFuc2l0aW9ucyIsInBlcmZvcm1UcmFuc2l0aW9ucyIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwiaXRlbSIsIm9uZSIsImluZGV4T2YiLCJkZWZlciIsInRpbWVyIiwiX2ZuIiwicmVzdWx0IiwicmV2b2tlZCIsImtpbmQiLCJfcmVmcyIsImV4cGVjdGluZyIsInJlZiIsImNvdW50T2YiLCJkZWNyZWFzZSIsImNvdW50Iiwia2V5cyIsInNvcnQiLCJrZXkiLCJlcnJQcmVmaXgiLCJ0eXBlTWFwIiwiYXJnTWFwIiwiYXJnTmFtZSIsImFyZ1R5cGUiLCJzaWduYXR1cmUiLCJhcmciLCJlcnJvckRlc2MiLCJ0eXBlTmFtZSIsInR5cGVNYXRjaGVzIiwibGV2ZWwiLCJfbGV2ZWwiLCJub25lIiwiY2FuTG9nIiwiY2FuSW5mbyIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7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d0QsT0FBTyxNQUFNLFlBQUFsUSxPQUFPLEVBQUMwTSxJQUFSLDJCQUExQjtBQUFBLEtBTEQ7QUFNTHRMLFNBQUssRUFBRTtBQUFBOztBQUFBLGFBQWE2TyxNQUFNLE1BQU0sYUFBQWpRLE9BQU8sRUFBQ29CLEtBQVIsNEJBQXpCO0FBQUEsS0FORjtBQU9MakIsT0FBRyxFQUFFO0FBQUE7O0FBQUEsYUFBYThQLE1BQU0sTUFBTSxhQUFBalEsT0FBTyxFQUFDRyxHQUFSLDRCQUF6QjtBQUFBLEtBUEE7QUFRTDJMLFFBQUksRUFBRTtBQUFBOztBQUFBLGFBQWF4RCxPQUFPLE1BQU0sYUFBQXRJLE9BQU8sRUFBQzhMLElBQVIsNEJBQTFCO0FBQUEsS0FSRDtBQVNMcUUsU0FBSyxFQUFFO0FBQUE7O0FBQUEsYUFBYSxhQUFBblEsT0FBTyxFQUFDbVEsS0FBUiw0QkFBYjtBQUFBO0FBVEYsR0FBUDtBQVdELEM7Ozs7Ozs7Ozs7O0FDaE5ELG9EIiwiZmlsZSI6Ii4vc3RhdGVib3QuZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZXZlbnRzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImV2ZW50c1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzdGF0ZWJvdFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImV2ZW50c1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wic3RhdGVib3RcIl0gPSBmYWN0b3J5KHJvb3RbXCJldmVudHNcIl0pO1xufSkod2luZG93LCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2V2ZW50c19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBBU1NFUlRJT04gSEVMUEVSU1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJvdXRlSXNQb3NzaWJsZSxcbiAgYXNzZXJ0Um91dGVcbn1cblxuY29uc3QgeyBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgZGVjb21wb3NlUm91dGUgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5jb25zdCB7XG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIExvZ2dlcixcbiAgQXJnVHlwZUVycm9yLFxuICBpc1RlbXBsYXRlTGl0ZXJhbFxufSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBhcmdUeXBlRXJyb3IgPSBBcmdUeXBlRXJyb3IoJ3N0YXRlYm90LicpXG5cbmZ1bmN0aW9uIHJvdXRlSXNQb3NzaWJsZSAobWFjaGluZSwgZXhwZWN0ZWRSb3V0ZSkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3JvdXRlSXNQb3NzaWJsZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCBleHBlY3RlZFJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIGV4cGVjdGVkUm91dGVcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IHJvdXRlID0gZGVjb21wb3NlUm91dGUoZXhwZWN0ZWRSb3V0ZSlcbiAgcmV0dXJuIHJvdXRlLmV2ZXJ5KChzdGF0ZSwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPT09IHJvdXRlLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJvdXRlW2luZGV4ICsgMV1cbiAgICAgIGNvbnN0IGF2YWlsYWJsZVN0YXRlcyA9IG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoc3RhdGUpXG4gICAgICBjb25zdCBwYXNzZXMgPSBhdmFpbGFibGVTdGF0ZXMuaW5jbHVkZXMobmV4dFN0YXRlKVxuICAgICAgcmV0dXJuIHBhc3Nlc1xuICAgIH1cbiAgfSlcbn1cblxubGV0IGFzc2VydGlvbklkID0gMFxuXG4vKipcbiAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfSBvcHRpb25zLlxuICogQHR5cGVkZWYge09iamVjdH0gYXNzZXJ0Um91dGVPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Rlc2NyaXB0aW9uXVxuICogIERlc2NyaWJlIHRoZSBzdWNjZXNzLWNvbmRpdGlvbiBmb3IgdGhpcyBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Zyb21TdGF0ZT1cIlwiXVxuICogIFdhaXQgZm9yIHRoZSBtYWNoaW5lIHRvIGJlIGluIHRoaXMgc3RhdGUgYmVmb3JlIGFzc2VydGlvbiBiZWdpbnMuXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBbcnVuXVxuICogIFJ1biB0aGlzIGZ1bmN0aW9uIGp1c3QgYmVmb3JlIHN0YXJ0aW5nIHRoZSBhc3NlcnRpb24uXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3Blcm1pdHRlZERldmlhdGlvbnM9MF1cbiAqICBJZiB3ZSBoaXQgYW4gdW5leHBlY3RlZCBzdGF0ZSBkdXJpbmcgYXNzZXJ0aW9uLCB0aGlzIGlzIGEgXCJkZXZpYXRpb25cIi5cbiAqICBJdCBtaWdodCBiZSB0aGF0IHRoZSBGU00gd2lsbCBjb21lIGJhY2sgdG8gdGhlIGV4cGVjdGVkIHN0YXRlIGFnYWluXG4gKiAgYWZ0ZXIgYSBjZXJ0YWluIG51bWJlciBvZiB0aGVzZS4gRm9yIGV4YW1wbGUsIGlmIHlvdXIgRlNNIGhhcyBhXG4gKiAgXCJyZXRyeVwiIHJvdXRlIGNvbmZpZ3VyZWQsIHRoaXMgbnVtYmVyIGNhbiBhY2NvdW50IGZvciBpdC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbdGltZW91dEluTXM9MTAwMF1cbiAqICBQZXJtaXR0ZWQgbGVuZ3RoIG9mIHRpbWUgZm9yIHRoZSBlbnRpcmUgYXNzZXJ0aW9uLCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgTm9ybWFsbHkgd2Ugd2FudCBsb2dzIGZvciBhc3NlcnRpb25zLCByaWdodD8gV2VsbCwgeW91IGNhbiB0dW5lXG4gKiAgdGhlbSBqdXN0IGxpa2UgeW91IGNhbiB3aXRoIHtAbGluayAjc3RhdGVib3RvcHRpb25zfHN0YXRlYm90T3B0aW9uc30uXG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0Um91dGUgKG1hY2hpbmUsIGV4cGVjdGVkUm91dGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdhc3NlcnRSb3V0ZScsXG4gICAgeyBtYWNoaW5lOiBpc1N0YXRlYm90LCBleHBlY3RlZFJvdXRlOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIG1hY2hpbmUsIGV4cGVjdGVkUm91dGVcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGFzc2VydGlvbklkICs9IDFcblxuICBjb25zdCB7XG4gICAgZGVzY3JpcHRpb24gPSAnQXNzZXJ0aW9uIGNvbXBsZXRlJyxcbiAgICBmcm9tU3RhdGUgPSAnJyxcbiAgICBydW4gPSAoKSA9PiB7fSxcbiAgICBwZXJtaXR0ZWREZXZpYXRpb25zID0gMCxcbiAgICB0aW1lb3V0SW5NcyA9IDEwMDAsXG4gICAgbG9nTGV2ZWwgPSAzXG4gIH0gPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uc3QgY29uc29sZSA9IExvZ2dlcihsb2dMZXZlbClcblxuICBjb25zdCBwcmVmaXggPSBgU3RhdGVib3RbJHttYWNoaW5lLm5hbWUoKX1dOiBhSWQ8JHthc3NlcnRpb25JZH0+YFxuICBjb25zdCByb3V0ZSA9IGRlY29tcG9zZVJvdXRlKGV4cGVjdGVkUm91dGUpXG5cbiAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogQXNzZXJ0aW5nIHJvdXRlOiBbJHtyb3V0ZS5qb2luKCcgPiAnKX1dYClcbiAgY29uc29sZS5sb2coYCR7cHJlZml4fTogPiBBc3NlcnRpb24gd2lsbCBzdGFydCBmcm9tIHN0YXRlOiBcIiR7ZnJvbVN0YXRlfVwiYClcblxuICBjb25zdCBmcm9tU3RhdGVBY3Rpb25GbiA9IERlZmVyKHJ1bilcbiAgbGV0IHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gKCkgPT4geyB9XG5cbiAgY29uc3QgdG90YWxUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICBsZXQgYXNzZXJ0aW9uVGltZW91dFRpbWVyXG4gIGxldCBkZXZpYXRpb25zID0gMFxuICBsZXQgcGVuZGluZyA9IHRydWVcbiAgbGV0IHVuZXhwZWN0ZWQgPSBmYWxzZVxuXG4gIGNvbnN0IGNvbnN1bWVSb3V0ZSA9IFsuLi5yb3V0ZV1cbiAgY29uc3QgcmVwb3J0ID0gVGFibGUoXG4gICAgWydzdGF0ZScsICdleHBlY3RlZCcsICdpbmZvJywgJ3Rvb2snXSxcbiAgICBbJ2NlbnRlcicsICdjZW50ZXInLCAnbGVmdCcsICdyaWdodCddXG4gIClcblxuICBjb25zdCBmaW5hbGlzZVJlcG9ydCA9IE9uY2UoZXJyID0+IHtcbiAgICBhZGRSb3coJycsICcnLCAnJywgJ1RPVEFMOiAnICsgdG90YWxUaW1lVGFrZW4oKSlcbiAgICByZXBvcnQubG9jaygpXG4gICAgY29uc29sZS5sb2coYFxcbiR7cHJlZml4fTogJHtkZXNjcmlwdGlvbn06IFske2VyciA/ICdGQUlMRUQnIDogJ1NVQ0NFU1MnfV1gKVxuICAgIGNvbnNvbGUudGFibGUocmVwb3J0LmNvbnRlbnQoKSlcbiAgICByZXR1cm4gZXJyXG4gIH0pXG5cbiAgY29uc3QgeyBhZGRSb3cgfSA9IHJlcG9ydFxuICBmdW5jdGlvbiBlbnRlcmVkU3RhdGUgKHN0YXRlKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIGFkZFJvdyhzdGF0ZSwgJy0nLCAnUEVORElORycpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSBjb25zdW1lUm91dGVbMF1cbiAgICAgIGlmIChleHBlY3RlZFN0YXRlID09PSBzdGF0ZSkge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsIHVuZXhwZWN0ZWQgPyAnUkVBTElHTkVEJyA6ICdPS0FZJywgc3RhdGVUaW1lVGFrZW4oKSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICAgIGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRSb3coc3RhdGUsIGV4cGVjdGVkU3RhdGUsICdXUk9ORyBTVEFURScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSB0cnVlXG4gICAgICAgIGRldmlhdGlvbnMgKz0gMVxuICAgICAgfVxuICAgICAgc3RhdGVUaW1lVGFrZW4gPSBUaW1lVGFrZW4oKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IoJ05PIFJPVVRFIFRPIFRFU1QnKSkpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZXNvbHZlID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlc29sdmUoLi4uYXJncylcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhclRpbWVvdXRBbmRSZWplY3QgPSBlcnIgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KGFzc2VydGlvblRpbWVvdXRUaW1lcilcbiAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICAgIHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIoKVxuICAgICAgcmVqZWN0KGVycilcbiAgICB9XG5cbiAgICBjb25zdCBiYWlsb3V0ID0gbWVzc2FnZSA9PiB7XG4gICAgICB3aGlsZSAoY29uc3VtZVJvdXRlLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlLnNoaWZ0KClcbiAgICAgICAgYWRkUm93KG1hY2hpbmUuY3VycmVudFN0YXRlKCksIGAoJHtleHBlY3RlZFN0YXRlfSlgLCBtZXNzYWdlKVxuICAgICAgICB1bmV4cGVjdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dEFuZFJlamVjdChmaW5hbGlzZVJlcG9ydChuZXcgRXJyb3IobWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGlmIChtYWNoaW5lLmluU3RhdGUoZnJvbVN0YXRlKSkge1xuICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9IGZyb21TdGF0ZUFjdGlvbkZuKClcbiAgICB9XG5cbiAgICBjb25zdCB7IHJldm9rZSwgZm4gfSA9IFJldm9rYWJsZShzdGF0ZSA9PiB7XG4gICAgICBhc3NlcnRpb25UaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVElNRU9VVCcpXG4gICAgICB9LCB0aW1lb3V0SW5NcylcblxuICAgICAgZW50ZXJlZFN0YXRlKHN0YXRlKVxuICAgICAgaWYgKHBlbmRpbmcgJiYgc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBwZW5kaW5nID0gZmFsc2VcbiAgICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICB9XG4gICAgICBpZiAoZGV2aWF0aW9ucyA+IHBlcm1pdHRlZERldmlhdGlvbnMpIHtcbiAgICAgICAgcmV2b2tlKClcbiAgICAgICAgYmFpbG91dCgnVE9PIE1BTlkgREVWSUFUSU9OUycpXG4gICAgICB9XG4gICAgICBpZiAoY29uc3VtZVJvdXRlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGNsZWFyVGltZW91dEFuZFJlc29sdmUoZmluYWxpc2VSZXBvcnQoKSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lciA9IG1hY2hpbmUub25Td2l0Y2hpbmcoZm4pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIFRhYmxlIChjb2x1bW5zID0gW10sIGFsaWdubWVudHMgPSBbXSkge1xuICBjb25zdCB0YWJsZSA9IFtdXG4gIGNvbnN0IGFsaWdubWVudCA9IGNvbHVtbnMubWFwKChfLCBpbmRleCkgPT4gYWxpZ25tZW50c1tpbmRleF0gfHwgJ2NlbnRlcicpXG5cbiAgbGV0IGxvY2tlZCA9IGZhbHNlXG4gIGZ1bmN0aW9uIGxvY2sgKCkge1xuICAgIGxvY2tlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFJvdyAoLi4uYXJncykge1xuICAgIGlmIChsb2NrZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBvYmogPSBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjb2wsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByb3cgPSBhcmdzW2luZGV4XSB8fCAnJ1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogcm93XG4gICAgICB9XG4gICAgfSwge30pXG4gICAgdGFibGUucHVzaChvYmopXG4gIH1cblxuICBmdW5jdGlvbiBjb2xTaXplcyAoKSB7XG4gICAgcmV0dXJuIHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IGNvbHVtbnMubWFwKChjb2wsIGluZGV4KSA9PiBNYXRoLm1heChyb3dbY29sXS5sZW5ndGgsIGFjY1tpbmRleF0pKSwgY29sdW1ucy5tYXAoKCkgPT4gMCkpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRMZWZ0IChzdHIsIGxlbikge1xuICAgIHJldHVybiBzdHIgKyAnICcucmVwZWF0KGxlbiAtIHN0ci5sZW5ndGgpXG4gIH1cblxuICBmdW5jdGlvbiBwYWRSaWdodCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKSArIHN0clxuICB9XG5cbiAgZnVuY3Rpb24gY29udGVudCAoKSB7XG4gICAgY29uc3Qgc2l6ZXMgPSBjb2xTaXplcygpXG4gICAgZnVuY3Rpb24gZm9ybWF0RmllbGQgKHZhbHVlLCBpbmRleCkge1xuICAgICAgY29uc3Qgc2l6ZSA9IHNpemVzW2luZGV4XVxuICAgICAgY29uc3QgYWxpZ24gPSBhbGlnbm1lbnRbaW5kZXhdXG4gICAgICBpZiAoYWxpZ24gPT09ICdsZWZ0Jykge1xuICAgICAgICByZXR1cm4gcGFkTGVmdCh2YWx1ZSwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIGlmIChhbGlnbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICByZXR1cm4gcGFkUmlnaHQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gdGFibGUucmVkdWNlKChhY2MsIHJvdykgPT4ge1xuICAgICAgY29uc3QgZm9ybWF0dGVkUm93ID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4gKHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbY29sXTogZm9ybWF0RmllbGQocm93W2NvbF0sIGluZGV4KVxuICAgICAgfSksIHt9KVxuICAgICAgcmV0dXJuIFsuLi5hY2MsIGZvcm1hdHRlZFJvd11cbiAgICB9LCBbXSlcbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvY2s6IGxvY2ssXG4gICAgYWRkUm93OiBhZGRSb3csXG4gICAgY29udGVudDogY29udGVudFxuICB9XG59XG5cbmZ1bmN0aW9uIFRpbWVUYWtlbiAoKSB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KClcblxuICBmdW5jdGlvbiBmbXQgKG51bSwgZGlnaXRzKSB7XG4gICAgcmV0dXJuIG51bS50b0ZpeGVkKGRpZ2l0cykucmVwbGFjZSgvXFwuMCskLywgJycpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuXG4gICAgaWYgKGR1cmF0aW9uIDwgNTAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uKX0gbXNgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDUwMDApIHtcbiAgICAgIHJldHVybiBgJHtmbXQoZHVyYXRpb24gLyAxMDAwLCAyKX0gcyBgXG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbiA8IDYwMDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMSl9IHMgYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCAvIDYwLCAxKX0gbSBgXG4gICAgfVxuICB9XG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBFWFBPUlRTXG4vL1xuXG5jb25zdCB7IFN0YXRlYm90LCBpc1N0YXRlYm90IH0gPSByZXF1aXJlKCcuL3N0YXRlYm90JylcbmNvbnN0IHsgYXNzZXJ0Um91dGUsIHJvdXRlSXNQb3NzaWJsZSB9ID0gcmVxdWlyZSgnLi9hc3NlcnRpb25zJylcbmNvbnN0IHsgZGVjb21wb3NlQ2hhcnQgfSA9IHJlcXVpcmUoJy4vcGFyc2luZycpXG5cbi8qKlxuICogPGltZyBzcmM9XCIuL2xvZ28tZnVsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogMjU1cHg7IG1hcmdpbjogMTBweCAwO1wiIC8+XG4gKlxuICogV3JpdGUgbW9yZSByb2J1c3QgYW5kIHVuZGVyc3RhbmRhYmxlIHByb2dyYW1zLlxuICpcbiAqIFN0YXRlYm90IGhvcGVzIHRvIG1ha2UgW0Zpbml0ZSBTdGF0ZSBNYWNoaW5lc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmluaXRlLXN0YXRlX21hY2hpbmUpIChGU01zKSBhIGxpdHRsZSBtb3JlIGFjY2Vzc2libGUuXG4gKlxuICogWW91J3JlIHJlYWRpbmcgdGhlIGRvY3VtZW50YXRpb24uIE90aGVyIGV4aXRzIGFyZTpcbiAqXG4gKiAtIFtUaGUgUkVBRE1FIGZpbGVdKC4uL1JFQURNRS5tZClcbiAqIC0gW1RoZSBHaXRodWIgUmVwb10oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdClcbiAqXG4gKiBTdGF0ZWJvdCB3YXMgd3JpdHRlbiBieSBbQ29uYW4gVGhlb2JhbGRdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvKSBhbmRcbiAqIGlzIFtJU0MgbGljZW5zZWRdKC4uL0xJQ0VOU0UpLlxuICpcbiAqICMjIyBKdW1wIHJpZ2h0IGluXG4gKlxuICogWW91IGNhbiBpbnN0YWxsIFN0YXRlYm90IGludG8geW91ciBgbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYHNoXG4gKiBucG0gaSBzdGF0ZWJvdFxuICogYGBgXG4gKlxuICogYGBganNcbiAqIGltcG9ydCBzdGF0ZWJvdCBmcm9tICdzdGF0ZWJvdCdcbiAqIGBgYFxuICpcbiAqIE9yIG5vbi1gbnBtYCBwcm9qZWN0OlxuICpcbiAqIGBgYGpzXG4gKiA8c2NyaXB0IHNyYz1cImh0dHBzOi8vdW5wa2cuY29tL3N0YXRlYm90QDEuMC4wL2Rpc3Qvc3RhdGVib3QubWluLmJyb3dzZXIuanNcIj48L3NjcmlwdD5cbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCB7IFN0YXRlYm90IH0gPSBzdGF0ZWJvdFxuICogLy8gTWFrZSBtYWNoaW5lcyB3aXRoIFN0YXRlYm90KClcbiAqXG4gKiBjb25zdCB7IGlzU3RhdGVib3QsIHJvdXRlSXNQb3NzaWJsZSwgYXNzZXJ0Um91dGUgfSA9IHN0YXRlYm90XG4gKiAvLyBUaGVzZSBhcmUgYXNzZXJ0aW9uIGhlbHBlcnMgeW91IGNhbiB1c2UgZm9yIHRlc3RpbmdcbiAqIGBgYFxuICpcbiAqICMjIyBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSA6KVxuICpcbiAqIEkndmUgaW5jbHVkZWQgU3RhdGVib3QgaW4gdGhpcyBwYWdlLiBPcGVuIHRoZSBkZXZlbG9wZXItY29uc29sZSB0b1xuICogZm9sbG93IGFsb25nIHdpdGggdGhlIGV4YW1wbGVzIGJlbG93OlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdwcm9taXNlLWxpa2UnLCB7XG4gKiAgIGNoYXJ0OiBgXG4gKiAgICAgLy8gVGhpcyBvbmUgd2lsbCBiZWhhdmUgYSBiaXQgbGlrZSBhIFByb21pc2VcbiAqICAgICBpZGxlIC0+IHBlbmRpbmcgLT5cbiAqICAgICAgIHJlc29sdmVkIHwgcmVqZWN0ZWRcbiAqXG4gKiAgICAgLy8gLi4uYW5kIHdlJ3JlIGRvbmVcbiAqICAgICByZXNvbHZlZCAtPiBkb25lXG4gKiAgICAgcmVqZWN0ZWQgLT4gZG9uZVxuICogICBgLFxuICogICBzdGFydEluOiAnaWRsZSdcbiAqIH0pXG4gKlxuICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BlbmRpbmcnKVxuICogLy8gdHJ1ZVxuICpcbiAqIG1hY2hpbmUuZW50ZXIoJ3BlbmRpbmcnKVxuICogbWFjaGluZS5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gKiAvLyBbXCJyZXNvbHZlZFwiLCBcInJlamVjdGVkXCJdXG4gKiBgYGBcbiAqXG4gKiBXZSBjYW4gaG9vay11cCBldmVudHMgd2l0aCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX06XG4gKlxuICogYGBganNcbiAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAqICAncGVuZGluZyAtPiByZXNvbHZlZCc6IHtcbiAqICAgIG9uOiAnZGF0YS1sb2FkZWQnXG4gKiAgfSxcbiAqICAncGVuZGluZyAtPiByZWplY3RlZCc6IHtcbiAqICAgIG9uOiBbJ3RpbWVvdXQnLCAnZGF0YS1lcnJvciddLFxuICogICAgdGhlbjogKG1zZykgPT4ge1xuICogICAgICBjb25zb2xlLndhcm4oJ1VoIG9oLi4uJywgbXNnKVxuICogICAgfVxuICogIH0sXG4gKiAgJ3Jlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZSc6IHtcbiAqICAgIG9uOiAndGhhdHMtYWxsLWZvbGtzJ1xuICogIH1cbiAqIH0pXG4gKlxuICogbWFjaGluZS5lbWl0KCdkYXRhLWVycm9yJywgJ0RpZCB5b3UgaGVhciB0aGF0PycpXG4gKiBgYGBcbiAqXG4gKiBIZXJlJ3MgdGhlIEFQSTpcbiAqXG4gKiB8IEhpdGNoZXJzIHwgU3RhdHVzIHwgQWN0aW9ucyB8XG4gKiB8LXwtfC18XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21wZXJmb3JtdHJhbnNpdGlvbnMgLnBlcmZvcm1UcmFuc2l0aW9ucygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmV2ZW50IC5vbkV2ZW50KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWNhbnRyYW5zaXRpb250byAuY2FuVHJhbnNpdGlvblRvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbXN0YXRlc2F2YWlsYWJsZWZyb21oZXJlIC5zdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9IC8ge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb250cmFuc2l0aW9ucyAub25UcmFuc2l0aW9ucygpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGUgLmN1cnJlbnRTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21wcmV2aW91c3N0YXRlIC5wcmV2aW91c1N0YXRlKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWhpc3RvcnkgLmhpc3RvcnkoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IC8ge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGUgLmluU3RhdGUoKX0gLyB7QGxpbmsgI2luc3RhdGUtc3RhdGUtb3V0cHV0d2hlbnRydWUtMSAuSW5TdGF0ZSgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21yZXNldCAucmVzZXQoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0aW5nIC5vbkV4aXRpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWluZm8gLmluZm8oKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zcGVjdCAuaW5zcGVjdCgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21uYW1lIC5uYW1lKCl9IHwgIHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uc3dpdGNoaW5nIC5vblN3aXRjaGluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IHwgIHwgIHxcbiAqXG4gKiA8aW1nIHNyYz1cIi4vbG9nby1zbWFsbC5wbmdcIiBzdHlsZT1cIm1heC13aWR0aDogNzVweDsgbWFyZ2luOiAxNXB4IDAgMCA1cHg7XCIgLz5cbiAqXG4gKiBAbW9kdWxlIHN0YXRlYm90XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfSBgb2JqZWN0YC5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsZW1taW5nJywge1xuICAgKiAgIGNoYXJ0OiBgXG4gICAqICAgICB3YWxraW5nIC0+IChkaWdnaW5nIHwgYnVpbGRpbmcgfCBmYWxsaW5nKSAtPlxuICAgKiAgICAgICB3YWxraW5nXG4gICAqXG4gICAqICAgICBmYWxsaW5nIC0+IHNwbGF0dGluZ1xuICAgKiAgICAgd2Fsa2luZyAtPiBleGl0aW5nXG4gICAqICAgYFxuICAgKiB9KVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiAgR2l2ZSB5b3VyIFN0YXRlYm90IGEgbmFtZS4gVXNlZCBmb3IgbG9nZ2luZyBhbmQgYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9LlxuICAgKiBAcGFyYW0ge3N0YXRlYm90T3B0aW9uc30gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7c3RhdGVib3RGc219XG4gICAqL1xuICBTdGF0ZWJvdCxcblxuICAvKipcbiAgICogVGVzdHMgdGhhdCBhbiBvYmplY3QgaXMgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAgICpcbiAgICogaXNTdGF0ZWJvdChtYWNoaW5lKVxuICAgKiAvLyB0cnVlXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHRlc3QuXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNTdGF0ZWJvdCxcblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgYSBjZXJ0YWluIHJvdXRlIGNhbiBiZSBmb2xsb3dlZCBieSBhXG4gICAqIHtAbGluayAjc3RhdGVib3Rmc218c3RhdGVib3RGc219LlxuICAgKlxuICAgKiBUaGlzIG1lcmVseSB0ZXN0cyB0aGF0IGEgY2VydGFpbiBwYXRoIGNhbiBiZSB0YWtlbiB0aHJvdWdoIGFcbiAgICogc3RhdGUtbWFjaGluZS4gSXQgZG9lc24ndCBhc3NlcnQgdGhhdCB0aGUgc3RhdGVzIGFyZSBtb3ZlZC10aHJvdWdoXG4gICAqIHdoaWxlIHRoZSBtYWNoaW5lIGlzIHdvcmtpbmcsIGFzIHdpdGhcbiAgICoge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9LlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAgICogIFRoZSBtYWNoaW5lIHRvIHRlc3QgdGhlIHJvdXRlIG9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gcm91dGVcbiAgICogIFRoZSByb3V0ZSB0byB0ZXN0IGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gICAqXG4gICAqICBgXG4gICAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICAgKiAgYFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIHJvdXRlSXNQb3NzaWJsZShtYWNoaW5lLFxuICAgKiAgICd3YWxraW5nIC0+IGZhbGxpbmcgLT4gc3BsYXR0aW5nIC0+IHdhbGtpbmcnXG4gICAqIClcbiAgICogLy8gZmFsc2VcbiAgICovXG4gIHJvdXRlSXNQb3NzaWJsZSxcblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgYSB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfSB0cmFjZWQgdGhlIHJvdXRlIHNwZWNpZmllZC5cbiAgICpcbiAgICogV2hlcmVhcyB7QGxpbmsgI3N0YXRlYm90cm91dGVpc3Bvc3NpYmxlfHJvdXRlSXNQb3NzaWJsZSgpfSBvbmx5IGNoZWNrc1xuICAgKiB0aGF0IGEgcGFydGljdWxhciByb3V0ZSBjYW4gYmUgZm9sbG93ZWQsIGBhc3NlcnRSb3V0ZWAgd2lsbCBob29rLWludG9cbiAgICogYSBtYWNoaW5lIGFuZCB3YWl0IGZvciBpdCB0byB0cmFjZSB0aGUgc3BlY2lmaWVkIHBhdGggd2l0aGluIGFcbiAgICogdGltZW91dCBwZXJpb2QuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGFzeW5jXG4gICAqIEBwYXJhbSB7c3RhdGVib3RGc219IG1hY2hpbmVcbiAgICogIFRoZSBtYWNoaW5lIHRvIHJ1biB0aGUgYXNzZXJ0aW9uIG9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gZXhwZWN0ZWRSb3V0ZVxuICAgKiAgVGhlIGV4cGVjdGVkIHJvdXRlIGFzIGFuIGFycm93LWRlbGltaXRlZCBzdHJpbmc6XG4gICAqXG4gICAqICBgXG4gICAqICBcImlkbGUgLT4gcGVuZGluZyAtPiBzdWNjZXNzIC0+IGRvbmVcIlxuICAgKiAgYFxuICAgKiBAcGFyYW0ge2Fzc2VydFJvdXRlT3B0aW9uc30gW29wdGlvbnNdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KC4uLilcbiAgICpcbiAgICogYXNzZXJ0Um91dGUoXG4gICAqICAgbWFjaGluZSwgJ3ByZXBhcmUgLT4gZGVib3VuY2UgLT4gc2VuZGluZyAtPiBkb25lIC0+IGlkbGUnLFxuICAgKiAgIHtcbiAgICogICAgIGRlc2NyaXB0aW9uOiAnRW1haWwgc2VudCB3aXRoIG5vIGlzc3VlcycsXG4gICAqICAgICBmcm9tU3RhdGU6ICdpZGxlJyxcbiAgICogICAgIHRpbWVvdXRJbk1zOiAxMDAwICogMjAsXG4gICAqICAgICBwZXJtaXR0ZWREZXZpYXRpb25zOiAwLFxuICAgKiAgICAgbG9nTGV2ZWw6IDNcbiAgICogICB9XG4gICAqIClcbiAgICogLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ0Fzc2VydGlvbiBwYXNzZWQhJykpXG4gICAqIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihgV2hvb3BzOiAke2Vycn1gKSlcbiAgICpcbiAgICogbWFjaGluZS5lbnRlcignaWRsZScpXG4gICAqL1xuICBhc3NlcnRSb3V0ZSxcblxuICAvKipcbiAgICogRGVjb21wb3NlIGEge0BsaW5rIHN0YXRlYm90Q2hhcnR9IGludG8gYW4gb2JqZWN0IG9mIGBzdGF0ZXNgLCBgcm91dGVzYCxcbiAgICogYW5kIGB0cmFuc2l0aW9uc2AuXG4gICAqXG4gICAqIFN0YXRlYm90KCkgdXNlcyB0aGlzIGludGVybmFsbHkgdG8gcGFyc2UgY2hhcnRzLiBFeHBvc2VkIGZvciBkZWJ1Z2dpbmcuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB2YXIgeyBzdGF0ZXMsIHJvdXRlcywgdHJhbnNpdGlvbnMgfSA9IGRlY29tcG9zZUNoYXJ0YFxuICAgKiAgIHBlbmRpbmcgLT5cbiAgICogICAgIHN1Y2Nlc3MgfCBmYWlsdXJlXG4gICAqIGBcbiAgICogLy8gc3RhdGVzID0gWydwZW5kaW5nJywgJ3N1Y2Nlc3MnLCAnZmFpbHVyZSddXG4gICAqIC8vIHJvdXRlcyA9IFsgJ3BlbmRpbmctPnN1Y2Nlc3MnLCAncGVuZGluZy0+ZmFpbHVyZSddXG4gICAqIC8vIHRyYW5zaXRpb25zID0gW1xuICAgKiAvLyAgIFsncGVuZGluZycsICdzdWNjZXNzJ10sXG4gICAqIC8vICAgWydwZW5kaW5nJywgJ2ZhaWx1cmUnXVxuICAgKiAvLyBdXG4gICAqL1xuICBkZWNvbXBvc2VDaGFydFxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQ0hBUlQvUk9VVEUgUEFSU0lOR1xuLy9cblxuY29uc3QgY3hQaXBlID0gJ3wnXG5jb25zdCBjeEFycm93ID0gJy0+J1xuXG5jb25zdCByeERpc2FsbG93ZWRDaGFyYWN0ZXJzID0gL1teYS16MC05IUAjJCVeJio6XFwtXys9PD58flxcXFwuwqddL2dpXG5jb25zdCByeENSTEYgPSAvW1xcclxcbl0vXG5jb25zdCByeENvbW1lbnQgPSAvKFxcL1xcL1teXFxuXFxyXSopL1xuXG5jb25zdCByeE9wZXJhdG9ycyA9IFtjeFBpcGUsIGN4QXJyb3ddXG4gIC5tYXAocnhVbnNhZmUgPT4gcnhVbnNhZmUucmVwbGFjZSgnfCcsICdcXFxcfCcpKVxuICAuam9pbignfCcpXG5cbmNvbnN0IHJ4TGluZUNvbnRpbmF0aW9ucyA9IG5ldyBSZWdFeHAoYCgke3J4T3BlcmF0b3JzfSkkYClcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGN4UGlwZSxcbiAgY3hBcnJvdyxcbiAgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyxcbiAgZGVjb21wb3NlQ2hhcnQsXG4gIGRlY29tcG9zZVJvdXRlXG59XG5cbmNvbnN0IHsgdW5pcSwgQXJnVHlwZUVycm9yLCBpc1RlbXBsYXRlTGl0ZXJhbCB9ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcignc3RhdGVib3QuJylcblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGUgKHRlbXBsYXRlTGl0ZXJhbCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZVJvdXRlJyxcbiAgICB7IHRlbXBsYXRlTGl0ZXJhbDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICB0ZW1wbGF0ZUxpdGVyYWxcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IHJhd0xpbmVzID0gW3RlbXBsYXRlTGl0ZXJhbF0uZmxhdCgpXG4gIGNvbnN0IGNvZGVPbmx5ID0gcmVtb3ZlQ29tbWVudHMocmF3TGluZXMpXG4gIGNvbnN0IGxpbmVzID0gY29uZGVuc2VMaW5lcyhjb2RlT25seSlcbiAgY29uc3QgZmxhdHRlbmVkUm91dGUgPSBzYW5pdGlzZUxpbmVzKGxpbmVzKS5mbGF0KDIpXG4gIHJldHVybiBmbGF0dGVuZWRSb3V0ZVxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VDaGFydCAodGVtcGxhdGVMaXRlcmFsKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZGVjb21wb3NlQ2hhcnQnLFxuICAgIHsgdGVtcGxhdGVMaXRlcmFsOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIHRlbXBsYXRlTGl0ZXJhbFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgcmF3TGluZXMgPSBbdGVtcGxhdGVMaXRlcmFsXS5mbGF0KClcbiAgY29uc3QgY29kZU9ubHkgPSByZW1vdmVDb21tZW50cyhyYXdMaW5lcylcbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZUxpbmVzKGNvZGVPbmx5KVxuICBjb25zdCBsaW5lc1RvUHJvY2VzcyA9IHNhbml0aXNlTGluZXMobGluZXMpXG4gIGNvbnN0IGxpbmVzT2ZSb3V0ZXMgPSBsaW5lc1RvUHJvY2Vzc1xuICAgIC5tYXAoZGVjb21wb3NlTGluZXNJbnRvUm91dGVzKVxuICAgIC5mbGF0KDEpXG4gIGNvbnN0IGxpbmVzT2ZUcmFuc2l0aW9ucyA9IGxpbmVzT2ZSb3V0ZXNcbiAgICAubWFwKGRlY29tcG9zZVJvdXRlc0ludG9UcmFuc2l0aW9ucylcbiAgICAuZmxhdCgxKVxuICBjb25zdCBzdGF0ZXMgPSBbXVxuICBjb25zdCByb3V0ZUtleXMgPSBsaW5lc09mVHJhbnNpdGlvbnMubWFwKHJvdXRlID0+IHtcbiAgICBzdGF0ZXMucHVzaCguLi5yb3V0ZSlcbiAgICByZXR1cm4gcm91dGUuam9pbihjeEFycm93KVxuICB9KVxuICBjb25zdCBmaWx0ZXJlZFJvdXRlcyA9IHVuaXEocm91dGVLZXlzKVxuICBjb25zdCBmaWx0ZXJlZFN0YXRlcyA9IHVuaXEoc3RhdGVzKVxuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb25zOiBmaWx0ZXJlZFJvdXRlcy5tYXAocm91dGUgPT4gcm91dGUuc3BsaXQoY3hBcnJvdykpLFxuICAgIHJvdXRlczogZmlsdGVyZWRSb3V0ZXMsXG4gICAgc3RhdGVzOiBmaWx0ZXJlZFN0YXRlc1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNvbW1lbnRzIChhcnJheU9mU3RyaW5ncykge1xuICByZXR1cm4gYXJyYXlPZlN0cmluZ3NcbiAgICAucmVkdWNlKChhY2MsIHN0cmluZykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgLi4uc3RyaW5nLnNwbGl0KHJ4Q1JMRikubWFwKHBhcnQgPT4gcGFydFxuICAgICAgICAgIC5yZXBsYWNlKHJ4Q29tbWVudCwgJycpKVxuICAgICAgXVxuICAgIH0sIFtdKVxuICAgIC5maWx0ZXIoQm9vbGVhbilcbn1cblxuZnVuY3Rpb24gY29uZGVuc2VMaW5lcyAobGluZXMpIHtcbiAgcmV0dXJuIGxpbmVzLnJlZHVjZSgoYWNjLCBsaW5lKSA9PiByeExpbmVDb250aW5hdGlvbnMudGVzdChsaW5lLnRyaW0oKSlcbiAgICA/IHtcbiAgICAgIGxpbmVzOiBhY2MubGluZXMsXG4gICAgICBjdXJyZW50TGluZTogYWNjLmN1cnJlbnRMaW5lICsgbGluZVxuICAgIH1cbiAgICA6IHtcbiAgICAgIGxpbmVzOiBbLi4uYWNjLmxpbmVzLCBhY2MuY3VycmVudExpbmUgKyBsaW5lXSxcbiAgICAgIGN1cnJlbnRMaW5lOiAnJ1xuICAgIH0sIHtcbiAgICBsaW5lczogW10sXG4gICAgY3VycmVudExpbmU6ICcnXG4gIH0pLmxpbmVzXG59XG5cbmZ1bmN0aW9uIHNhbml0aXNlTGluZXMgKGxpbmVzKSB7XG4gIHJldHVybiBsaW5lcy5tYXAobGluZSA9PiBsaW5lLnNwbGl0KGN4QXJyb3cpLm1hcChzdHIgPT4gc3RyXG4gICAgLnJlcGxhY2UocnhEaXNhbGxvd2VkQ2hhcmFjdGVycywgJycpXG4gICAgLnNwbGl0KGN4UGlwZSlcbiAgICAubWFwKHBhcnQgPT4gcGFydC50cmltKCkpKSlcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlTGluZXNJbnRvUm91dGVzIChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIHN0YXRlcykgPT4gYWNjID09PSBmYWxzZVxuICAgID8ge1xuICAgICAgcHJldmlvdXNTdGF0ZXM6IFsuLi5zdGF0ZXNdLFxuICAgICAgcGFpcnM6IFtdXG4gICAgfVxuICAgIDoge1xuICAgICAgcHJldmlvdXNTdGF0ZXM6IFsuLi5zdGF0ZXNdLFxuICAgICAgcGFpcnM6IFsuLi5hY2MucGFpcnMsIFtbLi4uYWNjLnByZXZpb3VzU3RhdGVzXSwgWy4uLnN0YXRlc11dXVxuICAgIH0sIGZhbHNlKS5wYWlyc1xufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VSb3V0ZXNJbnRvVHJhbnNpdGlvbnMgKFtmcm9tU3RhdGVzLCB0b1N0YXRlc10pIHtcbiAgcmV0dXJuIGZyb21TdGF0ZXMucmVkdWNlKChhY2MsIGZyb21TdGF0ZSkgPT4gW1xuICAgIC4uLmFjYyxcbiAgICAuLi50b1N0YXRlcy5tYXAodG9TdGF0ZSA9PiB7XG4gICAgICByZXR1cm4gW2Zyb21TdGF0ZSwgdG9TdGF0ZV1cbiAgICB9KVxuICBdLCBbXSlcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIEZTTVxuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN0YXRlYm90LFxuICBpc1N0YXRlYm90XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBTdGF0ZWJvdC5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBzdGF0ZWJvdE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAqICBUaGUgc3RhdGUtY2hhcnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3N0YXJ0SW49PGF1dG8+XVxuICogIFRoZSBzdGF0ZSBpbiB3aGljaCB0byBzdGFydC4gSWYgdW5zcGVjaWZpZWQsIHRoZSBmaXJzdCBzdGF0ZSBpbiB0aGVcbiAqICBjaGFydCB3aWxsIGJlIHVzZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2xvZ0xldmVsPTNdXG4gKiAgSG93IG5vaXN5IHRoZSBsb2dnaW5nIGlzLCBmcm9tIDEgdG8gMzpcbiAqICBgYGBcbiAqICAxKSBjb25zb2xlLndhcm5cbiAqICAyKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlXG4gKiAgMykgY29uc29sZS53YXJuL2xvZy90YWJsZS9pbmZvXG4gKiAgYGBgXG4gKiAgYDNgIGlzIHRoZSBkZWZhdWx0LiBBcmd1bWVudCB0eXBlLWVycm9ycyB3aWxsIGFsd2F5cyBgdGhyb3dgLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtoaXN0b3J5TGltaXQ9Ml1cbiAqICBMaW1pdCBob3cgbXVjaCBoaXN0b3J5IHRoZSBzdGF0ZS1tYWNoaW5lIGtlZXBzLiBBY2Nlc3NlZCB2aWFcbiAqICB7QGxpbmsgI3N0YXRlYm90ZnNtaGlzdG9yeXxzdGF0ZWJvdEZzbSNoaXN0b3J5KCl9LlxuICogQHByb3BlcnR5IHtldmVudHN9IFtldmVudHNdXG4gKiAgSWYgeW91IHdpc2ggdG8gaGF2ZSB5b3VyIFN0YXRlYm90cyBsaXN0ZW4gdG8gZXZlbnRzIGNvbWluZyBmcm9tXG4gKiAgYSBzaGFyZWQgRXZlbnRFbWl0dGVyLCB5b3UgY2FuIHBhc3MgaXQgaW4gaGVyZS4gVGhlIGBlbWl0KClgL2BvbkV2ZW50KClgL1xuICogIGBwZXJmb3JtVHJhbnNpdGlvbnMoKWAgbWV0aG9kcyB3aWxsIHVzZSBpdC5cbiAqXG4gKiAgSXQgc2hvdWxkIGhhdmUgdGhlIHNhbWUgc2lnbmF0dXJlIGFzIHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19jbGFzc19ldmVudGVtaXR0ZXJ8RXZlbnRFbWl0dGVyfS5cbiAqL1xuXG4vKipcbiAqIEEgZGVzY3JpcHRpb24gb2YgYWxsIHRoZSBzdGF0ZXMgaW4gYSBtYWNoaW5lLCBwbHVzIGFsbCBvZiB0aGVcbiAqIHBlcm1pdHRlZCB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZW0uXG4gKlxuICogVGhpcyBpcyBkZWZpbmVkIHVzaW5nIGEgYHN0cmluZ2Agb3IgYW4gYGFycmF5YCBvZiBzdHJpbmdzLCBidXRcbiAqICB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHN8VGVtcGxhdGUgTGl0ZXJhbHN9XG4gKiBhcmUgbXVjaCBtb3JlIGNvbnZlbmllbnQuXG4gKlxuICogQW4gYXJyb3cgYC0+YCBjb25maWd1cmVzIGEgKipwZXJtaXR0ZWQgdHJhbnNpdGlvbioqIGJldHdlZW4gdHdvIHN0YXRlczpcbiAqXG4gKiBgYGBcbiAqIGZyb20tc3RhdGUgLT4gdG8tc3RhdGVcbiAqIGBgYFxuICpcbiAqIEl0J3MgdGhlIG9ubHkgb3BlcmF0b3IgbmVlZGVkIHRvIGJ1aWxkIGFueSBjaGFydDpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWRcbiAqICAgcGVuZGluZyAtPiByZWplY3RlZFxuICogICByZXNvbHZlZCAtPiBkb25lXG4gKiAgIHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIFRoZSBcIk9SXCIgb3BlcmF0b3IgYHxgIGNhbiBoZWxwIHVzIHJlbW92ZSBzb21lIHJlZHVuZGFuY3kgZnJvbSB0aGUgYWJvdmUgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZFxuICogICByZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEluIGJvdGggY2hhcnRzLCBgcGVuZGluZ2AgY2FuIHRyYW5zaXRpb24gdG8gYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgLCBhbmRcbiAqIGByZXNvbHZlZGAgb3IgYHJlamVjdGVkYCBjYW4gYm90aCB0cmFuc2l0aW9uIHRvIGBkb25lYC5cbiAqXG4gKiBXZSBjYW4gc3RyZWFtbGluZSB0aGlzIGV2ZW4gZnVydGhlcjpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gKHJlc29sdmVkIHwgcmVqZWN0ZWQpIC0+IGRvbmVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEFnYWluLCB0aGlzIGlzIGV4YWN0bHkgZXF1aXZhbGVudCB0byB0aGUgcHJldmlvdXMgdHdvIGV4YW1wbGVzLlxuICpcbiAqIE5vdGljZSBpbiB0aGlzIG9uZSB0aGF0IHdlIGhhdmUgcGFyZW50aGVzZXMgYChgIGApYCBzdXJyb3VuZGluZyBgcmVzb2x2ZWRgXG4gKiBhbmQgYHJlamVjdGVkYC4gVGhleSBhcmUgYWN0dWFsbHkgY29tcGxldGVseSBpZ25vcmVkIGJ5IHRoZSBwYXJzZXIsIGFuZFxuICogeW91IGNhbiB1c2UgdGhlbSBhcyB5b3UgcGxlYXNlIHRvIGhlbHAgbWFrZSB5b3VyIGNoYXJ0cyBtb3JlIHJlYWRhYmxlLlxuICpcbiAqIEEgY2hhcnQgd29ya3MgZXhhY3RseSB0aGUgc2FtZSB3aXRob3V0IHRoZW06XG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQ2hhcnRzIGNhbiBhbHNvIGJlIHNwbGl0IGFjcm9zcyBtdWx0aXBsZS1saW5lczpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT5cbiAqICAgcmVzb2x2ZWQgfFxuICogICByZWplY3RlZCAtPlxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqIE5vdGljZSB0aGF0IGFsbCB3aGl0ZS1zcGFjZSBpcyBpZ25vcmVkIG9uIGVpdGhlciBzaWRlIG9mIHRoZSBgLT5gXG4gKiBhbmQgYHxgLlxuICpcbiAqIGAvLyBDb21tZW50cyBvZiB0aGlzIGtpbmQgYXJlIGFsbG93ZWQsIHRvbzpgXG4gKlxuICogYGBganNcbiAqIHZhciBwcm9taXNlTGlrZUNoYXJ0ID0gYFxuICogICBwZW5kaW5nIC0+IC8vIFdoZXJlIGRvIHdlIGdvIGZyb20gaGVyZT9cbiAqICAgICAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gLy8gQWgsIHllc1xuICpcbiAqICAgLy8gQW5kIG5vdyB3ZSdyZSBhbGwgZmluaXNoZWRcbiAqICAgZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogRmluYWxseSwgaGVyZSdzIGEgbW9yZSBmdWxsIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciBkcmFnRHJvcENoYXJ0ID0gYFxuICogICBpZGxlIC0+XG4gKiAgICAgZHJhZy1kZXRlY3QgLT5cbiAqICAgICAgIChkcmFnZ2luZyB8IGNsaWNrZWQpXG4gKlxuICogICAvLyBKdXN0IGEgY2xpY2ssIGJhaWwtb3V0IVxuICogICBjbGlja2VkIC0+IGlkbGVcbiAqXG4gKiAgIC8vIERyYWcgZGV0ZWN0ZWQhXG4gKiAgIGRyYWdnaW5nIC0+XG4gKiAgICAgZHJhZy13YWl0IC0+IGRyYWdnZWQgLT4gZHJhZy13YWl0XG4gKlxuICogICAvLyBEcmFnIGZpbmlzaGVkLi4uXG4gKiAgIChkcmFnLXdhaXQgfCBkcmFnZ2VkKSAtPlxuICogICAgIChkcmFnLWRvbmUgfCBkcmFnLWNhbmNlbCkgLT5cbiAqICAgICAgIGlkbGVcbiAqIGBcbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmd8c3RyaW5nW119IHN0YXRlYm90Q2hhcnRcbiAqL1xuXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ldmVudHNcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNvbnN0IHtcbiAgaXNQb2pvLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlcixcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIFJlZmVyZW5jZUNvdW50ZXJcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgeyBkZWNvbXBvc2VDaGFydCwgY3hBcnJvdyB9ID0gcmVxdWlyZSgnLi9wYXJzaW5nJylcblxuZnVuY3Rpb24gU3RhdGVib3QgKG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IFR5cGVFcnJvcignXFxuU3RhdGVib3Q6IFBsZWFzZSBzcGVjaWZ5IGEgbmFtZSBmb3IgdGhpcyBtYWNoaW5lJylcbiAgfVxuXG4gIGNvbnN0IGxvZ1ByZWZpeCA9IGBTdGF0ZWJvdFske25hbWV9XWBcbiAgaWYgKCFpc1Bvam8ob3B0aW9ucykpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoYFxcbiR7bG9nUHJlZml4fTogUGxlYXNlIHNwZWNpZnkgb3B0aW9ucyBmb3IgdGhpcyBtYWNoaW5lYClcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBjaGFydCA9IHVuZGVmaW5lZCxcbiAgICBsb2dMZXZlbCA9IDMsXG4gICAgaGlzdG9yeUxpbWl0ID0gMlxuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcihgJHtsb2dQcmVmaXh9I2ApXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG4gIGNvbnN0IHsgY2FuV2FybiB9ID0gY29uc29sZVxuXG4gIGNvbnN0IHtcbiAgICBzdGF0ZXMgPSBbXSxcbiAgICByb3V0ZXMgPSBbXVxuICB9ID0gY2hhcnQgPyBkZWNvbXBvc2VDaGFydChjaGFydCkgOiBvcHRpb25zXG5cbiAgbGV0IHsgc3RhcnRJbiB9ID0gb3B0aW9uc1xuICBpZiAoc3RhcnRJbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnRJbiA9IHN0YXRlc1swXVxuICB9XG5cbiAgaWYgKCFzdGF0ZXMuaW5jbHVkZXMoc3RhcnRJbikpIHtcbiAgICB0aHJvdyBFcnJvcihgJHtsb2dQcmVmaXh9OiBTdGFydGluZy1zdGF0ZSBub3QgaW4gY2hhcnQ6IFwiJHtzdGFydElufVwiYClcbiAgfVxuXG4gIGxldCB0cmFuc2l0aW9uSWQgPSAwXG4gIGNvbnN0IHN0YXRlSGlzdG9yeSA9IFtzdGFydEluXVxuICBjb25zdCBzdGF0ZUhpc3RvcnlMaW1pdCA9IE1hdGgubWF4KGhpc3RvcnlMaW1pdCwgMilcbiAgY29uc3QgZXZlbnRzID0gaXNFdmVudEVtaXR0ZXIob3B0aW9ucy5ldmVudHMpID8gb3B0aW9ucy5ldmVudHMgOiBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBjb25zdCBpbnRlcm5hbEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBjb25zdCBJTlRFUk5BTF9FVkVOVFMgPSB7XG4gICAgU1RBVEVfQ0hBTkdJTkc6ICcoQU5ZKXN0YXRlOmNoYW5naW5nJyxcbiAgICBTVEFURV9DSEFOR0VEOiAnKEFOWSlzdGF0ZTpjaGFuZ2VkJ1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdEludGVybmFsRXZlbnQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW1pdEludGVybmFsRXZlbnQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVybmFsRXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gb25JbnRlcm5hbEV2ZW50IChldmVudE5hbWUsIGZuKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkludGVybmFsRXZlbnQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycsIGZuOiAnZnVuY3Rpb24nIH0sIGV2ZW50TmFtZSwgZm4pXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBpbnRlcm5hbEV2ZW50cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpbnRlcm5hbEV2ZW50cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGZuKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0YXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3N0YXRlcycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBzdGF0ZS1jaGFuZ2VzJyxcbiAgICBbLi4uc3RhdGVzXVxuICApXG4gIGNvbnN0IHJvdXRlc0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ3RyYW5zaXRpb25zJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHRyYW5zaXRpb25zJyxcbiAgICBbLi4ucm91dGVzXVxuICApXG4gIGNvbnN0IGV2ZW50c0hhbmRsZWQgPSBSZWZlcmVuY2VDb3VudGVyKFxuICAgIG5hbWUsXG4gICAgJ2V2ZW50cycsXG4gICAgJ0xpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHMnXG4gIClcblxuICAvLyBJbnRlcnByZXRzIG9uVHJhbnNpdGlvbnMoKSBhbmQgcGVyZm9ybVRyYW5zaXRpb25zKClcbiAgZnVuY3Rpb24gYXBwbHlIaXRjaGVyIChoaXRjaGVyLCBmbk5hbWUpIHtcbiAgICBjb25zdCBoaXRjaGVyQWN0aW9ucyA9XG4gICAgICB0eXBlb2YgaGl0Y2hlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IGhpdGNoZXIoeyBlbnRlciwgZW1pdCwgRW50ZXIsIEVtaXQgfSlcbiAgICAgICAgOiBpc1Bvam8oaGl0Y2hlcilcbiAgICAgICAgICA/IGhpdGNoZXJcbiAgICAgICAgICA6IG51bGxcblxuICAgIGlmICghaXNQb2pvKGhpdGNoZXJBY3Rpb25zKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEV4cGVjdGVkIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0YFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50cyA9IHt9XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSBbXVxuXG4gICAgT2JqZWN0LmVudHJpZXMoaGl0Y2hlckFjdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoW3JvdXRlQ2hhcnQsIGFjdGlvbk9yQ29uZmlnXSkgPT4ge1xuICAgICAgICAvLyBvblRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbk9yQ29uZmlnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogYWN0aW9uT3JDb25maWcgfSlcbiAgICAgICAgfSBlbHNlIGlmICghaXNQb2pvKGFjdGlvbk9yQ29uZmlnKSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybVRyYW5zaXRpb25zIDEvMy4uLlxuICAgICAgICBjb25zdCB7IG9uOiBfb24sIHRoZW46IF90aGVuIH0gPSBhY3Rpb25PckNvbmZpZ1xuICAgICAgICBpZiAodHlwZW9mIF9vbiA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShfb24pKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnROYW1lcyA9IFtfb25dLmZsYXQoKVxuICAgICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXVxuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogX3RoZW4gfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBfdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgICAgICAgLy8gKEJlaGF2ZSBsaWtlIG9uVHJhbnNpdGlvbnMgaWYgYSBjb25maWcgaXMgc3BlY2lmaWVkLCBidXRcbiAgICAgICAgICAvLyAgdGhlcmUgaXMgbm8gXCJvblwiIGV2ZW50Li4uKVxuICAgICAgICAgIHRyYW5zaXRpb25zLnB1c2goeyByb3V0ZUNoYXJ0LCBhY3Rpb246IGFjdGlvbk9yQ29uZmlnIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBhbGxTdGF0ZXMgPSBbXVxuICAgIGNvbnN0IGFsbFJvdXRlcyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMi8zLi4uXG4gICAgY29uc3QgZGVjb21wb3NlZEV2ZW50cyA9IE9iamVjdC5lbnRyaWVzKGV2ZW50cylcbiAgICAgIC5yZWR1Y2UoKGFjYywgW2V2ZW50TmFtZSwgX2NvbmZpZ3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIGNvbmZpZ3MgfSA9IGRlY29tcG9zZUNvbmZpZ3MoX2NvbmZpZ3MpXG4gICAgICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICAgICAgYWxsUm91dGVzLnB1c2goLi4ucm91dGVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgIFtldmVudE5hbWVdOiBjb25maWdzXG4gICAgICAgIH1cbiAgICAgIH0sIHt9KVxuXG4gICAgY29uc3QgYWxsQ2xlYW51cEZucyA9IFtdXG5cbiAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgYWxsQ2xlYW51cEZucy5wdXNoKFxuICAgICAgLi4uT2JqZWN0LmVudHJpZXMoZGVjb21wb3NlZEV2ZW50cylcbiAgICAgICAgLm1hcCgoW2V2ZW50TmFtZSwgY29uZmlnc10pID0+IHtcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZXZlbnRzSGFuZGxlZC5pbmNyZWFzZShldmVudE5hbWUpLFxuICAgICAgICAgICAgb25FdmVudChldmVudE5hbWUsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGV2ZW50V2FzSGFuZGxlZCA9IGNvbmZpZ3Muc29tZShcbiAgICAgICAgICAgICAgICAoeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXNzZWQgPSBpblN0YXRlKGZyb21TdGF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRlcih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiguLi5hcmdzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgcmV0dXJuICEhcGFzc2VkXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICBpZiAoIWV2ZW50V2FzSGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25Ob09wKGBFdmVudCBub3QgaGFuZGxlZDogXCIke2V2ZW50TmFtZX1cImApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICB9KS5mbGF0KClcbiAgICApXG5cbiAgICAvLyBvblRyYW5zaXRpb25zIDMvMy4uLlxuICAgIGNvbnN0IHRyYW5zaXRpb25Db25maWdzID0gZGVjb21wb3NlQ29uZmlncyh0cmFuc2l0aW9ucylcblxuICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnN0YXRlcylcbiAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnRyYW5zaXRpb25Db25maWdzLnJvdXRlcylcbiAgICB9XG5cbiAgICBhbGxDbGVhbnVwRm5zLnB1c2goXG4gICAgICAuLi50cmFuc2l0aW9uQ29uZmlncy5jb25maWdzLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgY29uc3QgeyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9ID0gdHJhbnNpdGlvblxuICAgICAgICBjb25zdCByb3V0ZSA9IGAke2Zyb21TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgcm91dGVzSGFuZGxlZC5pbmNyZWFzZShyb3V0ZSksXG4gICAgICAgICAgb25JbnRlcm5hbEV2ZW50KHJvdXRlLCBhY3Rpb24pXG4gICAgICAgIF1cbiAgICAgIH0pLmZsYXQoKVxuICAgIClcblxuICAgIC8vIERlYnVnZ2luZywgaWYgd2UncmUgYXQgdGhlIHJpZ2h0IGxldmVsXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgY29uc3QgaW52YWxpZFN0YXRlcyA9IGFsbFN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gIXN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gICAgICBjb25zdCBpbnZhbGlkUm91dGVzID0gYWxsUm91dGVzLmZpbHRlcihyb3V0ZSA9PiAhcm91dGVzLmluY2x1ZGVzKHJvdXRlKSlcbiAgICAgIGlmIChpbnZhbGlkU3RhdGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBJbnZhbGlkIHN0YXRlcyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFN0YXRlcy5tYXAoc3RhdGUgPT4gYCAgPiBcIiR7c3RhdGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBpZiAoaW52YWxpZFJvdXRlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogSW52YWxpZCB0cmFuc2l0aW9ucyBzcGVjaWZpZWQ6XFxuYCArXG4gICAgICAgICAgaW52YWxpZFJvdXRlcy5tYXAocm91dGUgPT4gYCAgPiBcIiR7cm91dGV9XCJgKS5qb2luKCdcXG4nKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGFsbENsZWFudXBGbnMuZm9yRWFjaChmbiA9PiBmbigpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb21wb3NlQ29uZmlncyAoY29uZmlncykge1xuICAgIGNvbnN0IGFsbFN0YXRlcyA9IFtdXG4gICAgY29uc3QgYWxsUm91dGVzID0gW11cblxuICAgIGNvbnN0IF9jb25maWdzID0gY29uZmlncy5yZWR1Y2UoKGFjYywgY29uZmlnKSA9PiB7XG4gICAgICBjb25zdCB7IHJvdXRlQ2hhcnQsIGFjdGlvbiB9ID0gY29uZmlnXG4gICAgICBjb25zdCB7IHN0YXRlcywgcm91dGVzLCB0cmFuc2l0aW9ucyB9ID0gZGVjb21wb3NlQ2hhcnQocm91dGVDaGFydClcbiAgICAgIGlmIChjYW5XYXJuKCkpIHtcbiAgICAgICAgYWxsU3RhdGVzLnB1c2goLi4uc3RhdGVzKVxuICAgICAgICBhbGxSb3V0ZXMucHVzaCguLi5yb3V0ZXMpXG4gICAgICB9XG4gICAgICByZXR1cm4gW1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIC4uLnRyYW5zaXRpb25zLm1hcCh0cmFuc2l0aW9uID0+IHtcbiAgICAgICAgICBjb25zdCBbZnJvbVN0YXRlLCB0b1N0YXRlXSA9IHRyYW5zaXRpb25cbiAgICAgICAgICByZXR1cm4geyBmcm9tU3RhdGUsIHRvU3RhdGUsIGFjdGlvbiB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfSwgW10pXG5cbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnczogX2NvbmZpZ3MsXG4gICAgICBzdGF0ZXM6IGFsbFN0YXRlcyxcbiAgICAgIHJvdXRlczogYWxsUm91dGVzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlvdXNTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMl1cbiAgfVxuXG4gIGZ1bmN0aW9uIGN1cnJlbnRTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlSGlzdG9yeVtzdGF0ZUhpc3RvcnkubGVuZ3RoIC0gMV1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluU3RhdGUgKHN0YXRlLCBhbnlPckZuLCAuLi5mbkFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2luU3RhdGUnLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGNvbmRpdGlvbk1hdGNoZXMgPSBjdXJyZW50U3RhdGUoKSA9PT0gc3RhdGVcblxuICAgIGlmIChhbnlPckZuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghY29uZGl0aW9uTWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhbnlPckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBhbnlPckZuKC4uLmZuQXJncylcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbnlPckZuXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmRpdGlvbk1hdGNoZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIEluU3RhdGUgKHN0YXRlLCBhbnlPckZuKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdJblN0YXRlJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gKC4uLmZuQXJncykgPT4gaW5TdGF0ZShzdGF0ZSwgYW55T3JGbiwgLi4uZm5BcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuVHJhbnNpdGlvblRvICguLi5zdGF0ZXMpIHtcbiAgICBjb25zdCB0ZXN0U3RhdGVzID0gc3RhdGVzLmZsYXQoKVxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignY2FuVHJhbnNpdGlvblRvJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgdGVzdFN0YXRlc1swXSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGlmICghdGVzdFN0YXRlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZXMgPSBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgcmV0dXJuIHRlc3RTdGF0ZXMuZXZlcnkoc3RhdGUgPT4gbmV4dFN0YXRlcy5pbmNsdWRlcyhzdGF0ZSkpXG4gIH1cblxuICBmdW5jdGlvbiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSAoc3RhdGUpIHtcbiAgICBjb25zdCBfc3RhdGUgPSBzdGF0ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IHN0YXRlXG4gICAgICA6IGN1cnJlbnRTdGF0ZSgpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ3N0YXRlc0F2YWlsYWJsZUZyb21IZXJlJywgeyBzdGF0ZTogJ3N0cmluZycgfSwgX3N0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlcy5yZWR1Y2UoKGFjYywgcm91dGUpID0+IHtcbiAgICAgIGNvbnN0IFtmcm9tU3RhdGUsIHRvU3RhdGVdID0gcm91dGUuc3BsaXQoY3hBcnJvdylcbiAgICAgICAgLm1hcChzdGF0ZSA9PiBzdGF0ZS50cmltKCkpXG5cbiAgICAgIGlmIChmcm9tU3RhdGUgPT09IF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gWy4uLmFjYywgdG9TdGF0ZV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIEVtaXQgKGV2ZW50TmFtZSkge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignRW1pdCcsIHsgZXZlbnROYW1lOiAnc3RyaW5nJyB9LCBldmVudE5hbWUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgIHJldHVybiBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2VtaXQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycgfSwgZXZlbnROYW1lKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncylcbiAgfVxuXG4gIGZ1bmN0aW9uIEVudGVyIChzdGF0ZSkge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignRW50ZXInLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgcmV0dXJuIGVudGVyKHN0YXRlLCAuLi5hcmdzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVudGVyIChzdGF0ZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW50ZXInLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGluU3RhdGUgPSBjdXJyZW50U3RhdGUoKVxuICAgIGNvbnN0IHRvU3RhdGUgPSBzdGF0ZVxuXG4gICAgaWYgKHRvU3RhdGUgPT09IGluU3RhdGUpIHtcbiAgICAgIHRyYW5zaXRpb25Ob09wKGBBbHJlYWR5IGluIHN0YXRlOiBcIiR7dG9TdGF0ZX1cImApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoIXN0YXRlcy5pbmNsdWRlcyh0b1N0YXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgc3RhdGUgXCIke3RvU3RhdGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFJvdXRlID0gYCR7aW5TdGF0ZX0tPiR7dG9TdGF0ZX1gXG4gICAgaWYgKCFyb3V0ZXMuaW5jbHVkZXMobmV4dFJvdXRlKSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEludmFsaWQgdHJhbnNpdGlvbiBcIiR7bmV4dFJvdXRlfVwiLCBub3Qgc3dpdGNoaW5nYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIEZlbGwtdGhyb3VnaCwgY2FuIGVudGVyIG5leHQgc3RhdGVcbiAgICBjb25zb2xlLmluZm8oYCR7bG9nUHJlZml4fTogdElkPCR7Kyt0cmFuc2l0aW9uSWR9PjogJHtuZXh0Um91dGV9YClcblxuICAgIHN0YXRlSGlzdG9yeS5wdXNoKHRvU3RhdGUpXG4gICAgaWYgKHN0YXRlSGlzdG9yeS5sZW5ndGggPiBzdGF0ZUhpc3RvcnlMaW1pdCkge1xuICAgICAgc3RhdGVIaXN0b3J5LnNoaWZ0KClcbiAgICB9XG5cbiAgICBlbWl0SW50ZXJuYWxFdmVudChJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdJTkcsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQobmV4dFJvdXRlLCAuLi5hcmdzKVxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0VELCB0b1N0YXRlLCBpblN0YXRlLCAuLi5hcmdzKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXZlbnQgKGV2ZW50TmFtZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXZlbnQnLCB7IGV2ZW50TmFtZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIGV2ZW50TmFtZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBldmVudHMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgY2IpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Td2l0Y2hpbmcgKGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvblN3aXRjaGluZycsIHsgY2I6ICdmdW5jdGlvbicgfSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50ID0gc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdJTkcpXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvbkludGVybmFsRXZlbnQoXG4gICAgICBJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdJTkcsXG4gICAgICAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGNiKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uU3dpdGNoZWQgKGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvblN3aXRjaGVkJywgeyBjYjogJ2Z1bmN0aW9uJyB9LCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnQgPSBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0VEKVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25JbnRlcm5hbEV2ZW50KFxuICAgICAgSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HRUQsXG4gICAgICAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGNiKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXhpdGluZyAoc3RhdGUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkV4aXRpbmcnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmV4aXRpbmdgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgIGNiKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FeGl0ZWQgKHN0YXRlLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FeGl0ZWQnLCB7IHN0YXRlOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgc3RhdGUsIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudHMgPSBbXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKHN0YXRlKSxcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoYCR7c3RhdGV9OmV4aXRlZGApXG4gICAgXVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25Td2l0Y2hlZCgodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IGZyb21TdGF0ZSkge1xuICAgICAgICBjYih0b1N0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRW50ZXJpbmcgKHN0YXRlLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FbnRlcmluZycsIHsgc3RhdGU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBzdGF0ZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06ZW50ZXJpbmdgKVxuICAgIF1cbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gdG9TdGF0ZSkge1xuICAgICAgICBjYihmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FbnRlcmVkIChzdGF0ZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRW50ZXJlZCcsIHsgc3RhdGU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBzdGF0ZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06ZW50ZXJlZGApXG4gICAgXVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25Td2l0Y2hlZCgodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IHRvU3RhdGUpIHtcbiAgICAgICAgY2IoZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbW92ZUV2ZW50KClcbiAgICAgIGRlY3JlYXNlUmVmQ291bnRzLm1hcChmbiA9PiBmbigpKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fTogU3RhdGUtbWFjaGluZSByZXNldCFgKVxuXG4gICAgc3RhdGVIaXN0b3J5Lmxlbmd0aCA9IDBcbiAgICBzdGF0ZUhpc3RvcnkucHVzaChzdGFydEluKVxuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbk5vT3AgKG1lc3NhZ2UpIHtcbiAgICBjb25zdCBsYXN0U3RhdGUgPSBwcmV2aW91c1N0YXRlKClcbiAgICBjb25zdCBpblN0YXRlID0gY3VycmVudFN0YXRlKClcbiAgICBjb25zdCBwcmV2Um91dGUgPSBgJHtsYXN0U3RhdGUgPT09IHVuZGVmaW5lZCA/ICdbdW5kZWZpbmVkXScgOiBsYXN0U3RhdGV9LT4ke2luU3RhdGV9YFxuXG4gICAgY29uc3QgYXZhaWxhYmxlU3RhdGVzID0gc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgIGlmICghYXZhaWxhYmxlU3RhdGVzLmxlbmd0aCkge1xuICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICBgJHtsb2dQcmVmaXh9OiAke21lc3NhZ2V9XFxuYCArXG4gICAgICAgICAgYCAgPiBQcmV2aW91cyB0cmFuc2l0aW9uOiBcIiR7cHJldlJvdXRlfVwiXFxuYCArXG4gICAgICAgICAgYCAgPiBUaGVyZSBhcmUgbm8gc3RhdGVzIGF2YWlsYWJsZSBmcm9tIFwiJHtpblN0YXRlfVwiYFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGAke2xvZ1ByZWZpeH06ICR7bWVzc2FnZX1cXG5gICtcbiAgICAgICAgICBgICA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiJHtwcmV2Um91dGV9XCJcXG5gICtcbiAgICAgICAgICBgICA+IEZyb20gXCIke2luU3RhdGV9XCIsIHZhbGlkIHN0YXRlcyBhcmU6IFske2F2YWlsYWJsZVN0YXRlc1xuICAgICAgICAgICAgLm1hcChzdGF0ZSA9PiBgXCIke3N0YXRlfVwiYClcbiAgICAgICAgICAgIC5qb2luKCcsICcpfV1gXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlczogc3RhdGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICB0cmFuc2l0aW9uczogcm91dGVzSGFuZGxlZC5yZWZzKCksXG4gICAgICBldmVudHM6IGV2ZW50c0hhbmRsZWQucmVmcygpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5mbyAoKSB7XG4gICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fTogSW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzdGF0ZS1tYWNoaW5lYClcblxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKHN0YXRlc0hhbmRsZWQpXG4gICAgbG9nUmVmQ291bnRlckluZm8ocm91dGVzSGFuZGxlZClcbiAgICBsb2dSZWZDb3VudGVySW5mbyhldmVudHNIYW5kbGVkKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9nUmVmQ291bnRlckluZm8gKHJlZkNvdW50ZXIpIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCB0YWJsZSB9ID0gcmVmQ291bnRlci50b1ZhbHVlKClcbiAgICBjb25zb2xlLmxvZyhkZXNjcmlwdGlvbilcbiAgICBpZiAodGFibGUubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLnRhYmxlKHRhYmxlKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnICA+IE5vIGluZm9ybWF0aW9uJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBzdGF0ZS1tYWNoaW5lIG9iamVjdCBjcmVhdGVkIGJ5XG4gICAqIHtAbGluayAjc3RhdGVib3RzdGF0ZWJvdHxTdGF0ZWJvdCgpfS5cbiAgICogQHR5cGVkZWYge09iamVjdH0gc3RhdGVib3RGc21cbiAgICovXG5cbiAgcmV0dXJuIHtcbiAgICAvLyBGb3IgaWRlbnRpZnlpbmcgU3RhdGVib3Qgb2JqZWN0c1xuICAgIF9fU1RBVEVCT1RfXzogMSxcblxuICAgIC8qKlxuICAgICAqIFRlc3RzIHRvIHNlZSBpZiB3ZSBjYW4gdHJhbnNpdGlvbiB0byB0aGUgc3BlY2lmaWVkIHN0YXRlIGZyb21cbiAgICAgKiB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogSWYgbW9yZSB0aGFuIG9uZSBzdGF0ZSBpcyBzcGVjaWZpZWQsIGB0cnVlYCBpcyByZXR1cm5lZCBvbmx5IGlmXG4gICAgICogKipBTEwqKiBzdGF0ZXMgYXJlIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2dhbWUtbWVudXMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+XG4gICAgICogICAgICAgbWVudSAtPlxuICAgICAqICAgICAgICAgcGxheSB8XG4gICAgICogICAgICAgICBvcHRpb25zIHxcbiAgICAgKiAgICAgICAgIHNvdW5kIHxcbiAgICAgKiAgICAgICAgIHF1aXRcbiAgICAgKlxuICAgICAqICAgICAvLyBHbyBiYWNrIHRvIG1lbnVcbiAgICAgKiAgICAgcGxheSB8IG9wdGlvbnMgfCBzb3VuZCAtPiBtZW51XG4gICAgICpcbiAgICAgKiAgICAgLy8gQ2FuIHF1aXQgZnJvbSBtYWluIGdhbWUsIHRvb1xuICAgICAqICAgICBwbGF5IC0+IHF1aXRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jYW5UcmFuc2l0aW9uVG8oJ3BsYXknKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdtZW51JylcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbyhbJ3BsYXknLCAnb3B0aW9ucyddKVxuICAgICAqIC8vIHRydWVcbiAgICAgKi9cbiAgICBjYW5UcmFuc2l0aW9uVG86IGNhblRyYW5zaXRpb25UbyxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdidXR0b24nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IGNsaWNrZWRcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICovXG4gICAgY3VycmVudFN0YXRlOiBjdXJyZW50U3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBlbWl0cyBhbiBldmVudCwgZmlyaW5nIGFueSBsaXN0ZW5lcnMgYWRkZWQgdXNpbmdcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zfC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gb3Ige0BsaW5rICNzdGF0ZWJvdGZzbW9uZXZlbnR8Lm9uRXZlbnQoKX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsuLi4qfSBbYXJnc11cbiAgICAgKiAgT3B0aW9uYWwgYXJndW1lbnRzIHRvIHBhc3MgdG8gbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqICBXaGV0aGVyIG9yIG5vdCB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICBTZWU6IHtAbGluayBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19lbWl0dGVyX2VtaXRfZXZlbnRuYW1lX2FyZ3N8Tm9kZSBFdmVudHN9XG4gICAgICogIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogU3RhdGVib3QgaW1wb3J0cyBgRXZlbnRFbWl0dGVyYCBmcm9tIHRoZVxuICAgICAqICB7QGxpbmsgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzfGV2ZW50c31cbiAgICAgKiBwYWNrYWdlIGZvciBkZWFsaW5nIHdpdGggZXZlbnRzIGluIHRoZSBicm93c2VyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdiYXNpYy1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIC0+IHJlZGlyZWN0XG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiB7XG4gICAgICogICAgIG9uOiAncG9zdC1kYXRhJyxcbiAgICAgKiAgICAgdGhlbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnRXZlbnQgYXJnczogJywgYXJncylcbiAgICAgKiAgICAgICAvLyBzZXRUaW1lb3V0KG1hY2hpbmUuRW50ZXIoJ3JlZGlyZWN0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCdwb3N0LWRhdGEnLCAnSGVsbG8sIHdvcmxkIScpXG4gICAgICogLy8gRXZlbnQgYXJnczogW1wiSGVsbG8sIHdvcmxkIVwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic2VuZGluZ1wiXG4gICAgICovXG4gICAgZW1pdDogZW1pdCxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiAgVGhlIGRlc2lyZWQgZXZlbnQgdG8ge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZW1pdHMgdGhhdCBldmVudC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgndHJhZmZpYy1saWdodHMnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBnbyAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tc3RvcCAtPlxuICAgICAqICAgICAgIHN0b3BcbiAgICAgKlxuICAgICAqICAgICAvLyAuLi5nb3R0YSBrZWVwIHRoYXQgdHJhZmZpYyBmbG93aW5nXG4gICAgICogICAgIHN0b3AgLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLWdvIC0+XG4gICAgICogICAgICAgZ29cbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnc3RvcCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3N0b3AgLT4gcHJlcGFyZS10by1nbyc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tZ28gLT4gZ28nOiAgICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ2dvIC0+IHByZXBhcmUtdG8tc3RvcCc6ICAgeyBvbjogJ3RpbWVyJyB9LFxuICAgICAqICAgJ3ByZXBhcmUtdG8tc3RvcCAtPiBzdG9wJzogeyBvbjogJ3RpbWVyJyB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBuZXh0VHJhZmZpY0xpZ2h0ID0gbWFjaGluZS5FbWl0KCd0aW1lcicpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwic3RvcFwiXG4gICAgICpcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKiBuZXh0VHJhZmZpY0xpZ2h0KClcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInByZXBhcmUtdG8tc3RvcFwiXG4gICAgICovXG4gICAgRW1pdDogRW1pdCxcblxuICAgIC8qKlxuICAgICAqIEltbWVkaWF0ZWx5IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZyBhcyBpdCBpc1xuICAgICAqIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YXRlIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2RpYWxvZycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2hvd2luZy1tb2RhbCAtPiAoc2F2aW5nIHwgaWRsZSlcbiAgICAgKiAgICAgICBzYXZpbmcgLT4gaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NhdmluZycpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIC8vIFtkaWFsb2ddOiBJbnZhbGlkIHRyYW5zaXRpb24gXCJpZGxlLT5zYXZpbmdcIiwgbm90IHN3aXRjaGluZ1xuICAgICAqIC8vID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCJbdW5kZWZpbmVkXS0+aWRsZVwiXG4gICAgICogLy8gPiBGcm9tIFwiaWRsZVwiLCB2YWxpZCBzdGF0ZXMgYXJlOiBbXCJzaG93aW5nLW1vZGFsXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzaG93aW5nLW1vZGFsJylcbiAgICAgKiAvLyB0cnVlXG4gICAgICovXG4gICAgZW50ZXI6IGVudGVyLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHN0YXRlLCBzbyBsb25nXG4gICAgICogYXMgaXQgaXMgYWNjZXNzaWJsZSBmcm9tIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiAoVGhpcyBpcyBlc3NlbnRpYWxseSBhIGNvbnZlbmllbmNlIHdyYXBwZXIgYXJvdW5kIHtAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBkZXNpcmVkIHN0YXRlIHRvIHN3aXRjaC10by5cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICogIEEgZnVuY3Rpb24gdGhhdCBjYW4gY2hhbmdlIHRoZSBzdGF0ZSB3aGVuIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncG9wdXAtbWVudScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gbWVudS1vcGVuZWQgLT5cbiAgICAgKiAgICAgICAoaXRlbS1jbGlja2VkIHwgaWRsZSlcbiAgICAgKlxuICAgICAqICAgICBpdGVtLWNsaWNrZWQgLT4gaWRsZVxuICAgICAqICAgYCxcbiAgICAgKiAgIHN0YXJ0SW46ICdtZW51LW9wZW5lZCdcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogYnV0dG9uLm9uY2xpY2sgPSBtYWNoaW5lLkVudGVyKCdpdGVtLWNsaWNrZWQnKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcIm1lbnUtb3BlbmVkXCJcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrKClcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJpdGVtLWNsaWNrZWRcIlxuICAgICAqL1xuICAgIEVudGVyOiBFbnRlcixcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHN0YXRlcyB0aGUgbWFjaGluZSBoYXMgYmVlbiBpbiBzbyBmYXIsIHVwIHRvIGEgbGltaXQgc2V0XG4gICAgICogYnkgYGhpc3RvcnlMaW1pdGAgaW4ge0BsaW5rIHN0YXRlYm90T3B0aW9uc30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEEgY29weSBvZiB0aGUgc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZG93bmxvYWRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGxvYWRpbmcgLT4gKGZhaWx1cmUgfCBzdWNjZXNzKVxuICAgICAqICAgICAgIGZhaWx1cmUgLT4gbG9hZGluZ1xuICAgICAqICAgICAgIHN1Y2Nlc3MgLT4gZG9uZVxuICAgICAqICAgYCxcbiAgICAgKiAgIGhpc3RvcnlMaW1pdDogNFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdmYWlsdXJlJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdsb2FkaW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzdWNjZXNzJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiBtYWNoaW5lLmhpc3RvcnkoKVxuICAgICAqIC8vIFtcImZhaWx1cmVcIiwgXCJsb2FkaW5nXCIsIFwic3VjY2Vzc1wiLCBcImRvbmVcIl1cbiAgICAgKi9cbiAgICBoaXN0b3J5OiAoKSA9PiBbLi4uc3RhdGVIaXN0b3J5XSxcblxuICAgIC8qKlxuICAgICAqIFByaW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUgdG8gdGhlIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbmZvKClcbiAgICAgKiAvLyBbaGFsZi1kdXBsZXhdOiBJbmZvcm1hdGlvbiBhYm91dCB0aGlzIHN0YXRlLW1hY2hpbmUuXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgc3RhdGVzICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICAgJ2RvbmUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAgJ2lkbGUnICAgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XSBMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnM6XG4gICAgICogLy8g4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAgICogLy8g4pSCIChpbmRleCkg4pSCICAgIHRyYW5zaXRpb25zICAgIOKUgiAgICMgICAg4pSCXG4gICAgICogLy8g4pSc4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS84pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSkXG4gICAgICogLy8g4pSCICAgIDAgICAg4pSCICdpZGxlLT5yZWNlaXZpbmcnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDEgICAg4pSCICAnaWRsZS0+c2VuZGluZycgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDIgICAg4pSCICdyZWNlaXZpbmctPmRvbmUnIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSCICAgIDMgICAg4pSCICAnc2VuZGluZy0+ZG9uZScgIOKUgiAnTm9uZScg4pSCXG4gICAgICogLy8g4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50czpcbiAgICAgKiAvLyAoTm8gaW5mb3JtYXRpb24pXG4gICAgICovXG4gICAgaW5mbzogKCkgPT4gaW5mbygpLFxuXG4gICAgLyoqXG4gICAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IG1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBTYW1lIGRldGFpbHMgYXMge0BsaW5rICNzdGF0ZWJvdGZzbWluZm98LmluZm8oKX0gaW4gb2JqZWN0LWZvcm0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluc3BlY3QoKVxuICAgICAqIC8vIFdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgICAqIC8vICB7IHN0YXRlcywgdHJhbnNpdGlvbnMsIGV2ZW50cyB9XG4gICAgICpcbiAgICAgKiAvLyBUaGVzZSB3aWxsIGVhY2ggaGF2ZSBrZXktdmFsdWVzLCB0aGUga2V5IGJlaW5nIHRoZSBuYW1lXG4gICAgICogLy8gYW5kIHRoZSB2YWx1ZSBiZWluZyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBhdHRhY2hlZC5cbiAgICAgKi9cbiAgICBpbnNwZWN0OiAoKSA9PiBpbnNwZWN0KCksXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqIG1hdGNoZXMgdGhlIHNwZWNpZmllZCBgc3RhdGVgLCBpbW1lZGlhdGVseSByZXR1cm5pbmcgZWl0aGVyXG4gICAgICogYHRydWVgIG9yIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBgb3V0cHV0V2hlblRydWVgIGlzIHNwZWNpZmllZCwgdGhlbiBpdCB3aWxsIGJlIHJldHVybmVkXG4gICAgICogaW5zdGVhZCBvZiBgdHJ1ZWAsIGFuZCBgbnVsbGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mXG4gICAgICogIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgdGhlbiBpdHMgcmV0dXJuLXZhbHVlIHdpbGwgYmUgdXNlZFxuICAgICAqIGFzIHRoZSBgdHJ1ZWAtdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbHwqfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgJ1B1cnJyci4uLicpXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqIC8vIG51bGxcbiAgICAgKiAvLyBeIHRoZSBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIGF0IGFsbCBpbiB0aGUgYGZhbHNlYCBjYXNlLFxuICAgICAqIC8vICAgc28gbm8gY29uc29sZS5sb2cgZWl0aGVyLlxuICAgICAqL1xuICAgIGluU3RhdGU6IGluU3RhdGUsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gcnVuLCB0ZXN0cyB0aGF0XG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IG1hdGNoZXMgdGhlXG4gICAgICogc3BlY2lmaWVkIHN0YXRlLCByZXR1cm5pbmcgZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtaW5zdGF0ZXwuaW5TdGF0ZSgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlIHRvIHRlc3QgYWdhaW5zdC5cbiAgICAgKiBAcGFyYW0ge2FueXxmdW5jdGlvbn0gW291dHB1dFdoZW5UcnVlXVxuICAgICAqICBPcHRpb25hbCBgdHJ1ZWAtdmFsdWUuIElmIGEgZnVuY3Rpb24gaXMgc3BlY2lmaWVkLCBpdCB3aWxsIGJlXG4gICAgICogIGNhbGxlZCBhbmQgaXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FsbHMge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2xpdHRsZS1yZXZ2ZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+XG4gICAgICogICAgICAgKGdlYXItMSB8IGdlYXItMiB8IHJldmVyc2UpIC0+XG4gICAgICogICAgIGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogdmFyIGlkbGluZyA9IG1hY2hpbmUuSW5TdGF0ZSgnaWRsZScpXG4gICAgICogdmFyIHB1cnJpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSWRsaW5nIScpXG4gICAgICogICByZXR1cm4gJ1B1cnJyci4uLidcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogaWRsaW5nKClcbiAgICAgKiAvLyB0cnVlXG4gICAgICpcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBJZGxpbmchXG4gICAgICogLy8gXCJQdXJycnIuLi5cIlxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZ2Vhci0xJylcbiAgICAgKiBwdXJyaW5nKClcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBJblN0YXRlOiBJblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc3RhdGUtbWFjaGluZS5cbiAgICAgKlxuICAgICAqIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGFsc28gYnkge0BsaW5rICNzdGF0ZWJvdGFzc2VydHJvdXRlfGFzc2VydFJvdXRlKCl9XG4gICAgICogZm9yIHRoZSBzYW1lLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ0F5LCB0aGVyZeKAmXMgdGhlIHJ1Yi4nLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICB0aGUtcXVlc3Rpb24gLT4gKHRvLWJlIHwgbm90LXRvLWJlKVxuICAgICAqICAgICAgIG5vdC10by1iZSAtPiBwZXJjaGFuY2UtdG8tZHJlYW1cbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5uYW1lKClcbiAgICAgKiAvLyBcIkF5LCB0aGVyZeKAmXMgdGhlIHJ1Yi5cIlxuICAgICAqL1xuICAgIG5hbWU6ICgpID0+IG5hbWUsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJlZCBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdkb25lJylcbiAgICAgKiAvLyBFbnRlcmVkIGZyb206IHJlY2VpdmluZ1xuICAgICAqL1xuICAgIG9uRW50ZXJlZDogb25FbnRlcmVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGJlY29tZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtlbnRlckNhbGxiYWNrfSBjYlxuICAgICAqICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICBgKGZyb21TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmVkKCdkb25lJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIG1hZGUgaXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyaW5nKCdkb25lJywgZnJvbVN0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdFbnRlcmluZyBmcm9tOicsIGZyb21TdGF0ZSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gRW50ZXJpbmcgZnJvbTogc2VuZGluZ1xuICAgICAqIC8vIFdlIG1hZGUgaXQhXG4gICAgICovXG4gICAgb25FbnRlcmluZzogb25FbnRlcmluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyaW5nIC5vbkVudGVyaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmVkIC5vbkVudGVyZWQoKX0gY2FsbGJhY2sgc2lnbmF0dXJlLlxuICAgICAqXG4gICAgICogQGNhbGxiYWNrIGVudGVyQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVN0YXRlXG4gICAgICogQHBhcmFtIHsuLi5hbnl9IFthcmdzXVxuICAgICAqICBBcmd1bWVudHMgcGFzc2VkLWRvd24gZnJvbSB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXIgLmVudGVyKCl9IG9yXG4gICAgICogIHtAbGluayAjc3RhdGVib3Rmc21lbWl0IC5lbWl0KCl9XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIHNwZWNpZmllZFxuICAgICAqIGV2ZW50IGlzIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiBUaGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28gLT4gZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfSxcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV2ZW50KCd0aW1lcicsICgpID0+IHtcbiAgICAgKiAgIHJlZHJhd1RyYWZmaWNMaWdodHMoKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBzZXRJbnRlcnZhbChtYWNoaW5lLkVtaXQoJ3RpbWVyJyksIDIwMDApXG4gICAgICovXG4gICAgb25FdmVudDogb25FdmVudCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkFGVEVSKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsIHRvU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ1dlIGFyZSBoZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIC8vIFdlIGFyZSBoZWFkaW5nIHRvOiBzZW5kaW5nXG4gICAgICovXG4gICAgb25FeGl0ZWQ6IG9uRXhpdGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQkVGT1JFKiogdGhlXG4gICAgICogc3BlY2lmaWVkLXN0YXRlIGlzIG5vIGxvbmdlciB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2V4aXRDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRlZCgnaWRsZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdQZWFjZSBvdXQhJylcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkV4aXRpbmcoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdIZWFkaW5nIHRvOicsIHRvU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gSGVhZGluZyB0bzogcmVjZWl2aW5nXG4gICAgICogLy8gUGVhY2Ugb3V0IVxuICAgICAqL1xuICAgIG9uRXhpdGluZzogb25FeGl0aW5nLFxuXG4gICAgLyoqXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25leGl0ZWQgLm9uRXhpdGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBleGl0Q2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoZWQoKHRvU3RhdGUsIGZyb21TdGF0ZSkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYFdlIHdlbnQgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBXZSB3ZW50IGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoZWQ6IG9uU3dpdGNoZWQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgYmVmb3JlICoqQU5ZKipcbiAgICAgKiBzdGF0ZS1jaGFuZ2UuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzd2l0Y2hDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uU3dpdGNoaW5nKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBHb2luZyBmcm9tIFwiJHtmcm9tU3RhdGV9XCIgdG8gXCIke3RvU3RhdGV9XCJgKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIEdvaW5nIGZyb20gXCJpZGxlXCIgdG8gXCJyZWNlaXZpbmdcIlxuICAgICAqL1xuICAgIG9uU3dpdGNoaW5nOiBvblN3aXRjaGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gL1xuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGVkIC5vblN3aXRjaGVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBzd2l0Y2hDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0b1N0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUnVuIGNhbGxiYWNrcyB3aGVuIHRyYW5zaXRpb25zIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3NlbnQnKSlcbiAgICAgKiAgICAgICAuY2F0Y2goKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ3NlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZSc6IHdoYXRIYXBwZW5lZCA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBbGwgZmluaXNoZWQ6ICcsIHdoYXRIYXBwZW5lZClcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2VuZGluZycpXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIGZ1bmN0aW9uIHJlY2VpdmVEYXRhKCkge1xuICAgICAqICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgKiAgICAgc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKVxuICAgICAqICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNzUwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzUwKSlcbiAgICAgKiAgIH0pXG4gICAgICogfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBUaGUgYWJvdmUgZXhhbXBsZSB1c2luZyBhIGZ1bmN0aW9uIGZvciBjb25maWdcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoKHsgZW50ZXIgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHNlbmRpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHNlbmREYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBlbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdpZGxlIC0+IHJlY2VpdmluZyc6ICgpID0+IHtcbiAgICAgKiAgICAgcmVjZWl2ZURhdGEoKVxuICAgICAqICAgICAgIC50aGVuKCgpID0+IGVudGVyKCdkb25lJywgJ3JlY2VpdmVkJykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IGVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBldGMuLi5cbiAgICAgKi9cbiAgICBvblRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdvblRyYW5zaXRpb25zJyksXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIHRyYW5zaXRpb25zIHdoZW4gZXZlbnRzIGhhcHBlbi5cbiAgICAgKlxuICAgICAqIFVzZSBgdGhlbmAgdG8gb3B0aW9uYWxseSBhZGQgY2FsbGJhY2tzIHRvIHRob3NlIHRyYW5zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHRyYW5zaXRpb25zXG4gICAgICogIENvbmZpZ3VyYXRpb24gaW4gdGhlIGZvcm0gb2YgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXRcbiAgICAgKiAgcmV0dXJucyBhbiBvYmplY3QuIElmIGEgZnVuY3Rpb24gaXMgdXNlZCwgdGhlcmUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICBhcmd1bWVudCBwYXNzZWQtaW46IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgbWV0aG9kc1xuICAgICAqICBhdHRhY2hlZCBhcyBhIGNvbnZlbmllbmNlOlxuICAgICAqXG4gICAgICogIC0ge3tAbGluayAjc3RhdGVib3Rmc21lbnRlcnwuZW50ZXIoKX0sIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LCB7QGxpbmsgI2VudGVyLXN0YXRlLTEgLkVudGVyKCl9LCB7QGxpbmsgI2VtaXQtbmFtZSAuRW1pdCgpfX1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgYWxsIGxpc3RlbmVycyBhZGRlZFxuICAgICAqICBieSB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY29tcGxleC1mb3JtJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIHVwZGF0ZVxuICAgICAqXG4gICAgICogICAgIC8vIE1heWJlIHRoaW5ncyB0YWtlIGEgbG9uZyB0aW1lLi4uXG4gICAgICogICAgIHVwZGF0ZSAtPlxuICAgICAqICAgICAgIHdhaXRpbmcgLT4gd2FpdGluZy1hLXdoaWxlXG4gICAgICpcbiAgICAgKiAgICAgLy8gV2hpY2ggcGF0aCB3aWxsIHdlIHRha2U/XG4gICAgICogICAgIHdhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT5cbiAgICAgKiAgICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dFxuICAgICAqXG4gICAgICogICAgIC8vIEFsbCBkb25lIVxuICAgICAqICAgICBzdWNjZXNzIHwgZmFpbGVkIHwgdGltZW91dCAtPlxuICAgICAqICAgICAgIGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5wZXJmb3JtVHJhbnNpdGlvbnMoKHsgRW50ZXIsIGVtaXQgfSkgPT4gKHtcbiAgICAgKiAgICdpZGxlIC0+IHVwZGF0ZSc6IHtcbiAgICAgKiAgICAgb246ICd1c2VyLXNhdmVkJyxcbiAgICAgKiAgICAgdGhlbjogKGRhdGEpID0+IHtcbiAgICAgKiAgICAgICBjb25zb2xlLmxvZygnU2VuZGluZyBkYXRhOiAnLCBkYXRhKVxuICAgICAqXG4gICAgICogICAgICAgc2VuZERhdGEoZGF0YSlcbiAgICAgKiAgICAgICAgIC50aGVuKEVudGVyKCdzdWNjZXNzJykpXG4gICAgICogICAgICAgICAuY2F0Y2goRW50ZXIoJ2ZhaWxlZCcpKVxuICAgICAqXG4gICAgICogICAgICAgZW1pdCgnZGF0YS1zZW50JylcbiAgICAgKiAgICAgfVxuICAgICAqICAgfSxcbiAgICAgKiAgICd1cGRhdGUgLT4gd2FpdGluZyc6IHtcbiAgICAgKiAgICAgb246ICdkYXRhLXNlbnQnLFxuICAgICAqICAgICB0aGVuOiAoKSA9PiB7XG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcignd2FpdGluZy1hLXdoaWxlJyksIDc1MClcbiAgICAgKiAgICAgICBzZXRUaW1lb3V0KEVudGVyKCd0aW1lb3V0JyksIDUwMDApXG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKiB9KSlcbiAgICAgKlxuICAgICAqIC8vIEp1c3QgdG8gaWxsdXN0cmF0ZSB0aGF0IHlvdSBjYW4gbWl4IG4nIG1hdGNoIHdpdGggb25UcmFuc2l0aW9uczpcbiAgICAgKiBtYWNoaW5lLm9uVHJhbnNpdGlvbnMoe1xuICAgICAqICAgJ3dhaXRpbmcgfCB3YWl0aW5nLWEtd2hpbGUgLT4gc3VjY2Vzcyc6ICgpID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0xvdmVseSEnKVxuICAgICAqICAgfSxcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHRpbWVvdXQnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXZWxsLCBhdCBsZWFzdCB5b3UgaGF2ZSB5b3VyIHNob2VzJylcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbWl0KCd1c2VyLXNhdmVkJywgWydzb21lJywgJ2RhdGEnXSlcbiAgICAgKiAvLyBTZW5kaW5nIGRhdGE6IFtcInNvbWVcIiwgXCJkYXRhXCJdXG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiBzZW5kRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBwZXJmb3JtVHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zID0+IGFwcGx5SGl0Y2hlcih0cmFuc2l0aW9ucywgJ3BlcmZvcm1UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgVGhlIHByZXZpb3VzIHN0YXRlLCBvciBgdW5kZWZpbmVkYCBpZiB0aGVyZSBpc24ndCBvbmUgKGllOyB5b3VcbiAgICAgKiAgaGF2ZSBqdXN0IGNhbGxlZCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXR8LnJlc2V0KCl9LCBvciB0aGVcbiAgICAgKiAgbWFjaGluZSBoYXMganVzdCBzdGFydGVkLilcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnc2ltcGxlLXNlbmRlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUucHJldmlvdXNTdGF0ZSgpXG4gICAgICogLy8gXCJpZGxlXCJcbiAgICAgKi9cbiAgICBwcmV2aW91c1N0YXRlOiBwcmV2aW91c1N0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUtbWFjaGluZSB0byBpdHMgc3RhcnRpbmctc3RhdGUgYW5kIGNsZWFycyB0aGVcbiAgICAgKiBzdGF0ZS1oaXN0b3J5LlxuICAgICAqXG4gICAgICogQWxsIGxpc3RlbmVycyB3aWxsIHN0aWxsIGJlIGF0dGFjaGVkLCBidXQgbm8gZXZlbnRzIG9yIHRyYW5zaXRpb25zIHdpbGwgYmUgZmlyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnY2Fyb3VzZWwnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBwYWdlLTEgLT5cbiAgICAgKiAgICAgcGFnZS0yIC0+XG4gICAgICogICAgIHBhZ2UtMyAtPlxuICAgICAqICAgICBwYWdlLTQgLT4gcGFnZS0xXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3BhZ2UtMicpXG4gICAgICogbWFjaGluZS5yZXNldCgpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwicGFnZS0xXCJcbiAgICAgKi9cbiAgICByZXNldDogcmVzZXQsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYGFycmF5YCBvZiBzdGF0ZXMgYWNjZXNzaWJsZSBmcm9tIHRoZSBzdGF0ZSBzcGVjaWZpZWQuXG4gICAgICogSWYgbm8gc3RhdGUgaXMgcGFzc2VkLWluLCB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9IGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlXSBUaGUgc3RhdGUgdG8gY2hlY2suIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfVxuICAgICAqICBpZiB1bnNwZWNpZmllZC5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICAgICAqIC8vIFtcInNlbmRpbmdcIiwgXCJyZWNlaXZpbmdcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoJ3JlY2VpdmluZycpXG4gICAgICogLy8gW1wiZG9uZVwiXVxuICAgICAqL1xuICAgIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlOiBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzU3RhdGVib3QgKG1hY2hpbmUpIHtcbiAgcmV0dXJuIChcbiAgICBpc1Bvam8obWFjaGluZSkgJiZcbiAgICB0eXBlb2YgbWFjaGluZS5fX1NUQVRFQk9UX18gPT09ICdudW1iZXInXG4gIClcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIFVUSUxTXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNFdmVudEVtaXR0ZXIsXG4gIGlzUG9qbyxcbiAgaXNUZW1wbGF0ZUxpdGVyYWwsXG4gIHVuaXEsXG4gIERlZmVyLFxuICBPbmNlLFxuICBSZXZva2FibGUsXG4gIFJlZmVyZW5jZUNvdW50ZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyXG59XG5cbmZ1bmN0aW9uIGlzRXZlbnRFbWl0dGVyIChvYmopIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmouZW1pdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiBvYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2Ygb2JqLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nXG4gIClcbn1cblxuZnVuY3Rpb24gaXNQb2pvIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZVxufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTGl0ZXJhbCAob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmouZXZlcnkoaXRlbSA9PiB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHVuaXEgKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5yZWR1Y2UoKGFjYywgb25lKSA9PiAoYWNjLmluZGV4T2Yob25lKSA9PT0gLTEgPyBbLi4uYWNjLCBvbmVdIDogYWNjKSwgW10pXG59XG5cbmZ1bmN0aW9uIGRlZmVyIChmbiwgLi4uYXJncykge1xuICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoZm4sIDAsIC4uLmFyZ3MpXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5mdW5jdGlvbiBEZWZlciAoZm4pIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiBkZWZlcihmbiwgLi4uYXJncylcbn1cblxuZnVuY3Rpb24gT25jZSAoZm4pIHtcbiAgY29uc3QgeyByZXZva2UsIGZuOiBfZm4gfSA9IFJldm9rYWJsZShmbilcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICByZXN1bHQgPSBfZm4oLi4uYXJncylcbiAgICByZXZva2UoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBSZXZva2FibGUgKGZuKSB7XG4gIGxldCByZXZva2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdFxuICByZXR1cm4ge1xuICAgIGZuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCFyZXZva2VkKSB7XG4gICAgICAgIHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICByZXZva2U6ICgpID0+IHtcbiAgICAgIHJldm9rZWQgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFJlZmVyZW5jZUNvdW50ZXIgKG5hbWUsIGtpbmQsIGRlc2NyaXB0aW9uLCAuLi5leHBlY3RpbmcpIHtcbiAgY29uc3QgX3JlZnMgPSB7fTtcbiAgWy4uLmV4cGVjdGluZ10uZmxhdCgpLmZvckVhY2gocmVmID0+IHtcbiAgICBfcmVmc1tyZWZdID0gMFxuICB9KVxuICBmdW5jdGlvbiBpbmNyZWFzZSAocmVmKSB7XG4gICAgX3JlZnNbcmVmXSA9IGNvdW50T2YocmVmKSArIDFcbiAgICByZXR1cm4gKCkgPT4gZGVjcmVhc2UocmVmKVxuICB9XG4gIGZ1bmN0aW9uIGRlY3JlYXNlIChyZWYpIHtcbiAgICBjb25zdCBjb3VudCA9IGNvdW50T2YocmVmKSAtIDFcbiAgICBfcmVmc1tyZWZdID0gTWF0aC5tYXgoY291bnQsIDApXG4gIH1cbiAgZnVuY3Rpb24gY291bnRPZiAocmVmKSB7XG4gICAgcmV0dXJuIF9yZWZzW3JlZl0gfHwgMFxuICB9XG4gIGZ1bmN0aW9uIHJlZnMgKCkge1xuICAgIHJldHVybiB7IC4uLl9yZWZzIH1cbiAgfVxuICBmdW5jdGlvbiB0YWJsZSAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKF9yZWZzKS5zb3J0KClcbiAgICAgIC5tYXAoa2V5ID0+IFtrZXksIF9yZWZzW2tleV1dKVxuICAgICAgLm1hcCgoW3JlZiwgY291bnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgW2tpbmRdOiByZWYsXG4gICAgICAgICAgcmVmczogY291bnQgfHwgJ05vbmUnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gdG9WYWx1ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2NyaXB0aW9uOiBgU3RhdGVib3RbJHtuYW1lfV06ICR7ZGVzY3JpcHRpb259OmAsXG4gICAgICB0YWJsZTogdGFibGUoKVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGluY3JlYXNlOiBpbmNyZWFzZSxcbiAgICBkZWNyZWFzZTogZGVjcmVhc2UsXG4gICAgY291bnRPZjogY291bnRPZixcbiAgICB0b1ZhbHVlOiB0b1ZhbHVlLFxuICAgIHJlZnM6IHJlZnNcbiAgfVxufVxuXG5mdW5jdGlvbiBBcmdUeXBlRXJyb3IgKGVyclByZWZpeCA9ICcnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm5OYW1lLCB0eXBlTWFwLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgYXJnTWFwID0gT2JqZWN0LmVudHJpZXModHlwZU1hcClcbiAgICAgIC5tYXAoKFthcmdOYW1lLCBhcmdUeXBlXSkgPT4ge1xuICAgICAgICByZXR1cm4geyBhcmdOYW1lLCBhcmdUeXBlIH1cbiAgICAgIH0pXG5cbiAgICBjb25zdCBzaWduYXR1cmUgPSBPYmplY3Qua2V5cyh0eXBlTWFwKS5qb2luKCcsICcpXG5cbiAgICBjb25zdCBlcnIgPSBhcmdzXG4gICAgICAubWFwKChhcmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgYXJnTmFtZSwgYXJnVHlwZSB9ID0gYXJnTWFwW2luZGV4XVxuICAgICAgICBpZiAoYXJnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gYEFyZ3VtZW50IHVuZGVmaW5lZDogXCIke2FyZ05hbWV9XCJgXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXJyb3JEZXNjXG4gICAgICAgIGxldCB0eXBlTmFtZVxuICAgICAgICBsZXQgdHlwZU1hdGNoZXNcblxuICAgICAgICBpZiAodHlwZW9mIGFyZ1R5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IGFyZ1R5cGUoYXJnKSA9PT0gdHJ1ZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZS5uYW1lXG4gICAgICAgICAgZXJyb3JEZXNjID0gYCR7dHlwZU5hbWV9KCR7YXJnTmFtZX0pIGRpZCBub3QgcmV0dXJuIHRydWVgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuICAgICAgICAgIHR5cGVNYXRjaGVzID0gdHlwZW9mIGFyZyA9PT0gYXJnVHlwZVxuICAgICAgICAgIHR5cGVOYW1lID0gYXJnVHlwZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGBBcmd1bWVudCBcIiR7YXJnTmFtZX1cIiBzaG91bGQgYmUgYSAke3R5cGVOYW1lfWBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHlwZU1hdGNoZXMpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYCR7ZXJyb3JEZXNjfTogJHthcmdOYW1lfSA9PT0gJHt0eXBlb2YgYXJnfSgke2FyZ30pYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcblxuICAgIGlmICghZXJyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgXFxuJHtlcnJQcmVmaXh9JHtmbk5hbWV9KCR7c2lnbmF0dXJlfSk6XFxuYCArXG4gICAgICAgIGAke2Vyci5tYXAoZXJyID0+IGA+ICR7ZXJyfWApLmpvaW4oJ1xcbicpfWBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gTG9nZ2VyIChsZXZlbCkge1xuICBsZXQgX2xldmVsID0gbGV2ZWxcbiAgaWYgKHR5cGVvZiBfbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgX2xldmVsID0gKHtcbiAgICAgIGluZm86IDMsXG4gICAgICBsb2c6IDIsXG4gICAgICB3YXJuOiAxLFxuICAgICAgbm9uZTogMFxuICAgIH0pW19sZXZlbF0gfHwgM1xuICB9XG4gIGZ1bmN0aW9uIGNhbldhcm4gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMVxuICB9XG4gIGZ1bmN0aW9uIGNhbkxvZyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAyXG4gIH1cbiAgZnVuY3Rpb24gY2FuSW5mbyAoKSB7XG4gICAgcmV0dXJuIF9sZXZlbCA+PSAzXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBjYW5XYXJuLFxuICAgIGNhbkxvZyxcbiAgICBjYW5JbmZvLFxuXG4gICAgaW5mbzogKC4uLmFyZ3MpID0+IGNhbkluZm8oKSAmJiBjb25zb2xlLmluZm8oLi4uYXJncyksXG4gICAgdGFibGU6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLnRhYmxlKC4uLmFyZ3MpLFxuICAgIGxvZzogKC4uLmFyZ3MpID0+IGNhbkxvZygpICYmIGNvbnNvbGUubG9nKC4uLmFyZ3MpLFxuICAgIHdhcm46ICguLi5hcmdzKSA9PiBjYW5XYXJuKCkgJiYgY29uc29sZS53YXJuKC4uLmFyZ3MpLFxuICAgIGVycm9yOiAoLi4uYXJncykgPT4gY29uc29sZS5lcnJvciguLi5hcmdzKVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXZlbnRzX187Il0sInNvdXJjZVJvb3QiOiIifQ==