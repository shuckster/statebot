'use strict'

// Added for compatibility with a project using Rollup
let proc
try {
  proc = process
} catch (e) {
  proc = { env: { NODE_ENV: 'development' } }
}

if (proc.env.NODE_ENV !== 'production') {
  module.exports = require('./dist/cjs/statebot.dev.js')
} else {
  module.exports = require('./dist/cjs/statebot.min.js')
}
