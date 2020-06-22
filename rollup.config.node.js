import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'
import { banner, terserConfig } from './rollup.common.js'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/cjs/statebot.dev.js',
      banner: banner(pkg),
      format: 'cjs',
      sourcemap: 'inline'
    },
    {
      file: 'dist/cjs/statebot.min.js',
      banner: banner(pkg),
      format: 'cjs',
      plugins: [terser(terserConfig)]
    }
  ],
  external: ['events'],
  plugins: [
    json(),
    builtins(),
    resolve(),
    commonjs(),
    cleanup({ comments: 'jsdoc' })
  ]
}
