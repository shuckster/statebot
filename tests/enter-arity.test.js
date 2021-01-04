
const { Statebot } = require('../src/statebot')

const bot = Statebot('test-enter-only', {
  chart: `

    one ->
    two ->
    three ->
    four ->
      one

  `,
  logLevel: 0
})

const EXPECTED_ENTER_ARITY_COUNT = 132

let callCount = 0
function bumpEnterArityCount(...args) {
  callCount += args.length
}

bot.onTransitions({
  'one -> two -> three -> four -> one': bumpEnterArityCount,
})

bot.onEntering('one', bumpEnterArityCount)
bot.onEntered('one', bumpEnterArityCount)
bot.onExiting('one', bumpEnterArityCount)
bot.onExited('one', bumpEnterArityCount)

bot.onEntering('two', bumpEnterArityCount)
bot.onEntered('two', bumpEnterArityCount)
bot.onExiting('two', bumpEnterArityCount)
bot.onExited('two', bumpEnterArityCount)

bot.onEntering('three', bumpEnterArityCount)
bot.onEntered('three', bumpEnterArityCount)
bot.onExiting('three', bumpEnterArityCount)
bot.onExited('three', bumpEnterArityCount)

bot.onEntering('four', bumpEnterArityCount)
bot.onEntered('four', bumpEnterArityCount)
bot.onExiting('four', bumpEnterArityCount)
bot.onExited('four', bumpEnterArityCount)

test(`enter states with correct number of arguments passed-down`, () => {
  //
  // Enter states multiple times to test transition-guarding
  //

  bot.enter('two', 1, 2)
  bot.enter('two', 1, 2)
  bot.enter('two', 1, 2)
  bot.enter('three', 1, 2, 3)
  bot.enter('three', 1, 2, 3)
  bot.enter('three', 1, 2, 3)
  bot.enter('four', 1, 2, 3, 4)
  bot.enter('four', 1, 2, 3, 4)
  bot.enter('four', 1, 2, 3, 4)
  bot.enter('one', 1)
  bot.enter('one', 1)
  bot.enter('one', 1)

  bot.reset()

  const enterOne = bot.Enter('one', 1)
  const enterTwo = bot.Enter('two', 1, 2)
  const enterThree = bot.Enter('three', 1, 2, 3)
  const enterFour = bot.Enter('four', 1, 2, 3, 4)

  enterTwo()
  enterTwo()
  enterTwo()
  enterThree()
  enterThree()
  enterThree()
  enterFour()
  enterFour()
  enterFour()
  enterOne()
  enterOne()
  enterOne()

  expect(callCount).toEqual(EXPECTED_ENTER_ARITY_COUNT)
})

