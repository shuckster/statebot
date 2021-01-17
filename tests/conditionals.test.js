
const { Statebot } = require('../src/statebot')

const bot = Statebot('simple', {
  chart: `

    idle -> failure | success -> done

  `,
  logLevel: 0
})

// inState('string')

test(`inState() expects at least one argument`, () => {
  bot.reset()

  expect(() => bot.inState()).toThrow()
})

test(`inState() returns true/false when passed a string`, () => {
  bot.reset()

  expect(true).toEqual(bot.inState('idle'))
  expect(false).toEqual(bot.inState('done'))
  expect(false).toEqual(bot.inState('-'))
})

// inState('string', 'result-if-in-state')

test(`inState() returns literal or null`, () => {
  bot.reset()

  expect('okay').toEqual(bot.inState('idle', 'okay'))
  expect(null).toEqual(bot.inState('done', 'okay'))
  expect(null).toEqual(bot.inState('-', 'okay'))
})

test(`inState() returns fn-result or null`, () => {
  bot.reset()

  const Good = () => 'good'

  expect('good').toEqual(bot.inState('idle', Good))
  expect(null).toEqual(bot.inState('done', Good))
  expect(null).toEqual(bot.inState('-', Good))
})

test(`inState() returns fn-result or null with arguments`, () => {
  bot.reset()

  const K = arg => arg

  expect('arg-result').toEqual(bot.inState('idle', K, 'arg-result'))
  expect(null).toEqual(bot.inState('-', K, 'arg-result'))
})

// inState(object)

test(`inState() can work with an object`, () => {
  bot.reset()

  // idle -> failure | success -> done
  const stateObject = {
    'idle': 'one',
    'failure': () => 'two',
    'success': 'three',
    'done': arg => arg,
  }

  // idle
  expect('one').toEqual(bot.inState(stateObject))
  // failure
  bot.enter('failure')
  expect('two').toEqual(bot.inState(stateObject))
  // done
  bot.enter('done')
  expect('arg-result').toEqual(bot.inState(stateObject, 'arg-result'))

  bot.reset()

  // success
  bot.enter('success')
  expect('three').toEqual(bot.inState(stateObject))

  const noResults = {
    'not-found-1': 'one',
    'not-found-2': () => 'two',
    'not-found-3': 'three',
    'not-found-4': arg => arg,
  }

  // no states found in object keys
  expect(null).toEqual(bot.inState(noResults))
})

// InState(object)

test(`InState() can work with an object`, () => {
  bot.reset()

  // idle -> failure | success -> done
  const stateObject = {
    'idle': 'one',
    'failure': () => 'two',
    'success': 'three',
    'done': arg => arg,
  }
  const stateToValue = bot.InState(stateObject)

  // idle
  expect('one').toEqual(stateToValue())
  // failure
  bot.enter('failure')
  expect('two').toEqual(stateToValue())
  // done
  bot.enter('done')
  expect('arg-result').toEqual(stateToValue('arg-result'))

  bot.reset()

  // success
  bot.enter('success')
  expect('three').toEqual(stateToValue())

  const noResults = {
    'not-found-1': 'one',
    'not-found-2': () => 'two',
    'not-found-3': 'three',
    'not-found-4': arg => arg,
  }
  const stateToNoValue = bot.InState(noResults)

  // no states found in object keys
  expect(null).toEqual(stateToNoValue())
})

// statesAvailableFromHere()

test(`statesAvailableFromHere() does the right thing`, () => {
  bot.reset()

  expect(['failure', 'success']).toEqual(bot.statesAvailableFromHere())
  expect(['done']).toEqual(bot.statesAvailableFromHere('failure'))
  expect(['done']).toEqual(bot.statesAvailableFromHere('success'))

  bot.enter('failure')
  expect(['done']).toEqual(bot.statesAvailableFromHere())

  bot.reset()
  bot.enter('success')
  expect(['done']).toEqual(bot.statesAvailableFromHere())
  expect([]).toEqual(bot.statesAvailableFromHere('done'))

  bot.enter('done')
  expect([]).toEqual(bot.statesAvailableFromHere())
})
