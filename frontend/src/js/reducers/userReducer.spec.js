/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import reducer from './userReducer'
import actions from '../actions/actionTypes'

const expect = chai.expect

describe('userReducer', () => {
  describe('#reducer()', () => {
    it('Should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(
        {
          user: {},
          fetching: false,
          loading: false,
          fetched: false,
          error: false,
        }
      )
    })
    it('Should handle changePreferences started action', () => {
      expect(reducer(
        {
          user: {
            preferences: {
              preference1: false,
            },
          },
          fetching: false,
          loading: false,
          fetched: true,
          error: false,
        },
        {
          type: actions.user.changePreferences.started,
          payload: {
            preference1: true,
          },
        }
      )).to.eql(
        {
          user: {
            preferences: {
              preference1: true,
            },
          },
          fetching: false,
          loading: true,
          fetched: true,
          error: false,
        }
      )
    })
    it('Should handle changePreferences rejected action', () => {
      expect(reducer(
        {
          user: {
            preferences: {
              preference1: false,
            },
          },
          fetching: false,
          loading: false,
          fetched: true,
          error: false,
        },
        {
          type: actions.user.changePreferences.rejected,
          payload: {
            preference1: 'oldPreference',
          },
        }
      )).to.eql(
        {
          user: {
            preferences: {
              preference1: 'oldPreference',
            },
          },
          fetching: false,
          loading: false,
          fetched: true,
          error: false,
        }
      )
    })
    it('Should handle changePreferences fulfilled action', () => {
      expect(reducer(
        {
          user: {
            preferences: {
              preference1: 'newPreference',
            },
          },
          fetching: false,
          loading: true,
          fetched: true,
          error: false,
        },
        {
          type: actions.user.changePreferences.fulfilled,
        }
      )).to.eql(
        {
          user: {
            preferences: {
              preference1: 'newPreference',
            },
          },
          fetching: false,
          loading: false,
          fetched: true,
          error: false,
        }
      )
    })
    it('Should handle userInit fulfilled action', () => {
      expect(reducer(
        {
          user: {},
          fetching: false,
          loading: false,
          fetched: false,
          error: false,
        },
        {
          type: actions.user.init.fulfilled,
          payload: null,
        }
      )).to.eql(
        {
          user: {},
          fetching: false,
          loading: false,
          fetched: false,
          error: false,
        }
      )

      expect(reducer(
        {
          user: { id: 1 },
          fetching: false,
          loading: false,
          fetched: false,
          error: false,
        },
        {
          type: actions.user.init.fulfilled,
          payload: {
            id: 1,
          },
        }
      )).to.eql(
        {
          user: { id: 1 },
          fetching: false,
          loading: false,
          fetched: true,
          error: false,
        }
      )
    })
    it('Should handle login started action', () => {
      expect(reducer(
        {
          user: {},
          fetching: false,
          loading: false,
          fetched: false,
          error: false,
        },
        {
          type: actions.user.login.started,
        }
      )).to.eql(
        {
          user: {},
          fetching: true,
          loading: false,
          fetched: false,
          error: false,
        }
      )
    })
    it('Should handle login rejected action', () => {
      expect(reducer(
        {
          user: {},
          fetching: false,
          loading: false,
          fetched: false,
          error: false,
        },
        {
          type: actions.user.login.rejected,
        }
      )).to.eql(
        {
          user: {},
          fetching: false,
          loading: false,
          fetched: false,
          error: true,
        }
      )
    })
    it('Should handle login fulfilled action', () => {
      expect(reducer(
        {
          user: {},
          fetching: true,
          loading: false,
          fetched: false,
          error: false,
        },
        {
          type: actions.user.login.fulfilled,
          payload: { id: 1 },
        }
      )).to.eql(
        {
          user: { id: 1 },
          fetching: false,
          loading: false,
          fetched: true,
          error: false,
        }
      )
    })
    it('Should handle logout started action', () => {
      expect(reducer(
        {
          user: { id: 1 },
          fetching: false,
          loading: false,
          fetched: true,
          error: false,
        },
        {
          type: actions.user.logout.started,
        }
      )).to.eql(
        {
          user: { id: 1 },
          fetching: true,
          loading: false,
          fetched: true,
          error: false,
        }
      )
    })
    it('Should handle logout rejected action', () => {
      expect(reducer(
        {
          user: { id: 1 },
          fetching: true,
          loading: false,
          fetched: true,
          error: false,
        },
        {
          type: actions.user.logout.rejected,
        }
      )).to.eql(
        {
          user: { id: 1 },
          fetching: false,
          loading: false,
          fetched: true,
          error: true,
        }
      )
    })
    it('Should handle logout fulfilled action', () => {
      expect(reducer(
        {
          user: { id: 1 },
          fetching: true,
          loading: false,
          fetched: true,
          error: false,
        },
        {
          type: actions.user.logout.fulfilled,
        }
      )).to.eql(
        {
          user: {},
          fetching: false,
          loading: false,
          fetched: false,
          error: false,
        }
      )
    })
  })
})
