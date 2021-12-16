
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

test(`test basic peek() usage`, () => {
  const removeHandlers = addGoodHandlers()

  expect(bot.peek('start')).toBe('pending')
  expect(bot.peek('pass')).toBe('idle')
  expect(bot.peek('fail')).toBe('idle')
  expect(bot.peek('done')).toBe('idle')

  bot.emit('start')

  expect(bot.peek('start')).toBe('pending')
  expect(bot.peek('pass')).toBe('resolved')
  expect(bot.peek('fail')).toBe('rejected')
  expect(bot.peek('done')).toBe('pending')

  bot.emit('pass')

  expect(bot.peek('start')).toBe('resolved')
  expect(bot.peek('pass')).toBe('resolved')
  expect(bot.peek('fail')).toBe('resolved')
  expect(bot.peek('done')).toBe('finished')

  expect(bot.peek('done', { finished: true })).toBe(true)
  expect(bot.peek('done', { resolved: true })).toBe(null)

  bot.emit('done')

  expect(bot.peek('done', {})).toBe(null)
  expect(bot.peek('done', { undefined })).toBe(undefined)
  expect(bot.peek('done', { undefined: () => null })).toBe(null)

  bot.reset()
  removeHandlers()
})

test(`test extended peek() usage`, () => {
  const removeHandlers = addGoodHandlers()

  const peekConfig1 = {
    undefined: 'idle',
    'pending': () => 'pending',
  }

  expect(bot.peek('start', peekConfig1)).toBe('pending')
  expect(bot.peek('pass', peekConfig1)).toBe('idle')
  expect(bot.peek('fail', peekConfig1)).toBe('idle')
  expect(bot.peek('done', peekConfig1)).toBe('idle')

  bot.emit('start')

  const peekConfig2 = {
    undefined: 'pending',
    'resolved': 'resolved',
    'rejected': () => 'rejected',
  }

  expect(bot.peek('start', peekConfig2)).toBe('pending')
  expect(bot.peek('pass', peekConfig2)).toBe('resolved')
  expect(bot.peek('fail', peekConfig2)).toBe('rejected')
  expect(bot.peek('done', peekConfig2)).toBe('pending')

  bot.emit('pass')

  const peekConfig3 = {
    undefined: 'resolved',
    'finished': () => 'finished',
  }

  expect(bot.peek('start', peekConfig3)).toBe('resolved')
  expect(bot.peek('pass', peekConfig3)).toBe('resolved')
  expect(bot.peek('fail', peekConfig3)).toBe('resolved')
  expect(bot.peek('done', peekConfig3)).toBe('finished')

  expect(bot.peek('done', { finished: true })).toBe(true)
  expect(bot.peek('done', { resolved: true })).toBe(null)

  bot.emit('done')

  expect(bot.peek('done', {})).toBe(null)
  expect(bot.peek('done', { undefined })).toBe(undefined)
  expect(bot.peek('done', { undefined: () => null })).toBe(null)

  bot.reset()
  removeHandlers()
})

test(`test bad performTransitions() config`, () => {
  const removeHandlers = addBadHandlers()

  expect(bot.peek('start')).toBe('pending')
  expect(bot.peek('pass')).toBe('idle')
  expect(bot.peek('fail')).toBe('idle')
  expect(bot.peek('done')).toBe('idle')

  bot.emit('start')

  expect(bot.peek('start')).toBe('pending')
  expect(() => bot.peek('pass')).toThrow()
  expect(bot.peek('fail')).toBe('pending')
  expect(bot.peek('done')).toBe('pending')

  expect(() => bot.emit('pass')).toThrow()

  expect(bot.peek('start')).toBe('pending')
  expect(() => bot.peek('pass')).toThrow()
  expect(bot.peek('fail')).toBe('pending')
  expect(bot.peek('done')).toBe('pending')

  expect(bot.peek('done', { finished: true })).toBe(null)
  expect(bot.peek('done', { resolved: true })).toBe(null)

  bot.emit('done')

  expect(bot.peek('done', {})).toBe(null)
  expect(bot.peek('done', { undefined })).toBe(undefined)
  expect(bot.peek('done', { undefined: () => null })).toBe(null)

  bot.reset()
  removeHandlers()
})
