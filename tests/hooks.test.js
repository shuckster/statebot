const { test, mock } = require('node:test')
const assert = require('node:assert/strict')
const { makeHooks } = require('../hooks/make-hooks.mjs')

function makeUseEffect() {
  const cleanups = []
  const useEffect = (cb) => {
    cleanups.push(cb())
  }

  return { useEffect, cleanups }
}

test('useStatebot listens for state changes and cleans up listeners', () => {
  const setState = mock.fn()
  const offSwitched = mock.fn()
  let onSwitched

  const bot = {
    currentState: () => 'idle',
    onSwitched: (cb) => {
      onSwitched = cb
      return offSwitched
    },
  }

  const { useEffect, cleanups } = makeUseEffect()
  const { useStatebot } = makeHooks({
    Statebot: mock.fn(),
    useEffect,
    useState: (initial) => [initial, setState],
    useMemo: (cb) => cb(),
  })

  assert.equal(useStatebot(bot), 'idle')
  onSwitched('loading')
  assert.deepEqual(setState.mock.calls[0].arguments, ['loading'])

  cleanups[0]()
  onSwitched('done')

  assert.equal(setState.mock.callCount(), 1)
  assert.equal(offSwitched.mock.callCount(), 1)
})

test('useStatebotFactory wires transitions and cleans up created listeners', () => {
  const offPerformTransitions = mock.fn()
  const offOnTransitions = mock.fn()
  const offSwitched = mock.fn()
  const pause = mock.fn()
  const setState = mock.fn()
  const Statebot = mock.fn((name, config) => {
    assert.equal(name, 'loading-button')
    assert.deepEqual(config, { chart: 'idle -> loading -> idle' })
    return {
      currentState: () => 'idle',
      onSwitched: () => offSwitched,
      performTransitions: () => offPerformTransitions,
      onTransitions: () => offOnTransitions,
      pause,
    }
  })
  const { useEffect, cleanups } = makeUseEffect()

  const { useStatebotFactory } = makeHooks({
    Statebot,
    useEffect,
    useState: (initial) => [initial, setState],
    useMemo: (cb) => cb(),
  })

  const { state, bot } = useStatebotFactory('loading-button', {
    chart: 'idle -> loading -> idle',
    performTransitions: { a: 1 },
    onTransitions: { b: 2 },
  })

  assert.equal(state, 'idle')
  assert.equal(typeof bot, 'object')
  assert.equal(Statebot.mock.callCount(), 1)

  cleanups.forEach((cb) => cb())

  assert.equal(pause.mock.callCount(), 1)
  assert.equal(offPerformTransitions.mock.callCount(), 1)
  assert.equal(offOnTransitions.mock.callCount(), 1)
  assert.equal(offSwitched.mock.callCount(), 1)
})

test('useStatebotEvent supports state-specific and generic callbacks with cleanup', () => {
  const cbStateSpecific = mock.fn()
  const cbGeneric = mock.fn()
  const offEntered = mock.fn()
  const offSwitched = mock.fn()
  let onEntered
  let onSwitched

  const { useEffect, cleanups } = makeUseEffect()
  const { useStatebotEvent } = makeHooks({
    Statebot: mock.fn(),
    useEffect,
    useState: () => ['idle', mock.fn()],
    useMemo: (cb) => cb(),
  })

  const bot = {
    onEntered: (state, cb) => {
      assert.equal(state, 'loading')
      onEntered = cb
      return offEntered
    },
    onSwitched: (cb) => {
      onSwitched = cb
      return offSwitched
    },
  }

  useStatebotEvent(bot, 'onEntered', 'loading', cbStateSpecific)
  useStatebotEvent(bot, 'onSwitched', cbGeneric)

  onEntered('loading')
  onSwitched('done')

  assert.deepEqual(cbStateSpecific.mock.calls[0].arguments, ['loading'])
  assert.deepEqual(cbGeneric.mock.calls[0].arguments, ['done'])

  cleanups.forEach((cb) => cb())

  onEntered('idle')
  onSwitched('idle')

  assert.equal(cbStateSpecific.mock.callCount(), 1)
  assert.equal(cbGeneric.mock.callCount(), 1)
  assert.equal(offEntered.mock.callCount(), 1)
  assert.equal(offSwitched.mock.callCount(), 1)
})
