/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store'
import { usedMiddleWares } from '../src/js/store'

const mockStore = configureMockStore(usedMiddleWares)

export default mockStore
