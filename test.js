/*!
 * start-browserify <https://github.com/tunnckoCore/start-browserify>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const extend = require('extend-shallow')
const browserify = require('./index')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const config = {
  entry: './fixture.js',
  dest: './fixture.bundle.js',
  transform: [['rollupify', {
    config: {
      context: {},
      plugins: [commonjs(), nodeResolve({
        preferBuiltins: true,
        jsnext: true
      }), buble({
        target: {
          node: '0.12'
        }
      })]
    }
  }]]
}

test('start-browserify: no sourcemaps', function (done) {
  let options = extend({}, config)
  options.debug = false
  browserify(options)()(() => {}).then((file) => {
    test.strictEqual(file.path, './fixture.bundle.js')
    test.strictEqual(file.data.indexOf('tryCatch.call') > 0, true)
    test.strictEqual(file.data.indexOf('eachSerial') > 0, true)
    test.strictEqual(file.data.indexOf('globby') > 0, true)
    test.strictEqual(file.data.indexOf('minimatch') > 0, true)
    test.strictEqual(file.map, undefined)

    // should not found `eachParallel` function, it is not used...
    // test.strictEqual(file.data.indexOf('eachParallel') === -1, true)
    done()
  }).catch(done)
})

test('with sourcemap', function (done) {
  let options = extend({}, config)
  options.debug = true
  browserify(options)()(() => {}).then((file) => {
    test.strictEqual(file.path, './fixture.bundle.js')
    test.strictEqual(file.data.indexOf('tryCatch.call') > 0, true)
    test.strictEqual(file.map && typeof file.map === 'object', true)

    // should not found `eachParallel` function, it is not used...
    // test.strictEqual(file.data.indexOf('eachParallel') === -1, true)
    done()
  }).catch(done)
})
