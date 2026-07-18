import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const paths = {
  ROOT: root,
  SRC_INDEX: path.join(root, 'src/index.js'),
  SRC_BROWSER: path.join(root, 'src/browser.js'),
  SRC_ASSERT: path.join(root, 'assert/index.mjs'),
  DIST_ESM: path.join(root, 'dist/esm/statebot.mjs'),
  DIST_CJS: path.join(root, 'dist/cjs/statebot.js'),
  DIST_IIFE: path.join(root, 'dist/browser/statebot.js'),
  DIST_IIFE_MIN: path.join(root, 'dist/browser/statebot.min.js'),
  DIST_UMD: path.join(root, 'dist/umd/statebot.js'),
  DIST_UMD_MIN: path.join(root, 'dist/umd/statebot.min.js'),
  DIST_ASSERT_CJS: path.join(root, 'assert/index.cjs')
}

const eslintComment =
  '/* eslint-disable no-func-assign, no-unsafe-finally, no-unused-vars */'

function addBanner (build = '', extra = '') {
  return `/*
 * Statebot
 * v${pkg.version}
 * ${pkg.homepage}
 * License: ${pkg.license}
 */
${extra}${build}`
}

/**
 * Build matrix for esbuild. UMD paths are emitted as IIFE with a global
 * (esbuild has no UMD format); CDN/script usage matches the browser builds.
 */
const outputs = [
  {
    entry: paths.SRC_INDEX,
    outfile: paths.DIST_CJS,
    format: 'cjs',
    platform: 'node',
    external: ['mitt'],
    minify: false,
    sourcemap: true
  },
  {
    entry: paths.SRC_INDEX,
    outfile: paths.DIST_ESM,
    format: 'esm',
    platform: 'neutral',
    external: ['mitt'],
    minify: false,
    sourcemap: true
  },
  {
    entry: paths.SRC_BROWSER,
    outfile: paths.DIST_IIFE,
    format: 'iife',
    platform: 'browser',
    globalName: 'statebot',
    minify: false,
    sourcemap: true,
    bannerExtra: `/* exported statebot */\n${eslintComment}\n`
  },
  {
    entry: paths.SRC_BROWSER,
    outfile: paths.DIST_IIFE_MIN,
    format: 'iife',
    platform: 'browser',
    globalName: 'statebot',
    minify: true,
    sourcemap: false
  },
  {
    entry: paths.SRC_BROWSER,
    outfile: paths.DIST_UMD,
    format: 'iife',
    platform: 'browser',
    globalName: 'statebot',
    minify: false,
    sourcemap: true,
    bannerExtra: `/* global define, globalThis */\n${eslintComment}\n`
  },
  {
    entry: paths.SRC_BROWSER,
    outfile: paths.DIST_UMD_MIN,
    format: 'iife',
    platform: 'browser',
    globalName: 'statebot',
    minify: true,
    sourcemap: false
  },
  {
    entry: paths.SRC_ASSERT,
    outfile: paths.DIST_ASSERT_CJS,
    format: 'cjs',
    platform: 'node',
    external: [],
    minify: false,
    sourcemap: true
  }
]

export { pkg, paths, outputs, addBanner }
