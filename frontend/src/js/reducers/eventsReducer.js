import actions from '../actions/actionTypes'

export default function reducer(state = {
  events: [],
  fetching: false,
  fetched: false,
  error: false,
}, action) {
  switch (action.type) {
    case actions.events.fetch.started: {
      return { ...state, fetching: true, error: false }
    }
    case actions.events.fetch.rejected: {
      return { ...state, fetching: false, error: true }
    }
    case actions.events.fetch.fulfilled: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        events: action.payload,
      }
    }
    default:
      return state
  }
}
