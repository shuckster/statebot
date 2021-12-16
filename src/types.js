
//
// RUNTIME TYPE CHECKING
//

export {
  isArray,
  isEventEmitter,
  isFunction,
  isPojo,
  isString,
  isTemplateLiteral,
  isUndefined,
  ArgTypeError,
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

function isUndefined (obj) {
  return obj === undefined
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
// ArgTypeError
//

const typeErrorStringIfFnReturnsFalse = (argName, argTypeFn, arg) => {
  return argTypeFn(arg)
    ? undefined
    : `${argTypeFn.name}(${argName}) did not return true`
}

const typeErrorStringIfTypeOfFails = (argName, argType, arg) => {
  return typeof arg === argType
    ? undefined
    : `Argument "${argName}" should be a ${argType}`
}

const typeErrorStringFromArgument = (argMap, arg, index) => {
  const { argName, argType } = argMap[index]
  if (isUndefined(arg)) {
    return `Argument undefined: "${argName}"`
  }

  const permittedArgTypes = Array.isArray(argType)
    ? argType
    : [argType]

  const errorDescs = permittedArgTypes
    .map(argType => isFunction(argType)
      ? typeErrorStringIfFnReturnsFalse(argName, argType, arg)
      : typeErrorStringIfTypeOfFails(argName, argType, arg)
    )
    .filter(isString)

  const multipleTypesSpecified = permittedArgTypes.length > 1
  const shouldError = multipleTypesSpecified
    ? errorDescs.length > 1
    : errorDescs.length

  if (shouldError) {
    return (
      `${errorDescs.join('\n| ')}\n> typeof ${argName} === ${typeof arg}(${JSON.stringify(arg)})`
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
    const argMap = Object
      .entries(typeMap)
      .map(([argName, argType]) => ({ argName, argType }))

    const err = args
      .map((...args) => typeErrorStringFromArgument(argMap, ...args))
      .filter(isString)

    if (!err.length) {
      return
    }

    const signature = Object.keys(typeMap).join(', ')
    return (
      `\n${errPrefix || ''}${fnName}(${signature}):\n` +
      `${err.map(err => `| ${err}`).join('\n')}`
    )
  }
}
