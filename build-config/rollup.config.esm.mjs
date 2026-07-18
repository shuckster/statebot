import { createRequire } from 'node:module'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

import { banner } from './rollup.common.mjs'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

export default {
  input: 'src/index.js',
  external: ['mitt'],
  output: [
    {
      file: 'dist/esm/statebot.mjs',
      banner: banner(pkg),
      format: 'es',
      name: 'statebot',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [json(), resolve(), commonjs(), cleanup()]
}
