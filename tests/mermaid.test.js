const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const path = require('path')
const { mermaid } = require('../src/mermaid')
const { decomposeChart } = require('../src/parsing')

function readFile(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8')
}

const mmdtrafficLights = readFile('./traffic-lights.mmd')

const tests = [
  {
    mmd: `
      ---
      title: Traffic lights
      ---
      ::: mermaid
      stateDiagram
      direction LR
        go --> prepareToStop
          prepareToStop --> stop

        %% ...gotta keep that traffic flowing
        stop --> prepareToGo
          prepareToGo --> go
      :::
    `,
    expected: `
      go -> prepareToStop
        prepareToStop -> stop

      // ...gotta keep that traffic flowing
      stop -> prepareToGo
        prepareToGo -> go
    `
  },
  {
    mmd: mmdtrafficLights,
    expected: `
      go -> prepareToStop
        prepareToStop -> stop

      // ...gotta keep that traffic flowing
      stop -> prepareToGo
        prepareToGo -> go
    `
  },
  {
    mmd: `
      :::mermaid
      stateDiagram-v2
        [*] --> Still
        Still --> [*]

        Still --> Moving
        Moving --> Still
        Moving --> Crash
        Crash --> [*]
      :::
    `,
    expected: `
      __START__ -> Still
      Still -> __STOP__

      Still -> Moving
      Moving -> Still
      Moving -> Crash
      Crash -> __STOP__
    `
  }
]

const rxStartAndEndWhitespace = /^[\s\r\n]+|[\s\r\n]+$/g
const rxStartOfLineWhitespace = /^\s+/gm

function compact(str) {
  return str
    .replace(rxStartAndEndWhitespace, '')
    .replace(rxStartOfLineWhitespace, '')
}

tests.forEach(({ mmd, expected }, index) => {
  test(`mermaid: can parse to Statebot chart [${index}]`, () => {
    const parsedMmd = mermaid(mmd)
    assert.deepEqual(compact(parsedMmd), compact(expected))
    const mmdDecomposed = decomposeChart(parsedMmd)
    const sbDecomposed = decomposeChart(expected)
    assert.deepEqual(mmdDecomposed, sbDecomposed)
  })
})

test('mermaid: template literal test', () => {
  const parsedMmd = mermaid`
    ---
    title: Traffic lights
    ---
    stateDiagram
    direction LR
      go --> prepareToStop
        prepareToStop --> stop

      %% ...gotta keep that traffic flowing
      stop --> prepareToGo
        prepareToGo --> go
  `

  const expectedChart = `
    go -> prepareToStop
      prepareToStop -> stop

    // ...gotta keep that traffic flowing
    stop -> prepareToGo
      prepareToGo -> go
  `

  assert.deepEqual(compact(parsedMmd), compact(expectedChart))
  const mmdDecomposed = decomposeChart(parsedMmd)
  const sbDecomposed = decomposeChart(expectedChart)
  assert.deepEqual(mmdDecomposed, sbDecomposed)
})
