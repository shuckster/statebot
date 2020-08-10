
/*
 * Statebot
 * v2.5.0
 * https://shuckster.github.io/statebot/
 * License: ISC
 */

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
EventEmitter.init = function() {
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
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};
function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}
function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}
EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = (type === 'error');
  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;
  domain = this.domain;
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
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
  if (!handler)
    return false;
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
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);
      events = target._events;
    }
    existing = events[type];
  }
  if (!existing) {
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
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
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
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
EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
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
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      events = this._events;
      if (!events)
        return this;
      list = events[type];
      if (!list)
        return this;
      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;
        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
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
        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }
      return this;
    };
EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;
      events = this._events;
      if (!events)
        return this;
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
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
  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }
  return ret;
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
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}
function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function isArray (obj) {
  return Array.isArray(obj)
}
function isFunction (obj) {
  return typeof obj === 'function'
}
function isString (obj) {
  return typeof obj === 'string'
}
function isObject (obj) {
  return typeof obj === 'object'
}
function isEventEmitter (obj) {
  return (
    isObject(obj) &&
    isFunction(obj.emit) &&
    (isFunction(obj.addListener) || isFunction(obj.on)) &&
    (isFunction(obj.removeListener) || isFunction(obj.off))
  )
}
function isPojo (obj) {
  if (obj === null || (!isObject(obj))) {
    return false
  }
  return Object.getPrototypeOf(obj) === Object.prototype
}
function isTemplateLiteral (obj) {
  if (isString(obj)) {
    return true
  }
  if (isArray(obj)) {
    return obj.every(item => isString(item))
  }
  return false
}
function uniq (input) {
  return input.reduce((acc, one) => (acc.indexOf(one) === -1 ? [...acc, one] : acc), [])
}
function defer (fn, ...args) {
  const timer = setTimeout(fn, 0, ...args);
  return () => {
    clearTimeout(timer);
  }
}
function Defer (fn) {
  return (...args) => defer(fn, ...args)
}
function Once (fn) {
  const { revoke, fn: _fn } = Revokable(fn);
  let result;
  return function (...args) {
    result = _fn(...args);
    revoke();
    return result
  }
}
function Revokable (fn) {
  let revoked = false;
  let result;
  return {
    fn: (...args) => {
      if (!revoked) {
        result = fn(...args);
      }
      return result
    },
    revoke: () => {
      revoked = true;
    }
  }
}
function Pausables (startPaused = false, onPauseCall = () => {}) {
  let paused = !!startPaused;
  function Pausable (fn) {
    return (...args) => {
      if (paused) {
        onPauseCall();
        return false
      }
      return fn(...args)
    }
  }
  return {
    Pausable,
    paused: () => paused,
    pause: () => { paused = true; },
    resume: () => { paused = false; },
  }
}
function ReferenceCounter (name, kind, description, ...expecting) {
  const _refs = {};
  [...expecting].flat().forEach(ref => {
    _refs[ref] = 0;
  });
  function increase (ref) {
    _refs[ref] = countOf(ref) + 1;
    return () => decrease(ref)
  }
  function decrease (ref) {
    const count = countOf(ref) - 1;
    _refs[ref] = Math.max(count, 0);
  }
  function countOf (ref) {
    return _refs[ref] || 0
  }
  function refs () {
    return { ..._refs }
  }
  function table () {
    return Object.keys(_refs).sort()
      .map(key => [key, _refs[key]])
      .map(([ref, count]) => {
        return {
          [kind]: ref,
          refs: count || 'None'
        }
      })
  }
  function toValue () {
    return {
      description: `Statebot[${name}]: ${description}:`,
      table: table()
    }
  }
  return {
    increase: increase,
    decrease: decrease,
    countOf: countOf,
    toValue: toValue,
    refs: refs
  }
}
function ArgTypeError (errPrefix = '') {
  return function (fnName, typeMap, ...args) {
    const argMap = Object.entries(typeMap)
      .map(([argName, argType]) => {
        return { argName, argType }
      });
    const signature = Object.keys(typeMap).join(', ');
    const err = args
      .map((arg, index) => {
        const { argName, argType } = argMap[index];
        if (arg === undefined) {
          return `Argument undefined: "${argName}"`
        }
        let errorDesc;
        let typeName;
        let typeMatches;
        if (isFunction(argType)) {
          typeMatches = argType(arg) === true;
          typeName = argType.name;
          errorDesc = `${typeName}(${argName}) did not return true`;
        } else {
          typeMatches = typeof arg === argType;
          typeName = argType;
          errorDesc = `Argument "${argName}" should be a ${typeName}`;
        }
        if (!typeMatches) {
          return (
            `${errorDesc}: ${argName} === ${typeof arg}(${arg})`
          )
        }
      })
      .filter(Boolean);
    if (!err.length) {
      return undefined
    } else {
      return (
        `\n${errPrefix}${fnName}(${signature}):\n` +
        `${err.map(err => `> ${err}`).join('\n')}`
      )
    }
  }
}
function Logger (level) {
  let _level = level;
  if (isString(_level)) {
    _level = ({
      info: 3,
      log: 2,
      warn: 1,
      none: 0
    })[_level] || 3;
  }
  function canWarn () {
    return _level >= 1
  }
  function canLog () {
    return _level >= 2
  }
  function canInfo () {
    return _level >= 3
  }
  return {
    canWarn,
    canLog,
    canInfo,
    info: (...args) => canInfo() && console.info(...args),
    table: (...args) => canLog() && console.table(...args),
    log: (...args) => canLog() && console.log(...args),
    warn: (...args) => canWarn() && console.warn(...args),
    error: (...args) => console.error(...args)
  }
}

