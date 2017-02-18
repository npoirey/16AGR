/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as router from 'react-router'

import { changePreferences, login, logout } from './userActions'
import actions from '../actionTypes'

const expect = chai.expect
chai.use(sinonChai)
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
router.browserHistory = {
  push: () => {
  },
}

describe('userActions', () => {
  let store
  let mock
  let browserHistoryStub

  before(() => {
    mock = new MockAdapter(axios)
  })

  beforeEach(() => {
    store = mockStore({})
    mock.reset()
    browserHistoryStub = sinon.stub(router.browserHistory, 'push')
  })

  afterEach(() => {
    browserHistoryStub.restore()
  })

  after(() => {
    mock.restore()
  })

  describe('#changePreferences()', () => {
    const oldPreferences = { preference: 'old' }
    const newPreferences = { preference: 'new' }

    it('should call /api/users/preferences and dispatch success events', (done) => {
      mock.onPost('/api/users/preferences')
        .reply(200)

      const expectedActions = [
        {
          type: actions.user.changePreferences.started,
          payload: newPreferences,
        },
        {
          type: actions.user.changePreferences.fulfilled,
        },
        {
          type: actions.alerts.success,
          payload: 'Preferences saved',
        },
      ]

      store.dispatch(changePreferences(oldPreferences, newPreferences))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/users/preferences and dispatch error events', (done) => {
      mock.onPost('/api/users/preferences')
        .reply(500)

      const expectedActions = [
        {
          type: actions.user.changePreferences.started,
          payload: newPreferences,
        },
        {
          type: actions.user.changePreferences.rejected,
          payload: oldPreferences,
        },
        {
          type: actions.alerts.error,
          payload: 'Failed to save preferences',
        },
      ]

      store.dispatch(changePreferences(oldPreferences, newPreferences))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })
  })

  describe('#login()', () => {
    it('should call /api/auth/login and dispatch success events', (done) => {
      let callConfig
      mock.onPost('/api/auth/login')
        .reply((config) => {
          callConfig = config
          return [200, { success: true, message: 'Logged in', payload: { id: 1 } }]
        })

      const expectedActions = [
        {
          type: actions.user.login.started,
        },
        {
          type: actions.user.login.fulfilled,
          payload: { id: 1 },
        },
      ]

      store.dispatch(login('User', 'password'))
        .then(() => { // return of async actions
          expect(callConfig.headers['Content-Type']).to.equal('application/x-www-form-urlencoded')
          expect(callConfig.data).to.equal('username=User&password=password')
          expect(store.getActions()).to.eql(expectedActions)
          expect(browserHistoryStub).to.have.been.calledWith('/')
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/auth/login and dispatch error events for credentials', (done) => {
      mock.onPost('/api/auth/login')
        .reply(400)

      const expectedActions = [
        {
          type: actions.user.login.started,
        },
        {
          type: actions.user.login.rejected,
        },
        {
          type: actions.alerts.error, payload: 'Invalid credentials',
        },
      ]

      store.dispatch(login('User', 'password'))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/auth/login and dispatch error events for server error', (done) => {
      mock.onPost('/api/auth/login')
        .reply(500)

      const expectedActions = [
        {
          type: actions.user.login.started,
        },
        {
          type: actions.user.login.rejected,
        },
        {
          type: actions.alerts.error, payload: 'An error occured',
        },
      ]

      store.dispatch(login('User', 'password'))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })
  })

  describe('#logout()', () => {
    it('should call /api/auth/logout and dispatch success events', (done) => {
      mock.onGet('/api/auth/logout')
        .reply(200)

      const expectedActions = [
        {
          type: actions.user.logout.started,
        },
        {
          type: actions.user.logout.fulfilled,
        },
      ]

      store.dispatch(logout())
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          expect(browserHistoryStub).to.have.been.calledWith('/login')
          done()
        })
        .catch((e) => done(e))
    })

    it('should call /api/auth/logout and dispatch error events', (done) => {
      mock.onGet('/api/auth/logout')
        .reply(500)

      const expectedActions = [
        {
          type: actions.user.logout.started,
        },
        {
          type: actions.user.logout.rejected,
        },
        {
          type: actions.alerts.error, payload: 'An error occured',
        },
      ]

      store.dispatch(logout())
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
        .catch((e) => done(e))
    })
  })
})
