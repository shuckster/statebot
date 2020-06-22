'use strict'

if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'production'
) {
  module.exports = require('./dist/cjs/statebot.min.js')
} else {
  module.exports = require('./dist/cjs/statebot.dev.js')
}
