const { makeHooks } = require('../hooks/make-hooks.mjs')

function makeUseEffect() {
  const cleanups = []
  const useEffect = (cb) => {
    cleanups.push(cb())
  }

  return { useEffect, cleanups }
}

test('useStatebot listens for state changes and cleans up listeners', () => {
  const setState = jest.fn()
  const offSwitched = jest.fn()
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
    Statebot: jest.fn(),
    useEffect,
    useState: (initial) => [initial, setState],
    useMemo: (cb) => cb(),
  })

  expect(useStatebot(bot)).toBe('idle')
  onSwitched('loading')
  expect(setState).toHaveBeenCalledWith('loading')

  cleanups[0]()
  onSwitched('done')

  expect(setState).toHaveBeenCalledTimes(1)
  expect(offSwitched).toHaveBeenCalledTimes(1)
})

test('useStatebotFactory wires transitions and cleans up created listeners', () => {
  const offPerformTransitions = jest.fn()
  const offOnTransitions = jest.fn()
  const offSwitched = jest.fn()
  const pause = jest.fn()
  const setState = jest.fn()
  const Statebot = jest.fn((name, config) => {
    expect(name).toBe('loading-button')
    expect(config).toEqual({ chart: 'idle -> loading -> idle' })
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

  expect(state).toBe('idle')
  expect(typeof bot).toBe('object')
  expect(Statebot).toHaveBeenCalledTimes(1)

  cleanups.forEach((cb) => cb())

  expect(pause).toHaveBeenCalledTimes(1)
  expect(offPerformTransitions).toHaveBeenCalledTimes(1)
  expect(offOnTransitions).toHaveBeenCalledTimes(1)
  expect(offSwitched).toHaveBeenCalledTimes(1)
})

test('useStatebotEvent supports state-specific and generic callbacks with cleanup', () => {
  const cbStateSpecific = jest.fn()
  const cbGeneric = jest.fn()
  const offEntered = jest.fn()
  const offSwitched = jest.fn()
  let onEntered
  let onSwitched

  const { useEffect, cleanups } = makeUseEffect()
  const { useStatebotEvent } = makeHooks({
    Statebot: jest.fn(),
    useEffect,
    useState: () => ['idle', jest.fn()],
    useMemo: (cb) => cb(),
  })

  const bot = {
    onEntered: (state, cb) => {
      expect(state).toBe('loading')
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

  expect(cbStateSpecific).toHaveBeenCalledWith('loading')
  expect(cbGeneric).toHaveBeenCalledWith('done')

  cleanups.forEach((cb) => cb())

  onEntered('idle')
  onSwitched('idle')

  expect(cbStateSpecific).toHaveBeenCalledTimes(1)
  expect(cbGeneric).toHaveBeenCalledTimes(1)
  expect(offEntered).toHaveBeenCalledTimes(1)
  expect(offSwitched).toHaveBeenCalledTimes(1)
})
