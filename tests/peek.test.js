
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { Statebot } = require('../src/statebot')

const bot = Statebot('test-peek', {
  chart: `

    idle -> pending ->
      (rejected | resolved) ->

    finished

  `,
  logLevel: 0
})

const addGoodHandlers = () => bot.performTransitions({
  'idle -> pending': {
    on: 'start',
  },
  'pending -> resolved': {
    on: 'pass',
  },
  'pending -> rejected': {
    on: 'fail',
  },
  'rejected | resolved -> finished': {
    on: 'done',
  },
})

const addBadHandlers = () => bot.performTransitions({
  'idle -> pending': {
    on: 'start',
  },
  // Bad config!
  'pending -> resolved | rejected': {
    on: 'pass',
  },
  'rejected | resolved -> finished': {
    on: 'done',
  },
})

test(`test basic canTransitionTo() throws with wrong args`, () => {
  assert.throws(() => bot.canTransitionTo(1))
  assert.throws(() => bot.canTransitionTo(undefined, null, 'string'))
  assert.throws(() => bot.canTransitionTo('', {}))
  assert.throws(() => bot.canTransitionTo('', {}, ''))
  assert.throws(() => bot.canTransitionTo('', { afterEmitting: '' }, ''))
  assert.doesNotThrow(() => bot.canTransitionTo('', { afterEmitting: '' }))
  assert.doesNotThrow(() => bot.canTransitionTo(''))
  assert.doesNotThrow(() => bot.canTransitionTo(['']))
  assert.doesNotThrow(() => bot.canTransitionTo('', ''))
  assert.doesNotThrow(() => bot.canTransitionTo(['', '']))
})

test(`test basic peek() usage`, () => {
  const removeHandlers = addGoodHandlers()

  assert.equal(bot.peek('start'), 'pending')
  assert.equal(bot.peek('pass'), 'idle')
  assert.equal(bot.peek('fail'), 'idle')
  assert.equal(bot.peek('done'), 'idle')

  assert.equal(bot.canTransitionTo('pending', { afterEmitting: 'start' }), true)
  bot.emit('start')
  assert.equal(bot.canTransitionTo('pending', { afterEmitting: 'start' }), false)

  assert.equal(bot.peek('start'), 'pending')
  assert.equal(bot.peek('pass'), 'resolved')
  assert.equal(bot.peek('fail'), 'rejected')
  assert.equal(bot.peek('done'), 'pending')

  assert.equal(bot.canTransitionTo('resolved', { afterEmitting: 'pass' }), true)
  bot.emit('pass')
  assert.equal(bot.canTransitionTo('resolved', { afterEmitting: 'pass' }), false)

  assert.equal(bot.peek('start'), 'resolved')
  assert.equal(bot.peek('pass'), 'resolved')
  assert.equal(bot.peek('fail'), 'resolved')
  assert.equal(bot.peek('done'), 'finished')

  assert.equal(bot.peek('done', { finished: true }), true)
  assert.equal(bot.peek('done', { resolved: true }), null)

  assert.equal(bot.canTransitionTo('finished', { afterEmitting: 'done' }), true)
  bot.emit('done')
  assert.equal(bot.canTransitionTo('finished', { afterEmitting: 'done' }), false)

  assert.equal(bot.peek('done', {}), null)
  assert.equal(bot.peek('done', { undefined }), undefined)
  assert.equal(bot.peek('done', { undefined: () => null }), null)

  bot.reset()
  removeHandlers()
})

test(`test extended peek() usage`, () => {
  const removeHandlers = addGoodHandlers()

  const peekConfig1 = {
    undefined: 'idle',
    'pending': () => 'pending',
  }

  assert.equal(bot.peek('start', peekConfig1), 'pending')
  assert.equal(bot.peek('pass', peekConfig1), 'idle')
  assert.equal(bot.peek('fail', peekConfig1), 'idle')
  assert.equal(bot.peek('done', peekConfig1), 'idle')

  bot.emit('start')

  const peekConfig2 = {
    undefined: 'pending',
    'resolved': 'resolved',
    'rejected': () => 'rejected',
  }

  assert.equal(bot.peek('start', peekConfig2), 'pending')
  assert.equal(bot.peek('pass', peekConfig2), 'resolved')
  assert.equal(bot.peek('fail', peekConfig2), 'rejected')
  assert.equal(bot.peek('done', peekConfig2), 'pending')

  bot.emit('pass')

  const peekConfig3 = {
    undefined: 'resolved',
    'finished': () => 'finished',
  }

  assert.equal(bot.peek('start', peekConfig3), 'resolved')
  assert.equal(bot.peek('pass', peekConfig3), 'resolved')
  assert.equal(bot.peek('fail', peekConfig3), 'resolved')
  assert.equal(bot.peek('done', peekConfig3), 'finished')

  assert.equal(bot.peek('done', { finished: true }), true)
  assert.equal(bot.peek('done', { resolved: true }), null)

  bot.emit('done')

  assert.equal(bot.peek('done', {}), null)
  assert.equal(bot.peek('done', { undefined }), undefined)
  assert.equal(bot.peek('done', { undefined: () => null }), null)

  bot.reset()
  removeHandlers()
})

test(`test bad performTransitions() config`, () => {
  const removeHandlers = addBadHandlers()

  assert.equal(bot.peek('start'), 'pending')
  assert.equal(bot.peek('pass'), 'idle')
  assert.equal(bot.peek('fail'), 'idle')
  assert.equal(bot.peek('done'), 'idle')

  bot.emit('start')

  assert.equal(bot.peek('start'), 'pending')
  assert.throws(() => bot.peek('pass'))
  assert.throws(() => bot.canTransitionTo('resolved', { afterEmitting: 'pass'}))
  assert.equal(bot.peek('fail'), 'pending')
  assert.equal(bot.peek('done'), 'pending')

  assert.throws(() => bot.emit('pass'))

  assert.equal(bot.peek('start'), 'pending')
  assert.throws(() => bot.peek('pass'))
  assert.throws(() => bot.canTransitionTo('resolved', { afterEmitting: 'pass'}))
  assert.equal(bot.peek('fail'), 'pending')
  assert.equal(bot.peek('done'), 'pending')

  assert.equal(bot.peek('done', { finished: true }), null)
  assert.equal(bot.peek('done', { resolved: true }), null)

  bot.emit('done')

  assert.equal(bot.peek('done', {}), null)
  assert.equal(bot.peek('done', { undefined }), undefined)
  assert.equal(bot.peek('done', { undefined: () => null }), null)

  bot.reset()
  removeHandlers()
})
