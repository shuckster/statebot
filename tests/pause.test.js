
const { Statebot } = require('../src/statebot')

const bot = Statebot('pause-and-resume-should-work', {
  chart: `

    idle -> next -> idle

  `,
  logLevel: 0
})

let callCount = 0
function bumpCallCount() {
  callCount += 1
}

const cleanupFns = [
  bot.performTransitions({
    'idle -> next -> idle': {
      on: 'step',
      then: bumpCallCount
    }
  }),

  bot.onTransitions({
    'idle -> next -> idle': bumpCallCount
  }),

  bot.onSwitching(bumpCallCount),
  bot.onSwitched(bumpCallCount),
  bot.onEntering('next', bumpCallCount),
  bot.onEntered('next', bumpCallCount),
  bot.onExiting('idle', bumpCallCount),
  bot.onExited('idle', bumpCallCount)
]

const EXPECTED_CALL_COUNT = 20
const EXPECTED_CALL_COUNT_AFTER_PAUSING = 20
const EXPECTED_CALL_COUNT_AFTER_RESUMING = 36
const EXPECTED_CALL_COUNT_AFTER_CLEANUP = 36

test(`expecting not to be paused by default`, () => {
  expect(false).toEqual(bot.paused())
})

test(`expecting this many callbacks to have run`, () => {
  bot.emit('step')
  bot.emit('step')
  bot.emit('step')

  expect(callCount).toEqual(EXPECTED_CALL_COUNT)
})

test(`still expecting this many callbacks to have run`, () => {
  bot.pause()

  expect(true).toEqual(bot.paused())

  bot.emit('step')
  bot.emit('step')
  bot.emit('step')

  expect(callCount).toEqual(EXPECTED_CALL_COUNT_AFTER_PAUSING)
})

test(`expecting a few more callbacks to have run after resuming`, () => {
  bot.resume()

  expect(false).toEqual(bot.paused())

  bot.emit('step')
  bot.emit('step')
  bot.emit('step')

  expect(callCount).toEqual(EXPECTED_CALL_COUNT_AFTER_RESUMING)
})

test(`expecting NO more callbacks to have run after cleanup`, () => {
  cleanupFns.forEach(fn => fn())

  expect(callCount).toEqual(EXPECTED_CALL_COUNT_AFTER_CLEANUP)
})
