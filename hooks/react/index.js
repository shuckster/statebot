import { useState, useEffect, useMemo } from 'react'
import { Statebot } from 'statebot'
import { makeHooks } from '../make-hooks'

export const {
  useStatebot,
  useStatebotFactory,
  useStatebotEvent
} = makeHooks({ Statebot, useEffect, useState, useMemo })
