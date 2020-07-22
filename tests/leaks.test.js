
const { Statebot } = require('../src/statebot')

const bot = Statebot('event-handlers-should-be-removable', {
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

test(`expecting this many callbacks to have run`, () => {
  bot.emit('step')
  bot.emit('step')
  bot.emit('step')

  expect(callCount).toEqual(EXPECTED_CALL_COUNT)
})

test(`still expecting this many callbacks to have run`, () => {
  cleanupFns.forEach(fn => fn())

  bot.emit('step')
  bot.emit('step')
  bot.emit('step')

  expect(callCount).toEqual(EXPECTED_CALL_COUNT)
})
