import { TStatebotFsm } from 'statebot'

declare module 'statebot/assert' {
  /**
   * {@link assertRoute} options.
   */
  export interface TAssertRouteOptions {
    /**
     * Describe the success-condition for this assertion.
     */
    description?: string
    /**
     * Wait for the machine to be in this state before assertion begins.
     */
    fromState?: string
    /**
     * Run this function just before starting the assertion.
     */
    run?: Function
    /**
     * If we hit an unexpected state during assertion, this is a "deviation".
     * It might be that the FSM will come back to the expected state again
     * after a certain number of these. For example, if your FSM has a
     * "retry" route configured, this number can account for it.
     */
    permittedDeviations?: number
    /**
     * Permitted length of time for the entire assertion, in milliseconds.
     */
    timeoutInMs?: number
    /**
     * Normally we want logs for assertions, right? Well, you can tune
     * them just like you can with {@link index.TStatebotOptions}.
     */
    logLevel?: 0 | 1 | 2 | 3
  }

  /**
   * Assert that a {@link index.TStatebotFsm} traced the route specified.
   *
   * Whereas {@link routeIsPossible} only checks
   * that a particular route can be followed, `assertRoute` will hook-into
   * a machine and wait for it to trace the specified path within a
   * timeout period.
   *
   * @param machine
   *  The machine to run the assertion on.
   * @param expectedRoute
   *  The expected route as an arrow-delimited string:
   *
   *  `
   *  "idle -> pending -> success -> done"
   *  `
   * @param [options]
   * @returns
   *
   * @example
   * ```js
   * import { Statebot } from 'statebot'
   * import { assertRoute } from 'statebot/assert'
   *
   * let machine = Statebot(...)
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
   * ```
   */
  export function assertRoute(
    machine: TStatebotFsm,
    expectedRoute: string | string[],
    options?: TAssertRouteOptions
  ): Promise<any>

  /**
   * Assert that a certain route can be followed by a
   * {@link index.TStatebotFsm}.
   *
   * This merely tests that a certain path can be taken through a
   * state-machine. It doesn't assert that the states are moved-through
   * while the machine is working, as with
   * {@link assertRoute}.
   *
   * @param machine
   *  The machine to test the route on.
   * @param route
   *  The route to test as an arrow-delimited string:
   *
   *  `
   *  "idle -> pending -> success -> done"
   *  `
   * @returns
   *
   * @example
   * ```js
   * import { Statebot } from 'statebot'
   * import { routeIsPossible } from 'statebot/assert'
   *
   * let machine = Statebot(...)
   *
   * routeIsPossible(machine,
   *   'walking -> falling -> splatting -> walking'
   * )
   * // false
   * ```
   */
  export function routeIsPossible(
    machine: TStatebotFsm,
    route: string | string[]
  ): boolean
}
