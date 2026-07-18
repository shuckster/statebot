import { createRequire } from 'node:module'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'

import { banner } from './rollup.common.mjs'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

export default {
  input: 'assert/index.mjs',
  output: [
    {
      file: 'assert/index.cjs',
      banner: banner(pkg),
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    resolve({ preferBuiltins: false }),
    commonjs(),
    cleanup()
  ]
}
