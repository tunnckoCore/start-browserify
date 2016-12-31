'use strict'

// index.js
import aaarr from './foobar'
import { serial } from './each-promise' // just a tweak

export default serial(aaarr)

// // import { serial } from 'each-promise'
// const eachPromise = require('each-promise')
// const arr = [
//   123,
//   'foo',
//   () => 456,
//   Promise.resolve(567),
//   false,
//   () => Promise.resolve(11)
// ]

// // export default serial(arr)

// module.exports = exports['default'] = eachPromise.serial(arr)
