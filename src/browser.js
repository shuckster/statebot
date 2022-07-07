
//
// STATEBOT EXPORTS
//

import { Statebot, isStatebot } from './statebot'
import { assertRoute, routeIsPossible } from '../assert'
import { decomposeChart } from './parsing'
import { makeHooks } from '../hooks/make-hooks'

const { useEffect, useState, useMemo } = ((global) =>
  typeof React !== 'undefined'
    // eslint-disable-next-line no-undef
    ? React
    : global
)(window)

const {
  useStatebot,
  useStatebotFactory,
  useStatebotEvent
} = makeHooks({ Statebot, useEffect, useState, useMemo })

export {
  Statebot,
  isStatebot,
  routeIsPossible,
  assertRoute,
  decomposeChart,
  useStatebot,
  useStatebotFactory,
  useStatebotEvent
}
