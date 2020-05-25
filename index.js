'use strict'

if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./dist/cjs/statebot.dev.js')
} else {
  module.exports = require('./dist/cjs/statebot.min.js')
}
