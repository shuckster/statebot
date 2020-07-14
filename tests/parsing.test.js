
const { Statebot } = require('../src/statebot')
const { decomposeChart, decomposeRoute } = require('../src/parsing')
const { routeIsPossible } = require('../src/assertions')

const SEMANTICALLY_IDENTICAL_CHARTS = [
  {
    description: 'Minimal',
    charts: [
      `idle -> done`,
      `idle ->
       done`,
      `idle -> // Comment
       done`,
    ],
    decomposeTo: {
      states: ['idle', 'done'],
      routes: ['idle->done'],
      transitions: [['idle', 'done']]
    },
    assertions: {
      possibleRoutes: ['idle->done'],
      impossibleRoutes: ['done->idle']
    }
  },
  {
    description: 'Promise-like',
    charts: [
      `
        idle -> pending -> (rejected | resolved) -> finished
      `,
      `
        idle -> pending
        pending -> (rejected | resolved)
        (rejected | resolved) -> finished
      `,
      `
        idle -> pending
        pending -> rejected
        pending -> resolved
        rejected -> finished
        resolved -> finished
      `,
      `
        rejected -> finished
        resolved -> finished
        idle -> pending
        pending -> (rejected |   // Comment
        resolved)
      `,
      `
        (rejected | resolved) -> // Comment
          finished
        pending ->               // Comment
          (rejected | resolved)  // Comment
        idle ->
          pending
      `
    ],
    decomposeTo: {
      states: [
        'idle',
        'pending',
        'rejected',
        'resolved',
        'finished'
      ],
      routes: [
        'idle->pending',
        'pending->rejected',
        'pending->resolved',
        'rejected->finished',
        'resolved->finished'
      ],
      transitions: [
        ['idle', 'pending'],
        ['pending', 'rejected'],
        ['pending', 'resolved'],
        ['rejected', 'finished'],
        ['resolved', 'finished']
      ]
    },
    assertions: {
      possibleRoutes: [
        'idle -> pending -> resolved -> finished',
        'idle -> pending -> rejected -> finished'
      ],
      impossibleRoutes: [
        'idle -> resolved',
        'idle -> rejected',
        'idle -> finished',
        'pending -> finished'
      ]
    }
  }
]

SEMANTICALLY_IDENTICAL_CHARTS.forEach(chartTests => {
  const { description, charts, decomposeTo, assertions } = chartTests

  charts.forEach(chartToTest => {
    const { states, routes, transitions } = decomposeChart(chartToTest)

    test(`${description} :: Semantically identical charts produce the same states/routes\n${chartToTest}\n`, () => {

      // States
      expect(states.length)
        .toEqual(decomposeTo.states.length)
      expect(states)
        .toEqual(expect.arrayContaining(decomposeTo.states))

      // Routes
      expect(routes.length)
        .toEqual(decomposeTo.routes.length)
      expect(routes)
        .toEqual(expect.arrayContaining(decomposeTo.routes))

      // Transitions
      expect(transitions.length)
        .toEqual(decomposeTo.transitions.length)
      expect(transitions)
        .toEqual(expect.arrayContaining(decomposeTo.transitions))

    })

    if (!assertions) {
      return
    }

    const bot = Statebot(description, { chart: chartToTest })
    const { possibleRoutes, impossibleRoutes } = assertions

    possibleRoutes.forEach(route => {
      test(`${description} :: route possible :: ${route}`, () => {
        expect(true).toEqual(routeIsPossible(bot, route))
      })
    })

    impossibleRoutes.forEach(route => {
      test(`${description} :: route not possible :: ${route}`, () => {
        expect(false).toEqual(routeIsPossible(bot, route))
      })
    })
  })
})

const CHARTS_WITH_EMPTY_STRINGS_FOR_STATES_SHOULD_BE_FINE = [
  {
    chart: 'idle ->',
    states: ['idle', '']
  },
  {
    chart: 'idle -> ->',
    states: ['idle', '']
  },
  {
    chart: '-> idle -> ->',
    states: ['', 'idle']
  },
  {
    chart: 'idle -> -> done',
    states: ['idle', '', 'done']
  },
  {
    chart: 'idle -> waiting',
    states: ['idle', 'waiting']
  },
  {
    chart: 'idle -> waiting ->',
    states: ['idle', 'waiting', '']
  },
  {
    chart: 'idle -> waiting -> done',
    states: ['idle', 'waiting', 'done']
  },
]

CHARTS_WITH_EMPTY_STRINGS_FOR_STATES_SHOULD_BE_FINE.forEach(regressionTest => {
  const { chart, states: testStates } = regressionTest
  const { states } = decomposeChart(chart)

  test(`decomposeChart() :: empty-strings are valid states\n${chart}`, () => {
    expect(states).toEqual(testStates)
  })
})

const DECOMPOSED_ROUTES = [
  {
    route: 'hidden -> prompt -> submitting -> failed -> submitting -> confirmed -> hidden ->',
    expectedStates: ['hidden', 'prompt', 'submitting', 'failed', 'submitting', 'confirmed', 'hidden', ''],
    description: 'empty-string state should be in this route'
  },
  {
    route: 'hidden -> prompt -> submitting -> failed -> submitting -> confirmed -> hidden',
    expectedStates: ['hidden', 'prompt', 'submitting', 'failed', 'submitting', 'confirmed', 'hidden'],
    description: 'empty-string state should NOT be in this route'
  },
]

DECOMPOSED_ROUTES.forEach(({ route, expectedStates, description }) => {
  test(`decomposeRoute() :: ${description}\n${route}`,
    () => expect(decomposeRoute(route)).toEqual(expectedStates)
  )
})
