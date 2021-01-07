
//
// STATEBOT UTILS
//

export {
  ArgTypeError,
  Defer,
  isArray,
  isEventEmitter,
  isFunction,
  isPojo,
  isString,
  isTemplateLiteral,
  Logger,
  Once,
  Pausables,
  ReferenceCounter,
  Revokable,
  uniq,
  wrapEmitter,
}

function wrapEmitter (events) {
  const emit = (eventName, ...args) =>
    events.emit(eventName, args)

  const addListener = events.addListener
    ? (...args) => events.addListener(...args)
    : (...args) => events.on(...args)

  const removeListener = events.removeListener
    ? (...args) => events.removeListener(...args)
    : (...args) => events.off(...args)

  const wrapMap = new Map()

  function on (eventName, fn) {
    let fnMeta = wrapMap.get(fn)
    if (!fnMeta) {
      fnMeta = {
        handleEvent: args => fn(...args || []),
        refCount: 0
      }
      wrapMap.set(fn, fnMeta)
    }

    fnMeta.refCount += 1
    addListener(eventName, fnMeta.handleEvent)
  }

  function off (eventName, fn) {
    let fnMeta = wrapMap.get(fn)
    if (!fnMeta) {
      return
    }

    removeListener(eventName, fnMeta.handleEvent)
    fnMeta.refCount -= 1
    if (fnMeta.refCount === 0) {
      wrapMap.delete(fn)
    }
  }

  return {
    emit,
    on,
    off
  }
}

//
// isType
//

function isEventEmitter (obj) {
  return (
    isObject(obj) &&
    isFunction(obj.emit) &&
    (isFunction(obj.addListener) || isFunction(obj.on)) &&
    (isFunction(obj.removeListener) || isFunction(obj.off))
  )
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
  if (!isArray(obj)) {
    return false
  }
  return obj.every(isString)
}

//
// uniq
//

function uniq (input) {
  return input.reduce((acc, one) =>
    acc.indexOf(one) === -1
      ? [...acc, one]
      : acc
    , []
  )
}

//
// defer
//

function defer (fn, ...args) {
  const timer = setTimeout(fn, 0, ...args)
  return () => { clearTimeout(timer) }
}

function Defer (fn) {
  return (...args) => defer(fn, ...args)
}

//
// Revokable
//

function Once (fn) {
  const { revoke, fn: _fn } = Revokable(fn)
  let result
  return function (...args) {
    result = _fn(...args)
    revoke()
    return result
  }
}

function Revokable (fn) {
  let revoked = false
  let result
  return {
    fn: (...args) => {
      if (!revoked) {
        result = fn(...args)
      }
      return result
    },
    revoke: () => {
      revoked = true
    }
  }
}

//
// Pausables
//

function Pausables (startPaused, runFnWhenPaused) {
  runFnWhenPaused = runFnWhenPaused || function () {}
  let paused = !!startPaused

  function Pausable (fn) {
    return (...args) => {
      if (paused) {
        runFnWhenPaused()
        return false
      }
      return fn(...args)
    }
  }

  return {
    Pausable,
    paused: () => paused,
    pause: () => { paused = true },
    resume: () => { paused = false },
  }
}

//
// ReferenceCounter
//

function ReferenceCounter (name, kind, description, ...expecting) {
  const _refs = [...expecting]
    .flat()
    .reduce((acc, ref) => ({ ...acc, [ref]: 0 }), {})

  function increase (ref) {
    _refs[ref] = countOf(ref) + 1
    return () => { decrease(ref) }
  }
  function decrease (ref) {
    const count = countOf(ref) - 1
    _refs[ref] = Math.max(count, 0)
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
    increase,
    decrease,
    countOf,
    toValue,
    refs
  }
}

//
// ArgTypeError
//

const typeErrorIfFnReturnsFalse = (argName, argTypeFn, arg) => {
  return argTypeFn(arg)
    ? undefined
    : `${argTypeFn.name}(${argName}) did not return true`
}

const typeErrorIfTypeOfFails = (argName, argType, arg) => {
  return typeof arg === argType
    ? undefined
    : `Argument "${argName}" should be a ${argType}`
}

const typeErrorFromArgument = (argMap, arg, index) => {
  const { argName, argType } = argMap[index]
  if (arg === undefined) {
    return `Argument undefined: "${argName}"`
  }

  const errorDesc = isFunction(argType)
    ? typeErrorIfFnReturnsFalse(argName, argType, arg)
    : typeErrorIfTypeOfFails(argName, argType, arg)

  if (errorDesc) {
    return (
      `${errorDesc}: ${argName} === ${typeof arg}(${arg})`
    )
  }
}

/**
 * Helper for enforcing correct argument-types.
 *
 * @private
 * @param {string} errPrefix
 *
 * @example
 * const argTypeError = ArgTypeError('namespace#')
 *
 * function myFn (myArg1, myArg2) {
 *   const err = argTypeError('myFn',
 *     { myArg1: isString, myArg2: Boolean },
 *     myArg1, myArg2
 *   )
 *   if (err) {
 *     throw new TypeError(err)
 *   }
 * }
 */

function ArgTypeError (errPrefix) {
  return function (fnName, typeMap, ...args) {
    const signature = Object.keys(typeMap).join(', ')
    const argMap = Object
      .entries(typeMap)
      .map(([argName, argType]) => ({ argName, argType }))

    const err = args
      .map((...args) => typeErrorFromArgument(argMap, ...args))
      .filter(Boolean)

    if (!err.length) {
      return
    }

    return (
      `\n${errPrefix || ''}${fnName}(${signature}):\n` +
      `${err.map(err => `> ${err}`).join('\n')}`
    )
  }
}

//
// Logger
//

function Logger (level, _console) {
  if (isString(level)) {
    level = ({
      info: 3,
      log: 2,
      warn: 1,
      none: 0
    })[level] || 3
  }
  function canWarn () {
    return level >= 1
  }
  function canLog () {
    return level >= 2
  }
  function canInfo () {
    return level >= 3
  }
  const { info, table, log, warn, error } = _console || console
  return {
    canWarn,
    canLog,
    canInfo,

    info: (...args) => { canInfo() && info(...args) },
    table: (...args) => { canLog() && table(...args) },
    log: (...args) => { canLog() && log(...args) },
    warn: (...args) => { canWarn() && warn(...args) },
    error: (...args) => { error(...args) }
  }
}
