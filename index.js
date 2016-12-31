/*!
 * start-browserify <https://github.com/tunnckoCore/start-browserify>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const browserify = require('browserify')
const csm = require('convert-source-map')

const arrayify = (val) => {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}

const startBrowserify = (entry, config) => (input) => {
  return function rollup (log) {
    config = entry && typeof entry === 'object' ? entry : config
    entry = typeof entry === 'string' ? entry : input
    config = config && typeof config === 'object' ? config : {}
    config.entries = arrayify(config.entries || config.entry || entry)
    config.debug = config.debug || config.sourceMap

    return new Promise((resolve, reject) => {
      if (typeof config.dest !== 'string') {
        return reject(new Error('start-browserify: expect `dest` option'))
      }

      browserify(config).bundle((err, res) => {
        if (err) return reject(err)
        const str = res.toString(config.encoding)

        if (!config.debug) {
          return resolve({
            path: config.dest,
            data: str.trim()
          })
        }

        const index = str.search(csm.commentRegex)
        const comment = str.slice(index)
        const code = str.slice(0, index)
        const map = csm.fromComment(comment).toJSON()

        return resolve({
          path: config.dest,
          data: code.trim(),
          map: JSON.parse(map)
        })
      })
    })
  }
}

module.exports = exports['default'] = startBrowserify
