import { TStatebotFsm, TStatebotOptions, TEventName } from 'statebot'

declare module 'statebot/hooks/mithril' {
  /**
   * For hooking-into Statebots that have life-cycles independent of the components that use them, `useStatebot`:
   *
   * You can play around with this one in a [CodeSandbox](https://codesandbox.io/s/statebot-mithril-brvwl?file=/src/Loader.js).
   *
   * @example
   *  ```jsx
   *  import m from 'mithril'
   *  import { withHooks as MithrilComponent } from 'mithril-hooks'
   *
   *  import { Statebot } from 'statebot'
   *  import { useStatebot } from 'statebot/hooks/mithril'
   *
   *  let loadMachine = Statebot('loader', {
   *    chart: `
   *      idle ->
   *        waiting ->
   *        loaded | failed ->
   *        idle
   *    `
   *  })
   *
   *  loadMachine.performTransitions(({ emit }) => ({
   *    'idle -> waiting': {
   *      on: 'start-loading',
   *      then: () => {
   *        // Fail half the time for this demo
   *        let fail = Math.random() > 0.5
   *        setTimeout(() => {
   *          fail ? emit('error') : emit('success')
   *        }, 1000)
   *      }
   *    },
   *    'waiting -> loaded': {
   *      on: 'success'
   *    },
   *    'waiting -> failed': {
   *      on: 'error'
   *    }
   *  }))
   *
   *  let { Enter, Emit, inState } = loadMachine
   *
   *  let LoadingButton = MithrilComponent(() => {
   *    let state = useStatebot(loadMachine)
   *
   *    return m(
   *      'button',
   *      {
   *        className: state,
   *        onclick: Emit('start-loading'),
   *        disabled: !inState('idle')
   *      },
   *      inState('idle', 'Load'),
   *      inState('waiting', 'Please wait...'),
   *      inState('loaded', 'Done!'),
   *      inState('failed', 'Whoops!')
   *    )
   *  })
   *
   *  let ResetButton = MithrilComponent(() => {
   *    return m(
   *      'button',
   *      {
   *        onclick: Enter('idle')
   *      },
   *      'Reset'
   *    )
   *  })
   *  ```
   *
   * @param bot The machine to hook-into.
   * @returns The current state of the machine.
   */
  export function useStatebot(bot: TStatebotFsm): string

  /**
   * For Statebots whose life-cycles are tied to the components using them, `useStatebotFactory`:
   *
   * @example
   * ```jsx
   * import m from 'mithril'
   * import { withHooks } from 'mithril-hooks'
   *
   * import { useStatebotFactory } from 'statebot/hooks/mithril'
   *
   * const CHART = `
   *   idle ->
   *     loading -> (loaded | failed) ->
   *     idle
   * `
   *
   * const EVENT = {
   *   START_LOADING: 'start-loading',
   *   LOAD_SUCCESS: 'load-success',
   *   LOAD_ERROR: 'load-error'
   * }
   *
   * const LoadingButton = withHooks(props => {
   *   const { state, bot } = useStatebotFactory(
   *     'loading-button',
   *     {
   *       chart: CHART,
   *       startIn: 'idle',
   *       logLevel: 4,
   *
   *       performTransitions: ({ Emit }) => ({
   *         'idle -> loading': {
   *           on: EVENT.START_LOADING,
   *           then: () => setTimeout(
   *             Emit(EVENT.LOAD_SUCCESS),
   *             1000
   *           )
   *         },
   *         'loading -> loaded': {
   *           on: EVENT.LOAD_SUCCESS
   *         },
   *         'loading -> failed': {
   *           on: EVENT.LOAD_ERROR
   *         }
   *       }),
   *
   *       onTransitions: () => ({
   *         'loading -> failed': () => {
   *           console.log('Oops...')
   *         }
   *       })
   *     }
   *   )
   *
   *   return (
   *     <button
   *       className={state}
   *       onClick={bot.Emit(EVENT.START_LOADING)}
   *       disabled={bot.inState('loading')}
   *     >
   *       {bot.inState('idle', 'Load')}
   *       {bot.inState('loading', 'Please wait...')}
   *       {bot.inState('loaded', 'Done!')} ({state})
   *     </button>
   *   )
   * })
   * ```
   * @param name The name of the machine.
   * @param config The chart and other configuration.
   * @returns The current state of the machine and the machine itself.
   */
  export function useStatebotFactory(
    name: string,
    config: TStatebotOptions & {
      performTransitions?: any
      onTransitions?: any
    }
  ): { state: string; bot: TStatebotFsm }

