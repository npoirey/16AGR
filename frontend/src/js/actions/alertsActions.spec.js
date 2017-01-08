/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai'
import { showError, showSuccess, reset } from './alertsActions'
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
  describe('showSuccess', () => {
    it('should create an action to show a success', () => {
      const expectedAction = {
        type: actions.alerts.success,
        payload: 'this is a success',
      }
      expect(showSuccess('this is a success')).to.eql(expectedAction)
    })
  })
  describe('reset', () => {
    it('should create an action to reset alert', () => {
      const expectedAction = {
        type: actions.alerts.reset,
      }
      expect(reset('this is an error')).to.eql(expectedAction)
    })
  })
})
