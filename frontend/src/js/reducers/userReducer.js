import actions from "../actions/actionTypes";

export default function reducer(state = {
  user: {},
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case actions.user.login.started: {
      return {
        ...state,
        fetching: true
      }
    }
    case actions.user.login.rejected: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
        user: {}
      }
    }
    case actions.user.login.fulfilled: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload,
      }
    }
    case actions.user.logout.started: {
      return {
        ...state,
        fetching: true
      }
    }
    case actions.user.logout.rejected: {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case actions.user.logout.fulfilled: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: {},
      }
    }
  }

  return state
}
