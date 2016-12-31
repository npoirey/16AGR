import {showError} from "./alertsActions";
import actions from "./actionTypes";

test('alertActions', () => {
  test('showError', () => {
    it('should create an action to show an error', () => {
      const expectedAction = {
        type: actions.alerts.error,
        payload: 'this is an error'
      };
      expect(showError('this is an error')).toBe(expectedAction)
    })
  });
});
