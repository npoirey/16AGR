import axios from 'axios'
import actions from './actionTypes'

// eslint-disable-next-line import/prefer-default-export
export function fetchEvents() {
  return (dispatch) => {
    dispatch({ type: actions.events.fetch.started })
    axios.get('/api/events')
      .then((response) => {
        dispatch({ type: actions.events.fetch.fulfilled, payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: actions.events.fetch.rejected, payload: err })
      })
  }
}