const rxCRLF = /[\r\n]/;
const cxPipe = '|';
const cxArrow = '->';
const rxOperators = [cxPipe, cxArrow]
  .map(rxUnsafe => rxUnsafe.replace('|', '\\|'))
  .join('|');
const rxLineContinuations = new RegExp(`(${rxOperators})$`);
const rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
const rxComment = /(\/\/[^\n\r]*)/;
const argTypeError = ArgTypeError('statebot.');
function decomposeRoute (templateLiteral) {
  const err = argTypeError('decomposeRoute',
    { templateLiteral: isTemplateLiteral },
    templateLiteral
  );
  if (err) {
    throw TypeError(err)
  }
  const lines = condensedLines(templateLiteral);
  const linesOfTokens = tokenisedLines(lines);
  const route = linesOfTokens.flat(2);
  return route
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
function decomposeChart (chart) {
  const err = argTypeError('decomposeChart',
    { chart: isTemplateLiteral },
    chart
  );
  if (err) {
    throw TypeError(err)
  }
  const lines = condensedLines(chart);
  const linesOfTokens = tokenisedLines(lines);
  const linesOfRoutes = linesOfTokens
    .map(decomposeRouteFromTokens)
    .flat(1);
  const linesOfTransitions = linesOfRoutes
    .map(decomposeTransitionsFromRoute)
    .flat(1);
  let emptyStateFound = false;
  const routeKeys = linesOfTransitions.map(route => {
    if (route.includes('')) {
      emptyStateFound = true;
    }
    return route.join(cxArrow)
  });
  const filteredRoutes = uniq(routeKeys);
  const filteredStates = uniq(linesOfTokens.flat(3));
  return {
    transitions: filteredRoutes.map(route => route.split(cxArrow)),
    routes: filteredRoutes,
    states: !emptyStateFound ? filteredStates.filter(Boolean) : filteredStates
  }
}
function linesFrom (strOrArr) {
  return [strOrArr]
    .flat()
    .reduce((acc, line) => [...acc, line.split(rxCRLF)], [])
    .flat()
}
function condensedLines (strOrArr) {
  const input = linesFrom(strOrArr);
  const output = [];
  let previousLineHasContinuation = false;
  const finalCondensedLine = input.reduce((condensedLine, line) => {
    const sanitisedLine = line
      .replace(rxComment, '')
      .replace(rxDisallowedCharacters, '');
    if (!sanitisedLine) {
      return condensedLine
    }
    previousLineHasContinuation = rxLineContinuations.test(sanitisedLine);
    if (previousLineHasContinuation) {
      return condensedLine + sanitisedLine
    }
    output.push(condensedLine + sanitisedLine);
    return ''
  }, '');
  if (previousLineHasContinuation || finalCondensedLine) {
    return [...output, finalCondensedLine]
  }
  return [...output]
}
function tokenisedLines (lines) {
  return lines.map(line => line.split(cxArrow).map(str => str.split(cxPipe)))
}
function decomposeRouteFromTokens (line) {
  const output = [];
  line.reduce((previousStates, states) => {
    if (previousStates === false) {
      return [...states]
    }
    output.push([previousStates, [...states]]);
    return [...states]
  }, false);
  return output
}
function decomposeTransitionsFromRoute ([fromStates, toStates]) {
  return fromStates.reduce((acc, fromState) => [
    ...acc,
    ...toStates.map(toState => {
      return [fromState, toState]
    })
  ], [])
}

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
function Statebot (name, options) {
  if (!isString(name)) {
    throw TypeError('\nStatebot: Please specify a name for this machine')
  }
  const logPrefix = `Statebot[${name}]`;
  if (!isPojo(options)) {
    throw TypeError(`\n${logPrefix}: Please specify options for this machine`)
  }
  const {
    chart = undefined,
    logLevel = 3,
    historyLimit = 2
  } = options || {};
  const events = options.events === undefined
    ? new EventEmitter()
    : isEventEmitter(options.events) && wrapEmitter(options.events);
  if (!events) {
    throw TypeError(`\n${logPrefix}: Invalid event-emitter specified in options`)
  }
  const { states = [], routes = [] } = chart
    ? decomposeChart(chart)
    : options;
  const { startIn = states[0] } = options;
  if (!states.includes(startIn)) {
    throw Error(`${logPrefix}: Starting-state not in chart: "${startIn}"`)
  }
  const argTypeError = ArgTypeError(`${logPrefix}#`);
  const console = Logger(logLevel);
  const { canWarn } = console;
  const stateHistory = [startIn];
  const stateHistoryLimit = Math.max(historyLimit, 2);
  const internalEvents = new EventEmitter();
  const INTERNAL_EVENTS = {
    onSwitching: '(ANY)state:changing',
    onSwitched: '(ANY)state:changed'
  };
  let transitionId = 0;
  const { pause, resume, paused, Pausable } = Pausables(false, () =>
    console.warn(`${logPrefix}: Ignoring callback, paused`)
  );
  const emitInternalEvent = Pausable((eventName, ...args) =>
    internalEvents.emit(eventName, ...args)
  );
  function onInternalEvent (eventName, cb) {
    internalEvents.addListener(eventName, cb);
    return () => internalEvents.removeListener(eventName, cb)
  }
  const statesHandled = ReferenceCounter(
    name,
    'states',
    'Listening for the following state-changes',
    [...states]
  );
  const routesHandled = ReferenceCounter(
    name,
    'transitions',
    'Listening for the following transitions',
    [...routes]
  );
  const eventsHandled = ReferenceCounter(
    name,
    'events',
    'Listening for the following events'
  );
  function applyHitcher (hitcher, fnName) {
    const hitcherActions =
      isFunction(hitcher)
        ? hitcher({ enter, emit, Enter, Emit })
        : isPojo(hitcher) ? hitcher : null;
    if (!isPojo(hitcherActions)) {
      throw TypeError(
        `Statebot[${name}]#${fnName}(): Expected an object, or a function that returns an object`
      )
    }
    const events = {};
    const transitions = [];
    Object.entries(hitcherActions)
      .forEach(([routeChart, actionOrConfig]) => {
        if (isFunction(actionOrConfig)) {
          transitions.push({ routeChart, action: actionOrConfig });
        } else if (!isPojo(actionOrConfig)) {
          return
        }
        const { on: _on, then: _then } = actionOrConfig;
        if (isString(_on) || isArray(_on)) {
          const eventNames = [_on].flat();
          eventNames.forEach(eventName => {
            events[eventName] = events[eventName] || [];
            events[eventName].push({ routeChart, action: _then });
          });
        } else if (isFunction(_then)) {
          transitions.push({ routeChart, action: actionOrConfig });
        }
      });
    const allStates = [];
    const allRoutes = [];
    const allCleanupFns = [];
    const decomposedEvents = Object.entries(events)
      .reduce((acc, [eventName, _configs]) => {
        const { states, routes, configs } = decomposeConfigs(_configs, canWarn);
        if (canWarn()) {
          allStates.push(...states);
          allRoutes.push(...routes);
        }
        return {
          ...acc,
          [eventName]: configs
        }
      }, {});
    const ifStateThenEnterState = ({ fromState, toState, action, args }) =>
      inState(fromState, () => {
        enter(toState, ...args);
        isFunction(action) && action(...args);
        return true
      });
    allCleanupFns.push(
      ...Object.entries(decomposedEvents)
        .map(([eventName, configs]) => [
          eventsHandled.increase(eventName),
          onEvent(eventName, (...args) => {
            const eventWasHandled = configs
              .map(config => ({ ...config, args }))
              .some(ifStateThenEnterState);
            if (!eventWasHandled) {
              transitionNoOp(`Event not handled: "${eventName}"`);
            }
          })
        ])
        .flat()
    );
    const transitionConfigs = decomposeConfigs(transitions, canWarn);
    if (canWarn()) {
      allStates.push(...transitionConfigs.states);
      allRoutes.push(...transitionConfigs.routes);
    }
    allCleanupFns.push(
      ...transitionConfigs.configs
        .map(transition => {
          const { fromState, toState, action } = transition;
          const route = `${fromState}->${toState}`;
          return [
            routesHandled.increase(route),
            onInternalEvent(route, action)
          ]
        })
        .flat()
    );
    if (canWarn()) {
      const invalidStates = allStates.filter(state => !states.includes(state));
      const invalidRoutes = allRoutes.filter(route => !routes.includes(route));
      if (invalidStates.length) {
        console.warn(
          `Statebot[${name}]#${fnName}(): Invalid states specified:\n` +
          invalidStates.map(state => `  > "${state}"`).join('\n')
        );
      }
      if (invalidRoutes.length) {
        console.warn(
          `Statebot[${name}]#${fnName}(): Invalid transitions specified:\n` +
          invalidRoutes.map(route => `  > "${route}"`).join('\n')
        );
      }
    }
    return () => allCleanupFns.forEach(fn => fn())
  }
  function previousState () {
    return stateHistory[stateHistory.length - 2]
  }
  function currentState () {
    return stateHistory[stateHistory.length - 1]
  }
  function canTransitionTo (...states) {
    const testStates = states.flat();
    const err = argTypeError('canTransitionTo', { state: isString }, testStates[0]);
    if (err) {
      throw TypeError(err)
    }
    if (!testStates.length) {
      return false
    }
    const nextStates = statesAvailableFromHere();
    return testStates.every(state => nextStates.includes(state))
  }
  function statesAvailableFromHere (state) {
    const _state = state !== undefined
      ? state
      : currentState();
    const err = argTypeError('statesAvailableFromHere', { state: isString }, _state);
    if (err) {
      throw TypeError(err)
    }
    return routes.reduce((acc, route) => {
      const [fromState, toState] = route.split(cxArrow)
        .map(state => state.trim());
      return (fromState === _state)
        ? [...acc, toState]
        : acc
    }, [])
  }
  function inState (state, anyOrFn, ...fnArgs) {
    const err = argTypeError('inState', { state: isString }, state);
    if (err) {
      throw TypeError(err)
    }
    const conditionMatches = currentState() === state;
    if (anyOrFn === undefined) {
      return conditionMatches
    }
    if (!conditionMatches) {
      return null
    }
    if (isFunction(anyOrFn)) {
      return anyOrFn(...fnArgs)
    }
    return anyOrFn
  }
  const emit = Pausable((eventName, ...args) => {
    const err = argTypeError('emit', { eventName: isString }, eventName);
    if (err) {
      throw TypeError(err)
    }
    return events.emit(eventName, ...args)
  });
  const enter = Pausable((state, ...args) => {
    const err = argTypeError('enter', { state: isString }, state);
    if (err) {
      throw TypeError(err)
    }
    const inState = currentState();
    const toState = state;
    if (toState === inState) {
      transitionNoOp(`Already in state: "${toState}"`);
      return false
    }
    if (!states.includes(toState)) {
      transitionNoOp(`Invalid state "${toState}", not switching`);
      return false
    }
    const nextRoute = `${inState}->${toState}`;
    if (!routes.includes(nextRoute)) {
      transitionNoOp(`Invalid transition "${nextRoute}", not switching`);
      return false
    }
    console.info(`${logPrefix}: tId<${++transitionId}>: ${nextRoute}`);
    stateHistory.push(toState);
    if (stateHistory.length > stateHistoryLimit) {
      stateHistory.shift();
    }
    emitInternalEvent(INTERNAL_EVENTS.onSwitching, toState, inState, ...args);
    emitInternalEvent(nextRoute, ...args);
    emitInternalEvent(INTERNAL_EVENTS.onSwitched, toState, inState, ...args);
    return true
  });
  function onEvent (eventName, cb) {
    const err = argTypeError('onEvent', { eventName: isString, cb: isFunction }, eventName, cb);
    if (err) {
      throw TypeError(err)
    }
    events.addListener(eventName, cb);
    return () => events.removeListener(eventName, cb)
  }
  const switchMethods = Object
    .keys(INTERNAL_EVENTS)
    .reduce((obj, methodName) => ({
      ...obj,
      [methodName]: cb => {
        const err = argTypeError(methodName, { cb: isFunction }, cb);
        if (err) {
          throw TypeError(err)
        }
        const decreaseRefCount = statesHandled.increase(
          INTERNAL_EVENTS[methodName]
        );
        const removeEvent = onInternalEvent(
          INTERNAL_EVENTS[methodName], cb
        );
        return () => {
          removeEvent();
          decreaseRefCount();
        }
      }
    }), {});
  const enterExitMethods = [
    ['Exiting', 'onSwitching'],
    ['Entering', 'onSwitching'],
    ['Exited', 'onSwitched'],
    ['Entered', 'onSwitched']
  ]
    .reduce((obj, names) => {
      const [name, switchMethod] = names;
      const methodName = `on${name}`;
      const eventName = name.toLowerCase();
      return {
        ...obj,
        [methodName]: (state, cb) => {
          const err = argTypeError(methodName, { state: isString, cb: isFunction }, state, cb);
          if (err) {
            throw TypeError(err)
          }
          const decreaseRefCounts = [
            statesHandled.increase(state),
            statesHandled.increase(`${state}:${eventName}`)
          ];
          const removeEvent = switchMethods[switchMethod](
            (toState, fromState, ...args) => {
              if (name.indexOf('Exit') === 0) {
                if (state === fromState) {
                  cb(toState, ...args);
                }
              } else {
                if (state === toState) {
                  cb(fromState, ...args);
                }
              }
            }
          );
          return () => {
            removeEvent();
            decreaseRefCounts.map(fn => fn());
          }
        }
      }
    }, {});
  function Emit (eventName, ...curriedArgs) {
    const err = argTypeError('Emit', { eventName: isString }, eventName);
    if (err) {
      throw TypeError(err)
    }
    return (...args) => emit(eventName, ...[...curriedArgs, ...args])
  }
  function Enter (state, ...curriedArgs) {
    const err = argTypeError('Enter', { state: isString }, state);
    if (err) {
      throw TypeError(err)
    }
    return (...args) => enter(state, ...[...curriedArgs, ...args])
  }
  function InState (state, anyOrFn, ...curriedFnArgs) {
    const err = argTypeError('InState', { state: isString }, state);
    if (err) {
      throw TypeError(err)
    }
    return (...fnArgs) =>
      inState(state, anyOrFn, ...[...curriedFnArgs, ...fnArgs])
  }
  function reset () {
    console.warn(`${logPrefix}: State-machine reset!`);
    stateHistory.length = 0;
    stateHistory.push(startIn);
  }
  function transitionNoOp (message) {
    const lastState = previousState();
    const inState = currentState();
    const prevRoute =
      `${lastState === undefined ? '[undefined]' : lastState}->${inState}`;
    const availableStates = statesAvailableFromHere();
    if (!availableStates.length) {
      console.info(
        `${logPrefix}: ${message}\n` +
          `  > Previous transition: "${prevRoute}"\n` +
          `  > There are no states available from "${inState}"`
      );
    } else {
      console.info(
        `${logPrefix}: ${message}\n` +
          `  > Previous transition: "${prevRoute}"\n` +
          `  > From "${inState}", valid states are: [${availableStates
            .map(state => `"${state}"`)
            .join(', ')}]`
      );
    }
  }
  function inspect () {
    return {
      states: statesHandled.refs(),
      transitions: routesHandled.refs(),
      events: eventsHandled.refs()
    }
  }
  function info () {
    console.log(`${logPrefix}: Information about this state-machine`);
    logRefCounterInfo(statesHandled);
    logRefCounterInfo(routesHandled);
    logRefCounterInfo(eventsHandled);
  }
  function logRefCounterInfo (refCounter) {
    const { description, table } = refCounter.toValue();
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
    history: () => [...stateHistory],
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
    info: () => info(),
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
    inspect: () => inspect(),
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
    name: () => name,
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
    onTransitions: transitions => applyHitcher(transitions, 'onTransitions'),
    /**
     * Pause the machine. {@link #statebotfsmemit|.emit()} and {@link #statebotfsmenter|.enter()} will be no-ops until
     * the machine is {@link #statebotfsmresume|.resume()}'d.
     *
     * @memberof statebotFsm
     * @instance
     * @function
     */
    pause,
    /**
     * Returns `true` if the machine is {@link #statebotfsmpause|.pause()}'d
     *
     * @memberof statebotFsm
     * @instance
     * @function
     * @returns {boolean}
     */
    paused,
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
    performTransitions: transitions => applyHitcher(transitions, 'performTransitions'),
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
    resume,
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
  }
}
function decomposeConfigs (configs, canWarn) {
  const allStates = [];
  const allRoutes = [];
  const _configs = configs.reduce((acc, config) => {
    const { routeChart, action } = config;
    const { states, routes, transitions } = decomposeChart(routeChart);
    if (canWarn()) {
      allStates.push(...states);
      allRoutes.push(...routes);
    }
    return [
      ...acc,
      ...transitions.map(transition => {
        const [fromState, toState] = transition;
        return { fromState, toState, action }
      })
    ]
  }, []);
  return {
    configs: _configs,
    states: allStates,
    routes: allRoutes
  }
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
function isStatebot (object) {
  return (
    isPojo(object) &&
    typeof object.__STATEBOT__ === 'number'
  )
}
function wrapEmitter (events) {
  const addListener = events.addListener || events.on;
  const removeListener = events.removeListener || events.off;
  return {
    addListener,
    removeListener
  }
}

const argTypeError$1 = ArgTypeError('statebot.');
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
function routeIsPossible (machine, route) {
  const err = argTypeError$1('routeIsPossible',
    { machine: isStatebot, route: isTemplateLiteral },
    machine, route
  );
  if (err) {
    throw TypeError(err)
  }
  const _route = decomposeRoute(route);
  return _route.every((state, index) => {
    if (index === _route.length - 1) {
      return true
    } else {
      const nextState = _route[index + 1];
      const availableStates = machine.statesAvailableFromHere(state);
      const passes = availableStates.includes(nextState);
      return passes
    }
  })
}
let assertionId = 0;
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
function assertRoute (machine, expectedRoute, options) {
  const err = argTypeError$1('assertRoute',
    { machine: isStatebot, expectedRoute: isTemplateLiteral },
    machine, expectedRoute
  );
  if (err) {
    throw TypeError(err)
  }
  assertionId += 1;
  const {
    description = 'Assertion complete',
    fromState = '',
    run = () => {},
    permittedDeviations = 0,
    timeoutInMs = 1000,
    logLevel = 3
  } = options || {};
  const console = Logger(logLevel);
  const prefix = `Statebot[${machine.name()}]: aId<${assertionId}>`;
  const route = decomposeRoute(expectedRoute);
  console.log(`\n${prefix}: Asserting route: [${route.join(' > ')}]`);
  console.log(`${prefix}: > Assertion will start from state: "${fromState}"`);
  const fromStateActionFn = Defer(run);
  let removeFromStateActionFn = () => { };
  const totalTimeTaken = TimeTaken();
  let stateTimeTaken = TimeTaken();
  let assertionTimeoutTimer;
  let deviations = 0;
  let pending = true;
  let unexpected = false;
  const consumeRoute = [...route];
  const report = Table(
    ['state', 'expected', 'info', 'took'],
    ['center', 'center', 'left', 'right']
  );
  const finaliseReport = Once(err => {
    addRow('', '', '', 'TOTAL: ' + totalTimeTaken());
    report.lock();
    console.log(`\n${prefix}: ${description}: [${err ? 'FAILED' : 'SUCCESS'}]`);
    console.table(report.content());
    return err
  });
  const { addRow } = report;
  function enteredState (state) {
    if (pending) {
      addRow(state, '-', 'PENDING');
    } else {
      const expectedState = consumeRoute[0];
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
  return new Promise((resolve, reject) => {
    if (consumeRoute.length === 0) {
      reject(finaliseReport(new Error('NO ROUTE TO TEST')));
      return
    }
    const clearTimeoutAndResolve = (...args) => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      resolve(...args);
    };
    const clearTimeoutAndReject = err => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      reject(err);
    };
    const bailout = message => {
      while (consumeRoute.length) {
        const expectedState = consumeRoute.shift();
        addRow(machine.currentState(), `(${expectedState})`, message);
        unexpected = false;
      }
      clearTimeoutAndReject(finaliseReport(new Error(message)));
    };
    if (machine.inState(fromState)) {
      pending = false;
      removeFromStateActionFn = fromStateActionFn();
    }
    const { revoke, fn } = Revokable(state => {
      assertionTimeoutTimer = setTimeout(() => {
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
    });
    const removeOnSwitchingListener = machine.onSwitching(fn);
  })
}
function Table (columns = [], alignments = []) {
  const table = [];
  const alignment = columns.map((_, index) => alignments[index] || 'center');
  let locked = false;
  function lock () {
    locked = true;
  }
  function addRow (...args) {
    if (locked) {
      return
    }
    const obj = columns.reduce((acc, col, index) => {
      const row = args[index] || '';
      return {
        ...acc,
        [col]: row
      }
    }, {});
    table.push(obj);
  }
  function colSizes () {
    return table.reduce((acc, row) => columns.map((col, index) => Math.max(row[col].length, acc[index])), columns.map(() => 0))
  }
  function padLeft (str, len) {
    return str + ' '.repeat(len - str.length)
  }
  function padRight (str, len) {
    return ' '.repeat(len - str.length) + str
  }
  function content () {
    const sizes = colSizes();
    function formatField (value, index) {
      const size = sizes[index];
      const align = alignment[index];
      if (align === 'left') {
        return padLeft(value, size)
      }
      if (align === 'right') {
        return padRight(value, size)
      }
      return value
    }
    const output = table.reduce((acc, row) => {
      const formattedRow = columns.reduce((acc, col, index) => ({
        ...acc,
        [col]: formatField(row[col], index)
      }), {});
      return [...acc, formattedRow]
    }, []);
    return output
  }
  return {
    lock: lock,
    addRow: addRow,
    content: content
  }
}
function TimeTaken () {
  const startTime = Date.now();
  function fmt (num, digits) {
    return num.toFixed(digits).replace(/\.0+$/, '')
  }
  return function () {
    const duration = Date.now() - startTime;
    if (duration < 500) {
      return `${fmt(duration)} ms`
    } else if (duration < 5000) {
      return `${fmt(duration / 1000, 2)} s `
    } else if (duration < 60000) {
      return `${fmt(duration / 1000, 1)} s `
    } else {
      return `${fmt(duration / 1000 / 60, 1)} m `
    }
  }
}

export { Statebot, assertRoute, decomposeChart, isStatebot, routeIsPossible };
//# sourceMappingURL=statebot.js.map
