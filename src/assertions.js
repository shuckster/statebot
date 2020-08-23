
//
// STATEBOT ASSERTION HELPERS
//

export {
  routeIsPossible,
  assertRoute
}

import { isStatebot } from './statebot'
import { decomposeRoute } from './parsing'
import {
  Defer,
  Once,
  Revokable,
  Logger,
  ArgTypeError,
  isTemplateLiteral
} from './utils'

const argTypeError = ArgTypeError('statebot.')

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
  const err = argTypeError('routeIsPossible',
    { machine: isStatebot, route: isTemplateLiteral },
    machine, route
  )
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
  const err = argTypeError('assertRoute',
    { machine: isStatebot, expectedRoute: isTemplateLiteral },
    machine, expectedRoute
  )
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

function Table (columns = [], alignments = []) {
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

  function padLeft (str, len) {
    return str + ' '.repeat(len - str.length)
  }

  function padRight (str, len) {
    return ' '.repeat(len - str.length) + str
  }

  function content () {
    const sizes = colSizes()
    function formatField (value, index) {
      const size = sizes[index]
      const align = alignment[index]
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
