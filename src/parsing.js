
//
// STATEBOT CHART/ROUTE PARSING
//

const cxPipe = '|'
const cxArrow = '->'

const rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi
const rxCRLF = /[\r\n]/
const rxComment = /(\/\/[^\n\r]*)/

const rxOperators = [cxPipe, cxArrow]
  .map(rxUnsafe => rxUnsafe.replace('|', '\\|'))
  .join('|')

const rxLineContinations = new RegExp(`(${rxOperators})$`)

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

  const rawLines = [templateLiteral].flat()
  const codeOnly = removeComments(rawLines)
  const lines = condenseLines(codeOnly)
  const flattenedRoute = sanitiseLines(lines).flat(2)
  return flattenedRoute
}

function decomposeChart (templateLiteral) {
  const err = argTypeError('decomposeChart',
    { templateLiteral: isTemplateLiteral },
    templateLiteral
  )
  if (err) {
    throw TypeError(err)
  }

  const rawLines = [templateLiteral].flat()
  const codeOnly = removeComments(rawLines)
  const lines = condenseLines(codeOnly)
  const linesToProcess = sanitiseLines(lines)
  const linesOfRoutes = linesToProcess
    .map(decomposeLineIntoRoute)
    .flat(1)
  const linesOfTransitions = linesOfRoutes
    .map(decomposeRouteIntoTransition)
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

function removeComments (arrayOfStrings) {
  return arrayOfStrings
    .reduce((acc, string) => {
      if (typeof string !== 'string') {
        return acc
      }
      return [
        ...acc,
        ...string.split(rxCRLF).map(part => part
          .replace(rxComment, ''))
      ]
    }, [])
    .filter(Boolean)
}

function condenseLines (lines) {
  return lines.reduce((acc, line) => rxLineContinations.test(line.trim())
    ? {
      lines: acc.lines,
      currentLine: acc.currentLine + line
    }
    : {
      lines: [...acc.lines, acc.currentLine + line],
      currentLine: ''
    }, {
    lines: [],
    currentLine: ''
  }).lines
}

function sanitiseLines (lines) {
  return lines.map(line => line.split(cxArrow).map(str => str
    .replace(rxDisallowedCharacters, '')
    .split(cxPipe)
    .map(part => part.trim())))
}

function decomposeLineIntoRoute (line) {
  return line.reduce((acc, states) =>
    acc === false
      ? {
        previousStates: [...states],
        pairs: []
      }
      : {
        previousStates: [...states],
        pairs: [...acc.pairs, [[...acc.previousStates], [...states]]]
      }, false)
    .pairs
}

function decomposeRouteIntoTransition ([fromStates, toStates]) {
  return fromStates.reduce((acc, fromState) => [
    ...acc,
    ...toStates.map(toState => {
      return [fromState, toState]
    })
  ], [])
}
