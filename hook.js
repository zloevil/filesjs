/* eslint-disable */
require('babel-register')
require('dotenv').config()

if (process.env.TRACE) {
  Error.stackTraceLimit = 5
  require('trace')
  require('clarify')
}

require('./app')
