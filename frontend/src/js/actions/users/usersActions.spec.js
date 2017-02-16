/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { fetchUsers } from './usersActions'
import actions from '../actionTypes'

const expect = chai.expect
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('usersActions', () => {
  let store
  let mock

  beforeEach(() => {
    store = mockStore({})
    mock = new MockAdapter(axios)
  })

  describe('#fetchUsers()', () => {
    it('should call /api/users/synthesis and dispatch success events', (done) => {
      let callConfig
      mock.onPost('/api/users/synthesis')
        .reply((config) => {
          callConfig = config
          return [200, [{ id: 1 }]]
        })

      const expectedActions = [
        {
          type: actions.users.fetch.started,
        },
        {
          type: actions.users.fetch.fulfilled,
          payload: [{ id: 1 }],
        },
      ]
      const request = { sort: { order: 'ASC' } }
      store.dispatch(fetchUsers(request))
        .then(() => { // return of async action
          expect(callConfig.data).to.eql(JSON.stringify(request))
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/users/synthesis and dispatch errors events', (done) => {
      mock.onPost('/api/users/synthesis').reply(500)

      const expectedActions = [
        { type: actions.users.fetch.started },
        { type: actions.users.fetch.rejected },
        { type: actions.alerts.error, payload: 'Could not load users' },
      ]

      store.dispatch(fetchUsers({ sort: { order: 'ASC' } }))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })
  })
})
