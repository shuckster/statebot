declare module "statebot" {
    /**
     * {@link #statebotassertroute|assertRoute()} options.
     */
    export type assertRouteOptions = {
        /**
         * Describe the success-condition for this assertion.
         */
        description?: string;
        /**
         * Wait for the machine to be in this state before assertion begins.
         */
        fromState?: string;
        /**
         * Run this function just before starting the assertion.
         */
        run?: Function;
        /**
         * If we hit an unexpected state during assertion, this is a "deviation".
         * It might be that the FSM will come back to the expected state again
         * after a certain number of these. For example, if your FSM has a
         * "retry" route configured, this number can account for it.
         */
        permittedDeviations?: number;
        /**
         * Permitted length of time for the entire assertion, in milliseconds.
         */
        timeoutInMs?: number;
        /**
         * Normally we want logs for assertions, right? Well, you can tune
         * them just like you can with {@link #statebotoptions|statebotOptions}.
         */
        logLevel?: number;
    };
    /**
     * Options for creating a Statebot.
     */
    export type statebotOptions = {
        /**
         * The state-chart.
         */
        chart: statebotChart;
        /**
         * The state in which to start. If unspecified, the first state in the
         * chart will be used.
         */
        startIn?: string;
        /**
         * How noisy the logging is, from 1 to 3:
         * ```
         * 1) console.warn
         * 2) console.warn/log/table
         * 3) console.warn/log/table/info
         * ```
         * `3` is the default. Argument type-errors will always `throw`.
         */
        logLevel?: number;
        /**
         * Limit how much history the state-machine keeps. Accessed via
         * {@link #statebotfsmhistory|statebotFsm#history()}.
         */
        historyLimit?: number;
        /**
         * If you wish to have your Statebots listen to events coming from
         * a shared EventEmitter, you can pass it in here. The `emit()`/`onEvent()`/
         * `performTransitions()` methods will use it.
         *
         * It should have the same signature as {@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}.
         *
         * - Since Statebot 2.5.0 {@link https://npmjs.com/mitt|mitt} is also compatible.
         * - Since Statebot 2.6.0 {@link https://npmjs.com/mitt|mitt} is used internally.
         */
        events?: any;
    };
    /**
     * A description of all the states in a machine, plus all of the
     * permitted transitions between them.
     *
     * This is defined using a `string` or an `array` of strings, but
     *  {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals|Template Literals}
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
     * var promiseLikeChart = `
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
     * var promiseLikeChart = `
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
     * var promiseLikeChart = `
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
     * var promiseLikeChart = `
     *   pending -> resolved | rejected -> done
     * `
     * ```
     *
     * Charts can also be split across multiple-lines:
     *
     * ```js
     * var promiseLikeChart = `
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
     * var promiseLikeChart = `
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
     * var dragDropChart = `
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
    export type statebotChart = string | string[];
    /**
     * Create a {@link #statebotfsm|statebotFsm} `object`.
     *
     * @memberof statebot
     * @function
     * @example
     * var machine = Statebot('lemming', {
     *   chart: `
     *     walking -> (digging | building | falling) ->
     *       walking
     *
     *     falling -> splatting
     *     walking -> exiting
     *   `
     * })
     *
     * @param {string} name
     *  Give your Statebot a name. Used for logging and by {@link #statebotassertroute|assertRoute()}.
     * @param {statebotOptions} options
     */
    export function Statebot(name: string, options: statebotOptions): {
        /**
         * For identifying Statebot objects.
         *
         * @private
         */
        __STATEBOT__: number;
        /**
         * Tests to see if we can transition to the specified state from
         * the {@link #statebotfsmcurrentstate|.currentState()}.
         *
         * If more than one state is specified, `true` is returned only if
         * **ALL** states are available.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string|string[]} states
         * @returns {boolean}
         * @example
         * var machine = Statebot('game-menus', {
         *   chart: `
         *     loading ->
         *       menu ->
         *         play |
         *         options |
         *         sound |
         *         quit
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
         */
        canTransitionTo: (...states: any[]) => any;
        /**
         * Returns the current state.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @returns {string}
         *
         * @example
         * var machine = Statebot('coroutine', {
         *   chart: `
         *     suspended -> running -> (suspended | dead)
         *   `
         * })
         *
         * machine.currentState()
         * // "suspended"
         */
        currentState: () => any;
        /**
         * Immediately emits an event, firing any listeners added using
         * {@link #statebotfsmperformtransitions|.performTransitions()} or {@link #statebotfsmonevent|.onEvent()}.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} eventName
         * @param {...*} [args]
         *  Optional arguments to pass to listeners.
         * @returns {boolean}
         *  Whether or not the event had listeners.
         *
         *  See: {@link https://nodejs.org/api/events.html#events_emitter_emit_eventname_args|Node Events}
         *  for more information.
         *
         * Statebot imports `EventEmitter` from the
         *  {@link https://www.npmjs.com/package/events|events}
         * package for dealing with events in the browser.
         *
         * Since Statebot 2.6.0 {@link https://npmjs.com/mitt|mitt} is
         * used for both the browser and non-browser builds.
         *
         * @example
         * var machine = Statebot('basic-form', {
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
         */
        emit: (...args: any[]) => any;
        /**
         * Creates a function that emits the specified event.
         *
         * (This is essentially a convenience wrapper around {@link #statebotfsmemit|.emit()}.)
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} eventName
         *  The desired event to {@link #statebotfsmemit|.emit()}.
         * @param {...*} [curriedArgs]
         *  Arguments that will curry into the returned `emit()` function
         *  whenever it is called.
         * @returns {function} A function that emits that event.
         *
         * @example
         * var machine = Statebot('traffic-lights', {
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
         * var nextTrafficLight = machine.Emit('timer')
         * machine.currentState()
         * // "stop"
         *
         * nextTrafficLight()
         * nextTrafficLight()
         * nextTrafficLight()
         *
         * machine.currentState()
         * // "prepare-to-stop"
         */
        Emit: (eventName: any, ...curriedArgs: any[]) => (...args: any[]) => any;
        /**
         * Immediately changes to the specified state, so long as it is
         * accessible from the {@link #statebotfsmcurrentstate|.currentState()}.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} state The desired state to switch-to.
         * @param {...*} [args]
         *  Optional arguments to pass to transition callbacks.
         * @returns {boolean} Whether or not the state changed.
         *
         * @example
         * var machine = Statebot('dialog', {
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
         * // [dialog]: Invalid transition "idle->saving", not switching
         * // > Previous transition: "[undefined]->idle"
         * // > From "idle", valid states are: ["showing-modal"]
         *
         * machine.enter('showing-modal')
         * // true
         */
        enter: (...args: any[]) => any;
        /**
         * Creates a function that changes to the specified state, so long
         * as it is accessible from the {@link #statebotfsmcurrentstate|.currentState()}.
         *
         * (This is essentially a convenience wrapper around {@link #statebotfsmenter|.enter()}.)
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} state The desired state to switch-to.
         * @param {...*} [curriedArgs]
         *  Arguments that will curry into the returned `enter()` function
         *  whenever it is called.
         * @returns {function}
         *  A function that can change the state when called.
         *
         * @example
         * var machine = Statebot('popup-menu', {
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
         */
        Enter: (state: any, ...curriedArgs: any[]) => (...args: any[]) => any;
        /**
         * Returns all states the machine has been in so far, up to a limit set
         * by `historyLimit` in {@link statebotOptions}.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @returns {string[]} A copy of the state-history.
         *
         * @example
         * var machine = Statebot('downloader', {
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
         */
        history: () => string[];
        /**
         * Print information about the current machine to the console.
         *
         * @memberof statebotFsm
         * @instance
         * @example
         * var machine = Statebot('half-duplex', {
         *   chart: `
         *     idle -> sending | receiving -> done
         *   `
         * })
         *
         * machine.info()
         * // [half-duplex]: Information about this state-machine.
         * // [half-duplex]: Listening for the following state-changes:
         * // ┌─────────┬─────────────┬────────┐
         * // │ (index) │   states    │   #    │
         * // ├─────────┼─────────────┼────────┤
         * // │    0    │   'done'    │ 'None' │
         * // │    1    │   'idle'    │ 'None' │
         * // │    2    │ 'receiving' │ 'None' │
         * // │    3    │  'sending'  │ 'None' │
         * // └─────────┴─────────────┴────────┘
         * // [half-duplex] Listening for the following transitions:
         * // ┌─────────┬───────────────────┬────────┐
         * // │ (index) │    transitions    │   #    │
         * // ├─────────┼───────────────────┼────────┤
         * // │    0    │ 'idle->receiving' │ 'None' │
         * // │    1    │  'idle->sending'  │ 'None' │
         * // │    2    │ 'receiving->done' │ 'None' │
         * // │    3    │  'sending->done'  │ 'None' │
         * // └─────────┴───────────────────┴────────┘
         * // [half-duplex]: Listening for the following events:
         * // (No information)
         */
        info: () => void;
        /**
         * Get information about the current machine.
         *
         * Same details as {@link #statebotfsminfo|.info()} in object-form.
         *
         * @memberof statebotFsm
         * @instance
         * @returns {object}
         * @example
         * var machine = Statebot('half-duplex', {
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
         */
        inspect: () => object;
        /**
         * Checks if the {@link #statebotfsmcurrentstate|.currentState()}
         * matches the specified `state`, immediately returning either
         * `true` or `false`.
         *
         * If `outputWhenTrue` is specified, then it will be returned
         * instead of `true`, and `null` will be returned instead of
         *  `false`.
         *
         * If a function is specified, then its return-value will be used
         * as the `true`-value.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} state The state to test against.
         * @param {any|function} [outputWhenTrue]
         *  Optional `true`-value. If a function is specified, it will be
         *  called and its return value will be used.
         * @param {...*} [fnArgs]
         *  Arguments that will pass into `outputWhenTrue()` if it has
         *  been defined as a function.
         * @returns {boolean|null|*}
         *
         * @example
         * var machine = Statebot('little-revver', {
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
         * machine.inState('idle', () => {
         *   console.log('Idling!')
         *   return 'Purrrr...'
         * })
         * // null
         * // ^ the function is not called at all in the `false` case,
         * //   so no console.log either.
         */
        inState: (state: any, anyOrFn: any, ...fnArgs: any[]) => any;
        /**
         * Returns a function which, when run, tests that
         * {@link #statebotfsmcurrentstate|.currentState()} matches the
         * specified state, returning either `true` or `false`.
         *
         * If `outputWhenTrue` is specified, then it will be returned
         * instead of `true`, and `null` will be returned instead of
         *  `false`.
         *
         * (This is essentially a convenience wrapper around {@link #statebotfsminstate|.inState()}.)
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} state The state to test against.
         * @param {any|function} [outputWhenTrue]
         *  Optional `true`-value. If a function is specified, it will be
         *  called and its return value will be used.
         * @param {...*} [curriedFnArgs]
         *  Arguments that will curry into `outputWhenTrue()` if it has
         *  been defined as a function.
         * @returns {function}
         *  A function that calls {@link #statebotfsminstate|.inState()}.
         *
         * @example
         * var machine = Statebot('little-revver', {
         *   chart: `
         *     idle ->
         *       (gear-1 | gear-2 | reverse) ->
         *     idle
         *   `
         * })
         *
         * var idling = machine.InState('idle')
         * var purring = machine.InState('idle', () => {
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
         */
        InState: (state: any, anyOrFn: any, ...curriedFnArgs: any[]) => (...fnArgs: any[]) => any;
        /**
         * Returns the name of the state-machine.
         *
         * Used for logging and also by {@link #statebotassertroute|assertRoute()}
         * for the same.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @returns {string} The name of the state-machine.
         *
         * @example
         * var machine = Statebot('Ay, there’s the rub.', {
         *   chart: `
         *     the-question -> (to-be | not-to-be)
         *       not-to-be -> perchance-to-dream
         *   `
         * })
         *
         * machine.name()
         * // "Ay, there’s the rub."
         */
        name: () => string;
        /**
         * Adds a listener that runs a callback immediately **AFTER** the
         * specified-state becomes the current one.
         *
         * A function is returned that will remove the listener.
         *
         * @memberof statebotFsm
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
         * var machine = Statebot('half-duplex', {
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
         */
        onEntered: any;
        /**
         * Adds a listener that runs a callback immediately **BEFORE** the
         * specified-state becomes the current one.
         *
         * A function is returned that will remove the listener.
         *
         * @memberof statebotFsm
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
         * var machine = Statebot('half-duplex', {
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
         */
        onEntering: any;
        /**
         * {@link #statebotfsmonentering .onEntering()} /
         * {@link #statebotfsmonentered .onEntered()} callback signature.
         *
         * @callback enterCallback
         * @param {string} fromState
         * @param {...any} [args]
         *  Arguments passed-down from {@link #statebotfsmenter .enter()} or
         *  {@link #statebotfsmemit .emit()}
         */
        /**
         * Adds a listener that runs a callback immediately after the specified
         * event is called.
         *
         * A function is returned that will remove the listener.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} name The event name.
         * @param {function} cb The callback.
         * @returns {function} A function that removes the listener.
         *
         * @example
         * var machine = Statebot('traffic-lights', {
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
         */
        onEvent: (eventName: any, cb: any) => () => void;
        /**
         * Adds a listener that runs a callback immediately **AFTER** the
         * specified-state is no longer the current one.
         *
         * A function is returned that will remove the listener.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} state The state.
         * @param {exitCallback} cb
         *  A callback function with the signature:
         *
         *  `(toState, ...args?)`
         * @returns {function} A function that removes the listener.
         *
         * @example
         * var machine = Statebot('half-duplex', {
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
         */
        onExited: any;
        /**
         * Adds a listener that runs a callback immediately **BEFORE** the
         * specified-state is no longer the current one.
         *
         * A function is returned that will remove the listener.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} state The state.
         * @param {exitCallback} cb
         *  A callback function with the signature:
         *
         *  `(toState, ...args?)`
         * @returns {function} A function that removes the listener.
         *
         * @example
         * var machine = Statebot('half-duplex', {
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
         */
        onExiting: any;
        /**
         * {@link #statebotfsmonexiting .onExiting()} /
         * {@link #statebotfsmonexited .onExited()} callback signature.
         *
         * @callback exitCallback
         * @param {string} toState
         * @param {...any} [args]
         *  Arguments passed-down from {@link #statebotfsmenter .enter()} or
         *  {@link #statebotfsmemit .emit()}
         */
        /**
         * Adds a listener that runs a callback immediately after **ANY**
         * state-change.
         *
         * A function is returned that will remove the listener.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {switchCallback} cb
         *  A callback function with the signature:
         *
         *  `(toState, fromState, ...args?)`
         * @returns {function} A function that removes the listener.
         *
         * @example
         * var machine = Statebot('half-duplex', {
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
         */
        onSwitched: any;
        /**
         * Adds a listener that runs a callback immediately before **ANY**
         * state-change.
         *
         * A function is returned that will remove the listener.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {switchCallback} cb
         *  A callback function with the signature:
         *
         *  `(toState, fromState, ...args?)`
         * @returns {function} A function that removes the listener.
         *
         * @example
         * var machine = Statebot('half-duplex', {
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
         */
        onSwitching: any;
        /**
         * {@link #statebotfsmonswitching .onSwitching()} /
         * {@link #statebotfsmonswitched .onSwitched()} callback signature.
         *
         * @callback switchCallback
         * @param {string} toState
         * @param {string} fromState
         * @param {...any} [args]
         *  Arguments passed-down from {@link #statebotfsmenter .enter()} or
         *  {@link #statebotfsmemit .emit()}
         */
        /**
         * Run callbacks when transitions happen.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {object|function} transitions
         *  Configuration in the form of an object, or a function that
         *  returns an object. If a function is used, there will be a single
         *  argument passed-in: an object with the following methods
         *  attached as a convenience:
         *
         *  - {{@link #statebotfsmenter|.enter()}, {@link #statebotfsmemit|.emit()}, {@link #enter-state-1 .Enter()}, {@link #emit-name .Emit()}}
         *
         * @returns {function} A function that removes all listeners added
         *  by this method.
         *
         * @example
         * var machine = Statebot('half-duplex', {
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
         * @example
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
         */
        onTransitions: (transitions: object | Function) => Function;
        /**
         * Pause the machine. {@link #statebotfsmemit|.emit()} and {@link #statebotfsmenter|.enter()} will be no-ops until
         * the machine is {@link #statebotfsmresume|.resume()}'d.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         */
        pause: () => void;
        /**
         * Returns `true` if the machine is {@link #statebotfsmpause|.pause()}'d
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @returns {boolean}
         */
        paused: () => boolean;
        /**
         * Perform transitions when events happen.
         *
         * Use `then` to optionally add callbacks to those transitions.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {object|function} transitions
         *  Configuration in the form of an object, or a function that
         *  returns an object. If a function is used, there will be a single
         *  argument passed-in: an object with the following methods
         *  attached as a convenience:
         *
         *  - {{@link #statebotfsmenter|.enter()}, {@link #statebotfsmemit|.emit()}, {@link #enter-state-1 .Enter()}, {@link #emit-name .Emit()}}
         *
         * @returns {function} A function that removes all listeners added
         *  by this method.
         *
         * @example
         * var machine = Statebot('complex-form', {
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
         */
        performTransitions: (transitions: object | Function) => Function;
        /**
         * Returns the previous state.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @returns {string|undefined}
         *  The previous state, or `undefined` if there isn't one (ie; you
         *  have just called {@link #statebotfsmreset|.reset()}, or the
         *  machine has just started.)
         *
         * @example
         * var machine = Statebot('simple-sender', {
         *   chart: `
         *     idle -> sending -> done
         *   `
         * })
         *
         * machine.enter('sending')
         * machine.previousState()
         * // "idle"
         */
        previousState: () => any;
        /**
         * Returns the state-machine to its starting-state and clears the
         * state-history.
         *
         * All listeners will still be attached, but no events or
         * transitions will be fired. The pause-state will be maintained.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         *
         * @example
         * var machine = Statebot('carousel', {
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
         */
        reset: () => void;
        /**
         * Resume a {@link #statebotfsmpause|.pause()}'d machine.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         */
        resume: () => void;
        /**
         * Return an `array` of states accessible from the state specified.
         * If no state is passed-in, the {@link #statebotfsmcurrentstate|.currentState()} is used.
         *
         * @memberof statebotFsm
         * @instance
         * @function
         * @param {string} [state] The state to check. {@link #statebotfsmcurrentstate|.currentState()}
         *  if unspecified.
         * @returns {String[]}
         * @example
         * var machine = Statebot('half-duplex', {
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
         */
        statesAvailableFromHere: (state: any) => any;
    };
    /**
     * {@link #statebotassertroute|assertRoute()} options.
     * @typedef {Object} assertRouteOptions
     * @property {string} [description]
     *  Describe the success-condition for this assertion.
     * @property {string} [fromState=""]
     *  Wait for the machine to be in this state before assertion begins.
     * @property {function} [run]
     *  Run this function just before starting the assertion.
     * @property {number} [permittedDeviations=0]
     *  If we hit an unexpected state during assertion, this is a "deviation".
     *  It might be that the FSM will come back to the expected state again
     *  after a certain number of these. For example, if your FSM has a
     *  "retry" route configured, this number can account for it.
     * @property {number} [timeoutInMs=1000]
     *  Permitted length of time for the entire assertion, in milliseconds.
     * @property {number} [logLevel=3]
     *  Normally we want logs for assertions, right? Well, you can tune
     *  them just like you can with {@link #statebotoptions|statebotOptions}.
     */
    /**
     * Assert that a {@link #statebotfsm|statebotFsm} traced the route specified.
     *
     * Whereas {@link #statebotrouteispossible|routeIsPossible()} only checks
     * that a particular route can be followed, `assertRoute` will hook-into
     * a machine and wait for it to trace the specified path within a
     * timeout period.
     *
     * @memberof statebot
     * @function
     * @async
     * @param {statebotFsm} machine
     *  The machine to run the assertion on.
     * @param {string|string[]} expectedRoute
     *  The expected route as an arrow-delimited string:
     *
     *  `
     *  "idle -> pending -> success -> done"
     *  `
     * @param {assertRouteOptions} [options]
     * @returns {Promise}
     *
     * @example
     * var machine = Statebot(...)
     *
     * assertRoute(
     *   machine, 'prepare -> debounce -> sending -> done -> idle',
     *   {
     *     description: 'Email sent with no issues',
     *     fromState: 'idle',
     *     timeoutInMs: 1000 * 20,
     *     permittedDeviations: 0,
     *     logLevel: 3
     *   }
     * )
     * .then(() => console.log('Assertion passed!'))
     * .catch(err => console.error(`Whoops: ${err}`))
     *
     * machine.enter('idle')
     */
    export function assertRoute(machine: any, expectedRoute: string | string[], options?: assertRouteOptions): Promise<any>;
    /**
     * Decompose a {@link statebotChart} into an object of `states`, `routes`,
     * and `transitions`.
     *
     * Statebot() uses this internally to parse charts. Exposed for debugging.
     *
     * @memberof statebot
     * @function
     * @param {statebotChart} chart
     * @returns {Object}
     *
     * @example
     * var { states, routes, transitions } = decomposeChart`
     *   pending ->
     *     success | failure
     * `
     * // states = ['pending', 'success', 'failure']
     * // routes = [ 'pending->success', 'pending->failure']
     * // transitions = [
     * //   ['pending', 'success'],
     * //   ['pending', 'failure']
     * // ]
     */
    export function decomposeChart(chart: statebotChart): any;
    /**
     * Tests that an object is a {@link #statebotfsm|statebotFsm}.
     *
     * @memberof statebot
     * @function
     * @example
     * var machine = Statebot(...)
     *
     * isStatebot(machine)
     * // true
     *
     * @param {any} object The object to test.
     * @returns {boolean}
     */
    export function isStatebot(object: any): boolean;
    /**
     * Assert that a certain route can be followed by a
     * {@link #statebotfsm|statebotFsm}.
     *
     * This merely tests that a certain path can be taken through a
     * state-machine. It doesn't assert that the states are moved-through
     * while the machine is working, as with
     * {@link #statebotassertroute|assertRoute()}.
     *
     * @memberof statebot
     * @function
     * @param {statebotFsm} machine
     *  The machine to test the route on.
     * @param {string|string[]} route
     *  The route to test as an arrow-delimited string:
     *
     *  `
     *  "idle -> pending -> success -> done"
     *  `
     * @returns {boolean}
     *
     * @example
     * var machine = Statebot(...)
     *
     * routeIsPossible(machine,
     *   'walking -> falling -> splatting -> walking'
     * )
     * // false
     */
    export function routeIsPossible(machine: any, route: string | string[]): boolean;
}
