
const { Statebot } = require('../src/statebot')

const bot = Statebot('test-events-and-ordering', {
  chart: `

    idle -> pending ->
      (rejected | resolved) ->

    finished

  `,
  logLevel: 0
})

const EXPECTED_CALL_COUNT = 36

let callCount = 0
function bumpCallCount() {
  callCount += 1
}

bot.performTransitions({
  'idle -> pending': {
    on: 'start',
    then: bumpCallCount
  },
  'pending -> resolved': {
    on: 'pass',
    then: bumpCallCount
  },
  'pending -> rejected': {
    on: 'fail',
    then: bumpCallCount
  },
  'rejected | resolved -> finished': {
    on: 'done',
    then: bumpCallCount
  },
})

bot.onTransitions({
  'idle -> pending': bumpCallCount,
  'pending -> rejected | resolved': bumpCallCount,
  'rejected | resolved -> finished': bumpCallCount,
})

bot.onExiting('idle', bumpCallCount)
bot.onExited('idle', bumpCallCount)

bot.onEntering('pending', bumpCallCount)
bot.onEntered('pending', bumpCallCount)
bot.onExiting('pending', bumpCallCount)
bot.onExited('pending', bumpCallCount)

bot.onEntering('resolved', bumpCallCount)
bot.onEntered('resolved', bumpCallCount)
bot.onExiting('resolved', bumpCallCount)
bot.onExited('resolved', bumpCallCount)

bot.onEntering('rejected', bumpCallCount)
bot.onEntered('rejected', bumpCallCount)
bot.onExiting('rejected', bumpCallCount)
bot.onExited('rejected', bumpCallCount)

bot.onEntering('finished', bumpCallCount)
bot.onEntered('finished', bumpCallCount)
bot.onExiting('finished', bumpCallCount)
bot.onExited('finished', bumpCallCount)

//
// Emit more events than required in order to test transition-guarding
//

bot.emit('start')
bot.emit('start')
bot.emit('start')
bot.emit('pass')
bot.emit('pass')
bot.emit('pass')
bot.emit('done')
bot.emit('done')
bot.emit('done')

bot.reset()

bot.emit('start')
bot.emit('start')
bot.emit('start')
bot.emit('fail')
bot.emit('fail')
bot.emit('fail')
bot.emit('done')
bot.emit('done')
bot.emit('done')

// ...

test(`expecting this many callbacks to have run`, () => {
  expect(callCount).toEqual(EXPECTED_CALL_COUNT)
})

