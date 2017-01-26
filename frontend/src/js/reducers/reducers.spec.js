/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import { createStore } from 'redux'
import reducers from './reducers'

const expect = chai.expect

describe('reducers', () => {
  it('Should have the correct root keys', () => {
    const store = createStore(reducers)
    expect(Object.keys(store.getState())).to.eql([
      'alerts',
      'events',
      'user',
      'users',
    ])
  })
})

