
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import reducer from './usersReducer'
import actions from '../actions/actionTypes'

const expect = chai.expect

describe('usersReducer', () => {
  describe('#reducer()', () => {
    it('Should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(
        {
          users: [],
          fetching: false,
          fetched: false,
          error: false,
        }
      )
    })
    it('Should handle fetch started action', () => {
      expect(reducer(undefined,
        { type: actions.users.fetch.started }
      )).to.eql(
        {
          users: [],
          fetching: true,
          fetched: false,
          error: false,
        }
      )
    })
    it('Should handle fetch rejected action', () => {
      expect(reducer(undefined,
        { type: actions.users.fetch.rejected }
      )).to.eql(
        {
          users: [],
          fetching: false,
          fetched: false,
          error: true,
        }
      )
    })
    it('Should handle fetch fulfilled action', () => {
      expect(reducer(undefined,
        {
          type: actions.users.fetch.fulfilled,
          payload: [
            {
              id: 1,
            },
          ],
        }
      )).to.eql(
        {
          users: [
            {
              id: 1,
            },
          ],
          fetching: false,
          fetched: true,
          error: false,
        }
      )
    })
  })
})
