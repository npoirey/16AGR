import actions from '../actions/actionTypes'

export default function reducer(state = {
  users: [],
  fetching: false,
  fetched: false,
  error: false,
}, action) {
  switch (action.type) {
    case actions.users.fetch.started: {
      return {
        ...state,
        fetching: true,
      }
    }
    case actions.users.fetch.rejected: {
      return {
        ...state,
        fetching: false,
        error: true,
      }
    }
    case actions.users.fetch.fulfilled: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        users: action.payload.items,
      }
    }
    default:
      return state
  }
}
