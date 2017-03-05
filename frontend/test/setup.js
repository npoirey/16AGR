/**
 * Enable jsdom for rendering in tests
 */
/* eslint-disable import/no-extraneous-dependencies */
import { jsdom } from 'jsdom'

// noinspection JSPrimitiveTypeWrapperUsage
global.document = jsdom('')
// noinspection JSPrimitiveTypeWrapperUsage
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})
// noinspection JSPrimitiveTypeWrapperUsage
global.navigator = {
  userAgent: 'node.js',
}
