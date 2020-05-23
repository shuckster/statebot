
//
// STATEBOT UTILS
//

module.exports = {
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
  Logger
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
    isFunction(obj.addListener) &&
    isFunction(obj.removeListener)
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
  const timer = setTimeout(fn, 0, ...args)
  return () => {
    clearTimeout(timer)
  }
}
function Defer (fn) {
  return (...args) => defer(fn, ...args)
}

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

function ReferenceCounter (name, kind, description, ...expecting) {
  const _refs = {};
  [...expecting].flat().forEach(ref => {
    _refs[ref] = 0
  })
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
      })

    const signature = Object.keys(typeMap).join(', ')

    const err = args
      .map((arg, index) => {
        const { argName, argType } = argMap[index]
        if (arg === undefined) {
          return `Argument undefined: "${argName}"`
        }

        let errorDesc
        let typeName
        let typeMatches

        if (isFunction(argType)) {
          typeMatches = argType(arg) === true
          typeName = argType.name
          errorDesc = `${typeName}(${argName}) did not return true`
        } else {
          // eslint-disable-next-line valid-typeof
          typeMatches = typeof arg === argType
          typeName = argType
          errorDesc = `Argument "${argName}" should be a ${typeName}`
        }

        if (!typeMatches) {
          return (
            `${errorDesc}: ${argName} === ${typeof arg}(${arg})`
          )
        }
      })
      .filter(Boolean)

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
