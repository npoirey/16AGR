import actions from '../actions/actionTypes'

export default function reducer(state = {
  users: [],
  fetching: false,
  fetched: false,
  error: null,
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
      }
    }
    case actions.users.fetch.fulfilled: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload,
      }
    }
    default:
      return state
  }
}
