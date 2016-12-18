import actions from "./actionTypes";

export function showError(message) {
  return function (dispatch) {
    dispatch({type: actions.alerts.error, payload: message});
  }
}

