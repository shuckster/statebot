
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
