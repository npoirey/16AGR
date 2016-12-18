import actions from "../actions/actionTypes";

export default function reducer(state = {
  user: {},
  fetching: false,
  fetched: false,
}, action) {

  switch (action.type) {
    case actions.user.changePreferences.started: {
      return {
        ...state,
        loading: true,
        user: {
          ...state.user,
          preferences: action.payload
        },
      }
    }
    case actions.user.changePreferences.rejected: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          preferences: action.payload
        },
      }
    }
    case actions.user.changePreferences.fulfilled: {
      return {
        ...state,
        loading: false
      }
    }
    case actions.user.login.started: {
      return {
        ...state,
        error: null,
        fetching: true
      }
    }
    case actions.user.login.rejected: {
      return {
        ...state,
        error: action.payload,
        fetching: false,
        user: {}
      }
    }
    case actions.user.login.fulfilled: {
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,
        user: action.payload,
      }
    }
    case actions.user.logout.started: {
      return {
        ...state,
        error: null,
        fetching: true
      }
    }
    case actions.user.logout.rejected: {
      return {
        ...state,
        error: action.payload,
        fetching: false
      }
    }
    case actions.user.logout.fulfilled: {
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,
        user: {},
      }
    }
  }

  return state
}
