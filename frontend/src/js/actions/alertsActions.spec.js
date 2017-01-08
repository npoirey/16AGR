/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import { showError } from './alertsActions'
import actions from './actionTypes'

const expect = chai.expect

describe('alertActions', () => {
  describe('showError', () => {
    it('should create an action to show an error', () => {
      const expectedAction = {
        type: actions.alerts.error,
        payload: 'this is an error',
      }
      expect(showError('this is an error')).to.eql(expectedAction)
    })
  })
})
