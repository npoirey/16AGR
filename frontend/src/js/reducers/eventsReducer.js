import actions from '../actions/actionTypes'

export default function reducer(state = {
  events: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case actions.events.fetch.started: {
      return { ...state, fetching: true }
    }
    case actions.events.fetch.rejected: {
      return { ...state, fetching: false, error: action.payload }
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
