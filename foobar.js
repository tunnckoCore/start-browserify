// hello.js
import tryCatchCallback from 'try-catch-callback'
import files from 'start-files'
// import { parse } from 'acorn'

const arr = [
  123,
  'foo',
  () => files('*.js')()(() => {}),
  Promise.resolve(567),
  false,
  // () => parse('var foo = 123'),
  () => Promise.resolve(11)
]

export default tryCatchCallback(() => arr, { 'return': true })
