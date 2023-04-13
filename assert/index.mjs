
//
// STATEBOT ASSERTION HELPERS
//

export {
  routeIsPossible,
  assertRoute
}

import { isStatebot } from '../src/statebot'
import { decomposeRoute } from '../src/parsing'
import { isTemplateLiteral, ArgTypeError } from '../src/types'
import {
  Defer,
  Once,
  Revokable,
  Logger,
} from '../src/utils'

const argTypeError = ArgTypeError('statebot.')

function routeIsPossible (machine, route) {
  const err = argTypeError(
    { machine: isStatebot, route: isTemplateLiteral }
  )('routeIsPossible')(machine, route)
  if (err) {
    throw TypeError(err)
  }

  const _route = decomposeRoute(route)
  return _route.every((state, index) => {
    if (index === _route.length - 1) {
      return true
    } else {
      const nextState = _route[index + 1]
      const availableStates = machine.statesAvailableFromHere(state)
      const passes = availableStates.includes(nextState)
      return passes
    }
  })
}

let assertionId = 0

function assertRoute (machine, expectedRoute, options) {
  const err = argTypeError(
    { machine: isStatebot, expectedRoute: isTemplateLiteral }
  )('assertRoute')(machine, expectedRoute)
  if (err) {
    throw TypeError(err)
  }

  assertionId += 1

  const {
    description = 'Assertion complete',
    fromState = '',
    run = () => {},
    permittedDeviations = 0,
    timeoutInMs = 1000,
    logLevel = 3
  } = options || {}

  const console = Logger(logLevel)

  const prefix = `Statebot[${machine.name()}]: aId<${assertionId}>`
  const route = decomposeRoute(expectedRoute)

  console.log(`\n${prefix}: Asserting route: [${route.join(' > ')}]`)
  console.log(`${prefix}: > Assertion will start from state: "${fromState}"`)

  const fromStateActionFn = Defer(run)
  let removeFromStateActionFn = () => { }

  const totalTimeTaken = TimeTaken()
  let stateTimeTaken = TimeTaken()
  let assertionTimeoutTimer
  let deviations = 0
  let pending = true
  let unexpected = false

  const consumeRoute = [...route]
  const report = Table(
    ['state', 'expected', 'info', 'took'],
    ['center', 'center', 'left', 'right']
  )

  const finaliseReport = Once(err => {
    addRow('', '', '', 'TOTAL: ' + totalTimeTaken())
    report.lock()
    console.log(`\n${prefix}: ${description}: [${err ? 'FAILED' : 'SUCCESS'}]`)
    console.table(report.content())
    return err
  })

  const { addRow } = report
  function enteredState (state) {
    if (pending) {
      addRow(state, '-', 'PENDING')
    } else {
      const expectedState = consumeRoute[0]
      if (expectedState === state) {
        addRow(state, expectedState, unexpected ? 'REALIGNED' : 'OKAY', stateTimeTaken())
        unexpected = false
        consumeRoute.shift()
      } else {
        addRow(state, expectedState, 'WRONG STATE', stateTimeTaken())
        unexpected = true
        deviations += 1
      }
      stateTimeTaken = TimeTaken()
    }
  }

  return new Promise((resolve, reject) => {
    if (consumeRoute.length === 0) {
      reject(finaliseReport(new Error('NO ROUTE TO TEST')))
      return
    }

    const clearTimeoutAndResolve = (...args) => {
      clearTimeout(assertionTimeoutTimer)
      removeFromStateActionFn()
      removeOnSwitchingListener()
      resolve(...args)
    }

    const clearTimeoutAndReject = err => {
      clearTimeout(assertionTimeoutTimer)
      removeFromStateActionFn()
      removeOnSwitchingListener()
      reject(err)
    }

    const bailout = message => {
      while (consumeRoute.length) {
        const expectedState = consumeRoute.shift()
        addRow(machine.currentState(), `(${expectedState})`, message)
        unexpected = false
      }
      clearTimeoutAndReject(finaliseReport(new Error(message)))
    }

    if (machine.inState(fromState)) {
      pending = false
      removeFromStateActionFn = fromStateActionFn()
    }

    const { revoke, fn } = Revokable(state => {
      assertionTimeoutTimer = setTimeout(() => {
        revoke()
        bailout('TIMEOUT')
      }, timeoutInMs)

      enteredState(state)
      if (pending && state === fromState) {
        pending = false
        removeFromStateActionFn = fromStateActionFn()
      }
      if (deviations > permittedDeviations) {
        revoke()
        bailout('TOO MANY DEVIATIONS')
      }
      if (consumeRoute.length <= 0) {
        revoke()
        clearTimeoutAndResolve(finaliseReport())
      }
    })

    const removeOnSwitchingListener = machine.onSwitching(fn)
  })
}

function Table (columns, alignments) {
  columns = columns || []
  alignments = alignments || []

  const table = []
  const alignment = columns.map((_, index) => alignments[index] || 'center')

  let locked = false
  function lock () {
    locked = true
  }

  function addRow (...args) {
    if (locked) {
      return
    }
    const obj = columns.reduce((acc, col, index) => {
      const row = args[index] || ''
      return {
        ...acc,
        [col]: row
      }
    }, {})
    table.push(obj)
  }

  function colSizes () {
    return table.reduce(
      (acc, row) => columns.map(
        (col, index) => Math.max(row[col].length, acc[index])
      ), columns.map(() => 0)
    )
  }

  function content () {
    const sizes = colSizes()
    function formatField (value, index) {
      const size = sizes[index]
      const align = alignment[index]
      if (align === 'left') {
        return value.padEnd(size)
      }
      if (align === 'right') {
        return value.padStart(size)
      }
      return value
    }
    const output = table.reduce((acc, row) => {
      const formattedRow = columns.reduce((acc, col, index) => ({
        ...acc,
        [col]: formatField(row[col], index)
      }), {})
      return [...acc, formattedRow]
    }, [])
    return output
  }

  return {
    lock: lock,
    addRow: addRow,
    content: content
  }
}

function TimeTaken () {
  const startTime = Date.now()

  function fmt (num, digits) {
    return num.toFixed(digits).replace(/\.0+$/, '')
  }

  return function () {
    const duration = Date.now() - startTime

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
