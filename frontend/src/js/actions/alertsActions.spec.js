import { showError } from './alertsActions'
import actions from './actionTypes'

describe('alertActions', () => {
  describe('showError', () => {
    it('should create an action to show an error', () => {
      const expectedAction = {
        type: actions.alerts.error,
        payload: 'this is an error',
      }
      expect(showError('this is an error')).toEqual(expectedAction)
    })
  })
})
