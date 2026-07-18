
const { test } = require('node:test')
const assert = require('node:assert/strict')
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

  assert.throws(() => bot.inState())
})

test(`inState() returns true/false when passed a string`, () => {
  bot.reset()

  assert.deepEqual(true, bot.inState('idle'))
  assert.deepEqual(false, bot.inState('done'))
  assert.deepEqual(false, bot.inState('-'))
})

// inState('string', 'result-if-in-state')

test(`inState() returns literal or null`, () => {
  bot.reset()

  assert.deepEqual('okay', bot.inState('idle', 'okay'))
  assert.deepEqual(null, bot.inState('done', 'okay'))
  assert.deepEqual(null, bot.inState('-', 'okay'))
})

test(`inState() returns fn-result or null`, () => {
  bot.reset()

  const Good = () => 'good'

  assert.deepEqual('good', bot.inState('idle', Good))
  assert.deepEqual(null, bot.inState('done', Good))
  assert.deepEqual(null, bot.inState('-', Good))
})

test(`inState() returns fn-result or null with arguments`, () => {
  bot.reset()

  const K = arg => arg

  assert.deepEqual('arg-result', bot.inState('idle', K, 'arg-result'))
  assert.deepEqual(null, bot.inState('-', K, 'arg-result'))
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
  assert.deepEqual('one', bot.inState(stateObject))
  // failure
  bot.enter('failure')
  assert.deepEqual('two', bot.inState(stateObject))
  // done
  bot.enter('done')
  assert.deepEqual('arg-result', bot.inState(stateObject, 'arg-result'))

  bot.reset()

  // success
  bot.enter('success')
  assert.deepEqual('three', bot.inState(stateObject))

  const noResults = {
    'not-found-1': 'one',
    'not-found-2': () => 'two',
    'not-found-3': 'three',
    'not-found-4': arg => arg,
  }

  // no states found in object keys
  assert.deepEqual(null, bot.inState(noResults))
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
  assert.deepEqual('one', stateToValue())
  // failure
  bot.enter('failure')
  assert.deepEqual('two', stateToValue())
  // done
  bot.enter('done')
  assert.deepEqual('arg-result', stateToValue('arg-result'))

  bot.reset()

  // success
  bot.enter('success')
  assert.deepEqual('three', stateToValue())

  const noResults = {
    'not-found-1': 'one',
    'not-found-2': () => 'two',
    'not-found-3': 'three',
    'not-found-4': arg => arg,
  }
  const stateToNoValue = bot.InState(noResults)

  // no states found in object keys
  assert.deepEqual(null, stateToNoValue())
})

// statesAvailableFromHere()

test(`statesAvailableFromHere() does the right thing`, () => {
  bot.reset()

  assert.deepEqual(['failure', 'success'], bot.statesAvailableFromHere())
  assert.deepEqual(['done'], bot.statesAvailableFromHere('failure'))
  assert.deepEqual(['done'], bot.statesAvailableFromHere('success'))

  bot.enter('failure')
  assert.deepEqual(['done'], bot.statesAvailableFromHere())

  bot.reset()
  bot.enter('success')
  assert.deepEqual(['done'], bot.statesAvailableFromHere())
  assert.deepEqual([], bot.statesAvailableFromHere('done'))

  bot.enter('done')
  assert.deepEqual([], bot.statesAvailableFromHere())
})
