import axios from "axios";
import querystring from "querystring";
import {browserHistory} from "react-router";
import actions from "./actionTypes";

export function changePreferences(oldPreferences, newPreferences) {
  return function (dispatch) {
    dispatch({type: actions.user.changePreferences.started, payload: newPreferences});
    axios.post('/api/users/preferences', newPreferences)
      .then((response) => {
        dispatch({type: actions.user.changePreferences.fulfilled});
        dispatch({type: actions.alerts.success, payload: 'Preferences saved'})
      })
      .catch((err) => {
        dispatch({type: actions.user.changePreferences.rejected, payload: oldPreferences});
        dispatch({type: actions.alerts.error, payload: 'Failed to save preferences'})
      })
  }
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({type: actions.user.login.started});
    const config = {
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    };
    axios.post('/api/auth/login', querystring.stringify({username: email, password: password}), config)
      .then((response) => {
        dispatch({type: actions.user.login.fulfilled, payload: response.data.payload});
        browserHistory.push('/');
      })
      .catch((err) => {
        dispatch({type: actions.user.login.rejected});
        if (err && err.status < 500) {
          dispatch({type: actions.alerts.error, payload: 'An error occured'})
        } else {
          dispatch({type: actions.alerts.error, payload: 'Invalid credentials'})
        }
      })
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({type: actions.user.logout.started});
    axios.get('/api/auth/logout')
      .then((response) => {
        dispatch({type: actions.user.logout.fulfilled, payload: response.data.payload});
        browserHistory.push('/login');
      })
      .catch((err) => {
        dispatch({type: actions.user.logout.rejected});
        dispatch({type: actions.alerts.error, payload: 'An error occured'});
      })
  }
}
