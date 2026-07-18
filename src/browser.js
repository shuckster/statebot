//
// STATEBOT EXPORTS
//

import { Statebot, isStatebot } from './statebot.js'
import { assertRoute, routeIsPossible } from '../assert/index.mjs'
import { decomposeChart } from './parsing.js'
import { mermaid } from './mermaid.js'
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
