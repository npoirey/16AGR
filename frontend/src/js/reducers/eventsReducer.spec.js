/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import reducer from './eventsReducer'
import actions from '../actions/actionTypes'

const expect = chai.expect

describe('eventsReducer', () => {
  describe('#reducer()', () => {
    it('Should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(
        {
          events: [],
          fetching: false,
          fetched: false,
          error: false,
        }
      )
    })
    it('Should handle started action', () => {
      expect(reducer(undefined,
        { type: actions.events.fetch.started }
      )).to.eql(
        {
          events: [],
          fetching: true,
          fetched: false,
          error: false,
        }
      )
    })
    it('Should handle rejected action', () => {
      expect(reducer(undefined,
        { type: actions.events.fetch.rejected }
      )).to.eql(
        {
          events: [],
          fetching: false,
          fetched: false,
          error: true,
        }
      )
    })
    it('Should handle fulfilled action', () => {
      expect(reducer(undefined,
        {
          type: actions.events.fetch.fulfilled,
          payload: [
            {
              id: 1,
            },
          ],
        }
      )).to.eql(
        {
          events: [
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
