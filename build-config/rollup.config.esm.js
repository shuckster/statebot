import builtins from 'rollup-plugin-node-builtins'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

import pkg from '../package.json'
import { banner } from './rollup.common.js'

export default {
  input: 'src/index.js',
  external: ['mitt'],
  output: [
    {
      file: 'dist/esm/statebot.js',
      banner: banner(pkg),
      format: 'es',
      name: 'statebot',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [json(), builtins(), resolve(), commonjs(), cleanup()]
}
