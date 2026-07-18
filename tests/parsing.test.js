
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { Statebot } = require('../src/statebot')
const { decomposeChart, decomposeRoute } = require('../src/parsing')
const { routeIsPossible } = require('../assert/index.cjs')

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
      // Order-independent equality (same members, same length)
      assert.equal(states.length, decomposeTo.states.length)
      assert.deepEqual([...states].sort(), [...decomposeTo.states].sort())

      assert.equal(routes.length, decomposeTo.routes.length)
      assert.deepEqual([...routes].sort(), [...decomposeTo.routes].sort())

      assert.equal(transitions.length, decomposeTo.transitions.length)
      assert.deepEqual(
        transitions.map(t => t.join('->')).sort(),
        decomposeTo.transitions.map(t => t.join('->')).sort()
      )
    })

    if (!assertions) {
      return
    }

    const bot = Statebot(description, { chart: chartToTest })
    const { possibleRoutes, impossibleRoutes } = assertions

    possibleRoutes.forEach(route => {
      test(`${description} :: route possible :: ${route}`, () => {
        assert.deepEqual(true, routeIsPossible(bot, route))
      })
    })

    impossibleRoutes.forEach(route => {
      test(`${description} :: route not possible :: ${route}`, () => {
        assert.deepEqual(false, routeIsPossible(bot, route))
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
    assert.deepEqual(states, testStates)
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
    () => assert.deepEqual(decomposeRoute(route), expectedStates)
  )
})
