import axios from 'axios'
import querystring from 'querystring'
import { browserHistory } from 'react-router'
import actions from '../actionTypes'
import { showError, showSuccess } from '../alerts/alertsActions'

export function changePreferences(oldPreferences, newPreferences) {
  return (dispatch) => {
    dispatch({ type: actions.user.changePreferences.started, payload: newPreferences })
    return axios.post('/api/users/preferences', newPreferences)
      .then(() => {
        dispatch({ type: actions.user.changePreferences.fulfilled })
        dispatch(showSuccess('Preferences saved'))
      })
      .catch(() => {
        dispatch({ type: actions.user.changePreferences.rejected, payload: oldPreferences })
        dispatch(showError('Failed to save preferences'))
      })
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({ type: actions.user.login.started })
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
    return axios.post('/api/auth/login', querystring.stringify({ username: email, password }), config)
      .then((response) => {
        dispatch({ type: actions.user.login.fulfilled, payload: response.data.payload })
        browserHistory.push('/')
      })
      .catch((err) => {
        dispatch({ type: actions.user.login.rejected })
        if (err && err.response.status && err.response.status < 500) {
          dispatch(showError('Invalid credentials'))
        } else {
          dispatch(showError('An error occured'))
        }
      })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: actions.user.logout.started })
    return axios.get('/api/auth/logout')
      .then(() => {
        dispatch({ type: actions.user.logout.fulfilled })
        browserHistory.push('/login')
      })
      .catch(() => {
        dispatch({ type: actions.user.logout.rejected })
        dispatch({ type: actions.alerts.error, payload: 'An error occured' })
      })
  }
}

