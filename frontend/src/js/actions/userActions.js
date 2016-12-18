import axios from "axios";
import querystring from "querystring";
import {browserHistory} from "react-router";
import actions from "./actionTypes";

export function changePreferences(preferences) {
  return function (dispatch) {
    dispatch({type: actions.user.changePreferences.started});
    axios.post('/api/users/preferences', preferences)
      .then((response) => {
        dispatch({type: actions.user.changePreferences.fulfilled, payload: preferences});
      })
      .catch((err) => {
        dispatch({type: actions.user.changePreferences.rejected, payload: err.response.data})
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
        dispatch({type: actions.user.login.rejected, payload: err.response.data})
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
        dispatch({type: actions.user.logout.rejected, payload: err.response.data})
      })
  }
}
