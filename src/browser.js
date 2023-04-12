//
// STATEBOT EXPORTS
//

import { Statebot, isStatebot } from './statebot'
import { assertRoute, routeIsPossible } from '../assert'
import { decomposeChart } from './parsing'
import { mermaid } from './mermaid'
import { makeHooks } from '../hooks/make-hooks.mjs'

const { useEffect, useState, useMemo } = (global =>
  typeof React !== 'undefined'
    ? // eslint-disable-next-line no-undef
      React
    : global)(window)

const { useStatebot, useStatebotFactory, useStatebotEvent } = makeHooks({
  Statebot,
  useEffect,
  useState,
  useMemo
})

export {
  Statebot,
  isStatebot,
  routeIsPossible,
  assertRoute,
  decomposeChart,
  mermaid,
  useStatebot,
  useStatebotFactory,
  useStatebotEvent
}
