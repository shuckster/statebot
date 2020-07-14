
const { Statebot } = require('../src/statebot')

const bot = Statebot('test-events-and-ordering', {
  chart: `

    idle -> pending ->
      (rejected | resolved) ->

    finished

  `,
  logLevel: 0
})

const EXPECTED_CALL_ORDER = [
  'idle :: onExiting',
  'pending :: onEntering',
  'pending :: onTransition :: callback',
  'idle :: onExited',
  'pending :: onEntered',
  'pending :: performTransition :: then',
  'pending :: onExiting',
  'resolved :: onEntering',
  'rejected | resolved :: onTransition :: callback',
  'pending :: onExited',
  'resolved :: onEntered',
  'resolved :: performTransition :: then',
  'resolved :: onExiting',
  'finished :: onEntering',
  'finished :: onTransition :: callback',
  'resolved :: onExited',
  'finished :: onEntered',
  'finished :: performTransition :: then',
  'idle :: onExiting',
  'pending :: onEntering',
  'pending :: onTransition :: callback',
  'idle :: onExited',
  'pending :: onEntered',
  'pending :: performTransition :: then',
  'pending :: onExiting',
  'rejected :: onEntering',
  'rejected | resolved :: onTransition :: callback',
  'pending :: onExited',
  'rejected :: onEntered',
  'rejected :: performTransition :: then',
  'rejected :: onExiting',
  'finished :: onEntering',
  'finished :: onTransition :: callback',
  'rejected :: onExited',
  'finished :: onEntered',
  'finished :: performTransition :: then'
]

const calls = []

function Called (eventName) {
  return () => {
    calls.push(eventName)
  }
}

bot.performTransitions({
  'idle -> pending': {
    on: 'start',
    then: Called('pending :: performTransition :: then')
  },
  'pending -> resolved': {
    on: 'pass',
    then: Called('resolved :: performTransition :: then')
  },
  'pending -> rejected': {
    on: 'fail',
    then: Called('rejected :: performTransition :: then')
  },
  'rejected | resolved -> finished': {
    on: 'done',
    then: Called('finished :: performTransition :: then')
  },
})

bot.onTransitions({
  'idle -> pending': Called('pending :: onTransition :: callback'),
  'pending -> rejected | resolved': Called('rejected | resolved :: onTransition :: callback'),
  'rejected | resolved -> finished': Called('finished :: onTransition :: callback'),
})

bot.onExited('idle', Called('idle :: onExited'))
bot.onExiting('idle', Called('idle :: onExiting'))

bot.onEntered('pending', Called('pending :: onEntered'))
bot.onEntering('pending', Called('pending :: onEntering'))
bot.onExited('pending', Called('pending :: onExited'))
bot.onExiting('pending', Called('pending :: onExiting'))

bot.onEntered('resolved', Called('resolved :: onEntered'))
bot.onEntering('resolved', Called('resolved :: onEntering'))
bot.onExited('resolved', Called('resolved :: onExited'))
bot.onExiting('resolved', Called('resolved :: onExiting'))

bot.onEntered('rejected', Called('rejected :: onEntered'))
bot.onEntering('rejected', Called('rejected :: onEntering'))
bot.onExited('rejected', Called('rejected :: onExited'))
bot.onExiting('rejected', Called('rejected :: onExiting'))

bot.onEntered('finished', Called('finished :: onEntered'))
bot.onEntering('finished', Called('finished :: onEntering'))
bot.onExited('finished', Called('finished :: onExited'))
bot.onExiting('finished', Called('finished :: onExiting'))

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

test(`expecting callbacks to appear in this order`, () => {
  expect(calls.length).toEqual(EXPECTED_CALL_ORDER.length)
  expect(calls).toEqual(expect.arrayContaining(EXPECTED_CALL_ORDER))
  expect(calls.join('/')).toEqual(EXPECTED_CALL_ORDER.join('/'))
})
