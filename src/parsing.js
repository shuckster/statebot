
//
// STATEBOT CHART/ROUTE PARSING
//

const rxCRLF = /[\r\n]/
const cxPipe = '|'
const cxArrow = '->'
const rxOperators = [cxPipe, cxArrow]
  .map(rxUnsafe => rxUnsafe.replace('|', '\\|'))
  .join('|')

const rxLineContinations = new RegExp(`(${rxOperators})$`)
const rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi
const rxComment = /(\/\/[^\n\r]*)/

module.exports = {
  cxPipe,
  cxArrow,
  rxDisallowedCharacters,
  decomposeChart,
  decomposeRoute
}

const { uniq, ArgTypeError, isTemplateLiteral } = require('./utils')

const argTypeError = ArgTypeError('statebot.')

function decomposeRoute (templateLiteral) {
  const err = argTypeError('decomposeRoute',
    { templateLiteral: isTemplateLiteral },
    templateLiteral
  )
  if (err) {
    throw TypeError(err)
  }

  const lines = condensedLines(templateLiteral)
  const flattenedRoute = tokenisedLines(lines).flat(2)
  return flattenedRoute
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
  )
  if (err) {
    throw TypeError(err)
  }

  const lines = condensedLines(chart)
  const linesOfTokens = tokenisedLines(lines)
  const linesOfRoutes = linesOfTokens
    .map(decomposeRouteFromTokens)
    .flat(1)

  const linesOfTransitions = linesOfRoutes
    .map(decomposeTransitionsFromRoute)
    .flat(1)

  const states = []
  const routeKeys = linesOfTransitions.map(route => {
    states.push(...route)
    return route.join(cxArrow)
  })

  const filteredRoutes = uniq(routeKeys)
  const filteredStates = uniq(states)
  return {
    transitions: filteredRoutes.map(route => route.split(cxArrow)),
    routes: filteredRoutes,
    states: filteredStates
  }
}

function linesFrom (strOrArr) {
  return [strOrArr]
    .flat()
    .reduce((acc, line) => [...acc, line.split(rxCRLF)], [])
    .flat()
}

function condensedLines (strOrArr) {
  const input = linesFrom(strOrArr)
  const output = []

  input.reduce((condensedLine, line) => {
    const sanitisedLine = line
      .replace(rxComment, '')
      .replace(rxDisallowedCharacters, '')

    if (!sanitisedLine) {
      return condensedLine
    }

    if (rxLineContinations.test(sanitisedLine)) {
      return condensedLine + sanitisedLine
    }

    output.push(condensedLine + sanitisedLine)
    return ''
  }, '')

  return output
}

function tokenisedLines (lines) {
  return lines.map(line => line.split(cxArrow).map(str => str.split(cxPipe)))
}

function decomposeRouteFromTokens (line) {
  const output = []

  line.reduce((previousStates, states) => {
    if (previousStates === false) {
      return [...states]
    }

    output.push([previousStates, [...states]])
    return [...states]
  }, false)

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
