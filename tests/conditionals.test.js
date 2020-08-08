
const { Statebot } = require('../src/statebot')

const bot = Statebot('simple', {
  chart: `

    idle -> failure | success -> done

  `,
  logLevel: 0
})

test(`inState() expects at least one argument`, () => {
  expect(() => bot.inState()).toThrow()
})

test(`inState() returns true/false`, () => {
  expect(true).toEqual(bot.inState('idle'))
  expect(false).toEqual(bot.inState('done'))
  expect(false).toEqual(bot.inState('-'))
})

test(`inState() returns literal or null`, () => {
  expect('okay').toEqual(bot.inState('idle', 'okay'))
  expect(null).toEqual(bot.inState('done', 'okay'))
  expect(null).toEqual(bot.inState('-', 'okay'))
})

test(`inState() returns fn-result or null`, () => {
  const Good = () => 'good'

  expect('good').toEqual(bot.inState('idle', Good))
  expect(null).toEqual(bot.inState('done', Good))
  expect(null).toEqual(bot.inState('-', Good))
})

test(`statesAvailableFromHere() does the right thing`, () => {
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
