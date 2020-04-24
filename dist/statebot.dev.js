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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGF0ZWJvdC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vc3RhdGVib3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhdGVib3QvLi9zcmMvYXNzZXJ0aW9ucy5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdGF0ZWJvdC8uL3NyYy9wYXJzaW5nLmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL3N0YXRlYm90LmpzIiwid2VicGFjazovL3N0YXRlYm90Ly4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3N0YXRlYm90L2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJldmVudHNcIixcImNvbW1vbmpzMlwiOlwiZXZlbnRzXCIsXCJhbWRcIjpcImV2ZW50c1wiLFwicm9vdFwiOlwiZXZlbnRzXCJ9Il0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJyb3V0ZUlzUG9zc2libGUiLCJhc3NlcnRSb3V0ZSIsInJlcXVpcmUiLCJpc1N0YXRlYm90IiwiZGVjb21wb3NlUm91dGUiLCJEZWZlciIsIk9uY2UiLCJSZXZva2FibGUiLCJMb2dnZXIiLCJBcmdUeXBlRXJyb3IiLCJpc1RlbXBsYXRlTGl0ZXJhbCIsImFyZ1R5cGVFcnJvciIsIm1hY2hpbmUiLCJleHBlY3RlZFJvdXRlIiwiZXJyIiwiVHlwZUVycm9yIiwicm91dGUiLCJldmVyeSIsInN0YXRlIiwiaW5kZXgiLCJsZW5ndGgiLCJuZXh0U3RhdGUiLCJhdmFpbGFibGVTdGF0ZXMiLCJzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSIsInBhc3NlcyIsImluY2x1ZGVzIiwiYXNzZXJ0aW9uSWQiLCJvcHRpb25zIiwiZGVzY3JpcHRpb24iLCJmcm9tU3RhdGUiLCJydW4iLCJwZXJtaXR0ZWREZXZpYXRpb25zIiwidGltZW91dEluTXMiLCJsb2dMZXZlbCIsImNvbnNvbGUiLCJwcmVmaXgiLCJuYW1lIiwibG9nIiwiam9pbiIsImZyb21TdGF0ZUFjdGlvbkZuIiwicmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4iLCJ0b3RhbFRpbWVUYWtlbiIsIlRpbWVUYWtlbiIsInN0YXRlVGltZVRha2VuIiwiYXNzZXJ0aW9uVGltZW91dFRpbWVyIiwiZGV2aWF0aW9ucyIsInBlbmRpbmciLCJ1bmV4cGVjdGVkIiwiY29uc3VtZVJvdXRlIiwicmVwb3J0IiwiVGFibGUiLCJmaW5hbGlzZVJlcG9ydCIsImFkZFJvdyIsImxvY2siLCJ0YWJsZSIsImNvbnRlbnQiLCJlbnRlcmVkU3RhdGUiLCJleHBlY3RlZFN0YXRlIiwic2hpZnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkVycm9yIiwiY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSIsImNsZWFyVGltZW91dCIsInJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIiLCJjbGVhclRpbWVvdXRBbmRSZWplY3QiLCJiYWlsb3V0IiwibWVzc2FnZSIsImN1cnJlbnRTdGF0ZSIsImluU3RhdGUiLCJzZXRUaW1lb3V0IiwicmV2b2tlIiwiZm4iLCJvblN3aXRjaGluZyIsImNvbHVtbnMiLCJhbGlnbm1lbnRzIiwiYWxpZ25tZW50IiwibWFwIiwiXyIsImxvY2tlZCIsImFyZ3MiLCJvYmoiLCJyZWR1Y2UiLCJhY2MiLCJjb2wiLCJyb3ciLCJwdXNoIiwiY29sU2l6ZXMiLCJNYXRoIiwibWF4IiwicGFkTGVmdCIsInN0ciIsImxlbiIsInJlcGVhdCIsInBhZFJpZ2h0Iiwic2l6ZXMiLCJmb3JtYXRGaWVsZCIsInZhbHVlIiwic2l6ZSIsImFsaWduIiwib3V0cHV0IiwiZm9ybWF0dGVkUm93Iiwic3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsImZtdCIsIm51bSIsImRpZ2l0cyIsInRvRml4ZWQiLCJyZXBsYWNlIiwiZHVyYXRpb24iLCJTdGF0ZWJvdCIsImRlY29tcG9zZUNoYXJ0IiwiY3hQaXBlIiwiY3hBcnJvdyIsInJ4RGlzYWxsb3dlZENoYXJhY3RlcnMiLCJyeENSTEYiLCJyeENvbW1lbnQiLCJyeE9wZXJhdG9ycyIsInJ4VW5zYWZlIiwicnhMaW5lQ29udGluYXRpb25zIiwiUmVnRXhwIiwidW5pcSIsInRlbXBsYXRlTGl0ZXJhbCIsInJhd0xpbmVzIiwiZmxhdCIsImNvZGVPbmx5IiwicmVtb3ZlQ29tbWVudHMiLCJsaW5lcyIsImNvbmRlbnNlTGluZXMiLCJmbGF0dGVuZWRSb3V0ZSIsInNhbml0aXNlTGluZXMiLCJsaW5lc1RvUHJvY2VzcyIsImxpbmVzT2ZSb3V0ZXMiLCJkZWNvbXBvc2VMaW5lSW50b1JvdXRlIiwibGluZXNPZlRyYW5zaXRpb25zIiwiZGVjb21wb3NlUm91dGVJbnRvVHJhbnNpdGlvbiIsInN0YXRlcyIsInJvdXRlS2V5cyIsImZpbHRlcmVkUm91dGVzIiwiZmlsdGVyZWRTdGF0ZXMiLCJ0cmFuc2l0aW9ucyIsInNwbGl0Iiwicm91dGVzIiwiYXJyYXlPZlN0cmluZ3MiLCJzdHJpbmciLCJwYXJ0IiwiZmlsdGVyIiwiQm9vbGVhbiIsImxpbmUiLCJ0ZXN0IiwidHJpbSIsImN1cnJlbnRMaW5lIiwicHJldmlvdXNTdGF0ZXMiLCJwYWlycyIsImZyb21TdGF0ZXMiLCJ0b1N0YXRlcyIsInRvU3RhdGUiLCJFdmVudEVtaXR0ZXIiLCJpc1Bvam8iLCJpc0V2ZW50RW1pdHRlciIsIlJlZmVyZW5jZUNvdW50ZXIiLCJsb2dQcmVmaXgiLCJjaGFydCIsInVuZGVmaW5lZCIsImhpc3RvcnlMaW1pdCIsImNhbldhcm4iLCJzdGFydEluIiwidHJhbnNpdGlvbklkIiwic3RhdGVIaXN0b3J5Iiwic3RhdGVIaXN0b3J5TGltaXQiLCJldmVudHMiLCJpbnRlcm5hbEV2ZW50cyIsIklOVEVSTkFMX0VWRU5UUyIsIlNUQVRFX0NIQU5HSU5HIiwiU1RBVEVfQ0hBTkdFRCIsImVtaXRJbnRlcm5hbEV2ZW50IiwiZXZlbnROYW1lIiwiZW1pdCIsIm9uSW50ZXJuYWxFdmVudCIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJzdGF0ZXNIYW5kbGVkIiwicm91dGVzSGFuZGxlZCIsImV2ZW50c0hhbmRsZWQiLCJhcHBseUhpdGNoZXIiLCJoaXRjaGVyIiwiZm5OYW1lIiwiaGl0Y2hlckFjdGlvbnMiLCJlbnRlciIsIkVudGVyIiwiRW1pdCIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwicm91dGVDaGFydCIsImFjdGlvbk9yQ29uZmlnIiwiYWN0aW9uIiwiX29uIiwib24iLCJfdGhlbiIsInRoZW4iLCJBcnJheSIsImlzQXJyYXkiLCJldmVudE5hbWVzIiwiYWxsU3RhdGVzIiwiYWxsUm91dGVzIiwiZGVjb21wb3NlZEV2ZW50cyIsIl9jb25maWdzIiwiZGVjb21wb3NlQ29uZmlncyIsImNvbmZpZ3MiLCJhbGxDbGVhbnVwRm5zIiwiaW5jcmVhc2UiLCJvbkV2ZW50IiwiZXZlbnRXYXNIYW5kbGVkIiwic29tZSIsInBhc3NlZCIsInRyYW5zaXRpb25Ob09wIiwidHJhbnNpdGlvbkNvbmZpZ3MiLCJ0cmFuc2l0aW9uIiwiaW52YWxpZFN0YXRlcyIsImludmFsaWRSb3V0ZXMiLCJ3YXJuIiwiY29uZmlnIiwicHJldmlvdXNTdGF0ZSIsImFueU9yRm4iLCJjb25kaXRpb25NYXRjaGVzIiwiZm5BcmdzIiwiSW5TdGF0ZSIsImNhblRyYW5zaXRpb25UbyIsInRlc3RTdGF0ZXMiLCJuZXh0U3RhdGVzIiwiX3N0YXRlIiwibmV4dFJvdXRlIiwiaW5mbyIsImNiIiwiZGVjcmVhc2VSZWZDb3VudCIsInJlbW92ZUV2ZW50Iiwib25Td2l0Y2hlZCIsIm9uRXhpdGluZyIsImRlY3JlYXNlUmVmQ291bnRzIiwib25FeGl0ZWQiLCJvbkVudGVyaW5nIiwib25FbnRlcmVkIiwicmVzZXQiLCJsYXN0U3RhdGUiLCJwcmV2Um91dGUiLCJpbnNwZWN0IiwicmVmcyIsImxvZ1JlZkNvdW50ZXJJbmZvIiwicmVmQ291bnRlciIsInRvVmFsdWUiLCJfX1NUQVRFQk9UX18iLCJoaXN0b3J5Iiwib25UcmFuc2l0aW9ucyIsInBlcmZvcm1UcmFuc2l0aW9ucyIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwiaXRlbSIsImlucHV0Iiwib25lIiwiaW5kZXhPZiIsImRlZmVyIiwidGltZXIiLCJfZm4iLCJyZXN1bHQiLCJyZXZva2VkIiwia2luZCIsIl9yZWZzIiwiZXhwZWN0aW5nIiwicmVmIiwiY291bnRPZiIsImRlY3JlYXNlIiwiY291bnQiLCJrZXlzIiwic29ydCIsImtleSIsImVyclByZWZpeCIsInR5cGVNYXAiLCJhcmdNYXAiLCJhcmdOYW1lIiwiYXJnVHlwZSIsInNpZ25hdHVyZSIsImFyZyIsImVycm9yRGVzYyIsInR5cGVOYW1lIiwidHlwZU1hdGNoZXMiLCJsZXZlbCIsIl9sZXZlbCIsIm5vbmUiLCJjYW5Mb2ciLCJjYW5JbmZvIiwiZXJyb3IiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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TUFBTSxZQUFBbFEsT0FBTyxFQUFDeU0sSUFBUiwyQkFBMUI7QUFBQSxLQUxEO0FBTUxyTCxTQUFLLEVBQUU7QUFBQTs7QUFBQSxhQUFhNk8sTUFBTSxNQUFNLGFBQUFqUSxPQUFPLEVBQUNvQixLQUFSLDRCQUF6QjtBQUFBLEtBTkY7QUFPTGpCLE9BQUcsRUFBRTtBQUFBOztBQUFBLGFBQWE4UCxNQUFNLE1BQU0sYUFBQWpRLE9BQU8sRUFBQ0csR0FBUiw0QkFBekI7QUFBQSxLQVBBO0FBUUwwTCxRQUFJLEVBQUU7QUFBQTs7QUFBQSxhQUFheEQsT0FBTyxNQUFNLGFBQUFySSxPQUFPLEVBQUM2TCxJQUFSLDRCQUExQjtBQUFBLEtBUkQ7QUFTTHNFLFNBQUssRUFBRTtBQUFBOztBQUFBLGFBQWEsYUFBQW5RLE9BQU8sRUFBQ21RLEtBQVIsNEJBQWI7QUFBQTtBQVRGLEdBQVA7QUFXRCxDOzs7Ozs7Ozs7OztBQ2hORCxvRCIsImZpbGUiOiIuL3N0YXRlYm90LmRldi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImV2ZW50c1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJldmVudHNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic3RhdGVib3RcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJldmVudHNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInN0YXRlYm90XCJdID0gZmFjdG9yeShyb290W1wiZXZlbnRzXCJdKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9ldmVudHNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXG4vL1xuLy8gU1RBVEVCT1QgQVNTRVJUSU9OIEhFTFBFUlNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByb3V0ZUlzUG9zc2libGUsXG4gIGFzc2VydFJvdXRlXG59XG5cbmNvbnN0IHsgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGRlY29tcG9zZVJvdXRlIH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuY29uc3Qge1xuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBMb2dnZXIsXG4gIEFyZ1R5cGVFcnJvcixcbiAgaXNUZW1wbGF0ZUxpdGVyYWxcbn0gPSByZXF1aXJlKCcuL3V0aWxzJylcblxuY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKCdzdGF0ZWJvdC4nKVxuXG5mdW5jdGlvbiByb3V0ZUlzUG9zc2libGUgKG1hY2hpbmUsIGV4cGVjdGVkUm91dGUpIHtcbiAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdyb3V0ZUlzUG9zc2libGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBjb25zdCByb3V0ZSA9IGRlY29tcG9zZVJvdXRlKGV4cGVjdGVkUm91dGUpXG4gIHJldHVybiByb3V0ZS5ldmVyeSgoc3RhdGUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSByb3V0ZS5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXh0U3RhdGUgPSByb3V0ZVtpbmRleCArIDFdXG4gICAgICBjb25zdCBhdmFpbGFibGVTdGF0ZXMgPSBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKHN0YXRlKVxuICAgICAgY29uc3QgcGFzc2VzID0gYXZhaWxhYmxlU3RhdGVzLmluY2x1ZGVzKG5leHRTdGF0ZSlcbiAgICAgIHJldHVybiBwYXNzZXNcbiAgICB9XG4gIH0pXG59XG5cbmxldCBhc3NlcnRpb25JZCA9IDBcblxuLyoqXG4gKiB7QGxpbmsgI3N0YXRlYm90YXNzZXJ0cm91dGV8YXNzZXJ0Um91dGUoKX0gb3B0aW9ucy5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IGFzc2VydFJvdXRlT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFtkZXNjcmlwdGlvbl1cbiAqICBEZXNjcmliZSB0aGUgc3VjY2Vzcy1jb25kaXRpb24gZm9yIHRoaXMgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtmcm9tU3RhdGU9XCJcIl1cbiAqICBXYWl0IGZvciB0aGUgbWFjaGluZSB0byBiZSBpbiB0aGlzIHN0YXRlIGJlZm9yZSBhc3NlcnRpb24gYmVnaW5zLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW3J1bl1cbiAqICBSdW4gdGhpcyBmdW5jdGlvbiBqdXN0IGJlZm9yZSBzdGFydGluZyB0aGUgYXNzZXJ0aW9uLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtwZXJtaXR0ZWREZXZpYXRpb25zPTBdXG4gKiAgSWYgd2UgaGl0IGFuIHVuZXhwZWN0ZWQgc3RhdGUgZHVyaW5nIGFzc2VydGlvbiwgdGhpcyBpcyBhIFwiZGV2aWF0aW9uXCIuXG4gKiAgSXQgbWlnaHQgYmUgdGhhdCB0aGUgRlNNIHdpbGwgY29tZSBiYWNrIHRvIHRoZSBleHBlY3RlZCBzdGF0ZSBhZ2FpblxuICogIGFmdGVyIGEgY2VydGFpbiBudW1iZXIgb2YgdGhlc2UuIEZvciBleGFtcGxlLCBpZiB5b3VyIEZTTSBoYXMgYVxuICogIFwicmV0cnlcIiByb3V0ZSBjb25maWd1cmVkLCB0aGlzIG51bWJlciBjYW4gYWNjb3VudCBmb3IgaXQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3RpbWVvdXRJbk1zPTEwMDBdXG4gKiAgUGVybWl0dGVkIGxlbmd0aCBvZiB0aW1lIGZvciB0aGUgZW50aXJlIGFzc2VydGlvbiwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IFtsb2dMZXZlbD0zXVxuICogIE5vcm1hbGx5IHdlIHdhbnQgbG9ncyBmb3IgYXNzZXJ0aW9ucywgcmlnaHQ/IFdlbGwsIHlvdSBjYW4gdHVuZVxuICogIHRoZW0ganVzdCBsaWtlIHlvdSBjYW4gd2l0aCB7QGxpbmsgI3N0YXRlYm90b3B0aW9uc3xzdGF0ZWJvdE9wdGlvbnN9LlxuICovXG5cbmZ1bmN0aW9uIGFzc2VydFJvdXRlIChtYWNoaW5lLCBleHBlY3RlZFJvdXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignYXNzZXJ0Um91dGUnLFxuICAgIHsgbWFjaGluZTogaXNTdGF0ZWJvdCwgZXhwZWN0ZWRSb3V0ZTogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICBtYWNoaW5lLCBleHBlY3RlZFJvdXRlXG4gIClcbiAgaWYgKGVycikge1xuICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gIH1cblxuICBhc3NlcnRpb25JZCArPSAxXG5cbiAgY29uc3Qge1xuICAgIGRlc2NyaXB0aW9uID0gJ0Fzc2VydGlvbiBjb21wbGV0ZScsXG4gICAgZnJvbVN0YXRlID0gJycsXG4gICAgcnVuID0gKCkgPT4ge30sXG4gICAgcGVybWl0dGVkRGV2aWF0aW9ucyA9IDAsXG4gICAgdGltZW91dEluTXMgPSAxMDAwLFxuICAgIGxvZ0xldmVsID0gM1xuICB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbnN0IGNvbnNvbGUgPSBMb2dnZXIobG9nTGV2ZWwpXG5cbiAgY29uc3QgcHJlZml4ID0gYFN0YXRlYm90WyR7bWFjaGluZS5uYW1lKCl9XTogYUlkPCR7YXNzZXJ0aW9uSWR9PmBcbiAgY29uc3Qgcm91dGUgPSBkZWNvbXBvc2VSb3V0ZShleHBlY3RlZFJvdXRlKVxuXG4gIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06IEFzc2VydGluZyByb3V0ZTogWyR7cm91dGUuam9pbignID4gJyl9XWApXG4gIGNvbnNvbGUubG9nKGAke3ByZWZpeH06ID4gQXNzZXJ0aW9uIHdpbGwgc3RhcnQgZnJvbSBzdGF0ZTogXCIke2Zyb21TdGF0ZX1cImApXG5cbiAgY29uc3QgZnJvbVN0YXRlQWN0aW9uRm4gPSBEZWZlcihydW4pXG4gIGxldCByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbiA9ICgpID0+IHsgfVxuXG4gIGNvbnN0IHRvdGFsVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgbGV0IGFzc2VydGlvblRpbWVvdXRUaW1lclxuICBsZXQgZGV2aWF0aW9ucyA9IDBcbiAgbGV0IHBlbmRpbmcgPSB0cnVlXG4gIGxldCB1bmV4cGVjdGVkID0gZmFsc2VcblxuICBjb25zdCBjb25zdW1lUm91dGUgPSBbLi4ucm91dGVdXG4gIGNvbnN0IHJlcG9ydCA9IFRhYmxlKFxuICAgIFsnc3RhdGUnLCAnZXhwZWN0ZWQnLCAnaW5mbycsICd0b29rJ10sXG4gICAgWydjZW50ZXInLCAnY2VudGVyJywgJ2xlZnQnLCAncmlnaHQnXVxuICApXG5cbiAgY29uc3QgZmluYWxpc2VSZXBvcnQgPSBPbmNlKGVyciA9PiB7XG4gICAgYWRkUm93KCcnLCAnJywgJycsICdUT1RBTDogJyArIHRvdGFsVGltZVRha2VuKCkpXG4gICAgcmVwb3J0LmxvY2soKVxuICAgIGNvbnNvbGUubG9nKGBcXG4ke3ByZWZpeH06ICR7ZGVzY3JpcHRpb259OiBbJHtlcnIgPyAnRkFJTEVEJyA6ICdTVUNDRVNTJ31dYClcbiAgICBjb25zb2xlLnRhYmxlKHJlcG9ydC5jb250ZW50KCkpXG4gICAgcmV0dXJuIGVyclxuICB9KVxuXG4gIGNvbnN0IHsgYWRkUm93IH0gPSByZXBvcnRcbiAgZnVuY3Rpb24gZW50ZXJlZFN0YXRlIChzdGF0ZSkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICBhZGRSb3coc3RhdGUsICctJywgJ1BFTkRJTkcnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gY29uc3VtZVJvdXRlWzBdXG4gICAgICBpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gc3RhdGUpIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCB1bmV4cGVjdGVkID8gJ1JFQUxJR05FRCcgOiAnT0tBWScsIHN0YXRlVGltZVRha2VuKCkpXG4gICAgICAgIHVuZXhwZWN0ZWQgPSBmYWxzZVxuICAgICAgICBjb25zdW1lUm91dGUuc2hpZnQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkUm93KHN0YXRlLCBleHBlY3RlZFN0YXRlLCAnV1JPTkcgU1RBVEUnLCBzdGF0ZVRpbWVUYWtlbigpKVxuICAgICAgICB1bmV4cGVjdGVkID0gdHJ1ZVxuICAgICAgICBkZXZpYXRpb25zICs9IDFcbiAgICAgIH1cbiAgICAgIHN0YXRlVGltZVRha2VuID0gVGltZVRha2VuKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChjb25zdW1lUm91dGUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKCdOTyBST1VURSBUTyBURVNUJykpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVzb2x2ZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoYXNzZXJ0aW9uVGltZW91dFRpbWVyKVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgcmVtb3ZlT25Td2l0Y2hpbmdMaXN0ZW5lcigpXG4gICAgICByZXNvbHZlKC4uLmFyZ3MpXG4gICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lb3V0QW5kUmVqZWN0ID0gZXJyID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChhc3NlcnRpb25UaW1lb3V0VGltZXIpXG4gICAgICByZW1vdmVGcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgICByZW1vdmVPblN3aXRjaGluZ0xpc3RlbmVyKClcbiAgICAgIHJlamVjdChlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgYmFpbG91dCA9IG1lc3NhZ2UgPT4ge1xuICAgICAgd2hpbGUgKGNvbnN1bWVSb3V0ZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IGNvbnN1bWVSb3V0ZS5zaGlmdCgpXG4gICAgICAgIGFkZFJvdyhtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpLCBgKCR7ZXhwZWN0ZWRTdGF0ZX0pYCwgbWVzc2FnZSlcbiAgICAgICAgdW5leHBlY3RlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBjbGVhclRpbWVvdXRBbmRSZWplY3QoZmluYWxpc2VSZXBvcnQobmV3IEVycm9yKG1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBpZiAobWFjaGluZS5pblN0YXRlKGZyb21TdGF0ZSkpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZVxuICAgICAgcmVtb3ZlRnJvbVN0YXRlQWN0aW9uRm4gPSBmcm9tU3RhdGVBY3Rpb25GbigpXG4gICAgfVxuXG4gICAgY29uc3QgeyByZXZva2UsIGZuIH0gPSBSZXZva2FibGUoc3RhdGUgPT4ge1xuICAgICAgYXNzZXJ0aW9uVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RJTUVPVVQnKVxuICAgICAgfSwgdGltZW91dEluTXMpXG5cbiAgICAgIGVudGVyZWRTdGF0ZShzdGF0ZSlcbiAgICAgIGlmIChwZW5kaW5nICYmIHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgcGVuZGluZyA9IGZhbHNlXG4gICAgICAgIHJlbW92ZUZyb21TdGF0ZUFjdGlvbkZuID0gZnJvbVN0YXRlQWN0aW9uRm4oKVxuICAgICAgfVxuICAgICAgaWYgKGRldmlhdGlvbnMgPiBwZXJtaXR0ZWREZXZpYXRpb25zKSB7XG4gICAgICAgIHJldm9rZSgpXG4gICAgICAgIGJhaWxvdXQoJ1RPTyBNQU5ZIERFVklBVElPTlMnKVxuICAgICAgfVxuICAgICAgaWYgKGNvbnN1bWVSb3V0ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICByZXZva2UoKVxuICAgICAgICBjbGVhclRpbWVvdXRBbmRSZXNvbHZlKGZpbmFsaXNlUmVwb3J0KCkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbW92ZU9uU3dpdGNoaW5nTGlzdGVuZXIgPSBtYWNoaW5lLm9uU3dpdGNoaW5nKGZuKVxuICB9KVxufVxuXG5mdW5jdGlvbiBUYWJsZSAoY29sdW1ucyA9IFtdLCBhbGlnbm1lbnRzID0gW10pIHtcbiAgY29uc3QgdGFibGUgPSBbXVxuICBjb25zdCBhbGlnbm1lbnQgPSBjb2x1bW5zLm1hcCgoXywgaW5kZXgpID0+IGFsaWdubWVudHNbaW5kZXhdIHx8ICdjZW50ZXInKVxuXG4gIGxldCBsb2NrZWQgPSBmYWxzZVxuICBmdW5jdGlvbiBsb2NrICgpIHtcbiAgICBsb2NrZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSb3cgKC4uLmFyZ3MpIHtcbiAgICBpZiAobG9ja2VkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgb2JqID0gY29sdW1ucy5yZWR1Y2UoKGFjYywgY29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gYXJnc1tpbmRleF0gfHwgJydcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IHJvd1xuICAgICAgfVxuICAgIH0sIHt9KVxuICAgIHRhYmxlLnB1c2gob2JqKVxuICB9XG5cbiAgZnVuY3Rpb24gY29sU2l6ZXMgKCkge1xuICAgIHJldHVybiB0YWJsZS5yZWR1Y2UoKGFjYywgcm93KSA9PiBjb2x1bW5zLm1hcCgoY29sLCBpbmRleCkgPT4gTWF0aC5tYXgocm93W2NvbF0ubGVuZ3RoLCBhY2NbaW5kZXhdKSksIGNvbHVtbnMubWFwKCgpID0+IDApKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkTGVmdCAoc3RyLCBsZW4pIHtcbiAgICByZXR1cm4gc3RyICsgJyAnLnJlcGVhdChsZW4gLSBzdHIubGVuZ3RoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkUmlnaHQgKHN0ciwgbGVuKSB7XG4gICAgcmV0dXJuICcgJy5yZXBlYXQobGVuIC0gc3RyLmxlbmd0aCkgKyBzdHJcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHNpemVzID0gY29sU2l6ZXMoKVxuICAgIGZ1bmN0aW9uIGZvcm1hdEZpZWxkICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBzaXplc1tpbmRleF1cbiAgICAgIGNvbnN0IGFsaWduID0gYWxpZ25tZW50W2luZGV4XVxuICAgICAgaWYgKGFsaWduID09PSAnbGVmdCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZExlZnQodmFsdWUsIHNpemUpXG4gICAgICB9XG4gICAgICBpZiAoYWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgcmV0dXJuIHBhZFJpZ2h0KHZhbHVlLCBzaXplKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIGNvbnN0IG91dHB1dCA9IHRhYmxlLnJlZHVjZSgoYWNjLCByb3cpID0+IHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFJvdyA9IGNvbHVtbnMucmVkdWNlKChhY2MsIGNvbCwgaW5kZXgpID0+ICh7XG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgW2NvbF06IGZvcm1hdEZpZWxkKHJvd1tjb2xdLCBpbmRleClcbiAgICAgIH0pLCB7fSlcbiAgICAgIHJldHVybiBbLi4uYWNjLCBmb3JtYXR0ZWRSb3ddXG4gICAgfSwgW10pXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2NrOiBsb2NrLFxuICAgIGFkZFJvdzogYWRkUm93LFxuICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBUaW1lVGFrZW4gKCkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cbiAgZnVuY3Rpb24gZm10IChudW0sIGRpZ2l0cykge1xuICAgIHJldHVybiBudW0udG9GaXhlZChkaWdpdHMpLnJlcGxhY2UoL1xcLjArJC8sICcnKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydFRpbWVcblxuICAgIGlmIChkdXJhdGlvbiA8IDUwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbil9IG1zYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA1MDAwKSB7XG4gICAgICByZXR1cm4gYCR7Zm10KGR1cmF0aW9uIC8gMTAwMCwgMil9IHMgYFxuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPCA2MDAwMCkge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAsIDEpfSBzIGBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke2ZtdChkdXJhdGlvbiAvIDEwMDAgLyA2MCwgMSl9IG0gYFxuICAgIH1cbiAgfVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRVhQT1JUU1xuLy9cblxuY29uc3QgeyBTdGF0ZWJvdCwgaXNTdGF0ZWJvdCB9ID0gcmVxdWlyZSgnLi9zdGF0ZWJvdCcpXG5jb25zdCB7IGFzc2VydFJvdXRlLCByb3V0ZUlzUG9zc2libGUgfSA9IHJlcXVpcmUoJy4vYXNzZXJ0aW9ucycpXG5jb25zdCB7IGRlY29tcG9zZUNoYXJ0IH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuXG4vKipcbiAqIDxpbWcgc3JjPVwiLi9sb2dvLWZ1bGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDI1NXB4OyBtYXJnaW46IDEwcHggMDtcIiAvPlxuICpcbiAqIFdyaXRlIG1vcmUgcm9idXN0IGFuZCB1bmRlcnN0YW5kYWJsZSBwcm9ncmFtcy5cbiAqXG4gKiBTdGF0ZWJvdCBob3BlcyB0byBtYWtlIFtGaW5pdGUgU3RhdGUgTWFjaGluZXNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpbml0ZS1zdGF0ZV9tYWNoaW5lKSAoRlNNcykgYSBsaXR0bGUgbW9yZSBhY2Nlc3NpYmxlLlxuICpcbiAqIFlvdSdyZSByZWFkaW5nIHRoZSBkb2N1bWVudGF0aW9uLiBPdGhlciBleGl0cyBhcmU6XG4gKlxuICogLSBUaGUgW1JFQURNRSBmaWxlXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyL3N0YXRlYm90L2Jsb2IvbWFzdGVyL1JFQURNRS5tZClcbiAqIC0gVGhlIFtHaXRodWIgUmVwb10oaHR0cHM6Ly9naXRodWIuY29tL3NodWNrc3Rlci9zdGF0ZWJvdClcbiAqIC0gVGhlIHNoZWxsLXNjcmlwdCB2ZXJzaW9uLCBbU3RhdGVib3Qtc2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9zaHVja3N0ZXIvc3RhdGVib3Qtc2gpXG4gKlxuICogU3RhdGVib3Qgd2FzIHdyaXR0ZW4gYnkgW0NvbmFuIFRoZW9iYWxkXShodHRwczovL2dpdGh1Yi5jb20vc2h1Y2tzdGVyLykgYW5kXG4gKiBpcyBbSVNDIGxpY2Vuc2VkXSguLi9MSUNFTlNFKS5cbiAqXG4gKiAjIyMgSnVtcCByaWdodCBpblxuICpcbiAqIFlvdSBjYW4gaW5zdGFsbCBTdGF0ZWJvdCBpbnRvIHlvdXIgYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBzaFxuICogbnBtIGkgc3RhdGVib3RcbiAqIGBgYFxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgc3RhdGVib3QgZnJvbSAnc3RhdGVib3QnXG4gKiBgYGBcbiAqXG4gKiBPciBub24tYG5wbWAgcHJvamVjdDpcbiAqXG4gKiBgYGBqc1xuICogPHNjcmlwdCBzcmM9XCJodHRwczovL3VucGtnLmNvbS9zdGF0ZWJvdEAyLjAuMC9kaXN0L3N0YXRlYm90Lm1pbi5icm93c2VyLmpzXCI+PC9zY3JpcHQ+XG4gKiBgYGBcbiAqXG4gKiBgYGBqc1xuICogY29uc3QgeyBTdGF0ZWJvdCB9ID0gc3RhdGVib3RcbiAqIC8vIE1ha2UgbWFjaGluZXMgd2l0aCBTdGF0ZWJvdCgpXG4gKlxuICogY29uc3QgeyBpc1N0YXRlYm90LCByb3V0ZUlzUG9zc2libGUsIGFzc2VydFJvdXRlIH0gPSBzdGF0ZWJvdFxuICogLy8gVGhlc2UgYXJlIGFzc2VydGlvbiBoZWxwZXJzIHlvdSBjYW4gdXNlIGZvciB0ZXN0aW5nXG4gKiBgYGBcbiAqXG4gKiAjIyMgT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgOilcbiAqXG4gKiBJJ3ZlIGluY2x1ZGVkIFN0YXRlYm90IGluIHRoaXMgcGFnZS4gT3BlbiB0aGUgZGV2ZWxvcGVyLWNvbnNvbGUgdG9cbiAqIGZvbGxvdyBhbG9uZyB3aXRoIHRoZSBleGFtcGxlcyBiZWxvdzpcbiAqXG4gKiBgYGBqc1xuICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgncHJvbWlzZS1saWtlJywge1xuICogICBjaGFydDogYFxuICogICAgIC8vIFRoaXMgb25lIHdpbGwgYmVoYXZlIGEgYml0IGxpa2UgYSBQcm9taXNlXG4gKiAgICAgaWRsZSAtPiBwZW5kaW5nIC0+XG4gKiAgICAgICByZXNvbHZlZCB8IHJlamVjdGVkXG4gKlxuICogICAgIC8vIC4uLmFuZCB3ZSdyZSBkb25lXG4gKiAgICAgcmVzb2x2ZWQgLT4gZG9uZVxuICogICAgIHJlamVjdGVkIC0+IGRvbmVcbiAqICAgYCxcbiAqICAgc3RhcnRJbjogJ2lkbGUnXG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKCdwZW5kaW5nJylcbiAqIC8vIHRydWVcbiAqXG4gKiBtYWNoaW5lLmVudGVyKCdwZW5kaW5nJylcbiAqIG1hY2hpbmUuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKVxuICogLy8gW1wicmVzb2x2ZWRcIiwgXCJyZWplY3RlZFwiXVxuICogYGBgXG4gKlxuICogV2UgY2FuIGhvb2stdXAgZXZlbnRzIHdpdGgge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9ucyAucGVyZm9ybVRyYW5zaXRpb25zKCl9OlxuICpcbiAqIGBgYGpzXG4gKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gKiAgJ3BlbmRpbmcgLT4gcmVzb2x2ZWQnOiB7XG4gKiAgICBvbjogJ2RhdGEtbG9hZGVkJ1xuICogIH0sXG4gKiAgJ3BlbmRpbmcgLT4gcmVqZWN0ZWQnOiB7XG4gKiAgICBvbjogWyd0aW1lb3V0JywgJ2RhdGEtZXJyb3InXSxcbiAqICAgIHRoZW46IChtc2cpID0+IHtcbiAqICAgICAgY29uc29sZS53YXJuKCdVaCBvaC4uLicsIG1zZylcbiAqICAgIH1cbiAqICB9LFxuICogICdyZXNvbHZlZCB8IHJlamVjdGVkIC0+IGRvbmUnOiB7XG4gKiAgICBvbjogJ3RoYXRzLWFsbC1mb2xrcydcbiAqICB9XG4gKiB9KVxuICpcbiAqIG1hY2hpbmUuZW1pdCgnZGF0YS1lcnJvcicsICdEaWQgeW91IGhlYXIgdGhhdD8nKVxuICogYGBgXG4gKlxuICogSGVyZSdzIHRoZSBBUEk6XG4gKlxuICogfCBIaXRjaGVycyB8IFN0YXR1cyB8IEFjdGlvbnMgfFxuICogfC18LXwtfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtcGVyZm9ybXRyYW5zaXRpb25zIC5wZXJmb3JtVHJhbnNpdGlvbnMoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25ldmVudCAub25FdmVudCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21jYW50cmFuc2l0aW9udG8gLmNhblRyYW5zaXRpb25UbygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21zdGF0ZXNhdmFpbGFibGVmcm9taGVyZSAuc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfSAvIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9udHJhbnNpdGlvbnMgLm9uVHJhbnNpdGlvbnMoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlIC5jdXJyZW50U3RhdGUoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtcHJldmlvdXNzdGF0ZSAucHJldmlvdXNTdGF0ZSgpfSAvIHtAbGluayAjc3RhdGVib3Rmc21oaXN0b3J5IC5oaXN0b3J5KCl9IHwge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSAvIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0gfFxuICogfCB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvIHtAbGluayAjc3RhdGVib3Rmc21vbmVudGVyZWQgLm9uRW50ZXJlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlIC5pblN0YXRlKCl9IC8ge0BsaW5rICNpbnN0YXRlLXN0YXRlLW91dHB1dHdoZW50cnVlLTEgLkluU3RhdGUoKX0gfCB7QGxpbmsgI3N0YXRlYm90ZnNtcmVzZXQgLnJlc2V0KCl9IHxcbiAqIHwge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGluZyAub25FeGl0aW5nKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSB8IHtAbGluayAjc3RhdGVib3Rmc21pbmZvIC5pbmZvKCl9IC8ge0BsaW5rICNzdGF0ZWJvdGZzbWluc3BlY3QgLmluc3BlY3QoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtbmFtZSAubmFtZSgpfSB8ICB8XG4gKiB8IHtAbGluayAjc3RhdGVib3Rmc21vbnN3aXRjaGluZyAub25Td2l0Y2hpbmcoKX0gLyB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSB8ICB8ICB8XG4gKlxuICogPGltZyBzcmM9XCIuL2xvZ28tc21hbGwucG5nXCIgc3R5bGU9XCJtYXgtd2lkdGg6IDc1cHg7IG1hcmdpbjogMTVweCAwIDAgNXB4O1wiIC8+XG4gKlxuICogQG1vZHVsZSBzdGF0ZWJvdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gYG9iamVjdGAuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGVtbWluZycsIHtcbiAgICogICBjaGFydDogYFxuICAgKiAgICAgd2Fsa2luZyAtPiAoZGlnZ2luZyB8IGJ1aWxkaW5nIHwgZmFsbGluZykgLT5cbiAgICogICAgICAgd2Fsa2luZ1xuICAgKlxuICAgKiAgICAgZmFsbGluZyAtPiBzcGxhdHRpbmdcbiAgICogICAgIHdhbGtpbmcgLT4gZXhpdGluZ1xuICAgKiAgIGBcbiAgICogfSlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogIEdpdmUgeW91ciBTdGF0ZWJvdCBhIG5hbWUuIFVzZWQgZm9yIGxvZ2dpbmcgYW5kIGJ5IHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAgICogQHBhcmFtIHtzdGF0ZWJvdE9wdGlvbnN9IG9wdGlvbnNcbiAgICogQHJldHVybnMge3N0YXRlYm90RnNtfVxuICAgKi9cbiAgU3RhdGVib3QsXG5cbiAgLyoqXG4gICAqIFRlc3RzIHRoYXQgYW4gb2JqZWN0IGlzIGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBzdGF0ZWJvdFxuICAgKiBAZnVuY3Rpb25cbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIGlzU3RhdGVib3QobWFjaGluZSlcbiAgICogLy8gdHJ1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gW29iamVjdF0gVGhlIG9iamVjdCB0byB0ZXN0LlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzU3RhdGVib3QsXG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGEgY2VydGFpbiByb3V0ZSBjYW4gYmUgZm9sbG93ZWQgYnkgYVxuICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtfHN0YXRlYm90RnNtfS5cbiAgICpcbiAgICogVGhpcyBtZXJlbHkgdGVzdHMgdGhhdCBhIGNlcnRhaW4gcGF0aCBjYW4gYmUgdGFrZW4gdGhyb3VnaCBhXG4gICAqIHN0YXRlLW1hY2hpbmUuIEl0IGRvZXNuJ3QgYXNzZXJ0IHRoYXQgdGhlIHN0YXRlcyBhcmUgbW92ZWQtdGhyb3VnaFxuICAgKiB3aGlsZSB0aGUgbWFjaGluZSBpcyB3b3JraW5nLCBhcyB3aXRoXG4gICAqIHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfS5cbiAgICpcbiAgICogQG1lbWJlcm9mIHN0YXRlYm90XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gICAqICBUaGUgbWFjaGluZSB0byB0ZXN0IHRoZSByb3V0ZSBvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHJvdXRlXG4gICAqICBUaGUgcm91dGUgdG8gdGVzdCBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICAgKlxuICAgKiAgYFxuICAgKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAgICogIGBcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoLi4uKVxuICAgKlxuICAgKiByb3V0ZUlzUG9zc2libGUobWFjaGluZSxcbiAgICogICAnd2Fsa2luZyAtPiBmYWxsaW5nIC0+IHNwbGF0dGluZyAtPiB3YWxraW5nJ1xuICAgKiApXG4gICAqIC8vIGZhbHNlXG4gICAqL1xuICByb3V0ZUlzUG9zc2libGUsXG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IGEge0BsaW5rICNzdGF0ZWJvdGZzbXxzdGF0ZWJvdEZzbX0gdHJhY2VkIHRoZSByb3V0ZSBzcGVjaWZpZWQuXG4gICAqXG4gICAqIFdoZXJlYXMge0BsaW5rICNzdGF0ZWJvdHJvdXRlaXNwb3NzaWJsZXxyb3V0ZUlzUG9zc2libGUoKX0gb25seSBjaGVja3NcbiAgICogdGhhdCBhIHBhcnRpY3VsYXIgcm91dGUgY2FuIGJlIGZvbGxvd2VkLCBgYXNzZXJ0Um91dGVgIHdpbGwgaG9vay1pbnRvXG4gICAqIGEgbWFjaGluZSBhbmQgd2FpdCBmb3IgaXQgdG8gdHJhY2UgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGhpbiBhXG4gICAqIHRpbWVvdXQgcGVyaW9kLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBhc3luY1xuICAgKiBAcGFyYW0ge3N0YXRlYm90RnNtfSBtYWNoaW5lXG4gICAqICBUaGUgbWFjaGluZSB0byBydW4gdGhlIGFzc2VydGlvbiBvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IGV4cGVjdGVkUm91dGVcbiAgICogIFRoZSBleHBlY3RlZCByb3V0ZSBhcyBhbiBhcnJvdy1kZWxpbWl0ZWQgc3RyaW5nOlxuICAgKlxuICAgKiAgYFxuICAgKiAgXCJpZGxlIC0+IHBlbmRpbmcgLT4gc3VjY2VzcyAtPiBkb25lXCJcbiAgICogIGBcbiAgICogQHBhcmFtIHthc3NlcnRSb3V0ZU9wdGlvbnN9IFtvcHRpb25zXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCguLi4pXG4gICAqXG4gICAqIGFzc2VydFJvdXRlKFxuICAgKiAgIG1hY2hpbmUsICdwcmVwYXJlIC0+IGRlYm91bmNlIC0+IHNlbmRpbmcgLT4gZG9uZSAtPiBpZGxlJyxcbiAgICogICB7XG4gICAqICAgICBkZXNjcmlwdGlvbjogJ0VtYWlsIHNlbnQgd2l0aCBubyBpc3N1ZXMnLFxuICAgKiAgICAgZnJvbVN0YXRlOiAnaWRsZScsXG4gICAqICAgICB0aW1lb3V0SW5NczogMTAwMCAqIDIwLFxuICAgKiAgICAgcGVybWl0dGVkRGV2aWF0aW9uczogMCxcbiAgICogICAgIGxvZ0xldmVsOiAzXG4gICAqICAgfVxuICAgKiApXG4gICAqIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdBc3NlcnRpb24gcGFzc2VkIScpKVxuICAgKiAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoYFdob29wczogJHtlcnJ9YCkpXG4gICAqXG4gICAqIG1hY2hpbmUuZW50ZXIoJ2lkbGUnKVxuICAgKi9cbiAgYXNzZXJ0Um91dGUsXG5cbiAgLyoqXG4gICAqIERlY29tcG9zZSBhIHtAbGluayBzdGF0ZWJvdENoYXJ0fSBpbnRvIGFuIG9iamVjdCBvZiBgc3RhdGVzYCwgYHJvdXRlc2AsXG4gICAqIGFuZCBgdHJhbnNpdGlvbnNgLlxuICAgKlxuICAgKiBTdGF0ZWJvdCgpIHVzZXMgdGhpcyBpbnRlcm5hbGx5IHRvIHBhcnNlIGNoYXJ0cy4gRXhwb3NlZCBmb3IgZGVidWdnaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RhdGVib3RDaGFydH0gY2hhcnRcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogdmFyIHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydGBcbiAgICogICBwZW5kaW5nIC0+XG4gICAqICAgICBzdWNjZXNzIHwgZmFpbHVyZVxuICAgKiBgXG4gICAqIC8vIHN0YXRlcyA9IFsncGVuZGluZycsICdzdWNjZXNzJywgJ2ZhaWx1cmUnXVxuICAgKiAvLyByb3V0ZXMgPSBbICdwZW5kaW5nLT5zdWNjZXNzJywgJ3BlbmRpbmctPmZhaWx1cmUnXVxuICAgKiAvLyB0cmFuc2l0aW9ucyA9IFtcbiAgICogLy8gICBbJ3BlbmRpbmcnLCAnc3VjY2VzcyddLFxuICAgKiAvLyAgIFsncGVuZGluZycsICdmYWlsdXJlJ11cbiAgICogLy8gXVxuICAgKi9cbiAgZGVjb21wb3NlQ2hhcnRcbn1cbiIsIlxuLy9cbi8vIFNUQVRFQk9UIENIQVJUL1JPVVRFIFBBUlNJTkdcbi8vXG5cbmNvbnN0IGN4UGlwZSA9ICd8J1xuY29uc3QgY3hBcnJvdyA9ICctPidcblxuY29uc3QgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyA9IC9bXmEtejAtOSFAIyQlXiYqOl8rPTw+fH4uXFx4MkRdL2dpXG5jb25zdCByeENSTEYgPSAvW1xcclxcbl0vXG5jb25zdCByeENvbW1lbnQgPSAvKFxcL1xcL1teXFxuXFxyXSopL1xuXG5jb25zdCByeE9wZXJhdG9ycyA9IFtjeFBpcGUsIGN4QXJyb3ddXG4gIC5tYXAocnhVbnNhZmUgPT4gcnhVbnNhZmUucmVwbGFjZSgnfCcsICdcXFxcfCcpKVxuICAuam9pbignfCcpXG5cbmNvbnN0IHJ4TGluZUNvbnRpbmF0aW9ucyA9IG5ldyBSZWdFeHAoYCgke3J4T3BlcmF0b3JzfSkkYClcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGN4UGlwZSxcbiAgY3hBcnJvdyxcbiAgcnhEaXNhbGxvd2VkQ2hhcmFjdGVycyxcbiAgZGVjb21wb3NlQ2hhcnQsXG4gIGRlY29tcG9zZVJvdXRlXG59XG5cbmNvbnN0IHsgdW5pcSwgQXJnVHlwZUVycm9yLCBpc1RlbXBsYXRlTGl0ZXJhbCB9ID0gcmVxdWlyZSgnLi91dGlscycpXG5cbmNvbnN0IGFyZ1R5cGVFcnJvciA9IEFyZ1R5cGVFcnJvcignc3RhdGVib3QuJylcblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGUgKHRlbXBsYXRlTGl0ZXJhbCkge1xuICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ2RlY29tcG9zZVJvdXRlJyxcbiAgICB7IHRlbXBsYXRlTGl0ZXJhbDogaXNUZW1wbGF0ZUxpdGVyYWwgfSxcbiAgICB0ZW1wbGF0ZUxpdGVyYWxcbiAgKVxuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgfVxuXG4gIGNvbnN0IHJhd0xpbmVzID0gW3RlbXBsYXRlTGl0ZXJhbF0uZmxhdCgpXG4gIGNvbnN0IGNvZGVPbmx5ID0gcmVtb3ZlQ29tbWVudHMocmF3TGluZXMpXG4gIGNvbnN0IGxpbmVzID0gY29uZGVuc2VMaW5lcyhjb2RlT25seSlcbiAgY29uc3QgZmxhdHRlbmVkUm91dGUgPSBzYW5pdGlzZUxpbmVzKGxpbmVzKS5mbGF0KDIpXG4gIHJldHVybiBmbGF0dGVuZWRSb3V0ZVxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VDaGFydCAodGVtcGxhdGVMaXRlcmFsKSB7XG4gIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZGVjb21wb3NlQ2hhcnQnLFxuICAgIHsgdGVtcGxhdGVMaXRlcmFsOiBpc1RlbXBsYXRlTGl0ZXJhbCB9LFxuICAgIHRlbXBsYXRlTGl0ZXJhbFxuICApXG4gIGlmIChlcnIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICB9XG5cbiAgY29uc3QgcmF3TGluZXMgPSBbdGVtcGxhdGVMaXRlcmFsXS5mbGF0KClcbiAgY29uc3QgY29kZU9ubHkgPSByZW1vdmVDb21tZW50cyhyYXdMaW5lcylcbiAgY29uc3QgbGluZXMgPSBjb25kZW5zZUxpbmVzKGNvZGVPbmx5KVxuICBjb25zdCBsaW5lc1RvUHJvY2VzcyA9IHNhbml0aXNlTGluZXMobGluZXMpXG4gIGNvbnN0IGxpbmVzT2ZSb3V0ZXMgPSBsaW5lc1RvUHJvY2Vzc1xuICAgIC5tYXAoZGVjb21wb3NlTGluZUludG9Sb3V0ZSlcbiAgICAuZmxhdCgxKVxuICBjb25zdCBsaW5lc09mVHJhbnNpdGlvbnMgPSBsaW5lc09mUm91dGVzXG4gICAgLm1hcChkZWNvbXBvc2VSb3V0ZUludG9UcmFuc2l0aW9uKVxuICAgIC5mbGF0KDEpXG4gIGNvbnN0IHN0YXRlcyA9IFtdXG4gIGNvbnN0IHJvdXRlS2V5cyA9IGxpbmVzT2ZUcmFuc2l0aW9ucy5tYXAocm91dGUgPT4ge1xuICAgIHN0YXRlcy5wdXNoKC4uLnJvdXRlKVxuICAgIHJldHVybiByb3V0ZS5qb2luKGN4QXJyb3cpXG4gIH0pXG4gIGNvbnN0IGZpbHRlcmVkUm91dGVzID0gdW5pcShyb3V0ZUtleXMpXG4gIGNvbnN0IGZpbHRlcmVkU3RhdGVzID0gdW5pcShzdGF0ZXMpXG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvbnM6IGZpbHRlcmVkUm91dGVzLm1hcChyb3V0ZSA9PiByb3V0ZS5zcGxpdChjeEFycm93KSksXG4gICAgcm91dGVzOiBmaWx0ZXJlZFJvdXRlcyxcbiAgICBzdGF0ZXM6IGZpbHRlcmVkU3RhdGVzXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ29tbWVudHMgKGFycmF5T2ZTdHJpbmdzKSB7XG4gIHJldHVybiBhcnJheU9mU3RyaW5nc1xuICAgIC5yZWR1Y2UoKGFjYywgc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICAuLi5zdHJpbmcuc3BsaXQocnhDUkxGKS5tYXAocGFydCA9PiBwYXJ0XG4gICAgICAgICAgLnJlcGxhY2UocnhDb21tZW50LCAnJykpXG4gICAgICBdXG4gICAgfSwgW10pXG4gICAgLmZpbHRlcihCb29sZWFuKVxufVxuXG5mdW5jdGlvbiBjb25kZW5zZUxpbmVzIChsaW5lcykge1xuICByZXR1cm4gbGluZXMucmVkdWNlKChhY2MsIGxpbmUpID0+IHJ4TGluZUNvbnRpbmF0aW9ucy50ZXN0KGxpbmUudHJpbSgpKVxuICAgID8ge1xuICAgICAgbGluZXM6IGFjYy5saW5lcyxcbiAgICAgIGN1cnJlbnRMaW5lOiBhY2MuY3VycmVudExpbmUgKyBsaW5lXG4gICAgfVxuICAgIDoge1xuICAgICAgbGluZXM6IFsuLi5hY2MubGluZXMsIGFjYy5jdXJyZW50TGluZSArIGxpbmVdLFxuICAgICAgY3VycmVudExpbmU6ICcnXG4gICAgfSwge1xuICAgIGxpbmVzOiBbXSxcbiAgICBjdXJyZW50TGluZTogJydcbiAgfSkubGluZXNcbn1cblxuZnVuY3Rpb24gc2FuaXRpc2VMaW5lcyAobGluZXMpIHtcbiAgcmV0dXJuIGxpbmVzLm1hcChsaW5lID0+IGxpbmUuc3BsaXQoY3hBcnJvdykubWFwKHN0ciA9PiBzdHJcbiAgICAucmVwbGFjZShyeERpc2FsbG93ZWRDaGFyYWN0ZXJzLCAnJylcbiAgICAuc3BsaXQoY3hQaXBlKVxuICAgIC5tYXAocGFydCA9PiBwYXJ0LnRyaW0oKSkpKVxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VMaW5lSW50b1JvdXRlIChsaW5lKSB7XG4gIHJldHVybiBsaW5lLnJlZHVjZSgoYWNjLCBzdGF0ZXMpID0+XG4gICAgYWNjID09PSBmYWxzZVxuICAgICAgPyB7XG4gICAgICAgIHByZXZpb3VzU3RhdGVzOiBbLi4uc3RhdGVzXSxcbiAgICAgICAgcGFpcnM6IFtdXG4gICAgICB9XG4gICAgICA6IHtcbiAgICAgICAgcHJldmlvdXNTdGF0ZXM6IFsuLi5zdGF0ZXNdLFxuICAgICAgICBwYWlyczogWy4uLmFjYy5wYWlycywgW1suLi5hY2MucHJldmlvdXNTdGF0ZXNdLCBbLi4uc3RhdGVzXV1dXG4gICAgICB9LCBmYWxzZSlcbiAgICAucGFpcnNcbn1cblxuZnVuY3Rpb24gZGVjb21wb3NlUm91dGVJbnRvVHJhbnNpdGlvbiAoW2Zyb21TdGF0ZXMsIHRvU3RhdGVzXSkge1xuICByZXR1cm4gZnJvbVN0YXRlcy5yZWR1Y2UoKGFjYywgZnJvbVN0YXRlKSA9PiBbXG4gICAgLi4uYWNjLFxuICAgIC4uLnRvU3RhdGVzLm1hcCh0b1N0YXRlID0+IHtcbiAgICAgIHJldHVybiBbZnJvbVN0YXRlLCB0b1N0YXRlXVxuICAgIH0pXG4gIF0sIFtdKVxufVxuIiwiXG4vL1xuLy8gU1RBVEVCT1QgRlNNXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU3RhdGVib3QsXG4gIGlzU3RhdGVib3Rcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIFN0YXRlYm90LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IHN0YXRlYm90T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdGF0ZWJvdENoYXJ0fSBjaGFydFxuICogIFRoZSBzdGF0ZS1jaGFydC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc3RhcnRJbj08YXV0bz5dXG4gKiAgVGhlIHN0YXRlIGluIHdoaWNoIHRvIHN0YXJ0LiBJZiB1bnNwZWNpZmllZCwgdGhlIGZpcnN0IHN0YXRlIGluIHRoZVxuICogIGNoYXJ0IHdpbGwgYmUgdXNlZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbG9nTGV2ZWw9M11cbiAqICBIb3cgbm9pc3kgdGhlIGxvZ2dpbmcgaXMsIGZyb20gMSB0byAzOlxuICogIGBgYFxuICogIDEpIGNvbnNvbGUud2FyblxuICogIDIpIGNvbnNvbGUud2Fybi9sb2cvdGFibGVcbiAqICAzKSBjb25zb2xlLndhcm4vbG9nL3RhYmxlL2luZm9cbiAqICBgYGBcbiAqICBgM2AgaXMgdGhlIGRlZmF1bHQuIEFyZ3VtZW50IHR5cGUtZXJyb3JzIHdpbGwgYWx3YXlzIGB0aHJvd2AuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2hpc3RvcnlMaW1pdD0yXVxuICogIExpbWl0IGhvdyBtdWNoIGhpc3RvcnkgdGhlIHN0YXRlLW1hY2hpbmUga2VlcHMuIEFjY2Vzc2VkIHZpYVxuICogIHtAbGluayAjc3RhdGVib3Rmc21oaXN0b3J5fHN0YXRlYm90RnNtI2hpc3RvcnkoKX0uXG4gKiBAcHJvcGVydHkge2V2ZW50c30gW2V2ZW50c11cbiAqICBJZiB5b3Ugd2lzaCB0byBoYXZlIHlvdXIgU3RhdGVib3RzIGxpc3RlbiB0byBldmVudHMgY29taW5nIGZyb21cbiAqICBhIHNoYXJlZCBFdmVudEVtaXR0ZXIsIHlvdSBjYW4gcGFzcyBpdCBpbiBoZXJlLiBUaGUgYGVtaXQoKWAvYG9uRXZlbnQoKWAvXG4gKiAgYHBlcmZvcm1UcmFuc2l0aW9ucygpYCBtZXRob2RzIHdpbGwgdXNlIGl0LlxuICpcbiAqICBJdCBzaG91bGQgaGF2ZSB0aGUgc2FtZSBzaWduYXR1cmUgYXMge0BsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2NsYXNzX2V2ZW50ZW1pdHRlcnxFdmVudEVtaXR0ZXJ9LlxuICovXG5cbi8qKlxuICogQSBkZXNjcmlwdGlvbiBvZiBhbGwgdGhlIHN0YXRlcyBpbiBhIG1hY2hpbmUsIHBsdXMgYWxsIG9mIHRoZVxuICogcGVybWl0dGVkIHRyYW5zaXRpb25zIGJldHdlZW4gdGhlbS5cbiAqXG4gKiBUaGlzIGlzIGRlZmluZWQgdXNpbmcgYSBgc3RyaW5nYCBvciBhbiBgYXJyYXlgIG9mIHN0cmluZ3MsIGJ1dFxuICogIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFsc3xUZW1wbGF0ZSBMaXRlcmFsc31cbiAqIGFyZSBtdWNoIG1vcmUgY29udmVuaWVudC5cbiAqXG4gKiBBbiBhcnJvdyBgLT5gIGNvbmZpZ3VyZXMgYSAqKnBlcm1pdHRlZCB0cmFuc2l0aW9uKiogYmV0d2VlbiB0d28gc3RhdGVzOlxuICpcbiAqIGBgYFxuICogZnJvbS1zdGF0ZSAtPiB0by1zdGF0ZVxuICogYGBgXG4gKlxuICogSXQncyB0aGUgb25seSBvcGVyYXRvciBuZWVkZWQgdG8gYnVpbGQgYW55IGNoYXJ0OlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZFxuICogICBwZW5kaW5nIC0+IHJlamVjdGVkXG4gKiAgIHJlc29sdmVkIC0+IGRvbmVcbiAqICAgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogVGhlIFwiT1JcIiBvcGVyYXRvciBgfGAgY2FuIGhlbHAgdXMgcmVtb3ZlIHNvbWUgcmVkdW5kYW5jeSBmcm9tIHRoZSBhYm92ZSBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiByZXNvbHZlZCB8IHJlamVjdGVkXG4gKiAgIHJlc29sdmVkIHwgcmVqZWN0ZWQgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogSW4gYm90aCBjaGFydHMsIGBwZW5kaW5nYCBjYW4gdHJhbnNpdGlvbiB0byBgcmVzb2x2ZWRgIG9yIGByZWplY3RlZGAsIGFuZFxuICogYHJlc29sdmVkYCBvciBgcmVqZWN0ZWRgIGNhbiBib3RoIHRyYW5zaXRpb24gdG8gYGRvbmVgLlxuICpcbiAqIFdlIGNhbiBzdHJlYW1saW5lIHRoaXMgZXZlbiBmdXJ0aGVyOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPiAocmVzb2x2ZWQgfCByZWplY3RlZCkgLT4gZG9uZVxuICogYFxuICogYGBgXG4gKlxuICogQWdhaW4sIHRoaXMgaXMgZXhhY3RseSBlcXVpdmFsZW50IHRvIHRoZSBwcmV2aW91cyB0d28gZXhhbXBsZXMuXG4gKlxuICogTm90aWNlIGluIHRoaXMgb25lIHRoYXQgd2UgaGF2ZSBwYXJlbnRoZXNlcyBgKGAgYClgIHN1cnJvdW5kaW5nIGByZXNvbHZlZGBcbiAqIGFuZCBgcmVqZWN0ZWRgLiBUaGV5IGFyZSBhY3R1YWxseSBjb21wbGV0ZWx5IGlnbm9yZWQgYnkgdGhlIHBhcnNlciwgYW5kXG4gKiB5b3UgY2FuIHVzZSB0aGVtIGFzIHlvdSBwbGVhc2UgdG8gaGVscCBtYWtlIHlvdXIgY2hhcnRzIG1vcmUgcmVhZGFibGUuXG4gKlxuICogQSBjaGFydCB3b3JrcyBleGFjdGx5IHRoZSBzYW1lIHdpdGhvdXQgdGhlbTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gcmVzb2x2ZWQgfCByZWplY3RlZCAtPiBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBDaGFydHMgY2FuIGFsc28gYmUgc3BsaXQgYWNyb3NzIG11bHRpcGxlLWxpbmVzOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcHJvbWlzZUxpa2VDaGFydCA9IGBcbiAqICAgcGVuZGluZyAtPlxuICogICByZXNvbHZlZCB8XG4gKiAgIHJlamVjdGVkIC0+XG4gKiAgIGRvbmVcbiAqIGBcbiAqIGBgYFxuICogTm90aWNlIHRoYXQgYWxsIHdoaXRlLXNwYWNlIGlzIGlnbm9yZWQgb24gZWl0aGVyIHNpZGUgb2YgdGhlIGAtPmBcbiAqIGFuZCBgfGAuXG4gKlxuICogYC8vIENvbW1lbnRzIG9mIHRoaXMga2luZCBhcmUgYWxsb3dlZCwgdG9vOmBcbiAqXG4gKiBgYGBqc1xuICogdmFyIHByb21pc2VMaWtlQ2hhcnQgPSBgXG4gKiAgIHBlbmRpbmcgLT4gLy8gV2hlcmUgZG8gd2UgZ28gZnJvbSBoZXJlP1xuICogICAgIChyZXNvbHZlZCB8IHJlamVjdGVkKSAtPiAvLyBBaCwgeWVzXG4gKlxuICogICAvLyBBbmQgbm93IHdlJ3JlIGFsbCBmaW5pc2hlZFxuICogICBkb25lXG4gKiBgXG4gKiBgYGBcbiAqXG4gKiBGaW5hbGx5LCBoZXJlJ3MgYSBtb3JlIGZ1bGwgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIGRyYWdEcm9wQ2hhcnQgPSBgXG4gKiAgIGlkbGUgLT5cbiAqICAgICBkcmFnLWRldGVjdCAtPlxuICogICAgICAgKGRyYWdnaW5nIHwgY2xpY2tlZClcbiAqXG4gKiAgIC8vIEp1c3QgYSBjbGljaywgYmFpbC1vdXQhXG4gKiAgIGNsaWNrZWQgLT4gaWRsZVxuICpcbiAqICAgLy8gRHJhZyBkZXRlY3RlZCFcbiAqICAgZHJhZ2dpbmcgLT5cbiAqICAgICBkcmFnLXdhaXQgLT4gZHJhZ2dlZCAtPiBkcmFnLXdhaXRcbiAqXG4gKiAgIC8vIERyYWcgZmluaXNoZWQuLi5cbiAqICAgKGRyYWctd2FpdCB8IGRyYWdnZWQpIC0+XG4gKiAgICAgKGRyYWctZG9uZSB8IGRyYWctY2FuY2VsKSAtPlxuICogICAgICAgaWRsZVxuICogYFxuICogYGBgXG4gKlxuICogQHR5cGVkZWYge3N0cmluZ3xzdHJpbmdbXX0gc3RhdGVib3RDaGFydFxuICovXG5cbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2V2ZW50c1xuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY29uc3Qge1xuICBpc1Bvam8sXG4gIEFyZ1R5cGVFcnJvcixcbiAgTG9nZ2VyLFxuICBpc0V2ZW50RW1pdHRlcixcbiAgUmVmZXJlbmNlQ291bnRlclxufSA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCB7IGRlY29tcG9zZUNoYXJ0LCBjeEFycm93IH0gPSByZXF1aXJlKCcuL3BhcnNpbmcnKVxuXG5mdW5jdGlvbiBTdGF0ZWJvdCAobmFtZSwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdcXG5TdGF0ZWJvdDogUGxlYXNlIHNwZWNpZnkgYSBuYW1lIGZvciB0aGlzIG1hY2hpbmUnKVxuICB9XG5cbiAgY29uc3QgbG9nUHJlZml4ID0gYFN0YXRlYm90WyR7bmFtZX1dYFxuICBpZiAoIWlzUG9qbyhvcHRpb25zKSkge1xuICAgIHRocm93IFR5cGVFcnJvcihgXFxuJHtsb2dQcmVmaXh9OiBQbGVhc2Ugc3BlY2lmeSBvcHRpb25zIGZvciB0aGlzIG1hY2hpbmVgKVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGNoYXJ0ID0gdW5kZWZpbmVkLFxuICAgIGxvZ0xldmVsID0gMyxcbiAgICBoaXN0b3J5TGltaXQgPSAyXG4gIH0gPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uc3QgYXJnVHlwZUVycm9yID0gQXJnVHlwZUVycm9yKGAke2xvZ1ByZWZpeH0jYClcbiAgY29uc3QgY29uc29sZSA9IExvZ2dlcihsb2dMZXZlbClcbiAgY29uc3QgeyBjYW5XYXJuIH0gPSBjb25zb2xlXG5cbiAgY29uc3Qge1xuICAgIHN0YXRlcyA9IFtdLFxuICAgIHJvdXRlcyA9IFtdXG4gIH0gPSBjaGFydCA/IGRlY29tcG9zZUNoYXJ0KGNoYXJ0KSA6IG9wdGlvbnNcblxuICBsZXQgeyBzdGFydEluIH0gPSBvcHRpb25zXG4gIGlmIChzdGFydEluID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydEluID0gc3RhdGVzWzBdXG4gIH1cblxuICBpZiAoIXN0YXRlcy5pbmNsdWRlcyhzdGFydEluKSkge1xuICAgIHRocm93IEVycm9yKGAke2xvZ1ByZWZpeH06IFN0YXJ0aW5nLXN0YXRlIG5vdCBpbiBjaGFydDogXCIke3N0YXJ0SW59XCJgKVxuICB9XG5cbiAgbGV0IHRyYW5zaXRpb25JZCA9IDBcbiAgY29uc3Qgc3RhdGVIaXN0b3J5ID0gW3N0YXJ0SW5dXG4gIGNvbnN0IHN0YXRlSGlzdG9yeUxpbWl0ID0gTWF0aC5tYXgoaGlzdG9yeUxpbWl0LCAyKVxuICBjb25zdCBldmVudHMgPSBpc0V2ZW50RW1pdHRlcihvcHRpb25zLmV2ZW50cykgPyBvcHRpb25zLmV2ZW50cyA6IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIGNvbnN0IGludGVybmFsRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIGNvbnN0IElOVEVSTkFMX0VWRU5UUyA9IHtcbiAgICBTVEFURV9DSEFOR0lORzogJyhBTlkpc3RhdGU6Y2hhbmdpbmcnLFxuICAgIFNUQVRFX0NIQU5HRUQ6ICcoQU5ZKXN0YXRlOmNoYW5nZWQnXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0SW50ZXJuYWxFdmVudCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbWl0SW50ZXJuYWxFdmVudCcsIHsgZXZlbnROYW1lOiAnc3RyaW5nJyB9LCBldmVudE5hbWUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJuYWxFdmVudHMuZW1pdChldmVudE5hbWUsIC4uLmFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBvbkludGVybmFsRXZlbnQgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uSW50ZXJuYWxFdmVudCcsIHsgZXZlbnROYW1lOiAnc3RyaW5nJywgZm46ICdmdW5jdGlvbicgfSwgZXZlbnROYW1lLCBmbilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGludGVybmFsRXZlbnRzLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZm4pXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGludGVybmFsRXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgZm4pXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RhdGVzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAnc3RhdGVzJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHN0YXRlLWNoYW5nZXMnLFxuICAgIFsuLi5zdGF0ZXNdXG4gIClcbiAgY29uc3Qgcm91dGVzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAndHJhbnNpdGlvbnMnLFxuICAgICdMaXN0ZW5pbmcgZm9yIHRoZSBmb2xsb3dpbmcgdHJhbnNpdGlvbnMnLFxuICAgIFsuLi5yb3V0ZXNdXG4gIClcbiAgY29uc3QgZXZlbnRzSGFuZGxlZCA9IFJlZmVyZW5jZUNvdW50ZXIoXG4gICAgbmFtZSxcbiAgICAnZXZlbnRzJyxcbiAgICAnTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIGV2ZW50cydcbiAgKVxuXG4gIC8vIEludGVycHJldHMgb25UcmFuc2l0aW9ucygpIGFuZCBwZXJmb3JtVHJhbnNpdGlvbnMoKVxuICBmdW5jdGlvbiBhcHBseUhpdGNoZXIgKGhpdGNoZXIsIGZuTmFtZSkge1xuICAgIGNvbnN0IGhpdGNoZXJBY3Rpb25zID1cbiAgICAgIHR5cGVvZiBoaXRjaGVyID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gaGl0Y2hlcih7IGVudGVyLCBlbWl0LCBFbnRlciwgRW1pdCB9KVxuICAgICAgICA6IGlzUG9qbyhoaXRjaGVyKVxuICAgICAgICAgID8gaGl0Y2hlclxuICAgICAgICAgIDogbnVsbFxuXG4gICAgaWYgKCFpc1Bvam8oaGl0Y2hlckFjdGlvbnMpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIGBTdGF0ZWJvdFske25hbWV9XSMke2ZuTmFtZX0oKTogRXhwZWN0ZWQgYW4gb2JqZWN0LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3RgXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnRzID0ge31cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IFtdXG5cbiAgICBPYmplY3QuZW50cmllcyhoaXRjaGVyQWN0aW9ucylcbiAgICAgIC5mb3JFYWNoKChbcm91dGVDaGFydCwgYWN0aW9uT3JDb25maWddKSA9PiB7XG4gICAgICAgIC8vIG9uVHJhbnNpdGlvbnMgMS8zLi4uXG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uT3JDb25maWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBhY3Rpb25PckNvbmZpZyB9KVxuICAgICAgICB9IGVsc2UgaWYgKCFpc1Bvam8oYWN0aW9uT3JDb25maWcpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtVHJhbnNpdGlvbnMgMS8zLi4uXG4gICAgICAgIGNvbnN0IHsgb246IF9vbiwgdGhlbjogX3RoZW4gfSA9IGFjdGlvbk9yQ29uZmlnXG4gICAgICAgIGlmICh0eXBlb2YgX29uID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KF9vbikpIHtcbiAgICAgICAgICBjb25zdCBldmVudE5hbWVzID0gW19vbl0uZmxhdCgpXG4gICAgICAgICAgZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdXG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKHsgcm91dGVDaGFydCwgYWN0aW9uOiBfdGhlbiB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgLy8gb25UcmFuc2l0aW9ucyAyLzMuLi5cbiAgICAgICAgICAvLyAoQmVoYXZlIGxpa2Ugb25UcmFuc2l0aW9ucyBpZiBhIGNvbmZpZyBpcyBzcGVjaWZpZWQsIGJ1dFxuICAgICAgICAgIC8vICB0aGVyZSBpcyBubyBcIm9uXCIgZXZlbnQuLi4pXG4gICAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh7IHJvdXRlQ2hhcnQsIGFjdGlvbjogYWN0aW9uT3JDb25maWcgfSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIGNvbnN0IGFsbFN0YXRlcyA9IFtdXG4gICAgY29uc3QgYWxsUm91dGVzID0gW11cblxuICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAyLzMuLi5cbiAgICBjb25zdCBkZWNvbXBvc2VkRXZlbnRzID0gT2JqZWN0LmVudHJpZXMoZXZlbnRzKVxuICAgICAgLnJlZHVjZSgoYWNjLCBbZXZlbnROYW1lLCBfY29uZmlnc10pID0+IHtcbiAgICAgICAgY29uc3QgeyBzdGF0ZXMsIHJvdXRlcywgY29uZmlncyB9ID0gZGVjb21wb3NlQ29uZmlncyhfY29uZmlncylcbiAgICAgICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgICAgIGFsbFN0YXRlcy5wdXNoKC4uLnN0YXRlcylcbiAgICAgICAgICBhbGxSb3V0ZXMucHVzaCguLi5yb3V0ZXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgW2V2ZW50TmFtZV06IGNvbmZpZ3NcbiAgICAgICAgfVxuICAgICAgfSwge30pXG5cbiAgICBjb25zdCBhbGxDbGVhbnVwRm5zID0gW11cblxuICAgIC8vIHBlcmZvcm1UcmFuc2l0aW9ucyAzLzMuLi5cbiAgICBhbGxDbGVhbnVwRm5zLnB1c2goXG4gICAgICAuLi5PYmplY3QuZW50cmllcyhkZWNvbXBvc2VkRXZlbnRzKVxuICAgICAgICAubWFwKChbZXZlbnROYW1lLCBjb25maWdzXSkgPT4ge1xuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBldmVudHNIYW5kbGVkLmluY3JlYXNlKGV2ZW50TmFtZSksXG4gICAgICAgICAgICBvbkV2ZW50KGV2ZW50TmFtZSwgKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZXZlbnRXYXNIYW5kbGVkID0gY29uZmlncy5zb21lKFxuICAgICAgICAgICAgICAgICh7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NlZCA9IGluU3RhdGUoZnJvbVN0YXRlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGVyKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKC4uLmFyZ3MpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICByZXR1cm4gISFwYXNzZWRcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIGlmICghZXZlbnRXYXNIYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk5vT3AoYEV2ZW50IG5vdCBoYW5kbGVkOiBcIiR7ZXZlbnROYW1lfVwiYClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIH0pLmZsYXQoKVxuICAgIClcblxuICAgIC8vIG9uVHJhbnNpdGlvbnMgMy8zLi4uXG4gICAgY29uc3QgdHJhbnNpdGlvbkNvbmZpZ3MgPSBkZWNvbXBvc2VDb25maWdzKHRyYW5zaXRpb25zKVxuXG4gICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgYWxsU3RhdGVzLnB1c2goLi4udHJhbnNpdGlvbkNvbmZpZ3Muc3RhdGVzKVxuICAgICAgYWxsUm91dGVzLnB1c2goLi4udHJhbnNpdGlvbkNvbmZpZ3Mucm91dGVzKVxuICAgIH1cblxuICAgIGFsbENsZWFudXBGbnMucHVzaChcbiAgICAgIC4uLnRyYW5zaXRpb25Db25maWdzLmNvbmZpZ3MubWFwKHRyYW5zaXRpb24gPT4ge1xuICAgICAgICBjb25zdCB7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH0gPSB0cmFuc2l0aW9uXG4gICAgICAgIGNvbnN0IHJvdXRlID0gYCR7ZnJvbVN0YXRlfS0+JHt0b1N0YXRlfWBcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICByb3V0ZXNIYW5kbGVkLmluY3JlYXNlKHJvdXRlKSxcbiAgICAgICAgICBvbkludGVybmFsRXZlbnQocm91dGUsIGFjdGlvbilcbiAgICAgICAgXVxuICAgICAgfSkuZmxhdCgpXG4gICAgKVxuXG4gICAgLy8gRGVidWdnaW5nLCBpZiB3ZSdyZSBhdCB0aGUgcmlnaHQgbGV2ZWxcbiAgICBpZiAoY2FuV2FybigpKSB7XG4gICAgICBjb25zdCBpbnZhbGlkU3RhdGVzID0gYWxsU3RhdGVzLmZpbHRlcihzdGF0ZSA9PiAhc3RhdGVzLmluY2x1ZGVzKHN0YXRlKSlcbiAgICAgIGNvbnN0IGludmFsaWRSb3V0ZXMgPSBhbGxSb3V0ZXMuZmlsdGVyKHJvdXRlID0+ICFyb3V0ZXMuaW5jbHVkZXMocm91dGUpKVxuICAgICAgaWYgKGludmFsaWRTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgU3RhdGVib3RbJHtuYW1lfV0jJHtmbk5hbWV9KCk6IEludmFsaWQgc3RhdGVzIHNwZWNpZmllZDpcXG5gICtcbiAgICAgICAgICBpbnZhbGlkU3RhdGVzLm1hcChzdGF0ZSA9PiBgICA+IFwiJHtzdGF0ZX1cImApLmpvaW4oJ1xcbicpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmIChpbnZhbGlkUm91dGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFN0YXRlYm90WyR7bmFtZX1dIyR7Zm5OYW1lfSgpOiBJbnZhbGlkIHRyYW5zaXRpb25zIHNwZWNpZmllZDpcXG5gICtcbiAgICAgICAgICBpbnZhbGlkUm91dGVzLm1hcChyb3V0ZSA9PiBgICA+IFwiJHtyb3V0ZX1cImApLmpvaW4oJ1xcbicpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gYWxsQ2xlYW51cEZucy5mb3JFYWNoKGZuID0+IGZuKCkpXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvbXBvc2VDb25maWdzIChjb25maWdzKSB7XG4gICAgY29uc3QgYWxsU3RhdGVzID0gW11cbiAgICBjb25zdCBhbGxSb3V0ZXMgPSBbXVxuXG4gICAgY29uc3QgX2NvbmZpZ3MgPSBjb25maWdzLnJlZHVjZSgoYWNjLCBjb25maWcpID0+IHtcbiAgICAgIGNvbnN0IHsgcm91dGVDaGFydCwgYWN0aW9uIH0gPSBjb25maWdcbiAgICAgIGNvbnN0IHsgc3RhdGVzLCByb3V0ZXMsIHRyYW5zaXRpb25zIH0gPSBkZWNvbXBvc2VDaGFydChyb3V0ZUNoYXJ0KVxuICAgICAgaWYgKGNhbldhcm4oKSkge1xuICAgICAgICBhbGxTdGF0ZXMucHVzaCguLi5zdGF0ZXMpXG4gICAgICAgIGFsbFJvdXRlcy5wdXNoKC4uLnJvdXRlcylcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXG4gICAgICAgIC4uLmFjYyxcbiAgICAgICAgLi4udHJhbnNpdGlvbnMubWFwKHRyYW5zaXRpb24gPT4ge1xuICAgICAgICAgIGNvbnN0IFtmcm9tU3RhdGUsIHRvU3RhdGVdID0gdHJhbnNpdGlvblxuICAgICAgICAgIHJldHVybiB7IGZyb21TdGF0ZSwgdG9TdGF0ZSwgYWN0aW9uIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9LCBbXSlcblxuICAgIHJldHVybiB7XG4gICAgICBjb25maWdzOiBfY29uZmlncyxcbiAgICAgIHN0YXRlczogYWxsU3RhdGVzLFxuICAgICAgcm91dGVzOiBhbGxSb3V0ZXNcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1N0YXRlICgpIHtcbiAgICByZXR1cm4gc3RhdGVIaXN0b3J5W3N0YXRlSGlzdG9yeS5sZW5ndGggLSAyXVxuICB9XG5cbiAgZnVuY3Rpb24gY3VycmVudFN0YXRlICgpIHtcbiAgICByZXR1cm4gc3RhdGVIaXN0b3J5W3N0YXRlSGlzdG9yeS5sZW5ndGggLSAxXVxuICB9XG5cbiAgZnVuY3Rpb24gaW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4sIC4uLmZuQXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignaW5TdGF0ZScsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgY29uZGl0aW9uTWF0Y2hlcyA9IGN1cnJlbnRTdGF0ZSgpID09PSBzdGF0ZVxuXG4gICAgaWYgKGFueU9yRm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFjb25kaXRpb25NYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGFueU9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGFueU9yRm4oLi4uZm5BcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFueU9yRm5cbiAgICB9XG5cbiAgICByZXR1cm4gY29uZGl0aW9uTWF0Y2hlc1xuICB9XG5cbiAgZnVuY3Rpb24gSW5TdGF0ZSAoc3RhdGUsIGFueU9yRm4pIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ0luU3RhdGUnLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBzdGF0ZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiAoLi4uZm5BcmdzKSA9PiBpblN0YXRlKHN0YXRlLCBhbnlPckZuLCAuLi5mbkFyZ3MpXG4gIH1cblxuICBmdW5jdGlvbiBjYW5UcmFuc2l0aW9uVG8gKC4uLnN0YXRlcykge1xuICAgIGNvbnN0IHRlc3RTdGF0ZXMgPSBzdGF0ZXMuZmxhdCgpXG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdjYW5UcmFuc2l0aW9uVG8nLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCB0ZXN0U3RhdGVzWzBdKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgaWYgKCF0ZXN0U3RhdGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlcyA9IHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICByZXR1cm4gdGVzdFN0YXRlcy5ldmVyeShzdGF0ZSA9PiBuZXh0U3RhdGVzLmluY2x1ZGVzKHN0YXRlKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRlc0F2YWlsYWJsZUZyb21IZXJlIChzdGF0ZSkge1xuICAgIGNvbnN0IF9zdGF0ZSA9IHN0YXRlICE9PSB1bmRlZmluZWRcbiAgICAgID8gc3RhdGVcbiAgICAgIDogY3VycmVudFN0YXRlKClcblxuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmUnLCB7IHN0YXRlOiAnc3RyaW5nJyB9LCBfc3RhdGUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGVzLnJlZHVjZSgoYWNjLCByb3V0ZSkgPT4ge1xuICAgICAgY29uc3QgW2Zyb21TdGF0ZSwgdG9TdGF0ZV0gPSByb3V0ZS5zcGxpdChjeEFycm93KVxuICAgICAgICAubWFwKHN0YXRlID0+IHN0YXRlLnRyaW0oKSlcblxuICAgICAgaWYgKGZyb21TdGF0ZSA9PT0gX3N0YXRlKSB7XG4gICAgICAgIHJldHVybiBbLi4uYWNjLCB0b1N0YXRlXVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuICB9XG5cbiAgZnVuY3Rpb24gRW1pdCAoZXZlbnROYW1lKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdFbWl0JywgeyBldmVudE5hbWU6ICdzdHJpbmcnIH0sIGV2ZW50TmFtZSlcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgcmV0dXJuIGVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignZW1pdCcsIHsgZXZlbnROYW1lOiAnc3RyaW5nJyB9LCBldmVudE5hbWUpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnRzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gRW50ZXIgKHN0YXRlKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdFbnRlcicsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gZW50ZXIoc3RhdGUsIC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW50ZXIgKHN0YXRlLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdlbnRlcicsIHsgc3RhdGU6ICdzdHJpbmcnIH0sIHN0YXRlKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgaW5TdGF0ZSA9IGN1cnJlbnRTdGF0ZSgpXG4gICAgY29uc3QgdG9TdGF0ZSA9IHN0YXRlXG5cbiAgICBpZiAodG9TdGF0ZSA9PT0gaW5TdGF0ZSkge1xuICAgICAgdHJhbnNpdGlvbk5vT3AoYEFscmVhZHkgaW4gc3RhdGU6IFwiJHt0b1N0YXRlfVwiYClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICghc3RhdGVzLmluY2x1ZGVzKHRvU3RhdGUpKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgSW52YWxpZCBzdGF0ZSBcIiR7dG9TdGF0ZX1cIiwgbm90IHN3aXRjaGluZ2ApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0Um91dGUgPSBgJHtpblN0YXRlfS0+JHt0b1N0YXRlfWBcbiAgICBpZiAoIXJvdXRlcy5pbmNsdWRlcyhuZXh0Um91dGUpKSB7XG4gICAgICB0cmFuc2l0aW9uTm9PcChgSW52YWxpZCB0cmFuc2l0aW9uIFwiJHtuZXh0Um91dGV9XCIsIG5vdCBzd2l0Y2hpbmdgKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gRmVsbC10aHJvdWdoLCBjYW4gZW50ZXIgbmV4dCBzdGF0ZVxuICAgIGNvbnNvbGUuaW5mbyhgJHtsb2dQcmVmaXh9OiB0SWQ8JHsrK3RyYW5zaXRpb25JZH0+OiAke25leHRSb3V0ZX1gKVxuXG4gICAgc3RhdGVIaXN0b3J5LnB1c2godG9TdGF0ZSlcbiAgICBpZiAoc3RhdGVIaXN0b3J5Lmxlbmd0aCA+IHN0YXRlSGlzdG9yeUxpbWl0KSB7XG4gICAgICBzdGF0ZUhpc3Rvcnkuc2hpZnQoKVxuICAgIH1cblxuICAgIGVtaXRJbnRlcm5hbEV2ZW50KElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0lORywgdG9TdGF0ZSwgaW5TdGF0ZSwgLi4uYXJncylcbiAgICBlbWl0SW50ZXJuYWxFdmVudChuZXh0Um91dGUsIC4uLmFyZ3MpXG4gICAgZW1pdEludGVybmFsRXZlbnQoSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HRUQsIHRvU3RhdGUsIGluU3RhdGUsIC4uLmFyZ3MpXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gb25FdmVudCAoZXZlbnROYW1lLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FdmVudCcsIHsgZXZlbnROYW1lOiAnc3RyaW5nJywgY2I6ICdmdW5jdGlvbicgfSwgZXZlbnROYW1lLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGV2ZW50cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGNiKVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBldmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBjYilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblN3aXRjaGluZyAoY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uU3dpdGNoaW5nJywgeyBjYjogJ2Z1bmN0aW9uJyB9LCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnQgPSBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0lORylcbiAgICBjb25zdCByZW1vdmVFdmVudCA9IG9uSW50ZXJuYWxFdmVudChcbiAgICAgIElOVEVSTkFMX0VWRU5UUy5TVEFURV9DSEFOR0lORyxcbiAgICAgICh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY2IodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudCgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Td2l0Y2hlZCAoY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uU3dpdGNoZWQnLCB7IGNiOiAnZnVuY3Rpb24nIH0sIGNiKVxuICAgIGlmIChlcnIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihlcnIpXG4gICAgfVxuXG4gICAgY29uc3QgZGVjcmVhc2VSZWZDb3VudCA9IHN0YXRlc0hhbmRsZWQuaW5jcmVhc2UoSU5URVJOQUxfRVZFTlRTLlNUQVRFX0NIQU5HRUQpXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvbkludGVybmFsRXZlbnQoXG4gICAgICBJTlRFUk5BTF9FVkVOVFMuU1RBVEVfQ0hBTkdFRCxcbiAgICAgICh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY2IodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzKVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudCgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FeGl0aW5nIChzdGF0ZSwgY2IpIHtcbiAgICBjb25zdCBlcnIgPSBhcmdUeXBlRXJyb3IoJ29uRXhpdGluZycsIHsgc3RhdGU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBzdGF0ZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06ZXhpdGluZ2ApXG4gICAgXVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25Td2l0Y2hpbmcoKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSBmcm9tU3RhdGUpIHtcbiAgICAgICAgY2IodG9TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkV4aXRlZCAoc3RhdGUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkV4aXRlZCcsIHsgc3RhdGU6ICdzdHJpbmcnLCBjYjogJ2Z1bmN0aW9uJyB9LCBzdGF0ZSwgY2IpXG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKGVycilcbiAgICB9XG5cbiAgICBjb25zdCBkZWNyZWFzZVJlZkNvdW50cyA9IFtcbiAgICAgIHN0YXRlc0hhbmRsZWQuaW5jcmVhc2Uoc3RhdGUpLFxuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShgJHtzdGF0ZX06ZXhpdGVkYClcbiAgICBdXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvblN3aXRjaGVkKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gZnJvbVN0YXRlKSB7XG4gICAgICAgIGNiKHRvU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FbnRlcmluZyAoc3RhdGUsIGNiKSB7XG4gICAgY29uc3QgZXJyID0gYXJnVHlwZUVycm9yKCdvbkVudGVyaW5nJywgeyBzdGF0ZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIHN0YXRlLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfTplbnRlcmluZ2ApXG4gICAgXVxuICAgIGNvbnN0IHJlbW92ZUV2ZW50ID0gb25Td2l0Y2hpbmcoKHRvU3RhdGUsIGZyb21TdGF0ZSwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSB0b1N0YXRlKSB7XG4gICAgICAgIGNiKGZyb21TdGF0ZSwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW1vdmVFdmVudCgpXG4gICAgICBkZWNyZWFzZVJlZkNvdW50cy5tYXAoZm4gPT4gZm4oKSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkVudGVyZWQgKHN0YXRlLCBjYikge1xuICAgIGNvbnN0IGVyciA9IGFyZ1R5cGVFcnJvcignb25FbnRlcmVkJywgeyBzdGF0ZTogJ3N0cmluZycsIGNiOiAnZnVuY3Rpb24nIH0sIHN0YXRlLCBjYilcbiAgICBpZiAoZXJyKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoZXJyKVxuICAgIH1cblxuICAgIGNvbnN0IGRlY3JlYXNlUmVmQ291bnRzID0gW1xuICAgICAgc3RhdGVzSGFuZGxlZC5pbmNyZWFzZShzdGF0ZSksXG4gICAgICBzdGF0ZXNIYW5kbGVkLmluY3JlYXNlKGAke3N0YXRlfTplbnRlcmVkYClcbiAgICBdXG4gICAgY29uc3QgcmVtb3ZlRXZlbnQgPSBvblN3aXRjaGVkKCh0b1N0YXRlLCBmcm9tU3RhdGUsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gdG9TdGF0ZSkge1xuICAgICAgICBjYihmcm9tU3RhdGUsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVtb3ZlRXZlbnQoKVxuICAgICAgZGVjcmVhc2VSZWZDb3VudHMubWFwKGZuID0+IGZuKCkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9OiBTdGF0ZS1tYWNoaW5lIHJlc2V0IWApXG5cbiAgICBzdGF0ZUhpc3RvcnkubGVuZ3RoID0gMFxuICAgIHN0YXRlSGlzdG9yeS5wdXNoKHN0YXJ0SW4pXG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uTm9PcCAobWVzc2FnZSkge1xuICAgIGNvbnN0IGxhc3RTdGF0ZSA9IHByZXZpb3VzU3RhdGUoKVxuICAgIGNvbnN0IGluU3RhdGUgPSBjdXJyZW50U3RhdGUoKVxuICAgIGNvbnN0IHByZXZSb3V0ZSA9IGAke2xhc3RTdGF0ZSA9PT0gdW5kZWZpbmVkID8gJ1t1bmRlZmluZWRdJyA6IGxhc3RTdGF0ZX0tPiR7aW5TdGF0ZX1gXG5cbiAgICBjb25zdCBhdmFpbGFibGVTdGF0ZXMgPSBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZSgpXG4gICAgaWYgKCFhdmFpbGFibGVTdGF0ZXMubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGAke2xvZ1ByZWZpeH06ICR7bWVzc2FnZX1cXG5gICtcbiAgICAgICAgICBgICA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiJHtwcmV2Um91dGV9XCJcXG5gICtcbiAgICAgICAgICBgICA+IFRoZXJlIGFyZSBubyBzdGF0ZXMgYXZhaWxhYmxlIGZyb20gXCIke2luU3RhdGV9XCJgXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgYCR7bG9nUHJlZml4fTogJHttZXNzYWdlfVxcbmAgK1xuICAgICAgICAgIGAgID4gUHJldmlvdXMgdHJhbnNpdGlvbjogXCIke3ByZXZSb3V0ZX1cIlxcbmAgK1xuICAgICAgICAgIGAgID4gRnJvbSBcIiR7aW5TdGF0ZX1cIiwgdmFsaWQgc3RhdGVzIGFyZTogWyR7YXZhaWxhYmxlU3RhdGVzXG4gICAgICAgICAgICAubWFwKHN0YXRlID0+IGBcIiR7c3RhdGV9XCJgKVxuICAgICAgICAgICAgLmpvaW4oJywgJyl9XWBcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGVzOiBzdGF0ZXNIYW5kbGVkLnJlZnMoKSxcbiAgICAgIHRyYW5zaXRpb25zOiByb3V0ZXNIYW5kbGVkLnJlZnMoKSxcbiAgICAgIGV2ZW50czogZXZlbnRzSGFuZGxlZC5yZWZzKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmZvICgpIHtcbiAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9OiBJbmZvcm1hdGlvbiBhYm91dCB0aGlzIHN0YXRlLW1hY2hpbmVgKVxuXG4gICAgbG9nUmVmQ291bnRlckluZm8oc3RhdGVzSGFuZGxlZClcbiAgICBsb2dSZWZDb3VudGVySW5mbyhyb3V0ZXNIYW5kbGVkKVxuICAgIGxvZ1JlZkNvdW50ZXJJbmZvKGV2ZW50c0hhbmRsZWQpXG4gIH1cblxuICBmdW5jdGlvbiBsb2dSZWZDb3VudGVySW5mbyAocmVmQ291bnRlcikge1xuICAgIGNvbnN0IHsgZGVzY3JpcHRpb24sIHRhYmxlIH0gPSByZWZDb3VudGVyLnRvVmFsdWUoKVxuICAgIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uKVxuICAgIGlmICh0YWJsZS5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUudGFibGUodGFibGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCcgID4gTm8gaW5mb3JtYXRpb24nKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHN0YXRlLW1hY2hpbmUgb2JqZWN0IGNyZWF0ZWQgYnlcbiAgICoge0BsaW5rICNzdGF0ZWJvdHN0YXRlYm90fFN0YXRlYm90KCl9LlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBzdGF0ZWJvdEZzbVxuICAgKi9cblxuICByZXR1cm4ge1xuICAgIC8vIEZvciBpZGVudGlmeWluZyBTdGF0ZWJvdCBvYmplY3RzXG4gICAgX19TVEFURUJPVF9fOiAxLFxuXG4gICAgLyoqXG4gICAgICogVGVzdHMgdG8gc2VlIGlmIHdlIGNhbiB0cmFuc2l0aW9uIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUgZnJvbVxuICAgICAqIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX0uXG4gICAgICpcbiAgICAgKiBJZiBtb3JlIHRoYW4gb25lIHN0YXRlIGlzIHNwZWNpZmllZCwgYHRydWVgIGlzIHJldHVybmVkIG9ubHkgaWZcbiAgICAgKiAqKkFMTCoqIHN0YXRlcyBhcmUgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHN0YXRlc1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnZ2FtZS1tZW51cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGxvYWRpbmcgLT5cbiAgICAgKiAgICAgICBtZW51IC0+XG4gICAgICogICAgICAgICBwbGF5IHxcbiAgICAgKiAgICAgICAgIG9wdGlvbnMgfFxuICAgICAqICAgICAgICAgc291bmQgfFxuICAgICAqICAgICAgICAgcXVpdFxuICAgICAqXG4gICAgICogICAgIC8vIEdvIGJhY2sgdG8gbWVudVxuICAgICAqICAgICBwbGF5IHwgb3B0aW9ucyB8IHNvdW5kIC0+IG1lbnVcbiAgICAgKlxuICAgICAqICAgICAvLyBDYW4gcXVpdCBmcm9tIG1haW4gZ2FtZSwgdG9vXG4gICAgICogICAgIHBsYXkgLT4gcXVpdFxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmNhblRyYW5zaXRpb25UbygncGxheScpXG4gICAgICogLy8gZmFsc2VcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ21lbnUnKVxuICAgICAqIG1hY2hpbmUuY2FuVHJhbnNpdGlvblRvKFsncGxheScsICdvcHRpb25zJ10pXG4gICAgICogLy8gdHJ1ZVxuICAgICAqL1xuICAgIGNhblRyYW5zaXRpb25UbzogY2FuVHJhbnNpdGlvblRvLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Nvcm91dGluZScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIHN1c3BlbmRlZCAtPiBydW5uaW5nIC0+IChzdXNwZW5kZWQgfCBkZWFkKVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJzdXNwZW5kZWRcIlxuICAgICAqL1xuICAgIGN1cnJlbnRTdGF0ZTogY3VycmVudFN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgZW1pdHMgYW4gZXZlbnQsIGZpcmluZyBhbnkgbGlzdGVuZXJzIGFkZGVkIHVzaW5nXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbXBlcmZvcm10cmFuc2l0aW9uc3wucGVyZm9ybVRyYW5zaXRpb25zKCl9IG9yIHtAbGluayAjc3RhdGVib3Rmc21vbmV2ZW50fC5vbkV2ZW50KCl9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdXG4gICAgICogIE9wdGlvbmFsIGFyZ3VtZW50cyB0byBwYXNzIHRvIGxpc3RlbmVycy5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKiAgV2hldGhlciBvciBub3QgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgU2VlOiB7QGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfZW1pdHRlcl9lbWl0X2V2ZW50bmFtZV9hcmdzfE5vZGUgRXZlbnRzfVxuICAgICAqICBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIFN0YXRlYm90IGltcG9ydHMgYEV2ZW50RW1pdHRlcmAgZnJvbSB0aGVcbiAgICAgKiAge0BsaW5rIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2V2ZW50c3xldmVudHN9XG4gICAgICogcGFja2FnZSBmb3IgZGVhbGluZyB3aXRoIGV2ZW50cyBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnYmFzaWMtZm9ybScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyAtPiByZWRpcmVjdFxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzoge1xuICAgICAqICAgICBvbjogJ3Bvc3QtZGF0YScsXG4gICAgICogICAgIHRoZW46ICguLi5hcmdzKSA9PiB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ0V2ZW50IGFyZ3M6ICcsIGFyZ3MpXG4gICAgICogICAgICAgLy8gc2V0VGltZW91dChtYWNoaW5lLkVudGVyKCdyZWRpcmVjdCcpLCA1MDAwKVxuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW1pdCgncG9zdC1kYXRhJywgJ0hlbGxvLCB3b3JsZCEnKVxuICAgICAqIC8vIEV2ZW50IGFyZ3M6IFtcIkhlbGxvLCB3b3JsZCFcIl1cbiAgICAgKlxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInNlbmRpbmdcIlxuICAgICAqL1xuICAgIGVtaXQ6IGVtaXQsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBlbWl0cyB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfS4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogIFRoZSBkZXNpcmVkIGV2ZW50IHRvIHtAbGluayAjc3RhdGVib3Rmc21lbWl0fC5lbWl0KCl9LlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGVtaXRzIHRoYXQgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3RyYWZmaWMtbGlnaHRzJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgZ28gLT5cbiAgICAgKiAgICAgICBwcmVwYXJlLXRvLXN0b3AgLT5cbiAgICAgKiAgICAgICBzdG9wXG4gICAgICpcbiAgICAgKiAgICAgLy8gLi4uZ290dGEga2VlcCB0aGF0IHRyYWZmaWMgZmxvd2luZ1xuICAgICAqICAgICBzdG9wIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1nbyAtPlxuICAgICAqICAgICAgIGdvXG4gICAgICogICBgLFxuICAgICAqICAgc3RhcnRJbjogJ3N0b3AnXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKHtcbiAgICAgKiAgICdzdG9wIC0+IHByZXBhcmUtdG8tZ28nOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdwcmVwYXJlLXRvLWdvIC0+IGdvJzogICAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdnbyAtPiBwcmVwYXJlLXRvLXN0b3AnOiAgIHsgb246ICd0aW1lcicgfSxcbiAgICAgKiAgICdwcmVwYXJlLXRvLXN0b3AgLT4gc3RvcCc6IHsgb246ICd0aW1lcicgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiB2YXIgbmV4dFRyYWZmaWNMaWdodCA9IG1hY2hpbmUuRW1pdCgndGltZXInKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInN0b3BcIlxuICAgICAqXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICogbmV4dFRyYWZmaWNMaWdodCgpXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJwcmVwYXJlLXRvLXN0b3BcIlxuICAgICAqL1xuICAgIEVtaXQ6IEVtaXQsXG5cbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBjaGFuZ2VzIHRvIHRoZSBzcGVjaWZpZWQgc3RhdGUsIHNvIGxvbmcgYXMgaXQgaXNcbiAgICAgKiBhY2Nlc3NpYmxlIGZyb20gdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgZGVzaXJlZCBzdGF0ZSB0byBzd2l0Y2gtdG8uXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBzdGF0ZSBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdkaWFsb2cnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNob3dpbmctbW9kYWwgLT4gKHNhdmluZyB8IGlkbGUpXG4gICAgICogICAgICAgc2F2aW5nIC0+IGlkbGVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzYXZpbmcnKVxuICAgICAqIC8vIGZhbHNlXG4gICAgICpcbiAgICAgKiAvLyBbZGlhbG9nXTogSW52YWxpZCB0cmFuc2l0aW9uIFwiaWRsZS0+c2F2aW5nXCIsIG5vdCBzd2l0Y2hpbmdcbiAgICAgKiAvLyA+IFByZXZpb3VzIHRyYW5zaXRpb246IFwiW3VuZGVmaW5lZF0tPmlkbGVcIlxuICAgICAqIC8vID4gRnJvbSBcImlkbGVcIiwgdmFsaWQgc3RhdGVzIGFyZTogW1wic2hvd2luZy1tb2RhbFwiXVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignc2hvd2luZy1tb2RhbCcpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqL1xuICAgIGVudGVyOiBlbnRlcixcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdG8gdGhlIHNwZWNpZmllZCBzdGF0ZSwgc28gbG9uZ1xuICAgICAqIGFzIGl0IGlzIGFjY2Vzc2libGUgZnJvbSB0aGUge0BsaW5rICNzdGF0ZWJvdGZzbWN1cnJlbnRzdGF0ZXwuY3VycmVudFN0YXRlKCl9LlxuICAgICAqXG4gICAgICogKFRoaXMgaXMgZXNzZW50aWFsbHkgYSBjb252ZW5pZW5jZSB3cmFwcGVyIGFyb3VuZCB7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgZGVzaXJlZCBzdGF0ZSB0byBzd2l0Y2gtdG8uXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAqICBBIGZ1bmN0aW9uIHRoYXQgY2FuIGNoYW5nZSB0aGUgc3RhdGUgd2hlbiBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3BvcHVwLW1lbnUnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IG1lbnUtb3BlbmVkIC0+XG4gICAgICogICAgICAgKGl0ZW0tY2xpY2tlZCB8IGlkbGUpXG4gICAgICpcbiAgICAgKiAgICAgaXRlbS1jbGlja2VkIC0+IGlkbGVcbiAgICAgKiAgIGAsXG4gICAgICogICBzdGFydEluOiAnbWVudS1vcGVuZWQnXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIGJ1dHRvbi5vbmNsaWNrID0gbWFjaGluZS5FbnRlcignaXRlbS1jbGlja2VkJylcbiAgICAgKiBtYWNoaW5lLmN1cnJlbnRTdGF0ZSgpXG4gICAgICogLy8gXCJtZW51LW9wZW5lZFwiXG4gICAgICpcbiAgICAgKiBidXR0b24ub25jbGljaygpXG4gICAgICogbWFjaGluZS5jdXJyZW50U3RhdGUoKVxuICAgICAqIC8vIFwiaXRlbS1jbGlja2VkXCJcbiAgICAgKi9cbiAgICBFbnRlcjogRW50ZXIsXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBzdGF0ZXMgdGhlIG1hY2hpbmUgaGFzIGJlZW4gaW4gc28gZmFyLCB1cCB0byBhIGxpbWl0IHNldFxuICAgICAqIGJ5IGBoaXN0b3J5TGltaXRgIGluIHtAbGluayBzdGF0ZWJvdE9wdGlvbnN9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBIGNvcHkgb2YgdGhlIHN0YXRlLWhpc3RvcnkuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Rvd25sb2FkZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBsb2FkaW5nIC0+IChmYWlsdXJlIHwgc3VjY2VzcylcbiAgICAgKiAgICAgICBmYWlsdXJlIC0+IGxvYWRpbmdcbiAgICAgKiAgICAgICBzdWNjZXNzIC0+IGRvbmVcbiAgICAgKiAgIGAsXG4gICAgICogICBoaXN0b3J5TGltaXQ6IDRcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcignZmFpbHVyZScpXG4gICAgICogbWFjaGluZS5lbnRlcignbG9hZGluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignc3VjY2VzcycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogbWFjaGluZS5oaXN0b3J5KClcbiAgICAgKiAvLyBbXCJmYWlsdXJlXCIsIFwibG9hZGluZ1wiLCBcInN1Y2Nlc3NcIiwgXCJkb25lXCJdXG4gICAgICovXG4gICAgaGlzdG9yeTogKCkgPT4gWy4uLnN0YXRlSGlzdG9yeV0sXG5cbiAgICAvKipcbiAgICAgKiBQcmludCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudCBtYWNoaW5lIHRvIHRoZSBjb25zb2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5mbygpXG4gICAgICogLy8gW2hhbGYtZHVwbGV4XTogSW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzdGF0ZS1tYWNoaW5lLlxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBzdGF0ZS1jaGFuZ2VzOlxuICAgICAqIC8vIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgICAqIC8vIOKUgiAoaW5kZXgpIOKUgiAgIHN0YXRlcyAgICDilIIgICAjICAgIOKUglxuICAgICAqIC8vIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgICAqIC8vIOKUgiAgICAwICAgIOKUgiAgICdkb25lJyAgICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAxICAgIOKUgiAgICdpZGxlJyAgICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAyICAgIOKUgiAncmVjZWl2aW5nJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAzICAgIOKUgiAgJ3NlbmRpbmcnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgICAqIC8vIFtoYWxmLWR1cGxleF0gTGlzdGVuaW5nIGZvciB0aGUgZm9sbG93aW5nIHRyYW5zaXRpb25zOlxuICAgICAqIC8vIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUrOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuICAgICAqIC8vIOKUgiAoaW5kZXgpIOKUgiAgICB0cmFuc2l0aW9ucyAgICDilIIgICAjICAgIOKUglxuICAgICAqIC8vIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgICAqIC8vIOKUgiAgICAwICAgIOKUgiAnaWRsZS0+cmVjZWl2aW5nJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAxICAgIOKUgiAgJ2lkbGUtPnNlbmRpbmcnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAyICAgIOKUgiAncmVjZWl2aW5nLT5kb25lJyDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUgiAgICAzICAgIOKUgiAgJ3NlbmRpbmctPmRvbmUnICDilIIgJ05vbmUnIOKUglxuICAgICAqIC8vIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgICAqIC8vIFtoYWxmLWR1cGxleF06IExpc3RlbmluZyBmb3IgdGhlIGZvbGxvd2luZyBldmVudHM6XG4gICAgICogLy8gKE5vIGluZm9ybWF0aW9uKVxuICAgICAqL1xuICAgIGluZm86ICgpID0+IGluZm8oKSxcblxuICAgIC8qKlxuICAgICAqIEdldCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudCBtYWNoaW5lLlxuICAgICAqXG4gICAgICogU2FtZSBkZXRhaWxzIGFzIHtAbGluayAjc3RhdGVib3Rmc21pbmZvfC5pbmZvKCl9IGluIG9iamVjdC1mb3JtLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5pbnNwZWN0KClcbiAgICAgKiAvLyBXaWxsIHJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICAgKiAvLyAgeyBzdGF0ZXMsIHRyYW5zaXRpb25zLCBldmVudHMgfVxuICAgICAqXG4gICAgICogLy8gVGhlc2Ugd2lsbCBlYWNoIGhhdmUga2V5LXZhbHVlcywgdGhlIGtleSBiZWluZyB0aGUgbmFtZVxuICAgICAqIC8vIGFuZCB0aGUgdmFsdWUgYmVpbmcgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgYXR0YWNoZWQuXG4gICAgICovXG4gICAgaW5zcGVjdDogKCkgPT4gaW5zcGVjdCgpLFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX1cbiAgICAgKiBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgYHN0YXRlYCwgaW1tZWRpYXRlbHkgcmV0dXJuaW5nIGVpdGhlclxuICAgICAqIGB0cnVlYCBvciBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYG91dHB1dFdoZW5UcnVlYCBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGluc3RlYWQgb2YgYHRydWVgLCBhbmQgYG51bGxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICAgICAqICBgZmFsc2VgLlxuICAgICAqXG4gICAgICogSWYgYSBmdW5jdGlvbiBpcyBzcGVjaWZpZWQsIHRoZW4gaXRzIHJldHVybi12YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICAgKiBhcyB0aGUgYHRydWVgLXZhbHVlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZSB0byB0ZXN0IGFnYWluc3QuXG4gICAgICogQHBhcmFtIHthbnl8ZnVuY3Rpb259IFtvdXRwdXRXaGVuVHJ1ZV1cbiAgICAgKiAgT3B0aW9uYWwgYHRydWVgLXZhbHVlLiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgaXQgd2lsbCBiZVxuICAgICAqICBjYWxsZWQgYW5kIGl0cyByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufG51bGx8Kn1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnbGl0dGxlLXJldnZlcicsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICAoZ2Vhci0xIHwgZ2Vhci0yIHwgcmV2ZXJzZSkgLT5cbiAgICAgKiAgICAgaWRsZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmluU3RhdGUoJ2lkbGUnKVxuICAgICAqIC8vIHRydWVcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuaW5TdGF0ZSgnaWRsZScsICdQdXJycnIuLi4nKVxuICAgICAqIC8vIFwiUHVycnJyLi4uXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2dlYXItMScpXG4gICAgICogbWFjaGluZS5pblN0YXRlKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0lkbGluZyEnKVxuICAgICAqICAgcmV0dXJuICdQdXJycnIuLi4nXG4gICAgICogfSlcbiAgICAgKiAvLyBudWxsXG4gICAgICogLy8gXiB0aGUgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBhdCBhbGwgaW4gdGhlIGBmYWxzZWAgY2FzZSxcbiAgICAgKiAvLyAgIHNvIG5vIGNvbnNvbGUubG9nIGVpdGhlci5cbiAgICAgKi9cbiAgICBpblN0YXRlOiBpblN0YXRlLFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIHJ1biwgdGVzdHMgdGhhdFxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfSBtYXRjaGVzIHRoZVxuICAgICAqIHNwZWNpZmllZCBzdGF0ZSwgcmV0dXJuaW5nIGVpdGhlciBgdHJ1ZWAgb3IgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIElmIGBvdXRwdXRXaGVuVHJ1ZWAgaXMgc3BlY2lmaWVkLCB0aGVuIGl0IHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBpbnN0ZWFkIG9mIGB0cnVlYCwgYW5kIGBudWxsYCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2ZcbiAgICAgKiAgYGZhbHNlYC5cbiAgICAgKlxuICAgICAqIChUaGlzIGlzIGVzc2VudGlhbGx5IGEgY29udmVuaWVuY2Ugd3JhcHBlciBhcm91bmQge0BsaW5rICNzdGF0ZWJvdGZzbWluc3RhdGV8LmluU3RhdGUoKX0uKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZSB0byB0ZXN0IGFnYWluc3QuXG4gICAgICogQHBhcmFtIHthbnl8ZnVuY3Rpb259IFtvdXRwdXRXaGVuVHJ1ZV1cbiAgICAgKiAgT3B0aW9uYWwgYHRydWVgLXZhbHVlLiBJZiBhIGZ1bmN0aW9uIGlzIHNwZWNpZmllZCwgaXQgd2lsbCBiZVxuICAgICAqICBjYWxsZWQgYW5kIGl0cyByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgKiAgQSBmdW5jdGlvbiB0aGF0IGNhbGxzIHtAbGluayAjc3RhdGVib3Rmc21pbnN0YXRlfC5pblN0YXRlKCl9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdsaXR0bGUtcmV2dmVyJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPlxuICAgICAqICAgICAgIChnZWFyLTEgfCBnZWFyLTIgfCByZXZlcnNlKSAtPlxuICAgICAqICAgICBpZGxlXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIHZhciBpZGxpbmcgPSBtYWNoaW5lLkluU3RhdGUoJ2lkbGUnKVxuICAgICAqIHZhciBwdXJyaW5nID0gbWFjaGluZS5JblN0YXRlKCdpZGxlJywgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0lkbGluZyEnKVxuICAgICAqICAgcmV0dXJuICdQdXJycnIuLi4nXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIGlkbGluZygpXG4gICAgICogLy8gdHJ1ZVxuICAgICAqXG4gICAgICogcHVycmluZygpXG4gICAgICogLy8gSWRsaW5nIVxuICAgICAqIC8vIFwiUHVycnJyLi4uXCJcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2dlYXItMScpXG4gICAgICogcHVycmluZygpXG4gICAgICogLy8gbnVsbFxuICAgICAqIC8vIF4gdGhlIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgYXQgYWxsIGluIHRoZSBgZmFsc2VgIGNhc2UsXG4gICAgICogLy8gICBzbyBubyBjb25zb2xlLmxvZyBlaXRoZXIuXG4gICAgICovXG4gICAgSW5TdGF0ZTogSW5TdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHN0YXRlLW1hY2hpbmUuXG4gICAgICpcbiAgICAgKiBVc2VkIGZvciBsb2dnaW5nIGFuZCBhbHNvIGJ5IHtAbGluayAjc3RhdGVib3Rhc3NlcnRyb3V0ZXxhc3NlcnRSb3V0ZSgpfVxuICAgICAqIGZvciB0aGUgc2FtZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBuYW1lIG9mIHRoZSBzdGF0ZS1tYWNoaW5lLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdBeSwgdGhlcmXigJlzIHRoZSBydWIuJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgdGhlLXF1ZXN0aW9uIC0+ICh0by1iZSB8IG5vdC10by1iZSlcbiAgICAgKiAgICAgICBub3QtdG8tYmUgLT4gcGVyY2hhbmNlLXRvLWRyZWFtXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUubmFtZSgpXG4gICAgICogLy8gXCJBeSwgdGhlcmXigJlzIHRoZSBydWIuXCJcbiAgICAgKi9cbiAgICBuYW1lOiAoKSA9PiBuYW1lLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5ICoqQUZURVIqKiB0aGVcbiAgICAgKiBzcGVjaWZpZWQtc3RhdGUgYmVjb21lcyB0aGUgY3VycmVudCBvbmUuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFRoZSBzdGF0ZS5cbiAgICAgKiBAcGFyYW0ge2VudGVyQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAoZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vbkVudGVyZWQoJ2RvbmUnLCBmcm9tU3RhdGUgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coJ0VudGVyZWQgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogbWFjaGluZS5lbnRlcignZG9uZScpXG4gICAgICogLy8gRW50ZXJlZCBmcm9tOiByZWNlaXZpbmdcbiAgICAgKi9cbiAgICBvbkVudGVyZWQ6IG9uRW50ZXJlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBiZWNvbWVzIHRoZSBjdXJyZW50IG9uZS5cbiAgICAgKlxuICAgICAqIEEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgdGhhdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgVGhlIHN0YXRlLlxuICAgICAqIEBwYXJhbSB7ZW50ZXJDYWxsYmFja30gY2JcbiAgICAgKiAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBzaWduYXR1cmU6XG4gICAgICpcbiAgICAgKiAgYChmcm9tU3RhdGUsIC4uLmFyZ3M/KWBcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLm9uRW50ZXJlZCgnZG9uZScsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBtYWRlIGl0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FbnRlcmluZygnZG9uZScsIGZyb21TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnRW50ZXJpbmcgZnJvbTonLCBmcm9tU3RhdGUpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEVudGVyaW5nIGZyb206IHNlbmRpbmdcbiAgICAgKiAvLyBXZSBtYWRlIGl0IVxuICAgICAqL1xuICAgIG9uRW50ZXJpbmc6IG9uRW50ZXJpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25lbnRlcmluZyAub25FbnRlcmluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZW50ZXJlZCAub25FbnRlcmVkKCl9IGNhbGxiYWNrIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBlbnRlckNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb21TdGF0ZVxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBbYXJnc11cbiAgICAgKiAgQXJndW1lbnRzIHBhc3NlZC1kb3duIGZyb20ge0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyIC5lbnRlcigpfSBvclxuICAgICAqICB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdCAuZW1pdCgpfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBldmVudCBpcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBBIGZ1bmN0aW9uIGlzIHJldHVybmVkIHRoYXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgVGhlIGNhbGxiYWNrLlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCd0cmFmZmljLWxpZ2h0cycsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGdvIC0+XG4gICAgICogICAgICAgcHJlcGFyZS10by1zdG9wIC0+XG4gICAgICogICAgICAgc3RvcFxuICAgICAqXG4gICAgICogICAgIC8vIC4uLmdvdHRhIGtlZXAgdGhhdCB0cmFmZmljIGZsb3dpbmdcbiAgICAgKiAgICAgc3RvcCAtPlxuICAgICAqICAgICAgIHByZXBhcmUtdG8tZ28gLT5cbiAgICAgKiAgICAgICBnb1xuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnBlcmZvcm1UcmFuc2l0aW9ucyh7XG4gICAgICogICAnc3RvcCAtPiBwcmVwYXJlLXRvLWdvIC0+IGdvJzogICB7IG9uOiAndGltZXInIH0sXG4gICAgICogICAnZ28gLT4gcHJlcGFyZS10by1zdG9wIC0+IHN0b3AnOiB7IG9uOiAndGltZXInIH0sXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FdmVudCgndGltZXInLCAoKSA9PiB7XG4gICAgICogICByZWRyYXdUcmFmZmljTGlnaHRzKClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogc2V0SW50ZXJ2YWwobWFjaGluZS5FbWl0KCd0aW1lcicpLCAyMDAwKVxuICAgICAqL1xuICAgIG9uRXZlbnQ6IG9uRXZlbnQsXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCBydW5zIGEgY2FsbGJhY2sgaW1tZWRpYXRlbHkgKipBRlRFUioqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCB0b1N0YXRlID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCdXZSBhcmUgaGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiAvLyBXZSBhcmUgaGVhZGluZyB0bzogc2VuZGluZ1xuICAgICAqL1xuICAgIG9uRXhpdGVkOiBvbkV4aXRlZCxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSAqKkJFRk9SRSoqIHRoZVxuICAgICAqIHNwZWNpZmllZC1zdGF0ZSBpcyBubyBsb25nZXIgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSBUaGUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtleGl0Q2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgLi4uYXJncz8pYFxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJlbW92ZXMgdGhlIGxpc3RlbmVyLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0ZWQoJ2lkbGUnLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnUGVhY2Ugb3V0IScpXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25FeGl0aW5nKCdpZGxlJywgdG9TdGF0ZSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZygnSGVhZGluZyB0bzonLCB0b1N0YXRlKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdyZWNlaXZpbmcnKVxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ2RvbmUnKVxuICAgICAqIC8vIEhlYWRpbmcgdG86IHJlY2VpdmluZ1xuICAgICAqIC8vIFBlYWNlIG91dCFcbiAgICAgKi9cbiAgICBvbkV4aXRpbmc6IG9uRXhpdGluZyxcblxuICAgIC8qKlxuICAgICAqIHtAbGluayAjc3RhdGVib3Rmc21vbmV4aXRpbmcgLm9uRXhpdGluZygpfSAvXG4gICAgICoge0BsaW5rICNzdGF0ZWJvdGZzbW9uZXhpdGVkIC5vbkV4aXRlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgZXhpdENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHJ1bnMgYSBjYWxsYmFjayBpbW1lZGlhdGVseSBhZnRlciAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGVkKCh0b1N0YXRlLCBmcm9tU3RhdGUpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBXZSB3ZW50IGZyb20gXCIke2Zyb21TdGF0ZX1cIiB0byBcIiR7dG9TdGF0ZX1cImApXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3JlY2VpdmluZycpXG4gICAgICogLy8gV2Ugd2VudCBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGVkOiBvblN3aXRjaGVkLFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgcnVucyBhIGNhbGxiYWNrIGltbWVkaWF0ZWx5IGJlZm9yZSAqKkFOWSoqXG4gICAgICogc3RhdGUtY2hhbmdlLlxuICAgICAqXG4gICAgICogQSBmdW5jdGlvbiBpcyByZXR1cm5lZCB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7c3dpdGNoQ2FsbGJhY2t9IGNiXG4gICAgICogIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCB0aGUgc2lnbmF0dXJlOlxuICAgICAqXG4gICAgICogIGAodG9TdGF0ZSwgZnJvbVN0YXRlLCAuLi5hcmdzPylgXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgbGlzdGVuZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2hhbGYtZHVwbGV4Jywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgaWRsZSAtPiBzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmVcbiAgICAgKiAgIGBcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5vblN3aXRjaGluZygodG9TdGF0ZSwgZnJvbVN0YXRlKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgR29pbmcgZnJvbSBcIiR7ZnJvbVN0YXRlfVwiIHRvIFwiJHt0b1N0YXRlfVwiYClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogbWFjaGluZS5lbnRlcigncmVjZWl2aW5nJylcbiAgICAgKiAvLyBHb2luZyBmcm9tIFwiaWRsZVwiIHRvIFwicmVjZWl2aW5nXCJcbiAgICAgKi9cbiAgICBvblN3aXRjaGluZzogb25Td2l0Y2hpbmcsXG5cbiAgICAvKipcbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hpbmcgLm9uU3dpdGNoaW5nKCl9IC9cbiAgICAgKiB7QGxpbmsgI3N0YXRlYm90ZnNtb25zd2l0Y2hlZCAub25Td2l0Y2hlZCgpfSBjYWxsYmFjayBzaWduYXR1cmUuXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgc3dpdGNoQ2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG9TdGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tU3RhdGVcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gW2FyZ3NdXG4gICAgICogIEFyZ3VtZW50cyBwYXNzZWQtZG93biBmcm9tIHtAbGluayAjc3RhdGVib3Rmc21lbnRlciAuZW50ZXIoKX0gb3JcbiAgICAgKiAge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXQgLmVtaXQoKX1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFJ1biBjYWxsYmFja3Mgd2hlbiB0cmFuc2l0aW9ucyBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2Ygc3RhdGVib3RGc21cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gdHJhbnNpdGlvbnNcbiAgICAgKiAgQ29uZmlndXJhdGlvbiBpbiB0aGUgZm9ybSBvZiBhbiBvYmplY3QsIG9yIGEgZnVuY3Rpb24gdGhhdFxuICAgICAqICByZXR1cm5zIGFuIG9iamVjdC4gSWYgYSBmdW5jdGlvbiBpcyB1c2VkLCB0aGVyZSB3aWxsIGJlIGEgc2luZ2xlXG4gICAgICogIGFyZ3VtZW50IHBhc3NlZC1pbjogYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzXG4gICAgICogIGF0dGFjaGVkIGFzIGEgY29udmVuaWVuY2U6XG4gICAgICpcbiAgICAgKiAgLSB7e0BsaW5rICNzdGF0ZWJvdGZzbWVudGVyfC5lbnRlcigpfSwge0BsaW5rICNzdGF0ZWJvdGZzbWVtaXR8LmVtaXQoKX0sIHtAbGluayAjZW50ZXItc3RhdGUtMSAuRW50ZXIoKX0sIHtAbGluayAjZW1pdC1uYW1lIC5FbWl0KCl9fVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGFkZGVkXG4gICAgICogIGJ5IHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWFjaGluZSA9IFN0YXRlYm90KCdoYWxmLWR1cGxleCcsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT4gc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUub25UcmFuc2l0aW9ucyh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzogKCkgPT4ge1xuICAgICAqICAgICBzZW5kRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdzZW50JykpXG4gICAgICogICAgICAgLmNhdGNoKCgpID0+IG1hY2hpbmUuZW50ZXIoJ2RvbmUnLCAnZmFpbGVkJykpXG4gICAgICogICB9LFxuICAgICAqICAgJ2lkbGUgLT4gcmVjZWl2aW5nJzogKCkgPT4ge1xuICAgICAqICAgICByZWNlaXZlRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gbWFjaGluZS5lbnRlcignZG9uZScsICdyZWNlaXZlZCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBtYWNoaW5lLmVudGVyKCdkb25lJywgJ2ZhaWxlZCcpKVxuICAgICAqICAgfSxcbiAgICAgKiAgICdzZW5kaW5nIHwgcmVjZWl2aW5nIC0+IGRvbmUnOiB3aGF0SGFwcGVuZWQgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWxsIGZpbmlzaGVkOiAnLCB3aGF0SGFwcGVuZWQpXG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW50ZXIoJ3NlbmRpbmcnKVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gc2VuZERhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBmdW5jdGlvbiByZWNlaXZlRGF0YSgpIHtcbiAgICAgKiAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICogICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMClcbiAgICAgKiAgICAgc2V0VGltZW91dChyZWplY3QsIDc1MCArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDc1MCkpXG4gICAgICogICB9KVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gVGhlIGFib3ZlIGV4YW1wbGUgdXNpbmcgYSBmdW5jdGlvbiBmb3IgY29uZmlnXG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKCh7IGVudGVyIH0pID0+ICh7XG4gICAgICogICAnaWRsZSAtPiBzZW5kaW5nJzogKCkgPT4ge1xuICAgICAqICAgICBzZW5kRGF0YSgpXG4gICAgICogICAgICAgLnRoZW4oKCkgPT4gZW50ZXIoJ2RvbmUnLCAnc2VudCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBlbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnaWRsZSAtPiByZWNlaXZpbmcnOiAoKSA9PiB7XG4gICAgICogICAgIHJlY2VpdmVEYXRhKClcbiAgICAgKiAgICAgICAudGhlbigoKSA9PiBlbnRlcignZG9uZScsICdyZWNlaXZlZCcpKVxuICAgICAqICAgICAgIC5jYXRjaCgoKSA9PiBlbnRlcignZG9uZScsICdmYWlsZWQnKSlcbiAgICAgKiAgIH0sXG4gICAgICogICAnc2VuZGluZyB8IHJlY2VpdmluZyAtPiBkb25lJzogd2hhdEhhcHBlbmVkID0+IHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FsbCBmaW5pc2hlZDogJywgd2hhdEhhcHBlbmVkKVxuICAgICAqICAgfVxuICAgICAqIH0pKVxuICAgICAqXG4gICAgICogLy8gZXRjLi4uXG4gICAgICovXG4gICAgb25UcmFuc2l0aW9uczogdHJhbnNpdGlvbnMgPT4gYXBwbHlIaXRjaGVyKHRyYW5zaXRpb25zLCAnb25UcmFuc2l0aW9ucycpLFxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSB0cmFuc2l0aW9ucyB3aGVuIGV2ZW50cyBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBVc2UgYHRoZW5gIHRvIG9wdGlvbmFsbHkgYWRkIGNhbGxiYWNrcyB0byB0aG9zZSB0cmFuc2l0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBzdGF0ZWJvdEZzbVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSB0cmFuc2l0aW9uc1xuICAgICAqICBDb25maWd1cmF0aW9uIGluIHRoZSBmb3JtIG9mIGFuIG9iamVjdCwgb3IgYSBmdW5jdGlvbiB0aGF0XG4gICAgICogIHJldHVybnMgYW4gb2JqZWN0LiBJZiBhIGZ1bmN0aW9uIGlzIHVzZWQsIHRoZXJlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgYXJndW1lbnQgcGFzc2VkLWluOiBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG1ldGhvZHNcbiAgICAgKiAgYXR0YWNoZWQgYXMgYSBjb252ZW5pZW5jZTpcbiAgICAgKlxuICAgICAqICAtIHt7QGxpbmsgI3N0YXRlYm90ZnNtZW50ZXJ8LmVudGVyKCl9LCB7QGxpbmsgI3N0YXRlYm90ZnNtZW1pdHwuZW1pdCgpfSwge0BsaW5rICNlbnRlci1zdGF0ZS0xIC5FbnRlcigpfSwge0BsaW5rICNlbWl0LW5hbWUgLkVtaXQoKX19XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgKiAgYnkgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2NvbXBsZXgtZm9ybScsIHtcbiAgICAgKiAgIGNoYXJ0OiBgXG4gICAgICogICAgIGlkbGUgLT5cbiAgICAgKiAgICAgICB1cGRhdGVcbiAgICAgKlxuICAgICAqICAgICAvLyBNYXliZSB0aGluZ3MgdGFrZSBhIGxvbmcgdGltZS4uLlxuICAgICAqICAgICB1cGRhdGUgLT5cbiAgICAgKiAgICAgICB3YWl0aW5nIC0+IHdhaXRpbmctYS13aGlsZVxuICAgICAqXG4gICAgICogICAgIC8vIFdoaWNoIHBhdGggd2lsbCB3ZSB0YWtlP1xuICAgICAqICAgICB3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+XG4gICAgICogICAgICAgc3VjY2VzcyB8IGZhaWxlZCB8IHRpbWVvdXRcbiAgICAgKlxuICAgICAqICAgICAvLyBBbGwgZG9uZSFcbiAgICAgKiAgICAgc3VjY2VzcyB8IGZhaWxlZCB8IHRpbWVvdXQgLT5cbiAgICAgKiAgICAgICBkb25lXG4gICAgICogICBgXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUucGVyZm9ybVRyYW5zaXRpb25zKCh7IEVudGVyLCBlbWl0IH0pID0+ICh7XG4gICAgICogICAnaWRsZSAtPiB1cGRhdGUnOiB7XG4gICAgICogICAgIG9uOiAndXNlci1zYXZlZCcsXG4gICAgICogICAgIHRoZW46IChkYXRhKSA9PiB7XG4gICAgICogICAgICAgY29uc29sZS5sb2coJ1NlbmRpbmcgZGF0YTogJywgZGF0YSlcbiAgICAgKlxuICAgICAqICAgICAgIHNlbmREYXRhKGRhdGEpXG4gICAgICogICAgICAgICAudGhlbihFbnRlcignc3VjY2VzcycpKVxuICAgICAqICAgICAgICAgLmNhdGNoKEVudGVyKCdmYWlsZWQnKSlcbiAgICAgKlxuICAgICAqICAgICAgIGVtaXQoJ2RhdGEtc2VudCcpXG4gICAgICogICAgIH1cbiAgICAgKiAgIH0sXG4gICAgICogICAndXBkYXRlIC0+IHdhaXRpbmcnOiB7XG4gICAgICogICAgIG9uOiAnZGF0YS1zZW50JyxcbiAgICAgKiAgICAgdGhlbjogKCkgPT4ge1xuICAgICAqICAgICAgIHNldFRpbWVvdXQoRW50ZXIoJ3dhaXRpbmctYS13aGlsZScpLCA3NTApXG4gICAgICogICAgICAgc2V0VGltZW91dChFbnRlcigndGltZW91dCcpLCA1MDAwKVxuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICogfSkpXG4gICAgICpcbiAgICAgKiAvLyBKdXN0IHRvIGlsbHVzdHJhdGUgdGhhdCB5b3UgY2FuIG1peCBuJyBtYXRjaCB3aXRoIG9uVHJhbnNpdGlvbnM6XG4gICAgICogbWFjaGluZS5vblRyYW5zaXRpb25zKHtcbiAgICAgKiAgICd3YWl0aW5nIHwgd2FpdGluZy1hLXdoaWxlIC0+IHN1Y2Nlc3MnOiAoKSA9PiB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdMb3ZlbHkhJylcbiAgICAgKiAgIH0sXG4gICAgICogICAnd2FpdGluZyB8IHdhaXRpbmctYS13aGlsZSAtPiB0aW1lb3V0JzogKCkgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnV2VsbCwgYXQgbGVhc3QgeW91IGhhdmUgeW91ciBzaG9lcycpXG4gICAgICogICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIG1hY2hpbmUuZW1pdCgndXNlci1zYXZlZCcsIFsnc29tZScsICdkYXRhJ10pXG4gICAgICogLy8gU2VuZGluZyBkYXRhOiBbXCJzb21lXCIsIFwiZGF0YVwiXVxuICAgICAqXG4gICAgICogZnVuY3Rpb24gc2VuZERhdGEoKSB7XG4gICAgICogICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAqICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApXG4gICAgICogICAgIHNldFRpbWVvdXQocmVqZWN0LCA3NTAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA3NTApKVxuICAgICAqICAgfSlcbiAgICAgKiB9XG4gICAgICovXG4gICAgcGVyZm9ybVRyYW5zaXRpb25zOiB0cmFuc2l0aW9ucyA9PiBhcHBseUhpdGNoZXIodHJhbnNpdGlvbnMsICdwZXJmb3JtVHJhbnNpdGlvbnMnKSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByZXZpb3VzIHN0YXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9XG4gICAgICogIFRoZSBwcmV2aW91cyBzdGF0ZSwgb3IgYHVuZGVmaW5lZGAgaWYgdGhlcmUgaXNuJ3Qgb25lIChpZTsgeW91XG4gICAgICogIGhhdmUganVzdCBjYWxsZWQge0BsaW5rICNzdGF0ZWJvdGZzbXJlc2V0fC5yZXNldCgpfSwgb3IgdGhlXG4gICAgICogIG1hY2hpbmUgaGFzIGp1c3Qgc3RhcnRlZC4pXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ3NpbXBsZS1zZW5kZXInLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdzZW5kaW5nJylcbiAgICAgKiBtYWNoaW5lLnByZXZpb3VzU3RhdGUoKVxuICAgICAqIC8vIFwiaWRsZVwiXG4gICAgICovXG4gICAgcHJldmlvdXNTdGF0ZTogcHJldmlvdXNTdGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHN0YXRlLW1hY2hpbmUgdG8gaXRzIHN0YXJ0aW5nLXN0YXRlIGFuZCBjbGVhcnMgdGhlXG4gICAgICogc3RhdGUtaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEFsbCBsaXN0ZW5lcnMgd2lsbCBzdGlsbCBiZSBhdHRhY2hlZCwgYnV0IG5vIGV2ZW50cyBvciB0cmFuc2l0aW9ucyB3aWxsIGJlIGZpcmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBtYWNoaW5lID0gU3RhdGVib3QoJ2Nhcm91c2VsJywge1xuICAgICAqICAgY2hhcnQ6IGBcbiAgICAgKiAgICAgcGFnZS0xIC0+XG4gICAgICogICAgIHBhZ2UtMiAtPlxuICAgICAqICAgICBwYWdlLTMgLT5cbiAgICAgKiAgICAgcGFnZS00IC0+IHBhZ2UtMVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLmVudGVyKCdwYWdlLTInKVxuICAgICAqIG1hY2hpbmUucmVzZXQoKVxuICAgICAqIG1hY2hpbmUuY3VycmVudFN0YXRlKClcbiAgICAgKiAvLyBcInBhZ2UtMVwiXG4gICAgICovXG4gICAgcmVzZXQ6IHJlc2V0LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGBhcnJheWAgb2Ygc3RhdGVzIGFjY2Vzc2libGUgZnJvbSB0aGUgc3RhdGUgc3BlY2lmaWVkLlxuICAgICAqIElmIG5vIHN0YXRlIGlzIHBhc3NlZC1pbiwgdGhlIHtAbGluayAjc3RhdGVib3Rmc21jdXJyZW50c3RhdGV8LmN1cnJlbnRTdGF0ZSgpfSBpcyB1c2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIHN0YXRlYm90RnNtXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZV0gVGhlIHN0YXRlIHRvIGNoZWNrLiB7QGxpbmsgI3N0YXRlYm90ZnNtY3VycmVudHN0YXRlfC5jdXJyZW50U3RhdGUoKX1cbiAgICAgKiAgaWYgdW5zcGVjaWZpZWQuXG4gICAgICogQHJldHVybnMge1N0cmluZ1tdfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG1hY2hpbmUgPSBTdGF0ZWJvdCgnaGFsZi1kdXBsZXgnLCB7XG4gICAgICogICBjaGFydDogYFxuICAgICAqICAgICBpZGxlIC0+IHNlbmRpbmcgfCByZWNlaXZpbmcgLT4gZG9uZVxuICAgICAqICAgYFxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKClcbiAgICAgKiAvLyBbXCJzZW5kaW5nXCIsIFwicmVjZWl2aW5nXCJdXG4gICAgICpcbiAgICAgKiBtYWNoaW5lLnN0YXRlc0F2YWlsYWJsZUZyb21IZXJlKCdyZWNlaXZpbmcnKVxuICAgICAqIC8vIFtcImRvbmVcIl1cbiAgICAgKi9cbiAgICBzdGF0ZXNBdmFpbGFibGVGcm9tSGVyZTogc3RhdGVzQXZhaWxhYmxlRnJvbUhlcmVcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1N0YXRlYm90IChtYWNoaW5lKSB7XG4gIHJldHVybiAoXG4gICAgaXNQb2pvKG1hY2hpbmUpICYmXG4gICAgdHlwZW9mIG1hY2hpbmUuX19TVEFURUJPVF9fID09PSAnbnVtYmVyJ1xuICApXG59XG4iLCJcbi8vXG4vLyBTVEFURUJPVCBVVElMU1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzRXZlbnRFbWl0dGVyLFxuICBpc1Bvam8sXG4gIGlzVGVtcGxhdGVMaXRlcmFsLFxuICB1bmlxLFxuICBEZWZlcixcbiAgT25jZSxcbiAgUmV2b2thYmxlLFxuICBSZWZlcmVuY2VDb3VudGVyLFxuICBBcmdUeXBlRXJyb3IsXG4gIExvZ2dlclxufVxuXG5mdW5jdGlvbiBpc0V2ZW50RW1pdHRlciAob2JqKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiZcbiAgICB0eXBlb2Ygb2JqLmVtaXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2Ygb2JqLmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIG9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJ1xuICApXG59XG5cbmZ1bmN0aW9uIGlzUG9qbyAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGVcbn1cblxuZnVuY3Rpb24gaXNUZW1wbGF0ZUxpdGVyYWwgKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmV2ZXJ5KGl0ZW0gPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiB1bmlxIChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQucmVkdWNlKChhY2MsIG9uZSkgPT4gKGFjYy5pbmRleE9mKG9uZSkgPT09IC0xID8gWy4uLmFjYywgb25lXSA6IGFjYyksIFtdKVxufVxuXG5mdW5jdGlvbiBkZWZlciAoZm4sIC4uLmFyZ3MpIHtcbiAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCAwLCAuLi5hcmdzKVxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuZnVuY3Rpb24gRGVmZXIgKGZuKSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4gZGVmZXIoZm4sIC4uLmFyZ3MpXG59XG5cbmZ1bmN0aW9uIE9uY2UgKGZuKSB7XG4gIGNvbnN0IHsgcmV2b2tlLCBmbjogX2ZuIH0gPSBSZXZva2FibGUoZm4pXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgcmVzdWx0ID0gX2ZuKC4uLmFyZ3MpXG4gICAgcmV2b2tlKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZnVuY3Rpb24gUmV2b2thYmxlIChmbikge1xuICBsZXQgcmV2b2tlZCA9IGZhbHNlXG4gIGxldCByZXN1bHRcbiAgcmV0dXJuIHtcbiAgICBmbjogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICghcmV2b2tlZCkge1xuICAgICAgICByZXN1bHQgPSBmbiguLi5hcmdzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgcmV2b2tlOiAoKSA9PiB7XG4gICAgICByZXZva2VkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBSZWZlcmVuY2VDb3VudGVyIChuYW1lLCBraW5kLCBkZXNjcmlwdGlvbiwgLi4uZXhwZWN0aW5nKSB7XG4gIGNvbnN0IF9yZWZzID0ge307XG4gIFsuLi5leHBlY3RpbmddLmZsYXQoKS5mb3JFYWNoKHJlZiA9PiB7XG4gICAgX3JlZnNbcmVmXSA9IDBcbiAgfSlcbiAgZnVuY3Rpb24gaW5jcmVhc2UgKHJlZikge1xuICAgIF9yZWZzW3JlZl0gPSBjb3VudE9mKHJlZikgKyAxXG4gICAgcmV0dXJuICgpID0+IGRlY3JlYXNlKHJlZilcbiAgfVxuICBmdW5jdGlvbiBkZWNyZWFzZSAocmVmKSB7XG4gICAgY29uc3QgY291bnQgPSBjb3VudE9mKHJlZikgLSAxXG4gICAgX3JlZnNbcmVmXSA9IE1hdGgubWF4KGNvdW50LCAwKVxuICB9XG4gIGZ1bmN0aW9uIGNvdW50T2YgKHJlZikge1xuICAgIHJldHVybiBfcmVmc1tyZWZdIHx8IDBcbiAgfVxuICBmdW5jdGlvbiByZWZzICgpIHtcbiAgICByZXR1cm4geyAuLi5fcmVmcyB9XG4gIH1cbiAgZnVuY3Rpb24gdGFibGUgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhfcmVmcykuc29ydCgpXG4gICAgICAubWFwKGtleSA9PiBba2V5LCBfcmVmc1trZXldXSlcbiAgICAgIC5tYXAoKFtyZWYsIGNvdW50XSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFtraW5kXTogcmVmLFxuICAgICAgICAgIHJlZnM6IGNvdW50IHx8ICdOb25lJ1xuICAgICAgICB9XG4gICAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHRvVmFsdWUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNjcmlwdGlvbjogYFN0YXRlYm90WyR7bmFtZX1dOiAke2Rlc2NyaXB0aW9ufTpgLFxuICAgICAgdGFibGU6IHRhYmxlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpbmNyZWFzZTogaW5jcmVhc2UsXG4gICAgZGVjcmVhc2U6IGRlY3JlYXNlLFxuICAgIGNvdW50T2Y6IGNvdW50T2YsXG4gICAgdG9WYWx1ZTogdG9WYWx1ZSxcbiAgICByZWZzOiByZWZzXG4gIH1cbn1cblxuZnVuY3Rpb24gQXJnVHlwZUVycm9yIChlcnJQcmVmaXggPSAnJykge1xuICByZXR1cm4gZnVuY3Rpb24gKGZuTmFtZSwgdHlwZU1hcCwgLi4uYXJncykge1xuICAgIGNvbnN0IGFyZ01hcCA9IE9iamVjdC5lbnRyaWVzKHR5cGVNYXApXG4gICAgICAubWFwKChbYXJnTmFtZSwgYXJnVHlwZV0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgYXJnTmFtZSwgYXJnVHlwZSB9XG4gICAgICB9KVxuXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gT2JqZWN0LmtleXModHlwZU1hcCkuam9pbignLCAnKVxuXG4gICAgY29uc3QgZXJyID0gYXJnc1xuICAgICAgLm1hcCgoYXJnLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB7IGFyZ05hbWUsIGFyZ1R5cGUgfSA9IGFyZ01hcFtpbmRleF1cbiAgICAgICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGBBcmd1bWVudCB1bmRlZmluZWQ6IFwiJHthcmdOYW1lfVwiYFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yRGVzY1xuICAgICAgICBsZXQgdHlwZU5hbWVcbiAgICAgICAgbGV0IHR5cGVNYXRjaGVzXG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdHlwZU1hdGNoZXMgPSBhcmdUeXBlKGFyZykgPT09IHRydWVcbiAgICAgICAgICB0eXBlTmFtZSA9IGFyZ1R5cGUubmFtZVxuICAgICAgICAgIGVycm9yRGVzYyA9IGAke3R5cGVOYW1lfSgke2FyZ05hbWV9KSBkaWQgbm90IHJldHVybiB0cnVlYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB2YWxpZC10eXBlb2ZcbiAgICAgICAgICB0eXBlTWF0Y2hlcyA9IHR5cGVvZiBhcmcgPT09IGFyZ1R5cGVcbiAgICAgICAgICB0eXBlTmFtZSA9IGFyZ1R5cGVcbiAgICAgICAgICBlcnJvckRlc2MgPSBgQXJndW1lbnQgXCIke2FyZ05hbWV9XCIgc2hvdWxkIGJlIGEgJHt0eXBlTmFtZX1gXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXR5cGVNYXRjaGVzKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGAke2Vycm9yRGVzY306ICR7YXJnTmFtZX0gPT09ICR7dHlwZW9mIGFyZ30oJHthcmd9KWBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG5cbiAgICBpZiAoIWVyci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgYFxcbiR7ZXJyUHJlZml4fSR7Zm5OYW1lfSgke3NpZ25hdHVyZX0pOlxcbmAgK1xuICAgICAgICBgJHtlcnIubWFwKGVyciA9PiBgPiAke2Vycn1gKS5qb2luKCdcXG4nKX1gXG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIExvZ2dlciAobGV2ZWwpIHtcbiAgbGV0IF9sZXZlbCA9IGxldmVsXG4gIGlmICh0eXBlb2YgX2xldmVsID09PSAnc3RyaW5nJykge1xuICAgIF9sZXZlbCA9ICh7XG4gICAgICBpbmZvOiAzLFxuICAgICAgbG9nOiAyLFxuICAgICAgd2FybjogMSxcbiAgICAgIG5vbmU6IDBcbiAgICB9KVtfbGV2ZWxdIHx8IDNcbiAgfVxuICBmdW5jdGlvbiBjYW5XYXJuICgpIHtcbiAgICByZXR1cm4gX2xldmVsID49IDFcbiAgfVxuICBmdW5jdGlvbiBjYW5Mb2cgKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gMlxuICB9XG4gIGZ1bmN0aW9uIGNhbkluZm8gKCkge1xuICAgIHJldHVybiBfbGV2ZWwgPj0gM1xuICB9XG4gIHJldHVybiB7XG4gICAgY2FuV2FybixcbiAgICBjYW5Mb2csXG4gICAgY2FuSW5mbyxcblxuICAgIGluZm86ICguLi5hcmdzKSA9PiBjYW5JbmZvKCkgJiYgY29uc29sZS5pbmZvKC4uLmFyZ3MpLFxuICAgIHRhYmxlOiAoLi4uYXJncykgPT4gY2FuTG9nKCkgJiYgY29uc29sZS50YWJsZSguLi5hcmdzKSxcbiAgICBsb2c6ICguLi5hcmdzKSA9PiBjYW5Mb2coKSAmJiBjb25zb2xlLmxvZyguLi5hcmdzKSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4gY2FuV2FybigpICYmIGNvbnNvbGUud2FybiguLi5hcmdzKSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IGNvbnNvbGUuZXJyb3IoLi4uYXJncylcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2V2ZW50c19fOyJdLCJzb3VyY2VSb290IjoiIn0=