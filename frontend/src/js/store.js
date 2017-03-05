import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from './reducers/reducers'

export const usedMiddleWares = [
  promise(),
  thunk,
  logger(),
]

const middleware = applyMiddleware(...usedMiddleWares)

const enhancer = compose(
  middleware
)

export default createStore(reducer, enhancer)
