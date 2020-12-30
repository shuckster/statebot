
const { Statebot } = require('../src/statebot')

const bot = Statebot('test-events-only', {
  chart: `

    idle -> pending ->
      (rejected | resolved) ->

    finished

  `,
  logLevel: 0
})

const EXPECTED_EVENT_ARITY_COUNT = 114

let callCount = 0
function bumpEventArityCount(...args) {
  callCount += args.length
}

bot.performTransitions({
  'idle -> pending': {
    on: 'start',
    then: bumpEventArityCount
  },
  'pending -> resolved': {
    on: 'pass',
    then: bumpEventArityCount
  },
  'pending -> rejected': {
    on: 'fail',
    then: bumpEventArityCount
  },
  'rejected | resolved -> finished': {
    on: 'done',
    then: bumpEventArityCount
  },
})

bot.onTransitions({
  'idle -> pending': bumpEventArityCount,
  'pending -> rejected | resolved': bumpEventArityCount,
  'rejected | resolved -> finished': bumpEventArityCount,
})

bot.onExiting('idle', bumpEventArityCount)
bot.onExited('idle', bumpEventArityCount)

bot.onEntering('pending', bumpEventArityCount)
bot.onEntered('pending', bumpEventArityCount)
bot.onExiting('pending', bumpEventArityCount)
bot.onExited('pending', bumpEventArityCount)

bot.onEntering('resolved', bumpEventArityCount)
bot.onEntered('resolved', bumpEventArityCount)
bot.onExiting('resolved', bumpEventArityCount)
bot.onExited('resolved', bumpEventArityCount)

bot.onEntering('rejected', bumpEventArityCount)
bot.onEntered('rejected', bumpEventArityCount)
bot.onExiting('rejected', bumpEventArityCount)
bot.onExited('rejected', bumpEventArityCount)

bot.onEntering('finished', bumpEventArityCount)
bot.onEntered('finished', bumpEventArityCount)
bot.onExiting('finished', bumpEventArityCount)
bot.onExited('finished', bumpEventArityCount)

test(`ran event callbacks with expected arity`, () => {
  //
  // Emit more events than required in order to test transition-guarding
  //

  bot.emit('start', 1, 2)
  bot.emit('start', 1, 2)
  bot.emit('start', 1, 2)
  bot.emit('pass', 1, 2, 3, 4)
  bot.emit('pass', 1, 2, 3, 4)
  bot.emit('pass', 1, 2, 3, 4)
  bot.emit('done', 1, 2, 3)
  bot.emit('done', 1, 2, 3)
  bot.emit('done', 1, 2, 3)

  bot.reset()

  bot.emit('start', 1)
  bot.emit('start', 1)
  bot.emit('start', 1)
  bot.emit('fail')
  bot.emit('fail')
  bot.emit('fail')
  bot.emit('done', 1, 2, 3, 4, 5)
  bot.emit('done', 1, 2, 3, 4, 5)
  bot.emit('done', 1, 2, 3, 4, 5)

  expect(callCount).toEqual(EXPECTED_EVENT_ARITY_COUNT)
})

