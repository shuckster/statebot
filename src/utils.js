
//
// STATEBOT UTILS
//

export {
  isArray,
  isEventEmitter,
  isFunction,
  isPojo,
  isString,
  isTemplateLiteral,
  uniq,
  Defer,
  Once,
  Revokable,
  ReferenceCounter,
  ArgTypeError,
  Logger,
  Pausables
}

//
// isType
//

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
  return () => clearTimeout(timer)
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

function Pausables (startPaused = false, runFnWhenPaused = () => {}) {
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
    return () => decrease(ref)
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

function ArgTypeError (errPrefix = '') {
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
      `\n${errPrefix}${fnName}(${signature}):\n` +
      `${err.map(err => `> ${err}`).join('\n')}`
    )
  }
}

//
// Logger
//

function Logger (level) {
  let _level = level
  if (isString(_level)) {
    _level = ({
      info: 3,
      log: 2,
      warn: 1,
      none: 0
    })[_level] || 3
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
