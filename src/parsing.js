
//
// STATEBOT CHART/ROUTE PARSING
//

const rxCRLF = /[\r\n]/
const cxPipe = '|'
const cxArrow = '->'
const rxOperators = [cxPipe, cxArrow]
  .map(rxUnsafe => rxUnsafe.replace('|', '\\|'))
  .join('|')

const rxLineContinuations = new RegExp(`(${rxOperators})$`)
const rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi
const rxComment = /(\/\/[^\n\r]*)/

export {
  cxPipe,
  cxArrow,
  rxDisallowedCharacters,
  decomposeChart,
  decomposeRoute
}

import { uniq } from './utils'
import { isTemplateLiteral, ArgTypeError } from './types'

const argTypeError = ArgTypeError('statebot.')

function decomposeRoute (templateLiteral) {
  const err = argTypeError(
    { templateLiteral: isTemplateLiteral }
  )('decomposeRoute')(templateLiteral)
  if (err) {
    throw TypeError(err)
  }

  const lines = condensedLines(templateLiteral)
  const linesOfTokens = tokenisedLines(lines)
  const route = linesOfTokens.flat(2)

  return route
}

function decomposeChart (chart) {
  const err = argTypeError(
    { chart: isTemplateLiteral }
  )('decomposeChart')(chart)
  if (err) {
    throw TypeError(err)
  }

  const lines = condensedLines(chart)
  const linesOfTokens = tokenisedLines(lines)
  const linesOfRoutes = linesOfTokens
    .flatMap(decomposeRouteFromTokens)

  const linesOfTransitions = linesOfRoutes
    .flatMap(decomposeTransitionsFromRoute)

  let emptyStateFound = false
  const routeKeys = linesOfTransitions.map(route => {
    if (route.includes('')) {
      emptyStateFound = true
    }
    return route.join(cxArrow)
  })

  const filteredRoutes = uniq(routeKeys)
  const filteredStates = uniq(linesOfTokens.flat(3))

  return {
    transitions: filteredRoutes.map(route => route.split(cxArrow)),
    routes: filteredRoutes,
    states: !emptyStateFound
      ? filteredStates.filter(Boolean)
      : filteredStates
  }
}

export function linesFrom (strOrArr) {
  return [strOrArr]
    .flat()
    .reduce((acc, line) => [...acc, ...line.split(rxCRLF)], [])
}

function condensedLines (strOrArr) {
  const input = linesFrom(strOrArr)
  const output = []

  let previousLineHasContinuation = false

  const condenseLine = (condensedLine, line) => {
    const sanitisedLine = line
      .replace(rxComment, '')
      .replace(rxDisallowedCharacters, '')

    if (!sanitisedLine) {
      return condensedLine
    }

    previousLineHasContinuation = rxLineContinuations
      .test(sanitisedLine)

    if (previousLineHasContinuation) {
      return condensedLine + sanitisedLine
    }

    output.push(condensedLine + sanitisedLine)
    return ''
  }

  const finalCondensedLine = input
    .reduce(condenseLine, '')

  if (previousLineHasContinuation || finalCondensedLine) {
    return [...output, finalCondensedLine]
  }

  return [...output]
}

function tokenisedLines (lines) {
  return lines
    .map(line => line
      .split(cxArrow)
      .map(str => str.split(cxPipe))
    )
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

function decomposeTransitionsFromRoute([fromStates, toStates]) {
  return fromStates.reduce(
    (acc, fromState) => (
      acc.push(...toStates.map(toState => [fromState, toState])), acc
    ),
    []
  )
}
