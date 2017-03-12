/**
 * Enable jsdom for rendering in tests
 */
/* eslint-disable import/no-extraneous-dependencies */
import { jsdom } from 'jsdom'
import injectTapEventPlugin from 'react-tap-event-plugin'


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

// TODO Needed for onTouchTap
// This dependency is temporary and will go away once the official React version is released
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
