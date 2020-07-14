
const { Statebot } = require('../src/statebot')
const { routeIsPossible } = require('../src/assertions')

const bot = Statebot('chart-with-backtracking', {
  chart: `

    hidden -> prompt -> hidden

    prompt | failed ->
      submitting ->
      submitting-slowly

    submitting | submitting-slowly ->
      confirmed | failed ->
      hidden

  `,
  logLevel: 0
})

const ROUTES_WITH_BACKTRACKING = [
  'hidden -> prompt -> hidden',
  'failed -> submitting -> confirmed -> hidden',
  'hidden -> prompt -> submitting -> failed -> submitting -> confirmed -> hidden',
  'hidden -> prompt -> submitting -> submitting-slowly -> failed -> submitting -> confirmed -> hidden'
]

ROUTES_WITH_BACKTRACKING.forEach(route => {
  test(`bot should be able to trace this route:\n${route}`, () => {
    expect(true).toEqual(routeIsPossible(bot, route))
  })
})