  /**
   * To hook-into {@link index.TStatebotFsm.onEvent}, {@link index.TStatebotFsm.onEntering}/{@link index.TStatebotFsm.onEntered ed}, {@link index.TStatebotFsm.onExiting}/{@link index.TStatebotFsm.onExited ed}, {@link index.TStatebotFsm.onSwitching}/{@link index.TStatebotFsm.onSwitched ed} with side-effects cleanup, `useStatebotEvent`:
   *
   * @example
   * ```jsx
   * import m from 'mithril'
   * import { withHooks } from 'mithril-hooks'
   *
   * import { Statebot } from 'statebot'
   * import { useStatebot, useStatebotEvent } from 'statebot/hooks/mithril'
   *
   * const bot = Statebot('loader', {
   *   chart: `
   *     idle ->
   *       loading -> (loaded | failed) ->
   *       idle
   *   `
   * })
   *
   * const { Enter, Emit, inState } = bot
   *
   * const LoadingButton = withHooks(props => {
   *   const state = useStatebot(bot)
   *
   *   useStatebotEvent(bot, 'onEntered', 'loading', () =>
   *     setTimeout(
   *       bot.Emit(EVENT.LOAD_SUCCESS),
   *       seconds(1)
   *     )
   *   )
   *
   *   // You can achieve the same with useEffect, and you
   *   // get more control over the dependencies, too:
   *   useEffect(() => {
   *     const cleanupFn = bot.onExited('loading', () =>
   *       setTimeout(
   *         bot.Enter('idle'),
   *         seconds(2)
   *       )
   *     )
   *     return cleanupFn
   *   }, [bot])
   *
   *   return (
   *     <button
   *       className={state}
   *       onClick={Emit('start-loading')}
   *       disabled={inState('loading')}
   *     >
   *       {inState('idle', 'Load')}
   *       {inState('loading', 'Please wait...')}
   *       {inState('loaded', 'Done!')} ({state})
   *     </button>
   *   )
   * })
   *
   * function seconds(n) {
   *   return n * 1000
   * }
   * ```
   *
   * @param bot The machine to hook-into.
   * @param eventName The event to listen for.
   * @param state Fire the callback when we transition to this state.
   * @param callback The callback.
   */
  export function useStatebotEvent(
    bot: TStatebotFsm,
    eventName: TEventName,
    state: string,
    cb: Function
  )

  /**
   * To hook-into {@link index.TStatebotFsm.onEvent}, {@link index.TStatebotFsm.onEntering}/{@link index.TStatebotFsm.onEntered ed}, {@link index.TStatebotFsm.onExiting}/{@link index.TStatebotFsm.onExited ed}, {@link index.TStatebotFsm.onSwitching}/{@link index.TStatebotFsm.onSwitched ed} with side-effects cleanup, `useStatebotEvent`:
   *
   * @example
   * ```jsx
   * import m from 'mithril'
   * import { withHooks } from 'mithril-hooks'
   *
   * import { Statebot } from 'statebot'
   * import { useStatebot, useStatebotEvent } from 'statebot/hooks/mithril'
   *
   * const bot = Statebot('loader', {
   *   chart: `
   *     idle ->
   *       loading -> (loaded | failed) ->
   *       idle
   *   `
   * })
   *
   * const { Enter, Emit, inState } = bot
   *
   * const LoadingButton = withHooks(props => {
   *   const state = useStatebot(bot)
   *
   *   useStatebotEvent(bot, 'onEntered', (toState) =>
   *     if (toState !== 'loading') {
   *       return
   *     }
   *     setTimeout(
   *       bot.Emit(EVENT.LOAD_SUCCESS),
   *       seconds(1)
   *     )
   *   )
   *
   *   // You can achieve the same with useEffect, and you
   *   // get more control over the dependencies, too:
   *   useEffect(() => {
   *     const cleanupFn = bot.onExited('loading', () =>
   *       setTimeout(
   *         bot.Enter('idle'),
   *         seconds(2)
   *       )
   *     )
   *     return cleanupFn
   *   }, [bot])
   *
   *   return (
   *     <button
   *       className={state}
   *       onClick={Emit('start-loading')}
   *       disabled={inState('loading')}
   *     >
   *       {inState('idle', 'Load')}
   *       {inState('loading', 'Please wait...')}
   *       {inState('loaded', 'Done!')} ({state})
   *     </button>
   *   )
   * })
   *
   * function seconds(n) {
   *   return n * 1000
   * }
   * ```
   * @param bot The machine to hook-into.
   * @param eventName The event to listen for.
   * @param callback Fire this callback when the event is emitted.
   */
  export function useStatebotEvent(
    bot: TStatebotFsm,
    eventName: TEventName,
    cb: Function
  )
}
