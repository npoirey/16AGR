import axios from 'axios'
import actions from './actionTypes'

export function fetchUsers(request) { // eslint-disable-line import/prefer-default-export
  return (dispatch) => {
    dispatch({ type: actions.users.fetch.started })
    axios.post('/api/users/synthesis', request)
      .then((response) => {
        dispatch({ type: actions.users.fetch.fulfilled, payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: actions.users.fetch.rejected, payload: err })
        dispatch({ type: actions.alerts.error, payload: 'Could not load users' })
      })
  }
}
