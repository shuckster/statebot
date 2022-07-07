declare module 'statebot' {
  /**
   * A description of all the states in a machine, plus all of the
   * permitted transitions between them.
   *
   * This is defined using a `string` or an `array` of strings, but
   *  [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
   * are much more convenient.
   *
   * An arrow `->` configures a **permitted transition** between two states:
   *
   * ```
   * from-state -> to-state
   * ```
   *
   * It's the only operator needed to build any chart:
   *
   * ```js
   * let promiseLikeChart = `
   *   pending -> resolved
   *   pending -> rejected
   *   resolved -> done
   *   rejected -> done
   * `
   * ```
   *
   * The "OR" operator `|` can help us remove some redundancy from the above example:
   *
   * ```js
   * let promiseLikeChart = `
   *   pending -> resolved | rejected
   *   resolved | rejected -> done
   * `
   * ```
   *
   * In both charts, `pending` can transition to `resolved` or `rejected`, and
   * `resolved` or `rejected` can both transition to `done`.
   *
   * We can streamline this even further:
   *
   * ```js
   * let promiseLikeChart = `
   *   pending -> (resolved | rejected) -> done
   * `
   * ```
   *
   * Again, this is exactly equivalent to the previous two examples.
   *
   * Notice in this one that we have parentheses `(` `)` surrounding `resolved`
   * and `rejected`. They are actually completely ignored by the parser, and
   * you can use them as you please to help make your charts more readable.
   *
   * A chart works exactly the same without them:
   *
   * ```js
   * let promiseLikeChart = `
   *   pending -> resolved | rejected -> done
   * `
   * ```
   *
   * Charts can also be split across multiple-lines:
   *
   * ```js
   * let promiseLikeChart = `
   *   pending ->
   *   resolved |
   *   rejected ->
   *   done
   * `
   * ```
   * Notice that all white-space is ignored on either side of the `->`
   * and `|`.
   *
   * `// Comments of this kind are allowed, too:`
   *
   * ```js
   * let promiseLikeChart = `
   *   pending -> // Where do we go from here?
   *     (resolved | rejected) -> // Ah, yes
   *
   *   // And now we're all finished
   *   done
   * `
   * ```
   *
   * Finally, here's a more full example:
   *
   * ```js
   * let dragDropChart = `
   *   idle ->
   *     drag-detect ->
   *       (dragging | clicked)
   *
   *   // Just a click, bail-out!
   *   clicked -> idle
   *
   *   // Drag detected!
   *   dragging ->
   *     drag-wait -> dragged -> drag-wait
   *
   *   // Drag finished...
   *   (drag-wait | dragged) ->
   *     (drag-done | drag-cancel) ->
   *       idle
   * `
   * ```
   */
  export type TStatebotChart = string | string[]

  export type TEventName =
    | 'onEntered'
    | 'onEntering'
    | 'onEvent'
    | 'onExited'
    | 'onExiting'
    | 'onSwitched'
    | 'onSwitching'

  export type TListenersRemover = Function

  /**
   * Options for creating a Statebot.
   */
  export interface TStatebotOptions {
    /**
     *  The state-chart.
     */
    chart: TStatebotChart
    /**
     * The state in which to start. If unspecified, the first state in the
     * chart will be used.
     */
    startIn?: string
    /**
     * How noisy the logging is, from 1 to 3:
     * ```
     * 1) console.warn
     * 2) console.warn/log/table
     * 3) console.warn/log/table/info
     * ```
     * `3` is the default. Argument type-errors will always `throw`.
     */
    logLevel?: 0 | 1 | 2 | 3
    /**
     * Limit how much history the state-machine keeps. Accessed via
     * {@link TStatebotFsm.history}.
     */
    historyLimit?: number
    /**
     * If you wish to have your Statebots listen to events coming from
     * a shared EventEmitter, you can pass it in here. The `emit()`/`onEvent()`/
     * `performTransitions()` methods will use it.
     *
     * It should have the same signature as [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
     *
     * - Since v2.5.0 [mitt](https://npmjs.com/mitt) is also compatible.
     * - Since v2.6.0 [mitt](https://npmjs.com/mitt) is used internally.
     */
    events?: any
  }

  export interface TStatebotFsm {
    /**
     * For identifying Statebot objects.
     *
     * @ignore
     */
    __STATEBOT__: number

    /**
     * Tests to see if we can transition to the specified state from
     * the {@link TStatebotFsm.currentState}.
     *
     * If more than one state is specified, `true` is returned only if
     * **ALL** states are available.
     *
     * See also: {@link TStatebotFsm.peek}.
     *
     * Can test if a certain state will be entered after
     * emitting an event. Use `{ afterEmitting: 'eventName' }` as the
     * second argument. Works only after using {@link TStatebotFsm.performTransitions}.
     *
     * @param states
     * @param [options]
     * @param options.afterEmitting
     * @returns Whether the transition is possible.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('game-menus', {
     *   chart: `
     *     loading ->
     *       menu ->
     *            play |
     *         options |
     *           sound |
     *            quit
     *
     *     // Go back to menu
     *     play | options | sound -> menu
     *
     *     // Can quit from main game, too
     *     play -> quit
     *   `
     * })
     *
     * machine.canTransitionTo('play')
     * // false
     *
     * machine.enter('menu')
     * machine.canTransitionTo(['play', 'options'])
     * // true
     *
     * machine.canTransitionTo('play', {
     *   afterEmitting: 'startGame'
     * })
     * // false
     * ```
     */
    canTransitionTo: (
      stateOrStates: string | string[],
      options?: {
        /**
         * Test if a certain state will be entered after emitting an event.
         * Works only after using {@link TStatebotFsm.performTransitions}.
         */
        afterEmitting: string
      }
    ) => boolean

    /**
     * Returns the current state.
     *
     * @returns The current state.
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('coroutine', {
     *   chart: `
     *     suspended -> running -> (suspended | dead)
     *   `
     * })
     *
     * machine.currentState()
     * // "suspended"
     * ```
     */
    currentState: () => string

    /**
     * Immediately emits an event, firing any listeners added using
     * {@link TStatebotFsm.performTransitions} or {@link TStatebotFsm.onEvent}.
     *
     * @param eventName
     * @param [args] Optional arguments to pass to listeners.
     * @returns Whether or not the event had listeners.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('basic-form', {
     *   chart: `
     *     idle -> sending -> redirect
     *   `
     * })
     *
     * machine.performTransitions({
     *   'idle -> sending': {
     *     on: 'post-data',
     *     then: (...args) => {
     *       console.log('Event args: ', args)
     *       // setTimeout(machine.Enter('redirect'), 5000)
     *     }
     *   }
     * })
     *
     * machine.emit('post-data', 'Hello, world!')
     * // Event args: ["Hello, world!"]
     *
     * machine.currentState()
     * // "sending"
     * ```
     */
    emit: (eventName: string, ...args: any[]) => boolean

    /**
     * Creates a function that emits the specified event.
     *
     * (This is essentially a convenience wrapper around {@link TStatebotFsm.emit}.)
     *
     * @param eventName The desired event to {@link TStatebotFsm.emit}.
     * @param [curriedArgs] Arguments that will curry into the returned `emit()`
     * function whenever it is called.
     * @returns A function that emits that event.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('traffic-lights', {
     *   chart: `
     *     go ->
     *       prepare-to-stop ->
     *       stop
     *
     *     // ...gotta keep that traffic flowing
     *     stop ->
     *       prepare-to-go ->
     *       go
     *   `,
     *   startIn: 'stop'
     * })
     *
     * machine.performTransitions({
     *   'stop -> prepare-to-go':   { on: 'timer' },
     *   'prepare-to-go -> go':     { on: 'timer' },
     *   'go -> prepare-to-stop':   { on: 'timer' },
     *   'prepare-to-stop -> stop': { on: 'timer' }
     * })
     *
     * let nextTrafficLight = machine.Emit('timer')
     * machine.currentState()
     * // "stop"
     *
     * nextTrafficLight()
     * nextTrafficLight()
     * nextTrafficLight()
     *
     * machine.currentState()
     * // "prepare-to-stop"
     * ```
     */
    Emit: (
      eventName: string,
      ...curriedArgs: any[]
    ) => (...args: any[]) => boolean

    /**
     * Immediately changes to the specified state, so long as it is
     * accessible from the {@link TStatebotFsm.currentState}.
     *
     * @param state The desired state to switch-to.
     * @param [args] Optional arguments to pass to transition callbacks.
     * @returns Whether or not the state changed.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('dialog', {
     *   chart: `
     *     idle -> showing-modal -> (saving | idle)
     *       saving -> idle
     *   `
     * })
     *
     * machine.currentState()
     * // "idle"
     *
     * machine.enter('saving')
     * // false
     *
     * // Statebot[dialog]: Invalid transition "idle->saving", not switching
     * // > Previous transition: "[undefined]->idle"
     * // > From "idle", valid states are: ["showing-modal"]
     *
     * machine.enter('showing-modal')
     * // true
     * ```
     */
    enter: (state: string, ...args: any[]) => boolean

    /**
     * Creates a function that changes to the specified state, so long
     * as it is accessible from the {@link TStatebotFsm.currentState}.
     *
     * (This is essentially a convenience wrapper around {@link TStatebotFsm.enter}.)
     *
     * @param state The desired state to switch-to.
     * @param [curriedArgs] Arguments that will curry into the returned
     * `enter()` function whenever it is called.
     * @returns A function that can change the state when called.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('popup-menu', {
     *   chart: `
     *     idle -> menu-opened ->
     *       (item-clicked | idle)
     *
     *     item-clicked -> idle
     *   `,
     *   startIn: 'menu-opened'
     * })
     *
     * button.onclick = machine.Enter('item-clicked')
     * machine.currentState()
     * // "menu-opened"
     *
     * button.onclick()
     * machine.currentState()
     * // "item-clicked"
     * ```
     */
    Enter: (state: string, ...curriedArgs: any[]) => (...args: any[]) => boolean

    /**
     * Returns all states the machine has been in so far, up to a limit set
     * by `historyLimit` in {@link TStatebotOptions}.
     *
     * @returns A copy of the state-history.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('downloader', {
     *   chart: `
     *     loading -> (failure | success)
     *       failure -> loading
     *       success -> done
     *   `,
     *   historyLimit: 4
     * })
     *
     * machine.enter('failure')
     * machine.enter('loading')
     * machine.enter('success')
     * machine.enter('done')
     * machine.history()
     * // ["failure", "loading", "success", "done"]
     * ```
     */
    history: () => string[]

    /**
     * Print information about the current machine to the console.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.info()
     * // [half-duplex]: Information about this state-machine.
     * // [half-duplex]: Listening for the following state-changes:
     * // ┌---------┬-------------┬--------┐
     * // │ (index) │   states    │   #    │
     * // ├---------┼-------------┼--------┤
     * // │    0    │   'done'    │ 'None' │
     * // │    1    │   'idle'    │ 'None' │
     * // │    2    │ 'receiving' │ 'None' │
     * // │    3    │  'sending'  │ 'None' │
     * // └---------┴-------------┴--------┘
     * // [half-duplex] Listening for the following transitions:
     * // ┌---------┬-------------------┬--------┐
     * // │ (index) │    transitions    │   #    │
     * // ├---------┼-------------------┼--------┤
     * // │    0    │ 'idle->receiving' │ 'None' │
     * // │    1    │  'idle->sending'  │ 'None' │
     * // │    2    │ 'receiving->done' │ 'None' │
     * // │    3    │  'sending->done'  │ 'None' │
     * // └---------┴-------------------┴--------┘
     * // [half-duplex]: Listening for the following events:
     * // (No information)
     * ```
     */
    info: () => void

    /**
     * Get information about the current machine.
     *
     * Same details as {@link TStatebotFsm.info} in object-form.
     *
     * @returns An object containing information about the current machine.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.inspect()
     * // Will return an object with the following signature:
     * //  { states, transitions, events }
     *
     * // These will each have key-values, the key being the name
     * // and the value being the number of listeners attached.
     * ```
     */
    inspect: () => { states: any[]; transitions: any[]; events: any[] }

    /**
     * Checks if the {@link TStatebotFsm.currentState}
     * matches the specified `state`, immediately returning either
     * `true` or `false`.
     *
     * An object can be used instead of a string, with the keys
     * being the states, and the values corresponding to their
     * `outputWhenTrue` value. See the example.
     *
     * If `outputWhenTrue` is specified, then it will be returned
     * instead of `true`, and `null` will be returned instead of
     * `false`. If a function is specified, then its return-value
     * will be used as the `true`-value.
     *
     * @param state
     *  The state to test against. This can be a string if you have a
     *  single condition, or an object for multiple. (See example.)
     * @param [outputWhenTrue]
     *  When a string is specified as the first argment, this becomes
     *  an optional `true`-value that is returned if the state matches.
     *  If a function is specified, it will be called and its return
     *  value will be used.
     * @param [fnArgs]
     *  Arguments that will pass into `outputWhenTrue()` if it has
     *  been defined as a function.
     * @returns
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('little-revver', {
     *   chart: `
     *     idle ->
     *       (gear-1 | gear-2 | reverse) ->
     *     idle
     *   `
     * })
     *
     * machine.inState('idle')
     * // true
     *
     * machine.inState('idle', 'Purrrr...')
     * // "Purrrr..."
     *
     * machine.enter('gear-1')
     *
     * machine.inState({
     *   'idle': 'Purrrr...',
     *   'gear-1': () => 'Chugga-chugga-chugga...',
     *   'gear-2': () => 'Brumma-brumma-brum-brum...',
     *   'reverse': false,
     * })
     * // "Chugga-chugga-chugga..."
     *
     * machine.inState('idle', () => {
     *   console.log('Idling!')
     *   return 'Purrrr...'
     * })
     * // null
     * // ^ the function is not called at all in the `false` case,
     * //   so no console.log either.
     * ```
     */
    inState: (
      state: string | object,
      outputWhenTrue?: any,
      ...fnArgs: any[]
    ) => any

    /**
     * Returns a function which, when run, tests that
     * {@link TStatebotFsm.currentState} matches the
     * specified state, returning either `true` or `false`.
     *
     * If `outputWhenTrue` is specified, then it will be returned
     * instead of `true`, and `null` will be returned instead of
     *  `false`.
     *
     * (This is essentially a convenience wrapper around {@link TStatebotFsm.inState}.)
     *
     * @param state The state to test against.
     * @param [outputWhenTrue]
     *  Optional `true`-value. If a function is specified, it will be
     *  called and its return value will be used.
     * @param [curriedFnArgs]
     *  Arguments that will curry into `outputWhenTrue()` if it has
     *  been defined as a function.
     * @returns
     *  A function that calls {@link TStatebotFsm.inState}.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('little-revver', {
     *   chart: `
     *     idle ->
     *       (gear-1 | gear-2 | reverse) ->
     *     idle
     *   `
     * })
     *
     * let idling = machine.InState('idle')
     * let purring = machine.InState('idle', () => {
     *   console.log('Idling!')
     *   return 'Purrrr...'
     * })
     *
     * idling()
     * // true
     *
     * purring()
     * // Idling!
     * // "Purrrr..."
     *
     * machine.enter('gear-1')
     * purring()
     * // null
     * // ^ the function is not called at all in the `false` case,
     * //   so no console.log either.
     * ```
     */
    InState: (
      state: string | object,
      outputWhenTrue?: any
    ) => (...fnArgs: any[]) => any

    /**
     * Returns the name of the state-machine.
     *
     * Used for logging and also by {@link assert.assertRoute}
     * for the same.
     *
     * @returns The name of the state-machine.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('Ay, there’s the rub.', {
     *   chart: `
     *     the-question -> (to-be | not-to-be)
     *       not-to-be -> perchance-to-dream
     *   `
     * })
     *
     * machine.name()
     * // "Ay, there’s the rub."
     * ```
     */
    name: () => string

    /**
     * Adds a listener that runs a callback immediately **AFTER** the
     * specified-state becomes the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @param state The state.
     * @param cb
     *  A callback function with the signature:
     *
     *  `(fromState, ...args?)`
     * @returns A function that removes the listener.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onEntered('done', fromState => {
     *   console.log('Entered from:', fromState)
     * })
     *
     * machine.enter('receiving')
     * machine.enter('done')
     * // Entered from: receiving
     * ```
     */
    onEntered: (
      state: string,
      cb: (fromState?: string, ...args: any[]) => void
    ) => TListenersRemover

    /**
     * Adds a listener that runs a callback immediately **BEFORE** the
     * specified-state becomes the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @memberof TStatebotFsm
     * @instance
     * @function
     * @param {string} state The state.
     * @param {enterCallback} cb
     *  A callback function with the signature:
     *
     *  `(fromState, ...args?)`
     * @returns {function} A function that removes the listener.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onEntered('done', () => {
     *   console.log('We made it!')
     * })
     *
     * machine.onEntering('done', fromState => {
     *   console.log('Entering from:', fromState)
     * })
     *
     * machine.enter('sending')
     * machine.enter('done')
     * // Entering from: sending
     * // We made it!
     * ```
     */
    onEntering: (
      state: string,
      cb: (fromState?: string, ...args: any[]) => void
    ) => TListenersRemover

    /**
     * Adds a listener that runs a callback immediately after the specified
     * event is called.
     *
     * A function is returned that will remove the listener.
     *
     * @param name The event name.
     * @param cb The callback.
     * @returns A function that removes the listener.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('traffic-lights', {
     *   chart: `
     *     go ->
     *       prepare-to-stop ->
     *       stop
     *
     *     // ...gotta keep that traffic flowing
     *     stop ->
     *       prepare-to-go ->
     *       go
     *   `
     * })
     *
     * machine.performTransitions({
     *   'stop -> prepare-to-go -> go':   { on: 'timer' },
     *   'go -> prepare-to-stop -> stop': { on: 'timer' },
     * })
     *
     * machine.onEvent('timer', () => {
     *   redrawTrafficLights()
     * })
     *
     * setInterval(machine.Emit('timer'), 2000)
     * ```
     */
    onEvent: (
      eventName: string,
      cb: (...args: any[]) => void
    ) => TListenersRemover

    /**
     * Adds a listener that runs a callback immediately **AFTER** the
     * specified-state is no longer the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @param state The state.
     * @param cb
     *  A callback function with the signature:
     *
     *  `(toState, ...args?)`
     * @returns A function that removes the listener.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onExited('idle', toState => {
     *   console.log('We are heading to:', toState)
     * })
     *
     * machine.enter('sending')
     * // We are heading to: sending
     * ```
     */
    onExited: (
      state: string,
      cb: (toState?: string, ...args: any[]) => void
    ) => TListenersRemover

    /**
     * Adds a listener that runs a callback immediately **BEFORE** the
     * specified-state is no longer the current one.
     *
     * A function is returned that will remove the listener.
     *
     * @param state The state.
     * @param cb
     *  A callback function with the signature:
     *
     *  `(toState, ...args?)`
     * @returns A function that removes the listener.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onExited('idle', () => {
     *   console.log('Peace out!')
     * })
     *
     * machine.onExiting('idle', toState => {
     *   console.log('Heading to:', toState)
     * })
     *
     * machine.enter('receiving')
     * machine.enter('done')
     * // Heading to: receiving
     * // Peace out!
     * ```
     */
    onExiting: (
      state: string,
      cb: (toState?: string, ...args: any[]) => void
    ) => TListenersRemover

    /**
     * Adds a listener that runs a callback immediately after **ANY**
     * state-change.
     *
     * A function is returned that will remove the listener.
     *
     * @param cb
     *  A callback function with the signature:
     *
     *  `(toState, fromState, ...args?)`
     * @returns A function that removes the listener.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onSwitched((toState, fromState) => {
     *   console.log(`We went from "${fromState}" to "${toState}"`)
     * })
     *
     * machine.enter('receiving')
     * // We went from "idle" to "receiving"
     * ```
     */
    onSwitched: (
      cb: (toState?: string, fromState?: string, ...args: any[]) => void
    ) => TListenersRemover

    /**
     * Adds a listener that runs a callback immediately before **ANY**
     * state-change.
     *
     * A function is returned that will remove the listener.
     *
     * @param cb
     *  A callback function with the signature:
     *
     *  `(toState, fromState, ...args?)`
     * @returns A function that removes the listener.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onSwitching((toState, fromState) => {
     *   console.log(`Going from "${fromState}" to "${toState}"`)
     * })
     *
     * machine.enter('receiving')
     * // Going from "idle" to "receiving"
     * ```
     */
    onSwitching: (
      cb: (toState?: string, fromState?: string, ...args: any[]) => void
    ) => TListenersRemover

    /**
     * Run callbacks when transitions happen.
     *
     * If a callback returns a function, it will be invoked when
     * the state is exited in the same manner as if an {@link TStatebotFsm.onExiting}
     * handler was created using it.
     *
     * @param transitions
     *  Configuration in the form of an object, or a function that
     *  returns an object. If a function is used, there will be a single
     *  argument passed-in: an object with the following methods
     *  attached as a convenience:
     *
     *  - {@link TStatebotFsm.enter}, {@link TStatebotFsm.emit}, {@link TStatebotFsm.Enter}, {@link TStatebotFsm.Emit}
     *
     * @returns A function that removes all listeners added
     *  by this method.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.onTransitions({
     *   'idle -> sending': () => {
     *     sendData()
     *       .then(machine.Enter('done', 'sent'))
     *       .catch(machine.Enter('done', 'failed'))
     *   },
     *   'idle -> receiving': () => {
     *     receiveData()
     *       .then(machine.Enter('done', 'received'))
     *       .catch(machine.Enter('done', 'failed'))
     *   },
     *   'sending | receiving -> done': whatHappened => {
     *     console.log('All finished: ', whatHappened)
     *   }
     * })
     *
     * machine.enter('sending')
     *
     * function sendData() {
     *   return new Promise((resolve, reject) => {
     *     setTimeout(resolve, 1000)
     *     setTimeout(reject, 750 + Math.round(Math.random() * 750))
     *   })
     * }
     *
     * function receiveData() {
     *   return new Promise((resolve, reject) => {
     *     setTimeout(resolve, 1000)
     *     setTimeout(reject, 750 + Math.round(Math.random() * 750))
     *   })
     * }
     *
     * // The above example using a function for config
     * machine.onTransitions(({ Enter }) => ({
     *   'idle -> sending': () => {
     *     sendData()
     *       .then(Enter('done', 'sent'))
     *       .catch(Enter('done', 'failed'))
     *   },
     *   'idle -> receiving': () => {
     *     receiveData()
     *       .then(Enter('done', 'received'))
     *       .catch(Enter('done', 'failed'))
     *   },
     *   'sending | receiving -> done': whatHappened => {
     *     console.log('All finished: ', whatHappened)
     *   }
     * }))
     *
     * // etc...
     * ```
     */
    onTransitions: (transitions: object | Function) => Function

    /**
     * Pause the machine. {@link TStatebotFsm.emit} and {@link TStatebotFsm.enter} will be no-ops until
     * the machine is {@link TStatebotFsm.resume}'d.
     */
    pause: () => void

    /**
     * Returns `true` if the machine is {@link TStatebotFsm.pause}'d
     */
    paused: () => boolean

    /**
     * Return the state the machine will be in after {@link TStatebotFsm.emit}'ing
     * the specified event.
     *
     * Works only after using
     *  {@link TStatebotFsm.performTransitions}.
     *
     * See also: {@link TStatebotFsm.canTransitionTo}.
     *
     * @param eventName
     * @param [stateObject]
     * If `stateObject` is undefined, `.peek()` defaults to returning
     * {@link TStatebotFsm.currentState}
     * if the event will *NOT* trigger a transition. Otherwise,
     * `stateObject` will be used as a key/value lookup, with `key`
     * being the predicted state, and `value` being the corresponding
     * literal or function to be run and its value returned.
     * @returns
     * @example
     * ```js
     *
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('peek-a-boo', {
     *   chart: `
     *     idle -> running
     *   `
     * })
     *
     * machine.performTransitions({
     *   'idle -> running': {
     *     on: 'start'
     *   }
     * })
     *
     * machine.peek('start')
     * // "running"
     *
     * machine.peek('start', {
     *   'running': () => 'will be in the running state'
     * })
     * // "will be in the running state"
     *
     * machine.peek('unknown')
     * // "idle"
     * // Logs: Statebot[peek-a-boo]: Event not handled: "unknown"
     *
     * machine.peek('unknown', {
     *   'running': () => 'will be in the running state'
     * })
     * // null
     * // Logs: Statebot[peek-a-boo]: Event not handled: "unknown"
     *
     * machine.emit('start')
     * machine.peek('start')
     * // "running"
     * // Logs: Statebot[peek-a-boo]: Will not transition after emitting: "start"
     * ```
     */
    peek: (eventName: string, stateObject?: any) => any

    /**
     * Perform transitions when events happen.
     *
     * Use `then` to optionally add callbacks to those transitions.
     *
     * If a `then` method returns a function, it will be invoked when
     * the state is exited in the same manner as if an {@link TStatebotFsm.onExiting}
     * handler was created using it.
     *
     * @param transitions
     *  Configuration in the form of an object, or a function that
     *  returns an object. If a function is used, there will be a single
     *  argument passed-in: an object with the following methods
     *  attached as a convenience:
     *
     *  - {@link TStatebotFsm.enter}, {@link TStatebotFsm.emit}, {@link TStatebotFsm.Enter}, {@link TStatebotFsm.Emit}
     *
     * @returns A function that removes all listeners added by this method.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('complex-form', {
     *   chart: `
     *     idle ->
     *       update
     *
     *     // Maybe things take a long time...
     *     update ->
     *       waiting -> waiting-a-while
     *
     *     // Which path will we take?
     *     waiting | waiting-a-while ->
     *       success | failed | timeout
     *
     *     // All done!
     *     success | failed | timeout ->
     *       done
     *   `
     * })
     *
     * machine.performTransitions(({ Enter, emit }) => ({
     *   'idle -> update': {
     *     on: 'user-saved',
     *     then: (data) => {
     *       console.log('Sending data: ', data)
     *
     *       sendData(data)
     *         .then(Enter('success'))
     *         .catch(Enter('failed'))
     *
     *       emit('data-sent')
     *     }
     *   },
     *   'update -> waiting': {
     *     on: 'data-sent',
     *     then: () => {
     *       setTimeout(Enter('waiting-a-while'), 750)
     *       setTimeout(Enter('timeout'), 5000)
     *     }
     *   }
     * }))
     *
     * // Just to illustrate that you can mix n' match with onTransitions:
     * machine.onTransitions({
     *   'waiting | waiting-a-while -> success': () => {
     *     console.log('Lovely!')
     *   },
     *   'waiting | waiting-a-while -> timeout': () => {
     *     console.log('Well, at least you have your shoes')
     *   }
     * })
     *
     * machine.emit('user-saved', ['some', 'data'])
     * // Sending data: ["some", "data"]
     *
     * function sendData() {
     *   return new Promise((resolve, reject) => {
     *     setTimeout(resolve, 1000)
     *     setTimeout(reject, 750 + Math.round(Math.random() * 750))
     *   })
     * }
     * ```
     */
    performTransitions: (transitions: object | Function) => Function

    /**
     * Returns the previous state.
     *
     * @returns
     *  The previous state, or `undefined` if there isn't one (ie; you
     *  have just called {@link TStatebotFsm.reset}, or the
     *  machine has just started.)
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('simple-sender', {
     *   chart: `
     *     idle -> sending -> done
     *   `
     * })
     *
     * machine.enter('sending')
     * machine.previousState()
     * // "idle"
     * ```
     */
    previousState: () => string | undefined

    /**
     * Returns the state-machine to its starting-state and clears the
     * state-history.
     *
     * All listeners will still be attached, but no events or
     * transitions will be fired. The pause-state will be maintained.
     *
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('carousel', {
     *   chart: `
     *     page-1 ->
     *     page-2 ->
     *     page-3 ->
     *     page-4 -> page-1
     *   `
     * })
     *
     * machine.enter('page-2')
     * machine.reset()
     * machine.currentState()
     * // "page-1"
     * ```
     */
    reset: () => void

    /**
     * Resume a {@link TStatebotFsm.pause}'d machine.
     */
    resume: () => void

    /**
     * Return an `array` of states accessible from the state specified.
     * If no state is passed-in, the {@link TStatebotFsm.currentState} is used.
     *
     * @param [state] The state to check. {@link TStatebotFsm.currentState}
     *  if unspecified.
     * @returns
     * @example
     * ```js
     * import { Statebot } from 'statebot'
     *
     * let machine = Statebot('half-duplex', {
     *   chart: `
     *     idle -> sending | receiving -> done
     *   `
     * })
     *
     * machine.statesAvailableFromHere()
     * // ["sending", "receiving"]
     *
     * machine.statesAvailableFromHere('receiving')
     * // ["done"]
     * ```
     */
    statesAvailableFromHere: (state?: string) => string[]
  }

  /**
   * Create a {@link TStatebotFsm} `object`.
   *
   * @example
   * ```js
   * import { Statebot } from 'statebot'
   *
   * let machine = Statebot('lemming', {
   *   chart: `
   *     walking -> (digging | building | falling) ->
   *       walking
   *
   *     falling -> splatting
   *     walking -> exiting
   *   `
   * })
   * ```
   *
   * @param name
   *  Give your Statebot a name. Used for logging and by {@link assert.assertRoute}.
   * @param options
   */
  export function Statebot(
    name: string,
    options: TStatebotOptions
  ): TStatebotFsm

  /**
   * Decompose a {@link TStatebotChart} into an object of `states`, `routes`,
   * and `transitions`.
   *
   * Statebot() uses this internally to parse charts. Exposed for debugging.
   *
   * @param chart
   * @returns
   *
   * @example
   * ```js
   * let { states, routes, transitions } = decomposeChart`
   *   pending ->
   *     success | failure
   * `
   * // states = ['pending', 'success', 'failure']
   * // routes = [ 'pending->success', 'pending->failure']
   * // transitions = [
   * //   ['pending', 'success'],
   * //   ['pending', 'failure']
   * // ]
   * ```
   */
  export function decomposeChart(chart: TStatebotChart): {
    states: string[]
    routes: string[]
    transitions: string[][]
  }

  /**
   * Tests that an object is a {@link TStatebotFsm}.
   *
   * @example
   * ```js
   * import { Statebot } from 'statebot'
   *
   * let machine = Statebot(...)
   *
   * isStatebot(machine)
   * // true
   * ```
   *
   * @param object The object to test.
   * @returns
   */
  export function isStatebot(object: any): boolean
}
