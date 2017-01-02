import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from './reducers/reducers'

const middleware = applyMiddleware(promise(), thunk, logger())

const enhancer = compose(
  middleware
)

export default createStore(reducer, enhancer)
