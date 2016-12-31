/*!
 * start-browserify <https://github.com/tunnckoCore/start-browserify>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const startBrowserify = require('./index')

test('start-browserify', (done) => {
  startBrowserify()
  done()
})
