/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { createUser, fetchUserById, fetchUsers } from './usersActions'
import actions from '../actionTypes'

const expect = chai.expect
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('usersActions', () => {
  let store
  let mock

  before(() => {
    mock = new MockAdapter(axios)
  })

  beforeEach(() => {
    store = mockStore({})
    mock.reset()
  })

  after(() => {
    mock.restore()
  })

  describe('#createUser()', () => {
    it('should call /api/users/create and dispatch success events', (done) => {
      let callConfig
      mock.onPost('/api/users/create')
        .reply((config) => {
          callConfig = config
          return [201, { id: 1 }]
        })

      const expectedActions = [
        {
          type: actions.users.create.started,
        },
        {
          type: actions.users.create.fulfilled,
          payload: { id: 1 },
        },
      ]
      const user = { callsign: 'test' }
      store.dispatch(createUser(user))
        .then(() => { // return of async action
          expect(callConfig.data).to.eql(JSON.stringify(user))
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/users/create and dispatch errors events', (done) => {
      mock.onPost('/api/users/create').reply(500)

      const expectedActions = [
        { type: actions.users.create.started },
        { type: actions.users.create.rejected },
        { type: actions.alerts.error, payload: 'Could not create user' },
      ]

      store.dispatch(createUser({ callsign: 'test' }))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/users/create and dispatch errors events with message', (done) => {
      mock.onPost('/api/users/create').reply(409)

      const expectedActions = [
        { type: actions.users.create.started },
        { type: actions.users.create.rejected },
        { type: actions.alerts.error, payload: 'This mail or callsign is already in use' },
      ]

      store.dispatch(createUser({ callsign: 'test' }))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })
  })

  describe('#fetchUserById()', () => {
    it('should call /api/users/[id] and dispatch success events', (done) => {
      mock.onGet('/api/users/12')
        .reply(() => [200, { id: 12, callsign: 'user' }])

      const expectedActions = [
        {
          type: actions.users.fetchById.started,
        },
        {
          type: actions.users.fetchById.fulfilled,
          payload: { id: 12, callsign: 'user' },
        },
      ]
      store.dispatch(fetchUserById(12))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/users/[id] and dispatch errors events', (done) => {
      mock.onGet('/api/users/12').reply(500)

      const expectedActions = [
        { type: actions.users.fetchById.started },
        { type: actions.users.fetchById.rejected },
        { type: actions.alerts.error, payload: 'Could not load user' },
      ]

      store.dispatch(fetchUserById(12))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })
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
