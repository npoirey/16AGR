import axios from 'axios'
import actions from '../actionTypes'

export function fetchUsers(request) {
  return (dispatch) => {
    dispatch({ type: actions.users.fetch.started })
    return axios.post('/api/users/synthesis', request)
      .then((response) => {
        dispatch({ type: actions.users.fetch.fulfilled, payload: response.data })
      })
      .catch(() => {
        dispatch({ type: actions.users.fetch.rejected })
        dispatch({ type: actions.alerts.error, payload: 'Could not load users' })
      })
  }
}

export function fetchUserById(userId) {
  return (dispatch) => {
    dispatch({ type: actions.users.fetchById.started })
    return axios.get(`/api/users/${userId}`)
      .then((response) => {
        dispatch({ type: actions.users.fetchById.fulfilled, payload: response.data })
      })
      .catch(() => {
        dispatch({ type: actions.users.fetchById.rejected })
        dispatch({ type: actions.alerts.error, payload: 'Could not load user' })
      })
  }
}

export function createUser(user) {
  return (dispatch) => {
    dispatch({ type: actions.users.create.started })
    return axios.post('/api/users/create', user)
      .then((response) => {
        dispatch({ type: actions.users.create.fulfilled, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: actions.users.create.rejected })
        if (error.response && error.response.status === 409) {
          dispatch({ type: actions.alerts.error, payload: 'This mail or callsign is already in use' })
        } else {
          dispatch({ type: actions.alerts.error, payload: 'Could not create user' })
        }
      })
  }
}
