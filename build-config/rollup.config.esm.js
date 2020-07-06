import builtins from 'rollup-plugin-node-builtins'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

import pkg from '../package.json'
import { banner } from './rollup.common.js'

export default {
  input: 'src/index.js',
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
  plugins: [
    json(),
    builtins(),
    resolve(),
    commonjs(),
    cleanup({ comments: 'jsdoc' })
  ]
}
