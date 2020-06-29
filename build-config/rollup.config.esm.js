import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

import pkg from '../package.json'
import { banner, terserConfig } from './rollup.common.js'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/esm/statebot.dev.mjs',
      banner: banner(pkg),
      format: 'es',
      name: 'statebot',
      exports: 'named',
      sourcemap: 'inline'
    },
    {
      file: 'dist/esm/statebot.min.mjs',
      banner: banner(pkg),
      format: 'es',
      name: 'statebot',
      exports: 'named',
      plugins: [terser(terserConfig)]
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
