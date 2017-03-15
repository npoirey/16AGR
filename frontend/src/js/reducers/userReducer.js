import actions from '../actions/actionTypes'

export default function reducer(state = {
  user: {},
  fetching: false,
  loading: false,
  fetched: false,
  error: false,
}, action) {
  switch (action.type) {
    case actions.user.changePreferences.started: {
      return {
        ...state,
        loading: true,
        user: {
          ...state.user,
          preferences: action.payload,
        },
      }
    }
    case actions.user.changePreferences.rejected: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          preferences: action.payload,
        },
      }
    }
    case actions.user.changePreferences.fulfilled: {
      return {
        ...state,
        loading: false,
      }
    }
    case actions.user.init.fulfilled: {
      return {
        ...state,
        error: false,
        fetching: false,
        fetched: Boolean(action.payload && action.payload.id),
        user: action.payload || {},
      }
    }
    case actions.user.login.started: {
      return {
        ...state,
        fetching: true,
      }
    }
    case actions.user.login.rejected: {
      return {
        ...state,
        fetching: false,
        error: true,
        user: {},
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
        fetching: true,
      }
    }
    case actions.user.logout.rejected: {
      return {
        ...state,
        fetching: false,
        error: true,
      }
    }
    case actions.user.logout.fulfilled: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        user: {},
      }
    }
    default:
      return state
  }
}
