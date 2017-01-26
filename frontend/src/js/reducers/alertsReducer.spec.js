/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import reducer from './alertsReducer'
import actions from '../actions/actionTypes'

const expect = chai.expect

describe('alertReducer', () => {
  describe('#reducer()', () => {
    it('Should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql(
        {
          error: '',
          success: '',
        }
      )
    })
    it('Should handle success action', () => {
      expect(reducer(undefined,
        { type: actions.alerts.success, payload: 'This is a success' }
      )).to.eql(
        {
          error: '',
          success: 'This is a success',
        }
      )
    })
    it('Should handle error action', () => {
      expect(reducer(undefined,
        { type: actions.alerts.error, payload: 'This is a error' }
      )).to.eql(
        {
          error: 'This is a error',
          success: '',
        }
      )
    })
    it('Should handle reset section', () => {
      expect(reducer(undefined,
        { type: actions.alerts.reset }
      )).to.eql(
        {
          error: '',
          success: '',
        }
      )
    })
  })
})
