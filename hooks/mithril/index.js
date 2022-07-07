import { useState, useEffect, useMemo } from 'mithril-hooks'
import { Statebot } from 'statebot'
import { makeHooks } from '../make-hooks'

export const {
  useStatebot,
  useStatebotFactory,
  useStatebotEvent
} = makeHooks({ Statebot, useEffect, useState, useMemo })
