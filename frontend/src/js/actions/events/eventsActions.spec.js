/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { fetchEvents } from './eventsActions'
import actions from '../actionTypes'

const expect = chai.expect
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('eventsActions', () => {
  let store
  let mock

  beforeEach(() => {
    store = mockStore({})
    mock = new MockAdapter(axios)
  })

  describe('#fetchEvents()', () => {
    it('should call /api/events and dispatch success events', (done) => {
      mock.onGet('/api/events').reply(200, [{ id: 1 }])

      const expectedActions = [
        {
          type: actions.events.fetch.started,
        },
        {
          type: actions.events.fetch.fulfilled,
          payload: [{ id: 1 }],
        },
      ]

      store.dispatch(fetchEvents())
        .then(() => { // return of async action
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch(e => done(e))
    })

    it('should call /api/events and dispatch errors events', (done) => {
      mock.onGet('/api/events').reply(500,
        {
          message: 'error',
        })

      const expectedActions = [
        { type: actions.events.fetch.started },
        { type: actions.events.fetch.rejected },
      ]

      store.dispatch(fetchEvents())
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch(e => done(e))
    })
  })
})
