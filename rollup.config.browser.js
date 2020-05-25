import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'
import { banner, terserConfig } from './rollup.common.js'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/browser/statebot.dev.js',
      banner: banner(pkg),
      format: 'iife',
      name: 'statebot',
      exports: 'named',
      sourcemap: 'inline'
    },
    {
      file: 'dist/browser/statebot.min.js',
      banner: banner(pkg),
      format: 'iife',
      name: 'statebot',
      exports: 'named',
      plugins: [terser(terserConfig)]
    },
    {
      file: 'dist/umd/statebot.dev.js',
      banner: banner(pkg),
      format: 'umd',
      name: 'statebot',
      exports: 'named',
      sourcemap: 'inline'
    },
    {
      file: 'dist/umd/statebot.min.js',
      banner: banner(pkg),
      format: 'umd',
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
    cleanup({ comments: 'jsdoc' }),
    babel({ babelHelpers: 'bundled' })
  ]
}
